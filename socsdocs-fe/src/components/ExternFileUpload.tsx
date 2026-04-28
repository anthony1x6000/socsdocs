import React, { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { ErrorMessage } from './ui/ErrorMessage';

/**
 * Valid durations for Litterbox file uploads.
 */
type LitterboxTime = '1h' | '12h' | '24h' | '72h';

/**
 * Interface for file upload providers to ensure the component is extendable.
 */
interface FileUploadProvider {
  id: string;
  name: string;
  /** Performs the actual file upload and returns the URL string. */
  upload: (file: File, options?: any) => Promise<string>;
  /** Optional renderer for provider-specific options (like expiry time). */
  renderOptions?: (options: any, setOptions: (options: any) => void, isUploading: boolean) => React.ReactNode;
  /** Default options for this provider. */
  defaultOptions?: any;
}

/**
 * Litterbox (Catbox) API provider implementation.
 * API: https://litterbox.catbox.moe/resources/internals/api.php
 */
const LitterboxProvider: FileUploadProvider = {
  id: 'litterbox',
  name: 'Litterbox',
  defaultOptions: { time: '24h' },
  upload: async (file: File, options?: { time: LitterboxTime }) => {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('time', options?.time || '24h');
    formData.append('fileToUpload', file);

    const response = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const text = await response.text();
    
    // Litterbox returns the URL as a plain text string.
    // If it starts with http, it's likely a success.
    if (!text.startsWith('http')) {
      throw new Error(`API Error: ${text}`);
    }

    return text;
  },
  renderOptions: (options, setOptions, isUploading) => (
    <div className="flex flex-col gap-2">
      <Typography variant="text" className="text-xs uppercase opacity-70">Expiry Time</Typography>
      <select
        value={options.time}
        onChange={(e) => setOptions({ ...options, time: e.target.value })}
        className="bg-white/10 text-white p-2 rounded border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/50 cursor-pointer"
        disabled={isUploading}
      >
        <option value="1h" className="bg-black text-white">1 Hour</option>
        <option value="12h" className="bg-black text-white">12 Hours</option>
        <option value="24h" className="bg-black text-white">24 Hours</option>
        <option value="72h" className="bg-black text-white">72 Hours</option>
      </select>
    </div>
  )
};

const PROVIDERS: FileUploadProvider[] = [LitterboxProvider];

/**
 * A flexible file upload component that supports multiple external APIs.
 * Currently supports Litterbox.catbox.moe with configurable expiry times.
 */
export const ExternFileUpload = () => {
  const [activeProvider] = useState<FileUploadProvider>(PROVIDERS[0]);
  const [options, setOptions] = useState(activeProvider.defaultOptions);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setLink(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setLink(null);

    try {
      const result = await activeProvider.upload(file, options);
      setLink(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6 flex flex-col gap-4 max-w-md w-full">
      <Typography variant="header">Upload to {activeProvider.name}</Typography>
      
      {activeProvider.renderOptions && activeProvider.renderOptions(options, setOptions, isUploading)}

      <div className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={triggerFileSelect} 
            disabled={isUploading}
            className="flex-[2] bg-white/10 hover:bg-white/20 border border-white/10"
          >
            {file ? file.name : 'Select File'}
          </Button>

          <Button 
            onClick={handleUpload} 
            disabled={isUploading || !file}
            className="flex-1"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>

      <ErrorMessage>{error}</ErrorMessage>

      {link && (
        <div className="mt-2 p-3 bg-white/5 rounded border border-white/10 break-all animate-in fade-in slide-in-from-top-1">
          <Typography variant="text" className="block text-xs uppercase opacity-70 mb-1">Result Link</Typography>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            {link}
          </a>
        </div>
      )}
    </Card>
  );
};

export default ExternFileUpload;

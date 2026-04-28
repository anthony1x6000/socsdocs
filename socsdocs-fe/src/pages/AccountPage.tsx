import { useState, useRef } from 'react';
import { useSession, auth } from '../lib/auth-client';
import Typography from '../components/ui/Typography';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Card from '../components/ui/Card';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Moveable } from '../components/ui/Moveables';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  textAnimationMap 
} from '../assets/config/animations';
import {
  textColors, 
  titleWeights
} from '../assets/config/componentStyles';

/**
 * AccountPage Component
 *
 * Provides a centralized interface for users to manage their identity and security settings.
 */
export default function AccountPage() {
  const queryClient = useQueryClient();
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emailMutation = useMutation(auth.changeEmail.mutationOptions({
    onSuccess: () => {
      setSuccessMsg('Email update initiated. Please check your inbox.');
      setError(null);
    },
    onError: (err: any) => {
      setError(err.message);
      setSuccessMsg(null);
    }
  }));

  const passwordMutation = useMutation(auth.changePassword.mutationOptions({
    onSuccess: () => {
      setSuccessMsg('Password updated successfully.');
      setError(null);
      setCurrentPassword('');
      setNewPassword('');
    },
    onError: (err: any) => {
      setError(err.message);
      setSuccessMsg(null);
    }
  }));

  const updateUserMutation = useMutation(auth.updateUser.mutationOptions({
    onSuccess: () => {
      setSuccessMsg('Profile picture updated.');
      setError(null);
      setImageFile(null);
      queryClient.invalidateQueries({ queryKey: auth.getSession.queryKey({}) });
    },
    onError: (err: any) => {
      setError(err.message);
      setSuccessMsg(null);
    }
  }));

  const profilePicMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!session) throw new Error('No session');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8787"}/api/upload-image`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${session.session.token}` 
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const { url } = await response.json();
      
      return updateUserMutation.mutateAsync({
        image: url,
      });
    },
  });

  if (isPending) return <Typography variant="text">Loading...</Typography>;
  if (!session) return <Typography variant="text">Please login to view this page.</Typography>;

  const isSubmitting = emailMutation.isPending || passwordMutation.isPending || profilePicMutation.isPending;

  return (
    <Moveable className="w-full overflow-y-auto h-[calc(100vh-4em)] scrollbar-thin p-8">
      <div className="flex flex-col items-center gap-[2em] max-w-4xl mx-auto">
        <Moveable as="div" animationMap={textAnimationMap} colorDict={textColors} weightDict={titleWeights}>
          <Typography variant="title">Account Settings</Typography>
          <ErrorMessage>{error}</ErrorMessage>
          {successMsg && <div className="text-green-400 text-sm mb-4">{successMsg}</div>}
        </Moveable>

        <div className="flex flex-col gap-8 w-full">
        <Card className="flex flex-col gap-4">
            <Typography variant="subtitle">Account Info</Typography>
            <div className="flex flex-col gap-1">
              <Typography variant="text">Name: {session.user.name}</Typography>
              <Typography variant="text">ID: {session.user.id}</Typography>
              <Typography variant="text">Member since: {new Date(session.user.createdAt).toLocaleDateString()}</Typography>
            </div>
            <Button variant="link" to="/" className="text-gray-400 self-start">Back to Dashboard</Button>
        </Card>

        <Card className="flex flex-col gap-4">
          <Typography variant="subtitle">Profile Picture</Typography>
          {session.user.image && (
            <img 
              src={session.user.image} 
              alt="Profile" 
              className="w-32 h-32 object-cover border-none"
            />
          )}
          <form onSubmit={(e) => { e.preventDefault(); if (imageFile) profilePicMutation.mutate(imageFile); }} className="flex flex-col gap-4">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              {imageFile ? imageFile.name : 'Choose File'}
            </Button>
            <Button type="submit" disabled={isSubmitting || !imageFile}>Upload New Picture</Button>
          </form>
        </Card>

        <Card className="flex flex-col gap-4">
          <Typography variant="subtitle">Update Email</Typography>
          <Typography variant="text">Current: {session.user.email}</Typography>
          <form onSubmit={(e) => { e.preventDefault(); emailMutation.mutate({ newEmail: email }); }} className="flex flex-col gap-4">
            <Input 
              type="email" 
              placeholder="New Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Button type="submit" disabled={isSubmitting}>Update Email</Button>
          </form>
        </Card>

        <Card className="flex flex-col gap-4">
          <Typography variant="subtitle">Update Password</Typography>
          <form onSubmit={(e) => { e.preventDefault(); passwordMutation.mutate({ currentPassword, newPassword }); }} className="flex flex-col gap-4">
            <Input 
              type="password" 
              placeholder="Current Password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required 
            />
            <Input 
              type="password" 
              placeholder="New Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
            <Button type="submit" disabled={isSubmitting}>Update Password</Button>
          </form>
        </Card>
      </div>
    </div>
  </Moveable>
  );
}

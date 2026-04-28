import React, { useState } from 'react';
import { useSession, changeEmail, changePassword, updateUser } from '../lib/auth-client';
import Typography from '../components/ui/Typography';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Card from '../components/ui/Card';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Moveable } from '../components/ui/Moveables';
import { 
  textAnimationMap, 
  textColors, 
  titleWeights
} from '../assets/config';

/**
 * AccountPage Component
 *
 * Provides a centralized interface for users to manage their identity and security settings.
 * The page is structured as a vertical list of functional modules.
 */export default function AccountPage() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isPending) return <Typography variant="text">Loading...</Typography>;
  if (!session) return <Typography variant="text">Please login to view this page.</Typography>;

  /**
   * Initiates the email change process.
   * Better Auth handles verification logic via the configured plugin.
   */
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      const { error: changeError } = await changeEmail({
        newEmail: email,
      });
      if (changeError) throw new Error(changeError.message);
      setSuccessMsg('Email update initiated. Please check your inbox.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Updates the user password.
   * Requires the current password to verify authority.
   */
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      const { error: changeError } = await changePassword({
        currentPassword,
        newPassword,
      });
      if (changeError) throw new Error(changeError.message);
      setSuccessMsg('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Uploads a new profile picture to the edge server (R2 storage)
   * and updates the user record with the resulting URL.
   */
  const handleUpdateProfilePic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

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
      
      const { error: updateError } = await updateUser({
        image: url,
      });

      if (updateError) throw new Error(updateError.message);
      setSuccessMsg('Profile picture updated.');
      setImageFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[2em] p-8 max-w-2xl mx-auto overflow-y-auto h-[calc(100vh-10em)]">
      <Moveable as="div" animationMap={textAnimationMap} colorDict={textColors} weightDict={titleWeights}>
        <Typography variant="title">Account Settings</Typography>
        <ErrorMessage>{error}</ErrorMessage>
        {successMsg && <div className="text-green-400 text-sm mb-4">{successMsg}</div>}
      </Moveable>

      <div className="flex flex-col gap-8 w-full">
        {/* 1. Account Info */}
        <Card className="flex flex-col gap-4">
            <Typography variant="subtitle">Account Info</Typography>
            <div className="flex flex-col gap-1">
              <Typography variant="text">Name: {session.user.name}</Typography>
              <Typography variant="text">ID: {session.user.id}</Typography>
              <Typography variant="text">Member since: {new Date(session.user.createdAt).toLocaleDateString()}</Typography>
            </div>
            <Button variant="link" to="/" className="text-gray-400 self-start">Back to Dashboard</Button>
        </Card>

        {/* 2. Profile Picture Update */}
        <Card className="flex flex-col gap-4">
          <Typography variant="subtitle">Profile Picture</Typography>
          {session.user.image && (
            <img 
              src={session.user.image} 
              alt="Profile" 
              className="w-32 h-32 object-cover border-none"
            />
          )}
          <form onSubmit={handleUpdateProfilePic} className="flex flex-col gap-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <Button type="submit" disabled={isSubmitting || !imageFile}>Upload New Picture</Button>
          </form>
        </Card>

        {/* 3. Email Update */}
        <Card className="flex flex-col gap-4">
          <Typography variant="subtitle">Update Email</Typography>
          <Typography variant="text">Current: {session.user.email}</Typography>
          <form onSubmit={handleUpdateEmail} className="flex flex-col gap-4">
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

        {/* 4. Password Update */}
        <Card className="flex flex-col gap-4">
          <Typography variant="subtitle">Update Password</Typography>
          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
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
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../lib/auth-client';
import Typography from '../components/ui/Typography';
import { HeroBackground } from '../components/ui/HeroBackground';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Card from '../components/ui/Card';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Moveable } from '../components/ui/Moveables';
import { 
  textAnimationMap, 
  elementAnimationMap, 
  textColors, 
  primaryColors,
  titleWeights,
  headerWeights
} from '../assets/config';

function AuthTitle({ isSignUp }: { isSignUp: boolean }) {
  return (
    <Moveable 
      as="span" 
      animationMap={textAnimationMap} 
      colorDict={textColors} 
      weightDict={headerWeights}
    >
      <Typography variant="subtitle">{isSignUp ? 'Create Account' : 'Sign In'}</Typography>
    </Moveable>
  );
}

interface AuthFormProps {
  isSignUp: boolean;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

function AuthForm({
  isSignUp,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  isSubmitting,
  handleSubmit
}: AuthFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-4">
      {isSignUp && (
        <Moveable as="div" animationMap={elementAnimationMap}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Moveable>
      )}
      <Moveable as="div" animationMap={elementAnimationMap}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Moveable>
      <Moveable as="div" animationMap={elementAnimationMap}>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Moveable>
      <Moveable as="div" animationMap={elementAnimationMap} colorDict={primaryColors}>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-2"
        >
          {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
        </Button>
      </Moveable>
    </form>
  );
}

interface AuthFooterProps {
  isSignUp: boolean;
  setIsSignUp: (val: boolean) => void;
}

function AuthFooter({ isSignUp, setIsSignUp }: AuthFooterProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors}>
        <Button 
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign up'}
        </Button>
      </Moveable>

      <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors}>
        <Button variant="link" to="/" className="text-gray-300 hover:text-white text-sm">
          Go Back
        </Button>
      </Moveable>
    </div>
  );
}

/**
 * LoginPage Component manages the user's interaction with the authentication system.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp.email({
          email,
          password,
          name,
        });
        if (signUpError) throw new Error(signUpError.message);
        navigate('/'); 
      } else {
        const { error: signInError } = await signIn.email({
          email,
          password,
        });
        if (signInError) throw new Error(signInError.message);
        navigate('/'); 
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeroBackground />
      <Moveable 
        as="div" 
        animationMap={textAnimationMap} 
        colorDict={textColors} 
        weightDict={titleWeights}
        className="mt-[3em]"
      >
        <Typography variant="title">SOCSDOCS</Typography>
      </Moveable>
      
      <Moveable 
        as="div" 
        animationMap={elementAnimationMap}
        className="mt-[2em] w-full max-w-md mx-auto"
      >
        <Card className="flex flex-col items-center gap-[1em] w-full">
          <AuthTitle isSignUp={isSignUp} />
          
          <ErrorMessage>{error}</ErrorMessage>

          <AuthForm 
            isSignUp={isSignUp}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />

          <AuthFooter isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        </Card>
      </Moveable>
    </>
  );
}

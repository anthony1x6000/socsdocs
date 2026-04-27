import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../lib/auth-client';
import { PageTitle } from '../components/ui/Title';
import Subtitle from '../components/ui/Subtitle';
import { HeroBackground } from '../components/ui/HeroBackground';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/ButtonPrimary';
import Card from '../components/ui/Card';
import LinkAction from '../components/ui/LinkAction';
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
        navigate('/dashboard'); 
      } else {
        const { error: signInError } = await signIn.email({
          email,
          password,
        });
        if (signInError) throw new Error(signInError.message);
        navigate('/dashboard'); 
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
        intensityMod={2}
        intensityModHover={3}
        className="mt-[3em]"
      >
        <PageTitle />
      </Moveable>
      
      <Moveable 
        as="div" 
        animationMap={elementAnimationMap}
        className="mt-[2em] w-full max-w-md mx-auto"
      >
        <Card className="flex-col items-center gap-[1em] w-full">
          <Moveable 
            as="span" 
            animationMap={textAnimationMap} 
            colorDict={textColors} 
            weightDict={headerWeights}
            intensityMod={2}
          >
            <Subtitle text={isSignUp ? 'Create Account' : 'Sign In'} />
          </Moveable>
          
          <ErrorMessage>{error}</ErrorMessage>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-4">
            {isSignUp && (
              <Moveable as="div" animationMap={elementAnimationMap} intensityModHover={2}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Moveable>
            )}
            <Moveable as="div" animationMap={elementAnimationMap} intensityModHover={2}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Moveable>
            <Moveable as="div" animationMap={elementAnimationMap} intensityModHover={2}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Moveable>
            <Moveable as="div" animationMap={elementAnimationMap} colorDict={primaryColors} intensityModHover={2}>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                text={isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
                className="mt-2"
              />
            </Moveable>
          </form>

          <div className="mt-4 flex flex-col items-center gap-2">
            <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityModHover={2}>
              <LinkAction 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign up'}
              </LinkAction>
            </Moveable>

            <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityModHover={2}>
              <LinkAction to="/" className="text-gray-300 hover:text-white text-sm">
                Go Back
              </LinkAction>
            </Moveable>
          </div>
        </Card>
      </Moveable>
    </>
  );
}

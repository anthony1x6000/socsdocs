import { createFileRoute, Link } from '@tanstack/react-router';
import Typography from '../components/ui/Typography';
import { Moveable } from '../components/ui/Moveables';
import { textAnimationMap, textColors, titleWeights } from '../assets/config';
import { useSession } from '../lib/auth-client';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Moveable 
        as="div" 
        animationMap={textAnimationMap} 
        colorDict={textColors} 
        weightDict={titleWeights}
        className='mt-[3em]'
      >
        <Typography variant="title">socsdocs</Typography>
      </Moveable>

      <div className='flex gap-[2em]'>
        <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors}>
          <Typography variant="subtitle">COME HERE TO STUDY</Typography>
        </Moveable>
        
        {!session?.user ? (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityModHover={-5}>
              <Typography variant="subtitle">LOGIN</Typography>
            </Moveable>
          </Link>
        ) : (
          <Link to="/account" style={{ textDecoration: 'none' }}>
            <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityModHover={-5}>
              <Typography variant="subtitle">ACCOUNT</Typography>
            </Moveable>
          </Link>
        )}

        {session?.user && (
          <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors}>
            <Typography variant="subtitle">
              {session.user.name} (ID: {session.user.id})
            </Typography>
          </Moveable>
        )}
      </div>
      <Moveable as="div" className="w-full h-[2px] bg-white block" />
    </div>
  );
}

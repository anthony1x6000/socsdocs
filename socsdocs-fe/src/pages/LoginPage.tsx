import { PageTitle } from '../components/ui/Title';
import FlexBox from '../components/ui/FlexBox';
import Subtitle from '../components/ui/Subtitle';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <PageTitle className='mt-[3em]' />
      
      <FlexBox className='mt-[2em] flex-col items-center gap-[1em]'>
        <Subtitle text="LOGIN PAGE" />
        <Link to="/" className="text-white underline mt-4">Go Back</Link>
      </FlexBox>
    </>
  );
}

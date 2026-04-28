import { createRootRoute, Outlet } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import { HeroBackground } from '../components/ui/HeroBackground';
import { SettingsBar } from '../components/ui/SettingsBar';
import { useDopamineIntensity } from '../store/useDopamineIntensity';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BackgroundMusic } from '../components/BackgroundMusic';

function RootComponent() {
  const { config } = useDopamineIntensity();
  const { isInverted } = config;

  return (
    <div className={twMerge(
      "relative h-screen w-screen overflow-hidden transition-[filter] duration-700",
      isInverted && "invert"
    )}>
      <BackgroundMusic />
      <HeroBackground />
      
      <Outlet />

      <div className="fixed bottom-0 left-0 right-0">
        <SettingsBar />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

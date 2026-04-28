/** @vitest-environment jsdom */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { DopamineProvider } from './store/DopamineProvider';
import { SongProvider } from './utils/SongProvider';

// Mocking Shadertoy because it might not work in jsdom
vi.mock('react-shadertoy', () => ({
  Shadertoy: () => <div data-testid="shadertoy" />
}));

// Mock howler
vi.mock('howler', () => {
  const HowlMock = vi.fn().mockImplementation(function (this: any) {
    this.play = vi.fn();
    this.stop = vi.fn();
    this.unload = vi.fn();
  });
  return { Howl: HowlMock };
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App Flow and Image Handling', () => {
  beforeEach(() => {
    // Mock Date.now to bypass slider throttle
    let now = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => {
      now += 1000;
      return now;
    });
  });

  it('renders the home page and responds to dopamine changes', async () => {
    render(
      <MemoryRouter>
        <DopamineProvider>
          <SongProvider>
            <App />
          </SongProvider>
        </DopamineProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('SOCSDOCS')).toBeDefined();
    
    // Check if HeroBackground is rendered
    const heroBg = document.querySelector('.hero-background');
    expect(heroBg).toBeDefined();

    // Verify initial background image (intensity level 1)
    const overlayDiv = heroBg?.querySelector('div[style*="background-image"]');
    expect(overlayDiv?.getAttribute('style')).toContain('unsplash.com');

    // Simulate dopamine level change
    const slider = screen.getByRole('slider');
    // Change value to 5
    fireEvent.change(slider, { target: { value: '5' } });

    // Level 5 has overlayUrl: "" in backgrounds.ts
    const updatedOverlayDiv = document.querySelector('.hero-background div[style*="background-image"]');
    expect(updatedOverlayDiv?.getAttribute('style')).not.toContain('unsplash.com');
  });

  it('navigates to login page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DopamineProvider>
          <SongProvider>
            <App />
          </SongProvider>
        </DopamineProvider>
      </MemoryRouter>
    );

    const loginLinks = screen.getAllByText('LOGIN');
    fireEvent.click(loginLinks[0]);

    expect(screen.getByText('Sign In')).toBeDefined();
  });
});

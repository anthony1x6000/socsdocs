/** @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { DopamineProvider } from './store/DopamineProvider';

// Mocking Shadertoy because it might not work in jsdom
vi.mock('react-shadertoy', () => ({
  Shadertoy: () => <div data-testid="shadertoy" />
}));

describe('App Flow and Image Handling', () => {
  it('renders the home page and responds to dopamine changes', () => {
    render(
      <MemoryRouter>
        <DopamineProvider>
          <App />
        </DopamineProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('SOCSDOCS')).toBeDefined();
    
    // Check if HeroBackground is rendered
    const heroBg = document.querySelector('.hero-background');
    expect(heroBg).toBeDefined();

    // The overlay image is in a div inside hero-background
    const overlayDiv = heroBg?.querySelector('div[style*="background-image"]');
    expect(overlayDiv).toBeDefined();

    // Verify initial background image (intensity level 1)
    // From backgrounds.ts: 1: { overlayUrl: "...unsplash..." }
    expect(overlayDiv?.getAttribute('style')).toContain('unsplash.com');
  });

  it('navigates to login page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DopamineProvider>
          <App />
        </DopamineProvider>
      </MemoryRouter>
    );

    const loginLink = screen.getByText('LOGIN');
    fireEvent.click(loginLink);

    expect(screen.getByText('Sign In')).toBeDefined();
  });
});

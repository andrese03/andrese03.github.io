import '@testing-library/jest-dom';
import { metadata } from '../app/layout';

describe('RootLayout', () => {
  it('has correct metadata configuration', () => {
    expect(metadata.title).toBe('Andrés Encarnación | Software Developer');
    expect(metadata.description).toContain('Full-stack software developer');
    expect(metadata.keywords).toContain('software developer');
  });

  it('includes OpenGraph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.title).toBe(
      'Andrés Encarnación | Software Developer'
    );
    expect(metadata.openGraph?.url).toBe('https://andrese03.github.io');
  });

  it('includes Twitter metadata', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.creator).toBe('@andrese03');
  });

  it('has robots configuration', () => {
    expect(metadata.robots).toBeDefined();
  });
});

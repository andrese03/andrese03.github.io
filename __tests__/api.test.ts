import { getProjects, getPhotos, getLinks } from '../lib/api';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.reject(new Error('No API endpoint configured'))),
}));

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.warn to avoid noise in tests
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getProjects', () => {
    it('returns mock projects data when API fails', async () => {
      const result = await getProjects();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('slug');
      expect(result[0]).toHaveProperty('title');
    });
  });

  describe('getPhotos', () => {
    it('returns mock photos data when API fails', async () => {
      const result = await getPhotos();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
    });
  });

  describe('getLinks', () => {
    it('returns mock links data when API fails', async () => {
      const result = await getLinks();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('url');
    });
  });
});

import axios from 'axios';
import { Project, Photo, LinkRef } from '@/types';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

// Mock data fallbacks
const mockProjects: Project[] = [
    {
        slug: 'erp-system',
        title: 'ERP System',
        summary: 'A lightweight ERP system oriented to local small and medium business.',
        stack: 'MongoDB, ExpressJS, AngularJS, NodeJS',
        status: 'Live',
        year: '2018',
        url: 'https://softdevmanager.herokuapp.com/',
        image: '/images/placeholder-project.svg',
        tags: 'javascript,angular,mongodb,nodejs'
    },
    {
        slug: 'media-watch',
        title: 'Media Watch',
        summary: 'Collaborated as Developer Lead to build a social media tool designed to support internal company processes.',
        stack: 'ReactJS, NodeJS, MySQL',
        status: 'Live',
        year: '2019',
        url: 'https://mediawatch.com.do/',
        image: '/images/placeholder-project.svg',
        tags: 'react,nodejs,mysql'
    },
    {
        slug: 'health-care-app',
        title: 'Health Care Application',
        summary: 'Part of the initial developers to build an application capable of automating many Health Care processes.',
        stack: 'C#, ASP.NET, MSSQL',
        status: 'Live',
        year: '2017',
        url: 'https://medicalcore.net/',
        image: '/images/placeholder-project.svg',
        tags: 'csharp,aspnet,healthcare'
    },
    {
        slug: 'plastilap',
        title: 'Plastilap',
        summary: 'Worked as main developer to build the website promoting Dr. Lapaix\'s services.',
        stack: 'PHP, CodeIgniter, MySQL',
        status: 'Live',
        year: '2016',
        url: 'http://www.plastilap.com/',
        image: '/images/placeholder-project.svg',
        tags: 'php,codeigniter,mysql'
    }
];

const mockPhotos: Photo[] = [
    {
        id: '1',
        title: 'Profile Photo',
        location: 'Professional Headshot',
        date: '2023-12-15',
        url: '/images/profile.jpg',
        thumb: '/images/profile.jpg',
        tags: 'professional,headshot,portrait'
    },
    {
        id: '2',
        title: 'Unicorn Dreams',
        location: 'Digital Art',
        date: '2023-11-20',
        url: '/images/unicorn.png',
        thumb: '/images/unicorn.png',
        tags: 'unicorn,digital,art,fun'
    }
];

const mockLinks: LinkRef[] = [
    { name: 'github', url: 'https://github.com/andrese03', label: 'GitHub Profile' },
    { name: 'linkedin', url: 'https://linkedin.com/in/andres-encarnacion', label: 'LinkedIn Profile' },
    { name: 'twitter', url: 'https://twitter.com/andrese03', label: 'Twitter Profile' },
    { name: 'email', url: 'mailto:andresencarnacion03@gmail.com', label: 'Email Contact' }
];

// Cache utilities
const getCacheKey = (tab: string) => `portfolio_${tab}_cache`;
const getCacheTimestampKey = (tab: string) => `portfolio_${tab}_timestamp`;

const isCacheValid = (tab: string): boolean => {
    if (typeof window === 'undefined') return false;
    const timestamp = sessionStorage.getItem(getCacheTimestampKey(tab));
    if (!timestamp) return false;
    return Date.now() - parseInt(timestamp) < CACHE_DURATION;
};

const getCachedData = <T>(tab: string): T[] | null => {
    if (typeof window === 'undefined') return null;
    if (!isCacheValid(tab)) return null;
    const cached = sessionStorage.getItem(getCacheKey(tab));
    return cached ? JSON.parse(cached) : null;
};

const setCachedData = <T>(tab: string, data: T[]): void => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(getCacheKey(tab), JSON.stringify(data));
    sessionStorage.setItem(getCacheTimestampKey(tab), Date.now().toString());
};

// Main API function
export async function getSheet<T>(tab: 'projects' | 'photos' | 'links'): Promise<T[]> {
    // Check cache first
    const cached = getCachedData<T>(tab);
    if (cached) {
        return cached;
    }

    const apiBase = process.env.NEXT_PUBLIC_SHEET_API_BASE;

    // If no API endpoint configured, return mock data
    if (!apiBase || apiBase.includes('...')) {
        console.warn(`No valid API endpoint configured for ${tab}, using mock data`);
        const mockData = getMockData<T>(tab);
        setCachedData(tab, mockData);
        return mockData;
    }

    try {
        const response = await axios.get(`${apiBase}?t=${tab}`, {
            timeout: 5000,
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = response.data;
        if (Array.isArray(data)) {
            setCachedData(tab, data);
            return data;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.warn(`Failed to fetch ${tab} from API, using mock data:`, error);
        const mockData = getMockData<T>(tab);
        setCachedData(tab, mockData);
        return mockData;
    }
}

function getMockData<T>(tab: string): T[] {
    switch (tab) {
        case 'projects':
            return mockProjects as T[];
        case 'photos':
            return mockPhotos as T[];
        case 'links':
            return mockLinks as T[];
        default:
            return [];
    }
}

// Specific type-safe functions
export const getProjects = () => getSheet<Project>('projects');
export const getPhotos = () => getSheet<Photo>('photos');
export const getLinks = () => getSheet<LinkRef>('links');

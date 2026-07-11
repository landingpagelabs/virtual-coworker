import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9hb4dhmj',
  apiVersion: '2026-06-26',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN,
};

export const sanityClient = createClient(sanityConfig);

export const fetchSanity = async <T = any>(query: string, params = {}) => {
  return sanityClient.fetch<T>(query, params);
};

export const urlForImage = (source: any) => imageUrlBuilder(sanityConfig).image(source);

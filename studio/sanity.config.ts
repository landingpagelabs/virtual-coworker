import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas/schema';

export default defineConfig({
  name: 'virtual-coworker-studio',
  title: 'Virtual Coworker CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9hb4dhmj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});

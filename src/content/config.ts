import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const usecases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './usecases' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    difficulty: z.number().min(1).max(3),
    tags: z.array(z.string()).default([]),
    integrations: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { usecases };

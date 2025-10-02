import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
  }),
});

const friends = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
      description: z.string().optional(),
    })
  ),
});

export const collections = {
  posts,
  friends,
};

import { z } from 'zod';

const saveNewsSchema = z.object({
  body: z.object({
    title: z.string().min(3).describe('Title'),
    description: z.string(),
    content: z.string().min(3).describe('Content'),
    author: z.string().min(3).describe('Author'),
    image: z.url(),
    date: z.iso.datetime()
  })
});

const archiveNewsSchema = z.object({
  params: z.object({
    id: z.string().min(24).max(24)
  }),
  body: z.object({
    date: z.iso.datetime().nullable()
  })
});

const getNewsSchema = z.object({
  query: z.object({
    archived: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional()
  })
});

const deleteNewsSchema = z.object({
  params: z.object({
    id: z.string().min(24).max(24)
  })
});

export { saveNewsSchema, archiveNewsSchema, getNewsSchema, deleteNewsSchema };

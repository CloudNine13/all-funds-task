import { z } from 'zod';
import { IMAGE, QUERY_PARAMS } from '../constants.ts';

const saveNewsSchema = z.object({
  body: z.object({
    title: z.string().min(IMAGE.MIN_STRING_LENGTH).describe('Title'),
    description: z.string(),
    content: z.string().min(IMAGE.MIN_STRING_LENGTH).describe('Content'),
    author: z.string().min(IMAGE.MIN_STRING_LENGTH).describe('Author'),
    date: z.iso.datetime()
  }),
  file: z
    .object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z
        .string()
        .refine(
          (val) =>
            [
              IMAGE.MIME_TYPES.PNG,
              IMAGE.MIME_TYPES.JPEG,
              IMAGE.MIME_TYPES.GIF,
              IMAGE.MIME_TYPES.SVG,
              IMAGE.MIME_TYPES.WEBP
            ].includes(val),
          { message: IMAGE.INVALID_TYPE_MESSAGE }
        ),
      size: z.number(),
      buffer: z.instanceof(Buffer)
    })
    .describe('Image')
});

const archiveNewsSchema = z.object({
  params: z.object({
    id: z.string().min(IMAGE.ID_LENGTH).max(IMAGE.ID_LENGTH)
  }),
  body: z.object({
    date: z.iso.datetime().nullable()
  })
});

const getNewsSchema = z.object({
  query: z.object({
    [QUERY_PARAMS.ARCHIVED]: z.string().optional(),
    [QUERY_PARAMS.PAGE]: z.string().optional(),
    [QUERY_PARAMS.LIMIT]: z.string().optional()
  })
});

const deleteNewsSchema = z.object({
  params: z.object({
    id: z.string().min(IMAGE.ID_LENGTH).max(IMAGE.ID_LENGTH)
  })
});

export { saveNewsSchema, archiveNewsSchema, getNewsSchema, deleteNewsSchema };

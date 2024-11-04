import { z } from 'zod';
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 20);
export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, {
          method: 'HEAD',
          signal: controller.signal,
        });
        clearTimeout(timeout);
        const contentType = res.headers.get('content-type');
        return contentType?.startsWith('image/');
      } catch {
        return true;
      }
    }),
  pitch: z.string().min(10),
});

import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const categoriesListSchema = z.array(categorySchema);

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  discont_price: z.number().or(z.null()),
  description: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categoryId: z.number(),
});

export const productsListSchema = z.array(productSchema);

export const categoryProductsListSchema = z.object({
  category: categorySchema,
  data: productsListSchema,
});

export const productDataSchema = productsListSchema.length(1);

export const statusMessageSchema = z.object({
  status: z.literal('ERR').or(z.literal('OK')),
  message: z.string(),
});

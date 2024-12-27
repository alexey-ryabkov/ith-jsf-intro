import { type ZodTypeAny } from 'zod';
import { ApiRequest, ApiResponse } from '@app/types';
import { statusMessageSchema } from '@app/schemas';

export async function processApiRequest<
  T extends object | undefined = undefined,
>(
  request: ApiRequest,
  schema: ZodTypeAny,
): Promise<ApiResponse<T> | undefined> {
  try {
    const response = await request();
    if (response.ok) {
      const result = await response.json();
      return defineResponseSchema(schema).parse(result);
    } else {
      console.error(`HTTP-request ${response.status} error`);
      console.dir(response);
    }
  } catch (error) {
    console.error(`Processing api request error`);
    console.dir(error);
  }
  return;
}

export const defineResponseSchema = (responseSchema: ZodTypeAny) =>
  responseSchema.or(statusMessageSchema);

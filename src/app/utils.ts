import { type ZodTypeAny } from 'zod';
import { ApiRequest, ApiResponse } from '@app/types';
import { statusMessageSchema } from '@app/schemas';
import { store } from '@app/store';
import { showError } from '@store/actions';

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
      store.dispatch(
        showError(
          `An http error (code ${response.status}) occurred when requesting the web server`,
        ),
      );
    }
  } catch (error) {
    console.error(`Processing api request error`);
    console.dir(error);
    store.dispatch(
      showError(`An unknown error occurred when requesting the web server`),
    );
  }
  return;
}

export const defineResponseSchema = (responseSchema: ZodTypeAny) =>
  responseSchema.or(statusMessageSchema);

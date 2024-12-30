import { type ZodTypeAny } from 'zod';
import { ApiRequest, ApiResponse, ApiStatusMessage } from '@app/types';
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

export function checkFetchResultAndHandleFailed<T extends object>(
  result: T | ApiStatusMessage | undefined,
  handler: (msg?: string) => void,
): result is T {
  if (result) {
    if (!('status' in result)) {
      return true;
    } else {
      const { status, message } = result;
      handler(status === 'ERR' ? message : 'Unexpected server response');
      return false;
    }
  }
  return false;
}

export const discountPercent = (price: number, discountPrice?: number) =>
  discountPrice ? Math.round(((price - discountPrice) * 100) / price) : 0;

export const pluralized = (
  count: number,
  singular = 'item',
  plural = pluralizeWord(singular),
) => (count === 1 ? `${count} ${singular}` : `${count} ${plural}`);

export function pluralizeWord(word: string): string {
  if (word.endsWith('y') && !/[aeiou]y$/.test(word)) {
    return word.slice(0, -1) + 'ies';
  } else if (/[sxz]$/.test(word) || /[sh]$/.test(word)) {
    return word + 'es';
  } else if (word.endsWith('f')) {
    return word.slice(0, -1) + 'ves';
  } else if (word.endsWith('fe')) {
    return word.slice(0, -2) + 'ves';
  } else {
    return word + 's';
  }
}

export const defineResponseSchema = (responseSchema: ZodTypeAny) =>
  responseSchema.or(statusMessageSchema);

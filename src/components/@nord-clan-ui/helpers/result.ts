export type ErrorResult<T = undefined> = T extends undefined
  ? { success: false; error?: string }
  : { success: false; error?: string; value: T };

export type SuccessResult<T = undefined> = T extends undefined
  ? { success: true }
  : { success: true; value: T };

export type SuccessOrErrorResult<T = undefined, E = undefined> = SuccessResult<T> | ErrorResult<E>;

export function isSuccess<T, E>(result: SuccessOrErrorResult<T, E>): result is SuccessResult<T> {
  return result.success;
}

export function isError<T, E>(result: SuccessOrErrorResult<T, E>): result is ErrorResult<E> {
  return !result.success;
}

export function successResult(): SuccessResult {
  return { success: true };
}

export function successValueResult<T>(value: T): SuccessResult<T> {
  return { success: true, value } as SuccessResult<T>;
}

export function errorResult(error?: string): ErrorResult {
  return { success: false, error };
}

export function errorValueResult<E>(value: E, error?: string): ErrorResult<E> {
  return { success: false, error, value } as ErrorResult<E>;
}

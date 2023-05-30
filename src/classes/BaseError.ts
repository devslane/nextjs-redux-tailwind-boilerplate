import { AxiosError } from 'axios';
import { StatusCodes, StatusMessage } from 'constants/status-codes';

export enum ErrorCode {
  UNIDENTIFIED,
}

export type ErrorStatusCode = ErrorCode | StatusCodes;

export type ValidationErrorType = {
  field: string;
  message: string;
  rule: string;
};

const DEFAULT_ERROR = 'An unexpected error occurred. Please try again';

export class BaseError {
  constructor(
    readonly message: string = DEFAULT_ERROR,
    readonly status: ErrorStatusCode = ErrorCode.UNIDENTIFIED,
    readonly errors: ValidationErrorType[] = [],
    readonly data: any = []
  ) {}

  static fromJSON(axiosError: AxiosError<any>): BaseError {
    if (axiosError.code === 'ECONNABORTED') {
      return new BaseError(`Request Timeout (${axiosError.message})`);
    }

    if (!axiosError.response) {
      return new BaseError(
        'Unable to connect to server. Please check your internet connection try again.'
      );
    }

    const { status, data } = axiosError.response;
    const message: string =
      StatusMessage[status as StatusCodes] ?? DEFAULT_ERROR;

    return new BaseError(message, status, data?.errors ?? [], data?.data ?? []);
  }

  static toJSON(json: BaseError) {
    return {
      message: json.message || 'Error. Please Try Again.',
      status: json.status || -1,
      errors: json.errors || [],
      data: json.data || [],
    };
  }

  isValidationError(): boolean {
    return (this.errors || []).length > 0;
  }

  errorsByKey(key: string): ValidationErrorType | undefined {
    return this.errors?.find((er: ValidationErrorType) => er.field === key);
  }

  hasErrorByKey(key: string): boolean {
    return !!this.errorsByKey(key);
  }
}

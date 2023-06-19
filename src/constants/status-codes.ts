export enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export const StatusMessage: { [key in StatusCodes]: string } = {
  [StatusCodes.BAD_REQUEST]: 'Bad request, try again',
  [StatusCodes.UNAUTHORIZED]: 'Not authorized',
  [StatusCodes.FORBIDDEN]:
    'Forbidden, not authorized to view the requested resource',
  [StatusCodes.NOT_FOUND]: 'Requested resource not found on the server',
  [StatusCodes.METHOD_NOT_ALLOWED]: 'Requested Method not allowed',
  [StatusCodes.NOT_ACCEPTABLE]: 'Not Acceptable',
  [StatusCodes.PROXY_AUTHENTICATION_REQUIRED]:
    'Not authorized. Need to authenticate with proxy',
  [StatusCodes.REQUEST_TIMEOUT]: 'Request timeout',
  [StatusCodes.TOO_MANY_REQUESTS]:
    'too many requests in a given amount of time',

  [StatusCodes.INTERNAL_SERVER_ERROR]:
    'Server encountered an unexpected condition that prevented it from fulfilling the request.',
  [StatusCodes.NOT_IMPLEMENTED]:
    'Method is not supported by the server and cannot be handled',
  [StatusCodes.BAD_GATEWAY]:
    'Server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
  [StatusCodes.SERVICE_UNAVAILABLE]:
    'Server is not ready to handle the request.',
  [StatusCodes.GATEWAY_TIMEOUT]: 'Server cannot get a response in time.',
};

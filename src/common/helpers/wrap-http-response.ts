/**
 * Wraps the HTTP response payload and front-end message into an object.
 * @param payload - The payload to be wrapped.
 * @param frontEndMsg - The front-end message to be wrapped.
 * @returns An object containing the payload and front-end message.
 */
export const wrapHttpResponse = (payload: object, frontEndMsg: string) => {
  return {
    payload,
    frontEndMsg,
  };
};

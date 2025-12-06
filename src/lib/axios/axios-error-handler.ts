/* eslint-disable @typescript-eslint/no-explicit-any */
export function handleApiError(error: any) {
  if (!error.response) {
    error.message = "Network error — please check your connection.";
    throw error; // ❗ throw original axios error
  }

  const res = error.response.data;

  if (res?.message) {
    error.message = res.message; // ❗ attach message but do not destroy structure
    throw error;
  }

  const status = error.response.status;

  switch (status) {
    case 400:
      error.message = "Bad request — please check your input.";
      break;
    case 401:
      error.message = "Unauthorized — please log in again.";
      break;
    case 403:
      error.message = "Forbidden — you don’t have permission.";
      break;
    case 404:
      error.message = "Resource not found.";
      break;
    case 500:
      error.message = "Server error — please try again later.";
      break;
    default:
      error.message = "Unexpected error occurred. Please try again.";
  }

  throw error; // ❗ IMPORTANT: throw original axios error, not a new Error
}

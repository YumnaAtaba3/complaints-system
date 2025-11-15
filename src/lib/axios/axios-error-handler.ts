export function handleApiError(error: any) {
  if (!error.response) {
    // Network or unknown errors
    throw new Error("Network error — please check your connection.");
  }

  const status = error.response.status;

  switch (status) {
    case 400:
      throw new Error("Bad request — please check your input.");
    case 401:
      throw new Error("Unauthorized — please log in again.");
    case 403:
      throw new Error("Forbidden — you don’t have permission.");
    case 404:
      throw new Error("Resource not found.");
    case 500:
      throw new Error("Server error — please try again later.");
    default:
      throw new Error("Unexpected error occurred. Please try again.");
  }
}

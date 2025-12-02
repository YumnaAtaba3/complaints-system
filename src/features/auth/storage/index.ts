/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Provides access to user authentication token storage.
 * Utilizes the `dataStorage` utility to persist and retrieve the user's token.
 *
 * @see dataStorage
 * @type {ReturnType<typeof dataStorage>}
 */
import { dataStorage } from "../../../lib/storage";
// Persistent user token storage (Remember Me = ON)
// Persistent token (Remember Me = ON)
export const userStorage = dataStorage<string>("token");

// Session token (Remember Me = OFF)
export const sessionUserStorage = dataStorage<string>(
  "session_token",
  () => (typeof window !== "undefined" ? sessionStorage : null)
);
export const rolesStorage = dataStorage<any>("roles");


/**
 * Provides access to user authentication token storage.
 * Utilizes the `dataStorage` utility to persist and retrieve the user's token.
 *
 * @see dataStorage
 * @type {ReturnType<typeof dataStorage>}
 */
import { dataStorage } from "../../../lib/storage";

export const userStorage = dataStorage("token");

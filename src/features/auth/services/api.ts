/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../../../lib/axios";
import { userStorage } from "../storage";
import type { AuthPayload, AuthResponse } from "../types";

interface LoginResult {
  token: string;
  user: any;
  message: string;
}

class AuthServices {
  #endPoint = "/auth/";

  async login(payload: AuthPayload): Promise<LoginResult> {
    const response = await httpClient.post<AuthResponse>(
      `${this.#endPoint}email-login`,
      payload
    );

    const data = response.data.data;

    if (!data?.token) {
      // throw the API message if available
      throw new Error(
        response.data.message || "Invalid login response: missing token"
      );
    }

    // store token
    userStorage.set(data.token);

    return {
      token: data.token,
      user: data.user,
      message: response.data.message || "Login successful",
    };
  }
}

export default new AuthServices();

// async getMe(): Promise<UserProfile> {
//   const response = await httpClient.get<UserProfile>(
//     `${this.#endPoint}/profile`
//   );
//   return response.data;
// }

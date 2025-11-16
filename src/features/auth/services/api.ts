/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../../../lib/axios";
import { userStorage } from "../storage";
import type { AuthPayload, AuthResponse, UserProfile } from "../types";


class AuthServices {
  #endPoint = "/api/auth/";

  async login(payload: AuthPayload): Promise<{ token: string; user: any }> {
    const response = await httpClient.post<AuthResponse>(
      `${this.#endPoint}email-login`,
      payload
    );

    if (!response.data.data?.token) {
      throw new Error("Invalid login response: missing token");
    }

    // store token
    userStorage.set(response.data.data.token);

    return response.data.data; // { token, user }
  }

  async getMe(): Promise<UserProfile> {
    const response = await httpClient.get<UserProfile>(
      `${this.#endPoint}/profile`
    );
    return response.data;
  }
}

export default new AuthServices();

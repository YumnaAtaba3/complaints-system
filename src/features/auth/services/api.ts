import { httpClient } from "../../../lib/axios";
import { userStorage } from "../storage";
import type { AuthPayload, AuthResponse, UserProfile } from "../types";

class AuthServices {
  #endPoint = "/auth";

  async login(payload: AuthPayload): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      `${this.#endPoint}/login`,
      payload
    );

    const { access_token, refresh_token } = response.data;

    userStorage.set(access_token);
    return { access_token, refresh_token };
  }

  async signUp(payload: AuthPayload): Promise<AuthResponse> {
    return this.login(payload);
  }

  async getMe(): Promise<UserProfile> {
    const response = await httpClient.get<UserProfile>(
      `${this.#endPoint}/profile`
    );
    return response.data;
  }
}

export default new AuthServices();

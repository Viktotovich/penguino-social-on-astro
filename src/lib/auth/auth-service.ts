import { authClient } from "./auth-client";

export default class AuthService {
  public async signInProvider(provider: "reddit" | "google") {
    const data = await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });

    return data;
  }

  public async signInDefault(
    email: string,
    password: string,
    rememberMe: boolean
  ) {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: "/dashboard",
    });

    return { data, error };
  }

  public async signUpEmail(name: string, email: string, password: string) {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: undefined,
      callbackURL: "/dashboard",
    });

    return { data, error };
  }

  public async signOut() {
    try {
      await authClient.signOut();
      return {
        data: "success",
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        error: err,
      };
    }
  }
}

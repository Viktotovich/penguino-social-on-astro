//Initiate Astro Action
import { defineAction, ActionError } from "astro:actions";

//Validation
import { z } from "astro:schema";

//Use Auth Service wrapper
import AuthService from "@/lib/auth/auth-service";

const auth = new AuthService();

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().nonempty(),
    email: z.string().email().min(5).toLowerCase(),
    password: z.string().min(8),
    confirm: z.string().min(8),
  }),
  handler: async (input) => {
    if (input.password !== input.confirm) {
      throw new ActionError({
        code: "NOT_ACCEPTABLE",
        message:
          "Could not finalize sign-up. Please make sure that the password entered is correct",
      });
    }

    try {
      await auth.signUpEmail(input.name, input.email, input.password);

      return {
        error: undefined,
        data: {
          message: "Success!",
        },
      };
    } catch (err) {
      throw new ActionError({
        code: "BAD_GATEWAY",
        message: `Could not create an account. ${err}! please try again..`,
      });
    }
  },
});

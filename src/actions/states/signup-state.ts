import type { ActionError } from "astro:actions";

export type SignUpFormState = {
  message?: string | null;
  error?: ActionError | null;
};

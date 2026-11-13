"use client";

//TW essentials
import { cn } from "@/lib/utils";
import { Button } from "../generated/button";
import { Card, CardContent } from "../generated/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../generated/field";
import { Input } from "../generated/input";

import { Toaster } from "sonner";
import { toast } from "sonner";

import { useState } from "react";
import AuthService from "@/lib/auth/auth-service";

const auth = new AuthService();

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") === "on";

    setIsLoading(true);
    try {
      const result = await auth.signInDefault(email, password, remember);
      if (result.error) {
        toast.error(result.error.message ?? "Could not log in");
      } else {
        window.location.href = "/community";
      }
    } catch (err) {
      toast.error("Could not log in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")} {...{}}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={submitForm}
            aria-label="Login form"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="font-display text-2xl font-extrabold text-ink">
                  Welcome back
                </h1>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="remember">Remember me</FieldLabel>
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="aspect-square rounded border bg-background shadow-sm"
                    />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="hover:cursor-pointer"
                  disabled={isLoading}
                >
                  Log in
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    auth.signInProvider("google");
                  }}
                  className="hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="#000"
                        d="M12 5a7 7 0 1 0 6.93 8H13a1 1 0 1 1 0-2h7a1 1 0 0 1 1 1a9 9 0 1 1-2.654-6.381a1 1 0 0 1-1.41 1.418A6.98 6.98 0 0 0 12 5"
                      />
                    </g>
                  </svg>
                  <span className="sr-only">Sign in with Google</span>
                  <span>Continue with Google</span>
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://res.cloudinary.com/dxryzhwxi/image/upload/v1762603571/penguino-registration-page_hnmtu8.png"
              alt="Penguino Concept Art"
              className="absolute inset-0 h-full w-full object-cover object-center"
              height={400}
              width={400}
            />
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a href="/register">Sign up</a>
      </p>
      <Toaster />
    </div>
  );
}

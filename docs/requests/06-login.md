Build the login page with email and Google sign-in, matching the signup form.

- Add `src/components/forms/LoginForm.tsx`, a default-exported React component `LoginForm` (no props). Copy the
  card layout of `src/components/forms/SignupForm.tsx` (the `Card`, `CardContent`, `Field`, `Input`, `Button` and
  `FieldSeparator` components from `src/components/generated/`), but it must not import `astro:actions`.
  - Heading `<h1>` `Welcome back` with `font-display text-2xl font-extrabold text-ink`.
  - An email input (`id="email"`, `type="email"`, `required`) and a password input (`id="password"`,
    `type="password"`, `required`), each with a label, and a "Remember me" checkbox (`id="remember"`).
  - A submit `Button` with the text `Log in`. On submit, prevent the default, call
    `new AuthService().signInDefault(email, password, remember)` from `src/lib/auth/auth-service.ts`; on an error
    show `toast.error(error.message ?? "Could not log in")` from `sonner`, otherwise set
    `window.location.href = "/community"`. Disable the button while the request runs.
  - Below a `FieldSeparator` with the text `Or continue with`, one outline `Button` with the text
    `Continue with Google` that calls `new AuthService().signInProvider("google")`.
  - A line `Don't have an account? <a href="/register">Sign up</a>` in `text-sm text-muted-foreground`.
  - Render `<Toaster />` from `sonner` like SignupForm does.
- Replace the body of `src/pages/login.astro` with the same structure as `src/pages/register.astro`: redirect to
  `/community` when `Astro.locals.session` and `Astro.locals.user` are set, otherwise render `<LoginForm client:load />`
  inside the same wrappers.
- Add `tests/login-form.test.tsx`: render `LoginForm` with `renderToStaticMarkup` and check that the output contains
  `id="email"`, `id="password"`, the text `Log in`, the text `Continue with Google` and `href="/register"`.
- Bump `version` in `package.json` to `0.6.0`.

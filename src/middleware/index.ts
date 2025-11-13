import { auth } from "@/lib/auth/auth";
import { defineMiddleware } from "astro:middleware";

/*USAGE:

const session = () => {
    if (Astro.locals.session) {
        return Astro.locals.session;
    } else {
        // Redirect to login page if the user is not authenticated
        return Astro.redirect("/login");
    }
}
    
*/
export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
    context.locals.contexturl = new URL(context.url);
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  return next();
});

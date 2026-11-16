import { auth } from "@/lib/auth/auth";
import { guard } from "@/lib/auth/roles";
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
        context.locals.contexturl = new URL(context.url);
    }

    const role = isAuthed
        ? ((isAuthed.user as { role?: string }).role ?? "USER")
        : null;
    const verdict = guard(context.url.pathname, role);
    if (verdict === "login") return context.redirect("/login");
    if (verdict === "forbidden") return context.redirect("/403");

    return next();
});

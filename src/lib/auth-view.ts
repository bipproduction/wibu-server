import { Context } from "elysia";
import { auth } from "@/lib/auth";

const authView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    if(BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
      console.log(context.request)
      return auth.handler(context.request);
    }
    else {
      context.error(405)
    }
  }


export default authView;
// pages/api/auth/[...auth0].js

// This just is not going to work at all as this portion of the library depends on the node runtime.
// Will investigate authenticating in a different way (manually?) and using the session here

import { handleAuth } from "@auth0/nextjs-auth0";

export const config = { runtime: "edge" };

export default handleAuth();

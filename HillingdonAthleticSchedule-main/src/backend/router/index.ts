import * as trpc from "@trpc/server";
import superjson from "superjson";
import { locationRouter } from "./location";
import { eventRouter } from "./event";
import { sidenoteRouter } from "./sidenote";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("location.", locationRouter)
  .merge("sidenote.", sidenoteRouter)
  .merge("event.", eventRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler

import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("add-event", {
    input: z.object({
      group: z.string(),
      sidenote: z.string(),
      location: z.string(),
      datetimestring: z.string(),
      datetimedate: z.date(),
    }),
    async resolve({ input }) {
      const eventInDb = await prisma.event.create({
        data: {
          ...input,
        },
      });
      return { success: true, event: eventInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler

import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc.router().merge(
  "event.",
  trpc
    .router()
    .query("all", {
      resolve() {
        return prisma.event.findMany();
      },
    })
    .mutation("update", {
      input: z.object({
        id: z.number(),
        group: z.string(),
        sidenote: z.string(),
        location: z.string(),
        datetimestring: z.string(),
        datetimedate: z.date(),
      }),
      async resolve({ input }) {
        const { id, ...rest } = input;
        const modEventInDb = await prisma.event.update({
          where: { id },
          data: {
            ...rest,
          },
        });
        return { success: true, modEvent: modEventInDb };
      },
    })
    .mutation("create", {
      async resolve() {
        console.log("event added");
        const addEventInDb = await prisma.event.create({
          data: {
            group: "",
            sidenote: "",
            location: "",
            datetimestring: "2022-12-30T12:15:00.000",
            datetimedate: new Date("2022-12-30T12:15:00.000Z"),
          },
        });
        return { success: true, addEvent: addEventInDb };
      },
    })
    .mutation("delete", {
      input: z.object({
        id: z.number(),
      }),
      async resolve({ input }) {
        const { id } = input;
        const removeEventInDb = await prisma.event.deleteMany({
          where: {
            id: id,
          },
        });
        return { success: true, removeEvent: removeEventInDb };
      },
    })
);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler

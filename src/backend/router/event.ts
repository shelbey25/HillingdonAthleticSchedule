import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const eventRouter = trpc
  .router()
  .query("all", {
    resolve() {
      return prisma.event.findMany({
        orderBy: [{ id: "asc" }],
        include: { location: true, sidenote: true },
      });
    },
  })
  .query("allByDate", {
    resolve() {
      return prisma.event.findMany({
        orderBy: [{ datetimedate: "asc" }],
        include: { location: true, sidenote: true },
      });
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
      const { id, location, sidenote, ...rest } = input;
      const modEventInDb = await prisma.event.update({
        where: { id },
        data: {
          ...rest,
          sidenote: {
            connectOrCreate: {
              create: {
                important: false,
                name: sidenote,
              },
              where: {
                name: sidenote,
              },
            },
          },
          location: {
            // alright shelbe this is it.
            // so what it does, is that it first looks for a location that has a matching name
            // if it doesnt find one itll create a new location
            connectOrCreate: {
              create: {
                important: false,
                name: location,
              },
              where: {
                name: location,
              },
            },
          },
        },
      });
      return { success: true, modEvent: modEventInDb };
    },
  })
  .mutation("create", {
    async resolve() {
      const addEventInDb = await prisma.event.create({
        data: {
          group: "",
          datetimestring: "2022-12-30T12:15:00.000",
          datetimedate: new Date("2022-12-30T12:15:00.000Z"),
          sidenote: {
            connectOrCreate: {
              create: {
                important: false,
                name: "",
              },
              where: {
                name: "",
              },
            },
          },
          location: {
            connectOrCreate: {
              create: {
                important: false,
                name: "",
              },
              where: {
                name: "",
              },
            },
          },
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
  });
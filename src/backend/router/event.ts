import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";
/*OR: [
                { datetimestring: "" },
                { datetimestring: { contains: year } },
              ],*/
export const eventRouter = trpc
  .router()
  .query("all", {
    async resolve() {
      return prisma.event.findMany({
        orderBy: [{ id: "asc" }],
        include: { location: true, sidenote: true },
      });
    },
  })
  .query("allByDate", {
    input: z.object({
      take: z.number(),
      search: z.string(),
      year: z.string(),
      month: z.string(),
      day: z.string(),
      yes: z.boolean(),
    }),
    async resolve({ input }) {
      const { take, search, year, month, day, yes } = input;
      return prisma.event.findMany({
        orderBy: [{ datetimedate: "asc" }],
        include: { location: true, sidenote: true },
        take: take,
        where: {
          AND: [
            { group: { contains: search } },
            {
              OR: {
                AND: [
                  { datetimestring: { contains: year } },

                  { datetimestring: { contains: month } },

                  { datetimestring: { contains: day } },
                ],
              },
            },
          ],
        },
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
        where: { id: id },
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

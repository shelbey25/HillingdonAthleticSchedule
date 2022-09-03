import * as trpc from "@trpc/server";
import { prisma } from "@/backend/utils/prisma";
import { z } from "zod";

export const locationRouter = trpc
  .router()
  // shelbe/ what is this naming............. leave it please now I have to locate it can we fix it later after we fi

  //
  .query("all", {
    resolve() {
      return prisma.location.findMany();
    },
  })
  .query("allNotImportant", {
    resolve() {
      return prisma.location.findMany({ where: { important: false } });
    },
  })
  .query("allRise", {
    resolve() {
      return prisma.location.findMany({
        orderBy: [{ id: "asc" }],
        where: { important: true },
      });
    },
  })
  .query("allRisePopular", {
    resolve() {
      return prisma.location.findMany({
        orderBy: [{ id: "asc" }],
        where: { important: true },
      });
    },
  })
  .mutation("create", {
    resolve() {
      return prisma.location.create({
        data: {
          name: "",
          important: true,
          events: undefined,
        },
      });
    },
  })
  .mutation("deleteUsYeetus", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const removeLocoInDb = await prisma.location.deleteMany({
        where: {
          id: id,
        },
      });
      return { success: true, deleteLoci: removeLocoInDb };
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.number(),
      name: z.string(),
      important: z.boolean(),
    }),
    async resolve({ input }) {
      const { id, ...rest } = input;
      const modEventInDb = await prisma.location.update({
        where: { id: id },
        data: {
          ...rest,
          events: undefined,
        },
      });
      return { success: true, modLoco: modEventInDb };
    },
  });

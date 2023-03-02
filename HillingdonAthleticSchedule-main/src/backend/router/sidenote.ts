import * as trpc from "@trpc/server";
import { prisma } from "@/backend/utils/prisma";
import { z } from "zod";

export const sidenoteRouter = trpc
  .router()
  // SHEBE WHY IS THIS CALLED LOCATION WHEN IT HAS NOTHING TO DO WITH LOCATION?????????
  //Sorry it was easiest I was just temporary

  .query("all", {
    resolve() {
      return prisma.sidenote.findMany();
    },
  })
  .query("allNotImportant", {
    resolve() {
      return prisma.sidenote.findMany({ where: { important: false } });
    },
  });

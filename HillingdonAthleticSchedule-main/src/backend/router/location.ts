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
  });

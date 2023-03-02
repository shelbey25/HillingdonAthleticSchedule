-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,
    "sidenote" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "datetimestring" TEXT NOT NULL,
    "datetimedate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

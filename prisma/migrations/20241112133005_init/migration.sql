/*
  Warnings:

  - You are about to drop the `Run_Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Run_Table";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Run" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "runName" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "distance" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Run" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "runName" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "distance" REAL NOT NULL,
    "heartrate" INTEGER NOT NULL DEFAULT 60,
    "heartratezone" TEXT NOT NULL DEFAULT 'Zone 1',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Run" ("createdAt", "distance", "heartrate", "id", "runName", "time") SELECT "createdAt", "distance", "heartrate", "id", "runName", "time" FROM "Run";
DROP TABLE "Run";
ALTER TABLE "new_Run" RENAME TO "Run";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

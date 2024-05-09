-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "instansi" TEXT NOT NULL,
    "peserta" TEXT NOT NULL,
    "tempat" TEXT NOT NULL,
    "waktu" DATETIME NOT NULL,
    "materi" TEXT NOT NULL,
    "jumlahPeserta" TEXT NOT NULL,
    "keterangan" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("id", "instansi", "jumlahPeserta", "keterangan", "materi", "peserta", "status", "tempat", "userId", "waktu") SELECT "id", "instansi", "jumlahPeserta", "keterangan", "materi", "peserta", "status", "tempat", "userId", "waktu" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

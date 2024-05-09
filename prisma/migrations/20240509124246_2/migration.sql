-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "instansi" TEXT NOT NULL,
    "peserta" TEXT NOT NULL,
    "tempat" TEXT NOT NULL,
    "waktu" DATETIME NOT NULL,
    "materi" TEXT NOT NULL,
    "jumlahPeserta" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

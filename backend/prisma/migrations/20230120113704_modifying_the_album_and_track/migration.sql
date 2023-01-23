/*
  Warnings:

  - You are about to drop the column `name` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `versionName` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the `SongTrack` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SongTrack" DROP CONSTRAINT "SongTrack_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "name",
DROP COLUMN "versionName",
ADD COLUMN     "albumCoverUrl" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "releasedDate" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "SongTrack";

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "trackNumber" INTEGER NOT NULL,
    "duration" DOUBLE PRECISION,
    "albumId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

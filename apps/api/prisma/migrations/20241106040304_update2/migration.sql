/*
  Warnings:

  - You are about to drop the column `artist` on the `event` table. All the data in the column will be lost.
  - Added the required column `locationUrl` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `artist`,
    ADD COLUMN `locationUrl` VARCHAR(191) NOT NULL;

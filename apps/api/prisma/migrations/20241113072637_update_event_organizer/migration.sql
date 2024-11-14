/*
  Warnings:

  - You are about to drop the column `isVerify` on the `eventorganizer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `eventorganizer` DROP COLUMN `isVerify`,
    ADD COLUMN `isVerified` BOOLEAN NULL,
    ADD COLUMN `verifyCode` VARCHAR(191) NULL;

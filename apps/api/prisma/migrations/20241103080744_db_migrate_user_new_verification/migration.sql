/*
  Warnings:

  - You are about to drop the column `discountExpiry` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `discountStart` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `isVerified` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyCode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `discountExpiry`,
    DROP COLUMN `discountStart`,
    MODIFY `version` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isVerified` BOOLEAN NOT NULL,
    ADD COLUMN `verifyCode` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to alter the column `discount` on the `discounts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `discounts` MODIFY `discount` DOUBLE NOT NULL;

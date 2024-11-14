-- DropIndex
DROP INDEX `users_identityNumber_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isGoogleRegister` BOOLEAN NULL DEFAULT false,
    MODIFY `phoneNumber` LONGTEXT NULL,
    MODIFY `identityNumber` LONGTEXT NULL;

/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `auth_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth_users` DROP COLUMN `emailVerified`,
    ADD COLUMN `email_verified` BOOLEAN NULL;

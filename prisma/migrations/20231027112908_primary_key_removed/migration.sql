/*
  Warnings:

  - You are about to drop the column `primary_key` on the `auth_keys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth_keys` DROP COLUMN `primary_key`;

/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `VerificationRequest`;

-- CreateTable
CREATE TABLE `auth_users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `auth_users_id_key`(`id`),
    UNIQUE INDEX `auth_users_email_key`(`email`),
    UNIQUE INDEX `auth_users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `active_expires` BIGINT NOT NULL,
    `idle_expires` BIGINT NOT NULL,

    UNIQUE INDEX `auth_sessions_id_key`(`id`),
    INDEX `auth_sessions_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_keys` (
    `id` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `primary_key` BOOLEAN NOT NULL,
    `expires` BIGINT NULL,

    UNIQUE INDEX `auth_keys_id_key`(`id`),
    INDEX `auth_keys_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_sessions` ADD CONSTRAINT `auth_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_keys` ADD CONSTRAINT `auth_keys_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

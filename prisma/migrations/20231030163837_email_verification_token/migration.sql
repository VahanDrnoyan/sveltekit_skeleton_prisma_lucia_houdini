-- CreateTable
CREATE TABLE `email_verification_token` (
    `id` VARCHAR(191) NOT NULL,
    `expires` BIGINT NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

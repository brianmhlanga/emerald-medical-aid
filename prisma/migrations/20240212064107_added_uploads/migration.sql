-- AlterTable
ALTER TABLE `individual` ADD COLUMN `id_photos` JSON NULL;

-- CreateTable
CREATE TABLE `Attachments` (
    `id` VARCHAR(191) NOT NULL,
    `attachment_name` VARCHAR(191) NOT NULL,
    `date_updated` DATETIME(3) NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

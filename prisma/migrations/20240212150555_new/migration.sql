-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `profile` ENUM('ADMIN', 'STUDENT') NOT NULL DEFAULT 'ADMIN',
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `current_logged_in_at` DATETIME(3) NULL,
    `last_logged_in_at` DATETIME(3) NOT NULL,
    `account_status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `individual` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `id_number` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `membership_number` VARCHAR(191) NULL,
    `cell_number` VARCHAR(191) NULL,
    `physical_address` VARCHAR(191) NULL,
    `place_of_birth` VARCHAR(191) NULL,
    `marital_status` VARCHAR(191) NULL,
    `employer_name` VARCHAR(191) NULL,
    `employer_contact_number` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `department` VARCHAR(191) NULL,
    `ec_number` VARCHAR(191) NULL,
    `station_number` VARCHAR(191) NULL,
    `package_type` VARCHAR(191) NULL,
    `package_details` VARCHAR(191) NULL,
    `previous_ailments` JSON NULL,
    `id_photos` JSON NULL,
    `other_information` VARCHAR(191) NULL,
    `previous_society_name` VARCHAR(191) NULL,
    `previous_package_name` VARCHAR(191) NULL,
    `from_date` DATETIME(3) NULL,
    `to_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tyforms` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `id_number` VARCHAR(191) NULL,
    `ministry` VARCHAR(191) NULL,
    `department_code` VARCHAR(191) NULL,
    `individual_id` VARCHAR(191) NULL,
    `station_code` VARCHAR(191) NULL,
    `selected_application_type` VARCHAR(191) NULL,
    `card_type` VARCHAR(191) NULL,
    `section` VARCHAR(191) NULL,
    `subsection` VARCHAR(191) NULL,
    `employee_code_number` VARCHAR(191) NULL,
    `cd` VARCHAR(191) NULL,
    `payee_code` VARCHAR(191) NULL,
    `amount_deducted` DOUBLE NULL,
    `from_date_ty` VARCHAR(191) NULL,
    `to_date_ty` VARCHAR(191) NULL,
    `policy_medical_aid_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tyforms_individual_id_key`(`individual_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dependent` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `individual_id` VARCHAR(191) NULL,
    `relationship` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `id_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attachments` (
    `id` VARCHAR(191) NOT NULL,
    `attachment_name` VARCHAR(191) NOT NULL,
    `date_updated` DATETIME(3) NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tyforms` ADD CONSTRAINT `Tyforms_individual_id_fkey` FOREIGN KEY (`individual_id`) REFERENCES `individual`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dependent` ADD CONSTRAINT `Dependent_individual_id_fkey` FOREIGN KEY (`individual_id`) REFERENCES `individual`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

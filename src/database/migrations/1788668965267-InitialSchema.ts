import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1788668965267 implements MigrationInterface {
    name = 'InitialSchema1788668965267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`role\` enum ('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`doctors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`specialization\` varchar(255) NOT NULL, \`consultationFee\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_55651e05e46413d510215535ed\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`appointmentDate\` timestamp NOT NULL, \`status\` enum ('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`patientId\` int NULL, \`doctorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_55651e05e46413d510215535edf\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_9f2faf95b8a27bafedd02344615\` FOREIGN KEY (\`patientId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_f7ca3e38886beda0c3abb454961\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_f7ca3e38886beda0c3abb454961\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_9f2faf95b8a27bafedd02344615\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_55651e05e46413d510215535edf\``);
        await queryRunner.query(`DROP TABLE \`bookings\``);
        await queryRunner.query(`DROP INDEX \`REL_55651e05e46413d510215535ed\` ON \`doctors\``);
        await queryRunner.query(`DROP TABLE \`doctors\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}

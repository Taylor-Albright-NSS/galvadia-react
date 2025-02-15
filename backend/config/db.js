import { Sequelize } from "sequelize";

// Connect to PostgreSQL database
// eslint-disable-next-line no-undef
export const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:Bim9jibjob6!@localhost:5432/galvadia', {
  dialect: 'postgres',
  logging: false // Turn off logging if not needed
});


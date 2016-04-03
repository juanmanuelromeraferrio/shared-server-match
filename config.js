var dbConnection = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

module.exports = dbConnection;

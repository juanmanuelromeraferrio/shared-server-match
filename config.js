var dbConnection = process.env.DATABASE_URL || 'postgres://localhost:5432/hobby-dev';

module.exports = dbConnection;


  
// Proper way to initialize and share the Database object

// Loading and initializing the library:
const pgp = require('pg-promise')();

// Preparing the connection details:
const cn = 'postgres://postgres:password@localhost:5432/my_schedules';

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;
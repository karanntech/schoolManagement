import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;

// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file

// // Sequelize instance configuration without SSL
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3306, // Default MySQL port
//     dialectOptions: {
//       connectTimeout: 30000,  // Set connection timeout (in ms)
//     },
//     logging: false, // Turn off logging for cleaner output (you can change it based on your needs)
//   }
// );

// // Test the database connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully!');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err.message || err);
//   });

// export default sequelize;


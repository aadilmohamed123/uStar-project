const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "ustar",
      user: "shalom",
      password: "pass",
    },
  },
  test: {
    connection: {
      database: "ustar_test",
      user: "shalom",
      password: "pass",
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
const log = console.log;
console.log = (...args) => {
  if (!/FsMigrations/.test(args[0])) log(...args);
};
module.exports = { ...customConfig[ENV], ...baseConfig };

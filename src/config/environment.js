export const environment = {
  frontend: {
    host: process.env.FRONTEND_HOST || "localhost",
    port: process.env.FRONTEND_PORT || 5173,
  },

  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    name: process.env.DB_NAME || "tasks",
  },
};

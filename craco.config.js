const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@pexeso": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "public/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@pexeso/(.*)$": "<rootDir>/src/$1",
      },
    },
  },
};

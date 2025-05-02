module.exports = {
  preset: "react-native",
  // globals: {
  //   "ts-jest": {
  //     babelConfig: true,
  //   },
  // },
  setupFiles: ["./jest-setup.ts"],
  testMatch: ["**/*.spec.{ts,tsx}"],
  cacheDirectory: ".jest/cache",
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        babelConfig: true,
      },
    ],
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        babelConfig: true,
      },
    ],
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
        module: "commonjs",
        target: "ES2017",
        lib: ["ES2017", "DOM"],
        allowJs: true,
        skipLibCheck: true
      },
      diagnostics: false
    }
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },

  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ]
};
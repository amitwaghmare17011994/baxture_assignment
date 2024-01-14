module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
       "^@repositories(.*)$": "<rootDir>/src/repositories$1",
       "^@controllers(.*)$": "<rootDir>/src/controllers$1",
       "^@db(.*)$": "<rootDir>/src/db$1",
       "^@entities(.*)$": "<rootDir>/src/entities$1",
       "^@utils(.*)$": "<rootDir>/src/utils$1",
       "^@constants(.*)$": "<rootDir>/src/constants$1",
      }
  };
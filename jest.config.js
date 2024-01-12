module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      // Elimina o comenta la siguiente línea si está presente
      // '\\.svg$': '<rootDir>/node_modules/react-native-svg-transformer/index.js',
    },
    moduleNameMapper: {
      // Añade esta línea para manejar archivos SVG
      '\\.svg$': '<rootDir>/node_modules/react-native-svg-transformer/index.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: "./test-results",
          outputName: "junit.xml"
        }
      ]
    ],
    // ... otras configuraciones ...
  };
  
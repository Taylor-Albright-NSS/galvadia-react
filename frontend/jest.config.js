export default {
    transform: {
      "^.+\\.js$": "babel-jest", // Transform .js files using babel-jest
    },
    testEnvironment: 'node', // Make sure you're using the right test environment for Node.js
  };
  
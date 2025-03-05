export default {
    presets: [
      '@babel/preset-env', // Handles ESM and modern JavaScript
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs' // Ensures CommonJS compatibility for Jest
    ]
  };
  
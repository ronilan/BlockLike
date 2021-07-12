module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
      "html"
  ],
  globals: {
    blockLike: true,
    Synth: true
  },
  rules: {
    'no-unused-expressions': [
      'off',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    'no-unmodified-loop-condition': 'off'
  }
}

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'variants', 'responsive', 'screen', 'include', 'at-root']
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  }
};

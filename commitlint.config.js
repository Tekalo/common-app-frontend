// build: Changes that affect the build system or external dependencies
// ci: Changes to our CI configuration files and scripts
// docs: Documentation or comment updates
// feat: Work on new features
// fix: Work on bug fixes
// perf: A code change that improves performance
// refactor: Changing code that neither fixes a bug nor adds a feature
// design: Changes that affect the design or user experience
// style: Changes that affect the style of the code base
// test: Adding missing tests or correcting existing tests
// revert: Reverts code to something previous
// merge: Merges something
// security: Changes that affect the security of the code base

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'design',
        'style',
        'test',
        'merge',
        'security',
      ],
    ],
  },
};

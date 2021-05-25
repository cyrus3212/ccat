// This script helps bootstrap a new cx application. It:
// 1. Prompts the user for key information to populate package.json
// 2. Populate package.json with the info provided
// 3. Removes dev-specific scripts from cx-starter's package.json that aren't needed for deployed app

/* eslint-disable no-var */
/* eslint-disable no-console */
var rimraf = require('rimraf');
var chalk = require('chalk');
var replace = require('replace');
var prompt = require('prompt');
var fs = require('fs');

var chalkSuccess = chalk.green;
var chalkProcessing = chalk.blue;
var chalkWarn = chalk.red;

prompt.colors = false; // resolves https://ghe.coxautoinc.com/coxauto-ui/common-experience/issues/139

var prompts = [
  {
    name: 'projectName',
    description: 'Project name (default: new-project)',
    pattern: /^[^._][a-z0-9\.\-_~]+$/,
    message:
      'Limited to: lowercase letters, numbers, period, hyphen, ' +
      'underscore, and tilde; cannot begin with period or underscore.'
  },
  {
    name: 'version',
    description: 'Version (default: 0.1.0)'
  },
  {
    name: 'author',
    description: 'Author (default: Cox Automotive)'
  },
  {
    name: 'license',
    description: 'License (default: UNLICENSED)'
  },
  {
    name: 'description',
    description: 'Project description'
  }
];

console.log(chalkProcessing('Updating package.json settings:'));
prompt.start();

prompt.get(prompts, function(err, result) {
  // parse user responses
  // default values provided for fields that will cause npm to complain if left empty
  const responses = [
    {
      key: 'name',
      value: result.projectName || 'new-project'
    },
    {
      key: 'version',
      value: result.version || '0.1.0'
    },
    {
      key: 'author',
      value: result.author || 'Cox Automotive'
    },
    {
      key: 'license',
      value: result.license || 'UNLICENSED'
    },
    {
      key: 'description',
      value: result.description
    },
    // simply use an empty URL here to clear the existing repo URL
    {
      key: 'url',
      value: ''
    }
  ];

  // update package.json with the user's values
  responses.forEach(res => {
    replace({
      regex: `("${res.key}"): "(.*?)"`,
      replacement: `$1: "${res.value}"`,
      paths: ['package.json'],
      recursive: false,
      silent: true
    });
  });

  // Set TrackJS AppKey to projectName
  replace({
    regex: /#APPKEY#/,
    replacement: result.projectName || 'new-project',
    paths: ['./public/index.html'],
    recursive: false,
    silent: true
  });

  // reset package.json 'keywords' field to empty state
  replace({
    regex: /"keywords": \[[\s\S]+?\]/,
    replacement: `"keywords": []`,
    paths: ['package.json'],
    recursive: false,
    silent: true
  });

  // remove dev-only scripts from package.json
  replace({
    regex: /\s*("prepublish:docs":|"publish:docs":|"commit":).*/g,
    replacement: '',
    paths: ['package.json'],
    recursive: false,
    silent: true
  });

  // remove private setting so the package can be published to npm
  // (we set this private in our code since it doesn't make sense
  // for us to publish cx-starter itself to npm)
  replace({
    regex: /\s*("private":).*/g,
    replacement: '',
    paths: ['package.json'],
    recursive: false,
    silent: true
  });

  const newReadMe =
    '# ' +
    result.projectName +
    '\n' +
    'This project was bootstrapped with [cx-starter](https://ghe.coxautoinc.com/coxauto-ui/common-experience/tree/master/packages/cx-starter).\n';

  // Change README.md text
  fs.writeFile('README.md', newReadMe, function(err) {
    if (err) return console.log(err);
  });

  // remove all setup scripts from the 'tools' folder
  console.log(chalkSuccess('\nSetup complete! Key commands to get started:'));
  console.log('Start the app and begin coding: ' + chalk.blue('npm start'));
  console.log('Run tests: ' + chalk.blue('npm test'));
  console.log('Remove the demo app: ' + chalk.blue('npm run remove-demo\n'));
  console.log('Review the link in README.md for more info.');
  rimraf('./tools/setup', error => {
    if (error) throw new Error(error);
  });
});

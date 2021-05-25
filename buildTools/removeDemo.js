// This script removes demo app files
var rimraf = require('rimraf');
var fs = require('fs');
var chalk = require('chalk');

/* eslint-disable no-console */

const pathsToRemove = [
  './src/actions/!(loadingIndicatorActions.js)',
  './src/utils',
  './src/components/layouts/DashboardLayout.js',
  './src/components/pages/!(NotFound.js)',
  './src/components/!(reusable)',
  './src/reducers/*',
  './src/index.js',
  './src/UserContext.js'
];

function removePath(path, callback) {
  rimraf(path, error => {
    if (error) throw new Error(error);
    callback();
  });
}

function createFile(file) {
  fs.writeFileSync(file.path, file.content, error => {
    if (error) throw new Error(error);
  });
}

function moveTemplates() {
  fs.renameSync(
    './buildTools/templates/rootReducer.js',
    './src/reducers/index.js'
  );
  fs.renameSync(
    './buildTools/templates/actionTypes.js',
    './src/actions/actionTypes.js'
  );
  fs.renameSync(
    './buildTools/templates/HomePage.js',
    './src/components/HomePage.js'
  );
  fs.renameSync('./buildTools/templates/index.scss', './src/index.scss');
  fs.renameSync('./buildTools/templates/srcIndex.js', './src/index.js');
  fs.renameSync(
    './buildTools/templates/initialState.js',
    './src/reducers/initialState.js'
  );
  fs.renameSync(
    './buildTools/templates/ReducersIndex.js',
    './src/reducers/index.js'
  );
}

function removePackageJsonScriptEntry(scriptName) {
  const packageJsonPath = './package.json';
  let fileData = fs.readFileSync(packageJsonPath);
  let content = JSON.parse(fileData);
  delete content.scripts[scriptName];
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n');
}

var numPathsRemoved = 0;
pathsToRemove.map(path => {
  removePath(path, () => {
    numPathsRemoved++;
    if (numPathsRemoved === pathsToRemove.length) {
      // All paths have been processed
      // Now we can create files since we're done deleting.
      // Move templates over to their proper place
      moveTemplates();

      // Now that we're done, let's delete the buildTools folder
      removePath('./buildTools', () => {
        //console.log('Build tools deleted');
      });
    }
  });
});

removePackageJsonScriptEntry('remove-demo');
removePackageJsonScriptEntry('deploy');

console.log(chalk.green('Demo app removed.'));

var exec = require('child_process').exec;
exec('node -v', function(err, stdout, stderr) {
  var major = parseInt(stdout.charAt(1));
  if (err) throw err;
  if (major < 5) {
    throw new Error('Fusion Starter requires Node version 5.0 or greater.');
    process.exit(1);
  }
});

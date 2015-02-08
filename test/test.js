var test = require('tape')
var exec = require('child_process').exec

test('verify hamishdickson returns stuff', function(t) {
  exec('node index.js hamishdickson', function(error, stdout, stderr) {
    t.notOk(error, "no error running command")
  })
  t.end()
})

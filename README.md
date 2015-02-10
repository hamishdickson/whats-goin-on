# whats-goin-on

[![Build Status](https://travis-ci.org/hamishdickson/whats-goin-on.svg?branch=master)](https://travis-ci.org/hamishdickson/whats-goin-on)

This is a command line tool to find out what public activity those you follow have made on github.

Please note: Right now, this is in development - I am likely to break it at any point - check back in about a week for a finalish version

### To install

_Requires [Node.js](http://www.nodejs.org)_
```bash
$ npm install -g whats-goin-on
```

### To use

```bash
# by default this will return up to 10 lines
$ whats-goin-on [githubusername]
# you can increase the number of lines with -n, for example this will return 4 lines
$ whats-goin-on [githubusername] -n 4
   ⊙  3 hours ago  davegurnell is now watching fommil/freeslick

   => 9 hours ago  brendanator pushed to repo jhc-systems/sqlest

   => 10 hours ago brendanator pushed to repo jhc-systems/sqlest
```

**Options**
- '-n number' returns the last _number_ of items

### Thanks

While this does something totally different, I came up with this idea after seeing [jlord's](https://github.com/jlord) gardening repo. Check it out.

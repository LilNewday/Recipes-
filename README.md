
sources 


https://codeshack.io/basic-login-system-nodejs-express-mysql/




https://www.npmjs.com/package/password-rules 

rules('pw', options)
Options:

minimumLength: default 8
maximumLength: default Infinity
requireCapital: default true
requireLower: default true
requireNumber: default true
requireSpecial: default false
Returns false if there are no issues. Otherwise, returns an object like

{ sentence: 'Password must be at least 8 letters long, contain a capital letter, contain a number, and contain a special character.',
  issues:
   [ { reason: 'minimumLength',
       message: 'Password must be at least 8 letters long',
       part: 'be at least 8 letters long' },
     { reason: 'requireCapital',
       message: 'Password must contain a capital letter',
       part: 'contain a capital letter' },
     { reason: 'requireNumber',
       message: 'Password must contain a number',
       part: 'contain a number' },
     { reason: 'requireSpecial',
       message: 'Password must contain a special character',
       part: 'contain a special character'} ] }



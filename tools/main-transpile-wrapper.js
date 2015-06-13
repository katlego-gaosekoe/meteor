// This file exists because it is the file in the tool that is not automatically
// transpiled by Babel.

require('babel/register')(require('./babel-config.js')); // #RemoveInProd this line is removed in isopack.js

// Installs source map support with a hook to add functions to look for source
// maps in custom places
require('./source-map-retriever-stack.js');

// Run the Meteor command line tool
require('./main.js');

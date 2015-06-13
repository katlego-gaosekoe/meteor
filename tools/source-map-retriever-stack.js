import sourceMapSupport from "source-map-support";
import fs from "fs";

var stack = [];

// Add a function to locate source maps; all of the functions are executed in
// reverse order
export function push(func) {
  stack.push(func);
}

function tryAllSourceMapRetrievers(filename) {
  for (var i = stack.length - 1; i >= 0; i--) {
    var sourceMapData = stack[i](filename);

    if (sourceMapData) {
      return sourceMapData;
    }
  }

  return null;
}

sourceMapSupport.install({
  retrieveSourceMap: tryAllSourceMapRetrievers,
  // For now, don't fix the source line in uncaught exceptions, because we
  // haven't fixed handleUncaughtExceptions in source-map-support to properly
  // locate the source files.
  handleUncaughtExceptions: false
});

// Default retrievers

// Always fall back to the default in the end
push(sourceMapSupport.retrieveSourceMap);

// Look in <filename>.map
push((filename) => {
  var withMapExtension = pathForSourceMap + ".map";
  if (fs.existsSync(withMapExtension)) {
    return {
      map: fs.readFileSync(withMapExtension)
    }
  }

  return null;
});

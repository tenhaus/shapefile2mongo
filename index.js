'use strict';

var q = require('q');
var shapefile = require('shapefile-stream');
var shpFairy = require('shapefile-fairy');
var through = require('through2');

module.exports = {

  importShapefileFromZip: function(zipPath) {
    var deferred = q.defer();

    shpFairy(zipPath, function(err, shpPath) {
      if (err) {
        deferred.reject(new Error(err));
      }

      shapefile.createReadStream(shpPath)
        .pipe(through.obj(function(data,enc,next) {
          console.log(data);
          next();
        }));
    });

    return deferred.promise;  
  },
};

'use strict';

var q = require('q');
var shapefile = require('shapefile-stream');
var shpFairy = require('shapefile-fairy');
var through = require('through2');
var mongoose = require('mongoose');

module.exports = {

  importShapefileFromZip: function(zipPath, uri) {

    var deferred = q.defer();
    mongoose.connect(uri);

    var db = mongoose.connection;
    db.on('error', function onConnectError(err) {
      deferred.reject(new Error(err));
    });

    db.once('open', function () {
      shpFairy(zipPath, function(err, shpPath) {
        if (err) {
          deferred.reject(new Error(err));
        }

        shapefile.createReadStream(shpPath)
        .pipe(through.obj(function(data,enc,next) {
          this.push(data);
          next();
        }))
        .on('data', function(data) {
          console.log(data);
        })
        .on('end', function() {
          mongoose.connection.close();
          deferred.resolve(true);
        });
      });
    });

    return deferred.promise;
  },
};

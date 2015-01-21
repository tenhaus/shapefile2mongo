'use strict';

var q = require('q');
var os = require('os');
var fs = require('fs');
var http = require('http');
var validator = require('validator');
var randomstring = require("randomstring");
var shp2json = require('shp2json');

function downloadShapeFile(url) {
  var deferred = q.defer();
  var tmp = os.tmpdir();
  var random = randomstring.generate();
  var output = tmp + random + '.zip';
  var file = fs.createWriteStream(output);

  http.get(url, function(res) {
    res.pipe(file);
    file.on('finish', function() {
      file.close();
      deferred.resolve(output);
    });
  }).on('error', function(e) {
    deferred.reject(new Error("Error downloading the shapefile: " + e.message));
  });

  return deferred.promise;
}

function createGeoJsonForShapeZip(path) {
  var deferred = q.defer();

  var tmp = os.tmpdir();
  var random = randomstring.generate();
  var jsonPath = tmp + random + '.geoJson';

  var readStream = fs.createReadStream(path);
  var writeStream = fs.createWriteStream(jsonPath);

  shp2json(readStream).pipe(writeStream);

  writeStream.on('close', function() {
    deferred.resolve(jsonPath);
  })
  .on('error', function(err) {
    deferred.reject(new Error(err));
  });

  return deferred.promise;
}

// function writeJsonToCollection(jsonPath, collection) {
// }

module.exports = {

  importShapefileFromZip: function(zipPath) {
    var deferred = q.defer();

    createGeoJsonForShapeZip(zipPath)
    .then(function(jsonPath) {
      deferred.resolve(jsonPath);
    })
    .catch(function(err){
      deferred.reject(new Error(err));
    });

    return deferred.promise;
  },

  importShapefileFromUrl: function(url) {
    var deferred = q.defer();

    // Test whether url is valid
    if(!validator.isURL(url)) {
      deferred.reject(new Error('The url passed is invalid. ' + url));
    }
    else {
      downloadShapeFile(url)
      .then(function(zipPath) {
        createGeoJsonForShapeZip(zipPath)
        .then(function(jsonPath) {
          deferred.resolve(jsonPath);
        });
      });
    }

    return deferred.promise;
  }
};

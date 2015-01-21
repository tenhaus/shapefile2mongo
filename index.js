'use strict';

var q = require('q');
var os = require('os');
var fs = require('fs');
var http = require('http');
var validator = require('validator');
var randomstring = require("randomstring");

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

module.exports = {

  importShapefileFromUrl: function(url) {
    var deferred = q.defer();

    // Test whether url is valid
    if(!validator.isURL(url)) {
      deferred.reject(new Error('The url passed is invalid. ' + url));
    }
    else {
      downloadShapeFile(url)
      .then(function(path) {
        
        deferred.resolve(path);
      });
    }


    return deferred.promise;
  }



};

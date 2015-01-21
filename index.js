'use strict';

var http = require('http');
var fs = require('fs');
var q = require('q');

module.exports = {

  test: function() {
    var file = fs.createWriteStream("file.jpg");
    var deferred = q.defer();

    http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
      response.pipe(file);
      deferred.resolve('good');
    })
    .on('error', function(e) {
      deferred.reject(new Error(e.message));
    });

    return deferred.promise;
  },

};

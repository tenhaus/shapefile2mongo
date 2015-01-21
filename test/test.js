/*global describe, it */
'use strict';
var assert = require('assert');
var shapefile2mongo = require('../');
// var mongo = require('mongo-mocha')('mongodb://localhost');
var shapeUrl = 'http://www2.census.gov/geo/tiger/TIGER2014/STATE/tl_2014_us_state.zip';

describe('shapefile2mongo node module', function () {

  it('must download shapefile', function (done) {
    this.timeout(50000);
    shapefile2mongo.importShapefileFromUrl(shapeUrl)
    .then(function(result) {
      console.log(result);
      // assert.equal('good', result);
      done();
    })
    .catch(function(err){
      done(err);
    });
  });

  it('must reject invalid url', function(done) {
    shapefile2mongo.importShapefileFromUrl('http:/this.com')
    .catch(function() {
      assert(true);
      done();
    });
  });

});

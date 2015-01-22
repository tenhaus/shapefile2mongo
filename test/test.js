/*global describe, it */
'use strict';
var assert = require('assert');
var shapefile2mongo = require('../');
// var mongo = require('mongo-mocha')('mongodb://localhost');
var localShapePath = 'test/state.zip';

describe('shapefile2mongo node module', function () {

  it('must import shapefile from file', function (done) {
    this.timeout(0);
    shapefile2mongo.importShapefileFromZip(
      localShapePath,
      'mongodb://localhost/test'
    )
    .then(function(result) {
      console.log(result);
      assert.equal(result, true);
      done();
    })
    .catch(function(err){
      done(err);
    });
  });

});

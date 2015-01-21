/*global describe, it */
'use strict';
var assert = require('assert');
var shapefile2mongo = require('../');

describe('shapefile2mongo node module', function () {

  it('must have at least one test', function (done) {
    this.timeout(5000);
    shapefile2mongo.test()
    .then(function(result) {
      assert.equal('good', result);
      done();
    })
    .catch(function(err){
      done(err);
    });

  });

});

var random = require('../lib/plugins/mongoose-simple-random'),
  mockgoose = require('mockgoose'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  should = require('chai').should();

mockgoose(mongoose);

describe('mongoose-simple-random', function() {
  var Test;

  before(function() {
    mockgoose.reset();

    var s = new Schema({
      message: String
    });
    s.plugin(random);
    Test = mongoose.model('Test', s);

    Test.create({
      message: "this"
    });
    Test.create({
      message: "is"
    });
    Test.create({
      message: "not"
    });
    Test.create({
      message: "a"
    });
    Test.create({
      message: "drill"
    });
  });

  it('gets a single doc at random', function() {
    Test.findRandom(function(err, result) {
      should.not.exist(err);
      result.should.have.property('message');
      result.should.have.property('_id');
      result.should.have.property('__v');
    });
  });

  it('gets 3 docs at random', function() {
    Test.findRandom({}, {}, {
      count: 3
    }, function(err, result) {
      should.not.exist(err);
      result.should.have.length(3);
      for (var i = 0; i < 3; ++i) {
        result[i].should.have.property('message');
        result[i].should.have.property('_id');
        result[i].should.have.property('__v');
      }
    });
  });
});
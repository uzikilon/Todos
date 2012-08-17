require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(), // cache buster
  paths: {
    jquery: 'lib/jquery-1.8.0',
    underscore: 'lib/underscore-1.3.3',
    backbone: 'lib/backbone-0.9.2',
    chai: '../test/lib/chai',
    mocha: '../test/lib/mocha',
    sinon: '../test/lib/sinon-1.4.2',
    'backbone.localStorage': 'lib/backbone.localStorage'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    mocha: {
      exports: 'mocha'
    },
    sinon: {
      exports: "sinon"
    }
  }
});

window.store = "TestStore"; // override local storage store name - for testing

// Require libraries
require(['underscore', 'mocha', 'chai', 'sinon'], function(_, mocha, chai, sinon){

  // Chai
  chai.Assertion.includeStack = false;
  expect = chai.expect;
  assert = chai.assert;

  // Mocha
  mocha.setup('bdd');

  var specs = _.extend([], {
    addSpec: function(spec) {
      this.push('../test/spec/' + spec);
    }
  });
    
  specs.addSpec('models/TodoSpec');

  specs.addSpec('views/ClearCompletedSpec');
  specs.addSpec('views/CountViewSpec');
  specs.addSpec('views/FooterViewSpec');
  specs.addSpec('views/MarkAllSpec');
  specs.addSpec('views/NewTaskSpec');
  specs.addSpec('views/TaskListSpec');
  specs.addSpec('views/TaskViewSpec');

  // Require specs before starting
  require(specs, function(){
    mocha.run().globals(['_', '$', 'jQuery', 'Backbone']);
  });

});
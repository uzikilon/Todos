require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: 'lib/jquery-1.8.0',
    underscore: 'lib/underscore-1.3.3',
    backbone: 'lib/backbone-0.9.2',
    'backbone.localStorage': 'lib/backbone.localStorage',
    mocha: '../test/lib/mocha',
    chai: '../test/lib/chai',
    sinon: '../test/lib/sinon-1.4.2',
    spec: '../test/mocha/spec/'
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
require(['underscore', 'jquery', 'mocha', 'chai', 'sinon'], function(_, $, mocha, chai, sinon){

  // Chai
  chai.Assertion.includeStack = false;
  expect = chai.expect;
  assert = chai.assert;

  // Mocha
  mocha.setup({ui: 'bdd', ignoreLeaks: true});
  // mocha.setup('bdd');

  var specs = [];

  specs.push('spec/models/TodoSpec');
  specs.push('spec/views/ClearCompletedSpec');
  specs.push('spec/views/CountViewSpec');
  specs.push('spec/views/FooterViewSpec');
  specs.push('spec/views/MarkAllSpec');
  specs.push('spec/views/NewTaskSpec');
  specs.push('spec/views/TaskListSpec');
  specs.push('spec/views/TaskViewSpec');


  $(function(){
    require(specs, function(){
      mocha.run();//.globals(['Backbone']);
    });

  });
});

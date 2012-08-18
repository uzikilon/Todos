require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(), // cache buster
  paths: {
    jquery: 'lib/jquery-1.8.0',
    underscore: 'lib/underscore-1.3.3',
    backbone: 'lib/backbone-0.9.2',
    'backbone.localStorage': 'lib/backbone.localStorage',
    jasmine: '../test/jasmine/lib/jasmine-1.2.0/jasmine',
    'jasmine-html': '../test/jasmine/lib/jasmine-1.2.0/jasmine-html',
    sinon: '../../test/mocha/lib/sinon-1.4.2'
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
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    sinon: {
      exports: "sinon"
    }
  }
});



window.store = "TestStore"; // override local storage store name - for testing

// Require libraries
require(['underscore', 'jquery', 'jasmine-html', 'sinon'], function(_, $, jasmine, sinon){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  window.ASYNC_TIMEOUT = 2000;

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = _.extend([], {
    addSpec: function(spec) {
      this.push('../../test/jasmine/spec/' + spec);
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
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});

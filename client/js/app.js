/*global $, Ember*/

// Application
var App = Ember.Application.create({
  ready: function(){
    App.stateMachine = App.StateMachine.create({
      //enableLogging: true
    });
  }
});

// Adapter
// App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:8888'
});

// Model
App.Slide = DS.Model.extend({
  iframeUrl: DS.attr('string'),
  filename: DS.attr('string'),
  segue: DS.attr('string'),
  title: DS.attr('string'),
  body: DS.attr('string'),
  milliseconds: DS.attr('number'),

  hasContent: function () {
    return this.get('title') || this.get('body')
  }.property('title', 'body'),
});

// States
App.StateMachine = Ember.StateManager.extend({
  initialState: 'idling',
  idling: Ember.State.extend({
    next: function (manager, context) {
      var milliseconds = context.get('currentModel.milliseconds');
      if (milliseconds && milliseconds !== 0) {
        manager.transitionTo('playing', context);
      } else {
        var id = '' + (+context.get('currentModel.id') + 1);
        window.document.location = '#/slides/' + id;
      }
    }
  }),
  playing: Ember.State.extend({
    setup: function (manager, context) {
      this.next(manager, context);
    },
    next: function (manager, context) {
      var id = '' + (+context.get('currentModel.id') + 1);
      window.document.location = '#/slides/' + id;
      this.play(manager, context);
    },
    play: function (manager, context) {
      var milliseconds = context.get('currentModel.milliseconds');
      if (milliseconds && milliseconds !== 0) {
        this.startInterval(context, milliseconds);
      } else {
        this.stopInterval();
        manager.transitionTo('idling', context);
      }
    },
    startInterval: function (context, milliseconds) {
      var id = '' + (+context.get('currentModel.id') + 1);
      this.timeoutId = Ember.run.later(function(){
        window.document.location = '#/slides/' + id;
        App.stateMachine.send('play', context);
      }, milliseconds);
    },
    stopInterval: function () {
      if (this._timeoutId) {
        Ember.run.cancel(this._timeoutId);
        delete this._timeoutId;
      }
    }
  })
});

App.Router.map(function() {
  this.resource('/');
  this.resource('slides');
  this.resource('slide', { path: '/slides/:slide_id' });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('slides');
  }
});

App.SlidesRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('slide');
  },
});

App.SlideRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('slide', params.slide_id);
  },
  actions: {
    previous: function () {
      var id = '' + (+this.get('currentModel.id') - 1);
      window.document.location = '#/slides/' + id;
    },
    next: function () {
      App.stateMachine.send('next', this);
    },
    first: function () {
      window.document.location = '#/slides/' + 0;
    }
  }
});

// Controllers
App.SlidesController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  actions: {
    begin: function () {
      window.document.location = '#/slides/0';
    }
  }
});

App.SlideController = Ember.Controller.extend({
  actions: {
    // left = 37, up = 38, right = 39, down = 40
    updateKey: function (code) {
      if (code === 37) {
        this.get('target').send('previous');
      } else if (code === 39) {
        this.get('target').send('next');
      } else if (code === 38) {
        this.get('target').send('first');
      } else if (code === 40) {
        this.get('target').send('last');
      }
    }
  }
});

// Views
App.ApplicationView = Ember.View.extend({
  tagName: 'span'
});

App.SlidesView = Ember.View.extend({
  tagName: 'span',
  classNames: ['slides']
});

App.SlideView = Ember.View.extend({
  tagName: 'span',
  classNames: ['slide'],
  didInsertElement: function() {
    var controller = this.get('controller');
    $(document).on('keydown', function (e) {
      e.preventDefault();
      if (e.keyCode) {
        controller.send('updateKey', e.keyCode);
      }
      return false;
    });

    return $('input').focus();
  }
});

App.SlideSegueView = Ember.View.extend({
  tagName: 'span',
  classNames: ['slide-segue'],
  templateName: 'slide-segue'
});

App.SlideContentView = Ember.View.extend({
  tagName: 'span',
  classNames: ['slide-content'],
  templateName: 'slide-content'
});

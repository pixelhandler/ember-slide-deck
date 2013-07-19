// Application
App = Ember.Application.create({
  ready: function(){
    App.stateMachine = App.StateMachine.create({
      //enableLogging: true
    });
  }
});

// Model
App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Slide = DS.Model.extend({
  filename: DS.attr('string'),
  milliseconds: DS.attr('number')
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
  model: function() {
    return App.Slide.find();
  }
});

App.SlideRoute = Ember.Route.extend({
  model: function(params) {
    return App.Slide.find(params.slide_id);
  },
  events: {
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
  sortProperties: ['id']
});

App.SlideController = Ember.Controller.extend({
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
});

// Views
App.SlidesView = Ember.View.extend({
  classNames: ['slides']
});

App.SlideView = Ember.View.extend({
  classNames: ['slide'],
  keyDown: function(e) {
    this.get('controller').send('updateKey', e.keyCode);
  },
  didInsertElement: function() {
    $('head title').text([
        'Ember Slide Deck',
        this.get('context.model.filename')
    ].join(' | '))
    return this.$('input').focus();
  },
});

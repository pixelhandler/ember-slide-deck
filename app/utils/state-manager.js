import Ember from 'ember';

export default Ember.StateManager.extend({
  initialState: 'idling',

  idling: Ember.State.extend({

    next: function (manager, context) {
      var milliseconds = context.get('currentModel.milliseconds');
      if (milliseconds && milliseconds !== 0) {
        manager.transitionTo('playing', context);
      } else {
        var slug = '' + (+context.get('currentModel.slug') + 1);
        context.transitionTo('slide', slug);
      }
    }
  }),

  playing: Ember.State.extend({

    setup: function (manager, context) {
      this.next(manager, context);
    },

    next: function (manager, context) {
      var slug = '' + (+context.get('currentModel.slug') + 1);
      context.transitionTo('slide', slug);
      this.play(manager, context);
    },

    play: function (manager, context) {
      var milliseconds = context.get('currentModel.milliseconds');
      if (milliseconds && milliseconds !== 0) {
        this.startInterval(manager, context, milliseconds);
      } else {
        this.stopInterval();
        manager.transitionTo('idling', context);
      }
    },

    startInterval: function (manager, context, milliseconds) {
      var slug = '' + (+context.get('currentModel.slug') + 1);
      this.timeoutId = Ember.run.later(function(){
        context.transitionTo('slide', slug);
        manager.send('play', context);
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

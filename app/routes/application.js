import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

    previous: function () {
      var index;
      var slideRoute = this.container.lookup('route:slide');
      var currentModel = slideRoute.get('currentModel');
      var slides = this.modelFor('slides');
      if (slides) {
        index = slides.indexOf(currentModel);
        this.transitionTo('slide', slides.objectAt(index - 1).get('slug'));
      } else {
        var slidesRoute = this.container.lookup('route:slides');
        slidesRoute.model().then(function(deck) {
          index = deck.indexOf(currentModel);
          this.transitionTo('slide', deck.objectAt(index - 1).get('slug'));
        }.bind(this));
      }
    },

    next: function () {
      var slideRoute = this.container.lookup('route:slide');
      this.get('stateManager').send('next', slideRoute);
    },

    first: function () {
      var slides = this.modelFor('slides');
      if (slides) {
        this.transitionTo('slide', slides.get('firstObject.slug'));
      } else {
        var slidesRoute = this.container.lookup('route:slides');
        slidesRoute.model().then(function(deck) {
          this.transitionTo('slide', deck.get('firstObject.slug'));
        }.bind(this));
      }
    },

    last: function () {
      var slides = this.modelFor('slides');
      if (slides) {
        this.transitionTo('slide', slides.get('lastObject.slug'));
      } else {
        var slidesRoute = this.container.lookup('route:slides');
        slidesRoute.model().then(function(deck) {
          this.transitionTo('slide', deck.get('lastObject.slug'));
        }.bind(this));
      }
    }
  }
});

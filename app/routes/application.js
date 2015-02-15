import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

    previous: function () {
      var slideRoute = this.container.lookup('route:slide');
      var slug = '' + (+slideRoute.get('currentModel.slug') - 1);
      window.document.location = '#/slides/' + slug;
    },

    next: function () {
      var slideRoute = this.container.lookup('route:slide');
      this.get('stateManager').send('next', slideRoute);
    },

    first: function () {
      window.document.location = '#/slides/' + 0;
    },

    last: function () {
      var slides = this.modelFor('slides');
      if (slides) {
        window.document.location = '#/slides/' + 0;
      } else {
        var slidesRoute = this.container.lookup('route:slides');
        slidesRoute.model().then(function(deck) {
          window.document.location = '#/slides/' + deck.get('lastObject.slug');
        });
      }
    }
  }
});

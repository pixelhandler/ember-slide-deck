import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var slide = this.store.filter('slide', function (model) {
      return model.get('slug') === params.slide_slug;
    });
    return slide.get('firstObject') || this.store.find('slide', params.slide_slug);
  },

  serialize: function (model) {
    return { slide_slug: model.get('slug') };
  },

  actions: {

    previous: function () {
      var slug = '' + (+this.get('currentModel.slug') - 1);
      window.document.location = '#/slides/' + slug;
    },

    next: function () {
      this.get('stateManager').send('next', this);
    },

    first: function () {
      window.document.location = '#/slides/' + 0;
    }
  }
});

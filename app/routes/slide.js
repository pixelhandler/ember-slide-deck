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
  }

});

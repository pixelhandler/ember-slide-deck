import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['slide'],
  classNameBindings: ['slideFormat'],

  slideFormat: function() {
    return this.get('context.model.format');
  }.property('context.model.format'),

  didInsertElement: function() {
    Ember.$('head title').text([
      'Ember Slide Deck',
      this.get('context.model.filename')
    ].join(' | '));
    return this.$('input').focus();
  }
});

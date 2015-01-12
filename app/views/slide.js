import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['slide'],

  keyDown: function(e) {
    this.get('controller').send('updateKey', e.keyCode);
  },

  didInsertElement: function() {
    Ember.$('head title').text([
      'Ember Slide Deck',
      this.get('context.model.filename')
    ].join(' | '));
    return this.$('input').focus();
  }
});

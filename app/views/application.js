import Ember from 'ember';

export default Ember.View.extend({
  keyDown: function(e) {
    this.get('controller').send('updateKey', e.keyCode);
  }
});

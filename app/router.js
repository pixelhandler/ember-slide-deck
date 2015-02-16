import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('slides', { path: '/' });
  this.resource('slide', { path: '/:slide_slug' });
});

export default Router;

import DS from 'ember-data';

export default DS.Model.extend({
  iframeUrl: DS.attr('string'),
  filename: DS.attr('string'),
  markdown: DS.attr('string'),
  format: DS.attr('string'),
  milliseconds: DS.attr('number')
});

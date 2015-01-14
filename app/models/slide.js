import DS from 'ember-data';

export default DS.Model.extend({
  slug: DS.attr('string'),
  ordinal: DS.attr('number'),
  iframeUrl: DS.attr('string'),
  filename: DS.attr('string'),
  markdown: DS.attr('string'),
  format: DS.attr('string'),
  code: DS.attr('string'),
  lang: DS.attr('string'),
  milliseconds: DS.attr('number')
});

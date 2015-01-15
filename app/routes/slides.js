import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('slide', { sortBy: 'ordinal', order: 'asc', limit: 100 });
  },

  afterModel: function(slides) {
    var outline = [];
    slides.forEach(function(slide) {
      var markdown = slide.get('markdown');
      var iframeUrl = slide.get('iframeUrl');
      var filename = slide.get('filename');
      var code = slide.get('code');
      if (markdown) {
        markdown = markdown.replace('### ', '#### ').replace('## ', '### ').replace('# ', '## ');
      } else if (iframeUrl) {
        markdown = "[%@](%@)".fmt(iframeUrl, iframeUrl);
      } else if (filename) {
        markdown = "![image](%@) \n".fmt(filename);
      } else if (code) {
        markdown = "```%@\n%@\n```".fmt(slide.get('lang'), code);
      }
      outline.push(markdown);
    });
    slides.set('outline', outline.join('\n\n'));
  }
});

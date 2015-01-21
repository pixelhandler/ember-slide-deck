# Ember Slide Deck

This browser app is a presentation tool. Slide formats include: 
images (filename), iframe (url), markdown (text), and code. It uses 
RethinkDB for storing slides in JSON documents, see the [data](data) 
directory for the demo database contents.

## Prerequisites

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [RethinkDB](http://www.rethinkdb.com)

### RethinkDB

Here is a [Ten-minute guide] on [RethinkDB]

For developers on a mac, install with [Homebrew]

    brew update && brew install rethinkdb

[Ten-minute guide]: http://www.rethinkdb.com/docs/guide/javascript/
[RethinkDB]: http://www.rethinkdb.com
[Homebrew]: http://brew.sh

## Installation

* Clone the repo `git clone git@github.com:pixelhandler/ember-slide-deck.git`
* Change into the new directory `cd ember-slide-deck`
* Install dependencies `ember install`
* Import demo slides into the db `npm run restore`

## Presenting

1. Start the database `rethinkdb`
2. Launch the app `ember server`
3. View your slides at [http://localhost:4200](http://localhost:4200).
4. The inital page list the slides and links to them and includes an
   outline and the markdown used to generate the outline, useful for
   sharing presentation notes in a gist
5. Use left and right arrow keys to navigate (it's a bit hacky, using a
   hidden input to listen for keypress events, so if you loose focus just
   reload)

To edit slides use the database administration tools at
http://localhost:8080

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


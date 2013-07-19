# Ember Slide Deck

## Application code

See `app.js`

### Running the app

`cd` to the repo root directory and use `python -m SimpleHTTPServer 8000` to launch a server.

Load <http://localhost:8000/> in your browser, which should redirect to <http://localhost:8000/#/slides> the index page shows all the images so they can be loaded into your browser cache. Click an image to begin presentation from that slide.

### Presenting

Use right and left arrow keys, or the up arrow key to go back to slide `0`.

## Add images as slides

See `fixtures.js`

Slides that should advance automatically need to have a `milliseconds` value. Using `id` values as strings since a data storage server may have ids that are not numeric.

## About

This browser app was created for a tech talk at the <http://www.meetup.com/Ember-SC/> meetup group. We discussed Ember.StateManager in July 2013 - http://www.meetup.com/Ember-SC/events/125461412/

The ember slide deck app can run in two modes, `idling` and `playing`. Slides that have a time value (`milliseconds` property) automatically enter the `playing state`. When the `next` action is triggered by the `keyPress` event for a slide with no `milliseconds` the app transitions back to `idling`. Every slide has a URL so app state is managed with Ember.Router but states for playing and idling depend on user's behavior and the states exist along side the state represented in the URLs.

In the sample `fixtures.js` file the slides in the two sections automatically play then stop before the next section.
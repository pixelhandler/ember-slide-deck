import StateManager from '../utils/state-manager';

export function initialize(container, application) {
  application.register('utils:state-manager', StateManager);
  application.inject('route', 'stateManager', 'utils:state-manager');
}

export default {
  name: 'state-manager',
  initialize: initialize
};

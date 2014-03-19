
var Network = require('asNEAT/network')['default'];

export default Ember.Route.extend({
  model: function() {
    return {
      networks: [
        new Network(),
        new Network()
      ]
    };
  }
});

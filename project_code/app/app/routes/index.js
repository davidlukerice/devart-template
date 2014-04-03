
var Network = require('asNEAT/network')['default'];

export default Ember.Route.extend({
  model: function() {
    
    var networks = [], numNetworks=2, numMutations=4;
    for (var i=0; i<numNetworks; ++i) {
      var network = new Network();
      for (var x=0; x<numMutations; ++x)
        network.mutate();
      networks.push(network);
    }

    return {
      networks: [networks]
    };
  },

  setupController: function(controller, model) {
    controller.set('content', model);
  },
});

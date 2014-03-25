var Utils = require('asNEAT/utils')['default'];

export default Ember.Controller.extend({

  // set by route
  // {networks: [asNEAT.Network, ...]}
  content: null,

  childNetworks: function() {
    var numChildren = 9,
        networks = this.get('content.networks'),
        weightPerNetwork = 1/networks.length,
        children = [], i, child, selected;

    var selections = _.map(networks, function(network) {
      return {
        weight: weightPerNetwork,
        element: network
      };
    });

    for (i=0; i<numChildren; ++i) {
      selected = Utils.weightedSelection(selections);
      children.push(selected.clone().mutate());
    }

    return children;
  }.property('content.networks.@each'),

  actions: {
    refresh: function() {
      this.notifyPropertyChange('childNetworks');
    }
  }

});

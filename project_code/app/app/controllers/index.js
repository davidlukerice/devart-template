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

  selectedChildNetworks: function() {
    var selectedNetworks = [];
      _.forEach(this.get('childNetworks').toArray(), function(child) {
        if (child.selected)
          selectedNetworks.push(child);
      });

      return selectedNetworks;
  }.property('childNetworks.@each.selected'),

  noChildrenSelected: function() {
    return this.get('selectedChildNetworks').length <= 0;
  }.property('selectedChildNetworks.@each'),

  actions: {
    refreshGeneration: function() {
      this.notifyPropertyChange('childNetworks');
    },

    nextGeneration: function() {
      this.set('content.networks', this.get('selectedChildNetworks'));

      // always keep scrolled on the bottom
      Ember.run.scheduleOnce('afterRender', this, function() {
        $(document).scrollTop($(document).height());
      });
    }
  }

});

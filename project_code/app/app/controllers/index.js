var Utils = require('asNEAT/utils')['default'];

export default Ember.Controller.extend({

  // set by route
  // networks is a history of networks (list of list of networks)
  // and the top one is currently the parent set
  // {networks: [[asNEAT.Network, ...],[...],...]}
  content: null,

  usingOnscreenPiano: true,

  noPreviousParents: function() {
    return this.get('content.networks').length <= 1;
  }.property('content.networks.@each'),

  parentNetworks: function() {
    var networks = this.get('content.networks');
    return networks[networks.length-1];
  }.property('content.networks.@each'),

  childNetworks: function() {
    var numChildren = 9,
        networks = this.get('parentNetworks'),
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
  }.property('parentNetworks.@each'),

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

  activeInstrument: function() {
    return this.get('parentNetworks')[0];
  }.property('parentNetworks.@each'),

  actions: {
    refreshGeneration: function() {
      this.notifyPropertyChange('childNetworks');
    },

    backGeneration: function() {
      // TODO: Confirm box
      this.get('content.networks').popObject();
      scrollToBottom();
    },

    nextGeneration: function() {
      // push the currently selected networks on top
      this.get('content.networks').pushObject(
        this.get('selectedChildNetworks'));
      scrollToBottom();
    },

    toggleOnscreenPiano: function() {
      this.set('usingOnscreenPiano', !this.get('usingOnscreenPiano'));
      var scrollAmount;

      // Scroll down/up when showing/hiding the piano
      if (this.get('usingOnscreenPiano'))
        scrollAmount = $(document).scrollTop()+100;
      else
        scrollAmount = $(document).scrollTop()-100;

      Ember.run.scheduleOnce('afterRender', function() {
        $(document).scrollTop(scrollAmount);
      });
    }
  }
});

function scrollToBottom() {
  Ember.run.scheduleOnce('afterRender', function() {
    $(document).scrollTop($(document).height());
  });
}
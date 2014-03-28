
import GraphVisualizer from 'appkit/components/graph-visualizer';

export default GraphVisualizer.extend({
  // passed in
  network: null,

  // shadow element of network
  selected: function() {
    return this.get('network.selected');
  }.property('network.selected'),

  padding: 60,
  width: "100%",
  height: "100%",

  actions: {
    toggleSelected: function() {
      this.set('network.selected', !this.get('selected'));
    }
  }
});


import GraphVisualizer from 'appkit/components/graph-visualizer';

export default GraphVisualizer.extend({
  // passed in
  // {network, selected, isLive}
  instrumentModel: null,
  makeLiveHandler: null,

  network: function() {
    return this.get('instrumentModel.network');
  }.property('instrumentModel.network'),

  // shadow element of network
  selected: function() {
    return this.get('instrumentModel.selected');
  }.property('instrumentModel.selected'),

  padding: 60,
  width: "100%",
  height: "100%",

  actions: {
    toggleSelected: function() {
      this.set('instrumentModel.selected',
        !this.get('instrumentModel.selected'));
    },

    makeLive: function() {
      var makeLiveHandler = this.get('makeLiveHandler'),
          instrumentModel = this.get('instrumentModel');
      this.get('targetObject').send(makeLiveHandler, instrumentModel);
    }
  }
});

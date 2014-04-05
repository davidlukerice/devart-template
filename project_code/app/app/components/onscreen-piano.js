
export default Ember.Component.extend({
  // Passed in
  instrument: null,

  hotkeyLayouts: [
    {type: "querty", accessor: "hotkey"},
    {type: "colemak", accessor: "colemakHotkey"}],
  selectedHotkeyLayout: "colemakHotkey",
});

In the last post, I described how audio can be visualized in a way that helps engage users during the evolutionary process. The first three are fairly straight forward to create and already have several working web audio [examples](http://chromium.googlecode.com/svn/trunk/samples/audio/javascript-processing.html "examples"). The forth, though, is a bit of a challenge. The instrument network visualization needs to automatically organize itself and represent each of the various nodes.

# First Naïve Solution

My first attempt for visualization utilized the d3.js library. The issue that came up was how to know the actual (x,y) coordinates for each of the nodes. The input and output nodes are easy enough to figure out, but intermediate nodes become tricky.

![graphVis](../project_images/2014-03-26_GraphVis.jpg?raw=true " graphVis ")

The algorithm for finding the (x,y) pairs for each node that I came up with turned into a variation of a “longest path in a directed acyclic graph” algorithm. Starting from the output node, the algorithm traverses backwards through the current node’s connections and determines the minimum number of longest paths from input to output nodes that encompass every node in the network. The length of the longest path a particular node resides on and its position on that path determines that node’s x position.
The nodes are then put into buckets depending on their x position and given a y based on the number of nodes in each bucket. This works well to separate the nodes out, but creates a rather confusing scene of connections when nodes that fall into different x buckets all get put on the same y line.

![graphVis](../project_images/2014-03-26_collision.jpg?raw=true " graphVis ")

It’s difficult to tell which nodes in the above image are connected to the top or middle node, or both. To solve this, the Y’s could be determined based on average of the y's of the nodes its connecting to or utilize a physics collision system to determine the shortest paths required to stop nodes/connections from colliding with one another but even that would become messy (not to mention dealing with cases where loops can be created around intermediate nodes. A slap delay, for example, would be created by a delay node looping into a gain node and back into the delay node). It readily became apparent a less naïve solution would be required.

# Force-Directed Graph

And D3 already has one, the force layout. I was immediately impressed by just how interactive and fun to play with some of the examples [1](http://bl.ocks.org/mbostock/1153292 "1") [2](http://graus.nu/d3/ "2") were. The user can move around and zoom into the network. Or fling various nodes around to get a better sense of what they're connected to. Having a visualization for the underlying instrument structure that the user can directly explore definitely gives that sense of excitement that’s engages a user. I'll just need to develop an intuitive way to display what the node does.


// GROUPS:  0 Web | 1: Adobe | 2: hybrid
var data = [
    {"id": 0, "name": "LG", "r": 36 },
    {"id": 0, "name": "Maytag", "r": 12},
    {"id": 0, "name": "Miele", "r": 3 },
    {"id": 0, "name": "Samsung", "r": 32 },
    {"id": 0, "name": "Amana", "r": 1 },
    {"id": 0, "name": "Asko", "r": 4 },
    {"id": 0, "name": "Blomberg", "r": 5 },
    {"id": 0, "name": "Bosch", "r": 4 },
    {"id": 0, "name": "Crosley", "r": 2 },
    {"id": 0, "name": "Electrolux", "r": 8 },
    {"id": 0, "name": "Fisher & Paykel", "r": 2 },
  
    {"id": 1, "name": "GE", "r": 35 },
    {"id": 1, "name": "Insignia", "r": 1 },
    {"id": 1, "name": "Kenmore", "r": 21 },
    {"id": 1, "name": "Whirlpool", "r": 20 },
  ];
  
  var width = window.innerWidth,
      height = 450;
  
  var fill = d3.scale.category10();
  
  var nodes = [], labels = [],
      foci = [{x: 0, y: 150}, {x: 350, y: 150}, {x: 200, y: 150}];
  
  var svg = d3.select("body").append("svg")
      .attr("width", "100%")
      .attr("height", height)
      //.attr("domflag", '');
  
  var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .charge(-400)
      //.chargeDistance(200)
      .gravity(0.1)
      .friction(0.8)
      .size([width, height])
      .on("tick", tick);
  
  //var node = svg.selectAll("circle");
  var node = svg.selectAll("g");
  
  var counter = 0;
  
  function tick(e) {
    var k = .1 * e.alpha;
  
    // Push nodes toward their designated focus.
    nodes.forEach(function(o, i) {
      o.y += (foci[o.id].y - o.y) * k;
      o.x += (foci[o.id].x - o.x) * k;
    });
  
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  
  }
  
  
  var timer = setInterval(function(){
  
    if (nodes.length > data.length-1) { clearInterval(timer); return;}
  
    var item = data[counter];
    nodes.push({id: item.id, r: item.r, name: item.name});
    force.start();
  
    node = node.data(nodes);
  
    var n = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .style('cursor', 'pointer')
        .on('mousedown', function() {
           var sel = d3.select(this);
           sel.moveToFront();
        })
        .call(force.drag);
  
    n.append("circle")
        .attr("r",  function(d) { return d.r; })
        .style("fill", function(d) { return fill(d.id); })
  
    n.append("text")
        .text(function(d){
            return d.name;
        })
        .style("font-size", function(d) {
            return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 16) + "px"; 
         })
        .attr("dy", ".35em")
  
    counter++;
  }, 100);
  
  
  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };
  
  function resize() {
    width = window.innerWidth;
    force.size([width, height]);
    force.start();
  }
  
  d3.select(window).on('resize', resize);
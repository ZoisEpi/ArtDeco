# Repository description

Art Deco effect in D3.js including 
Gradient, glow and moving lighting effect

## `src/typescript` directory


<script src="https://d3js.org/d3.v4.min.js">

</script>
			
<script>

width = 1000	
height = 50
n = 20
n2 = 20
m = 200
k = 10

bronze = "#b83c33";
bronze = "#b87333";

bronze = "#adff2f";

	var svg = d3.select("body").append("svg")
		.attr("width", width )
		.attr("height", height)

	var defs = svg.append("defs");
		
		
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation",3)
    .attr("result","coloredBlur")

var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
	
	
var filter = defs.append("filter")
    .attr("id","pureglow");
filter.append("feGaussianBlur")
    .attr("stdDeviation",2)
    .attr("result","coloredBlur");		

	var defs = svg.append("defs");
	var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");
	
	//Horizontal gradient
	linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "reflect");

//Four different colors
var colours = [d3.color(bronze).brighter(3), "black", "black", "black", "black", d3.color(bronze).brighter(3), "black", "black", "black", "black"];
//var colours = [interpolateBlueUnicity(0), "#000000", "#666666", "#000000"];

//Append the colors evenly along the gradient
linearGradient.selectAll(".stop")
    .data(colours)
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colours.length-1); })
    .attr("stop-color", function(d) { return d; });

linearGradient.append("animate")
    .attr("attributeName","x1")
    .attr("values","0%;200%") //let x1 run to 200% instead of 100%
    .attr("dur","10s")
    .attr("repeatCount","indefinite");

linearGradient.append("animate")
    .attr("attributeName","x2")
    .attr("values","100%;300%") //let x2 run to 300% instead of 200%
    .attr("dur","10s")
    .attr("repeatCount","indefinite");	
	
	
	
  const x = d3.scaleLinear()
      .domain([0, m - 1])
      .range([0, width]);

  const y = d3.scaleLinear()
      .range([height, 0]);

  const z = d3.interpolateCool;

  const area = d3.area()
      .x((d, i) => x(i))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

	const stack = d3.stack()
    .keys(d3.range(n))
    .offset(d3["stackOffsetSilhouette"])
    .order(d3["stackOrderNone"])
	  
  function randomize() {
    const layers = stack(d3.transpose(Array.from({length: n}, () => bumps(m, k))));
    y.domain([
      d3.min(layers, l => d3.min(l, d => d[0])),
      d3.max(layers, l => d3.max(l, d => d[1]))
    ]);
    return layers;
  }
  
    function randomize2() {
    const layers = stack(d3.transpose(Array.from({length: n2}, () => bumps(m, k))));
    y.domain([
      d3.min(layers, l => d3.min(l, d => d[0])),
      d3.max(layers, l => d3.max(l, d => d[1]))
    ]);
    return layers;
  }
  
  
    svg.append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", width)
                            .attr("height", height)

							
  svg.append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", width)
                            .attr("height", height)
							.attr("opacity", 0.25)
							.attr("fill", "url(#linear-gradient)")


  const path = svg.append("g").selectAll("path")
    .data(randomize)
    .enter().append("path")
      .attr("d", area)
	  .attr("fill", "none")
	  
      .attr("stroke", bronze)
	  .style("stroke-opacity", 0.3)
	  .style("filter", "url(#pureglow)");

	    const path2 = svg.append("g").selectAll("path")
    .data(randomize2)
    .enter().append("path")
      .attr("d", area)
	  .attr("fill", "none")
      .attr("stroke", d3.color(bronze).darker(5).brighter(Math.random()*10))
	  .attr("stroke-width", 0.5)
	  .style("stroke-opacity", 0.2)
	
	  
  svg.append("rect")
                            .attr("x", 4)
                            .attr("y", 4)
                            .attr("width", width-8)
                            .attr("height", height-8)
							.attr("stroke", bronze)
							.attr("fill", "none");
	  
  const interval = d3.interval(() => {
    path
      .data(randomize)
      .transition()
	          .duration(900)
	  .ease(d3.easeSinInOut)

        .attr("d", area);
		
    path2
      .data(randomize2)
      .transition()
	          .duration(900)
	  .ease(d3.easeSinInOut)

        .attr("d", area);		
  }, 900);

 
  
  function bumps(n, m) {
    const a = [];
    for (let i = 0; i < n; ++i) a[i] = 0;
    for (let i = 0; i < m; ++i) {
		const x = 1 / (0.1 + Math.random());
		const y = 2 * Math.random() - 0.5;
		const z = 10 / (0.1 + Math.random());
		for (let i = 0; i < n; ++i) {
		const w = (i / n - y) * z;
			a[i] += x * Math.exp(-w * w);
		}
	}

    return a;
  };




</script>


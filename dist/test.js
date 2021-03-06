
width = 1000	
height = 75

ns = 30;
nsGlow = 30;

m = 200
ampl = 3

bronze = "#b83c33";
bronze = "#b87333";

bronze = "#7DF9FF";

	var svg = d3.select("body").append("svg")
		.attr("width", width )
		.attr("height", height)

	var defs = svg.append("defs");

	    svg.append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", width)
                            .attr("height", height)
		
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
    .attr("stdDeviation",3)
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
		.domain([-2,2])
      .range([height, 0]);



	  // How much cycles : number (cycles)
	  // How much point : nbPoints
	  // Max Amplitude : max	  
	  function sinusHarm( cycles, nbPoints, max, offsetPi, shiftY) {
	  
		const line = d3.line();
		const step = ((2*Math.PI)*cycles)/(nbPoints*1.0);

		const ampl = max;


		return line(d3.range(nbPoints).map(function(p) {return[x(p), y(shiftY + Math.sin(step*p - offsetPi)*ampl) ]}))
	  }

	dataGlow = []
	dataSinus = []	
  
	d3.range(nsGlow).forEach(d => dataGlow.push({
			cycles : Math.random()*2,
			ampl : Math.random()*1.5,
			shiftY : -2 + Math.random()*4.0,
			shiftPi : Math.random()*2*Math.PI
	
	}))
	
	
		d3.range(ns).forEach(d => dataSinus.push({
			cycles : Math.random()*2,
			ampl : Math.random()*1.5,
			shiftY : -2 + Math.random()*4.0,
			shiftPi : Math.random()*2*Math.PI
	
	}))
	
	console.log(dataSinus);
	
	var svgSinus = svg.append("g").attr("opacity", "0.8");
	
	sinus = svgSinus.append("g")
        .attr("class", "sinus")
		.selectAll("path")
        .data(dataGlow)
		.enter().append("path")
        .attr("d", function(d) {return sinusHarm(d.cycles, m, d.ampl, d.shiftPi, d.shiftY)})
		.attr("fill", "none")
		.attr("stroke",  bronze)
			  .style("stroke-opacity", 0.7)
	  .style("filter", "url(#pureglow)");
	  
	  
	  
	sinus2 = svgSinus.append("g")
        .attr("class", "sinus2")
		.selectAll("path")
        .data(dataSinus)
		.enter().append("path")
        .attr("d", function(d) {return sinusHarm(d.cycles, m, d.ampl, d.shiftPi, d.shiftY)})
		.attr("fill", "none")
		.attr("stroke",  bronze)
		.style("stroke-opacity", 0.3)

	
	  
  svg.append("rect")
                            .attr("x", 4)
                            .attr("y", 4)
                            .attr("width", width-8)
                            .attr("height", height-8)
							.attr("stroke", bronze)
							.attr("fill", "none");
	  
 const interval = d3.interval(() => {

 delta = [];
 opacity= [];
 
	dataGlow.forEach( d => {
		delta.push(-0.5 + Math.random());
		opacity.push(Math.random())
		}
	)


    sinus
		.transition().
		duration(3000).ease(d3.easeLinear)		
	.attrTween("d", function(d,i) {	
		return function(t) {
			return sinusHarm( d.cycles, m, d.ampl + (Math.sin(t*2*Math.PI))*(delta[i]), d.shiftPi + t*2*Math.PI, d.shiftY);
		};
	})
	.styleTween("stroke-opacity", function(d,i) {	
		return function(t) {
			return 0.7 + (opacity[i] - 0.7)*(Math.sin(t*2*Math.PI));
		};
	});
	

	    sinus2
		.transition().
		duration(3000).ease(d3.easeLinear)		
	.attrTween("d", function(d,i) {	
		return function(t) {
			return sinusHarm( d.cycles, m, d.ampl + (Math.sin(t*2*Math.PI))*(delta[i]), d.shiftPi + t*2*Math.PI, d.shiftY);
		};
	})

  
  }, 3000); 

 
  


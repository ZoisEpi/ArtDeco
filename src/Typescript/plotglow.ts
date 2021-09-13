


//@ts-ignore
let data = [];

function randn_bm() : number {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
}

d3.range(500).forEach(_d => data.push({
    xVal: Math.random() * 1000,
    yVal : Math.random() * 1000

}))


const div = d3.select("body").append("div")
    .style("height", "100vh")
    .style("width", "100%")
    .style("background", "black");

//@ts-ignore
const bbox = div.node().getBoundingClientRect();

var width = 400;
var height = 400;


var margin = {top: bbox.height/2.0 - height/2.0, right: 30, bottom: 30, left: bbox.width/2.0 - width/2.0};


var svg = div
    .append("svg")
    .attr("width", width + margin.right)
    .attr("height", height + margin.bottom)
    .append("g")
    .style("background", "black")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")



            
var xScale = d3.scaleLinear()
    .domain([0, 0])
    .range([ 0, width  ]);

var yScale = d3.scaleLinear()
    .domain([0, 0])
    .range([ height, 0]);

svg.append("g")
    .attr("class","axisWhite")
    .attr("id", "xAxis")  
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .attr("opacity", "0")

svg.append("g")
    .attr("class","axisWhite")
    .attr("id", "yAxis") 
    .call(d3.axisLeft(yScale))
    .attr("opacity", "0")

svg.append("g")
    .attr("class","axisGrid")
    .attr("id", "xAxisGrid")  
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .attr("opacity", "0")

svg.append("g")
    .attr("class","axisGrid")
    .attr("id", "yAxisGrid") 
    .call(d3.axisLeft(yScale))
    .attr("opacity", "0")





// Add dots
svg.append('g')
    .selectAll("dot")
    //@ts-ignore
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) { return xScale(d.xVal); } )
    .attr("cy", function (d) { return yScale(d.yVal); } )
    .attr("r", 1.5)
    .attr("opacity", "0.6")
 //   
    .style("fill", "#69b3a2")

// new X axis
xScale.domain([0, 1000])
yScale.domain([0, 1000])


svg.select("#yAxis")
        .transition()
        .duration(6000)
        .attr("opacity", "1")
      //@ts-ignore
        .call(d3.axisLeft(yScale));

svg.select("#xAxis")
        .transition()
        .duration(6000)
        .attr("opacity", "1")
      //@ts-ignore
        .call(d3.axisBottom(xScale));

        
 svg.select("#yAxisGrid")
        .transition()
        .duration(6000)
        .attr("opacity", "1")
      //@ts-ignore
        .call(d3.axisLeft(yScale).ticks(20).tickSize(-1.0*width).tickFormat(""));

svg.select("#xAxisGrid")
        .transition()
        .duration(6000)
        .attr("opacity", "1")
      //@ts-ignore
        .call(d3.axisBottom(xScale).ticks(20).tickSize(-1.0*height).tickFormat(""));


svg.selectAll(".dot")
.on('mouseover', function (d, i) {
    d3.select(this)
    .attr("r", 4)
    .attr("opacity", "1")   
})
.on('mouseout', function (d, i) {
    d3.select(this)
   .attr("r", 1.5)
   .attr("opacity", "0.6") 

})
.transition()
.ease(d3.easeBounce)
.delay(function(d,i){return(i*6)})
.duration(6000)
  //@ts-ignore
.attr("cx", function (d) { return xScale(d.xVal); } )
  //@ts-ignore
.attr("cy", function (d) { return yScale(d.yVal); } )




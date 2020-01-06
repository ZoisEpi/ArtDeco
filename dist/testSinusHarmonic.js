const widthHarm = 1000;
const heightHarm = 100;
const bronze = "#796221";
const divSinusHarm = d3.select("body").append("div")
    .style("height", "100vh")
    .style("width", "100%");
const svgSinusHarm = divSinusHarm.append("svg")
    .attr("width", divSinusHarm.style("width"))
    .attr("height", divSinusHarm.style("height"))
    .style("background", "black");
const sinusGradient = new GlowGradient(svgSinusHarm);
const ns = 20;
const nsGlow = 20;
const m = 200;
const ampl = 3;
//@ts-ignore
let dataGlow = [];
//@ts-ignore
let dataSinus = [];
d3.range(nsGlow).forEach(_d => dataGlow.push({
    cycles: Math.random() * 2,
    ampl: Math.random() * 1.5,
    shiftY: -2 + Math.random() * 4.0,
    shiftPi: Math.random() * 2 * Math.PI
}));
d3.range(ns).forEach(_d => dataSinus.push({
    cycles: Math.random() * 2,
    ampl: Math.random() * 1.5,
    shiftY: -2 + Math.random() * 4.0,
    shiftPi: Math.random() * 2 * Math.PI
}));
const x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, widthHarm]);
const y = d3.scaleLinear()
    .domain([-3.5, 3.5])
    .range([heightHarm, 0]);
const svgSinus = svgSinusHarm.append("g").attr("opacity", "0.8");
let sinus = svgSinus.append("g")
    .attr("class", "sinus")
    .selectAll("path")
    //@ts-ignore
    .data(dataGlow)
    .enter().append("path")
    .attr("d", function (d) { return sinusHarm(d.cycles, m, d.ampl, d.shiftPi, d.shiftY, x, y); })
    .attr("fill", "none")
    .attr("stroke", bronze)
    .style("stroke-opacity", 0.7)
    .style("filter", "url(#blur)");
let sinus2 = svgSinus.append("g")
    .attr("class", "sinus2")
    .selectAll("path")
    //@ts-ignore
    .data(dataSinus)
    .enter().append("path")
    .attr("d", function (d) { return sinusHarm(d.cycles, m, d.ampl, d.shiftPi, d.shiftY, x, y); })
    .attr("fill", "none")
    .attr("stroke", bronze)
    .style("stroke-opacity", 0.3);
svgSinusHarm.append("rect")
    .attr("x", 4)
    .attr("y", 4)
    .attr("width", widthHarm - 8)
    .attr("height", heightHarm - 8)
    .attr("stroke", bronze)
    .attr("fill", "none");
const interval = d3.interval(() => {
    let delta = [];
    let opacity = [];
    //@ts-ignore
    dataGlow.forEach(_d => {
        delta.push(-0.5 + Math.random());
        opacity.push(Math.random());
    });
    sinus
        .transition().
        duration(3000).ease(d3.easeLinear)
        //@ts-ignore	
        .attrTween("d", function (d, i) {
        return function (t) {
            return sinusHarm(d.cycles, m, d.ampl + (Math.sin(t * 2 * Math.PI)) * (delta[i]), d.shiftPi + t * 2 * Math.PI, d.shiftY, x, y);
        };
    })
        //@ts-ignore
        .styleTween("stroke-opacity", function (d, i) {
        return function (t) {
            return 0.7 + (opacity[i] - 0.7) * (Math.sin(t * 2 * Math.PI));
        };
    });
    sinus2
        .transition().
        duration(3000).ease(d3.easeLinear)
        //@ts-ignore	
        .attrTween("d", function (d, i) {
        return function (t) {
            return sinusHarm(d.cycles, m, d.ampl + (Math.sin(t * 2 * Math.PI)) * (delta[i]), d.shiftPi + t * 2 * Math.PI, d.shiftY, x, y);
        };
    });
}, 3000);

//# sourceMappingURL=maps/testSinusHarmonic.js.map

const widthHarm = 700
const heightHarm = 100

const bronze = "#796221";

const divSinusHarm = d3.select("body").append("div")
    .style("height", "100vh")
    .style("width", "100%");

const svgSinusHarm = divSinusHarm.append("svg")
    .attr("width", divSinusHarm.style("width"))
    .attr("height", divSinusHarm.style("height"))
    .style("background", "black");

const sinusGradient = new GlowGradient(svgSinusHarm);

const rect1 = svgSinusHarm.append("rect")
.attr("x", 4)
.attr("y", 4)
.attr("width", widthHarm - 8)
.attr("height", heightHarm - 8)
.attr("stroke", bronze)
.attr("fill", "none");

sinusHarmInRectangle(svgSinusHarm, rect1, 20, 0, 8000);


const rect5 = svgSinusHarm.append("rect")
.attr("x", 4)
.attr("y", 104)
.attr("width", widthHarm - 8)
.attr("height", heightHarm - 8)
.attr("stroke", bronze)
.attr("fill", "none");

sinusHarmInRectangle(svgSinusHarm, rect5, 0, 10, 3000);

const rect2 = svgSinusHarm.append("rect")
.attr("x", 4)
.attr("y", 204)
.attr("width", widthHarm - 8)
.attr("height", heightHarm - 8)
.attr("stroke", bronze)
.attr("fill", "none");

sinusHarmInRectangle(svgSinusHarm, rect2, 10, 20, 7000);

const rect3 = svgSinusHarm.append("rect")
.attr("x", 4)
.attr("y", 204)
.attr("width", widthHarm - 8)
.attr("height", heightHarm - 8)
.attr("stroke", "none")
//@ts-ignore
.attr("fill", d3.color(bronze).darker(1).rgb())
.attr("opacity", 0.7);



const rect6 = svgSinusHarm.append("rect")
.attr("x", 4)
.attr("y", 304)
.attr("width", widthHarm - 8)
.attr("height", heightHarm - 8)
.attr("stroke", bronze)
.attr("fill", "none");

sinusHarmInRectangle(svgSinusHarm, rect6, 10, 10, 4000);
//@ts-ignore
sinusGradient.createLinearGradient(true, d3.color(bronze).darker(2).rgb(), bronze, 1, 3, 8, "linearTest1");
const rect9 = svgSinusHarm.append("rect")
.attr("x", 4)
.attr("y", 304)
.attr("width", widthHarm - 8)
.attr("height", heightHarm - 8)
.attr("stroke", "none")
//@ts-ignore
.attr('fill', "url(#linearTest1)")
.attr("opacity", 0.7);

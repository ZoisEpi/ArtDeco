const width = 700;
const height = 1000;
const lightBlue = "#7DF9FF";
const div = d3.select("body").append("div")
    .style("height", "100vh")
    .style("width", "100%");
const svg = div.append("svg")
    .attr("width", div.style("width"))
    .attr("height", div.style("height"))
    .style("background", "black");
const glowGradient = new GlowGradient(svg);
svg.append("rect")
    .attr("x", 8)
    .attr("y", 10)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 58)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none")
    .style("filter", "url(#glow)");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 108)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none")
    .style("filter", "url(#blur)");
glowGradient.createLinearGradient(true, "white", lightBlue, 1, 1, 5, "linearTest1");
glowGradient.createLinearGradient(true, "white", lightBlue, 5, 2, 2, "linearTest2");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 158)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr('stroke', "url(#linearTest1)")
    .attr("stroke-width", 3)
    .attr("fill", "none");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 208)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr('fill', "url(#linearTest1)");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 258)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr('fill', "url(#linearTest2)");
glowGradient.creatediagonalGradient("white", lightBlue, 2, 1, 4, "diagTest1");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 308)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr('fill', "url(#diagTest1)");

//# sourceMappingURL=maps/testGlowGradient.js.map

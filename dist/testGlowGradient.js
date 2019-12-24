const width = 700;
const height = 1000;
const lightBlue = "#7DF9FF";
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "black");
const glowGradient = new GlowGradient(svg);
svg.append("rect")
    .attr("x", 8)
    .attr("y", 4)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 120)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none")
    .style("filter", "url(#glow)");
svg.append("rect")
    .attr("x", 8)
    .attr("y", 236)
    .attr("width", width - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none")
    .style("filter", "url(#blur)");

//# sourceMappingURL=maps/testGlowGradient.js.map

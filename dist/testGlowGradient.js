const widthGlow = 700;
const lightBlue = "#7DF9FF";
const divGlow = d3.select("body").append("div")
    .style("height", "100vh")
    .style("width", "100%");
const svgGlow = divGlow.append("svg")
    .attr("width", divGlow.style("width"))
    .attr("height", divGlow.style("height"))
    .style("background", "black");
const glowGradient = new GlowGradient(svgGlow);
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 10)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none");
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 58)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none")
    .style("filter", "url(#glow)");
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 108)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr("stroke", lightBlue)
    .attr("fill", "none")
    .style("filter", "url(#blur)");
glowGradient.createLinearGradient(true, "white", lightBlue, 1, 1, 5, "linearTest1");
glowGradient.createLinearGradient(true, "white", lightBlue, 5, 2, 2, "linearTest2");
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 158)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr('stroke', "url(#linearTest1)")
    .attr("stroke-width", 3)
    .attr("fill", "none");
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 208)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr('fill', "url(#linearTest1)");
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 258)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr('fill', "url(#linearTest2)");
glowGradient.creatediagonalGradient("white", lightBlue, 2, 1, 4, "diagTest1");
svgGlow.append("rect")
    .attr("x", 8)
    .attr("y", 308)
    .attr("width", widthGlow - 16)
    .attr("height", 30)
    .attr('fill', "url(#diagTest1)");

//# sourceMappingURL=maps/testGlowGradient.js.map

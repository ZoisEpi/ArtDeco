const svg = d3.select("body").append("svg");
const defs = svg.append("defs");
function createGlowFilter() {
    const filter = defs.append("filter")
        .attr("id", "glow");
    filter.append("feGaussianBlur")
        .attr("stdDeviation", 3)
        .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
}
function createBlurFilter() {
    const filter = defs.append("filter")
        .attr("id", "blur");
    filter.append("feGaussianBlur")
        .attr("stdDeviation", 3)
        .attr("result", "coloredBlur");
}
function createLinearGradient(horizontal, colorMajor, colorHighlight, repeatMajorBetweenMajor, repeatPattern, id) {
    let colors = [];
    for (let i = 0; i < repeatPattern; i++) {
        for (let j = 0; j < repeatMajorBetweenMajor; j++) {
            colors.push(colorMajor);
        }
        colors.push(colorHighlight);
    }
    createMovingLinearGradient(0, horizontal ? 100 : 0, 0, horizontal ? 0 : 100, id, horizontal, colors);
}
function createMovingLinearGradient(x1, x2, y1, y2, id, horizontal, colors) {
    var linearGradient = defs.append("linearGradient")
        .attr("id", id);
    linearGradient
        .attr("x1", x1 + "%")
        .attr("y1", y1 + "%")
        .attr("x2", x2 + "%")
        .attr("y2", y2 + "%")
        .attr("spreadMethod", "reflect");
    linearGradient.selectAll(".stop")
        .data(colors)
        .enter().append("stop")
        .attr("offset", function (_d, i) { return i / (colors.length - 1); })
        .attr("stop-color", function (d) { return d; });
    linearGradient.append("animate")
        .attr("attributeName", horizontal ? "x1" : "y1")
        .attr("values", "0%;200%")
        .attr("dur", "10s")
        .attr("repeatCount", "indefinite");
    linearGradient.append("animate")
        .attr("attributeName", horizontal ? "x2" : "y2")
        .attr("values", "100%;300%")
        .attr("dur", "10s")
        .attr("repeatCount", "indefinite");
}

//# sourceMappingURL=maps/glowandgradient.js.map

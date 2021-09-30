class plot_density {
    constructor(aread, datad) {
        this.area = aread;
        this.data = datad;
    }
    transitionFromNowhere() {
        var area = this.area;
        var xScale = this.area.xScale;
        var yScale = this.area.yScale;
        const densityData = d3.contourDensity()
            //@ts-ignore
            .x(function (d) { return xScale(d.xVal); })
            //@ts-ignore
            .y(function (d) { return yScale(d.yVal); })
            //@ts-ignore
            .size([area.width, area.height])
            .bandwidth(20)(this.data.getData());
        var max = d3.max(densityData, function (d) {
            return d.value;
        });
        var min = d3.min(densityData, function (d) {
            return d.value;
        });
        this.color = d3.scaleLinear()
            //@ts-ignore
            .domain([min, max])
            //@ts-ignore
            .range(["#000000", "#00AAAA"]);
        var color = this.color;
        area.svg.insert("g", "g")
            .attr("clip-path", "url(#ClipRect)")
            .selectAll("path")
            .data(densityData)
            .enter().append("path")
            .attr("class", "densityMap")
            .attr("d", d3.geoPath())
            .attr("fill", function (d) { return color(d.value); })
            .attr("stroke", "BLACK")
            .attr("opacity", 0.0);
    }
    transitionToBottom() {
        var area = this.area;
        var color = this.color;
        area.svg.selectAll(".densityMap")
            .transition()
            .duration(5000)
            .attr("transform", "translate(0, -500) scale(1,4)")
            .attr("opacity", "0.0")
            .transition()
            .attr("transform", "");
    }
    transitionToLeft() {
        this.removeDensity();
    }
    transitionToCross() {
        var area = this.area;
        area.svg.selectAll(".densityMap")
            .transition()
            .delay(function (_d, i) { return (2000 - i * 100); })
            .duration(1000)
            //@ts-ignore
            .attr("opacity", function () { return Math.min(Number(d3.select(this).attr("opacity")), 0.5); })
            .transition()
            .duration(function (_d, i) { return (i * 100); })
            .attr("opacity", "0.0");
    }
    removeDensity() {
        var area = this.area;
        area.svg.selectAll(".densityMap")
            .transition()
            .duration(1000).attr("opacity", "0");
    }
    transitionToDensity() {
        var area = this.area;
        area.svg.selectAll(".densityMap")
            .transition()
            .delay(1000)
            .duration(1000).attr("opacity", "1");
    }
}

//# sourceMappingURL=../maps/plot/plot_density.js.map

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
        const color = d3.scaleLinear()
            //@ts-ignore
            .domain([min, max])
            //@ts-ignore
            .range(["#000000", "#00AAAA"]);
        area.svg.insert("g", "g")
            .attr("clip-path", "url(#ClipRect)")
            .attr("class", "densityMap")
            .attr("opacity", 0.0)
            .selectAll("path")
            .data(densityData)
            .enter().append("path")
            .attr("d", d3.geoPath())
            .attr("fill", function (d) { console.log(d.value); return color(d.value); })
            .attr("stroke", "BLACK");
    }
    transitionToBottom() {
        this.removeDensity();
    }
    transitionToLeft() {
        this.removeDensity();
    }
    transitionToCross() {
        this.removeDensity();
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

class plot_area {
    constructor(svgCreated) {
        this.svg = svgCreated;
        this.width = 400;
        this.height = 400;
        this.xScale = d3.scaleLinear()
            .domain([0, 0])
            .range([0, width]);
        this.yScale = d3.scaleLinear()
            .domain([0, 0])
            .range([height, 0]);
        svg.append("g")
            .attr("class", "axisWhite")
            .attr("id", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.xScale))
            .attr("opacity", "0");
        svg.append("g")
            .attr("class", "axisWhite")
            .attr("id", "yAxis")
            .call(d3.axisLeft(this.yScale))
            .attr("opacity", "0");
        svg.append("g")
            .attr("class", "axisGrid")
            .attr("id", "xAxisGrid")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.xScale))
            .attr("opacity", "0");
        svg.append("g")
            .attr("class", "axisGrid")
            .attr("id", "yAxisGrid")
            .call(d3.axisLeft(this.yScale))
            .attr("opacity", "0");
    }
    transitionFromNowhere() {
        var xScale = this.xScale;
        var yScale = this.yScale;
        var height = this.height;
        var width = this.width;
        xScale.domain([0, 1000]);
        yScale.domain([0, 1000]);
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
            .call(d3.axisLeft(yScale).ticks(20).tickSize(-1.0 * width).tickFormat(""));
        svg.select("#xAxisGrid")
            .transition()
            .duration(6000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisBottom(xScale).ticks(20).tickSize(-1.0 * height).tickFormat(""));
    }
}

//# sourceMappingURL=../maps/plot/plot_plotArea.js.map

class plot_area {
    constructor(svgCreated, datad) {
        this.svg = svgCreated;
        this.width = 500;
        this.height = 500;
        this.data = datad;
        var svg = this.svg;
        var width = this.width;
        var height = this.height;
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
        this.transitionToXData();
        this.transitionToYData();
    }
    transitionToYData() {
        var xScale = this.xScale;
        var yScale = this.yScale;
        var width = this.width;
        var svg = this.svg;
        xScale.domain([0, 1000]);
        yScale.domain([0, 1000]);
        svg.select("#yAxis")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisLeft(yScale));
        svg.select("#yAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisLeft(yScale).ticks(20).tickSize(-1.0 * width).tickFormat(""));
    }
    transitionToXData() {
        var xScale = this.xScale;
        var height = this.height;
        var svg = this.svg;
        xScale.domain([0, 1000]);
        svg.select("#xAxis")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisBottom(xScale));
        svg.select("#xAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisBottom(xScale).ticks(20).tickSize(-1.0 * height).tickFormat(""));
    }
    transitionToBottom() {
        var dataBins = this.data.getDataBins();
        var area = this;
        this.transitionToXData();
        //@ts-ignore
        this.yScale.domain([0, d3.max(dataBins, function (d) { return d.yLength; })]);
        this.svg.select("#yAxis")
            .transition()
            .duration(5000)
            //@ts-ignore
            .call(d3.axisLeft(area.yScale));
        this.svg.select("#xAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "0")
            //@ts-ignore
            .call(d3.axisBottom(area.xScale).ticks(20).tickSize(0).tickFormat(""));
        this.svg.select("#yAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisLeft(area.yScale).tickSize(-1.0 * area.width).tickFormat(""));
    }
    transitionToLeft() {
        var dataBins = this.data.getDataBins();
        var area = this;
        this.transitionToYData();
        //@ts-ignore
        this.xScale.domain([0, d3.max(dataBins, function (d) { return d.xLength; })]);
        this.svg.select("#xAxis")
            .transition()
            .duration(5000)
            //@ts-ignore
            .call(d3.axisBottom(area.xScale));
        this.svg.select("#yAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "0")
            //@ts-ignore
            .call(d3.axisLeft(area.yScale).ticks(20).tickSize(0).tickFormat(""));
        this.svg.select("#xAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisBottom(area.xScale).tickSize(-1.0 * area.width).tickFormat(""));
    }
    transitionToCross() {
        this.transitionFromNowhere();
    }
}

//# sourceMappingURL=../maps/plot/plot_area.js.map

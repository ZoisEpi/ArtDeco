class plot_cross {
    constructor(aread, datad) {
        this.area = aread;
        this.data = datad;
        var area = this.area;
        var dataToPlot = this.data.getData();
        console.log(dataToPlot);
        this.area.svg.append('g')
            .selectAll("dot")
            //@ts-ignore
            .data(dataToPlot)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) { return area.xScale(d.xVal); })
            .attr("cy", function (d) { return area.yScale(d.yVal); })
            .attr("r", 0.1)
            .attr("opacity", "0.0")
            //   
            .style("fill", "#00FFFF");
    }
    transitionFromNowhere() {
        var area = this.area;
        area.svg.selectAll(".dot")
            .on('mouseover', function () {
            d3.select(this)
                .attr("r", 4)
                .attr("opacity", "1");
        })
            .on('mouseout', function () {
            d3.select(this)
                .attr("r", 2)
                .attr("opacity", "0.6");
        })
            .transition()
            .ease(d3.easeBounce)
            .delay(function (_d, i) { return (i * 6); })
            .duration(6000)
            .attr("r", 2)
            .attr("opacity", "0.6")
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(d.xVal); })
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(d.yVal); });
    }
    transitionToBottom() {
        var xScale = this.area.xScale;
        var area = this.area;
        var dataToPlot = this.data.getData();
        const histogram = d3.histogram()
            //@ts-ignore
            .value(function (d) { return d.yVal; })
            .domain([0, 1000])
            .thresholds(xScale.ticks(20));
        //@ts-ignore
        var bins = histogram(dataToPlot);
        //@ts-ignore
        area.yScale.domain([0, d3.max(bins, function (d) { return d.length; })]);
        area.svg.select("#yAxis")
            .transition()
            .duration(5000)
            //@ts-ignore
            .call(d3.axisLeft(area.yScale));
        area.svg.selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("class", "histoHoriz")
            .attr("x", 1)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(d.x0)}, ${area.yScale(0)})`; })
            //@ts-ignore
            .attr("width", function (d) { return area.xScale(d.x1) - area.xScale(d.x0) - 1; })
            //@ts-ignore
            .attr("height", function (d) { return 0; })
            .style("fill", "#00FFFF")
            .attr("fill-opacity", "0.0");
        area.svg.selectAll(".histoHoriz")
            .transition()
            .duration(5000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(d.x0)}, ${area.yScale(d.length)})`; })
            //@ts-ignore
            .attr("height", function (d) { return area.height - area.yScale(d.length); })
            //@ts-ignore
            .attr("fill-opacity", "0.6");
        area.svg.select("#xAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "0")
            //@ts-ignore
            .call(d3.axisBottom(area.xScale).ticks(20).tickSize(0).tickFormat(""));
        area.svg.select("#yAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisLeft(area.yScale).tickSize(-1.0 * area.width).tickFormat(""));
        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function (_d, i) { return (i * 5); })
            .duration(4000)
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(0); })
            .attr("opacity", "0");
    }
    transitionToCross() {
        var area = this.area;
        //@ts-ignore
        area.yScale.domain([0, 1000]);
        area.svg.select("#yAxis")
            .transition()
            .duration(5000)
            //@ts-ignore
            .call(d3.axisLeft(area.yScale));
        area.svg.selectAll(".histoHoriz")
            .transition()
            .duration(5000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(d.x0)}, ${area.yScale(0)})`; })
            //@ts-ignore
            .attr("height", function (d) { return 0; })
            //@ts-ignore
            .attr("fill-opacity", "0.6");
        area.svg.select("#xAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisBottom(area.xScale).ticks(20).tickSize(-1.0 * area.height).tickFormat(""));
        area.svg.select("#yAxisGrid")
            .transition()
            .duration(5000)
            .attr("opacity", "1")
            //@ts-ignore
            .call(d3.axisLeft(area.yScale).ticks(20).tickSize(-1.0 * area.width).tickFormat(""));
        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function (_d, i) { return (i * 5); })
            .duration(4000)
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(d.xVal); })
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(d.yVal); })
            .attr("opacity", "0.6");
    }
}

//# sourceMappingURL=../maps/plot/plot_cross.js.map

class plot_cross {
    constructor(aread, datad) {
        this.area = aread;
        this.data = datad;
        var area = this.area;
        var dataToPlot = this.data.getData();
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
            .delay(function (_d, i) { return (i * 2); })
            .duration(3000)
            .attr("r", 2)
            .attr("opacity", "0.6")
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(d.xVal); })
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(d.yVal); });
    }
    transitionToBottom() {
        var area = this.area;
        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function (_d, i) { return (i * 5); })
            .duration(3000)
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(0); })
            .attr("r", 10)
            .attr("opacity", "0")
            .transition()
            .attr("r", 2);
    }
    transitionToLeft() {
        var area = this.area;
        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function (_d, i) { return (i * 5); })
            .duration(3000)
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(0); })
            .attr("r", 10)
            .attr("opacity", "0")
            .transition()
            .attr("r", 2);
    }
    transitionToCross() {
        var area = this.area;
        var numbDot = area.svg.selectAll(".dot").size();
        var delay = 2000.0 / numbDot;
        area.svg.selectAll(".dot")
            .attr("r", 2)
            .transition()
            .ease(d3.easeBounce)
            .delay(function (_d, i) { return (i * delay); })
            .duration(3000)
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(d.xVal); })
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(d.yVal); })
            .attr("opacity", "0.6")
            .attr("r", 2);
        area.svg.selectAll(".densityMap")
            .transition()
            .delay(2500)
            .duration(2500).attr("opacity", "1");
    }
    transitionToDensity() {
        var area = this.area;
        area.svg.selectAll(".dot")
            .transition()
            .duration(1500)
            //@ts-ignore
            .attr("r", 15)
            .attr("opacity", "0.1")
            .style("fill", "#00CCCC")
            .transition()
            .attr("r", 2)
            .attr("opacity", "0.0")
            .style("fill", "#00FFFF");
    }
}

//# sourceMappingURL=../maps/plot/plot_cross.js.map

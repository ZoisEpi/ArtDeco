class plot_cross {
    constructor(aread, datad) {
        this.area = aread;
        this.data = datad;
        var area = this.area;
        var dataToPlot = this.data.getData();
        var plot_cross = this;
        var groupLineH = area.svg.append("g").attr("id", "showLineX").attr("opacity", "0.0");
        groupLineH.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 500)
            .attr("height", 7)
            .attr("stroke", "#00FFFF")
            .style("filter", "url(#blur)");
        groupLineH.append("line")
            .attr("x1", 0)
            .attr("y1", 4)
            .attr("x2", 500)
            .attr("y2", 3)
            .attr("stroke", "#00FFFF");
        var groupLineV = area.svg.append("g").attr("id", "showLineY").attr("opacity", "0.0");
        groupLineV.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 7)
            .attr("height", 500)
            .attr("stroke", "#00FFFF")
            .style("filter", "url(#blur)");
        groupLineV.append("line")
            .attr("x1", 4)
            .attr("y1", 0)
            .attr("x2", 3)
            .attr("y2", 500)
            .attr("stroke", "#00FFFF");
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
            .style("fill", "#00FFFF")
            .on('mouseover', function (event, d) {
            //@ts-ignore
            var yPos = area.yScale(d.yVal) - 3;
            //@ts-ignore
            var xPos = area.xScale(d.xVal) - 3;
            d3.select(this)
                .attr("r", 5)
                .attr("opacity", "1");
            area.svg.selectAll("#showLineX")
                .attr("transform", function (d) {
                return "translate(0," + yPos + ")";
            })
                .attr("opacity", "1.0");
            area.svg.selectAll("#showLineY")
                .attr("transform", function (d) {
                return "translate(" + xPos + ",0)";
            })
                .attr("opacity", "1.0");
        })
            .on('mouseout', function (d) {
            d3.select(this)
                .attr("r", 2)
                .attr("opacity", "0.6")
                .style("filter", "none");
            area.svg.selectAll("#showLineX")
                .attr("opacity", "0.0");
            area.svg.selectAll("#showLineY")
                .attr("opacity", "0.0");
        });
        this.isVisible = false;
    }
    transitionFromNowhere() {
        var area = this.area;
        area.svg.selectAll(".dot")
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
        //@ts-ignore
        this.isVisible = true;
    }
    transitionToBottom() {
        if (this.isVisible == false) {
            return;
        }
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
        this.isVisible = false;
    }
    transitionToLeft() {
        if (this.isVisible == false) {
            return;
        }
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
        this.isVisible = false;
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
        this.isVisible = true;
    }
    transitionToDensity() {
        if (this.isVisible == false) {
            return;
        }
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
        this.isVisible = false;
    }
}

//# sourceMappingURL=../maps/plot/plot_cross.js.map

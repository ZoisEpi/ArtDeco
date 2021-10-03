class plot_histo {
    constructor(aread, datad) {
        this.area = aread;
        this.data = datad;
        var area = this.area;
        var dataBins = this.data.getDataBins();
        this.area.svg.selectAll(".histoHoriz")
            .data(dataBins)
            .join("rect")
            .attr("class", "histoHoriz")
            .attr("x", 1)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, ${area.height})`; })
            .attr("width", "0")
            //@ts-ignore
            .attr("height", "0")
            .attr("fill-opacity", "0.0")
            .style("fill", "url(#HorizontalGrad)")
            .on('mouseover', function () {
            //@ts-ignore
            d3.select(this).style("fill", "url(#HorizontalGrad2)"); // "url(#DiagGrad)");
        })
            .on('mouseout', function () {
            //@ts-ignore
            d3.select(this).style("fill", "url(#HorizontalGrad)");
        });
        this.area.svg.selectAll(".histoVert")
            .data(dataBins)
            .join("rect")
            .attr("class", "histoVert")
            .attr("x", 1)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, ${area.height})`; })
            .attr("width", "0")
            //@ts-ignore
            .attr("height", "0")
            .attr("fill-opacity", "0.0")
            .style("fill", "url(#VerticalGrad)")
            .on('mouseover', function () {
            //@ts-ignore
            d3.select(this).style("fill", "url(#VerticalGrad2)");
        })
            .on('mouseout', function () {
            //@ts-ignore
            d3.select(this).style("fill", "url(#VerticalGrad)");
        });
    }
    transitionFromNowhere() {
    }
    transitionToBottom() {
        var area = this.area;
        console.log(area.svg.selectAll(".histoHoriz").size());
        area.svg.selectAll(".histoHoriz")
            .transition()
            .duration(2500)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(d.y0)}, ${area.yScale(0)})`; })
            //@ts-ignore
            .attr("width", function (d) { return area.xScale(d.x1) - area.xScale(d.y0); })
            .attr("height", "0")
            .transition()
            .duration(2500)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(d.y0)}, ${area.yScale(d.yLength)})`; })
            //@ts-ignore
            .attr("height", function (d) { return area.height - area.yScale(d.yLength); })
            .attr("fill-opacity", "0.6");
        console.log(area.svg.selectAll(".histoVert").size());
        area.svg.selectAll(".histoVert")
            .transition()
            .duration(5000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, 0)`; })
            //@ts-ignore
            .attr("height", "500")
            .attr("width", "500")
            .attr("fill-opacity", "0.0")
            .transition()
            .duration(0)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, 500)`; })
            .attr("height", "0")
            .attr("width", "0");
    }
    transitionToLeft() {
        var area = this.area;
        area.svg.selectAll(".histoVert")
            .transition()
            .duration(2500)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(d.x1)})`; })
            //@ts-ignore
            .attr("height", function (d) { return area.yScale(d.x0) - area.yScale(d.x1); })
            .attr("width", 0)
            .transition()
            .duration(2500)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(d.x1)})`; })
            //@ts-ignore
            .attr("width", function (d) { return area.xScale(d.xLength); })
            .attr("fill-opacity", "0.6");
        area.svg.selectAll(".histoHoriz")
            .transition()
            .duration(5000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, 0)`; })
            //@ts-ignore
            .attr("height", "500")
            .attr("width", "500")
            .attr("fill-opacity", "0.0")
            .transition()
            .duration(0)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, 500)`; })
            .attr("height", "0")
            .attr("width", "0");
    }
    transitionToCross() {
        var area = this.area;
        area.svg.selectAll(".histoHoriz")
            .transition()
            .duration(5000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(1000)})`; })
            //@ts-ignore
            .attr("height", "500")
            .attr("width", "500")
            .attr("fill-opacity", "0.0")
            .transition()
            .duration(0)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(0)})`; })
            .attr("height", "0")
            .attr("width", "0");
        area.svg.selectAll(".histoVert")
            .transition()
            .duration(5000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(1000)})`; })
            //@ts-ignore
            .attr("height", "500")
            .attr("width", "500")
            .attr("fill-opacity", "0.0")
            .transition()
            .duration(0)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(0)})`; })
            .attr("height", "0")
            .attr("width", "0");
    }
    transitionToDensity() {
        var area = this.area;
        area.svg.selectAll(".histoHoriz")
            .attr("fill-opacity", "0.6")
            .transition()
            .duration(2000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(d.y0)},0)`; })
            .attr("height", "500")
            //@ts-ignore
            .attr("width", function (d) { return area.xScale(d.x1) - area.xScale(d.y0); })
            .transition()
            .duration(2000)
            .attr("fill-opacity", "0.0")
            .transition()
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(0)})`; })
            .attr("height", "0")
            .attr("width", "0");
        area.svg.selectAll(".histoVert")
            .attr("fill-opacity", "0.6")
            .transition()
            .duration(2000)
            //@ts-ignore
            .attr("transform", function (d) { return `translate(0, ${area.yScale(d.x1)})`; })
            //@ts-ignore
            .attr("height", function (d) { return area.yScale(d.x0) - area.yScale(d.x1); })
            .attr("width", "500")
            .transition()
            .duration(2000)
            .attr("fill-opacity", "0.0")
            .transition()
            //@ts-ignore
            .attr("transform", function (d) { return `translate(${area.xScale(0)}, ${area.yScale(0)})`; })
            .attr("height", "0")
            .attr("width", "0");
    }
}

//# sourceMappingURL=../maps/plot/plot_histo.js.map

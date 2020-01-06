class ArtDecoBorder {
    constructor(svgCreated) {
        this.color = "#CD7F32";
        this.svg = svgCreated;
        //@ts-ignore
        const bbox = this.svg.node().getBoundingClientRect();
        //@ts-ignore
        this.size = d3.min([bbox.height, bbox.width]) / 2.5;
        ["translate(5,5)",
            "translate(5," + (bbox.height - 5) + ")rotate(270)",
            "translate(" + (bbox.width - 5) + ",5)rotate(90)",
            "translate(" + (bbox.width - 5) + "," + (bbox.height - 5) + ")rotate(180)"]
            .forEach(d => {
            const group = this.svg.append("g");
            this.buildRect(group);
            this.buildArc(group);
            group.attr("transform", d);
        });
        this.createAnimation();
    }
    buildRect(group) {
        const thisBorder = this;
        const sizeLargeRect = this.size;
        const sizeSmallRect = 25; //this.size / 7.0;
        const delta = sizeSmallRect / 3.0;
        [delta * 2, delta, 0].forEach(function (d, i) {
            const lineRect = d3.line()([[d, d], [d + sizeLargeRect, d], [d + sizeLargeRect, d + sizeSmallRect],
                [d + sizeSmallRect, d + sizeSmallRect],
                [d + sizeSmallRect, d + sizeLargeRect], [d, d + sizeLargeRect], [d, d]]);
            group.append("path")
                .attr("class", "rectBorder" + i)
                .attr("d", lineRect)
                .attr("stroke", thisBorder.color)
                .attr("fill", "black")
                .style("filter", "url(#glow)")
                .on("mouseenter", function () {
                //@ts-ignore
                d3.select(this).attr("stroke", d3.color(thisBorder.color).brighter(2).rgb());
            })
                .on("mouseleave", function () {
                //@ts-ignore
                d3.select(this).attr("stroke", thisBorder.color);
            });
        });
    }
    buildArc(group) {
        const thisBorder = this;
        group.append("path")
            .attr("d", d3.arc()
            .innerRadius(thisBorder.size / 3)
            .outerRadius(thisBorder.size / 3 + 10)
            .startAngle(Math.PI / 2.0)
            .endAngle(3 * Math.PI / 4.0 - Math.PI / 40))
            .attr("stroke", thisBorder.color)
            .attr("fill", "black")
            .style("filter", "url(#glow)");
        group.append("path")
            .attr("d", d3.arc()
            .innerRadius(thisBorder.size / 3)
            .outerRadius(thisBorder.size / 3 + 10)
            .startAngle(3 * Math.PI / 4.0 + Math.PI / 40)
            .endAngle(Math.PI))
            .attr("stroke", thisBorder.color)
            .attr("fill", "black")
            .style("filter", "url(#glow)");
        group.append("path")
            .attr("d", d3.arc()
            .innerRadius(2 * thisBorder.size / 3)
            .outerRadius(2 * thisBorder.size / 3 + 10)
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI))
            .attr("stroke", thisBorder.color)
            .attr("fill", "black")
            .style("filter", "url(#glow)");
    }
    createAnimation() {
        const thisBorder = this;
        let currentClassNumber = 2;
        d3.interval(() => {
            d3.selectAll(".rectBorder" + currentClassNumber).transition().duration(1000)
                .attr("stroke", thisBorder.color)
                .attr("fill", "black");
            currentClassNumber--;
            if (currentClassNumber < 0) {
                currentClassNumber = 2;
            }
            d3.selectAll(".rectBorder" + currentClassNumber).transition().duration(1000)
                .attr("stroke", "#FF8B19")
                .attr("fill", "#663300");
        }, 1000);
    }
}

//# sourceMappingURL=maps/projectArtDecoBorder.js.map

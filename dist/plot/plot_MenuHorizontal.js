class plot_menuHorizontal {
    constructor(svgCreated, project) {
        this.svg = svgCreated;
        this.project = project;
        var svg = svgCreated;
        var project = this.project;
        svg.append('rect')
            .attr("id", "menuHisto")
            .attr("x", 5)
            .attr("y", 5)
            .attr("width", 30)
            .attr("height", 30)
            .attr("stroke", "white")
            .attr("fill", "black").on("mouseover", function () {
            d3.select(this)
                .attr("fill", "#00AAAA");
        })
            .on("click", function () {
            project.toHorizontalHisto();
        });
    }
}

//# sourceMappingURL=../maps/plot/plot_menuHorizontal.js.map

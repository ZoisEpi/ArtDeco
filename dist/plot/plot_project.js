class plot_project {
    constructor() {
        const div = d3.select("body").append("div")
            .style("height", "100vh")
            .style("width", "100%")
            .style("background", "black");
        //@ts-ignore        
        const bbox = div.node().getBoundingClientRect();
        var width = 500;
        var height = 500;
        var margin = { top: bbox.height / 2.0 - height / 2.0, right: 30, bottom: 30, left: bbox.width / 2.0 - width / 2.0 };
        const svg = div
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100vh");
        var glowGradient = new GlowGradient(svg);
        glowGradient.creatediagonalGradient("#007777", "BLACK", 1, 1, 0, "diagTest1");
        const elementPlot = svg.append("g")
            .style("background", "black")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("clipPath")
            .attr("id", "ClipRect")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 500)
            .attr("width", 500);
        const elementMenuHor = svg.append("g")
            .style("background", "black")
            .attr("transform", "translate(" + margin.left + "," + (margin.top - 50) + ")");
        var data = new plot_data();
        var area = new plot_area(elementPlot, data);
        var cross = new plot_cross(area, data);
        new plot_menuHorizontal(elementMenuHor, this);
        this.cross = cross;
        this.area = area;
        area.transitionFromNowhere();
        cross.transitionFromNowhere();
    }
    toHorizontalHisto() {
        var cross = this.cross;
        var area = this.area;
        area.transitionToBottom();
        cross.transitionToBottom();
    }
    toLeftHisto() {
        var cross = this.cross;
        var area = this.area;
        area.transitionToLeft();
        cross.transitionToLeft();
    }
    toCrossPlot() {
        var cross = this.cross;
        var area = this.area;
        area.transitionToCross();
        cross.transitionToCross();
    }
}
new plot_project();

//# sourceMappingURL=../maps/plot/plot_project.js.map

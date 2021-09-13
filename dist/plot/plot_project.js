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
        const elementPlot = svg.append("g")
            .style("background", "black")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const elementMenuHor = svg.append("g")
            .style("background", "black")
            .attr("transform", "translate(" + margin.left + "," + (margin.top - 50) + ")");
        var area = new plot_area(elementPlot);
        new plot_menuHorizontal(elementMenuHor, this);
        var data = new plot_data();
        var cross = new plot_cross(area, data);
        this.cross = cross;
        area.transitionFromNowhere();
        cross.transitionFromNowhere();
    }
    toHorizontalHisto() {
        var cross = this.cross;
        cross.transitionToBottom();
    }
}
new plot_project();

//# sourceMappingURL=../maps/plot/plot_project.js.map

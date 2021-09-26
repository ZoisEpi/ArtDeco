class plot_project {

    cross : plot_cross
    area : plot_area
    density : plot_density

    constructor() {
        const div = d3.select("body").append("div")
            .style("height", "100vh")
            .style("width", "100%")
            .style("background", "black");

        //@ts-ignore        
        const bbox = div.node().getBoundingClientRect();
        var width = 500;
        var height = 500;
            
        var margin = {top: bbox.height/2.0 - height/2.0, right: 30, bottom: 30, left: bbox.width/2.0 - width/2.0};
            
        const svg = div
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100vh");
        var glowGradient = new GlowGradient(svg);
        glowGradient.creatediagonalGradient("#007777", "WHITE", 2, 1, 1, "DiagGrad");

        glowGradient.createLinearGradient(true, "#00EEEE", "BLACK", 1, 1, 0, "HorizontalGrad2");
        glowGradient.createLinearGradient(true, "#007777", "BLACK", 1, 1, 0, "HorizontalGrad");

        glowGradient.createLinearGradient(false, "#00EEEE", "BLACK", 1, 1, 0, "VerticalGrad2");
        glowGradient.createLinearGradient(false, "#007777", "BLACK", 1, 1, 0, "VerticalGrad");

        const elementPlot = svg.append("g")
            .style("background", "black")
            .attr("transform",  "translate(" + margin.left + "," + margin.top + ")");

        svg.append("clipPath")       
	        .attr("id", "ClipRect") 
            .append("rect")            
            .attr("x", 0 ) 
            .attr("y", 0 )
            .attr("height", 500)
            .attr("width", 500);

        const elementMenuHor = svg.append("g")
            .style("background", "black")
            .attr("transform",  "translate(" + margin.left + "," + (margin.top - 50) + ")");

        var data = new plot_data();

        var area = new plot_area(elementPlot, data);
        var cross = new plot_cross(area, data);
        var density = new plot_density(area, data);

        
        new plot_menuHorizontal(elementMenuHor, this)

        this.cross = cross;
        this.area = area;
        this.density = density;

        area.transitionFromNowhere();
        cross.transitionFromNowhere();
        density.transitionFromNowhere();
    }

    toHorizontalHisto() {

        this.area.transitionToBottom();
        this.cross.transitionToBottom();
        this.density.transitionToBottom();
    }


    toLeftHisto() {

        this.area.transitionToLeft();
        this.cross.transitionToLeft();
        this.density.transitionToLeft();
    }

    toCrossPlot() {

        this.area.transitionToCross();
        this.cross.transitionToCross();
        this.density.transitionToCross();
    }

    toDensityPlot() {

      //  this.area.transitionToDensity();
        this.cross.transitionToDensity();
        this.density.transitionToDensity();
    }

}

new plot_project();
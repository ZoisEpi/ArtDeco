
class plot_menuHorizontal {

    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    project : plot_project;
    
    constructor(svgCreated: d3.Selection<SVGGElement, unknown, HTMLElement, any>, project : plot_project) {

        this.svg = svgCreated;
        this.project = project;

        var svg = svgCreated;

        var project = this.project;

        var groupCross = svg.append("g").attr("transform",  "translate(" + 5 + "," + 5 + ")");

        groupCross.append('rect')
        .attr("id", "menuCross")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30)            
        .attr("stroke", "white")
        .attr("fill", "black")
        .attr("opacity", "0")
        .on("click", function () { project.toCrossPlot()
            }
        )        .transition()
        .duration(6000)
        .attr("opacity", "1");



        var groupHorizHisto = svg.append("g").attr("transform",  "translate(" + 60 + "," + 5 + ")");
      
        groupHorizHisto.append('rect')
        .attr("x", 1)
        .attr("y", 10)
        .attr("width", 9)
        .attr("height", 19)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.4);        

        groupHorizHisto.append('rect')
        .attr("x", 10)
        .attr("y", 22)
        .attr("width", 10)
        .attr("height", 7)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.4);    

        groupHorizHisto.append('rect')
        .attr("x", 20)
        .attr("y", 7)
        .attr("width", 9)
        .attr("height", 22)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.4); 

        groupHorizHisto.append('rect')
        .attr("id", "menuHisto")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30)            
        .attr("stroke", "black")
        .style("fill", "black")
        .style("fill-opacity", 1)
        .on("click", function () { project.toHorizontalHisto()
            })
        .transition()
        .duration(6000)
        .attr("stroke", "white")
        .attr("opacity", "1")
        .style("fill-opacity", 0)


    }
}
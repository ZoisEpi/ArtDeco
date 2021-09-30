
class plot_histo {

    
    area : plot_area;
    data : plot_data;
    currentGrad : String;
    highlightGrad : String;

    constructor(aread : plot_area, datad : plot_data) {
        this.area = aread;
        this.data = datad;

        var area = this.area;
        var dataBins = this.data.getDataBins();
        var plot_histo = this;

        this.area.svg.selectAll("rect")
            .data(dataBins)
            .join("rect")
            .attr("class", "histoHoriz")
            .attr("x", 1)  
            //@ts-ignore
            .attr("transform", function(d) { return `translate(0, ${area.height})`})
            .attr("width", "0")
            //@ts-ignore
            .attr("height", "0")
            .attr("fill-opacity", "0.0") 
            .on('mouseover', function () {
                //@ts-ignore
                d3.select(this).style("fill",  plot_histo.highlightGrad);// "url(#DiagGrad)");
            })
            .on('mouseout', function () {
                            //@ts-ignore
                d3.select(this).style("fill", plot_histo.currentGrad);
             })
    }

    transitionFromNowhere() {


    }

    transitionToBottom() {

        var area = this.area;

        this.currentGrad = "url(#HorizontalGrad)";
        this.highlightGrad = "url(#HorizontalGrad2)";

        var currentGrad = this.currentGrad;

        area.svg.selectAll(".histoHoriz")
          .transition()
          .duration(2500)
                  //@ts-ignore
          .attr("transform", function(d) { return `translate(${area.xScale(d.y0)}, ${area.yScale(0)})`})

                   //@ts-ignore
          .attr("width", function(d) { return area.xScale(d.x1) - area.xScale(d.y0)})
          .attr("height", "0")
          .attr("fill-opacity", "0.6")
          .transition()
          .duration(2500)
                            //@ts-ignore
          .attr("transform", function(d) { return `translate(${area.xScale(d.y0)}, ${area.yScale(d.yLength)})`})
                             //@ts-ignore
          .attr("height", function(d) { return area.height - area.yScale(d.yLength); })  
          //@ts-ignore        
         .style("fill",  currentGrad)
        
    }


    transitionToLeft() {

        var area = this.area;

        this.currentGrad = "url(#VerticalGrad)";
        this.highlightGrad = "url(#VerticalGrad2)";
        var currentGrad = this.currentGrad;

        area.svg.selectAll(".histoHoriz")
          .transition()
          .duration(2500)
             //@ts-ignore
          .attr("transform", function(d) { return `translate(${area.xScale(0)}, ${area.yScale(d.x1)})`})
                   //@ts-ignore
          .attr("height", function(d) { return area.yScale(d.x0) - area.yScale(d.x1)})
          .attr("width", 0)
          .attr("fill-opacity", "0.6")
          .transition()
          .duration(2500)
                            //@ts-ignore
          .attr("transform", function(d) { return `translate(${area.xScale(0)}, ${area.yScale(d.x1)})`})
                             //@ts-ignore
          .attr("width", function(d) {return area.xScale(d.xLength); })
          //@ts-ignore
         .style("fill",  currentGrad)
    
    }



    transitionToCross() {

        var area = this.area;


          area.svg.selectAll(".histoHoriz")
          .transition()
          .duration(5000)
                  //@ts-ignore
            .attr("transform", function(d) { return `translate(${area.xScale(0)}, ${area.yScale(1000)})`})
                   //@ts-ignore
                   .attr("height", "500")
                   .attr("width", "500")

          .attr("fill-opacity", "0.0")
          .transition()
          .duration(0)
          //@ts-ignore
          .attr("transform", function(d) { return `translate(${area.xScale(0)}, ${area.yScale(0)})`})
          .attr("height", "0")
          .attr("width", "0")

    }

    transitionToDensity() {

    }

} 
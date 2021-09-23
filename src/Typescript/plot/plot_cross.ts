
class plot_cross {

    area : plot_area;
    data : plot_data;
    currentGrad : String;
    highlightGrad : String;

    constructor(aread : plot_area, datad : plot_data) {
        this.area = aread;
        this.data = datad;

        var area = this.area;
        var dataToPlot = this.data.getData();
        var dataBins = this.data.getDataBins();
        var plot_cross = this;

        this.area.svg.append('g')
            .selectAll("dot")
        //@ts-ignore
            .data(dataToPlot)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) { return area.xScale(d.xVal); } )
            .attr("cy", function (d) { return area.yScale(d.yVal); } )
            .attr("r", 0.1)
            .attr("opacity", "0.0")  
            .style("fill", "#00FFFF")


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
            .attr("fill-opacity", "1") 
            .on('mouseover', function () {
                //@ts-ignore
                d3.select(this).style("fill",  plot_cross.highlightGrad);// "url(#DiagGrad)");
            })
            .on('mouseout', function () {
                            //@ts-ignore
                d3.select(this).style("fill", plot_cross.currentGrad);
             })
    }

    transitionFromNowhere() {

        var area = this.area;
        var xScale = this.area.xScale;
        var yScale = this.area.yScale;



        area.svg.selectAll(".dot")
            .on('mouseover', function () {
                    d3.select(this)
                    .attr("r", 4)
                    .attr("opacity", "1")   
            })
            .on('mouseout', function () {
                d3.select(this)
                .attr("r", 2)
                .attr("opacity", "0.6") 

            })
            .transition()
            .ease(d3.easeBounce)
            .delay(function(_d,i){return(i*6)})
            .duration(6000)
            .attr("r", 2)
            .attr("opacity", "0.6")
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(d.xVal); } )
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(d.yVal); } )


            const densityData = d3.contourDensity()
            //@ts-ignore
            .x(function(d) { return xScale(d.xVal); })
            //@ts-ignore
            .y(function(d) { return yScale(d.yVal); })
                //@ts-ignore
            .size([area.width , area.height])
            .bandwidth(20)
                //@ts-ignore
            (this.data.getData())
        
        var max = d3.max(densityData, function(d){
            return d.value;
        })
        var  min = d3.min(densityData, function(d){
            return d.value;
        })
        
        
        const color = d3.scaleLinear()
        //@ts-ignore
        .domain([min, max])
        //@ts-ignore
        .range(["#000000", "#666666"]);
        
        
            area.svg.insert("g", "g")
            .attr("clip-path","url(#ClipRect)")
            .attr("class", "densityMap")
            .attr("opacity", 0.0)
            .selectAll("path")
            .data(densityData)
            .enter().append("path")
              .attr("d", d3.geoPath())
              .attr("fill", function(d) { console.log(d.value); return color(d.value); })
              .attr("stroke", "BLACK")

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

        
        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function(_d,i){return(i*5)})
            .duration(3000)
            //@ts-ignore
            .attr("cy", function (d) { return area.yScale(0); } )
            .attr("opacity", "0")

        area.svg.selectAll(".densityMap")
            .transition()
            .duration(1000).attr("opacity", "0")
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

        
        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function(_d,i){return(i*5)})
            .duration(3000)
            //@ts-ignore
            .attr("cx", function (d) { return area.xScale(0); } )
            .attr("opacity", "0")

        area.svg.selectAll(".densityMap")
            .transition()
            .duration(1000).attr("opacity", "0")
    }



    transitionToCross() {

        var area = this.area;


          area.svg.selectAll(".histoHoriz")
          .transition()
          .duration(5000)
                  //@ts-ignore
            .attr("transform", function(d) { return `translate(${area.xScale(500)}, ${area.yScale(500)})`})
                   //@ts-ignore
                   .attr("height", "0")
                   .attr("width", "0")

          .attr("fill-opacity", "0.0")
          .transition()
          .duration(0)
          //@ts-ignore
          .attr("transform", function(d) { return `translate(${area.xScale(0)}, ${area.yScale(0)})`})


        var numbDot =  area.svg.selectAll(".dot").size()
        var delay = 2000.0/numbDot;


        area.svg.selectAll(".dot")
            .transition()
            .ease(d3.easeBounce)
            .delay(function(_d,i){return(i*delay)})
            .duration(3000)
                //@ts-ignore
            .attr("cx", function (d) { return area.xScale(d.xVal); } )
                //@ts-ignore
            .attr("cy", function (d) { return area.yScale(d.yVal); } )
            .attr("opacity", "0.6")

            area.svg.selectAll(".densityMap")
                .transition()
                .delay(2500)
                .duration(2500).attr("opacity", "1")




    }

} 
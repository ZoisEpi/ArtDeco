
class plot_menuHorizontal {

    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    project : plot_project;
    buttonList : [];
    
    constructor(svgCreated: d3.Selection<SVGGElement, unknown, HTMLElement, any>, project : plot_project) {

        this.svg = svgCreated;
        this.project = project;

        var svg = svgCreated;

        var project = this.project;
        var plot_menuHorizontal = this;

        var groupCross = svg.append("g").attr("transform",  "translate(" + 5 + "," + 5 + ")");
        this.buttonList = [];

        groupCross.append("circle")
        .attr("cx", "10" )
        .attr("cy", "5" )
        .attr("r", 2)
        .style("fill", "#00FFFF")
        .style("fill-opacity", 0.6);

        groupCross.append("circle")

        .attr("cx", "15" )
        .attr("cy", "25" )
        .attr("r", 2)
        .style("fill", "#00FFFF")
        .style("fill-opacity", 0.6);


        groupCross.append("circle")
        .attr("cx", "5" )
        .attr("cy", "20" )
        .attr("r", 2)
        .style("fill", "#00FFFF")
        .style("fill-opacity", 0.6);

        groupCross.append("circle")
        .attr("cx", "20" )
        .attr("cy", "10" )
        .attr("r", 2)
        .style("fill", "#00FFFF")
        .style("fill-opacity", 0.6);

        var menuCross = groupCross.append('rect')
        .attr("id", "menuCross")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30)            
        .attr("stroke", "black")
        .style("fill", "black")
        .style("fill-opacity", 1)
        
        .on("click", function () { 
            plot_menuHorizontal.selectButton(d3.select(this).attr("id"));
            project.toCrossPlot()
            }
        )
        .on('mouseover', function () {
            d3.select(this).style("fill",  "url(#DiagGrad)");
        })
        .on('mouseout', function () {
            d3.select(this).style("fill", "black");
         })       
        
        menuCross.transition()
        .duration(6000)
        .style("fill-opacity", 0);

        //@ts-ignore
        this.buttonList.push(menuCross);

        var groupDensity = svg.append("g").attr("transform",  "translate(" + 60 + "," + 5 + ")");

        groupDensity.append('rect')
        .attr("x", 1)
        .attr("y", 1)
        .attr("width", 29)
        .attr("height", 29)            
        .attr("stroke", "black")
        .style("fill",  "#006666")
        .style("fill-opacity", 0.6);  


        var path = d3.path();
        path.moveTo(0,30);
        path.lineTo(30, 30);
        path.quadraticCurveTo( 22.5 , 0, 15, 15);
        path.quadraticCurveTo( 7.5 ,25, 0, 0);
        path.closePath();

        groupDensity.append("path")
                //@ts-ignore
            .attr("d", path)
            .attr("stroke", "black")
            .style("fill", "#00AAAA")
            .style("fill-opacity", 0.6)


            var path2 = d3.path();
            path2.moveTo(0,30);
            path2.lineTo(25, 30);
            path2.quadraticCurveTo( 15 , 20 , 10, 25);
            path2.quadraticCurveTo( 5 ,30, 0, 10);
            path2.closePath();

            groupDensity.append("path")
                            //@ts-ignore
            .attr("d", path2)
                .attr("stroke", "black")
                .style("fill", "#00DDDD")
                .style("fill-opacity", 0.6)
    
                var path3 = d3.path();
                path3.moveTo(5,0);
                path3.quadraticCurveTo( 15 , 15 , 20, 0);
                path3.closePath();
    


                groupDensity.append("path")
                            //@ts-ignore
                            .attr("d", path3)
                    .attr("stroke", "black")
                    .style("fill", "#00AAAA")
                    .style("fill-opacity", 0.6)

                


        var menuDensity = groupDensity.append('rect')
        .attr("id", "menuDensity")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30)            
        .attr("stroke", "black")
        .style("fill", "black")
        .style("fill-opacity", 1)
        
        .on("click", function () { 
            plot_menuHorizontal.selectButton(d3.select(this).attr("id"));
            project.toDensityPlot();
            }
        )
        .on('mouseover', function () {
            d3.select(this).style("fill",  "url(#DiagGrad)");
        })
        .on('mouseout', function () {
            d3.select(this).style("fill", "black");
         })       
        
         menuDensity.transition()
        .duration(6000)
        .style("fill-opacity", 0);

        //@ts-ignore
        this.buttonList.push(menuDensity);



        var groupHorizHisto = svg.append("g").attr("transform",  "translate(" + 120 + "," + 5 + ")");
      
        groupHorizHisto.append('rect')
        .attr("x", 1)
        .attr("y", 10)
        .attr("width", 9)
        .attr("height", 19)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.6);        

        groupHorizHisto.append('rect')
        .attr("x", 10)
        .attr("y", 22)
        .attr("width", 10)
        .attr("height", 7)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.6);    

        groupHorizHisto.append('rect')
        .attr("x", 20)
        .attr("y", 7)
        .attr("width", 9)
        .attr("height", 22)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.6); 

        var menuHistoH = groupHorizHisto.append('rect')
        .attr("id", "menuHistoH")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30)            
        .attr("stroke", "black")
        .style("fill", "black")
        .style("fill-opacity", 1)
        .on("click", function () { 
            plot_menuHorizontal.selectButton(d3.select(this).attr("id"));
            project.toHorizontalHisto();
        })
        .on('mouseover', function () {
            d3.select(this).style("fill",  "url(#DiagGrad)");
        })
        .on('mouseout', function () {
            d3.select(this).style("fill", "black");
         })

        
        
        menuHistoH.transition()
        .duration(6000)
        .style("fill-opacity", 0)

        //@ts-ignore
        this.buttonList.push(menuHistoH);

        var groupVertHisto = svg.append("g").attr("transform",  "translate(" + 180 + "," + 5 + ")");

        groupVertHisto.append('rect')
        .attr("x", 1)
        .attr("y", 1)
        .attr("width", 12)
        .attr("height", 9)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.6);        

        groupVertHisto.append('rect')
        .attr("x", 1)
        .attr("y", 10)
        .attr("width", 21)
        .attr("height", 9)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.6);    

        groupVertHisto.append('rect')
        .attr("x", 1)
        .attr("y", 20)
        .attr("width", 6)
        .attr("height", 9)            
        .attr("stroke", "black")
        .style("fill",  "#00FFFF")
        .style("fill-opacity", 0.6); 

        var menuHistoV = groupVertHisto.append('rect')
        .attr("id", "menuHistoV")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30)            
        .attr("stroke", "black")
        .style("fill", "black")
        .style("fill-opacity", 1)
        .on("click", function () { 
            plot_menuHorizontal.selectButton(d3.select(this).attr("id"));
            project.toLeftHisto()
        })
        .on('mouseover', function () {
            d3.select(this).style("fill",  "url(#DiagGrad)");// "url(#DiagGrad)");
        })
        .on('mouseout', function () {
            d3.select(this).style("fill", "black");
         })

        menuHistoV.transition()
            .duration(6000)
            .style("fill-opacity", 0)

        //@ts-ignore
        this.buttonList.push(menuHistoV);

        this.selectButton(menuCross.attr("id"));
    }

    selectButton(nameSel : string) {


        this.buttonList.forEach( function(d) {
            
        //@ts-ignore
                if(d.attr("id") == nameSel) {
                    
        //@ts-ignore
                    d.style("fill-opacity", "0.0");
        //@ts-ignore
                    d.attr("stroke", "white");
                }else{
                    
        //@ts-ignore
                    d.style("fill-opacity", "0.3");
        //@ts-ignore
                     d.attr("stroke", "#333333");
                }
        });
    }
}
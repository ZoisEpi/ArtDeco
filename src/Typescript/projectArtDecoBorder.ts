
class ArtDecoBorder {

    size: number;
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    group: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    color: string = "#CD7F32";

    constructor(svgCreated: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {

        this.svg = svgCreated;
        //@ts-ignore
        const bbox = this.svg.node().getBoundingClientRect()
        //@ts-ignore
        this.size = d3.min([bbox.height, bbox.width]) / 2.5;
        this.group = this.svg.append("g");
        this.buildRect();
        this.buildArc();
    }

    buildRect() {
        const thisBorder = this;
        const sizeLargeRect = this.size;
        const sizeSmallRect = this.size / 6.0;

     const delta = sizeSmallRect / 3.0;

     thisBorder.svg.append("rect")
     .attr("x", 2 * delta)
     .attr("y",  2 * delta)
     .attr("width", sizeLargeRect)
     .attr("height", sizeSmallRect)
     .attr("stroke", thisBorder.color)
     .attr("fill", "black");

     thisBorder.svg.append("rect")
     .attr("x", 2 * delta)
     .attr("y", 2 * delta)
     .attr("width", sizeSmallRect)
     .attr("height", sizeLargeRect)
     .attr("stroke", thisBorder.color)
     .attr("fill", "black");



     thisBorder.svg.append("rect")
     .attr("x", delta)
     .attr("y", delta)
     .attr("width", sizeLargeRect)
     .attr("height", sizeSmallRect)
     .attr("stroke", thisBorder.color)
     .attr("fill", "black");

 thisBorder.svg.append("rect")
     .attr("x", delta)
     .attr("y", delta)
     .attr("width", sizeSmallRect)
     .attr("height", sizeLargeRect)
     .attr("stroke", thisBorder.color)
     .attr("fill", "black");

        thisBorder.svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", sizeLargeRect)
            .attr("height", sizeSmallRect)
            .attr("stroke", thisBorder.color)
            .attr("fill", "black");

        thisBorder.svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", sizeSmallRect)
            .attr("height", sizeLargeRect)
            .attr("stroke", thisBorder.color)
            .attr("fill", "black");



    }

    buildArc() {
        const thisBorder = this;
        thisBorder.svg.append("path")
            .attr("d", d3.arc()
            .innerRadius(thisBorder.size/3)
            .outerRadius(thisBorder.size/3 + 10)
            .startAngle(Math.PI /2)
            .endAngle(Math.PI))
            .attr("stroke", thisBorder.color)
            .attr("fill", "black"); 
            
        thisBorder.svg.append("path")
            .attr("d", d3.arc()
            .innerRadius(2*thisBorder.size/3)
            .outerRadius(2*thisBorder.size/3 + 10)
            .startAngle(Math.PI /2)
            .endAngle(Math.PI))
            .attr("stroke", thisBorder.color)
            .attr("fill", "black"); 
    }


}
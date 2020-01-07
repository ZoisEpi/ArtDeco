
function sinusHarm(cycles: number, nbPoints: number, max: number,
  offsetPi: number, shiftY: number,
  x: d3.ScaleLinear<number, number>,
  y: d3.ScaleLinear<number, number>) {

  const line = d3.line();
  const step = ((2 * Math.PI) * cycles) / (nbPoints * 1.0);

  const ampl = max;

  return line(d3.range(nbPoints).map(function (p) { return [x(p), y(shiftY + Math.sin(step * p - offsetPi) * ampl)] }))
}

function sinusHarmInRectangle(
  parent: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  rect: d3.Selection<SVGRectElement, unknown, HTMLElement, any>,
  numClear: number, numBlur: number, speedMs: number) {

  //@ts-ignore
  const bbox = rect.node().getBoundingClientRect();

  //@ts-ignore
  const bboxParent = parent.node().getBoundingClientRect();
  const m = 200
 

  //@ts-ignore
  let dataGlow = []
  //@ts-ignore
  let dataSinus = []

  d3.range(numBlur).forEach(_d => dataGlow.push({
    cycles: Math.random() * 2,
    ampl: Math.random() * 1.5,
    shiftY: -2 + Math.random() * 4.0,
    shiftPi: Math.random() * 2 * Math.PI

  }))

  d3.range(numClear).forEach(_d => dataSinus.push({
    cycles: Math.random() * 2,
    ampl: Math.random() * 1.5,
    shiftY: -2 + Math.random() * 4.0,
    shiftPi: Math.random() * 2 * Math.PI

  }))

console.log(bbox.left + " " + bbox.right);

  const x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([bbox.left - bboxParent.left, bbox.right - bboxParent.left]);

  const y = d3.scaleLinear()
    .domain([-3.5, 3.5])
    .range([bbox.top - bboxParent.top, bbox.bottom - bboxParent.top]);

  const svgSinus = parent.append("g");

  let sinus = svgSinus.append("g")
    .attr("class", "sinus")
    .selectAll("path")
    //@ts-ignore
    .data(dataGlow)
    .enter().append("path")
    .attr("d", function (d) { return sinusHarm(d.cycles, m, d.ampl, d.shiftPi, d.shiftY, x, y) })
    .attr("fill", "none")
    .attr("stroke", bronze)
    .style("stroke-opacity", 0.5)
    .style("filter", "url(#blur)");



  let sinus2 = parent.append("g")
    .attr("class", "sinus2")
    .selectAll("path")
    //@ts-ignore
    .data(dataSinus)
    .enter().append("path")
    .attr("d", function (d) { return sinusHarm(d.cycles, m, d.ampl, d.shiftPi, d.shiftY, x, y) })
    .attr("fill", "none")
    .attr("stroke", bronze)
    .style("stroke-opacity", 0.4)

  d3.interval(() => {

    let delta: number[] = [];
    let opacity: number[] = [];
    //@ts-ignore

    const max : number = Math.max(numBlur, numClear);

    d3.range(max).forEach(_d => {
      delta.push(-0.5 + Math.random());
      opacity.push(Math.random())
    }
    )


    sinus
      .transition().
      duration(speedMs).ease(d3.easeLinear)
      //@ts-ignore	
      .attrTween("d", function (d, i) {
        return function (t: number) {
          return sinusHarm(d.cycles, m, d.ampl + (Math.sin(t * 2 * Math.PI)) * (delta[i]), d.shiftPi + t * 2 * Math.PI, d.shiftY, x, y);
        };
      })
      //@ts-ignore
      .styleTween("stroke-opacity", function (d, i) {
        return function (t: number) {
          return 0.7 + (opacity[i] - 0.7) * (Math.sin(t * 2 * Math.PI));
        };
      });


    sinus2
      .transition().
      duration(speedMs).ease(d3.easeLinear)
      //@ts-ignore	
      .attrTween("d", function (d, i) {
        return function (t) {
          return sinusHarm(d.cycles, m, d.ampl + (Math.sin(t * 2 * Math.PI)) * (delta[i]), d.shiftPi + t * 2 * Math.PI, d.shiftY, x, y);
        };
      })


  }, speedMs);


}
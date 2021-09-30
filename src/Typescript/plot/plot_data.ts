
class plot_data {

   data : {xVal : number, yVal : number} [];

   dataBins : {x0 : number | undefined, x1 : number  | undefined, y0 : number  | undefined, y1 : number | undefined ,
                 xLength : number  | undefined, yLength : number  | undefined} [];

   constructor() {
    this.data = [];
    var data = this.data;

    this.dataBins =  [];
    var dataBins = this.dataBins;

    const randF1 = d3.randomNormal(600,125);
    const randF2 = d3.randomNormal(200,75);

    const randF3 = d3.randomNormal(400, 100);
    const randF4 = d3.randomNormal(0,50);
 
    d3.range(1000).forEach(d => data.push({
        xVal: d % 2  ? randF1() : randF2(),
            //@ts-ignore
        yVal :  randF3()
    }))


    const histogramY = d3.histogram()
    //@ts-ignore
        .value(function(d) { return d.xVal; })  
        .domain([0, 1000]) 
        .thresholds(d3.scaleLinear().domain([0, 1000]).ticks(20));

    //@ts-ignore
    var binsY = histogramY(data);


    const histogramX = d3.histogram()
    //@ts-ignore
        .value(function(d) { return d.yVal; })  
        .domain([0, 1000]) 
        .thresholds(d3.scaleLinear().domain([0, 1000]).ticks(20));

    //@ts-ignore
    var binsX = histogramX(data);

    d3.range(binsX.length).forEach(d => dataBins.push({
        x0 : binsX[d].x0, 
        x1 : binsX[d].x1, 
        xLength : binsX[d].length,
        y0 : binsY[d].x0,
        y1 : binsY[d].x1,
        yLength : binsY[d].length
    }))


   }

   getData() {
       return this.data;
   }

   getDataBins() {
       return this.dataBins;
   }

}


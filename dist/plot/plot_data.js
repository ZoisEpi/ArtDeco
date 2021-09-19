class plot_data {
    constructor() {
        console.log("begin");
        this.data = [];
        var data = this.data;
        this.dataBins = [];
        var dataBins = this.dataBins;
        d3.range(1000).forEach(_d => data.push({
            xVal: Math.random() * 1000,
            yVal: Math.random() * 1000
        }));
        const histogramY = d3.histogram()
            //@ts-ignore
            .value(function (d) { return d.yVal; })
            .domain([0, 1000])
            .thresholds(d3.scaleLinear().domain([0, 1000]).ticks(20));
        //@ts-ignore
        var binsY = histogramY(data);
        const histogramX = d3.histogram()
            //@ts-ignore
            .value(function (d) { return d.xVal; })
            .domain([0, 1000])
            .thresholds(d3.scaleLinear().domain([0, 1000]).ticks(20));
        //@ts-ignore
        var binsX = histogramX(data);
        d3.range(20).forEach(d => dataBins.push({
            x0: binsX[d].x0,
            x1: binsX[d].x1,
            xLength: binsX[d].length,
            y0: binsY[d].x0,
            y1: binsY[d].x1,
            yLength: binsY[d].length
        }));
    }
    getData() {
        return this.data;
    }
    getDataBins() {
        return this.dataBins;
    }
}

//# sourceMappingURL=../maps/plot/plot_data.js.map

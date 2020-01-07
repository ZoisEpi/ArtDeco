class GlowGradient {

    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    defs: d3.Selection<SVGDefsElement, unknown, HTMLElement, any>;

    constructor(svgCreated: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
        this.svg = svgCreated;
        this.defs = this.svg.append("defs");
        this.createGlowFilter();
        this.createBlurFilter();
    }

    createGlowFilter() {

        const filter = this.defs.append("filter")
            .attr("id", "glow");

        filter.append("feGaussianBlur")
            .attr("stdDeviation", 3.5)
            .attr("result", "coloredBlur")

        let feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");
    }

    createBlurFilter() {

        const filter = this.defs.append("filter")
            .attr("id", "blur");

        filter.append("feGaussianBlur")
            .attr("stdDeviation", 3)
            .attr("result", "colored2Blur");

            const filter2 = this.defs.append("filter")
            .attr("id", "blurHighStd");

            filter2.append("feGaussianBlur")
            .attr("stdDeviation", 8)
            .attr("result", "colored2Blur");
    }

    createLinearGradient(horizontal: boolean, colorMajor: string, colorHighlight: string,
        repeatMajorBetweenMajor: number, repeatPattern: number, second: number, id: string) {

        let colors = [];
        for (let i = 0; i < repeatPattern; i++) {
            for (let j = 0; j < repeatMajorBetweenMajor; j++) {
                colors.push(colorMajor);
            }
            colors.push(colorHighlight);
        }

        this.createMovingLinearGradient(0, horizontal ? 100 : 0, 0, horizontal ? 0 : 100, id, horizontal, second, colors)
    }

    private createMovingLinearGradient(x1: number, x2: number, y1: number, y2: number,
        id: string, horizontal: boolean, second : number, colors: string[]) {

        var linearGradient = this.defs.append("linearGradient")
            .attr("id", id);

        linearGradient
            .attr("x1", x1 + "%")
            .attr("y1", y1 + "%")
            .attr("x2", x2 + "%")
            .attr("y2", y2 + "%")
            .attr("spreadMethod", "reflect");

        linearGradient.selectAll(".stop")
            .data(colors)
            .enter().append("stop")
            .attr("offset", function (_d, i) { return i / (colors.length - 1); })
            .attr("stop-color", function (d) { return d; });

        linearGradient.append("animate")
            .attr("attributeName", horizontal ? "x1" : "y1")
            .attr("values", "0%;200%")
            .attr("dur", second + "s")
            .attr("repeatCount", "indefinite");

        linearGradient.append("animate")
            .attr("attributeName", horizontal ? "x2" : "y2")
            .attr("values", "100%;300%")
            .attr("dur", second + "s")
            .attr("repeatCount", "indefinite");
    }

    creatediagonalGradient(colorMajor: string, colorHighlight: string,
        repeatMajorBetweenMajor: number, repeatPattern: number, second : number, id: string) {

        let colors = [];
        for (let i = 0; i < repeatPattern; i++) {
            for (let j = 0; j < repeatMajorBetweenMajor; j++) {
                colors.push(colorMajor);
            }
            colors.push(colorHighlight);
        }

        this.createMovingDiagonalGradient(0, 100, 0, 100, id, second, colors)
    }

    private createMovingDiagonalGradient(x1: number, x2: number, y1: number, y2: number,
        id: string, second : number, colors: string[]) {

        var linearGradient = this.defs.append("linearGradient")
            .attr("id", id);

        linearGradient
            .attr("x1", x1 + "%")
            .attr("y1", y1 + "%")
            .attr("x2", x2 + "%")
            .attr("y2", y2 + "%")
            .attr("spreadMethod", "reflect");

        linearGradient.selectAll(".stop")
            .data(colors)
            .enter().append("stop")
            .attr("offset", function (_d, i) { return i / (colors.length - 1); })
            .attr("stop-color", function (d) { return d; });

        linearGradient.append("animate")
            .attr("attributeName", "x1")
            .attr("values", "0%;200%")
            .attr("dur", second + "s")
            .attr("repeatCount", "indefinite");

        linearGradient.append("animate")
            .attr("attributeName", "x2")
            .attr("values", "100%;300%")
            .attr("dur", second + "s")
            .attr("repeatCount", "indefinite");

        linearGradient.append("animate")
            .attr("attributeName", "y1")
            .attr("values", "0%;200%")
            .attr("dur", second + "s")
            .attr("repeatCount", "indefinite");

        linearGradient.append("animate")
            .attr("attributeName", "y2")
            .attr("values", "100%;300%")
            .attr("dur", second + "s")
            .attr("repeatCount", "indefinite");
    }
}

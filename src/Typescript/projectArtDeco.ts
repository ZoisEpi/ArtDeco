class ProjectArtDeco {

    constructor() {
        const div = d3.select("body").append("div")
            .style("height", "100vh")
            .style("width", "100%");

        const svg = div.append("svg")
            .attr("width", div.style("width"))
            .attr("height", div.style("height"))
            .style("background", "black");

        new ArtDecoBorder(svg);
    }
}

new ProjectArtDeco();


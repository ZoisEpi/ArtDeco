function sinusHarm(cycles, nbPoints, max, offsetPi, shiftY, x, y) {
    const line = d3.line();
    const step = ((2 * Math.PI) * cycles) / (nbPoints * 1.0);
    const ampl = max;
    return line(d3.range(nbPoints).map(function (p) { return [x(p), y(shiftY + Math.sin(step * p - offsetPi) * ampl)]; }));
}

//# sourceMappingURL=maps/sinusHarm.js.map

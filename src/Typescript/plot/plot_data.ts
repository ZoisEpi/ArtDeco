
class plot_data {

   data : {xVal : number, yVal : number} [];

   constructor() {

    console.log("begin");

    this.data = [];
    var dati = this.data;

    d3.range(1000).forEach(_d => dati.push({
        xVal: Math.random() * 1000,
        yVal : Math.random() * 1000
    }))

    console.log(dati.length);
    console.log(this.data);
   }

   getData() {
       return this.data;
   }


}


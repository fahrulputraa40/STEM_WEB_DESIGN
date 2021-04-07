//setup
var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 50
    },
    width = 600 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
const timeDuration = 1000;

const svg = d3.select("#chart").append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
    .attr("class","Yaxis");

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.attr("class","Xaxis");

const y = d3.scaleLinear().range([height, 0]);
const yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","Yaxis")

  var data1 = [
    {ser1: new Date(2020, 01, 04), ser2: 5},
    {ser1: new Date(2021, 01, 04), ser2: 4},
    {ser1: new Date(2022, 01, 04), ser2: 16},
    {ser1: new Date(2023, 01, 04), ser2: 8},
    {ser1: new Date(2024, 01, 04), ser2: 6}
 ];

 var data2 = [
    {ser1: new Date(2021, 01, 04), ser2: 4},
    {ser1: new Date(2022, 01, 04), ser2: 16},
    {ser1: new Date(2023, 01, 04), ser2: 8},
    {ser1: new Date(2024, 01, 04), ser2: 6},
    {ser1: new Date(2025, 01, 04), ser2: 3}
 ];


//function
function update(data, timeout = true){

const x = d3.scaleTime()
    .range([0, width]);
x.domain(d3.extent(data, function(d) { return d.ser1; }))

const xAxis = d3.axisBottom(x)
    .tickFormat(d3.timeFormat("%Y-%m-%d"))
    .tickValues(data.map(d=>d.ser1));

svg.selectAll(".Xaxis").transition()
    .duration(timeout? timeDuration : 1)
    .call(xAxis);

y.domain([0, d3.max(data, function(d) { return d.ser2 })])
    svg.selectAll(".Yaxis")
    .transition()
    .duration(timeout? timeDuration : 1)
    .call(yAxis)
    
    let u = svg.selectAll(".line")
        .data([data])
    u.enter()
    .append("path")
    .attr("class","line")
    .merge(u)
    .transition()
    .duration(timeout?timeDuration:1)
    .attr("d", d3.line()
    .x(function(d) { return x(d.ser1); })
    .y(function(d) { return y(d.ser2); }))
    .attr("fill", "none")
    .attr("stroke", "#9a9a9a")
    .attr("stroke-width", 2.5)



}

update(data1,false)

setTimeout(() => {
    update(data2)
}, 5000);
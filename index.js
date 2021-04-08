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
    .attr("class", "Yaxis");

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "Xaxis");

const y = d3.scaleLinear().range([height, 0]);
const yAxis = d3.axisLeft(y);
svg.append("g")
    .attr("class", "Yaxis")

var data1 = [{
        ser1: new Date("2020-01-20T11:09:00"),
        ser2: 5
    },
    {
        ser1: new Date("2021-01-20T11:09:00"),
        ser2: 4
    },
    {
        ser1: new Date("2022-01-20T11:09:00"),
        ser2: 16
    },
    {
        ser1: new Date("2023-01-20T11:09:00"),
        ser2: 8
    },
    {
        ser1: new Date("2024-01-20T11:09:00"),
        ser2: 6
    }
];

var data2 = [{
        ser1: new Date("2021-01-20T11:09:00"),
        ser2: 4
    },
    {
        ser1: new Date("2022-01-20T11:09:00"),
        ser2: 16
    },
    {
        ser1: new Date("2023-01-20T11:09:00"),
        ser2: 8
    },
    {
        ser1: new Date("2024-01-20T11:09:00"),
        ser2: 6
    },
    {
        ser1: new Date("2025-01-20T11:09:00"),
        ser2: 18
    }
];


//function

function updateTable(data) {
    const table = document.getElementsByClassName("value")[0];
    const date = document.getElementsByClassName('date')

    const dataLength = data.length
    if(dataLength>0){
        date[0].innerHTML = data[0].ser1.toDateString();
        date[1].innerHTML = data[dataLength-1].ser1.toDateString();
    } 

    const l = table.childNodes.length    
    for (let index = 0; index < l; index++) {
        table.removeChild(table.childNodes[0])
    }

    data.forEach((d, i) => {
        let no = document.createElement('span'),
            date = document.createElement('span')
            value = document.createElement('span'),
            val = document.createElement('div');
        value.style.display = date.style.display = no.style.display = 'inline-block';
        value.style.width = no.style.width = '40px';
        date.style.width = '184px'

        no.innerHTML = i+1
        date.innerHTML = d.ser1.toDateString()
        value.innerHTML = d.ser2

        val.className = 'val';
        val.append(no);
        val.append(date);
        val.append(value);

        table.appendChild(val)
    });
}


function update(data, timeout = true) {

    updateTable(data)

    const x = d3.scaleTime()
        .range([0, width]);
    x.domain(d3.extent(data, function (d) {
        return d.ser1;
    }))

    const xAxis = d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%Y-%m-%d"))
        .tickValues(data.map(d => d.ser1));

    svg.selectAll(".Xaxis").transition()
        .duration(timeout ? timeDuration : 1)
        .call(xAxis);

    y.domain([0, d3.max(data, function (d) {
        return d.ser2
    })])
    svg.selectAll(".Yaxis")
        .transition()
        .duration(timeout ? timeDuration : 1)
        .call(yAxis)

    let u = svg.selectAll(".line")
        .data([data])
    u.enter()
        .append("path")
        .attr("class", "line")
        .merge(u)
        .transition()
        .duration(timeout ? timeDuration : 1)
        .attr("d", d3.line()
            .x(function (d) {
                return x(d.ser1);
            })
            .y(function (d) {
                return y(d.ser2);
            }))
        .attr("fill", "none")
        .attr("stroke", "#9a9a9a")
        .attr("stroke-width", 2.5)



}

update(data1, false)

setTimeout(() => {
    update(data2)
}, 5000);
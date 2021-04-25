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
var calibration_value = 0;

function sidePanel(state){
    if(state){
        document.querySelector(".side").style.display = 'block'
    }
    else{
        document.querySelector(".side").style.display = 'none'
    }
}

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
        ser2: 18
    },
    {
        ser1: new Date("2024-01-21T11:09:00"),
        ser2: 31
    },
    {
        ser1: new Date("2024-01-22T11:09:00"),
        ser2: 25
    },
    {
        ser1: new Date("2024-01-23T11:09:00"),
        ser2: 21
    },
    {
        ser1: new Date("2024-01-25T11:09:00"),
        ser2: 36
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
        date[0].innerHTML = data[0].ser1.toDateString()+", "+data[0].ser1.getHours()+":"+data[0].ser1.getMinutes()+":"+data[0].ser1.getSeconds();
        date[1].innerHTML = data[dataLength-1].ser1.toDateString()+", "+data[dataLength-1].ser1.getHours()+":"+data[dataLength-1].ser1.getMinutes()+":"+data[dataLength-1].ser1.getSeconds();;
    }
    const device_status = document.getElementsByClassName('device_status')[0]
    if(Date.now() - data[dataLength-1].ser1 > 10000){
        device_status.innerHTML = "Offline"
        document.getElementsByClassName('bullet')[0].style.backgroundColor = 'red'
    }
    else{
     device_status.innerHTML = "Online"
     document.getElementsByClassName('bullet')[0].style.backgroundColor = 'green'
    }
    

    const l = table.childNodes.length    
    for (let index = 0; index < l; index++) {
        table.removeChild(table.childNodes[0])
    }

    for (let index = data.length -1; index >= 0; index--) {
        d = data[index];
        i = data.length - index - 1
        let no = document.createElement('span'),
        date = document.createElement('span')
        value = document.createElement('span'),
        val = document.createElement('div');
    value.style.display = date.style.display = no.style.display = 'inline-block';
    value.style.width = no.style.width = '40px';
    date.style.width = '184px'

    no.innerHTML = i+1
    date.innerHTML = d.ser1.toDateString() + " "+d.ser1.getHours()+":"+d.ser1.getMinutes()+":"+d.ser1.getSeconds()
    value.innerHTML = d.ser2

    val.className = 'val';
    val.append(no);
    val.append(date);
    val.append(value);

    table.appendChild(val)
    }

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

function loadDoc() {
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
    let js = JSON.parse(this.responseText);
    let  ar = [];
    js.forEach(
        (d)=>{
            let  obj = JSON.parse(d); 
            let  data = {};           
            data.ser1 = new Date(obj.id);
            data.ser2 = parseFloat(obj.tdsValue);
            ar.push(data);
        }
    );
    update(ar);
    }
};
xhttp.open("GET", "http://helberiot.xyz/Home/getAll", true);
xhttp.send();
}

loadDoc();

let setCalibration = function (){
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let js = JSON.parse(this.responseText);
        document.getElementById("cal").value = js.calVal
        document.getElementById("tss-limit").value = js.tdsLimit
    }
};
xhttp.open("GET", "http://helberiot.xyz/Home/getCallibration", true);
xhttp.send();
};
setCalibration();

document.getElementById("myAnchor").addEventListener("submit", function(event){
    event.preventDefault();
    let cal = document.getElementById("cal").value; 
    let limit = document.getElementById("tss-limit").value;
    calibration_value = document.getElementById("cal").value;
    let x = 10;

    if(limit == "0" || limit.length == 0){
        document.getElementById("res").style.display = "block";
        document.getElementById("res").style.color = "white";
        document.getElementById("res").innerHTML = "limit cannot null or 0";
        setTimeout(() => {
            document.getElementById("res").style.display = "none";
        }, 1500);
        return;
    }
    if(cal.length == 0){
        document.getElementById("res").style.display = "block";
        document.getElementById("res").style.color = "white";
        document.getElementById("res").innerHTML = "calibration cannot null";
        setTimeout(() => {
            document.getElementById("res").style.display = "none";
        }, 1500);
        return;
    }
    try {
        console.log(eval(calibration_value));
    } catch (error) {
        document.getElementById("res").style.display = "block";
        document.getElementById("res").style.color = "white";
        document.getElementById("res").innerHTML = "Marh equation errors";
        setTimeout(() => {
            document.getElementById("res").style.display = "none";
        }, 1500);
     return;
    }
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            document.getElementById("res").style.display = "block";
            document.getElementById("res").style.color = "white";
            document.getElementById("res").innerHTML = "Calibration is changed";
            setTimeout(() => {
                document.getElementById("res").style.display = "none";
            }, 1500);
        }
        else{
            document.getElementById("res").style.display = "block";
            document.getElementById("res").style.color = "white";
            document.getElementById("res").innerHTML = "Connection Error";
            setTimeout(() => {
                document.getElementById("res").style.display = "none";
            }, 1500);
        }
    };
    xhttp.open("GET", "http://helberiot.xyz/home/calibration&cal="+cal+"&limit="+limit, true);
    xhttp.send();
});

// update(data1, false)
setTimeout( complexFunction, 4000 );

function complexFunction() {
  // complex code
  loadDoc();
  setTimeout( complexFunction, 4000 );
}
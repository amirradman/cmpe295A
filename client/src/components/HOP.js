import React, {Component} from 'react';
import * as d3 from "d3"
import data from "../Data/data_hop.csv"
import "../style/hop.css"

class HOP extends Component {

    constructor() {
        super();
        this.svg = React.createRef()
    }

    componentDidMount() {
        const margin = {top: 40, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

// Parse the date / time
        const parseDate = d3.timeParse("%b %Y");

// Set the ranges
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

// Define the line
        const priceline = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.price);
            });

// Adds the svg canvas
        const svg = d3.select(this.svg.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

// Get the data
        d3.csv(data).then(function(data) {
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.price = +d.price;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.price; })]);

            // Group the entries by symbol
            const dataNest = Array.from(
                d3.group(data, d => d.symbol), ([key, value]) => ({key, value})
            );

            // set the colour scale
           // const color = d3.scaleOrdinal(d3.schemeCategory10);

            const color = ["green","blue","red"]
            // Loop through each symbol / key

            const fixed = dataNest[0];
            console.log(fixed.value)


            let i = 0;
            function drawLine(){
                i = (i + 1) % dataNest.length
                const d = dataNest[i]

                const path = svg.append("path")
                    .style("fill","none")
                    .attr("class", "line")
                    .style("stroke", function() { // Add the colours dynamically
                        return d.color = color[i]; })
                    .style("stroke-width",function (){
                        if(i === 2 ){
                        return "3px";
                       }else{
                        return "1px";
                }})
                    .attr("d", priceline(d.value))
                    const totalLength = path.node().getTotalLength();
                    path
                        .attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(5000)
                        .ease(d3.easeExp)
                        .attr("stroke-dashoffset", 0)
                        .delay(150)
                        .remove()
            }

           setInterval(function (){
               drawLine()
           },1000)


            // Add the X Axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y));

            svg.append("path")
                .style("fill","none")
                .attr("class","line")
                .attr("data",priceline(fixed.value))
    })
}



    render() {
        return (
            <div ref = {this.svg}>
            </div>
        );
    }
}

export default HOP;


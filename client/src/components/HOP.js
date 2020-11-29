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
            width = 600 - margin.left - margin.right + 220,
            height = 270 - margin.top - margin.bottom;

// Parse the date / time
        const parseDate = d3.timeParse("%d-%b-%Y");

// Set the ranges
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

// Define the line
        const numline = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.num);
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
                d.num = +d.num;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.date;}));
            y.domain([3400, d3.max(data, function(d) { return d.num; })]);

            // Group the entries by symbol
            const dataNest = Array.from(
                d3.group(data, d => d.symbol), ([key, value]) => ({key, value})
            );
            // set the colour scale
            // const color = d3.scaleOrdinal(d3.schemeCategory10);

            // const color = ["green","blue","red"]
            // Loop through each symbol / key



            function drawLine(i){
                const d = dataNest[i]
                console.log(i)
                const path = svg.append("path")
                    .style("fill","none")
                    .attr("class", "line")
                    .style("stroke", function() {
                        if(i === 15){
                            return d.color = 'red'
                        }
                        else if(i <= 5){
                            return d.color = "rgba(255,0,0,0.2)"
                        }else if(5 < i && i < 10){
                            return d.color = "rgba(255,0,0,0.3)"
                        }else if(10<= i && i < 15){
                            return d.color = "rgba(255,0,0,0.4)"
                        }
                        else if(15 < i && i  < 20){
                            return d.color = "rgba(255,0,0,0.4)"
                        }
                        else if(20 <= i && i < 25){
                            return d.color = "rgba(255,0,0,0.3)"
                        }
                        else{
                            return d.color = "rgb(255,0,0,0.2)"
                        }})
                    .style("stroke-width", function (){
                        if(i === 15){
                            return "3px"
                        }else {
                            return "1px"
                        }
                    })
                    .attr("d", numline(d.value))
                const totalLength = path.node().getTotalLength();
                path
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(5000)
                    .ease(d3.easeExp)
                    .attr("stroke-dashoffset", 0)
                    .delay(500)
                    .remove()
            }

            function drawLineNoRemove(i){
                const d = dataNest[i]
                console.log(i)
                const path = svg.append("path")
                    .style("fill","none")
                    .attr("class", "line")
                    .style("stroke", function() {
                        if(i === 15){
                            return d.color = 'red'
                        }
                        else if(i <= 5){
                            return d.color = "rgba(255,0,0,0.3)"
                        }else if(5 < i && i < 10){
                            return d.color = "rgba(255,0,0,0.4)"
                        }else if(10<= i && i < 15){
                            return d.color = "rgba(255,0,0,0.7)"
                        }
                        else if(15 < i && i  < 20){
                            return d.color = "rgba(255,0,0,0.7)"
                        }
                        else if(20 <= i && i < 25){
                            return d.color = "rgba(255,0,0,0.4)"
                        }
                        else{
                            return d.color = "rgb(255,0,0,0.3)"
                        }})
                    .style("stroke-width", function (){
                        if(i === 15){
                            return "3px"
                        }else {
                            return "1px"
                        }
                    })
                    .attr("d", numline(d.value))
                const totalLength = path.node().getTotalLength();
                path
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(5000)
                    .ease(d3.easeExp)
                    .attr("stroke-dashoffset", 0)
                    .delay(500)
            }

            let timeId = setInterval(function () {
                let i = Math.floor(Math.random() * (30));
                if(i === 15){
                    i = 14
                }
                drawLine(i)
            }, 1000)



            setTimeout(function run() {
                clearInterval(timeId);
                drawLine(15)
                showAllLine()
            }, 60000)


            function showAllLine(){
                for(let i = 0; i < 30; i++){
                    drawLineNoRemove(i)
                }
            }

            // Add the X Axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("x", (margin.left + width / 2))
                .attr("y", margin.top - 70)
                .attr("dy", "1em")
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("text-decoration", "bold")
                .text("Forecast of COVID-19 deaths in the United States from May 2020 to August 2020");
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


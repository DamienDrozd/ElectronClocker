import React, { useState, useEffect } from "react";
import { Chart } from "../chart";


export const CreateChart = ({cpuAmperage, cpuSpeeds, cpuTemperature, cpuVoltage,currentThread, time}) => {

    const [chartType, setChartType] = useState("cpuSpeed")
    const [chartValues, setChartValues] = useState([])

    const [chartCpuSpeed, setChartCpuSpeed] = useState([])
    const [chartCpuVoltage, setChartCpuVoltage] = useState(Array(100).fill(undefined))
    const [chartCpuAmperage, setChartCpuAmperage] = useState(Array(100).fill(undefined))
    const [chartCpuTemperature, setChartCpuTemperature] = useState(Array(100).fill(undefined))
    

    useEffect(() => {
        updateChart(cpuSpeeds, cpuVoltage, cpuAmperage, cpuTemperature)
    }, [time])


    if (chartValues?.length > 100){
        setChartValues([...chartValues].splice(1))
    }

    const updateChart = (cpuSpeeds, cpuVoltage, cpuAmperage, cpuTemperature) => {
        // console.log("chartValues: ", chartValues)

        // console.log("currentThread: ", currentThread)
        // console.log("chartType: ", chartType)
        // console.log("cpuSpeeds: ", cpuSpeeds)
        // console.log("cpuVoltage: ", cpuVoltage)
        // console.log("cpuAmperage: ", cpuAmperage)
        // console.log("cpuTemperature: ", cpuTemperature)
        // console.log("chartCpuSpeed: ", chartCpuSpeed)


        if (chartCpuSpeed.length === 0 && cpuSpeeds !== undefined && cpuSpeeds.length !== 0){
            let chartCpu = Array((cpuSpeeds).length).fill(Array(100).fill(undefined))
            setChartCpuSpeed(chartCpu)
        } else if (cpuSpeeds !== undefined && cpuSpeeds.length !== 0) {
            for (let i = 0; i < chartCpuSpeed.length; i++){
                let newChartCpuSpeed = [...chartCpuSpeed[i]]
                newChartCpuSpeed.push(parseFloat(cpuSpeeds[i]))
                chartCpuSpeed[i] = newChartCpuSpeed
            }
        }
        
        
        setChartCpuAmperage([...chartCpuAmperage, parseFloat(cpuAmperage)])
        setChartCpuVoltage([...chartCpuVoltage, parseFloat(cpuVoltage)])
        setChartCpuTemperature([...chartCpuTemperature, parseFloat(cpuTemperature)])

        if (chartCpuVoltage.length > 100){
            setChartCpuVoltage([...chartCpuVoltage].splice(1))
        }
        if (chartCpuAmperage.length > 100){
            setChartCpuAmperage([...chartCpuAmperage].splice(1))
        }
        if (chartCpuTemperature.length > 100){
            setChartCpuTemperature([...chartCpuTemperature].splice(1))
        }
        let newChartCpuSpeed = [...chartCpuSpeed]
        for (let cpuTab in newChartCpuSpeed){
            if (newChartCpuSpeed[cpuTab].length > 100){
                newChartCpuSpeed[cpuTab].shift()
            }   
        }
        if (newChartCpuSpeed !== chartCpuSpeed && newChartCpuSpeed.length !== 0 && newChartCpuSpeed !== undefined ){
            setChartCpuSpeed(newChartCpuSpeed)
        }
        if (chartType === "cpuSpeed"){
            setChartValues(chartCpuSpeed[parseInt(currentThread)])
        }else if (chartType === "cpuVoltage"){
            setChartValues(chartCpuVoltage)
        }else if (chartType === "cpuAmperage"){
            setChartValues(chartCpuAmperage)
        }else if (chartType === "cpuTemperature"){
            setChartValues(chartCpuTemperature)
        }else if (chartType === "cpuCore"){
            setChartValues(cpuSpeeds)
        }
    }




    return (
        <div className="App"> 
            <Chart chartValues={chartValues} />
            <select name="cpu" id="cpu" onChange={e => setChartType(e.target.value)}>
            <option value="cpuSpeed">cpuSpeed</option>
            <option value="cpuVoltage">cpuVoltage</option>
            <option value="cpuAmperage">cpuAmperage</option>
            <option value="cpuTemperature">cpuTemperature</option>  
            <option value="cpuCore">cpuCore</option>
            </select>
        </div>
    );
};


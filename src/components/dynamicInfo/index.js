import React, { useState, useEffect } from "react";
import { CardDiv, DynamicInformation, ChartDiv, ChartCardDiv, CustomSelect } from "./styles";

import { CreateChart } from "../createChart";

import { TopBar } from "../AppleTopBar";



export const DynamicInfo = () => {
    const timerRef = React.useRef(null)
    const [time, setTime] = React.useState(0); 

    const [cpuThreadsCount, setCpuThreadsCount] = useState(0)
     

    const [cpuSpeed, setCpuSpeed] = useState("")
    const [cpuVoltage, setCpuVoltage] = useState("")
    const [cpuAmperage, setCpuAmperage] = useState("")
    const [cpuTemperature, setCpuTemperature] = useState("")

    const [currentThread, setCurrentThread] = useState(0)
    const [cpuSpeeds, setCpuSpeeds] = useState([])

    

    const getDynamicInfo = async () => { 
        // await window.computer_stat.requestSystemInfo()
        await window.dynamicAPI.requestSystemInfo()
        await window.dynamicAPI.getCpuSpeed(setCpuSpeed)
        await window.dynamicAPI.getCpuVoltage(setCpuVoltage)
        await window.dynamicAPI.getCpuAmperage(setCpuAmperage)
        await window.dynamicAPI.getCpuTemp(setCpuTemperature)
        await window.staticAPI.getCpuThreadsCount(setCpuThreadsCount)
    }

    const getStaticInfo = async () => {
        await window.staticAPI.requestSystemInfo()
        await window.staticAPI.getCpuThreadsCount(setCpuThreadsCount)
    }
    

    useEffect(() => {
        getStaticInfo()
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setTime(time => time + 1)
            getDynamicInfo()
        }, 1000)
        return () => {
        // cleanSystemInfo()
        clearInterval(timerRef.current)
        }
    }, [])


    useEffect(() => {
        const split = (cpuSpeed.split("\n")).slice(-cpuThreadsCount-1, -1)
        if (split.length === parseInt(cpuThreadsCount)){
            setCpuSpeeds(split)
        }
    }, [cpuSpeed])



    const renderSelect = () => {
        const options = []
        for (let i = 0; i < cpuThreadsCount; i++) {
        options.push(<option key={i} value={i}>cpu core {i}</option>)
        }
        return options
    }

    return (
        <>
            <CardDiv> 
                <TopBar />
                <DynamicInformation>
                    <CustomSelect name="cpu" id="cpu" onChange={e => setCurrentThread(e.target.value)}>
                    {renderSelect()}
                    </CustomSelect>
                    <p>
                    CurrentCpuSpeed = {cpuSpeeds[currentThread]} MHz
                    </p>
                    
                    <p>
                    cpuVoltage = {cpuVoltage}
                    </p>
                    <p>
                    cpuAmperage = {cpuAmperage} mA
                    </p>
                    <p>
                    cpuTemperature = {cpuTemperature} °C
                    </p>
                </DynamicInformation>
            </CardDiv>
            <ChartCardDiv>
                <TopBar />
                <ChartDiv>
                    <CreateChart cpuAmperage={cpuAmperage} cpuSpeeds={cpuSpeeds} cpuTemperature={cpuTemperature} cpuVoltage={cpuVoltage} currentThread={currentThread} time={time} />
                </ChartDiv>
            </ChartCardDiv>
        </>
    );
};


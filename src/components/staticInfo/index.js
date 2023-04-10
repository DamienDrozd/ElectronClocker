import React, { useState, useEffect } from "react";
import { StaticInformation, CardDiv } from "./styles";

import { TopBar } from "../AppleTopBar";
import { Overclock } from "../overclock";


export const StaticInfo = () => {
    const [maxCpuSpeed, setMaxCpuSpeed] = useState(0)
    const [minCpuSpeed, setMinCpuSpeed] = useState(0)
    const [systemInfo, setSystemInfo] = useState({}) // on ajoute une state
    const [cpuThreadsCount, setCpuThreadsCount] = useState(0)
    const [cpuCoreCount, setCpuCoreCount] = useState("")

    const getStaticInfo = async () => {
        await window.staticAPI.requestSystemInfo()
        await window.staticAPI.getSystemInfo(setSystemInfo)
        await window.staticAPI.getMinCpuSpeed(setMinCpuSpeed)
        await window.staticAPI.getMaxCpuSpeed(setMaxCpuSpeed)
        await window.staticAPI.getCpuThreadsCount(setCpuThreadsCount)
        await window.staticAPI.getCpuCoreCount(setCpuCoreCount) 
    }

    useEffect(() => {
        getStaticInfo()
    }, [])

    return (
        <>
            <CardDiv>
                <TopBar />
                <StaticInformation>
                    <p>
                    maxCpuSpeed = {maxCpuSpeed} MHz
                    </p>
                    <p>
                    minCpuSpeed = {minCpuSpeed} MHz
                    </p>
                    <p>
                    cpuThreadsCount = {cpuThreadsCount}
                    </p>
                    <p>
                    cpuCoreCount = {cpuCoreCount}
                    </p>
                    <p>
                    platform = {systemInfo?.platform}
                    </p>
                    <p>
                    version = {systemInfo?.version}
                    </p>
                </StaticInformation>
            </CardDiv>
            <Overclock minCpuSpeed={minCpuSpeed} maxCpuSpeed={maxCpuSpeed}  />
        </>
    );
};


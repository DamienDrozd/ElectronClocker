import React, { useState, useEffect } from "react";
import { CardDiv, OverclockDiv, OverClockButton, SliderDiv, Slider, StartTurboBoostButton, StopTurboBoostButton } from "./styles";

import { TopBar } from "../AppleTopBar";



export const Overclock = ({minCpuSpeed, maxCpuSpeed}) => {
    const [currentMinCpuSpeed, setCurrentMinCpuSpeed] = useState(0)
    const [currentMaxCpuSpeed, setCurrentMaxCpuSpeed] = useState(0)
    const [turboBoost, setTurboBoost] = useState(false)

    const getOverClockInfo = async () => {
        await window.overClocking.requestOverClockInfo()
        await window.overClocking.getMinCurrentCpuSpeed(setCurrentMinCpuSpeed)
        await window.overClocking.getMaxCurrentCpuSpeed(setCurrentMaxCpuSpeed)
        await window.overClocking.getTurboBoost(setTurboBoost)
    }

    useEffect(() => {
        getOverClockInfo()
    }, [])

    const Overclock = async () => {
        await window.overClocking.setMaxCpuSpeed(currentMaxCpuSpeed)
        await getOverClockInfo()
    }

    const changeTurboBoost = async () => {
        if (turboBoost === false) {
            await window.overClocking.startTurboBoost(setTurboBoost)
        } else {
            await window.overClocking.stopTurboBoost(setTurboBoost)
        }
    }

    

    return (
        <CardDiv>
            <TopBar />
            <OverclockDiv>
                <p>
                    Overclock
                </p>
                <p>
                    max = {currentMaxCpuSpeed} MHz
                </p>
                <p>turboBoost = {turboBoost}</p>
                {turboBoost === false ? 
                    <StartTurboBoostButton onClick={changeTurboBoost}>Start Turbo Boost</StartTurboBoostButton>
                    :
                    <StopTurboBoostButton onClick={changeTurboBoost}>Stop Turbo Boost</StopTurboBoostButton>
                }

                <SliderDiv>
                    <p>{minCpuSpeed} MHz</p>
                    <Slider type="range" min={minCpuSpeed} max={maxCpuSpeed} value={currentMaxCpuSpeed} onChange={e => setCurrentMaxCpuSpeed(e.target.value)} class="slider" id="myRange"></Slider>
                    <p>{maxCpuSpeed} MHz</p>
                </SliderDiv>
                <OverClockButton onClick={() => Overclock()}>
                    Overclock
                </OverClockButton>
            </OverclockDiv>
        </CardDiv>
    );
};



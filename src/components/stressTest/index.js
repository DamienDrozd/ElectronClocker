import React, { useState } from "react";
import { CardDiv, StressTestDiv, StartStressTestButton, StopStressTestButton } from "./styles";

import { TopBar } from "../AppleTopBar";


export const StressTest = () => {
    const [stressTest, setStressTest] = useState(false)

    const runStressTest = async () => {
        if (stressTest === false) {
            await window.StressTest.requestStressTest(setStressTest)
        } else {
            await window.StressTest.stopStressTest(setStressTest)
        }
    }

    

    return (
        <CardDiv>
            <TopBar />
            <StressTestDiv>
                <p>
                    stressTest
                </p>
                {stressTest === false ? 
                    <StartStressTestButton onClick={runStressTest}>Start stress test</StartStressTestButton>
                    :
                    <StopStressTestButton onClick={runStressTest}>Stop stress test</StopStressTestButton>
                }
            </StressTestDiv>
        </CardDiv>
    );
};



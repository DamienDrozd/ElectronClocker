import React, { useState } from "react";
import { CardDiv, StressTestDiv } from "./styles";


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
            <StressTestDiv>
                <p>
                stressTest = {stressTest}
                </p>
                <button onClick={runStressTest}>Stress test</button>
                {() => {if (stressTest === true) {
                return <p>Stress test is running</p>
                } else {
                    return <p>Stress test is not running</p>
                }
                }}
            </StressTestDiv>
        </CardDiv>
    );
};


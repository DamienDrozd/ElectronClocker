import React from "react";
import { StaticInfo } from "../../components/staticInfo";
import { StressTest } from "../../components/stressTest";
import { DynamicInfo } from "../../components/dynamicInfo";
import {MainDiv, AlignDiv} from './styles';


export const Main = () => {

 
  return (
    <MainDiv>
      <AlignDiv>
        <DynamicInfo />
      </AlignDiv>
      <AlignDiv>
        <StressTest />
        <StaticInfo />
      </AlignDiv>
    </MainDiv>
  );
}


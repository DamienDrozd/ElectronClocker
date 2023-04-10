import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import { classic } from "./data";
import React, { useState, useEffect } from "react";


export const Chart = ({chartValues, theme}) => {
    // classic.series[0].data = data  
    const [data, setData] = useState(classic)
    useEffect(() => {
        const newSeries = {
            data: chartValues,
            type: "line",
            itemStyle: { color: "#ff0000" }
        }
        let newData = {...data}
        newData.series = newSeries
        setData(newData)
    }, [chartValues])

    return (
        <ReactECharts
        option={data}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        />
    );
};


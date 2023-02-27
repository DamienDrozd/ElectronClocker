import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import React from 'react';




function App() {
  const [systemInfo, setSystemInfo] = useState({}) // on ajoute une state
  const [ramWarning, setRamWarning] = useState(false)
  const timerRef = React.useRef(null)

  const getAllInfo = async () => { 
    // await window.computer_stat.requestSystemInfo()
    await window.electronAPI.requestSystemInfo()
    await window.electronAPI.getSystemInfo(setSystemInfo)
}

  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      getAllInfo()
    }, 1000)
    return () => {
      // cleanSystemInfo()
      clearInterval(timerRef.current)
      }
  }, [])

  useEffect(() => {
    // console.log("systemInfo", systemInfo) // ici on affiche bien les infos de la state
    if (!ramWarning) {
      if (systemInfo?.memoryUsage?.free < 1000000000) {
        setRamWarning(true)
        window.electronAPI.alertNotification()
      }
    }
  }, [systemInfo])
 
  return (
    <div className="App"> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          CPUUsage = {systemInfo?.percentCPUUsage?.percentCPUUsage}
        </p>
        <p>
          platform = {systemInfo?.platform}
        </p>
        <p>
          version = {systemInfo?.version}
        </p>
        <p>
          systemVersion = {systemInfo?.systemVersion}
        </p>
        <p>
          freeMemory = {systemInfo?.memoryUsage?.free}
        </p>
        <p>
          {systemInfo?.cpu?.map((cpu, index) => (  
            <p key={index}>
              cpuModel = {cpu.model}
              cpuSpeed = {cpu.speed}
            </p>  
          ))}
        </p> 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

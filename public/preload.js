// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");
const fs = require('fs');



// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld('staticAPI', {
  requestSystemInfo: () => ipcRenderer.send('get-system-static-info'),
  getSystemInfo: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le 
      ipcRenderer.on('system-info', (event, info) => {
        setState(info) // on set la state avec les infos et on peux ainsi récupérer correctement les infos.
      }),
  getMinCpuSpeed: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('min-cpu-speed', (event, info) => {
        setState(parseFloat(info)/10000) 
      }),
  getMaxCpuSpeed: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
    ipcRenderer.on('max-cpu-Speed', (event, info) => {
      setState(parseFloat(info)/10000) 
    }),
  getCpuThreadsCount: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
    ipcRenderer.on('cpu-threads-count', (event, info) => {
      setState(parseInt(info)) 
    }),
  getCpuCoreCount: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
    ipcRenderer.on('cpu-core-count', (event, info) => { 
      setState(info) 
    }),
  })
  contextBridge.exposeInMainWorld('dynamicAPI', {
    requestSystemInfo: () => ipcRenderer.send('get-system-dynamic-info'),
    getCpuSpeed: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('cpu-speed', (event, info) => {
        setState(info) 
      }),
    getCpuVoltage: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('cpu-voltage', (event, info) => {
        setState(parseFloat(info))
      }),
    getCpuAmperage: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('cpu-amperage', (event, info) => {
        if (parseFloat(info) < 10){
          setState(parseFloat(info)*1000)
        }else{
          setState(parseFloat(info))
        } 
      }),
    getCpuTemp: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('cpu-temp', (event, info) => {
        setState(info) 
      }),
    
  })

  contextBridge.exposeInMainWorld('StressTest', {
    requestStressTest: (setState) =>{
      ipcRenderer.send('run-stress-test');
      console.log('Stress test started')
      setState(true);
    },
    stopStressTest: (setState) => {
      ipcRenderer.send('stop-stress-test');
      console.log('Stress test stopped')
      setState(false);
    },
  })

  
  contextBridge.exposeInMainWorld('password', {
    requestcheckpassword: () => ipcRenderer.send('check-password'),
    checkPassword: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('password-test', (event, info) => {
        if (info == undefined) {
          console.log("password undefined")
          info = false;
        }
        setState(info)
      }
    ),
    setPassword: (password) => {
      ipcRenderer.send('set-password', password)
    }
  })
  contextBridge.exposeInMainWorld('packages', {
    requestInstall: () => ipcRenderer.send('install-package'),
    checkPackages: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('install-script', (event, info) => {
        console.log("info", info)
        setState(true)
      }
    ),
  })

  contextBridge.exposeInMainWorld('overClocking', {
    requestOverClockInfo: () => ipcRenderer.send('over-clocking-info'),
    getMinCurrentCpuSpeed: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('min-current-cpu-speed', (event, info) => {
        setState(parseFloat(info) * 1000)
      }),
    getMaxCurrentCpuSpeed: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('max-current-cpu-speed', (event, info) => {
        setState(parseFloat(info) * 1000) 
      }),
    setMaxCpuSpeed: (value) => {// on ajoute ici un parametre qui sera une fonction setState envoyée par le
      console.log("set max cpu speed : ", value)
      ipcRenderer.send('set-max-cpu-speed', value)
    },

    getTurboBoost: (setState) => {
      ipcRenderer.send('test-cpu-boost')
      ipcRenderer.on('get-turbo-boost', (event, info) => {
        console.log("cpu boost : ", info)
        if (info == 0) {
          setState(false)
        }
        else {
          setState(true)
        }
      })
    },
    startTurboBoost: (setState) => {// on ajoute ici un parametre qui sera une fonction setState envoyée par le
      console.log("start turbo boost")
      ipcRenderer.send('start-cpu-boost')
      ipcRenderer.on('start-turbo-boost-output', (event, info) => {
        console.log("cpu boost : ", info)
        if (info == 0) {
          setState(false)
        }
        else {
          setState(true)
        }
      })
    },
    stopTurboBoost: (setState) => {// on ajoute ici un parametre qui sera une fonction setState envoyée par le
      console.log("stop turbo boost")
      ipcRenderer.send('stop-cpu-boost')
      ipcRenderer.on('stop-turbo-boost-output', (event, info) => {
        console.log("cpu boost : ", info)
        if (info == 0) {
          setState(false)
        }
        else {
          setState(true)
        }
      })
    },
    
    
  })

});








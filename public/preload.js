// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");


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
        setState(info) 
      }),
  getMaxCpuSpeed: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
    ipcRenderer.on('max-cpu-Speed', (event, info) => {
      setState(info) 
    }),
  getCpuThreadsCount: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
    ipcRenderer.on('cpu-threads-count', (event, info) => {
      setState(info) 
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
        setState(info) 
      }),
    getCpuAmperage: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le
      ipcRenderer.on('cpu-amperage', (event, info) => {
        setState(info) 
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
});



// Renderer process

// process.once("get-system-info", () => {
//   contextBridge.exposeInMainWorld('computer_stat', {
//     requestSystemInfo: () => ipcRenderer.send('get-system-info'),
//     getSystemInfo: (setState) =>
//       ipcRenderer.on('system-info', (event, info) => {
//         console.log('Temps réel', info)
//         setState(info) 
//       })
//     })
// });




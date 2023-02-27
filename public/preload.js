// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");


// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld('electronAPI', {
    requestSystemInfo: () => ipcRenderer.send('get-system-info'),
    getSystemInfo: (setState) => // on ajoute ici un parametre qui sera une fonction setState envoyée par le 
      ipcRenderer.on('system-info', (event, info) => {
        console.log('info', info)
        setState(info) // on set la state avec les infos et on peux ainsi récupérer correctement les infos.
      }),
    alertNotification: () => 
      new Notification('Notification', {
        body: 'Lorem Ipsum Dolor Sit Amet'
      }),
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




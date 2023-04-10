// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const sudo = require('sudo-js');

const os = require('node:os');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const fs = require('fs');

sudo.setPassword("test");
let passwordValid = false;


const command = async (cmd) => {
  const nameOutput = await exec(cmd)
  return nameOutput.stdout.toString()
};

async function sudo_command(cmd){
  console.log("sudo command : " + cmd)
  return new Promise((resolve) => {
    sudo.exec(cmd, (err, pid, result) => {
      console.log("result : " + result);
      console.log("err : " + err);
      console.log("pid : " + pid);
      resolve(result); // resolve the Promise with the value
    });
  });
};

async function fileWrite(file, data) {
  try {
    console.log("fileWrite : " + file)
    console.log("data : " + data)
      return new Promise((resolve) => {
        fs.writeFile(file, data, (err) => {
          if (err) {
            console.log("error : " + err)
            resolve(false);
          } else {
            console.log("fileWrite : " + file + " success")
            resolve(true);
          }
        });
      });
  } catch (err) {
    console.log("error : " + err)
  }
}

async function checkPassword() {
  return new Promise((resolve) => {
    sudo.check((value) => {
      console.log("passwd : " + value);
      resolve(value); // resolve the Promise with the value
    });
  });
}



// Create the native browser window.
function createWindow() {



  // Main process
ipcMain.on('get-system-static-info', async event => {
 
  event.reply("system-info", {
    platform: process.platform,
    version: process.version,
    // minCpuSpeed: command("lscpu | grep MHz | grep min").toString(),
    // maxCpuSpeed: command("lscpu | grep MHz | grep max").toString(),
  })

  event.reply("min-cpu-speed", await command("lscpu | grep MHz | grep min | tr -cd '[[:digit:]]'")) 

  event.reply("max-cpu-Speed", await command("lscpu | grep MHz | grep max | tr -cd '[[:digit:]]'"))

  event.reply("cpu-threads-count", await command("grep -c ^processor /proc/cpuinfo"))
  
  event.reply("cpu-core-count", await command("grep '^core id' /proc/cpuinfo |sort -u|wc -l"))
})

ipcMain.on('get-system-dynamic-info', async event => {

  event.reply("cpu-speed", await command("lscpu -p=MHZ")) 
    
  event.reply("cpu-voltage", await command("sensors | grep in0: | awk '{print $2}'"))

  event.reply("cpu-amperage", await command("sensors | grep curr1 | awk '{print $2}'"))

  event.reply("cpu-temp", await command("sensors | grep Tctl | awk '{print $2}'"))
    
})

ipcMain.on('run-stress-test', async event => {
  await command("stress-ng --cpu 16")
})

ipcMain.on('stop-stress-test', async event => {
  await command("killall stress-ng")
})

ipcMain.on("check-password", async event => {
  event.reply("password-test", await checkPassword())
})

ipcMain.on("set-password", async (event, arg) =>
{
  process.env.PASSWORD = arg
  sudo.setPassword(process.env.PASSWORD);
})

ipcMain.on("install-package", async (event) => {
  console.log("install-package")
  event.reply("install-script", await sudo_command("public/packages-install.sh"))
})


ipcMain.on('over-clocking-info', async event => {
  event.reply("min-current-cpu-speed", await command("cpupower frequency-info | grep 'current policy' | grep -Eo '[+-]?([0-9]*[.])?[0-9]+' | sed -n '1p'"))
  event.reply("max-current-cpu-speed", await command("cpupower frequency-info | grep 'current policy' | grep -Eo '[+-]?([0-9]*[.])?[0-9]+' | sed -n '2p'"))
  event.reply("get-turbo-boost", await command("cat /sys/devices/system/cpu/cpufreq/boost"))
})

ipcMain.on('start-cpu-boost', async event => {
  // await fileWrite("./data/boost", '1')
  await command("echo '1' | sudo -S tee /sys/devices/system/cpu/cpufreq/boost")
  event.reply("start-turbo-boost-output", await command("cat /sys/devices/system/cpu/cpufreq/boost"))
})

ipcMain.on('stop-cpu-boost', async event => {
  // await fileWrite("./data/boost", '0')
  await command("echo '0' | sudo -S tee /sys/devices/system/cpu/cpufreq/boost")
  event.reply("stop-turbo-boost-output", await command("cat /sys/devices/system/cpu/cpufreq/boost"))
}) 
ipcMain.on('test-cpu-boost', async event => {
  event.reply("test-turbo-boost-output", await command("cat /sys/devices/system/cpu/cpufreq/boost"))
}) 

ipcMain.on('set-max-cpu-speed', async (event, arg)  => {
  console.log("set-max-cpu-speed : " + arg *1000)
  await command("echo " + arg * 1000 + " | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_max_freq")
})

ipcMain.on('set-min-cpu-speed', async (event, arg)  => {
  console.log("set-min-cpu-speed")
  await command("sudo -S cpupower frequency-set -d " + arg + "MHz")
})






  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

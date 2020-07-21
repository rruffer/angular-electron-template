const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let win;

function isDev() {
  return process.mainModule.filename.indexOf('app.asar') === 1;
}

function createWindows() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff'//,
    // icon: path.join(__dirname, '../dist/assets/logo.png')
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file',
    slashes: true
  }));

  if (isDev()) {
    win.webContents.openDevTools()
  }

  win.on('close', function () {
    win = null;
  })

}



app.on('ready', createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindows();
  }
})


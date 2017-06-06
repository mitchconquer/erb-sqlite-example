/* eslint global-require: 1, flowtype-errors/show-errors: 0 */
// @flow
const path = require('path');
import { app, BrowserWindow } from 'electron';
import MenuBuilder from './menu';
const ffmpegPath = require('ffmpeg-static').path;
const ffprobePath = require('ffprobe-static').path;
console.log({ffmpegPath, ffprobePath})

process.env.FFMPEG_PATH = ffmpegPath;
process.env.FFPROBE_PATH = ffprobePath;

console.log('********')
console.log({FFMPEG_PATH: process.env.FFMPEG_PATH, FFPROBE_PATH: process.env.FFPROBE_PATH})

let mainWindow = null;

global.globalObj = {
  desktopDir: app.getPath('desktop')
};

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  // $FlowIssue: No type definitions for 'module' yet
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      devTools: true
    }
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

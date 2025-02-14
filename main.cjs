const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // 🚀 Load Vite dev server in development, or built files in production
  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL('http://localhost:5173'); // Vite's default dev server
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html')); // Load built files
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

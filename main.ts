import { app, screen, BrowserWindow, globalShortcut, webFrame } from 'electron'
import { resolve } from 'path'
let win = null

app.dock.hide()

const create = () => {
  const { workAreaSize } = screen.getPrimaryDisplay()

  win = new BrowserWindow({
    width: workAreaSize.width,
    height: 244,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    show: false,
    x: 0,
    y: 0,
    transparent: true,
    webPreferences: {
      webSecurity: false
    }
  })

  const index = resolve('./index.html')
  win.loadFile(index)

  win.on('blur', () => {
    win.hide()
  })
}

app.whenReady().then(() => {
  create()

  globalShortcut.register('CommandOrControl+Shift+1', () => {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })
})

import {
  app,
  screen,
  BrowserWindow,
  globalShortcut,
  clipboard,
  ipcMain
} from 'electron'
import { resolve } from 'path'
import { reverse } from './src/utils'

const debug = process.env.NODE_ENV === 'development'
const verbose = (...args) => debug && console.log(...args)

const createWindow = () => {
  const { workAreaSize } = screen.getPrimaryDisplay()

  const win = new BrowserWindow({
    width: workAreaSize.width,
    height: 244,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    show: debug ? true : false,
    x: 0,
    y: 0,
    transparent: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  const index = resolve('./index.html')
  win.loadFile(index)

  win.on('blur', () => {
    win.hide()
  })

  return win
}

const initializeClipboard = win => {
  verbose('event: initializeClipboard')
  const last = {
    text: clipboard.readText()
  }
  const stack = [] // TODO: replace with a FIFO and make max element configurable

  ipcMain.on('copy', (event, index) => {
    verbose('event: copy')
    const entry = reverse(stack)[index]
    if (entry) {
      last.text = entry.value
      clipboard.writeText(entry.value)

      app.hide()
    }
  })

  setInterval(() => {
    const value = clipboard.readText()
    if (value !== last.text) {
      verbose('info', 'last value', last)
      last.text = value

      const entry = {
        value,
        metadata: {
          type: 'text',
          copiedAt: new Date()
        }
      }

      stack.push(entry)

      win.webContents.send('update', reverse(stack))
    }
  }, 1000)
}

app.whenReady().then(() => {
  const win = createWindow()
  initializeClipboard(win)

  //TODO: Make shortcut configurable
  globalShortcut.register('CommandOrControl+Shift+1', () => {
    verbose('event: register globalShortcut')
    if (win.isVisible()) {
      app.hide() // Hide the app not the window, to restore previous window focus
    } else {
      win.show()
    }
  })
})

app.dock.hide()
app.once('window-all-closed', () => {
  app.quit()
})

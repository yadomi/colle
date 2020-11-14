import {
  app,
  screen,
  BrowserWindow,
  globalShortcut,
  clipboard,
  ipcMain,
  Menu,
  Tray,
} from "electron";
import { resolve } from "path";
import { format } from "url";

const CircularBuffer = require("circular-buffer");
const Store = require("electron-store");

const Config = new Store({
  defaults: {
    shortcut: "Super+Shift+1",
    capacity: 50,
  },
});

const debug = process.env.NODE_ENV === "development";
const verbose = (...args) => debug && console.log(...args);

const createWindow = () => {
  const { workAreaSize } = screen.getPrimaryDisplay();

  const win = new BrowserWindow({
    width: workAreaSize.width,
    height: 244,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    skipTaskbar: true,
    frame: false,
    show: debug ? true : false,
    hasShadow: false,
    x: 0,
    y: 0,
    transparent: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });

  win.setVisibleOnAllWorkspaces(true);
  win.setAlwaysOnTop(true, "pop-up-menu");

  const index = format({
    pathname: resolve(__dirname, "../public/index.html"),
    protocol: "file:",
    slashes: true,
  });
  win.loadURL(index);

  if (!debug) {
    win.on("blur", () => {
      win.hide();
    });
  }

  return win;
};

const initializeClipboard = (win) => {
  verbose("event: initializeClipboard");
  const last = {
    text: clipboard.readText(),
  };

  const stack = new CircularBuffer(Config.get("capacity"));

  ipcMain.on("copy", (event, index) => {
    const entry = stack.get(index);
    verbose("event: copy", entry.value);
    if (entry) {
      last.text = entry.value;
      clipboard.writeText(entry.value);

      win.minimize();
    }
  });

  setInterval(() => {
    const value = clipboard.readText();
    if (value !== last.text) {
      verbose("info:", "last value", last);
      last.text = value;

      const entry = {
        value,
        metadata: {
          type: "text",
          copiedAt: new Date(),
        },
      };

      stack.enq(entry);

      win.webContents.send("update", stack.toarray());
    }
  }, 1000);
};

const initializeTray = ({ config }) => {
  const tray = new Tray(resolve(__dirname, "../public/icon_tray.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Settings",
      click: () => config.openInEditor(),
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => app.quit(),
    },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
  const win = createWindow();
  initializeTray({ config: Config });
  initializeClipboard(win);

  globalShortcut.register(Config.get("shortcut"), () => {
    verbose("event: register globalShortcut");
    if (win.isVisible()) {
      // This hide the app not the window, to restore previous window focus
      // app.hide();

      win.minimize();
    } else {
      win.show();
    }
  });
});

if (process.platform === "darwin") {
  app.dock.hide();
}

app.once("window-all-closed", () => {
  app.quit();
});

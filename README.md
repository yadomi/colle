# Colle

[<img src="https://i.imgur.com/c3qVdiC.png">](https://i.imgur.com/xskIC9c.mp4)

## Motivation

Paste 2 is a very powerfull tool, it's a very efficient as a clipboard manager tool. However beside the fact it wasn't cheap at first (about 20€) it is now a subscription based pricing, which is ridiculus. Colle is a Paste 2 inspirated application, based on Electron.

### Roadmap

- [ ] Find a better alternative to clipboard polling
- [ ] Move CSS to CSS Module
- [ ] Add more clipboard type (image, rtf, html ect...)
- [x] Add configurable settings
- [ ] Reduce footprint
- [ ] Add clipboard persistance
- [x] Bundle as dmg/executable
- [x] Add tray icon to exit the application
- [ ] Create a cool application icon
- [ ] Improve performance ?

### FAQ

- **Q: Why the name ?**
  - A: Colle is the french word for paste.

- **Q: What's in on top and not at the bottom like Paste ?**
  - A: For some reason I can't get to place the window on top of the Dock with Electron.


## How to run locally ? 

1. Install the dependancies:

```
yarn install
```

2. Build and watch the main process in one terminal

```
yarn build:electron --watch
```

3. Build and watch the renderer in another terminal

```
yarn build:bundle --watch
```

4. Finally, run the application (in another terminal, yes)

```
NODE_ENV=development yarn start
```

Note: any changes to the main process needs to restart the application. Changes made to the rendered can be reloaded with a simple page reload (Cmd+R in dev tools)

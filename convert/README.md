# Video Converter

### Getting started

`npm install --legacy-peer-deps`

Start dev server:

`npm start`

In a new terminal window:

`npm run electron`

## App Architecture

![arquitetura](./Assets/convert_architecture.png)

### React Side of Force

![componentes](./Assets/react_components.png)

Drag and dDrop possível via `ReactDropzone`

### Electron

![electron side](./Assets/electron_side.png)

### Algorithm

![algoritmo](./Assets/algoritmo.png)


### Handling Async Bulk Operations with Promises

![async](./Assets/async_01.png)

A coisa aperta quando temos vários asycn em paralelo.

![async](./Assets/async_02.png)

Usar o Promise.all, que é chamadod quando todas as tasks terminam.

![Promise.all](./Assets/promise_all.png)

## Instalação do fluent-ffmeg

```bash
npm install --save fluent-ffmpeg
```

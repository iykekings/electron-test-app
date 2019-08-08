const { ipcRenderer } = require('electron');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(args);
});
const [username, password] = [process.env.username, process.env.password];
document.getElementById('username').innerHTML = `User: <b>${username}</b>`;
document.getElementById('password').innerHTML = `Password: <b>${password}</b>`;
ipcRenderer.send('asynchronous-message', 'ping');

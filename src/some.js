const { ipcRenderer } = require('electron');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg);
});
const [username, password] = [process.env.username, process.env.password];
document.getElementById('username').innerHTML = `User: <b>${username}</b>`;
document.getElementById('password').innerHTML = `Password: <b>${password}</b>`;
ipcRenderer.send('asynchronous-message', 'ping');

// const password = ipcRenderer.sendSync('get-password', user);
// ipcRenderer.sendSync('set-password', user, pass);

const form = document.getElementById('form');
const inputFn = document.getElementById('in-fn');
const inputLn = document.getElementById('in-ln');
const firstName = document.getElementById('d-fn');
const lastName = document.getElementById('d-ln');
const err = document.getElementById('error');
const getBtn = document.getElementById('get-btn');
const inFirstName = document.getElementById('gt-fn');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (inputFn.value && inputLn.value) {
    err.textContent = '';
    ipcRenderer.sendSync('set-name', inputFn.value, inputLn.value);
  } else {
    err.textContent = 'Input Fields cannot be empty';
  }
});

getBtn.addEventListener('click', () => {
  if (inFirstName.value) {
    err.textContent = '';
    const lastN = ipcRenderer.sendSync('get-name', inFirstName.value);
    firstName.textContent = inFirstName.value;
    lastName.textContent = lastN;
  } else {
    err.textContent = 'wrong first name';
  }
});

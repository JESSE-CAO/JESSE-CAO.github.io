const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// 创建WebSocket连接
const socket = new WebSocket('wss://your-websocket-server-url');

socket.onopen = function(event) {
  console.log('WebSocket连接已建立');
};

socket.onmessage = function(event) {
  const message = document.createElement('div');
  message.classList.add('message');
  message.textContent = event.data;
  chat.appendChild(message);
};

socket.onclose = function(event) {
  console.log('WebSocket连接已关闭');
};

sendButton.addEventListener('click', function() {
  const messageText = messageInput.value.trim();
  if (messageText !== '') {
    socket.send(messageText);
    messageInput.value = '';
  }
});

messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

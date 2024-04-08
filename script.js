const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// 创建WebSocket连接到公共测试服务器
const socket = new WebSocket('wss://echo.websocket.org');

socket.onopen = function(event) {
  console.log('WebSocket连接已建立');
};

socket.onmessage = function(event) {
  // 创建一个新的消息元素
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = event.data;

  // 将消息元素添加到聊天窗口中
  chat.appendChild(messageElement);

  // 自动滚动到底部以显示最新消息
  chat.scrollTop = chat.scrollHeight;
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

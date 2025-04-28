class ChatWidget extends HTMLElement {
  private container!: HTMLDivElement;
  private isOpen = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  toggleChat = () => {
    this.isOpen = !this.isOpen;
    this.render();
  };

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-family: sans-serif;
          z-index: 9999;
        }
        .chat-button {
          background-color: #4F46E5;
          color: white;
          padding: 12px 20px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          font-size: 16px;
        }
        .chat-window {
          width: 320px;
          height: 400px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .chat-header {
          background-color: #4F46E5;
          color: white;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-messages {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          font-size: 14px;
        }
        .chat-input {
          display: flex;
          border-top: 1px solid #eee;
          padding: 10px;
        }
        .chat-input input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
        }
        .chat-input button {
          background-color: #4F46E5;
          color: white;
          border: none;
          padding: 8px 12px;
          margin-left: 8px;
          border-radius: 6px;
          cursor: pointer;
        }
        .message {
          margin-bottom: 8px;
        }
        .message.bot {
          color: #555;
        }
        .message.user {
          text-align: right;
          color: #000;
        }
      </style>

      ${
        this.isOpen
          ? `
          <div class="chat-window">
            <div class="chat-header">
              Chat
              <button style="background:none;border:none;color:white;font-size:20px;cursor:pointer;" id="close-btn">&times;</button>
            </div>
            <div class="chat-messages" id="messages">
              <div class="message bot">👋 Hello! How can we help?</div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Type your message..." id="chat-input">
              <button id="send-btn">Send</button>
            </div>
          </div>
        `
          : `
          <button class="chat-button" id="open-btn">Start Chat</button>
        `
      }
    `;

    // Attach event listeners
    setTimeout(() => {
      const openBtn = this.shadowRoot?.getElementById("open-btn");
      const closeBtn = this.shadowRoot?.getElementById("close-btn");
      const sendBtn = this.shadowRoot?.getElementById("send-btn");
      const inputBox = this.shadowRoot?.getElementById(
        "chat-input"
      ) as HTMLInputElement;

      if (openBtn) openBtn.addEventListener("click", this.toggleChat);
      if (closeBtn) closeBtn.addEventListener("click", this.toggleChat);
      if (sendBtn) sendBtn.addEventListener("click", this.sendMessage);
      if (inputBox)
        inputBox.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.sendMessage();
          }
        });
    }, 0);
  }

  sendMessage = () => {
    const input = this.shadowRoot?.getElementById(
      "chat-input"
    ) as HTMLInputElement;
    const messages = this.shadowRoot?.getElementById("messages");

    if (input && messages && input.value.trim()) {
      const userMsg = document.createElement("div");
      userMsg.className = "message user";
      userMsg.textContent = `🙋 ${input.value}`;
      messages.appendChild(userMsg);

      const userText = input.value; // Save user's text if needed
      input.value = "";
      messages.scrollTop = messages.scrollHeight;

      // Fake bot reply after short delay
      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "message bot";
        botMsg.textContent = `🤖 Thanks for your message: "${userText}"`;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 800); // 800ms delay
    }
  };
}

customElements.define("chat-widget", ChatWidget);

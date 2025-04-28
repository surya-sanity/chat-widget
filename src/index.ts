class ChatWidget extends HTMLElement {
  private shadow: ShadowRoot;
  private messagesContainer!: HTMLDivElement;
  private inputField!: HTMLInputElement;
  private agentId: string = "";

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.agentId = this.getAttribute("agent-id") || "default-agent";
    this.render();
    this.setupEventListeners();
  }

  private render() {
    this.shadow.innerHTML = `
      <style>
        .chat-widget {
          width: 300px;
          height: 400px;
          display: flex;
          flex-direction: column;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          font-family: sans-serif;
          background: #fff;
          position: fixed;
          bottom: 20px;
          right: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .messages {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          font-size: 14px;
        }
        .input-area {
          display: flex;
          border-top: 1px solid #eee;
        }
        .input-area input {
          flex: 1;
          border: none;
          padding: 10px;
          font-size: 14px;
          outline: none;
        }
        .input-area button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0 15px;
          cursor: pointer;
        }
      </style>
      <div class="chat-widget">
        <div id="messages" class="messages"></div>
        <div class="input-area">
          <input type="text" id="userInput" placeholder="Type a message..."/>
          <button id="sendButton">Send</button>
        </div>
      </div>
    `;
    this.messagesContainer = this.shadow.getElementById(
      "messages"
    ) as HTMLDivElement;
    this.inputField = this.shadow.getElementById(
      "userInput"
    ) as HTMLInputElement;
  }

  private setupEventListeners() {
    const sendButton = this.shadow.getElementById(
      "sendButton"
    ) as HTMLButtonElement;
    sendButton.addEventListener("click", () => this.handleSendMessage());
    this.inputField.addEventListener("keypress", (event: KeyboardEvent) => {
      if (event.key === "Enter") this.handleSendMessage();
    });
  }

  private async handleSendMessage() {
    const text = this.inputField.value.trim();
    if (!text) return;

    this.addMessage("You", text);
    this.inputField.value = "";

    // Fake backend response
    const response = await this.fakeBackendResponse(text);
    this.addMessage("Bot", response);
  }

  private addMessage(sender: string, text: string) {
    const message = document.createElement("div");
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    this.messagesContainer.appendChild(message);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private async fakeBackendResponse(text: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 500)); // Simulate delay
    return `Echo: ${text}`;
  }
}

customElements.define("chat-widget", ChatWidget);

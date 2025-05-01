import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial bot message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "Hello! I'm SleekLegal's virtual assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple bot responses based on keywords
  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("consultation") || lowerCaseMessage.includes("appointment")) {
      return "I'd be happy to help you schedule a consultation. You can book directly through our online calendar at the Contact page, or I can collect your information and have someone call you back. Would you like to provide your contact details?";
    } else if (lowerCaseMessage.includes("divorce") || lowerCaseMessage.includes("family")) {
      return "Our family law team specializes in divorce proceedings, child custody, and other family matters. Jessica Rodriguez leads this practice area. Would you like me to connect you with her team?";
    } else if (lowerCaseMessage.includes("injury") || lowerCaseMessage.includes("accident")) {
      return "I'm sorry to hear about your injury. Our personal injury team can help evaluate your case. Could you briefly describe what happened, and we'll have an attorney contact you?";
    } else if (lowerCaseMessage.includes("business") || lowerCaseMessage.includes("corporate")) {
      return "Our corporate legal team, led by Sarah Johnson, helps businesses with formations, contracts, mergers, and more. What specific aspect of business law do you need assistance with?";
    } else if (lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("fee") || lowerCaseMessage.includes("price")) {
      return "Our fees vary depending on the type and complexity of your case. We offer free initial consultations where we can discuss your situation and provide a fee estimate. Would you like to schedule a consultation?";
    } else if (lowerCaseMessage.includes("location") || lowerCaseMessage.includes("address") || lowerCaseMessage.includes("office")) {
      return "Our main office is located at 123 Legal Avenue, Suite 500, in downtown. We also offer virtual consultations if that's more convenient for you. Would you prefer to visit us in person or meet virtually?";
    } else if (lowerCaseMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with today?";
    } else if (lowerCaseMessage.includes("bye") || lowerCaseMessage.includes("goodbye")) {
      return "Thank you for chatting with us. If you have more questions later, feel free to return. Have a great day!";
    } else {
      return "Thank you for your message. To better assist you, could you provide more details about your legal needs? Alternatively, you can schedule a consultation through our Contact page or call us at (555) 123-4567.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        className={`fixed right-6 bottom-20 bg-law-gold text-white p-4 rounded-full shadow-lg hover:bg-law-charcoal transition-all duration-300 z-50`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed right-6 bottom-28 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="bg-law-charcoal text-white p-4 rounded-t-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold">SleekLegal Assistant</h3>
            <p className="text-xs opacity-75">We typically reply in a few minutes</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat messages */}
        <div className="p-4 h-80 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-law-gold text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center text-gray-500 text-sm">
              <div className="typing-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="ml-2">SleekLegal is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-law-gold"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-law-gold hover:bg-law-charcoal rounded-l-none"
              disabled={message.trim() === ""}
            >
              <Send size={18} />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is an AI assistant. For urgent matters, please call (555) 123-4567.
          </p>
        </div>
      </div>

      {/* Add CSS for typing animation */}
      <style>
        {`
        .typing-animation {
          display: inline-flex;
          align-items: center;
        }
        .typing-animation span {
          height: 8px;
          width: 8px;
          margin: 0 1px;
          background-color: #9CA3AF;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-animation span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-animation span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-animation span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        `}
      </style>
    </>
  );
};

export default ChatWidget;

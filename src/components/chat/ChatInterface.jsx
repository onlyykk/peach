import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Well hello there, sugar! ✨ I've been waiting for you. Ready to get your finances looking prettier than a fresh apple pie?",
    sender: 'peach',
    mood: 'happy',
    timestamp: new Date(),
  },
]

// Simulated Peach responses
const PEACH_RESPONSES = {
  greeting: [
    "Why hello, dearie! What's on your mind today? 💕",
    "Well aren't you a sight for sore eyes! What can I help you with?",
  ],
  spending: [
    "*adjusts apron* Another purchase? Let me jot that down in the ledger...",
    "Oh my! *fans self* That's quite the splurge, isn't it? But I won't judge... much. 😏",
    "*clutches pearls* Goodness gracious! Well, at least you're being honest about it.",
  ],
  positive: [
    "Now THAT'S what I like to hear! You're doing wonderfully, dear! 🌟",
    "*beams with pride* Oh, you're making this old gal so happy! Keep it up!",
    "A penny saved is a penny earned, and you're earning my approval! ✨",
  ],
  default: [
    "Mmhmm, I hear you, dear. Now, shall we take a peek at those numbers?",
    "*taps pencil thoughtfully* Interesting... tell me more!",
    "Well now, isn't that something! Let me think on that for a moment.",
  ],
}

function getRandomResponse(type) {
  const responses = PEACH_RESPONSES[type] || PEACH_RESPONSES.default
  return responses[Math.floor(Math.random() * responses.length)]
}

function getMoodFromText(text) {
  const lower = text.toLowerCase()
  if (lower.includes('spent') || lower.includes('bought') || lower.includes('$')) {
    return Math.random() > 0.5 ? 'anguished' : 'neutral'
  }
  if (lower.includes('saved') || lower.includes('budget') || lower.includes('good')) {
    return 'happy'
  }
  return 'neutral'
}

const ChatInterface = ({ mood, setMood }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputText.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Determine mood based on message
    const newMood = getMoodFromText(inputText)
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    setMood(newMood)

    // Get response type
    let responseType = 'default'
    const lower = inputText.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      responseType = 'greeting'
    } else if (lower.includes('spent') || lower.includes('bought')) {
      responseType = 'spending'
    } else if (lower.includes('saved') || lower.includes('good')) {
      responseType = 'positive'
    }

    const peachMessage = {
      id: Date.now() + 1,
      text: getRandomResponse(responseType),
      sender: 'peach',
      mood: newMood,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, peachMessage])
    setIsTyping(false)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pt-20 pb-4">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isLatest={index === messages.length - 1}
            />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="glass-dark rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-[#FFCCB3]/30">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-[#D4847C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#D4847C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#D4847C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="px-2 pb-2">
        <form onSubmit={handleSendMessage}>
          <div className="glass rounded-2xl shadow-lg border border-white/50 p-2 flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Talk to Peach..."
              disabled={isTyping}
              className="flex-1 bg-white/50 border-0 rounded-xl px-4 py-3 
                focus:outline-none focus:ring-2 focus:ring-[#FFCCB3] 
                text-charcoal placeholder:text-charcoal/40 
                font-medium text-sm
                disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="btn-vintage bg-[#FFCCB3] hover:bg-[#E8A88A] text-charcoal 
                p-3 rounded-xl
                disabled:opacity-40 disabled:cursor-not-allowed 
                disabled:hover:bg-[#FFCCB3] disabled:transform-none
                transition-all duration-200"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function MessageBubble({ message, isLatest }) {
  const isUser = message.sender === 'user'
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${isLatest ? 'animate-fade-in-up' : ''}`}
    >
      <div
        className={`
          max-w-[85%] px-4 py-3 shadow-md
          ${isUser 
            ? 'bg-gradient-to-br from-[#FFCCB3] to-[#E8A88A] text-charcoal rounded-2xl rounded-br-sm' 
            : 'glass-dark rounded-2xl rounded-bl-sm border border-[#FFCCB3]/30'
          }
        `}
      >
        <p className="text-sm leading-relaxed font-medium">{message.text}</p>
        <p className={`text-[10px] mt-1.5 ${isUser ? 'text-charcoal/50' : 'text-charcoal/40'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

export default ChatInterface

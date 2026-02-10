import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

const peachImages = {
  happy: '/assets/happy_final.png',
  neutral: '/assets/neutral_final.png',
  anguished: '/assets/anguished_final.png',
}

const THOUGHT_BUBBLES = {
  happy: ['Wonderful news!\nUnder budget!', 'Simply delightful!', 'A penny saved!'],
  neutral: ['Let me think...', 'Hmm, interesting...', 'Calculating...'],
  anguished: ['Oh my stars!', 'Heavens to Betsy!', 'Oh dear, oh dear!'],
}

const MainView = ({ mood, setMood }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good morning! You spent $45.00 yesterday on Groceries. That makes me simply delighted!",
      sender: 'peach',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [thoughtBubble, setThoughtBubble] = useState(THOUGHT_BUBBLES.happy[0])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setThoughtBubble(THOUGHT_BUBBLES[mood][Math.floor(Math.random() * THOUGHT_BUBBLES[mood].length)])
  }, [mood])

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

    // Determine mood
    const lower = inputText.toLowerCase()
    let newMood = 'neutral'
    if (lower.includes('spent') || lower.includes('bought') || lower.includes('$')) {
      newMood = Math.random() > 0.5 ? 'anguished' : 'neutral'
    } else if (lower.includes('saved') || lower.includes('budget') || lower.includes('good')) {
      newMood = 'happy'
    }

    await new Promise(resolve => setTimeout(resolve, 1200))
    
    setMood(newMood)

    const responses = {
      happy: "Now THAT'S what I like to hear! You're doing wonderfully, dear! 🌟",
      neutral: "Mmhmm, I hear you, dear. Let me jot that down in the ledger...",
      anguished: "*clutches pearls* Oh my! Well, let's not make a habit of it, hmm?",
    }

    const peachMessage = {
      id: Date.now() + 1,
      text: responses[newMood],
      sender: 'peach',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, peachMessage])
    setIsTyping(false)
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Character Area with Thought Bubble */}
      <div className="relative flex justify-center pt-4 pb-2 z-10">
        {/* Thought Bubble */}
        <div className="absolute top-2 right-8 z-20">
          <div className="relative bg-white rounded-3xl px-5 py-3 shadow-lg border-2 border-gray-200">
            <p className="font-hand text-lg text-charcoal text-center whitespace-pre-line leading-tight">
              {thoughtBubble}
            </p>
            {/* Bubble tail */}
            <div className="absolute -bottom-3 left-8">
              <div className="w-4 h-4 bg-white border-b-2 border-r-2 border-gray-200 transform rotate-45" />
            </div>
            {/* Small bubbles */}
            <div className="absolute -bottom-6 left-6 w-3 h-3 bg-white rounded-full border-2 border-gray-200" />
            <div className="absolute -bottom-8 left-4 w-2 h-2 bg-white rounded-full border border-gray-200" />
          </div>
        </div>

        {/* Peach Character */}
        <img
          src={peachImages[mood]}
          alt="Peach"
          className="w-56 h-56 object-contain drop-shadow-xl animate-float"
        />
      </div>

      {/* Chat Card */}
      <div className="flex-1 mx-4 mb-4 flex flex-col min-h-0">
        <div className="flex-1 glass rounded-3xl shadow-xl border border-white/60 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] px-4 py-3 rounded-2xl
                  ${msg.sender === 'user' 
                    ? 'bg-[#FFEEE6] text-charcoal rounded-br-sm' 
                    : 'bg-white/80 text-charcoal rounded-bl-sm shadow-sm'
                  }
                `}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#E8825C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#E8825C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#E8825C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Peach..."
                disabled={isTyping}
                className="flex-1 bg-transparent border-0 px-2 py-2 
                  focus:outline-none text-charcoal placeholder:text-charcoal/40 
                  text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-[#E8825C] hover:bg-[#D4714D] text-white 
                  w-10 h-10 rounded-full flex items-center justify-center
                  disabled:opacity-40 disabled:cursor-not-allowed 
                  transition-all duration-200 shadow-md"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainView

import { useState, useEffect } from 'react'
import MainView from './components/views/MainView'
import LogView from './components/views/LogView'
import PlannerView from './components/views/PlannerView'
import OnboardingView from './components/views/OnboardingView'
import { Bell, Clock, MessageSquare, Grid3X3 } from 'lucide-react'

const backgroundImg = '/assets/background.png'

function App() {
  const [activeTab, setActiveTab] = useState('main')
  const [mood, setMood] = useState('happy')
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('peach_onboarded')
  })

  const handleOnboardingComplete = () => {
    localStorage.setItem('peach_onboarded', 'true')
    setShowOnboarding(false)
  }

  // Show onboarding screen
  if (showOnboarding) {
    return (
      <div 
        className="h-full w-full"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <OnboardingView onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <div 
      className="h-full w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main App Container - Phone frame */}
      <div className="relative w-full max-w-[430px] h-full max-h-[932px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="relative z-20 bg-[#F5C4A1] px-6 py-4 flex items-center justify-between">
          <div className="w-8" /> {/* Spacer */}
          <h1 className="font-hand text-3xl text-charcoal">Peach</h1>
          <button className="w-8 h-8 flex items-center justify-center text-charcoal/70 hover:text-charcoal transition-colors">
            <Bell size={22} />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 relative overflow-hidden">
          {activeTab === 'main' && <MainView mood={mood} setMood={setMood} />}
          {activeTab === 'log' && <LogView />}
          {activeTab === 'planner' && <PlannerView />}
        </main>

        {/* Bottom Navigation */}
        <nav className="relative z-20 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-2 pb-4">
          <div className="flex justify-around items-end">
            <NavButton 
              active={activeTab === 'log'} 
              icon={<Clock size={24} />} 
              label="LOG"
              onClick={() => setActiveTab('log')}
            />
            <NavButton 
              active={activeTab === 'main'} 
              icon={<MessageSquare size={24} />} 
              label="MAIN"
              isCenter
              onClick={() => setActiveTab('main')}
            />
            <NavButton 
              active={activeTab === 'planner'} 
              icon={<Grid3X3 size={24} />} 
              label="PLANNER"
              onClick={() => setActiveTab('planner')}
            />
          </div>
        </nav>
      </div>
    </div>
  )
}

function NavButton({ active, icon, label, isCenter, onClick }) {
  if (isCenter) {
    return (
      <button 
        onClick={onClick}
        className={`
          flex flex-col items-center gap-1 -mt-6
        `}
      >
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all
          ${active 
            ? 'bg-[#E8825C] text-white' 
            : 'bg-white text-charcoal/50 hover:bg-gray-50'
          }
        `}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold tracking-wide ${active ? 'text-[#E8825C]' : 'text-charcoal/50'}`}>
          {label}
        </span>
      </button>
    )
  }

  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2"
    >
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center transition-all
        ${active 
          ? 'bg-[#FFEEE6] text-[#E8825C]' 
          : 'text-charcoal/40 hover:text-charcoal/60'
        }
      `}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-wide ${active ? 'text-[#E8825C]' : 'text-charcoal/40'}`}>
        {label}
      </span>
    </button>
  )
}

export default App

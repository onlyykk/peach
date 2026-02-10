import React from 'react'

const BUDGET_CATEGORIES = [
  { id: 1, name: 'Food', spent: 250, budget: 500, status: 'Under Budget' },
  { id: 2, name: 'Rent', spent: 1100, budget: 1200, status: 'Near Limit' },
  { id: 3, name: 'Fun', spent: 80, budget: 150, status: 'Under Budget' },
]

const PlannerView = () => {
  return (
    <div className="h-full flex flex-col relative">
      {/* Main Card */}
      <div className="flex-1 mx-4 my-4 flex flex-col">
        <div className="flex-1 glass rounded-3xl shadow-xl border border-white/60 overflow-hidden flex flex-col">
          
          {/* Peach in Arch */}
          <div className="relative flex justify-center pt-4">
            {/* Arch background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-64 bg-gradient-to-b from-[#FFF8F0]/80 to-transparent rounded-t-full" />
            
            {/* Character */}
            <img
              src="/assets/neutral_final.png"
              alt="Peach with clipboard"
              className="relative w-48 h-48 object-contain drop-shadow-lg z-10"
            />
          </div>

          {/* Budget Bars */}
          <div className="flex-1 px-6 pb-6 space-y-5 overflow-y-auto custom-scrollbar">
            {BUDGET_CATEGORIES.map((category) => (
              <BudgetBar key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BudgetBar({ category }) {
  const percentage = (category.spent / category.budget) * 100
  const isNearLimit = percentage >= 80
  const isOver = percentage >= 100

  return (
    <div>
      {/* Label */}
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-lg font-bold text-charcoal">{category.name}</h3>
      </div>

      {/* Progress Bar */}
      <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`
            h-full rounded-full transition-all duration-500
            ${isOver ? 'bg-red-400' : isNearLimit ? 'bg-gradient-to-r from-[#E8825C] to-red-400' : 'bg-[#7ECBA1]'}
          `}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        {/* Overflow indicator */}
        {percentage > 100 && (
          <div 
            className="absolute top-0 right-0 h-full bg-red-500/30"
            style={{ width: `${Math.min(percentage - 100, 20)}%` }}
          />
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center mt-1.5">
        <p className="text-sm text-charcoal/70 font-medium">
          ${category.spent} / ${category.budget}
        </p>
        <p className={`
          text-sm font-semibold
          ${isOver ? 'text-red-500' : isNearLimit ? 'text-[#E8825C]' : 'text-[#5CAE7E]'}
        `}>
          {isOver ? 'Over Budget!' : category.status}
        </p>
      </div>
    </div>
  )
}

export default PlannerView

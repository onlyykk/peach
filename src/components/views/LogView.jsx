import React from 'react'
import { ShoppingCart, Fuel, Coffee, Lightbulb, Plus } from 'lucide-react'

const SAMPLE_TRANSACTIONS = [
  { id: 1, date: 'FEB 4, 2026', category: 'Groceries', amount: 45.00, icon: ShoppingCart },
  { id: 2, date: 'FEB 3, 2026', category: 'Gas', amount: 30.00, icon: Fuel },
  { id: 3, date: 'FEB 2, 2026', category: 'Coffee', amount: 5.50, icon: Coffee },
  { id: 4, date: 'JAN 31, 2026', category: 'Utilities', amount: 120.00, icon: Lightbulb },
]

const LogView = () => {
  return (
    <div className="h-full flex flex-col relative">
      {/* Transaction Card */}
      <div className="flex-1 mx-4 my-4 flex flex-col">
        <div className="flex-1 glass rounded-3xl shadow-xl border border-white/60 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="pt-6 pb-4 px-6">
            <h2 className="font-hand text-3xl text-charcoal text-center">Transaction Log</h2>
          </div>

          {/* Transaction List */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
            <div className="space-y-3">
              {SAMPLE_TRANSACTIONS.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} />
              ))}
            </div>
          </div>

          {/* Peach Thumbs Up */}
          <div className="relative h-32 flex justify-end items-end pr-4 pb-2">
            <img
              src="/assets/happy_final.png"
              alt="Peach approves"
              className="w-28 h-28 object-contain drop-shadow-lg"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#E8825C] hover:bg-[#D4714D] 
        rounded-full shadow-xl flex items-center justify-center text-white
        transition-all duration-200 hover:scale-105 active:scale-95 z-20">
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  )
}

function TransactionItem({ transaction }) {
  const Icon = transaction.icon
  
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      {/* Icon */}
      <div className="w-12 h-12 bg-[#FFF8F0] rounded-full flex items-center justify-center shadow-sm">
        <Icon size={22} className="text-charcoal/70" />
      </div>

      {/* Details */}
      <div className="flex-1">
        <p className="text-xs text-charcoal/50 font-medium">{transaction.date}</p>
        <p className="text-base font-semibold text-charcoal">{transaction.category}</p>
      </div>

      {/* Amount */}
      <p className="text-xl font-bold text-charcoal">
        - ${transaction.amount.toFixed(2)}
      </p>
    </div>
  )
}

export default LogView

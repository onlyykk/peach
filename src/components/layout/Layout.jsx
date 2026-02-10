import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 font-sans text-charcoal"
            style={{ backgroundImage: "url('/assets/background.png')" }}>

            {/* Mobile-first container that looks like a physical object/recipe box */}
            <div className="w-full max-w-md bg-paper/90 backdrop-blur-sm min-h-[800px] rounded-3xl shadow-2xl overflow-hidden border-8 border-white/50 relative flex flex-col">
                {/* Header / Status Bar area */}
                <header className="bg-peach/90 p-4 text-center border-b-4 border-dotted border-white relative z-10">
                    <h1 className="font-hand text-4xl text-charcoal text-shadow-vintage transform -rotate-2 inline-block">Peach</h1>
                    <p className="text-xs font-serif italic text-charcoal/70 mt-1 tracking-widest uppercase">Your Money Coach</p>
                </header>

                <main className="flex-1 flex flex-col relative overflow-hidden">
                    {children}
                </main>

                {/* Bottom Navigation */}
                <nav className="bg-white/90 backdrop-blur-md border-t border-peach-light p-4 flex justify-around items-center z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    <button className="p-2 text-peach-dark font-bold hover:text-peach transition-colors flex flex-col items-center">
                        <span className="text-xl">💬</span>
                        <span className="text-xs font-bold uppercase tracking-wide">Chat</span>
                    </button>
                    <button className="p-2 text-charcoal/50 hover:text-peach transition-colors flex flex-col items-center">
                        <span className="text-xl">📅</span>
                        <span className="text-xs font-bold uppercase tracking-wide">Planner</span>
                    </button>
                    <button className="p-2 text-charcoal/50 hover:text-peach transition-colors flex flex-col items-center">
                        <span className="text-xl">📒</span>
                        <span className="text-xs font-bold uppercase tracking-wide">Log</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Layout;

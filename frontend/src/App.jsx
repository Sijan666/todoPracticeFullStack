import './App.css';
import { FiPlus, FiImage, FiInbox } from 'react-icons/fi';

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white flex items-center justify-center p-4 md:p-10 font-sans">
        {/* Main Glass Container */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ======================= */}
          {/* LEFT SIDE: FORM SECTION */}
          {/* ======================= */}
          <div className="md:col-span-1 bg-white/2 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-20"></div>
            <div>
              <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                New Task
              </h2>
              <p className="text-sm text-slate-400">What needs to be done today?</p>
            </div>
            <div className="space-y-5 relative z-10">
              {/* Task Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Task Title</label>
                <input 
                  type="text" 
                  placeholder="E.g., Complete UI Design..."
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 text-slate-200"
                />
              </div>
              {/* Priority Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Priority Level</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-slate-300 cursor-pointer outline-none">
                    <option className="bg-slate-800 text-white" value="high">High Priority</option>
                    <option className="bg-slate-800 text-white" value="medium">Medium Priority</option>
                    <option className="bg-slate-800 text-white" value="low">Low Priority</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    ▼
                  </div>
                </div>
              </div>
              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Attachment</label>
                <label className="flex flex-col items-center justify-center gap-3 w-full bg-black/10 border-2 border-white/5 border-dashed rounded-2xl px-4 py-10 text-sm cursor-pointer hover:bg-white/2 hover:border-indigo-500/40 transition-all group">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
                      <FiImage className="text-slate-400 group-hover:text-indigo-400 text-2xl" />
                  </div>
                  <span className="text-slate-500 font-medium group-hover:text-indigo-300 transition-colors">Click to upload image</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
              {/* Submit Button */}
              <button className="w-full bg-linear-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4">
                <FiPlus className="text-xl" /> Create Todo
              </button>
            </div>
          </div>
          {/* ======================= */}
          {/* RIGHT SIDE: TODO LIST   */}
          {/* ======================= */}
          <div className="md:col-span-2 bg-white/2 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 shadow-2xl flex flex-col h-175">
            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Your Tasks</h2>
                <p className="text-slate-400 text-sm">Here is what you have going on</p>
              </div>
              <span className="bg-indigo-500/10 text-xs px-4 py-2 rounded-full text-indigo-400 font-semibold border border-indigo-500/20 flex items-center gap-2">
                0 Active
              </span>
            </div>
            {/* Empty State Container */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50">
              <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center">
                <FiInbox className="text-5xl text-slate-400" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-300">No tasks yet</h3>
                <p className="text-sm text-slate-500 mt-1">Add a new task from the left panel to get started.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
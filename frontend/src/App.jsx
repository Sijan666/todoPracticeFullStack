import { useState } from 'react';
import './App.css';
import { FiPlus, FiImage, FiInbox, FiTrash2 } from 'react-icons/fi';

function App() {
  // ==========================
  // 1. STATE MANAGEMENT
  // ==========================
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [image, setImage] = useState(null);
  
  const [todos, setTodos] = useState([]); // টাস্কগুলো সেভ রাখার জন্য
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // Success/Error মেসেজ

  // ==========================
  // 2. FORM SUBMIT HANDLER
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if (!task || !priority || !image) {
      setMessage({ text: 'Please fill all fields and upload an image!', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    // FormData তৈরি করা
    const formData = new FormData();
    formData.append('task', task);
    formData.append('priority', priority);
    formData.append('image', image);

    try {
      // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
      const response = await fetch('http://localhost:5000/createTodo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: 'Todo created successfully! 🎉', type: 'success' });
        
        // নতুন টাস্কটি সাথে সাথে UI তে দেখানোর জন্য Local State এ অ্যাড করা
        const newTodo = {
          _id: Date.now(),
          task: task,
          priority: priority,
          // পেজ রিলোড ছাড়া ইমেজ দেখানোর জন্য Object URL তৈরি করা হলো
          path: URL.createObjectURL(image) 
        };
        
        setTodos([newTodo, ...todos]); // লিস্টের শুরুতে নতুন টাস্ক যোগ হবে

        // ফর্ম ক্লিয়ার করা
        setTask('');
        setPriority('medium');
        setImage(null);
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: 'Failed to connect to the server. Is backend running?', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // 3. HELPER FUNCTION (Color)
  // ==========================
  const getPriorityColors = (level) => {
    switch(level) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white flex items-center justify-center p-4 md:p-10 font-sans">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ======================= */}
          {/* LEFT SIDE: FORM SECTION */}
          {/* ======================= */}
          <div className="md:col-span-1 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-20"></div>

            <div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                New Task
              </h2>
              <p className="text-sm text-slate-400">What needs to be done today?</p>
            </div>

            {/* ফর্ম শুরু */}
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Task Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Task Title</label>
                <input 
                  type="text" 
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="E.g., Complete UI Design..."
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 text-slate-200"
                />
              </div>

              {/* Priority Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Priority Level</label>
                <div className="relative">
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full appearance-none bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-slate-300 cursor-pointer outline-none">
                    <option value="high" className="bg-slate-800 text-white">🔥 High Priority</option>
                    <option value="medium" className="bg-slate-800 text-white">⚡ Medium Priority</option>
                    <option value="low" className="bg-slate-800 text-white">🌱 Low Priority</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Attachment</label>
                <label className={`flex flex-col items-center justify-center gap-3 w-full bg-black/10 border-2 border-dashed rounded-2xl px-4 py-8 text-sm cursor-pointer transition-all group ${image ? 'border-indigo-500/50' : 'border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.02]'}`}>
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
                      <FiImage className={`${image ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'} text-2xl`} />
                  </div>
                  <span className="text-slate-500 font-medium group-hover:text-indigo-300 transition-colors text-center">
                    {image ? (
                      <span className="text-indigo-300">{image.name}</span>
                    ) : (
                      "Click to upload image"
                    )}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Status Message */}
              {message.text && (
                <div className={`text-sm text-center p-3 rounded-xl font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {message.text}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
                {loading ? 'Creating...' : <><FiPlus className="text-xl" /> Create Todo</>}
              </button>
            </form>
          </div>

          {/* ======================= */}
          {/* RIGHT SIDE: TODO LIST   */}
          {/* ======================= */}
          <div className="md:col-span-2 bg-white/2 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 shadow-2xl flex flex-col h-175">
            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Your Tasks</h2>
                <p className="text-slate-400 text-sm">Here is what you have going on</p>
              </div>
              <span className="bg-indigo-500/10 text-xs px-4 py-2 rounded-full text-indigo-400 font-semibold border border-indigo-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                {todos.length} Active
              </span>
            </div>

            {/* List Container */}
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4 scrollbar-hide flex-1">
              
              {/* Empty State */}
              {todos.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50 h-full">
                  <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center">
                    <FiInbox className="text-5xl text-slate-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-slate-300">No tasks yet</h3>
                    <p className="text-sm text-slate-500 mt-1">Add a new task from the left panel.</p>
                  </div>
                </div>
              )}

              {/* Dynamic Task List */}
              {todos.map((item) => (
                <div key={item._id} className="group bg-black/20 border border-white/5 hover:border-white/20 rounded-2xl p-4 md:p-5 flex gap-4 md:gap-5 items-center transition-all hover:bg-white/2">
                  <button className="h-6 w-6 rounded-full border-2 border-slate-600 hover:border-indigo-400 shrink-0 transition-colors"></button>
                  
                  {/* Image */}
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-white/10 shadow-lg">
                    {item.path ? (
                      <img 
                        src={item.path} 
                        alt="Task cover" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><FiImage className="text-slate-600" /></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-100 font-semibold text-lg truncate">{item.task}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPriorityColors(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Just now</span>
                    </div>
                  </div>
                  
                  {/* Delete Button (No logic yet) */}
                  <button className="h-10 w-10 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-all border border-transparent hover:border-red-500/30 shrink-0">
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
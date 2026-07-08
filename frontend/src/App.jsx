import { useState, useEffect } from 'react';
import './App.css';
import { FiPlus, FiImage, FiInbox, FiTrash2 } from 'react-icons/fi';

function App() {
  // 1. STATE MANAGEMENT
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [image, setImage] = useState(null);
  
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // 2. FETCH TODOS ON LOAD
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/getTodos');
      const data = await response.json();
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  // 3. FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task || !priority || !image) {
      setMessage({ text: 'Please fill all fields and upload an image!', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('task', task);
    formData.append('priority', priority);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/createTodo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: 'Todo created successfully!', type: 'success' });
        fetchTodos(); 
        setTask('');
        setPriority('medium');
        setImage(null);
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: 'Failed to connect to the server.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // 4. HELPER FUNCTIONS
  const getPriorityColors = (level) => {
    switch(level) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    const normalizedPath = path.replace(/\\/g, '/');
    return `http://localhost:5000/${normalizedPath}`;
  };

  // 5. DELETE TASK HANDLER
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteTask/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();

      if (data.success) {
        fetchTodos();
        setMessage({ text: 'Task deleted successfully!', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to delete task', type: 'error' });
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
      setMessage({ text: 'Failed to connect to the server.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDE: FORM SECTION */}
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">New Task</h2>
            <p className="text-sm text-gray-500">Add a new item to your list.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Task Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input 
                type="text" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task name..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Priority Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 cursor-pointer"
              />
            </div>
            {/* Status Message */}
            {message.text && (
              <div className={`text-sm p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}
            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Saving...' : <><FiPlus /> Add Task</>}
            </button>
          </form>
        </div>
        {/* RIGHT SIDE: TODO LIST */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col min-h-125">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">Task List</h2>
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
              {todos.length} Items
            </span>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {/* Empty State */}
            {todos.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FiInbox className="text-4xl mb-2" />
                <p>No tasks found.</p>
              </div>
            )}
            {/* Dynamic Task List */}
            {todos.map((item) => (
              <div key={item._id} className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                {/* Image */}
                <div className="h-16 w-16 bg-white border border-gray-200 rounded overflow-hidden shrink-0 flex items-center justify-center">
                  {item.path ? (
                    <img 
                      src={getImageUrl(item.path)} 
                      alt="Task cover" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <FiImage className="text-gray-400" />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-semibold text-base mb-1">{item.task}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColors(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                {/* Delete Button */}
                <button 
                  onClick={() => deleteTask(item._id)} 
                  className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-2 rounded hover:bg-red-50"
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
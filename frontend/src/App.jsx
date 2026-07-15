import { useState ,useEffect } from "react";
import axios from 'axios';
import './app.css'

const App = () => {

    let [task, setTask] = useState('');
    let [priority, setPriority] = useState('');
    let [data, setData] = useState([])
    let [isUpdate,setisUpdate] = useState(false)
    let [id, setId] = useState('')

    let handleTask = (e) => {
        setTask(e.target.value);
    }

    let handlePriority = (e) => {
        setPriority(e.target.value);
    }

    // all task
    useEffect(()=>{
        async function todos(){
            let todosData = await axios.get('http://localhost:5000/allTodo')
            setData(todosData.data.data);
        }
        todos()
    },[])

    // delete task
    let handleDelete = async (id) => {
        let data = await axios.delete(`http://localhost:5000/deleteTask/${id}`)
        console.log(data);
        let todosData = await axios.get('http://localhost:5000/allTodo')
        setData(todosData.data.data);
    }

    // edit task
    let handleEdit = async (item) => {
        setTask(item.task)
        setPriority(item.priority)
        setisUpdate(true)
        setId(item._id)
    }

    // update task
    let handleUpdate = async (e) => {
        let form = e.target.closest('form'); 
        let formData = new FormData(form);

        let data = await axios.post(`http://localhost:5000/updateData/${id}`, formData)
        console.log(data);
        
        let todosData = await axios.get('http://localhost:5000/allTodo')
        setData(todosData.data.data);
        setTask("")
        setPriority("")
        setisUpdate(false);
        setId('');
        form.reset();
    }

    // create task
    const handleSubmit = async (e) => {
      e.preventDefault()
      let formData = new FormData(e.currentTarget);
      const task = formData.get('task')
      const priority = formData.get('priority')
      const image = formData.get('image')
      console.log(task,priority,image);
    
      let respone = await axios.post('http://localhost:5000/createTodo', formData);
        console.log(respone.data);

      let todosData = await axios.get('http://localhost:5000/allTodo')
      setData(todosData.data.data);
      setTask("")
      setPriority("")
      e.target.reset();
    }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* left side */}
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Todo
              </h2>
              <p className="text-sm text-gray-500">
                Add a new item to your list.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* task */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input name="task" value={task}
                onChange={handleTask}
                type="text" 
                placeholder="Enter task name..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <select name="priority" value={priority} onChange={handlePriority}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            {/* image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
              <input name="image"
                type="file" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 cursor-pointer"
              />
            </div>
            {/* buttons */}
            {isUpdate ?
            <button onClick={(e) => handleUpdate(e)}
              type="button"
              className="w-full cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
              Update Task
            </button>
            :
            <button 
              type="submit"
              className="w-full cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
              Add Task
            </button>
            }
          </div>
        </div>
        {/* right side */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col min-h-125">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">Task List</h2>
          </div>
          {/* tasks */}
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-3">
              {data.map((item) => (
                <li key={item.id || item._id} className="flex items-center gap-4 bg-gray-50 border border-gray-200 p-3 rounded-lg hover:bg-gray-100">
                  {/* image */}
                  <img src={`http://localhost:5000/${item.path}`} alt="" className="w-12 h-12 object-cover rounded border border-gray-300 shrink-0"/>
                  {/* task */}
                  <span className="flex-1 font-semibold text-gray-800 truncate">
                    {item.task}
                  </span>
                  {/* priority */}
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium capitalize">
                    {item.priority}
                  </span>
                  {/* Buttons */}
                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => handleEdit(item)} className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-yellow-200 cursor-pointer">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(item._id)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;
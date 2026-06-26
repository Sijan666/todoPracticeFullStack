import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {

  let [task , setTask] = useState('')
  let [priority , setPriority] = useState('')
  let [status , setStatus] = useState('')
  

  const addTask = async () => {

    let data = await axios.post('http://localhost:5000/create/todo',{
      task : task,
      priority : priority,
      status : status
    })
    console.log(data.data);
    setTask(data.data)
    
  }

  return (
    <>
      <div className="max-w-200 mx-auto text-center">
        <div className="text-center mt-10">
          <h1 className='text-[48px] font-bold'>Todo</h1>
        </div>
        <div className="grid grid-cols-4 gap-20 mt-10 w-150 mx-auto justify-center">
          <div className="">
            <input type="text" className='px-4 py-1 border border-gray-300 outline-none' placeholder='Add task here'/>
          </div>
          <div className="flex gap-2">
            <div className="">
              <select className='border border-gray-400'>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="block">Block</option>
              </select>
            </div>
            <div className="">
              <select className='border border-gray-400'>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="btn">
            <button onClick={addTask} className='py-1 px-3 bg-gray-500 text-white w-25 cursor-pointer'>Add Task</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

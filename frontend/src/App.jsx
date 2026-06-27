import { useState } from 'react'
import './App.css'

import axios from 'axios'


function App() {

  let [task,setTask] = useState('')
  let [priority,setPriority] = useState('')

  const addTask = async () => {
    let data  =  await axios.post('http://localhost:5000/create/todo' , {
      task : task,
      priority : priority
    })
    console.log(data);
  }

  const handleTask = (e)=>{
    setTask(e.target.value)
  }
  const handlePriority = (e)=>{
    setPriority(e.target.value)
  }


  return (
    <>
    <div className="max-w-300 mx-auto">
      <div className="mt-15 flex justify-center gap-5">
        <input onChange={handleTask} type="text" className='border-gray-400 border outline-none'/>
        <select onChange={handlePriority}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button onClick={addTask} className='border border-gray-400 bg-gray-500'>Add task</button>
      </div>
    </div>
    </>
  )
}

export default App

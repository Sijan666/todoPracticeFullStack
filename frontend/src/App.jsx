
import { useState } from 'react'
import axios from "axios"
import './App.css'


function App() {

  let [task , setTask] = useState("")
  let [priority , setPriority] = useState("")
  let [status , setStatus] = useState("")
 
  const addTask = async () => {
    let data = await axios.post('http://localhost:5000/create/todo',{
      task : task,
      priority : priority,
      status : status
    })
    console.log(data);



  }

  const handleTask = (e) => {
    setTask(e.target.value)
  }
  const handlePriority = (e) => {
    setPriority(e.target.value)
  }
  const handleStatus = (e) => {
    setStatus(e.target.value)
  }



  return (
    <>


    <div className="max-w-200 mx-auto">

      <h1>Todo</h1>

      <input type="text" onChange={handleTask} value={task}/>

      <select onChange={handlePriority} value={priority}>
        <option value="low">low</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
      </select>


      <select onChange={handleStatus} value={status}>
        <option value="block">block</option>
        <option value="pending">pending</option>
        <option value="active">active</option>
      </select>


      <button onClick={addTask}>Add</button>
    </div>


    </>
  )
}

export default App

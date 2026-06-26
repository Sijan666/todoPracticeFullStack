import './App.css'

function App() {


  return (
    <>
      <div className="max-w-200 mx-auto text-center">
        <div className="text-center mt-10">
          <h1 className='text-[48px] font-bold'>Todo</h1>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10 w-150 mx-auto justify-center">
          <div className="">
            <input type="text" className='px-4 py-1 border border-gray-300 outline-none' placeholder='Add task here'/>
          </div>
          <div className="">
            <select className='border border-gray-400'>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="btn">
          <button className='py-1 px-3 bg-gray-500 text-white w-25 cursor-pointer'>Add Task</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

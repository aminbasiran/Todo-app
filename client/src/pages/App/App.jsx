import { useState ,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import Card from "../../component/Card.jsx"
import "./app.scss"

function App() {

  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [error, setError] = useState(null)
  const [placeholder,setPlaceholder] = useState("Create task")
  const [token,setToken] = useState("") // CHECK HERE

  useEffect(() => {
    let current_user_token = localStorage.getItem("token")
    setToken(current_user_token)
    
    const rest = "http://localhost:3001/v1/api/tasks"
    axios.get(rest,{headers:{
        "Authorization": current_user_token
    }})
      .then(response => {
        setTasks(response.data)
      })
      .catch(err=>{
        console.error(err)
        setError("An error occured while fetching data.")
      })
  },[tasks]);

  const handleSubmit = (e)=>{
    if (title === ""){
      e.preventDefault()
      setPlaceholder("Please enter")
    }

    else{
      e.preventDefault()
      const rest = "http://localhost:3001/v1/api/tasks"
      axios.post(rest,
        {title: title},
        {headers:{
          "Authorization": `${token}`
        }})
      .then(response =>{
        setTasks([...tasks,response.data])
      })
      .catch(err=>{
        console.error(err)
        setError("An error occured while fetching data.")
      })

    setTitle("")
    setPlaceholder("Create task")
    }
  }


  const handleDelete = (id)=>{
    const rest = `http://localhost:3001/v1/api/tasks/${id}`
    axios.delete(rest)
    .then(response =>{
      const tasksAfterDeleted = tasks.filter((task)=>{
        task._id !== id
      })

      setTasks(tasksAfterDeleted)

    })
    .catch(err=>{
      console.error(err)
      setError("An error occured while fetching data.")
    })
  }

  const removeItemFromLocalStorage = () => {
    localStorage.removeItem("token");
    navigate("/signin")
  };

  return (
    <>
      <main className='main'>
        <div className='tasks'>
          <h1 className='tasks__title'>Todo App</h1>
          <div className='tasks__bar'>
            <form onSubmit={handleSubmit} >
              <input value={title} type="text" id="todo" name="todo" onChange={e=>{setTitle(e.target.value)}}  placeholder={placeholder}/>
              <input type="submit"></input>
            </form>
          </div>
          <div className='tasks__list'>
            {error ? (<div className="error-message">{error}</div>) : (tasks.map(task=> < Card key={task._id} task={task} handleDelete={handleDelete}/>))} 
          </div>
          {/* <Link to="/register">Register</Link> */}

          <br/>
          <br/>
          {/* <Link to="/signin">Sign out</Link> */}
          <button onClick={removeItemFromLocalStorage}>Sign out</button>
        </div>
      </main>
    </>
  )
}


export default App

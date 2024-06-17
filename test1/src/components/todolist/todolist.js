import { useState } from "react";
import "./todolist.css"

function Todolist(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
        console.log(newTask);
    }

    function addTask(){
        if(newTask.trim() === ""){
            alert("nu e bine")
        }
        else{
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        const updateTasks = tasks.filter((_,i) => i!=index);
        setTasks(updateTasks);
    }

    function moveTaskUp(index){
        const updatedTasks = [...tasks];
        if(index>0){
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        const updatedTasks = [...tasks];
        if(index<tasks.length-1){
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <>
        <div className="to-do-list">
            <h1>My to-do-list</h1>
            <div>
                <input type="text" placeholder="Enter task" value={newTask} onChange={handleInputChange}></input>
                <button className="add-button" onClick={addTask}>Add</button>
            </div>
            <ol>{tasks.map((task,index) => <li key={index}><span className="text">{task}</span>
            <button className="deleteButton" onClick={() => deleteTask(index)}>Delete</button>
            <button className="moveButton" onClick={() => moveTaskUp(index)}>Up</button>
            <button className="moveButton" onClick={() => moveTaskDown(index)}>Down</button>            
            </li>)}</ol>
        </div>
        </>
    )
}


export default Todolist;
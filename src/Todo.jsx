import './Todo.css'
import { useState } from 'react';
export default function Todo() {

    const [tasks, setTasks] = useState("");
    const [mode, setMode] = useState(false);


    const [todos, setTodos] = useState(() => {
        const stored = localStorage.getItem("todos");
        return stored ? JSON.parse(stored) : [];
    });

    function onChangeHandler(event) {
        let newTodo = event.target.value;
        console.log(newTodo)
        setTasks(newTodo);
    }
    function addTaskHandler(event) {
        event.preventDefault();
        if (tasks.trim() === "") {
            alert("Please enter a task");
            return;
        }
        let newTodo = [...todos, tasks];
        console.log(newTodo);
        setTodos(newTodo);
        localStorage.setItem("todos", JSON.stringify(newTodo));
        setTasks("");
    }

    function dtlHandler(index) {
        let updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    function handleMode() {
        setMode(!mode);
    }

    return (
        <>
            <div className={`container ${mode ? "dark" : "light"}`}>
                <div className="Todo">
                    <div className="top">
                        <h1 id='title'>Todo List</h1>
                        <span onClick={handleMode}>
                            {mode ? (
                                <i className="fa-solid fa-moon"></i>
                            ) : (
                                <i class="fa-solid fa-sun"></i>)}
                        </span>
                    </div>
                    <form className="header" onSubmit={addTaskHandler}>
                        <input
                            type="text"
                            placeholder="Enter task"
                            id="taskInput"
                            value={tasks}
    
                            onChange={onChangeHandler}
                        ></input>
                        <button id="addBtn" type='submit'>Add Task</button>
                    </form>
                    <div className="taskContainer">
                        <ul>
                            {todos.map((todo, index) => (
                                <li key={index} className="task">
                                    <input type="checkbox" className="check" />
                                    <span className="text">{todo}</span>
                                    <i
                                        onClick={() => dtlHandler(index)}
                                        className="fa-solid fa-trash-can"
                                    ></i>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}
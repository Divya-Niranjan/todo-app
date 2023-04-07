import React, { useState } from "react";
import uniqid from "uniqid";
import EditTodo from "./EditTodo";
import Task from "./Task";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TodoList() {
  let [todos, setTodos] = useState([]);
  let [task, setTask] = useState("");
  let [edit, setEdit] = useState(0);
  const navigate = useNavigate();


  let user=localStorage.getItem("user");
  user=JSON.parse(user);
  useEffect(() => {
    console.log(user.userId);
    const getTodos=async()=>{
      // if user not present, navigate them to signin page
      if (!user) {
        navigate("/signin");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const response = await axios.get("http://localhost:2000/api/get/"+user?.userId,config);
      setTodos([...todos, response.data]);
      console.log(todos);
    }
    getTodos();
  }, []);

  let handleAdd = async () => {
    let id = uniqid();
    let todo = {
      title: task,
      description: "Complete this Task",
      created: new Date().toLocaleDateString(),
    };
    setTodos([...todos, todo]);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.post("http://localhost:2000/api/todo/"+user.userId, todo,config);
    console.log(response.data);
    setTask("");
  };



  let handleDelete = (id) => {
    let arr = todos.filter((todo) => {
      if (todo.id == id) {
        return false;
      }
      return true;
    });
    setTodos(arr);
  };

  let handleEdit = (id, editTask) => {
    let arr = todos.map((todo) => {
      if (todo.id == id) {
        todo.task = editTask;
      }
      return todo;
    });
    setTodos(arr);
    setEdit(0);
  };
  return (
    <div className="bg-[#457b9d] drop-shadow-2xl w-[80%] lg:w-[30%] sm:w-[60%] h-[70%] mx-auto  mt-12">
      <h1 className="text-3xl text-[#fff] mx-8 pt-4">TodoList</h1>
      <hr className="mx-8 mt-2" />
      {todos?.length > 0 ? (
        todos?.map((todo) => {
          return (
            <div>
              {edit == todo.id ? (
                <EditTodo todo={todo} handleEdit={handleEdit} />
              ) : (
                <Task
                  todo={todo}
                  handleDelete={handleDelete}
                  setEdit={setEdit}
                />
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="w-[80%] mx-10 absolute bottom-4">
        <input
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className=" py-2 px-2  border-[#000] w-[65%]"
          value={task}
          required
        />
        <button onClick={handleAdd} className="bg-[#a8dadc] py-2 px-4 ">
          ADD TODO
        </button>
      </div>
    </div>
  );
}

export default TodoList;

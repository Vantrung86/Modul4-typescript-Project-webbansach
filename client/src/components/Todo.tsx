import { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import publicAxios from "../config/publicAxios";

export default function TodoList() {
  type Obj={
    id?:number
    name:string
    status?:boolean
  }
  const [flag,setFlag] = useState<boolean>(false)
  const [todo,setTodo] = useState<Obj>({
    name:""
  })
  const [todos, setTodos] = useState<Array<Obj>>([]);

  //lay tat ca todo
  const getData = async()=>{
    try {
      let response = await publicAxios.get("/api/v1/todo")
      setTodos(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
      getData()
  },[flag])

  //Lay gia tri input
  const handleChangeInput=(e:ChangeEvent<HTMLInputElement>)=>{
    setTodo({...todo,name:e.target.value})
  }
  
  //them todo
  const handleAddTodo=async()=>{
    if (todo.name) {
      try {
        let response = await publicAxios.post("/api/v1/todo",todo)
        alert(response.data.message);
        setFlag(!flag)
        setTodo({
          name:""
        })
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Xin nhập todo")
    }
  }
  
  //Xoa todo
  const handleDeleteTodo=async(id?:number)=>{
    if (confirm("Bạn có chắc chắn muốn xoá todo ?")) {
      try {
        let response = await publicAxios.delete(`/api/v1/todo/${id}`)
        alert(response.data.message);
        setFlag(!flag)
      } catch (error) {
        console.log(error);
      }
    }
  }

  //thay doi status
  const handleChangeStatus=async(event:ChangeEvent<HTMLInputElement>,id?:number)=>{
    try {
      let response = await publicAxios.put(`/api/v1/todo/${id}`,{status: event.target.checked})
      alert(response.data.message);
      setFlag(!flag)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container">
        <div className="top">
          <h2>Todo List</h2>
          <p>Get! thing done. one item at a item</p>
        </div>
        <ul>
          {todos.map((e, i) => {
            return (
              <li
                key={i}
                style={{ textDecoration: e.status ? "line-through" : ""}}
              >
                {e.name}
                <input
                  type="checkbox"
                  checked={e.status}
                  onChange={(event)=>handleChangeStatus(event,e.id)}
                />
                <i
                  className="fa-regular fa-trash-can"
                  onClick={()=>handleDeleteTodo(e.id)}
                />
              </li>
            );
          })}
   
        </ul>
        <div className="center">
          <p>Move done items at the end?</p>
        </div>
        <div className="button">
          <h3>Add to the todolist</h3>
          <div className="form-group">
            <input type="text" value={todo.name} onChange={handleChangeInput}/>
            <button onClick={handleAddTodo}>
              ADD ITEM
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

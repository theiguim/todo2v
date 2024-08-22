import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {

    const [postLayer, setPostLayer] = useState(false);
    const [updateLayer, setUpdateLayer] = useState(false);
    const [items, setItems] = useState([]);
    

    async function fetchTodo() {
        const res = await fetch("http://localhost:3000/auth/todo/").then(res => res.json())
        setItems(res.message);
  
     }

    return (
        <TodoContext.Provider
            value={{ postLayer, setPostLayer, updateLayer, setUpdateLayer, fetchTodo, items, setItems}}
        >
            {children}
        </TodoContext.Provider>
    );

};

export const useTodo = () => useContext(TodoContext);
import { createContext, useContext, useState } from "react";

const TodoContext = createContext();


export const TodoContextProvider = ({ children }) => {

    const [postLayer, setPostLayer] = useState(false);
    const [updateLayer, setUpdateLayer] = useState(false);
    const [items, setItems] = useState([]);


    async function fetchTodo() {

        
    const token = localStorage.getItem("Token-Auth");

    if (!token){
        console.log("token não encontrado");
        return
    }
    
        try {
            const res = await fetch("http://localhost:3000/auth/todo/", {
                headers: {
                    "Token-Auth": token
                }
            });

            if (!res.ok) throw new Error(`Erro ao buscar todos: ${res.status}`);

            const data = await res.json();
            setItems(data.message);

        } catch (err) {
            console.log(err.message);
        }



    }

    return (
        <TodoContext.Provider
            value={{ postLayer, setPostLayer, updateLayer, setUpdateLayer, fetchTodo, items, setItems }}
        >
            {children}
        </TodoContext.Provider>
    );

};

export const useTodo = () => useContext(TodoContext);
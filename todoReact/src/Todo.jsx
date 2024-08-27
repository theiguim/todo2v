import { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./styles/globalStyles.module.scss";
import PostModal from "./components/PostModal";
import { useTodo } from "./hooks/useTodo";
import UpdateModal from "./components/UpdateModal";
import { useNavigate } from "react-router-dom";

const Todo = () => {

   const { setUpdateLayer, fetchTodo, items, setItems } = useTodo();
   const [selectedId, setSelectedId] = useState(null);
   const token = localStorage.getItem("Token-Auth");
   const navigate = useNavigate();

   useEffect(() => {

      fetchTodo();

   }, []);


   async function deleteItem(id) {
      try {
         const res = await fetch(`http://localhost:3000/auth/todo/${id}`, {
            method: "DELETE",
            headers:{
               "Token-Auth": token
            }
         });

         if (!res.ok) throw new Error("Failed to delete item");

         const data = await res.json();

         const filteredItems = items.filter(itn => itn._id !== id);
         setItems(filteredItems);

      } catch (err) {
         console.log(err);
      }

   }

   function handleUpdateItem(id) {
      setSelectedId(id);
      setUpdateLayer(true);
   }

   return (
      <>
      <button className={styles.logout} onClick={()=> {
         localStorage.removeItem("Token-Auth")
         navigate("/")
      }}>Logout</button>
         <Header />

         {items.map((itn, idx) =>
            <div className={styles.card} key={idx}>
               <div className={styles.content}>
                  <p className={styles.title}>{itn.title}</p>
                  <p className={styles.description}>{itn.description}</p>

               </div>

               <div className={styles.fetchBtn}>
                  <button onClick={() => handleUpdateItem(itn._id)}>↻</button>
                  <button onClick={() => deleteItem(itn._id)}>🗑</button>
               </div>
            </div>)}
         <PostModal />
         <UpdateModal id={selectedId} />

      </>



   )

}
export default Todo;
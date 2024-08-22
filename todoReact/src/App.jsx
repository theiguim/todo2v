// estilizar cores de cada elemento
// login layer


import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import styles from "./styles/globalStyles.module.scss";
import PostModal from "./components/PostModal";
import { useTodo } from "./hooks/useTodo";
import UpdateModal from "./components/UpdateModal";

const App = () => {

   const { setUpdateLayer, fetchTodo, items, setItems } = useTodo();
   const [selectedId, setSelectedId] = useState(null);

   useEffect(() => {
      fetchTodo()

   }, []);


   async function deleteItem(id) {
      try {
         const res = await fetch(`http://localhost:3000/auth/todo/${id}`, {
            method: "DELETE"
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
         {/* <button className={styles.upBtn}>◘</button> */}
         <PostModal />
         <UpdateModal id={selectedId} />

      </>



   )

}
export default App;
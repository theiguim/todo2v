import { useEffect, useRef, useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import styles from "./styles.module.scss";

const PostModal = () => {

    const { postLayer, setPostLayer, setItems } = useTodo();
    const modalRef = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem("Token-Auth");

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setPostLayer(false);
            };
        };

        if (postLayer) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [postLayer]);

    function handleTitle(e) {
        const t = e.target.value;
        setTitle(t)
    }
    function handleDescription(e) {
        const d = e.target.value;
        setDescription(d)
    }


    async function postItem(e) {
        e.preventDefault();
   
        if (title && description) {

            try {
                const res = await fetch("http://localhost:3000/auth/todo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Token-Auth": token
                    },
                    body: JSON.stringify({ title, description })
                });

                if (!res.ok) throw new Error("Failed to post Item");

                const data = await res.json();
                setItems(prev => [...prev, data.message]);                
                setTitle("");
                setDescription("");
                setPostLayer(false);

            } catch (err) {
                console.log(err);
            }
        }
    };

    return (

        <>
            {postLayer ? <div className={styles.container}>
                <div ref={modalRef} className={styles.modal}>
                    <input className={styles.title} type="text" placeholder="title" value={title} onChange={(e) => handleTitle(e)} />
                    <textarea className={styles.description} placeholder="digite sua descrição" value={description} onChange={(e) => handleDescription(e)} />
                    <button className={styles.subBtn} onClick={(e) => postItem(e)}>Submit</button>
                </div>
            </div> : ""}
        </>

    )
};

export default PostModal;
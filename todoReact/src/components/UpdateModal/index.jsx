import { useEffect, useRef, useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import styles from "./styles.module.scss";

const UpdateModal = ({ id }) => {

    const { updateLayer, setUpdateLayer, setItems } = useTodo();
    const modalRef = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem("Token-Auth");

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setUpdateLayer(false);
            };
        };

        if (updateLayer) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [updateLayer]);

    function handleTitle(e) {
        const t = e.target.value;
        setTitle(t)
    }
    function handleDescription(e) {
        const d = e.target.value;
        setDescription(d)
    }


    async function updateItem() {
      
        if (title && description && id) {
            try {
                const res = await fetch(`http://localhost:3000/auth/todo/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Token-Auth": token
                    },
                    body: JSON.stringify({ title, description })
                });

                if (!res.ok) throw new Error("Failed to post Item");

                const data = await res.json();
                setItems((prev) => prev.map((itn) => itn._id === id ? { ...itn, title, description } : itn));
                setTitle("");
                setDescription("");
                setUpdateLayer(false);

            } catch (err) {
                console.log(err);
            };
        };
    };

    return (

        <>
            {updateLayer ? <div className={styles.container}>
                <div ref={modalRef} className={styles.modal}>
                    <input className={styles.title} type="text" placeholder="title" value={title} onChange={(e) => handleTitle(e)} />
                    <textarea className={styles.description} placeholder="digite sua descrição" value={description} onChange={(e) => handleDescription(e)} />
                    <button className={styles.subBtn} onClick={() => updateItem()}>Submit</button>
                </div>
            </div> : ""}
        </>

    )
};

export default UpdateModal;
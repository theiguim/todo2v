import { useState } from "react";
import styles from "./styles/LoginRegisterStyle.module.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    async function handleRegister(e) {
        e.preventDefault();

        if(!name && !email && !password) return 
        if(password !== confirmPassword) return console.log("Senhas não conferem.")

        try{
            const res = await fetch("http://localhost:3000/oauth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            });

            if(!res.ok) throw new Error("Failed to register");

            const data = await res.json();
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/login");
        }catch(err){
            console.log(err);
        };
    };

    return (

        <>
        <button className={styles.prevArrow} onClick={()=> navigate("/")}>🠔</button>
        <form>
            <h1>Register</h1>
            <input type="text"
                placeholder="user name"
                value={name}
                onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            <input type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            <input type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            <input type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }} />
            <button onClick={handleRegister}>submit</button>
        </form></>
    );
};

export default Register;
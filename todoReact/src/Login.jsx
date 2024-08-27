import { useState } from "react";
import styles from "./styles/LoginRegisterStyle.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if(!email && !password) return 

        try{
            const res = await fetch("http://localhost:3000/oauth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            });

            if(!res.ok) throw new Error("Failed to login");

            const token = res.headers.get("Token-Auth");

            localStorage.setItem("Token-Auth", token);
        

            const data = await res.json();




            setEmail("");
            setPassword("");
            navigate("/todo");
        }catch(err){
            console.log(err);
        };
    };

    return (

     <>
          <button className={styles.prevArrow} onClick={()=> navigate("/")}>🠔</button>
        <form>
           <h1>Login</h1>
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
            <button onClick={handleLogin}>submit</button>
        </form>
        </>
    );
};

export default Login;
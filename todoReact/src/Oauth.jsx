import styles from "./styles/OauthStyles.module.scss";
import { useNavigate } from "react-router-dom";

const Oauth = () => {

    const navigate = useNavigate();

    return (<>

        <div className={styles.container}>
            <h1 style={{ color: "white" }}>Seja bem vindo(a)!</h1>

            <section>
                <p>Como deseja continuar?</p>
                <div onClick={() => navigate("/login")}>Login</div>
                <div onClick={() => navigate("/register")}>Register</div>
            </section>

        </div>

    </>)
};

export default Oauth;
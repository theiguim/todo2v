import { useEffect } from "react";
import { useTodo } from "../../hooks/useTodo";
import styles from "./styles.module.scss";

const Header = () =>{

    const {setPostLayer} = useTodo();

    
return(
    <div className={styles.header}>
    <input className={styles.search} type="text" placeholder="search" />
    <button className={styles.btn} onClick={()=> setPostLayer(true)}>+</button>
    </div>
)

}

export default Header;

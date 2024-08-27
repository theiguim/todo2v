import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Oauth from "./Oauth";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";


const App = () => {

   return (
      <Router>
         <Routes>
            <Route path="/" element={<Oauth />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/todo" element={<Todo />}/>
         </Routes>
      </Router>
   );
};
export default App;
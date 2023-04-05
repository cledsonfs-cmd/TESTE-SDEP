import './Navbar.css';

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsBag,
  BsBagFill,
  BsBagCheckFill,
  BsArrow90DegRight,
  BsArrowBarRight,
  BsArrowLeft,
  BsBoxArrowRight,
} from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from '../slices/authSlice';

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let data = new Date();
  let hoje = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + ((data.getDate() )); 

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav id="nav">            
        <ul id="nav-links">    
          {auth ? (
            <>            
              <li>
                <a class="nav-link" href='/'><span class="sr-only"><BsHouseDoorFill /></span></a>                
              </li>  
              <li>
                <a class="nav-link" href='/despesa'><span class="sr-only">Despesas</span></a>                
              </li>                        
              
              <li>
                <a class="nav-link" href='/consulta/despesa'><span class="sr-only"><BsSearch /> Despesas</span></a>                
              </li> 
              <li>
                <a class="nav-link" href={'/consulta/empenho?inicio='+hoje+'&fim='+hoje}><span class="sr-only"><BsSearch /> Empenhos</span></a>                
              </li> 
              <li>
                <a class="nav-link" href={'/consulta/pagamento'}><span class="sr-only"><BsSearch /> Pagamentos</span></a>                
              </li> 


              <li>
                <span onClick={handleLogout}><BsBoxArrowRight/>Sair</span>                
              </li>           
            </>
          ) :(
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register">Registro</NavLink>
              </li>
            </>
          )}             
        </ul>
    </nav>
  )
}

export default Navbar
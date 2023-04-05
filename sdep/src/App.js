import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import {useAuth} from './hooks/useAuth' 

//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import Despesa from './pages/Despesa/Despesa';
import DespesaCreate from './pages/Despesa/DespesaCreate';
import DespesaEdit from './pages/Despesa/DespesaEdit';

import Empenho from './pages/Empenho/Empenho';
import EmpenhoCreate from './pages/Empenho/EmpenhoCreate';
import EmpenhoEdit from './pages/Empenho/EmpenhoEdit';

import Pagamento from './pages/Pagamento/Pagamento';
import PagamentoCreate from './pages/Pagamento/PagamentoCreate';
import PagamentoEdit from './pages/Pagamento/PagamentoEdit';

import ConsultaDespesa from './pages/Consultas/ConsultaDespesa';
import ConsultaEmpenho from './pages/Consultas/ConsultaEmpenho';
import ConsultaPagamento from './pages/Consultas/ConsultaPagamento';




function App() {  
  const {auth, loading} = useAuth();

  if(loading){
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="container">
        <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login"/>}/>            

            <Route path="/consulta/despesa" element={auth ? <ConsultaDespesa /> : <Navigate to="/login"/>}/>            
            <Route path="/consulta/empenho" element={auth ? <ConsultaEmpenho /> : <Navigate to="/login"/>}/>            
            <Route path="/consulta/pagamento" element={auth ? <ConsultaPagamento /> : <Navigate to="/login"/>}/>            

            
            <Route path="/despesa" element={auth ? <Despesa /> : <Navigate to="/"/>}/>            
            <Route path="/despesa/create" element={auth ? <DespesaCreate /> : <Navigate to="/"/>}/>            
            <Route path="/despesa/edit/:id" element={auth ? <DespesaEdit /> : <Navigate to="/"/>}/>            
            
            <Route path="/empenho/:id" element={auth ? <Empenho /> : <Navigate to="/"/>}/>            
            <Route path="/empenho/create/:id" element={auth ? <EmpenhoCreate /> : <Navigate to="/"/>}/>            
            <Route path="/empenho/edit/:id/:id2" element={auth ? <EmpenhoEdit /> : <Navigate to="/"/>}/>            
            
            <Route path="/pagamento/:id/:id2" element={auth ? <Pagamento /> : <Navigate to="/"/>}/>        
            <Route path="/pagamento/create/:id/:id2" element={auth ? <PagamentoCreate /> : <Navigate to="/"/>}/>        
            <Route path="/pagamento/edit/:id/:id2" element={auth ? <PagamentoEdit /> : <Navigate to="/"/>}/>        
            
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/"/>}/>            
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/"/>}/>                            
          </Routes>
        </div>          
        <Footer/>  
      </BrowserRouter>
    </div>
  );
}

export default App;

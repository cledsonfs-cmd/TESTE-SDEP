import { NavLink, Navigate, redirect, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BsBagFill, BsBagXFill, BsClipboardPlus, BsClipboardX, BsSearch } from 'react-icons/bs';
import './ConsultaDespesa.css';

//hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { localizarEmpenho } from '../../slices/empenhoSlice';
import { deletar, listar, localizarcredor } from '../../slices/despesaSlice';

import dayjs from "dayjs";

const ConsultaDespesa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleNavegar = (local) => {
    navigate("/despesa/"+local);
  };  


  const [dataProtocolo, setDataProtocolo] = useState("");
  const [tipoDespesa, setTipoDespesa] = useState("");
  const [credorDespesa, setCredorDespesa] = useState("");
  
  const { despesas } = useSelector((state) => state.despesa);

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  //?protocolo=false&despesa=false&credor=false

  const handlePesquisarProtocolo = () => {    
    window.location.href = "/consulta/despesa?protocolo="+dataProtocolo;    
  };  

  const handlePesquisarTipo = () => {    
    window.location.href = "/consulta/despesa?tipo="+tipoDespesa;    
  };  


  const handlePesquisarCredor = () => {    
    window.location.href = "/consulta/despesa?credor="+credorDespesa;    
  };  



  useEffect(() => {
    if (params.get("protocolo")) { 
      dispatch(listar("/protocolo/"+params.get("protocolo")));
    } else if (params.get("tipo")) {  
      dispatch(listar("/tipo/"+params.get("tipo")));
    } else if (params.get("credor")) {  
      dispatch(listar("/credor/"+params.get("credor")));      
    }else{
      dispatch(listar(""));
    }
  }, [dispatch]);
  return (

      <div class="card">
        <div class="card-header">
          <BsSearch /> Perquisar Despesas
        </div>
      <div class="card-body">
          <h5 class="card-title">
          <div className="row">
            <div className="col-4">
              <form action="">
              <div class="input-group mb-3">
                <input type="date" class="form-control" 
                  aria-label="Recipient's username" 
                  aria-describedby="basic-addon2"
                  onChange={(e) => setDataProtocolo(e.target.value)}
                  name='dataProtocolo'
                  data-date-format="dd/mm/yyyy"
                  />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" 
                  onClick={handlePesquisarProtocolo}
                  >Pesquisar</button>
                </div>
              </div>    
          
              </form>
            </div>

            <div className="col-4">
              <form action="">
                <div class="input-group mb-3">
                  <input 
                    type="text" 
                    class="form-control" 

                    onChange={(e) => setTipoDespesa(e.target.value)}
                    name='credorDespesa'

                    placeholder="Pesquisar Por Tipo de Despesa" 
                    aria-label="Pesquisar Por Tipo de Despesa" 
                    aria-describedby="basic-addon2"
                    />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" 
                    onClick={handlePesquisarTipo}
                    >Pesquisar</button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-4">
              <form action="">
              <div class="input-group mb-3">
                <input 
                  type="text" 
                    onChange={(e) => setCredorDespesa(e.target.value)}
                    
                    name='tipoDespesa'
                    class="form-control" 
                    placeholder="Pesquisar Por Credor" 
                    aria-label="Pesquisar Por Credor" 
                    aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button"
                        onClick={handlePesquisarCredor}
                      >Pesquisar</button>
                </div>
              </div>
            </form>
            </div>
          </div>
          </h5>
      </div>

      <div className="table-responsive">
        <table  class="table table-sm">
          <thead>
            <tr>
              <th>Ação</th>
              <th>#</th>
              <th>Protocolo</th>
              <th>Tipo Despesa</th>
              <th>Data Protocolo</th>
              <th>Data Vencimento</th>
              <th>Credor</th>
              <th>Descrição</th>
              <th>valor</th>
              <th>Empenhos</th>
            </tr>
          </thead>
          <tbody>            
              {despesas &&
                despesas.map((despesa) => (
                    <tr key={despesa.idDespesa}>
                    <td>
                      <span onClick={() => handleNavegar(`edit/${despesa.idDespesa}`)}><BsClipboardPlus size="25" title='Alterar'/></span>
                      &nbsp;
                      {despesa.numEmpenhos===0 ? 
                      <span onClick={() => handleExcluir(despesa.idDespesa,despesa.numeroProtocolo)}><BsClipboardX size="25" title='Excluir'/></span>
                      : ''}                      
                    </td>
                    <td>{despesa.idDespesa}</td>
                    <td>{despesa.numeroProtocolo}</td>
                    <td>{despesa.tipoDespesa}</td>
                    <td>{dayjs(despesa.dataProtocolo).format('DD/MM/YYYY')}</td>
                    <td>{dayjs(despesa.dataVencimento).format('DD/MM/YYYY')}</td>
                    <td>{despesa.credorDespesa}</td>
                    <td>{despesa.descricaoDespesa}</td>
                    <td align='right'>{despesa.valorDespesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                    <td>
                    <span onClick={() => handleNavegar(`../empenho/${despesa.idDespesa}`)}><BsBagFill size="25" title='Empenhos'/></span>
                    </td>
                    </tr>
                ))}
            
          </tbody>
        </table>
      </div>
      
    </div>

  )
}

export default ConsultaDespesa
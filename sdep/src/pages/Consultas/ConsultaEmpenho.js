import { NavLink, Navigate, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BsBag, BsBagXFill, BsClipboardPlus, BsClipboardX, BsSearch } from 'react-icons/bs';
import './ConsultaPagamento.css';

//hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { localizarEmpenho } from '../../slices/empenhoSlice';
import { localizar } from '../../slices/despesaSlice';
import { deletar, listar, localizarPorPeriodo } from '../../slices/empenhoSlice';
import dayjs from 'dayjs';

const ConsultaEmpenho = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavegar = (local) => {
    navigate("/empenho/" + local);
  };


  const handleExcluir = (id,protocolo) => {
    var teste = confirm("Confirma a exclusão?\nEmpenho: ["+id+"]\nDespesa/Protocolo: ["+protocolo+"]");
    if(teste){
      dispatch(deletar(id));
      alert("Registro excluido com sucesso");      
      window.location.reload(true);
    }  
    
  };

  const location = useLocation()
  const params = new URLSearchParams(location.search)


  const [dataInicial, setDataInicial] = useState("");  
  const [dataFinal, setDataFinal] = useState("");

  
  const { empenhos } = useSelector((state) => state.empenho);



  const handlePesquisar = () => {    
    window.location.href = "/consulta/empenho?inicio="+dataInicial+"&fim="+dataFinal;    
  }; 

  const valor = "/"+params.get("inicio")+"/"+params.get("fim");
  console.log("====>"+valor+"<==")
  
  useEffect(() => {
    if (valor==='//') { 
      
      dispatch(listar(""));
      
    } else { 
      dispatch(listar(valor));       
    }
    
  }, [dispatch]);
  return (
    <div class="card">
      <div class="card-header">
      <BsSearch /> Empenho 
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <div className="col-6">
            <form action="">
              <div class="input-group mb-4">
                <input 
                  type="date"
                  onChange={(e) => setDataInicial(e.target.value)}
                  value={dataInicial || ""}
                  name='dataInicial'
                  class="form-control" 
                  placeholder="Pesquisar Por Periodo" 
                  aria-label="Pesquisar Por Tipo de Despesa" 
                  aria-describedby="basic-addon2"
                  data-date-format="dd/mm/yyyy"
                />&nbsp;
                <input 
                  type="date"
                  onChange={(e) => setDataFinal(e.target.value)}
                  value={dataFinal || ""}
                  name='dataInicial'
                  class="form-control" 
                  placeholder="Pesquisar Por Periodo" 
                  aria-label="Pesquisar Por Tipo de Despesa" 
                  aria-describedby="basic-addon2"
                  data-date-format="dd/mm/yyyy"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" 
                  onClick={handlePesquisar}
                  >Pesquisar</button>
                </div>
              </div>
            </form>
          </div>
        </h5>
        <div className="table-responsive">
        <table  class="table table-sm">
          <thead>
            <tr>
              <th>Ação</th>
              <th>Despesa/Protocolo</th>
              <th>ID</th>
              <th>ANO</th>
              <th>Numero</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Observação</th>
              <th>Pagamentos</th>
            </tr>
          </thead>
          <tbody>            
              {empenhos &&
                empenhos.map((empenho) => (
                  <tr key={empenho.idEmpenho}>
                    <td>
                      <span onClick={() => handleNavegar("edit/"+empenho.idEmpenho+"/")}><BsClipboardPlus size="25" title='Alterar' /></span>
                      &nbsp;
                      {empenho.numPagamentos===0 ? 
                      <span onClick={() => handleExcluir(empenho.idEmpenho,(empenho.codigoDespesa+"/"+empenho.codigoProtocolo))}><BsClipboardX size="25" title='Excluir' /></span>
                      : ''}                       
                    </td>
                    <td>
                      {empenho.codigoDespesa||""}/{empenho.codigoProtocolo||""}
                    </td>
                    <td>{empenho.idEmpenho}</td>
                    <td>{empenho.anoEmpenho}</td>
                    <td>{empenho.numeroEmpenho}</td>
                    <td>{dayjs(empenho.dataEmpenho).format('DD/MM/YYYY')}</td>
                    <td align='right'>{empenho.valorEmpenho.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                    <td>{empenho.observacao}</td>
                    <td align='center'>
                      <span onClick={() => handleNavegar(`../pagamento/${empenho.idEmpenho}/${empenho.codigoDespesa}`)}><BsBag size="25" title='Pagamentos' /></span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>

  )
}

export default ConsultaEmpenho
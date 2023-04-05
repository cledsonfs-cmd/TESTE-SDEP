import { NavLink, Navigate, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BsBagFill, BsClipboardPlus, BsClipboardX, BsSearch } from 'react-icons/bs';
import './ConsultaPagamento.css';

//hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { localizarEmpenho } from '../../slices/empenhoSlice';
import { localizar } from '../../slices/despesaSlice';
import { deletar, listar, localizarPorPeriodo } from '../../slices/pagamentoSlice';
import dayjs from 'dayjs';

const ConsultaPagamento = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const [dataInicial, setDataInicial] = useState("");  
  const [dataFinal, setDataFinal] = useState("");
  
  const { pagamentos } = useSelector((state) => state.pagamento);

  const handleExcluir = (id) => {
    var teste = confirm("Confirma a exclusão?\nPagamento: [" + id+"]");
    if (teste) {
      dispatch(deletar(id));
      alert("Registro excluido com sucesso");
      window.location.reload(true);
    }
    
  };

  const handlePesquisar = () => {  
    window.location.href = "/consulta/pagamento?inicio="+dataInicial+"&fim="+dataFinal;    
  }; 



  useEffect(() => {
    if (params.get("inicio") && params.get("fim") && params.get("inicio") != '') { 
      dispatch(listar("/"+params.get("inicio")+"/"+params.get("fim")));       
    } else { 
      dispatch(listar(""));
    }
    
  }, [dispatch]);
  return (
    
  <div class="card">
      <div class="card-header">
      <BsSearch /> Pagamento 
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <div className="col-4">
            <form action="">
              <div class="input-group mb-3">
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
              <th>Empenho(Ano/Numero)</th>
              <th>ID</th>
              <th>ANO</th>
              <th>NÚMERO</th>
              <th>DATA</th>
              <th>VALOR</th>
              <th>OBSERVAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos &&
              pagamentos.map((pagamento) => (
                <tr key={pagamento.idPagamento}>
                  <td>
                    <span onClick={() => handleNavegar("edit/" + pagamento.idPagamento)}><BsClipboardPlus size="25" title='Alterar' /></span>
                    &nbsp;
                    <span onClick={() => handleExcluir(pagamento.idPagamento)}><BsClipboardX size="25" title='Excluir' /></span>
                  </td>
                  <td>

                    {pagamento.codigoDespesa}/{pagamento.codigoProtocolo}
                  </td>
                  <td>
                    {pagamento.codigoEmpenho}
                    {/*empenho.anoEmpenho}/{empenho.numeroEmpenho*/}
                  </td>
                  <td>{pagamento.idPagamento}</td>
                  <td>{pagamento.anoPagamento}</td>
                  <td>{pagamento.numeroPagamento}</td>
                  <td>{dayjs(pagamento.dataPagamento).format('DD/MM/YYYY')}</td>
                  <td align='right'>{pagamento.valorPagamento.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                  <td>{pagamento.observacao}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>

  )
}

export default ConsultaPagamento
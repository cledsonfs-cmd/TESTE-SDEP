import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { BsBagFill, BsClipboardPlus, BsClipboardX } from 'react-icons/bs';
import './Pagamento.css'

//hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { localizarEmpenho } from '../../slices/empenhoSlice';
import { localizar } from '../../slices/despesaSlice';
import { deletar, listar, localizarPorEmpenho } from '../../slices/pagamentoSlice';

const Pagamento = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, id2 } = useParams();

  const { empenho } = useSelector((state) => state.empenho);

  useEffect(() => {
    dispatch(localizarEmpenho(id));
  }, [dispatch]);

  const { despesa } = useSelector((state) => state.despesa);

  useEffect(() => {
    dispatch(localizar(id2));
  }, [dispatch]);

  const { pagamentos } = useSelector((state) => state.pagamento);

  useEffect(() => {
    dispatch(localizarPorEmpenho(id));
  }, [dispatch]);



  const handleNavegar = (local) => {
    navigate("/pagamento/" + local);
  };

  const handleExcluir = (id) => {
    var teste = confirm("Confirma a exclusão?\nPagamento: [" + id+"]");
    if (teste) {
      dispatch(deletar(id));
      alert("Registro excluido com sucesso");
      window.location.reload(true);
    }
    
  };


  return (
    <div class="card">
  <div class="card-header">
    Despesas
  </div>
  <div class="card-body">
    <h5 class="card-title">
    <button onClick={() => history.back()}  class="btn btn-outline-secondary">Voltar</button>&nbsp;
    <button onClick={() => handleNavegar("create/"+id+"/"+id2)}  class="btn btn-outline-secondary">Novo Pagamento</button>
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
                    <span onClick={() => handleNavegar("edit/"+pagamento.idPagamento+"/"+id)}><BsClipboardPlus size="25" title='Alterar' /></span>
                    &nbsp;
                    <span onClick={() => handleExcluir(pagamento.idPagamento)}><BsClipboardX size="25" title='Excluir' /></span>
                  </td>
                  <td>
                    {despesa.idDespesa || ''}/{despesa.numeroProtocolo || ''}
                  </td>
                  <td>
                    {empenho.anoEmpenho}/{empenho.numeroEmpenho}
                  </td>
                  <td>{pagamento.idPagamento}</td>
                  <td>{pagamento.anoPagamento}</td>
                  <td>{pagamento.numeroPagamento}</td>
                  <td>{pagamento.dataPagamento}</td>
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

export default Pagamento
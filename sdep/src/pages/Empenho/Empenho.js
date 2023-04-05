import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { BsBag, BsBagFill, BsBagX, BsBagXFill, BsClipboardPlus, BsClipboardX } from 'react-icons/bs';
import './Empenho.css'

//hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import {  localizar } from '../../slices/despesaSlice';
import { localizarPorDespesa, deletar,listar } from '../../slices/empenhoSlice';
import dayjs from 'dayjs';

const Empenho = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const { id } = useParams();
  console.log(id);

  const { despesa, error: errorDespesa, message: messageDespesa, loading: loadingDespesa } = useSelector((state) => state.despesa);

  useEffect(() => {
    dispatch(localizar(id));
  }, [dispatch]);

  const { empenhos } = useSelector((state) => state.empenho);

  useEffect(() => {
    dispatch(localizarPorDespesa(id))
  }, [dispatch]);


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

  return (
    <div class="card">
      <div class="card-header">
        Despesas
      </div>
      <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">Despesa: {despesa.idDespesa}/{despesa.numeroProtocolo}</h6>
        <h5 class="card-title">
          <button onClick={() => window.location.href = "/despesa"}  class="btn btn-outline-secondary">Voltar</button>&nbsp;
          <button onClick={() => handleNavegar("create/"+id)} class="btn btn-outline-secondary">Novo Empenho</button>
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
                      <span onClick={() => handleNavegar("edit/"+empenho.idEmpenho+"/"+id)}><BsClipboardPlus size="25" title='Alterar' /></span>
                      &nbsp;
                      {empenho.numPagamentos===0 ? 
                      <span onClick={() => handleExcluir(empenho.idEmpenho,(despesa.idDespesa+"/"+despesa.numeroProtocolo))}><BsClipboardX size="25" title='Excluir' /></span>
                      : ''} 

                      
                    </td>
                    <td>
                      {despesa.idDespesa}/{despesa.numeroProtocolo}
                    </td>
                    <td>{empenho.idEmpenho}</td>
                    <td>{empenho.anoEmpenho}</td>
                    <td>{empenho.numeroEmpenho}</td>
                    <td>{dayjs(empenho.dataEmpenho).format('DD/MM/YYYY')}</td>
                    <td align='right'>{empenho.valorEmpenho.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                    <td>{empenho.observacao}</td>
                    <td align='center'>
                      <span onClick={() => handleNavegar(`../pagamento/${empenho.idEmpenho}/${despesa.idDespesa}`)}><BsBag size="25" title='Pagamentos' /></span>
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

export default Empenho
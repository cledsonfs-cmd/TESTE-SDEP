import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { BsBag, BsBagFill, BsClipboardPlus, BsClipboardX } from 'react-icons/bs';

import './Despesa.css'

//hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { deletar, listar } from '../../slices/despesaSlice';
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format';


const Despesa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { despesas } = useSelector((state) => state.despesa);

  useEffect(() => {
    dispatch(listar(""))
  }, [dispatch]);

  const handleNavegar = (local) => {
    navigate("/despesa/"+local);
  };  

  const handleExcluir = (id, protocolo) => {
    var teste = confirm("Confirma a exclusão?\nDespesa: ["+id+"]\nProtocolo: ["+protocolo+"]");
    if(teste){
      dispatch(deletar(id));
      alert("Registro excluido com sucesso");
      //navigate("/despesa");
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
      <button onClick={() => handleNavegar("create")} class="btn btn-outline-secondary">Nova Despesa</button>
    </h5>
    <div className="table-responsive">
        <table  class="table table-sm">
          <thead>
            <tr>
              <th> Ação </th>
              <th>#</th>
              <th>Protocolo</th>
              <th>Tipo Despesa</th>
              <th>Data Protocolo</th>
              <th>Data Vencimento</th>
              <th>Credor</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
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
                    <td align='center'>{dayjs(despesa.dataProtocolo).format('DD/MM/YYYY')}</td>
                    <td align='center'>{dayjs(despesa.dataVencimento).format('DD/MM/YYYY')}</td>
                    <td>{despesa.credorDespesa}</td>
                    <td>{despesa.descricaoDespesa}</td>                    
                    <td align='right'>{despesa.valorDespesa.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>
                    <td align='center'>[{despesa.status}]</td>
                    <td align='center'>
                    <span onClick={() => handleNavegar(`../empenho/${despesa.idDespesa}`)}><BsBag size="25" title='Empenhos'/></span>
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

export default Despesa
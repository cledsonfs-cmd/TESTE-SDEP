import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import './Pagamento.css';

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { reset, resetMessage, salvar } from '../../slices/pagamentoSlice';


const PagamentoCreate = () => {
  const { id, id2 } = useParams();

  const [anoPagamento, setAnoPagamento] = useState("");
  const [numeroPagamento, setNumeroPagamento] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [valorPagamento, setValorPagamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [codigoEmpenho, setCodigoEmpenho] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const { pagamento, loading: loadingPagamento, message: messagePagamento, error: errorPagamento, success } = useSelector((state) => state.pagamento);

  const handleSubmit = (e) => {
    e.preventDefault();

    const pagamentoData = {
      anoPagamento,
      numeroPagamento,
      dataPagamento,
      valorPagamento,
      observacao,
      codigoEmpenho
    };

    pagamentoData.codigoEmpenho = id;

    console.log(pagamentoData)

    dispatch(salvar(pagamentoData));

    if (success) {
      navigate("/pagamento/"+id+"/"+id2);
    }

  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="form_container">
    <div class="card">
      <div class="card-header">
        Nova Pagamento
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <button onClick={() => history.back()} class="btn btn-outline-secondary">Voltar</button>&nbsp;
        </h5>
        <form onSubmit={handleSubmit}>
        <label htmlFor='anoPagamento'>Ano:</label>
        <div class="form-group">
            <input
              type="number"
              placeholder=""
              onChange={(e) => setAnoPagamento(e.target.value)}
              value={anoPagamento || ""}
              name='anoPagamento'              
              aria-describedby="emailHelp"
              class="form-control" />
          </div>  
          <div class="form-group">
            <label htmlFor='numeroPagamento'>Número:</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setNumeroPagamento(e.target.value)}
              value={numeroPagamento || ""}
              name='numeroPagamento'              
              aria-describedby="emailHelp"
              class="form-control" />
            </div>  
          <div class="form-group">
            <label htmlFor='dataPagamento'>Data Pagamento:</label>
            <input
              type="date"
              onChange={(e) => setDataPagamento(e.target.value)}
              value={dataPagamento || ""}
              name='dataPagamento'              
              aria-describedby="emailHelp"
              class="form-control"
            />
          </div>  
          <div class="form-group">
            <label htmlFor='valorPagamento'>Valor:</label>
            <input
              type="number"
              onChange={(e) => setValorPagamento(e.target.value)}
              value={valorPagamento || ""}
              name='valorPagamento'              
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>  
          <div class="form-group">
            <label htmlFor='observacao'>Observação:</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setObservacao(e.target.value)}
              value={observacao || ""}
              name='observacao'              
              aria-describedby="emailHelp"
              class="form-control"
            />
          </div>
            {!loadingPagamento && <input type="submit" value="Cadastrar" />}
            {loadingPagamento && <input type="submit" disabled value="Aguarde..." />}
            {errorPagamento && <Message msg={errorPagamento} type="error" />}
        </form>
      </div>
    </div>
    </div>
  )
}

export default PagamentoCreate
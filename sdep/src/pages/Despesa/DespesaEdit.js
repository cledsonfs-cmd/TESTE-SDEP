import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import './Despesa.css'

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";


// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { despesa, localizar, reset, resetMessage, salvar, update } from '../../slices/despesaSlice';

const DespesaEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { despesa, error: errorDespesa, message: messageDespesa, loading: loadingDespesa } = useSelector((state) => state.despesa);

  const [numeroProtocolo, setNumeroProtocolo] = useState("");
  const [tipoDespesa, setTipoDespesa] = useState("");
  const [dataProtocolo, setDataProtocolo] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [credorDespesa, setCredorDespesa] = useState("");
  const [descricaoDespesa, setDescricaoDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");

  const { loading, error } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(localizar(id));
  }, [dispatch]);

  useEffect(() => {
    setNumeroProtocolo(despesa.numeroProtocolo);
    setTipoDespesa(despesa.descricaoDespesa);
    setDataProtocolo(despesa.dataProtocolo);
    setDataVencimento(despesa.dataVencimento);
    setCredorDespesa(despesa.credorDespesa);
    setDescricaoDespesa(despesa.descricaoDespesa);
    setValorDespesa(despesa.valorDespesa);
  }, [despesa]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const despesaDTO = {
      idDespesa: id,
      numeroProtocolo :numeroProtocolo,
      tipoDespesa: tipoDespesa,
      dataProtocolo: dataProtocolo,
      dataVencimento:dataVencimento,
      descricaoDespesa: descricaoDespesa,
      valorDespesa:valorDespesa,
      credorDespesa: credorDespesa
    };

    console.log(despesaDTO)
    dispatch(update(despesaDTO));   

    navigate("/despesa");
    
  }; 

    // Clean all auth states
    useEffect(() => {
      dispatch(reset());
    }, [dispatch]);

    return (
      <div className="form_container">
      <div class="card">
        <div class="card-header">
          Alterar Despesas
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <button onClick={() => history.back()} class="btn btn-outline-secondary">Voltar</button>&nbsp;
          </h5>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label htmlFor={numeroProtocolo}>Número do Protocolo:</label>
              <input
              type="text"
              placeholder=""
              onChange={(e) => setNumeroProtocolo(e.target.value)}
              value={numeroProtocolo || ""}
              name='numeroProtocolo'              
              aria-describedby="emailHelp"
              class="form-control"
            />              
            </div>
            <div class="form-group">
            <label htmlFor={tipoDespesa}>Tipo Despesa:</label>
            <input
              type="text"
              onChange={(e) => setTipoDespesa(e.target.value)}
              value={tipoDespesa || ""}
              name='tipoDespesa'
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>
            <div class="form-group">
            <label htmlFor={dataProtocolo}>Data Protocolo:</label>
            <input
              type="date"
              onChange={(e) => setDataProtocolo(e.target.value)}
              value={dataProtocolo || ""}
              name='dataProtocolo'
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>
            <div class="form-group">
            <label htmlFor={dataVencimento}>Data Vencimento:</label>
            <input
              type="date"
              onChange={(e) => setDataVencimento(e.target.value)}
              value={dataVencimento || ""}
              name='dataVencimento'
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>
            <div class="form-group">
            <label htmlFor={credorDespesa}>Credor Despesa:</label>
            <input
              type="text"
              onChange={(e) => setCredorDespesa(e.target.value)}
              value={credorDespesa || ""}
              name='credorDespesa'
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>
            <div class="form-group">
            <label htmlFor={descricaoDespesa}>Descrição Despesa:</label>
            <input
              type="text"
              onChange={(e) => setDescricaoDespesa(e.target.value)}
              value={descricaoDespesa || ""}text
              name='descricaoDespesa'
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>
            <div class="form-group">
            <label htmlFor={valorDespesa}>Valor:</label>
            <input
              type="number"
              onChange={(e) => setValorDespesa(e.target.value)}
              value={valorDespesa || ""}
              name='valorDespesa'
              aria-describedby="emailHelp"
              class="form-control"
            />
            </div>
            {!loading && <input type="submit" value="Alterar" />}
            {loading && <input type="submit" disabled value="Aguarde..." />}
            {errorDespesa && <Message msg={errorDespesa} type="error" />}
          </form>
        </div>
      </div>
      </div>
    )
  }

  export default DespesaEdit
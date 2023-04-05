import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import './Empenho.css'

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { reset, resetMessage, salvar } from '../../slices/empenhoSlice';


const EmpenhoCreate = () => {
  const { id } = useParams();

  const [anoEmpenho, setAnoEmpenho] = useState("");
  const [numeroEmpenho, setNumeroEmpenho] = useState("");
  const [dataEmpenho, setDataEmpenho] = useState("");
  const [valorEmpenho, setValorEmpenho] = useState("");
  const [observacao, setObservacao] = useState("");
  const [codigoDespesa, setCodigoDespesa] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const { empenho, loading: loadingEmpenho, message: messageEmpenho, error: errorEmpenho, success } = useSelector((state) => state.empenho);

  const handleSubmit = (e) => {
    e.preventDefault();

    const empenhoData = {
      anoEmpenho,
      numeroEmpenho,
      dataEmpenho,
      valorEmpenho,
      observacao,
      codigoDespesa
    };

    empenhoData.codigoDespesa= id;

    console.log(empenhoData)

    dispatch(salvar(empenhoData));

    if (success) {
      navigate("/empenho/"+id);
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
          Nova Empenho
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <button onClick={() => history.back()} class="btn btn-outline-secondary">Voltar</button>&nbsp;
          </h5>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
            <label htmlFor='anoEmpenho'>Ano:</label>
            <input
              type="number"
              placeholder=""
              onChange={(e) => setAnoEmpenho(e.target.value)}
              value={anoEmpenho || ""}
              name='anoEmpenho'              
              aria-describedby="emailHelp"
              class="form-control"/>
            </div>
            <div class="form-group">
            <label htmlFor='numeroEmpenho'>Número:</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setNumeroEmpenho(e.target.value)}
              value={numeroEmpenho || ""}
              name='numeroEmpenho'              
              aria-describedby="emailHelp"
              class="form-control"/>
            </div>
            <div class="form-group">
            <label htmlFor='dataEmpenho'>Data Empenho:</label>
            <input
              type="date"
              onChange={(e) => setDataEmpenho(e.target.value)}
              value={dataEmpenho || ""}
              name='dataEmpenho'              
              aria-describedby="emailHelp"
              class="form-control"
            />   
            </div>
            <div class="form-group">
            <label htmlFor='valorEmpenho'>Valor:</label>
            <input
              type="number"
              onChange={(e) => setValorEmpenho(e.target.value)}
              value={valorEmpenho || ""}
              name='valorEmpenho'              
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
            {!loadingEmpenho && <input type="submit" value="Cadastrar" />}
            {loadingEmpenho && <input type="submit" disabled value="Aguarde..." />}
            {errorEmpenho && <Message msg={errorEmpenho} type="error" />}
          </form>
        </div>
      </div>
      </div>
  )
}
export default EmpenhoCreate


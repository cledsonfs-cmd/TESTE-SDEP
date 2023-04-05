import { NavLink, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import './Empenho.css';

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";


// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { despesa, localizarEmpenho, reset, resetMessage, salvar, update } from '../../slices/empenhoSlice';

const EmpenhoEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, id2 } = useParams();

  const { empenho, error: errorEmpenho, message: messageEmpenho, loading: loadingEmpenho } = useSelector((state) => state.empenho);

  const [anoEmpenho, setAnoEmpenho] = useState("");
  const [numeroEmpenho, setNumeroEmpenho] = useState("");
  const [dataEmpenho, setDataEmpenho] = useState("");
  const [valorEmpenho, setValorEmpenho] = useState("");
  const [observacao, setObservacao] = useState(""); 

  const { loading, error } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(localizarEmpenho(id));
  }, [dispatch]);

  useEffect(() => {
    setAnoEmpenho(empenho.anoEmpenho),
      setNumeroEmpenho(empenho.numeroEmpenho),
      setDataEmpenho(empenho.dataEmpenho),
      setValorEmpenho(empenho.valorEmpenho),
      setObservacao(empenho.observacao)
  }, [empenho]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const empenhoDTO = {
      idEmpenho: id,
      anoEmpenho: anoEmpenho,
      numeroEmpenho: numeroEmpenho,
      dataEmpenho: dataEmpenho,
      valorEmpenho: valorEmpenho,
      observacao: observacao,
      codigoDespesa:id2
    };

    console.log(empenhoDTO)
    dispatch(update(empenhoDTO));

    navigate("/empenho/"+id2);

  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="form_container">
      <div class="card">
        <div class="card-header">
          Alterar Empenho
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
              readOnly            
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
              readOnly            
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
            {!loadingEmpenho && <input type="submit" value="Alterar" />}
            {loadingEmpenho && <input type="submit" disabled value="Aguarde..." />}
            {errorEmpenho && <Message msg={errorEmpenho} type="error" />}
          </form>
        </div>
      </div>
      </div>
  )
}

export default EmpenhoEdit
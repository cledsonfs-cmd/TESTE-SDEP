import { api, requestConfig } from "../utils/config";

//Salvar
const salvar = async (data, token) => {
    const config = requestConfig("POST", data, token);
  
    try {
      const res = await fetch(api + "/pagamentos", config)
        .then((res) => res.json())
        .catch((err) => err);
         
      return res;
    } catch (error) {
      console.log(error);
    }
  };

//Atualizar
const atualizar = async (data, token) => {
    const config = requestConfig("PUT", data, token);
 
    try {
      const res = await fetch(api + "/pagamentos", config)
        .then((res) => res.json())
        .catch((err) => err);
         
      return res;
    } catch (error) {
      console.log(error);
    }
  };

//Excluir
const excluir = async (id, token) => {
    const config = requestConfig("DELETE", null, token);
  
    try {
      const res = await fetch(api + "/pagamentos/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

//Listar
const listar = async (valor,token) => {
  const config = requestConfig("GET",null,token);

  try {
    const res = await fetch(api + "/pagamentos"+valor, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
  };
 
//Listar Periodo
const listarPeriodo = async (periodo, token) => {
  const config = requestConfig("GET",null,token);

  try {
    const res = await fetch(api + "/pagamentos/"+periodo, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Listar por empenho
const listarporempenho = async (id,token) => {
  const config = requestConfig("GET",null,token);
  
  try {
    const res = await fetch(api + "/pagamentos/empenho/"+id, config)
      .then((res) => res.json())
      .catch((err) => err);
      
    return res;
  } catch (error) {
    console.log(error);
  }
};

//localizar
const localizar = async (id,token) => {
    const config = requestConfig("GET",null,token);
  
    try {
      const res = await fetch(api + "/pagamentos/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // Search 
  const searchQuery = async (query,token) => {
    const config = requestConfig("GET",token);
  
    try {
      const res = await fetch(api + "/pagamentos/search/" + query, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const pagamentoService = {
    salvar,
    atualizar,
    listar,
    excluir,
    localizar,
    listarporempenho,
    listarPeriodo,
    searchQuery
  };
  
  export default pagamentoService;
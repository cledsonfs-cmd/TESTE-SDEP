import { api, requestConfig } from "../utils/config";

//Salvar
const salvar = async (data, token) => {
    const config = requestConfig("POST", data, token);
  
    try {
      const res = await fetch(api + "/empenhos", config)
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
      const res = await fetch(api + "/empenhos", config)
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
      const res = await fetch(api + "/empenhos/" + id, config)
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
    const res = await fetch(api + "/empenhos"+valor, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
  };
 
//Listar Periodo
const listarPeriodo = async (inicio,token) => {
  const config = requestConfig("GET",null,token);

  try {
    const res = await fetch(api + "/empenhos/"+inicio, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Listar por despesa
const listarpordespesa = async (id,token) => {
  const config = requestConfig("GET",null,token);

  try {
    const res = await fetch(api + "/empenhos/despesa/"+id, config)
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
      const res = await fetch(api + "/empenhos/"+id, config)
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
      const res = await fetch(api + "/empenhos/search/" + query, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const empenhoService = {
    salvar,
    atualizar,
    listar,
    excluir,
    localizar,
    listarpordespesa,
    listarPeriodo,
    searchQuery
  };
  
  export default empenhoService;
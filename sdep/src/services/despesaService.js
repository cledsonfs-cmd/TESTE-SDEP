import { api, requestConfig } from "../utils/config";

//Salvar
const salvar = async (data, token) => {
    const config = requestConfig("POST", data, token);
  
    try {
      const res = await fetch(api + "/despesas", config)
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
      const res = await fetch(api + "/despesas", config)
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
      const res = await fetch(api + "/despesas/" + id, config)
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
      const res = await fetch(api + "/despesas"+valor, config)
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
      const res = await fetch(api + "/despesas/"+id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //localizarcredor
const localizarcredor = async (valor,token) => {
  const config = requestConfig("GET",null,token);
 
    try {
      const res = await fetch(api + "/despesas/credor/"+valor, config)
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
      const res = await fetch(api + "/despesas/search/" + query, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const despesaService = {
    salvar,
    atualizar,
    listar,
    excluir,
    localizar,
    localizarcredor,
    searchQuery
  };
  
  export default despesaService;
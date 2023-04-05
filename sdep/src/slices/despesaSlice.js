import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import despesaService from "../services/despesaService";

const initialState = {
    despesas: [],
    despesa: {},
    error: false,
    success: false,
    loading: false,
    message: null,
  };

//Salvar
export const salvar = createAsyncThunk(
    "despesa/salvar",
    async (despesa, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await despesaService.salvar(despesa, token);

      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
  );
//Atualizar
export const update = createAsyncThunk(
    "despesa/update",
    async (despesa, thunkAPI) => {
      const token = localStorage.getItem("token");
      const data = await despesaService.atualizar(despesa,token);
  
      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
);
//Listar
export const listar = createAsyncThunk(
  "despesa/listar", async (valor) => {  
  
  const token = localStorage.getItem("token");
  
  const data = await despesaService.listar(valor,token);

  return data;
});
//Excluir
export const deletar= createAsyncThunk(
    "despesa/deletar",
    async (id, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await despesaService.excluir(id, token);
  
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
  );
//Localizar
export const localizar = createAsyncThunk(
    "despesa/localizar",
    async (id, thunkAPI) => {
      const token = localStorage.getItem("token");
 
      const data = await despesaService.localizar(id, token);
      
      return data;
    }
  );

//Localizar
export const localizarcredor = createAsyncThunk(
  "despesa/localizarcredor", async (valor) => {  
  
    const token = localStorage.getItem("token");
    
    const data = await despesaService.localizarcredor(valor,token);
  
    return data;
  }
);

// Search
export const search = createAsyncThunk(
    "despacho/search",
    async (query, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await despesaService.search(query, token);  
      return data;
    }
  );

  export const despesaSlice = createSlice({
    name: "despacho",
    initialState,
    reducers: {
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(salvar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(salvar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.despesa = action.payload;
        state.despesas.unshift(state.despesa);
        state.message = "Cadastro efetuado com sucesso!";
      })
      .addCase(salvar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.despesa = null;
      })

      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      
        state.despesas.map((despesa) => {
          if (despesa.idDespesa === action.payload.idDespesa) {
            despesa.numeroProtocolo = action.payload.numeroProtocolo;
            despesa.tipoDespesa = action.payload.tipoDespesa;
            despesa.dataProtocolo = action.payload.dataProtocolo;
            despesa.dataVencimento = action.payload.dataVencimento;            
            despesa.credorDespesa = action.payload.credorDespesa;
            despesa.descricaoDespesa = action.payload.descricaoDespesa;
            despesa.valorDespesa =  action.payload.valorDespesa;
            return despesa;
          }
          return despesa;
        });

        state.message = "Cadastro efetuado com sucesso!";
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.despesa = null;
      })

      .addCase(listar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listar.fulfilled, (state, action) => {        
        state.loading = false;
        state.success = true;
        state.error = null;
        state.despesas = action.payload;        
      })

      .addCase(deletar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;       

        state.despesas = state.despesas.filter((despesa) => {
          return despesa.idDespesa !== action.payload.idDespesa;
        });

        state.message = action.payload.message;
      })
      .addCase(deletar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.despesa = null;
      })

      .addCase(localizar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.despesa = action.payload;
      })

      
      .addCase(localizarcredor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizarcredor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.despesa = action.payload;
      })

      .addCase(search.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.despesas = action.payload;
      });
    },
  });

export const { reset } = despesaSlice.actions;
export default despesaSlice.reducer;
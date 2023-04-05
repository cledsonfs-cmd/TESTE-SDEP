import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import empenhoService from "../services/empenhoService";

const initialState = {
    empenhos: [],
    empenho: {},
    error: false,
    success: false,
    loading: false,
    message: null,
  };

//Salvar
export const salvar = createAsyncThunk(
    "empenho/salvar",
    async (empenho, thunkAPI) => {
      const token = localStorage.getItem("token");

      const data = await empenhoService.salvar(empenho, token);

      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
  );
//Atualizar
export const update = createAsyncThunk(
    "empenho/update",
    async (empenho, thunkAPI) => {
      const token = localStorage.getItem("token");
      const data = await empenhoService.atualizar(empenho,token);
  
      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
);
//Listar
export const listar = createAsyncThunk(
  "empenho/listar", 
  async (valor,thunkAPI) => {
    const token = localStorage.getItem("token");

    const data = await empenhoService.listar(valor,token);

    return data;
  }
);
//Excluir
export const deletar= createAsyncThunk(
    "empenho/deletar",
    async (id, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await empenhoService.excluir(id, token);
  
      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
  );
//Localizar por Id Despesa
export const localizarPorDespesa = createAsyncThunk(
    "empenho/despesa",
    async (id, thunkAPI) => {
      const token = localStorage.getItem("token");

      const data = await empenhoService.listarpordespesa(id,token);
  
      return data;
    }
  );

//Localizar por periodo
export const localizarPorPeriodo = createAsyncThunk(
  "empenho/despesa",
  async (periodo, thunkAPI) => {
    const token = localStorage.getItem("token");

    const data = await empenhoService.listarPeriodo(periodo,token);

    return data;
  }
);

//Localizar
export const localizarEmpenho = createAsyncThunk(
  "empenho/localizarEmpenho",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");

    const data = await empenhoService.localizar(id, token);

    return data;
  }
);

// Search
export const search = createAsyncThunk(
    "empenho/search",
    async (query, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await empenhoService.search(query, token);
 
      return data;
    }
  );

  export const empenhoSlice = createSlice({
    name: "empenho",
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
        state.empenho = action.payload;
        state.empenhos.unshift(state.empenho);
        state.message = "Cadastro efetuado com sucesso!";
      })
      .addCase(salvar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.empenho = null;
      })

      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      
        state.empenhos.map((empenho) => {
          if (empenho.idEmpenho === action.payload.idEmpenho) {
            empenho.anoEmpenho = action.payload.anoEmpenho;
            empenho.numeroEmpenho = action.payload.numeroEmpenho;
            empenho.dataEmpenho = action.payload.dataEmpenho;
            empenho.valorEmpenho = action.payload.valorEmpenho;
            empenho.observacao = action.payload.observacao;
            empenho.codigoDespesa = action.payload.codigoDespesa;           
            return empenho;
          }
          return empenho;
        });

        state.message = "Cadastro atualizado com sucesso!";
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.empenho = null;
      })

      .addCase(listar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listar.fulfilled, (state, action) => {        
        state.loading = false;
        state.success = true;
        state.error = null;
        state.empenhos = action.payload;        
      })

      .addCase(localizarPorPeriodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizarPorPeriodo.fulfilled, (state, action) => {        
        state.loading = false;
        state.success = true;
        state.error = null;
        state.empenhos = action.payload;        
      })

      .addCase(deletar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;       

        state.empenhos = state.despesas.filter((empenho) => {
          return empenho.idEmpenho !== action.payload.idEmpenho;
        });

        state.message = action.payload.message;
      })
      .addCase(deletar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.empenho = null;
      })

      .addCase(localizarEmpenho.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizarEmpenho.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.empenho = action.payload;
      })

      .addCase(search.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.empenhos = action.payload;
      });
    },
  });

export const { reset } = empenhoSlice.actions;
export default empenhoSlice.reducer;
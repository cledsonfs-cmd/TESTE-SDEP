import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pagamentoService from "../services/pagamentoService";

const initialState = {
    pagamentos: [],
    pagamento: {},
    error: false,
    success: false,
    loading: false,
    message: null,
  };

//Salvar
export const salvar = createAsyncThunk(
    "pagamento/salvar",
    async (pagamento, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await pagamentoService.salvar(pagamento, token);

      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
  );
//Atualizar
export const update = createAsyncThunk(
    "pagamento/update",
    async (pagamento, thunkAPI) => {
      const token = localStorage.getItem("token");
      const data = await pagamentoService.atualizar(pagamento,token);
  
      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
);

//Listar
export const listar = createAsyncThunk(
  "pagamento/listar", 
  async (valor,thunkAPI) => {
    const token = localStorage.getItem("token");

    const data = await pagamentoService.listar(valor,token);

    return data;
  }
);

//Excluir
export const deletar= createAsyncThunk(
    "pagamento/deletar",
    async (id, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await pagamentoService.excluir(id, token);
  
      // Check for errors
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors);
      }
  
      return data;
    }
  );
//Localizar por Id Empenho
export const localizarPorEmpenho = createAsyncThunk(
    "pagamento/despesa",
    async (id, thunkAPI) => {
      const token = localStorage.getItem("token");

      const data = await pagamentoService.listarporempenho(id,token);
  
      return data;
    }
  );

//Localizar por periodo
export const localizarPorPeriodo = createAsyncThunk(
  "pagamento/periodo",
  async (periodo) => {
    const token = localStorage.getItem("token");    
    const data = await pagamentoService.listarPeriodo(periodo,token);

    return data;
  }
);

//Localizar
export const localizarPagamento = createAsyncThunk(
  "pagamento/localizarPagamento",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");

    const data = await pagamentoService.localizar(id, token);

    return data;
  }
);

// Search
export const search = createAsyncThunk(
    "pagamento/search",
    async (query, thunkAPI) => {
      const token = localStorage.getItem("token");
  
      const data = await pagamentoService.search(query, token);
  
      return data;
    }
  );

  export const pagamentoSlice = createSlice({
    name: "pagamento",
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
        state.pagamento = action.payload;
        state.pagamentos.unshift(state.pagamento);
        state.message = "Cadastro efetuado com sucesso!";
      })
      .addCase(salvar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pagamento = null;
      })

      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      
        state.pagamentos.map((pagamento) => {
          if (pagamento.idPagamento === action.payload.idPagamento) {
            pagamento.anoPagamento = action.payload.anoPagamento;
            pagamento.numeroPagamento = action.payload.numeroPagamento;
            pagamento.dataPagamento = action.payload.dataPagamento;
            pagamento.valorPagamento = action.payload.valorPagamento;
            pagamento.observacao = action.payload.observacao;
            pagamento.codigoEmpenho = action.payload.codigoEmpenho;        
            return pagamento;
          }
          return pagamento;
        });

        state.message = "Cadastro atualizado com sucesso!";
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pagamento = null;
      })    
      
      .addCase(listar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listar.fulfilled, (state, action) => {        
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pagamentos = action.payload;        
      })

      .addCase(localizarPorEmpenho.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizarPorEmpenho.fulfilled, (state, action) => {        
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pagamentos = action.payload;        
      })

      .addCase(localizarPorPeriodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizarPorPeriodo.fulfilled, (state, action) => {        
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pagamentos = action.payload;        
      })

      .addCase(deletar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;       

        state.pagamentos = state.pagamentos.filter((pagamento) => {
          return pagamento.idPagamento !== action.payload.idPagamento;
        });

        state.message = action.payload.message;
      })
      .addCase(deletar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pagamento = null;
      })

      .addCase(localizarPagamento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(localizarPagamento.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pagamento = action.payload;
      })

      .addCase(search.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pagamentos = action.payload;
      });
    },
  });

export const { reset } = pagamentoSlice.actions;
export default pagamentoSlice.reducer;
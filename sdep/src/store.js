import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlice';
import despesaReducer  from './slices/despesaSlice';
import empenhoReducer from './slices/empenhoSlice';
import pagamentoReducer from './slices/pagamentoSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        despesa: despesaReducer,
        empenho: empenhoReducer,
        pagamento: pagamentoReducer
    }
});

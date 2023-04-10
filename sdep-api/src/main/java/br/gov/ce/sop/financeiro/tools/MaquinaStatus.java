package br.gov.ce.sop.financeiro.tools;

import br.gov.ce.sop.financeiro.model.Despesa;

public class MaquinaStatus {

    public static String AnalisarDespesa(Despesa _despesa){

        //Despesa Registrada, mas nenhum empenho associado.
        if(_despesa.getEmpenhos().size()==0){
            return "AGUARDANDO_EMPENHO";
        }

        //Despesa onde a soma dos valores empenhados é inferior ao valor da despesa        
        if(Float.compare(_despesa.getValorDespesa(),_despesa.TotalEmpenhos()) > 0){            
            return "PARCIALMENTE_EMPENHADA";
        }else if(Float.compare(_despesa.getValorDespesa(),_despesa.TotalEmpenhos())==0){
            //Despesa onde a soma dos valores empenhados é igual ao valor da despesa. Mas não possui registro de pagamento.
            if(_despesa.TotalPagamento()==0){
                
                return "AGUARDANDO PAGAMENTO";
            }

            //Despesa onde a soma dos valores pagos é inferior ao valor da despesa
            if(Float.compare(_despesa.TotalPagamento(),_despesa.getValorDespesa())<0){
                return "PARCIALMENTE_PAGA";
            }

            //Despesa onde a soma dos valores pagos ao valor da despesa
            if(Float.compare(_despesa.TotalPagamento(),_despesa.getValorDespesa()) == 0){
                return "PAGA";
            }
        }
        
        return "INDEFINIDO";
    }
}

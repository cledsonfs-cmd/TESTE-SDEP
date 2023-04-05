package br.gov.ce.sop.financeiro.tools;

import br.gov.ce.sop.financeiro.model.Despesa;

public class MaquinaStatus {

    public static String AnalisarDespesa(Despesa _despesa){

        //Despesa Registrada, mas nenhum empenho associado.
        if(_despesa.getEmpenhos().size()==0){
            return "Aguardando Empenho";
        }

        //Despesa onde a soma dos valores empenhados é inferior ao valor da despesa        
        if(_despesa.getValorDespesa()<_despesa.TotalEmpenhos()){
            return "Parcialmente Empenhada";
        }else if(_despesa.getValorDespesa()==_despesa.TotalEmpenhos()){
            //Despesa onde a soma dos valores empenhados é igual ao valor da despesa. Mas não possui registro de pagamento.
            if(_despesa.TotalPagamento()==0){
                return "Aguardando Pagamento";
            }

            //Despesa onde a soma dos valores pagos é inferior ao valor da despesa
            if(_despesa.TotalPagamento()<_despesa.getValorDespesa()){
                return "Parcialmente Paga ";
            }

            //Despesa onde a soma dos valores pagos ao valor da despesa
            if(_despesa.TotalPagamento()==_despesa.getValorDespesa()){
                return "Paga ";
            }
        }
        
        return "INDEFINIDO";
    }
}

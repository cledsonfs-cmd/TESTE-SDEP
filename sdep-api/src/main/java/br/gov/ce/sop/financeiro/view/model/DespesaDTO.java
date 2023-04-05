package br.gov.ce.sop.financeiro.view.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DespesaDTO {

    private Long idDespesa;
    private String numeroProtocolo;
    private String tipoDespesa;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataProtocolo;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataVencimento;
    private String credorDespesa;
    private String descricaoDespesa;
    private float valorDespesa;
    private int numEmpenhos;

}

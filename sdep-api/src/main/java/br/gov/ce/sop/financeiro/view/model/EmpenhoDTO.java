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
public class EmpenhoDTO {

    private Long idEmpenho;
    private int anoEmpenho;
    private String numeroEmpenho;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataEmpenho;
    private float valorEmpenho;
    private String observacao;
    private long codigoDespesa;
    private String codigoProtocolo;
    private int numPagamentos;
}

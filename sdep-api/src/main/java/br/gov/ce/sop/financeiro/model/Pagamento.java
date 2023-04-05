package br.gov.ce.sop.financeiro.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "pagamentos")
public class Pagamento {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idPagamento;

  @Column
  private int anoPagamento;

  @Column
  private String numeroPagamento;

  @Column
  private Date dataPagamento;

  @Column
  private float valorPagamento;

  @Column
  private String observacao;

  @OneToOne  
  @JoinColumn(name = "id_empenho")    
  private Empenho empenho;
  
  
}
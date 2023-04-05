package br.gov.ce.sop.financeiro.model;

import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "empenhos")
public class Empenho {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idEmpenho;

  @Column
  private int anoEmpenho;

  @Column
  private String numeroEmpenho;

  @Column
  private Date dataEmpenho;

  @Column
  private float valorEmpenho;

  @Column
  private String observacao;

  @OneToOne  
  @JoinColumn(name = "id_despesa")    
  private Despesa despesa;

   
  @OneToMany(orphanRemoval=false)
  @JoinColumn(name="id_empenho")
  private List<Pagamento> pagamentos;
  
}
package br.gov.ce.sop.financeiro.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "despesas")
public class Despesa {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idDespesa;

  @Column
  private String numeroProtocolo;

  @Column
  private String tipoDespesa;

  @Column
  private Date dataProtocolo;

  @Column
  private Date dataVencimento;

  @Column
  private String credorDespesa;

  @Column
  private String descricaoDespesa;

  @Column
  private float valorDespesa;
    
 
  @OneToMany(orphanRemoval=false)
  @JoinColumn(name="id_despesa")
  private List<Empenho> empenhos;
  

  public float TotalEmpenhos(){
    float total = 0.0f;
    for (Empenho empenho : empenhos) {
      total += empenho.getValorEmpenho();
    }

    return total;
  }

  public float TotalPagamento(){
    float total = 0.0f;
    for (Empenho empenho : empenhos) {
      for (Pagamento pagamento : empenho.getPagamentos()) {
        total += pagamento.getValorPagamento();
      } 
    }
    return total;
  }
}
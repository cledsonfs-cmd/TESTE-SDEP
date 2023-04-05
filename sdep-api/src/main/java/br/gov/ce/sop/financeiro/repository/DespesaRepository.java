package br.gov.ce.sop.financeiro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.gov.ce.sop.financeiro.model.Despesa;

public interface DespesaRepository extends JpaRepository<Despesa, Long>{

    List<Despesa> findByNumeroProtocoloEquals(String numeroProtocolo);

    //@Query(value = "SELECT u.* FROM despesas u WHERE data_protocolo = ?1 order by u.data_protocolo ", nativeQuery = true)
    //List<Despesa> PagamentosPorDataProtocolo(String data);

    @Query(value = "SELECT u.* FROM despesas u WHERE UPPER(tipo_despesa) = UPPER(?1) order by u.tipo_despesa ", nativeQuery = true)
    List<Despesa> PagamentosPorTipoDespesa(String tipo);

    @Query(value = "SELECT u.* FROM despesas u WHERE TRIM(UPPER(credor_despesa)) = TRIM(UPPER(?1)) order by u.credor_despesa ", nativeQuery = true)
    List<Despesa> PagamentosPorCredor(String redor);

    List<Despesa> findAllByDataProtocoloBetween(Date publicationTimeStart, Date publicationTimeEnd);


}

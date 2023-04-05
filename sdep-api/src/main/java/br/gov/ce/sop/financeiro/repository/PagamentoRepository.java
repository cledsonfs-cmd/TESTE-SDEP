package br.gov.ce.sop.financeiro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.gov.ce.sop.financeiro.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

    @Query(value = "SELECT u.* FROM pagamentos u WHERE u.id_empenho=?1 and u.numero_pagamento = ?2 and u.ano_pagamento=?3  ", nativeQuery = true)
    List<Pagamento> PagamentosPorNumeroAno(Long id, String numero, int ano);

    @Query(value = "SELECT u.* FROM pagamentos u WHERE u.id_empenho = ?1  order by u.id_pagamento ", nativeQuery = true)
    List<Pagamento> PagamentosPorEmpenho(Long id);

    //List<Pagamento> findAllByDataPagamento(Date publicationDate);

    List<Pagamento> findAllByDataPagamentoBetween(Date publicationTimeStart, Date publicationTimeEnd);
    
}

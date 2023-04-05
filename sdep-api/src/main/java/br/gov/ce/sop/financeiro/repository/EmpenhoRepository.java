package br.gov.ce.sop.financeiro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.gov.ce.sop.financeiro.model.Empenho;

public interface EmpenhoRepository extends JpaRepository<Empenho, Long>{
    
    @Query(value = "SELECT u.* FROM empenhos u WHERE u.id_despesa=?1 and u.numero_empenho = ?2 and u.ano_empenho=?3  ", nativeQuery = true)
    List<Empenho> EmpenhoPorNumeroAno(Long id, String numero, int ano);

    @Query(value = "SELECT u.* FROM empenhos u WHERE u.id_despesa = ?1 order by u.id_empenho ", nativeQuery = true)
    List<Empenho> EmpenhoPorDespesa(Long id);

    List<Empenho> findAllByDataEmpenhoBetween(Date publicationTimeStart, Date publicationTimeEnd);
    
}

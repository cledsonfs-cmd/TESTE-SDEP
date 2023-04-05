package br.gov.ce.sop.financeiro.view.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ce.sop.financeiro.service.DespesaService;
import br.gov.ce.sop.financeiro.view.model.DespesaDTO;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin("*")
public class DespesaController {
    
    @Autowired
    private DespesaService service;

    @GetMapping
    public List<DespesaDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public DespesaDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public DespesaDTO save(@Validated @RequestBody DespesaDTO objeto) {
        return service.save(objeto);
    }

    @PutMapping
    public DespesaDTO update(@RequestBody @Validated DespesaDTO objeto) {
        return service.update(objeto);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable long id) {
        return service.delete(id);
    }

    @GetMapping("/credor/{valor}")
    public List<DespesaDTO> getPagamentosPorCredor(@PathVariable String valor) {
        return service.getPagamentosPorCredor(valor);
    }

    @GetMapping("/protocolo/{valor}")
    public List<DespesaDTO> getPagamentosPorDataProtocolo(@PathVariable String valor) {
        return service.getPagamentosPorDataProtocolo(valor);
    }

    @GetMapping("/tipo/{valor}")
    public List<DespesaDTO> getPagamentosPorTipoDespesa(@PathVariable String valor) {
        return service.getPagamentosPorTipoDespesa(valor);
    }
}

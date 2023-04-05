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

import br.gov.ce.sop.financeiro.service.PagamentoService;
import br.gov.ce.sop.financeiro.view.model.PagamentoDTO;

@RestController
@RequestMapping("/api/pagamentos")
@CrossOrigin("*")
public class PagamentoController {
    
    @Autowired
    private PagamentoService service;

    @GetMapping
    public List<PagamentoDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/empenho/{id}")
    public List<PagamentoDTO> getPorEmpenho(@PathVariable Long id) {
        return service.getPorEmpenho(id);
    }

    @GetMapping("/{id}")
    public PagamentoDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public PagamentoDTO save(@Validated @RequestBody PagamentoDTO objeto) {
        return service.save(objeto);
    }

    @PutMapping
    public PagamentoDTO update(@RequestBody @Validated PagamentoDTO objeto) {
        return service.update(objeto);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable long id) {
        return service.delete(id);
    }

    @GetMapping("/{inicio}/{fim}")
    public List<PagamentoDTO> getPorPeriodo(@PathVariable String inicio, @PathVariable String fim) {
        return service.getPorPeriodo(inicio, fim);
    }
}

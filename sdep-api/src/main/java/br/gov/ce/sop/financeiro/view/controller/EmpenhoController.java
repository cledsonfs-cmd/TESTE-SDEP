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

import br.gov.ce.sop.financeiro.service.EmpenhoService;
import br.gov.ce.sop.financeiro.view.model.EmpenhoDTO;

@RestController
@RequestMapping("/api/empenhos")
@CrossOrigin("*")
public class EmpenhoController {
    
    @Autowired
    private EmpenhoService service;

    @GetMapping
    public List<EmpenhoDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/despesa/{id}")
    public List<EmpenhoDTO> getPorDespesa(@PathVariable Long id) {
        return service.getPorDespesa(id);
    }

    @GetMapping("/{id}")
    public EmpenhoDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public EmpenhoDTO save(@Validated @RequestBody EmpenhoDTO objeto) {
        return service.save(objeto);
    }

    @PutMapping
    public EmpenhoDTO update(@RequestBody @Validated EmpenhoDTO objeto) {
        return service.update(objeto);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable long id) {
        return service.delete(id);
    }

    @GetMapping("/{inicio}/{fim}")
    public List<EmpenhoDTO> getPorPeriodo(@PathVariable String inicio, @PathVariable String fim) {
        return service.getPorPeriodo(inicio, fim);
    }
}

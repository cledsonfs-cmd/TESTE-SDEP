package br.gov.ce.sop.financeiro.view.controller;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ce.sop.financeiro.model.Usuario;
import br.gov.ce.sop.financeiro.service.UsuarioService;
import br.gov.ce.sop.financeiro.view.model.LoginRequest;
import br.gov.ce.sop.financeiro.view.model.LoginResponse;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService servicoUsuario; 

    @GetMapping
    public List<Usuario> obterTodos(){
        return servicoUsuario.obterTodos();
    }
    
    @GetMapping("/{id}")
    public Optional<Usuario> obter(@PathVariable("id") long id){
        return servicoUsuario.obterPorId(id);
    }

    @PostMapping
    public Usuario adicionar (@RequestBody Usuario usuario){
        return servicoUsuario.adicionar(usuario);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return servicoUsuario.logar(request.getEmail(), request.getSenha());
    }
}

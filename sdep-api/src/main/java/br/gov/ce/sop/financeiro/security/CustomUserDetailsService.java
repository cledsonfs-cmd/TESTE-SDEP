package br.gov.ce.sop.financeiro.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import br.gov.ce.sop.financeiro.repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {        
        return usuarioRepository.findByEmail(email).get();
    }

    public UserDetails obterUsuarioPorId(long id) {
        return usuarioRepository.findById(id).get();
    }    
    
}

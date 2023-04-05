package br.gov.ce.sop.financeiro.exception.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.gov.ce.sop.financeiro.exception.CampoObrigatorioException;
import br.gov.ce.sop.financeiro.exception.SenhaException;
import br.gov.ce.sop.financeiro.exception.UsuarioNotFoundException;
import br.gov.ce.sop.financeiro.view.model.ErrorDTO;

@ControllerAdvice(basePackages = "br.gov.ce.sop.financeiro.view.controller")
public class UsuarioControllerAdvice {

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UsuarioNotFoundException.class)
    public ErrorDTO handleModuloNotFound(UsuarioNotFoundException usuarioNotFoundException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Usuario não encontrado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(CampoObrigatorioException.class)
    public ErrorDTO handleModuloNotFound(CampoObrigatorioException campoObrigatorioException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Campo obrigatorio não informado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(SenhaException.class)
    public ErrorDTO handleModuloNotFound(SenhaException senhaException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("A senha deve ter no minimo 6 caracteres");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }
}

package br.gov.ce.sop.financeiro.exception.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.gov.ce.sop.financeiro.exception.PagamentoNotFoundException;
import br.gov.ce.sop.financeiro.exception.PagamentoNumeroAnoException;
import br.gov.ce.sop.financeiro.view.model.ErrorDTO;

@ControllerAdvice(basePackages = "br.gov.ce.sop.financeiro.view.controller")
public class PagamentoControllerAdvice {
    
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(PagamentoNotFoundException.class)
    public ErrorDTO handleModuloNotFound(PagamentoNotFoundException pagamentoNotFoundException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Credor não encontrado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(PagamentoNumeroAnoException.class)
    public ErrorDTO handleModuloNotFound(PagamentoNumeroAnoException pagamentoNumeroAnoException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Numero e Ano Já Registrado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }
}

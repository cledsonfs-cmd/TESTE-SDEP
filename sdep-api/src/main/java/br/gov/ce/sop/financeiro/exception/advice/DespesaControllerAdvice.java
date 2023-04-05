package br.gov.ce.sop.financeiro.exception.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.gov.ce.sop.financeiro.exception.DespesaDeleteException;
import br.gov.ce.sop.financeiro.exception.DespesaNotFoundException;
import br.gov.ce.sop.financeiro.exception.ProtocoloException;
import br.gov.ce.sop.financeiro.view.model.ErrorDTO;

@ControllerAdvice(basePackages = "br.gov.ce.sop.financeiro.view.controller")
public class DespesaControllerAdvice {
    
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DespesaNotFoundException.class)
    public ErrorDTO handleModuloNotFound(DespesaNotFoundException despesaNotFoundException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Despesa não encontrada.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DespesaDeleteException.class)
    public ErrorDTO handleModuloNotFound(DespesaDeleteException despesaDeleteException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Não é possivél excluir a despesa, devido existir empenhos associados a mesma.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ProtocoloException.class)
    public ErrorDTO handleModuloNotFound(ProtocoloException despesaDeleteException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Não é possivél cadastrar a despesa, devido a existencia de uma despesa com o número de protocolo informado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }
}

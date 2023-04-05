package br.gov.ce.sop.financeiro.exception.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.gov.ce.sop.financeiro.exception.EmpenhoDeleteException;
import br.gov.ce.sop.financeiro.exception.EmpenhoNotFoundException;
import br.gov.ce.sop.financeiro.exception.EmpenhoNumeroAnoException;
import br.gov.ce.sop.financeiro.view.model.ErrorDTO;

@ControllerAdvice(basePackages = "br.gov.ce.sop.financeiro.view.controller")
public class EmpenhoControllerAdvice {
    
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EmpenhoNotFoundException.class)
    public ErrorDTO handleModuloNotFound(EmpenhoNotFoundException empenhoNotFoundException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Empenho não encontrado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EmpenhoNumeroAnoException.class)
    public ErrorDTO handleModuloNotFound(EmpenhoNumeroAnoException empenhoNumeroAnoException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Numero e Ano Já Registrado.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EmpenhoDeleteException.class)
    public ErrorDTO handleModuloNotFound(EmpenhoDeleteException empenhoDeleteException){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setErrors("Não é possivél excluir a despesa, devido existir empenhos associados a mesma.");
        errorDTO.setTimestamp(LocalDateTime.now());
        return errorDTO;
    }

}

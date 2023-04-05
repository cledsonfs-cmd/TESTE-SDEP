package br.gov.ce.sop.financeiro.view.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDTO {
    
    private int status;
    private String errors;
    private LocalDateTime timestamp;
}

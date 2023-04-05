package br.gov.ce.sop.financeiro.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ce.sop.financeiro.exception.CampoObrigatorioException;
import br.gov.ce.sop.financeiro.exception.EmpenhoNotFoundException;
import br.gov.ce.sop.financeiro.exception.PagamentoNotFoundException;
import br.gov.ce.sop.financeiro.exception.PagamentoNumeroAnoException;
import br.gov.ce.sop.financeiro.model.Empenho;
import br.gov.ce.sop.financeiro.model.Pagamento;
import br.gov.ce.sop.financeiro.repository.EmpenhoRepository;
import br.gov.ce.sop.financeiro.repository.PagamentoRepository;
import br.gov.ce.sop.financeiro.view.model.PagamentoDTO;

@Service
public class PagamentoService {
    
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private PagamentoRepository repository;

    @Autowired
    private EmpenhoRepository repositoryEmpenho;

    public List<PagamentoDTO> getAll() {
        List<Pagamento> _objeto = repository.findAll();
        return _objeto
                .stream()
                .map(o -> modelMapper.map(o, PagamentoDTO.class))
                .collect(Collectors.toList());
    }

    public List<PagamentoDTO> getPorEmpenho(Long idEmpenho) {
        List<Pagamento> _objeto = repository.PagamentosPorEmpenho(idEmpenho);
        return _objeto
                .stream()
                .map(o -> modelMapper.map(o, PagamentoDTO.class))
                .collect(Collectors.toList());
    }

    public PagamentoDTO getById(Long Id) {        
        Optional<Pagamento> _objeto = repository.findById(Id);
        if(_objeto.isPresent()){
            return modelMapper.map(_objeto.get(), PagamentoDTO.class);
        }else{
            throw new PagamentoNotFoundException();
        } 
    }

    public PagamentoDTO save(PagamentoDTO objeto) {        
        if(objeto.getAnoPagamento() == 0){
            throw new CampoObrigatorioException();
        } 

        if(objeto.getNumeroPagamento().isEmpty()){
            throw new CampoObrigatorioException();
        } 

        if(objeto.getDataPagamento() == null){
            throw new CampoObrigatorioException();
        } 

        if(objeto.getValorPagamento() == 0){
            throw new CampoObrigatorioException();
        } 

        List<Pagamento> pagamentos = repository.PagamentosPorNumeroAno(objeto.getCodigoEmpenho(),objeto.getNumeroPagamento(),objeto.getAnoPagamento());

        if(pagamentos.size()>0){
            throw new PagamentoNumeroAnoException();
        }

        Optional<Empenho> _empenho = repositoryEmpenho.findById(objeto.getCodigoEmpenho());
        if(!_empenho.isPresent()) {
            throw new EmpenhoNotFoundException();
        }

        Pagamento _objeto = modelMapper.map(objeto, Pagamento.class);        
        _objeto.setEmpenho(_empenho.get());

        objeto = modelMapper.map(repository.save(_objeto), PagamentoDTO.class);
        objeto.setCodigoEmpenho(_empenho.get().getIdEmpenho());
        return objeto;
    }

    public PagamentoDTO update(PagamentoDTO objetoDTO) {

        if(objetoDTO.getAnoPagamento() == 0){
            throw new CampoObrigatorioException();
        } 

        if(objetoDTO.getNumeroPagamento().isEmpty()){
            throw new CampoObrigatorioException();
        } 

        if(objetoDTO.getDataPagamento() == null){
            throw new CampoObrigatorioException();
        } 

        if(objetoDTO.getValorPagamento() == 0){
            throw new CampoObrigatorioException();
        } 

      
        Pagamento _objeto = modelMapper.map(objetoDTO, Pagamento.class);       

        Empenho _empenho = repositoryEmpenho.getById(objetoDTO.getCodigoEmpenho());
        _objeto.setEmpenho(_empenho);
        _objeto = repository.save(_objeto);

        objetoDTO = modelMapper.map(_objeto, PagamentoDTO.class);
        objetoDTO.setCodigoEmpenho(_empenho.getIdEmpenho());

        return objetoDTO;
    }

    public Boolean delete(long id) {
        Optional<Pagamento> _objeto = repository.findById(id);
        if (_objeto.isPresent()) {
            repository.delete(_objeto.get());
            return true;
        }
        throw new PagamentoNotFoundException();
    }

    public List<PagamentoDTO> getPorPeriodo(String inicio, String fim) {
        try {
            Calendar di = Calendar.getInstance();
            di.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(inicio));
            di.add(Calendar.DATE, -1);
            
            Calendar df = Calendar.getInstance();
            df.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(fim));
            df.add(Calendar.DATE, 1);

            List<Pagamento> _objeto = repository.findAllByDataPagamentoBetween(di.getTime(), df.getTime());

            

            List<PagamentoDTO> objetosDTO = _objeto
                .stream()
                .map(o -> modelMapper.map(o, PagamentoDTO.class))
                .collect(Collectors.toList());

            for (PagamentoDTO _dto : objetosDTO) {
                for (Pagamento _o : _objeto) {
                    if(_dto.getIdPagamento() == _o.getIdPagamento()){
                        _dto.setCodigoEmpenho(_o.getEmpenho().getIdEmpenho());    
                        _dto.setCodigoDespesa(_o.getEmpenho().getDespesa().getIdDespesa());
                        _dto.setCodigoProtocolo(_o.getEmpenho().getDespesa().getNumeroProtocolo());
                    }
                }
            }
            return objetosDTO;

        } catch (ParseException e) {
            e.printStackTrace();
        }  

        
        return null;
    }
}

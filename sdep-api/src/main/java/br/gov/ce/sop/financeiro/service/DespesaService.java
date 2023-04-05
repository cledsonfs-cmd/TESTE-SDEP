package br.gov.ce.sop.financeiro.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.gov.ce.sop.financeiro.exception.CampoObrigatorioException;
import br.gov.ce.sop.financeiro.exception.DespesaDeleteException;
import br.gov.ce.sop.financeiro.exception.DespesaNotFoundException;
import br.gov.ce.sop.financeiro.exception.ProtocoloException;
import br.gov.ce.sop.financeiro.model.Despesa;
import br.gov.ce.sop.financeiro.repository.DespesaRepository;
import br.gov.ce.sop.financeiro.tools.MaquinaStatus;
import br.gov.ce.sop.financeiro.view.model.DespesaDTO;

@Service
public class DespesaService {

    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private DespesaRepository repository;

    @Autowired 
    private EmpenhoService empenhoService;

    public List<DespesaDTO> getAll() {
        List<Despesa> _objeto = repository.findAll(Sort.by(Sort.Direction.ASC, "idDespesa"));
        List<DespesaDTO> objetosDTO = _objeto
                .stream()
                .map(o -> modelMapper.map(o, DespesaDTO.class))
                .collect(Collectors.toList());

        for (DespesaDTO despesaDTO : objetosDTO) {
            despesaDTO.setNumEmpenhos(empenhoService.getPorDespesa(despesaDTO.getIdDespesa()).size());
        }

        return objetosDTO;
    }

    public DespesaDTO getById(Long Id) {
        Optional<Despesa> _objeto = repository.findById(Id);
        if (_objeto.isPresent()) {
            return modelMapper.map(_objeto.get(), DespesaDTO.class);
        } else {
            throw new DespesaNotFoundException();
        }
    }

    public DespesaDTO save(DespesaDTO objetoDTO) {
        return save(objetoDTO,0L);
    }

    public DespesaDTO save(DespesaDTO objetoDTO, Long id) {

        if(objetoDTO.getNumeroProtocolo().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getTipoDespesa().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getDataProtocolo() == null){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getDataVencimento() == null){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getCredorDespesa().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getDescricaoDespesa().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getValorDespesa() == 0){
            throw new CampoObrigatorioException();
        }

        Despesa _objeto = modelMapper.map(objetoDTO, Despesa.class);
        
        if(id==0){

            List<Despesa> teste = repository
                .findByNumeroProtocoloEquals(objetoDTO.getNumeroProtocolo().trim().toUpperCase());
            if (teste.size() > 0) {
                throw new ProtocoloException();
            }
            
        }
        else{
            _objeto.setIdDespesa(id);
        }             

        
        _objeto.setNumeroProtocolo(_objeto.getNumeroProtocolo().trim().toUpperCase());
        _objeto = repository.save(_objeto);

        objetoDTO = modelMapper.map(_objeto, DespesaDTO.class);

        return objetoDTO;
    }

    public DespesaDTO update(DespesaDTO objetoDTO) {

        if(objetoDTO.getNumeroProtocolo().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getTipoDespesa().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getDataProtocolo() == null){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getDataVencimento() == null){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getCredorDespesa().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getDescricaoDespesa().isEmpty()){
            throw new CampoObrigatorioException();
        }
        if(objetoDTO.getValorDespesa() == 0){
            throw new CampoObrigatorioException();
        }
        
        Optional<Despesa> _objetoTemp = repository.findById(objetoDTO.getIdDespesa());
        if (!_objetoTemp.isPresent()) {
            throw new DespesaNotFoundException();
        }        

        Despesa _objeto = modelMapper.map(objetoDTO, Despesa.class);
        

        _objeto.setNumeroProtocolo(_objeto.getNumeroProtocolo().trim().toUpperCase());
        _objeto = repository.save(_objeto);

        objetoDTO = modelMapper.map(_objeto, DespesaDTO.class);

        return objetoDTO;
    }

    public Boolean delete(long id) {
        Optional<Despesa> _objeto = repository.findById(id);
        if (_objeto.isPresent()) {
            if (_objeto.get().getEmpenhos().size() == 0) {
                repository.delete(_objeto.get());
                return true;
            }
            throw new DespesaDeleteException();
        }
        throw new DespesaNotFoundException();
    }

    public String Status(long id) {
        Optional<Despesa> _objeto = repository.findById(id);
        if (_objeto.isPresent()) {
            return MaquinaStatus.AnalisarDespesa(_objeto.get());
        }
        throw new DespesaNotFoundException();
    }

    public List<DespesaDTO> getPagamentosPorCredor(String valor) {
        List<Despesa> _objeto = repository.PagamentosPorCredor(valor);
        return _objeto
                .stream()
                .map(o -> modelMapper.map(o, DespesaDTO.class))
                .collect(Collectors.toList());
    }

    public List<DespesaDTO> getPagamentosPorDataProtocolo(String data) {
        Calendar di = Calendar.getInstance();
        Calendar df = Calendar.getInstance();
            try {
                di.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(data));
                df.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(data));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            di.add(Calendar.DATE, -1);
            di.set(Calendar.HOUR_OF_DAY, 1);
            
        List<Despesa> _objeto = repository.findAllByDataProtocoloBetween(di.getTime(), df.getTime());
        
        return _objeto
                .stream()
                .map(o -> modelMapper.map(o, DespesaDTO.class))
                .collect(Collectors.toList());
    }

    public List<DespesaDTO> getPagamentosPorTipoDespesa(String valor) {
        List<Despesa> _objeto = repository.PagamentosPorTipoDespesa(valor);
        return _objeto
                .stream()
                .map(o -> modelMapper.map(o, DespesaDTO.class))
                .collect(Collectors.toList());
    }
}

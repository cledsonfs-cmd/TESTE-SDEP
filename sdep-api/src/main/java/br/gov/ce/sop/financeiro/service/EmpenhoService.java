package br.gov.ce.sop.financeiro.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.ce.sop.financeiro.exception.CampoObrigatorioException;
import br.gov.ce.sop.financeiro.exception.DespesaNotFoundException;
import br.gov.ce.sop.financeiro.exception.EmpenhoDeleteException;
import br.gov.ce.sop.financeiro.exception.EmpenhoNotFoundException;
import br.gov.ce.sop.financeiro.exception.EmpenhoNumeroAnoException;
import br.gov.ce.sop.financeiro.model.Despesa;
import br.gov.ce.sop.financeiro.model.Empenho;
import br.gov.ce.sop.financeiro.repository.DespesaRepository;
import br.gov.ce.sop.financeiro.repository.EmpenhoRepository;
import br.gov.ce.sop.financeiro.repository.PagamentoRepository;
import br.gov.ce.sop.financeiro.view.model.EmpenhoDTO;
import org.springframework.data.domain.Sort;

@Service
public class EmpenhoService {

    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private EmpenhoRepository repository;

    @Autowired
    private DespesaRepository despesaRepository;

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public List<EmpenhoDTO> getAll() {
        List<Empenho> _objeto = repository.findAll(Sort.by(Sort.Direction.ASC, "idEmpenho"));

        List<EmpenhoDTO> objetoDTO = _objeto
                .stream()
                .map(o -> modelMapper.map(o, EmpenhoDTO.class))
                .collect(Collectors.toList());

        for (EmpenhoDTO empenhoDTO : objetoDTO) {
            for (Empenho empenho : _objeto) {
                if (empenhoDTO.getIdEmpenho() == empenho.getIdEmpenho()) {
                    Despesa temp = empenho.getDespesa();
                    if (temp != null) {
                        empenhoDTO.setCodigoDespesa(empenho.getDespesa().getIdDespesa());
                        empenhoDTO.setCodigoProtocolo(empenho.getDespesa().getNumeroProtocolo());
                    }
                    // empenhoDTO.setCodigoProtocolo(empenho.getDespesa().getNumeroProtocolo());
                }
            }
        }

        return objetoDTO;

    }

    public List<EmpenhoDTO> getPorDespesa(Long idDespesa) {
        List<Empenho> _objeto = repository.EmpenhoPorDespesa(idDespesa);
        List<EmpenhoDTO> objetos = _objeto
                .stream()
                .map(o -> modelMapper.map(o, EmpenhoDTO.class))
                .collect(Collectors.toList());

        for (EmpenhoDTO empenhoDTO : objetos) {
            empenhoDTO.setCodigoDespesa(idDespesa);
        }

        for (EmpenhoDTO empenhoDTO : objetos) {
            empenhoDTO.setNumPagamentos(pagamentoRepository.PagamentosPorEmpenho(empenhoDTO.getIdEmpenho()).size());
        }

        return objetos;
    }

    public EmpenhoDTO getById(Long Id) {
        Optional<Empenho> _objeto = repository.findById(Id);
        if (_objeto.isPresent()) {
            return modelMapper.map(_objeto.get(), EmpenhoDTO.class);
        } else {
            throw new EmpenhoNotFoundException();
        }
    }

    public EmpenhoDTO save(EmpenhoDTO objetoDTO) {

        if (objetoDTO.getAnoEmpenho() == 0) {
            throw new CampoObrigatorioException();
        }
        if (objetoDTO.getNumeroEmpenho().isEmpty()) {
            throw new CampoObrigatorioException();
        }
        if (objetoDTO.getDataEmpenho() == null) {
            throw new CampoObrigatorioException();
        }
        if (objetoDTO.getValorEmpenho() == 0) {
            throw new CampoObrigatorioException();
        }

        if (objetoDTO.getCodigoDespesa() == 0) {
            throw new CampoObrigatorioException();
        }

        List<Empenho> empenhos = repository.EmpenhoPorNumeroAno(objetoDTO.getCodigoDespesa(),
                objetoDTO.getNumeroEmpenho(), objetoDTO.getAnoEmpenho());

        if (empenhos.size() > 0) {
            throw new EmpenhoNumeroAnoException();
        }

        Optional<Despesa> _despesa = despesaRepository.findById(objetoDTO.getCodigoDespesa());
        if (!_despesa.isPresent()) {
            throw new DespesaNotFoundException();
        }
        Empenho _objeto = modelMapper.map(objetoDTO, Empenho.class);
        _objeto.setDespesa(_despesa.get());

        objetoDTO = modelMapper.map(repository.save(_objeto), EmpenhoDTO.class);
        objetoDTO.setCodigoDespesa(objetoDTO.getCodigoDespesa());

        return objetoDTO;
    }

    public EmpenhoDTO update(EmpenhoDTO objetoDTO) {

        if (objetoDTO.getAnoEmpenho() == 0) {
            throw new CampoObrigatorioException();
        }
        if (objetoDTO.getNumeroEmpenho().isEmpty()) {
            throw new CampoObrigatorioException();
        }
        if (objetoDTO.getDataEmpenho() == null) {
            throw new CampoObrigatorioException();
        }
        if (objetoDTO.getValorEmpenho() == 0) {
            throw new CampoObrigatorioException();
        }

        if (objetoDTO.getCodigoDespesa() == 0) {
            throw new CampoObrigatorioException();
        }

        Optional<Empenho> _objetoTemp = repository.findById(objetoDTO.getIdEmpenho());
        if (!_objetoTemp.isPresent()) {
            throw new DespesaNotFoundException();
        }

        Empenho _objeto = modelMapper.map(objetoDTO, Empenho.class);

        Despesa _despesa = despesaRepository.getById(objetoDTO.getCodigoDespesa());
        _objeto.setDespesa(_despesa);
        _objeto = repository.save(_objeto);

        objetoDTO = modelMapper.map(_objeto, EmpenhoDTO.class);

        return objetoDTO;
    }

    public Boolean delete(long id) {
        Optional<Empenho> _objeto = repository.findById(id);
        if (_objeto.isPresent()) {
            if (_objeto.get().getPagamentos().size() == 0) {
                repository.delete(_objeto.get());
                return true;
            }
            throw new EmpenhoDeleteException();
        }
        throw new EmpenhoNotFoundException();
    }

    public List<EmpenhoDTO> getPorPeriodo(String inicio, String fim) {
        try {
            Calendar di = Calendar.getInstance();
            di.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(inicio));
            di.add(Calendar.DATE, -1);

            Calendar df = Calendar.getInstance();
            df.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(fim));
            df.add(Calendar.DATE, 1);

            List<Empenho> _objeto = repository.findAllByDataEmpenhoBetween(di.getTime(), df.getTime());

            List<EmpenhoDTO> objetoDTO = _objeto
                    .stream()
                    .map(o -> modelMapper.map(o, EmpenhoDTO.class))
                    .collect(Collectors.toList());

            for (EmpenhoDTO empenhoDTO : objetoDTO) {
                for (Empenho empenho : _objeto) {
                    if (empenhoDTO.getIdEmpenho() == empenho.getIdEmpenho()) {
                        empenhoDTO.setCodigoDespesa(empenho.getDespesa().getIdDespesa());
                        empenhoDTO.setCodigoProtocolo(empenho.getDespesa().getNumeroProtocolo());
                    }
                }
            }

            return objetoDTO;

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return new ArrayList<EmpenhoDTO>();
    }
}

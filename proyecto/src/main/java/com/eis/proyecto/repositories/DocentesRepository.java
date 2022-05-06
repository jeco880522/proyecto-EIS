/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.repositories;

import com.eis.proyecto.models.Docente;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author wilme
 */
@Repository
public interface DocentesRepository extends CrudRepository<Docente, Long>{
    @Override
    public List<Docente> findAll();

    @Override
    public Optional<Docente> findById(Long id);

    @Override
    public <D extends Docente> D save(D entity);
    
    @Override
    public void delete(Docente docente);
    
    @Override
    //Metodo que me dice si un docente existe o no
    public boolean existsById(Long id);
}
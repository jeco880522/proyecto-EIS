/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eis.proyecto.repositories;

import com.eis.proyecto.models.Estudiante;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author wilme
 */
@Repository
public interface EstudiantesRepository extends CrudRepository<Estudiante, Long>{
    @Override
    public List<Estudiante> findAll();

    @Override
    public Optional<Estudiante> findById(Long id);

    @Override
    public <E extends Estudiante> E save(E entity);
    
    @Override
    public void delete(Estudiante estudiante);
}

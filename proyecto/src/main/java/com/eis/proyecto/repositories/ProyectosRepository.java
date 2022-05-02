/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eis.proyecto.repositories;

import com.eis.proyecto.models.Proyecto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author wilme
 */
@Repository
public interface ProyectosRepository extends CrudRepository<Proyecto, Long>{
    @Override
    public List<Proyecto> findAll();

    @Override
    public Optional<Proyecto> findById(Long id);

    @Override
    public <P extends Proyecto> P save(P entity);
    
    @Override
    public void delete(Proyecto proyecto);
    
    @Query(value = "SELECT * FROM proyecto WHERE identif_doc_fk =:identif_doc_fk ", nativeQuery=true)
    public List <Proyecto> findAllIdentifDoc(Long identif_doc_fk);
}

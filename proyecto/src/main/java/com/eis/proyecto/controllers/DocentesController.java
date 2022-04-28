/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.controllers;

import com.eis.proyecto.models.Docente;
import com.eis.proyecto.repositories.DocentesRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author wilme
 */
@CrossOrigin(origins="*",allowedHeaders="*")
@RestController
public class DocentesController {
    @Autowired
    private DocentesRepository repository;
    
    //Get List 
    @GetMapping("/docentes")
    public List<Docente> findAllDocente(){
        return repository.findAll();
    }
    //Post
    @PostMapping("/docentes")
    public <D extends Docente> D saveDocente(@RequestBody Docente docente){
        return (D) repository.save(docente);
    }
    //Get docentes/ID
    @GetMapping("/docentes/{id}")
    public Optional<Docente> findByIdDocente(@PathVariable long id){
        return repository.findById(id);
    }
    //Put
    @PutMapping("/docentes/{nombre}")
    public Docente updateDocente(@PathVariable String nombre, @RequestBody Docente docente){
        docente.setNombre_doc(nombre);
        return repository.save(docente);
    }
    //Delete
    @DeleteMapping("/docentes")
    public String deleteDocente(@RequestBody Docente docente){
        repository.delete(docente);
        return "BORRADO";
    }
}
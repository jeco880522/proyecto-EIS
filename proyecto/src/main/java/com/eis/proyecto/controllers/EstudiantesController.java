/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.controllers;

import com.eis.proyecto.models.Estudiante;
import com.eis.proyecto.repositories.EstudiantesRepository;
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
public class EstudiantesController {
    @Autowired
    EstudiantesRepository repository;
    
    //Get List
    @GetMapping("/estudiantes")
    public List<Estudiante> findAllEstudiante(){
        return repository.findAll();
    }
    //Post
    @PostMapping("/estudiantes")
    public <E extends Estudiante> E saveEstudiante(@RequestBody Estudiante estudiante){
        return (E) repository.save(estudiante);
    }
    //Get estudiantes/ID
    @GetMapping("/estudiantes/{id}")
    public Estudiante findByIdEstudiante(@PathVariable Long id){
        return repository.findById(id).get();
    }
    //Put
    @PutMapping("/estudiantes/{nombre}")
    public Estudiante updateEstudiante(@PathVariable String nombre, @RequestBody Estudiante estudiante){
        estudiante.setNombre_est(nombre);
        return repository.save(estudiante);
    }
    //Delete
    @DeleteMapping("/estudiantes")
    public String deleteEstudiante(@RequestBody Estudiante estudiante){
        repository.delete(estudiante);
        return "BORRADO";
    }
    //Delete by ID
    @DeleteMapping("/estudiantes/{id}")
    public void deleteByIdEstudiante(@PathVariable Long id){
        repository.deleteById(id);
    }
    
}
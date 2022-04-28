/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.controllers;

import com.eis.proyecto.models.Proyecto;
import com.eis.proyecto.repositories.ProyectosRepository;
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
public class ProyectosController {
    @Autowired
    private ProyectosRepository repository;
    
    //Get List
    @GetMapping("/proyectos")
    public List<Proyecto> findAlProyecto(){
        return repository.findAll();
    }
    //Post
    @PostMapping("/proyectos")
    public <P extends Proyecto> P saveProyecto(@RequestBody Proyecto proyecto){
        return (P) repository.save(proyecto);
    }
    //Get servicios/ID
    @GetMapping("/proyectos/{id}")
    public Optional<Proyecto> findByIdProyecto(@PathVariable long id){
        return repository.findById(id);
    }
    //Put
    @PutMapping("/proyectos/{nombre}")
    public Proyecto updateEstudiante(@PathVariable String nombre, @RequestBody Proyecto proyecto){
        proyecto.setNombre_pro(nombre);
        return repository.save(proyecto);
    }
    //Delete
    @DeleteMapping("/proyectos")
    public String deleteProyecto(@RequestBody Proyecto proyecto){
        repository.delete(proyecto);
        return "BORRADO";
    }
}
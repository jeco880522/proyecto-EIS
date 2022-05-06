/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author wilme
 */

@Entity
@Table (name="docente")
public class Docente {
    @Id
    private Long identif_doc;
    private String nombre_doc;
    private String apellido_doc;
    private String nivel_educativo;
    private String correo_institucional_doc;
   
    public Docente() {
    }

    public Docente(Long identif_doc, String nombre_doc, String apellido_doc, String nivel_educativo, String correo_institucional_doc) {
        this.identif_doc = identif_doc;
        this.nombre_doc = nombre_doc;
        this.apellido_doc = apellido_doc;
        this.nivel_educativo = nivel_educativo;
        this.correo_institucional_doc = correo_institucional_doc;
    }
    
    public long getIdentif_doc() {
        return identif_doc;
    }

    public void setIdentif_doc(Long identif_doc) {
        this.identif_doc = identif_doc;
    }

    public String getNombre_doc() {
        return nombre_doc;
    }

    public void setNombre_doc(String nombre_doc) {
        this.nombre_doc = nombre_doc;
    }

    public String getApellido_doc() {
        return apellido_doc;
    }

    public void setApellido_doc(String apellido_doc) {
        this.apellido_doc = apellido_doc;
    }

    public String getNivel_educativo() {
        return nivel_educativo;
    }

    public void setNivel_educativo(String nivel_educativo) {
        this.nivel_educativo = nivel_educativo;
    }

    public String getCorreo_institucional_doc() {
        return correo_institucional_doc;
    }

    public void setCorreo_institucional_doc(String correo_institucional_doc) {
        this.correo_institucional_doc = correo_institucional_doc;
    }

}
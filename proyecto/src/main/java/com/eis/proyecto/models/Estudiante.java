/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author wilme
 */
@Entity
@Table (name="estudiante")
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_est;
    private long identif_est;
    private String nombre_est;
    private String apellido_est;
    private String correo_institucional_est;
    private long telefeno_est;

    public Estudiante() {
    }

    public Estudiante(long identif_est, String nombre_est, String apellido_est, String correo_institucional_est, long telefeno_est) {
        this.identif_est = identif_est;
        this.nombre_est = nombre_est;
        this.apellido_est = apellido_est;
        this.correo_institucional_est = correo_institucional_est;
        this.telefeno_est = telefeno_est;
    }

    public long getId_est() {
        return id_est;
    }

    public void setId_est(long id_est) {
        this.id_est = id_est;
    }

    public long getIdentif_est() {
        return identif_est;
    }

    public void setIdentif_est(long identif_est) {
        this.identif_est = identif_est;
    }

    public String getNombre_est() {
        return nombre_est;
    }

    public void setNombre_est(String nombre_est) {
        this.nombre_est = nombre_est;
    }

    public String getApellido_est() {
        return apellido_est;
    }

    public void setApellido_est(String apellido_est) {
        this.apellido_est = apellido_est;
    }

    public String getCorreo_institucional_est() {
        return correo_institucional_est;
    }

    public void setCorreo_institucional_est(String correo_institucional_est) {
        this.correo_institucional_est = correo_institucional_est;
    }

    public long getTelefeno_est() {
        return telefeno_est;
    }

    public void setTelefeno_est(long telefeno_est) {
        this.telefeno_est = telefeno_est;
    }
}
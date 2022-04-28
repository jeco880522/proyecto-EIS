/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eis.proyecto.models;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 *
 * @author wilme
 */
@Entity
@Table (name="proyecto")
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_pro;
    private String nombre_pro;
    
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date fecha_limite;
    
    private byte[] archivo_pro;
    private boolean estado_pro;
    private String retroalimentacion_pro;
    @ManyToOne
    @JoinColumn(name="id_est_Fk")
    private Estudiante estudiante;
    
    @ManyToOne
    @JoinColumn(name="id_doc_Fk")
    private Docente docente;

    public Proyecto() {
    }

    public Proyecto(String nombre_pro, Date fecha_limite, byte[] archivo_pro, boolean estado_pro, String retroalimentacion_pro, Estudiante estudiante, Docente docente) {
        this.nombre_pro = nombre_pro;
        this.fecha_limite = fecha_limite;
        this.archivo_pro = archivo_pro;
        this.estado_pro = estado_pro;
        this.retroalimentacion_pro = retroalimentacion_pro;
        this.estudiante = estudiante;
        this.docente = docente;
    }

    public long getId_pro() {
        return id_pro;
    }

    public void setId_pro(long id_pro) {
        this.id_pro = id_pro;
    }

    public String getNombre_pro() {
        return nombre_pro;
    }

    public void setNombre_pro(String nombre_pro) {
        this.nombre_pro = nombre_pro;
    }

    public Date getFecha_limite() {
        return fecha_limite;
    }

    public void setFecha_limite(Date fecha_limite) {
        this.fecha_limite = fecha_limite;
    }

    public byte[] getArchivo_pro() {
        return archivo_pro;
    }

    public void setArchivo_pro(byte[] archivo_pro) {
        this.archivo_pro = archivo_pro;
    }

    public boolean isEstado_pro() {
        return estado_pro;
    }

    public void setEstado_pro(boolean estado_pro) {
        this.estado_pro = estado_pro;
    }

    public String getRetroalimentacion_pro() {
        return retroalimentacion_pro;
    }

    public void setRetroalimentacion_pro(String retroalimentacion_pro) {
        this.retroalimentacion_pro = retroalimentacion_pro;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }

    public Docente getDocente() {
        return docente;
    }

    public void setDocente(Docente docente) {
        this.docente = docente;
    }
}
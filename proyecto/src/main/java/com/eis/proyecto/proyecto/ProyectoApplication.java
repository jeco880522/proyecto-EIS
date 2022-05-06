package com.eis.proyecto.proyecto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//Escanea los componente del paquete "com.eis.proyecto"
@ComponentScan(basePackages = "com.eis.proyecto")
//Habilita JPA en el paquete "com.eis.proyecto"
@EnableJpaRepositories(basePackages = "com.eis.proyecto")
//Escanea todas las entidades del paquete "com.eis.proyecto"
@EntityScan("com.eis.proyecto")
public class ProyectoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApplication.class, args);
	}

}

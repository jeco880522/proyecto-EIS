CREATE TABLE "estudiante" (
  "id_est" serial PRIMARY KEY NOT NULL,
  "identif_est" bigint NOT NULL,
  "nombre_est" varchar NOT NULL,
  "apellido_est" varchar NOT NULL,
  "correo_institucional_est" varchar NOT NULL,
  "telefono_est" bigint NOT NULL
);

CREATE TABLE "docente" (
  "identif_doc" bigint PRIMARY KEY NOT NULL,
  "nombre_doc" varchar NOT NULL,
  "apellido_doc" varchar NOT NULL,
  "nivel_educativo" varchar NOT NULL,
  "correo_institucional_doc" varchar NOT NULL
);

CREATE TABLE "proyecto" (
  "id_pro" serial PRIMARY KEY NOT NULL,
  "nombre_pro" varchar NOT NULL,
  "fecha_limite" date NOT NULL,
  "archivo_pro" bytea,
  "estado_pro" varchar,
  "retroalimentacion_pro" varchar,
  "id_est_fk" bigint NOT NULL,
  "identif_doc_fk" bigint NOT NULL
);

ALTER TABLE "proyecto" ADD FOREIGN KEY ("identif_doc_fk") REFERENCES "docente" ("identif_doc");

ALTER TABLE "proyecto" ADD FOREIGN KEY ("id_est_fk") REFERENCES "estudiante" ("id_est");

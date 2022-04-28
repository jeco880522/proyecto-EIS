CREATE TABLE "estudiante" (
  "id_est" serial PRIMARY KEY,
  "identif_est" bigint,
  "nombre_est" varchar,
  "apellido_est" varchar,
  "correo_institucional_est" varchar,
  "telefono_est" bigint
);

CREATE TABLE "docente" (
  "id_doc" serial PRIMARY KEY,
  "identif_doc" bigint,
  "nombre_doc" varchar,
  "apellido_doc" varchar,
  "nivel_educativo" varchar,
  "correo_institucional_doc" varchar
);

CREATE TABLE "proyecto" (
  "id_pro" serial PRIMARY KEY,
  "nombre_pro" varchar,
  "fecha_limite" date,
  "archivo_pro" bytea,
  "estado_pro" boolean,
  "retroalimentacion_pro" varchar,
  "id_est_fk" bigint,
  "id_doc_fk" bigint
);

ALTER TABLE "proyecto" ADD FOREIGN KEY ("id_doc_fk") REFERENCES "docente" ("id_doc");

ALTER TABLE "proyecto" ADD FOREIGN KEY ("id_est_fk") REFERENCES "estudiante" ("id_est");

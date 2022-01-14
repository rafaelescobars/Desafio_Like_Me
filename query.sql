-- --Cambiarse a base postgres\ c postgres;

--Create a new database called 'likeme'
CREATE DATABASE likeme;

--Conexión base library\ c likeme;
\c likeme;

--Encoding UTF8
SET client_encoding TO 'UTF8';

--Crear Tablas
CREATE TABLE posts(
  id SERIAL,
  usuario VARCHAR(50),
  url VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT,
  PRIMARY KEY(id)
);
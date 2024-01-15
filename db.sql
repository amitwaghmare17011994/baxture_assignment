create database baxture_assignment;

\c baxture_assignment;

create user root with password 'root';

create table files(id serial,file_name text,file_path text,created_at Date,updated_at Date);

create table tasks(id serial,operation text,options text,result text,created_at Date,updated_at Date);

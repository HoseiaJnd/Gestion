create database compta;
\c compta;

create table matiere (
    id serial primary key,
    rubriques varchar(500),
    total decimal(20,2),
    unite varchar(100),
    nature varchar(100),
    adm_dist decimal(20,2),
    v_adm_dist decimal(20,2),
    usine decimal(20,2),
    v_usine decimal(20,2),
    prod decimal(20,2),
    v_prod decimal(20,2)
);

CREATE OR REPLACE VIEW total_v_matiere AS 
SELECT 
    COALESCE(SUM(v_adm_dist), 0) AS total_adm_dist,
    COALESCE(SUM(v_usine), 0) AS total_usine,
    COALESCE(SUM(v_prod), 0) AS total_prod
FROM matiere;


create table repartition (
    id serial primary key,
    nom varchar(100),
    total_initial decimal(20,2),
    cles decimal(20,2),
    v_cles decimal(20,2),
    total_final decimal(20,2)
);
insert into repartition (nom, total_initial, cles, v_cles, total_final) values
    ('usine', 0, 0, 0, 0),
    ('prod', 0, 0, 0, 0);

create table cout_direct (
    id serial primary key,
    unite_produit varchar(100),
    nombre_produit decimal(20,2),
    cout_prod decimal(20,2),
    cout_unitaire_direct decimal(20,2)
);

create table cout_fini (
    id serial primary key,
    unite_produit varchar(100),
    nombre_produit decimal(20,2),
    cout_prod decimal(20,2),
    cout_usine decimal(20,2),
    cout_total decimal(20,2),
    cout_unitaire_final decimal(20,2)
);

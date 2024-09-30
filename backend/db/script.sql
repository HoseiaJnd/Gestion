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

-- Données à entrer dans les inputs
    -- Achat de tracteur; 10000000; Tracteurs; F; 5; 10; 2
    -- Achat de coton brut; 5000000; Tonnes; V; 3; 20; 15
    -- Entretien des machines; 1500000; Interventions; F; 2; 12; 5
    -- Frais de transport; 800000; Kilomètres; V; 4; 8; 10
    -- Achat de pièces détachées; 2000000; Pièces; V; 3; 5; 7
    -- Achat d'engrais; 3500000; Sacs; v; 3.5; 6; 8
    -- Frais de publicité; 1000000; Campagnes; F; 5; 0; 0
    -- Salaires des ouvriers; 6000000; Ouvriers; v; 0; 15; 5
    -- Électricité usine; 2500000; Kilowattheures; f; 0; 20; 10
    -- Location des entrepôts; 4000000; Mois; f; 2; 10; 3
    -- Achat de carburant; 2000000; Litres; v; 1.5; 12; 7
    -- Maintenance des véhicules; 1200000; Interventions; f; 2; 8; 4
    -- Achat de semences; 2800000; Sacs; v; 4; 7; 9

-- Couts directs
    -- Tonnes de coton brut; Tonnes de coton traité; 500; 450
    Tonnes de coton à transporter; Tonnes de coton transporté; 210; 210
-- Create the 'compta' database
CREATE DATABASE compta;

-- Switch to the 'compta' database
USE compta;

-- Create 'matiere' table
CREATE TABLE matiere (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rubriques VARCHAR(500),
    total DECIMAL(20,2),
    unite VARCHAR(100),
    nature VARCHAR(100),
    adm_dist DECIMAL(20,2),
    v_adm_dist DECIMAL(20,2),
    usine DECIMAL(20,2),
    v_usine DECIMAL(20,2),
    prod DECIMAL(20,2),
    v_prod DECIMAL(20,2)
);

-- Create the 'total_v_matiere' view
CREATE OR REPLACE VIEW total_v_matiere AS 
SELECT 
    COALESCE(SUM(v_adm_dist), 0) AS total_adm_dist,
    COALESCE(SUM(v_usine), 0) AS total_usine,
    COALESCE(SUM(v_prod), 0) AS total_prod
FROM matiere;

-- Create 'repartition' table
CREATE TABLE repartition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    total_initial DECIMAL(20,2),
    cles DECIMAL(20,2),
    v_cles DECIMAL(20,2),
    total_final DECIMAL(20,2)
);

-- Insert initial values into 'repartition' table
INSERT INTO repartition (nom, total_initial, cles, v_cles, total_final) 
VALUES
    ('usine', 0, 0, 0, 0),
    ('prod', 0, 0, 0, 0);

-- Create 'cout_direct' table
CREATE TABLE cout_direct (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unite_produit VARCHAR(100),
    nombre_produit DECIMAL(20,2),
    cout_prod DECIMAL(20,2),
    cout_unitaire_direct DECIMAL(20,2)
);

-- Create 'cout_fini' table
CREATE TABLE cout_fini (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unite_produit VARCHAR(100),
    nombre_produit DECIMAL(20,2),
    cout_prod DECIMAL(20,2),
    cout_usine DECIMAL(20,2),
    cout_total DECIMAL(20,2),
    cout_unitaire_final DECIMAL(20,2)
);

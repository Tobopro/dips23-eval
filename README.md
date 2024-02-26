# README - Travail Pratique Noté

Ce README fournit des instructions pour démarrer le travail pratique noté, comprenant à la fois le backend de l'API et le frontend de l'application.

## Backend - API :

1. **Cloner le Projet :**
    - Clonez le projet depuis le référentiel distant.

2. **Configuration de la Base de Données :**
    - Créez une base de données nommée `invoices`.
    - Exécutez le script SQL fourni pour créer les tables `clients` et `invoices`, ainsi que pour insérer des données d'exemple.

```sql
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE invoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoiceNumber VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    paymentDate DATE NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'en attente',
    amount DECIMAL(10, 2) NOT NULL,
    clientId INT NOT NULL,
    FOREIGN KEY (clientId) REFERENCES clients(id)
);

INSERT INTO clients (lastName, firstName, email) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com'),
('Martin', 'Sophie', 'sophie.martin@example.com'),
('Dubois', 'Pierre', 'pierre.dubois@example.com'),
('Lefebvre', 'Marie', 'marie.lefebvre@example.com'),
('Moreau', 'Paul', 'paul.moreau@example.com'),
('Garcia', 'Isabelle', 'isabelle.garcia@example.com'),
('Fournier', 'Thomas', 'thomas.fournier@example.com'),
('Roux', 'Caroline', 'caroline.roux@example.com'),
('Leroy', 'Antoine', 'antoine.leroy@example.com'),
('Girard', 'Catherine', 'catherine.girard@example.com');

INSERT INTO invoices (invoiceNumber, title, paymentDate, amount, clientId) VALUES
('INV2024001', 'Audit de performance', NULL, 150.00, 1),
('INV2024002', 'Développement site vitrine', NULL, 1200.00, 2),
('INV2024003', 'Maintenance système', NULL, 300.00, 3),
('INV2024004', 'Développement site e-commerce', NULL, 2450.00, 4),
('INV2024005', 'Développement application mobile', NULL, 2000.00, 5),
('INV2024006', 'Audit SEO', NULL, 800.00, 6),
('INV2024007', 'Formation en ligne', NULL, 250.00, 7),
('INV2024008', 'Développement site de prise de rendez-vous', NULL, 1500.00, 8),
('INV2024009', 'Maintenance site web', NULL, 350.00, 9),
('INV2024010', 'Conception graphique', NULL, 1800.00, 10);
```


3. **Lancement de l'API :**
    - Ouvrez un terminal.
    - Déplacez-vous dans le répertoire `api` du projet.
    - Exécutez la commande `npm install` pour installer tous les packages.
    - Exécutez la commande `npm run start` pour démarrer le serveur.


## Frontend :

1. **Fichiers Disponibles :**
    - Le fichier `index.html` est fourni pour l'interface utilisateur.
    - Les styles CSS nécessaires sont inclus dans le fichier

2. Vous disposez egalement de la maquette dans le dossier `ressources` 

## Endpoints de l'API :

Voici un tableau décrivant les endpoints de l'API avec leurs méthodes HTTP, les endpoints, les corps de requête, les réponses attendues et les fonctions associées :

## L'api écoute sur le port 3000 : http://localhost:3000

| Verbe   | Endpoint                | Requête Body                                     | Réponse Attendue                                     | Fonction           |
|:---------:|:-------------------------:|:--------------------------------------------------:|:------------------------------------------------------:|:--------------------:|
| GET     | /api/invoices           | -                                                | `{"status": "success", data: [ tableau de factures ]}` | Récupérer Factures |
| GET     | /api/invoices/:id       | -                                                | `{"status": "success", data: { une seule facture }} `  | Récupérer Facture  |
| POST    | /api/invoices           | `{"invoiceNumber": string, "title": string, "amount": number, "clientId": number}` | `{"status": string, "message": string}`            | Ajouter Facture    |
| PATCH   | /api/invoices/:id       | `{"status": "payée", "paymentDate": "2024-02-20"}` | `{"status": string, "message": string}`                 | Modifier Facture   |
| DELETE  | /api/invoices/:id       | -                                                | `{"status": string, "message": string}    `             | Supprimer Facture  |
| GET     | /api/clients            | -                                                | `{"status": "success", data: [ tableau de clients ]}`   | Récupérer Clients  |


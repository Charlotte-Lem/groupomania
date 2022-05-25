# PROJET 7 OPENCLASSROOMS GROUPOMANIA

## Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Mise en place du backend, du frontend et de la base de données.

---

_Utilisation de_:

- MySql et Sequelyze

- NodeJS

- express

- divers packages npm

## FRONT :

_Utilisation de_:

- ReactJs

---

# INSTALLATION

---

Clonez ce repository :

```

git clone https://github.com/Charlotte-Lem/groupomania.git

```

Dans le dossier back-end, modifier le fichier :

`.sample.env`

en

`.env`

🔑 et compléter avec vos informations :

```
#PORT DU SERVEUR
PORT=""

#SECRET KEY POUR LE TOKEN
TOKEN = ""


# IDENTIFIANT CONCERNANT LA BASE DE DONNEES
 DB_HOST = ""
 DB_USER = ""
 DB_NAME = ""
 DB_PASSWORD = ""
 DB_DIALECT = ""


 #URL CLIENT
 CLIENT_URL = ""
```

Créer ensuite, toujours dans le dossier back-end, un dossier :

`images`

---

# BASE DE DONNEES

**Une base donnée est nécessaire pour le fonctionnement du site web. La configuration de celle-ci se trouve dans le back-end sur le chemin :**

`./config/database.js`

---

# Lancement du projet :

- **BACKEND**

```bash

cd Groupomania

npm install

nodemon server

```

- **FRONTEND (client)**

```bash

cd client

npm install

npm start

```

---

### @github.com/Charlotte-Lem

---

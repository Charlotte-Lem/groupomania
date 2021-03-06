# PROJET 7 OPENCLASSROOMS GROUPOMANIA

## Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Mise en place du backend, du frontend et de la base de données.

_Utilisation de_:

- MySql et Sequelize

- NodeJS

- express

- divers packages npm

- ReactJs

---

# INSTALLATION

Clonez ce repository :

```

git clone https://github.com/Charlotte-Lem/groupomania.git

```

Dans le dossier backend, modifier le fichier :

`.sample.env`

en

`.env`

et compléter avec vos informations 🔑 :

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

Créer ensuite, toujours dans le dossier backend, un dossier :

`images`

---

# BASE DE DONNEES

**Une base donnée est nécessaire pour le fonctionnement du site web. La configuration de celle-ci se trouve dans le back-end sur le chemin :**

`./config/database.js`

---

# LANCEMENT DU PROJET :

- **BACKEND**

```bash

cd backend

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



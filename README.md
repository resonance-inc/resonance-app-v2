# RESONANCE

Application de mise en relation d'acteurs amateurs du milieu de la production musicale.

## 📋 Description

RESONANCE est une plateforme web dédiée à la connexion entre artistes, producteurs, ingénieurs du son et autres professionnels amateurs de l'industrie musicale. L'application facilite la collaboration et le réseautage dans l'écosystème de la production musicale.

## 🚀 Technologies

- **Framework** : [Next.js 16](https://nextjs.org) avec React 19
- **Langage** : TypeScript 5
- **Base de données** : [Prisma ORM 7](https://www.prisma.io) avec MariaDB
- **Authentification** : [Better Auth 1.4](https://www.better-auth.com)
- **Emails** : [Resend](https://resend.com) avec React Email
- **UI** : [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Validation** : [Zod](https://zod.dev) + React Hook Form

## 🛠️ Installation

### Prérequis

- Node.js 20+
- npm, yarn, pnpm ou bun
- Base de données MariaDB/MySQL

### Configuration

1. Cloner le dépôt :

```bash
git clone https://github.com/resonance-inc/resonance-app-v2.git
cd resonance-app-v2
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer les variables d'environnement :

```bash
cp .default.env .env
```

Remplir le fichier `.env` avec vos configurations :

- `DATABASE_URL` : URL de connexion à la base de données
- `BETTER_AUTH_SECRET` : Clé secrète pour Better Auth
- `BETTER_AUTH_URL` : URL de l'application (ex: http://localhost:3000)
- `RESEND_API_KEY` : Clé API Resend pour l'envoi d'emails
- `RESEND_FROM_EMAIL` : Email expéditeur pour les notifications

4. Initialiser la base de données :

```bash
npm run db:migrate
```

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Mode production

```bash
npm run build
npm start
```

## 📜 Scripts disponibles

- `npm run dev` : Démarrer le serveur de développement
- `npm run build` : Créer le build de production
- `npm start` : Démarrer le serveur de production
- `npm run lint` : Vérifier le code avec ESLint
- `npm run db:migrate` : Exécuter les migrations de base de données
- `npm run db:push` : Pousser les changements du schéma vers la base de données
- `npm run db:studio` : Ouvrir Prisma Studio
- `npm run db:reset` : Réinitialiser la base de données
- `npm run db:generate` : Générer le client Prisma

## 📁 Structure du projet

```
resonance-app-v2/
├── app/                    # Routes Next.js (App Router)
│   ├── (auth)/            # Pages d'authentification
│   ├── (main)/            # Pages principales de l'application
│   └── api/               # Routes API
├── prisma/                # Schéma et migrations Prisma
├── src/
│   ├── components/        # Composants React
│   │   ├── auth/         # Composants d'authentification
│   │   ├── emails/       # Templates d'emails
│   │   └── ui/           # Composants UI réutilisables
│   ├── lib/              # Utilitaires et configurations
│   └── generated/        # Code généré par Prisma
└── public/               # Fichiers statiques
```

## 🔐 Authentification

L'application utilise Better Auth avec les fonctionnalités suivantes :

- Inscription avec vérification d'email
- Connexion sécurisée
- Réinitialisation de mot de passe
- Gestion de session

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez créer une pull request depuis une branche de feature vers `dev`.

## 📄 Licence

Ce projet est privé et propriétaire de RESONANCE Inc.

## 📞 Contact

Pour toute question, veuillez contacter l'équipe RESONANCE.

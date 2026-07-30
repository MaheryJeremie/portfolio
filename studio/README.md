# Portfolio Studio (Sanity)

Project: `fqck037q` · Dataset: `production`

## Démarrer le Studio

```bash
cd studio
npm install
npm run dev
```

Ouvre http://localhost:3333 — connecte-toi avec le compte Sanity lié au projet.

Depuis la racine du portfolio :

```bash
npm run studio
```

## Importer le contenu actuel (fr.js / en.js)

```bash
cd studio
node scripts/generate-seed.mjs
npx sanity dataset import seed.ndjson production
```

Les traductions locales dans `src/translations/` restent en **fallback** si Sanity est vide ou injoignable.

## CORS

Dans [sanity.io/manage](https://www.sanity.io/manage/project/fqck037q/api) → API → CORS origins, ajoute :

- `http://localhost:3000`
- ton domaine de prod (Netlify, etc.)

Coche **Allow credentials** seulement si tu utilises un token privé (pas nécessaire en lecture publique).

## Déployer le Studio

```bash
npm run studio:deploy
```

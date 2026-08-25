# Fahint Electric Website

Official source repository for the Fahint Electric international website.

## Local preview

```bash
npm install
npm run dev
```

## Production build

```bash
npm test
npm run build
```

## Deployment

Every push to the `main` branch is built and deployed automatically by the GitHub Pages workflow in `.github/workflows/deploy.yml`.

The workflow is preconfigured for this GitHub project path:

```text
/fahint-electric-website/
```

For a custom domain, add a repository variable named `SITE_BASE` with the value `/`, then set `CUSTOM_DOMAIN` to the domain name.

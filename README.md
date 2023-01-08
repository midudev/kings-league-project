# For README in English
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Pabl0Parra/kings-league-project/blob/main/README.en.md)

# Kings League Project

[![Deploy API](https://github.com/midudev/kings-league-project/actions/workflows/deploy-api.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/deploy-api.yml)

[![Scrape Kings League Infojobs Website](https://github.com/midudev/kings-league-project/actions/workflows/scrape-kings-league-web.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/scrape-kings-league-web.yml)

## LightHouse

[![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](./test_results/lighthouse_best-practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)](https://github.com/emazzotta/lighthouse-badges)

Este proyecto tiene como objetivo crear una API y página web de la Kings League con fines educativos.

## API

Puedes probar la API en:

https://api.kingsleague.dev/

Los siguientes son los endpoints disponibles en la API:

- GET `/leaderboard`: Devuelve la clasificación de la Kings League.
- GET `/teams`: Devuelve todos los equipos de la Kings League.
- GET `/teams/:id`: Devuelve un equipo de la Kings League.
- GET `/presidents`: Devuelve todos los presidentes de la Kings League.
- GET `/presidents/:id`: Devuelve un presidente de la Kings League.
- GET `/coaches`: Devuelve todos los entrenadores de la Kings League.
- GET `/coaches/:teamId`: Devuelve el entrenador de un equipo de la Kings League.
- GET `/top-scorers`: Devuelve los goleadores más destacados de la Kings League.
- GET `/top-scorers/:rank`: Devuelve el goleador más destacado de acurdo a su posicion en la lista de la Kings League.
- GET `/top-assists`: Devuelve los asistentes más destacados de la Kings League.
- GET `/top-assists/:rank`: Devuelve el asistente más destacado de acuerdo a su posicion en la lista de la Kings League.
- GET `/mvp`: Devuelve los MVPs de la Kings League.

¡Síguenos en nuestro canal de Twitch para ver cómo avanzamos en el desarrollo de la página web!

https://twitch.tv/midudev

Nota: Este proyecto todavía se encuentra en desarrollo y no debe ser utilizado aún.

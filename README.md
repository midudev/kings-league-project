# [Kings League Project](https://api.kingsleague.dev/)

[![Deploy API](https://github.com/midudev/kings-league-project/actions/workflows/deploy-api.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/deploy-api.yml)

[![Scrape Kings League Infojobs Website](https://github.com/midudev/kings-league-project/actions/workflows/scrape-kings-league-web.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/scrape-kings-league-web.yml)

## LightHouse

[![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](./test_results/lighthouse_best-practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)](https://github.com/emazzotta/lighthouse-badges)

## Descripcion 

Este proyecto tiene como objetivo crear una API y página web de la Kings League con fines educativos.
La API proporciona acceso a datos de equipos, presidentes, entrenadores, goleadores y asistentes de la Kings League, y la página web ofrece información sobre los equipos, resultados y clasificaciones de la liga.

La  Api esta construida utilizando "Web scraping" raspado web, hemos utilizado Node.js, Hono y el servicio de hosting de APIs Cloudflare Workers para construir la API. La página web está desarrollada con el framework Astro y utilizamos el framework CSS Tailwind para estilizar la interfaz de usuario. Además, hemos utilizado la librería Cherrio para realizar web scraping y obtener datos de la Kings League.

Para probar y validar el funcionamiento de la aplicación, hemos utilizado la librería de pruebas ViteTest.

Si quieres ayudarnos, por favor toma un momento para leer el archivo [CONTRIBUTING.md](https://github.com/midudev/kings-league-project/blob/main/CONTRIBUTING.md) Allí encontrarás información útil sobre cómo contribuir de manera efectiva y cómo seguir nuestras guías de estilo. ¡Esperamos que disfrutes colaborando con nosotros!

## API

Puedes probar la API en:

https://api.kingsleague.dev/

## API ENDPOINTS

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

## REDES SOCIALES

¡Síguenos en nuestro canal de Twitch para ver cómo avanzamos en el desarrollo de la página web o siguenos en Youtube para mas desarollo web!

* [Twitct](https://twitch.tv/midudev)  
* [YouTube](https://www.youtube.com/c/midudev)

o unete a la comunidad en [Discord](https://discord.gg/midudev)

## ATENCION ⚠️

Nota: Este proyecto todavía se encuentra en desarrollo y no debe ser utilizado aún.

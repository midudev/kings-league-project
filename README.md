<div align="center">
<h1>👑 Kings League Infojobs Project ⚽️

[![Deploy API](https://github.com/midudev/kings-league-project/actions/workflows/deploy-api.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/deploy-api.yml) [![Scrape Kings League Infojobs Website](https://github.com/midudev/kings-league-project/actions/workflows/scrape-kings-league-web.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/scrape-kings-league-web.yml)

<h2><a href='https://api.kingsleague.dev/'>API</a> | <a href='https://kingsleague.dev'>WEB</a></h2>
</h1>
</div>

## Descripcion del proyecto

Este proyecto tiene como objetivo crear una API y página web de la [Kings League Infojobs](https://kingsleague.pro) con fines educativos.

La API proporciona acceso a datos de equipos, presidentes, entrenadores, goleadores y asistentes de la Kings League, y la página web ofrece información sobre los equipos, resultados y clasificaciones de la liga.

### Tecnologías usadas

Para recuperar los datos de la API, usamos _Web Scraping_, [Node.js](https://nodejs.org/es/), [Hono](https://honojs.dev/) y el servicio de hosting de APIs [Cloudflare Workers](https://workers.cloudflare.com/) para la construcción y el despliegue.

La página web está desarrollada con el framework [Astro](https://astro.build/) y utilizamos el framework [CSS Tailwind](https://tailwindcss.com/) para estilizar la interfaz de usuario. Además, hemos utilizado la librería [Cherrio](https://github.com/cheeriojs/cheerio) para realizar _Web Scraping_ y obtener datos de la **Kings League Infojobs**.

Para probar y validar el funcionamiento de la aplicación, hemos utilizado la librería de pruebas [Vitest](https://vitest.dev/).

Si quieres ayudarnos, por favor toma un momento para leer el archivo [CONTRIBUTING.md](https://github.com/midudev/kings-league-project/blob/main/CONTRIBUTING.md). Allí encontrarás información útil sobre cómo contribuír de manera efectiva y cómo seguir nuestras guías de estilo. ¡Esperamos que disfrutes colaborando con nosotros!

## API

Dirección: https://api.kingsleague.dev/

Los endpoints disponibles son:

- GET `/leaderboard`: Devuelve la clasificación de la Kings League.
- GET `/teams`: Devuelve todos los equipos de la Kings League.
- GET `/teams/:id`: Devuelve un equipo de la Kings League.
- GET `/teams/:id/player-12`: Devuelve un jugador 12 de un equipo de la Kings League.
- GET `/presidents`: Devuelve todos los presidentes de la Kings League.
- GET `/presidents/:id`: Devuelve un presidente de un equipo de la Kings League.
- GET `/coaches`: Devuelve todos los entrenadores de la Kings League.
- GET `/coaches/:teamId`: Devuelve el entrenador de un equipo de la Kings League.
- GET `/top-scorers`: Devuelve los goleadores más destacados de la Kings League.
- GET `/top-scorers/:rank`: Devuelve el goleador más destacado de acuerdo a su posición en el ranking de la Kings League.
- GET `/top-assists`: Devuelve los asistentes más destacados de la Kings League.
- GET `/top-assists/:rank`: Devuelve el asistente más destacado de acuerdo a su posición en el ranking de la Kings League.
- GET `/mvp`: Devuelve los MVPs de la Kings League.
- GET `/mvp/:rank`: Devuelve el MVP de la Kings League segun el ranking que le pidamos.
- GET `/schedule`: Devuelve el calendario de partidos de la Kings League y el resultado de los partidos jugados.
- GET `/players-12`: Devuelve los jugadores 12 de la Kings League.

## Redes Sociales

¡Síguenos en nuestro canal de Twitch para ver cómo avanzamos en el desarrollo del proyecto o síguenos en Youtube para más contenido acerca de desarrollo fullstack!

- [Twitch](https://twitch.tv/midudev)
- [YouTube](https://www.youtube.com/c/midudev)

o únete a la comunidad en [Discord](https://discord.gg/midudev)

## LightHouse

[![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse Best Practices Badge](./test_results/lighthouse_best-practices.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)](https://github.com/midudev/kings-league-project)

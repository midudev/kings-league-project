<!-- LANGUAGES -->
<!-- en -->

<div align="center">
<h1>👑 Kings League Infojobs Project ⚽️

[![Deploy API](https://github.com/midudev/kings-league-project/actions/workflows/deploy-api.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/deploy-api.yml) [![Scrape Kings League Infojobs Website](https://github.com/midudev/kings-league-project/actions/workflows/scrape-kings-league-web.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/scrape-kings-league-web.yml)

<h2><a href='https://api.kingsleague.dev/'>API</a> | <a href='https://kingsleague.dev'>WEB</a></h2>
</h1>
</div>

## Project Description

This project aims to create an API and web page for the [Kings League Infojobs](https://kingsleague.pro) for educational purposes.

The API provides access to data for teams, presidents, coaches, goal scorers, and assistants in the Kings League, and the web page offers information on the teams, results, and rankings in the league.

### Technologies Used

To retrieve the data for the API, we use *Web Scraping*, [Node.js](https://nodejs.org/en/), [Hono](https://honojs.dev/), and the API hosting service [Cloudflare Workers](https://workers.cloudflare.com/) for building and deployment.

The web page is developed using the [Astro](https://astro.build/) framework and we use the [CSS Tailwind](https://tailwindcss.com/) framework to style the user interface. We have also used the [Cherrio](https://github.com/cheeriojs/cheerio) library to perform *Web Scraping* and obtain data from the **Kings League Infojobs**.

To test and validate the functionality of the application, we have used the [Vitest](https://vitest.dev/) testing library.

If you would like to help us, please take a moment to read the [CONTRIBUTING.md](https://github.com/midudev/kings-league-project/blob/main/CONTRIBUTING.md) file. You will find useful information there on how to effectively contribute and follow our style guides. We hope you enjoy collaborating with us!

## API

Address: https://api.kingsleague.dev/

The available endpoints are:

- GET `/leaderboard`: Returns the ranking for the Kings League.
- GET `/teams`: Returns all teams in the Kings League.
- GET `/teams/:id`: Returns a team in the Kings League.
- GET `/teams/:id/player-12`: Returns a player 12 for a team in the Kings League.
- GET `/presidents`: Returns all presidents in the Kings League.
- GET `/presidents/:id`: Returns a president for a team in the Kings League.
- GET `/coaches`: Returns all coaches in the Kings League.
- GET `/coaches/:id`: Returns a coach for a team in the Kings League.
- GET `/scorers`: Returns all goal scorers in the Kings League.
- GET `/scorers/:id`: Returns a goal scorer for a team in the Kings League.
- GET `/assists`: Returns all assist providers in the Kings League.
- GET `/assists/:id`: Returns an assist provider for a team in the Kings League.

## Social Media

Follow us on our Twitch channel to see how we are progressing in the development of the project or follow us on YouTube for more content about full-stack development!

- [Twitch](https://twitch.tv/midudev)
- [YouTube](https://www.youtube.com/c/midudev)

or join the community on [Discord](https://discord.gg/midudev)

## LightHouse

[![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse Best Practices Badge](./test_results/lighthouse_best-practices.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)](https://github.com/midudev/kings-league-project)
[![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)](https://github.com/midudev/kings-league-project)
#### Para README en español
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/Pabl0Parra/kings-league-project/blob/main/README.md)

# Kings League Project

[![Deploy API](https://github.com/midudev/kings-league-project/actions/workflows/deploy-api.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/deploy-api.yml)

[![Scrape Kings League Infojobs Website](https://github.com/midudev/kings-league-project/actions/workflows/scrape-kings-league-web.yml/badge.svg?branch=main)](https://github.com/maikCyphlock/kings-league-project/actions/workflows/scrape-kings-league-web.yml)

## LightHouse

[![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](./test_results/lighthouse_best-practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)](https://github.com/emazzotta/lighthouse-badges)

This project aims to create an API and web page for the Kings League for educational purposes.

## API
You can test the API at:

https://api.kingsleague.dev/

The following are the available endpoints in the API:

- GET `/leaderboard`: Returns the ranking of the Kings League.
- GET `/teams`: Returns all the teams in the Kings League.
- GET `/teams/:id`: Returns a team from the Kings League.
- GET `/presidents`: Returns all the presidents of the Kings League.
- GET `/presidents/`:id: Returns a president from the Kings League.
- GET `/coaches`: Returns all the coaches in the Kings League.
- GET `/coaches/`:teamId: Returns the coach of a team from the Kings League.
- GET `/top-scorers`: Returns the top scorers in the Kings League.
- GET `/top-scorers/:rank`: Returns the top scorer according to their position on the Kings League list.
- GET `/top-assists`: Returns the top assist leaders in the Kings League.
- GET `/top-assists/`:rank: Returns the top assist leader according to their position on the Kings League list.
- GET `/mvp`: Returns the MVPs of the Kings League.

Follow us on our Twitch channel to see how we progress in the development of the web page!

https://twitch.tv/midudev

***Note: This project is still in development and should not be used yet.***
'use strict';

const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');
const pinoHttp = require('pino-http');
const requireDirectory = require('require-directory');
const config = require('../../config');
const {
  handleBookshelfError,
  handleBoomError,
  handleCheckitError,
  handleError,
  handlePostgresUniqueError,
  handleRouteNotFoundError,
  rollbackTransaction,
} = require('../middleware');

module.exports = (app) => {
  // Helmet 8 sends `Cross-Origin-Resource-Policy: same-origin` by default,
  // which would stop browsers on other origins from reading this JSON API.
  // Helmet 4 (the previous version) did not send it, so keep that behaviour.
  app.use(
    helmet({
      crossOriginResourcePolicy: {policy: 'cross-origin'},
    }),
  );
  app.use(cors());
  app.use(pinoHttp({level: config.get('pino.level')}));
  app.use(passport.initialize());

  requireDirectory(module, path.join(__dirname, '..'), {
    include: /router\.js$/,
    visit: (router) => app.use(router),
  });

  app.use(handleRouteNotFoundError);

  app.use(rollbackTransaction);
  app.use(handleCheckitError);
  app.use(handleBookshelfError);
  app.use(handlePostgresUniqueError);
  app.use(handleBoomError);
  app.use(handleError);
};

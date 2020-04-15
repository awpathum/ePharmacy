import React from "react";

// function init() {
//   Sentry.init({
//     dsn:
//       "https://e314c36b63c34fff81a04b79e96a65d2@o377064.ingest.sentry.io/5198654",
//   });
// }

function init() {}

function log(error) {
  console.log(error);
  //Raven.captureException(error);
}

export default {
  init,
  log,
};

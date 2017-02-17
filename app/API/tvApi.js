const API_URL = 'https://apis.is/tv';
const API_URL_PREFIX = 'https://apis.is';

const api = {

  getTvStations() {
    return new Promise((accept, reject) => {
      fetch(API_URL)
      .then(response => response.json())
      .then((jsonResponse) => {
        const data = jsonResponse.results[0].channels;
        return accept(data);
      }).catch((err) => {
        return reject(err);
      });
    });
  },

  getTvStationSchedule(tvStation) {
    return new Promise((accept, reject) => {
      fetch(API_URL_PREFIX + tvStation)
      .then(response => response.json())
      .then((jsonResponse) => {
        const data = jsonResponse.results;
        return accept(data);
      }).catch((err) => {
        return reject(err);
      });
    });
  }
}

module.exports = api;

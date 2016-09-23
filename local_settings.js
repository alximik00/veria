var settings = {
  site: {
    URL: 'http://localhost:3000',  //Complete URL to root. No trailing slash.
    name: 'Sreda - Блог',	//Name of Site
    tagline: 'Блог' //Tagline used in title and site description
  },
  database: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'sreda_user',
      password: 'sreda_pass',
      database: 'sreda',
      charset: 'utf8'
    }
  }
};

module.exports = settings;
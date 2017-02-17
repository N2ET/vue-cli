/**
 * Created by N2ET on 2017/2/17.
 */
var util = require('util')

var CLIENT = 'tpl-cli';

var config = {
  client: CLIENT,

  repos: {
    default: {
      type: 'github',
      owner: 'vuejs-templates',
      project: '',
      domain: 'https://api.github.com',
      url: 'https://api.github.com/users/vuejs-templates/repos'
    }
  },
  repo: 'default',

  requestConfig: {
    headers: {
      'User-Agent': CLIENT
    }
  },

  debug: false

}

config.repo = config.repos[config.repo]

module.exports = config;

module.exports.update =  function(override) {
  // shallow copy
  return util._extend(config, override)
}

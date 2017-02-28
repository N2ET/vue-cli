/**
 * Created by N2ET on 2017/2/17.
 */
var util = require('util')
var path = require('path')
var home = require('user-home')

var CLIENT = 'tpl-cli'

var config = {
  client: CLIENT,

  repos: {
    default: {
      type: 'github',
      owner: 'vuejs-templates',
      project: '',
      protocol: 'https',
      domain: 'github.com',
      apiDomain: 'api.github.com'
    }
  },
  repo: 'default',
  templateDir: path.join(home, '.tpl-templates'),
  templatePath: '',
  fullTemplatePath: '',

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

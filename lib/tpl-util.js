/**
 * Created by N2ET on 2017/2/17.
 */

var config = require('./config')

var util = {
  parseRepoUrl: function(owner, project) {
    var repo = config.repo;
    if(!owner && !project) {
      return repo.url
    }

    if(repo.type === 'github' && !project) {
      project = 'repos'
    }

    //return repo.domain + '' + (owner || repo.owner) + ()
    return `${repo.domain}/users/${owner || repo.owner}/${project || repo.project}`
  }
}

module.exports= util

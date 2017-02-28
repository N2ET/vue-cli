/**
 * Created by N2ET on 2017/2/17.
 */
var download = require('download-git-repo')
var program = require('commander')
var exists = require('fs').existsSync
var path = require('path')
var ora = require('ora')
var home = require('user-home')
var tildify = require('tildify')
var chalk = require('chalk')
var inquirer = require('inquirer')
var logger = require('../lib/logger')
var generate = require('../lib/generate')
var checkVersion = require('../lib/check-version')
var warnings = require('../lib/warnings')
var { isLocalPath, getTemplatePath } = require('../lib/local-path')

var config = require('./config')

var util = {

  getDownloadUrl: function(project) {
    var repo = config.repo
    return `${repo.type}:${repo.owner}/${project || repo.project}`
  },

  downloadTemplate: function (repo, callback) {
    var spinner = ora('downloading template ')
    var url = util.getDownloadUrl(repo)
    var templateDir = config.fullTemplatePath

    logger.debug()
    logger.debug('download url: ', url)
    logger.debug('download dir: ', templateDir)

    spinner.start()
    download(
      url,
      templateDir,
      {clone: false},
      function (err) {
        spinner.stop()
        if (err) {
          logger.fatal('Failed to download repo ' + repo + ': ' + err.message.trim())
        }

        if(callback) {
          callback()
        }
      })
  },

  parseProjectInfo: function(project) {
    var info = (project || '').match('([^\/]+)\/?(.+)?') || []

    return {
      project: info[1] || '',
      path: info[2] || ''
    }
  },

  /**
   * tpl cmd project[/path]
   * tpl cmd owner project[/path]
   * @param program
   */
  updateConfig: function (program) {
    var args = program.args
    var repo = config.repo
    var owner = args[0]
    var project = args[1]
    config.debug = program.debug

    if(!args.length) {
      logger.debug('updateConfig: empty args')
    }

    if(args.length === 1) {
      owner = config.repo.owner
      project = args[0]
    }

    if(!project && !config.repo.project) {
      logger.debug('updateConfig: empty project')
    }

    project = util.parseProjectInfo(project)
    if(!project) {
      logger.debug('invalid project ', project)
    }

    repo.owner = owner || repo.owner
    repo.project = project.project
    config.templatePath = project.path

    config.fullTemplatePath = path.join(
      config.templateDir,
      repo.owner,
      repo.project,
      config.templatePath
    )

    logger.debug('updateConfig: ', config)
  },

  getListUrl: function() {
    var repo =  config.repo
    return `${repo.protocol}://${repo.apiDomain}/users/${repo.owner}/repos`
  }
}

module.exports= util

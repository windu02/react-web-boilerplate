/* eslint-disable */
const { injectBabelPlugin, loaderNameMatches, getLoader } = require('react-app-rewired')
const rewireEslint = require('react-app-rewire-eslint')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const path = require('path')
const fs = require('fs')

const includePaths = [
  fs.realpathSync(`${__dirname}/src`),
]

const extractTextPluginInstance = new ExtractTextPlugin('static/css/bundle.css')

const urlLoader = function (conf) {
  return conf.loader === 'url';
}

function manageSCSSModules(config) {
  const sassExtension = /(\.scss|\.sass)$/
  const fileLoader = getLoader(config.module.rules, rule => loaderNameMatches(rule, 'file-loader'))

  if(!fileLoader.exclude) fileLoader.exclude = [];
  fileLoader.exclude.push(sassExtension)

  const cssRule = {
    resource: {
      test: /\.css$/,
      exclude: /node_modules/,
      include: includePaths,
    },
    use: ['extracted-loader'].concat(extractTextPluginInstance.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]-[local]',
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    })),
  }

  config.module.rules.push(cssRule)

  const cssNodeModulesRule = {
    resource: {
      test: /\.css$/,
      exclude: path.resolve(__dirname, 'src'),
      include: path.resolve(__dirname, 'node_modules'),
    },
    use: ['extracted-loader'].concat(extractTextPluginInstance.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    })),
  }

  config.module.rules.push(cssNodeModulesRule)

  const scssRule = {
    resource: {
      test: sassExtension,
      exclude: /node_modules/,
      include: includePaths,
    },
    use: ['extracted-loader'].concat(extractTextPluginInstance.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]-[local]',
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: [
              path.resolve(__dirname, 'src', 'styles'),
            ],
          },
        },
      ],
    })),
  }

  config.module.rules.push(scssRule)

  const scssNodeModulesRule = {
    resource: {
      test: sassExtension,
      exclude: path.resolve(__dirname, 'src'),
      include: path.resolve(__dirname, 'node_modules'),
    },
    use: ['extracted-loader'].concat(extractTextPluginInstance.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, 'src', 'styles'),
            ],
          },
        },
      ],
    })),
  }

  config.module.rules.push(scssNodeModulesRule)

  config.plugins.push(extractTextPluginInstance)

  return config
}

function overrideEslintOptions(options) {
  options.eslintPath = require.resolve('eslint')
  return options
}

module.exports = function override(config, env) {
  config = rewireEslint(config, env, overrideEslintOptions)
  config = injectBabelPlugin('transform-decorators-legacy', config)

  config = manageSCSSModules(config, env)

  return config
}

module.exports = {
    apps: [
      {
        name: 'Emerald Medical Aid',
        port: '3009',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }
  
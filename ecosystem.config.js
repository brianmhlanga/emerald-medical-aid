module.exports = {
    apps: [
      {
        name: 'Emerald Medical Aid Forms',
        port: '3011',
        exec_mode: 'cluster',
        instances: '1',
        script: './.output/server/index.mjs' 
      }
    ]
  }
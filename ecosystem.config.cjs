module.exports = {
  apps: [
    {
      name: 'Mul-Search',
      port: '5230',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}

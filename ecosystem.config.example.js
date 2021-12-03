module.exports = {
    apps : [{
      name: '',
      script: './build/index.js',
      instances: 0,
      exec_mode: 'cluster',
      wait_ready: true,
      kill_timeout: 10000,
      listen_timeout: 50000,
      env: {
        'PORT': 0,
        'NODE_ENV': 'development',
        'DATABASE_URL': 'mysql://',
        'KEY': ''
      },
      env_production: {
        'PORT': 0,
        'NODE_ENV': 'production',
        'DATABASE_URL': 'mysql://',
        'KEY': ''
      }
    }],
    deploy: {
      production: {
        user: '',
        host: '',
        ref: '',
        repo: '',
        ssh_options: '',
        path: '',
        'post-deploy': 'npm ci && npm run build && npm start'
      },
    }
  };
  
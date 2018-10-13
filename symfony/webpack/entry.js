const entry = {
  home: './assets/scss/styles.scss',
  bootstrap_legacy: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/jquery-ui-bundle/jquery-ui.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    './assets/js/bootstrap_legacy.js',
    './assets/scss/styles.scss'
    ],
  bootstrap_esm: [
    './assets/js/bootstrap_esm.js',
    './assets/scss/styles.scss'
    ],
  boostrap_react: [
    './assets/js/components/container.jsx',
    './assets/scss/styles.scss'
    ],
  form_react: [
    './assets/js/components/TaskForm.jsx'
    ]
}

module.exports = entry
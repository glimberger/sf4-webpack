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
    './assets/components/Container.jsx',
    './assets/scss/styles.scss'
  ],
  form_react: [
    './assets/components/TaskForm.jsx'
  ],
  form_react_ref: [
    './node_modules/jquery/dist/jquery.js',
    './assets/components/TaskFormContainer.jsx'
  ],
  react_tree: [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bs-tree/dist/js/jquery.bstree.js',
    './node_modules/bootstrap/scss/bootstrap.scss',
    './node_modules/bs-tree/src/scss/bstree.scss',
    './node_modules/font-awesome/scss/font-awesome.scss',
    './assets/components/BsTree.jsx'
  ]
}

module.exports = entry
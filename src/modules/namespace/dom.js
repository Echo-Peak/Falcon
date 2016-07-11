export default function(){


  let link = (elm) => document.querySelector(`*[data-element=${elm}]`);

let DOM ={
  mount:link('mount'),
  homepage:link('homepage'),
  edit:link('edit'),
  undo:link('undo'),
  stickys:link('homepage-stickys'),
  features:link('homepage-features'),
  nothing:link('nothing'),
  demo:link('demo'),
  settings:{
    toggle:link('settings'),
    element:link('settings-element'),
    clearList:link('settings-clear-button'),
    share:{
      UI:link('settings-share'),
      button:link('settings-share-button')
    },
    groups:{
      UI:link('settings-groups'),
      change:link('settings-changeGroup-button'),
      add:link('settings-addGroup-button')
    }
  },
  pannel:{
    pannel:link('pannel'),
    addClearElm:link('add-clear'),
    user:link('user'),
    add:link('add'),
    user:link('user'),
    logout:link('pannel-logout'),
    currentGroup:link('current-group')
  },

  editor:{
    editor:link('editor'),
    save:link('editor-save'),
    exit:link('editor-exit'),
    title:link('editor-title'),
  //  scale:link('editor-scale'),
    body:link('editor-body'),
    form:link('editor-form')
  },
  auth:{
    auth:link('auth'),
    google:link('signin-google'),
    facebook:link('signin-facebook'),
    twitter:link('signin-twitter'),
  },
  color:{
    element:link('color-element'),
    overlay:link('color-overlay'),
    content:link('color-content'),
    group:link('color-group'),
    defaults:link('color-defaults'),
    close:link('color-close')
  }

}
  return DOM
}

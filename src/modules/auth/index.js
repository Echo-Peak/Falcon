import {$storage} from '../namespace/local-storage';

function sync_localStorage(groupArray){
  let ls = JSON.parse(localStorage.groups);

  groupArray.forEach(function(group){
    if(ls.indexOf(group) < 0){
      ls.push(group);
    }
  });

  localStorage.groups = JSON.stringify(ls);
}

export default class Auth{
  constructor(Falcon ,_){
    this.Falcon = Falcon;
    Auth._ = _;
    this.DOM = _.DOM;
    this.animate = _.animate;
    _.DOM.auth.google.onclick = _.actions.signin.bind(_.actions, 'google');
    _.DOM.auth.facebook.onclick = _.actions.signin.bind(_.actions, 'facebook');
    _.DOM.auth.twitter.onclick = _.actions.signin.bind(_.actions, 'twitter');
    _.DOM.pannel.logout.onclick = this.logout.bind(this)
    this.onload.call(this); //this is for after login / after session
    this.login.call(this);
  }
  onload(){

    Auth._.actions.database_success = this.database_success.bind(this);
    Auth._.actions.database_error = this.database_error.bind(this);
    Auth._.actions.onload_success = this.onload_success.bind(this);
    Auth._.actions.onload_error = this.onload_error.bind(this);
    Auth._.actions.onload($storage.get('provider'));

  }
  database_success(groupData){
    sync_localStorage(Object.keys(groupData));
    this.Falcon.render.buildFrom(groupData[this.Falcon.group.check()]);
  }
  database_error(){
    console.log('error loading from databse')
    this.Falcon.animations.nothing.show();
  }
  onload_success(provider ,authData){
    Auth._.willRender.set(true);
    Auth._.Settings.enable();
    this.animate('show',this.DOM.pannel.addClearElm ,400 ,'animate' ,'flex');
    this.DOM.pannel.currentGroup.textContent = localStorage.lastGroup;
    this.Falcon.animations.homepage.hide();
    Auth._.Pannel.update(authData.displayName).status(true);
    Auth._.actions.database_onload();
  }
  login_success(provider ,authdata){
    Auth._.Settings.enable();
    this.Falcon.animations.homepage.hide();
    Auth._.willRender.set(true);
    Auth._.Pannel.update(authdata.displayName).status(true);
    this.animate('show',this.DOM.pannel.addClearElm ,400, 'animate' ,'flex');
    Auth._.actions.database_onload();

  }
  login_error(msg){
    console.warn(msg)
  }
  onload_error(){
    Auth._.Settings.disable();
    Auth._.Pannel.update().status(false);
    this.Falcon.animations.homepage.show();
  }
  logout(){
    localStorage.groups = '["default"]';
    localStorage.lastGroup = 'default';
    $storage.del('provider');
    $storage.del('ID');
    $storage.del('accessToken');
    $storage.del('secret');
    Auth._.willRender.set(false);
    Auth._.Pannel.update().status(false);
    Auth._.actions.logout();
    sessionStorage.deleted = '[]';
    Auth._.Settings.disable();
    Auth._.actions.authStatus = false;
    Auth._.actions.isDemo = false;
    this.DOM.mount.innerHTML ='';
    this.Falcon.animations.homepage.show();
    this.Falcon.animations.nothing.hide();
    this.animate('hide',this.DOM.pannel.addClearElm ,400 ,'animate');
  }
  login(){
    Auth._.actions.database_success = this.database_success.bind(this);
    Auth._.actions.database_err = this.database_error.bind(this);
    Auth._.actions.login_success = this.login_success.bind(this);
    Auth._.actions.login_error = this.login_error.bind(this);
  }
}

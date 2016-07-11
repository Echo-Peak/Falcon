import {$storage}from '../namespace/local-storage';
export default function(Falcon , _){
  let {DOM ,animate} = _;


  let action =  function(){

    _.willRender.set(false);
    _.Pannel.update().status(false);
    _.actions.logout();
    localStorage['user'] = '';
    localStorage.lastGroup = 'default';
    localStorage.groups = '[]';
    sessionStorage.deleted = '[]';
    _.Settings.disable();
    _.actions.authStatus = false;
    _.actions.isDemo = false;
    DOM.mount.innerHTML ='';
    Falcon.animations.homepage.show();
    Falcon.animations.nothing.hide();
    animate('hide',DOM.pannel.addClearElm ,400 ,'animate');
    $storage.del('provider');
    $storage.del('ID');
    $storage.del('accessToken');
    $storage.del('secret');
    

  }

  DOM.pannel.logout.onclick = action
}

import {$storage} from '../namespace/local-storage';
function errorAnimation(animations ,pannel){
pannel.update().status(false);
animations.homepage.show();
}
function sync_localStorage(groupArray){
  let ls = JSON.parse(localStorage.groups);

  groupArray.forEach(function(group){
    if(ls.indexOf(group) < 0){
      ls.push(group);
    }
  });

  localStorage.groups = JSON.stringify(ls);
}


export default function(Falcon, _){
let {DOM ,animate} = _;





  let onsuccess = function(provider , authData){
      _.willRender.set(true);
      _.Settings.enable();
      animate('show',DOM.pannel.addClearElm ,400 ,'animate' ,'flex');
      DOM.pannel.currentGroup.textContent = localStorage.lastGroup;
      Falcon.animations.homepage.hide();

      _.Pannel.update(authData.displayName).status(true);
      _.actions.database_onload();
  }

  let onerror = function(err){
    _.Settings.disable();
    errorAnimation(Falcon.animations ,_.Pannel);
  }




// _.actions.authenticator.success = function(){
//   console.log(arguments)
// };
function loadSuccess(groupData){
  sync_localStorage(Object.keys(groupData));
  Falcon.render.buildFrom(groupData[Falcon.group.check()]);
}
function loadError(){
  console.log('error loading from databse')
  Falcon.animations.nothing.show();
}


_.actions.database_success = loadSuccess;
_.actions.database_error = loadError;
_.actions.onload_success = onsuccess
_.actions.onload_error = onerror
_.actions.onload($storage.get('provider'));

}

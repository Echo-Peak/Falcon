function sync_localStorage(groupArray){
  let ls = JSON.parse(localStorage.groups);

  groupArray.forEach(function(group){
    if(ls.indexOf(group) < 0){
      ls.push(group);
    }
  });

  localStorage.groups = JSON.stringify(ls);
}


export default function(Falcon ,_){
  let {DOM ,animate} = _;

  let onerror = function(msg){
    console.warn(msg)
  }
  let onsuccess = function(type , authdata){
    _.Settings.enable();
    Falcon.animations.homepage.hide();
    _.willRender.set(true);
    _.Pannel.update(authdata.displayName).status(true);
    animate('show',DOM.pannel.addClearElm ,400, 'animate' ,'flex');
    _.actions.database_onload();
  }
  function database_success(groups){
    sync_localStorage(Object.keys(groups));

    Falcon.render.buildFrom(groups[Falcon.group.check()]);
  }
  function database_err(err){

  }
  _.actions.database_success = database_success;
  _.actions.database_err = database_err;

  _.actions.login_success = onsuccess
  _.actions.login_error = onerror;
}

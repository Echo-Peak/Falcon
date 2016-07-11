import {$storage} from '../namespace/local-storage';

function authProvider(provider){
  if(provider == null || provider == void 0){
    return false
  }
  let _provider;
  let scope;
  switch(provider){
    case 'google':_provider = new firebase.auth.GoogleAuthProvider();scope = _provider.addScope('https://www.googleapis.com/auth/plus.login'); break;
    case 'facebook':_provider = new firebase.auth.FacebookAuthProvider(); break;
    case 'twitter':_provider = new firebase.auth.TwitterAuthProvider();break;
    default:return false
  }
  return _provider

}

function credentialProvider(provider ,creds){
  if(provider == null || provider == void 0){
    return false
  }
  let credProvider;
  let scope;

  switch(provider){
    case 'google':credProvider = firebase.auth.GoogleAuthProvider.credential(creds.id , creds.token); break;
    case 'facebook':credProvider = firebase.auth.FacebookAuthProvider.credential(creds.token); break;
    case 'twitter':credProvider = firebase.auth.TwitterAuthProvider.credential(creds.token ,creds.secret);break;
    default:return false
  }
  return credProvider

}

export default class I_firebase{
  constructor(Falcon , _ ){
    this.authStatus = false;
    this.Falcon = Falcon;
    this.DOM = _.DOM;
    this.isDemo = false;
    this.demoify = this.demoify;
    this.demo = e => this.isDemo;
    this._ = _;
    this.DB = _.database;
    this.group = Falcon.group;
    this.animate = _.animate;
    this.authChecker = _.authChecker;
    this.authenticator = this.authenticator;
    this.login = this.login;
    this.logout = this.logout;
    this.onload = this.onload;
    this.loadFromGroup = this.loadFromGroup;
    this.signin = this.signin;
    this.onload = this.onload;
    this.switchGroup  = this.switchGroup;

    this.login_success = null;
    this.login_error = null;
    this.database_success = null;
    this.database_error = null;
    this.onload_success = null;
    this.onload_error= null;

    this.switch_success = null;
    this.switch_error = null;
  }
  authenticator(provider){
    if(this.isDemo === true){return}
    let actions = {
      error:null,
      success:null
    }
    $storage.set('provider' ,provider);



    return actions;
  }
  login(provider){
    if(this.isDemo === true){return}
    let self = this;
    let getProvider = authProvider(provider);
    if(!getProvider){return}

    firebase.auth().signInWithPopup(getProvider).then(function(result){
      self.authData = result;
      self.authStatus = true;
      $storage.set('provider' ,provider);
      result.credential.idToken !== void 0 && $storage.set('ID' ,result.credential.idToken);
      $storage.set('accessToken' ,result.credential.accessToken);
      result.credential.secret !== void 0 && $storage.set('secret' ,result.credential.secret);

      try{self.login_success(provider, result.user)}catch(e){console.log(e);}


    }).catch(function(e){
      console.error(e.message )
      self.login_error(e.message)
    })

  }
  logout(){
    if(this.isDemo === true){return}
    firebase.auth().signOut();
  }
  database_onload(){
    if(this.isDemo === true){return}
      let self = this;
      let uid;
      try{uid = this.authData.user.uid}
      catch(e){uid = this.authData.uid}

        firebase.database().ref('users').child(uid).child('groups').once('value' ,function(e){
          let data = e.val();

          if(data){
              self.database_success(data)
          }else{
            self.database_error()
          }
        })


  }
  onload(provider){
    if(this.isDemo === true){return}
    if(provider === void 0 ){this.onload_error()}
    let self = this;
    if(($storage.get('ID') === null || $storage.get('ID')  === '') &&
    ($storage.get('accessToken') === null || $storage.get('accessToken') === '' ) ){
      console.log('error auto sign in')
      this.onload_error()
      return
    }
    let creds = {
      id:$storage.get('ID'),
      token:$storage.get('accessToken'),
      secret:$storage.get('secret'),
    }
    let signinWith = credentialProvider(provider ,creds);

    firebase.auth().signInWithCredential(signinWith).then(function(result){
      self.authStatus = true
      self.authData = result;


      try{self.onload_success(provider, result)}catch(e){console.log(e);}
    })
    .catch(function(err){
      self.onload_error(err)
    })

  }

  add(payload ,callback){
    if(this.isDemo === true){return}
    let uid;
    try{uid = this.authData.user.uid}
    catch(e){uid = this.authData.uid }

    firebase.database().ref('users').child(uid).child('groups')
    .child(this.group.check())
    .push({
      title:payload.title ,body:payload.body , color:13
    })
    .once('value',function(e){

     callback(e.key)
    });

  }
  remove(itemID){
    if(this.isDemo === true){return}
    let uid;
    try{uid = this.authData.user.uid}
    catch(e){uid = this.authData.uid }

    firebase.database().ref('users').child(uid).child('groups')
    .child(this.group.check()).child(itemID).remove();
  }
  color(itemID ,colorCode){
    if(this.isDemo === true){return}
    let uid;
    try{uid = this.authData.user.uid}
    catch(e){uid = this.authData.uid }
    firebase.database().ref('users').child(uid).child('groups')
    .child(this.group.check()).child(itemID).update({color:colorCode})
  }
  switchGroup(oldGroupName , newGroupName){
    if(this.isDemo === true){return}
    if(oldGroupName === newGroupName){
      return
    }
    let uid;
    try{uid = this.authData.user.uid}
    catch(e){uid = this.authData.uid }
    firebase.database().ref('users').child(uid).child('groups')
    .child(newGroupName).once('value' ,(e)=>{
      let data = e.val();
      if(data === null){
        this.switch_error();
        return
      }

      this.switch_success(data);
    })

  }
  edit(payload){
    if(this.isDemo === true){return}
    let {title , id , body} = payload;
    let uid;
    try{uid = this.authData.user.uid}
    catch(e){uid = this.authData.uid }
    firebase.database().ref('users').child(uid).child('groups')
    .child(this.group.check()).child(id).update({title ,body})
  }
  signin(provider){

    this.login(provider)
  }
  isAuthed(){
    return this.authStatus
  }
  demoify(){
    this.isDemo = true;
  }
}

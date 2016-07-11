function filter(type ,input){
  let regex;
  switch(type){
    case 'email':{
      regex = /^[a-z0-9_A-Z]+@[a-zA-z]{2,}\.[a-z]{2,4}/;
      if(input.length && regex.test(input)){
        return true
      }
      return false
    };break;
    case 'password':{
      if(input.length && input.length >= 8){
        return true;
      }
      return false
    };break;
    case 'username':{
      regex = /^[a-z0-9- ]+$/i;
      if(input.length && regex.test(input)){
        return true
      }
      return false
    }
  }
}


export default function(Falcon ,_ ,Firebase){
let {DOM , animate} = _;

  let Flags = {
    pass:false
  }

_.actions.create_user.whenAuthed = function(){

}

  let toggles_password_visability = function(pass1 ,pass2 ,e){
    Flags.pass = !Flags.pass;

      if(Flags.pass){
        e.target.textContent = 'hide';
        pass1.type = 'text';
        pass2.type = 'text';
      }else{
        e.target.textContent = 'show';
        pass1.type = 'password';
        pass2.type = 'password';
      }
  }


_.actions.create_user.success = function(username){
      _.willRender.set(true);
      _.Pannel.update(username).status(true);
      animate('hide',DOM.auth.signup.signup ,400 ,'animate');
      animate('show',DOM.pannel.addClearElm ,400 ,'animate' ,'flex');
      Falcon.animations.nothing.show();
}
_.actions.create_user.error = function(err){
  alert('faild to create user');
  console.warn(err)
}
  let form = function(e){
    e.preventDefault();
    let username = e.target.children[0].children[1];
    let email = e.target.children[1].children[1];
    let _password = e.target.children[2].children[1].children[0];
    let confirm = e.target.children[2].children[1].children[1];


    if(filter('username' ,username.value)){
      username = username.value;

    }else{
      alert('invaild username');
      return false;
    }

    if(filter('email' ,email.value)){
        email = email.value;
    }else{
        alert('invaild email');
      return false;
    }
    if(!filter('password' ,_password.value)){
      alert('must enter password or paswords too short');
      return false
    }

    if(!filter('password' ,confirm.value)){
        alert('must confirm password');
      return false;
    }
    if(_password.value !== confirm.value || confirm.value !== _password.value){
      alert('passwords do not match');
      return false;
    }else{
      _password = _password.value
    }


    _.actions.create_user.create(email ,_password , username);
    e.target.reset();
  }
  let from_homepage_to_signup = function(){
    Falcon.animations.homepage.hide();
    animate('show',DOM.auth.signup.signup ,400 ,'animate');
  }
  let from_signup_to_homepage = function(){
    Falcon.animations.homepage.show();
    animate('hide',DOM.auth.signup.signup ,400 ,'animate');
  }
DOM.auth.signupBtn.onclick = from_homepage_to_signup;
DOM.auth.signup.back.onclick = from_signup_to_homepage
DOM.auth.signup.formdata.onsubmit = form;
DOM.auth.signup.passwordVisability.onclick = toggles_password_visability.bind(null , DOM.auth.signup.password , DOM.auth.signup.confirm);


}

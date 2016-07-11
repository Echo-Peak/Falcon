import Auth from '../auth';
import dom from './dom';
import Editor from '../editor';
import renderer from './render';
import animateElm from './animate';
import remove_and_undo from './remove-undo';
import colorPannel from '../color-pannel';
import Pannel from '../auth/update-pannel';
import Settings from '../settings';
import localStorageSetup from './local-storage-setup';
import I_firebase from '../firebase_actions';
import animations from '../animations';
import {$storage} from './local-storage';

function group(elm){
  group.current = localStorage.lasetGroup || 'default';

  return{
    check:()=>group.current,
    update:(newGroup)=>(group.current = newGroup, elm.textContent = newGroup)
  }
}
function willRender(){
    let flag = false;
    let set = (bool) => flag = bool;
    let check = () => flag;
    return {set , check}
}

export default class Falcon{

  constructor(){
    Falcon._ = {};
    Falcon._.Database = window.__firebase__.database();

    localStorageSetup();

    const DOM = dom();

    this.version = '0.9.5';
    this.codename = 'Falcon';
    this.publicname ='Falcon';
    Falcon._.willRender = willRender();

    Falcon._.demo = false;
    Falcon.ref = this;
    Falcon._.animate = animateElm;
    Falcon._.DOM = DOM;
    this.animations = animations(animateElm , DOM);
    this.group = group(DOM.pannel.currentGroup);
    this.group.update($storage.get('lastGroup'));
    Falcon._.actions = new I_firebase(Falcon.ref , Falcon._);
    this.remove = new remove_and_undo(Falcon.ref , Falcon._);
    this.colorize = new colorPannel(Falcon.ref , Falcon._);
    this.render = renderer( Falcon.ref , DOM ,Falcon._.animate , Falcon._);
    //features / components
    Falcon._.Pannel = Pannel(DOM ,this.publicname);
    Falcon._.Settings = new Settings(Falcon.ref ,Falcon._);
    let auth = new Auth(Falcon.ref , Falcon._);

    Falcon._.Editor =  new Editor(Falcon.ref ,Falcon._);
    DOM.demo.onclick = ()=>{
      if(Falcon._.actions.isAuthed()){
        console.log('cant use demo when logged in')
        return
      }
      Falcon._.actions.demoify();
      Falcon._.demo = true;
      Falcon._.willRender.set(true);
      DOM.pannel.currentGroup.textContent = 'demo only'
      this.animations.homepage.hide();
      this.animations.nothing.show()
      Falcon._.Pannel.update('DEMO').status(true);
      animateElm('show',DOM.pannel.addClearElm ,400 ,'animate' ,'flex');

    }

  }
}

import {$storage} from '../namespace/local-storage';

let renderGroupTags = function(mountElm ,_ ,Falcon){
  let frag = document.createDocumentFragment();
  let LS = JSON.parse(localStorage.groups);
  let SS = JSON.parse(sessionStorage.groups);
  let joined = LS.concat(SS);

  if(joined.indexOf(localStorage.lastGroup) < 0){
    joined.push(localStorage.lastGroup)
  }
let createLi = joined.forEach((group) =>{
  let li = document.createElement('li');
  li.textContent = group;
  li.setAttribute('group-id',group);
  li.className='group-li';
  li.onclick = function(){

    _.actions.switchGroup(Falcon.group.check() , group);
    Falcon.group.update(group);
    $storage.set('lastGroup' ,group)
  }
  frag.appendChild(li);
});
mountElm.appendChild(frag)
}

function excludeSettings(e){
  let isChildOf = (node)=>{
    try{
        if(node.tagName == 'BODY'){
        return false
      }
    }catch(e){
      return false
    }

    if(node === this.DOM.settings.element || node == this.DOM.settings.toggle){
      return true
    }
    return isChildOf(node.parentNode)
  }

   if(!isChildOf(e.target)){
     this.state.toggle = false;
     this.animate('hide',this.DOM.settings.element ,400 ,'animate');

   }
}


export default class Settings{
  constructor(Falcon , _){
    this.state ={
      toggle:false,
      changeGroup:false,
      addGroup:false,
      share:false,
    };
    this._ = _;
    this.actions = _.actions;
    this.Falcon = Falcon;
    this.DOM = _.DOM;
    this.animate = _.animate;
    this.addGroup = this.addGroup;
    this.clearList = this.clearList;
    this.changeGroup = this.changeGroup;
    this.enable = this.enable;
    this.disable = this.disable;
    this.isAuthed = _.actions.isAuthed;
    this.toggle = this.toggle;
    _.actions.switch_success =function(groupList){
      _.animate('no-op',_.DOM.mount,0,'no-op')
      .stagger('hide',100, Array.apply(null,_.DOM.mount.children),'animate' ,'block')
      .wait(function(){
        _.DOM.mount.parentNode.style.background ='';
        _.DOM.mount.innerHTML = '';

        Falcon.render.buildFrom(groupList);
     });

    }
    _.actions.switch_error =function(){
      console.error(`nothing found at group '${Falcon.group.check()}'`);
      _.DOM.mount.innerHTML = '';
      Falcon.animations.nothing.show();
    }
  }
  toggle(){
    this.state.toggle = !this.state.toggle; //this hooks into when Clicked outside
    if(this.state.toggle){
      this.animate('show' ,this.DOM.settings.element ,400 ,'animate');
      this.whenClickedOutside(true);
    }else{
      this.animate('hide' ,this.DOM.settings.element ,400 ,'animate');
      this.whenClickedOutside(true);
    }
  }
  whenClickedOutside(bool){
    if(bool){
      document.addEventListener('click',excludeSettings.bind(this));
    }else{
      document.removeEventListener('click',excludeSettings.bind(this));
    }
  }
  enable(){
    this.DOM.settings.toggle.onclick = this.toggle.bind(this);
    this.DOM.settings.clearList.onclick = this.clearList.bind(this);
    this.DOM.settings.groups.add.onclick = this.addGroup.bind(this);
    this.DOM.settings.groups.change.onclick = this.changeGroup.bind(this);
    this.DOM.settings.share.button.onclick = this.share.bind(this);

  }
  disable(){
    this.DOM.settings.toggle.onclick = null;
    this.DOM.settings.clearList.onclick = null;
    this.DOM.settings.groups.add.onclick = null;
    this.DOM.settings.groups.change.onclick = null;
  }
  changeGroup(){
    this.state.changeGroup = !this.state.changeGroup;
    if(this.state.changeGroup){
      this.state.addGroup = false;
      this.animate('hide' ,this.DOM.settings.groups.UI.children[1],400 ,'animate');
      this.animate('show',this.DOM.settings.groups.UI.children[0] ,400 ,'animate');
      renderGroupTags(this.DOM.settings.groups.UI.children[0] , this._ , this.Falcon);

    }else{
      this.animate('hide',this.DOM.settings.groups.UI.children[0],400 ,'animate').wait(()=>{
        this.DOM.settings.groups.UI.children[0].innerHTML = '';
      });
    }
  }
  addGroup(){
    this.state.addGroup = !this.state.addGroup;
    let button = this.DOM.settings.groups.UI.children[1].children[1];
    let input = this.DOM.settings.groups.UI.children[1].children[0];
    if(this.state.addGroup){
      this.animate('hide' ,this.DOM.settings.groups.UI.children[0],400 ,'animate');
      this.animate('show',this.DOM.settings.groups.UI.children[1] ,400 ,'animate');

      button.onclick = ()=>{
        if(input.value.length && /[a-z0-9 \-_]/i.test(input.value)){
          $storage.merge('groups' , input.value);
          input.value = '';
        }else{
          alert('invaild group name');
        }
      }

    }else{
      this.animate('hide',this.DOM.settings.groups.UI.children[1] ,400 ,'animate');
      button.onclick = null;
    }
  }
  clearList(){
    let items = Array.apply(null , this.DOM.mount.children);
    let confirm = window.confirm('confirm action?');
    if(confirm){


      let ids = items
      .map(e => e.getAttribute('firebase-id'))
      .forEach(i => this.actions.remove(i))

      this.animate('no-op' ,this.DOM.mount ,0, 'noop')
      .stagger('hide' ,100 ,items,'animate')
      .wait(()=>{

          //$.clearGroup.group();
          this.DOM.mount.innerHTML = '';
          this.Falcon.animations.nothing.show();

      })

    }
  }
  share(){

  }
}

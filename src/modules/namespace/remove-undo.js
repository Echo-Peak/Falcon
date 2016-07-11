import {$storage} from './local-storage';

export default class Undo{
  constructor(Falcon , _){
    Undo._ = _;
    this.Falcon = Falcon;
    this.elements = [];
    this.DOM = _.DOM;
    this.animate = _.animate;
    this.x_timer = null;
    this.deleting = true;
    _.DOM.undo.children[0].children[0].onclick = this.removeButton.bind(this);
    $storage.ss.clear();
  }
  toggle(bool){

    if(bool){
      this.animate('show',this.DOM.undo, 100 ,'animate')
      .delay('show' ,this.DOM.undo.children[0] ,200 ,'animate');
    }else{
      this.animate('hide',this.DOM.undo.children[0], 400 ,'animate')
       .delay('hide' ,this.DOM.undo ,100 ,'animate');
    }
  }
  syncSessionStorage(type ,data){
    switch(type){
      case 'del':$storage.ss.del();break;
      case 'add':$storage.ss.add(data);break;
    }

  }
  removeButton(){
    this.deleting = false;
    this.timer();
    let lastElm = this.elements.shift();
    this.syncSessionStorage('del');
    this.render(lastElm);
  }
  render(lastElm){
    if( lastElm === void 0) { return }
    this.Falcon.render
    .render({type:'add' , id:lastElm.id , title:lastElm.title ,body:lastElm.body ,colorCode:Number(lastElm.color)})
  }
  button(listItem){
    this.deleting = true;
    this.timer();
    this.toggle(true);

    for(var i=0; i< this.elements.length; i++){
        if(listItem.getAttribute('firebase-id') === this.elements[i].id){
          return
        }
      }
    let currentElement = {
      id:listItem.getAttribute('firebase-id'),
      title:listItem.querySelector('[data-element=title]').textContent,
      body:listItem.querySelector('[data-element=body-p]').textContent,
      color:listItem.getAttribute('color-id')
    }
    this.elements.push(currentElement);

    this.animate('show',listItem ,250, 'delete')
    .wait(()=>{

     listItem.style.display = 'none';
      this.DOM.mount.removeChild(listItem);
      this.DOM.mount.children.length < 1 && this.Falcon.animations.nothing.show();

      this.syncSessionStorage('add',currentElement);
    })
  }
  remove(){
    JSON.parse(sessionStorage.deleted)
    .forEach(item => this.updateFirbase(item.id));
  }
  timer(){
      clearTimeout(this.x_timer);
      this.x_timer =
      setTimeout(()=>{
        this.toggle(false);

        if(this.deleting){
          this.remove();
        }
        this.deleting = false;
      },5000)
      }
  updateFirbase(itemID){
    Undo._.actions.remove(itemID);
  }
}

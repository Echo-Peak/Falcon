import {colorArray} from './color-array';

export default class ColorPannel{
  constructor(Falcon , _){
    this.state = {
      toggle:false
    }
    this.animate = _.animate;

    this.Falcon = Falcon;
    this.DOM = _.DOM;
    ColorPannel.actions = _.actions;
    this.colors = colorArray;
    this.currentElement = null;
    _.DOM.color.group.onclick = this.delegate.bind(this);
    _.DOM.color.defaults.onclick = this.defaults.bind(this);
    _.DOM.color.overlay.onclick = this.toggle.bind(this);
    _.DOM.color.close.onclick  = this.toggle.bind(this);
  }
  button(listItem){
    this.toggle();
    this.currentElement = listItem;
  }
  toggle(){
    let self = this;
    let colors = Array.apply(null ,this.DOM.color.group.children);
    this.state.toggle  = !this.state.toggle;

    if(this.state.toggle){
      this.animate('show', this.DOM.color.element,0, 'animate')
      .delay('show',this.DOM.color.overlay ,100,'animate')
      .delay('show',this.DOM.color.content.children[1] ,200 ,'animate' ,'flex')
      .stagger('show' ,60 ,colors ,'animate' ,'inline-flex');

    }else{

      this.animate('hide', this.DOM.color.content.children[1], 400 , 'animate')
      .delay('hide',this.DOM.color.overlay ,100,'animate')
      .wait(()=>{

        this.animate('hide',this.DOM.color.element ,0 ,'animate');
        colors.forEach(item => item.classList.remove('animate') );

      });
    }
  }
  updateElement(colorCode){
    this.currentElement.style.background = this.colors[colorCode];
    this.currentElement.setAttribute('color-id',colorCode);
  }
  delegate(e){
    if(e.target.hasAttribute('color-id')){

      let cords = [e.target.offsetLeft, e.target.offsetTop];
      let colorID = Number(e.target.getAttribute('color-id'));
      let getRawColor = colorArray[colorID];
      this.updateFirebase(colorID);
      this.updateElement(colorID);
    }
  }
  updateFirebase(colorCode){
    let id = this.currentElement.getAttribute('firebase-id');
    ColorPannel.actions.color(id ,colorCode)
  }
  defaults(){
    this.updateFirebase(13);
    this.updateElement(13);
  }
}


function getNode(node){
  if(node.hasAttribute('firebase-id') || node.tagName === 'UL'){
    return node
  }
  return getNode(node.parentNode);
}
export default class Editor{
  constructor(Falcon , _){
    this.Falcon = Falcon;
    this.state = {
      toggle:false
    }
    this.whoCalled = null;
    this._ = _;
    this.animate = _.animate;
    this.DOM = _.DOM;
    this.actions = _.actions;
    this.payload = {};
    this.getPayload = e => this.payload;
    this.DOM.pannel.add.onclick = this.add.bind(this);
    this.DOM.editor.exit.onclick = this.close.bind(this);
    this.DOM.editor.save.onclick = this.process.bind(this);
  }
  toggle(){
    this.state.toggle = !this.state.toggle;
    this.state.toggle ?
    this.animate('show',this.DOM.editor.editor ,400 ,'animate') :
    this.animate('hide',this.DOM.editor.editor ,400 ,'animate');
  }
  add(){
    this.toggle()
    this.whoCalled = 'add';
    this.DOM.editor.title.value = '';
    this.DOM.editor.body.value = '';


  }
  edit({target} = e){
    this.whoCalled = 'edit'
    this.toggle();
    let node = getNode(target);
    this.DOM.editor.title.value = '';
    this.DOM.editor.body.value = '';
    let getID = node.getAttribute('firebase-id');
    let getTitle = node.querySelector('[data-element=title]');
    let getBody = node.querySelector('[data-element=body-p]');

    this.payload.id = getID;
    this.payload.target = node;

    this.DOM.editor.save.textContent = 'Save';
    this.DOM.editor.title.value = getTitle.textContent;
    this.DOM.editor.body.value = getBody.textContent;

  }
  close(){
    this.state.toggle =false;
    this.animate('hide',this.DOM.editor.editor ,400 ,'animate');
  }
  process(e){
    e.preventDefault();
    this.payload.title = this.DOM.editor.title.value.replace(/[^a-z0-9\- _]+/i ,'');
    this.payload.body = this.DOM.editor.body.value.replace(/[^a-z0-9\- _]+/i ,'');

    this[this.whoCalled+'_firebase'](this.getPayload());
    this.toggle()
  }
  add_render(itemID){
    this.Falcon.render.render({type:'add' ,id:itemID ,title:this.payload.title ,body:this.payload.body, colorCode:13});
  }
  edit_render(){
    let {title  , target , body} = this.getPayload();
    this.Falcon.render.render({type:'edit' , target ,title ,body});
  }
  add_firebase(){
    let data = this.getPayload();
    let fake_id = Math.floor(1 + Math.random() * Date.now())
    if(data.title.length){
      if(this.actions.demo()){
        this.add_render(fake_id);
      }
      this.actions.add(data ,this.add_render.bind(this));
    }

  }
  edit_firebase(){
    let data = this.getPayload();
    if(data.title.length){
      this.actions.edit(data);
      this.edit_render();
    }

   }
}

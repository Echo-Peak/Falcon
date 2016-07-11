import {colorArray} from '../color-pannel/color-array';

export default function(Falcon , DOM , animate ,_){
  const Template = `
      <div class="list-item">
      <div class="list-item-pannel" data-element='list-pannel'>
        <i class= 'fa fa-close'></i>
        <i class= 'fa fa-pencil' data-element='edit'></i>
        <i class= 'fa fa-paint-brush' data-element='colorize'></i>

      </div>
      <div class="title">
        <h2 data-element="title"></h2>
      </div>
      <div class="body" data-element="body" style='display:none'>
        <p data-element="body-p"></p>
      </div>
      <div class="scale" data-element="scale" style='display:none'>
        <h4 data-element="scale-text"></h4>
        <div style='text-align:center'>
          <input type="range" value="0" max="10" step="1" data-element="scale-scale"/>
        </div>
      </div>
    </div>

  `;

  let offset = 0;

  function build(groupList){

  if(groupList == null || groupList == undefined || !Object.keys(groupList).length){
    console.warn('no items in database. click add to add somthing');
    Falcon.animations.nothing.show()
     return
  }

    let  keys = Object.keys(groupList);

    let filtered = keys.map(item => {

      if(String(groupList[item].scale) && groupList[item].title && groupList[item].body){
        return {
          id:item,
          title:groupList[item].title,
          color:groupList[item].color,
          body:groupList[item].body
        }
      }
    })
    .filter(e => e !== undefined)
    .forEach(function(item,i,arr){
      offset += 100;

      setTimeout(function(){

        render({type:'add' ,id:item.id ,title:item.title ,body:item.body ,colorCode:item.color})
      },offset);
      if(i-1 === arr.length){
        offset = 0;
      }
    });


  }
  function hide_nothing(){
    animate('hide' ,DOM.nothing ,400, 'animate')
    .delay('hide' ,DOM.nothing.children[0],400,'animate');
  }
  function render({type , id , title ,body ,target ,colorCode}){
    if(!_.willRender.check()){
      console.log('%c Failed to render','color:red')
      return
    }
    hide_nothing()
    let holder;
    let trimedDiv;
    let elmTitle;
    let elmBody;
    let elmColor;
    let elmPannel;
    let edit;
    if(type === 'add'){

         holder = document.createElement('div');
        holder.innerHTML = Template;

         trimedDiv = holder.children[0];


        trimedDiv.classList.add('list-item-animate');
        trimedDiv.classList.add('list-item-hide');

        DOM.mount.appendChild(trimedDiv);
        animate('show',trimedDiv ,400 ,'animate');

         elmTitle = trimedDiv.querySelector('[data-element=title]');
         elmBody = trimedDiv.querySelector('[data-element=body]');
        elmColor = trimedDiv.querySelector('[data-element=colorize]')
         elmPannel = trimedDiv.querySelector('[data-element=list-pannel]');
         edit = trimedDiv.querySelector('[data-element=edit]');
        elmPannel.children[0].onclick = Falcon.remove.button.bind(Falcon.remove,trimedDiv);

        edit.onclick = _.Editor.edit.bind(_.Editor)
        elmColor.onclick = Falcon.colorize.button.bind(Falcon.colorize , trimedDiv);
        trimedDiv.setAttribute('firebase-id',id);
        trimedDiv.setAttribute('color-id',colorCode)
        trimedDiv.style.background = colorArray[colorCode] || 'white';
    if(title){

      elmTitle.textContent = title;
    }
    if(body){
      elmBody.style.display = 'block';
      elmBody.children[0].textContent = body
    }


  }else{
    let edit_title = target.querySelector('[data-element=title]');
    let edit_body = target.querySelector('[data-element=body]');
    let edit_scale = target.querySelector('[data-element=scale]');

    if(title){
      edit_title.textContent = title

    }
    if(body){
      edit_body.style.display = 'block';
      edit_body.children[0].textContent = body
    }
  }

  }

  let renderer = {
    buildFrom:build,
    render:render
  }

return renderer
}

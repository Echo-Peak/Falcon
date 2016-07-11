export default function(animate ,DOM){

  return {
    hide(){
      animate('hide',DOM.homepage ,400 ,'animate')
      .stagger('hide' ,120, Array.apply(null,DOM.stickys.children),'animate' ,'block')
      .stagger('hide' ,200, Array.apply(null,DOM.features.querySelectorAll('.icon')),'animate' ,'block')
      .stagger('hide' ,220, Array.apply(null,DOM.features.querySelectorAll('.text')),'animate' ,'block')
    },
    show(){
      DOM.mount.innerHTML = ''
      animate('show',DOM.homepage ,400 ,'animate' ,'flex')
      .stagger('show' ,120, Array.apply(null,DOM.stickys.children),'animate' ,'block')
      .stagger('show' ,200, Array.apply(null,DOM.features.querySelectorAll('.icon')),'animate' ,'block')
      .stagger('show' ,220, Array.apply(null,DOM.features.querySelectorAll('.text')),'animate' ,'block')
      .wait(function(){
          animate('show',DOM.auth.auth ,400 ,'animate');
          animate('hide',DOM.pannel.addClearElm ,400 ,'animate' );

      });

    }
  }
}

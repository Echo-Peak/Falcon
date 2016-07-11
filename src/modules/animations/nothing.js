export default function(animate ,DOM){

  return {
    hide(){
      animate('hide',DOM.nothing, 100 ,'animate')
      .delay('hide' ,DOM.nothing.children[0] ,200 ,'animate');
    },
    show(){
      animate('show',DOM.nothing, 100 ,'animate')
      .delay('show' ,DOM.nothing.children[0] ,200 ,'animate');
    }
  }
}

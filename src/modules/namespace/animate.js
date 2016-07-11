


export default function(type , elm , delay ,classList ,displayType){
  let display = 'block';
  let waitDelay =0;
  waitDelay = delay;
  let animator = function(_type,_elm,_transDelay,_classList ,_display){
    if(typeof _display == 'string' || _display === ('flex'||'inline-block')){
display= _display;
}


  let hide = ()=>{

    _elm.classList.remove(_classList);
        setTimeout(()=>{
      _elm.style.display = 'none';

    },_transDelay);
  }
  let show = ()=>{

    _elm.style.transition = `all ${_transDelay/1000}s`;
    _elm.style.display = display;
    setTimeout(()=>{
      _elm.classList.add(_classList);

    },_transDelay);
  }

  let clear = function(){
    _elm.classList.remove(_classList);
  }

    switch(_type){
      case 'hide':{
          hide()
      };break;
      case 'show':{
        show()
      };break;
      case 'clear':{
        clear()
      }
    }
  }
  animator(type , elm , delay ,classList ,displayType);


    let options = {
      delay:function(type,elm,transDelay,classList ,display){
        waitDelay = transDelay;
        setTimeout(()=>{
          animator(type,elm,transDelay,classList ,display)
        },transDelay);
        return this;
      },
      wait:function(callback){
        setTimeout(()=>{
          callback()
        },waitDelay*2)
      },
      stagger:function(type ,staggerAmount , domNodes ,classList ,display){
        let staggeree = 0;
        domNodes.forEach(node => {
          staggeree += staggerAmount;
          setTimeout(function(){
            animator(type,node,staggeree,classList ,display)
          },staggeree);

        });
        waitDelay = staggerAmount * domNodes.length
        return this

      }


    }
  return options
}

import Falcon from './falcon'; //codename

export let namespace = {
    windowName:function(windowName){
      window[windowName] = new Falcon();
    }
  }

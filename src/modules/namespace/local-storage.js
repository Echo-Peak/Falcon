export let $storage = {
  $watchers:[],

  set(key ,val){
    localStorage.setItem(key ,val)
  },
  get(key){

   return localStorage.getItem(key);
  },
  exists(key){
    if(localStorage.getItem(key)){
      return true
    }
    return false
  },
  watch(enqueueFn){
    this.$watchers.push(enqueueFn)
  },
  del(key){
    delete localStorage[key]
  },
  ss:{
    del(){

      let arr = JSON.parse(sessionStorage['deleted']);
          arr.shift();
      sessionStorage['deleted'] = JSON.stringify(arr);
    },
    add(data){
      let arr = JSON.parse(sessionStorage['deleted']);
      arr.push(data);
      sessionStorage['deleted'] = JSON.stringify(arr);
    },
    clear(){
      sessionStorage['deleted'] = '[]';
    }
  },
  merge(key ,value){

    let old = JSON.parse(localStorage[key]);
    let x = ~old.indexOf(value) ? false : old.push(value);
    localStorage[key] = JSON.stringify(old);
    return x
  },
  notify(newestValue){
    this.$watchers.forEach(function(callback){
      try{
        callback(newestValue)
      }catch(e){}
    })
  }

}

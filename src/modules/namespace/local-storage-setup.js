export default function localStorageSetup(){
  if(!localStorage.lastGroup){
    localStorage.lastGroup ='default'
  }
  if(!localStorage.groups){
    localStorage.groups = '["default"]'
  }
  if(!sessionStorage.deleted){
    sessionStorage.deleted = '[]'
  }
  if(!sessionStorage.groups){
    sessionStorage.groups = '[]'
  }

}

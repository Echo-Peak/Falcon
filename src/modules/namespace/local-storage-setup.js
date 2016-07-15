export default function localStorageSetup(){
  if(localStorage.lastGroup === void 0 || localStorage.lastGroup === '' || localStorage.lastGroup ==null){
    localStorage.lastGroup ='default'
  }
  if(localStorage.groups === void 0 || localStorage.groups === '' || localStorage.groups == null){
    localStorage.groups = '["default"]'
  }
  if(sessionStorage.deleted === void 0 || sessionStorage.deleted === '' || sessionStorage.deleted ==null){
    sessionStorage.deleted = '[]'
  }
  if(sessionStorage.groups === void 0 || sessionStorage.groups === '' || sessionStorage.groups ==null){
    sessionStorage.groups = '[]'
  }
}


export default function Pannel(DOM ,publicname){

    return {
      username:'',
      update:function(username){
        this.username = username;
        return this
      },
      status:function(loginState){
        loginState ? this.login() : this.logout()
      },
      login:function(){

        DOM.pannel.user.textContent = this.username;
        DOM.pannel.pannel.children[0].children[1].style.display = 'block';
        DOM.pannel.logout.children[0].innerText = 'Logout';
      },
      logout:function(){
        DOM.pannel.pannel.children[0].children[1].style.display = 'none';
        DOM.pannel.user.textContent = publicname;
        DOM.pannel.logout.children[0].innerText = '';

      }
    }



}

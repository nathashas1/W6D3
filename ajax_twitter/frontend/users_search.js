const apiUtil = require('./api_util.js');

class UsersSearch{
  constructor(el){
    this.$el = $(el);
    this.input =this.$el.find('input');
    this.ul = $('.users-search ul');
    this.input.keydown(e => this.isEnter(e));
  }

  isEnter(e){
    if (e.key === "Enter") {
      this.handleInput(e);
    }
  }

  handleInput(e){
    e.preventDefault();
    apiUtil.searchUsers(this.input.val(),()=>{
      console.log("hi haters");
    });
  }
}

module.exports = UsersSearch;

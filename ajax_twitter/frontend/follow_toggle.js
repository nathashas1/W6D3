const apiUtil = require('./api_util.js');

class FollowToggle {
  constructor(el, options){
    console.log('we\'re in the constructor');
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = this.$el.data("initial-follow-state") || options.initialFollowState;
    this.render(this.followState);
    this.$el.on('click', e => this.handleClick(e));
  }

  render(state){
    this.followState = state;
    if (state === "following" || state === 'unfollowing'){
      this.$el.prop('disabled', true);
    } else if (state === "unfollowed") {
      // console.log("text should be followed!");
      this.$el.prop('disabled', false);
      this.$el.text('Follow');
    } else if (state === "followed") {
      // console.log("text should be unfollowed");
      this.$el.prop('disabled', false);
      this.$el.text('Unfollow');
    }
  }

  handleClick(e){
    e.preventDefault();
    if (this.followState === "unfollowed") {
      this.render("following");
      apiUtil.followUser(this.userId)
        .then(() =>{
          this.render("followed");
      });
    } else if (this.followState === "followed") {
      this.render("unfollowing");
      apiUtil.unfollowUser(this.userId)
        .then(() =>{
          this.render("unfollowed");
      });
    }
  }



}

module.exports = FollowToggle;

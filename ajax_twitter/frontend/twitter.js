const followToggle = require('./follow_toggle.js');
const usersSearch = require('./users_search.js');

$(()=>{
  $('.follow-toggle').each((idx, el) => new followToggle(el) );
  $('.users-search').each((idx, el) => new usersSearch(el) );
});

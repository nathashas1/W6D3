const APIUtil = {
  followUser: id => {
    // debugger;
    return $.ajax({
      url:`/users/${id}/follow`,
      method:"POST",
      data: {
        user_id: 'bananas',
        other_stuff: 'oranges'
      },
      success: () => {
        console.log("ajax post request successful!");
      },
      dataType: 'JSON'
    });
  },

  unfollowUser: id => {
    // ...
    return $.ajax({
      url:`/users/${id}/follow`,
      method:"DELETE",
      success: () => {
        console.log("ajax delete request successful!");
      },
      dataType: 'JSON'
    });
  },

  searchUsers: (queryVal, success) => (
    // debugger;
    $.ajax({
      url:'/users/search',
      method: 'GET',
      data:{
        query:queryVal
      },
      success: success,
      dataType: 'JSON'
    })
  )
};

module.exports = APIUtil;

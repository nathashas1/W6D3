/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const apiUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const followToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const usersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");

$(()=>{
  $('.follow-toggle').each((idx, el) => new followToggle(el) );
  $('.users-search').each((idx, el) => new usersSearch(el) );
});


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const apiUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	D:\WSpace_React_Tutorial\zwebpack_sample_project\app 생성.
		원래 소스코드와 자바스크립트 모듈이 있음.
	*/
	//...393p.Greeter를 가져오고 반환된 요소를 페이지에 삽입함.
	var greeter = __webpack_require__(1);
	document.getElementById('root').appendChild(greeter());


/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
	D:\WSpace_React_Tutorial\zproreact2_webpack_390p\zapp 생성.	
		원래 소스코드와 자바스크립트 모듈이 있음.
	*/
	//...393p.인사말을 포함하는 새로운 HTML요소를 반환함.
	module.exports = function(){
		var greet = document.createElement('div');
		greet.textContent = "Hi there and greetings^^!";
		return greet;
	}


/***/ }
/******/ ]);
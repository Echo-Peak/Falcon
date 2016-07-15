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

	'use strict';

	var _namespace = __webpack_require__(1);

	_namespace.namespace.windowName('app');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.namespace = undefined;

	var _falcon = __webpack_require__(2);

	var _falcon2 = _interopRequireDefault(_falcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//codename

	var namespace = exports.namespace = {
	  windowName: function windowName(_windowName) {
	    window[_windowName] = new _falcon2.default();
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(3);

	var _auth2 = _interopRequireDefault(_auth);

	var _dom = __webpack_require__(5);

	var _dom2 = _interopRequireDefault(_dom);

	var _editor = __webpack_require__(6);

	var _editor2 = _interopRequireDefault(_editor);

	var _render = __webpack_require__(7);

	var _render2 = _interopRequireDefault(_render);

	var _animate = __webpack_require__(9);

	var _animate2 = _interopRequireDefault(_animate);

	var _removeUndo = __webpack_require__(10);

	var _removeUndo2 = _interopRequireDefault(_removeUndo);

	var _colorPannel = __webpack_require__(11);

	var _colorPannel2 = _interopRequireDefault(_colorPannel);

	var _updatePannel = __webpack_require__(12);

	var _updatePannel2 = _interopRequireDefault(_updatePannel);

	var _settings = __webpack_require__(13);

	var _settings2 = _interopRequireDefault(_settings);

	var _localStorageSetup = __webpack_require__(14);

	var _localStorageSetup2 = _interopRequireDefault(_localStorageSetup);

	var _firebase_actions = __webpack_require__(15);

	var _firebase_actions2 = _interopRequireDefault(_firebase_actions);

	var _animations = __webpack_require__(16);

	var _animations2 = _interopRequireDefault(_animations);

	var _localStorage = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function group(elm) {
	    group.current = localStorage.lasetGroup || 'default';

	    return {
	        check: function check() {
	            return group.current;
	        },
	        update: function update(newGroup) {
	            return group.current = newGroup, elm.textContent = newGroup;
	        }
	    };
	}
	function willRender() {
	    var flag = false;
	    var set = function set(bool) {
	        return flag = bool;
	    };
	    var check = function check() {
	        return flag;
	    };
	    return { set: set, check: check };
	}

	var Falcon = function Falcon() {
	    var _this = this;

	    _classCallCheck(this, Falcon);

	    Falcon._ = {};
	    Falcon._.Database = window.__firebase__.database();

	    (0, _localStorageSetup2.default)();

	    var DOM = (0, _dom2.default)();

	    this.version = '0.9.5';
	    this.codename = 'Falcon';
	    this.publicname = 'Falcon';
	    Falcon._.willRender = willRender();

	    Falcon._.demo = false;
	    Falcon.ref = this;
	    Falcon._.animate = _animate2.default;
	    Falcon._.DOM = DOM;
	    this.animations = (0, _animations2.default)(_animate2.default, DOM);
	    this.group = group(DOM.pannel.currentGroup);
	    this.group.update(_localStorage.$storage.get('lastGroup'));
	    Falcon._.actions = new _firebase_actions2.default(Falcon.ref, Falcon._);
	    this.remove = new _removeUndo2.default(Falcon.ref, Falcon._);
	    this.colorize = new _colorPannel2.default(Falcon.ref, Falcon._);
	    this.render = (0, _render2.default)(Falcon.ref, DOM, Falcon._.animate, Falcon._);
	    //features / components
	    Falcon._.Pannel = (0, _updatePannel2.default)(DOM, this.publicname);
	    Falcon._.Settings = new _settings2.default(Falcon.ref, Falcon._);
	    var auth = new _auth2.default(Falcon.ref, Falcon._);

	    Falcon._.Editor = new _editor2.default(Falcon.ref, Falcon._);
	    DOM.demo.onclick = function () {
	        if (Falcon._.actions.isAuthed()) {
	            console.log('cant use demo when logged in');
	            return;
	        }
	        Falcon._.actions.demoify();
	        Falcon._.demo = true;
	        Falcon._.willRender.set(true);
	        DOM.pannel.currentGroup.textContent = 'demo only';
	        _this.animations.homepage.hide();
	        _this.animations.nothing.show();
	        Falcon._.Pannel.update('DEMO').status(true);
	        (0, _animate2.default)('show', DOM.pannel.addClearElm, 400, 'animate', 'flex');
	    };
	};

	exports.default = Falcon;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _localStorage = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function sync_localStorage(groupArray) {
	  var ls = JSON.parse(localStorage.groups);

	  groupArray.forEach(function (group) {
	    if (ls.indexOf(group) < 0) {
	      ls.push(group);
	    }
	  });

	  localStorage.groups = JSON.stringify(ls);
	}

	var Auth = function () {
	  function Auth(Falcon, _) {
	    _classCallCheck(this, Auth);

	    this.Falcon = Falcon;
	    Auth._ = _;
	    this.DOM = _.DOM;
	    this.animate = _.animate;
	    _.DOM.auth.google.onclick = _.actions.signin.bind(_.actions, 'google');
	    _.DOM.auth.facebook.onclick = _.actions.signin.bind(_.actions, 'facebook');
	    _.DOM.auth.twitter.onclick = _.actions.signin.bind(_.actions, 'twitter');
	    _.DOM.pannel.logout.onclick = this.logout.bind(this);
	    this.onload.call(this); //this is for after login / after session
	    this.login.call(this);
	  }

	  _createClass(Auth, [{
	    key: 'onload',
	    value: function onload() {

	      Auth._.actions.database_success = this.database_success.bind(this);
	      Auth._.actions.database_error = this.database_error.bind(this);
	      Auth._.actions.onload_success = this.onload_success.bind(this);
	      Auth._.actions.onload_error = this.onload_error.bind(this);
	      Auth._.actions.onload(_localStorage.$storage.get('provider'));
	    }
	  }, {
	    key: 'database_success',
	    value: function database_success(groupData) {
	      sync_localStorage(Object.keys(groupData));
	      this.Falcon.render.buildFrom(groupData[this.Falcon.group.check()]);
	    }
	  }, {
	    key: 'database_error',
	    value: function database_error() {
	      console.log('error loading from databse');
	      this.Falcon.animations.nothing.show();
	    }
	  }, {
	    key: 'onload_success',
	    value: function onload_success(provider, authData) {
	      Auth._.willRender.set(true);
	      Auth._.Settings.enable();
	      this.animate('show', this.DOM.pannel.addClearElm, 400, 'animate', 'flex');
	      this.DOM.pannel.currentGroup.textContent = localStorage.lastGroup;
	      this.Falcon.animations.homepage.hide();
	      Auth._.Pannel.update(authData.displayName).status(true);
	      Auth._.actions.database_onload();
	    }
	  }, {
	    key: 'login_success',
	    value: function login_success(provider, authdata) {
	      Auth._.Settings.enable();
	      this.Falcon.animations.homepage.hide();
	      Auth._.willRender.set(true);
	      Auth._.Pannel.update(authdata.displayName).status(true);
	      this.animate('show', this.DOM.pannel.addClearElm, 400, 'animate', 'flex');
	      Auth._.actions.database_onload();
	    }
	  }, {
	    key: 'login_error',
	    value: function login_error(msg) {
	      console.warn(msg);
	    }
	  }, {
	    key: 'onload_error',
	    value: function onload_error() {
	      Auth._.Settings.disable();
	      Auth._.Pannel.update().status(false);
	      this.Falcon.animations.homepage.show();
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      localStorage.groups = '["default"]';
	      localStorage.lastGroup = 'default';
	      _localStorage.$storage.del('provider');
	      _localStorage.$storage.del('ID');
	      _localStorage.$storage.del('accessToken');
	      _localStorage.$storage.del('secret');
	      Auth._.willRender.set(false);
	      Auth._.Pannel.update().status(false);
	      Auth._.actions.logout();
	      sessionStorage.deleted = '[]';
	      Auth._.Settings.disable();
	      Auth._.actions.authStatus = false;
	      Auth._.actions.isDemo = false;
	      this.DOM.mount.innerHTML = '';
	      this.Falcon.animations.homepage.show();
	      this.Falcon.animations.nothing.hide();
	      this.animate('hide', this.DOM.pannel.addClearElm, 400, 'animate');
	    }
	  }, {
	    key: 'login',
	    value: function login() {
	      Auth._.actions.database_success = this.database_success.bind(this);
	      Auth._.actions.database_err = this.database_error.bind(this);
	      Auth._.actions.login_success = this.login_success.bind(this);
	      Auth._.actions.login_error = this.login_error.bind(this);
	    }
	  }]);

	  return Auth;
	}();

	exports.default = Auth;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var $storage = exports.$storage = {
	  $watchers: [],

	  set: function set(key, val) {
	    localStorage.setItem(key, val);
	  },
	  get: function get(key) {

	    return localStorage.getItem(key);
	  },
	  exists: function exists(key) {
	    if (localStorage.getItem(key)) {
	      return true;
	    }
	    return false;
	  },
	  watch: function watch(enqueueFn) {
	    this.$watchers.push(enqueueFn);
	  },
	  del: function del(key) {
	    delete localStorage[key];
	  },

	  ss: {
	    del: function del() {

	      var arr = JSON.parse(sessionStorage['deleted']);
	      arr.shift();
	      sessionStorage['deleted'] = JSON.stringify(arr);
	    },
	    add: function add(data) {
	      var arr = JSON.parse(sessionStorage['deleted']);
	      arr.push(data);
	      sessionStorage['deleted'] = JSON.stringify(arr);
	    },
	    clear: function clear() {
	      sessionStorage['deleted'] = '[]';
	    }
	  },
	  merge: function merge(key, value) {

	    var old = JSON.parse(localStorage[key]);
	    var x = ~old.indexOf(value) ? false : old.push(value);
	    localStorage[key] = JSON.stringify(old);
	    return x;
	  },
	  notify: function notify(newestValue) {
	    this.$watchers.forEach(function (callback) {
	      try {
	        callback(newestValue);
	      } catch (e) {}
	    });
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {

	  var link = function link(elm) {
	    return document.querySelector('*[data-element=' + elm + ']');
	  };

	  var DOM = {
	    mount: link('mount'),
	    homepage: link('homepage'),
	    edit: link('edit'),
	    undo: link('undo'),
	    stickys: link('homepage-stickys'),
	    features: link('homepage-features'),
	    nothing: link('nothing'),
	    demo: link('demo'),
	    settings: {
	      toggle: link('settings'),
	      element: link('settings-element'),
	      clearList: link('settings-clear-button'),
	      share: {
	        UI: link('settings-share'),
	        button: link('settings-share-button')
	      },
	      groups: {
	        UI: link('settings-groups'),
	        change: link('settings-changeGroup-button'),
	        add: link('settings-addGroup-button')
	      }
	    },
	    pannel: {
	      pannel: link('pannel'),
	      addClearElm: link('add-clear'),
	      user: link('user'),
	      add: link('add'),
	      user: link('user'),
	      logout: link('pannel-logout'),
	      currentGroup: link('current-group')
	    },

	    editor: {
	      editor: link('editor'),
	      save: link('editor-save'),
	      exit: link('editor-exit'),
	      title: link('editor-title'),
	      //  scale:link('editor-scale'),
	      body: link('editor-body'),
	      form: link('editor-form')
	    },
	    auth: {
	      auth: link('auth'),
	      google: link('signin-google'),
	      facebook: link('signin-facebook'),
	      twitter: link('signin-twitter')
	    },
	    color: {
	      element: link('color-element'),
	      overlay: link('color-overlay'),
	      content: link('color-content'),
	      group: link('color-group'),
	      defaults: link('color-defaults'),
	      close: link('color-close')
	    }

	  };
	  return DOM;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getNode(node) {
	  if (node.hasAttribute('firebase-id') || node.tagName === 'UL') {
	    return node;
	  }
	  return getNode(node.parentNode);
	}

	var Editor = function () {
	  function Editor(Falcon, _) {
	    var _this = this;

	    _classCallCheck(this, Editor);

	    this.Falcon = Falcon;
	    this.state = {
	      toggle: false
	    };
	    this.whoCalled = null;
	    this._ = _;
	    this.animate = _.animate;
	    this.DOM = _.DOM;
	    this.actions = _.actions;
	    this.payload = {};
	    this.getPayload = function (e) {
	      return _this.payload;
	    };
	    this.DOM.pannel.add.onclick = this.add.bind(this);
	    this.DOM.editor.exit.onclick = this.close.bind(this);
	    this.DOM.editor.save.onclick = this.process.bind(this);
	  }

	  _createClass(Editor, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.state.toggle = !this.state.toggle;
	      this.state.toggle ? this.animate('show', this.DOM.editor.editor, 400, 'animate') : this.animate('hide', this.DOM.editor.editor, 400, 'animate');
	    }
	  }, {
	    key: 'add',
	    value: function add() {
	      this.toggle();
	      this.whoCalled = 'add';
	      this.DOM.editor.title.value = '';
	      this.DOM.editor.body.value = '';
	    }
	  }, {
	    key: 'edit',
	    value: function edit() {
	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? e : arguments[0];

	      var target = _ref.target;

	      this.whoCalled = 'edit';
	      this.toggle();
	      var node = getNode(target);
	      this.DOM.editor.title.value = '';
	      this.DOM.editor.body.value = '';
	      var getID = node.getAttribute('firebase-id');
	      var getTitle = node.querySelector('[data-element=title]');
	      var getBody = node.querySelector('[data-element=body-p]');

	      this.payload.id = getID;
	      this.payload.target = node;

	      this.DOM.editor.save.textContent = 'Save';
	      this.DOM.editor.title.value = getTitle.textContent;
	      this.DOM.editor.body.value = getBody.textContent;
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.state.toggle = false;
	      this.animate('hide', this.DOM.editor.editor, 400, 'animate');
	    }
	  }, {
	    key: 'process',
	    value: function process(e) {
	      e.preventDefault();
	      this.payload.title = this.DOM.editor.title.value.replace(/[^a-z0-9\- _]+/i, '');
	      this.payload.body = this.DOM.editor.body.value.replace(/[^a-z0-9\- _]+/i, '');

	      this[this.whoCalled + '_firebase'](this.getPayload());
	      this.toggle();
	    }
	  }, {
	    key: 'add_render',
	    value: function add_render(itemID) {
	      this.Falcon.render.render({ type: 'add', id: itemID, title: this.payload.title, body: this.payload.body, colorCode: 13 });
	    }
	  }, {
	    key: 'edit_render',
	    value: function edit_render() {
	      var _getPayload = this.getPayload();

	      var title = _getPayload.title;
	      var target = _getPayload.target;
	      var body = _getPayload.body;

	      this.Falcon.render.render({ type: 'edit', target: target, title: title, body: body });
	    }
	  }, {
	    key: 'add_firebase',
	    value: function add_firebase() {
	      var data = this.getPayload();
	      var fake_id = Math.floor(1 + Math.random() * Date.now());
	      if (data.title.length) {
	        if (this.actions.demo()) {
	          this.add_render(fake_id);
	        }
	        this.actions.add(data, this.add_render.bind(this));
	      }
	    }
	  }, {
	    key: 'edit_firebase',
	    value: function edit_firebase() {
	      var data = this.getPayload();
	      if (data.title.length) {
	        this.actions.edit(data);
	        this.edit_render();
	      }
	    }
	  }]);

	  return Editor;
	}();

	exports.default = Editor;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (Falcon, DOM, animate, _) {
	  var Template = '\n      <div class="list-item">\n      <div class="list-item-pannel" data-element=\'list-pannel\'>\n        <i class= \'fa fa-close\'></i>\n        <i class= \'fa fa-pencil\' data-element=\'edit\'></i>\n        <i class= \'fa fa-paint-brush\' data-element=\'colorize\'></i>\n\n      </div>\n      <div class="title">\n        <h2 data-element="title"></h2>\n      </div>\n      <div class="body" data-element="body" style=\'display:none\'>\n        <p data-element="body-p"></p>\n      </div>\n      <div class="scale" data-element="scale" style=\'display:none\'>\n        <h4 data-element="scale-text"></h4>\n        <div style=\'text-align:center\'>\n          <input type="range" value="0" max="10" step="1" data-element="scale-scale"/>\n        </div>\n      </div>\n    </div>\n\n  ';

	  var offset = 0;

	  function build(groupList) {

	    if (groupList == null || groupList == undefined || !Object.keys(groupList).length) {
	      console.warn('no items in database. click add to add somthing');
	      Falcon.animations.nothing.show();
	      return;
	    }

	    var keys = Object.keys(groupList);

	    var filtered = keys.map(function (item) {

	      if (String(groupList[item].scale) && groupList[item].title && groupList[item].body) {
	        return {
	          id: item,
	          title: groupList[item].title,
	          color: groupList[item].color,
	          body: groupList[item].body
	        };
	      }
	    }).filter(function (e) {
	      return e !== undefined;
	    }).forEach(function (item, i, arr) {
	      offset += 100;

	      setTimeout(function () {

	        render({ type: 'add', id: item.id, title: item.title, body: item.body, colorCode: item.color });
	      }, offset);
	      if (i - 1 === arr.length) {
	        offset = 0;
	      }
	    });
	  }
	  function hide_nothing() {
	    animate('hide', DOM.nothing, 400, 'animate').delay('hide', DOM.nothing.children[0], 400, 'animate');
	  }
	  function render(_ref) {
	    var type = _ref.type;
	    var id = _ref.id;
	    var title = _ref.title;
	    var body = _ref.body;
	    var target = _ref.target;
	    var colorCode = _ref.colorCode;

	    if (!_.willRender.check()) {
	      console.log('%c Failed to render', 'color:red');
	      return;
	    }
	    hide_nothing();
	    var holder = void 0;
	    var trimedDiv = void 0;
	    var elmTitle = void 0;
	    var elmBody = void 0;
	    var elmColor = void 0;
	    var elmPannel = void 0;
	    var edit = void 0;
	    if (type === 'add') {

	      holder = document.createElement('div');
	      holder.innerHTML = Template;

	      trimedDiv = holder.children[0];

	      trimedDiv.classList.add('list-item-animate');
	      trimedDiv.classList.add('list-item-hide');

	      DOM.mount.appendChild(trimedDiv);
	      animate('show', trimedDiv, 400, 'animate');

	      elmTitle = trimedDiv.querySelector('[data-element=title]');
	      elmBody = trimedDiv.querySelector('[data-element=body]');
	      elmColor = trimedDiv.querySelector('[data-element=colorize]');
	      elmPannel = trimedDiv.querySelector('[data-element=list-pannel]');
	      edit = trimedDiv.querySelector('[data-element=edit]');
	      elmPannel.children[0].onclick = Falcon.remove.button.bind(Falcon.remove, trimedDiv);

	      edit.onclick = _.Editor.edit.bind(_.Editor);
	      elmColor.onclick = Falcon.colorize.button.bind(Falcon.colorize, trimedDiv);
	      trimedDiv.setAttribute('firebase-id', id);
	      trimedDiv.setAttribute('color-id', colorCode);
	      trimedDiv.style.background = _colorArray.colorArray[colorCode] || 'white';
	      if (title) {

	        elmTitle.textContent = title;
	      }
	      if (body) {
	        elmBody.style.display = 'block';
	        elmBody.children[0].textContent = body;
	      }
	    } else {
	      var edit_title = target.querySelector('[data-element=title]');
	      var edit_body = target.querySelector('[data-element=body]');
	      var edit_scale = target.querySelector('[data-element=scale]');

	      if (title) {
	        edit_title.textContent = title;
	      }
	      if (body) {
	        edit_body.style.display = 'block';
	        edit_body.children[0].textContent = body;
	      }
	    }
	  }

	  var renderer = {
	    buildFrom: build,
	    render: render
	  };

	  return renderer;
	};

	var _colorArray = __webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var colorArray = exports.colorArray = ['#cc66ff', '#66ccff', '#33cc33', '#ff3300', '#3366ff', '#ff6600', '#0066cc', '#ff66cc', '#ff9999', '#99ff66', '#666699', '#fc1', '#ac2', '#ffffff'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (type, elm, delay, classList, displayType) {
	  var display = 'block';
	  var waitDelay = 0;
	  waitDelay = delay;
	  var animator = function animator(_type, _elm, _transDelay, _classList, _display) {
	    if (typeof _display == 'string' || _display === ('flex' || 'inline-block')) {
	      display = _display;
	    }

	    var hide = function hide() {

	      _elm.classList.remove(_classList);
	      setTimeout(function () {
	        _elm.style.display = 'none';
	      }, _transDelay);
	    };
	    var show = function show() {

	      _elm.style.transition = 'all ' + _transDelay / 1000 + 's';
	      _elm.style.display = display;
	      setTimeout(function () {
	        _elm.classList.add(_classList);
	      }, _transDelay);
	    };

	    var clear = function clear() {
	      _elm.classList.remove(_classList);
	    };

	    switch (_type) {
	      case 'hide':
	        {
	          hide();
	        };break;
	      case 'show':
	        {
	          show();
	        };break;
	      case 'clear':
	        {
	          clear();
	        }
	    }
	  };
	  animator(type, elm, delay, classList, displayType);

	  var options = {
	    delay: function delay(type, elm, transDelay, classList, display) {
	      waitDelay = transDelay;
	      setTimeout(function () {
	        animator(type, elm, transDelay, classList, display);
	      }, transDelay);
	      return this;
	    },
	    wait: function wait(callback) {
	      setTimeout(function () {
	        callback();
	      }, waitDelay * 2);
	    },
	    stagger: function stagger(type, staggerAmount, domNodes, classList, display) {
	      var staggeree = 0;
	      domNodes.forEach(function (node) {
	        staggeree += staggerAmount;
	        setTimeout(function () {
	          animator(type, node, staggeree, classList, display);
	        }, staggeree);
	      });
	      waitDelay = staggerAmount * domNodes.length;
	      return this;
	    }

	  };
	  return options;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _localStorage = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Undo = function () {
	  function Undo(Falcon, _) {
	    _classCallCheck(this, Undo);

	    Undo._ = _;
	    this.Falcon = Falcon;
	    this.elements = [];
	    this.DOM = _.DOM;
	    this.animate = _.animate;
	    this.x_timer = null;
	    this.deleting = true;
	    _.DOM.undo.children[0].children[0].onclick = this.removeButton.bind(this);
	    _localStorage.$storage.ss.clear();
	  }

	  _createClass(Undo, [{
	    key: 'toggle',
	    value: function toggle(bool) {

	      if (bool) {
	        this.animate('show', this.DOM.undo, 100, 'animate').delay('show', this.DOM.undo.children[0], 200, 'animate');
	      } else {
	        this.animate('hide', this.DOM.undo.children[0], 400, 'animate').delay('hide', this.DOM.undo, 100, 'animate');
	      }
	    }
	  }, {
	    key: 'syncSessionStorage',
	    value: function syncSessionStorage(type, data) {
	      switch (type) {
	        case 'del':
	          _localStorage.$storage.ss.del();break;
	        case 'add':
	          _localStorage.$storage.ss.add(data);break;
	      }
	    }
	  }, {
	    key: 'removeButton',
	    value: function removeButton() {
	      this.deleting = false;
	      this.timer();
	      var lastElm = this.elements.shift();
	      this.syncSessionStorage('del');
	      this.render(lastElm);
	    }
	  }, {
	    key: 'render',
	    value: function render(lastElm) {
	      if (lastElm === void 0) {
	        return;
	      }
	      this.Falcon.render.render({ type: 'add', id: lastElm.id, title: lastElm.title, body: lastElm.body, colorCode: Number(lastElm.color) });
	    }
	  }, {
	    key: 'button',
	    value: function button(listItem) {
	      var _this = this;

	      this.deleting = true;
	      this.timer();
	      this.toggle(true);

	      for (var i = 0; i < this.elements.length; i++) {
	        if (listItem.getAttribute('firebase-id') === this.elements[i].id) {
	          return;
	        }
	      }
	      var currentElement = {
	        id: listItem.getAttribute('firebase-id'),
	        title: listItem.querySelector('[data-element=title]').textContent,
	        body: listItem.querySelector('[data-element=body-p]').textContent,
	        color: listItem.getAttribute('color-id')
	      };
	      this.elements.push(currentElement);

	      this.animate('show', listItem, 250, 'delete').wait(function () {

	        listItem.style.display = 'none';
	        _this.DOM.mount.removeChild(listItem);
	        _this.DOM.mount.children.length < 1 && _this.Falcon.animations.nothing.show();

	        _this.syncSessionStorage('add', currentElement);
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      var _this2 = this;

	      JSON.parse(sessionStorage.deleted).forEach(function (item) {
	        return _this2.updateFirbase(item.id);
	      });
	    }
	  }, {
	    key: 'timer',
	    value: function timer() {
	      var _this3 = this;

	      clearTimeout(this.x_timer);
	      this.x_timer = setTimeout(function () {
	        _this3.toggle(false);

	        if (_this3.deleting) {
	          _this3.remove();
	        }
	        _this3.deleting = false;
	      }, 5000);
	    }
	  }, {
	    key: 'updateFirbase',
	    value: function updateFirbase(itemID) {
	      Undo._.actions.remove(itemID);
	    }
	  }]);

	  return Undo;
	}();

	exports.default = Undo;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _colorArray = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ColorPannel = function () {
	  function ColorPannel(Falcon, _) {
	    _classCallCheck(this, ColorPannel);

	    this.state = {
	      toggle: false
	    };
	    this.animate = _.animate;

	    this.Falcon = Falcon;
	    this.DOM = _.DOM;
	    ColorPannel.actions = _.actions;
	    this.colors = _colorArray.colorArray;
	    this.currentElement = null;
	    _.DOM.color.group.onclick = this.delegate.bind(this);
	    _.DOM.color.defaults.onclick = this.defaults.bind(this);
	    _.DOM.color.overlay.onclick = this.toggle.bind(this);
	    _.DOM.color.close.onclick = this.toggle.bind(this);
	  }

	  _createClass(ColorPannel, [{
	    key: 'button',
	    value: function button(listItem) {
	      this.toggle();
	      this.currentElement = listItem;
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      var _this = this;

	      var self = this;
	      var colors = Array.apply(null, this.DOM.color.group.children);
	      this.state.toggle = !this.state.toggle;

	      if (this.state.toggle) {
	        this.animate('show', this.DOM.color.element, 0, 'animate').delay('show', this.DOM.color.overlay, 100, 'animate').delay('show', this.DOM.color.content.children[1], 200, 'animate', 'flex').stagger('show', 60, colors, 'animate', 'inline-flex');
	      } else {

	        this.animate('hide', this.DOM.color.content.children[1], 400, 'animate').delay('hide', this.DOM.color.overlay, 100, 'animate').wait(function () {

	          _this.animate('hide', _this.DOM.color.element, 0, 'animate');
	          colors.forEach(function (item) {
	            return item.classList.remove('animate');
	          });
	        });
	      }
	    }
	  }, {
	    key: 'updateElement',
	    value: function updateElement(colorCode) {
	      this.currentElement.style.background = this.colors[colorCode];
	      this.currentElement.setAttribute('color-id', colorCode);
	    }
	  }, {
	    key: 'delegate',
	    value: function delegate(e) {
	      if (e.target.hasAttribute('color-id')) {

	        var cords = [e.target.offsetLeft, e.target.offsetTop];
	        var colorID = Number(e.target.getAttribute('color-id'));
	        var getRawColor = _colorArray.colorArray[colorID];
	        this.updateFirebase(colorID);
	        this.updateElement(colorID);
	      }
	    }
	  }, {
	    key: 'updateFirebase',
	    value: function updateFirebase(colorCode) {
	      var id = this.currentElement.getAttribute('firebase-id');
	      ColorPannel.actions.color(id, colorCode);
	    }
	  }, {
	    key: 'defaults',
	    value: function defaults() {
	      this.updateFirebase(13);
	      this.updateElement(13);
	    }
	  }]);

	  return ColorPannel;
	}();

	exports.default = ColorPannel;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Pannel;
	function Pannel(DOM, publicname) {

	  return {
	    username: '',
	    update: function update(username) {
	      this.username = username;
	      return this;
	    },
	    status: function status(loginState) {
	      loginState ? this.login() : this.logout();
	    },
	    login: function login() {

	      DOM.pannel.user.textContent = this.username;
	      DOM.pannel.pannel.children[0].children[1].style.display = 'block';
	      DOM.pannel.logout.children[0].innerText = 'Logout';
	    },
	    logout: function logout() {
	      DOM.pannel.pannel.children[0].children[1].style.display = 'none';
	      DOM.pannel.user.textContent = publicname;
	      DOM.pannel.logout.children[0].innerText = '';
	    }
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _localStorage = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var renderGroupTags = function renderGroupTags(mountElm, _, Falcon) {
	  var frag = document.createDocumentFragment();
	  var LS = JSON.parse(localStorage.groups);
	  var SS = JSON.parse(sessionStorage.groups);
	  var joined = LS.concat(SS);

	  if (joined.indexOf(localStorage.lastGroup) < 0) {
	    joined.push(localStorage.lastGroup);
	  }
	  var createLi = joined.forEach(function (group) {
	    var li = document.createElement('li');
	    li.textContent = group;
	    li.setAttribute('group-id', group);
	    li.className = 'group-li';
	    li.onclick = function () {

	      _.actions.switchGroup(Falcon.group.check(), group);
	      Falcon.group.update(group);
	      _localStorage.$storage.set('lastGroup', group);
	    };
	    frag.appendChild(li);
	  });
	  mountElm.appendChild(frag);
	};

	function excludeSettings(e) {
	  var _this = this;

	  var isChildOf = function isChildOf(node) {
	    try {
	      if (node.tagName == 'BODY') {
	        return false;
	      }
	    } catch (e) {
	      return false;
	    }

	    if (node === _this.DOM.settings.element || node == _this.DOM.settings.toggle) {
	      return true;
	    }
	    return isChildOf(node.parentNode);
	  };

	  if (!isChildOf(e.target)) {
	    this.state.toggle = false;
	    this.animate('hide', this.DOM.settings.element, 400, 'animate');
	  }
	}

	var Settings = function () {
	  function Settings(Falcon, _) {
	    _classCallCheck(this, Settings);

	    this.state = {
	      toggle: false,
	      changeGroup: false,
	      addGroup: false,
	      share: false
	    };
	    this._ = _;
	    this.actions = _.actions;
	    this.Falcon = Falcon;
	    this.DOM = _.DOM;
	    this.animate = _.animate;
	    this.addGroup = this.addGroup;
	    this.clearList = this.clearList;
	    this.changeGroup = this.changeGroup;
	    this.enable = this.enable;
	    this.disable = this.disable;
	    this.isAuthed = _.actions.isAuthed;
	    this.toggle = this.toggle;
	    _.actions.switch_success = function (groupList) {
	      _.animate('no-op', _.DOM.mount, 0, 'no-op').stagger('hide', 100, Array.apply(null, _.DOM.mount.children), 'animate', 'block').wait(function () {
	        _.DOM.mount.parentNode.style.background = '';
	        _.DOM.mount.innerHTML = '';

	        Falcon.render.buildFrom(groupList);
	      });
	    };
	    _.actions.switch_error = function () {
	      console.error('nothing found at group \'' + Falcon.group.check() + '\'');
	      _.DOM.mount.innerHTML = '';
	      Falcon.animations.nothing.show();
	    };
	  }

	  _createClass(Settings, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.state.toggle = !this.state.toggle; //this hooks into when Clicked outside
	      if (this.state.toggle) {
	        this.animate('show', this.DOM.settings.element, 400, 'animate');
	        this.whenClickedOutside(true);
	      } else {
	        this.animate('hide', this.DOM.settings.element, 400, 'animate');
	        this.whenClickedOutside(true);
	      }
	    }
	  }, {
	    key: 'whenClickedOutside',
	    value: function whenClickedOutside(bool) {
	      if (bool) {
	        document.addEventListener('click', excludeSettings.bind(this));
	      } else {
	        document.removeEventListener('click', excludeSettings.bind(this));
	      }
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this.DOM.settings.toggle.onclick = this.toggle.bind(this);
	      this.DOM.settings.clearList.onclick = this.clearList.bind(this);
	      this.DOM.settings.groups.add.onclick = this.addGroup.bind(this);
	      this.DOM.settings.groups.change.onclick = this.changeGroup.bind(this);
	      this.DOM.settings.share.button.onclick = this.share.bind(this);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.DOM.settings.toggle.onclick = null;
	      this.DOM.settings.clearList.onclick = null;
	      this.DOM.settings.groups.add.onclick = null;
	      this.DOM.settings.groups.change.onclick = null;
	    }
	  }, {
	    key: 'changeGroup',
	    value: function changeGroup() {
	      var _this2 = this;

	      this.state.changeGroup = !this.state.changeGroup;
	      if (this.state.changeGroup) {
	        this.state.addGroup = false;
	        this.animate('hide', this.DOM.settings.groups.UI.children[1], 400, 'animate');
	        this.animate('show', this.DOM.settings.groups.UI.children[0], 400, 'animate');
	        renderGroupTags(this.DOM.settings.groups.UI.children[0], this._, this.Falcon);
	      } else {
	        this.animate('hide', this.DOM.settings.groups.UI.children[0], 400, 'animate').wait(function () {
	          _this2.DOM.settings.groups.UI.children[0].innerHTML = '';
	        });
	      }
	    }
	  }, {
	    key: 'addGroup',
	    value: function addGroup() {
	      this.state.addGroup = !this.state.addGroup;
	      var button = this.DOM.settings.groups.UI.children[1].children[1];
	      var input = this.DOM.settings.groups.UI.children[1].children[0];
	      if (this.state.addGroup) {
	        this.animate('hide', this.DOM.settings.groups.UI.children[0], 400, 'animate');
	        this.animate('show', this.DOM.settings.groups.UI.children[1], 400, 'animate');

	        button.onclick = function () {
	          if (input.value.length && /[a-z0-9 \-_]/i.test(input.value)) {
	            _localStorage.$storage.merge('groups', input.value);
	            input.value = '';
	          } else {
	            alert('invaild group name');
	          }
	        };
	      } else {
	        this.animate('hide', this.DOM.settings.groups.UI.children[1], 400, 'animate');
	        button.onclick = null;
	      }
	    }
	  }, {
	    key: 'clearList',
	    value: function clearList() {
	      var _this3 = this;

	      var items = Array.apply(null, this.DOM.mount.children);
	      var confirm = window.confirm('confirm action?');
	      if (confirm) {

	        var ids = items.map(function (e) {
	          return e.getAttribute('firebase-id');
	        }).forEach(function (i) {
	          return _this3.actions.remove(i);
	        });

	        this.animate('no-op', this.DOM.mount, 0, 'noop').stagger('hide', 100, items, 'animate').wait(function () {

	          //$.clearGroup.group();
	          _this3.DOM.mount.innerHTML = '';
	          _this3.Falcon.animations.nothing.show();
	        });
	      }
	    }
	  }, {
	    key: 'share',
	    value: function share() {}
	  }]);

	  return Settings;
	}();

	exports.default = Settings;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = localStorageSetup;
	function localStorageSetup() {
	  if (localStorage.lastGroup === void 0 || localStorage.lastGroup === '' || localStorage.lastGroup == null) {
	    localStorage.lastGroup = 'default';
	  }
	  if (localStorage.groups === void 0 || localStorage.groups === '' || localStorage.groups == null) {
	    localStorage.groups = '["default"]';
	  }
	  if (sessionStorage.deleted === void 0 || sessionStorage.deleted === '' || sessionStorage.deleted == null) {
	    sessionStorage.deleted = '[]';
	  }
	  if (sessionStorage.groups === void 0 || sessionStorage.groups === '' || sessionStorage.groups == null) {
	    sessionStorage.groups = '[]';
	  }
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _localStorage = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function authProvider(provider) {
	  if (provider == null || provider == void 0) {
	    return false;
	  }
	  var _provider = void 0;
	  var scope = void 0;
	  switch (provider) {
	    case 'google':
	      _provider = new firebase.auth.GoogleAuthProvider();scope = _provider.addScope('https://www.googleapis.com/auth/plus.login');break;
	    case 'facebook':
	      _provider = new firebase.auth.FacebookAuthProvider();break;
	    case 'twitter':
	      _provider = new firebase.auth.TwitterAuthProvider();break;
	    default:
	      return false;
	  }
	  return _provider;
	}

	function credentialProvider(provider, creds) {
	  if (provider == null || provider == void 0) {
	    return false;
	  }
	  var credProvider = void 0;
	  var scope = void 0;

	  switch (provider) {
	    case 'google':
	      credProvider = firebase.auth.GoogleAuthProvider.credential(creds.id, creds.token);break;
	    case 'facebook':
	      credProvider = firebase.auth.FacebookAuthProvider.credential(creds.token);break;
	    case 'twitter':
	      credProvider = firebase.auth.TwitterAuthProvider.credential(creds.token, creds.secret);break;
	    default:
	      return false;
	  }
	  return credProvider;
	}

	var I_firebase = function () {
	  function I_firebase(Falcon, _) {
	    var _this = this;

	    _classCallCheck(this, I_firebase);

	    this.authStatus = false;
	    this.Falcon = Falcon;
	    this.DOM = _.DOM;
	    this.isDemo = false;
	    this.demoify = this.demoify;
	    this.demo = function (e) {
	      return _this.isDemo;
	    };
	    this._ = _;
	    this.DB = _.database;
	    this.group = Falcon.group;
	    this.animate = _.animate;
	    this.authChecker = _.authChecker;
	    this.authenticator = this.authenticator;
	    this.login = this.login;
	    this.logout = this.logout;
	    this.onload = this.onload;
	    this.loadFromGroup = this.loadFromGroup;
	    this.signin = this.signin;
	    this.onload = this.onload;
	    this.switchGroup = this.switchGroup;

	    this.login_success = null;
	    this.login_error = null;
	    this.database_success = null;
	    this.database_error = null;
	    this.onload_success = null;
	    this.onload_error = null;

	    this.switch_success = null;
	    this.switch_error = null;
	  }

	  _createClass(I_firebase, [{
	    key: 'authenticator',
	    value: function authenticator(provider) {
	      if (this.isDemo === true) {
	        return;
	      }
	      var actions = {
	        error: null,
	        success: null
	      };
	      _localStorage.$storage.set('provider', provider);

	      return actions;
	    }
	  }, {
	    key: 'login',
	    value: function login(provider) {
	      if (this.isDemo === true) {
	        return;
	      }
	      var self = this;
	      var getProvider = authProvider(provider);
	      if (!getProvider) {
	        return;
	      }

	      firebase.auth().signInWithPopup(getProvider).then(function (result) {
	        self.authData = result;
	        self.authStatus = true;
	        _localStorage.$storage.set('provider', provider);
	        result.credential.idToken !== void 0 && _localStorage.$storage.set('ID', result.credential.idToken);
	        _localStorage.$storage.set('accessToken', result.credential.accessToken);
	        result.credential.secret !== void 0 && _localStorage.$storage.set('secret', result.credential.secret);

	        try {
	          self.login_success(provider, result.user);
	        } catch (e) {
	          console.log(e);
	        }
	      }).catch(function (e) {
	        console.error(e.message);
	        self.login_error(e.message);
	      });
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      if (this.isDemo === true) {
	        return;
	      }
	      firebase.auth().signOut();
	    }
	  }, {
	    key: 'database_onload',
	    value: function database_onload() {
	      if (this.isDemo === true) {
	        return;
	      }
	      var self = this;
	      var uid = void 0;
	      try {
	        uid = this.authData.user.uid;
	      } catch (e) {
	        uid = this.authData.uid;
	      }

	      firebase.database().ref('users').child(uid).child('groups').once('value', function (e) {
	        var data = e.val();

	        if (data) {
	          self.database_success(data);
	        } else {
	          self.database_error();
	        }
	      });
	    }
	  }, {
	    key: 'onload',
	    value: function onload(provider) {
	      if (this.isDemo === true) {
	        return;
	      }
	      if (provider === void 0) {
	        this.onload_error();
	      }
	      var self = this;
	      if ((_localStorage.$storage.get('ID') === null || _localStorage.$storage.get('ID') === '') && (_localStorage.$storage.get('accessToken') === null || _localStorage.$storage.get('accessToken') === '')) {
	        console.log('error auto sign in');
	        this.onload_error();
	        return;
	      }
	      var creds = {
	        id: _localStorage.$storage.get('ID'),
	        token: _localStorage.$storage.get('accessToken'),
	        secret: _localStorage.$storage.get('secret')
	      };
	      var signinWith = credentialProvider(provider, creds);

	      firebase.auth().signInWithCredential(signinWith).then(function (result) {
	        self.authStatus = true;
	        self.authData = result;

	        try {
	          self.onload_success(provider, result);
	        } catch (e) {
	          console.log(e);
	        }
	      }).catch(function (err) {
	        self.onload_error(err);
	      });
	    }
	  }, {
	    key: 'add',
	    value: function add(payload, callback) {
	      if (this.isDemo === true) {
	        return;
	      }
	      var uid = void 0;
	      try {
	        uid = this.authData.user.uid;
	      } catch (e) {
	        uid = this.authData.uid;
	      }

	      firebase.database().ref('users').child(uid).child('groups').child(this.group.check()).push({
	        title: payload.title, body: payload.body, color: 13
	      }).once('value', function (e) {

	        callback(e.key);
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove(itemID) {
	      if (this.isDemo === true) {
	        return;
	      }
	      var uid = void 0;
	      try {
	        uid = this.authData.user.uid;
	      } catch (e) {
	        uid = this.authData.uid;
	      }

	      firebase.database().ref('users').child(uid).child('groups').child(this.group.check()).child(itemID).remove();
	    }
	  }, {
	    key: 'color',
	    value: function color(itemID, colorCode) {
	      if (this.isDemo === true) {
	        return;
	      }
	      var uid = void 0;
	      try {
	        uid = this.authData.user.uid;
	      } catch (e) {
	        uid = this.authData.uid;
	      }
	      firebase.database().ref('users').child(uid).child('groups').child(this.group.check()).child(itemID).update({ color: colorCode });
	    }
	  }, {
	    key: 'switchGroup',
	    value: function switchGroup(oldGroupName, newGroupName) {
	      var _this2 = this;

	      if (this.isDemo === true) {
	        return;
	      }
	      if (oldGroupName === newGroupName) {
	        return;
	      }
	      var uid = void 0;
	      try {
	        uid = this.authData.user.uid;
	      } catch (e) {
	        uid = this.authData.uid;
	      }
	      firebase.database().ref('users').child(uid).child('groups').child(newGroupName).once('value', function (e) {
	        var data = e.val();
	        if (data === null) {
	          _this2.switch_error();
	          return;
	        }

	        _this2.switch_success(data);
	      });
	    }
	  }, {
	    key: 'edit',
	    value: function edit(payload) {
	      if (this.isDemo === true) {
	        return;
	      }
	      var title = payload.title;
	      var id = payload.id;
	      var body = payload.body;

	      var uid = void 0;
	      try {
	        uid = this.authData.user.uid;
	      } catch (e) {
	        uid = this.authData.uid;
	      }
	      firebase.database().ref('users').child(uid).child('groups').child(this.group.check()).child(id).update({ title: title, body: body });
	    }
	  }, {
	    key: 'signin',
	    value: function signin(provider) {

	      this.login(provider);
	    }
	  }, {
	    key: 'isAuthed',
	    value: function isAuthed() {
	      return this.authStatus;
	    }
	  }, {
	    key: 'demoify',
	    value: function demoify() {
	      this.isDemo = true;
	    }
	  }]);

	  return I_firebase;
	}();

	exports.default = I_firebase;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (animate, DOM) {

	  return {
	    homepage: (0, _homepage2.default)(animate, DOM),
	    nothing: (0, _nothing2.default)(animate, DOM)
	  };
	};

	var _homepage = __webpack_require__(17);

	var _homepage2 = _interopRequireDefault(_homepage);

	var _nothing = __webpack_require__(18);

	var _nothing2 = _interopRequireDefault(_nothing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (animate, DOM) {

	  return {
	    hide: function hide() {
	      animate('hide', DOM.homepage, 400, 'animate').stagger('hide', 120, Array.apply(null, DOM.stickys.children), 'animate', 'block').stagger('hide', 200, Array.apply(null, DOM.features.querySelectorAll('.icon')), 'animate', 'block').stagger('hide', 220, Array.apply(null, DOM.features.querySelectorAll('.text')), 'animate', 'block');
	    },
	    show: function show() {
	      DOM.mount.innerHTML = '';
	      animate('show', DOM.homepage, 400, 'animate', 'flex').stagger('show', 120, Array.apply(null, DOM.stickys.children), 'animate', 'block').stagger('show', 200, Array.apply(null, DOM.features.querySelectorAll('.icon')), 'animate', 'block').stagger('show', 220, Array.apply(null, DOM.features.querySelectorAll('.text')), 'animate', 'block').wait(function () {
	        animate('show', DOM.auth.auth, 400, 'animate');
	        animate('hide', DOM.pannel.addClearElm, 400, 'animate');
	      });
	    }
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (animate, DOM) {

	  return {
	    hide: function hide() {
	      animate('hide', DOM.nothing, 100, 'animate').delay('hide', DOM.nothing.children[0], 200, 'animate');
	    },
	    show: function show() {
	      animate('show', DOM.nothing, 100, 'animate').delay('show', DOM.nothing.children[0], 200, 'animate');
	    }
	  };
	};

/***/ }
/******/ ]);
/*! WebUploader 0.1.5 */

/**
 * @fileOverview 让内部各个部件的代码可以用[amd](https://github.com/amdjs/amdjs-api/wiki/AMD)模块定义方式组织起来。
 *
 * AMD API 内部的简单不完全实现，请忽略。只有当WebUploader被合并成一个文件的时候才会引入。
 */
(function (root, factory) {
  const modules = {};

  // 内部require, 简单不完全实现。
  // https://github.com/amdjs/amdjs-api/wiki/require
  const _require = function (deps, callback) {
    let args, len, i;

    // 如果deps不是数组，则直接返回指定module
    if (typeof deps === 'string') {
      return getModule(deps);
    } else {
      args = [];
      for (len = deps.length, i = 0; i < len; i++) {
        args.push(getModule(deps[i]));
      }

      return callback.apply(null, args);
    }
  };

  // 内部define，暂时不支持不指定id.
  const _define = function (id, deps, factory) {
    if (arguments.length === 2) {
      factory = deps;
      deps = null;
    }

    _require(deps || [], function () {
      setModule(id, factory, arguments);
    });
  };

  // 设置module, 兼容CommonJs写法。
  var setModule = function (id, factory, args) {
    const module = {
      exports: factory,
    };
    let returned;

    if (typeof factory === 'function') {
      args.length || (args = [_require, module.exports, module]);
      returned = factory.apply(null, args);
      returned !== undefined && (module.exports = returned);
    }

    modules[id] = module.exports;
  };

  // 根据id获取module
  var getModule = function (id) {
    const module = modules[id] || root[id];

    if (!module) {
      throw new Error(`\`${id}\` is undefined`);
    }

    return module;
  };

  // 将所有modules，将路径ids装换成对象。
  const exportsTo = function (obj) {
    let key, host, parts, part, last, ucFirst;

    // make the first character upper case.
    ucFirst = function (str) {
      return str && (str.charAt(0).toUpperCase() + str.substr(1));
    };

    for (key in modules) {
      host = obj;

      if (!modules.hasOwnProperty(key)) {
        continue;
      }

      parts = key.split('/');
      last = ucFirst(parts.pop());

      while ((part = ucFirst(parts.shift()))) {
        host[part] = host[part] || {};
        host = host[part];
      }

      host[last] = modules[key];
    }

    return obj;
  };

  const makeExport = function (dollar) {
    root.__dollar = dollar;

    // exports every module.
    return exportsTo(factory(root, _define, _require));
  };

  let origin;

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // For CommonJS and CommonJS-like environments where a proper window is present,
    module.exports = makeExport();
  } else if (typeof define === 'function' && define.amd) {
    // Allow using this built library as an AMD module
    // in another project. That other project will only
    // see this AMD call, not the internal modules in
    // the closure below.
    define(['jquery'], makeExport);
  } else {
    // Browser globals case. Just assign the
    // result to a property on the global.
    origin = root.WebUploader;
    root.WebUploader = makeExport();
    root.WebUploader.noConflict = function () {
      root.WebUploader = origin;
    };
  }
})(window, (window, define, require) => {
  /**
   * @fileOverview jQuery or Zepto
   */
  define('dollar-third', [], () => {
    const $ = window.__dollar || window.jQuery || window.Zepto;

    if (!$) {
      throw new Error('jQuery or Zepto not found!');
    }

    return $;
  });
  /**
   * @fileOverview Dom 操作相关
   */
  define('dollar', [
    'dollar-third',
  ], (_) => {
    return _;
  });
  /**
   * @fileOverview 使用jQuery的Promise
   */
  define('promise-third', [
    'dollar',
  ], ($) => {
    return {
      Deferred: $.Deferred,
      when: $.when,

      isPromise(anything) {
        return anything && typeof anything.then === 'function';
      },
    };
  });
  /**
   * @fileOverview Promise/A+
   */
  define('promise', [
    'promise-third',
  ], (_) => {
    return _;
  });
  /**
   * @fileOverview 基础类方法。
   */

  /**
   * Web Uploader内部类的详细说明，以下提及的功能类，都可以在`WebUploader`这个变量中访问到。
   *
   * As you know, Web Uploader的每个文件都是用过[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)规范中的`define`组织起来的, 每个Module都会有个module id.
   * 默认module id为该文件的路径，而此路径将会转化成名字空间存放在WebUploader中。如：
   *
   * module `base`：WebUploader.Base
   * module `file`: WebUploader.File
   * module `lib/dnd`: WebUploader.Lib.Dnd
   * module `runtime/html5/dnd`: WebUploader.Runtime.Html5.Dnd
   *
   *
   * 以下文档中对类的使用可能省略掉了`WebUploader`前缀。
   * @module WebUploader
   * @title WebUploader API文档
   */
  define('base', [
    'dollar',
    'promise',
  ], ($, promise) => {
    const noop = function () {};
    const call = Function.call;

    // http://jsperf.com/uncurrythis
    // 反科里化
    function uncurryThis(fn) {
      return function () {
        return call.apply(fn, arguments);
      };
    }

    function bindFn(fn, context) {
      return function () {
        return fn.apply(context, arguments);
      };
    }

    function createObject(proto) {
      let f;

      if (Object.create) {
        return Object.create(proto);
      } else {
        f = function () {};
        f.prototype = proto;
        return new f();
      }
    }

    /**
     * 基础类，提供一些简单常用的方法。
     * @class Base
     */
    return {

      /**
       * @property {string} version 当前版本号。
       */
      version: '0.1.5',

      /**
       * @property {jQuery|Zepto} $ 引用依赖的jQuery或者Zepto对象。
       */
      $,

      Deferred: promise.Deferred,

      isPromise: promise.isPromise,

      when: promise.when,

      /**
       * @description  简单的浏览器检查结果。
       *
       * `webkit`  webkit版本号，如果浏览器为非webkit内核，此属性为`undefined`。
       * `chrome`  chrome浏览器版本号，如果浏览器为chrome，此属性为`undefined`。
       * `ie`  ie浏览器版本号，如果浏览器为非ie，此属性为`undefined`。**暂不支持ie10+**
       * `firefox`  firefox浏览器版本号，如果浏览器为非firefox，此属性为`undefined`。
       * `safari`  safari浏览器版本号，如果浏览器为非safari，此属性为`undefined`。
       * `opera`  opera浏览器版本号，如果浏览器为非opera，此属性为`undefined`。
       *
       * @property {object} [browser]
       */
      browser: (function (ua) {
        const ret = {};
        const webkit = ua.match(/WebKit\/([\d.]+)/);
        const chrome = ua.match(/Chrome\/([\d.]+)/)
          || ua.match(/CriOS\/([\d.]+)/);

        const ie = ua.match(/MSIE\s([\d\.]+)/)
          || ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i);
        const firefox = ua.match(/Firefox\/([\d.]+)/);
        const safari = ua.match(/Safari\/([\d.]+)/);
        const opera = ua.match(/OPR\/([\d.]+)/);

        webkit && (ret.webkit = Number.parseFloat(webkit[1]));
        chrome && (ret.chrome = Number.parseFloat(chrome[1]));
        ie && (ret.ie = Number.parseFloat(ie[1]));
        firefox && (ret.firefox = Number.parseFloat(firefox[1]));
        safari && (ret.safari = Number.parseFloat(safari[1]));
        opera && (ret.opera = Number.parseFloat(opera[1]));

        return ret;
      })(navigator.userAgent),

      /**
       * @description  操作系统检查结果。
       *
       * `android`  如果在android浏览器环境下，此值为对应的android版本号，否则为`undefined`。
       * `ios` 如果在ios浏览器环境下，此值为对应的ios版本号，否则为`undefined`。
       * @property {object} [os]
       */
      os: (function (ua) {
        const ret = {};

        // osx = !!ua.match( /\(Macintosh\; Intel / ),
        const android = ua.match(/(?:Android);?[\s\/]+([\d.]+)?/);
        const ios = ua.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);

        // osx && (ret.osx = true);
        android && (ret.android = Number.parseFloat(android[1]));
        ios && (ret.ios = Number.parseFloat(ios[1].replace(/_/g, '.')));

        return ret;
      })(navigator.userAgent),

      /**
       * 实现类与类之间的继承。
       * @method inherits
       * @grammar Base.inherits( super ) => child
       * @grammar Base.inherits( super, protos ) => child
       * @grammar Base.inherits( super, protos, statics ) => child
       * @param  {Class} super 父类
       * @param  {object | Function} [protos] 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
       * @param  {Function} [protos.constructor] 子类构造器，不指定的话将创建个临时的直接执行父类构造器的方法。
       * @param  {object} [statics] 静态属性或方法。
       * @return {Class} 返回子类。
       * @example
       * function Person() {
       *     console.log( 'Super' );
       * }
       * Person.prototype.hello = function() {
       *     console.log( 'hello' );
       * };
       *
       * var Manager = Base.inherits( Person, {
       *     world: function() {
       *         console.log( 'World' );
       *     }
       * });
       *
       * // 因为没有指定构造器，父类的构造器将会执行。
       * var instance = new Manager();    // => Super
       *
       * // 继承子父类的方法
       * instance.hello();    // => hello
       * instance.world();    // => World
       *
       * // 子类的__super__属性指向父类
       * console.log( Manager.__super__ === Person );    // => true
       */
      inherits(Super, protos, staticProtos) {
        let child;

        if (typeof protos === 'function') {
          child = protos;
          protos = null;
        } else if (protos && protos.hasOwnProperty('constructor')) {
          child = protos.constructor;
        } else {
          child = function () {
            return Super.apply(this, arguments);
          };
        }

        // 复制静态方法
        $.extend(true, child, Super, staticProtos || {});

        /* jshint camelcase: false */

        // 让子类的__super__属性指向父类。
        child.__super__ = Super.prototype;

        // 构建原型，添加原型方法或属性。
        // 暂时用Object.create实现。
        child.prototype = createObject(Super.prototype);
        protos && $.extend(true, child.prototype, protos);

        return child;
      },

      /**
       * 一个不做任何事情的方法。可以用来赋值给默认的callback.
       * @method noop
       */
      noop,

      /**
       * 返回一个新的方法，此方法将已指定的`context`来执行。
       * @grammar Base.bindFn( fn, context ) => Function
       * @method bindFn
       * @example
       * var doSomething = function() {
       *         console.log( this.name );
       *     },
       *     obj = {
       *         name: 'Object Name'
       *     },
       *     aliasFn = Base.bind( doSomething, obj );
       *
       *  aliasFn();    // => Object Name
       *
       */
      bindFn,

      /**
       * 引用Console.log如果存在的话，否则引用一个[空函数noop](#WebUploader:Base.noop)。
       * @grammar Base.log( args... ) => undefined
       * @method log
       */
      log: (function () {
        if (window.console) {
          return bindFn(console.log, console);
        }
        return noop;
      })(),

      nextTick: (function () {
        return function (cb) {
          setTimeout(cb, 1);
        };

        // @bug 当浏览器不在当前窗口时就停了。
        // var next = window.requestAnimationFrame ||
        //     window.webkitRequestAnimationFrame ||
        //     window.mozRequestAnimationFrame ||
        //     function( cb ) {
        //         window.setTimeout( cb, 1000 / 60 );
        //     };

        // // fix: Uncaught TypeError: Illegal invocation
        // return bindFn( next, window );
      })(),

      /**
       * 被[uncurrythis](http://www.2ality.com/2011/11/uncurrying-this.html)的数组slice方法。
       * 将用来将非数组对象转化成数组对象。
       * @grammar Base.slice( target, start[, end] ) => Array
       * @method slice
       * @example
       * function doSomthing() {
       *     var args = Base.slice( arguments, 1 );
       *     console.log( args );
       * }
       *
       * doSomthing( 'ignored', 'arg2', 'arg3' );    // => Array ["arg2", "arg3"]
       */
      slice: uncurryThis([].slice),

      /**
       * 生成唯一的ID
       * @method guid
       * @grammar Base.guid() => String
       * @grammar Base.guid( prefx ) => String
       */
      guid: (function () {
        let counter = 0;

        return function (prefix) {
          let guid = (+new Date()).toString(32);
          let i = 0;

          for (; i < 5; i++) {
            guid += Math.floor(Math.random() * 65535).toString(32);
          }

          return (prefix || 'wu_') + guid + (counter++).toString(32);
        };
      })(),

      /**
       * 格式化文件大小, 输出成带单位的字符串
       * @method formatSize
       * @grammar Base.formatSize( size ) => String
       * @grammar Base.formatSize( size, pointLength ) => String
       * @grammar Base.formatSize( size, pointLength, units ) => String
       * @param {number} size 文件大小
       * @param {number} [pointLength] 精确到的小数点数。
       * @param {Array} [units] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
       * @example
       * console.log( Base.formatSize( 100 ) );    // => 100B
       * console.log( Base.formatSize( 1024 ) );    // => 1.00K
       * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
       * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
       * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
       * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
       */
      formatSize(size, pointLength, units) {
        let unit;

        units = units || ['B', 'K', 'M', 'G', 'TB'];

        while ((unit = units.shift()) && size > 1024) {
          size = size / 1024;
        }

        return (unit === 'B' ? size : size.toFixed(pointLength || 2))
          + unit;
      },
    };
  });
  /**
   * 事件处理类，可以独立使用，也可以扩展给对象使用。
   * @fileOverview Mediator
   */
  define('mediator', [
    'base',
  ], (Base) => {
    const $ = Base.$;
    const slice = [].slice;
    const separator = /\s+/;
    let protos;

    // 根据条件过滤出事件handlers.
    function findHandlers(arr, name, callback, context) {
      return $.grep(arr, (handler) => {
        return handler
          && (!name || handler.e === name)
          && (!callback || handler.cb === callback
          || handler.cb._cb === callback)
          && (!context || handler.ctx === context);
      });
    }

    function eachEvent(events, callback, iterator) {
      // 不支持对象，只支持多个event用空格隔开
      $.each((events || '').split(separator), (_, key) => {
        iterator(key, callback);
      });
    }

    function triggerHanders(events, args) {
      let stoped = false;
      let i = -1;
      const len = events.length;
      let handler;

      while (++i < len) {
        handler = events[i];

        if (handler.cb.apply(handler.ctx2, args) === false) {
          stoped = true;
          break;
        }
      }

      return !stoped;
    }

    protos = {

      /**
       * 绑定事件。
       *
       * `callback`方法在执行时，arguments将会来源于trigger的时候携带的参数。如
       * ```javascript
       * var obj = {};
       *
       * // 使得obj有事件行为
       * Mediator.installTo( obj );
       *
       * obj.on( 'testa', function( arg1, arg2 ) {
       *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
       * });
       *
       * obj.trigger( 'testa', 'arg1', 'arg2' );
       * ```
       *
       * 如果`callback`中，某一个方法`return false`了，则后续的其他`callback`都不会被执行到。
       * 切会影响到`trigger`方法的返回值，为`false`。
       *
       * `on`还可以用来添加一个特殊事件`all`, 这样所有的事件触发都会响应到。同时此类`callback`中的arguments有一个不同处，
       * 就是第一个参数为`type`，记录当前是什么事件在触发。此类`callback`的优先级比脚低，会再正常`callback`执行完后触发。
       * ```javascript
       * obj.on( 'all', function( type, arg1, arg2 ) {
       *     console.log( type, arg1, arg2 ); // => 'testa', 'arg1', 'arg2'
       * });
       * ```
       *
       * @method on
       * @grammar on( name, callback[, context] ) => self
       * @param  {string}   name     事件名，支持多个事件用空格隔开
       * @param  {Function} callback 事件处理器
       * @param  {object}   [context]  事件处理器的上下文。
       * @return {self} 返回自身，方便链式
       * @chainable
       * @class Mediator
       */
      on(name, callback, context) {
        const me = this;
        let set;

        if (!callback) {
          return this;
        }

        set = this._events || (this._events = []);

        eachEvent(name, callback, (name, callback) => {
          const handler = { e: name };

          handler.cb = callback;
          handler.ctx = context;
          handler.ctx2 = context || me;
          handler.id = set.length;

          set.push(handler);
        });

        return this;
      },

      /**
       * 绑定事件，且当handler执行完后，自动解除绑定。
       * @method once
       * @grammar once( name, callback[, context] ) => self
       * @param  {string}   name     事件名
       * @param  {Function} callback 事件处理器
       * @param  {object}   [context]  事件处理器的上下文。
       * @return {self} 返回自身，方便链式
       * @chainable
       */
      once(name, callback, context) {
        const me = this;

        if (!callback) {
          return me;
        }

        eachEvent(name, callback, (name, callback) => {
          const once = function () {
            me.off(name, once);
            return callback.apply(context || me, arguments);
          };

          once._cb = callback;
          me.on(name, once, context);
        });

        return me;
      },

      /**
       * 解除事件绑定
       * @method off
       * @grammar off( [name[, callback[, context] ] ] ) => self
       * @param  {string}   [name]     事件名
       * @param  {Function} [callback] 事件处理器
       * @param  {object}   [context]  事件处理器的上下文。
       * @return {self} 返回自身，方便链式
       * @chainable
       */
      off(name, cb, ctx) {
        const events = this._events;

        if (!events) {
          return this;
        }

        if (!name && !cb && !ctx) {
          this._events = [];
          return this;
        }

        eachEvent(name, cb, (name, cb) => {
          $.each(findHandlers(events, name, cb, ctx), function () {
            delete events[this.id];
          });
        });

        return this;
      },

      /**
       * 触发事件
       * @method trigger
       * @grammar trigger( name[, args...] ) => self
       * @param  {string}   type     事件名
       * @param  {*} [...] 任意参数
       * @return {boolean} 如果handler中return false了，则返回false, 否则返回true
       */
      trigger(type) {
        let args, events, allEvents;

        if (!this._events || !type) {
          return this;
        }

        args = slice.call(arguments, 1);
        events = findHandlers(this._events, type);
        allEvents = findHandlers(this._events, 'all');

        return triggerHanders(events, args)
          && triggerHanders(allEvents, arguments);
      },
    };

    /**
     * 中介者，它本身是个单例，但可以通过[installTo](#WebUploader:Mediator:installTo)方法，使任何对象具备事件行为。
     * 主要目的是负责模块与模块之间的合作，降低耦合度。
     *
     * @class Mediator
     */
    return $.extend({

      /**
       * 可以通过这个接口，使任何对象具备事件功能。
       * @method installTo
       * @param  {object} obj 需要具备事件行为的对象。
       * @return {object} 返回obj.
       */
      installTo(obj) {
        return $.extend(obj, protos);
      },

    }, protos);
  });
  /**
   * @fileOverview Uploader上传类
   */
  define('uploader', [
    'base',
    'mediator',
  ], (Base, Mediator) => {
    const $ = Base.$;

    /**
     * 上传入口类。
     * @class Uploader
     * @constructor
     * @grammar new Uploader( opts ) => Uploader
     * @example
     * var uploader = WebUploader.Uploader({
     *     swf: 'path_of_swf/Uploader.swf',
     *
     *     // 开起分片上传。
     *     chunked: true
     * });
     */
    function Uploader(opts) {
      this.options = $.extend(true, {}, Uploader.options, opts);
      this._init(this.options);
    }

    // default Options
    // widgets中有相应扩展
    Uploader.options = {};
    Mediator.installTo(Uploader.prototype);

    // 批量添加纯命令式方法。
    $.each({
      upload: 'start-upload',
      stop: 'stop-upload',
      getFile: 'get-file',
      getFiles: 'get-files',
      addFile: 'add-file',
      addFiles: 'add-file',
      sort: 'sort-files',
      removeFile: 'remove-file',
      cancelFile: 'cancel-file',
      skipFile: 'skip-file',
      retry: 'retry',
      isInProgress: 'is-in-progress',
      makeThumb: 'make-thumb',
      md5File: 'md5-file',
      getDimension: 'get-dimension',
      addButton: 'add-btn',
      predictRuntimeType: 'predict-runtime-type',
      refresh: 'refresh',
      disable: 'disable',
      enable: 'enable',
      reset: 'reset',
    }, (fn, command) => {
      Uploader.prototype[fn] = function () {
        return this.request(command, arguments);
      };
    });

    $.extend(Uploader.prototype, {
      state: 'pending',

      _init(opts) {
        const me = this;

        me.request('init', opts, () => {
          me.state = 'ready';
          me.trigger('ready');
        });
      },

      /**
       * 获取或者设置Uploader配置项。
       * @method option
       * @grammar option( key ) => *
       * @grammar option( key, val ) => self
       * @example
       *
       * // 初始状态图片上传前不会压缩
       * var uploader = new WebUploader.Uploader({
       *     compress: null;
       * });
       *
       * // 修改后图片上传前，尝试将图片压缩到1600 * 1600
       * uploader.option( 'compress', {
       *     width: 1600,
       *     height: 1600
       * });
       */
      option(key, val) {
        const opts = this.options;

        // setter
        if (arguments.length > 1) {
          if ($.isPlainObject(val)
            && $.isPlainObject(opts[key])) {
            $.extend(opts[key], val);
          } else {
            opts[key] = val;
          }
        } else { // getter
          return key ? opts[key] : opts;
        }
      },

      /**
       * 获取文件统计信息。返回一个包含一下信息的对象。
       * `successNum` 上传成功的文件数
       * `progressNum` 上传中的文件数
       * `cancelNum` 被删除的文件数
       * `invalidNum` 无效的文件数
       * `uploadFailNum` 上传失败的文件数
       * `queueNum` 还在队列中的文件数
       * `interruptNum` 被暂停的文件数
       * @method getStats
       * @grammar getStats() => Object
       */
      getStats() {
        // return this._mgr.getStats.apply( this._mgr, arguments );
        const stats = this.request('get-stats');

        return stats ? {
          successNum: stats.numOfSuccess,
          progressNum: stats.numOfProgress,

          // who care?
          // queueFailNum: 0,
          cancelNum: stats.numOfCancel,
          invalidNum: stats.numOfInvalid,
          uploadFailNum: stats.numOfUploadFailed,
          queueNum: stats.numOfQueue,
          interruptNum: stats.numofInterrupt,
        } : {};
      },

      // 需要重写此方法来来支持opts.onEvent和instance.onEvent的处理器
      trigger(type/* , args... */) {
        const args = [].slice.call(arguments, 1);
        const opts = this.options;
        const name = `on${type.substring(0, 1).toUpperCase()
                        }${type.substring(1)}`;

        if (
        // 调用通过on方法注册的handler.
          Mediator.trigger.apply(this, arguments) === false

          // 调用opts.onEvent
          || $.isFunction(opts[name])
          && opts[name].apply(this, args) === false

          // 调用this.onEvent
          || $.isFunction(this[name])
          && this[name].apply(this, args) === false

          // 广播所有uploader的事件。
          || Mediator.trigger.apply(Mediator, [this, type].concat(args)) === false) {
          return false;
        }

        return true;
      },

      /**
       * 销毁 webuploader 实例
       * @method destroy
       * @grammar destroy() => undefined
       */
      destroy() {
        this.request('destroy', arguments);
        this.off();
      },

      // widgets/widget.js将补充此方法的详细文档。
      request: Base.noop,
    });

    /**
     * 创建Uploader实例，等同于new Uploader( opts );
     * @method create
     * @class Base
     * @static
     * @grammar Base.create( opts ) => Uploader
     */
    Base.create = Uploader.create = function (opts) {
      return new Uploader(opts);
    };

    // 暴露Uploader，可以通过它来扩展业务逻辑。
    Base.Uploader = Uploader;

    return Uploader;
  });
  /**
   * @fileOverview Runtime管理器，负责Runtime的选择, 连接
   */
  define('runtime/runtime', [
    'base',
    'mediator',
  ], (Base, Mediator) => {
    const $ = Base.$;
    const factories = {};

    // 获取对象的第一个key
    const getFirstKey = function (obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return key;
        }
      }
      return null;
    };

    // 接口类。
    function Runtime(options) {
      this.options = $.extend({
        container: document.body,
      }, options);
      this.uid = Base.guid('rt_');
    }

    $.extend(Runtime.prototype, {

      getContainer() {
        const opts = this.options;
        let parent; let container;

        if (this._container) {
          return this._container;
        }

        parent = $(opts.container || document.body);
        container = $(document.createElement('div'));

        container.attr('id', `rt_${this.uid}`);
        container.css({
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        });

        parent.append(container);
        parent.addClass('webuploader-container');
        this._container = container;
        this._parent = parent;
        return container;
      },

      init: Base.noop,
      exec: Base.noop,

      destroy() {
        this._container && this._container.remove();
        this._parent && this._parent.removeClass('webuploader-container');
        this.off();
      },
    });

    Runtime.orders = 'html5,flash';

    /**
     * 添加Runtime实现。
     * @param {string} type    类型
     * @param {Runtime} factory 具体Runtime实现。
     */
    Runtime.addRuntime = function (type, factory) {
      factories[type] = factory;
    };

    Runtime.hasRuntime = function (type) {
      return !!(type ? factories[type] : getFirstKey(factories));
    };

    Runtime.create = function (opts, orders) {
      let type, runtime;

      orders = orders || Runtime.orders;
      $.each(orders.split(/\s*,\s*/g), function () {
        if (factories[this]) {
          type = this;
          return false;
        }
      });

      type = type || getFirstKey(factories);

      if (!type) {
        throw new Error('Runtime Error');
      }

      runtime = new factories[type](opts);
      return runtime;
    };

    Mediator.installTo(Runtime.prototype);
    return Runtime;
  });

  /**
   * @fileOverview Runtime管理器，负责Runtime的选择, 连接
   */
  define('runtime/client', [
    'base',
    'mediator',
    'runtime/runtime',
  ], (Base, Mediator, Runtime) => {
    let cache;

    cache = (function () {
      const obj = {};

      return {
        add(runtime) {
          obj[runtime.uid] = runtime;
        },

        get(ruid, standalone) {
          let i;

          if (ruid) {
            return obj[ruid];
          }

          for (i in obj) {
            // 有些类型不能重用，比如filepicker.
            if (standalone && obj[i].__standalone) {
              continue;
            }

            return obj[i];
          }

          return null;
        },

        remove(runtime) {
          delete obj[runtime.uid];
        },
      };
    })();

    function RuntimeClient(component, standalone) {
      const deferred = Base.Deferred();
      let runtime;

      this.uid = Base.guid('client_');

      // 允许runtime没有初始化之前，注册一些方法在初始化后执行。
      this.runtimeReady = function (cb) {
        return deferred.done(cb);
      };

      this.connectRuntime = function (opts, cb) {
        // already connected.
        if (runtime) {
          throw new Error('already connected!');
        }

        deferred.done(cb);

        if (typeof opts === 'string' && cache.get(opts)) {
          runtime = cache.get(opts);
        }

        // 像filePicker只能独立存在，不能公用。
        runtime = runtime || cache.get(null, standalone);

        // 需要创建
        if (!runtime) {
          runtime = Runtime.create(opts, opts.runtimeOrder);
          runtime.__promise = deferred.promise();
          runtime.once('ready', deferred.resolve);
          runtime.init();
          cache.add(runtime);
          runtime.__client = 1;
        } else {
          // 来自cache
          Base.$.extend(runtime.options, opts);
          runtime.__promise.then(deferred.resolve);
          runtime.__client++;
        }

        standalone && (runtime.__standalone = standalone);
        return runtime;
      };

      this.getRuntime = function () {
        return runtime;
      };

      this.disconnectRuntime = function () {
        if (!runtime) {
          return;
        }

        runtime.__client--;

        if (runtime.__client <= 0) {
          cache.remove(runtime);
          delete runtime.__promise;
          runtime.destroy();
        }

        runtime = null;
      };

      this.exec = function () {
        if (!runtime) {
          return;
        }

        const args = Base.slice(arguments);
        component && args.unshift(component);

        return runtime.exec.apply(this, args);
      };

      this.getRuid = function () {
        return runtime && runtime.uid;
      };

      this.destroy = (function (destroy) {
        return function () {
          destroy && destroy.apply(this, arguments);
          this.trigger('destroy');
          this.off();
          this.exec('destroy');
          this.disconnectRuntime();
        };
      })(this.destroy);
    }

    Mediator.installTo(RuntimeClient.prototype);
    return RuntimeClient;
  });
  /**
   * @fileOverview 错误信息
   */
  define('lib/dnd', [
    'base',
    'mediator',
    'runtime/client',
  ], (Base, Mediator, RuntimeClent) => {
    const $ = Base.$;

    function DragAndDrop(opts) {
      opts = this.options = $.extend({}, DragAndDrop.options, opts);

      opts.container = $(opts.container);

      if (!opts.container.length) {
        return;
      }

      RuntimeClent.call(this, 'DragAndDrop');
    }

    DragAndDrop.options = {
      accept: null,
      disableGlobalDnd: false,
    };

    Base.inherits(RuntimeClent, {
      constructor: DragAndDrop,

      init() {
        const me = this;

        me.connectRuntime(me.options, () => {
          me.exec('init');
          me.trigger('ready');
        });
      },
    });

    Mediator.installTo(DragAndDrop.prototype);

    return DragAndDrop;
  });
  /**
   * @fileOverview 组件基类。
   */
  define('widgets/widget', [
    'base',
    'uploader',
  ], (Base, Uploader) => {
    const $ = Base.$;
    const _init = Uploader.prototype._init;
    const _destroy = Uploader.prototype.destroy;
    const IGNORE = {};
    const widgetClass = [];

    function isArrayLike(obj) {
      if (!obj) {
        return false;
      }

      const length = obj.length;
      const type = $.type(obj);

      if (obj.nodeType === 1 && length) {
        return true;
      }

      return type === 'array' || type !== 'function' && type !== 'string'
        && (length === 0 || typeof length === 'number' && length > 0
        && (length - 1) in obj);
    }

    function Widget(uploader) {
      this.owner = uploader;
      this.options = uploader.options;
    }

    $.extend(Widget.prototype, {

      init: Base.noop,

      // 类Backbone的事件监听声明，监听uploader实例上的事件
      // widget直接无法监听事件，事件只能通过uploader来传递
      invoke(apiName, args) {
        /*
                    {
                        'make-thumb': 'makeThumb'
                    }
                 */
        const map = this.responseMap;

        // 如果无API响应声明则忽略
        if (!map || !(apiName in map) || !(map[apiName] in this)
          || !$.isFunction(this[map[apiName]])) {
          return IGNORE;
        }

        return this[map[apiName]].apply(this, args);
      },

      /**
       * 发送命令。当传入`callback`或者`handler`中返回`promise`时。返回一个当所有`handler`中的promise都完成后完成的新`promise`。
       * @method request
       * @grammar request( command, args ) => * | Promise
       * @grammar request( command, args, callback ) => Promise
       * @for  Uploader
       */
      request() {
        return this.owner.request.apply(this.owner, arguments);
      },
    });

    // 扩展Uploader.
    $.extend(Uploader.prototype, {

      /**
       * @property {string | Array} [disableWidgets=undefined]
       * @namespace options
       * @for Uploader
       * @description 默认所有 Uploader.register 了的 widget 都会被加载，如果禁用某一部分，请通过此 option 指定黑名单。
       */

      // 覆写_init用来初始化widgets
      _init() {
        const me = this;
        const widgets = me._widgets = [];
        const deactives = me.options.disableWidgets || '';

        $.each(widgetClass, (_, klass) => {
          (!deactives || !~deactives.indexOf(klass._name))
          && widgets.push(new klass(me));
        });

        return _init.apply(me, arguments);
      },

      request(apiName, args, callback) {
        let i = 0;
        const widgets = this._widgets;
        const len = widgets && widgets.length;
        const rlts = [];
        const dfds = [];
        let widget; let rlt; let promise; let key;

        args = isArrayLike(args) ? args : [args];

        for (; i < len; i++) {
          widget = widgets[i];
          rlt = widget.invoke(apiName, args);

          if (rlt !== IGNORE) {
            // Deferred对象
            if (Base.isPromise(rlt)) {
              dfds.push(rlt);
            } else {
              rlts.push(rlt);
            }
          }
        }

        // 如果有callback，则用异步方式。
        if (callback || dfds.length) {
          promise = Base.when.apply(Base, dfds);
          key = promise.pipe ? 'pipe' : 'then';

          // 很重要不能删除。删除了会死循环。
          // 保证执行顺序。让callback总是在下一个 tick 中执行。
          return promise[key](function () {
            const deferred = Base.Deferred();
            let args = arguments;

            if (args.length === 1) {
              args = args[0];
            }

            setTimeout(() => {
              deferred.resolve(args);
            }, 1);

            return deferred.promise();
          })[callback ? key : 'done'](callback || Base.noop);
        } else {
          return rlts[0];
        }
      },

      destroy() {
        _destroy.apply(this, arguments);
        this._widgets = null;
      },
    });

    /**
     * 添加组件
     * @grammar Uploader.register(proto);
     * @grammar Uploader.register(map, proto);
     * @param  {object} responseMap API 名称与函数实现的映射
     * @param  {object} proto 组件原型，构造函数通过 constructor 属性定义
     * @method Uploader.register
     * @for Uploader
     * @example
     * Uploader.register({
     *     'make-thumb': 'makeThumb'
     * }, {
     *     init: function( options ) {},
     *     makeThumb: function() {}
     * });
     *
     * Uploader.register({
     *     'make-thumb': function() {
     *
     *     }
     * });
     */
    Uploader.register = Widget.register = function (responseMap, widgetProto) {
      let map = { init: 'init', destroy: 'destroy', name: 'anonymous' };
      let klass;

      if (arguments.length === 1) {
        widgetProto = responseMap;

        // 自动生成 map 表。
        $.each(widgetProto, (key) => {
          if (key[0] === '_' || key === 'name') {
            key === 'name' && (map.name = widgetProto.name);
            return;
          }

          map[key.replace(/[A-Z]/g, '-$&').toLowerCase()] = key;
        });
      } else {
        map = $.extend(map, responseMap);
      }

      widgetProto.responseMap = map;
      klass = Base.inherits(Widget, widgetProto);
      klass._name = map.name;
      widgetClass.push(klass);

      return klass;
    };

    /**
     * 删除插件，只有在注册时指定了名字的才能被删除。
     * @grammar Uploader.unRegister(name);
     * @param  {string} name 组件名字
     * @method Uploader.unRegister
     * @for Uploader
     * @example
     *
     * Uploader.register({
     *     name: 'custom',
     *
     *     'make-thumb': function() {
     *
     *     }
     * });
     *
     * Uploader.unRegister('custom');
     */
    Uploader.unRegister = Widget.unRegister = function (name) {
      if (!name || name === 'anonymous') {
        return;
      }

      // 删除指定的插件。
      for (let i = widgetClass.length; i--;) {
        if (widgetClass[i]._name === name) {
          widgetClass.splice(i, 1);
        }
      }
    };

    return Widget;
  });
  /**
   * @fileOverview DragAndDrop Widget。
   */
  define('widgets/filednd', [
    'base',
    'uploader',
    'lib/dnd',
    'widgets/widget',
  ], (Base, Uploader, Dnd) => {
    const $ = Base.$;

    Uploader.options.dnd = '';

    /**
     * @property {Selector} [dnd=undefined]  指定Drag And Drop拖拽的容器，如果不指定，则不启动。
     * @namespace options
     * @for Uploader
     */

    /**
     * @property {Selector} [disableGlobalDnd=false]  是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
     * @namespace options
     * @for Uploader
     */

    /**
     * @event dndAccept
     * @param {DataTransferItemList} items DataTransferItem
     * @description 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证。
     * @for  Uploader
     */
    return Uploader.register({
      name: 'dnd',

      init(opts) {
        if (!opts.dnd
          || this.request('predict-runtime-type') !== 'html5') {
          return;
        }

        const me = this;
        const deferred = Base.Deferred();
        const options = $.extend({}, {
          disableGlobalDnd: opts.disableGlobalDnd,
          container: opts.dnd,
          accept: opts.accept,
        });
        let dnd;

        this.dnd = dnd = new Dnd(options);

        dnd.once('ready', deferred.resolve);
        dnd.on('drop', (files) => {
          me.request('add-file', [files]);
        });

        // 检测文件是否全部允许添加。
        dnd.on('accept', (items) => {
          return me.owner.trigger('dndAccept', items);
        });

        dnd.init();

        return deferred.promise();
      },

      destroy() {
        this.dnd && this.dnd.destroy();
      },
    });
  });

  /**
   * @fileOverview 错误信息
   */
  define('lib/filepaste', [
    'base',
    'mediator',
    'runtime/client',
  ], (Base, Mediator, RuntimeClent) => {
    const $ = Base.$;

    function FilePaste(opts) {
      opts = this.options = $.extend({}, opts);
      opts.container = $(opts.container || document.body);
      RuntimeClent.call(this, 'FilePaste');
    }

    Base.inherits(RuntimeClent, {
      constructor: FilePaste,

      init() {
        const me = this;

        me.connectRuntime(me.options, () => {
          me.exec('init');
          me.trigger('ready');
        });
      },
    });

    Mediator.installTo(FilePaste.prototype);

    return FilePaste;
  });
  /**
   * @fileOverview 组件基类。
   */
  define('widgets/filepaste', [
    'base',
    'uploader',
    'lib/filepaste',
    'widgets/widget',
  ], (Base, Uploader, FilePaste) => {
    const $ = Base.$;

    /**
     * @property {Selector} [paste=undefined]  指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为`document.body`.
     * @namespace options
     * @for Uploader
     */
    return Uploader.register({
      name: 'paste',

      init(opts) {
        if (!opts.paste
          || this.request('predict-runtime-type') !== 'html5') {
          return;
        }

        const me = this;
        const deferred = Base.Deferred();
        const options = $.extend({}, {
          container: opts.paste,
          accept: opts.accept,
        });
        let paste;

        this.paste = paste = new FilePaste(options);

        paste.once('ready', deferred.resolve);
        paste.on('paste', (files) => {
          me.owner.request('add-file', [files]);
        });
        paste.init();

        return deferred.promise();
      },

      destroy() {
        this.paste && this.paste.destroy();
      },
    });
  });
  /**
   * @fileOverview Blob
   */
  define('lib/blob', [
    'base',
    'runtime/client',
  ], (Base, RuntimeClient) => {
    function Blob(ruid, source) {
      const me = this;

      me.source = source;
      me.ruid = ruid;
      this.size = source.size || 0;

      // 如果没有指定 mimetype, 但是知道文件后缀。
      if (!source.type && this.ext
        && ~'jpg,jpeg,png,gif,bmp'.indexOf(this.ext)) {
        this.type = `image/${this.ext === 'jpg' ? 'jpeg' : this.ext}`;
      } else {
        this.type = source.type || 'application/octet-stream';
      }

      RuntimeClient.call(me, 'Blob');
      this.uid = source.uid || this.uid;

      if (ruid) {
        me.connectRuntime(ruid);
      }
    }

    Base.inherits(RuntimeClient, {
      constructor: Blob,

      slice(start, end) {
        return this.exec('slice', start, end);
      },

      getSource() {
        return this.source;
      },
    });

    return Blob;
  });
  /**
   * 为了统一化Flash的File和HTML5的File而存在。
   * 以至于要调用Flash里面的File，也可以像调用HTML5版本的File一下。
   * @fileOverview File
   */
  define('lib/file', [
    'base',
    'lib/blob',
  ], (Base, Blob) => {
    let uid = 1;
    const rExt = /\.([^.]+)$/;

    function File(ruid, file) {
      let ext;

      this.name = file.name || (`untitled${uid++}`);
      ext = rExt.exec(file.name) ? RegExp.$1.toLowerCase() : '';

      // todo 支持其他类型文件的转换。
      // 如果有 mimetype, 但是文件名里面没有找出后缀规律
      if (!ext && file.type) {
        ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(file.type)
          ? RegExp.$1.toLowerCase()
          : '';
        this.name += `.${ext}`;
      }

      this.ext = ext;
      this.lastModifiedDate = file.lastModifiedDate
      || (new Date()).toLocaleString();

      Blob.apply(this, arguments);
    }

    return Base.inherits(Blob, File);
  });

  /**
   * @fileOverview 错误信息
   */
  define('lib/filepicker', [
    'base',
    'runtime/client',
    'lib/file',
  ], (Base, RuntimeClent, File) => {
    const $ = Base.$;

    function FilePicker(opts) {
      opts = this.options = $.extend({}, FilePicker.options, opts);

      opts.container = $(opts.id);

      if (!opts.container.length) {
        throw new Error('按钮指定错误');
      }

      opts.innerHTML = opts.innerHTML || opts.label
      || opts.container.html() || '';

      opts.button = $(opts.button || document.createElement('div'));
      opts.button.html(opts.innerHTML);
      opts.container.html(opts.button);

      RuntimeClent.call(this, 'FilePicker', true);
    }

    FilePicker.options = {
      button: null,
      container: null,
      label: null,
      innerHTML: null,
      multiple: true,
      accept: null,
      name: 'file',
    };

    Base.inherits(RuntimeClent, {
      constructor: FilePicker,

      init() {
        const me = this;
        const opts = me.options;
        const button = opts.button;

        button.addClass('webuploader-pick');

        me.on('all', (type) => {
          let files;

          switch (type) {
            case 'mouseenter':
              button.addClass('webuploader-pick-hover');
              break;

            case 'mouseleave':
              button.removeClass('webuploader-pick-hover');
              break;

            case 'change':
              files = me.exec('getFiles');
              me.trigger('select', $.map(files, (file) => {
                file = new File(me.getRuid(), file);

                // 记录来源。
                file._refer = opts.container;
                return file;
              }), opts.container);
              break;
          }
        });

        me.connectRuntime(opts, () => {
          me.refresh();
          me.exec('init', opts);
          me.trigger('ready');
        });

        this._resizeHandler = Base.bindFn(this.refresh, this);
        $(window).on('resize', this._resizeHandler);
      },

      refresh() {
        const shimContainer = this.getRuntime().getContainer();
        const button = this.options.button;
        const width = button.outerWidth
          ? button.outerWidth()
          : button.width();

        const height = button.outerHeight
          ? button.outerHeight()
          : button.height();

        const pos = button.offset();

        width && height && shimContainer.css({
          bottom: 'auto',
          right: 'auto',
          width: `${width}px`,
          height: `${height}px`,
        }).offset(pos);
      },

      enable() {
        const btn = this.options.button;

        btn.removeClass('webuploader-pick-disable');
        this.refresh();
      },

      disable() {
        const btn = this.options.button;

        this.getRuntime().getContainer().css({
          top: '-99999px',
        });

        btn.addClass('webuploader-pick-disable');
      },

      destroy() {
        const btn = this.options.button;
        $(window).off('resize', this._resizeHandler);
        btn.removeClass('webuploader-pick-disable webuploader-pick-hover '
        + 'webuploader-pick');
      },
    });

    return FilePicker;
  });

  /**
   * @fileOverview 文件选择相关
   */
  define('widgets/filepicker', [
    'base',
    'uploader',
    'lib/filepicker',
    'widgets/widget',
  ], (Base, Uploader, FilePicker) => {
    const $ = Base.$;

    $.extend(Uploader.options, {

      /**
       * @property {Selector | object} [pick=undefined]
       * @namespace options
       * @for Uploader
       * @description 指定选择文件的按钮容器，不指定则不创建按钮。
       *
       * `id` {Seletor|dom} 指定选择文件的按钮容器，不指定则不创建按钮。**注意** 这里虽然写的是 id, 但是不是只支持 id, 还支持 class, 或者 dom 节点。
       * `label` {String} 请采用 `innerHTML` 代替
       * `innerHTML` {String} 指定按钮文字。不指定时优先从指定的容器中看是否自带文字。
       * `multiple` {Boolean} 是否开起同时选择多个文件能力。
       */
      pick: null,

      /**
       * @property {Arroy} [accept=null]
       * @namespace options
       * @for Uploader
       * @description 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
       *
       * `title` {String} 文字描述
       * `extensions` {String} 允许的文件后缀，不带点，多个用逗号分割。
       * `mimeTypes` {String} 多个用逗号分割。
       *
       * 如：
       *
       * ```
       * {
       *     title: 'Images',
       *     extensions: 'gif,jpg,jpeg,bmp,png',
       *     mimeTypes: 'image/*'
       * }
       * ```
       */
      accept: null, /* {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            } */
    });

    return Uploader.register({
      name: 'picker',

      init(opts) {
        this.pickers = [];
        return opts.pick && this.addBtn(opts.pick);
      },

      refresh() {
        $.each(this.pickers, function () {
          this.refresh();
        });
      },

      /**
       * @method addButton
       * @for Uploader
       * @grammar addButton( pick ) => Promise
       * @description
       * 添加文件选择按钮，如果一个按钮不够，需要调用此方法来添加。参数跟[options.pick](#WebUploader:Uploader:options)一致。
       * @example
       * uploader.addButton({
       *     id: '#btnContainer',
       *     innerHTML: '选择文件'
       * });
       */
      addBtn(pick) {
        const me = this;
        const opts = me.options;
        const accept = opts.accept;
        const promises = [];

        if (!pick) {
          return;
        }

        $.isPlainObject(pick) || (pick = {
          id: pick,
        });

        $(pick.id).each(function () {
          let options, picker, deferred;

          deferred = Base.Deferred();

          options = $.extend({}, pick, {
            accept: $.isPlainObject(accept) ? [accept] : accept,
            swf: opts.swf,
            runtimeOrder: opts.runtimeOrder,
            id: this,
          });

          picker = new FilePicker(options);

          picker.once('ready', deferred.resolve);
          picker.on('select', (files) => {
            me.owner.request('add-file', [files]);
          });
          picker.init();

          me.pickers.push(picker);

          promises.push(deferred.promise());
        });

        return Base.when.apply(Base, promises);
      },

      disable() {
        $.each(this.pickers, function () {
          this.disable();
        });
      },

      enable() {
        $.each(this.pickers, function () {
          this.enable();
        });
      },

      destroy() {
        $.each(this.pickers, function () {
          this.destroy();
        });
        this.pickers = null;
      },
    });
  });
  /**
   * @fileOverview Image
   */
  define('lib/image', [
    'base',
    'runtime/client',
    'lib/blob',
  ], (Base, RuntimeClient, Blob) => {
    const $ = Base.$;

    // 构造器。
    function Image(opts) {
      this.options = $.extend({}, Image.options, opts);
      RuntimeClient.call(this, 'Image');

      this.on('load', function () {
        this._info = this.exec('info');
        this._meta = this.exec('meta');
      });
    }

    // 默认选项。
    Image.options = {

      // 默认的图片处理质量
      quality: 90,

      // 是否裁剪
      crop: false,

      // 是否保留头部信息
      preserveHeaders: false,

      // 是否允许放大。
      allowMagnify: false,
    };

    // 继承RuntimeClient.
    Base.inherits(RuntimeClient, {
      constructor: Image,

      info(val) {
        // setter
        if (val) {
          this._info = val;
          return this;
        }

        // getter
        return this._info;
      },

      meta(val) {
        // setter
        if (val) {
          this._meta = val;
          return this;
        }

        // getter
        return this._meta;
      },

      loadFromBlob(blob) {
        const me = this;
        const ruid = blob.getRuid();

        this.connectRuntime(ruid, () => {
          me.exec('init', me.options);
          me.exec('loadFromBlob', blob);
        });
      },

      resize() {
        const args = Base.slice(arguments);
        return this.exec.apply(this, ['resize'].concat(args));
      },

      crop() {
        const args = Base.slice(arguments);
        return this.exec.apply(this, ['crop'].concat(args));
      },

      getAsDataUrl(type) {
        return this.exec('getAsDataUrl', type);
      },

      getAsBlob(type) {
        const blob = this.exec('getAsBlob', type);

        return new Blob(this.getRuid(), blob);
      },
    });

    return Image;
  });
  /**
   * @fileOverview 图片操作, 负责预览图片和上传前压缩图片
   */
  define('widgets/image', [
    'base',
    'uploader',
    'lib/image',
    'widgets/widget',
  ], (Base, Uploader, Image) => {
    const $ = Base.$;
    let throttle;

    // 根据要处理的文件大小来节流，一次不能处理太多，会卡。
    throttle = (function (max) {
      let occupied = 0;
      const waiting = [];
      const tick = function () {
        let item;

        while (waiting.length && occupied < max) {
          item = waiting.shift();
          occupied += item[0];
          item[1]();
        }
      };

      return function (emiter, size, cb) {
        waiting.push([size, cb]);
        emiter.once('destroy', () => {
          occupied -= size;
          setTimeout(tick, 1);
        });
        setTimeout(tick, 1);
      };
    })(5 * 1024 * 1024);

    $.extend(Uploader.options, {

      /**
       * @property {object} [thumb]
       * @namespace options
       * @for Uploader
       * @description 配置生成缩略图的选项。
       *
       * 默认为：
       *
       * ```javascript
       * {
       *     width: 110,
       *     height: 110,
       *
       *     // 图片质量，只有type为`image/jpeg`的时候才有效。
       *     quality: 70,
       *
       *     // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
       *     allowMagnify: true,
       *
       *     // 是否允许裁剪。
       *     crop: true,
       *
       *     // 为空的话则保留原有图片格式。
       *     // 否则强制转换成指定的类型。
       *     type: 'image/jpeg'
       * }
       * ```
       */
      thumb: {
        width: 110,
        height: 110,
        quality: 70,
        allowMagnify: true,
        crop: true,
        preserveHeaders: false,

        // 为空的话则保留原有图片格式。
        // 否则强制转换成指定的类型。
        // IE 8下面 base64 大小不能超过 32K 否则预览失败，而非 jpeg 编码的图片很可
        // 能会超过 32k, 所以这里设置成预览的时候都是 image/jpeg
        type: 'image/jpeg',
      },

      /**
       * @property {object} [compress]
       * @namespace options
       * @for Uploader
       * @description 配置压缩的图片的选项。如果此选项为`false`, 则图片在上传前不进行压缩。
       *
       * 默认为：
       *
       * ```javascript
       * {
       *     width: 1600,
       *     height: 1600,
       *
       *     // 图片质量，只有type为`image/jpeg`的时候才有效。
       *     quality: 90,
       *
       *     // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
       *     allowMagnify: false,
       *
       *     // 是否允许裁剪。
       *     crop: false,
       *
       *     // 是否保留头部meta信息。
       *     preserveHeaders: true,
       *
       *     // 如果发现压缩后文件大小比原来还大，则使用原来图片
       *     // 此属性可能会影响图片自动纠正功能
       *     noCompressIfLarger: false,
       *
       *     // 单位字节，如果图片大小小于此值，不会采用压缩。
       *     compressSize: 0
       * }
       * ```
       */
      compress: {
        width: 1600,
        height: 1600,
        quality: 90,
        allowMagnify: false,
        crop: false,
        preserveHeaders: true,
      },
    });

    return Uploader.register({

      name: 'image',

      /**
       * 生成缩略图，此过程为异步，所以需要传入`callback`。
       * 通常情况在图片加入队里后调用此方法来生成预览图以增强交互效果。
       *
       * 当 width 或者 height 的值介于 0 - 1 时，被当成百分比使用。
       *
       * `callback`中可以接收到两个参数。
       * 第一个为error，如果生成缩略图有错误，此error将为真。
       * 第二个为ret, 缩略图的Data URL值。
       *
       * **注意**
       * Date URL在IE6/7中不支持，所以不用调用此方法了，直接显示一张暂不支持预览图片好了。
       * 也可以借助服务端，将 base64 数据传给服务端，生成一个临时文件供预览。
       *
       * @method makeThumb
       * @grammar makeThumb( file, callback ) => undefined
       * @grammar makeThumb( file, callback, width, height ) => undefined
       * @for Uploader
       * @example
       *
       * uploader.on( 'fileQueued', function( file ) {
       *     var $li = ...;
       *
       *     uploader.makeThumb( file, function( error, ret ) {
       *         if ( error ) {
       *             $li.text('预览错误');
       *         } else {
       *             $li.append('<img alt="" src="' + ret + '" />');
       *         }
       *     });
       *
       * });
       */
      makeThumb(file, cb, width, height) {
        let opts, image;

        file = this.request('get-file', file);

        // 只预览图片格式。
        if (!file.type.match(/^image/)) {
          cb(true);
          return;
        }

        opts = $.extend({}, this.options.thumb);

        // 如果传入的是object.
        if ($.isPlainObject(width)) {
          opts = $.extend(opts, width);
          width = null;
        }

        width = width || opts.width;
        height = height || opts.height;

        image = new Image(opts);

        image.once('load', () => {
          file._info = file._info || image.info();
          file._meta = file._meta || image.meta();

          // 如果 width 的值介于 0 - 1
          // 说明设置的是百分比。
          if (width <= 1 && width > 0) {
            width = file._info.width * width;
          }

          // 同样的规则应用于 height
          if (height <= 1 && height > 0) {
            height = file._info.height * height;
          }

          image.resize(width, height);
        });

        // 当 resize 完后
        image.once('complete', () => {
          cb(false, image.getAsDataUrl(opts.type));
          image.destroy();
        });

        image.once('error', (reason) => {
          cb(reason || true);
          image.destroy();
        });

        throttle(image, file.source.size, () => {
          file._info && image.info(file._info);
          file._meta && image.meta(file._meta);
          image.loadFromBlob(file.source);
        });
      },

      beforeSendFile(file) {
        let opts = this.options.compress || this.options.resize;
        const compressSize = opts && opts.compressSize || 0;
        const noCompressIfLarger = opts && opts.noCompressIfLarger || false;
        let image; let deferred;

        file = this.request('get-file', file);

        // 只压缩 jpeg 图片格式。
        // gif 可能会丢失针
        // bmp png 基本上尺寸都不大，且压缩比比较小。
        if (!opts || !~'image/jpeg,image/jpg'.indexOf(file.type)
          || file.size < compressSize
          || file._compressed) {
          return;
        }

        opts = $.extend({}, opts);
        deferred = Base.Deferred();

        image = new Image(opts);

        deferred.always(() => {
          image.destroy();
          image = null;
        });
        image.once('error', deferred.reject);
        image.once('load', () => {
          let width = opts.width;
          let height = opts.height;

          file._info = file._info || image.info();
          file._meta = file._meta || image.meta();

          // 如果 width 的值介于 0 - 1
          // 说明设置的是百分比。
          if (width <= 1 && width > 0) {
            width = file._info.width * width;
          }

          // 同样的规则应用于 height
          if (height <= 1 && height > 0) {
            height = file._info.height * height;
          }

          image.resize(width, height);
        });

        image.once('complete', () => {
          let blob, size;

          // 移动端 UC / qq 浏览器的无图模式下
          // ctx.getImageData 处理大图的时候会报 Exception
          // INDEX_SIZE_ERR: DOM Exception 1
          try {
            blob = image.getAsBlob(opts.type);

            size = file.size;

            // 如果压缩后，比原来还大则不用压缩后的。
            if (!noCompressIfLarger || blob.size < size) {
              // file.source.destroy && file.source.destroy();
              file.source = blob;
              file.size = blob.size;

              file.trigger('resize', blob.size, size);
            }

            // 标记，避免重复压缩。
            file._compressed = true;
            deferred.resolve();
          } catch (e) {
            // 出错了直接继续，让其上传原始图片
            deferred.resolve();
          }
        });

        file._info && image.info(file._info);
        file._meta && image.meta(file._meta);

        image.loadFromBlob(file.source);
        return deferred.promise();
      },
    });
  });
  /**
   * @fileOverview 文件属性封装
   */
  define('file', [
    'base',
    'mediator',
  ], (Base, Mediator) => {
    const $ = Base.$;
    const idPrefix = 'WU_FILE_';
    let idSuffix = 0;
    const rExt = /\.([^.]+)$/;
    const statusMap = {};

    function gid() {
      return idPrefix + idSuffix++;
    }

    /**
     * 文件类
     * @class File
     * @constructor 构造函数
     * @grammar new File( source ) => File
     * @param {Lib.File} source [lib.File](#Lib.File)实例, 此source对象是带有Runtime信息的。
     */
    function WUFile(source) {
      /**
       * 文件名，包括扩展名（后缀）
       * @property name
       * @type {string}
       */
      this.name = source.name || 'Untitled';

      /**
       * 文件体积（字节）
       * @property size
       * @type {uint}
       * @default 0
       */
      this.size = source.size || 0;

      /**
       * 文件MIMETYPE类型，与文件类型的对应关系请参考[http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
       * @property type
       * @type {string}
       * @default 'application/octet-stream'
       */
      this.type = source.type || 'application/octet-stream';

      /**
       * 文件最后修改日期
       * @property lastModifiedDate
       * @type {int}
       * @default 当前时间戳
       */
      this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);

      /**
       * 文件ID，每个对象具有唯一ID，与文件名无关
       * @property id
       * @type {string}
       */
      this.id = gid();

      /**
       * 文件扩展名，通过文件名获取，例如test.png的扩展名为png
       * @property ext
       * @type {string}
       */
      this.ext = rExt.exec(this.name) ? RegExp.$1 : '';

      /**
       * 状态文字说明。在不同的status语境下有不同的用途。
       * @property statusText
       * @type {string}
       */
      this.statusText = '';

      // 存储文件状态，防止通过属性直接修改
      statusMap[this.id] = WUFile.Status.INITED;

      this.source = source;
      this.loaded = 0;

      this.on('error', function (msg) {
        this.setStatus(WUFile.Status.ERROR, msg);
      });
    }

    $.extend(WUFile.prototype, {

      /**
       * 设置状态，状态变化时会触发`change`事件。
       * @method setStatus
       * @grammar setStatus( status[, statusText] );
       * @param {File.Status | string} status [文件状态值](#WebUploader:File:File.Status)
       * @param {string} [statusText] 状态说明，常在error时使用，用http, abort,server等来标记是由于什么原因导致文件错误。
       */
      setStatus(status, text) {
        const prevStatus = statusMap[this.id];

        typeof text !== 'undefined' && (this.statusText = text);

        if (status !== prevStatus) {
          statusMap[this.id] = status;
          /**
           * 文件状态变化
           * @event statuschange
           */
          this.trigger('statuschange', status, prevStatus);
        }
      },

      /**
       * 获取文件状态
       * @return {File.Status}
       * @example
                     文件状态具体包括以下几种类型：
                     {
                         // 初始化
                        INITED:     0,
                        // 已入队列
                        QUEUED:     1,
                        // 正在上传
                        PROGRESS:     2,
                        // 上传出错
                        ERROR:         3,
                        // 上传成功
                        COMPLETE:     4,
                        // 上传取消
                        CANCELLED:     5
                    }
       */
      getStatus() {
        return statusMap[this.id];
      },

      /**
       * 获取文件原始信息。
       * @return {*}
       */
      getSource() {
        return this.source;
      },

      destroy() {
        this.off();
        delete statusMap[this.id];
      },
    });

    Mediator.installTo(WUFile.prototype);

    /**
     * 文件状态值，具体包括以下几种类型：
     * `inited` 初始状态
     * `queued` 已经进入队列, 等待上传
     * `progress` 上传中
     * `complete` 上传完成。
     * `error` 上传出错，可重试
     * `interrupt` 上传中断，可续传。
     * `invalid` 文件不合格，不能重试上传。会自动从队列中移除。
     * `cancelled` 文件被移除。
     * @property {Object} Status
     * @namespace File
     * @class File
     * @static
     */
    WUFile.Status = {
      INITED: 'inited', // 初始状态
      QUEUED: 'queued', // 已经进入队列, 等待上传
      PROGRESS: 'progress', // 上传中
      ERROR: 'error', // 上传出错，可重试
      COMPLETE: 'complete', // 上传完成。
      CANCELLED: 'cancelled', // 上传取消。
      INTERRUPT: 'interrupt', // 上传中断，可续传。
      INVALID: 'invalid', // 文件不合格，不能重试上传。
    };

    return WUFile;
  });

  /**
   * @fileOverview 文件队列
   */
  define('queue', [
    'base',
    'mediator',
    'file',
  ], (Base, Mediator, WUFile) => {
    const $ = Base.$;
    const STATUS = WUFile.Status;

    /**
     * 文件队列, 用来存储各个状态中的文件。
     * @class Queue
     * @extends Mediator
     */
    function Queue() {
      /**
       * 统计文件数。
       * `numOfQueue` 队列中的文件数。
       * `numOfSuccess` 上传成功的文件数
       * `numOfCancel` 被取消的文件数
       * `numOfProgress` 正在上传中的文件数
       * `numOfUploadFailed` 上传错误的文件数。
       * `numOfInvalid` 无效的文件数。
       * `numofDeleted` 被移除的文件数。
       * @property {object} stats
       */
      this.stats = {
        numOfQueue: 0,
        numOfSuccess: 0,
        numOfCancel: 0,
        numOfProgress: 0,
        numOfUploadFailed: 0,
        numOfInvalid: 0,
        numofDeleted: 0,
        numofInterrupt: 0,
      };

      // 上传队列，仅包括等待上传的文件
      this._queue = [];

      // 存储所有文件
      this._map = {};
    }

    $.extend(Queue.prototype, {

      /**
       * 将新文件加入对队列尾部
       *
       * @method append
       * @param  {File} file   文件对象
       */
      append(file) {
        this._queue.push(file);
        this._fileAdded(file);
        return this;
      },

      /**
       * 将新文件加入对队列头部
       *
       * @method prepend
       * @param  {File} file   文件对象
       */
      prepend(file) {
        this._queue.unshift(file);
        this._fileAdded(file);
        return this;
      },

      /**
       * 获取文件对象
       *
       * @method getFile
       * @param  {string} fileId   文件ID
       * @return {File}
       */
      getFile(fileId) {
        if (typeof fileId !== 'string') {
          return fileId;
        }
        return this._map[fileId];
      },

      /**
       * 从队列中取出一个指定状态的文件。
       * @grammar fetch( status ) => File
       * @method fetch
       * @param {string} status [文件状态值](#WebUploader:File:File.Status)
       * @return {File} [File](#WebUploader:File)
       */
      fetch(status) {
        const len = this._queue.length;
        let i; let file;

        status = status || STATUS.QUEUED;

        for (i = 0; i < len; i++) {
          file = this._queue[i];

          if (status === file.getStatus()) {
            return file;
          }
        }

        return null;
      },

      /**
       * 对队列进行排序，能够控制文件上传顺序。
       * @grammar sort( fn ) => undefined
       * @method sort
       * @param {Function} fn 排序方法
       */
      sort(fn) {
        if (typeof fn === 'function') {
          this._queue.sort(fn);
        }
      },

      /**
       * 获取指定类型的文件列表, 列表中每一个成员为[File](#WebUploader:File)对象。
       * @grammar getFiles( [status1[, status2 ...]] ) => Array
       * @method getFiles
       * @param {string} [status] [文件状态值](#WebUploader:File:File.Status)
       */
      getFiles() {
        const sts = [].slice.call(arguments, 0);
        const ret = [];
        let i = 0;
        const len = this._queue.length;
        let file;

        for (; i < len; i++) {
          file = this._queue[i];

          if (sts.length && !~$.inArray(file.getStatus(), sts)) {
            continue;
          }

          ret.push(file);
        }

        return ret;
      },

      /**
       * 在队列中删除文件。
       * @grammar removeFile( file ) => Array
       * @method removeFile
       * @param {File} 文件对象。
       */
      removeFile(file) {
        const me = this;
        const existing = this._map[file.id];

        if (existing) {
          delete this._map[file.id];
          file.destroy();
          this.stats.numofDeleted++;
        }
      },

      _fileAdded(file) {
        const me = this;
        const existing = this._map[file.id];

        if (!existing) {
          this._map[file.id] = file;

          file.on('statuschange', (cur, pre) => {
            me._onFileStatusChange(cur, pre);
          });
        }
      },

      _onFileStatusChange(curStatus, preStatus) {
        const stats = this.stats;

        switch (preStatus) {
          case STATUS.PROGRESS:
            stats.numOfProgress--;
            break;

          case STATUS.QUEUED:
            stats.numOfQueue--;
            break;

          case STATUS.ERROR:
            stats.numOfUploadFailed--;
            break;

          case STATUS.INVALID:
            stats.numOfInvalid--;
            break;

          case STATUS.INTERRUPT:
            stats.numofInterrupt--;
            break;
        }

        switch (curStatus) {
          case STATUS.QUEUED:
            stats.numOfQueue++;
            break;

          case STATUS.PROGRESS:
            stats.numOfProgress++;
            break;

          case STATUS.ERROR:
            stats.numOfUploadFailed++;
            break;

          case STATUS.COMPLETE:
            stats.numOfSuccess++;
            break;

          case STATUS.CANCELLED:
            stats.numOfCancel++;
            break;

          case STATUS.INVALID:
            stats.numOfInvalid++;
            break;

          case STATUS.INTERRUPT:
            stats.numofInterrupt++;
            break;
        }
      },

    });

    Mediator.installTo(Queue.prototype);

    return Queue;
  });
  /**
   * @fileOverview 队列
   */
  define('widgets/queue', [
    'base',
    'uploader',
    'queue',
    'file',
    'lib/file',
    'runtime/client',
    'widgets/widget',
  ], (Base, Uploader, Queue, WUFile, File, RuntimeClient) => {
    const $ = Base.$;
    const rExt = /\.\w+$/;
    const Status = WUFile.Status;

    return Uploader.register({
      name: 'queue',

      init(opts) {
        const me = this;
        let deferred; let len; let i; let item; let arr; let accept; let runtime;

        if ($.isPlainObject(opts.accept)) {
          opts.accept = [opts.accept];
        }

        // accept中的中生成匹配正则。
        if (opts.accept) {
          arr = [];

          for (i = 0, len = opts.accept.length; i < len; i++) {
            item = opts.accept[i].extensions;
            item && arr.push(item);
          }

          if (arr.length) {
            accept = `\\.${arr.join(',')
                                .replace(/,/g, '$|\\.')
                                .replace(/\*/g, '.*')}$`;
          }

          me.accept = new RegExp(accept, 'i');
        }

        me.queue = new Queue();
        me.stats = me.queue.stats;

        // 如果当前不是html5运行时，那就算了。
        // 不执行后续操作
        if (this.request('predict-runtime-type') !== 'html5') {
          return;
        }

        // 创建一个 html5 运行时的 placeholder
        // 以至于外部添加原生 File 对象的时候能正确包裹一下供 webuploader 使用。
        deferred = Base.Deferred();
        this.placeholder = runtime = new RuntimeClient('Placeholder');
        runtime.connectRuntime({
          runtimeOrder: 'html5',
        }, () => {
          me._ruid = runtime.getRuid();
          deferred.resolve();
        });
        return deferred.promise();
      },

      // 为了支持外部直接添加一个原生File对象。
      _wrapFile(file) {
        if (!(file instanceof WUFile)) {
          if (!(file instanceof File)) {
            if (!this._ruid) {
              throw new Error('Can\'t add external files.');
            }
            file = new File(this._ruid, file);
          }

          file = new WUFile(file);
        }

        return file;
      },

      // 判断文件是否可以被加入队列
      acceptFile(file) {
        const invalid = !file || !file.size || this.accept

        // 如果名字中有后缀，才做后缀白名单处理。
          && rExt.exec(file.name) && !this.accept.test(file.name);

        return !invalid;
      },

      /**
       * @event beforeFileQueued
       * @param {File} file File对象
       * @description 当文件被加入队列之前触发，此事件的handler返回值为`false`，则此文件不会被添加进入队列。
       * @for  Uploader
       */

      /**
       * @event fileQueued
       * @param {File} file File对象
       * @description 当文件被加入队列以后触发。
       * @for  Uploader
       */

      _addFile(file) {
        const me = this;

        file = me._wrapFile(file);

        // 不过类型判断允许不允许，先派送 `beforeFileQueued`
        if (!me.owner.trigger('beforeFileQueued', file)) {
          return;
        }

        // 类型不匹配，则派送错误事件，并返回。
        if (!me.acceptFile(file)) {
          me.owner.trigger('error', 'Q_TYPE_DENIED', file);
          return;
        }

        me.queue.append(file);
        me.owner.trigger('fileQueued', file);
        return file;
      },

      getFile(fileId) {
        return this.queue.getFile(fileId);
      },

      /**
       * @event filesQueued
       * @param {File} files 数组，内容为原始File(lib/File）对象。
       * @description 当一批文件添加进队列以后触发。
       * @for  Uploader
       */

      /**
       * @property {boolean} [auto=false]
       * @namespace options
       * @for Uploader
       * @description 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
       *
       */

      /**
       * @method addFiles
       * @grammar addFiles( file ) => undefined
       * @grammar addFiles( [file1, file2 ...] ) => undefined
       * @param {Array of File or File} [files] Files 对象 数组
       * @description 添加文件到队列
       * @for  Uploader
       */
      addFile(files) {
        const me = this;

        if (!files.length) {
          files = [files];
        }

        files = $.map(files, (file) => {
          return me._addFile(file);
        });

        me.owner.trigger('filesQueued', files);

        if (me.options.auto) {
          setTimeout(() => {
            me.request('start-upload');
          }, 20);
        }
      },

      getStats() {
        return this.stats;
      },

      /**
       * @event fileDequeued
       * @param {File} file File对象
       * @description 当文件被移除队列后触发。
       * @for  Uploader
       */

      /**
       * @method removeFile
       * @grammar removeFile( file ) => undefined
       * @grammar removeFile( id ) => undefined
       * @grammar removeFile( file, true ) => undefined
       * @grammar removeFile( id, true ) => undefined
       * @param {File|id} file File对象或这File对象的id
       * @description 移除某一文件, 默认只会标记文件状态为已取消，如果第二个参数为 `true` 则会从 queue 中移除。
       * @for  Uploader
       * @example
       *
       * $li.on('click', '.remove-this', function() {
       *     uploader.removeFile( file );
       * })
       */
      removeFile(file, remove) {
        const me = this;

        file = file.id ? file : me.queue.getFile(file);

        this.request('cancel-file', file);

        if (remove) {
          this.queue.removeFile(file);
        }
      },

      /**
       * @method getFiles
       * @grammar getFiles() => Array
       * @grammar getFiles( status1, status2, status... ) => Array
       * @description 返回指定状态的文件集合，不传参数将返回所有状态的文件。
       * @for  Uploader
       * @example
       * console.log( uploader.getFiles() );    // => all files
       * console.log( uploader.getFiles('error') )    // => all error files.
       */
      getFiles() {
        return this.queue.getFiles.apply(this.queue, arguments);
      },

      fetchFile() {
        return this.queue.fetch.apply(this.queue, arguments);
      },

      /**
       * @method retry
       * @grammar retry() => undefined
       * @grammar retry( file ) => undefined
       * @description 重试上传，重试指定文件，或者从出错的文件开始重新上传。
       * @for  Uploader
       * @example
       * function retry() {
       *     uploader.retry();
       * }
       */
      retry(file, noForceStart) {
        const me = this;
        let files; let i; let len;

        if (file) {
          file = file.id ? file : me.queue.getFile(file);
          file.setStatus(Status.QUEUED);
          noForceStart || me.request('start-upload');
          return;
        }

        files = me.queue.getFiles(Status.ERROR);
        i = 0;
        len = files.length;

        for (; i < len; i++) {
          file = files[i];
          file.setStatus(Status.QUEUED);
        }

        me.request('start-upload');
      },

      /**
       * @method sort
       * @grammar sort( fn ) => undefined
       * @description 排序队列中的文件，在上传之前调整可以控制上传顺序。
       * @for  Uploader
       */
      sortFiles() {
        return this.queue.sort.apply(this.queue, arguments);
      },

      /**
       * @event reset
       * @description 当 uploader 被重置的时候触发。
       * @for  Uploader
       */

      /**
       * @method reset
       * @grammar reset() => undefined
       * @description 重置uploader。目前只重置了队列。
       * @for  Uploader
       * @example
       * uploader.reset();
       */
      reset() {
        this.owner.trigger('reset');
        this.queue = new Queue();
        this.stats = this.queue.stats;
      },

      destroy() {
        this.reset();
        this.placeholder && this.placeholder.destroy();
      },
    });
  });
  /**
   * @fileOverview 添加获取Runtime相关信息的方法。
   */
  define('widgets/runtime', [
    'uploader',
    'runtime/runtime',
    'widgets/widget',
  ], (Uploader, Runtime) => {
    Uploader.support = function () {
      return Runtime.hasRuntime.apply(Runtime, arguments);
    };

    /**
     * @property {object} [runtimeOrder=html5,flash]
     * @namespace options
     * @for Uploader
     * @description 指定运行时启动顺序。默认会想尝试 html5 是否支持，如果支持则使用 html5, 否则则使用 flash.
     *
     * 可以将此值设置成 `flash`，来强制使用 flash 运行时。
     */

    return Uploader.register({
      name: 'runtime',

      init() {
        if (!this.predictRuntimeType()) {
          throw new Error('Runtime Error');
        }
      },

      /**
       * 预测Uploader将采用哪个`Runtime`
       * @grammar predictRuntimeType() => String
       * @method predictRuntimeType
       * @for  Uploader
       */
      predictRuntimeType() {
        let orders = this.options.runtimeOrder || Runtime.orders;
        let type = this.type;
        let i; let len;

        if (!type) {
          orders = orders.split(/\s*,\s*/g);

          for (i = 0, len = orders.length; i < len; i++) {
            if (Runtime.hasRuntime(orders[i])) {
              this.type = type = orders[i];
              break;
            }
          }
        }

        return type;
      },
    });
  });
  /**
   * @fileOverview Transport
   */
  define('lib/transport', [
    'base',
    'runtime/client',
    'mediator',
  ], (Base, RuntimeClient, Mediator) => {
    const $ = Base.$;

    function Transport(opts) {
      const me = this;

      opts = me.options = $.extend(true, {}, Transport.options, opts || {});
      RuntimeClient.call(this, 'Transport');

      this._blob = null;
      this._formData = opts.formData || {};
      this._headers = opts.headers || {};

      this.on('progress', this._timeout);
      this.on('load error', () => {
        me.trigger('progress', 1);
        clearTimeout(me._timer);
      });
    }

    Transport.options = {
      server: '',
      method: 'POST',

      // 跨域时，是否允许携带cookie, 只有html5 runtime才有效
      withCredentials: false,
      fileVal: 'file',
      timeout: 2 * 60 * 1000, // 2分钟
      formData: {},
      headers: {},
      sendAsBinary: false,
    };

    $.extend(Transport.prototype, {

      // 添加Blob, 只能添加一次，最后一次有效。
      appendBlob(key, blob, filename) {
        const me = this;
        const opts = me.options;

        if (me.getRuid()) {
          me.disconnectRuntime();
        }

        // 连接到blob归属的同一个runtime.
        me.connectRuntime(blob.ruid, () => {
          me.exec('init');
        });

        me._blob = blob;
        opts.fileVal = key || opts.fileVal;
        opts.filename = filename || opts.filename;
      },

      // 添加其他字段
      append(key, value) {
        if (typeof key === 'object') {
          $.extend(this._formData, key);
        } else {
          this._formData[key] = value;
        }
      },

      setRequestHeader(key, value) {
        if (typeof key === 'object') {
          $.extend(this._headers, key);
        } else {
          this._headers[key] = value;
        }
      },

      send(method) {
        this.exec('send', method);
        this._timeout();
      },

      abort() {
        clearTimeout(this._timer);
        return this.exec('abort');
      },

      destroy() {
        this.trigger('destroy');
        this.off();
        this.exec('destroy');
        this.disconnectRuntime();
      },

      getResponse() {
        return this.exec('getResponse');
      },

      getResponseAsJson() {
        return this.exec('getResponseAsJson');
      },

      getStatus() {
        return this.exec('getStatus');
      },

      _timeout() {
        const me = this;
        const duration = me.options.timeout;

        if (!duration) {
          return;
        }

        clearTimeout(me._timer);
        me._timer = setTimeout(() => {
          me.abort();
          me.trigger('error', 'timeout');
        }, duration);
      },

    });

    // 让Transport具备事件功能。
    Mediator.installTo(Transport.prototype);

    return Transport;
  });
  /**
   * @fileOverview 负责文件上传相关。
   */
  define('widgets/upload', [
    'base',
    'uploader',
    'file',
    'lib/transport',
    'widgets/widget',
  ], (Base, Uploader, WUFile, Transport) => {
    const $ = Base.$;
    const isPromise = Base.isPromise;
    const Status = WUFile.Status;

    // 添加默认配置项
    $.extend(Uploader.options, {

      /**
       * @property {boolean} [prepareNextFile=false]
       * @namespace options
       * @for Uploader
       * @description 是否允许在文件传输时提前把下一个文件准备好。
       * 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。
       * 如果能提前在当前文件传输期处理，可以节省总体耗时。
       */
      prepareNextFile: false,

      /**
       * @property {boolean} [chunked=false]
       * @namespace options
       * @for Uploader
       * @description 是否要分片处理大文件上传。
       */
      chunked: false,

      /**
       * @property {boolean} [chunkSize=5242880]
       * @namespace options
       * @for Uploader
       * @description 如果要分片，分多大一片？ 默认大小为5M.
       */
      chunkSize: 5 * 1024 * 1024,

      /**
       * @property {boolean} [chunkRetry=2]
       * @namespace options
       * @for Uploader
       * @description 如果某个分片由于网络问题出错，允许自动重传多少次？
       */
      chunkRetry: 2,

      /**
       * @property {boolean} [threads=3]
       * @namespace options
       * @for Uploader
       * @description 上传并发数。允许同时最大上传进程数。
       */
      threads: 3,

      /**
       * @property {object} [formData={}]
       * @namespace options
       * @for Uploader
       * @description 文件上传请求的参数表，每次发送都会发送此对象中的参数。
       */
      formData: {},

      /**
       * @property {object} [fileVal='file']
       * @namespace options
       * @for Uploader
       * @description 设置文件上传域的name。
       */

      /**
       * @property {object} [method='POST']
       * @namespace options
       * @for Uploader
       * @description 文件上传方式，`POST`或者`GET`。
       */

      /**
       * @property {object} [sendAsBinary=false]
       * @namespace options
       * @for Uploader
       * @description 是否已二进制的流的方式发送文件，这样整个上传内容`php://input`都为文件内容，
       * 其他参数在$_GET数组中。
       */
    });

    // 负责将文件切片。
    function CuteFile(file, chunkSize) {
      const pending = [];
      const blob = file.source;
      const total = blob.size;
      const chunks = chunkSize ? Math.ceil(total / chunkSize) : 1;
      let start = 0;
      let index = 0;
      let len; let api;

      api = {
        file,

        has() {
          return !!pending.length;
        },

        shift() {
          return pending.shift();
        },

        unshift(block) {
          pending.unshift(block);
        },
      };

      while (index < chunks) {
        len = Math.min(chunkSize, total - start);

        pending.push({
          file,
          start,
          end: chunkSize ? (start + len) : total,
          total,
          chunks,
          chunk: index++,
          cuted: api,
        });
        start += len;
      }

      file.blocks = pending.concat();
      file.remaning = pending.length;

      return api;
    }

    Uploader.register({
      name: 'upload',

      init() {
        const owner = this.owner;
        const me = this;

        this.runing = false;
        this.progress = false;

        owner
          .on('startUpload', () => {
            me.progress = true;
          })
          .on('uploadFinished', () => {
            me.progress = false;
          });

        // 记录当前正在传的数据，跟threads相关
        this.pool = [];

        // 缓存分好片的文件。
        this.stack = [];

        // 缓存即将上传的文件。
        this.pending = [];

        // 跟踪还有多少分片在上传中但是没有完成上传。
        this.remaning = 0;
        this.__tick = Base.bindFn(this._tick, this);

        owner.on('uploadComplete', (file) => {
          // 把其他块取消了。
          file.blocks && $.each(file.blocks, (_, v) => {
            v.transport && (v.transport.abort(), v.transport.destroy());
            delete v.transport;
          });

          delete file.blocks;
          delete file.remaning;
        });
      },

      reset() {
        this.request('stop-upload', true);
        this.runing = false;
        this.pool = [];
        this.stack = [];
        this.pending = [];
        this.remaning = 0;
        this._trigged = false;
        this._promise = null;
      },

      /**
       * @event startUpload
       * @description 当开始上传流程时触发。
       * @for  Uploader
       */

      /**
       * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
       *
       * 可以指定开始某一个文件。
       * @grammar upload() => undefined
       * @grammar upload( file | fileId) => undefined
       * @method upload
       * @for  Uploader
       */
      startUpload(file) {
        const me = this;

        // 移出invalid的文件
        $.each(me.request('get-files', Status.INVALID), function () {
          me.request('remove-file', this);
        });

        // 如果指定了开始某个文件，则只开始指定文件。
        if (file) {
          file = file.id ? file : me.request('get-file', file);

          if (file.getStatus() === Status.INTERRUPT) {
            $.each(me.pool, (_, v) => {
              // 之前暂停过。
              if (v.file !== file) {
                return;
              }

              v.transport && v.transport.send();
            });

            file.setStatus(Status.QUEUED);
          } else if (file.getStatus() === Status.PROGRESS) {
            return;
          } else {
            file.setStatus(Status.QUEUED);
          }
        } else {
          $.each(me.request('get-files', [Status.INITED]), function () {
            this.setStatus(Status.QUEUED);
          });
        }

        if (me.runing) {
          return;
        }

        me.runing = true;

        const files = [];

        // 如果有暂停的，则续传
        $.each(me.pool, (_, v) => {
          const file = v.file;

          if (file.getStatus() === Status.INTERRUPT) {
            files.push(file);
            me._trigged = false;
            v.transport && v.transport.send();
          }
        });

        var file;
        while ((file = files.shift())) {
          file.setStatus(Status.PROGRESS);
        }

        file || $.each(me.request('get-files', Status.INTERRUPT), function () {
          this.setStatus(Status.PROGRESS);
        });

        me._trigged = false;
        Base.nextTick(me.__tick);
        me.owner.trigger('startUpload');
      },

      /**
       * @event stopUpload
       * @description 当开始上传流程暂停时触发。
       * @for  Uploader
       */

      /**
       * 暂停上传。第一个参数为是否中断上传当前正在上传的文件。
       *
       * 如果第一个参数是文件，则只暂停指定文件。
       * @grammar stop() => undefined
       * @grammar stop( true ) => undefined
       * @grammar stop( file ) => undefined
       * @method stop
       * @for  Uploader
       */
      stopUpload(file, interrupt) {
        const me = this;

        if (file === true) {
          interrupt = file;
          file = null;
        }

        if (me.runing === false) {
          return;
        }

        // 如果只是暂停某个文件。
        if (file) {
          file = file.id ? file : me.request('get-file', file);

          if (file.getStatus() !== Status.PROGRESS
            && file.getStatus() !== Status.QUEUED) {
            return;
          }

          file.setStatus(Status.INTERRUPT);
          $.each(me.pool, (_, v) => {
            // 只 abort 指定的文件。
            if (v.file !== file) {
              return;
            }

            v.transport && v.transport.abort();
            me._putback(v);
            me._popBlock(v);
          });

          return Base.nextTick(me.__tick);
        }

        me.runing = false;

        if (this._promise && this._promise.file) {
          this._promise.file.setStatus(Status.INTERRUPT);
        }

        interrupt && $.each(me.pool, (_, v) => {
          v.transport && v.transport.abort();
          v.file.setStatus(Status.INTERRUPT);
        });

        me.owner.trigger('stopUpload');
      },

      /**
       * @method cancelFile
       * @grammar cancelFile( file ) => undefined
       * @grammar cancelFile( id ) => undefined
       * @param {File|id} file File对象或这File对象的id
       * @description 标记文件状态为已取消, 同时将中断文件传输。
       * @for  Uploader
       * @example
       *
       * $li.on('click', '.remove-this', function() {
       *     uploader.cancelFile( file );
       * })
       */
      cancelFile(file) {
        file = file.id ? file : this.request('get-file', file);

        // 如果正在上传。
        file.blocks && $.each(file.blocks, (_, v) => {
          const _tr = v.transport;

          if (_tr) {
            _tr.abort();
            _tr.destroy();
            delete v.transport;
          }
        });

        file.setStatus(Status.CANCELLED);
        this.owner.trigger('fileDequeued', file);
      },

      /**
       * 判断`Uplaode`r是否正在上传中。
       * @grammar isInProgress() => Boolean
       * @method isInProgress
       * @for  Uploader
       */
      isInProgress() {
        return !!this.progress;
      },

      _getStats() {
        return this.request('get-stats');
      },

      /**
       * 掉过一个文件上传，直接标记指定文件为已上传状态。
       * @grammar skipFile( file ) => undefined
       * @method skipFile
       * @for  Uploader
       */
      skipFile(file, status) {
        file = file.id ? file : this.request('get-file', file);

        file.setStatus(status || Status.COMPLETE);
        file.skipped = true;

        // 如果正在上传。
        file.blocks && $.each(file.blocks, (_, v) => {
          const _tr = v.transport;

          if (_tr) {
            _tr.abort();
            _tr.destroy();
            delete v.transport;
          }
        });

        this.owner.trigger('uploadSkip', file);
      },

      /**
       * @event uploadFinished
       * @description 当所有文件上传结束时触发。
       * @for  Uploader
       */
      _tick() {
        const me = this;
        const opts = me.options;
        let fn; let val;

        // 上一个promise还没有结束，则等待完成后再执行。
        if (me._promise) {
          return me._promise.always(me.__tick);
        }

        // 还有位置，且还有文件要处理的话。
        if (me.pool.length < opts.threads && (val = me._nextBlock())) {
          me._trigged = false;

          fn = function (val) {
            me._promise = null;

            // 有可能是reject过来的，所以要检测val的类型。
            val && val.file && me._startSend(val);
            Base.nextTick(me.__tick);
          };

          me._promise = isPromise(val) ? val.always(fn) : fn(val);

          // 没有要上传的了，且没有正在传输的了。
        } else if (!me.remaning && !me._getStats().numOfQueue
        && !me._getStats().numofInterrupt) {
          me.runing = false;

          me._trigged || Base.nextTick(() => {
            me.owner.trigger('uploadFinished');
          });
          me._trigged = true;
        }
      },

      _putback(block) {
        let idx;

        block.cuted.unshift(block);
        idx = this.stack.indexOf(block.cuted);

        if (!~idx) {
          this.stack.unshift(block.cuted);
        }
      },

      _getStack() {
        let i = 0;
        let act;

        while ((act = this.stack[i++])) {
          if (act.has() && act.file.getStatus() === Status.PROGRESS) {
            return act;
          } else if (!act.has()
          || act.file.getStatus() !== Status.PROGRESS
          && act.file.getStatus() !== Status.INTERRUPT) {
            // 把已经处理完了的，或者，状态为非 progress（上传中）、
            // interupt（暂停中） 的移除。
            this.stack.splice(--i, 1);
          }
        }

        return null;
      },

      _nextBlock() {
        const me = this;
        const opts = me.options;
        let act; let next; let done; let preparing;

        // 如果当前文件还有没有需要传输的，则直接返回剩下的。
        if ((act = this._getStack())) {
          // 是否提前准备下一个文件
          if (opts.prepareNextFile && !me.pending.length) {
            me._prepareNextFile();
          }

          return act.shift();

          // 否则，如果正在运行，则准备下一个文件，并等待完成后返回下个分片。
        } else if (me.runing) {
          // 如果缓存中有，则直接在缓存中取，没有则去queue中取。
          if (!me.pending.length && me._getStats().numOfQueue) {
            me._prepareNextFile();
          }

          next = me.pending.shift();
          done = function (file) {
            if (!file) {
              return null;
            }

            act = CuteFile(file, opts.chunked ? opts.chunkSize : 0);
            me.stack.push(act);
            return act.shift();
          };

          // 文件可能还在prepare中，也有可能已经完全准备好了。
          if (isPromise(next)) {
            preparing = next.file;
            next = next[next.pipe ? 'pipe' : 'then'](done);
            next.file = preparing;
            return next;
          }

          return done(next);
        }
      },

      /**
       * @event uploadStart
       * @param {File} file File对象
       * @description 某个文件开始上传前触发，一个文件只会触发一次。
       * @for  Uploader
       */
      _prepareNextFile() {
        const me = this;
        const file = me.request('fetch-file');
        const pending = me.pending;
        let promise;

        if (file) {
          promise = me.request('before-send-file', file, () => {
            // 有可能文件被skip掉了。文件被skip掉后，状态坑定不是Queued.
            if (file.getStatus() === Status.PROGRESS
              || file.getStatus() === Status.INTERRUPT) {
              return file;
            }

            return me._finishFile(file);
          });

          me.owner.trigger('uploadStart', file);
          file.setStatus(Status.PROGRESS);

          promise.file = file;

          // 如果还在pending中，则替换成文件本身。
          promise.done(() => {
            const idx = $.inArray(promise, pending);

            ~idx && pending.splice(idx, 1, file);
          });

          // befeore-send-file的钩子就有错误发生。
          promise.fail((reason) => {
            file.setStatus(Status.ERROR, reason);
            me.owner.trigger('uploadError', file, reason);
            me.owner.trigger('uploadComplete', file);
          });

          pending.push(promise);
        }
      },

      // 让出位置了，可以让其他分片开始上传
      _popBlock(block) {
        const idx = $.inArray(block, this.pool);

        this.pool.splice(idx, 1);
        block.file.remaning--;
        this.remaning--;
      },

      // 开始上传，可以被掉过。如果promise被reject了，则表示跳过此分片。
      _startSend(block) {
        const me = this;
        const file = block.file;
        let promise;

        // 有可能在 before-send-file 的 promise 期间改变了文件状态。
        // 如：暂停，取消
        // 我们不能中断 promise, 但是可以在 promise 完后，不做上传操作。
        if (file.getStatus() !== Status.PROGRESS) {
          // 如果是中断，则还需要放回去。
          if (file.getStatus() === Status.INTERRUPT) {
            me._putback(block);
          }

          return;
        }

        me.pool.push(block);
        me.remaning++;

        // 如果没有分片，则直接使用原始的。
        // 不会丢失content-type信息。
        block.blob = block.chunks === 1
          ? file.source
          : file.source.slice(block.start, block.end);

        // hook, 每个分片发送之前可能要做些异步的事情。
        promise = me.request('before-send', block, () => {
          // 有可能文件已经上传出错了，所以不需要再传输了。
          if (file.getStatus() === Status.PROGRESS) {
            me._doSend(block);
          } else {
            me._popBlock(block);
            Base.nextTick(me.__tick);
          }
        });

        // 如果为fail了，则跳过此分片。
        promise.fail(() => {
          if (file.remaning === 1) {
            me._finishFile(file).always(() => {
              block.percentage = 1;
              me._popBlock(block);
              me.owner.trigger('uploadComplete', file);
              Base.nextTick(me.__tick);
            });
          } else {
            block.percentage = 1;
            me.updateFileProgress(file);
            me._popBlock(block);
            Base.nextTick(me.__tick);
          }
        });
      },

      /**
       * @event uploadBeforeSend
       * @param {object} object
       * @param {object} data 默认的上传参数，可以扩展此对象来控制上传参数。
       * @param {object} headers 可以扩展此对象来控制上传头部。
       * @description 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
       * @for  Uploader
       */

      /**
       * @event uploadAccept
       * @param {object} object
       * @param {object} ret 服务端的返回数据，json格式，如果服务端不是json格式，从ret._raw中取数据，自行解析。
       * @description 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为`false`, 则此文件将派送`server`类型的`uploadError`事件。
       * @for  Uploader
       */

      /**
       * @event uploadProgress
       * @param {File} file File对象
       * @param {number} percentage 上传进度
       * @description 上传过程中触发，携带上传进度。
       * @for  Uploader
       */

      /**
       * @event uploadError
       * @param {File} file File对象
       * @param {string} reason 出错的code
       * @description 当文件上传出错时触发。
       * @for  Uploader
       */

      /**
       * @event uploadSuccess
       * @param {File} file File对象
       * @param {object} response 服务端返回的数据
       * @description 当文件上传成功时触发。
       * @for  Uploader
       */

      /**
       * @event uploadComplete
       * @param {File} [file] File对象
       * @description 不管成功或者失败，文件上传完成时触发。
       * @for  Uploader
       */

      // 做上传操作。
      _doSend(block) {
        const me = this;
        const owner = me.owner;
        const opts = me.options;
        const file = block.file;
        const tr = new Transport(opts);
        let data = $.extend({}, opts.formData);
        const headers = $.extend({}, opts.headers);
        let requestAccept; let ret;

        block.transport = tr;

        tr.on('destroy', () => {
          delete block.transport;
          me._popBlock(block);
          Base.nextTick(me.__tick);
        });

        // 广播上传进度。以文件为单位。
        tr.on('progress', (percentage) => {
          block.percentage = percentage;
          me.updateFileProgress(file);
        });

        // 用来询问，是否返回的结果是有错误的。
        requestAccept = function (reject) {
          let fn;

          ret = tr.getResponseAsJson() || {};
          ret._raw = tr.getResponse();
          fn = function (value) {
            reject = value;
          };
          console.log(!owner.trigger('uploadAccept', block, ret, fn));
          // 服务端响应了，不代表成功了，询问是否响应正确。
          if (!owner.trigger('uploadAccept', block, ret, fn)) {
            reject = reject || 'server';
          }

          return reject;
        };

        // 尝试重试，然后广播文件上传出错。
        tr.on('error', (type, flag) => {
          block.retried = block.retried || 0;

          // 自动重试
          if (block.chunks > 1 && ~'http,abort'.indexOf(type)
            && block.retried < opts.chunkRetry) {
            block.retried++;
            tr.send();
          } else {
            // http status 500 ~ 600
            if (!flag && type === 'server') {
              type = requestAccept(type);
            }

            file.setStatus(Status.ERROR, type);
            owner.trigger('uploadError', file, type);
            owner.trigger('uploadComplete', file);
          }
        });

        // 上传成功
        tr.on('load', () => {
          let reason;

          // 如果非预期，转向上传出错。
          if ((reason = requestAccept())) {
            tr.trigger('error', reason, true);
            return;
          }

          // 全部上传完成。
          if (file.remaning === 1) {
            me._finishFile(file, ret);
          } else {
            tr.destroy();
          }
        });

        // 配置默认的上传字段。
        data = $.extend(data, {
          id: file.id,
          name: file.name,
          type: file.type,
          lastModifiedDate: file.lastModifiedDate,
          size: file.size,
        });

        block.chunks > 1 && $.extend(data, {
          chunks: block.chunks,
          chunk: block.chunk,
        });

        // 在发送之间可以添加字段什么的。。。
        // 如果默认的字段不够使用，可以通过监听此事件来扩展
        owner.trigger('uploadBeforeSend', block, data, headers);

        // 开始发送。
        tr.appendBlob(opts.fileVal, block.blob, file.name);
        tr.append(data);
        tr.setRequestHeader(headers);
        tr.send();
      },

      // 完成上传。
      _finishFile(file, ret, hds) {
        const owner = this.owner;

        return owner
          .request('after-send-file', arguments, () => {
            file.setStatus(Status.COMPLETE);
            owner.trigger('uploadSuccess', file, ret, hds);
          })
          .fail((reason) => {
            // 如果外部已经标记为invalid什么的，不再改状态。
            if (file.getStatus() === Status.PROGRESS) {
              file.setStatus(Status.ERROR, reason);
            }

            owner.trigger('uploadError', file, reason);
          })
          .always(() => {
            owner.trigger('uploadComplete', file);
          });
      },

      updateFileProgress(file) {
        let totalPercent = 0;
        let uploaded = 0;

        if (!file.blocks) {
          return;
        }

        $.each(file.blocks, (_, v) => {
          uploaded += (v.percentage || 0) * (v.end - v.start);
        });

        totalPercent = uploaded / file.size;
        this.owner.trigger('uploadProgress', file, totalPercent || 0);
      },

    });
  });
  /**
   * @fileOverview 各种验证，包括文件总大小是否超出、单文件是否超出和文件是否重复。
   */

  define('widgets/validator', [
    'base',
    'uploader',
    'file',
    'widgets/widget',
  ], (Base, Uploader, WUFile) => {
    const $ = Base.$;
    const validators = {};
    let api;

    /**
     * @event error
     * @param {string} type 错误类型。
     * @description 当validate不通过时，会以派送错误事件的形式通知调用者。通过`upload.on('error', handler)`可以捕获到此类错误，目前有以下错误会在特定的情况下派送错来。
     *
     * `Q_EXCEED_NUM_LIMIT` 在设置了`fileNumLimit`且尝试给`uploader`添加的文件数量超出这个值时派送。
     * `Q_EXCEED_SIZE_LIMIT` 在设置了`Q_EXCEED_SIZE_LIMIT`且尝试给`uploader`添加的文件总大小超出这个值时派送。
     * `Q_TYPE_DENIED` 当文件类型不满足时触发。。
     * @for  Uploader
     */

    // 暴露给外面的api
    api = {

      // 添加验证器
      addValidator(type, cb) {
        validators[type] = cb;
      },

      // 移除验证器
      removeValidator(type) {
        delete validators[type];
      },
    };

    // 在Uploader初始化的时候启动Validators的初始化
    Uploader.register({
      name: 'validator',

      init() {
        const me = this;
        Base.nextTick(() => {
          $.each(validators, function () {
            this.call(me.owner);
          });
        });
      },
    });

    /**
     * @property {int} [fileNumLimit=undefined]
     * @namespace options
     * @for Uploader
     * @description 验证文件总数量, 超出则不允许加入队列。
     */
    api.addValidator('fileNumLimit', function () {
      const uploader = this;
      const opts = uploader.options;
      let count = 0;
      const max = Number.parseInt(opts.fileNumLimit, 10);
      let flag = true;

      if (!max) {
        return;
      }

      uploader.on('beforeFileQueued', function (file) {
        if (count >= max && flag) {
          flag = false;
          this.trigger('error', 'Q_EXCEED_NUM_LIMIT', max, file);
          setTimeout(() => {
            flag = true;
          }, 1);
        }

        return !(count >= max);
      });

      uploader.on('fileQueued', () => {
        count++;
      });

      uploader.on('fileDequeued', () => {
        count--;
      });

      uploader.on('reset', () => {
        count = 0;
      });
    });

    /**
     * @property {int} [fileSizeLimit=undefined]
     * @namespace options
     * @for Uploader
     * @description 验证文件总大小是否超出限制, 超出则不允许加入队列。
     */
    api.addValidator('fileSizeLimit', function () {
      const uploader = this;
      const opts = uploader.options;
      let count = 0;
      const max = Number.parseInt(opts.fileSizeLimit, 10);
      let flag = true;

      if (!max) {
        return;
      }

      uploader.on('beforeFileQueued', function (file) {
        const invalid = count + file.size > max;

        if (invalid && flag) {
          flag = false;
          this.trigger('error', 'Q_EXCEED_SIZE_LIMIT', max, file);
          setTimeout(() => {
            flag = true;
          }, 1);
        }

        return !invalid;
      });

      uploader.on('fileQueued', (file) => {
        count += file.size;
      });

      uploader.on('fileDequeued', (file) => {
        count -= file.size;
      });

      uploader.on('reset', () => {
        count = 0;
      });
    });

    /**
     * @property {int} [fileSingleSizeLimit=undefined]
     * @namespace options
     * @for Uploader
     * @description 验证单个文件大小是否超出限制, 超出则不允许加入队列。
     */
    api.addValidator('fileSingleSizeLimit', function () {
      const uploader = this;
      const opts = uploader.options;
      const max = opts.fileSingleSizeLimit;

      if (!max) {
        return;
      }

      uploader.on('beforeFileQueued', function (file) {
        if (file.size > max) {
          file.setStatus(WUFile.Status.INVALID, 'exceed_size');
          this.trigger('error', 'F_EXCEED_SIZE', max, file);
          return false;
        }
      });
    });

    /**
     * @property {boolean} [duplicate=undefined]
     * @namespace options
     * @for Uploader
     * @description 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
     */
    api.addValidator('duplicate', function () {
      const uploader = this;
      const opts = uploader.options;
      let mapping = {};

      if (opts.duplicate) {
        return;
      }

      function hashString(str) {
        let hash = 0;
        let i = 0;
        const len = str.length;
        let _char;

        for (; i < len; i++) {
          _char = str.charCodeAt(i);
          hash = _char + (hash << 6) + (hash << 16) - hash;
        }

        return hash;
      }

      uploader.on('beforeFileQueued', function (file) {
        const hash = file.__hash || (file.__hash = hashString(file.name
          + file.size + file.lastModifiedDate));

        // 已经重复了
        if (mapping[hash]) {
          this.trigger('error', 'F_DUPLICATE', file);
          return false;
        }
      });

      uploader.on('fileQueued', (file) => {
        const hash = file.__hash;

        hash && (mapping[hash] = true);
      });

      uploader.on('fileDequeued', (file) => {
        const hash = file.__hash;

        hash && (delete mapping[hash]);
      });

      uploader.on('reset', () => {
        mapping = {};
      });
    });

    return api;
  });

  /**
   * @fileOverview Runtime管理器，负责Runtime的选择, 连接
   */
  define('runtime/compbase', [], () => {
    function CompBase(owner, runtime) {
      this.owner = owner;
      this.options = owner.options;

      this.getRuntime = function () {
        return runtime;
      };

      this.getRuid = function () {
        return runtime.uid;
      };

      this.trigger = function () {
        return owner.trigger.apply(owner, arguments);
      };
    }

    return CompBase;
  });
  /**
   * @fileOverview Html5Runtime
   */
  define('runtime/html5/runtime', [
    'base',
    'runtime/runtime',
    'runtime/compbase',
  ], (Base, Runtime, CompBase) => {
    const type = 'html5';
    const components = {};

    function Html5Runtime() {
      const pool = {};
      const me = this;
      const destroy = this.destroy;

      Runtime.apply(me, arguments);
      me.type = type;

      // 这个方法的调用者，实际上是RuntimeClient
      me.exec = function (comp, fn/* , args... */) {
        const client = this;
        const uid = client.uid;
        const args = Base.slice(arguments, 2);
        let instance;

        if (components[comp]) {
          instance = pool[uid] = pool[uid]
          || new components[comp](client, me);

          if (instance[fn]) {
            return instance[fn].apply(instance, args);
          }
        }
      };

      me.destroy = function () {
        // @todo 删除池子中的所有实例
        return destroy && destroy.apply(this, arguments);
      };
    }

    Base.inherits(Runtime, {
      constructor: Html5Runtime,

      // 不需要连接其他程序，直接执行callback
      init() {
        const me = this;
        setTimeout(() => {
          me.trigger('ready');
        }, 1);
      },

    });

    // 注册Components
    Html5Runtime.register = function (name, component) {
      const klass = components[name] = Base.inherits(CompBase, component);
      return klass;
    };

    // 注册html5运行时。
    // 只有在支持的前提下注册。
    if (window.Blob && window.FileReader && window.DataView) {
      Runtime.addRuntime(type, Html5Runtime);
    }

    return Html5Runtime;
  });
  /**
   * @fileOverview Blob Html实现
   */
  define('runtime/html5/blob', [
    'runtime/html5/runtime',
    'lib/blob',
  ], (Html5Runtime, Blob) => {
    return Html5Runtime.register('Blob', {
      slice(start, end) {
        let blob = this.owner.source;
        const slice = blob.slice || blob.webkitSlice || blob.mozSlice;

        blob = slice.call(blob, start, end);

        return new Blob(this.getRuid(), blob);
      },
    });
  });
  /**
   * @fileOverview FilePaste
   */
  define('runtime/html5/dnd', [
    'base',
    'runtime/html5/runtime',
    'lib/file',
  ], (Base, Html5Runtime, File) => {
    const $ = Base.$;
    const prefix = 'webuploader-dnd-';

    return Html5Runtime.register('DragAndDrop', {
      init() {
        const elem = this.elem = this.options.container;

        this.dragEnterHandler = Base.bindFn(this._dragEnterHandler, this);
        this.dragOverHandler = Base.bindFn(this._dragOverHandler, this);
        this.dragLeaveHandler = Base.bindFn(this._dragLeaveHandler, this);
        this.dropHandler = Base.bindFn(this._dropHandler, this);
        this.dndOver = false;

        elem.on('dragenter', this.dragEnterHandler);
        elem.on('dragover', this.dragOverHandler);
        elem.on('dragleave', this.dragLeaveHandler);
        elem.on('drop', this.dropHandler);

        if (this.options.disableGlobalDnd) {
          $(document).on('dragover', this.dragOverHandler);
          $(document).on('drop', this.dropHandler);
        }
      },

      _dragEnterHandler(e) {
        const me = this;
        let denied = me._denied || false;
        let items;

        e = e.originalEvent || e;

        if (!me.dndOver) {
          me.dndOver = true;

          // 注意只有 chrome 支持。
          items = e.dataTransfer.items;

          if (items && items.length) {
            me._denied = denied = !me.trigger('accept', items);
          }

          me.elem.addClass(`${prefix}over`);
          me.elem[denied
            ? 'addClass'
            : 'removeClass'](`${prefix}denied`);
        }

        e.dataTransfer.dropEffect = denied ? 'none' : 'copy';

        return false;
      },

      _dragOverHandler(e) {
        // 只处理框内的。
        const parentElem = this.elem.parent().get(0);
        if (parentElem && !$.contains(parentElem, e.currentTarget)) {
          return false;
        }

        clearTimeout(this._leaveTimer);
        this._dragEnterHandler.call(this, e);

        return false;
      },

      _dragLeaveHandler() {
        const me = this;
        let handler;

        handler = function () {
          me.dndOver = false;
          me.elem.removeClass(`${prefix}over ${prefix}denied`);
        };

        clearTimeout(me._leaveTimer);
        me._leaveTimer = setTimeout(handler, 100);
        return false;
      },

      _dropHandler(e) {
        const me = this;
        const ruid = me.getRuid();
        const parentElem = me.elem.parent().get(0);
        let dataTransfer; let data;

        // 只处理框内的。
        if (parentElem && !$.contains(parentElem, e.currentTarget)) {
          return false;
        }

        e = e.originalEvent || e;
        dataTransfer = e.dataTransfer;

        // 如果是页面内拖拽，还不能处理，不阻止事件。
        // 此处 ie11 下会报参数错误，
        try {
          data = dataTransfer.getData('text/html');
        } catch (err) {
        }

        if (data) {
          return;
        }

        me._getTansferFiles(dataTransfer, (results) => {
          me.trigger('drop', $.map(results, (file) => {
            return new File(ruid, file);
          }));
        });

        me.dndOver = false;
        me.elem.removeClass(`${prefix}over`);
        return false;
      },

      // 如果传入 callback 则去查看文件夹，否则只管当前文件夹。
      _getTansferFiles(dataTransfer, callback) {
        const results = [];
        const promises = [];
        let items; let files; let file; let item; let i; let len; let canAccessFolder;

        items = dataTransfer.items;
        files = dataTransfer.files;

        canAccessFolder = !!(items && items[0].webkitGetAsEntry);

        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          item = items && items[i];

          if (canAccessFolder && item.webkitGetAsEntry().isDirectory) {
            promises.push(this._traverseDirectoryTree(
              item.webkitGetAsEntry(),
              results,
            ));
          } else {
            results.push(file);
          }
        }

        Base.when.apply(Base, promises).done(() => {
          if (!results.length) {
            return;
          }

          callback(results);
        });
      },

      _traverseDirectoryTree(entry, results) {
        const deferred = Base.Deferred();
        const me = this;

        if (entry.isFile) {
          entry.file((file) => {
            results.push(file);
            deferred.resolve();
          });
        } else if (entry.isDirectory) {
          entry.createReader().readEntries((entries) => {
            const len = entries.length;
            const promises = [];
            const arr = []; // 为了保证顺序。
            let i;

            for (i = 0; i < len; i++) {
              promises.push(me._traverseDirectoryTree(
                entries[i],
                arr,
              ));
            }

            Base.when.apply(Base, promises).then(() => {
              results.push.apply(results, arr);
              deferred.resolve();
            }, deferred.reject);
          });
        }

        return deferred.promise();
      },

      destroy() {
        const elem = this.elem;

        // 还没 init 就调用 destroy
        if (!elem) {
          return;
        }

        elem.off('dragenter', this.dragEnterHandler);
        elem.off('dragover', this.dragOverHandler);
        elem.off('dragleave', this.dragLeaveHandler);
        elem.off('drop', this.dropHandler);

        if (this.options.disableGlobalDnd) {
          $(document).off('dragover', this.dragOverHandler);
          $(document).off('drop', this.dropHandler);
        }
      },
    });
  });

  /**
   * @fileOverview FilePaste
   */
  define('runtime/html5/filepaste', [
    'base',
    'runtime/html5/runtime',
    'lib/file',
  ], (Base, Html5Runtime, File) => {
    return Html5Runtime.register('FilePaste', {
      init() {
        const opts = this.options;
        const elem = this.elem = opts.container;
        let accept = '.*';
        let arr; let i; let len; let item;

        // accetp的mimeTypes中生成匹配正则。
        if (opts.accept) {
          arr = [];

          for (i = 0, len = opts.accept.length; i < len; i++) {
            item = opts.accept[i].mimeTypes;
            item && arr.push(item);
          }

          if (arr.length) {
            accept = arr.join(',');
            accept = accept.replace(/,/g, '|').replace(/\*/g, '.*');
          }
        }
        this.accept = accept = new RegExp(accept, 'i');
        this.hander = Base.bindFn(this._pasteHander, this);
        elem.on('paste', this.hander);
      },

      _pasteHander(e) {
        const allowed = [];
        const ruid = this.getRuid();
        let items; let item; let blob; let i; let len;

        e = e.originalEvent || e;
        items = e.clipboardData.items;

        for (i = 0, len = items.length; i < len; i++) {
          item = items[i];

          if (item.kind !== 'file' || !(blob = item.getAsFile())) {
            continue;
          }

          allowed.push(new File(ruid, blob));
        }

        if (allowed.length) {
          // 不阻止非文件粘贴（文字粘贴）的事件冒泡
          e.preventDefault();
          e.stopPropagation();
          this.trigger('paste', allowed);
        }
      },

      destroy() {
        this.elem.off('paste', this.hander);
      },
    });
  });

  /**
   * @fileOverview FilePicker
   */
  define('runtime/html5/filepicker', [
    'base',
    'runtime/html5/runtime',
  ], (Base, Html5Runtime) => {
    const $ = Base.$;

    return Html5Runtime.register('FilePicker', {
      init() {
        const container = this.getRuntime().getContainer();
        const me = this;
        const owner = me.owner;
        const opts = me.options;
        const label = this.label = $(document.createElement('label'));
        let input = this.input = $(document.createElement('input'));
        let arr; let i; let len; let mouseHandler;

        input.attr('type', 'file');
        input.attr('name', opts.name);
        input.addClass('webuploader-element-invisible');

        label.on('click', () => {
          input.trigger('click');
        });

        label.css({
          opacity: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'pointer',
          background: '#ffffff',
        });

        if (opts.multiple) {
          input.attr('multiple', 'multiple');
        }

        // @todo Firefox不支持单独指定后缀
        if (opts.accept && opts.accept.length > 0) {
          arr = [];

          for (i = 0, len = opts.accept.length; i < len; i++) {
            arr.push(opts.accept[i].mimeTypes);
          }

          input.attr('accept', arr.join(','));
        }

        container.append(input);
        container.append(label);

        mouseHandler = function (e) {
          owner.trigger(e.type);
        };

        input.on('change', function (e) {
          const fn = arguments.callee;
          let clone;

          me.files = e.target.files;

          // reset input
          clone = this.cloneNode(true);
          clone.value = null;
          this.parentNode.replaceChild(clone, this);

          input.off();
          input = $(clone).on('change', fn)
            .on('mouseenter mouseleave', mouseHandler);

          owner.trigger('change');
        });

        label.on('mouseenter mouseleave', mouseHandler);
      },

      getFiles() {
        return this.files;
      },

      destroy() {
        this.input.off();
        this.label.off();
      },
    });
  });
  /**
   * Terms:
   *
   * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
   * @fileOverview Image控件
   */
  define('runtime/html5/util', [
    'base',
  ], (Base) => {
    const urlAPI = window.createObjectURL && window
      || window.URL && URL.revokeObjectURL && URL
      || window.webkitURL;
    let createObjectURL = Base.noop;
    let revokeObjectURL = createObjectURL;

    if (urlAPI) {
      // 更安全的方式调用，比如android里面就能把context改成其他的对象。
      createObjectURL = function () {
        return urlAPI.createObjectURL.apply(urlAPI, arguments);
      };

      revokeObjectURL = function () {
        return urlAPI.revokeObjectURL.apply(urlAPI, arguments);
      };
    }

    return {
      createObjectURL,
      revokeObjectURL,

      dataURL2Blob(dataURI) {
        let byteStr, intArray, ab, i, mimetype, parts;

        parts = dataURI.split(',');

        if (~parts[0].indexOf('base64')) {
          byteStr = atob(parts[1]);
        } else {
          byteStr = decodeURIComponent(parts[1]);
        }

        ab = new ArrayBuffer(byteStr.length);
        intArray = new Uint8Array(ab);

        for (i = 0; i < byteStr.length; i++) {
          intArray[i] = byteStr.charCodeAt(i);
        }

        mimetype = parts[0].split(':')[1].split(';')[0];

        return this.arrayBufferToBlob(ab, mimetype);
      },

      dataURL2ArrayBuffer(dataURI) {
        let byteStr, intArray, i, parts;

        parts = dataURI.split(',');

        if (~parts[0].indexOf('base64')) {
          byteStr = atob(parts[1]);
        } else {
          byteStr = decodeURIComponent(parts[1]);
        }

        intArray = new Uint8Array(byteStr.length);

        for (i = 0; i < byteStr.length; i++) {
          intArray[i] = byteStr.charCodeAt(i);
        }

        return intArray.buffer;
      },

      arrayBufferToBlob(buffer, type) {
        const builder = window.BlobBuilder || window.WebKitBlobBuilder;
        let bb;

        // android不支持直接new Blob, 只能借助blobbuilder.
        if (builder) {
          bb = new builder();
          bb.append(buffer);
          return bb.getBlob(type);
        }

        return new Blob([buffer], type ? { type } : {});
      },

      // 抽出来主要是为了解决android下面canvas.toDataUrl不支持jpeg.
      // 你得到的结果是png.
      canvasToDataUrl(canvas, type, quality) {
        return canvas.toDataURL(type, quality / 100);
      },

      // imagemeat会复写这个方法，如果用户选择加载那个文件了的话。
      parseMeta(blob, callback) {
        callback(false, {});
      },

      // imagemeat会复写这个方法，如果用户选择加载那个文件了的话。
      updateImageHead(data) {
        return data;
      },
    };
  });
  /**
   * Terms:
   *
   * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
   * @fileOverview Image控件
   */
  define('runtime/html5/imagemeta', [
    'runtime/html5/util',
  ], (Util) => {
    let api;

    api = {
      parsers: {
        0xFFE1: [],
      },

      maxMetaDataSize: 262144,

      parse(blob, cb) {
        const me = this;
        let fr = new FileReader();

        fr.onload = function () {
          cb(false, me._parse(this.result));
          fr = fr.onload = fr.onerror = null;
        };

        fr.onerror = function (e) {
          cb(e.message);
          fr = fr.onload = fr.onerror = null;
        };

        blob = blob.slice(0, me.maxMetaDataSize);
        fr.readAsArrayBuffer(blob.getSource());
      },

      _parse(buffer, noParse) {
        if (buffer.byteLength < 6) {
          return;
        }

        const dataview = new DataView(buffer);
        let offset = 2;
        const maxOffset = dataview.byteLength - 4;
        let headLength = offset;
        const ret = {};
        let markerBytes; let markerLength; let parsers; let i;

        if (dataview.getUint16(0) === 0xFFD8) {
          while (offset < maxOffset) {
            markerBytes = dataview.getUint16(offset);

            if (markerBytes >= 0xFFE0 && markerBytes <= 0xFFEF
              || markerBytes === 0xFFFE) {
              markerLength = dataview.getUint16(offset + 2) + 2;

              if (offset + markerLength > dataview.byteLength) {
                break;
              }

              parsers = api.parsers[markerBytes];

              if (!noParse && parsers) {
                for (i = 0; i < parsers.length; i += 1) {
                  parsers[i].call(api, dataview, offset, markerLength, ret);
                }
              }

              offset += markerLength;
              headLength = offset;
            } else {
              break;
            }
          }

          if (headLength > 6) {
            if (buffer.slice) {
              ret.imageHead = buffer.slice(2, headLength);
            } else {
              // Workaround for IE10, which does not yet
              // support ArrayBuffer.slice:
              ret.imageHead = new Uint8Array(buffer)
                .subarray(2, headLength);
            }
          }
        }

        return ret;
      },

      updateImageHead(buffer, head) {
        const data = this._parse(buffer, true);
        let buf1; let buf2; let bodyoffset;

        bodyoffset = 2;
        if (data.imageHead) {
          bodyoffset = 2 + data.imageHead.byteLength;
        }

        if (buffer.slice) {
          buf2 = buffer.slice(bodyoffset);
        } else {
          buf2 = new Uint8Array(buffer).subarray(bodyoffset);
        }

        buf1 = new Uint8Array(head.byteLength + 2 + buf2.byteLength);

        buf1[0] = 0xFF;
        buf1[1] = 0xD8;
        buf1.set(new Uint8Array(head), 2);
        buf1.set(new Uint8Array(buf2), head.byteLength + 2);

        return buf1.buffer;
      },
    };

    Util.parseMeta = function () {
      return api.parse.apply(api, arguments);
    };

    Util.updateImageHead = function () {
      return api.updateImageHead.apply(api, arguments);
    };

    return api;
  });
  /**
   * 代码来自于：https://github.com/blueimp/JavaScript-Load-Image
   * 暂时项目中只用了orientation.
   *
   * 去除了 Exif Sub IFD Pointer, GPS Info IFD Pointer, Exif Thumbnail.
   * @fileOverview EXIF解析
   */

  // Sample
  // ====================================
  // Make : Apple
  // Model : iPhone 4S
  // Orientation : 1
  // XResolution : 72 [72/1]
  // YResolution : 72 [72/1]
  // ResolutionUnit : 2
  // Software : QuickTime 7.7.1
  // DateTime : 2013:09:01 22:53:55
  // ExifIFDPointer : 190
  // ExposureTime : 0.058823529411764705 [1/17]
  // FNumber : 2.4 [12/5]
  // ExposureProgram : Normal program
  // ISOSpeedRatings : 800
  // ExifVersion : 0220
  // DateTimeOriginal : 2013:09:01 22:52:51
  // DateTimeDigitized : 2013:09:01 22:52:51
  // ComponentsConfiguration : YCbCr
  // ShutterSpeedValue : 4.058893515764426
  // ApertureValue : 2.5260688216892597 [4845/1918]
  // BrightnessValue : -0.3126686601998395
  // MeteringMode : Pattern
  // Flash : Flash did not fire, compulsory flash mode
  // FocalLength : 4.28 [107/25]
  // SubjectArea : [4 values]
  // FlashpixVersion : 0100
  // ColorSpace : 1
  // PixelXDimension : 2448
  // PixelYDimension : 3264
  // SensingMethod : One-chip color area sensor
  // ExposureMode : 0
  // WhiteBalance : Auto white balance
  // FocalLengthIn35mmFilm : 35
  // SceneCaptureType : Standard
  define('runtime/html5/imagemeta/exif', [
    'base',
    'runtime/html5/imagemeta',
  ], (Base, ImageMeta) => {
    const EXIF = {};

    EXIF.ExifMap = function () {
      return this;
    };

    EXIF.ExifMap.prototype.map = {
      Orientation: 0x0112,
    };

    EXIF.ExifMap.prototype.get = function (id) {
      return this[id] || this[this.map[id]];
    };

    EXIF.exifTagTypes = {
      // byte, 8-bit unsigned int:
      1: {
        getValue(dataView, dataOffset) {
          return dataView.getUint8(dataOffset);
        },
        size: 1,
      },

      // ascii, 8-bit byte:
      2: {
        getValue(dataView, dataOffset) {
          return String.fromCharCode(dataView.getUint8(dataOffset));
        },
        size: 1,
        ascii: true,
      },

      // short, 16 bit int:
      3: {
        getValue(dataView, dataOffset, littleEndian) {
          return dataView.getUint16(dataOffset, littleEndian);
        },
        size: 2,
      },

      // long, 32 bit int:
      4: {
        getValue(dataView, dataOffset, littleEndian) {
          return dataView.getUint32(dataOffset, littleEndian);
        },
        size: 4,
      },

      // rational = two long values,
      // first is numerator, second is denominator:
      5: {
        getValue(dataView, dataOffset, littleEndian) {
          return dataView.getUint32(dataOffset, littleEndian)
            / dataView.getUint32(dataOffset + 4, littleEndian);
        },
        size: 8,
      },

      // slong, 32 bit signed int:
      9: {
        getValue(dataView, dataOffset, littleEndian) {
          return dataView.getInt32(dataOffset, littleEndian);
        },
        size: 4,
      },

      // srational, two slongs, first is numerator, second is denominator:
      10: {
        getValue(dataView, dataOffset, littleEndian) {
          return dataView.getInt32(dataOffset, littleEndian)
            / dataView.getInt32(dataOffset + 4, littleEndian);
        },
        size: 8,
      },
    };

    // undefined, 8-bit byte, value depending on field:
    EXIF.exifTagTypes[7] = EXIF.exifTagTypes[1];

    EXIF.getExifValue = function (dataView, tiffOffset, offset, type, length, littleEndian) {
      const tagType = EXIF.exifTagTypes[type];
      let tagSize; let dataOffset; let values; let i; let str; let c;

      if (!tagType) {
        Base.log('Invalid Exif data: Invalid tag type.');
        return;
      }

      tagSize = tagType.size * length;

      // Determine if the value is contained in the dataOffset bytes,
      // or if the value at the dataOffset is a pointer to the actual data:
      dataOffset = tagSize > 4
        ? tiffOffset + dataView.getUint32(offset + 8, littleEndian)
        : (offset + 8);

      if (dataOffset + tagSize > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid data offset.');
        return;
      }

      if (length === 1) {
        return tagType.getValue(dataView, dataOffset, littleEndian);
      }

      values = [];

      for (i = 0; i < length; i += 1) {
        values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);
      }

      if (tagType.ascii) {
        str = '';

        // Concatenate the chars:
        for (i = 0; i < values.length; i += 1) {
          c = values[i];

          // Ignore the terminating NULL byte(s):
          if (c === '\u0000') {
            break;
          }
          str += c;
        }

        return str;
      }
      return values;
    };

    EXIF.parseExifTag = function (dataView, tiffOffset, offset, littleEndian, data) {
      const tag = dataView.getUint16(offset, littleEndian);
      data.exif[tag] = EXIF.getExifValue(dataView, tiffOffset, offset, dataView.getUint16(offset + 2, littleEndian), // tag type
        dataView.getUint32(offset + 4, littleEndian), // tag length
        littleEndian);
    };

    EXIF.parseExifTags = function (dataView, tiffOffset, dirOffset, littleEndian, data) {
      let tagsNumber, dirEndOffset, i;

      if (dirOffset + 6 > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid directory offset.');
        return;
      }

      tagsNumber = dataView.getUint16(dirOffset, littleEndian);
      dirEndOffset = dirOffset + 2 + 12 * tagsNumber;

      if (dirEndOffset + 4 > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid directory size.');
        return;
      }

      for (i = 0; i < tagsNumber; i += 1) {
        this.parseExifTag(dataView, tiffOffset, dirOffset + 2 + 12 * i, // tag offset
          littleEndian, data);
      }

      // Return the offset to the next directory:
      return dataView.getUint32(dirEndOffset, littleEndian);
    };

    // EXIF.getExifThumbnail = function(dataView, offset, length) {
    //     var hexData,
    //         i,
    //         b;
    //     if (!length || offset + length > dataView.byteLength) {
    //         Base.log('Invalid Exif data: Invalid thumbnail data.');
    //         return;
    //     }
    //     hexData = [];
    //     for (i = 0; i < length; i += 1) {
    //         b = dataView.getUint8(offset + i);
    //         hexData.push((b < 16 ? '0' : '') + b.toString(16));
    //     }
    //     return 'data:image/jpeg,%' + hexData.join('%');
    // };

    EXIF.parseExifData = function (dataView, offset, length, data) {
      const tiffOffset = offset + 10;
      let littleEndian; let dirOffset;

      // Check for the ASCII code for "Exif" (0x45786966):
      if (dataView.getUint32(offset + 4) !== 0x45786966) {
        // No Exif data, might be XMP data instead
        return;
      }
      if (tiffOffset + 8 > dataView.byteLength) {
        Base.log('Invalid Exif data: Invalid segment size.');
        return;
      }

      // Check for the two null bytes:
      if (dataView.getUint16(offset + 8) !== 0x0000) {
        Base.log('Invalid Exif data: Missing byte alignment offset.');
        return;
      }

      // Check the byte alignment:
      switch (dataView.getUint16(tiffOffset)) {
        case 0x4949:
          littleEndian = true;
          break;

        case 0x4D4D:
          littleEndian = false;
          break;

        default:
          Base.log('Invalid Exif data: Invalid byte alignment marker.');
          return;
      }

      // Check for the TIFF tag marker (0x002A):
      if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
        Base.log('Invalid Exif data: Missing TIFF marker.');
        return;
      }

      // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
      dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
      // Create the exif object to store the tags:
      data.exif = new EXIF.ExifMap();
      // Parse the tags of the main image directory and retrieve the
      // offset to the next directory, usually the thumbnail directory:
      dirOffset = EXIF.parseExifTags(dataView, tiffOffset, tiffOffset + dirOffset, littleEndian, data);

      // 尝试读取缩略图
      // if ( dirOffset ) {
      //     thumbnailData = {exif: {}};
      //     dirOffset = EXIF.parseExifTags(
      //         dataView,
      //         tiffOffset,
      //         tiffOffset + dirOffset,
      //         littleEndian,
      //         thumbnailData
      //     );

      //     // Check for JPEG Thumbnail offset:
      //     if (thumbnailData.exif[0x0201]) {
      //         data.exif.Thumbnail = EXIF.getExifThumbnail(
      //             dataView,
      //             tiffOffset + thumbnailData.exif[0x0201],
      //             thumbnailData.exif[0x0202] // Thumbnail data length
      //         );
      //     }
      // }
    };

    ImageMeta.parsers[0xFFE1].push(EXIF.parseExifData);
    return EXIF;
  });
  /**
   * @fileOverview Image
   */
  define('runtime/html5/image', [
    'base',
    'runtime/html5/runtime',
    'runtime/html5/util',
  ], (Base, Html5Runtime, Util) => {
    const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';

    return Html5Runtime.register('Image', {

      // flag: 标记是否被修改过。
      modified: false,

      init() {
        const me = this;
        const img = new Image();

        img.onload = function () {
          me._info = {
            type: me.type,
            width: this.width,
            height: this.height,
          };

          // 读取meta信息。
          if (!me._metas && me.type === 'image/jpeg') {
            Util.parseMeta(me._blob, (error, ret) => {
              me._metas = ret;
              me.owner.trigger('load');
            });
          } else {
            me.owner.trigger('load');
          }
        };

        img.onerror = function () {
          me.owner.trigger('error');
        };

        me._img = img;
      },

      loadFromBlob(blob) {
        const me = this;
        const img = me._img;

        me._blob = blob;
        me.type = blob.type;
        img.src = Util.createObjectURL(blob.getSource());
        me.owner.once('load', () => {
          Util.revokeObjectURL(img.src);
        });
      },

      resize(width, height) {
        const canvas = this._canvas
          || (this._canvas = document.createElement('canvas'));

        this._resize(this._img, canvas, width, height);
        this._blob = null; // 没用了，可以删掉了。
        this.modified = true;
        this.owner.trigger('complete', 'resize');
      },

      crop(x, y, w, h, s) {
        const cvs = this._canvas
          || (this._canvas = document.createElement('canvas'));
        const opts = this.options;
        const img = this._img;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const orientation = this.getOrientation();

        s = s || 1;

        // todo 解决 orientation 的问题。
        // values that require 90 degree rotation
        // if ( ~[ 5, 6, 7, 8 ].indexOf( orientation ) ) {

        //     switch ( orientation ) {
        //         case 6:
        //             tmp = x;
        //             x = y;
        //             y = iw * s - tmp - w;
        //             console.log(ih * s, tmp, w)
        //             break;
        //     }

        //     (w ^= h, h ^= w, w ^= h);
        // }

        cvs.width = w;
        cvs.height = h;

        opts.preserveHeaders || this._rotate2Orientaion(cvs, orientation);
        this._renderImageToCanvas(cvs, img, -x, -y, iw * s, ih * s);

        this._blob = null; // 没用了，可以删掉了。
        this.modified = true;
        this.owner.trigger('complete', 'crop');
      },

      getAsBlob(type) {
        let blob = this._blob;
        const opts = this.options;
        let canvas;

        type = type || this.type;

        // blob需要重新生成。
        if (this.modified || this.type !== type) {
          canvas = this._canvas;

          if (type === 'image/jpeg') {
            blob = Util.canvasToDataUrl(canvas, type, opts.quality);

            if (opts.preserveHeaders && this._metas
              && this._metas.imageHead) {
              blob = Util.dataURL2ArrayBuffer(blob);
              blob = Util.updateImageHead(blob, this._metas.imageHead);
              blob = Util.arrayBufferToBlob(blob, type);
              return blob;
            }
          } else {
            blob = Util.canvasToDataUrl(canvas, type);
          }

          blob = Util.dataURL2Blob(blob);
        }

        return blob;
      },

      getAsDataUrl(type) {
        const opts = this.options;

        type = type || this.type;

        if (type === 'image/jpeg') {
          return Util.canvasToDataUrl(this._canvas, type, opts.quality);
        } else {
          return this._canvas.toDataURL(type);
        }
      },

      getOrientation() {
        return this._metas && this._metas.exif
          && this._metas.exif.get('Orientation') || 1;
      },

      info(val) {
        // setter
        if (val) {
          this._info = val;
          return this;
        }

        // getter
        return this._info;
      },

      meta(val) {
        // setter
        if (val) {
          this._meta = val;
          return this;
        }

        // getter
        return this._meta;
      },

      destroy() {
        const canvas = this._canvas;
        this._img.onload = null;

        if (canvas) {
          canvas.getContext('2d')
            .clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = canvas.height = 0;
          this._canvas = null;
        }

        // 释放内存。非常重要，否则释放不了image的内存。
        this._img.src = BLANK;
        this._img = this._blob = null;
      },

      _resize(img, cvs, width, height) {
        const opts = this.options;
        const naturalWidth = img.width;
        const naturalHeight = img.height;
        const orientation = this.getOrientation();
        let scale; let w; let h; let x; let y;

        // values that require 90 degree rotation
        if (~[5, 6, 7, 8].indexOf(orientation)) {
          // 交换width, height的值。
          width ^= height;
          height ^= width;
          width ^= height;
        }

        scale = Math[opts.crop ? 'max' : 'min'](width / naturalWidth, height / naturalHeight);

        // 不允许放大。
        opts.allowMagnify || (scale = Math.min(1, scale));

        w = naturalWidth * scale;
        h = naturalHeight * scale;

        if (opts.crop) {
          cvs.width = width;
          cvs.height = height;
        } else {
          cvs.width = w;
          cvs.height = h;
        }

        x = (cvs.width - w) / 2;
        y = (cvs.height - h) / 2;

        opts.preserveHeaders || this._rotate2Orientaion(cvs, orientation);

        this._renderImageToCanvas(cvs, img, x, y, w, h);
      },

      _rotate2Orientaion(canvas, orientation) {
        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext('2d');

        switch (orientation) {
          case 5:
          case 6:
          case 7:
          case 8:
            canvas.width = height;
            canvas.height = width;
            break;
        }

        switch (orientation) {
          case 2: // horizontal flip
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            break;

          case 3: // 180 rotate left
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            break;

          case 4: // vertical flip
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break;

          case 5: // vertical flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break;

          case 6: // 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            break;

          case 7: // horizontal flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            break;

          case 8: // 90 rotate left
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            break;
        }
      },

      // https://github.com/stomita/ios-imagefile-megapixel/
      // blob/master/src/megapix-image.js
      _renderImageToCanvas: (function () {
        // 如果不是ios, 不需要这么复杂！
        if (!Base.os.ios) {
          return function (canvas) {
            const args = Base.slice(arguments, 1);
            const ctx = canvas.getContext('2d');

            ctx.drawImage.apply(ctx, args);
          };
        }

        /**
         * Detecting vertical squash in loaded image.
         * Fixes a bug which squash image vertically while drawing into
         * canvas for some images.
         */
        function detectVerticalSquash(img, iw, ih) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let sy = 0;
          let ey = ih;
          let py = ih;
          let data; let alpha; let ratio;

          canvas.width = 1;
          canvas.height = ih;
          ctx.drawImage(img, 0, 0);
          data = ctx.getImageData(0, 0, 1, ih).data;

          // search image edge pixel position in case
          // it is squashed vertically.
          while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];

            if (alpha === 0) {
              ey = py;
            } else {
              sy = py;
            }

            py = (ey + sy) >> 1;
          }

          ratio = (py / ih);
          return (ratio === 0) ? 1 : ratio;
        }

        // fix ie7 bug
        // http://stackoverflow.com/questions/11929099/
        // html5-canvas-drawimage-ratio-bug-ios
        if (Base.os.ios >= 7) {
          return function (canvas, img, x, y, w, h) {
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const vertSquashRatio = detectVerticalSquash(img, iw, ih);

            return canvas.getContext('2d').drawImage(img, 0, 0, iw * vertSquashRatio, ih * vertSquashRatio, x, y, w, h);
          };
        }

        /**
         * Detect subsampling in loaded image.
         * In iOS, larger images than 2M pixels may be
         * subsampled in rendering.
         */
        function detectSubsampling(img) {
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;
          let canvas; let ctx;

          // subsampling may happen overmegapixel image
          if (iw * ih > 1024 * 1024) {
            canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img, -iw + 1, 0);

            // subsampled image becomes half smaller in rendering size.
            // check alpha channel value to confirm image is covering
            // edge pixel or not. if alpha value is 0
            // image is not covering, hence subsampled.
            return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
          } else {
            return false;
          }
        }

        return function (canvas, img, x, y, width, height) {
          let iw = img.naturalWidth;
          let ih = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          const subsampled = detectSubsampling(img);
          const doSquash = this.type === 'image/jpeg';
          const d = 1024;
          let sy = 0;
          let dy = 0;
          let tmpCanvas; let tmpCtx; let vertSquashRatio; let dw; let dh; let sx; let dx;

          if (subsampled) {
            iw /= 2;
            ih /= 2;
          }

          ctx.save();
          tmpCanvas = document.createElement('canvas');
          tmpCanvas.width = tmpCanvas.height = d;

          tmpCtx = tmpCanvas.getContext('2d');
          vertSquashRatio = doSquash
            ? detectVerticalSquash(img, iw, ih)
            : 1;

          dw = Math.ceil(d * width / iw);
          dh = Math.ceil(d * height / ih / vertSquashRatio);

          while (sy < ih) {
            sx = 0;
            dx = 0;
            while (sx < iw) {
              tmpCtx.clearRect(0, 0, d, d);
              tmpCtx.drawImage(img, -sx, -sy);
              ctx.drawImage(tmpCanvas, 0, 0, d, d, x + dx, y + dy, dw, dh);
              sx += d;
              dx += dw;
            }
            sy += d;
            dy += dh;
          }
          ctx.restore();
          tmpCanvas = tmpCtx = null;
        };
      })(),
    });
  });
  /**
   * @fileOverview Transport
   * @todo 支持chunked传输，优势：
   * 可以将大文件分成小块，挨个传输，可以提高大文件成功率，当失败的时候，也只需要重传那小部分，
   * 而不需要重头再传一次。另外断点续传也需要用chunked方式。
   */
  define('runtime/html5/transport', [
    'base',
    'runtime/html5/runtime',
  ], (Base, Html5Runtime) => {
    const noop = Base.noop;
    const $ = Base.$;

    return Html5Runtime.register('Transport', {
      init() {
        this._status = 0;
        this._response = null;
      },

      send() {
        const owner = this.owner;
        const opts = this.options;
        const xhr = this._initAjax();
        const blob = owner._blob;
        let server = opts.server;
        let formData; let binary; let fr;

        if (opts.sendAsBinary) {
          server += (/\?/.test(server) ? '&' : '?')
          + $.param(owner._formData);

          binary = blob.getSource();
        } else {
          formData = new FormData();
          $.each(owner._formData, (k, v) => {
            formData.append(k, v);
          });

          formData.append(opts.fileVal, blob.getSource(), opts.filename || owner._formData.name || '');
        }

        if (opts.withCredentials && 'withCredentials' in xhr) {
          xhr.open(opts.method, server, true);
          xhr.withCredentials = true;
        } else {
          xhr.open(opts.method, server);
        }

        this._setRequestHeader(xhr, opts.headers);

        if (binary) {
          // 强制设置成 content-type 为文件流。
          xhr.overrideMimeType
          && xhr.overrideMimeType('application/octet-stream');

          // android直接发送blob会导致服务端接收到的是空文件。
          // bug详情。
          // https://code.google.com/p/android/issues/detail?id=39882
          // 所以先用fileReader读取出来再通过arraybuffer的方式发送。
          if (Base.os.android) {
            fr = new FileReader();

            fr.onload = function () {
              xhr.send(this.result);
              fr = fr.onload = null;
            };

            fr.readAsArrayBuffer(binary);
          } else {
            xhr.send(binary);
          }
        } else {
          xhr.send(formData);
        }
      },

      getResponse() {
        return this._response;
      },

      getResponseAsJson() {
        return this._parseJson(this._response);
      },

      getStatus() {
        return this._status;
      },

      abort() {
        let xhr = this._xhr;

        if (xhr) {
          xhr.upload.onprogress = noop;
          xhr.onreadystatechange = noop;
          xhr.abort();

          this._xhr = xhr = null;
        }
      },

      destroy() {
        this.abort();
      },

      _initAjax() {
        const me = this;
        let xhr = new XMLHttpRequest();
        const opts = this.options;

        if (opts.withCredentials && !('withCredentials' in xhr)
          && typeof XDomainRequest !== 'undefined') {
          xhr = new XDomainRequest();
        }

        xhr.upload.onprogress = function (e) {
          let percentage = 0;

          if (e.lengthComputable) {
            percentage = e.loaded / e.total;
          }

          return me.trigger('progress', percentage);
        };

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }

          xhr.upload.onprogress = noop;
          xhr.onreadystatechange = noop;
          me._xhr = null;
          me._status = xhr.status;

          if (xhr.status >= 200 && xhr.status < 300) {
            me._response = xhr.responseText;
            return me.trigger('load');
          } else if (xhr.status >= 500 && xhr.status < 600) {
            me._response = xhr.responseText;
            return me.trigger('error', 'server');
          }

          return me.trigger('error', me._status ? 'http' : 'abort');
        };

        me._xhr = xhr;
        return xhr;
      },

      _setRequestHeader(xhr, headers) {
        $.each(headers, (key, val) => {
          xhr.setRequestHeader(key, val);
        });
      },

      _parseJson(str) {
        let json;

        try {
          json = JSON.parse(str);
        } catch (ex) {
          json = {};
        }

        return json;
      },
    });
  });
  /**
   * @fileOverview 只有html5实现的文件版本。
   */
  define('preset/html5only', [
    'base',

    // widgets
    'widgets/filednd',
    'widgets/filepaste',
    'widgets/filepicker',
    'widgets/image',
    'widgets/queue',
    'widgets/runtime',
    'widgets/upload',
    'widgets/validator',

    // runtimes
    // html5
    'runtime/html5/blob',
    'runtime/html5/dnd',
    'runtime/html5/filepaste',
    'runtime/html5/filepicker',
    'runtime/html5/imagemeta/exif',
    'runtime/html5/image',
    'runtime/html5/transport',
  ], (Base) => {
    return Base;
  });
  define('webuploader', [
    'preset/html5only',
  ], (preset) => {
    return preset;
  });
  return require('webuploader');
});

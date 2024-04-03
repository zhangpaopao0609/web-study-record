/* axios v0.21.1 | (c) 2020 by Matt Zabriskie */
!(function (e, t) {
  typeof exports == 'object' && typeof module == 'object' ? module.exports = t() : typeof define == 'function' && define.amd ? define([], t) : typeof exports == 'object' ? exports.axios = t() : e.axios = t();
}(this, () => {
  return (function (e) {
    function t(r) {
      if (n[r]) {
        return n[r].exports;
      } const o = n[r] = { exports: {}, id: r, loaded: !1 }; return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
    } var n = {}; return t.m = e, t.c = n, t.p = '', t(0);
  }([function (e, t, n) {
    e.exports = n(1);
  }, function (e, t, n) {
    'use strict'; function r(e) {
      const t = new i(e); const n = s(i.prototype.request, t); return o.extend(n, i.prototype, t), o.extend(n, t), n;
    } var o = n(2); var s = n(3); var i = n(4); const a = n(22); const u = n(10); const c = r(u); c.Axios = i, c.create = function (e) {
      return r(a(c.defaults, e));
    }, c.Cancel = n(23), c.CancelToken = n(24), c.isCancel = n(9), c.all = function (e) {
      return Promise.all(e);
    }, c.spread = n(25), c.isAxiosError = n(26), e.exports = c, e.exports.default = c;
  }, function (e, t, n) {
    'use strict'; function r(e) {
      return R.call(e) === '[object Array]';
    } function o(e) {
      return typeof e == 'undefined';
    } function s(e) {
      return e !== null && !o(e) && e.constructor !== null && !o(e.constructor) && typeof e.constructor.isBuffer == 'function' && e.constructor.isBuffer(e);
    } function i(e) {
      return R.call(e) === '[object ArrayBuffer]';
    } function a(e) {
      return typeof FormData != 'undefined' && e instanceof FormData;
    } function u(e) {
      let t; return t = typeof ArrayBuffer != 'undefined' && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
    } function c(e) {
      return typeof e == 'string';
    } function f(e) {
      return typeof e == 'number';
    } function p(e) {
      return e !== null && typeof e == 'object';
    } function d(e) {
      if (R.call(e) !== '[object Object]') {
        return !1;
      } const t = Object.getPrototypeOf(e); return t === null || t === Object.prototype;
    } function l(e) {
      return R.call(e) === '[object Date]';
    } function h(e) {
      return R.call(e) === '[object File]';
    } function m(e) {
      return R.call(e) === '[object Blob]';
    } function y(e) {
      return R.call(e) === '[object Function]';
    } function g(e) {
      return p(e) && y(e.pipe);
    } function v(e) {
      return typeof URLSearchParams != 'undefined' && e instanceof URLSearchParams;
    } function x(e) {
      return e.replace(/^\s*/, '').replace(/\s*$/, '');
    } function w() {
      return (typeof navigator == 'undefined' || navigator.product !== 'ReactNative' && navigator.product !== 'NativeScript' && navigator.product !== 'NS') && (typeof window != 'undefined' && typeof document != 'undefined');
    } function b(e, t) {
      if (e !== null && typeof e != 'undefined') {
        if (typeof e != 'object' && (e = [e]), r(e)) {
 for (let n = 0, o = e.length; n < o; n++) {
          t.call(null, e[n], n, e);
        } 
} else {
          for (const s in e) {
            Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
          }
        }
      }
    } function E() {
      function e(e, n) {
        d(t[n]) && d(e) ? t[n] = E(t[n], e) : d(e) ? t[n] = E({}, e) : r(e) ? t[n] = e.slice() : t[n] = e;
      } for (var t = {}, n = 0, o = arguments.length; n < o; n++) {
        b(arguments[n], e);
      } return t;
    } function j(e, t, n) {
      return b(t, (t, r) => {
        n && typeof t == 'function' ? e[r] = S(t, n) : e[r] = t;
      }), e;
    } function C(e) {
      return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
    } var S = n(3); var R = Object.prototype.toString; e.exports = { isArray: r, isArrayBuffer: i, isBuffer: s, isFormData: a, isArrayBufferView: u, isString: c, isNumber: f, isObject: p, isPlainObject: d, isUndefined: o, isDate: l, isFile: h, isBlob: m, isFunction: y, isStream: g, isURLSearchParams: v, isStandardBrowserEnv: w, forEach: b, merge: E, extend: j, trim: x, stripBOM: C };
  }, function (e, t) {
    'use strict'; e.exports = function (e, t) {
      return function () {
        for (var n = Array.from({ length: arguments.length }), r = 0; r < n.length; r++) {
          n[r] = arguments[r];
        } return e.apply(t, n);
      };
    };
  }, function (e, t, n) {
    'use strict'; function r(e) {
      this.defaults = e, this.interceptors = { request: new i(), response: new i() };
    } const o = n(2); const s = n(5); var i = n(6); const a = n(7); const u = n(22); r.prototype.request = function (e) {
      typeof e == 'string' ? (e = arguments[1] || {}, e.url = arguments[0]) : e = e || {}, e = u(this.defaults, e), e.method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = 'get'; const t = [a, void 0]; let n = Promise.resolve(e); for (this.interceptors.request.forEach((e) => {
        t.unshift(e.fulfilled, e.rejected);
      }), this.interceptors.response.forEach((e) => {
        t.push(e.fulfilled, e.rejected);
      }); t.length;) {
        n = n.then(t.shift(), t.shift());
      } return n;
    }, r.prototype.getUri = function (e) {
      return e = u(this.defaults, e), s(e.url, e.params, e.paramsSerializer).replace(/^\?/, '');
    }, o.forEach(['delete', 'get', 'head', 'options'], (e) => {
      r.prototype[e] = function (t, n) {
        return this.request(u(n || {}, { method: e, url: t, data: (n || {}).data }));
      };
    }), o.forEach(['post', 'put', 'patch'], (e) => {
      r.prototype[e] = function (t, n, r) {
        return this.request(u(r || {}, { method: e, url: t, data: n }));
      };
    }), e.exports = r;
  }, function (e, t, n) {
    'use strict'; function r(e) {
      return encodeURIComponent(e).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    } const o = n(2); e.exports = function (e, t, n) {
      if (!t) {
        return e;
      } let s; if (n) {
        s = n(t);
      } else if (o.isURLSearchParams(t)) {
        s = t.toString();
      } else {
        const i = []; o.forEach(t, (e, t) => {
          e !== null && typeof e != 'undefined' && (o.isArray(e) ? t += '[]' : e = [e], o.forEach(e, (e) => {
            o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), i.push(`${r(t)}=${r(e)}`);
          }));
        }), s = i.join('&');
      } if (s) {
        const a = e.indexOf('#'); a !== -1 && (e = e.slice(0, a)), e += (!e.includes('?') ? '?' : '&') + s;
      } return e;
    };
  }, function (e, t, n) {
    'use strict'; function r() {
      this.handlers = [];
    } const o = n(2); r.prototype.use = function (e, t) {
      return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
    }, r.prototype.eject = function (e) {
      this.handlers[e] && (this.handlers[e] = null);
    }, r.prototype.forEach = function (e) {
      o.forEach(this.handlers, (t) => {
        t !== null && e(t);
      });
    }, e.exports = r;
  }, function (e, t, n) {
    'use strict'; function r(e) {
      e.cancelToken && e.cancelToken.throwIfRequested();
    } const o = n(2); const s = n(8); const i = n(9); const a = n(10); e.exports = function (e) {
      r(e), e.headers = e.headers || {}, e.data = s(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), o.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (t) => {
        delete e.headers[t];
      }); const t = e.adapter || a.adapter; return t(e).then((t) => {
        return r(e), t.data = s(t.data, t.headers, e.transformResponse), t;
      }, (t) => {
        return i(t) || (r(e), t && t.response && (t.response.data = s(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
      });
    };
  }, function (e, t, n) {
    'use strict'; const r = n(2); e.exports = function (e, t, n) {
      return r.forEach(n, (n) => {
        e = n(e, t);
      }), e;
    };
  }, function (e, t) {
    'use strict'; e.exports = function (e) {
      return !(!e || !e.__CANCEL__);
    };
  }, function (e, t, n) {
    'use strict'; function r(e, t) {
      !s.isUndefined(e) && s.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
    } function o() {
      let e; return typeof XMLHttpRequest != 'undefined' ? e = n(12) : typeof process != 'undefined' && Object.prototype.toString.call(process) === '[object process]' && (e = n(12)), e;
    } var s = n(2); const i = n(11); const a = { 'Content-Type': 'application/x-www-form-urlencoded' }; const u = { adapter: o(), transformRequest: [function (e, t) {
      return i(t, 'Accept'), i(t, 'Content-Type'), s.isFormData(e) || s.isArrayBuffer(e) || s.isBuffer(e) || s.isStream(e) || s.isFile(e) || s.isBlob(e) ? e : s.isArrayBufferView(e) ? e.buffer : s.isURLSearchParams(e) ? (r(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString()) : s.isObject(e) ? (r(t, 'application/json;charset=utf-8'), JSON.stringify(e)) : e;
    }], transformResponse: [function (e) {
      if (typeof e == 'string') {
        try {
          e = JSON.parse(e);
        } catch (e) {}
      } return e;
    }], timeout: 0, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1, maxBodyLength: -1, validateStatus(e) {
      return e >= 200 && e < 300;
    } }; u.headers = { common: { Accept: 'application/json, text/plain, */*' } }, s.forEach(['delete', 'get', 'head'], (e) => {
      u.headers[e] = {};
    }), s.forEach(['post', 'put', 'patch'], (e) => {
      u.headers[e] = s.merge(a);
    }), e.exports = u;
  }, function (e, t, n) {
    'use strict'; const r = n(2); e.exports = function (e, t) {
      r.forEach(e, (n, r) => {
        r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);
      });
    };
  }, function (e, t, n) {
    'use strict'; const r = n(2); const o = n(13); const s = n(16); const i = n(5); const a = n(17); const u = n(20); const c = n(21); const f = n(14); e.exports = function (e) {
      return new Promise((t, n) => {
        let p = e.data; const d = e.headers; r.isFormData(p) && delete d['Content-Type']; let l = new XMLHttpRequest(); if (e.auth) {
          const h = e.auth.username || ''; const m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : ''; d.Authorization = `Basic ${btoa(`${h}:${m}`)}`;
        } const y = a(e.baseURL, e.url); if (l.open(e.method.toUpperCase(), i(y, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, l.onreadystatechange = function () {
          if (l && l.readyState === 4 && (l.status !== 0 || l.responseURL && l.responseURL.indexOf('file:') === 0)) {
            const r = 'getAllResponseHeaders' in l ? u(l.getAllResponseHeaders()) : null; const s = e.responseType && e.responseType !== 'text' ? l.response : l.responseText; const i = { data: s, status: l.status, statusText: l.statusText, headers: r, config: e, request: l }; o(t, n, i), l = null;
          }
        }, l.onabort = function () {
          l && (n(f('Request aborted', e, 'ECONNABORTED', l)), l = null);
        }, l.onerror = function () {
          n(f('Network Error', e, null, l)), l = null;
        }, l.ontimeout = function () {
          let t = `timeout of ${e.timeout}ms exceeded`; e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(f(t, e, 'ECONNABORTED', l)), l = null;
        }, r.isStandardBrowserEnv()) {
          const g = (e.withCredentials || c(y)) && e.xsrfCookieName ? s.read(e.xsrfCookieName) : void 0; g && (d[e.xsrfHeaderName] = g);
        } if ('setRequestHeader' in l && r.forEach(d, (e, t) => {
          typeof p == 'undefined' && t.toLowerCase() === 'content-type' ? delete d[t] : l.setRequestHeader(t, e);
        }), r.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), e.responseType) {
          try {
            l.responseType = e.responseType;
          } catch (t) {
            if (e.responseType !== 'json') {
 throw t; 
}
          }
        } typeof e.onDownloadProgress == 'function' && l.addEventListener('progress', e.onDownloadProgress), typeof e.onUploadProgress == 'function' && l.upload && l.upload.addEventListener('progress', e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((e) => {
          l && (l.abort(), n(e), l = null);
        }), p || (p = null), l.send(p);
      });
    };
  }, function (e, t, n) {
    'use strict'; const r = n(14); e.exports = function (e, t, n) {
      const o = n.config.validateStatus; n.status && o && !o(n.status) ? t(r(`Request failed with status code ${n.status}`, n.config, null, n.request, n)) : e(n);
    };
  }, function (e, t, n) {
    'use strict'; const r = n(15); e.exports = function (e, t, n, o, s) {
      const i = new Error(e); return r(i, t, n, o, s);
    };
  }, function (e, t) {
    'use strict'; e.exports = function (e, t, n, r, o) {
      return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () {
        return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code };
      }, e;
    };
  }, function (e, t, n) {
    'use strict'; const r = n(2); e.exports = r.isStandardBrowserEnv()
      ? (function () {
          return { write(e, t, n, o, s, i) {
            const a = []; a.push(`${e}=${encodeURIComponent(t)}`), r.isNumber(n) && a.push(`expires=${new Date(n).toGMTString()}`), r.isString(o) && a.push(`path=${o}`), r.isString(s) && a.push(`domain=${s}`), i === !0 && a.push('secure'), document.cookie = a.join('; ');
          }, read(e) {
            const t = document.cookie.match(new RegExp(`(^|;\\s*)(${e})=([^;]*)`)); return t ? decodeURIComponent(t[3]) : null;
          }, remove(e) {
            this.write(e, '', Date.now() - 864e5);
          } };
        }())
      : (function () {
          return { write() {}, read() {
            return null;
          }, remove() {} };
        }());
  }, function (e, t, n) {
    'use strict'; const r = n(18); const o = n(19); e.exports = function (e, t) {
      return e && !r(t) ? o(e, t) : t;
    };
  }, function (e, t) {
    'use strict'; e.exports = function (e) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
    };
  }, function (e, t) {
    'use strict'; e.exports = function (e, t) {
      return t ? `${e.replace(/\/+$/, '')}/${t.replace(/^\/+/, '')}` : e;
    };
  }, function (e, t, n) {
    'use strict'; const r = n(2); const o = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']; e.exports = function (e) {
      let t; let n; let s; const i = {}; return e
        ? (r.forEach(e.split('\n'), (e) => {
            if (s = e.indexOf(':'), t = r.trim(e.substr(0, s)).toLowerCase(), n = r.trim(e.substr(s + 1)), t) {
              if (i[t] && o.includes(t)) {
                return;
              } t === 'set-cookie' ? i[t] = (i[t] ? i[t] : []).concat([n]) : i[t] = i[t] ? `${i[t]}, ${n}` : n;
            }
          }), i)
        : i;
    };
  }, function (e, t, n) {
    'use strict'; const r = n(2); e.exports = r.isStandardBrowserEnv()
      ? (function () {
          function e(e) {
            let t = e; return n && (o.setAttribute('href', t), t = o.href), o.setAttribute('href', t), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, '') : '', host: o.host, search: o.search ? o.search.replace(/^\?/, '') : '', hash: o.hash ? o.hash.replace(/^#/, '') : '', hostname: o.hostname, port: o.port, pathname: o.pathname.charAt(0) === '/' ? o.pathname : `/${o.pathname}` };
          } let t; var n = /(msie|trident)/i.test(navigator.userAgent); var o = document.createElement('a'); return t = e(window.location.href), function (n) {
            const o = r.isString(n) ? e(n) : n; return o.protocol === t.protocol && o.host === t.host;
          };
        }())
      : (function () {
          return function () {
            return !0;
          };
        }());
  }, function (e, t, n) {
    'use strict'; const r = n(2); e.exports = function (e, t) {
      function n(e, t) {
        return r.isPlainObject(e) && r.isPlainObject(t) ? r.merge(e, t) : r.isPlainObject(t) ? r.merge({}, t) : r.isArray(t) ? t.slice() : t;
      } function o(o) {
        r.isUndefined(t[o]) ? r.isUndefined(e[o]) || (s[o] = n(void 0, e[o])) : s[o] = n(e[o], t[o]);
      }t = t || {}; var s = {}; const i = ['url', 'method', 'data']; const a = ['headers', 'auth', 'proxy', 'params']; const u = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding']; const c = ['validateStatus']; r.forEach(i, (e) => {
        r.isUndefined(t[e]) || (s[e] = n(void 0, t[e]));
      }), r.forEach(a, o), r.forEach(u, (o) => {
        r.isUndefined(t[o]) ? r.isUndefined(e[o]) || (s[o] = n(void 0, e[o])) : s[o] = n(void 0, t[o]);
      }), r.forEach(c, (r) => {
        r in t ? s[r] = n(e[r], t[r]) : r in e && (s[r] = n(void 0, e[r]));
      }); const f = i.concat(a).concat(u).concat(c); const p = Object.keys(e).concat(Object.keys(t)).filter((e) => {
        return !f.includes(e);
      }); return r.forEach(p, o), s;
    };
  }, function (e, t) {
    'use strict'; function n(e) {
      this.message = e;
    }n.prototype.toString = function () {
      return `Cancel${this.message ? `: ${this.message}` : ''}`;
    }, n.prototype.__CANCEL__ = !0, e.exports = n;
  }, function (e, t, n) {
    'use strict'; function r(e) {
      if (typeof e != 'function') {
        throw new TypeError('executor must be a function.');
      } let t; this.promise = new Promise((e) => {
        t = e;
      }); const n = this; e((e) => {
        n.reason || (n.reason = new o(e), t(n.reason));
      });
    } var o = n(23); r.prototype.throwIfRequested = function () {
      if (this.reason) {
        throw this.reason;
      }
    }, r.source = function () {
      let e; const t = new r((t) => {
        e = t;
      }); return { token: t, cancel: e };
    }, e.exports = r;
  }, function (e, t) {
    'use strict'; e.exports = function (e) {
      return function (t) {
        return e.apply(null, t);
      };
    };
  }, function (e, t) {
    'use strict'; e.exports = function (e) {
      return typeof e == 'object' && e.isAxiosError === !0;
    };
  }]));
}));
// # sourceMappingURL=axios.min.map

var zn = Object.defineProperty;
var Kn = (e, t, n) => t in e ? zn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var gn = (e, t, n) => (Kn(e, typeof t != "symbol" ? t + "" : t, n), n);
var mt = Object.defineProperty, bt = (e, t, n) => t in e ? mt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, R = (e, t, n) => (bt(e, typeof t != "symbol" ? t + "" : t, n), n);
function Be(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: yt } = Object.prototype, { getPrototypeOf: se } = Object, $ = ((e) => (t) => {
  const n = yt.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), A = (e) => (e = e.toLowerCase(), (t) => $(t) === e), v = (e) => (t) => typeof t === e, { isArray: B } = Array, q = v("undefined");
function St(e) {
  return e !== null && !q(e) && e.constructor !== null && !q(e.constructor) && E(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const xe = A("ArrayBuffer");
function wt(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && xe(e.buffer), t;
}
const Et = v("string"), E = v("function"), qe = v("number"), z = (e) => e !== null && typeof e == "object", kt = (e) => e === !0 || e === !1, L = (e) => {
  if ($(e) !== "object")
    return !1;
  const t = se(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, gt = A("Date"), Rt = A("File"), At = A("Blob"), Ot = A("FileList"), Pt = (e) => z(e) && E(e.pipe), Ct = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || E(e.append) && ((t = $(e)) === "formdata" || // detect form-data instance
  t === "object" && E(e.toString) && e.toString() === "[object FormData]"));
}, Tt = A("URLSearchParams"), Nt = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function F(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), B(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = o.length;
    let l;
    for (r = 0; r < a; r++)
      l = o[r], t.call(null, e[l], l, e);
  }
}
function Fe(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Ue = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), _e = (e) => !q(e) && e !== Ue;
function Z() {
  const { caseless: e } = _e(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && Fe(t, s) || s;
    L(t[o]) && L(r) ? t[o] = Z(t[o], r) : L(r) ? t[o] = Z({}, r) : B(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && F(arguments[r], n);
  return t;
}
const Dt = (e, t, n, { allOwnKeys: r } = {}) => (F(t, (s, o) => {
  n && E(s) ? e[o] = Be(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), Bt = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), xt = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, qt = (e, t, n, r) => {
  let s, o, a;
  const l = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      a = s[o], (!r || r(a, e, t)) && !l[a] && (t[a] = e[a], l[a] = !0);
    e = n !== !1 && se(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Ft = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Ut = (e) => {
  if (!e)
    return null;
  if (B(e))
    return e;
  let t = e.length;
  if (!qe(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, _t = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && se(Uint8Array)), Lt = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, It = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, jt = A("HTMLFormElement"), Mt = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, n, r) {
    return n.toUpperCase() + r;
  }
), he = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Ht = A("RegExp"), Le = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  F(n, (s, o) => {
    let a;
    (a = t(s, o, e)) !== !1 && (r[o] = a || s);
  }), Object.defineProperties(e, r);
}, $t = (e) => {
  Le(e, (t, n) => {
    if (E(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (E(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, vt = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return B(e) ? r(e) : r(String(e).split(t)), n;
}, zt = () => {
}, Wt = (e, t) => (e = +e, Number.isFinite(e) ? e : t), V = "abcdefghijklmnopqrstuvwxyz", de = "0123456789", Ie = {
  DIGIT: de,
  ALPHA: V,
  ALPHA_DIGIT: V + V.toUpperCase() + de
}, Jt = (e = 16, t = Ie.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function Vt(e) {
  return !!(e && E(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Kt = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (z(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = B(r) ? [] : {};
        return F(r, (a, l) => {
          const f = n(a, s + 1);
          !q(f) && (o[l] = f);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, Gt = A("AsyncFunction"), Qt = (e) => e && (z(e) || E(e)) && E(e.then) && E(e.catch), u = {
  isArray: B,
  isArrayBuffer: xe,
  isBuffer: St,
  isFormData: Ct,
  isArrayBufferView: wt,
  isString: Et,
  isNumber: qe,
  isBoolean: kt,
  isObject: z,
  isPlainObject: L,
  isUndefined: q,
  isDate: gt,
  isFile: Rt,
  isBlob: At,
  isRegExp: Ht,
  isFunction: E,
  isStream: Pt,
  isURLSearchParams: Tt,
  isTypedArray: _t,
  isFileList: Ot,
  forEach: F,
  merge: Z,
  extend: Dt,
  trim: Nt,
  stripBOM: Bt,
  inherits: xt,
  toFlatObject: qt,
  kindOf: $,
  kindOfTest: A,
  endsWith: Ft,
  toArray: Ut,
  forEachEntry: Lt,
  matchAll: It,
  isHTMLForm: jt,
  hasOwnProperty: he,
  hasOwnProp: he,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Le,
  freezeMethods: $t,
  toObjectSet: vt,
  toCamelCase: Mt,
  noop: zt,
  toFiniteNumber: Wt,
  findKey: Fe,
  global: Ue,
  isContextDefined: _e,
  ALPHABET: Ie,
  generateString: Jt,
  isSpecCompliantForm: Vt,
  toJSONObject: Kt,
  isAsyncFn: Gt,
  isThenable: Qt
};
function y(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s);
}
u.inherits(y, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: u.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const je = y.prototype, Me = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Me[e] = { value: e };
});
Object.defineProperties(y, Me);
Object.defineProperty(je, "isAxiosError", { value: !0 });
y.from = (e, t, n, r, s, o) => {
  const a = Object.create(je);
  return u.toFlatObject(e, a, function(l) {
    return l !== Error.prototype;
  }, (l) => l !== "isAxiosError"), y.call(a, e.message, t, n, r, s), a.cause = e, a.name = e.name, o && Object.assign(a, o), a;
};
const Xt = null;
function ee(e) {
  return u.isPlainObject(e) || u.isArray(e);
}
function He(e) {
  return u.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function fe(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = He(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Yt(e) {
  return u.isArray(e) && !e.some(ee);
}
const Zt = u.toFlatObject(u, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function W(e, t, n) {
  if (!u.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = u.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(k, O) {
    return !u.isUndefined(O[k]);
  });
  const r = n.metaTokens, s = n.visitor || p, o = n.dots, a = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && u.isSpecCompliantForm(t);
  if (!u.isFunction(s))
    throw new TypeError("visitor must be a function");
  function f(k) {
    if (k === null)
      return "";
    if (u.isDate(k))
      return k.toISOString();
    if (!l && u.isBlob(k))
      throw new y("Blob is not supported. Use a Buffer instead.");
    return u.isArrayBuffer(k) || u.isTypedArray(k) ? l && typeof Blob == "function" ? new Blob([k]) : Buffer.from(k) : k;
  }
  function p(k, O, rt) {
    let st = k;
    if (k && !rt && typeof k == "object") {
      if (u.endsWith(O, "{}"))
        O = r ? O : O.slice(0, -2), k = JSON.stringify(k);
      else if (u.isArray(k) && Yt(k) || (u.isFileList(k) || u.endsWith(O, "[]")) && (st = u.toArray(k)))
        return O = He(O), st.forEach(function(ft, ut) {
          !(u.isUndefined(ft) || ft === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? fe([O], ut, o) : a === null ? O : O + "[]",
            f(ft)
          );
        }), !1;
    }
    return ee(k) ? !0 : (t.append(fe(rt, O, o), f(k)), !1);
  }
  const d = [], _ = Object.assign(Zt, {
    defaultVisitor: p,
    convertValue: f,
    isVisitable: ee
  });
  function S(k, O) {
    if (!u.isUndefined(k)) {
      if (d.indexOf(k) !== -1)
        throw Error("Circular reference detected in " + O.join("."));
      d.push(k), u.forEach(k, function(rt, st) {
        (!(u.isUndefined(rt) || rt === null) && s.call(
          t,
          rt,
          u.isString(st) ? st.trim() : st,
          O,
          _
        )) === !0 && S(rt, O ? O.concat(st) : [st]);
      }), d.pop();
    }
  }
  if (!u.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function me(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function ae(e, t) {
  this._pairs = [], e && W(e, this, t);
}
const $e = ae.prototype;
$e.append = function(e, t) {
  this._pairs.push([e, t]);
};
$e.toString = function(e) {
  const t = e ? function(n) {
    return e.call(this, n, me);
  } : me;
  return this._pairs.map(function(n) {
    return t(n[0]) + "=" + t(n[1]);
  }, "").join("&");
};
function eo(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ve(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || eo, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = u.isURLSearchParams(t) ? t.toString() : new ae(t, n).toString(r), o) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
let to$1 = class {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    u.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
};
const be = to$1, ze = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, oo = typeof URLSearchParams < "u" ? URLSearchParams : ae, ro = typeof FormData < "u" ? FormData : null, no = typeof Blob < "u" ? Blob : null, so = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), ao = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), g = {
  isBrowser: !0,
  classes: {
    URLSearchParams: oo,
    FormData: ro,
    Blob: no
  },
  isStandardBrowserEnv: so,
  isStandardBrowserWebWorkerEnv: ao,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function io(e, t) {
  return W(e, new g.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return g.isNode && u.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function co(e) {
  return u.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function po(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function We(e) {
  function t(n, r, s, o) {
    let a = n[o++];
    const l = Number.isFinite(+a), f = o >= n.length;
    return a = !a && u.isArray(s) ? s.length : a, f ? (u.hasOwnProp(s, a) ? s[a] = [s[a], r] : s[a] = r, !l) : ((!s[a] || !u.isObject(s[a])) && (s[a] = []), t(n, r, s[a], o) && u.isArray(s[a]) && (s[a] = po(s[a])), !l);
  }
  if (u.isFormData(e) && u.isFunction(e.entries)) {
    const n = {};
    return u.forEachEntry(e, (r, s) => {
      t(co(r), s, n, 0);
    }), n;
  }
  return null;
}
function uo(e, t, n) {
  if (u.isString(e))
    try {
      return (t || JSON.parse)(e), u.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const ie = {
  transitional: ze,
  adapter: g.isNode ? "http" : "xhr",
  transformRequest: [function(e, t) {
    const n = t.getContentType() || "", r = n.indexOf("application/json") > -1, s = u.isObject(e);
    if (s && u.isHTMLForm(e) && (e = new FormData(e)), u.isFormData(e))
      return r && r ? JSON.stringify(We(e)) : e;
    if (u.isArrayBuffer(e) || u.isBuffer(e) || u.isStream(e) || u.isFile(e) || u.isBlob(e))
      return e;
    if (u.isArrayBufferView(e))
      return e.buffer;
    if (u.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let o;
    if (s) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return io(e, this.formSerializer).toString();
      if ((o = u.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return W(
          o ? { "files[]": e } : e,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return s || r ? (t.setContentType("application/json", !1), uo(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || ie.transitional, n = t && t.forcedJSONParsing, r = this.responseType === "json";
    if (e && u.isString(e) && (n && !this.responseType || r)) {
      const s = !(t && t.silentJSONParsing) && r;
      try {
        return JSON.parse(e);
      } catch (o) {
        if (s)
          throw o.name === "SyntaxError" ? y.from(o, y.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: g.classes.FormData,
    Blob: g.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
u.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ie.headers[e] = {};
});
const ce = ie, lo = u.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), ho = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), n = o.substring(0, s).trim().toLowerCase(), r = o.substring(s + 1).trim(), !(!n || t[n] && lo[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, ye = Symbol("internals");
function x(e) {
  return e && String(e).trim().toLowerCase();
}
function I(e) {
  return e === !1 || e == null ? e : u.isArray(e) ? e.map(I) : String(e);
}
function fo(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const mo = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function K(e, t, n, r, s) {
  if (u.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!u.isString(t)) {
    if (u.isString(r))
      return t.indexOf(r) !== -1;
    if (u.isRegExp(r))
      return r.test(t);
  }
}
function bo(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function yo(e, t) {
  const n = u.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, a) {
        return this[r].call(this, t, s, o, a);
      },
      configurable: !0
    });
  });
}
let J = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    const r = this;
    function s(a, l, f) {
      const p = x(l);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const d = u.findKey(r, p);
      (!d || r[d] === void 0 || f === !0 || f === void 0 && r[d] !== !1) && (r[d || l] = I(a));
    }
    const o = (a, l) => u.forEach(a, (f, p) => s(f, p, l));
    return u.isPlainObject(e) || e instanceof this.constructor ? o(e, t) : u.isString(e) && (e = e.trim()) && !mo(e) ? o(ho(e), t) : e != null && s(t, e, n), this;
  }
  get(e, t) {
    if (e = x(e), e) {
      const n = u.findKey(this, e);
      if (n) {
        const r = this[n];
        if (!t)
          return r;
        if (t === !0)
          return fo(r);
        if (u.isFunction(t))
          return t.call(this, r, n);
        if (u.isRegExp(t))
          return t.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = x(e), e) {
      const n = u.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || K(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    const n = this;
    let r = !1;
    function s(o) {
      if (o = x(o), o) {
        const a = u.findKey(n, o);
        a && (!t || K(n, n[a], a, t)) && (delete n[a], r = !0);
      }
    }
    return u.isArray(e) ? e.forEach(s) : s(e), r;
  }
  clear(e) {
    const t = Object.keys(this);
    let n = t.length, r = !1;
    for (; n--; ) {
      const s = t[n];
      (!e || K(this, this[s], s, e, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(e) {
    const t = this, n = {};
    return u.forEach(this, (r, s) => {
      const o = u.findKey(n, s);
      if (o) {
        t[o] = I(r), delete t[s];
        return;
      }
      const a = e ? bo(s) : String(s).trim();
      a !== s && delete t[s], t[a] = I(r), n[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return u.forEach(this, (n, r) => {
      n != null && n !== !1 && (t[r] = e && u.isArray(n) ? n.join(", ") : n);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const n = new this(e);
    return t.forEach((r) => n.set(r)), n;
  }
  static accessor(e) {
    const t = (this[ye] = this[ye] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function r(s) {
      const o = x(s);
      t[o] || (yo(n, s), t[o] = !0);
    }
    return u.isArray(e) ? e.forEach(r) : r(e), this;
  }
};
J.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
u.reduceDescriptors(J.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
u.freezeMethods(J);
const P = J;
function G(e, t) {
  const n = this || ce, r = t || n, s = P.from(r.headers);
  let o = r.data;
  return u.forEach(e, function(a) {
    o = a.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function Je(e) {
  return !!(e && e.__CANCEL__);
}
function U(e, t, n) {
  y.call(this, e ?? "canceled", y.ERR_CANCELED, t, n), this.name = "CanceledError";
}
u.inherits(U, y, {
  __CANCEL__: !0
});
function So(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new y(
    "Request failed with status code " + n.status,
    [y.ERR_BAD_REQUEST, y.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const wo = g.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(e, t, n, r, s, o) {
        const a = [];
        a.push(e + "=" + encodeURIComponent(t)), u.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), u.isString(r) && a.push("path=" + r), u.isString(s) && a.push("domain=" + s), o === !0 && a.push("secure"), document.cookie = a.join("; ");
      },
      read: function(e) {
        const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
        return t ? decodeURIComponent(t[3]) : null;
      },
      remove: function(e) {
        this.write(e, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Eo(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ko(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ve(e, t) {
  return e && !Eo(t) ? ko(e, t) : t;
}
const go = g.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
    let n;
    function r(s) {
      let o = s;
      return e && (t.setAttribute("href", o), o = t.href), t.setAttribute("href", o), {
        href: t.href,
        protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
        host: t.host,
        search: t.search ? t.search.replace(/^\?/, "") : "",
        hash: t.hash ? t.hash.replace(/^#/, "") : "",
        hostname: t.hostname,
        port: t.port,
        pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
      };
    }
    return n = r(window.location.href), function(s) {
      const o = u.isString(s) ? r(s) : s;
      return o.protocol === n.protocol && o.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function Ro(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ao(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, a;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const f = Date.now(), p = r[o];
    a || (a = f), n[s] = l, r[s] = f;
    let d = o, _ = 0;
    for (; d !== s; )
      _ += n[d++], d = d % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), f - a < t)
      return;
    const S = p && f - p;
    return S ? Math.round(_ * 1e3 / S) : void 0;
  };
}
function Se(e, t) {
  let n = 0;
  const r = Ao(50, 250);
  return (s) => {
    const o = s.loaded, a = s.lengthComputable ? s.total : void 0, l = o - n, f = r(l), p = o <= a;
    n = o;
    const d = {
      loaded: o,
      total: a,
      progress: a ? o / a : void 0,
      bytes: l,
      rate: f || void 0,
      estimated: f && a && p ? (a - o) / f : void 0,
      event: s
    };
    d[t ? "download" : "upload"] = !0, e(d);
  };
}
const Oo = typeof XMLHttpRequest < "u", Po = Oo && function(e) {
  return new Promise(function(t, n) {
    let r = e.data;
    const s = P.from(e.headers).normalize(), o = e.responseType;
    let a;
    function l() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    u.isFormData(r) && (g.isStandardBrowserEnv || g.isStandardBrowserWebWorkerEnv ? s.setContentType(!1) : s.setContentType("multipart/form-data;", !1));
    let f = new XMLHttpRequest();
    if (e.auth) {
      const S = e.auth.username || "", k = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(S + ":" + k));
    }
    const p = Ve(e.baseURL, e.url);
    f.open(e.method.toUpperCase(), ve(p, e.params, e.paramsSerializer), !0), f.timeout = e.timeout;
    function d() {
      if (!f)
        return;
      const S = P.from(
        "getAllResponseHeaders" in f && f.getAllResponseHeaders()
      ), k = {
        data: !o || o === "text" || o === "json" ? f.responseText : f.response,
        status: f.status,
        statusText: f.statusText,
        headers: S,
        config: e,
        request: f
      };
      So(function(O) {
        t(O), l();
      }, function(O) {
        n(O), l();
      }, k), f = null;
    }
    if ("onloadend" in f ? f.onloadend = d : f.onreadystatechange = function() {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, f.onabort = function() {
      f && (n(new y("Request aborted", y.ECONNABORTED, e, f)), f = null);
    }, f.onerror = function() {
      n(new y("Network Error", y.ERR_NETWORK, e, f)), f = null;
    }, f.ontimeout = function() {
      let S = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const k = e.transitional || ze;
      e.timeoutErrorMessage && (S = e.timeoutErrorMessage), n(new y(
        S,
        k.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
        e,
        f
      )), f = null;
    }, g.isStandardBrowserEnv) {
      const S = (e.withCredentials || go(p)) && e.xsrfCookieName && wo.read(e.xsrfCookieName);
      S && s.set(e.xsrfHeaderName, S);
    }
    r === void 0 && s.setContentType(null), "setRequestHeader" in f && u.forEach(s.toJSON(), function(S, k) {
      f.setRequestHeader(k, S);
    }), u.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials), o && o !== "json" && (f.responseType = e.responseType), typeof e.onDownloadProgress == "function" && f.addEventListener("progress", Se(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", Se(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (S) => {
      f && (n(!S || S.type ? new U(null, e, f) : S), f.abort(), f = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const _ = Ro(p);
    if (_ && g.protocols.indexOf(_) === -1) {
      n(new y("Unsupported protocol " + _ + ":", y.ERR_BAD_REQUEST, e));
      return;
    }
    f.send(r || null);
  });
}, j = {
  http: Xt,
  xhr: Po
};
u.forEach(j, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ke = {
  getAdapter: (e) => {
    e = u.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (let s = 0; s < t && (n = e[s], !(r = u.isString(n) ? j[n.toLowerCase()] : n)); s++)
      ;
    if (!r)
      throw r === !1 ? new y(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        u.hasOwnProp(j, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!u.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: j
};
function Q(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new U(null, e);
}
function we(e) {
  return Q(e), e.headers = P.from(e.headers), e.data = G.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ke.getAdapter(e.adapter || ce.adapter)(e).then(function(t) {
    return Q(e), t.data = G.call(
      e,
      e.transformResponse,
      t
    ), t.headers = P.from(t.headers), t;
  }, function(t) {
    return Je(t) || (Q(e), t && t.response && (t.response.data = G.call(
      e,
      e.transformResponse,
      t.response
    ), t.response.headers = P.from(t.response.headers))), Promise.reject(t);
  });
}
const Ee = (e) => e instanceof P ? e.toJSON() : e;
function D(e, t) {
  t = t || {};
  const n = {};
  function r(p, d, _) {
    return u.isPlainObject(p) && u.isPlainObject(d) ? u.merge.call({ caseless: _ }, p, d) : u.isPlainObject(d) ? u.merge({}, d) : u.isArray(d) ? d.slice() : d;
  }
  function s(p, d, _) {
    if (u.isUndefined(d)) {
      if (!u.isUndefined(p))
        return r(void 0, p, _);
    } else
      return r(p, d, _);
  }
  function o(p, d) {
    if (!u.isUndefined(d))
      return r(void 0, d);
  }
  function a(p, d) {
    if (u.isUndefined(d)) {
      if (!u.isUndefined(p))
        return r(void 0, p);
    } else
      return r(void 0, d);
  }
  function l(p, d, _) {
    if (_ in t)
      return r(p, d);
    if (_ in e)
      return r(void 0, p);
  }
  const f = {
    url: o,
    method: o,
    data: o,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: l,
    headers: (p, d) => s(Ee(p), Ee(d), !0)
  };
  return u.forEach(Object.keys(Object.assign({}, e, t)), function(p) {
    const d = f[p] || s, _ = d(e[p], t[p], p);
    u.isUndefined(_) && d !== l || (n[p] = _);
  }), n;
}
const Ge = "1.5.0", pe$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  pe$1[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const ke = {};
pe$1.transitional = function(e, t, n) {
  function r(s, o) {
    return "[Axios v" + Ge + "] Transitional option '" + s + "'" + o + (n ? ". " + n : "");
  }
  return (s, o, a) => {
    if (e === !1)
      throw new y(
        r(o, " has been removed" + (t ? " in " + t : "")),
        y.ERR_DEPRECATED
      );
    return t && !ke[o] && (ke[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(s, o, a) : !0;
  };
};
function Co(e, t, n) {
  if (typeof e != "object")
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], a = t[o];
    if (a) {
      const l = e[o], f = l === void 0 || a(l, o, e);
      if (f !== !0)
        throw new y("option " + o + " must be " + f, y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new y("Unknown option " + o, y.ERR_BAD_OPTION);
  }
}
const te = {
  assertOptions: Co,
  validators: pe$1
}, C = te.validators;
let H = class {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new be(),
      response: new be()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = D(this.defaults, t);
    const { transitional: n, paramsSerializer: r, headers: s } = t;
    n !== void 0 && te.assertOptions(n, {
      silentJSONParsing: C.transitional(C.boolean),
      forcedJSONParsing: C.transitional(C.boolean),
      clarifyTimeoutError: C.transitional(C.boolean)
    }, !1), r != null && (u.isFunction(r) ? t.paramsSerializer = {
      serialize: r
    } : te.assertOptions(r, {
      encode: C.function,
      serialize: C.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let o = s && u.merge(
      s.common,
      s[t.method]
    );
    s && u.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (k) => {
        delete s[k];
      }
    ), t.headers = P.concat(o, s);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(k) {
      typeof k.runWhen == "function" && k.runWhen(t) === !1 || (l = l && k.synchronous, a.unshift(k.fulfilled, k.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(k) {
      f.push(k.fulfilled, k.rejected);
    });
    let p, d = 0, _;
    if (!l) {
      const k = [we.bind(this), void 0];
      for (k.unshift.apply(k, a), k.push.apply(k, f), _ = k.length, p = Promise.resolve(t); d < _; )
        p = p.then(k[d++], k[d++]);
      return p;
    }
    _ = a.length;
    let S = t;
    for (d = 0; d < _; ) {
      const k = a[d++], O = a[d++];
      try {
        S = k(S);
      } catch (rt) {
        O.call(this, rt);
        break;
      }
    }
    try {
      p = we.call(this, S);
    } catch (k) {
      return Promise.reject(k);
    }
    for (d = 0, _ = f.length; d < _; )
      p = p.then(f[d++], f[d++]);
    return p;
  }
  getUri(e) {
    e = D(this.defaults, e);
    const t = Ve(e.baseURL, e.url);
    return ve(t, e.params, e.paramsSerializer);
  }
};
u.forEach(["delete", "get", "head", "options"], function(e) {
  H.prototype[e] = function(t, n) {
    return this.request(D(n || {}, {
      method: e,
      url: t,
      data: (n || {}).data
    }));
  };
});
u.forEach(["post", "put", "patch"], function(e) {
  function t(n) {
    return function(r, s, o) {
      return this.request(D(o || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: s
      }));
    };
  }
  H.prototype[e] = t(), H.prototype[e + "Form"] = t(!0);
});
const M = H;
let To = class Ln {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners)
        return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const a = new Promise((l) => {
        r.subscribe(l), o = l;
      }).then(s);
      return a.cancel = function() {
        r.unsubscribe(o);
      }, a;
    }, t(function(s, o, a) {
      r.reason || (r.reason = new U(s, o, a), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ln(function(n) {
        t = n;
      }),
      cancel: t
    };
  }
};
const No = To;
function Do(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Bo(e) {
  return u.isObject(e) && e.isAxiosError === !0;
}
const oe = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(oe).forEach(([e, t]) => {
  oe[t] = e;
});
const xo = oe;
function Xe(e) {
  const t = new M(e), n = Be(M.prototype.request, t);
  return u.extend(n, M.prototype, t, { allOwnKeys: !0 }), u.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Xe(D(e, r));
  }, n;
}
const w = Xe(ce);
w.Axios = M;
w.CanceledError = U;
w.CancelToken = No;
w.isCancel = Je;
w.VERSION = Ge;
w.toFormData = W;
w.AxiosError = y;
w.Cancel = w.CanceledError;
w.all = function(e) {
  return Promise.all(e);
};
w.spread = Do;
w.isAxiosError = Bo;
w.mergeConfig = D;
w.AxiosHeaders = P;
w.formToJSON = (e) => We(u.isHTMLForm(e) ? new FormData(e) : e);
w.getAdapter = Ke.getAdapter;
w.HttpStatusCode = xo;
w.default = w;
const Ye = w, {
  Axios: Br,
  AxiosError: xr,
  CanceledError: qr,
  isCancel: Fr,
  CancelToken: Ur,
  VERSION: _r,
  all: Lr,
  Cancel: Ir,
  isAxiosError: jr,
  spread: Mr,
  toFormData: Hr,
  AxiosHeaders: $r,
  HttpStatusCode: qo,
  formToJSON: vr,
  getAdapter: zr,
  mergeConfig: Wr
} = Ye, Fo = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Uo = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, _o = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Lo(e, t) {
  if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
    Io(e);
    return;
  }
  return t;
}
function Io(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function jo(e, t = {}) {
  if (typeof e != "string")
    return e;
  const n = e.trim();
  if (e[0] === '"' && e[e.length - 1] === '"')
    return n.slice(1, -1);
  if (n.length <= 9) {
    const r = n.toLowerCase();
    if (r === "true")
      return !0;
    if (r === "false")
      return !1;
    if (r === "undefined")
      return;
    if (r === "null")
      return null;
    if (r === "nan")
      return Number.NaN;
    if (r === "infinity")
      return Number.POSITIVE_INFINITY;
    if (r === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!_o.test(e)) {
    if (t.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (Fo.test(e) || Uo.test(e)) {
      if (t.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, Lo);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict)
      throw r;
    return e;
  }
}
const Mo = /#/g, Ho = /&/g, $o = /=/g, ue = /\+/g, vo = /%5e/gi, zo = /%60/gi, Wo = /%7c/gi, Jo = /%20/gi;
function Vo(e) {
  return encodeURI("" + e).replace(Wo, "|");
}
function re(e) {
  return Vo(typeof e == "string" ? e : JSON.stringify(e)).replace(ue, "%2B").replace(Jo, "+").replace(Mo, "%23").replace(Ho, "%26").replace(zo, "`").replace(vo, "^");
}
function X(e) {
  return re(e).replace($o, "%3D");
}
function Ze(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function Ko(e) {
  return Ze(e.replace(ue, " "));
}
function Go(e) {
  return Ze(e.replace(ue, " "));
}
function Qo(e = "") {
  const t = {};
  e[0] === "?" && (e = e.slice(1));
  for (const n of e.split("&")) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2)
      continue;
    const s = Ko(r[1]);
    if (s === "__proto__" || s === "constructor")
      continue;
    const o = Go(r[2] || "");
    t[s] === void 0 ? t[s] = o : Array.isArray(t[s]) ? t[s].push(o) : t[s] = [t[s], o];
  }
  return t;
}
function Xo(e, t) {
  return (typeof t == "number" || typeof t == "boolean") && (t = String(t)), t ? Array.isArray(t) ? t.map((n) => `${X(e)}=${re(n)}`).join("&") : `${X(e)}=${re(t)}` : X(e);
}
function Yo(e) {
  return Object.keys(e).filter((t) => e[t] !== void 0).map((t) => Xo(t, e[t])).filter(Boolean).join("&");
}
const Zo = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, er = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, tr = /^([/\\]\s*){2,}[^/\\]/;
function et(e, t = {}) {
  return typeof t == "boolean" && (t = { acceptRelative: t }), t.strict ? Zo.test(e) : er.test(e) || (t.acceptRelative ? tr.test(e) : !1);
}
const or = /\/$|\/\?/;
function ne(e = "", t = !1) {
  return t ? or.test(e) : e.endsWith("/");
}
function rr(e = "", t = !1) {
  if (!t)
    return (ne(e) ? e.slice(0, -1) : e) || "/";
  if (!ne(e, !0))
    return e || "/";
  const [n, ...r] = e.split("?");
  return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "");
}
function nr(e = "", t = !1) {
  if (!t)
    return e.endsWith("/") ? e : e + "/";
  if (ne(e, !0))
    return e || "/";
  const [n, ...r] = e.split("?");
  return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "");
}
function sr(e, t) {
  if (ir(t) || et(e))
    return e;
  const n = rr(t);
  return e.startsWith(n) ? e : ur(n, e);
}
function ar(e, t) {
  const n = tt(e), r = { ...Qo(n.search), ...t };
  return n.search = Yo(r), lr(n);
}
function ir(e) {
  return !e || e === "/";
}
function cr(e) {
  return e && e !== "/";
}
const pr = /^\.?\//;
function ur(e, ...t) {
  let n = e || "";
  for (const r of t.filter((s) => cr(s)))
    if (n) {
      const s = r.replace(pr, "");
      n = nr(n) + s;
    } else
      n = r;
  return n;
}
function tt(e = "", t) {
  const n = e.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/
  );
  if (n) {
    const [, _, S = ""] = n;
    return {
      protocol: _,
      pathname: S,
      href: _ + S,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!et(e, { acceptRelative: !0 }))
    return t ? tt(t + e) : ge(e);
  const [, r = "", s, o = ""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, a = "", l = ""] = o.match(/([^#/?]*)(.*)?/) || [], { pathname: f, search: p, hash: d } = ge(
    l.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: r,
    auth: s ? s.slice(0, Math.max(0, s.length - 1)) : "",
    host: a,
    pathname: f,
    search: p,
    hash: d
  };
}
function ge(e = "") {
  const [t = "", n = "", r = ""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: t,
    search: n,
    hash: r
  };
}
function lr(e) {
  const t = e.pathname || "", n = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "", r = e.hash || "", s = e.auth ? e.auth + "@" : "", o = e.host || "";
  return (e.protocol ? e.protocol + "//" : "") + s + o + t + n + r;
}
class hr extends Error {
  constructor(t, n) {
    super(t, n), this.name = "FetchError", n != null && n.cause && !this.cause && (this.cause = n.cause);
  }
}
function dr(e) {
  var t, n, r, s, o;
  const a = ((t = e.error) == null ? void 0 : t.message) || ((n = e.error) == null ? void 0 : n.toString()) || "", l = ((r = e.request) == null ? void 0 : r.method) || ((s = e.options) == null ? void 0 : s.method) || "GET", f = ((o = e.request) == null ? void 0 : o.url) || String(e.request) || "/", p = `[${l}] ${JSON.stringify(f)}`, d = e.response ? `${e.response.status} ${e.response.statusText}` : "<no response>", _ = `${p}: ${d}${a ? ` ${a}` : ""}`, S = new hr(
    _,
    e.error ? { cause: e.error } : void 0
  );
  for (const k of ["request", "options", "response"])
    Object.defineProperty(S, k, {
      get() {
        return e[k];
      }
    });
  for (const [k, O] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(S, k, {
      get() {
        return e.response && e.response[O];
      }
    });
  return S;
}
const fr = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Re(e = "GET") {
  return fr.has(e.toUpperCase());
}
function mr(e) {
  if (e === void 0)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.buffer ? !1 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function";
}
const br = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), yr = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Sr(e = "") {
  if (!e)
    return "json";
  const t = e.split(";").shift() || "";
  return yr.test(t) ? "json" : br.has(t) || t.startsWith("text/") ? "text" : "blob";
}
function wr(e, t, n = globalThis.Headers) {
  const r = {
    ...t,
    ...e
  };
  if (t != null && t.params && e != null && e.params && (r.params = {
    ...t == null ? void 0 : t.params,
    ...e == null ? void 0 : e.params
  }), t != null && t.query && e != null && e.query && (r.query = {
    ...t == null ? void 0 : t.query,
    ...e == null ? void 0 : e.query
  }), t != null && t.headers && e != null && e.headers) {
    r.headers = new n((t == null ? void 0 : t.headers) || {});
    for (const [s, o] of new n((e == null ? void 0 : e.headers) || {}))
      r.headers.set(s, o);
  }
  return r;
}
const Er = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]), kr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function ot(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: n = globalThis.Headers,
    AbortController: r = globalThis.AbortController
  } = e;
  async function s(l) {
    const f = l.error && l.error.name === "AbortError" && !l.options.timeout || !1;
    if (l.options.retry !== !1 && !f) {
      let d;
      typeof l.options.retry == "number" ? d = l.options.retry : d = Re(l.options.method) ? 0 : 1;
      const _ = l.response && l.response.status || 500;
      if (d > 0 && (Array.isArray(l.options.retryStatusCodes) ? l.options.retryStatusCodes.includes(_) : Er.has(_))) {
        const S = l.options.retryDelay || 0;
        return S > 0 && await new Promise((k) => setTimeout(k, S)), o(l.request, {
          ...l.options,
          retry: d - 1,
          timeout: l.options.timeout
        });
      }
    }
    const p = dr(l);
    throw Error.captureStackTrace && Error.captureStackTrace(p, o), p;
  }
  const o = async function(l, f = {}) {
    var p;
    const d = {
      request: l,
      options: wr(f, e.defaults, n),
      response: void 0,
      error: void 0
    };
    if (d.options.method = (p = d.options.method) == null ? void 0 : p.toUpperCase(), d.options.onRequest && await d.options.onRequest(d), typeof d.request == "string" && (d.options.baseURL && (d.request = sr(d.request, d.options.baseURL)), (d.options.query || d.options.params) && (d.request = ar(d.request, {
      ...d.options.params,
      ...d.options.query
    }))), d.options.body && Re(d.options.method) && (mr(d.options.body) ? (d.options.body = typeof d.options.body == "string" ? d.options.body : JSON.stringify(d.options.body), d.options.headers = new n(d.options.headers || {}), d.options.headers.has("content-type") || d.options.headers.set("content-type", "application/json"), d.options.headers.has("accept") || d.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in d.options.body && typeof d.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof d.options.body.pipe == "function") && ("duplex" in d.options || (d.options.duplex = "half"))
    )), !d.options.signal && d.options.timeout) {
      const _ = new r();
      setTimeout(() => _.abort(), d.options.timeout), d.options.signal = _.signal;
    }
    try {
      d.response = await t(
        d.request,
        d.options
      );
    } catch (_) {
      return d.error = _, d.options.onRequestError && await d.options.onRequestError(d), await s(d);
    }
    if (d.response.body && !kr.has(d.response.status) && d.options.method !== "HEAD") {
      const _ = (d.options.parseResponse ? "json" : d.options.responseType) || Sr(d.response.headers.get("content-type") || "");
      switch (_) {
        case "json": {
          const S = await d.response.text(), k = d.options.parseResponse || jo;
          d.response._data = k(S);
          break;
        }
        case "stream": {
          d.response._data = d.response.body;
          break;
        }
        default:
          d.response._data = await d.response[_]();
      }
    }
    return d.options.onResponse && await d.options.onResponse(d), !d.options.ignoreResponseError && d.response.status >= 400 && d.response.status < 600 ? (d.options.onResponseError && await d.options.onResponseError(d), await s(d)) : d.response;
  }, a = async function(l, f) {
    return (await o(l, f))._data;
  };
  return a.raw = o, a.native = (...l) => t(...l), a.create = (l = {}) => ot({
    ...e,
    defaults: {
      ...e.defaults,
      ...l
    }
  }), a;
}
const le = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), gr = le.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), Rr = le.Headers, Ar = le.AbortController, Or = ot({ fetch: gr, Headers: Rr, AbortController: Ar });
var N = null;
typeof WebSocket < "u" ? N = WebSocket : typeof MozWebSocket < "u" ? N = MozWebSocket : typeof global < "u" ? N = global.WebSocket || global.MozWebSocket : typeof window < "u" ? N = window.WebSocket || window.MozWebSocket : typeof self < "u" && (N = self.WebSocket || self.MozWebSocket);
const Pr = N, Y = {
  SCHEMA_DIR_RELATIVE_PATH: "./../schemas/",
  // JSON Schema 相对于 node 的目录的路径
  SCHEMA_FILENAME_PAYLOAD: "payload.schema.json",
  // JSON Schema 的 payload 文件名
  SCHEMA_FILENAME_RESPONSE: "response.schema.json",
  // JSON Schema 的 response 文件名
  SIYUAN_DEFAULT_BASE_URL: "http://localhost:6806/",
  // 思源内核服务的默认 baseURL
  SIYUAN_DEFAULT_TOKEN: "",
  // 思源内核服务的默认 token
  REQUEST_TIMEOUT: 6e4
  // 请求超时时间 (单位: ms)
};
class Cr extends Error {
  constructor(t) {
    super(t.statusText), R(this, "status"), this.response = t, this.status = t.status;
  }
}
class Ae extends Error {
  constructor(t, n) {
    super(t.msg), R(this, "code"), this.body = t, this.response = n, this.code = t.code;
  }
}
var Pe, Ce, Te, Ne, De;
const c = class tn {
  constructor(t = {}, n = "xhr") {
    R(this, "_type", "xhr"), R(this, "_baseURL", ((Ce = (Pe = globalThis.top) == null ? void 0 : Pe.document) == null ? void 0 : Ce.baseURI) ?? ((Ne = (Te = globalThis.parent) == null ? void 0 : Te.document) == null ? void 0 : Ne.baseURI) ?? ((De = globalThis.location) == null ? void 0 : De.origin) ?? Y.SIYUAN_DEFAULT_BASE_URL), R(this, "_token", Y.SIYUAN_DEFAULT_TOKEN), R(this, "_axios", Ye.create({
      baseURL: this._baseURL,
      timeout: Y.REQUEST_TIMEOUT,
      headers: {
        Authorization: `Token ${this._token}`
      }
    })), R(this, "_fetch", Or.create({
      baseURL: this._baseURL,
      headers: {
        Authorization: `Token ${this._token}`
      }
    })), this._setClientType(n), this._updateOptions(t, n);
  }
  /* 设置默认使用的客户端类型 */
  _setClientType(t) {
    this._type = t;
  }
  _updateOptions(t, n = this._type) {
    switch (this._token = t.token ?? this._token, this._baseURL = t.baseURL ?? this._baseURL, n) {
      case "fetch":
        const r = t;
        if (r.token) {
          const s = "Authorization", o = `Token ${t.token}`;
          Array.isArray(r.headers) ? r.headers.push([
            s,
            o
          ]) : r.headers instanceof Headers ? r.headers.set(
            s,
            o
          ) : typeof r.headers == "object" ? r.headers[s] = o : r.headers = {
            [s]: o
          }, delete t.token;
        }
        this._fetch = this._fetch.create(r);
        break;
      case "xhr":
      default:
        for (const [s, o] of Object.entries(t))
          switch (s) {
            case "token":
              this._axios.defaults.headers.Authorization = `Token ${this._token}`;
              break;
            default:
              this._axios.defaults[s] = o;
              break;
          }
        break;
    }
    this._baseURL = t.baseURL ?? this._baseURL;
  }
  /* 👇 WebSocket 👇 */
  /* 消息广播 */
  broadcast(t, n, r) {
    const s = (r == null ? void 0 : r.baseURL) ?? this._baseURL, o = (r == null ? void 0 : r.token) ?? this._token, a = new URLSearchParams(t);
    a.set("token", o);
    const l = new URL(s);
    return l.protocol = l.protocol.replace(/^http/, "ws"), l.pathname = l.pathname.endsWith("/") ? `${l.pathname}${tn.ws.broadcast.pathname.substring(1)}` : `${l.pathname}${tn.ws.broadcast.pathname}`, l.search = a.toString(), new Pr(l, n);
  }
  /* 全局搜索 */
  async fullTextSearchBlock(t, n) {
    return await this._request(
      tn.api.search.fullTextSearchBlock.pathname,
      tn.api.search.fullTextSearchBlock.method,
      t,
      n
    );
  }
  /* 获得配置 */
  async getConf(t) {
    return await this._request(
      tn.api.system.getConf.pathname,
      tn.api.system.getConf.method,
      void 0,
      t
    );
  }
  /* 👇 由 JSON Schema 生成的类型定义👇 */
  /* 上传资源文件 */
  async upload(t, n) {
    const r = new FormData();
    return r.append("assetsDirPath", t.assetsDirPath ?? "/assets/"), t.files.forEach((s) => r.append("file[]", s)), await this._request(
      tn.api.asset.upload.pathname,
      tn.api.asset.upload.method,
      r,
      n
    );
  }
  /* 获取块属性 */
  async getBlockAttrs(t, n) {
    return await this._request(
      tn.api.attr.getBlockAttrs.pathname,
      tn.api.attr.getBlockAttrs.method,
      t,
      n
    );
  }
  /* 获取所有书签 */
  async getBookmarkLabels(t) {
    return await this._request(
      tn.api.attr.getBookmarkLabels.pathname,
      tn.api.attr.getBookmarkLabels.method,
      void 0,
      t
    );
  }
  /* 设置块属性 */
  async setBlockAttrs(t, n) {
    return await this._request(
      tn.api.attr.setBlockAttrs.pathname,
      tn.api.attr.setBlockAttrs.method,
      t,
      n
    );
  }
  /* 在下级块尾部插入块 */
  async appendBlock(t, n) {
    return await this._request(
      tn.api.block.appendBlock.pathname,
      tn.api.block.appendBlock.method,
      t,
      n
    );
  }
  /* 删除块 */
  async deleteBlock(t, n) {
    return await this._request(
      tn.api.block.deleteBlock.pathname,
      tn.api.block.deleteBlock.method,
      t,
      n
    );
  }
  /* 获得块面包屑 */
  async getBlockBreadcrumb(t, n) {
    return await this._request(
      tn.api.block.getBlockBreadcrumb.pathname,
      tn.api.block.getBlockBreadcrumb.method,
      t,
      n
    );
  }
  /* 获得块的 DOM */
  async getBlockDOM(t, n) {
    return await this._request(
      tn.api.block.getBlockDOM.pathname,
      tn.api.block.getBlockDOM.method,
      t,
      n
    );
  }
  /* 获得块所在文档的信息 */
  async getBlockInfo(t, n) {
    return await this._request(
      tn.api.block.getBlockInfo.pathname,
      tn.api.block.getBlockInfo.method,
      t,
      n
    );
  }
  /* 获得块的 kramdown 源码 */
  async getBlockKramdown(t, n) {
    return await this._request(
      tn.api.block.getBlockKramdown.pathname,
      tn.api.block.getBlockKramdown.method,
      t,
      n
    );
  }
  /* 获得指定块的所有下级块 */
  async getChildBlocks(t, n) {
    return await this._request(
      tn.api.block.getChildBlocks.pathname,
      tn.api.block.getChildBlocks.method,
      t,
      n
    );
  }
  /* 获得指定块所在文档信息 */
  async getDocInfo(t, n) {
    return await this._request(
      tn.api.block.getDocInfo.pathname,
      tn.api.block.getDocInfo.method,
      t,
      n
    );
  }
  /* 插入块 */
  async insertBlock(t, n) {
    return await this._request(
      tn.api.block.insertBlock.pathname,
      tn.api.block.insertBlock.method,
      t,
      n
    );
  }
  /* 移动块 */
  async moveBlock(t, n) {
    return await this._request(
      tn.api.block.moveBlock.pathname,
      tn.api.block.moveBlock.method,
      t,
      n
    );
  }
  /* 在下级块首部插入块 */
  async prependBlock(t, n) {
    return await this._request(
      tn.api.block.prependBlock.pathname,
      tn.api.block.prependBlock.method,
      t,
      n
    );
  }
  /* 转移块引用 */
  async transferBlockRef(t, n) {
    return await this._request(
      tn.api.block.transferBlockRef.pathname,
      tn.api.block.transferBlockRef.method,
      t,
      n
    );
  }
  /* 更新块 */
  async updateBlock(t, n) {
    return await this._request(
      tn.api.block.updateBlock.pathname,
      tn.api.block.updateBlock.method,
      t,
      n
    );
  }
  /* 获取所有广播频道信息 */
  async channels(t) {
    return await this._request(
      tn.api.broadcast.channels.pathname,
      tn.api.broadcast.channels.method,
      void 0,
      t
    );
  }
  /* 获取指定广播频道的信息 */
  async getChannelInfo(t, n) {
    return await this._request(
      tn.api.broadcast.getChannelInfo.pathname,
      tn.api.broadcast.getChannelInfo.method,
      t,
      n
    );
  }
  /* 推送广播消息 */
  async postMessage(t, n) {
    return await this._request(
      tn.api.broadcast.postMessage.pathname,
      tn.api.broadcast.postMessage.method,
      t,
      n
    );
  }
  /* 调用 pandoc 转换转换文件 */
  async pandoc(t, n) {
    return await this._request(
      tn.api.convert.pandoc.pathname,
      tn.api.convert.pandoc.method,
      t,
      n
    );
  }
  /* 打包文件与文件夹以导出 */
  async exportResources(t, n) {
    return await this._request(
      tn.api.export.exportResources.pathname,
      tn.api.export.exportResources.method,
      t,
      n
    );
  }
  /* 导出指定文档块为 Markdown */
  async exportMdContent(t, n) {
    return await this._request(
      tn.api.export.exportMdContent.pathname,
      tn.api.export.exportMdContent.method,
      t,
      n
    );
  }
  async getFile(t, n = "text", r) {
    return await this._request(
      tn.api.file.getFile.pathname,
      tn.api.file.getFile.method,
      t,
      r,
      !1,
      n
    );
  }
  /* 设置文件 */
  async putFile(t, n) {
    t.file !== void 0 && !(t.file instanceof File) && (t.file = new File(
      [t.file],
      t.path.split("/").pop()
    ));
    const r = new FormData();
    for (const [s, o] of Object.entries(t))
      t.hasOwnProperty(s) && (o instanceof Blob ? r.append(s, o) : r.append(s, String(o)));
    return await this._request(
      tn.api.file.putFile.pathname,
      tn.api.file.putFile.method,
      r,
      n
    );
  }
  /* 获取文件目录下级内容 */
  async readDir(t, n) {
    return await this._request(
      tn.api.file.readDir.pathname,
      tn.api.file.readDir.method,
      t,
      n
    );
  }
  /* 删除文件/目录 */
  async removeFile(t, n) {
    return await this._request(
      tn.api.file.removeFile.pathname,
      tn.api.file.removeFile.method,
      t,
      n
    );
  }
  /* 重命名/移动文件/目录 */
  async renameFile(t, n) {
    return await this._request(
      tn.api.file.renameFile.pathname,
      tn.api.file.renameFile.method,
      t,
      n
    );
  }
  /* 通过 Markdown 创建文档 */
  async createDocWithMd(t, n) {
    return await this._request(
      tn.api.filetree.createDocWithMd.pathname,
      tn.api.filetree.createDocWithMd.method,
      t,
      n
    );
  }
  /* 获取文档内容 */
  async getDoc(t, n) {
    return await this._request(
      tn.api.filetree.getDoc.pathname,
      tn.api.filetree.getDoc.method,
      t,
      n
    );
  }
  /* 根据 ID 获取人类可读路径 */
  async getHPathByID(t, n) {
    return await this._request(
      tn.api.filetree.getHPathByID.pathname,
      tn.api.filetree.getHPathByID.method,
      t,
      n
    );
  }
  /* 根据路径获取人类可读路径 */
  async getHPathByPath(t, n) {
    return await this._request(
      tn.api.filetree.getHPathByPath.pathname,
      tn.api.filetree.getHPathByPath.method,
      t,
      n
    );
  }
  /* 查询子文档 */
  async listDocsByPath(t, n) {
    return await this._request(
      tn.api.filetree.listDocsByPath.pathname,
      tn.api.filetree.listDocsByPath.method,
      t,
      n
    );
  }
  /* 批量移动文档 */
  async moveDocs(t, n) {
    return await this._request(
      tn.api.filetree.moveDocs.pathname,
      tn.api.filetree.moveDocs.method,
      t,
      n
    );
  }
  /* 删除文档 */
  async removeDoc(t, n) {
    return await this._request(
      tn.api.filetree.removeDoc.pathname,
      tn.api.filetree.removeDoc.method,
      t,
      n
    );
  }
  /* 文档重命名 */
  async renameDoc(t, n) {
    return await this._request(
      tn.api.filetree.renameDoc.pathname,
      tn.api.filetree.renameDoc.method,
      t,
      n
    );
  }
  /* 搜索文档 */
  async searchDocs(t, n) {
    return await this._request(
      tn.api.filetree.searchDocs.pathname,
      tn.api.filetree.searchDocs.method,
      t,
      n
    );
  }
  /* 获取历史文档内容 */
  async getDocHistoryContent(t, n) {
    return await this._request(
      tn.api.history.getDocHistoryContent.pathname,
      tn.api.history.getDocHistoryContent.method,
      t,
      n
    );
  }
  /* 查询历史项 */
  async getHistoryItems(t, n) {
    return await this._request(
      tn.api.history.getHistoryItems.pathname,
      tn.api.history.getHistoryItems.method,
      t,
      n
    );
  }
  /* 收集箱速记内容 */
  async getShorthand(t, n) {
    return await this._request(
      tn.api.inbox.getShorthand.pathname,
      tn.api.inbox.getShorthand.method,
      t,
      n
    );
  }
  /* 正向代理 */
  async forwardProxy(t, n) {
    return await this._request(
      tn.api.network.forwardProxy.pathname,
      tn.api.network.forwardProxy.method,
      t,
      n
    );
  }
  /* 关闭笔记本 */
  async closeNotebook(t, n) {
    return await this._request(
      tn.api.notebook.closeNotebook.pathname,
      tn.api.notebook.closeNotebook.method,
      t,
      n
    );
  }
  /* 创建笔记本 */
  async createNotebook(t, n) {
    return await this._request(
      tn.api.notebook.createNotebook.pathname,
      tn.api.notebook.createNotebook.method,
      t,
      n
    );
  }
  /* 获取笔记本配置信息 */
  async getNotebookConf(t, n) {
    return await this._request(
      tn.api.notebook.getNotebookConf.pathname,
      tn.api.notebook.getNotebookConf.method,
      t,
      n
    );
  }
  /* 列出笔记本信息 */
  async lsNotebooks(t) {
    return await this._request(
      tn.api.notebook.lsNotebooks.pathname,
      tn.api.notebook.lsNotebooks.method,
      void 0,
      t
    );
  }
  /* 打开笔记本 */
  async openNotebook(t, n) {
    return await this._request(
      tn.api.notebook.openNotebook.pathname,
      tn.api.notebook.openNotebook.method,
      t,
      n
    );
  }
  /* 删除笔记本 */
  async removeNotebook(t, n) {
    return await this._request(
      tn.api.notebook.removeNotebook.pathname,
      tn.api.notebook.removeNotebook.method,
      t,
      n
    );
  }
  /* 重命名笔记本 */
  async renameNotebook(t, n) {
    return await this._request(
      tn.api.notebook.renameNotebook.pathname,
      tn.api.notebook.renameNotebook.method,
      t,
      n
    );
  }
  /* 设置笔记本配置 */
  async setNotebookConf(t, n) {
    return await this._request(
      tn.api.notebook.setNotebookConf.pathname,
      tn.api.notebook.setNotebookConf.method,
      t,
      n
    );
  }
  /* 推送错误消息 */
  async pushErrMsg(t, n) {
    return await this._request(
      tn.api.notification.pushErrMsg.pathname,
      tn.api.notification.pushErrMsg.method,
      t,
      n
    );
  }
  /* 推送提示消息 */
  async pushMsg(t, n) {
    return await this._request(
      tn.api.notification.pushMsg.pathname,
      tn.api.notification.pushMsg.method,
      t,
      n
    );
  }
  /* SQL 查询 */
  async sql(t, n) {
    return await this._request(
      tn.api.query.sql.pathname,
      tn.api.query.sql.method,
      t,
      n
    );
  }
  /* 读取快照文件内容 */
  async openRepoSnapshotDoc(t, n) {
    return await this._request(
      tn.api.repo.openRepoSnapshotDoc.pathname,
      tn.api.repo.openRepoSnapshotDoc.method,
      t,
      n
    );
  }
  /* 获取代码片段 */
  async getSnippet(t, n) {
    return await this._request(
      tn.api.snippet.getSnippet.pathname,
      tn.api.snippet.getSnippet.method,
      t,
      n
    );
  }
  /* 设置代码片段 */
  async setSnippet(t, n) {
    return await this._request(
      tn.api.snippet.setSnippet.pathname,
      tn.api.snippet.setSnippet.method,
      t,
      n
    );
  }
  /* 查询最近打开的文档 */
  async getRecentDocs(t) {
    return await this._request(
      tn.api.storage.getRecentDocs.pathname,
      tn.api.storage.getRecentDocs.method,
      void 0,
      t
    );
  }
  /* 获取内核启动进度 */
  async bootProgress(t) {
    return await this._request(
      tn.api.system.bootProgress.pathname,
      tn.api.system.bootProgress.method,
      void 0,
      t
    );
  }
  /* 获得内核 Unix 时间戳 (单位: ms) */
  async currentTime(t) {
    return await this._request(
      tn.api.system.currentTime.pathname,
      tn.api.system.currentTime.method,
      void 0,
      t
    );
  }
  /* 获得内核版本 */
  async version(t) {
    return await this._request(
      tn.api.system.version.pathname,
      tn.api.system.version.method,
      void 0,
      t
    );
  }
  /* 渲染 kramdown 模板文件 */
  async render(t, n) {
    return await this._request(
      tn.api.template.render.pathname,
      tn.api.template.render.method,
      t,
      n
    );
  }
  /* 渲染 Sprig 模板 */
  async renderSprig(t, n) {
    return await this._request(
      tn.api.template.renderSprig.pathname,
      tn.api.template.renderSprig.method,
      t,
      n
    );
  }
  async _request(t, n, r, s, o = !0, a = "json") {
    try {
      switch ((s == null ? void 0 : s.type) ?? this._type) {
        case "fetch": {
          const l = s == null ? void 0 : s.options;
          a = (() => {
            switch (a) {
              case "arraybuffer":
                return "arrayBuffer";
              case "document":
                return "text";
              default:
                return a;
            }
          })();
          const f = await this._fetch(
            t,
            {
              method: n,
              body: r,
              responseType: a,
              ...l
            }
          );
          return o && a === "json" && typeof f == "object" ? this._parseFetchResponse(f) : f;
        }
        case "xhr":
        default: {
          const l = s == null ? void 0 : s.options;
          a = (() => {
            switch (a) {
              case "arrayBuffer":
                return "arraybuffer";
              default:
                return a;
            }
          })();
          const f = await this._axios.request({
            url: t,
            method: n,
            data: r,
            responseType: a,
            ...l
          });
          if (f.status === qo.Ok)
            return o && a === "json" && typeof f.data == "object" ? this._parseAxiosResponse(f) : f.data;
          throw new Cr(f);
        }
      }
    } catch (l) {
      throw l;
    }
  }
  /**
   * 解析内核响应
   */
  _parseFetchResponse(t) {
    if (t.code === 0)
      return t;
    throw new Ae(t);
  }
  /**
   * 解析内核响应
   */
  _parseAxiosResponse(t) {
    if (t.data.code === 0)
      return t.data;
    throw new Ae(t.data, t);
  }
};
R(c, "ws", {
  broadcast: { pathname: "/ws/broadcast" }
}), R(c, "api", {
  // TODO: refactor
  search: {
    fullTextSearchBlock: { pathname: "/api/search/fullTextSearchBlock", method: "POST" }
  },
  asset: {
    upload: { pathname: "/api/asset/upload", method: "POST" }
  },
  attr: {
    getBlockAttrs: { pathname: "/api/attr/getBlockAttrs", method: "POST" },
    setBlockAttrs: { pathname: "/api/attr/setBlockAttrs", method: "POST" },
    getBookmarkLabels: { pathname: "/api/attr/getBookmarkLabels", method: "POST" }
  },
  block: {
    appendBlock: { pathname: "/api/block/appendBlock", method: "POST" },
    deleteBlock: { pathname: "/api/block/deleteBlock", method: "POST" },
    getBlockBreadcrumb: { pathname: "/api/block/getBlockBreadcrumb", method: "POST" },
    getBlockDOM: { pathname: "/api/block/getBlockDOM", method: "POST" },
    getBlockInfo: { pathname: "/api/block/getBlockInfo", method: "POST" },
    getBlockKramdown: { pathname: "/api/block/getBlockKramdown", method: "POST" },
    getChildBlocks: { pathname: "/api/block/getChildBlocks", method: "POST" },
    getDocInfo: { pathname: "/api/block/getDocInfo", method: "POST" },
    insertBlock: { pathname: "/api/block/insertBlock", method: "POST" },
    moveBlock: { pathname: "/api/block/moveBlock", method: "POST" },
    prependBlock: { pathname: "/api/block/prependBlock", method: "POST" },
    transferBlockRef: { pathname: "/api/block/transferBlockRef", method: "POST" },
    updateBlock: { pathname: "/api/block/updateBlock", method: "POST" }
  },
  broadcast: {
    channels: { pathname: "/api/broadcast/channels", method: "GET" },
    getChannelInfo: { pathname: "/api/broadcast/getChannelInfo", method: "POST" },
    postMessage: { pathname: "/api/broadcast/postMessage", method: "POST" }
  },
  convert: {
    pandoc: { pathname: "/api/convert/pandoc", method: "POST" }
  },
  export: {
    exportMdContent: { pathname: "/api/export/exportMdContent", method: "POST" },
    exportResources: { pathname: "/api/export/exportResources", method: "POST" }
  },
  file: {
    getFile: { pathname: "/api/file/getFile", method: "POST" },
    putFile: { pathname: "/api/file/putFile", method: "POST" },
    readDir: { pathname: "/api/file/readDir", method: "POST" },
    removeFile: { pathname: "/api/file/removeFile", method: "POST" },
    renameFile: { pathname: "/api/file/renameFile", method: "POST" }
  },
  filetree: {
    createDocWithMd: { pathname: "/api/filetree/createDocWithMd", method: "POST" },
    getDoc: { pathname: "/api/filetree/getDoc", method: "POST" },
    getHPathByID: { pathname: "/api/filetree/getHPathByID", method: "POST" },
    getHPathByPath: { pathname: "/api/filetree/getHPathByPath", method: "POST" },
    listDocsByPath: { pathname: "/api/filetree/listDocsByPath", method: "POST" },
    moveDocs: { pathname: "/api/filetree/moveDocs", method: "POST" },
    removeDoc: { pathname: "/api/filetree/removeDoc", method: "POST" },
    renameDoc: { pathname: "/api/filetree/renameDoc", method: "POST" },
    searchDocs: { pathname: "/api/filetree/searchDocs", method: "POST" }
  },
  history: {
    getDocHistoryContent: { pathname: "/api/history/getDocHistoryContent", method: "POST" },
    getHistoryItems: { pathname: "/api/history/getHistoryItems", method: "POST" }
  },
  inbox: {
    getShorthand: { pathname: "/api/inbox/getShorthand", method: "POST" }
  },
  network: {
    forwardProxy: { pathname: "/api/network/forwardProxy", method: "POST" }
  },
  notebook: {
    closeNotebook: { pathname: "/api/notebook/closeNotebook", method: "POST" },
    createNotebook: { pathname: "/api/notebook/createNotebook", method: "POST" },
    lsNotebooks: { pathname: "/api/notebook/lsNotebooks", method: "POST" },
    getNotebookConf: { pathname: "/api/notebook/getNotebookConf", method: "POST" },
    openNotebook: { pathname: "/api/notebook/openNotebook", method: "POST" },
    removeNotebook: { pathname: "/api/notebook/removeNotebook", method: "POST" },
    renameNotebook: { pathname: "/api/notebook/renameNotebook", method: "POST" },
    setNotebookConf: { pathname: "/api/notebook/setNotebookConf", method: "POST" }
  },
  notification: {
    pushErrMsg: { pathname: "/api/notification/pushErrMsg", method: "POST" },
    pushMsg: { pathname: "/api/notification/pushMsg", method: "POST" }
  },
  query: {
    sql: { pathname: "/api/query/sql", method: "POST" }
  },
  repo: {
    openRepoSnapshotDoc: { pathname: "/api/repo/openRepoSnapshotDoc", method: "POST" }
  },
  snippet: {
    getSnippet: { pathname: "/api/snippet/getSnippet", method: "POST" },
    setSnippet: { pathname: "/api/snippet/setSnippet", method: "POST" }
  },
  storage: {
    getRecentDocs: { pathname: "/api/storage/getRecentDocs", method: "POST" }
  },
  system: {
    bootProgress: { pathname: "/api/system/bootProgress", method: "POST" },
    currentTime: { pathname: "/api/system/currentTime", method: "POST" },
    version: { pathname: "/api/system/version", method: "POST" },
    // TODO: refactor
    getConf: { pathname: "/api/system/getConf", method: "POST" }
  },
  template: {
    render: { pathname: "/api/template/render", method: "POST" },
    renderSprig: { pathname: "/api/template/renderSprig", method: "POST" }
  }
});
let Oe = c;
class Logger {
  constructor(t, n = !0) {
    this.label = t, this.collapsed = n;
  }
  /**
   * 输出
   * @param func: 所使用的输出函数
   * @param multiple: 是否进行多次输出
   * @param args: 输出函数的参数
   */
  stdout(t, n, ...r) {
    const s = `[\x1B[4m${this.label}\x1B[0m] - <\x1B[1m${t.name.toUpperCase()}\x1B[0m>`;
    if (this.collapsed ? globalThis.console.groupCollapsed(s) : globalThis.console.group(s), n)
      for (const o of r)
        Array.isArray(o) ? t(...o) : t(o);
    else
      t(...r);
    globalThis.console.trace(), globalThis.console.groupEnd();
  }
  dir(...t) {
    this.stdout(globalThis.console.dir, !1, ...t);
  }
  dirs(...t) {
    this.stdout(globalThis.console.dir, !0, ...t);
  }
  table(...t) {
    this.stdout(globalThis.console.table, !1, ...t);
  }
  tables(...t) {
    this.stdout(globalThis.console.table, !0, ...t);
  }
  debug(...t) {
    this.stdout(globalThis.console.debug, !1, ...t);
  }
  debugs(...t) {
    this.stdout(globalThis.console.debug, !0, ...t);
  }
  info(...t) {
    this.stdout(globalThis.console.info, !1, ...t);
  }
  infos(...t) {
    this.stdout(globalThis.console.info, !0, ...t);
  }
  log(...t) {
    this.stdout(globalThis.console.log, !1, ...t);
  }
  logs(...t) {
    this.stdout(globalThis.console.log, !0, ...t);
  }
  warn(...t) {
    this.stdout(globalThis.console.warn, !1, ...t);
  }
  warns(...t) {
    this.stdout(globalThis.console.warn, !0, ...t);
  }
  error(...t) {
    this.stdout(globalThis.console.error, !1, ...t);
  }
  errors(...t) {
    this.stdout(globalThis.console.error, !0, ...t);
  }
}
function trimPrefix(e, t) {
  return e.startsWith(t) ? e.slice(t.length) : e;
}
function trimSuffix(e, t) {
  return e.endsWith(t) ? e.slice(0, -t.length) : e;
}
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(e) {
  hookCallback = e;
}
function isArray(e) {
  return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
}
function isObject(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function hasOwnProp(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function isObjectEmpty(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e)
    if (hasOwnProp(e, t))
      return !1;
  return !0;
}
function isUndefined(e) {
  return e === void 0;
}
function isNumber$1(e) {
  return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
}
function isDate(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function map(e, t) {
  var n = [], r, s = e.length;
  for (r = 0; r < s; ++r)
    n.push(t(e[r], r));
  return n;
}
function extend(e, t) {
  for (var n in t)
    hasOwnProp(t, n) && (e[n] = t[n]);
  return hasOwnProp(t, "toString") && (e.toString = t.toString), hasOwnProp(t, "valueOf") && (e.valueOf = t.valueOf), e;
}
function createUTC(e, t, n, r) {
  return createLocalOrUTC(e, t, n, r, !0).utc();
}
function defaultParsingFlags() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function getParsingFlags(e) {
  return e._pf == null && (e._pf = defaultParsingFlags()), e._pf;
}
var some;
Array.prototype.some ? some = Array.prototype.some : some = function(e) {
  var t = Object(this), n = t.length >>> 0, r;
  for (r = 0; r < n; r++)
    if (r in t && e.call(this, t[r], r, t))
      return !0;
  return !1;
};
function isValid(e) {
  if (e._isValid == null) {
    var t = getParsingFlags(e), n = some.call(t.parsedDateParts, function(s) {
      return s != null;
    }), r = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
    if (e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))
      e._isValid = r;
    else
      return r;
  }
  return e._isValid;
}
function createInvalid(e) {
  var t = createUTC(NaN);
  return e != null ? extend(getParsingFlags(t), e) : getParsingFlags(t).userInvalidated = !0, t;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = !1;
function copyConfig(e, t) {
  var n, r, s, o = momentProperties.length;
  if (isUndefined(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), isUndefined(t._i) || (e._i = t._i), isUndefined(t._f) || (e._f = t._f), isUndefined(t._l) || (e._l = t._l), isUndefined(t._strict) || (e._strict = t._strict), isUndefined(t._tzm) || (e._tzm = t._tzm), isUndefined(t._isUTC) || (e._isUTC = t._isUTC), isUndefined(t._offset) || (e._offset = t._offset), isUndefined(t._pf) || (e._pf = getParsingFlags(t)), isUndefined(t._locale) || (e._locale = t._locale), o > 0)
    for (n = 0; n < o; n++)
      r = momentProperties[n], s = t[r], isUndefined(s) || (e[r] = s);
  return e;
}
function Moment(e) {
  copyConfig(this, e), this._d = new Date(e._d != null ? e._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), updateInProgress === !1 && (updateInProgress = !0, hooks.updateOffset(this), updateInProgress = !1);
}
function isMoment(e) {
  return e instanceof Moment || e != null && e._isAMomentObject != null;
}
function warn(e) {
  hooks.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + e);
}
function deprecate(e, t) {
  var n = !0;
  return extend(function() {
    if (hooks.deprecationHandler != null && hooks.deprecationHandler(null, e), n) {
      var r = [], s, o, a, l = arguments.length;
      for (o = 0; o < l; o++) {
        if (s = "", typeof arguments[o] == "object") {
          s += `
[` + o + "] ";
          for (a in arguments[0])
            hasOwnProp(arguments[0], a) && (s += a + ": " + arguments[0][a] + ", ");
          s = s.slice(0, -2);
        } else
          s = arguments[o];
        r.push(s);
      }
      warn(
        e + `
Arguments: ` + Array.prototype.slice.call(r).join("") + `
` + new Error().stack
      ), n = !1;
    }
    return t.apply(this, arguments);
  }, t);
}
var deprecations = {};
function deprecateSimple(e, t) {
  hooks.deprecationHandler != null && hooks.deprecationHandler(e, t), deprecations[e] || (warn(t), deprecations[e] = !0);
}
hooks.suppressDeprecationWarnings = !1;
hooks.deprecationHandler = null;
function isFunction(e) {
  return typeof Function < "u" && e instanceof Function || Object.prototype.toString.call(e) === "[object Function]";
}
function set$1(e) {
  var t, n;
  for (n in e)
    hasOwnProp(e, n) && (t = e[n], isFunction(t) ? this[n] = t : this["_" + n] = t);
  this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(e, t) {
  var n = extend({}, e), r;
  for (r in t)
    hasOwnProp(t, r) && (isObject(e[r]) && isObject(t[r]) ? (n[r] = {}, extend(n[r], e[r]), extend(n[r], t[r])) : t[r] != null ? n[r] = t[r] : delete n[r]);
  for (r in e)
    hasOwnProp(e, r) && !hasOwnProp(t, r) && isObject(e[r]) && (n[r] = extend({}, n[r]));
  return n;
}
function Locale(e) {
  e != null && this.set(e);
}
var keys;
Object.keys ? keys = Object.keys : keys = function(e) {
  var t, n = [];
  for (t in e)
    hasOwnProp(e, t) && n.push(t);
  return n;
};
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(e, t, n) {
  var r = this._calendar[e] || this._calendar.sameElse;
  return isFunction(r) ? r.call(t, n) : r;
}
function zeroFill(e, t, n) {
  var r = "" + Math.abs(e), s = t - r.length, o = e >= 0;
  return (o ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + r;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(e, t, n, r) {
  var s = r;
  typeof r == "string" && (s = function() {
    return this[r]();
  }), e && (formatTokenFunctions[e] = s), t && (formatTokenFunctions[t[0]] = function() {
    return zeroFill(s.apply(this, arguments), t[1], t[2]);
  }), n && (formatTokenFunctions[n] = function() {
    return this.localeData().ordinal(
      s.apply(this, arguments),
      e
    );
  });
}
function removeFormattingTokens(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function makeFormatFunction(e) {
  var t = e.match(formattingTokens), n, r;
  for (n = 0, r = t.length; n < r; n++)
    formatTokenFunctions[t[n]] ? t[n] = formatTokenFunctions[t[n]] : t[n] = removeFormattingTokens(t[n]);
  return function(s) {
    var o = "", a;
    for (a = 0; a < r; a++)
      o += isFunction(t[a]) ? t[a].call(s, e) : t[a];
    return o;
  };
}
function formatMoment(e, t) {
  return e.isValid() ? (t = expandFormat(t, e.localeData()), formatFunctions[t] = formatFunctions[t] || makeFormatFunction(t), formatFunctions[t](e)) : e.localeData().invalidDate();
}
function expandFormat(e, t) {
  var n = 5;
  function r(s) {
    return t.longDateFormat(s) || s;
  }
  for (localFormattingTokens.lastIndex = 0; n >= 0 && localFormattingTokens.test(e); )
    e = e.replace(
      localFormattingTokens,
      r
    ), localFormattingTokens.lastIndex = 0, n -= 1;
  return e;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(e) {
  var t = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
  return t || !n ? t : (this._longDateFormat[e] = n.match(formattingTokens).map(function(r) {
    return r === "MMMM" || r === "MM" || r === "DD" || r === "dddd" ? r.slice(1) : r;
  }).join(""), this._longDateFormat[e]);
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(e) {
  return this._ordinal.replace("%d", e);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(e, t, n, r) {
  var s = this._relativeTime[n];
  return isFunction(s) ? s(e, t, n, r) : s.replace(/%d/i, e);
}
function pastFuture(e, t) {
  var n = this._relativeTime[e > 0 ? "future" : "past"];
  return isFunction(n) ? n(t) : n.replace(/%s/i, t);
}
var aliases = {};
function addUnitAlias(e, t) {
  var n = e.toLowerCase();
  aliases[n] = aliases[n + "s"] = aliases[t] = e;
}
function normalizeUnits(e) {
  return typeof e == "string" ? aliases[e] || aliases[e.toLowerCase()] : void 0;
}
function normalizeObjectUnits(e) {
  var t = {}, n, r;
  for (r in e)
    hasOwnProp(e, r) && (n = normalizeUnits(r), n && (t[n] = e[r]));
  return t;
}
var priorities = {};
function addUnitPriority(e, t) {
  priorities[e] = t;
}
function getPrioritizedUnits(e) {
  var t = [], n;
  for (n in e)
    hasOwnProp(e, n) && t.push({ unit: n, priority: priorities[n] });
  return t.sort(function(r, s) {
    return r.priority - s.priority;
  }), t;
}
function isLeapYear(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function absFloor(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function toInt(e) {
  var t = +e, n = 0;
  return t !== 0 && isFinite(t) && (n = absFloor(t)), n;
}
function makeGetSet(e, t) {
  return function(n) {
    return n != null ? (set$1$1(this, e, n), hooks.updateOffset(this, t), this) : get(this, e);
  };
}
function get(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function set$1$1(e, t, n) {
  e.isValid() && !isNaN(n) && (t === "FullYear" && isLeapYear(e.year()) && e.month() === 1 && e.date() === 29 ? (n = toInt(n), e._d["set" + (e._isUTC ? "UTC" : "") + t](
    n,
    e.month(),
    daysInMonth(n, e.month())
  )) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
}
function stringGet(e) {
  return e = normalizeUnits(e), isFunction(this[e]) ? this[e]() : this;
}
function stringSet(e, t) {
  if (typeof e == "object") {
    e = normalizeObjectUnits(e);
    var n = getPrioritizedUnits(e), r, s = n.length;
    for (r = 0; r < s; r++)
      this[n[r].unit](e[n[r].unit]);
  } else if (e = normalizeUnits(e), isFunction(this[e]))
    return this[e](t);
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(e, t, n) {
  regexes[e] = isFunction(t) ? t : function(r, s) {
    return r && n ? n : t;
  };
}
function getParseRegexForToken(e, t) {
  return hasOwnProp(regexes, e) ? regexes[e](t._strict, t._locale) : new RegExp(unescapeFormat(e));
}
function unescapeFormat(e) {
  return regexEscape(
    e.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(t, n, r, s, o) {
        return n || r || s || o;
      }
    )
  );
}
function regexEscape(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens$1 = {};
function addParseToken(e, t) {
  var n, r = t, s;
  for (typeof e == "string" && (e = [e]), isNumber$1(t) && (r = function(o, a) {
    a[t] = toInt(o);
  }), s = e.length, n = 0; n < s; n++)
    tokens$1[e[n]] = r;
}
function addWeekParseToken(e, t) {
  addParseToken(e, function(n, r, s, o) {
    s._w = s._w || {}, t(n, s._w, s, o);
  });
}
function addTimeToArrayFromToken(e, t, n) {
  t != null && hasOwnProp(tokens$1, e) && tokens$1[e](t, n._a, n, e);
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(e, t) {
  return (e % t + t) % t;
}
var indexOf;
Array.prototype.indexOf ? indexOf = Array.prototype.indexOf : indexOf = function(e) {
  var t;
  for (t = 0; t < this.length; ++t)
    if (this[t] === e)
      return t;
  return -1;
};
function daysInMonth(e, t) {
  if (isNaN(e) || isNaN(t))
    return NaN;
  var n = mod(t, 12);
  return e += (t - n) / 12, n === 1 ? isLeapYear(e) ? 29 : 28 : 31 - n % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(e) {
  return this.localeData().monthsShort(this, e);
});
addFormatToken("MMMM", 0, 0, function(e) {
  return this.localeData().months(this, e);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(e, t) {
  return t.monthsShortRegex(e);
});
addRegexToken("MMMM", function(e, t) {
  return t.monthsRegex(e);
});
addParseToken(["M", "MM"], function(e, t) {
  t[MONTH] = toInt(e) - 1;
});
addParseToken(["MMM", "MMMM"], function(e, t, n, r) {
  var s = n._locale.monthsParse(e, r, n._strict);
  s != null ? t[MONTH] = s : getParsingFlags(n).invalidMonth = e;
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(e, t) {
  return e ? isArray(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(t) ? "format" : "standalone"][e.month()] : isArray(this._months) ? this._months : this._months.standalone;
}
function localeMonthsShort(e, t) {
  return e ? isArray(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(t) ? "format" : "standalone"][e.month()] : isArray(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function handleStrictParse(e, t, n) {
  var r, s, o, a = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      o = createUTC([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        o,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(o, "").toLocaleLowerCase();
  return n ? t === "MMM" ? (s = indexOf.call(this._shortMonthsParse, a), s !== -1 ? s : null) : (s = indexOf.call(this._longMonthsParse, a), s !== -1 ? s : null) : t === "MMM" ? (s = indexOf.call(this._shortMonthsParse, a), s !== -1 ? s : (s = indexOf.call(this._longMonthsParse, a), s !== -1 ? s : null)) : (s = indexOf.call(this._longMonthsParse, a), s !== -1 ? s : (s = indexOf.call(this._shortMonthsParse, a), s !== -1 ? s : null));
}
function localeMonthsParse(e, t, n) {
  var r, s, o;
  if (this._monthsParseExact)
    return handleStrictParse.call(this, e, t, n);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++) {
    if (s = createUTC([2e3, r]), n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp(
      "^" + this.months(s, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[r] = new RegExp(
      "^" + this.monthsShort(s, "").replace(".", "") + "$",
      "i"
    )), !n && !this._monthsParse[r] && (o = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[r] = new RegExp(o.replace(".", ""), "i")), n && t === "MMMM" && this._longMonthsParse[r].test(e))
      return r;
    if (n && t === "MMM" && this._shortMonthsParse[r].test(e))
      return r;
    if (!n && this._monthsParse[r].test(e))
      return r;
  }
}
function setMonth(e, t) {
  var n;
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = toInt(t);
    else if (t = e.localeData().monthsParse(t), !isNumber$1(t))
      return e;
  }
  return n = Math.min(e.date(), daysInMonth(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e;
}
function getSetMonth(e) {
  return e != null ? (setMonth(this, e), hooks.updateOffset(this, !0), this) : get(this, "Month");
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(e) {
  return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (hasOwnProp(this, "_monthsShortRegex") || (this._monthsShortRegex = defaultMonthsShortRegex), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function monthsRegex(e) {
  return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (hasOwnProp(this, "_monthsRegex") || (this._monthsRegex = defaultMonthsRegex), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
}
function computeMonthsParse() {
  function e(a, l) {
    return l.length - a.length;
  }
  var t = [], n = [], r = [], s, o;
  for (s = 0; s < 12; s++)
    o = createUTC([2e3, s]), t.push(this.monthsShort(o, "")), n.push(this.months(o, "")), r.push(this.months(o, "")), r.push(this.monthsShort(o, ""));
  for (t.sort(e), n.sort(e), r.sort(e), s = 0; s < 12; s++)
    t[s] = regexEscape(t[s]), n[s] = regexEscape(n[s]);
  for (s = 0; s < 24; s++)
    r[s] = regexEscape(r[s]);
  this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
addFormatToken("Y", 0, 0, function() {
  var e = this.year();
  return e <= 9999 ? zeroFill(e, 4) : "+" + e;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, !0], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(e, t) {
  t[YEAR] = e.length === 2 ? hooks.parseTwoDigitYear(e) : toInt(e);
});
addParseToken("YY", function(e, t) {
  t[YEAR] = hooks.parseTwoDigitYear(e);
});
addParseToken("Y", function(e, t) {
  t[YEAR] = parseInt(e, 10);
});
function daysInYear(e) {
  return isLeapYear(e) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(e) {
  return toInt(e) + (toInt(e) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", !0);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate(e, t, n, r, s, o, a) {
  var l;
  return e < 100 && e >= 0 ? (l = new Date(e + 400, t, n, r, s, o, a), isFinite(l.getFullYear()) && l.setFullYear(e)) : l = new Date(e, t, n, r, s, o, a), l;
}
function createUTCDate(e) {
  var t, n;
  return e < 100 && e >= 0 ? (n = Array.prototype.slice.call(arguments), n[0] = e + 400, t = new Date(Date.UTC.apply(null, n)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t;
}
function firstWeekOffset(e, t, n) {
  var r = 7 + t - n, s = (7 + createUTCDate(e, 0, r).getUTCDay() - t) % 7;
  return -s + r - 1;
}
function dayOfYearFromWeeks(e, t, n, r, s) {
  var o = (7 + n - r) % 7, a = firstWeekOffset(e, r, s), l = 1 + 7 * (t - 1) + o + a, f, p;
  return l <= 0 ? (f = e - 1, p = daysInYear(f) + l) : l > daysInYear(e) ? (f = e + 1, p = l - daysInYear(e)) : (f = e, p = l), {
    year: f,
    dayOfYear: p
  };
}
function weekOfYear(e, t, n) {
  var r = firstWeekOffset(e.year(), t, n), s = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, o, a;
  return s < 1 ? (a = e.year() - 1, o = s + weeksInYear(a, t, n)) : s > weeksInYear(e.year(), t, n) ? (o = s - weeksInYear(e.year(), t, n), a = e.year() + 1) : (a = e.year(), o = s), {
    week: o,
    year: a
  };
}
function weeksInYear(e, t, n) {
  var r = firstWeekOffset(e, t, n), s = firstWeekOffset(e + 1, t, n);
  return (daysInYear(e) - r + s) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(
  ["w", "ww", "W", "WW"],
  function(e, t, n, r) {
    t[r.substr(0, 1)] = toInt(e);
  }
);
function localeWeek(e) {
  return weekOfYear(e, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function getSetISOWeek(e) {
  var t = weekOfYear(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(e) {
  return this.localeData().weekdaysMin(this, e);
});
addFormatToken("ddd", 0, 0, function(e) {
  return this.localeData().weekdaysShort(this, e);
});
addFormatToken("dddd", 0, 0, function(e) {
  return this.localeData().weekdays(this, e);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(e, t) {
  return t.weekdaysMinRegex(e);
});
addRegexToken("ddd", function(e, t) {
  return t.weekdaysShortRegex(e);
});
addRegexToken("dddd", function(e, t) {
  return t.weekdaysRegex(e);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(e, t, n, r) {
  var s = n._locale.weekdaysParse(e, r, n._strict);
  s != null ? t.d = s : getParsingFlags(n).invalidWeekday = e;
});
addWeekParseToken(["d", "e", "E"], function(e, t, n, r) {
  t[r] = toInt(e);
});
function parseWeekday(e, t) {
  return typeof e != "string" ? e : isNaN(e) ? (e = t.weekdaysParse(e), typeof e == "number" ? e : null) : parseInt(e, 10);
}
function parseIsoWeekday(e, t) {
  return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
function shiftWeekdays(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(e, t) {
  var n = isArray(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
  return e === !0 ? shiftWeekdays(n, this._week.dow) : e ? n[e.day()] : n;
}
function localeWeekdaysShort(e) {
  return e === !0 ? shiftWeekdays(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(e) {
  return e === !0 ? shiftWeekdays(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
}
function handleStrictParse$1(e, t, n) {
  var r, s, o, a = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      o = createUTC([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        o,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        o,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(o, "").toLocaleLowerCase();
  return n ? t === "dddd" ? (s = indexOf.call(this._weekdaysParse, a), s !== -1 ? s : null) : t === "ddd" ? (s = indexOf.call(this._shortWeekdaysParse, a), s !== -1 ? s : null) : (s = indexOf.call(this._minWeekdaysParse, a), s !== -1 ? s : null) : t === "dddd" ? (s = indexOf.call(this._weekdaysParse, a), s !== -1 || (s = indexOf.call(this._shortWeekdaysParse, a), s !== -1) ? s : (s = indexOf.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : t === "ddd" ? (s = indexOf.call(this._shortWeekdaysParse, a), s !== -1 || (s = indexOf.call(this._weekdaysParse, a), s !== -1) ? s : (s = indexOf.call(this._minWeekdaysParse, a), s !== -1 ? s : null)) : (s = indexOf.call(this._minWeekdaysParse, a), s !== -1 || (s = indexOf.call(this._weekdaysParse, a), s !== -1) ? s : (s = indexOf.call(this._shortWeekdaysParse, a), s !== -1 ? s : null));
}
function localeWeekdaysParse(e, t, n) {
  var r, s, o;
  if (this._weekdaysParseExact)
    return handleStrictParse$1.call(this, e, t, n);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; r < 7; r++) {
    if (s = createUTC([2e3, 1]).day(r), n && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp(
      "^" + this.weekdays(s, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[r] = new RegExp(
      "^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[r] || (o = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[r] = new RegExp(o.replace(".", ""), "i")), n && t === "dddd" && this._fullWeekdaysParse[r].test(e))
      return r;
    if (n && t === "ddd" && this._shortWeekdaysParse[r].test(e))
      return r;
    if (n && t === "dd" && this._minWeekdaysParse[r].test(e))
      return r;
    if (!n && this._weekdaysParse[r].test(e))
      return r;
  }
}
function getSetDayOfWeek(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? (e = parseWeekday(e, this.localeData()), this.add(e - t, "d")) : t;
}
function getSetLocaleDayOfWeek(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function getSetISODayOfWeek(e) {
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    var t = parseIsoWeekday(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else
    return this.day() || 7;
}
function weekdaysRegex(e) {
  return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (hasOwnProp(this, "_weekdaysRegex") || (this._weekdaysRegex = defaultWeekdaysRegex), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function weekdaysShortRegex(e) {
  return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (hasOwnProp(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = defaultWeekdaysShortRegex), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function weekdaysMinRegex(e) {
  return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (hasOwnProp(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = defaultWeekdaysMinRegex), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function computeWeekdaysParse() {
  function e(d, _) {
    return _.length - d.length;
  }
  var t = [], n = [], r = [], s = [], o, a, l, f, p;
  for (o = 0; o < 7; o++)
    a = createUTC([2e3, 1]).day(o), l = regexEscape(this.weekdaysMin(a, "")), f = regexEscape(this.weekdaysShort(a, "")), p = regexEscape(this.weekdays(a, "")), t.push(l), n.push(f), r.push(p), s.push(l), s.push(f), s.push(p);
  t.sort(e), n.sort(e), r.sort(e), s.sort(e), this._weekdaysRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + r.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(e, t) {
  addFormatToken(e, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      t
    );
  });
}
meridiem("a", !0);
meridiem("A", !1);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(e, t) {
  return t._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(e, t, n) {
  var r = toInt(e);
  t[HOUR] = r === 24 ? 0 : r;
});
addParseToken(["a", "A"], function(e, t, n) {
  n._isPm = n._locale.isPM(e), n._meridiem = e;
});
addParseToken(["h", "hh"], function(e, t, n) {
  t[HOUR] = toInt(e), getParsingFlags(n).bigHour = !0;
});
addParseToken("hmm", function(e, t, n) {
  var r = e.length - 2;
  t[HOUR] = toInt(e.substr(0, r)), t[MINUTE] = toInt(e.substr(r)), getParsingFlags(n).bigHour = !0;
});
addParseToken("hmmss", function(e, t, n) {
  var r = e.length - 4, s = e.length - 2;
  t[HOUR] = toInt(e.substr(0, r)), t[MINUTE] = toInt(e.substr(r, 2)), t[SECOND] = toInt(e.substr(s)), getParsingFlags(n).bigHour = !0;
});
addParseToken("Hmm", function(e, t, n) {
  var r = e.length - 2;
  t[HOUR] = toInt(e.substr(0, r)), t[MINUTE] = toInt(e.substr(r));
});
addParseToken("Hmmss", function(e, t, n) {
  var r = e.length - 4, s = e.length - 2;
  t[HOUR] = toInt(e.substr(0, r)), t[MINUTE] = toInt(e.substr(r, 2)), t[SECOND] = toInt(e.substr(s));
});
function localeIsPM(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", !0);
function localeMeridiem(e, t, n) {
  return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
}, locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(e, t) {
  var n, r = Math.min(e.length, t.length);
  for (n = 0; n < r; n += 1)
    if (e[n] !== t[n])
      return n;
  return r;
}
function normalizeLocale(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function chooseLocale(e) {
  for (var t = 0, n, r, s, o; t < e.length; ) {
    for (o = normalizeLocale(e[t]).split("-"), n = o.length, r = normalizeLocale(e[t + 1]), r = r ? r.split("-") : null; n > 0; ) {
      if (s = loadLocale(o.slice(0, n).join("-")), s)
        return s;
      if (r && r.length >= n && commonPrefix(o, r) >= n - 1)
        break;
      n--;
    }
    t++;
  }
  return globalLocale;
}
function isLocaleNameSane(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function loadLocale(e) {
  var t = null, n;
  if (locales[e] === void 0 && typeof module < "u" && module && module.exports && isLocaleNameSane(e))
    try {
      t = globalLocale._abbr, n = require, n("./locale/" + e), getSetGlobalLocale(t);
    } catch {
      locales[e] = null;
    }
  return locales[e];
}
function getSetGlobalLocale(e, t) {
  var n;
  return e && (isUndefined(t) ? n = getLocale(e) : n = defineLocale(e, t), n ? globalLocale = n : typeof console < "u" && console.warn && console.warn(
    "Locale " + e + " not found. Did you forget to load it?"
  )), globalLocale._abbr;
}
function defineLocale(e, t) {
  if (t !== null) {
    var n, r = baseConfig;
    if (t.abbr = e, locales[e] != null)
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), r = locales[e]._config;
    else if (t.parentLocale != null)
      if (locales[t.parentLocale] != null)
        r = locales[t.parentLocale]._config;
      else if (n = loadLocale(t.parentLocale), n != null)
        r = n._config;
      else
        return localeFamilies[t.parentLocale] || (localeFamilies[t.parentLocale] = []), localeFamilies[t.parentLocale].push({
          name: e,
          config: t
        }), null;
    return locales[e] = new Locale(mergeConfigs(r, t)), localeFamilies[e] && localeFamilies[e].forEach(function(s) {
      defineLocale(s.name, s.config);
    }), getSetGlobalLocale(e), locales[e];
  } else
    return delete locales[e], null;
}
function updateLocale(e, t) {
  if (t != null) {
    var n, r, s = baseConfig;
    locales[e] != null && locales[e].parentLocale != null ? locales[e].set(mergeConfigs(locales[e]._config, t)) : (r = loadLocale(e), r != null && (s = r._config), t = mergeConfigs(s, t), r == null && (t.abbr = e), n = new Locale(t), n.parentLocale = locales[e], locales[e] = n), getSetGlobalLocale(e);
  } else
    locales[e] != null && (locales[e].parentLocale != null ? (locales[e] = locales[e].parentLocale, e === getSetGlobalLocale() && getSetGlobalLocale(e)) : locales[e] != null && delete locales[e]);
  return locales[e];
}
function getLocale(e) {
  var t;
  if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return globalLocale;
  if (!isArray(e)) {
    if (t = loadLocale(e), t)
      return t;
    e = [e];
  }
  return chooseLocale(e);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(e) {
  var t, n = e._a;
  return n && getParsingFlags(e).overflow === -2 && (t = n[MONTH] < 0 || n[MONTH] > 11 ? MONTH : n[DATE] < 1 || n[DATE] > daysInMonth(n[YEAR], n[MONTH]) ? DATE : n[HOUR] < 0 || n[HOUR] > 24 || n[HOUR] === 24 && (n[MINUTE] !== 0 || n[SECOND] !== 0 || n[MILLISECOND] !== 0) ? HOUR : n[MINUTE] < 0 || n[MINUTE] > 59 ? MINUTE : n[SECOND] < 0 || n[SECOND] > 59 ? SECOND : n[MILLISECOND] < 0 || n[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(e)._overflowDayOfYear && (t < YEAR || t > DATE) && (t = DATE), getParsingFlags(e)._overflowWeeks && t === -1 && (t = WEEK), getParsingFlags(e)._overflowWeekday && t === -1 && (t = WEEKDAY), getParsingFlags(e).overflow = t), e;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(e) {
  var t, n, r = e._i, s = extendedIsoRegex.exec(r) || basicIsoRegex.exec(r), o, a, l, f, p = isoDates.length, d = isoTimes.length;
  if (s) {
    for (getParsingFlags(e).iso = !0, t = 0, n = p; t < n; t++)
      if (isoDates[t][1].exec(s[1])) {
        a = isoDates[t][0], o = isoDates[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, n = d; t < n; t++)
        if (isoTimes[t][1].exec(s[3])) {
          l = (s[2] || " ") + isoTimes[t][0];
          break;
        }
      if (l == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!o && l != null) {
      e._isValid = !1;
      return;
    }
    if (s[4])
      if (tzRegex.exec(s[4]))
        f = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (l || "") + (f || ""), configFromStringAndFormat(e);
  } else
    e._isValid = !1;
}
function extractFromRFC2822Strings(e, t, n, r, s, o) {
  var a = [
    untruncateYear(e),
    defaultLocaleMonthsShort.indexOf(t),
    parseInt(n, 10),
    parseInt(r, 10),
    parseInt(s, 10)
  ];
  return o && a.push(parseInt(o, 10)), a;
}
function untruncateYear(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function preprocessRFC2822(e) {
  return e.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(e, t, n) {
  if (e) {
    var r = defaultLocaleWeekdaysShort.indexOf(e), s = new Date(
      t[0],
      t[1],
      t[2]
    ).getDay();
    if (r !== s)
      return getParsingFlags(n).weekdayMismatch = !0, n._isValid = !1, !1;
  }
  return !0;
}
function calculateOffset(e, t, n) {
  if (e)
    return obsOffsets[e];
  if (t)
    return 0;
  var r = parseInt(n, 10), s = r % 100, o = (r - s) / 100;
  return o * 60 + s;
}
function configFromRFC2822(e) {
  var t = rfc2822.exec(preprocessRFC2822(e._i)), n;
  if (t) {
    if (n = extractFromRFC2822Strings(
      t[4],
      t[3],
      t[2],
      t[5],
      t[6],
      t[7]
    ), !checkWeekday(t[1], n, e))
      return;
    e._a = n, e._tzm = calculateOffset(t[8], t[9], t[10]), e._d = createUTCDate.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), getParsingFlags(e).rfc2822 = !0;
  } else
    e._isValid = !1;
}
function configFromString(e) {
  var t = aspNetJsonRegex.exec(e._i);
  if (t !== null) {
    e._d = /* @__PURE__ */ new Date(+t[1]);
    return;
  }
  if (configFromISO(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  if (configFromRFC2822(e), e._isValid === !1)
    delete e._isValid;
  else
    return;
  e._strict ? e._isValid = !1 : hooks.createFromInputFallback(e);
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(e) {
    e._d = /* @__PURE__ */ new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function defaults(e, t, n) {
  return e ?? t ?? n;
}
function currentDateArray(e) {
  var t = new Date(hooks.now());
  return e._useUTC ? [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ] : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function configFromArray(e) {
  var t, n, r = [], s, o, a;
  if (!e._d) {
    for (s = currentDateArray(e), e._w && e._a[DATE] == null && e._a[MONTH] == null && dayOfYearFromWeekInfo(e), e._dayOfYear != null && (a = defaults(e._a[YEAR], s[YEAR]), (e._dayOfYear > daysInYear(a) || e._dayOfYear === 0) && (getParsingFlags(e)._overflowDayOfYear = !0), n = createUTCDate(a, 0, e._dayOfYear), e._a[MONTH] = n.getUTCMonth(), e._a[DATE] = n.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
      e._a[t] = r[t] = s[t];
    for (; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    e._a[HOUR] === 24 && e._a[MINUTE] === 0 && e._a[SECOND] === 0 && e._a[MILLISECOND] === 0 && (e._nextDay = !0, e._a[HOUR] = 0), e._d = (e._useUTC ? createUTCDate : createDate).apply(
      null,
      r
    ), o = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[HOUR] = 24), e._w && typeof e._w.d < "u" && e._w.d !== o && (getParsingFlags(e).weekdayMismatch = !0);
  }
}
function dayOfYearFromWeekInfo(e) {
  var t, n, r, s, o, a, l, f, p;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (o = 1, a = 4, n = defaults(
    t.GG,
    e._a[YEAR],
    weekOfYear(createLocal(), 1, 4).year
  ), r = defaults(t.W, 1), s = defaults(t.E, 1), (s < 1 || s > 7) && (f = !0)) : (o = e._locale._week.dow, a = e._locale._week.doy, p = weekOfYear(createLocal(), o, a), n = defaults(t.gg, e._a[YEAR], p.year), r = defaults(t.w, p.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (f = !0)) : t.e != null ? (s = t.e + o, (t.e < 0 || t.e > 6) && (f = !0)) : s = o), r < 1 || r > weeksInYear(n, o, a) ? getParsingFlags(e)._overflowWeeks = !0 : f != null ? getParsingFlags(e)._overflowWeekday = !0 : (l = dayOfYearFromWeeks(n, r, s, o, a), e._a[YEAR] = l.year, e._dayOfYear = l.dayOfYear);
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(e) {
  if (e._f === hooks.ISO_8601) {
    configFromISO(e);
    return;
  }
  if (e._f === hooks.RFC_2822) {
    configFromRFC2822(e);
    return;
  }
  e._a = [], getParsingFlags(e).empty = !0;
  var t = "" + e._i, n, r, s, o, a, l = t.length, f = 0, p, d;
  for (s = expandFormat(e._f, e._locale).match(formattingTokens) || [], d = s.length, n = 0; n < d; n++)
    o = s[n], r = (t.match(getParseRegexForToken(o, e)) || [])[0], r && (a = t.substr(0, t.indexOf(r)), a.length > 0 && getParsingFlags(e).unusedInput.push(a), t = t.slice(
      t.indexOf(r) + r.length
    ), f += r.length), formatTokenFunctions[o] ? (r ? getParsingFlags(e).empty = !1 : getParsingFlags(e).unusedTokens.push(o), addTimeToArrayFromToken(o, r, e)) : e._strict && !r && getParsingFlags(e).unusedTokens.push(o);
  getParsingFlags(e).charsLeftOver = l - f, t.length > 0 && getParsingFlags(e).unusedInput.push(t), e._a[HOUR] <= 12 && getParsingFlags(e).bigHour === !0 && e._a[HOUR] > 0 && (getParsingFlags(e).bigHour = void 0), getParsingFlags(e).parsedDateParts = e._a.slice(0), getParsingFlags(e).meridiem = e._meridiem, e._a[HOUR] = meridiemFixWrap(
    e._locale,
    e._a[HOUR],
    e._meridiem
  ), p = getParsingFlags(e).era, p !== null && (e._a[YEAR] = e._locale.erasConvertYear(p, e._a[YEAR])), configFromArray(e), checkOverflow(e);
}
function meridiemFixWrap(e, t, n) {
  var r;
  return n == null ? t : e.meridiemHour != null ? e.meridiemHour(t, n) : (e.isPM != null && (r = e.isPM(n), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function configFromStringAndArray(e) {
  var t, n, r, s, o, a, l = !1, f = e._f.length;
  if (f === 0) {
    getParsingFlags(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < f; s++)
    o = 0, a = !1, t = copyConfig({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], configFromStringAndFormat(t), isValid(t) && (a = !0), o += getParsingFlags(t).charsLeftOver, o += getParsingFlags(t).unusedTokens.length * 10, getParsingFlags(t).score = o, l ? o < r && (r = o, n = t) : (r == null || o < r || a) && (r = o, n = t, a && (l = !0));
  extend(e, n || t);
}
function configFromObject(e) {
  if (!e._d) {
    var t = normalizeObjectUnits(e._i), n = t.day === void 0 ? t.date : t.day;
    e._a = map(
      [t.year, t.month, n, t.hour, t.minute, t.second, t.millisecond],
      function(r) {
        return r && parseInt(r, 10);
      }
    ), configFromArray(e);
  }
}
function createFromConfig(e) {
  var t = new Moment(checkOverflow(prepareConfig(e)));
  return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function prepareConfig(e) {
  var t = e._i, n = e._f;
  return e._locale = e._locale || getLocale(e._l), t === null || n === void 0 && t === "" ? createInvalid({ nullInput: !0 }) : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), isMoment(t) ? new Moment(checkOverflow(t)) : (isDate(t) ? e._d = t : isArray(n) ? configFromStringAndArray(e) : n ? configFromStringAndFormat(e) : configFromInput(e), isValid(e) || (e._d = null), e));
}
function configFromInput(e) {
  var t = e._i;
  isUndefined(t) ? e._d = new Date(hooks.now()) : isDate(t) ? e._d = new Date(t.valueOf()) : typeof t == "string" ? configFromString(e) : isArray(t) ? (e._a = map(t.slice(0), function(n) {
    return parseInt(n, 10);
  }), configFromArray(e)) : isObject(t) ? configFromObject(e) : isNumber$1(t) ? e._d = new Date(t) : hooks.createFromInputFallback(e);
}
function createLocalOrUTC(e, t, n, r, s) {
  var o = {};
  return (t === !0 || t === !1) && (r = t, t = void 0), (n === !0 || n === !1) && (r = n, n = void 0), (isObject(e) && isObjectEmpty(e) || isArray(e) && e.length === 0) && (e = void 0), o._isAMomentObject = !0, o._useUTC = o._isUTC = s, o._l = n, o._i = e, o._f = t, o._strict = r, createFromConfig(o);
}
function createLocal(e, t, n, r) {
  return createLocalOrUTC(e, t, n, r, !1);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = createLocal.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : createInvalid();
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var e = createLocal.apply(null, arguments);
    return this.isValid() && e.isValid() ? e > this ? this : e : createInvalid();
  }
);
function pickBy(e, t) {
  var n, r;
  if (t.length === 1 && isArray(t[0]) && (t = t[0]), !t.length)
    return createLocal();
  for (n = t[0], r = 1; r < t.length; ++r)
    (!t[r].isValid() || t[r][e](n)) && (n = t[r]);
  return n;
}
function min() {
  var e = [].slice.call(arguments, 0);
  return pickBy("isBefore", e);
}
function max() {
  var e = [].slice.call(arguments, 0);
  return pickBy("isAfter", e);
}
var now = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(e) {
  var t, n = !1, r, s = ordering.length;
  for (t in e)
    if (hasOwnProp(e, t) && !(indexOf.call(ordering, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (r = 0; r < s; ++r)
    if (e[ordering[r]]) {
      if (n)
        return !1;
      parseFloat(e[ordering[r]]) !== toInt(e[ordering[r]]) && (n = !0);
    }
  return !0;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(e) {
  var t = normalizeObjectUnits(e), n = t.year || 0, r = t.quarter || 0, s = t.month || 0, o = t.week || t.isoWeek || 0, a = t.day || 0, l = t.hour || 0, f = t.minute || 0, p = t.second || 0, d = t.millisecond || 0;
  this._isValid = isDurationValid(t), this._milliseconds = +d + p * 1e3 + // 1000
  f * 6e4 + // 1000 * 60
  l * 1e3 * 60 * 60, this._days = +a + o * 7, this._months = +s + r * 3 + n * 12, this._data = {}, this._locale = getLocale(), this._bubble();
}
function isDuration(e) {
  return e instanceof Duration;
}
function absRound(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function compareArrays(e, t, n) {
  var r = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), o = 0, a;
  for (a = 0; a < r; a++)
    (n && e[a] !== t[a] || !n && toInt(e[a]) !== toInt(t[a])) && o++;
  return o + s;
}
function offset(e, t) {
  addFormatToken(e, 0, 0, function() {
    var n = this.utcOffset(), r = "+";
    return n < 0 && (n = -n, r = "-"), r + zeroFill(~~(n / 60), 2) + t + zeroFill(~~n % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(e, t, n) {
  n._useUTC = !0, n._tzm = offsetFromString(matchShortOffset, e);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(e, t) {
  var n = (t || "").match(e), r, s, o;
  return n === null ? null : (r = n[n.length - 1] || [], s = (r + "").match(chunkOffset) || ["-", 0, 0], o = +(s[1] * 60) + toInt(s[2]), o === 0 ? 0 : s[0] === "+" ? o : -o);
}
function cloneWithOffset(e, t) {
  var n, r;
  return t._isUTC ? (n = t.clone(), r = (isMoment(e) || isDate(e) ? e.valueOf() : createLocal(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + r), hooks.updateOffset(n, !1), n) : createLocal(e).local();
}
function getDateOffset(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(e, t, n) {
  var r = this._offset || 0, s;
  if (!this.isValid())
    return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (e = offsetFromString(matchShortOffset, e), e === null)
        return this;
    } else
      Math.abs(e) < 16 && !n && (e = e * 60);
    return !this._isUTC && t && (s = getDateOffset(this)), this._offset = e, this._isUTC = !0, s != null && this.add(s, "m"), r !== e && (!t || this._changeInProgress ? addSubtract(
      this,
      createDuration(e - r, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, hooks.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? r : getDateOffset(this);
}
function getSetZone(e, t) {
  return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function setOffsetToUTC(e) {
  return this.utcOffset(0, e);
}
function setOffsetToLocal(e) {
  return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(getDateOffset(this), "m")), this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = offsetFromString(matchOffset, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function hasAlignedHourOffset(e) {
  return this.isValid() ? (e = e ? createLocal(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted))
    return this._isDSTShifted;
  var e = {}, t;
  return copyConfig(e, this), e = prepareConfig(e), e._a ? (t = e._isUTC ? createUTC(e._a) : createLocal(e._a), this._isDSTShifted = this.isValid() && compareArrays(e._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : !1;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : !1;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(e, t) {
  var n = e, r = null, s, o, a;
  return isDuration(e) ? n = {
    ms: e._milliseconds,
    d: e._days,
    M: e._months
  } : isNumber$1(e) || !isNaN(+e) ? (n = {}, t ? n[t] = +e : n.milliseconds = +e) : (r = aspNetRegex.exec(e)) ? (s = r[1] === "-" ? -1 : 1, n = {
    y: 0,
    d: toInt(r[DATE]) * s,
    h: toInt(r[HOUR]) * s,
    m: toInt(r[MINUTE]) * s,
    s: toInt(r[SECOND]) * s,
    ms: toInt(absRound(r[MILLISECOND] * 1e3)) * s
    // the millisecond decimal point is included in the match
  }) : (r = isoRegex.exec(e)) ? (s = r[1] === "-" ? -1 : 1, n = {
    y: parseIso(r[2], s),
    M: parseIso(r[3], s),
    w: parseIso(r[4], s),
    d: parseIso(r[5], s),
    h: parseIso(r[6], s),
    m: parseIso(r[7], s),
    s: parseIso(r[8], s)
  }) : n == null ? n = {} : typeof n == "object" && ("from" in n || "to" in n) && (a = momentsDifference(
    createLocal(n.from),
    createLocal(n.to)
  ), n = {}, n.ms = a.milliseconds, n.M = a.months), o = new Duration(n), isDuration(e) && hasOwnProp(e, "_locale") && (o._locale = e._locale), isDuration(e) && hasOwnProp(e, "_isValid") && (o._isValid = e._isValid), o;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(e, t) {
  var n = e && parseFloat(e.replace(",", "."));
  return (isNaN(n) ? 0 : n) * t;
}
function positiveMomentsDifference(e, t) {
  var n = {};
  return n.months = t.month() - e.month() + (t.year() - e.year()) * 12, e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n;
}
function momentsDifference(e, t) {
  var n;
  return e.isValid() && t.isValid() ? (t = cloneWithOffset(t, e), e.isBefore(t) ? n = positiveMomentsDifference(e, t) : (n = positiveMomentsDifference(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : { milliseconds: 0, months: 0 };
}
function createAdder(e, t) {
  return function(n, r) {
    var s, o;
    return r !== null && !isNaN(+r) && (deprecateSimple(
      t,
      "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), o = n, n = r, r = o), s = createDuration(n, r), addSubtract(this, s, e), this;
  };
}
function addSubtract(e, t, n, r) {
  var s = t._milliseconds, o = absRound(t._days), a = absRound(t._months);
  e.isValid() && (r = r ?? !0, a && setMonth(e, get(e, "Month") + a * n), o && set$1$1(e, "Date", get(e, "Date") + o * n), s && e._d.setTime(e._d.valueOf() + s * n), r && hooks.updateOffset(e, o || a));
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString$1(e) {
  return typeof e == "string" || e instanceof String;
}
function isMomentInput(e) {
  return isMoment(e) || isDate(e) || isString$1(e) || isNumber$1(e) || isNumberOrStringArray(e) || isMomentInputObject(e) || e === null || e === void 0;
}
function isMomentInputObject(e) {
  var t = isObject(e) && !isObjectEmpty(e), n = !1, r = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], s, o, a = r.length;
  for (s = 0; s < a; s += 1)
    o = r[s], n = n || hasOwnProp(e, o);
  return t && n;
}
function isNumberOrStringArray(e) {
  var t = isArray(e), n = !1;
  return t && (n = e.filter(function(r) {
    return !isNumber$1(r) && isString$1(e);
  }).length === 0), t && n;
}
function isCalendarSpec(e) {
  var t = isObject(e) && !isObjectEmpty(e), n = !1, r = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], s, o;
  for (s = 0; s < r.length; s += 1)
    o = r[s], n = n || hasOwnProp(e, o);
  return t && n;
}
function getCalendarFormat(e, t) {
  var n = e.diff(t, "days", !0);
  return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(e, t) {
  arguments.length === 1 && (arguments[0] ? isMomentInput(arguments[0]) ? (e = arguments[0], t = void 0) : isCalendarSpec(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0));
  var n = e || createLocal(), r = cloneWithOffset(n, this).startOf("day"), s = hooks.calendarFormat(this, r) || "sameElse", o = t && (isFunction(t[s]) ? t[s].call(this, n) : t[s]);
  return this.format(
    o || this.localeData().calendar(s, this, createLocal(n))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(e, t) {
  var n = isMoment(e) ? e : createLocal(e);
  return this.isValid() && n.isValid() ? (t = normalizeUnits(t) || "millisecond", t === "millisecond" ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf()) : !1;
}
function isBefore(e, t) {
  var n = isMoment(e) ? e : createLocal(e);
  return this.isValid() && n.isValid() ? (t = normalizeUnits(t) || "millisecond", t === "millisecond" ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf()) : !1;
}
function isBetween(e, t, n, r) {
  var s = isMoment(e) ? e : createLocal(e), o = isMoment(t) ? t : createLocal(t);
  return this.isValid() && s.isValid() && o.isValid() ? (r = r || "()", (r[0] === "(" ? this.isAfter(s, n) : !this.isBefore(s, n)) && (r[1] === ")" ? this.isBefore(o, n) : !this.isAfter(o, n))) : !1;
}
function isSame(e, t) {
  var n = isMoment(e) ? e : createLocal(e), r;
  return this.isValid() && n.isValid() ? (t = normalizeUnits(t) || "millisecond", t === "millisecond" ? this.valueOf() === n.valueOf() : (r = n.valueOf(), this.clone().startOf(t).valueOf() <= r && r <= this.clone().endOf(t).valueOf())) : !1;
}
function isSameOrAfter(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function isSameOrBefore(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function diff(e, t, n) {
  var r, s, o;
  if (!this.isValid())
    return NaN;
  if (r = cloneWithOffset(e, this), !r.isValid())
    return NaN;
  switch (s = (r.utcOffset() - this.utcOffset()) * 6e4, t = normalizeUnits(t), t) {
    case "year":
      o = monthDiff(this, r) / 12;
      break;
    case "month":
      o = monthDiff(this, r);
      break;
    case "quarter":
      o = monthDiff(this, r) / 3;
      break;
    case "second":
      o = (this - r) / 1e3;
      break;
    case "minute":
      o = (this - r) / 6e4;
      break;
    case "hour":
      o = (this - r) / 36e5;
      break;
    case "day":
      o = (this - r - s) / 864e5;
      break;
    case "week":
      o = (this - r - s) / 6048e5;
      break;
    default:
      o = this - r;
  }
  return n ? o : absFloor(o);
}
function monthDiff(e, t) {
  if (e.date() < t.date())
    return -monthDiff(t, e);
  var n = (t.year() - e.year()) * 12 + (t.month() - e.month()), r = e.clone().add(n, "months"), s, o;
  return t - r < 0 ? (s = e.clone().add(n - 1, "months"), o = (t - r) / (r - s)) : (s = e.clone().add(n + 1, "months"), o = (t - r) / (s - r)), -(n + o) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString$1() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(e) {
  if (!this.isValid())
    return null;
  var t = e !== !0, n = t ? this.clone().utc() : this;
  return n.year() < 0 || n.year() > 9999 ? formatMoment(
    n,
    t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : isFunction(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(n, "Z")) : formatMoment(
    n,
    t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var e = "moment", t = "", n, r, s, o;
  return this.isLocal() || (e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", t = "Z"), n = "[" + e + '("]', r = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = "-MM-DD[T]HH:mm:ss.SSS", o = t + '[")]', this.format(n + r + s + o);
}
function format(e) {
  e || (e = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat);
  var t = formatMoment(this, e);
  return this.localeData().postformat(t);
}
function from(e, t) {
  return this.isValid() && (isMoment(e) && e.isValid() || createLocal(e).isValid()) ? createDuration({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function fromNow(e) {
  return this.from(createLocal(), e);
}
function to(e, t) {
  return this.isValid() && (isMoment(e) && e.isValid() || createLocal(e).isValid()) ? createDuration({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function toNow(e) {
  return this.to(createLocal(), e);
}
function locale(e) {
  var t;
  return e === void 0 ? this._locale._abbr : (t = getLocale(e), t != null && (this._locale = t), this);
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(e, t) {
  return (e % t + t) % t;
}
function localStartOfDate(e, t, n) {
  return e < 100 && e >= 0 ? new Date(e + 400, t, n) - MS_PER_400_YEARS : new Date(e, t, n).valueOf();
}
function utcStartOfDate(e, t, n) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, n) - MS_PER_400_YEARS : Date.UTC(e, t, n);
}
function startOf(e) {
  var t, n;
  if (e = normalizeUnits(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (n = this._isUTC ? utcStartOfDate : localStartOfDate, e) {
    case "year":
      t = n(this.year(), 0, 1);
      break;
    case "quarter":
      t = n(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      t = n(this.year(), this.month(), 1);
      break;
    case "week":
      t = n(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      t = n(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      t = n(this.year(), this.month(), this.date());
      break;
    case "hour":
      t = this._d.valueOf(), t -= mod$1(
        t + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      t = this._d.valueOf(), t -= mod$1(t, MS_PER_MINUTE);
      break;
    case "second":
      t = this._d.valueOf(), t -= mod$1(t, MS_PER_SECOND);
      break;
  }
  return this._d.setTime(t), hooks.updateOffset(this, !0), this;
}
function endOf(e) {
  var t, n;
  if (e = normalizeUnits(e), e === void 0 || e === "millisecond" || !this.isValid())
    return this;
  switch (n = this._isUTC ? utcStartOfDate : localStartOfDate, e) {
    case "year":
      t = n(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = n(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      t = n(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = n(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      t = n(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      t = n(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      t = this._d.valueOf(), t += MS_PER_HOUR - mod$1(
        t + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      t = this._d.valueOf(), t += MS_PER_MINUTE - mod$1(t, MS_PER_MINUTE) - 1;
      break;
    case "second":
      t = this._d.valueOf(), t += MS_PER_SECOND - mod$1(t, MS_PER_SECOND) - 1;
      break;
  }
  return this._d.setTime(t), hooks.updateOffset(this, !0), this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond()
  ];
}
function toObject() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(e, t, n, r) {
    var s = n._locale.erasParse(e, r, n._strict);
    s ? getParsingFlags(n).era = s : getParsingFlags(n).invalidEra = e;
  }
);
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(e, t, n, r) {
  var s;
  n._locale._eraYearOrdinalRegex && (s = e.match(n._locale._eraYearOrdinalRegex)), n._locale.eraYearOrdinalParse ? t[YEAR] = n._locale.eraYearOrdinalParse(e, s) : t[YEAR] = parseInt(e, 10);
});
function localeEras(e, t) {
  var n, r, s, o = this._eras || getLocale("en")._eras;
  for (n = 0, r = o.length; n < r; ++n) {
    switch (typeof o[n].since) {
      case "string":
        s = hooks(o[n].since).startOf("day"), o[n].since = s.valueOf();
        break;
    }
    switch (typeof o[n].until) {
      case "undefined":
        o[n].until = 1 / 0;
        break;
      case "string":
        s = hooks(o[n].until).startOf("day").valueOf(), o[n].until = s.valueOf();
        break;
    }
  }
  return o;
}
function localeErasParse(e, t, n) {
  var r, s, o = this.eras(), a, l, f;
  for (e = e.toUpperCase(), r = 0, s = o.length; r < s; ++r)
    if (a = o[r].name.toUpperCase(), l = o[r].abbr.toUpperCase(), f = o[r].narrow.toUpperCase(), n)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (l === e)
            return o[r];
          break;
        case "NNNN":
          if (a === e)
            return o[r];
          break;
        case "NNNNN":
          if (f === e)
            return o[r];
          break;
      }
    else if ([a, l, f].indexOf(e) >= 0)
      return o[r];
}
function localeErasConvertYear(e, t) {
  var n = e.since <= e.until ? 1 : -1;
  return t === void 0 ? hooks(e.since).year() : hooks(e.since).year() + (t - e.offset) * n;
}
function getEraName() {
  var e, t, n, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (n = this.clone().startOf("day").valueOf(), r[e].since <= n && n <= r[e].until || r[e].until <= n && n <= r[e].since)
      return r[e].name;
  return "";
}
function getEraNarrow() {
  var e, t, n, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (n = this.clone().startOf("day").valueOf(), r[e].since <= n && n <= r[e].until || r[e].until <= n && n <= r[e].since)
      return r[e].narrow;
  return "";
}
function getEraAbbr() {
  var e, t, n, r = this.localeData().eras();
  for (e = 0, t = r.length; e < t; ++e)
    if (n = this.clone().startOf("day").valueOf(), r[e].since <= n && n <= r[e].until || r[e].until <= n && n <= r[e].since)
      return r[e].abbr;
  return "";
}
function getEraYear() {
  var e, t, n, r, s = this.localeData().eras();
  for (e = 0, t = s.length; e < t; ++e)
    if (n = s[e].since <= s[e].until ? 1 : -1, r = this.clone().startOf("day").valueOf(), s[e].since <= r && r <= s[e].until || s[e].until <= r && r <= s[e].since)
      return (this.year() - hooks(s[e].since).year()) * n + s[e].offset;
  return this.year();
}
function erasNameRegex(e) {
  return hasOwnProp(this, "_erasNameRegex") || computeErasParse.call(this), e ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(e) {
  return hasOwnProp(this, "_erasAbbrRegex") || computeErasParse.call(this), e ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(e) {
  return hasOwnProp(this, "_erasNarrowRegex") || computeErasParse.call(this), e ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(e, t) {
  return t.erasAbbrRegex(e);
}
function matchEraName(e, t) {
  return t.erasNameRegex(e);
}
function matchEraNarrow(e, t) {
  return t.erasNarrowRegex(e);
}
function matchEraYearOrdinal(e, t) {
  return t._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var e = [], t = [], n = [], r = [], s, o, a = this.eras();
  for (s = 0, o = a.length; s < o; ++s)
    t.push(regexEscape(a[s].name)), e.push(regexEscape(a[s].abbr)), n.push(regexEscape(a[s].narrow)), r.push(regexEscape(a[s].name)), r.push(regexEscape(a[s].abbr)), r.push(regexEscape(a[s].narrow));
  this._erasRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(e, t) {
  addFormatToken(0, [e, e.length], 0, t);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(e, t, n, r) {
    t[r.substr(0, 2)] = toInt(e);
  }
);
addWeekParseToken(["gg", "GG"], function(e, t, n, r) {
  t[r] = hooks.parseTwoDigitYear(e);
});
function getSetWeekYear(e) {
  return getSetWeekYearHelper.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(e) {
  return getSetWeekYearHelper.call(
    this,
    e,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var e = this.localeData()._week;
  return weeksInYear(this.year(), e.dow, e.doy);
}
function getWeeksInWeekYear() {
  var e = this.localeData()._week;
  return weeksInYear(this.weekYear(), e.dow, e.doy);
}
function getSetWeekYearHelper(e, t, n, r, s) {
  var o;
  return e == null ? weekOfYear(this, r, s).year : (o = weeksInYear(e, r, s), t > o && (t = o), setWeekAll.call(this, e, t, n, r, s));
}
function setWeekAll(e, t, n, r, s) {
  var o = dayOfYearFromWeeks(e, t, n, r, s), a = createUTCDate(o.year, 0, o.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(e, t) {
  t[MONTH] = (toInt(e) - 1) * 3;
});
function getSetQuarter(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(e, t) {
  return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(e, t) {
  t[DATE] = toInt(e.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", !0);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(e, t, n) {
  n._dayOfYear = toInt(e);
});
function getSetDayOfYear(e) {
  var t = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", !1);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", !1);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S")
  addRegexToken(token, matchUnsigned);
function parseMs(e, t) {
  t[MILLISECOND] = toInt(("0." + e) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S")
  addParseToken(token, parseMs);
getSetMillisecond = makeGetSet("Milliseconds", !1);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
typeof Symbol < "u" && Symbol.for != null && (proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
proto.toJSON = toJSON;
proto.toString = toString$1;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(e) {
  return createLocal(e * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(e) {
  return e;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set$1;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(e, t, n, r) {
  var s = getLocale(), o = createUTC().set(r, t);
  return s[n](o, e);
}
function listMonthsImpl(e, t, n) {
  if (isNumber$1(e) && (t = e, e = void 0), e = e || "", t != null)
    return get$1(e, t, n, "month");
  var r, s = [];
  for (r = 0; r < 12; r++)
    s[r] = get$1(e, r, n, "month");
  return s;
}
function listWeekdaysImpl(e, t, n, r) {
  typeof e == "boolean" ? (isNumber$1(t) && (n = t, t = void 0), t = t || "") : (t = e, n = t, e = !1, isNumber$1(t) && (n = t, t = void 0), t = t || "");
  var s = getLocale(), o = e ? s._week.dow : 0, a, l = [];
  if (n != null)
    return get$1(t, (n + o) % 7, r, "day");
  for (a = 0; a < 7; a++)
    l[a] = get$1(t, (a + o) % 7, r, "day");
  return l;
}
function listMonths(e, t) {
  return listMonthsImpl(e, t, "months");
}
function listMonthsShort(e, t) {
  return listMonthsImpl(e, t, "monthsShort");
}
function listWeekdays(e, t, n) {
  return listWeekdaysImpl(e, t, n, "weekdays");
}
function listWeekdaysShort(e, t, n) {
  return listWeekdaysImpl(e, t, n, "weekdaysShort");
}
function listWeekdaysMin(e, t, n) {
  return listWeekdaysImpl(e, t, n, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(e) {
    var t = e % 10, n = toInt(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
    return e + n;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var e = this._data;
  return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), e.milliseconds = mathAbs(e.milliseconds), e.seconds = mathAbs(e.seconds), e.minutes = mathAbs(e.minutes), e.hours = mathAbs(e.hours), e.months = mathAbs(e.months), e.years = mathAbs(e.years), this;
}
function addSubtract$1(e, t, n, r) {
  var s = createDuration(t, n);
  return e._milliseconds += r * s._milliseconds, e._days += r * s._days, e._months += r * s._months, e._bubble();
}
function add$1(e, t) {
  return addSubtract$1(this, e, t, 1);
}
function subtract$1(e, t) {
  return addSubtract$1(this, e, t, -1);
}
function absCeil(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function bubble() {
  var e = this._milliseconds, t = this._days, n = this._months, r = this._data, s, o, a, l, f;
  return e >= 0 && t >= 0 && n >= 0 || e <= 0 && t <= 0 && n <= 0 || (e += absCeil(monthsToDays(n) + t) * 864e5, t = 0, n = 0), r.milliseconds = e % 1e3, s = absFloor(e / 1e3), r.seconds = s % 60, o = absFloor(s / 60), r.minutes = o % 60, a = absFloor(o / 60), r.hours = a % 24, t += absFloor(a / 24), f = absFloor(daysToMonths(t)), n += f, t -= absCeil(monthsToDays(f)), l = absFloor(n / 12), n %= 12, r.days = t, r.months = n, r.years = l, this;
}
function daysToMonths(e) {
  return e * 4800 / 146097;
}
function monthsToDays(e) {
  return e * 146097 / 4800;
}
function as(e) {
  if (!this.isValid())
    return NaN;
  var t, n, r = this._milliseconds;
  if (e = normalizeUnits(e), e === "month" || e === "quarter" || e === "year")
    switch (t = this._days + r / 864e5, n = this._months + daysToMonths(t), e) {
      case "month":
        return n;
      case "quarter":
        return n / 3;
      case "year":
        return n / 12;
    }
  else
    switch (t = this._days + Math.round(monthsToDays(this._months)), e) {
      case "week":
        return t / 7 + r / 6048e5;
      case "day":
        return t + r / 864e5;
      case "hour":
        return t * 24 + r / 36e5;
      case "minute":
        return t * 1440 + r / 6e4;
      case "second":
        return t * 86400 + r / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + r;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function valueOf$1() {
  return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6 : NaN;
}
function makeAs(e) {
  return function() {
    return this.as(e);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(e) {
  return e = normalizeUnits(e), this.isValid() ? this[e + "s"]() : NaN;
}
function makeGetter(e) {
  return function() {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function substituteTimeAgo(e, t, n, r, s) {
  return s.relativeTime(t || 1, !!n, e, r);
}
function relativeTime$1(e, t, n, r) {
  var s = createDuration(e).abs(), o = round(s.as("s")), a = round(s.as("m")), l = round(s.as("h")), f = round(s.as("d")), p = round(s.as("M")), d = round(s.as("w")), _ = round(s.as("y")), S = o <= n.ss && ["s", o] || o < n.s && ["ss", o] || a <= 1 && ["m"] || a < n.m && ["mm", a] || l <= 1 && ["h"] || l < n.h && ["hh", l] || f <= 1 && ["d"] || f < n.d && ["dd", f];
  return n.w != null && (S = S || d <= 1 && ["w"] || d < n.w && ["ww", d]), S = S || p <= 1 && ["M"] || p < n.M && ["MM", p] || _ <= 1 && ["y"] || ["yy", _], S[2] = t, S[3] = +e > 0, S[4] = r, substituteTimeAgo.apply(null, S);
}
function getSetRelativeTimeRounding(e) {
  return e === void 0 ? round : typeof e == "function" ? (round = e, !0) : !1;
}
function getSetRelativeTimeThreshold(e, t) {
  return thresholds[e] === void 0 ? !1 : t === void 0 ? thresholds[e] : (thresholds[e] = t, e === "s" && (thresholds.ss = t - 1), !0);
}
function humanize(e, t) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var n = !1, r = thresholds, s, o;
  return typeof e == "object" && (t = e, e = !1), typeof e == "boolean" && (n = e), typeof t == "object" && (r = Object.assign({}, thresholds, t), t.s != null && t.ss == null && (r.ss = t.s - 1)), s = this.localeData(), o = relativeTime$1(this, !n, r, s), n && (o = s.pastFuture(+this, o)), s.postformat(o);
}
var abs$1 = Math.abs;
function sign(e) {
  return (e > 0) - (e < 0) || +e;
}
function toISOString$1() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var e = abs$1(this._milliseconds) / 1e3, t = abs$1(this._days), n = abs$1(this._months), r, s, o, a, l = this.asSeconds(), f, p, d, _;
  return l ? (r = absFloor(e / 60), s = absFloor(r / 60), e %= 60, r %= 60, o = absFloor(n / 12), n %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", f = l < 0 ? "-" : "", p = sign(this._months) !== sign(l) ? "-" : "", d = sign(this._days) !== sign(l) ? "-" : "", _ = sign(this._milliseconds) !== sign(l) ? "-" : "", f + "P" + (o ? p + o + "Y" : "") + (n ? p + n + "M" : "") + (t ? d + t + "D" : "") + (s || r || e ? "T" : "") + (s ? _ + s + "H" : "") + (r ? _ + r + "M" : "") + (e ? _ + a + "S" : "")) : "P0D";
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(e, t, n) {
  n._d = new Date(parseFloat(e) * 1e3);
});
addParseToken("x", function(e, t, n) {
  n._d = new Date(toInt(e));
});
//! moment.js
hooks.version = "2.29.4";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
class WorkerBridgeBase {
  constructor(t, n, r, s) {
    this.port = t, this.logger = n, this.handlers = r, this.uuid = s, this.map = /* @__PURE__ */ new Map(), this.counter = Math.random(), this.errerEventListener = async (o) => {
      this.logger.warn(o);
    }, this.messageEventListener = async (o) => {
      const a = o.data;
      switch (a.type) {
        case "call": {
          try {
            if (a.uuid && a.uuid !== this.uuid)
              break;
            if (a.handler.name in this.handlers) {
              const l = this.handlers[a.handler.name], f = await l.func.call(l.this, ...a.handler.args), p = {
                type: "return",
                id: a.id,
                handler: {
                  name: a.handler.name,
                  result: f
                }
              };
              this.port.postMessage(p);
            }
          } catch (l) {
            const f = {
              type: "error",
              id: a.id,
              error: l
            };
            this.port.postMessage(f);
          }
          break;
        }
        case "error": {
          const l = this.map.get(a.id);
          l && (this.map.delete(a.id), l.reject(a.error));
          break;
        }
        case "return": {
          const l = this.map.get(a.id);
          l && (this.map.delete(a.id), l.resolve(a.handler.result));
          break;
        }
      }
    }, this.port.addEventListener("error", this.errerEventListener), this.port.addEventListener("messageerror", this.errerEventListener), this.port.addEventListener("message", this.messageEventListener);
  }
  /**
   * 调用远程函数
   * @param name 函数名称
   * @param args 函数参数
   * @returns 函数返回值
   */
  async call(t, ...n) {
    return new Promise((r, s) => {
      const o = this.counter++;
      this.map.set(o, { resolve: r, reject: s });
      const a = {
        type: "call",
        id: o,
        handler: {
          name: t,
          args: n
        }
      };
      this.port.postMessage(a);
    });
  }
  /**
   * 调用指定客户端的远程函数
   * @param uuid 客户端 UUID
   * @param name 函数名称
   * @param args 函数参数
   * @returns 函数返回值
   */
  async singleCall(t, n, ...r) {
    return new Promise((s, o) => {
      const a = this.counter++;
      this.map.set(a, { resolve: s, reject: o });
      const l = {
        type: "call",
        id: a,
        uuid: n,
        handler: {
          name: t,
          args: r
        }
      };
      this.port.postMessage(l);
    });
  }
}
function* Counter(e = 0) {
  for (; ; )
    yield e++;
}
const counter = Counter(Math.round(Math.random() * (36 ** 8 - 1)));
function buildID(e, t) {
  return `${e.getFullYear().toString().padStart(4, "0")}${(e.getMonth() + 1).toString().padStart(2, "0")}${e.getDate().toString().padStart(2, "0")}${e.getHours().toString().padStart(2, "0")}${e.getMinutes().toString().padStart(2, "0")}${e.getSeconds().toString().padStart(2, "0")}-${t.toString(36).padStart(7, "0").slice(-7)}`;
}
function id(e = /* @__PURE__ */ new Date(), t = counter) {
  return buildID(e, t.next().value);
}
class WorkerBridgeSlave extends WorkerBridgeBase {
  constructor(t, n, r = {}, s = id()) {
    super(
      // @ts-ignore
      t,
      n,
      r,
      s
    ), this.pingEventListener = async (o) => {
      o.data === "ping" && this.port.postMessage("pong");
    }, this.port.addEventListener("message", this.pingEventListener);
  }
  close() {
    switch (!0) {
      case "close" in this.port:
        this.port.close();
        break;
      case "terminate" in this.port:
        this.port.terminate();
        break;
    }
  }
}
async function sleep(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
class AsyncLockQueue {
  constructor(t, n, r = 0) {
    this.handler = t, this.errorHandler = n, this.interval = r, this.items = [], this.isLocked = !1;
  }
  enqueue(t) {
    this.items.push(t), this.call();
  }
  async call() {
    if (this.isLocked)
      return !1;
    for (this.isLocked = !0; this.items.length > 0; ) {
      const t = this.items.shift();
      try {
        await this.handler(t);
      } catch (n) {
        this.errorHandler && await this.errorHandler(t, n);
      } finally {
        await sleep(this.interval);
      }
    }
    return this.isLocked = !1, !0;
  }
}
const { replace } = "", ca = /[&<>'"]/g, esca = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
}, pe = (e) => esca[e], escape = (e) => replace.call(e, ca, pe);
function createIAL(e) {
  let t = [];
  for (const [n, r] of Object.entries(e))
    r && t.push(`${n}="${escape(r).replaceAll(`
`, "_esc_newline_")}"`);
  return `{: ${t.join(" ")}}`;
}
function createStyle(e) {
  let t = [];
  for (const [n, r] of Object.entries(e))
    t.push(`${n}: ${r};`);
  return `${t.join(" ")}`;
}
const CONSTANTS = {
  JUPYTER_WORKER_FILE_NAME: "jupyter",
  // web worker 文件名称
  JUPYTER_WORKER_BROADCAST_CHANNEL_NAME: "jupyter-worker",
  // web worker 任务广播通道名称
  JUPYTER_UNKNOWN_VALUE: "unknown",
  // 未知值
  JUPYTER_LAST_RUN_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss.SSS",
  // 上次运行时间格式
  JUPYTER_RUNTIME_FORMAT: "HH:mm:ss.SSS",
  // 运行用时格式
  attrs: {
    // 块属性
    kernel: {
      /**
       * 内核 ID
       * {@link KernelSpec.ISpecModel.id}
       */
      id: "custom-jupyter-kernel-id",
      /**
       * 内核名称
       * {@link KernelSpec.ISpecModel.name}
       */
      name: "custom-jupyter-kernel-name",
      /**
       * 内核语言
       * {@link KernelSpec.ISpecModel.language}
       */
      language: "custom-jupyter-kernel-language",
      /**
       * 内核可读名称
       * {@link KernelSpec.ISpecModel.display_name}
       */
      display_name: "custom-jupyter-kernel-display-name",
      /**
       * 内核状态
       * {@link Kernel.Status}
       * ```ts
       * type Status = 'unknown' | 'starting' | 'idle' | 'busy' | 'terminating' | 'restarting' | 'autorestarting' | 'dead';
       * ```
       */
      status: "custom-jupyter-kernel-status",
      /**
       * 连接状态
       * {@link Kernel.ConnectionStatus}
       * ```ts
       * type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';
       * ```
       */
      connection_status: "custom-jupyter-kernel-connection-status"
    },
    session: {
      /**
       * 会话 ID
       * {@link Session.IModel.id}
       */
      id: "custom-jupyter-session-id",
      /**
       * 会话类型
       * {@link Session.IModel.type}
       */
      type: "custom-jupyter-session-type",
      /**
       * 会话名称
       * {@link Session.IModel.name}
       */
      name: "custom-jupyter-session-name",
      /**
       * 会话路径
       * {@link Session.IModel.path}
       */
      path: "custom-jupyter-session-path"
    },
    code: {
      type: {
        key: "custom-jupyter-block-type",
        value: "code"
      },
      time: "custom-jupyter-time",
      // 上次运行时间+运行时长
      output: "custom-jupyter-output-block-id",
      // 对应的输出块 ID
      index: "custom-jupyter-index",
      // 块运行序号
      execute_input: "custom-jupyter-time-execute-input",
      // 内核广播 execute_input 消息时间
      execute_reply: "custom-jupyter-time-execute-reply",
      // 内核广播 execute_reply 消息时间
      busy: "custom-jupyter-time-busy",
      // 内核状态切换为忙碌的时间
      idle: "custom-jupyter-time-idle"
      // 内核状态切换为空闲的时间
    },
    output: {
      type: {
        key: "custom-jupyter-block-type",
        value: "output"
      },
      code: "custom-jupyter-code-block-id",
      // 对应的代码块 ID
      index: "custom-jupyter-index"
      // 块运行序号
    },
    other: {
      prompt: "custom-prompt"
      // 提示文本
    }
  },
  styles: {
    // 样式
    success: "color: var(--b3-card-success-color); background-color: var(--b3-card-success-background);",
    info: "color: var(--b3-card-info-color); background-color: var(--b3-card-info-background);",
    warning: "color: var(--b3-card-warning-color); background-color: var(--b3-card-warning-background);",
    error: "color: var(--b3-card-error-color); background-color: var(--b3-card-error-background);"
  }
}, DEFAULT_CONFIG = {
  jupyter: {
    server: {
      enable: !1,
      // ⚙
      settings: {
        baseUrl: "",
        // ⚙
        appUrl: "",
        // ⚙
        wsUrl: "",
        // ⚙
        token: ""
        // ⚙
      }
    },
    execute: {
      goto: !0,
      // ⚙
      content: {
        silent: !1,
        store_history: !0,
        user_expressions: {},
        allow_stdin: !0,
        stop_on_error: !0
        // ⚙
      },
      input: {
        goto: !0
        // ⚙
      },
      output: {
        parser: {
          xterm: !1,
          // ⚙
          escaped: !0,
          // ⚙
          cntrl: !0
          // ⚙
        }
      }
    },
    import: {
      parser: {
        xterm: !1,
        // ⚙
        escaped: !0,
        // ⚙
        cntrl: !0
        // ⚙
      }
    }
  },
  xterm: {
    options: {
      allowTransparency: !0,
      disableStdin: !0,
      convertEol: !0,
      logLevel: "off",
      fontFamily: "JetBrainsMono-Regular"
      // ⚙
    }
  }
};
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function getAugmentedNamespace(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var validDataUrl$1 = { exports: {} };
(function(e) {
  (function(t, n) {
    e.exports ? e.exports = n() : t.validDataUrl = n();
  })(commonjsGlobal, function() {
    function t(n) {
      return t.regex.test((n || "").trim());
    }
    return t.regex = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i, t;
  });
})(validDataUrl$1);
var validDataUrlExports = validDataUrl$1.exports;
const validDataUrl = validDataUrlExports;
var parseDataUrl = (e) => {
  if (!validDataUrl(e))
    return !1;
  const t = e.trim().match(validDataUrl.regex), n = {};
  if (t[1]) {
    n.mediaType = t[1].toLowerCase();
    const r = t[1].split(";").map((s) => s.toLowerCase());
    n.contentType = r[0], r.slice(1).forEach((s) => {
      const o = s.split("=");
      n[o[0]] = o[1];
    });
  }
  return n.base64 = !!t[t.length - 2], n.data = t[t.length - 1] || "", n.toBuffer = () => {
    const r = n.base64 ? "base64" : "utf8";
    return Buffer.from(n.base64 ? n.data : decodeURIComponent(n.data), r);
  }, n;
};
const parser = /* @__PURE__ */ getDefaultExportFromCjs(parseDataUrl);
var buffer = {}, base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [], revLookup = [], Arr = typeof Uint8Array < "u" ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i)
  lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function byteLength(e) {
  var t = getLens(e), n = t[0], r = t[1];
  return (n + r) * 3 / 4 - r;
}
function _byteLength(e, t, n) {
  return (t + n) * 3 / 4 - n;
}
function toByteArray(e) {
  var t, n = getLens(e), r = n[0], s = n[1], o = new Arr(_byteLength(e, r, s)), a = 0, l = s > 0 ? r - 4 : r, f;
  for (f = 0; f < l; f += 4)
    t = revLookup[e.charCodeAt(f)] << 18 | revLookup[e.charCodeAt(f + 1)] << 12 | revLookup[e.charCodeAt(f + 2)] << 6 | revLookup[e.charCodeAt(f + 3)], o[a++] = t >> 16 & 255, o[a++] = t >> 8 & 255, o[a++] = t & 255;
  return s === 2 && (t = revLookup[e.charCodeAt(f)] << 2 | revLookup[e.charCodeAt(f + 1)] >> 4, o[a++] = t & 255), s === 1 && (t = revLookup[e.charCodeAt(f)] << 10 | revLookup[e.charCodeAt(f + 1)] << 4 | revLookup[e.charCodeAt(f + 2)] >> 2, o[a++] = t >> 8 & 255, o[a++] = t & 255), o;
}
function tripletToBase64(e) {
  return lookup[e >> 18 & 63] + lookup[e >> 12 & 63] + lookup[e >> 6 & 63] + lookup[e & 63];
}
function encodeChunk(e, t, n) {
  for (var r, s = [], o = t; o < n; o += 3)
    r = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255), s.push(tripletToBase64(r));
  return s.join("");
}
function fromByteArray(e) {
  for (var t, n = e.length, r = n % 3, s = [], o = 16383, a = 0, l = n - r; a < l; a += o)
    s.push(encodeChunk(e, a, a + o > l ? l : a + o));
  return r === 1 ? (t = e[n - 1], s.push(
    lookup[t >> 2] + lookup[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], s.push(
    lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "="
  )), s.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(e, t, n, r, s) {
  var o, a, l = s * 8 - r - 1, f = (1 << l) - 1, p = f >> 1, d = -7, _ = n ? s - 1 : 0, S = n ? -1 : 1, k = e[t + _];
  for (_ += S, o = k & (1 << -d) - 1, k >>= -d, d += l; d > 0; o = o * 256 + e[t + _], _ += S, d -= 8)
    ;
  for (a = o & (1 << -d) - 1, o >>= -d, d += r; d > 0; a = a * 256 + e[t + _], _ += S, d -= 8)
    ;
  if (o === 0)
    o = 1 - p;
  else {
    if (o === f)
      return a ? NaN : (k ? -1 : 1) * (1 / 0);
    a = a + Math.pow(2, r), o = o - p;
  }
  return (k ? -1 : 1) * a * Math.pow(2, o - r);
};
ieee754.write = function(e, t, n, r, s, o) {
  var a, l, f, p = o * 8 - s - 1, d = (1 << p) - 1, _ = d >> 1, S = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = r ? 0 : o - 1, O = r ? 1 : -1, rt = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0, a = d) : (a = Math.floor(Math.log(t) / Math.LN2), t * (f = Math.pow(2, -a)) < 1 && (a--, f *= 2), a + _ >= 1 ? t += S / f : t += S * Math.pow(2, 1 - _), t * f >= 2 && (a++, f /= 2), a + _ >= d ? (l = 0, a = d) : a + _ >= 1 ? (l = (t * f - 1) * Math.pow(2, s), a = a + _) : (l = t * Math.pow(2, _ - 1) * Math.pow(2, s), a = 0)); s >= 8; e[n + k] = l & 255, k += O, l /= 256, s -= 8)
    ;
  for (a = a << s | l, p += s; p > 0; e[n + k] = a & 255, k += O, a /= 256, p -= 8)
    ;
  e[n + k - O] |= rt * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const t = base64Js, n = ieee754, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = l, e.SlowBuffer = ut, e.INSPECT_MAX_BYTES = 50;
  const s = 2147483647;
  e.kMaxLength = s, l.TYPED_ARRAY_SUPPORT = o(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      const b = new Uint8Array(1), h = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(h, Uint8Array.prototype), Object.setPrototypeOf(b, h), b.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(l.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.byteOffset;
    }
  });
  function a(b) {
    if (b > s)
      throw new RangeError('The value "' + b + '" is invalid for option "size"');
    const h = new Uint8Array(b);
    return Object.setPrototypeOf(h, l.prototype), h;
  }
  function l(b, h, m) {
    if (typeof b == "number") {
      if (typeof h == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return _(b);
    }
    return f(b, h, m);
  }
  l.poolSize = 8192;
  function f(b, h, m) {
    if (typeof b == "string")
      return S(b, h);
    if (ArrayBuffer.isView(b))
      return O(b);
    if (b == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
      );
    if (yn(b, ArrayBuffer) || b && yn(b.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (yn(b, SharedArrayBuffer) || b && yn(b.buffer, SharedArrayBuffer)))
      return rt(b, h, m);
    if (typeof b == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const Qe = b.valueOf && b.valueOf();
    if (Qe != null && Qe !== b)
      return l.from(Qe, h, m);
    const ct = st(b);
    if (ct)
      return ct;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof b[Symbol.toPrimitive] == "function")
      return l.from(b[Symbol.toPrimitive]("string"), h, m);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
    );
  }
  l.from = function(b, h, m) {
    return f(b, h, m);
  }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
  function p(b) {
    if (typeof b != "number")
      throw new TypeError('"size" argument must be of type number');
    if (b < 0)
      throw new RangeError('The value "' + b + '" is invalid for option "size"');
  }
  function d(b, h, m) {
    return p(b), b <= 0 ? a(b) : h !== void 0 ? typeof m == "string" ? a(b).fill(h, m) : a(b).fill(h) : a(b);
  }
  l.alloc = function(b, h, m) {
    return d(b, h, m);
  };
  function _(b) {
    return p(b), a(b < 0 ? 0 : ft(b) | 0);
  }
  l.allocUnsafe = function(b) {
    return _(b);
  }, l.allocUnsafeSlow = function(b) {
    return _(b);
  };
  function S(b, h) {
    if ((typeof h != "string" || h === "") && (h = "utf8"), !l.isEncoding(h))
      throw new TypeError("Unknown encoding: " + h);
    const m = dt(b, h) | 0;
    let Qe = a(m);
    const ct = Qe.write(b, h);
    return ct !== m && (Qe = Qe.slice(0, ct)), Qe;
  }
  function k(b) {
    const h = b.length < 0 ? 0 : ft(b.length) | 0, m = a(h);
    for (let Qe = 0; Qe < h; Qe += 1)
      m[Qe] = b[Qe] & 255;
    return m;
  }
  function O(b) {
    if (yn(b, Uint8Array)) {
      const h = new Uint8Array(b);
      return rt(h.buffer, h.byteOffset, h.byteLength);
    }
    return k(b);
  }
  function rt(b, h, m) {
    if (h < 0 || b.byteLength < h)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (b.byteLength < h + (m || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let Qe;
    return h === void 0 && m === void 0 ? Qe = new Uint8Array(b) : m === void 0 ? Qe = new Uint8Array(b, h) : Qe = new Uint8Array(b, h, m), Object.setPrototypeOf(Qe, l.prototype), Qe;
  }
  function st(b) {
    if (l.isBuffer(b)) {
      const h = ft(b.length) | 0, m = a(h);
      return m.length === 0 || b.copy(m, 0, 0, h), m;
    }
    if (b.length !== void 0)
      return typeof b.length != "number" || An(b.length) ? a(0) : k(b);
    if (b.type === "Buffer" && Array.isArray(b.data))
      return k(b.data);
  }
  function ft(b) {
    if (b >= s)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
    return b | 0;
  }
  function ut(b) {
    return +b != b && (b = 0), l.alloc(+b);
  }
  l.isBuffer = function(h) {
    return h != null && h._isBuffer === !0 && h !== l.prototype;
  }, l.compare = function(h, m) {
    if (yn(h, Uint8Array) && (h = l.from(h, h.offset, h.byteLength)), yn(m, Uint8Array) && (m = l.from(m, m.offset, m.byteLength)), !l.isBuffer(h) || !l.isBuffer(m))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (h === m)
      return 0;
    let Qe = h.length, ct = m.length;
    for (let en = 0, rn = Math.min(Qe, ct); en < rn; ++en)
      if (h[en] !== m[en]) {
        Qe = h[en], ct = m[en];
        break;
      }
    return Qe < ct ? -1 : ct < Qe ? 1 : 0;
  }, l.isEncoding = function(h) {
    switch (String(h).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, l.concat = function(h, m) {
    if (!Array.isArray(h))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (h.length === 0)
      return l.alloc(0);
    let Qe;
    if (m === void 0)
      for (m = 0, Qe = 0; Qe < h.length; ++Qe)
        m += h[Qe].length;
    const ct = l.allocUnsafe(m);
    let en = 0;
    for (Qe = 0; Qe < h.length; ++Qe) {
      let rn = h[Qe];
      if (yn(rn, Uint8Array))
        en + rn.length > ct.length ? (l.isBuffer(rn) || (rn = l.from(rn)), rn.copy(ct, en)) : Uint8Array.prototype.set.call(
          ct,
          rn,
          en
        );
      else if (l.isBuffer(rn))
        rn.copy(ct, en);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      en += rn.length;
    }
    return ct;
  };
  function dt(b, h) {
    if (l.isBuffer(b))
      return b.length;
    if (ArrayBuffer.isView(b) || yn(b, ArrayBuffer))
      return b.byteLength;
    if (typeof b != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof b
      );
    const m = b.length, Qe = arguments.length > 2 && arguments[2] === !0;
    if (!Qe && m === 0)
      return 0;
    let ct = !1;
    for (; ; )
      switch (h) {
        case "ascii":
        case "latin1":
        case "binary":
          return m;
        case "utf8":
        case "utf-8":
          return Dn(b).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return m * 2;
        case "hex":
          return m >>> 1;
        case "base64":
          return Nn(b).length;
        default:
          if (ct)
            return Qe ? -1 : Dn(b).length;
          h = ("" + h).toLowerCase(), ct = !0;
      }
  }
  l.byteLength = dt;
  function T(b, h, m) {
    let Qe = !1;
    if ((h === void 0 || h < 0) && (h = 0), h > this.length || ((m === void 0 || m > this.length) && (m = this.length), m <= 0) || (m >>>= 0, h >>>= 0, m <= h))
      return "";
    for (b || (b = "utf8"); ; )
      switch (b) {
        case "hex":
          return bn(this, h, m);
        case "utf8":
        case "utf-8":
          return ln(this, h, m);
        case "ascii":
          return En(this, h, m);
        case "latin1":
        case "binary":
          return Tn(this, h, m);
        case "base64":
          return on(this, h, m);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Mn(this, h, m);
        default:
          if (Qe)
            throw new TypeError("Unknown encoding: " + b);
          b = (b + "").toLowerCase(), Qe = !0;
      }
  }
  l.prototype._isBuffer = !0;
  function nt(b, h, m) {
    const Qe = b[h];
    b[h] = b[m], b[m] = Qe;
  }
  l.prototype.swap16 = function() {
    const h = this.length;
    if (h % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let m = 0; m < h; m += 2)
      nt(this, m, m + 1);
    return this;
  }, l.prototype.swap32 = function() {
    const h = this.length;
    if (h % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let m = 0; m < h; m += 4)
      nt(this, m, m + 3), nt(this, m + 1, m + 2);
    return this;
  }, l.prototype.swap64 = function() {
    const h = this.length;
    if (h % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let m = 0; m < h; m += 8)
      nt(this, m, m + 7), nt(this, m + 1, m + 6), nt(this, m + 2, m + 5), nt(this, m + 3, m + 4);
    return this;
  }, l.prototype.toString = function() {
    const h = this.length;
    return h === 0 ? "" : arguments.length === 0 ? ln(this, 0, h) : T.apply(this, arguments);
  }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(h) {
    if (!l.isBuffer(h))
      throw new TypeError("Argument must be a Buffer");
    return this === h ? !0 : l.compare(this, h) === 0;
  }, l.prototype.inspect = function() {
    let h = "";
    const m = e.INSPECT_MAX_BYTES;
    return h = this.toString("hex", 0, m).replace(/(.{2})/g, "$1 ").trim(), this.length > m && (h += " ... "), "<Buffer " + h + ">";
  }, r && (l.prototype[r] = l.prototype.inspect), l.prototype.compare = function(h, m, Qe, ct, en) {
    if (yn(h, Uint8Array) && (h = l.from(h, h.offset, h.byteLength)), !l.isBuffer(h))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof h
      );
    if (m === void 0 && (m = 0), Qe === void 0 && (Qe = h ? h.length : 0), ct === void 0 && (ct = 0), en === void 0 && (en = this.length), m < 0 || Qe > h.length || ct < 0 || en > this.length)
      throw new RangeError("out of range index");
    if (ct >= en && m >= Qe)
      return 0;
    if (ct >= en)
      return -1;
    if (m >= Qe)
      return 1;
    if (m >>>= 0, Qe >>>= 0, ct >>>= 0, en >>>= 0, this === h)
      return 0;
    let rn = en - ct, an = Qe - m;
    const fn = Math.min(rn, an), un = this.slice(ct, en), pn = h.slice(m, Qe);
    for (let cn = 0; cn < fn; ++cn)
      if (un[cn] !== pn[cn]) {
        rn = un[cn], an = pn[cn];
        break;
      }
    return rn < an ? -1 : an < rn ? 1 : 0;
  };
  function nn(b, h, m, Qe, ct) {
    if (b.length === 0)
      return -1;
    if (typeof m == "string" ? (Qe = m, m = 0) : m > 2147483647 ? m = 2147483647 : m < -2147483648 && (m = -2147483648), m = +m, An(m) && (m = ct ? 0 : b.length - 1), m < 0 && (m = b.length + m), m >= b.length) {
      if (ct)
        return -1;
      m = b.length - 1;
    } else if (m < 0)
      if (ct)
        m = 0;
      else
        return -1;
    if (typeof h == "string" && (h = l.from(h, Qe)), l.isBuffer(h))
      return h.length === 0 ? -1 : lt(b, h, m, Qe, ct);
    if (typeof h == "number")
      return h = h & 255, typeof Uint8Array.prototype.indexOf == "function" ? ct ? Uint8Array.prototype.indexOf.call(b, h, m) : Uint8Array.prototype.lastIndexOf.call(b, h, m) : lt(b, [h], m, Qe, ct);
    throw new TypeError("val must be string, number or Buffer");
  }
  function lt(b, h, m, Qe, ct) {
    let en = 1, rn = b.length, an = h.length;
    if (Qe !== void 0 && (Qe = String(Qe).toLowerCase(), Qe === "ucs2" || Qe === "ucs-2" || Qe === "utf16le" || Qe === "utf-16le")) {
      if (b.length < 2 || h.length < 2)
        return -1;
      en = 2, rn /= 2, an /= 2, m /= 2;
    }
    function fn(pn, cn) {
      return en === 1 ? pn[cn] : pn.readUInt16BE(cn * en);
    }
    let un;
    if (ct) {
      let pn = -1;
      for (un = m; un < rn; un++)
        if (fn(b, un) === fn(h, pn === -1 ? 0 : un - pn)) {
          if (pn === -1 && (pn = un), un - pn + 1 === an)
            return pn * en;
        } else
          pn !== -1 && (un -= un - pn), pn = -1;
    } else
      for (m + an > rn && (m = rn - an), un = m; un >= 0; un--) {
        let pn = !0;
        for (let cn = 0; cn < an; cn++)
          if (fn(b, un + cn) !== fn(h, cn)) {
            pn = !1;
            break;
          }
        if (pn)
          return un;
      }
    return -1;
  }
  l.prototype.includes = function(h, m, Qe) {
    return this.indexOf(h, m, Qe) !== -1;
  }, l.prototype.indexOf = function(h, m, Qe) {
    return nn(this, h, m, Qe, !0);
  }, l.prototype.lastIndexOf = function(h, m, Qe) {
    return nn(this, h, m, Qe, !1);
  };
  function pt(b, h, m, Qe) {
    m = Number(m) || 0;
    const ct = b.length - m;
    Qe ? (Qe = Number(Qe), Qe > ct && (Qe = ct)) : Qe = ct;
    const en = h.length;
    Qe > en / 2 && (Qe = en / 2);
    let rn;
    for (rn = 0; rn < Qe; ++rn) {
      const an = parseInt(h.substr(rn * 2, 2), 16);
      if (An(an))
        return rn;
      b[m + rn] = an;
    }
    return rn;
  }
  function at(b, h, m, Qe) {
    return Rn(Dn(h, b.length - m), b, m, Qe);
  }
  function it(b, h, m, Qe) {
    return Rn(Wn(h), b, m, Qe);
  }
  function ht(b, h, m, Qe) {
    return Rn(Nn(h), b, m, Qe);
  }
  function sn(b, h, m, Qe) {
    return Rn(Hn(h, b.length - m), b, m, Qe);
  }
  l.prototype.write = function(h, m, Qe, ct) {
    if (m === void 0)
      ct = "utf8", Qe = this.length, m = 0;
    else if (Qe === void 0 && typeof m == "string")
      ct = m, Qe = this.length, m = 0;
    else if (isFinite(m))
      m = m >>> 0, isFinite(Qe) ? (Qe = Qe >>> 0, ct === void 0 && (ct = "utf8")) : (ct = Qe, Qe = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const en = this.length - m;
    if ((Qe === void 0 || Qe > en) && (Qe = en), h.length > 0 && (Qe < 0 || m < 0) || m > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    ct || (ct = "utf8");
    let rn = !1;
    for (; ; )
      switch (ct) {
        case "hex":
          return pt(this, h, m, Qe);
        case "utf8":
        case "utf-8":
          return at(this, h, m, Qe);
        case "ascii":
        case "latin1":
        case "binary":
          return it(this, h, m, Qe);
        case "base64":
          return ht(this, h, m, Qe);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return sn(this, h, m, Qe);
        default:
          if (rn)
            throw new TypeError("Unknown encoding: " + ct);
          ct = ("" + ct).toLowerCase(), rn = !0;
      }
  }, l.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function on(b, h, m) {
    return h === 0 && m === b.length ? t.fromByteArray(b) : t.fromByteArray(b.slice(h, m));
  }
  function ln(b, h, m) {
    m = Math.min(b.length, m);
    const Qe = [];
    let ct = h;
    for (; ct < m; ) {
      const en = b[ct];
      let rn = null, an = en > 239 ? 4 : en > 223 ? 3 : en > 191 ? 2 : 1;
      if (ct + an <= m) {
        let fn, un, pn, cn;
        switch (an) {
          case 1:
            en < 128 && (rn = en);
            break;
          case 2:
            fn = b[ct + 1], (fn & 192) === 128 && (cn = (en & 31) << 6 | fn & 63, cn > 127 && (rn = cn));
            break;
          case 3:
            fn = b[ct + 1], un = b[ct + 2], (fn & 192) === 128 && (un & 192) === 128 && (cn = (en & 15) << 12 | (fn & 63) << 6 | un & 63, cn > 2047 && (cn < 55296 || cn > 57343) && (rn = cn));
            break;
          case 4:
            fn = b[ct + 1], un = b[ct + 2], pn = b[ct + 3], (fn & 192) === 128 && (un & 192) === 128 && (pn & 192) === 128 && (cn = (en & 15) << 18 | (fn & 63) << 12 | (un & 63) << 6 | pn & 63, cn > 65535 && cn < 1114112 && (rn = cn));
        }
      }
      rn === null ? (rn = 65533, an = 1) : rn > 65535 && (rn -= 65536, Qe.push(rn >>> 10 & 1023 | 55296), rn = 56320 | rn & 1023), Qe.push(rn), ct += an;
    }
    return _n(Qe);
  }
  const mn = 4096;
  function _n(b) {
    const h = b.length;
    if (h <= mn)
      return String.fromCharCode.apply(String, b);
    let m = "", Qe = 0;
    for (; Qe < h; )
      m += String.fromCharCode.apply(
        String,
        b.slice(Qe, Qe += mn)
      );
    return m;
  }
  function En(b, h, m) {
    let Qe = "";
    m = Math.min(b.length, m);
    for (let ct = h; ct < m; ++ct)
      Qe += String.fromCharCode(b[ct] & 127);
    return Qe;
  }
  function Tn(b, h, m) {
    let Qe = "";
    m = Math.min(b.length, m);
    for (let ct = h; ct < m; ++ct)
      Qe += String.fromCharCode(b[ct]);
    return Qe;
  }
  function bn(b, h, m) {
    const Qe = b.length;
    (!h || h < 0) && (h = 0), (!m || m < 0 || m > Qe) && (m = Qe);
    let ct = "";
    for (let en = h; en < m; ++en)
      ct += Gn[b[en]];
    return ct;
  }
  function Mn(b, h, m) {
    const Qe = b.slice(h, m);
    let ct = "";
    for (let en = 0; en < Qe.length - 1; en += 2)
      ct += String.fromCharCode(Qe[en] + Qe[en + 1] * 256);
    return ct;
  }
  l.prototype.slice = function(h, m) {
    const Qe = this.length;
    h = ~~h, m = m === void 0 ? Qe : ~~m, h < 0 ? (h += Qe, h < 0 && (h = 0)) : h > Qe && (h = Qe), m < 0 ? (m += Qe, m < 0 && (m = 0)) : m > Qe && (m = Qe), m < h && (m = h);
    const ct = this.subarray(h, m);
    return Object.setPrototypeOf(ct, l.prototype), ct;
  };
  function hn(b, h, m) {
    if (b % 1 !== 0 || b < 0)
      throw new RangeError("offset is not uint");
    if (b + h > m)
      throw new RangeError("Trying to access beyond buffer length");
  }
  l.prototype.readUintLE = l.prototype.readUIntLE = function(h, m, Qe) {
    h = h >>> 0, m = m >>> 0, Qe || hn(h, m, this.length);
    let ct = this[h], en = 1, rn = 0;
    for (; ++rn < m && (en *= 256); )
      ct += this[h + rn] * en;
    return ct;
  }, l.prototype.readUintBE = l.prototype.readUIntBE = function(h, m, Qe) {
    h = h >>> 0, m = m >>> 0, Qe || hn(h, m, this.length);
    let ct = this[h + --m], en = 1;
    for (; m > 0 && (en *= 256); )
      ct += this[h + --m] * en;
    return ct;
  }, l.prototype.readUint8 = l.prototype.readUInt8 = function(h, m) {
    return h = h >>> 0, m || hn(h, 1, this.length), this[h];
  }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(h, m) {
    return h = h >>> 0, m || hn(h, 2, this.length), this[h] | this[h + 1] << 8;
  }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(h, m) {
    return h = h >>> 0, m || hn(h, 2, this.length), this[h] << 8 | this[h + 1];
  }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(h, m) {
    return h = h >>> 0, m || hn(h, 4, this.length), (this[h] | this[h + 1] << 8 | this[h + 2] << 16) + this[h + 3] * 16777216;
  }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(h, m) {
    return h = h >>> 0, m || hn(h, 4, this.length), this[h] * 16777216 + (this[h + 1] << 16 | this[h + 2] << 8 | this[h + 3]);
  }, l.prototype.readBigUInt64LE = vn(function(h) {
    h = h >>> 0, kn(h, "offset");
    const m = this[h], Qe = this[h + 7];
    (m === void 0 || Qe === void 0) && On(h, this.length - 8);
    const ct = m + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + this[++h] * 2 ** 24, en = this[++h] + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + Qe * 2 ** 24;
    return BigInt(ct) + (BigInt(en) << BigInt(32));
  }), l.prototype.readBigUInt64BE = vn(function(h) {
    h = h >>> 0, kn(h, "offset");
    const m = this[h], Qe = this[h + 7];
    (m === void 0 || Qe === void 0) && On(h, this.length - 8);
    const ct = m * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + this[++h], en = this[++h] * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + Qe;
    return (BigInt(ct) << BigInt(32)) + BigInt(en);
  }), l.prototype.readIntLE = function(h, m, Qe) {
    h = h >>> 0, m = m >>> 0, Qe || hn(h, m, this.length);
    let ct = this[h], en = 1, rn = 0;
    for (; ++rn < m && (en *= 256); )
      ct += this[h + rn] * en;
    return en *= 128, ct >= en && (ct -= Math.pow(2, 8 * m)), ct;
  }, l.prototype.readIntBE = function(h, m, Qe) {
    h = h >>> 0, m = m >>> 0, Qe || hn(h, m, this.length);
    let ct = m, en = 1, rn = this[h + --ct];
    for (; ct > 0 && (en *= 256); )
      rn += this[h + --ct] * en;
    return en *= 128, rn >= en && (rn -= Math.pow(2, 8 * m)), rn;
  }, l.prototype.readInt8 = function(h, m) {
    return h = h >>> 0, m || hn(h, 1, this.length), this[h] & 128 ? (255 - this[h] + 1) * -1 : this[h];
  }, l.prototype.readInt16LE = function(h, m) {
    h = h >>> 0, m || hn(h, 2, this.length);
    const Qe = this[h] | this[h + 1] << 8;
    return Qe & 32768 ? Qe | 4294901760 : Qe;
  }, l.prototype.readInt16BE = function(h, m) {
    h = h >>> 0, m || hn(h, 2, this.length);
    const Qe = this[h + 1] | this[h] << 8;
    return Qe & 32768 ? Qe | 4294901760 : Qe;
  }, l.prototype.readInt32LE = function(h, m) {
    return h = h >>> 0, m || hn(h, 4, this.length), this[h] | this[h + 1] << 8 | this[h + 2] << 16 | this[h + 3] << 24;
  }, l.prototype.readInt32BE = function(h, m) {
    return h = h >>> 0, m || hn(h, 4, this.length), this[h] << 24 | this[h + 1] << 16 | this[h + 2] << 8 | this[h + 3];
  }, l.prototype.readBigInt64LE = vn(function(h) {
    h = h >>> 0, kn(h, "offset");
    const m = this[h], Qe = this[h + 7];
    (m === void 0 || Qe === void 0) && On(h, this.length - 8);
    const ct = this[h + 4] + this[h + 5] * 2 ** 8 + this[h + 6] * 2 ** 16 + (Qe << 24);
    return (BigInt(ct) << BigInt(32)) + BigInt(m + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + this[++h] * 2 ** 24);
  }), l.prototype.readBigInt64BE = vn(function(h) {
    h = h >>> 0, kn(h, "offset");
    const m = this[h], Qe = this[h + 7];
    (m === void 0 || Qe === void 0) && On(h, this.length - 8);
    const ct = (m << 24) + // Overflow
    this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + this[++h];
    return (BigInt(ct) << BigInt(32)) + BigInt(this[++h] * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + Qe);
  }), l.prototype.readFloatLE = function(h, m) {
    return h = h >>> 0, m || hn(h, 4, this.length), n.read(this, h, !0, 23, 4);
  }, l.prototype.readFloatBE = function(h, m) {
    return h = h >>> 0, m || hn(h, 4, this.length), n.read(this, h, !1, 23, 4);
  }, l.prototype.readDoubleLE = function(h, m) {
    return h = h >>> 0, m || hn(h, 8, this.length), n.read(this, h, !0, 52, 8);
  }, l.prototype.readDoubleBE = function(h, m) {
    return h = h >>> 0, m || hn(h, 8, this.length), n.read(this, h, !1, 52, 8);
  };
  function dn(b, h, m, Qe, ct, en) {
    if (!l.isBuffer(b))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (h > ct || h < en)
      throw new RangeError('"value" argument is out of bounds');
    if (m + Qe > b.length)
      throw new RangeError("Index out of range");
  }
  l.prototype.writeUintLE = l.prototype.writeUIntLE = function(h, m, Qe, ct) {
    if (h = +h, m = m >>> 0, Qe = Qe >>> 0, !ct) {
      const an = Math.pow(2, 8 * Qe) - 1;
      dn(this, h, m, Qe, an, 0);
    }
    let en = 1, rn = 0;
    for (this[m] = h & 255; ++rn < Qe && (en *= 256); )
      this[m + rn] = h / en & 255;
    return m + Qe;
  }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(h, m, Qe, ct) {
    if (h = +h, m = m >>> 0, Qe = Qe >>> 0, !ct) {
      const an = Math.pow(2, 8 * Qe) - 1;
      dn(this, h, m, Qe, an, 0);
    }
    let en = Qe - 1, rn = 1;
    for (this[m + en] = h & 255; --en >= 0 && (rn *= 256); )
      this[m + en] = h / rn & 255;
    return m + Qe;
  }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 1, 255, 0), this[m] = h & 255, m + 1;
  }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 2, 65535, 0), this[m] = h & 255, this[m + 1] = h >>> 8, m + 2;
  }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 2, 65535, 0), this[m] = h >>> 8, this[m + 1] = h & 255, m + 2;
  }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 4, 4294967295, 0), this[m + 3] = h >>> 24, this[m + 2] = h >>> 16, this[m + 1] = h >>> 8, this[m] = h & 255, m + 4;
  }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 4, 4294967295, 0), this[m] = h >>> 24, this[m + 1] = h >>> 16, this[m + 2] = h >>> 8, this[m + 3] = h & 255, m + 4;
  };
  function Cn(b, h, m, Qe, ct) {
    Fn(h, Qe, ct, b, m, 7);
    let en = Number(h & BigInt(4294967295));
    b[m++] = en, en = en >> 8, b[m++] = en, en = en >> 8, b[m++] = en, en = en >> 8, b[m++] = en;
    let rn = Number(h >> BigInt(32) & BigInt(4294967295));
    return b[m++] = rn, rn = rn >> 8, b[m++] = rn, rn = rn >> 8, b[m++] = rn, rn = rn >> 8, b[m++] = rn, m;
  }
  function xn(b, h, m, Qe, ct) {
    Fn(h, Qe, ct, b, m, 7);
    let en = Number(h & BigInt(4294967295));
    b[m + 7] = en, en = en >> 8, b[m + 6] = en, en = en >> 8, b[m + 5] = en, en = en >> 8, b[m + 4] = en;
    let rn = Number(h >> BigInt(32) & BigInt(4294967295));
    return b[m + 3] = rn, rn = rn >> 8, b[m + 2] = rn, rn = rn >> 8, b[m + 1] = rn, rn = rn >> 8, b[m] = rn, m + 8;
  }
  l.prototype.writeBigUInt64LE = vn(function(h, m = 0) {
    return Cn(this, h, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeBigUInt64BE = vn(function(h, m = 0) {
    return xn(this, h, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeIntLE = function(h, m, Qe, ct) {
    if (h = +h, m = m >>> 0, !ct) {
      const fn = Math.pow(2, 8 * Qe - 1);
      dn(this, h, m, Qe, fn - 1, -fn);
    }
    let en = 0, rn = 1, an = 0;
    for (this[m] = h & 255; ++en < Qe && (rn *= 256); )
      h < 0 && an === 0 && this[m + en - 1] !== 0 && (an = 1), this[m + en] = (h / rn >> 0) - an & 255;
    return m + Qe;
  }, l.prototype.writeIntBE = function(h, m, Qe, ct) {
    if (h = +h, m = m >>> 0, !ct) {
      const fn = Math.pow(2, 8 * Qe - 1);
      dn(this, h, m, Qe, fn - 1, -fn);
    }
    let en = Qe - 1, rn = 1, an = 0;
    for (this[m + en] = h & 255; --en >= 0 && (rn *= 256); )
      h < 0 && an === 0 && this[m + en + 1] !== 0 && (an = 1), this[m + en] = (h / rn >> 0) - an & 255;
    return m + Qe;
  }, l.prototype.writeInt8 = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 1, 127, -128), h < 0 && (h = 255 + h + 1), this[m] = h & 255, m + 1;
  }, l.prototype.writeInt16LE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 2, 32767, -32768), this[m] = h & 255, this[m + 1] = h >>> 8, m + 2;
  }, l.prototype.writeInt16BE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 2, 32767, -32768), this[m] = h >>> 8, this[m + 1] = h & 255, m + 2;
  }, l.prototype.writeInt32LE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 4, 2147483647, -2147483648), this[m] = h & 255, this[m + 1] = h >>> 8, this[m + 2] = h >>> 16, this[m + 3] = h >>> 24, m + 4;
  }, l.prototype.writeInt32BE = function(h, m, Qe) {
    return h = +h, m = m >>> 0, Qe || dn(this, h, m, 4, 2147483647, -2147483648), h < 0 && (h = 4294967295 + h + 1), this[m] = h >>> 24, this[m + 1] = h >>> 16, this[m + 2] = h >>> 8, this[m + 3] = h & 255, m + 4;
  }, l.prototype.writeBigInt64LE = vn(function(h, m = 0) {
    return Cn(this, h, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), l.prototype.writeBigInt64BE = vn(function(h, m = 0) {
    return xn(this, h, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function In(b, h, m, Qe, ct, en) {
    if (m + Qe > b.length)
      throw new RangeError("Index out of range");
    if (m < 0)
      throw new RangeError("Index out of range");
  }
  function $n(b, h, m, Qe, ct) {
    return h = +h, m = m >>> 0, ct || In(b, h, m, 4), n.write(b, h, m, Qe, 23, 4), m + 4;
  }
  l.prototype.writeFloatLE = function(h, m, Qe) {
    return $n(this, h, m, !0, Qe);
  }, l.prototype.writeFloatBE = function(h, m, Qe) {
    return $n(this, h, m, !1, Qe);
  };
  function Un(b, h, m, Qe, ct) {
    return h = +h, m = m >>> 0, ct || In(b, h, m, 8), n.write(b, h, m, Qe, 52, 8), m + 8;
  }
  l.prototype.writeDoubleLE = function(h, m, Qe) {
    return Un(this, h, m, !0, Qe);
  }, l.prototype.writeDoubleBE = function(h, m, Qe) {
    return Un(this, h, m, !1, Qe);
  }, l.prototype.copy = function(h, m, Qe, ct) {
    if (!l.isBuffer(h))
      throw new TypeError("argument should be a Buffer");
    if (Qe || (Qe = 0), !ct && ct !== 0 && (ct = this.length), m >= h.length && (m = h.length), m || (m = 0), ct > 0 && ct < Qe && (ct = Qe), ct === Qe || h.length === 0 || this.length === 0)
      return 0;
    if (m < 0)
      throw new RangeError("targetStart out of bounds");
    if (Qe < 0 || Qe >= this.length)
      throw new RangeError("Index out of range");
    if (ct < 0)
      throw new RangeError("sourceEnd out of bounds");
    ct > this.length && (ct = this.length), h.length - m < ct - Qe && (ct = h.length - m + Qe);
    const en = ct - Qe;
    return this === h && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(m, Qe, ct) : Uint8Array.prototype.set.call(
      h,
      this.subarray(Qe, ct),
      m
    ), en;
  }, l.prototype.fill = function(h, m, Qe, ct) {
    if (typeof h == "string") {
      if (typeof m == "string" ? (ct = m, m = 0, Qe = this.length) : typeof Qe == "string" && (ct = Qe, Qe = this.length), ct !== void 0 && typeof ct != "string")
        throw new TypeError("encoding must be a string");
      if (typeof ct == "string" && !l.isEncoding(ct))
        throw new TypeError("Unknown encoding: " + ct);
      if (h.length === 1) {
        const rn = h.charCodeAt(0);
        (ct === "utf8" && rn < 128 || ct === "latin1") && (h = rn);
      }
    } else
      typeof h == "number" ? h = h & 255 : typeof h == "boolean" && (h = Number(h));
    if (m < 0 || this.length < m || this.length < Qe)
      throw new RangeError("Out of range index");
    if (Qe <= m)
      return this;
    m = m >>> 0, Qe = Qe === void 0 ? this.length : Qe >>> 0, h || (h = 0);
    let en;
    if (typeof h == "number")
      for (en = m; en < Qe; ++en)
        this[en] = h;
    else {
      const rn = l.isBuffer(h) ? h : l.from(h, ct), an = rn.length;
      if (an === 0)
        throw new TypeError('The value "' + h + '" is invalid for argument "value"');
      for (en = 0; en < Qe - m; ++en)
        this[en + m] = rn[en % an];
    }
    return this;
  };
  const Sn = {};
  function Pn(b, h, m) {
    Sn[b] = class extends m {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: h.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${b}]`, this.stack, delete this.name;
      }
      get code() {
        return b;
      }
      set code(ct) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: ct,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${b}]: ${this.message}`;
      }
    };
  }
  Pn(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(b) {
      return b ? `${b} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), Pn(
    "ERR_INVALID_ARG_TYPE",
    function(b, h) {
      return `The "${b}" argument must be of type number. Received type ${typeof h}`;
    },
    TypeError
  ), Pn(
    "ERR_OUT_OF_RANGE",
    function(b, h, m) {
      let Qe = `The value of "${b}" is out of range.`, ct = m;
      return Number.isInteger(m) && Math.abs(m) > 2 ** 32 ? ct = jn(String(m)) : typeof m == "bigint" && (ct = String(m), (m > BigInt(2) ** BigInt(32) || m < -(BigInt(2) ** BigInt(32))) && (ct = jn(ct)), ct += "n"), Qe += ` It must be ${h}. Received ${ct}`, Qe;
    },
    RangeError
  );
  function jn(b) {
    let h = "", m = b.length;
    const Qe = b[0] === "-" ? 1 : 0;
    for (; m >= Qe + 4; m -= 3)
      h = `_${b.slice(m - 3, m)}${h}`;
    return `${b.slice(0, m)}${h}`;
  }
  function Bn(b, h, m) {
    kn(h, "offset"), (b[h] === void 0 || b[h + m] === void 0) && On(h, b.length - (m + 1));
  }
  function Fn(b, h, m, Qe, ct, en) {
    if (b > m || b < h) {
      const rn = typeof h == "bigint" ? "n" : "";
      let an;
      throw en > 3 ? h === 0 || h === BigInt(0) ? an = `>= 0${rn} and < 2${rn} ** ${(en + 1) * 8}${rn}` : an = `>= -(2${rn} ** ${(en + 1) * 8 - 1}${rn}) and < 2 ** ${(en + 1) * 8 - 1}${rn}` : an = `>= ${h}${rn} and <= ${m}${rn}`, new Sn.ERR_OUT_OF_RANGE("value", an, b);
    }
    Bn(Qe, ct, en);
  }
  function kn(b, h) {
    if (typeof b != "number")
      throw new Sn.ERR_INVALID_ARG_TYPE(h, "number", b);
  }
  function On(b, h, m) {
    throw Math.floor(b) !== b ? (kn(b, m), new Sn.ERR_OUT_OF_RANGE(m || "offset", "an integer", b)) : h < 0 ? new Sn.ERR_BUFFER_OUT_OF_BOUNDS() : new Sn.ERR_OUT_OF_RANGE(
      m || "offset",
      `>= ${m ? 1 : 0} and <= ${h}`,
      b
    );
  }
  const qn = /[^+/0-9A-Za-z-_]/g;
  function Yn(b) {
    if (b = b.split("=")[0], b = b.trim().replace(qn, ""), b.length < 2)
      return "";
    for (; b.length % 4 !== 0; )
      b = b + "=";
    return b;
  }
  function Dn(b, h) {
    h = h || 1 / 0;
    let m;
    const Qe = b.length;
    let ct = null;
    const en = [];
    for (let rn = 0; rn < Qe; ++rn) {
      if (m = b.charCodeAt(rn), m > 55295 && m < 57344) {
        if (!ct) {
          if (m > 56319) {
            (h -= 3) > -1 && en.push(239, 191, 189);
            continue;
          } else if (rn + 1 === Qe) {
            (h -= 3) > -1 && en.push(239, 191, 189);
            continue;
          }
          ct = m;
          continue;
        }
        if (m < 56320) {
          (h -= 3) > -1 && en.push(239, 191, 189), ct = m;
          continue;
        }
        m = (ct - 55296 << 10 | m - 56320) + 65536;
      } else
        ct && (h -= 3) > -1 && en.push(239, 191, 189);
      if (ct = null, m < 128) {
        if ((h -= 1) < 0)
          break;
        en.push(m);
      } else if (m < 2048) {
        if ((h -= 2) < 0)
          break;
        en.push(
          m >> 6 | 192,
          m & 63 | 128
        );
      } else if (m < 65536) {
        if ((h -= 3) < 0)
          break;
        en.push(
          m >> 12 | 224,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else if (m < 1114112) {
        if ((h -= 4) < 0)
          break;
        en.push(
          m >> 18 | 240,
          m >> 12 & 63 | 128,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return en;
  }
  function Wn(b) {
    const h = [];
    for (let m = 0; m < b.length; ++m)
      h.push(b.charCodeAt(m) & 255);
    return h;
  }
  function Hn(b, h) {
    let m, Qe, ct;
    const en = [];
    for (let rn = 0; rn < b.length && !((h -= 2) < 0); ++rn)
      m = b.charCodeAt(rn), Qe = m >> 8, ct = m % 256, en.push(ct), en.push(Qe);
    return en;
  }
  function Nn(b) {
    return t.toByteArray(Yn(b));
  }
  function Rn(b, h, m, Qe) {
    let ct;
    for (ct = 0; ct < Qe && !(ct + m >= h.length || ct >= b.length); ++ct)
      h[ct + m] = b[ct];
    return ct;
  }
  function yn(b, h) {
    return b instanceof h || b != null && b.constructor != null && b.constructor.name != null && b.constructor.name === h.name;
  }
  function An(b) {
    return b !== b;
  }
  const Gn = function() {
    const b = "0123456789abcdef", h = new Array(256);
    for (let m = 0; m < 16; ++m) {
      const Qe = m * 16;
      for (let ct = 0; ct < 16; ++ct)
        h[Qe + ct] = b[m] + b[ct];
    }
    return h;
  }();
  function vn(b) {
    return typeof BigInt > "u" ? Vn : b;
  }
  function Vn() {
    throw new Error("BigInt not supported");
  }
})(buffer);
globalThis.Buffer = buffer.Buffer;
function dataURL2blob(e) {
  const t = parser(e);
  if (t)
    return new Blob(
      [t.toBuffer()],
      { type: t.contentType }
    );
}
function base64ToBlob(e, t) {
  const n = `data:${t};base64,${e}`;
  return dataURL2blob(n);
}
function base64ToFile(e, t, n) {
  const r = base64ToBlob(e, t);
  if (r)
    return new File([r], n, {
      type: t
    });
}
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  clear() {
    this.items = [];
  }
  enqueue(t, n) {
    const r = {
      value: t,
      priority: n
    };
    return this.items.push(r), this.items.sort((s, o) => s.priority - o.priority), r;
  }
  dequeue() {
    return this.items.shift();
  }
  peek() {
    return this.items[0];
  }
  rear() {
    return this.items.at(-1);
  }
  empty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}
function isEmptyObject(e) {
  return Object.keys(e).length === 0;
}
function isString(e) {
  return Object.prototype.toString.call(e) === "[object String]";
}
function ansiRegex({ onlyFirst: e = !1 } = {}) {
  const t = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(t, e ? void 0 : "g");
}
const regex = ansiRegex();
function stripAnsi(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  return e.replace(regex, "");
}
const _hasbtoa = typeof btoa == "function", _hasBuffer = typeof Buffer == "function";
typeof TextDecoder == "function" && new TextDecoder();
const _TE = typeof TextEncoder == "function" ? new TextEncoder() : void 0, b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", b64chs = Array.prototype.slice.call(b64ch);
((e) => {
  let t = {};
  return e.forEach((n, r) => t[n] = r), t;
})(b64chs);
const _fromCC = String.fromCharCode.bind(String);
typeof Uint8Array.from == "function" && Uint8Array.from.bind(Uint8Array);
const _mkUriSafe = (e) => e.replace(/=/g, "").replace(/[+\/]/g, (t) => t == "+" ? "-" : "_"), btoaPolyfill = (e) => {
  let t, n, r, s, o = "";
  const a = e.length % 3;
  for (let l = 0; l < e.length; ) {
    if ((n = e.charCodeAt(l++)) > 255 || (r = e.charCodeAt(l++)) > 255 || (s = e.charCodeAt(l++)) > 255)
      throw new TypeError("invalid character found");
    t = n << 16 | r << 8 | s, o += b64chs[t >> 18 & 63] + b64chs[t >> 12 & 63] + b64chs[t >> 6 & 63] + b64chs[t & 63];
  }
  return a ? o.slice(0, a - 3) + "===".substring(a) : o;
}, _btoa = _hasbtoa ? (e) => btoa(e) : _hasBuffer ? (e) => Buffer.from(e, "binary").toString("base64") : btoaPolyfill, _fromUint8Array = _hasBuffer ? (e) => Buffer.from(e).toString("base64") : (e) => {
  let n = [];
  for (let r = 0, s = e.length; r < s; r += 4096)
    n.push(_fromCC.apply(null, e.subarray(r, r + 4096)));
  return _btoa(n.join(""));
}, cb_utob = (e) => {
  if (e.length < 2) {
    var t = e.charCodeAt(0);
    return t < 128 ? e : t < 2048 ? _fromCC(192 | t >>> 6) + _fromCC(128 | t & 63) : _fromCC(224 | t >>> 12 & 15) + _fromCC(128 | t >>> 6 & 63) + _fromCC(128 | t & 63);
  } else {
    var t = 65536 + (e.charCodeAt(0) - 55296) * 1024 + (e.charCodeAt(1) - 56320);
    return _fromCC(240 | t >>> 18 & 7) + _fromCC(128 | t >>> 12 & 63) + _fromCC(128 | t >>> 6 & 63) + _fromCC(128 | t & 63);
  }
}, re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, utob = (e) => e.replace(re_utob, cb_utob), _encode = _hasBuffer ? (e) => Buffer.from(e, "utf8").toString("base64") : _TE ? (e) => _fromUint8Array(_TE.encode(e)) : (e) => _btoa(utob(e)), encode$1 = (e, t = !1) => t ? _mkUriSafe(_encode(e)) : _encode(e);
function xtermElement(e, t, n) {
  const r = {};
  t && (r["data-block-id"] = t), n && (r["data-save"] = "true");
  const s = Object.entries(r).map(([f, p]) => `${f}="${p}"`).join(" "), o = {
    id: "content",
    "data-stream": encode$1(e, !0)
  }, a = Object.entries(o).map(([f, p]) => `${f}="${p}"`).join(" "), l = escape(
    // 转义 HTML
    trimSuffix(
      // 移除末尾的换行符
      trimPrefix(
        // 移除开头的换行符
        stripAnsi(e).replaceAll(/\n+/g, `
`),
        // 移除多余的换行符
        `
`
      ),
      `
`
    )
  );
  return [
    "<div>",
    `<jupyter-xterm-output ${s}>`,
    `<pre ${a}>
${l}
</pre>`,
    "</jupyter-xterm-output>",
    "</div>"
  ].join(`
`);
}
const wn = class wn {
  /* 构造函数 */
  constructor(t) {
    this.text = t;
  }
  toString() {
    return this.text;
  }
  /* 👇可链式调用的方法👇 */
  /**
   * 构建 xterm 元素
   * @param blockId 块 ID
   */
  buildXtermElement(t) {
    return this.text = xtermElement(
      this.text,
      t
    ), this;
  }
  /**
   * 转义 Markdown 标志符
   */
  escapeMark() {
    return this.text = this.text.replaceAll(wn.REGEXP.mark, "\\$1"), this;
  }
  /**
   * 解析控制字符
   * @param src 原字符串
   */
  parseControlChars(t = "") {
    const n = [...t], r = this.text.replaceAll(`\r
`, `
`), s = r.length;
    let o = n.length, a = t.lastIndexOf(`
`) + 1;
    for (let l = 0; l < s; ++l) {
      const f = r[l];
      switch (f) {
        case "\b":
          o > a && o--;
          break;
        case "\r":
          o = a;
          break;
        case `
`:
          a = o + 1;
        default:
          n[o++] = f;
          break;
      }
    }
    return this.text = n.slice(0, o).join(""), this;
  }
  /**
   * 解析控制台控制字符
   * @param escaped Markdown 标志字符是否被转义
   */
  parseCmdControlChars(t = !0) {
    const n = t ? wn.REGEXP.escaped.richtext : wn.REGEXP.richtext, r = {
      strong: !1,
      // 加粗
      em: !1,
      // 倾斜
      s: !1,
      // 删除线
      u: !1
      // 下划线
    }, s = {
      ground: "",
      mode: 0,
      color: ""
    };
    var o = {};
    const a = () => {
      s.ground = "", s.mode = 0, s.color = "";
    }, l = () => {
      a(), r.strong = !1, r.em = !1, r.s = !1, r.u = !1, o = {};
    };
    return this.text = this.text.replaceAll(/\x1bc/g, "").replaceAll(/\x1b\\?\[\\?\?\d+[lh]/g, "").replaceAll(/\x1b\\?\[\d*(\\?;\d+)*[a-ln-zA-Z]/g, "").replaceAll(
      n,
      (f, p, d, _, S) => {
        let k = "";
        const O = p.replaceAll("\\;", ";").split(";");
        for (const ut of O) {
          const dt = parseInt(ut) || 0;
          if (s.mode) {
            if (dt >= 0 && dt <= 255)
              switch (s.mode) {
                case 2:
                  switch (s.color.startsWith("#") || (s.color = "#"), s.color.length) {
                    case 1:
                    case 3:
                      s.color += dt.toString(16).toUpperCase().padStart(2, "0");
                      continue;
                    case 5:
                      s.color += dt.toString(16).toUpperCase().padStart(2, "0"), s.ground && (o[s.ground] = s.color);
                      break;
                  }
                  break;
                case 5:
                  s.color = `var(--custom-jupyter-256-color-${dt.toString().padStart(3, "0")})`, s.ground && (o[s.ground] = s.color);
                  break;
              }
            a();
          } else
            switch (dt) {
              case 0:
                l();
                continue;
              case 1:
                r.strong = !0;
                break;
              case 2:
                if (s.ground) {
                  s.mode = 2;
                  continue;
                }
                o.opacity = "var(--custom-jupyter-opacity-dull)";
                break;
              case 3:
                r.em = !0;
                break;
              case 4:
                r.u = !0;
                break;
              case 5:
                if (s.ground) {
                  s.mode = 5;
                  continue;
                }
                o.animation = "var(--custom-jupyter-animation-breath)";
                break;
              case 6:
                o.animation = "var(--custom-jupyter-animation-blink)";
                break;
              case 7:
                o.filter = "var(--custom-jupyter-filter-invert)";
                break;
              case 8:
                o.opacity = "var(--custom-jupyter-opacity-transparent)";
                break;
              case 9:
                r.s = !0;
                break;
              default: {
                let T;
                const nt = dt / 10 | 0, nn = dt % 10;
                switch (nt) {
                  case 1:
                    continue;
                  case 2:
                    switch (nn) {
                      case 0:
                        break;
                      case 1:
                        r.strong = !1;
                        break;
                      case 2:
                        delete o.opacity;
                        break;
                      case 3:
                        r.em = !1;
                        break;
                      case 4:
                        r.u = !1;
                        break;
                      case 5:
                        delete o.animation;
                        break;
                      case 6:
                        delete o.animation;
                        break;
                      case 7:
                        delete o.filter;
                        break;
                      case 8:
                        delete o.opacity;
                        break;
                      case 9:
                        r.s = !1;
                        break;
                    }
                    continue;
                  case 3:
                  case 9:
                    T = "color";
                    break;
                  case 4:
                  case 10:
                    T = "background-color";
                    break;
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                  default:
                    continue;
                }
                switch (nt) {
                  case 3:
                  case 4:
                    switch (nn) {
                      case 0:
                        o[T] = "var(--custom-jupyter-ansi-color-black)";
                        break;
                      case 1:
                        o[T] = "var(--custom-jupyter-ansi-color-red)";
                        break;
                      case 2:
                        o[T] = "var(--custom-jupyter-ansi-color-green)";
                        break;
                      case 3:
                        o[T] = "var(--custom-jupyter-ansi-color-yellow)";
                        break;
                      case 4:
                        o[T] = "var(--custom-jupyter-ansi-color-blue)";
                        break;
                      case 5:
                        o[T] = "var(--custom-jupyter-ansi-color-magenta)";
                        break;
                      case 6:
                        o[T] = "var(--custom-jupyter-ansi-color-cyan)";
                        break;
                      case 7:
                        o[T] = "var(--custom-jupyter-ansi-color-white)";
                        break;
                      case 8:
                        s.ground = T;
                        continue;
                      case 9:
                      default:
                        delete o[T];
                        break;
                    }
                    continue;
                  case 9:
                  case 10:
                    switch (nn) {
                      case 0:
                        o[T] = "var(--custom-jupyter-ansi-color-black-intense)";
                        break;
                      case 1:
                        o[T] = "var(--custom-jupyter-ansi-color-red-intense)";
                        break;
                      case 2:
                        o[T] = "var(--custom-jupyter-ansi-color-green-intense)";
                        break;
                      case 3:
                        o[T] = "var(--custom-jupyter-ansi-color-yellow-intense)";
                        break;
                      case 4:
                        o[T] = "var(--custom-jupyter-ansi-color-blue-intense)";
                        break;
                      case 5:
                        o[T] = "var(--custom-jupyter-ansi-color-magenta-intense)";
                        break;
                      case 6:
                        o[T] = "var(--custom-jupyter-ansi-color-cyan-intense)";
                        break;
                      case 7:
                        o[T] = "var(--custom-jupyter-ansi-color-white-intense)";
                        break;
                      case 8:
                        s.ground = T;
                        continue;
                      case 9:
                      default:
                        delete o[T];
                        break;
                    }
                    continue;
                  default:
                    continue;
                }
                continue;
              }
            }
        }
        const rt = [];
        r.strong && rt.push("strong"), r.em && rt.push("em"), r.s && rt.push("s"), r.u && rt.push("u"), isEmptyObject(o) || rt.push("text");
        const st = rt.length > 0 ? `<span data-type="${rt.join(" ")}">` : "", ft = rt.length > 0 ? "</span>" : "";
        return isEmptyObject(o) || (k = createIAL({ style: createStyle(o) })), d.replaceAll(`\r
`, `
`).replaceAll(/\n{2,}/g, `

`).split(`

`).map(
          (ut) => wn.ZWS + ut.split(`
`).map((dt) => dt.length > 0 ? (rt.length > 0 && t && (dt = dt.replaceAll(wn.REGEXP.escaped.mark, "$1")), `${st}${dt}${ft}${k}`) : "").join(`
`)
        ).join(`

`);
      }
    ), this;
  }
  /* 移除控制台 ANSI 转义序列(保留 \b, \r) */
  removeCmdControlChars() {
    return this.text = this.text.replaceAll(wn.REGEXP.ANSIesc, ""), this;
  }
  /**
   * 移除控制台 ANSI 转义序列
   * @see {@link https://www.npmjs.com/package/strip-ansi}
   */
  stripAnsi() {
    return this.text = stripAnsi(this.text), this;
  }
};
gn(wn, "ZWS", "​"), // 零宽空格
gn(wn, "REGEXP", {
  // 正则表达式
  mark: /([\<\>\{\}\[\]\(\)\`\~\#\$\^\*\_\=\|\:\-\\])/g,
  // 匹配需转义的 Markdown 标志符号
  ANSIesc: /\x1b[^a-zA-Z]*[a-zA-Z]/g,
  // ANSI 转义序列
  richtext: /\x1b\\?\[((?:\d*)(?:\\?;\d+)*)m([^\x1b]*)/g,
  // 控制台富文本控制字符
  escaped: {
    mark: /(?:\\([\<\>\{\}\[\]\(\)\`\~\#\$\^\*\_\=\|\:\-\\]))/g,
    // 匹配被转义的 Markdown 标志符号
    richtext: /\x1b\\\[((?:\d*)(?:\\?;\d+)*)m([^\x1b]*)/g
    // 被转义的控制台富文本控制字符
  }
});
let Output = wn;
function parseText(e = "", t, n) {
  const r = new Output(e);
  return t.xterm ? r.buildXtermElement(n) : (t.escaped && r.escapeMark(), t.cntrl ? r.parseCmdControlChars(t.escaped) : r.removeCmdControlChars()), r.toString();
}
async function parseData(e, t, n, r) {
  let s;
  const o = new PriorityQueue();
  for (const [a, l] of Object.entries(n)) {
    if (Array.isArray(l) && l.length === 0)
      continue;
    const f = a.split(";")[0], p = f.split("/")[0], d = f.split("/")[1], _ = d.split("+")[0];
    d.split("+")[1];
    const S = Array.isArray(l) ? l.join(`
`) : l;
    switch (p) {
      case "text":
        const k = Array.isArray(S) ? S.join(`

`) : S;
        switch (d) {
          case "plain":
            o.enqueue(parseText(k, t), 0);
            break;
          case "html":
            o.enqueue(`<div>${k}</div>`, 1);
            break;
          case "markdown":
            o.enqueue(k, 1);
            break;
          default:
            o.enqueue(`\`\`\`${_}
${k}
\`\`\``, 2);
            break;
        }
        break;
      case "image": {
        switch (d) {
          case "svg+xml":
            s = btoa(S);
            break;
          default:
            s = S.split(`
`)[0];
            break;
        }
        const O = n["text/plain"], rt = Array.isArray(O) ? O.join(" ") : O, st = `jupyter-output.${_}`, ft = base64ToFile(s, a, st);
        if (ft) {
          const dt = (await e.upload({ files: [ft] })).data.succMap[st], T = r != null && r.needs_background ? createIAL({
            style: createStyle({
              background: r.needs_background === "light" ? "white" : "black"
            })
          }) : "";
          dt && o.enqueue(`![${st}](${dt}${isString(rt) ? ` "${rt.replaceAll('"', "&quot;")}"` : ""})${T}`, 3);
        }
        break;
      }
      case "audio": {
        switch (d) {
          default:
            s = S.split(`
`)[0];
            break;
        }
        const O = `jupyter-output.${_}`, rt = base64ToFile(s, a, O);
        if (rt) {
          const ft = (await e.upload({ files: [rt] })).data.succMap[O];
          ft && o.enqueue(`<audio controls="controls" src="${ft}" data-src="${ft}"/>`, 3);
        }
        break;
      }
      case "video":
        {
          switch (d) {
            default:
              s = S.split(`
`)[0];
              break;
          }
          const O = `jupyter-output.${_}`, rt = base64ToFile(s, a, O);
          if (rt) {
            const ft = (await e.upload({ files: [rt] })).data.succMap[O];
            ft && o.enqueue(`<video controls="controls" src="${ft}" data-src="${ft}"/>`, 3);
          }
        }
        break;
      case "application":
        switch (d) {
          case "json":
            o.enqueue(`\`\`\`json
${JSON.stringify(S, void 0, 4)}
\`\`\``, 4);
            break;
          default:
            o.enqueue(parseText(`[${a}]`, t), 4);
            break;
        }
        break;
      default:
        o.enqueue(parseText(`[${a}]`, t), 4);
        break;
    }
  }
  return o.items.map((a) => a.value).join(`
`);
}
class IpynbImport {
  // 导入的文档块属性
  constructor(t, n) {
    gn(this, "ipynb");
    // 文件内容
    gn(this, "cells");
    // 内容块
    gn(this, "language");
    // 单元格语言
    gn(this, "metadata");
    // notebook 元数据
    gn(this, "nbformat");
    // 缩进长度
    gn(this, "nbformat_minor");
    // 次要缩进长度
    gn(this, "kramdowns");
    // 导入的 kramdown 字符串数组
    gn(this, "attributes");
    this.client = t, this.config = n;
  }
  /* 从文件导入 */
  async loadFile(t) {
    const n = await t.text();
    return this.loadJson(n);
  }
  /* 导入 json 文本内容 */
  loadJson(t) {
    return this.loadIpynb(JSON.parse(t));
  }
  /* 导入 ipynb json 对象 */
  loadIpynb(t) {
    return this.ipynb = t, this;
  }
  /**
   * 解析
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#top-level-structure
   */
  async parse() {
    return this.kramdowns = [], this.attributes = {}, this.cells = this.ipynb.cells, this.metadata = this.ipynb.metadata, this.nbformat = this.ipynb.nbformat, this.nbformat_minor = this.ipynb.nbformat_minor, this.parseMetadata(), await this.parseCells(), this;
  }
  /* 获取新的块 ID */
  get id() {
    return id();
  }
  /* 获取转换后的 kramdown */
  get kramdown() {
    return this.kramdowns.join(`

`);
  }
  /* 获取文档块属性 */
  get attrs() {
    return this.attributes;
  }
  /**
   * 解析文档元数据
   * REF: https://jupyter-client.readthedocs.io/en/stable/kernels.html#kernel-specs
   */
  parseMetadata() {
    var r, s, o, a, l, f;
    this.language = ((r = this.metadata.kernelspec) == null ? void 0 : r.language) ?? ((s = this.metadata.language_info) == null ? void 0 : s.name) ?? ((o = this.metadata.language_info) == null ? void 0 : o.nbconvert_exporter), this.attributes[CONSTANTS.attrs.kernel.language] = this.language;
    const t = ((a = this.metadata.kernelspec) == null ? void 0 : a.name) ?? this.metadata.kernel_info.name;
    this.attributes[CONSTANTS.attrs.kernel.name] = t;
    const n = ((l = this.metadata.kernelspec) == null ? void 0 : l.display_name) ?? ((f = this.metadata.kernelspec) == null ? void 0 : f.name) ?? this.metadata.kernel_info.name;
    return this.attributes[CONSTANTS.attrs.kernel.display_name] = n, this.attributes[CONSTANTS.attrs.other.prompt] = `${this.language} | ${n}`, this;
  }
  /* 解析单元格 */
  async parseCells() {
    for (let t = 0; t < this.cells.length; ++t)
      this.kramdowns.push(await this.parseCell(this.cells[t]));
    return this;
  }
  /**
   * 解析单个块
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#cell-types
   */
  async parseCell(t) {
    switch (t.cell_type) {
      case "markdown":
        return await this.parseMarkdown(t);
      case "code":
        return await this.parseCode(t);
      case "raw":
        return await this.parseRaw(t);
    }
  }
  /**
   * 解析源码
   */
  parseSource(t) {
    return t ? Array.isArray(t) ? t.join("") : t : "";
  }
  /**
   * 解析 markdown 块
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#markdown-cells
   */
  async parseMarkdown(t) {
    var s;
    if ((s = t.metadata) != null && s["jp-MarkdownHeadingCollapsed"]) {
      let o = -1, a = 7;
      if (Array.isArray(t.source)) {
        for (let l = 0; l < t.source.length; ++l) {
          const f = t.source[l];
          if (/^#{1,6}\s/.test(f)) {
            for (let p = 0; p < f.length && p < 6; ++p)
              if (f.charAt(p) !== "#") {
                p + 1 < a && (a = p + 1, o = l);
                break;
              }
          }
        }
        o >= 0 && 1 <= a && a <= 6 && (t.source[o] = `${t.source[o].trim()}
${createIAL({ fold: "1" })}
`);
      }
    }
    var n = this.parseSource(t.source);
    const r = await this.parseAttachments(t.attachments);
    for (const [o, a] of Object.entries(r))
      n = n.replace(`attachment:${o}`, a);
    return n;
  }
  /**
   * 解析 code 块
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#code-cells
   */
  async parseCode(t) {
    var O, rt, st, ft, ut, dt, T, nt, nn;
    const n = [], r = ((O = t.execution_count) == null ? void 0 : O.toString()) ?? "*", s = (st = (rt = t.metadata) == null ? void 0 : rt.jupyter) == null ? void 0 : st.source_hidden, o = (ut = (ft = t.metadata) == null ? void 0 : ft.jupyter) == null ? void 0 : ut.outputs_hidden, a = this.id, l = this.id, f = (dt = t.metadata.execution) == null ? void 0 : dt["iopub.execute_input"], p = (T = t.metadata.execution) == null ? void 0 : T["iopub.status.busy"], d = (nt = t.metadata.execution) == null ? void 0 : nt["iopub.status.idle"], _ = (nn = t.metadata.execution) == null ? void 0 : nn["shell.execute_reply"], S = {
      id: a,
      [CONSTANTS.attrs.code.index]: r,
      [CONSTANTS.attrs.code.output]: l,
      [CONSTANTS.attrs.code.type.key]: CONSTANTS.attrs.code.type.value,
      fold: s ? "1" : null,
      [CONSTANTS.attrs.code.execute_input]: f,
      [CONSTANTS.attrs.code.execute_reply]: p,
      [CONSTANTS.attrs.code.busy]: d,
      [CONSTANTS.attrs.code.idle]: _
    }, k = {
      id: l,
      [CONSTANTS.attrs.output.index]: r,
      [CONSTANTS.attrs.output.code]: a,
      [CONSTANTS.attrs.output.type.key]: CONSTANTS.attrs.output.type.value,
      fold: o ? "1" : null
    };
    return n.push(
      `\`\`\`${this.language}`,
      this.parseSource(t.source),
      "```",
      createIAL(S)
    ), n.push(
      "{{{row",
      "---"
    ), t.outputs && n.push(await this.parseOutputs(t.outputs)), n.push(
      "---",
      "}}}",
      createIAL(k)
    ), n.join(`
`);
  }
  /**
   * 解析 raw 块
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#raw-nbconvert-cells
   */
  async parseRaw(t) {
    var a, l, f;
    var n, r;
    [n, r] = (((a = t.metadata) == null ? void 0 : a.raw_mimetype) ?? "/").split("/");
    const o = [];
    switch (n) {
      case "text":
        switch (r) {
          case "markdown":
            o.push(
              "{{{row",
              this.parseSource(t.source),
              "}}}"
            );
            break;
          case "html":
            o.push(
              "<div>",
              this.parseSource(t.source),
              "</div>"
            );
            break;
          case "x-python":
            o.push(
              "```python",
              this.parseSource(t.source),
              "```"
            );
            break;
          case "asciidoc":
          case "latex":
          case "restructuredtext":
          default:
            o.push(
              `\`\`\`${r}`,
              this.parseSource(t.source),
              "```"
            );
            break;
        }
        break;
      case "pdf":
      case "slides":
      case "script":
      case "notebook":
      case "custom":
      default:
        o.push(
          `\`\`\`${n}`,
          this.parseSource(t.source),
          "```"
        );
        break;
    }
    return (f = (l = t.metadata) == null ? void 0 : l.jupyter) != null && f.source_hidden && o.push(createIAL({ fold: "1" })), o.join(`
`);
  }
  /**
   * 解析附件
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#cell-attachments
   * @returns 附件引用名(attachment:xxx.ext) -> 附件文件引用(assets/xxx.ext)
   */
  async parseAttachments(t) {
    const n = /* @__PURE__ */ new Map();
    if (t)
      for (const [r, s] of Object.entries(t))
        for (const [o, a] of Object.entries(s)) {
          const l = Array.isArray(a) ? a[0] : a, f = base64ToFile(l, o, r);
          if (f) {
            const d = (await this.client.upload({ files: [f] })).data.succMap[r];
            n.set(r, d);
            break;
          }
        }
    return n;
  }
  /**
   * 解析输出
   * @param outputs 输出对象列表
   * @return 最终结果
   */
  async parseOutputs(t) {
    var r;
    const n = [];
    for (let s = 0; s < t.length; ++s) {
      const o = t[s];
      switch (o.output_type) {
        case "stream": {
          const a = parseText(
            this.parseSource(o.text),
            this.config.jupyter.import.parser
          );
          switch (o.name) {
            case "stdout":
              n.push(a);
              break;
            case "stderr":
              const l = a.split(`
{2,}`);
              for (let f = 0; f < l.length; ++f)
                n.push(l[f]), n.push(createIAL({ style: CONSTANTS.styles.error }));
              break;
          }
          break;
        }
        case "error":
          n.push("{{{row"), n.push(parseText((r = o.traceback) == null ? void 0 : r.join(`
`), this.config.jupyter.import.parser)), n.push("}}}"), n.push(createIAL({ style: CONSTANTS.styles.error }));
          break;
        case "execute_result":
        case "display_data":
          o.data && n.push(await parseData(
            this.client,
            this.config.jupyter.import.parser,
            o.data,
            o.metadata
          ));
          break;
      }
    }
    return n.join(`
`);
  }
}
var lib$2 = {}, basemanager = {}, ArrayExt;
(function(e) {
  function t(lt, pt, at = 0, it = -1) {
    let ht = lt.length;
    if (ht === 0)
      return -1;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn;
    it < at ? sn = it + 1 + (ht - at) : sn = it - at + 1;
    for (let on = 0; on < sn; ++on) {
      let ln = (at + on) % ht;
      if (lt[ln] === pt)
        return ln;
    }
    return -1;
  }
  e.firstIndexOf = t;
  function n(lt, pt, at = -1, it = 0) {
    let ht = lt.length;
    if (ht === 0)
      return -1;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn;
    at < it ? sn = at + 1 + (ht - it) : sn = at - it + 1;
    for (let on = 0; on < sn; ++on) {
      let ln = (at - on + ht) % ht;
      if (lt[ln] === pt)
        return ln;
    }
    return -1;
  }
  e.lastIndexOf = n;
  function r(lt, pt, at = 0, it = -1) {
    let ht = lt.length;
    if (ht === 0)
      return -1;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn;
    it < at ? sn = it + 1 + (ht - at) : sn = it - at + 1;
    for (let on = 0; on < sn; ++on) {
      let ln = (at + on) % ht;
      if (pt(lt[ln], ln))
        return ln;
    }
    return -1;
  }
  e.findFirstIndex = r;
  function s(lt, pt, at = -1, it = 0) {
    let ht = lt.length;
    if (ht === 0)
      return -1;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn;
    at < it ? sn = at + 1 + (ht - it) : sn = at - it + 1;
    for (let on = 0; on < sn; ++on) {
      let ln = (at - on + ht) % ht;
      if (pt(lt[ln], ln))
        return ln;
    }
    return -1;
  }
  e.findLastIndex = s;
  function o(lt, pt, at = 0, it = -1) {
    let ht = r(lt, pt, at, it);
    return ht !== -1 ? lt[ht] : void 0;
  }
  e.findFirstValue = o;
  function a(lt, pt, at = -1, it = 0) {
    let ht = s(lt, pt, at, it);
    return ht !== -1 ? lt[ht] : void 0;
  }
  e.findLastValue = a;
  function l(lt, pt, at, it = 0, ht = -1) {
    let sn = lt.length;
    if (sn === 0)
      return 0;
    it < 0 ? it = Math.max(0, it + sn) : it = Math.min(it, sn - 1), ht < 0 ? ht = Math.max(0, ht + sn) : ht = Math.min(ht, sn - 1);
    let on = it, ln = ht - it + 1;
    for (; ln > 0; ) {
      let mn = ln >> 1, _n = on + mn;
      at(lt[_n], pt) < 0 ? (on = _n + 1, ln -= mn + 1) : ln = mn;
    }
    return on;
  }
  e.lowerBound = l;
  function f(lt, pt, at, it = 0, ht = -1) {
    let sn = lt.length;
    if (sn === 0)
      return 0;
    it < 0 ? it = Math.max(0, it + sn) : it = Math.min(it, sn - 1), ht < 0 ? ht = Math.max(0, ht + sn) : ht = Math.min(ht, sn - 1);
    let on = it, ln = ht - it + 1;
    for (; ln > 0; ) {
      let mn = ln >> 1, _n = on + mn;
      at(lt[_n], pt) > 0 ? ln = mn : (on = _n + 1, ln -= mn + 1);
    }
    return on;
  }
  e.upperBound = f;
  function p(lt, pt, at) {
    if (lt === pt)
      return !0;
    if (lt.length !== pt.length)
      return !1;
    for (let it = 0, ht = lt.length; it < ht; ++it)
      if (at ? !at(lt[it], pt[it]) : lt[it] !== pt[it])
        return !1;
    return !0;
  }
  e.shallowEqual = p;
  function d(lt, pt = {}) {
    let { start: at, stop: it, step: ht } = pt;
    if (ht === void 0 && (ht = 1), ht === 0)
      throw new Error("Slice `step` cannot be zero.");
    let sn = lt.length;
    at === void 0 ? at = ht < 0 ? sn - 1 : 0 : at < 0 ? at = Math.max(at + sn, ht < 0 ? -1 : 0) : at >= sn && (at = ht < 0 ? sn - 1 : sn), it === void 0 ? it = ht < 0 ? -1 : sn : it < 0 ? it = Math.max(it + sn, ht < 0 ? -1 : 0) : it >= sn && (it = ht < 0 ? sn - 1 : sn);
    let on;
    ht < 0 && it >= at || ht > 0 && at >= it ? on = 0 : ht < 0 ? on = Math.floor((it - at + 1) / ht + 1) : on = Math.floor((it - at - 1) / ht + 1);
    let ln = [];
    for (let mn = 0; mn < on; ++mn)
      ln[mn] = lt[at + mn * ht];
    return ln;
  }
  e.slice = d;
  function _(lt, pt, at) {
    let it = lt.length;
    if (it <= 1 || (pt < 0 ? pt = Math.max(0, pt + it) : pt = Math.min(pt, it - 1), at < 0 ? at = Math.max(0, at + it) : at = Math.min(at, it - 1), pt === at))
      return;
    let ht = lt[pt], sn = pt < at ? 1 : -1;
    for (let on = pt; on !== at; on += sn)
      lt[on] = lt[on + sn];
    lt[at] = ht;
  }
  e.move = _;
  function S(lt, pt = 0, at = -1) {
    let it = lt.length;
    if (!(it <= 1))
      for (pt < 0 ? pt = Math.max(0, pt + it) : pt = Math.min(pt, it - 1), at < 0 ? at = Math.max(0, at + it) : at = Math.min(at, it - 1); pt < at; ) {
        let ht = lt[pt], sn = lt[at];
        lt[pt++] = sn, lt[at--] = ht;
      }
  }
  e.reverse = S;
  function k(lt, pt, at = 0, it = -1) {
    let ht = lt.length;
    if (ht <= 1 || (at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1), at >= it))
      return;
    let sn = it - at + 1;
    if (pt > 0 ? pt = pt % sn : pt < 0 && (pt = (pt % sn + sn) % sn), pt === 0)
      return;
    let on = at + pt;
    S(lt, at, on - 1), S(lt, on, it), S(lt, at, it);
  }
  e.rotate = k;
  function O(lt, pt, at = 0, it = -1) {
    let ht = lt.length;
    if (ht === 0)
      return;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn;
    it < at ? sn = it + 1 + (ht - at) : sn = it - at + 1;
    for (let on = 0; on < sn; ++on)
      lt[(at + on) % ht] = pt;
  }
  e.fill = O;
  function rt(lt, pt, at) {
    let it = lt.length;
    pt < 0 ? pt = Math.max(0, pt + it) : pt = Math.min(pt, it);
    for (let ht = it; ht > pt; --ht)
      lt[ht] = lt[ht - 1];
    lt[pt] = at;
  }
  e.insert = rt;
  function st(lt, pt) {
    let at = lt.length;
    if (pt < 0 && (pt += at), pt < 0 || pt >= at)
      return;
    let it = lt[pt];
    for (let ht = pt + 1; ht < at; ++ht)
      lt[ht - 1] = lt[ht];
    return lt.length = at - 1, it;
  }
  e.removeAt = st;
  function ft(lt, pt, at = 0, it = -1) {
    let ht = t(lt, pt, at, it);
    return ht !== -1 && st(lt, ht), ht;
  }
  e.removeFirstOf = ft;
  function ut(lt, pt, at = -1, it = 0) {
    let ht = n(lt, pt, at, it);
    return ht !== -1 && st(lt, ht), ht;
  }
  e.removeLastOf = ut;
  function dt(lt, pt, at = 0, it = -1) {
    let ht = lt.length;
    if (ht === 0)
      return 0;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn = 0;
    for (let on = 0; on < ht; ++on)
      at <= it && on >= at && on <= it && lt[on] === pt || it < at && (on <= it || on >= at) && lt[on] === pt ? sn++ : sn > 0 && (lt[on - sn] = lt[on]);
    return sn > 0 && (lt.length = ht - sn), sn;
  }
  e.removeAllOf = dt;
  function T(lt, pt, at = 0, it = -1) {
    let ht, sn = r(lt, pt, at, it);
    return sn !== -1 && (ht = st(lt, sn)), { index: sn, value: ht };
  }
  e.removeFirstWhere = T;
  function nt(lt, pt, at = -1, it = 0) {
    let ht, sn = s(lt, pt, at, it);
    return sn !== -1 && (ht = st(lt, sn)), { index: sn, value: ht };
  }
  e.removeLastWhere = nt;
  function nn(lt, pt, at = 0, it = -1) {
    let ht = lt.length;
    if (ht === 0)
      return 0;
    at < 0 ? at = Math.max(0, at + ht) : at = Math.min(at, ht - 1), it < 0 ? it = Math.max(0, it + ht) : it = Math.min(it, ht - 1);
    let sn = 0;
    for (let on = 0; on < ht; ++on)
      at <= it && on >= at && on <= it && pt(lt[on], on) || it < at && (on <= it || on >= at) && pt(lt[on], on) ? sn++ : sn > 0 && (lt[on - sn] = lt[on]);
    return sn > 0 && (lt.length = ht - sn), sn;
  }
  e.removeAllWhere = nn;
})(ArrayExt || (ArrayExt = {}));
function find(e, t) {
  let n = 0;
  for (const r of e)
    if (t(r, n++))
      return r;
}
var Private$9;
(function(e) {
  function t(n, r, s) {
    return s === 0 ? 1 / 0 : n > r && s > 0 || n < r && s < 0 ? 0 : Math.ceil((r - n) / s);
  }
  e.rangeLength = t;
})(Private$9 || (Private$9 = {}));
var StringExt;
(function(e) {
  function t(a, l, f = 0) {
    let p = new Array(l.length);
    for (let d = 0, _ = f, S = l.length; d < S; ++d, ++_) {
      if (_ = a.indexOf(l[d], _), _ === -1)
        return null;
      p[d] = _;
    }
    return p;
  }
  e.findIndices = t;
  function n(a, l, f = 0) {
    let p = t(a, l, f);
    if (!p)
      return null;
    let d = 0;
    for (let _ = 0, S = p.length; _ < S; ++_) {
      let k = p[_] - f;
      d += k * k;
    }
    return { score: d, indices: p };
  }
  e.matchSumOfSquares = n;
  function r(a, l, f = 0) {
    let p = t(a, l, f);
    if (!p)
      return null;
    let d = 0, _ = f - 1;
    for (let S = 0, k = p.length; S < k; ++S) {
      let O = p[S];
      d += O - _ - 1, _ = O;
    }
    return { score: d, indices: p };
  }
  e.matchSumOfDeltas = r;
  function s(a, l, f) {
    let p = [], d = 0, _ = 0, S = l.length;
    for (; d < S; ) {
      let k = l[d], O = l[d];
      for (; ++d < S && l[d] === O + 1; )
        O++;
      _ < k && p.push(a.slice(_, k)), k < O + 1 && p.push(f(a.slice(k, O + 1))), _ = O + 1;
    }
    return _ < a.length && p.push(a.slice(_)), p;
  }
  e.highlight = s;
  function o(a, l) {
    return a < l ? -1 : a > l ? 1 : 0;
  }
  e.cmp = o;
})(StringExt || (StringExt = {}));
var JSONExt;
(function(e) {
  e.emptyObject = Object.freeze({}), e.emptyArray = Object.freeze([]);
  function t(d) {
    return d === null || typeof d == "boolean" || typeof d == "number" || typeof d == "string";
  }
  e.isPrimitive = t;
  function n(d) {
    return Array.isArray(d);
  }
  e.isArray = n;
  function r(d) {
    return !t(d) && !n(d);
  }
  e.isObject = r;
  function s(d, _) {
    if (d === _)
      return !0;
    if (t(d) || t(_))
      return !1;
    let S = n(d), k = n(_);
    return S !== k ? !1 : S && k ? a(d, _) : l(d, _);
  }
  e.deepEqual = s;
  function o(d) {
    return t(d) ? d : n(d) ? f(d) : p(d);
  }
  e.deepCopy = o;
  function a(d, _) {
    if (d === _)
      return !0;
    if (d.length !== _.length)
      return !1;
    for (let S = 0, k = d.length; S < k; ++S)
      if (!s(d[S], _[S]))
        return !1;
    return !0;
  }
  function l(d, _) {
    if (d === _)
      return !0;
    for (let S in d)
      if (d[S] !== void 0 && !(S in _))
        return !1;
    for (let S in _)
      if (_[S] !== void 0 && !(S in d))
        return !1;
    for (let S in d) {
      let k = d[S], O = _[S];
      if (!(k === void 0 && O === void 0) && (k === void 0 || O === void 0 || !s(k, O)))
        return !1;
    }
    return !0;
  }
  function f(d) {
    let _ = new Array(d.length);
    for (let S = 0, k = d.length; S < k; ++S)
      _[S] = o(d[S]);
    return _;
  }
  function p(d) {
    let _ = {};
    for (let S in d) {
      let k = d[S];
      k !== void 0 && (_[S] = o(k));
    }
    return _;
  }
})(JSONExt || (JSONExt = {}));
class PromiseDelegate {
  /**
   * Construct a new promise delegate.
   */
  constructor() {
    this.promise = new Promise((t, n) => {
      this._resolve = t, this._reject = n;
    });
  }
  /**
   * Resolve the wrapped promise with the given value.
   *
   * @param value - The value to use for resolving the promise.
   */
  resolve(t) {
    let n = this._resolve;
    n(t);
  }
  /**
   * Reject the wrapped promise with the given value.
   *
   * @reason - The reason for rejecting the promise.
   */
  reject(t) {
    let n = this._reject;
    n(t);
  }
}
function fallbackRandomValues(e) {
  let t = 0;
  for (let n = 0, r = e.length; n < r; ++n)
    n % 4 === 0 && (t = Math.random() * 4294967295 >>> 0), e[n] = t & 255, t >>>= 8;
}
var Random;
(function(e) {
  e.getRandomValues = (() => {
    const t = typeof window < "u" && (window.crypto || window.msCrypto) || null;
    return t && typeof t.getRandomValues == "function" ? function(r) {
      return t.getRandomValues(r);
    } : fallbackRandomValues;
  })();
})(Random || (Random = {}));
function uuid4Factory(e) {
  const t = new Uint8Array(16), n = new Array(256);
  for (let r = 0; r < 16; ++r)
    n[r] = "0" + r.toString(16);
  for (let r = 16; r < 256; ++r)
    n[r] = r.toString(16);
  return function() {
    return e(t), t[6] = 64 | t[6] & 15, t[8] = 128 | t[8] & 63, n[t[0]] + n[t[1]] + n[t[2]] + n[t[3]] + "-" + n[t[4]] + n[t[5]] + "-" + n[t[6]] + n[t[7]] + "-" + n[t[8]] + n[t[9]] + "-" + n[t[10]] + n[t[11]] + n[t[12]] + n[t[13]] + n[t[14]] + n[t[15]];
  };
}
var UUID;
(function(e) {
  e.uuid4 = uuid4Factory(Random.getRandomValues);
})(UUID || (UUID = {}));
class Signal {
  /**
   * Construct a new signal.
   *
   * @param sender - The sender which owns the signal.
   */
  constructor(t) {
    this.sender = t;
  }
  /**
   * Connect a slot to the signal.
   *
   * @param slot - The slot to invoke when the signal is emitted.
   *
   * @param thisArg - The `this` context for the slot. If provided,
   *   this must be a non-primitive object.
   *
   * @returns `true` if the connection succeeds, `false` otherwise.
   */
  connect(t, n) {
    return Private$8.connect(this, t, n);
  }
  /**
   * Disconnect a slot from the signal.
   *
   * @param slot - The slot to disconnect from the signal.
   *
   * @param thisArg - The `this` context for the slot. If provided,
   *   this must be a non-primitive object.
   *
   * @returns `true` if the connection is removed, `false` otherwise.
   */
  disconnect(t, n) {
    return Private$8.disconnect(this, t, n);
  }
  /**
   * Emit the signal and invoke the connected slots.
   *
   * @param args - The args to pass to the connected slots.
   *
   * #### Notes
   * Slots are invoked synchronously in connection order.
   *
   * Exceptions thrown by connected slots will be caught and logged.
   */
  emit(t) {
    Private$8.emit(this, t);
  }
}
(function(e) {
  function t(f, p) {
    Private$8.disconnectBetween(f, p);
  }
  e.disconnectBetween = t;
  function n(f) {
    Private$8.disconnectSender(f);
  }
  e.disconnectSender = n;
  function r(f) {
    Private$8.disconnectReceiver(f);
  }
  e.disconnectReceiver = r;
  function s(f) {
    Private$8.disconnectAll(f);
  }
  e.disconnectAll = s;
  function o(f) {
    Private$8.disconnectAll(f);
  }
  e.clearData = o;
  function a() {
    return Private$8.exceptionHandler;
  }
  e.getExceptionHandler = a;
  function l(f) {
    let p = Private$8.exceptionHandler;
    return Private$8.exceptionHandler = f, p;
  }
  e.setExceptionHandler = l;
})(Signal || (Signal = {}));
class Stream extends Signal {
  constructor() {
    super(...arguments), this._pending = new PromiseDelegate();
  }
  /**
   * Return an async iterator that yields every emission.
   */
  async *[Symbol.asyncIterator]() {
    let t = this._pending;
    for (; ; )
      try {
        const { args: n, next: r } = await t.promise;
        t = r, yield n;
      } catch {
        return;
      }
  }
  /**
   * Emit the signal, invoke the connected slots, and yield the emission.
   *
   * @param args - The args to pass to the connected slots.
   */
  emit(t) {
    const n = this._pending, r = this._pending = new PromiseDelegate();
    n.resolve({ args: t, next: r }), super.emit(t);
  }
  /**
   * Stop the stream's async iteration.
   */
  stop() {
    this._pending.promise.catch(() => {
    }), this._pending.reject("stop"), this._pending = new PromiseDelegate();
  }
}
var Private$8;
(function(e) {
  e.exceptionHandler = (ut) => {
    console.error(ut);
  };
  function t(ut, dt, T) {
    T = T || void 0;
    let nt = f.get(ut.sender);
    if (nt || (nt = [], f.set(ut.sender, nt)), S(nt, ut, dt, T))
      return !1;
    let nn = T || dt, lt = p.get(nn);
    lt || (lt = [], p.set(nn, lt));
    let pt = { signal: ut, slot: dt, thisArg: T };
    return nt.push(pt), lt.push(pt), !0;
  }
  e.connect = t;
  function n(ut, dt, T) {
    T = T || void 0;
    let nt = f.get(ut.sender);
    if (!nt || nt.length === 0)
      return !1;
    let nn = S(nt, ut, dt, T);
    if (!nn)
      return !1;
    let lt = T || dt, pt = p.get(lt);
    return nn.signal = null, O(nt), O(pt), !0;
  }
  e.disconnect = n;
  function r(ut, dt) {
    let T = f.get(ut);
    if (!T || T.length === 0)
      return;
    let nt = p.get(dt);
    if (!(!nt || nt.length === 0)) {
      for (const nn of nt)
        nn.signal && nn.signal.sender === ut && (nn.signal = null);
      O(T), O(nt);
    }
  }
  e.disconnectBetween = r;
  function s(ut) {
    let dt = f.get(ut);
    if (!(!dt || dt.length === 0)) {
      for (const T of dt) {
        if (!T.signal)
          continue;
        let nt = T.thisArg || T.slot;
        T.signal = null, O(p.get(nt));
      }
      O(dt);
    }
  }
  e.disconnectSender = s;
  function o(ut) {
    let dt = p.get(ut);
    if (!(!dt || dt.length === 0)) {
      for (const T of dt) {
        if (!T.signal)
          continue;
        let nt = T.signal.sender;
        T.signal = null, O(f.get(nt));
      }
      O(dt);
    }
  }
  e.disconnectReceiver = o;
  function a(ut) {
    s(ut), o(ut);
  }
  e.disconnectAll = a;
  function l(ut, dt) {
    let T = f.get(ut.sender);
    if (!(!T || T.length === 0))
      for (let nt = 0, nn = T.length; nt < nn; ++nt) {
        let lt = T[nt];
        lt.signal === ut && k(lt, dt);
      }
  }
  e.emit = l;
  const f = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), _ = (() => typeof requestAnimationFrame == "function" ? requestAnimationFrame : setImmediate)();
  function S(ut, dt, T, nt) {
    return find(ut, (nn) => nn.signal === dt && nn.slot === T && nn.thisArg === nt);
  }
  function k(ut, dt) {
    let { signal: T, slot: nt, thisArg: nn } = ut;
    try {
      nt.call(nn, T.sender, dt);
    } catch (lt) {
      e.exceptionHandler(lt);
    }
  }
  function O(ut) {
    d.size === 0 && _(rt), d.add(ut);
  }
  function rt() {
    d.forEach(st), d.clear();
  }
  function st(ut) {
    ArrayExt.removeAllWhere(ut, ft);
  }
  function ft(ut) {
    return ut.signal === null;
  }
})(Private$8 || (Private$8 = {}));
const index_es6$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get Signal() {
    return Signal;
  },
  Stream
}, Symbol.toStringTag, { value: "Module" })), require$$0 = /* @__PURE__ */ getAugmentedNamespace(index_es6$3);
var serverconnection = {}, lib$1 = {}, activitymonitor = {};
Object.defineProperty(activitymonitor, "__esModule", { value: !0 });
activitymonitor.ActivityMonitor = void 0;
const signaling_1$5 = require$$0;
class ActivityMonitor {
  /**
   * Construct a new activity monitor.
   */
  constructor(t) {
    this._timer = -1, this._timeout = -1, this._isDisposed = !1, this._activityStopped = new signaling_1$5.Signal(this), t.signal.connect(this._onSignalFired, this), this._timeout = t.timeout || 1e3;
  }
  /**
   * A signal emitted when activity has ceased.
   */
  get activityStopped() {
    return this._activityStopped;
  }
  /**
   * The timeout associated with the monitor, in milliseconds.
   */
  get timeout() {
    return this._timeout;
  }
  set timeout(t) {
    this._timeout = t;
  }
  /**
   * Test whether the monitor has been disposed.
   *
   * #### Notes
   * This is a read-only property.
   */
  get isDisposed() {
    return this._isDisposed;
  }
  /**
   * Dispose of the resources used by the activity monitor.
   */
  dispose() {
    this._isDisposed || (this._isDisposed = !0, signaling_1$5.Signal.clearData(this));
  }
  /**
   * A signal handler for the monitored signal.
   */
  _onSignalFired(t, n) {
    clearTimeout(this._timer), this._sender = t, this._args = n, this._timer = setTimeout(() => {
      this._activityStopped.emit({
        sender: this._sender,
        args: this._args
      });
    }, this._timeout);
  }
}
activitymonitor.ActivityMonitor = ActivityMonitor;
var interfaces$1 = {};
Object.defineProperty(interfaces$1, "__esModule", { value: !0 });
var markdowncodeblocks = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.MarkdownCodeBlocks = void 0, function(t) {
    t.CODE_BLOCK_MARKER = "```";
    const n = [
      ".markdown",
      ".mdown",
      ".mkdn",
      ".md",
      ".mkd",
      ".mdwn",
      ".mdtxt",
      ".mdtext",
      ".text",
      ".txt",
      ".Rmd"
    ];
    class r {
      constructor(l) {
        this.startLine = l, this.code = "", this.endLine = -1;
      }
    }
    t.MarkdownCodeBlock = r;
    function s(a) {
      return n.indexOf(a) > -1;
    }
    t.isMarkdown = s;
    function o(a) {
      if (!a || a === "")
        return [];
      const l = a.split(`
`), f = [];
      let p = null;
      for (let d = 0; d < l.length; d++) {
        const _ = l[d], S = _.indexOf(t.CODE_BLOCK_MARKER) === 0, k = p != null;
        if (!(!S && !k))
          if (k)
            p && (S ? (p.endLine = d - 1, f.push(p), p = null) : p.code += _ + `
`);
          else {
            p = new r(d);
            const O = _.indexOf(t.CODE_BLOCK_MARKER), rt = _.lastIndexOf(t.CODE_BLOCK_MARKER);
            O !== rt && (p.code = _.substring(O + t.CODE_BLOCK_MARKER.length, rt), p.endLine = d, f.push(p), p = null);
          }
      }
      return f;
    }
    t.findMarkdownCodeBlocks = o;
  }(e.MarkdownCodeBlocks || (e.MarkdownCodeBlocks = {}));
})(markdowncodeblocks);
var pageconfig = {}, dist = { exports: {} };
(function(e, t) {
  (function(n, r) {
    r(t);
  })(commonjsGlobal, function(n) {
    n.JSONExt = void 0, function(f) {
      f.emptyObject = Object.freeze({}), f.emptyArray = Object.freeze([]);
      function p(ut) {
        return ut === null || typeof ut == "boolean" || typeof ut == "number" || typeof ut == "string";
      }
      f.isPrimitive = p;
      function d(ut) {
        return Array.isArray(ut);
      }
      f.isArray = d;
      function _(ut) {
        return !p(ut) && !d(ut);
      }
      f.isObject = _;
      function S(ut, dt) {
        if (ut === dt)
          return !0;
        if (p(ut) || p(dt))
          return !1;
        let T = d(ut), nt = d(dt);
        return T !== nt ? !1 : T && nt ? O(ut, dt) : rt(ut, dt);
      }
      f.deepEqual = S;
      function k(ut) {
        return p(ut) ? ut : d(ut) ? st(ut) : ft(ut);
      }
      f.deepCopy = k;
      function O(ut, dt) {
        if (ut === dt)
          return !0;
        if (ut.length !== dt.length)
          return !1;
        for (let T = 0, nt = ut.length; T < nt; ++T)
          if (!S(ut[T], dt[T]))
            return !1;
        return !0;
      }
      function rt(ut, dt) {
        if (ut === dt)
          return !0;
        for (let T in ut)
          if (ut[T] !== void 0 && !(T in dt))
            return !1;
        for (let T in dt)
          if (dt[T] !== void 0 && !(T in ut))
            return !1;
        for (let T in ut) {
          let nt = ut[T], nn = dt[T];
          if (!(nt === void 0 && nn === void 0) && (nt === void 0 || nn === void 0 || !S(nt, nn)))
            return !1;
        }
        return !0;
      }
      function st(ut) {
        let dt = new Array(ut.length);
        for (let T = 0, nt = ut.length; T < nt; ++T)
          dt[T] = k(ut[T]);
        return dt;
      }
      function ft(ut) {
        let dt = {};
        for (let T in ut) {
          let nt = ut[T];
          nt !== void 0 && (dt[T] = k(nt));
        }
        return dt;
      }
    }(n.JSONExt || (n.JSONExt = {}));
    class r {
      constructor() {
        this._types = [], this._values = [];
      }
      /**
       * Get an array of the MIME types contained within the dataset.
       *
       * @returns A new array of the MIME types, in order of insertion.
       */
      types() {
        return this._types.slice();
      }
      /**
       * Test whether the dataset has an entry for the given type.
       *
       * @param mime - The MIME type of interest.
       *
       * @returns `true` if the dataset contains a value for the given
       *   MIME type, `false` otherwise.
       */
      hasData(p) {
        return this._types.indexOf(p) !== -1;
      }
      /**
       * Get the data value for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * @returns The value for the given MIME type, or `undefined` if
       *   the dataset does not contain a value for the type.
       */
      getData(p) {
        let d = this._types.indexOf(p);
        return d !== -1 ? this._values[d] : void 0;
      }
      /**
       * Set the data value for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * @param data - The data value for the given MIME type.
       *
       * #### Notes
       * This will overwrite any previous entry for the MIME type.
       */
      setData(p, d) {
        this.clearData(p), this._types.push(p), this._values.push(d);
      }
      /**
       * Remove the data entry for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * #### Notes
       * This is a no-op if there is no entry for the given MIME type.
       */
      clearData(p) {
        let d = this._types.indexOf(p);
        d !== -1 && (this._types.splice(d, 1), this._values.splice(d, 1));
      }
      /**
       * Remove all data entries from the dataset.
       */
      clear() {
        this._types.length = 0, this._values.length = 0;
      }
    }
    class s {
      /**
       * Construct a new promise delegate.
       */
      constructor() {
        this.promise = new Promise((p, d) => {
          this._resolve = p, this._reject = d;
        });
      }
      /**
       * Resolve the wrapped promise with the given value.
       *
       * @param value - The value to use for resolving the promise.
       */
      resolve(p) {
        let d = this._resolve;
        d(p);
      }
      /**
       * Reject the wrapped promise with the given value.
       *
       * @reason - The reason for rejecting the promise.
       */
      reject(p) {
        let d = this._reject;
        d(p);
      }
    }
    class o {
      /**
       * Construct a new token.
       *
       * @param name - A human readable name for the token.
       * @param description - Token purpose description for documentation.
       */
      constructor(p, d) {
        this.name = p, this.description = d ?? "", this._tokenStructuralPropertyT = null;
      }
    }
    function a(f) {
      let p = 0;
      for (let d = 0, _ = f.length; d < _; ++d)
        d % 4 === 0 && (p = Math.random() * 4294967295 >>> 0), f[d] = p & 255, p >>>= 8;
    }
    n.Random = void 0, function(f) {
      f.getRandomValues = (() => {
        const p = typeof window < "u" && (window.crypto || window.msCrypto) || null;
        return p && typeof p.getRandomValues == "function" ? function(_) {
          return p.getRandomValues(_);
        } : a;
      })();
    }(n.Random || (n.Random = {}));
    function l(f) {
      const p = new Uint8Array(16), d = new Array(256);
      for (let _ = 0; _ < 16; ++_)
        d[_] = "0" + _.toString(16);
      for (let _ = 16; _ < 256; ++_)
        d[_] = _.toString(16);
      return function() {
        return f(p), p[6] = 64 | p[6] & 15, p[8] = 128 | p[8] & 63, d[p[0]] + d[p[1]] + d[p[2]] + d[p[3]] + "-" + d[p[4]] + d[p[5]] + "-" + d[p[6]] + d[p[7]] + "-" + d[p[8]] + d[p[9]] + "-" + d[p[10]] + d[p[11]] + d[p[12]] + d[p[13]] + d[p[14]] + d[p[15]];
      };
    }
    n.UUID = void 0, function(f) {
      f.uuid4 = l(n.Random.getRandomValues);
    }(n.UUID || (n.UUID = {})), n.MimeData = r, n.PromiseDelegate = s, n.Token = o;
  });
})(dist, dist.exports);
var distExports = dist.exports;
function hasKey(e, t) {
  var n = e;
  t.slice(0, -1).forEach(function(s) {
    n = n[s] || {};
  });
  var r = t[t.length - 1];
  return r in n;
}
function isNumber(e) {
  return typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
function isConstructorOrProto(e, t) {
  return t === "constructor" && typeof e[t] == "function" || t === "__proto__";
}
var minimist = function(e, t) {
  t || (t = {});
  var n = {
    bools: {},
    strings: {},
    unknownFn: null
  };
  typeof t.unknown == "function" && (n.unknownFn = t.unknown), typeof t.boolean == "boolean" && t.boolean ? n.allBools = !0 : [].concat(t.boolean).filter(Boolean).forEach(function(T) {
    n.bools[T] = !0;
  });
  var r = {};
  function s(T) {
    return r[T].some(function(nt) {
      return n.bools[nt];
    });
  }
  Object.keys(t.alias || {}).forEach(function(T) {
    r[T] = [].concat(t.alias[T]), r[T].forEach(function(nt) {
      r[nt] = [T].concat(r[T].filter(function(nn) {
        return nt !== nn;
      }));
    });
  }), [].concat(t.string).filter(Boolean).forEach(function(T) {
    n.strings[T] = !0, r[T] && [].concat(r[T]).forEach(function(nt) {
      n.strings[nt] = !0;
    });
  });
  var o = t.default || {}, a = { _: [] };
  function l(T, nt) {
    return n.allBools && /^--[^=]+$/.test(nt) || n.strings[T] || n.bools[T] || r[T];
  }
  function f(T, nt, nn) {
    for (var lt = T, pt = 0; pt < nt.length - 1; pt++) {
      var at = nt[pt];
      if (isConstructorOrProto(lt, at))
        return;
      lt[at] === void 0 && (lt[at] = {}), (lt[at] === Object.prototype || lt[at] === Number.prototype || lt[at] === String.prototype) && (lt[at] = {}), lt[at] === Array.prototype && (lt[at] = []), lt = lt[at];
    }
    var it = nt[nt.length - 1];
    isConstructorOrProto(lt, it) || ((lt === Object.prototype || lt === Number.prototype || lt === String.prototype) && (lt = {}), lt === Array.prototype && (lt = []), lt[it] === void 0 || n.bools[it] || typeof lt[it] == "boolean" ? lt[it] = nn : Array.isArray(lt[it]) ? lt[it].push(nn) : lt[it] = [lt[it], nn]);
  }
  function p(T, nt, nn) {
    if (!(nn && n.unknownFn && !l(T, nn) && n.unknownFn(nn) === !1)) {
      var lt = !n.strings[T] && isNumber(nt) ? Number(nt) : nt;
      f(a, T.split("."), lt), (r[T] || []).forEach(function(pt) {
        f(a, pt.split("."), lt);
      });
    }
  }
  Object.keys(n.bools).forEach(function(T) {
    p(T, o[T] === void 0 ? !1 : o[T]);
  });
  var d = [];
  e.indexOf("--") !== -1 && (d = e.slice(e.indexOf("--") + 1), e = e.slice(0, e.indexOf("--")));
  for (var _ = 0; _ < e.length; _++) {
    var S = e[_], k, O;
    if (/^--.+=/.test(S)) {
      var rt = S.match(/^--([^=]+)=([\s\S]*)$/);
      k = rt[1];
      var st = rt[2];
      n.bools[k] && (st = st !== "false"), p(k, st, S);
    } else if (/^--no-.+/.test(S))
      k = S.match(/^--no-(.+)/)[1], p(k, !1, S);
    else if (/^--.+/.test(S))
      k = S.match(/^--(.+)/)[1], O = e[_ + 1], O !== void 0 && !/^(-|--)[^-]/.test(O) && !n.bools[k] && !n.allBools && (!r[k] || !s(k)) ? (p(k, O, S), _ += 1) : /^(true|false)$/.test(O) ? (p(k, O === "true", S), _ += 1) : p(k, n.strings[k] ? "" : !0, S);
    else if (/^-[^-]+/.test(S)) {
      for (var ft = S.slice(1, -1).split(""), ut = !1, dt = 0; dt < ft.length; dt++) {
        if (O = S.slice(dt + 2), O === "-") {
          p(ft[dt], O, S);
          continue;
        }
        if (/[A-Za-z]/.test(ft[dt]) && O[0] === "=") {
          p(ft[dt], O.slice(1), S), ut = !0;
          break;
        }
        if (/[A-Za-z]/.test(ft[dt]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(O)) {
          p(ft[dt], O, S), ut = !0;
          break;
        }
        if (ft[dt + 1] && ft[dt + 1].match(/\W/)) {
          p(ft[dt], S.slice(dt + 2), S), ut = !0;
          break;
        } else
          p(ft[dt], n.strings[ft[dt]] ? "" : !0, S);
      }
      k = S.slice(-1)[0], !ut && k !== "-" && (e[_ + 1] && !/^(-|--)[^-]/.test(e[_ + 1]) && !n.bools[k] && (!r[k] || !s(k)) ? (p(k, e[_ + 1], S), _ += 1) : e[_ + 1] && /^(true|false)$/.test(e[_ + 1]) ? (p(k, e[_ + 1] === "true", S), _ += 1) : p(k, n.strings[k] ? "" : !0, S));
    } else if ((!n.unknownFn || n.unknownFn(S) !== !1) && a._.push(n.strings._ || !isNumber(S) ? S : Number(S)), t.stopEarly) {
      a._.push.apply(a._, e.slice(_ + 1));
      break;
    }
  }
  return Object.keys(o).forEach(function(T) {
    hasKey(a, T.split(".")) || (f(a, T.split("."), o[T]), (r[T] || []).forEach(function(nt) {
      f(a, nt.split("."), o[T]);
    }));
  }), t["--"] ? a["--"] = d.slice() : d.forEach(function(T) {
    a._.push(T);
  }), a;
}, url = {};
function assertPath(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
function normalizeStringPosix(e, t) {
  for (var n = "", r = 0, s = -1, o = 0, a, l = 0; l <= e.length; ++l) {
    if (l < e.length)
      a = e.charCodeAt(l);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(s === l - 1 || o === 1))
        if (s !== l - 1 && o === 2) {
          if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var f = n.lastIndexOf("/");
              if (f !== n.length - 1) {
                f === -1 ? (n = "", r = 0) : (n = n.slice(0, f), r = n.length - 1 - n.lastIndexOf("/")), s = l, o = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", r = 0, s = l, o = 0;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", r = 2);
        } else
          n.length > 0 ? n += "/" + e.slice(s + 1, l) : n = e.slice(s + 1, l), r = l - s - 1;
      s = l, o = 0;
    } else
      a === 46 && o !== -1 ? ++o : o = -1;
  }
  return n;
}
function _format(e, t) {
  var n = t.dir || t.root, r = t.base || (t.name || "") + (t.ext || "");
  return n ? n === t.root ? n + r : n + e + r : r;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var t = "", n = !1, r, s = arguments.length - 1; s >= -1 && !n; s--) {
      var o;
      s >= 0 ? o = arguments[s] : (r === void 0 && (r = process.cwd()), o = r), assertPath(o), o.length !== 0 && (t = o + "/" + t, n = o.charCodeAt(0) === 47);
    }
    return t = normalizeStringPosix(t, !n), n ? t.length > 0 ? "/" + t : "/" : t.length > 0 ? t : ".";
  },
  normalize: function(t) {
    if (assertPath(t), t.length === 0)
      return ".";
    var n = t.charCodeAt(0) === 47, r = t.charCodeAt(t.length - 1) === 47;
    return t = normalizeStringPosix(t, !n), t.length === 0 && !n && (t = "."), t.length > 0 && r && (t += "/"), n ? "/" + t : t;
  },
  isAbsolute: function(t) {
    return assertPath(t), t.length > 0 && t.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var t, n = 0; n < arguments.length; ++n) {
      var r = arguments[n];
      assertPath(r), r.length > 0 && (t === void 0 ? t = r : t += "/" + r);
    }
    return t === void 0 ? "." : posix.normalize(t);
  },
  relative: function(t, n) {
    if (assertPath(t), assertPath(n), t === n || (t = posix.resolve(t), n = posix.resolve(n), t === n))
      return "";
    for (var r = 1; r < t.length && t.charCodeAt(r) === 47; ++r)
      ;
    for (var s = t.length, o = s - r, a = 1; a < n.length && n.charCodeAt(a) === 47; ++a)
      ;
    for (var l = n.length, f = l - a, p = o < f ? o : f, d = -1, _ = 0; _ <= p; ++_) {
      if (_ === p) {
        if (f > p) {
          if (n.charCodeAt(a + _) === 47)
            return n.slice(a + _ + 1);
          if (_ === 0)
            return n.slice(a + _);
        } else
          o > p && (t.charCodeAt(r + _) === 47 ? d = _ : _ === 0 && (d = 0));
        break;
      }
      var S = t.charCodeAt(r + _), k = n.charCodeAt(a + _);
      if (S !== k)
        break;
      S === 47 && (d = _);
    }
    var O = "";
    for (_ = r + d + 1; _ <= s; ++_)
      (_ === s || t.charCodeAt(_) === 47) && (O.length === 0 ? O += ".." : O += "/..");
    return O.length > 0 ? O + n.slice(a + d) : (a += d, n.charCodeAt(a) === 47 && ++a, n.slice(a));
  },
  _makeLong: function(t) {
    return t;
  },
  dirname: function(t) {
    if (assertPath(t), t.length === 0)
      return ".";
    for (var n = t.charCodeAt(0), r = n === 47, s = -1, o = !0, a = t.length - 1; a >= 1; --a)
      if (n = t.charCodeAt(a), n === 47) {
        if (!o) {
          s = a;
          break;
        }
      } else
        o = !1;
    return s === -1 ? r ? "/" : "." : r && s === 1 ? "//" : t.slice(0, s);
  },
  basename: function(t, n) {
    if (n !== void 0 && typeof n != "string")
      throw new TypeError('"ext" argument must be a string');
    assertPath(t);
    var r = 0, s = -1, o = !0, a;
    if (n !== void 0 && n.length > 0 && n.length <= t.length) {
      if (n.length === t.length && n === t)
        return "";
      var l = n.length - 1, f = -1;
      for (a = t.length - 1; a >= 0; --a) {
        var p = t.charCodeAt(a);
        if (p === 47) {
          if (!o) {
            r = a + 1;
            break;
          }
        } else
          f === -1 && (o = !1, f = a + 1), l >= 0 && (p === n.charCodeAt(l) ? --l === -1 && (s = a) : (l = -1, s = f));
      }
      return r === s ? s = f : s === -1 && (s = t.length), t.slice(r, s);
    } else {
      for (a = t.length - 1; a >= 0; --a)
        if (t.charCodeAt(a) === 47) {
          if (!o) {
            r = a + 1;
            break;
          }
        } else
          s === -1 && (o = !1, s = a + 1);
      return s === -1 ? "" : t.slice(r, s);
    }
  },
  extname: function(t) {
    assertPath(t);
    for (var n = -1, r = 0, s = -1, o = !0, a = 0, l = t.length - 1; l >= 0; --l) {
      var f = t.charCodeAt(l);
      if (f === 47) {
        if (!o) {
          r = l + 1;
          break;
        }
        continue;
      }
      s === -1 && (o = !1, s = l + 1), f === 46 ? n === -1 ? n = l : a !== 1 && (a = 1) : n !== -1 && (a = -1);
    }
    return n === -1 || s === -1 || // We saw a non-dot character immediately before the dot
    a === 0 || // The (right-most) trimmed path component is exactly '..'
    a === 1 && n === s - 1 && n === r + 1 ? "" : t.slice(n, s);
  },
  format: function(t) {
    if (t === null || typeof t != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t);
    return _format("/", t);
  },
  parse: function(t) {
    assertPath(t);
    var n = { root: "", dir: "", base: "", ext: "", name: "" };
    if (t.length === 0)
      return n;
    var r = t.charCodeAt(0), s = r === 47, o;
    s ? (n.root = "/", o = 1) : o = 0;
    for (var a = -1, l = 0, f = -1, p = !0, d = t.length - 1, _ = 0; d >= o; --d) {
      if (r = t.charCodeAt(d), r === 47) {
        if (!p) {
          l = d + 1;
          break;
        }
        continue;
      }
      f === -1 && (p = !1, f = d + 1), r === 46 ? a === -1 ? a = d : _ !== 1 && (_ = 1) : a !== -1 && (_ = -1);
    }
    return a === -1 || f === -1 || // We saw a non-dot character immediately before the dot
    _ === 0 || // The (right-most) trimmed path component is exactly '..'
    _ === 1 && a === f - 1 && a === l + 1 ? f !== -1 && (l === 0 && s ? n.base = n.name = t.slice(1, f) : n.base = n.name = t.slice(l, f)) : (l === 0 && s ? (n.name = t.slice(1, a), n.base = t.slice(1, f)) : (n.name = t.slice(l, a), n.base = t.slice(l, f)), n.ext = t.slice(a, f)), l > 0 ? n.dir = t.slice(0, l - 1) : s && (n.dir = "/"), n;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
posix.posix = posix;
var pathBrowserify = posix, requiresPort = function(t, n) {
  if (n = n.split(":")[0], t = +t, !t)
    return !1;
  switch (n) {
    case "http":
    case "ws":
      return t !== 80;
    case "https":
    case "wss":
      return t !== 443;
    case "ftp":
      return t !== 21;
    case "gopher":
      return t !== 70;
    case "file":
      return !1;
  }
  return t !== 0;
}, querystringify$1 = {}, has = Object.prototype.hasOwnProperty, undef;
function decode(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return null;
  }
}
function encode(e) {
  try {
    return encodeURIComponent(e);
  } catch {
    return null;
  }
}
function querystring(e) {
  for (var t = /([^=?#&]+)=?([^&]*)/g, n = {}, r; r = t.exec(e); ) {
    var s = decode(r[1]), o = decode(r[2]);
    s === null || o === null || s in n || (n[s] = o);
  }
  return n;
}
function querystringify(e, t) {
  t = t || "";
  var n = [], r, s;
  typeof t != "string" && (t = "?");
  for (s in e)
    if (has.call(e, s)) {
      if (r = e[s], !r && (r === null || r === undef || isNaN(r)) && (r = ""), s = encode(s), r = encode(r), s === null || r === null)
        continue;
      n.push(s + "=" + r);
    }
  return n.length ? t + n.join("&") : "";
}
querystringify$1.stringify = querystringify;
querystringify$1.parse = querystring;
var required = requiresPort, qs = querystringify$1, controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, CRHTLF = /[\n\r\t]/g, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, port = /:\d+$/, protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, windowsDriveLetter = /^[a-zA-Z]:/;
function trimLeft(e) {
  return (e || "").toString().replace(controlOrWhitespace, "");
}
var rules = [
  ["#", "hash"],
  // Extract from the back.
  ["?", "query"],
  // Extract from the back.
  function(t, n) {
    return isSpecial(n.protocol) ? t.replace(/\\/g, "/") : t;
  },
  ["/", "pathname"],
  // Extract from the back.
  ["@", "auth", 1],
  // Extract from the front.
  [NaN, "host", void 0, 1, 1],
  // Set left over value.
  [/:(\d*)$/, "port", void 0, 1],
  // RegExp the back.
  [NaN, "hostname", void 0, 1, 1]
  // Set left over.
], ignore = { hash: 1, query: 1 };
function lolcation(e) {
  var t;
  typeof window < "u" ? t = window : typeof commonjsGlobal < "u" ? t = commonjsGlobal : typeof self < "u" ? t = self : t = {};
  var n = t.location || {};
  e = e || n;
  var r = {}, s = typeof e, o;
  if (e.protocol === "blob:")
    r = new Url(unescape(e.pathname), {});
  else if (s === "string") {
    r = new Url(e, {});
    for (o in ignore)
      delete r[o];
  } else if (s === "object") {
    for (o in e)
      o in ignore || (r[o] = e[o]);
    r.slashes === void 0 && (r.slashes = slashes.test(e.href));
  }
  return r;
}
function isSpecial(e) {
  return e === "file:" || e === "ftp:" || e === "http:" || e === "https:" || e === "ws:" || e === "wss:";
}
function extractProtocol(e, t) {
  e = trimLeft(e), e = e.replace(CRHTLF, ""), t = t || {};
  var n = protocolre.exec(e), r = n[1] ? n[1].toLowerCase() : "", s = !!n[2], o = !!n[3], a = 0, l;
  return s ? o ? (l = n[2] + n[3] + n[4], a = n[2].length + n[3].length) : (l = n[2] + n[4], a = n[2].length) : o ? (l = n[3] + n[4], a = n[3].length) : l = n[4], r === "file:" ? a >= 2 && (l = l.slice(2)) : isSpecial(r) ? l = n[4] : r ? s && (l = l.slice(2)) : a >= 2 && isSpecial(t.protocol) && (l = n[4]), {
    protocol: r,
    slashes: s || isSpecial(r),
    slashesCount: a,
    rest: l
  };
}
function resolve(e, t) {
  if (e === "")
    return t;
  for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, s = n[r - 1], o = !1, a = 0; r--; )
    n[r] === "." ? n.splice(r, 1) : n[r] === ".." ? (n.splice(r, 1), a++) : a && (r === 0 && (o = !0), n.splice(r, 1), a--);
  return o && n.unshift(""), (s === "." || s === "..") && n.push(""), n.join("/");
}
function Url(e, t, n) {
  if (e = trimLeft(e), e = e.replace(CRHTLF, ""), !(this instanceof Url))
    return new Url(e, t, n);
  var r, s, o, a, l, f, p = rules.slice(), d = typeof t, _ = this, S = 0;
  for (d !== "object" && d !== "string" && (n = t, t = null), n && typeof n != "function" && (n = qs.parse), t = lolcation(t), s = extractProtocol(e || "", t), r = !s.protocol && !s.slashes, _.slashes = s.slashes || r && t.slashes, _.protocol = s.protocol || t.protocol || "", e = s.rest, (s.protocol === "file:" && (s.slashesCount !== 2 || windowsDriveLetter.test(e)) || !s.slashes && (s.protocol || s.slashesCount < 2 || !isSpecial(_.protocol))) && (p[3] = [/(.*)/, "pathname"]); S < p.length; S++) {
    if (a = p[S], typeof a == "function") {
      e = a(e, _);
      continue;
    }
    o = a[0], f = a[1], o !== o ? _[f] = e : typeof o == "string" ? (l = o === "@" ? e.lastIndexOf(o) : e.indexOf(o), ~l && (typeof a[2] == "number" ? (_[f] = e.slice(0, l), e = e.slice(l + a[2])) : (_[f] = e.slice(l), e = e.slice(0, l)))) : (l = o.exec(e)) && (_[f] = l[1], e = e.slice(0, l.index)), _[f] = _[f] || r && a[3] && t[f] || "", a[4] && (_[f] = _[f].toLowerCase());
  }
  n && (_.query = n(_.query)), r && t.slashes && _.pathname.charAt(0) !== "/" && (_.pathname !== "" || t.pathname !== "") && (_.pathname = resolve(_.pathname, t.pathname)), _.pathname.charAt(0) !== "/" && isSpecial(_.protocol) && (_.pathname = "/" + _.pathname), required(_.port, _.protocol) || (_.host = _.hostname, _.port = ""), _.username = _.password = "", _.auth && (l = _.auth.indexOf(":"), ~l ? (_.username = _.auth.slice(0, l), _.username = encodeURIComponent(decodeURIComponent(_.username)), _.password = _.auth.slice(l + 1), _.password = encodeURIComponent(decodeURIComponent(_.password))) : _.username = encodeURIComponent(decodeURIComponent(_.auth)), _.auth = _.password ? _.username + ":" + _.password : _.username), _.origin = _.protocol !== "file:" && isSpecial(_.protocol) && _.host ? _.protocol + "//" + _.host : "null", _.href = _.toString();
}
function set(e, t, n) {
  var r = this;
  switch (e) {
    case "query":
      typeof t == "string" && t.length && (t = (n || qs.parse)(t)), r[e] = t;
      break;
    case "port":
      r[e] = t, required(t, r.protocol) ? t && (r.host = r.hostname + ":" + t) : (r.host = r.hostname, r[e] = "");
      break;
    case "hostname":
      r[e] = t, r.port && (t += ":" + r.port), r.host = t;
      break;
    case "host":
      r[e] = t, port.test(t) ? (t = t.split(":"), r.port = t.pop(), r.hostname = t.join(":")) : (r.hostname = t, r.port = "");
      break;
    case "protocol":
      r.protocol = t.toLowerCase(), r.slashes = !n;
      break;
    case "pathname":
    case "hash":
      if (t) {
        var s = e === "pathname" ? "/" : "#";
        r[e] = t.charAt(0) !== s ? s + t : t;
      } else
        r[e] = t;
      break;
    case "username":
    case "password":
      r[e] = encodeURIComponent(t);
      break;
    case "auth":
      var o = t.indexOf(":");
      ~o ? (r.username = t.slice(0, o), r.username = encodeURIComponent(decodeURIComponent(r.username)), r.password = t.slice(o + 1), r.password = encodeURIComponent(decodeURIComponent(r.password))) : r.username = encodeURIComponent(decodeURIComponent(t));
  }
  for (var a = 0; a < rules.length; a++) {
    var l = rules[a];
    l[4] && (r[l[1]] = r[l[1]].toLowerCase());
  }
  return r.auth = r.password ? r.username + ":" + r.password : r.username, r.origin = r.protocol !== "file:" && isSpecial(r.protocol) && r.host ? r.protocol + "//" + r.host : "null", r.href = r.toString(), r;
}
function toString(e) {
  (!e || typeof e != "function") && (e = qs.stringify);
  var t, n = this, r = n.host, s = n.protocol;
  s && s.charAt(s.length - 1) !== ":" && (s += ":");
  var o = s + (n.protocol && n.slashes || isSpecial(n.protocol) ? "//" : "");
  return n.username ? (o += n.username, n.password && (o += ":" + n.password), o += "@") : n.password ? (o += ":" + n.password, o += "@") : n.protocol !== "file:" && isSpecial(n.protocol) && !r && n.pathname !== "/" && (o += "@"), (r[r.length - 1] === ":" || port.test(n.hostname) && !n.port) && (r += ":"), o += r + n.pathname, t = typeof n.query == "object" ? e(n.query) : n.query, t && (o += t.charAt(0) !== "?" ? "?" + t : t), n.hash && (o += n.hash), o;
}
Url.prototype = { set, toString };
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;
var urlParse = Url;
(function(e) {
  var t = commonjsGlobal && commonjsGlobal.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.URLExt = void 0;
  const n = pathBrowserify, r = t(urlParse);
  (function(s) {
    function o(k) {
      if (typeof document < "u" && document) {
        const O = document.createElement("a");
        return O.href = k, O;
      }
      return (0, r.default)(k);
    }
    s.parse = o;
    function a(k) {
      return (0, r.default)(k).hostname;
    }
    s.getHostName = a;
    function l(k) {
      return k && o(k).toString();
    }
    s.normalize = l;
    function f(...k) {
      let O = (0, r.default)(k[0], {});
      const rt = O.protocol === "" && O.slashes;
      rt && (O = (0, r.default)(k[0], "https:" + k[0]));
      const st = `${rt ? "" : O.protocol}${O.slashes ? "//" : ""}${O.auth}${O.auth ? "@" : ""}${O.host}`, ft = n.posix.join(`${st && O.pathname[0] !== "/" ? "/" : ""}${O.pathname}`, ...k.slice(1));
      return `${st}${ft === "." ? "" : ft}`;
    }
    s.join = f;
    function p(k) {
      return f(...k.split("/").map(encodeURIComponent));
    }
    s.encodeParts = p;
    function d(k) {
      const O = Object.keys(k).filter((rt) => rt.length > 0);
      return O.length ? "?" + O.map((rt) => {
        const st = encodeURIComponent(String(k[rt]));
        return rt + (st ? "=" + st : "");
      }).join("&") : "";
    }
    s.objectToQueryString = d;
    function _(k) {
      return k.replace(/^\?/, "").split("&").reduce((O, rt) => {
        const [st, ft] = rt.split("=");
        return st.length > 0 && (O[st] = decodeURIComponent(ft || "")), O;
      }, {});
    }
    s.queryStringToObject = _;
    function S(k) {
      const { protocol: O } = o(k);
      return (!O || k.toLowerCase().indexOf(O) !== 0) && k.indexOf("/") !== 0;
    }
    s.isLocal = S;
  })(e.URLExt || (e.URLExt = {}));
})(url);
(function(exports) {
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(exports, "__esModule", { value: !0 }), exports.PageConfig = void 0;
  const coreutils_1 = distExports, minimist_1 = __importDefault(minimist), url_1 = url;
  (function(PageConfig) {
    function getOption(name) {
      if (configData)
        return configData[name] || getBodyData(name);
      configData = /* @__PURE__ */ Object.create(null);
      let found = !1;
      if (typeof document < "u" && document) {
        const e = document.getElementById("jupyter-config-data");
        e && (configData = JSON.parse(e.textContent || ""), found = !0);
      }
      if (!found && typeof process < "u" && process.argv)
        try {
          const cli = (0, minimist_1.default)(process.argv.slice(2)), path = pathBrowserify;
          let fullPath = "";
          "jupyter-config-data" in cli ? fullPath = path.resolve(cli["jupyter-config-data"]) : "JUPYTER_CONFIG_DATA" in process.env && (fullPath = path.resolve(process.env.JUPYTER_CONFIG_DATA)), fullPath && (configData = eval("require")(fullPath));
        } catch (e) {
          console.error(e);
        }
      if (!coreutils_1.JSONExt.isObject(configData))
        configData = /* @__PURE__ */ Object.create(null);
      else
        for (const e in configData)
          typeof configData[e] != "string" && (configData[e] = JSON.stringify(configData[e]));
      return configData[name] || getBodyData(name);
    }
    PageConfig.getOption = getOption;
    function setOption(e, t) {
      const n = getOption(e);
      return configData[e] = t, n;
    }
    PageConfig.setOption = setOption;
    function getBaseUrl() {
      return url_1.URLExt.normalize(getOption("baseUrl") || "/");
    }
    PageConfig.getBaseUrl = getBaseUrl;
    function getTreeUrl() {
      return url_1.URLExt.join(getBaseUrl(), getOption("treeUrl"));
    }
    PageConfig.getTreeUrl = getTreeUrl;
    function getShareUrl() {
      return url_1.URLExt.normalize(getOption("shareUrl") || getBaseUrl());
    }
    PageConfig.getShareUrl = getShareUrl;
    function getTreeShareUrl() {
      return url_1.URLExt.normalize(url_1.URLExt.join(getShareUrl(), getOption("treeUrl")));
    }
    PageConfig.getTreeShareUrl = getTreeShareUrl;
    function getUrl(e) {
      var t, n, r, s;
      let o = e.toShare ? getShareUrl() : getBaseUrl();
      const a = (t = e.mode) !== null && t !== void 0 ? t : getOption("mode"), l = (n = e.workspace) !== null && n !== void 0 ? n : getOption("workspace"), f = a === "single-document" ? "doc" : "lab";
      o = url_1.URLExt.join(o, f), l !== PageConfig.defaultWorkspace && (o = url_1.URLExt.join(o, "workspaces", encodeURIComponent((r = getOption("workspace")) !== null && r !== void 0 ? r : PageConfig.defaultWorkspace)));
      const p = (s = e.treePath) !== null && s !== void 0 ? s : getOption("treePath");
      return p && (o = url_1.URLExt.join(o, "tree", url_1.URLExt.encodeParts(p))), o;
    }
    PageConfig.getUrl = getUrl, PageConfig.defaultWorkspace = "default";
    function getWsUrl(e) {
      let t = getOption("wsUrl");
      if (!t) {
        if (e = e ? url_1.URLExt.normalize(e) : getBaseUrl(), e.indexOf("http") !== 0)
          return "";
        t = "ws" + e.slice(4);
      }
      return url_1.URLExt.normalize(t);
    }
    PageConfig.getWsUrl = getWsUrl;
    function getNBConvertURL({ path: e, format: t, download: n }) {
      const r = url_1.URLExt.encodeParts(e), s = url_1.URLExt.join(getBaseUrl(), "nbconvert", t, r);
      return n ? s + "?download=true" : s;
    }
    PageConfig.getNBConvertURL = getNBConvertURL;
    function getToken() {
      return getOption("token") || getBodyData("jupyterApiToken");
    }
    PageConfig.getToken = getToken;
    function getNotebookVersion() {
      const e = getOption("notebookVersion");
      return e === "" ? [0, 0, 0] : JSON.parse(e);
    }
    PageConfig.getNotebookVersion = getNotebookVersion;
    let configData = null;
    function getBodyData(e) {
      if (typeof document > "u" || !document.body)
        return "";
      const t = document.body.dataset[e];
      return typeof t > "u" ? "" : decodeURIComponent(t);
    }
    (function(e) {
      function t(s) {
        try {
          const o = getOption(s);
          if (o)
            return JSON.parse(o);
        } catch (o) {
          console.warn(`Unable to parse ${s}.`, o);
        }
        return [];
      }
      e.deferred = t("deferredExtensions"), e.disabled = t("disabledExtensions");
      function n(s) {
        const o = s.indexOf(":");
        let a = "";
        return o !== -1 && (a = s.slice(0, o)), e.deferred.some((l) => l === s || a && l === a);
      }
      e.isDeferred = n;
      function r(s) {
        const o = s.indexOf(":");
        let a = "";
        return o !== -1 && (a = s.slice(0, o)), e.disabled.some((l) => l === s || a && l === a);
      }
      e.isDisabled = r;
    })(PageConfig.Extension || (PageConfig.Extension = {}));
  })(exports.PageConfig || (exports.PageConfig = {}));
})(pageconfig);
var path = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.PathExt = void 0;
  const t = pathBrowserify;
  (function(n) {
    function r(...S) {
      const k = t.posix.join(...S);
      return k === "." ? "" : _(k);
    }
    n.join = r;
    function s(S, k) {
      return t.posix.basename(S, k);
    }
    n.basename = s;
    function o(S) {
      const k = _(t.posix.dirname(S));
      return k === "." ? "" : k;
    }
    n.dirname = o;
    function a(S) {
      return t.posix.extname(S);
    }
    n.extname = a;
    function l(S) {
      return S === "" ? "" : _(t.posix.normalize(S));
    }
    n.normalize = l;
    function f(...S) {
      return _(t.posix.resolve(...S));
    }
    n.resolve = f;
    function p(S, k) {
      return _(t.posix.relative(S, k));
    }
    n.relative = p;
    function d(S) {
      return S.length > 0 && S.indexOf(".") !== 0 && (S = `.${S}`), S;
    }
    n.normalizeExtension = d;
    function _(S) {
      return S.indexOf("/") === 0 && (S = S.slice(1)), S;
    }
    n.removeSlash = _;
  })(e.PathExt || (e.PathExt = {}));
})(path);
var signal = {};
Object.defineProperty(signal, "__esModule", { value: !0 });
signal.signalToPromise = void 0;
const coreutils_1$b = distExports;
function signalToPromise(e, t) {
  const n = new coreutils_1$b.PromiseDelegate();
  function r() {
    e.disconnect(s);
  }
  function s(o, a) {
    r(), n.resolve([o, a]);
  }
  return e.connect(s), (t ?? 0) > 0 && setTimeout(() => {
    r(), n.reject(`Signal not emitted within ${t} ms.`);
  }, t), n.promise;
}
signal.signalToPromise = signalToPromise;
var text = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Text = void 0, function(t) {
    const n = 2 > 1;
    function r(l, f) {
      if (n)
        return l;
      let p = l;
      for (let d = 0; d + 1 < f.length && d < l; d++) {
        const _ = f.charCodeAt(d);
        if (_ >= 55296 && _ <= 56319) {
          const S = f.charCodeAt(d + 1);
          S >= 56320 && S <= 57343 && (p--, d++);
        }
      }
      return p;
    }
    t.jsIndexToCharIndex = r;
    function s(l, f) {
      if (n)
        return l;
      let p = l;
      for (let d = 0; d + 1 < f.length && d < p; d++) {
        const _ = f.charCodeAt(d);
        if (_ >= 55296 && _ <= 56319) {
          const S = f.charCodeAt(d + 1);
          S >= 56320 && S <= 57343 && (p++, d++);
        }
      }
      return p;
    }
    t.charIndexToJsIndex = s;
    function o(l, f = !1) {
      return l.replace(/^(\w)|[\s-_:]+(\w)/g, function(p, d, _) {
        return _ ? _.toUpperCase() : f ? d.toUpperCase() : d.toLowerCase();
      });
    }
    t.camelCase = o;
    function a(l) {
      return (l || "").toLowerCase().split(" ").map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join(" ");
    }
    t.titleCase = a;
  }(e.Text || (e.Text = {}));
})(text);
var time = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Time = void 0;
  const t = [
    { name: "years", milliseconds: 365 * 24 * 60 * 60 * 1e3 },
    { name: "months", milliseconds: 30 * 24 * 60 * 60 * 1e3 },
    { name: "days", milliseconds: 24 * 60 * 60 * 1e3 },
    { name: "hours", milliseconds: 60 * 60 * 1e3 },
    { name: "minutes", milliseconds: 60 * 1e3 },
    { name: "seconds", milliseconds: 1e3 }
  ];
  (function(n) {
    function r(o) {
      const a = document.documentElement.lang || "en", l = new Intl.RelativeTimeFormat(a, { numeric: "auto" }), f = new Date(o).getTime() - Date.now();
      for (let p of t) {
        const d = Math.ceil(f / p.milliseconds);
        if (d !== 0)
          return l.format(d, p.name);
      }
      return l.format(0, "seconds");
    }
    n.formatHuman = r;
    function s(o) {
      const a = document.documentElement.lang || "en";
      return new Intl.DateTimeFormat(a, {
        dateStyle: "short",
        timeStyle: "short"
      }).format(new Date(o));
    }
    n.format = s;
  })(e.Time || (e.Time = {}));
})(time);
(function(e) {
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
    a === void 0 && (a = o);
    var l = Object.getOwnPropertyDescriptor(s, o);
    (!l || ("get" in l ? !s.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, l);
  } : function(r, s, o, a) {
    a === void 0 && (a = o), r[a] = s[o];
  }), n = commonjsGlobal && commonjsGlobal.__exportStar || function(r, s) {
    for (var o in r)
      o !== "default" && !Object.prototype.hasOwnProperty.call(s, o) && t(s, r, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(activitymonitor, e), n(interfaces$1, e), n(markdowncodeblocks, e), n(pageconfig, e), n(path, e), n(signal, e), n(text, e), n(time, e), n(url, e);
})(lib$1);
var ws = {}, hasRequiredWs;
function requireWs() {
  return hasRequiredWs || (hasRequiredWs = 1, Object.defineProperty(ws, "__esModule", { value: !0 }), ws.default = WebSocket), ws;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ServerConnection = void 0;
  const t = lib$1;
  let n;
  typeof window > "u" ? n = requireWs() : n = WebSocket;
  var r;
  (function(o) {
    function a(d) {
      return s.makeSettings(d);
    }
    o.makeSettings = a;
    function l(d, _, S) {
      return s.handleRequest(d, _, S);
    }
    o.makeRequest = l;
    class f extends Error {
      /**
       * Create a ResponseError from a response, handling the traceback and message
       * as appropriate.
       *
       * @param response The response object.
       *
       * @returns A promise that resolves with a `ResponseError` object.
       */
      static async create(_) {
        try {
          const S = await _.json(), { message: k, traceback: O } = S;
          return O && console.error(O), new f(_, k ?? f._defaultMessage(_), O ?? "");
        } catch (S) {
          return console.debug(S), new f(_);
        }
      }
      /**
       * Create a new response error.
       */
      constructor(_, S = f._defaultMessage(_), k = "") {
        super(S), this.response = _, this.traceback = k;
      }
      static _defaultMessage(_) {
        return `Invalid response: ${_.status} ${_.statusText}`;
      }
    }
    o.ResponseError = f;
    class p extends TypeError {
      /**
       * Create a new network error.
       */
      constructor(_) {
        super(_.message), this.stack = _.stack;
      }
    }
    o.NetworkError = p;
  })(r = e.ServerConnection || (e.ServerConnection = {}));
  var s;
  (function(o) {
    function a(p = {}) {
      var d;
      const _ = t.PageConfig.getBaseUrl(), S = t.PageConfig.getWsUrl(), k = t.URLExt.normalize(p.baseUrl) || _;
      let O = p.wsUrl;
      return !O && k === _ && (O = S), !O && k.indexOf("http") === 0 && (O = "ws" + k.slice(4)), O = O ?? S, {
        init: { cache: "no-store", credentials: "same-origin" },
        fetch,
        Headers,
        Request,
        WebSocket: n,
        token: t.PageConfig.getToken(),
        appUrl: t.PageConfig.getOption("appUrl"),
        appendToken: typeof window > "u" || typeof process < "u" && ((d = process == null ? void 0 : process.env) === null || d === void 0 ? void 0 : d.JEST_WORKER_ID) !== void 0 || t.URLExt.getHostName(_) !== t.URLExt.getHostName(O),
        ...p,
        baseUrl: k,
        wsUrl: O
      };
    }
    o.makeSettings = a;
    function l(p, d, _) {
      var S;
      if (p.indexOf(_.baseUrl) !== 0)
        throw new Error("Can only be used for notebook server requests");
      ((S = d.cache) !== null && S !== void 0 ? S : _.init.cache) === "no-store" && (p += (/\?/.test(p) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
      const O = new _.Request(p, { ..._.init, ...d });
      let rt = !1;
      if (_.token && (rt = !0, O.headers.append("Authorization", `token ${_.token}`)), typeof document < "u" && (document != null && document.cookie)) {
        const st = f("_xsrf");
        st !== void 0 && (rt = !0, O.headers.append("X-XSRFToken", st));
      }
      return !O.headers.has("Content-Type") && rt && O.headers.set("Content-Type", "application/json"), _.fetch.call(null, O).catch((st) => {
        throw new r.NetworkError(st);
      });
    }
    o.handleRequest = l;
    function f(p) {
      const d = document.cookie.match("\\b" + p + "=([^;]*)\\b");
      return d == null ? void 0 : d[1];
    }
  })(s || (s = {}));
})(serverconnection);
Object.defineProperty(basemanager, "__esModule", { value: !0 });
basemanager.BaseManager = void 0;
const signaling_1$4 = require$$0, serverconnection_1$7 = serverconnection;
class BaseManager {
  constructor(t) {
    var n;
    this._isDisposed = !1, this._disposed = new signaling_1$4.Signal(this), this.serverSettings = (n = t.serverSettings) !== null && n !== void 0 ? n : serverconnection_1$7.ServerConnection.makeSettings();
  }
  /**
   * A signal emitted when the delegate is disposed.
   */
  get disposed() {
    return this._disposed;
  }
  /**
   * Test whether the delegate has been disposed.
   */
  get isDisposed() {
    return this._isDisposed;
  }
  /**
   * Whether the manager is active.
   */
  get isActive() {
    return !0;
  }
  /**
   * Dispose of the delegate and invoke the callback function.
   */
  dispose() {
    this.isDisposed || (this._disposed.emit(void 0), signaling_1$4.Signal.clearData(this));
  }
}
basemanager.BaseManager = BaseManager;
var config$1 = {}, hasRequiredConfig;
function requireConfig() {
  return hasRequiredConfig || (hasRequiredConfig = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ConfigWithDefaults = e.ConfigSection = void 0;
    const t = lib$1, n = requireLib(), r = "api/config";
    (function(a) {
      function l(f) {
        const p = new s(f);
        return p.load().then(() => p);
      }
      a.create = l;
    })(e.ConfigSection || (e.ConfigSection = {}));
    class s {
      /**
       * Construct a new config section.
       */
      constructor(l) {
        var f;
        this._url = "unknown";
        const p = this.serverSettings = (f = l.serverSettings) !== null && f !== void 0 ? f : n.ServerConnection.makeSettings();
        this._url = t.URLExt.join(p.baseUrl, r, encodeURIComponent(l.name));
      }
      /**
       * Get the data for this section.
       */
      get data() {
        return this._data;
      }
      /**
       * Load the initial data for this section.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/config).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       */
      async load() {
        const l = await n.ServerConnection.makeRequest(this._url, {}, this.serverSettings);
        if (l.status !== 200)
          throw await n.ServerConnection.ResponseError.create(l);
        this._data = await l.json();
      }
      /**
       * Modify the stored config values.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/config).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       *
       * Updates the local data immediately, sends the change to the server,
       * and updates the local data with the response, and fulfils the promise
       * with that data.
       */
      async update(l) {
        this._data = { ...this._data, ...l };
        const f = {
          method: "PATCH",
          body: JSON.stringify(l)
        }, p = await n.ServerConnection.makeRequest(this._url, f, this.serverSettings);
        if (p.status !== 200)
          throw await n.ServerConnection.ResponseError.create(p);
        return this._data = await p.json(), this._data;
      }
    }
    class o {
      /**
       * Create a new config with defaults.
       */
      constructor(l) {
        var f, p;
        this._className = "", this._section = l.section, this._defaults = (f = l.defaults) !== null && f !== void 0 ? f : {}, this._className = (p = l.className) !== null && p !== void 0 ? p : "";
      }
      /**
       * Get data from the config section or fall back to defaults.
       */
      get(l) {
        const f = this._classData();
        return l in f ? f[l] : this._defaults[l];
      }
      /**
       * Set a config value.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/config).
       *
       * The promise is fulfilled on a valid response and rejected otherwise.
       *
       * Sends the update to the server, and changes our local copy of the data
       * immediately.
       */
      set(l, f) {
        const p = {};
        if (p[l] = f, this._className) {
          const d = {};
          return d[this._className] = p, this._section.update(d);
        } else
          return this._section.update(p);
      }
      /**
       * Get data from the Section with our classname, if available.
       *
       * #### Notes
       * If we have no classname, get all of the data in the Section
       */
      _classData() {
        const l = this._section.data;
        return this._className && this._className in l ? l[this._className] : l;
      }
    }
    e.ConfigWithDefaults = o;
  }(config$1)), config$1;
}
var contents = {}, validate$4 = {}, validate$3 = {};
Object.defineProperty(validate$3, "__esModule", { value: !0 });
validate$3.validateProperty = void 0;
function validateProperty(e, t, n, r = []) {
  if (!e.hasOwnProperty(t))
    throw Error(`Missing property '${t}'`);
  const s = e[t];
  if (n !== void 0) {
    let o = !0;
    switch (n) {
      case "array":
        o = Array.isArray(s);
        break;
      case "object":
        o = typeof s < "u";
        break;
      default:
        o = typeof s === n;
    }
    if (!o)
      throw new Error(`Property '${t}' is not of type '${n}'`);
    if (r.length > 0) {
      let a = !0;
      switch (n) {
        case "string":
        case "number":
        case "boolean":
          a = r.includes(s);
          break;
        default:
          a = r.findIndex((l) => l === s) >= 0;
          break;
      }
      if (!a)
        throw new Error(`Property '${t}' is not one of the valid values ${JSON.stringify(r)}`);
    }
  }
}
validate$3.validateProperty = validateProperty;
Object.defineProperty(validate$4, "__esModule", { value: !0 });
validate$4.validateCheckpointModel = validate$4.validateContentsModel = void 0;
const validate_1$4 = validate$3;
function validateContentsModel(e) {
  (0, validate_1$4.validateProperty)(e, "name", "string"), (0, validate_1$4.validateProperty)(e, "path", "string"), (0, validate_1$4.validateProperty)(e, "type", "string"), (0, validate_1$4.validateProperty)(e, "created", "string"), (0, validate_1$4.validateProperty)(e, "last_modified", "string"), (0, validate_1$4.validateProperty)(e, "mimetype", "object"), (0, validate_1$4.validateProperty)(e, "content", "object"), (0, validate_1$4.validateProperty)(e, "format", "object");
}
validate$4.validateContentsModel = validateContentsModel;
function validateCheckpointModel(e) {
  (0, validate_1$4.validateProperty)(e, "id", "string"), (0, validate_1$4.validateProperty)(e, "last_modified", "string");
}
validate$4.validateCheckpointModel = validateCheckpointModel;
var hasRequiredContents;
function requireContents() {
  return hasRequiredContents || (hasRequiredContents = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(k, O, rt, st) {
      st === void 0 && (st = rt);
      var ft = Object.getOwnPropertyDescriptor(O, rt);
      (!ft || ("get" in ft ? !O.__esModule : ft.writable || ft.configurable)) && (ft = { enumerable: !0, get: function() {
        return O[rt];
      } }), Object.defineProperty(k, st, ft);
    } : function(k, O, rt, st) {
      st === void 0 && (st = rt), k[st] = O[rt];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(k, O) {
      Object.defineProperty(k, "default", { enumerable: !0, value: O });
    } : function(k, O) {
      k.default = O;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(k) {
      if (k && k.__esModule)
        return k;
      var O = {};
      if (k != null)
        for (var rt in k)
          rt !== "default" && Object.prototype.hasOwnProperty.call(k, rt) && t(O, k, rt);
      return n(O, k), O;
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Drive = e.ContentsManager = e.Contents = void 0;
    const s = lib$1, o = require$$0, a = requireLib(), l = r(validate$4), f = "api/contents", p = "files";
    (function(k) {
      function O(st) {
        l.validateContentsModel(st);
      }
      k.validateContentsModel = O;
      function rt(st) {
        l.validateCheckpointModel(st);
      }
      k.validateCheckpointModel = rt;
    })(e.Contents || (e.Contents = {}));
    class d {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(O = {}) {
        var rt, st;
        this._isDisposed = !1, this._additionalDrives = /* @__PURE__ */ new Map(), this._fileChanged = new o.Signal(this);
        const ft = this.serverSettings = (rt = O.serverSettings) !== null && rt !== void 0 ? rt : a.ServerConnection.makeSettings();
        this._defaultDrive = (st = O.defaultDrive) !== null && st !== void 0 ? st : new _({ serverSettings: ft }), this._defaultDrive.fileChanged.connect(this._onFileChanged, this);
      }
      /**
       * A signal emitted when a file operation takes place.
       */
      get fileChanged() {
        return this._fileChanged;
      }
      /**
       * Test whether the manager has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources held by the manager.
       */
      dispose() {
        this.isDisposed || (this._isDisposed = !0, o.Signal.clearData(this));
      }
      /**
       * Add an `IDrive` to the manager.
       */
      addDrive(O) {
        this._additionalDrives.set(O.name, O), O.fileChanged.connect(this._onFileChanged, this);
      }
      /**
       * Given a path, get a shared model factory from the
       * relevant backend. Returns `null` if the backend
       * does not provide one.
       */
      getSharedModelFactory(O) {
        var rt;
        const [st] = this._driveForPath(O);
        return (rt = st == null ? void 0 : st.sharedModelFactory) !== null && rt !== void 0 ? rt : null;
      }
      /**
       * Given a path of the form `drive:local/portion/of/it.txt`
       * get the local part of it.
       *
       * @param path: the path.
       *
       * @returns The local part of the path.
       */
      localPath(O) {
        const rt = O.split("/"), st = rt[0].split(":");
        return st.length === 1 || !this._additionalDrives.has(st[0]) ? s.PathExt.removeSlash(O) : s.PathExt.join(st.slice(1).join(":"), ...rt.slice(1));
      }
      /**
       * Normalize a global path. Reduces '..' and '.' parts, and removes
       * leading slashes from the local part of the path, while retaining
       * the drive name if it exists.
       *
       * @param path: the path.
       *
       * @returns The normalized path.
       */
      normalize(O) {
        const rt = O.split(":");
        return rt.length === 1 ? s.PathExt.normalize(O) : `${rt[0]}:${s.PathExt.normalize(rt.slice(1).join(":"))}`;
      }
      /**
       * Resolve a global path, starting from the root path. Behaves like
       * posix-path.resolve, with 3 differences:
       *  - will never prepend cwd
       *  - if root has a drive name, the result is prefixed with "<drive>:"
       *  - before adding drive name, leading slashes are removed
       *
       * @param path: the path.
       *
       * @returns The normalized path.
       */
      resolvePath(O, rt) {
        const st = this.driveName(O), ft = this.localPath(O), ut = s.PathExt.resolve("/", ft, rt);
        return st ? `${st}:${ut}` : ut;
      }
      /**
       * Given a path of the form `drive:local/portion/of/it.txt`
       * get the name of the drive. If the path is missing
       * a drive portion, returns an empty string.
       *
       * @param path: the path.
       *
       * @returns The drive name for the path, or the empty string.
       */
      driveName(O) {
        const st = O.split("/")[0].split(":");
        return st.length === 1 ? "" : this._additionalDrives.has(st[0]) ? st[0] : "";
      }
      /**
       * Get a file or directory.
       *
       * @param path: The path to the file.
       *
       * @param options: The options used to fetch the file.
       *
       * @returns A promise which resolves with the file content.
       */
      get(O, rt) {
        const [st, ft] = this._driveForPath(O);
        return st.get(ft, rt).then((ut) => {
          const dt = [];
          if (ut.type === "directory" && ut.content) {
            for (const T of ut.content)
              dt.push({ ...T, path: this._toGlobalPath(st, T.path) });
            return {
              ...ut,
              path: this._toGlobalPath(st, ft),
              content: dt,
              serverPath: ut.path
            };
          } else
            return {
              ...ut,
              path: this._toGlobalPath(st, ft),
              serverPath: ut.path
            };
        });
      }
      /**
       * Get an encoded download url given a file path.
       *
       * @param path - An absolute POSIX file path on the server.
       *
       * #### Notes
       * It is expected that the path contains no relative paths.
       *
       * The returned URL may include a query parameter.
       */
      getDownloadUrl(O) {
        const [rt, st] = this._driveForPath(O);
        return rt.getDownloadUrl(st);
      }
      /**
       * Create a new untitled file or directory in the specified directory path.
       *
       * @param options: The options used to create the file.
       *
       * @returns A promise which resolves with the created file content when the
       *    file is created.
       */
      newUntitled(O = {}) {
        if (O.path) {
          const rt = this.normalize(O.path), [st, ft] = this._driveForPath(rt);
          return st.newUntitled({ ...O, path: ft }).then((ut) => ({
            ...ut,
            path: s.PathExt.join(rt, ut.name),
            serverPath: ut.path
          }));
        } else
          return this._defaultDrive.newUntitled(O);
      }
      /**
       * Delete a file.
       *
       * @param path - The path to the file.
       *
       * @returns A promise which resolves when the file is deleted.
       */
      delete(O) {
        const [rt, st] = this._driveForPath(O);
        return rt.delete(st);
      }
      /**
       * Rename a file or directory.
       *
       * @param path - The original file path.
       *
       * @param newPath - The new file path.
       *
       * @returns A promise which resolves with the new file contents model when
       *   the file is renamed.
       */
      rename(O, rt) {
        const [st, ft] = this._driveForPath(O), [ut, dt] = this._driveForPath(rt);
        if (st !== ut)
          throw Error("ContentsManager: renaming files must occur within a Drive");
        return st.rename(ft, dt).then((T) => ({
          ...T,
          path: this._toGlobalPath(st, dt),
          serverPath: T.path
        }));
      }
      /**
       * Save a file.
       *
       * @param path - The desired file path.
       *
       * @param options - Optional overrides to the model.
       *
       * @returns A promise which resolves with the file content model when the
       *   file is saved.
       *
       * #### Notes
       * Ensure that `model.content` is populated for the file.
       */
      save(O, rt = {}) {
        const st = this.normalize(O), [ft, ut] = this._driveForPath(O);
        return ft.save(ut, { ...rt, path: ut }).then((dt) => ({
          ...dt,
          path: st,
          serverPath: dt.path
        }));
      }
      /**
       * Copy a file into a given directory.
       *
       * @param path - The original file path.
       *
       * @param toDir - The destination directory path.
       *
       * @returns A promise which resolves with the new contents model when the
       *  file is copied.
       *
       * #### Notes
       * The server will select the name of the copied file.
       */
      copy(O, rt) {
        const [st, ft] = this._driveForPath(O), [ut, dt] = this._driveForPath(rt);
        if (st === ut)
          return st.copy(ft, dt).then((T) => ({
            ...T,
            path: this._toGlobalPath(st, T.path),
            serverPath: T.path
          }));
        throw Error("Copying files between drives is not currently implemented");
      }
      /**
       * Create a checkpoint for a file.
       *
       * @param path - The path of the file.
       *
       * @returns A promise which resolves with the new checkpoint model when the
       *   checkpoint is created.
       */
      createCheckpoint(O) {
        const [rt, st] = this._driveForPath(O);
        return rt.createCheckpoint(st);
      }
      /**
       * List available checkpoints for a file.
       *
       * @param path - The path of the file.
       *
       * @returns A promise which resolves with a list of checkpoint models for
       *    the file.
       */
      listCheckpoints(O) {
        const [rt, st] = this._driveForPath(O);
        return rt.listCheckpoints(st);
      }
      /**
       * Restore a file to a known checkpoint state.
       *
       * @param path - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to restore.
       *
       * @returns A promise which resolves when the checkpoint is restored.
       */
      restoreCheckpoint(O, rt) {
        const [st, ft] = this._driveForPath(O);
        return st.restoreCheckpoint(ft, rt);
      }
      /**
       * Delete a checkpoint for a file.
       *
       * @param path - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to delete.
       *
       * @returns A promise which resolves when the checkpoint is deleted.
       */
      deleteCheckpoint(O, rt) {
        const [st, ft] = this._driveForPath(O);
        return st.deleteCheckpoint(ft, rt);
      }
      /**
       * Given a drive and a local path, construct a fully qualified
       * path. The inverse of `_driveForPath`.
       *
       * @param drive: an `IDrive`.
       *
       * @param localPath: the local path on the drive.
       *
       * @returns the fully qualified path.
       */
      _toGlobalPath(O, rt) {
        return O === this._defaultDrive ? s.PathExt.removeSlash(rt) : `${O.name}:${s.PathExt.removeSlash(rt)}`;
      }
      /**
       * Given a path, get the `IDrive to which it refers,
       * where the path satisfies the pattern
       * `'driveName:path/to/file'`. If there is no `driveName`
       * prepended to the path, it returns the default drive.
       *
       * @param path: a path to a file.
       *
       * @returns A tuple containing an `IDrive` object for the path,
       * and a local path for that drive.
       */
      _driveForPath(O) {
        const rt = this.driveName(O), st = this.localPath(O);
        return rt ? [this._additionalDrives.get(rt), st] : [this._defaultDrive, st];
      }
      /**
       * Respond to fileChanged signals from the drives attached to
       * the manager. This prepends the drive name to the path if necessary,
       * and then forwards the signal.
       */
      _onFileChanged(O, rt) {
        var st, ft;
        if (O === this._defaultDrive)
          this._fileChanged.emit(rt);
        else {
          let ut = null, dt = null;
          !((st = rt.newValue) === null || st === void 0) && st.path && (ut = {
            ...rt.newValue,
            path: this._toGlobalPath(O, rt.newValue.path)
          }), !((ft = rt.oldValue) === null || ft === void 0) && ft.path && (dt = {
            ...rt.oldValue,
            path: this._toGlobalPath(O, rt.oldValue.path)
          }), this._fileChanged.emit({
            type: rt.type,
            newValue: ut,
            oldValue: dt
          });
        }
      }
    }
    e.ContentsManager = d;
    class _ {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(O = {}) {
        var rt, st, ft;
        this._isDisposed = !1, this._fileChanged = new o.Signal(this), this.name = (rt = O.name) !== null && rt !== void 0 ? rt : "Default", this._apiEndpoint = (st = O.apiEndpoint) !== null && st !== void 0 ? st : f, this.serverSettings = (ft = O.serverSettings) !== null && ft !== void 0 ? ft : a.ServerConnection.makeSettings();
      }
      /**
       * A signal emitted when a file operation takes place.
       */
      get fileChanged() {
        return this._fileChanged;
      }
      /**
       * Test whether the manager has been disposed.
       */
      get isDisposed() {
        return this._isDisposed;
      }
      /**
       * Dispose of the resources held by the manager.
       */
      dispose() {
        this.isDisposed || (this._isDisposed = !0, o.Signal.clearData(this));
      }
      /**
       * Get a file or directory.
       *
       * @param localPath: The path to the file.
       *
       * @param options: The options used to fetch the file.
       *
       * @returns A promise which resolves with the file content.
       *
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async get(O, rt) {
        let st = this._getUrl(O);
        if (rt) {
          rt.type === "notebook" && delete rt.format;
          const T = rt.content ? "1" : "0", nt = { ...rt, content: T };
          st += s.URLExt.objectToQueryString(nt);
        }
        const ft = this.serverSettings, ut = await a.ServerConnection.makeRequest(st, {}, ft);
        if (ut.status !== 200)
          throw await a.ServerConnection.ResponseError.create(ut);
        const dt = await ut.json();
        return l.validateContentsModel(dt), dt;
      }
      /**
       * Get an encoded download url given a file path.
       *
       * @param localPath - An absolute POSIX file path on the server.
       *
       * #### Notes
       * It is expected that the path contains no relative paths.
       *
       * The returned URL may include a query parameter.
       */
      getDownloadUrl(O) {
        const rt = this.serverSettings.baseUrl;
        let st = s.URLExt.join(rt, p, s.URLExt.encodeParts(O));
        const ft = document.cookie.match("\\b_xsrf=([^;]*)\\b");
        if (ft) {
          const ut = new URL(st);
          ut.searchParams.append("_xsrf", ft[1]), st = ut.toString();
        }
        return Promise.resolve(st);
      }
      /**
       * Create a new untitled file or directory in the specified directory path.
       *
       * @param options: The options used to create the file.
       *
       * @returns A promise which resolves with the created file content when the
       *    file is created.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async newUntitled(O = {}) {
        var rt;
        let st = "{}";
        O && (O.ext && (O.ext = S.normalizeExtension(O.ext)), st = JSON.stringify(O));
        const ft = this.serverSettings, ut = this._getUrl((rt = O.path) !== null && rt !== void 0 ? rt : ""), dt = {
          method: "POST",
          body: st
        }, T = await a.ServerConnection.makeRequest(ut, dt, ft);
        if (T.status !== 201)
          throw await a.ServerConnection.ResponseError.create(T);
        const nt = await T.json();
        return l.validateContentsModel(nt), this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: nt
        }), nt;
      }
      /**
       * Delete a file.
       *
       * @param localPath - The path to the file.
       *
       * @returns A promise which resolves when the file is deleted.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents).
       */
      async delete(O) {
        const rt = this._getUrl(O), st = this.serverSettings, ft = { method: "DELETE" }, ut = await a.ServerConnection.makeRequest(rt, ft, st);
        if (ut.status !== 204)
          throw await a.ServerConnection.ResponseError.create(ut);
        this._fileChanged.emit({
          type: "delete",
          oldValue: { path: O },
          newValue: null
        });
      }
      /**
       * Rename a file or directory.
       *
       * @param oldLocalPath - The original file path.
       *
       * @param newLocalPath - The new file path.
       *
       * @returns A promise which resolves with the new file contents model when
       *   the file is renamed.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async rename(O, rt) {
        const st = this.serverSettings, ft = this._getUrl(O), ut = {
          method: "PATCH",
          body: JSON.stringify({ path: rt })
        }, dt = await a.ServerConnection.makeRequest(ft, ut, st);
        if (dt.status !== 200)
          throw await a.ServerConnection.ResponseError.create(dt);
        const T = await dt.json();
        return l.validateContentsModel(T), this._fileChanged.emit({
          type: "rename",
          oldValue: { path: O },
          newValue: T
        }), T;
      }
      /**
       * Save a file.
       *
       * @param localPath - The desired file path.
       *
       * @param options - Optional overrides to the model.
       *
       * @returns A promise which resolves with the file content model when the
       *   file is saved.
       *
       * #### Notes
       * Ensure that `model.content` is populated for the file.
       *
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async save(O, rt = {}) {
        const st = this.serverSettings, ft = this._getUrl(O), ut = {
          method: "PUT",
          body: JSON.stringify(rt)
        }, dt = await a.ServerConnection.makeRequest(ft, ut, st);
        if (dt.status !== 200 && dt.status !== 201)
          throw await a.ServerConnection.ResponseError.create(dt);
        const T = await dt.json();
        return l.validateContentsModel(T), this._fileChanged.emit({
          type: "save",
          oldValue: null,
          newValue: T
        }), T;
      }
      /**
       * Copy a file into a given directory.
       *
       * @param localPath - The original file path.
       *
       * @param toDir - The destination directory path.
       *
       * @returns A promise which resolves with the new contents model when the
       *  file is copied.
       *
       * #### Notes
       * The server will select the name of the copied file.
       *
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async copy(O, rt) {
        const st = this.serverSettings, ft = this._getUrl(rt), ut = {
          method: "POST",
          body: JSON.stringify({ copy_from: O })
        }, dt = await a.ServerConnection.makeRequest(ft, ut, st);
        if (dt.status !== 201)
          throw await a.ServerConnection.ResponseError.create(dt);
        const T = await dt.json();
        return l.validateContentsModel(T), this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: T
        }), T;
      }
      /**
       * Create a checkpoint for a file.
       *
       * @param localPath - The path of the file.
       *
       * @returns A promise which resolves with the new checkpoint model when the
       *   checkpoint is created.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async createCheckpoint(O) {
        const rt = this._getUrl(O, "checkpoints"), st = { method: "POST" }, ft = await a.ServerConnection.makeRequest(rt, st, this.serverSettings);
        if (ft.status !== 201)
          throw await a.ServerConnection.ResponseError.create(ft);
        const ut = await ft.json();
        return l.validateCheckpointModel(ut), ut;
      }
      /**
       * List available checkpoints for a file.
       *
       * @param localPath - The path of the file.
       *
       * @returns A promise which resolves with a list of checkpoint models for
       *    the file.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents) and validates the response model.
       */
      async listCheckpoints(O) {
        const rt = this._getUrl(O, "checkpoints"), st = await a.ServerConnection.makeRequest(rt, {}, this.serverSettings);
        if (st.status !== 200)
          throw await a.ServerConnection.ResponseError.create(st);
        const ft = await st.json();
        if (!Array.isArray(ft))
          throw new Error("Invalid Checkpoint list");
        for (let ut = 0; ut < ft.length; ut++)
          l.validateCheckpointModel(ft[ut]);
        return ft;
      }
      /**
       * Restore a file to a known checkpoint state.
       *
       * @param localPath - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to restore.
       *
       * @returns A promise which resolves when the checkpoint is restored.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents).
       */
      async restoreCheckpoint(O, rt) {
        const st = this._getUrl(O, "checkpoints", rt), ft = { method: "POST" }, ut = await a.ServerConnection.makeRequest(st, ft, this.serverSettings);
        if (ut.status !== 204)
          throw await a.ServerConnection.ResponseError.create(ut);
      }
      /**
       * Delete a checkpoint for a file.
       *
       * @param localPath - The path of the file.
       *
       * @param checkpointID - The id of the checkpoint to delete.
       *
       * @returns A promise which resolves when the checkpoint is deleted.
       *
       * #### Notes
       * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/contents).
       */
      async deleteCheckpoint(O, rt) {
        const st = this._getUrl(O, "checkpoints", rt), ft = { method: "DELETE" }, ut = await a.ServerConnection.makeRequest(st, ft, this.serverSettings);
        if (ut.status !== 204)
          throw await a.ServerConnection.ResponseError.create(ut);
      }
      /**
       * Get a REST url for a file given a path.
       */
      _getUrl(...O) {
        const rt = O.map((ft) => s.URLExt.encodeParts(ft)), st = this.serverSettings.baseUrl;
        return s.URLExt.join(st, this._apiEndpoint, ...rt);
      }
    }
    e.Drive = _;
    var S;
    (function(k) {
      function O(rt) {
        return rt.length > 0 && rt.indexOf(".") !== 0 && (rt = `.${rt}`), rt;
      }
      k.normalizeExtension = O;
    })(S || (S = {}));
  }(contents)), contents;
}
var event = {};
class Poll {
  /**
   * Instantiate a new poll with exponential backoff in case of failure.
   *
   * @param options - The poll instantiation options.
   */
  constructor(t) {
    var n;
    this._disposed = new Signal(this), this._lingered = 0, this._tick = new PromiseDelegate(), this._ticked = new Signal(this), this._factory = t.factory, this._linger = (n = t.linger) !== null && n !== void 0 ? n : Private$7.DEFAULT_LINGER, this._standby = t.standby || Private$7.DEFAULT_STANDBY, this._state = { ...Private$7.DEFAULT_STATE, timestamp: (/* @__PURE__ */ new Date()).getTime() };
    const r = t.frequency || {}, s = Math.max(r.interval || 0, r.max || 0, Private$7.DEFAULT_FREQUENCY.max);
    this.frequency = { ...Private$7.DEFAULT_FREQUENCY, ...r, max: s }, this.name = t.name || Private$7.DEFAULT_NAME, (!("auto" in t) || t.auto) && setTimeout(() => this.start());
  }
  /**
   * A signal emitted when the poll is disposed.
   */
  get disposed() {
    return this._disposed;
  }
  /**
   * The polling frequency parameters.
   */
  get frequency() {
    return this._frequency;
  }
  set frequency(t) {
    if (this.isDisposed || JSONExt.deepEqual(t, this.frequency || {}))
      return;
    let { backoff: n, interval: r, max: s } = t;
    if (r = Math.round(r), s = Math.round(s), typeof n == "number" && n < 1)
      throw new Error("Poll backoff growth factor must be at least 1");
    if ((r < 0 || r > s) && r !== Poll.NEVER)
      throw new Error("Poll interval must be between 0 and max");
    if (s > Poll.MAX_INTERVAL && s !== Poll.NEVER)
      throw new Error(`Max interval must be less than ${Poll.MAX_INTERVAL}`);
    this._frequency = { backoff: n, interval: r, max: s };
  }
  /**
   * Whether the poll is disposed.
   */
  get isDisposed() {
    return this.state.phase === "disposed";
  }
  /**
   * Indicates when the poll switches to standby.
   */
  get standby() {
    return this._standby;
  }
  set standby(t) {
    this.isDisposed || this.standby === t || (this._standby = t);
  }
  /**
   * The poll state, which is the content of the current poll tick.
   */
  get state() {
    return this._state;
  }
  /**
   * A promise that resolves when the poll next ticks.
   */
  get tick() {
    return this._tick.promise;
  }
  /**
   * A signal emitted when the poll ticks and fires off a new request.
   */
  get ticked() {
    return this._ticked;
  }
  /**
   * Return an async iterator that yields every tick.
   */
  async *[Symbol.asyncIterator]() {
    for (; !this.isDisposed; )
      yield this.state, await this.tick.catch(() => {
      });
  }
  /**
   * Dispose the poll.
   */
  dispose() {
    this.isDisposed || (this._state = {
      ...Private$7.DISPOSED_STATE,
      timestamp: (/* @__PURE__ */ new Date()).getTime()
    }, this._tick.promise.catch((t) => {
    }), this._tick.reject(new Error(`Poll (${this.name}) is disposed.`)), this._disposed.emit(void 0), Signal.clearData(this));
  }
  /**
   * Refreshes the poll. Schedules `refreshed` tick if necessary.
   *
   * @returns A promise that resolves after tick is scheduled and never rejects.
   *
   * #### Notes
   * The returned promise resolves after the tick is scheduled, but before
   * the polling action is run. To wait until after the poll action executes,
   * await the `poll.tick` promise: `await poll.refresh(); await poll.tick;`
   */
  refresh() {
    return this.schedule({
      cancel: ({ phase: t }) => t === "refreshed",
      interval: Poll.IMMEDIATE,
      phase: "refreshed"
    });
  }
  /**
   * Schedule the next poll tick.
   *
   * @param next - The next poll state data to schedule. Defaults to standby.
   *
   * @param next.cancel - Cancels state transition if function returns `true`.
   *
   * @returns A promise that resolves when the next poll state is active.
   *
   * #### Notes
   * This method is not meant to be invoked by user code typically. It is public
   * to allow poll instances to be composed into classes that schedule ticks.
   */
  async schedule(t = {}) {
    if (this.isDisposed || t.cancel && t.cancel(this.state))
      return;
    const n = this._tick, r = new PromiseDelegate(), s = {
      interval: this.frequency.interval,
      payload: null,
      phase: "standby",
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      ...t
    };
    if (this._state = s, this._tick = r, clearTimeout(this._timeout), this._ticked.emit(this.state), n.resolve(this), await n.promise, s.interval === Poll.NEVER) {
      this._timeout = void 0;
      return;
    }
    const o = () => {
      this.isDisposed || this.tick !== r.promise || this._execute();
    };
    this._timeout = setTimeout(o, s.interval);
  }
  /**
   * Starts the poll. Schedules `started` tick if necessary.
   *
   * @returns A promise that resolves after tick is scheduled and never rejects.
   */
  start() {
    return this.schedule({
      cancel: ({ phase: t }) => t !== "constructed" && t !== "standby" && t !== "stopped",
      interval: Poll.IMMEDIATE,
      phase: "started"
    });
  }
  /**
   * Stops the poll. Schedules `stopped` tick if necessary.
   *
   * @returns A promise that resolves after tick is scheduled and never rejects.
   */
  stop() {
    return this.schedule({
      cancel: ({ phase: t }) => t === "stopped",
      interval: Poll.NEVER,
      phase: "stopped"
    });
  }
  /**
   * Whether the poll is hidden.
   *
   * #### Notes
   * This property is only relevant in a browser context.
   */
  get hidden() {
    return Private$7.hidden;
  }
  /**
   * Execute a new poll factory promise or stand by if necessary.
   */
  _execute() {
    let t = typeof this.standby == "function" ? this.standby() : this.standby;
    if (t === "never" ? t = !1 : t === "when-hidden" && (this.hidden ? t = ++this._lingered > this._linger : (this._lingered = 0, t = !1)), t) {
      this.schedule();
      return;
    }
    const n = this.tick;
    this._factory(this.state).then((r) => {
      this.isDisposed || this.tick !== n || this.schedule({
        payload: r,
        phase: this.state.phase === "rejected" ? "reconnected" : "resolved"
      });
    }).catch((r) => {
      this.isDisposed || this.tick !== n || this.schedule({
        interval: Private$7.sleep(this.frequency, this.state),
        payload: r,
        phase: "rejected"
      });
    });
  }
}
(function(e) {
  e.IMMEDIATE = 0, e.MAX_INTERVAL = 2147483647, e.NEVER = 1 / 0;
})(Poll || (Poll = {}));
var Private$7;
(function(e) {
  e.DEFAULT_BACKOFF = 3, e.DEFAULT_FREQUENCY = {
    backoff: !0,
    interval: 1e3,
    max: 30 * 1e3
  }, e.DEFAULT_LINGER = 1, e.DEFAULT_NAME = "unknown", e.DEFAULT_STANDBY = "when-hidden", e.DEFAULT_STATE = {
    interval: Poll.NEVER,
    payload: null,
    phase: "constructed",
    timestamp: (/* @__PURE__ */ new Date(0)).getTime()
  }, e.DISPOSED_STATE = {
    interval: Poll.NEVER,
    payload: null,
    phase: "disposed",
    timestamp: (/* @__PURE__ */ new Date(0)).getTime()
  };
  function t(r, s) {
    const { backoff: o, interval: a, max: l } = r;
    if (a === Poll.NEVER)
      return a;
    const f = o === !0 ? e.DEFAULT_BACKOFF : o === !1 ? 1 : o, p = n(a, s.interval * f);
    return Math.min(l, p);
  }
  e.sleep = t, e.hidden = (() => typeof document > "u" ? !1 : (document.addEventListener("visibilitychange", () => {
    e.hidden = document.visibilityState === "hidden";
  }), document.addEventListener("pagehide", () => {
    e.hidden = document.visibilityState === "hidden";
  }), document.visibilityState === "hidden"))();
  function n(r, s) {
    return r = Math.ceil(r), s = Math.floor(s), Math.floor(Math.random() * (s - r + 1)) + r;
  }
})(Private$7 || (Private$7 = {}));
class RateLimiter {
  /**
   * Instantiate a rate limiter.
   *
   * @param fn - The function to rate limit.
   *
   * @param limit - The rate limit; defaults to 500ms.
   */
  constructor(t, n = 500) {
    this.args = void 0, this.payload = null, this.limit = n, this.poll = new Poll({
      auto: !1,
      factory: async () => {
        const { args: r } = this;
        return this.args = void 0, t(...r);
      },
      frequency: { backoff: !1, interval: Poll.NEVER, max: Poll.NEVER },
      standby: "never"
    }), this.payload = new PromiseDelegate(), this.poll.ticked.connect((r, s) => {
      const { payload: o } = this;
      if (s.phase === "resolved") {
        this.payload = new PromiseDelegate(), o.resolve(s.payload);
        return;
      }
      if (s.phase === "rejected" || s.phase === "stopped") {
        this.payload = new PromiseDelegate(), o.promise.catch((a) => {
        }), o.reject(s.payload);
        return;
      }
    }, this);
  }
  /**
   * Whether the rate limiter is disposed.
   */
  get isDisposed() {
    return this.payload === null;
  }
  /**
   * Disposes the rate limiter.
   */
  dispose() {
    this.isDisposed || (this.args = void 0, this.payload = null, this.poll.dispose());
  }
  /**
   * Stop the function if it is mid-flight.
   */
  async stop() {
    return this.poll.stop();
  }
}
class Debouncer extends RateLimiter {
  /**
   * Invokes the function and only executes after rate limit has elapsed.
   * Each invocation resets the timer.
   */
  invoke(...t) {
    return this.args = t, this.poll.schedule({ interval: this.limit, phase: "invoked" }), this.payload.promise;
  }
}
class Throttler extends RateLimiter {
  /**
   * Instantiate a throttler.
   *
   * @param fn - The function being throttled.
   *
   * @param options - Throttling configuration or throttling limit in ms.
   *
   * #### Notes
   * The `edge` defaults to `leading`; the `limit` defaults to `500`.
   */
  constructor(t, n) {
    super(t, typeof n == "number" ? n : n && n.limit), this._trailing = !1, typeof n != "number" && n && n.edge === "trailing" && (this._trailing = !0), this._interval = this._trailing ? this.limit : Poll.IMMEDIATE;
  }
  /**
   * Throttles function invocations if one is currently in flight.
   */
  invoke(...t) {
    const n = this.poll.state.phase !== "invoked";
    return (n || this._trailing) && (this.args = t), n && this.poll.schedule({ interval: this._interval, phase: "invoked" }), this.payload.promise;
  }
}
const index_es6$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Debouncer,
  get Poll() {
    return Poll;
  },
  RateLimiter,
  Throttler
}, Symbol.toStringTag, { value: "Module" })), require$$2 = /* @__PURE__ */ getAugmentedNamespace(index_es6$2);
Object.defineProperty(event, "__esModule", { value: !0 });
event.EventManager = void 0;
const coreutils_1$a = lib$1, polling_1$2 = require$$2, signaling_1$3 = require$$0, serverconnection_1$6 = serverconnection, SERVICE_EVENTS_URL = "api/events";
class EventManager {
  /**
   * Create a new event manager.
   */
  constructor(t = {}) {
    var n;
    this._socket = null, this.serverSettings = (n = t.serverSettings) !== null && n !== void 0 ? n : serverconnection_1$6.ServerConnection.makeSettings(), this._poll = new polling_1$2.Poll({ factory: () => this._subscribe() }), this._stream = new signaling_1$3.Stream(this), this._poll.start();
  }
  /**
   * Whether the event manager is disposed.
   */
  get isDisposed() {
    return this._poll.isDisposed;
  }
  /**
   * An event stream that emits and yields each new event.
   */
  get stream() {
    return this._stream;
  }
  /**
   * Dispose the event manager.
   */
  dispose() {
    if (this.isDisposed)
      return;
    this._poll.dispose();
    const t = this._socket;
    t && (this._socket = null, t.onopen = () => {
    }, t.onerror = () => {
    }, t.onmessage = () => {
    }, t.onclose = () => {
    }, t.close()), signaling_1$3.Signal.clearData(this), this._stream.stop();
  }
  /**
   * Post an event request to be emitted by the event bus.
   */
  async emit(t) {
    const { serverSettings: n } = this, { baseUrl: r, token: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1$6.ServerConnection, l = coreutils_1$a.URLExt.join(r, SERVICE_EVENTS_URL) + (s ? `?token=${s}` : ""), f = { body: JSON.stringify(t), method: "POST" }, p = await o(l, f, n);
    if (p.status !== 204)
      throw new a(p);
  }
  /**
   * Subscribe to event bus emissions.
   */
  _subscribe() {
    return new Promise((t, n) => {
      if (this.isDisposed)
        return;
      const { token: r, WebSocket: s, wsUrl: o } = this.serverSettings, a = coreutils_1$a.URLExt.join(o, SERVICE_EVENTS_URL, "subscribe") + (r ? `?token=${encodeURIComponent(r)}` : ""), l = this._socket = new s(a), f = this._stream;
      l.onclose = () => n(new Error("EventManager socket closed")), l.onmessage = (p) => p.data && f.emit(JSON.parse(p.data));
    });
  }
}
event.EventManager = EventManager;
var kernel$1 = {}, kernel = {};
Object.defineProperty(kernel, "__esModule", { value: !0 });
var messages = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.supportedKernelWebSocketProtocols = e.isInputReplyMsg = e.isInputRequestMsg = e.isDebugReplyMsg = e.isDebugRequestMsg = e.isExecuteReplyMsg = e.isInfoRequestMsg = e.isCommMsgMsg = e.isCommCloseMsg = e.isCommOpenMsg = e.isDebugEventMsg = e.isClearOutputMsg = e.isStatusMsg = e.isErrorMsg = e.isExecuteResultMsg = e.isExecuteInputMsg = e.isUpdateDisplayDataMsg = e.isDisplayDataMsg = e.isStreamMsg = e.createMessage = void 0;
  const t = distExports;
  function n(nt) {
    var nn, lt, pt, at, it;
    return {
      buffers: (nn = nt.buffers) !== null && nn !== void 0 ? nn : [],
      channel: nt.channel,
      content: nt.content,
      header: {
        date: (/* @__PURE__ */ new Date()).toISOString(),
        msg_id: (lt = nt.msgId) !== null && lt !== void 0 ? lt : t.UUID.uuid4(),
        msg_type: nt.msgType,
        session: nt.session,
        username: (pt = nt.username) !== null && pt !== void 0 ? pt : "",
        version: "5.2"
      },
      metadata: (at = nt.metadata) !== null && at !== void 0 ? at : {},
      parent_header: (it = nt.parentHeader) !== null && it !== void 0 ? it : {}
    };
  }
  e.createMessage = n;
  function r(nt) {
    return nt.header.msg_type === "stream";
  }
  e.isStreamMsg = r;
  function s(nt) {
    return nt.header.msg_type === "display_data";
  }
  e.isDisplayDataMsg = s;
  function o(nt) {
    return nt.header.msg_type === "update_display_data";
  }
  e.isUpdateDisplayDataMsg = o;
  function a(nt) {
    return nt.header.msg_type === "execute_input";
  }
  e.isExecuteInputMsg = a;
  function l(nt) {
    return nt.header.msg_type === "execute_result";
  }
  e.isExecuteResultMsg = l;
  function f(nt) {
    return nt.header.msg_type === "error";
  }
  e.isErrorMsg = f;
  function p(nt) {
    return nt.header.msg_type === "status";
  }
  e.isStatusMsg = p;
  function d(nt) {
    return nt.header.msg_type === "clear_output";
  }
  e.isClearOutputMsg = d;
  function _(nt) {
    return nt.header.msg_type === "debug_event";
  }
  e.isDebugEventMsg = _;
  function S(nt) {
    return nt.header.msg_type === "comm_open";
  }
  e.isCommOpenMsg = S;
  function k(nt) {
    return nt.header.msg_type === "comm_close";
  }
  e.isCommCloseMsg = k;
  function O(nt) {
    return nt.header.msg_type === "comm_msg";
  }
  e.isCommMsgMsg = O;
  function rt(nt) {
    return nt.header.msg_type === "kernel_info_request";
  }
  e.isInfoRequestMsg = rt;
  function st(nt) {
    return nt.header.msg_type === "execute_reply";
  }
  e.isExecuteReplyMsg = st;
  function ft(nt) {
    return nt.header.msg_type === "debug_request";
  }
  e.isDebugRequestMsg = ft;
  function ut(nt) {
    return nt.header.msg_type === "debug_reply";
  }
  e.isDebugReplyMsg = ut;
  function dt(nt) {
    return nt.header.msg_type === "input_request";
  }
  e.isInputRequestMsg = dt;
  function T(nt) {
    return nt.header.msg_type === "input_reply";
  }
  e.isInputReplyMsg = T, function(nt) {
    nt.v1KernelWebsocketJupyterOrg = "v1.kernel.websocket.jupyter.org";
  }(e.supportedKernelWebSocketProtocols || (e.supportedKernelWebSocketProtocols = {}));
})(messages);
var restapi$4 = {}, validate$2 = {};
Object.defineProperty(validate$2, "__esModule", { value: !0 });
validate$2.validateModels = validate$2.validateModel = validate$2.validateMessage = void 0;
const validate_1$3 = validate$3, HEADER_FIELDS = ["username", "version", "session", "msg_id", "msg_type"], IOPUB_CONTENT_FIELDS = {
  stream: { name: "string", text: "string" },
  display_data: { data: "object", metadata: "object" },
  execute_input: { code: "string", execution_count: "number" },
  execute_result: {
    execution_count: "number",
    data: "object",
    metadata: "object"
  },
  error: { ename: "string", evalue: "string", traceback: "object" },
  status: {
    execution_state: [
      "string",
      ["starting", "idle", "busy", "restarting", "dead"]
    ]
  },
  clear_output: { wait: "boolean" },
  comm_open: { comm_id: "string", target_name: "string", data: "object" },
  comm_msg: { comm_id: "string", data: "object" },
  comm_close: { comm_id: "string" },
  shutdown_reply: { restart: "boolean" }
  // Emitted by the IPython kernel.
};
function validateHeader(e) {
  for (let t = 0; t < HEADER_FIELDS.length; t++)
    (0, validate_1$3.validateProperty)(e, HEADER_FIELDS[t], "string");
}
function validateMessage(e) {
  (0, validate_1$3.validateProperty)(e, "metadata", "object"), (0, validate_1$3.validateProperty)(e, "content", "object"), (0, validate_1$3.validateProperty)(e, "channel", "string"), validateHeader(e.header), e.channel === "iopub" && validateIOPubContent(e);
}
validate$2.validateMessage = validateMessage;
function validateIOPubContent(e) {
  if (e.channel === "iopub") {
    const t = IOPUB_CONTENT_FIELDS[e.header.msg_type];
    if (t === void 0)
      return;
    const n = Object.keys(t), r = e.content;
    for (let s = 0; s < n.length; s++) {
      let o = t[n[s]];
      Array.isArray(o) || (o = [o]), (0, validate_1$3.validateProperty)(r, n[s], ...o);
    }
  }
}
function validateModel$1(e) {
  (0, validate_1$3.validateProperty)(e, "name", "string"), (0, validate_1$3.validateProperty)(e, "id", "string");
}
validate$2.validateModel = validateModel$1;
function validateModels$1(e) {
  if (!Array.isArray(e))
    throw new Error("Invalid kernel list");
  e.forEach((t) => validateModel$1(t));
}
validate$2.validateModels = validateModels$1;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getKernelModel = e.shutdownKernel = e.interruptKernel = e.restartKernel = e.startNew = e.listRunning = e.KERNEL_SERVICE_URL = void 0;
  const t = serverconnection, n = lib$1, r = validate$2;
  e.KERNEL_SERVICE_URL = "api/kernels";
  async function s(d = t.ServerConnection.makeSettings()) {
    const _ = n.URLExt.join(d.baseUrl, e.KERNEL_SERVICE_URL), S = await t.ServerConnection.makeRequest(_, {}, d);
    if (S.status !== 200)
      throw await t.ServerConnection.ResponseError.create(S);
    const k = await S.json();
    return (0, r.validateModels)(k), k;
  }
  e.listRunning = s;
  async function o(d = {}, _ = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL), k = {
      method: "POST",
      body: JSON.stringify(d)
    }, O = await t.ServerConnection.makeRequest(S, k, _);
    if (O.status !== 201)
      throw await t.ServerConnection.ResponseError.create(O);
    const rt = await O.json();
    return (0, r.validateModel)(rt), rt;
  }
  e.startNew = o;
  async function a(d, _ = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(d), "restart"), k = { method: "POST" }, O = await t.ServerConnection.makeRequest(S, k, _);
    if (O.status !== 200)
      throw await t.ServerConnection.ResponseError.create(O);
    const rt = await O.json();
    (0, r.validateModel)(rt);
  }
  e.restartKernel = a;
  async function l(d, _ = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(d), "interrupt"), k = { method: "POST" }, O = await t.ServerConnection.makeRequest(S, k, _);
    if (O.status !== 204)
      throw await t.ServerConnection.ResponseError.create(O);
  }
  e.interruptKernel = l;
  async function f(d, _ = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(d)), k = { method: "DELETE" }, O = await t.ServerConnection.makeRequest(S, k, _);
    if (O.status === 404) {
      const rt = `The kernel "${d}" does not exist on the server`;
      console.warn(rt);
    } else if (O.status !== 204)
      throw await t.ServerConnection.ResponseError.create(O);
  }
  e.shutdownKernel = f;
  async function p(d, _ = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(d)), k = await t.ServerConnection.makeRequest(S, {}, _);
    if (k.status === 404)
      return;
    if (k.status !== 200)
      throw await t.ServerConnection.ResponseError.create(k);
    const O = await k.json();
    return (0, r.validateModel)(O), O;
  }
  e.getKernelModel = p;
})(restapi$4);
var _default$2 = {}, comm = {};
class DisposableDelegate {
  /**
   * Construct a new disposable delegate.
   *
   * @param fn - The callback function to invoke on dispose.
   */
  constructor(t) {
    this._fn = t;
  }
  /**
   * Test whether the delegate has been disposed.
   */
  get isDisposed() {
    return !this._fn;
  }
  /**
   * Dispose of the delegate and invoke the callback function.
   */
  dispose() {
    if (!this._fn)
      return;
    let t = this._fn;
    this._fn = null, t();
  }
}
class ObservableDisposableDelegate extends DisposableDelegate {
  constructor() {
    super(...arguments), this._disposed = new Signal(this);
  }
  /**
   * A signal emitted when the delegate is disposed.
   */
  get disposed() {
    return this._disposed;
  }
  /**
   * Dispose of the delegate and invoke the callback function.
   */
  dispose() {
    this.isDisposed || (super.dispose(), this._disposed.emit(void 0), Signal.clearData(this));
  }
}
class DisposableSet {
  constructor() {
    this._isDisposed = !1, this._items = /* @__PURE__ */ new Set();
  }
  /**
   * Test whether the set has been disposed.
   */
  get isDisposed() {
    return this._isDisposed;
  }
  /**
   * Dispose of the set and the items it contains.
   *
   * #### Notes
   * Items are disposed in the order they are added to the set.
   */
  dispose() {
    this._isDisposed || (this._isDisposed = !0, this._items.forEach((t) => {
      t.dispose();
    }), this._items.clear());
  }
  /**
   * Test whether the set contains a specific item.
   *
   * @param item - The item of interest.
   *
   * @returns `true` if the set contains the item, `false` otherwise.
   */
  contains(t) {
    return this._items.has(t);
  }
  /**
   * Add a disposable item to the set.
   *
   * @param item - The item to add to the set.
   *
   * #### Notes
   * If the item is already contained in the set, this is a no-op.
   */
  add(t) {
    this._items.add(t);
  }
  /**
   * Remove a disposable item from the set.
   *
   * @param item - The item to remove from the set.
   *
   * #### Notes
   * If the item is not contained in the set, this is a no-op.
   */
  remove(t) {
    this._items.delete(t);
  }
  /**
   * Remove all items from the set.
   */
  clear() {
    this._items.clear();
  }
}
(function(e) {
  function t(n) {
    let r = new e();
    for (const s of n)
      r.add(s);
    return r;
  }
  e.from = t;
})(DisposableSet || (DisposableSet = {}));
class ObservableDisposableSet extends DisposableSet {
  constructor() {
    super(...arguments), this._disposed = new Signal(this);
  }
  /**
   * A signal emitted when the set is disposed.
   */
  get disposed() {
    return this._disposed;
  }
  /**
   * Dispose of the set and the items it contains.
   *
   * #### Notes
   * Items are disposed in the order they are added to the set.
   */
  dispose() {
    this.isDisposed || (super.dispose(), this._disposed.emit(void 0), Signal.clearData(this));
  }
}
(function(e) {
  function t(n) {
    let r = new e();
    for (const s of n)
      r.add(s);
    return r;
  }
  e.from = t;
})(ObservableDisposableSet || (ObservableDisposableSet = {}));
const index_es6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DisposableDelegate,
  get DisposableSet() {
    return DisposableSet;
  },
  ObservableDisposableDelegate,
  get ObservableDisposableSet() {
    return ObservableDisposableSet;
  }
}, Symbol.toStringTag, { value: "Module" })), require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(index_es6$1);
var __createBinding$3 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(e, t, n, r) {
  r === void 0 && (r = n);
  var s = Object.getOwnPropertyDescriptor(t, n);
  (!s || ("get" in s ? !t.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, r, s);
} : function(e, t, n, r) {
  r === void 0 && (r = n), e[r] = t[n];
}), __setModuleDefault$3 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), __importStar$3 = commonjsGlobal && commonjsGlobal.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var n in e)
      n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && __createBinding$3(t, e, n);
  return __setModuleDefault$3(t, e), t;
};
Object.defineProperty(comm, "__esModule", { value: !0 });
comm.CommHandler = void 0;
const disposable_1$1 = require$$1$1, KernelMessage$2 = __importStar$3(messages);
class CommHandler extends disposable_1$1.DisposableDelegate {
  /**
   * Construct a new comm channel.
   */
  constructor(t, n, r, s) {
    super(s), this._target = "", this._id = "", this._id = n, this._target = t, this._kernel = r;
  }
  /**
   * The unique id for the comm channel.
   */
  get commId() {
    return this._id;
  }
  /**
   * The target name for the comm channel.
   */
  get targetName() {
    return this._target;
  }
  /**
   * Get the callback for a comm close event.
   *
   * #### Notes
   * This is called when the comm is closed from either the server or client.
   *
   * **See also:** [[ICommClose]], [[close]]
   */
  get onClose() {
    return this._onClose;
  }
  /**
   * Set the callback for a comm close event.
   *
   * #### Notes
   * This is called when the comm is closed from either the server or client. If
   * the function returns a promise, and the kernel was closed from the server,
   * kernel message processing will pause until the returned promise is
   * fulfilled.
   *
   * **See also:** [[close]]
   */
  set onClose(t) {
    this._onClose = t;
  }
  /**
   * Get the callback for a comm message received event.
   */
  get onMsg() {
    return this._onMsg;
  }
  /**
   * Set the callback for a comm message received event.
   *
   * #### Notes
   * This is called when a comm message is received. If the function returns a
   * promise, kernel message processing will pause until it is fulfilled.
   */
  set onMsg(t) {
    this._onMsg = t;
  }
  /**
   * Open a comm with optional data and metadata.
   *
   * #### Notes
   * This sends a `comm_open` message to the server.
   *
   * **See also:** [[ICommOpen]]
   */
  open(t, n, r = []) {
    if (this.isDisposed || this._kernel.isDisposed)
      throw new Error("Cannot open");
    const s = KernelMessage$2.createMessage({
      msgType: "comm_open",
      channel: "shell",
      username: this._kernel.username,
      session: this._kernel.clientId,
      content: {
        comm_id: this._id,
        target_name: this._target,
        data: t ?? {}
      },
      metadata: n,
      buffers: r
    });
    return this._kernel.sendShellMessage(s, !1, !0);
  }
  /**
   * Send a `comm_msg` message to the kernel.
   *
   * #### Notes
   * This is a no-op if the comm has been closed.
   *
   * **See also:** [[ICommMsg]]
   */
  send(t, n, r = [], s = !0) {
    if (this.isDisposed || this._kernel.isDisposed)
      throw new Error("Cannot send");
    const o = KernelMessage$2.createMessage({
      msgType: "comm_msg",
      channel: "shell",
      username: this._kernel.username,
      session: this._kernel.clientId,
      content: {
        comm_id: this._id,
        data: t
      },
      metadata: n,
      buffers: r
    });
    return this._kernel.sendShellMessage(o, !1, s);
  }
  /**
   * Close the comm.
   *
   * #### Notes
   * This will send a `comm_close` message to the kernel, and call the
   * `onClose` callback if set.
   *
   * This is a no-op if the comm is already closed.
   *
   * **See also:** [[ICommClose]], [[onClose]]
   */
  close(t, n, r = []) {
    if (this.isDisposed || this._kernel.isDisposed)
      throw new Error("Cannot close");
    const s = KernelMessage$2.createMessage({
      msgType: "comm_close",
      channel: "shell",
      username: this._kernel.username,
      session: this._kernel.clientId,
      content: {
        comm_id: this._id,
        data: t ?? {}
      },
      metadata: n,
      buffers: r
    }), o = this._kernel.sendShellMessage(s, !1, !0), a = this._onClose;
    if (a) {
      const l = KernelMessage$2.createMessage({
        msgType: "comm_close",
        channel: "iopub",
        username: this._kernel.username,
        session: this._kernel.clientId,
        content: {
          comm_id: this._id,
          data: t ?? {}
        },
        metadata: n,
        buffers: r
      });
      a(l);
    }
    return this.dispose(), o;
  }
}
comm.CommHandler = CommHandler;
var future = {}, __createBinding$2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(e, t, n, r) {
  r === void 0 && (r = n);
  var s = Object.getOwnPropertyDescriptor(t, n);
  (!s || ("get" in s ? !t.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, r, s);
} : function(e, t, n, r) {
  r === void 0 && (r = n), e[r] = t[n];
}), __setModuleDefault$2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), __importStar$2 = commonjsGlobal && commonjsGlobal.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var n in e)
      n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && __createBinding$2(t, e, n);
  return __setModuleDefault$2(t, e), t;
};
Object.defineProperty(future, "__esModule", { value: !0 });
future.KernelShellFutureHandler = future.KernelControlFutureHandler = future.KernelFutureHandler = void 0;
const coreutils_1$9 = distExports, disposable_1 = require$$1$1, KernelMessage$1 = __importStar$2(messages);
class KernelFutureHandler extends disposable_1.DisposableDelegate {
  /**
   * Construct a new KernelFutureHandler.
   */
  constructor(t, n, r, s, o) {
    super(t), this._status = 0, this._stdin = Private$6.noOp, this._iopub = Private$6.noOp, this._reply = Private$6.noOp, this._done = new coreutils_1$9.PromiseDelegate(), this._hooks = new Private$6.HookList(), this._disposeOnDone = !0, this._msg = n, r || this._setFlag(Private$6.KernelFutureFlag.GotReply), this._disposeOnDone = s, this._kernel = o;
  }
  /**
   * Get the original outgoing message.
   */
  get msg() {
    return this._msg;
  }
  /**
   * A promise that resolves when the future is done.
   */
  get done() {
    return this._done.promise;
  }
  /**
   * Get the reply handler.
   */
  get onReply() {
    return this._reply;
  }
  /**
   * Set the reply handler.
   */
  set onReply(t) {
    this._reply = t;
  }
  /**
   * Get the iopub handler.
   */
  get onIOPub() {
    return this._iopub;
  }
  /**
   * Set the iopub handler.
   */
  set onIOPub(t) {
    this._iopub = t;
  }
  /**
   * Get the stdin handler.
   */
  get onStdin() {
    return this._stdin;
  }
  /**
   * Set the stdin handler.
   */
  set onStdin(t) {
    this._stdin = t;
  }
  /**
   * Register hook for IOPub messages.
   *
   * @param hook - The callback invoked for an IOPub message.
   *
   * #### Notes
   * The IOPub hook system allows you to preempt the handlers for IOPub
   * messages handled by the future.
   *
   * The most recently registered hook is run first. A hook can return a
   * boolean or a promise to a boolean, in which case all kernel message
   * processing pauses until the promise is fulfilled. If a hook return value
   * resolves to false, any later hooks will not run and the function will
   * return a promise resolving to false. If a hook throws an error, the error
   * is logged to the console and the next hook is run. If a hook is
   * registered during the hook processing, it will not run until the next
   * message. If a hook is removed during the hook processing, it will be
   * deactivated immediately.
   */
  registerMessageHook(t) {
    if (this.isDisposed)
      throw new Error("Kernel future is disposed");
    this._hooks.add(t);
  }
  /**
   * Remove a hook for IOPub messages.
   *
   * @param hook - The hook to remove.
   *
   * #### Notes
   * If a hook is removed during the hook processing, it will be deactivated immediately.
   */
  removeMessageHook(t) {
    this.isDisposed || this._hooks.remove(t);
  }
  /**
   * Send an `input_reply` message.
   */
  sendInputReply(t, n) {
    this._kernel.sendInputReply(t, n);
  }
  /**
   * Dispose and unregister the future.
   */
  dispose() {
    this._stdin = Private$6.noOp, this._iopub = Private$6.noOp, this._reply = Private$6.noOp, this._hooks = null, this._testFlag(Private$6.KernelFutureFlag.IsDone) || (this._done.promise.catch(() => {
    }), this._done.reject(new Error(`Canceled future for ${this.msg.header.msg_type} message before replies were done`))), super.dispose();
  }
  /**
   * Handle an incoming kernel message.
   */
  async handleMsg(t) {
    switch (t.channel) {
      case "control":
      case "shell":
        t.channel === this.msg.channel && t.parent_header.msg_id === this.msg.header.msg_id && await this._handleReply(t);
        break;
      case "stdin":
        await this._handleStdin(t);
        break;
      case "iopub":
        await this._handleIOPub(t);
        break;
    }
  }
  async _handleReply(t) {
    const n = this._reply;
    n && await n(t), this._replyMsg = t, this._setFlag(Private$6.KernelFutureFlag.GotReply), this._testFlag(Private$6.KernelFutureFlag.GotIdle) && this._handleDone();
  }
  async _handleStdin(t) {
    this._kernel.hasPendingInput = !0;
    const n = this._stdin;
    n && await n(t);
  }
  async _handleIOPub(t) {
    const n = await this._hooks.process(t), r = this._iopub;
    n && r && await r(t), KernelMessage$1.isStatusMsg(t) && t.content.execution_state === "idle" && (this._setFlag(Private$6.KernelFutureFlag.GotIdle), this._testFlag(Private$6.KernelFutureFlag.GotReply) && this._handleDone());
  }
  _handleDone() {
    this._testFlag(Private$6.KernelFutureFlag.IsDone) || (this._setFlag(Private$6.KernelFutureFlag.IsDone), this._done.resolve(this._replyMsg), this._disposeOnDone && this.dispose());
  }
  /**
   * Test whether the given future flag is set.
   */
  _testFlag(t) {
    return (this._status & t) !== 0;
  }
  /**
   * Set the given future flag.
   */
  _setFlag(t) {
    this._status |= t;
  }
}
future.KernelFutureHandler = KernelFutureHandler;
class KernelControlFutureHandler extends KernelFutureHandler {
}
future.KernelControlFutureHandler = KernelControlFutureHandler;
class KernelShellFutureHandler extends KernelFutureHandler {
}
future.KernelShellFutureHandler = KernelShellFutureHandler;
var Private$6;
(function(e) {
  e.noOp = () => {
  };
  const t = (() => typeof requestAnimationFrame == "function" ? requestAnimationFrame : setImmediate)();
  class n {
    constructor() {
      this._hooks = [];
    }
    /**
     * Register a hook.
     *
     * @param hook - The callback to register.
     */
    add(s) {
      this.remove(s), this._hooks.push(s);
    }
    /**
     * Remove a hook, if it exists in the hook list.
     *
     * @param hook - The callback to remove.
     */
    remove(s) {
      const o = this._hooks.indexOf(s);
      o >= 0 && (this._hooks[o] = null, this._scheduleCompact());
    }
    /**
     * Process a message through the hooks.
     *
     * @returns a promise resolving to false if any hook resolved as false,
     * otherwise true
     *
     * #### Notes
     * The most recently registered hook is run first. A hook can return a
     * boolean or a promise to a boolean, in which case processing pauses until
     * the promise is fulfilled. If a hook return value resolves to false, any
     * later hooks will not run and the function will return a promise resolving
     * to false. If a hook throws an error, the error is logged to the console
     * and the next hook is run. If a hook is registered during the hook
     * processing, it will not run until the next message. If a hook is removed
     * during the hook processing, it will be deactivated immediately.
     */
    async process(s) {
      await this._processing;
      const o = new coreutils_1$9.PromiseDelegate();
      this._processing = o.promise;
      let a;
      for (let l = this._hooks.length - 1; l >= 0; l--) {
        const f = this._hooks[l];
        if (f !== null) {
          try {
            a = await f(s);
          } catch (p) {
            a = !0, console.error(p);
          }
          if (a === !1)
            return o.resolve(void 0), !1;
        }
      }
      return o.resolve(void 0), !0;
    }
    /**
     * Schedule a cleanup of the list, removing any hooks that have been nulled out.
     */
    _scheduleCompact() {
      this._compactScheduled || (this._compactScheduled = !0, t(() => {
        this._processing = this._processing.then(() => {
          this._compactScheduled = !1, this._compact();
        });
      }));
    }
    /**
     * Compact the list, removing any nulls.
     */
    _compact() {
      let s = 0;
      for (let o = 0, a = this._hooks.length; o < a; o++) {
        const l = this._hooks[o];
        this._hooks[o] === null ? s++ : this._hooks[o - s] = l;
      }
      this._hooks.length -= s;
    }
  }
  e.HookList = n, function(r) {
    r[r.GotReply = 1] = "GotReply", r[r.GotIdle = 2] = "GotIdle", r[r.IsDone = 4] = "IsDone", r[r.DisposeOnDone = 8] = "DisposeOnDone";
  }(e.KernelFutureFlag || (e.KernelFutureFlag = {}));
})(Private$6 || (Private$6 = {}));
var serialize$1 = {}, __createBinding$1 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(e, t, n, r) {
  r === void 0 && (r = n);
  var s = Object.getOwnPropertyDescriptor(t, n);
  (!s || ("get" in s ? !t.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, r, s);
} : function(e, t, n, r) {
  r === void 0 && (r = n), e[r] = t[n];
}), __setModuleDefault$1 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), __importStar$1 = commonjsGlobal && commonjsGlobal.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var n in e)
      n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && __createBinding$1(t, e, n);
  return __setModuleDefault$1(t, e), t;
};
Object.defineProperty(serialize$1, "__esModule", { value: !0 });
serialize$1.deserialize = serialize$1.serialize = void 0;
const KernelMessage = __importStar$1(messages);
function serialize(e, t = "") {
  switch (t) {
    case KernelMessage.supportedKernelWebSocketProtocols.v1KernelWebsocketJupyterOrg:
      return Private$5.serializeV1KernelWebsocketJupyterOrg(e);
    default:
      return Private$5.serializeDefault(e);
  }
}
serialize$1.serialize = serialize;
function deserialize(e, t = "") {
  switch (t) {
    case KernelMessage.supportedKernelWebSocketProtocols.v1KernelWebsocketJupyterOrg:
      return Private$5.deserializeV1KernelWebsocketJupyterOrg(e);
    default:
      return Private$5.deserializeDefault(e);
  }
}
serialize$1.deserialize = deserialize;
var Private$5;
(function(e) {
  function t(l) {
    let f;
    const p = new DataView(l), d = Number(p.getBigUint64(
      0,
      !0
      /* littleEndian */
    ));
    let _ = [];
    for (let dt = 0; dt < d; dt++)
      _.push(Number(p.getBigUint64(
        8 * (dt + 1),
        !0
        /* littleEndian */
      )));
    const S = new TextDecoder("utf8"), k = S.decode(l.slice(_[0], _[1])), O = JSON.parse(S.decode(l.slice(_[1], _[2]))), rt = JSON.parse(S.decode(l.slice(_[2], _[3]))), st = JSON.parse(S.decode(l.slice(_[3], _[4]))), ft = JSON.parse(S.decode(l.slice(_[4], _[5])));
    let ut = [];
    for (let dt = 5; dt < _.length - 1; dt++)
      ut.push(new DataView(l.slice(_[dt], _[dt + 1])));
    return f = {
      channel: k,
      header: O,
      parent_header: rt,
      metadata: st,
      content: ft,
      buffers: ut
    }, f;
  }
  e.deserializeV1KernelWebsocketJupyterOrg = t;
  function n(l) {
    const f = JSON.stringify(l.header), p = l.parent_header == null ? "{}" : JSON.stringify(l.parent_header), d = JSON.stringify(l.metadata), _ = JSON.stringify(l.content), S = l.buffers !== void 0 ? l.buffers : [], k = 1 + 4 + S.length + 1;
    let O = [];
    O.push(8 * (1 + k)), O.push(l.channel.length + O[O.length - 1]);
    const rt = new TextEncoder(), st = rt.encode(l.channel), ft = rt.encode(f), ut = rt.encode(p), dt = rt.encode(d), T = rt.encode(_), nt = new Uint8Array(st.length + ft.length + ut.length + dt.length + T.length);
    nt.set(st), nt.set(ft, st.length), nt.set(ut, st.length + ft.length), nt.set(dt, st.length + ft.length + ut.length), nt.set(T, st.length + ft.length + ut.length + dt.length);
    for (let it of [
      ft.length,
      ut.length,
      dt.length,
      T.length
    ])
      O.push(it + O[O.length - 1]);
    let nn = 0;
    for (let it of S) {
      let ht = it.byteLength;
      O.push(ht + O[O.length - 1]), nn += ht;
    }
    const lt = new Uint8Array(8 * (1 + k) + nt.byteLength + nn), pt = new ArrayBuffer(8), at = new DataView(pt);
    at.setBigUint64(
      0,
      BigInt(k),
      !0
      /* littleEndian */
    ), lt.set(new Uint8Array(pt), 0);
    for (let it = 0; it < O.length; it++)
      at.setBigUint64(
        0,
        BigInt(O[it]),
        !0
        /* littleEndian */
      ), lt.set(new Uint8Array(pt), 8 * (it + 1));
    lt.set(nt, O[0]);
    for (let it = 0; it < S.length; it++) {
      const ht = S[it];
      lt.set(new Uint8Array(ArrayBuffer.isView(ht) ? ht.buffer : ht), O[5 + it]);
    }
    return lt.buffer;
  }
  e.serializeV1KernelWebsocketJupyterOrg = n;
  function r(l) {
    let f;
    return typeof l == "string" ? f = JSON.parse(l) : f = o(l), f;
  }
  e.deserializeDefault = r;
  function s(l) {
    var f;
    let p;
    return !((f = l.buffers) === null || f === void 0) && f.length ? p = a(l) : p = JSON.stringify(l), p;
  }
  e.serializeDefault = s;
  function o(l) {
    const f = new DataView(l), p = f.getUint32(0), d = [];
    if (p < 2)
      throw new Error("Invalid incoming Kernel Message");
    for (let k = 1; k <= p; k++)
      d.push(f.getUint32(k * 4));
    const _ = new Uint8Array(l.slice(d[0], d[1])), S = JSON.parse(new TextDecoder("utf8").decode(_));
    S.buffers = [];
    for (let k = 1; k < p; k++) {
      const O = d[k], rt = d[k + 1] || l.byteLength;
      S.buffers.push(new DataView(l.slice(O, rt)));
    }
    return S;
  }
  function a(l) {
    const f = [], p = [], d = new TextEncoder();
    let _ = [];
    l.buffers !== void 0 && (_ = l.buffers, delete l.buffers);
    const S = d.encode(JSON.stringify(l));
    p.push(S.buffer);
    for (let st = 0; st < _.length; st++) {
      const ft = _[st];
      p.push(ArrayBuffer.isView(ft) ? ft.buffer : ft);
    }
    const k = p.length;
    f.push(4 * (k + 1));
    for (let st = 0; st + 1 < p.length; st++)
      f.push(f[f.length - 1] + p[st].byteLength);
    const O = new Uint8Array(f[f.length - 1] + p[p.length - 1].byteLength), rt = new DataView(O.buffer);
    rt.setUint32(0, k);
    for (let st = 0; st < f.length; st++)
      rt.setUint32(4 * (st + 1), f[st]);
    for (let st = 0; st < p.length; st++)
      O.set(new Uint8Array(p[st]), f[st]);
    return O.buffer;
  }
})(Private$5 || (Private$5 = {}));
var kernelspec$1 = {}, kernelspec = {};
Object.defineProperty(kernelspec, "__esModule", { value: !0 });
var restapi$3 = {}, validate$1 = {};
Object.defineProperty(validate$1, "__esModule", { value: !0 });
validate$1.validateSpecModels = validate$1.validateSpecModel = void 0;
const validate_1$2 = validate$3;
function validateSpecModel(e) {
  const t = e.spec;
  if (!t)
    throw new Error("Invalid kernel spec");
  (0, validate_1$2.validateProperty)(e, "name", "string"), (0, validate_1$2.validateProperty)(e, "resources", "object"), (0, validate_1$2.validateProperty)(t, "language", "string"), (0, validate_1$2.validateProperty)(t, "display_name", "string"), (0, validate_1$2.validateProperty)(t, "argv", "array");
  let n = null;
  t.hasOwnProperty("metadata") && ((0, validate_1$2.validateProperty)(t, "metadata", "object"), n = t.metadata);
  let r = null;
  return t.hasOwnProperty("env") && ((0, validate_1$2.validateProperty)(t, "env", "object"), r = t.env), {
    name: e.name,
    resources: e.resources,
    language: t.language,
    display_name: t.display_name,
    argv: t.argv,
    metadata: n,
    env: r
  };
}
validate$1.validateSpecModel = validateSpecModel;
function validateSpecModels(e) {
  if (!e.hasOwnProperty("kernelspecs"))
    throw new Error("No kernelspecs found");
  let t = Object.keys(e.kernelspecs);
  const n = /* @__PURE__ */ Object.create(null);
  let r = e.default;
  for (let s = 0; s < t.length; s++) {
    const o = e.kernelspecs[t[s]];
    try {
      n[t[s]] = validateSpecModel(o);
    } catch {
      console.warn(`Removing errant kernel spec: ${t[s]}`);
    }
  }
  if (t = Object.keys(n), !t.length)
    throw new Error("No valid kernelspecs found");
  return (!r || typeof r != "string" || !(r in n)) && (r = t[0], console.warn(`Default kernel not found, using '${t[0]}'`)), {
    default: r,
    kernelspecs: n
  };
}
validate$1.validateSpecModels = validateSpecModels;
Object.defineProperty(restapi$3, "__esModule", { value: !0 });
restapi$3.getSpecs = void 0;
const serverconnection_1$5 = serverconnection, validate_1$1 = validate$1, coreutils_1$8 = lib$1, KERNELSPEC_SERVICE_URL = "api/kernelspecs";
async function getSpecs(e = serverconnection_1$5.ServerConnection.makeSettings()) {
  const t = coreutils_1$8.URLExt.join(e.baseUrl, KERNELSPEC_SERVICE_URL), n = await serverconnection_1$5.ServerConnection.makeRequest(t, {}, e);
  if (n.status !== 200)
    throw await serverconnection_1$5.ServerConnection.ResponseError.create(n);
  const r = await n.json();
  return (0, validate_1$1.validateSpecModels)(r);
}
restapi$3.getSpecs = getSpecs;
var manager$4 = {}, __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(e, t, n, r) {
  r === void 0 && (r = n);
  var s = Object.getOwnPropertyDescriptor(t, n);
  (!s || ("get" in s ? !t.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return t[n];
  } }), Object.defineProperty(e, r, s);
} : function(e, t, n, r) {
  r === void 0 && (r = n), e[r] = t[n];
}), __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}), __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var n in e)
      n !== "default" && Object.prototype.hasOwnProperty.call(e, n) && __createBinding(t, e, n);
  return __setModuleDefault(t, e), t;
};
Object.defineProperty(manager$4, "__esModule", { value: !0 });
manager$4.KernelSpecManager = void 0;
const coreutils_1$7 = distExports, polling_1$1 = require$$2, signaling_1$2 = require$$0, restapi$2 = __importStar(restapi$3), basemanager_1$1 = basemanager;
class KernelSpecManager extends basemanager_1$1.BaseManager {
  /**
   * Construct a new kernel spec manager.
   *
   * @param options - The default options for kernel.
   */
  constructor(t = {}) {
    var n;
    super(t), this._isReady = !1, this._connectionFailure = new signaling_1$2.Signal(this), this._specs = null, this._specsChanged = new signaling_1$2.Signal(this), this._ready = Promise.all([this.requestSpecs()]).then((r) => {
    }).catch((r) => {
    }).then(() => {
      this.isDisposed || (this._isReady = !0);
    }), this._pollSpecs = new polling_1$1.Poll({
      auto: !1,
      factory: () => this.requestSpecs(),
      frequency: {
        interval: 61 * 1e3,
        backoff: !0,
        max: 300 * 1e3
      },
      name: "@jupyterlab/services:KernelSpecManager#specs",
      standby: (n = t.standby) !== null && n !== void 0 ? n : "when-hidden"
    }), this.ready.then(() => {
      this._pollSpecs.start();
    });
  }
  /**
   * Test whether the manager is ready.
   */
  get isReady() {
    return this._isReady;
  }
  /**
   * A promise that fulfills when the manager is ready.
   */
  get ready() {
    return this._ready;
  }
  /**
   * Get the most recently fetched kernel specs.
   */
  get specs() {
    return this._specs;
  }
  /**
   * A signal emitted when the specs change.
   */
  get specsChanged() {
    return this._specsChanged;
  }
  /**
   * A signal emitted when there is a connection failure.
   */
  get connectionFailure() {
    return this._connectionFailure;
  }
  /**
   * Dispose of the resources used by the manager.
   */
  dispose() {
    this._pollSpecs.dispose(), super.dispose();
  }
  /**
   * Force a refresh of the specs from the server.
   *
   * @returns A promise that resolves when the specs are fetched.
   *
   * #### Notes
   * This is intended to be called only in response to a user action,
   * since the manager maintains its internal state.
   */
  async refreshSpecs() {
    await this._pollSpecs.refresh(), await this._pollSpecs.tick;
  }
  /**
   * Execute a request to the server to poll specs and update state.
   */
  async requestSpecs() {
    const t = await restapi$2.getSpecs(this.serverSettings);
    this.isDisposed || coreutils_1$7.JSONExt.deepEqual(t, this._specs) || (this._specs = t, this._specsChanged.emit(t));
  }
}
manager$4.KernelSpecManager = KernelSpecManager;
(function(e) {
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(l, f, p, d) {
    d === void 0 && (d = p);
    var _ = Object.getOwnPropertyDescriptor(f, p);
    (!_ || ("get" in _ ? !f.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return f[p];
    } }), Object.defineProperty(l, d, _);
  } : function(l, f, p, d) {
    d === void 0 && (d = p), l[d] = f[p];
  }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(l, f) {
    Object.defineProperty(l, "default", { enumerable: !0, value: f });
  } : function(l, f) {
    l.default = f;
  }), r = commonjsGlobal && commonjsGlobal.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var f = {};
    if (l != null)
      for (var p in l)
        p !== "default" && Object.prototype.hasOwnProperty.call(l, p) && t(f, l, p);
    return n(f, l), f;
  }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(l, f) {
    for (var p in l)
      p !== "default" && !Object.prototype.hasOwnProperty.call(f, p) && t(f, l, p);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelSpecAPI = e.KernelSpec = void 0;
  const o = r(kernelspec);
  e.KernelSpec = o;
  const a = r(restapi$3);
  e.KernelSpecAPI = a, s(manager$4, e);
})(kernelspec$1);
var hasRequired_default$2;
function require_default$2() {
  if (hasRequired_default$2)
    return _default$2;
  hasRequired_default$2 = 1;
  var e = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(dt, T, nt, nn) {
    nn === void 0 && (nn = nt);
    var lt = Object.getOwnPropertyDescriptor(T, nt);
    (!lt || ("get" in lt ? !T.__esModule : lt.writable || lt.configurable)) && (lt = { enumerable: !0, get: function() {
      return T[nt];
    } }), Object.defineProperty(dt, nn, lt);
  } : function(dt, T, nt, nn) {
    nn === void 0 && (nn = nt), dt[nn] = T[nt];
  }), t = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(dt, T) {
    Object.defineProperty(dt, "default", { enumerable: !0, value: T });
  } : function(dt, T) {
    dt.default = T;
  }), n = commonjsGlobal && commonjsGlobal.__importStar || function(dt) {
    if (dt && dt.__esModule)
      return dt;
    var T = {};
    if (dt != null)
      for (var nt in dt)
        nt !== "default" && Object.prototype.hasOwnProperty.call(dt, nt) && e(T, dt, nt);
    return t(T, dt), T;
  };
  Object.defineProperty(_default$2, "__esModule", { value: !0 }), _default$2.KernelConnection = void 0;
  const r = lib$1, s = distExports, o = require$$0, a = requireLib(), l = comm, f = n(messages), p = future, d = serialize$1, _ = n(validate$2), S = kernelspec$1, k = n(restapi$4), O = 3e3, rt = "_RESTARTING_", st = "";
  class ft {
    /**
     * Construct a kernel object.
     */
    constructor(T) {
      var nt, nn, lt, pt;
      this._createSocket = (at = !0) => {
        this._errorIfDisposed(), this._clearSocket(), this._updateConnectionStatus("connecting");
        const it = this.serverSettings, ht = r.URLExt.join(it.wsUrl, k.KERNEL_SERVICE_URL, encodeURIComponent(this._id)), sn = ht.replace(/^((?:\w+:)?\/\/)(?:[^@\/]+@)/, "$1");
        console.debug(`Starting WebSocket: ${sn}`);
        let on = r.URLExt.join(ht, "channels?session_id=" + encodeURIComponent(this._clientId));
        const ln = it.token;
        it.appendToken && ln !== "" && (on = on + `&token=${encodeURIComponent(ln)}`);
        const mn = at ? this._supportedProtocols : [];
        this._ws = new it.WebSocket(on, mn), this._ws.binaryType = "arraybuffer";
        let _n = !1;
        const En = async (bn) => {
          var Mn, hn;
          if (!this._isDisposed) {
            this._reason = "", this._model = void 0;
            try {
              const dn = await k.getKernelModel(this._id, it);
              this._model = dn, (dn == null ? void 0 : dn.execution_state) === "dead" ? this._updateStatus("dead") : this._onWSClose(bn);
            } catch (dn) {
              if (dn instanceof a.ServerConnection.NetworkError || ((Mn = dn.response) === null || Mn === void 0 ? void 0 : Mn.status) === 503 || ((hn = dn.response) === null || hn === void 0 ? void 0 : hn.status) === 424) {
                const Cn = ut.getRandomIntInclusive(10, 30) * 1e3;
                setTimeout(En, Cn, bn);
              } else
                this._reason = "Kernel died unexpectedly", this._updateStatus("dead");
            }
          }
        }, Tn = async (bn) => {
          _n || (_n = !0, await En(bn));
        };
        this._ws.onmessage = this._onWSMessage, this._ws.onopen = this._onWSOpen, this._ws.onclose = Tn, this._ws.onerror = Tn;
      }, this._onWSOpen = (at) => {
        if (this._ws.protocol !== "" && !this._supportedProtocols.includes(this._ws.protocol))
          throw console.log("Server selected unknown kernel wire protocol:", this._ws.protocol), this._updateStatus("dead"), new Error(`Unknown kernel wire protocol:  ${this._ws.protocol}`);
        this._selectedProtocol = this._ws.protocol, this._ws.onclose = this._onWSClose, this._ws.onerror = this._onWSClose, this._updateConnectionStatus("connected");
      }, this._onWSMessage = (at) => {
        let it;
        try {
          it = (0, d.deserialize)(at.data, this._ws.protocol), _.validateMessage(it);
        } catch (ht) {
          throw ht.message = `Kernel message validation error: ${ht.message}`, ht;
        }
        this._kernelSession = it.header.session, this._msgChain = this._msgChain.then(() => this._handleMessage(it)).catch((ht) => {
          ht.message.startsWith("Canceled future for ") && console.error(ht);
        }), this._anyMessage.emit({ msg: it, direction: "recv" });
      }, this._onWSClose = (at) => {
        this.isDisposed || this._reconnect();
      }, this._id = "", this._name = "", this._status = "unknown", this._connectionStatus = "connecting", this._kernelSession = "", this._isDisposed = !1, this._ws = null, this._username = "", this._reconnectLimit = 7, this._reconnectAttempt = 0, this._reconnectTimeout = null, this._supportedProtocols = Object.values(f.supportedKernelWebSocketProtocols), this._selectedProtocol = "", this._futures = /* @__PURE__ */ new Map(), this._comms = /* @__PURE__ */ new Map(), this._targetRegistry = /* @__PURE__ */ Object.create(null), this._info = new s.PromiseDelegate(), this._pendingMessages = [], this._statusChanged = new o.Signal(this), this._connectionStatusChanged = new o.Signal(this), this._disposed = new o.Signal(this), this._iopubMessage = new o.Signal(this), this._anyMessage = new o.Signal(this), this._pendingInput = new o.Signal(this), this._unhandledMessage = new o.Signal(this), this._displayIdToParentIds = /* @__PURE__ */ new Map(), this._msgIdToDisplayIds = /* @__PURE__ */ new Map(), this._msgChain = Promise.resolve(), this._hasPendingInput = !1, this._reason = "", this._noOp = () => {
      }, this._name = T.model.name, this._id = T.model.id, this.serverSettings = (nt = T.serverSettings) !== null && nt !== void 0 ? nt : a.ServerConnection.makeSettings(), this._clientId = (nn = T.clientId) !== null && nn !== void 0 ? nn : s.UUID.uuid4(), this._username = (lt = T.username) !== null && lt !== void 0 ? lt : "", this.handleComms = (pt = T.handleComms) !== null && pt !== void 0 ? pt : !0, this._createSocket();
    }
    get disposed() {
      return this._disposed;
    }
    /**
     * A signal emitted when the kernel status changes.
     */
    get statusChanged() {
      return this._statusChanged;
    }
    /**
     * A signal emitted when the kernel status changes.
     */
    get connectionStatusChanged() {
      return this._connectionStatusChanged;
    }
    /**
     * A signal emitted for iopub kernel messages.
     *
     * #### Notes
     * This signal is emitted after the iopub message is handled asynchronously.
     */
    get iopubMessage() {
      return this._iopubMessage;
    }
    /**
     * A signal emitted for unhandled kernel message.
     *
     * #### Notes
     * This signal is emitted for a message that was not handled. It is emitted
     * during the asynchronous message handling code.
     */
    get unhandledMessage() {
      return this._unhandledMessage;
    }
    /**
     * The kernel model
     */
    get model() {
      return this._model || {
        id: this.id,
        name: this.name,
        reason: this._reason
      };
    }
    /**
     * A signal emitted for any kernel message.
     *
     * #### Notes
     * This signal is emitted when a message is received, before it is handled
     * asynchronously.
     *
     * This message is emitted when a message is queued for sending (either in
     * the websocket buffer, or our own pending message buffer). The message may
     * actually be sent across the wire at a later time.
     *
     * The message emitted in this signal should not be modified in any way.
     */
    get anyMessage() {
      return this._anyMessage;
    }
    /**
     * A signal emitted when a kernel has pending inputs from the user.
     */
    get pendingInput() {
      return this._pendingInput;
    }
    /**
     * The id of the server-side kernel.
     */
    get id() {
      return this._id;
    }
    /**
     * The name of the server-side kernel.
     */
    get name() {
      return this._name;
    }
    /**
     * The client username.
     */
    get username() {
      return this._username;
    }
    /**
     * The client unique id.
     */
    get clientId() {
      return this._clientId;
    }
    /**
     * The current status of the kernel.
     */
    get status() {
      return this._status;
    }
    /**
     * The current connection status of the kernel connection.
     */
    get connectionStatus() {
      return this._connectionStatus;
    }
    /**
     * Test whether the kernel has been disposed.
     */
    get isDisposed() {
      return this._isDisposed;
    }
    /**
     * The cached kernel info.
     *
     * @returns A promise that resolves to the kernel info.
     */
    get info() {
      return this._info.promise;
    }
    /**
     * The kernel spec.
     *
     * @returns A promise that resolves to the kernel spec.
     */
    get spec() {
      return this._specPromise ? this._specPromise : (this._specPromise = S.KernelSpecAPI.getSpecs(this.serverSettings).then((T) => T.kernelspecs[this._name]), this._specPromise);
    }
    /**
     * Clone the current kernel with a new clientId.
     */
    clone(T = {}) {
      return new ft({
        model: this.model,
        username: this.username,
        serverSettings: this.serverSettings,
        // handleComms defaults to false since that is safer
        handleComms: !1,
        ...T
      });
    }
    /**
     * Dispose of the resources held by the kernel.
     */
    dispose() {
      this.isDisposed || (this._isDisposed = !0, this._disposed.emit(), this._updateConnectionStatus("disconnected"), this._clearKernelState(), this._pendingMessages = [], this._clearSocket(), o.Signal.clearData(this));
    }
    /**
     * Send a shell message to the kernel.
     *
     * #### Notes
     * Send a message to the kernel's shell channel, yielding a future object
     * for accepting replies.
     *
     * If `expectReply` is given and `true`, the future is disposed when both a
     * shell reply and an idle status message are received. If `expectReply`
     * is not given or is `false`, the future is resolved when an idle status
     * message is received.
     * If `disposeOnDone` is not given or is `true`, the Future is disposed at this point.
     * If `disposeOnDone` is given and `false`, it is up to the caller to dispose of the Future.
     *
     * All replies are validated as valid kernel messages.
     *
     * If the kernel status is `dead`, this will throw an error.
     */
    sendShellMessage(T, nt = !1, nn = !0) {
      return this._sendKernelShellControl(p.KernelShellFutureHandler, T, nt, nn);
    }
    /**
     * Send a control message to the kernel.
     *
     * #### Notes
     * Send a message to the kernel's control channel, yielding a future object
     * for accepting replies.
     *
     * If `expectReply` is given and `true`, the future is disposed when both a
     * control reply and an idle status message are received. If `expectReply`
     * is not given or is `false`, the future is resolved when an idle status
     * message is received.
     * If `disposeOnDone` is not given or is `true`, the Future is disposed at this point.
     * If `disposeOnDone` is given and `false`, it is up to the caller to dispose of the Future.
     *
     * All replies are validated as valid kernel messages.
     *
     * If the kernel status is `dead`, this will throw an error.
     */
    sendControlMessage(T, nt = !1, nn = !0) {
      return this._sendKernelShellControl(p.KernelControlFutureHandler, T, nt, nn);
    }
    _sendKernelShellControl(T, nt, nn = !1, lt = !0) {
      this._sendMessage(nt), this._anyMessage.emit({ msg: nt, direction: "send" });
      const pt = new T(() => {
        const at = nt.header.msg_id;
        this._futures.delete(at);
        const it = this._msgIdToDisplayIds.get(at);
        it && (it.forEach((ht) => {
          const sn = this._displayIdToParentIds.get(ht);
          if (sn) {
            const on = sn.indexOf(at);
            if (on === -1)
              return;
            sn.length === 1 ? this._displayIdToParentIds.delete(ht) : (sn.splice(on, 1), this._displayIdToParentIds.set(ht, sn));
          }
        }), this._msgIdToDisplayIds.delete(at));
      }, nt, nn, lt, this);
      return this._futures.set(nt.header.msg_id, pt), pt;
    }
    /**
     * Send a message on the websocket.
     *
     * If queue is true, queue the message for later sending if we cannot send
     * now. Otherwise throw an error.
     *
     * #### Notes
     * As an exception to the queueing, if we are sending a kernel_info_request
     * message while we think the kernel is restarting, we send the message
     * immediately without queueing. This is so that we can trigger a message
     * back, which will then clear the kernel restarting state.
     */
    _sendMessage(T, nt = !0) {
      if (this.status === "dead")
        throw new Error("Kernel is dead");
      if ((this._kernelSession === st || this._kernelSession === rt) && f.isInfoRequestMsg(T))
        if (this.connectionStatus === "connected") {
          this._ws.send((0, d.serialize)(T, this._ws.protocol));
          return;
        } else
          throw new Error("Could not send message: status is not connected");
      if (nt && this._pendingMessages.length > 0) {
        this._pendingMessages.push(T);
        return;
      }
      if (this.connectionStatus === "connected" && this._kernelSession !== rt)
        this._ws.send((0, d.serialize)(T, this._ws.protocol));
      else if (nt)
        this._pendingMessages.push(T);
      else
        throw new Error("Could not send message");
    }
    /**
     * Interrupt a kernel.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/kernels).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * It is assumed that the API call does not mutate the kernel id or name.
     *
     * The promise will be rejected if the kernel status is `Dead` or if the
     * request fails or the response is invalid.
     */
    async interrupt() {
      if (this.hasPendingInput = !1, this.status === "dead")
        throw new Error("Kernel is dead");
      return k.interruptKernel(this.id, this.serverSettings);
    }
    /**
     * Request a kernel restart.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/kernels)
     * and validates the response model.
     *
     * Any existing Future or Comm objects are cleared once the kernel has
     * actually be restarted.
     *
     * The promise is fulfilled on a valid server response (after the kernel restarts)
     * and rejected otherwise.
     *
     * It is assumed that the API call does not mutate the kernel id or name.
     *
     * The promise will be rejected if the request fails or the response is
     * invalid.
     */
    async restart() {
      if (this.status === "dead")
        throw new Error("Kernel is dead");
      this._updateStatus("restarting"), this._clearKernelState(), this._kernelSession = rt, await k.restartKernel(this.id, this.serverSettings), await this.reconnect(), this.hasPendingInput = !1;
    }
    /**
     * Reconnect to a kernel.
     *
     * #### Notes
     * This may try multiple times to reconnect to a kernel, and will sever any
     * existing connection.
     */
    reconnect() {
      this._errorIfDisposed();
      const T = new s.PromiseDelegate(), nt = (nn, lt) => {
        lt === "connected" ? (T.resolve(), this.connectionStatusChanged.disconnect(nt, this)) : lt === "disconnected" && (T.reject(new Error("Kernel connection disconnected")), this.connectionStatusChanged.disconnect(nt, this));
      };
      return this.connectionStatusChanged.connect(nt, this), this._reconnectAttempt = 0, this._reconnect(), T.promise;
    }
    /**
     * Shutdown a kernel.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/kernels).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * On a valid response, disposes this kernel connection.
     *
     * If the kernel is already `dead`, disposes this kernel connection without
     * a server request.
     */
    async shutdown() {
      this.status !== "dead" && await k.shutdownKernel(this.id, this.serverSettings), this.handleShutdown();
    }
    /**
     * Handles a kernel shutdown.
     *
     * #### Notes
     * This method should be called if we know from outside information that a
     * kernel is dead (for example, we cannot find the kernel model on the
     * server).
     */
    handleShutdown() {
      this._updateStatus("dead"), this.dispose();
    }
    /**
     * Send a `kernel_info_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#kernel-info).
     *
     * Fulfills with the `kernel_info_response` content when the shell reply is
     * received and validated.
     */
    async requestKernelInfo() {
      const T = f.createMessage({
        msgType: "kernel_info_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: {}
      });
      let nt;
      try {
        nt = await ut.handleShellMessage(this, T);
      } catch (nn) {
        if (this.isDisposed)
          return;
        throw nn;
      }
      if (this._errorIfDisposed(), !!nt)
        return nt.content.status === void 0 && (nt.content.status = "ok"), nt.content.status !== "ok" ? (this._info.reject("Kernel info reply errored"), nt) : (this._info.resolve(nt.content), this._kernelSession = nt.header.session, nt);
    }
    /**
     * Send a `complete_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#completion).
     *
     * Fulfills with the `complete_reply` content when the shell reply is
     * received and validated.
     */
    requestComplete(T) {
      const nt = f.createMessage({
        msgType: "complete_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return ut.handleShellMessage(this, nt);
    }
    /**
     * Send an `inspect_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#introspection).
     *
     * Fulfills with the `inspect_reply` content when the shell reply is
     * received and validated.
     */
    requestInspect(T) {
      const nt = f.createMessage({
        msgType: "inspect_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return ut.handleShellMessage(this, nt);
    }
    /**
     * Send a `history_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#history).
     *
     * Fulfills with the `history_reply` content when the shell reply is
     * received and validated.
     */
    requestHistory(T) {
      const nt = f.createMessage({
        msgType: "history_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return ut.handleShellMessage(this, nt);
    }
    /**
     * Send an `execute_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#execute).
     *
     * Future `onReply` is called with the `execute_reply` content when the
     * shell reply is received and validated. The future will resolve when
     * this message is received and the `idle` iopub status is received.
     * The future will also be disposed at this point unless `disposeOnDone`
     * is specified and `false`, in which case it is up to the caller to dispose
     * of the future.
     *
     * **See also:** [[IExecuteReply]]
     */
    requestExecute(T, nt = !0, nn) {
      const lt = {
        silent: !1,
        store_history: !0,
        user_expressions: {},
        allow_stdin: !0,
        stop_on_error: !1
      }, pt = f.createMessage({
        msgType: "execute_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: { ...lt, ...T },
        metadata: nn
      });
      return this.sendShellMessage(pt, !0, nt);
    }
    /**
     * Send an experimental `debug_request` message.
     *
     * @hidden
     *
     * #### Notes
     * Debug messages are experimental messages that are not in the official
     * kernel message specification. As such, this function is *NOT* considered
     * part of the public API, and may change without notice.
     */
    requestDebug(T, nt = !0) {
      const nn = f.createMessage({
        msgType: "debug_request",
        channel: "control",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return this.sendControlMessage(nn, !0, nt);
    }
    /**
     * Send an `is_complete_request` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#code-completeness).
     *
     * Fulfills with the `is_complete_response` content when the shell reply is
     * received and validated.
     */
    requestIsComplete(T) {
      const nt = f.createMessage({
        msgType: "is_complete_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return ut.handleShellMessage(this, nt);
    }
    /**
     * Send a `comm_info_request` message.
     *
     * #### Notes
     * Fulfills with the `comm_info_reply` content when the shell reply is
     * received and validated.
     */
    requestCommInfo(T) {
      const nt = f.createMessage({
        msgType: "comm_info_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return ut.handleShellMessage(this, nt);
    }
    /**
     * Send an `input_reply` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#messages-on-the-stdin-router-dealer-sockets).
     */
    sendInputReply(T, nt) {
      const nn = f.createMessage({
        msgType: "input_reply",
        channel: "stdin",
        username: this._username,
        session: this._clientId,
        content: T
      });
      nn.parent_header = nt, this._sendMessage(nn), this._anyMessage.emit({ msg: nn, direction: "send" }), this.hasPendingInput = !1;
    }
    /**
     * Create a new comm.
     *
     * #### Notes
     * If a client-side comm already exists with the given commId, an error is thrown.
     * If the kernel does not handle comms, an error is thrown.
     */
    createComm(T, nt = s.UUID.uuid4()) {
      if (!this.handleComms)
        throw new Error("Comms are disabled on this kernel connection");
      if (this._comms.has(nt))
        throw new Error("Comm is already created");
      const nn = new l.CommHandler(T, nt, this, () => {
        this._unregisterComm(nt);
      });
      return this._comms.set(nt, nn), nn;
    }
    /**
     * Check if a comm exists.
     */
    hasComm(T) {
      return this._comms.has(T);
    }
    /**
     * Register a comm target handler.
     *
     * @param targetName - The name of the comm target.
     *
     * @param callback - The callback invoked for a comm open message.
     *
     * @returns A disposable used to unregister the comm target.
     *
     * #### Notes
     * Only one comm target can be registered to a target name at a time, an
     * existing callback for the same target name will be overridden.  A registered
     * comm target handler will take precedence over a comm which specifies a
     * `target_module`.
     *
     * If the callback returns a promise, kernel message processing will pause
     * until the returned promise is fulfilled.
     */
    registerCommTarget(T, nt) {
      this.handleComms && (this._targetRegistry[T] = nt);
    }
    /**
     * Remove a comm target handler.
     *
     * @param targetName - The name of the comm target to remove.
     *
     * @param callback - The callback to remove.
     *
     * #### Notes
     * The comm target is only removed if the callback argument matches.
     */
    removeCommTarget(T, nt) {
      this.handleComms && !this.isDisposed && this._targetRegistry[T] === nt && delete this._targetRegistry[T];
    }
    /**
     * Register an IOPub message hook.
     *
     * @param msg_id - The parent_header message id the hook will intercept.
     *
     * @param hook - The callback invoked for the message.
     *
     * #### Notes
     * The IOPub hook system allows you to preempt the handlers for IOPub
     * messages that are responses to a given message id.
     *
     * The most recently registered hook is run first. A hook can return a
     * boolean or a promise to a boolean, in which case all kernel message
     * processing pauses until the promise is fulfilled. If a hook return value
     * resolves to false, any later hooks will not run and the function will
     * return a promise resolving to false. If a hook throws an error, the error
     * is logged to the console and the next hook is run. If a hook is
     * registered during the hook processing, it will not run until the next
     * message. If a hook is removed during the hook processing, it will be
     * deactivated immediately.
     *
     * See also [[IFuture.registerMessageHook]].
     */
    registerMessageHook(T, nt) {
      var nn;
      const lt = (nn = this._futures) === null || nn === void 0 ? void 0 : nn.get(T);
      lt && lt.registerMessageHook(nt);
    }
    /**
     * Remove an IOPub message hook.
     *
     * @param msg_id - The parent_header message id the hook intercepted.
     *
     * @param hook - The callback invoked for the message.
     *
     */
    removeMessageHook(T, nt) {
      var nn;
      const lt = (nn = this._futures) === null || nn === void 0 ? void 0 : nn.get(T);
      lt && lt.removeMessageHook(nt);
    }
    /**
     * Remove the input guard, if any.
     */
    removeInputGuard() {
      this.hasPendingInput = !1;
    }
    /**
     * Handle a message with a display id.
     *
     * @returns Whether the message was handled.
     */
    async _handleDisplayId(T, nt) {
      var nn, lt;
      const pt = nt.parent_header.msg_id;
      let at = this._displayIdToParentIds.get(T);
      if (at) {
        const ht = {
          header: s.JSONExt.deepCopy(nt.header),
          parent_header: s.JSONExt.deepCopy(nt.parent_header),
          metadata: s.JSONExt.deepCopy(nt.metadata),
          content: s.JSONExt.deepCopy(nt.content),
          channel: nt.channel,
          buffers: nt.buffers ? nt.buffers.slice() : []
        };
        ht.header.msg_type = "update_display_data", await Promise.all(at.map(async (sn) => {
          const on = this._futures && this._futures.get(sn);
          on && await on.handleMsg(ht);
        }));
      }
      if (nt.header.msg_type === "update_display_data")
        return !0;
      at = (nn = this._displayIdToParentIds.get(T)) !== null && nn !== void 0 ? nn : [], at.indexOf(pt) === -1 && at.push(pt), this._displayIdToParentIds.set(T, at);
      const it = (lt = this._msgIdToDisplayIds.get(pt)) !== null && lt !== void 0 ? lt : [];
      return it.indexOf(pt) === -1 && it.push(pt), this._msgIdToDisplayIds.set(pt, it), !1;
    }
    /**
     * Forcefully clear the socket state.
     *
     * #### Notes
     * This will clear all socket state without calling any handlers and will
     * not update the connection status. If you call this method, you are
     * responsible for updating the connection status as needed and recreating
     * the socket if you plan to reconnect.
     */
    _clearSocket() {
      this._ws !== null && (this._ws.onopen = this._noOp, this._ws.onclose = this._noOp, this._ws.onerror = this._noOp, this._ws.onmessage = this._noOp, this._ws.close(), this._ws = null);
    }
    /**
     * Handle status iopub messages from the kernel.
     */
    _updateStatus(T) {
      this._status === T || this._status === "dead" || (this._status = T, ut.logKernelStatus(this), this._statusChanged.emit(T), T === "dead" && this.dispose());
    }
    /**
     * Send pending messages to the kernel.
     */
    _sendPending() {
      for (; this.connectionStatus === "connected" && this._kernelSession !== rt && this._pendingMessages.length > 0; )
        this._sendMessage(this._pendingMessages[0], !1), this._pendingMessages.shift();
    }
    /**
     * Clear the internal state.
     */
    _clearKernelState() {
      this._kernelSession = "", this._pendingMessages = [], this._futures.forEach((T) => {
        T.dispose();
      }), this._comms.forEach((T) => {
        T.dispose();
      }), this._msgChain = Promise.resolve(), this._futures = /* @__PURE__ */ new Map(), this._comms = /* @__PURE__ */ new Map(), this._displayIdToParentIds.clear(), this._msgIdToDisplayIds.clear();
    }
    /**
     * Check to make sure it is okay to proceed to handle a message.
     *
     * #### Notes
     * Because we handle messages asynchronously, before a message is handled the
     * kernel might be disposed or restarted (and have a different session id).
     * This function throws an error in each of these cases. This is meant to be
     * called at the start of an asynchronous message handler to cancel message
     * processing if the message no longer is valid.
     */
    _assertCurrentMessage(T) {
      if (this._errorIfDisposed(), T.header.session !== this._kernelSession)
        throw new Error(`Canceling handling of old message: ${T.header.msg_type}`);
    }
    /**
     * Handle a `comm_open` kernel message.
     */
    async _handleCommOpen(T) {
      this._assertCurrentMessage(T);
      const nt = T.content, nn = new l.CommHandler(nt.target_name, nt.comm_id, this, () => {
        this._unregisterComm(nt.comm_id);
      });
      this._comms.set(nt.comm_id, nn);
      try {
        await (await ut.loadObject(nt.target_name, nt.target_module, this._targetRegistry))(nn, T);
      } catch (lt) {
        throw nn.close(), console.error("Exception opening new comm"), lt;
      }
    }
    /**
     * Handle 'comm_close' kernel message.
     */
    async _handleCommClose(T) {
      this._assertCurrentMessage(T);
      const nt = T.content, nn = this._comms.get(nt.comm_id);
      if (!nn) {
        console.error("Comm not found for comm id " + nt.comm_id);
        return;
      }
      this._unregisterComm(nn.commId);
      const lt = nn.onClose;
      lt && await lt(T), nn.dispose();
    }
    /**
     * Handle a 'comm_msg' kernel message.
     */
    async _handleCommMsg(T) {
      this._assertCurrentMessage(T);
      const nt = T.content, nn = this._comms.get(nt.comm_id);
      if (!nn)
        return;
      const lt = nn.onMsg;
      lt && await lt(T);
    }
    /**
     * Unregister a comm instance.
     */
    _unregisterComm(T) {
      this._comms.delete(T);
    }
    /**
     * Handle connection status changes.
     */
    _updateConnectionStatus(T) {
      if (this._connectionStatus !== T) {
        if (this._connectionStatus = T, T !== "connecting" && (this._reconnectAttempt = 0, clearTimeout(this._reconnectTimeout)), this.status !== "dead")
          if (T === "connected") {
            let nt = this._kernelSession === rt, nn = this.requestKernelInfo(), lt = !1, pt = () => {
              lt || (lt = !0, nt && this._kernelSession === rt && (this._kernelSession = ""), clearTimeout(at), this._pendingMessages.length > 0 && this._sendPending());
            };
            nn.then(pt);
            let at = setTimeout(pt, O);
          } else
            this._updateStatus("unknown");
        this._connectionStatusChanged.emit(T);
      }
    }
    async _handleMessage(T) {
      var nt, nn;
      let lt = !1;
      if (T.parent_header && T.channel === "iopub" && (f.isDisplayDataMsg(T) || f.isUpdateDisplayDataMsg(T) || f.isExecuteResultMsg(T))) {
        const at = ((nt = T.content.transient) !== null && nt !== void 0 ? nt : {}).display_id;
        at && (lt = await this._handleDisplayId(at, T), this._assertCurrentMessage(T));
      }
      if (!lt && T.parent_header) {
        const pt = T.parent_header, at = (nn = this._futures) === null || nn === void 0 ? void 0 : nn.get(pt.msg_id);
        if (at)
          await at.handleMsg(T), this._assertCurrentMessage(T);
        else {
          const it = pt.session === this.clientId;
          T.channel !== "iopub" && it && this._unhandledMessage.emit(T);
        }
      }
      if (T.channel === "iopub") {
        switch (T.header.msg_type) {
          case "status": {
            const pt = T.content.execution_state;
            pt === "restarting" && Promise.resolve().then(async () => {
              this._updateStatus("autorestarting"), this._clearKernelState(), await this.reconnect();
            }), this._updateStatus(pt);
            break;
          }
          case "comm_open":
            this.handleComms && await this._handleCommOpen(T);
            break;
          case "comm_msg":
            this.handleComms && await this._handleCommMsg(T);
            break;
          case "comm_close":
            this.handleComms && await this._handleCommClose(T);
            break;
        }
        this.isDisposed || (this._assertCurrentMessage(T), this._iopubMessage.emit(T));
      }
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
      if (this._errorIfDisposed(), clearTimeout(this._reconnectTimeout), this._reconnectAttempt < this._reconnectLimit) {
        this._updateConnectionStatus("connecting");
        const T = ut.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
        console.warn(`Connection lost, reconnecting in ${Math.floor(T / 1e3)} seconds.`);
        const nt = this._selectedProtocol !== "";
        this._reconnectTimeout = setTimeout(this._createSocket, T, nt), this._reconnectAttempt += 1;
      } else
        this._updateConnectionStatus("disconnected");
      this._clearSocket();
    }
    /**
     * Utility function to throw an error if this instance is disposed.
     */
    _errorIfDisposed() {
      if (this.isDisposed)
        throw new Error("Kernel connection is disposed");
    }
    get hasPendingInput() {
      return this._hasPendingInput;
    }
    set hasPendingInput(T) {
      this._hasPendingInput = T, this._pendingInput.emit(T);
    }
  }
  _default$2.KernelConnection = ft;
  var ut;
  return function(dt) {
    function T(pt) {
      switch (pt.status) {
        case "idle":
        case "busy":
        case "unknown":
          return;
        default:
          console.debug(`Kernel: ${pt.status} (${pt.id})`);
          break;
      }
    }
    dt.logKernelStatus = T;
    async function nt(pt, at) {
      return pt.sendShellMessage(at, !0).done;
    }
    dt.handleShellMessage = nt;
    function nn(pt, at, it) {
      return new Promise((ht, sn) => {
        if (at) {
          if (typeof requirejs > "u")
            throw new Error("requirejs not found");
          requirejs([at], (on) => {
            if (on[pt] === void 0) {
              const ln = `Object '${pt}' not found in module '${at}'`;
              sn(new Error(ln));
            } else
              ht(on[pt]);
          }, sn);
        } else
          it != null && it[pt] ? ht(it[pt]) : sn(new Error(`Object '${pt}' not found in registry`));
      });
    }
    dt.loadObject = nn;
    function lt(pt, at) {
      return pt = Math.ceil(pt), at = Math.floor(at), Math.floor(Math.random() * (at - pt + 1)) + pt;
    }
    dt.getRandomIntInclusive = lt;
  }(ut || (ut = {})), _default$2;
}
var manager$3 = {}, hasRequiredManager$3;
function requireManager$3() {
  return hasRequiredManager$3 || (hasRequiredManager$3 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelManager = void 0;
    const t = require$$2, n = require$$0, r = requireLib(), s = basemanager, o = restapi$4, a = require_default$2();
    class l extends s.BaseManager {
      /**
       * Construct a new kernel manager.
       *
       * @param options - The default options for kernel.
       */
      constructor(p = {}) {
        var d;
        super(p), this._isReady = !1, this._kernelConnections = /* @__PURE__ */ new Set(), this._models = /* @__PURE__ */ new Map(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:KernelManager#models",
          standby: (d = p.standby) !== null && d !== void 0 ? d : "when-hidden"
        }), this._ready = (async () => {
          await this._pollModels.start(), await this._pollModels.tick, this._isReady = !0;
        })();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * A signal emitted when the running kernels change.
       */
      get runningChanged() {
        return this._runningChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        this.isDisposed || (this._models.clear(), this._kernelConnections.forEach((p) => p.dispose()), this._pollModels.dispose(), super.dispose());
      }
      /**
       * Connect to an existing kernel.
       *
       * @returns The new kernel connection.
       *
       * #### Notes
       * This will use the manager's server settings and ignore any server
       * settings passed in the options.
       */
      connectTo(p) {
        var d;
        const { id: _ } = p.model;
        let S = (d = p.handleComms) !== null && d !== void 0 ? d : !0;
        if (p.handleComms === void 0) {
          for (const O of this._kernelConnections)
            if (O.id === _ && O.handleComms) {
              S = !1;
              break;
            }
        }
        const k = new a.KernelConnection({
          handleComms: S,
          ...p,
          serverSettings: this.serverSettings
        });
        return this._onStarted(k), this._models.has(_) || this.refreshRunning().catch(() => {
        }), k;
      }
      /**
       * Create an iterator over the most recent running kernels.
       *
       * @returns A new iterator over the running kernels.
       */
      running() {
        return this._models.values();
      }
      /**
       * Force a refresh of the running kernels.
       *
       * @returns A promise that resolves when the running list has been refreshed.
       *
       * #### Notes
       * This is not typically meant to be called by the user, since the
       * manager maintains its own internal state.
       */
      async refreshRunning() {
        await this._pollModels.refresh(), await this._pollModels.tick;
      }
      /**
       * Start a new kernel.
       *
       * @param createOptions - The kernel creation options
       *
       * @param connectOptions - The kernel connection options
       *
       * @returns A promise that resolves with the kernel connection.
       *
       * #### Notes
       * The manager `serverSettings` will be always be used.
       */
      async startNew(p = {}, d = {}) {
        const _ = await (0, o.startNew)(p, this.serverSettings);
        return this.connectTo({
          ...d,
          model: _
        });
      }
      /**
       * Shut down a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves when the operation is complete.
       */
      async shutdown(p) {
        await (0, o.shutdownKernel)(p, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all kernels.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all([...this._models.keys()].map((p) => (0, o.shutdownKernel)(p, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Find a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves with the kernel's model.
       */
      async findById(p) {
        return this._models.has(p) ? this._models.get(p) : (await this.refreshRunning(), this._models.get(p));
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var p, d;
        let _;
        try {
          _ = await (0, o.listRunning)(this.serverSettings);
        } catch (S) {
          throw (S instanceof r.ServerConnection.NetworkError || ((p = S.response) === null || p === void 0 ? void 0 : p.status) === 503 || ((d = S.response) === null || d === void 0 ? void 0 : d.status) === 424) && this._connectionFailure.emit(S), S;
        }
        this.isDisposed || this._models.size === _.length && _.every((S) => {
          const k = this._models.get(S.id);
          return k ? k.connections === S.connections && k.execution_state === S.execution_state && k.last_activity === S.last_activity && k.name === S.name && k.reason === S.reason && k.traceback === S.traceback : !1;
        }) || (this._models = new Map(_.map((S) => [S.id, S])), this._kernelConnections.forEach((S) => {
          this._models.has(S.id) || S.handleShutdown();
        }), this._runningChanged.emit(_));
      }
      /**
       * Handle a kernel starting.
       */
      _onStarted(p) {
        this._kernelConnections.add(p), p.statusChanged.connect(this._onStatusChanged, this), p.disposed.connect(this._onDisposed, this);
      }
      _onDisposed(p) {
        this._kernelConnections.delete(p), this.refreshRunning().catch(() => {
        });
      }
      _onStatusChanged(p, d) {
        d === "dead" && this.refreshRunning().catch(() => {
        });
      }
    }
    e.KernelManager = l, function(f) {
      class p extends f {
        constructor() {
          super(...arguments), this._readyPromise = new Promise(() => {
          });
        }
        /**
         * Whether the manager is active.
         */
        get isActive() {
          return !1;
        }
        /**
         * Used for testing.
         */
        get parentReady() {
          return super.ready;
        }
        /**
         * Start a new kernel - throws an error since it is not supported.
         */
        async startNew(_ = {}, S = {}) {
          return Promise.reject(new Error("Not implemented in no-op Kernel Manager"));
        }
        /**
         * Connect to an existing kernel - throws an error since it is not supported.
         */
        connectTo(_) {
          throw new Error("Not implemented in no-op Kernel Manager");
        }
        /**
         * Shut down a kernel by id - throws an error since it is not supported.
         */
        async shutdown(_) {
          return Promise.reject(new Error("Not implemented in no-op Kernel Manager"));
        }
        /**
         * A promise that fulfills when the manager is ready (never).
         */
        get ready() {
          return this.parentReady.then(() => this._readyPromise);
        }
        /**
         * Execute a request to the server to poll running kernels and update state.
         */
        async requestRunning() {
          return Promise.resolve();
        }
      }
      f.NoopManager = p;
    }(l = e.KernelManager || (e.KernelManager = {}));
  }(manager$3)), manager$3;
}
var hasRequiredKernel;
function requireKernel() {
  return hasRequiredKernel || (hasRequiredKernel = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(p, d, _, S) {
      S === void 0 && (S = _);
      var k = Object.getOwnPropertyDescriptor(d, _);
      (!k || ("get" in k ? !d.__esModule : k.writable || k.configurable)) && (k = { enumerable: !0, get: function() {
        return d[_];
      } }), Object.defineProperty(p, S, k);
    } : function(p, d, _, S) {
      S === void 0 && (S = _), p[S] = d[_];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(p, d) {
      Object.defineProperty(p, "default", { enumerable: !0, value: d });
    } : function(p, d) {
      p.default = d;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(p) {
      if (p && p.__esModule)
        return p;
      var d = {};
      if (p != null)
        for (var _ in p)
          _ !== "default" && Object.prototype.hasOwnProperty.call(p, _) && t(d, p, _);
      return n(d, p), d;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(p, d) {
      for (var _ in p)
        _ !== "default" && !Object.prototype.hasOwnProperty.call(d, _) && t(d, p, _);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelConnection = e.KernelAPI = e.KernelMessage = e.Kernel = void 0;
    const o = r(kernel);
    e.Kernel = o;
    const a = r(messages);
    e.KernelMessage = a;
    const l = r(restapi$4);
    e.KernelAPI = l;
    const f = require_default$2();
    Object.defineProperty(e, "KernelConnection", { enumerable: !0, get: function() {
      return f.KernelConnection;
    } }), s(requireManager$3(), e);
  }(kernel$1)), kernel$1;
}
var manager$2 = {}, builder = {};
Object.defineProperty(builder, "__esModule", { value: !0 });
builder.BuildManager = void 0;
const coreutils_1$6 = lib$1, serverconnection_1$4 = serverconnection, BUILD_SETTINGS_URL = "api/build";
class BuildManager {
  /**
   * Create a new setting manager.
   */
  constructor(t = {}) {
    var n;
    this._url = "", this.serverSettings = (n = t.serverSettings) !== null && n !== void 0 ? n : serverconnection_1$4.ServerConnection.makeSettings();
    const { baseUrl: r, appUrl: s } = this.serverSettings;
    this._url = coreutils_1$6.URLExt.join(r, s, BUILD_SETTINGS_URL);
  }
  /**
   * Test whether the build service is available.
   */
  get isAvailable() {
    return coreutils_1$6.PageConfig.getOption("buildAvailable").toLowerCase() === "true";
  }
  /**
   * Test whether to check build status automatically.
   */
  get shouldCheck() {
    return coreutils_1$6.PageConfig.getOption("buildCheck").toLowerCase() === "true";
  }
  /**
   * Get whether the application should be built.
   */
  getStatus() {
    const { _url: t, serverSettings: n } = this;
    return serverconnection_1$4.ServerConnection.makeRequest(t, {}, n).then((s) => {
      if (s.status !== 200)
        throw new serverconnection_1$4.ServerConnection.ResponseError(s);
      return s.json();
    }).then((s) => {
      if (typeof s.status != "string")
        throw new Error("Invalid data");
      if (typeof s.message != "string")
        throw new Error("Invalid data");
      return s;
    });
  }
  /**
   * Build the application.
   */
  build() {
    const { _url: t, serverSettings: n } = this, r = { method: "POST" };
    return serverconnection_1$4.ServerConnection.makeRequest(t, r, n).then((o) => {
      if (o.status === 400)
        throw new serverconnection_1$4.ServerConnection.ResponseError(o, "Build aborted");
      if (o.status !== 200) {
        const a = `Build failed with ${o.status}.

        If you are experiencing the build failure after installing an extension (or trying to include previously installed extension after updating JupyterLab) please check the extension repository for new installation instructions as many extensions migrated to the prebuilt extensions system which no longer requires rebuilding JupyterLab (but uses a different installation procedure, typically involving a package manager such as 'pip' or 'conda').

        If you specifically intended to install a source extension, please run 'jupyter lab build' on the server for full output.`;
        throw new serverconnection_1$4.ServerConnection.ResponseError(o, a);
      }
    });
  }
  /**
   * Cancel an active build.
   */
  cancel() {
    const { _url: t, serverSettings: n } = this, r = { method: "DELETE" };
    return serverconnection_1$4.ServerConnection.makeRequest(t, r, n).then((o) => {
      if (o.status !== 204)
        throw new serverconnection_1$4.ServerConnection.ResponseError(o);
    });
  }
}
builder.BuildManager = BuildManager;
var nbconvert = {};
Object.defineProperty(nbconvert, "__esModule", { value: !0 });
nbconvert.NbConvertManager = void 0;
const coreutils_1$5 = lib$1, serverconnection_1$3 = serverconnection, coreutils_2$1 = distExports, NBCONVERT_SETTINGS_URL = "api/nbconvert";
class NbConvertManager {
  /**
   * Create a new nbconvert manager.
   */
  constructor(t = {}) {
    var n;
    this._exportFormats = null, this.serverSettings = (n = t.serverSettings) !== null && n !== void 0 ? n : serverconnection_1$3.ServerConnection.makeSettings();
  }
  /**
   * Fetch and cache the export formats from the expensive nbconvert handler.
   */
  async fetchExportFormats() {
    this._requestingFormats = new coreutils_2$1.PromiseDelegate(), this._exportFormats = null;
    const t = this.serverSettings.baseUrl, n = coreutils_1$5.URLExt.join(t, NBCONVERT_SETTINGS_URL), { serverSettings: r } = this, s = await serverconnection_1$3.ServerConnection.makeRequest(n, {}, r);
    if (s.status !== 200)
      throw await serverconnection_1$3.ServerConnection.ResponseError.create(s);
    const o = await s.json(), a = {};
    return Object.keys(o).forEach(function(f) {
      const p = o[f].output_mimetype;
      a[f] = { output_mimetype: p };
    }), this._exportFormats = a, this._requestingFormats.resolve(a), a;
  }
  /**
   * Get the list of export formats, preferring pre-cached ones.
   */
  async getExportFormats(t = !0) {
    return this._requestingFormats ? this._requestingFormats.promise : t || !this._exportFormats ? await this.fetchExportFormats() : this._exportFormats;
  }
}
nbconvert.NbConvertManager = NbConvertManager;
var session$1 = {}, session = {};
Object.defineProperty(session, "__esModule", { value: !0 });
var restapi$1 = {}, validate = {};
Object.defineProperty(validate, "__esModule", { value: !0 });
validate.validateModels = validate.updateLegacySessionModel = validate.validateModel = void 0;
const validate_1 = validate$2, validate_2 = validate$3;
function validateModel(e) {
  (0, validate_2.validateProperty)(e, "id", "string"), (0, validate_2.validateProperty)(e, "type", "string"), (0, validate_2.validateProperty)(e, "name", "string"), (0, validate_2.validateProperty)(e, "path", "string"), (0, validate_2.validateProperty)(e, "kernel", "object"), (0, validate_1.validateModel)(e.kernel);
}
validate.validateModel = validateModel;
function updateLegacySessionModel(e) {
  e.path === void 0 && e.notebook !== void 0 && (e.path = e.notebook.path, e.type = "notebook", e.name = "");
}
validate.updateLegacySessionModel = updateLegacySessionModel;
function validateModels(e) {
  if (!Array.isArray(e))
    throw new Error("Invalid session list");
  e.forEach((t) => validateModel(t));
}
validate.validateModels = validateModels;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.updateSession = e.startSession = e.getSessionModel = e.shutdownSession = e.getSessionUrl = e.listRunning = e.SESSION_SERVICE_URL = void 0;
  const t = serverconnection, n = lib$1, r = validate;
  e.SESSION_SERVICE_URL = "api/sessions";
  async function s(d = t.ServerConnection.makeSettings()) {
    const _ = n.URLExt.join(d.baseUrl, e.SESSION_SERVICE_URL), S = await t.ServerConnection.makeRequest(_, {}, d);
    if (S.status !== 200)
      throw await t.ServerConnection.ResponseError.create(S);
    const k = await S.json();
    if (!Array.isArray(k))
      throw new Error("Invalid Session list");
    return k.forEach((O) => {
      (0, r.updateLegacySessionModel)(O), (0, r.validateModel)(O);
    }), k;
  }
  e.listRunning = s;
  function o(d, _) {
    return n.URLExt.join(d, e.SESSION_SERVICE_URL, _);
  }
  e.getSessionUrl = o;
  async function a(d, _ = t.ServerConnection.makeSettings()) {
    var S;
    const k = o(_.baseUrl, d), O = { method: "DELETE" }, rt = await t.ServerConnection.makeRequest(k, O, _);
    if (rt.status === 404) {
      const ft = (S = (await rt.json()).message) !== null && S !== void 0 ? S : `The session "${d}"" does not exist on the server`;
      console.warn(ft);
    } else {
      if (rt.status === 410)
        throw new t.ServerConnection.ResponseError(rt, "The kernel was deleted but the session was not");
      if (rt.status !== 204)
        throw await t.ServerConnection.ResponseError.create(rt);
    }
  }
  e.shutdownSession = a;
  async function l(d, _ = t.ServerConnection.makeSettings()) {
    const S = o(_.baseUrl, d), k = await t.ServerConnection.makeRequest(S, {}, _);
    if (k.status !== 200)
      throw await t.ServerConnection.ResponseError.create(k);
    const O = await k.json();
    return (0, r.updateLegacySessionModel)(O), (0, r.validateModel)(O), O;
  }
  e.getSessionModel = l;
  async function f(d, _ = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(_.baseUrl, e.SESSION_SERVICE_URL), k = {
      method: "POST",
      body: JSON.stringify(d)
    }, O = await t.ServerConnection.makeRequest(S, k, _);
    if (O.status !== 201)
      throw await t.ServerConnection.ResponseError.create(O);
    const rt = await O.json();
    return (0, r.updateLegacySessionModel)(rt), (0, r.validateModel)(rt), rt;
  }
  e.startSession = f;
  async function p(d, _ = t.ServerConnection.makeSettings()) {
    const S = o(_.baseUrl, d.id), k = {
      method: "PATCH",
      body: JSON.stringify(d)
    }, O = await t.ServerConnection.makeRequest(S, k, _);
    if (O.status !== 200)
      throw await t.ServerConnection.ResponseError.create(O);
    const rt = await O.json();
    return (0, r.updateLegacySessionModel)(rt), (0, r.validateModel)(rt), rt;
  }
  e.updateSession = p;
})(restapi$1);
var manager$1 = {}, _default$1 = {}, hasRequired_default$1;
function require_default$1() {
  if (hasRequired_default$1)
    return _default$1;
  hasRequired_default$1 = 1, Object.defineProperty(_default$1, "__esModule", { value: !0 }), _default$1.SessionConnection = void 0;
  const e = require$$0, t = requireLib(), n = restapi$1, r = distExports;
  class s {
    /**
     * Construct a new session.
     */
    constructor(a) {
      var l, f, p, d;
      this._id = "", this._path = "", this._name = "", this._type = "", this._kernel = null, this._isDisposed = !1, this._disposed = new e.Signal(this), this._kernelChanged = new e.Signal(this), this._statusChanged = new e.Signal(this), this._connectionStatusChanged = new e.Signal(this), this._pendingInput = new e.Signal(this), this._iopubMessage = new e.Signal(this), this._unhandledMessage = new e.Signal(this), this._anyMessage = new e.Signal(this), this._propertyChanged = new e.Signal(this), this._id = a.model.id, this._name = a.model.name, this._path = a.model.path, this._type = a.model.type, this._username = (l = a.username) !== null && l !== void 0 ? l : "", this._clientId = (f = a.clientId) !== null && f !== void 0 ? f : r.UUID.uuid4(), this._connectToKernel = a.connectToKernel, this._kernelConnectionOptions = (p = a.kernelConnectionOptions) !== null && p !== void 0 ? p : {}, this.serverSettings = (d = a.serverSettings) !== null && d !== void 0 ? d : t.ServerConnection.makeSettings(), this.setupKernel(a.model.kernel);
    }
    /**
     * A signal emitted when the session is disposed.
     */
    get disposed() {
      return this._disposed;
    }
    /**
     * A signal emitted when the kernel changes.
     */
    get kernelChanged() {
      return this._kernelChanged;
    }
    /**
     * A signal proxied from the connection about the kernel status.
     */
    get statusChanged() {
      return this._statusChanged;
    }
    /**
     * A signal proxied from the kernel about the connection status.
     */
    get connectionStatusChanged() {
      return this._connectionStatusChanged;
    }
    /**
     * A signal proxied from the kernel pending input.
     */
    get pendingInput() {
      return this._pendingInput;
    }
    /**
     * A signal proxied from the kernel about iopub kernel messages.
     */
    get iopubMessage() {
      return this._iopubMessage;
    }
    /**
     * A signal proxied from the kernel for an unhandled kernel message.
     */
    get unhandledMessage() {
      return this._unhandledMessage;
    }
    /**
     * A signal proxied from the kernel emitted for any kernel message.
     *
     * #### Notes
     * The behavior is undefined if the message is modified during message
     * handling. As such, it should be treated as read-only.
     */
    get anyMessage() {
      return this._anyMessage;
    }
    /**
     * A signal emitted when a session property changes.
     */
    get propertyChanged() {
      return this._propertyChanged;
    }
    /**
     * Get the session id.
     */
    get id() {
      return this._id;
    }
    /**
     * Get the session kernel connection object.
     *
     * #### Notes
     * This is a read-only property, and can be altered by [changeKernel].
     */
    get kernel() {
      return this._kernel;
    }
    /**
     * Get the session path.
     */
    get path() {
      return this._path;
    }
    /**
     * Get the session type.
     */
    get type() {
      return this._type;
    }
    /**
     * Get the session name.
     */
    get name() {
      return this._name;
    }
    /**
     * Get the model associated with the session.
     */
    get model() {
      return {
        id: this.id,
        kernel: this.kernel && { id: this.kernel.id, name: this.kernel.name },
        path: this._path,
        type: this._type,
        name: this._name
      };
    }
    /**
     * Test whether the session has been disposed.
     */
    get isDisposed() {
      return this._isDisposed;
    }
    /**
     * Update the session based on a session model from the server.
     *
     * #### Notes
     * This only updates this session connection instance. Use `setPath`,
     * `setName`, `setType`, and `changeKernel` to change the session values on
     * the server.
     */
    update(a) {
      const l = this.model;
      if (this._path = a.path, this._name = a.name, this._type = a.type, this._kernel === null && a.kernel !== null || this._kernel !== null && a.kernel === null || this._kernel !== null && a.kernel !== null && this._kernel.id !== a.kernel.id) {
        this._kernel !== null && this._kernel.dispose();
        const f = this._kernel || null;
        this.setupKernel(a.kernel);
        const p = this._kernel || null;
        this._kernelChanged.emit({ name: "kernel", oldValue: f, newValue: p });
      }
      this._handleModelChange(l);
    }
    /**
     * Dispose of the resources held by the session.
     */
    dispose() {
      if (!this.isDisposed) {
        if (this._isDisposed = !0, this._disposed.emit(), this._kernel) {
          this._kernel.dispose();
          const a = this._kernel;
          this._kernel = null;
          const l = this._kernel;
          this._kernelChanged.emit({ name: "kernel", oldValue: a, newValue: l });
        }
        e.Signal.clearData(this);
      }
    }
    /**
     * Change the session path.
     *
     * @param path - The new session path.
     *
     * @returns A promise that resolves when the session has renamed.
     *
     * #### Notes
     * This uses the Jupyter REST API, and the response is validated.
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    async setPath(a) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await this._patch({ path: a });
    }
    /**
     * Change the session name.
     */
    async setName(a) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await this._patch({ name: a });
    }
    /**
     * Change the session type.
     */
    async setType(a) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await this._patch({ type: a });
    }
    /**
     * Change the kernel.
     *
     * @param options - The name or id of the new kernel.
     *
     * #### Notes
     * This shuts down the existing kernel and creates a new kernel,
     * keeping the existing session ID and session path.
     */
    async changeKernel(a) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      return await this._patch({ kernel: a }), this.kernel;
    }
    /**
     * Kill the kernel and shutdown the session.
     *
     * @returns - The promise fulfilled on a valid response from the server.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter-server/jupyter_server/main/jupyter_server/services/api/api.yaml#!/sessions), and validates the response.
     * Disposes of the session and emits a [sessionDied] signal on success.
     */
    async shutdown() {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await (0, n.shutdownSession)(this.id, this.serverSettings), this.dispose();
    }
    /**
     * Create a new kernel connection and connect to its signals.
     *
     * #### Notes
     * This method is not meant to be subclassed.
     */
    setupKernel(a) {
      if (a === null) {
        this._kernel = null;
        return;
      }
      const l = this._connectToKernel({
        ...this._kernelConnectionOptions,
        model: a,
        username: this._username,
        clientId: this._clientId,
        serverSettings: this.serverSettings
      });
      this._kernel = l, l.statusChanged.connect(this.onKernelStatus, this), l.connectionStatusChanged.connect(this.onKernelConnectionStatus, this), l.pendingInput.connect(this.onPendingInput, this), l.unhandledMessage.connect(this.onUnhandledMessage, this), l.iopubMessage.connect(this.onIOPubMessage, this), l.anyMessage.connect(this.onAnyMessage, this);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelStatus(a, l) {
      this._statusChanged.emit(l);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelConnectionStatus(a, l) {
      this._connectionStatusChanged.emit(l);
    }
    /**
     * Handle a change in the pendingInput.
     */
    onPendingInput(a, l) {
      this._pendingInput.emit(l);
    }
    /**
     * Handle iopub kernel messages.
     */
    onIOPubMessage(a, l) {
      this._iopubMessage.emit(l);
    }
    /**
     * Handle unhandled kernel messages.
     */
    onUnhandledMessage(a, l) {
      this._unhandledMessage.emit(l);
    }
    /**
     * Handle any kernel messages.
     */
    onAnyMessage(a, l) {
      this._anyMessage.emit(l);
    }
    /**
     * Send a PATCH to the server, updating the session path or the kernel.
     */
    async _patch(a) {
      const l = await (0, n.updateSession)({ ...a, id: this._id }, this.serverSettings);
      return this.update(l), l;
    }
    /**
     * Handle a change to the model.
     */
    _handleModelChange(a) {
      a.name !== this._name && this._propertyChanged.emit("name"), a.type !== this._type && this._propertyChanged.emit("type"), a.path !== this._path && this._propertyChanged.emit("path");
    }
  }
  return _default$1.SessionConnection = s, _default$1;
}
var hasRequiredManager$2;
function requireManager$2() {
  return hasRequiredManager$2 || (hasRequiredManager$2 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SessionManager = void 0;
    const t = require$$2, n = require$$0, r = serverconnection, s = basemanager, o = require_default$1(), a = restapi$1;
    class l extends s.BaseManager {
      /**
       * Construct a new session manager.
       *
       * @param options - The default options for each session.
       */
      constructor(p) {
        var d;
        super(p), this._isReady = !1, this._sessionConnections = /* @__PURE__ */ new Set(), this._models = /* @__PURE__ */ new Map(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), this._connectToKernel = (_) => this._kernelManager.connectTo(_), this._kernelManager = p.kernelManager, this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:SessionManager#models",
          standby: (d = p.standby) !== null && d !== void 0 ? d : "when-hidden"
        }), this._ready = (async () => {
          await this._pollModels.start(), await this._pollModels.tick, this._kernelManager.isActive && await this._kernelManager.ready, this._isReady = !0;
        })();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * A signal emitted when the running sessions change.
       */
      get runningChanged() {
        return this._runningChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        this.isDisposed || (this._models.clear(), this._sessionConnections.forEach((p) => p.dispose()), this._pollModels.dispose(), super.dispose());
      }
      /*
       * Connect to a running session.  See also [[connectToSession]].
       */
      connectTo(p) {
        const d = new o.SessionConnection({
          ...p,
          connectToKernel: this._connectToKernel,
          serverSettings: this.serverSettings
        });
        return this._onStarted(d), this._models.has(p.model.id) || this.refreshRunning().catch(() => {
        }), d;
      }
      /**
       * Create an iterator over the most recent running sessions.
       *
       * @returns A new iterator over the running sessions.
       */
      running() {
        return this._models.values();
      }
      /**
       * Force a refresh of the running sessions.
       *
       * @returns A promise that with the list of running sessions.
       *
       * #### Notes
       * This is not typically meant to be called by the user, since the
       * manager maintains its own internal state.
       */
      async refreshRunning() {
        await this._pollModels.refresh(), await this._pollModels.tick;
      }
      /**
       * Start a new session.  See also [[startNewSession]].
       *
       * @param createOptions - Options for creating the session
       *
       * @param connectOptions - Options for connecting to the session
       */
      async startNew(p, d = {}) {
        const _ = await (0, a.startSession)(p, this.serverSettings);
        return await this.refreshRunning(), this.connectTo({ ...d, model: _ });
      }
      /**
       * Shut down a session by id.
       */
      async shutdown(p) {
        await (0, a.shutdownSession)(p, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all sessions.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all([...this._models.keys()].map((p) => (0, a.shutdownSession)(p, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Find a session associated with a path and stop it if it is the only session
       * using that kernel.
       *
       * @param path - The path in question.
       *
       * @returns A promise that resolves when the relevant sessions are stopped.
       */
      async stopIfNeeded(p) {
        try {
          const _ = (await (0, a.listRunning)(this.serverSettings)).filter((S) => S.path === p);
          if (_.length === 1) {
            const S = _[0].id;
            await this.shutdown(S);
          }
        } catch {
        }
      }
      /**
       * Find a session by id.
       */
      async findById(p) {
        return this._models.has(p) ? this._models.get(p) : (await this.refreshRunning(), this._models.get(p));
      }
      /**
       * Find a session by path.
       */
      async findByPath(p) {
        for (const d of this._models.values())
          if (d.path === p)
            return d;
        await this.refreshRunning();
        for (const d of this._models.values())
          if (d.path === p)
            return d;
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var p, d;
        let _;
        try {
          _ = await (0, a.listRunning)(this.serverSettings);
        } catch (S) {
          throw (S instanceof r.ServerConnection.NetworkError || ((p = S.response) === null || p === void 0 ? void 0 : p.status) === 503 || ((d = S.response) === null || d === void 0 ? void 0 : d.status) === 424) && this._connectionFailure.emit(S), S;
        }
        this.isDisposed || this._models.size === _.length && _.every((S) => {
          var k, O, rt, st;
          const ft = this._models.get(S.id);
          return ft ? ((k = ft.kernel) === null || k === void 0 ? void 0 : k.id) === ((O = S.kernel) === null || O === void 0 ? void 0 : O.id) && ((rt = ft.kernel) === null || rt === void 0 ? void 0 : rt.name) === ((st = S.kernel) === null || st === void 0 ? void 0 : st.name) && ft.name === S.name && ft.path === S.path && ft.type === S.type : !1;
        }) || (this._models = new Map(_.map((S) => [S.id, S])), this._sessionConnections.forEach((S) => {
          this._models.has(S.id) ? S.update(this._models.get(S.id)) : S.dispose();
        }), this._runningChanged.emit(_));
      }
      /**
       * Handle a session starting.
       */
      _onStarted(p) {
        this._sessionConnections.add(p), p.disposed.connect(this._onDisposed, this), p.propertyChanged.connect(this._onChanged, this), p.kernelChanged.connect(this._onChanged, this);
      }
      _onDisposed(p) {
        this._sessionConnections.delete(p), this.refreshRunning().catch(() => {
        });
      }
      _onChanged() {
        this.refreshRunning().catch(() => {
        });
      }
    }
    e.SessionManager = l, function(f) {
      class p extends f {
        constructor() {
          super(...arguments), this._readyPromise = new Promise(() => {
          });
        }
        /**
         * Whether the manager is active.
         */
        get isActive() {
          return !1;
        }
        /**
         * Used for testing.
         */
        get parentReady() {
          return super.ready;
        }
        /**
         * Start a new session - throw an error since it is not supported.
         */
        async startNew(_, S = {}) {
          return Promise.reject(new Error("Not implemented in no-op Session Manager"));
        }
        /*
         * Connect to a running session - throw an error since it is not supported.
         */
        connectTo(_) {
          throw Error("Not implemented in no-op Session Manager");
        }
        /**
         * A promise that fulfills when the manager is ready (never).
         */
        get ready() {
          return this.parentReady.then(() => this._readyPromise);
        }
        /**
         * Shut down a session by id - throw an error since it is not supported.
         */
        async shutdown(_) {
          return Promise.reject(new Error("Not implemented in no-op Session Manager"));
        }
        /**
         * Execute a request to the server to poll running sessions and update state.
         */
        async requestRunning() {
          return Promise.resolve();
        }
      }
      f.NoopManager = p;
    }(l = e.SessionManager || (e.SessionManager = {}));
  }(manager$1)), manager$1;
}
var hasRequiredSession;
function requireSession() {
  return hasRequiredSession || (hasRequiredSession = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(l, f, p, d) {
      d === void 0 && (d = p);
      var _ = Object.getOwnPropertyDescriptor(f, p);
      (!_ || ("get" in _ ? !f.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
        return f[p];
      } }), Object.defineProperty(l, d, _);
    } : function(l, f, p, d) {
      d === void 0 && (d = p), l[d] = f[p];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(l, f) {
      Object.defineProperty(l, "default", { enumerable: !0, value: f });
    } : function(l, f) {
      l.default = f;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(l) {
      if (l && l.__esModule)
        return l;
      var f = {};
      if (l != null)
        for (var p in l)
          p !== "default" && Object.prototype.hasOwnProperty.call(l, p) && t(f, l, p);
      return n(f, l), f;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(l, f) {
      for (var p in l)
        p !== "default" && !Object.prototype.hasOwnProperty.call(f, p) && t(f, l, p);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SessionAPI = e.Session = void 0;
    const o = r(session);
    e.Session = o;
    const a = r(restapi$1);
    e.SessionAPI = a, s(requireManager$2(), e);
  }(session$1)), session$1;
}
var setting = {}, lib = {}, dataconnector = {};
Object.defineProperty(dataconnector, "__esModule", { value: !0 });
dataconnector.DataConnector = void 0;
class DataConnector {
  /**
   * Retrieve the list of items available from the data connector.
   *
   * @param query - The optional query filter to apply to the connector request.
   *
   * @returns A promise that always rejects with an error.
   *
   * #### Notes
   * Subclasses should reimplement if they support a back-end that can list.
   */
  async list(t) {
    throw new Error("DataConnector#list method has not been implemented.");
  }
  /**
   * Remove a value using the data connector.
   *
   * @param id - The identifier for the data being removed.
   *
   * @returns A promise that always rejects with an error.
   *
   * #### Notes
   * Subclasses should reimplement if they support a back-end that can remove.
   */
  async remove(t) {
    throw new Error("DataConnector#remove method has not been implemented.");
  }
  /**
   * Save a value using the data connector.
   *
   * @param id - The identifier for the data being saved.
   *
   * @param value - The data being saved.
   *
   * @returns A promise that always rejects with an error.
   *
   * #### Notes
   * Subclasses should reimplement if they support a back-end that can save.
   */
  async save(t, n) {
    throw new Error("DataConnector#save method has not been implemented.");
  }
}
dataconnector.DataConnector = DataConnector;
var interfaces = {};
Object.defineProperty(interfaces, "__esModule", { value: !0 });
var restorablepool = {};
class AttachedProperty {
  /**
   * Construct a new attached property.
   *
   * @param options - The options for initializing the property.
   */
  constructor(t) {
    this._pid = Private$4.nextPID(), this.name = t.name, this._create = t.create, this._coerce = t.coerce || null, this._compare = t.compare || null, this._changed = t.changed || null;
  }
  /**
   * Get the current value of the property for a given owner.
   *
   * @param owner - The property owner of interest.
   *
   * @returns The current value of the property.
   *
   * #### Notes
   * If the value has not yet been set, the default value will be
   * computed and assigned as the current value of the property.
   */
  get(t) {
    let n, r = Private$4.ensureMap(t);
    return this._pid in r ? n = r[this._pid] : n = r[this._pid] = this._createValue(t), n;
  }
  /**
   * Set the current value of the property for a given owner.
   *
   * @param owner - The property owner of interest.
   *
   * @param value - The value for the property.
   *
   * #### Notes
   * If the value has not yet been set, the default value will be
   * computed and used as the previous value for the comparison.
   */
  set(t, n) {
    let r, s = Private$4.ensureMap(t);
    this._pid in s ? r = s[this._pid] : r = s[this._pid] = this._createValue(t);
    let o = this._coerceValue(t, n);
    this._maybeNotify(t, r, s[this._pid] = o);
  }
  /**
   * Explicitly coerce the current property value for a given owner.
   *
   * @param owner - The property owner of interest.
   *
   * #### Notes
   * If the value has not yet been set, the default value will be
   * computed and used as the previous value for the comparison.
   */
  coerce(t) {
    let n, r = Private$4.ensureMap(t);
    this._pid in r ? n = r[this._pid] : n = r[this._pid] = this._createValue(t);
    let s = this._coerceValue(t, n);
    this._maybeNotify(t, n, r[this._pid] = s);
  }
  /**
   * Get or create the default value for the given owner.
   */
  _createValue(t) {
    let n = this._create;
    return n(t);
  }
  /**
   * Coerce the value for the given owner.
   */
  _coerceValue(t, n) {
    let r = this._coerce;
    return r ? r(t, n) : n;
  }
  /**
   * Compare the old value and new value for equality.
   */
  _compareValue(t, n) {
    let r = this._compare;
    return r ? r(t, n) : t === n;
  }
  /**
   * Run the change notification if the given values are different.
   */
  _maybeNotify(t, n, r) {
    let s = this._changed;
    s && !this._compareValue(n, r) && s(t, n, r);
  }
}
(function(e) {
  function t(n) {
    Private$4.ownerData.delete(n);
  }
  e.clearData = t;
})(AttachedProperty || (AttachedProperty = {}));
var Private$4;
(function(e) {
  e.ownerData = /* @__PURE__ */ new WeakMap(), e.nextPID = (() => {
    let n = 0;
    return () => `pid-${`${Math.random()}`.slice(2)}-${n++}`;
  })();
  function t(n) {
    let r = e.ownerData.get(n);
    return r || (r = /* @__PURE__ */ Object.create(null), e.ownerData.set(n, r), r);
  }
  e.ensureMap = t;
})(Private$4 || (Private$4 = {}));
const index_es6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get AttachedProperty() {
    return AttachedProperty;
  }
}, Symbol.toStringTag, { value: "Module" })), require$$1 = /* @__PURE__ */ getAugmentedNamespace(index_es6);
Object.defineProperty(restorablepool, "__esModule", { value: !0 });
restorablepool.RestorablePool = void 0;
const coreutils_1$4 = distExports, properties_1 = require$$1, signaling_1$1 = require$$0;
class RestorablePool {
  /**
   * Create a new restorable pool.
   *
   * @param options - The instantiation options for a restorable pool.
   */
  constructor(t) {
    this._added = new signaling_1$1.Signal(this), this._current = null, this._currentChanged = new signaling_1$1.Signal(this), this._hasRestored = !1, this._isDisposed = !1, this._objects = /* @__PURE__ */ new Set(), this._restore = null, this._restored = new coreutils_1$4.PromiseDelegate(), this._updated = new signaling_1$1.Signal(this), this.namespace = t.namespace;
  }
  /**
   * A signal emitted when an object object is added.
   *
   * #### Notes
   * This signal will only fire when an object is added to the pool.
   * It will not fire if an object injected into the pool.
   */
  get added() {
    return this._added;
  }
  /**
   * The current object.
   *
   * #### Notes
   * The restorable pool does not set `current`. It is intended for client use.
   *
   * If `current` is set to an object that does not exist in the pool, it is a
   * no-op.
   */
  get current() {
    return this._current;
  }
  set current(t) {
    this._current !== t && t !== null && this._objects.has(t) && (this._current = t, this._currentChanged.emit(this._current));
  }
  /**
   * A signal emitted when the current widget changes.
   */
  get currentChanged() {
    return this._currentChanged;
  }
  /**
   * Test whether the pool is disposed.
   */
  get isDisposed() {
    return this._isDisposed;
  }
  /**
   * A promise resolved when the restorable pool has been restored.
   */
  get restored() {
    return this._restored.promise;
  }
  /**
   * The number of objects held by the pool.
   */
  get size() {
    return this._objects.size;
  }
  /**
   * A signal emitted when an object is updated.
   */
  get updated() {
    return this._updated;
  }
  /**
   * Add a new object to the pool.
   *
   * @param obj - The object object being added.
   *
   * #### Notes
   * The object passed into the pool is added synchronously; its existence in
   * the pool can be checked with the `has()` method. The promise this method
   * returns resolves after the object has been added and saved to an underlying
   * restoration connector, if one is available.
   */
  async add(t) {
    var n, r;
    if (t.isDisposed) {
      const s = "A disposed object cannot be added.";
      throw console.warn(s, t), new Error(s);
    }
    if (this._objects.has(t)) {
      const s = "This object already exists in the pool.";
      throw console.warn(s, t), new Error(s);
    }
    if (this._objects.add(t), t.disposed.connect(this._onInstanceDisposed, this), !Private$3.injectedProperty.get(t)) {
      if (this._restore) {
        const { connector: s } = this._restore, o = this._restore.name(t);
        if (o) {
          const a = `${this.namespace}:${o}`, l = (r = (n = this._restore).args) === null || r === void 0 ? void 0 : r.call(n, t);
          Private$3.nameProperty.set(t, a), await s.save(a, { data: l });
        }
      }
      this._added.emit(t);
    }
  }
  /**
   * Dispose of the resources held by the pool.
   *
   * #### Notes
   * Disposing a pool does not affect the underlying data in the data connector,
   * it simply disposes the client-side pool without making any connector calls.
   */
  dispose() {
    this.isDisposed || (this._current = null, this._isDisposed = !0, this._objects.clear(), signaling_1$1.Signal.clearData(this));
  }
  /**
   * Find the first object in the pool that satisfies a filter function.
   *
   * @param - fn The filter function to call on each object.
   */
  find(t) {
    const n = this._objects.values();
    for (const r of n)
      if (t(r))
        return r;
  }
  /**
   * Iterate through each object in the pool.
   *
   * @param fn - The function to call on each object.
   */
  forEach(t) {
    this._objects.forEach(t);
  }
  /**
   * Filter the objects in the pool based on a predicate.
   *
   * @param fn - The function by which to filter.
   */
  filter(t) {
    const n = [];
    return this.forEach((r) => {
      t(r) && n.push(r);
    }), n;
  }
  /**
   * Inject an object into the restorable pool without the pool handling its
   * restoration lifecycle.
   *
   * @param obj - The object to inject into the pool.
   */
  inject(t) {
    return Private$3.injectedProperty.set(t, !0), this.add(t);
  }
  /**
   * Check if this pool has the specified object.
   *
   * @param obj - The object whose existence is being checked.
   */
  has(t) {
    return this._objects.has(t);
  }
  /**
   * Restore the objects in this pool's namespace.
   *
   * @param options - The configuration options that describe restoration.
   *
   * @returns A promise that resolves when restoration has completed.
   *
   * #### Notes
   * This function should almost never be invoked by client code. Its primary
   * use case is to be invoked by a layout restorer plugin that handles
   * multiple restorable pools and, when ready, asks them each to restore their
   * respective objects.
   */
  async restore(t) {
    if (this._hasRestored)
      throw new Error("This pool has already been restored.");
    this._hasRestored = !0;
    const { command: n, connector: r, registry: s, when: o } = t, a = this.namespace, l = o ? [r.list(a)].concat(o) : [r.list(a)];
    this._restore = t;
    const [f] = await Promise.all(l), p = await Promise.all(f.ids.map(async (d, _) => {
      const S = f.values[_], k = S && S.data;
      return k === void 0 ? r.remove(d) : s.execute(n, k).catch(() => r.remove(d));
    }));
    return this._restored.resolve(), p;
  }
  /**
   * Save the restore data for a given object.
   *
   * @param obj - The object being saved.
   */
  async save(t) {
    var n, r;
    const s = Private$3.injectedProperty.get(t);
    if (!this._restore || !this.has(t) || s)
      return;
    const { connector: o } = this._restore, a = this._restore.name(t), l = Private$3.nameProperty.get(t), f = a ? `${this.namespace}:${a}` : "";
    if (l && l !== f && await o.remove(l), Private$3.nameProperty.set(t, f), f) {
      const p = (r = (n = this._restore).args) === null || r === void 0 ? void 0 : r.call(n, t);
      await o.save(f, { data: p });
    }
    l !== f && this._updated.emit(t);
  }
  /**
   * Clean up after disposed objects.
   */
  _onInstanceDisposed(t) {
    if (this._objects.delete(t), t === this._current && (this._current = null, this._currentChanged.emit(this._current)), Private$3.injectedProperty.get(t) || !this._restore)
      return;
    const { connector: n } = this._restore, r = Private$3.nameProperty.get(t);
    r && n.remove(r);
  }
}
restorablepool.RestorablePool = RestorablePool;
var Private$3;
(function(e) {
  e.injectedProperty = new properties_1.AttachedProperty({
    name: "injected",
    create: () => !1
  }), e.nameProperty = new properties_1.AttachedProperty({
    name: "name",
    create: () => ""
  });
})(Private$3 || (Private$3 = {}));
var statedb = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.StateDB = void 0;
  const t = require$$0;
  class n {
    /**
     * Create a new state database.
     *
     * @param options - The instantiation options for a state database.
     */
    constructor(s = {}) {
      this._changed = new t.Signal(this);
      const { connector: o, transform: a } = s;
      this._connector = o || new n.Connector(), a ? this._ready = a.then((l) => {
        const { contents: f, type: p } = l;
        switch (p) {
          case "cancel":
            return;
          case "clear":
            return this._clear();
          case "merge":
            return this._merge(f || {});
          case "overwrite":
            return this._overwrite(f || {});
          default:
            return;
        }
      }) : this._ready = Promise.resolve(void 0);
    }
    /**
     * A signal that emits the change type any time a value changes.
     */
    get changed() {
      return this._changed;
    }
    /**
     * Clear the entire database.
     */
    async clear() {
      await this._ready, await this._clear();
    }
    /**
     * Retrieve a saved bundle from the database.
     *
     * @param id - The identifier used to retrieve a data bundle.
     *
     * @returns A promise that bears a data payload if available.
     *
     * #### Notes
     * The `id` values of stored items in the state database are formatted:
     * `'namespace:identifier'`, which is the same convention that command
     * identifiers in JupyterLab use as well. While this is not a technical
     * requirement for `fetch()`, `remove()`, and `save()`, it *is* necessary for
     * using the `list(namespace: string)` method.
     *
     * The promise returned by this method may be rejected if an error occurs in
     * retrieving the data. Non-existence of an `id` will succeed with the `value`
     * `undefined`.
     */
    async fetch(s) {
      return await this._ready, this._fetch(s);
    }
    /**
     * Retrieve all the saved bundles for a namespace.
     *
     * @param filter - The namespace prefix to retrieve.
     *
     * @returns A promise that bears a collection of payloads for a namespace.
     *
     * #### Notes
     * Namespaces are entirely conventional entities. The `id` values of stored
     * items in the state database are formatted: `'namespace:identifier'`, which
     * is the same convention that command identifiers in JupyterLab use as well.
     *
     * If there are any errors in retrieving the data, they will be logged to the
     * console in order to optimistically return any extant data without failing.
     * This promise will always succeed.
     */
    async list(s) {
      return await this._ready, this._list(s);
    }
    /**
     * Remove a value from the database.
     *
     * @param id - The identifier for the data being removed.
     *
     * @returns A promise that is rejected if remove fails and succeeds otherwise.
     */
    async remove(s) {
      await this._ready, await this._remove(s), this._changed.emit({ id: s, type: "remove" });
    }
    /**
     * Save a value in the database.
     *
     * @param id - The identifier for the data being saved.
     *
     * @param value - The data being saved.
     *
     * @returns A promise that is rejected if saving fails and succeeds otherwise.
     *
     * #### Notes
     * The `id` values of stored items in the state database are formatted:
     * `'namespace:identifier'`, which is the same convention that command
     * identifiers in JupyterLab use as well. While this is not a technical
     * requirement for `fetch()`, `remove()`, and `save()`, it *is* necessary for
     * using the `list(namespace: string)` method.
     */
    async save(s, o) {
      await this._ready, await this._save(s, o), this._changed.emit({ id: s, type: "save" });
    }
    /**
     * Return a serialized copy of the state database's entire contents.
     *
     * @returns A promise that resolves with the database contents as JSON.
     */
    async toJSON() {
      await this._ready;
      const { ids: s, values: o } = await this._list();
      return o.reduce((a, l, f) => (a[s[f]] = l, a), {});
    }
    /**
     * Clear the entire database.
     */
    async _clear() {
      await Promise.all((await this._list()).ids.map((s) => this._remove(s)));
    }
    /**
     * Fetch a value from the database.
     */
    async _fetch(s) {
      const o = await this._connector.fetch(s);
      if (o)
        return JSON.parse(o).v;
    }
    /**
     * Fetch a list from the database.
     */
    async _list(s = "") {
      const { ids: o, values: a } = await this._connector.list(s);
      return {
        ids: o,
        values: a.map((l) => JSON.parse(l).v)
      };
    }
    /**
     * Merge data into the state database.
     */
    async _merge(s) {
      await Promise.all(Object.keys(s).map((o) => s[o] && this._save(o, s[o])));
    }
    /**
     * Overwrite the entire database with new contents.
     */
    async _overwrite(s) {
      await this._clear(), await this._merge(s);
    }
    /**
     * Remove a key in the database.
     */
    async _remove(s) {
      return this._connector.remove(s);
    }
    /**
     * Save a key and its value in the database.
     */
    async _save(s, o) {
      return this._connector.save(s, JSON.stringify({ v: o }));
    }
  }
  e.StateDB = n, function(r) {
    class s {
      constructor() {
        this._storage = {};
      }
      /**
       * Retrieve an item from the data connector.
       */
      async fetch(a) {
        return this._storage[a];
      }
      /**
       * Retrieve the list of items available from the data connector.
       *
       * @param namespace - If not empty, only keys whose first token before `:`
       * exactly match `namespace` will be returned, e.g. `foo` in `foo:bar`.
       */
      async list(a = "") {
        return Object.keys(this._storage).reduce((l, f) => ((a === "" || a === f.split(":")[0]) && (l.ids.push(f), l.values.push(this._storage[f])), l), { ids: [], values: [] });
      }
      /**
       * Remove a value using the data connector.
       */
      async remove(a) {
        delete this._storage[a];
      }
      /**
       * Save a value using the data connector.
       */
      async save(a, l) {
        this._storage[a] = l;
      }
    }
    r.Connector = s;
  }(n = e.StateDB || (e.StateDB = {}));
})(statedb);
var tokens = {};
Object.defineProperty(tokens, "__esModule", { value: !0 });
tokens.IStateDB = void 0;
const coreutils_1$3 = distExports;
tokens.IStateDB = new coreutils_1$3.Token("@jupyterlab/coreutils:IStateDB", `A service for the JupyterLab state database.
  Use this if you want to store data that will persist across page loads.
  See "state database" for more information.`);
(function(e) {
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
    a === void 0 && (a = o);
    var l = Object.getOwnPropertyDescriptor(s, o);
    (!l || ("get" in l ? !s.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, l);
  } : function(r, s, o, a) {
    a === void 0 && (a = o), r[a] = s[o];
  }), n = commonjsGlobal && commonjsGlobal.__exportStar || function(r, s) {
    for (var o in r)
      o !== "default" && !Object.prototype.hasOwnProperty.call(s, o) && t(s, r, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(dataconnector, e), n(interfaces, e), n(restorablepool, e), n(statedb, e), n(tokens, e);
})(lib);
Object.defineProperty(setting, "__esModule", { value: !0 });
setting.SettingManager = void 0;
const coreutils_1$2 = lib$1, statedb_1$1 = lib, serverconnection_1$2 = serverconnection, SERVICE_SETTINGS_URL = "api/settings";
class SettingManager extends statedb_1$1.DataConnector {
  /**
   * Create a new setting manager.
   */
  constructor(t = {}) {
    var n;
    super(), this.serverSettings = (n = t.serverSettings) !== null && n !== void 0 ? n : serverconnection_1$2.ServerConnection.makeSettings();
  }
  /**
   * Fetch a plugin's settings.
   *
   * @param id - The plugin's ID.
   *
   * @returns A promise that resolves if successful.
   */
  async fetch(t) {
    if (!t)
      throw new Error("Plugin `id` parameter is required for settings fetch.");
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1$2.ServerConnection, l = r + s, f = Private$2.url(l, t), p = await o(f, {}, n);
    if (p.status !== 200)
      throw await a.create(p);
    return p.json();
  }
  /**
   * Fetch the list of all plugin setting bundles.
   *
   * @returns A promise that resolves if successful.
   */
  async list(t) {
    var n, r, s, o;
    const { serverSettings: a } = this, { baseUrl: l, appUrl: f } = a, { makeRequest: p, ResponseError: d } = serverconnection_1$2.ServerConnection, _ = l + f, S = Private$2.url(_, "", t === "ids"), k = await p(S, {}, a);
    if (k.status !== 200)
      throw new d(k);
    const O = await k.json(), rt = (r = (n = O == null ? void 0 : O.settings) === null || n === void 0 ? void 0 : n.map((ft) => ft.id)) !== null && r !== void 0 ? r : [];
    let st = [];
    return t || (st = (o = (s = O == null ? void 0 : O.settings) === null || s === void 0 ? void 0 : s.map((ft) => (ft.data = { composite: {}, user: {} }, ft))) !== null && o !== void 0 ? o : []), { ids: rt, values: st };
  }
  /**
   * Save a plugin's settings.
   *
   * @param id - The plugin's ID.
   *
   * @param raw - The user setting values as a raw string of JSON with comments.
   *
   * @returns A promise that resolves if successful.
   */
  async save(t, n) {
    const { serverSettings: r } = this, { baseUrl: s, appUrl: o } = r, { makeRequest: a, ResponseError: l } = serverconnection_1$2.ServerConnection, f = s + o, p = Private$2.url(f, t), d = { body: JSON.stringify({ raw: n }), method: "PUT" }, _ = await a(p, d, r);
    if (_.status !== 204)
      throw new l(_);
  }
}
setting.SettingManager = SettingManager;
var Private$2;
(function(e) {
  function t(n, r, s) {
    const o = s ? coreutils_1$2.URLExt.objectToQueryString({ ids_only: !0 }) : "";
    return `${coreutils_1$2.URLExt.join(n, SERVICE_SETTINGS_URL, r)}${o}`;
  }
  e.url = t;
})(Private$2 || (Private$2 = {}));
var terminal$1 = {}, terminal = {}, restapi = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.shutdownTerminal = e.listRunning = e.startNew = e.isAvailable = e.TERMINAL_SERVICE_URL = void 0;
  const t = lib$1, n = serverconnection;
  e.TERMINAL_SERVICE_URL = "api/terminals";
  function r() {
    return String(t.PageConfig.getOption("terminalsAvailable")).toLowerCase() === "true";
  }
  e.isAvailable = r;
  async function s(f = n.ServerConnection.makeSettings(), p, d) {
    l.errorIfNotAvailable();
    const _ = t.URLExt.join(f.baseUrl, e.TERMINAL_SERVICE_URL), S = {
      method: "POST",
      body: JSON.stringify({ name: p, cwd: d })
    }, k = await n.ServerConnection.makeRequest(_, S, f);
    if (k.status !== 200)
      throw await n.ServerConnection.ResponseError.create(k);
    return await k.json();
  }
  e.startNew = s;
  async function o(f = n.ServerConnection.makeSettings()) {
    l.errorIfNotAvailable();
    const p = t.URLExt.join(f.baseUrl, e.TERMINAL_SERVICE_URL), d = await n.ServerConnection.makeRequest(p, {}, f);
    if (d.status !== 200)
      throw await n.ServerConnection.ResponseError.create(d);
    const _ = await d.json();
    if (!Array.isArray(_))
      throw new Error("Invalid terminal list");
    return _;
  }
  e.listRunning = o;
  async function a(f, p = n.ServerConnection.makeSettings()) {
    var d;
    l.errorIfNotAvailable();
    const _ = t.URLExt.join(p.baseUrl, e.TERMINAL_SERVICE_URL, f), S = { method: "DELETE" }, k = await n.ServerConnection.makeRequest(_, S, p);
    if (k.status === 404) {
      const rt = (d = (await k.json()).message) !== null && d !== void 0 ? d : `The terminal session "${f}"" does not exist on the server`;
      console.warn(rt);
    } else if (k.status !== 204)
      throw await n.ServerConnection.ResponseError.create(k);
  }
  e.shutdownTerminal = a;
  var l;
  (function(f) {
    function p() {
      if (!r())
        throw new Error("Terminals Unavailable");
    }
    f.errorIfNotAvailable = p;
  })(l || (l = {}));
})(restapi);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.isAvailable = void 0;
  const t = restapi;
  Object.defineProperty(e, "isAvailable", { enumerable: !0, get: function() {
    return t.isAvailable;
  } });
})(terminal);
var manager = {}, _default = {}, hasRequired_default;
function require_default() {
  if (hasRequired_default)
    return _default;
  hasRequired_default = 1, Object.defineProperty(_default, "__esModule", { value: !0 }), _default.TerminalConnection = void 0;
  const e = lib$1, t = distExports, n = require$$0, r = requireLib(), s = restapi;
  class o {
    /**
     * Construct a new terminal session.
     */
    constructor(f) {
      var p;
      this._createSocket = () => {
        this._errorIfDisposed(), this._clearSocket(), this._updateConnectionStatus("connecting");
        const d = this._name, _ = this.serverSettings;
        let S = e.URLExt.join(_.wsUrl, "terminals", "websocket", encodeURIComponent(d));
        const k = _.token;
        _.appendToken && k !== "" && (S = S + `?token=${encodeURIComponent(k)}`), this._ws = new _.WebSocket(S), this._ws.onmessage = this._onWSMessage, this._ws.onclose = this._onWSClose, this._ws.onerror = this._onWSClose;
      }, this._onWSMessage = (d) => {
        if (this._isDisposed)
          return;
        const _ = JSON.parse(d.data);
        if (_[0] === "disconnect" && this.dispose(), this._connectionStatus === "connecting") {
          _[0] === "setup" && this._updateConnectionStatus("connected");
          return;
        }
        this._messageReceived.emit({
          type: _[0],
          content: _.slice(1)
        });
      }, this._onWSClose = (d) => {
        console.warn(`Terminal websocket closed: ${d.code}`), this.isDisposed || this._reconnect();
      }, this._connectionStatus = "connecting", this._connectionStatusChanged = new n.Signal(this), this._isDisposed = !1, this._disposed = new n.Signal(this), this._messageReceived = new n.Signal(this), this._reconnectTimeout = null, this._ws = null, this._noOp = () => {
      }, this._reconnectLimit = 7, this._reconnectAttempt = 0, this._pendingMessages = [], this._name = f.model.name, this.serverSettings = (p = f.serverSettings) !== null && p !== void 0 ? p : r.ServerConnection.makeSettings(), this._createSocket();
    }
    /**
     * A signal emitted when the session is disposed.
     */
    get disposed() {
      return this._disposed;
    }
    /**
     * A signal emitted when a message is received from the server.
     */
    get messageReceived() {
      return this._messageReceived;
    }
    /**
     * Get the name of the terminal session.
     */
    get name() {
      return this._name;
    }
    /**
     * Get the model for the terminal session.
     */
    get model() {
      return { name: this._name };
    }
    /**
     * Test whether the session is disposed.
     */
    get isDisposed() {
      return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the session.
     */
    dispose() {
      this._isDisposed || (this._isDisposed = !0, this._disposed.emit(), this._updateConnectionStatus("disconnected"), this._clearSocket(), n.Signal.clearData(this));
    }
    /**
     * Send a message to the terminal session.
     *
     * #### Notes
     * If the connection is down, the message will be queued for sending when
     * the connection comes back up.
     */
    send(f) {
      this._sendMessage(f);
    }
    /**
     * Send a message on the websocket, or possibly queue for later sending.
     *
     * @param queue - whether to queue the message if it cannot be sent
     */
    _sendMessage(f, p = !0) {
      if (!(this._isDisposed || !f.content))
        if (this.connectionStatus === "connected" && this._ws) {
          const d = [f.type, ...f.content];
          this._ws.send(JSON.stringify(d));
        } else if (p)
          this._pendingMessages.push(f);
        else
          throw new Error(`Could not send message: ${JSON.stringify(f)}`);
    }
    /**
     * Send pending messages to the kernel.
     */
    _sendPending() {
      for (; this.connectionStatus === "connected" && this._pendingMessages.length > 0; )
        this._sendMessage(this._pendingMessages[0], !1), this._pendingMessages.shift();
    }
    /**
     * Reconnect to a terminal.
     *
     * #### Notes
     * This may try multiple times to reconnect to a terminal, and will sever
     * any existing connection.
     */
    reconnect() {
      this._errorIfDisposed();
      const f = new t.PromiseDelegate(), p = (d, _) => {
        _ === "connected" ? (f.resolve(), this.connectionStatusChanged.disconnect(p, this)) : _ === "disconnected" && (f.reject(new Error("Terminal connection disconnected")), this.connectionStatusChanged.disconnect(p, this));
      };
      return this.connectionStatusChanged.connect(p, this), this._reconnectAttempt = 0, this._reconnect(), f.promise;
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
      if (this._errorIfDisposed(), clearTimeout(this._reconnectTimeout), this._reconnectAttempt < this._reconnectLimit) {
        this._updateConnectionStatus("connecting");
        const f = a.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
        console.error(`Connection lost, reconnecting in ${Math.floor(f / 1e3)} seconds.`), this._reconnectTimeout = setTimeout(this._createSocket, f), this._reconnectAttempt += 1;
      } else
        this._updateConnectionStatus("disconnected");
      this._clearSocket();
    }
    /**
     * Forcefully clear the socket state.
     *
     * #### Notes
     * This will clear all socket state without calling any handlers and will
     * not update the connection status. If you call this method, you are
     * responsible for updating the connection status as needed and recreating
     * the socket if you plan to reconnect.
     */
    _clearSocket() {
      this._ws !== null && (this._ws.onopen = this._noOp, this._ws.onclose = this._noOp, this._ws.onerror = this._noOp, this._ws.onmessage = this._noOp, this._ws.close(), this._ws = null);
    }
    /**
     * Shut down the terminal session.
     */
    async shutdown() {
      await (0, s.shutdownTerminal)(this.name, this.serverSettings), this.dispose();
    }
    /**
     * Clone the current terminal connection.
     */
    clone() {
      return new o(this);
    }
    /**
     * Handle connection status changes.
     */
    _updateConnectionStatus(f) {
      this._connectionStatus !== f && (this._connectionStatus = f, f !== "connecting" && (this._reconnectAttempt = 0, clearTimeout(this._reconnectTimeout)), f === "connected" && this._sendPending(), this._connectionStatusChanged.emit(f));
    }
    /**
     * Utility function to throw an error if this instance is disposed.
     */
    _errorIfDisposed() {
      if (this.isDisposed)
        throw new Error("Terminal connection is disposed");
    }
    /**
     * A signal emitted when the terminal connection status changes.
     */
    get connectionStatusChanged() {
      return this._connectionStatusChanged;
    }
    /**
     * The current connection status of the terminal connection.
     */
    get connectionStatus() {
      return this._connectionStatus;
    }
  }
  _default.TerminalConnection = o;
  var a;
  return function(l) {
    function f(d, _) {
      return e.URLExt.join(d, s.TERMINAL_SERVICE_URL, encodeURIComponent(_));
    }
    l.getTermUrl = f;
    function p(d, _) {
      return d = Math.ceil(d), _ = Math.floor(_), Math.floor(Math.random() * (_ - d + 1)) + d;
    }
    l.getRandomIntInclusive = p;
  }(a || (a = {})), _default;
}
var hasRequiredManager$1;
function requireManager$1() {
  return hasRequiredManager$1 || (hasRequiredManager$1 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TerminalManager = void 0;
    const t = require$$2, n = require$$0, r = requireLib(), s = basemanager, o = restapi, a = require_default();
    class l extends s.BaseManager {
      /**
       * Construct a new terminal manager.
       */
      constructor(p = {}) {
        var d;
        if (super(p), this._isReady = !1, this._names = [], this._terminalConnections = /* @__PURE__ */ new Set(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), !this.isAvailable()) {
          this._ready = Promise.reject("Terminals unavailable"), this._ready.catch((_) => {
          });
          return;
        }
        this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:TerminalManager#models",
          standby: (d = p.standby) !== null && d !== void 0 ? d : "when-hidden"
        }), this._ready = (async () => {
          await this._pollModels.start(), await this._pollModels.tick, this._isReady = !0;
        })();
      }
      /**
       * Test whether the manager is ready.
       */
      get isReady() {
        return this._isReady;
      }
      /**
       * A promise that fulfills when the manager is ready.
       */
      get ready() {
        return this._ready;
      }
      /**
       * A signal emitted when the running terminals change.
       */
      get runningChanged() {
        return this._runningChanged;
      }
      /**
       * A signal emitted when there is a connection failure.
       */
      get connectionFailure() {
        return this._connectionFailure;
      }
      /**
       * Dispose of the resources used by the manager.
       */
      dispose() {
        this.isDisposed || (this._names.length = 0, this._terminalConnections.forEach((p) => p.dispose()), this._pollModels.dispose(), super.dispose());
      }
      /**
       * Whether the terminal service is available.
       */
      isAvailable() {
        return (0, o.isAvailable)();
      }
      /*
       * Connect to a running terminal.
       *
       * @param options - The options used to connect to the terminal.
       *
       * @returns The new terminal connection instance.
       *
       * #### Notes
       * The manager `serverSettings` will be used.
       */
      connectTo(p) {
        const d = new a.TerminalConnection({
          ...p,
          serverSettings: this.serverSettings
        });
        return this._onStarted(d), this._names.includes(p.model.name) || this.refreshRunning().catch(() => {
        }), d;
      }
      /**
       * Create an iterator over the most recent running terminals.
       *
       * @returns A new iterator over the running terminals.
       */
      running() {
        return this._models[Symbol.iterator]();
      }
      /**
       * Force a refresh of the running terminals.
       *
       * @returns A promise that with the list of running terminals.
       *
       * #### Notes
       * This is intended to be called only in response to a user action,
       * since the manager maintains its internal state.
       */
      async refreshRunning() {
        await this._pollModels.refresh(), await this._pollModels.tick;
      }
      /**
       * Create a new terminal session.
       *
       * @param options - The options used to create the terminal.
       *
       * @returns A promise that resolves with the terminal connection instance.
       *
       * #### Notes
       * The manager `serverSettings` will be used unless overridden in the
       * options.
       */
      async startNew(p) {
        const d = await (0, o.startNew)(this.serverSettings, p == null ? void 0 : p.name, p == null ? void 0 : p.cwd);
        return await this.refreshRunning(), this.connectTo({ model: d });
      }
      /**
       * Shut down a terminal session by name.
       */
      async shutdown(p) {
        await (0, o.shutdownTerminal)(p, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all terminal sessions.
       *
       * @returns A promise that resolves when all of the sessions are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all(this._names.map((p) => (0, o.shutdownTerminal)(p, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Execute a request to the server to poll running terminals and update state.
       */
      async requestRunning() {
        var p, d;
        let _;
        try {
          _ = await (0, o.listRunning)(this.serverSettings);
        } catch (k) {
          throw (k instanceof r.ServerConnection.NetworkError || ((p = k.response) === null || p === void 0 ? void 0 : p.status) === 503 || ((d = k.response) === null || d === void 0 ? void 0 : d.status) === 424) && this._connectionFailure.emit(k), k;
        }
        if (this.isDisposed)
          return;
        const S = _.map(({ name: k }) => k).sort();
        S !== this._names && (this._names = S, this._terminalConnections.forEach((k) => {
          S.includes(k.name) || k.dispose();
        }), this._runningChanged.emit(this._models));
      }
      /**
       * Handle a session starting.
       */
      _onStarted(p) {
        this._terminalConnections.add(p), p.disposed.connect(this._onDisposed, this);
      }
      /**
       * Handle a session terminating.
       */
      _onDisposed(p) {
        this._terminalConnections.delete(p), this.refreshRunning().catch(() => {
        });
      }
      get _models() {
        return this._names.map((p) => ({ name: p }));
      }
    }
    e.TerminalManager = l, function(f) {
      class p extends f {
        constructor() {
          super(...arguments), this._readyPromise = new Promise(() => {
          });
        }
        /**
         * Whether the manager is active.
         */
        get isActive() {
          return !1;
        }
        /**
         * Used for testing.
         */
        get parentReady() {
          return super.ready;
        }
        /**
         * A promise that fulfills when the manager is ready (never).
         */
        get ready() {
          return this.parentReady.then(() => this._readyPromise);
        }
        /**
         * Create a new terminal session - throw an error since it is not supported.
         *
         */
        async startNew(_) {
          return Promise.reject(new Error("Not implemented in no-op Terminal Manager"));
        }
        /*
         * Connect to a running terminal - throw an error since it is not supported.
         */
        connectTo(_) {
          throw Error("Not implemented in no-op Terminal Manager");
        }
        /**
         * Shut down a session by id - throw an error since it is not supported.
         */
        async shutdown(_) {
          return Promise.reject(new Error("Not implemented in no-op Terminal Manager"));
        }
        /**
         * Execute a request to the server to poll running sessions and update state.
         */
        async requestRunning() {
          return Promise.resolve();
        }
      }
      f.NoopManager = p;
    }(l = e.TerminalManager || (e.TerminalManager = {}));
  }(manager)), manager;
}
var hasRequiredTerminal;
function requireTerminal() {
  return hasRequiredTerminal || (hasRequiredTerminal = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(l, f, p, d) {
      d === void 0 && (d = p);
      var _ = Object.getOwnPropertyDescriptor(f, p);
      (!_ || ("get" in _ ? !f.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
        return f[p];
      } }), Object.defineProperty(l, d, _);
    } : function(l, f, p, d) {
      d === void 0 && (d = p), l[d] = f[p];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(l, f) {
      Object.defineProperty(l, "default", { enumerable: !0, value: f });
    } : function(l, f) {
      l.default = f;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(l) {
      if (l && l.__esModule)
        return l;
      var f = {};
      if (l != null)
        for (var p in l)
          p !== "default" && Object.prototype.hasOwnProperty.call(l, p) && t(f, l, p);
      return n(f, l), f;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(l, f) {
      for (var p in l)
        p !== "default" && !Object.prototype.hasOwnProperty.call(f, p) && t(f, l, p);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TerminalAPI = e.Terminal = void 0;
    const o = r(terminal);
    e.Terminal = o;
    const a = r(restapi);
    e.TerminalAPI = a, s(requireManager$1(), e);
  }(terminal$1)), terminal$1;
}
var user = {};
Object.defineProperty(user, "__esModule", { value: !0 });
user.UserManager = void 0;
const coreutils_1$1 = lib$1, coreutils_2 = distExports, polling_1 = require$$2, signaling_1 = require$$0, serverconnection_1$1 = serverconnection, basemanager_1 = basemanager, SERVICE_USER_URL = "api/me", SERVICE_ID = "@jupyterlab/services:UserManager#user";
class UserManager extends basemanager_1.BaseManager {
  /**
   * Create a new user manager.
   */
  constructor(t = {}) {
    var n;
    super(t), this._isReady = !1, this._userChanged = new signaling_1.Signal(this), this._connectionFailure = new signaling_1.Signal(this), this._ready = this.requestUser().then(() => {
      this.isDisposed || (this._isReady = !0);
    }).catch((r) => (
      // Return a promise that will never resolve, so user service is never ready
      // This typically occurs when the backend has no user service
      new Promise(() => {
      })
    )), this._pollSpecs = new polling_1.Poll({
      auto: !1,
      factory: () => this.requestUser(),
      frequency: {
        interval: 61 * 1e3,
        backoff: !0,
        max: 300 * 1e3
      },
      name: SERVICE_ID,
      standby: (n = t.standby) !== null && n !== void 0 ? n : "when-hidden"
    }), this.ready.then(() => {
      this._pollSpecs.start();
    });
  }
  /**
   * Test whether the manager is ready.
   */
  get isReady() {
    return this._isReady;
  }
  /**
   * A promise that fulfills when the manager is ready.
   */
  get ready() {
    return this._ready;
  }
  /**
   * Get the most recently fetched identity.
   */
  get identity() {
    return this._identity;
  }
  /**
   * Get the most recently fetched permissions.
   */
  get permissions() {
    return this._permissions;
  }
  /**
   * A signal emitted when the user changes.
   */
  get userChanged() {
    return this._userChanged;
  }
  /**
   * A signal emitted when there is a connection failure.
   */
  get connectionFailure() {
    return this._connectionFailure;
  }
  /**
   * Dispose of the resources used by the manager.
   */
  dispose() {
    this._pollSpecs.dispose(), super.dispose();
  }
  /**
   * Force a refresh of the specs from the server.
   *
   * @returns A promise that resolves when the specs are fetched.
   *
   * #### Notes
   * This is intended to be called only in response to a user action,
   * since the manager maintains its internal state.
   */
  async refreshUser() {
    await this._pollSpecs.refresh(), await this._pollSpecs.tick;
  }
  /**
   * Execute a request to the server to poll the user and update state.
   */
  async requestUser() {
    if (this.isDisposed)
      return;
    const { baseUrl: t } = this.serverSettings, { makeRequest: n, ResponseError: r } = serverconnection_1$1.ServerConnection, s = coreutils_1$1.URLExt.join(t, SERVICE_USER_URL), o = await n(s, {}, this.serverSettings);
    if (o.status !== 200)
      throw await r.create(o);
    const a = {
      identity: this._identity,
      permissions: this._permissions
    }, l = await o.json(), f = l.identity, { localStorage: p } = window, d = p.getItem(SERVICE_ID);
    if (d && (!f.initials || !f.color)) {
      const _ = JSON.parse(d);
      f.initials = f.initials || _.initials || f.name.substring(0, 1), f.color = f.color || _.color || Private$1.getRandomColor();
    }
    coreutils_2.JSONExt.deepEqual(l, a) || (this._identity = f, this._permissions = l.permissions, p.setItem(SERVICE_ID, JSON.stringify(f)), this._userChanged.emit(l));
  }
}
user.UserManager = UserManager;
var Private$1;
(function(e) {
  const t = [
    "var(--jp-collaborator-color1)",
    "var(--jp-collaborator-color2)",
    "var(--jp-collaborator-color3)",
    "var(--jp-collaborator-color4)",
    "var(--jp-collaborator-color5)",
    "var(--jp-collaborator-color6)",
    "var(--jp-collaborator-color7)"
  ];
  e.getRandomColor = () => t[Math.floor(Math.random() * t.length)];
})(Private$1 || (Private$1 = {}));
var workspace = {};
Object.defineProperty(workspace, "__esModule", { value: !0 });
workspace.WorkspaceManager = void 0;
const coreutils_1 = lib$1, statedb_1 = lib, serverconnection_1 = serverconnection, SERVICE_WORKSPACES_URL = "api/workspaces";
class WorkspaceManager extends statedb_1.DataConnector {
  /**
   * Create a new workspace manager.
   */
  constructor(t = {}) {
    var n;
    super(), this.serverSettings = (n = t.serverSettings) !== null && n !== void 0 ? n : serverconnection_1.ServerConnection.makeSettings();
  }
  /**
   * Fetch a workspace.
   *
   * @param id - The workspace's ID.
   *
   * @returns A promise that resolves if successful.
   */
  async fetch(t) {
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1.ServerConnection, l = r + s, f = Private.url(l, t), p = await o(f, {}, n);
    if (p.status !== 200)
      throw await a.create(p);
    return p.json();
  }
  /**
   * Fetch the list of workspace IDs that exist on the server.
   *
   * @returns A promise that resolves if successful.
   */
  async list() {
    const { serverSettings: t } = this, { baseUrl: n, appUrl: r } = t, { makeRequest: s, ResponseError: o } = serverconnection_1.ServerConnection, a = n + r, l = Private.url(a, ""), f = await s(l, {}, t);
    if (f.status !== 200)
      throw await o.create(f);
    return (await f.json()).workspaces;
  }
  /**
   * Remove a workspace from the server.
   *
   * @param id - The workspaces's ID.
   *
   * @returns A promise that resolves if successful.
   */
  async remove(t) {
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1.ServerConnection, l = r + s, f = Private.url(l, t), d = await o(f, { method: "DELETE" }, n);
    if (d.status !== 204)
      throw await a.create(d);
  }
  /**
   * Save a workspace.
   *
   * @param id - The workspace's ID.
   *
   * @param workspace - The workspace being saved.
   *
   * @returns A promise that resolves if successful.
   */
  async save(t, n) {
    const { serverSettings: r } = this, { baseUrl: s, appUrl: o } = r, { makeRequest: a, ResponseError: l } = serverconnection_1.ServerConnection, f = s + o, p = Private.url(f, t), d = { body: JSON.stringify(n), method: "PUT" }, _ = await a(p, d, r);
    if (_.status !== 204)
      throw await l.create(_);
  }
}
workspace.WorkspaceManager = WorkspaceManager;
var Private;
(function(e) {
  function t(n, r) {
    return coreutils_1.URLExt.join(n, SERVICE_WORKSPACES_URL, r);
  }
  e.url = t;
})(Private || (Private = {}));
var hasRequiredManager;
function requireManager() {
  if (hasRequiredManager)
    return manager$2;
  hasRequiredManager = 1, Object.defineProperty(manager$2, "__esModule", { value: !0 }), manager$2.ServiceManager = void 0;
  const e = require$$0, t = builder, n = requireContents(), r = event, s = requireKernel(), o = kernelspec$1, a = nbconvert, l = serverconnection, f = requireSession(), p = setting, d = requireTerminal(), _ = user, S = workspace;
  class k {
    /**
     * Construct a new services provider.
     */
    constructor(rt = {}) {
      var st, ft;
      this._isDisposed = !1, this._connectionFailure = new e.Signal(this), this._isReady = !1;
      const ut = rt.defaultDrive, dt = (st = rt.serverSettings) !== null && st !== void 0 ? st : l.ServerConnection.makeSettings(), T = (ft = rt.standby) !== null && ft !== void 0 ? ft : "when-hidden", nt = { defaultDrive: ut, serverSettings: dt, standby: T };
      this.serverSettings = dt, this.contents = rt.contents || new n.ContentsManager(nt), this.events = rt.events || new r.EventManager(nt), this.kernels = rt.kernels || new s.KernelManager(nt), this.sessions = rt.sessions || new f.SessionManager({
        ...nt,
        kernelManager: this.kernels
      }), this.settings = rt.settings || new p.SettingManager(nt), this.terminals = rt.terminals || new d.TerminalManager(nt), this.builder = rt.builder || new t.BuildManager(nt), this.workspaces = rt.workspaces || new S.WorkspaceManager(nt), this.nbconvert = rt.nbconvert || new a.NbConvertManager(nt), this.kernelspecs = rt.kernelspecs || new o.KernelSpecManager(nt), this.user = rt.user || new _.UserManager(nt), this.kernelspecs.connectionFailure.connect(this._onConnectionFailure, this), this.sessions.connectionFailure.connect(this._onConnectionFailure, this), this.terminals.connectionFailure.connect(this._onConnectionFailure, this);
      const nn = [this.sessions.ready, this.kernelspecs.ready];
      this.terminals.isAvailable() && nn.push(this.terminals.ready), this._readyPromise = Promise.all(nn).then(() => {
        this._isReady = !0;
      });
    }
    /**
     * A signal emitted when there is a connection failure with the kernel.
     */
    get connectionFailure() {
      return this._connectionFailure;
    }
    /**
     * Test whether the service manager is disposed.
     */
    get isDisposed() {
      return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the manager.
     */
    dispose() {
      this.isDisposed || (this._isDisposed = !0, e.Signal.clearData(this), this.contents.dispose(), this.events.dispose(), this.sessions.dispose(), this.terminals.dispose());
    }
    /**
     * Test whether the manager is ready.
     */
    get isReady() {
      return this._isReady;
    }
    /**
     * A promise that fulfills when the manager is ready.
     */
    get ready() {
      return this._readyPromise;
    }
    _onConnectionFailure(rt, st) {
      this._connectionFailure.emit(st);
    }
  }
  return manager$2.ServiceManager = k, manager$2;
}
var hasRequiredLib;
function requireLib() {
  return hasRequiredLib || (hasRequiredLib = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
      a === void 0 && (a = o);
      var l = Object.getOwnPropertyDescriptor(s, o);
      (!l || ("get" in l ? !s.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
        return s[o];
      } }), Object.defineProperty(r, a, l);
    } : function(r, s, o, a) {
      a === void 0 && (a = o), r[a] = s[o];
    }), n = commonjsGlobal && commonjsGlobal.__exportStar || function(r, s) {
      for (var o in r)
        o !== "default" && !Object.prototype.hasOwnProperty.call(s, o) && t(s, r, o);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), n(basemanager, e), n(requireConfig(), e), n(requireContents(), e), n(event, e), n(requireKernel(), e), n(kernelspec$1, e), n(requireManager(), e), n(serverconnection, e), n(requireSession(), e), n(setting, e), n(requireTerminal(), e), n(user, e), n(workspace, e), n(nbconvert, e);
  }(lib$2)), lib$2;
}
var libExports = requireLib();
const DEFAULT_SETTINGS = {
  baseUrl: "http://localhost:8888/",
  appUrl: "/lab",
  wsUrl: "",
  token: ""
};
function getWsUrl(e) {
  return e = e || DEFAULT_SETTINGS.baseUrl, `ws${e.slice(4)}`;
}
function makeSettings(e) {
  const t = e.baseUrl || DEFAULT_SETTINGS.baseUrl, n = e.appUrl || DEFAULT_SETTINGS.appUrl, r = e.wsUrl || getWsUrl(t);
  return {
    baseUrl: t,
    appUrl: n,
    wsUrl: r,
    token: e.token,
    appendToken: !0,
    init: {
      cache: "no-store",
      credentials: "include"
    },
    fetch,
    Request,
    Headers,
    WebSocket
  };
}
class Jupyter extends libExports.ServiceManager {
  constructor(n, r, s, o, a) {
    super({
      serverSettings: makeSettings(n)
    });
    gn(this, "errorEventListener", (...n) => {
      this.logger.warn(...n);
    });
    this.logger = r, this.kernelSpecsChangedEventListener = s, this.kernelsChangedEventListener = o, this.sessionsChangedEventListener = a, this.onload();
  }
  onload() {
    this.connectionFailure.connect(this.errorEventListener), this.kernelspecs.specsChanged.connect(this.kernelSpecsChangedEventListener), this.kernelspecs.connectionFailure.connect(this.errorEventListener), this.kernels.runningChanged.connect(this.kernelsChangedEventListener), this.kernels.connectionFailure.connect(this.errorEventListener), this.sessions.runningChanged.connect(this.sessionsChangedEventListener), this.sessions.connectionFailure.connect(this.errorEventListener);
  }
  unload() {
    this.connectionFailure.disconnect(this.errorEventListener), this.kernelspecs.specsChanged.disconnect(this.kernelSpecsChangedEventListener), this.kernelspecs.connectionFailure.disconnect(this.errorEventListener), this.kernels.runningChanged.disconnect(this.kernelsChangedEventListener), this.kernels.connectionFailure.disconnect(this.errorEventListener), this.sessions.runningChanged.disconnect(this.sessionsChangedEventListener), this.sessions.connectionFailure.disconnect(this.errorEventListener);
  }
  /* 刷新状态 */
  async refresh() {
    await Promise.allSettled([
      this.kernelspecs.refreshSpecs(),
      this.kernels.refreshRunning(),
      this.sessions.refreshRunning()
    ]);
  }
  /* 资源销毁 */
  dispose() {
    this.unload(), [
      this.kernels,
      this.kernelspecs,
      this.user
      // this.contents,
      // this.events,
      // this.sessions,
      // this.terminals,
    ].forEach((n) => {
      try {
        n.dispose();
      } catch (r) {
        this.logger.warn(r);
      }
    });
    try {
      super.dispose();
    } catch (n) {
      this.logger.warn(n);
    }
  }
}
const config = DEFAULT_CONFIG, logger = new Logger(`${self.name}-worker:${CONSTANTS.JUPYTER_WORKER_FILE_NAME}`), client = new Oe(
  {
    baseURL: trimSuffix(self.location.pathname, `plugins/${self.name}/workers/${CONSTANTS.JUPYTER_WORKER_FILE_NAME}.js`)
  },
  "fetch"
), id_2_session_connection = /* @__PURE__ */ new Map();
var jupyter, i18n;
const set_block_attrs_queue = new AsyncLockQueue(
  async (e) => client.setBlockAttrs(e),
  (...e) => logger.warns(...e)
);
async function kernelStatusChanged(e, t, n) {
  set_block_attrs_queue.enqueue({
    id: e,
    attrs: {
      [CONSTANTS.attrs.kernel.status]: n
    }
  });
}
async function kernelConnectionStatusChanged(e, t, n) {
  await client.setBlockAttrs({
    id: e,
    attrs: {
      [CONSTANTS.attrs.kernel.connection_status]: n
    }
  });
}
function bindSessionConnectionSignalListener(e, t) {
  t.statusChanged.connect((...n) => kernelStatusChanged(e, ...n)), t.connectionStatusChanged.connect((...n) => kernelConnectionStatusChanged(e, ...n));
}
function initContext(e) {
  e.code.attrs.id = e.code.id, e.output.attrs.id = e.output.id, e.code.attrs[CONSTANTS.attrs.code.type.key] = CONSTANTS.attrs.code.type.value, e.output.attrs[CONSTANTS.attrs.output.type.key] = CONSTANTS.attrs.output.type.value, e.code.attrs[CONSTANTS.attrs.code.output] = e.output.id, e.output.attrs[CONSTANTS.attrs.output.code] = e.code.id, e.output.kramdown = [
    "{{{row",
    "---",
    createIAL({ id: e.output.hrs.head.id }),
    "---",
    createIAL({ id: e.output.hrs.stream.id }),
    "---",
    createIAL({ id: e.output.hrs.error.id }),
    "---",
    createIAL({ id: e.output.hrs.display_data.id }),
    "---",
    createIAL({ id: e.output.hrs.execute_result.id }),
    "---",
    createIAL({ id: e.output.hrs.execute_reply.id }),
    "---",
    createIAL({ id: e.output.hrs.tail.id }),
    "}}}",
    createIAL(e.output.attrs)
  ].join(`
`);
}
async function initOutputBlock(e) {
  e.output.new ? (await client.insertBlock({
    previousID: e.code.id,
    data: e.output.kramdown,
    dataType: "markdown"
  }), e.output.new = !1) : await client.updateBlock({
    id: e.output.id,
    data: e.output.kramdown,
    dataType: "markdown"
  });
}
async function updateBlockAttrs(e) {
  set_block_attrs_queue.enqueue({
    id: e.code.id,
    attrs: e.code.attrs
  }), set_block_attrs_queue.enqueue({
    id: e.output.id,
    attrs: e.output.attrs
  });
}
async function executeCode(e, t, n, r, s, o, ...a) {
  if (r.kernel) {
    const l = {
      client: {
        id: e,
        goto: o
      },
      code: {
        id: n,
        attrs: {}
      },
      output: {
        new: !0,
        id: id(),
        attrs: {},
        stream: {
          attrs: {
            id: id()
          },
          content: "",
          initialized: !1
        },
        options: s,
        display: /* @__PURE__ */ new Map(),
        kramdown: "",
        hrs: {
          head: {
            id: id(),
            used: !0
          },
          stream: {
            id: id(),
            used: !1
          },
          error: {
            id: id(),
            used: !1
          },
          display_data: {
            id: id(),
            used: !1
          },
          execute_result: {
            id: id(),
            used: !1
          },
          execute_reply: {
            id: id(),
            used: !1
          },
          tail: {
            id: id(),
            used: !0
          }
        }
      }
    }, f = await client.getBlockAttrs({ id: l.code.id });
    if (l.code.attrs = f.data, CONSTANTS.attrs.code.output in l.code.attrs)
      try {
        const d = l.code.attrs[CONSTANTS.attrs.code.output], _ = await client.getBlockAttrs({ id: d });
        l.output.id = d, l.output.new = !1, l.output.attrs = _.data;
      } catch {
      }
    initContext(l), await initOutputBlock(l);
    const p = r.kernel.requestExecute(
      {
        ...config.jupyter.execute.content,
        ...a[0],
        code: t
      },
      a[1],
      a[2]
    );
    p.onIOPub = async (d) => {
      switch (d.header.msg_type) {
        case "status": {
          await handleStatusMessage(
            d,
            l
          );
          break;
        }
        case "stream": {
          await handleStreamMessage(
            d,
            l
          );
          break;
        }
        case "error": {
          await handleErrorMessage(
            d,
            l
          );
          break;
        }
        case "execute_input": {
          await handleExecuteInputMessage(
            d,
            l
          );
          break;
        }
        case "display_data": {
          await handleDisplayDataMessage(
            d,
            l
          );
          break;
        }
        case "update_display_data": {
          await handleUpdateDisplayDataMessage(
            d,
            l
          );
          break;
        }
        case "execute_result": {
          await handleExecuteResultMessage(
            d,
            l
          );
          break;
        }
        case "clear_output": {
          await initOutputBlock(l);
          break;
        }
      }
    }, p.onStdin = (d) => handleStdinMessage(d, l, p), p.onReply = (d) => handleExecuteReplyMessage(d, l);
  }
}
async function handleStatusMessage(e, t) {
  switch (e.content.execution_state) {
    case "busy": {
      t.code.attrs[CONSTANTS.attrs.code.index] = "*", t.output.attrs[CONSTANTS.attrs.output.index] = "*", t.code.attrs[CONSTANTS.attrs.code.busy] = e.header.date;
      break;
    }
    case "idle": {
      t.code.attrs[CONSTANTS.attrs.code.idle] = e.header.date;
      break;
    }
  }
  await updateBlockAttrs(t);
}
async function handleStreamMessage(e, t) {
  switch (e.content.name) {
    default:
    case "stdout":
      break;
    case "stderr":
      t.output.stream.attrs.style = CONSTANTS.styles.warning, t.output.stream.initialized && set_block_attrs_queue.enqueue({
        id: t.output.stream.attrs.id,
        attrs: t.output.stream.attrs
      });
  }
  const n = new Output(e.content.text).parseControlChars(t.output.stream.content).toString();
  t.output.stream.content = n;
  const r = parseText(
    t.output.stream.content,
    t.output.options,
    t.output.stream.attrs.id
  ), s = t.output.options.xterm ? [
    r
  ] : [
    "{{{row",
    r,
    "}}}"
  ];
  if (t.output.stream.initialized)
    await client.updateBlock({
      id: t.output.stream.attrs.id,
      data: s.join(`
`),
      dataType: "markdown"
    });
  else {
    const o = createIAL(t.output.stream.attrs);
    s.push(o), t.output.stream.initialized = !0, t.output.hrs.stream.used = !0, await client.insertBlock({
      nextID: t.output.hrs.stream.id,
      data: s.join(`
`),
      dataType: "markdown"
    });
  }
}
async function handleErrorMessage(e, t) {
  const n = id(), r = parseText(
    e.content.traceback.join(`
`),
    t.output.options,
    n
  ), s = createIAL({
    id: n,
    tyle: CONSTANTS.styles.error
  }), o = t.output.options.xterm ? [
    r,
    s
  ].join(`
`) : [
    "{{{row",
    r,
    "}}}",
    s
  ].join(`
`);
  t.output.hrs.error.used = !0, await client.insertBlock({
    nextID: t.output.hrs.error.id,
    data: o,
    dataType: "markdown"
  });
}
async function handleExecuteInputMessage(e, t) {
  const n = hooks(e.header.date);
  t.code.attrs[CONSTANTS.attrs.code.execute_input] = e.header.date, t.code.attrs[CONSTANTS.attrs.code.time] = `${i18n.messages.lastRunTime.text}: ${n.format(CONSTANTS.JUPYTER_LAST_RUN_TIME_FORMAT)}`, t.client.goto && await bridge.call(
    "gotoBlock",
    t.code.id,
    t.client.id
  ), await updateBlockAttrs(t);
}
async function handleDisplayDataMessage(e, t) {
  var s;
  const n = id(), r = [
    "{{{row",
    await parseData(
      client,
      t.output.options,
      e.content.data,
      e.content.metadata
    ),
    "}}}",
    createIAL({ id: n })
  ].join(`
`);
  if ((s = e.content.transient) != null && s.display_id) {
    const o = t.output.display.get(e.content.transient.display_id) ?? /* @__PURE__ */ new Set();
    o.add(n), t.output.display.set(e.content.transient.display_id, o);
  }
  t.output.hrs.display_data.used = !0, await client.insertBlock({
    nextID: t.output.hrs.display_data.id,
    data: r,
    dataType: "markdown"
  });
}
async function handleUpdateDisplayDataMessage(e, t) {
  const n = t.output.display.get(e.content.transient.display_id);
  if (n && n.size > 0) {
    const r = [
      "{{{row",
      await parseData(
        client,
        t.output.options,
        e.content.data,
        e.content.metadata
      ),
      "}}}"
    ].join(`
`);
    t.output.hrs.display_data.used = !0;
    for (const s of n.values())
      await client.updateBlock({
        id: s,
        data: r,
        dataType: "markdown"
      });
  } else
    await handleDisplayDataMessage(e, t);
}
async function handleExecuteResultMessage(e, t) {
  const n = await parseData(
    client,
    t.output.options,
    e.content.data,
    e.content.metadata
  );
  t.output.hrs.execute_result.used = !0, await client.insertBlock({
    nextID: t.output.hrs.execute_result.id,
    data: n,
    dataType: "markdown"
  });
}
async function handleStdinMessage(e, t, n) {
  switch (e.header.msg_type) {
    case "input_request": {
      const r = e.content, s = await bridge.singleCall(
        "inputRequest",
        t.client.id,
        t.code.id,
        t.client.id,
        r.prompt ?? ""
      ) ?? "", o = `\`${r.password ? "*".repeat(s.length) : s}\``, a = r.prompt ? `\`${r.prompt}\`: ${o}` : o;
      t.output.hrs.stream.used = !0, await client.insertBlock({
        nextID: t.output.hrs.stream.id,
        data: a,
        dataType: "markdown"
      }), n.sendInputReply(
        {
          value: s,
          status: "ok"
        },
        e.header
      );
      break;
    }
  }
}
async function handleExecuteReplyMessage(e, t) {
  t.code.attrs[CONSTANTS.attrs.code.execute_reply] = e.header.date;
  const n = hooks(e.metadata.started || e.parent_header.date), r = hooks(e.header.date), s = hooks.unix(r.diff(n) / 1e3).utc();
  t.code.attrs[CONSTANTS.attrs.code.time] = `${i18n.messages.lastRunTime.text}: ${n.format(CONSTANTS.JUPYTER_LAST_RUN_TIME_FORMAT)} | ${i18n.messages.runtime.text}: ${s.format(CONSTANTS.JUPYTER_RUNTIME_FORMAT)} `;
  const o = e.content.execution_count ? e.content.execution_count.toString() : null;
  switch (e.content.status) {
    case "ok": {
      t.code.attrs[CONSTANTS.attrs.code.index] = o, t.output.attrs[CONSTANTS.attrs.output.index] = o;
      const f = e.content.payload;
      if (f && Array.isArray(f) && f.length > 0) {
        const p = [];
        for (const d of f)
          if (d != null && d.data) {
            const _ = await parseData(
              client,
              t.output.options,
              d.data,
              d.metadata
            );
            p.push(_);
          }
        t.output.hrs.execute_result.used = !0, await client.insertBlock({
          nextID: t.output.hrs.execute_result.id,
          data: [
            "{{{row",
            p.join(`

`),
            "}}}"
          ].join(`
`),
          dataType: "markdown"
        });
      }
      break;
    }
    case "error": {
      const f = [
        "```plaintext",
        new Output(e.content.traceback.join(`
`)).stripAnsi().toString(),
        "```",
        createIAL({ style: CONSTANTS.styles.error })
      ].join(`
`);
      t.output.hrs.execute_reply.used = !0, await client.insertBlock({
        nextID: t.output.hrs.execute_reply.id,
        data: f,
        dataType: "markdown"
      }), t.code.attrs[CONSTANTS.attrs.code.index] = o, t.output.attrs[CONSTANTS.attrs.output.index] = "E";
      break;
    }
    case "abort":
    case "aborted": {
      t.code.attrs[CONSTANTS.attrs.code.index] = " ", t.output.attrs[CONSTANTS.attrs.output.index] = " ";
      break;
    }
  }
  await updateBlockAttrs(t);
  const a = t.output.hrs, l = [];
  a.stream.used && (a.error.used || a.display_data.used || a.execute_result.used || a.execute_reply.used) || l.push(a.stream.id), a.error.used && (a.display_data.used || a.execute_result.used || a.execute_reply.used) || l.push(a.error.id), a.display_data.used && (a.execute_result.used || a.execute_reply.used) || l.push(a.display_data.id), a.execute_result.used && a.execute_reply.used || l.push(a.execute_result.id), l.push(a.execute_reply.id);
  for (const f of l)
    await client.deleteBlock({ id: f });
}
async function onload(e) {
  i18n = e;
}
async function unload() {
  jupyter == null || jupyter.dispose(), jupyter = void 0, self.jupyter = jupyter;
}
function restart() {
  jupyter == null || jupyter.dispose(), jupyter = config.jupyter.server.enable ? new Jupyter(
    config.jupyter.server.settings,
    logger,
    (e, t) => {
      bridge.call(
        "updateKernelSpecs",
        t
      );
    },
    (e, t) => {
      bridge.call(
        "updateKernels",
        t
      );
    },
    (e, t) => {
      bridge.call(
        "updateSessions",
        t
      );
    }
  ) : void 0, self.jupyter = jupyter;
}
function updateConfig(e) {
  Object.assign(config, e);
}
async function importIpynb(e, t, n) {
  const r = new IpynbImport(
    client,
    config
  );
  await r.loadFile(t), await r.parse();
  const s = r.kramdown, o = r.attrs;
  switch (await client.setBlockAttrs({
    id: e,
    attrs: o
  }), n) {
    case "override":
      await client.updateBlock({
        id: e,
        data: s,
        dataType: "markdown"
      });
      break;
    case "append":
      await client.appendBlock({
        parentID: e,
        data: s,
        dataType: "markdown"
      });
      break;
  }
}
function _undefined(...e) {
}
const handlers = {
  onload: {
    this: self,
    func: onload
  },
  unload: {
    this: self,
    func: unload
  },
  restart: {
    this: self,
    func: restart
  },
  updateConfig: {
    this: self,
    func: updateConfig
  },
  "jupyter.refresh": {
    // 刷新资源
    get this() {
      return jupyter;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.refresh) ?? _undefined;
    }
  },
  "jupyter.kernelspecs.specs": {
    // 获取内核清单
    this: self,
    func: () => jupyter == null ? void 0 : jupyter.kernelspecs.specs
  },
  "jupyter.kernelspecs.refreshSpecs": {
    // 刷新内核清单
    get this() {
      return jupyter == null ? void 0 : jupyter.kernelspecs;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.kernelspecs.refreshSpecs) ?? _undefined;
    }
  },
  "jupyter.kernels.running": {
    // 获取正在运行的内核
    this: self,
    func() {
      return jupyter != null && jupyter.kernels.running ? Array.from(jupyter.kernels.running()) : [];
    }
  },
  "jupyter.kernels.refreshRunning": {
    // 刷新正在运行的内核
    get this() {
      return jupyter == null ? void 0 : jupyter.kernels;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.kernels.refreshRunning) ?? _undefined;
    }
  },
  "jupyter.kernels.shutdown": {
    // 关闭指定内核
    get this() {
      return jupyter == null ? void 0 : jupyter.kernels;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.kernels.shutdown) ?? _undefined;
    }
  },
  "jupyter.kernels.shutdownAll": {
    // 关闭所有内核
    get this() {
      return jupyter == null ? void 0 : jupyter.kernels;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.kernels.shutdownAll) ?? _undefined;
    }
  },
  "jupyter.sessions.running": {
    // 获取正在运行的会话
    this: self,
    func() {
      return jupyter != null && jupyter.sessions.running ? Array.from(jupyter.sessions.running()) : [];
    }
  },
  "jupyter.sessions.refreshRunning": {
    // 刷新正在运行的会话
    get this() {
      return jupyter == null ? void 0 : jupyter.sessions;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.sessions.refreshRunning) ?? _undefined;
    }
  },
  "jupyter.sessions.startNew": {
    // 创建新会话并连接
    this: self,
    async func(e, ...t) {
      const n = await (jupyter == null ? void 0 : jupyter.sessions.startNew(...t));
      if (n)
        return id_2_session_connection.set(n.id, n), bindSessionConnectionSignalListener(e, n), n.model;
    }
  },
  "jupyter.sessions.connectTo": {
    // 连接到正在运行的会话
    this: self,
    async func(e, ...t) {
      const n = await (jupyter == null ? void 0 : jupyter.sessions.connectTo(...t));
      if (n)
        return id_2_session_connection.set(n.id, n), bindSessionConnectionSignalListener(e, n), n.model;
    }
  },
  "jupyter.sessions.shutdown": {
    // 关闭指定会话
    get this() {
      return jupyter == null ? void 0 : jupyter.sessions;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.sessions.shutdown) ?? _undefined;
    }
  },
  "jupyter.sessions.shutdownAll": {
    // 关闭所有会话
    get this() {
      return jupyter == null ? void 0 : jupyter.sessions;
    },
    get func() {
      return (jupyter == null ? void 0 : jupyter.sessions.shutdownAll) ?? _undefined;
    }
  },
  "jupyter.session.connection.setName": {
    // 设置会话名称
    this: self,
    async func(e, t) {
      const n = id_2_session_connection.get(e);
      return n && await n.setName(t), n == null ? void 0 : n.model;
    }
  },
  "jupyter.session.connection.setPath": {
    // 设置会话路径
    this: self,
    async func(e, t) {
      const n = id_2_session_connection.get(e);
      return n && await n.setPath(t), n == null ? void 0 : n.model;
    }
  },
  "jupyter.session.connection.setType": {
    // 设置会话类型
    this: self,
    async func(e, t) {
      const n = id_2_session_connection.get(e);
      return n && await n.setType(t), n == null ? void 0 : n.model;
    }
  },
  "jupyter.session.connection.changeKernel": {
    // 更改会话内核
    this: self,
    async func(e, t) {
      const n = id_2_session_connection.get(e);
      return n && await n.changeKernel(t), n == null ? void 0 : n.model;
    }
  },
  "jupyter.session.kernel.connection.reconnect": {
    // 重建与内核的连接
    this: self,
    async func(e) {
      var n;
      const t = id_2_session_connection.get(e);
      return t && await ((n = t.kernel) == null ? void 0 : n.reconnect()), t == null ? void 0 : t.model;
    }
  },
  "jupyter.session.kernel.connection.interrupt": {
    // 中止内核运行
    this: self,
    async func(e) {
      var n;
      const t = id_2_session_connection.get(e);
      return t && await ((n = t.kernel) == null ? void 0 : n.interrupt()), t == null ? void 0 : t.model;
    }
  },
  "jupyter.session.kernel.connection.restart": {
    // 重启内核
    this: self,
    async func(e) {
      var n;
      const t = id_2_session_connection.get(e);
      return t && await ((n = t.kernel) == null ? void 0 : n.restart()), t == null ? void 0 : t.model;
    }
  },
  "jupyter.session.kernel.connection.shutdown": {
    // 关闭内核
    this: self,
    async func(e) {
      var n;
      const t = id_2_session_connection.get(e);
      return t && await ((n = t.kernel) == null ? void 0 : n.shutdown()), t == null ? void 0 : t.model;
    }
  },
  "jupyter.session.kernel.connection.requestExecute": {
    // 运行代码
    this: self,
    async func(e, t, n, r, s, o, ...a) {
      const l = id_2_session_connection.get(r);
      return l && await executeCode(
        e,
        t,
        n,
        l,
        s,
        o,
        ...a
      ), l == null ? void 0 : l.model;
    }
  },
  importIpynb: {
    this: self,
    func: importIpynb
  }
}, channel = new BroadcastChannel(CONSTANTS.JUPYTER_WORKER_BROADCAST_CHANNEL_NAME), bridge = new WorkerBridgeSlave(
  channel,
  logger,
  handlers
);
export {
  importIpynb,
  onload,
  restart,
  unload,
  updateConfig
};

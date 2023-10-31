var Jn = Object.defineProperty;
var Zn = (e, t, n) => t in e ? Jn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var hn = (e, t, n) => (Zn(e, typeof t != "symbol" ? t + "" : t, n), n);
var Ot = Object.defineProperty, Rt = (e, t, n) => t in e ? Ot(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, S = (e, t, n) => (Rt(e, typeof t != "symbol" ? t + "" : t, n), n);
const Ct = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Tt = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Dt = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Nt(e, t) {
  if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
    _t(e);
    return;
  }
  return t;
}
function _t(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function Bt(e, t = {}) {
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
  if (!Dt.test(e)) {
    if (t.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (Ct.test(e) || Tt.test(e)) {
      if (t.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, Nt);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict)
      throw r;
    return e;
  }
}
const Ft = /#/g, vt = /&/g, xt = /=/g, he = /\+/g, qt = /%5e/gi, It = /%60/gi, Lt = /%7c/gi, Ut = /%20/gi;
function Mt(e) {
  return encodeURI("" + e).replace(Lt, "|");
}
function ne(e) {
  return Mt(typeof e == "string" ? e : JSON.stringify(e)).replace(he, "%2B").replace(Ut, "+").replace(Ft, "%23").replace(vt, "%26").replace(It, "`").replace(qt, "^");
}
function Y(e) {
  return ne(e).replace(xt, "%3D");
}
function Me(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function jt(e) {
  return Me(e.replace(he, " "));
}
function Ht(e) {
  return Me(e.replace(he, " "));
}
function zt(e = "") {
  const t = {};
  e[0] === "?" && (e = e.slice(1));
  for (const n of e.split("&")) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2)
      continue;
    const s = jt(r[1]);
    if (s === "__proto__" || s === "constructor")
      continue;
    const o = Ht(r[2] || "");
    t[s] === void 0 ? t[s] = o : Array.isArray(t[s]) ? t[s].push(o) : t[s] = [t[s], o];
  }
  return t;
}
function $t(e, t) {
  return (typeof t == "number" || typeof t == "boolean") && (t = String(t)), t ? Array.isArray(t) ? t.map((n) => `${Y(e)}=${ne(n)}`).join("&") : `${Y(e)}=${ne(t)}` : Y(e);
}
function Wt(e) {
  return Object.keys(e).filter((t) => e[t] !== void 0).map((t) => $t(t, e[t])).filter(Boolean).join("&");
}
const Jt = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Vt = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Kt = /^([/\\]\s*){2,}[^/\\]/;
function je(e, t = {}) {
  return typeof t == "boolean" && (t = { acceptRelative: t }), t.strict ? Jt.test(e) : Vt.test(e) || (t.acceptRelative ? Kt.test(e) : !1);
}
const Gt = /\/$|\/\?/;
function oe(e = "", t = !1) {
  return t ? Gt.test(e) : e.endsWith("/");
}
function Qt(e = "", t = !1) {
  if (!t)
    return (oe(e) ? e.slice(0, -1) : e) || "/";
  if (!oe(e, !0))
    return e || "/";
  const [n, ...r] = e.split("?");
  return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "");
}
function Xt(e = "", t = !1) {
  if (!t)
    return e.endsWith("/") ? e : e + "/";
  if (oe(e, !0))
    return e || "/";
  const [n, ...r] = e.split("?");
  return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "");
}
function Yt(e, t) {
  if (er(t) || je(e))
    return e;
  const n = Qt(t);
  return e.startsWith(n) ? e : sr(n, e);
}
function Zt(e, t) {
  const n = He(e), r = { ...zt(n.search), ...t };
  return n.search = Wt(r), nr(n);
}
function er(e) {
  return !e || e === "/";
}
function tr(e) {
  return e && e !== "/";
}
const rr = /^\.?\//;
function sr(e, ...t) {
  let n = e || "";
  for (const r of t.filter((s) => tr(s)))
    if (n) {
      const s = r.replace(rr, "");
      n = Xt(n) + s;
    } else
      n = r;
  return n;
}
function He(e = "", t) {
  const n = e.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/
  );
  if (n) {
    const [, _, O = ""] = n;
    return {
      protocol: _,
      pathname: O,
      href: _ + O,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!je(e, { acceptRelative: !0 }))
    return t ? He(t + e) : ge(e);
  const [, r = "", s, o = ""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, a = "", c = ""] = o.match(/([^#/?]*)(.*)?/) || [], { pathname: p, search: d, hash: h } = ge(
    c.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: r,
    auth: s ? s.slice(0, Math.max(0, s.length - 1)) : "",
    host: a,
    pathname: p,
    search: d,
    hash: h
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
function nr(e) {
  const t = e.pathname || "", n = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "", r = e.hash || "", s = e.auth ? e.auth + "@" : "", o = e.host || "";
  return (e.protocol ? e.protocol + "//" : "") + s + o + t + n + r;
}
class or extends Error {
  constructor(t, n) {
    super(t, n), this.name = "FetchError", n != null && n.cause && !this.cause && (this.cause = n.cause);
  }
}
function ir(e) {
  var t, n, r, s, o;
  const a = ((t = e.error) == null ? void 0 : t.message) || ((n = e.error) == null ? void 0 : n.toString()) || "", c = ((r = e.request) == null ? void 0 : r.method) || ((s = e.options) == null ? void 0 : s.method) || "GET", p = ((o = e.request) == null ? void 0 : o.url) || String(e.request) || "/", d = `[${c}] ${JSON.stringify(p)}`, h = e.response ? `${e.response.status} ${e.response.statusText}` : "<no response>", _ = `${d}: ${h}${a ? ` ${a}` : ""}`, O = new or(
    _,
    e.error ? { cause: e.error } : void 0
  );
  for (const w of ["request", "options", "response"])
    Object.defineProperty(O, w, {
      get() {
        return e[w];
      }
    });
  for (const [w, M] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(O, w, {
      get() {
        return e.response && e.response[M];
      }
    });
  return O;
}
const ar = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Se(e = "GET") {
  return ar.has(e.toUpperCase());
}
function cr(e) {
  if (e === void 0)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.buffer ? !1 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function";
}
const lr = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), ur = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function hr(e = "") {
  if (!e)
    return "json";
  const t = e.split(";").shift() || "";
  return ur.test(t) ? "json" : lr.has(t) || t.startsWith("text/") ? "text" : "blob";
}
function pr(e, t, n = globalThis.Headers) {
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
const fr = /* @__PURE__ */ new Set([
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
]), dr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function ze(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: n = globalThis.Headers,
    AbortController: r = globalThis.AbortController
  } = e;
  async function s(c) {
    const p = c.error && c.error.name === "AbortError" && !c.options.timeout || !1;
    if (c.options.retry !== !1 && !p) {
      let h;
      typeof c.options.retry == "number" ? h = c.options.retry : h = Se(c.options.method) ? 0 : 1;
      const _ = c.response && c.response.status || 500;
      if (h > 0 && (Array.isArray(c.options.retryStatusCodes) ? c.options.retryStatusCodes.includes(_) : fr.has(_))) {
        const O = c.options.retryDelay || 0;
        return O > 0 && await new Promise((w) => setTimeout(w, O)), o(c.request, {
          ...c.options,
          retry: h - 1,
          timeout: c.options.timeout
        });
      }
    }
    const d = ir(c);
    throw Error.captureStackTrace && Error.captureStackTrace(d, o), d;
  }
  const o = async function(c, p = {}) {
    var d;
    const h = {
      request: c,
      options: pr(p, e.defaults, n),
      response: void 0,
      error: void 0
    };
    if (h.options.method = (d = h.options.method) == null ? void 0 : d.toUpperCase(), h.options.onRequest && await h.options.onRequest(h), typeof h.request == "string" && (h.options.baseURL && (h.request = Yt(h.request, h.options.baseURL)), (h.options.query || h.options.params) && (h.request = Zt(h.request, {
      ...h.options.params,
      ...h.options.query
    }))), h.options.body && Se(h.options.method) && (cr(h.options.body) ? (h.options.body = typeof h.options.body == "string" ? h.options.body : JSON.stringify(h.options.body), h.options.headers = new n(h.options.headers || {}), h.options.headers.has("content-type") || h.options.headers.set("content-type", "application/json"), h.options.headers.has("accept") || h.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in h.options.body && typeof h.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof h.options.body.pipe == "function") && ("duplex" in h.options || (h.options.duplex = "half"))
    )), !h.options.signal && h.options.timeout) {
      const _ = new r();
      setTimeout(() => _.abort(), h.options.timeout), h.options.signal = _.signal;
    }
    try {
      h.response = await t(
        h.request,
        h.options
      );
    } catch (_) {
      return h.error = _, h.options.onRequestError && await h.options.onRequestError(h), await s(h);
    }
    if (h.response.body && !dr.has(h.response.status) && h.options.method !== "HEAD") {
      const _ = (h.options.parseResponse ? "json" : h.options.responseType) || hr(h.response.headers.get("content-type") || "");
      switch (_) {
        case "json": {
          const O = await h.response.text(), w = h.options.parseResponse || Bt;
          h.response._data = w(O);
          break;
        }
        case "stream": {
          h.response._data = h.response.body;
          break;
        }
        default:
          h.response._data = await h.response[_]();
      }
    }
    return h.options.onResponse && await h.options.onResponse(h), !h.options.ignoreResponseError && h.response.status >= 400 && h.response.status < 600 ? (h.options.onResponseError && await h.options.onResponseError(h), await s(h)) : h.response;
  }, a = async function(c, p) {
    return (await o(c, p))._data;
  };
  return a.raw = o, a.native = (...c) => t(...c), a.create = (c = {}) => ze({
    ...e,
    defaults: {
      ...e.defaults,
      ...c
    }
  }), a;
}
const pe$1 = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), mr = pe$1.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), yr = pe$1.Headers, br = pe$1.AbortController, wr = ze({ fetch: mr, Headers: yr, AbortController: br });
class gr extends Error {
  constructor(t) {
    super(t.statusText), S(this, "status"), this.response = t, this.status = t.status;
  }
}
class W extends Error {
  constructor(t, n) {
    super(t.msg), S(this, "code"), this.body = t, this.response = n, this.code = t.code;
  }
}
function R(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
function Ee(e, t) {
  for (var n = "", r = 0, s = -1, o = 0, a, c = 0; c <= e.length; ++c) {
    if (c < e.length)
      a = e.charCodeAt(c);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(s === c - 1 || o === 1))
        if (s !== c - 1 && o === 2) {
          if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var p = n.lastIndexOf("/");
              if (p !== n.length - 1) {
                p === -1 ? (n = "", r = 0) : (n = n.slice(0, p), r = n.length - 1 - n.lastIndexOf("/")), s = c, o = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", r = 0, s = c, o = 0;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", r = 2);
        } else
          n.length > 0 ? n += "/" + e.slice(s + 1, c) : n = e.slice(s + 1, c), r = c - s - 1;
      s = c, o = 0;
    } else
      a === 46 && o !== -1 ? ++o : o = -1;
  }
  return n;
}
function Ar(e, t) {
  var n = t.dir || t.root, r = t.base || (t.name || "") + (t.ext || "");
  return n ? n === t.root ? n + r : n + e + r : r;
}
var F = {
  // path.resolve([from ...], to)
  resolve: function() {
    for (var e = "", t = !1, n, r = arguments.length - 1; r >= -1 && !t; r--) {
      var s;
      r >= 0 ? s = arguments[r] : (n === void 0 && (n = process.cwd()), s = n), R(s), s.length !== 0 && (e = s + "/" + e, t = s.charCodeAt(0) === 47);
    }
    return e = Ee(e, !t), t ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  },
  normalize: function(e) {
    if (R(e), e.length === 0)
      return ".";
    var t = e.charCodeAt(0) === 47, n = e.charCodeAt(e.length - 1) === 47;
    return e = Ee(e, !t), e.length === 0 && !t && (e = "."), e.length > 0 && n && (e += "/"), t ? "/" + e : e;
  },
  isAbsolute: function(e) {
    return R(e), e.length > 0 && e.charCodeAt(0) === 47;
  },
  join: function() {
    if (arguments.length === 0)
      return ".";
    for (var e, t = 0; t < arguments.length; ++t) {
      var n = arguments[t];
      R(n), n.length > 0 && (e === void 0 ? e = n : e += "/" + n);
    }
    return e === void 0 ? "." : F.normalize(e);
  },
  relative: function(e, t) {
    if (R(e), R(t), e === t || (e = F.resolve(e), t = F.resolve(t), e === t))
      return "";
    for (var n = 1; n < e.length && e.charCodeAt(n) === 47; ++n)
      ;
    for (var r = e.length, s = r - n, o = 1; o < t.length && t.charCodeAt(o) === 47; ++o)
      ;
    for (var a = t.length, c = a - o, p = s < c ? s : c, d = -1, h = 0; h <= p; ++h) {
      if (h === p) {
        if (c > p) {
          if (t.charCodeAt(o + h) === 47)
            return t.slice(o + h + 1);
          if (h === 0)
            return t.slice(o + h);
        } else
          s > p && (e.charCodeAt(n + h) === 47 ? d = h : h === 0 && (d = 0));
        break;
      }
      var _ = e.charCodeAt(n + h), O = t.charCodeAt(o + h);
      if (_ !== O)
        break;
      _ === 47 && (d = h);
    }
    var w = "";
    for (h = n + d + 1; h <= r; ++h)
      (h === r || e.charCodeAt(h) === 47) && (w.length === 0 ? w += ".." : w += "/..");
    return w.length > 0 ? w + t.slice(o + d) : (o += d, t.charCodeAt(o) === 47 && ++o, t.slice(o));
  },
  _makeLong: function(e) {
    return e;
  },
  dirname: function(e) {
    if (R(e), e.length === 0)
      return ".";
    for (var t = e.charCodeAt(0), n = t === 47, r = -1, s = !0, o = e.length - 1; o >= 1; --o)
      if (t = e.charCodeAt(o), t === 47) {
        if (!s) {
          r = o;
          break;
        }
      } else
        s = !1;
    return r === -1 ? n ? "/" : "." : n && r === 1 ? "//" : e.slice(0, r);
  },
  basename: function(e, t) {
    if (t !== void 0 && typeof t != "string")
      throw new TypeError('"ext" argument must be a string');
    R(e);
    var n = 0, r = -1, s = !0, o;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e)
        return "";
      var a = t.length - 1, c = -1;
      for (o = e.length - 1; o >= 0; --o) {
        var p = e.charCodeAt(o);
        if (p === 47) {
          if (!s) {
            n = o + 1;
            break;
          }
        } else
          c === -1 && (s = !1, c = o + 1), a >= 0 && (p === t.charCodeAt(a) ? --a === -1 && (r = o) : (a = -1, r = c));
      }
      return n === r ? r = c : r === -1 && (r = e.length), e.slice(n, r);
    } else {
      for (o = e.length - 1; o >= 0; --o)
        if (e.charCodeAt(o) === 47) {
          if (!s) {
            n = o + 1;
            break;
          }
        } else
          r === -1 && (s = !1, r = o + 1);
      return r === -1 ? "" : e.slice(n, r);
    }
  },
  extname: function(e) {
    R(e);
    for (var t = -1, n = 0, r = -1, s = !0, o = 0, a = e.length - 1; a >= 0; --a) {
      var c = e.charCodeAt(a);
      if (c === 47) {
        if (!s) {
          n = a + 1;
          break;
        }
        continue;
      }
      r === -1 && (s = !1, r = a + 1), c === 46 ? t === -1 ? t = a : o !== 1 && (o = 1) : t !== -1 && (o = -1);
    }
    return t === -1 || r === -1 || // We saw a non-dot character immediately before the dot
    o === 0 || // The (right-most) trimmed path component is exactly '..'
    o === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return Ar("/", e);
  },
  parse: function(e) {
    R(e);
    var t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    var n = e.charCodeAt(0), r = n === 47, s;
    r ? (t.root = "/", s = 1) : s = 0;
    for (var o = -1, a = 0, c = -1, p = !0, d = e.length - 1, h = 0; d >= s; --d) {
      if (n = e.charCodeAt(d), n === 47) {
        if (!p) {
          a = d + 1;
          break;
        }
        continue;
      }
      c === -1 && (p = !1, c = d + 1), n === 46 ? o === -1 ? o = d : h !== 1 && (h = 1) : o !== -1 && (h = -1);
    }
    return o === -1 || c === -1 || // We saw a non-dot character immediately before the dot
    h === 0 || // The (right-most) trimmed path component is exactly '..'
    h === 1 && o === c - 1 && o === a + 1 ? c !== -1 && (a === 0 && r ? t.base = t.name = e.slice(1, c) : t.base = t.name = e.slice(a, c)) : (a === 0 && r ? (t.name = e.slice(1, o), t.base = e.slice(1, c)) : (t.name = e.slice(a, o), t.base = e.slice(a, c)), t.ext = e.slice(o, c)), a > 0 ? t.dir = e.slice(0, a - 1) : r && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
F.posix = F;
function $e(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Rr } = Object.prototype, { getPrototypeOf: de } = Object, V = ((e) => (t) => {
  const n = Rr.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), C = (e) => (e = e.toLowerCase(), (t) => V(t) === e), K = (e) => (t) => typeof t === e, { isArray: x } = Array, I = K("undefined");
function Pr(e) {
  return e !== null && !I(e) && e.constructor !== null && !I(e.constructor) && k(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const We = C("ArrayBuffer");
function Cr(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && We(e.buffer), t;
}
const Tr = K("string"), k = K("function"), Je = K("number"), G = (e) => e !== null && typeof e == "object", Dr = (e) => e === !0 || e === !1, H = (e) => {
  if (V(e) !== "object")
    return !1;
  const t = de(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Nr = C("Date"), _r = C("File"), Br = C("Blob"), Fr = C("FileList"), vr = (e) => G(e) && k(e.pipe), xr = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || k(e.append) && ((t = V(e)) === "formdata" || // detect form-data instance
  t === "object" && k(e.toString) && e.toString() === "[object FormData]"));
}, qr = C("URLSearchParams"), Ir = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function L(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), x(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = o.length;
    let c;
    for (r = 0; r < a; r++)
      c = o[r], t.call(null, e[c], c, e);
  }
}
function Ve(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Ke = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Ge = (e) => !I(e) && e !== Ke;
function ie() {
  const { caseless: e } = Ge(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && Ve(t, s) || s;
    H(t[o]) && H(r) ? t[o] = ie(t[o], r) : H(r) ? t[o] = ie({}, r) : x(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && L(arguments[r], n);
  return t;
}
const Lr = (e, t, n, { allOwnKeys: r } = {}) => (L(t, (s, o) => {
  n && k(s) ? e[o] = $e(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), Ur = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Mr = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, jr = (e, t, n, r) => {
  let s, o, a;
  const c = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      a = s[o], (!r || r(a, e, t)) && !c[a] && (t[a] = e[a], c[a] = !0);
    e = n !== !1 && de(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Hr = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, zr = (e) => {
  if (!e)
    return null;
  if (x(e))
    return e;
  let t = e.length;
  if (!Je(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, $r = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && de(Uint8Array)), Wr = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const s = r.value;
    t.call(e, s[0], s[1]);
  }
}, Jr = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Vr = C("HTMLFormElement"), Kr = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, n, r) {
    return n.toUpperCase() + r;
  }
), ke = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Gr = C("RegExp"), Qe = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  L(n, (s, o) => {
    let a;
    (a = t(s, o, e)) !== !1 && (r[o] = a || s);
  }), Object.defineProperties(e, r);
}, Qr = (e) => {
  Qe(e, (t, n) => {
    if (k(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (k(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Xr = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return x(e) ? r(e) : r(String(e).split(t)), n;
}, Yr = () => {
}, Zr = (e, t) => (e = +e, Number.isFinite(e) ? e : t), Z = "abcdefghijklmnopqrstuvwxyz", Ae = "0123456789", Xe = {
  DIGIT: Ae,
  ALPHA: Z,
  ALPHA_DIGIT: Z + Z.toUpperCase() + Ae
}, es = (e = 16, t = Xe.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function ts(e) {
  return !!(e && k(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const rs = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (G(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = x(r) ? [] : {};
        return L(r, (a, c) => {
          const p = n(a, s + 1);
          !I(p) && (o[c] = p);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, ss = C("AsyncFunction"), ns = (e) => e && (G(e) || k(e)) && k(e.then) && k(e.catch), u = {
  isArray: x,
  isArrayBuffer: We,
  isBuffer: Pr,
  isFormData: xr,
  isArrayBufferView: Cr,
  isString: Tr,
  isNumber: Je,
  isBoolean: Dr,
  isObject: G,
  isPlainObject: H,
  isUndefined: I,
  isDate: Nr,
  isFile: _r,
  isBlob: Br,
  isRegExp: Gr,
  isFunction: k,
  isStream: vr,
  isURLSearchParams: qr,
  isTypedArray: $r,
  isFileList: Fr,
  forEach: L,
  merge: ie,
  extend: Lr,
  trim: Ir,
  stripBOM: Ur,
  inherits: Mr,
  toFlatObject: jr,
  kindOf: V,
  kindOfTest: C,
  endsWith: Hr,
  toArray: zr,
  forEachEntry: Wr,
  matchAll: Jr,
  isHTMLForm: Vr,
  hasOwnProperty: ke,
  hasOwnProp: ke,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Qe,
  freezeMethods: Qr,
  toObjectSet: Xr,
  toCamelCase: Kr,
  noop: Yr,
  toFiniteNumber: Zr,
  findKey: Ve,
  global: Ke,
  isContextDefined: Ge,
  ALPHABET: Xe,
  generateString: es,
  isSpecCompliantForm: ts,
  toJSONObject: rs,
  isAsyncFn: ss,
  isThenable: ns
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
const Ye = y.prototype, Ze = {};
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
  Ze[e] = { value: e };
});
Object.defineProperties(y, Ze);
Object.defineProperty(Ye, "isAxiosError", { value: !0 });
y.from = (e, t, n, r, s, o) => {
  const a = Object.create(Ye);
  return u.toFlatObject(e, a, function(c) {
    return c !== Error.prototype;
  }, (c) => c !== "isAxiosError"), y.call(a, e.message, t, n, r, s), a.cause = e, a.name = e.name, o && Object.assign(a, o), a;
};
const os = null;
function ae(e) {
  return u.isPlainObject(e) || u.isArray(e);
}
function et(e) {
  return u.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Oe(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = et(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function is(e) {
  return u.isArray(e) && !e.some(ae);
}
const as$1 = u.toFlatObject(u, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Q(e, t, n) {
  if (!u.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = u.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(w, M) {
    return !u.isUndefined(M[w]);
  });
  const r = n.metaTokens, s = n.visitor || d, o = n.dots, a = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && u.isSpecCompliantForm(t);
  if (!u.isFunction(s))
    throw new TypeError("visitor must be a function");
  function p(w) {
    if (w === null)
      return "";
    if (u.isDate(w))
      return w.toISOString();
    if (!c && u.isBlob(w))
      throw new y("Blob is not supported. Use a Buffer instead.");
    return u.isArrayBuffer(w) || u.isTypedArray(w) ? c && typeof Blob == "function" ? new Blob([w]) : Buffer.from(w) : w;
  }
  function d(w, M, fe) {
    let Ue = w;
    if (w && !fe && typeof w == "object") {
      if (u.endsWith(M, "{}"))
        M = r ? M : M.slice(0, -2), w = JSON.stringify(w);
      else if (u.isArray(w) && is(w) || (u.isFileList(w) || u.endsWith(M, "[]")) && (Ue = u.toArray(w)))
        return M = et(M), Ue.forEach(function(wt, mt) {
          !(u.isUndefined(wt) || wt === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Oe([M], mt, o) : a === null ? M : M + "[]",
            p(wt)
          );
        }), !1;
    }
    return ae(w) ? !0 : (t.append(Oe(fe, M, o), p(w)), !1);
  }
  const h = [], _ = Object.assign(as$1, {
    defaultVisitor: d,
    convertValue: p,
    isVisitable: ae
  });
  function O(w, M) {
    if (!u.isUndefined(w)) {
      if (h.indexOf(w) !== -1)
        throw Error("Circular reference detected in " + M.join("."));
      h.push(w), u.forEach(w, function(fe, Ue) {
        (!(u.isUndefined(fe) || fe === null) && s.call(
          t,
          fe,
          u.isString(Ue) ? Ue.trim() : Ue,
          M,
          _
        )) === !0 && O(fe, M ? M.concat(Ue) : [Ue]);
      }), h.pop();
    }
  }
  if (!u.isObject(e))
    throw new TypeError("data must be an object");
  return O(e), t;
}
function Re(e) {
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
function me(e, t) {
  this._pairs = [], e && Q(e, this, t);
}
const tt = me.prototype;
tt.append = function(e, t) {
  this._pairs.push([e, t]);
};
tt.toString = function(e) {
  const t = e ? function(n) {
    return e.call(this, n, Re);
  } : Re;
  return this._pairs.map(function(n) {
    return t(n[0]) + "=" + t(n[1]);
  }, "").join("&");
};
function cs(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function rt(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || cs, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = u.isURLSearchParams(t) ? t.toString() : new me(t, n).toString(r), o) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class ls {
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
}
const Pe = ls, st = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, us = typeof URLSearchParams < "u" ? URLSearchParams : me, hs = typeof FormData < "u" ? FormData : null, ps = typeof Blob < "u" ? Blob : null, fs = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), ds = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), P = {
  isBrowser: !0,
  classes: {
    URLSearchParams: us,
    FormData: hs,
    Blob: ps
  },
  isStandardBrowserEnv: fs,
  isStandardBrowserWebWorkerEnv: ds,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function ms(e, t) {
  return Q(e, new P.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return P.isNode && u.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function ys(e) {
  return u.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function bs(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function nt(e) {
  function t(n, r, s, o) {
    let a = n[o++];
    const c = Number.isFinite(+a), p = o >= n.length;
    return a = !a && u.isArray(s) ? s.length : a, p ? (u.hasOwnProp(s, a) ? s[a] = [s[a], r] : s[a] = r, !c) : ((!s[a] || !u.isObject(s[a])) && (s[a] = []), t(n, r, s[a], o) && u.isArray(s[a]) && (s[a] = bs(s[a])), !c);
  }
  if (u.isFormData(e) && u.isFunction(e.entries)) {
    const n = {};
    return u.forEachEntry(e, (r, s) => {
      t(ys(r), s, n, 0);
    }), n;
  }
  return null;
}
function ws$1(e, t, n) {
  if (u.isString(e))
    try {
      return (t || JSON.parse)(e), u.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const ye = {
  transitional: st,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, t) {
    const n = t.getContentType() || "", r = n.indexOf("application/json") > -1, s = u.isObject(e);
    if (s && u.isHTMLForm(e) && (e = new FormData(e)), u.isFormData(e))
      return r && r ? JSON.stringify(nt(e)) : e;
    if (u.isArrayBuffer(e) || u.isBuffer(e) || u.isStream(e) || u.isFile(e) || u.isBlob(e))
      return e;
    if (u.isArrayBufferView(e))
      return e.buffer;
    if (u.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let o;
    if (s) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return ms(e, this.formSerializer).toString();
      if ((o = u.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Q(
          o ? { "files[]": e } : e,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return s || r ? (t.setContentType("application/json", !1), ws$1(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || ye.transitional, n = t && t.forcedJSONParsing, r = this.responseType === "json";
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
    FormData: P.classes.FormData,
    Blob: P.classes.Blob
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
  ye.headers[e] = {};
});
const be = ye, gs = u.toObjectSet([
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
]), Ss = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), n = o.substring(0, s).trim().toLowerCase(), r = o.substring(s + 1).trim(), !(!n || t[n] && gs[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Ce = Symbol("internals");
function q(e) {
  return e && String(e).trim().toLowerCase();
}
function z(e) {
  return e === !1 || e == null ? e : u.isArray(e) ? e.map(z) : String(e);
}
function Es(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const ks = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ee(e, t, n, r, s) {
  if (u.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!u.isString(t)) {
    if (u.isString(r))
      return t.indexOf(r) !== -1;
    if (u.isRegExp(r))
      return r.test(t);
  }
}
function As(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Os(e, t) {
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
let X = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    const r = this;
    function s(a, c, p) {
      const d = q(c);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const h = u.findKey(r, d);
      (!h || r[h] === void 0 || p === !0 || p === void 0 && r[h] !== !1) && (r[h || c] = z(a));
    }
    const o = (a, c) => u.forEach(a, (p, d) => s(p, d, c));
    return u.isPlainObject(e) || e instanceof this.constructor ? o(e, t) : u.isString(e) && (e = e.trim()) && !ks(e) ? o(Ss(e), t) : e != null && s(t, e, n), this;
  }
  get(e, t) {
    if (e = q(e), e) {
      const n = u.findKey(this, e);
      if (n) {
        const r = this[n];
        if (!t)
          return r;
        if (t === !0)
          return Es(r);
        if (u.isFunction(t))
          return t.call(this, r, n);
        if (u.isRegExp(t))
          return t.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = q(e), e) {
      const n = u.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || ee(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    const n = this;
    let r = !1;
    function s(o) {
      if (o = q(o), o) {
        const a = u.findKey(n, o);
        a && (!t || ee(n, n[a], a, t)) && (delete n[a], r = !0);
      }
    }
    return u.isArray(e) ? e.forEach(s) : s(e), r;
  }
  clear(e) {
    const t = Object.keys(this);
    let n = t.length, r = !1;
    for (; n--; ) {
      const s = t[n];
      (!e || ee(this, this[s], s, e, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(e) {
    const t = this, n = {};
    return u.forEach(this, (r, s) => {
      const o = u.findKey(n, s);
      if (o) {
        t[o] = z(r), delete t[s];
        return;
      }
      const a = e ? As(s) : String(s).trim();
      a !== s && delete t[s], t[a] = z(r), n[a] = !0;
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
    const t = (this[Ce] = this[Ce] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function r(s) {
      const o = q(s);
      t[o] || (Os(n, s), t[o] = !0);
    }
    return u.isArray(e) ? e.forEach(r) : r(e), this;
  }
};
X.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
u.reduceDescriptors(X.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
u.freezeMethods(X);
const D = X;
function te(e, t) {
  const n = this || be, r = t || n, s = D.from(r.headers);
  let o = r.data;
  return u.forEach(e, function(a) {
    o = a.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function ot(e) {
  return !!(e && e.__CANCEL__);
}
function U(e, t, n) {
  y.call(this, e ?? "canceled", y.ERR_CANCELED, t, n), this.name = "CanceledError";
}
u.inherits(U, y, {
  __CANCEL__: !0
});
function Rs(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new y(
    "Request failed with status code " + n.status,
    [y.ERR_BAD_REQUEST, y.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Ps = P.isStandardBrowserEnv ? (
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
function Cs(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ts(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function it(e, t) {
  return e && !Cs(t) ? Ts(e, t) : t;
}
const Ds = P.isStandardBrowserEnv ? (
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
function Ns(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function _s(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, a;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const p = Date.now(), d = r[o];
    a || (a = p), n[s] = c, r[s] = p;
    let h = o, _ = 0;
    for (; h !== s; )
      _ += n[h++], h = h % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), p - a < t)
      return;
    const O = d && p - d;
    return O ? Math.round(_ * 1e3 / O) : void 0;
  };
}
function Te(e, t) {
  let n = 0;
  const r = _s(50, 250);
  return (s) => {
    const o = s.loaded, a = s.lengthComputable ? s.total : void 0, c = o - n, p = r(c), d = o <= a;
    n = o;
    const h = {
      loaded: o,
      total: a,
      progress: a ? o / a : void 0,
      bytes: c,
      rate: p || void 0,
      estimated: p && a && d ? (a - o) / p : void 0,
      event: s
    };
    h[t ? "download" : "upload"] = !0, e(h);
  };
}
const Bs = typeof XMLHttpRequest < "u", Fs = Bs && function(e) {
  return new Promise(function(t, n) {
    let r = e.data;
    const s = D.from(e.headers).normalize(), o = e.responseType;
    let a;
    function c() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    let p;
    u.isFormData(r) && (P.isStandardBrowserEnv || P.isStandardBrowserWebWorkerEnv ? s.setContentType(!1) : s.getContentType(/^\s*multipart\/form-data/) ? u.isString(p = s.getContentType()) && s.setContentType(p.replace(/^\s*(multipart\/form-data);+/, "$1")) : s.setContentType("multipart/form-data"));
    let d = new XMLHttpRequest();
    if (e.auth) {
      const w = e.auth.username || "", M = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(w + ":" + M));
    }
    const h = it(e.baseURL, e.url);
    d.open(e.method.toUpperCase(), rt(h, e.params, e.paramsSerializer), !0), d.timeout = e.timeout;
    function _() {
      if (!d)
        return;
      const w = D.from(
        "getAllResponseHeaders" in d && d.getAllResponseHeaders()
      ), M = {
        data: !o || o === "text" || o === "json" ? d.responseText : d.response,
        status: d.status,
        statusText: d.statusText,
        headers: w,
        config: e,
        request: d
      };
      Rs(function(fe) {
        t(fe), c();
      }, function(fe) {
        n(fe), c();
      }, M), d = null;
    }
    if ("onloadend" in d ? d.onloadend = _ : d.onreadystatechange = function() {
      !d || d.readyState !== 4 || d.status === 0 && !(d.responseURL && d.responseURL.indexOf("file:") === 0) || setTimeout(_);
    }, d.onabort = function() {
      d && (n(new y("Request aborted", y.ECONNABORTED, e, d)), d = null);
    }, d.onerror = function() {
      n(new y("Network Error", y.ERR_NETWORK, e, d)), d = null;
    }, d.ontimeout = function() {
      let w = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const M = e.transitional || st;
      e.timeoutErrorMessage && (w = e.timeoutErrorMessage), n(new y(
        w,
        M.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
        e,
        d
      )), d = null;
    }, P.isStandardBrowserEnv) {
      const w = (e.withCredentials || Ds(h)) && e.xsrfCookieName && Ps.read(e.xsrfCookieName);
      w && s.set(e.xsrfHeaderName, w);
    }
    r === void 0 && s.setContentType(null), "setRequestHeader" in d && u.forEach(s.toJSON(), function(w, M) {
      d.setRequestHeader(M, w);
    }), u.isUndefined(e.withCredentials) || (d.withCredentials = !!e.withCredentials), o && o !== "json" && (d.responseType = e.responseType), typeof e.onDownloadProgress == "function" && d.addEventListener("progress", Te(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && d.upload && d.upload.addEventListener("progress", Te(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (w) => {
      d && (n(!w || w.type ? new U(null, e, d) : w), d.abort(), d = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const O = Ns(h);
    if (O && P.protocols.indexOf(O) === -1) {
      n(new y("Unsupported protocol " + O + ":", y.ERR_BAD_REQUEST, e));
      return;
    }
    d.send(r || null);
  });
}, ce = {
  http: os,
  xhr: Fs
};
u.forEach(ce, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const De = (e) => `- ${e}`, vs = (e) => u.isFunction(e) || e === null || e === !1, at = {
  getAdapter: (e) => {
    e = u.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const s = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let a;
      if (r = n, !vs(n) && (r = ce[(a = String(n)).toLowerCase()], r === void 0))
        throw new y(`Unknown adapter '${a}'`);
      if (r)
        break;
      s[a || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(s).map(
        ([c, p]) => `adapter ${c} ` + (p === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? o.length > 1 ? `since :
` + o.map(De).join(`
`) : " " + De(o[0]) : "as no adapter specified";
      throw new y(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: ce
};
function re(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new U(null, e);
}
function Ne(e) {
  return re(e), e.headers = D.from(e.headers), e.data = te.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), at.getAdapter(e.adapter || be.adapter)(e).then(function(t) {
    return re(e), t.data = te.call(
      e,
      e.transformResponse,
      t
    ), t.headers = D.from(t.headers), t;
  }, function(t) {
    return ot(t) || (re(e), t && t.response && (t.response.data = te.call(
      e,
      e.transformResponse,
      t.response
    ), t.response.headers = D.from(t.response.headers))), Promise.reject(t);
  });
}
const _e = (e) => e instanceof D ? e.toJSON() : e;
function v(e, t) {
  t = t || {};
  const n = {};
  function r(d, h, _) {
    return u.isPlainObject(d) && u.isPlainObject(h) ? u.merge.call({ caseless: _ }, d, h) : u.isPlainObject(h) ? u.merge({}, h) : u.isArray(h) ? h.slice() : h;
  }
  function s(d, h, _) {
    if (u.isUndefined(h)) {
      if (!u.isUndefined(d))
        return r(void 0, d, _);
    } else
      return r(d, h, _);
  }
  function o(d, h) {
    if (!u.isUndefined(h))
      return r(void 0, h);
  }
  function a(d, h) {
    if (u.isUndefined(h)) {
      if (!u.isUndefined(d))
        return r(void 0, d);
    } else
      return r(void 0, h);
  }
  function c(d, h, _) {
    if (_ in t)
      return r(d, h);
    if (_ in e)
      return r(void 0, d);
  }
  const p = {
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
    validateStatus: c,
    headers: (d, h) => s(_e(d), _e(h), !0)
  };
  return u.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const h = p[d] || s, _ = h(e[d], t[d], d);
    u.isUndefined(_) && h !== c || (n[d] = _);
  }), n;
}
const ct = "1.5.1", we = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  we[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Be = {};
we.transitional = function(e, t, n) {
  function r(s, o) {
    return "[Axios v" + ct + "] Transitional option '" + s + "'" + o + (n ? ". " + n : "");
  }
  return (s, o, a) => {
    if (e === !1)
      throw new y(
        r(o, " has been removed" + (t ? " in " + t : "")),
        y.ERR_DEPRECATED
      );
    return t && !Be[o] && (Be[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(s, o, a) : !0;
  };
};
function xs(e, t, n) {
  if (typeof e != "object")
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], a = t[o];
    if (a) {
      const c = e[o], p = c === void 0 || a(c, o, e);
      if (p !== !0)
        throw new y("option " + o + " must be " + p, y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new y("Unknown option " + o, y.ERR_BAD_OPTION);
  }
}
const le = {
  assertOptions: xs,
  validators: we
}, N = le.validators;
let J = class {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new Pe(),
      response: new Pe()
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
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = v(this.defaults, t);
    const { transitional: n, paramsSerializer: r, headers: s } = t;
    n !== void 0 && le.assertOptions(n, {
      silentJSONParsing: N.transitional(N.boolean),
      forcedJSONParsing: N.transitional(N.boolean),
      clarifyTimeoutError: N.transitional(N.boolean)
    }, !1), r != null && (u.isFunction(r) ? t.paramsSerializer = {
      serialize: r
    } : le.assertOptions(r, {
      encode: N.function,
      serialize: N.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let o = s && u.merge(
      s.common,
      s[t.method]
    );
    s && u.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (w) => {
        delete s[w];
      }
    ), t.headers = D.concat(o, s);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(w) {
      typeof w.runWhen == "function" && w.runWhen(t) === !1 || (c = c && w.synchronous, a.unshift(w.fulfilled, w.rejected));
    });
    const p = [];
    this.interceptors.response.forEach(function(w) {
      p.push(w.fulfilled, w.rejected);
    });
    let d, h = 0, _;
    if (!c) {
      const w = [Ne.bind(this), void 0];
      for (w.unshift.apply(w, a), w.push.apply(w, p), _ = w.length, d = Promise.resolve(t); h < _; )
        d = d.then(w[h++], w[h++]);
      return d;
    }
    _ = a.length;
    let O = t;
    for (h = 0; h < _; ) {
      const w = a[h++], M = a[h++];
      try {
        O = w(O);
      } catch (fe) {
        M.call(this, fe);
        break;
      }
    }
    try {
      d = Ne.call(this, O);
    } catch (w) {
      return Promise.reject(w);
    }
    for (h = 0, _ = p.length; h < _; )
      d = d.then(p[h++], p[h++]);
    return d;
  }
  getUri(e) {
    e = v(this.defaults, e);
    const t = it(e.baseURL, e.url);
    return rt(t, e.params, e.paramsSerializer);
  }
};
u.forEach(["delete", "get", "head", "options"], function(e) {
  J.prototype[e] = function(t, n) {
    return this.request(v(n || {}, {
      method: e,
      url: t,
      data: (n || {}).data
    }));
  };
});
u.forEach(["post", "put", "patch"], function(e) {
  function t(n) {
    return function(r, s, o) {
      return this.request(v(o || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: s
      }));
    };
  }
  J.prototype[e] = t(), J.prototype[e + "Form"] = t(!0);
});
const $ = J;
let qs$1 = class qn {
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
      const a = new Promise((c) => {
        r.subscribe(c), o = c;
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
      token: new qn(function(n) {
        t = n;
      }),
      cancel: t
    };
  }
};
const Is = qs$1;
function Ls(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Us(e) {
  return u.isObject(e) && e.isAxiosError === !0;
}
const ue = {
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
Object.entries(ue).forEach(([e, t]) => {
  ue[t] = e;
});
const Ms = ue;
function ut(e) {
  const t = new $(e), n = $e($.prototype.request, t);
  return u.extend(n, $.prototype, t, { allOwnKeys: !0 }), u.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return ut(v(e, r));
  }, n;
}
const g = ut(be);
g.Axios = $;
g.CanceledError = U;
g.CancelToken = Is;
g.isCancel = ot;
g.VERSION = ct;
g.toFormData = Q;
g.AxiosError = y;
g.Cancel = g.CanceledError;
g.all = function(e) {
  return Promise.all(e);
};
g.spread = Ls;
g.isAxiosError = Us;
g.mergeConfig = v;
g.AxiosHeaders = D;
g.formToJSON = (e) => nt(u.isHTMLForm(e) ? new FormData(e) : e);
g.getAdapter = at.getAdapter;
g.HttpStatusCode = Ms;
g.default = g;
const ht = g, {
  Axios: Js,
  AxiosError: Vs,
  CanceledError: Ks,
  isCancel: Gs,
  CancelToken: Qs,
  VERSION: Xs,
  all: Ys,
  Cancel: Zs,
  isAxiosError: en,
  spread: tn,
  toFormData: rn,
  AxiosHeaders: sn,
  HttpStatusCode: j,
  formToJSON: nn,
  getAdapter: on,
  mergeConfig: an
} = ht;
var B = null;
typeof WebSocket < "u" ? B = WebSocket : typeof MozWebSocket < "u" ? B = MozWebSocket : typeof global < "u" ? B = global.WebSocket || global.MozWebSocket : typeof window < "u" ? B = window.WebSocket || window.MozWebSocket : typeof self < "u" && (B = self.WebSocket || self.MozWebSocket);
const js = B, se = {
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
var ve, xe, qe, Ie, Le;
const l = class kt {
  constructor(t = {}, n = "xhr") {
    S(this, "_type", "xhr"), S(this, "_baseURL", ((xe = (ve = globalThis.top) == null ? void 0 : ve.document) == null ? void 0 : xe.baseURI) ?? ((Ie = (qe = globalThis.parent) == null ? void 0 : qe.document) == null ? void 0 : Ie.baseURI) ?? ((Le = globalThis.location) == null ? void 0 : Le.origin) ?? se.SIYUAN_DEFAULT_BASE_URL), S(this, "_token", se.SIYUAN_DEFAULT_TOKEN), S(this, "_axios", ht.create({
      baseURL: this._baseURL,
      timeout: se.REQUEST_TIMEOUT,
      headers: {
        Authorization: `Token ${this._token}`
      }
    })), S(this, "_fetch", wr.create({
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
    const c = new URL(s);
    return c.protocol = c.protocol.replace(/^http/, "ws"), c.pathname = c.pathname.endsWith("/") ? `${c.pathname}${kt.ws.broadcast.pathname.substring(1)}` : `${c.pathname}${kt.ws.broadcast.pathname}`, c.search = a.toString(), new js(c, n);
  }
  /* 👇 由 JSON Schema 生成的类型定义👇 */
  /* 上传资源文件 */
  async upload(t, n) {
    const r = new FormData();
    return r.append("assetsDirPath", t.assetsDirPath ?? "/assets/"), t.files.forEach((s) => r.append("file[]", s)), await this._request(
      kt.api.asset.upload.pathname,
      kt.api.asset.upload.method,
      r,
      n
    );
  }
  /* 获取块属性 */
  async getBlockAttrs(t, n) {
    return await this._request(
      kt.api.attr.getBlockAttrs.pathname,
      kt.api.attr.getBlockAttrs.method,
      t,
      n
    );
  }
  /* 获取所有书签 */
  async getBookmarkLabels(t) {
    return await this._request(
      kt.api.attr.getBookmarkLabels.pathname,
      kt.api.attr.getBookmarkLabels.method,
      void 0,
      t
    );
  }
  /* 设置块属性 */
  async setBlockAttrs(t, n) {
    return await this._request(
      kt.api.attr.setBlockAttrs.pathname,
      kt.api.attr.setBlockAttrs.method,
      t,
      n
    );
  }
  /* 在下级块尾部插入块 */
  async appendBlock(t, n) {
    return await this._request(
      kt.api.block.appendBlock.pathname,
      kt.api.block.appendBlock.method,
      t,
      n
    );
  }
  /* 删除块 */
  async deleteBlock(t, n) {
    return await this._request(
      kt.api.block.deleteBlock.pathname,
      kt.api.block.deleteBlock.method,
      t,
      n
    );
  }
  /* 获得块面包屑 */
  async getBlockBreadcrumb(t, n) {
    return await this._request(
      kt.api.block.getBlockBreadcrumb.pathname,
      kt.api.block.getBlockBreadcrumb.method,
      t,
      n
    );
  }
  /* 获得块的 DOM */
  async getBlockDOM(t, n) {
    return await this._request(
      kt.api.block.getBlockDOM.pathname,
      kt.api.block.getBlockDOM.method,
      t,
      n
    );
  }
  /* 获得块所在文档的信息 */
  async getBlockInfo(t, n) {
    return await this._request(
      kt.api.block.getBlockInfo.pathname,
      kt.api.block.getBlockInfo.method,
      t,
      n
    );
  }
  /* 获得块的 kramdown 源码 */
  async getBlockKramdown(t, n) {
    return await this._request(
      kt.api.block.getBlockKramdown.pathname,
      kt.api.block.getBlockKramdown.method,
      t,
      n
    );
  }
  /* 获得指定块的所有下级块 */
  async getChildBlocks(t, n) {
    return await this._request(
      kt.api.block.getChildBlocks.pathname,
      kt.api.block.getChildBlocks.method,
      t,
      n
    );
  }
  /* 获得指定块所在文档信息 */
  async getDocInfo(t, n) {
    return await this._request(
      kt.api.block.getDocInfo.pathname,
      kt.api.block.getDocInfo.method,
      t,
      n
    );
  }
  /* 插入块 */
  async insertBlock(t, n) {
    return await this._request(
      kt.api.block.insertBlock.pathname,
      kt.api.block.insertBlock.method,
      t,
      n
    );
  }
  /* 移动块 */
  async moveBlock(t, n) {
    return await this._request(
      kt.api.block.moveBlock.pathname,
      kt.api.block.moveBlock.method,
      t,
      n
    );
  }
  /* 在下级块首部插入块 */
  async prependBlock(t, n) {
    return await this._request(
      kt.api.block.prependBlock.pathname,
      kt.api.block.prependBlock.method,
      t,
      n
    );
  }
  /* 转移块引用 */
  async transferBlockRef(t, n) {
    return await this._request(
      kt.api.block.transferBlockRef.pathname,
      kt.api.block.transferBlockRef.method,
      t,
      n
    );
  }
  /* 更新块 */
  async updateBlock(t, n) {
    return await this._request(
      kt.api.block.updateBlock.pathname,
      kt.api.block.updateBlock.method,
      t,
      n
    );
  }
  /* 获取所有广播频道信息 */
  async channels(t) {
    return await this._request(
      kt.api.broadcast.channels.pathname,
      kt.api.broadcast.channels.method,
      void 0,
      t
    );
  }
  /* 获取指定广播频道的信息 */
  async getChannelInfo(t, n) {
    return await this._request(
      kt.api.broadcast.getChannelInfo.pathname,
      kt.api.broadcast.getChannelInfo.method,
      t,
      n
    );
  }
  /* 推送广播消息 */
  async postMessage(t, n) {
    return await this._request(
      kt.api.broadcast.postMessage.pathname,
      kt.api.broadcast.postMessage.method,
      t,
      n
    );
  }
  /* 调用 pandoc 转换转换文件 */
  async pandoc(t, n) {
    return await this._request(
      kt.api.convert.pandoc.pathname,
      kt.api.convert.pandoc.method,
      t,
      n
    );
  }
  /* 打包文件与文件夹以导出 */
  async exportResources(t, n) {
    return await this._request(
      kt.api.export.exportResources.pathname,
      kt.api.export.exportResources.method,
      t,
      n
    );
  }
  /* 导出指定文档块为 Markdown */
  async exportMdContent(t, n) {
    return await this._request(
      kt.api.export.exportMdContent.pathname,
      kt.api.export.exportMdContent.method,
      t,
      n
    );
  }
  async getFile(t, n = "text", r) {
    return await this._request(
      kt.api.file.getFile.pathname,
      kt.api.file.getFile.method,
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
      kt.api.file.putFile.pathname,
      kt.api.file.putFile.method,
      r,
      n
    );
  }
  /* 获取文件目录下级内容 */
  async readDir(t, n) {
    return await this._request(
      kt.api.file.readDir.pathname,
      kt.api.file.readDir.method,
      t,
      n
    );
  }
  /* 删除文件/目录 */
  async removeFile(t, n) {
    return await this._request(
      kt.api.file.removeFile.pathname,
      kt.api.file.removeFile.method,
      t,
      n
    );
  }
  /* 重命名/移动文件/目录 */
  async renameFile(t, n) {
    return await this._request(
      kt.api.file.renameFile.pathname,
      kt.api.file.renameFile.method,
      t,
      n
    );
  }
  /* 通过 Markdown 创建文档 */
  async createDocWithMd(t, n) {
    return await this._request(
      kt.api.filetree.createDocWithMd.pathname,
      kt.api.filetree.createDocWithMd.method,
      t,
      n
    );
  }
  /* 获取文档内容 */
  async getDoc(t, n) {
    return await this._request(
      kt.api.filetree.getDoc.pathname,
      kt.api.filetree.getDoc.method,
      t,
      n
    );
  }
  /* 根据 ID 获取人类可读路径 */
  async getHPathByID(t, n) {
    return await this._request(
      kt.api.filetree.getHPathByID.pathname,
      kt.api.filetree.getHPathByID.method,
      t,
      n
    );
  }
  /* 根据路径获取人类可读路径 */
  async getHPathByPath(t, n) {
    return await this._request(
      kt.api.filetree.getHPathByPath.pathname,
      kt.api.filetree.getHPathByPath.method,
      t,
      n
    );
  }
  /* 查询子文档 */
  async listDocsByPath(t, n) {
    return await this._request(
      kt.api.filetree.listDocsByPath.pathname,
      kt.api.filetree.listDocsByPath.method,
      t,
      n
    );
  }
  /* 批量移动文档 */
  async moveDocs(t, n) {
    return await this._request(
      kt.api.filetree.moveDocs.pathname,
      kt.api.filetree.moveDocs.method,
      t,
      n
    );
  }
  /* 删除文档 */
  async removeDoc(t, n) {
    return await this._request(
      kt.api.filetree.removeDoc.pathname,
      kt.api.filetree.removeDoc.method,
      t,
      n
    );
  }
  /* 文档重命名 */
  async renameDoc(t, n) {
    return await this._request(
      kt.api.filetree.renameDoc.pathname,
      kt.api.filetree.renameDoc.method,
      t,
      n
    );
  }
  /* 搜索文档 */
  async searchDocs(t, n) {
    return await this._request(
      kt.api.filetree.searchDocs.pathname,
      kt.api.filetree.searchDocs.method,
      t,
      n
    );
  }
  /* 获取历史文档内容 */
  async getDocHistoryContent(t, n) {
    return await this._request(
      kt.api.history.getDocHistoryContent.pathname,
      kt.api.history.getDocHistoryContent.method,
      t,
      n
    );
  }
  /* 查询历史项 */
  async getHistoryItems(t, n) {
    return await this._request(
      kt.api.history.getHistoryItems.pathname,
      kt.api.history.getHistoryItems.method,
      t,
      n
    );
  }
  /* 收集箱速记内容 */
  async getShorthand(t, n) {
    return await this._request(
      kt.api.inbox.getShorthand.pathname,
      kt.api.inbox.getShorthand.method,
      t,
      n
    );
  }
  /* 正向代理 */
  async forwardProxy(t, n) {
    return await this._request(
      kt.api.network.forwardProxy.pathname,
      kt.api.network.forwardProxy.method,
      t,
      n
    );
  }
  /* 关闭笔记本 */
  async closeNotebook(t, n) {
    return await this._request(
      kt.api.notebook.closeNotebook.pathname,
      kt.api.notebook.closeNotebook.method,
      t,
      n
    );
  }
  /* 创建笔记本 */
  async createNotebook(t, n) {
    return await this._request(
      kt.api.notebook.createNotebook.pathname,
      kt.api.notebook.createNotebook.method,
      t,
      n
    );
  }
  /* 获取笔记本配置信息 */
  async getNotebookConf(t, n) {
    return await this._request(
      kt.api.notebook.getNotebookConf.pathname,
      kt.api.notebook.getNotebookConf.method,
      t,
      n
    );
  }
  /* 列出笔记本信息 */
  async lsNotebooks(t) {
    return await this._request(
      kt.api.notebook.lsNotebooks.pathname,
      kt.api.notebook.lsNotebooks.method,
      void 0,
      t
    );
  }
  /* 打开笔记本 */
  async openNotebook(t, n) {
    return await this._request(
      kt.api.notebook.openNotebook.pathname,
      kt.api.notebook.openNotebook.method,
      t,
      n
    );
  }
  /* 删除笔记本 */
  async removeNotebook(t, n) {
    return await this._request(
      kt.api.notebook.removeNotebook.pathname,
      kt.api.notebook.removeNotebook.method,
      t,
      n
    );
  }
  /* 重命名笔记本 */
  async renameNotebook(t, n) {
    return await this._request(
      kt.api.notebook.renameNotebook.pathname,
      kt.api.notebook.renameNotebook.method,
      t,
      n
    );
  }
  /* 设置笔记本配置 */
  async setNotebookConf(t, n) {
    return await this._request(
      kt.api.notebook.setNotebookConf.pathname,
      kt.api.notebook.setNotebookConf.method,
      t,
      n
    );
  }
  /* 推送错误消息 */
  async pushErrMsg(t, n) {
    return await this._request(
      kt.api.notification.pushErrMsg.pathname,
      kt.api.notification.pushErrMsg.method,
      t,
      n
    );
  }
  /* 推送提示消息 */
  async pushMsg(t, n) {
    return await this._request(
      kt.api.notification.pushMsg.pathname,
      kt.api.notification.pushMsg.method,
      t,
      n
    );
  }
  /* SQL 查询 */
  async sql(t, n) {
    return await this._request(
      kt.api.query.sql.pathname,
      kt.api.query.sql.method,
      t,
      n
    );
  }
  /* 读取快照文件内容 */
  async openRepoSnapshotDoc(t, n) {
    return await this._request(
      kt.api.repo.openRepoSnapshotDoc.pathname,
      kt.api.repo.openRepoSnapshotDoc.method,
      t,
      n
    );
  }
  /* 全局搜索 */
  async fullTextSearchBlock(t, n) {
    return await this._request(
      kt.api.search.fullTextSearchBlock.pathname,
      kt.api.search.fullTextSearchBlock.method,
      t,
      n
    );
  }
  /* 获取代码片段 */
  async getSnippet(t, n) {
    return await this._request(
      kt.api.snippet.getSnippet.pathname,
      kt.api.snippet.getSnippet.method,
      t,
      n
    );
  }
  /* 设置代码片段 */
  async setSnippet(t, n) {
    return await this._request(
      kt.api.snippet.setSnippet.pathname,
      kt.api.snippet.setSnippet.method,
      t,
      n
    );
  }
  /* 获取所有本地存储的数据 */
  async getLocalStorage(t) {
    return await this._request(
      kt.api.storage.getLocalStorage.pathname,
      kt.api.storage.getLocalStorage.method,
      void 0,
      t
    );
  }
  /* 查询最近打开的文档 */
  async getRecentDocs(t) {
    return await this._request(
      kt.api.storage.getRecentDocs.pathname,
      kt.api.storage.getRecentDocs.method,
      void 0,
      t
    );
  }
  /* 持久化本地存储 */
  async setLocalStorage(t, n) {
    return await this._request(
      kt.api.storage.setLocalStorage.pathname,
      kt.api.storage.setLocalStorage.method,
      t,
      n
    );
  }
  /* 获取内核启动进度 */
  async bootProgress(t) {
    return await this._request(
      kt.api.system.bootProgress.pathname,
      kt.api.system.bootProgress.method,
      void 0,
      t
    );
  }
  /* 获得配置 */
  async getConf(t) {
    return await this._request(
      kt.api.system.getConf.pathname,
      kt.api.system.getConf.method,
      void 0,
      t
    );
  }
  /* 获得内核 Unix 时间戳 (单位: ms) */
  async currentTime(t) {
    return await this._request(
      kt.api.system.currentTime.pathname,
      kt.api.system.currentTime.method,
      void 0,
      t
    );
  }
  /* 获得内核版本 */
  async version(t) {
    return await this._request(
      kt.api.system.version.pathname,
      kt.api.system.version.method,
      void 0,
      t
    );
  }
  /* 渲染 kramdown 模板文件 */
  async render(t, n) {
    return await this._request(
      kt.api.template.render.pathname,
      kt.api.template.render.method,
      t,
      n
    );
  }
  /* 渲染 Sprig 模板 */
  async renderSprig(t, n) {
    return await this._request(
      kt.api.template.renderSprig.pathname,
      kt.api.template.renderSprig.method,
      t,
      n
    );
  }
  async _request(t, n, r, s, o = !0, a = "json") {
    try {
      switch ((s == null ? void 0 : s.type) ?? this._type) {
        case "fetch": {
          const c = s == null ? void 0 : s.options;
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
          const p = await this._fetch(
            t,
            {
              method: n,
              body: r,
              responseType: a,
              onResponse: async (d) => {
                switch (d.response.status) {
                  case j.Ok:
                    break;
                  case j.Accepted:
                    t === kt.api.file.getFile.pathname && this._parseFetchResponse(d.response._data);
                    break;
                  default:
                    break;
                }
              },
              ...c
            }
          );
          return o && a === "json" && typeof p == "object" ? this._parseFetchResponse(p) : p;
        }
        case "xhr":
        default: {
          const c = s == null ? void 0 : s.options;
          a = (() => {
            switch (a) {
              case "arrayBuffer":
                return "arraybuffer";
              default:
                return a;
            }
          })();
          const p = await this._axios.request({
            url: t,
            method: n,
            data: r,
            responseType: a,
            ...c
          });
          switch (p.status) {
            case j.Ok:
              return o && a === "json" && typeof p.data == "object" ? this._parseAxiosResponse(p) : p.data;
            case j.Accepted:
              return t === kt.api.file.getFile.pathname ? this._parseAxiosResponse(p) : p.data;
            default:
              throw new gr(p);
          }
        }
      }
    } catch (c) {
      throw c;
    }
  }
  /**
   * 解析内核响应
   */
  _parseFetchResponse(t) {
    if (t.code === 0)
      return t;
    throw new W(t);
  }
  /**
   * 解析内核响应
   */
  _parseAxiosResponse(t) {
    if (t.data.code === 0)
      return t.data;
    throw new W(t.data, t);
  }
};
S(l, "ws", {
  broadcast: { pathname: "/ws/broadcast" }
}), S(l, "api", {
  asset: {
    upload: { pathname: "/api/asset/upload", method: "POST" }
  },
  attr: {
    getBlockAttrs: { pathname: "/api/attr/getBlockAttrs", method: "POST" },
    getBookmarkLabels: { pathname: "/api/attr/getBookmarkLabels", method: "POST" },
    setBlockAttrs: { pathname: "/api/attr/setBlockAttrs", method: "POST" }
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
    getNotebookConf: { pathname: "/api/notebook/getNotebookConf", method: "POST" },
    lsNotebooks: { pathname: "/api/notebook/lsNotebooks", method: "POST" },
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
  search: {
    fullTextSearchBlock: { pathname: "/api/search/fullTextSearchBlock", method: "POST" }
  },
  snippet: {
    getSnippet: { pathname: "/api/snippet/getSnippet", method: "POST" },
    setSnippet: { pathname: "/api/snippet/setSnippet", method: "POST" }
  },
  storage: {
    getLocalStorage: { pathname: "/api/storage/getLocalStorage", method: "POST" },
    getRecentDocs: { pathname: "/api/storage/getRecentDocs", method: "POST" },
    setLocalStorage: { pathname: "/api/storage/setLocalStorage", method: "POST" }
  },
  system: {
    bootProgress: { pathname: "/api/system/bootProgress", method: "POST" },
    currentTime: { pathname: "/api/system/currentTime", method: "POST" },
    getConf: { pathname: "/api/system/getConf", method: "POST" },
    version: { pathname: "/api/system/version", method: "POST" }
  },
  template: {
    render: { pathname: "/api/template/render", method: "POST" },
    renderSprig: { pathname: "/api/template/renderSprig", method: "POST" }
  }
});
let Fe = l;
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
      var r = [], s, o, a, c = arguments.length;
      for (o = 0; o < c; o++) {
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
  function e(a, c) {
    return c.length - a.length;
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
  var c;
  return e < 100 && e >= 0 ? (c = new Date(e + 400, t, n, r, s, o, a), isFinite(c.getFullYear()) && c.setFullYear(e)) : c = new Date(e, t, n, r, s, o, a), c;
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
  var o = (7 + n - r) % 7, a = firstWeekOffset(e, r, s), c = 1 + 7 * (t - 1) + o + a, p, d;
  return c <= 0 ? (p = e - 1, d = daysInYear(p) + c) : c > daysInYear(e) ? (p = e + 1, d = c - daysInYear(e)) : (p = e, d = c), {
    year: p,
    dayOfYear: d
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
  function e(h, _) {
    return _.length - h.length;
  }
  var t = [], n = [], r = [], s = [], o, a, c, p, d;
  for (o = 0; o < 7; o++)
    a = createUTC([2e3, 1]).day(o), c = regexEscape(this.weekdaysMin(a, "")), p = regexEscape(this.weekdaysShort(a, "")), d = regexEscape(this.weekdays(a, "")), t.push(c), n.push(p), r.push(d), s.push(c), s.push(p), s.push(d);
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
  var t, n, r = e._i, s = extendedIsoRegex.exec(r) || basicIsoRegex.exec(r), o, a, c, p, d = isoDates.length, h = isoTimes.length;
  if (s) {
    for (getParsingFlags(e).iso = !0, t = 0, n = d; t < n; t++)
      if (isoDates[t][1].exec(s[1])) {
        a = isoDates[t][0], o = isoDates[t][2] !== !1;
        break;
      }
    if (a == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, n = h; t < n; t++)
        if (isoTimes[t][1].exec(s[3])) {
          c = (s[2] || " ") + isoTimes[t][0];
          break;
        }
      if (c == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!o && c != null) {
      e._isValid = !1;
      return;
    }
    if (s[4])
      if (tzRegex.exec(s[4]))
        p = "Z";
      else {
        e._isValid = !1;
        return;
      }
    e._f = a + (c || "") + (p || ""), configFromStringAndFormat(e);
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
  var t, n, r, s, o, a, c, p, d;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (o = 1, a = 4, n = defaults(
    t.GG,
    e._a[YEAR],
    weekOfYear(createLocal(), 1, 4).year
  ), r = defaults(t.W, 1), s = defaults(t.E, 1), (s < 1 || s > 7) && (p = !0)) : (o = e._locale._week.dow, a = e._locale._week.doy, d = weekOfYear(createLocal(), o, a), n = defaults(t.gg, e._a[YEAR], d.year), r = defaults(t.w, d.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (p = !0)) : t.e != null ? (s = t.e + o, (t.e < 0 || t.e > 6) && (p = !0)) : s = o), r < 1 || r > weeksInYear(n, o, a) ? getParsingFlags(e)._overflowWeeks = !0 : p != null ? getParsingFlags(e)._overflowWeekday = !0 : (c = dayOfYearFromWeeks(n, r, s, o, a), e._a[YEAR] = c.year, e._dayOfYear = c.dayOfYear);
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
  var t = "" + e._i, n, r, s, o, a, c = t.length, p = 0, d, h;
  for (s = expandFormat(e._f, e._locale).match(formattingTokens) || [], h = s.length, n = 0; n < h; n++)
    o = s[n], r = (t.match(getParseRegexForToken(o, e)) || [])[0], r && (a = t.substr(0, t.indexOf(r)), a.length > 0 && getParsingFlags(e).unusedInput.push(a), t = t.slice(
      t.indexOf(r) + r.length
    ), p += r.length), formatTokenFunctions[o] ? (r ? getParsingFlags(e).empty = !1 : getParsingFlags(e).unusedTokens.push(o), addTimeToArrayFromToken(o, r, e)) : e._strict && !r && getParsingFlags(e).unusedTokens.push(o);
  getParsingFlags(e).charsLeftOver = c - p, t.length > 0 && getParsingFlags(e).unusedInput.push(t), e._a[HOUR] <= 12 && getParsingFlags(e).bigHour === !0 && e._a[HOUR] > 0 && (getParsingFlags(e).bigHour = void 0), getParsingFlags(e).parsedDateParts = e._a.slice(0), getParsingFlags(e).meridiem = e._meridiem, e._a[HOUR] = meridiemFixWrap(
    e._locale,
    e._a[HOUR],
    e._meridiem
  ), d = getParsingFlags(e).era, d !== null && (e._a[YEAR] = e._locale.erasConvertYear(d, e._a[YEAR])), configFromArray(e), checkOverflow(e);
}
function meridiemFixWrap(e, t, n) {
  var r;
  return n == null ? t : e.meridiemHour != null ? e.meridiemHour(t, n) : (e.isPM != null && (r = e.isPM(n), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function configFromStringAndArray(e) {
  var t, n, r, s, o, a, c = !1, p = e._f.length;
  if (p === 0) {
    getParsingFlags(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < p; s++)
    o = 0, a = !1, t = copyConfig({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], configFromStringAndFormat(t), isValid(t) && (a = !0), o += getParsingFlags(t).charsLeftOver, o += getParsingFlags(t).unusedTokens.length * 10, getParsingFlags(t).score = o, c ? o < r && (r = o, n = t) : (r == null || o < r || a) && (r = o, n = t, a && (c = !0));
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
  var t = normalizeObjectUnits(e), n = t.year || 0, r = t.quarter || 0, s = t.month || 0, o = t.week || t.isoWeek || 0, a = t.day || 0, c = t.hour || 0, p = t.minute || 0, d = t.second || 0, h = t.millisecond || 0;
  this._isValid = isDurationValid(t), this._milliseconds = +h + d * 1e3 + // 1000
  p * 6e4 + // 1000 * 60
  c * 1e3 * 60 * 60, this._days = +a + o * 7, this._months = +s + r * 3 + n * 12, this._data = {}, this._locale = getLocale(), this._bubble();
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
  var r, s, o = this.eras(), a, c, p;
  for (e = e.toUpperCase(), r = 0, s = o.length; r < s; ++r)
    if (a = o[r].name.toUpperCase(), c = o[r].abbr.toUpperCase(), p = o[r].narrow.toUpperCase(), n)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (c === e)
            return o[r];
          break;
        case "NNNN":
          if (a === e)
            return o[r];
          break;
        case "NNNNN":
          if (p === e)
            return o[r];
          break;
      }
    else if ([a, c, p].indexOf(e) >= 0)
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
  var s = getLocale(), o = e ? s._week.dow : 0, a, c = [];
  if (n != null)
    return get$1(t, (n + o) % 7, r, "day");
  for (a = 0; a < 7; a++)
    c[a] = get$1(t, (a + o) % 7, r, "day");
  return c;
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
  var e = this._milliseconds, t = this._days, n = this._months, r = this._data, s, o, a, c, p;
  return e >= 0 && t >= 0 && n >= 0 || e <= 0 && t <= 0 && n <= 0 || (e += absCeil(monthsToDays(n) + t) * 864e5, t = 0, n = 0), r.milliseconds = e % 1e3, s = absFloor(e / 1e3), r.seconds = s % 60, o = absFloor(s / 60), r.minutes = o % 60, a = absFloor(o / 60), r.hours = a % 24, t += absFloor(a / 24), p = absFloor(daysToMonths(t)), n += p, t -= absCeil(monthsToDays(p)), c = absFloor(n / 12), n %= 12, r.days = t, r.months = n, r.years = c, this;
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
  var s = createDuration(e).abs(), o = round(s.as("s")), a = round(s.as("m")), c = round(s.as("h")), p = round(s.as("d")), d = round(s.as("M")), h = round(s.as("w")), _ = round(s.as("y")), O = o <= n.ss && ["s", o] || o < n.s && ["ss", o] || a <= 1 && ["m"] || a < n.m && ["mm", a] || c <= 1 && ["h"] || c < n.h && ["hh", c] || p <= 1 && ["d"] || p < n.d && ["dd", p];
  return n.w != null && (O = O || h <= 1 && ["w"] || h < n.w && ["ww", h]), O = O || d <= 1 && ["M"] || d < n.M && ["MM", d] || _ <= 1 && ["y"] || ["yy", _], O[2] = t, O[3] = +e > 0, O[4] = r, substituteTimeAgo.apply(null, O);
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
  var e = abs$1(this._milliseconds) / 1e3, t = abs$1(this._days), n = abs$1(this._months), r, s, o, a, c = this.asSeconds(), p, d, h, _;
  return c ? (r = absFloor(e / 60), s = absFloor(r / 60), e %= 60, r %= 60, o = absFloor(n / 12), n %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", p = c < 0 ? "-" : "", d = sign(this._months) !== sign(c) ? "-" : "", h = sign(this._days) !== sign(c) ? "-" : "", _ = sign(this._milliseconds) !== sign(c) ? "-" : "", p + "P" + (o ? d + o + "Y" : "") + (n ? d + n + "M" : "") + (t ? h + t + "D" : "") + (s || r || e ? "T" : "") + (s ? _ + s + "H" : "") + (r ? _ + r + "M" : "") + (e ? _ + a + "S" : "")) : "P0D";
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
    hn(this, "map", /* @__PURE__ */ new Map());
    hn(this, "counter", Math.random());
    hn(this, "errerEventListener", async (t) => {
      this.logger.warn(t);
    });
    hn(this, "messageEventListener", async (t) => {
      const n = t.data;
      switch (n.type) {
        case "call": {
          try {
            if (n.uuid && n.uuid !== this.uuid)
              break;
            if (n.handler.name in this.handlers) {
              const r = this.handlers[n.handler.name], s = await r.func.call(r.this, ...n.handler.args), o = {
                type: "return",
                id: n.id,
                handler: {
                  name: n.handler.name,
                  result: s
                }
              };
              this.port.postMessage(o);
            }
          } catch (r) {
            const s = {
              type: "error",
              id: n.id,
              error: r
            };
            this.port.postMessage(s);
          }
          break;
        }
        case "error": {
          const r = this.map.get(n.id);
          r && (this.map.delete(n.id), r.reject(n.error));
          break;
        }
        case "return": {
          const r = this.map.get(n.id);
          r && (this.map.delete(n.id), r.resolve(n.handler.result));
          break;
        }
      }
    });
    this.port = t, this.logger = n, this.handlers = r, this.uuid = s, this.port.addEventListener("error", this.errerEventListener), this.port.addEventListener("messageerror", this.errerEventListener), this.port.addEventListener("message", this.messageEventListener);
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
      const c = {
        type: "call",
        id: a,
        uuid: n,
        handler: {
          name: t,
          args: r
        }
      };
      this.port.postMessage(c);
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
  constructor(n, r, s = {}, o = id()) {
    super(
      // @ts-ignore
      n,
      r,
      s,
      o
    );
    hn(this, "pingEventListener", async (n) => {
      n.data === "ping" && this.port.postMessage("pong");
    });
    this.port.addEventListener("message", this.pingEventListener);
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
    hn(this, "items", []);
    hn(this, "isLocked", !1);
    this.handler = t, this.errorHandler = n, this.interval = r;
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
  JUPYTER_CODE_CELL_ACTION_RUN_CLASS_NAME: "protyle-action__jupyter-client-code-cell-run",
  // 代码单元格运行按钮类名
  JUPYTER_NOTEBOOK_BUTTON_MENU_CLASS_NAME: "protyle-breadcrumb__jupyter-client-notebook-menu",
  // 笔记本菜单按钮类名
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
    inspect: {
      detail_level: 1
    },
    complete: {},
    import: {
      parser: {
        xterm: !1,
        // ⚙
        escaped: !0,
        // ⚙
        cntrl: !0
        // ⚙
      }
    },
    edit: {
      delay: 125
    }
  },
  xterm: {
    options: {
      allowTransparency: !0,
      disableStdin: !0,
      convertEol: !0,
      logLevel: "off",
      fontFamily: ""
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
  var t, n = getLens(e), r = n[0], s = n[1], o = new Arr(_byteLength(e, r, s)), a = 0, c = s > 0 ? r - 4 : r, p;
  for (p = 0; p < c; p += 4)
    t = revLookup[e.charCodeAt(p)] << 18 | revLookup[e.charCodeAt(p + 1)] << 12 | revLookup[e.charCodeAt(p + 2)] << 6 | revLookup[e.charCodeAt(p + 3)], o[a++] = t >> 16 & 255, o[a++] = t >> 8 & 255, o[a++] = t & 255;
  return s === 2 && (t = revLookup[e.charCodeAt(p)] << 2 | revLookup[e.charCodeAt(p + 1)] >> 4, o[a++] = t & 255), s === 1 && (t = revLookup[e.charCodeAt(p)] << 10 | revLookup[e.charCodeAt(p + 1)] << 4 | revLookup[e.charCodeAt(p + 2)] >> 2, o[a++] = t >> 8 & 255, o[a++] = t & 255), o;
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
  for (var t, n = e.length, r = n % 3, s = [], o = 16383, a = 0, c = n - r; a < c; a += o)
    s.push(encodeChunk(e, a, a + o > c ? c : a + o));
  return r === 1 ? (t = e[n - 1], s.push(
    lookup[t >> 2] + lookup[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], s.push(
    lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "="
  )), s.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(e, t, n, r, s) {
  var o, a, c = s * 8 - r - 1, p = (1 << c) - 1, d = p >> 1, h = -7, _ = n ? s - 1 : 0, O = n ? -1 : 1, w = e[t + _];
  for (_ += O, o = w & (1 << -h) - 1, w >>= -h, h += c; h > 0; o = o * 256 + e[t + _], _ += O, h -= 8)
    ;
  for (a = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; a = a * 256 + e[t + _], _ += O, h -= 8)
    ;
  if (o === 0)
    o = 1 - d;
  else {
    if (o === p)
      return a ? NaN : (w ? -1 : 1) * (1 / 0);
    a = a + Math.pow(2, r), o = o - d;
  }
  return (w ? -1 : 1) * a * Math.pow(2, o - r);
};
ieee754.write = function(e, t, n, r, s, o) {
  var a, c, p, d = o * 8 - s - 1, h = (1 << d) - 1, _ = h >> 1, O = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, w = r ? 0 : o - 1, M = r ? 1 : -1, fe = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (c = isNaN(t) ? 1 : 0, a = h) : (a = Math.floor(Math.log(t) / Math.LN2), t * (p = Math.pow(2, -a)) < 1 && (a--, p *= 2), a + _ >= 1 ? t += O / p : t += O * Math.pow(2, 1 - _), t * p >= 2 && (a++, p /= 2), a + _ >= h ? (c = 0, a = h) : a + _ >= 1 ? (c = (t * p - 1) * Math.pow(2, s), a = a + _) : (c = t * Math.pow(2, _ - 1) * Math.pow(2, s), a = 0)); s >= 8; e[n + w] = c & 255, w += M, c /= 256, s -= 8)
    ;
  for (a = a << s | c, d += s; d > 0; e[n + w] = a & 255, w += M, a /= 256, d -= 8)
    ;
  e[n + w - M] |= fe * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const t = base64Js, n = ieee754, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = c, e.SlowBuffer = mt, e.INSPECT_MAX_BYTES = 50;
  const s = 2147483647;
  e.kMaxLength = s, c.TYPED_ARRAY_SUPPORT = o(), !c.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      const b = new Uint8Array(1), f = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(f, Uint8Array.prototype), Object.setPrototypeOf(b, f), b.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (c.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(c.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (c.isBuffer(this))
        return this.byteOffset;
    }
  });
  function a(b) {
    if (b > s)
      throw new RangeError('The value "' + b + '" is invalid for option "size"');
    const f = new Uint8Array(b);
    return Object.setPrototypeOf(f, c.prototype), f;
  }
  function c(b, f, m) {
    if (typeof b == "number") {
      if (typeof f == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return _(b);
    }
    return p(b, f, m);
  }
  c.poolSize = 8192;
  function p(b, f, m) {
    if (typeof b == "string")
      return O(b, f);
    if (ArrayBuffer.isView(b))
      return M(b);
    if (b == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
      );
    if (vn(b, ArrayBuffer) || b && vn(b.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (vn(b, SharedArrayBuffer) || b && vn(b.buffer, SharedArrayBuffer)))
      return fe(b, f, m);
    if (typeof b == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const E = b.valueOf && b.valueOf();
    if (E != null && E !== b)
      return c.from(E, f, m);
    const pt = Ue(b);
    if (pt)
      return pt;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof b[Symbol.toPrimitive] == "function")
      return c.from(b[Symbol.toPrimitive]("string"), f, m);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
    );
  }
  c.from = function(b, f, m) {
    return p(b, f, m);
  }, Object.setPrototypeOf(c.prototype, Uint8Array.prototype), Object.setPrototypeOf(c, Uint8Array);
  function d(b) {
    if (typeof b != "number")
      throw new TypeError('"size" argument must be of type number');
    if (b < 0)
      throw new RangeError('The value "' + b + '" is invalid for option "size"');
  }
  function h(b, f, m) {
    return d(b), b <= 0 ? a(b) : f !== void 0 ? typeof m == "string" ? a(b).fill(f, m) : a(b).fill(f) : a(b);
  }
  c.alloc = function(b, f, m) {
    return h(b, f, m);
  };
  function _(b) {
    return d(b), a(b < 0 ? 0 : wt(b) | 0);
  }
  c.allocUnsafe = function(b) {
    return _(b);
  }, c.allocUnsafeSlow = function(b) {
    return _(b);
  };
  function O(b, f) {
    if ((typeof f != "string" || f === "") && (f = "utf8"), !c.isEncoding(f))
      throw new TypeError("Unknown encoding: " + f);
    const m = gt(b, f) | 0;
    let E = a(m);
    const pt = E.write(b, f);
    return pt !== m && (E = E.slice(0, pt)), E;
  }
  function w(b) {
    const f = b.length < 0 ? 0 : wt(b.length) | 0, m = a(f);
    for (let E = 0; E < f; E += 1)
      m[E] = b[E] & 255;
    return m;
  }
  function M(b) {
    if (vn(b, Uint8Array)) {
      const f = new Uint8Array(b);
      return fe(f.buffer, f.byteOffset, f.byteLength);
    }
    return w(b);
  }
  function fe(b, f, m) {
    if (f < 0 || b.byteLength < f)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (b.byteLength < f + (m || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let E;
    return f === void 0 && m === void 0 ? E = new Uint8Array(b) : m === void 0 ? E = new Uint8Array(b, f) : E = new Uint8Array(b, f, m), Object.setPrototypeOf(E, c.prototype), E;
  }
  function Ue(b) {
    if (c.isBuffer(b)) {
      const f = wt(b.length) | 0, m = a(f);
      return m.length === 0 || b.copy(m, 0, 0, f), m;
    }
    if (b.length !== void 0)
      return typeof b.length != "number" || In(b.length) ? a(0) : w(b);
    if (b.type === "Buffer" && Array.isArray(b.data))
      return w(b.data);
  }
  function wt(b) {
    if (b >= s)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
    return b | 0;
  }
  function mt(b) {
    return +b != b && (b = 0), c.alloc(+b);
  }
  c.isBuffer = function(f) {
    return f != null && f._isBuffer === !0 && f !== c.prototype;
  }, c.compare = function(f, m) {
    if (vn(f, Uint8Array) && (f = c.from(f, f.offset, f.byteLength)), vn(m, Uint8Array) && (m = c.from(m, m.offset, m.byteLength)), !c.isBuffer(f) || !c.isBuffer(m))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (f === m)
      return 0;
    let E = f.length, pt = m.length;
    for (let St = 0, Pt = Math.min(E, pt); St < Pt; ++St)
      if (f[St] !== m[St]) {
        E = f[St], pt = m[St];
        break;
      }
    return E < pt ? -1 : pt < E ? 1 : 0;
  }, c.isEncoding = function(f) {
    switch (String(f).toLowerCase()) {
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
  }, c.concat = function(f, m) {
    if (!Array.isArray(f))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (f.length === 0)
      return c.alloc(0);
    let E;
    if (m === void 0)
      for (m = 0, E = 0; E < f.length; ++E)
        m += f[E].length;
    const pt = c.allocUnsafe(m);
    let St = 0;
    for (E = 0; E < f.length; ++E) {
      let Pt = f[E];
      if (vn(Pt, Uint8Array))
        St + Pt.length > pt.length ? (c.isBuffer(Pt) || (Pt = c.from(Pt)), Pt.copy(pt, St)) : Uint8Array.prototype.set.call(
          pt,
          Pt,
          St
        );
      else if (c.isBuffer(Pt))
        Pt.copy(pt, St);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      St += Pt.length;
    }
    return pt;
  };
  function gt(b, f) {
    if (c.isBuffer(b))
      return b.length;
    if (ArrayBuffer.isView(b) || vn(b, ArrayBuffer))
      return b.byteLength;
    if (typeof b != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof b
      );
    const m = b.length, E = arguments.length > 2 && arguments[2] === !0;
    if (!E && m === 0)
      return 0;
    let pt = !1;
    for (; ; )
      switch (f) {
        case "ascii":
        case "latin1":
        case "binary":
          return m;
        case "utf8":
        case "utf-8":
          return xn(b).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return m * 2;
        case "hex":
          return m >>> 1;
        case "base64":
          return Bn(b).length;
        default:
          if (pt)
            return E ? -1 : xn(b).length;
          f = ("" + f).toLowerCase(), pt = !0;
      }
  }
  c.byteLength = gt;
  function T(b, f, m) {
    let E = !1;
    if ((f === void 0 || f < 0) && (f = 0), f > this.length || ((m === void 0 || m > this.length) && (m = this.length), m <= 0) || (m >>>= 0, f >>>= 0, m <= f))
      return "";
    for (b || (b = "utf8"); ; )
      switch (b) {
        case "hex":
          return kn(this, f, m);
        case "utf8":
        case "utf-8":
          return un(this, f, m);
        case "ascii":
          return Cn(this, f, m);
        case "latin1":
        case "binary":
          return Rn(this, f, m);
        case "base64":
          return ln(this, f, m);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Tn(this, f, m);
        default:
          if (E)
            throw new TypeError("Unknown encoding: " + b);
          b = (b + "").toLowerCase(), E = !0;
      }
  }
  c.prototype._isBuffer = !0;
  function A(b, f, m) {
    const E = b[f];
    b[f] = b[m], b[m] = E;
  }
  c.prototype.swap16 = function() {
    const f = this.length;
    if (f % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let m = 0; m < f; m += 2)
      A(this, m, m + 1);
    return this;
  }, c.prototype.swap32 = function() {
    const f = this.length;
    if (f % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let m = 0; m < f; m += 4)
      A(this, m, m + 3), A(this, m + 1, m + 2);
    return this;
  }, c.prototype.swap64 = function() {
    const f = this.length;
    if (f % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let m = 0; m < f; m += 8)
      A(this, m, m + 7), A(this, m + 1, m + 6), A(this, m + 2, m + 5), A(this, m + 3, m + 4);
    return this;
  }, c.prototype.toString = function() {
    const f = this.length;
    return f === 0 ? "" : arguments.length === 0 ? un(this, 0, f) : T.apply(this, arguments);
  }, c.prototype.toLocaleString = c.prototype.toString, c.prototype.equals = function(f) {
    if (!c.isBuffer(f))
      throw new TypeError("Argument must be a Buffer");
    return this === f ? !0 : c.compare(this, f) === 0;
  }, c.prototype.inspect = function() {
    let f = "";
    const m = e.INSPECT_MAX_BYTES;
    return f = this.toString("hex", 0, m).replace(/(.{2})/g, "$1 ").trim(), this.length > m && (f += " ... "), "<Buffer " + f + ">";
  }, r && (c.prototype[r] = c.prototype.inspect), c.prototype.compare = function(f, m, E, pt, St) {
    if (vn(f, Uint8Array) && (f = c.from(f, f.offset, f.byteLength)), !c.isBuffer(f))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof f
      );
    if (m === void 0 && (m = 0), E === void 0 && (E = f ? f.length : 0), pt === void 0 && (pt = 0), St === void 0 && (St = this.length), m < 0 || E > f.length || pt < 0 || St > this.length)
      throw new RangeError("out of range index");
    if (pt >= St && m >= E)
      return 0;
    if (pt >= St)
      return -1;
    if (m >= E)
      return 1;
    if (m >>>= 0, E >>>= 0, pt >>>= 0, St >>>= 0, this === f)
      return 0;
    let Pt = St - pt, cn = E - m;
    const gn = Math.min(Pt, cn), fn = this.slice(pt, St), _n = f.slice(m, E);
    for (let dn = 0; dn < gn; ++dn)
      if (fn[dn] !== _n[dn]) {
        Pt = fn[dn], cn = _n[dn];
        break;
      }
    return Pt < cn ? -1 : cn < Pt ? 1 : 0;
  };
  function Et(b, f, m, E, pt) {
    if (b.length === 0)
      return -1;
    if (typeof m == "string" ? (E = m, m = 0) : m > 2147483647 ? m = 2147483647 : m < -2147483648 && (m = -2147483648), m = +m, In(m) && (m = pt ? 0 : b.length - 1), m < 0 && (m = b.length + m), m >= b.length) {
      if (pt)
        return -1;
      m = b.length - 1;
    } else if (m < 0)
      if (pt)
        m = 0;
      else
        return -1;
    if (typeof f == "string" && (f = c.from(f, E)), c.isBuffer(f))
      return f.length === 0 ? -1 : ft(b, f, m, E, pt);
    if (typeof f == "number")
      return f = f & 255, typeof Uint8Array.prototype.indexOf == "function" ? pt ? Uint8Array.prototype.indexOf.call(b, f, m) : Uint8Array.prototype.lastIndexOf.call(b, f, m) : ft(b, [f], m, E, pt);
    throw new TypeError("val must be string, number or Buffer");
  }
  function ft(b, f, m, E, pt) {
    let St = 1, Pt = b.length, cn = f.length;
    if (E !== void 0 && (E = String(E).toLowerCase(), E === "ucs2" || E === "ucs-2" || E === "utf16le" || E === "utf-16le")) {
      if (b.length < 2 || f.length < 2)
        return -1;
      St = 2, Pt /= 2, cn /= 2, m /= 2;
    }
    function gn(_n, dn) {
      return St === 1 ? _n[dn] : _n.readUInt16BE(dn * St);
    }
    let fn;
    if (pt) {
      let _n = -1;
      for (fn = m; fn < Pt; fn++)
        if (gn(b, fn) === gn(f, _n === -1 ? 0 : fn - _n)) {
          if (_n === -1 && (_n = fn), fn - _n + 1 === cn)
            return _n * St;
        } else
          _n !== -1 && (fn -= fn - _n), _n = -1;
    } else
      for (m + cn > Pt && (m = Pt - cn), fn = m; fn >= 0; fn--) {
        let _n = !0;
        for (let dn = 0; dn < cn; dn++)
          if (gn(b, fn + dn) !== gn(f, dn)) {
            _n = !1;
            break;
          }
        if (_n)
          return fn;
      }
    return -1;
  }
  c.prototype.includes = function(f, m, E) {
    return this.indexOf(f, m, E) !== -1;
  }, c.prototype.indexOf = function(f, m, E) {
    return Et(this, f, m, E, !0);
  }, c.prototype.lastIndexOf = function(f, m, E) {
    return Et(this, f, m, E, !1);
  };
  function bt(b, f, m, E) {
    m = Number(m) || 0;
    const pt = b.length - m;
    E ? (E = Number(E), E > pt && (E = pt)) : E = pt;
    const St = f.length;
    E > St / 2 && (E = St / 2);
    let Pt;
    for (Pt = 0; Pt < E; ++Pt) {
      const cn = parseInt(f.substr(Pt * 2, 2), 16);
      if (In(cn))
        return Pt;
      b[m + Pt] = cn;
    }
    return Pt;
  }
  function dt(b, f, m, E) {
    return Dn(xn(f, b.length - m), b, m, E);
  }
  function lt(b, f, m, E) {
    return Dn(Gn(f), b, m, E);
  }
  function yt(b, f, m, E) {
    return Dn(Bn(f), b, m, E);
  }
  function At(b, f, m, E) {
    return Dn(Vn(f, b.length - m), b, m, E);
  }
  c.prototype.write = function(f, m, E, pt) {
    if (m === void 0)
      pt = "utf8", E = this.length, m = 0;
    else if (E === void 0 && typeof m == "string")
      pt = m, E = this.length, m = 0;
    else if (isFinite(m))
      m = m >>> 0, isFinite(E) ? (E = E >>> 0, pt === void 0 && (pt = "utf8")) : (pt = E, E = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const St = this.length - m;
    if ((E === void 0 || E > St) && (E = St), f.length > 0 && (E < 0 || m < 0) || m > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    pt || (pt = "utf8");
    let Pt = !1;
    for (; ; )
      switch (pt) {
        case "hex":
          return bt(this, f, m, E);
        case "utf8":
        case "utf-8":
          return dt(this, f, m, E);
        case "ascii":
        case "latin1":
        case "binary":
          return lt(this, f, m, E);
        case "base64":
          return yt(this, f, m, E);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return At(this, f, m, E);
        default:
          if (Pt)
            throw new TypeError("Unknown encoding: " + pt);
          pt = ("" + pt).toLowerCase(), Pt = !0;
      }
  }, c.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function ln(b, f, m) {
    return f === 0 && m === b.length ? t.fromByteArray(b) : t.fromByteArray(b.slice(f, m));
  }
  function un(b, f, m) {
    m = Math.min(b.length, m);
    const E = [];
    let pt = f;
    for (; pt < m; ) {
      const St = b[pt];
      let Pt = null, cn = St > 239 ? 4 : St > 223 ? 3 : St > 191 ? 2 : 1;
      if (pt + cn <= m) {
        let gn, fn, _n, dn;
        switch (cn) {
          case 1:
            St < 128 && (Pt = St);
            break;
          case 2:
            gn = b[pt + 1], (gn & 192) === 128 && (dn = (St & 31) << 6 | gn & 63, dn > 127 && (Pt = dn));
            break;
          case 3:
            gn = b[pt + 1], fn = b[pt + 2], (gn & 192) === 128 && (fn & 192) === 128 && (dn = (St & 15) << 12 | (gn & 63) << 6 | fn & 63, dn > 2047 && (dn < 55296 || dn > 57343) && (Pt = dn));
            break;
          case 4:
            gn = b[pt + 1], fn = b[pt + 2], _n = b[pt + 3], (gn & 192) === 128 && (fn & 192) === 128 && (_n & 192) === 128 && (dn = (St & 15) << 18 | (gn & 63) << 12 | (fn & 63) << 6 | _n & 63, dn > 65535 && dn < 1114112 && (Pt = dn));
        }
      }
      Pt === null ? (Pt = 65533, cn = 1) : Pt > 65535 && (Pt -= 65536, E.push(Pt >>> 10 & 1023 | 55296), Pt = 56320 | Pt & 1023), E.push(Pt), pt += cn;
    }
    return wn(E);
  }
  const yn = 4096;
  function wn(b) {
    const f = b.length;
    if (f <= yn)
      return String.fromCharCode.apply(String, b);
    let m = "", E = 0;
    for (; E < f; )
      m += String.fromCharCode.apply(
        String,
        b.slice(E, E += yn)
      );
    return m;
  }
  function Cn(b, f, m) {
    let E = "";
    m = Math.min(b.length, m);
    for (let pt = f; pt < m; ++pt)
      E += String.fromCharCode(b[pt] & 127);
    return E;
  }
  function Rn(b, f, m) {
    let E = "";
    m = Math.min(b.length, m);
    for (let pt = f; pt < m; ++pt)
      E += String.fromCharCode(b[pt]);
    return E;
  }
  function kn(b, f, m) {
    const E = b.length;
    (!f || f < 0) && (f = 0), (!m || m < 0 || m > E) && (m = E);
    let pt = "";
    for (let St = f; St < m; ++St)
      pt += Kn[b[St]];
    return pt;
  }
  function Tn(b, f, m) {
    const E = b.slice(f, m);
    let pt = "";
    for (let St = 0; St < E.length - 1; St += 2)
      pt += String.fromCharCode(E[St] + E[St + 1] * 256);
    return pt;
  }
  c.prototype.slice = function(f, m) {
    const E = this.length;
    f = ~~f, m = m === void 0 ? E : ~~m, f < 0 ? (f += E, f < 0 && (f = 0)) : f > E && (f = E), m < 0 ? (m += E, m < 0 && (m = 0)) : m > E && (m = E), m < f && (m = f);
    const pt = this.subarray(f, m);
    return Object.setPrototypeOf(pt, c.prototype), pt;
  };
  function mn(b, f, m) {
    if (b % 1 !== 0 || b < 0)
      throw new RangeError("offset is not uint");
    if (b + f > m)
      throw new RangeError("Trying to access beyond buffer length");
  }
  c.prototype.readUintLE = c.prototype.readUIntLE = function(f, m, E) {
    f = f >>> 0, m = m >>> 0, E || mn(f, m, this.length);
    let pt = this[f], St = 1, Pt = 0;
    for (; ++Pt < m && (St *= 256); )
      pt += this[f + Pt] * St;
    return pt;
  }, c.prototype.readUintBE = c.prototype.readUIntBE = function(f, m, E) {
    f = f >>> 0, m = m >>> 0, E || mn(f, m, this.length);
    let pt = this[f + --m], St = 1;
    for (; m > 0 && (St *= 256); )
      pt += this[f + --m] * St;
    return pt;
  }, c.prototype.readUint8 = c.prototype.readUInt8 = function(f, m) {
    return f = f >>> 0, m || mn(f, 1, this.length), this[f];
  }, c.prototype.readUint16LE = c.prototype.readUInt16LE = function(f, m) {
    return f = f >>> 0, m || mn(f, 2, this.length), this[f] | this[f + 1] << 8;
  }, c.prototype.readUint16BE = c.prototype.readUInt16BE = function(f, m) {
    return f = f >>> 0, m || mn(f, 2, this.length), this[f] << 8 | this[f + 1];
  }, c.prototype.readUint32LE = c.prototype.readUInt32LE = function(f, m) {
    return f = f >>> 0, m || mn(f, 4, this.length), (this[f] | this[f + 1] << 8 | this[f + 2] << 16) + this[f + 3] * 16777216;
  }, c.prototype.readUint32BE = c.prototype.readUInt32BE = function(f, m) {
    return f = f >>> 0, m || mn(f, 4, this.length), this[f] * 16777216 + (this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3]);
  }, c.prototype.readBigUInt64LE = Sn(function(f) {
    f = f >>> 0, On(f, "offset");
    const m = this[f], E = this[f + 7];
    (m === void 0 || E === void 0) && En(f, this.length - 8);
    const pt = m + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24, St = this[++f] + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + E * 2 ** 24;
    return BigInt(pt) + (BigInt(St) << BigInt(32));
  }), c.prototype.readBigUInt64BE = Sn(function(f) {
    f = f >>> 0, On(f, "offset");
    const m = this[f], E = this[f + 7];
    (m === void 0 || E === void 0) && En(f, this.length - 8);
    const pt = m * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f], St = this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + E;
    return (BigInt(pt) << BigInt(32)) + BigInt(St);
  }), c.prototype.readIntLE = function(f, m, E) {
    f = f >>> 0, m = m >>> 0, E || mn(f, m, this.length);
    let pt = this[f], St = 1, Pt = 0;
    for (; ++Pt < m && (St *= 256); )
      pt += this[f + Pt] * St;
    return St *= 128, pt >= St && (pt -= Math.pow(2, 8 * m)), pt;
  }, c.prototype.readIntBE = function(f, m, E) {
    f = f >>> 0, m = m >>> 0, E || mn(f, m, this.length);
    let pt = m, St = 1, Pt = this[f + --pt];
    for (; pt > 0 && (St *= 256); )
      Pt += this[f + --pt] * St;
    return St *= 128, Pt >= St && (Pt -= Math.pow(2, 8 * m)), Pt;
  }, c.prototype.readInt8 = function(f, m) {
    return f = f >>> 0, m || mn(f, 1, this.length), this[f] & 128 ? (255 - this[f] + 1) * -1 : this[f];
  }, c.prototype.readInt16LE = function(f, m) {
    f = f >>> 0, m || mn(f, 2, this.length);
    const E = this[f] | this[f + 1] << 8;
    return E & 32768 ? E | 4294901760 : E;
  }, c.prototype.readInt16BE = function(f, m) {
    f = f >>> 0, m || mn(f, 2, this.length);
    const E = this[f + 1] | this[f] << 8;
    return E & 32768 ? E | 4294901760 : E;
  }, c.prototype.readInt32LE = function(f, m) {
    return f = f >>> 0, m || mn(f, 4, this.length), this[f] | this[f + 1] << 8 | this[f + 2] << 16 | this[f + 3] << 24;
  }, c.prototype.readInt32BE = function(f, m) {
    return f = f >>> 0, m || mn(f, 4, this.length), this[f] << 24 | this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3];
  }, c.prototype.readBigInt64LE = Sn(function(f) {
    f = f >>> 0, On(f, "offset");
    const m = this[f], E = this[f + 7];
    (m === void 0 || E === void 0) && En(f, this.length - 8);
    const pt = this[f + 4] + this[f + 5] * 2 ** 8 + this[f + 6] * 2 ** 16 + (E << 24);
    return (BigInt(pt) << BigInt(32)) + BigInt(m + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24);
  }), c.prototype.readBigInt64BE = Sn(function(f) {
    f = f >>> 0, On(f, "offset");
    const m = this[f], E = this[f + 7];
    (m === void 0 || E === void 0) && En(f, this.length - 8);
    const pt = (m << 24) + // Overflow
    this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f];
    return (BigInt(pt) << BigInt(32)) + BigInt(this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + E);
  }), c.prototype.readFloatLE = function(f, m) {
    return f = f >>> 0, m || mn(f, 4, this.length), n.read(this, f, !0, 23, 4);
  }, c.prototype.readFloatBE = function(f, m) {
    return f = f >>> 0, m || mn(f, 4, this.length), n.read(this, f, !1, 23, 4);
  }, c.prototype.readDoubleLE = function(f, m) {
    return f = f >>> 0, m || mn(f, 8, this.length), n.read(this, f, !0, 52, 8);
  }, c.prototype.readDoubleBE = function(f, m) {
    return f = f >>> 0, m || mn(f, 8, this.length), n.read(this, f, !1, 52, 8);
  };
  function pn(b, f, m, E, pt, St) {
    if (!c.isBuffer(b))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (f > pt || f < St)
      throw new RangeError('"value" argument is out of bounds');
    if (m + E > b.length)
      throw new RangeError("Index out of range");
  }
  c.prototype.writeUintLE = c.prototype.writeUIntLE = function(f, m, E, pt) {
    if (f = +f, m = m >>> 0, E = E >>> 0, !pt) {
      const cn = Math.pow(2, 8 * E) - 1;
      pn(this, f, m, E, cn, 0);
    }
    let St = 1, Pt = 0;
    for (this[m] = f & 255; ++Pt < E && (St *= 256); )
      this[m + Pt] = f / St & 255;
    return m + E;
  }, c.prototype.writeUintBE = c.prototype.writeUIntBE = function(f, m, E, pt) {
    if (f = +f, m = m >>> 0, E = E >>> 0, !pt) {
      const cn = Math.pow(2, 8 * E) - 1;
      pn(this, f, m, E, cn, 0);
    }
    let St = E - 1, Pt = 1;
    for (this[m + St] = f & 255; --St >= 0 && (Pt *= 256); )
      this[m + St] = f / Pt & 255;
    return m + E;
  }, c.prototype.writeUint8 = c.prototype.writeUInt8 = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 1, 255, 0), this[m] = f & 255, m + 1;
  }, c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 2, 65535, 0), this[m] = f & 255, this[m + 1] = f >>> 8, m + 2;
  }, c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 2, 65535, 0), this[m] = f >>> 8, this[m + 1] = f & 255, m + 2;
  }, c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 4, 4294967295, 0), this[m + 3] = f >>> 24, this[m + 2] = f >>> 16, this[m + 1] = f >>> 8, this[m] = f & 255, m + 4;
  }, c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 4, 4294967295, 0), this[m] = f >>> 24, this[m + 1] = f >>> 16, this[m + 2] = f >>> 8, this[m + 3] = f & 255, m + 4;
  };
  function Pn(b, f, m, E, pt) {
    Ln(f, E, pt, b, m, 7);
    let St = Number(f & BigInt(4294967295));
    b[m++] = St, St = St >> 8, b[m++] = St, St = St >> 8, b[m++] = St, St = St >> 8, b[m++] = St;
    let Pt = Number(f >> BigInt(32) & BigInt(4294967295));
    return b[m++] = Pt, Pt = Pt >> 8, b[m++] = Pt, Pt = Pt >> 8, b[m++] = Pt, Pt = Pt >> 8, b[m++] = Pt, m;
  }
  function $n(b, f, m, E, pt) {
    Ln(f, E, pt, b, m, 7);
    let St = Number(f & BigInt(4294967295));
    b[m + 7] = St, St = St >> 8, b[m + 6] = St, St = St >> 8, b[m + 5] = St, St = St >> 8, b[m + 4] = St;
    let Pt = Number(f >> BigInt(32) & BigInt(4294967295));
    return b[m + 3] = Pt, Pt = Pt >> 8, b[m + 2] = Pt, Pt = Pt >> 8, b[m + 1] = Pt, Pt = Pt >> 8, b[m] = Pt, m + 8;
  }
  c.prototype.writeBigUInt64LE = Sn(function(f, m = 0) {
    return Pn(this, f, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), c.prototype.writeBigUInt64BE = Sn(function(f, m = 0) {
    return $n(this, f, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), c.prototype.writeIntLE = function(f, m, E, pt) {
    if (f = +f, m = m >>> 0, !pt) {
      const gn = Math.pow(2, 8 * E - 1);
      pn(this, f, m, E, gn - 1, -gn);
    }
    let St = 0, Pt = 1, cn = 0;
    for (this[m] = f & 255; ++St < E && (Pt *= 256); )
      f < 0 && cn === 0 && this[m + St - 1] !== 0 && (cn = 1), this[m + St] = (f / Pt >> 0) - cn & 255;
    return m + E;
  }, c.prototype.writeIntBE = function(f, m, E, pt) {
    if (f = +f, m = m >>> 0, !pt) {
      const gn = Math.pow(2, 8 * E - 1);
      pn(this, f, m, E, gn - 1, -gn);
    }
    let St = E - 1, Pt = 1, cn = 0;
    for (this[m + St] = f & 255; --St >= 0 && (Pt *= 256); )
      f < 0 && cn === 0 && this[m + St + 1] !== 0 && (cn = 1), this[m + St] = (f / Pt >> 0) - cn & 255;
    return m + E;
  }, c.prototype.writeInt8 = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 1, 127, -128), f < 0 && (f = 255 + f + 1), this[m] = f & 255, m + 1;
  }, c.prototype.writeInt16LE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 2, 32767, -32768), this[m] = f & 255, this[m + 1] = f >>> 8, m + 2;
  }, c.prototype.writeInt16BE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 2, 32767, -32768), this[m] = f >>> 8, this[m + 1] = f & 255, m + 2;
  }, c.prototype.writeInt32LE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 4, 2147483647, -2147483648), this[m] = f & 255, this[m + 1] = f >>> 8, this[m + 2] = f >>> 16, this[m + 3] = f >>> 24, m + 4;
  }, c.prototype.writeInt32BE = function(f, m, E) {
    return f = +f, m = m >>> 0, E || pn(this, f, m, 4, 2147483647, -2147483648), f < 0 && (f = 4294967295 + f + 1), this[m] = f >>> 24, this[m + 1] = f >>> 16, this[m + 2] = f >>> 8, this[m + 3] = f & 255, m + 4;
  }, c.prototype.writeBigInt64LE = Sn(function(f, m = 0) {
    return Pn(this, f, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), c.prototype.writeBigInt64BE = Sn(function(f, m = 0) {
    return $n(this, f, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Un(b, f, m, E, pt, St) {
    if (m + E > b.length)
      throw new RangeError("Index out of range");
    if (m < 0)
      throw new RangeError("Index out of range");
  }
  function jn(b, f, m, E, pt) {
    return f = +f, m = m >>> 0, pt || Un(b, f, m, 4), n.write(b, f, m, E, 23, 4), m + 4;
  }
  c.prototype.writeFloatLE = function(f, m, E) {
    return jn(this, f, m, !0, E);
  }, c.prototype.writeFloatBE = function(f, m, E) {
    return jn(this, f, m, !1, E);
  };
  function Nn(b, f, m, E, pt) {
    return f = +f, m = m >>> 0, pt || Un(b, f, m, 8), n.write(b, f, m, E, 52, 8), m + 8;
  }
  c.prototype.writeDoubleLE = function(f, m, E) {
    return Nn(this, f, m, !0, E);
  }, c.prototype.writeDoubleBE = function(f, m, E) {
    return Nn(this, f, m, !1, E);
  }, c.prototype.copy = function(f, m, E, pt) {
    if (!c.isBuffer(f))
      throw new TypeError("argument should be a Buffer");
    if (E || (E = 0), !pt && pt !== 0 && (pt = this.length), m >= f.length && (m = f.length), m || (m = 0), pt > 0 && pt < E && (pt = E), pt === E || f.length === 0 || this.length === 0)
      return 0;
    if (m < 0)
      throw new RangeError("targetStart out of bounds");
    if (E < 0 || E >= this.length)
      throw new RangeError("Index out of range");
    if (pt < 0)
      throw new RangeError("sourceEnd out of bounds");
    pt > this.length && (pt = this.length), f.length - m < pt - E && (pt = f.length - m + E);
    const St = pt - E;
    return this === f && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(m, E, pt) : Uint8Array.prototype.set.call(
      f,
      this.subarray(E, pt),
      m
    ), St;
  }, c.prototype.fill = function(f, m, E, pt) {
    if (typeof f == "string") {
      if (typeof m == "string" ? (pt = m, m = 0, E = this.length) : typeof E == "string" && (pt = E, E = this.length), pt !== void 0 && typeof pt != "string")
        throw new TypeError("encoding must be a string");
      if (typeof pt == "string" && !c.isEncoding(pt))
        throw new TypeError("Unknown encoding: " + pt);
      if (f.length === 1) {
        const Pt = f.charCodeAt(0);
        (pt === "utf8" && Pt < 128 || pt === "latin1") && (f = Pt);
      }
    } else
      typeof f == "number" ? f = f & 255 : typeof f == "boolean" && (f = Number(f));
    if (m < 0 || this.length < m || this.length < E)
      throw new RangeError("Out of range index");
    if (E <= m)
      return this;
    m = m >>> 0, E = E === void 0 ? this.length : E >>> 0, f || (f = 0);
    let St;
    if (typeof f == "number")
      for (St = m; St < E; ++St)
        this[St] = f;
    else {
      const Pt = c.isBuffer(f) ? f : c.from(f, pt), cn = Pt.length;
      if (cn === 0)
        throw new TypeError('The value "' + f + '" is invalid for argument "value"');
      for (St = 0; St < E - m; ++St)
        this[St + m] = Pt[St % cn];
    }
    return this;
  };
  const Mn = {};
  function An(b, f, m) {
    Mn[b] = class extends m {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: f.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${b}]`, this.stack, delete this.name;
      }
      get code() {
        return b;
      }
      set code(pt) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: pt,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${b}]: ${this.message}`;
      }
    };
  }
  An(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(b) {
      return b ? `${b} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), An(
    "ERR_INVALID_ARG_TYPE",
    function(b, f) {
      return `The "${b}" argument must be of type number. Received type ${typeof f}`;
    },
    TypeError
  ), An(
    "ERR_OUT_OF_RANGE",
    function(b, f, m) {
      let E = `The value of "${b}" is out of range.`, pt = m;
      return Number.isInteger(m) && Math.abs(m) > 2 ** 32 ? pt = Fn(String(m)) : typeof m == "bigint" && (pt = String(m), (m > BigInt(2) ** BigInt(32) || m < -(BigInt(2) ** BigInt(32))) && (pt = Fn(pt)), pt += "n"), E += ` It must be ${f}. Received ${pt}`, E;
    },
    RangeError
  );
  function Fn(b) {
    let f = "", m = b.length;
    const E = b[0] === "-" ? 1 : 0;
    for (; m >= E + 4; m -= 3)
      f = `_${b.slice(m - 3, m)}${f}`;
    return `${b.slice(0, m)}${f}`;
  }
  function Yn(b, f, m) {
    On(f, "offset"), (b[f] === void 0 || b[f + m] === void 0) && En(f, b.length - (m + 1));
  }
  function Ln(b, f, m, E, pt, St) {
    if (b > m || b < f) {
      const Pt = typeof f == "bigint" ? "n" : "";
      let cn;
      throw St > 3 ? f === 0 || f === BigInt(0) ? cn = `>= 0${Pt} and < 2${Pt} ** ${(St + 1) * 8}${Pt}` : cn = `>= -(2${Pt} ** ${(St + 1) * 8 - 1}${Pt}) and < 2 ** ${(St + 1) * 8 - 1}${Pt}` : cn = `>= ${f}${Pt} and <= ${m}${Pt}`, new Mn.ERR_OUT_OF_RANGE("value", cn, b);
    }
    Yn(E, pt, St);
  }
  function On(b, f) {
    if (typeof b != "number")
      throw new Mn.ERR_INVALID_ARG_TYPE(f, "number", b);
  }
  function En(b, f, m) {
    throw Math.floor(b) !== b ? (On(b, m), new Mn.ERR_OUT_OF_RANGE(m || "offset", "an integer", b)) : f < 0 ? new Mn.ERR_BUFFER_OUT_OF_BOUNDS() : new Mn.ERR_OUT_OF_RANGE(
      m || "offset",
      `>= ${m ? 1 : 0} and <= ${f}`,
      b
    );
  }
  const Wn = /[^+/0-9A-Za-z-_]/g;
  function Hn(b) {
    if (b = b.split("=")[0], b = b.trim().replace(Wn, ""), b.length < 2)
      return "";
    for (; b.length % 4 !== 0; )
      b = b + "=";
    return b;
  }
  function xn(b, f) {
    f = f || 1 / 0;
    let m;
    const E = b.length;
    let pt = null;
    const St = [];
    for (let Pt = 0; Pt < E; ++Pt) {
      if (m = b.charCodeAt(Pt), m > 55295 && m < 57344) {
        if (!pt) {
          if (m > 56319) {
            (f -= 3) > -1 && St.push(239, 191, 189);
            continue;
          } else if (Pt + 1 === E) {
            (f -= 3) > -1 && St.push(239, 191, 189);
            continue;
          }
          pt = m;
          continue;
        }
        if (m < 56320) {
          (f -= 3) > -1 && St.push(239, 191, 189), pt = m;
          continue;
        }
        m = (pt - 55296 << 10 | m - 56320) + 65536;
      } else
        pt && (f -= 3) > -1 && St.push(239, 191, 189);
      if (pt = null, m < 128) {
        if ((f -= 1) < 0)
          break;
        St.push(m);
      } else if (m < 2048) {
        if ((f -= 2) < 0)
          break;
        St.push(
          m >> 6 | 192,
          m & 63 | 128
        );
      } else if (m < 65536) {
        if ((f -= 3) < 0)
          break;
        St.push(
          m >> 12 | 224,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else if (m < 1114112) {
        if ((f -= 4) < 0)
          break;
        St.push(
          m >> 18 | 240,
          m >> 12 & 63 | 128,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return St;
  }
  function Gn(b) {
    const f = [];
    for (let m = 0; m < b.length; ++m)
      f.push(b.charCodeAt(m) & 255);
    return f;
  }
  function Vn(b, f) {
    let m, E, pt;
    const St = [];
    for (let Pt = 0; Pt < b.length && !((f -= 2) < 0); ++Pt)
      m = b.charCodeAt(Pt), E = m >> 8, pt = m % 256, St.push(pt), St.push(E);
    return St;
  }
  function Bn(b) {
    return t.toByteArray(Hn(b));
  }
  function Dn(b, f, m, E) {
    let pt;
    for (pt = 0; pt < E && !(pt + m >= f.length || pt >= b.length); ++pt)
      f[pt + m] = b[pt];
    return pt;
  }
  function vn(b, f) {
    return b instanceof f || b != null && b.constructor != null && b.constructor.name != null && b.constructor.name === f.name;
  }
  function In(b) {
    return b !== b;
  }
  const Kn = function() {
    const b = "0123456789abcdef", f = new Array(256);
    for (let m = 0; m < 16; ++m) {
      const E = m * 16;
      for (let pt = 0; pt < 16; ++pt)
        f[E + pt] = b[m] + b[pt];
    }
    return f;
  }();
  function Sn(b) {
    return typeof BigInt > "u" ? zn : b;
  }
  function zn() {
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
function base64ToDataURL(e, t) {
  return `data:${t};base64,${e}`;
}
function base64ToBlob(e, t) {
  const n = base64ToDataURL(e, t);
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
  for (let c = 0; c < e.length; ) {
    if ((n = e.charCodeAt(c++)) > 255 || (r = e.charCodeAt(c++)) > 255 || (s = e.charCodeAt(c++)) > 255)
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
  const s = Object.entries(r).map(([p, d]) => `${p}="${d}"`).join(" "), o = {
    id: "content",
    "data-stream": encode$1(e, !0)
  }, a = Object.entries(o).map(([p, d]) => `${p}="${d}"`).join(" "), c = escape(
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
${c}
</pre>`,
    "</jupyter-xterm-output>",
    "</div>"
  ].join(`
`);
}
const bn = class bn {
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
    return this.text = this.text.replaceAll(bn.REGEXP.mark, "\\$1"), this;
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
    for (let c = 0; c < s; ++c) {
      const p = r[c];
      switch (p) {
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
          n[o++] = p;
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
    const n = t ? bn.REGEXP.escaped.richtext : bn.REGEXP.richtext, r = {
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
    }, c = () => {
      a(), r.strong = !1, r.em = !1, r.s = !1, r.u = !1, o = {};
    };
    return this.text = this.text.replaceAll(/\x1bc/g, "").replaceAll(/\x1b\\?\[\\?\?\d+[lh]/g, "").replaceAll(/\x1b\\?\[\d*(\\?;\d+)*[a-ln-zA-Z]/g, "").replaceAll(
      n,
      (p, d, h, _, O) => {
        let w = "";
        const M = d.replaceAll("\\;", ";").split(";");
        for (const mt of M) {
          const gt = parseInt(mt) || 0;
          if (s.mode) {
            if (gt >= 0 && gt <= 255)
              switch (s.mode) {
                case 2:
                  switch (s.color.startsWith("#") || (s.color = "#"), s.color.length) {
                    case 1:
                    case 3:
                      s.color += gt.toString(16).toUpperCase().padStart(2, "0");
                      continue;
                    case 5:
                      s.color += gt.toString(16).toUpperCase().padStart(2, "0"), s.ground && (o[s.ground] = s.color);
                      break;
                  }
                  break;
                case 5:
                  s.color = `var(--custom-jupyter-256-color-${gt.toString().padStart(3, "0")})`, s.ground && (o[s.ground] = s.color);
                  break;
              }
            a();
          } else
            switch (gt) {
              case 0:
                c();
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
                const A = gt / 10 | 0, Et = gt % 10;
                switch (A) {
                  case 1:
                    continue;
                  case 2:
                    switch (Et) {
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
                switch (A) {
                  case 3:
                  case 4:
                    switch (Et) {
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
                    switch (Et) {
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
        const fe = [];
        r.strong && fe.push("strong"), r.em && fe.push("em"), r.s && fe.push("s"), r.u && fe.push("u"), isEmptyObject(o) || fe.push("text");
        const Ue = fe.length > 0 ? `<span data-type="${fe.join(" ")}">` : "", wt = fe.length > 0 ? "</span>" : "";
        return isEmptyObject(o) || (w = createIAL({ style: createStyle(o) })), h.replaceAll(`\r
`, `
`).replaceAll(/\n{2,}/g, `

`).split(`

`).map(
          (mt) => bn.ZWS + mt.split(`
`).map((gt) => gt.length > 0 ? (fe.length > 0 && t && (gt = gt.replaceAll(bn.REGEXP.escaped.mark, "$1")), `${Ue}${gt}${wt}${w}`) : "").join(`
`)
        ).join(`

`);
      }
    ), this;
  }
  /* 移除控制台 ANSI 转义序列(保留 \b, \r) */
  removeCmdControlChars() {
    return this.text = this.text.replaceAll(bn.REGEXP.ANSIesc, ""), this;
  }
  /**
   * 移除控制台 ANSI 转义序列
   * @see {@link https://www.npmjs.com/package/strip-ansi}
   */
  stripAnsi() {
    return this.text = stripAnsi(this.text), this;
  }
};
hn(bn, "ZWS", "​"), // 零宽空格
hn(bn, "REGEXP", {
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
let Output = bn;
function parseText(e = "", t, n) {
  const r = new Output(e);
  return t.xterm ? r.buildXtermElement(n) : (t.escaped && r.escapeMark(), t.cntrl ? r.parseCmdControlChars(t.escaped) : r.removeCmdControlChars()), r.toString();
}
async function parseData(e, t, n, r, s = !1) {
  let o;
  const a = new PriorityQueue();
  for (const [p, d] of Object.entries(n)) {
    if (Array.isArray(d) && d.length === 0)
      continue;
    const h = p.split(";")[0], _ = h.split("/")[0], O = h.split("/")[1], w = O.split("+")[0];
    O.split("+")[1];
    const M = Array.isArray(d) ? d.join(`
`) : d;
    switch (_) {
      case "text":
        const fe = Array.isArray(M) ? M.join(`

`) : M;
        switch (O) {
          case "plain":
            a.enqueue(parseText(fe, t), 0);
            break;
          case "html":
            a.enqueue(`<div>${fe.replaceAll(/\n+/g, `
`)}</div>`, 1);
            break;
          case "markdown":
            a.enqueue(fe, 1);
            break;
          default:
            a.enqueue(`\`\`\`${w}
${fe}
\`\`\``, 2);
            break;
        }
        break;
      case "image": {
        switch (O) {
          case "svg+xml":
            o = btoa(M);
            break;
          default:
            o = M.split(`
`)[0];
            break;
        }
        const Ue = n["text/plain"], wt = Array.isArray(Ue) ? Ue.join(" ") : Ue, mt = `jupyter-output.${w}`, gt = base64ToFile(o, p, mt);
        if (gt) {
          const A = (await e.upload({ files: [gt] })).data.succMap[mt], Et = r != null && r.needs_background ? createIAL({
            style: createStyle({
              background: r.needs_background === "light" ? "white" : "black"
            })
          }) : "";
          A && a.enqueue(`![${mt}](${A}${isString(wt) ? ` "${wt.replaceAll('"', "&quot;")}"` : ""})${Et}`, 3);
        }
        break;
      }
      case "audio": {
        switch (O) {
          default:
            o = M.split(`
`)[0];
            break;
        }
        const Ue = `jupyter-output.${w}`, wt = base64ToFile(o, p, Ue);
        if (wt) {
          const gt = (await e.upload({ files: [wt] })).data.succMap[Ue];
          gt && a.enqueue(`<audio controls="controls" src="${gt}" data-src="${gt}"/>`, 3);
        }
        break;
      }
      case "video":
        {
          switch (O) {
            default:
              o = M.split(`
`)[0];
              break;
          }
          const Ue = `jupyter-output.${w}`, wt = base64ToFile(o, p, Ue);
          if (wt) {
            const gt = (await e.upload({ files: [wt] })).data.succMap[Ue];
            gt && a.enqueue(`<video controls="controls" src="${gt}" data-src="${gt}"/>`, 3);
          }
        }
        break;
      case "application":
        switch (O) {
          case "json":
            a.enqueue(`\`\`\`json
${JSON.stringify(M, void 0, 4)}
\`\`\``, 4);
            break;
          default:
            a.enqueue(parseText(`[${p}]`, t), 4);
            break;
        }
        break;
      default:
        a.enqueue(parseText(`[${p}]`, t), 4);
        break;
    }
  }
  const c = a.items.map((p) => p.value);
  return s ? c : c.join(`

`);
}
class IpynbImport {
  // 导入的文档块属性
  constructor(t, n) {
    hn(this, "ipynb");
    // 文件内容
    hn(this, "cells");
    // 内容块
    hn(this, "language");
    // 单元格语言
    hn(this, "metadata");
    // notebook 元数据
    hn(this, "nbformat");
    // 缩进长度
    hn(this, "nbformat_minor");
    // 次要缩进长度
    hn(this, "kramdowns");
    // 导入的 kramdown 字符串数组
    hn(this, "attributes");
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
    var r, s, o, a, c, p;
    this.language = ((r = this.metadata.kernelspec) == null ? void 0 : r.language) ?? ((s = this.metadata.language_info) == null ? void 0 : s.name) ?? ((o = this.metadata.language_info) == null ? void 0 : o.nbconvert_exporter), this.attributes[CONSTANTS.attrs.kernel.language] = this.language;
    const t = ((a = this.metadata.kernelspec) == null ? void 0 : a.name) ?? this.metadata.kernel_info.name;
    this.attributes[CONSTANTS.attrs.kernel.name] = t;
    const n = ((c = this.metadata.kernelspec) == null ? void 0 : c.display_name) ?? ((p = this.metadata.kernelspec) == null ? void 0 : p.name) ?? this.metadata.kernel_info.name;
    return this.attributes[CONSTANTS.attrs.kernel.display_name] = n, this;
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
        for (let c = 0; c < t.source.length; ++c) {
          const p = t.source[c];
          if (/^#{1,6}\s/.test(p)) {
            for (let d = 0; d < p.length && d < 6; ++d)
              if (p.charAt(d) !== "#") {
                d + 1 < a && (a = d + 1, o = c);
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
    var M, fe, Ue, wt, mt, gt, T, A, Et;
    const n = [], r = ((M = t.execution_count) == null ? void 0 : M.toString()) ?? "*", s = (Ue = (fe = t.metadata) == null ? void 0 : fe.jupyter) == null ? void 0 : Ue.source_hidden, o = (mt = (wt = t.metadata) == null ? void 0 : wt.jupyter) == null ? void 0 : mt.outputs_hidden, a = this.id, c = this.id, p = (gt = t.metadata.execution) == null ? void 0 : gt["iopub.execute_input"], d = (T = t.metadata.execution) == null ? void 0 : T["iopub.status.busy"], h = (A = t.metadata.execution) == null ? void 0 : A["iopub.status.idle"], _ = (Et = t.metadata.execution) == null ? void 0 : Et["shell.execute_reply"], O = {
      id: a,
      [CONSTANTS.attrs.code.index]: r,
      [CONSTANTS.attrs.code.output]: c,
      [CONSTANTS.attrs.code.type.key]: CONSTANTS.attrs.code.type.value,
      fold: s ? "1" : null,
      [CONSTANTS.attrs.code.execute_input]: p,
      [CONSTANTS.attrs.code.execute_reply]: d,
      [CONSTANTS.attrs.code.busy]: h,
      [CONSTANTS.attrs.code.idle]: _
    }, w = {
      id: c,
      [CONSTANTS.attrs.output.index]: r,
      [CONSTANTS.attrs.output.code]: a,
      [CONSTANTS.attrs.output.type.key]: CONSTANTS.attrs.output.type.value,
      fold: o ? "1" : null
    };
    return n.push(
      `\`\`\`${this.language}`,
      this.parseSource(t.source),
      "```",
      createIAL(O)
    ), n.push(
      "{{{row",
      "---"
    ), t.outputs && n.push(await this.parseOutputs(t.outputs)), n.push(
      "",
      "---",
      "}}}",
      createIAL(w)
    ), n.join(`
`);
  }
  /**
   * 解析 raw 块
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#raw-nbconvert-cells
   */
  async parseRaw(t) {
    var a, c, p;
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
    return (p = (c = t.metadata) == null ? void 0 : c.jupyter) != null && p.source_hidden && o.push(createIAL({ fold: "1" })), o.join(`
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
          const c = Array.isArray(a) ? a[0] : a, p = base64ToFile(c, o, r);
          if (p) {
            const h = (await this.client.upload({ files: [p] })).data.succMap[r];
            n.set(r, h);
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
              n.push("{{{row"), n.push(a), n.push("}}}"), n.push(createIAL({ style: CONSTANTS.styles.warning }));
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
  function t(ft, bt, dt = 0, lt = -1) {
    let yt = ft.length;
    if (yt === 0)
      return -1;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At;
    lt < dt ? At = lt + 1 + (yt - dt) : At = lt - dt + 1;
    for (let ln = 0; ln < At; ++ln) {
      let un = (dt + ln) % yt;
      if (ft[un] === bt)
        return un;
    }
    return -1;
  }
  e.firstIndexOf = t;
  function n(ft, bt, dt = -1, lt = 0) {
    let yt = ft.length;
    if (yt === 0)
      return -1;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At;
    dt < lt ? At = dt + 1 + (yt - lt) : At = dt - lt + 1;
    for (let ln = 0; ln < At; ++ln) {
      let un = (dt - ln + yt) % yt;
      if (ft[un] === bt)
        return un;
    }
    return -1;
  }
  e.lastIndexOf = n;
  function r(ft, bt, dt = 0, lt = -1) {
    let yt = ft.length;
    if (yt === 0)
      return -1;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At;
    lt < dt ? At = lt + 1 + (yt - dt) : At = lt - dt + 1;
    for (let ln = 0; ln < At; ++ln) {
      let un = (dt + ln) % yt;
      if (bt(ft[un], un))
        return un;
    }
    return -1;
  }
  e.findFirstIndex = r;
  function s(ft, bt, dt = -1, lt = 0) {
    let yt = ft.length;
    if (yt === 0)
      return -1;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At;
    dt < lt ? At = dt + 1 + (yt - lt) : At = dt - lt + 1;
    for (let ln = 0; ln < At; ++ln) {
      let un = (dt - ln + yt) % yt;
      if (bt(ft[un], un))
        return un;
    }
    return -1;
  }
  e.findLastIndex = s;
  function o(ft, bt, dt = 0, lt = -1) {
    let yt = r(ft, bt, dt, lt);
    return yt !== -1 ? ft[yt] : void 0;
  }
  e.findFirstValue = o;
  function a(ft, bt, dt = -1, lt = 0) {
    let yt = s(ft, bt, dt, lt);
    return yt !== -1 ? ft[yt] : void 0;
  }
  e.findLastValue = a;
  function c(ft, bt, dt, lt = 0, yt = -1) {
    let At = ft.length;
    if (At === 0)
      return 0;
    lt < 0 ? lt = Math.max(0, lt + At) : lt = Math.min(lt, At - 1), yt < 0 ? yt = Math.max(0, yt + At) : yt = Math.min(yt, At - 1);
    let ln = lt, un = yt - lt + 1;
    for (; un > 0; ) {
      let yn = un >> 1, wn = ln + yn;
      dt(ft[wn], bt) < 0 ? (ln = wn + 1, un -= yn + 1) : un = yn;
    }
    return ln;
  }
  e.lowerBound = c;
  function p(ft, bt, dt, lt = 0, yt = -1) {
    let At = ft.length;
    if (At === 0)
      return 0;
    lt < 0 ? lt = Math.max(0, lt + At) : lt = Math.min(lt, At - 1), yt < 0 ? yt = Math.max(0, yt + At) : yt = Math.min(yt, At - 1);
    let ln = lt, un = yt - lt + 1;
    for (; un > 0; ) {
      let yn = un >> 1, wn = ln + yn;
      dt(ft[wn], bt) > 0 ? un = yn : (ln = wn + 1, un -= yn + 1);
    }
    return ln;
  }
  e.upperBound = p;
  function d(ft, bt, dt) {
    if (ft === bt)
      return !0;
    if (ft.length !== bt.length)
      return !1;
    for (let lt = 0, yt = ft.length; lt < yt; ++lt)
      if (dt ? !dt(ft[lt], bt[lt]) : ft[lt] !== bt[lt])
        return !1;
    return !0;
  }
  e.shallowEqual = d;
  function h(ft, bt = {}) {
    let { start: dt, stop: lt, step: yt } = bt;
    if (yt === void 0 && (yt = 1), yt === 0)
      throw new Error("Slice `step` cannot be zero.");
    let At = ft.length;
    dt === void 0 ? dt = yt < 0 ? At - 1 : 0 : dt < 0 ? dt = Math.max(dt + At, yt < 0 ? -1 : 0) : dt >= At && (dt = yt < 0 ? At - 1 : At), lt === void 0 ? lt = yt < 0 ? -1 : At : lt < 0 ? lt = Math.max(lt + At, yt < 0 ? -1 : 0) : lt >= At && (lt = yt < 0 ? At - 1 : At);
    let ln;
    yt < 0 && lt >= dt || yt > 0 && dt >= lt ? ln = 0 : yt < 0 ? ln = Math.floor((lt - dt + 1) / yt + 1) : ln = Math.floor((lt - dt - 1) / yt + 1);
    let un = [];
    for (let yn = 0; yn < ln; ++yn)
      un[yn] = ft[dt + yn * yt];
    return un;
  }
  e.slice = h;
  function _(ft, bt, dt) {
    let lt = ft.length;
    if (lt <= 1 || (bt < 0 ? bt = Math.max(0, bt + lt) : bt = Math.min(bt, lt - 1), dt < 0 ? dt = Math.max(0, dt + lt) : dt = Math.min(dt, lt - 1), bt === dt))
      return;
    let yt = ft[bt], At = bt < dt ? 1 : -1;
    for (let ln = bt; ln !== dt; ln += At)
      ft[ln] = ft[ln + At];
    ft[dt] = yt;
  }
  e.move = _;
  function O(ft, bt = 0, dt = -1) {
    let lt = ft.length;
    if (!(lt <= 1))
      for (bt < 0 ? bt = Math.max(0, bt + lt) : bt = Math.min(bt, lt - 1), dt < 0 ? dt = Math.max(0, dt + lt) : dt = Math.min(dt, lt - 1); bt < dt; ) {
        let yt = ft[bt], At = ft[dt];
        ft[bt++] = At, ft[dt--] = yt;
      }
  }
  e.reverse = O;
  function w(ft, bt, dt = 0, lt = -1) {
    let yt = ft.length;
    if (yt <= 1 || (dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1), dt >= lt))
      return;
    let At = lt - dt + 1;
    if (bt > 0 ? bt = bt % At : bt < 0 && (bt = (bt % At + At) % At), bt === 0)
      return;
    let ln = dt + bt;
    O(ft, dt, ln - 1), O(ft, ln, lt), O(ft, dt, lt);
  }
  e.rotate = w;
  function M(ft, bt, dt = 0, lt = -1) {
    let yt = ft.length;
    if (yt === 0)
      return;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At;
    lt < dt ? At = lt + 1 + (yt - dt) : At = lt - dt + 1;
    for (let ln = 0; ln < At; ++ln)
      ft[(dt + ln) % yt] = bt;
  }
  e.fill = M;
  function fe(ft, bt, dt) {
    let lt = ft.length;
    bt < 0 ? bt = Math.max(0, bt + lt) : bt = Math.min(bt, lt);
    for (let yt = lt; yt > bt; --yt)
      ft[yt] = ft[yt - 1];
    ft[bt] = dt;
  }
  e.insert = fe;
  function Ue(ft, bt) {
    let dt = ft.length;
    if (bt < 0 && (bt += dt), bt < 0 || bt >= dt)
      return;
    let lt = ft[bt];
    for (let yt = bt + 1; yt < dt; ++yt)
      ft[yt - 1] = ft[yt];
    return ft.length = dt - 1, lt;
  }
  e.removeAt = Ue;
  function wt(ft, bt, dt = 0, lt = -1) {
    let yt = t(ft, bt, dt, lt);
    return yt !== -1 && Ue(ft, yt), yt;
  }
  e.removeFirstOf = wt;
  function mt(ft, bt, dt = -1, lt = 0) {
    let yt = n(ft, bt, dt, lt);
    return yt !== -1 && Ue(ft, yt), yt;
  }
  e.removeLastOf = mt;
  function gt(ft, bt, dt = 0, lt = -1) {
    let yt = ft.length;
    if (yt === 0)
      return 0;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At = 0;
    for (let ln = 0; ln < yt; ++ln)
      dt <= lt && ln >= dt && ln <= lt && ft[ln] === bt || lt < dt && (ln <= lt || ln >= dt) && ft[ln] === bt ? At++ : At > 0 && (ft[ln - At] = ft[ln]);
    return At > 0 && (ft.length = yt - At), At;
  }
  e.removeAllOf = gt;
  function T(ft, bt, dt = 0, lt = -1) {
    let yt, At = r(ft, bt, dt, lt);
    return At !== -1 && (yt = Ue(ft, At)), { index: At, value: yt };
  }
  e.removeFirstWhere = T;
  function A(ft, bt, dt = -1, lt = 0) {
    let yt, At = s(ft, bt, dt, lt);
    return At !== -1 && (yt = Ue(ft, At)), { index: At, value: yt };
  }
  e.removeLastWhere = A;
  function Et(ft, bt, dt = 0, lt = -1) {
    let yt = ft.length;
    if (yt === 0)
      return 0;
    dt < 0 ? dt = Math.max(0, dt + yt) : dt = Math.min(dt, yt - 1), lt < 0 ? lt = Math.max(0, lt + yt) : lt = Math.min(lt, yt - 1);
    let At = 0;
    for (let ln = 0; ln < yt; ++ln)
      dt <= lt && ln >= dt && ln <= lt && bt(ft[ln], ln) || lt < dt && (ln <= lt || ln >= dt) && bt(ft[ln], ln) ? At++ : At > 0 && (ft[ln - At] = ft[ln]);
    return At > 0 && (ft.length = yt - At), At;
  }
  e.removeAllWhere = Et;
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
  function t(a, c, p = 0) {
    let d = new Array(c.length);
    for (let h = 0, _ = p, O = c.length; h < O; ++h, ++_) {
      if (_ = a.indexOf(c[h], _), _ === -1)
        return null;
      d[h] = _;
    }
    return d;
  }
  e.findIndices = t;
  function n(a, c, p = 0) {
    let d = t(a, c, p);
    if (!d)
      return null;
    let h = 0;
    for (let _ = 0, O = d.length; _ < O; ++_) {
      let w = d[_] - p;
      h += w * w;
    }
    return { score: h, indices: d };
  }
  e.matchSumOfSquares = n;
  function r(a, c, p = 0) {
    let d = t(a, c, p);
    if (!d)
      return null;
    let h = 0, _ = p - 1;
    for (let O = 0, w = d.length; O < w; ++O) {
      let M = d[O];
      h += M - _ - 1, _ = M;
    }
    return { score: h, indices: d };
  }
  e.matchSumOfDeltas = r;
  function s(a, c, p) {
    let d = [], h = 0, _ = 0, O = c.length;
    for (; h < O; ) {
      let w = c[h], M = c[h];
      for (; ++h < O && c[h] === M + 1; )
        M++;
      _ < w && d.push(a.slice(_, w)), w < M + 1 && d.push(p(a.slice(w, M + 1))), _ = M + 1;
    }
    return _ < a.length && d.push(a.slice(_)), d;
  }
  e.highlight = s;
  function o(a, c) {
    return a < c ? -1 : a > c ? 1 : 0;
  }
  e.cmp = o;
})(StringExt || (StringExt = {}));
var JSONExt;
(function(e) {
  e.emptyObject = Object.freeze({}), e.emptyArray = Object.freeze([]);
  function t(h) {
    return h === null || typeof h == "boolean" || typeof h == "number" || typeof h == "string";
  }
  e.isPrimitive = t;
  function n(h) {
    return Array.isArray(h);
  }
  e.isArray = n;
  function r(h) {
    return !t(h) && !n(h);
  }
  e.isObject = r;
  function s(h, _) {
    if (h === _)
      return !0;
    if (t(h) || t(_))
      return !1;
    let O = n(h), w = n(_);
    return O !== w ? !1 : O && w ? a(h, _) : c(h, _);
  }
  e.deepEqual = s;
  function o(h) {
    return t(h) ? h : n(h) ? p(h) : d(h);
  }
  e.deepCopy = o;
  function a(h, _) {
    if (h === _)
      return !0;
    if (h.length !== _.length)
      return !1;
    for (let O = 0, w = h.length; O < w; ++O)
      if (!s(h[O], _[O]))
        return !1;
    return !0;
  }
  function c(h, _) {
    if (h === _)
      return !0;
    for (let O in h)
      if (h[O] !== void 0 && !(O in _))
        return !1;
    for (let O in _)
      if (_[O] !== void 0 && !(O in h))
        return !1;
    for (let O in h) {
      let w = h[O], M = _[O];
      if (!(w === void 0 && M === void 0) && (w === void 0 || M === void 0 || !s(w, M)))
        return !1;
    }
    return !0;
  }
  function p(h) {
    let _ = new Array(h.length);
    for (let O = 0, w = h.length; O < w; ++O)
      _[O] = o(h[O]);
    return _;
  }
  function d(h) {
    let _ = {};
    for (let O in h) {
      let w = h[O];
      w !== void 0 && (_[O] = o(w));
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
  function t(p, d) {
    Private$8.disconnectBetween(p, d);
  }
  e.disconnectBetween = t;
  function n(p) {
    Private$8.disconnectSender(p);
  }
  e.disconnectSender = n;
  function r(p) {
    Private$8.disconnectReceiver(p);
  }
  e.disconnectReceiver = r;
  function s(p) {
    Private$8.disconnectAll(p);
  }
  e.disconnectAll = s;
  function o(p) {
    Private$8.disconnectAll(p);
  }
  e.clearData = o;
  function a() {
    return Private$8.exceptionHandler;
  }
  e.getExceptionHandler = a;
  function c(p) {
    let d = Private$8.exceptionHandler;
    return Private$8.exceptionHandler = p, d;
  }
  e.setExceptionHandler = c;
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
  e.exceptionHandler = (mt) => {
    console.error(mt);
  };
  function t(mt, gt, T) {
    T = T || void 0;
    let A = p.get(mt.sender);
    if (A || (A = [], p.set(mt.sender, A)), O(A, mt, gt, T))
      return !1;
    let Et = T || gt, ft = d.get(Et);
    ft || (ft = [], d.set(Et, ft));
    let bt = { signal: mt, slot: gt, thisArg: T };
    return A.push(bt), ft.push(bt), !0;
  }
  e.connect = t;
  function n(mt, gt, T) {
    T = T || void 0;
    let A = p.get(mt.sender);
    if (!A || A.length === 0)
      return !1;
    let Et = O(A, mt, gt, T);
    if (!Et)
      return !1;
    let ft = T || gt, bt = d.get(ft);
    return Et.signal = null, M(A), M(bt), !0;
  }
  e.disconnect = n;
  function r(mt, gt) {
    let T = p.get(mt);
    if (!T || T.length === 0)
      return;
    let A = d.get(gt);
    if (!(!A || A.length === 0)) {
      for (const Et of A)
        Et.signal && Et.signal.sender === mt && (Et.signal = null);
      M(T), M(A);
    }
  }
  e.disconnectBetween = r;
  function s(mt) {
    let gt = p.get(mt);
    if (!(!gt || gt.length === 0)) {
      for (const T of gt) {
        if (!T.signal)
          continue;
        let A = T.thisArg || T.slot;
        T.signal = null, M(d.get(A));
      }
      M(gt);
    }
  }
  e.disconnectSender = s;
  function o(mt) {
    let gt = d.get(mt);
    if (!(!gt || gt.length === 0)) {
      for (const T of gt) {
        if (!T.signal)
          continue;
        let A = T.signal.sender;
        T.signal = null, M(p.get(A));
      }
      M(gt);
    }
  }
  e.disconnectReceiver = o;
  function a(mt) {
    s(mt), o(mt);
  }
  e.disconnectAll = a;
  function c(mt, gt) {
    let T = p.get(mt.sender);
    if (!(!T || T.length === 0))
      for (let A = 0, Et = T.length; A < Et; ++A) {
        let ft = T[A];
        ft.signal === mt && w(ft, gt);
      }
  }
  e.emit = c;
  const p = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new Set(), _ = (() => typeof requestAnimationFrame == "function" ? requestAnimationFrame : setImmediate)();
  function O(mt, gt, T, A) {
    return find(mt, (Et) => Et.signal === gt && Et.slot === T && Et.thisArg === A);
  }
  function w(mt, gt) {
    let { signal: T, slot: A, thisArg: Et } = mt;
    try {
      A.call(Et, T.sender, gt);
    } catch (ft) {
      e.exceptionHandler(ft);
    }
  }
  function M(mt) {
    h.size === 0 && _(fe), h.add(mt);
  }
  function fe() {
    h.forEach(Ue), h.clear();
  }
  function Ue(mt) {
    ArrayExt.removeAllWhere(mt, wt);
  }
  function wt(mt) {
    return mt.signal === null;
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
      constructor(c) {
        this.startLine = c, this.code = "", this.endLine = -1;
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
      const c = a.split(`
`), p = [];
      let d = null;
      for (let h = 0; h < c.length; h++) {
        const _ = c[h], O = _.indexOf(t.CODE_BLOCK_MARKER) === 0, w = d != null;
        if (!(!O && !w))
          if (w)
            d && (O ? (d.endLine = h - 1, p.push(d), d = null) : d.code += _ + `
`);
          else {
            d = new r(h);
            const M = _.indexOf(t.CODE_BLOCK_MARKER), fe = _.lastIndexOf(t.CODE_BLOCK_MARKER);
            M !== fe && (d.code = _.substring(M + t.CODE_BLOCK_MARKER.length, fe), d.endLine = h, p.push(d), d = null);
          }
      }
      return p;
    }
    t.findMarkdownCodeBlocks = o;
  }(e.MarkdownCodeBlocks || (e.MarkdownCodeBlocks = {}));
})(markdowncodeblocks);
var pageconfig = {}, dist = { exports: {} };
(function(e, t) {
  (function(n, r) {
    r(t);
  })(commonjsGlobal, function(n) {
    n.JSONExt = void 0, function(p) {
      p.emptyObject = Object.freeze({}), p.emptyArray = Object.freeze([]);
      function d(mt) {
        return mt === null || typeof mt == "boolean" || typeof mt == "number" || typeof mt == "string";
      }
      p.isPrimitive = d;
      function h(mt) {
        return Array.isArray(mt);
      }
      p.isArray = h;
      function _(mt) {
        return !d(mt) && !h(mt);
      }
      p.isObject = _;
      function O(mt, gt) {
        if (mt === gt)
          return !0;
        if (d(mt) || d(gt))
          return !1;
        let T = h(mt), A = h(gt);
        return T !== A ? !1 : T && A ? M(mt, gt) : fe(mt, gt);
      }
      p.deepEqual = O;
      function w(mt) {
        return d(mt) ? mt : h(mt) ? Ue(mt) : wt(mt);
      }
      p.deepCopy = w;
      function M(mt, gt) {
        if (mt === gt)
          return !0;
        if (mt.length !== gt.length)
          return !1;
        for (let T = 0, A = mt.length; T < A; ++T)
          if (!O(mt[T], gt[T]))
            return !1;
        return !0;
      }
      function fe(mt, gt) {
        if (mt === gt)
          return !0;
        for (let T in mt)
          if (mt[T] !== void 0 && !(T in gt))
            return !1;
        for (let T in gt)
          if (gt[T] !== void 0 && !(T in mt))
            return !1;
        for (let T in mt) {
          let A = mt[T], Et = gt[T];
          if (!(A === void 0 && Et === void 0) && (A === void 0 || Et === void 0 || !O(A, Et)))
            return !1;
        }
        return !0;
      }
      function Ue(mt) {
        let gt = new Array(mt.length);
        for (let T = 0, A = mt.length; T < A; ++T)
          gt[T] = w(mt[T]);
        return gt;
      }
      function wt(mt) {
        let gt = {};
        for (let T in mt) {
          let A = mt[T];
          A !== void 0 && (gt[T] = w(A));
        }
        return gt;
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
      hasData(d) {
        return this._types.indexOf(d) !== -1;
      }
      /**
       * Get the data value for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * @returns The value for the given MIME type, or `undefined` if
       *   the dataset does not contain a value for the type.
       */
      getData(d) {
        let h = this._types.indexOf(d);
        return h !== -1 ? this._values[h] : void 0;
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
      setData(d, h) {
        this.clearData(d), this._types.push(d), this._values.push(h);
      }
      /**
       * Remove the data entry for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * #### Notes
       * This is a no-op if there is no entry for the given MIME type.
       */
      clearData(d) {
        let h = this._types.indexOf(d);
        h !== -1 && (this._types.splice(h, 1), this._values.splice(h, 1));
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
        this.promise = new Promise((d, h) => {
          this._resolve = d, this._reject = h;
        });
      }
      /**
       * Resolve the wrapped promise with the given value.
       *
       * @param value - The value to use for resolving the promise.
       */
      resolve(d) {
        let h = this._resolve;
        h(d);
      }
      /**
       * Reject the wrapped promise with the given value.
       *
       * @reason - The reason for rejecting the promise.
       */
      reject(d) {
        let h = this._reject;
        h(d);
      }
    }
    class o {
      /**
       * Construct a new token.
       *
       * @param name - A human readable name for the token.
       * @param description - Token purpose description for documentation.
       */
      constructor(d, h) {
        this.name = d, this.description = h ?? "", this._tokenStructuralPropertyT = null;
      }
    }
    function a(p) {
      let d = 0;
      for (let h = 0, _ = p.length; h < _; ++h)
        h % 4 === 0 && (d = Math.random() * 4294967295 >>> 0), p[h] = d & 255, d >>>= 8;
    }
    n.Random = void 0, function(p) {
      p.getRandomValues = (() => {
        const d = typeof window < "u" && (window.crypto || window.msCrypto) || null;
        return d && typeof d.getRandomValues == "function" ? function(_) {
          return d.getRandomValues(_);
        } : a;
      })();
    }(n.Random || (n.Random = {}));
    function c(p) {
      const d = new Uint8Array(16), h = new Array(256);
      for (let _ = 0; _ < 16; ++_)
        h[_] = "0" + _.toString(16);
      for (let _ = 16; _ < 256; ++_)
        h[_] = _.toString(16);
      return function() {
        return p(d), d[6] = 64 | d[6] & 15, d[8] = 128 | d[8] & 63, h[d[0]] + h[d[1]] + h[d[2]] + h[d[3]] + "-" + h[d[4]] + h[d[5]] + "-" + h[d[6]] + h[d[7]] + "-" + h[d[8]] + h[d[9]] + "-" + h[d[10]] + h[d[11]] + h[d[12]] + h[d[13]] + h[d[14]] + h[d[15]];
      };
    }
    n.UUID = void 0, function(p) {
      p.uuid4 = c(n.Random.getRandomValues);
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
    return r[T].some(function(A) {
      return n.bools[A];
    });
  }
  Object.keys(t.alias || {}).forEach(function(T) {
    r[T] = [].concat(t.alias[T]), r[T].forEach(function(A) {
      r[A] = [T].concat(r[T].filter(function(Et) {
        return A !== Et;
      }));
    });
  }), [].concat(t.string).filter(Boolean).forEach(function(T) {
    n.strings[T] = !0, r[T] && [].concat(r[T]).forEach(function(A) {
      n.strings[A] = !0;
    });
  });
  var o = t.default || {}, a = { _: [] };
  function c(T, A) {
    return n.allBools && /^--[^=]+$/.test(A) || n.strings[T] || n.bools[T] || r[T];
  }
  function p(T, A, Et) {
    for (var ft = T, bt = 0; bt < A.length - 1; bt++) {
      var dt = A[bt];
      if (isConstructorOrProto(ft, dt))
        return;
      ft[dt] === void 0 && (ft[dt] = {}), (ft[dt] === Object.prototype || ft[dt] === Number.prototype || ft[dt] === String.prototype) && (ft[dt] = {}), ft[dt] === Array.prototype && (ft[dt] = []), ft = ft[dt];
    }
    var lt = A[A.length - 1];
    isConstructorOrProto(ft, lt) || ((ft === Object.prototype || ft === Number.prototype || ft === String.prototype) && (ft = {}), ft === Array.prototype && (ft = []), ft[lt] === void 0 || n.bools[lt] || typeof ft[lt] == "boolean" ? ft[lt] = Et : Array.isArray(ft[lt]) ? ft[lt].push(Et) : ft[lt] = [ft[lt], Et]);
  }
  function d(T, A, Et) {
    if (!(Et && n.unknownFn && !c(T, Et) && n.unknownFn(Et) === !1)) {
      var ft = !n.strings[T] && isNumber(A) ? Number(A) : A;
      p(a, T.split("."), ft), (r[T] || []).forEach(function(bt) {
        p(a, bt.split("."), ft);
      });
    }
  }
  Object.keys(n.bools).forEach(function(T) {
    d(T, o[T] === void 0 ? !1 : o[T]);
  });
  var h = [];
  e.indexOf("--") !== -1 && (h = e.slice(e.indexOf("--") + 1), e = e.slice(0, e.indexOf("--")));
  for (var _ = 0; _ < e.length; _++) {
    var O = e[_], w, M;
    if (/^--.+=/.test(O)) {
      var fe = O.match(/^--([^=]+)=([\s\S]*)$/);
      w = fe[1];
      var Ue = fe[2];
      n.bools[w] && (Ue = Ue !== "false"), d(w, Ue, O);
    } else if (/^--no-.+/.test(O))
      w = O.match(/^--no-(.+)/)[1], d(w, !1, O);
    else if (/^--.+/.test(O))
      w = O.match(/^--(.+)/)[1], M = e[_ + 1], M !== void 0 && !/^(-|--)[^-]/.test(M) && !n.bools[w] && !n.allBools && (!r[w] || !s(w)) ? (d(w, M, O), _ += 1) : /^(true|false)$/.test(M) ? (d(w, M === "true", O), _ += 1) : d(w, n.strings[w] ? "" : !0, O);
    else if (/^-[^-]+/.test(O)) {
      for (var wt = O.slice(1, -1).split(""), mt = !1, gt = 0; gt < wt.length; gt++) {
        if (M = O.slice(gt + 2), M === "-") {
          d(wt[gt], M, O);
          continue;
        }
        if (/[A-Za-z]/.test(wt[gt]) && M[0] === "=") {
          d(wt[gt], M.slice(1), O), mt = !0;
          break;
        }
        if (/[A-Za-z]/.test(wt[gt]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(M)) {
          d(wt[gt], M, O), mt = !0;
          break;
        }
        if (wt[gt + 1] && wt[gt + 1].match(/\W/)) {
          d(wt[gt], O.slice(gt + 2), O), mt = !0;
          break;
        } else
          d(wt[gt], n.strings[wt[gt]] ? "" : !0, O);
      }
      w = O.slice(-1)[0], !mt && w !== "-" && (e[_ + 1] && !/^(-|--)[^-]/.test(e[_ + 1]) && !n.bools[w] && (!r[w] || !s(w)) ? (d(w, e[_ + 1], O), _ += 1) : e[_ + 1] && /^(true|false)$/.test(e[_ + 1]) ? (d(w, e[_ + 1] === "true", O), _ += 1) : d(w, n.strings[w] ? "" : !0, O));
    } else if ((!n.unknownFn || n.unknownFn(O) !== !1) && a._.push(n.strings._ || !isNumber(O) ? O : Number(O)), t.stopEarly) {
      a._.push.apply(a._, e.slice(_ + 1));
      break;
    }
  }
  return Object.keys(o).forEach(function(T) {
    hasKey(a, T.split(".")) || (p(a, T.split("."), o[T]), (r[T] || []).forEach(function(A) {
      p(a, A.split("."), o[T]);
    }));
  }), t["--"] ? a["--"] = h.slice() : h.forEach(function(T) {
    a._.push(T);
  }), a;
}, url = {};
function assertPath(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
function normalizeStringPosix(e, t) {
  for (var n = "", r = 0, s = -1, o = 0, a, c = 0; c <= e.length; ++c) {
    if (c < e.length)
      a = e.charCodeAt(c);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(s === c - 1 || o === 1))
        if (s !== c - 1 && o === 2) {
          if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var p = n.lastIndexOf("/");
              if (p !== n.length - 1) {
                p === -1 ? (n = "", r = 0) : (n = n.slice(0, p), r = n.length - 1 - n.lastIndexOf("/")), s = c, o = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", r = 0, s = c, o = 0;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", r = 2);
        } else
          n.length > 0 ? n += "/" + e.slice(s + 1, c) : n = e.slice(s + 1, c), r = c - s - 1;
      s = c, o = 0;
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
    for (var c = n.length, p = c - a, d = o < p ? o : p, h = -1, _ = 0; _ <= d; ++_) {
      if (_ === d) {
        if (p > d) {
          if (n.charCodeAt(a + _) === 47)
            return n.slice(a + _ + 1);
          if (_ === 0)
            return n.slice(a + _);
        } else
          o > d && (t.charCodeAt(r + _) === 47 ? h = _ : _ === 0 && (h = 0));
        break;
      }
      var O = t.charCodeAt(r + _), w = n.charCodeAt(a + _);
      if (O !== w)
        break;
      O === 47 && (h = _);
    }
    var M = "";
    for (_ = r + h + 1; _ <= s; ++_)
      (_ === s || t.charCodeAt(_) === 47) && (M.length === 0 ? M += ".." : M += "/..");
    return M.length > 0 ? M + n.slice(a + h) : (a += h, n.charCodeAt(a) === 47 && ++a, n.slice(a));
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
      var c = n.length - 1, p = -1;
      for (a = t.length - 1; a >= 0; --a) {
        var d = t.charCodeAt(a);
        if (d === 47) {
          if (!o) {
            r = a + 1;
            break;
          }
        } else
          p === -1 && (o = !1, p = a + 1), c >= 0 && (d === n.charCodeAt(c) ? --c === -1 && (s = a) : (c = -1, s = p));
      }
      return r === s ? s = p : s === -1 && (s = t.length), t.slice(r, s);
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
    for (var n = -1, r = 0, s = -1, o = !0, a = 0, c = t.length - 1; c >= 0; --c) {
      var p = t.charCodeAt(c);
      if (p === 47) {
        if (!o) {
          r = c + 1;
          break;
        }
        continue;
      }
      s === -1 && (o = !1, s = c + 1), p === 46 ? n === -1 ? n = c : a !== 1 && (a = 1) : n !== -1 && (a = -1);
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
    for (var a = -1, c = 0, p = -1, d = !0, h = t.length - 1, _ = 0; h >= o; --h) {
      if (r = t.charCodeAt(h), r === 47) {
        if (!d) {
          c = h + 1;
          break;
        }
        continue;
      }
      p === -1 && (d = !1, p = h + 1), r === 46 ? a === -1 ? a = h : _ !== 1 && (_ = 1) : a !== -1 && (_ = -1);
    }
    return a === -1 || p === -1 || // We saw a non-dot character immediately before the dot
    _ === 0 || // The (right-most) trimmed path component is exactly '..'
    _ === 1 && a === p - 1 && a === c + 1 ? p !== -1 && (c === 0 && s ? n.base = n.name = t.slice(1, p) : n.base = n.name = t.slice(c, p)) : (c === 0 && s ? (n.name = t.slice(1, a), n.base = t.slice(1, p)) : (n.name = t.slice(c, a), n.base = t.slice(c, p)), n.ext = t.slice(a, p)), c > 0 ? n.dir = t.slice(0, c - 1) : s && (n.dir = "/"), n;
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
  var n = protocolre.exec(e), r = n[1] ? n[1].toLowerCase() : "", s = !!n[2], o = !!n[3], a = 0, c;
  return s ? o ? (c = n[2] + n[3] + n[4], a = n[2].length + n[3].length) : (c = n[2] + n[4], a = n[2].length) : o ? (c = n[3] + n[4], a = n[3].length) : c = n[4], r === "file:" ? a >= 2 && (c = c.slice(2)) : isSpecial(r) ? c = n[4] : r ? s && (c = c.slice(2)) : a >= 2 && isSpecial(t.protocol) && (c = n[4]), {
    protocol: r,
    slashes: s || isSpecial(r),
    slashesCount: a,
    rest: c
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
  var r, s, o, a, c, p, d = rules.slice(), h = typeof t, _ = this, O = 0;
  for (h !== "object" && h !== "string" && (n = t, t = null), n && typeof n != "function" && (n = qs.parse), t = lolcation(t), s = extractProtocol(e || "", t), r = !s.protocol && !s.slashes, _.slashes = s.slashes || r && t.slashes, _.protocol = s.protocol || t.protocol || "", e = s.rest, (s.protocol === "file:" && (s.slashesCount !== 2 || windowsDriveLetter.test(e)) || !s.slashes && (s.protocol || s.slashesCount < 2 || !isSpecial(_.protocol))) && (d[3] = [/(.*)/, "pathname"]); O < d.length; O++) {
    if (a = d[O], typeof a == "function") {
      e = a(e, _);
      continue;
    }
    o = a[0], p = a[1], o !== o ? _[p] = e : typeof o == "string" ? (c = o === "@" ? e.lastIndexOf(o) : e.indexOf(o), ~c && (typeof a[2] == "number" ? (_[p] = e.slice(0, c), e = e.slice(c + a[2])) : (_[p] = e.slice(c), e = e.slice(0, c)))) : (c = o.exec(e)) && (_[p] = c[1], e = e.slice(0, c.index)), _[p] = _[p] || r && a[3] && t[p] || "", a[4] && (_[p] = _[p].toLowerCase());
  }
  n && (_.query = n(_.query)), r && t.slashes && _.pathname.charAt(0) !== "/" && (_.pathname !== "" || t.pathname !== "") && (_.pathname = resolve(_.pathname, t.pathname)), _.pathname.charAt(0) !== "/" && isSpecial(_.protocol) && (_.pathname = "/" + _.pathname), required(_.port, _.protocol) || (_.host = _.hostname, _.port = ""), _.username = _.password = "", _.auth && (c = _.auth.indexOf(":"), ~c ? (_.username = _.auth.slice(0, c), _.username = encodeURIComponent(decodeURIComponent(_.username)), _.password = _.auth.slice(c + 1), _.password = encodeURIComponent(decodeURIComponent(_.password))) : _.username = encodeURIComponent(decodeURIComponent(_.auth)), _.auth = _.password ? _.username + ":" + _.password : _.username), _.origin = _.protocol !== "file:" && isSpecial(_.protocol) && _.host ? _.protocol + "//" + _.host : "null", _.href = _.toString();
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
    var c = rules[a];
    c[4] && (r[c[1]] = r[c[1]].toLowerCase());
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
    function o(w) {
      if (typeof document < "u" && document) {
        const M = document.createElement("a");
        return M.href = w, M;
      }
      return (0, r.default)(w);
    }
    s.parse = o;
    function a(w) {
      return (0, r.default)(w).hostname;
    }
    s.getHostName = a;
    function c(w) {
      return w && o(w).toString();
    }
    s.normalize = c;
    function p(...w) {
      let M = (0, r.default)(w[0], {});
      const fe = M.protocol === "" && M.slashes;
      fe && (M = (0, r.default)(w[0], "https:" + w[0]));
      const Ue = `${fe ? "" : M.protocol}${M.slashes ? "//" : ""}${M.auth}${M.auth ? "@" : ""}${M.host}`, wt = n.posix.join(`${Ue && M.pathname[0] !== "/" ? "/" : ""}${M.pathname}`, ...w.slice(1));
      return `${Ue}${wt === "." ? "" : wt}`;
    }
    s.join = p;
    function d(w) {
      return p(...w.split("/").map(encodeURIComponent));
    }
    s.encodeParts = d;
    function h(w) {
      const M = Object.keys(w).filter((fe) => fe.length > 0);
      return M.length ? "?" + M.map((fe) => {
        const Ue = encodeURIComponent(String(w[fe]));
        return fe + (Ue ? "=" + Ue : "");
      }).join("&") : "";
    }
    s.objectToQueryString = h;
    function _(w) {
      return w.replace(/^\?/, "").split("&").reduce((M, fe) => {
        const [Ue, wt] = fe.split("=");
        return Ue.length > 0 && (M[Ue] = decodeURIComponent(wt || "")), M;
      }, {});
    }
    s.queryStringToObject = _;
    function O(w) {
      const { protocol: M } = o(w);
      return (!M || w.toLowerCase().indexOf(M) !== 0) && w.indexOf("/") !== 0;
    }
    s.isLocal = O;
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
      const a = (t = e.mode) !== null && t !== void 0 ? t : getOption("mode"), c = (n = e.workspace) !== null && n !== void 0 ? n : getOption("workspace"), p = a === "single-document" ? "doc" : "lab";
      o = url_1.URLExt.join(o, p), c !== PageConfig.defaultWorkspace && (o = url_1.URLExt.join(o, "workspaces", encodeURIComponent((r = getOption("workspace")) !== null && r !== void 0 ? r : PageConfig.defaultWorkspace)));
      const d = (s = e.treePath) !== null && s !== void 0 ? s : getOption("treePath");
      return d && (o = url_1.URLExt.join(o, "tree", url_1.URLExt.encodeParts(d))), o;
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
        return o !== -1 && (a = s.slice(0, o)), e.deferred.some((c) => c === s || a && c === a);
      }
      e.isDeferred = n;
      function r(s) {
        const o = s.indexOf(":");
        let a = "";
        return o !== -1 && (a = s.slice(0, o)), e.disabled.some((c) => c === s || a && c === a);
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
    function r(...O) {
      const w = t.posix.join(...O);
      return w === "." ? "" : _(w);
    }
    n.join = r;
    function s(O, w) {
      return t.posix.basename(O, w);
    }
    n.basename = s;
    function o(O) {
      const w = _(t.posix.dirname(O));
      return w === "." ? "" : w;
    }
    n.dirname = o;
    function a(O) {
      return t.posix.extname(O);
    }
    n.extname = a;
    function c(O) {
      return O === "" ? "" : _(t.posix.normalize(O));
    }
    n.normalize = c;
    function p(...O) {
      return _(t.posix.resolve(...O));
    }
    n.resolve = p;
    function d(O, w) {
      return _(t.posix.relative(O, w));
    }
    n.relative = d;
    function h(O) {
      return O.length > 0 && O.indexOf(".") !== 0 && (O = `.${O}`), O;
    }
    n.normalizeExtension = h;
    function _(O) {
      return O.indexOf("/") === 0 && (O = O.slice(1)), O;
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
    function r(c, p) {
      if (n)
        return c;
      let d = c;
      for (let h = 0; h + 1 < p.length && h < c; h++) {
        const _ = p.charCodeAt(h);
        if (_ >= 55296 && _ <= 56319) {
          const O = p.charCodeAt(h + 1);
          O >= 56320 && O <= 57343 && (d--, h++);
        }
      }
      return d;
    }
    t.jsIndexToCharIndex = r;
    function s(c, p) {
      if (n)
        return c;
      let d = c;
      for (let h = 0; h + 1 < p.length && h < d; h++) {
        const _ = p.charCodeAt(h);
        if (_ >= 55296 && _ <= 56319) {
          const O = p.charCodeAt(h + 1);
          O >= 56320 && O <= 57343 && (d++, h++);
        }
      }
      return d;
    }
    t.charIndexToJsIndex = s;
    function o(c, p = !1) {
      return c.replace(/^(\w)|[\s-_:]+(\w)/g, function(d, h, _) {
        return _ ? _.toUpperCase() : p ? h.toUpperCase() : h.toLowerCase();
      });
    }
    t.camelCase = o;
    function a(c) {
      return (c || "").toLowerCase().split(" ").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
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
      const a = document.documentElement.lang || "en", c = new Intl.RelativeTimeFormat(a, { numeric: "auto" }), p = new Date(o).getTime() - Date.now();
      for (let d of t) {
        const h = Math.ceil(p / d.milliseconds);
        if (h !== 0)
          return c.format(h, d.name);
      }
      return c.format(0, "seconds");
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
    var c = Object.getOwnPropertyDescriptor(s, o);
    (!c || ("get" in c ? !s.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, c);
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
    function a(h) {
      return s.makeSettings(h);
    }
    o.makeSettings = a;
    function c(h, _, O) {
      return s.handleRequest(h, _, O);
    }
    o.makeRequest = c;
    class p extends Error {
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
          const O = await _.json(), { message: w, traceback: M } = O;
          return M && console.error(M), new p(_, w ?? p._defaultMessage(_), M ?? "");
        } catch (O) {
          return console.debug(O), new p(_);
        }
      }
      /**
       * Create a new response error.
       */
      constructor(_, O = p._defaultMessage(_), w = "") {
        super(O), this.response = _, this.traceback = w;
      }
      static _defaultMessage(_) {
        return `Invalid response: ${_.status} ${_.statusText}`;
      }
    }
    o.ResponseError = p;
    class d extends TypeError {
      /**
       * Create a new network error.
       */
      constructor(_) {
        super(_.message), this.stack = _.stack;
      }
    }
    o.NetworkError = d;
  })(r = e.ServerConnection || (e.ServerConnection = {}));
  var s;
  (function(o) {
    function a(d = {}) {
      var h;
      const _ = t.PageConfig.getBaseUrl(), O = t.PageConfig.getWsUrl(), w = t.URLExt.normalize(d.baseUrl) || _;
      let M = d.wsUrl;
      return !M && w === _ && (M = O), !M && w.indexOf("http") === 0 && (M = "ws" + w.slice(4)), M = M ?? O, {
        init: { cache: "no-store", credentials: "same-origin" },
        fetch,
        Headers,
        Request,
        WebSocket: n,
        token: t.PageConfig.getToken(),
        appUrl: t.PageConfig.getOption("appUrl"),
        appendToken: typeof window > "u" || typeof process < "u" && ((h = process == null ? void 0 : process.env) === null || h === void 0 ? void 0 : h.JEST_WORKER_ID) !== void 0 || t.URLExt.getHostName(_) !== t.URLExt.getHostName(M),
        ...d,
        baseUrl: w,
        wsUrl: M
      };
    }
    o.makeSettings = a;
    function c(d, h, _) {
      var O;
      if (d.indexOf(_.baseUrl) !== 0)
        throw new Error("Can only be used for notebook server requests");
      ((O = h.cache) !== null && O !== void 0 ? O : _.init.cache) === "no-store" && (d += (/\?/.test(d) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
      const M = new _.Request(d, { ..._.init, ...h });
      let fe = !1;
      if (_.token && (fe = !0, M.headers.append("Authorization", `token ${_.token}`)), typeof document < "u" && (document != null && document.cookie)) {
        const Ue = p("_xsrf");
        Ue !== void 0 && (fe = !0, M.headers.append("X-XSRFToken", Ue));
      }
      return !M.headers.has("Content-Type") && fe && M.headers.set("Content-Type", "application/json"), _.fetch.call(null, M).catch((Ue) => {
        throw new r.NetworkError(Ue);
      });
    }
    o.handleRequest = c;
    function p(d) {
      const h = document.cookie.match("\\b" + d + "=([^;]*)\\b");
      return h == null ? void 0 : h[1];
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
      function c(p) {
        const d = new s(p);
        return d.load().then(() => d);
      }
      a.create = c;
    })(e.ConfigSection || (e.ConfigSection = {}));
    class s {
      /**
       * Construct a new config section.
       */
      constructor(c) {
        var p;
        this._url = "unknown";
        const d = this.serverSettings = (p = c.serverSettings) !== null && p !== void 0 ? p : n.ServerConnection.makeSettings();
        this._url = t.URLExt.join(d.baseUrl, r, encodeURIComponent(c.name));
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
        const c = await n.ServerConnection.makeRequest(this._url, {}, this.serverSettings);
        if (c.status !== 200)
          throw await n.ServerConnection.ResponseError.create(c);
        this._data = await c.json();
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
      async update(c) {
        this._data = { ...this._data, ...c };
        const p = {
          method: "PATCH",
          body: JSON.stringify(c)
        }, d = await n.ServerConnection.makeRequest(this._url, p, this.serverSettings);
        if (d.status !== 200)
          throw await n.ServerConnection.ResponseError.create(d);
        return this._data = await d.json(), this._data;
      }
    }
    class o {
      /**
       * Create a new config with defaults.
       */
      constructor(c) {
        var p, d;
        this._className = "", this._section = c.section, this._defaults = (p = c.defaults) !== null && p !== void 0 ? p : {}, this._className = (d = c.className) !== null && d !== void 0 ? d : "";
      }
      /**
       * Get data from the config section or fall back to defaults.
       */
      get(c) {
        const p = this._classData();
        return c in p ? p[c] : this._defaults[c];
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
      set(c, p) {
        const d = {};
        if (d[c] = p, this._className) {
          const h = {};
          return h[this._className] = d, this._section.update(h);
        } else
          return this._section.update(d);
      }
      /**
       * Get data from the Section with our classname, if available.
       *
       * #### Notes
       * If we have no classname, get all of the data in the Section
       */
      _classData() {
        const c = this._section.data;
        return this._className && this._className in c ? c[this._className] : c;
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
          a = r.findIndex((c) => c === s) >= 0;
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
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(w, M, fe, Ue) {
      Ue === void 0 && (Ue = fe);
      var wt = Object.getOwnPropertyDescriptor(M, fe);
      (!wt || ("get" in wt ? !M.__esModule : wt.writable || wt.configurable)) && (wt = { enumerable: !0, get: function() {
        return M[fe];
      } }), Object.defineProperty(w, Ue, wt);
    } : function(w, M, fe, Ue) {
      Ue === void 0 && (Ue = fe), w[Ue] = M[fe];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(w, M) {
      Object.defineProperty(w, "default", { enumerable: !0, value: M });
    } : function(w, M) {
      w.default = M;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(w) {
      if (w && w.__esModule)
        return w;
      var M = {};
      if (w != null)
        for (var fe in w)
          fe !== "default" && Object.prototype.hasOwnProperty.call(w, fe) && t(M, w, fe);
      return n(M, w), M;
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Drive = e.ContentsManager = e.Contents = void 0;
    const s = lib$1, o = require$$0, a = requireLib(), c = r(validate$4), p = "api/contents", d = "files";
    (function(w) {
      function M(Ue) {
        c.validateContentsModel(Ue);
      }
      w.validateContentsModel = M;
      function fe(Ue) {
        c.validateCheckpointModel(Ue);
      }
      w.validateCheckpointModel = fe;
    })(e.Contents || (e.Contents = {}));
    class h {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(M = {}) {
        var fe, Ue;
        this._isDisposed = !1, this._additionalDrives = /* @__PURE__ */ new Map(), this._fileChanged = new o.Signal(this);
        const wt = this.serverSettings = (fe = M.serverSettings) !== null && fe !== void 0 ? fe : a.ServerConnection.makeSettings();
        this._defaultDrive = (Ue = M.defaultDrive) !== null && Ue !== void 0 ? Ue : new _({ serverSettings: wt }), this._defaultDrive.fileChanged.connect(this._onFileChanged, this);
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
      addDrive(M) {
        this._additionalDrives.set(M.name, M), M.fileChanged.connect(this._onFileChanged, this);
      }
      /**
       * Given a path, get a shared model factory from the
       * relevant backend. Returns `null` if the backend
       * does not provide one.
       */
      getSharedModelFactory(M) {
        var fe;
        const [Ue] = this._driveForPath(M);
        return (fe = Ue == null ? void 0 : Ue.sharedModelFactory) !== null && fe !== void 0 ? fe : null;
      }
      /**
       * Given a path of the form `drive:local/portion/of/it.txt`
       * get the local part of it.
       *
       * @param path: the path.
       *
       * @returns The local part of the path.
       */
      localPath(M) {
        const fe = M.split("/"), Ue = fe[0].split(":");
        return Ue.length === 1 || !this._additionalDrives.has(Ue[0]) ? s.PathExt.removeSlash(M) : s.PathExt.join(Ue.slice(1).join(":"), ...fe.slice(1));
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
      normalize(M) {
        const fe = M.split(":");
        return fe.length === 1 ? s.PathExt.normalize(M) : `${fe[0]}:${s.PathExt.normalize(fe.slice(1).join(":"))}`;
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
      resolvePath(M, fe) {
        const Ue = this.driveName(M), wt = this.localPath(M), mt = s.PathExt.resolve("/", wt, fe);
        return Ue ? `${Ue}:${mt}` : mt;
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
      driveName(M) {
        const Ue = M.split("/")[0].split(":");
        return Ue.length === 1 ? "" : this._additionalDrives.has(Ue[0]) ? Ue[0] : "";
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
      get(M, fe) {
        const [Ue, wt] = this._driveForPath(M);
        return Ue.get(wt, fe).then((mt) => {
          const gt = [];
          if (mt.type === "directory" && mt.content) {
            for (const T of mt.content)
              gt.push({ ...T, path: this._toGlobalPath(Ue, T.path) });
            return {
              ...mt,
              path: this._toGlobalPath(Ue, wt),
              content: gt,
              serverPath: mt.path
            };
          } else
            return {
              ...mt,
              path: this._toGlobalPath(Ue, wt),
              serverPath: mt.path
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
      getDownloadUrl(M) {
        const [fe, Ue] = this._driveForPath(M);
        return fe.getDownloadUrl(Ue);
      }
      /**
       * Create a new untitled file or directory in the specified directory path.
       *
       * @param options: The options used to create the file.
       *
       * @returns A promise which resolves with the created file content when the
       *    file is created.
       */
      newUntitled(M = {}) {
        if (M.path) {
          const fe = this.normalize(M.path), [Ue, wt] = this._driveForPath(fe);
          return Ue.newUntitled({ ...M, path: wt }).then((mt) => ({
            ...mt,
            path: s.PathExt.join(fe, mt.name),
            serverPath: mt.path
          }));
        } else
          return this._defaultDrive.newUntitled(M);
      }
      /**
       * Delete a file.
       *
       * @param path - The path to the file.
       *
       * @returns A promise which resolves when the file is deleted.
       */
      delete(M) {
        const [fe, Ue] = this._driveForPath(M);
        return fe.delete(Ue);
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
      rename(M, fe) {
        const [Ue, wt] = this._driveForPath(M), [mt, gt] = this._driveForPath(fe);
        if (Ue !== mt)
          throw Error("ContentsManager: renaming files must occur within a Drive");
        return Ue.rename(wt, gt).then((T) => ({
          ...T,
          path: this._toGlobalPath(Ue, gt),
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
      save(M, fe = {}) {
        const Ue = this.normalize(M), [wt, mt] = this._driveForPath(M);
        return wt.save(mt, { ...fe, path: mt }).then((gt) => ({
          ...gt,
          path: Ue,
          serverPath: gt.path
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
      copy(M, fe) {
        const [Ue, wt] = this._driveForPath(M), [mt, gt] = this._driveForPath(fe);
        if (Ue === mt)
          return Ue.copy(wt, gt).then((T) => ({
            ...T,
            path: this._toGlobalPath(Ue, T.path),
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
      createCheckpoint(M) {
        const [fe, Ue] = this._driveForPath(M);
        return fe.createCheckpoint(Ue);
      }
      /**
       * List available checkpoints for a file.
       *
       * @param path - The path of the file.
       *
       * @returns A promise which resolves with a list of checkpoint models for
       *    the file.
       */
      listCheckpoints(M) {
        const [fe, Ue] = this._driveForPath(M);
        return fe.listCheckpoints(Ue);
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
      restoreCheckpoint(M, fe) {
        const [Ue, wt] = this._driveForPath(M);
        return Ue.restoreCheckpoint(wt, fe);
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
      deleteCheckpoint(M, fe) {
        const [Ue, wt] = this._driveForPath(M);
        return Ue.deleteCheckpoint(wt, fe);
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
      _toGlobalPath(M, fe) {
        return M === this._defaultDrive ? s.PathExt.removeSlash(fe) : `${M.name}:${s.PathExt.removeSlash(fe)}`;
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
      _driveForPath(M) {
        const fe = this.driveName(M), Ue = this.localPath(M);
        return fe ? [this._additionalDrives.get(fe), Ue] : [this._defaultDrive, Ue];
      }
      /**
       * Respond to fileChanged signals from the drives attached to
       * the manager. This prepends the drive name to the path if necessary,
       * and then forwards the signal.
       */
      _onFileChanged(M, fe) {
        var Ue, wt;
        if (M === this._defaultDrive)
          this._fileChanged.emit(fe);
        else {
          let mt = null, gt = null;
          !((Ue = fe.newValue) === null || Ue === void 0) && Ue.path && (mt = {
            ...fe.newValue,
            path: this._toGlobalPath(M, fe.newValue.path)
          }), !((wt = fe.oldValue) === null || wt === void 0) && wt.path && (gt = {
            ...fe.oldValue,
            path: this._toGlobalPath(M, fe.oldValue.path)
          }), this._fileChanged.emit({
            type: fe.type,
            newValue: mt,
            oldValue: gt
          });
        }
      }
    }
    e.ContentsManager = h;
    class _ {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(M = {}) {
        var fe, Ue, wt;
        this._isDisposed = !1, this._fileChanged = new o.Signal(this), this.name = (fe = M.name) !== null && fe !== void 0 ? fe : "Default", this._apiEndpoint = (Ue = M.apiEndpoint) !== null && Ue !== void 0 ? Ue : p, this.serverSettings = (wt = M.serverSettings) !== null && wt !== void 0 ? wt : a.ServerConnection.makeSettings();
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
      async get(M, fe) {
        let Ue = this._getUrl(M);
        if (fe) {
          fe.type === "notebook" && delete fe.format;
          const T = fe.content ? "1" : "0", A = { ...fe, content: T };
          Ue += s.URLExt.objectToQueryString(A);
        }
        const wt = this.serverSettings, mt = await a.ServerConnection.makeRequest(Ue, {}, wt);
        if (mt.status !== 200)
          throw await a.ServerConnection.ResponseError.create(mt);
        const gt = await mt.json();
        return c.validateContentsModel(gt), gt;
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
      getDownloadUrl(M) {
        const fe = this.serverSettings.baseUrl;
        let Ue = s.URLExt.join(fe, d, s.URLExt.encodeParts(M));
        const wt = document.cookie.match("\\b_xsrf=([^;]*)\\b");
        if (wt) {
          const mt = new URL(Ue);
          mt.searchParams.append("_xsrf", wt[1]), Ue = mt.toString();
        }
        return Promise.resolve(Ue);
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
      async newUntitled(M = {}) {
        var fe;
        let Ue = "{}";
        M && (M.ext && (M.ext = O.normalizeExtension(M.ext)), Ue = JSON.stringify(M));
        const wt = this.serverSettings, mt = this._getUrl((fe = M.path) !== null && fe !== void 0 ? fe : ""), gt = {
          method: "POST",
          body: Ue
        }, T = await a.ServerConnection.makeRequest(mt, gt, wt);
        if (T.status !== 201)
          throw await a.ServerConnection.ResponseError.create(T);
        const A = await T.json();
        return c.validateContentsModel(A), this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: A
        }), A;
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
      async delete(M) {
        const fe = this._getUrl(M), Ue = this.serverSettings, wt = { method: "DELETE" }, mt = await a.ServerConnection.makeRequest(fe, wt, Ue);
        if (mt.status !== 204)
          throw await a.ServerConnection.ResponseError.create(mt);
        this._fileChanged.emit({
          type: "delete",
          oldValue: { path: M },
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
      async rename(M, fe) {
        const Ue = this.serverSettings, wt = this._getUrl(M), mt = {
          method: "PATCH",
          body: JSON.stringify({ path: fe })
        }, gt = await a.ServerConnection.makeRequest(wt, mt, Ue);
        if (gt.status !== 200)
          throw await a.ServerConnection.ResponseError.create(gt);
        const T = await gt.json();
        return c.validateContentsModel(T), this._fileChanged.emit({
          type: "rename",
          oldValue: { path: M },
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
      async save(M, fe = {}) {
        const Ue = this.serverSettings, wt = this._getUrl(M), mt = {
          method: "PUT",
          body: JSON.stringify(fe)
        }, gt = await a.ServerConnection.makeRequest(wt, mt, Ue);
        if (gt.status !== 200 && gt.status !== 201)
          throw await a.ServerConnection.ResponseError.create(gt);
        const T = await gt.json();
        return c.validateContentsModel(T), this._fileChanged.emit({
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
      async copy(M, fe) {
        const Ue = this.serverSettings, wt = this._getUrl(fe), mt = {
          method: "POST",
          body: JSON.stringify({ copy_from: M })
        }, gt = await a.ServerConnection.makeRequest(wt, mt, Ue);
        if (gt.status !== 201)
          throw await a.ServerConnection.ResponseError.create(gt);
        const T = await gt.json();
        return c.validateContentsModel(T), this._fileChanged.emit({
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
      async createCheckpoint(M) {
        const fe = this._getUrl(M, "checkpoints"), Ue = { method: "POST" }, wt = await a.ServerConnection.makeRequest(fe, Ue, this.serverSettings);
        if (wt.status !== 201)
          throw await a.ServerConnection.ResponseError.create(wt);
        const mt = await wt.json();
        return c.validateCheckpointModel(mt), mt;
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
      async listCheckpoints(M) {
        const fe = this._getUrl(M, "checkpoints"), Ue = await a.ServerConnection.makeRequest(fe, {}, this.serverSettings);
        if (Ue.status !== 200)
          throw await a.ServerConnection.ResponseError.create(Ue);
        const wt = await Ue.json();
        if (!Array.isArray(wt))
          throw new Error("Invalid Checkpoint list");
        for (let mt = 0; mt < wt.length; mt++)
          c.validateCheckpointModel(wt[mt]);
        return wt;
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
      async restoreCheckpoint(M, fe) {
        const Ue = this._getUrl(M, "checkpoints", fe), wt = { method: "POST" }, mt = await a.ServerConnection.makeRequest(Ue, wt, this.serverSettings);
        if (mt.status !== 204)
          throw await a.ServerConnection.ResponseError.create(mt);
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
      async deleteCheckpoint(M, fe) {
        const Ue = this._getUrl(M, "checkpoints", fe), wt = { method: "DELETE" }, mt = await a.ServerConnection.makeRequest(Ue, wt, this.serverSettings);
        if (mt.status !== 204)
          throw await a.ServerConnection.ResponseError.create(mt);
      }
      /**
       * Get a REST url for a file given a path.
       */
      _getUrl(...M) {
        const fe = M.map((wt) => s.URLExt.encodeParts(wt)), Ue = this.serverSettings.baseUrl;
        return s.URLExt.join(Ue, this._apiEndpoint, ...fe);
      }
    }
    e.Drive = _;
    var O;
    (function(w) {
      function M(fe) {
        return fe.length > 0 && fe.indexOf(".") !== 0 && (fe = `.${fe}`), fe;
      }
      w.normalizeExtension = M;
    })(O || (O = {}));
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
    const { backoff: o, interval: a, max: c } = r;
    if (a === Poll.NEVER)
      return a;
    const p = o === !0 ? e.DEFAULT_BACKOFF : o === !1 ? 1 : o, d = n(a, s.interval * p);
    return Math.min(c, d);
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
    const { serverSettings: n } = this, { baseUrl: r, token: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1$6.ServerConnection, c = coreutils_1$a.URLExt.join(r, SERVICE_EVENTS_URL) + (s ? `?token=${s}` : ""), p = { body: JSON.stringify(t), method: "POST" }, d = await o(c, p, n);
    if (d.status !== 204)
      throw new a(d);
  }
  /**
   * Subscribe to event bus emissions.
   */
  _subscribe() {
    return new Promise((t, n) => {
      if (this.isDisposed)
        return;
      const { token: r, WebSocket: s, wsUrl: o } = this.serverSettings, a = coreutils_1$a.URLExt.join(o, SERVICE_EVENTS_URL, "subscribe") + (r ? `?token=${encodeURIComponent(r)}` : ""), c = this._socket = new s(a), p = this._stream;
      c.onclose = () => n(new Error("EventManager socket closed")), c.onmessage = (d) => d.data && p.emit(JSON.parse(d.data));
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
  function n(A) {
    var Et, ft, bt, dt, lt;
    return {
      buffers: (Et = A.buffers) !== null && Et !== void 0 ? Et : [],
      channel: A.channel,
      content: A.content,
      header: {
        date: (/* @__PURE__ */ new Date()).toISOString(),
        msg_id: (ft = A.msgId) !== null && ft !== void 0 ? ft : t.UUID.uuid4(),
        msg_type: A.msgType,
        session: A.session,
        username: (bt = A.username) !== null && bt !== void 0 ? bt : "",
        version: "5.2"
      },
      metadata: (dt = A.metadata) !== null && dt !== void 0 ? dt : {},
      parent_header: (lt = A.parentHeader) !== null && lt !== void 0 ? lt : {}
    };
  }
  e.createMessage = n;
  function r(A) {
    return A.header.msg_type === "stream";
  }
  e.isStreamMsg = r;
  function s(A) {
    return A.header.msg_type === "display_data";
  }
  e.isDisplayDataMsg = s;
  function o(A) {
    return A.header.msg_type === "update_display_data";
  }
  e.isUpdateDisplayDataMsg = o;
  function a(A) {
    return A.header.msg_type === "execute_input";
  }
  e.isExecuteInputMsg = a;
  function c(A) {
    return A.header.msg_type === "execute_result";
  }
  e.isExecuteResultMsg = c;
  function p(A) {
    return A.header.msg_type === "error";
  }
  e.isErrorMsg = p;
  function d(A) {
    return A.header.msg_type === "status";
  }
  e.isStatusMsg = d;
  function h(A) {
    return A.header.msg_type === "clear_output";
  }
  e.isClearOutputMsg = h;
  function _(A) {
    return A.header.msg_type === "debug_event";
  }
  e.isDebugEventMsg = _;
  function O(A) {
    return A.header.msg_type === "comm_open";
  }
  e.isCommOpenMsg = O;
  function w(A) {
    return A.header.msg_type === "comm_close";
  }
  e.isCommCloseMsg = w;
  function M(A) {
    return A.header.msg_type === "comm_msg";
  }
  e.isCommMsgMsg = M;
  function fe(A) {
    return A.header.msg_type === "kernel_info_request";
  }
  e.isInfoRequestMsg = fe;
  function Ue(A) {
    return A.header.msg_type === "execute_reply";
  }
  e.isExecuteReplyMsg = Ue;
  function wt(A) {
    return A.header.msg_type === "debug_request";
  }
  e.isDebugRequestMsg = wt;
  function mt(A) {
    return A.header.msg_type === "debug_reply";
  }
  e.isDebugReplyMsg = mt;
  function gt(A) {
    return A.header.msg_type === "input_request";
  }
  e.isInputRequestMsg = gt;
  function T(A) {
    return A.header.msg_type === "input_reply";
  }
  e.isInputReplyMsg = T, function(A) {
    A.v1KernelWebsocketJupyterOrg = "v1.kernel.websocket.jupyter.org";
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
  async function s(h = t.ServerConnection.makeSettings()) {
    const _ = n.URLExt.join(h.baseUrl, e.KERNEL_SERVICE_URL), O = await t.ServerConnection.makeRequest(_, {}, h);
    if (O.status !== 200)
      throw await t.ServerConnection.ResponseError.create(O);
    const w = await O.json();
    return (0, r.validateModels)(w), w;
  }
  e.listRunning = s;
  async function o(h = {}, _ = t.ServerConnection.makeSettings()) {
    const O = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL), w = {
      method: "POST",
      body: JSON.stringify(h)
    }, M = await t.ServerConnection.makeRequest(O, w, _);
    if (M.status !== 201)
      throw await t.ServerConnection.ResponseError.create(M);
    const fe = await M.json();
    return (0, r.validateModel)(fe), fe;
  }
  e.startNew = o;
  async function a(h, _ = t.ServerConnection.makeSettings()) {
    const O = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(h), "restart"), w = { method: "POST" }, M = await t.ServerConnection.makeRequest(O, w, _);
    if (M.status !== 200)
      throw await t.ServerConnection.ResponseError.create(M);
    const fe = await M.json();
    (0, r.validateModel)(fe);
  }
  e.restartKernel = a;
  async function c(h, _ = t.ServerConnection.makeSettings()) {
    const O = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(h), "interrupt"), w = { method: "POST" }, M = await t.ServerConnection.makeRequest(O, w, _);
    if (M.status !== 204)
      throw await t.ServerConnection.ResponseError.create(M);
  }
  e.interruptKernel = c;
  async function p(h, _ = t.ServerConnection.makeSettings()) {
    const O = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(h)), w = { method: "DELETE" }, M = await t.ServerConnection.makeRequest(O, w, _);
    if (M.status === 404) {
      const fe = `The kernel "${h}" does not exist on the server`;
      console.warn(fe);
    } else if (M.status !== 204)
      throw await t.ServerConnection.ResponseError.create(M);
  }
  e.shutdownKernel = p;
  async function d(h, _ = t.ServerConnection.makeSettings()) {
    const O = n.URLExt.join(_.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(h)), w = await t.ServerConnection.makeRequest(O, {}, _);
    if (w.status === 404)
      return;
    if (w.status !== 200)
      throw await t.ServerConnection.ResponseError.create(w);
    const M = await w.json();
    return (0, r.validateModel)(M), M;
  }
  e.getKernelModel = d;
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
      const c = KernelMessage$2.createMessage({
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
      a(c);
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
      for (let c = this._hooks.length - 1; c >= 0; c--) {
        const p = this._hooks[c];
        if (p !== null) {
          try {
            a = await p(s);
          } catch (d) {
            a = !0, console.error(d);
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
        const c = this._hooks[o];
        this._hooks[o] === null ? s++ : this._hooks[o - s] = c;
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
  function t(c) {
    let p;
    const d = new DataView(c), h = Number(d.getBigUint64(
      0,
      !0
      /* littleEndian */
    ));
    let _ = [];
    for (let gt = 0; gt < h; gt++)
      _.push(Number(d.getBigUint64(
        8 * (gt + 1),
        !0
        /* littleEndian */
      )));
    const O = new TextDecoder("utf8"), w = O.decode(c.slice(_[0], _[1])), M = JSON.parse(O.decode(c.slice(_[1], _[2]))), fe = JSON.parse(O.decode(c.slice(_[2], _[3]))), Ue = JSON.parse(O.decode(c.slice(_[3], _[4]))), wt = JSON.parse(O.decode(c.slice(_[4], _[5])));
    let mt = [];
    for (let gt = 5; gt < _.length - 1; gt++)
      mt.push(new DataView(c.slice(_[gt], _[gt + 1])));
    return p = {
      channel: w,
      header: M,
      parent_header: fe,
      metadata: Ue,
      content: wt,
      buffers: mt
    }, p;
  }
  e.deserializeV1KernelWebsocketJupyterOrg = t;
  function n(c) {
    const p = JSON.stringify(c.header), d = c.parent_header == null ? "{}" : JSON.stringify(c.parent_header), h = JSON.stringify(c.metadata), _ = JSON.stringify(c.content), O = c.buffers !== void 0 ? c.buffers : [], w = 1 + 4 + O.length + 1;
    let M = [];
    M.push(8 * (1 + w)), M.push(c.channel.length + M[M.length - 1]);
    const fe = new TextEncoder(), Ue = fe.encode(c.channel), wt = fe.encode(p), mt = fe.encode(d), gt = fe.encode(h), T = fe.encode(_), A = new Uint8Array(Ue.length + wt.length + mt.length + gt.length + T.length);
    A.set(Ue), A.set(wt, Ue.length), A.set(mt, Ue.length + wt.length), A.set(gt, Ue.length + wt.length + mt.length), A.set(T, Ue.length + wt.length + mt.length + gt.length);
    for (let lt of [
      wt.length,
      mt.length,
      gt.length,
      T.length
    ])
      M.push(lt + M[M.length - 1]);
    let Et = 0;
    for (let lt of O) {
      let yt = lt.byteLength;
      M.push(yt + M[M.length - 1]), Et += yt;
    }
    const ft = new Uint8Array(8 * (1 + w) + A.byteLength + Et), bt = new ArrayBuffer(8), dt = new DataView(bt);
    dt.setBigUint64(
      0,
      BigInt(w),
      !0
      /* littleEndian */
    ), ft.set(new Uint8Array(bt), 0);
    for (let lt = 0; lt < M.length; lt++)
      dt.setBigUint64(
        0,
        BigInt(M[lt]),
        !0
        /* littleEndian */
      ), ft.set(new Uint8Array(bt), 8 * (lt + 1));
    ft.set(A, M[0]);
    for (let lt = 0; lt < O.length; lt++) {
      const yt = O[lt];
      ft.set(new Uint8Array(ArrayBuffer.isView(yt) ? yt.buffer : yt), M[5 + lt]);
    }
    return ft.buffer;
  }
  e.serializeV1KernelWebsocketJupyterOrg = n;
  function r(c) {
    let p;
    return typeof c == "string" ? p = JSON.parse(c) : p = o(c), p;
  }
  e.deserializeDefault = r;
  function s(c) {
    var p;
    let d;
    return !((p = c.buffers) === null || p === void 0) && p.length ? d = a(c) : d = JSON.stringify(c), d;
  }
  e.serializeDefault = s;
  function o(c) {
    const p = new DataView(c), d = p.getUint32(0), h = [];
    if (d < 2)
      throw new Error("Invalid incoming Kernel Message");
    for (let w = 1; w <= d; w++)
      h.push(p.getUint32(w * 4));
    const _ = new Uint8Array(c.slice(h[0], h[1])), O = JSON.parse(new TextDecoder("utf8").decode(_));
    O.buffers = [];
    for (let w = 1; w < d; w++) {
      const M = h[w], fe = h[w + 1] || c.byteLength;
      O.buffers.push(new DataView(c.slice(M, fe)));
    }
    return O;
  }
  function a(c) {
    const p = [], d = [], h = new TextEncoder();
    let _ = [];
    c.buffers !== void 0 && (_ = c.buffers, delete c.buffers);
    const O = h.encode(JSON.stringify(c));
    d.push(O.buffer);
    for (let Ue = 0; Ue < _.length; Ue++) {
      const wt = _[Ue];
      d.push(ArrayBuffer.isView(wt) ? wt.buffer : wt);
    }
    const w = d.length;
    p.push(4 * (w + 1));
    for (let Ue = 0; Ue + 1 < d.length; Ue++)
      p.push(p[p.length - 1] + d[Ue].byteLength);
    const M = new Uint8Array(p[p.length - 1] + d[d.length - 1].byteLength), fe = new DataView(M.buffer);
    fe.setUint32(0, w);
    for (let Ue = 0; Ue < p.length; Ue++)
      fe.setUint32(4 * (Ue + 1), p[Ue]);
    for (let Ue = 0; Ue < d.length; Ue++)
      M.set(new Uint8Array(d[Ue]), p[Ue]);
    return M.buffer;
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
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(c, p, d, h) {
    h === void 0 && (h = d);
    var _ = Object.getOwnPropertyDescriptor(p, d);
    (!_ || ("get" in _ ? !p.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return p[d];
    } }), Object.defineProperty(c, h, _);
  } : function(c, p, d, h) {
    h === void 0 && (h = d), c[h] = p[d];
  }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(c, p) {
    Object.defineProperty(c, "default", { enumerable: !0, value: p });
  } : function(c, p) {
    c.default = p;
  }), r = commonjsGlobal && commonjsGlobal.__importStar || function(c) {
    if (c && c.__esModule)
      return c;
    var p = {};
    if (c != null)
      for (var d in c)
        d !== "default" && Object.prototype.hasOwnProperty.call(c, d) && t(p, c, d);
    return n(p, c), p;
  }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(c, p) {
    for (var d in c)
      d !== "default" && !Object.prototype.hasOwnProperty.call(p, d) && t(p, c, d);
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
  var e = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(gt, T, A, Et) {
    Et === void 0 && (Et = A);
    var ft = Object.getOwnPropertyDescriptor(T, A);
    (!ft || ("get" in ft ? !T.__esModule : ft.writable || ft.configurable)) && (ft = { enumerable: !0, get: function() {
      return T[A];
    } }), Object.defineProperty(gt, Et, ft);
  } : function(gt, T, A, Et) {
    Et === void 0 && (Et = A), gt[Et] = T[A];
  }), t = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(gt, T) {
    Object.defineProperty(gt, "default", { enumerable: !0, value: T });
  } : function(gt, T) {
    gt.default = T;
  }), n = commonjsGlobal && commonjsGlobal.__importStar || function(gt) {
    if (gt && gt.__esModule)
      return gt;
    var T = {};
    if (gt != null)
      for (var A in gt)
        A !== "default" && Object.prototype.hasOwnProperty.call(gt, A) && e(T, gt, A);
    return t(T, gt), T;
  };
  Object.defineProperty(_default$2, "__esModule", { value: !0 }), _default$2.KernelConnection = void 0;
  const r = lib$1, s = distExports, o = require$$0, a = requireLib(), c = comm, p = n(messages), d = future, h = serialize$1, _ = n(validate$2), O = kernelspec$1, w = n(restapi$4), M = 3e3, fe = "_RESTARTING_", Ue = "";
  class wt {
    /**
     * Construct a kernel object.
     */
    constructor(T) {
      var A, Et, ft, bt;
      this._createSocket = (dt = !0) => {
        this._errorIfDisposed(), this._clearSocket(), this._updateConnectionStatus("connecting");
        const lt = this.serverSettings, yt = r.URLExt.join(lt.wsUrl, w.KERNEL_SERVICE_URL, encodeURIComponent(this._id)), At = yt.replace(/^((?:\w+:)?\/\/)(?:[^@\/]+@)/, "$1");
        console.debug(`Starting WebSocket: ${At}`);
        let ln = r.URLExt.join(yt, "channels?session_id=" + encodeURIComponent(this._clientId));
        const un = lt.token;
        lt.appendToken && un !== "" && (ln = ln + `&token=${encodeURIComponent(un)}`);
        const yn = dt ? this._supportedProtocols : [];
        this._ws = new lt.WebSocket(ln, yn), this._ws.binaryType = "arraybuffer";
        let wn = !1;
        const Cn = async (kn) => {
          var Tn, mn;
          if (!this._isDisposed) {
            this._reason = "", this._model = void 0;
            try {
              const pn = await w.getKernelModel(this._id, lt);
              this._model = pn, (pn == null ? void 0 : pn.execution_state) === "dead" ? this._updateStatus("dead") : this._onWSClose(kn);
            } catch (pn) {
              if (pn instanceof a.ServerConnection.NetworkError || ((Tn = pn.response) === null || Tn === void 0 ? void 0 : Tn.status) === 503 || ((mn = pn.response) === null || mn === void 0 ? void 0 : mn.status) === 424) {
                const Pn = mt.getRandomIntInclusive(10, 30) * 1e3;
                setTimeout(Cn, Pn, kn);
              } else
                this._reason = "Kernel died unexpectedly", this._updateStatus("dead");
            }
          }
        }, Rn = async (kn) => {
          wn || (wn = !0, await Cn(kn));
        };
        this._ws.onmessage = this._onWSMessage, this._ws.onopen = this._onWSOpen, this._ws.onclose = Rn, this._ws.onerror = Rn;
      }, this._onWSOpen = (dt) => {
        if (this._ws.protocol !== "" && !this._supportedProtocols.includes(this._ws.protocol))
          throw console.log("Server selected unknown kernel wire protocol:", this._ws.protocol), this._updateStatus("dead"), new Error(`Unknown kernel wire protocol:  ${this._ws.protocol}`);
        this._selectedProtocol = this._ws.protocol, this._ws.onclose = this._onWSClose, this._ws.onerror = this._onWSClose, this._updateConnectionStatus("connected");
      }, this._onWSMessage = (dt) => {
        let lt;
        try {
          lt = (0, h.deserialize)(dt.data, this._ws.protocol), _.validateMessage(lt);
        } catch (yt) {
          throw yt.message = `Kernel message validation error: ${yt.message}`, yt;
        }
        this._kernelSession = lt.header.session, this._msgChain = this._msgChain.then(() => this._handleMessage(lt)).catch((yt) => {
          yt.message.startsWith("Canceled future for ") && console.error(yt);
        }), this._anyMessage.emit({ msg: lt, direction: "recv" });
      }, this._onWSClose = (dt) => {
        this.isDisposed || this._reconnect();
      }, this._id = "", this._name = "", this._status = "unknown", this._connectionStatus = "connecting", this._kernelSession = "", this._isDisposed = !1, this._ws = null, this._username = "", this._reconnectLimit = 7, this._reconnectAttempt = 0, this._reconnectTimeout = null, this._supportedProtocols = Object.values(p.supportedKernelWebSocketProtocols), this._selectedProtocol = "", this._futures = /* @__PURE__ */ new Map(), this._comms = /* @__PURE__ */ new Map(), this._targetRegistry = /* @__PURE__ */ Object.create(null), this._info = new s.PromiseDelegate(), this._pendingMessages = [], this._statusChanged = new o.Signal(this), this._connectionStatusChanged = new o.Signal(this), this._disposed = new o.Signal(this), this._iopubMessage = new o.Signal(this), this._anyMessage = new o.Signal(this), this._pendingInput = new o.Signal(this), this._unhandledMessage = new o.Signal(this), this._displayIdToParentIds = /* @__PURE__ */ new Map(), this._msgIdToDisplayIds = /* @__PURE__ */ new Map(), this._msgChain = Promise.resolve(), this._hasPendingInput = !1, this._reason = "", this._noOp = () => {
      }, this._name = T.model.name, this._id = T.model.id, this.serverSettings = (A = T.serverSettings) !== null && A !== void 0 ? A : a.ServerConnection.makeSettings(), this._clientId = (Et = T.clientId) !== null && Et !== void 0 ? Et : s.UUID.uuid4(), this._username = (ft = T.username) !== null && ft !== void 0 ? ft : "", this.handleComms = (bt = T.handleComms) !== null && bt !== void 0 ? bt : !0, this._createSocket();
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
      return this._specPromise ? this._specPromise : (this._specPromise = O.KernelSpecAPI.getSpecs(this.serverSettings).then((T) => T.kernelspecs[this._name]), this._specPromise);
    }
    /**
     * Clone the current kernel with a new clientId.
     */
    clone(T = {}) {
      return new wt({
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
    sendShellMessage(T, A = !1, Et = !0) {
      return this._sendKernelShellControl(d.KernelShellFutureHandler, T, A, Et);
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
    sendControlMessage(T, A = !1, Et = !0) {
      return this._sendKernelShellControl(d.KernelControlFutureHandler, T, A, Et);
    }
    _sendKernelShellControl(T, A, Et = !1, ft = !0) {
      this._sendMessage(A), this._anyMessage.emit({ msg: A, direction: "send" });
      const bt = new T(() => {
        const dt = A.header.msg_id;
        this._futures.delete(dt);
        const lt = this._msgIdToDisplayIds.get(dt);
        lt && (lt.forEach((yt) => {
          const At = this._displayIdToParentIds.get(yt);
          if (At) {
            const ln = At.indexOf(dt);
            if (ln === -1)
              return;
            At.length === 1 ? this._displayIdToParentIds.delete(yt) : (At.splice(ln, 1), this._displayIdToParentIds.set(yt, At));
          }
        }), this._msgIdToDisplayIds.delete(dt));
      }, A, Et, ft, this);
      return this._futures.set(A.header.msg_id, bt), bt;
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
    _sendMessage(T, A = !0) {
      if (this.status === "dead")
        throw new Error("Kernel is dead");
      if ((this._kernelSession === Ue || this._kernelSession === fe) && p.isInfoRequestMsg(T))
        if (this.connectionStatus === "connected") {
          this._ws.send((0, h.serialize)(T, this._ws.protocol));
          return;
        } else
          throw new Error("Could not send message: status is not connected");
      if (A && this._pendingMessages.length > 0) {
        this._pendingMessages.push(T);
        return;
      }
      if (this.connectionStatus === "connected" && this._kernelSession !== fe)
        this._ws.send((0, h.serialize)(T, this._ws.protocol));
      else if (A)
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
      return w.interruptKernel(this.id, this.serverSettings);
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
      this._updateStatus("restarting"), this._clearKernelState(), this._kernelSession = fe, await w.restartKernel(this.id, this.serverSettings), await this.reconnect(), this.hasPendingInput = !1;
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
      const T = new s.PromiseDelegate(), A = (Et, ft) => {
        ft === "connected" ? (T.resolve(), this.connectionStatusChanged.disconnect(A, this)) : ft === "disconnected" && (T.reject(new Error("Kernel connection disconnected")), this.connectionStatusChanged.disconnect(A, this));
      };
      return this.connectionStatusChanged.connect(A, this), this._reconnectAttempt = 0, this._reconnect(), T.promise;
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
      this.status !== "dead" && await w.shutdownKernel(this.id, this.serverSettings), this.handleShutdown();
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
      const T = p.createMessage({
        msgType: "kernel_info_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: {}
      });
      let A;
      try {
        A = await mt.handleShellMessage(this, T);
      } catch (Et) {
        if (this.isDisposed)
          return;
        throw Et;
      }
      if (this._errorIfDisposed(), !!A)
        return A.content.status === void 0 && (A.content.status = "ok"), A.content.status !== "ok" ? (this._info.reject("Kernel info reply errored"), A) : (this._info.resolve(A.content), this._kernelSession = A.header.session, A);
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
      const A = p.createMessage({
        msgType: "complete_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return mt.handleShellMessage(this, A);
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
      const A = p.createMessage({
        msgType: "inspect_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return mt.handleShellMessage(this, A);
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
      const A = p.createMessage({
        msgType: "history_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return mt.handleShellMessage(this, A);
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
    requestExecute(T, A = !0, Et) {
      const ft = {
        silent: !1,
        store_history: !0,
        user_expressions: {},
        allow_stdin: !0,
        stop_on_error: !1
      }, bt = p.createMessage({
        msgType: "execute_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: { ...ft, ...T },
        metadata: Et
      });
      return this.sendShellMessage(bt, !0, A);
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
    requestDebug(T, A = !0) {
      const Et = p.createMessage({
        msgType: "debug_request",
        channel: "control",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return this.sendControlMessage(Et, !0, A);
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
      const A = p.createMessage({
        msgType: "is_complete_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return mt.handleShellMessage(this, A);
    }
    /**
     * Send a `comm_info_request` message.
     *
     * #### Notes
     * Fulfills with the `comm_info_reply` content when the shell reply is
     * received and validated.
     */
    requestCommInfo(T) {
      const A = p.createMessage({
        msgType: "comm_info_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: T
      });
      return mt.handleShellMessage(this, A);
    }
    /**
     * Send an `input_reply` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#messages-on-the-stdin-router-dealer-sockets).
     */
    sendInputReply(T, A) {
      const Et = p.createMessage({
        msgType: "input_reply",
        channel: "stdin",
        username: this._username,
        session: this._clientId,
        content: T
      });
      Et.parent_header = A, this._sendMessage(Et), this._anyMessage.emit({ msg: Et, direction: "send" }), this.hasPendingInput = !1;
    }
    /**
     * Create a new comm.
     *
     * #### Notes
     * If a client-side comm already exists with the given commId, an error is thrown.
     * If the kernel does not handle comms, an error is thrown.
     */
    createComm(T, A = s.UUID.uuid4()) {
      if (!this.handleComms)
        throw new Error("Comms are disabled on this kernel connection");
      if (this._comms.has(A))
        throw new Error("Comm is already created");
      const Et = new c.CommHandler(T, A, this, () => {
        this._unregisterComm(A);
      });
      return this._comms.set(A, Et), Et;
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
    registerCommTarget(T, A) {
      this.handleComms && (this._targetRegistry[T] = A);
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
    removeCommTarget(T, A) {
      this.handleComms && !this.isDisposed && this._targetRegistry[T] === A && delete this._targetRegistry[T];
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
    registerMessageHook(T, A) {
      var Et;
      const ft = (Et = this._futures) === null || Et === void 0 ? void 0 : Et.get(T);
      ft && ft.registerMessageHook(A);
    }
    /**
     * Remove an IOPub message hook.
     *
     * @param msg_id - The parent_header message id the hook intercepted.
     *
     * @param hook - The callback invoked for the message.
     *
     */
    removeMessageHook(T, A) {
      var Et;
      const ft = (Et = this._futures) === null || Et === void 0 ? void 0 : Et.get(T);
      ft && ft.removeMessageHook(A);
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
    async _handleDisplayId(T, A) {
      var Et, ft;
      const bt = A.parent_header.msg_id;
      let dt = this._displayIdToParentIds.get(T);
      if (dt) {
        const yt = {
          header: s.JSONExt.deepCopy(A.header),
          parent_header: s.JSONExt.deepCopy(A.parent_header),
          metadata: s.JSONExt.deepCopy(A.metadata),
          content: s.JSONExt.deepCopy(A.content),
          channel: A.channel,
          buffers: A.buffers ? A.buffers.slice() : []
        };
        yt.header.msg_type = "update_display_data", await Promise.all(dt.map(async (At) => {
          const ln = this._futures && this._futures.get(At);
          ln && await ln.handleMsg(yt);
        }));
      }
      if (A.header.msg_type === "update_display_data")
        return !0;
      dt = (Et = this._displayIdToParentIds.get(T)) !== null && Et !== void 0 ? Et : [], dt.indexOf(bt) === -1 && dt.push(bt), this._displayIdToParentIds.set(T, dt);
      const lt = (ft = this._msgIdToDisplayIds.get(bt)) !== null && ft !== void 0 ? ft : [];
      return lt.indexOf(bt) === -1 && lt.push(bt), this._msgIdToDisplayIds.set(bt, lt), !1;
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
      this._status === T || this._status === "dead" || (this._status = T, mt.logKernelStatus(this), this._statusChanged.emit(T), T === "dead" && this.dispose());
    }
    /**
     * Send pending messages to the kernel.
     */
    _sendPending() {
      for (; this.connectionStatus === "connected" && this._kernelSession !== fe && this._pendingMessages.length > 0; )
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
      const A = T.content, Et = new c.CommHandler(A.target_name, A.comm_id, this, () => {
        this._unregisterComm(A.comm_id);
      });
      this._comms.set(A.comm_id, Et);
      try {
        await (await mt.loadObject(A.target_name, A.target_module, this._targetRegistry))(Et, T);
      } catch (ft) {
        throw Et.close(), console.error("Exception opening new comm"), ft;
      }
    }
    /**
     * Handle 'comm_close' kernel message.
     */
    async _handleCommClose(T) {
      this._assertCurrentMessage(T);
      const A = T.content, Et = this._comms.get(A.comm_id);
      if (!Et) {
        console.error("Comm not found for comm id " + A.comm_id);
        return;
      }
      this._unregisterComm(Et.commId);
      const ft = Et.onClose;
      ft && await ft(T), Et.dispose();
    }
    /**
     * Handle a 'comm_msg' kernel message.
     */
    async _handleCommMsg(T) {
      this._assertCurrentMessage(T);
      const A = T.content, Et = this._comms.get(A.comm_id);
      if (!Et)
        return;
      const ft = Et.onMsg;
      ft && await ft(T);
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
            let A = this._kernelSession === fe, Et = this.requestKernelInfo(), ft = !1, bt = () => {
              ft || (ft = !0, A && this._kernelSession === fe && (this._kernelSession = ""), clearTimeout(dt), this._pendingMessages.length > 0 && this._sendPending());
            };
            Et.then(bt);
            let dt = setTimeout(bt, M);
          } else
            this._updateStatus("unknown");
        this._connectionStatusChanged.emit(T);
      }
    }
    async _handleMessage(T) {
      var A, Et;
      let ft = !1;
      if (T.parent_header && T.channel === "iopub" && (p.isDisplayDataMsg(T) || p.isUpdateDisplayDataMsg(T) || p.isExecuteResultMsg(T))) {
        const dt = ((A = T.content.transient) !== null && A !== void 0 ? A : {}).display_id;
        dt && (ft = await this._handleDisplayId(dt, T), this._assertCurrentMessage(T));
      }
      if (!ft && T.parent_header) {
        const bt = T.parent_header, dt = (Et = this._futures) === null || Et === void 0 ? void 0 : Et.get(bt.msg_id);
        if (dt)
          await dt.handleMsg(T), this._assertCurrentMessage(T);
        else {
          const lt = bt.session === this.clientId;
          T.channel !== "iopub" && lt && this._unhandledMessage.emit(T);
        }
      }
      if (T.channel === "iopub") {
        switch (T.header.msg_type) {
          case "status": {
            const bt = T.content.execution_state;
            bt === "restarting" && Promise.resolve().then(async () => {
              this._updateStatus("autorestarting"), this._clearKernelState(), await this.reconnect();
            }), this._updateStatus(bt);
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
        const T = mt.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
        console.warn(`Connection lost, reconnecting in ${Math.floor(T / 1e3)} seconds.`);
        const A = this._selectedProtocol !== "";
        this._reconnectTimeout = setTimeout(this._createSocket, T, A), this._reconnectAttempt += 1;
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
  _default$2.KernelConnection = wt;
  var mt;
  return function(gt) {
    function T(bt) {
      switch (bt.status) {
        case "idle":
        case "busy":
        case "unknown":
          return;
        default:
          console.debug(`Kernel: ${bt.status} (${bt.id})`);
          break;
      }
    }
    gt.logKernelStatus = T;
    async function A(bt, dt) {
      return bt.sendShellMessage(dt, !0).done;
    }
    gt.handleShellMessage = A;
    function Et(bt, dt, lt) {
      return new Promise((yt, At) => {
        if (dt) {
          if (typeof requirejs > "u")
            throw new Error("requirejs not found");
          requirejs([dt], (ln) => {
            if (ln[bt] === void 0) {
              const un = `Object '${bt}' not found in module '${dt}'`;
              At(new Error(un));
            } else
              yt(ln[bt]);
          }, At);
        } else
          lt != null && lt[bt] ? yt(lt[bt]) : At(new Error(`Object '${bt}' not found in registry`));
      });
    }
    gt.loadObject = Et;
    function ft(bt, dt) {
      return bt = Math.ceil(bt), dt = Math.floor(dt), Math.floor(Math.random() * (dt - bt + 1)) + bt;
    }
    gt.getRandomIntInclusive = ft;
  }(mt || (mt = {})), _default$2;
}
var manager$3 = {}, hasRequiredManager$3;
function requireManager$3() {
  return hasRequiredManager$3 || (hasRequiredManager$3 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelManager = void 0;
    const t = require$$2, n = require$$0, r = requireLib(), s = basemanager, o = restapi$4, a = require_default$2();
    class c extends s.BaseManager {
      /**
       * Construct a new kernel manager.
       *
       * @param options - The default options for kernel.
       */
      constructor(d = {}) {
        var h;
        super(d), this._isReady = !1, this._kernelConnections = /* @__PURE__ */ new Set(), this._models = /* @__PURE__ */ new Map(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:KernelManager#models",
          standby: (h = d.standby) !== null && h !== void 0 ? h : "when-hidden"
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
        this.isDisposed || (this._models.clear(), this._kernelConnections.forEach((d) => d.dispose()), this._pollModels.dispose(), super.dispose());
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
      connectTo(d) {
        var h;
        const { id: _ } = d.model;
        let O = (h = d.handleComms) !== null && h !== void 0 ? h : !0;
        if (d.handleComms === void 0) {
          for (const M of this._kernelConnections)
            if (M.id === _ && M.handleComms) {
              O = !1;
              break;
            }
        }
        const w = new a.KernelConnection({
          handleComms: O,
          ...d,
          serverSettings: this.serverSettings
        });
        return this._onStarted(w), this._models.has(_) || this.refreshRunning().catch(() => {
        }), w;
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
      async startNew(d = {}, h = {}) {
        const _ = await (0, o.startNew)(d, this.serverSettings);
        return this.connectTo({
          ...h,
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
      async shutdown(d) {
        await (0, o.shutdownKernel)(d, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all kernels.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all([...this._models.keys()].map((d) => (0, o.shutdownKernel)(d, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Find a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves with the kernel's model.
       */
      async findById(d) {
        return this._models.has(d) ? this._models.get(d) : (await this.refreshRunning(), this._models.get(d));
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var d, h;
        let _;
        try {
          _ = await (0, o.listRunning)(this.serverSettings);
        } catch (O) {
          throw (O instanceof r.ServerConnection.NetworkError || ((d = O.response) === null || d === void 0 ? void 0 : d.status) === 503 || ((h = O.response) === null || h === void 0 ? void 0 : h.status) === 424) && this._connectionFailure.emit(O), O;
        }
        this.isDisposed || this._models.size === _.length && _.every((O) => {
          const w = this._models.get(O.id);
          return w ? w.connections === O.connections && w.execution_state === O.execution_state && w.last_activity === O.last_activity && w.name === O.name && w.reason === O.reason && w.traceback === O.traceback : !1;
        }) || (this._models = new Map(_.map((O) => [O.id, O])), this._kernelConnections.forEach((O) => {
          this._models.has(O.id) || O.handleShutdown();
        }), this._runningChanged.emit(_));
      }
      /**
       * Handle a kernel starting.
       */
      _onStarted(d) {
        this._kernelConnections.add(d), d.statusChanged.connect(this._onStatusChanged, this), d.disposed.connect(this._onDisposed, this);
      }
      _onDisposed(d) {
        this._kernelConnections.delete(d), this.refreshRunning().catch(() => {
        });
      }
      _onStatusChanged(d, h) {
        h === "dead" && this.refreshRunning().catch(() => {
        });
      }
    }
    e.KernelManager = c, function(p) {
      class d extends p {
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
        async startNew(_ = {}, O = {}) {
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
      p.NoopManager = d;
    }(c = e.KernelManager || (e.KernelManager = {}));
  }(manager$3)), manager$3;
}
var hasRequiredKernel;
function requireKernel() {
  return hasRequiredKernel || (hasRequiredKernel = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(d, h, _, O) {
      O === void 0 && (O = _);
      var w = Object.getOwnPropertyDescriptor(h, _);
      (!w || ("get" in w ? !h.__esModule : w.writable || w.configurable)) && (w = { enumerable: !0, get: function() {
        return h[_];
      } }), Object.defineProperty(d, O, w);
    } : function(d, h, _, O) {
      O === void 0 && (O = _), d[O] = h[_];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(d, h) {
      Object.defineProperty(d, "default", { enumerable: !0, value: h });
    } : function(d, h) {
      d.default = h;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(d) {
      if (d && d.__esModule)
        return d;
      var h = {};
      if (d != null)
        for (var _ in d)
          _ !== "default" && Object.prototype.hasOwnProperty.call(d, _) && t(h, d, _);
      return n(h, d), h;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(d, h) {
      for (var _ in d)
        _ !== "default" && !Object.prototype.hasOwnProperty.call(h, _) && t(h, d, _);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelConnection = e.KernelAPI = e.KernelMessage = e.Kernel = void 0;
    const o = r(kernel);
    e.Kernel = o;
    const a = r(messages);
    e.KernelMessage = a;
    const c = r(restapi$4);
    e.KernelAPI = c;
    const p = require_default$2();
    Object.defineProperty(e, "KernelConnection", { enumerable: !0, get: function() {
      return p.KernelConnection;
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
    return Object.keys(o).forEach(function(p) {
      const d = o[p].output_mimetype;
      a[p] = { output_mimetype: d };
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
  async function s(h = t.ServerConnection.makeSettings()) {
    const _ = n.URLExt.join(h.baseUrl, e.SESSION_SERVICE_URL), O = await t.ServerConnection.makeRequest(_, {}, h);
    if (O.status !== 200)
      throw await t.ServerConnection.ResponseError.create(O);
    const w = await O.json();
    if (!Array.isArray(w))
      throw new Error("Invalid Session list");
    return w.forEach((M) => {
      (0, r.updateLegacySessionModel)(M), (0, r.validateModel)(M);
    }), w;
  }
  e.listRunning = s;
  function o(h, _) {
    return n.URLExt.join(h, e.SESSION_SERVICE_URL, _);
  }
  e.getSessionUrl = o;
  async function a(h, _ = t.ServerConnection.makeSettings()) {
    var O;
    const w = o(_.baseUrl, h), M = { method: "DELETE" }, fe = await t.ServerConnection.makeRequest(w, M, _);
    if (fe.status === 404) {
      const wt = (O = (await fe.json()).message) !== null && O !== void 0 ? O : `The session "${h}"" does not exist on the server`;
      console.warn(wt);
    } else {
      if (fe.status === 410)
        throw new t.ServerConnection.ResponseError(fe, "The kernel was deleted but the session was not");
      if (fe.status !== 204)
        throw await t.ServerConnection.ResponseError.create(fe);
    }
  }
  e.shutdownSession = a;
  async function c(h, _ = t.ServerConnection.makeSettings()) {
    const O = o(_.baseUrl, h), w = await t.ServerConnection.makeRequest(O, {}, _);
    if (w.status !== 200)
      throw await t.ServerConnection.ResponseError.create(w);
    const M = await w.json();
    return (0, r.updateLegacySessionModel)(M), (0, r.validateModel)(M), M;
  }
  e.getSessionModel = c;
  async function p(h, _ = t.ServerConnection.makeSettings()) {
    const O = n.URLExt.join(_.baseUrl, e.SESSION_SERVICE_URL), w = {
      method: "POST",
      body: JSON.stringify(h)
    }, M = await t.ServerConnection.makeRequest(O, w, _);
    if (M.status !== 201)
      throw await t.ServerConnection.ResponseError.create(M);
    const fe = await M.json();
    return (0, r.updateLegacySessionModel)(fe), (0, r.validateModel)(fe), fe;
  }
  e.startSession = p;
  async function d(h, _ = t.ServerConnection.makeSettings()) {
    const O = o(_.baseUrl, h.id), w = {
      method: "PATCH",
      body: JSON.stringify(h)
    }, M = await t.ServerConnection.makeRequest(O, w, _);
    if (M.status !== 200)
      throw await t.ServerConnection.ResponseError.create(M);
    const fe = await M.json();
    return (0, r.updateLegacySessionModel)(fe), (0, r.validateModel)(fe), fe;
  }
  e.updateSession = d;
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
      var c, p, d, h;
      this._id = "", this._path = "", this._name = "", this._type = "", this._kernel = null, this._isDisposed = !1, this._disposed = new e.Signal(this), this._kernelChanged = new e.Signal(this), this._statusChanged = new e.Signal(this), this._connectionStatusChanged = new e.Signal(this), this._pendingInput = new e.Signal(this), this._iopubMessage = new e.Signal(this), this._unhandledMessage = new e.Signal(this), this._anyMessage = new e.Signal(this), this._propertyChanged = new e.Signal(this), this._id = a.model.id, this._name = a.model.name, this._path = a.model.path, this._type = a.model.type, this._username = (c = a.username) !== null && c !== void 0 ? c : "", this._clientId = (p = a.clientId) !== null && p !== void 0 ? p : r.UUID.uuid4(), this._connectToKernel = a.connectToKernel, this._kernelConnectionOptions = (d = a.kernelConnectionOptions) !== null && d !== void 0 ? d : {}, this.serverSettings = (h = a.serverSettings) !== null && h !== void 0 ? h : t.ServerConnection.makeSettings(), this.setupKernel(a.model.kernel);
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
      const c = this.model;
      if (this._path = a.path, this._name = a.name, this._type = a.type, this._kernel === null && a.kernel !== null || this._kernel !== null && a.kernel === null || this._kernel !== null && a.kernel !== null && this._kernel.id !== a.kernel.id) {
        this._kernel !== null && this._kernel.dispose();
        const p = this._kernel || null;
        this.setupKernel(a.kernel);
        const d = this._kernel || null;
        this._kernelChanged.emit({ name: "kernel", oldValue: p, newValue: d });
      }
      this._handleModelChange(c);
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
          const c = this._kernel;
          this._kernelChanged.emit({ name: "kernel", oldValue: a, newValue: c });
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
      const c = this._connectToKernel({
        ...this._kernelConnectionOptions,
        model: a,
        username: this._username,
        clientId: this._clientId,
        serverSettings: this.serverSettings
      });
      this._kernel = c, c.statusChanged.connect(this.onKernelStatus, this), c.connectionStatusChanged.connect(this.onKernelConnectionStatus, this), c.pendingInput.connect(this.onPendingInput, this), c.unhandledMessage.connect(this.onUnhandledMessage, this), c.iopubMessage.connect(this.onIOPubMessage, this), c.anyMessage.connect(this.onAnyMessage, this);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelStatus(a, c) {
      this._statusChanged.emit(c);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelConnectionStatus(a, c) {
      this._connectionStatusChanged.emit(c);
    }
    /**
     * Handle a change in the pendingInput.
     */
    onPendingInput(a, c) {
      this._pendingInput.emit(c);
    }
    /**
     * Handle iopub kernel messages.
     */
    onIOPubMessage(a, c) {
      this._iopubMessage.emit(c);
    }
    /**
     * Handle unhandled kernel messages.
     */
    onUnhandledMessage(a, c) {
      this._unhandledMessage.emit(c);
    }
    /**
     * Handle any kernel messages.
     */
    onAnyMessage(a, c) {
      this._anyMessage.emit(c);
    }
    /**
     * Send a PATCH to the server, updating the session path or the kernel.
     */
    async _patch(a) {
      const c = await (0, n.updateSession)({ ...a, id: this._id }, this.serverSettings);
      return this.update(c), c;
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
    class c extends s.BaseManager {
      /**
       * Construct a new session manager.
       *
       * @param options - The default options for each session.
       */
      constructor(d) {
        var h;
        super(d), this._isReady = !1, this._sessionConnections = /* @__PURE__ */ new Set(), this._models = /* @__PURE__ */ new Map(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), this._connectToKernel = (_) => this._kernelManager.connectTo(_), this._kernelManager = d.kernelManager, this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:SessionManager#models",
          standby: (h = d.standby) !== null && h !== void 0 ? h : "when-hidden"
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
        this.isDisposed || (this._models.clear(), this._sessionConnections.forEach((d) => d.dispose()), this._pollModels.dispose(), super.dispose());
      }
      /*
       * Connect to a running session.  See also [[connectToSession]].
       */
      connectTo(d) {
        const h = new o.SessionConnection({
          ...d,
          connectToKernel: this._connectToKernel,
          serverSettings: this.serverSettings
        });
        return this._onStarted(h), this._models.has(d.model.id) || this.refreshRunning().catch(() => {
        }), h;
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
      async startNew(d, h = {}) {
        const _ = await (0, a.startSession)(d, this.serverSettings);
        return await this.refreshRunning(), this.connectTo({ ...h, model: _ });
      }
      /**
       * Shut down a session by id.
       */
      async shutdown(d) {
        await (0, a.shutdownSession)(d, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all sessions.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all([...this._models.keys()].map((d) => (0, a.shutdownSession)(d, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Find a session associated with a path and stop it if it is the only session
       * using that kernel.
       *
       * @param path - The path in question.
       *
       * @returns A promise that resolves when the relevant sessions are stopped.
       */
      async stopIfNeeded(d) {
        try {
          const _ = (await (0, a.listRunning)(this.serverSettings)).filter((O) => O.path === d);
          if (_.length === 1) {
            const O = _[0].id;
            await this.shutdown(O);
          }
        } catch {
        }
      }
      /**
       * Find a session by id.
       */
      async findById(d) {
        return this._models.has(d) ? this._models.get(d) : (await this.refreshRunning(), this._models.get(d));
      }
      /**
       * Find a session by path.
       */
      async findByPath(d) {
        for (const h of this._models.values())
          if (h.path === d)
            return h;
        await this.refreshRunning();
        for (const h of this._models.values())
          if (h.path === d)
            return h;
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var d, h;
        let _;
        try {
          _ = await (0, a.listRunning)(this.serverSettings);
        } catch (O) {
          throw (O instanceof r.ServerConnection.NetworkError || ((d = O.response) === null || d === void 0 ? void 0 : d.status) === 503 || ((h = O.response) === null || h === void 0 ? void 0 : h.status) === 424) && this._connectionFailure.emit(O), O;
        }
        this.isDisposed || this._models.size === _.length && _.every((O) => {
          var w, M, fe, Ue;
          const wt = this._models.get(O.id);
          return wt ? ((w = wt.kernel) === null || w === void 0 ? void 0 : w.id) === ((M = O.kernel) === null || M === void 0 ? void 0 : M.id) && ((fe = wt.kernel) === null || fe === void 0 ? void 0 : fe.name) === ((Ue = O.kernel) === null || Ue === void 0 ? void 0 : Ue.name) && wt.name === O.name && wt.path === O.path && wt.type === O.type : !1;
        }) || (this._models = new Map(_.map((O) => [O.id, O])), this._sessionConnections.forEach((O) => {
          this._models.has(O.id) ? O.update(this._models.get(O.id)) : O.dispose();
        }), this._runningChanged.emit(_));
      }
      /**
       * Handle a session starting.
       */
      _onStarted(d) {
        this._sessionConnections.add(d), d.disposed.connect(this._onDisposed, this), d.propertyChanged.connect(this._onChanged, this), d.kernelChanged.connect(this._onChanged, this);
      }
      _onDisposed(d) {
        this._sessionConnections.delete(d), this.refreshRunning().catch(() => {
        });
      }
      _onChanged() {
        this.refreshRunning().catch(() => {
        });
      }
    }
    e.SessionManager = c, function(p) {
      class d extends p {
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
        async startNew(_, O = {}) {
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
      p.NoopManager = d;
    }(c = e.SessionManager || (e.SessionManager = {}));
  }(manager$1)), manager$1;
}
var hasRequiredSession;
function requireSession() {
  return hasRequiredSession || (hasRequiredSession = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(c, p, d, h) {
      h === void 0 && (h = d);
      var _ = Object.getOwnPropertyDescriptor(p, d);
      (!_ || ("get" in _ ? !p.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
        return p[d];
      } }), Object.defineProperty(c, h, _);
    } : function(c, p, d, h) {
      h === void 0 && (h = d), c[h] = p[d];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(c, p) {
      Object.defineProperty(c, "default", { enumerable: !0, value: p });
    } : function(c, p) {
      c.default = p;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(c) {
      if (c && c.__esModule)
        return c;
      var p = {};
      if (c != null)
        for (var d in c)
          d !== "default" && Object.prototype.hasOwnProperty.call(c, d) && t(p, c, d);
      return n(p, c), p;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(c, p) {
      for (var d in c)
        d !== "default" && !Object.prototype.hasOwnProperty.call(p, d) && t(p, c, d);
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
          const a = `${this.namespace}:${o}`, c = (r = (n = this._restore).args) === null || r === void 0 ? void 0 : r.call(n, t);
          Private$3.nameProperty.set(t, a), await s.save(a, { data: c });
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
    const { command: n, connector: r, registry: s, when: o } = t, a = this.namespace, c = o ? [r.list(a)].concat(o) : [r.list(a)];
    this._restore = t;
    const [p] = await Promise.all(c), d = await Promise.all(p.ids.map(async (h, _) => {
      const O = p.values[_], w = O && O.data;
      return w === void 0 ? r.remove(h) : s.execute(n, w).catch(() => r.remove(h));
    }));
    return this._restored.resolve(), d;
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
    const { connector: o } = this._restore, a = this._restore.name(t), c = Private$3.nameProperty.get(t), p = a ? `${this.namespace}:${a}` : "";
    if (c && c !== p && await o.remove(c), Private$3.nameProperty.set(t, p), p) {
      const d = (r = (n = this._restore).args) === null || r === void 0 ? void 0 : r.call(n, t);
      await o.save(p, { data: d });
    }
    c !== p && this._updated.emit(t);
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
      this._connector = o || new n.Connector(), a ? this._ready = a.then((c) => {
        const { contents: p, type: d } = c;
        switch (d) {
          case "cancel":
            return;
          case "clear":
            return this._clear();
          case "merge":
            return this._merge(p || {});
          case "overwrite":
            return this._overwrite(p || {});
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
      return o.reduce((a, c, p) => (a[s[p]] = c, a), {});
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
        values: a.map((c) => JSON.parse(c).v)
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
        return Object.keys(this._storage).reduce((c, p) => ((a === "" || a === p.split(":")[0]) && (c.ids.push(p), c.values.push(this._storage[p])), c), { ids: [], values: [] });
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
      async save(a, c) {
        this._storage[a] = c;
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
    var c = Object.getOwnPropertyDescriptor(s, o);
    (!c || ("get" in c ? !s.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, c);
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
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1$2.ServerConnection, c = r + s, p = Private$2.url(c, t), d = await o(p, {}, n);
    if (d.status !== 200)
      throw await a.create(d);
    return d.json();
  }
  /**
   * Fetch the list of all plugin setting bundles.
   *
   * @returns A promise that resolves if successful.
   */
  async list(t) {
    var n, r, s, o;
    const { serverSettings: a } = this, { baseUrl: c, appUrl: p } = a, { makeRequest: d, ResponseError: h } = serverconnection_1$2.ServerConnection, _ = c + p, O = Private$2.url(_, "", t === "ids"), w = await d(O, {}, a);
    if (w.status !== 200)
      throw new h(w);
    const M = await w.json(), fe = (r = (n = M == null ? void 0 : M.settings) === null || n === void 0 ? void 0 : n.map((wt) => wt.id)) !== null && r !== void 0 ? r : [];
    let Ue = [];
    return t || (Ue = (o = (s = M == null ? void 0 : M.settings) === null || s === void 0 ? void 0 : s.map((wt) => (wt.data = { composite: {}, user: {} }, wt))) !== null && o !== void 0 ? o : []), { ids: fe, values: Ue };
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
    const { serverSettings: r } = this, { baseUrl: s, appUrl: o } = r, { makeRequest: a, ResponseError: c } = serverconnection_1$2.ServerConnection, p = s + o, d = Private$2.url(p, t), h = { body: JSON.stringify({ raw: n }), method: "PUT" }, _ = await a(d, h, r);
    if (_.status !== 204)
      throw new c(_);
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
  async function s(p = n.ServerConnection.makeSettings(), d, h) {
    c.errorIfNotAvailable();
    const _ = t.URLExt.join(p.baseUrl, e.TERMINAL_SERVICE_URL), O = {
      method: "POST",
      body: JSON.stringify({ name: d, cwd: h })
    }, w = await n.ServerConnection.makeRequest(_, O, p);
    if (w.status !== 200)
      throw await n.ServerConnection.ResponseError.create(w);
    return await w.json();
  }
  e.startNew = s;
  async function o(p = n.ServerConnection.makeSettings()) {
    c.errorIfNotAvailable();
    const d = t.URLExt.join(p.baseUrl, e.TERMINAL_SERVICE_URL), h = await n.ServerConnection.makeRequest(d, {}, p);
    if (h.status !== 200)
      throw await n.ServerConnection.ResponseError.create(h);
    const _ = await h.json();
    if (!Array.isArray(_))
      throw new Error("Invalid terminal list");
    return _;
  }
  e.listRunning = o;
  async function a(p, d = n.ServerConnection.makeSettings()) {
    var h;
    c.errorIfNotAvailable();
    const _ = t.URLExt.join(d.baseUrl, e.TERMINAL_SERVICE_URL, p), O = { method: "DELETE" }, w = await n.ServerConnection.makeRequest(_, O, d);
    if (w.status === 404) {
      const fe = (h = (await w.json()).message) !== null && h !== void 0 ? h : `The terminal session "${p}"" does not exist on the server`;
      console.warn(fe);
    } else if (w.status !== 204)
      throw await n.ServerConnection.ResponseError.create(w);
  }
  e.shutdownTerminal = a;
  var c;
  (function(p) {
    function d() {
      if (!r())
        throw new Error("Terminals Unavailable");
    }
    p.errorIfNotAvailable = d;
  })(c || (c = {}));
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
    constructor(p) {
      var d;
      this._createSocket = () => {
        this._errorIfDisposed(), this._clearSocket(), this._updateConnectionStatus("connecting");
        const h = this._name, _ = this.serverSettings;
        let O = e.URLExt.join(_.wsUrl, "terminals", "websocket", encodeURIComponent(h));
        const w = _.token;
        _.appendToken && w !== "" && (O = O + `?token=${encodeURIComponent(w)}`), this._ws = new _.WebSocket(O), this._ws.onmessage = this._onWSMessage, this._ws.onclose = this._onWSClose, this._ws.onerror = this._onWSClose;
      }, this._onWSMessage = (h) => {
        if (this._isDisposed)
          return;
        const _ = JSON.parse(h.data);
        if (_[0] === "disconnect" && this.dispose(), this._connectionStatus === "connecting") {
          _[0] === "setup" && this._updateConnectionStatus("connected");
          return;
        }
        this._messageReceived.emit({
          type: _[0],
          content: _.slice(1)
        });
      }, this._onWSClose = (h) => {
        console.warn(`Terminal websocket closed: ${h.code}`), this.isDisposed || this._reconnect();
      }, this._connectionStatus = "connecting", this._connectionStatusChanged = new n.Signal(this), this._isDisposed = !1, this._disposed = new n.Signal(this), this._messageReceived = new n.Signal(this), this._reconnectTimeout = null, this._ws = null, this._noOp = () => {
      }, this._reconnectLimit = 7, this._reconnectAttempt = 0, this._pendingMessages = [], this._name = p.model.name, this.serverSettings = (d = p.serverSettings) !== null && d !== void 0 ? d : r.ServerConnection.makeSettings(), this._createSocket();
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
    send(p) {
      this._sendMessage(p);
    }
    /**
     * Send a message on the websocket, or possibly queue for later sending.
     *
     * @param queue - whether to queue the message if it cannot be sent
     */
    _sendMessage(p, d = !0) {
      if (!(this._isDisposed || !p.content))
        if (this.connectionStatus === "connected" && this._ws) {
          const h = [p.type, ...p.content];
          this._ws.send(JSON.stringify(h));
        } else if (d)
          this._pendingMessages.push(p);
        else
          throw new Error(`Could not send message: ${JSON.stringify(p)}`);
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
      const p = new t.PromiseDelegate(), d = (h, _) => {
        _ === "connected" ? (p.resolve(), this.connectionStatusChanged.disconnect(d, this)) : _ === "disconnected" && (p.reject(new Error("Terminal connection disconnected")), this.connectionStatusChanged.disconnect(d, this));
      };
      return this.connectionStatusChanged.connect(d, this), this._reconnectAttempt = 0, this._reconnect(), p.promise;
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
      if (this._errorIfDisposed(), clearTimeout(this._reconnectTimeout), this._reconnectAttempt < this._reconnectLimit) {
        this._updateConnectionStatus("connecting");
        const p = a.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
        console.error(`Connection lost, reconnecting in ${Math.floor(p / 1e3)} seconds.`), this._reconnectTimeout = setTimeout(this._createSocket, p), this._reconnectAttempt += 1;
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
    _updateConnectionStatus(p) {
      this._connectionStatus !== p && (this._connectionStatus = p, p !== "connecting" && (this._reconnectAttempt = 0, clearTimeout(this._reconnectTimeout)), p === "connected" && this._sendPending(), this._connectionStatusChanged.emit(p));
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
  return function(c) {
    function p(h, _) {
      return e.URLExt.join(h, s.TERMINAL_SERVICE_URL, encodeURIComponent(_));
    }
    c.getTermUrl = p;
    function d(h, _) {
      return h = Math.ceil(h), _ = Math.floor(_), Math.floor(Math.random() * (_ - h + 1)) + h;
    }
    c.getRandomIntInclusive = d;
  }(a || (a = {})), _default;
}
var hasRequiredManager$1;
function requireManager$1() {
  return hasRequiredManager$1 || (hasRequiredManager$1 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TerminalManager = void 0;
    const t = require$$2, n = require$$0, r = requireLib(), s = basemanager, o = restapi, a = require_default();
    class c extends s.BaseManager {
      /**
       * Construct a new terminal manager.
       */
      constructor(d = {}) {
        var h;
        if (super(d), this._isReady = !1, this._names = [], this._terminalConnections = /* @__PURE__ */ new Set(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), !this.isAvailable()) {
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
          standby: (h = d.standby) !== null && h !== void 0 ? h : "when-hidden"
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
        this.isDisposed || (this._names.length = 0, this._terminalConnections.forEach((d) => d.dispose()), this._pollModels.dispose(), super.dispose());
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
      connectTo(d) {
        const h = new a.TerminalConnection({
          ...d,
          serverSettings: this.serverSettings
        });
        return this._onStarted(h), this._names.includes(d.model.name) || this.refreshRunning().catch(() => {
        }), h;
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
      async startNew(d) {
        const h = await (0, o.startNew)(this.serverSettings, d == null ? void 0 : d.name, d == null ? void 0 : d.cwd);
        return await this.refreshRunning(), this.connectTo({ model: h });
      }
      /**
       * Shut down a terminal session by name.
       */
      async shutdown(d) {
        await (0, o.shutdownTerminal)(d, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all terminal sessions.
       *
       * @returns A promise that resolves when all of the sessions are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all(this._names.map((d) => (0, o.shutdownTerminal)(d, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Execute a request to the server to poll running terminals and update state.
       */
      async requestRunning() {
        var d, h;
        let _;
        try {
          _ = await (0, o.listRunning)(this.serverSettings);
        } catch (w) {
          throw (w instanceof r.ServerConnection.NetworkError || ((d = w.response) === null || d === void 0 ? void 0 : d.status) === 503 || ((h = w.response) === null || h === void 0 ? void 0 : h.status) === 424) && this._connectionFailure.emit(w), w;
        }
        if (this.isDisposed)
          return;
        const O = _.map(({ name: w }) => w).sort();
        O !== this._names && (this._names = O, this._terminalConnections.forEach((w) => {
          O.includes(w.name) || w.dispose();
        }), this._runningChanged.emit(this._models));
      }
      /**
       * Handle a session starting.
       */
      _onStarted(d) {
        this._terminalConnections.add(d), d.disposed.connect(this._onDisposed, this);
      }
      /**
       * Handle a session terminating.
       */
      _onDisposed(d) {
        this._terminalConnections.delete(d), this.refreshRunning().catch(() => {
        });
      }
      get _models() {
        return this._names.map((d) => ({ name: d }));
      }
    }
    e.TerminalManager = c, function(p) {
      class d extends p {
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
      p.NoopManager = d;
    }(c = e.TerminalManager || (e.TerminalManager = {}));
  }(manager)), manager;
}
var hasRequiredTerminal;
function requireTerminal() {
  return hasRequiredTerminal || (hasRequiredTerminal = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(c, p, d, h) {
      h === void 0 && (h = d);
      var _ = Object.getOwnPropertyDescriptor(p, d);
      (!_ || ("get" in _ ? !p.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
        return p[d];
      } }), Object.defineProperty(c, h, _);
    } : function(c, p, d, h) {
      h === void 0 && (h = d), c[h] = p[d];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(c, p) {
      Object.defineProperty(c, "default", { enumerable: !0, value: p });
    } : function(c, p) {
      c.default = p;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(c) {
      if (c && c.__esModule)
        return c;
      var p = {};
      if (c != null)
        for (var d in c)
          d !== "default" && Object.prototype.hasOwnProperty.call(c, d) && t(p, c, d);
      return n(p, c), p;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(c, p) {
      for (var d in c)
        d !== "default" && !Object.prototype.hasOwnProperty.call(p, d) && t(p, c, d);
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
    }, c = await o.json(), p = c.identity, { localStorage: d } = window, h = d.getItem(SERVICE_ID);
    if (h && (!p.initials || !p.color)) {
      const _ = JSON.parse(h);
      p.initials = p.initials || _.initials || p.name.substring(0, 1), p.color = p.color || _.color || Private$1.getRandomColor();
    }
    coreutils_2.JSONExt.deepEqual(c, a) || (this._identity = p, this._permissions = c.permissions, d.setItem(SERVICE_ID, JSON.stringify(p)), this._userChanged.emit(c));
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
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1.ServerConnection, c = r + s, p = Private.url(c, t), d = await o(p, {}, n);
    if (d.status !== 200)
      throw await a.create(d);
    return d.json();
  }
  /**
   * Fetch the list of workspace IDs that exist on the server.
   *
   * @returns A promise that resolves if successful.
   */
  async list() {
    const { serverSettings: t } = this, { baseUrl: n, appUrl: r } = t, { makeRequest: s, ResponseError: o } = serverconnection_1.ServerConnection, a = n + r, c = Private.url(a, ""), p = await s(c, {}, t);
    if (p.status !== 200)
      throw await o.create(p);
    return (await p.json()).workspaces;
  }
  /**
   * Remove a workspace from the server.
   *
   * @param id - The workspaces's ID.
   *
   * @returns A promise that resolves if successful.
   */
  async remove(t) {
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: a } = serverconnection_1.ServerConnection, c = r + s, p = Private.url(c, t), h = await o(p, { method: "DELETE" }, n);
    if (h.status !== 204)
      throw await a.create(h);
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
    const { serverSettings: r } = this, { baseUrl: s, appUrl: o } = r, { makeRequest: a, ResponseError: c } = serverconnection_1.ServerConnection, p = s + o, d = Private.url(p, t), h = { body: JSON.stringify(n), method: "PUT" }, _ = await a(d, h, r);
    if (_.status !== 204)
      throw await c.create(_);
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
  const e = require$$0, t = builder, n = requireContents(), r = event, s = requireKernel(), o = kernelspec$1, a = nbconvert, c = serverconnection, p = requireSession(), d = setting, h = requireTerminal(), _ = user, O = workspace;
  class w {
    /**
     * Construct a new services provider.
     */
    constructor(fe = {}) {
      var Ue, wt;
      this._isDisposed = !1, this._connectionFailure = new e.Signal(this), this._isReady = !1;
      const mt = fe.defaultDrive, gt = (Ue = fe.serverSettings) !== null && Ue !== void 0 ? Ue : c.ServerConnection.makeSettings(), T = (wt = fe.standby) !== null && wt !== void 0 ? wt : "when-hidden", A = { defaultDrive: mt, serverSettings: gt, standby: T };
      this.serverSettings = gt, this.contents = fe.contents || new n.ContentsManager(A), this.events = fe.events || new r.EventManager(A), this.kernels = fe.kernels || new s.KernelManager(A), this.sessions = fe.sessions || new p.SessionManager({
        ...A,
        kernelManager: this.kernels
      }), this.settings = fe.settings || new d.SettingManager(A), this.terminals = fe.terminals || new h.TerminalManager(A), this.builder = fe.builder || new t.BuildManager(A), this.workspaces = fe.workspaces || new O.WorkspaceManager(A), this.nbconvert = fe.nbconvert || new a.NbConvertManager(A), this.kernelspecs = fe.kernelspecs || new o.KernelSpecManager(A), this.user = fe.user || new _.UserManager(A), this.kernelspecs.connectionFailure.connect(this._onConnectionFailure, this), this.sessions.connectionFailure.connect(this._onConnectionFailure, this), this.terminals.connectionFailure.connect(this._onConnectionFailure, this);
      const Et = [this.sessions.ready, this.kernelspecs.ready];
      this.terminals.isAvailable() && Et.push(this.terminals.ready), this._readyPromise = Promise.all(Et).then(() => {
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
    _onConnectionFailure(fe, Ue) {
      this._connectionFailure.emit(Ue);
    }
  }
  return manager$2.ServiceManager = w, manager$2;
}
var hasRequiredLib;
function requireLib() {
  return hasRequiredLib || (hasRequiredLib = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
      a === void 0 && (a = o);
      var c = Object.getOwnPropertyDescriptor(s, o);
      (!c || ("get" in c ? !s.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
        return s[o];
      } }), Object.defineProperty(r, a, c);
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
      mode: "cors",
      cache: "no-store",
      credentials: "same-origin"
    },
    fetch,
    Request,
    Headers,
    WebSocket
  };
}
class Jupyter {
  constructor(t, n, r, s, o) {
    /**
     * 服务设置
     * {@inheritDoc jupyterlab.ServiceManager.serverSettings}
     * @see {@link jupyterlab.ServiceManager.serverSettings}
     */
    hn(this, "serverSettings");
    /**
     * 内核清单管理
     * {@inheritDoc jupyterlab.ServiceManager.kernelspecs}
     * @see {@link jupyterlab.ServiceManager.kernelspecs}
     */
    hn(this, "kernelspecs");
    /**
     * 内核管理
     * {@inheritDoc jupyterlab.ServiceManager.kernels}
     * @see {@link jupyterlab.ServiceManager.kernels}
     */
    hn(this, "kernels");
    /**
     * 会话管理
     * {@inheritDoc jupyterlab.ServiceManager.sessions}
     * @see {@link jupyterlab.ServiceManager.sessions}
     */
    hn(this, "sessions");
    /**
     * 实例是否销毁
     * {@inheritDoc jupyterlab.ServiceManager._isDisposed}
     * @see {@link jupyterlab.ServiceManager._isDisposed}
     */
    hn(this, "_isDisposed", !1);
    /**
     * 实例是否就绪
     * {@inheritDoc jupyterlab.ServiceManager._readyPromise}
     * @see {@link jupyterlab.ServiceManager._readyPromise}
     */
    hn(this, "_readyPromise");
    /**
     * 实例是否就绪
     * {@inheritDoc jupyterlab.ServiceManager._isReady}
     * @see {@link jupyterlab.ServiceManager._isReady}
     */
    hn(this, "_isReady", !1);
    hn(this, "errorEventListener", (...t) => {
      this.logger.warn(...t);
    });
    this.logger = n, this.kernelSpecsChangedEventListener = r, this.kernelsChangedEventListener = s, this.sessionsChangedEventListener = o, this.serverSettings = makeSettings(t);
    const a = {
      serverSettings: this.serverSettings
    };
    this.kernelspecs = new libExports.KernelSpecManager(a), this.kernels = new libExports.KernelManager(a), this.sessions = new libExports.SessionManager({
      ...a,
      kernelManager: this.kernels
    });
    const c = [
      this.sessions.ready,
      this.kernelspecs.ready
    ];
    this._readyPromise = Promise.all(c).then(() => {
      this._isReady = !0;
    }), this.onload();
  }
  /**
   * 实例是否销毁
   * {@inheritDoc jupyterlab.ServiceManager.ready}
   * @see {@link jupyterlab.ServiceManager.ready}
   */
  get ready() {
    return this._readyPromise;
  }
  /**
   * 实例是否销毁
   * {@inheritDoc jupyterlab.ServiceManager.isReady}
   * @see {@link jupyterlab.ServiceManager.isReady}
   */
  get isReady() {
    return this._isReady;
  }
  /**
   * 实例是否销毁
   * {@inheritDoc jupyterlab.ServiceManager.isDisposed}
   * @see {@link jupyterlab.ServiceManager.isDisposed}
   */
  get isDisposed() {
    return this._isDisposed;
  }
  /**
   * 资源销毁
   * {@inheritDoc jupyterlab.ServiceManager.dispose}
   * @see {@link jupyterlab.ServiceManager.dispose}
   */
  dispose() {
    this._isDisposed || (this.unload(), [
      this.kernelspecs,
      this.sessions,
      this.kernels
      // this.user,
      // this.contents,
      // this.events,
      // this.terminals,
    ].forEach((t) => {
      try {
        t.dispose();
      } catch (n) {
        this.logger.warn(n);
      }
    }), this._isDisposed = !0);
  }
  /* 刷新状态 */
  async refresh() {
    await Promise.allSettled([
      this.kernelspecs.refreshSpecs(),
      this.kernels.refreshRunning(),
      this.sessions.refreshRunning()
    ]);
  }
  onload() {
    this.kernelspecs.specsChanged.connect(this.kernelSpecsChangedEventListener), this.kernelspecs.connectionFailure.connect(this.errorEventListener), this.kernels.runningChanged.connect(this.kernelsChangedEventListener), this.kernels.connectionFailure.connect(this.errorEventListener), this.sessions.runningChanged.connect(this.sessionsChangedEventListener), this.sessions.connectionFailure.connect(this.errorEventListener);
  }
  unload() {
    this.kernelspecs.specsChanged.disconnect(this.kernelSpecsChangedEventListener), this.kernelspecs.connectionFailure.disconnect(this.errorEventListener), this.kernels.runningChanged.disconnect(this.kernelsChangedEventListener), this.kernels.connectionFailure.disconnect(this.errorEventListener), this.sessions.runningChanged.disconnect(this.sessionsChangedEventListener), this.sessions.connectionFailure.disconnect(this.errorEventListener);
  }
}
const config = DEFAULT_CONFIG, logger = new Logger(`${self.name}-worker:${CONSTANTS.JUPYTER_WORKER_FILE_NAME}`), client = new Fe(
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
async function insertBlock(e, t, n, r = "markdown") {
  e.output.reply ? await client.appendBlock({
    parentID: e.output.id,
    data: n,
    dataType: r
  }) : await client.insertBlock({
    nextID: t,
    data: n,
    dataType: r
  });
}
async function executeCode(e, t, n, r, s, o, ...a) {
  if (r.kernel) {
    const c = {
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
        reply: !1,
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
    }, p = await client.getBlockAttrs({ id: c.code.id });
    if (c.code.attrs = p.data, CONSTANTS.attrs.code.output in c.code.attrs)
      try {
        const h = c.code.attrs[CONSTANTS.attrs.code.output], _ = await client.getBlockAttrs({ id: h });
        c.output.id = h, c.output.new = !1, c.output.attrs = _.data;
      } catch {
      }
    initContext(c), await initOutputBlock(c);
    const d = r.kernel.requestExecute(
      {
        ...config.jupyter.execute.content,
        ...a[0],
        code: t
      },
      a[1],
      a[2]
    );
    d.onIOPub = async (h) => {
      switch (h.header.msg_type) {
        case "status": {
          await handleStatusMessage(
            h,
            c
          );
          break;
        }
        case "stream": {
          await handleStreamMessage(
            h,
            c
          );
          break;
        }
        case "error": {
          await handleErrorMessage(
            h,
            c
          );
          break;
        }
        case "execute_input": {
          await handleExecuteInputMessage(
            h,
            c
          );
          break;
        }
        case "display_data": {
          await handleDisplayDataMessage(
            h,
            c
          );
          break;
        }
        case "update_display_data": {
          await handleUpdateDisplayDataMessage(
            h,
            c
          );
          break;
        }
        case "execute_result": {
          await handleExecuteResultMessage(
            h,
            c
          );
          break;
        }
        case "clear_output": {
          await initOutputBlock(c);
          break;
        }
      }
    }, d.onStdin = (h) => handleStdinMessage(h, c, d), d.onReply = (h) => handleExecuteReplyMessage(h, c);
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
    s.push(o), t.output.stream.initialized = !0, t.output.hrs.stream.used = !0, await insertBlock(
      t,
      t.output.hrs.stream.id,
      s.join(`
`)
    );
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
  t.output.hrs.error.used = !0, await insertBlock(
    t,
    t.output.hrs.error.id,
    o
  );
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
  t.output.hrs.display_data.used = !0, await insertBlock(
    t,
    t.output.hrs.display_data.id,
    r
  );
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
    e.content.metadata,
    !0
  );
  t.output.hrs.execute_result.used = !0;
  for (const r of n)
    await insertBlock(
      t,
      t.output.hrs.execute_result.id,
      r
    );
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
      t.output.hrs.stream.used = !0, await insertBlock(
        t,
        t.output.hrs.stream.id,
        a
      ), n.sendInputReply(
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
  t.output.reply = !0, t.code.attrs[CONSTANTS.attrs.code.execute_reply] = e.header.date;
  const n = hooks(e.metadata.started || e.parent_header.date), r = hooks(e.header.date), s = hooks.unix(r.diff(n) / 1e3).utc();
  t.code.attrs[CONSTANTS.attrs.code.time] = `${i18n.messages.lastRunTime.text}: ${n.format(CONSTANTS.JUPYTER_LAST_RUN_TIME_FORMAT)} | ${i18n.messages.runtime.text}: ${s.format(CONSTANTS.JUPYTER_RUNTIME_FORMAT)} `;
  const o = e.content.execution_count ? e.content.execution_count.toString() : null;
  switch (e.content.status) {
    case "ok": {
      t.code.attrs[CONSTANTS.attrs.code.index] = o, t.output.attrs[CONSTANTS.attrs.output.index] = o;
      const p = e.content.payload;
      if (p && Array.isArray(p) && p.length > 0) {
        const d = [];
        for (const h of p)
          if (h != null && h.data) {
            const _ = await parseData(
              client,
              t.output.options,
              h.data,
              h.metadata
            );
            d.push(_);
          }
        t.output.hrs.execute_reply.used = !0, await client.insertBlock({
          nextID: t.output.hrs.execute_reply.id,
          data: [
            "{{{row",
            d.join(`

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
      const p = [
        "```plaintext",
        new Output(e.content.traceback.join(`
`)).stripAnsi().toString(),
        "```",
        createIAL({ style: CONSTANTS.styles.error })
      ].join(`
`);
      t.output.hrs.execute_reply.used = !0, await client.insertBlock({
        nextID: t.output.hrs.execute_reply.id,
        data: p,
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
  const a = t.output.hrs, c = [];
  a.stream.used && (a.error.used || a.display_data.used || a.execute_result.used || a.execute_reply.used) || c.push(a.stream.id), a.error.used && (a.display_data.used || a.execute_result.used || a.execute_reply.used) || c.push(a.error.id), a.display_data.used && (a.execute_result.used || a.execute_reply.used) || c.push(a.display_data.id), a.execute_result.used && a.execute_reply.used || c.push(a.execute_result.id), c.push(a.execute_reply.id);
  for (const p of c)
    await client.deleteBlock({ id: p });
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
      const c = id_2_session_connection.get(r);
      return c && await executeCode(
        e,
        t,
        n,
        c,
        s,
        o,
        ...a
      ), c == null ? void 0 : c.model;
    }
  },
  "jupyter.session.kernel.connection.requestComplete": {
    // 请求自动补全
    this: self,
    async func(e, t) {
      var s;
      const n = id_2_session_connection.get(e);
      return await ((s = n == null ? void 0 : n.kernel) == null ? void 0 : s.requestComplete(t));
    }
  },
  "jupyter.session.kernel.connection.requestInspect": {
    // 请求上下文参考
    this: self,
    async func(e, t) {
      var s;
      const n = id_2_session_connection.get(e);
      return await ((s = n == null ? void 0 : n.kernel) == null ? void 0 : s.requestInspect(t));
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

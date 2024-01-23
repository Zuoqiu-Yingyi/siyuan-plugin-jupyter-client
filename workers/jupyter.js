var Qn = Object.defineProperty;
var kr = (e, t, n) => t in e ? Qn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var vn = (e, t, n) => (kr(e, typeof t != "symbol" ? t + "" : t, n), n);
var Rt = Object.defineProperty, Pt = (e, t, n) => t in e ? Rt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, E = (e, t, n) => (Pt(e, typeof t != "symbol" ? t + "" : t, n), n);
const Tt = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Dt = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Nt = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function _t(e, t) {
  if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
    Bt(e);
    return;
  }
  return t;
}
function Bt(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function Ft(e, t = {}) {
  if (typeof e != "string")
    return e;
  const n = e.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    e[0] === '"' && e.at(-1) === '"' && !e.includes("\\")
  )
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
  if (!Nt.test(e)) {
    if (t.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (Tt.test(e) || Dt.test(e)) {
      if (t.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, _t);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict)
      throw r;
    return e;
  }
}
const xt = /#/g, vt = /&/g, qt = /=/g, ue = /\+/g, It = /%5e/gi, Lt = /%60/gi, Ut = /%7c/gi, Mt = /%20/gi;
function jt(e) {
  return encodeURI("" + e).replace(Ut, "|");
}
function ne(e) {
  return jt(typeof e == "string" ? e : JSON.stringify(e)).replace(ue, "%2B").replace(Mt, "+").replace(xt, "%23").replace(vt, "%26").replace(Lt, "`").replace(It, "^");
}
function Y(e) {
  return ne(e).replace(qt, "%3D");
}
function Me(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function Ht(e) {
  return Me(e.replace(ue, " "));
}
function zt(e) {
  return Me(e.replace(ue, " "));
}
function $t(e = "") {
  const t = {};
  e[0] === "?" && (e = e.slice(1));
  for (const n of e.split("&")) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2)
      continue;
    const s = Ht(r[1]);
    if (s === "__proto__" || s === "constructor")
      continue;
    const o = zt(r[2] || "");
    t[s] === void 0 ? t[s] = o : Array.isArray(t[s]) ? t[s].push(o) : t[s] = [t[s], o];
  }
  return t;
}
function Wt(e, t) {
  return (typeof t == "number" || typeof t == "boolean") && (t = String(t)), t ? Array.isArray(t) ? t.map((n) => `${Y(e)}=${ne(n)}`).join("&") : `${Y(e)}=${ne(t)}` : Y(e);
}
function Vt(e) {
  return Object.keys(e).filter((t) => e[t] !== void 0).map((t) => Wt(t, e[t])).filter(Boolean).join("&");
}
const Jt = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Kt = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Qt = /^([/\\]\s*){2,}[^/\\]/;
function je(e, t = {}) {
  return typeof t == "boolean" && (t = { acceptRelative: t }), t.strict ? Jt.test(e) : Kt.test(e) || (t.acceptRelative ? Qt.test(e) : !1);
}
const Gt = /\/$|\/\?|\/#/;
function oe(e = "", t) {
  return t ? Gt.test(e) : e.endsWith("/");
}
function Xt(e = "", t) {
  if (!t)
    return (oe(e) ? e.slice(0, -1) : e) || "/";
  if (!oe(e, !0))
    return e || "/";
  let n = e, r = "";
  const s = e.indexOf("#");
  s >= 0 && (n = e.slice(0, s), r = e.slice(s));
  const [o, ...c] = n.split("?");
  return (o.slice(0, -1) || "/") + (c.length > 0 ? `?${c.join("?")}` : "") + r;
}
function Yt(e = "", t) {
  if (!t)
    return e.endsWith("/") ? e : e + "/";
  if (oe(e, !0))
    return e || "/";
  let n = e, r = "";
  const s = e.indexOf("#");
  if (s >= 0 && (n = e.slice(0, s), r = e.slice(s), !n))
    return r;
  const [o, ...c] = n.split("?");
  return o + "/" + (c.length > 0 ? `?${c.join("?")}` : "") + r;
}
function Zt(e, t) {
  if (tr(t) || je(e))
    return e;
  const n = Xt(t);
  return e.startsWith(n) ? e : nr(n, e);
}
function er(e, t) {
  const n = He(e), r = { ...$t(n.search), ...t };
  return n.search = Vt(r), or(n);
}
function tr(e) {
  return !e || e === "/";
}
function rr(e) {
  return e && e !== "/";
}
const sr = /^\.?\//;
function nr(e, ...t) {
  let n = e || "";
  for (const r of t.filter((s) => rr(s)))
    if (n) {
      const s = r.replace(sr, "");
      n = Yt(n) + s;
    } else
      n = r;
  return n;
}
function He(e = "", t) {
  const n = e.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (n) {
    const [, y, S = ""] = n;
    return {
      protocol: y.toLowerCase(),
      pathname: S,
      href: y + S,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!je(e, { acceptRelative: !0 }))
    return t ? He(t + e) : ge(e);
  const [, r = "", s, o = ""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, c = "", a = ""] = o.match(/([^#/?]*)(.*)?/) || [], { pathname: p, search: f, hash: u } = ge(
    a.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: r.toLowerCase(),
    auth: s ? s.slice(0, Math.max(0, s.length - 1)) : "",
    host: c,
    pathname: p,
    search: f,
    hash: u
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
function or(e) {
  const t = e.pathname || "", n = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "", r = e.hash || "", s = e.auth ? e.auth + "@" : "", o = e.host || "";
  return (e.protocol ? e.protocol + "//" : "") + s + o + t + n + r;
}
class ir extends Error {
  constructor(t, n) {
    super(t, n), this.name = "FetchError", n != null && n.cause && !this.cause && (this.cause = n.cause);
  }
}
function ar(e) {
  var t, n, r, s, o;
  const c = ((t = e.error) == null ? void 0 : t.message) || ((n = e.error) == null ? void 0 : n.toString()) || "", a = ((r = e.request) == null ? void 0 : r.method) || ((s = e.options) == null ? void 0 : s.method) || "GET", p = ((o = e.request) == null ? void 0 : o.url) || String(e.request) || "/", f = `[${a}] ${JSON.stringify(p)}`, u = e.response ? `${e.response.status} ${e.response.statusText}` : "<no response>", y = `${f}: ${u}${c ? ` ${c}` : ""}`, S = new ir(
    y,
    e.error ? { cause: e.error } : void 0
  );
  for (const k of ["request", "options", "response"])
    Object.defineProperty(S, k, {
      get() {
        return e[k];
      }
    });
  for (const [k, w] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(S, k, {
      get() {
        return e.response && e.response[w];
      }
    });
  return S;
}
const cr = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Se(e = "GET") {
  return cr.has(e.toUpperCase());
}
function lr(e) {
  if (e === void 0)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.buffer ? !1 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function";
}
const hr = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), ur = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function pr(e = "") {
  if (!e)
    return "json";
  const t = e.split(";").shift() || "";
  return ur.test(t) ? "json" : hr.has(t) || t.startsWith("text/") ? "text" : "blob";
}
function fr(e, t, n = globalThis.Headers) {
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
const dr = /* @__PURE__ */ new Set([
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
]), mr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function ze(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: n = globalThis.Headers,
    AbortController: r = globalThis.AbortController
  } = e;
  async function s(a) {
    const p = a.error && a.error.name === "AbortError" && !a.options.timeout || !1;
    if (a.options.retry !== !1 && !p) {
      let u;
      typeof a.options.retry == "number" ? u = a.options.retry : u = Se(a.options.method) ? 0 : 1;
      const y = a.response && a.response.status || 500;
      if (u > 0 && (Array.isArray(a.options.retryStatusCodes) ? a.options.retryStatusCodes.includes(y) : dr.has(y))) {
        const S = a.options.retryDelay || 0;
        return S > 0 && await new Promise((k) => setTimeout(k, S)), o(a.request, {
          ...a.options,
          retry: u - 1,
          timeout: a.options.timeout
        });
      }
    }
    const f = ar(a);
    throw Error.captureStackTrace && Error.captureStackTrace(f, o), f;
  }
  const o = async function(a, p = {}) {
    var f;
    const u = {
      request: a,
      options: fr(p, e.defaults, n),
      response: void 0,
      error: void 0
    };
    if (u.options.method = (f = u.options.method) == null ? void 0 : f.toUpperCase(), u.options.onRequest && await u.options.onRequest(u), typeof u.request == "string" && (u.options.baseURL && (u.request = Zt(u.request, u.options.baseURL)), (u.options.query || u.options.params) && (u.request = er(u.request, {
      ...u.options.params,
      ...u.options.query
    }))), u.options.body && Se(u.options.method) && (lr(u.options.body) ? (u.options.body = typeof u.options.body == "string" ? u.options.body : JSON.stringify(u.options.body), u.options.headers = new n(u.options.headers || {}), u.options.headers.has("content-type") || u.options.headers.set("content-type", "application/json"), u.options.headers.has("accept") || u.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in u.options.body && typeof u.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof u.options.body.pipe == "function") && ("duplex" in u.options || (u.options.duplex = "half"))
    )), !u.options.signal && u.options.timeout) {
      const y = new r();
      setTimeout(() => y.abort(), u.options.timeout), u.options.signal = y.signal;
    }
    try {
      u.response = await t(
        u.request,
        u.options
      );
    } catch (y) {
      return u.error = y, u.options.onRequestError && await u.options.onRequestError(u), await s(u);
    }
    if (u.response.body && !mr.has(u.response.status) && u.options.method !== "HEAD") {
      const y = (u.options.parseResponse ? "json" : u.options.responseType) || pr(u.response.headers.get("content-type") || "");
      switch (y) {
        case "json": {
          const S = await u.response.text(), k = u.options.parseResponse || Ft;
          u.response._data = k(S);
          break;
        }
        case "stream": {
          u.response._data = u.response.body;
          break;
        }
        default:
          u.response._data = await u.response[y]();
      }
    }
    return u.options.onResponse && await u.options.onResponse(u), !u.options.ignoreResponseError && u.response.status >= 400 && u.response.status < 600 ? (u.options.onResponseError && await u.options.onResponseError(u), await s(u)) : u.response;
  }, c = async function(a, p) {
    return (await o(a, p))._data;
  };
  return c.raw = o, c.native = (...a) => t(...a), c.create = (a = {}) => ze({
    ...e,
    defaults: {
      ...e.defaults,
      ...a
    }
  }), c;
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
}(), br = pe$1.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), yr = pe$1.Headers, wr = pe$1.AbortController, gr = ze({ fetch: br, Headers: yr, AbortController: wr });
class Sr extends Error {
  constructor(t) {
    super(t.statusText), E(this, "status"), this.response = t, this.status = t.status;
  }
}
class W extends Error {
  constructor(t, n) {
    super(t.msg), E(this, "code"), this.body = t, this.response = n, this.code = t.code;
  }
}
function R(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
function Ee(e, t) {
  for (var n = "", r = 0, s = -1, o = 0, c, a = 0; a <= e.length; ++a) {
    if (a < e.length)
      c = e.charCodeAt(a);
    else {
      if (c === 47)
        break;
      c = 47;
    }
    if (c === 47) {
      if (!(s === a - 1 || o === 1))
        if (s !== a - 1 && o === 2) {
          if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var p = n.lastIndexOf("/");
              if (p !== n.length - 1) {
                p === -1 ? (n = "", r = 0) : (n = n.slice(0, p), r = n.length - 1 - n.lastIndexOf("/")), s = a, o = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", r = 0, s = a, o = 0;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", r = 2);
        } else
          n.length > 0 ? n += "/" + e.slice(s + 1, a) : n = e.slice(s + 1, a), r = a - s - 1;
      s = a, o = 0;
    } else
      c === 46 && o !== -1 ? ++o : o = -1;
  }
  return n;
}
function Or(e, t) {
  var n = t.dir || t.root, r = t.base || (t.name || "") + (t.ext || "");
  return n ? n === t.root ? n + r : n + e + r : r;
}
var x = {
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
    return e === void 0 ? "." : x.normalize(e);
  },
  relative: function(e, t) {
    if (R(e), R(t), e === t || (e = x.resolve(e), t = x.resolve(t), e === t))
      return "";
    for (var n = 1; n < e.length && e.charCodeAt(n) === 47; ++n)
      ;
    for (var r = e.length, s = r - n, o = 1; o < t.length && t.charCodeAt(o) === 47; ++o)
      ;
    for (var c = t.length, a = c - o, p = s < a ? s : a, f = -1, u = 0; u <= p; ++u) {
      if (u === p) {
        if (a > p) {
          if (t.charCodeAt(o + u) === 47)
            return t.slice(o + u + 1);
          if (u === 0)
            return t.slice(o + u);
        } else
          s > p && (e.charCodeAt(n + u) === 47 ? f = u : u === 0 && (f = 0));
        break;
      }
      var y = e.charCodeAt(n + u), S = t.charCodeAt(o + u);
      if (y !== S)
        break;
      y === 47 && (f = u);
    }
    var k = "";
    for (u = n + f + 1; u <= r; ++u)
      (u === r || e.charCodeAt(u) === 47) && (k.length === 0 ? k += ".." : k += "/..");
    return k.length > 0 ? k + t.slice(o + f) : (o += f, t.charCodeAt(o) === 47 && ++o, t.slice(o));
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
      var c = t.length - 1, a = -1;
      for (o = e.length - 1; o >= 0; --o) {
        var p = e.charCodeAt(o);
        if (p === 47) {
          if (!s) {
            n = o + 1;
            break;
          }
        } else
          a === -1 && (s = !1, a = o + 1), c >= 0 && (p === t.charCodeAt(c) ? --c === -1 && (r = o) : (c = -1, r = a));
      }
      return n === r ? r = a : r === -1 && (r = e.length), e.slice(n, r);
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
    for (var t = -1, n = 0, r = -1, s = !0, o = 0, c = e.length - 1; c >= 0; --c) {
      var a = e.charCodeAt(c);
      if (a === 47) {
        if (!s) {
          n = c + 1;
          break;
        }
        continue;
      }
      r === -1 && (s = !1, r = c + 1), a === 46 ? t === -1 ? t = c : o !== 1 && (o = 1) : t !== -1 && (o = -1);
    }
    return t === -1 || r === -1 || // We saw a non-dot character immediately before the dot
    o === 0 || // The (right-most) trimmed path component is exactly '..'
    o === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
  },
  format: function(e) {
    if (e === null || typeof e != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return Or("/", e);
  },
  parse: function(e) {
    R(e);
    var t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    var n = e.charCodeAt(0), r = n === 47, s;
    r ? (t.root = "/", s = 1) : s = 0;
    for (var o = -1, c = 0, a = -1, p = !0, f = e.length - 1, u = 0; f >= s; --f) {
      if (n = e.charCodeAt(f), n === 47) {
        if (!p) {
          c = f + 1;
          break;
        }
        continue;
      }
      a === -1 && (p = !1, a = f + 1), n === 46 ? o === -1 ? o = f : u !== 1 && (u = 1) : o !== -1 && (u = -1);
    }
    return o === -1 || a === -1 || // We saw a non-dot character immediately before the dot
    u === 0 || // The (right-most) trimmed path component is exactly '..'
    u === 1 && o === a - 1 && o === c + 1 ? a !== -1 && (c === 0 && r ? t.base = t.name = e.slice(1, a) : t.base = t.name = e.slice(c, a)) : (c === 0 && r ? (t.name = e.slice(1, o), t.base = e.slice(1, a)) : (t.name = e.slice(c, o), t.base = e.slice(c, a)), t.ext = e.slice(o, a)), c > 0 ? t.dir = e.slice(0, c - 1) : r && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
x.posix = x;
function $e(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Pr } = Object.prototype, { getPrototypeOf: de } = Object, J = /* @__PURE__ */ ((e) => (t) => {
  const n = Pr.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), C = (e) => (e = e.toLowerCase(), (t) => J(t) === e), K = (e) => (t) => typeof t === e, { isArray: q } = Array, L = K("undefined");
function Cr(e) {
  return e !== null && !L(e) && e.constructor !== null && !L(e.constructor) && A(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const We = C("ArrayBuffer");
function Tr(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && We(e.buffer), t;
}
const Dr = K("string"), A = K("function"), Ve = K("number"), Q = (e) => e !== null && typeof e == "object", Nr = (e) => e === !0 || e === !1, H = (e) => {
  if (J(e) !== "object")
    return !1;
  const t = de(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, _r = C("Date"), Br = C("File"), Fr = C("Blob"), xr = C("FileList"), vr = (e) => Q(e) && A(e.pipe), qr = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || A(e.append) && ((t = J(e)) === "formdata" || // detect form-data instance
  t === "object" && A(e.toString) && e.toString() === "[object FormData]"));
}, Ir = C("URLSearchParams"), Lr = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function U(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), q(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), c = o.length;
    let a;
    for (r = 0; r < c; r++)
      a = o[r], t.call(null, e[a], a, e);
  }
}
function Je(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Ke = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Qe = (e) => !L(e) && e !== Ke;
function ie() {
  const { caseless: e } = Qe(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && Je(t, s) || s;
    H(t[o]) && H(r) ? t[o] = ie(t[o], r) : H(r) ? t[o] = ie({}, r) : q(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && U(arguments[r], n);
  return t;
}
const Ur = (e, t, n, { allOwnKeys: r } = {}) => (U(t, (s, o) => {
  n && A(s) ? e[o] = $e(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), Mr = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), jr = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Hr = (e, t, n, r) => {
  let s, o, c;
  const a = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      c = s[o], (!r || r(c, e, t)) && !a[c] && (t[c] = e[c], a[c] = !0);
    e = n !== !1 && de(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, zr = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, $r = (e) => {
  if (!e)
    return null;
  if (q(e))
    return e;
  let t = e.length;
  if (!Ve(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Wr = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && de(Uint8Array)), Vr = (e, t) => {
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
}, Kr = C("HTMLFormElement"), Qr = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, n, r) {
    return n.toUpperCase() + r;
  }
), ke = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Gr = C("RegExp"), Ge = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  U(n, (s, o) => {
    let c;
    (c = t(s, o, e)) !== !1 && (r[o] = c || s);
  }), Object.defineProperties(e, r);
}, Xr = (e) => {
  Ge(e, (t, n) => {
    if (A(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (A(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Yr = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return q(e) ? r(e) : r(String(e).split(t)), n;
}, Zr = () => {
}, es = (e, t) => (e = +e, Number.isFinite(e) ? e : t), Z = "abcdefghijklmnopqrstuvwxyz", Ae = "0123456789", Xe = {
  DIGIT: Ae,
  ALPHA: Z,
  ALPHA_DIGIT: Z + Z.toUpperCase() + Ae
}, ts = (e = 16, t = Xe.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function rs(e) {
  return !!(e && A(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const ss = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (Q(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = q(r) ? [] : {};
        return U(r, (c, a) => {
          const p = n(c, s + 1);
          !L(p) && (o[a] = p);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, ns = C("AsyncFunction"), os = (e) => e && (Q(e) || A(e)) && A(e.then) && A(e.catch), h = {
  isArray: q,
  isArrayBuffer: We,
  isBuffer: Cr,
  isFormData: qr,
  isArrayBufferView: Tr,
  isString: Dr,
  isNumber: Ve,
  isBoolean: Nr,
  isObject: Q,
  isPlainObject: H,
  isUndefined: L,
  isDate: _r,
  isFile: Br,
  isBlob: Fr,
  isRegExp: Gr,
  isFunction: A,
  isStream: vr,
  isURLSearchParams: Ir,
  isTypedArray: Wr,
  isFileList: xr,
  forEach: U,
  merge: ie,
  extend: Ur,
  trim: Lr,
  stripBOM: Mr,
  inherits: jr,
  toFlatObject: Hr,
  kindOf: J,
  kindOfTest: C,
  endsWith: zr,
  toArray: $r,
  forEachEntry: Vr,
  matchAll: Jr,
  isHTMLForm: Kr,
  hasOwnProperty: ke,
  hasOwnProp: ke,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ge,
  freezeMethods: Xr,
  toObjectSet: Yr,
  toCamelCase: Qr,
  noop: Zr,
  toFiniteNumber: es,
  findKey: Je,
  global: Ke,
  isContextDefined: Qe,
  ALPHABET: Xe,
  generateString: ts,
  isSpecCompliantForm: rs,
  toJSONObject: ss,
  isAsyncFn: ns,
  isThenable: os
};
function b(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s);
}
h.inherits(b, Error, {
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
      config: h.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Ye = b.prototype, Ze = {};
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
Object.defineProperties(b, Ze);
Object.defineProperty(Ye, "isAxiosError", { value: !0 });
b.from = (e, t, n, r, s, o) => {
  const c = Object.create(Ye);
  return h.toFlatObject(e, c, function(a) {
    return a !== Error.prototype;
  }, (a) => a !== "isAxiosError"), b.call(c, e.message, t, n, r, s), c.cause = e, c.name = e.name, o && Object.assign(c, o), c;
};
const is = null;
function ae(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function et(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Oe(e, t, n) {
  return e ? e.concat(t).map(function(r, s) {
    return r = et(r), !n && s ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function as$1(e) {
  return h.isArray(e) && !e.some(ae);
}
const cs = h.toFlatObject(h, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function G(e, t, n) {
  if (!h.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = h.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(k, w) {
    return !h.isUndefined(w[k]);
  });
  const r = n.metaTokens, s = n.visitor || f, o = n.dots, c = n.indexes, a = (n.Blob || typeof Blob < "u" && Blob) && h.isSpecCompliantForm(t);
  if (!h.isFunction(s))
    throw new TypeError("visitor must be a function");
  function p(k) {
    if (k === null)
      return "";
    if (h.isDate(k))
      return k.toISOString();
    if (!a && h.isBlob(k))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(k) || h.isTypedArray(k) ? a && typeof Blob == "function" ? new Blob([k]) : Buffer.from(k) : k;
  }
  function f(k, w, D) {
    let B = k;
    if (k && !D && typeof k == "object") {
      if (h.endsWith(w, "{}"))
        w = r ? w : w.slice(0, -2), k = JSON.stringify(k);
      else if (h.isArray(k) && as$1(k) || (h.isFileList(k) || h.endsWith(w, "[]")) && (B = h.toArray(k)))
        return w = et(w), B.forEach(function(St, wt) {
          !(h.isUndefined(St) || St === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            c === !0 ? Oe([w], wt, o) : c === null ? w : w + "[]",
            p(St)
          );
        }), !1;
    }
    return ae(k) ? !0 : (t.append(Oe(D, w, o), p(k)), !1);
  }
  const u = [], y = Object.assign(cs, {
    defaultVisitor: f,
    convertValue: p,
    isVisitable: ae
  });
  function S(k, w) {
    if (!h.isUndefined(k)) {
      if (u.indexOf(k) !== -1)
        throw Error("Circular reference detected in " + w.join("."));
      u.push(k), h.forEach(k, function(D, B) {
        (!(h.isUndefined(D) || D === null) && s.call(
          t,
          D,
          h.isString(B) ? B.trim() : B,
          w,
          y
        )) === !0 && S(D, w ? w.concat(B) : [B]);
      }), u.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
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
  this._pairs = [], e && G(e, this, t);
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
function ls(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function rt(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || ls, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = h.isURLSearchParams(t) ? t.toString() : new me(t, n).toString(r), o) {
    const c = e.indexOf("#");
    c !== -1 && (e = e.slice(0, c)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class hs {
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
    h.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Pe = hs, st = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, us = typeof URLSearchParams < "u" ? URLSearchParams : me, ps = typeof FormData < "u" ? FormData : null, fs = typeof Blob < "u" ? Blob : null, ds = {
  isBrowser: !0,
  classes: {
    URLSearchParams: us,
    FormData: ps,
    Blob: fs
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, nt = typeof window < "u" && typeof document < "u", ms = ((e) => nt && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), bs = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: nt,
  hasStandardBrowserEnv: ms,
  hasStandardBrowserWebWorkerEnv: bs
}, Symbol.toStringTag, { value: "Module" })), P = {
  ...ys,
  ...ds
};
function ws$1(e, t) {
  return G(e, new P.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return P.isNode && h.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function gs(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ss(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function ot(e) {
  function t(n, r, s, o) {
    let c = n[o++];
    const a = Number.isFinite(+c), p = o >= n.length;
    return c = !c && h.isArray(s) ? s.length : c, p ? (h.hasOwnProp(s, c) ? s[c] = [s[c], r] : s[c] = r, !a) : ((!s[c] || !h.isObject(s[c])) && (s[c] = []), t(n, r, s[c], o) && h.isArray(s[c]) && (s[c] = Ss(s[c])), !a);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const n = {};
    return h.forEachEntry(e, (r, s) => {
      t(gs(r), s, n, 0);
    }), n;
  }
  return null;
}
function Es(e, t, n) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const be = {
  transitional: st,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, t) {
    const n = t.getContentType() || "", r = n.indexOf("application/json") > -1, s = h.isObject(e);
    if (s && h.isHTMLForm(e) && (e = new FormData(e)), h.isFormData(e))
      return r && r ? JSON.stringify(ot(e)) : e;
    if (h.isArrayBuffer(e) || h.isBuffer(e) || h.isStream(e) || h.isFile(e) || h.isBlob(e))
      return e;
    if (h.isArrayBufferView(e))
      return e.buffer;
    if (h.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let o;
    if (s) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return ws$1(e, this.formSerializer).toString();
      if ((o = h.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return G(
          o ? { "files[]": e } : e,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return s || r ? (t.setContentType("application/json", !1), Es(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || be.transitional, n = t && t.forcedJSONParsing, r = this.responseType === "json";
    if (e && h.isString(e) && (n && !this.responseType || r)) {
      const s = !(t && t.silentJSONParsing) && r;
      try {
        return JSON.parse(e);
      } catch (o) {
        if (s)
          throw o.name === "SyntaxError" ? b.from(o, b.ERR_BAD_RESPONSE, this, null, this.response) : o;
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
h.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  be.headers[e] = {};
});
const ye = be, ks = h.toObjectSet([
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
]), As = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), n = o.substring(0, s).trim().toLowerCase(), r = o.substring(s + 1).trim(), !(!n || t[n] && ks[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Ce = Symbol("internals");
function I(e) {
  return e && String(e).trim().toLowerCase();
}
function z(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(z) : String(e);
}
function Os(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const Rs = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ee(e, t, n, r, s) {
  if (h.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!h.isString(t)) {
    if (h.isString(r))
      return t.indexOf(r) !== -1;
    if (h.isRegExp(r))
      return r.test(t);
  }
}
function Ps(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Cs(e, t) {
  const n = h.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, c) {
        return this[r].call(this, t, s, o, c);
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
    function s(c, a, p) {
      const f = I(a);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const u = h.findKey(r, f);
      (!u || r[u] === void 0 || p === !0 || p === void 0 && r[u] !== !1) && (r[u || a] = z(c));
    }
    const o = (c, a) => h.forEach(c, (p, f) => s(p, f, a));
    return h.isPlainObject(e) || e instanceof this.constructor ? o(e, t) : h.isString(e) && (e = e.trim()) && !Rs(e) ? o(As(e), t) : e != null && s(t, e, n), this;
  }
  get(e, t) {
    if (e = I(e), e) {
      const n = h.findKey(this, e);
      if (n) {
        const r = this[n];
        if (!t)
          return r;
        if (t === !0)
          return Os(r);
        if (h.isFunction(t))
          return t.call(this, r, n);
        if (h.isRegExp(t))
          return t.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = I(e), e) {
      const n = h.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || ee(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    const n = this;
    let r = !1;
    function s(o) {
      if (o = I(o), o) {
        const c = h.findKey(n, o);
        c && (!t || ee(n, n[c], c, t)) && (delete n[c], r = !0);
      }
    }
    return h.isArray(e) ? e.forEach(s) : s(e), r;
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
    return h.forEach(this, (r, s) => {
      const o = h.findKey(n, s);
      if (o) {
        t[o] = z(r), delete t[s];
        return;
      }
      const c = e ? Ps(s) : String(s).trim();
      c !== s && delete t[s], t[c] = z(r), n[c] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (n, r) => {
      n != null && n !== !1 && (t[r] = e && h.isArray(n) ? n.join(", ") : n);
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
      const o = I(s);
      t[o] || (Cs(n, s), t[o] = !0);
    }
    return h.isArray(e) ? e.forEach(r) : r(e), this;
  }
};
X.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
h.reduceDescriptors(X.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
h.freezeMethods(X);
const T = X;
function te(e, t) {
  const n = this || ye, r = t || n, s = T.from(r.headers);
  let o = r.data;
  return h.forEach(e, function(c) {
    o = c.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function it(e) {
  return !!(e && e.__CANCEL__);
}
function M(e, t, n) {
  b.call(this, e ?? "canceled", b.ERR_CANCELED, t, n), this.name = "CanceledError";
}
h.inherits(M, b, {
  __CANCEL__: !0
});
function Ts(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new b(
    "Request failed with status code " + n.status,
    [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Ds = P.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, s, o) {
      const c = [e + "=" + encodeURIComponent(t)];
      h.isNumber(n) && c.push("expires=" + new Date(n).toGMTString()), h.isString(r) && c.push("path=" + r), h.isString(s) && c.push("domain=" + s), o === !0 && c.push("secure"), document.cookie = c.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Ns(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function _s(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function at(e, t) {
  return e && !Ns(t) ? _s(e, t) : t;
}
const Bs = P.hasStandardBrowserEnv ? (
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
      const o = h.isString(s) ? r(s) : s;
      return o.protocol === n.protocol && o.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
);
function Fs(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function xs(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, c;
  return t = t !== void 0 ? t : 1e3, function(a) {
    const p = Date.now(), f = r[o];
    c || (c = p), n[s] = a, r[s] = p;
    let u = o, y = 0;
    for (; u !== s; )
      y += n[u++], u = u % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), p - c < t)
      return;
    const S = f && p - f;
    return S ? Math.round(y * 1e3 / S) : void 0;
  };
}
function Te(e, t) {
  let n = 0;
  const r = xs(50, 250);
  return (s) => {
    const o = s.loaded, c = s.lengthComputable ? s.total : void 0, a = o - n, p = r(a), f = o <= c;
    n = o;
    const u = {
      loaded: o,
      total: c,
      progress: c ? o / c : void 0,
      bytes: a,
      rate: p || void 0,
      estimated: p && c && f ? (c - o) / p : void 0,
      event: s
    };
    u[t ? "download" : "upload"] = !0, e(u);
  };
}
const vs = typeof XMLHttpRequest < "u", qs$1 = vs && function(e) {
  return new Promise(function(t, n) {
    let r = e.data;
    const s = T.from(e.headers).normalize();
    let { responseType: o, withXSRFToken: c } = e, a;
    function p() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    let f;
    if (h.isFormData(r)) {
      if (P.hasStandardBrowserEnv || P.hasStandardBrowserWebWorkerEnv)
        s.setContentType(!1);
      else if ((f = s.getContentType()) !== !1) {
        const [w, ...D] = f ? f.split(";").map((B) => B.trim()).filter(Boolean) : [];
        s.setContentType([w || "multipart/form-data", ...D].join("; "));
      }
    }
    let u = new XMLHttpRequest();
    if (e.auth) {
      const w = e.auth.username || "", D = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(w + ":" + D));
    }
    const y = at(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), rt(y, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function S() {
      if (!u)
        return;
      const w = T.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), D = {
        data: !o || o === "text" || o === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: w,
        config: e,
        request: u
      };
      Ts(function(B) {
        t(B), p();
      }, function(B) {
        n(B), p();
      }, D), u = null;
    }
    if ("onloadend" in u ? u.onloadend = S : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(S);
    }, u.onabort = function() {
      u && (n(new b("Request aborted", b.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      n(new b("Network Error", b.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let w = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const D = e.transitional || st;
      e.timeoutErrorMessage && (w = e.timeoutErrorMessage), n(new b(
        w,
        D.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
        e,
        u
      )), u = null;
    }, P.hasStandardBrowserEnv && (c && h.isFunction(c) && (c = c(e)), c || c !== !1 && Bs(y))) {
      const w = e.xsrfHeaderName && e.xsrfCookieName && Ds.read(e.xsrfCookieName);
      w && s.set(e.xsrfHeaderName, w);
    }
    r === void 0 && s.setContentType(null), "setRequestHeader" in u && h.forEach(s.toJSON(), function(w, D) {
      u.setRequestHeader(D, w);
    }), h.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), o && o !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", Te(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", Te(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (w) => {
      u && (n(!w || w.type ? new M(null, e, u) : w), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const k = Fs(y);
    if (k && P.protocols.indexOf(k) === -1) {
      n(new b("Unsupported protocol " + k + ":", b.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(r || null);
  });
}, ce = {
  http: is,
  xhr: qs$1
};
h.forEach(ce, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const De = (e) => `- ${e}`, Is = (e) => h.isFunction(e) || e === null || e === !1, ct = {
  getAdapter: (e) => {
    e = h.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const s = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let c;
      if (r = n, !Is(n) && (r = ce[(c = String(n)).toLowerCase()], r === void 0))
        throw new b(`Unknown adapter '${c}'`);
      if (r)
        break;
      s[c || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(s).map(
        ([a, p]) => `adapter ${a} ` + (p === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let c = t ? o.length > 1 ? `since :
` + o.map(De).join(`
`) : " " + De(o[0]) : "as no adapter specified";
      throw new b(
        "There is no suitable adapter to dispatch the request " + c,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: ce
};
function re(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new M(null, e);
}
function Ne(e) {
  return re(e), e.headers = T.from(e.headers), e.data = te.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ct.getAdapter(e.adapter || ye.adapter)(e).then(function(t) {
    return re(e), t.data = te.call(
      e,
      e.transformResponse,
      t
    ), t.headers = T.from(t.headers), t;
  }, function(t) {
    return it(t) || (re(e), t && t.response && (t.response.data = te.call(
      e,
      e.transformResponse,
      t.response
    ), t.response.headers = T.from(t.response.headers))), Promise.reject(t);
  });
}
const _e = (e) => e instanceof T ? e.toJSON() : e;
function v(e, t) {
  t = t || {};
  const n = {};
  function r(f, u, y) {
    return h.isPlainObject(f) && h.isPlainObject(u) ? h.merge.call({ caseless: y }, f, u) : h.isPlainObject(u) ? h.merge({}, u) : h.isArray(u) ? u.slice() : u;
  }
  function s(f, u, y) {
    if (h.isUndefined(u)) {
      if (!h.isUndefined(f))
        return r(void 0, f, y);
    } else
      return r(f, u, y);
  }
  function o(f, u) {
    if (!h.isUndefined(u))
      return r(void 0, u);
  }
  function c(f, u) {
    if (h.isUndefined(u)) {
      if (!h.isUndefined(f))
        return r(void 0, f);
    } else
      return r(void 0, u);
  }
  function a(f, u, y) {
    if (y in t)
      return r(f, u);
    if (y in e)
      return r(void 0, f);
  }
  const p = {
    url: o,
    method: o,
    data: o,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    withXSRFToken: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: a,
    headers: (f, u) => s(_e(f), _e(u), !0)
  };
  return h.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const u = p[f] || s, y = u(e[f], t[f], f);
    h.isUndefined(y) && u !== a || (n[f] = y);
  }), n;
}
const lt = "1.6.2", we = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  we[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Be = {};
we.transitional = function(e, t, n) {
  function r(s, o) {
    return "[Axios v" + lt + "] Transitional option '" + s + "'" + o + (n ? ". " + n : "");
  }
  return (s, o, c) => {
    if (e === !1)
      throw new b(
        r(o, " has been removed" + (t ? " in " + t : "")),
        b.ERR_DEPRECATED
      );
    return t && !Be[o] && (Be[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(s, o, c) : !0;
  };
};
function Ls(e, t, n) {
  if (typeof e != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], c = t[o];
    if (c) {
      const a = e[o], p = a === void 0 || c(a, o, e);
      if (p !== !0)
        throw new b("option " + o + " must be " + p, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new b("Unknown option " + o, b.ERR_BAD_OPTION);
  }
}
const le = {
  assertOptions: Ls,
  validators: we
}, _ = le.validators;
let V = class {
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
      silentJSONParsing: _.transitional(_.boolean),
      forcedJSONParsing: _.transitional(_.boolean),
      clarifyTimeoutError: _.transitional(_.boolean)
    }, !1), r != null && (h.isFunction(r) ? t.paramsSerializer = {
      serialize: r
    } : le.assertOptions(r, {
      encode: _.function,
      serialize: _.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let o = s && h.merge(
      s.common,
      s[t.method]
    );
    s && h.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (k) => {
        delete s[k];
      }
    ), t.headers = T.concat(o, s);
    const c = [];
    let a = !0;
    this.interceptors.request.forEach(function(k) {
      typeof k.runWhen == "function" && k.runWhen(t) === !1 || (a = a && k.synchronous, c.unshift(k.fulfilled, k.rejected));
    });
    const p = [];
    this.interceptors.response.forEach(function(k) {
      p.push(k.fulfilled, k.rejected);
    });
    let f, u = 0, y;
    if (!a) {
      const k = [Ne.bind(this), void 0];
      for (k.unshift.apply(k, c), k.push.apply(k, p), y = k.length, f = Promise.resolve(t); u < y; )
        f = f.then(k[u++], k[u++]);
      return f;
    }
    y = c.length;
    let S = t;
    for (u = 0; u < y; ) {
      const k = c[u++], w = c[u++];
      try {
        S = k(S);
      } catch (D) {
        w.call(this, D);
        break;
      }
    }
    try {
      f = Ne.call(this, S);
    } catch (k) {
      return Promise.reject(k);
    }
    for (u = 0, y = p.length; u < y; )
      f = f.then(p[u++], p[u++]);
    return f;
  }
  getUri(e) {
    e = v(this.defaults, e);
    const t = at(e.baseURL, e.url);
    return rt(t, e.params, e.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(e) {
  V.prototype[e] = function(t, n) {
    return this.request(v(n || {}, {
      method: e,
      url: t,
      data: (n || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(e) {
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
  V.prototype[e] = t(), V.prototype[e + "Form"] = t(!0);
});
const $ = V;
let Us = class Xn {
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
      const c = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(s);
      return c.cancel = function() {
        r.unsubscribe(o);
      }, c;
    }, t(function(s, o, c) {
      r.reason || (r.reason = new M(s, o, c), n(r.reason));
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
      token: new Xn(function(n) {
        t = n;
      }),
      cancel: t
    };
  }
};
const Ms = Us;
function js(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Hs(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
const he = {
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
Object.entries(he).forEach(([e, t]) => {
  he[t] = e;
});
const zs = he;
function ut(e) {
  const t = new $(e), n = $e($.prototype.request, t);
  return h.extend(n, $.prototype, t, { allOwnKeys: !0 }), h.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return ut(v(e, r));
  }, n;
}
const g = ut(ye);
g.Axios = $;
g.CanceledError = M;
g.CancelToken = Ms;
g.isCancel = it;
g.VERSION = lt;
g.toFormData = G;
g.AxiosError = b;
g.Cancel = g.CanceledError;
g.all = function(e) {
  return Promise.all(e);
};
g.spread = js;
g.isAxiosError = Hs;
g.mergeConfig = v;
g.AxiosHeaders = T;
g.formToJSON = (e) => ot(h.isHTMLForm(e) ? new FormData(e) : e);
g.getAdapter = ct.getAdapter;
g.HttpStatusCode = zs;
g.default = g;
const pt = g, {
  Axios: Qs,
  AxiosError: Gs,
  CanceledError: Xs,
  isCancel: Ys,
  CancelToken: Zs,
  VERSION: en,
  all: tn,
  Cancel: rn,
  isAxiosError: sn,
  spread: nn,
  toFormData: on,
  AxiosHeaders: an,
  HttpStatusCode: j,
  formToJSON: cn,
  getAdapter: ln,
  mergeConfig: hn
} = pt;
var F = null;
typeof WebSocket < "u" ? F = WebSocket : typeof MozWebSocket < "u" ? F = MozWebSocket : typeof global < "u" ? F = global.WebSocket || global.MozWebSocket : typeof window < "u" ? F = window.WebSocket || window.MozWebSocket : typeof self < "u" && (F = self.WebSocket || self.MozWebSocket);
const $s = F, se = {
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
var xe, ve, qe, Ie, Le;
const l = class Ot {
  constructor(t = {}, n = "xhr") {
    E(this, "_type", "xhr"), E(this, "_baseURL", ((ve = (xe = globalThis.top) == null ? void 0 : xe.document) == null ? void 0 : ve.baseURI) ?? ((Ie = (qe = globalThis.parent) == null ? void 0 : qe.document) == null ? void 0 : Ie.baseURI) ?? ((Le = globalThis.location) == null ? void 0 : Le.origin) ?? se.SIYUAN_DEFAULT_BASE_URL), E(this, "_token", se.SIYUAN_DEFAULT_TOKEN), E(this, "_axios", pt.create({
      baseURL: this._baseURL,
      timeout: se.REQUEST_TIMEOUT,
      headers: {
        Authorization: `Token ${this._token}`
      }
    })), E(this, "_fetch", gr.create({
      baseURL: this._baseURL,
      headers: {
        Authorization: `Token ${this._token}`
      }
    })), this._setClientType(n), this._updateOptions(t, n);
  }
  static headers2record(t) {
    const n = {};
    return t.forEach((r, s) => {
      n[s] = r;
    }), n;
  }
  static entries2record(t) {
    const n = {};
    for (const [r, s] of t)
      n[r] = s;
    return n;
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
    const s = (r == null ? void 0 : r.baseURL) ?? this._baseURL, o = (r == null ? void 0 : r.token) ?? this._token, c = new URLSearchParams(t);
    o && c.set("token", o);
    const a = new URL(s);
    return a.protocol = a.protocol.replace(/^http/, "ws"), a.pathname = a.pathname.endsWith("/") ? `${a.pathname}${Ot.ws.broadcast.pathname.substring(1)}` : `${a.pathname}${Ot.ws.broadcast.pathname}`, a.search = c.toString(), new $s(a, n);
  }
  /* 👇 由 JSON Schema 生成的类型定义👇 */
  /* 上传资源文件 */
  async upload(t, n) {
    const r = new FormData();
    return r.append("assetsDirPath", t.assetsDirPath ?? "/assets/"), t.files.forEach((s) => r.append("file[]", s)), await this._request(
      Ot.api.asset.upload.pathname,
      Ot.api.asset.upload.method,
      r,
      n
    );
  }
  /* 获取块属性 */
  async getBlockAttrs(t, n) {
    return await this._request(
      Ot.api.attr.getBlockAttrs.pathname,
      Ot.api.attr.getBlockAttrs.method,
      t,
      n
    );
  }
  /* 获取所有书签 */
  async getBookmarkLabels(t) {
    return await this._request(
      Ot.api.attr.getBookmarkLabels.pathname,
      Ot.api.attr.getBookmarkLabels.method,
      void 0,
      t
    );
  }
  /* 设置块属性 */
  async setBlockAttrs(t, n) {
    return await this._request(
      Ot.api.attr.setBlockAttrs.pathname,
      Ot.api.attr.setBlockAttrs.method,
      t,
      n
    );
  }
  /* 在下级块尾部插入块 */
  async appendBlock(t, n) {
    return await this._request(
      Ot.api.block.appendBlock.pathname,
      Ot.api.block.appendBlock.method,
      t,
      n
    );
  }
  /* 删除块 */
  async deleteBlock(t, n) {
    return await this._request(
      Ot.api.block.deleteBlock.pathname,
      Ot.api.block.deleteBlock.method,
      t,
      n
    );
  }
  /* 获得块面包屑 */
  async getBlockBreadcrumb(t, n) {
    return await this._request(
      Ot.api.block.getBlockBreadcrumb.pathname,
      Ot.api.block.getBlockBreadcrumb.method,
      t,
      n
    );
  }
  /* 获得块的 DOM */
  async getBlockDOM(t, n) {
    return await this._request(
      Ot.api.block.getBlockDOM.pathname,
      Ot.api.block.getBlockDOM.method,
      t,
      n
    );
  }
  /* 获得块所在文档的信息 */
  async getBlockInfo(t, n) {
    return await this._request(
      Ot.api.block.getBlockInfo.pathname,
      Ot.api.block.getBlockInfo.method,
      t,
      n
    );
  }
  /* 获得块的 kramdown 源码 */
  async getBlockKramdown(t, n) {
    return await this._request(
      Ot.api.block.getBlockKramdown.pathname,
      Ot.api.block.getBlockKramdown.method,
      t,
      n
    );
  }
  /* 获得指定块的所有下级块 */
  async getChildBlocks(t, n) {
    return await this._request(
      Ot.api.block.getChildBlocks.pathname,
      Ot.api.block.getChildBlocks.method,
      t,
      n
    );
  }
  /* 获得指定块所在文档信息 */
  async getDocInfo(t, n) {
    return await this._request(
      Ot.api.block.getDocInfo.pathname,
      Ot.api.block.getDocInfo.method,
      t,
      n
    );
  }
  /* 插入块 */
  async insertBlock(t, n) {
    return await this._request(
      Ot.api.block.insertBlock.pathname,
      Ot.api.block.insertBlock.method,
      t,
      n
    );
  }
  /* 移动块 */
  async moveBlock(t, n) {
    return await this._request(
      Ot.api.block.moveBlock.pathname,
      Ot.api.block.moveBlock.method,
      t,
      n
    );
  }
  /* 在下级块首部插入块 */
  async prependBlock(t, n) {
    return await this._request(
      Ot.api.block.prependBlock.pathname,
      Ot.api.block.prependBlock.method,
      t,
      n
    );
  }
  /* 转移块引用 */
  async transferBlockRef(t, n) {
    return await this._request(
      Ot.api.block.transferBlockRef.pathname,
      Ot.api.block.transferBlockRef.method,
      t,
      n
    );
  }
  /* 更新块 */
  async updateBlock(t, n) {
    return await this._request(
      Ot.api.block.updateBlock.pathname,
      Ot.api.block.updateBlock.method,
      t,
      n
    );
  }
  /* 获取指定广播频道的信息 */
  async getChannelInfo(t, n) {
    return await this._request(
      Ot.api.broadcast.getChannelInfo.pathname,
      Ot.api.broadcast.getChannelInfo.method,
      t,
      n
    );
  }
  /* 获取所有广播频道信息 */
  async getChannels(t) {
    return await this._request(
      Ot.api.broadcast.getChannels.pathname,
      Ot.api.broadcast.getChannels.method,
      void 0,
      t
    );
  }
  /* 推送广播消息 */
  async postMessage(t, n) {
    return await this._request(
      Ot.api.broadcast.postMessage.pathname,
      Ot.api.broadcast.postMessage.method,
      t,
      n
    );
  }
  /* 调用 pandoc 转换转换文件 */
  async pandoc(t, n) {
    return await this._request(
      Ot.api.convert.pandoc.pathname,
      Ot.api.convert.pandoc.method,
      t,
      n
    );
  }
  /* 打包文件与文件夹以导出 */
  async exportResources(t, n) {
    return await this._request(
      Ot.api.export.exportResources.pathname,
      Ot.api.export.exportResources.method,
      t,
      n
    );
  }
  /* 导出指定文档块为 Markdown */
  async exportMdContent(t, n) {
    return await this._request(
      Ot.api.export.exportMdContent.pathname,
      Ot.api.export.exportMdContent.method,
      t,
      n
    );
  }
  async getFile(t, n = "text", r) {
    return await this._request(
      Ot.api.file.getFile.pathname,
      Ot.api.file.getFile.method,
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
      Ot.api.file.putFile.pathname,
      Ot.api.file.putFile.method,
      r,
      n
    );
  }
  /* 获取文件目录下级内容 */
  async readDir(t, n) {
    return await this._request(
      Ot.api.file.readDir.pathname,
      Ot.api.file.readDir.method,
      t,
      n
    );
  }
  /* 删除文件/目录 */
  async removeFile(t, n) {
    return await this._request(
      Ot.api.file.removeFile.pathname,
      Ot.api.file.removeFile.method,
      t,
      n
    );
  }
  /* 重命名/移动文件/目录 */
  async renameFile(t, n) {
    return await this._request(
      Ot.api.file.renameFile.pathname,
      Ot.api.file.renameFile.method,
      t,
      n
    );
  }
  /* 创建今天的每日笔记 (Daily Note) */
  async createDailyNote(t, n) {
    return await this._request(
      Ot.api.filetree.createDailyNote.pathname,
      Ot.api.filetree.createDailyNote.method,
      t,
      n
    );
  }
  /* 通过 Markdown 创建文档 */
  async createDocWithMd(t, n) {
    return await this._request(
      Ot.api.filetree.createDocWithMd.pathname,
      Ot.api.filetree.createDocWithMd.method,
      t,
      n
    );
  }
  /* 获取文档内容 */
  async getDoc(t, n) {
    return await this._request(
      Ot.api.filetree.getDoc.pathname,
      Ot.api.filetree.getDoc.method,
      t,
      n
    );
  }
  /* 根据 ID 获取人类可读路径 */
  async getHPathByID(t, n) {
    return await this._request(
      Ot.api.filetree.getHPathByID.pathname,
      Ot.api.filetree.getHPathByID.method,
      t,
      n
    );
  }
  /* 根据路径获取人类可读路径 */
  async getHPathByPath(t, n) {
    return await this._request(
      Ot.api.filetree.getHPathByPath.pathname,
      Ot.api.filetree.getHPathByPath.method,
      t,
      n
    );
  }
  /* 根据人类可读路径获取文档 ID 列表 */
  async getIDsByHPath(t, n) {
    return await this._request(
      Ot.api.filetree.getIDsByHPath.pathname,
      Ot.api.filetree.getIDsByHPath.method,
      t,
      n
    );
  }
  /* 查询子文档 */
  async listDocsByPath(t, n) {
    return await this._request(
      Ot.api.filetree.listDocsByPath.pathname,
      Ot.api.filetree.listDocsByPath.method,
      t,
      n
    );
  }
  /* 批量移动文档 */
  async moveDocs(t, n) {
    return await this._request(
      Ot.api.filetree.moveDocs.pathname,
      Ot.api.filetree.moveDocs.method,
      t,
      n
    );
  }
  /* 删除文档 */
  async removeDoc(t, n) {
    return await this._request(
      Ot.api.filetree.removeDoc.pathname,
      Ot.api.filetree.removeDoc.method,
      t,
      n
    );
  }
  /* 文档重命名 */
  async renameDoc(t, n) {
    return await this._request(
      Ot.api.filetree.renameDoc.pathname,
      Ot.api.filetree.renameDoc.method,
      t,
      n
    );
  }
  /* 搜索文档 */
  async searchDocs(t, n) {
    return await this._request(
      Ot.api.filetree.searchDocs.pathname,
      Ot.api.filetree.searchDocs.method,
      t,
      n
    );
  }
  /* 获取历史文档内容 */
  async getDocHistoryContent(t, n) {
    return await this._request(
      Ot.api.history.getDocHistoryContent.pathname,
      Ot.api.history.getDocHistoryContent.method,
      t,
      n
    );
  }
  /* 查询历史项 */
  async getHistoryItems(t, n) {
    return await this._request(
      Ot.api.history.getHistoryItems.pathname,
      Ot.api.history.getHistoryItems.method,
      t,
      n
    );
  }
  /* 收集箱速记内容 */
  async getShorthand(t, n) {
    return await this._request(
      Ot.api.inbox.getShorthand.pathname,
      Ot.api.inbox.getShorthand.method,
      t,
      n
    );
  }
  /* 回显请求内容 */
  async echo(t, n) {
    if (t)
      switch (n ?? (n = {
        type: this._type
      }), n == null ? void 0 : n.type) {
        case "fetch": {
          const r = {};
          t.headers && (r.headers = t.headers), t.query && (r.query = Ot.entries2record(t.query.entries())), n.options ? Object.assign(r, n.options) : n.options = r;
          break;
        }
        case "xhr": {
          const r = {};
          t.headers && (r.headers = Array.isArray(t.headers) ? Ot.entries2record(t.headers) : t.headers instanceof Headers ? Ot.headers2record(t.headers) : t.headers), t.query && (r.params = t.query), n.options ? Object.assign(r, n.options) : n.options = r;
          break;
        }
      }
    return await this._request(
      Ot.api.network.echo.pathname,
      (t == null ? void 0 : t.method) ?? Ot.api.network.echo.method,
      t == null ? void 0 : t.body,
      n
    );
  }
  /* 正向代理 */
  async forwardProxy(t, n) {
    return await this._request(
      Ot.api.network.forwardProxy.pathname,
      Ot.api.network.forwardProxy.method,
      t,
      n
    );
  }
  /* 关闭笔记本 */
  async closeNotebook(t, n) {
    return await this._request(
      Ot.api.notebook.closeNotebook.pathname,
      Ot.api.notebook.closeNotebook.method,
      t,
      n
    );
  }
  /* 创建笔记本 */
  async createNotebook(t, n) {
    return await this._request(
      Ot.api.notebook.createNotebook.pathname,
      Ot.api.notebook.createNotebook.method,
      t,
      n
    );
  }
  /* 获取笔记本配置信息 */
  async getNotebookConf(t, n) {
    return await this._request(
      Ot.api.notebook.getNotebookConf.pathname,
      Ot.api.notebook.getNotebookConf.method,
      t,
      n
    );
  }
  /* 列出笔记本信息 */
  async lsNotebooks(t) {
    return await this._request(
      Ot.api.notebook.lsNotebooks.pathname,
      Ot.api.notebook.lsNotebooks.method,
      void 0,
      t
    );
  }
  /* 打开笔记本 */
  async openNotebook(t, n) {
    return await this._request(
      Ot.api.notebook.openNotebook.pathname,
      Ot.api.notebook.openNotebook.method,
      t,
      n
    );
  }
  /* 删除笔记本 */
  async removeNotebook(t, n) {
    return await this._request(
      Ot.api.notebook.removeNotebook.pathname,
      Ot.api.notebook.removeNotebook.method,
      t,
      n
    );
  }
  /* 重命名笔记本 */
  async renameNotebook(t, n) {
    return await this._request(
      Ot.api.notebook.renameNotebook.pathname,
      Ot.api.notebook.renameNotebook.method,
      t,
      n
    );
  }
  /* 设置笔记本配置 */
  async setNotebookConf(t, n) {
    return await this._request(
      Ot.api.notebook.setNotebookConf.pathname,
      Ot.api.notebook.setNotebookConf.method,
      t,
      n
    );
  }
  /* 推送错误消息 */
  async pushErrMsg(t, n) {
    return await this._request(
      Ot.api.notification.pushErrMsg.pathname,
      Ot.api.notification.pushErrMsg.method,
      t,
      n
    );
  }
  /* 推送提示消息 */
  async pushMsg(t, n) {
    return await this._request(
      Ot.api.notification.pushMsg.pathname,
      Ot.api.notification.pushMsg.method,
      t,
      n
    );
  }
  /* SQL 查询 */
  async sql(t, n) {
    return await this._request(
      Ot.api.query.sql.pathname,
      Ot.api.query.sql.method,
      t,
      n
    );
  }
  /* 读取快照文件内容 */
  async openRepoSnapshotDoc(t, n) {
    return await this._request(
      Ot.api.repo.openRepoSnapshotDoc.pathname,
      Ot.api.repo.openRepoSnapshotDoc.method,
      t,
      n
    );
  }
  /* 全局搜索 */
  async fullTextSearchBlock(t, n) {
    return await this._request(
      Ot.api.search.fullTextSearchBlock.pathname,
      Ot.api.search.fullTextSearchBlock.method,
      t,
      n
    );
  }
  /* 获取代码片段 */
  async getSnippet(t, n) {
    return await this._request(
      Ot.api.snippet.getSnippet.pathname,
      Ot.api.snippet.getSnippet.method,
      t,
      n
    );
  }
  /* 设置代码片段 */
  async setSnippet(t, n) {
    return await this._request(
      Ot.api.snippet.setSnippet.pathname,
      Ot.api.snippet.setSnippet.method,
      t,
      n
    );
  }
  /* 获取所有本地存储的数据 */
  async getLocalStorage(t) {
    return await this._request(
      Ot.api.storage.getLocalStorage.pathname,
      Ot.api.storage.getLocalStorage.method,
      void 0,
      t
    );
  }
  /* 查询最近打开的文档 */
  async getRecentDocs(t) {
    return await this._request(
      Ot.api.storage.getRecentDocs.pathname,
      Ot.api.storage.getRecentDocs.method,
      void 0,
      t
    );
  }
  /* 持久化本地存储 */
  async setLocalStorage(t, n) {
    return await this._request(
      Ot.api.storage.setLocalStorage.pathname,
      Ot.api.storage.setLocalStorage.method,
      t,
      n
    );
  }
  /* 持久化一项本地存储 */
  async setLocalStorageVal(t, n) {
    return await this._request(
      Ot.api.storage.setLocalStorageVal.pathname,
      Ot.api.storage.setLocalStorageVal.method,
      t,
      n
    );
  }
  /* 获取内核启动进度 */
  async bootProgress(t) {
    return await this._request(
      Ot.api.system.bootProgress.pathname,
      Ot.api.system.bootProgress.method,
      void 0,
      t
    );
  }
  /* 获得配置 */
  async getConf(t) {
    return await this._request(
      Ot.api.system.getConf.pathname,
      Ot.api.system.getConf.method,
      void 0,
      t
    );
  }
  /* 获得内核 Unix 时间戳 (单位: ms) */
  async currentTime(t) {
    return await this._request(
      Ot.api.system.currentTime.pathname,
      Ot.api.system.currentTime.method,
      void 0,
      t
    );
  }
  /* 获得内核版本 */
  async version(t) {
    return await this._request(
      Ot.api.system.version.pathname,
      Ot.api.system.version.method,
      void 0,
      t
    );
  }
  /* 渲染 kramdown 模板文件 */
  async render(t, n) {
    return await this._request(
      Ot.api.template.render.pathname,
      Ot.api.template.render.method,
      t,
      n
    );
  }
  /* 渲染 Sprig 模板 */
  async renderSprig(t, n) {
    return await this._request(
      Ot.api.template.renderSprig.pathname,
      Ot.api.template.renderSprig.method,
      t,
      n
    );
  }
  async _request(t, n, r, s, o = !0, c = "json") {
    try {
      switch ((s == null ? void 0 : s.type) ?? this._type) {
        case "fetch": {
          const a = s == null ? void 0 : s.options;
          c = (() => {
            switch (c) {
              case "arraybuffer":
                return "arrayBuffer";
              case "document":
                return "text";
              default:
                return c;
            }
          })();
          const p = await this._fetch(
            t,
            {
              method: n,
              body: r,
              responseType: c,
              onResponse: async (f) => {
                switch (f.response.status) {
                  case j.Ok:
                    switch (c) {
                      case "blob":
                        f.response._data.contentType = f.response.headers.get("content-type");
                        break;
                      default:
                        break;
                    }
                    break;
                  case j.Accepted:
                    t === Ot.api.file.getFile.pathname && this._parseFetchResponse(f.response._data);
                    break;
                  default:
                    break;
                }
              },
              ...a
            }
          );
          return o && c === "json" && typeof p == "object" ? this._parseFetchResponse(p) : p;
        }
        case "xhr":
        default: {
          const a = s == null ? void 0 : s.options;
          c = (() => {
            switch (c) {
              case "arrayBuffer":
                return "arraybuffer";
              default:
                return c;
            }
          })();
          const p = await this._axios.request({
            url: t,
            method: n,
            data: r,
            responseType: c,
            ...a
          });
          switch (p.status) {
            case j.Ok:
              if (o && c === "json" && typeof p.data == "object")
                return this._parseAxiosResponse(p);
              switch (c) {
                case "blob":
                  p.data.contentType = p.headers.getContentType();
                  break;
                default:
                  break;
              }
              return p.data;
            case j.Accepted:
              return t === Ot.api.file.getFile.pathname ? this._parseAxiosResponse(p) : p.data;
            default:
              throw new Sr(p);
          }
        }
      }
    } catch (a) {
      throw a;
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
E(l, "ws", {
  broadcast: { pathname: "/ws/broadcast" }
}), E(l, "api", {
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
    getChannelInfo: { pathname: "/api/broadcast/getChannelInfo", method: "POST" },
    getChannels: { pathname: "/api/broadcast/getChannels", method: "POST" },
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
    createDailyNote: { pathname: "/api/filetree/createDailyNote", method: "POST" },
    createDocWithMd: { pathname: "/api/filetree/createDocWithMd", method: "POST" },
    getDoc: { pathname: "/api/filetree/getDoc", method: "POST" },
    getHPathByID: { pathname: "/api/filetree/getHPathByID", method: "POST" },
    getHPathByPath: { pathname: "/api/filetree/getHPathByPath", method: "POST" },
    getIDsByHPath: { pathname: "/api/filetree/getIDsByHPath", method: "POST" },
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
    echo: { pathname: "/api/network/echo", method: "POST" },
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
    setLocalStorage: { pathname: "/api/storage/setLocalStorage", method: "POST" },
    setLocalStorageVal: { pathname: "/api/storage/setLocalStorageVal", method: "POST" }
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
var uaParser = { exports: {} };
(function(e, t) {
  (function(n, r) {
    var s = "1.0.37", o = "", c = "?", a = "function", p = "undefined", f = "object", u = "string", y = "major", S = "model", k = "name", w = "type", D = "vendor", B = "version", St = "architecture", wt = "console", ht = "mobile", N = "tablet", Ue = "smarttv", Et = "wearable", gt = "embedded", kt = 500, mt = "Amazon", ft = "Apple", bt = "ASUS", At = "BlackBerry", un = "Browser", pn = "Chrome", Tn = "Edge", On = "Firefox", Pn = "Google", $n = "Huawei", En = "LG", Dn = "Microsoft", yn = "Motorola", gn = "Opera", xn = "Samsung", Wn = "Sharp", Nn = "Sony", Ln = "Xiaomi", Bn = "Zebra", An = "Facebook", qn = "Chromium OS", Hn = "Mac OS", Kn = function(dn, mn) {
      var O = {};
      for (var d in dn)
        mn[d] && mn[d].length % 2 === 0 ? O[d] = mn[d].concat(dn[d]) : O[d] = dn[d];
      return O;
    }, jn = function(dn) {
      for (var mn = {}, O = 0; O < dn.length; O++)
        mn[dn[O].toUpperCase()] = dn[O];
      return mn;
    }, In = function(dn, mn) {
      return typeof dn === u ? Mn(mn).indexOf(Mn(dn)) !== -1 : !1;
    }, Mn = function(dn) {
      return dn.toLowerCase();
    }, Jn = function(dn) {
      return typeof dn === u ? dn.replace(/[^\d\.]/g, o).split(".")[0] : r;
    }, Gn = function(dn, mn) {
      if (typeof dn === u)
        return dn = dn.replace(/^\s\s*/, o), typeof mn === p ? dn : dn.substring(0, kt);
    }, Un = function(dn, mn) {
      for (var O = 0, d, m, fe, dt, yt, Ct; O < mn.length && !yt; ) {
        var fn = mn[O], wn = mn[O + 1];
        for (d = m = 0; d < fn.length && !yt && fn[d]; )
          if (yt = fn[d++].exec(dn), yt)
            for (fe = 0; fe < wn.length; fe++)
              Ct = yt[++m], dt = wn[fe], typeof dt === f && dt.length > 0 ? dt.length === 2 ? typeof dt[1] == a ? this[dt[0]] = dt[1].call(this, Ct) : this[dt[0]] = dt[1] : dt.length === 3 ? typeof dt[1] === a && !(dt[1].exec && dt[1].test) ? this[dt[0]] = Ct ? dt[1].call(this, Ct, dt[2]) : r : this[dt[0]] = Ct ? Ct.replace(dt[1], dt[2]) : r : dt.length === 4 && (this[dt[0]] = Ct ? dt[3].call(this, Ct.replace(dt[1], dt[2])) : r) : this[dt] = Ct || r;
        O += 2;
      }
    }, Vn = function(dn, mn) {
      for (var O in mn)
        if (typeof mn[O] === f && mn[O].length > 0) {
          for (var d = 0; d < mn[O].length; d++)
            if (In(mn[O][d], dn))
              return O === c ? r : O;
        } else if (In(mn[O], dn))
          return O === c ? r : O;
      return dn;
    }, Zn = {
      "1.0": "/8",
      "1.2": "/1",
      "1.3": "/3",
      "2.0": "/412",
      "2.0.2": "/416",
      "2.0.3": "/417",
      "2.0.4": "/419",
      "?": "/"
    }, zn = {
      ME: "4.90",
      "NT 3.11": "NT3.51",
      "NT 4.0": "NT4.0",
      2e3: "NT 5.0",
      XP: ["NT 5.1", "NT 5.2"],
      Vista: "NT 6.0",
      7: "NT 6.1",
      8: "NT 6.2",
      "8.1": "NT 6.3",
      10: ["NT 6.4", "NT 10.0"],
      RT: "ARM"
    }, Fn = {
      browser: [
        [
          /\b(?:crmo|crios)\/([\w\.]+)/i
          // Chrome for Android/iOS
        ],
        [B, [k, "Chrome"]],
        [
          /edg(?:e|ios|a)?\/([\w\.]+)/i
          // Microsoft Edge
        ],
        [B, [k, "Edge"]],
        [
          // Presto based
          /(opera mini)\/([-\w\.]+)/i,
          // Opera Mini
          /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
          // Opera Mobi/Tablet
          /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          // Opera
        ],
        [k, B],
        [
          /opios[\/ ]+([\w\.]+)/i
          // Opera mini on iphone >= 8.0
        ],
        [B, [k, gn + " Mini"]],
        [
          /\bopr\/([\w\.]+)/i
          // Opera Webkit
        ],
        [B, [k, gn]],
        [
          // Mixed
          /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
          // Baidu
        ],
        [B, [k, "Baidu"]],
        [
          /(kindle)\/([\w\.]+)/i,
          // Kindle
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
          // Lunascape/Maxthon/Netfront/Jasmine/Blazer
          // Trident based
          /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
          // Avant/IEMobile/SlimBrowser
          /(?:ms|\()(ie) ([\w\.]+)/i,
          // Internet Explorer
          // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
          /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
          // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
          /(heytap|ovi)browser\/([\d\.]+)/i,
          // Heytap/Ovi
          /(weibo)__([\d\.]+)/i
          // Weibo
        ],
        [k, B],
        [
          /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          // UCBrowser
        ],
        [B, [k, "UC" + un]],
        [
          /microm.+\bqbcore\/([\w\.]+)/i,
          // WeChat Desktop for Windows Built-in Browser
          /\bqbcore\/([\w\.]+).+microm/i,
          /micromessenger\/([\w\.]+)/i
          // WeChat
        ],
        [B, [k, "WeChat"]],
        [
          /konqueror\/([\w\.]+)/i
          // Konqueror
        ],
        [B, [k, "Konqueror"]],
        [
          /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          // IE11
        ],
        [B, [k, "IE"]],
        [
          /ya(?:search)?browser\/([\w\.]+)/i
          // Yandex
        ],
        [B, [k, "Yandex"]],
        [
          /slbrowser\/([\w\.]+)/i
          // Smart Lenovo Browser
        ],
        [B, [k, "Smart Lenovo " + un]],
        [
          /(avast|avg)\/([\w\.]+)/i
          // Avast/AVG Secure Browser
        ],
        [[k, /(.+)/, "$1 Secure " + un], B],
        [
          /\bfocus\/([\w\.]+)/i
          // Firefox Focus
        ],
        [B, [k, On + " Focus"]],
        [
          /\bopt\/([\w\.]+)/i
          // Opera Touch
        ],
        [B, [k, gn + " Touch"]],
        [
          /coc_coc\w+\/([\w\.]+)/i
          // Coc Coc Browser
        ],
        [B, [k, "Coc Coc"]],
        [
          /dolfin\/([\w\.]+)/i
          // Dolphin
        ],
        [B, [k, "Dolphin"]],
        [
          /coast\/([\w\.]+)/i
          // Opera Coast
        ],
        [B, [k, gn + " Coast"]],
        [
          /miuibrowser\/([\w\.]+)/i
          // MIUI Browser
        ],
        [B, [k, "MIUI " + un]],
        [
          /fxios\/([-\w\.]+)/i
          // Firefox for iOS
        ],
        [B, [k, On]],
        [
          /\bqihu|(qi?ho?o?|360)browser/i
          // 360
        ],
        [[k, "360 " + un]],
        [
          /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
        ],
        [[k, /(.+)/, "$1 " + un], B],
        [
          // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
          /samsungbrowser\/([\w\.]+)/i
          // Samsung Internet
        ],
        [B, [k, xn + " Internet"]],
        [
          /(comodo_dragon)\/([\w\.]+)/i
          // Comodo Dragon
        ],
        [[k, /_/g, " "], B],
        [
          /metasr[\/ ]?([\d\.]+)/i
          // Sogou Explorer
        ],
        [B, [k, "Sogou Explorer"]],
        [
          /(sogou)mo\w+\/([\d\.]+)/i
          // Sogou Mobile
        ],
        [[k, "Sogou Mobile"], B],
        [
          /(electron)\/([\w\.]+) safari/i,
          // Electron-based App
          /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
          // Tesla
          /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i
          // QQBrowser/2345 Browser
        ],
        [k, B],
        [
          /(lbbrowser)/i,
          // LieBao Browser
          /\[(linkedin)app\]/i
          // LinkedIn App for iOS & Android
        ],
        [k],
        [
          // WebView
          /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          // Facebook App for iOS & Android
        ],
        [[k, An], B],
        [
          /(Klarna)\/([\w\.]+)/i,
          // Klarna Shopping Browser for iOS & Android
          /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
          // Kakao App
          /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
          // Naver InApp
          /safari (line)\/([\w\.]+)/i,
          // Line App for iOS
          /\b(line)\/([\w\.]+)\/iab/i,
          // Line App for Android
          /(alipay)client\/([\w\.]+)/i,
          // Alipay
          /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
          // Chromium/Instagram/Snapchat
        ],
        [k, B],
        [
          /\bgsa\/([\w\.]+) .*safari\//i
          // Google Search Appliance on iOS
        ],
        [B, [k, "GSA"]],
        [
          /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
          // TikTok
        ],
        [B, [k, "TikTok"]],
        [
          /headlesschrome(?:\/([\w\.]+)| )/i
          // Chrome Headless
        ],
        [B, [k, pn + " Headless"]],
        [
          / wv\).+(chrome)\/([\w\.]+)/i
          // Chrome WebView
        ],
        [[k, pn + " WebView"], B],
        [
          /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          // Android Browser
        ],
        [B, [k, "Android " + un]],
        [
          /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          // Chrome/OmniWeb/Arora/Tizen/Nokia
        ],
        [k, B],
        [
          /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
          // Mobile Safari
        ],
        [B, [k, "Mobile Safari"]],
        [
          /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
          // Safari & Safari Mobile
        ],
        [B, k],
        [
          /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          // Safari < 3.0
        ],
        [k, [B, Vn, Zn]],
        [
          /(webkit|khtml)\/([\w\.]+)/i
        ],
        [k, B],
        [
          // Gecko based
          /(navigator|netscape\d?)\/([-\w\.]+)/i
          // Netscape
        ],
        [[k, "Netscape"], B],
        [
          /mobile vr; rv:([\w\.]+)\).+firefox/i
          // Firefox Reality
        ],
        [B, [k, On + " Reality"]],
        [
          /ekiohf.+(flow)\/([\w\.]+)/i,
          // Flow
          /(swiftfox)/i,
          // Swiftfox
          /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
          // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
          /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
          // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
          /(firefox)\/([\w\.]+)/i,
          // Other Firefox-based
          /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
          // Mozilla
          // Other
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
          // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
          /(links) \(([\w\.]+)/i,
          // Links
          /panasonic;(viera)/i
          // Panasonic Viera
        ],
        [k, B],
        [
          /(cobalt)\/([\w\.]+)/i
          // Cobalt
        ],
        [k, [B, /master.|lts./, ""]]
      ],
      cpu: [
        [
          /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
          // AMD64 (x64)
        ],
        [[St, "amd64"]],
        [
          /(ia32(?=;))/i
          // IA32 (quicktime)
        ],
        [[St, Mn]],
        [
          /((?:i[346]|x)86)[;\)]/i
          // IA32 (x86)
        ],
        [[St, "ia32"]],
        [
          /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          // ARM64
        ],
        [[St, "arm64"]],
        [
          /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          // ARMHF
        ],
        [[St, "armhf"]],
        [
          // PocketPC mistakenly identified as PowerPC
          /windows (ce|mobile); ppc;/i
        ],
        [[St, "arm"]],
        [
          /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          // PowerPC
        ],
        [[St, /ower/, o, Mn]],
        [
          /(sun4\w)[;\)]/i
          // SPARC
        ],
        [[St, "sparc"]],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
          // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
        ],
        [[St, Mn]]
      ],
      device: [
        [
          //////////////////////////
          // MOBILES & TABLETS
          /////////////////////////
          // Samsung
          /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
        ],
        [S, [D, xn], [w, N]],
        [
          /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
          /samsung[- ]([-\w]+)/i,
          /sec-(sgh\w+)/i
        ],
        [S, [D, xn], [w, ht]],
        [
          // Apple
          /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
          // iPod/iPhone
        ],
        [S, [D, ft], [w, ht]],
        [
          /\((ipad);[-\w\),; ]+apple/i,
          // iPad
          /applecoremedia\/[\w\.]+ \((ipad)/i,
          /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
        ],
        [S, [D, ft], [w, N]],
        [
          /(macintosh);/i
        ],
        [S, [D, ft]],
        [
          // Sharp
          /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
        ],
        [S, [D, Wn], [w, ht]],
        [
          // Huawei
          /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
        ],
        [S, [D, $n], [w, N]],
        [
          /(?:huawei|honor)([-\w ]+)[;\)]/i,
          /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
        ],
        [S, [D, $n], [w, ht]],
        [
          // Xiaomi
          /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
          // Xiaomi POCO
          /\b; (\w+) build\/hm\1/i,
          // Xiaomi Hongmi 'numeric' models
          /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
          // Xiaomi Hongmi
          /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
          // Xiaomi Redmi
          /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
          // Xiaomi Redmi 'numeric' models
          /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          // Xiaomi Mi
        ],
        [[S, /_/g, " "], [D, Ln], [w, ht]],
        [
          /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
          // Redmi Pad
          /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          // Mi Pad tablets
        ],
        [[S, /_/g, " "], [D, Ln], [w, N]],
        [
          // OPPO
          /; (\w+) bui.+ oppo/i,
          /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
        ],
        [S, [D, "OPPO"], [w, ht]],
        [
          // Vivo
          /vivo (\w+)(?: bui|\))/i,
          /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
        ],
        [S, [D, "Vivo"], [w, ht]],
        [
          // Realme
          /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
        ],
        [S, [D, "Realme"], [w, ht]],
        [
          // Motorola
          /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
          /\bmot(?:orola)?[- ](\w*)/i,
          /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
        ],
        [S, [D, yn], [w, ht]],
        [
          /\b(mz60\d|xoom[2 ]{0,2}) build\//i
        ],
        [S, [D, yn], [w, N]],
        [
          // LG
          /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
        ],
        [S, [D, En], [w, N]],
        [
          /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
          /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
          /\blg-?([\d\w]+) bui/i
        ],
        [S, [D, En], [w, ht]],
        [
          // Lenovo
          /(ideatab[-\w ]+)/i,
          /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
        ],
        [S, [D, "Lenovo"], [w, N]],
        [
          // Nokia
          /(?:maemo|nokia).*(n900|lumia \d+)/i,
          /nokia[-_ ]?([-\w\.]*)/i
        ],
        [[S, /_/g, " "], [D, "Nokia"], [w, ht]],
        [
          // Google
          /(pixel c)\b/i
          // Google Pixel C
        ],
        [S, [D, Pn], [w, N]],
        [
          /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          // Google Pixel
        ],
        [S, [D, Pn], [w, ht]],
        [
          // Sony
          /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
        ],
        [S, [D, Nn], [w, ht]],
        [
          /sony tablet [ps]/i,
          /\b(?:sony)?sgp\w+(?: bui|\))/i
        ],
        [[S, "Xperia Tablet"], [D, Nn], [w, N]],
        [
          // OnePlus
          / (kb2005|in20[12]5|be20[12][59])\b/i,
          /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
        ],
        [S, [D, "OnePlus"], [w, ht]],
        [
          // Amazon
          /(alexa)webm/i,
          /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
          // Kindle Fire without Silk / Echo Show
          /(kf[a-z]+)( bui|\)).+silk\//i
          // Kindle Fire HD
        ],
        [S, [D, mt], [w, N]],
        [
          /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          // Fire Phone
        ],
        [[S, /(.+)/g, "Fire Phone $1"], [D, mt], [w, ht]],
        [
          // BlackBerry
          /(playbook);[-\w\),; ]+(rim)/i
          // BlackBerry PlayBook
        ],
        [S, D, [w, N]],
        [
          /\b((?:bb[a-f]|st[hv])100-\d)/i,
          /\(bb10; (\w+)/i
          // BlackBerry 10
        ],
        [S, [D, At], [w, ht]],
        [
          // Asus
          /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
        ],
        [S, [D, bt], [w, N]],
        [
          / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
        ],
        [S, [D, bt], [w, ht]],
        [
          // HTC
          /(nexus 9)/i
          // HTC Nexus 9
        ],
        [S, [D, "HTC"], [w, N]],
        [
          /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
          // HTC
          // ZTE
          /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
          /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
          // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
        ],
        [D, [S, /_/g, " "], [w, ht]],
        [
          // Acer
          /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
        ],
        [S, [D, "Acer"], [w, N]],
        [
          // Meizu
          /droid.+; (m[1-5] note) bui/i,
          /\bmz-([-\w]{2,})/i
        ],
        [S, [D, "Meizu"], [w, ht]],
        [
          // Ulefone
          /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
        ],
        [S, [D, "Ulefone"], [w, ht]],
        [
          // MIXED
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
          // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
          /(hp) ([\w ]+\w)/i,
          // HP iPAQ
          /(asus)-?(\w+)/i,
          // Asus
          /(microsoft); (lumia[\w ]+)/i,
          // Microsoft Lumia
          /(lenovo)[-_ ]?([-\w]+)/i,
          // Lenovo
          /(jolla)/i,
          // Jolla
          /(oppo) ?([\w ]+) bui/i
          // OPPO
        ],
        [D, S, [w, ht]],
        [
          /(kobo)\s(ereader|touch)/i,
          // Kobo
          /(archos) (gamepad2?)/i,
          // Archos
          /(hp).+(touchpad(?!.+tablet)|tablet)/i,
          // HP TouchPad
          /(kindle)\/([\w\.]+)/i,
          // Kindle
          /(nook)[\w ]+build\/(\w+)/i,
          // Nook
          /(dell) (strea[kpr\d ]*[\dko])/i,
          // Dell Streak
          /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
          // Le Pan Tablets
          /(trinity)[- ]*(t\d{3}) bui/i,
          // Trinity Tablets
          /(gigaset)[- ]+(q\w{1,9}) bui/i,
          // Gigaset Tablets
          /(vodafone) ([\w ]+)(?:\)| bui)/i
          // Vodafone
        ],
        [D, S, [w, N]],
        [
          /(surface duo)/i
          // Surface Duo
        ],
        [S, [D, Dn], [w, N]],
        [
          /droid [\d\.]+; (fp\du?)(?: b|\))/i
          // Fairphone
        ],
        [S, [D, "Fairphone"], [w, ht]],
        [
          /(u304aa)/i
          // AT&T
        ],
        [S, [D, "AT&T"], [w, ht]],
        [
          /\bsie-(\w*)/i
          // Siemens
        ],
        [S, [D, "Siemens"], [w, ht]],
        [
          /\b(rct\w+) b/i
          // RCA Tablets
        ],
        [S, [D, "RCA"], [w, N]],
        [
          /\b(venue[\d ]{2,7}) b/i
          // Dell Venue Tablets
        ],
        [S, [D, "Dell"], [w, N]],
        [
          /\b(q(?:mv|ta)\w+) b/i
          // Verizon Tablet
        ],
        [S, [D, "Verizon"], [w, N]],
        [
          /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
          // Barnes & Noble Tablet
        ],
        [S, [D, "Barnes & Noble"], [w, N]],
        [
          /\b(tm\d{3}\w+) b/i
        ],
        [S, [D, "NuVision"], [w, N]],
        [
          /\b(k88) b/i
          // ZTE K Series Tablet
        ],
        [S, [D, "ZTE"], [w, N]],
        [
          /\b(nx\d{3}j) b/i
          // ZTE Nubia
        ],
        [S, [D, "ZTE"], [w, ht]],
        [
          /\b(gen\d{3}) b.+49h/i
          // Swiss GEN Mobile
        ],
        [S, [D, "Swiss"], [w, ht]],
        [
          /\b(zur\d{3}) b/i
          // Swiss ZUR Tablet
        ],
        [S, [D, "Swiss"], [w, N]],
        [
          /\b((zeki)?tb.*\b) b/i
          // Zeki Tablets
        ],
        [S, [D, "Zeki"], [w, N]],
        [
          /\b([yr]\d{2}) b/i,
          /\b(dragon[- ]+touch |dt)(\w{5}) b/i
          // Dragon Touch Tablet
        ],
        [[D, "Dragon Touch"], S, [w, N]],
        [
          /\b(ns-?\w{0,9}) b/i
          // Insignia Tablets
        ],
        [S, [D, "Insignia"], [w, N]],
        [
          /\b((nxa|next)-?\w{0,9}) b/i
          // NextBook Tablets
        ],
        [S, [D, "NextBook"], [w, N]],
        [
          /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
          // Voice Xtreme Phones
        ],
        [[D, "Voice"], S, [w, ht]],
        [
          /\b(lvtel\-)?(v1[12]) b/i
          // LvTel Phones
        ],
        [[D, "LvTel"], S, [w, ht]],
        [
          /\b(ph-1) /i
          // Essential PH-1
        ],
        [S, [D, "Essential"], [w, ht]],
        [
          /\b(v(100md|700na|7011|917g).*\b) b/i
          // Envizen Tablets
        ],
        [S, [D, "Envizen"], [w, N]],
        [
          /\b(trio[-\w\. ]+) b/i
          // MachSpeed Tablets
        ],
        [S, [D, "MachSpeed"], [w, N]],
        [
          /\btu_(1491) b/i
          // Rotor Tablets
        ],
        [S, [D, "Rotor"], [w, N]],
        [
          /(shield[\w ]+) b/i
          // Nvidia Shield Tablets
        ],
        [S, [D, "Nvidia"], [w, N]],
        [
          /(sprint) (\w+)/i
          // Sprint Phones
        ],
        [D, S, [w, ht]],
        [
          /(kin\.[onetw]{3})/i
          // Microsoft Kin
        ],
        [[S, /\./g, " "], [D, Dn], [w, ht]],
        [
          /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          // Zebra
        ],
        [S, [D, Bn], [w, N]],
        [
          /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
        ],
        [S, [D, Bn], [w, ht]],
        [
          ///////////////////
          // SMARTTVS
          ///////////////////
          /smart-tv.+(samsung)/i
          // Samsung
        ],
        [D, [w, Ue]],
        [
          /hbbtv.+maple;(\d+)/i
        ],
        [[S, /^/, "SmartTV"], [D, xn], [w, Ue]],
        [
          /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          // LG SmartTV
        ],
        [[D, En], [w, Ue]],
        [
          /(apple) ?tv/i
          // Apple TV
        ],
        [D, [S, ft + " TV"], [w, Ue]],
        [
          /crkey/i
          // Google Chromecast
        ],
        [[S, pn + "cast"], [D, Pn], [w, Ue]],
        [
          /droid.+aft(\w+)( bui|\))/i
          // Fire TV
        ],
        [S, [D, mt], [w, Ue]],
        [
          /\(dtv[\);].+(aquos)/i,
          /(aquos-tv[\w ]+)\)/i
          // Sharp
        ],
        [S, [D, Wn], [w, Ue]],
        [
          /(bravia[\w ]+)( bui|\))/i
          // Sony
        ],
        [S, [D, Nn], [w, Ue]],
        [
          /(mitv-\w{5}) bui/i
          // Xiaomi
        ],
        [S, [D, Ln], [w, Ue]],
        [
          /Hbbtv.*(technisat) (.*);/i
          // TechniSAT
        ],
        [D, S, [w, Ue]],
        [
          /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
          // Roku
          /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
          // HbbTV devices
        ],
        [[D, Gn], [S, Gn], [w, Ue]],
        [
          /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          // SmartTV from Unidentified Vendors
        ],
        [[w, Ue]],
        [
          ///////////////////
          // CONSOLES
          ///////////////////
          /(ouya)/i,
          // Ouya
          /(nintendo) ([wids3utch]+)/i
          // Nintendo
        ],
        [D, S, [w, wt]],
        [
          /droid.+; (shield) bui/i
          // Nvidia
        ],
        [S, [D, "Nvidia"], [w, wt]],
        [
          /(playstation [345portablevi]+)/i
          // Playstation
        ],
        [S, [D, Nn], [w, wt]],
        [
          /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          // Microsoft Xbox
        ],
        [S, [D, Dn], [w, wt]],
        [
          ///////////////////
          // WEARABLES
          ///////////////////
          /((pebble))app/i
          // Pebble
        ],
        [D, S, [w, Et]],
        [
          /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
          // Apple Watch
        ],
        [S, [D, ft], [w, Et]],
        [
          /droid.+; (glass) \d/i
          // Google Glass
        ],
        [S, [D, Pn], [w, Et]],
        [
          /droid.+; (wt63?0{2,3})\)/i
        ],
        [S, [D, Bn], [w, Et]],
        [
          /(quest( 2| pro)?)/i
          // Oculus Quest
        ],
        [S, [D, An], [w, Et]],
        [
          ///////////////////
          // EMBEDDED
          ///////////////////
          /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          // Tesla
        ],
        [D, [w, gt]],
        [
          /(aeobc)\b/i
          // Echo Dot
        ],
        [S, [D, mt], [w, gt]],
        [
          ////////////////////
          // MIXED (GENERIC)
          ///////////////////
          /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
          // Android Phones from Unidentified Vendors
        ],
        [S, [w, ht]],
        [
          /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          // Android Tablets from Unidentified Vendors
        ],
        [S, [w, N]],
        [
          /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          // Unidentifiable Tablet
        ],
        [[w, N]],
        [
          /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
          // Unidentifiable Mobile
        ],
        [[w, ht]],
        [
          /(android[-\w\. ]{0,9});.+buil/i
          // Generic Android Device
        ],
        [S, [D, "Generic"]]
      ],
      engine: [
        [
          /windows.+ edge\/([\w\.]+)/i
          // EdgeHTML
        ],
        [B, [k, Tn + "HTML"]],
        [
          /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          // Blink
        ],
        [B, [k, "Blink"]],
        [
          /(presto)\/([\w\.]+)/i,
          // Presto
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
          /ekioh(flow)\/([\w\.]+)/i,
          // Flow
          /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
          // KHTML/Tasman/Links
          /(icab)[\/ ]([23]\.[\d\.]+)/i,
          // iCab
          /\b(libweb)/i
        ],
        [k, B],
        [
          /rv\:([\w\.]{1,9})\b.+(gecko)/i
          // Gecko
        ],
        [B, k]
      ],
      os: [
        [
          // Windows
          /microsoft (windows) (vista|xp)/i
          // Windows (iTunes)
        ],
        [k, B],
        [
          /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i
          // Windows Phone
        ],
        [k, [B, Vn, zn]],
        [
          /windows nt 6\.2; (arm)/i,
          // Windows RT
          /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
          /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
        ],
        [[B, Vn, zn], [k, "Windows"]],
        [
          // iOS/macOS
          /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
          // iOS
          /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
          /cfnetwork\/.+darwin/i
        ],
        [[B, /_/g, "."], [k, "iOS"]],
        [
          /(mac os x) ?([\w\. ]*)/i,
          /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          // Mac OS
        ],
        [[k, Hn], [B, /_/g, "."]],
        [
          // Mobile OSes
          /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
          // Android-x86/HarmonyOS
        ],
        [B, k],
        [
          // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
          /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
          /(blackberry)\w*\/([\w\.]*)/i,
          // Blackberry
          /(tizen|kaios)[\/ ]([\w\.]+)/i,
          // Tizen/KaiOS
          /\((series40);/i
          // Series 40
        ],
        [k, B],
        [
          /\(bb(10);/i
          // BlackBerry 10
        ],
        [B, [k, At]],
        [
          /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          // Symbian
        ],
        [B, [k, "Symbian"]],
        [
          /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          // Firefox OS
        ],
        [B, [k, On + " OS"]],
        [
          /web0s;.+rt(tv)/i,
          /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          // WebOS
        ],
        [B, [k, "webOS"]],
        [
          /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
          // watchOS
        ],
        [B, [k, "watchOS"]],
        [
          // Google Chromecast
          /crkey\/([\d\.]+)/i
          // Google Chromecast
        ],
        [B, [k, pn + "cast"]],
        [
          /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
          // Chromium OS
        ],
        [[k, qn], B],
        [
          // Smart TVs
          /panasonic;(viera)/i,
          // Panasonic Viera
          /(netrange)mmh/i,
          // Netrange
          /(nettv)\/(\d+\.[\w\.]+)/i,
          // NetTV
          // Console
          /(nintendo|playstation) ([wids345portablevuch]+)/i,
          // Nintendo/Playstation
          /(xbox); +xbox ([^\);]+)/i,
          // Microsoft Xbox (360, One, X, S, Series X, Series S)
          // Other
          /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
          // Joli/Palm
          /(mint)[\/\(\) ]?(\w*)/i,
          // Mint
          /(mageia|vectorlinux)[; ]/i,
          // Mageia/VectorLinux
          /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
          // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
          /(hurd|linux) ?([\w\.]*)/i,
          // Hurd/Linux
          /(gnu) ?([\w\.]*)/i,
          // GNU
          /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
          // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
          /(haiku) (\w+)/i
          // Haiku
        ],
        [k, B],
        [
          /(sunos) ?([\w\.\d]*)/i
          // Solaris
        ],
        [[k, "Solaris"], B],
        [
          /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
          // Solaris
          /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
          // AIX
          /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
          // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
          /(unix) ?([\w\.]*)/i
          // UNIX
        ],
        [k, B]
      ]
    }, Sn = function(dn, mn) {
      if (typeof dn === f && (mn = dn, dn = r), !(this instanceof Sn))
        return new Sn(dn, mn).getResult();
      var O = typeof n !== p && n.navigator ? n.navigator : r, d = dn || (O && O.userAgent ? O.userAgent : o), m = O && O.userAgentData ? O.userAgentData : r, fe = mn ? Kn(Fn, mn) : Fn, dt = O && O.userAgent == d;
      return this.getBrowser = function() {
        var yt = {};
        return yt[k] = r, yt[B] = r, Un.call(yt, d, fe.browser), yt[y] = Jn(yt[B]), dt && O && O.brave && typeof O.brave.isBrave == a && (yt[k] = "Brave"), yt;
      }, this.getCPU = function() {
        var yt = {};
        return yt[St] = r, Un.call(yt, d, fe.cpu), yt;
      }, this.getDevice = function() {
        var yt = {};
        return yt[D] = r, yt[S] = r, yt[w] = r, Un.call(yt, d, fe.device), dt && !yt[w] && m && m.mobile && (yt[w] = ht), dt && yt[S] == "Macintosh" && O && typeof O.standalone !== p && O.maxTouchPoints && O.maxTouchPoints > 2 && (yt[S] = "iPad", yt[w] = N), yt;
      }, this.getEngine = function() {
        var yt = {};
        return yt[k] = r, yt[B] = r, Un.call(yt, d, fe.engine), yt;
      }, this.getOS = function() {
        var yt = {};
        return yt[k] = r, yt[B] = r, Un.call(yt, d, fe.os), dt && !yt[k] && m && m.platform != "Unknown" && (yt[k] = m.platform.replace(/chrome os/i, qn).replace(/macos/i, Hn)), yt;
      }, this.getResult = function() {
        return {
          ua: this.getUA(),
          browser: this.getBrowser(),
          engine: this.getEngine(),
          os: this.getOS(),
          device: this.getDevice(),
          cpu: this.getCPU()
        };
      }, this.getUA = function() {
        return d;
      }, this.setUA = function(yt) {
        return d = typeof yt === u && yt.length > kt ? Gn(yt, kt) : yt, this;
      }, this.setUA(d), this;
    };
    Sn.VERSION = s, Sn.BROWSER = jn([k, B, y]), Sn.CPU = jn([St]), Sn.DEVICE = jn([S, D, w, wt, ht, Ue, N, Et, gt]), Sn.ENGINE = Sn.OS = jn([k, B]), e.exports && (t = e.exports = Sn), t.UAParser = Sn;
    var Cn = typeof n !== p && (n.jQuery || n.Zepto);
    if (Cn && !Cn.ua) {
      var Yn = new Sn();
      Cn.ua = Yn.getResult(), Cn.ua.get = function() {
        return Yn.getUA();
      }, Cn.ua.set = function(dn) {
        Yn.setUA(dn);
        var mn = Yn.getResult();
        for (var O in mn)
          Cn.ua[O] = mn[O];
      };
    }
  })(typeof window == "object" ? window : commonjsGlobal);
})(uaParser, uaParser.exports);
var uaParserExports = uaParser.exports;
const parser$1 = new uaParserExports.UAParser(), UA = parser$1.getResult();
class Logger {
  constructor(t, n = !0) {
    vn(this, "FLAG_FIREFOX");
    this.label = t, this.collapsed = n, this.FLAG_FIREFOX = UA.browser.name === "Firefox" || UA.engine.name === "Gecko";
  }
  /**
   * 输出
   * @param func: 所使用的输出函数
   * @param multiple: 是否进行多次输出
   * @param args: 输出函数的参数
   */
  stdout(t, n, ...r) {
    const s = this.FLAG_FIREFOX ? `[${this.label}] - <${t.name.toUpperCase()}>` : `[\x1B[4m${this.label}\x1B[0m] - <\x1B[1m${t.name.toUpperCase()}\x1B[0m>`;
    if (this.collapsed ? globalThis.console.groupCollapsed(s) : globalThis.console.group(s), n)
      for (const o of r)
        Array.isArray(o) ? t(...o) : t(o);
    else
      t(...r);
    globalThis.console.trace(), globalThis.console.groupEnd();
  }
  clear(...t) {
    this.stdout(globalThis.console.clear, !1, ...t);
  }
  countReset(...t) {
    this.stdout(globalThis.console.countReset, !1, ...t);
  }
  count(...t) {
    this.stdout(globalThis.console.count, !1, ...t);
  }
  counts(...t) {
    this.stdout(globalThis.console.count, !0, ...t);
  }
  assert(...t) {
    this.stdout(globalThis.console.assert, !1, ...t);
  }
  asserts(...t) {
    this.stdout(globalThis.console.assert, !0, ...t);
  }
  dir(...t) {
    this.stdout(globalThis.console.dir, !1, ...t);
  }
  dirs(...t) {
    this.stdout(globalThis.console.dir, !0, ...t);
  }
  dirxml(...t) {
    this.stdout(globalThis.console.dirxml, !1, ...t);
  }
  dirxmls(...t) {
    this.stdout(globalThis.console.dirxml, !0, ...t);
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
//! version : 2.30.1
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
  var t = null, n = !1, r = e._d && !isNaN(e._d.getTime());
  if (r && (t = getParsingFlags(e), n = some.call(t.parsedDateParts, function(s) {
    return s != null;
  }), r = t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n), e._strict && (r = r && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(e))
    e._isValid = r;
  else
    return r;
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
      var r = [], s, o, c, a = arguments.length;
      for (o = 0; o < a; o++) {
        if (s = "", typeof arguments[o] == "object") {
          s += `
[` + o + "] ";
          for (c in arguments[0])
            hasOwnProp(arguments[0], c) && (s += c + ": " + arguments[0][c] + ", ");
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
    var o = "", c;
    for (c = 0; c < r; c++)
      o += isFunction(t[c]) ? t[c].call(s, e) : t[c];
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
var aliases = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function normalizeUnits(e) {
  return typeof e == "string" ? aliases[e] || aliases[e.toLowerCase()] : void 0;
}
function normalizeObjectUnits(e) {
  var t = {}, n, r;
  for (r in e)
    hasOwnProp(e, r) && (n = normalizeUnits(r), n && (t[n] = e[r]));
  return t;
}
var priorities = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function getPrioritizedUnits(e) {
  var t = [], n;
  for (n in e)
    hasOwnProp(e, n) && t.push({ unit: n, priority: priorities[n] });
  return t.sort(function(r, s) {
    return r.priority - s.priority;
  }), t;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
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
function absFloor(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function toInt(e) {
  var t = +e, n = 0;
  return t !== 0 && isFinite(t) && (n = absFloor(t)), n;
}
var tokens$1 = {};
function addParseToken(e, t) {
  var n, r = t, s;
  for (typeof e == "string" && (e = [e]), isNumber$1(t) && (r = function(o, c) {
    c[t] = toInt(o);
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
function isLeapYear(e) {
  return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
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
function makeGetSet(e, t) {
  return function(n) {
    return n != null ? (set$1$1(this, e, n), hooks.updateOffset(this, t), this) : get(this, e);
  };
}
function get(e, t) {
  if (!e.isValid())
    return NaN;
  var n = e._d, r = e._isUTC;
  switch (t) {
    case "Milliseconds":
      return r ? n.getUTCMilliseconds() : n.getMilliseconds();
    case "Seconds":
      return r ? n.getUTCSeconds() : n.getSeconds();
    case "Minutes":
      return r ? n.getUTCMinutes() : n.getMinutes();
    case "Hours":
      return r ? n.getUTCHours() : n.getHours();
    case "Date":
      return r ? n.getUTCDate() : n.getDate();
    case "Day":
      return r ? n.getUTCDay() : n.getDay();
    case "Month":
      return r ? n.getUTCMonth() : n.getMonth();
    case "FullYear":
      return r ? n.getUTCFullYear() : n.getFullYear();
    default:
      return NaN;
  }
}
function set$1$1(e, t, n) {
  var r, s, o, c, a;
  if (!(!e.isValid() || isNaN(n))) {
    switch (r = e._d, s = e._isUTC, t) {
      case "Milliseconds":
        return void (s ? r.setUTCMilliseconds(n) : r.setMilliseconds(n));
      case "Seconds":
        return void (s ? r.setUTCSeconds(n) : r.setSeconds(n));
      case "Minutes":
        return void (s ? r.setUTCMinutes(n) : r.setMinutes(n));
      case "Hours":
        return void (s ? r.setUTCHours(n) : r.setHours(n));
      case "Date":
        return void (s ? r.setUTCDate(n) : r.setDate(n));
      case "FullYear":
        break;
      default:
        return;
    }
    o = n, c = e.month(), a = e.date(), a = a === 29 && c === 1 && !isLeapYear(o) ? 28 : a, s ? r.setUTCFullYear(o, c, a) : r.setFullYear(o, c, a);
  }
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
addRegexToken("M", match1to2, match1to2NoLeadingZero);
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
  var r, s, o, c = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], r = 0; r < 12; ++r)
      o = createUTC([2e3, r]), this._shortMonthsParse[r] = this.monthsShort(
        o,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[r] = this.months(o, "").toLocaleLowerCase();
  return n ? t === "MMM" ? (s = indexOf.call(this._shortMonthsParse, c), s !== -1 ? s : null) : (s = indexOf.call(this._longMonthsParse, c), s !== -1 ? s : null) : t === "MMM" ? (s = indexOf.call(this._shortMonthsParse, c), s !== -1 ? s : (s = indexOf.call(this._longMonthsParse, c), s !== -1 ? s : null)) : (s = indexOf.call(this._longMonthsParse, c), s !== -1 ? s : (s = indexOf.call(this._shortMonthsParse, c), s !== -1 ? s : null));
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
  if (!e.isValid())
    return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t))
      t = toInt(t);
    else if (t = e.localeData().monthsParse(t), !isNumber$1(t))
      return e;
  }
  var n = t, r = e.date();
  return r = r < 29 ? r : Math.min(r, daysInMonth(e.year(), n)), e._isUTC ? e._d.setUTCMonth(n, r) : e._d.setMonth(n, r), e;
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
  function e(p, f) {
    return f.length - p.length;
  }
  var t = [], n = [], r = [], s, o, c, a;
  for (s = 0; s < 12; s++)
    o = createUTC([2e3, s]), c = regexEscape(this.monthsShort(o, "")), a = regexEscape(this.months(o, "")), t.push(c), n.push(a), r.push(a), r.push(c);
  t.sort(e), n.sort(e), r.sort(e), this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + t.join("|") + ")",
    "i"
  );
}
function createDate(e, t, n, r, s, o, c) {
  var a;
  return e < 100 && e >= 0 ? (a = new Date(e + 400, t, n, r, s, o, c), isFinite(a.getFullYear()) && a.setFullYear(e)) : a = new Date(e, t, n, r, s, o, c), a;
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
  var o = (7 + n - r) % 7, c = firstWeekOffset(e, r, s), a = 1 + 7 * (t - 1) + o + c, p, f;
  return a <= 0 ? (p = e - 1, f = daysInYear(p) + a) : a > daysInYear(e) ? (p = e + 1, f = a - daysInYear(e)) : (p = e, f = a), {
    year: p,
    dayOfYear: f
  };
}
function weekOfYear(e, t, n) {
  var r = firstWeekOffset(e.year(), t, n), s = Math.floor((e.dayOfYear() - r - 1) / 7) + 1, o, c;
  return s < 1 ? (c = e.year() - 1, o = s + weeksInYear(c, t, n)) : s > weeksInYear(e.year(), t, n) ? (o = s - weeksInYear(e.year(), t, n), c = e.year() + 1) : (c = e.year(), o = s), {
    week: o,
    year: c
  };
}
function weeksInYear(e, t, n) {
  var r = firstWeekOffset(e, t, n), s = firstWeekOffset(e + 1, t, n);
  return (daysInYear(e) - r + s) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addRegexToken("w", match1to2, match1to2NoLeadingZero);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2, match1to2NoLeadingZero);
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
  var r, s, o, c = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], r = 0; r < 7; ++r)
      o = createUTC([2e3, 1]).day(r), this._minWeekdaysParse[r] = this.weekdaysMin(
        o,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[r] = this.weekdaysShort(
        o,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[r] = this.weekdays(o, "").toLocaleLowerCase();
  return n ? t === "dddd" ? (s = indexOf.call(this._weekdaysParse, c), s !== -1 ? s : null) : t === "ddd" ? (s = indexOf.call(this._shortWeekdaysParse, c), s !== -1 ? s : null) : (s = indexOf.call(this._minWeekdaysParse, c), s !== -1 ? s : null) : t === "dddd" ? (s = indexOf.call(this._weekdaysParse, c), s !== -1 || (s = indexOf.call(this._shortWeekdaysParse, c), s !== -1) ? s : (s = indexOf.call(this._minWeekdaysParse, c), s !== -1 ? s : null)) : t === "ddd" ? (s = indexOf.call(this._shortWeekdaysParse, c), s !== -1 || (s = indexOf.call(this._weekdaysParse, c), s !== -1) ? s : (s = indexOf.call(this._minWeekdaysParse, c), s !== -1 ? s : null)) : (s = indexOf.call(this._minWeekdaysParse, c), s !== -1 || (s = indexOf.call(this._weekdaysParse, c), s !== -1) ? s : (s = indexOf.call(this._shortWeekdaysParse, c), s !== -1 ? s : null));
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
  var t = get(this, "Day");
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
  function e(u, y) {
    return y.length - u.length;
  }
  var t = [], n = [], r = [], s = [], o, c, a, p, f;
  for (o = 0; o < 7; o++)
    c = createUTC([2e3, 1]).day(o), a = regexEscape(this.weekdaysMin(c, "")), p = regexEscape(this.weekdaysShort(c, "")), f = regexEscape(this.weekdays(c, "")), t.push(a), n.push(p), r.push(f), s.push(a), s.push(p), s.push(f);
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
function matchMeridiem(e, t) {
  return t._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2, match1to2HasZero);
addRegexToken("h", match1to2, match1to2NoLeadingZero);
addRegexToken("k", match1to2, match1to2NoLeadingZero);
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
  return !!(e && e.match("^[^/\\\\]*$"));
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
  var t, n, r = e._i, s = extendedIsoRegex.exec(r) || basicIsoRegex.exec(r), o, c, a, p, f = isoDates.length, u = isoTimes.length;
  if (s) {
    for (getParsingFlags(e).iso = !0, t = 0, n = f; t < n; t++)
      if (isoDates[t][1].exec(s[1])) {
        c = isoDates[t][0], o = isoDates[t][2] !== !1;
        break;
      }
    if (c == null) {
      e._isValid = !1;
      return;
    }
    if (s[3]) {
      for (t = 0, n = u; t < n; t++)
        if (isoTimes[t][1].exec(s[3])) {
          a = (s[2] || " ") + isoTimes[t][0];
          break;
        }
      if (a == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!o && a != null) {
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
    e._f = c + (a || "") + (p || ""), configFromStringAndFormat(e);
  } else
    e._isValid = !1;
}
function extractFromRFC2822Strings(e, t, n, r, s, o) {
  var c = [
    untruncateYear(e),
    defaultLocaleMonthsShort.indexOf(t),
    parseInt(n, 10),
    parseInt(r, 10),
    parseInt(s, 10)
  ];
  return o && c.push(parseInt(o, 10)), c;
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
  var t, n, r = [], s, o, c;
  if (!e._d) {
    for (s = currentDateArray(e), e._w && e._a[DATE] == null && e._a[MONTH] == null && dayOfYearFromWeekInfo(e), e._dayOfYear != null && (c = defaults(e._a[YEAR], s[YEAR]), (e._dayOfYear > daysInYear(c) || e._dayOfYear === 0) && (getParsingFlags(e)._overflowDayOfYear = !0), n = createUTCDate(c, 0, e._dayOfYear), e._a[MONTH] = n.getUTCMonth(), e._a[DATE] = n.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t)
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
  var t, n, r, s, o, c, a, p, f;
  t = e._w, t.GG != null || t.W != null || t.E != null ? (o = 1, c = 4, n = defaults(
    t.GG,
    e._a[YEAR],
    weekOfYear(createLocal(), 1, 4).year
  ), r = defaults(t.W, 1), s = defaults(t.E, 1), (s < 1 || s > 7) && (p = !0)) : (o = e._locale._week.dow, c = e._locale._week.doy, f = weekOfYear(createLocal(), o, c), n = defaults(t.gg, e._a[YEAR], f.year), r = defaults(t.w, f.week), t.d != null ? (s = t.d, (s < 0 || s > 6) && (p = !0)) : t.e != null ? (s = t.e + o, (t.e < 0 || t.e > 6) && (p = !0)) : s = o), r < 1 || r > weeksInYear(n, o, c) ? getParsingFlags(e)._overflowWeeks = !0 : p != null ? getParsingFlags(e)._overflowWeekday = !0 : (a = dayOfYearFromWeeks(n, r, s, o, c), e._a[YEAR] = a.year, e._dayOfYear = a.dayOfYear);
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
  var t = "" + e._i, n, r, s, o, c, a = t.length, p = 0, f, u;
  for (s = expandFormat(e._f, e._locale).match(formattingTokens) || [], u = s.length, n = 0; n < u; n++)
    o = s[n], r = (t.match(getParseRegexForToken(o, e)) || [])[0], r && (c = t.substr(0, t.indexOf(r)), c.length > 0 && getParsingFlags(e).unusedInput.push(c), t = t.slice(
      t.indexOf(r) + r.length
    ), p += r.length), formatTokenFunctions[o] ? (r ? getParsingFlags(e).empty = !1 : getParsingFlags(e).unusedTokens.push(o), addTimeToArrayFromToken(o, r, e)) : e._strict && !r && getParsingFlags(e).unusedTokens.push(o);
  getParsingFlags(e).charsLeftOver = a - p, t.length > 0 && getParsingFlags(e).unusedInput.push(t), e._a[HOUR] <= 12 && getParsingFlags(e).bigHour === !0 && e._a[HOUR] > 0 && (getParsingFlags(e).bigHour = void 0), getParsingFlags(e).parsedDateParts = e._a.slice(0), getParsingFlags(e).meridiem = e._meridiem, e._a[HOUR] = meridiemFixWrap(
    e._locale,
    e._a[HOUR],
    e._meridiem
  ), f = getParsingFlags(e).era, f !== null && (e._a[YEAR] = e._locale.erasConvertYear(f, e._a[YEAR])), configFromArray(e), checkOverflow(e);
}
function meridiemFixWrap(e, t, n) {
  var r;
  return n == null ? t : e.meridiemHour != null ? e.meridiemHour(t, n) : (e.isPM != null && (r = e.isPM(n), r && t < 12 && (t += 12), !r && t === 12 && (t = 0)), t);
}
function configFromStringAndArray(e) {
  var t, n, r, s, o, c, a = !1, p = e._f.length;
  if (p === 0) {
    getParsingFlags(e).invalidFormat = !0, e._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (s = 0; s < p; s++)
    o = 0, c = !1, t = copyConfig({}, e), e._useUTC != null && (t._useUTC = e._useUTC), t._f = e._f[s], configFromStringAndFormat(t), isValid(t) && (c = !0), o += getParsingFlags(t).charsLeftOver, o += getParsingFlags(t).unusedTokens.length * 10, getParsingFlags(t).score = o, a ? o < r && (r = o, n = t) : (r == null || o < r || c) && (r = o, n = t, c && (a = !0));
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
  var t = normalizeObjectUnits(e), n = t.year || 0, r = t.quarter || 0, s = t.month || 0, o = t.week || t.isoWeek || 0, c = t.day || 0, a = t.hour || 0, p = t.minute || 0, f = t.second || 0, u = t.millisecond || 0;
  this._isValid = isDurationValid(t), this._milliseconds = +u + f * 1e3 + // 1000
  p * 6e4 + // 1000 * 60
  a * 1e3 * 60 * 60, this._days = +c + o * 7, this._months = +s + r * 3 + n * 12, this._data = {}, this._locale = getLocale(), this._bubble();
}
function isDuration(e) {
  return e instanceof Duration;
}
function absRound(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function compareArrays(e, t, n) {
  var r = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), o = 0, c;
  for (c = 0; c < r; c++)
    (n && e[c] !== t[c] || !n && toInt(e[c]) !== toInt(t[c])) && o++;
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
  var n = e, r = null, s, o, c;
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
  }) : n == null ? n = {} : typeof n == "object" && ("from" in n || "to" in n) && (c = momentsDifference(
    createLocal(n.from),
    createLocal(n.to)
  ), n = {}, n.ms = c.milliseconds, n.M = c.months), o = new Duration(n), isDuration(e) && hasOwnProp(e, "_locale") && (o._locale = e._locale), isDuration(e) && hasOwnProp(e, "_isValid") && (o._isValid = e._isValid), o;
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
  var s = t._milliseconds, o = absRound(t._days), c = absRound(t._months);
  e.isValid() && (r = r ?? !0, c && setMonth(e, get(e, "Month") + c * n), o && set$1$1(e, "Date", get(e, "Date") + o * n), s && e._d.setTime(e._d.valueOf() + s * n), r && hooks.updateOffset(e, o || c));
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
  ], s, o, c = r.length;
  for (s = 0; s < c; s += 1)
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
  var r, s, o = this.eras(), c, a, p;
  for (e = e.toUpperCase(), r = 0, s = o.length; r < s; ++r)
    if (c = o[r].name.toUpperCase(), a = o[r].abbr.toUpperCase(), p = o[r].narrow.toUpperCase(), n)
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (a === e)
            return o[r];
          break;
        case "NNNN":
          if (c === e)
            return o[r];
          break;
        case "NNNNN":
          if (p === e)
            return o[r];
          break;
      }
    else if ([c, a, p].indexOf(e) >= 0)
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
  var e = [], t = [], n = [], r = [], s, o, c, a, p, f = this.eras();
  for (s = 0, o = f.length; s < o; ++s)
    c = regexEscape(f[s].name), a = regexEscape(f[s].abbr), p = regexEscape(f[s].narrow), t.push(c), e.push(a), n.push(p), r.push(c), r.push(a), r.push(p);
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
    this.weekday() + this.localeData()._week.dow,
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
  var o = dayOfYearFromWeeks(e, t, n, r, s), c = createUTCDate(o.year, 0, o.dayOfYear);
  return this.year(c.getUTCFullYear()), this.month(c.getUTCMonth()), this.date(c.getUTCDate()), this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addRegexToken("Q", match1);
addParseToken("Q", function(e, t) {
  t[MONTH] = (toInt(e) - 1) * 3;
});
function getSetQuarter(e) {
  return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addRegexToken("D", match1to2, match1to2NoLeadingZero);
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
addRegexToken("m", match1to2, match1to2HasZero);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", !1);
addFormatToken("s", ["ss", 2], 0, "second");
addRegexToken("s", match1to2, match1to2HasZero);
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
  var s = getLocale(), o = e ? s._week.dow : 0, c, a = [];
  if (n != null)
    return get$1(t, (n + o) % 7, r, "day");
  for (c = 0; c < 7; c++)
    a[c] = get$1(t, (c + o) % 7, r, "day");
  return a;
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
  var e = this._milliseconds, t = this._days, n = this._months, r = this._data, s, o, c, a, p;
  return e >= 0 && t >= 0 && n >= 0 || e <= 0 && t <= 0 && n <= 0 || (e += absCeil(monthsToDays(n) + t) * 864e5, t = 0, n = 0), r.milliseconds = e % 1e3, s = absFloor(e / 1e3), r.seconds = s % 60, o = absFloor(s / 60), r.minutes = o % 60, c = absFloor(o / 60), r.hours = c % 24, t += absFloor(c / 24), p = absFloor(daysToMonths(t)), n += p, t -= absCeil(monthsToDays(p)), a = absFloor(n / 12), n %= 12, r.days = t, r.months = n, r.years = a, this;
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
function makeAs(e) {
  return function() {
    return this.as(e);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
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
  var s = createDuration(e).abs(), o = round(s.as("s")), c = round(s.as("m")), a = round(s.as("h")), p = round(s.as("d")), f = round(s.as("M")), u = round(s.as("w")), y = round(s.as("y")), S = o <= n.ss && ["s", o] || o < n.s && ["ss", o] || c <= 1 && ["m"] || c < n.m && ["mm", c] || a <= 1 && ["h"] || a < n.h && ["hh", a] || p <= 1 && ["d"] || p < n.d && ["dd", p];
  return n.w != null && (S = S || u <= 1 && ["w"] || u < n.w && ["ww", u]), S = S || f <= 1 && ["M"] || f < n.M && ["MM", f] || y <= 1 && ["y"] || ["yy", y], S[2] = t, S[3] = +e > 0, S[4] = r, substituteTimeAgo.apply(null, S);
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
  var e = abs$1(this._milliseconds) / 1e3, t = abs$1(this._days), n = abs$1(this._months), r, s, o, c, a = this.asSeconds(), p, f, u, y;
  return a ? (r = absFloor(e / 60), s = absFloor(r / 60), e %= 60, r %= 60, o = absFloor(n / 12), n %= 12, c = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", p = a < 0 ? "-" : "", f = sign(this._months) !== sign(a) ? "-" : "", u = sign(this._days) !== sign(a) ? "-" : "", y = sign(this._milliseconds) !== sign(a) ? "-" : "", p + "P" + (o ? f + o + "Y" : "") + (n ? f + n + "M" : "") + (t ? u + t + "D" : "") + (s || r || e ? "T" : "") + (s ? y + s + "H" : "") + (r ? y + r + "M" : "") + (e ? y + c + "S" : "")) : "P0D";
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
hooks.version = "2.30.1";
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
    vn(this, "map", /* @__PURE__ */ new Map());
    vn(this, "counter", Math.random());
    vn(this, "errerEventListener", async (t) => {
      this.logger.warn(t);
    });
    vn(this, "messageEventListener", async (t) => {
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
      const c = {
        type: "call",
        id: o,
        handler: {
          name: t,
          args: n
        }
      };
      this.port.postMessage(c);
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
      const c = this.counter++;
      this.map.set(c, { resolve: s, reject: o });
      const a = {
        type: "call",
        id: c,
        uuid: n,
        handler: {
          name: t,
          args: r
        }
      };
      this.port.postMessage(a);
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
revLookup[45] = 62;
revLookup[95] = 63;
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
  var t, n = getLens(e), r = n[0], s = n[1], o = new Arr(_byteLength(e, r, s)), c = 0, a = s > 0 ? r - 4 : r, p;
  for (p = 0; p < a; p += 4)
    t = revLookup[e.charCodeAt(p)] << 18 | revLookup[e.charCodeAt(p + 1)] << 12 | revLookup[e.charCodeAt(p + 2)] << 6 | revLookup[e.charCodeAt(p + 3)], o[c++] = t >> 16 & 255, o[c++] = t >> 8 & 255, o[c++] = t & 255;
  return s === 2 && (t = revLookup[e.charCodeAt(p)] << 2 | revLookup[e.charCodeAt(p + 1)] >> 4, o[c++] = t & 255), s === 1 && (t = revLookup[e.charCodeAt(p)] << 10 | revLookup[e.charCodeAt(p + 1)] << 4 | revLookup[e.charCodeAt(p + 2)] >> 2, o[c++] = t >> 8 & 255, o[c++] = t & 255), o;
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
  for (var t, n = e.length, r = n % 3, s = [], o = 16383, c = 0, a = n - r; c < a; c += o)
    s.push(encodeChunk(e, c, c + o > a ? a : c + o));
  return r === 1 ? (t = e[n - 1], s.push(
    lookup[t >> 2] + lookup[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], s.push(
    lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "="
  )), s.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(e, t, n, r, s) {
  var o, c, a = s * 8 - r - 1, p = (1 << a) - 1, f = p >> 1, u = -7, y = n ? s - 1 : 0, S = n ? -1 : 1, k = e[t + y];
  for (y += S, o = k & (1 << -u) - 1, k >>= -u, u += a; u > 0; o = o * 256 + e[t + y], y += S, u -= 8)
    ;
  for (c = o & (1 << -u) - 1, o >>= -u, u += r; u > 0; c = c * 256 + e[t + y], y += S, u -= 8)
    ;
  if (o === 0)
    o = 1 - f;
  else {
    if (o === p)
      return c ? NaN : (k ? -1 : 1) * (1 / 0);
    c = c + Math.pow(2, r), o = o - f;
  }
  return (k ? -1 : 1) * c * Math.pow(2, o - r);
};
ieee754.write = function(e, t, n, r, s, o) {
  var c, a, p, f = o * 8 - s - 1, u = (1 << f) - 1, y = u >> 1, S = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = r ? 0 : o - 1, w = r ? 1 : -1, D = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, c = u) : (c = Math.floor(Math.log(t) / Math.LN2), t * (p = Math.pow(2, -c)) < 1 && (c--, p *= 2), c + y >= 1 ? t += S / p : t += S * Math.pow(2, 1 - y), t * p >= 2 && (c++, p /= 2), c + y >= u ? (a = 0, c = u) : c + y >= 1 ? (a = (t * p - 1) * Math.pow(2, s), c = c + y) : (a = t * Math.pow(2, y - 1) * Math.pow(2, s), c = 0)); s >= 8; e[n + k] = a & 255, k += w, a /= 256, s -= 8)
    ;
  for (c = c << s | a, f += s; f > 0; e[n + k] = c & 255, k += w, c /= 256, f -= 8)
    ;
  e[n + k - w] |= D * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const t = base64Js, n = ieee754, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = a, e.SlowBuffer = wt, e.INSPECT_MAX_BYTES = 50;
  const s = 2147483647;
  e.kMaxLength = s, a.TYPED_ARRAY_SUPPORT = o(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      const O = new Uint8Array(1), d = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(d, Uint8Array.prototype), Object.setPrototypeOf(O, d), O.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(a.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(a.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (a.isBuffer(this))
        return this.byteOffset;
    }
  });
  function c(O) {
    if (O > s)
      throw new RangeError('The value "' + O + '" is invalid for option "size"');
    const d = new Uint8Array(O);
    return Object.setPrototypeOf(d, a.prototype), d;
  }
  function a(O, d, m) {
    if (typeof O == "number") {
      if (typeof d == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return y(O);
    }
    return p(O, d, m);
  }
  a.poolSize = 8192;
  function p(O, d, m) {
    if (typeof O == "string")
      return S(O, d);
    if (ArrayBuffer.isView(O))
      return w(O);
    if (O == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof O
      );
    if (Sn(O, ArrayBuffer) || O && Sn(O.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Sn(O, SharedArrayBuffer) || O && Sn(O.buffer, SharedArrayBuffer)))
      return D(O, d, m);
    if (typeof O == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const fe = O.valueOf && O.valueOf();
    if (fe != null && fe !== O)
      return a.from(fe, d, m);
    const dt = B(O);
    if (dt)
      return dt;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof O[Symbol.toPrimitive] == "function")
      return a.from(O[Symbol.toPrimitive]("string"), d, m);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof O
    );
  }
  a.from = function(O, d, m) {
    return p(O, d, m);
  }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
  function f(O) {
    if (typeof O != "number")
      throw new TypeError('"size" argument must be of type number');
    if (O < 0)
      throw new RangeError('The value "' + O + '" is invalid for option "size"');
  }
  function u(O, d, m) {
    return f(O), O <= 0 ? c(O) : d !== void 0 ? typeof m == "string" ? c(O).fill(d, m) : c(O).fill(d) : c(O);
  }
  a.alloc = function(O, d, m) {
    return u(O, d, m);
  };
  function y(O) {
    return f(O), c(O < 0 ? 0 : St(O) | 0);
  }
  a.allocUnsafe = function(O) {
    return y(O);
  }, a.allocUnsafeSlow = function(O) {
    return y(O);
  };
  function S(O, d) {
    if ((typeof d != "string" || d === "") && (d = "utf8"), !a.isEncoding(d))
      throw new TypeError("Unknown encoding: " + d);
    const m = ht(O, d) | 0;
    let fe = c(m);
    const dt = fe.write(O, d);
    return dt !== m && (fe = fe.slice(0, dt)), fe;
  }
  function k(O) {
    const d = O.length < 0 ? 0 : St(O.length) | 0, m = c(d);
    for (let fe = 0; fe < d; fe += 1)
      m[fe] = O[fe] & 255;
    return m;
  }
  function w(O) {
    if (Sn(O, Uint8Array)) {
      const d = new Uint8Array(O);
      return D(d.buffer, d.byteOffset, d.byteLength);
    }
    return k(O);
  }
  function D(O, d, m) {
    if (d < 0 || O.byteLength < d)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (O.byteLength < d + (m || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let fe;
    return d === void 0 && m === void 0 ? fe = new Uint8Array(O) : m === void 0 ? fe = new Uint8Array(O, d) : fe = new Uint8Array(O, d, m), Object.setPrototypeOf(fe, a.prototype), fe;
  }
  function B(O) {
    if (a.isBuffer(O)) {
      const d = St(O.length) | 0, m = c(d);
      return m.length === 0 || O.copy(m, 0, 0, d), m;
    }
    if (O.length !== void 0)
      return typeof O.length != "number" || Cn(O.length) ? c(0) : k(O);
    if (O.type === "Buffer" && Array.isArray(O.data))
      return k(O.data);
  }
  function St(O) {
    if (O >= s)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
    return O | 0;
  }
  function wt(O) {
    return +O != O && (O = 0), a.alloc(+O);
  }
  a.isBuffer = function(d) {
    return d != null && d._isBuffer === !0 && d !== a.prototype;
  }, a.compare = function(d, m) {
    if (Sn(d, Uint8Array) && (d = a.from(d, d.offset, d.byteLength)), Sn(m, Uint8Array) && (m = a.from(m, m.offset, m.byteLength)), !a.isBuffer(d) || !a.isBuffer(m))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (d === m)
      return 0;
    let fe = d.length, dt = m.length;
    for (let yt = 0, Ct = Math.min(fe, dt); yt < Ct; ++yt)
      if (d[yt] !== m[yt]) {
        fe = d[yt], dt = m[yt];
        break;
      }
    return fe < dt ? -1 : dt < fe ? 1 : 0;
  }, a.isEncoding = function(d) {
    switch (String(d).toLowerCase()) {
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
  }, a.concat = function(d, m) {
    if (!Array.isArray(d))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (d.length === 0)
      return a.alloc(0);
    let fe;
    if (m === void 0)
      for (m = 0, fe = 0; fe < d.length; ++fe)
        m += d[fe].length;
    const dt = a.allocUnsafe(m);
    let yt = 0;
    for (fe = 0; fe < d.length; ++fe) {
      let Ct = d[fe];
      if (Sn(Ct, Uint8Array))
        yt + Ct.length > dt.length ? (a.isBuffer(Ct) || (Ct = a.from(Ct)), Ct.copy(dt, yt)) : Uint8Array.prototype.set.call(
          dt,
          Ct,
          yt
        );
      else if (a.isBuffer(Ct))
        Ct.copy(dt, yt);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      yt += Ct.length;
    }
    return dt;
  };
  function ht(O, d) {
    if (a.isBuffer(O))
      return O.length;
    if (ArrayBuffer.isView(O) || Sn(O, ArrayBuffer))
      return O.byteLength;
    if (typeof O != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof O
      );
    const m = O.length, fe = arguments.length > 2 && arguments[2] === !0;
    if (!fe && m === 0)
      return 0;
    let dt = !1;
    for (; ; )
      switch (d) {
        case "ascii":
        case "latin1":
        case "binary":
          return m;
        case "utf8":
        case "utf-8":
          return Un(O).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return m * 2;
        case "hex":
          return m >>> 1;
        case "base64":
          return zn(O).length;
        default:
          if (dt)
            return fe ? -1 : Un(O).length;
          d = ("" + d).toLowerCase(), dt = !0;
      }
  }
  a.byteLength = ht;
  function N(O, d, m) {
    let fe = !1;
    if ((d === void 0 || d < 0) && (d = 0), d > this.length || ((m === void 0 || m > this.length) && (m = this.length), m <= 0) || (m >>>= 0, d >>>= 0, m <= d))
      return "";
    for (O || (O = "utf8"); ; )
      switch (O) {
        case "hex":
          return En(this, d, m);
        case "utf8":
        case "utf-8":
          return pn(this, d, m);
        case "ascii":
          return Pn(this, d, m);
        case "latin1":
        case "binary":
          return $n(this, d, m);
        case "base64":
          return un(this, d, m);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Dn(this, d, m);
        default:
          if (fe)
            throw new TypeError("Unknown encoding: " + O);
          O = (O + "").toLowerCase(), fe = !0;
      }
  }
  a.prototype._isBuffer = !0;
  function Ue(O, d, m) {
    const fe = O[d];
    O[d] = O[m], O[m] = fe;
  }
  a.prototype.swap16 = function() {
    const d = this.length;
    if (d % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let m = 0; m < d; m += 2)
      Ue(this, m, m + 1);
    return this;
  }, a.prototype.swap32 = function() {
    const d = this.length;
    if (d % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let m = 0; m < d; m += 4)
      Ue(this, m, m + 3), Ue(this, m + 1, m + 2);
    return this;
  }, a.prototype.swap64 = function() {
    const d = this.length;
    if (d % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let m = 0; m < d; m += 8)
      Ue(this, m, m + 7), Ue(this, m + 1, m + 6), Ue(this, m + 2, m + 5), Ue(this, m + 3, m + 4);
    return this;
  }, a.prototype.toString = function() {
    const d = this.length;
    return d === 0 ? "" : arguments.length === 0 ? pn(this, 0, d) : N.apply(this, arguments);
  }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(d) {
    if (!a.isBuffer(d))
      throw new TypeError("Argument must be a Buffer");
    return this === d ? !0 : a.compare(this, d) === 0;
  }, a.prototype.inspect = function() {
    let d = "";
    const m = e.INSPECT_MAX_BYTES;
    return d = this.toString("hex", 0, m).replace(/(.{2})/g, "$1 ").trim(), this.length > m && (d += " ... "), "<Buffer " + d + ">";
  }, r && (a.prototype[r] = a.prototype.inspect), a.prototype.compare = function(d, m, fe, dt, yt) {
    if (Sn(d, Uint8Array) && (d = a.from(d, d.offset, d.byteLength)), !a.isBuffer(d))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof d
      );
    if (m === void 0 && (m = 0), fe === void 0 && (fe = d ? d.length : 0), dt === void 0 && (dt = 0), yt === void 0 && (yt = this.length), m < 0 || fe > d.length || dt < 0 || yt > this.length)
      throw new RangeError("out of range index");
    if (dt >= yt && m >= fe)
      return 0;
    if (dt >= yt)
      return -1;
    if (m >= fe)
      return 1;
    if (m >>>= 0, fe >>>= 0, dt >>>= 0, yt >>>= 0, this === d)
      return 0;
    let Ct = yt - dt, fn = fe - m;
    const wn = Math.min(Ct, fn), bn = this.slice(dt, yt), kn = d.slice(m, fe);
    for (let _n = 0; _n < wn; ++_n)
      if (bn[_n] !== kn[_n]) {
        Ct = bn[_n], fn = kn[_n];
        break;
      }
    return Ct < fn ? -1 : fn < Ct ? 1 : 0;
  };
  function Et(O, d, m, fe, dt) {
    if (O.length === 0)
      return -1;
    if (typeof m == "string" ? (fe = m, m = 0) : m > 2147483647 ? m = 2147483647 : m < -2147483648 && (m = -2147483648), m = +m, Cn(m) && (m = dt ? 0 : O.length - 1), m < 0 && (m = O.length + m), m >= O.length) {
      if (dt)
        return -1;
      m = O.length - 1;
    } else if (m < 0)
      if (dt)
        m = 0;
      else
        return -1;
    if (typeof d == "string" && (d = a.from(d, fe)), a.isBuffer(d))
      return d.length === 0 ? -1 : gt(O, d, m, fe, dt);
    if (typeof d == "number")
      return d = d & 255, typeof Uint8Array.prototype.indexOf == "function" ? dt ? Uint8Array.prototype.indexOf.call(O, d, m) : Uint8Array.prototype.lastIndexOf.call(O, d, m) : gt(O, [d], m, fe, dt);
    throw new TypeError("val must be string, number or Buffer");
  }
  function gt(O, d, m, fe, dt) {
    let yt = 1, Ct = O.length, fn = d.length;
    if (fe !== void 0 && (fe = String(fe).toLowerCase(), fe === "ucs2" || fe === "ucs-2" || fe === "utf16le" || fe === "utf-16le")) {
      if (O.length < 2 || d.length < 2)
        return -1;
      yt = 2, Ct /= 2, fn /= 2, m /= 2;
    }
    function wn(kn, _n) {
      return yt === 1 ? kn[_n] : kn.readUInt16BE(_n * yt);
    }
    let bn;
    if (dt) {
      let kn = -1;
      for (bn = m; bn < Ct; bn++)
        if (wn(O, bn) === wn(d, kn === -1 ? 0 : bn - kn)) {
          if (kn === -1 && (kn = bn), bn - kn + 1 === fn)
            return kn * yt;
        } else
          kn !== -1 && (bn -= bn - kn), kn = -1;
    } else
      for (m + fn > Ct && (m = Ct - fn), bn = m; bn >= 0; bn--) {
        let kn = !0;
        for (let _n = 0; _n < fn; _n++)
          if (wn(O, bn + _n) !== wn(d, _n)) {
            kn = !1;
            break;
          }
        if (kn)
          return bn;
      }
    return -1;
  }
  a.prototype.includes = function(d, m, fe) {
    return this.indexOf(d, m, fe) !== -1;
  }, a.prototype.indexOf = function(d, m, fe) {
    return Et(this, d, m, fe, !0);
  }, a.prototype.lastIndexOf = function(d, m, fe) {
    return Et(this, d, m, fe, !1);
  };
  function kt(O, d, m, fe) {
    m = Number(m) || 0;
    const dt = O.length - m;
    fe ? (fe = Number(fe), fe > dt && (fe = dt)) : fe = dt;
    const yt = d.length;
    fe > yt / 2 && (fe = yt / 2);
    let Ct;
    for (Ct = 0; Ct < fe; ++Ct) {
      const fn = parseInt(d.substr(Ct * 2, 2), 16);
      if (Cn(fn))
        return Ct;
      O[m + Ct] = fn;
    }
    return Ct;
  }
  function mt(O, d, m, fe) {
    return Fn(Un(d, O.length - m), O, m, fe);
  }
  function ft(O, d, m, fe) {
    return Fn(Vn(d), O, m, fe);
  }
  function bt(O, d, m, fe) {
    return Fn(zn(d), O, m, fe);
  }
  function At(O, d, m, fe) {
    return Fn(Zn(d, O.length - m), O, m, fe);
  }
  a.prototype.write = function(d, m, fe, dt) {
    if (m === void 0)
      dt = "utf8", fe = this.length, m = 0;
    else if (fe === void 0 && typeof m == "string")
      dt = m, fe = this.length, m = 0;
    else if (isFinite(m))
      m = m >>> 0, isFinite(fe) ? (fe = fe >>> 0, dt === void 0 && (dt = "utf8")) : (dt = fe, fe = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const yt = this.length - m;
    if ((fe === void 0 || fe > yt) && (fe = yt), d.length > 0 && (fe < 0 || m < 0) || m > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    dt || (dt = "utf8");
    let Ct = !1;
    for (; ; )
      switch (dt) {
        case "hex":
          return kt(this, d, m, fe);
        case "utf8":
        case "utf-8":
          return mt(this, d, m, fe);
        case "ascii":
        case "latin1":
        case "binary":
          return ft(this, d, m, fe);
        case "base64":
          return bt(this, d, m, fe);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return At(this, d, m, fe);
        default:
          if (Ct)
            throw new TypeError("Unknown encoding: " + dt);
          dt = ("" + dt).toLowerCase(), Ct = !0;
      }
  }, a.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function un(O, d, m) {
    return d === 0 && m === O.length ? t.fromByteArray(O) : t.fromByteArray(O.slice(d, m));
  }
  function pn(O, d, m) {
    m = Math.min(O.length, m);
    const fe = [];
    let dt = d;
    for (; dt < m; ) {
      const yt = O[dt];
      let Ct = null, fn = yt > 239 ? 4 : yt > 223 ? 3 : yt > 191 ? 2 : 1;
      if (dt + fn <= m) {
        let wn, bn, kn, _n;
        switch (fn) {
          case 1:
            yt < 128 && (Ct = yt);
            break;
          case 2:
            wn = O[dt + 1], (wn & 192) === 128 && (_n = (yt & 31) << 6 | wn & 63, _n > 127 && (Ct = _n));
            break;
          case 3:
            wn = O[dt + 1], bn = O[dt + 2], (wn & 192) === 128 && (bn & 192) === 128 && (_n = (yt & 15) << 12 | (wn & 63) << 6 | bn & 63, _n > 2047 && (_n < 55296 || _n > 57343) && (Ct = _n));
            break;
          case 4:
            wn = O[dt + 1], bn = O[dt + 2], kn = O[dt + 3], (wn & 192) === 128 && (bn & 192) === 128 && (kn & 192) === 128 && (_n = (yt & 15) << 18 | (wn & 63) << 12 | (bn & 63) << 6 | kn & 63, _n > 65535 && _n < 1114112 && (Ct = _n));
        }
      }
      Ct === null ? (Ct = 65533, fn = 1) : Ct > 65535 && (Ct -= 65536, fe.push(Ct >>> 10 & 1023 | 55296), Ct = 56320 | Ct & 1023), fe.push(Ct), dt += fn;
    }
    return On(fe);
  }
  const Tn = 4096;
  function On(O) {
    const d = O.length;
    if (d <= Tn)
      return String.fromCharCode.apply(String, O);
    let m = "", fe = 0;
    for (; fe < d; )
      m += String.fromCharCode.apply(
        String,
        O.slice(fe, fe += Tn)
      );
    return m;
  }
  function Pn(O, d, m) {
    let fe = "";
    m = Math.min(O.length, m);
    for (let dt = d; dt < m; ++dt)
      fe += String.fromCharCode(O[dt] & 127);
    return fe;
  }
  function $n(O, d, m) {
    let fe = "";
    m = Math.min(O.length, m);
    for (let dt = d; dt < m; ++dt)
      fe += String.fromCharCode(O[dt]);
    return fe;
  }
  function En(O, d, m) {
    const fe = O.length;
    (!d || d < 0) && (d = 0), (!m || m < 0 || m > fe) && (m = fe);
    let dt = "";
    for (let yt = d; yt < m; ++yt)
      dt += Yn[O[yt]];
    return dt;
  }
  function Dn(O, d, m) {
    const fe = O.slice(d, m);
    let dt = "";
    for (let yt = 0; yt < fe.length - 1; yt += 2)
      dt += String.fromCharCode(fe[yt] + fe[yt + 1] * 256);
    return dt;
  }
  a.prototype.slice = function(d, m) {
    const fe = this.length;
    d = ~~d, m = m === void 0 ? fe : ~~m, d < 0 ? (d += fe, d < 0 && (d = 0)) : d > fe && (d = fe), m < 0 ? (m += fe, m < 0 && (m = 0)) : m > fe && (m = fe), m < d && (m = d);
    const dt = this.subarray(d, m);
    return Object.setPrototypeOf(dt, a.prototype), dt;
  };
  function yn(O, d, m) {
    if (O % 1 !== 0 || O < 0)
      throw new RangeError("offset is not uint");
    if (O + d > m)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(d, m, fe) {
    d = d >>> 0, m = m >>> 0, fe || yn(d, m, this.length);
    let dt = this[d], yt = 1, Ct = 0;
    for (; ++Ct < m && (yt *= 256); )
      dt += this[d + Ct] * yt;
    return dt;
  }, a.prototype.readUintBE = a.prototype.readUIntBE = function(d, m, fe) {
    d = d >>> 0, m = m >>> 0, fe || yn(d, m, this.length);
    let dt = this[d + --m], yt = 1;
    for (; m > 0 && (yt *= 256); )
      dt += this[d + --m] * yt;
    return dt;
  }, a.prototype.readUint8 = a.prototype.readUInt8 = function(d, m) {
    return d = d >>> 0, m || yn(d, 1, this.length), this[d];
  }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(d, m) {
    return d = d >>> 0, m || yn(d, 2, this.length), this[d] | this[d + 1] << 8;
  }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(d, m) {
    return d = d >>> 0, m || yn(d, 2, this.length), this[d] << 8 | this[d + 1];
  }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(d, m) {
    return d = d >>> 0, m || yn(d, 4, this.length), (this[d] | this[d + 1] << 8 | this[d + 2] << 16) + this[d + 3] * 16777216;
  }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(d, m) {
    return d = d >>> 0, m || yn(d, 4, this.length), this[d] * 16777216 + (this[d + 1] << 16 | this[d + 2] << 8 | this[d + 3]);
  }, a.prototype.readBigUInt64LE = dn(function(d) {
    d = d >>> 0, In(d, "offset");
    const m = this[d], fe = this[d + 7];
    (m === void 0 || fe === void 0) && Mn(d, this.length - 8);
    const dt = m + this[++d] * 2 ** 8 + this[++d] * 2 ** 16 + this[++d] * 2 ** 24, yt = this[++d] + this[++d] * 2 ** 8 + this[++d] * 2 ** 16 + fe * 2 ** 24;
    return BigInt(dt) + (BigInt(yt) << BigInt(32));
  }), a.prototype.readBigUInt64BE = dn(function(d) {
    d = d >>> 0, In(d, "offset");
    const m = this[d], fe = this[d + 7];
    (m === void 0 || fe === void 0) && Mn(d, this.length - 8);
    const dt = m * 2 ** 24 + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + this[++d], yt = this[++d] * 2 ** 24 + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + fe;
    return (BigInt(dt) << BigInt(32)) + BigInt(yt);
  }), a.prototype.readIntLE = function(d, m, fe) {
    d = d >>> 0, m = m >>> 0, fe || yn(d, m, this.length);
    let dt = this[d], yt = 1, Ct = 0;
    for (; ++Ct < m && (yt *= 256); )
      dt += this[d + Ct] * yt;
    return yt *= 128, dt >= yt && (dt -= Math.pow(2, 8 * m)), dt;
  }, a.prototype.readIntBE = function(d, m, fe) {
    d = d >>> 0, m = m >>> 0, fe || yn(d, m, this.length);
    let dt = m, yt = 1, Ct = this[d + --dt];
    for (; dt > 0 && (yt *= 256); )
      Ct += this[d + --dt] * yt;
    return yt *= 128, Ct >= yt && (Ct -= Math.pow(2, 8 * m)), Ct;
  }, a.prototype.readInt8 = function(d, m) {
    return d = d >>> 0, m || yn(d, 1, this.length), this[d] & 128 ? (255 - this[d] + 1) * -1 : this[d];
  }, a.prototype.readInt16LE = function(d, m) {
    d = d >>> 0, m || yn(d, 2, this.length);
    const fe = this[d] | this[d + 1] << 8;
    return fe & 32768 ? fe | 4294901760 : fe;
  }, a.prototype.readInt16BE = function(d, m) {
    d = d >>> 0, m || yn(d, 2, this.length);
    const fe = this[d + 1] | this[d] << 8;
    return fe & 32768 ? fe | 4294901760 : fe;
  }, a.prototype.readInt32LE = function(d, m) {
    return d = d >>> 0, m || yn(d, 4, this.length), this[d] | this[d + 1] << 8 | this[d + 2] << 16 | this[d + 3] << 24;
  }, a.prototype.readInt32BE = function(d, m) {
    return d = d >>> 0, m || yn(d, 4, this.length), this[d] << 24 | this[d + 1] << 16 | this[d + 2] << 8 | this[d + 3];
  }, a.prototype.readBigInt64LE = dn(function(d) {
    d = d >>> 0, In(d, "offset");
    const m = this[d], fe = this[d + 7];
    (m === void 0 || fe === void 0) && Mn(d, this.length - 8);
    const dt = this[d + 4] + this[d + 5] * 2 ** 8 + this[d + 6] * 2 ** 16 + (fe << 24);
    return (BigInt(dt) << BigInt(32)) + BigInt(m + this[++d] * 2 ** 8 + this[++d] * 2 ** 16 + this[++d] * 2 ** 24);
  }), a.prototype.readBigInt64BE = dn(function(d) {
    d = d >>> 0, In(d, "offset");
    const m = this[d], fe = this[d + 7];
    (m === void 0 || fe === void 0) && Mn(d, this.length - 8);
    const dt = (m << 24) + // Overflow
    this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + this[++d];
    return (BigInt(dt) << BigInt(32)) + BigInt(this[++d] * 2 ** 24 + this[++d] * 2 ** 16 + this[++d] * 2 ** 8 + fe);
  }), a.prototype.readFloatLE = function(d, m) {
    return d = d >>> 0, m || yn(d, 4, this.length), n.read(this, d, !0, 23, 4);
  }, a.prototype.readFloatBE = function(d, m) {
    return d = d >>> 0, m || yn(d, 4, this.length), n.read(this, d, !1, 23, 4);
  }, a.prototype.readDoubleLE = function(d, m) {
    return d = d >>> 0, m || yn(d, 8, this.length), n.read(this, d, !0, 52, 8);
  }, a.prototype.readDoubleBE = function(d, m) {
    return d = d >>> 0, m || yn(d, 8, this.length), n.read(this, d, !1, 52, 8);
  };
  function gn(O, d, m, fe, dt, yt) {
    if (!a.isBuffer(O))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (d > dt || d < yt)
      throw new RangeError('"value" argument is out of bounds');
    if (m + fe > O.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(d, m, fe, dt) {
    if (d = +d, m = m >>> 0, fe = fe >>> 0, !dt) {
      const fn = Math.pow(2, 8 * fe) - 1;
      gn(this, d, m, fe, fn, 0);
    }
    let yt = 1, Ct = 0;
    for (this[m] = d & 255; ++Ct < fe && (yt *= 256); )
      this[m + Ct] = d / yt & 255;
    return m + fe;
  }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(d, m, fe, dt) {
    if (d = +d, m = m >>> 0, fe = fe >>> 0, !dt) {
      const fn = Math.pow(2, 8 * fe) - 1;
      gn(this, d, m, fe, fn, 0);
    }
    let yt = fe - 1, Ct = 1;
    for (this[m + yt] = d & 255; --yt >= 0 && (Ct *= 256); )
      this[m + yt] = d / Ct & 255;
    return m + fe;
  }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 1, 255, 0), this[m] = d & 255, m + 1;
  }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 2, 65535, 0), this[m] = d & 255, this[m + 1] = d >>> 8, m + 2;
  }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 2, 65535, 0), this[m] = d >>> 8, this[m + 1] = d & 255, m + 2;
  }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 4, 4294967295, 0), this[m + 3] = d >>> 24, this[m + 2] = d >>> 16, this[m + 1] = d >>> 8, this[m] = d & 255, m + 4;
  }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 4, 4294967295, 0), this[m] = d >>> 24, this[m + 1] = d >>> 16, this[m + 2] = d >>> 8, this[m + 3] = d & 255, m + 4;
  };
  function xn(O, d, m, fe, dt) {
    jn(d, fe, dt, O, m, 7);
    let yt = Number(d & BigInt(4294967295));
    O[m++] = yt, yt = yt >> 8, O[m++] = yt, yt = yt >> 8, O[m++] = yt, yt = yt >> 8, O[m++] = yt;
    let Ct = Number(d >> BigInt(32) & BigInt(4294967295));
    return O[m++] = Ct, Ct = Ct >> 8, O[m++] = Ct, Ct = Ct >> 8, O[m++] = Ct, Ct = Ct >> 8, O[m++] = Ct, m;
  }
  function Wn(O, d, m, fe, dt) {
    jn(d, fe, dt, O, m, 7);
    let yt = Number(d & BigInt(4294967295));
    O[m + 7] = yt, yt = yt >> 8, O[m + 6] = yt, yt = yt >> 8, O[m + 5] = yt, yt = yt >> 8, O[m + 4] = yt;
    let Ct = Number(d >> BigInt(32) & BigInt(4294967295));
    return O[m + 3] = Ct, Ct = Ct >> 8, O[m + 2] = Ct, Ct = Ct >> 8, O[m + 1] = Ct, Ct = Ct >> 8, O[m] = Ct, m + 8;
  }
  a.prototype.writeBigUInt64LE = dn(function(d, m = 0) {
    return xn(this, d, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), a.prototype.writeBigUInt64BE = dn(function(d, m = 0) {
    return Wn(this, d, m, BigInt(0), BigInt("0xffffffffffffffff"));
  }), a.prototype.writeIntLE = function(d, m, fe, dt) {
    if (d = +d, m = m >>> 0, !dt) {
      const wn = Math.pow(2, 8 * fe - 1);
      gn(this, d, m, fe, wn - 1, -wn);
    }
    let yt = 0, Ct = 1, fn = 0;
    for (this[m] = d & 255; ++yt < fe && (Ct *= 256); )
      d < 0 && fn === 0 && this[m + yt - 1] !== 0 && (fn = 1), this[m + yt] = (d / Ct >> 0) - fn & 255;
    return m + fe;
  }, a.prototype.writeIntBE = function(d, m, fe, dt) {
    if (d = +d, m = m >>> 0, !dt) {
      const wn = Math.pow(2, 8 * fe - 1);
      gn(this, d, m, fe, wn - 1, -wn);
    }
    let yt = fe - 1, Ct = 1, fn = 0;
    for (this[m + yt] = d & 255; --yt >= 0 && (Ct *= 256); )
      d < 0 && fn === 0 && this[m + yt + 1] !== 0 && (fn = 1), this[m + yt] = (d / Ct >> 0) - fn & 255;
    return m + fe;
  }, a.prototype.writeInt8 = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 1, 127, -128), d < 0 && (d = 255 + d + 1), this[m] = d & 255, m + 1;
  }, a.prototype.writeInt16LE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 2, 32767, -32768), this[m] = d & 255, this[m + 1] = d >>> 8, m + 2;
  }, a.prototype.writeInt16BE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 2, 32767, -32768), this[m] = d >>> 8, this[m + 1] = d & 255, m + 2;
  }, a.prototype.writeInt32LE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 4, 2147483647, -2147483648), this[m] = d & 255, this[m + 1] = d >>> 8, this[m + 2] = d >>> 16, this[m + 3] = d >>> 24, m + 4;
  }, a.prototype.writeInt32BE = function(d, m, fe) {
    return d = +d, m = m >>> 0, fe || gn(this, d, m, 4, 2147483647, -2147483648), d < 0 && (d = 4294967295 + d + 1), this[m] = d >>> 24, this[m + 1] = d >>> 16, this[m + 2] = d >>> 8, this[m + 3] = d & 255, m + 4;
  }, a.prototype.writeBigInt64LE = dn(function(d, m = 0) {
    return xn(this, d, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), a.prototype.writeBigInt64BE = dn(function(d, m = 0) {
    return Wn(this, d, m, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Nn(O, d, m, fe, dt, yt) {
    if (m + fe > O.length)
      throw new RangeError("Index out of range");
    if (m < 0)
      throw new RangeError("Index out of range");
  }
  function Ln(O, d, m, fe, dt) {
    return d = +d, m = m >>> 0, dt || Nn(O, d, m, 4), n.write(O, d, m, fe, 23, 4), m + 4;
  }
  a.prototype.writeFloatLE = function(d, m, fe) {
    return Ln(this, d, m, !0, fe);
  }, a.prototype.writeFloatBE = function(d, m, fe) {
    return Ln(this, d, m, !1, fe);
  };
  function Bn(O, d, m, fe, dt) {
    return d = +d, m = m >>> 0, dt || Nn(O, d, m, 8), n.write(O, d, m, fe, 52, 8), m + 8;
  }
  a.prototype.writeDoubleLE = function(d, m, fe) {
    return Bn(this, d, m, !0, fe);
  }, a.prototype.writeDoubleBE = function(d, m, fe) {
    return Bn(this, d, m, !1, fe);
  }, a.prototype.copy = function(d, m, fe, dt) {
    if (!a.isBuffer(d))
      throw new TypeError("argument should be a Buffer");
    if (fe || (fe = 0), !dt && dt !== 0 && (dt = this.length), m >= d.length && (m = d.length), m || (m = 0), dt > 0 && dt < fe && (dt = fe), dt === fe || d.length === 0 || this.length === 0)
      return 0;
    if (m < 0)
      throw new RangeError("targetStart out of bounds");
    if (fe < 0 || fe >= this.length)
      throw new RangeError("Index out of range");
    if (dt < 0)
      throw new RangeError("sourceEnd out of bounds");
    dt > this.length && (dt = this.length), d.length - m < dt - fe && (dt = d.length - m + fe);
    const yt = dt - fe;
    return this === d && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(m, fe, dt) : Uint8Array.prototype.set.call(
      d,
      this.subarray(fe, dt),
      m
    ), yt;
  }, a.prototype.fill = function(d, m, fe, dt) {
    if (typeof d == "string") {
      if (typeof m == "string" ? (dt = m, m = 0, fe = this.length) : typeof fe == "string" && (dt = fe, fe = this.length), dt !== void 0 && typeof dt != "string")
        throw new TypeError("encoding must be a string");
      if (typeof dt == "string" && !a.isEncoding(dt))
        throw new TypeError("Unknown encoding: " + dt);
      if (d.length === 1) {
        const Ct = d.charCodeAt(0);
        (dt === "utf8" && Ct < 128 || dt === "latin1") && (d = Ct);
      }
    } else
      typeof d == "number" ? d = d & 255 : typeof d == "boolean" && (d = Number(d));
    if (m < 0 || this.length < m || this.length < fe)
      throw new RangeError("Out of range index");
    if (fe <= m)
      return this;
    m = m >>> 0, fe = fe === void 0 ? this.length : fe >>> 0, d || (d = 0);
    let yt;
    if (typeof d == "number")
      for (yt = m; yt < fe; ++yt)
        this[yt] = d;
    else {
      const Ct = a.isBuffer(d) ? d : a.from(d, dt), fn = Ct.length;
      if (fn === 0)
        throw new TypeError('The value "' + d + '" is invalid for argument "value"');
      for (yt = 0; yt < fe - m; ++yt)
        this[yt + m] = Ct[yt % fn];
    }
    return this;
  };
  const An = {};
  function qn(O, d, m) {
    An[O] = class extends m {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: d.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${O}]`, this.stack, delete this.name;
      }
      get code() {
        return O;
      }
      set code(dt) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: dt,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${O}]: ${this.message}`;
      }
    };
  }
  qn(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(O) {
      return O ? `${O} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), qn(
    "ERR_INVALID_ARG_TYPE",
    function(O, d) {
      return `The "${O}" argument must be of type number. Received type ${typeof d}`;
    },
    TypeError
  ), qn(
    "ERR_OUT_OF_RANGE",
    function(O, d, m) {
      let fe = `The value of "${O}" is out of range.`, dt = m;
      return Number.isInteger(m) && Math.abs(m) > 2 ** 32 ? dt = Hn(String(m)) : typeof m == "bigint" && (dt = String(m), (m > BigInt(2) ** BigInt(32) || m < -(BigInt(2) ** BigInt(32))) && (dt = Hn(dt)), dt += "n"), fe += ` It must be ${d}. Received ${dt}`, fe;
    },
    RangeError
  );
  function Hn(O) {
    let d = "", m = O.length;
    const fe = O[0] === "-" ? 1 : 0;
    for (; m >= fe + 4; m -= 3)
      d = `_${O.slice(m - 3, m)}${d}`;
    return `${O.slice(0, m)}${d}`;
  }
  function Kn(O, d, m) {
    In(d, "offset"), (O[d] === void 0 || O[d + m] === void 0) && Mn(d, O.length - (m + 1));
  }
  function jn(O, d, m, fe, dt, yt) {
    if (O > m || O < d) {
      const Ct = typeof d == "bigint" ? "n" : "";
      let fn;
      throw yt > 3 ? d === 0 || d === BigInt(0) ? fn = `>= 0${Ct} and < 2${Ct} ** ${(yt + 1) * 8}${Ct}` : fn = `>= -(2${Ct} ** ${(yt + 1) * 8 - 1}${Ct}) and < 2 ** ${(yt + 1) * 8 - 1}${Ct}` : fn = `>= ${d}${Ct} and <= ${m}${Ct}`, new An.ERR_OUT_OF_RANGE("value", fn, O);
    }
    Kn(fe, dt, yt);
  }
  function In(O, d) {
    if (typeof O != "number")
      throw new An.ERR_INVALID_ARG_TYPE(d, "number", O);
  }
  function Mn(O, d, m) {
    throw Math.floor(O) !== O ? (In(O, m), new An.ERR_OUT_OF_RANGE(m || "offset", "an integer", O)) : d < 0 ? new An.ERR_BUFFER_OUT_OF_BOUNDS() : new An.ERR_OUT_OF_RANGE(
      m || "offset",
      `>= ${m ? 1 : 0} and <= ${d}`,
      O
    );
  }
  const Jn = /[^+/0-9A-Za-z-_]/g;
  function Gn(O) {
    if (O = O.split("=")[0], O = O.trim().replace(Jn, ""), O.length < 2)
      return "";
    for (; O.length % 4 !== 0; )
      O = O + "=";
    return O;
  }
  function Un(O, d) {
    d = d || 1 / 0;
    let m;
    const fe = O.length;
    let dt = null;
    const yt = [];
    for (let Ct = 0; Ct < fe; ++Ct) {
      if (m = O.charCodeAt(Ct), m > 55295 && m < 57344) {
        if (!dt) {
          if (m > 56319) {
            (d -= 3) > -1 && yt.push(239, 191, 189);
            continue;
          } else if (Ct + 1 === fe) {
            (d -= 3) > -1 && yt.push(239, 191, 189);
            continue;
          }
          dt = m;
          continue;
        }
        if (m < 56320) {
          (d -= 3) > -1 && yt.push(239, 191, 189), dt = m;
          continue;
        }
        m = (dt - 55296 << 10 | m - 56320) + 65536;
      } else
        dt && (d -= 3) > -1 && yt.push(239, 191, 189);
      if (dt = null, m < 128) {
        if ((d -= 1) < 0)
          break;
        yt.push(m);
      } else if (m < 2048) {
        if ((d -= 2) < 0)
          break;
        yt.push(
          m >> 6 | 192,
          m & 63 | 128
        );
      } else if (m < 65536) {
        if ((d -= 3) < 0)
          break;
        yt.push(
          m >> 12 | 224,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else if (m < 1114112) {
        if ((d -= 4) < 0)
          break;
        yt.push(
          m >> 18 | 240,
          m >> 12 & 63 | 128,
          m >> 6 & 63 | 128,
          m & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return yt;
  }
  function Vn(O) {
    const d = [];
    for (let m = 0; m < O.length; ++m)
      d.push(O.charCodeAt(m) & 255);
    return d;
  }
  function Zn(O, d) {
    let m, fe, dt;
    const yt = [];
    for (let Ct = 0; Ct < O.length && !((d -= 2) < 0); ++Ct)
      m = O.charCodeAt(Ct), fe = m >> 8, dt = m % 256, yt.push(dt), yt.push(fe);
    return yt;
  }
  function zn(O) {
    return t.toByteArray(Gn(O));
  }
  function Fn(O, d, m, fe) {
    let dt;
    for (dt = 0; dt < fe && !(dt + m >= d.length || dt >= O.length); ++dt)
      d[dt + m] = O[dt];
    return dt;
  }
  function Sn(O, d) {
    return O instanceof d || O != null && O.constructor != null && O.constructor.name != null && O.constructor.name === d.name;
  }
  function Cn(O) {
    return O !== O;
  }
  const Yn = function() {
    const O = "0123456789abcdef", d = new Array(256);
    for (let m = 0; m < 16; ++m) {
      const fe = m * 16;
      for (let dt = 0; dt < 16; ++dt)
        d[fe + dt] = O[m] + O[dt];
    }
    return d;
  }();
  function dn(O) {
    return typeof BigInt > "u" ? mn : O;
  }
  function mn() {
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
  const c = e.length % 3;
  for (let a = 0; a < e.length; ) {
    if ((n = e.charCodeAt(a++)) > 255 || (r = e.charCodeAt(a++)) > 255 || (s = e.charCodeAt(a++)) > 255)
      throw new TypeError("invalid character found");
    t = n << 16 | r << 8 | s, o += b64chs[t >> 18 & 63] + b64chs[t >> 12 & 63] + b64chs[t >> 6 & 63] + b64chs[t & 63];
  }
  return c ? o.slice(0, c - 3) + "===".substring(c) : o;
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
  const s = Object.entries(r).map(([p, f]) => `${p}="${f}"`).join(" "), o = {
    id: "content",
    "data-stream": encode$1(e, !0)
  }, c = Object.entries(o).map(([p, f]) => `${p}="${f}"`).join(" "), a = escape(
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
    `<pre ${c}>
${a}
</pre>`,
    "</jupyter-xterm-output>",
    "</div>"
  ].join(`
`);
}
const Rn = class Rn {
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
    return this.text = this.text.replaceAll(Rn.REGEXP.mark, "\\$1"), this;
  }
  /**
   * 解析控制字符
   * @param src 原字符串
   */
  parseControlChars(t = "") {
    const n = [...t], r = this.text.replaceAll(`\r
`, `
`), s = r.length;
    let o = n.length, c = t.lastIndexOf(`
`) + 1;
    for (let a = 0; a < s; ++a) {
      const p = r[a];
      switch (p) {
        case "\b":
          o > c && o--;
          break;
        case "\r":
          o = c;
          break;
        case `
`:
          c = o + 1;
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
    const n = t ? Rn.REGEXP.escaped.richtext : Rn.REGEXP.richtext, r = {
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
    const c = () => {
      s.ground = "", s.mode = 0, s.color = "";
    }, a = () => {
      c(), r.strong = !1, r.em = !1, r.s = !1, r.u = !1, o = {};
    };
    return this.text = this.text.replaceAll(/\x1bc/g, "").replaceAll(/\x1b\\?\[\\?\?\d+[lh]/g, "").replaceAll(/\x1b\\?\[\d*(\\?;\d+)*[a-ln-zA-Z]/g, "").replaceAll(
      n,
      (p, f, u, y, S) => {
        let k = "";
        const w = f.replaceAll("\\;", ";").split(";");
        for (const wt of w) {
          const ht = parseInt(wt) || 0;
          if (s.mode) {
            if (ht >= 0 && ht <= 255)
              switch (s.mode) {
                case 2:
                  switch (s.color.startsWith("#") || (s.color = "#"), s.color.length) {
                    case 1:
                    case 3:
                      s.color += ht.toString(16).toUpperCase().padStart(2, "0");
                      continue;
                    case 5:
                      s.color += ht.toString(16).toUpperCase().padStart(2, "0"), s.ground && (o[s.ground] = s.color);
                      break;
                  }
                  break;
                case 5:
                  s.color = `var(--custom-jupyter-256-color-${ht.toString().padStart(3, "0")})`, s.ground && (o[s.ground] = s.color);
                  break;
              }
            c();
          } else
            switch (ht) {
              case 0:
                a();
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
                let N;
                const Ue = ht / 10 | 0, Et = ht % 10;
                switch (Ue) {
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
                    N = "color";
                    break;
                  case 4:
                  case 10:
                    N = "background-color";
                    break;
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                  default:
                    continue;
                }
                switch (Ue) {
                  case 3:
                  case 4:
                    switch (Et) {
                      case 0:
                        o[N] = "var(--custom-jupyter-ansi-color-black)";
                        break;
                      case 1:
                        o[N] = "var(--custom-jupyter-ansi-color-red)";
                        break;
                      case 2:
                        o[N] = "var(--custom-jupyter-ansi-color-green)";
                        break;
                      case 3:
                        o[N] = "var(--custom-jupyter-ansi-color-yellow)";
                        break;
                      case 4:
                        o[N] = "var(--custom-jupyter-ansi-color-blue)";
                        break;
                      case 5:
                        o[N] = "var(--custom-jupyter-ansi-color-magenta)";
                        break;
                      case 6:
                        o[N] = "var(--custom-jupyter-ansi-color-cyan)";
                        break;
                      case 7:
                        o[N] = "var(--custom-jupyter-ansi-color-white)";
                        break;
                      case 8:
                        s.ground = N;
                        continue;
                      case 9:
                      default:
                        delete o[N];
                        break;
                    }
                    continue;
                  case 9:
                  case 10:
                    switch (Et) {
                      case 0:
                        o[N] = "var(--custom-jupyter-ansi-color-black-intense)";
                        break;
                      case 1:
                        o[N] = "var(--custom-jupyter-ansi-color-red-intense)";
                        break;
                      case 2:
                        o[N] = "var(--custom-jupyter-ansi-color-green-intense)";
                        break;
                      case 3:
                        o[N] = "var(--custom-jupyter-ansi-color-yellow-intense)";
                        break;
                      case 4:
                        o[N] = "var(--custom-jupyter-ansi-color-blue-intense)";
                        break;
                      case 5:
                        o[N] = "var(--custom-jupyter-ansi-color-magenta-intense)";
                        break;
                      case 6:
                        o[N] = "var(--custom-jupyter-ansi-color-cyan-intense)";
                        break;
                      case 7:
                        o[N] = "var(--custom-jupyter-ansi-color-white-intense)";
                        break;
                      case 8:
                        s.ground = N;
                        continue;
                      case 9:
                      default:
                        delete o[N];
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
        const D = [];
        r.strong && D.push("strong"), r.em && D.push("em"), r.s && D.push("s"), r.u && D.push("u"), isEmptyObject(o) || D.push("text");
        const B = D.length > 0 ? `<span data-type="${D.join(" ")}">` : "", St = D.length > 0 ? "</span>" : "";
        return isEmptyObject(o) || (k = createIAL({ style: createStyle(o) })), u.replaceAll(`\r
`, `
`).replaceAll(/\n{2,}/g, `

`).split(`

`).map(
          (wt) => Rn.ZWS + wt.split(`
`).map((ht) => ht.length > 0 ? (D.length > 0 && t && (ht = ht.replaceAll(Rn.REGEXP.escaped.mark, "$1")), `${B}${ht}${St}${k}`) : "").join(`
`)
        ).join(`

`);
      }
    ), this;
  }
  /* 移除控制台 ANSI 转义序列(保留 \b, \r) */
  removeCmdControlChars() {
    return this.text = this.text.replaceAll(Rn.REGEXP.ANSIesc, ""), this;
  }
  /**
   * 移除控制台 ANSI 转义序列
   * @see {@link https://www.npmjs.com/package/strip-ansi}
   */
  stripAnsi() {
    return this.text = stripAnsi(this.text), this;
  }
};
vn(Rn, "ZWS", "​"), // 零宽空格
vn(Rn, "REGEXP", {
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
let Output = Rn;
function parseText(e = "", t, n) {
  const r = new Output(e);
  return t.xterm ? r.buildXtermElement(n) : (t.escaped && r.escapeMark(), t.cntrl ? r.parseCmdControlChars(t.escaped) : r.removeCmdControlChars()), r.toString();
}
async function parseData(e, t, n, r, s = !1) {
  let o;
  const c = new PriorityQueue();
  for (const [p, f] of Object.entries(n)) {
    if (Array.isArray(f) && f.length === 0)
      continue;
    const u = p.split(";")[0], y = u.split("/")[0], S = u.split("/")[1], k = S.split("+")[0];
    S.split("+")[1];
    const w = Array.isArray(f) ? f.join(`
`) : f;
    switch (y) {
      case "text":
        const D = Array.isArray(w) ? w.join(`

`) : w;
        switch (S) {
          case "plain":
            c.enqueue(parseText(D, t), 0);
            break;
          case "html":
            c.enqueue(`<div>${D.replaceAll(/\n+/g, `
`)}</div>`, 1);
            break;
          case "markdown":
            c.enqueue(D, 1);
            break;
          default:
            c.enqueue(`\`\`\`${k}
${D}
\`\`\``, 2);
            break;
        }
        break;
      case "image": {
        switch (S) {
          case "svg+xml":
            o = btoa(w);
            break;
          default:
            o = w.split(`
`)[0];
            break;
        }
        const B = n["text/plain"], St = Array.isArray(B) ? B.join(" ") : B, wt = `jupyter-output.${k}`, ht = base64ToFile(o, p, wt);
        if (ht) {
          const Ue = (await e.upload({ files: [ht] })).data.succMap[wt], Et = r != null && r.needs_background ? createIAL({
            style: createStyle({
              background: r.needs_background === "light" ? "white" : "black"
            })
          }) : "";
          Ue && c.enqueue(`![${wt}](${Ue}${isString(St) ? ` "${St.replaceAll('"', "&quot;")}"` : ""})${Et}`, 3);
        }
        break;
      }
      case "audio": {
        switch (S) {
          default:
            o = w.split(`
`)[0];
            break;
        }
        const B = `jupyter-output.${k}`, St = base64ToFile(o, p, B);
        if (St) {
          const ht = (await e.upload({ files: [St] })).data.succMap[B];
          ht && c.enqueue(`<audio controls="controls" src="${ht}" data-src="${ht}"/>`, 3);
        }
        break;
      }
      case "video":
        {
          switch (S) {
            default:
              o = w.split(`
`)[0];
              break;
          }
          const B = `jupyter-output.${k}`, St = base64ToFile(o, p, B);
          if (St) {
            const ht = (await e.upload({ files: [St] })).data.succMap[B];
            ht && c.enqueue(`<video controls="controls" src="${ht}" data-src="${ht}"/>`, 3);
          }
        }
        break;
      case "application":
        switch (S) {
          case "json":
            c.enqueue(`\`\`\`json
${JSON.stringify(w, void 0, 4)}
\`\`\``, 4);
            break;
          default:
            c.enqueue(parseText(`[${p}]`, t), 4);
            break;
        }
        break;
      default:
        c.enqueue(parseText(`[${p}]`, t), 4);
        break;
    }
  }
  const a = c.items.map((p) => p.value);
  return s ? a : a.join(`

`);
}
class IpynbImport {
  // 导入的文档块属性
  constructor(t, n) {
    vn(this, "ipynb");
    // 文件内容
    vn(this, "cells");
    // 内容块
    vn(this, "language");
    // 单元格语言
    vn(this, "metadata");
    // notebook 元数据
    vn(this, "nbformat");
    // 缩进长度
    vn(this, "nbformat_minor");
    // 次要缩进长度
    vn(this, "kramdowns");
    // 导入的 kramdown 字符串数组
    vn(this, "attributes");
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
    var r, s, o, c, a, p;
    this.language = ((r = this.metadata.kernelspec) == null ? void 0 : r.language) ?? ((s = this.metadata.language_info) == null ? void 0 : s.name) ?? ((o = this.metadata.language_info) == null ? void 0 : o.nbconvert_exporter), this.attributes[CONSTANTS.attrs.kernel.language] = this.language;
    const t = ((c = this.metadata.kernelspec) == null ? void 0 : c.name) ?? this.metadata.kernel_info.name;
    this.attributes[CONSTANTS.attrs.kernel.name] = t;
    const n = ((a = this.metadata.kernelspec) == null ? void 0 : a.display_name) ?? ((p = this.metadata.kernelspec) == null ? void 0 : p.name) ?? this.metadata.kernel_info.name;
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
      let o = -1, c = 7;
      if (Array.isArray(t.source)) {
        for (let a = 0; a < t.source.length; ++a) {
          const p = t.source[a];
          if (/^#{1,6}\s/.test(p)) {
            for (let f = 0; f < p.length && f < 6; ++f)
              if (p.charAt(f) !== "#") {
                f + 1 < c && (c = f + 1, o = a);
                break;
              }
          }
        }
        o >= 0 && 1 <= c && c <= 6 && (t.source[o] = `${t.source[o].trim()}
${createIAL({ fold: "1" })}
`);
      }
    }
    var n = this.parseSource(t.source);
    const r = await this.parseAttachments(t.attachments);
    for (const [o, c] of Object.entries(r))
      n = n.replace(`attachment:${o}`, c);
    return n;
  }
  /**
   * 解析 code 块
   * REF: https://nbformat.readthedocs.io/en/latest/format_description.html#code-cells
   */
  async parseCode(t) {
    var w, D, B, St, wt, ht, N, Ue, Et;
    const n = [], r = ((w = t.execution_count) == null ? void 0 : w.toString()) ?? "*", s = (B = (D = t.metadata) == null ? void 0 : D.jupyter) == null ? void 0 : B.source_hidden, o = (wt = (St = t.metadata) == null ? void 0 : St.jupyter) == null ? void 0 : wt.outputs_hidden, c = this.id, a = this.id, p = (ht = t.metadata.execution) == null ? void 0 : ht["iopub.execute_input"], f = (N = t.metadata.execution) == null ? void 0 : N["iopub.status.busy"], u = (Ue = t.metadata.execution) == null ? void 0 : Ue["iopub.status.idle"], y = (Et = t.metadata.execution) == null ? void 0 : Et["shell.execute_reply"], S = {
      id: c,
      [CONSTANTS.attrs.code.index]: r,
      [CONSTANTS.attrs.code.output]: a,
      [CONSTANTS.attrs.code.type.key]: CONSTANTS.attrs.code.type.value,
      fold: s ? "1" : null,
      [CONSTANTS.attrs.code.execute_input]: p,
      [CONSTANTS.attrs.code.execute_reply]: f,
      [CONSTANTS.attrs.code.busy]: u,
      [CONSTANTS.attrs.code.idle]: y
    }, k = {
      id: a,
      [CONSTANTS.attrs.output.index]: r,
      [CONSTANTS.attrs.output.code]: c,
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
      "",
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
    var c, a, p;
    var n, r;
    [n, r] = (((c = t.metadata) == null ? void 0 : c.raw_mimetype) ?? "/").split("/");
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
    return (p = (a = t.metadata) == null ? void 0 : a.jupyter) != null && p.source_hidden && o.push(createIAL({ fold: "1" })), o.join(`
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
        for (const [o, c] of Object.entries(s)) {
          const a = Array.isArray(c) ? c[0] : c, p = base64ToFile(a, o, r);
          if (p) {
            const u = (await this.client.upload({ files: [p] })).data.succMap[r];
            n.set(r, u);
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
          const c = parseText(
            this.parseSource(o.text),
            this.config.jupyter.import.parser
          );
          switch (o.name) {
            case "stdout":
              n.push(c);
              break;
            case "stderr":
              n.push("{{{row"), n.push(c), n.push("}}}"), n.push(createIAL({ style: CONSTANTS.styles.warning }));
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
  function t(gt, kt, mt = 0, ft = -1) {
    let bt = gt.length;
    if (bt === 0)
      return -1;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At;
    ft < mt ? At = ft + 1 + (bt - mt) : At = ft - mt + 1;
    for (let un = 0; un < At; ++un) {
      let pn = (mt + un) % bt;
      if (gt[pn] === kt)
        return pn;
    }
    return -1;
  }
  e.firstIndexOf = t;
  function n(gt, kt, mt = -1, ft = 0) {
    let bt = gt.length;
    if (bt === 0)
      return -1;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At;
    mt < ft ? At = mt + 1 + (bt - ft) : At = mt - ft + 1;
    for (let un = 0; un < At; ++un) {
      let pn = (mt - un + bt) % bt;
      if (gt[pn] === kt)
        return pn;
    }
    return -1;
  }
  e.lastIndexOf = n;
  function r(gt, kt, mt = 0, ft = -1) {
    let bt = gt.length;
    if (bt === 0)
      return -1;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At;
    ft < mt ? At = ft + 1 + (bt - mt) : At = ft - mt + 1;
    for (let un = 0; un < At; ++un) {
      let pn = (mt + un) % bt;
      if (kt(gt[pn], pn))
        return pn;
    }
    return -1;
  }
  e.findFirstIndex = r;
  function s(gt, kt, mt = -1, ft = 0) {
    let bt = gt.length;
    if (bt === 0)
      return -1;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At;
    mt < ft ? At = mt + 1 + (bt - ft) : At = mt - ft + 1;
    for (let un = 0; un < At; ++un) {
      let pn = (mt - un + bt) % bt;
      if (kt(gt[pn], pn))
        return pn;
    }
    return -1;
  }
  e.findLastIndex = s;
  function o(gt, kt, mt = 0, ft = -1) {
    let bt = r(gt, kt, mt, ft);
    return bt !== -1 ? gt[bt] : void 0;
  }
  e.findFirstValue = o;
  function c(gt, kt, mt = -1, ft = 0) {
    let bt = s(gt, kt, mt, ft);
    return bt !== -1 ? gt[bt] : void 0;
  }
  e.findLastValue = c;
  function a(gt, kt, mt, ft = 0, bt = -1) {
    let At = gt.length;
    if (At === 0)
      return 0;
    ft < 0 ? ft = Math.max(0, ft + At) : ft = Math.min(ft, At - 1), bt < 0 ? bt = Math.max(0, bt + At) : bt = Math.min(bt, At - 1);
    let un = ft, pn = bt - ft + 1;
    for (; pn > 0; ) {
      let Tn = pn >> 1, On = un + Tn;
      mt(gt[On], kt) < 0 ? (un = On + 1, pn -= Tn + 1) : pn = Tn;
    }
    return un;
  }
  e.lowerBound = a;
  function p(gt, kt, mt, ft = 0, bt = -1) {
    let At = gt.length;
    if (At === 0)
      return 0;
    ft < 0 ? ft = Math.max(0, ft + At) : ft = Math.min(ft, At - 1), bt < 0 ? bt = Math.max(0, bt + At) : bt = Math.min(bt, At - 1);
    let un = ft, pn = bt - ft + 1;
    for (; pn > 0; ) {
      let Tn = pn >> 1, On = un + Tn;
      mt(gt[On], kt) > 0 ? pn = Tn : (un = On + 1, pn -= Tn + 1);
    }
    return un;
  }
  e.upperBound = p;
  function f(gt, kt, mt) {
    if (gt === kt)
      return !0;
    if (gt.length !== kt.length)
      return !1;
    for (let ft = 0, bt = gt.length; ft < bt; ++ft)
      if (mt ? !mt(gt[ft], kt[ft]) : gt[ft] !== kt[ft])
        return !1;
    return !0;
  }
  e.shallowEqual = f;
  function u(gt, kt = {}) {
    let { start: mt, stop: ft, step: bt } = kt;
    if (bt === void 0 && (bt = 1), bt === 0)
      throw new Error("Slice `step` cannot be zero.");
    let At = gt.length;
    mt === void 0 ? mt = bt < 0 ? At - 1 : 0 : mt < 0 ? mt = Math.max(mt + At, bt < 0 ? -1 : 0) : mt >= At && (mt = bt < 0 ? At - 1 : At), ft === void 0 ? ft = bt < 0 ? -1 : At : ft < 0 ? ft = Math.max(ft + At, bt < 0 ? -1 : 0) : ft >= At && (ft = bt < 0 ? At - 1 : At);
    let un;
    bt < 0 && ft >= mt || bt > 0 && mt >= ft ? un = 0 : bt < 0 ? un = Math.floor((ft - mt + 1) / bt + 1) : un = Math.floor((ft - mt - 1) / bt + 1);
    let pn = [];
    for (let Tn = 0; Tn < un; ++Tn)
      pn[Tn] = gt[mt + Tn * bt];
    return pn;
  }
  e.slice = u;
  function y(gt, kt, mt) {
    let ft = gt.length;
    if (ft <= 1 || (kt < 0 ? kt = Math.max(0, kt + ft) : kt = Math.min(kt, ft - 1), mt < 0 ? mt = Math.max(0, mt + ft) : mt = Math.min(mt, ft - 1), kt === mt))
      return;
    let bt = gt[kt], At = kt < mt ? 1 : -1;
    for (let un = kt; un !== mt; un += At)
      gt[un] = gt[un + At];
    gt[mt] = bt;
  }
  e.move = y;
  function S(gt, kt = 0, mt = -1) {
    let ft = gt.length;
    if (!(ft <= 1))
      for (kt < 0 ? kt = Math.max(0, kt + ft) : kt = Math.min(kt, ft - 1), mt < 0 ? mt = Math.max(0, mt + ft) : mt = Math.min(mt, ft - 1); kt < mt; ) {
        let bt = gt[kt], At = gt[mt];
        gt[kt++] = At, gt[mt--] = bt;
      }
  }
  e.reverse = S;
  function k(gt, kt, mt = 0, ft = -1) {
    let bt = gt.length;
    if (bt <= 1 || (mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1), mt >= ft))
      return;
    let At = ft - mt + 1;
    if (kt > 0 ? kt = kt % At : kt < 0 && (kt = (kt % At + At) % At), kt === 0)
      return;
    let un = mt + kt;
    S(gt, mt, un - 1), S(gt, un, ft), S(gt, mt, ft);
  }
  e.rotate = k;
  function w(gt, kt, mt = 0, ft = -1) {
    let bt = gt.length;
    if (bt === 0)
      return;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At;
    ft < mt ? At = ft + 1 + (bt - mt) : At = ft - mt + 1;
    for (let un = 0; un < At; ++un)
      gt[(mt + un) % bt] = kt;
  }
  e.fill = w;
  function D(gt, kt, mt) {
    let ft = gt.length;
    kt < 0 ? kt = Math.max(0, kt + ft) : kt = Math.min(kt, ft);
    for (let bt = ft; bt > kt; --bt)
      gt[bt] = gt[bt - 1];
    gt[kt] = mt;
  }
  e.insert = D;
  function B(gt, kt) {
    let mt = gt.length;
    if (kt < 0 && (kt += mt), kt < 0 || kt >= mt)
      return;
    let ft = gt[kt];
    for (let bt = kt + 1; bt < mt; ++bt)
      gt[bt - 1] = gt[bt];
    return gt.length = mt - 1, ft;
  }
  e.removeAt = B;
  function St(gt, kt, mt = 0, ft = -1) {
    let bt = t(gt, kt, mt, ft);
    return bt !== -1 && B(gt, bt), bt;
  }
  e.removeFirstOf = St;
  function wt(gt, kt, mt = -1, ft = 0) {
    let bt = n(gt, kt, mt, ft);
    return bt !== -1 && B(gt, bt), bt;
  }
  e.removeLastOf = wt;
  function ht(gt, kt, mt = 0, ft = -1) {
    let bt = gt.length;
    if (bt === 0)
      return 0;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At = 0;
    for (let un = 0; un < bt; ++un)
      mt <= ft && un >= mt && un <= ft && gt[un] === kt || ft < mt && (un <= ft || un >= mt) && gt[un] === kt ? At++ : At > 0 && (gt[un - At] = gt[un]);
    return At > 0 && (gt.length = bt - At), At;
  }
  e.removeAllOf = ht;
  function N(gt, kt, mt = 0, ft = -1) {
    let bt, At = r(gt, kt, mt, ft);
    return At !== -1 && (bt = B(gt, At)), { index: At, value: bt };
  }
  e.removeFirstWhere = N;
  function Ue(gt, kt, mt = -1, ft = 0) {
    let bt, At = s(gt, kt, mt, ft);
    return At !== -1 && (bt = B(gt, At)), { index: At, value: bt };
  }
  e.removeLastWhere = Ue;
  function Et(gt, kt, mt = 0, ft = -1) {
    let bt = gt.length;
    if (bt === 0)
      return 0;
    mt < 0 ? mt = Math.max(0, mt + bt) : mt = Math.min(mt, bt - 1), ft < 0 ? ft = Math.max(0, ft + bt) : ft = Math.min(ft, bt - 1);
    let At = 0;
    for (let un = 0; un < bt; ++un)
      mt <= ft && un >= mt && un <= ft && kt(gt[un], un) || ft < mt && (un <= ft || un >= mt) && kt(gt[un], un) ? At++ : At > 0 && (gt[un - At] = gt[un]);
    return At > 0 && (gt.length = bt - At), At;
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
  function t(c, a, p = 0) {
    let f = new Array(a.length);
    for (let u = 0, y = p, S = a.length; u < S; ++u, ++y) {
      if (y = c.indexOf(a[u], y), y === -1)
        return null;
      f[u] = y;
    }
    return f;
  }
  e.findIndices = t;
  function n(c, a, p = 0) {
    let f = t(c, a, p);
    if (!f)
      return null;
    let u = 0;
    for (let y = 0, S = f.length; y < S; ++y) {
      let k = f[y] - p;
      u += k * k;
    }
    return { score: u, indices: f };
  }
  e.matchSumOfSquares = n;
  function r(c, a, p = 0) {
    let f = t(c, a, p);
    if (!f)
      return null;
    let u = 0, y = p - 1;
    for (let S = 0, k = f.length; S < k; ++S) {
      let w = f[S];
      u += w - y - 1, y = w;
    }
    return { score: u, indices: f };
  }
  e.matchSumOfDeltas = r;
  function s(c, a, p) {
    let f = [], u = 0, y = 0, S = a.length;
    for (; u < S; ) {
      let k = a[u], w = a[u];
      for (; ++u < S && a[u] === w + 1; )
        w++;
      y < k && f.push(c.slice(y, k)), k < w + 1 && f.push(p(c.slice(k, w + 1))), y = w + 1;
    }
    return y < c.length && f.push(c.slice(y)), f;
  }
  e.highlight = s;
  function o(c, a) {
    return c < a ? -1 : c > a ? 1 : 0;
  }
  e.cmp = o;
})(StringExt || (StringExt = {}));
var JSONExt;
(function(e) {
  e.emptyObject = Object.freeze({}), e.emptyArray = Object.freeze([]);
  function t(u) {
    return u === null || typeof u == "boolean" || typeof u == "number" || typeof u == "string";
  }
  e.isPrimitive = t;
  function n(u) {
    return Array.isArray(u);
  }
  e.isArray = n;
  function r(u) {
    return !t(u) && !n(u);
  }
  e.isObject = r;
  function s(u, y) {
    if (u === y)
      return !0;
    if (t(u) || t(y))
      return !1;
    let S = n(u), k = n(y);
    return S !== k ? !1 : S && k ? c(u, y) : a(u, y);
  }
  e.deepEqual = s;
  function o(u) {
    return t(u) ? u : n(u) ? p(u) : f(u);
  }
  e.deepCopy = o;
  function c(u, y) {
    if (u === y)
      return !0;
    if (u.length !== y.length)
      return !1;
    for (let S = 0, k = u.length; S < k; ++S)
      if (!s(u[S], y[S]))
        return !1;
    return !0;
  }
  function a(u, y) {
    if (u === y)
      return !0;
    for (let S in u)
      if (u[S] !== void 0 && !(S in y))
        return !1;
    for (let S in y)
      if (y[S] !== void 0 && !(S in u))
        return !1;
    for (let S in u) {
      let k = u[S], w = y[S];
      if (!(k === void 0 && w === void 0) && (k === void 0 || w === void 0 || !s(k, w)))
        return !1;
    }
    return !0;
  }
  function p(u) {
    let y = new Array(u.length);
    for (let S = 0, k = u.length; S < k; ++S)
      y[S] = o(u[S]);
    return y;
  }
  function f(u) {
    let y = {};
    for (let S in u) {
      let k = u[S];
      k !== void 0 && (y[S] = o(k));
    }
    return y;
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
  function t(p, f) {
    Private$8.disconnectBetween(p, f);
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
  function c() {
    return Private$8.exceptionHandler;
  }
  e.getExceptionHandler = c;
  function a(p) {
    let f = Private$8.exceptionHandler;
    return Private$8.exceptionHandler = p, f;
  }
  e.setExceptionHandler = a;
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
  e.exceptionHandler = (wt) => {
    console.error(wt);
  };
  function t(wt, ht, N) {
    N = N || void 0;
    let Ue = p.get(wt.sender);
    if (Ue || (Ue = [], p.set(wt.sender, Ue)), S(Ue, wt, ht, N))
      return !1;
    let Et = N || ht, gt = f.get(Et);
    gt || (gt = [], f.set(Et, gt));
    let kt = { signal: wt, slot: ht, thisArg: N };
    return Ue.push(kt), gt.push(kt), !0;
  }
  e.connect = t;
  function n(wt, ht, N) {
    N = N || void 0;
    let Ue = p.get(wt.sender);
    if (!Ue || Ue.length === 0)
      return !1;
    let Et = S(Ue, wt, ht, N);
    if (!Et)
      return !1;
    let gt = N || ht, kt = f.get(gt);
    return Et.signal = null, w(Ue), w(kt), !0;
  }
  e.disconnect = n;
  function r(wt, ht) {
    let N = p.get(wt);
    if (!N || N.length === 0)
      return;
    let Ue = f.get(ht);
    if (!(!Ue || Ue.length === 0)) {
      for (const Et of Ue)
        Et.signal && Et.signal.sender === wt && (Et.signal = null);
      w(N), w(Ue);
    }
  }
  e.disconnectBetween = r;
  function s(wt) {
    let ht = p.get(wt);
    if (!(!ht || ht.length === 0)) {
      for (const N of ht) {
        if (!N.signal)
          continue;
        let Ue = N.thisArg || N.slot;
        N.signal = null, w(f.get(Ue));
      }
      w(ht);
    }
  }
  e.disconnectSender = s;
  function o(wt) {
    let ht = f.get(wt);
    if (!(!ht || ht.length === 0)) {
      for (const N of ht) {
        if (!N.signal)
          continue;
        let Ue = N.signal.sender;
        N.signal = null, w(p.get(Ue));
      }
      w(ht);
    }
  }
  e.disconnectReceiver = o;
  function c(wt) {
    s(wt), o(wt);
  }
  e.disconnectAll = c;
  function a(wt, ht) {
    let N = p.get(wt.sender);
    if (!(!N || N.length === 0))
      for (let Ue = 0, Et = N.length; Ue < Et; ++Ue) {
        let gt = N[Ue];
        gt.signal === wt && k(gt, ht);
      }
  }
  e.emit = a;
  const p = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set(), y = typeof requestAnimationFrame == "function" ? requestAnimationFrame : setImmediate;
  function S(wt, ht, N, Ue) {
    return find(wt, (Et) => Et.signal === ht && Et.slot === N && Et.thisArg === Ue);
  }
  function k(wt, ht) {
    let { signal: N, slot: Ue, thisArg: Et } = wt;
    try {
      Ue.call(Et, N.sender, ht);
    } catch (gt) {
      e.exceptionHandler(gt);
    }
  }
  function w(wt) {
    u.size === 0 && y(D), u.add(wt);
  }
  function D() {
    u.forEach(B), u.clear();
  }
  function B(wt) {
    ArrayExt.removeAllWhere(wt, St);
  }
  function St(wt) {
    return wt.signal === null;
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
      constructor(a) {
        this.startLine = a, this.code = "", this.endLine = -1;
      }
    }
    t.MarkdownCodeBlock = r;
    function s(c) {
      return n.indexOf(c) > -1;
    }
    t.isMarkdown = s;
    function o(c) {
      if (!c || c === "")
        return [];
      const a = c.split(`
`), p = [];
      let f = null;
      for (let u = 0; u < a.length; u++) {
        const y = a[u], S = y.indexOf(t.CODE_BLOCK_MARKER) === 0, k = f != null;
        if (!(!S && !k))
          if (k)
            f && (S ? (f.endLine = u - 1, p.push(f), f = null) : f.code += y + `
`);
          else {
            f = new r(u);
            const w = y.indexOf(t.CODE_BLOCK_MARKER), D = y.lastIndexOf(t.CODE_BLOCK_MARKER);
            w !== D && (f.code = y.substring(w + t.CODE_BLOCK_MARKER.length, D), f.endLine = u, p.push(f), f = null);
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
      function f(wt) {
        return wt === null || typeof wt == "boolean" || typeof wt == "number" || typeof wt == "string";
      }
      p.isPrimitive = f;
      function u(wt) {
        return Array.isArray(wt);
      }
      p.isArray = u;
      function y(wt) {
        return !f(wt) && !u(wt);
      }
      p.isObject = y;
      function S(wt, ht) {
        if (wt === ht)
          return !0;
        if (f(wt) || f(ht))
          return !1;
        let N = u(wt), Ue = u(ht);
        return N !== Ue ? !1 : N && Ue ? w(wt, ht) : D(wt, ht);
      }
      p.deepEqual = S;
      function k(wt) {
        return f(wt) ? wt : u(wt) ? B(wt) : St(wt);
      }
      p.deepCopy = k;
      function w(wt, ht) {
        if (wt === ht)
          return !0;
        if (wt.length !== ht.length)
          return !1;
        for (let N = 0, Ue = wt.length; N < Ue; ++N)
          if (!S(wt[N], ht[N]))
            return !1;
        return !0;
      }
      function D(wt, ht) {
        if (wt === ht)
          return !0;
        for (let N in wt)
          if (wt[N] !== void 0 && !(N in ht))
            return !1;
        for (let N in ht)
          if (ht[N] !== void 0 && !(N in wt))
            return !1;
        for (let N in wt) {
          let Ue = wt[N], Et = ht[N];
          if (!(Ue === void 0 && Et === void 0) && (Ue === void 0 || Et === void 0 || !S(Ue, Et)))
            return !1;
        }
        return !0;
      }
      function B(wt) {
        let ht = new Array(wt.length);
        for (let N = 0, Ue = wt.length; N < Ue; ++N)
          ht[N] = k(wt[N]);
        return ht;
      }
      function St(wt) {
        let ht = {};
        for (let N in wt) {
          let Ue = wt[N];
          Ue !== void 0 && (ht[N] = k(Ue));
        }
        return ht;
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
      hasData(f) {
        return this._types.indexOf(f) !== -1;
      }
      /**
       * Get the data value for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * @returns The value for the given MIME type, or `undefined` if
       *   the dataset does not contain a value for the type.
       */
      getData(f) {
        let u = this._types.indexOf(f);
        return u !== -1 ? this._values[u] : void 0;
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
      setData(f, u) {
        this.clearData(f), this._types.push(f), this._values.push(u);
      }
      /**
       * Remove the data entry for the given MIME type.
       *
       * @param mime - The MIME type of interest.
       *
       * #### Notes
       * This is a no-op if there is no entry for the given MIME type.
       */
      clearData(f) {
        let u = this._types.indexOf(f);
        u !== -1 && (this._types.splice(u, 1), this._values.splice(u, 1));
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
        this.promise = new Promise((f, u) => {
          this._resolve = f, this._reject = u;
        });
      }
      /**
       * Resolve the wrapped promise with the given value.
       *
       * @param value - The value to use for resolving the promise.
       */
      resolve(f) {
        let u = this._resolve;
        u(f);
      }
      /**
       * Reject the wrapped promise with the given value.
       *
       * @reason - The reason for rejecting the promise.
       */
      reject(f) {
        let u = this._reject;
        u(f);
      }
    }
    class o {
      /**
       * Construct a new token.
       *
       * @param name - A human readable name for the token.
       * @param description - Token purpose description for documentation.
       */
      constructor(f, u) {
        this.name = f, this.description = u ?? "", this._tokenStructuralPropertyT = null;
      }
    }
    function c(p) {
      let f = 0;
      for (let u = 0, y = p.length; u < y; ++u)
        u % 4 === 0 && (f = Math.random() * 4294967295 >>> 0), p[u] = f & 255, f >>>= 8;
    }
    n.Random = void 0, function(p) {
      p.getRandomValues = (() => {
        const f = typeof window < "u" && (window.crypto || window.msCrypto) || null;
        return f && typeof f.getRandomValues == "function" ? function(y) {
          return f.getRandomValues(y);
        } : c;
      })();
    }(n.Random || (n.Random = {}));
    function a(p) {
      const f = new Uint8Array(16), u = new Array(256);
      for (let y = 0; y < 16; ++y)
        u[y] = "0" + y.toString(16);
      for (let y = 16; y < 256; ++y)
        u[y] = y.toString(16);
      return function() {
        return p(f), f[6] = 64 | f[6] & 15, f[8] = 128 | f[8] & 63, u[f[0]] + u[f[1]] + u[f[2]] + u[f[3]] + "-" + u[f[4]] + u[f[5]] + "-" + u[f[6]] + u[f[7]] + "-" + u[f[8]] + u[f[9]] + "-" + u[f[10]] + u[f[11]] + u[f[12]] + u[f[13]] + u[f[14]] + u[f[15]];
      };
    }
    n.UUID = void 0, function(p) {
      p.uuid4 = a(n.Random.getRandomValues);
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
  typeof t.unknown == "function" && (n.unknownFn = t.unknown), typeof t.boolean == "boolean" && t.boolean ? n.allBools = !0 : [].concat(t.boolean).filter(Boolean).forEach(function(N) {
    n.bools[N] = !0;
  });
  var r = {};
  function s(N) {
    return r[N].some(function(Ue) {
      return n.bools[Ue];
    });
  }
  Object.keys(t.alias || {}).forEach(function(N) {
    r[N] = [].concat(t.alias[N]), r[N].forEach(function(Ue) {
      r[Ue] = [N].concat(r[N].filter(function(Et) {
        return Ue !== Et;
      }));
    });
  }), [].concat(t.string).filter(Boolean).forEach(function(N) {
    n.strings[N] = !0, r[N] && [].concat(r[N]).forEach(function(Ue) {
      n.strings[Ue] = !0;
    });
  });
  var o = t.default || {}, c = { _: [] };
  function a(N, Ue) {
    return n.allBools && /^--[^=]+$/.test(Ue) || n.strings[N] || n.bools[N] || r[N];
  }
  function p(N, Ue, Et) {
    for (var gt = N, kt = 0; kt < Ue.length - 1; kt++) {
      var mt = Ue[kt];
      if (isConstructorOrProto(gt, mt))
        return;
      gt[mt] === void 0 && (gt[mt] = {}), (gt[mt] === Object.prototype || gt[mt] === Number.prototype || gt[mt] === String.prototype) && (gt[mt] = {}), gt[mt] === Array.prototype && (gt[mt] = []), gt = gt[mt];
    }
    var ft = Ue[Ue.length - 1];
    isConstructorOrProto(gt, ft) || ((gt === Object.prototype || gt === Number.prototype || gt === String.prototype) && (gt = {}), gt === Array.prototype && (gt = []), gt[ft] === void 0 || n.bools[ft] || typeof gt[ft] == "boolean" ? gt[ft] = Et : Array.isArray(gt[ft]) ? gt[ft].push(Et) : gt[ft] = [gt[ft], Et]);
  }
  function f(N, Ue, Et) {
    if (!(Et && n.unknownFn && !a(N, Et) && n.unknownFn(Et) === !1)) {
      var gt = !n.strings[N] && isNumber(Ue) ? Number(Ue) : Ue;
      p(c, N.split("."), gt), (r[N] || []).forEach(function(kt) {
        p(c, kt.split("."), gt);
      });
    }
  }
  Object.keys(n.bools).forEach(function(N) {
    f(N, o[N] === void 0 ? !1 : o[N]);
  });
  var u = [];
  e.indexOf("--") !== -1 && (u = e.slice(e.indexOf("--") + 1), e = e.slice(0, e.indexOf("--")));
  for (var y = 0; y < e.length; y++) {
    var S = e[y], k, w;
    if (/^--.+=/.test(S)) {
      var D = S.match(/^--([^=]+)=([\s\S]*)$/);
      k = D[1];
      var B = D[2];
      n.bools[k] && (B = B !== "false"), f(k, B, S);
    } else if (/^--no-.+/.test(S))
      k = S.match(/^--no-(.+)/)[1], f(k, !1, S);
    else if (/^--.+/.test(S))
      k = S.match(/^--(.+)/)[1], w = e[y + 1], w !== void 0 && !/^(-|--)[^-]/.test(w) && !n.bools[k] && !n.allBools && (!r[k] || !s(k)) ? (f(k, w, S), y += 1) : /^(true|false)$/.test(w) ? (f(k, w === "true", S), y += 1) : f(k, n.strings[k] ? "" : !0, S);
    else if (/^-[^-]+/.test(S)) {
      for (var St = S.slice(1, -1).split(""), wt = !1, ht = 0; ht < St.length; ht++) {
        if (w = S.slice(ht + 2), w === "-") {
          f(St[ht], w, S);
          continue;
        }
        if (/[A-Za-z]/.test(St[ht]) && w[0] === "=") {
          f(St[ht], w.slice(1), S), wt = !0;
          break;
        }
        if (/[A-Za-z]/.test(St[ht]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(w)) {
          f(St[ht], w, S), wt = !0;
          break;
        }
        if (St[ht + 1] && St[ht + 1].match(/\W/)) {
          f(St[ht], S.slice(ht + 2), S), wt = !0;
          break;
        } else
          f(St[ht], n.strings[St[ht]] ? "" : !0, S);
      }
      k = S.slice(-1)[0], !wt && k !== "-" && (e[y + 1] && !/^(-|--)[^-]/.test(e[y + 1]) && !n.bools[k] && (!r[k] || !s(k)) ? (f(k, e[y + 1], S), y += 1) : e[y + 1] && /^(true|false)$/.test(e[y + 1]) ? (f(k, e[y + 1] === "true", S), y += 1) : f(k, n.strings[k] ? "" : !0, S));
    } else if ((!n.unknownFn || n.unknownFn(S) !== !1) && c._.push(n.strings._ || !isNumber(S) ? S : Number(S)), t.stopEarly) {
      c._.push.apply(c._, e.slice(y + 1));
      break;
    }
  }
  return Object.keys(o).forEach(function(N) {
    hasKey(c, N.split(".")) || (p(c, N.split("."), o[N]), (r[N] || []).forEach(function(Ue) {
      p(c, Ue.split("."), o[N]);
    }));
  }), t["--"] ? c["--"] = u.slice() : u.forEach(function(N) {
    c._.push(N);
  }), c;
}, url = {};
function assertPath(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
function normalizeStringPosix(e, t) {
  for (var n = "", r = 0, s = -1, o = 0, c, a = 0; a <= e.length; ++a) {
    if (a < e.length)
      c = e.charCodeAt(a);
    else {
      if (c === 47)
        break;
      c = 47;
    }
    if (c === 47) {
      if (!(s === a - 1 || o === 1))
        if (s !== a - 1 && o === 2) {
          if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var p = n.lastIndexOf("/");
              if (p !== n.length - 1) {
                p === -1 ? (n = "", r = 0) : (n = n.slice(0, p), r = n.length - 1 - n.lastIndexOf("/")), s = a, o = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", r = 0, s = a, o = 0;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", r = 2);
        } else
          n.length > 0 ? n += "/" + e.slice(s + 1, a) : n = e.slice(s + 1, a), r = a - s - 1;
      s = a, o = 0;
    } else
      c === 46 && o !== -1 ? ++o : o = -1;
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
    for (var s = t.length, o = s - r, c = 1; c < n.length && n.charCodeAt(c) === 47; ++c)
      ;
    for (var a = n.length, p = a - c, f = o < p ? o : p, u = -1, y = 0; y <= f; ++y) {
      if (y === f) {
        if (p > f) {
          if (n.charCodeAt(c + y) === 47)
            return n.slice(c + y + 1);
          if (y === 0)
            return n.slice(c + y);
        } else
          o > f && (t.charCodeAt(r + y) === 47 ? u = y : y === 0 && (u = 0));
        break;
      }
      var S = t.charCodeAt(r + y), k = n.charCodeAt(c + y);
      if (S !== k)
        break;
      S === 47 && (u = y);
    }
    var w = "";
    for (y = r + u + 1; y <= s; ++y)
      (y === s || t.charCodeAt(y) === 47) && (w.length === 0 ? w += ".." : w += "/..");
    return w.length > 0 ? w + n.slice(c + u) : (c += u, n.charCodeAt(c) === 47 && ++c, n.slice(c));
  },
  _makeLong: function(t) {
    return t;
  },
  dirname: function(t) {
    if (assertPath(t), t.length === 0)
      return ".";
    for (var n = t.charCodeAt(0), r = n === 47, s = -1, o = !0, c = t.length - 1; c >= 1; --c)
      if (n = t.charCodeAt(c), n === 47) {
        if (!o) {
          s = c;
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
    var r = 0, s = -1, o = !0, c;
    if (n !== void 0 && n.length > 0 && n.length <= t.length) {
      if (n.length === t.length && n === t)
        return "";
      var a = n.length - 1, p = -1;
      for (c = t.length - 1; c >= 0; --c) {
        var f = t.charCodeAt(c);
        if (f === 47) {
          if (!o) {
            r = c + 1;
            break;
          }
        } else
          p === -1 && (o = !1, p = c + 1), a >= 0 && (f === n.charCodeAt(a) ? --a === -1 && (s = c) : (a = -1, s = p));
      }
      return r === s ? s = p : s === -1 && (s = t.length), t.slice(r, s);
    } else {
      for (c = t.length - 1; c >= 0; --c)
        if (t.charCodeAt(c) === 47) {
          if (!o) {
            r = c + 1;
            break;
          }
        } else
          s === -1 && (o = !1, s = c + 1);
      return s === -1 ? "" : t.slice(r, s);
    }
  },
  extname: function(t) {
    assertPath(t);
    for (var n = -1, r = 0, s = -1, o = !0, c = 0, a = t.length - 1; a >= 0; --a) {
      var p = t.charCodeAt(a);
      if (p === 47) {
        if (!o) {
          r = a + 1;
          break;
        }
        continue;
      }
      s === -1 && (o = !1, s = a + 1), p === 46 ? n === -1 ? n = a : c !== 1 && (c = 1) : n !== -1 && (c = -1);
    }
    return n === -1 || s === -1 || // We saw a non-dot character immediately before the dot
    c === 0 || // The (right-most) trimmed path component is exactly '..'
    c === 1 && n === s - 1 && n === r + 1 ? "" : t.slice(n, s);
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
    for (var c = -1, a = 0, p = -1, f = !0, u = t.length - 1, y = 0; u >= o; --u) {
      if (r = t.charCodeAt(u), r === 47) {
        if (!f) {
          a = u + 1;
          break;
        }
        continue;
      }
      p === -1 && (f = !1, p = u + 1), r === 46 ? c === -1 ? c = u : y !== 1 && (y = 1) : c !== -1 && (y = -1);
    }
    return c === -1 || p === -1 || // We saw a non-dot character immediately before the dot
    y === 0 || // The (right-most) trimmed path component is exactly '..'
    y === 1 && c === p - 1 && c === a + 1 ? p !== -1 && (a === 0 && s ? n.base = n.name = t.slice(1, p) : n.base = n.name = t.slice(a, p)) : (a === 0 && s ? (n.name = t.slice(1, c), n.base = t.slice(1, p)) : (n.name = t.slice(a, c), n.base = t.slice(a, p)), n.ext = t.slice(c, p)), a > 0 ? n.dir = t.slice(0, a - 1) : s && (n.dir = "/"), n;
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
  var n = protocolre.exec(e), r = n[1] ? n[1].toLowerCase() : "", s = !!n[2], o = !!n[3], c = 0, a;
  return s ? o ? (a = n[2] + n[3] + n[4], c = n[2].length + n[3].length) : (a = n[2] + n[4], c = n[2].length) : o ? (a = n[3] + n[4], c = n[3].length) : a = n[4], r === "file:" ? c >= 2 && (a = a.slice(2)) : isSpecial(r) ? a = n[4] : r ? s && (a = a.slice(2)) : c >= 2 && isSpecial(t.protocol) && (a = n[4]), {
    protocol: r,
    slashes: s || isSpecial(r),
    slashesCount: c,
    rest: a
  };
}
function resolve(e, t) {
  if (e === "")
    return t;
  for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, s = n[r - 1], o = !1, c = 0; r--; )
    n[r] === "." ? n.splice(r, 1) : n[r] === ".." ? (n.splice(r, 1), c++) : c && (r === 0 && (o = !0), n.splice(r, 1), c--);
  return o && n.unshift(""), (s === "." || s === "..") && n.push(""), n.join("/");
}
function Url(e, t, n) {
  if (e = trimLeft(e), e = e.replace(CRHTLF, ""), !(this instanceof Url))
    return new Url(e, t, n);
  var r, s, o, c, a, p, f = rules.slice(), u = typeof t, y = this, S = 0;
  for (u !== "object" && u !== "string" && (n = t, t = null), n && typeof n != "function" && (n = qs.parse), t = lolcation(t), s = extractProtocol(e || "", t), r = !s.protocol && !s.slashes, y.slashes = s.slashes || r && t.slashes, y.protocol = s.protocol || t.protocol || "", e = s.rest, (s.protocol === "file:" && (s.slashesCount !== 2 || windowsDriveLetter.test(e)) || !s.slashes && (s.protocol || s.slashesCount < 2 || !isSpecial(y.protocol))) && (f[3] = [/(.*)/, "pathname"]); S < f.length; S++) {
    if (c = f[S], typeof c == "function") {
      e = c(e, y);
      continue;
    }
    o = c[0], p = c[1], o !== o ? y[p] = e : typeof o == "string" ? (a = o === "@" ? e.lastIndexOf(o) : e.indexOf(o), ~a && (typeof c[2] == "number" ? (y[p] = e.slice(0, a), e = e.slice(a + c[2])) : (y[p] = e.slice(a), e = e.slice(0, a)))) : (a = o.exec(e)) && (y[p] = a[1], e = e.slice(0, a.index)), y[p] = y[p] || r && c[3] && t[p] || "", c[4] && (y[p] = y[p].toLowerCase());
  }
  n && (y.query = n(y.query)), r && t.slashes && y.pathname.charAt(0) !== "/" && (y.pathname !== "" || t.pathname !== "") && (y.pathname = resolve(y.pathname, t.pathname)), y.pathname.charAt(0) !== "/" && isSpecial(y.protocol) && (y.pathname = "/" + y.pathname), required(y.port, y.protocol) || (y.host = y.hostname, y.port = ""), y.username = y.password = "", y.auth && (a = y.auth.indexOf(":"), ~a ? (y.username = y.auth.slice(0, a), y.username = encodeURIComponent(decodeURIComponent(y.username)), y.password = y.auth.slice(a + 1), y.password = encodeURIComponent(decodeURIComponent(y.password))) : y.username = encodeURIComponent(decodeURIComponent(y.auth)), y.auth = y.password ? y.username + ":" + y.password : y.username), y.origin = y.protocol !== "file:" && isSpecial(y.protocol) && y.host ? y.protocol + "//" + y.host : "null", y.href = y.toString();
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
  for (var c = 0; c < rules.length; c++) {
    var a = rules[c];
    a[4] && (r[a[1]] = r[a[1]].toLowerCase());
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
        const w = document.createElement("a");
        return w.href = k, w;
      }
      return (0, r.default)(k);
    }
    s.parse = o;
    function c(k) {
      return (0, r.default)(k).hostname;
    }
    s.getHostName = c;
    function a(k) {
      return k && o(k).toString();
    }
    s.normalize = a;
    function p(...k) {
      let w = (0, r.default)(k[0], {});
      const D = w.protocol === "" && w.slashes;
      D && (w = (0, r.default)(k[0], "https:" + k[0]));
      const B = `${D ? "" : w.protocol}${w.slashes ? "//" : ""}${w.auth}${w.auth ? "@" : ""}${w.host}`, St = n.posix.join(`${B && w.pathname[0] !== "/" ? "/" : ""}${w.pathname}`, ...k.slice(1));
      return `${B}${St === "." ? "" : St}`;
    }
    s.join = p;
    function f(k) {
      return p(...k.split("/").map(encodeURIComponent));
    }
    s.encodeParts = f;
    function u(k) {
      const w = Object.keys(k).filter((D) => D.length > 0);
      return w.length ? "?" + w.map((D) => {
        const B = encodeURIComponent(String(k[D]));
        return D + (B ? "=" + B : "");
      }).join("&") : "";
    }
    s.objectToQueryString = u;
    function y(k) {
      return k.replace(/^\?/, "").split("&").reduce((w, D) => {
        const [B, St] = D.split("=");
        return B.length > 0 && (w[B] = decodeURIComponent(St || "")), w;
      }, {});
    }
    s.queryStringToObject = y;
    function S(k) {
      const { protocol: w } = o(k);
      return (!w || k.toLowerCase().indexOf(w) !== 0) && k.indexOf("/") !== 0;
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
      const c = (t = e.mode) !== null && t !== void 0 ? t : getOption("mode"), a = (n = e.workspace) !== null && n !== void 0 ? n : getOption("workspace"), p = c === "single-document" ? "doc" : "lab";
      o = url_1.URLExt.join(o, p), a !== PageConfig.defaultWorkspace && (o = url_1.URLExt.join(o, "workspaces", encodeURIComponent((r = getOption("workspace")) !== null && r !== void 0 ? r : PageConfig.defaultWorkspace)));
      const f = (s = e.treePath) !== null && s !== void 0 ? s : getOption("treePath");
      return f && (o = url_1.URLExt.join(o, "tree", url_1.URLExt.encodeParts(f))), o;
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
        let c = "";
        return o !== -1 && (c = s.slice(0, o)), e.deferred.some((a) => a === s || c && a === c);
      }
      e.isDeferred = n;
      function r(s) {
        const o = s.indexOf(":");
        let c = "";
        return o !== -1 && (c = s.slice(0, o)), e.disabled.some((a) => a === s || c && a === c);
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
      return k === "." ? "" : y(k);
    }
    n.join = r;
    function s(S, k) {
      return t.posix.basename(S, k);
    }
    n.basename = s;
    function o(S) {
      const k = y(t.posix.dirname(S));
      return k === "." ? "" : k;
    }
    n.dirname = o;
    function c(S) {
      return t.posix.extname(S);
    }
    n.extname = c;
    function a(S) {
      return S === "" ? "" : y(t.posix.normalize(S));
    }
    n.normalize = a;
    function p(...S) {
      return y(t.posix.resolve(...S));
    }
    n.resolve = p;
    function f(S, k) {
      return y(t.posix.relative(S, k));
    }
    n.relative = f;
    function u(S) {
      return S.length > 0 && S.indexOf(".") !== 0 && (S = `.${S}`), S;
    }
    n.normalizeExtension = u;
    function y(S) {
      return S.indexOf("/") === 0 && (S = S.slice(1)), S;
    }
    n.removeSlash = y;
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
  function s(o, c) {
    r(), n.resolve([o, c]);
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
    function r(a, p) {
      if (n)
        return a;
      let f = a;
      for (let u = 0; u + 1 < p.length && u < a; u++) {
        const y = p.charCodeAt(u);
        if (y >= 55296 && y <= 56319) {
          const S = p.charCodeAt(u + 1);
          S >= 56320 && S <= 57343 && (f--, u++);
        }
      }
      return f;
    }
    t.jsIndexToCharIndex = r;
    function s(a, p) {
      if (n)
        return a;
      let f = a;
      for (let u = 0; u + 1 < p.length && u < f; u++) {
        const y = p.charCodeAt(u);
        if (y >= 55296 && y <= 56319) {
          const S = p.charCodeAt(u + 1);
          S >= 56320 && S <= 57343 && (f++, u++);
        }
      }
      return f;
    }
    t.charIndexToJsIndex = s;
    function o(a, p = !1) {
      return a.replace(/^(\w)|[\s-_:]+(\w)/g, function(f, u, y) {
        return y ? y.toUpperCase() : p ? u.toUpperCase() : u.toLowerCase();
      });
    }
    t.camelCase = o;
    function c(a) {
      return (a || "").toLowerCase().split(" ").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    }
    t.titleCase = c;
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
      const c = document.documentElement.lang || "en", a = new Intl.RelativeTimeFormat(c, { numeric: "auto" }), p = new Date(o).getTime() - Date.now();
      for (let f of t) {
        const u = Math.ceil(p / f.milliseconds);
        if (u !== 0)
          return a.format(u, f.name);
      }
      return a.format(0, "seconds");
    }
    n.formatHuman = r;
    function s(o) {
      const c = document.documentElement.lang || "en";
      return new Intl.DateTimeFormat(c, {
        dateStyle: "short",
        timeStyle: "short"
      }).format(new Date(o));
    }
    n.format = s;
  })(e.Time || (e.Time = {}));
})(time);
(function(e) {
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, c) {
    c === void 0 && (c = o);
    var a = Object.getOwnPropertyDescriptor(s, o);
    (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, c, a);
  } : function(r, s, o, c) {
    c === void 0 && (c = o), r[c] = s[o];
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
    function c(u) {
      return s.makeSettings(u);
    }
    o.makeSettings = c;
    function a(u, y, S) {
      return s.handleRequest(u, y, S);
    }
    o.makeRequest = a;
    class p extends Error {
      /**
       * Create a ResponseError from a response, handling the traceback and message
       * as appropriate.
       *
       * @param response The response object.
       *
       * @returns A promise that resolves with a `ResponseError` object.
       */
      static async create(y) {
        try {
          const S = await y.json(), { message: k, traceback: w } = S;
          return w && console.error(w), new p(y, k ?? p._defaultMessage(y), w ?? "");
        } catch (S) {
          return console.debug(S), new p(y);
        }
      }
      /**
       * Create a new response error.
       */
      constructor(y, S = p._defaultMessage(y), k = "") {
        super(S), this.response = y, this.traceback = k;
      }
      static _defaultMessage(y) {
        return `Invalid response: ${y.status} ${y.statusText}`;
      }
    }
    o.ResponseError = p;
    class f extends TypeError {
      /**
       * Create a new network error.
       */
      constructor(y) {
        super(y.message), this.stack = y.stack;
      }
    }
    o.NetworkError = f;
  })(r = e.ServerConnection || (e.ServerConnection = {}));
  var s;
  (function(o) {
    function c(f = {}) {
      var u;
      const y = t.PageConfig.getBaseUrl(), S = t.PageConfig.getWsUrl(), k = t.URLExt.normalize(f.baseUrl) || y;
      let w = f.wsUrl;
      return !w && k === y && (w = S), !w && k.indexOf("http") === 0 && (w = "ws" + k.slice(4)), w = w ?? S, {
        init: { cache: "no-store", credentials: "same-origin" },
        fetch,
        Headers,
        Request,
        WebSocket: n,
        token: t.PageConfig.getToken(),
        appUrl: t.PageConfig.getOption("appUrl"),
        appendToken: typeof window > "u" || typeof process < "u" && ((u = process == null ? void 0 : process.env) === null || u === void 0 ? void 0 : u.JEST_WORKER_ID) !== void 0 || t.URLExt.getHostName(y) !== t.URLExt.getHostName(w),
        ...f,
        baseUrl: k,
        wsUrl: w
      };
    }
    o.makeSettings = c;
    function a(f, u, y) {
      var S;
      if (f.indexOf(y.baseUrl) !== 0)
        throw new Error("Can only be used for notebook server requests");
      ((S = u.cache) !== null && S !== void 0 ? S : y.init.cache) === "no-store" && (f += (/\?/.test(f) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
      const w = new y.Request(f, { ...y.init, ...u });
      let D = !1;
      if (y.token && (D = !0, w.headers.append("Authorization", `token ${y.token}`)), typeof document < "u" && (document != null && document.cookie)) {
        const B = p("_xsrf");
        B !== void 0 && (D = !0, w.headers.append("X-XSRFToken", B));
      }
      return !w.headers.has("Content-Type") && D && w.headers.set("Content-Type", "application/json"), y.fetch.call(null, w).catch((B) => {
        throw new r.NetworkError(B);
      });
    }
    o.handleRequest = a;
    function p(f) {
      const u = document.cookie.match("\\b" + f + "=([^;]*)\\b");
      return u == null ? void 0 : u[1];
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
    (function(c) {
      function a(p) {
        const f = new s(p);
        return f.load().then(() => f);
      }
      c.create = a;
    })(e.ConfigSection || (e.ConfigSection = {}));
    class s {
      /**
       * Construct a new config section.
       */
      constructor(a) {
        var p;
        this._url = "unknown";
        const f = this.serverSettings = (p = a.serverSettings) !== null && p !== void 0 ? p : n.ServerConnection.makeSettings();
        this._url = t.URLExt.join(f.baseUrl, r, encodeURIComponent(a.name));
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
        const a = await n.ServerConnection.makeRequest(this._url, {}, this.serverSettings);
        if (a.status !== 200)
          throw await n.ServerConnection.ResponseError.create(a);
        this._data = await a.json();
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
      async update(a) {
        this._data = { ...this._data, ...a };
        const p = {
          method: "PATCH",
          body: JSON.stringify(a)
        }, f = await n.ServerConnection.makeRequest(this._url, p, this.serverSettings);
        if (f.status !== 200)
          throw await n.ServerConnection.ResponseError.create(f);
        return this._data = await f.json(), this._data;
      }
    }
    class o {
      /**
       * Create a new config with defaults.
       */
      constructor(a) {
        var p, f;
        this._className = "", this._section = a.section, this._defaults = (p = a.defaults) !== null && p !== void 0 ? p : {}, this._className = (f = a.className) !== null && f !== void 0 ? f : "";
      }
      /**
       * Get data from the config section or fall back to defaults.
       */
      get(a) {
        const p = this._classData();
        return a in p ? p[a] : this._defaults[a];
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
      set(a, p) {
        const f = {};
        if (f[a] = p, this._className) {
          const u = {};
          return u[this._className] = f, this._section.update(u);
        } else
          return this._section.update(f);
      }
      /**
       * Get data from the Section with our classname, if available.
       *
       * #### Notes
       * If we have no classname, get all of the data in the Section
       */
      _classData() {
        const a = this._section.data;
        return this._className && this._className in a ? a[this._className] : a;
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
      let c = !0;
      switch (n) {
        case "string":
        case "number":
        case "boolean":
          c = r.includes(s);
          break;
        default:
          c = r.findIndex((a) => a === s) >= 0;
          break;
      }
      if (!c)
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
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(k, w, D, B) {
      B === void 0 && (B = D);
      var St = Object.getOwnPropertyDescriptor(w, D);
      (!St || ("get" in St ? !w.__esModule : St.writable || St.configurable)) && (St = { enumerable: !0, get: function() {
        return w[D];
      } }), Object.defineProperty(k, B, St);
    } : function(k, w, D, B) {
      B === void 0 && (B = D), k[B] = w[D];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(k, w) {
      Object.defineProperty(k, "default", { enumerable: !0, value: w });
    } : function(k, w) {
      k.default = w;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(k) {
      if (k && k.__esModule)
        return k;
      var w = {};
      if (k != null)
        for (var D in k)
          D !== "default" && Object.prototype.hasOwnProperty.call(k, D) && t(w, k, D);
      return n(w, k), w;
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Drive = e.ContentsManager = e.Contents = void 0;
    const s = lib$1, o = require$$0, c = requireLib(), a = r(validate$4), p = "api/contents", f = "files";
    (function(k) {
      function w(B) {
        a.validateContentsModel(B);
      }
      k.validateContentsModel = w;
      function D(B) {
        a.validateCheckpointModel(B);
      }
      k.validateCheckpointModel = D;
    })(e.Contents || (e.Contents = {}));
    class u {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(w = {}) {
        var D, B;
        this._isDisposed = !1, this._additionalDrives = /* @__PURE__ */ new Map(), this._fileChanged = new o.Signal(this);
        const St = this.serverSettings = (D = w.serverSettings) !== null && D !== void 0 ? D : c.ServerConnection.makeSettings();
        this._defaultDrive = (B = w.defaultDrive) !== null && B !== void 0 ? B : new y({ serverSettings: St }), this._defaultDrive.fileChanged.connect(this._onFileChanged, this);
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
      addDrive(w) {
        this._additionalDrives.set(w.name, w), w.fileChanged.connect(this._onFileChanged, this);
      }
      /**
       * Given a path, get a shared model factory from the
       * relevant backend. Returns `null` if the backend
       * does not provide one.
       */
      getSharedModelFactory(w) {
        var D;
        const [B] = this._driveForPath(w);
        return (D = B == null ? void 0 : B.sharedModelFactory) !== null && D !== void 0 ? D : null;
      }
      /**
       * Given a path of the form `drive:local/portion/of/it.txt`
       * get the local part of it.
       *
       * @param path: the path.
       *
       * @returns The local part of the path.
       */
      localPath(w) {
        const D = w.split("/"), B = D[0].split(":");
        return B.length === 1 || !this._additionalDrives.has(B[0]) ? s.PathExt.removeSlash(w) : s.PathExt.join(B.slice(1).join(":"), ...D.slice(1));
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
      normalize(w) {
        const D = w.split(":");
        return D.length === 1 ? s.PathExt.normalize(w) : `${D[0]}:${s.PathExt.normalize(D.slice(1).join(":"))}`;
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
      resolvePath(w, D) {
        const B = this.driveName(w), St = this.localPath(w), wt = s.PathExt.resolve("/", St, D);
        return B ? `${B}:${wt}` : wt;
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
      driveName(w) {
        const B = w.split("/")[0].split(":");
        return B.length === 1 ? "" : this._additionalDrives.has(B[0]) ? B[0] : "";
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
      get(w, D) {
        const [B, St] = this._driveForPath(w);
        return B.get(St, D).then((wt) => {
          const ht = [];
          if (wt.type === "directory" && wt.content) {
            for (const N of wt.content)
              ht.push({ ...N, path: this._toGlobalPath(B, N.path) });
            return {
              ...wt,
              path: this._toGlobalPath(B, St),
              content: ht,
              serverPath: wt.path
            };
          } else
            return {
              ...wt,
              path: this._toGlobalPath(B, St),
              serverPath: wt.path
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
      getDownloadUrl(w) {
        const [D, B] = this._driveForPath(w);
        return D.getDownloadUrl(B);
      }
      /**
       * Create a new untitled file or directory in the specified directory path.
       *
       * @param options: The options used to create the file.
       *
       * @returns A promise which resolves with the created file content when the
       *    file is created.
       */
      newUntitled(w = {}) {
        if (w.path) {
          const D = this.normalize(w.path), [B, St] = this._driveForPath(D);
          return B.newUntitled({ ...w, path: St }).then((wt) => ({
            ...wt,
            path: s.PathExt.join(D, wt.name),
            serverPath: wt.path
          }));
        } else
          return this._defaultDrive.newUntitled(w);
      }
      /**
       * Delete a file.
       *
       * @param path - The path to the file.
       *
       * @returns A promise which resolves when the file is deleted.
       */
      delete(w) {
        const [D, B] = this._driveForPath(w);
        return D.delete(B);
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
      rename(w, D) {
        const [B, St] = this._driveForPath(w), [wt, ht] = this._driveForPath(D);
        if (B !== wt)
          throw Error("ContentsManager: renaming files must occur within a Drive");
        return B.rename(St, ht).then((N) => ({
          ...N,
          path: this._toGlobalPath(B, ht),
          serverPath: N.path
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
      save(w, D = {}) {
        const B = this.normalize(w), [St, wt] = this._driveForPath(w);
        return St.save(wt, { ...D, path: wt }).then((ht) => ({
          ...ht,
          path: B,
          serverPath: ht.path
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
      copy(w, D) {
        const [B, St] = this._driveForPath(w), [wt, ht] = this._driveForPath(D);
        if (B === wt)
          return B.copy(St, ht).then((N) => ({
            ...N,
            path: this._toGlobalPath(B, N.path),
            serverPath: N.path
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
      createCheckpoint(w) {
        const [D, B] = this._driveForPath(w);
        return D.createCheckpoint(B);
      }
      /**
       * List available checkpoints for a file.
       *
       * @param path - The path of the file.
       *
       * @returns A promise which resolves with a list of checkpoint models for
       *    the file.
       */
      listCheckpoints(w) {
        const [D, B] = this._driveForPath(w);
        return D.listCheckpoints(B);
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
      restoreCheckpoint(w, D) {
        const [B, St] = this._driveForPath(w);
        return B.restoreCheckpoint(St, D);
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
      deleteCheckpoint(w, D) {
        const [B, St] = this._driveForPath(w);
        return B.deleteCheckpoint(St, D);
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
      _toGlobalPath(w, D) {
        return w === this._defaultDrive ? s.PathExt.removeSlash(D) : `${w.name}:${s.PathExt.removeSlash(D)}`;
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
      _driveForPath(w) {
        const D = this.driveName(w), B = this.localPath(w);
        return D ? [this._additionalDrives.get(D), B] : [this._defaultDrive, B];
      }
      /**
       * Respond to fileChanged signals from the drives attached to
       * the manager. This prepends the drive name to the path if necessary,
       * and then forwards the signal.
       */
      _onFileChanged(w, D) {
        var B, St;
        if (w === this._defaultDrive)
          this._fileChanged.emit(D);
        else {
          let wt = null, ht = null;
          !((B = D.newValue) === null || B === void 0) && B.path && (wt = {
            ...D.newValue,
            path: this._toGlobalPath(w, D.newValue.path)
          }), !((St = D.oldValue) === null || St === void 0) && St.path && (ht = {
            ...D.oldValue,
            path: this._toGlobalPath(w, D.oldValue.path)
          }), this._fileChanged.emit({
            type: D.type,
            newValue: wt,
            oldValue: ht
          });
        }
      }
    }
    e.ContentsManager = u;
    class y {
      /**
       * Construct a new contents manager object.
       *
       * @param options - The options used to initialize the object.
       */
      constructor(w = {}) {
        var D, B, St;
        this._isDisposed = !1, this._fileChanged = new o.Signal(this), this.name = (D = w.name) !== null && D !== void 0 ? D : "Default", this._apiEndpoint = (B = w.apiEndpoint) !== null && B !== void 0 ? B : p, this.serverSettings = (St = w.serverSettings) !== null && St !== void 0 ? St : c.ServerConnection.makeSettings();
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
      async get(w, D) {
        let B = this._getUrl(w);
        if (D) {
          D.type === "notebook" && delete D.format;
          const N = D.content ? "1" : "0", Ue = { ...D, content: N };
          B += s.URLExt.objectToQueryString(Ue);
        }
        const St = this.serverSettings, wt = await c.ServerConnection.makeRequest(B, {}, St);
        if (wt.status !== 200)
          throw await c.ServerConnection.ResponseError.create(wt);
        const ht = await wt.json();
        return a.validateContentsModel(ht), ht;
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
      getDownloadUrl(w) {
        const D = this.serverSettings.baseUrl;
        let B = s.URLExt.join(D, f, s.URLExt.encodeParts(w));
        const St = document.cookie.match("\\b_xsrf=([^;]*)\\b");
        if (St) {
          const wt = new URL(B);
          wt.searchParams.append("_xsrf", St[1]), B = wt.toString();
        }
        return Promise.resolve(B);
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
      async newUntitled(w = {}) {
        var D;
        let B = "{}";
        w && (w.ext && (w.ext = S.normalizeExtension(w.ext)), B = JSON.stringify(w));
        const St = this.serverSettings, wt = this._getUrl((D = w.path) !== null && D !== void 0 ? D : ""), ht = {
          method: "POST",
          body: B
        }, N = await c.ServerConnection.makeRequest(wt, ht, St);
        if (N.status !== 201)
          throw await c.ServerConnection.ResponseError.create(N);
        const Ue = await N.json();
        return a.validateContentsModel(Ue), this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: Ue
        }), Ue;
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
      async delete(w) {
        const D = this._getUrl(w), B = this.serverSettings, St = { method: "DELETE" }, wt = await c.ServerConnection.makeRequest(D, St, B);
        if (wt.status !== 204)
          throw await c.ServerConnection.ResponseError.create(wt);
        this._fileChanged.emit({
          type: "delete",
          oldValue: { path: w },
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
      async rename(w, D) {
        const B = this.serverSettings, St = this._getUrl(w), wt = {
          method: "PATCH",
          body: JSON.stringify({ path: D })
        }, ht = await c.ServerConnection.makeRequest(St, wt, B);
        if (ht.status !== 200)
          throw await c.ServerConnection.ResponseError.create(ht);
        const N = await ht.json();
        return a.validateContentsModel(N), this._fileChanged.emit({
          type: "rename",
          oldValue: { path: w },
          newValue: N
        }), N;
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
      async save(w, D = {}) {
        const B = this.serverSettings, St = this._getUrl(w), wt = {
          method: "PUT",
          body: JSON.stringify(D)
        }, ht = await c.ServerConnection.makeRequest(St, wt, B);
        if (ht.status !== 200 && ht.status !== 201)
          throw await c.ServerConnection.ResponseError.create(ht);
        const N = await ht.json();
        return a.validateContentsModel(N), this._fileChanged.emit({
          type: "save",
          oldValue: null,
          newValue: N
        }), N;
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
      async copy(w, D) {
        const B = this.serverSettings, St = this._getUrl(D), wt = {
          method: "POST",
          body: JSON.stringify({ copy_from: w })
        }, ht = await c.ServerConnection.makeRequest(St, wt, B);
        if (ht.status !== 201)
          throw await c.ServerConnection.ResponseError.create(ht);
        const N = await ht.json();
        return a.validateContentsModel(N), this._fileChanged.emit({
          type: "new",
          oldValue: null,
          newValue: N
        }), N;
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
      async createCheckpoint(w) {
        const D = this._getUrl(w, "checkpoints"), B = { method: "POST" }, St = await c.ServerConnection.makeRequest(D, B, this.serverSettings);
        if (St.status !== 201)
          throw await c.ServerConnection.ResponseError.create(St);
        const wt = await St.json();
        return a.validateCheckpointModel(wt), wt;
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
      async listCheckpoints(w) {
        const D = this._getUrl(w, "checkpoints"), B = await c.ServerConnection.makeRequest(D, {}, this.serverSettings);
        if (B.status !== 200)
          throw await c.ServerConnection.ResponseError.create(B);
        const St = await B.json();
        if (!Array.isArray(St))
          throw new Error("Invalid Checkpoint list");
        for (let wt = 0; wt < St.length; wt++)
          a.validateCheckpointModel(St[wt]);
        return St;
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
      async restoreCheckpoint(w, D) {
        const B = this._getUrl(w, "checkpoints", D), St = { method: "POST" }, wt = await c.ServerConnection.makeRequest(B, St, this.serverSettings);
        if (wt.status !== 204)
          throw await c.ServerConnection.ResponseError.create(wt);
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
      async deleteCheckpoint(w, D) {
        const B = this._getUrl(w, "checkpoints", D), St = { method: "DELETE" }, wt = await c.ServerConnection.makeRequest(B, St, this.serverSettings);
        if (wt.status !== 204)
          throw await c.ServerConnection.ResponseError.create(wt);
      }
      /**
       * Get a REST url for a file given a path.
       */
      _getUrl(...w) {
        const D = w.map((St) => s.URLExt.encodeParts(St)), B = this.serverSettings.baseUrl;
        return s.URLExt.join(B, this._apiEndpoint, ...D);
      }
    }
    e.Drive = y;
    var S;
    (function(k) {
      function w(D) {
        return D.length > 0 && D.indexOf(".") !== 0 && (D = `.${D}`), D;
      }
      k.normalizeExtension = w;
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
    const { backoff: o, interval: c, max: a } = r;
    if (c === Poll.NEVER)
      return c;
    const p = o === !0 ? e.DEFAULT_BACKOFF : o === !1 ? 1 : o, f = n(c, s.interval * p);
    return Math.min(a, f);
  }
  e.sleep = t, e.hidden = typeof document > "u" ? !1 : (document.addEventListener("visibilitychange", () => {
    e.hidden = document.visibilityState === "hidden";
  }), document.addEventListener("pagehide", () => {
    e.hidden = document.visibilityState === "hidden";
  }), document.visibilityState === "hidden");
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
        this.payload = new PromiseDelegate(), o.promise.catch((c) => {
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
    const { serverSettings: n } = this, { baseUrl: r, token: s } = n, { makeRequest: o, ResponseError: c } = serverconnection_1$6.ServerConnection, a = coreutils_1$a.URLExt.join(r, SERVICE_EVENTS_URL) + (s ? `?token=${s}` : ""), p = { body: JSON.stringify(t), method: "POST" }, f = await o(a, p, n);
    if (f.status !== 204)
      throw new c(f);
  }
  /**
   * Subscribe to event bus emissions.
   */
  _subscribe() {
    return new Promise((t, n) => {
      if (this.isDisposed)
        return;
      const { token: r, WebSocket: s, wsUrl: o } = this.serverSettings, c = coreutils_1$a.URLExt.join(o, SERVICE_EVENTS_URL, "subscribe") + (r ? `?token=${encodeURIComponent(r)}` : ""), a = this._socket = new s(c), p = this._stream;
      a.onclose = () => n(new Error("EventManager socket closed")), a.onmessage = (f) => f.data && p.emit(JSON.parse(f.data));
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
  function n(Ue) {
    var Et, gt, kt, mt, ft;
    return {
      buffers: (Et = Ue.buffers) !== null && Et !== void 0 ? Et : [],
      channel: Ue.channel,
      content: Ue.content,
      header: {
        date: (/* @__PURE__ */ new Date()).toISOString(),
        msg_id: (gt = Ue.msgId) !== null && gt !== void 0 ? gt : t.UUID.uuid4(),
        msg_type: Ue.msgType,
        session: Ue.session,
        username: (kt = Ue.username) !== null && kt !== void 0 ? kt : "",
        version: "5.2"
      },
      metadata: (mt = Ue.metadata) !== null && mt !== void 0 ? mt : {},
      parent_header: (ft = Ue.parentHeader) !== null && ft !== void 0 ? ft : {}
    };
  }
  e.createMessage = n;
  function r(Ue) {
    return Ue.header.msg_type === "stream";
  }
  e.isStreamMsg = r;
  function s(Ue) {
    return Ue.header.msg_type === "display_data";
  }
  e.isDisplayDataMsg = s;
  function o(Ue) {
    return Ue.header.msg_type === "update_display_data";
  }
  e.isUpdateDisplayDataMsg = o;
  function c(Ue) {
    return Ue.header.msg_type === "execute_input";
  }
  e.isExecuteInputMsg = c;
  function a(Ue) {
    return Ue.header.msg_type === "execute_result";
  }
  e.isExecuteResultMsg = a;
  function p(Ue) {
    return Ue.header.msg_type === "error";
  }
  e.isErrorMsg = p;
  function f(Ue) {
    return Ue.header.msg_type === "status";
  }
  e.isStatusMsg = f;
  function u(Ue) {
    return Ue.header.msg_type === "clear_output";
  }
  e.isClearOutputMsg = u;
  function y(Ue) {
    return Ue.header.msg_type === "debug_event";
  }
  e.isDebugEventMsg = y;
  function S(Ue) {
    return Ue.header.msg_type === "comm_open";
  }
  e.isCommOpenMsg = S;
  function k(Ue) {
    return Ue.header.msg_type === "comm_close";
  }
  e.isCommCloseMsg = k;
  function w(Ue) {
    return Ue.header.msg_type === "comm_msg";
  }
  e.isCommMsgMsg = w;
  function D(Ue) {
    return Ue.header.msg_type === "kernel_info_request";
  }
  e.isInfoRequestMsg = D;
  function B(Ue) {
    return Ue.header.msg_type === "execute_reply";
  }
  e.isExecuteReplyMsg = B;
  function St(Ue) {
    return Ue.header.msg_type === "debug_request";
  }
  e.isDebugRequestMsg = St;
  function wt(Ue) {
    return Ue.header.msg_type === "debug_reply";
  }
  e.isDebugReplyMsg = wt;
  function ht(Ue) {
    return Ue.header.msg_type === "input_request";
  }
  e.isInputRequestMsg = ht;
  function N(Ue) {
    return Ue.header.msg_type === "input_reply";
  }
  e.isInputReplyMsg = N, function(Ue) {
    Ue.v1KernelWebsocketJupyterOrg = "v1.kernel.websocket.jupyter.org";
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
  async function s(u = t.ServerConnection.makeSettings()) {
    const y = n.URLExt.join(u.baseUrl, e.KERNEL_SERVICE_URL), S = await t.ServerConnection.makeRequest(y, {}, u);
    if (S.status !== 200)
      throw await t.ServerConnection.ResponseError.create(S);
    const k = await S.json();
    return (0, r.validateModels)(k), k;
  }
  e.listRunning = s;
  async function o(u = {}, y = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(y.baseUrl, e.KERNEL_SERVICE_URL), k = {
      method: "POST",
      body: JSON.stringify(u)
    }, w = await t.ServerConnection.makeRequest(S, k, y);
    if (w.status !== 201)
      throw await t.ServerConnection.ResponseError.create(w);
    const D = await w.json();
    return (0, r.validateModel)(D), D;
  }
  e.startNew = o;
  async function c(u, y = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(y.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(u), "restart"), k = { method: "POST" }, w = await t.ServerConnection.makeRequest(S, k, y);
    if (w.status !== 200)
      throw await t.ServerConnection.ResponseError.create(w);
    const D = await w.json();
    (0, r.validateModel)(D);
  }
  e.restartKernel = c;
  async function a(u, y = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(y.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(u), "interrupt"), k = { method: "POST" }, w = await t.ServerConnection.makeRequest(S, k, y);
    if (w.status !== 204)
      throw await t.ServerConnection.ResponseError.create(w);
  }
  e.interruptKernel = a;
  async function p(u, y = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(y.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(u)), k = { method: "DELETE" }, w = await t.ServerConnection.makeRequest(S, k, y);
    if (w.status === 404) {
      const D = `The kernel "${u}" does not exist on the server`;
      console.warn(D);
    } else if (w.status !== 204)
      throw await t.ServerConnection.ResponseError.create(w);
  }
  e.shutdownKernel = p;
  async function f(u, y = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(y.baseUrl, e.KERNEL_SERVICE_URL, encodeURIComponent(u)), k = await t.ServerConnection.makeRequest(S, {}, y);
    if (k.status === 404)
      return;
    if (k.status !== 200)
      throw await t.ServerConnection.ResponseError.create(k);
    const w = await k.json();
    return (0, r.validateModel)(w), w;
  }
  e.getKernelModel = f;
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
    }), o = this._kernel.sendShellMessage(s, !1, !0), c = this._onClose;
    if (c) {
      const a = KernelMessage$2.createMessage({
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
      c(a);
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
  const t = typeof requestAnimationFrame == "function" ? requestAnimationFrame : setImmediate;
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
      let c;
      for (let a = this._hooks.length - 1; a >= 0; a--) {
        const p = this._hooks[a];
        if (p !== null) {
          try {
            c = await p(s);
          } catch (f) {
            c = !0, console.error(f);
          }
          if (c === !1)
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
      for (let o = 0, c = this._hooks.length; o < c; o++) {
        const a = this._hooks[o];
        this._hooks[o] === null ? s++ : this._hooks[o - s] = a;
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
  function t(a) {
    let p;
    const f = new DataView(a), u = Number(f.getBigUint64(
      0,
      !0
      /* littleEndian */
    ));
    let y = [];
    for (let ht = 0; ht < u; ht++)
      y.push(Number(f.getBigUint64(
        8 * (ht + 1),
        !0
        /* littleEndian */
      )));
    const S = new TextDecoder("utf8"), k = S.decode(a.slice(y[0], y[1])), w = JSON.parse(S.decode(a.slice(y[1], y[2]))), D = JSON.parse(S.decode(a.slice(y[2], y[3]))), B = JSON.parse(S.decode(a.slice(y[3], y[4]))), St = JSON.parse(S.decode(a.slice(y[4], y[5])));
    let wt = [];
    for (let ht = 5; ht < y.length - 1; ht++)
      wt.push(new DataView(a.slice(y[ht], y[ht + 1])));
    return p = {
      channel: k,
      header: w,
      parent_header: D,
      metadata: B,
      content: St,
      buffers: wt
    }, p;
  }
  e.deserializeV1KernelWebsocketJupyterOrg = t;
  function n(a) {
    const p = JSON.stringify(a.header), f = a.parent_header == null ? "{}" : JSON.stringify(a.parent_header), u = JSON.stringify(a.metadata), y = JSON.stringify(a.content), S = a.buffers !== void 0 ? a.buffers : [], k = 5 + S.length + 1;
    let w = [];
    w.push(8 * (1 + k)), w.push(a.channel.length + w[w.length - 1]);
    const D = new TextEncoder(), B = D.encode(a.channel), St = D.encode(p), wt = D.encode(f), ht = D.encode(u), N = D.encode(y), Ue = new Uint8Array(B.length + St.length + wt.length + ht.length + N.length);
    Ue.set(B), Ue.set(St, B.length), Ue.set(wt, B.length + St.length), Ue.set(ht, B.length + St.length + wt.length), Ue.set(N, B.length + St.length + wt.length + ht.length);
    for (let ft of [
      St.length,
      wt.length,
      ht.length,
      N.length
    ])
      w.push(ft + w[w.length - 1]);
    let Et = 0;
    for (let ft of S) {
      let bt = ft.byteLength;
      w.push(bt + w[w.length - 1]), Et += bt;
    }
    const gt = new Uint8Array(8 * (1 + k) + Ue.byteLength + Et), kt = new ArrayBuffer(8), mt = new DataView(kt);
    mt.setBigUint64(
      0,
      BigInt(k),
      !0
      /* littleEndian */
    ), gt.set(new Uint8Array(kt), 0);
    for (let ft = 0; ft < w.length; ft++)
      mt.setBigUint64(
        0,
        BigInt(w[ft]),
        !0
        /* littleEndian */
      ), gt.set(new Uint8Array(kt), 8 * (ft + 1));
    gt.set(Ue, w[0]);
    for (let ft = 0; ft < S.length; ft++) {
      const bt = S[ft];
      gt.set(new Uint8Array(ArrayBuffer.isView(bt) ? bt.buffer : bt), w[5 + ft]);
    }
    return gt.buffer;
  }
  e.serializeV1KernelWebsocketJupyterOrg = n;
  function r(a) {
    let p;
    return typeof a == "string" ? p = JSON.parse(a) : p = o(a), p;
  }
  e.deserializeDefault = r;
  function s(a) {
    var p;
    let f;
    return !((p = a.buffers) === null || p === void 0) && p.length ? f = c(a) : f = JSON.stringify(a), f;
  }
  e.serializeDefault = s;
  function o(a) {
    const p = new DataView(a), f = p.getUint32(0), u = [];
    if (f < 2)
      throw new Error("Invalid incoming Kernel Message");
    for (let k = 1; k <= f; k++)
      u.push(p.getUint32(k * 4));
    const y = new Uint8Array(a.slice(u[0], u[1])), S = JSON.parse(new TextDecoder("utf8").decode(y));
    S.buffers = [];
    for (let k = 1; k < f; k++) {
      const w = u[k], D = u[k + 1] || a.byteLength;
      S.buffers.push(new DataView(a.slice(w, D)));
    }
    return S;
  }
  function c(a) {
    const p = [], f = [], u = new TextEncoder();
    let y = [];
    a.buffers !== void 0 && (y = a.buffers, delete a.buffers);
    const S = u.encode(JSON.stringify(a));
    f.push(S.buffer);
    for (let B = 0; B < y.length; B++) {
      const St = y[B];
      f.push(ArrayBuffer.isView(St) ? St.buffer : St);
    }
    const k = f.length;
    p.push(4 * (k + 1));
    for (let B = 0; B + 1 < f.length; B++)
      p.push(p[p.length - 1] + f[B].byteLength);
    const w = new Uint8Array(p[p.length - 1] + f[f.length - 1].byteLength), D = new DataView(w.buffer);
    D.setUint32(0, k);
    for (let B = 0; B < p.length; B++)
      D.setUint32(4 * (B + 1), p[B]);
    for (let B = 0; B < f.length; B++)
      w.set(new Uint8Array(f[B]), p[B]);
    return w.buffer;
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
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(a, p, f, u) {
    u === void 0 && (u = f);
    var y = Object.getOwnPropertyDescriptor(p, f);
    (!y || ("get" in y ? !p.__esModule : y.writable || y.configurable)) && (y = { enumerable: !0, get: function() {
      return p[f];
    } }), Object.defineProperty(a, u, y);
  } : function(a, p, f, u) {
    u === void 0 && (u = f), a[u] = p[f];
  }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(a, p) {
    Object.defineProperty(a, "default", { enumerable: !0, value: p });
  } : function(a, p) {
    a.default = p;
  }), r = commonjsGlobal && commonjsGlobal.__importStar || function(a) {
    if (a && a.__esModule)
      return a;
    var p = {};
    if (a != null)
      for (var f in a)
        f !== "default" && Object.prototype.hasOwnProperty.call(a, f) && t(p, a, f);
    return n(p, a), p;
  }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(a, p) {
    for (var f in a)
      f !== "default" && !Object.prototype.hasOwnProperty.call(p, f) && t(p, a, f);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelSpecAPI = e.KernelSpec = void 0;
  const o = r(kernelspec);
  e.KernelSpec = o;
  const c = r(restapi$3);
  e.KernelSpecAPI = c, s(manager$4, e);
})(kernelspec$1);
var hasRequired_default$2;
function require_default$2() {
  if (hasRequired_default$2)
    return _default$2;
  hasRequired_default$2 = 1;
  var e = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(ht, N, Ue, Et) {
    Et === void 0 && (Et = Ue);
    var gt = Object.getOwnPropertyDescriptor(N, Ue);
    (!gt || ("get" in gt ? !N.__esModule : gt.writable || gt.configurable)) && (gt = { enumerable: !0, get: function() {
      return N[Ue];
    } }), Object.defineProperty(ht, Et, gt);
  } : function(ht, N, Ue, Et) {
    Et === void 0 && (Et = Ue), ht[Et] = N[Ue];
  }), t = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(ht, N) {
    Object.defineProperty(ht, "default", { enumerable: !0, value: N });
  } : function(ht, N) {
    ht.default = N;
  }), n = commonjsGlobal && commonjsGlobal.__importStar || function(ht) {
    if (ht && ht.__esModule)
      return ht;
    var N = {};
    if (ht != null)
      for (var Ue in ht)
        Ue !== "default" && Object.prototype.hasOwnProperty.call(ht, Ue) && e(N, ht, Ue);
    return t(N, ht), N;
  };
  Object.defineProperty(_default$2, "__esModule", { value: !0 }), _default$2.KernelConnection = void 0;
  const r = lib$1, s = distExports, o = require$$0, c = requireLib(), a = comm, p = n(messages), f = future, u = serialize$1, y = n(validate$2), S = kernelspec$1, k = n(restapi$4), w = 3e3, D = "_RESTARTING_", B = "";
  class St {
    /**
     * Construct a kernel object.
     */
    constructor(N) {
      var Ue, Et, gt, kt;
      this._createSocket = (mt = !0) => {
        this._errorIfDisposed(), this._clearSocket(), this._updateConnectionStatus("connecting");
        const ft = this.serverSettings, bt = r.URLExt.join(ft.wsUrl, k.KERNEL_SERVICE_URL, encodeURIComponent(this._id)), At = bt.replace(/^((?:\w+:)?\/\/)(?:[^@\/]+@)/, "$1");
        console.debug(`Starting WebSocket: ${At}`);
        let un = r.URLExt.join(bt, "channels?session_id=" + encodeURIComponent(this._clientId));
        const pn = ft.token;
        ft.appendToken && pn !== "" && (un = un + `&token=${encodeURIComponent(pn)}`);
        const Tn = mt ? this._supportedProtocols : [];
        this._ws = new ft.WebSocket(un, Tn), this._ws.binaryType = "arraybuffer";
        let On = !1;
        const Pn = async (En) => {
          var Dn, yn;
          if (!this._isDisposed) {
            this._reason = "", this._model = void 0;
            try {
              const gn = await k.getKernelModel(this._id, ft);
              this._model = gn, (gn == null ? void 0 : gn.execution_state) === "dead" ? this._updateStatus("dead") : this._onWSClose(En);
            } catch (gn) {
              if (gn instanceof c.ServerConnection.NetworkError || ((Dn = gn.response) === null || Dn === void 0 ? void 0 : Dn.status) === 503 || ((yn = gn.response) === null || yn === void 0 ? void 0 : yn.status) === 424) {
                const xn = wt.getRandomIntInclusive(10, 30) * 1e3;
                setTimeout(Pn, xn, En);
              } else
                this._reason = "Kernel died unexpectedly", this._updateStatus("dead");
            }
          }
        }, $n = async (En) => {
          On || (On = !0, await Pn(En));
        };
        this._ws.onmessage = this._onWSMessage, this._ws.onopen = this._onWSOpen, this._ws.onclose = $n, this._ws.onerror = $n;
      }, this._onWSOpen = (mt) => {
        if (this._ws.protocol !== "" && !this._supportedProtocols.includes(this._ws.protocol))
          throw console.log("Server selected unknown kernel wire protocol:", this._ws.protocol), this._updateStatus("dead"), new Error(`Unknown kernel wire protocol:  ${this._ws.protocol}`);
        this._selectedProtocol = this._ws.protocol, this._ws.onclose = this._onWSClose, this._ws.onerror = this._onWSClose, this._updateConnectionStatus("connected");
      }, this._onWSMessage = (mt) => {
        let ft;
        try {
          ft = (0, u.deserialize)(mt.data, this._ws.protocol), y.validateMessage(ft);
        } catch (bt) {
          throw bt.message = `Kernel message validation error: ${bt.message}`, bt;
        }
        this._kernelSession = ft.header.session, this._msgChain = this._msgChain.then(() => this._handleMessage(ft)).catch((bt) => {
          bt.message.startsWith("Canceled future for ") && console.error(bt);
        }), this._anyMessage.emit({ msg: ft, direction: "recv" });
      }, this._onWSClose = (mt) => {
        this.isDisposed || this._reconnect();
      }, this._id = "", this._name = "", this._status = "unknown", this._connectionStatus = "connecting", this._kernelSession = "", this._isDisposed = !1, this._ws = null, this._username = "", this._reconnectLimit = 7, this._reconnectAttempt = 0, this._reconnectTimeout = null, this._supportedProtocols = Object.values(p.supportedKernelWebSocketProtocols), this._selectedProtocol = "", this._futures = /* @__PURE__ */ new Map(), this._comms = /* @__PURE__ */ new Map(), this._targetRegistry = /* @__PURE__ */ Object.create(null), this._info = new s.PromiseDelegate(), this._pendingMessages = [], this._statusChanged = new o.Signal(this), this._connectionStatusChanged = new o.Signal(this), this._disposed = new o.Signal(this), this._iopubMessage = new o.Signal(this), this._anyMessage = new o.Signal(this), this._pendingInput = new o.Signal(this), this._unhandledMessage = new o.Signal(this), this._displayIdToParentIds = /* @__PURE__ */ new Map(), this._msgIdToDisplayIds = /* @__PURE__ */ new Map(), this._msgChain = Promise.resolve(), this._hasPendingInput = !1, this._reason = "", this._noOp = () => {
      }, this._name = N.model.name, this._id = N.model.id, this.serverSettings = (Ue = N.serverSettings) !== null && Ue !== void 0 ? Ue : c.ServerConnection.makeSettings(), this._clientId = (Et = N.clientId) !== null && Et !== void 0 ? Et : s.UUID.uuid4(), this._username = (gt = N.username) !== null && gt !== void 0 ? gt : "", this.handleComms = (kt = N.handleComms) !== null && kt !== void 0 ? kt : !0, this._createSocket();
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
      return this._specPromise ? this._specPromise : (this._specPromise = S.KernelSpecAPI.getSpecs(this.serverSettings).then((N) => N.kernelspecs[this._name]), this._specPromise);
    }
    /**
     * Clone the current kernel with a new clientId.
     */
    clone(N = {}) {
      return new St({
        model: this.model,
        username: this.username,
        serverSettings: this.serverSettings,
        // handleComms defaults to false since that is safer
        handleComms: !1,
        ...N
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
    sendShellMessage(N, Ue = !1, Et = !0) {
      return this._sendKernelShellControl(f.KernelShellFutureHandler, N, Ue, Et);
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
    sendControlMessage(N, Ue = !1, Et = !0) {
      return this._sendKernelShellControl(f.KernelControlFutureHandler, N, Ue, Et);
    }
    _sendKernelShellControl(N, Ue, Et = !1, gt = !0) {
      this._sendMessage(Ue), this._anyMessage.emit({ msg: Ue, direction: "send" });
      const kt = new N(() => {
        const mt = Ue.header.msg_id;
        this._futures.delete(mt);
        const ft = this._msgIdToDisplayIds.get(mt);
        ft && (ft.forEach((bt) => {
          const At = this._displayIdToParentIds.get(bt);
          if (At) {
            const un = At.indexOf(mt);
            if (un === -1)
              return;
            At.length === 1 ? this._displayIdToParentIds.delete(bt) : (At.splice(un, 1), this._displayIdToParentIds.set(bt, At));
          }
        }), this._msgIdToDisplayIds.delete(mt));
      }, Ue, Et, gt, this);
      return this._futures.set(Ue.header.msg_id, kt), kt;
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
    _sendMessage(N, Ue = !0) {
      if (this.status === "dead")
        throw new Error("Kernel is dead");
      if ((this._kernelSession === B || this._kernelSession === D) && p.isInfoRequestMsg(N))
        if (this.connectionStatus === "connected") {
          this._ws.send((0, u.serialize)(N, this._ws.protocol));
          return;
        } else
          throw new Error("Could not send message: status is not connected");
      if (Ue && this._pendingMessages.length > 0) {
        this._pendingMessages.push(N);
        return;
      }
      if (this.connectionStatus === "connected" && this._kernelSession !== D)
        this._ws.send((0, u.serialize)(N, this._ws.protocol));
      else if (Ue)
        this._pendingMessages.push(N);
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
      this._updateStatus("restarting"), this._clearKernelState(), this._kernelSession = D, await k.restartKernel(this.id, this.serverSettings), await this.reconnect(), this.hasPendingInput = !1;
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
      const N = new s.PromiseDelegate(), Ue = (Et, gt) => {
        gt === "connected" ? (N.resolve(), this.connectionStatusChanged.disconnect(Ue, this)) : gt === "disconnected" && (N.reject(new Error("Kernel connection disconnected")), this.connectionStatusChanged.disconnect(Ue, this));
      };
      return this.connectionStatusChanged.connect(Ue, this), this._reconnectAttempt = 0, this._reconnect(), N.promise;
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
      const N = p.createMessage({
        msgType: "kernel_info_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: {}
      });
      let Ue;
      try {
        Ue = await wt.handleShellMessage(this, N);
      } catch (Et) {
        if (this.isDisposed)
          return;
        throw Et;
      }
      if (this._errorIfDisposed(), !!Ue)
        return Ue.content.status === void 0 && (Ue.content.status = "ok"), Ue.content.status !== "ok" ? (this._info.reject("Kernel info reply errored"), Ue) : (this._info.resolve(Ue.content), this._kernelSession = Ue.header.session, Ue);
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
    requestComplete(N) {
      const Ue = p.createMessage({
        msgType: "complete_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: N
      });
      return wt.handleShellMessage(this, Ue);
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
    requestInspect(N) {
      const Ue = p.createMessage({
        msgType: "inspect_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: N
      });
      return wt.handleShellMessage(this, Ue);
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
    requestHistory(N) {
      const Ue = p.createMessage({
        msgType: "history_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: N
      });
      return wt.handleShellMessage(this, Ue);
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
    requestExecute(N, Ue = !0, Et) {
      const gt = {
        silent: !1,
        store_history: !0,
        user_expressions: {},
        allow_stdin: !0,
        stop_on_error: !1
      }, kt = p.createMessage({
        msgType: "execute_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: { ...gt, ...N },
        metadata: Et
      });
      return this.sendShellMessage(kt, !0, Ue);
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
    requestDebug(N, Ue = !0) {
      const Et = p.createMessage({
        msgType: "debug_request",
        channel: "control",
        username: this._username,
        session: this._clientId,
        content: N
      });
      return this.sendControlMessage(Et, !0, Ue);
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
    requestIsComplete(N) {
      const Ue = p.createMessage({
        msgType: "is_complete_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: N
      });
      return wt.handleShellMessage(this, Ue);
    }
    /**
     * Send a `comm_info_request` message.
     *
     * #### Notes
     * Fulfills with the `comm_info_reply` content when the shell reply is
     * received and validated.
     */
    requestCommInfo(N) {
      const Ue = p.createMessage({
        msgType: "comm_info_request",
        channel: "shell",
        username: this._username,
        session: this._clientId,
        content: N
      });
      return wt.handleShellMessage(this, Ue);
    }
    /**
     * Send an `input_reply` message.
     *
     * #### Notes
     * See [Messaging in Jupyter](https://jupyter-client.readthedocs.io/en/latest/messaging.html#messages-on-the-stdin-router-dealer-sockets).
     */
    sendInputReply(N, Ue) {
      const Et = p.createMessage({
        msgType: "input_reply",
        channel: "stdin",
        username: this._username,
        session: this._clientId,
        content: N
      });
      Et.parent_header = Ue, this._sendMessage(Et), this._anyMessage.emit({ msg: Et, direction: "send" }), this.hasPendingInput = !1;
    }
    /**
     * Create a new comm.
     *
     * #### Notes
     * If a client-side comm already exists with the given commId, an error is thrown.
     * If the kernel does not handle comms, an error is thrown.
     */
    createComm(N, Ue = s.UUID.uuid4()) {
      if (!this.handleComms)
        throw new Error("Comms are disabled on this kernel connection");
      if (this._comms.has(Ue))
        throw new Error("Comm is already created");
      const Et = new a.CommHandler(N, Ue, this, () => {
        this._unregisterComm(Ue);
      });
      return this._comms.set(Ue, Et), Et;
    }
    /**
     * Check if a comm exists.
     */
    hasComm(N) {
      return this._comms.has(N);
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
    registerCommTarget(N, Ue) {
      this.handleComms && (this._targetRegistry[N] = Ue);
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
    removeCommTarget(N, Ue) {
      this.handleComms && !this.isDisposed && this._targetRegistry[N] === Ue && delete this._targetRegistry[N];
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
    registerMessageHook(N, Ue) {
      var Et;
      const gt = (Et = this._futures) === null || Et === void 0 ? void 0 : Et.get(N);
      gt && gt.registerMessageHook(Ue);
    }
    /**
     * Remove an IOPub message hook.
     *
     * @param msg_id - The parent_header message id the hook intercepted.
     *
     * @param hook - The callback invoked for the message.
     *
     */
    removeMessageHook(N, Ue) {
      var Et;
      const gt = (Et = this._futures) === null || Et === void 0 ? void 0 : Et.get(N);
      gt && gt.removeMessageHook(Ue);
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
    async _handleDisplayId(N, Ue) {
      var Et, gt;
      const kt = Ue.parent_header.msg_id;
      let mt = this._displayIdToParentIds.get(N);
      if (mt) {
        const bt = {
          header: s.JSONExt.deepCopy(Ue.header),
          parent_header: s.JSONExt.deepCopy(Ue.parent_header),
          metadata: s.JSONExt.deepCopy(Ue.metadata),
          content: s.JSONExt.deepCopy(Ue.content),
          channel: Ue.channel,
          buffers: Ue.buffers ? Ue.buffers.slice() : []
        };
        bt.header.msg_type = "update_display_data", await Promise.all(mt.map(async (At) => {
          const un = this._futures && this._futures.get(At);
          un && await un.handleMsg(bt);
        }));
      }
      if (Ue.header.msg_type === "update_display_data")
        return !0;
      mt = (Et = this._displayIdToParentIds.get(N)) !== null && Et !== void 0 ? Et : [], mt.indexOf(kt) === -1 && mt.push(kt), this._displayIdToParentIds.set(N, mt);
      const ft = (gt = this._msgIdToDisplayIds.get(kt)) !== null && gt !== void 0 ? gt : [];
      return ft.indexOf(kt) === -1 && ft.push(kt), this._msgIdToDisplayIds.set(kt, ft), !1;
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
    _updateStatus(N) {
      this._status === N || this._status === "dead" || (this._status = N, wt.logKernelStatus(this), this._statusChanged.emit(N), N === "dead" && this.dispose());
    }
    /**
     * Send pending messages to the kernel.
     */
    _sendPending() {
      for (; this.connectionStatus === "connected" && this._kernelSession !== D && this._pendingMessages.length > 0; )
        this._sendMessage(this._pendingMessages[0], !1), this._pendingMessages.shift();
    }
    /**
     * Clear the internal state.
     */
    _clearKernelState() {
      this._kernelSession = "", this._pendingMessages = [], this._futures.forEach((N) => {
        N.dispose();
      }), this._comms.forEach((N) => {
        N.dispose();
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
    _assertCurrentMessage(N) {
      if (this._errorIfDisposed(), N.header.session !== this._kernelSession)
        throw new Error(`Canceling handling of old message: ${N.header.msg_type}`);
    }
    /**
     * Handle a `comm_open` kernel message.
     */
    async _handleCommOpen(N) {
      this._assertCurrentMessage(N);
      const Ue = N.content, Et = new a.CommHandler(Ue.target_name, Ue.comm_id, this, () => {
        this._unregisterComm(Ue.comm_id);
      });
      this._comms.set(Ue.comm_id, Et);
      try {
        await (await wt.loadObject(Ue.target_name, Ue.target_module, this._targetRegistry))(Et, N);
      } catch (gt) {
        throw Et.close(), console.error("Exception opening new comm"), gt;
      }
    }
    /**
     * Handle 'comm_close' kernel message.
     */
    async _handleCommClose(N) {
      this._assertCurrentMessage(N);
      const Ue = N.content, Et = this._comms.get(Ue.comm_id);
      if (!Et) {
        console.error("Comm not found for comm id " + Ue.comm_id);
        return;
      }
      this._unregisterComm(Et.commId);
      const gt = Et.onClose;
      gt && await gt(N), Et.dispose();
    }
    /**
     * Handle a 'comm_msg' kernel message.
     */
    async _handleCommMsg(N) {
      this._assertCurrentMessage(N);
      const Ue = N.content, Et = this._comms.get(Ue.comm_id);
      if (!Et)
        return;
      const gt = Et.onMsg;
      gt && await gt(N);
    }
    /**
     * Unregister a comm instance.
     */
    _unregisterComm(N) {
      this._comms.delete(N);
    }
    /**
     * Handle connection status changes.
     */
    _updateConnectionStatus(N) {
      if (this._connectionStatus !== N) {
        if (this._connectionStatus = N, N !== "connecting" && (this._reconnectAttempt = 0, clearTimeout(this._reconnectTimeout)), this.status !== "dead")
          if (N === "connected") {
            let Ue = this._kernelSession === D, Et = this.requestKernelInfo(), gt = !1, kt = () => {
              gt || (gt = !0, Ue && this._kernelSession === D && (this._kernelSession = ""), clearTimeout(mt), this._pendingMessages.length > 0 && this._sendPending());
            };
            Et.then(kt);
            let mt = setTimeout(kt, w);
          } else
            this._updateStatus("unknown");
        this._connectionStatusChanged.emit(N);
      }
    }
    async _handleMessage(N) {
      var Ue, Et;
      let gt = !1;
      if (N.parent_header && N.channel === "iopub" && (p.isDisplayDataMsg(N) || p.isUpdateDisplayDataMsg(N) || p.isExecuteResultMsg(N))) {
        const mt = ((Ue = N.content.transient) !== null && Ue !== void 0 ? Ue : {}).display_id;
        mt && (gt = await this._handleDisplayId(mt, N), this._assertCurrentMessage(N));
      }
      if (!gt && N.parent_header) {
        const kt = N.parent_header, mt = (Et = this._futures) === null || Et === void 0 ? void 0 : Et.get(kt.msg_id);
        if (mt)
          await mt.handleMsg(N), this._assertCurrentMessage(N);
        else {
          const ft = kt.session === this.clientId;
          N.channel !== "iopub" && ft && this._unhandledMessage.emit(N);
        }
      }
      if (N.channel === "iopub") {
        switch (N.header.msg_type) {
          case "status": {
            const kt = N.content.execution_state;
            kt === "restarting" && Promise.resolve().then(async () => {
              this._updateStatus("autorestarting"), this._clearKernelState(), await this.reconnect();
            }), this._updateStatus(kt);
            break;
          }
          case "comm_open":
            this.handleComms && await this._handleCommOpen(N);
            break;
          case "comm_msg":
            this.handleComms && await this._handleCommMsg(N);
            break;
          case "comm_close":
            this.handleComms && await this._handleCommClose(N);
            break;
        }
        this.isDisposed || (this._assertCurrentMessage(N), this._iopubMessage.emit(N));
      }
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
      if (this._errorIfDisposed(), clearTimeout(this._reconnectTimeout), this._reconnectAttempt < this._reconnectLimit) {
        this._updateConnectionStatus("connecting");
        const N = wt.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
        console.warn(`Connection lost, reconnecting in ${Math.floor(N / 1e3)} seconds.`);
        const Ue = this._selectedProtocol !== "";
        this._reconnectTimeout = setTimeout(this._createSocket, N, Ue), this._reconnectAttempt += 1;
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
    set hasPendingInput(N) {
      this._hasPendingInput = N, this._pendingInput.emit(N);
    }
  }
  _default$2.KernelConnection = St;
  var wt;
  return function(ht) {
    function N(kt) {
      switch (kt.status) {
        case "idle":
        case "busy":
        case "unknown":
          return;
        default:
          console.debug(`Kernel: ${kt.status} (${kt.id})`);
          break;
      }
    }
    ht.logKernelStatus = N;
    async function Ue(kt, mt) {
      return kt.sendShellMessage(mt, !0).done;
    }
    ht.handleShellMessage = Ue;
    function Et(kt, mt, ft) {
      return new Promise((bt, At) => {
        if (mt) {
          if (typeof requirejs > "u")
            throw new Error("requirejs not found");
          requirejs([mt], (un) => {
            if (un[kt] === void 0) {
              const pn = `Object '${kt}' not found in module '${mt}'`;
              At(new Error(pn));
            } else
              bt(un[kt]);
          }, At);
        } else
          ft != null && ft[kt] ? bt(ft[kt]) : At(new Error(`Object '${kt}' not found in registry`));
      });
    }
    ht.loadObject = Et;
    function gt(kt, mt) {
      return kt = Math.ceil(kt), mt = Math.floor(mt), Math.floor(Math.random() * (mt - kt + 1)) + kt;
    }
    ht.getRandomIntInclusive = gt;
  }(wt || (wt = {})), _default$2;
}
var manager$3 = {}, hasRequiredManager$3;
function requireManager$3() {
  return hasRequiredManager$3 || (hasRequiredManager$3 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelManager = void 0;
    const t = require$$2, n = require$$0, r = requireLib(), s = basemanager, o = restapi$4, c = require_default$2();
    class a extends s.BaseManager {
      /**
       * Construct a new kernel manager.
       *
       * @param options - The default options for kernel.
       */
      constructor(f = {}) {
        var u;
        super(f), this._isReady = !1, this._kernelConnections = /* @__PURE__ */ new Set(), this._models = /* @__PURE__ */ new Map(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:KernelManager#models",
          standby: (u = f.standby) !== null && u !== void 0 ? u : "when-hidden"
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
        this.isDisposed || (this._models.clear(), this._kernelConnections.forEach((f) => f.dispose()), this._pollModels.dispose(), super.dispose());
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
      connectTo(f) {
        var u;
        const { id: y } = f.model;
        let S = (u = f.handleComms) !== null && u !== void 0 ? u : !0;
        if (f.handleComms === void 0) {
          for (const w of this._kernelConnections)
            if (w.id === y && w.handleComms) {
              S = !1;
              break;
            }
        }
        const k = new c.KernelConnection({
          handleComms: S,
          ...f,
          serverSettings: this.serverSettings
        });
        return this._onStarted(k), this._models.has(y) || this.refreshRunning().catch(() => {
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
      async startNew(f = {}, u = {}) {
        const y = await (0, o.startNew)(f, this.serverSettings);
        return this.connectTo({
          ...u,
          model: y
        });
      }
      /**
       * Shut down a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves when the operation is complete.
       */
      async shutdown(f) {
        await (0, o.shutdownKernel)(f, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all kernels.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all([...this._models.keys()].map((f) => (0, o.shutdownKernel)(f, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Find a kernel by id.
       *
       * @param id - The id of the target kernel.
       *
       * @returns A promise that resolves with the kernel's model.
       */
      async findById(f) {
        return this._models.has(f) ? this._models.get(f) : (await this.refreshRunning(), this._models.get(f));
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var f, u;
        let y;
        try {
          y = await (0, o.listRunning)(this.serverSettings);
        } catch (S) {
          throw (S instanceof r.ServerConnection.NetworkError || ((f = S.response) === null || f === void 0 ? void 0 : f.status) === 503 || ((u = S.response) === null || u === void 0 ? void 0 : u.status) === 424) && this._connectionFailure.emit(S), S;
        }
        this.isDisposed || this._models.size === y.length && y.every((S) => {
          const k = this._models.get(S.id);
          return k ? k.connections === S.connections && k.execution_state === S.execution_state && k.last_activity === S.last_activity && k.name === S.name && k.reason === S.reason && k.traceback === S.traceback : !1;
        }) || (this._models = new Map(y.map((S) => [S.id, S])), this._kernelConnections.forEach((S) => {
          this._models.has(S.id) || S.handleShutdown();
        }), this._runningChanged.emit(y));
      }
      /**
       * Handle a kernel starting.
       */
      _onStarted(f) {
        this._kernelConnections.add(f), f.statusChanged.connect(this._onStatusChanged, this), f.disposed.connect(this._onDisposed, this);
      }
      _onDisposed(f) {
        this._kernelConnections.delete(f), this.refreshRunning().catch(() => {
        });
      }
      _onStatusChanged(f, u) {
        u === "dead" && this.refreshRunning().catch(() => {
        });
      }
    }
    e.KernelManager = a, function(p) {
      class f extends p {
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
        async startNew(y = {}, S = {}) {
          return Promise.reject(new Error("Not implemented in no-op Kernel Manager"));
        }
        /**
         * Connect to an existing kernel - throws an error since it is not supported.
         */
        connectTo(y) {
          throw new Error("Not implemented in no-op Kernel Manager");
        }
        /**
         * Shut down a kernel by id - throws an error since it is not supported.
         */
        async shutdown(y) {
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
      p.NoopManager = f;
    }(a = e.KernelManager || (e.KernelManager = {}));
  }(manager$3)), manager$3;
}
var hasRequiredKernel;
function requireKernel() {
  return hasRequiredKernel || (hasRequiredKernel = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(f, u, y, S) {
      S === void 0 && (S = y);
      var k = Object.getOwnPropertyDescriptor(u, y);
      (!k || ("get" in k ? !u.__esModule : k.writable || k.configurable)) && (k = { enumerable: !0, get: function() {
        return u[y];
      } }), Object.defineProperty(f, S, k);
    } : function(f, u, y, S) {
      S === void 0 && (S = y), f[S] = u[y];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(f, u) {
      Object.defineProperty(f, "default", { enumerable: !0, value: u });
    } : function(f, u) {
      f.default = u;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var u = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && t(u, f, y);
      return n(u, f), u;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(f, u) {
      for (var y in f)
        y !== "default" && !Object.prototype.hasOwnProperty.call(u, y) && t(u, f, y);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.KernelConnection = e.KernelAPI = e.KernelMessage = e.Kernel = void 0;
    const o = r(kernel);
    e.Kernel = o;
    const c = r(messages);
    e.KernelMessage = c;
    const a = r(restapi$4);
    e.KernelAPI = a;
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
        const c = `Build failed with ${o.status}.

        If you are experiencing the build failure after installing an extension (or trying to include previously installed extension after updating JupyterLab) please check the extension repository for new installation instructions as many extensions migrated to the prebuilt extensions system which no longer requires rebuilding JupyterLab (but uses a different installation procedure, typically involving a package manager such as 'pip' or 'conda').

        If you specifically intended to install a source extension, please run 'jupyter lab build' on the server for full output.`;
        throw new serverconnection_1$4.ServerConnection.ResponseError(o, c);
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
    const o = await s.json(), c = {};
    return Object.keys(o).forEach(function(p) {
      const f = o[p].output_mimetype;
      c[p] = { output_mimetype: f };
    }), this._exportFormats = c, this._requestingFormats.resolve(c), c;
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
  async function s(u = t.ServerConnection.makeSettings()) {
    const y = n.URLExt.join(u.baseUrl, e.SESSION_SERVICE_URL), S = await t.ServerConnection.makeRequest(y, {}, u);
    if (S.status !== 200)
      throw await t.ServerConnection.ResponseError.create(S);
    const k = await S.json();
    if (!Array.isArray(k))
      throw new Error("Invalid Session list");
    return k.forEach((w) => {
      (0, r.updateLegacySessionModel)(w), (0, r.validateModel)(w);
    }), k;
  }
  e.listRunning = s;
  function o(u, y) {
    const S = n.URLExt.join(u, e.SESSION_SERVICE_URL), k = n.URLExt.join(S, y);
    if (!k.startsWith(S))
      throw new Error("Can only be used for services requests");
    return k;
  }
  e.getSessionUrl = o;
  async function c(u, y = t.ServerConnection.makeSettings()) {
    var S;
    const k = o(y.baseUrl, u), w = { method: "DELETE" }, D = await t.ServerConnection.makeRequest(k, w, y);
    if (D.status === 404) {
      const St = (S = (await D.json()).message) !== null && S !== void 0 ? S : `The session "${u}"" does not exist on the server`;
      console.warn(St);
    } else {
      if (D.status === 410)
        throw new t.ServerConnection.ResponseError(D, "The kernel was deleted but the session was not");
      if (D.status !== 204)
        throw await t.ServerConnection.ResponseError.create(D);
    }
  }
  e.shutdownSession = c;
  async function a(u, y = t.ServerConnection.makeSettings()) {
    const S = o(y.baseUrl, u), k = await t.ServerConnection.makeRequest(S, {}, y);
    if (k.status !== 200)
      throw await t.ServerConnection.ResponseError.create(k);
    const w = await k.json();
    return (0, r.updateLegacySessionModel)(w), (0, r.validateModel)(w), w;
  }
  e.getSessionModel = a;
  async function p(u, y = t.ServerConnection.makeSettings()) {
    const S = n.URLExt.join(y.baseUrl, e.SESSION_SERVICE_URL), k = {
      method: "POST",
      body: JSON.stringify(u)
    }, w = await t.ServerConnection.makeRequest(S, k, y);
    if (w.status !== 201)
      throw await t.ServerConnection.ResponseError.create(w);
    const D = await w.json();
    return (0, r.updateLegacySessionModel)(D), (0, r.validateModel)(D), D;
  }
  e.startSession = p;
  async function f(u, y = t.ServerConnection.makeSettings()) {
    const S = o(y.baseUrl, u.id), k = {
      method: "PATCH",
      body: JSON.stringify(u)
    }, w = await t.ServerConnection.makeRequest(S, k, y);
    if (w.status !== 200)
      throw await t.ServerConnection.ResponseError.create(w);
    const D = await w.json();
    return (0, r.updateLegacySessionModel)(D), (0, r.validateModel)(D), D;
  }
  e.updateSession = f;
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
    constructor(c) {
      var a, p, f, u;
      this._id = "", this._path = "", this._name = "", this._type = "", this._kernel = null, this._isDisposed = !1, this._disposed = new e.Signal(this), this._kernelChanged = new e.Signal(this), this._statusChanged = new e.Signal(this), this._connectionStatusChanged = new e.Signal(this), this._pendingInput = new e.Signal(this), this._iopubMessage = new e.Signal(this), this._unhandledMessage = new e.Signal(this), this._anyMessage = new e.Signal(this), this._propertyChanged = new e.Signal(this), this._id = c.model.id, this._name = c.model.name, this._path = c.model.path, this._type = c.model.type, this._username = (a = c.username) !== null && a !== void 0 ? a : "", this._clientId = (p = c.clientId) !== null && p !== void 0 ? p : r.UUID.uuid4(), this._connectToKernel = c.connectToKernel, this._kernelConnectionOptions = (f = c.kernelConnectionOptions) !== null && f !== void 0 ? f : {}, this.serverSettings = (u = c.serverSettings) !== null && u !== void 0 ? u : t.ServerConnection.makeSettings(), this.setupKernel(c.model.kernel);
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
    update(c) {
      const a = this.model;
      if (this._path = c.path, this._name = c.name, this._type = c.type, this._kernel === null && c.kernel !== null || this._kernel !== null && c.kernel === null || this._kernel !== null && c.kernel !== null && this._kernel.id !== c.kernel.id) {
        this._kernel !== null && this._kernel.dispose();
        const p = this._kernel || null;
        this.setupKernel(c.kernel);
        const f = this._kernel || null;
        this._kernelChanged.emit({ name: "kernel", oldValue: p, newValue: f });
      }
      this._handleModelChange(a);
    }
    /**
     * Dispose of the resources held by the session.
     */
    dispose() {
      if (!this.isDisposed) {
        if (this._isDisposed = !0, this._disposed.emit(), this._kernel) {
          this._kernel.dispose();
          const c = this._kernel;
          this._kernel = null;
          const a = this._kernel;
          this._kernelChanged.emit({ name: "kernel", oldValue: c, newValue: a });
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
    async setPath(c) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await this._patch({ path: c });
    }
    /**
     * Change the session name.
     */
    async setName(c) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await this._patch({ name: c });
    }
    /**
     * Change the session type.
     */
    async setType(c) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      await this._patch({ type: c });
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
    async changeKernel(c) {
      if (this.isDisposed)
        throw new Error("Session is disposed");
      return await this._patch({ kernel: c }), this.kernel;
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
    setupKernel(c) {
      if (c === null) {
        this._kernel = null;
        return;
      }
      const a = this._connectToKernel({
        ...this._kernelConnectionOptions,
        model: c,
        username: this._username,
        clientId: this._clientId,
        serverSettings: this.serverSettings
      });
      this._kernel = a, a.statusChanged.connect(this.onKernelStatus, this), a.connectionStatusChanged.connect(this.onKernelConnectionStatus, this), a.pendingInput.connect(this.onPendingInput, this), a.unhandledMessage.connect(this.onUnhandledMessage, this), a.iopubMessage.connect(this.onIOPubMessage, this), a.anyMessage.connect(this.onAnyMessage, this);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelStatus(c, a) {
      this._statusChanged.emit(a);
    }
    /**
     * Handle to changes in the Kernel status.
     */
    onKernelConnectionStatus(c, a) {
      this._connectionStatusChanged.emit(a);
    }
    /**
     * Handle a change in the pendingInput.
     */
    onPendingInput(c, a) {
      this._pendingInput.emit(a);
    }
    /**
     * Handle iopub kernel messages.
     */
    onIOPubMessage(c, a) {
      this._iopubMessage.emit(a);
    }
    /**
     * Handle unhandled kernel messages.
     */
    onUnhandledMessage(c, a) {
      this._unhandledMessage.emit(a);
    }
    /**
     * Handle any kernel messages.
     */
    onAnyMessage(c, a) {
      this._anyMessage.emit(a);
    }
    /**
     * Send a PATCH to the server, updating the session path or the kernel.
     */
    async _patch(c) {
      const a = await (0, n.updateSession)({ ...c, id: this._id }, this.serverSettings);
      return this.update(a), a;
    }
    /**
     * Handle a change to the model.
     */
    _handleModelChange(c) {
      c.name !== this._name && this._propertyChanged.emit("name"), c.type !== this._type && this._propertyChanged.emit("type"), c.path !== this._path && this._propertyChanged.emit("path");
    }
  }
  return _default$1.SessionConnection = s, _default$1;
}
var hasRequiredManager$2;
function requireManager$2() {
  return hasRequiredManager$2 || (hasRequiredManager$2 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SessionManager = void 0;
    const t = require$$2, n = require$$0, r = serverconnection, s = basemanager, o = require_default$1(), c = restapi$1;
    class a extends s.BaseManager {
      /**
       * Construct a new session manager.
       *
       * @param options - The default options for each session.
       */
      constructor(f) {
        var u;
        super(f), this._isReady = !1, this._sessionConnections = /* @__PURE__ */ new Set(), this._models = /* @__PURE__ */ new Map(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), this._connectToKernel = (y) => this._kernelManager.connectTo(y), this._kernelManager = f.kernelManager, this._pollModels = new t.Poll({
          auto: !1,
          factory: () => this.requestRunning(),
          frequency: {
            interval: 10 * 1e3,
            backoff: !0,
            max: 300 * 1e3
          },
          name: "@jupyterlab/services:SessionManager#models",
          standby: (u = f.standby) !== null && u !== void 0 ? u : "when-hidden"
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
        this.isDisposed || (this._models.clear(), this._sessionConnections.forEach((f) => f.dispose()), this._pollModels.dispose(), super.dispose());
      }
      /*
       * Connect to a running session.  See also [[connectToSession]].
       */
      connectTo(f) {
        const u = new o.SessionConnection({
          ...f,
          connectToKernel: this._connectToKernel,
          serverSettings: this.serverSettings
        });
        return this._onStarted(u), this._models.has(f.model.id) || this.refreshRunning().catch(() => {
        }), u;
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
      async startNew(f, u = {}) {
        const y = await (0, c.startSession)(f, this.serverSettings);
        return await this.refreshRunning(), this.connectTo({ ...u, model: y });
      }
      /**
       * Shut down a session by id.
       */
      async shutdown(f) {
        await (0, c.shutdownSession)(f, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all sessions.
       *
       * @returns A promise that resolves when all of the kernels are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all([...this._models.keys()].map((f) => (0, c.shutdownSession)(f, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Find a session associated with a path and stop it if it is the only session
       * using that kernel.
       *
       * @param path - The path in question.
       *
       * @returns A promise that resolves when the relevant sessions are stopped.
       */
      async stopIfNeeded(f) {
        try {
          const y = (await (0, c.listRunning)(this.serverSettings)).filter((S) => S.path === f);
          if (y.length === 1) {
            const S = y[0].id;
            await this.shutdown(S);
          }
        } catch {
        }
      }
      /**
       * Find a session by id.
       */
      async findById(f) {
        return this._models.has(f) ? this._models.get(f) : (await this.refreshRunning(), this._models.get(f));
      }
      /**
       * Find a session by path.
       */
      async findByPath(f) {
        for (const u of this._models.values())
          if (u.path === f)
            return u;
        await this.refreshRunning();
        for (const u of this._models.values())
          if (u.path === f)
            return u;
      }
      /**
       * Execute a request to the server to poll running kernels and update state.
       */
      async requestRunning() {
        var f, u;
        let y;
        try {
          y = await (0, c.listRunning)(this.serverSettings);
        } catch (S) {
          throw (S instanceof r.ServerConnection.NetworkError || ((f = S.response) === null || f === void 0 ? void 0 : f.status) === 503 || ((u = S.response) === null || u === void 0 ? void 0 : u.status) === 424) && this._connectionFailure.emit(S), S;
        }
        this.isDisposed || this._models.size === y.length && y.every((S) => {
          var k, w, D, B;
          const St = this._models.get(S.id);
          return St ? ((k = St.kernel) === null || k === void 0 ? void 0 : k.id) === ((w = S.kernel) === null || w === void 0 ? void 0 : w.id) && ((D = St.kernel) === null || D === void 0 ? void 0 : D.name) === ((B = S.kernel) === null || B === void 0 ? void 0 : B.name) && St.name === S.name && St.path === S.path && St.type === S.type : !1;
        }) || (this._models = new Map(y.map((S) => [S.id, S])), this._sessionConnections.forEach((S) => {
          this._models.has(S.id) ? S.update(this._models.get(S.id)) : S.dispose();
        }), this._runningChanged.emit(y));
      }
      /**
       * Handle a session starting.
       */
      _onStarted(f) {
        this._sessionConnections.add(f), f.disposed.connect(this._onDisposed, this), f.propertyChanged.connect(this._onChanged, this), f.kernelChanged.connect(this._onChanged, this);
      }
      _onDisposed(f) {
        this._sessionConnections.delete(f), this.refreshRunning().catch(() => {
        });
      }
      _onChanged() {
        this.refreshRunning().catch(() => {
        });
      }
    }
    e.SessionManager = a, function(p) {
      class f extends p {
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
        async startNew(y, S = {}) {
          return Promise.reject(new Error("Not implemented in no-op Session Manager"));
        }
        /*
         * Connect to a running session - throw an error since it is not supported.
         */
        connectTo(y) {
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
        async shutdown(y) {
          return Promise.reject(new Error("Not implemented in no-op Session Manager"));
        }
        /**
         * Execute a request to the server to poll running sessions and update state.
         */
        async requestRunning() {
          return Promise.resolve();
        }
      }
      p.NoopManager = f;
    }(a = e.SessionManager || (e.SessionManager = {}));
  }(manager$1)), manager$1;
}
var hasRequiredSession;
function requireSession() {
  return hasRequiredSession || (hasRequiredSession = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(a, p, f, u) {
      u === void 0 && (u = f);
      var y = Object.getOwnPropertyDescriptor(p, f);
      (!y || ("get" in y ? !p.__esModule : y.writable || y.configurable)) && (y = { enumerable: !0, get: function() {
        return p[f];
      } }), Object.defineProperty(a, u, y);
    } : function(a, p, f, u) {
      u === void 0 && (u = f), a[u] = p[f];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(a, p) {
      Object.defineProperty(a, "default", { enumerable: !0, value: p });
    } : function(a, p) {
      a.default = p;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(a) {
      if (a && a.__esModule)
        return a;
      var p = {};
      if (a != null)
        for (var f in a)
          f !== "default" && Object.prototype.hasOwnProperty.call(a, f) && t(p, a, f);
      return n(p, a), p;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(a, p) {
      for (var f in a)
        f !== "default" && !Object.prototype.hasOwnProperty.call(p, f) && t(p, a, f);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SessionAPI = e.Session = void 0;
    const o = r(session);
    e.Session = o;
    const c = r(restapi$1);
    e.SessionAPI = c, s(requireManager$2(), e);
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
  e.ownerData = /* @__PURE__ */ new WeakMap(), e.nextPID = /* @__PURE__ */ (() => {
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
          const c = `${this.namespace}:${o}`, a = (r = (n = this._restore).args) === null || r === void 0 ? void 0 : r.call(n, t);
          Private$3.nameProperty.set(t, c), await s.save(c, { data: a });
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
    const { command: n, connector: r, registry: s, when: o } = t, c = this.namespace, a = o ? [r.list(c)].concat(o) : [r.list(c)];
    this._restore = t;
    const [p] = await Promise.all(a), f = await Promise.all(p.ids.map(async (u, y) => {
      const S = p.values[y], k = S && S.data;
      return k === void 0 ? r.remove(u) : s.execute(n, k).catch(() => r.remove(u));
    }));
    return this._restored.resolve(), f;
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
    const { connector: o } = this._restore, c = this._restore.name(t), a = Private$3.nameProperty.get(t), p = c ? `${this.namespace}:${c}` : "";
    if (a && a !== p && await o.remove(a), Private$3.nameProperty.set(t, p), p) {
      const f = (r = (n = this._restore).args) === null || r === void 0 ? void 0 : r.call(n, t);
      await o.save(p, { data: f });
    }
    a !== p && this._updated.emit(t);
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
      const { connector: o, transform: c } = s;
      this._connector = o || new n.Connector(), c ? this._ready = c.then((a) => {
        const { contents: p, type: f } = a;
        switch (f) {
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
      return o.reduce((c, a, p) => (c[s[p]] = a, c), {});
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
      const { ids: o, values: c } = await this._connector.list(s);
      return {
        ids: o,
        values: c.map((a) => JSON.parse(a).v)
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
      async fetch(c) {
        return this._storage[c];
      }
      /**
       * Retrieve the list of items available from the data connector.
       *
       * @param namespace - If not empty, only keys whose first token before `:`
       * exactly match `namespace` will be returned, e.g. `foo` in `foo:bar`.
       */
      async list(c = "") {
        return Object.keys(this._storage).reduce((a, p) => ((c === "" || c === p.split(":")[0]) && (a.ids.push(p), a.values.push(this._storage[p])), a), { ids: [], values: [] });
      }
      /**
       * Remove a value using the data connector.
       */
      async remove(c) {
        delete this._storage[c];
      }
      /**
       * Save a value using the data connector.
       */
      async save(c, a) {
        this._storage[c] = a;
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
  var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, c) {
    c === void 0 && (c = o);
    var a = Object.getOwnPropertyDescriptor(s, o);
    (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, c, a);
  } : function(r, s, o, c) {
    c === void 0 && (c = o), r[c] = s[o];
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
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: c } = serverconnection_1$2.ServerConnection, a = r + s, p = Private$2.url(a, t), f = await o(p, {}, n);
    if (f.status !== 200)
      throw await c.create(f);
    return f.json();
  }
  /**
   * Fetch the list of all plugin setting bundles.
   *
   * @returns A promise that resolves if successful.
   */
  async list(t) {
    var n, r, s, o;
    const { serverSettings: c } = this, { baseUrl: a, appUrl: p } = c, { makeRequest: f, ResponseError: u } = serverconnection_1$2.ServerConnection, y = a + p, S = Private$2.url(y, "", t === "ids"), k = await f(S, {}, c);
    if (k.status !== 200)
      throw new u(k);
    const w = await k.json(), D = (r = (n = w == null ? void 0 : w.settings) === null || n === void 0 ? void 0 : n.map((St) => St.id)) !== null && r !== void 0 ? r : [];
    let B = [];
    return t || (B = (o = (s = w == null ? void 0 : w.settings) === null || s === void 0 ? void 0 : s.map((St) => (St.data = { composite: {}, user: {} }, St))) !== null && o !== void 0 ? o : []), { ids: D, values: B };
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
    const { serverSettings: r } = this, { baseUrl: s, appUrl: o } = r, { makeRequest: c, ResponseError: a } = serverconnection_1$2.ServerConnection, p = s + o, f = Private$2.url(p, t), u = { body: JSON.stringify({ raw: n }), method: "PUT" }, y = await c(f, u, r);
    if (y.status !== 204)
      throw new a(y);
  }
}
setting.SettingManager = SettingManager;
var Private$2;
(function(e) {
  function t(n, r, s) {
    const o = s ? coreutils_1$2.URLExt.objectToQueryString({ ids_only: !0 }) : "", c = coreutils_1$2.URLExt.join(n, SERVICE_SETTINGS_URL), a = coreutils_1$2.URLExt.join(c, r);
    if (!a.startsWith(c))
      throw new Error("Can only be used for workspaces requests");
    return `${a}${o}`;
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
  async function s(p = n.ServerConnection.makeSettings(), f, u) {
    a.errorIfNotAvailable();
    const y = t.URLExt.join(p.baseUrl, e.TERMINAL_SERVICE_URL), S = {
      method: "POST",
      body: JSON.stringify({ name: f, cwd: u })
    }, k = await n.ServerConnection.makeRequest(y, S, p);
    if (k.status !== 200)
      throw await n.ServerConnection.ResponseError.create(k);
    return await k.json();
  }
  e.startNew = s;
  async function o(p = n.ServerConnection.makeSettings()) {
    a.errorIfNotAvailable();
    const f = t.URLExt.join(p.baseUrl, e.TERMINAL_SERVICE_URL), u = await n.ServerConnection.makeRequest(f, {}, p);
    if (u.status !== 200)
      throw await n.ServerConnection.ResponseError.create(u);
    const y = await u.json();
    if (!Array.isArray(y))
      throw new Error("Invalid terminal list");
    return y;
  }
  e.listRunning = o;
  async function c(p, f = n.ServerConnection.makeSettings()) {
    var u;
    a.errorIfNotAvailable();
    const y = t.URLExt.join(f.baseUrl, e.TERMINAL_SERVICE_URL), S = t.URLExt.join(y, p);
    if (!S.startsWith(y))
      throw new Error("Can only be used for terminal requests");
    const k = { method: "DELETE" }, w = await n.ServerConnection.makeRequest(S, k, f);
    if (w.status === 404) {
      const B = (u = (await w.json()).message) !== null && u !== void 0 ? u : `The terminal session "${p}"" does not exist on the server`;
      console.warn(B);
    } else if (w.status !== 204)
      throw await n.ServerConnection.ResponseError.create(w);
  }
  e.shutdownTerminal = c;
  var a;
  (function(p) {
    function f() {
      if (!r())
        throw new Error("Terminals Unavailable");
    }
    p.errorIfNotAvailable = f;
  })(a || (a = {}));
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
      var f;
      this._createSocket = () => {
        this._errorIfDisposed(), this._clearSocket(), this._updateConnectionStatus("connecting");
        const u = this._name, y = this.serverSettings;
        let S = e.URLExt.join(y.wsUrl, "terminals", "websocket", encodeURIComponent(u));
        const k = y.token;
        y.appendToken && k !== "" && (S = S + `?token=${encodeURIComponent(k)}`), this._ws = new y.WebSocket(S), this._ws.onmessage = this._onWSMessage, this._ws.onclose = this._onWSClose, this._ws.onerror = this._onWSClose;
      }, this._onWSMessage = (u) => {
        if (this._isDisposed)
          return;
        const y = JSON.parse(u.data);
        if (y[0] === "disconnect" && this.dispose(), this._connectionStatus === "connecting") {
          y[0] === "setup" && this._updateConnectionStatus("connected");
          return;
        }
        this._messageReceived.emit({
          type: y[0],
          content: y.slice(1)
        });
      }, this._onWSClose = (u) => {
        console.warn(`Terminal websocket closed: ${u.code}`), this.isDisposed || this._reconnect();
      }, this._connectionStatus = "connecting", this._connectionStatusChanged = new n.Signal(this), this._isDisposed = !1, this._disposed = new n.Signal(this), this._messageReceived = new n.Signal(this), this._reconnectTimeout = null, this._ws = null, this._noOp = () => {
      }, this._reconnectLimit = 7, this._reconnectAttempt = 0, this._pendingMessages = [], this._name = p.model.name, this.serverSettings = (f = p.serverSettings) !== null && f !== void 0 ? f : r.ServerConnection.makeSettings(), this._createSocket();
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
    _sendMessage(p, f = !0) {
      if (!(this._isDisposed || !p.content))
        if (this.connectionStatus === "connected" && this._ws) {
          const u = [p.type, ...p.content];
          this._ws.send(JSON.stringify(u));
        } else if (f)
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
      const p = new t.PromiseDelegate(), f = (u, y) => {
        y === "connected" ? (p.resolve(), this.connectionStatusChanged.disconnect(f, this)) : y === "disconnected" && (p.reject(new Error("Terminal connection disconnected")), this.connectionStatusChanged.disconnect(f, this));
      };
      return this.connectionStatusChanged.connect(f, this), this._reconnectAttempt = 0, this._reconnect(), p.promise;
    }
    /**
     * Attempt a connection if we have not exhausted connection attempts.
     */
    _reconnect() {
      if (this._errorIfDisposed(), clearTimeout(this._reconnectTimeout), this._reconnectAttempt < this._reconnectLimit) {
        this._updateConnectionStatus("connecting");
        const p = c.getRandomIntInclusive(0, 1e3 * (Math.pow(2, this._reconnectAttempt) - 1));
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
  var c;
  return function(a) {
    function p(u, y) {
      return e.URLExt.join(u, s.TERMINAL_SERVICE_URL, encodeURIComponent(y));
    }
    a.getTermUrl = p;
    function f(u, y) {
      return u = Math.ceil(u), y = Math.floor(y), Math.floor(Math.random() * (y - u + 1)) + u;
    }
    a.getRandomIntInclusive = f;
  }(c || (c = {})), _default;
}
var hasRequiredManager$1;
function requireManager$1() {
  return hasRequiredManager$1 || (hasRequiredManager$1 = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TerminalManager = void 0;
    const t = require$$2, n = require$$0, r = requireLib(), s = basemanager, o = restapi, c = require_default();
    class a extends s.BaseManager {
      /**
       * Construct a new terminal manager.
       */
      constructor(f = {}) {
        var u;
        if (super(f), this._isReady = !1, this._names = [], this._terminalConnections = /* @__PURE__ */ new Set(), this._runningChanged = new n.Signal(this), this._connectionFailure = new n.Signal(this), !this.isAvailable()) {
          this._ready = Promise.reject("Terminals unavailable"), this._ready.catch((y) => {
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
          standby: (u = f.standby) !== null && u !== void 0 ? u : "when-hidden"
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
        this.isDisposed || (this._names.length = 0, this._terminalConnections.forEach((f) => f.dispose()), this._pollModels.dispose(), super.dispose());
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
      connectTo(f) {
        const u = new c.TerminalConnection({
          ...f,
          serverSettings: this.serverSettings
        });
        return this._onStarted(u), this._names.includes(f.model.name) || this.refreshRunning().catch(() => {
        }), u;
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
      async startNew(f) {
        const u = await (0, o.startNew)(this.serverSettings, f == null ? void 0 : f.name, f == null ? void 0 : f.cwd);
        return await this.refreshRunning(), this.connectTo({ model: u });
      }
      /**
       * Shut down a terminal session by name.
       */
      async shutdown(f) {
        await (0, o.shutdownTerminal)(f, this.serverSettings), await this.refreshRunning();
      }
      /**
       * Shut down all terminal sessions.
       *
       * @returns A promise that resolves when all of the sessions are shut down.
       */
      async shutdownAll() {
        await this.refreshRunning(), await Promise.all(this._names.map((f) => (0, o.shutdownTerminal)(f, this.serverSettings))), await this.refreshRunning();
      }
      /**
       * Execute a request to the server to poll running terminals and update state.
       */
      async requestRunning() {
        var f, u;
        let y;
        try {
          y = await (0, o.listRunning)(this.serverSettings);
        } catch (k) {
          throw (k instanceof r.ServerConnection.NetworkError || ((f = k.response) === null || f === void 0 ? void 0 : f.status) === 503 || ((u = k.response) === null || u === void 0 ? void 0 : u.status) === 424) && this._connectionFailure.emit(k), k;
        }
        if (this.isDisposed)
          return;
        const S = y.map(({ name: k }) => k).sort();
        S !== this._names && (this._names = S, this._terminalConnections.forEach((k) => {
          S.includes(k.name) || k.dispose();
        }), this._runningChanged.emit(this._models));
      }
      /**
       * Handle a session starting.
       */
      _onStarted(f) {
        this._terminalConnections.add(f), f.disposed.connect(this._onDisposed, this);
      }
      /**
       * Handle a session terminating.
       */
      _onDisposed(f) {
        this._terminalConnections.delete(f), this.refreshRunning().catch(() => {
        });
      }
      get _models() {
        return this._names.map((f) => ({ name: f }));
      }
    }
    e.TerminalManager = a, function(p) {
      class f extends p {
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
        async startNew(y) {
          return Promise.reject(new Error("Not implemented in no-op Terminal Manager"));
        }
        /*
         * Connect to a running terminal - throw an error since it is not supported.
         */
        connectTo(y) {
          throw Error("Not implemented in no-op Terminal Manager");
        }
        /**
         * Shut down a session by id - throw an error since it is not supported.
         */
        async shutdown(y) {
          return Promise.reject(new Error("Not implemented in no-op Terminal Manager"));
        }
        /**
         * Execute a request to the server to poll running sessions and update state.
         */
        async requestRunning() {
          return Promise.resolve();
        }
      }
      p.NoopManager = f;
    }(a = e.TerminalManager || (e.TerminalManager = {}));
  }(manager)), manager;
}
var hasRequiredTerminal;
function requireTerminal() {
  return hasRequiredTerminal || (hasRequiredTerminal = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(a, p, f, u) {
      u === void 0 && (u = f);
      var y = Object.getOwnPropertyDescriptor(p, f);
      (!y || ("get" in y ? !p.__esModule : y.writable || y.configurable)) && (y = { enumerable: !0, get: function() {
        return p[f];
      } }), Object.defineProperty(a, u, y);
    } : function(a, p, f, u) {
      u === void 0 && (u = f), a[u] = p[f];
    }), n = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(a, p) {
      Object.defineProperty(a, "default", { enumerable: !0, value: p });
    } : function(a, p) {
      a.default = p;
    }), r = commonjsGlobal && commonjsGlobal.__importStar || function(a) {
      if (a && a.__esModule)
        return a;
      var p = {};
      if (a != null)
        for (var f in a)
          f !== "default" && Object.prototype.hasOwnProperty.call(a, f) && t(p, a, f);
      return n(p, a), p;
    }, s = commonjsGlobal && commonjsGlobal.__exportStar || function(a, p) {
      for (var f in a)
        f !== "default" && !Object.prototype.hasOwnProperty.call(p, f) && t(p, a, f);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TerminalAPI = e.Terminal = void 0;
    const o = r(terminal);
    e.Terminal = o;
    const c = r(restapi);
    e.TerminalAPI = c, s(requireManager$1(), e);
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
    const c = {
      identity: this._identity,
      permissions: this._permissions
    }, a = await o.json(), p = a.identity, { localStorage: f } = window, u = f.getItem(SERVICE_ID);
    if (u && (!p.initials || !p.color)) {
      const y = JSON.parse(u);
      p.initials = p.initials || y.initials || p.name.substring(0, 1), p.color = p.color || y.color || Private$1.getRandomColor();
    }
    coreutils_2.JSONExt.deepEqual(a, c) || (this._identity = p, this._permissions = a.permissions, f.setItem(SERVICE_ID, JSON.stringify(p)), this._userChanged.emit(a));
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
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: c } = serverconnection_1.ServerConnection, a = r + s, p = Private.url(a, t), f = await o(p, {}, n);
    if (f.status !== 200)
      throw await c.create(f);
    return f.json();
  }
  /**
   * Fetch the list of workspace IDs that exist on the server.
   *
   * @returns A promise that resolves if successful.
   */
  async list() {
    const { serverSettings: t } = this, { baseUrl: n, appUrl: r } = t, { makeRequest: s, ResponseError: o } = serverconnection_1.ServerConnection, c = n + r, a = Private.url(c, ""), p = await s(a, {}, t);
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
    const { serverSettings: n } = this, { baseUrl: r, appUrl: s } = n, { makeRequest: o, ResponseError: c } = serverconnection_1.ServerConnection, a = r + s, p = Private.url(a, t), u = await o(p, { method: "DELETE" }, n);
    if (u.status !== 204)
      throw await c.create(u);
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
    const { serverSettings: r } = this, { baseUrl: s, appUrl: o } = r, { makeRequest: c, ResponseError: a } = serverconnection_1.ServerConnection, p = s + o, f = Private.url(p, t), u = { body: JSON.stringify(n), method: "PUT" }, y = await c(f, u, r);
    if (y.status !== 204)
      throw await a.create(y);
  }
}
workspace.WorkspaceManager = WorkspaceManager;
var Private;
(function(e) {
  function t(n, r) {
    const s = coreutils_1.URLExt.join(n, SERVICE_WORKSPACES_URL), o = coreutils_1.URLExt.join(s, r);
    if (!o.startsWith(s))
      throw new Error("Can only be used for workspaces requests");
    return o;
  }
  e.url = t;
})(Private || (Private = {}));
var hasRequiredManager;
function requireManager() {
  if (hasRequiredManager)
    return manager$2;
  hasRequiredManager = 1, Object.defineProperty(manager$2, "__esModule", { value: !0 }), manager$2.ServiceManager = void 0;
  const e = require$$0, t = builder, n = requireContents(), r = event, s = requireKernel(), o = kernelspec$1, c = nbconvert, a = serverconnection, p = requireSession(), f = setting, u = requireTerminal(), y = user, S = workspace;
  class k {
    /**
     * Construct a new services provider.
     */
    constructor(D = {}) {
      var B, St;
      this._isDisposed = !1, this._connectionFailure = new e.Signal(this), this._isReady = !1;
      const wt = D.defaultDrive, ht = (B = D.serverSettings) !== null && B !== void 0 ? B : a.ServerConnection.makeSettings(), N = (St = D.standby) !== null && St !== void 0 ? St : "when-hidden", Ue = { defaultDrive: wt, serverSettings: ht, standby: N };
      this.serverSettings = ht, this.contents = D.contents || new n.ContentsManager(Ue), this.events = D.events || new r.EventManager(Ue), this.kernels = D.kernels || new s.KernelManager(Ue), this.sessions = D.sessions || new p.SessionManager({
        ...Ue,
        kernelManager: this.kernels
      }), this.settings = D.settings || new f.SettingManager(Ue), this.terminals = D.terminals || new u.TerminalManager(Ue), this.builder = D.builder || new t.BuildManager(Ue), this.workspaces = D.workspaces || new S.WorkspaceManager(Ue), this.nbconvert = D.nbconvert || new c.NbConvertManager(Ue), this.kernelspecs = D.kernelspecs || new o.KernelSpecManager(Ue), this.user = D.user || new y.UserManager(Ue), this.kernelspecs.connectionFailure.connect(this._onConnectionFailure, this), this.sessions.connectionFailure.connect(this._onConnectionFailure, this), this.terminals.connectionFailure.connect(this._onConnectionFailure, this);
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
    _onConnectionFailure(D, B) {
      this._connectionFailure.emit(B);
    }
  }
  return manager$2.ServiceManager = k, manager$2;
}
var hasRequiredLib;
function requireLib() {
  return hasRequiredLib || (hasRequiredLib = 1, function(e) {
    var t = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, c) {
      c === void 0 && (c = o);
      var a = Object.getOwnPropertyDescriptor(s, o);
      (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
        return s[o];
      } }), Object.defineProperty(r, c, a);
    } : function(r, s, o, c) {
      c === void 0 && (c = o), r[c] = s[o];
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
    vn(this, "serverSettings");
    /**
     * 内核清单管理
     * {@inheritDoc jupyterlab.ServiceManager.kernelspecs}
     * @see {@link jupyterlab.ServiceManager.kernelspecs}
     */
    vn(this, "kernelspecs");
    /**
     * 内核管理
     * {@inheritDoc jupyterlab.ServiceManager.kernels}
     * @see {@link jupyterlab.ServiceManager.kernels}
     */
    vn(this, "kernels");
    /**
     * 会话管理
     * {@inheritDoc jupyterlab.ServiceManager.sessions}
     * @see {@link jupyterlab.ServiceManager.sessions}
     */
    vn(this, "sessions");
    /**
     * 实例是否销毁
     * {@inheritDoc jupyterlab.ServiceManager._isDisposed}
     * @see {@link jupyterlab.ServiceManager._isDisposed}
     */
    vn(this, "_isDisposed", !1);
    /**
     * 实例是否就绪
     * {@inheritDoc jupyterlab.ServiceManager._readyPromise}
     * @see {@link jupyterlab.ServiceManager._readyPromise}
     */
    vn(this, "_readyPromise");
    /**
     * 实例是否就绪
     * {@inheritDoc jupyterlab.ServiceManager._isReady}
     * @see {@link jupyterlab.ServiceManager._isReady}
     */
    vn(this, "_isReady", !1);
    vn(this, "errorEventListener", (...t) => {
      this.logger.warn(...t);
    });
    this.logger = n, this.kernelSpecsChangedEventListener = r, this.kernelsChangedEventListener = s, this.sessionsChangedEventListener = o, this.serverSettings = makeSettings(t);
    const c = {
      serverSettings: this.serverSettings
    };
    this.kernelspecs = new libExports.KernelSpecManager(c), this.kernels = new libExports.KernelManager(c), this.sessions = new libExports.SessionManager({
      ...c,
      kernelManager: this.kernels
    });
    const a = [
      this.sessions.ready,
      this.kernelspecs.ready
    ];
    this._readyPromise = Promise.all(a).then(() => {
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
async function executeCode(e, t, n, r, s, o, ...c) {
  if (r.kernel) {
    const a = {
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
    }, p = await client.getBlockAttrs({ id: a.code.id });
    if (a.code.attrs = p.data, CONSTANTS.attrs.code.output in a.code.attrs)
      try {
        const u = a.code.attrs[CONSTANTS.attrs.code.output], y = await client.getBlockAttrs({ id: u });
        a.output.id = u, a.output.new = !1, a.output.attrs = y.data;
      } catch {
      }
    initContext(a), await initOutputBlock(a);
    const f = r.kernel.requestExecute(
      {
        ...config.jupyter.execute.content,
        ...c[0],
        code: t
      },
      c[1],
      c[2]
    );
    f.onIOPub = async (u) => {
      switch (u.header.msg_type) {
        case "status": {
          await handleStatusMessage(
            u,
            a
          );
          break;
        }
        case "stream": {
          await handleStreamMessage(
            u,
            a
          );
          break;
        }
        case "error": {
          await handleErrorMessage(
            u,
            a
          );
          break;
        }
        case "execute_input": {
          await handleExecuteInputMessage(
            u,
            a
          );
          break;
        }
        case "display_data": {
          await handleDisplayDataMessage(
            u,
            a
          );
          break;
        }
        case "update_display_data": {
          await handleUpdateDisplayDataMessage(
            u,
            a
          );
          break;
        }
        case "execute_result": {
          await handleExecuteResultMessage(
            u,
            a
          );
          break;
        }
        case "clear_output": {
          await initOutputBlock(a);
          break;
        }
      }
    }, f.onStdin = (u) => handleStdinMessage(u, a, f), f.onReply = (u) => handleExecuteReplyMessage(u, a);
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
      ) ?? "", o = `\`${r.password ? "*".repeat(s.length) : s}\``, c = r.prompt ? `\`${r.prompt}\`: ${o}` : o;
      t.output.hrs.stream.used = !0, await insertBlock(
        t,
        t.output.hrs.stream.id,
        c
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
        const f = [];
        for (const u of p)
          if (u != null && u.data) {
            const y = await parseData(
              client,
              t.output.options,
              u.data,
              u.metadata
            );
            f.push(y);
          }
        t.output.hrs.execute_reply.used = !0, await client.insertBlock({
          nextID: t.output.hrs.execute_reply.id,
          data: [
            "{{{row",
            f.join(`

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
  const c = t.output.hrs, a = [];
  c.stream.used && (c.error.used || c.display_data.used || c.execute_result.used || c.execute_reply.used) || a.push(c.stream.id), c.error.used && (c.display_data.used || c.execute_result.used || c.execute_reply.used) || a.push(c.error.id), c.display_data.used && (c.execute_result.used || c.execute_reply.used) || a.push(c.display_data.id), c.execute_result.used && c.execute_reply.used || a.push(c.execute_result.id), a.push(c.execute_reply.id);
  for (const p of a)
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
    async func(e, t, n, r, s, o, ...c) {
      const a = id_2_session_connection.get(r);
      return a && await executeCode(
        e,
        t,
        n,
        a,
        s,
        o,
        ...c
      ), a == null ? void 0 : a.model;
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

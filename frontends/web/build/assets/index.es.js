import { g as Yi, a as lo, E as Nt, b as G, I as fo, M as Wi, O as Ji, P as jr, R as dr, S as go, c as ut, N as J, T as Xi, V as Qi, Z as po, $ as Ar, a0 as yo, K as mo, a1 as bo, a2 as si, a3 as vo, a4 as wo, a5 as _o, a6 as ni, a7 as Eo, L as Fr, a8 as Cr, U as Bt, a9 as sr, aa as Gt, ab as xo, ac as Io, ad as oi, ae as So, af as To, w as Nr, ag as Ro, ah as Oo, _ as Lo, p as nr, ai as Po, aj as ai, d as Ao, y as _r, m as ci, H as Er, k as Fo, n as Co, C as No, ak as Do, al as Mo, am as zo, D as Uo, an as $o, ao as jo } from "./index.js";
var Kr = { exports: {} }, Ct = typeof Reflect == "object" ? Reflect : null, hi = Ct && typeof Ct.apply == "function" ? Ct.apply : function(e, t, i) {
  return Function.prototype.apply.call(e, t, i);
}, or;
Ct && typeof Ct.ownKeys == "function" ? or = Ct.ownKeys : Object.getOwnPropertySymbols ? or = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : or = function(e) {
  return Object.getOwnPropertyNames(e);
};
function Ko(r) {
  console && console.warn && console.warn(r);
}
var Zi = Number.isNaN || function(e) {
  return e !== e;
};
function X() {
  X.init.call(this);
}
Kr.exports = X;
Kr.exports.once = Go;
X.EventEmitter = X;
X.prototype._events = void 0;
X.prototype._eventsCount = 0;
X.prototype._maxListeners = void 0;
var ui = 10;
function gr(r) {
  if (typeof r != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
}
Object.defineProperty(X, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return ui;
  },
  set: function(r) {
    if (typeof r != "number" || r < 0 || Zi(r))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    ui = r;
  }
});
X.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
X.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || Zi(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function es(r) {
  return r._maxListeners === void 0 ? X.defaultMaxListeners : r._maxListeners;
}
X.prototype.getMaxListeners = function() {
  return es(this);
};
X.prototype.emit = function(e) {
  for (var t = [], i = 1; i < arguments.length; i++)
    t.push(arguments[i]);
  var n = e === "error", a = this._events;
  if (a !== void 0)
    n = n && a.error === void 0;
  else if (!n)
    return !1;
  if (n) {
    var c;
    if (t.length > 0 && (c = t[0]), c instanceof Error)
      throw c;
    var l = new Error("Unhandled error." + (c ? " (" + c.message + ")" : ""));
    throw l.context = c, l;
  }
  var p = a[e];
  if (p === void 0)
    return !1;
  if (typeof p == "function")
    hi(p, this, t);
  else
    for (var h = p.length, g = ns(p, h), i = 0; i < h; ++i)
      hi(g[i], this, t);
  return !0;
};
function ts(r, e, t, i) {
  var n, a, c;
  if (gr(t), a = r._events, a === void 0 ? (a = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (a.newListener !== void 0 && (r.emit(
    "newListener",
    e,
    t.listener ? t.listener : t
  ), a = r._events), c = a[e]), c === void 0)
    c = a[e] = t, ++r._eventsCount;
  else if (typeof c == "function" ? c = a[e] = i ? [t, c] : [c, t] : i ? c.unshift(t) : c.push(t), n = es(r), n > 0 && c.length > n && !c.warned) {
    c.warned = !0;
    var l = new Error("Possible EventEmitter memory leak detected. " + c.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    l.name = "MaxListenersExceededWarning", l.emitter = r, l.type = e, l.count = c.length, Ko(l);
  }
  return r;
}
X.prototype.addListener = function(e, t) {
  return ts(this, e, t, !1);
};
X.prototype.on = X.prototype.addListener;
X.prototype.prependListener = function(e, t) {
  return ts(this, e, t, !0);
};
function Bo() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function rs(r, e, t) {
  var i = { fired: !1, wrapFn: void 0, target: r, type: e, listener: t }, n = Bo.bind(i);
  return n.listener = t, i.wrapFn = n, n;
}
X.prototype.once = function(e, t) {
  return gr(t), this.on(e, rs(this, e, t)), this;
};
X.prototype.prependOnceListener = function(e, t) {
  return gr(t), this.prependListener(e, rs(this, e, t)), this;
};
X.prototype.removeListener = function(e, t) {
  var i, n, a, c, l;
  if (gr(t), n = this._events, n === void 0)
    return this;
  if (i = n[e], i === void 0)
    return this;
  if (i === t || i.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, i.listener || t));
  else if (typeof i != "function") {
    for (a = -1, c = i.length - 1; c >= 0; c--)
      if (i[c] === t || i[c].listener === t) {
        l = i[c].listener, a = c;
        break;
      }
    if (a < 0)
      return this;
    a === 0 ? i.shift() : Ho(i, a), i.length === 1 && (n[e] = i[0]), n.removeListener !== void 0 && this.emit("removeListener", e, l || t);
  }
  return this;
};
X.prototype.off = X.prototype.removeListener;
X.prototype.removeAllListeners = function(e) {
  var t, i, n;
  if (i = this._events, i === void 0)
    return this;
  if (i.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : i[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete i[e]), this;
  if (arguments.length === 0) {
    var a = Object.keys(i), c;
    for (n = 0; n < a.length; ++n)
      c = a[n], c !== "removeListener" && this.removeAllListeners(c);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = i[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (n = t.length - 1; n >= 0; n--)
      this.removeListener(e, t[n]);
  return this;
};
function is(r, e, t) {
  var i = r._events;
  if (i === void 0)
    return [];
  var n = i[e];
  return n === void 0 ? [] : typeof n == "function" ? t ? [n.listener || n] : [n] : t ? ko(n) : ns(n, n.length);
}
X.prototype.listeners = function(e) {
  return is(this, e, !0);
};
X.prototype.rawListeners = function(e) {
  return is(this, e, !1);
};
X.listenerCount = function(r, e) {
  return typeof r.listenerCount == "function" ? r.listenerCount(e) : ss.call(r, e);
};
X.prototype.listenerCount = ss;
function ss(r) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[r];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
X.prototype.eventNames = function() {
  return this._eventsCount > 0 ? or(this._events) : [];
};
function ns(r, e) {
  for (var t = new Array(e), i = 0; i < e; ++i)
    t[i] = r[i];
  return t;
}
function Ho(r, e) {
  for (; e + 1 < r.length; e++)
    r[e] = r[e + 1];
  r.pop();
}
function ko(r) {
  for (var e = new Array(r.length), t = 0; t < e.length; ++t)
    e[t] = r[t].listener || r[t];
  return e;
}
function Go(r, e) {
  return new Promise(function(t, i) {
    function n(c) {
      r.removeListener(e, a), i(c);
    }
    function a() {
      typeof r.removeListener == "function" && r.removeListener("error", n), t([].slice.call(arguments));
    }
    os(r, e, a, { once: !0 }), e !== "error" && Vo(r, n, { once: !0 });
  });
}
function Vo(r, e, t) {
  typeof r.on == "function" && os(r, "error", e, t);
}
function os(r, e, t, i) {
  if (typeof r.on == "function")
    i.once ? r.once(e, t) : r.on(e, t);
  else if (typeof r.addEventListener == "function")
    r.addEventListener(e, function n(a) {
      i.once && r.removeEventListener(e, n), t(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
}
var lt = Kr.exports;
const qo = /* @__PURE__ */ Yi(lt), Yo = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Wo = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Jo = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Xo(r, e) {
  if (r === "__proto__" || r === "constructor" && e && typeof e == "object" && "prototype" in e) {
    Qo(r);
    return;
  }
  return e;
}
function Qo(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function rr(r, e = {}) {
  if (typeof r != "string")
    return r;
  const t = r.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    r[0] === '"' && r.at(-1) === '"' && !r.includes("\\")
  )
    return t.slice(1, -1);
  if (t.length <= 9) {
    const i = t.toLowerCase();
    if (i === "true")
      return !0;
    if (i === "false")
      return !1;
    if (i === "undefined")
      return;
    if (i === "null")
      return null;
    if (i === "nan")
      return Number.NaN;
    if (i === "infinity")
      return Number.POSITIVE_INFINITY;
    if (i === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!Jo.test(r)) {
    if (e.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (Yo.test(r) || Wo.test(r)) {
      if (e.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, Xo);
    }
    return JSON.parse(r);
  } catch (i) {
    if (e.strict)
      throw i;
    return r;
  }
}
function Zo(r) {
  return !r || typeof r.then != "function" ? Promise.resolve(r) : r;
}
function Ue(r, ...e) {
  try {
    return Zo(r(...e));
  } catch (t) {
    return Promise.reject(t);
  }
}
function ea(r) {
  const e = typeof r;
  return r === null || e !== "object" && e !== "function";
}
function ta(r) {
  const e = Object.getPrototypeOf(r);
  return !e || e.isPrototypeOf(Object);
}
function ar(r) {
  if (ea(r))
    return String(r);
  if (ta(r) || Array.isArray(r))
    return JSON.stringify(r);
  if (typeof r.toJSON == "function")
    return ar(r.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
function as() {
  if (typeof Buffer === void 0)
    throw new TypeError("[unstorage] Buffer is not supported!");
}
const Dr = "base64:";
function ra(r) {
  if (typeof r == "string")
    return r;
  as();
  const e = Buffer.from(r).toString("base64");
  return Dr + e;
}
function ia(r) {
  return typeof r != "string" || !r.startsWith(Dr) ? r : (as(), Buffer.from(r.slice(Dr.length), "base64"));
}
function Je(r) {
  return r ? r.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") : "";
}
function sa(...r) {
  return Je(r.join(":"));
}
function ir(r) {
  return r = Je(r), r ? r + ":" : "";
}
const na = "memory", oa = () => {
  const r = /* @__PURE__ */ new Map();
  return {
    name: na,
    options: {},
    hasItem(e) {
      return r.has(e);
    },
    getItem(e) {
      return r.get(e) ?? null;
    },
    getItemRaw(e) {
      return r.get(e) ?? null;
    },
    setItem(e, t) {
      r.set(e, t);
    },
    setItemRaw(e, t) {
      r.set(e, t);
    },
    removeItem(e) {
      r.delete(e);
    },
    getKeys() {
      return Array.from(r.keys());
    },
    clear() {
      r.clear();
    },
    dispose() {
      r.clear();
    }
  };
};
function aa(r = {}) {
  const e = {
    mounts: { "": r.driver || oa() },
    mountpoints: [""],
    watching: !1,
    watchListeners: [],
    unwatch: {}
  }, t = (h) => {
    for (const g of e.mountpoints)
      if (h.startsWith(g))
        return {
          base: g,
          relativeKey: h.slice(g.length),
          driver: e.mounts[g]
        };
    return {
      base: "",
      relativeKey: h,
      driver: e.mounts[""]
    };
  }, i = (h, g) => e.mountpoints.filter(
    (w) => w.startsWith(h) || g && h.startsWith(w)
  ).map((w) => ({
    relativeBase: h.length > w.length ? h.slice(w.length) : void 0,
    mountpoint: w,
    driver: e.mounts[w]
  })), n = (h, g) => {
    if (e.watching) {
      g = Je(g);
      for (const w of e.watchListeners)
        w(h, g);
    }
  }, a = async () => {
    if (!e.watching) {
      e.watching = !0;
      for (const h in e.mounts)
        e.unwatch[h] = await li(
          e.mounts[h],
          n,
          h
        );
    }
  }, c = async () => {
    if (e.watching) {
      for (const h in e.unwatch)
        await e.unwatch[h]();
      e.unwatch = {}, e.watching = !1;
    }
  }, l = (h, g, w) => {
    const I = /* @__PURE__ */ new Map(), R = (x) => {
      let O = I.get(x.base);
      return O || (O = {
        driver: x.driver,
        base: x.base,
        items: []
      }, I.set(x.base, O)), O;
    };
    for (const x of h) {
      const O = typeof x == "string", $ = Je(O ? x : x.key), B = O ? void 0 : x.value, U = O || !x.options ? g : { ...g, ...x.options }, Q = t($);
      R(Q).items.push({
        key: $,
        value: B,
        relativeKey: Q.relativeKey,
        options: U
      });
    }
    return Promise.all([...I.values()].map((x) => w(x))).then(
      (x) => x.flat()
    );
  }, p = {
    // Item
    hasItem(h, g = {}) {
      h = Je(h);
      const { relativeKey: w, driver: I } = t(h);
      return Ue(I.hasItem, w, g);
    },
    getItem(h, g = {}) {
      h = Je(h);
      const { relativeKey: w, driver: I } = t(h);
      return Ue(I.getItem, w, g).then(
        (R) => rr(R)
      );
    },
    getItems(h, g) {
      return l(h, g, (w) => w.driver.getItems ? Ue(
        w.driver.getItems,
        w.items.map((I) => ({
          key: I.relativeKey,
          options: I.options
        })),
        g
      ).then(
        (I) => I.map((R) => ({
          key: sa(w.base, R.key),
          value: rr(R.value)
        }))
      ) : Promise.all(
        w.items.map((I) => Ue(
          w.driver.getItem,
          I.relativeKey,
          I.options
        ).then((R) => ({
          key: I.key,
          value: rr(R)
        })))
      ));
    },
    getItemRaw(h, g = {}) {
      h = Je(h);
      const { relativeKey: w, driver: I } = t(h);
      return I.getItemRaw ? Ue(I.getItemRaw, w, g) : Ue(I.getItem, w, g).then(
        (R) => ia(R)
      );
    },
    async setItem(h, g, w = {}) {
      if (g === void 0)
        return p.removeItem(h);
      h = Je(h);
      const { relativeKey: I, driver: R } = t(h);
      R.setItem && (await Ue(R.setItem, I, ar(g), w), R.watch || n("update", h));
    },
    async setItems(h, g) {
      await l(h, g, async (w) => {
        w.driver.setItems && await Ue(
          w.driver.setItems,
          w.items.map((I) => ({
            key: I.relativeKey,
            value: ar(I.value),
            options: I.options
          })),
          g
        ), w.driver.setItem && await Promise.all(
          w.items.map((I) => Ue(
            w.driver.setItem,
            I.relativeKey,
            ar(I.value),
            I.options
          ))
        );
      });
    },
    async setItemRaw(h, g, w = {}) {
      if (g === void 0)
        return p.removeItem(h, w);
      h = Je(h);
      const { relativeKey: I, driver: R } = t(h);
      if (R.setItemRaw)
        await Ue(R.setItemRaw, I, g, w);
      else if (R.setItem)
        await Ue(R.setItem, I, ra(g), w);
      else
        return;
      R.watch || n("update", h);
    },
    async removeItem(h, g = {}) {
      typeof g == "boolean" && (g = { removeMeta: g }), h = Je(h);
      const { relativeKey: w, driver: I } = t(h);
      I.removeItem && (await Ue(I.removeItem, w, g), (g.removeMeta || g.removeMata) && await Ue(I.removeItem, w + "$", g), I.watch || n("remove", h));
    },
    // Meta
    async getMeta(h, g = {}) {
      typeof g == "boolean" && (g = { nativeOnly: g }), h = Je(h);
      const { relativeKey: w, driver: I } = t(h), R = /* @__PURE__ */ Object.create(null);
      if (I.getMeta && Object.assign(R, await Ue(I.getMeta, w, g)), !g.nativeOnly) {
        const x = await Ue(
          I.getItem,
          w + "$",
          g
        ).then((O) => rr(O));
        x && typeof x == "object" && (typeof x.atime == "string" && (x.atime = new Date(x.atime)), typeof x.mtime == "string" && (x.mtime = new Date(x.mtime)), Object.assign(R, x));
      }
      return R;
    },
    setMeta(h, g, w = {}) {
      return this.setItem(h + "$", g, w);
    },
    removeMeta(h, g = {}) {
      return this.removeItem(h + "$", g);
    },
    // Keys
    async getKeys(h, g = {}) {
      h = ir(h);
      const w = i(h, !0);
      let I = [];
      const R = [];
      for (const x of w) {
        const $ = (await Ue(
          x.driver.getKeys,
          x.relativeBase,
          g
        )).map((B) => x.mountpoint + Je(B)).filter((B) => !I.some((U) => B.startsWith(U)));
        R.push(...$), I = [
          x.mountpoint,
          ...I.filter((B) => !B.startsWith(x.mountpoint))
        ];
      }
      return h ? R.filter((x) => x.startsWith(h) && !x.endsWith("$")) : R.filter((x) => !x.endsWith("$"));
    },
    // Utils
    async clear(h, g = {}) {
      h = ir(h), await Promise.all(
        i(h, !1).map(async (w) => {
          if (w.driver.clear)
            return Ue(w.driver.clear, w.relativeBase, g);
          if (w.driver.removeItem) {
            const I = await w.driver.getKeys(w.relativeBase || "", g);
            return Promise.all(
              I.map((R) => w.driver.removeItem(R, g))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(e.mounts).map((h) => fi(h))
      );
    },
    async watch(h) {
      return await a(), e.watchListeners.push(h), async () => {
        e.watchListeners = e.watchListeners.filter(
          (g) => g !== h
        ), e.watchListeners.length === 0 && await c();
      };
    },
    async unwatch() {
      e.watchListeners = [], await c();
    },
    // Mount
    mount(h, g) {
      if (h = ir(h), h && e.mounts[h])
        throw new Error(`already mounted at ${h}`);
      return h && (e.mountpoints.push(h), e.mountpoints.sort((w, I) => I.length - w.length)), e.mounts[h] = g, e.watching && Promise.resolve(li(g, n, h)).then((w) => {
        e.unwatch[h] = w;
      }).catch(console.error), p;
    },
    async unmount(h, g = !0) {
      h = ir(h), !(!h || !e.mounts[h]) && (e.watching && h in e.unwatch && (e.unwatch[h](), delete e.unwatch[h]), g && await fi(e.mounts[h]), e.mountpoints = e.mountpoints.filter((w) => w !== h), delete e.mounts[h]);
    },
    getMount(h = "") {
      h = Je(h) + ":";
      const g = t(h);
      return {
        driver: g.driver,
        base: g.base
      };
    },
    getMounts(h = "", g = {}) {
      return h = Je(h), i(h, g.parents).map((I) => ({
        driver: I.driver,
        base: I.mountpoint
      }));
    }
  };
  return p;
}
function li(r, e, t) {
  return r.watch ? r.watch((i, n) => e(i, t + n)) : () => {
  };
}
async function fi(r) {
  typeof r.dispose == "function" && await Ue(r.dispose);
}
function Ot(r) {
  return new Promise((e, t) => {
    r.oncomplete = r.onsuccess = () => e(r.result), r.onabort = r.onerror = () => t(r.error);
  });
}
function cs(r, e) {
  const t = indexedDB.open(r);
  t.onupgradeneeded = () => t.result.createObjectStore(e);
  const i = Ot(t);
  return (n, a) => i.then((c) => a(c.transaction(e, n).objectStore(e)));
}
let xr;
function Vt() {
  return xr || (xr = cs("keyval-store", "keyval")), xr;
}
function di(r, e = Vt()) {
  return e("readonly", (t) => Ot(t.get(r)));
}
function ca(r, e, t = Vt()) {
  return t("readwrite", (i) => (i.put(e, r), Ot(i.transaction)));
}
function ha(r, e = Vt()) {
  return e("readwrite", (t) => (t.delete(r), Ot(t.transaction)));
}
function ua(r = Vt()) {
  return r("readwrite", (e) => (e.clear(), Ot(e.transaction)));
}
function la(r, e) {
  return r.openCursor().onsuccess = function() {
    this.result && (e(this.result), this.result.continue());
  }, Ot(r.transaction);
}
function fa(r = Vt()) {
  return r("readonly", (e) => {
    if (e.getAllKeys)
      return Ot(e.getAllKeys());
    const t = [];
    return la(e, (i) => t.push(i.key)).then(() => t);
  });
}
const da = (r) => JSON.stringify(r, (e, t) => typeof t == "bigint" ? t.toString() + "n" : t), ga = (r) => {
  const e = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, t = r.replace(e, '$1"$2n"$3');
  return JSON.parse(t, (i, n) => typeof n == "string" && n.match(/^\d+n$/) ? BigInt(n.substring(0, n.length - 1)) : n);
};
function pr(r) {
  if (typeof r != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof r}`);
  try {
    return ga(r);
  } catch {
    return r;
  }
}
function qt(r) {
  return typeof r == "string" ? r : da(r) || "";
}
const pa = "idb-keyval";
var ya = (r = {}) => {
  const e = r.base && r.base.length > 0 ? `${r.base}:` : "", t = (n) => e + n;
  let i;
  return r.dbName && r.storeName && (i = cs(r.dbName, r.storeName)), { name: pa, options: r, async hasItem(n) {
    return !(typeof await di(t(n), i) > "u");
  }, async getItem(n) {
    return await di(t(n), i) ?? null;
  }, setItem(n, a) {
    return ca(t(n), a, i);
  }, removeItem(n) {
    return ha(t(n), i);
  }, getKeys() {
    return fa(i);
  }, clear() {
    return ua(i);
  } };
};
const ma = "WALLET_CONNECT_V2_INDEXED_DB", ba = "keyvaluestorage";
class va {
  constructor() {
    this.indexedDb = aa({ driver: ya({ dbName: ma, storeName: ba }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((e) => [e.key, e.value]);
  }
  async getItem(e) {
    const t = await this.indexedDb.getItem(e);
    if (t !== null)
      return t;
  }
  async setItem(e, t) {
    await this.indexedDb.setItem(e, qt(t));
  }
  async removeItem(e) {
    await this.indexedDb.removeItem(e);
  }
}
var Ir = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, cr = { exports: {} };
(function() {
  let r;
  function e() {
  }
  r = e, r.prototype.getItem = function(t) {
    return this.hasOwnProperty(t) ? String(this[t]) : null;
  }, r.prototype.setItem = function(t, i) {
    this[t] = String(i);
  }, r.prototype.removeItem = function(t) {
    delete this[t];
  }, r.prototype.clear = function() {
    const t = this;
    Object.keys(t).forEach(function(i) {
      t[i] = void 0, delete t[i];
    });
  }, r.prototype.key = function(t) {
    return t = t || 0, Object.keys(this)[t];
  }, r.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof Ir < "u" && Ir.localStorage ? cr.exports = Ir.localStorage : typeof window < "u" && window.localStorage ? cr.exports = window.localStorage : cr.exports = new e();
})();
function wa(r) {
  var e;
  return [r[0], pr((e = r[1]) != null ? e : "")];
}
class _a {
  constructor() {
    this.localStorage = cr.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(wa);
  }
  async getItem(e) {
    const t = this.localStorage.getItem(e);
    if (t !== null)
      return pr(t);
  }
  async setItem(e, t) {
    this.localStorage.setItem(e, qt(t));
  }
  async removeItem(e) {
    this.localStorage.removeItem(e);
  }
}
const Ea = "wc_storage_version", gi = 1, xa = async (r, e, t) => {
  const i = Ea, n = await e.getItem(i);
  if (n && n >= gi) {
    t(e);
    return;
  }
  const a = await r.getKeys();
  if (!a.length) {
    t(e);
    return;
  }
  const c = [];
  for (; a.length; ) {
    const l = a.shift();
    if (!l)
      continue;
    const p = l.toLowerCase();
    if (p.includes("wc@") || p.includes("walletconnect") || p.includes("wc_") || p.includes("wallet_connect")) {
      const h = await r.getItem(l);
      await e.setItem(l, h), c.push(l);
    }
  }
  await e.setItem(i, gi), t(e), Ia(r, c);
}, Ia = async (r, e) => {
  e.length && e.forEach(async (t) => {
    await r.removeItem(t);
  });
};
let Sa = class {
  constructor() {
    this.initialized = !1, this.setInitialized = (t) => {
      this.storage = t, this.initialized = !0;
    };
    const e = new _a();
    this.storage = e;
    try {
      const t = new va();
      xa(e, t, this.setInitialized);
    } catch {
      this.initialized = !0;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(e) {
    return await this.initialize(), this.storage.getItem(e);
  }
  async setItem(e, t) {
    return await this.initialize(), this.storage.setItem(e, t);
  }
  async removeItem(e) {
    return await this.initialize(), this.storage.removeItem(e);
  }
  async initialize() {
    this.initialized || await new Promise((e) => {
      const t = setInterval(() => {
        this.initialized && (clearInterval(t), e());
      }, 20);
    });
  }
};
var Dt = {}, $t = {}, Sr = {}, jt = {};
let Lt = class {
};
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IEvents: Lt
}, Symbol.toStringTag, { value: "Module" })), Ra = /* @__PURE__ */ lo(Ta);
var pi;
function Oa() {
  if (pi)
    return jt;
  pi = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.IHeartBeat = void 0;
  const r = Ra;
  class e extends r.IEvents {
    constructor(i) {
      super();
    }
  }
  return jt.IHeartBeat = e, jt;
}
var yi;
function hs() {
  return yi || (yi = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), Nt.__exportStar(Oa(), r);
  }(Sr)), Sr;
}
var Tr = {}, Tt = {}, mi;
function La() {
  if (mi)
    return Tt;
  mi = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.HEARTBEAT_EVENTS = Tt.HEARTBEAT_INTERVAL = void 0;
  const r = G;
  return Tt.HEARTBEAT_INTERVAL = r.FIVE_SECONDS, Tt.HEARTBEAT_EVENTS = {
    pulse: "heartbeat_pulse"
  }, Tt;
}
var bi;
function us() {
  return bi || (bi = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), Nt.__exportStar(La(), r);
  }(Tr)), Tr;
}
var vi;
function Pa() {
  if (vi)
    return $t;
  vi = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.HeartBeat = void 0;
  const r = Nt, e = lt, t = G, i = hs(), n = us();
  class a extends i.IHeartBeat {
    constructor(l) {
      super(l), this.events = new e.EventEmitter(), this.interval = n.HEARTBEAT_INTERVAL, this.interval = (l == null ? void 0 : l.interval) || n.HEARTBEAT_INTERVAL;
    }
    static init(l) {
      return r.__awaiter(this, void 0, void 0, function* () {
        const p = new a(l);
        return yield p.init(), p;
      });
    }
    init() {
      return r.__awaiter(this, void 0, void 0, function* () {
        yield this.initialize();
      });
    }
    stop() {
      clearInterval(this.intervalRef);
    }
    on(l, p) {
      this.events.on(l, p);
    }
    once(l, p) {
      this.events.once(l, p);
    }
    off(l, p) {
      this.events.off(l, p);
    }
    removeListener(l, p) {
      this.events.removeListener(l, p);
    }
    initialize() {
      return r.__awaiter(this, void 0, void 0, function* () {
        this.intervalRef = setInterval(() => this.pulse(), t.toMiliseconds(this.interval));
      });
    }
    pulse() {
      this.events.emit(n.HEARTBEAT_EVENTS.pulse);
    }
  }
  return $t.HeartBeat = a, $t;
}
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  const e = Nt;
  e.__exportStar(Pa(), r), e.__exportStar(hs(), r), e.__exportStar(us(), r);
})(Dt);
var Y = {}, Rr, wi;
function Aa() {
  if (wi)
    return Rr;
  wi = 1;
  function r(t) {
    try {
      return JSON.stringify(t);
    } catch {
      return '"[Circular]"';
    }
  }
  Rr = e;
  function e(t, i, n) {
    var a = n && n.stringify || r, c = 1;
    if (typeof t == "object" && t !== null) {
      var l = i.length + c;
      if (l === 1)
        return t;
      var p = new Array(l);
      p[0] = a(t);
      for (var h = 1; h < l; h++)
        p[h] = a(i[h]);
      return p.join(" ");
    }
    if (typeof t != "string")
      return t;
    var g = i.length;
    if (g === 0)
      return t;
    for (var w = "", I = 1 - c, R = -1, x = t && t.length || 0, O = 0; O < x; ) {
      if (t.charCodeAt(O) === 37 && O + 1 < x) {
        switch (R = R > -1 ? R : 0, t.charCodeAt(O + 1)) {
          case 100:
          case 102:
            if (I >= g || i[I] == null)
              break;
            R < O && (w += t.slice(R, O)), w += Number(i[I]), R = O + 2, O++;
            break;
          case 105:
            if (I >= g || i[I] == null)
              break;
            R < O && (w += t.slice(R, O)), w += Math.floor(Number(i[I])), R = O + 2, O++;
            break;
          case 79:
          case 111:
          case 106:
            if (I >= g || i[I] === void 0)
              break;
            R < O && (w += t.slice(R, O));
            var $ = typeof i[I];
            if ($ === "string") {
              w += "'" + i[I] + "'", R = O + 2, O++;
              break;
            }
            if ($ === "function") {
              w += i[I].name || "<anonymous>", R = O + 2, O++;
              break;
            }
            w += a(i[I]), R = O + 2, O++;
            break;
          case 115:
            if (I >= g)
              break;
            R < O && (w += t.slice(R, O)), w += String(i[I]), R = O + 2, O++;
            break;
          case 37:
            R < O && (w += t.slice(R, O)), w += "%", R = O + 2, O++, I--;
            break;
        }
        ++I;
      }
      ++O;
    }
    return R === -1 ? t : (R < x && (w += t.slice(R)), w);
  }
  return Rr;
}
var Or, _i;
function Fa() {
  if (_i)
    return Or;
  _i = 1;
  const r = Aa();
  Or = n;
  const e = V().console || {}, t = {
    mapHttpRequest: x,
    mapHttpResponse: x,
    wrapRequestSerializer: O,
    wrapResponseSerializer: O,
    wrapErrorSerializer: O,
    req: x,
    res: x,
    err: I
  };
  function i(v, S) {
    return Array.isArray(v) ? v.filter(function(j) {
      return j !== "!stdSerializers.err";
    }) : v === !0 ? Object.keys(S) : !1;
  }
  function n(v) {
    v = v || {}, v.browser = v.browser || {};
    const S = v.browser.transmit;
    if (S && typeof S.send != "function")
      throw Error("pino: transmit option must have a send function");
    const P = v.browser.write || e;
    v.browser.write && (v.browser.asObject = !0);
    const j = v.serializers || {}, D = i(v.browser.serialize, j);
    let K = v.browser.serialize;
    Array.isArray(v.browser.serialize) && v.browser.serialize.indexOf("!stdSerializers.err") > -1 && (K = !1);
    const k = ["error", "fatal", "warn", "info", "debug", "trace"];
    typeof P == "function" && (P.error = P.fatal = P.warn = P.info = P.debug = P.trace = P), v.enabled === !1 && (v.level = "silent");
    const le = v.level || "info", y = Object.create(P);
    y.log || (y.log = $), Object.defineProperty(y, "levelVal", {
      get: Z
    }), Object.defineProperty(y, "level", {
      get: ae,
      set: C
    });
    const _ = {
      transmit: S,
      serialize: D,
      asObject: v.browser.asObject,
      levels: k,
      timestamp: R(v)
    };
    y.levels = n.levels, y.level = le, y.setMaxListeners = y.getMaxListeners = y.emit = y.addListener = y.on = y.prependListener = y.once = y.prependOnceListener = y.removeListener = y.removeAllListeners = y.listeners = y.listenerCount = y.eventNames = y.write = y.flush = $, y.serializers = j, y._serialize = D, y._stdErrSerialize = K, y.child = L, S && (y._logEvent = w());
    function Z() {
      return this.level === "silent" ? 1 / 0 : this.levels.values[this.level];
    }
    function ae() {
      return this._level;
    }
    function C(T) {
      if (T !== "silent" && !this.levels.values[T])
        throw Error("unknown level " + T);
      this._level = T, a(_, y, "error", "log"), a(_, y, "fatal", "error"), a(_, y, "warn", "error"), a(_, y, "info", "log"), a(_, y, "debug", "log"), a(_, y, "trace", "log");
    }
    function L(T, F) {
      if (!T)
        throw new Error("missing bindings for child Pino");
      F = F || {}, D && T.serializers && (F.serializers = T.serializers);
      const me = F.serializers;
      if (D && me) {
        var ie = Object.assign({}, j, me), mt = v.browser.serialize === !0 ? Object.keys(ie) : D;
        delete T.serializers, p([T], mt, ie, this._stdErrSerialize);
      }
      function H(Ge) {
        this._childLevel = (Ge._childLevel | 0) + 1, this.error = h(Ge, T, "error"), this.fatal = h(Ge, T, "fatal"), this.warn = h(Ge, T, "warn"), this.info = h(Ge, T, "info"), this.debug = h(Ge, T, "debug"), this.trace = h(Ge, T, "trace"), ie && (this.serializers = ie, this._serialize = mt), S && (this._logEvent = w(
          [].concat(Ge._logEvent.bindings, T)
        ));
      }
      return H.prototype = this, new H(this);
    }
    return y;
  }
  n.levels = {
    values: {
      fatal: 60,
      error: 50,
      warn: 40,
      info: 30,
      debug: 20,
      trace: 10
    },
    labels: {
      10: "trace",
      20: "debug",
      30: "info",
      40: "warn",
      50: "error",
      60: "fatal"
    }
  }, n.stdSerializers = t, n.stdTimeFunctions = Object.assign({}, { nullTime: B, epochTime: U, unixTime: Q, isoTime: oe });
  function a(v, S, P, j) {
    const D = Object.getPrototypeOf(S);
    S[P] = S.levelVal > S.levels.values[P] ? $ : D[P] ? D[P] : e[P] || e[j] || $, c(v, S, P);
  }
  function c(v, S, P) {
    !v.transmit && S[P] === $ || (S[P] = function(j) {
      return function() {
        const K = v.timestamp(), k = new Array(arguments.length), le = Object.getPrototypeOf && Object.getPrototypeOf(this) === e ? e : this;
        for (var y = 0; y < k.length; y++)
          k[y] = arguments[y];
        if (v.serialize && !v.asObject && p(k, this._serialize, this.serializers, this._stdErrSerialize), v.asObject ? j.call(le, l(this, P, k, K)) : j.apply(le, k), v.transmit) {
          const _ = v.transmit.level || S.level, Z = n.levels.values[_], ae = n.levels.values[P];
          if (ae < Z)
            return;
          g(this, {
            ts: K,
            methodLevel: P,
            methodValue: ae,
            transmitLevel: _,
            transmitValue: n.levels.values[v.transmit.level || S.level],
            send: v.transmit.send,
            val: S.levelVal
          }, k);
        }
      };
    }(S[P]));
  }
  function l(v, S, P, j) {
    v._serialize && p(P, v._serialize, v.serializers, v._stdErrSerialize);
    const D = P.slice();
    let K = D[0];
    const k = {};
    j && (k.time = j), k.level = n.levels.values[S];
    let le = (v._childLevel | 0) + 1;
    if (le < 1 && (le = 1), K !== null && typeof K == "object") {
      for (; le-- && typeof D[0] == "object"; )
        Object.assign(k, D.shift());
      K = D.length ? r(D.shift(), D) : void 0;
    } else
      typeof K == "string" && (K = r(D.shift(), D));
    return K !== void 0 && (k.msg = K), k;
  }
  function p(v, S, P, j) {
    for (const D in v)
      if (j && v[D] instanceof Error)
        v[D] = n.stdSerializers.err(v[D]);
      else if (typeof v[D] == "object" && !Array.isArray(v[D]))
        for (const K in v[D])
          S && S.indexOf(K) > -1 && K in P && (v[D][K] = P[K](v[D][K]));
  }
  function h(v, S, P) {
    return function() {
      const j = new Array(1 + arguments.length);
      j[0] = S;
      for (var D = 1; D < j.length; D++)
        j[D] = arguments[D - 1];
      return v[P].apply(this, j);
    };
  }
  function g(v, S, P) {
    const j = S.send, D = S.ts, K = S.methodLevel, k = S.methodValue, le = S.val, y = v._logEvent.bindings;
    p(
      P,
      v._serialize || Object.keys(v.serializers),
      v.serializers,
      v._stdErrSerialize === void 0 ? !0 : v._stdErrSerialize
    ), v._logEvent.ts = D, v._logEvent.messages = P.filter(function(_) {
      return y.indexOf(_) === -1;
    }), v._logEvent.level.label = K, v._logEvent.level.value = k, j(K, v._logEvent, le), v._logEvent = w(y);
  }
  function w(v) {
    return {
      ts: 0,
      messages: [],
      bindings: v || [],
      level: { label: "", value: 0 }
    };
  }
  function I(v) {
    const S = {
      type: v.constructor.name,
      msg: v.message,
      stack: v.stack
    };
    for (const P in v)
      S[P] === void 0 && (S[P] = v[P]);
    return S;
  }
  function R(v) {
    return typeof v.timestamp == "function" ? v.timestamp : v.timestamp === !1 ? B : U;
  }
  function x() {
    return {};
  }
  function O(v) {
    return v;
  }
  function $() {
  }
  function B() {
    return !1;
  }
  function U() {
    return Date.now();
  }
  function Q() {
    return Math.round(Date.now() / 1e3);
  }
  function oe() {
    return new Date(Date.now()).toISOString();
  }
  function V() {
    function v(S) {
      return typeof S < "u" && S;
    }
    try {
      return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
        get: function() {
          return delete Object.prototype.globalThis, this.globalThis = this;
        },
        configurable: !0
      }), globalThis;
    } catch {
      return v(self) || v(window) || v(this) || {};
    }
  }
  return Or;
}
var Rt = {}, Ei;
function ls() {
  return Ei || (Ei = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.PINO_CUSTOM_CONTEXT_KEY = Rt.PINO_LOGGER_DEFAULTS = void 0, Rt.PINO_LOGGER_DEFAULTS = {
    level: "info"
  }, Rt.PINO_CUSTOM_CONTEXT_KEY = "custom_context"), Rt;
}
var qe = {}, xi;
function Ca() {
  if (xi)
    return qe;
  xi = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.generateChildLogger = qe.formatChildLoggerContext = qe.getLoggerContext = qe.setBrowserLoggerContext = qe.getBrowserLoggerContext = qe.getDefaultLoggerOptions = void 0;
  const r = ls();
  function e(l) {
    return Object.assign(Object.assign({}, l), { level: (l == null ? void 0 : l.level) || r.PINO_LOGGER_DEFAULTS.level });
  }
  qe.getDefaultLoggerOptions = e;
  function t(l, p = r.PINO_CUSTOM_CONTEXT_KEY) {
    return l[p] || "";
  }
  qe.getBrowserLoggerContext = t;
  function i(l, p, h = r.PINO_CUSTOM_CONTEXT_KEY) {
    return l[h] = p, l;
  }
  qe.setBrowserLoggerContext = i;
  function n(l, p = r.PINO_CUSTOM_CONTEXT_KEY) {
    let h = "";
    return typeof l.bindings > "u" ? h = t(l, p) : h = l.bindings().context || "", h;
  }
  qe.getLoggerContext = n;
  function a(l, p, h = r.PINO_CUSTOM_CONTEXT_KEY) {
    const g = n(l, h);
    return g.trim() ? `${g}/${p}` : p;
  }
  qe.formatChildLoggerContext = a;
  function c(l, p, h = r.PINO_CUSTOM_CONTEXT_KEY) {
    const g = a(l, p, h), w = l.child({ context: g });
    return i(w, g, h);
  }
  return qe.generateChildLogger = c, qe;
}
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.pino = void 0;
  const e = Nt, t = e.__importDefault(Fa());
  Object.defineProperty(r, "pino", { enumerable: !0, get: function() {
    return t.default;
  } }), e.__exportStar(ls(), r), e.__exportStar(Ca(), r);
})(Y);
class Na extends Lt {
  constructor(e) {
    super(), this.opts = e, this.protocol = "wc", this.version = 2;
  }
}
let Da = class extends Lt {
  constructor(e, t) {
    super(), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
}, Ma = class {
  constructor(e, t) {
    this.logger = e, this.core = t;
  }
};
class za extends Lt {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}
let Ua = class extends Lt {
  constructor(e) {
    super();
  }
};
class $a {
  constructor(e, t, i, n) {
    this.core = e, this.logger = t, this.name = i;
  }
}
class ja extends Lt {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}
class Ka extends Lt {
  constructor(e, t) {
    super(), this.core = e, this.logger = t;
  }
}
class Ba {
  constructor(e, t) {
    this.projectId = e, this.logger = t;
  }
}
let Tu = class {
  constructor(e) {
    this.opts = e, this.protocol = "wc", this.version = 2;
  }
}, Ou = class {
  constructor(e) {
    this.client = e;
  }
};
var Br = {}, fs = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = fo, t = Wi;
  r.DIGEST_LENGTH = 64, r.BLOCK_SIZE = 128;
  var i = (
    /** @class */
    function() {
      function l() {
        this.digestLength = r.DIGEST_LENGTH, this.blockSize = r.BLOCK_SIZE, this._stateHi = new Int32Array(8), this._stateLo = new Int32Array(8), this._tempHi = new Int32Array(16), this._tempLo = new Int32Array(16), this._buffer = new Uint8Array(256), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this.reset();
      }
      return l.prototype._initState = function() {
        this._stateHi[0] = 1779033703, this._stateHi[1] = 3144134277, this._stateHi[2] = 1013904242, this._stateHi[3] = 2773480762, this._stateHi[4] = 1359893119, this._stateHi[5] = 2600822924, this._stateHi[6] = 528734635, this._stateHi[7] = 1541459225, this._stateLo[0] = 4089235720, this._stateLo[1] = 2227873595, this._stateLo[2] = 4271175723, this._stateLo[3] = 1595750129, this._stateLo[4] = 2917565137, this._stateLo[5] = 725511199, this._stateLo[6] = 4215389547, this._stateLo[7] = 327033209;
      }, l.prototype.reset = function() {
        return this._initState(), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this;
      }, l.prototype.clean = function() {
        t.wipe(this._buffer), t.wipe(this._tempHi), t.wipe(this._tempLo), this.reset();
      }, l.prototype.update = function(p, h) {
        if (h === void 0 && (h = p.length), this._finished)
          throw new Error("SHA512: can't update because hash was finished.");
        var g = 0;
        if (this._bytesHashed += h, this._bufferLength > 0) {
          for (; this._bufferLength < r.BLOCK_SIZE && h > 0; )
            this._buffer[this._bufferLength++] = p[g++], h--;
          this._bufferLength === this.blockSize && (a(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize), this._bufferLength = 0);
        }
        for (h >= this.blockSize && (g = a(this._tempHi, this._tempLo, this._stateHi, this._stateLo, p, g, h), h %= this.blockSize); h > 0; )
          this._buffer[this._bufferLength++] = p[g++], h--;
        return this;
      }, l.prototype.finish = function(p) {
        if (!this._finished) {
          var h = this._bytesHashed, g = this._bufferLength, w = h / 536870912 | 0, I = h << 3, R = h % 128 < 112 ? 128 : 256;
          this._buffer[g] = 128;
          for (var x = g + 1; x < R - 8; x++)
            this._buffer[x] = 0;
          e.writeUint32BE(w, this._buffer, R - 8), e.writeUint32BE(I, this._buffer, R - 4), a(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, R), this._finished = !0;
        }
        for (var x = 0; x < this.digestLength / 8; x++)
          e.writeUint32BE(this._stateHi[x], p, x * 8), e.writeUint32BE(this._stateLo[x], p, x * 8 + 4);
        return this;
      }, l.prototype.digest = function() {
        var p = new Uint8Array(this.digestLength);
        return this.finish(p), p;
      }, l.prototype.saveState = function() {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      }, l.prototype.restoreState = function(p) {
        return this._stateHi.set(p.stateHi), this._stateLo.set(p.stateLo), this._bufferLength = p.bufferLength, p.buffer && this._buffer.set(p.buffer), this._bytesHashed = p.bytesHashed, this._finished = !1, this;
      }, l.prototype.cleanSavedState = function(p) {
        t.wipe(p.stateHi), t.wipe(p.stateLo), p.buffer && t.wipe(p.buffer), p.bufferLength = 0, p.bytesHashed = 0;
      }, l;
    }()
  );
  r.SHA512 = i;
  var n = new Int32Array([
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ]);
  function a(l, p, h, g, w, I, R) {
    for (var x = h[0], O = h[1], $ = h[2], B = h[3], U = h[4], Q = h[5], oe = h[6], V = h[7], v = g[0], S = g[1], P = g[2], j = g[3], D = g[4], K = g[5], k = g[6], le = g[7], y, _, Z, ae, C, L, T, F; R >= 128; ) {
      for (var me = 0; me < 16; me++) {
        var ie = 8 * me + I;
        l[me] = e.readUint32BE(w, ie), p[me] = e.readUint32BE(w, ie + 4);
      }
      for (var me = 0; me < 80; me++) {
        var mt = x, H = O, Ge = $, b = B, m = U, d = Q, s = oe, u = V, N = v, M = S, W = P, ee = j, q = D, te = K, $e = k, Se = le;
        if (y = V, _ = le, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = (U >>> 14 | D << 32 - 14) ^ (U >>> 18 | D << 32 - 18) ^ (D >>> 41 - 32 | U << 32 - (41 - 32)), _ = (D >>> 14 | U << 32 - 14) ^ (D >>> 18 | U << 32 - 18) ^ (U >>> 41 - 32 | D << 32 - (41 - 32)), C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, y = U & Q ^ ~U & oe, _ = D & K ^ ~D & k, C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, y = n[me * 2], _ = n[me * 2 + 1], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, y = l[me % 16], _ = p[me % 16], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, Z = T & 65535 | F << 16, ae = C & 65535 | L << 16, y = Z, _ = ae, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = (x >>> 28 | v << 32 - 28) ^ (v >>> 34 - 32 | x << 32 - (34 - 32)) ^ (v >>> 39 - 32 | x << 32 - (39 - 32)), _ = (v >>> 28 | x << 32 - 28) ^ (x >>> 34 - 32 | v << 32 - (34 - 32)) ^ (x >>> 39 - 32 | v << 32 - (39 - 32)), C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, y = x & O ^ x & $ ^ O & $, _ = v & S ^ v & P ^ S & P, C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, u = T & 65535 | F << 16, Se = C & 65535 | L << 16, y = b, _ = ee, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = Z, _ = ae, C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, b = T & 65535 | F << 16, ee = C & 65535 | L << 16, O = mt, $ = H, B = Ge, U = b, Q = m, oe = d, V = s, x = u, S = N, P = M, j = W, D = ee, K = q, k = te, le = $e, v = Se, me % 16 === 15)
          for (var ie = 0; ie < 16; ie++)
            y = l[ie], _ = p[ie], C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = l[(ie + 9) % 16], _ = p[(ie + 9) % 16], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, Z = l[(ie + 1) % 16], ae = p[(ie + 1) % 16], y = (Z >>> 1 | ae << 32 - 1) ^ (Z >>> 8 | ae << 32 - 8) ^ Z >>> 7, _ = (ae >>> 1 | Z << 32 - 1) ^ (ae >>> 8 | Z << 32 - 8) ^ (ae >>> 7 | Z << 32 - 7), C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, Z = l[(ie + 14) % 16], ae = p[(ie + 14) % 16], y = (Z >>> 19 | ae << 32 - 19) ^ (ae >>> 61 - 32 | Z << 32 - (61 - 32)) ^ Z >>> 6, _ = (ae >>> 19 | Z << 32 - 19) ^ (Z >>> 61 - 32 | ae << 32 - (61 - 32)) ^ (ae >>> 6 | Z << 32 - 6), C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, l[ie] = T & 65535 | F << 16, p[ie] = C & 65535 | L << 16;
      }
      y = x, _ = v, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[0], _ = g[0], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[0] = x = T & 65535 | F << 16, g[0] = v = C & 65535 | L << 16, y = O, _ = S, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[1], _ = g[1], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[1] = O = T & 65535 | F << 16, g[1] = S = C & 65535 | L << 16, y = $, _ = P, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[2], _ = g[2], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[2] = $ = T & 65535 | F << 16, g[2] = P = C & 65535 | L << 16, y = B, _ = j, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[3], _ = g[3], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[3] = B = T & 65535 | F << 16, g[3] = j = C & 65535 | L << 16, y = U, _ = D, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[4], _ = g[4], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[4] = U = T & 65535 | F << 16, g[4] = D = C & 65535 | L << 16, y = Q, _ = K, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[5], _ = g[5], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[5] = Q = T & 65535 | F << 16, g[5] = K = C & 65535 | L << 16, y = oe, _ = k, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[6], _ = g[6], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[6] = oe = T & 65535 | F << 16, g[6] = k = C & 65535 | L << 16, y = V, _ = le, C = _ & 65535, L = _ >>> 16, T = y & 65535, F = y >>> 16, y = h[7], _ = g[7], C += _ & 65535, L += _ >>> 16, T += y & 65535, F += y >>> 16, L += C >>> 16, T += L >>> 16, F += T >>> 16, h[7] = V = T & 65535 | F << 16, g[7] = le = C & 65535 | L << 16, I += 128, R -= 128;
    }
    return I;
  }
  function c(l) {
    var p = new i();
    p.update(l);
    var h = p.digest();
    return p.clean(), h;
  }
  r.hash = c;
})(fs);
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.convertSecretKeyToX25519 = r.convertPublicKeyToX25519 = r.verify = r.sign = r.extractPublicKeyFromSecretKey = r.generateKeyPair = r.generateKeyPairFromSeed = r.SEED_LENGTH = r.SECRET_KEY_LENGTH = r.PUBLIC_KEY_LENGTH = r.SIGNATURE_LENGTH = void 0;
  const e = Ji, t = fs, i = Wi;
  r.SIGNATURE_LENGTH = 64, r.PUBLIC_KEY_LENGTH = 32, r.SECRET_KEY_LENGTH = 64, r.SEED_LENGTH = 32;
  function n(b) {
    const m = new Float64Array(16);
    if (b)
      for (let d = 0; d < b.length; d++)
        m[d] = b[d];
    return m;
  }
  const a = new Uint8Array(32);
  a[0] = 9;
  const c = n(), l = n([1]), p = n([
    30883,
    4953,
    19914,
    30187,
    55467,
    16705,
    2637,
    112,
    59544,
    30585,
    16505,
    36039,
    65139,
    11119,
    27886,
    20995
  ]), h = n([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]), g = n([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]), w = n([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]), I = n([
    41136,
    18958,
    6951,
    50414,
    58488,
    44335,
    6150,
    12099,
    55207,
    15867,
    153,
    11085,
    57099,
    20417,
    9344,
    11139
  ]);
  function R(b, m) {
    for (let d = 0; d < 16; d++)
      b[d] = m[d] | 0;
  }
  function x(b) {
    let m = 1;
    for (let d = 0; d < 16; d++) {
      let s = b[d] + m + 65535;
      m = Math.floor(s / 65536), b[d] = s - m * 65536;
    }
    b[0] += m - 1 + 37 * (m - 1);
  }
  function O(b, m, d) {
    const s = ~(d - 1);
    for (let u = 0; u < 16; u++) {
      const N = s & (b[u] ^ m[u]);
      b[u] ^= N, m[u] ^= N;
    }
  }
  function $(b, m) {
    const d = n(), s = n();
    for (let u = 0; u < 16; u++)
      s[u] = m[u];
    x(s), x(s), x(s);
    for (let u = 0; u < 2; u++) {
      d[0] = s[0] - 65517;
      for (let M = 1; M < 15; M++)
        d[M] = s[M] - 65535 - (d[M - 1] >> 16 & 1), d[M - 1] &= 65535;
      d[15] = s[15] - 32767 - (d[14] >> 16 & 1);
      const N = d[15] >> 16 & 1;
      d[14] &= 65535, O(s, d, 1 - N);
    }
    for (let u = 0; u < 16; u++)
      b[2 * u] = s[u] & 255, b[2 * u + 1] = s[u] >> 8;
  }
  function B(b, m) {
    let d = 0;
    for (let s = 0; s < 32; s++)
      d |= b[s] ^ m[s];
    return (1 & d - 1 >>> 8) - 1;
  }
  function U(b, m) {
    const d = new Uint8Array(32), s = new Uint8Array(32);
    return $(d, b), $(s, m), B(d, s);
  }
  function Q(b) {
    const m = new Uint8Array(32);
    return $(m, b), m[0] & 1;
  }
  function oe(b, m) {
    for (let d = 0; d < 16; d++)
      b[d] = m[2 * d] + (m[2 * d + 1] << 8);
    b[15] &= 32767;
  }
  function V(b, m, d) {
    for (let s = 0; s < 16; s++)
      b[s] = m[s] + d[s];
  }
  function v(b, m, d) {
    for (let s = 0; s < 16; s++)
      b[s] = m[s] - d[s];
  }
  function S(b, m, d) {
    let s, u, N = 0, M = 0, W = 0, ee = 0, q = 0, te = 0, $e = 0, Se = 0, je = 0, Oe = 0, Te = 0, be = 0, ye = 0, fe = 0, he = 0, re = 0, ve = 0, Le = 0, se = 0, He = 0, Ve = 0, Xe = 0, Qe = 0, We = 0, nt = 0, ct = 0, bt = 0, Ze = 0, Et = 0, Mt = 0, Wt = 0, we = d[0], de = d[1], _e = d[2], Ee = d[3], xe = d[4], ge = d[5], Pe = d[6], Ae = d[7], Fe = d[8], Ce = d[9], Ne = d[10], Re = d[11], Ie = d[12], ce = d[13], De = d[14], Me = d[15];
    s = m[0], N += s * we, M += s * de, W += s * _e, ee += s * Ee, q += s * xe, te += s * ge, $e += s * Pe, Se += s * Ae, je += s * Fe, Oe += s * Ce, Te += s * Ne, be += s * Re, ye += s * Ie, fe += s * ce, he += s * De, re += s * Me, s = m[1], M += s * we, W += s * de, ee += s * _e, q += s * Ee, te += s * xe, $e += s * ge, Se += s * Pe, je += s * Ae, Oe += s * Fe, Te += s * Ce, be += s * Ne, ye += s * Re, fe += s * Ie, he += s * ce, re += s * De, ve += s * Me, s = m[2], W += s * we, ee += s * de, q += s * _e, te += s * Ee, $e += s * xe, Se += s * ge, je += s * Pe, Oe += s * Ae, Te += s * Fe, be += s * Ce, ye += s * Ne, fe += s * Re, he += s * Ie, re += s * ce, ve += s * De, Le += s * Me, s = m[3], ee += s * we, q += s * de, te += s * _e, $e += s * Ee, Se += s * xe, je += s * ge, Oe += s * Pe, Te += s * Ae, be += s * Fe, ye += s * Ce, fe += s * Ne, he += s * Re, re += s * Ie, ve += s * ce, Le += s * De, se += s * Me, s = m[4], q += s * we, te += s * de, $e += s * _e, Se += s * Ee, je += s * xe, Oe += s * ge, Te += s * Pe, be += s * Ae, ye += s * Fe, fe += s * Ce, he += s * Ne, re += s * Re, ve += s * Ie, Le += s * ce, se += s * De, He += s * Me, s = m[5], te += s * we, $e += s * de, Se += s * _e, je += s * Ee, Oe += s * xe, Te += s * ge, be += s * Pe, ye += s * Ae, fe += s * Fe, he += s * Ce, re += s * Ne, ve += s * Re, Le += s * Ie, se += s * ce, He += s * De, Ve += s * Me, s = m[6], $e += s * we, Se += s * de, je += s * _e, Oe += s * Ee, Te += s * xe, be += s * ge, ye += s * Pe, fe += s * Ae, he += s * Fe, re += s * Ce, ve += s * Ne, Le += s * Re, se += s * Ie, He += s * ce, Ve += s * De, Xe += s * Me, s = m[7], Se += s * we, je += s * de, Oe += s * _e, Te += s * Ee, be += s * xe, ye += s * ge, fe += s * Pe, he += s * Ae, re += s * Fe, ve += s * Ce, Le += s * Ne, se += s * Re, He += s * Ie, Ve += s * ce, Xe += s * De, Qe += s * Me, s = m[8], je += s * we, Oe += s * de, Te += s * _e, be += s * Ee, ye += s * xe, fe += s * ge, he += s * Pe, re += s * Ae, ve += s * Fe, Le += s * Ce, se += s * Ne, He += s * Re, Ve += s * Ie, Xe += s * ce, Qe += s * De, We += s * Me, s = m[9], Oe += s * we, Te += s * de, be += s * _e, ye += s * Ee, fe += s * xe, he += s * ge, re += s * Pe, ve += s * Ae, Le += s * Fe, se += s * Ce, He += s * Ne, Ve += s * Re, Xe += s * Ie, Qe += s * ce, We += s * De, nt += s * Me, s = m[10], Te += s * we, be += s * de, ye += s * _e, fe += s * Ee, he += s * xe, re += s * ge, ve += s * Pe, Le += s * Ae, se += s * Fe, He += s * Ce, Ve += s * Ne, Xe += s * Re, Qe += s * Ie, We += s * ce, nt += s * De, ct += s * Me, s = m[11], be += s * we, ye += s * de, fe += s * _e, he += s * Ee, re += s * xe, ve += s * ge, Le += s * Pe, se += s * Ae, He += s * Fe, Ve += s * Ce, Xe += s * Ne, Qe += s * Re, We += s * Ie, nt += s * ce, ct += s * De, bt += s * Me, s = m[12], ye += s * we, fe += s * de, he += s * _e, re += s * Ee, ve += s * xe, Le += s * ge, se += s * Pe, He += s * Ae, Ve += s * Fe, Xe += s * Ce, Qe += s * Ne, We += s * Re, nt += s * Ie, ct += s * ce, bt += s * De, Ze += s * Me, s = m[13], fe += s * we, he += s * de, re += s * _e, ve += s * Ee, Le += s * xe, se += s * ge, He += s * Pe, Ve += s * Ae, Xe += s * Fe, Qe += s * Ce, We += s * Ne, nt += s * Re, ct += s * Ie, bt += s * ce, Ze += s * De, Et += s * Me, s = m[14], he += s * we, re += s * de, ve += s * _e, Le += s * Ee, se += s * xe, He += s * ge, Ve += s * Pe, Xe += s * Ae, Qe += s * Fe, We += s * Ce, nt += s * Ne, ct += s * Re, bt += s * Ie, Ze += s * ce, Et += s * De, Mt += s * Me, s = m[15], re += s * we, ve += s * de, Le += s * _e, se += s * Ee, He += s * xe, Ve += s * ge, Xe += s * Pe, Qe += s * Ae, We += s * Fe, nt += s * Ce, ct += s * Ne, bt += s * Re, Ze += s * Ie, Et += s * ce, Mt += s * De, Wt += s * Me, N += 38 * ve, M += 38 * Le, W += 38 * se, ee += 38 * He, q += 38 * Ve, te += 38 * Xe, $e += 38 * Qe, Se += 38 * We, je += 38 * nt, Oe += 38 * ct, Te += 38 * bt, be += 38 * Ze, ye += 38 * Et, fe += 38 * Mt, he += 38 * Wt, u = 1, s = N + u + 65535, u = Math.floor(s / 65536), N = s - u * 65536, s = M + u + 65535, u = Math.floor(s / 65536), M = s - u * 65536, s = W + u + 65535, u = Math.floor(s / 65536), W = s - u * 65536, s = ee + u + 65535, u = Math.floor(s / 65536), ee = s - u * 65536, s = q + u + 65535, u = Math.floor(s / 65536), q = s - u * 65536, s = te + u + 65535, u = Math.floor(s / 65536), te = s - u * 65536, s = $e + u + 65535, u = Math.floor(s / 65536), $e = s - u * 65536, s = Se + u + 65535, u = Math.floor(s / 65536), Se = s - u * 65536, s = je + u + 65535, u = Math.floor(s / 65536), je = s - u * 65536, s = Oe + u + 65535, u = Math.floor(s / 65536), Oe = s - u * 65536, s = Te + u + 65535, u = Math.floor(s / 65536), Te = s - u * 65536, s = be + u + 65535, u = Math.floor(s / 65536), be = s - u * 65536, s = ye + u + 65535, u = Math.floor(s / 65536), ye = s - u * 65536, s = fe + u + 65535, u = Math.floor(s / 65536), fe = s - u * 65536, s = he + u + 65535, u = Math.floor(s / 65536), he = s - u * 65536, s = re + u + 65535, u = Math.floor(s / 65536), re = s - u * 65536, N += u - 1 + 37 * (u - 1), u = 1, s = N + u + 65535, u = Math.floor(s / 65536), N = s - u * 65536, s = M + u + 65535, u = Math.floor(s / 65536), M = s - u * 65536, s = W + u + 65535, u = Math.floor(s / 65536), W = s - u * 65536, s = ee + u + 65535, u = Math.floor(s / 65536), ee = s - u * 65536, s = q + u + 65535, u = Math.floor(s / 65536), q = s - u * 65536, s = te + u + 65535, u = Math.floor(s / 65536), te = s - u * 65536, s = $e + u + 65535, u = Math.floor(s / 65536), $e = s - u * 65536, s = Se + u + 65535, u = Math.floor(s / 65536), Se = s - u * 65536, s = je + u + 65535, u = Math.floor(s / 65536), je = s - u * 65536, s = Oe + u + 65535, u = Math.floor(s / 65536), Oe = s - u * 65536, s = Te + u + 65535, u = Math.floor(s / 65536), Te = s - u * 65536, s = be + u + 65535, u = Math.floor(s / 65536), be = s - u * 65536, s = ye + u + 65535, u = Math.floor(s / 65536), ye = s - u * 65536, s = fe + u + 65535, u = Math.floor(s / 65536), fe = s - u * 65536, s = he + u + 65535, u = Math.floor(s / 65536), he = s - u * 65536, s = re + u + 65535, u = Math.floor(s / 65536), re = s - u * 65536, N += u - 1 + 37 * (u - 1), b[0] = N, b[1] = M, b[2] = W, b[3] = ee, b[4] = q, b[5] = te, b[6] = $e, b[7] = Se, b[8] = je, b[9] = Oe, b[10] = Te, b[11] = be, b[12] = ye, b[13] = fe, b[14] = he, b[15] = re;
  }
  function P(b, m) {
    S(b, m, m);
  }
  function j(b, m) {
    const d = n();
    let s;
    for (s = 0; s < 16; s++)
      d[s] = m[s];
    for (s = 253; s >= 0; s--)
      P(d, d), s !== 2 && s !== 4 && S(d, d, m);
    for (s = 0; s < 16; s++)
      b[s] = d[s];
  }
  function D(b, m) {
    const d = n();
    let s;
    for (s = 0; s < 16; s++)
      d[s] = m[s];
    for (s = 250; s >= 0; s--)
      P(d, d), s !== 1 && S(d, d, m);
    for (s = 0; s < 16; s++)
      b[s] = d[s];
  }
  function K(b, m) {
    const d = n(), s = n(), u = n(), N = n(), M = n(), W = n(), ee = n(), q = n(), te = n();
    v(d, b[1], b[0]), v(te, m[1], m[0]), S(d, d, te), V(s, b[0], b[1]), V(te, m[0], m[1]), S(s, s, te), S(u, b[3], m[3]), S(u, u, h), S(N, b[2], m[2]), V(N, N, N), v(M, s, d), v(W, N, u), V(ee, N, u), V(q, s, d), S(b[0], M, W), S(b[1], q, ee), S(b[2], ee, W), S(b[3], M, q);
  }
  function k(b, m, d) {
    for (let s = 0; s < 4; s++)
      O(b[s], m[s], d);
  }
  function le(b, m) {
    const d = n(), s = n(), u = n();
    j(u, m[2]), S(d, m[0], u), S(s, m[1], u), $(b, s), b[31] ^= Q(d) << 7;
  }
  function y(b, m, d) {
    R(b[0], c), R(b[1], l), R(b[2], l), R(b[3], c);
    for (let s = 255; s >= 0; --s) {
      const u = d[s / 8 | 0] >> (s & 7) & 1;
      k(b, m, u), K(m, b), K(b, b), k(b, m, u);
    }
  }
  function _(b, m) {
    const d = [n(), n(), n(), n()];
    R(d[0], g), R(d[1], w), R(d[2], l), S(d[3], g, w), y(b, d, m);
  }
  function Z(b) {
    if (b.length !== r.SEED_LENGTH)
      throw new Error(`ed25519: seed must be ${r.SEED_LENGTH} bytes`);
    const m = (0, t.hash)(b);
    m[0] &= 248, m[31] &= 127, m[31] |= 64;
    const d = new Uint8Array(32), s = [n(), n(), n(), n()];
    _(s, m), le(d, s);
    const u = new Uint8Array(64);
    return u.set(b), u.set(d, 32), {
      publicKey: d,
      secretKey: u
    };
  }
  r.generateKeyPairFromSeed = Z;
  function ae(b) {
    const m = (0, e.randomBytes)(32, b), d = Z(m);
    return (0, i.wipe)(m), d;
  }
  r.generateKeyPair = ae;
  function C(b) {
    if (b.length !== r.SECRET_KEY_LENGTH)
      throw new Error(`ed25519: secret key must be ${r.SECRET_KEY_LENGTH} bytes`);
    return new Uint8Array(b.subarray(32));
  }
  r.extractPublicKeyFromSecretKey = C;
  const L = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]);
  function T(b, m) {
    let d, s, u, N;
    for (s = 63; s >= 32; --s) {
      for (d = 0, u = s - 32, N = s - 12; u < N; ++u)
        m[u] += d - 16 * m[s] * L[u - (s - 32)], d = Math.floor((m[u] + 128) / 256), m[u] -= d * 256;
      m[u] += d, m[s] = 0;
    }
    for (d = 0, u = 0; u < 32; u++)
      m[u] += d - (m[31] >> 4) * L[u], d = m[u] >> 8, m[u] &= 255;
    for (u = 0; u < 32; u++)
      m[u] -= d * L[u];
    for (s = 0; s < 32; s++)
      m[s + 1] += m[s] >> 8, b[s] = m[s] & 255;
  }
  function F(b) {
    const m = new Float64Array(64);
    for (let d = 0; d < 64; d++)
      m[d] = b[d];
    for (let d = 0; d < 64; d++)
      b[d] = 0;
    T(b, m);
  }
  function me(b, m) {
    const d = new Float64Array(64), s = [n(), n(), n(), n()], u = (0, t.hash)(b.subarray(0, 32));
    u[0] &= 248, u[31] &= 127, u[31] |= 64;
    const N = new Uint8Array(64);
    N.set(u.subarray(32), 32);
    const M = new t.SHA512();
    M.update(N.subarray(32)), M.update(m);
    const W = M.digest();
    M.clean(), F(W), _(s, W), le(N, s), M.reset(), M.update(N.subarray(0, 32)), M.update(b.subarray(32)), M.update(m);
    const ee = M.digest();
    F(ee);
    for (let q = 0; q < 32; q++)
      d[q] = W[q];
    for (let q = 0; q < 32; q++)
      for (let te = 0; te < 32; te++)
        d[q + te] += ee[q] * u[te];
    return T(N.subarray(32), d), N;
  }
  r.sign = me;
  function ie(b, m) {
    const d = n(), s = n(), u = n(), N = n(), M = n(), W = n(), ee = n();
    return R(b[2], l), oe(b[1], m), P(u, b[1]), S(N, u, p), v(u, u, b[2]), V(N, b[2], N), P(M, N), P(W, M), S(ee, W, M), S(d, ee, u), S(d, d, N), D(d, d), S(d, d, u), S(d, d, N), S(d, d, N), S(b[0], d, N), P(s, b[0]), S(s, s, N), U(s, u) && S(b[0], b[0], I), P(s, b[0]), S(s, s, N), U(s, u) ? -1 : (Q(b[0]) === m[31] >> 7 && v(b[0], c, b[0]), S(b[3], b[0], b[1]), 0);
  }
  function mt(b, m, d) {
    const s = new Uint8Array(32), u = [n(), n(), n(), n()], N = [n(), n(), n(), n()];
    if (d.length !== r.SIGNATURE_LENGTH)
      throw new Error(`ed25519: signature must be ${r.SIGNATURE_LENGTH} bytes`);
    if (ie(N, b))
      return !1;
    const M = new t.SHA512();
    M.update(d.subarray(0, 32)), M.update(b), M.update(m);
    const W = M.digest();
    return F(W), y(u, N, W), _(N, d.subarray(32)), K(u, N), le(s, u), !B(d, s);
  }
  r.verify = mt;
  function H(b) {
    let m = [n(), n(), n(), n()];
    if (ie(m, b))
      throw new Error("Ed25519: invalid public key");
    let d = n(), s = n(), u = m[1];
    V(d, l, u), v(s, l, u), j(s, s), S(d, d, s);
    let N = new Uint8Array(32);
    return $(N, d), N;
  }
  r.convertPublicKeyToX25519 = H;
  function Ge(b) {
    const m = (0, t.hash)(b.subarray(0, 32));
    m[0] &= 248, m[31] &= 127, m[31] |= 64;
    const d = new Uint8Array(m.subarray(0, 32));
    return (0, i.wipe)(m), d;
  }
  r.convertSecretKeyToX25519 = Ge;
})(Br);
const Ha = "EdDSA", ka = "JWT", ds = ".", gs = "base64url", Ga = "utf8", Va = "utf8", qa = ":", Ya = "did", Wa = "key", Ii = "base58btc", Ja = "z", Xa = "K36", Qa = 32;
function ur(r) {
  return dr(jr(qt(r), Ga), gs);
}
function ps(r) {
  const e = jr(Xa, Ii), t = Ja + dr(go([e, r]), Ii);
  return [Ya, Wa, t].join(qa);
}
function Za(r) {
  return dr(r, gs);
}
function ec(r) {
  return jr([ur(r.header), ur(r.payload)].join(ds), Va);
}
function tc(r) {
  return [
    ur(r.header),
    ur(r.payload),
    Za(r.signature)
  ].join(ds);
}
function Si(r = Ji.randomBytes(Qa)) {
  return Br.generateKeyPairFromSeed(r);
}
async function rc(r, e, t, i, n = G.fromMiliseconds(Date.now())) {
  const a = { alg: Ha, typ: ka }, c = ps(i.publicKey), l = n + t, p = { iss: c, sub: r, aud: e, iat: n, exp: l }, h = ec({ header: a, payload: p }), g = Br.sign(i.secretKey, h);
  return tc({ header: a, payload: p, signature: g });
}
const ic = "PARSE_ERROR", sc = "INVALID_REQUEST", nc = "METHOD_NOT_FOUND", oc = "INVALID_PARAMS", ys = "INTERNAL_ERROR", Hr = "SERVER_ERROR", ac = [-32700, -32600, -32601, -32602, -32603], kt = {
  [ic]: { code: -32700, message: "Parse error" },
  [sc]: { code: -32600, message: "Invalid Request" },
  [nc]: { code: -32601, message: "Method not found" },
  [oc]: { code: -32602, message: "Invalid params" },
  [ys]: { code: -32603, message: "Internal error" },
  [Hr]: { code: -32e3, message: "Server error" }
}, ms = Hr;
function cc(r) {
  return ac.includes(r);
}
function Ti(r) {
  return Object.keys(kt).includes(r) ? kt[r] : kt[ms];
}
function hc(r) {
  const e = Object.values(kt).find((t) => t.code === r);
  return e || kt[ms];
}
function uc(r, e, t) {
  return r.message.includes("getaddrinfo ENOTFOUND") || r.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${t} RPC url at ${e}`) : r;
}
var bs = {}, gt = {}, Ri;
function lc() {
  if (Ri)
    return gt;
  Ri = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.isBrowserCryptoAvailable = gt.getSubtleCrypto = gt.getBrowerCrypto = void 0;
  function r() {
    return (ut === null || ut === void 0 ? void 0 : ut.crypto) || (ut === null || ut === void 0 ? void 0 : ut.msCrypto) || {};
  }
  gt.getBrowerCrypto = r;
  function e() {
    const i = r();
    return i.subtle || i.webkitSubtle;
  }
  gt.getSubtleCrypto = e;
  function t() {
    return !!r() && !!e();
  }
  return gt.isBrowserCryptoAvailable = t, gt;
}
var pt = {}, Oi;
function fc() {
  if (Oi)
    return pt;
  Oi = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.isBrowser = pt.isNode = pt.isReactNative = void 0;
  function r() {
    return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative";
  }
  pt.isReactNative = r;
  function e() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
  }
  pt.isNode = e;
  function t() {
    return !r() && !e();
  }
  return pt.isBrowser = t, pt;
}
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  const e = Nt;
  e.__exportStar(lc(), r), e.__exportStar(fc(), r);
})(bs);
function vs(r = 3) {
  const e = Date.now() * Math.pow(10, r), t = Math.floor(Math.random() * Math.pow(10, r));
  return e + t;
}
function ws(r = 6) {
  return BigInt(vs(r));
}
function kr(r, e, t) {
  return {
    id: t || vs(),
    jsonrpc: "2.0",
    method: r,
    params: e
  };
}
function _s(r, e) {
  return {
    id: r,
    jsonrpc: "2.0",
    result: e
  };
}
function Es(r, e, t) {
  return {
    id: r,
    jsonrpc: "2.0",
    error: dc(e, t)
  };
}
function dc(r, e) {
  return typeof r > "u" ? Ti(ys) : (typeof r == "string" && (r = Object.assign(Object.assign({}, Ti(Hr)), { message: r })), typeof e < "u" && (r.data = e), cc(r.code) && (r = hc(r.code)), r);
}
class gc {
}
class pc extends gc {
  constructor() {
    super();
  }
}
class yc extends pc {
  constructor(e) {
    super();
  }
}
const mc = "^wss?:";
function bc(r) {
  const e = r.match(new RegExp(/^\w+:/, "gi"));
  if (!(!e || !e.length))
    return e[0];
}
function vc(r, e) {
  const t = bc(r);
  return typeof t > "u" ? !1 : new RegExp(e).test(t);
}
function Li(r) {
  return vc(r, mc);
}
function wc(r) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(r);
}
function xs(r) {
  return typeof r == "object" && "id" in r && "jsonrpc" in r && r.jsonrpc === "2.0";
}
function Is(r) {
  return xs(r) && "method" in r;
}
function Gr(r) {
  return xs(r) && (Ss(r) || yr(r));
}
function Ss(r) {
  return "result" in r;
}
function yr(r) {
  return "error" in r;
}
class _c extends yc {
  constructor(e) {
    super(e), this.events = new lt.EventEmitter(), this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(e), this.connection.connected && this.registerEventListeners();
  }
  async connect(e = this.connection) {
    await this.open(e);
  }
  async disconnect() {
    await this.close();
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async request(e, t) {
    return this.requestStrict(kr(e.method, e.params || [], e.id || ws().toString()), t);
  }
  async requestStrict(e, t) {
    return new Promise(async (i, n) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (a) {
          n(a);
        }
      this.events.on(`${e.id}`, (a) => {
        yr(a) ? n(a.error) : i(a.result);
      });
      try {
        await this.connection.send(e, t);
      } catch (a) {
        n(a);
      }
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit("payload", e), Gr(e) ? this.events.emit(`${e.id}`, e) : this.events.emit("message", {
      type: e.method,
      data: e.params
    });
  }
  onClose(e) {
    e && e.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${e.code} ${e.reason ? `(${e.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(e = this.connection) {
    this.connection === e && this.connection.connected || (this.connection.connected && this.close(), typeof e == "string" && (await this.connection.open(e), e = this.connection), this.connection = this.setConnection(e), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (e) => this.onPayload(e)), this.connection.on("close", (e) => this.onClose(e)), this.connection.on("error", (e) => this.events.emit("error", e)), this.connection.on("register_error", (e) => this.onClose()), this.hasRegisteredEventListeners = !0);
  }
}
const Ec = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws"), xc = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", Pi = (r) => r.split("?")[0], Ai = 10, Ic = Ec();
class Sc {
  constructor(e) {
    if (this.url = e, this.events = new lt.EventEmitter(), this.registering = !1, !Li(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (i) => {
        this.onClose(i), e();
      }, this.socket.close();
    });
  }
  async send(e) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(qt(e));
    } catch (t) {
      this.onError(e.id, t);
    }
  }
  register(e = this.url) {
    if (!Li(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((i, n) => {
        this.events.once("register_error", (a) => {
          this.resetMaxListeners(), n(a);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u")
            return n(new Error("WebSocket connection is missing or invalid"));
          i(this.socket);
        });
      });
    }
    return this.url = e, this.registering = !0, new Promise((t, i) => {
      const n = new URLSearchParams(e).get("origin"), a = bs.isReactNative() ? { headers: { origin: n } } : { rejectUnauthorized: !wc(e) }, c = new Ic(e, [], a);
      xc() ? c.onerror = (l) => {
        const p = l;
        i(this.emitError(p.error));
      } : c.on("error", (l) => {
        i(this.emitError(l));
      }), c.onopen = () => {
        this.onOpen(c), t(c);
      };
    });
  }
  onOpen(e) {
    e.onmessage = (t) => this.onPayload(t), e.onclose = (t) => this.onClose(t), this.socket = e, this.registering = !1, this.events.emit("open");
  }
  onClose(e) {
    this.socket = void 0, this.registering = !1, this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u")
      return;
    const t = typeof e.data == "string" ? pr(e.data) : e.data;
    this.events.emit("payload", t);
  }
  onError(e, t) {
    const i = this.parseError(t), n = i.message || i.toString(), a = Es(e, n);
    this.events.emit("payload", a);
  }
  parseError(e, t = this.url) {
    return uc(e, Pi(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Ai && this.events.setMaxListeners(Ai);
  }
  emitError(e) {
    const t = this.parseError(new Error((e == null ? void 0 : e.message) || `WebSocket connection failed for host: ${Pi(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
}
var lr = { exports: {} };
lr.exports;
(function(r, e) {
  var t = 200, i = "__lodash_hash_undefined__", n = 1, a = 2, c = 9007199254740991, l = "[object Arguments]", p = "[object Array]", h = "[object AsyncFunction]", g = "[object Boolean]", w = "[object Date]", I = "[object Error]", R = "[object Function]", x = "[object GeneratorFunction]", O = "[object Map]", $ = "[object Number]", B = "[object Null]", U = "[object Object]", Q = "[object Promise]", oe = "[object Proxy]", V = "[object RegExp]", v = "[object Set]", S = "[object String]", P = "[object Symbol]", j = "[object Undefined]", D = "[object WeakMap]", K = "[object ArrayBuffer]", k = "[object DataView]", le = "[object Float32Array]", y = "[object Float64Array]", _ = "[object Int8Array]", Z = "[object Int16Array]", ae = "[object Int32Array]", C = "[object Uint8Array]", L = "[object Uint8ClampedArray]", T = "[object Uint16Array]", F = "[object Uint32Array]", me = /[\\^$.*+?()[\]{}|]/g, ie = /^\[object .+?Constructor\]$/, mt = /^(?:0|[1-9]\d*)$/, H = {};
  H[le] = H[y] = H[_] = H[Z] = H[ae] = H[C] = H[L] = H[T] = H[F] = !0, H[l] = H[p] = H[K] = H[g] = H[k] = H[w] = H[I] = H[R] = H[O] = H[$] = H[U] = H[V] = H[v] = H[S] = H[D] = !1;
  var Ge = typeof ut == "object" && ut && ut.Object === Object && ut, b = typeof self == "object" && self && self.Object === Object && self, m = Ge || b || Function("return this")(), d = e && !e.nodeType && e, s = d && !0 && r && !r.nodeType && r, u = s && s.exports === d, N = u && Ge.process, M = function() {
    try {
      return N && N.binding && N.binding("util");
    } catch {
    }
  }(), W = M && M.isTypedArray;
  function ee(o, f) {
    for (var E = -1, A = o == null ? 0 : o.length, ne = 0, z = []; ++E < A; ) {
      var pe = o[E];
      f(pe, E, o) && (z[ne++] = pe);
    }
    return z;
  }
  function q(o, f) {
    for (var E = -1, A = f.length, ne = o.length; ++E < A; )
      o[ne + E] = f[E];
    return o;
  }
  function te(o, f) {
    for (var E = -1, A = o == null ? 0 : o.length; ++E < A; )
      if (f(o[E], E, o))
        return !0;
    return !1;
  }
  function $e(o, f) {
    for (var E = -1, A = Array(o); ++E < o; )
      A[E] = f(E);
    return A;
  }
  function Se(o) {
    return function(f) {
      return o(f);
    };
  }
  function je(o, f) {
    return o.has(f);
  }
  function Oe(o, f) {
    return o == null ? void 0 : o[f];
  }
  function Te(o) {
    var f = -1, E = Array(o.size);
    return o.forEach(function(A, ne) {
      E[++f] = [ne, A];
    }), E;
  }
  function be(o, f) {
    return function(E) {
      return o(f(E));
    };
  }
  function ye(o) {
    var f = -1, E = Array(o.size);
    return o.forEach(function(A) {
      E[++f] = A;
    }), E;
  }
  var fe = Array.prototype, he = Function.prototype, re = Object.prototype, ve = m["__core-js_shared__"], Le = he.toString, se = re.hasOwnProperty, He = function() {
    var o = /[^.]+$/.exec(ve && ve.keys && ve.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), Ve = re.toString, Xe = RegExp(
    "^" + Le.call(se).replace(me, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Qe = u ? m.Buffer : void 0, We = m.Symbol, nt = m.Uint8Array, ct = re.propertyIsEnumerable, bt = fe.splice, Ze = We ? We.toStringTag : void 0, Et = Object.getOwnPropertySymbols, Mt = Qe ? Qe.isBuffer : void 0, Wt = be(Object.keys, Object), we = Pt(m, "DataView"), de = Pt(m, "Map"), _e = Pt(m, "Promise"), Ee = Pt(m, "Set"), xe = Pt(m, "WeakMap"), ge = Pt(Object, "create"), Pe = It(we), Ae = It(de), Fe = It(_e), Ce = It(Ee), Ne = It(xe), Re = We ? We.prototype : void 0, Ie = Re ? Re.valueOf : void 0;
  function ce(o) {
    var f = -1, E = o == null ? 0 : o.length;
    for (this.clear(); ++f < E; ) {
      var A = o[f];
      this.set(A[0], A[1]);
    }
  }
  function De() {
    this.__data__ = ge ? ge(null) : {}, this.size = 0;
  }
  function Me(o) {
    var f = this.has(o) && delete this.__data__[o];
    return this.size -= f ? 1 : 0, f;
  }
  function In(o) {
    var f = this.__data__;
    if (ge) {
      var E = f[o];
      return E === i ? void 0 : E;
    }
    return se.call(f, o) ? f[o] : void 0;
  }
  function Sn(o) {
    var f = this.__data__;
    return ge ? f[o] !== void 0 : se.call(f, o);
  }
  function Tn(o, f) {
    var E = this.__data__;
    return this.size += this.has(o) ? 0 : 1, E[o] = ge && f === void 0 ? i : f, this;
  }
  ce.prototype.clear = De, ce.prototype.delete = Me, ce.prototype.get = In, ce.prototype.has = Sn, ce.prototype.set = Tn;
  function ft(o) {
    var f = -1, E = o == null ? 0 : o.length;
    for (this.clear(); ++f < E; ) {
      var A = o[f];
      this.set(A[0], A[1]);
    }
  }
  function Rn() {
    this.__data__ = [], this.size = 0;
  }
  function On(o) {
    var f = this.__data__, E = Xt(f, o);
    if (E < 0)
      return !1;
    var A = f.length - 1;
    return E == A ? f.pop() : bt.call(f, E, 1), --this.size, !0;
  }
  function Ln(o) {
    var f = this.__data__, E = Xt(f, o);
    return E < 0 ? void 0 : f[E][1];
  }
  function Pn(o) {
    return Xt(this.__data__, o) > -1;
  }
  function An(o, f) {
    var E = this.__data__, A = Xt(E, o);
    return A < 0 ? (++this.size, E.push([o, f])) : E[A][1] = f, this;
  }
  ft.prototype.clear = Rn, ft.prototype.delete = On, ft.prototype.get = Ln, ft.prototype.has = Pn, ft.prototype.set = An;
  function xt(o) {
    var f = -1, E = o == null ? 0 : o.length;
    for (this.clear(); ++f < E; ) {
      var A = o[f];
      this.set(A[0], A[1]);
    }
  }
  function Fn() {
    this.size = 0, this.__data__ = {
      hash: new ce(),
      map: new (de || ft)(),
      string: new ce()
    };
  }
  function Cn(o) {
    var f = Qt(this, o).delete(o);
    return this.size -= f ? 1 : 0, f;
  }
  function Nn(o) {
    return Qt(this, o).get(o);
  }
  function Dn(o) {
    return Qt(this, o).has(o);
  }
  function Mn(o, f) {
    var E = Qt(this, o), A = E.size;
    return E.set(o, f), this.size += E.size == A ? 0 : 1, this;
  }
  xt.prototype.clear = Fn, xt.prototype.delete = Cn, xt.prototype.get = Nn, xt.prototype.has = Dn, xt.prototype.set = Mn;
  function Jt(o) {
    var f = -1, E = o == null ? 0 : o.length;
    for (this.__data__ = new xt(); ++f < E; )
      this.add(o[f]);
  }
  function zn(o) {
    return this.__data__.set(o, i), this;
  }
  function Un(o) {
    return this.__data__.has(o);
  }
  Jt.prototype.add = Jt.prototype.push = zn, Jt.prototype.has = Un;
  function vt(o) {
    var f = this.__data__ = new ft(o);
    this.size = f.size;
  }
  function $n() {
    this.__data__ = new ft(), this.size = 0;
  }
  function jn(o) {
    var f = this.__data__, E = f.delete(o);
    return this.size = f.size, E;
  }
  function Kn(o) {
    return this.__data__.get(o);
  }
  function Bn(o) {
    return this.__data__.has(o);
  }
  function Hn(o, f) {
    var E = this.__data__;
    if (E instanceof ft) {
      var A = E.__data__;
      if (!de || A.length < t - 1)
        return A.push([o, f]), this.size = ++E.size, this;
      E = this.__data__ = new xt(A);
    }
    return E.set(o, f), this.size = E.size, this;
  }
  vt.prototype.clear = $n, vt.prototype.delete = jn, vt.prototype.get = Kn, vt.prototype.has = Bn, vt.prototype.set = Hn;
  function kn(o, f) {
    var E = Zt(o), A = !E && no(o), ne = !E && !A && wr(o), z = !E && !A && !ne && ri(o), pe = E || A || ne || z, ze = pe ? $e(o.length, String) : [], Ke = ze.length;
    for (var ue in o)
      (f || se.call(o, ue)) && !(pe && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ue == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ne && (ue == "offset" || ue == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      z && (ue == "buffer" || ue == "byteLength" || ue == "byteOffset") || // Skip index properties.
      eo(ue, Ke))) && ze.push(ue);
    return ze;
  }
  function Xt(o, f) {
    for (var E = o.length; E--; )
      if (Qr(o[E][0], f))
        return E;
    return -1;
  }
  function Gn(o, f, E) {
    var A = f(o);
    return Zt(o) ? A : q(A, E(o));
  }
  function zt(o) {
    return o == null ? o === void 0 ? j : B : Ze && Ze in Object(o) ? Qn(o) : so(o);
  }
  function Yr(o) {
    return Ut(o) && zt(o) == l;
  }
  function Wr(o, f, E, A, ne) {
    return o === f ? !0 : o == null || f == null || !Ut(o) && !Ut(f) ? o !== o && f !== f : Vn(o, f, E, A, Wr, ne);
  }
  function Vn(o, f, E, A, ne, z) {
    var pe = Zt(o), ze = Zt(f), Ke = pe ? p : wt(o), ue = ze ? p : wt(f);
    Ke = Ke == l ? U : Ke, ue = ue == l ? U : ue;
    var et = Ke == U, ot = ue == U, ke = Ke == ue;
    if (ke && wr(o)) {
      if (!wr(f))
        return !1;
      pe = !0, et = !1;
    }
    if (ke && !et)
      return z || (z = new vt()), pe || ri(o) ? Jr(o, f, E, A, ne, z) : Jn(o, f, Ke, E, A, ne, z);
    if (!(E & n)) {
      var tt = et && se.call(o, "__wrapped__"), rt = ot && se.call(f, "__wrapped__");
      if (tt || rt) {
        var _t = tt ? o.value() : o, dt = rt ? f.value() : f;
        return z || (z = new vt()), ne(_t, dt, E, A, z);
      }
    }
    return ke ? (z || (z = new vt()), Xn(o, f, E, A, ne, z)) : !1;
  }
  function qn(o) {
    if (!ti(o) || ro(o))
      return !1;
    var f = Zr(o) ? Xe : ie;
    return f.test(It(o));
  }
  function Yn(o) {
    return Ut(o) && ei(o.length) && !!H[zt(o)];
  }
  function Wn(o) {
    if (!io(o))
      return Wt(o);
    var f = [];
    for (var E in Object(o))
      se.call(o, E) && E != "constructor" && f.push(E);
    return f;
  }
  function Jr(o, f, E, A, ne, z) {
    var pe = E & n, ze = o.length, Ke = f.length;
    if (ze != Ke && !(pe && Ke > ze))
      return !1;
    var ue = z.get(o);
    if (ue && z.get(f))
      return ue == f;
    var et = -1, ot = !0, ke = E & a ? new Jt() : void 0;
    for (z.set(o, f), z.set(f, o); ++et < ze; ) {
      var tt = o[et], rt = f[et];
      if (A)
        var _t = pe ? A(rt, tt, et, f, o, z) : A(tt, rt, et, o, f, z);
      if (_t !== void 0) {
        if (_t)
          continue;
        ot = !1;
        break;
      }
      if (ke) {
        if (!te(f, function(dt, St) {
          if (!je(ke, St) && (tt === dt || ne(tt, dt, E, A, z)))
            return ke.push(St);
        })) {
          ot = !1;
          break;
        }
      } else if (!(tt === rt || ne(tt, rt, E, A, z))) {
        ot = !1;
        break;
      }
    }
    return z.delete(o), z.delete(f), ot;
  }
  function Jn(o, f, E, A, ne, z, pe) {
    switch (E) {
      case k:
        if (o.byteLength != f.byteLength || o.byteOffset != f.byteOffset)
          return !1;
        o = o.buffer, f = f.buffer;
      case K:
        return !(o.byteLength != f.byteLength || !z(new nt(o), new nt(f)));
      case g:
      case w:
      case $:
        return Qr(+o, +f);
      case I:
        return o.name == f.name && o.message == f.message;
      case V:
      case S:
        return o == f + "";
      case O:
        var ze = Te;
      case v:
        var Ke = A & n;
        if (ze || (ze = ye), o.size != f.size && !Ke)
          return !1;
        var ue = pe.get(o);
        if (ue)
          return ue == f;
        A |= a, pe.set(o, f);
        var et = Jr(ze(o), ze(f), A, ne, z, pe);
        return pe.delete(o), et;
      case P:
        if (Ie)
          return Ie.call(o) == Ie.call(f);
    }
    return !1;
  }
  function Xn(o, f, E, A, ne, z) {
    var pe = E & n, ze = Xr(o), Ke = ze.length, ue = Xr(f), et = ue.length;
    if (Ke != et && !pe)
      return !1;
    for (var ot = Ke; ot--; ) {
      var ke = ze[ot];
      if (!(pe ? ke in f : se.call(f, ke)))
        return !1;
    }
    var tt = z.get(o);
    if (tt && z.get(f))
      return tt == f;
    var rt = !0;
    z.set(o, f), z.set(f, o);
    for (var _t = pe; ++ot < Ke; ) {
      ke = ze[ot];
      var dt = o[ke], St = f[ke];
      if (A)
        var ii = pe ? A(St, dt, ke, f, o, z) : A(dt, St, ke, o, f, z);
      if (!(ii === void 0 ? dt === St || ne(dt, St, E, A, z) : ii)) {
        rt = !1;
        break;
      }
      _t || (_t = ke == "constructor");
    }
    if (rt && !_t) {
      var er = o.constructor, tr = f.constructor;
      er != tr && "constructor" in o && "constructor" in f && !(typeof er == "function" && er instanceof er && typeof tr == "function" && tr instanceof tr) && (rt = !1);
    }
    return z.delete(o), z.delete(f), rt;
  }
  function Xr(o) {
    return Gn(o, co, Zn);
  }
  function Qt(o, f) {
    var E = o.__data__;
    return to(f) ? E[typeof f == "string" ? "string" : "hash"] : E.map;
  }
  function Pt(o, f) {
    var E = Oe(o, f);
    return qn(E) ? E : void 0;
  }
  function Qn(o) {
    var f = se.call(o, Ze), E = o[Ze];
    try {
      o[Ze] = void 0;
      var A = !0;
    } catch {
    }
    var ne = Ve.call(o);
    return A && (f ? o[Ze] = E : delete o[Ze]), ne;
  }
  var Zn = Et ? function(o) {
    return o == null ? [] : (o = Object(o), ee(Et(o), function(f) {
      return ct.call(o, f);
    }));
  } : ho, wt = zt;
  (we && wt(new we(new ArrayBuffer(1))) != k || de && wt(new de()) != O || _e && wt(_e.resolve()) != Q || Ee && wt(new Ee()) != v || xe && wt(new xe()) != D) && (wt = function(o) {
    var f = zt(o), E = f == U ? o.constructor : void 0, A = E ? It(E) : "";
    if (A)
      switch (A) {
        case Pe:
          return k;
        case Ae:
          return O;
        case Fe:
          return Q;
        case Ce:
          return v;
        case Ne:
          return D;
      }
    return f;
  });
  function eo(o, f) {
    return f = f ?? c, !!f && (typeof o == "number" || mt.test(o)) && o > -1 && o % 1 == 0 && o < f;
  }
  function to(o) {
    var f = typeof o;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? o !== "__proto__" : o === null;
  }
  function ro(o) {
    return !!He && He in o;
  }
  function io(o) {
    var f = o && o.constructor, E = typeof f == "function" && f.prototype || re;
    return o === E;
  }
  function so(o) {
    return Ve.call(o);
  }
  function It(o) {
    if (o != null) {
      try {
        return Le.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function Qr(o, f) {
    return o === f || o !== o && f !== f;
  }
  var no = Yr(function() {
    return arguments;
  }()) ? Yr : function(o) {
    return Ut(o) && se.call(o, "callee") && !ct.call(o, "callee");
  }, Zt = Array.isArray;
  function oo(o) {
    return o != null && ei(o.length) && !Zr(o);
  }
  var wr = Mt || uo;
  function ao(o, f) {
    return Wr(o, f);
  }
  function Zr(o) {
    if (!ti(o))
      return !1;
    var f = zt(o);
    return f == R || f == x || f == h || f == oe;
  }
  function ei(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= c;
  }
  function ti(o) {
    var f = typeof o;
    return o != null && (f == "object" || f == "function");
  }
  function Ut(o) {
    return o != null && typeof o == "object";
  }
  var ri = W ? Se(W) : Yn;
  function co(o) {
    return oo(o) ? kn(o) : Wn(o);
  }
  function ho() {
    return [];
  }
  function uo() {
    return !1;
  }
  r.exports = ao;
})(lr, lr.exports);
var Tc = lr.exports;
const Rc = /* @__PURE__ */ Yi(Tc);
function Oc(r, e) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i = 0; i < t.length; i++)
    t[i] = 255;
  for (var n = 0; n < r.length; n++) {
    var a = r.charAt(n), c = a.charCodeAt(0);
    if (t[c] !== 255)
      throw new TypeError(a + " is ambiguous");
    t[c] = n;
  }
  var l = r.length, p = r.charAt(0), h = Math.log(l) / Math.log(256), g = Math.log(256) / Math.log(l);
  function w(x) {
    if (x instanceof Uint8Array || (ArrayBuffer.isView(x) ? x = new Uint8Array(x.buffer, x.byteOffset, x.byteLength) : Array.isArray(x) && (x = Uint8Array.from(x))), !(x instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (x.length === 0)
      return "";
    for (var O = 0, $ = 0, B = 0, U = x.length; B !== U && x[B] === 0; )
      B++, O++;
    for (var Q = (U - B) * g + 1 >>> 0, oe = new Uint8Array(Q); B !== U; ) {
      for (var V = x[B], v = 0, S = Q - 1; (V !== 0 || v < $) && S !== -1; S--, v++)
        V += 256 * oe[S] >>> 0, oe[S] = V % l >>> 0, V = V / l >>> 0;
      if (V !== 0)
        throw new Error("Non-zero carry");
      $ = v, B++;
    }
    for (var P = Q - $; P !== Q && oe[P] === 0; )
      P++;
    for (var j = p.repeat(O); P < Q; ++P)
      j += r.charAt(oe[P]);
    return j;
  }
  function I(x) {
    if (typeof x != "string")
      throw new TypeError("Expected String");
    if (x.length === 0)
      return new Uint8Array();
    var O = 0;
    if (x[O] !== " ") {
      for (var $ = 0, B = 0; x[O] === p; )
        $++, O++;
      for (var U = (x.length - O) * h + 1 >>> 0, Q = new Uint8Array(U); x[O]; ) {
        var oe = t[x.charCodeAt(O)];
        if (oe === 255)
          return;
        for (var V = 0, v = U - 1; (oe !== 0 || V < B) && v !== -1; v--, V++)
          oe += l * Q[v] >>> 0, Q[v] = oe % 256 >>> 0, oe = oe / 256 >>> 0;
        if (oe !== 0)
          throw new Error("Non-zero carry");
        B = V, O++;
      }
      if (x[O] !== " ") {
        for (var S = U - B; S !== U && Q[S] === 0; )
          S++;
        for (var P = new Uint8Array($ + (U - S)), j = $; S !== U; )
          P[j++] = Q[S++];
        return P;
      }
    }
  }
  function R(x) {
    var O = I(x);
    if (O)
      return O;
    throw new Error(`Non-${e} character`);
  }
  return { encode: w, decodeUnsafe: I, decode: R };
}
var Lc = Oc, Pc = Lc;
const Ts = (r) => {
  if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
    return r;
  if (r instanceof ArrayBuffer)
    return new Uint8Array(r);
  if (ArrayBuffer.isView(r))
    return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Ac = (r) => new TextEncoder().encode(r), Fc = (r) => new TextDecoder().decode(r);
class Cc {
  constructor(e, t, i) {
    this.name = e, this.prefix = t, this.baseEncode = i;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Nc {
  constructor(e, t, i) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Rs(this, e);
  }
}
class Dc {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Rs(this, e);
  }
  decode(e) {
    const t = e[0], i = this.decoders[t];
    if (i)
      return i.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const Rs = (r, e) => new Dc({ ...r.decoders || { [r.prefix]: r }, ...e.decoders || { [e.prefix]: e } });
class Mc {
  constructor(e, t, i, n) {
    this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = n, this.encoder = new Cc(e, t, i), this.decoder = new Nc(e, t, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const mr = ({ name: r, prefix: e, encode: t, decode: i }) => new Mc(r, e, t, i), Yt = ({ prefix: r, name: e, alphabet: t }) => {
  const { encode: i, decode: n } = Pc(t, e);
  return mr({ prefix: r, name: e, encode: i, decode: (a) => Ts(n(a)) });
}, zc = (r, e, t, i) => {
  const n = {};
  for (let g = 0; g < e.length; ++g)
    n[e[g]] = g;
  let a = r.length;
  for (; r[a - 1] === "="; )
    --a;
  const c = new Uint8Array(a * t / 8 | 0);
  let l = 0, p = 0, h = 0;
  for (let g = 0; g < a; ++g) {
    const w = n[r[g]];
    if (w === void 0)
      throw new SyntaxError(`Non-${i} character`);
    p = p << t | w, l += t, l >= 8 && (l -= 8, c[h++] = 255 & p >> l);
  }
  if (l >= t || 255 & p << 8 - l)
    throw new SyntaxError("Unexpected end of data");
  return c;
}, Uc = (r, e, t) => {
  const i = e[e.length - 1] === "=", n = (1 << t) - 1;
  let a = "", c = 0, l = 0;
  for (let p = 0; p < r.length; ++p)
    for (l = l << 8 | r[p], c += 8; c > t; )
      c -= t, a += e[n & l >> c];
  if (c && (a += e[n & l << t - c]), i)
    for (; a.length * t & 7; )
      a += "=";
  return a;
}, Be = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i }) => mr({ prefix: e, name: r, encode(n) {
  return Uc(n, i, t);
}, decode(n) {
  return zc(n, i, t, r);
} }), $c = mr({ prefix: "\0", name: "identity", encode: (r) => Fc(r), decode: (r) => Ac(r) });
var jc = Object.freeze({ __proto__: null, identity: $c });
const Kc = Be({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var Bc = Object.freeze({ __proto__: null, base2: Kc });
const Hc = Be({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var kc = Object.freeze({ __proto__: null, base8: Hc });
const Gc = Yt({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Vc = Object.freeze({ __proto__: null, base10: Gc });
const qc = Be({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Yc = Be({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wc = Object.freeze({ __proto__: null, base16: qc, base16upper: Yc });
const Jc = Be({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Xc = Be({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Qc = Be({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Zc = Be({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), eh = Be({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), th = Be({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), rh = Be({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), ih = Be({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), sh = Be({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var nh = Object.freeze({ __proto__: null, base32: Jc, base32upper: Xc, base32pad: Qc, base32padupper: Zc, base32hex: eh, base32hexupper: th, base32hexpad: rh, base32hexpadupper: ih, base32z: sh });
const oh = Yt({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), ah = Yt({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ch = Object.freeze({ __proto__: null, base36: oh, base36upper: ah });
const hh = Yt({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), uh = Yt({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var lh = Object.freeze({ __proto__: null, base58btc: hh, base58flickr: uh });
const fh = Be({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), dh = Be({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), gh = Be({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), ph = Be({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var yh = Object.freeze({ __proto__: null, base64: fh, base64pad: dh, base64url: gh, base64urlpad: ph });
const Os = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), mh = Os.reduce((r, e, t) => (r[t] = e, r), []), bh = Os.reduce((r, e, t) => (r[e.codePointAt(0)] = t, r), []);
function vh(r) {
  return r.reduce((e, t) => (e += mh[t], e), "");
}
function wh(r) {
  const e = [];
  for (const t of r) {
    const i = bh[t.codePointAt(0)];
    if (i === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(i);
  }
  return new Uint8Array(e);
}
const _h = mr({ prefix: "🚀", name: "base256emoji", encode: vh, decode: wh });
var Eh = Object.freeze({ __proto__: null, base256emoji: _h }), xh = Ls, Fi = 128, Ih = 127, Sh = ~Ih, Th = Math.pow(2, 31);
function Ls(r, e, t) {
  e = e || [], t = t || 0;
  for (var i = t; r >= Th; )
    e[t++] = r & 255 | Fi, r /= 128;
  for (; r & Sh; )
    e[t++] = r & 255 | Fi, r >>>= 7;
  return e[t] = r | 0, Ls.bytes = t - i + 1, e;
}
var Rh = Mr, Oh = 128, Ci = 127;
function Mr(r, i) {
  var t = 0, i = i || 0, n = 0, a = i, c, l = r.length;
  do {
    if (a >= l)
      throw Mr.bytes = 0, new RangeError("Could not decode varint");
    c = r[a++], t += n < 28 ? (c & Ci) << n : (c & Ci) * Math.pow(2, n), n += 7;
  } while (c >= Oh);
  return Mr.bytes = a - i, t;
}
var Lh = Math.pow(2, 7), Ph = Math.pow(2, 14), Ah = Math.pow(2, 21), Fh = Math.pow(2, 28), Ch = Math.pow(2, 35), Nh = Math.pow(2, 42), Dh = Math.pow(2, 49), Mh = Math.pow(2, 56), zh = Math.pow(2, 63), Uh = function(r) {
  return r < Lh ? 1 : r < Ph ? 2 : r < Ah ? 3 : r < Fh ? 4 : r < Ch ? 5 : r < Nh ? 6 : r < Dh ? 7 : r < Mh ? 8 : r < zh ? 9 : 10;
}, $h = { encode: xh, decode: Rh, encodingLength: Uh }, Ps = $h;
const Ni = (r, e, t = 0) => (Ps.encode(r, e, t), e), Di = (r) => Ps.encodingLength(r), zr = (r, e) => {
  const t = e.byteLength, i = Di(r), n = i + Di(t), a = new Uint8Array(n + t);
  return Ni(r, a, 0), Ni(t, a, i), a.set(e, n), new jh(r, t, e, a);
};
class jh {
  constructor(e, t, i, n) {
    this.code = e, this.size = t, this.digest = i, this.bytes = n;
  }
}
const As = ({ name: r, code: e, encode: t }) => new Kh(r, e, t);
class Kh {
  constructor(e, t, i) {
    this.name = e, this.code = t, this.encode = i;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? zr(this.code, t) : t.then((i) => zr(this.code, i));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const Fs = (r) => async (e) => new Uint8Array(await crypto.subtle.digest(r, e)), Bh = As({ name: "sha2-256", code: 18, encode: Fs("SHA-256") }), Hh = As({ name: "sha2-512", code: 19, encode: Fs("SHA-512") });
var kh = Object.freeze({ __proto__: null, sha256: Bh, sha512: Hh });
const Cs = 0, Gh = "identity", Ns = Ts, Vh = (r) => zr(Cs, Ns(r)), qh = { code: Cs, name: Gh, encode: Ns, digest: Vh };
var Yh = Object.freeze({ __proto__: null, identity: qh });
new TextEncoder(), new TextDecoder();
const Mi = { ...jc, ...Bc, ...kc, ...Vc, ...Wc, ...nh, ...ch, ...lh, ...yh, ...Eh };
({ ...kh, ...Yh });
function Ds(r) {
  return globalThis.Buffer != null ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r;
}
function Wh(r = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Ds(globalThis.Buffer.allocUnsafe(r)) : new Uint8Array(r);
}
function Ms(r, e, t, i) {
  return { name: r, prefix: e, encoder: { name: r, prefix: e, encode: t }, decoder: { decode: i } };
}
const zi = Ms("utf8", "u", (r) => "u" + new TextDecoder("utf8").decode(r), (r) => new TextEncoder().encode(r.substring(1))), Lr = Ms("ascii", "a", (r) => {
  let e = "a";
  for (let t = 0; t < r.length; t++)
    e += String.fromCharCode(r[t]);
  return e;
}, (r) => {
  r = r.substring(1);
  const e = Wh(r.length);
  for (let t = 0; t < r.length; t++)
    e[t] = r.charCodeAt(t);
  return e;
}), Jh = { utf8: zi, "utf-8": zi, hex: Mi.base16, latin1: Lr, ascii: Lr, binary: Lr, ...Mi };
function Xh(r, e = "utf8") {
  const t = Jh[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Ds(globalThis.Buffer.from(r, "utf-8")) : t.decoder.decode(`${t.prefix}${r}`);
}
const Vr = "wc", zs = 2, br = "core", yt = `${Vr}@2:${br}:`, Us = { name: br, logger: "error" }, $s = { database: ":memory:" }, js = "crypto", Ur = "client_ed25519_seed", Ks = G.ONE_DAY, Bs = "keychain", Hs = "0.3", ks = "messages", Gs = "0.3", Vs = G.SIX_HOURS, qs = "publisher", Ys = "irn", Ws = "error", qr = "wss://relay.walletconnect.com", $r = "wss://relay.walletconnect.org", Js = "relayer", Ye = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, Xs = "_subscription", ht = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, Qs = G.ONE_SECOND, Qh = { database: ":memory:" }, Zs = "2.10.6", en = 1e4, tn = "0.3", rn = "WALLETCONNECT_CLIENT_ID", st = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, Zh = G.THIRTY_DAYS, sn = "subscription", nn = "0.3", on = G.FIVE_SECONDS * 1e3, an = "pairing", cn = "0.3", eu = G.THIRTY_DAYS, At = { wc_pairingDelete: { req: { ttl: G.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: G.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: G.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: G.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: G.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: G.ONE_DAY, prompt: !1, tag: 0 } } }, Ht = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, at = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, hn = "history", un = "0.3", ln = "expirer", it = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, fn = "0.3", tu = G.ONE_DAY, hr = "verify-api", Ft = "https://verify.walletconnect.com", fr = "https://verify.walletconnect.org", dn = [Ft, fr];
class gn {
  constructor(e, t) {
    this.core = e, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = Bs, this.version = Hs, this.initialized = !1, this.storagePrefix = yt, this.init = async () => {
      if (!this.initialized) {
        const i = await this.getKeyChain();
        typeof i < "u" && (this.keychain = i), this.initialized = !0;
      }
    }, this.has = (i) => (this.isInitialized(), this.keychain.has(i)), this.set = async (i, n) => {
      this.isInitialized(), this.keychain.set(i, n), await this.persist();
    }, this.get = (i) => {
      this.isInitialized();
      const n = this.keychain.get(i);
      if (typeof n > "u") {
        const { message: a } = J("NO_MATCHING_KEY", `${this.name}: ${i}`);
        throw new Error(a);
      }
      return n;
    }, this.del = async (i) => {
      this.isInitialized(), this.keychain.delete(i), await this.persist();
    }, this.core = e, this.logger = Y.generateChildLogger(t, this.name);
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, Xi(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? Qi(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class pn {
  constructor(e, t, i) {
    this.core = e, this.logger = t, this.name = js, this.initialized = !1, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }, this.hasKeys = (n) => (this.isInitialized(), this.keychain.has(n)), this.getClientId = async () => {
      this.isInitialized();
      const n = await this.getClientSeed(), a = Si(n);
      return ps(a.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const n = po();
      return this.setPrivateKey(n.publicKey, n.privateKey);
    }, this.signJWT = async (n) => {
      this.isInitialized();
      const a = await this.getClientSeed(), c = Si(a), l = Ar();
      return await rc(l, n, Ks, c);
    }, this.generateSharedKey = (n, a, c) => {
      this.isInitialized();
      const l = this.getPrivateKey(n), p = yo(l, a);
      return this.setSymKey(p, c);
    }, this.setSymKey = async (n, a) => {
      this.isInitialized();
      const c = a || mo(n);
      return await this.keychain.set(c, n), c;
    }, this.deleteKeyPair = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.deleteSymKey = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.encode = async (n, a, c) => {
      this.isInitialized();
      const l = bo(c), p = qt(a);
      if (si(l)) {
        const I = l.senderPublicKey, R = l.receiverPublicKey;
        n = await this.generateSharedKey(I, R);
      }
      const h = this.getSymKey(n), { type: g, senderPublicKey: w } = l;
      return vo({ type: g, symKey: h, message: p, senderPublicKey: w });
    }, this.decode = async (n, a, c) => {
      this.isInitialized();
      const l = wo(a, c);
      if (si(l)) {
        const p = l.receiverPublicKey, h = l.senderPublicKey;
        n = await this.generateSharedKey(p, h);
      }
      try {
        const p = this.getSymKey(n), h = _o({ symKey: p, encoded: a });
        return pr(h);
      } catch (p) {
        this.logger.error(`Failed to decode message from topic: '${n}', clientId: '${await this.getClientId()}'`), this.logger.error(p);
      }
    }, this.getPayloadType = (n) => {
      const a = ni(n);
      return Eo(a.type);
    }, this.getPayloadSenderPublicKey = (n) => {
      const a = ni(n);
      return a.senderPublicKey ? dr(a.senderPublicKey, jo) : void 0;
    }, this.core = e, this.logger = Y.generateChildLogger(t, this.name), this.keychain = i || new gn(this.core, this.logger);
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Ur);
    } catch {
      e = Ar(), await this.keychain.set(Ur, e);
    }
    return Xh(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class yn extends Ma {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = ks, this.version = Gs, this.initialized = !1, this.storagePrefix = yt, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i = await this.getRelayerMessages();
          typeof i < "u" && (this.messages = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
        } finally {
          this.initialized = !0;
        }
      }
    }, this.set = async (i, n) => {
      this.isInitialized();
      const a = Fr(n);
      let c = this.messages.get(i);
      return typeof c > "u" && (c = {}), typeof c[a] < "u" || (c[a] = n, this.messages.set(i, c), await this.persist()), a;
    }, this.get = (i) => {
      this.isInitialized();
      let n = this.messages.get(i);
      return typeof n > "u" && (n = {}), n;
    }, this.has = (i, n) => {
      this.isInitialized();
      const a = this.get(i), c = Fr(n);
      return typeof a[c] < "u";
    }, this.del = async (i) => {
      this.isInitialized(), this.messages.delete(i), await this.persist();
    }, this.logger = Y.generateChildLogger(e, this.name), this.core = t;
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, Xi(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? Qi(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class ru extends za {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.events = new lt.EventEmitter(), this.name = qs, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = G.toMiliseconds(G.TEN_SECONDS), this.needsTransportRestart = !1, this.publish = async (i, n, a) => {
      var c;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: n, opts: a } });
      try {
        const l = (a == null ? void 0 : a.ttl) || Vs, p = Cr(a), h = (a == null ? void 0 : a.prompt) || !1, g = (a == null ? void 0 : a.tag) || 0, w = (a == null ? void 0 : a.id) || ws().toString(), I = { topic: i, message: n, opts: { ttl: l, relay: p, prompt: h, tag: g, id: w } }, R = setTimeout(() => this.queue.set(w, I), this.publishTimeout);
        try {
          await await Gt(this.rpcPublish(i, n, l, p, h, g, w), this.publishTimeout, "Failed to publish payload, please try again."), this.removeRequestFromQueue(w), this.relayer.events.emit(Ye.publish, I);
        } catch (x) {
          if (this.logger.debug("Publishing Payload stalled"), this.needsTransportRestart = !0, (c = a == null ? void 0 : a.internal) != null && c.throwOnFailedPublish)
            throw this.removeRequestFromQueue(w), x;
          return;
        } finally {
          clearTimeout(R);
        }
        this.logger.debug("Successfully Published Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: n, opts: a } });
      } catch (l) {
        throw this.logger.debug("Failed to Publish Payload"), this.logger.error(l), l;
      }
    }, this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.relayer = e, this.logger = Y.generateChildLogger(t, this.name), this.registerEventListeners();
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  rpcPublish(e, t, i, n, a, c, l) {
    var p, h, g, w;
    const I = { method: sr(n.protocol).publish, params: { topic: e, message: t, ttl: i, prompt: a, tag: c }, id: l };
    return Nr((p = I.params) == null ? void 0 : p.prompt) && ((h = I.params) == null || delete h.prompt), Nr((g = I.params) == null ? void 0 : g.tag) && ((w = I.params) == null || delete w.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: I }), this.relayer.request(I);
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e) => {
      const { topic: t, message: i, opts: n } = e;
      await this.publish(t, i, n);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Dt.HEARTBEAT_EVENTS.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(Ye.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(Ye.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
class iu {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e, t) => {
      const i = this.get(e);
      this.exists(e, t) || this.map.set(e, [...i, t]);
    }, this.get = (e) => this.map.get(e) || [], this.exists = (e, t) => this.get(e).includes(t), this.delete = (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e))
        return;
      const i = this.get(e);
      if (!this.exists(e, t))
        return;
      const n = i.filter((a) => a !== t);
      if (!n.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, n);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var su = Object.defineProperty, nu = Object.defineProperties, ou = Object.getOwnPropertyDescriptors, Ui = Object.getOwnPropertySymbols, au = Object.prototype.hasOwnProperty, cu = Object.prototype.propertyIsEnumerable, $i = (r, e, t) => e in r ? su(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Kt = (r, e) => {
  for (var t in e || (e = {}))
    au.call(e, t) && $i(r, t, e[t]);
  if (Ui)
    for (var t of Ui(e))
      cu.call(e, t) && $i(r, t, e[t]);
  return r;
}, Pr = (r, e) => nu(r, ou(e));
class mn extends ja {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new iu(), this.events = new lt.EventEmitter(), this.name = sn, this.version = nn, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = !1, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = yt, this.subscribeTimeout = 1e4, this.restartInProgress = !1, this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId());
    }, this.subscribe = async (i, n) => {
      await this.restartToComplete(), this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: n } });
      try {
        const a = Cr(n), c = { topic: i, relay: a };
        this.pending.set(i, c);
        const l = await this.rpcSubscribe(i, a);
        return this.onSubscribe(l, c), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: n } }), l;
      } catch (a) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(a), a;
      }
    }, this.unsubscribe = async (i, n) => {
      await this.restartToComplete(), this.isInitialized(), typeof (n == null ? void 0 : n.id) < "u" ? await this.unsubscribeById(i, n.id, n) : await this.unsubscribeByTopic(i, n);
    }, this.isSubscribed = async (i) => this.topics.includes(i) ? !0 : await new Promise((n, a) => {
      const c = new G.Watch();
      c.start(this.pendingSubscriptionWatchLabel);
      const l = setInterval(() => {
        !this.pending.has(i) && this.topics.includes(i) && (clearInterval(l), c.stop(this.pendingSubscriptionWatchLabel), n(!0)), c.elapsed(this.pendingSubscriptionWatchLabel) >= on && (clearInterval(l), c.stop(this.pendingSubscriptionWatchLabel), a(new Error("Subscription resolution timeout")));
      }, this.pollingInterval);
    }).catch(() => !1), this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.restart = async () => {
      this.restartInProgress = !0, await this.restore(), await this.reset(), this.restartInProgress = !1;
    }, this.relayer = e, this.logger = Y.generateChildLogger(t, this.name), this.clientId = "";
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, t) {
    let i = !1;
    try {
      i = this.getSubscription(e).topic === t;
    } catch {
    }
    return i;
  }
  onEnable() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const i = this.topicMap.get(e);
    await Promise.all(i.map(async (n) => await this.unsubscribeById(e, n, t)));
  }
  async unsubscribeById(e, t, i) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
    try {
      const n = Cr(i);
      await this.rpcUnsubscribe(e, t, n);
      const a = Bt("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, a), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
    } catch (n) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(n), n;
    }
  }
  async rpcSubscribe(e, t) {
    const i = { method: sr(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    try {
      await await Gt(this.relayer.request(i), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(Ye.connection_stalled);
    }
    return Fr(e + this.clientId);
  }
  async rpcBatchSubscribe(e) {
    if (!e.length)
      return;
    const t = e[0].relay, i = { method: sr(t.protocol).batchSubscribe, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    try {
      return await await Gt(this.relayer.request(i), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(Ye.connection_stalled);
    }
  }
  rpcUnsubscribe(e, t, i) {
    const n = { method: sr(i.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n }), this.relayer.request(n);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, Pr(Kt({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, Kt({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, i) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.subscriptions.has(e) || (this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t));
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, Kt({}, t)), this.topicMap.set(t.topic, e), this.events.emit(st.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: i } = J("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const i = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(st.deleted, Pr(Kt({}, i), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(st.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let t = 0; t < e; t++) {
        const i = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i);
      }
    }
    this.events.emit(st.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = J("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (!e.length)
      return;
    const t = await this.rpcBatchSubscribe(e);
    xo(t) && this.onBatchSubscribe(t.map((i, n) => Pr(Kt({}, e[n]), { id: i })));
  }
  async onConnect() {
    this.restartInProgress || (await this.restart(), this.onEnable());
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (!this.initialized || this.relayer.transportExplicitlyClosed)
      return;
    const e = [];
    this.pending.forEach((t) => {
      e.push(t);
    }), await this.batchSubscribe(e);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Dt.HEARTBEAT_EVENTS.pulse, async () => {
      await this.checkPending();
    }), this.relayer.on(Ye.connect, async () => {
      await this.onConnect();
    }), this.relayer.on(Ye.disconnect, () => {
      this.onDisconnect();
    }), this.events.on(st.created, async (e) => {
      const t = st.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    }), this.events.on(st.deleted, async (e) => {
      const t = st.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    this.restartInProgress && await new Promise((e) => {
      const t = setInterval(() => {
        this.restartInProgress || (clearInterval(t), e());
      }, this.pollingInterval);
    });
  }
}
var hu = Object.defineProperty, ji = Object.getOwnPropertySymbols, uu = Object.prototype.hasOwnProperty, lu = Object.prototype.propertyIsEnumerable, Ki = (r, e, t) => e in r ? hu(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, fu = (r, e) => {
  for (var t in e || (e = {}))
    uu.call(e, t) && Ki(r, t, e[t]);
  if (ji)
    for (var t of ji(e))
      lu.call(e, t) && Ki(r, t, e[t]);
  return r;
};
class bn extends Ua {
  constructor(e) {
    super(e), this.protocol = "wc", this.version = 2, this.events = new lt.EventEmitter(), this.name = Js, this.transportExplicitlyClosed = !1, this.initialized = !1, this.connectionAttemptInProgress = !1, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = ["socket hang up", "socket stalled"], this.hasExperiencedNetworkDisruption = !1, this.request = async (t) => {
      this.logger.debug("Publishing Request Payload");
      try {
        return await this.toEstablishConnection(), await this.provider.request(t);
      } catch (i) {
        throw this.logger.debug("Failed to Publish Request"), this.logger.error(i), i;
      }
    }, this.onPayloadHandler = (t) => {
      this.onProviderPayload(t);
    }, this.onConnectHandler = () => {
      this.events.emit(Ye.connect);
    }, this.onDisconnectHandler = () => {
      this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (t) => {
      this.logger.error(t), this.events.emit(Ye.error, t), this.logger.info("Fatal socket error received, closing transport"), this.transportClose();
    }, this.registerProviderListeners = () => {
      this.provider.on(ht.payload, this.onPayloadHandler), this.provider.on(ht.connect, this.onConnectHandler), this.provider.on(ht.disconnect, this.onDisconnectHandler), this.provider.on(ht.error, this.onProviderErrorHandler);
    }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? Y.generateChildLogger(e.logger, this.name) : Y.pino(Y.getDefaultLoggerOptions({ level: e.logger || Ws })), this.messages = new yn(this.logger, e.core), this.subscriber = new mn(this, this.logger), this.publisher = new ru(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || qr, this.projectId = e.projectId, this.bundleId = Io(), this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), this.registerEventListeners(), await this.createProvider(), await Promise.all([this.messages.init(), this.subscriber.init()]);
    try {
      await this.transportOpen();
    } catch {
      this.logger.warn(`Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${$r}...`), await this.restartTransport($r);
    }
    this.initialized = !0, setTimeout(async () => {
      this.subscriber.topics.length === 0 && (this.logger.info("No topics subscribed to after init, closing transport"), await this.transportClose(), this.transportExplicitlyClosed = !1);
    }, en);
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get connected() {
    return this.provider.connection.connected;
  }
  get connecting() {
    return this.provider.connection.connecting;
  }
  async publish(e, t, i) {
    this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now() });
  }
  async subscribe(e, t) {
    var i;
    this.isInitialized();
    let n = ((i = this.subscriber.topicMap.get(e)) == null ? void 0 : i[0]) || "";
    if (n)
      return n;
    let a;
    const c = (l) => {
      l.topic === e && (this.subscriber.off(st.created, c), a());
    };
    return await Promise.all([new Promise((l) => {
      a = l, this.subscriber.on(st.created, c);
    }), new Promise(async (l) => {
      n = await this.subscriber.subscribe(e, t), l();
    })]), n;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, this.hasExperiencedNetworkDisruption && this.connected ? await Gt(this.provider.disconnect(), 1e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.connected && await this.provider.disconnect();
  }
  async transportOpen(e) {
    if (this.transportExplicitlyClosed = !1, await this.confirmOnlineStateOrThrow(), !this.connectionAttemptInProgress) {
      e && e !== this.relayUrl && (this.relayUrl = e, await this.transportClose(), await this.createProvider()), this.connectionAttemptInProgress = !0;
      try {
        await Promise.all([new Promise((t) => {
          if (!this.initialized)
            return t();
          this.subscriber.once(st.resubscribed, () => {
            t();
          });
        }), new Promise(async (t, i) => {
          try {
            await Gt(this.provider.connect(), 1e4, `Socket stalled when trying to connect to ${this.relayUrl}`);
          } catch (n) {
            i(n);
            return;
          }
          t();
        })]);
      } catch (t) {
        this.logger.error(t);
        const i = t;
        if (!this.isConnectionStalled(i.message))
          throw t;
        this.provider.events.emit(ht.disconnect);
      } finally {
        this.connectionAttemptInProgress = !1, this.hasExperiencedNetworkDisruption = !1;
      }
    }
  }
  async restartTransport(e) {
    await this.confirmOnlineStateOrThrow(), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.transportClose(), await this.createProvider(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await oi())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  isConnectionStalled(e) {
    return this.staleConnectionErrors.some((t) => e.includes(t));
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new _c(new Sc(So({ sdkVersion: Zs, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: i } = e;
    await this.messages.set(t, i);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: i } = e;
    if (!i || i.length === 0)
      return this.logger.debug(`Ignoring invalid/empty message: ${i}`), !0;
    if (!await this.subscriber.isSubscribed(t))
      return this.logger.debug(`Ignoring message for non-subscribed topic ${t}`), !0;
    const n = this.messages.has(t, i);
    return n && this.logger.debug(`Ignoring duplicate message: ${i}`), n;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), Is(e)) {
      if (!e.method.endsWith(Xs))
        return;
      const t = e.params, { topic: i, message: n, publishedAt: a } = t.data, c = { topic: i, message: n, publishedAt: a };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(fu({ type: "event", event: t.id }, c)), this.events.emit(t.id, c), await this.acknowledgePayload(e), await this.onMessageEvent(c);
    } else
      Gr(e) && this.events.emit(Ye.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (this.events.emit(Ye.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = _s(e.id, !0);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(ht.payload, this.onPayloadHandler), this.provider.off(ht.connect, this.onConnectHandler), this.provider.off(ht.disconnect, this.onDisconnectHandler), this.provider.off(ht.error, this.onProviderErrorHandler);
  }
  async registerEventListeners() {
    this.events.on(Ye.connection_stalled, () => {
      this.restartTransport().catch((t) => this.logger.error(t));
    });
    let e = await oi();
    To(async (t) => {
      this.initialized && e !== t && (e = t, t ? await this.restartTransport().catch((i) => this.logger.error(i)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportClose().catch((i) => this.logger.error(i))));
    });
  }
  onProviderDisconnect() {
    this.events.emit(Ye.disconnect), this.attemptToReconnect();
  }
  attemptToReconnect() {
    this.transportExplicitlyClosed || (this.logger.info("attemptToReconnect called. Connecting..."), setTimeout(async () => {
      await this.restartTransport().catch((e) => this.logger.error(e));
    }, G.toMiliseconds(Qs)));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectionAttemptInProgress)
        return await new Promise((e) => {
          const t = setInterval(() => {
            this.connected && (clearInterval(t), e());
          }, this.connectionStatusPollingInterval);
        });
      await this.restartTransport();
    }
  }
}
var du = Object.defineProperty, Bi = Object.getOwnPropertySymbols, gu = Object.prototype.hasOwnProperty, pu = Object.prototype.propertyIsEnumerable, Hi = (r, e, t) => e in r ? du(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, ki = (r, e) => {
  for (var t in e || (e = {}))
    gu.call(e, t) && Hi(r, t, e[t]);
  if (Bi)
    for (var t of Bi(e))
      pu.call(e, t) && Hi(r, t, e[t]);
  return r;
};
class vn extends $a {
  constructor(e, t, i, n = yt, a = void 0) {
    super(e, t, i, n), this.core = e, this.logger = t, this.name = i, this.map = /* @__PURE__ */ new Map(), this.version = tn, this.cached = [], this.initialized = !1, this.storagePrefix = yt, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((c) => {
        this.getKey && c !== null && !Nr(c) ? this.map.set(this.getKey(c), c) : Ro(c) ? this.map.set(c.id, c) : Oo(c) && this.map.set(c.topic, c);
      }), this.cached = [], this.initialized = !0);
    }, this.set = async (c, l) => {
      this.isInitialized(), this.map.has(c) ? await this.update(c, l) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: c, value: l }), this.map.set(c, l), await this.persist());
    }, this.get = (c) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: c }), this.getData(c)), this.getAll = (c) => (this.isInitialized(), c ? this.values.filter((l) => Object.keys(c).every((p) => Rc(l[p], c[p]))) : this.values), this.update = async (c, l) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: c, update: l });
      const p = ki(ki({}, this.getData(c)), l);
      this.map.set(c, p), await this.persist();
    }, this.delete = async (c, l) => {
      this.isInitialized(), this.map.has(c) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: c, reason: l }), this.map.delete(c), await this.persist());
    }, this.logger = Y.generateChildLogger(t, this.name), this.storagePrefix = n, this.getKey = a;
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      const { message: i } = J("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i), new Error(i);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length)
        return;
      if (this.map.size) {
        const { message: t } = J("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class wn {
  constructor(e, t) {
    this.core = e, this.logger = t, this.name = an, this.version = cn, this.events = new qo(), this.initialized = !1, this.storagePrefix = yt, this.ignoredPayloadTypes = [Lo], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }, this.register = ({ methods: i }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i])];
    }, this.create = async () => {
      this.isInitialized();
      const i = Ar(), n = await this.core.crypto.setSymKey(i), a = nr(G.FIVE_MINUTES), c = { protocol: Ys }, l = { topic: n, expiry: a, relay: c, active: !1 }, p = Po({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: i, relay: c });
      return await this.pairings.set(n, l), await this.core.relayer.subscribe(n), this.core.expirer.set(n, a), { topic: n, uri: p };
    }, this.pair = async (i) => {
      this.isInitialized(), this.isValidPair(i);
      const { topic: n, symKey: a, relay: c } = ai(i.uri);
      let l;
      if (this.pairings.keys.includes(n) && (l = this.pairings.get(n), l.active))
        throw new Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);
      const p = nr(G.FIVE_MINUTES), h = { topic: n, relay: c, expiry: p, active: !1 };
      return await this.pairings.set(n, h), this.core.expirer.set(n, p), i.activatePairing && await this.activate({ topic: n }), this.events.emit(Ht.create, h), this.core.crypto.keychain.has(n) || (await this.core.crypto.setSymKey(a, n), await this.core.relayer.subscribe(n, { relay: c })), h;
    }, this.activate = async ({ topic: i }) => {
      this.isInitialized();
      const n = nr(G.THIRTY_DAYS);
      await this.pairings.update(i, { active: !0, expiry: n }), this.core.expirer.set(i, n);
    }, this.ping = async (i) => {
      this.isInitialized(), await this.isValidPing(i);
      const { topic: n } = i;
      if (this.pairings.keys.includes(n)) {
        const a = await this.sendRequest(n, "wc_pairingPing", {}), { done: c, resolve: l, reject: p } = Ao();
        this.events.once(_r("pairing_ping", a), ({ error: h }) => {
          h ? p(h) : l();
        }), await c();
      }
    }, this.updateExpiry = async ({ topic: i, expiry: n }) => {
      this.isInitialized(), await this.pairings.update(i, { expiry: n });
    }, this.updateMetadata = async ({ topic: i, metadata: n }) => {
      this.isInitialized(), await this.pairings.update(i, { peerMetadata: n });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (i) => {
      this.isInitialized(), await this.isValidDisconnect(i);
      const { topic: n } = i;
      this.pairings.keys.includes(n) && (await this.sendRequest(n, "wc_pairingDelete", Bt("USER_DISCONNECTED")), await this.deletePairing(n));
    }, this.sendRequest = async (i, n, a) => {
      const c = kr(n, a), l = await this.core.crypto.encode(i, c), p = At[n].req;
      return this.core.history.set(i, c), this.core.relayer.publish(i, l, p), c.id;
    }, this.sendResult = async (i, n, a) => {
      const c = _s(i, a), l = await this.core.crypto.encode(n, c), p = await this.core.history.get(n, i), h = At[p.request.method].res;
      await this.core.relayer.publish(n, l, h), await this.core.history.resolve(c);
    }, this.sendError = async (i, n, a) => {
      const c = Es(i, a), l = await this.core.crypto.encode(n, c), p = await this.core.history.get(n, i), h = At[p.request.method] ? At[p.request.method].res : At.unregistered_method.res;
      await this.core.relayer.publish(n, l, h), await this.core.history.resolve(c);
    }, this.deletePairing = async (i, n) => {
      await this.core.relayer.unsubscribe(i), await Promise.all([this.pairings.delete(i, Bt("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i), n ? Promise.resolve() : this.core.expirer.del(i)]);
    }, this.cleanup = async () => {
      const i = this.pairings.getAll().filter((n) => ci(n.expiry));
      await Promise.all(i.map((n) => this.deletePairing(n.topic)));
    }, this.onRelayEventRequest = (i) => {
      const { topic: n, payload: a } = i;
      switch (a.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(n, a);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(n, a);
        default:
          return this.onUnknownRpcMethodRequest(n, a);
      }
    }, this.onRelayEventResponse = async (i) => {
      const { topic: n, payload: a } = i, c = (await this.core.history.get(n, a.id)).request.method;
      switch (c) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(n, a);
        default:
          return this.onUnknownRpcMethodResponse(c);
      }
    }, this.onPairingPingRequest = async (i, n) => {
      const { id: a } = n;
      try {
        this.isValidPing({ topic: i }), await this.sendResult(a, i, !0), this.events.emit(Ht.ping, { id: a, topic: i });
      } catch (c) {
        await this.sendError(a, i, c), this.logger.error(c);
      }
    }, this.onPairingPingResponse = (i, n) => {
      const { id: a } = n;
      setTimeout(() => {
        Ss(n) ? this.events.emit(_r("pairing_ping", a), {}) : yr(n) && this.events.emit(_r("pairing_ping", a), { error: n.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (i, n) => {
      const { id: a } = n;
      try {
        this.isValidDisconnect({ topic: i }), await this.deletePairing(i), this.events.emit(Ht.delete, { id: a, topic: i });
      } catch (c) {
        await this.sendError(a, i, c), this.logger.error(c);
      }
    }, this.onUnknownRpcMethodRequest = async (i, n) => {
      const { id: a, method: c } = n;
      try {
        if (this.registeredMethods.includes(c))
          return;
        const l = Bt("WC_METHOD_UNSUPPORTED", c);
        await this.sendError(a, i, l), this.logger.error(l);
      } catch (l) {
        await this.sendError(a, i, l), this.logger.error(l);
      }
    }, this.onUnknownRpcMethodResponse = (i) => {
      this.registeredMethods.includes(i) || this.logger.error(Bt("WC_METHOD_UNSUPPORTED", i));
    }, this.isValidPair = (i) => {
      var n;
      if (!Er(i)) {
        const { message: c } = J("MISSING_OR_INVALID", `pair() params: ${i}`);
        throw new Error(c);
      }
      if (!Fo(i.uri)) {
        const { message: c } = J("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
        throw new Error(c);
      }
      const a = ai(i.uri);
      if (!((n = a == null ? void 0 : a.relay) != null && n.protocol)) {
        const { message: c } = J("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw new Error(c);
      }
      if (!(a != null && a.symKey)) {
        const { message: c } = J("MISSING_OR_INVALID", "pair() uri#symKey");
        throw new Error(c);
      }
    }, this.isValidPing = async (i) => {
      if (!Er(i)) {
        const { message: a } = J("MISSING_OR_INVALID", `ping() params: ${i}`);
        throw new Error(a);
      }
      const { topic: n } = i;
      await this.isValidPairingTopic(n);
    }, this.isValidDisconnect = async (i) => {
      if (!Er(i)) {
        const { message: a } = J("MISSING_OR_INVALID", `disconnect() params: ${i}`);
        throw new Error(a);
      }
      const { topic: n } = i;
      await this.isValidPairingTopic(n);
    }, this.isValidPairingTopic = async (i) => {
      if (!Co(i, !1)) {
        const { message: n } = J("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
        throw new Error(n);
      }
      if (!this.pairings.keys.includes(i)) {
        const { message: n } = J("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
        throw new Error(n);
      }
      if (ci(this.pairings.get(i).expiry)) {
        await this.deletePairing(i);
        const { message: n } = J("EXPIRED", `pairing topic: ${i}`);
        throw new Error(n);
      }
    }, this.core = e, this.logger = Y.generateChildLogger(t, this.name), this.pairings = new vn(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(Ye.message, async (e) => {
      const { topic: t, message: i } = e;
      if (!this.pairings.keys.includes(t) || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i)))
        return;
      const n = await this.core.crypto.decode(t, i);
      try {
        Is(n) ? (this.core.history.set(t, n), this.onRelayEventRequest({ topic: t, payload: n })) : Gr(n) && (await this.core.history.resolve(n), await this.onRelayEventResponse({ topic: t, payload: n }), this.core.history.delete(t, n.id));
      } catch (a) {
        this.logger.error(a);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(it.expired, async (e) => {
      const { topic: t } = No(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit(Ht.expire, { topic: t }));
    });
  }
}
class _n extends Da {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new lt.EventEmitter(), this.name = hn, this.version = un, this.cached = [], this.initialized = !1, this.storagePrefix = yt, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.set = (i, n, a) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i, request: n, chainId: a }), this.records.has(n.id))
        return;
      const c = { id: n.id, topic: i, request: { method: n.method, params: n.params || null }, chainId: a, expiry: nr(G.THIRTY_DAYS) };
      this.records.set(c.id, c), this.events.emit(at.created, c);
    }, this.resolve = async (i) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i }), !this.records.has(i.id))
        return;
      const n = await this.getRecord(i.id);
      typeof n.response > "u" && (n.response = yr(i) ? { error: i.error } : { result: i.result }, this.records.set(n.id, n), this.events.emit(at.updated, n));
    }, this.get = async (i, n) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i, id: n }), await this.getRecord(n)), this.delete = (i, n) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: n }), this.values.forEach((a) => {
        if (a.topic === i) {
          if (typeof n < "u" && a.id !== n)
            return;
          this.records.delete(a.id), this.events.emit(at.deleted, a);
        }
      });
    }, this.exists = async (i, n) => (this.isInitialized(), this.records.has(n) ? (await this.getRecord(n)).topic === i : !1), this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.logger = Y.generateChildLogger(t, this.name);
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const i = { topic: t.topic, request: kr(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(i);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: i } = J("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(at.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length)
        return;
      if (this.records.size) {
        const { message: t } = J("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(at.created, (e) => {
      const t = at.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.events.on(at.updated, (e) => {
      const t = at.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.events.on(at.deleted, (e) => {
      const t = at.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.core.heartbeat.on(Dt.HEARTBEAT_EVENTS.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.records.forEach((e) => {
        G.toMiliseconds(e.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${e.id}`), this.delete(e.topic, e.id));
      });
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class En extends Ka {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new lt.EventEmitter(), this.name = ln, this.version = fn, this.cached = [], this.initialized = !1, this.storagePrefix = yt, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.has = (i) => {
      try {
        const n = this.formatTarget(i);
        return typeof this.getExpiration(n) < "u";
      } catch {
        return !1;
      }
    }, this.set = (i, n) => {
      this.isInitialized();
      const a = this.formatTarget(i), c = { target: a, expiry: n };
      this.expirations.set(a, c), this.checkExpiry(a, c), this.events.emit(it.created, { target: a, expiration: c });
    }, this.get = (i) => {
      this.isInitialized();
      const n = this.formatTarget(i);
      return this.getExpiration(n);
    }, this.del = (i) => {
      if (this.isInitialized(), this.has(i)) {
        const n = this.formatTarget(i), a = this.getExpiration(n);
        this.expirations.delete(n), this.events.emit(it.deleted, { target: n, expiration: a });
      }
    }, this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.logger = Y.generateChildLogger(t, this.name);
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string")
      return Do(e);
    if (typeof e == "number")
      return Mo(e);
    const { message: t } = J("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(it.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length)
        return;
      if (this.expirations.size) {
        const { message: t } = J("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: i } = J("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i), new Error(i);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: i } = t;
    G.toMiliseconds(i) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(it.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(Dt.HEARTBEAT_EVENTS.pulse, () => this.checkExpirations()), this.events.on(it.created, (e) => {
      const t = it.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(it.expired, (e) => {
      const t = it.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(it.deleted, (e) => {
      const t = it.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = J("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class xn extends Ba {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, this.name = hr, this.initialized = !1, this.queue = [], this.verifyDisabled = !1, this.init = async (i) => {
      if (this.verifyDisabled || zo() || !Uo())
        return;
      const n = this.getVerifyUrl(i == null ? void 0 : i.verifyUrl);
      this.verifyUrl !== n && this.removeIframe(), this.verifyUrl = n;
      try {
        await this.createIframe();
      } catch (a) {
        this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.info(a);
      }
      if (!this.initialized) {
        this.removeIframe(), this.verifyUrl = fr;
        try {
          await this.createIframe();
        } catch (a) {
          this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.info(a), this.verifyDisabled = !0;
        }
      }
    }, this.register = async (i) => {
      this.initialized ? this.sendPost(i.attestationId) : (this.addToQueue(i.attestationId), await this.init());
    }, this.resolve = async (i) => {
      if (this.isDevEnv)
        return "";
      const n = this.getVerifyUrl(i == null ? void 0 : i.verifyUrl);
      let a;
      try {
        a = await this.fetchAttestation(i.attestationId, n);
      } catch (c) {
        this.logger.info(`failed to resolve attestation: ${i.attestationId} from url: ${n}`), this.logger.info(c), a = await this.fetchAttestation(i.attestationId, fr);
      }
      return a;
    }, this.fetchAttestation = async (i, n) => {
      this.logger.info(`resolving attestation: ${i} from url: ${n}`);
      const a = this.startAbortTimer(G.ONE_SECOND * 2), c = await fetch(`${n}/attestation/${i}`, { signal: this.abortController.signal });
      return clearTimeout(a), c.status === 200 ? await c.json() : void 0;
    }, this.addToQueue = (i) => {
      this.queue.push(i);
    }, this.processQueue = () => {
      this.queue.length !== 0 && (this.queue.forEach((i) => this.sendPost(i)), this.queue = []);
    }, this.sendPost = (i) => {
      var n;
      try {
        if (!this.iframe)
          return;
        (n = this.iframe.contentWindow) == null || n.postMessage(i, "*"), this.logger.info(`postMessage sent: ${i} ${this.verifyUrl}`);
      } catch {
      }
    }, this.createIframe = async () => {
      let i;
      const n = (a) => {
        a.data === "verify_ready" && (this.initialized = !0, this.processQueue(), window.removeEventListener("message", n), i());
      };
      await Promise.race([new Promise((a) => {
        if (document.getElementById(hr))
          return a();
        window.addEventListener("message", n);
        const c = document.createElement("iframe");
        c.id = hr, c.src = `${this.verifyUrl}/${this.projectId}`, c.style.display = "none", document.body.append(c), this.iframe = c, i = a;
      }), new Promise((a, c) => setTimeout(() => {
        window.removeEventListener("message", n), c("verify iframe load timeout");
      }, G.toMiliseconds(G.FIVE_SECONDS)))]);
    }, this.removeIframe = () => {
      this.iframe && (this.iframe.remove(), this.iframe = void 0, this.initialized = !1);
    }, this.getVerifyUrl = (i) => {
      let n = i || Ft;
      return dn.includes(n) || (this.logger.info(`verify url: ${n}, not included in trusted list, assigning default: ${Ft}`), n = Ft), n;
    }, this.logger = Y.generateChildLogger(t, this.name), this.verifyUrl = Ft, this.abortController = new AbortController(), this.isDevEnv = $o() && {}.IS_VITEST;
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), G.toMiliseconds(e));
  }
}
var yu = Object.defineProperty, Gi = Object.getOwnPropertySymbols, mu = Object.prototype.hasOwnProperty, bu = Object.prototype.propertyIsEnumerable, Vi = (r, e, t) => e in r ? yu(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, qi = (r, e) => {
  for (var t in e || (e = {}))
    mu.call(e, t) && Vi(r, t, e[t]);
  if (Gi)
    for (var t of Gi(e))
      bu.call(e, t) && Vi(r, t, e[t]);
  return r;
};
class vr extends Na {
  constructor(e) {
    super(e), this.protocol = Vr, this.version = zs, this.name = br, this.events = new lt.EventEmitter(), this.initialized = !1, this.on = (i, n) => this.events.on(i, n), this.once = (i, n) => this.events.once(i, n), this.off = (i, n) => this.events.off(i, n), this.removeListener = (i, n) => this.events.removeListener(i, n), this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || qr, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const t = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Y.pino(Y.getDefaultLoggerOptions({ level: (e == null ? void 0 : e.logger) || Us.logger }));
    this.logger = Y.generateChildLogger(t, this.name), this.heartbeat = new Dt.HeartBeat(), this.crypto = new pn(this, this.logger, e == null ? void 0 : e.keychain), this.history = new _n(this, this.logger), this.expirer = new En(this, this.logger), this.storage = e != null && e.storage ? e.storage : new Sa(qi(qi({}, $s), e == null ? void 0 : e.storageOptions)), this.relayer = new bn({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new wn(this, this.logger), this.verify = new xn(this.projectId || "", this.logger);
  }
  static async init(e) {
    const t = new vr(e);
    await t.initialize();
    const i = await t.crypto.getClientId();
    return await t.storage.setItem(rn, i), t;
  }
  get context() {
    return Y.getLoggerContext(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
}
const vu = vr, Pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CORE_CONTEXT: br,
  CORE_DEFAULT: Us,
  CORE_PROTOCOL: Vr,
  CORE_STORAGE_OPTIONS: $s,
  CORE_STORAGE_PREFIX: yt,
  CORE_VERSION: zs,
  CRYPTO_CLIENT_SEED: Ur,
  CRYPTO_CONTEXT: js,
  CRYPTO_JWT_TTL: Ks,
  Core: vu,
  Crypto: pn,
  EXPIRER_CONTEXT: ln,
  EXPIRER_DEFAULT_TTL: tu,
  EXPIRER_EVENTS: it,
  EXPIRER_STORAGE_VERSION: fn,
  Expirer: En,
  HISTORY_CONTEXT: hn,
  HISTORY_EVENTS: at,
  HISTORY_STORAGE_VERSION: un,
  JsonRpcHistory: _n,
  KEYCHAIN_CONTEXT: Bs,
  KEYCHAIN_STORAGE_VERSION: Hs,
  KeyChain: gn,
  MESSAGES_CONTEXT: ks,
  MESSAGES_STORAGE_VERSION: Gs,
  MessageTracker: yn,
  PAIRING_CONTEXT: an,
  PAIRING_DEFAULT_TTL: eu,
  PAIRING_EVENTS: Ht,
  PAIRING_RPC_OPTS: At,
  PAIRING_STORAGE_VERSION: cn,
  PENDING_SUB_RESOLUTION_TIMEOUT: on,
  PUBLISHER_CONTEXT: qs,
  PUBLISHER_DEFAULT_TTL: Vs,
  Pairing: wn,
  RELAYER_CONTEXT: Js,
  RELAYER_DEFAULT_LOGGER: Ws,
  RELAYER_DEFAULT_PROTOCOL: Ys,
  RELAYER_DEFAULT_RELAY_URL: qr,
  RELAYER_EVENTS: Ye,
  RELAYER_FAILOVER_RELAY_URL: $r,
  RELAYER_PROVIDER_EVENTS: ht,
  RELAYER_RECONNECT_TIMEOUT: Qs,
  RELAYER_SDK_VERSION: Zs,
  RELAYER_STORAGE_OPTIONS: Qh,
  RELAYER_SUBSCRIBER_SUFFIX: Xs,
  RELAYER_TRANSPORT_CUTOFF: en,
  Relayer: bn,
  STORE_STORAGE_VERSION: tn,
  SUBSCRIBER_CONTEXT: sn,
  SUBSCRIBER_DEFAULT_TTL: Zh,
  SUBSCRIBER_EVENTS: st,
  SUBSCRIBER_STORAGE_VERSION: nn,
  Store: vn,
  Subscriber: mn,
  TRUSTED_VERIFY_URLS: dn,
  VERIFY_CONTEXT: hr,
  VERIFY_FALLBACK_SERVER: fr,
  VERIFY_SERVER: Ft,
  Verify: xn,
  WALLETCONNECT_CLIENT_ID: rn,
  default: vr
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ft as $,
  Ye as D,
  vn as M,
  vu as N,
  Ou as S,
  Ht as V,
  qo as Y,
  yr as a,
  Is as b,
  Y as c,
  Gr as d,
  lt as e,
  Es as f,
  kr as g,
  _s as h,
  Ss as i,
  Tu as j,
  Ys as k,
  Pu as l,
  vs as p,
  it as v
};

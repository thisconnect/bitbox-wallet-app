import { e as xn, c as _t, N as _n, M as Gt, f as Mn, i as bt, a as xt, D as di, b as Sn, d as An, V as En, g as br, h as In, j as Is, S as Rs, Y as Ns, k as Fs, $ as Ps, v as qs, p as Os } from "./index.es.js";
import { c as Rn, g as Pr, r as Cs, a as Ts, K as Oi, D as Nn, N as B, b as W, k as $s, X as Fn, s as Ls, _ as Pn, Q as Ds, d as ir, y as Le, p as Bt, B as Xr, j as Us, U as zt, e as ks, h as Bs, f as zs, L as Yr, m as jt, t as gr, H as We, w as nr, x as Vs, i as Ks, u as Qr, l as Ci, n as sr, q as js, o as Gs, v as Hs, z as Ti, A as Js, Y as Ws, G as Xs, W as Ys, J as Qs, C as Zs, F as eo } from "./index.js";
var qn = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
(function(i) {
  (function() {
    var t = "input is invalid type", e = "finalize already called", r = typeof window == "object", n = r ? window : {};
    n.JS_SHA3_NO_WINDOW && (r = !1);
    var s = !r && typeof self == "object", u = !n.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    u ? n = Rn : s && (n = self);
    var c = !n.JS_SHA3_NO_COMMON_JS && !0 && i.exports, d = !n.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", m = "0123456789abcdef".split(""), b = [31, 7936, 2031616, 520093696], x = [4, 1024, 262144, 67108864], A = [1, 256, 65536, 16777216], I = [6, 1536, 393216, 100663296], S = [0, 8, 16, 24], F = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ], $ = [224, 256, 384, 512], T = [128, 256], K = ["hex", "buffer", "arrayBuffer", "array", "digest"], H = {
      128: 168,
      256: 136
    };
    (n.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(h) {
      return Object.prototype.toString.call(h) === "[object Array]";
    }), d && (n.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(h) {
      return typeof h == "object" && h.buffer && h.buffer.constructor === ArrayBuffer;
    });
    for (var z = function(h, E, R) {
      return function(N) {
        return new a(h, E, h).update(N)[R]();
      };
    }, V = function(h, E, R) {
      return function(N, P) {
        return new a(h, E, P).update(N)[R]();
      };
    }, j = function(h, E, R) {
      return function(N, P, L, O) {
        return o["cshake" + h].update(N, P, L, O)[R]();
      };
    }, J = function(h, E, R) {
      return function(N, P, L, O) {
        return o["kmac" + h].update(N, P, L, O)[R]();
      };
    }, Y = function(h, E, R, N) {
      for (var P = 0; P < K.length; ++P) {
        var L = K[P];
        h[L] = E(R, N, L);
      }
      return h;
    }, Te = function(h, E) {
      var R = z(h, E, "hex");
      return R.create = function() {
        return new a(h, E, h);
      }, R.update = function(N) {
        return R.create().update(N);
      }, Y(R, z, h, E);
    }, dt = function(h, E) {
      var R = V(h, E, "hex");
      return R.create = function(N) {
        return new a(h, E, N);
      }, R.update = function(N, P) {
        return R.create(P).update(N);
      }, Y(R, V, h, E);
    }, Q = function(h, E) {
      var R = H[h], N = j(h, E, "hex");
      return N.create = function(P, L, O) {
        return !L && !O ? o["shake" + h].create(P) : new a(h, E, P).bytepad([L, O], R);
      }, N.update = function(P, L, O, q) {
        return N.create(L, O, q).update(P);
      }, Y(N, j, h, E);
    }, je = function(h, E) {
      var R = H[h], N = J(h, E, "hex");
      return N.create = function(P, L, O) {
        return new g(h, E, L).bytepad(["KMAC", O], R).bytepad([P], R);
      }, N.update = function(P, L, O, q) {
        return N.create(P, O, q).update(L);
      }, Y(N, J, h, E);
    }, w = [
      { name: "keccak", padding: A, bits: $, createMethod: Te },
      { name: "sha3", padding: I, bits: $, createMethod: Te },
      { name: "shake", padding: b, bits: T, createMethod: dt },
      { name: "cshake", padding: x, bits: T, createMethod: Q },
      { name: "kmac", padding: x, bits: T, createMethod: je }
    ], o = {}, f = [], l = 0; l < w.length; ++l)
      for (var v = w[l], y = v.bits, _ = 0; _ < y.length; ++_) {
        var M = v.name + "_" + y[_];
        if (f.push(M), o[M] = v.createMethod(y[_], v.padding), v.name !== "sha3") {
          var p = v.name + y[_];
          f.push(p), o[p] = o[M];
        }
      }
    function a(h, E, R) {
      this.blocks = [], this.s = [], this.padding = E, this.outputBits = R, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (h << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = R >> 5, this.extraBytes = (R & 31) >> 3;
      for (var N = 0; N < 50; ++N)
        this.s[N] = 0;
    }
    a.prototype.update = function(h) {
      if (this.finalized)
        throw new Error(e);
      var E, R = typeof h;
      if (R !== "string") {
        if (R === "object") {
          if (h === null)
            throw new Error(t);
          if (d && h.constructor === ArrayBuffer)
            h = new Uint8Array(h);
          else if (!Array.isArray(h) && (!d || !ArrayBuffer.isView(h)))
            throw new Error(t);
        } else
          throw new Error(t);
        E = !0;
      }
      for (var N = this.blocks, P = this.byteCount, L = h.length, O = this.blockCount, q = 0, qe = this.s, C, U; q < L; ) {
        if (this.reset)
          for (this.reset = !1, N[0] = this.block, C = 1; C < O + 1; ++C)
            N[C] = 0;
        if (E)
          for (C = this.start; q < L && C < P; ++q)
            N[C >> 2] |= h[q] << S[C++ & 3];
        else
          for (C = this.start; q < L && C < P; ++q)
            U = h.charCodeAt(q), U < 128 ? N[C >> 2] |= U << S[C++ & 3] : U < 2048 ? (N[C >> 2] |= (192 | U >> 6) << S[C++ & 3], N[C >> 2] |= (128 | U & 63) << S[C++ & 3]) : U < 55296 || U >= 57344 ? (N[C >> 2] |= (224 | U >> 12) << S[C++ & 3], N[C >> 2] |= (128 | U >> 6 & 63) << S[C++ & 3], N[C >> 2] |= (128 | U & 63) << S[C++ & 3]) : (U = 65536 + ((U & 1023) << 10 | h.charCodeAt(++q) & 1023), N[C >> 2] |= (240 | U >> 18) << S[C++ & 3], N[C >> 2] |= (128 | U >> 12 & 63) << S[C++ & 3], N[C >> 2] |= (128 | U >> 6 & 63) << S[C++ & 3], N[C >> 2] |= (128 | U & 63) << S[C++ & 3]);
        if (this.lastByteIndex = C, C >= P) {
          for (this.start = C - P, this.block = N[O], C = 0; C < O; ++C)
            qe[C] ^= N[C];
          D(qe), this.reset = !0;
        } else
          this.start = C;
      }
      return this;
    }, a.prototype.encode = function(h, E) {
      var R = h & 255, N = 1, P = [R];
      for (h = h >> 8, R = h & 255; R > 0; )
        P.unshift(R), h = h >> 8, R = h & 255, ++N;
      return E ? P.push(N) : P.unshift(N), this.update(P), P.length;
    }, a.prototype.encodeString = function(h) {
      var E, R = typeof h;
      if (R !== "string") {
        if (R === "object") {
          if (h === null)
            throw new Error(t);
          if (d && h.constructor === ArrayBuffer)
            h = new Uint8Array(h);
          else if (!Array.isArray(h) && (!d || !ArrayBuffer.isView(h)))
            throw new Error(t);
        } else
          throw new Error(t);
        E = !0;
      }
      var N = 0, P = h.length;
      if (E)
        N = P;
      else
        for (var L = 0; L < h.length; ++L) {
          var O = h.charCodeAt(L);
          O < 128 ? N += 1 : O < 2048 ? N += 2 : O < 55296 || O >= 57344 ? N += 3 : (O = 65536 + ((O & 1023) << 10 | h.charCodeAt(++L) & 1023), N += 4);
        }
      return N += this.encode(N * 8), this.update(h), N;
    }, a.prototype.bytepad = function(h, E) {
      for (var R = this.encode(E), N = 0; N < h.length; ++N)
        R += this.encodeString(h[N]);
      var P = E - R % E, L = [];
      return L.length = P, this.update(L), this;
    }, a.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var h = this.blocks, E = this.lastByteIndex, R = this.blockCount, N = this.s;
        if (h[E >> 2] |= this.padding[E & 3], this.lastByteIndex === this.byteCount)
          for (h[0] = h[R], E = 1; E < R + 1; ++E)
            h[E] = 0;
        for (h[R - 1] |= 2147483648, E = 0; E < R; ++E)
          N[E] ^= h[E];
        D(N);
      }
    }, a.prototype.toString = a.prototype.hex = function() {
      this.finalize();
      for (var h = this.blockCount, E = this.s, R = this.outputBlocks, N = this.extraBytes, P = 0, L = 0, O = "", q; L < R; ) {
        for (P = 0; P < h && L < R; ++P, ++L)
          q = E[P], O += m[q >> 4 & 15] + m[q & 15] + m[q >> 12 & 15] + m[q >> 8 & 15] + m[q >> 20 & 15] + m[q >> 16 & 15] + m[q >> 28 & 15] + m[q >> 24 & 15];
        L % h === 0 && (D(E), P = 0);
      }
      return N && (q = E[P], O += m[q >> 4 & 15] + m[q & 15], N > 1 && (O += m[q >> 12 & 15] + m[q >> 8 & 15]), N > 2 && (O += m[q >> 20 & 15] + m[q >> 16 & 15])), O;
    }, a.prototype.arrayBuffer = function() {
      this.finalize();
      var h = this.blockCount, E = this.s, R = this.outputBlocks, N = this.extraBytes, P = 0, L = 0, O = this.outputBits >> 3, q;
      N ? q = new ArrayBuffer(R + 1 << 2) : q = new ArrayBuffer(O);
      for (var qe = new Uint32Array(q); L < R; ) {
        for (P = 0; P < h && L < R; ++P, ++L)
          qe[L] = E[P];
        L % h === 0 && D(E);
      }
      return N && (qe[P] = E[P], q = q.slice(0, O)), q;
    }, a.prototype.buffer = a.prototype.arrayBuffer, a.prototype.digest = a.prototype.array = function() {
      this.finalize();
      for (var h = this.blockCount, E = this.s, R = this.outputBlocks, N = this.extraBytes, P = 0, L = 0, O = [], q, qe; L < R; ) {
        for (P = 0; P < h && L < R; ++P, ++L)
          q = L << 2, qe = E[P], O[q] = qe & 255, O[q + 1] = qe >> 8 & 255, O[q + 2] = qe >> 16 & 255, O[q + 3] = qe >> 24 & 255;
        L % h === 0 && D(E);
      }
      return N && (q = L << 2, qe = E[P], O[q] = qe & 255, N > 1 && (O[q + 1] = qe >> 8 & 255), N > 2 && (O[q + 2] = qe >> 16 & 255)), O;
    };
    function g(h, E, R) {
      a.call(this, h, E, R);
    }
    g.prototype = new a(), g.prototype.finalize = function() {
      return this.encode(this.outputBits, !0), a.prototype.finalize.call(this);
    };
    var D = function(h) {
      var E, R, N, P, L, O, q, qe, C, U, At, Z, ee, Et, te, re, It, ie, ne, Rt, se, oe, Nt, ae, fe, Ft, he, ue, Pt, ce, le, qt, de, pe, Ot, ve, ge, Ct, me, ye, Tt, we, be, $t, xe, _e, Lt, Me, Se, Dt, Ae, Ee, Ut, Ie, Re, kt, Ne, Fe, pt, vt, gt, mt, yt;
      for (N = 0; N < 48; N += 2)
        P = h[0] ^ h[10] ^ h[20] ^ h[30] ^ h[40], L = h[1] ^ h[11] ^ h[21] ^ h[31] ^ h[41], O = h[2] ^ h[12] ^ h[22] ^ h[32] ^ h[42], q = h[3] ^ h[13] ^ h[23] ^ h[33] ^ h[43], qe = h[4] ^ h[14] ^ h[24] ^ h[34] ^ h[44], C = h[5] ^ h[15] ^ h[25] ^ h[35] ^ h[45], U = h[6] ^ h[16] ^ h[26] ^ h[36] ^ h[46], At = h[7] ^ h[17] ^ h[27] ^ h[37] ^ h[47], Z = h[8] ^ h[18] ^ h[28] ^ h[38] ^ h[48], ee = h[9] ^ h[19] ^ h[29] ^ h[39] ^ h[49], E = Z ^ (O << 1 | q >>> 31), R = ee ^ (q << 1 | O >>> 31), h[0] ^= E, h[1] ^= R, h[10] ^= E, h[11] ^= R, h[20] ^= E, h[21] ^= R, h[30] ^= E, h[31] ^= R, h[40] ^= E, h[41] ^= R, E = P ^ (qe << 1 | C >>> 31), R = L ^ (C << 1 | qe >>> 31), h[2] ^= E, h[3] ^= R, h[12] ^= E, h[13] ^= R, h[22] ^= E, h[23] ^= R, h[32] ^= E, h[33] ^= R, h[42] ^= E, h[43] ^= R, E = O ^ (U << 1 | At >>> 31), R = q ^ (At << 1 | U >>> 31), h[4] ^= E, h[5] ^= R, h[14] ^= E, h[15] ^= R, h[24] ^= E, h[25] ^= R, h[34] ^= E, h[35] ^= R, h[44] ^= E, h[45] ^= R, E = qe ^ (Z << 1 | ee >>> 31), R = C ^ (ee << 1 | Z >>> 31), h[6] ^= E, h[7] ^= R, h[16] ^= E, h[17] ^= R, h[26] ^= E, h[27] ^= R, h[36] ^= E, h[37] ^= R, h[46] ^= E, h[47] ^= R, E = U ^ (P << 1 | L >>> 31), R = At ^ (L << 1 | P >>> 31), h[8] ^= E, h[9] ^= R, h[18] ^= E, h[19] ^= R, h[28] ^= E, h[29] ^= R, h[38] ^= E, h[39] ^= R, h[48] ^= E, h[49] ^= R, Et = h[0], te = h[1], _e = h[11] << 4 | h[10] >>> 28, Lt = h[10] << 4 | h[11] >>> 28, ue = h[20] << 3 | h[21] >>> 29, Pt = h[21] << 3 | h[20] >>> 29, vt = h[31] << 9 | h[30] >>> 23, gt = h[30] << 9 | h[31] >>> 23, we = h[40] << 18 | h[41] >>> 14, be = h[41] << 18 | h[40] >>> 14, pe = h[2] << 1 | h[3] >>> 31, Ot = h[3] << 1 | h[2] >>> 31, re = h[13] << 12 | h[12] >>> 20, It = h[12] << 12 | h[13] >>> 20, Me = h[22] << 10 | h[23] >>> 22, Se = h[23] << 10 | h[22] >>> 22, ce = h[33] << 13 | h[32] >>> 19, le = h[32] << 13 | h[33] >>> 19, mt = h[42] << 2 | h[43] >>> 30, yt = h[43] << 2 | h[42] >>> 30, Ie = h[5] << 30 | h[4] >>> 2, Re = h[4] << 30 | h[5] >>> 2, ve = h[14] << 6 | h[15] >>> 26, ge = h[15] << 6 | h[14] >>> 26, ie = h[25] << 11 | h[24] >>> 21, ne = h[24] << 11 | h[25] >>> 21, Dt = h[34] << 15 | h[35] >>> 17, Ae = h[35] << 15 | h[34] >>> 17, qt = h[45] << 29 | h[44] >>> 3, de = h[44] << 29 | h[45] >>> 3, ae = h[6] << 28 | h[7] >>> 4, fe = h[7] << 28 | h[6] >>> 4, kt = h[17] << 23 | h[16] >>> 9, Ne = h[16] << 23 | h[17] >>> 9, Ct = h[26] << 25 | h[27] >>> 7, me = h[27] << 25 | h[26] >>> 7, Rt = h[36] << 21 | h[37] >>> 11, se = h[37] << 21 | h[36] >>> 11, Ee = h[47] << 24 | h[46] >>> 8, Ut = h[46] << 24 | h[47] >>> 8, $t = h[8] << 27 | h[9] >>> 5, xe = h[9] << 27 | h[8] >>> 5, Ft = h[18] << 20 | h[19] >>> 12, he = h[19] << 20 | h[18] >>> 12, Fe = h[29] << 7 | h[28] >>> 25, pt = h[28] << 7 | h[29] >>> 25, ye = h[38] << 8 | h[39] >>> 24, Tt = h[39] << 8 | h[38] >>> 24, oe = h[48] << 14 | h[49] >>> 18, Nt = h[49] << 14 | h[48] >>> 18, h[0] = Et ^ ~re & ie, h[1] = te ^ ~It & ne, h[10] = ae ^ ~Ft & ue, h[11] = fe ^ ~he & Pt, h[20] = pe ^ ~ve & Ct, h[21] = Ot ^ ~ge & me, h[30] = $t ^ ~_e & Me, h[31] = xe ^ ~Lt & Se, h[40] = Ie ^ ~kt & Fe, h[41] = Re ^ ~Ne & pt, h[2] = re ^ ~ie & Rt, h[3] = It ^ ~ne & se, h[12] = Ft ^ ~ue & ce, h[13] = he ^ ~Pt & le, h[22] = ve ^ ~Ct & ye, h[23] = ge ^ ~me & Tt, h[32] = _e ^ ~Me & Dt, h[33] = Lt ^ ~Se & Ae, h[42] = kt ^ ~Fe & vt, h[43] = Ne ^ ~pt & gt, h[4] = ie ^ ~Rt & oe, h[5] = ne ^ ~se & Nt, h[14] = ue ^ ~ce & qt, h[15] = Pt ^ ~le & de, h[24] = Ct ^ ~ye & we, h[25] = me ^ ~Tt & be, h[34] = Me ^ ~Dt & Ee, h[35] = Se ^ ~Ae & Ut, h[44] = Fe ^ ~vt & mt, h[45] = pt ^ ~gt & yt, h[6] = Rt ^ ~oe & Et, h[7] = se ^ ~Nt & te, h[16] = ce ^ ~qt & ae, h[17] = le ^ ~de & fe, h[26] = ye ^ ~we & pe, h[27] = Tt ^ ~be & Ot, h[36] = Dt ^ ~Ee & $t, h[37] = Ae ^ ~Ut & xe, h[46] = vt ^ ~mt & Ie, h[47] = gt ^ ~yt & Re, h[8] = oe ^ ~Et & re, h[9] = Nt ^ ~te & It, h[18] = qt ^ ~ae & Ft, h[19] = de ^ ~fe & he, h[28] = we ^ ~pe & ve, h[29] = be ^ ~Ot & ge, h[38] = Ee ^ ~$t & _e, h[39] = Ut ^ ~xe & Lt, h[48] = mt ^ ~Ie & kt, h[49] = yt ^ ~Re & Ne, h[0] ^= F[N], h[1] ^= F[N + 1];
    };
    if (c)
      i.exports = o;
    else
      for (l = 0; l < f.length; ++l)
        n[f[l]] = o[f[l]];
  })();
})(qn);
var to = qn.exports;
const ro = /* @__PURE__ */ Pr(to), io = "logger/5.7.0";
let $i = !1, Li = !1;
const xr = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let Di = xr.default, Zr = null;
function no() {
  try {
    const i = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t) => {
      try {
        if ("test".normalize(t) !== "test")
          throw new Error("bad normalize");
      } catch {
        i.push(t);
      }
    }), i.length)
      throw new Error("missing " + i.join(", "));
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
      throw new Error("broken implementation");
  } catch (i) {
    return i.message;
  }
  return null;
}
const Ui = no();
var pi;
(function(i) {
  i.DEBUG = "DEBUG", i.INFO = "INFO", i.WARNING = "WARNING", i.ERROR = "ERROR", i.OFF = "OFF";
})(pi || (pi = {}));
var Ye;
(function(i) {
  i.UNKNOWN_ERROR = "UNKNOWN_ERROR", i.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", i.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", i.NETWORK_ERROR = "NETWORK_ERROR", i.SERVER_ERROR = "SERVER_ERROR", i.TIMEOUT = "TIMEOUT", i.BUFFER_OVERRUN = "BUFFER_OVERRUN", i.NUMERIC_FAULT = "NUMERIC_FAULT", i.MISSING_NEW = "MISSING_NEW", i.INVALID_ARGUMENT = "INVALID_ARGUMENT", i.MISSING_ARGUMENT = "MISSING_ARGUMENT", i.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", i.CALL_EXCEPTION = "CALL_EXCEPTION", i.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", i.NONCE_EXPIRED = "NONCE_EXPIRED", i.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", i.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", i.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", i.ACTION_REJECTED = "ACTION_REJECTED";
})(Ye || (Ye = {}));
const ki = "0123456789abcdef";
class Pe {
  constructor(t) {
    Object.defineProperty(this, "version", {
      enumerable: !0,
      value: t,
      writable: !1
    });
  }
  _log(t, e) {
    const r = t.toLowerCase();
    xr[r] == null && this.throwArgumentError("invalid log level name", "logLevel", t), !(Di > xr[r]) && console.log.apply(console, e);
  }
  debug(...t) {
    this._log(Pe.levels.DEBUG, t);
  }
  info(...t) {
    this._log(Pe.levels.INFO, t);
  }
  warn(...t) {
    this._log(Pe.levels.WARNING, t);
  }
  makeError(t, e, r) {
    if (Li)
      return this.makeError("censored error", e, {});
    e || (e = Pe.errors.UNKNOWN_ERROR), r || (r = {});
    const n = [];
    Object.keys(r).forEach((d) => {
      const m = r[d];
      try {
        if (m instanceof Uint8Array) {
          let b = "";
          for (let x = 0; x < m.length; x++)
            b += ki[m[x] >> 4], b += ki[m[x] & 15];
          n.push(d + "=Uint8Array(0x" + b + ")");
        } else
          n.push(d + "=" + JSON.stringify(m));
      } catch {
        n.push(d + "=" + JSON.stringify(r[d].toString()));
      }
    }), n.push(`code=${e}`), n.push(`version=${this.version}`);
    const s = t;
    let u = "";
    switch (e) {
      case Ye.NUMERIC_FAULT: {
        u = "NUMERIC_FAULT";
        const d = t;
        switch (d) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            u += "-" + d;
            break;
          case "negative-power":
          case "negative-width":
            u += "-unsupported";
            break;
          case "unbound-bitwise-result":
            u += "-unbound-result";
            break;
        }
        break;
      }
      case Ye.CALL_EXCEPTION:
      case Ye.INSUFFICIENT_FUNDS:
      case Ye.MISSING_NEW:
      case Ye.NONCE_EXPIRED:
      case Ye.REPLACEMENT_UNDERPRICED:
      case Ye.TRANSACTION_REPLACED:
      case Ye.UNPREDICTABLE_GAS_LIMIT:
        u = e;
        break;
    }
    u && (t += " [ See: https://links.ethers.org/v5-errors-" + u + " ]"), n.length && (t += " (" + n.join(", ") + ")");
    const c = new Error(t);
    return c.reason = s, c.code = e, Object.keys(r).forEach(function(d) {
      c[d] = r[d];
    }), c;
  }
  throwError(t, e, r) {
    throw this.makeError(t, e, r);
  }
  throwArgumentError(t, e, r) {
    return this.throwError(t, Pe.errors.INVALID_ARGUMENT, {
      argument: e,
      value: r
    });
  }
  assert(t, e, r, n) {
    t || this.throwError(e, r, n);
  }
  assertArgument(t, e, r, n) {
    t || this.throwArgumentError(e, r, n);
  }
  checkNormalize(t) {
    Ui && this.throwError("platform missing String.prototype.normalize", Pe.errors.UNSUPPORTED_OPERATION, {
      operation: "String.prototype.normalize",
      form: Ui
    });
  }
  checkSafeUint53(t, e) {
    typeof t == "number" && (e == null && (e = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(e, Pe.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "out-of-safe-range",
      value: t
    }), t % 1 && this.throwError(e, Pe.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "non-integer",
      value: t
    }));
  }
  checkArgumentCount(t, e, r) {
    r ? r = ": " + r : r = "", t < e && this.throwError("missing argument" + r, Pe.errors.MISSING_ARGUMENT, {
      count: t,
      expectedCount: e
    }), t > e && this.throwError("too many arguments" + r, Pe.errors.UNEXPECTED_ARGUMENT, {
      count: t,
      expectedCount: e
    });
  }
  checkNew(t, e) {
    (t === Object || t == null) && this.throwError("missing new", Pe.errors.MISSING_NEW, { name: e.name });
  }
  checkAbstract(t, e) {
    t === e ? this.throwError("cannot instantiate abstract class " + JSON.stringify(e.name) + " directly; use a sub-class", Pe.errors.UNSUPPORTED_OPERATION, { name: t.name, operation: "new" }) : (t === Object || t == null) && this.throwError("missing new", Pe.errors.MISSING_NEW, { name: e.name });
  }
  static globalLogger() {
    return Zr || (Zr = new Pe(io)), Zr;
  }
  static setCensorship(t, e) {
    if (!t && e && this.globalLogger().throwError("cannot permanently disable censorship", Pe.errors.UNSUPPORTED_OPERATION, {
      operation: "setCensorship"
    }), $i) {
      if (!t)
        return;
      this.globalLogger().throwError("error censorship permanent", Pe.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    Li = !!t, $i = !!e;
  }
  static setLogLevel(t) {
    const e = xr[t.toLowerCase()];
    if (e == null) {
      Pe.globalLogger().warn("invalid log level - " + t);
      return;
    }
    Di = e;
  }
  static from(t) {
    return new Pe(t);
  }
}
Pe.errors = Ye;
Pe.levels = pi;
const so = "bytes/5.7.0", Oe = new Pe(so);
function On(i) {
  return !!i.toHexString;
}
function Ht(i) {
  return i.slice || (i.slice = function() {
    const t = Array.prototype.slice.call(arguments);
    return Ht(new Uint8Array(Array.prototype.slice.apply(i, t)));
  }), i;
}
function oo(i) {
  return tt(i) && !(i.length % 2) || _i(i);
}
function Bi(i) {
  return typeof i == "number" && i == i && i % 1 === 0;
}
function _i(i) {
  if (i == null)
    return !1;
  if (i.constructor === Uint8Array)
    return !0;
  if (typeof i == "string" || !Bi(i.length) || i.length < 0)
    return !1;
  for (let t = 0; t < i.length; t++) {
    const e = i[t];
    if (!Bi(e) || e < 0 || e >= 256)
      return !1;
  }
  return !0;
}
function Ce(i, t) {
  if (t || (t = {}), typeof i == "number") {
    Oe.checkSafeUint53(i, "invalid arrayify value");
    const e = [];
    for (; i; )
      e.unshift(i & 255), i = parseInt(String(i / 256));
    return e.length === 0 && e.push(0), Ht(new Uint8Array(e));
  }
  if (t.allowMissingPrefix && typeof i == "string" && i.substring(0, 2) !== "0x" && (i = "0x" + i), On(i) && (i = i.toHexString()), tt(i)) {
    let e = i.substring(2);
    e.length % 2 && (t.hexPad === "left" ? e = "0" + e : t.hexPad === "right" ? e += "0" : Oe.throwArgumentError("hex data is odd-length", "value", i));
    const r = [];
    for (let n = 0; n < e.length; n += 2)
      r.push(parseInt(e.substring(n, n + 2), 16));
    return Ht(new Uint8Array(r));
  }
  return _i(i) ? Ht(new Uint8Array(i)) : Oe.throwArgumentError("invalid arrayify value", "value", i);
}
function ao(i) {
  const t = i.map((n) => Ce(n)), e = t.reduce((n, s) => n + s.length, 0), r = new Uint8Array(e);
  return t.reduce((n, s) => (r.set(s, n), n + s.length), 0), Ht(r);
}
function fo(i, t) {
  i = Ce(i), i.length > t && Oe.throwArgumentError("value out of range", "value", arguments[0]);
  const e = new Uint8Array(t);
  return e.set(i, t - i.length), Ht(e);
}
function tt(i, t) {
  return !(typeof i != "string" || !i.match(/^0x[0-9A-Fa-f]*$/) || t && i.length !== 2 + 2 * t);
}
const ei = "0123456789abcdef";
function ze(i, t) {
  if (t || (t = {}), typeof i == "number") {
    Oe.checkSafeUint53(i, "invalid hexlify value");
    let e = "";
    for (; i; )
      e = ei[i & 15] + e, i = Math.floor(i / 16);
    return e.length ? (e.length % 2 && (e = "0" + e), "0x" + e) : "0x00";
  }
  if (typeof i == "bigint")
    return i = i.toString(16), i.length % 2 ? "0x0" + i : "0x" + i;
  if (t.allowMissingPrefix && typeof i == "string" && i.substring(0, 2) !== "0x" && (i = "0x" + i), On(i))
    return i.toHexString();
  if (tt(i))
    return i.length % 2 && (t.hexPad === "left" ? i = "0x0" + i.substring(2) : t.hexPad === "right" ? i += "0" : Oe.throwArgumentError("hex data is odd-length", "value", i)), i.toLowerCase();
  if (_i(i)) {
    let e = "0x";
    for (let r = 0; r < i.length; r++) {
      let n = i[r];
      e += ei[(n & 240) >> 4] + ei[n & 15];
    }
    return e;
  }
  return Oe.throwArgumentError("invalid hexlify value", "value", i);
}
function ho(i) {
  if (typeof i != "string")
    i = ze(i);
  else if (!tt(i) || i.length % 2)
    return null;
  return (i.length - 2) / 2;
}
function zi(i, t, e) {
  return typeof i != "string" ? i = ze(i) : (!tt(i) || i.length % 2) && Oe.throwArgumentError("invalid hexData", "value", i), t = 2 + 2 * t, e != null ? "0x" + i.substring(t, 2 + 2 * e) : "0x" + i.substring(t);
}
function Jt(i, t) {
  for (typeof i != "string" ? i = ze(i) : tt(i) || Oe.throwArgumentError("invalid hex string", "value", i), i.length > 2 * t + 2 && Oe.throwArgumentError("value out of range", "value", arguments[1]); i.length < 2 * t + 2; )
    i = "0x0" + i.substring(2);
  return i;
}
function Cn(i) {
  const t = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0,
    yParityAndS: "0x",
    compact: "0x"
  };
  if (oo(i)) {
    let e = Ce(i);
    e.length === 64 ? (t.v = 27 + (e[32] >> 7), e[32] &= 127, t.r = ze(e.slice(0, 32)), t.s = ze(e.slice(32, 64))) : e.length === 65 ? (t.r = ze(e.slice(0, 32)), t.s = ze(e.slice(32, 64)), t.v = e[64]) : Oe.throwArgumentError("invalid signature string", "signature", i), t.v < 27 && (t.v === 0 || t.v === 1 ? t.v += 27 : Oe.throwArgumentError("signature invalid v byte", "signature", i)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (e[32] |= 128), t._vs = ze(e.slice(32, 64));
  } else {
    if (t.r = i.r, t.s = i.s, t.v = i.v, t.recoveryParam = i.recoveryParam, t._vs = i._vs, t._vs != null) {
      const n = fo(Ce(t._vs), 32);
      t._vs = ze(n);
      const s = n[0] >= 128 ? 1 : 0;
      t.recoveryParam == null ? t.recoveryParam = s : t.recoveryParam !== s && Oe.throwArgumentError("signature recoveryParam mismatch _vs", "signature", i), n[0] &= 127;
      const u = ze(n);
      t.s == null ? t.s = u : t.s !== u && Oe.throwArgumentError("signature v mismatch _vs", "signature", i);
    }
    if (t.recoveryParam == null)
      t.v == null ? Oe.throwArgumentError("signature missing v and recoveryParam", "signature", i) : t.v === 0 || t.v === 1 ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
    else if (t.v == null)
      t.v = 27 + t.recoveryParam;
    else {
      const n = t.v === 0 || t.v === 1 ? t.v : 1 - t.v % 2;
      t.recoveryParam !== n && Oe.throwArgumentError("signature recoveryParam mismatch v", "signature", i);
    }
    t.r == null || !tt(t.r) ? Oe.throwArgumentError("signature missing or invalid r", "signature", i) : t.r = Jt(t.r, 32), t.s == null || !tt(t.s) ? Oe.throwArgumentError("signature missing or invalid s", "signature", i) : t.s = Jt(t.s, 32);
    const e = Ce(t.s);
    e[0] >= 128 && Oe.throwArgumentError("signature s out of range", "signature", i), t.recoveryParam && (e[0] |= 128);
    const r = ze(e);
    t._vs && (tt(t._vs) || Oe.throwArgumentError("signature invalid _vs", "signature", i), t._vs = Jt(t._vs, 32)), t._vs == null ? t._vs = r : t._vs !== r && Oe.throwArgumentError("signature _vs mismatch v and s", "signature", i);
  }
  return t.yParityAndS = t._vs, t.compact = t.r + t.yParityAndS.substring(2), t;
}
function Mi(i) {
  return "0x" + ro.keccak_256(Ce(i));
}
var Si = { exports: {} };
Si.exports;
(function(i) {
  (function(t, e) {
    function r(w, o) {
      if (!w)
        throw new Error(o || "Assertion failed");
    }
    function n(w, o) {
      w.super_ = o;
      var f = function() {
      };
      f.prototype = o.prototype, w.prototype = new f(), w.prototype.constructor = w;
    }
    function s(w, o, f) {
      if (s.isBN(w))
        return w;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, w !== null && ((o === "le" || o === "be") && (f = o, o = 10), this._init(w || 0, o || 10, f || "be"));
    }
    typeof t == "object" ? t.exports = s : e.BN = s, s.BN = s, s.wordSize = 26;
    var u;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? u = window.Buffer : u = Cs.Buffer;
    } catch {
    }
    s.isBN = function(o) {
      return o instanceof s ? !0 : o !== null && typeof o == "object" && o.constructor.wordSize === s.wordSize && Array.isArray(o.words);
    }, s.max = function(o, f) {
      return o.cmp(f) > 0 ? o : f;
    }, s.min = function(o, f) {
      return o.cmp(f) < 0 ? o : f;
    }, s.prototype._init = function(o, f, l) {
      if (typeof o == "number")
        return this._initNumber(o, f, l);
      if (typeof o == "object")
        return this._initArray(o, f, l);
      f === "hex" && (f = 16), r(f === (f | 0) && f >= 2 && f <= 36), o = o.toString().replace(/\s+/g, "");
      var v = 0;
      o[0] === "-" && (v++, this.negative = 1), v < o.length && (f === 16 ? this._parseHex(o, v, l) : (this._parseBase(o, f, v), l === "le" && this._initArray(this.toArray(), f, l)));
    }, s.prototype._initNumber = function(o, f, l) {
      o < 0 && (this.negative = 1, o = -o), o < 67108864 ? (this.words = [o & 67108863], this.length = 1) : o < 4503599627370496 ? (this.words = [
        o & 67108863,
        o / 67108864 & 67108863
      ], this.length = 2) : (r(o < 9007199254740992), this.words = [
        o & 67108863,
        o / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), f, l);
    }, s.prototype._initArray = function(o, f, l) {
      if (r(typeof o.length == "number"), o.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(o.length / 3), this.words = new Array(this.length);
      for (var v = 0; v < this.length; v++)
        this.words[v] = 0;
      var y, _, M = 0;
      if (l === "be")
        for (v = o.length - 1, y = 0; v >= 0; v -= 3)
          _ = o[v] | o[v - 1] << 8 | o[v - 2] << 16, this.words[y] |= _ << M & 67108863, this.words[y + 1] = _ >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, y++);
      else if (l === "le")
        for (v = 0, y = 0; v < o.length; v += 3)
          _ = o[v] | o[v + 1] << 8 | o[v + 2] << 16, this.words[y] |= _ << M & 67108863, this.words[y + 1] = _ >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, y++);
      return this._strip();
    };
    function c(w, o) {
      var f = w.charCodeAt(o);
      if (f >= 48 && f <= 57)
        return f - 48;
      if (f >= 65 && f <= 70)
        return f - 55;
      if (f >= 97 && f <= 102)
        return f - 87;
      r(!1, "Invalid character in " + w);
    }
    function d(w, o, f) {
      var l = c(w, f);
      return f - 1 >= o && (l |= c(w, f - 1) << 4), l;
    }
    s.prototype._parseHex = function(o, f, l) {
      this.length = Math.ceil((o.length - f) / 6), this.words = new Array(this.length);
      for (var v = 0; v < this.length; v++)
        this.words[v] = 0;
      var y = 0, _ = 0, M;
      if (l === "be")
        for (v = o.length - 1; v >= f; v -= 2)
          M = d(o, f, v) << y, this.words[_] |= M & 67108863, y >= 18 ? (y -= 18, _ += 1, this.words[_] |= M >>> 26) : y += 8;
      else {
        var p = o.length - f;
        for (v = p % 2 === 0 ? f + 1 : f; v < o.length; v += 2)
          M = d(o, f, v) << y, this.words[_] |= M & 67108863, y >= 18 ? (y -= 18, _ += 1, this.words[_] |= M >>> 26) : y += 8;
      }
      this._strip();
    };
    function m(w, o, f, l) {
      for (var v = 0, y = 0, _ = Math.min(w.length, f), M = o; M < _; M++) {
        var p = w.charCodeAt(M) - 48;
        v *= l, p >= 49 ? y = p - 49 + 10 : p >= 17 ? y = p - 17 + 10 : y = p, r(p >= 0 && y < l, "Invalid character"), v += y;
      }
      return v;
    }
    s.prototype._parseBase = function(o, f, l) {
      this.words = [0], this.length = 1;
      for (var v = 0, y = 1; y <= 67108863; y *= f)
        v++;
      v--, y = y / f | 0;
      for (var _ = o.length - l, M = _ % v, p = Math.min(_, _ - M) + l, a = 0, g = l; g < p; g += v)
        a = m(o, g, g + v, f), this.imuln(y), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
      if (M !== 0) {
        var D = 1;
        for (a = m(o, g, o.length, f), g = 0; g < M; g++)
          D *= f;
        this.imuln(D), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
      }
      this._strip();
    }, s.prototype.copy = function(o) {
      o.words = new Array(this.length);
      for (var f = 0; f < this.length; f++)
        o.words[f] = this.words[f];
      o.length = this.length, o.negative = this.negative, o.red = this.red;
    };
    function b(w, o) {
      w.words = o.words, w.length = o.length, w.negative = o.negative, w.red = o.red;
    }
    if (s.prototype._move = function(o) {
      b(o, this);
    }, s.prototype.clone = function() {
      var o = new s(null);
      return this.copy(o), o;
    }, s.prototype._expand = function(o) {
      for (; this.length < o; )
        this.words[this.length++] = 0;
      return this;
    }, s.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, s.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        s.prototype[Symbol.for("nodejs.util.inspect.custom")] = x;
      } catch {
        s.prototype.inspect = x;
      }
    else
      s.prototype.inspect = x;
    function x() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var A = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], I = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], S = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    s.prototype.toString = function(o, f) {
      o = o || 10, f = f | 0 || 1;
      var l;
      if (o === 16 || o === "hex") {
        l = "";
        for (var v = 0, y = 0, _ = 0; _ < this.length; _++) {
          var M = this.words[_], p = ((M << v | y) & 16777215).toString(16);
          y = M >>> 24 - v & 16777215, v += 2, v >= 26 && (v -= 26, _--), y !== 0 || _ !== this.length - 1 ? l = A[6 - p.length] + p + l : l = p + l;
        }
        for (y !== 0 && (l = y.toString(16) + l); l.length % f !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (o === (o | 0) && o >= 2 && o <= 36) {
        var a = I[o], g = S[o];
        l = "";
        var D = this.clone();
        for (D.negative = 0; !D.isZero(); ) {
          var h = D.modrn(g).toString(o);
          D = D.idivn(g), D.isZero() ? l = h + l : l = A[a - h.length] + h + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % f !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var o = this.words[0];
      return this.length === 2 ? o += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? o += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -o : o;
    }, s.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, u && (s.prototype.toBuffer = function(o, f) {
      return this.toArrayLike(u, o, f);
    }), s.prototype.toArray = function(o, f) {
      return this.toArrayLike(Array, o, f);
    };
    var F = function(o, f) {
      return o.allocUnsafe ? o.allocUnsafe(f) : new o(f);
    };
    s.prototype.toArrayLike = function(o, f, l) {
      this._strip();
      var v = this.byteLength(), y = l || Math.max(1, v);
      r(v <= y, "byte array longer than desired length"), r(y > 0, "Requested array length <= 0");
      var _ = F(o, y), M = f === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M](_, v), _;
    }, s.prototype._toArrayLikeLE = function(o, f) {
      for (var l = 0, v = 0, y = 0, _ = 0; y < this.length; y++) {
        var M = this.words[y] << _ | v;
        o[l++] = M & 255, l < o.length && (o[l++] = M >> 8 & 255), l < o.length && (o[l++] = M >> 16 & 255), _ === 6 ? (l < o.length && (o[l++] = M >> 24 & 255), v = 0, _ = 0) : (v = M >>> 24, _ += 2);
      }
      if (l < o.length)
        for (o[l++] = v; l < o.length; )
          o[l++] = 0;
    }, s.prototype._toArrayLikeBE = function(o, f) {
      for (var l = o.length - 1, v = 0, y = 0, _ = 0; y < this.length; y++) {
        var M = this.words[y] << _ | v;
        o[l--] = M & 255, l >= 0 && (o[l--] = M >> 8 & 255), l >= 0 && (o[l--] = M >> 16 & 255), _ === 6 ? (l >= 0 && (o[l--] = M >> 24 & 255), v = 0, _ = 0) : (v = M >>> 24, _ += 2);
      }
      if (l >= 0)
        for (o[l--] = v; l >= 0; )
          o[l--] = 0;
    }, Math.clz32 ? s.prototype._countBits = function(o) {
      return 32 - Math.clz32(o);
    } : s.prototype._countBits = function(o) {
      var f = o, l = 0;
      return f >= 4096 && (l += 13, f >>>= 13), f >= 64 && (l += 7, f >>>= 7), f >= 8 && (l += 4, f >>>= 4), f >= 2 && (l += 2, f >>>= 2), l + f;
    }, s.prototype._zeroBits = function(o) {
      if (o === 0)
        return 26;
      var f = o, l = 0;
      return f & 8191 || (l += 13, f >>>= 13), f & 127 || (l += 7, f >>>= 7), f & 15 || (l += 4, f >>>= 4), f & 3 || (l += 2, f >>>= 2), f & 1 || l++, l;
    }, s.prototype.bitLength = function() {
      var o = this.words[this.length - 1], f = this._countBits(o);
      return (this.length - 1) * 26 + f;
    };
    function $(w) {
      for (var o = new Array(w.bitLength()), f = 0; f < o.length; f++) {
        var l = f / 26 | 0, v = f % 26;
        o[f] = w.words[l] >>> v & 1;
      }
      return o;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var o = 0, f = 0; f < this.length; f++) {
        var l = this._zeroBits(this.words[f]);
        if (o += l, l !== 26)
          break;
      }
      return o;
    }, s.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, s.prototype.toTwos = function(o) {
      return this.negative !== 0 ? this.abs().inotn(o).iaddn(1) : this.clone();
    }, s.prototype.fromTwos = function(o) {
      return this.testn(o - 1) ? this.notn(o).iaddn(1).ineg() : this.clone();
    }, s.prototype.isNeg = function() {
      return this.negative !== 0;
    }, s.prototype.neg = function() {
      return this.clone().ineg();
    }, s.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, s.prototype.iuor = function(o) {
      for (; this.length < o.length; )
        this.words[this.length++] = 0;
      for (var f = 0; f < o.length; f++)
        this.words[f] = this.words[f] | o.words[f];
      return this._strip();
    }, s.prototype.ior = function(o) {
      return r((this.negative | o.negative) === 0), this.iuor(o);
    }, s.prototype.or = function(o) {
      return this.length > o.length ? this.clone().ior(o) : o.clone().ior(this);
    }, s.prototype.uor = function(o) {
      return this.length > o.length ? this.clone().iuor(o) : o.clone().iuor(this);
    }, s.prototype.iuand = function(o) {
      var f;
      this.length > o.length ? f = o : f = this;
      for (var l = 0; l < f.length; l++)
        this.words[l] = this.words[l] & o.words[l];
      return this.length = f.length, this._strip();
    }, s.prototype.iand = function(o) {
      return r((this.negative | o.negative) === 0), this.iuand(o);
    }, s.prototype.and = function(o) {
      return this.length > o.length ? this.clone().iand(o) : o.clone().iand(this);
    }, s.prototype.uand = function(o) {
      return this.length > o.length ? this.clone().iuand(o) : o.clone().iuand(this);
    }, s.prototype.iuxor = function(o) {
      var f, l;
      this.length > o.length ? (f = this, l = o) : (f = o, l = this);
      for (var v = 0; v < l.length; v++)
        this.words[v] = f.words[v] ^ l.words[v];
      if (this !== f)
        for (; v < f.length; v++)
          this.words[v] = f.words[v];
      return this.length = f.length, this._strip();
    }, s.prototype.ixor = function(o) {
      return r((this.negative | o.negative) === 0), this.iuxor(o);
    }, s.prototype.xor = function(o) {
      return this.length > o.length ? this.clone().ixor(o) : o.clone().ixor(this);
    }, s.prototype.uxor = function(o) {
      return this.length > o.length ? this.clone().iuxor(o) : o.clone().iuxor(this);
    }, s.prototype.inotn = function(o) {
      r(typeof o == "number" && o >= 0);
      var f = Math.ceil(o / 26) | 0, l = o % 26;
      this._expand(f), l > 0 && f--;
      for (var v = 0; v < f; v++)
        this.words[v] = ~this.words[v] & 67108863;
      return l > 0 && (this.words[v] = ~this.words[v] & 67108863 >> 26 - l), this._strip();
    }, s.prototype.notn = function(o) {
      return this.clone().inotn(o);
    }, s.prototype.setn = function(o, f) {
      r(typeof o == "number" && o >= 0);
      var l = o / 26 | 0, v = o % 26;
      return this._expand(l + 1), f ? this.words[l] = this.words[l] | 1 << v : this.words[l] = this.words[l] & ~(1 << v), this._strip();
    }, s.prototype.iadd = function(o) {
      var f;
      if (this.negative !== 0 && o.negative === 0)
        return this.negative = 0, f = this.isub(o), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && o.negative !== 0)
        return o.negative = 0, f = this.isub(o), o.negative = 1, f._normSign();
      var l, v;
      this.length > o.length ? (l = this, v = o) : (l = o, v = this);
      for (var y = 0, _ = 0; _ < v.length; _++)
        f = (l.words[_] | 0) + (v.words[_] | 0) + y, this.words[_] = f & 67108863, y = f >>> 26;
      for (; y !== 0 && _ < l.length; _++)
        f = (l.words[_] | 0) + y, this.words[_] = f & 67108863, y = f >>> 26;
      if (this.length = l.length, y !== 0)
        this.words[this.length] = y, this.length++;
      else if (l !== this)
        for (; _ < l.length; _++)
          this.words[_] = l.words[_];
      return this;
    }, s.prototype.add = function(o) {
      var f;
      return o.negative !== 0 && this.negative === 0 ? (o.negative = 0, f = this.sub(o), o.negative ^= 1, f) : o.negative === 0 && this.negative !== 0 ? (this.negative = 0, f = o.sub(this), this.negative = 1, f) : this.length > o.length ? this.clone().iadd(o) : o.clone().iadd(this);
    }, s.prototype.isub = function(o) {
      if (o.negative !== 0) {
        o.negative = 0;
        var f = this.iadd(o);
        return o.negative = 1, f._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(o), this.negative = 1, this._normSign();
      var l = this.cmp(o);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var v, y;
      l > 0 ? (v = this, y = o) : (v = o, y = this);
      for (var _ = 0, M = 0; M < y.length; M++)
        f = (v.words[M] | 0) - (y.words[M] | 0) + _, _ = f >> 26, this.words[M] = f & 67108863;
      for (; _ !== 0 && M < v.length; M++)
        f = (v.words[M] | 0) + _, _ = f >> 26, this.words[M] = f & 67108863;
      if (_ === 0 && M < v.length && v !== this)
        for (; M < v.length; M++)
          this.words[M] = v.words[M];
      return this.length = Math.max(this.length, M), v !== this && (this.negative = 1), this._strip();
    }, s.prototype.sub = function(o) {
      return this.clone().isub(o);
    };
    function T(w, o, f) {
      f.negative = o.negative ^ w.negative;
      var l = w.length + o.length | 0;
      f.length = l, l = l - 1 | 0;
      var v = w.words[0] | 0, y = o.words[0] | 0, _ = v * y, M = _ & 67108863, p = _ / 67108864 | 0;
      f.words[0] = M;
      for (var a = 1; a < l; a++) {
        for (var g = p >>> 26, D = p & 67108863, h = Math.min(a, o.length - 1), E = Math.max(0, a - w.length + 1); E <= h; E++) {
          var R = a - E | 0;
          v = w.words[R] | 0, y = o.words[E] | 0, _ = v * y + D, g += _ / 67108864 | 0, D = _ & 67108863;
        }
        f.words[a] = D | 0, p = g | 0;
      }
      return p !== 0 ? f.words[a] = p | 0 : f.length--, f._strip();
    }
    var K = function(o, f, l) {
      var v = o.words, y = f.words, _ = l.words, M = 0, p, a, g, D = v[0] | 0, h = D & 8191, E = D >>> 13, R = v[1] | 0, N = R & 8191, P = R >>> 13, L = v[2] | 0, O = L & 8191, q = L >>> 13, qe = v[3] | 0, C = qe & 8191, U = qe >>> 13, At = v[4] | 0, Z = At & 8191, ee = At >>> 13, Et = v[5] | 0, te = Et & 8191, re = Et >>> 13, It = v[6] | 0, ie = It & 8191, ne = It >>> 13, Rt = v[7] | 0, se = Rt & 8191, oe = Rt >>> 13, Nt = v[8] | 0, ae = Nt & 8191, fe = Nt >>> 13, Ft = v[9] | 0, he = Ft & 8191, ue = Ft >>> 13, Pt = y[0] | 0, ce = Pt & 8191, le = Pt >>> 13, qt = y[1] | 0, de = qt & 8191, pe = qt >>> 13, Ot = y[2] | 0, ve = Ot & 8191, ge = Ot >>> 13, Ct = y[3] | 0, me = Ct & 8191, ye = Ct >>> 13, Tt = y[4] | 0, we = Tt & 8191, be = Tt >>> 13, $t = y[5] | 0, xe = $t & 8191, _e = $t >>> 13, Lt = y[6] | 0, Me = Lt & 8191, Se = Lt >>> 13, Dt = y[7] | 0, Ae = Dt & 8191, Ee = Dt >>> 13, Ut = y[8] | 0, Ie = Ut & 8191, Re = Ut >>> 13, kt = y[9] | 0, Ne = kt & 8191, Fe = kt >>> 13;
      l.negative = o.negative ^ f.negative, l.length = 19, p = Math.imul(h, ce), a = Math.imul(h, le), a = a + Math.imul(E, ce) | 0, g = Math.imul(E, le);
      var pt = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (pt >>> 26) | 0, pt &= 67108863, p = Math.imul(N, ce), a = Math.imul(N, le), a = a + Math.imul(P, ce) | 0, g = Math.imul(P, le), p = p + Math.imul(h, de) | 0, a = a + Math.imul(h, pe) | 0, a = a + Math.imul(E, de) | 0, g = g + Math.imul(E, pe) | 0;
      var vt = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, p = Math.imul(O, ce), a = Math.imul(O, le), a = a + Math.imul(q, ce) | 0, g = Math.imul(q, le), p = p + Math.imul(N, de) | 0, a = a + Math.imul(N, pe) | 0, a = a + Math.imul(P, de) | 0, g = g + Math.imul(P, pe) | 0, p = p + Math.imul(h, ve) | 0, a = a + Math.imul(h, ge) | 0, a = a + Math.imul(E, ve) | 0, g = g + Math.imul(E, ge) | 0;
      var gt = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, p = Math.imul(C, ce), a = Math.imul(C, le), a = a + Math.imul(U, ce) | 0, g = Math.imul(U, le), p = p + Math.imul(O, de) | 0, a = a + Math.imul(O, pe) | 0, a = a + Math.imul(q, de) | 0, g = g + Math.imul(q, pe) | 0, p = p + Math.imul(N, ve) | 0, a = a + Math.imul(N, ge) | 0, a = a + Math.imul(P, ve) | 0, g = g + Math.imul(P, ge) | 0, p = p + Math.imul(h, me) | 0, a = a + Math.imul(h, ye) | 0, a = a + Math.imul(E, me) | 0, g = g + Math.imul(E, ye) | 0;
      var mt = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, p = Math.imul(Z, ce), a = Math.imul(Z, le), a = a + Math.imul(ee, ce) | 0, g = Math.imul(ee, le), p = p + Math.imul(C, de) | 0, a = a + Math.imul(C, pe) | 0, a = a + Math.imul(U, de) | 0, g = g + Math.imul(U, pe) | 0, p = p + Math.imul(O, ve) | 0, a = a + Math.imul(O, ge) | 0, a = a + Math.imul(q, ve) | 0, g = g + Math.imul(q, ge) | 0, p = p + Math.imul(N, me) | 0, a = a + Math.imul(N, ye) | 0, a = a + Math.imul(P, me) | 0, g = g + Math.imul(P, ye) | 0, p = p + Math.imul(h, we) | 0, a = a + Math.imul(h, be) | 0, a = a + Math.imul(E, we) | 0, g = g + Math.imul(E, be) | 0;
      var yt = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, p = Math.imul(te, ce), a = Math.imul(te, le), a = a + Math.imul(re, ce) | 0, g = Math.imul(re, le), p = p + Math.imul(Z, de) | 0, a = a + Math.imul(Z, pe) | 0, a = a + Math.imul(ee, de) | 0, g = g + Math.imul(ee, pe) | 0, p = p + Math.imul(C, ve) | 0, a = a + Math.imul(C, ge) | 0, a = a + Math.imul(U, ve) | 0, g = g + Math.imul(U, ge) | 0, p = p + Math.imul(O, me) | 0, a = a + Math.imul(O, ye) | 0, a = a + Math.imul(q, me) | 0, g = g + Math.imul(q, ye) | 0, p = p + Math.imul(N, we) | 0, a = a + Math.imul(N, be) | 0, a = a + Math.imul(P, we) | 0, g = g + Math.imul(P, be) | 0, p = p + Math.imul(h, xe) | 0, a = a + Math.imul(h, _e) | 0, a = a + Math.imul(E, xe) | 0, g = g + Math.imul(E, _e) | 0;
      var $r = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + ($r >>> 26) | 0, $r &= 67108863, p = Math.imul(ie, ce), a = Math.imul(ie, le), a = a + Math.imul(ne, ce) | 0, g = Math.imul(ne, le), p = p + Math.imul(te, de) | 0, a = a + Math.imul(te, pe) | 0, a = a + Math.imul(re, de) | 0, g = g + Math.imul(re, pe) | 0, p = p + Math.imul(Z, ve) | 0, a = a + Math.imul(Z, ge) | 0, a = a + Math.imul(ee, ve) | 0, g = g + Math.imul(ee, ge) | 0, p = p + Math.imul(C, me) | 0, a = a + Math.imul(C, ye) | 0, a = a + Math.imul(U, me) | 0, g = g + Math.imul(U, ye) | 0, p = p + Math.imul(O, we) | 0, a = a + Math.imul(O, be) | 0, a = a + Math.imul(q, we) | 0, g = g + Math.imul(q, be) | 0, p = p + Math.imul(N, xe) | 0, a = a + Math.imul(N, _e) | 0, a = a + Math.imul(P, xe) | 0, g = g + Math.imul(P, _e) | 0, p = p + Math.imul(h, Me) | 0, a = a + Math.imul(h, Se) | 0, a = a + Math.imul(E, Me) | 0, g = g + Math.imul(E, Se) | 0;
      var Lr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Lr >>> 26) | 0, Lr &= 67108863, p = Math.imul(se, ce), a = Math.imul(se, le), a = a + Math.imul(oe, ce) | 0, g = Math.imul(oe, le), p = p + Math.imul(ie, de) | 0, a = a + Math.imul(ie, pe) | 0, a = a + Math.imul(ne, de) | 0, g = g + Math.imul(ne, pe) | 0, p = p + Math.imul(te, ve) | 0, a = a + Math.imul(te, ge) | 0, a = a + Math.imul(re, ve) | 0, g = g + Math.imul(re, ge) | 0, p = p + Math.imul(Z, me) | 0, a = a + Math.imul(Z, ye) | 0, a = a + Math.imul(ee, me) | 0, g = g + Math.imul(ee, ye) | 0, p = p + Math.imul(C, we) | 0, a = a + Math.imul(C, be) | 0, a = a + Math.imul(U, we) | 0, g = g + Math.imul(U, be) | 0, p = p + Math.imul(O, xe) | 0, a = a + Math.imul(O, _e) | 0, a = a + Math.imul(q, xe) | 0, g = g + Math.imul(q, _e) | 0, p = p + Math.imul(N, Me) | 0, a = a + Math.imul(N, Se) | 0, a = a + Math.imul(P, Me) | 0, g = g + Math.imul(P, Se) | 0, p = p + Math.imul(h, Ae) | 0, a = a + Math.imul(h, Ee) | 0, a = a + Math.imul(E, Ae) | 0, g = g + Math.imul(E, Ee) | 0;
      var Dr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Dr >>> 26) | 0, Dr &= 67108863, p = Math.imul(ae, ce), a = Math.imul(ae, le), a = a + Math.imul(fe, ce) | 0, g = Math.imul(fe, le), p = p + Math.imul(se, de) | 0, a = a + Math.imul(se, pe) | 0, a = a + Math.imul(oe, de) | 0, g = g + Math.imul(oe, pe) | 0, p = p + Math.imul(ie, ve) | 0, a = a + Math.imul(ie, ge) | 0, a = a + Math.imul(ne, ve) | 0, g = g + Math.imul(ne, ge) | 0, p = p + Math.imul(te, me) | 0, a = a + Math.imul(te, ye) | 0, a = a + Math.imul(re, me) | 0, g = g + Math.imul(re, ye) | 0, p = p + Math.imul(Z, we) | 0, a = a + Math.imul(Z, be) | 0, a = a + Math.imul(ee, we) | 0, g = g + Math.imul(ee, be) | 0, p = p + Math.imul(C, xe) | 0, a = a + Math.imul(C, _e) | 0, a = a + Math.imul(U, xe) | 0, g = g + Math.imul(U, _e) | 0, p = p + Math.imul(O, Me) | 0, a = a + Math.imul(O, Se) | 0, a = a + Math.imul(q, Me) | 0, g = g + Math.imul(q, Se) | 0, p = p + Math.imul(N, Ae) | 0, a = a + Math.imul(N, Ee) | 0, a = a + Math.imul(P, Ae) | 0, g = g + Math.imul(P, Ee) | 0, p = p + Math.imul(h, Ie) | 0, a = a + Math.imul(h, Re) | 0, a = a + Math.imul(E, Ie) | 0, g = g + Math.imul(E, Re) | 0;
      var Ur = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Ur >>> 26) | 0, Ur &= 67108863, p = Math.imul(he, ce), a = Math.imul(he, le), a = a + Math.imul(ue, ce) | 0, g = Math.imul(ue, le), p = p + Math.imul(ae, de) | 0, a = a + Math.imul(ae, pe) | 0, a = a + Math.imul(fe, de) | 0, g = g + Math.imul(fe, pe) | 0, p = p + Math.imul(se, ve) | 0, a = a + Math.imul(se, ge) | 0, a = a + Math.imul(oe, ve) | 0, g = g + Math.imul(oe, ge) | 0, p = p + Math.imul(ie, me) | 0, a = a + Math.imul(ie, ye) | 0, a = a + Math.imul(ne, me) | 0, g = g + Math.imul(ne, ye) | 0, p = p + Math.imul(te, we) | 0, a = a + Math.imul(te, be) | 0, a = a + Math.imul(re, we) | 0, g = g + Math.imul(re, be) | 0, p = p + Math.imul(Z, xe) | 0, a = a + Math.imul(Z, _e) | 0, a = a + Math.imul(ee, xe) | 0, g = g + Math.imul(ee, _e) | 0, p = p + Math.imul(C, Me) | 0, a = a + Math.imul(C, Se) | 0, a = a + Math.imul(U, Me) | 0, g = g + Math.imul(U, Se) | 0, p = p + Math.imul(O, Ae) | 0, a = a + Math.imul(O, Ee) | 0, a = a + Math.imul(q, Ae) | 0, g = g + Math.imul(q, Ee) | 0, p = p + Math.imul(N, Ie) | 0, a = a + Math.imul(N, Re) | 0, a = a + Math.imul(P, Ie) | 0, g = g + Math.imul(P, Re) | 0, p = p + Math.imul(h, Ne) | 0, a = a + Math.imul(h, Fe) | 0, a = a + Math.imul(E, Ne) | 0, g = g + Math.imul(E, Fe) | 0;
      var kr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (kr >>> 26) | 0, kr &= 67108863, p = Math.imul(he, de), a = Math.imul(he, pe), a = a + Math.imul(ue, de) | 0, g = Math.imul(ue, pe), p = p + Math.imul(ae, ve) | 0, a = a + Math.imul(ae, ge) | 0, a = a + Math.imul(fe, ve) | 0, g = g + Math.imul(fe, ge) | 0, p = p + Math.imul(se, me) | 0, a = a + Math.imul(se, ye) | 0, a = a + Math.imul(oe, me) | 0, g = g + Math.imul(oe, ye) | 0, p = p + Math.imul(ie, we) | 0, a = a + Math.imul(ie, be) | 0, a = a + Math.imul(ne, we) | 0, g = g + Math.imul(ne, be) | 0, p = p + Math.imul(te, xe) | 0, a = a + Math.imul(te, _e) | 0, a = a + Math.imul(re, xe) | 0, g = g + Math.imul(re, _e) | 0, p = p + Math.imul(Z, Me) | 0, a = a + Math.imul(Z, Se) | 0, a = a + Math.imul(ee, Me) | 0, g = g + Math.imul(ee, Se) | 0, p = p + Math.imul(C, Ae) | 0, a = a + Math.imul(C, Ee) | 0, a = a + Math.imul(U, Ae) | 0, g = g + Math.imul(U, Ee) | 0, p = p + Math.imul(O, Ie) | 0, a = a + Math.imul(O, Re) | 0, a = a + Math.imul(q, Ie) | 0, g = g + Math.imul(q, Re) | 0, p = p + Math.imul(N, Ne) | 0, a = a + Math.imul(N, Fe) | 0, a = a + Math.imul(P, Ne) | 0, g = g + Math.imul(P, Fe) | 0;
      var Br = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Br >>> 26) | 0, Br &= 67108863, p = Math.imul(he, ve), a = Math.imul(he, ge), a = a + Math.imul(ue, ve) | 0, g = Math.imul(ue, ge), p = p + Math.imul(ae, me) | 0, a = a + Math.imul(ae, ye) | 0, a = a + Math.imul(fe, me) | 0, g = g + Math.imul(fe, ye) | 0, p = p + Math.imul(se, we) | 0, a = a + Math.imul(se, be) | 0, a = a + Math.imul(oe, we) | 0, g = g + Math.imul(oe, be) | 0, p = p + Math.imul(ie, xe) | 0, a = a + Math.imul(ie, _e) | 0, a = a + Math.imul(ne, xe) | 0, g = g + Math.imul(ne, _e) | 0, p = p + Math.imul(te, Me) | 0, a = a + Math.imul(te, Se) | 0, a = a + Math.imul(re, Me) | 0, g = g + Math.imul(re, Se) | 0, p = p + Math.imul(Z, Ae) | 0, a = a + Math.imul(Z, Ee) | 0, a = a + Math.imul(ee, Ae) | 0, g = g + Math.imul(ee, Ee) | 0, p = p + Math.imul(C, Ie) | 0, a = a + Math.imul(C, Re) | 0, a = a + Math.imul(U, Ie) | 0, g = g + Math.imul(U, Re) | 0, p = p + Math.imul(O, Ne) | 0, a = a + Math.imul(O, Fe) | 0, a = a + Math.imul(q, Ne) | 0, g = g + Math.imul(q, Fe) | 0;
      var zr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (zr >>> 26) | 0, zr &= 67108863, p = Math.imul(he, me), a = Math.imul(he, ye), a = a + Math.imul(ue, me) | 0, g = Math.imul(ue, ye), p = p + Math.imul(ae, we) | 0, a = a + Math.imul(ae, be) | 0, a = a + Math.imul(fe, we) | 0, g = g + Math.imul(fe, be) | 0, p = p + Math.imul(se, xe) | 0, a = a + Math.imul(se, _e) | 0, a = a + Math.imul(oe, xe) | 0, g = g + Math.imul(oe, _e) | 0, p = p + Math.imul(ie, Me) | 0, a = a + Math.imul(ie, Se) | 0, a = a + Math.imul(ne, Me) | 0, g = g + Math.imul(ne, Se) | 0, p = p + Math.imul(te, Ae) | 0, a = a + Math.imul(te, Ee) | 0, a = a + Math.imul(re, Ae) | 0, g = g + Math.imul(re, Ee) | 0, p = p + Math.imul(Z, Ie) | 0, a = a + Math.imul(Z, Re) | 0, a = a + Math.imul(ee, Ie) | 0, g = g + Math.imul(ee, Re) | 0, p = p + Math.imul(C, Ne) | 0, a = a + Math.imul(C, Fe) | 0, a = a + Math.imul(U, Ne) | 0, g = g + Math.imul(U, Fe) | 0;
      var Vr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Vr >>> 26) | 0, Vr &= 67108863, p = Math.imul(he, we), a = Math.imul(he, be), a = a + Math.imul(ue, we) | 0, g = Math.imul(ue, be), p = p + Math.imul(ae, xe) | 0, a = a + Math.imul(ae, _e) | 0, a = a + Math.imul(fe, xe) | 0, g = g + Math.imul(fe, _e) | 0, p = p + Math.imul(se, Me) | 0, a = a + Math.imul(se, Se) | 0, a = a + Math.imul(oe, Me) | 0, g = g + Math.imul(oe, Se) | 0, p = p + Math.imul(ie, Ae) | 0, a = a + Math.imul(ie, Ee) | 0, a = a + Math.imul(ne, Ae) | 0, g = g + Math.imul(ne, Ee) | 0, p = p + Math.imul(te, Ie) | 0, a = a + Math.imul(te, Re) | 0, a = a + Math.imul(re, Ie) | 0, g = g + Math.imul(re, Re) | 0, p = p + Math.imul(Z, Ne) | 0, a = a + Math.imul(Z, Fe) | 0, a = a + Math.imul(ee, Ne) | 0, g = g + Math.imul(ee, Fe) | 0;
      var Kr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Kr >>> 26) | 0, Kr &= 67108863, p = Math.imul(he, xe), a = Math.imul(he, _e), a = a + Math.imul(ue, xe) | 0, g = Math.imul(ue, _e), p = p + Math.imul(ae, Me) | 0, a = a + Math.imul(ae, Se) | 0, a = a + Math.imul(fe, Me) | 0, g = g + Math.imul(fe, Se) | 0, p = p + Math.imul(se, Ae) | 0, a = a + Math.imul(se, Ee) | 0, a = a + Math.imul(oe, Ae) | 0, g = g + Math.imul(oe, Ee) | 0, p = p + Math.imul(ie, Ie) | 0, a = a + Math.imul(ie, Re) | 0, a = a + Math.imul(ne, Ie) | 0, g = g + Math.imul(ne, Re) | 0, p = p + Math.imul(te, Ne) | 0, a = a + Math.imul(te, Fe) | 0, a = a + Math.imul(re, Ne) | 0, g = g + Math.imul(re, Fe) | 0;
      var jr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (jr >>> 26) | 0, jr &= 67108863, p = Math.imul(he, Me), a = Math.imul(he, Se), a = a + Math.imul(ue, Me) | 0, g = Math.imul(ue, Se), p = p + Math.imul(ae, Ae) | 0, a = a + Math.imul(ae, Ee) | 0, a = a + Math.imul(fe, Ae) | 0, g = g + Math.imul(fe, Ee) | 0, p = p + Math.imul(se, Ie) | 0, a = a + Math.imul(se, Re) | 0, a = a + Math.imul(oe, Ie) | 0, g = g + Math.imul(oe, Re) | 0, p = p + Math.imul(ie, Ne) | 0, a = a + Math.imul(ie, Fe) | 0, a = a + Math.imul(ne, Ne) | 0, g = g + Math.imul(ne, Fe) | 0;
      var Gr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Gr >>> 26) | 0, Gr &= 67108863, p = Math.imul(he, Ae), a = Math.imul(he, Ee), a = a + Math.imul(ue, Ae) | 0, g = Math.imul(ue, Ee), p = p + Math.imul(ae, Ie) | 0, a = a + Math.imul(ae, Re) | 0, a = a + Math.imul(fe, Ie) | 0, g = g + Math.imul(fe, Re) | 0, p = p + Math.imul(se, Ne) | 0, a = a + Math.imul(se, Fe) | 0, a = a + Math.imul(oe, Ne) | 0, g = g + Math.imul(oe, Fe) | 0;
      var Hr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Hr >>> 26) | 0, Hr &= 67108863, p = Math.imul(he, Ie), a = Math.imul(he, Re), a = a + Math.imul(ue, Ie) | 0, g = Math.imul(ue, Re), p = p + Math.imul(ae, Ne) | 0, a = a + Math.imul(ae, Fe) | 0, a = a + Math.imul(fe, Ne) | 0, g = g + Math.imul(fe, Fe) | 0;
      var Jr = (M + p | 0) + ((a & 8191) << 13) | 0;
      M = (g + (a >>> 13) | 0) + (Jr >>> 26) | 0, Jr &= 67108863, p = Math.imul(he, Ne), a = Math.imul(he, Fe), a = a + Math.imul(ue, Ne) | 0, g = Math.imul(ue, Fe);
      var Wr = (M + p | 0) + ((a & 8191) << 13) | 0;
      return M = (g + (a >>> 13) | 0) + (Wr >>> 26) | 0, Wr &= 67108863, _[0] = pt, _[1] = vt, _[2] = gt, _[3] = mt, _[4] = yt, _[5] = $r, _[6] = Lr, _[7] = Dr, _[8] = Ur, _[9] = kr, _[10] = Br, _[11] = zr, _[12] = Vr, _[13] = Kr, _[14] = jr, _[15] = Gr, _[16] = Hr, _[17] = Jr, _[18] = Wr, M !== 0 && (_[19] = M, l.length++), l;
    };
    Math.imul || (K = T);
    function H(w, o, f) {
      f.negative = o.negative ^ w.negative, f.length = w.length + o.length;
      for (var l = 0, v = 0, y = 0; y < f.length - 1; y++) {
        var _ = v;
        v = 0;
        for (var M = l & 67108863, p = Math.min(y, o.length - 1), a = Math.max(0, y - w.length + 1); a <= p; a++) {
          var g = y - a, D = w.words[g] | 0, h = o.words[a] | 0, E = D * h, R = E & 67108863;
          _ = _ + (E / 67108864 | 0) | 0, R = R + M | 0, M = R & 67108863, _ = _ + (R >>> 26) | 0, v += _ >>> 26, _ &= 67108863;
        }
        f.words[y] = M, l = _, _ = v;
      }
      return l !== 0 ? f.words[y] = l : f.length--, f._strip();
    }
    function z(w, o, f) {
      return H(w, o, f);
    }
    s.prototype.mulTo = function(o, f) {
      var l, v = this.length + o.length;
      return this.length === 10 && o.length === 10 ? l = K(this, o, f) : v < 63 ? l = T(this, o, f) : v < 1024 ? l = H(this, o, f) : l = z(this, o, f), l;
    }, s.prototype.mul = function(o) {
      var f = new s(null);
      return f.words = new Array(this.length + o.length), this.mulTo(o, f);
    }, s.prototype.mulf = function(o) {
      var f = new s(null);
      return f.words = new Array(this.length + o.length), z(this, o, f);
    }, s.prototype.imul = function(o) {
      return this.clone().mulTo(o, this);
    }, s.prototype.imuln = function(o) {
      var f = o < 0;
      f && (o = -o), r(typeof o == "number"), r(o < 67108864);
      for (var l = 0, v = 0; v < this.length; v++) {
        var y = (this.words[v] | 0) * o, _ = (y & 67108863) + (l & 67108863);
        l >>= 26, l += y / 67108864 | 0, l += _ >>> 26, this.words[v] = _ & 67108863;
      }
      return l !== 0 && (this.words[v] = l, this.length++), f ? this.ineg() : this;
    }, s.prototype.muln = function(o) {
      return this.clone().imuln(o);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(o) {
      var f = $(o);
      if (f.length === 0)
        return new s(1);
      for (var l = this, v = 0; v < f.length && f[v] === 0; v++, l = l.sqr())
        ;
      if (++v < f.length)
        for (var y = l.sqr(); v < f.length; v++, y = y.sqr())
          f[v] !== 0 && (l = l.mul(y));
      return l;
    }, s.prototype.iushln = function(o) {
      r(typeof o == "number" && o >= 0);
      var f = o % 26, l = (o - f) / 26, v = 67108863 >>> 26 - f << 26 - f, y;
      if (f !== 0) {
        var _ = 0;
        for (y = 0; y < this.length; y++) {
          var M = this.words[y] & v, p = (this.words[y] | 0) - M << f;
          this.words[y] = p | _, _ = M >>> 26 - f;
        }
        _ && (this.words[y] = _, this.length++);
      }
      if (l !== 0) {
        for (y = this.length - 1; y >= 0; y--)
          this.words[y + l] = this.words[y];
        for (y = 0; y < l; y++)
          this.words[y] = 0;
        this.length += l;
      }
      return this._strip();
    }, s.prototype.ishln = function(o) {
      return r(this.negative === 0), this.iushln(o);
    }, s.prototype.iushrn = function(o, f, l) {
      r(typeof o == "number" && o >= 0);
      var v;
      f ? v = (f - f % 26) / 26 : v = 0;
      var y = o % 26, _ = Math.min((o - y) / 26, this.length), M = 67108863 ^ 67108863 >>> y << y, p = l;
      if (v -= _, v = Math.max(0, v), p) {
        for (var a = 0; a < _; a++)
          p.words[a] = this.words[a];
        p.length = _;
      }
      if (_ !== 0)
        if (this.length > _)
          for (this.length -= _, a = 0; a < this.length; a++)
            this.words[a] = this.words[a + _];
        else
          this.words[0] = 0, this.length = 1;
      var g = 0;
      for (a = this.length - 1; a >= 0 && (g !== 0 || a >= v); a--) {
        var D = this.words[a] | 0;
        this.words[a] = g << 26 - y | D >>> y, g = D & M;
      }
      return p && g !== 0 && (p.words[p.length++] = g), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, s.prototype.ishrn = function(o, f, l) {
      return r(this.negative === 0), this.iushrn(o, f, l);
    }, s.prototype.shln = function(o) {
      return this.clone().ishln(o);
    }, s.prototype.ushln = function(o) {
      return this.clone().iushln(o);
    }, s.prototype.shrn = function(o) {
      return this.clone().ishrn(o);
    }, s.prototype.ushrn = function(o) {
      return this.clone().iushrn(o);
    }, s.prototype.testn = function(o) {
      r(typeof o == "number" && o >= 0);
      var f = o % 26, l = (o - f) / 26, v = 1 << f;
      if (this.length <= l)
        return !1;
      var y = this.words[l];
      return !!(y & v);
    }, s.prototype.imaskn = function(o) {
      r(typeof o == "number" && o >= 0);
      var f = o % 26, l = (o - f) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (f !== 0 && l++, this.length = Math.min(l, this.length), f !== 0) {
        var v = 67108863 ^ 67108863 >>> f << f;
        this.words[this.length - 1] &= v;
      }
      return this._strip();
    }, s.prototype.maskn = function(o) {
      return this.clone().imaskn(o);
    }, s.prototype.iaddn = function(o) {
      return r(typeof o == "number"), r(o < 67108864), o < 0 ? this.isubn(-o) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= o ? (this.words[0] = o - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(o), this.negative = 1, this) : this._iaddn(o);
    }, s.prototype._iaddn = function(o) {
      this.words[0] += o;
      for (var f = 0; f < this.length && this.words[f] >= 67108864; f++)
        this.words[f] -= 67108864, f === this.length - 1 ? this.words[f + 1] = 1 : this.words[f + 1]++;
      return this.length = Math.max(this.length, f + 1), this;
    }, s.prototype.isubn = function(o) {
      if (r(typeof o == "number"), r(o < 67108864), o < 0)
        return this.iaddn(-o);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(o), this.negative = 1, this;
      if (this.words[0] -= o, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var f = 0; f < this.length && this.words[f] < 0; f++)
          this.words[f] += 67108864, this.words[f + 1] -= 1;
      return this._strip();
    }, s.prototype.addn = function(o) {
      return this.clone().iaddn(o);
    }, s.prototype.subn = function(o) {
      return this.clone().isubn(o);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(o, f, l) {
      var v = o.length + l, y;
      this._expand(v);
      var _, M = 0;
      for (y = 0; y < o.length; y++) {
        _ = (this.words[y + l] | 0) + M;
        var p = (o.words[y] | 0) * f;
        _ -= p & 67108863, M = (_ >> 26) - (p / 67108864 | 0), this.words[y + l] = _ & 67108863;
      }
      for (; y < this.length - l; y++)
        _ = (this.words[y + l] | 0) + M, M = _ >> 26, this.words[y + l] = _ & 67108863;
      if (M === 0)
        return this._strip();
      for (r(M === -1), M = 0, y = 0; y < this.length; y++)
        _ = -(this.words[y] | 0) + M, M = _ >> 26, this.words[y] = _ & 67108863;
      return this.negative = 1, this._strip();
    }, s.prototype._wordDiv = function(o, f) {
      var l = this.length - o.length, v = this.clone(), y = o, _ = y.words[y.length - 1] | 0, M = this._countBits(_);
      l = 26 - M, l !== 0 && (y = y.ushln(l), v.iushln(l), _ = y.words[y.length - 1] | 0);
      var p = v.length - y.length, a;
      if (f !== "mod") {
        a = new s(null), a.length = p + 1, a.words = new Array(a.length);
        for (var g = 0; g < a.length; g++)
          a.words[g] = 0;
      }
      var D = v.clone()._ishlnsubmul(y, 1, p);
      D.negative === 0 && (v = D, a && (a.words[p] = 1));
      for (var h = p - 1; h >= 0; h--) {
        var E = (v.words[y.length + h] | 0) * 67108864 + (v.words[y.length + h - 1] | 0);
        for (E = Math.min(E / _ | 0, 67108863), v._ishlnsubmul(y, E, h); v.negative !== 0; )
          E--, v.negative = 0, v._ishlnsubmul(y, 1, h), v.isZero() || (v.negative ^= 1);
        a && (a.words[h] = E);
      }
      return a && a._strip(), v._strip(), f !== "div" && l !== 0 && v.iushrn(l), {
        div: a || null,
        mod: v
      };
    }, s.prototype.divmod = function(o, f, l) {
      if (r(!o.isZero()), this.isZero())
        return {
          div: new s(0),
          mod: new s(0)
        };
      var v, y, _;
      return this.negative !== 0 && o.negative === 0 ? (_ = this.neg().divmod(o, f), f !== "mod" && (v = _.div.neg()), f !== "div" && (y = _.mod.neg(), l && y.negative !== 0 && y.iadd(o)), {
        div: v,
        mod: y
      }) : this.negative === 0 && o.negative !== 0 ? (_ = this.divmod(o.neg(), f), f !== "mod" && (v = _.div.neg()), {
        div: v,
        mod: _.mod
      }) : this.negative & o.negative ? (_ = this.neg().divmod(o.neg(), f), f !== "div" && (y = _.mod.neg(), l && y.negative !== 0 && y.isub(o)), {
        div: _.div,
        mod: y
      }) : o.length > this.length || this.cmp(o) < 0 ? {
        div: new s(0),
        mod: this
      } : o.length === 1 ? f === "div" ? {
        div: this.divn(o.words[0]),
        mod: null
      } : f === "mod" ? {
        div: null,
        mod: new s(this.modrn(o.words[0]))
      } : {
        div: this.divn(o.words[0]),
        mod: new s(this.modrn(o.words[0]))
      } : this._wordDiv(o, f);
    }, s.prototype.div = function(o) {
      return this.divmod(o, "div", !1).div;
    }, s.prototype.mod = function(o) {
      return this.divmod(o, "mod", !1).mod;
    }, s.prototype.umod = function(o) {
      return this.divmod(o, "mod", !0).mod;
    }, s.prototype.divRound = function(o) {
      var f = this.divmod(o);
      if (f.mod.isZero())
        return f.div;
      var l = f.div.negative !== 0 ? f.mod.isub(o) : f.mod, v = o.ushrn(1), y = o.andln(1), _ = l.cmp(v);
      return _ < 0 || y === 1 && _ === 0 ? f.div : f.div.negative !== 0 ? f.div.isubn(1) : f.div.iaddn(1);
    }, s.prototype.modrn = function(o) {
      var f = o < 0;
      f && (o = -o), r(o <= 67108863);
      for (var l = (1 << 26) % o, v = 0, y = this.length - 1; y >= 0; y--)
        v = (l * v + (this.words[y] | 0)) % o;
      return f ? -v : v;
    }, s.prototype.modn = function(o) {
      return this.modrn(o);
    }, s.prototype.idivn = function(o) {
      var f = o < 0;
      f && (o = -o), r(o <= 67108863);
      for (var l = 0, v = this.length - 1; v >= 0; v--) {
        var y = (this.words[v] | 0) + l * 67108864;
        this.words[v] = y / o | 0, l = y % o;
      }
      return this._strip(), f ? this.ineg() : this;
    }, s.prototype.divn = function(o) {
      return this.clone().idivn(o);
    }, s.prototype.egcd = function(o) {
      r(o.negative === 0), r(!o.isZero());
      var f = this, l = o.clone();
      f.negative !== 0 ? f = f.umod(o) : f = f.clone();
      for (var v = new s(1), y = new s(0), _ = new s(0), M = new s(1), p = 0; f.isEven() && l.isEven(); )
        f.iushrn(1), l.iushrn(1), ++p;
      for (var a = l.clone(), g = f.clone(); !f.isZero(); ) {
        for (var D = 0, h = 1; !(f.words[0] & h) && D < 26; ++D, h <<= 1)
          ;
        if (D > 0)
          for (f.iushrn(D); D-- > 0; )
            (v.isOdd() || y.isOdd()) && (v.iadd(a), y.isub(g)), v.iushrn(1), y.iushrn(1);
        for (var E = 0, R = 1; !(l.words[0] & R) && E < 26; ++E, R <<= 1)
          ;
        if (E > 0)
          for (l.iushrn(E); E-- > 0; )
            (_.isOdd() || M.isOdd()) && (_.iadd(a), M.isub(g)), _.iushrn(1), M.iushrn(1);
        f.cmp(l) >= 0 ? (f.isub(l), v.isub(_), y.isub(M)) : (l.isub(f), _.isub(v), M.isub(y));
      }
      return {
        a: _,
        b: M,
        gcd: l.iushln(p)
      };
    }, s.prototype._invmp = function(o) {
      r(o.negative === 0), r(!o.isZero());
      var f = this, l = o.clone();
      f.negative !== 0 ? f = f.umod(o) : f = f.clone();
      for (var v = new s(1), y = new s(0), _ = l.clone(); f.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var M = 0, p = 1; !(f.words[0] & p) && M < 26; ++M, p <<= 1)
          ;
        if (M > 0)
          for (f.iushrn(M); M-- > 0; )
            v.isOdd() && v.iadd(_), v.iushrn(1);
        for (var a = 0, g = 1; !(l.words[0] & g) && a < 26; ++a, g <<= 1)
          ;
        if (a > 0)
          for (l.iushrn(a); a-- > 0; )
            y.isOdd() && y.iadd(_), y.iushrn(1);
        f.cmp(l) >= 0 ? (f.isub(l), v.isub(y)) : (l.isub(f), y.isub(v));
      }
      var D;
      return f.cmpn(1) === 0 ? D = v : D = y, D.cmpn(0) < 0 && D.iadd(o), D;
    }, s.prototype.gcd = function(o) {
      if (this.isZero())
        return o.abs();
      if (o.isZero())
        return this.abs();
      var f = this.clone(), l = o.clone();
      f.negative = 0, l.negative = 0;
      for (var v = 0; f.isEven() && l.isEven(); v++)
        f.iushrn(1), l.iushrn(1);
      do {
        for (; f.isEven(); )
          f.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var y = f.cmp(l);
        if (y < 0) {
          var _ = f;
          f = l, l = _;
        } else if (y === 0 || l.cmpn(1) === 0)
          break;
        f.isub(l);
      } while (!0);
      return l.iushln(v);
    }, s.prototype.invm = function(o) {
      return this.egcd(o).a.umod(o);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(o) {
      return this.words[0] & o;
    }, s.prototype.bincn = function(o) {
      r(typeof o == "number");
      var f = o % 26, l = (o - f) / 26, v = 1 << f;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= v, this;
      for (var y = v, _ = l; y !== 0 && _ < this.length; _++) {
        var M = this.words[_] | 0;
        M += y, y = M >>> 26, M &= 67108863, this.words[_] = M;
      }
      return y !== 0 && (this.words[_] = y, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(o) {
      var f = o < 0;
      if (this.negative !== 0 && !f)
        return -1;
      if (this.negative === 0 && f)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        f && (o = -o), r(o <= 67108863, "Number is too big");
        var v = this.words[0] | 0;
        l = v === o ? 0 : v < o ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, s.prototype.cmp = function(o) {
      if (this.negative !== 0 && o.negative === 0)
        return -1;
      if (this.negative === 0 && o.negative !== 0)
        return 1;
      var f = this.ucmp(o);
      return this.negative !== 0 ? -f | 0 : f;
    }, s.prototype.ucmp = function(o) {
      if (this.length > o.length)
        return 1;
      if (this.length < o.length)
        return -1;
      for (var f = 0, l = this.length - 1; l >= 0; l--) {
        var v = this.words[l] | 0, y = o.words[l] | 0;
        if (v !== y) {
          v < y ? f = -1 : v > y && (f = 1);
          break;
        }
      }
      return f;
    }, s.prototype.gtn = function(o) {
      return this.cmpn(o) === 1;
    }, s.prototype.gt = function(o) {
      return this.cmp(o) === 1;
    }, s.prototype.gten = function(o) {
      return this.cmpn(o) >= 0;
    }, s.prototype.gte = function(o) {
      return this.cmp(o) >= 0;
    }, s.prototype.ltn = function(o) {
      return this.cmpn(o) === -1;
    }, s.prototype.lt = function(o) {
      return this.cmp(o) === -1;
    }, s.prototype.lten = function(o) {
      return this.cmpn(o) <= 0;
    }, s.prototype.lte = function(o) {
      return this.cmp(o) <= 0;
    }, s.prototype.eqn = function(o) {
      return this.cmpn(o) === 0;
    }, s.prototype.eq = function(o) {
      return this.cmp(o) === 0;
    }, s.red = function(o) {
      return new Q(o);
    }, s.prototype.toRed = function(o) {
      return r(!this.red, "Already a number in reduction context"), r(this.negative === 0, "red works only with positives"), o.convertTo(this)._forceRed(o);
    }, s.prototype.fromRed = function() {
      return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(o) {
      return this.red = o, this;
    }, s.prototype.forceRed = function(o) {
      return r(!this.red, "Already a number in reduction context"), this._forceRed(o);
    }, s.prototype.redAdd = function(o) {
      return r(this.red, "redAdd works only with red numbers"), this.red.add(this, o);
    }, s.prototype.redIAdd = function(o) {
      return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, o);
    }, s.prototype.redSub = function(o) {
      return r(this.red, "redSub works only with red numbers"), this.red.sub(this, o);
    }, s.prototype.redISub = function(o) {
      return r(this.red, "redISub works only with red numbers"), this.red.isub(this, o);
    }, s.prototype.redShl = function(o) {
      return r(this.red, "redShl works only with red numbers"), this.red.shl(this, o);
    }, s.prototype.redMul = function(o) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.mul(this, o);
    }, s.prototype.redIMul = function(o) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.imul(this, o);
    }, s.prototype.redSqr = function() {
      return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(o) {
      return r(this.red && !o.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, o);
    };
    var V = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function j(w, o) {
      this.name = w, this.p = new s(o, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    j.prototype._tmp = function() {
      var o = new s(null);
      return o.words = new Array(Math.ceil(this.n / 13)), o;
    }, j.prototype.ireduce = function(o) {
      var f = o, l;
      do
        this.split(f, this.tmp), f = this.imulK(f), f = f.iadd(this.tmp), l = f.bitLength();
      while (l > this.n);
      var v = l < this.n ? -1 : f.ucmp(this.p);
      return v === 0 ? (f.words[0] = 0, f.length = 1) : v > 0 ? f.isub(this.p) : f.strip !== void 0 ? f.strip() : f._strip(), f;
    }, j.prototype.split = function(o, f) {
      o.iushrn(this.n, 0, f);
    }, j.prototype.imulK = function(o) {
      return o.imul(this.k);
    };
    function J() {
      j.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    n(J, j), J.prototype.split = function(o, f) {
      for (var l = 4194303, v = Math.min(o.length, 9), y = 0; y < v; y++)
        f.words[y] = o.words[y];
      if (f.length = v, o.length <= 9) {
        o.words[0] = 0, o.length = 1;
        return;
      }
      var _ = o.words[9];
      for (f.words[f.length++] = _ & l, y = 10; y < o.length; y++) {
        var M = o.words[y] | 0;
        o.words[y - 10] = (M & l) << 4 | _ >>> 22, _ = M;
      }
      _ >>>= 22, o.words[y - 10] = _, _ === 0 && o.length > 10 ? o.length -= 10 : o.length -= 9;
    }, J.prototype.imulK = function(o) {
      o.words[o.length] = 0, o.words[o.length + 1] = 0, o.length += 2;
      for (var f = 0, l = 0; l < o.length; l++) {
        var v = o.words[l] | 0;
        f += v * 977, o.words[l] = f & 67108863, f = v * 64 + (f / 67108864 | 0);
      }
      return o.words[o.length - 1] === 0 && (o.length--, o.words[o.length - 1] === 0 && o.length--), o;
    };
    function Y() {
      j.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    n(Y, j);
    function Te() {
      j.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    n(Te, j);
    function dt() {
      j.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    n(dt, j), dt.prototype.imulK = function(o) {
      for (var f = 0, l = 0; l < o.length; l++) {
        var v = (o.words[l] | 0) * 19 + f, y = v & 67108863;
        v >>>= 26, o.words[l] = y, f = v;
      }
      return f !== 0 && (o.words[o.length++] = f), o;
    }, s._prime = function(o) {
      if (V[o])
        return V[o];
      var f;
      if (o === "k256")
        f = new J();
      else if (o === "p224")
        f = new Y();
      else if (o === "p192")
        f = new Te();
      else if (o === "p25519")
        f = new dt();
      else
        throw new Error("Unknown prime " + o);
      return V[o] = f, f;
    };
    function Q(w) {
      if (typeof w == "string") {
        var o = s._prime(w);
        this.m = o.p, this.prime = o;
      } else
        r(w.gtn(1), "modulus must be greater than 1"), this.m = w, this.prime = null;
    }
    Q.prototype._verify1 = function(o) {
      r(o.negative === 0, "red works only with positives"), r(o.red, "red works only with red numbers");
    }, Q.prototype._verify2 = function(o, f) {
      r((o.negative | f.negative) === 0, "red works only with positives"), r(
        o.red && o.red === f.red,
        "red works only with red numbers"
      );
    }, Q.prototype.imod = function(o) {
      return this.prime ? this.prime.ireduce(o)._forceRed(this) : (b(o, o.umod(this.m)._forceRed(this)), o);
    }, Q.prototype.neg = function(o) {
      return o.isZero() ? o.clone() : this.m.sub(o)._forceRed(this);
    }, Q.prototype.add = function(o, f) {
      this._verify2(o, f);
      var l = o.add(f);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, Q.prototype.iadd = function(o, f) {
      this._verify2(o, f);
      var l = o.iadd(f);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, Q.prototype.sub = function(o, f) {
      this._verify2(o, f);
      var l = o.sub(f);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, Q.prototype.isub = function(o, f) {
      this._verify2(o, f);
      var l = o.isub(f);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, Q.prototype.shl = function(o, f) {
      return this._verify1(o), this.imod(o.ushln(f));
    }, Q.prototype.imul = function(o, f) {
      return this._verify2(o, f), this.imod(o.imul(f));
    }, Q.prototype.mul = function(o, f) {
      return this._verify2(o, f), this.imod(o.mul(f));
    }, Q.prototype.isqr = function(o) {
      return this.imul(o, o.clone());
    }, Q.prototype.sqr = function(o) {
      return this.mul(o, o);
    }, Q.prototype.sqrt = function(o) {
      if (o.isZero())
        return o.clone();
      var f = this.m.andln(3);
      if (r(f % 2 === 1), f === 3) {
        var l = this.m.add(new s(1)).iushrn(2);
        return this.pow(o, l);
      }
      for (var v = this.m.subn(1), y = 0; !v.isZero() && v.andln(1) === 0; )
        y++, v.iushrn(1);
      r(!v.isZero());
      var _ = new s(1).toRed(this), M = _.redNeg(), p = this.m.subn(1).iushrn(1), a = this.m.bitLength();
      for (a = new s(2 * a * a).toRed(this); this.pow(a, p).cmp(M) !== 0; )
        a.redIAdd(M);
      for (var g = this.pow(a, v), D = this.pow(o, v.addn(1).iushrn(1)), h = this.pow(o, v), E = y; h.cmp(_) !== 0; ) {
        for (var R = h, N = 0; R.cmp(_) !== 0; N++)
          R = R.redSqr();
        r(N < E);
        var P = this.pow(g, new s(1).iushln(E - N - 1));
        D = D.redMul(P), g = P.redSqr(), h = h.redMul(g), E = N;
      }
      return D;
    }, Q.prototype.invm = function(o) {
      var f = o._invmp(this.m);
      return f.negative !== 0 ? (f.negative = 0, this.imod(f).redNeg()) : this.imod(f);
    }, Q.prototype.pow = function(o, f) {
      if (f.isZero())
        return new s(1).toRed(this);
      if (f.cmpn(1) === 0)
        return o.clone();
      var l = 4, v = new Array(1 << l);
      v[0] = new s(1).toRed(this), v[1] = o;
      for (var y = 2; y < v.length; y++)
        v[y] = this.mul(v[y - 1], o);
      var _ = v[0], M = 0, p = 0, a = f.bitLength() % 26;
      for (a === 0 && (a = 26), y = f.length - 1; y >= 0; y--) {
        for (var g = f.words[y], D = a - 1; D >= 0; D--) {
          var h = g >> D & 1;
          if (_ !== v[0] && (_ = this.sqr(_)), h === 0 && M === 0) {
            p = 0;
            continue;
          }
          M <<= 1, M |= h, p++, !(p !== l && (y !== 0 || D !== 0)) && (_ = this.mul(_, v[M]), p = 0, M = 0);
        }
        a = 26;
      }
      return _;
    }, Q.prototype.convertTo = function(o) {
      var f = o.umod(this.m);
      return f === o ? f.clone() : f;
    }, Q.prototype.convertFrom = function(o) {
      var f = o.clone();
      return f.red = null, f;
    }, s.mont = function(o) {
      return new je(o);
    };
    function je(w) {
      Q.call(this, w), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(je, Q), je.prototype.convertTo = function(o) {
      return this.imod(o.ushln(this.shift));
    }, je.prototype.convertFrom = function(o) {
      var f = this.imod(o.mul(this.rinv));
      return f.red = null, f;
    }, je.prototype.imul = function(o, f) {
      if (o.isZero() || f.isZero())
        return o.words[0] = 0, o.length = 1, o;
      var l = o.imul(f), v = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = l.isub(v).iushrn(this.shift), _ = y;
      return y.cmp(this.m) >= 0 ? _ = y.isub(this.m) : y.cmpn(0) < 0 && (_ = y.iadd(this.m)), _._forceRed(this);
    }, je.prototype.mul = function(o, f) {
      if (o.isZero() || f.isZero())
        return new s(0)._forceRed(this);
      var l = o.mul(f), v = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = l.isub(v).iushrn(this.shift), _ = y;
      return y.cmp(this.m) >= 0 ? _ = y.isub(this.m) : y.cmpn(0) < 0 && (_ = y.iadd(this.m)), _._forceRed(this);
    }, je.prototype.invm = function(o) {
      var f = this.imod(o._invmp(this.m).mul(this.r2));
      return f._forceRed(this);
    };
  })(i, Rn);
})(Si);
var uo = Si.exports;
const k = /* @__PURE__ */ Pr(uo);
var co = k.BN;
function lo(i) {
  return new co(i, 36).toString(16);
}
const po = "strings/5.7.0", vo = new Pe(po);
var Ir;
(function(i) {
  i.current = "", i.NFC = "NFC", i.NFD = "NFD", i.NFKC = "NFKC", i.NFKD = "NFKD";
})(Ir || (Ir = {}));
var Vi;
(function(i) {
  i.UNEXPECTED_CONTINUE = "unexpected continuation byte", i.BAD_PREFIX = "bad codepoint prefix", i.OVERRUN = "string overrun", i.MISSING_CONTINUE = "missing continuation byte", i.OUT_OF_RANGE = "out of UTF-8 range", i.UTF16_SURROGATE = "UTF-16 surrogate", i.OVERLONG = "overlong representation";
})(Vi || (Vi = {}));
function ti(i, t = Ir.current) {
  t != Ir.current && (vo.checkNormalize(), i = i.normalize(t));
  let e = [];
  for (let r = 0; r < i.length; r++) {
    const n = i.charCodeAt(r);
    if (n < 128)
      e.push(n);
    else if (n < 2048)
      e.push(n >> 6 | 192), e.push(n & 63 | 128);
    else if ((n & 64512) == 55296) {
      r++;
      const s = i.charCodeAt(r);
      if (r >= i.length || (s & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const u = 65536 + ((n & 1023) << 10) + (s & 1023);
      e.push(u >> 18 | 240), e.push(u >> 12 & 63 | 128), e.push(u >> 6 & 63 | 128), e.push(u & 63 | 128);
    } else
      e.push(n >> 12 | 224), e.push(n >> 6 & 63 | 128), e.push(n & 63 | 128);
  }
  return Ce(e);
}
const go = `Ethereum Signed Message:
`;
function Tn(i) {
  return typeof i == "string" && (i = ti(i)), Mi(ao([
    ti(go),
    ti(String(i.length)),
    i
  ]));
}
const mo = "address/5.7.0", lr = new Pe(mo);
function Ki(i) {
  tt(i, 20) || lr.throwArgumentError("invalid address", "address", i), i = i.toLowerCase();
  const t = i.substring(2).split(""), e = new Uint8Array(40);
  for (let n = 0; n < 40; n++)
    e[n] = t[n].charCodeAt(0);
  const r = Ce(Mi(e));
  for (let n = 0; n < 40; n += 2)
    r[n >> 1] >> 4 >= 8 && (t[n] = t[n].toUpperCase()), (r[n >> 1] & 15) >= 8 && (t[n + 1] = t[n + 1].toUpperCase());
  return "0x" + t.join("");
}
const yo = 9007199254740991;
function wo(i) {
  return Math.log10 ? Math.log10(i) : Math.log(i) / Math.LN10;
}
const Ai = {};
for (let i = 0; i < 10; i++)
  Ai[String(i)] = String(i);
for (let i = 0; i < 26; i++)
  Ai[String.fromCharCode(65 + i)] = String(10 + i);
const ji = Math.floor(wo(yo));
function bo(i) {
  i = i.toUpperCase(), i = i.substring(4) + i.substring(0, 2) + "00";
  let t = i.split("").map((r) => Ai[r]).join("");
  for (; t.length >= ji; ) {
    let r = t.substring(0, ji);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
function xo(i) {
  let t = null;
  if (typeof i != "string" && lr.throwArgumentError("invalid address", "address", i), i.match(/^(0x)?[0-9a-fA-F]{40}$/))
    i.substring(0, 2) !== "0x" && (i = "0x" + i), t = Ki(i), i.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== i && lr.throwArgumentError("bad address checksum", "address", i);
  else if (i.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (i.substring(2, 4) !== bo(i) && lr.throwArgumentError("bad icap checksum", "address", i), t = lo(i.substring(4)); t.length < 40; )
      t = "0" + t;
    t = Ki("0x" + t);
  } else
    lr.throwArgumentError("invalid address", "address", i);
  return t;
}
globalThis && globalThis.__awaiter;
function or(i, t, e) {
  Object.defineProperty(i, t, {
    enumerable: !0,
    value: e,
    writable: !1
  });
}
var $n = {}, G = {}, pr = Ln;
function Ln(i, t) {
  if (!i)
    throw new Error(t || "Assertion failed");
}
Ln.equal = function(t, e, r) {
  if (t != e)
    throw new Error(r || "Assertion failed: " + t + " != " + e);
};
var vi = { exports: {} };
typeof Object.create == "function" ? vi.exports = function(t, e) {
  e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : vi.exports = function(t, e) {
  if (e) {
    t.super_ = e;
    var r = function() {
    };
    r.prototype = e.prototype, t.prototype = new r(), t.prototype.constructor = t;
  }
};
var _o = vi.exports, Mo = pr, So = _o;
G.inherits = So;
function Ao(i, t) {
  return (i.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= i.length ? !1 : (i.charCodeAt(t + 1) & 64512) === 56320;
}
function Eo(i, t) {
  if (Array.isArray(i))
    return i.slice();
  if (!i)
    return [];
  var e = [];
  if (typeof i == "string")
    if (t) {
      if (t === "hex")
        for (i = i.replace(/[^a-z0-9]+/ig, ""), i.length % 2 !== 0 && (i = "0" + i), n = 0; n < i.length; n += 2)
          e.push(parseInt(i[n] + i[n + 1], 16));
    } else
      for (var r = 0, n = 0; n < i.length; n++) {
        var s = i.charCodeAt(n);
        s < 128 ? e[r++] = s : s < 2048 ? (e[r++] = s >> 6 | 192, e[r++] = s & 63 | 128) : Ao(i, n) ? (s = 65536 + ((s & 1023) << 10) + (i.charCodeAt(++n) & 1023), e[r++] = s >> 18 | 240, e[r++] = s >> 12 & 63 | 128, e[r++] = s >> 6 & 63 | 128, e[r++] = s & 63 | 128) : (e[r++] = s >> 12 | 224, e[r++] = s >> 6 & 63 | 128, e[r++] = s & 63 | 128);
      }
  else
    for (n = 0; n < i.length; n++)
      e[n] = i[n] | 0;
  return e;
}
G.toArray = Eo;
function Io(i) {
  for (var t = "", e = 0; e < i.length; e++)
    t += Un(i[e].toString(16));
  return t;
}
G.toHex = Io;
function Dn(i) {
  var t = i >>> 24 | i >>> 8 & 65280 | i << 8 & 16711680 | (i & 255) << 24;
  return t >>> 0;
}
G.htonl = Dn;
function Ro(i, t) {
  for (var e = "", r = 0; r < i.length; r++) {
    var n = i[r];
    t === "little" && (n = Dn(n)), e += kn(n.toString(16));
  }
  return e;
}
G.toHex32 = Ro;
function Un(i) {
  return i.length === 1 ? "0" + i : i;
}
G.zero2 = Un;
function kn(i) {
  return i.length === 7 ? "0" + i : i.length === 6 ? "00" + i : i.length === 5 ? "000" + i : i.length === 4 ? "0000" + i : i.length === 3 ? "00000" + i : i.length === 2 ? "000000" + i : i.length === 1 ? "0000000" + i : i;
}
G.zero8 = kn;
function No(i, t, e, r) {
  var n = e - t;
  Mo(n % 4 === 0);
  for (var s = new Array(n / 4), u = 0, c = t; u < s.length; u++, c += 4) {
    var d;
    r === "big" ? d = i[c] << 24 | i[c + 1] << 16 | i[c + 2] << 8 | i[c + 3] : d = i[c + 3] << 24 | i[c + 2] << 16 | i[c + 1] << 8 | i[c], s[u] = d >>> 0;
  }
  return s;
}
G.join32 = No;
function Fo(i, t) {
  for (var e = new Array(i.length * 4), r = 0, n = 0; r < i.length; r++, n += 4) {
    var s = i[r];
    t === "big" ? (e[n] = s >>> 24, e[n + 1] = s >>> 16 & 255, e[n + 2] = s >>> 8 & 255, e[n + 3] = s & 255) : (e[n + 3] = s >>> 24, e[n + 2] = s >>> 16 & 255, e[n + 1] = s >>> 8 & 255, e[n] = s & 255);
  }
  return e;
}
G.split32 = Fo;
function Po(i, t) {
  return i >>> t | i << 32 - t;
}
G.rotr32 = Po;
function qo(i, t) {
  return i << t | i >>> 32 - t;
}
G.rotl32 = qo;
function Oo(i, t) {
  return i + t >>> 0;
}
G.sum32 = Oo;
function Co(i, t, e) {
  return i + t + e >>> 0;
}
G.sum32_3 = Co;
function To(i, t, e, r) {
  return i + t + e + r >>> 0;
}
G.sum32_4 = To;
function $o(i, t, e, r, n) {
  return i + t + e + r + n >>> 0;
}
G.sum32_5 = $o;
function Lo(i, t, e, r) {
  var n = i[t], s = i[t + 1], u = r + s >>> 0, c = (u < r ? 1 : 0) + e + n;
  i[t] = c >>> 0, i[t + 1] = u;
}
G.sum64 = Lo;
function Do(i, t, e, r) {
  var n = t + r >>> 0, s = (n < t ? 1 : 0) + i + e;
  return s >>> 0;
}
G.sum64_hi = Do;
function Uo(i, t, e, r) {
  var n = t + r;
  return n >>> 0;
}
G.sum64_lo = Uo;
function ko(i, t, e, r, n, s, u, c) {
  var d = 0, m = t;
  m = m + r >>> 0, d += m < t ? 1 : 0, m = m + s >>> 0, d += m < s ? 1 : 0, m = m + c >>> 0, d += m < c ? 1 : 0;
  var b = i + e + n + u + d;
  return b >>> 0;
}
G.sum64_4_hi = ko;
function Bo(i, t, e, r, n, s, u, c) {
  var d = t + r + s + c;
  return d >>> 0;
}
G.sum64_4_lo = Bo;
function zo(i, t, e, r, n, s, u, c, d, m) {
  var b = 0, x = t;
  x = x + r >>> 0, b += x < t ? 1 : 0, x = x + s >>> 0, b += x < s ? 1 : 0, x = x + c >>> 0, b += x < c ? 1 : 0, x = x + m >>> 0, b += x < m ? 1 : 0;
  var A = i + e + n + u + d + b;
  return A >>> 0;
}
G.sum64_5_hi = zo;
function Vo(i, t, e, r, n, s, u, c, d, m) {
  var b = t + r + s + c + m;
  return b >>> 0;
}
G.sum64_5_lo = Vo;
function Ko(i, t, e) {
  var r = t << 32 - e | i >>> e;
  return r >>> 0;
}
G.rotr64_hi = Ko;
function jo(i, t, e) {
  var r = i << 32 - e | t >>> e;
  return r >>> 0;
}
G.rotr64_lo = jo;
function Go(i, t, e) {
  return i >>> e;
}
G.shr64_hi = Go;
function Ho(i, t, e) {
  var r = i << 32 - e | t >>> e;
  return r >>> 0;
}
G.shr64_lo = Ho;
var Zt = {}, Gi = G, Jo = pr;
function qr() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
Zt.BlockHash = qr;
qr.prototype.update = function(t, e) {
  if (t = Gi.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
    t = this.pending;
    var r = t.length % this._delta8;
    this.pending = t.slice(t.length - r, t.length), this.pending.length === 0 && (this.pending = null), t = Gi.join32(t, 0, t.length - r, this.endian);
    for (var n = 0; n < t.length; n += this._delta32)
      this._update(t, n, n + this._delta32);
  }
  return this;
};
qr.prototype.digest = function(t) {
  return this.update(this._pad()), Jo(this.pending === null), this._digest(t);
};
qr.prototype._pad = function() {
  var t = this.pendingTotal, e = this._delta8, r = e - (t + this.padLength) % e, n = new Array(r + this.padLength);
  n[0] = 128;
  for (var s = 1; s < r; s++)
    n[s] = 0;
  if (t <<= 3, this.endian === "big") {
    for (var u = 8; u < this.padLength; u++)
      n[s++] = 0;
    n[s++] = 0, n[s++] = 0, n[s++] = 0, n[s++] = 0, n[s++] = t >>> 24 & 255, n[s++] = t >>> 16 & 255, n[s++] = t >>> 8 & 255, n[s++] = t & 255;
  } else
    for (n[s++] = t & 255, n[s++] = t >>> 8 & 255, n[s++] = t >>> 16 & 255, n[s++] = t >>> 24 & 255, n[s++] = 0, n[s++] = 0, n[s++] = 0, n[s++] = 0, u = 8; u < this.padLength; u++)
      n[s++] = 0;
  return n;
};
var er = {}, ft = {}, Wo = G, rt = Wo.rotr32;
function Xo(i, t, e, r) {
  if (i === 0)
    return Bn(t, e, r);
  if (i === 1 || i === 3)
    return Vn(t, e, r);
  if (i === 2)
    return zn(t, e, r);
}
ft.ft_1 = Xo;
function Bn(i, t, e) {
  return i & t ^ ~i & e;
}
ft.ch32 = Bn;
function zn(i, t, e) {
  return i & t ^ i & e ^ t & e;
}
ft.maj32 = zn;
function Vn(i, t, e) {
  return i ^ t ^ e;
}
ft.p32 = Vn;
function Yo(i) {
  return rt(i, 2) ^ rt(i, 13) ^ rt(i, 22);
}
ft.s0_256 = Yo;
function Qo(i) {
  return rt(i, 6) ^ rt(i, 11) ^ rt(i, 25);
}
ft.s1_256 = Qo;
function Zo(i) {
  return rt(i, 7) ^ rt(i, 18) ^ i >>> 3;
}
ft.g0_256 = Zo;
function ea(i) {
  return rt(i, 17) ^ rt(i, 19) ^ i >>> 10;
}
ft.g1_256 = ea;
var Xt = G, ta = Zt, ra = ft, ri = Xt.rotl32, ar = Xt.sum32, ia = Xt.sum32_5, na = ra.ft_1, Kn = ta.BlockHash, sa = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function st() {
  if (!(this instanceof st))
    return new st();
  Kn.call(this), this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ], this.W = new Array(80);
}
Xt.inherits(st, Kn);
var oa = st;
st.blockSize = 512;
st.outSize = 160;
st.hmacStrength = 80;
st.padLength = 64;
st.prototype._update = function(t, e) {
  for (var r = this.W, n = 0; n < 16; n++)
    r[n] = t[e + n];
  for (; n < r.length; n++)
    r[n] = ri(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
  var s = this.h[0], u = this.h[1], c = this.h[2], d = this.h[3], m = this.h[4];
  for (n = 0; n < r.length; n++) {
    var b = ~~(n / 20), x = ia(ri(s, 5), na(b, u, c, d), m, r[n], sa[b]);
    m = d, d = c, c = ri(u, 30), u = s, s = x;
  }
  this.h[0] = ar(this.h[0], s), this.h[1] = ar(this.h[1], u), this.h[2] = ar(this.h[2], c), this.h[3] = ar(this.h[3], d), this.h[4] = ar(this.h[4], m);
};
st.prototype._digest = function(t) {
  return t === "hex" ? Xt.toHex32(this.h, "big") : Xt.split32(this.h, "big");
};
var Yt = G, aa = Zt, tr = ft, fa = pr, Xe = Yt.sum32, ha = Yt.sum32_4, ua = Yt.sum32_5, ca = tr.ch32, la = tr.maj32, da = tr.s0_256, pa = tr.s1_256, va = tr.g0_256, ga = tr.g1_256, jn = aa.BlockHash, ma = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function ot() {
  if (!(this instanceof ot))
    return new ot();
  jn.call(this), this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], this.k = ma, this.W = new Array(64);
}
Yt.inherits(ot, jn);
var Gn = ot;
ot.blockSize = 512;
ot.outSize = 256;
ot.hmacStrength = 192;
ot.padLength = 64;
ot.prototype._update = function(t, e) {
  for (var r = this.W, n = 0; n < 16; n++)
    r[n] = t[e + n];
  for (; n < r.length; n++)
    r[n] = ha(ga(r[n - 2]), r[n - 7], va(r[n - 15]), r[n - 16]);
  var s = this.h[0], u = this.h[1], c = this.h[2], d = this.h[3], m = this.h[4], b = this.h[5], x = this.h[6], A = this.h[7];
  for (fa(this.k.length === r.length), n = 0; n < r.length; n++) {
    var I = ua(A, pa(m), ca(m, b, x), this.k[n], r[n]), S = Xe(da(s), la(s, u, c));
    A = x, x = b, b = m, m = Xe(d, I), d = c, c = u, u = s, s = Xe(I, S);
  }
  this.h[0] = Xe(this.h[0], s), this.h[1] = Xe(this.h[1], u), this.h[2] = Xe(this.h[2], c), this.h[3] = Xe(this.h[3], d), this.h[4] = Xe(this.h[4], m), this.h[5] = Xe(this.h[5], b), this.h[6] = Xe(this.h[6], x), this.h[7] = Xe(this.h[7], A);
};
ot.prototype._digest = function(t) {
  return t === "hex" ? Yt.toHex32(this.h, "big") : Yt.split32(this.h, "big");
};
var gi = G, Hn = Gn;
function ct() {
  if (!(this instanceof ct))
    return new ct();
  Hn.call(this), this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
gi.inherits(ct, Hn);
var ya = ct;
ct.blockSize = 512;
ct.outSize = 224;
ct.hmacStrength = 192;
ct.padLength = 64;
ct.prototype._digest = function(t) {
  return t === "hex" ? gi.toHex32(this.h.slice(0, 7), "big") : gi.split32(this.h.slice(0, 7), "big");
};
var Ve = G, wa = Zt, ba = pr, it = Ve.rotr64_hi, nt = Ve.rotr64_lo, Jn = Ve.shr64_hi, Wn = Ve.shr64_lo, wt = Ve.sum64, ii = Ve.sum64_hi, ni = Ve.sum64_lo, xa = Ve.sum64_4_hi, _a = Ve.sum64_4_lo, Ma = Ve.sum64_5_hi, Sa = Ve.sum64_5_lo, Xn = wa.BlockHash, Aa = [
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
];
function Ze() {
  if (!(this instanceof Ze))
    return new Ze();
  Xn.call(this), this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ], this.k = Aa, this.W = new Array(160);
}
Ve.inherits(Ze, Xn);
var Yn = Ze;
Ze.blockSize = 1024;
Ze.outSize = 512;
Ze.hmacStrength = 192;
Ze.padLength = 128;
Ze.prototype._prepareBlock = function(t, e) {
  for (var r = this.W, n = 0; n < 32; n++)
    r[n] = t[e + n];
  for (; n < r.length; n += 2) {
    var s = $a(r[n - 4], r[n - 3]), u = La(r[n - 4], r[n - 3]), c = r[n - 14], d = r[n - 13], m = Ca(r[n - 30], r[n - 29]), b = Ta(r[n - 30], r[n - 29]), x = r[n - 32], A = r[n - 31];
    r[n] = xa(
      s,
      u,
      c,
      d,
      m,
      b,
      x,
      A
    ), r[n + 1] = _a(
      s,
      u,
      c,
      d,
      m,
      b,
      x,
      A
    );
  }
};
Ze.prototype._update = function(t, e) {
  this._prepareBlock(t, e);
  var r = this.W, n = this.h[0], s = this.h[1], u = this.h[2], c = this.h[3], d = this.h[4], m = this.h[5], b = this.h[6], x = this.h[7], A = this.h[8], I = this.h[9], S = this.h[10], F = this.h[11], $ = this.h[12], T = this.h[13], K = this.h[14], H = this.h[15];
  ba(this.k.length === r.length);
  for (var z = 0; z < r.length; z += 2) {
    var V = K, j = H, J = qa(A, I), Y = Oa(A, I), Te = Ea(A, I, S, F, $), dt = Ia(A, I, S, F, $, T), Q = this.k[z], je = this.k[z + 1], w = r[z], o = r[z + 1], f = Ma(
      V,
      j,
      J,
      Y,
      Te,
      dt,
      Q,
      je,
      w,
      o
    ), l = Sa(
      V,
      j,
      J,
      Y,
      Te,
      dt,
      Q,
      je,
      w,
      o
    );
    V = Fa(n, s), j = Pa(n, s), J = Ra(n, s, u, c, d), Y = Na(n, s, u, c, d, m);
    var v = ii(V, j, J, Y), y = ni(V, j, J, Y);
    K = $, H = T, $ = S, T = F, S = A, F = I, A = ii(b, x, f, l), I = ni(x, x, f, l), b = d, x = m, d = u, m = c, u = n, c = s, n = ii(f, l, v, y), s = ni(f, l, v, y);
  }
  wt(this.h, 0, n, s), wt(this.h, 2, u, c), wt(this.h, 4, d, m), wt(this.h, 6, b, x), wt(this.h, 8, A, I), wt(this.h, 10, S, F), wt(this.h, 12, $, T), wt(this.h, 14, K, H);
};
Ze.prototype._digest = function(t) {
  return t === "hex" ? Ve.toHex32(this.h, "big") : Ve.split32(this.h, "big");
};
function Ea(i, t, e, r, n) {
  var s = i & e ^ ~i & n;
  return s < 0 && (s += 4294967296), s;
}
function Ia(i, t, e, r, n, s) {
  var u = t & r ^ ~t & s;
  return u < 0 && (u += 4294967296), u;
}
function Ra(i, t, e, r, n) {
  var s = i & e ^ i & n ^ e & n;
  return s < 0 && (s += 4294967296), s;
}
function Na(i, t, e, r, n, s) {
  var u = t & r ^ t & s ^ r & s;
  return u < 0 && (u += 4294967296), u;
}
function Fa(i, t) {
  var e = it(i, t, 28), r = it(t, i, 2), n = it(t, i, 7), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function Pa(i, t) {
  var e = nt(i, t, 28), r = nt(t, i, 2), n = nt(t, i, 7), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function qa(i, t) {
  var e = it(i, t, 14), r = it(i, t, 18), n = it(t, i, 9), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function Oa(i, t) {
  var e = nt(i, t, 14), r = nt(i, t, 18), n = nt(t, i, 9), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function Ca(i, t) {
  var e = it(i, t, 1), r = it(i, t, 8), n = Jn(i, t, 7), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function Ta(i, t) {
  var e = nt(i, t, 1), r = nt(i, t, 8), n = Wn(i, t, 7), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function $a(i, t) {
  var e = it(i, t, 19), r = it(t, i, 29), n = Jn(i, t, 6), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function La(i, t) {
  var e = nt(i, t, 19), r = nt(t, i, 29), n = Wn(i, t, 6), s = e ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
var mi = G, Qn = Yn;
function lt() {
  if (!(this instanceof lt))
    return new lt();
  Qn.call(this), this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
mi.inherits(lt, Qn);
var Da = lt;
lt.blockSize = 1024;
lt.outSize = 384;
lt.hmacStrength = 192;
lt.padLength = 128;
lt.prototype._digest = function(t) {
  return t === "hex" ? mi.toHex32(this.h.slice(0, 12), "big") : mi.split32(this.h.slice(0, 12), "big");
};
er.sha1 = oa;
er.sha224 = ya;
er.sha256 = Gn;
er.sha384 = Da;
er.sha512 = Yn;
var Zn = {}, Vt = G, Ua = Zt, mr = Vt.rotl32, Hi = Vt.sum32, fr = Vt.sum32_3, Ji = Vt.sum32_4, es = Ua.BlockHash;
function at() {
  if (!(this instanceof at))
    return new at();
  es.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Vt.inherits(at, es);
Zn.ripemd160 = at;
at.blockSize = 512;
at.outSize = 160;
at.hmacStrength = 192;
at.padLength = 64;
at.prototype._update = function(t, e) {
  for (var r = this.h[0], n = this.h[1], s = this.h[2], u = this.h[3], c = this.h[4], d = r, m = n, b = s, x = u, A = c, I = 0; I < 80; I++) {
    var S = Hi(
      mr(
        Ji(r, Wi(I, n, s, u), t[za[I] + e], ka(I)),
        Ka[I]
      ),
      c
    );
    r = c, c = u, u = mr(s, 10), s = n, n = S, S = Hi(
      mr(
        Ji(d, Wi(79 - I, m, b, x), t[Va[I] + e], Ba(I)),
        ja[I]
      ),
      A
    ), d = A, A = x, x = mr(b, 10), b = m, m = S;
  }
  S = fr(this.h[1], s, x), this.h[1] = fr(this.h[2], u, A), this.h[2] = fr(this.h[3], c, d), this.h[3] = fr(this.h[4], r, m), this.h[4] = fr(this.h[0], n, b), this.h[0] = S;
};
at.prototype._digest = function(t) {
  return t === "hex" ? Vt.toHex32(this.h, "little") : Vt.split32(this.h, "little");
};
function Wi(i, t, e, r) {
  return i <= 15 ? t ^ e ^ r : i <= 31 ? t & e | ~t & r : i <= 47 ? (t | ~e) ^ r : i <= 63 ? t & r | e & ~r : t ^ (e | ~r);
}
function ka(i) {
  return i <= 15 ? 0 : i <= 31 ? 1518500249 : i <= 47 ? 1859775393 : i <= 63 ? 2400959708 : 2840853838;
}
function Ba(i) {
  return i <= 15 ? 1352829926 : i <= 31 ? 1548603684 : i <= 47 ? 1836072691 : i <= 63 ? 2053994217 : 0;
}
var za = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
], Va = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
], Ka = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
], ja = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
], Ga = G, Ha = pr;
function Qt(i, t, e) {
  if (!(this instanceof Qt))
    return new Qt(i, t, e);
  this.Hash = i, this.blockSize = i.blockSize / 8, this.outSize = i.outSize / 8, this.inner = null, this.outer = null, this._init(Ga.toArray(t, e));
}
var Ja = Qt;
Qt.prototype._init = function(t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()), Ha(t.length <= this.blockSize);
  for (var e = t.length; e < this.blockSize; e++)
    t.push(0);
  for (e = 0; e < t.length; e++)
    t[e] ^= 54;
  for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
    t[e] ^= 106;
  this.outer = new this.Hash().update(t);
};
Qt.prototype.update = function(t, e) {
  return this.inner.update(t, e), this;
};
Qt.prototype.digest = function(t) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t);
};
(function(i) {
  var t = i;
  t.utils = G, t.common = Zt, t.sha = er, t.ripemd = Zn, t.hmac = Ja, t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})($n);
const ut = /* @__PURE__ */ Pr($n);
function rr(i, t, e) {
  return e = {
    path: t,
    exports: {},
    require: function(r, n) {
      return Wa(r, n ?? e.path);
    }
  }, i(e, e.exports), e.exports;
}
function Wa() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var Ei = ts;
function ts(i, t) {
  if (!i)
    throw new Error(t || "Assertion failed");
}
ts.equal = function(t, e, r) {
  if (t != e)
    throw new Error(r || "Assertion failed: " + t + " != " + e);
};
var Qe = rr(function(i, t) {
  var e = t;
  function r(u, c) {
    if (Array.isArray(u))
      return u.slice();
    if (!u)
      return [];
    var d = [];
    if (typeof u != "string") {
      for (var m = 0; m < u.length; m++)
        d[m] = u[m] | 0;
      return d;
    }
    if (c === "hex") {
      u = u.replace(/[^a-z0-9]+/ig, ""), u.length % 2 !== 0 && (u = "0" + u);
      for (var m = 0; m < u.length; m += 2)
        d.push(parseInt(u[m] + u[m + 1], 16));
    } else
      for (var m = 0; m < u.length; m++) {
        var b = u.charCodeAt(m), x = b >> 8, A = b & 255;
        x ? d.push(x, A) : d.push(A);
      }
    return d;
  }
  e.toArray = r;
  function n(u) {
    return u.length === 1 ? "0" + u : u;
  }
  e.zero2 = n;
  function s(u) {
    for (var c = "", d = 0; d < u.length; d++)
      c += n(u[d].toString(16));
    return c;
  }
  e.toHex = s, e.encode = function(c, d) {
    return d === "hex" ? s(c) : c;
  };
}), Ke = rr(function(i, t) {
  var e = t;
  e.assert = Ei, e.toArray = Qe.toArray, e.zero2 = Qe.zero2, e.toHex = Qe.toHex, e.encode = Qe.encode;
  function r(d, m, b) {
    var x = new Array(Math.max(d.bitLength(), b) + 1);
    x.fill(0);
    for (var A = 1 << m + 1, I = d.clone(), S = 0; S < x.length; S++) {
      var F, $ = I.andln(A - 1);
      I.isOdd() ? ($ > (A >> 1) - 1 ? F = (A >> 1) - $ : F = $, I.isubn(F)) : F = 0, x[S] = F, I.iushrn(1);
    }
    return x;
  }
  e.getNAF = r;
  function n(d, m) {
    var b = [
      [],
      []
    ];
    d = d.clone(), m = m.clone();
    for (var x = 0, A = 0, I; d.cmpn(-x) > 0 || m.cmpn(-A) > 0; ) {
      var S = d.andln(3) + x & 3, F = m.andln(3) + A & 3;
      S === 3 && (S = -1), F === 3 && (F = -1);
      var $;
      S & 1 ? (I = d.andln(7) + x & 7, (I === 3 || I === 5) && F === 2 ? $ = -S : $ = S) : $ = 0, b[0].push($);
      var T;
      F & 1 ? (I = m.andln(7) + A & 7, (I === 3 || I === 5) && S === 2 ? T = -F : T = F) : T = 0, b[1].push(T), 2 * x === $ + 1 && (x = 1 - x), 2 * A === T + 1 && (A = 1 - A), d.iushrn(1), m.iushrn(1);
    }
    return b;
  }
  e.getJSF = n;
  function s(d, m, b) {
    var x = "_" + m;
    d.prototype[m] = function() {
      return this[x] !== void 0 ? this[x] : this[x] = b.call(this);
    };
  }
  e.cachedProperty = s;
  function u(d) {
    return typeof d == "string" ? e.toArray(d, "hex") : d;
  }
  e.parseBytes = u;
  function c(d) {
    return new k(d, "hex", "le");
  }
  e.intFromLE = c;
}), Rr = Ke.getNAF, Xa = Ke.getJSF, Nr = Ke.assert;
function St(i, t) {
  this.type = i, this.p = new k(t.p, 16), this.red = t.prime ? k.red(t.prime) : k.mont(this.p), this.zero = new k(0).toRed(this.red), this.one = new k(1).toRed(this.red), this.two = new k(2).toRed(this.red), this.n = t.n && new k(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var e = this.n && this.p.div(this.n);
  !e || e.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var Kt = St;
St.prototype.point = function() {
  throw new Error("Not implemented");
};
St.prototype.validate = function() {
  throw new Error("Not implemented");
};
St.prototype._fixedNafMul = function(t, e) {
  Nr(t.precomputed);
  var r = t._getDoubles(), n = Rr(e, 1, this._bitLength), s = (1 << r.step + 1) - (r.step % 2 === 0 ? 2 : 1);
  s /= 3;
  var u = [], c, d;
  for (c = 0; c < n.length; c += r.step) {
    d = 0;
    for (var m = c + r.step - 1; m >= c; m--)
      d = (d << 1) + n[m];
    u.push(d);
  }
  for (var b = this.jpoint(null, null, null), x = this.jpoint(null, null, null), A = s; A > 0; A--) {
    for (c = 0; c < u.length; c++)
      d = u[c], d === A ? x = x.mixedAdd(r.points[c]) : d === -A && (x = x.mixedAdd(r.points[c].neg()));
    b = b.add(x);
  }
  return b.toP();
};
St.prototype._wnafMul = function(t, e) {
  var r = 4, n = t._getNAFPoints(r);
  r = n.wnd;
  for (var s = n.points, u = Rr(e, r, this._bitLength), c = this.jpoint(null, null, null), d = u.length - 1; d >= 0; d--) {
    for (var m = 0; d >= 0 && u[d] === 0; d--)
      m++;
    if (d >= 0 && m++, c = c.dblp(m), d < 0)
      break;
    var b = u[d];
    Nr(b !== 0), t.type === "affine" ? b > 0 ? c = c.mixedAdd(s[b - 1 >> 1]) : c = c.mixedAdd(s[-b - 1 >> 1].neg()) : b > 0 ? c = c.add(s[b - 1 >> 1]) : c = c.add(s[-b - 1 >> 1].neg());
  }
  return t.type === "affine" ? c.toP() : c;
};
St.prototype._wnafMulAdd = function(t, e, r, n, s) {
  var u = this._wnafT1, c = this._wnafT2, d = this._wnafT3, m = 0, b, x, A;
  for (b = 0; b < n; b++) {
    A = e[b];
    var I = A._getNAFPoints(t);
    u[b] = I.wnd, c[b] = I.points;
  }
  for (b = n - 1; b >= 1; b -= 2) {
    var S = b - 1, F = b;
    if (u[S] !== 1 || u[F] !== 1) {
      d[S] = Rr(r[S], u[S], this._bitLength), d[F] = Rr(r[F], u[F], this._bitLength), m = Math.max(d[S].length, m), m = Math.max(d[F].length, m);
      continue;
    }
    var $ = [
      e[S],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      e[F]
      /* 7 */
    ];
    e[S].y.cmp(e[F].y) === 0 ? ($[1] = e[S].add(e[F]), $[2] = e[S].toJ().mixedAdd(e[F].neg())) : e[S].y.cmp(e[F].y.redNeg()) === 0 ? ($[1] = e[S].toJ().mixedAdd(e[F]), $[2] = e[S].add(e[F].neg())) : ($[1] = e[S].toJ().mixedAdd(e[F]), $[2] = e[S].toJ().mixedAdd(e[F].neg()));
    var T = [
      -3,
      /* -1 -1 */
      -1,
      /* -1 0 */
      -5,
      /* -1 1 */
      -7,
      /* 0 -1 */
      0,
      /* 0 0 */
      7,
      /* 0 1 */
      5,
      /* 1 -1 */
      1,
      /* 1 0 */
      3
      /* 1 1 */
    ], K = Xa(r[S], r[F]);
    for (m = Math.max(K[0].length, m), d[S] = new Array(m), d[F] = new Array(m), x = 0; x < m; x++) {
      var H = K[0][x] | 0, z = K[1][x] | 0;
      d[S][x] = T[(H + 1) * 3 + (z + 1)], d[F][x] = 0, c[S] = $;
    }
  }
  var V = this.jpoint(null, null, null), j = this._wnafT4;
  for (b = m; b >= 0; b--) {
    for (var J = 0; b >= 0; ) {
      var Y = !0;
      for (x = 0; x < n; x++)
        j[x] = d[x][b] | 0, j[x] !== 0 && (Y = !1);
      if (!Y)
        break;
      J++, b--;
    }
    if (b >= 0 && J++, V = V.dblp(J), b < 0)
      break;
    for (x = 0; x < n; x++) {
      var Te = j[x];
      Te !== 0 && (Te > 0 ? A = c[x][Te - 1 >> 1] : Te < 0 && (A = c[x][-Te - 1 >> 1].neg()), A.type === "affine" ? V = V.mixedAdd(A) : V = V.add(A));
    }
  }
  for (b = 0; b < n; b++)
    c[b] = null;
  return s ? V : V.toP();
};
function He(i, t) {
  this.curve = i, this.type = t, this.precomputed = null;
}
St.BasePoint = He;
He.prototype.eq = function() {
  throw new Error("Not implemented");
};
He.prototype.validate = function() {
  return this.curve.validate(this);
};
St.prototype.decodePoint = function(t, e) {
  t = Ke.toArray(t, e);
  var r = this.p.byteLength();
  if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * r) {
    t[0] === 6 ? Nr(t[t.length - 1] % 2 === 0) : t[0] === 7 && Nr(t[t.length - 1] % 2 === 1);
    var n = this.point(
      t.slice(1, 1 + r),
      t.slice(1 + r, 1 + 2 * r)
    );
    return n;
  } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === r)
    return this.pointFromX(t.slice(1, 1 + r), t[0] === 3);
  throw new Error("Unknown point format");
};
He.prototype.encodeCompressed = function(t) {
  return this.encode(t, !0);
};
He.prototype._encode = function(t) {
  var e = this.curve.p.byteLength(), r = this.getX().toArray("be", e);
  return t ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", e));
};
He.prototype.encode = function(t, e) {
  return Ke.encode(this._encode(e), t);
};
He.prototype.precompute = function(t) {
  if (this.precomputed)
    return this;
  var e = {
    doubles: null,
    naf: null,
    beta: null
  };
  return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this;
};
He.prototype._hasDoubles = function(t) {
  if (!this.precomputed)
    return !1;
  var e = this.precomputed.doubles;
  return e ? e.points.length >= Math.ceil((t.bitLength() + 1) / e.step) : !1;
};
He.prototype._getDoubles = function(t, e) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var r = [this], n = this, s = 0; s < e; s += t) {
    for (var u = 0; u < t; u++)
      n = n.dbl();
    r.push(n);
  }
  return {
    step: t,
    points: r
  };
};
He.prototype._getNAFPoints = function(t) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var e = [this], r = (1 << t) - 1, n = r === 1 ? null : this.dbl(), s = 1; s < r; s++)
    e[s] = e[s - 1].add(n);
  return {
    wnd: t,
    points: e
  };
};
He.prototype._getBeta = function() {
  return null;
};
He.prototype.dblp = function(t) {
  for (var e = this, r = 0; r < t; r++)
    e = e.dbl();
  return e;
};
var Ii = rr(function(i) {
  typeof Object.create == "function" ? i.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : i.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
    }
  };
}), Ya = Ke.assert;
function Je(i) {
  Kt.call(this, "short", i), this.a = new k(i.a, 16).toRed(this.red), this.b = new k(i.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(i), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Ii(Je, Kt);
var Qa = Je;
Je.prototype._getEndomorphism = function(t) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var e, r;
    if (t.beta)
      e = new k(t.beta, 16).toRed(this.red);
    else {
      var n = this._getEndoRoots(this.p);
      e = n[0].cmp(n[1]) < 0 ? n[0] : n[1], e = e.toRed(this.red);
    }
    if (t.lambda)
      r = new k(t.lambda, 16);
    else {
      var s = this._getEndoRoots(this.n);
      this.g.mul(s[0]).x.cmp(this.g.x.redMul(e)) === 0 ? r = s[0] : (r = s[1], Ya(this.g.mul(r).x.cmp(this.g.x.redMul(e)) === 0));
    }
    var u;
    return t.basis ? u = t.basis.map(function(c) {
      return {
        a: new k(c.a, 16),
        b: new k(c.b, 16)
      };
    }) : u = this._getEndoBasis(r), {
      beta: e,
      lambda: r,
      basis: u
    };
  }
};
Je.prototype._getEndoRoots = function(t) {
  var e = t === this.p ? this.red : k.mont(t), r = new k(2).toRed(e).redInvm(), n = r.redNeg(), s = new k(3).toRed(e).redNeg().redSqrt().redMul(r), u = n.redAdd(s).fromRed(), c = n.redSub(s).fromRed();
  return [u, c];
};
Je.prototype._getEndoBasis = function(t) {
  for (var e = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), r = t, n = this.n.clone(), s = new k(1), u = new k(0), c = new k(0), d = new k(1), m, b, x, A, I, S, F, $ = 0, T, K; r.cmpn(0) !== 0; ) {
    var H = n.div(r);
    T = n.sub(H.mul(r)), K = c.sub(H.mul(s));
    var z = d.sub(H.mul(u));
    if (!x && T.cmp(e) < 0)
      m = F.neg(), b = s, x = T.neg(), A = K;
    else if (x && ++$ === 2)
      break;
    F = T, n = r, r = T, c = s, s = K, d = u, u = z;
  }
  I = T.neg(), S = K;
  var V = x.sqr().add(A.sqr()), j = I.sqr().add(S.sqr());
  return j.cmp(V) >= 0 && (I = m, S = b), x.negative && (x = x.neg(), A = A.neg()), I.negative && (I = I.neg(), S = S.neg()), [
    { a: x, b: A },
    { a: I, b: S }
  ];
};
Je.prototype._endoSplit = function(t) {
  var e = this.endo.basis, r = e[0], n = e[1], s = n.b.mul(t).divRound(this.n), u = r.b.neg().mul(t).divRound(this.n), c = s.mul(r.a), d = u.mul(n.a), m = s.mul(r.b), b = u.mul(n.b), x = t.sub(c).sub(d), A = m.add(b).neg();
  return { k1: x, k2: A };
};
Je.prototype.pointFromX = function(t, e) {
  t = new k(t, 16), t.red || (t = t.toRed(this.red));
  var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), n = r.redSqrt();
  if (n.redSqr().redSub(r).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var s = n.fromRed().isOdd();
  return (e && !s || !e && s) && (n = n.redNeg()), this.point(t, n);
};
Je.prototype.validate = function(t) {
  if (t.inf)
    return !0;
  var e = t.x, r = t.y, n = this.a.redMul(e), s = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
  return r.redSqr().redISub(s).cmpn(0) === 0;
};
Je.prototype._endoWnafMulAdd = function(t, e, r) {
  for (var n = this._endoWnafT1, s = this._endoWnafT2, u = 0; u < t.length; u++) {
    var c = this._endoSplit(e[u]), d = t[u], m = d._getBeta();
    c.k1.negative && (c.k1.ineg(), d = d.neg(!0)), c.k2.negative && (c.k2.ineg(), m = m.neg(!0)), n[u * 2] = d, n[u * 2 + 1] = m, s[u * 2] = c.k1, s[u * 2 + 1] = c.k2;
  }
  for (var b = this._wnafMulAdd(1, n, s, u * 2, r), x = 0; x < u * 2; x++)
    n[x] = null, s[x] = null;
  return b;
};
function $e(i, t, e, r) {
  Kt.BasePoint.call(this, i, "affine"), t === null && e === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new k(t, 16), this.y = new k(e, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
Ii($e, Kt.BasePoint);
Je.prototype.point = function(t, e, r) {
  return new $e(this, t, e, r);
};
Je.prototype.pointFromJSON = function(t, e) {
  return $e.fromJSON(this, t, e);
};
$e.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t = this.precomputed;
    if (t && t.beta)
      return t.beta;
    var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t) {
      var r = this.curve, n = function(s) {
        return r.point(s.x.redMul(r.endo.beta), s.y);
      };
      t.beta = e, e.precomputed = {
        beta: null,
        naf: t.naf && {
          wnd: t.naf.wnd,
          points: t.naf.points.map(n)
        },
        doubles: t.doubles && {
          step: t.doubles.step,
          points: t.doubles.points.map(n)
        }
      };
    }
    return e;
  }
};
$e.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }] : [this.x, this.y];
};
$e.fromJSON = function(t, e, r) {
  typeof e == "string" && (e = JSON.parse(e));
  var n = t.point(e[0], e[1], r);
  if (!e[2])
    return n;
  function s(c) {
    return t.point(c[0], c[1], r);
  }
  var u = e[2];
  return n.precomputed = {
    beta: null,
    doubles: u.doubles && {
      step: u.doubles.step,
      points: [n].concat(u.doubles.points.map(s))
    },
    naf: u.naf && {
      wnd: u.naf.wnd,
      points: [n].concat(u.naf.points.map(s))
    }
  }, n;
};
$e.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
$e.prototype.isInfinity = function() {
  return this.inf;
};
$e.prototype.add = function(t) {
  if (this.inf)
    return t;
  if (t.inf)
    return this;
  if (this.eq(t))
    return this.dbl();
  if (this.neg().eq(t))
    return this.curve.point(null, null);
  if (this.x.cmp(t.x) === 0)
    return this.curve.point(null, null);
  var e = this.y.redSub(t.y);
  e.cmpn(0) !== 0 && (e = e.redMul(this.x.redSub(t.x).redInvm()));
  var r = e.redSqr().redISub(this.x).redISub(t.x), n = e.redMul(this.x.redSub(r)).redISub(this.y);
  return this.curve.point(r, n);
};
$e.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t = this.y.redAdd(this.y);
  if (t.cmpn(0) === 0)
    return this.curve.point(null, null);
  var e = this.curve.a, r = this.x.redSqr(), n = t.redInvm(), s = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(n), u = s.redSqr().redISub(this.x.redAdd(this.x)), c = s.redMul(this.x.redSub(u)).redISub(this.y);
  return this.curve.point(u, c);
};
$e.prototype.getX = function() {
  return this.x.fromRed();
};
$e.prototype.getY = function() {
  return this.y.fromRed();
};
$e.prototype.mul = function(t) {
  return t = new k(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t);
};
$e.prototype.mulAdd = function(t, e, r) {
  var n = [this, e], s = [t, r];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, s) : this.curve._wnafMulAdd(1, n, s, 2);
};
$e.prototype.jmulAdd = function(t, e, r) {
  var n = [this, e], s = [t, r];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, s, !0) : this.curve._wnafMulAdd(1, n, s, 2, !0);
};
$e.prototype.eq = function(t) {
  return this === t || this.inf === t.inf && (this.inf || this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0);
};
$e.prototype.neg = function(t) {
  if (this.inf)
    return this;
  var e = this.curve.point(this.x, this.y.redNeg());
  if (t && this.precomputed) {
    var r = this.precomputed, n = function(s) {
      return s.neg();
    };
    e.precomputed = {
      naf: r.naf && {
        wnd: r.naf.wnd,
        points: r.naf.points.map(n)
      },
      doubles: r.doubles && {
        step: r.doubles.step,
        points: r.doubles.points.map(n)
      }
    };
  }
  return e;
};
$e.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t;
};
function De(i, t, e, r) {
  Kt.BasePoint.call(this, i, "jacobian"), t === null && e === null && r === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new k(0)) : (this.x = new k(t, 16), this.y = new k(e, 16), this.z = new k(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Ii(De, Kt.BasePoint);
Je.prototype.jpoint = function(t, e, r) {
  return new De(this, t, e, r);
};
De.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t = this.z.redInvm(), e = t.redSqr(), r = this.x.redMul(e), n = this.y.redMul(e).redMul(t);
  return this.curve.point(r, n);
};
De.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
De.prototype.add = function(t) {
  if (this.isInfinity())
    return t;
  if (t.isInfinity())
    return this;
  var e = t.z.redSqr(), r = this.z.redSqr(), n = this.x.redMul(e), s = t.x.redMul(r), u = this.y.redMul(e.redMul(t.z)), c = t.y.redMul(r.redMul(this.z)), d = n.redSub(s), m = u.redSub(c);
  if (d.cmpn(0) === 0)
    return m.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var b = d.redSqr(), x = b.redMul(d), A = n.redMul(b), I = m.redSqr().redIAdd(x).redISub(A).redISub(A), S = m.redMul(A.redISub(I)).redISub(u.redMul(x)), F = this.z.redMul(t.z).redMul(d);
  return this.curve.jpoint(I, S, F);
};
De.prototype.mixedAdd = function(t) {
  if (this.isInfinity())
    return t.toJ();
  if (t.isInfinity())
    return this;
  var e = this.z.redSqr(), r = this.x, n = t.x.redMul(e), s = this.y, u = t.y.redMul(e).redMul(this.z), c = r.redSub(n), d = s.redSub(u);
  if (c.cmpn(0) === 0)
    return d.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var m = c.redSqr(), b = m.redMul(c), x = r.redMul(m), A = d.redSqr().redIAdd(b).redISub(x).redISub(x), I = d.redMul(x.redISub(A)).redISub(s.redMul(b)), S = this.z.redMul(c);
  return this.curve.jpoint(A, I, S);
};
De.prototype.dblp = function(t) {
  if (t === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t)
    return this.dbl();
  var e;
  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (e = 0; e < t; e++)
      r = r.dbl();
    return r;
  }
  var n = this.curve.a, s = this.curve.tinv, u = this.x, c = this.y, d = this.z, m = d.redSqr().redSqr(), b = c.redAdd(c);
  for (e = 0; e < t; e++) {
    var x = u.redSqr(), A = b.redSqr(), I = A.redSqr(), S = x.redAdd(x).redIAdd(x).redIAdd(n.redMul(m)), F = u.redMul(A), $ = S.redSqr().redISub(F.redAdd(F)), T = F.redISub($), K = S.redMul(T);
    K = K.redIAdd(K).redISub(I);
    var H = b.redMul(d);
    e + 1 < t && (m = m.redMul(I)), u = $, d = H, b = K;
  }
  return this.curve.jpoint(u, b.redMul(s), d);
};
De.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
De.prototype._zeroDbl = function() {
  var t, e, r;
  if (this.zOne) {
    var n = this.x.redSqr(), s = this.y.redSqr(), u = s.redSqr(), c = this.x.redAdd(s).redSqr().redISub(n).redISub(u);
    c = c.redIAdd(c);
    var d = n.redAdd(n).redIAdd(n), m = d.redSqr().redISub(c).redISub(c), b = u.redIAdd(u);
    b = b.redIAdd(b), b = b.redIAdd(b), t = m, e = d.redMul(c.redISub(m)).redISub(b), r = this.y.redAdd(this.y);
  } else {
    var x = this.x.redSqr(), A = this.y.redSqr(), I = A.redSqr(), S = this.x.redAdd(A).redSqr().redISub(x).redISub(I);
    S = S.redIAdd(S);
    var F = x.redAdd(x).redIAdd(x), $ = F.redSqr(), T = I.redIAdd(I);
    T = T.redIAdd(T), T = T.redIAdd(T), t = $.redISub(S).redISub(S), e = F.redMul(S.redISub(t)).redISub(T), r = this.y.redMul(this.z), r = r.redIAdd(r);
  }
  return this.curve.jpoint(t, e, r);
};
De.prototype._threeDbl = function() {
  var t, e, r;
  if (this.zOne) {
    var n = this.x.redSqr(), s = this.y.redSqr(), u = s.redSqr(), c = this.x.redAdd(s).redSqr().redISub(n).redISub(u);
    c = c.redIAdd(c);
    var d = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), m = d.redSqr().redISub(c).redISub(c);
    t = m;
    var b = u.redIAdd(u);
    b = b.redIAdd(b), b = b.redIAdd(b), e = d.redMul(c.redISub(m)).redISub(b), r = this.y.redAdd(this.y);
  } else {
    var x = this.z.redSqr(), A = this.y.redSqr(), I = this.x.redMul(A), S = this.x.redSub(x).redMul(this.x.redAdd(x));
    S = S.redAdd(S).redIAdd(S);
    var F = I.redIAdd(I);
    F = F.redIAdd(F);
    var $ = F.redAdd(F);
    t = S.redSqr().redISub($), r = this.y.redAdd(this.z).redSqr().redISub(A).redISub(x);
    var T = A.redSqr();
    T = T.redIAdd(T), T = T.redIAdd(T), T = T.redIAdd(T), e = S.redMul(F.redISub(t)).redISub(T);
  }
  return this.curve.jpoint(t, e, r);
};
De.prototype._dbl = function() {
  var t = this.curve.a, e = this.x, r = this.y, n = this.z, s = n.redSqr().redSqr(), u = e.redSqr(), c = r.redSqr(), d = u.redAdd(u).redIAdd(u).redIAdd(t.redMul(s)), m = e.redAdd(e);
  m = m.redIAdd(m);
  var b = m.redMul(c), x = d.redSqr().redISub(b.redAdd(b)), A = b.redISub(x), I = c.redSqr();
  I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
  var S = d.redMul(A).redISub(I), F = r.redAdd(r).redMul(n);
  return this.curve.jpoint(x, S, F);
};
De.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t = this.x.redSqr(), e = this.y.redSqr(), r = this.z.redSqr(), n = e.redSqr(), s = t.redAdd(t).redIAdd(t), u = s.redSqr(), c = this.x.redAdd(e).redSqr().redISub(t).redISub(n);
  c = c.redIAdd(c), c = c.redAdd(c).redIAdd(c), c = c.redISub(u);
  var d = c.redSqr(), m = n.redIAdd(n);
  m = m.redIAdd(m), m = m.redIAdd(m), m = m.redIAdd(m);
  var b = s.redIAdd(c).redSqr().redISub(u).redISub(d).redISub(m), x = e.redMul(b);
  x = x.redIAdd(x), x = x.redIAdd(x);
  var A = this.x.redMul(d).redISub(x);
  A = A.redIAdd(A), A = A.redIAdd(A);
  var I = this.y.redMul(b.redMul(m.redISub(b)).redISub(c.redMul(d)));
  I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
  var S = this.z.redAdd(c).redSqr().redISub(r).redISub(d);
  return this.curve.jpoint(A, I, S);
};
De.prototype.mul = function(t, e) {
  return t = new k(t, e), this.curve._wnafMul(this, t);
};
De.prototype.eq = function(t) {
  if (t.type === "affine")
    return this.eq(t.toJ());
  if (this === t)
    return !0;
  var e = this.z.redSqr(), r = t.z.redSqr();
  if (this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0) !== 0)
    return !1;
  var n = e.redMul(this.z), s = r.redMul(t.z);
  return this.y.redMul(s).redISub(t.y.redMul(n)).cmpn(0) === 0;
};
De.prototype.eqXToP = function(t) {
  var e = this.z.redSqr(), r = t.toRed(this.curve.red).redMul(e);
  if (this.x.cmp(r) === 0)
    return !0;
  for (var n = t.clone(), s = this.curve.redN.redMul(e); ; ) {
    if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
      return !1;
    if (r.redIAdd(s), this.x.cmp(r) === 0)
      return !0;
  }
};
De.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
De.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var _r = rr(function(i, t) {
  var e = t;
  e.base = Kt, e.short = Qa, e.mont = /*RicMoo:ethers:require(./mont)*/
  null, e.edwards = /*RicMoo:ethers:require(./edwards)*/
  null;
}), Mr = rr(function(i, t) {
  var e = t, r = Ke.assert;
  function n(c) {
    c.type === "short" ? this.curve = new _r.short(c) : c.type === "edwards" ? this.curve = new _r.edwards(c) : this.curve = new _r.mont(c), this.g = this.curve.g, this.n = this.curve.n, this.hash = c.hash, r(this.g.validate(), "Invalid curve"), r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  e.PresetCurve = n;
  function s(c, d) {
    Object.defineProperty(e, c, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var m = new n(d);
        return Object.defineProperty(e, c, {
          configurable: !0,
          enumerable: !0,
          value: m
        }), m;
      }
    });
  }
  s("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: ut.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  }), s("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: ut.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  }), s("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: ut.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  }), s("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: ut.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  }), s("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: ut.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  }), s("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: ut.sha256,
    gRed: !1,
    g: [
      "9"
    ]
  }), s("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    // -121665 * (121666^(-1)) (mod P)
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: ut.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var u;
  try {
    u = /*RicMoo:ethers:require(./precomputed/secp256k1)*/
    null.crash();
  } catch {
    u = void 0;
  }
  s("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: ut.sha256,
    // Precomputed endomorphism
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: !1,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      u
    ]
  });
});
function Mt(i) {
  if (!(this instanceof Mt))
    return new Mt(i);
  this.hash = i.hash, this.predResist = !!i.predResist, this.outLen = this.hash.outSize, this.minEntropy = i.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = Qe.toArray(i.entropy, i.entropyEnc || "hex"), e = Qe.toArray(i.nonce, i.nonceEnc || "hex"), r = Qe.toArray(i.pers, i.persEnc || "hex");
  Ei(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(t, e, r);
}
var rs = Mt;
Mt.prototype._init = function(t, e, r) {
  var n = t.concat(e).concat(r);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var s = 0; s < this.V.length; s++)
    this.K[s] = 0, this.V[s] = 1;
  this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656;
};
Mt.prototype._hmac = function() {
  return new ut.hmac(this.hash, this.K);
};
Mt.prototype._update = function(t) {
  var e = this._hmac().update(this.V).update([0]);
  t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
};
Mt.prototype.reseed = function(t, e, r, n) {
  typeof e != "string" && (n = r, r = e, e = null), t = Qe.toArray(t, e), r = Qe.toArray(r, n), Ei(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(t.concat(r || [])), this._reseed = 1;
};
Mt.prototype.generate = function(t, e, r, n) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof e != "string" && (n = r, r = e, e = null), r && (r = Qe.toArray(r, n || "hex"), this._update(r));
  for (var s = []; s.length < t; )
    this.V = this._hmac().update(this.V).digest(), s = s.concat(this.V);
  var u = s.slice(0, t);
  return this._update(r), this._reseed++, Qe.encode(u, e);
};
var yi = Ke.assert;
function ke(i, t) {
  this.ec = i, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var Ri = ke;
ke.fromPublic = function(t, e, r) {
  return e instanceof ke ? e : new ke(t, {
    pub: e,
    pubEnc: r
  });
};
ke.fromPrivate = function(t, e, r) {
  return e instanceof ke ? e : new ke(t, {
    priv: e,
    privEnc: r
  });
};
ke.prototype.validate = function() {
  var t = this.getPublic();
  return t.isInfinity() ? { result: !1, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
ke.prototype.getPublic = function(t, e) {
  return typeof t == "string" && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), e ? this.pub.encode(e, t) : this.pub;
};
ke.prototype.getPrivate = function(t) {
  return t === "hex" ? this.priv.toString(16, 2) : this.priv;
};
ke.prototype._importPrivate = function(t, e) {
  this.priv = new k(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
ke.prototype._importPublic = function(t, e) {
  if (t.x || t.y) {
    this.ec.curve.type === "mont" ? yi(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && yi(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t, e);
};
ke.prototype.derive = function(t) {
  return t.validate() || yi(t.validate(), "public point not validated"), t.mul(this.priv).getX();
};
ke.prototype.sign = function(t, e, r) {
  return this.ec.sign(t, this, e, r);
};
ke.prototype.verify = function(t, e) {
  return this.ec.verify(t, e, this);
};
ke.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Za = Ke.assert;
function Or(i, t) {
  if (i instanceof Or)
    return i;
  this._importDER(i, t) || (Za(i.r && i.s, "Signature without r or s"), this.r = new k(i.r, 16), this.s = new k(i.s, 16), i.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = i.recoveryParam);
}
var Cr = Or;
function ef() {
  this.place = 0;
}
function si(i, t) {
  var e = i[t.place++];
  if (!(e & 128))
    return e;
  var r = e & 15;
  if (r === 0 || r > 4)
    return !1;
  for (var n = 0, s = 0, u = t.place; s < r; s++, u++)
    n <<= 8, n |= i[u], n >>>= 0;
  return n <= 127 ? !1 : (t.place = u, n);
}
function Xi(i) {
  for (var t = 0, e = i.length - 1; !i[t] && !(i[t + 1] & 128) && t < e; )
    t++;
  return t === 0 ? i : i.slice(t);
}
Or.prototype._importDER = function(t, e) {
  t = Ke.toArray(t, e);
  var r = new ef();
  if (t[r.place++] !== 48)
    return !1;
  var n = si(t, r);
  if (n === !1 || n + r.place !== t.length || t[r.place++] !== 2)
    return !1;
  var s = si(t, r);
  if (s === !1)
    return !1;
  var u = t.slice(r.place, s + r.place);
  if (r.place += s, t[r.place++] !== 2)
    return !1;
  var c = si(t, r);
  if (c === !1 || t.length !== c + r.place)
    return !1;
  var d = t.slice(r.place, c + r.place);
  if (u[0] === 0)
    if (u[1] & 128)
      u = u.slice(1);
    else
      return !1;
  if (d[0] === 0)
    if (d[1] & 128)
      d = d.slice(1);
    else
      return !1;
  return this.r = new k(u), this.s = new k(d), this.recoveryParam = null, !0;
};
function oi(i, t) {
  if (t < 128) {
    i.push(t);
    return;
  }
  var e = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (i.push(e | 128); --e; )
    i.push(t >>> (e << 3) & 255);
  i.push(t);
}
Or.prototype.toDER = function(t) {
  var e = this.r.toArray(), r = this.s.toArray();
  for (e[0] & 128 && (e = [0].concat(e)), r[0] & 128 && (r = [0].concat(r)), e = Xi(e), r = Xi(r); !r[0] && !(r[1] & 128); )
    r = r.slice(1);
  var n = [2];
  oi(n, e.length), n = n.concat(e), n.push(2), oi(n, r.length);
  var s = n.concat(r), u = [48];
  return oi(u, s.length), u = u.concat(s), Ke.encode(u, t);
};
var tf = (
  /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }
), is = Ke.assert;
function Ge(i) {
  if (!(this instanceof Ge))
    return new Ge(i);
  typeof i == "string" && (is(
    Object.prototype.hasOwnProperty.call(Mr, i),
    "Unknown curve " + i
  ), i = Mr[i]), i instanceof Mr.PresetCurve && (i = { curve: i }), this.curve = i.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = i.curve.g, this.g.precompute(i.curve.n.bitLength() + 1), this.hash = i.hash || i.curve.hash;
}
var rf = Ge;
Ge.prototype.keyPair = function(t) {
  return new Ri(this, t);
};
Ge.prototype.keyFromPrivate = function(t, e) {
  return Ri.fromPrivate(this, t, e);
};
Ge.prototype.keyFromPublic = function(t, e) {
  return Ri.fromPublic(this, t, e);
};
Ge.prototype.genKeyPair = function(t) {
  t || (t = {});
  for (var e = new rs({
    hash: this.hash,
    pers: t.pers,
    persEnc: t.persEnc || "utf8",
    entropy: t.entropy || tf(this.hash.hmacStrength),
    entropyEnc: t.entropy && t.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), r = this.n.byteLength(), n = this.n.sub(new k(2)); ; ) {
    var s = new k(e.generate(r));
    if (!(s.cmp(n) > 0))
      return s.iaddn(1), this.keyFromPrivate(s);
  }
};
Ge.prototype._truncateToN = function(t, e) {
  var r = t.byteLength() * 8 - this.n.bitLength();
  return r > 0 && (t = t.ushrn(r)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
};
Ge.prototype.sign = function(t, e, r, n) {
  typeof r == "object" && (n = r, r = null), n || (n = {}), e = this.keyFromPrivate(e, r), t = this._truncateToN(new k(t, 16));
  for (var s = this.n.byteLength(), u = e.getPrivate().toArray("be", s), c = t.toArray("be", s), d = new rs({
    hash: this.hash,
    entropy: u,
    nonce: c,
    pers: n.pers,
    persEnc: n.persEnc || "utf8"
  }), m = this.n.sub(new k(1)), b = 0; ; b++) {
    var x = n.k ? n.k(b) : new k(d.generate(this.n.byteLength()));
    if (x = this._truncateToN(x, !0), !(x.cmpn(1) <= 0 || x.cmp(m) >= 0)) {
      var A = this.g.mul(x);
      if (!A.isInfinity()) {
        var I = A.getX(), S = I.umod(this.n);
        if (S.cmpn(0) !== 0) {
          var F = x.invm(this.n).mul(S.mul(e.getPrivate()).iadd(t));
          if (F = F.umod(this.n), F.cmpn(0) !== 0) {
            var $ = (A.getY().isOdd() ? 1 : 0) | (I.cmp(S) !== 0 ? 2 : 0);
            return n.canonical && F.cmp(this.nh) > 0 && (F = this.n.sub(F), $ ^= 1), new Cr({ r: S, s: F, recoveryParam: $ });
          }
        }
      }
    }
  }
};
Ge.prototype.verify = function(t, e, r, n) {
  t = this._truncateToN(new k(t, 16)), r = this.keyFromPublic(r, n), e = new Cr(e, "hex");
  var s = e.r, u = e.s;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0 || u.cmpn(1) < 0 || u.cmp(this.n) >= 0)
    return !1;
  var c = u.invm(this.n), d = c.mul(t).umod(this.n), m = c.mul(s).umod(this.n), b;
  return this.curve._maxwellTrick ? (b = this.g.jmulAdd(d, r.getPublic(), m), b.isInfinity() ? !1 : b.eqXToP(s)) : (b = this.g.mulAdd(d, r.getPublic(), m), b.isInfinity() ? !1 : b.getX().umod(this.n).cmp(s) === 0);
};
Ge.prototype.recoverPubKey = function(i, t, e, r) {
  is((3 & e) === e, "The recovery param is more than two bits"), t = new Cr(t, r);
  var n = this.n, s = new k(i), u = t.r, c = t.s, d = e & 1, m = e >> 1;
  if (u.cmp(this.curve.p.umod(this.curve.n)) >= 0 && m)
    throw new Error("Unable to find sencond key candinate");
  m ? u = this.curve.pointFromX(u.add(this.curve.n), d) : u = this.curve.pointFromX(u, d);
  var b = t.r.invm(n), x = n.sub(s).mul(b).umod(n), A = c.mul(b).umod(n);
  return this.g.mulAdd(x, u, A);
};
Ge.prototype.getKeyRecoveryParam = function(i, t, e, r) {
  if (t = new Cr(t, r), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var n = 0; n < 4; n++) {
    var s;
    try {
      s = this.recoverPubKey(i, t, n);
    } catch {
      continue;
    }
    if (s.eq(e))
      return n;
  }
  throw new Error("Unable to find valid recovery factor");
};
var nf = rr(function(i, t) {
  var e = t;
  e.version = "6.5.4", e.utils = Ke, e.rand = /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }, e.curve = _r, e.curves = Mr, e.ec = rf, e.eddsa = /*RicMoo:ethers:require(./elliptic/eddsa)*/
  null;
}), sf = nf.ec;
const of = "signing-key/5.7.0", wi = new Pe(of);
let ai = null;
function et() {
  return ai || (ai = new sf("secp256k1")), ai;
}
class af {
  constructor(t) {
    or(this, "curve", "secp256k1"), or(this, "privateKey", ze(t)), ho(this.privateKey) !== 32 && wi.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const e = et().keyFromPrivate(Ce(this.privateKey));
    or(this, "publicKey", "0x" + e.getPublic(!1, "hex")), or(this, "compressedPublicKey", "0x" + e.getPublic(!0, "hex")), or(this, "_isSigningKey", !0);
  }
  _addPoint(t) {
    const e = et().keyFromPublic(Ce(this.publicKey)), r = et().keyFromPublic(Ce(t));
    return "0x" + e.pub.add(r.pub).encodeCompressed("hex");
  }
  signDigest(t) {
    const e = et().keyFromPrivate(Ce(this.privateKey)), r = Ce(t);
    r.length !== 32 && wi.throwArgumentError("bad digest length", "digest", t);
    const n = e.sign(r, { canonical: !0 });
    return Cn({
      recoveryParam: n.recoveryParam,
      r: Jt("0x" + n.r.toString(16), 32),
      s: Jt("0x" + n.s.toString(16), 32)
    });
  }
  computeSharedSecret(t) {
    const e = et().keyFromPrivate(Ce(this.privateKey)), r = et().keyFromPublic(Ce(ns(t)));
    return Jt("0x" + e.derive(r.getPublic()).toString(16), 32);
  }
  static isSigningKey(t) {
    return !!(t && t._isSigningKey);
  }
}
function ff(i, t) {
  const e = Cn(t), r = { r: Ce(e.r), s: Ce(e.s) };
  return "0x" + et().recoverPubKey(Ce(i), r, e.recoveryParam).encode("hex", !1);
}
function ns(i, t) {
  const e = Ce(i);
  if (e.length === 32) {
    const r = new af(e);
    return t ? "0x" + et().keyFromPrivate(e).getPublic(!0, "hex") : r.publicKey;
  } else {
    if (e.length === 33)
      return t ? ze(e) : "0x" + et().keyFromPublic(e).getPublic(!1, "hex");
    if (e.length === 65)
      return t ? "0x" + et().keyFromPublic(e).getPublic(!0, "hex") : ze(e);
  }
  return wi.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var Yi;
(function(i) {
  i[i.legacy = 0] = "legacy", i[i.eip2930 = 1] = "eip2930", i[i.eip1559 = 2] = "eip1559";
})(Yi || (Yi = {}));
function hf(i) {
  const t = ns(i);
  return xo(zi(Mi(zi(t, 1)), 12));
}
function uf(i, t) {
  return hf(ff(Ce(i), t));
}
function cf(i, t) {
  return t = t || {}, new Promise(function(e, r) {
    var n = new XMLHttpRequest(), s = [], u = [], c = {}, d = function() {
      return { ok: (n.status / 100 | 0) == 2, statusText: n.statusText, status: n.status, url: n.responseURL, text: function() {
        return Promise.resolve(n.responseText);
      }, json: function() {
        return Promise.resolve(n.responseText).then(JSON.parse);
      }, blob: function() {
        return Promise.resolve(new Blob([n.response]));
      }, clone: d, headers: { keys: function() {
        return s;
      }, entries: function() {
        return u;
      }, get: function(b) {
        return c[b.toLowerCase()];
      }, has: function(b) {
        return b.toLowerCase() in c;
      } } };
    };
    for (var m in n.open(t.method || "get", i, !0), n.onload = function() {
      n.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(b, x, A) {
        s.push(x = x.toLowerCase()), u.push([x, A]), c[x] = c[x] ? c[x] + "," + A : A;
      }), e(d());
    }, n.onerror = r, n.withCredentials = t.credentials == "include", t.headers)
      n.setRequestHeader(m, t.headers[m]);
    n.send(t.body || null);
  });
}
const lf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cf
}, Symbol.toStringTag, { value: "Module" })), Qi = /* @__PURE__ */ Ts(lf);
var df = self.fetch || (self.fetch = Qi.default || Qi);
const pf = /* @__PURE__ */ Pr(df);
let vf = class {
  constructor(t) {
    this.client = t;
  }
}, gf = class {
  constructor(t) {
    this.opts = t;
  }
};
const mf = "https://rpc.walletconnect.com/v1", yr = { wc_authRequest: { req: { ttl: W.ONE_DAY, prompt: !0, tag: 3e3 }, res: { ttl: W.ONE_DAY, prompt: !1, tag: 3001 } } }, fi = { min: W.FIVE_MINUTES, max: W.SEVEN_DAYS }, ss = "wc", yf = 1, wf = "auth", Zi = "authClient", Sr = `${ss}@1:${wf}:`, dr = `${Sr}:PUB_KEY`;
function Ni(i) {
  return i == null ? void 0 : i.split(":");
}
function bf(i) {
  const t = i && Ni(i);
  if (t)
    return t[3];
}
function xf(i) {
  const t = i && Ni(i);
  if (t)
    return t[2] + ":" + t[3];
}
function en(i) {
  const t = i && Ni(i);
  if (t)
    return t.pop();
}
async function _f(i, t, e, r, n) {
  switch (e.t) {
    case "eip191":
      return Mf(i, t, e.s);
    case "eip1271":
      return await Sf(i, t, e.s, r, n);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${e.t}`);
  }
}
function Mf(i, t, e) {
  return uf(Tn(t), e).toLowerCase() === i.toLowerCase();
}
async function Sf(i, t, e, r, n) {
  try {
    const s = "0x1626ba7e", u = "0000000000000000000000000000000000000000000000000000000000000040", c = "0000000000000000000000000000000000000000000000000000000000000041", d = e.substring(2), m = Tn(t).substring(2), b = s + m + u + c + d, x = await pf(`${mf}/?chainId=${r}&projectId=${n}`, { method: "POST", body: JSON.stringify({ id: Af(), jsonrpc: "2.0", method: "eth_call", params: [{ to: i, data: b }, "latest"] }) }), { result: A } = await x.json();
    return A ? A.slice(0, s.length).toLowerCase() === s.toLowerCase() : !1;
  } catch (s) {
    return console.error("isValidEip1271Signature: ", s), !1;
  }
}
function Af() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function os(i) {
  return i.getAll().filter((t) => "requester" in t);
}
function as(i, t) {
  return os(i).find((e) => e.id === t);
}
function Ef(i) {
  const t = $s(i.aud), e = new RegExp(`${i.domain}`).test(i.aud), r = !!i.nonce, n = i.type ? i.type === "eip4361" : !0, s = i.expiry;
  if (s && !Fn(s, fi)) {
    const { message: u } = B("MISSING_OR_INVALID", `request() expiry: ${s}. Expiry must be a number (in seconds) between ${fi.min} and ${fi.max}`);
    throw new Error(u);
  }
  return !!(t && e && r && n);
}
function If(i, t) {
  return !!as(t, i.id);
}
function Rf(i = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(i) : new Uint8Array(i);
}
function Nf(i, t) {
  if (i.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var e = new Uint8Array(256), r = 0; r < e.length; r++)
    e[r] = 255;
  for (var n = 0; n < i.length; n++) {
    var s = i.charAt(n), u = s.charCodeAt(0);
    if (e[u] !== 255)
      throw new TypeError(s + " is ambiguous");
    e[u] = n;
  }
  var c = i.length, d = i.charAt(0), m = Math.log(c) / Math.log(256), b = Math.log(256) / Math.log(c);
  function x(S) {
    if (S instanceof Uint8Array || (ArrayBuffer.isView(S) ? S = new Uint8Array(S.buffer, S.byteOffset, S.byteLength) : Array.isArray(S) && (S = Uint8Array.from(S))), !(S instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (S.length === 0)
      return "";
    for (var F = 0, $ = 0, T = 0, K = S.length; T !== K && S[T] === 0; )
      T++, F++;
    for (var H = (K - T) * b + 1 >>> 0, z = new Uint8Array(H); T !== K; ) {
      for (var V = S[T], j = 0, J = H - 1; (V !== 0 || j < $) && J !== -1; J--, j++)
        V += 256 * z[J] >>> 0, z[J] = V % c >>> 0, V = V / c >>> 0;
      if (V !== 0)
        throw new Error("Non-zero carry");
      $ = j, T++;
    }
    for (var Y = H - $; Y !== H && z[Y] === 0; )
      Y++;
    for (var Te = d.repeat(F); Y < H; ++Y)
      Te += i.charAt(z[Y]);
    return Te;
  }
  function A(S) {
    if (typeof S != "string")
      throw new TypeError("Expected String");
    if (S.length === 0)
      return new Uint8Array();
    var F = 0;
    if (S[F] !== " ") {
      for (var $ = 0, T = 0; S[F] === d; )
        $++, F++;
      for (var K = (S.length - F) * m + 1 >>> 0, H = new Uint8Array(K); S[F]; ) {
        var z = e[S.charCodeAt(F)];
        if (z === 255)
          return;
        for (var V = 0, j = K - 1; (z !== 0 || V < T) && j !== -1; j--, V++)
          z += c * H[j] >>> 0, H[j] = z % 256 >>> 0, z = z / 256 >>> 0;
        if (z !== 0)
          throw new Error("Non-zero carry");
        T = V, F++;
      }
      if (S[F] !== " ") {
        for (var J = K - T; J !== K && H[J] === 0; )
          J++;
        for (var Y = new Uint8Array($ + (K - J)), Te = $; J !== K; )
          Y[Te++] = H[J++];
        return Y;
      }
    }
  }
  function I(S) {
    var F = A(S);
    if (F)
      return F;
    throw new Error(`Non-${t} character`);
  }
  return { encode: x, decodeUnsafe: A, decode: I };
}
var Ff = Nf, Pf = Ff;
const fs = (i) => {
  if (i instanceof Uint8Array && i.constructor.name === "Uint8Array")
    return i;
  if (i instanceof ArrayBuffer)
    return new Uint8Array(i);
  if (ArrayBuffer.isView(i))
    return new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
  throw new Error("Unknown type, must be binary type");
}, qf = (i) => new TextEncoder().encode(i), Of = (i) => new TextDecoder().decode(i);
class Cf {
  constructor(t, e, r) {
    this.name = t, this.prefix = e, this.baseEncode = r;
  }
  encode(t) {
    if (t instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(t)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Tf {
  constructor(t, e, r) {
    if (this.name = t, this.prefix = e, e.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = e.codePointAt(0), this.baseDecode = r;
  }
  decode(t) {
    if (typeof t == "string") {
      if (t.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(t)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(t.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(t) {
    return hs(this, t);
  }
}
class $f {
  constructor(t) {
    this.decoders = t;
  }
  or(t) {
    return hs(this, t);
  }
  decode(t) {
    const e = t[0], r = this.decoders[e];
    if (r)
      return r.decode(t);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(t)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const hs = (i, t) => new $f({ ...i.decoders || { [i.prefix]: i }, ...t.decoders || { [t.prefix]: t } });
class Lf {
  constructor(t, e, r, n) {
    this.name = t, this.prefix = e, this.baseEncode = r, this.baseDecode = n, this.encoder = new Cf(t, e, r), this.decoder = new Tf(t, e, n);
  }
  encode(t) {
    return this.encoder.encode(t);
  }
  decode(t) {
    return this.decoder.decode(t);
  }
}
const Tr = ({ name: i, prefix: t, encode: e, decode: r }) => new Lf(i, t, e, r), vr = ({ prefix: i, name: t, alphabet: e }) => {
  const { encode: r, decode: n } = Pf(e, t);
  return Tr({ prefix: i, name: t, encode: r, decode: (s) => fs(n(s)) });
}, Df = (i, t, e, r) => {
  const n = {};
  for (let b = 0; b < t.length; ++b)
    n[t[b]] = b;
  let s = i.length;
  for (; i[s - 1] === "="; )
    --s;
  const u = new Uint8Array(s * e / 8 | 0);
  let c = 0, d = 0, m = 0;
  for (let b = 0; b < s; ++b) {
    const x = n[i[b]];
    if (x === void 0)
      throw new SyntaxError(`Non-${r} character`);
    d = d << e | x, c += e, c >= 8 && (c -= 8, u[m++] = 255 & d >> c);
  }
  if (c >= e || 255 & d << 8 - c)
    throw new SyntaxError("Unexpected end of data");
  return u;
}, Uf = (i, t, e) => {
  const r = t[t.length - 1] === "=", n = (1 << e) - 1;
  let s = "", u = 0, c = 0;
  for (let d = 0; d < i.length; ++d)
    for (c = c << 8 | i[d], u += 8; u > e; )
      u -= e, s += t[n & c >> u];
  if (u && (s += t[n & c << e - u]), r)
    for (; s.length * e & 7; )
      s += "=";
  return s;
}, Ue = ({ name: i, prefix: t, bitsPerChar: e, alphabet: r }) => Tr({ prefix: t, name: i, encode(n) {
  return Uf(n, r, e);
}, decode(n) {
  return Df(n, r, e, i);
} }), kf = Tr({ prefix: "\0", name: "identity", encode: (i) => Of(i), decode: (i) => qf(i) });
var Bf = Object.freeze({ __proto__: null, identity: kf });
const zf = Ue({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var Vf = Object.freeze({ __proto__: null, base2: zf });
const Kf = Ue({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var jf = Object.freeze({ __proto__: null, base8: Kf });
const Gf = vr({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Hf = Object.freeze({ __proto__: null, base10: Gf });
const Jf = Ue({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Wf = Ue({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Xf = Object.freeze({ __proto__: null, base16: Jf, base16upper: Wf });
const Yf = Ue({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Qf = Ue({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Zf = Ue({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), eh = Ue({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), th = Ue({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), rh = Ue({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), ih = Ue({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), nh = Ue({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), sh = Ue({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var oh = Object.freeze({ __proto__: null, base32: Yf, base32upper: Qf, base32pad: Zf, base32padupper: eh, base32hex: th, base32hexupper: rh, base32hexpad: ih, base32hexpadupper: nh, base32z: sh });
const ah = vr({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), fh = vr({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var hh = Object.freeze({ __proto__: null, base36: ah, base36upper: fh });
const uh = vr({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), ch = vr({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var lh = Object.freeze({ __proto__: null, base58btc: uh, base58flickr: ch });
const dh = Ue({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), ph = Ue({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), vh = Ue({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), gh = Ue({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var mh = Object.freeze({ __proto__: null, base64: dh, base64pad: ph, base64url: vh, base64urlpad: gh });
const us = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), yh = us.reduce((i, t, e) => (i[e] = t, i), []), wh = us.reduce((i, t, e) => (i[t.codePointAt(0)] = e, i), []);
function bh(i) {
  return i.reduce((t, e) => (t += yh[e], t), "");
}
function xh(i) {
  const t = [];
  for (const e of i) {
    const r = wh[e.codePointAt(0)];
    if (r === void 0)
      throw new Error(`Non-base256emoji character: ${e}`);
    t.push(r);
  }
  return new Uint8Array(t);
}
const _h = Tr({ prefix: "🚀", name: "base256emoji", encode: bh, decode: xh });
var Mh = Object.freeze({ __proto__: null, base256emoji: _h }), Sh = cs, tn = 128, Ah = 127, Eh = ~Ah, Ih = Math.pow(2, 31);
function cs(i, t, e) {
  t = t || [], e = e || 0;
  for (var r = e; i >= Ih; )
    t[e++] = i & 255 | tn, i /= 128;
  for (; i & Eh; )
    t[e++] = i & 255 | tn, i >>>= 7;
  return t[e] = i | 0, cs.bytes = e - r + 1, t;
}
var Rh = bi, Nh = 128, rn = 127;
function bi(i, r) {
  var e = 0, r = r || 0, n = 0, s = r, u, c = i.length;
  do {
    if (s >= c)
      throw bi.bytes = 0, new RangeError("Could not decode varint");
    u = i[s++], e += n < 28 ? (u & rn) << n : (u & rn) * Math.pow(2, n), n += 7;
  } while (u >= Nh);
  return bi.bytes = s - r, e;
}
var Fh = Math.pow(2, 7), Ph = Math.pow(2, 14), qh = Math.pow(2, 21), Oh = Math.pow(2, 28), Ch = Math.pow(2, 35), Th = Math.pow(2, 42), $h = Math.pow(2, 49), Lh = Math.pow(2, 56), Dh = Math.pow(2, 63), Uh = function(i) {
  return i < Fh ? 1 : i < Ph ? 2 : i < qh ? 3 : i < Oh ? 4 : i < Ch ? 5 : i < Th ? 6 : i < $h ? 7 : i < Lh ? 8 : i < Dh ? 9 : 10;
}, kh = { encode: Sh, decode: Rh, encodingLength: Uh }, ls = kh;
const nn = (i, t, e = 0) => (ls.encode(i, t, e), t), sn = (i) => ls.encodingLength(i), xi = (i, t) => {
  const e = t.byteLength, r = sn(i), n = r + sn(e), s = new Uint8Array(n + e);
  return nn(i, s, 0), nn(e, s, r), s.set(t, n), new Bh(i, e, t, s);
};
class Bh {
  constructor(t, e, r, n) {
    this.code = t, this.size = e, this.digest = r, this.bytes = n;
  }
}
const ds = ({ name: i, code: t, encode: e }) => new zh(i, t, e);
class zh {
  constructor(t, e, r) {
    this.name = t, this.code = e, this.encode = r;
  }
  digest(t) {
    if (t instanceof Uint8Array) {
      const e = this.encode(t);
      return e instanceof Uint8Array ? xi(this.code, e) : e.then((r) => xi(this.code, r));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const ps = (i) => async (t) => new Uint8Array(await crypto.subtle.digest(i, t)), Vh = ds({ name: "sha2-256", code: 18, encode: ps("SHA-256") }), Kh = ds({ name: "sha2-512", code: 19, encode: ps("SHA-512") });
var jh = Object.freeze({ __proto__: null, sha256: Vh, sha512: Kh });
const vs = 0, Gh = "identity", gs = fs, Hh = (i) => xi(vs, gs(i)), Jh = { code: vs, name: Gh, encode: gs, digest: Hh };
var Wh = Object.freeze({ __proto__: null, identity: Jh });
new TextEncoder(), new TextDecoder();
const on = { ...Bf, ...Vf, ...jf, ...Hf, ...Xf, ...oh, ...hh, ...lh, ...mh, ...Mh };
({ ...jh, ...Wh });
function ms(i, t, e, r) {
  return { name: i, prefix: t, encoder: { name: i, prefix: t, encode: e }, decoder: { decode: r } };
}
const an = ms("utf8", "u", (i) => "u" + new TextDecoder("utf8").decode(i), (i) => new TextEncoder().encode(i.substring(1))), hi = ms("ascii", "a", (i) => {
  let t = "a";
  for (let e = 0; e < i.length; e++)
    t += String.fromCharCode(i[e]);
  return t;
}, (i) => {
  i = i.substring(1);
  const t = Rf(i.length);
  for (let e = 0; e < i.length; e++)
    t[e] = i.charCodeAt(e);
  return t;
}), ys = { utf8: an, "utf-8": an, hex: on.base16, latin1: hi, ascii: hi, binary: hi, ...on };
function Xh(i, t = "utf8") {
  const e = ys[t];
  if (!e)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(i, "utf8") : e.decoder.decode(`${e.prefix}${i}`);
}
function Yh(i, t = "utf8") {
  const e = ys[t];
  if (!e)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(i.buffer, i.byteOffset, i.byteLength).toString("utf8") : e.encoder.encode(i).substring(1);
}
const Qh = "base16", Zh = "utf8";
function fn(i) {
  const t = Ls.hash(Xh(i, Zh));
  return Yh(t, Qh);
}
var eu = Object.defineProperty, tu = Object.defineProperties, ru = Object.getOwnPropertyDescriptors, hn = Object.getOwnPropertySymbols, iu = Object.prototype.hasOwnProperty, nu = Object.prototype.propertyIsEnumerable, un = (i, t, e) => t in i ? eu(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, hr = (i, t) => {
  for (var e in t || (t = {}))
    iu.call(t, e) && un(i, e, t[e]);
  if (hn)
    for (var e of hn(t))
      nu.call(t, e) && un(i, e, t[e]);
  return i;
}, ui = (i, t) => tu(i, ru(t));
class su extends vf {
  constructor(t) {
    super(t), this.initialized = !1, this.name = "authEngine", this.init = () => {
      this.initialized || (this.registerRelayerEvents(), this.registerPairingEvents(), this.client.core.pairing.register({ methods: Object.keys(yr) }), this.initialized = !0);
    }, this.request = async (e, r) => {
      if (this.isInitialized(), !Ef(e))
        throw new Error("Invalid request");
      if (r != null && r.topic)
        return await this.requestOnKnownPairing(r.topic, e);
      const { chainId: n, statement: s, aud: u, domain: c, nonce: d, type: m, exp: b, nbf: x } = e, { topic: A, uri: I } = await this.client.core.pairing.create();
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: A, uri: I } });
      const S = await this.client.core.crypto.generateKeyPair(), F = Oi(S);
      await this.client.authKeys.set(dr, { responseTopic: F, publicKey: S }), await this.client.pairingTopics.set(F, { topic: F, pairingTopic: A }), await this.client.core.relayer.subscribe(F), this.client.logger.info(`sending request to new pairing topic: ${A}`);
      const $ = await this.sendRequest(A, "wc_authRequest", { payloadParams: { type: m ?? "eip4361", chainId: n, statement: s, aud: u, domain: c, version: "1", nonce: d, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: b, nbf: x }, requester: { publicKey: S, metadata: this.client.metadata } }, {}, e.expiry);
      return this.client.logger.info(`sent request to new pairing topic: ${A}`), { uri: I, id: $ };
    }, this.respond = async (e, r) => {
      if (this.isInitialized(), !If(e, this.client.requests))
        throw new Error("Invalid response");
      const n = as(this.client.requests, e.id);
      if (!n)
        throw new Error(`Could not find pending auth request with id ${e.id}`);
      const s = n.requester.publicKey, u = await this.client.core.crypto.generateKeyPair(), c = Oi(s), d = { type: Pn, receiverPublicKey: s, senderPublicKey: u };
      if ("error" in e) {
        await this.sendError(n.id, c, e, d);
        return;
      }
      const m = { h: { t: "eip4361" }, p: ui(hr({}, n.cacaoPayload), { iss: r }), s: e.signature };
      await this.sendResult(n.id, c, m, d), await this.client.core.pairing.activate({ topic: n.pairingTopic }), await this.client.requests.update(n.id, hr({}, m));
    }, this.getPendingRequests = () => os(this.client.requests), this.formatMessage = (e, r) => {
      this.client.logger.debug(`formatMessage, cacao is: ${JSON.stringify(e)}`);
      const n = `${e.domain} wants you to sign in with your Ethereum account:`, s = en(r), u = e.statement, c = `URI: ${e.aud}`, d = `Version: ${e.version}`, m = `Chain ID: ${bf(r)}`, b = `Nonce: ${e.nonce}`, x = `Issued At: ${e.iat}`, A = e.exp ? `Expiry: ${e.exp}` : void 0, I = e.resources && e.resources.length > 0 ? `Resources:
${e.resources.map((S) => `- ${S}`).join(`
`)}` : void 0;
      return [n, s, "", u, "", c, d, m, b, x, A, I].filter((S) => S != null).join(`
`);
    }, this.setExpiry = async (e, r) => {
      this.client.core.pairing.pairings.keys.includes(e) && await this.client.core.pairing.updateExpiry({ topic: e, expiry: r }), this.client.core.expirer.set(e, r);
    }, this.sendRequest = async (e, r, n, s, u) => {
      const c = br(r, n), d = await this.client.core.crypto.encode(e, c, s), m = yr[r].req;
      if (u && (m.ttl = u), this.client.core.history.set(e, c), Nn()) {
        const b = fn(JSON.stringify(c));
        this.client.core.verify.register({ attestationId: b });
      }
      return await this.client.core.relayer.publish(e, d, ui(hr({}, m), { internal: { throwOnFailedPublish: !0 } })), c.id;
    }, this.sendResult = async (e, r, n, s) => {
      const u = In(e, n), c = await this.client.core.crypto.encode(r, u, s), d = await this.client.core.history.get(r, e), m = yr[d.request.method].res;
      return await this.client.core.relayer.publish(r, c, ui(hr({}, m), { internal: { throwOnFailedPublish: !0 } })), await this.client.core.history.resolve(u), u.id;
    }, this.sendError = async (e, r, n, s) => {
      const u = Mn(e, n.error), c = await this.client.core.crypto.encode(r, u, s), d = await this.client.core.history.get(r, e), m = yr[d.request.method].res;
      return await this.client.core.relayer.publish(r, c, m), await this.client.core.history.resolve(u), u.id;
    }, this.requestOnKnownPairing = async (e, r) => {
      const n = this.client.core.pairing.pairings.getAll({ active: !0 }).find((I) => I.topic === e);
      if (!n)
        throw new Error(`Could not find pairing for provided topic ${e}`);
      const { publicKey: s } = this.client.authKeys.get(dr), { chainId: u, statement: c, aud: d, domain: m, nonce: b, type: x } = r, A = await this.sendRequest(n.topic, "wc_authRequest", { payloadParams: { type: x ?? "eip4361", chainId: u, statement: c, aud: d, domain: m, version: "1", nonce: b, iat: (/* @__PURE__ */ new Date()).toISOString() }, requester: { publicKey: s, metadata: this.client.metadata } }, {}, r.expiry);
      return this.client.logger.info(`sent request to known pairing topic: ${n.topic}`), { id: A };
    }, this.onPairingCreated = (e) => {
      const r = this.getPendingRequests();
      if (r) {
        const n = Object.values(r).find((s) => s.pairingTopic === e.topic);
        n && this.handleAuthRequest(n);
      }
    }, this.onRelayEventRequest = (e) => {
      const { topic: r, payload: n } = e, s = n.method;
      switch (s) {
        case "wc_authRequest":
          return this.onAuthRequest(r, n);
        default:
          return this.client.logger.info(`Unsupported request method ${s}`);
      }
    }, this.onRelayEventResponse = async (e) => {
      const { topic: r, payload: n } = e, s = (await this.client.core.history.get(r, n.id)).request.method;
      switch (s) {
        case "wc_authRequest":
          return this.onAuthResponse(r, n);
        default:
          return this.client.logger.info(`Unsupported response method ${s}`);
      }
    }, this.onAuthRequest = async (e, r) => {
      const { requester: n, payloadParams: s } = r.params;
      this.client.logger.info({ type: "onAuthRequest", topic: e, payload: r });
      const u = fn(JSON.stringify(r)), c = await this.getVerifyContext(u, this.client.metadata), d = { requester: n, pairingTopic: e, id: r.id, cacaoPayload: s, verifyContext: c };
      await this.client.requests.set(r.id, d), this.handleAuthRequest(d);
    }, this.handleAuthRequest = async (e) => {
      const { id: r, pairingTopic: n, requester: s, cacaoPayload: u, verifyContext: c } = e;
      try {
        this.client.emit("auth_request", { id: r, topic: n, params: { requester: s, cacaoPayload: u }, verifyContext: c });
      } catch (d) {
        await this.sendError(e.id, e.pairingTopic, d), this.client.logger.error(d);
      }
    }, this.onAuthResponse = async (e, r) => {
      const { id: n } = r;
      if (this.client.logger.info({ type: "onAuthResponse", topic: e, response: r }), bt(r)) {
        const { pairingTopic: s } = this.client.pairingTopics.get(e);
        await this.client.core.pairing.activate({ topic: s });
        const { s: u, p: c } = r.result;
        await this.client.requests.set(n, hr({ id: n, pairingTopic: s }, r.result));
        const d = this.formatMessage(c, c.iss);
        this.client.logger.debug(`reconstructed message:
`, JSON.stringify(d)), this.client.logger.debug("payload.iss:", c.iss), this.client.logger.debug("signature:", u);
        const m = en(c.iss), b = xf(c.iss);
        if (!m)
          throw new Error("Could not derive address from `payload.iss`");
        if (!b)
          throw new Error("Could not derive chainId from `payload.iss`");
        this.client.logger.debug("walletAddress extracted from `payload.iss`:", m), await _f(m, d, u, b, this.client.projectId) ? this.client.emit("auth_response", { id: n, topic: e, params: r }) : this.client.emit("auth_response", { id: n, topic: e, params: { message: "Invalid signature", code: -1 } });
      } else
        xt(r) && this.client.emit("auth_response", { id: n, topic: e, params: r });
    }, this.getVerifyContext = async (e, r) => {
      const n = { verified: { verifyUrl: r.verifyUrl || "", validation: "UNKNOWN", origin: r.url || "" } };
      try {
        const s = await this.client.core.verify.resolve({ attestationId: e, verifyUrl: r.verifyUrl });
        s && (n.verified.origin = s.origin, n.verified.isScam = s.isScam, n.verified.validation = origin === new URL(r.url).origin ? "VALID" : "INVALID");
      } catch (s) {
        this.client.logger.error(s);
      }
      return this.client.logger.info(`Verify context: ${JSON.stringify(n)}`), n;
    };
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = B("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(di.message, async (t) => {
      const { topic: e, message: r } = t, { responseTopic: n, publicKey: s } = this.client.authKeys.keys.includes(dr) ? this.client.authKeys.get(dr) : { responseTopic: void 0, publicKey: void 0 };
      if (n && e !== n) {
        this.client.logger.debug("[Auth] Ignoring message from unknown topic", e);
        return;
      }
      const u = await this.client.core.crypto.decode(e, r, { receiverPublicKey: s });
      Sn(u) ? (this.client.core.history.set(e, u), this.onRelayEventRequest({ topic: e, payload: u })) : An(u) && (await this.client.core.history.resolve(u), this.onRelayEventResponse({ topic: e, payload: u }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(En.create, (t) => this.onPairingCreated(t));
  }
}
let ou = class ws extends gf {
  constructor(t) {
    super(t), this.protocol = ss, this.version = yf, this.name = Zi, this.events = new xn.EventEmitter(), this.emit = (r, n) => this.events.emit(r, n), this.on = (r, n) => this.events.on(r, n), this.once = (r, n) => this.events.once(r, n), this.off = (r, n) => this.events.off(r, n), this.removeListener = (r, n) => this.events.removeListener(r, n), this.request = async (r, n) => {
      try {
        return await this.engine.request(r, n);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.respond = async (r, n) => {
      try {
        return await this.engine.respond(r, n);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.getPendingRequests = () => {
      try {
        return this.engine.getPendingRequests();
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.formatMessage = (r, n) => {
      try {
        return this.engine.formatMessage(r, n);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    };
    const e = typeof t.logger < "u" && typeof t.logger != "string" ? t.logger : _t.pino(_t.getDefaultLoggerOptions({ level: t.logger || "error" }));
    this.name = (t == null ? void 0 : t.name) || Zi, this.metadata = t.metadata, this.projectId = t.projectId, this.core = t.core || new _n(t), this.logger = _t.generateChildLogger(e, this.name), this.authKeys = new Gt(this.core, this.logger, "authKeys", Sr, () => dr), this.pairingTopics = new Gt(this.core, this.logger, "pairingTopics", Sr), this.requests = new Gt(this.core, this.logger, "requests", Sr, (r) => r.id), this.engine = new su(this);
  }
  static async init(t) {
    const e = new ws(t);
    return await e.initialize(), e;
  }
  get context() {
    return _t.getLoggerContext(this.logger);
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.authKeys.init(), await this.requests.init(), await this.pairingTopics.init(), await this.engine.init(), this.logger.info("AuthClient Initialization Success"), this.logger.info({ authClient: this });
    } catch (t) {
      throw this.logger.info("AuthClient Initialization Failure"), this.logger.error(t.message), t;
    }
  }
};
const au = ou, bs = "wc", xs = 2, _s = "client", Fi = `${bs}@${xs}:${_s}:`, ci = { name: _s, logger: "error", controller: !1, relayUrl: "wss://relay.walletconnect.com" }, cn = "WALLETCONNECT_DEEPLINK_CHOICE", fu = "proposal", hu = "Proposal expired", uu = "session", wr = W.SEVEN_DAYS, cu = "engine", ur = { wc_sessionPropose: { req: { ttl: W.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: W.FIVE_MINUTES, prompt: !1, tag: 1101 } }, wc_sessionSettle: { req: { ttl: W.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: W.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: W.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: W.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: W.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: W.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: W.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: W.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: W.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: W.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: W.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: W.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: W.THIRTY_SECONDS, prompt: !1, tag: 1114 }, res: { ttl: W.THIRTY_SECONDS, prompt: !1, tag: 1115 } } }, li = { min: W.FIVE_MINUTES, max: W.SEVEN_DAYS }, ht = { idle: "IDLE", active: "ACTIVE" }, lu = "request", du = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
var pu = Object.defineProperty, vu = Object.defineProperties, gu = Object.getOwnPropertyDescriptors, ln = Object.getOwnPropertySymbols, mu = Object.prototype.hasOwnProperty, yu = Object.prototype.propertyIsEnumerable, dn = (i, t, e) => t in i ? pu(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, Be = (i, t) => {
  for (var e in t || (t = {}))
    mu.call(t, e) && dn(i, e, t[e]);
  if (ln)
    for (var e of ln(t))
      yu.call(t, e) && dn(i, e, t[e]);
  return i;
}, cr = (i, t) => vu(i, gu(t));
class wu extends Rs {
  constructor(t) {
    super(t), this.name = cu, this.events = new Ns(), this.initialized = !1, this.ignoredPayloadTypes = [Pn], this.requestQueue = { state: ht.idle, queue: [] }, this.sessionRequestQueue = { state: ht.idle, queue: [] }, this.requestQueueDelay = W.ONE_SECOND, this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), this.client.core.pairing.register({ methods: Object.keys(ur) }), this.initialized = !0, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, W.toMiliseconds(this.requestQueueDelay)));
    }, this.connect = async (e) => {
      await this.isInitialized();
      const r = cr(Be({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(r);
      const { pairingTopic: n, requiredNamespaces: s, optionalNamespaces: u, sessionProperties: c, relays: d } = r;
      let m = n, b, x = !1;
      if (m && (x = this.client.core.pairing.pairings.get(m).active), !m || !x) {
        const { topic: H, uri: z } = await this.client.core.pairing.create();
        m = H, b = z;
      }
      const A = await this.client.core.crypto.generateKeyPair(), I = Be({ requiredNamespaces: s, optionalNamespaces: u, relays: d ?? [{ protocol: Fs }], proposer: { publicKey: A, metadata: this.client.metadata } }, c && { sessionProperties: c }), { reject: S, resolve: F, done: $ } = ir(W.FIVE_MINUTES, hu);
      if (this.events.once(Le("session_connect"), async ({ error: H, session: z }) => {
        if (H)
          S(H);
        else if (z) {
          z.self.publicKey = A;
          const V = cr(Be({}, z), { requiredNamespaces: z.requiredNamespaces, optionalNamespaces: z.optionalNamespaces });
          await this.client.session.set(z.topic, V), await this.setExpiry(z.topic, z.expiry), m && await this.client.core.pairing.updateMetadata({ topic: m, metadata: z.peer.metadata }), F(V);
        }
      }), !m) {
        const { message: H } = B("NO_MATCHING_KEY", `connect() pairing topic: ${m}`);
        throw new Error(H);
      }
      const T = await this.sendRequest({ topic: m, method: "wc_sessionPropose", params: I }), K = Bt(W.FIVE_MINUTES);
      return await this.setProposal(T, Be({ id: T, expiry: K }, I)), { uri: b, approval: $ };
    }, this.pair = async (e) => (await this.isInitialized(), await this.client.core.pairing.pair(e)), this.approve = async (e) => {
      await this.isInitialized(), await this.isValidApprove(e);
      const { id: r, relayProtocol: n, namespaces: s, sessionProperties: u } = e, c = this.client.proposal.get(r);
      let { pairingTopic: d, proposer: m, requiredNamespaces: b, optionalNamespaces: x } = c;
      d = d || "", Xr(b) || (b = Us(s, "approve()"));
      const A = await this.client.core.crypto.generateKeyPair(), I = m.publicKey, S = await this.client.core.crypto.generateSharedKey(A, I);
      d && r && (await this.client.core.pairing.updateMetadata({ topic: d, metadata: m.metadata }), await this.sendResult({ id: r, topic: d, result: { relay: { protocol: n ?? "irn" }, responderPublicKey: A } }), await this.client.proposal.delete(r, zt("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: d }));
      const F = Be({ relay: { protocol: n ?? "irn" }, namespaces: s, requiredNamespaces: b, optionalNamespaces: x, pairingTopic: d, controller: { publicKey: A, metadata: this.client.metadata }, expiry: Bt(wr) }, u && { sessionProperties: u });
      await this.client.core.relayer.subscribe(S), await this.sendRequest({ topic: S, method: "wc_sessionSettle", params: F, throwOnFailedPublish: !0 });
      const $ = cr(Be({}, F), { topic: S, pairingTopic: d, acknowledged: !1, self: F.controller, peer: { publicKey: m.publicKey, metadata: m.metadata }, controller: A });
      return await this.client.session.set(S, $), await this.setExpiry(S, Bt(wr)), { topic: S, acknowledged: () => new Promise((T) => setTimeout(() => T(this.client.session.get(S)), 500)) };
    }, this.reject = async (e) => {
      await this.isInitialized(), await this.isValidReject(e);
      const { id: r, reason: n } = e, { pairingTopic: s } = this.client.proposal.get(r);
      s && (await this.sendError(r, s, n), await this.client.proposal.delete(r, zt("USER_DISCONNECTED")));
    }, this.update = async (e) => {
      await this.isInitialized(), await this.isValidUpdate(e);
      const { topic: r, namespaces: n } = e, s = await this.sendRequest({ topic: r, method: "wc_sessionUpdate", params: { namespaces: n } }), { done: u, resolve: c, reject: d } = ir();
      return this.events.once(Le("session_update", s), ({ error: m }) => {
        m ? d(m) : c();
      }), await this.client.session.update(r, { namespaces: n }), { acknowledged: u };
    }, this.extend = async (e) => {
      await this.isInitialized(), await this.isValidExtend(e);
      const { topic: r } = e, n = await this.sendRequest({ topic: r, method: "wc_sessionExtend", params: {} }), { done: s, resolve: u, reject: c } = ir();
      return this.events.once(Le("session_extend", n), ({ error: d }) => {
        d ? c(d) : u();
      }), await this.setExpiry(r, Bt(wr)), { acknowledged: s };
    }, this.request = async (e) => {
      await this.isInitialized(), await this.isValidRequest(e);
      const { chainId: r, request: n, topic: s, expiry: u } = e, c = Os(), { done: d, resolve: m, reject: b } = ir(u, "Request expired. Please try again.");
      return this.events.once(Le("session_request", c), ({ error: x, result: A }) => {
        x ? b(x) : m(A);
      }), await Promise.all([new Promise(async (x) => {
        await this.sendRequest({ clientRpcId: c, topic: s, method: "wc_sessionRequest", params: { request: n, chainId: r }, expiry: u, throwOnFailedPublish: !0 }).catch((A) => b(A)), this.client.events.emit("session_request_sent", { topic: s, request: n, chainId: r, id: c }), x();
      }), new Promise(async (x) => {
        const A = await ks(this.client.core.storage, cn);
        Bs({ id: c, topic: s, wcDeepLink: A }), x();
      }), d()]).then((x) => x[2]);
    }, this.respond = async (e) => {
      await this.isInitialized(), await this.isValidRespond(e);
      const { topic: r, response: n } = e, { id: s } = n;
      bt(n) ? await this.sendResult({ id: s, topic: r, result: n.result, throwOnFailedPublish: !0 }) : xt(n) && await this.sendError(s, r, n.error), this.cleanupAfterResponse(e);
    }, this.ping = async (e) => {
      await this.isInitialized(), await this.isValidPing(e);
      const { topic: r } = e;
      if (this.client.session.keys.includes(r)) {
        const n = await this.sendRequest({ topic: r, method: "wc_sessionPing", params: {} }), { done: s, resolve: u, reject: c } = ir();
        this.events.once(Le("session_ping", n), ({ error: d }) => {
          d ? c(d) : u();
        }), await s();
      } else
        this.client.core.pairing.pairings.keys.includes(r) && await this.client.core.pairing.ping({ topic: r });
    }, this.emit = async (e) => {
      await this.isInitialized(), await this.isValidEmit(e);
      const { topic: r, event: n, chainId: s } = e;
      await this.sendRequest({ topic: r, method: "wc_sessionEvent", params: { event: n, chainId: s } });
    }, this.disconnect = async (e) => {
      await this.isInitialized(), await this.isValidDisconnect(e);
      const { topic: r } = e;
      this.client.session.keys.includes(r) ? (await this.sendRequest({ topic: r, method: "wc_sessionDelete", params: zt("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession(r)) : await this.client.core.pairing.disconnect({ topic: r });
    }, this.find = (e) => (this.isInitialized(), this.client.session.getAll().filter((r) => zs(r, e))), this.getPendingSessionRequests = () => (this.isInitialized(), this.client.pendingRequest.getAll()), this.cleanupDuplicatePairings = async (e) => {
      if (e.pairingTopic)
        try {
          const r = this.client.core.pairing.pairings.get(e.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((s) => {
            var u, c;
            return ((u = s.peerMetadata) == null ? void 0 : u.url) && ((c = s.peerMetadata) == null ? void 0 : c.url) === e.peer.metadata.url && s.topic && s.topic !== r.topic;
          });
          if (n.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), await Promise.all(n.map((s) => this.client.core.pairing.disconnect({ topic: s.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (r) {
          this.client.logger.error(r);
        }
    }, this.deleteSession = async (e, r) => {
      const { self: n } = this.client.session.get(e);
      await this.client.core.relayer.unsubscribe(e), this.client.session.delete(e, zt("USER_DISCONNECTED")), this.client.core.crypto.keychain.has(n.publicKey) && await this.client.core.crypto.deleteKeyPair(n.publicKey), this.client.core.crypto.keychain.has(e) && await this.client.core.crypto.deleteSymKey(e), r || this.client.core.expirer.del(e), this.client.core.storage.removeItem(cn).catch((s) => this.client.logger.warn(s));
    }, this.deleteProposal = async (e, r) => {
      await Promise.all([this.client.proposal.delete(e, zt("USER_DISCONNECTED")), r ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }, this.deletePendingSessionRequest = async (e, r, n = !1) => {
      await Promise.all([this.client.pendingRequest.delete(e, r), n ? Promise.resolve() : this.client.core.expirer.del(e)]), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((s) => s.id !== e), n && (this.sessionRequestQueue.state = ht.idle);
    }, this.setExpiry = async (e, r) => {
      this.client.session.keys.includes(e) && await this.client.session.update(e, { expiry: r }), this.client.core.expirer.set(e, r);
    }, this.setProposal = async (e, r) => {
      await this.client.proposal.set(e, r), this.client.core.expirer.set(e, r.expiry);
    }, this.setPendingSessionRequest = async (e) => {
      const r = ur.wc_sessionRequest.req.ttl, { id: n, topic: s, params: u, verifyContext: c } = e;
      await this.client.pendingRequest.set(n, { id: n, topic: s, params: u, verifyContext: c }), r && this.client.core.expirer.set(n, Bt(r));
    }, this.sendRequest = async (e) => {
      const { topic: r, method: n, params: s, expiry: u, relayRpcId: c, clientRpcId: d, throwOnFailedPublish: m } = e, b = br(n, s, d);
      if (Nn() && du.includes(n)) {
        const I = Yr(JSON.stringify(b));
        this.client.core.verify.register({ attestationId: I });
      }
      const x = await this.client.core.crypto.encode(r, b), A = ur[n].req;
      return u && (A.ttl = u), c && (A.id = c), this.client.core.history.set(r, b), m ? (A.internal = cr(Be({}, A.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(r, x, A)) : this.client.core.relayer.publish(r, x, A).catch((I) => this.client.logger.error(I)), b.id;
    }, this.sendResult = async (e) => {
      const { id: r, topic: n, result: s, throwOnFailedPublish: u } = e, c = In(r, s), d = await this.client.core.crypto.encode(n, c), m = await this.client.core.history.get(n, r), b = ur[m.request.method].res;
      u ? (b.internal = cr(Be({}, b.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(n, d, b)) : this.client.core.relayer.publish(n, d, b).catch((x) => this.client.logger.error(x)), await this.client.core.history.resolve(c);
    }, this.sendError = async (e, r, n) => {
      const s = Mn(e, n), u = await this.client.core.crypto.encode(r, s), c = await this.client.core.history.get(r, e), d = ur[c.request.method].res;
      this.client.core.relayer.publish(r, u, d), await this.client.core.history.resolve(s);
    }, this.cleanup = async () => {
      const e = [], r = [];
      this.client.session.getAll().forEach((n) => {
        jt(n.expiry) && e.push(n.topic);
      }), this.client.proposal.getAll().forEach((n) => {
        jt(n.expiry) && r.push(n.id);
      }), await Promise.all([...e.map((n) => this.deleteSession(n)), ...r.map((n) => this.deleteProposal(n))]);
    }, this.onRelayEventRequest = async (e) => {
      this.requestQueue.queue.push(e), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === ht.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = ht.active;
        const e = this.requestQueue.queue.shift();
        if (e)
          try {
            this.processRequest(e), await new Promise((r) => setTimeout(r, 300));
          } catch (r) {
            this.client.logger.warn(r);
          }
      }
      this.requestQueue.state = ht.idle;
    }, this.processRequest = (e) => {
      const { topic: r, payload: n } = e, s = n.method;
      switch (s) {
        case "wc_sessionPropose":
          return this.onSessionProposeRequest(r, n);
        case "wc_sessionSettle":
          return this.onSessionSettleRequest(r, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateRequest(r, n);
        case "wc_sessionExtend":
          return this.onSessionExtendRequest(r, n);
        case "wc_sessionPing":
          return this.onSessionPingRequest(r, n);
        case "wc_sessionDelete":
          return this.onSessionDeleteRequest(r, n);
        case "wc_sessionRequest":
          return this.onSessionRequest(r, n);
        case "wc_sessionEvent":
          return this.onSessionEventRequest(r, n);
        default:
          return this.client.logger.info(`Unsupported request method ${s}`);
      }
    }, this.onRelayEventResponse = async (e) => {
      const { topic: r, payload: n } = e, s = (await this.client.core.history.get(r, n.id)).request.method;
      switch (s) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(r, n);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(r, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(r, n);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(r, n);
        case "wc_sessionPing":
          return this.onSessionPingResponse(r, n);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(r, n);
        default:
          return this.client.logger.info(`Unsupported response method ${s}`);
      }
    }, this.onRelayEventUnknownPayload = (e) => {
      const { topic: r } = e, { message: n } = B("MISSING_OR_INVALID", `Decoded payload on topic ${r} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(n);
    }, this.onSessionProposeRequest = async (e, r) => {
      const { params: n, id: s } = r;
      try {
        this.isValidConnect(Be({}, r.params));
        const u = Bt(W.FIVE_MINUTES), c = Be({ id: s, pairingTopic: e, expiry: u }, n);
        await this.setProposal(s, c);
        const d = Yr(JSON.stringify(r)), m = await this.getVerifyContext(d, c.proposer.metadata);
        this.client.events.emit("session_proposal", { id: s, params: c, verifyContext: m });
      } catch (u) {
        await this.sendError(s, e, u), this.client.logger.error(u);
      }
    }, this.onSessionProposeResponse = async (e, r) => {
      const { id: n } = r;
      if (bt(r)) {
        const { result: s } = r;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: s });
        const u = this.client.proposal.get(n);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: u });
        const c = u.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: c });
        const d = s.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: d });
        const m = await this.client.core.crypto.generateSharedKey(c, d);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: m });
        const b = await this.client.core.relayer.subscribe(m);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: b }), await this.client.core.pairing.activate({ topic: e });
      } else
        xt(r) && (await this.client.proposal.delete(n, zt("USER_DISCONNECTED")), this.events.emit(Le("session_connect"), { error: r.error }));
    }, this.onSessionSettleRequest = async (e, r) => {
      const { id: n, params: s } = r;
      try {
        this.isValidSessionSettleRequest(s);
        const { relay: u, controller: c, expiry: d, namespaces: m, requiredNamespaces: b, optionalNamespaces: x, sessionProperties: A, pairingTopic: I } = r.params, S = Be({ topic: e, relay: u, expiry: d, namespaces: m, acknowledged: !0, pairingTopic: I, requiredNamespaces: b, optionalNamespaces: x, controller: c.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: c.publicKey, metadata: c.metadata } }, A && { sessionProperties: A });
        await this.sendResult({ id: r.id, topic: e, result: !0 }), this.events.emit(Le("session_connect"), { session: S }), this.cleanupDuplicatePairings(S);
      } catch (u) {
        await this.sendError(n, e, u), this.client.logger.error(u);
      }
    }, this.onSessionSettleResponse = async (e, r) => {
      const { id: n } = r;
      bt(r) ? (await this.client.session.update(e, { acknowledged: !0 }), this.events.emit(Le("session_approve", n), {})) : xt(r) && (await this.client.session.delete(e, zt("USER_DISCONNECTED")), this.events.emit(Le("session_approve", n), { error: r.error }));
    }, this.onSessionUpdateRequest = async (e, r) => {
      const { params: n, id: s } = r;
      try {
        const u = `${e}_session_update`, c = gr.get(u);
        if (c && this.isRequestOutOfSync(c, s)) {
          this.client.logger.info(`Discarding out of sync request - ${s}`);
          return;
        }
        this.isValidUpdate(Be({ topic: e }, n)), await this.client.session.update(e, { namespaces: n.namespaces }), await this.sendResult({ id: s, topic: e, result: !0 }), this.client.events.emit("session_update", { id: s, topic: e, params: n }), gr.set(u, s);
      } catch (u) {
        await this.sendError(s, e, u), this.client.logger.error(u);
      }
    }, this.isRequestOutOfSync = (e, r) => parseInt(r.toString().slice(0, -3)) <= parseInt(e.toString().slice(0, -3)), this.onSessionUpdateResponse = (e, r) => {
      const { id: n } = r;
      bt(r) ? this.events.emit(Le("session_update", n), {}) : xt(r) && this.events.emit(Le("session_update", n), { error: r.error });
    }, this.onSessionExtendRequest = async (e, r) => {
      const { id: n } = r;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, Bt(wr)), await this.sendResult({ id: n, topic: e, result: !0 }), this.client.events.emit("session_extend", { id: n, topic: e });
      } catch (s) {
        await this.sendError(n, e, s), this.client.logger.error(s);
      }
    }, this.onSessionExtendResponse = (e, r) => {
      const { id: n } = r;
      bt(r) ? this.events.emit(Le("session_extend", n), {}) : xt(r) && this.events.emit(Le("session_extend", n), { error: r.error });
    }, this.onSessionPingRequest = async (e, r) => {
      const { id: n } = r;
      try {
        this.isValidPing({ topic: e }), await this.sendResult({ id: n, topic: e, result: !0 }), this.client.events.emit("session_ping", { id: n, topic: e });
      } catch (s) {
        await this.sendError(n, e, s), this.client.logger.error(s);
      }
    }, this.onSessionPingResponse = (e, r) => {
      const { id: n } = r;
      setTimeout(() => {
        bt(r) ? this.events.emit(Le("session_ping", n), {}) : xt(r) && this.events.emit(Le("session_ping", n), { error: r.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (e, r) => {
      const { id: n } = r;
      try {
        this.isValidDisconnect({ topic: e, reason: r.params }), await Promise.all([new Promise((s) => {
          this.client.core.relayer.once(di.publish, async () => {
            s(await this.deleteSession(e));
          });
        }), this.sendResult({ id: n, topic: e, result: !0 })]), this.client.events.emit("session_delete", { id: n, topic: e });
      } catch (s) {
        this.client.logger.error(s);
      }
    }, this.onSessionRequest = async (e, r) => {
      const { id: n, params: s } = r;
      try {
        this.isValidRequest(Be({ topic: e }, s));
        const u = Yr(JSON.stringify(br("wc_sessionRequest", s, n))), c = this.client.session.get(e), d = await this.getVerifyContext(u, c.peer.metadata), m = { id: n, topic: e, params: s, verifyContext: d };
        await this.setPendingSessionRequest(m), this.addSessionRequestToSessionRequestQueue(m), this.processSessionRequestQueue();
      } catch (u) {
        await this.sendError(n, e, u), this.client.logger.error(u);
      }
    }, this.onSessionRequestResponse = (e, r) => {
      const { id: n } = r;
      bt(r) ? this.events.emit(Le("session_request", n), { result: r.result }) : xt(r) && this.events.emit(Le("session_request", n), { error: r.error });
    }, this.onSessionEventRequest = async (e, r) => {
      const { id: n, params: s } = r;
      try {
        const u = `${e}_session_event_${s.event.name}`, c = gr.get(u);
        if (c && this.isRequestOutOfSync(c, n)) {
          this.client.logger.info(`Discarding out of sync request - ${n}`);
          return;
        }
        this.isValidEmit(Be({ topic: e }, s)), this.client.events.emit("session_event", { id: n, topic: e, params: s }), gr.set(u, n);
      } catch (u) {
        await this.sendError(n, e, u), this.client.logger.error(u);
      }
    }, this.addSessionRequestToSessionRequestQueue = (e) => {
      this.sessionRequestQueue.queue.push(e);
    }, this.cleanupAfterResponse = (e) => {
      this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = ht.idle, this.processSessionRequestQueue();
      }, W.toMiliseconds(this.requestQueueDelay));
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === ht.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e = this.sessionRequestQueue.queue[0];
      if (!e) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = ht.active, this.client.events.emit("session_request", e);
      } catch (r) {
        this.client.logger.error(r);
      }
    }, this.onPairingCreated = (e) => {
      if (e.active)
        return;
      const r = this.client.proposal.getAll().find((n) => n.pairingTopic === e.topic);
      r && this.onSessionProposeRequest(e.topic, br("wc_sessionPropose", { requiredNamespaces: r.requiredNamespaces, optionalNamespaces: r.optionalNamespaces, relays: r.relays, proposer: r.proposer, sessionProperties: r.sessionProperties }, r.id));
    }, this.isValidConnect = async (e) => {
      if (!We(e)) {
        const { message: d } = B("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(d);
      }
      const { pairingTopic: r, requiredNamespaces: n, optionalNamespaces: s, sessionProperties: u, relays: c } = e;
      if (nr(r) || await this.isValidPairingTopic(r), !Vs(c, !0)) {
        const { message: d } = B("MISSING_OR_INVALID", `connect() relays: ${c}`);
        throw new Error(d);
      }
      !nr(n) && Xr(n) !== 0 && this.validateNamespaces(n, "requiredNamespaces"), !nr(s) && Xr(s) !== 0 && this.validateNamespaces(s, "optionalNamespaces"), nr(u) || this.validateSessionProps(u, "sessionProperties");
    }, this.validateNamespaces = (e, r) => {
      const n = Ks(e, "connect()", r);
      if (n)
        throw new Error(n.message);
    }, this.isValidApprove = async (e) => {
      if (!We(e))
        throw new Error(B("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: r, namespaces: n, relayProtocol: s, sessionProperties: u } = e;
      await this.isValidProposalId(r);
      const c = this.client.proposal.get(r), d = Qr(n, "approve()");
      if (d)
        throw new Error(d.message);
      const m = Ci(c.requiredNamespaces, n, "approve()");
      if (m)
        throw new Error(m.message);
      if (!sr(s, !0)) {
        const { message: b } = B("MISSING_OR_INVALID", `approve() relayProtocol: ${s}`);
        throw new Error(b);
      }
      nr(u) || this.validateSessionProps(u, "sessionProperties");
    }, this.isValidReject = async (e) => {
      if (!We(e)) {
        const { message: s } = B("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(s);
      }
      const { id: r, reason: n } = e;
      if (await this.isValidProposalId(r), !js(n)) {
        const { message: s } = B("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
        throw new Error(s);
      }
    }, this.isValidSessionSettleRequest = (e) => {
      if (!We(e)) {
        const { message: m } = B("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(m);
      }
      const { relay: r, controller: n, namespaces: s, expiry: u } = e;
      if (!Gs(r)) {
        const { message: m } = B("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(m);
      }
      const c = Hs(n, "onSessionSettleRequest()");
      if (c)
        throw new Error(c.message);
      const d = Qr(s, "onSessionSettleRequest()");
      if (d)
        throw new Error(d.message);
      if (jt(u)) {
        const { message: m } = B("EXPIRED", "onSessionSettleRequest()");
        throw new Error(m);
      }
    }, this.isValidUpdate = async (e) => {
      if (!We(e)) {
        const { message: d } = B("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(d);
      }
      const { topic: r, namespaces: n } = e;
      await this.isValidSessionTopic(r);
      const s = this.client.session.get(r), u = Qr(n, "update()");
      if (u)
        throw new Error(u.message);
      const c = Ci(s.requiredNamespaces, n, "update()");
      if (c)
        throw new Error(c.message);
    }, this.isValidExtend = async (e) => {
      if (!We(e)) {
        const { message: n } = B("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(n);
      }
      const { topic: r } = e;
      await this.isValidSessionTopic(r);
    }, this.isValidRequest = async (e) => {
      if (!We(e)) {
        const { message: d } = B("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(d);
      }
      const { topic: r, request: n, chainId: s, expiry: u } = e;
      await this.isValidSessionTopic(r);
      const { namespaces: c } = this.client.session.get(r);
      if (!Ti(c, s)) {
        const { message: d } = B("MISSING_OR_INVALID", `request() chainId: ${s}`);
        throw new Error(d);
      }
      if (!Js(n)) {
        const { message: d } = B("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
        throw new Error(d);
      }
      if (!Ws(c, s, n.method)) {
        const { message: d } = B("MISSING_OR_INVALID", `request() method: ${n.method}`);
        throw new Error(d);
      }
      if (u && !Fn(u, li)) {
        const { message: d } = B("MISSING_OR_INVALID", `request() expiry: ${u}. Expiry must be a number (in seconds) between ${li.min} and ${li.max}`);
        throw new Error(d);
      }
    }, this.isValidRespond = async (e) => {
      if (!We(e)) {
        const { message: s } = B("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(s);
      }
      const { topic: r, response: n } = e;
      if (await this.isValidSessionTopic(r), !Xs(n)) {
        const { message: s } = B("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(n)}`);
        throw new Error(s);
      }
    }, this.isValidPing = async (e) => {
      if (!We(e)) {
        const { message: n } = B("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(n);
      }
      const { topic: r } = e;
      await this.isValidSessionOrPairingTopic(r);
    }, this.isValidEmit = async (e) => {
      if (!We(e)) {
        const { message: c } = B("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(c);
      }
      const { topic: r, event: n, chainId: s } = e;
      await this.isValidSessionTopic(r);
      const { namespaces: u } = this.client.session.get(r);
      if (!Ti(u, s)) {
        const { message: c } = B("MISSING_OR_INVALID", `emit() chainId: ${s}`);
        throw new Error(c);
      }
      if (!Ys(n)) {
        const { message: c } = B("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(c);
      }
      if (!Qs(u, s, n.name)) {
        const { message: c } = B("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(c);
      }
    }, this.isValidDisconnect = async (e) => {
      if (!We(e)) {
        const { message: n } = B("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(n);
      }
      const { topic: r } = e;
      await this.isValidSessionOrPairingTopic(r);
    }, this.getVerifyContext = async (e, r) => {
      const n = { verified: { verifyUrl: r.verifyUrl || Ps, validation: "UNKNOWN", origin: r.url || "" } };
      try {
        const s = await this.client.core.verify.resolve({ attestationId: e, verifyUrl: r.verifyUrl });
        s && (n.verified.origin = s.origin, n.verified.isScam = s.isScam, n.verified.validation = s.origin === new URL(r.url).origin ? "VALID" : "INVALID");
      } catch (s) {
        this.client.logger.info(s);
      }
      return this.client.logger.info(`Verify context: ${JSON.stringify(n)}`), n;
    }, this.validateSessionProps = (e, r) => {
      Object.values(e).forEach((n) => {
        if (!sr(n, !1)) {
          const { message: s } = B("MISSING_OR_INVALID", `${r} must be in Record<string, string> format. Received: ${JSON.stringify(n)}`);
          throw new Error(s);
        }
      });
    };
  }
  async isInitialized() {
    if (!this.initialized) {
      const { message: t } = B("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(di.message, async (t) => {
      const { topic: e, message: r } = t;
      if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(r)))
        return;
      const n = await this.client.core.crypto.decode(e, r);
      try {
        Sn(n) ? (this.client.core.history.set(e, n), this.onRelayEventRequest({ topic: e, payload: n })) : An(n) ? (await this.client.core.history.resolve(n), await this.onRelayEventResponse({ topic: e, payload: n }), this.client.core.history.delete(e, n.id)) : this.onRelayEventUnknownPayload({ topic: e, payload: n });
      } catch (s) {
        this.client.logger.error(s);
      }
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(qs.expired, async (t) => {
      const { topic: e, id: r } = Zs(t.target);
      if (r && this.client.pendingRequest.keys.includes(r))
        return await this.deletePendingSessionRequest(r, B("EXPIRED"), !0);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession(e, !0), this.client.events.emit("session_expire", { topic: e })) : r && (await this.deleteProposal(r, !0), this.client.events.emit("proposal_expire", { id: r }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(En.create, (t) => this.onPairingCreated(t));
  }
  isValidPairingTopic(t) {
    if (!sr(t, !1)) {
      const { message: e } = B("MISSING_OR_INVALID", `pairing topic should be a string: ${t}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(t)) {
      const { message: e } = B("NO_MATCHING_KEY", `pairing topic doesn't exist: ${t}`);
      throw new Error(e);
    }
    if (jt(this.client.core.pairing.pairings.get(t).expiry)) {
      const { message: e } = B("EXPIRED", `pairing topic: ${t}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(t) {
    if (!sr(t, !1)) {
      const { message: e } = B("MISSING_OR_INVALID", `session topic should be a string: ${t}`);
      throw new Error(e);
    }
    if (!this.client.session.keys.includes(t)) {
      const { message: e } = B("NO_MATCHING_KEY", `session topic doesn't exist: ${t}`);
      throw new Error(e);
    }
    if (jt(this.client.session.get(t).expiry)) {
      await this.deleteSession(t);
      const { message: e } = B("EXPIRED", `session topic: ${t}`);
      throw new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(t) {
    if (this.client.session.keys.includes(t))
      await this.isValidSessionTopic(t);
    else if (this.client.core.pairing.pairings.keys.includes(t))
      this.isValidPairingTopic(t);
    else if (sr(t, !1)) {
      const { message: e } = B("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${t}`);
      throw new Error(e);
    } else {
      const { message: e } = B("MISSING_OR_INVALID", `session or pairing topic should be a string: ${t}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(t) {
    if (!eo(t)) {
      const { message: e } = B("MISSING_OR_INVALID", `proposal id should be a number: ${t}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(t)) {
      const { message: e } = B("NO_MATCHING_KEY", `proposal id doesn't exist: ${t}`);
      throw new Error(e);
    }
    if (jt(this.client.proposal.get(t).expiry)) {
      await this.deleteProposal(t);
      const { message: e } = B("EXPIRED", `proposal id: ${t}`);
      throw new Error(e);
    }
  }
}
class bu extends Gt {
  constructor(t, e) {
    super(t, e, fu, Fi), this.core = t, this.logger = e;
  }
}
class xu extends Gt {
  constructor(t, e) {
    super(t, e, uu, Fi), this.core = t, this.logger = e;
  }
}
class _u extends Gt {
  constructor(t, e) {
    super(t, e, lu, Fi, (r) => r.id), this.core = t, this.logger = e;
  }
}
class Pi extends Is {
  constructor(t) {
    super(t), this.protocol = bs, this.version = xs, this.name = ci.name, this.events = new xn.EventEmitter(), this.on = (r, n) => this.events.on(r, n), this.once = (r, n) => this.events.once(r, n), this.off = (r, n) => this.events.off(r, n), this.removeListener = (r, n) => this.events.removeListener(r, n), this.removeAllListeners = (r) => this.events.removeAllListeners(r), this.connect = async (r) => {
      try {
        return await this.engine.connect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.pair = async (r) => {
      try {
        return await this.engine.pair(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approve = async (r) => {
      try {
        return await this.engine.approve(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.reject = async (r) => {
      try {
        return await this.engine.reject(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.update = async (r) => {
      try {
        return await this.engine.update(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.extend = async (r) => {
      try {
        return await this.engine.extend(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.request = async (r) => {
      try {
        return await this.engine.request(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.respond = async (r) => {
      try {
        return await this.engine.respond(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.ping = async (r) => {
      try {
        return await this.engine.ping(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.emit = async (r) => {
      try {
        return await this.engine.emit(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.disconnect = async (r) => {
      try {
        return await this.engine.disconnect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.find = (r) => {
      try {
        return this.engine.find(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.name = (t == null ? void 0 : t.name) || ci.name, this.metadata = (t == null ? void 0 : t.metadata) || Ds();
    const e = typeof (t == null ? void 0 : t.logger) < "u" && typeof (t == null ? void 0 : t.logger) != "string" ? t.logger : _t.pino(_t.getDefaultLoggerOptions({ level: (t == null ? void 0 : t.logger) || ci.logger }));
    this.core = (t == null ? void 0 : t.core) || new _n(t), this.logger = _t.generateChildLogger(e, this.name), this.session = new xu(this.core, this.logger), this.proposal = new bu(this.core, this.logger), this.pendingRequest = new _u(this.core, this.logger), this.engine = new wu(this);
  }
  static async init(t) {
    const e = new Pi(t);
    return await e.initialize(), e;
  }
  get context() {
    return _t.getLoggerContext(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.engine.init(), this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }), this.logger.info("SignClient Initialization Success");
    } catch (t) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(t.message), t;
    }
  }
}
const Mu = Pi;
var Fr = { exports: {} }, Wt = typeof Reflect == "object" ? Reflect : null, pn = Wt && typeof Wt.apply == "function" ? Wt.apply : function(i, t, e) {
  return Function.prototype.apply.call(i, t, e);
}, Ar;
Wt && typeof Wt.ownKeys == "function" ? Ar = Wt.ownKeys : Object.getOwnPropertySymbols ? Ar = function(i) {
  return Object.getOwnPropertyNames(i).concat(Object.getOwnPropertySymbols(i));
} : Ar = function(i) {
  return Object.getOwnPropertyNames(i);
};
function Su(i) {
  console && console.warn && console.warn(i);
}
var vn = Number.isNaN || function(i) {
  return i !== i;
};
function X() {
  X.init.call(this);
}
Fr.exports = X, Fr.exports.once = Ru, X.EventEmitter = X, X.prototype._events = void 0, X.prototype._eventsCount = 0, X.prototype._maxListeners = void 0;
var gn = 10;
function Er(i) {
  if (typeof i != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof i);
}
Object.defineProperty(X, "defaultMaxListeners", { enumerable: !0, get: function() {
  return gn;
}, set: function(i) {
  if (typeof i != "number" || i < 0 || vn(i))
    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + i + ".");
  gn = i;
} }), X.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, X.prototype.setMaxListeners = function(i) {
  if (typeof i != "number" || i < 0 || vn(i))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + i + ".");
  return this._maxListeners = i, this;
};
function Ms(i) {
  return i._maxListeners === void 0 ? X.defaultMaxListeners : i._maxListeners;
}
X.prototype.getMaxListeners = function() {
  return Ms(this);
}, X.prototype.emit = function(i) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t.push(arguments[e]);
  var r = i === "error", n = this._events;
  if (n !== void 0)
    r = r && n.error === void 0;
  else if (!r)
    return !1;
  if (r) {
    var s;
    if (t.length > 0 && (s = t[0]), s instanceof Error)
      throw s;
    var u = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw u.context = s, u;
  }
  var c = n[i];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    pn(c, this, t);
  else
    for (var d = c.length, m = Ss(c, d), e = 0; e < d; ++e)
      pn(m[e], this, t);
  return !0;
};
function mn(i, t, e, r) {
  var n, s, u;
  if (Er(e), s = i._events, s === void 0 ? (s = i._events = /* @__PURE__ */ Object.create(null), i._eventsCount = 0) : (s.newListener !== void 0 && (i.emit("newListener", t, e.listener ? e.listener : e), s = i._events), u = s[t]), u === void 0)
    u = s[t] = e, ++i._eventsCount;
  else if (typeof u == "function" ? u = s[t] = r ? [e, u] : [u, e] : r ? u.unshift(e) : u.push(e), n = Ms(i), n > 0 && u.length > n && !u.warned) {
    u.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + u.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = i, c.type = t, c.count = u.length, Su(c);
  }
  return i;
}
X.prototype.addListener = function(i, t) {
  return mn(this, i, t, !1);
}, X.prototype.on = X.prototype.addListener, X.prototype.prependListener = function(i, t) {
  return mn(this, i, t, !0);
};
function Au() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function yn(i, t, e) {
  var r = { fired: !1, wrapFn: void 0, target: i, type: t, listener: e }, n = Au.bind(r);
  return n.listener = e, r.wrapFn = n, n;
}
X.prototype.once = function(i, t) {
  return Er(t), this.on(i, yn(this, i, t)), this;
}, X.prototype.prependOnceListener = function(i, t) {
  return Er(t), this.prependListener(i, yn(this, i, t)), this;
}, X.prototype.removeListener = function(i, t) {
  var e, r, n, s, u;
  if (Er(t), r = this._events, r === void 0)
    return this;
  if (e = r[i], e === void 0)
    return this;
  if (e === t || e.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete r[i], r.removeListener && this.emit("removeListener", i, e.listener || t));
  else if (typeof e != "function") {
    for (n = -1, s = e.length - 1; s >= 0; s--)
      if (e[s] === t || e[s].listener === t) {
        u = e[s].listener, n = s;
        break;
      }
    if (n < 0)
      return this;
    n === 0 ? e.shift() : Eu(e, n), e.length === 1 && (r[i] = e[0]), r.removeListener !== void 0 && this.emit("removeListener", i, u || t);
  }
  return this;
}, X.prototype.off = X.prototype.removeListener, X.prototype.removeAllListeners = function(i) {
  var t, e, r;
  if (e = this._events, e === void 0)
    return this;
  if (e.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : e[i] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete e[i]), this;
  if (arguments.length === 0) {
    var n = Object.keys(e), s;
    for (r = 0; r < n.length; ++r)
      s = n[r], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = e[i], typeof t == "function")
    this.removeListener(i, t);
  else if (t !== void 0)
    for (r = t.length - 1; r >= 0; r--)
      this.removeListener(i, t[r]);
  return this;
};
function wn(i, t, e) {
  var r = i._events;
  if (r === void 0)
    return [];
  var n = r[t];
  return n === void 0 ? [] : typeof n == "function" ? e ? [n.listener || n] : [n] : e ? Iu(n) : Ss(n, n.length);
}
X.prototype.listeners = function(i) {
  return wn(this, i, !0);
}, X.prototype.rawListeners = function(i) {
  return wn(this, i, !1);
}, X.listenerCount = function(i, t) {
  return typeof i.listenerCount == "function" ? i.listenerCount(t) : bn.call(i, t);
}, X.prototype.listenerCount = bn;
function bn(i) {
  var t = this._events;
  if (t !== void 0) {
    var e = t[i];
    if (typeof e == "function")
      return 1;
    if (e !== void 0)
      return e.length;
  }
  return 0;
}
X.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ar(this._events) : [];
};
function Ss(i, t) {
  for (var e = new Array(t), r = 0; r < t; ++r)
    e[r] = i[r];
  return e;
}
function Eu(i, t) {
  for (; t + 1 < i.length; t++)
    i[t] = i[t + 1];
  i.pop();
}
function Iu(i) {
  for (var t = new Array(i.length), e = 0; e < t.length; ++e)
    t[e] = i[e].listener || i[e];
  return t;
}
function Ru(i, t) {
  return new Promise(function(e, r) {
    function n(u) {
      i.removeListener(t, s), r(u);
    }
    function s() {
      typeof i.removeListener == "function" && i.removeListener("error", n), e([].slice.call(arguments));
    }
    As(i, t, s, { once: !0 }), t !== "error" && Nu(i, n, { once: !0 });
  });
}
function Nu(i, t, e) {
  typeof i.on == "function" && As(i, "error", t, e);
}
function As(i, t, e, r) {
  if (typeof i.on == "function")
    r.once ? i.once(t, e) : i.on(t, e);
  else if (typeof i.addEventListener == "function")
    i.addEventListener(t, function n(s) {
      r.once && i.removeEventListener(t, n), e(s);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof i);
}
const Fu = "wc", Du = 2, Es = "Web3Wallet", Uu = `${Fu}@2:${Es}:`, ku = { database: ":memory:" }, Bu = "request";
class zu extends Fr.exports {
  constructor() {
    super();
  }
}
class Pu {
  constructor(t) {
    this.opts = t;
  }
}
class qu {
  constructor(t) {
    this.client = t;
  }
}
class Ou extends qu {
  constructor(t) {
    super(t), this.init = async () => {
      this.signClient = await Mu.init({ core: this.client.core, metadata: this.client.metadata }), this.authClient = await au.init({ core: this.client.core, projectId: "", metadata: this.client.metadata }), this.initializeEventListeners();
    }, this.pair = async (e) => {
      await this.client.core.pairing.pair(e);
    }, this.approveSession = async (e) => {
      const { topic: r, acknowledged: n } = await this.signClient.approve({ id: e.id, namespaces: e.namespaces });
      return await n(), this.signClient.session.get(r);
    }, this.rejectSession = async (e) => await this.signClient.reject(e), this.updateSession = async (e) => await (await this.signClient.update(e)).acknowledged(), this.extendSession = async (e) => await (await this.signClient.extend(e)).acknowledged(), this.respondSessionRequest = async (e) => await this.signClient.respond(e), this.disconnectSession = async (e) => await this.signClient.disconnect(e), this.emitSessionEvent = async (e) => await this.signClient.emit(e), this.getActiveSessions = () => this.signClient.session.getAll().reduce((e, r) => (e[r.topic] = r, e), {}), this.getPendingSessionProposals = () => this.signClient.proposal.getAll(), this.getPendingSessionRequests = () => this.signClient.getPendingSessionRequests(), this.respondAuthRequest = async (e, r) => await this.authClient.respond(e, r), this.getPendingAuthRequests = () => this.authClient.requests.getAll().filter((e) => "requester" in e), this.formatMessage = (e, r) => this.authClient.formatMessage(e, r), this.onSessionRequest = (e) => {
      this.client.events.emit("session_request", e);
    }, this.onSessionProposal = (e) => {
      this.client.events.emit("session_proposal", e);
    }, this.onSessionDelete = (e) => {
      this.client.events.emit("session_delete", e);
    }, this.onAuthRequest = (e) => {
      this.client.events.emit("auth_request", e);
    }, this.initializeEventListeners = () => {
      this.signClient.events.on("session_proposal", this.onSessionProposal), this.signClient.events.on("session_request", this.onSessionRequest), this.signClient.events.on("session_delete", this.onSessionDelete), this.authClient.on("auth_request", this.onAuthRequest);
    }, this.signClient = {}, this.authClient = {};
  }
}
class qi extends Pu {
  constructor(t) {
    super(t), this.events = new Fr.exports(), this.on = (e, r) => this.events.on(e, r), this.once = (e, r) => this.events.once(e, r), this.off = (e, r) => this.events.off(e, r), this.removeListener = (e, r) => this.events.removeListener(e, r), this.pair = async (e) => {
      try {
        return await this.engine.pair(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.approveSession = async (e) => {
      try {
        return await this.engine.approveSession(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.rejectSession = async (e) => {
      try {
        return await this.engine.rejectSession(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.updateSession = async (e) => {
      try {
        return await this.engine.updateSession(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.extendSession = async (e) => {
      try {
        return await this.engine.extendSession(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.respondSessionRequest = async (e) => {
      try {
        return await this.engine.respondSessionRequest(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.disconnectSession = async (e) => {
      try {
        return await this.engine.disconnectSession(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.emitSessionEvent = async (e) => {
      try {
        return await this.engine.emitSessionEvent(e);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.getActiveSessions = () => {
      try {
        return this.engine.getActiveSessions();
      } catch (e) {
        throw this.logger.error(e.message), e;
      }
    }, this.getPendingSessionProposals = () => {
      try {
        return this.engine.getPendingSessionProposals();
      } catch (e) {
        throw this.logger.error(e.message), e;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (e) {
        throw this.logger.error(e.message), e;
      }
    }, this.respondAuthRequest = async (e, r) => {
      try {
        return await this.engine.respondAuthRequest(e, r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.getPendingAuthRequests = () => {
      try {
        return this.engine.getPendingAuthRequests();
      } catch (e) {
        throw this.logger.error(e.message), e;
      }
    }, this.formatMessage = (e, r) => {
      try {
        return this.engine.formatMessage(e, r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.metadata = t.metadata, this.name = t.name || Es, this.core = t.core, this.logger = this.core.logger, this.engine = new Ou(this);
  }
  static async init(t) {
    const e = new qi(t);
    return await e.initialize(), e;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.engine.init(), this.logger.info("Web3Wallet Initialization Success");
    } catch (t) {
      throw this.logger.info("Web3Wallet Initialization Failure"), this.logger.error(t.message), t;
    }
  }
}
const Vu = qi;
export {
  Es as CLIENT_CONTEXT,
  ku as CLIENT_STORAGE_OPTIONS,
  Uu as CLIENT_STORAGE_PREFIX,
  Pu as IWeb3Wallet,
  qu as IWeb3WalletEngine,
  zu as IWeb3WalletEvents,
  Fu as PROTOCOL,
  Du as PROTOCOL_VERSION,
  Bu as REQUEST_CONTEXT,
  Vu as Web3Wallet,
  qi as default
};

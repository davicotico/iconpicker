var Ln = Object.defineProperty;
var Dn = (t, e, n) => e in t ? Ln(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var g = (t, e, n) => (Dn(t, typeof e != "symbol" ? e + "" : e, n), n);
/**! 
IconPicker 1.0.2 | Vanilla Javascript Icon Picker (made with Typescript)
@author David Tomas Ticona Saravia (https://davidticona.com)
@version 1.0.2
@license MIT
*/
class Cn {
  constructor() {
    g(this, "eventTarget", new EventTarget());
  }
  on(e, n) {
    this.eventTarget.addEventListener(e, (r) => {
      n(r.detail);
    });
  }
  emit(e, n) {
    const r = new CustomEvent(e, {
      detail: n
    });
    this.eventTarget.dispatchEvent(r);
  }
}
const Sn = {
  ENTER: "Enter",
  ESCAPE: "Escape"
}, Nn = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 21" style="width: 16px; height: 21.6px; vertical-align: middle;"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>', Pe = {
  inputPlaceholder: "Search...",
  iconButtonClass: "ip-icon-button",
  selectedIconButtonClass: "ip-selected-icon-button",
  navButtonClass: "ip-nav-button",
  inputClass: "ip-input-search",
  arrowPrevIconClass: "",
  arrowNextIconClass: "",
  templateFooter: "[{start} - {end}] of {total}",
  placement: "right",
  popoverTheme: "dark"
};
function ye(t, e = "") {
  const n = document.createElement("button");
  return n.className = e, typeof t == "string" ? (n.innerHTML = t, n) : (n.append(t), n);
}
function ue(t) {
  const e = document.createElement("i");
  return e.className = t, e;
}
function Ut(t, e) {
  let n = document.createElement("div");
  return n.style.width = e, n.className = t, n;
}
function In(t) {
  let e = ue("");
  e.style.display = "inline-block", t.append(e);
  let n = document.createElement("span");
  return n.innerHTML = Nn, n.style.marginLeft = "10px", t.append(n), t;
}
function Rt(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
class Pn {
  constructor(e) {
    g(this, "container");
    g(this, "template");
    this.container = Ut("ip-footer", "100%"), this.container.style.marginTop = "8px", this.container.style.marginBottom = "8px", this.container.style.textAlign = "center", this.template = e;
  }
  update(e, n, r, o) {
    let a = e * n + 1, u = a - 1 + r;
    this.container.innerHTML = this.interpolate(this.template, a, u, o);
  }
  interpolate(e, n, r, o) {
    var a = { "{start}": n, "{end}": r, "{total}": o }, u = new RegExp(Object.keys(a).join("|"), "gi");
    return e.replace(u, (c) => a[c].toString());
  }
  getElement() {
    return this.container;
  }
}
class jn {
  constructor(e, n, r) {
    g(this, "container");
    g(this, "buttonClass", "");
    g(this, "selectedButtonClass", "");
    g(this, "selected", "");
    g(this, "iconButtonEvent");
    g(this, "currentGroup", []);
    this.container = Ut("icon-button-group", "100%"), this.container.style.display = "grid", this.container.style.gridTemplateColumns = "repeat(auto-fit, minmax(40px, 1fr))", this.container.style.gap = "8px", this.buttonClass = n, this.selectedButtonClass = r, this.iconButtonEvent = e;
  }
  setSelected(e) {
    this.selected = e;
  }
  updateIconButtons(e) {
    this.currentGroup = e, e.forEach((n) => {
      let r = n == this.selected ? this.selectedButtonClass : this.buttonClass, o = ye(ue(n), r);
      o.addEventListener("click", () => {
        this.iconButtonEvent.emit("select", { icon: n, button: o });
      }), this.container.append(o);
    });
  }
  refresh() {
    Rt(this.container), this.updateIconButtons(this.currentGroup);
  }
  getElement() {
    return this.container;
  }
}
class Mn {
  constructor(e, n) {
    g(this, "items");
    g(this, "totalItems");
    g(this, "sizeGroup");
    g(this, "groups", []);
    g(this, "totalGroups", 0);
    g(this, "index", 0);
    this.sizeGroup = n, this.items = e, this.totalItems = this.items.length, this.groups = this.creatGroups(this.items, this.sizeGroup), this.totalGroups = this.groups.length;
  }
  previous() {
    return this.isFirst() ? this.groups[0] : (this.index--, this.groups[this.index]);
  }
  next() {
    return this.isLast() ? this.groups[this.totalGroups - 1] : (this.index++, this.groups[this.index]);
  }
  first() {
    return this.index = 0, this.groups[this.index];
  }
  last() {
    return this.index = this.groups.length - 1, this.groups[this.index];
  }
  isFirst() {
    return this.index == 0;
  }
  isLast() {
    return this.index + 1 >= this.totalGroups;
  }
  hasPrevious() {
    return this.index - 1 >= 0;
  }
  hasNext() {
    return this.index + 1 < this.totalGroups;
  }
  getIndex() {
    return this.index;
  }
  getTotalItems() {
    return this.totalItems;
  }
  getTotalGroups() {
    return this.totalGroups;
  }
  creatGroups(e, n) {
    return e.reduce((r, o, a) => {
      const u = Math.floor(a / n);
      return r[u] || (r[u] = []), r[u].push(o), r;
    }, []);
  }
  search(e) {
    let n = this.items.filter((r) => r.indexOf(e) >= 0);
    return this.groups = this.creatGroups(n, this.sizeGroup), this.totalGroups = this.groups.length, n.length;
  }
  goTo(e) {
    return e >= 0 && e < this.groups.length ? (this.index = e, this.groups[this.index]) : [];
  }
  getGroupIndex(e) {
    for (let n = 0; n < this.groups.length; n++)
      for (let r = 0; r < this.groups[n].length; r++)
        if (this.groups[n][r] === e)
          return n;
    return -1;
  }
  getAllItems() {
    return this.items;
  }
}
class Rn {
  constructor(e, n) {
    g(this, "container");
    g(this, "input");
    this.container = Ut("ip-search", "100%"), this.container.style.marginTop = "8px", this.container.style.marginBottom = "8px", this.input = document.createElement("input"), this.input.type = "text", this.input.style.boxSizing = "border-box", this.input.style.width = "100%", this.input.className = e, this.input.placeholder = n;
  }
  getInput() {
    return this.input;
  }
  mount() {
    this.container.append(this.input);
  }
  getElement() {
    return this.container;
  }
}
class kn {
  constructor(e, n, r) {
    g(this, "container");
    g(this, "label");
    g(this, "navButtons");
    this.container = Ut("action-buttons", "100%"), this.container.style.display = "flex", this.container.style.marginBottom = "8px", this.label = document.createElement("div"), this.label.style.flexGrow = "1", this.label.style.display = "flex", this.label.style.justifyContent = "center", this.label.style.alignItems = "center", this.navButtons = {
      previous: ye(ue(n), e),
      next: ye(ue(r), e)
    };
  }
  setupNavLabel(e, n) {
    this.updateNavLabel(e, n);
  }
  updateNavButtons(e, n, r, o) {
    r.disabled = e, o.disabled = n;
  }
  updateNavLabel(e, n) {
    this.label.innerHTML = `${e + 1} / ${n}`;
  }
  getButtons() {
    return this.navButtons;
  }
  getLabel() {
    return this.label;
  }
  mount() {
    this.container.append(this.getButtons().previous), this.container.append(this.getLabel()), this.container.append(this.getButtons().next);
  }
  getElement() {
    return this.container;
  }
}
var H = "top", Y = "bottom", X = "right", W = "left", Te = "auto", zt = [H, Y, X, W], At = "start", Ht = "end", Vn = "clippingParents", Ze = "viewport", Mt = "popper", $n = "reference", je = /* @__PURE__ */ zt.reduce(function(t, e) {
  return t.concat([e + "-" + At, e + "-" + Ht]);
}, []), tn = /* @__PURE__ */ [].concat(zt, [Te]).reduce(function(t, e) {
  return t.concat([e, e + "-" + At, e + "-" + Ht]);
}, []), Hn = "beforeRead", Wn = "read", Gn = "afterRead", Fn = "beforeMain", Un = "main", zn = "afterMain", qn = "beforeWrite", _n = "write", Yn = "afterWrite", Xn = [Hn, Wn, Gn, Fn, Un, zn, qn, _n, Yn];
function nt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function z(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function yt(t) {
  var e = z(t).Element;
  return t instanceof e || t instanceof Element;
}
function _(t) {
  var e = z(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Be(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = z(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Kn(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !_(a) || !nt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(u) {
      var c = o[u];
      c === !1 ? a.removeAttribute(u) : a.setAttribute(u, c === !0 ? "" : c);
    }));
  });
}
function Jn(t) {
  var e = t.state, n = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var o = e.elements[r], a = e.attributes[r] || {}, u = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), c = u.reduce(function(p, f) {
        return p[f] = "", p;
      }, {});
      !_(o) || !nt(o) || (Object.assign(o.style, c), Object.keys(a).forEach(function(p) {
        o.removeAttribute(p);
      }));
    });
  };
}
const en = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Kn,
  effect: Jn,
  requires: ["computeStyles"]
};
function et(t) {
  return t.split("-")[0];
}
var gt = Math.max, pe = Math.min, Lt = Math.round;
function be() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function nn() {
  return !/^((?!chrome|android).)*safari/i.test(be());
}
function Dt(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && _(t) && (o = t.offsetWidth > 0 && Lt(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Lt(r.height) / t.offsetHeight || 1);
  var u = yt(t) ? z(t) : window, c = u.visualViewport, p = !nn() && n, f = (r.left + (p && c ? c.offsetLeft : 0)) / o, l = (r.top + (p && c ? c.offsetTop : 0)) / a, w = r.width / o, O = r.height / a;
  return {
    width: w,
    height: O,
    top: l,
    right: f + w,
    bottom: l + O,
    left: f,
    x: f,
    y: l
  };
}
function Ae(t) {
  var e = Dt(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function rn(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Be(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ut(t) {
  return z(t).getComputedStyle(t);
}
function Qn(t) {
  return ["table", "td", "th"].indexOf(nt(t)) >= 0;
}
function lt(t) {
  return ((yt(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function le(t) {
  return nt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Be(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    lt(t)
  );
}
function Me(t) {
  return !_(t) || // https://github.com/popperjs/popper-core/issues/837
  ut(t).position === "fixed" ? null : t.offsetParent;
}
function Zn(t) {
  var e = /firefox/i.test(be()), n = /Trident/i.test(be());
  if (n && _(t)) {
    var r = ut(t);
    if (r.position === "fixed")
      return null;
  }
  var o = le(t);
  for (Be(o) && (o = o.host); _(o) && ["html", "body"].indexOf(nt(o)) < 0; ) {
    var a = ut(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function qt(t) {
  for (var e = z(t), n = Me(t); n && Qn(n) && ut(n).position === "static"; )
    n = Me(n);
  return n && (nt(n) === "html" || nt(n) === "body" && ut(n).position === "static") ? e : n || Zn(t) || e;
}
function Le(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function kt(t, e, n) {
  return gt(t, pe(e, n));
}
function tr(t, e, n) {
  var r = kt(t, e, n);
  return r > n ? n : r;
}
function on() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function an(t) {
  return Object.assign({}, on(), t);
}
function sn(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var er = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, an(typeof e != "number" ? e : sn(e, zt));
};
function nr(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, u = n.modifiersData.popperOffsets, c = et(n.placement), p = Le(c), f = [W, X].indexOf(c) >= 0, l = f ? "height" : "width";
  if (!(!a || !u)) {
    var w = er(o.padding, n), O = Ae(a), m = p === "y" ? H : W, x = p === "y" ? Y : X, y = n.rects.reference[l] + n.rects.reference[p] - u[p] - n.rects.popper[l], b = u[p] - n.rects.reference[p], B = qt(a), L = B ? p === "y" ? B.clientHeight || 0 : B.clientWidth || 0 : 0, C = y / 2 - b / 2, i = w[m], T = L - O[l] - w[x], d = L / 2 - O[l] / 2 + C, D = kt(i, d, T), j = p;
    n.modifiersData[r] = (e = {}, e[j] = D, e.centerOffset = D - d, e);
  }
}
function rr(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || rn(e.elements.popper, o) && (e.elements.arrow = o));
}
const ir = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: nr,
  effect: rr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ct(t) {
  return t.split("-")[1];
}
var or = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ar(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Lt(n * o) / o || 0,
    y: Lt(r * o) / o || 0
  };
}
function Re(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, u = t.offsets, c = t.position, p = t.gpuAcceleration, f = t.adaptive, l = t.roundOffsets, w = t.isFixed, O = u.x, m = O === void 0 ? 0 : O, x = u.y, y = x === void 0 ? 0 : x, b = typeof l == "function" ? l({
    x: m,
    y
  }) : {
    x: m,
    y
  };
  m = b.x, y = b.y;
  var B = u.hasOwnProperty("x"), L = u.hasOwnProperty("y"), C = W, i = H, T = window;
  if (f) {
    var d = qt(n), D = "clientHeight", j = "clientWidth";
    if (d === z(n) && (d = lt(n), ut(d).position !== "static" && c === "absolute" && (D = "scrollHeight", j = "scrollWidth")), d = d, o === H || (o === W || o === X) && a === Ht) {
      i = Y;
      var P = w && d === T && T.visualViewport ? T.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        d[D]
      );
      y -= P - r.height, y *= p ? 1 : -1;
    }
    if (o === W || (o === H || o === Y) && a === Ht) {
      C = X;
      var N = w && d === T && T.visualViewport ? T.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        d[j]
      );
      m -= N - r.width, m *= p ? 1 : -1;
    }
  }
  var M = Object.assign({
    position: c
  }, f && or), I = l === !0 ? ar({
    x: m,
    y
  }, z(n)) : {
    x: m,
    y
  };
  if (m = I.x, y = I.y, p) {
    var S;
    return Object.assign({}, M, (S = {}, S[i] = L ? "0" : "", S[C] = B ? "0" : "", S.transform = (T.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + y + "px)" : "translate3d(" + m + "px, " + y + "px, 0)", S));
  }
  return Object.assign({}, M, (e = {}, e[i] = L ? y + "px" : "", e[C] = B ? m + "px" : "", e.transform = "", e));
}
function sr(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, u = a === void 0 ? !0 : a, c = n.roundOffsets, p = c === void 0 ? !0 : c, f = {
    placement: et(e.placement),
    variation: Ct(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Re(Object.assign({}, f, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: u,
    roundOffsets: p
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Re(Object.assign({}, f, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: p
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const ur = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: sr,
  data: {}
};
var oe = {
  passive: !0
};
function pr(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, u = r.resize, c = u === void 0 ? !0 : u, p = z(e.elements.popper), f = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && f.forEach(function(l) {
    l.addEventListener("scroll", n.update, oe);
  }), c && p.addEventListener("resize", n.update, oe), function() {
    a && f.forEach(function(l) {
      l.removeEventListener("scroll", n.update, oe);
    }), c && p.removeEventListener("resize", n.update, oe);
  };
}
const cr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: pr,
  data: {}
};
var lr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function se(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return lr[e];
  });
}
var fr = {
  start: "end",
  end: "start"
};
function ke(t) {
  return t.replace(/start|end/g, function(e) {
    return fr[e];
  });
}
function De(t) {
  var e = z(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Ce(t) {
  return Dt(lt(t)).left + De(t).scrollLeft;
}
function dr(t, e) {
  var n = z(t), r = lt(t), o = n.visualViewport, a = r.clientWidth, u = r.clientHeight, c = 0, p = 0;
  if (o) {
    a = o.width, u = o.height;
    var f = nn();
    (f || !f && e === "fixed") && (c = o.offsetLeft, p = o.offsetTop);
  }
  return {
    width: a,
    height: u,
    x: c + Ce(t),
    y: p
  };
}
function vr(t) {
  var e, n = lt(t), r = De(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = gt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), u = gt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), c = -r.scrollLeft + Ce(t), p = -r.scrollTop;
  return ut(o || n).direction === "rtl" && (c += gt(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: u,
    x: c,
    y: p
  };
}
function Se(t) {
  var e = ut(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function un(t) {
  return ["html", "body", "#document"].indexOf(nt(t)) >= 0 ? t.ownerDocument.body : _(t) && Se(t) ? t : un(le(t));
}
function Vt(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = un(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = z(r), u = o ? [a].concat(a.visualViewport || [], Se(r) ? r : []) : r, c = e.concat(u);
  return o ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(Vt(le(u)))
  );
}
function we(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function hr(t, e) {
  var n = Dt(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ve(t, e, n) {
  return e === Ze ? we(dr(t, n)) : yt(e) ? hr(e, n) : we(vr(lt(t)));
}
function mr(t) {
  var e = Vt(le(t)), n = ["absolute", "fixed"].indexOf(ut(t).position) >= 0, r = n && _(t) ? qt(t) : t;
  return yt(r) ? e.filter(function(o) {
    return yt(o) && rn(o, r) && nt(o) !== "body";
  }) : [];
}
function gr(t, e, n, r) {
  var o = e === "clippingParents" ? mr(t) : [].concat(e), a = [].concat(o, [n]), u = a[0], c = a.reduce(function(p, f) {
    var l = Ve(t, f, r);
    return p.top = gt(l.top, p.top), p.right = pe(l.right, p.right), p.bottom = pe(l.bottom, p.bottom), p.left = gt(l.left, p.left), p;
  }, Ve(t, u, r));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function pn(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? et(r) : null, a = r ? Ct(r) : null, u = e.x + e.width / 2 - n.width / 2, c = e.y + e.height / 2 - n.height / 2, p;
  switch (o) {
    case H:
      p = {
        x: u,
        y: e.y - n.height
      };
      break;
    case Y:
      p = {
        x: u,
        y: e.y + e.height
      };
      break;
    case X:
      p = {
        x: e.x + e.width,
        y: c
      };
      break;
    case W:
      p = {
        x: e.x - n.width,
        y: c
      };
      break;
    default:
      p = {
        x: e.x,
        y: e.y
      };
  }
  var f = o ? Le(o) : null;
  if (f != null) {
    var l = f === "y" ? "height" : "width";
    switch (a) {
      case At:
        p[f] = p[f] - (e[l] / 2 - n[l] / 2);
        break;
      case Ht:
        p[f] = p[f] + (e[l] / 2 - n[l] / 2);
        break;
    }
  }
  return p;
}
function Wt(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, u = a === void 0 ? t.strategy : a, c = n.boundary, p = c === void 0 ? Vn : c, f = n.rootBoundary, l = f === void 0 ? Ze : f, w = n.elementContext, O = w === void 0 ? Mt : w, m = n.altBoundary, x = m === void 0 ? !1 : m, y = n.padding, b = y === void 0 ? 0 : y, B = an(typeof b != "number" ? b : sn(b, zt)), L = O === Mt ? $n : Mt, C = t.rects.popper, i = t.elements[x ? L : O], T = gr(yt(i) ? i : i.contextElement || lt(t.elements.popper), p, l, u), d = Dt(t.elements.reference), D = pn({
    reference: d,
    element: C,
    strategy: "absolute",
    placement: o
  }), j = we(Object.assign({}, C, D)), P = O === Mt ? j : d, N = {
    top: T.top - P.top + B.top,
    bottom: P.bottom - T.bottom + B.bottom,
    left: T.left - P.left + B.left,
    right: P.right - T.right + B.right
  }, M = t.modifiersData.offset;
  if (O === Mt && M) {
    var I = M[o];
    Object.keys(N).forEach(function(S) {
      var G = [X, Y].indexOf(S) >= 0 ? 1 : -1, F = [H, Y].indexOf(S) >= 0 ? "y" : "x";
      N[S] += I[F] * G;
    });
  }
  return N;
}
function yr(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, u = n.padding, c = n.flipVariations, p = n.allowedAutoPlacements, f = p === void 0 ? tn : p, l = Ct(r), w = l ? c ? je : je.filter(function(x) {
    return Ct(x) === l;
  }) : zt, O = w.filter(function(x) {
    return f.indexOf(x) >= 0;
  });
  O.length === 0 && (O = w);
  var m = O.reduce(function(x, y) {
    return x[y] = Wt(t, {
      placement: y,
      boundary: o,
      rootBoundary: a,
      padding: u
    })[et(y)], x;
  }, {});
  return Object.keys(m).sort(function(x, y) {
    return m[x] - m[y];
  });
}
function br(t) {
  if (et(t) === Te)
    return [];
  var e = se(t);
  return [ke(t), e, ke(e)];
}
function wr(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, u = n.altAxis, c = u === void 0 ? !0 : u, p = n.fallbackPlacements, f = n.padding, l = n.boundary, w = n.rootBoundary, O = n.altBoundary, m = n.flipVariations, x = m === void 0 ? !0 : m, y = n.allowedAutoPlacements, b = e.options.placement, B = et(b), L = B === b, C = p || (L || !x ? [se(b)] : br(b)), i = [b].concat(C).reduce(function(rt, K) {
      return rt.concat(et(K) === Te ? yr(e, {
        placement: K,
        boundary: l,
        rootBoundary: w,
        padding: f,
        flipVariations: x,
        allowedAutoPlacements: y
      }) : K);
    }, []), T = e.rects.reference, d = e.rects.popper, D = /* @__PURE__ */ new Map(), j = !0, P = i[0], N = 0; N < i.length; N++) {
      var M = i[N], I = et(M), S = Ct(M) === At, G = [H, Y].indexOf(I) >= 0, F = G ? "width" : "height", k = Wt(e, {
        placement: M,
        boundary: l,
        rootBoundary: w,
        altBoundary: O,
        padding: f
      }), V = G ? S ? X : W : S ? Y : H;
      T[F] > d[F] && (V = se(V));
      var R = se(V), J = [];
      if (a && J.push(k[I] <= 0), c && J.push(k[V] <= 0, k[R] <= 0), J.every(function(rt) {
        return rt;
      })) {
        P = M, j = !1;
        break;
      }
      D.set(M, J);
    }
    if (j)
      for (var Q = x ? 3 : 1, ft = function(K) {
        var it = i.find(function(bt) {
          var ot = D.get(bt);
          if (ot)
            return ot.slice(0, K).every(function(wt) {
              return wt;
            });
        });
        if (it)
          return P = it, "break";
      }, Z = Q; Z > 0; Z--) {
        var dt = ft(Z);
        if (dt === "break")
          break;
      }
    e.placement !== P && (e.modifiersData[r]._skip = !0, e.placement = P, e.reset = !0);
  }
}
const xr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: wr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function $e(t, e, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - n.y,
    right: t.right - e.width + n.x,
    bottom: t.bottom - e.height + n.y,
    left: t.left - e.width - n.x
  };
}
function He(t) {
  return [H, X, Y, W].some(function(e) {
    return t[e] >= 0;
  });
}
function Er(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, u = Wt(e, {
    elementContext: "reference"
  }), c = Wt(e, {
    altBoundary: !0
  }), p = $e(u, r), f = $e(c, o, a), l = He(p), w = He(f);
  e.modifiersData[n] = {
    referenceClippingOffsets: p,
    popperEscapeOffsets: f,
    isReferenceHidden: l,
    hasPopperEscaped: w
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": w
  });
}
const Or = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Er
};
function Tr(t, e, n) {
  var r = et(t), o = [W, H].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, u = a[0], c = a[1];
  return u = u || 0, c = (c || 0) * o, [W, X].indexOf(r) >= 0 ? {
    x: c,
    y: u
  } : {
    x: u,
    y: c
  };
}
function Br(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, u = tn.reduce(function(l, w) {
    return l[w] = Tr(w, e.rects, a), l;
  }, {}), c = u[e.placement], p = c.x, f = c.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += p, e.modifiersData.popperOffsets.y += f), e.modifiersData[r] = u;
}
const Ar = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Br
};
function Lr(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = pn({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Dr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Lr,
  data: {}
};
function Cr(t) {
  return t === "x" ? "y" : "x";
}
function Sr(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, u = n.altAxis, c = u === void 0 ? !1 : u, p = n.boundary, f = n.rootBoundary, l = n.altBoundary, w = n.padding, O = n.tether, m = O === void 0 ? !0 : O, x = n.tetherOffset, y = x === void 0 ? 0 : x, b = Wt(e, {
    boundary: p,
    rootBoundary: f,
    padding: w,
    altBoundary: l
  }), B = et(e.placement), L = Ct(e.placement), C = !L, i = Le(B), T = Cr(i), d = e.modifiersData.popperOffsets, D = e.rects.reference, j = e.rects.popper, P = typeof y == "function" ? y(Object.assign({}, e.rects, {
    placement: e.placement
  })) : y, N = typeof P == "number" ? {
    mainAxis: P,
    altAxis: P
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, P), M = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, I = {
    x: 0,
    y: 0
  };
  if (d) {
    if (a) {
      var S, G = i === "y" ? H : W, F = i === "y" ? Y : X, k = i === "y" ? "height" : "width", V = d[i], R = V + b[G], J = V - b[F], Q = m ? -j[k] / 2 : 0, ft = L === At ? D[k] : j[k], Z = L === At ? -j[k] : -D[k], dt = e.elements.arrow, rt = m && dt ? Ae(dt) : {
        width: 0,
        height: 0
      }, K = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : on(), it = K[G], bt = K[F], ot = kt(0, D[k], rt[k]), wt = C ? D[k] / 2 - Q - ot - it - N.mainAxis : ft - ot - it - N.mainAxis, pt = C ? -D[k] / 2 + Q + ot + bt + N.mainAxis : Z + ot + bt + N.mainAxis, xt = e.elements.arrow && qt(e.elements.arrow), Yt = xt ? i === "y" ? xt.clientTop || 0 : xt.clientLeft || 0 : 0, St = (S = M == null ? void 0 : M[i]) != null ? S : 0, Xt = V + wt - St - Yt, Kt = V + pt - St, Nt = kt(m ? pe(R, Xt) : R, V, m ? gt(J, Kt) : J);
      d[i] = Nt, I[i] = Nt - V;
    }
    if (c) {
      var It, Jt = i === "x" ? H : W, Qt = i === "x" ? Y : X, at = d[T], ct = T === "y" ? "height" : "width", Pt = at + b[Jt], vt = at - b[Qt], jt = [H, W].indexOf(B) !== -1, Zt = (It = M == null ? void 0 : M[T]) != null ? It : 0, te = jt ? Pt : at - D[ct] - j[ct] - Zt + N.altAxis, ee = jt ? at + D[ct] + j[ct] - Zt - N.altAxis : vt, ne = m && jt ? tr(te, at, ee) : kt(m ? te : Pt, at, m ? ee : vt);
      d[T] = ne, I[T] = ne - at;
    }
    e.modifiersData[r] = I;
  }
}
const Nr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Sr,
  requiresIfExists: ["offset"]
};
function Ir(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Pr(t) {
  return t === z(t) || !_(t) ? De(t) : Ir(t);
}
function jr(t) {
  var e = t.getBoundingClientRect(), n = Lt(e.width) / t.offsetWidth || 1, r = Lt(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Mr(t, e, n) {
  n === void 0 && (n = !1);
  var r = _(e), o = _(e) && jr(e), a = lt(e), u = Dt(t, o, n), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, p = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((nt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Se(a)) && (c = Pr(e)), _(e) ? (p = Dt(e, !0), p.x += e.clientLeft, p.y += e.clientTop) : a && (p.x = Ce(a))), {
    x: u.left + c.scrollLeft - p.x,
    y: u.top + c.scrollTop - p.y,
    width: u.width,
    height: u.height
  };
}
function Rr(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var u = [].concat(a.requires || [], a.requiresIfExists || []);
    u.forEach(function(c) {
      if (!n.has(c)) {
        var p = e.get(c);
        p && o(p);
      }
    }), r.push(a);
  }
  return t.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function kr(t) {
  var e = Rr(t);
  return Xn.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Vr(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function $r(t) {
  var e = t.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}
var We = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ge() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Hr(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? We : o;
  return function(c, p, f) {
    f === void 0 && (f = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, We, a),
      modifiersData: {},
      elements: {
        reference: c,
        popper: p
      },
      attributes: {},
      styles: {}
    }, w = [], O = !1, m = {
      state: l,
      setOptions: function(B) {
        var L = typeof B == "function" ? B(l.options) : B;
        y(), l.options = Object.assign({}, a, l.options, L), l.scrollParents = {
          reference: yt(c) ? Vt(c) : c.contextElement ? Vt(c.contextElement) : [],
          popper: Vt(p)
        };
        var C = kr($r([].concat(r, l.options.modifiers)));
        return l.orderedModifiers = C.filter(function(i) {
          return i.enabled;
        }), x(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!O) {
          var B = l.elements, L = B.reference, C = B.popper;
          if (Ge(L, C)) {
            l.rects = {
              reference: Mr(L, qt(C), l.options.strategy === "fixed"),
              popper: Ae(C)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(N) {
              return l.modifiersData[N.name] = Object.assign({}, N.data);
            });
            for (var i = 0; i < l.orderedModifiers.length; i++) {
              if (l.reset === !0) {
                l.reset = !1, i = -1;
                continue;
              }
              var T = l.orderedModifiers[i], d = T.fn, D = T.options, j = D === void 0 ? {} : D, P = T.name;
              typeof d == "function" && (l = d({
                state: l,
                options: j,
                name: P,
                instance: m
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Vr(function() {
        return new Promise(function(b) {
          m.forceUpdate(), b(l);
        });
      }),
      destroy: function() {
        y(), O = !0;
      }
    };
    if (!Ge(c, p))
      return m;
    m.setOptions(f).then(function(b) {
      !O && f.onFirstUpdate && f.onFirstUpdate(b);
    });
    function x() {
      l.orderedModifiers.forEach(function(b) {
        var B = b.name, L = b.options, C = L === void 0 ? {} : L, i = b.effect;
        if (typeof i == "function") {
          var T = i({
            state: l,
            name: B,
            instance: m,
            options: C
          }), d = function() {
          };
          w.push(T || d);
        }
      });
    }
    function y() {
      w.forEach(function(b) {
        return b();
      }), w = [];
    }
    return m;
  };
}
var Wr = [cr, Dr, ur, en, Ar, xr, Nr, ir, Or], Gr = /* @__PURE__ */ Hr({
  defaultModifiers: Wr
}), Fr = "tippy-box", cn = "tippy-content", Ur = "tippy-backdrop", ln = "tippy-arrow", fn = "tippy-svg-arrow", mt = {
  passive: !0,
  capture: !0
}, dn = function() {
  return document.body;
};
function zr(t, e) {
  return {}.hasOwnProperty.call(t, e);
}
function ve(t, e, n) {
  if (Array.isArray(t)) {
    var r = t[e];
    return r ?? (Array.isArray(n) ? n[e] : n);
  }
  return t;
}
function Ne(t, e) {
  var n = {}.toString.call(t);
  return n.indexOf("[object") === 0 && n.indexOf(e + "]") > -1;
}
function vn(t, e) {
  return typeof t == "function" ? t.apply(void 0, e) : t;
}
function Fe(t, e) {
  if (e === 0)
    return t;
  var n;
  return function(r) {
    clearTimeout(n), n = setTimeout(function() {
      t(r);
    }, e);
  };
}
function qr(t, e) {
  var n = Object.assign({}, t);
  return e.forEach(function(r) {
    delete n[r];
  }), n;
}
function _r(t) {
  return t.split(/\s+/).filter(Boolean);
}
function Bt(t) {
  return [].concat(t);
}
function Ue(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Yr(t) {
  return t.filter(function(e, n) {
    return t.indexOf(e) === n;
  });
}
function Xr(t) {
  return t.split("-")[0];
}
function ce(t) {
  return [].slice.call(t);
}
function ze(t) {
  return Object.keys(t).reduce(function(e, n) {
    return t[n] !== void 0 && (e[n] = t[n]), e;
  }, {});
}
function $t() {
  return document.createElement("div");
}
function Gt(t) {
  return ["Element", "Fragment"].some(function(e) {
    return Ne(t, e);
  });
}
function Kr(t) {
  return Ne(t, "NodeList");
}
function Jr(t) {
  return Ne(t, "MouseEvent");
}
function Qr(t) {
  return !!(t && t._tippy && t._tippy.reference === t);
}
function Zr(t) {
  return Gt(t) ? [t] : Kr(t) ? ce(t) : Array.isArray(t) ? t : ce(document.querySelectorAll(t));
}
function he(t, e) {
  t.forEach(function(n) {
    n && (n.style.transitionDuration = e + "ms");
  });
}
function qe(t, e) {
  t.forEach(function(n) {
    n && n.setAttribute("data-state", e);
  });
}
function ti(t) {
  var e, n = Bt(t), r = n[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function ei(t, e) {
  var n = e.clientX, r = e.clientY;
  return t.every(function(o) {
    var a = o.popperRect, u = o.popperState, c = o.props, p = c.interactiveBorder, f = Xr(u.placement), l = u.modifiersData.offset;
    if (!l)
      return !0;
    var w = f === "bottom" ? l.top.y : 0, O = f === "top" ? l.bottom.y : 0, m = f === "right" ? l.left.x : 0, x = f === "left" ? l.right.x : 0, y = a.top - r + w > p, b = r - a.bottom - O > p, B = a.left - n + m > p, L = n - a.right - x > p;
    return y || b || B || L;
  });
}
function me(t, e, n) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(o) {
    t[r](o, n);
  });
}
function _e(t, e) {
  for (var n = e; n; ) {
    var r;
    if (t.contains(n))
      return !0;
    n = n.getRootNode == null || (r = n.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var tt = {
  isTouch: !1
}, Ye = 0;
function ni() {
  tt.isTouch || (tt.isTouch = !0, window.performance && document.addEventListener("mousemove", hn));
}
function hn() {
  var t = performance.now();
  t - Ye < 20 && (tt.isTouch = !1, document.removeEventListener("mousemove", hn)), Ye = t;
}
function ri() {
  var t = document.activeElement;
  if (Qr(t)) {
    var e = t._tippy;
    t.blur && !e.state.isVisible && t.blur();
  }
}
function ii() {
  document.addEventListener("touchstart", ni, mt), window.addEventListener("blur", ri);
}
var oi = typeof window < "u" && typeof document < "u", ai = oi ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function Tt(t) {
  var e = t === "destroy" ? "n already-" : " ";
  return [t + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function Xe(t) {
  var e = /[ \t]{2,}/g, n = /^[ \t]*/gm;
  return t.replace(e, " ").replace(n, "").trim();
}
function si(t) {
  return Xe(`
  %ctippy.js

  %c` + Xe(t) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function mn(t) {
  return [
    si(t),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var Ft;
process.env.NODE_ENV !== "production" && ui();
function ui() {
  Ft = /* @__PURE__ */ new Set();
}
function st(t, e) {
  if (t && !Ft.has(e)) {
    var n;
    Ft.add(e), (n = console).warn.apply(n, mn(e));
  }
}
function xe(t, e) {
  if (t && !Ft.has(e)) {
    var n;
    Ft.add(e), (n = console).error.apply(n, mn(e));
  }
}
function pi(t) {
  var e = !t, n = Object.prototype.toString.call(t) === "[object Object]" && !t.addEventListener;
  xe(e, ["tippy() was passed", "`" + String(t) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), xe(n, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var gn = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, ci = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, U = Object.assign({
  appendTo: dn,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, gn, ci), li = Object.keys(U), fi = function(e) {
  process.env.NODE_ENV !== "production" && bn(e, []);
  var n = Object.keys(e);
  n.forEach(function(r) {
    U[r] = e[r];
  });
};
function yn(t) {
  var e = t.plugins || [], n = e.reduce(function(r, o) {
    var a = o.name, u = o.defaultValue;
    if (a) {
      var c;
      r[a] = t[a] !== void 0 ? t[a] : (c = U[a]) != null ? c : u;
    }
    return r;
  }, {});
  return Object.assign({}, t, n);
}
function di(t, e) {
  var n = e ? Object.keys(yn(Object.assign({}, U, {
    plugins: e
  }))) : li, r = n.reduce(function(o, a) {
    var u = (t.getAttribute("data-tippy-" + a) || "").trim();
    if (!u)
      return o;
    if (a === "content")
      o[a] = u;
    else
      try {
        o[a] = JSON.parse(u);
      } catch {
        o[a] = u;
      }
    return o;
  }, {});
  return r;
}
function Ke(t, e) {
  var n = Object.assign({}, e, {
    content: vn(e.content, [t])
  }, e.ignoreAttributes ? {} : di(t, e.plugins));
  return n.aria = Object.assign({}, U.aria, n.aria), n.aria = {
    expanded: n.aria.expanded === "auto" ? e.interactive : n.aria.expanded,
    content: n.aria.content === "auto" ? e.interactive ? null : "describedby" : n.aria.content
  }, n;
}
function bn(t, e) {
  t === void 0 && (t = {}), e === void 0 && (e = []);
  var n = Object.keys(t);
  n.forEach(function(r) {
    var o = qr(U, Object.keys(gn)), a = !zr(o, r);
    a && (a = e.filter(function(u) {
      return u.name === r;
    }).length === 0), st(a, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var vi = function() {
  return "innerHTML";
};
function Ee(t, e) {
  t[vi()] = e;
}
function Je(t) {
  var e = $t();
  return t === !0 ? e.className = ln : (e.className = fn, Gt(t) ? e.appendChild(t) : Ee(e, t)), e;
}
function Qe(t, e) {
  Gt(e.content) ? (Ee(t, ""), t.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? Ee(t, e.content) : t.textContent = e.content);
}
function Oe(t) {
  var e = t.firstElementChild, n = ce(e.children);
  return {
    box: e,
    content: n.find(function(r) {
      return r.classList.contains(cn);
    }),
    arrow: n.find(function(r) {
      return r.classList.contains(ln) || r.classList.contains(fn);
    }),
    backdrop: n.find(function(r) {
      return r.classList.contains(Ur);
    })
  };
}
function wn(t) {
  var e = $t(), n = $t();
  n.className = Fr, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
  var r = $t();
  r.className = cn, r.setAttribute("data-state", "hidden"), Qe(r, t.props), e.appendChild(n), n.appendChild(r), o(t.props, t.props);
  function o(a, u) {
    var c = Oe(e), p = c.box, f = c.content, l = c.arrow;
    u.theme ? p.setAttribute("data-theme", u.theme) : p.removeAttribute("data-theme"), typeof u.animation == "string" ? p.setAttribute("data-animation", u.animation) : p.removeAttribute("data-animation"), u.inertia ? p.setAttribute("data-inertia", "") : p.removeAttribute("data-inertia"), p.style.maxWidth = typeof u.maxWidth == "number" ? u.maxWidth + "px" : u.maxWidth, u.role ? p.setAttribute("role", u.role) : p.removeAttribute("role"), (a.content !== u.content || a.allowHTML !== u.allowHTML) && Qe(f, t.props), u.arrow ? l ? a.arrow !== u.arrow && (p.removeChild(l), p.appendChild(Je(u.arrow))) : p.appendChild(Je(u.arrow)) : l && p.removeChild(l);
  }
  return {
    popper: e,
    onUpdate: o
  };
}
wn.$$tippy = !0;
var hi = 1, ae = [], ge = [];
function mi(t, e) {
  var n = Ke(t, Object.assign({}, U, yn(ze(e)))), r, o, a, u = !1, c = !1, p = !1, f = !1, l, w, O, m = [], x = Fe(Xt, n.interactiveDebounce), y, b = hi++, B = null, L = Yr(n.plugins), C = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, i = {
    // properties
    id: b,
    reference: t,
    popper: $t(),
    popperInstance: B,
    props: n,
    state: C,
    plugins: L,
    // methods
    clearDelayTimeouts: te,
    setProps: ee,
    setContent: ne,
    show: xn,
    hide: En,
    hideWithInteractivity: On,
    enable: jt,
    disable: Zt,
    unmount: Tn,
    destroy: Bn
  };
  if (!n.render)
    return process.env.NODE_ENV !== "production" && xe(!0, "render() function has not been supplied."), i;
  var T = n.render(i), d = T.popper, D = T.onUpdate;
  d.setAttribute("data-tippy-root", ""), d.id = "tippy-" + i.id, i.popper = d, t._tippy = i, d._tippy = i;
  var j = L.map(function(s) {
    return s.fn(i);
  }), P = t.hasAttribute("aria-expanded");
  return xt(), Q(), V(), R("onCreate", [i]), n.showOnCreate && Pt(), d.addEventListener("mouseenter", function() {
    i.props.interactive && i.state.isVisible && i.clearDelayTimeouts();
  }), d.addEventListener("mouseleave", function() {
    i.props.interactive && i.props.trigger.indexOf("mouseenter") >= 0 && G().addEventListener("mousemove", x);
  }), i;
  function N() {
    var s = i.props.touch;
    return Array.isArray(s) ? s : [s, 0];
  }
  function M() {
    return N()[0] === "hold";
  }
  function I() {
    var s;
    return !!((s = i.props.render) != null && s.$$tippy);
  }
  function S() {
    return y || t;
  }
  function G() {
    var s = S().parentNode;
    return s ? ti(s) : document;
  }
  function F() {
    return Oe(d);
  }
  function k(s) {
    return i.state.isMounted && !i.state.isVisible || tt.isTouch || l && l.type === "focus" ? 0 : ve(i.props.delay, s ? 0 : 1, U.delay);
  }
  function V(s) {
    s === void 0 && (s = !1), d.style.pointerEvents = i.props.interactive && !s ? "" : "none", d.style.zIndex = "" + i.props.zIndex;
  }
  function R(s, v, h) {
    if (h === void 0 && (h = !0), j.forEach(function(E) {
      E[s] && E[s].apply(E, v);
    }), h) {
      var A;
      (A = i.props)[s].apply(A, v);
    }
  }
  function J() {
    var s = i.props.aria;
    if (s.content) {
      var v = "aria-" + s.content, h = d.id, A = Bt(i.props.triggerTarget || t);
      A.forEach(function(E) {
        var $ = E.getAttribute(v);
        if (i.state.isVisible)
          E.setAttribute(v, $ ? $ + " " + h : h);
        else {
          var q = $ && $.replace(h, "").trim();
          q ? E.setAttribute(v, q) : E.removeAttribute(v);
        }
      });
    }
  }
  function Q() {
    if (!(P || !i.props.aria.expanded)) {
      var s = Bt(i.props.triggerTarget || t);
      s.forEach(function(v) {
        i.props.interactive ? v.setAttribute("aria-expanded", i.state.isVisible && v === S() ? "true" : "false") : v.removeAttribute("aria-expanded");
      });
    }
  }
  function ft() {
    G().removeEventListener("mousemove", x), ae = ae.filter(function(s) {
      return s !== x;
    });
  }
  function Z(s) {
    if (!(tt.isTouch && (p || s.type === "mousedown"))) {
      var v = s.composedPath && s.composedPath()[0] || s.target;
      if (!(i.props.interactive && _e(d, v))) {
        if (Bt(i.props.triggerTarget || t).some(function(h) {
          return _e(h, v);
        })) {
          if (tt.isTouch || i.state.isVisible && i.props.trigger.indexOf("click") >= 0)
            return;
        } else
          R("onClickOutside", [i, s]);
        i.props.hideOnClick === !0 && (i.clearDelayTimeouts(), i.hide(), c = !0, setTimeout(function() {
          c = !1;
        }), i.state.isMounted || it());
      }
    }
  }
  function dt() {
    p = !0;
  }
  function rt() {
    p = !1;
  }
  function K() {
    var s = G();
    s.addEventListener("mousedown", Z, !0), s.addEventListener("touchend", Z, mt), s.addEventListener("touchstart", rt, mt), s.addEventListener("touchmove", dt, mt);
  }
  function it() {
    var s = G();
    s.removeEventListener("mousedown", Z, !0), s.removeEventListener("touchend", Z, mt), s.removeEventListener("touchstart", rt, mt), s.removeEventListener("touchmove", dt, mt);
  }
  function bt(s, v) {
    wt(s, function() {
      !i.state.isVisible && d.parentNode && d.parentNode.contains(d) && v();
    });
  }
  function ot(s, v) {
    wt(s, v);
  }
  function wt(s, v) {
    var h = F().box;
    function A(E) {
      E.target === h && (me(h, "remove", A), v());
    }
    if (s === 0)
      return v();
    me(h, "remove", w), me(h, "add", A), w = A;
  }
  function pt(s, v, h) {
    h === void 0 && (h = !1);
    var A = Bt(i.props.triggerTarget || t);
    A.forEach(function(E) {
      E.addEventListener(s, v, h), m.push({
        node: E,
        eventType: s,
        handler: v,
        options: h
      });
    });
  }
  function xt() {
    M() && (pt("touchstart", St, {
      passive: !0
    }), pt("touchend", Kt, {
      passive: !0
    })), _r(i.props.trigger).forEach(function(s) {
      if (s !== "manual")
        switch (pt(s, St), s) {
          case "mouseenter":
            pt("mouseleave", Kt);
            break;
          case "focus":
            pt(ai ? "focusout" : "blur", Nt);
            break;
          case "focusin":
            pt("focusout", Nt);
            break;
        }
    });
  }
  function Yt() {
    m.forEach(function(s) {
      var v = s.node, h = s.eventType, A = s.handler, E = s.options;
      v.removeEventListener(h, A, E);
    }), m = [];
  }
  function St(s) {
    var v, h = !1;
    if (!(!i.state.isEnabled || It(s) || c)) {
      var A = ((v = l) == null ? void 0 : v.type) === "focus";
      l = s, y = s.currentTarget, Q(), !i.state.isVisible && Jr(s) && ae.forEach(function(E) {
        return E(s);
      }), s.type === "click" && (i.props.trigger.indexOf("mouseenter") < 0 || u) && i.props.hideOnClick !== !1 && i.state.isVisible ? h = !0 : Pt(s), s.type === "click" && (u = !h), h && !A && vt(s);
    }
  }
  function Xt(s) {
    var v = s.target, h = S().contains(v) || d.contains(v);
    if (!(s.type === "mousemove" && h)) {
      var A = ct().concat(d).map(function(E) {
        var $, q = E._tippy, Et = ($ = q.popperInstance) == null ? void 0 : $.state;
        return Et ? {
          popperRect: E.getBoundingClientRect(),
          popperState: Et,
          props: n
        } : null;
      }).filter(Boolean);
      ei(A, s) && (ft(), vt(s));
    }
  }
  function Kt(s) {
    var v = It(s) || i.props.trigger.indexOf("click") >= 0 && u;
    if (!v) {
      if (i.props.interactive) {
        i.hideWithInteractivity(s);
        return;
      }
      vt(s);
    }
  }
  function Nt(s) {
    i.props.trigger.indexOf("focusin") < 0 && s.target !== S() || i.props.interactive && s.relatedTarget && d.contains(s.relatedTarget) || vt(s);
  }
  function It(s) {
    return tt.isTouch ? M() !== s.type.indexOf("touch") >= 0 : !1;
  }
  function Jt() {
    Qt();
    var s = i.props, v = s.popperOptions, h = s.placement, A = s.offset, E = s.getReferenceClientRect, $ = s.moveTransition, q = I() ? Oe(d).arrow : null, Et = E ? {
      getBoundingClientRect: E,
      contextElement: E.contextElement || S()
    } : t, Ie = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(re) {
        var Ot = re.state;
        if (I()) {
          var An = F(), de = An.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(ie) {
            ie === "placement" ? de.setAttribute("data-placement", Ot.placement) : Ot.attributes.popper["data-popper-" + ie] ? de.setAttribute("data-" + ie, "") : de.removeAttribute("data-" + ie);
          }), Ot.attributes.popper = {};
        }
      }
    }, ht = [{
      name: "offset",
      options: {
        offset: A
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !$
      }
    }, Ie];
    I() && q && ht.push({
      name: "arrow",
      options: {
        element: q,
        padding: 3
      }
    }), ht.push.apply(ht, (v == null ? void 0 : v.modifiers) || []), i.popperInstance = Gr(Et, d, Object.assign({}, v, {
      placement: h,
      onFirstUpdate: O,
      modifiers: ht
    }));
  }
  function Qt() {
    i.popperInstance && (i.popperInstance.destroy(), i.popperInstance = null);
  }
  function at() {
    var s = i.props.appendTo, v, h = S();
    i.props.interactive && s === dn || s === "parent" ? v = h.parentNode : v = vn(s, [h]), v.contains(d) || v.appendChild(d), i.state.isMounted = !0, Jt(), process.env.NODE_ENV !== "production" && st(i.props.interactive && s === U.appendTo && h.nextElementSibling !== d, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function ct() {
    return ce(d.querySelectorAll("[data-tippy-root]"));
  }
  function Pt(s) {
    i.clearDelayTimeouts(), s && R("onTrigger", [i, s]), K();
    var v = k(!0), h = N(), A = h[0], E = h[1];
    tt.isTouch && A === "hold" && E && (v = E), v ? r = setTimeout(function() {
      i.show();
    }, v) : i.show();
  }
  function vt(s) {
    if (i.clearDelayTimeouts(), R("onUntrigger", [i, s]), !i.state.isVisible) {
      it();
      return;
    }
    if (!(i.props.trigger.indexOf("mouseenter") >= 0 && i.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(s.type) >= 0 && u)) {
      var v = k(!1);
      v ? o = setTimeout(function() {
        i.state.isVisible && i.hide();
      }, v) : a = requestAnimationFrame(function() {
        i.hide();
      });
    }
  }
  function jt() {
    i.state.isEnabled = !0;
  }
  function Zt() {
    i.hide(), i.state.isEnabled = !1;
  }
  function te() {
    clearTimeout(r), clearTimeout(o), cancelAnimationFrame(a);
  }
  function ee(s) {
    if (process.env.NODE_ENV !== "production" && st(i.state.isDestroyed, Tt("setProps")), !i.state.isDestroyed) {
      R("onBeforeUpdate", [i, s]), Yt();
      var v = i.props, h = Ke(t, Object.assign({}, v, ze(s), {
        ignoreAttributes: !0
      }));
      i.props = h, xt(), v.interactiveDebounce !== h.interactiveDebounce && (ft(), x = Fe(Xt, h.interactiveDebounce)), v.triggerTarget && !h.triggerTarget ? Bt(v.triggerTarget).forEach(function(A) {
        A.removeAttribute("aria-expanded");
      }) : h.triggerTarget && t.removeAttribute("aria-expanded"), Q(), V(), D && D(v, h), i.popperInstance && (Jt(), ct().forEach(function(A) {
        requestAnimationFrame(A._tippy.popperInstance.forceUpdate);
      })), R("onAfterUpdate", [i, s]);
    }
  }
  function ne(s) {
    i.setProps({
      content: s
    });
  }
  function xn() {
    process.env.NODE_ENV !== "production" && st(i.state.isDestroyed, Tt("show"));
    var s = i.state.isVisible, v = i.state.isDestroyed, h = !i.state.isEnabled, A = tt.isTouch && !i.props.touch, E = ve(i.props.duration, 0, U.duration);
    if (!(s || v || h || A) && !S().hasAttribute("disabled") && (R("onShow", [i], !1), i.props.onShow(i) !== !1)) {
      if (i.state.isVisible = !0, I() && (d.style.visibility = "visible"), V(), K(), i.state.isMounted || (d.style.transition = "none"), I()) {
        var $ = F(), q = $.box, Et = $.content;
        he([q, Et], 0);
      }
      O = function() {
        var ht;
        if (!(!i.state.isVisible || f)) {
          if (f = !0, d.offsetHeight, d.style.transition = i.props.moveTransition, I() && i.props.animation) {
            var fe = F(), re = fe.box, Ot = fe.content;
            he([re, Ot], E), qe([re, Ot], "visible");
          }
          J(), Q(), Ue(ge, i), (ht = i.popperInstance) == null || ht.forceUpdate(), R("onMount", [i]), i.props.animation && I() && ot(E, function() {
            i.state.isShown = !0, R("onShown", [i]);
          });
        }
      }, at();
    }
  }
  function En() {
    process.env.NODE_ENV !== "production" && st(i.state.isDestroyed, Tt("hide"));
    var s = !i.state.isVisible, v = i.state.isDestroyed, h = !i.state.isEnabled, A = ve(i.props.duration, 1, U.duration);
    if (!(s || v || h) && (R("onHide", [i], !1), i.props.onHide(i) !== !1)) {
      if (i.state.isVisible = !1, i.state.isShown = !1, f = !1, u = !1, I() && (d.style.visibility = "hidden"), ft(), it(), V(!0), I()) {
        var E = F(), $ = E.box, q = E.content;
        i.props.animation && (he([$, q], A), qe([$, q], "hidden"));
      }
      J(), Q(), i.props.animation ? I() && bt(A, i.unmount) : i.unmount();
    }
  }
  function On(s) {
    process.env.NODE_ENV !== "production" && st(i.state.isDestroyed, Tt("hideWithInteractivity")), G().addEventListener("mousemove", x), Ue(ae, x), x(s);
  }
  function Tn() {
    process.env.NODE_ENV !== "production" && st(i.state.isDestroyed, Tt("unmount")), i.state.isVisible && i.hide(), i.state.isMounted && (Qt(), ct().forEach(function(s) {
      s._tippy.unmount();
    }), d.parentNode && d.parentNode.removeChild(d), ge = ge.filter(function(s) {
      return s !== i;
    }), i.state.isMounted = !1, R("onHidden", [i]));
  }
  function Bn() {
    process.env.NODE_ENV !== "production" && st(i.state.isDestroyed, Tt("destroy")), !i.state.isDestroyed && (i.clearDelayTimeouts(), i.unmount(), Yt(), delete t._tippy, i.state.isDestroyed = !0, R("onDestroy", [i]));
  }
}
function _t(t, e) {
  e === void 0 && (e = {});
  var n = U.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (pi(t), bn(e, n)), ii();
  var r = Object.assign({}, e, {
    plugins: n
  }), o = Zr(t);
  if (process.env.NODE_ENV !== "production") {
    var a = Gt(r.content), u = o.length > 1;
    st(a && u, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var c = o.reduce(function(p, f) {
    var l = f && mi(f, r);
    return l && p.push(l), p;
  }, []);
  return Gt(t) ? c[0] : c;
}
_t.defaultProps = U;
_t.setDefaultProps = fi;
_t.currentInput = tt;
Object.assign({}, en, {
  effect: function(e) {
    var n = e.state, r = {
      popper: {
        position: n.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(n.elements.popper.style, r.popper), n.styles = r, n.elements.arrow && Object.assign(n.elements.arrow.style, r.arrow);
  }
});
_t.setDefaultProps({
  render: wn
});
class gi {
  constructor(e, n, r = "bottom", o = "dark") {
    g(this, "instance");
    this.instance = _t(n, {
      content: e,
      appendTo: document.body,
      interactive: !0,
      trigger: "click",
      placement: r,
      animation: "scale",
      theme: o,
      onShown() {
        var u;
        const a = e.getElementsByTagName("input");
        a.length > 0 && ((u = a.item(0)) == null || u.focus());
      }
    });
  }
  hide() {
    this.instance.hide();
  }
  setTheme(e) {
    this.instance.setProps({
      theme: e
    });
  }
}
class bi {
  constructor(e, n, r = 20, o = Pe) {
    g(this, "iconset");
    g(this, "container");
    g(this, "inputSearch");
    g(this, "iconButtonGroup");
    g(this, "footer");
    g(this, "navBar");
    g(this, "groupList");
    g(this, "iconButtonEvent", new Cn());
    g(this, "options");
    g(this, "totalResult", 0);
    g(this, "groupSize");
    g(this, "isButton", !1);
    g(this, "button", null);
    g(this, "popover", null);
    g(this, "selected", "");
    let a = document.getElementById(e);
    if (a == null)
      throw Error("Element does not exists");
    switch (a.tagName) {
      case "DIV":
        this.container = a;
        break;
      case "BUTTON":
        let u = r % 5 == 0 ? "250px" : "200px";
        this.container = Ut(e + "-ip-container", u), this.isButton = !0, this.button = In(a);
        break;
      default:
        throw Error("Element it is not a div or button");
    }
    this.iconset = n, this.options = { ...Pe, ...o }, this.groupSize = r, this.groupList = new Mn(this.iconset, this.groupSize), this.totalResult = this.groupList.getTotalItems(), this.inputSearch = new Rn(this.options.inputClass, this.options.inputPlaceholder), this.navBar = new kn(this.options.navButtonClass, this.options.arrowPrevIconClass, this.options.arrowNextIconClass), this.iconButtonGroup = new jn(this.iconButtonEvent, this.options.iconButtonClass, this.options.selectedIconButtonClass), this.footer = new Pn(this.options.templateFooter), this.onChange((u) => {
      var c;
      if (this.iconButtonGroup.setSelected(u.icon), this.iconButtonGroup.refresh(), this.isButton) {
        let p = (c = this.button) == null ? void 0 : c.getElementsByTagName("i").item(0);
        p.className = u.icon;
      }
    });
  }
  onChange(e) {
    this.iconButtonEvent.on("select", e);
  }
  setSelected(e) {
    let n = this.groupList.getGroupIndex(e);
    if (n >= 0) {
      this.iconButtonGroup.setSelected(e);
      let r = this.groupList.goTo(n);
      Rt(this.iconButtonGroup.getElement()), this.updateElements(this.groupList, r, this.totalResult, this.navBar.getButtons());
    }
  }
  setupInputSearch() {
    var e;
    this.inputSearch.getInput().addEventListener("keyup", (n) => {
      var r;
      if (n.key == Sn.ESCAPE && this.isButton) {
        (r = this.popover) == null || r.hide();
        return;
      }
      if (this.totalResult = this.groupList.search(this.inputSearch.getInput().value), Rt(this.iconButtonGroup.getElement()), this.totalResult > 0) {
        let o = this.groupList.first();
        this.iconButtonGroup.updateIconButtons(o), this.navBar.updateNavLabel(this.groupList.getIndex(), this.groupList.getTotalGroups()), this.navBar.updateNavButtons(this.groupList.isFirst(), this.groupList.isLast(), this.navBar.getButtons().previous, this.navBar.getButtons().next), this.footer.update(this.groupList.getIndex(), this.groupSize, o.length, this.totalResult);
      } else
        this.navBar.updateNavLabel(-1, 0), this.navBar.updateNavButtons(!0, !0, this.navBar.getButtons().previous, this.navBar.getButtons().next), this.footer.getElement().innerHTML = `'${this.inputSearch.getInput().value}' is not found`;
    }), this.inputSearch.mount(), (e = this.container) == null || e.append(this.inputSearch.getElement());
  }
  setupNavButtons() {
    let e = this.groupList.getTotalGroups();
    this.navBar.setupNavLabel(this.groupList.getIndex(), e), this.navBar.updateNavButtons(this.groupList.isFirst(), this.groupList.isLast(), this.navBar.getButtons().previous, this.navBar.getButtons().next), this.navBar.getButtons().next.addEventListener("click", () => {
      Rt(this.iconButtonGroup.getElement());
      let n = this.groupList.next();
      this.updateElements(this.groupList, n, this.totalResult, this.navBar.getButtons());
    }), this.navBar.getButtons().previous.addEventListener("click", () => {
      Rt(this.iconButtonGroup.getElement());
      let n = this.groupList.previous();
      this.updateElements(this.groupList, n, this.totalResult, this.navBar.getButtons());
    }), this.navBar.mount(), this.container.append(this.navBar.getElement());
  }
  updateElements(e, n, r, o) {
    this.navBar.updateNavLabel(e.getIndex(), e.getTotalGroups()), this.iconButtonGroup.updateIconButtons(n), this.navBar.updateNavButtons(e.isFirst(), e.isLast(), o.previous, o.next), this.footer.update(this.groupList.getIndex(), this.groupSize, n.length, r);
  }
  setPopoverTheme(e) {
    var n;
    this.isButton && ((n = this.popover) == null || n.setTheme(e));
  }
  mount() {
    let e = this.groupList.first();
    this.iconButtonGroup.updateIconButtons(e), this.setupInputSearch(), this.setupNavButtons(), this.container.append(this.iconButtonGroup.getElement()), this.footer.update(this.groupList.getIndex(), this.groupSize, e.length, this.groupList.getTotalItems()), this.container.append(this.footer.getElement()), this.isButton && (this.popover = new gi(this.container, this.button, this.options.placement, this.options.popoverTheme), this.iconButtonEvent.on("select", () => {
      var n;
      (n = this.popover) == null || n.hide();
    }));
  }
}
export {
  bi as IconPicker
};

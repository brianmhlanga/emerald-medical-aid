globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.at(-1) === '"' && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode$1(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode$1(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol ? parsed.protocol + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    // @ts-ignore
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode !== void 0) {
      node = nextNode;
    } else {
      node = node.placeholderChildNode;
      if (node !== null) {
        params[node.paramName] = section;
        paramsFound = true;
      } else {
        break;
      }
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildNode = childNode;
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      node = childNode;
    }
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections[sections.length - 1];
    node.data = null;
    if (Object.keys(node.children).length === 0) {
      const parentNode = node.parent;
      parentNode.children.delete(lastSection);
      parentNode.wildcardChildNode = null;
      parentNode.placeholderChildNode = null;
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildNode: null
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table);
}
function _createMatcher(table) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table) {
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path.startsWith(key)) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        table.static.set(path, node.data);
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$1(this, "statusCode", 500);
    __publicField$1(this, "fatal", false);
    __publicField$1(this, "unhandled", false);
    __publicField$1(this, "statusMessage");
    __publicField$1(this, "data");
    __publicField$1(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$1(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function isMethod(event, expected, allowHead) {
  if (allowHead && event.method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  return event.web?.request?.body || event._requestBody || new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  const cookieStr = serialize(name, value, {
    path: "/",
    ...serializeOptions
  });
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && !cookieValue.startsWith(name + "=");
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    return Object.assign(handler, { __is_handler__: true });
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  return Object.assign(_handler, { __is_handler__: true });
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler = r.default || r;
        if (typeof handler !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler
          );
        }
        _resolved = toEventHandler(r.default || r);
        return _resolved;
      });
    }
    return _promise;
  };
  return eventHandler((event) => {
    if (_resolved) {
      return _resolved(event);
    }
    return resolveHandler().then((handler) => handler(event));
  });
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const app = {
    // @ts-ignore
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    handler,
    stack,
    options
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(
      normalizeLayer({ ...arg2, route: "/", handler: arg1 })
    );
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  router.handler = eventHandler((event) => {
    let path = event.path || "/";
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      if (opts.preemptive || opts.preemtive) {
        throw createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${event.path || "/"}.`
        });
      } else {
        return;
      }
    }
    const method = (event.node.req.method || "get").toLowerCase();
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      if (opts.preemptive || opts.preemtive) {
        throw createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        });
      } else {
        return;
      }
    }
    event.context.matchedRoute = matched;
    const params = matched.params || {};
    event.context.params = params;
    return Promise.resolve(handler(event)).then((res) => {
      if (res === void 0 && (opts.preemptive || opts.preemtive)) {
        return null;
      }
      return res;
    });
  });
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
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
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1,
          timeout: context.options.timeout
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char.toUpperCase() === char;
}
function splitByCase(str, separators) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "b59533b8-fff3-4663-bb15-84ab35cf2f07"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {},
  "DATABASE_URL": "mysql://root:@localhost:3306/emerald?schema=public",
  "JWT_TOKEN_SECRET": "SIL32532543Sprofml",
  "EMAIL_HOST": "smtp.gmail.com",
  "EMAIL_SERVICE": "Gmail",
  "FORMS_URL": "http://emeraldforms.devpreview.net/",
  "EMAIL_PORT": "465",
  "EMAIL_USER": "brian@webdev.co.zw",
  "EMAIL_PASS": "wthq wzhl ukwd wioa",
  "EMAIL_RECEIVER": "brianmhlanga9@gmail.com"
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
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
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          await asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\user\\Documents\\GitHub\\emerald-medical-aid\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/favicon.png": {
    "type": "image/png",
    "etag": "\"547-quR1O4wfCsrroHjZuQ3z6MDSC+0\"",
    "mtime": "2024-01-10T09:46:38.655Z",
    "size": 1351,
    "path": "../public/favicon.png"
  },
  "/upload.php": {
    "type": "application/x-httpd-php",
    "etag": "\"2c-a4kNgm1fZvBJfS8i1bQB92q3bIs\"",
    "mtime": "2023-07-20T08:27:27.709Z",
    "size": 44,
    "path": "../public/upload.php"
  },
  "/css/authentication.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e53-S93Z/wiKf2oq8WpDjT85OgBDiDc\"",
    "mtime": "2023-07-20T08:27:26.922Z",
    "size": 7763,
    "path": "../public/css/authentication.css"
  },
  "/css/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f897-7C2KIU7Oz8nubyeKpaHV8xZVJpQ\"",
    "mtime": "2023-07-20T08:27:26.924Z",
    "size": 194711,
    "path": "../public/css/bootstrap.min.css"
  },
  "/css/bootstrap.min.css.map": {
    "type": "application/json",
    "etag": "\"7f4f3-UHhISfMsziJT5hxfR7h3F5mGg4Q\"",
    "mtime": "2023-07-20T08:27:26.927Z",
    "size": 521459,
    "path": "../public/css/bootstrap.min.css.map"
  },
  "/css/buttons.bootstrap4.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2329-LTYOnU1TRP78l3umE1Kn2tSixJk\"",
    "mtime": "2023-07-20T08:27:26.931Z",
    "size": 9001,
    "path": "../public/css/buttons.bootstrap4.min.css"
  },
  "/css/dataTables.bootstrap4.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2aa5-t2GIwAJJIu1syaRWosZeFQBIOiw\"",
    "mtime": "2023-07-20T08:27:26.931Z",
    "size": 10917,
    "path": "../public/css/dataTables.bootstrap4.min.css"
  },
  "/css/keyTable.dataTables.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fb-79MkqOnTg8FU2loWpUB/BySxg0A\"",
    "mtime": "2023-07-20T08:27:26.931Z",
    "size": 251,
    "path": "../public/css/keyTable.dataTables.min.css"
  },
  "/css/lineicons.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7219-woo+sKDgBM01uFS1MKyPq3RfQwU\"",
    "mtime": "2023-07-20T08:27:26.931Z",
    "size": 29209,
    "path": "../public/css/lineicons.css"
  },
  "/css/main.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1641b-Dwpkz2L25+tEW+rtuzW6Sndas2I\"",
    "mtime": "2023-07-20T08:27:26.931Z",
    "size": 91163,
    "path": "../public/css/main.css"
  },
  "/css/prime.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"64284-1ij4iMhVr6rqI4813wp7zPWQ5ck\"",
    "mtime": "2024-01-11T09:02:53.462Z",
    "size": 410244,
    "path": "../public/css/prime.css"
  },
  "/css/primeblocks.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"63fa3-Mwxnp1wI2/plC3pk7IGxFW3l/ow\"",
    "mtime": "2023-09-20T09:56:27.153Z",
    "size": 409507,
    "path": "../public/css/primeblocks.css"
  },
  "/css/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2ec9d-bZ0aIy+6IFJJqpHzl3aDnDNv9OE\"",
    "mtime": "2023-10-09T08:36:34.825Z",
    "size": 191645,
    "path": "../public/css/theme.css"
  },
  "/data/countries.json": {
    "type": "application/json",
    "etag": "\"2e78-9KotS6c/rzanjBYs0h918AXdl5Y\"",
    "mtime": "2023-07-20T08:27:26.931Z",
    "size": 11896,
    "path": "../public/data/countries.json"
  },
  "/data/customers-large.json": {
    "type": "application/json",
    "etag": "\"15ea7-Hc7Ax6frpxy/zYvqJ0BMU7E7Idk\"",
    "mtime": "2023-07-20T08:27:26.939Z",
    "size": 89767,
    "path": "../public/data/customers-large.json"
  },
  "/data/customers-medium.json": {
    "type": "application/json",
    "etag": "\"48fa-UNSCGCWs6+0EStiIg05Dgs+qvy0\"",
    "mtime": "2023-07-20T08:27:26.940Z",
    "size": 18682,
    "path": "../public/data/customers-medium.json"
  },
  "/data/customers-small.json": {
    "type": "application/json",
    "etag": "\"eaa-jo9uajlc3NPtp2fHQSEf2CdcFFc\"",
    "mtime": "2023-07-20T08:27:26.941Z",
    "size": 3754,
    "path": "../public/data/customers-small.json"
  },
  "/data/customers-xlarge.json": {
    "type": "application/json",
    "etag": "\"2dd42-jK1Gj4tuWRLG9mozx1yH5tKD9zo\"",
    "mtime": "2023-07-20T08:27:26.943Z",
    "size": 187714,
    "path": "../public/data/customers-xlarge.json"
  },
  "/data/products-orders-small.json": {
    "type": "application/json",
    "etag": "\"2928-MM2fN6WX6ON3Z7qkOM5+pT5Poec\"",
    "mtime": "2023-07-20T08:27:26.943Z",
    "size": 10536,
    "path": "../public/data/products-orders-small.json"
  },
  "/data/products-orders.json": {
    "type": "application/json",
    "etag": "\"618b-ZssDLzpkCMN08h4wzVUfEER2kTg\"",
    "mtime": "2023-07-20T08:27:26.944Z",
    "size": 24971,
    "path": "../public/data/products-orders.json"
  },
  "/data/products-small.json": {
    "type": "application/json",
    "etag": "\"ae2-AYgSUwr/CwXhajpJhsst79ma5xE\"",
    "mtime": "2023-07-20T08:27:26.945Z",
    "size": 2786,
    "path": "../public/data/products-small.json"
  },
  "/data/products.json": {
    "type": "application/json",
    "etag": "\"2055-1G+o/bY4zu0Trzv1qo5Z3fR+q4Y\"",
    "mtime": "2023-07-20T08:27:26.945Z",
    "size": 8277,
    "path": "../public/data/products.json"
  },
  "/data/treenodes.json": {
    "type": "application/json",
    "etag": "\"9bc-7/qccWciEZN83dAIZz7+Tv0Zvk4\"",
    "mtime": "2023-07-20T08:27:26.946Z",
    "size": 2492,
    "path": "../public/data/treenodes.json"
  },
  "/data/treetablenodes.json": {
    "type": "application/json",
    "etag": "\"2b2b-Lu9MmEqtd7StKtEhJi70w2FxVvs\"",
    "mtime": "2023-07-20T08:27:26.947Z",
    "size": 11051,
    "path": "../public/data/treetablenodes.json"
  },
  "/fonts/LineIcons.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2208c-IkjAVSvr4ufL65IaJKQxblZB5Vs\"",
    "mtime": "2023-07-20T08:27:26.950Z",
    "size": 139404,
    "path": "../public/fonts/LineIcons.eot"
  },
  "/fonts/LineIcons.svg": {
    "type": "image/svg+xml",
    "etag": "\"914b7-aDocKW1Is94qD5UIwORzQHdYWI8\"",
    "mtime": "2023-07-20T08:27:26.952Z",
    "size": 595127,
    "path": "../public/fonts/LineIcons.svg"
  },
  "/fonts/LineIcons.ttf": {
    "type": "font/ttf",
    "etag": "\"21fe0-MzA6D83lAz0ff8EM99TmU4+xpBw\"",
    "mtime": "2023-07-20T08:27:26.958Z",
    "size": 139232,
    "path": "../public/fonts/LineIcons.ttf"
  },
  "/fonts/LineIcons.woff": {
    "type": "font/woff",
    "etag": "\"12a8c-5KHqknsOgrFsjhsqUA6X8t+ThlE\"",
    "mtime": "2023-07-20T08:27:26.962Z",
    "size": 76428,
    "path": "../public/fonts/LineIcons.woff"
  },
  "/fonts/LineIcons.woff2": {
    "type": "font/woff2",
    "etag": "\"f44c-jDGQDsGQDRGuuo2RJONUMr3uwW8\"",
    "mtime": "2023-07-20T08:27:26.964Z",
    "size": 62540,
    "path": "../public/fonts/LineIcons.woff2"
  },
  "/fonts/materialdesignicons-webfont.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"fa95c-6ehgxBKVuQrh1OSTYvzSxNh2cco\"",
    "mtime": "2023-07-20T08:27:26.974Z",
    "size": 1026396,
    "path": "../public/fonts/materialdesignicons-webfont.eot"
  },
  "/fonts/materialdesignicons-webfont.ttf": {
    "type": "font/ttf",
    "etag": "\"fa880-nkfshQEtwwStQS/6eMVMGW/xVqE\"",
    "mtime": "2023-07-20T08:27:26.990Z",
    "size": 1026176,
    "path": "../public/fonts/materialdesignicons-webfont.ttf"
  },
  "/fonts/materialdesignicons-webfont.woff": {
    "type": "font/woff",
    "etag": "\"71924-jzj1x+KrB1ZBtcEM3SXV+zN4+UU\"",
    "mtime": "2023-07-20T08:27:26.998Z",
    "size": 465188,
    "path": "../public/fonts/materialdesignicons-webfont.woff"
  },
  "/fonts/materialdesignicons-webfont.woff2": {
    "type": "font/woff2",
    "etag": "\"4f67c-W8lIr//mYzY5FU4CS/BHzz74EyY\"",
    "mtime": "2023-07-20T08:27:27.002Z",
    "size": 325244,
    "path": "../public/fonts/materialdesignicons-webfont.woff2"
  },
  "/images/at.png": {
    "type": "image/png",
    "etag": "\"28f4d-pwZ/dVmdQ+w2fC9TDyGcn8uzZ98\"",
    "mtime": "2023-07-20T08:27:27.006Z",
    "size": 167757,
    "path": "../public/images/at.png"
  },
  "/images/banner-primeblocks-dark.png": {
    "type": "image/png",
    "etag": "\"220e3-9Du96W7iHHFMJZLgqrWoXhNlYic\"",
    "mtime": "2023-07-20T08:27:27.031Z",
    "size": 139491,
    "path": "../public/images/banner-primeblocks-dark.png"
  },
  "/images/banner-primeblocks.png": {
    "type": "image/png",
    "etag": "\"2217b-3xz7kv/y8T4g0pus2z998rwVp/g\"",
    "mtime": "2023-07-20T08:27:27.034Z",
    "size": 139643,
    "path": "../public/images/banner-primeblocks.png"
  },
  "/images/civil.jpg": {
    "type": "image/jpeg",
    "etag": "\"9991-ON4nbVcwjdlt1JWn54wprrHBcwE\"",
    "mtime": "2024-01-22T08:19:39.775Z",
    "size": 39313,
    "path": "../public/images/civil.jpg"
  },
  "/images/favicon.ico.png": {
    "type": "image/png",
    "etag": "\"1a3-BEVlPAB43+2OkpFJJmD7GEZ14SQ\"",
    "mtime": "2023-07-20T08:27:27.041Z",
    "size": 419,
    "path": "../public/images/favicon.ico.png"
  },
  "/images/favicon.png": {
    "type": "image/png",
    "etag": "\"1a3-BEVlPAB43+2OkpFJJmD7GEZ14SQ\"",
    "mtime": "2023-07-20T08:27:27.042Z",
    "size": 419,
    "path": "../public/images/favicon.png"
  },
  "/images/favicon.svg": {
    "type": "image/svg+xml",
    "etag": "\"590-eAkzd6u6wl9sAS2gaXNV9vYMrsQ\"",
    "mtime": "2023-07-20T08:27:27.042Z",
    "size": 1424,
    "path": "../public/images/favicon.svg"
  },
  "/images/fml.png": {
    "type": "image/png",
    "etag": "\"147d-jcL4TdSDOEBH1ltxz6KYc1e/SMM\"",
    "mtime": "2023-09-05T07:34:53.806Z",
    "size": 5245,
    "path": "../public/images/fml.png"
  },
  "/images/group.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e2c99-4zsGbGzYen5itW+B/TfiTgo8wNs\"",
    "mtime": "2023-07-20T08:27:27.062Z",
    "size": 1977497,
    "path": "../public/images/group.jpg"
  },
  "/images/individuals.jpg": {
    "type": "image/jpeg",
    "etag": "\"416e3-D9DO6TQ0T9ZgQxNMF59Q3aPmv2o\"",
    "mtime": "2024-01-23T14:06:59.994Z",
    "size": 268003,
    "path": "../public/images/individuals.jpg"
  },
  "/images/little-girl-with-colorful-books-table.jpg": {
    "type": "image/jpeg",
    "etag": "\"575fda-6IFPzQvdTOdT/qUC9BxcHaf+brk\"",
    "mtime": "2024-01-11T08:04:36.231Z",
    "size": 5726170,
    "path": "../public/images/little-girl-with-colorful-books-table.jpg"
  },
  "/images/lms icon.png": {
    "type": "image/png",
    "etag": "\"5b48-Cm6cYO09u2tSfVEa1pXBeNUgRd0\"",
    "mtime": "2023-07-20T08:27:27.064Z",
    "size": 23368,
    "path": "../public/images/lms icon.png"
  },
  "/images/logo-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"54a-j/jMJyjI5fXBEw0e5SrYQRt6BTk\"",
    "mtime": "2023-07-20T08:27:27.065Z",
    "size": 1354,
    "path": "../public/images/logo-dark.svg"
  },
  "/images/logo-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"170f-vHBuKKEkV/BKkz0Y0Bw3f3Wwzyo\"",
    "mtime": "2023-07-20T08:27:27.067Z",
    "size": 5903,
    "path": "../public/images/logo-white.svg"
  },
  "/images/logo.png": {
    "type": "image/png",
    "etag": "\"14582-BIufuI2OtLMRdpOjojI9y9xwIR8\"",
    "mtime": "2024-01-22T08:06:22.038Z",
    "size": 83330,
    "path": "../public/images/logo.png"
  },
  "/images/oaceyhcm.png": {
    "type": "image/png",
    "etag": "\"9b9b-6zPCbOkDl2dM9cPfrNmzbcxU6rU\"",
    "mtime": "2023-07-20T08:27:27.086Z",
    "size": 39835,
    "path": "../public/images/oaceyhcm.png"
  },
  "/images/primevue-logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"10e5-CDX0tNlhOiRRW9NnqtOwNZgvfuI\"",
    "mtime": "2023-07-20T08:27:27.091Z",
    "size": 4325,
    "path": "../public/images/primevue-logo.svg"
  },
  "/images/profile.png": {
    "type": "image/png",
    "etag": "\"1ea7-60B+OWzuzVz2668EkEYiL+RDRYI\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 7847,
    "path": "../public/images/profile.png"
  },
  "/images/rec.png": {
    "type": "image/png",
    "etag": "\"afb08-8n19EdYkOC+sP61fnwVf4bK2ayE\"",
    "mtime": "2023-10-15T16:35:03.146Z",
    "size": 719624,
    "path": "../public/images/rec.png"
  },
  "/images/sage.png": {
    "type": "image/png",
    "etag": "\"868-kR1NxlIjiuDy12duiPJNJVDLf5A\"",
    "mtime": "2023-09-19T12:37:33.968Z",
    "size": 2152,
    "path": "../public/images/sage.png"
  },
  "/images/school.png": {
    "type": "image/png",
    "etag": "\"c37f7-nWIQPj/T1a96ijp5QWEe0ZwLCTI\"",
    "mtime": "2024-01-11T07:17:54.884Z",
    "size": 800759,
    "path": "../public/images/school.png"
  },
  "/images/shaking.png": {
    "type": "image/png",
    "etag": "\"db9079-24vnohgJmGgz8yYztSoCLwLF/A4\"",
    "mtime": "2023-07-20T08:27:27.253Z",
    "size": 14389369,
    "path": "../public/images/shaking.png"
  },
  "/images/signin-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"39695-Lov5ffiyXjeFIcRTdWVTGBOEPZM\"",
    "mtime": "2023-07-20T08:27:27.253Z",
    "size": 235157,
    "path": "../public/images/signin-2.jpg"
  },
  "/images/ty13.pdf": {
    "type": "application/pdf",
    "etag": "\"31e5f4-rLNZzDGLnaS8zEXqB4v9+NnUYAk\"",
    "mtime": "2024-01-22T19:52:52.406Z",
    "size": 3270132,
    "path": "../public/images/ty13.pdf"
  },
  "/images/user.png": {
    "type": "image/png",
    "etag": "\"caab-mrxLbbGNoM80Gj6bWvqtJAncSXg\"",
    "mtime": "2023-07-20T08:27:27.286Z",
    "size": 51883,
    "path": "../public/images/user.png"
  },
  "/images/woman.jpg": {
    "type": "image/jpeg",
    "etag": "\"11250e-cOWAfJUkqXPNFTYIIuspDVtxlb4\"",
    "mtime": "2023-07-20T08:27:27.322Z",
    "size": 1123598,
    "path": "../public/images/woman.jpg"
  },
  "/js/bootstrap.bundle.min.js": {
    "type": "application/javascript",
    "etag": "\"137b4-2jC556JA9ha46WQrMh5HTBKaBS8\"",
    "mtime": "2023-07-20T08:27:30.322Z",
    "size": 79796,
    "path": "../public/js/bootstrap.bundle.min.js"
  },
  "/js/bootstrap.bundle.min.js.map": {
    "type": "application/json",
    "etag": "\"50c61-c8RYAWGouzGmVv09LUJN0ExSxsM\"",
    "mtime": "2023-07-20T08:27:27.328Z",
    "size": 330849,
    "path": "../public/js/bootstrap.bundle.min.js.map"
  },
  "/js/buttons.bootstrap4.min.js": {
    "type": "application/javascript",
    "etag": "\"5aa-USrv3jJkGess2qvRKkeefcYCJKM\"",
    "mtime": "2023-07-20T08:27:27.331Z",
    "size": 1450,
    "path": "../public/js/buttons.bootstrap4.min.js"
  },
  "/js/buttons.colVis.min.js": {
    "type": "application/javascript",
    "etag": "\"c88-vNboZbg9bM77TBvMkng6k6kilUE\"",
    "mtime": "2023-07-20T08:27:27.331Z",
    "size": 3208,
    "path": "../public/js/buttons.colVis.min.js"
  },
  "/js/buttons.html5.min.js": {
    "type": "application/javascript",
    "etag": "\"6237-Cy/UHnyc/gkTfFUePO41Jax/1MY\"",
    "mtime": "2023-07-20T08:27:27.331Z",
    "size": 25143,
    "path": "../public/js/buttons.html5.min.js"
  },
  "/js/buttons.print.min.js": {
    "type": "application/javascript",
    "etag": "\"9db-NSUmiSB2on6mjLq0HwHLmtBAxmw\"",
    "mtime": "2023-07-20T08:27:27.331Z",
    "size": 2523,
    "path": "../public/js/buttons.print.min.js"
  },
  "/js/dataTables.bootstrap4.min.js": {
    "type": "application/javascript",
    "etag": "\"11b6-FSO47OzvwlTwC46HDOFR7BROUEg\"",
    "mtime": "2023-07-20T08:27:27.331Z",
    "size": 4534,
    "path": "../public/js/dataTables.bootstrap4.min.js"
  },
  "/js/dataTables.buttons.min.js": {
    "type": "application/javascript",
    "etag": "\"641f-Rg3Jh8XrLCWr1fI8Hv5V4n+gwBk\"",
    "mtime": "2023-07-20T08:27:27.336Z",
    "size": 25631,
    "path": "../public/js/dataTables.buttons.min.js"
  },
  "/js/dataTables.keyTable.min.js": {
    "type": "application/javascript",
    "etag": "\"3e53-zan97LBoh1uR9m+iOs4UG1Pdh2w\"",
    "mtime": "2023-07-20T08:27:27.336Z",
    "size": 15955,
    "path": "../public/js/dataTables.keyTable.min.js"
  },
  "/js/jquery-3.5.1.js": {
    "type": "application/javascript",
    "etag": "\"48e0d-CTb8Ual0vjaRsTtymeXtOtNsiK8\"",
    "mtime": "2023-07-20T08:27:30.340Z",
    "size": 298509,
    "path": "../public/js/jquery-3.5.1.js"
  },
  "/js/jquery.dataTables.min.js": {
    "type": "application/javascript",
    "etag": "\"16159-OdYJ4XPSE38F6XiAqzx5i1mUIWg\"",
    "mtime": "2023-07-20T08:27:36.340Z",
    "size": 90457,
    "path": "../public/js/jquery.dataTables.min.js"
  },
  "/js/jszip.min.js": {
    "type": "application/javascript",
    "etag": "\"18e48-V+ecGP7RJGQDTtAFccNbbe219n0\"",
    "mtime": "2023-07-20T08:27:27.340Z",
    "size": 101960,
    "path": "../public/js/jszip.min.js"
  },
  "/js/main.js": {
    "type": "application/javascript",
    "etag": "\"575-fOu20lM5GtFY9qinZGvPYx7CJa4\"",
    "mtime": "2023-07-20T08:27:27.340Z",
    "size": 1397,
    "path": "../public/js/main.js"
  },
  "/js/pdfmake.min.js": {
    "type": "application/javascript",
    "etag": "\"10af0d-NB76bFBTKjy5JWFT5F9k245KK2U\"",
    "mtime": "2023-07-20T08:27:36.356Z",
    "size": 1093389,
    "path": "../public/js/pdfmake.min.js"
  },
  "/js/vfs_fonts.js": {
    "type": "application/javascript",
    "etag": "\"e2219-3sT6eA6XV3G9i4EmswzCwAfrEgo\"",
    "mtime": "2023-07-20T08:27:27.363Z",
    "size": 926233,
    "path": "../public/js/vfs_fonts.js"
  },
  "/uploads/16886297385575020014.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.714Z",
    "size": 456263,
    "path": "../public/uploads/16886297385575020014.pdf"
  },
  "/uploads/16886300196562848179.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.717Z",
    "size": 456263,
    "path": "../public/uploads/16886300196562848179.pdf"
  },
  "/uploads/16886316109434941873.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.721Z",
    "size": 456263,
    "path": "../public/uploads/16886316109434941873.pdf"
  },
  "/uploads/16886346260836306517.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.723Z",
    "size": 456263,
    "path": "../public/uploads/16886346260836306517.pdf"
  },
  "/uploads/16886527576965100538.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.728Z",
    "size": 456263,
    "path": "../public/uploads/16886527576965100538.pdf"
  },
  "/uploads/16886536516475342961.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.731Z",
    "size": 456263,
    "path": "../public/uploads/16886536516475342961.pdf"
  },
  "/uploads/16886600388014689922.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.734Z",
    "size": 456263,
    "path": "../public/uploads/16886600388014689922.pdf"
  },
  "/uploads/16886617143116679807.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.738Z",
    "size": 456263,
    "path": "../public/uploads/16886617143116679807.pdf"
  },
  "/uploads/16886621145122302338.pdf": {
    "type": "application/pdf",
    "etag": "\"c88b6-UVXFcPmOaTeIhUcP5pFMCfRd324\"",
    "mtime": "2023-07-20T08:27:27.742Z",
    "size": 821430,
    "path": "../public/uploads/16886621145122302338.pdf"
  },
  "/uploads/16887239478908892470.pdf": {
    "type": "application/pdf",
    "etag": "\"c88b6-UVXFcPmOaTeIhUcP5pFMCfRd324\"",
    "mtime": "2023-07-20T08:27:27.750Z",
    "size": 821430,
    "path": "../public/uploads/16887239478908892470.pdf"
  },
  "/uploads/16887254826607921813.pdf": {
    "type": "application/pdf",
    "etag": "\"6f647-i41HdrYo2SY1HKiLUNL+ykrlrBM\"",
    "mtime": "2023-07-20T08:27:27.753Z",
    "size": 456263,
    "path": "../public/uploads/16887254826607921813.pdf"
  },
  "/uploads/16887257090628375373.pdf": {
    "type": "application/pdf",
    "etag": "\"c88b6-UVXFcPmOaTeIhUcP5pFMCfRd324\"",
    "mtime": "2023-07-20T08:27:27.764Z",
    "size": 821430,
    "path": "../public/uploads/16887257090628375373.pdf"
  },
  "/uploads/16889295220992716004.pdf": {
    "type": "application/pdf",
    "etag": "\"c88b6-UVXFcPmOaTeIhUcP5pFMCfRd324\"",
    "mtime": "2023-07-20T08:27:27.771Z",
    "size": 821430,
    "path": "../public/uploads/16889295220992716004.pdf"
  },
  "/uploads/16889336926318350184.pdf": {
    "type": "application/pdf",
    "etag": "\"c88b6-UVXFcPmOaTeIhUcP5pFMCfRd324\"",
    "mtime": "2023-07-20T08:27:27.787Z",
    "size": 821430,
    "path": "../public/uploads/16889336926318350184.pdf"
  },
  "/uploads/16905408138971759923.pdf": {
    "type": "application/pdf",
    "etag": "\"8750-Gal1pG4LsExcqrTULbRVu7Y50Ns\"",
    "mtime": "2023-08-03T06:54:52.570Z",
    "size": 34640,
    "path": "../public/uploads/16905408138971759923.pdf"
  },
  "/uploads/16908951582483216642.pdf": {
    "type": "application/pdf",
    "etag": "\"6b1f1-/BZGYIStXu9ntHz+ZxEKGWQVasM\"",
    "mtime": "2023-08-03T06:54:52.570Z",
    "size": 438769,
    "path": "../public/uploads/16908951582483216642.pdf"
  },
  "/uploads/16908970676507614841.pdf": {
    "type": "application/pdf",
    "etag": "\"6b1f1-/BZGYIStXu9ntHz+ZxEKGWQVasM\"",
    "mtime": "2023-08-03T06:54:52.570Z",
    "size": 438769,
    "path": "../public/uploads/16908970676507614841.pdf"
  },
  "/uploads/16921885333456894860.pdf": {
    "type": "application/pdf",
    "etag": "\"35f00-CGHHKMWiZjeOWEvq/kQr5sdy930\"",
    "mtime": "2023-08-16T12:22:13.322Z",
    "size": 220928,
    "path": "../public/uploads/16921885333456894860.pdf"
  },
  "/uploads/169219079224674077.pdf": {
    "type": "application/pdf",
    "etag": "\"35f00-CGHHKMWiZjeOWEvq/kQr5sdy930\"",
    "mtime": "2023-08-16T12:59:52.239Z",
    "size": 220928,
    "path": "../public/uploads/169219079224674077.pdf"
  },
  "/uploads/16951192543649452432.pdf": {
    "type": "application/pdf",
    "etag": "\"2e0b6-MjvffmLHOrZ7NUv0mUt7B1t2iak\"",
    "mtime": "2023-09-19T12:36:57.279Z",
    "size": 188598,
    "path": "../public/uploads/16951192543649452432.pdf"
  },
  "/uploads/16951217222102746737.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.279Z",
    "size": 41527,
    "path": "../public/uploads/16951217222102746737.pdf"
  },
  "/uploads/16951227197411401511.pdf": {
    "type": "application/pdf",
    "etag": "\"2e0b6-MjvffmLHOrZ7NUv0mUt7B1t2iak\"",
    "mtime": "2023-09-19T12:36:57.279Z",
    "size": 188598,
    "path": "../public/uploads/16951227197411401511.pdf"
  },
  "/uploads/16951233408639236359.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.287Z",
    "size": 41527,
    "path": "../public/uploads/16951233408639236359.pdf"
  },
  "/uploads/1695123803690526952.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.287Z",
    "size": 41527,
    "path": "../public/uploads/1695123803690526952.pdf"
  },
  "/uploads/16951248151469428422.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.288Z",
    "size": 41527,
    "path": "../public/uploads/16951248151469428422.pdf"
  },
  "/uploads/16951249058071953144.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.289Z",
    "size": 41527,
    "path": "../public/uploads/16951249058071953144.pdf"
  },
  "/uploads/16951251165678749681.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.289Z",
    "size": 41527,
    "path": "../public/uploads/16951251165678749681.pdf"
  },
  "/uploads/16951262249386207860.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.289Z",
    "size": 41527,
    "path": "../public/uploads/16951262249386207860.pdf"
  },
  "/uploads/16951264299613886670.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.291Z",
    "size": 41527,
    "path": "../public/uploads/16951264299613886670.pdf"
  },
  "/uploads/16951266177619937849.pdf": {
    "type": "application/pdf",
    "etag": "\"a237-S6n7YrepPArTUNFjRPKvh9A+XZE\"",
    "mtime": "2023-09-19T12:36:57.292Z",
    "size": 41527,
    "path": "../public/uploads/16951266177619937849.pdf"
  },
  "/uploads/16951308465967610743.pdf": {
    "type": "application/pdf",
    "etag": "\"55799-iQrBlRHr3o7Fx0Xv6cBGfUOoFw0\"",
    "mtime": "2023-09-20T10:49:24.100Z",
    "size": 350105,
    "path": "../public/uploads/16951308465967610743.pdf"
  },
  "/uploads/16951311940979232783.pdf": {
    "type": "application/pdf",
    "etag": "\"976e7-vfKbuBTdv6+ORVqCbt2rDx8snsQ\"",
    "mtime": "2023-09-20T10:49:24.116Z",
    "size": 620263,
    "path": "../public/uploads/16951311940979232783.pdf"
  },
  "/uploads/16953242381555548582.pdf": {
    "type": "application/pdf",
    "etag": "\"1f5d5-BMGvS+cASlhUvQgF3+3eN8EUbfA\"",
    "mtime": "2023-09-21T19:23:58.147Z",
    "size": 128469,
    "path": "../public/uploads/16953242381555548582.pdf"
  },
  "/uploads/16953245857844748596.pdf": {
    "type": "application/pdf",
    "etag": "\"1f5d5-BMGvS+cASlhUvQgF3+3eN8EUbfA\"",
    "mtime": "2023-09-21T19:29:45.779Z",
    "size": 128469,
    "path": "../public/uploads/16953245857844748596.pdf"
  },
  "/uploads/169532474988169602.pdf": {
    "type": "application/pdf",
    "etag": "\"1f5d5-BMGvS+cASlhUvQgF3+3eN8EUbfA\"",
    "mtime": "2023-09-21T19:32:29.876Z",
    "size": 128469,
    "path": "../public/uploads/169532474988169602.pdf"
  },
  "/uploads/16953249738598714916.pdf": {
    "type": "application/pdf",
    "etag": "\"1f5d5-BMGvS+cASlhUvQgF3+3eN8EUbfA\"",
    "mtime": "2023-09-21T19:36:13.853Z",
    "size": 128469,
    "path": "../public/uploads/16953249738598714916.pdf"
  },
  "/uploads/16953857659911058348.pdf": {
    "type": "application/pdf",
    "etag": "\"7f85c-lb2KOnCam0amiYw5q5fgOOq7Rzs\"",
    "mtime": "2023-09-22T12:29:25.982Z",
    "size": 522332,
    "path": "../public/uploads/16953857659911058348.pdf"
  },
  "/uploads/1698751043668245723.pdf": {
    "type": "application/pdf",
    "etag": "\"681d9-x/1zJfc18mJG9kFZ+tgmY/jPYao\"",
    "mtime": "2023-10-31T11:17:23.656Z",
    "size": 426457,
    "path": "../public/uploads/1698751043668245723.pdf"
  },
  "/uploads/16987545714663158501.pdf": {
    "type": "application/pdf",
    "etag": "\"1b8c9-vgZf3rq2X8FkdY6J6EOQrhF/roM\"",
    "mtime": "2023-10-31T12:16:11.465Z",
    "size": 112841,
    "path": "../public/uploads/16987545714663158501.pdf"
  },
  "/uploads/32740.74151558433.png": {
    "type": "image/png",
    "etag": "\"e461-hCbwj9vb/75ki0pd+uZlGpz80BA\"",
    "mtime": "2024-02-13T06:53:37.668Z",
    "size": 58465,
    "path": "../public/uploads/32740.74151558433.png"
  },
  "/uploads/36075.10073722915.png": {
    "type": "image/png",
    "etag": "\"e461-hCbwj9vb/75ki0pd+uZlGpz80BA\"",
    "mtime": "2024-02-13T06:43:10.637Z",
    "size": 58465,
    "path": "../public/uploads/36075.10073722915.png"
  },
  "/uploads/36170.53929473508.png": {
    "type": "image/png",
    "etag": "\"e461-hCbwj9vb/75ki0pd+uZlGpz80BA\"",
    "mtime": "2024-02-13T06:48:42.250Z",
    "size": 58465,
    "path": "../public/uploads/36170.53929473508.png"
  },
  "/_nuxt/404.cZvKiMHg.js": {
    "type": "application/javascript",
    "etag": "\"105-WXy6xyY8HL1Ue+c6O5m9HVUp+mg\"",
    "mtime": "2024-02-14T14:21:44.237Z",
    "size": 261,
    "path": "../public/_nuxt/404.cZvKiMHg.js"
  },
  "/_nuxt/auth.DGoYgnd8.js": {
    "type": "application/javascript",
    "etag": "\"14501-8n1trY8N182NzGuKDsZ1iY4oOO0\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 83201,
    "path": "../public/_nuxt/auth.DGoYgnd8.js"
  },
  "/_nuxt/auth.duEI9mH1.js": {
    "type": "application/javascript",
    "etag": "\"192-rsJ2RjdFbjsxG3K5rEivxq3sAmE\"",
    "mtime": "2024-02-14T14:21:44.237Z",
    "size": 402,
    "path": "../public/_nuxt/auth.duEI9mH1.js"
  },
  "/_nuxt/auth.KPzh5EX0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2454a-c37S8ZqAa1F/7W8cFKhosGQ7kXA\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 148810,
    "path": "../public/_nuxt/auth.KPzh5EX0.css"
  },
  "/_nuxt/auth.NeU-8RNZ.js": {
    "type": "application/javascript",
    "etag": "\"22f-YTBJJ7KcURy/UY8YFfs64IDdfoQ\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 559,
    "path": "../public/_nuxt/auth.NeU-8RNZ.js"
  },
  "/_nuxt/authentication.LdsDSiL-.js": {
    "type": "application/javascript",
    "etag": "\"282-J7vszGzdT2JTyoAv/cEpZXVo1Qo\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 642,
    "path": "../public/_nuxt/authentication.LdsDSiL-.js"
  },
  "/_nuxt/auto.XYC5A0Ix.js": {
    "type": "application/javascript",
    "etag": "\"32136-MCBQYVYYUCEStHRh+t/sdNVZkQs\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 205110,
    "path": "../public/_nuxt/auto.XYC5A0Ix.js"
  },
  "/_nuxt/Banner404.QdjHUYMc.js": {
    "type": "application/javascript",
    "etag": "\"373-1catYnAXrhmoRc1HRT286H3m9bg\"",
    "mtime": "2024-02-14T14:21:44.240Z",
    "size": 883,
    "path": "../public/_nuxt/Banner404.QdjHUYMc.js"
  },
  "/_nuxt/check-_5Up9njX.S-3YvqWX.js": {
    "type": "application/javascript",
    "etag": "\"192-cUyKFRcs2et9dni3wUdeoXcUNw8\"",
    "mtime": "2024-02-14T14:21:44.240Z",
    "size": 402,
    "path": "../public/_nuxt/check-_5Up9njX.S-3YvqWX.js"
  },
  "/_nuxt/chevron-down-bC0s_0yH.D51ggNyI.js": {
    "type": "application/javascript",
    "etag": "\"197-xkbmjUmGTSm71zo8Z1DpaUqkNo8\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 407,
    "path": "../public/_nuxt/chevron-down-bC0s_0yH.D51ggNyI.js"
  },
  "/_nuxt/civil.Qcpysse8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"162-m6wxGR7MjLWX1Jw7ZrC4kNkCe8k\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 354,
    "path": "../public/_nuxt/civil.Qcpysse8.css"
  },
  "/_nuxt/civil.SJm3yqyV.js": {
    "type": "application/javascript",
    "etag": "\"687c-T9dR5vGN4NYUPzoYQloKZXLm2bI\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 26748,
    "path": "../public/_nuxt/civil.SJm3yqyV.js"
  },
  "/_nuxt/component.WLeKUCrL.js": {
    "type": "application/javascript",
    "etag": "\"dd0-jJh3MuYANpBSGWz9HbP4j8Yqm0k\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 3536,
    "path": "../public/_nuxt/component.WLeKUCrL.js"
  },
  "/_nuxt/cookie.ss19L6mZ.js": {
    "type": "application/javascript",
    "etag": "\"2225-aMix2MiY40y3mCev5U706w1No10\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 8741,
    "path": "../public/_nuxt/cookie.ss19L6mZ.js"
  },
  "/_nuxt/dashboard.IAiOUGMs.js": {
    "type": "application/javascript",
    "etag": "\"10f86-gEMBDZegP8zGhONJmtQWHNs8szM\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 69510,
    "path": "../public/_nuxt/dashboard.IAiOUGMs.js"
  },
  "/_nuxt/dashboard.vEwASxMJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"250-OMj0715QMKXPhgQrzU+tI+wdQdc\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 592,
    "path": "../public/_nuxt/dashboard.vEwASxMJ.css"
  },
  "/_nuxt/default.YVujL-i8.js": {
    "type": "application/javascript",
    "etag": "\"5c1-s3DsVbkTxV5wC6pueIl6nHBkajQ\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 1473,
    "path": "../public/_nuxt/default.YVujL-i8.js"
  },
  "/_nuxt/entry.0bv1-YRj.js": {
    "type": "application/javascript",
    "etag": "\"13fdf2-bY/ZRreciFV28K3H3+KQaYQKIeU\"",
    "mtime": "2024-02-14T14:21:44.246Z",
    "size": 1310194,
    "path": "../public/_nuxt/entry.0bv1-YRj.js"
  },
  "/_nuxt/entry.JHRACF5x.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26bbd-QArAzmet6egAlIGmXHG5SV3v/JY\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 158653,
    "path": "../public/_nuxt/entry.JHRACF5x.css"
  },
  "/_nuxt/error-404.fHjNBsH9.js": {
    "type": "application/javascript",
    "etag": "\"1931-6TcFv58t3IT+wUAJXMvs5mgkEqc\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 6449,
    "path": "../public/_nuxt/error-404.fHjNBsH9.js"
  },
  "/_nuxt/error-404.qFGwA4uS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e26-9UI2Z985OY4ttYcbyiWh91cxpnM\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 3622,
    "path": "../public/_nuxt/error-404.qFGwA4uS.css"
  },
  "/_nuxt/error-500.elgAHVPM.js": {
    "type": "application/javascript",
    "etag": "\"77e-gsbMXaLP9geniBuiBHtj9Ekik4k\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 1918,
    "path": "../public/_nuxt/error-500.elgAHVPM.js"
  },
  "/_nuxt/error-500.V0P2JAtD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-ByRo+49BgcevWdRjJy3CMx2IA5k\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.V0P2JAtD.css"
  },
  "/_nuxt/error.8WEUP4K5.js": {
    "type": "application/javascript",
    "etag": "\"107-xMYjoERe+Faf4/TpmSZLO9THUBk\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 263,
    "path": "../public/_nuxt/error.8WEUP4K5.js"
  },
  "/_nuxt/examples.mobile.json-Q67ZfW9N.J75t2AQI.js": {
    "type": "application/javascript",
    "etag": "\"e14-DRppl8ULE6tJ70eFeM4mpOROJ9M\"",
    "mtime": "2024-02-14T14:21:44.240Z",
    "size": 3604,
    "path": "../public/_nuxt/examples.mobile.json-Q67ZfW9N.J75t2AQI.js"
  },
  "/_nuxt/eye-3jm1b22X.8xChREGL.js": {
    "type": "application/javascript",
    "etag": "\"2d2-OGNBn/Q0c05px43yMpHbwJ/pVmw\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 722,
    "path": "../public/_nuxt/eye-3jm1b22X.8xChREGL.js"
  },
  "/_nuxt/eye-slash-rdPLIzFI.5hNGJC5S.js": {
    "type": "application/javascript",
    "etag": "\"2c9-Rsti7wgWJlp5bgpckpeI4RuUFlQ\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 713,
    "path": "../public/_nuxt/eye-slash-rdPLIzFI.5hNGJC5S.js"
  },
  "/_nuxt/form.qwC3fqNf.js": {
    "type": "application/javascript",
    "etag": "\"2b9-5v9qqz3fl2a72s33h0L6qY47YWA\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 697,
    "path": "../public/_nuxt/form.qwC3fqNf.js"
  },
  "/_nuxt/index.7uPlPQo1.js": {
    "type": "application/javascript",
    "etag": "\"88d-pp8bwQE6oL7PPBc7TjOCa3eRboY\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 2189,
    "path": "../public/_nuxt/index.7uPlPQo1.js"
  },
  "/_nuxt/index.GHmHTnKY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"165-BYBrqC/G8oUI2eygsGuM3qFNhRE\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 357,
    "path": "../public/_nuxt/index.GHmHTnKY.css"
  },
  "/_nuxt/index.MpRcIrCH.js": {
    "type": "application/javascript",
    "etag": "\"4ba1-EV38HBoG8UD2dcJ1C8paGJbYdeE\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 19361,
    "path": "../public/_nuxt/index.MpRcIrCH.js"
  },
  "/_nuxt/individuals.DDWmsvOU.js": {
    "type": "application/javascript",
    "etag": "\"4eed-r4aFMuYza5/FYOw3G4qmvw8BLg8\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 20205,
    "path": "../public/_nuxt/individuals.DDWmsvOU.js"
  },
  "/_nuxt/individuals.yy1OUTt4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18b-LqquHiYrkKTeiaj3L2OzpCr7eWw\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 395,
    "path": "../public/_nuxt/individuals.yy1OUTt4.css"
  },
  "/_nuxt/Inter-italic.var.4Q_raY2J.woff2": {
    "type": "font/woff2",
    "etag": "\"3bd2c-byCgRpF7+G1LbMKcTiUVvWTSy5s\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 245036,
    "path": "../public/_nuxt/Inter-italic.var.4Q_raY2J.woff2"
  },
  "/_nuxt/Inter-roman.var.vq-Vth46.woff2": {
    "type": "font/woff2",
    "etag": "\"3776c-eiYC0uuwjOiV4zrdtv5ZXxApQx4\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 227180,
    "path": "../public/_nuxt/Inter-roman.var.vq-Vth46.woff2"
  },
  "/_nuxt/login.67MIEmSR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"105-5uqW30QF36v5RhzI/Y4EZhIIYns\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 261,
    "path": "../public/_nuxt/login.67MIEmSR.css"
  },
  "/_nuxt/login.QOE7XB-u.js": {
    "type": "application/javascript",
    "etag": "\"b01-Eas6wWbrz3CiGiSACzdb69ueZkQ\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 2817,
    "path": "../public/_nuxt/login.QOE7XB-u.js"
  },
  "/_nuxt/logo.B7ROyCia.js": {
    "type": "application/javascript",
    "etag": "\"67-AeFH/MLMR8gGnZKN1rsNBp+3IE8\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 103,
    "path": "../public/_nuxt/logo.B7ROyCia.js"
  },
  "/_nuxt/magnifying-glass-ebhrla2J.f1Reyuao.js": {
    "type": "application/javascript",
    "etag": "\"1c9-6Clg7FH4de7lXnjexIFDinjOaf8\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 457,
    "path": "../public/_nuxt/magnifying-glass-ebhrla2J.f1Reyuao.js"
  },
  "/_nuxt/MazBtn-K-8_p-HR.jLxh0Eoh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a01-Tjv+xWWLmdrqXKq/CuIueGsIWUc\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 14849,
    "path": "../public/_nuxt/MazBtn-K-8_p-HR.jLxh0Eoh.css"
  },
  "/_nuxt/MazBtn-K-8_p-HR.XQsbjIP2.js": {
    "type": "application/javascript",
    "etag": "\"eaa-sTx1bKXd8zbxmtYmI5TOoaZhwdc\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 3754,
    "path": "../public/_nuxt/MazBtn-K-8_p-HR.XQsbjIP2.js"
  },
  "/_nuxt/MazCheckbox-7Ap-thkT.aMIil8fY.js": {
    "type": "application/javascript",
    "etag": "\"a50-4blMBBLwNp23ZxHqe7p6w3q6sn0\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 2640,
    "path": "../public/_nuxt/MazCheckbox-7Ap-thkT.aMIil8fY.js"
  },
  "/_nuxt/MazCheckbox-7Ap-thkT.YEaWtWim.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a9e-wDWERG8Q+SmCs0anLlUQvz77YI8\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 2718,
    "path": "../public/_nuxt/MazCheckbox-7Ap-thkT.YEaWtWim.css"
  },
  "/_nuxt/MazIcon-C329_2BT.5U9jrT1L.js": {
    "type": "application/javascript",
    "etag": "\"90c-63wvrq2KGVQRJmOObpt/j+9/T/0\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 2316,
    "path": "../public/_nuxt/MazIcon-C329_2BT.5U9jrT1L.js"
  },
  "/_nuxt/MazSpinner-Wnqtt3dQ.aD_RLHew.js": {
    "type": "application/javascript",
    "etag": "\"325-/INnVCfwP1Ievb6hUbzdosCs4Tg\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 805,
    "path": "../public/_nuxt/MazSpinner-Wnqtt3dQ.aD_RLHew.js"
  },
  "/_nuxt/MazSpinner-Wnqtt3dQ.G7IVoZYa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36a-45xhwZkBNhvvN05evHWRQibXrto\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 874,
    "path": "../public/_nuxt/MazSpinner-Wnqtt3dQ.G7IVoZYa.css"
  },
  "/_nuxt/no-symbol-JnXtUaU-.AaQSphWZ.js": {
    "type": "application/javascript",
    "etag": "\"1df-eDLdEedMD1K0IANU6ww1rT+dwiI\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 479,
    "path": "../public/_nuxt/no-symbol-JnXtUaU-.AaQSphWZ.js"
  },
  "/_nuxt/not-auth.3MLaY1H1.js": {
    "type": "application/javascript",
    "etag": "\"1cd-oMfgmEOPBl816bWdsG2mLIeKrnI\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 461,
    "path": "../public/_nuxt/not-auth.3MLaY1H1.js"
  },
  "/_nuxt/nuxt-layout.N4U5iQyH.js": {
    "type": "application/javascript",
    "etag": "\"5a3-9eAyfsaV0wGhQFanTeWqkyicp9M\"",
    "mtime": "2024-02-14T14:21:44.240Z",
    "size": 1443,
    "path": "../public/_nuxt/nuxt-layout.N4U5iQyH.js"
  },
  "/_nuxt/primeicons.7xwaE5Qf.ttf": {
    "type": "font/ttf",
    "etag": "\"10454-5shsqQqftCgvs1Uj1W/eAOeKFBY\"",
    "mtime": "2024-02-14T14:21:44.231Z",
    "size": 66644,
    "path": "../public/_nuxt/primeicons.7xwaE5Qf.ttf"
  },
  "/_nuxt/primeicons.HF_GC5Lw.woff": {
    "type": "font/woff",
    "etag": "\"104a0-IeR36hnhW2Y0S8wjs/uyFhCSpwc\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 66720,
    "path": "../public/_nuxt/primeicons.HF_GC5Lw.woff"
  },
  "/_nuxt/primeicons.iO4hIWru.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"10504-zPZeQGgLDt5qtGk51CHIMa5q/PQ\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 66820,
    "path": "../public/_nuxt/primeicons.iO4hIWru.eot"
  },
  "/_nuxt/primeicons.j8XpxSTD.svg": {
    "type": "image/svg+xml",
    "etag": "\"42564-Yhd1suxVX9LdFSokOQz23+7haLE\"",
    "mtime": "2024-02-14T14:21:44.236Z",
    "size": 271716,
    "path": "../public/_nuxt/primeicons.j8XpxSTD.svg"
  },
  "/_nuxt/quill.SEd4TtjW.js": {
    "type": "application/javascript",
    "etag": "\"34f2a-hSTqxOAfSZXyGZQ6CO9uinLpidE\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 216874,
    "path": "../public/_nuxt/quill.SEd4TtjW.js"
  },
  "/_nuxt/register.T0LHnl8h.js": {
    "type": "application/javascript",
    "etag": "\"3038-DxbXBD82shvoP93hSALCnsp88cw\"",
    "mtime": "2024-02-14T14:21:44.245Z",
    "size": 12344,
    "path": "../public/_nuxt/register.T0LHnl8h.js"
  },
  "/_nuxt/vue.f36acd1f.6GeR_r4u.js": {
    "type": "application/javascript",
    "etag": "\"18d-ZZ4RjtGBfsZCtpDxHA1hc3P2v7w\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 397,
    "path": "../public/_nuxt/vue.f36acd1f.6GeR_r4u.js"
  },
  "/_nuxt/_commonjsHelpers.5-cIlDoe.js": {
    "type": "application/javascript",
    "etag": "\"ec-QtY1KaLA8vnMK3l2IvajpxyuPmY\"",
    "mtime": "2024-02-14T14:21:44.239Z",
    "size": 236,
    "path": "../public/_nuxt/_commonjsHelpers.5-cIlDoe.js"
  },
  "/images/avatar/amyelsner.png": {
    "type": "image/png",
    "etag": "\"1489-33PVgLCh2jpums+c+XdJ0XPOAGo\"",
    "mtime": "2023-07-20T08:27:27.009Z",
    "size": 5257,
    "path": "../public/images/avatar/amyelsner.png"
  },
  "/images/avatar/annafali.png": {
    "type": "image/png",
    "etag": "\"15ec-ggrYqRB7kRLMZWyKOiyYfdW2ieI\"",
    "mtime": "2023-07-20T08:27:27.013Z",
    "size": 5612,
    "path": "../public/images/avatar/annafali.png"
  },
  "/images/avatar/asiyajavayant.png": {
    "type": "image/png",
    "etag": "\"15dd-x2KDGCqR33DcLWIABSuNbQTTqPc\"",
    "mtime": "2023-07-20T08:27:27.017Z",
    "size": 5597,
    "path": "../public/images/avatar/asiyajavayant.png"
  },
  "/images/avatar/bernardodominic.png": {
    "type": "image/png",
    "etag": "\"16ee-Lc3uYc/JlYd/cFvHDS16vX91G38\"",
    "mtime": "2023-07-20T08:27:27.020Z",
    "size": 5870,
    "path": "../public/images/avatar/bernardodominic.png"
  },
  "/images/avatar/elwinsharvill.png": {
    "type": "image/png",
    "etag": "\"15d4-ayGJUVVr1sMUsM0JHh7/24rOYyY\"",
    "mtime": "2023-07-20T08:27:27.022Z",
    "size": 5588,
    "path": "../public/images/avatar/elwinsharvill.png"
  },
  "/images/avatar/ionibowcher.png": {
    "type": "image/png",
    "etag": "\"1663-FPvZsj0bNqJZRA67/5AqIlumq6o\"",
    "mtime": "2023-07-20T08:27:27.023Z",
    "size": 5731,
    "path": "../public/images/avatar/ionibowcher.png"
  },
  "/images/avatar/ivanmagalhaes.png": {
    "type": "image/png",
    "etag": "\"17c8-940C26gDsW+zVuOit2PxbsQUNbA\"",
    "mtime": "2023-07-20T08:27:27.024Z",
    "size": 6088,
    "path": "../public/images/avatar/ivanmagalhaes.png"
  },
  "/images/avatar/onyamalimba.png": {
    "type": "image/png",
    "etag": "\"152e-TBHczmgPX6EcsZZ89j+QxcHSNIY\"",
    "mtime": "2023-07-20T08:27:27.025Z",
    "size": 5422,
    "path": "../public/images/avatar/onyamalimba.png"
  },
  "/images/avatar/profile.jpg": {
    "type": "image/jpeg",
    "etag": "\"1f73-TYvRWMb85p4RFSI4L/CuoFvGuZo\"",
    "mtime": "2023-07-20T08:27:27.025Z",
    "size": 8051,
    "path": "../public/images/avatar/profile.jpg"
  },
  "/images/avatar/stephenshaw.png": {
    "type": "image/png",
    "etag": "\"146b-WTnArlZ6kc/YqaAHDHwfDdnlcDk\"",
    "mtime": "2023-07-20T08:27:27.026Z",
    "size": 5227,
    "path": "../public/images/avatar/stephenshaw.png"
  },
  "/images/avatar/xuxuefeng.png": {
    "type": "image/png",
    "etag": "\"17a9-tad4nGdDM1AcpyQZSlzVgWvbP/k\"",
    "mtime": "2023-07-20T08:27:27.027Z",
    "size": 6057,
    "path": "../public/images/avatar/xuxuefeng.png"
  },
  "/images/banner/banner1.jpg": {
    "type": "image/jpeg",
    "etag": "\"56af-8ITU4nqf0HuAPSMYpFXhPR4pBUY\"",
    "mtime": "2024-01-10T09:46:38.663Z",
    "size": 22191,
    "path": "../public/images/banner/banner1.jpg"
  },
  "/images/banner/img.jpg": {
    "type": "image/jpeg",
    "etag": "\"31b46-O+6xw3yLo2B/ibOOHT1+Zcnq/QU\"",
    "mtime": "2024-01-10T09:46:38.680Z",
    "size": 203590,
    "path": "../public/images/banner/img.jpg"
  },
  "/images/blog/img1.jpg": {
    "type": "image/jpeg",
    "etag": "\"57fc-SzpyjgqJPDXaOCwGfHtVv+OeGHw\"",
    "mtime": "2024-01-10T09:46:38.694Z",
    "size": 22524,
    "path": "../public/images/blog/img1.jpg"
  },
  "/images/blog/img2.jpg": {
    "type": "image/jpeg",
    "etag": "\"36fa-wZxu738MFGUUq43Avmx76LsX3ro\"",
    "mtime": "2024-01-10T09:46:38.710Z",
    "size": 14074,
    "path": "../public/images/blog/img2.jpg"
  },
  "/images/blog/img3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4dd7-d1sxcCCNNp5toE9XgPMwc7M0E+A\"",
    "mtime": "2024-01-10T09:46:38.726Z",
    "size": 19927,
    "path": "../public/images/blog/img3.jpg"
  },
  "/images/c2a/app-store.png": {
    "type": "image/png",
    "etag": "\"11ad-O5PhQnlGmUgNVChgYMCUhPssoEk\"",
    "mtime": "2024-01-10T09:46:38.743Z",
    "size": 4525,
    "path": "../public/images/c2a/app-store.png"
  },
  "/images/c2a/play-store.png": {
    "type": "image/png",
    "etag": "\"1557-74nCYtBqlvNwCBsnTWCKYFgNwwg\"",
    "mtime": "2024-01-10T09:46:38.757Z",
    "size": 5463,
    "path": "../public/images/c2a/play-store.png"
  },
  "/images/card/docks.jpg": {
    "type": "image/jpeg",
    "etag": "\"188ca-U09Z3HyuWhIXDP6Sn5q4oW2PJmU\"",
    "mtime": "2024-01-10T09:46:38.773Z",
    "size": 100554,
    "path": "../public/images/card/docks.jpg"
  },
  "/images/card/house.jpg": {
    "type": "image/jpeg",
    "etag": "\"127b0-k1qAk4Zuuqw6Zy3d0X4FxqYbp38\"",
    "mtime": "2024-01-10T09:46:38.789Z",
    "size": 75696,
    "path": "../public/images/card/house.jpg"
  },
  "/images/card/road.jpg": {
    "type": "image/jpeg",
    "etag": "\"129f9-1ezP73KXf79mK2RoE4UEXAPsWQ4\"",
    "mtime": "2024-01-10T09:46:38.789Z",
    "size": 76281,
    "path": "../public/images/card/road.jpg"
  },
  "/images/form-banner/form-banner1.png": {
    "type": "image/png",
    "etag": "\"df5c-9tzl32KXtKjWvTrHJpaiGTpWGl8\"",
    "mtime": "2024-01-10T09:46:38.898Z",
    "size": 57180,
    "path": "../public/images/form-banner/form-banner1.png"
  },
  "/images/landingpage/banner-img.png": {
    "type": "image/png",
    "etag": "\"27ba0-0Cc/8Vu0T2+hlvfHmIAXN/Np9k0\"",
    "mtime": "2024-01-10T09:46:38.914Z",
    "size": 162720,
    "path": "../public/images/landingpage/banner-img.png"
  },
  "/images/landingpage/comingsoon.jpg": {
    "type": "image/jpeg",
    "etag": "\"28ac3-gpuBIT5LCFxIgdvOBnFXk4AsUao\"",
    "mtime": "2024-01-10T09:46:38.914Z",
    "size": 166595,
    "path": "../public/images/landingpage/comingsoon.jpg"
  },
  "/images/logos/purple-logo.png": {
    "type": "image/png",
    "etag": "\"615-uVVdkgRUNwkGEcS4chyRftC8PkU\"",
    "mtime": "2024-01-10T09:46:38.930Z",
    "size": 1557,
    "path": "../public/images/logos/purple-logo.png"
  },
  "/images/logos/white-logo.png": {
    "type": "image/png",
    "etag": "\"5fe-BfdwgyPb0XDsQMzktBfDW3gpoSQ\"",
    "mtime": "2024-01-10T09:46:38.946Z",
    "size": 1534,
    "path": "../public/images/logos/white-logo.png"
  },
  "/images/logos/white-text.png": {
    "type": "image/png",
    "etag": "\"c87-7xaYnsYEN6wjIQIRtceglkYvPU0\"",
    "mtime": "2024-01-10T09:46:38.961Z",
    "size": 3207,
    "path": "../public/images/logos/white-text.png"
  },
  "/images/nature/nature1.jpg": {
    "type": "image/jpeg",
    "etag": "\"8507-/bxysm2qnuIRJmFW/NpFGsW48Wc\"",
    "mtime": "2023-07-20T08:27:27.069Z",
    "size": 34055,
    "path": "../public/images/nature/nature1.jpg"
  },
  "/images/nature/nature10.jpg": {
    "type": "image/jpeg",
    "etag": "\"b271-gfY60h+QrBEMfDiGxdgGznsNXCA\"",
    "mtime": "2023-07-20T08:27:27.070Z",
    "size": 45681,
    "path": "../public/images/nature/nature10.jpg"
  },
  "/images/nature/nature11.jpg": {
    "type": "image/jpeg",
    "etag": "\"eab7-FB7XTLe2zgxNEbydgIeSbuj4FT0\"",
    "mtime": "2023-07-20T08:27:27.072Z",
    "size": 60087,
    "path": "../public/images/nature/nature11.jpg"
  },
  "/images/nature/nature12.jpg": {
    "type": "image/jpeg",
    "etag": "\"e9dc-vg3V7T7UMKF5tkbJLwUBPEyvDzo\"",
    "mtime": "2023-07-20T08:27:27.073Z",
    "size": 59868,
    "path": "../public/images/nature/nature12.jpg"
  },
  "/images/nature/nature2.jpg": {
    "type": "image/jpeg",
    "etag": "\"176fe-8d5Gpx83mZ/RrNAIFS+cYFy7YYA\"",
    "mtime": "2023-07-20T08:27:27.075Z",
    "size": 95998,
    "path": "../public/images/nature/nature2.jpg"
  },
  "/images/nature/nature3.jpg": {
    "type": "image/jpeg",
    "etag": "\"180d8-MyM3w3sRfQwcsHETxRZJX7qKilg\"",
    "mtime": "2023-07-20T08:27:27.076Z",
    "size": 98520,
    "path": "../public/images/nature/nature3.jpg"
  },
  "/images/nature/nature4.jpg": {
    "type": "image/jpeg",
    "etag": "\"14359-O285LASlcHpfpb1IVAvuHfdWstQ\"",
    "mtime": "2023-07-20T08:27:27.079Z",
    "size": 82777,
    "path": "../public/images/nature/nature4.jpg"
  },
  "/images/nature/nature5.jpg": {
    "type": "image/jpeg",
    "etag": "\"b91e-PgMrAXSyNfG5jcRRVcgvjzacqBQ\"",
    "mtime": "2023-07-20T08:27:27.080Z",
    "size": 47390,
    "path": "../public/images/nature/nature5.jpg"
  },
  "/images/nature/nature6.jpg": {
    "type": "image/jpeg",
    "etag": "\"e8a4-aSqddAmhFC+hk/A1H05261jtNKk\"",
    "mtime": "2023-07-20T08:27:27.081Z",
    "size": 59556,
    "path": "../public/images/nature/nature6.jpg"
  },
  "/images/nature/nature7.jpg": {
    "type": "image/jpeg",
    "etag": "\"9009-0mxyvjxTYvl32oaIIP1rVNMe5a4\"",
    "mtime": "2023-07-20T08:27:27.083Z",
    "size": 36873,
    "path": "../public/images/nature/nature7.jpg"
  },
  "/images/nature/nature8.jpg": {
    "type": "image/jpeg",
    "etag": "\"f45e-6xr/2y+Kgv5kzUg+fB3jBATbOiA\"",
    "mtime": "2023-07-20T08:27:27.084Z",
    "size": 62558,
    "path": "../public/images/nature/nature8.jpg"
  },
  "/images/nature/nature9.jpg": {
    "type": "image/jpeg",
    "etag": "\"c87d-oj/xFSybk/cweEJSjOY6Xvs3bfw\"",
    "mtime": "2023-07-20T08:27:27.085Z",
    "size": 51325,
    "path": "../public/images/nature/nature9.jpg"
  },
  "/images/pages/icon-design.svg": {
    "type": "image/svg+xml",
    "etag": "\"115c-8RlaosGEg0hMEDRkm7mR9XWA0Z0\"",
    "mtime": "2023-07-20T08:27:27.087Z",
    "size": 4444,
    "path": "../public/images/pages/icon-design.svg"
  },
  "/images/pages/icon-devices.svg": {
    "type": "image/svg+xml",
    "etag": "\"1de5-FWFzvR6gRniXrECgalLhorrB8Jo\"",
    "mtime": "2023-07-20T08:27:27.088Z",
    "size": 7653,
    "path": "../public/images/pages/icon-devices.svg"
  },
  "/images/pages/icon-diamond.svg": {
    "type": "image/svg+xml",
    "etag": "\"88e-uqqwkJIKiqVui4dSCd0uO/OQfmk\"",
    "mtime": "2023-07-20T08:27:27.089Z",
    "size": 2190,
    "path": "../public/images/pages/icon-diamond.svg"
  },
  "/images/pages/icon-document.svg": {
    "type": "image/svg+xml",
    "etag": "\"b8e-X/gL6mwEYqAytQ2FX0BXm3d413w\"",
    "mtime": "2023-07-20T08:27:27.090Z",
    "size": 2958,
    "path": "../public/images/pages/icon-document.svg"
  },
  "/images/portfolio/img1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7446-47L/Zb6o0+Dc8xxaUVe5hcw7bKI\"",
    "mtime": "2024-01-10T09:46:38.982Z",
    "size": 29766,
    "path": "../public/images/portfolio/img1.jpg"
  },
  "/images/portfolio/img2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d44-LF6xYYTHG4qtR/J23ygh/cZkXW8\"",
    "mtime": "2024-01-10T09:46:38.993Z",
    "size": 23876,
    "path": "../public/images/portfolio/img2.jpg"
  },
  "/images/portfolio/img3.jpg": {
    "type": "image/jpeg",
    "etag": "\"6bac-JFeqDb0866Spnjfz5VHJBgQDG8w\"",
    "mtime": "2024-01-10T09:46:39.008Z",
    "size": 27564,
    "path": "../public/images/portfolio/img3.jpg"
  },
  "/images/portfolio/img4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5eb4-s8rfIXaWA1f8W92tgye85pdatc0\"",
    "mtime": "2024-01-10T09:46:39.008Z",
    "size": 24244,
    "path": "../public/images/portfolio/img4.jpg"
  },
  "/images/portfolio/img5.jpg": {
    "type": "image/jpeg",
    "etag": "\"9eed-yibYXfQMhxIXNuwchVusgwMvhOE\"",
    "mtime": "2024-01-10T09:46:39.024Z",
    "size": 40685,
    "path": "../public/images/portfolio/img5.jpg"
  },
  "/images/portfolio/img6.jpg": {
    "type": "image/jpeg",
    "etag": "\"4c72-ZmVNtDtkaY+bGIqMOTZPLJFjB7k\"",
    "mtime": "2024-01-10T09:46:39.044Z",
    "size": 19570,
    "path": "../public/images/portfolio/img6.jpg"
  },
  "/images/product/bamboo-watch.jpg": {
    "type": "image/jpeg",
    "etag": "\"2778-b9O3pTLgnxxXJSDdatsNkxqSpLI\"",
    "mtime": "2023-07-20T08:27:27.092Z",
    "size": 10104,
    "path": "../public/images/product/bamboo-watch.jpg"
  },
  "/images/product/black-watch.jpg": {
    "type": "image/jpeg",
    "etag": "\"26d6-wYqXhpK7Lj+BevFQgndunRRTGRc\"",
    "mtime": "2023-07-20T08:27:27.093Z",
    "size": 9942,
    "path": "../public/images/product/black-watch.jpg"
  },
  "/images/product/blue-band.jpg": {
    "type": "image/jpeg",
    "etag": "\"c7f-O6LFsQxaaw5+8b3doyr8SlK2OfY\"",
    "mtime": "2023-07-20T08:27:27.093Z",
    "size": 3199,
    "path": "../public/images/product/blue-band.jpg"
  },
  "/images/product/blue-t-shirt.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d99-aE5u8igXFyMz0G4PDmcPDqzRADs\"",
    "mtime": "2023-07-20T08:27:27.094Z",
    "size": 7577,
    "path": "../public/images/product/blue-t-shirt.jpg"
  },
  "/images/product/bracelet.jpg": {
    "type": "image/jpeg",
    "etag": "\"1285-V/9b6A56DEMQYqFJGxuLwv6QGbw\"",
    "mtime": "2023-07-20T08:27:27.095Z",
    "size": 4741,
    "path": "../public/images/product/bracelet.jpg"
  },
  "/images/product/brown-purse.jpg": {
    "type": "image/jpeg",
    "etag": "\"1658-Xc9MIzXV5zR5khtNFQX/a5FW+xI\"",
    "mtime": "2023-07-20T08:27:27.096Z",
    "size": 5720,
    "path": "../public/images/product/brown-purse.jpg"
  },
  "/images/product/chakra-bracelet.jpg": {
    "type": "image/jpeg",
    "etag": "\"11eb-n3VWiti5fzXRzSefeq7H73yHxXc\"",
    "mtime": "2023-07-20T08:27:27.098Z",
    "size": 4587,
    "path": "../public/images/product/chakra-bracelet.jpg"
  },
  "/images/product/galaxy-earrings.jpg": {
    "type": "image/jpeg",
    "etag": "\"c88-lmqAhPNhOiQognxokcWpoZel4A0\"",
    "mtime": "2023-07-20T08:27:27.099Z",
    "size": 3208,
    "path": "../public/images/product/galaxy-earrings.jpg"
  },
  "/images/product/game-controller.jpg": {
    "type": "image/jpeg",
    "etag": "\"f8e-SgYLUPwd7B/5Fc/ovrtQE8QO2uU\"",
    "mtime": "2023-07-20T08:27:27.099Z",
    "size": 3982,
    "path": "../public/images/product/game-controller.jpg"
  },
  "/images/product/gaming-set.jpg": {
    "type": "image/jpeg",
    "etag": "\"253a-mhSEr133Kac6BvJVkNn4Q9rH5hY\"",
    "mtime": "2023-07-20T08:27:27.101Z",
    "size": 9530,
    "path": "../public/images/product/gaming-set.jpg"
  },
  "/images/product/gold-phone-case.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e8a-LCmcZOwzwckd26fygjfsbjFB3js\"",
    "mtime": "2023-07-20T08:27:27.101Z",
    "size": 7818,
    "path": "../public/images/product/gold-phone-case.jpg"
  },
  "/images/product/green-earbuds.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b54-pNaiZ4xYvbdVM8VUecGYamewN4w\"",
    "mtime": "2023-07-20T08:27:27.102Z",
    "size": 6996,
    "path": "../public/images/product/green-earbuds.jpg"
  },
  "/images/product/green-t-shirt.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c5f-joyQPkVUInNfgHLA9qEbiPYOgFE\"",
    "mtime": "2023-07-20T08:27:27.102Z",
    "size": 7263,
    "path": "../public/images/product/green-t-shirt.jpg"
  },
  "/images/product/grey-t-shirt.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ca2-ZjZj+ucp5mbiF5f7qCUsJWocWQM\"",
    "mtime": "2023-07-20T08:27:27.103Z",
    "size": 7330,
    "path": "../public/images/product/grey-t-shirt.jpg"
  },
  "/images/product/headphones.jpg": {
    "type": "image/jpeg",
    "etag": "\"1191-NoCT/bq+sAMThcdjcgwS6Y3wMhw\"",
    "mtime": "2023-07-20T08:27:27.104Z",
    "size": 4497,
    "path": "../public/images/product/headphones.jpg"
  },
  "/images/product/light-green-t-shirt.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cb3-7ttrCaqf3DI2dz5C2P8IPkjSO9s\"",
    "mtime": "2023-07-20T08:27:27.105Z",
    "size": 7347,
    "path": "../public/images/product/light-green-t-shirt.jpg"
  },
  "/images/product/lime-band.jpg": {
    "type": "image/jpeg",
    "etag": "\"c8c-D6EO6O02ejikQI2fd4JaUm+WPCw\"",
    "mtime": "2023-07-20T08:27:27.106Z",
    "size": 3212,
    "path": "../public/images/product/lime-band.jpg"
  },
  "/images/product/mini-speakers.jpg": {
    "type": "image/jpeg",
    "etag": "\"e64-+XlZrrbArz7vG4StUQNEgFMKtCM\"",
    "mtime": "2023-07-20T08:27:27.106Z",
    "size": 3684,
    "path": "../public/images/product/mini-speakers.jpg"
  },
  "/images/product/painted-phone-case.jpg": {
    "type": "image/jpeg",
    "etag": "\"24ef-lJDXrtAV62DOqJux3ZDUGgBg8Iw\"",
    "mtime": "2023-07-20T08:27:27.108Z",
    "size": 9455,
    "path": "../public/images/product/painted-phone-case.jpg"
  },
  "/images/product/pink-band.jpg": {
    "type": "image/jpeg",
    "etag": "\"c15-j/dDSBmJ7Eyg1145bTfVikEz18A\"",
    "mtime": "2023-07-20T08:27:27.108Z",
    "size": 3093,
    "path": "../public/images/product/pink-band.jpg"
  },
  "/images/product/pink-purse.jpg": {
    "type": "image/jpeg",
    "etag": "\"123c-lGIS0uYKcDXVdY4u9i9KCqDZjok\"",
    "mtime": "2023-07-20T08:27:27.109Z",
    "size": 4668,
    "path": "../public/images/product/pink-purse.jpg"
  },
  "/images/product/product-placeholder.svg": {
    "type": "image/svg+xml",
    "etag": "\"42f-77QeJc9dPDfWksJyFW7vFSx2iYw\"",
    "mtime": "2023-07-20T08:27:27.110Z",
    "size": 1071,
    "path": "../public/images/product/product-placeholder.svg"
  },
  "/images/product/purple-band.jpg": {
    "type": "image/jpeg",
    "etag": "\"d08-3VNjwM6zWVbSmXIAqSrgRTPdl4U\"",
    "mtime": "2023-07-20T08:27:27.110Z",
    "size": 3336,
    "path": "../public/images/product/purple-band.jpg"
  },
  "/images/product/purple-gemstone-necklace.jpg": {
    "type": "image/jpeg",
    "etag": "\"c0c-w/30glZ+BnjXCc+suHI61SL4U+g\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 3084,
    "path": "../public/images/product/purple-gemstone-necklace.jpg"
  },
  "/images/product/purple-t-shirt.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d62-5Pixm6demlZDQeoq77U1iMr9sS4\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 7522,
    "path": "../public/images/product/purple-t-shirt.jpg"
  },
  "/images/product/shoes.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ac7-W9LiJN2GZyP1chmVYanKBIN9EYI\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 6855,
    "path": "../public/images/product/shoes.jpg"
  },
  "/images/product/sneakers.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b9b-sTNfOuXQs5rTLWO7lLLhZj+fkJk\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 7067,
    "path": "../public/images/product/sneakers.jpg"
  },
  "/images/product/teal-t-shirt.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d4a-RMnV8+630XIpqdzS0RKYu+wtdug\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 7498,
    "path": "../public/images/product/teal-t-shirt.jpg"
  },
  "/images/product/yellow-earbuds.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c05-alZyBMG1QYnKxIugzNJuDuwUUqE\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 7173,
    "path": "../public/images/product/yellow-earbuds.jpg"
  },
  "/images/product/yoga-mat.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b06-uIlvG4d2+5G8ANHsul1PBJyXRus\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 6918,
    "path": "../public/images/product/yoga-mat.jpg"
  },
  "/images/product/yoga-set.jpg": {
    "type": "image/jpeg",
    "etag": "\"140d-xRVo1NSOzFDn/fAiDBU6uLt6lzU\"",
    "mtime": "2023-07-20T08:27:27.111Z",
    "size": 5133,
    "path": "../public/images/product/yoga-set.jpg"
  },
  "/images/team/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"3890-5w6xQpFPfaTyC4cbTGaRhgNgjSE\"",
    "mtime": "2024-01-10T09:46:39.056Z",
    "size": 14480,
    "path": "../public/images/team/t1.jpg"
  },
  "/images/team/t2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f32-9Lxso2ni4ZcD0XrExsl9VKL/TO4\"",
    "mtime": "2024-01-10T09:46:39.071Z",
    "size": 12082,
    "path": "../public/images/team/t2.jpg"
  },
  "/images/team/t3.jpg": {
    "type": "image/jpeg",
    "etag": "\"28ec-tZm6RaVYc5nOXRIXBR1pAeXwXls\"",
    "mtime": "2024-01-10T09:46:39.071Z",
    "size": 10476,
    "path": "../public/images/team/t3.jpg"
  },
  "/images/team/t4.jpg": {
    "type": "image/jpeg",
    "etag": "\"3bf3-8AkUEdpBIA8eZuyRVUTrRuLieqo\"",
    "mtime": "2024-01-10T09:46:39.087Z",
    "size": 15347,
    "path": "../public/images/team/t4.jpg"
  },
  "/images/testimonial/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7aba-Z2kghsmd6jT6lUbdS4PEU//gqjs\"",
    "mtime": "2024-01-10T09:46:39.103Z",
    "size": 31418,
    "path": "../public/images/testimonial/1.jpg"
  },
  "/images/testimonial/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"11ce9-jQ7gNLkDWl7ip+V79loVinily1U\"",
    "mtime": "2024-01-10T09:46:39.119Z",
    "size": 72937,
    "path": "../public/images/testimonial/2.jpg"
  },
  "/images/testimonial/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"138fe-w9zqsUQPG4yoxgoDNojvLFEwbwI\"",
    "mtime": "2024-01-10T09:46:39.135Z",
    "size": 80126,
    "path": "../public/images/testimonial/3.jpg"
  },
  "/images/widgets/user-card.jpg": {
    "type": "image/jpeg",
    "etag": "\"28699e-bTYNljHWk7yKp2AbtHONar4wuuM\"",
    "mtime": "2023-07-20T08:27:27.310Z",
    "size": 2648478,
    "path": "../public/images/widgets/user-card.jpg"
  },
  "/images/themes/arya-blue.png": {
    "type": "image/png",
    "etag": "\"200b-jKa4QhSup0uvJhCkmCQ0bp52zlY\"",
    "mtime": "2023-07-20T08:27:27.260Z",
    "size": 8203,
    "path": "../public/images/themes/arya-blue.png"
  },
  "/images/themes/arya-green.png": {
    "type": "image/png",
    "etag": "\"1f86-FQlYknEq23q539P3DW5PCABdeKE\"",
    "mtime": "2023-07-20T08:27:27.261Z",
    "size": 8070,
    "path": "../public/images/themes/arya-green.png"
  },
  "/images/themes/arya-orange.png": {
    "type": "image/png",
    "etag": "\"1f26-h79nSB27rQKcEnag4tKGfO3e0fc\"",
    "mtime": "2023-07-20T08:27:27.261Z",
    "size": 7974,
    "path": "../public/images/themes/arya-orange.png"
  },
  "/images/themes/arya-purple.png": {
    "type": "image/png",
    "etag": "\"1f3d-OBLYx6hTveg9dTZ9/bctAGfxbrQ\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 7997,
    "path": "../public/images/themes/arya-purple.png"
  },
  "/images/themes/bootstrap4-dark-blue.svg": {
    "type": "image/svg+xml",
    "etag": "\"665-86YngM2ZW3g5WPe5B4BNA9R+kGM\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 1637,
    "path": "../public/images/themes/bootstrap4-dark-blue.svg"
  },
  "/images/themes/bootstrap4-dark-purple.svg": {
    "type": "image/svg+xml",
    "etag": "\"64d-+eQcGvw7JeOJiExd0TT/m4VtkYs\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 1613,
    "path": "../public/images/themes/bootstrap4-dark-purple.svg"
  },
  "/images/themes/bootstrap4-light-blue.svg": {
    "type": "image/svg+xml",
    "etag": "\"663-5BwoCheXVImwKQgs88wnhFk64QI\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 1635,
    "path": "../public/images/themes/bootstrap4-light-blue.svg"
  },
  "/images/themes/bootstrap4-light-purple.svg": {
    "type": "image/svg+xml",
    "etag": "\"64b-5/6bW3l4AE2RSSKou1jK11Y0RQU\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 1611,
    "path": "../public/images/themes/bootstrap4-light-purple.svg"
  },
  "/images/themes/fluent-light.png": {
    "type": "image/png",
    "etag": "\"4d69-G/VM3L+SD3O9vV6z7V7YcQZe2Dc\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 19817,
    "path": "../public/images/themes/fluent-light.png"
  },
  "/images/themes/lara-dark-blue.png": {
    "type": "image/png",
    "etag": "\"8db-QvB6MIVXI3mdrGK6vPZukCk9ojQ\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 2267,
    "path": "../public/images/themes/lara-dark-blue.png"
  },
  "/images/themes/lara-dark-indigo.png": {
    "type": "image/png",
    "etag": "\"911-mwx1LcOfhJoc+EzC8Hd6j4snq3g\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 2321,
    "path": "../public/images/themes/lara-dark-indigo.png"
  },
  "/images/themes/lara-dark-purple.png": {
    "type": "image/png",
    "etag": "\"8ef-6M7GSttKk0AucJzqWxwRoxJwXVg\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 2287,
    "path": "../public/images/themes/lara-dark-purple.png"
  },
  "/images/themes/lara-dark-teal.png": {
    "type": "image/png",
    "etag": "\"91e-/rJwWvFnClbdt7pGnuLaQhF8/2M\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 2334,
    "path": "../public/images/themes/lara-dark-teal.png"
  },
  "/images/themes/lara-light-blue.png": {
    "type": "image/png",
    "etag": "\"6a1-ZXjf99bSmG6orMP7SaG/tvQYbis\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 1697,
    "path": "../public/images/themes/lara-light-blue.png"
  },
  "/images/themes/lara-light-indigo.png": {
    "type": "image/png",
    "etag": "\"6d2-eLytEIUXbdmvMTztXccnL3WcFM8\"",
    "mtime": "2023-07-20T08:27:27.263Z",
    "size": 1746,
    "path": "../public/images/themes/lara-light-indigo.png"
  },
  "/images/themes/lara-light-purple.png": {
    "type": "image/png",
    "etag": "\"687-pwQHOf5BskJ9yMdN8/5pespz/UQ\"",
    "mtime": "2023-07-20T08:27:27.271Z",
    "size": 1671,
    "path": "../public/images/themes/lara-light-purple.png"
  },
  "/images/themes/lara-light-teal.png": {
    "type": "image/png",
    "etag": "\"746-xP0QunfH0sa50vsqXYolh8zIlP8\"",
    "mtime": "2023-07-20T08:27:27.271Z",
    "size": 1862,
    "path": "../public/images/themes/lara-light-teal.png"
  },
  "/images/themes/luna-amber.png": {
    "type": "image/png",
    "etag": "\"263c-sYP9+kA85sGSiItXXYVf2gyEBN4\"",
    "mtime": "2023-07-20T08:27:27.271Z",
    "size": 9788,
    "path": "../public/images/themes/luna-amber.png"
  },
  "/images/themes/luna-blue.png": {
    "type": "image/png",
    "etag": "\"2617-PC/eY+seasKv3adkQq9HMbzdVPg\"",
    "mtime": "2023-07-20T08:27:27.271Z",
    "size": 9751,
    "path": "../public/images/themes/luna-blue.png"
  },
  "/images/themes/luna-green.png": {
    "type": "image/png",
    "etag": "\"2752-BmK/bVI6pVaz8K007HTpdQTYVYg\"",
    "mtime": "2023-07-20T08:27:27.271Z",
    "size": 10066,
    "path": "../public/images/themes/luna-green.png"
  },
  "/images/themes/luna-pink.png": {
    "type": "image/png",
    "etag": "\"25de-9JUVT0EtjWtu5z8y1sqWu0TWedc\"",
    "mtime": "2023-07-20T08:27:27.271Z",
    "size": 9694,
    "path": "../public/images/themes/luna-pink.png"
  },
  "/images/themes/md-dark-deeppurple.svg": {
    "type": "image/svg+xml",
    "etag": "\"248-a/1bDhtd6CgbAuty20QGxaKUd1o\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 584,
    "path": "../public/images/themes/md-dark-deeppurple.svg"
  },
  "/images/themes/md-dark-indigo.svg": {
    "type": "image/svg+xml",
    "etag": "\"248-4XNKdEVGPuXU+HLdoZ4OXOYaTeg\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 584,
    "path": "../public/images/themes/md-dark-indigo.svg"
  },
  "/images/themes/md-light-deeppurple.svg": {
    "type": "image/svg+xml",
    "etag": "\"248-ltClPpQ1MREvyb3kBupujMaCgJc\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 584,
    "path": "../public/images/themes/md-light-deeppurple.svg"
  },
  "/images/themes/md-light-indigo.svg": {
    "type": "image/svg+xml",
    "etag": "\"248-nHzoW3F6qCR+vrL4nGdySOjT3AM\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 584,
    "path": "../public/images/themes/md-light-indigo.svg"
  },
  "/images/themes/nova-accent.png": {
    "type": "image/png",
    "etag": "\"1121-CrDMiCqjCkaKcug/qOP9tBoVGuU\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 4385,
    "path": "../public/images/themes/nova-accent.png"
  },
  "/images/themes/nova-alt.png": {
    "type": "image/png",
    "etag": "\"886-wasahYtuRPqJoTMr3JuqNn4jwmk\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 2182,
    "path": "../public/images/themes/nova-alt.png"
  },
  "/images/themes/nova-vue.png": {
    "type": "image/png",
    "etag": "\"10a3-StEGdnmBa2MWztT+8b4M7fjjXNs\"",
    "mtime": "2023-07-20T08:27:27.275Z",
    "size": 4259,
    "path": "../public/images/themes/nova-vue.png"
  },
  "/images/themes/nova.png": {
    "type": "image/png",
    "etag": "\"75e-YFOM91YlE9wq7M8HQw+81jCIqY8\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 1886,
    "path": "../public/images/themes/nova.png"
  },
  "/images/themes/rhea.png": {
    "type": "image/png",
    "etag": "\"b58-B/XLQdKGWhV61t7hnr+7zoP0fr4\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 2904,
    "path": "../public/images/themes/rhea.png"
  },
  "/images/themes/saga-blue.png": {
    "type": "image/png",
    "etag": "\"3ca-DsutCqElgPvO+jYDOUGvdu5q4kY\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 970,
    "path": "../public/images/themes/saga-blue.png"
  },
  "/images/themes/saga-green.png": {
    "type": "image/png",
    "etag": "\"3df-hlhmsi4P5v9eog4maePgoMSf3UA\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 991,
    "path": "../public/images/themes/saga-green.png"
  },
  "/images/themes/saga-orange.png": {
    "type": "image/png",
    "etag": "\"3af-fvkWeOyXdI6ZAKQ7dI8Dwgpps6A\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 943,
    "path": "../public/images/themes/saga-orange.png"
  },
  "/images/themes/saga-purple.png": {
    "type": "image/png",
    "etag": "\"423-PUr3iRq+T68Xfgjunh4oZm+c25k\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 1059,
    "path": "../public/images/themes/saga-purple.png"
  },
  "/images/themes/tailwind-light.png": {
    "type": "image/png",
    "etag": "\"e12-Ra/tTBrdqzYPSX3fB0gH7dY9yQw\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 3602,
    "path": "../public/images/themes/tailwind-light.png"
  },
  "/images/themes/vela-blue.png": {
    "type": "image/png",
    "etag": "\"56d-Rwa8gZmPL5glBr6bW5Bbs/RtbqQ\"",
    "mtime": "2023-07-20T08:27:27.280Z",
    "size": 1389,
    "path": "../public/images/themes/vela-blue.png"
  },
  "/images/themes/vela-green.png": {
    "type": "image/png",
    "etag": "\"510-m/Pfnh/KiP+oUSLOo9Jms17gYUQ\"",
    "mtime": "2023-07-20T08:27:27.286Z",
    "size": 1296,
    "path": "../public/images/themes/vela-green.png"
  },
  "/images/themes/vela-orange.png": {
    "type": "image/png",
    "etag": "\"5f0-tvTDkjezsQNnr0grSJDLpnjatBk\"",
    "mtime": "2023-07-20T08:27:27.286Z",
    "size": 1520,
    "path": "../public/images/themes/vela-orange.png"
  },
  "/images/themes/vela-purple.png": {
    "type": "image/png",
    "etag": "\"510-8eBN/LG2XP22dWGyL5W7JI03dWw\"",
    "mtime": "2023-07-20T08:27:27.286Z",
    "size": 1296,
    "path": "../public/images/themes/vela-purple.png"
  },
  "/themes/arya-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28774-HYQKGLWFqa9VhmeOEEmesSCyomY\"",
    "mtime": "2023-07-20T08:27:27.370Z",
    "size": 165748,
    "path": "../public/themes/arya-blue/theme.css"
  },
  "/themes/arya-green/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28773-QuOO2QBprUsu+4+a+YLT68ebXWg\"",
    "mtime": "2023-07-20T08:27:27.370Z",
    "size": 165747,
    "path": "../public/themes/arya-green/theme.css"
  },
  "/themes/arya-orange/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28750-ki1JS4h0r+EV+p5B0cYQHiC2yu8\"",
    "mtime": "2023-07-20T08:27:27.370Z",
    "size": 165712,
    "path": "../public/themes/arya-orange/theme.css"
  },
  "/themes/arya-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28774-YAJKcpRrFejWMFYOaDBaU0a7zl8\"",
    "mtime": "2023-07-20T08:27:27.370Z",
    "size": 165748,
    "path": "../public/themes/arya-purple/theme.css"
  },
  "/themes/bootstrap4-dark-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27504-uxC55BAwUvAYCshfH5QAxDO/8Ag\"",
    "mtime": "2023-07-20T08:27:27.379Z",
    "size": 161028,
    "path": "../public/themes/bootstrap4-dark-blue/theme.css"
  },
  "/themes/bootstrap4-dark-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27504-W44OdsOSgHe5bZJauT3v26uPsh8\"",
    "mtime": "2023-07-20T08:27:27.383Z",
    "size": 161028,
    "path": "../public/themes/bootstrap4-dark-purple/theme.css"
  },
  "/themes/bootstrap4-light-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26334-hzv3Pa74N0X4E884U6O81CO4RrY\"",
    "mtime": "2023-07-20T08:27:27.386Z",
    "size": 156468,
    "path": "../public/themes/bootstrap4-light-blue/theme.css"
  },
  "/themes/bootstrap4-light-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26338-r9DZnoffDbij4gz/Kvv2Lppvyb4\"",
    "mtime": "2023-07-20T08:27:27.388Z",
    "size": 156472,
    "path": "../public/themes/bootstrap4-light-purple/theme.css"
  },
  "/themes/fluent-light/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26fb5-+cpzKT5/o5XkUulexreH1AbKdCE\"",
    "mtime": "2023-07-20T08:27:27.390Z",
    "size": 159669,
    "path": "../public/themes/fluent-light/theme.css"
  },
  "/themes/lara-dark-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29326-vhE8azIe5oZBE+T3rD/I0GoHFE8\"",
    "mtime": "2023-07-20T08:27:27.412Z",
    "size": 168742,
    "path": "../public/themes/lara-dark-blue/theme.css"
  },
  "/themes/lara-dark-indigo/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29325-BLCMQU8lNqWD43iG7ZO4PqqJriU\"",
    "mtime": "2023-07-20T08:27:27.427Z",
    "size": 168741,
    "path": "../public/themes/lara-dark-indigo/theme.css"
  },
  "/themes/lara-dark-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29325-zBAIC19mz+LgI8crkfADx8ongmM\"",
    "mtime": "2023-07-20T08:27:27.450Z",
    "size": 168741,
    "path": "../public/themes/lara-dark-purple/theme.css"
  },
  "/themes/lara-dark-teal/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"292ae-IUrceF35+fp4XQmpTMN8Vx1HKzI\"",
    "mtime": "2023-07-20T08:27:27.510Z",
    "size": 168622,
    "path": "../public/themes/lara-dark-teal/theme.css"
  },
  "/themes/lara-light-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2657e-ptbOKsaRsTqXYhhNq+VcXK9vJwk\"",
    "mtime": "2023-07-20T08:27:27.530Z",
    "size": 157054,
    "path": "../public/themes/lara-light-blue/theme.css"
  },
  "/themes/lara-light-indigo/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2657e-e1HqNoU2CS8EgExKk5zzO7i0dN8\"",
    "mtime": "2023-07-20T08:27:27.554Z",
    "size": 157054,
    "path": "../public/themes/lara-light-indigo/theme.css"
  },
  "/themes/lara-light-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2657e-nz8BxsvPCTVAutnyvE5v8FoMT98\"",
    "mtime": "2023-07-20T08:27:27.574Z",
    "size": 157054,
    "path": "../public/themes/lara-light-purple/theme.css"
  },
  "/themes/lara-light-teal/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2657e-BXBpp/1WXknVR3hc78Mce4WNjxo\"",
    "mtime": "2023-07-20T08:27:27.592Z",
    "size": 157054,
    "path": "../public/themes/lara-light-teal/theme.css"
  },
  "/themes/luna-amber/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25ebc-EdvBhkK1uQaMlAb6CKMQRzLWYHI\"",
    "mtime": "2023-07-20T08:27:27.596Z",
    "size": 155324,
    "path": "../public/themes/luna-amber/theme.css"
  },
  "/themes/luna-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25ebc-vKDxPGXtZKKLH/WCN3H3Ih8O0cA\"",
    "mtime": "2023-07-20T08:27:27.598Z",
    "size": 155324,
    "path": "../public/themes/luna-blue/theme.css"
  },
  "/themes/luna-green/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25ebc-8H5lKiPYTC11lVc1iwClXcvijFM\"",
    "mtime": "2023-07-20T08:27:27.599Z",
    "size": 155324,
    "path": "../public/themes/luna-green/theme.css"
  },
  "/themes/luna-pink/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25ebc-PWA81vu7H1asYXiyh9GW6IP7X9Y\"",
    "mtime": "2023-07-20T08:27:27.602Z",
    "size": 155324,
    "path": "../public/themes/luna-pink/theme.css"
  },
  "/themes/md-dark-deeppurple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"37a8a-sM6PQcwRwWroYRTL4WzMwRUX23o\"",
    "mtime": "2023-07-20T08:27:27.609Z",
    "size": 227978,
    "path": "../public/themes/md-dark-deeppurple/theme.css"
  },
  "/themes/md-dark-indigo/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"37a89-pcNgxo/kPWPMTnCWixYk9GjJGHM\"",
    "mtime": "2023-07-20T08:27:27.617Z",
    "size": 227977,
    "path": "../public/themes/md-dark-indigo/theme.css"
  },
  "/themes/md-light-deeppurple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36474-99DJoYQ8PUPsiv0dwiQ+cL/iH6k\"",
    "mtime": "2023-07-20T08:27:27.623Z",
    "size": 222324,
    "path": "../public/themes/md-light-deeppurple/theme.css"
  },
  "/themes/md-light-indigo/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36428-Hxf/DEPsUIoVnIdqq9NpPrFh8xc\"",
    "mtime": "2023-07-20T08:27:27.631Z",
    "size": 222248,
    "path": "../public/themes/md-light-indigo/theme.css"
  },
  "/themes/mdc-dark-deeppurple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"37cd2-OjVD+ywMZ1yNcA+D8ptBycn8yjQ\"",
    "mtime": "2023-07-20T08:27:27.638Z",
    "size": 228562,
    "path": "../public/themes/mdc-dark-deeppurple/theme.css"
  },
  "/themes/mdc-dark-indigo/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"37cd1-JvhcSJEUmqwaoQgpdAhpsqhSjKg\"",
    "mtime": "2023-07-20T08:27:27.645Z",
    "size": 228561,
    "path": "../public/themes/mdc-dark-indigo/theme.css"
  },
  "/themes/mdc-light-deeppurple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"366bc-SMMqwDg8FjdbtMP9g/VbPSGJuf4\"",
    "mtime": "2023-07-20T08:27:27.651Z",
    "size": 222908,
    "path": "../public/themes/mdc-light-deeppurple/theme.css"
  },
  "/themes/mdc-light-indigo/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36670-0EVb6kCjHwNnlanqE3azAcF2RvU\"",
    "mtime": "2023-07-20T08:27:27.656Z",
    "size": 222832,
    "path": "../public/themes/mdc-light-indigo/theme.css"
  },
  "/themes/nova/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25dfb-vfwpxn+dFgfu/18WBs+KIRjvQC0\"",
    "mtime": "2023-07-20T08:27:27.668Z",
    "size": 155131,
    "path": "../public/themes/nova/theme.css"
  },
  "/themes/nova-accent/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25fac-lg0rPbTtXV5xo9XYp/BWgvnmnXc\"",
    "mtime": "2023-07-20T08:27:27.659Z",
    "size": 155564,
    "path": "../public/themes/nova-accent/theme.css"
  },
  "/themes/nova-alt/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25f43-/JglpX3YdOY7e0XmUpr+NbERsus\"",
    "mtime": "2023-07-20T08:27:27.663Z",
    "size": 155459,
    "path": "../public/themes/nova-alt/theme.css"
  },
  "/themes/nova-vue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"25dff-69kuFUVxlgiqam5uSeRYtyRJwpc\"",
    "mtime": "2023-07-20T08:27:27.666Z",
    "size": 155135,
    "path": "../public/themes/nova-vue/theme.css"
  },
  "/themes/rhea/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2605e-Pho5g314j1sgPxcFK9+cxZuNwT8\"",
    "mtime": "2023-07-20T08:27:27.670Z",
    "size": 155742,
    "path": "../public/themes/rhea/theme.css"
  },
  "/themes/saga-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2679f-d+qKsw8AqXyuVqGRs90KxnczrKM\"",
    "mtime": "2023-07-20T08:27:27.673Z",
    "size": 157599,
    "path": "../public/themes/saga-blue/theme.css"
  },
  "/themes/saga-green/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2679b-v1j2GHD6/3cncLkApLZMs+p9ekY\"",
    "mtime": "2023-07-20T08:27:27.676Z",
    "size": 157595,
    "path": "../public/themes/saga-green/theme.css"
  },
  "/themes/saga-orange/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2679b-3bMAUKvHqhJ7sHZV7PnnjIUpKMc\"",
    "mtime": "2023-07-20T08:27:27.679Z",
    "size": 157595,
    "path": "../public/themes/saga-orange/theme.css"
  },
  "/themes/saga-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2679f-JjAwX9HekBQ8nVNdGiK2EHxUt50\"",
    "mtime": "2023-07-20T08:27:27.681Z",
    "size": 157599,
    "path": "../public/themes/saga-purple/theme.css"
  },
  "/themes/tailwind-light/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26bc5-gaNK062Kw2J3bs1sFjw55JC+5/E\"",
    "mtime": "2023-07-20T08:27:27.700Z",
    "size": 158661,
    "path": "../public/themes/tailwind-light/theme.css"
  },
  "/themes/vela-blue/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2872c-MSTrLu9ZTW1ZqhE9TFe4EsC+yhk\"",
    "mtime": "2023-07-20T08:27:27.702Z",
    "size": 165676,
    "path": "../public/themes/vela-blue/theme.css"
  },
  "/themes/vela-green/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2872b-vZdLD39iFkqfvAHukES4tw1WJe0\"",
    "mtime": "2023-07-20T08:27:27.705Z",
    "size": 165675,
    "path": "../public/themes/vela-green/theme.css"
  },
  "/themes/vela-orange/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28708-5WTxDkZLmw0oinOQg+sLiSaez8k\"",
    "mtime": "2023-07-20T08:27:27.707Z",
    "size": 165640,
    "path": "../public/themes/vela-orange/theme.css"
  },
  "/themes/vela-purple/theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2872c-chv1n5hOmgBqmDARhRItcUcNmJs\"",
    "mtime": "2023-07-20T08:27:27.709Z",
    "size": 165676,
    "path": "../public/themes/vela-purple/theme.css"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-uggKZ4yLIDKM+8PPx2HPuuMRxdI\"",
    "mtime": "2024-02-14T14:21:52.183Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/images/blocks/hero/hero-1.png": {
    "type": "image/png",
    "etag": "\"9fe95-t3JEjmvyNnSs3kZaTRlv+7aStiE\"",
    "mtime": "2023-07-20T08:27:27.040Z",
    "size": 654997,
    "path": "../public/images/blocks/hero/hero-1.png"
  },
  "/images/blocks/logos/hyper.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d6-b8jpWEkMLpn3bMMZB3aTSYsLM70\"",
    "mtime": "2023-07-20T08:27:27.041Z",
    "size": 726,
    "path": "../public/images/blocks/logos/hyper.svg"
  },
  "/images/features/2/img1.jpg": {
    "type": "image/jpeg",
    "etag": "\"47fe-x9B0bPDQBIlGWAbFbn3Edi5pjZg\"",
    "mtime": "2024-01-10T09:46:38.820Z",
    "size": 18430,
    "path": "../public/images/features/2/img1.jpg"
  },
  "/images/features/2/img2.jpg": {
    "type": "image/jpeg",
    "etag": "\"49d9-VFqTO17/fgR5HMsWMRme/VBTvrU\"",
    "mtime": "2024-01-10T09:46:38.820Z",
    "size": 18905,
    "path": "../public/images/features/2/img2.jpg"
  },
  "/images/features/2/img3.jpg": {
    "type": "image/jpeg",
    "etag": "\"9643-qV25vjPyiM6NMVghdPCTalhBLHw\"",
    "mtime": "2024-01-10T09:46:38.835Z",
    "size": 38467,
    "path": "../public/images/features/2/img3.jpg"
  },
  "/images/features/2/img4.jpg": {
    "type": "image/jpeg",
    "etag": "\"4727-IhmXVnF7OBOusLIKKLUwtnh0B8c\"",
    "mtime": "2024-01-10T09:46:38.851Z",
    "size": 18215,
    "path": "../public/images/features/2/img4.jpg"
  },
  "/images/features/3/feature-img.jpg": {
    "type": "image/jpeg",
    "etag": "\"61ee-RDlMufoJsXSgQmPvVi1sOUk/eoc\"",
    "mtime": "2024-01-10T09:46:38.867Z",
    "size": 25070,
    "path": "../public/images/features/3/feature-img.jpg"
  },
  "/images/features/3/img1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e317-F8Y+Wy1sW+h3CylQbiRjFXDjkHU\"",
    "mtime": "2024-01-10T09:46:38.883Z",
    "size": 123671,
    "path": "../public/images/features/3/img1.jpg"
  },
  "/themes/lara-dark-blue/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.392Z",
    "size": 143208,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Bold.woff"
  },
  "/themes/lara-dark-blue/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.394Z",
    "size": 106140,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-dark-blue/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.396Z",
    "size": 140632,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Light.woff"
  },
  "/themes/lara-dark-blue/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.398Z",
    "size": 104332,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Light.woff2"
  },
  "/themes/lara-dark-blue/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.399Z",
    "size": 142552,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Medium.woff"
  },
  "/themes/lara-dark-blue/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.403Z",
    "size": 105924,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-dark-blue/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.405Z",
    "size": 133844,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Regular.woff"
  },
  "/themes/lara-dark-blue/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.407Z",
    "size": 98868,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-dark-blue/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.409Z",
    "size": 142932,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-dark-blue/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.411Z",
    "size": 105804,
    "path": "../public/themes/lara-dark-blue/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.414Z",
    "size": 143208,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Bold.woff"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.415Z",
    "size": 106140,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.416Z",
    "size": 140632,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Light.woff"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.417Z",
    "size": 104332,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Light.woff2"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.419Z",
    "size": 142552,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Medium.woff"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.421Z",
    "size": 105924,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.422Z",
    "size": 133844,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Regular.woff"
  },
  "/themes/lara-dark-indigo/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.424Z",
    "size": 98868,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-dark-indigo/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.425Z",
    "size": 142932,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-dark-indigo/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.427Z",
    "size": 105804,
    "path": "../public/themes/lara-dark-indigo/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-dark-purple/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.431Z",
    "size": 143208,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Bold.woff"
  },
  "/themes/lara-dark-purple/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.431Z",
    "size": 106140,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-dark-purple/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.431Z",
    "size": 140632,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Light.woff"
  },
  "/themes/lara-dark-purple/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.431Z",
    "size": 104332,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Light.woff2"
  },
  "/themes/lara-dark-purple/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.431Z",
    "size": 142552,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Medium.woff"
  },
  "/themes/lara-dark-purple/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.431Z",
    "size": 105924,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-dark-purple/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.441Z",
    "size": 133844,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Regular.woff"
  },
  "/themes/lara-dark-purple/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.442Z",
    "size": 98868,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-dark-purple/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.446Z",
    "size": 142932,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-dark-purple/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.450Z",
    "size": 105804,
    "path": "../public/themes/lara-dark-purple/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-dark-teal/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.453Z",
    "size": 143208,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Bold.woff"
  },
  "/themes/lara-dark-teal/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.453Z",
    "size": 106140,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-dark-teal/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.490Z",
    "size": 140632,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Light.woff"
  },
  "/themes/lara-dark-teal/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.497Z",
    "size": 104332,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Light.woff2"
  },
  "/themes/lara-dark-teal/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.500Z",
    "size": 142552,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Medium.woff"
  },
  "/themes/lara-dark-teal/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.500Z",
    "size": 105924,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-dark-teal/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.500Z",
    "size": 133844,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Regular.woff"
  },
  "/themes/lara-dark-teal/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.505Z",
    "size": 98868,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-dark-teal/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.505Z",
    "size": 142932,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-dark-teal/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.505Z",
    "size": 105804,
    "path": "../public/themes/lara-dark-teal/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-light-blue/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.510Z",
    "size": 143208,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Bold.woff"
  },
  "/themes/lara-light-blue/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.515Z",
    "size": 106140,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-light-blue/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.515Z",
    "size": 140632,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Light.woff"
  },
  "/themes/lara-light-blue/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.515Z",
    "size": 104332,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Light.woff2"
  },
  "/themes/lara-light-blue/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.520Z",
    "size": 142552,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Medium.woff"
  },
  "/themes/lara-light-blue/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.521Z",
    "size": 105924,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-light-blue/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.521Z",
    "size": 133844,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Regular.woff"
  },
  "/themes/lara-light-blue/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.528Z",
    "size": 98868,
    "path": "../public/themes/lara-light-blue/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-light-blue/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.529Z",
    "size": 142932,
    "path": "../public/themes/lara-light-blue/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-light-blue/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.530Z",
    "size": 105804,
    "path": "../public/themes/lara-light-blue/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-light-indigo/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.530Z",
    "size": 143208,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Bold.woff"
  },
  "/themes/lara-light-indigo/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.530Z",
    "size": 106140,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-light-indigo/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.538Z",
    "size": 140632,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Light.woff"
  },
  "/themes/lara-light-indigo/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.540Z",
    "size": 104332,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Light.woff2"
  },
  "/themes/lara-light-indigo/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.542Z",
    "size": 142552,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Medium.woff"
  },
  "/themes/lara-light-indigo/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.544Z",
    "size": 105924,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-light-indigo/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.546Z",
    "size": 133844,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Regular.woff"
  },
  "/themes/lara-light-indigo/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.549Z",
    "size": 98868,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-light-indigo/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.552Z",
    "size": 142932,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-light-indigo/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.552Z",
    "size": 105804,
    "path": "../public/themes/lara-light-indigo/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-light-purple/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.556Z",
    "size": 143208,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Bold.woff"
  },
  "/themes/lara-light-purple/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.557Z",
    "size": 106140,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-light-purple/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.558Z",
    "size": 140632,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Light.woff"
  },
  "/themes/lara-light-purple/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.561Z",
    "size": 104332,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Light.woff2"
  },
  "/themes/lara-light-purple/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.564Z",
    "size": 142552,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Medium.woff"
  },
  "/themes/lara-light-purple/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.566Z",
    "size": 105924,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-light-purple/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.568Z",
    "size": 133844,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Regular.woff"
  },
  "/themes/lara-light-purple/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.569Z",
    "size": 98868,
    "path": "../public/themes/lara-light-purple/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-light-purple/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.570Z",
    "size": 142932,
    "path": "../public/themes/lara-light-purple/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-light-purple/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.572Z",
    "size": 105804,
    "path": "../public/themes/lara-light-purple/fonts/Inter-SemiBold.woff2"
  },
  "/themes/lara-light-teal/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.577Z",
    "size": 143208,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Bold.woff"
  },
  "/themes/lara-light-teal/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.579Z",
    "size": 106140,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Bold.woff2"
  },
  "/themes/lara-light-teal/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.580Z",
    "size": 140632,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Light.woff"
  },
  "/themes/lara-light-teal/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.581Z",
    "size": 104332,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Light.woff2"
  },
  "/themes/lara-light-teal/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.584Z",
    "size": 142552,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Medium.woff"
  },
  "/themes/lara-light-teal/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.586Z",
    "size": 105924,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Medium.woff2"
  },
  "/themes/lara-light-teal/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.587Z",
    "size": 133844,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Regular.woff"
  },
  "/themes/lara-light-teal/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.588Z",
    "size": 98868,
    "path": "../public/themes/lara-light-teal/fonts/Inter-Regular.woff2"
  },
  "/themes/lara-light-teal/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.589Z",
    "size": 142932,
    "path": "../public/themes/lara-light-teal/fonts/Inter-SemiBold.woff"
  },
  "/themes/lara-light-teal/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.590Z",
    "size": 105804,
    "path": "../public/themes/lara-light-teal/fonts/Inter-SemiBold.woff2"
  },
  "/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.603Z",
    "size": 29076,
    "path": "../public/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.604Z",
    "size": 22732,
    "path": "../public/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.605Z",
    "size": 29092,
    "path": "../public/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.606Z",
    "size": 22724,
    "path": "../public/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.606Z",
    "size": 29040,
    "path": "../public/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.607Z",
    "size": 22644,
    "path": "../public/themes/md-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.611Z",
    "size": 29076,
    "path": "../public/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.612Z",
    "size": 22732,
    "path": "../public/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.613Z",
    "size": 29092,
    "path": "../public/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.614Z",
    "size": 22724,
    "path": "../public/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.614Z",
    "size": 29040,
    "path": "../public/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.615Z",
    "size": 22644,
    "path": "../public/themes/md-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.618Z",
    "size": 29076,
    "path": "../public/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.619Z",
    "size": 22732,
    "path": "../public/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.620Z",
    "size": 29092,
    "path": "../public/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.620Z",
    "size": 22724,
    "path": "../public/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.621Z",
    "size": 29040,
    "path": "../public/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.622Z",
    "size": 22644,
    "path": "../public/themes/md-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.625Z",
    "size": 29076,
    "path": "../public/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.626Z",
    "size": 22732,
    "path": "../public/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.627Z",
    "size": 29092,
    "path": "../public/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.628Z",
    "size": 22724,
    "path": "../public/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.628Z",
    "size": 29040,
    "path": "../public/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.629Z",
    "size": 22644,
    "path": "../public/themes/md-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.633Z",
    "size": 29076,
    "path": "../public/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.633Z",
    "size": 22732,
    "path": "../public/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.634Z",
    "size": 29092,
    "path": "../public/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.634Z",
    "size": 22724,
    "path": "../public/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.635Z",
    "size": 29040,
    "path": "../public/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.635Z",
    "size": 22644,
    "path": "../public/themes/mdc-dark-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.639Z",
    "size": 29076,
    "path": "../public/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.639Z",
    "size": 22732,
    "path": "../public/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.640Z",
    "size": 29092,
    "path": "../public/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.640Z",
    "size": 22724,
    "path": "../public/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.642Z",
    "size": 29040,
    "path": "../public/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.643Z",
    "size": 22644,
    "path": "../public/themes/mdc-dark-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.646Z",
    "size": 29076,
    "path": "../public/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.646Z",
    "size": 22732,
    "path": "../public/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.647Z",
    "size": 29092,
    "path": "../public/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.647Z",
    "size": 22724,
    "path": "../public/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.648Z",
    "size": 29040,
    "path": "../public/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.648Z",
    "size": 22644,
    "path": "../public/themes/mdc-light-deeppurple/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-07-20T08:27:27.652Z",
    "size": 29076,
    "path": "../public/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff"
  },
  "/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-07-20T08:27:27.652Z",
    "size": 22732,
    "path": "../public/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-500.woff2"
  },
  "/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-07-20T08:27:27.652Z",
    "size": 29092,
    "path": "../public/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff"
  },
  "/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-07-20T08:27:27.653Z",
    "size": 22724,
    "path": "../public/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-700.woff2"
  },
  "/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-07-20T08:27:27.653Z",
    "size": 29040,
    "path": "../public/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff"
  },
  "/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-07-20T08:27:27.654Z",
    "size": 22644,
    "path": "../public/themes/mdc-light-indigo/fonts/roboto-v20-latin-ext_latin-regular.woff2"
  },
  "/themes/tailwind-light/fonts/Inter-Bold.woff": {
    "type": "font/woff",
    "etag": "\"22f68-5aSeWigRnpYFOabeC/j3K4EDYq8\"",
    "mtime": "2023-07-20T08:27:27.683Z",
    "size": 143208,
    "path": "../public/themes/tailwind-light/fonts/Inter-Bold.woff"
  },
  "/themes/tailwind-light/fonts/Inter-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"19e9c-HpSg36yLqwlH6psLb7Zj661czrU\"",
    "mtime": "2023-07-20T08:27:27.684Z",
    "size": 106140,
    "path": "../public/themes/tailwind-light/fonts/Inter-Bold.woff2"
  },
  "/themes/tailwind-light/fonts/Inter-Light.woff": {
    "type": "font/woff",
    "etag": "\"22558-mWNkQ5zXdyPf0tOUGUbmO2YSLp8\"",
    "mtime": "2023-07-20T08:27:27.686Z",
    "size": 140632,
    "path": "../public/themes/tailwind-light/fonts/Inter-Light.woff"
  },
  "/themes/tailwind-light/fonts/Inter-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"1978c-Cgzo3JK6byCvV+6zQeFgN1+XEmg\"",
    "mtime": "2023-07-20T08:27:27.687Z",
    "size": 104332,
    "path": "../public/themes/tailwind-light/fonts/Inter-Light.woff2"
  },
  "/themes/tailwind-light/fonts/Inter-Medium.woff": {
    "type": "font/woff",
    "etag": "\"22cd8-ytjPyE6/YQE4rvY+aUkJf/SNct0\"",
    "mtime": "2023-07-20T08:27:27.689Z",
    "size": 142552,
    "path": "../public/themes/tailwind-light/fonts/Inter-Medium.woff"
  },
  "/themes/tailwind-light/fonts/Inter-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"19dc4-krMFJzBLXcgPRemX4LGsTHARChg\"",
    "mtime": "2023-07-20T08:27:27.690Z",
    "size": 105924,
    "path": "../public/themes/tailwind-light/fonts/Inter-Medium.woff2"
  },
  "/themes/tailwind-light/fonts/Inter-Regular.woff": {
    "type": "font/woff",
    "etag": "\"20ad4-cppFUbnMWXnzk0cnnW/txmIL8UE\"",
    "mtime": "2023-07-20T08:27:27.692Z",
    "size": 133844,
    "path": "../public/themes/tailwind-light/fonts/Inter-Regular.woff"
  },
  "/themes/tailwind-light/fonts/Inter-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"18234-+WNIJgdR6nix0j6VV9spcpC9ryg\"",
    "mtime": "2023-07-20T08:27:27.694Z",
    "size": 98868,
    "path": "../public/themes/tailwind-light/fonts/Inter-Regular.woff2"
  },
  "/themes/tailwind-light/fonts/Inter-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"22e54-eulquZDHiB+ClHwb3Ef0F5S4SNc\"",
    "mtime": "2023-07-20T08:27:27.696Z",
    "size": 142932,
    "path": "../public/themes/tailwind-light/fonts/Inter-SemiBold.woff"
  },
  "/themes/tailwind-light/fonts/Inter-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"19d4c-36n489eb+KAAH+cu6trQSQy6Wcw\"",
    "mtime": "2023-07-20T08:27:27.698Z",
    "size": 105804,
    "path": "../public/themes/tailwind-light/fonts/Inter-SemiBold.woff2"
  },
  "/_nuxt/builds/meta/b59533b8-fff3-4663-bb15-84ab35cf2f07.json": {
    "type": "application/json",
    "etag": "\"8b-a9onCIEvA5CJLXSQEE0DFF+681o\"",
    "mtime": "2024-02-14T14:21:52.184Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/b59533b8-fff3-4663-bb15-84ab35cf2f07.json"
  }
};

function normalizeWindowsPath(input = "") {
  if (!input || !input.includes("\\")) {
    return input;
  }
  return input.replace(/\\/g, "/");
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_TNWD0I = () => import('../client-login.post.mjs');
const _lazy_9lbBmm = () => import('../client-logout.post.mjs');
const _lazy_khSBfe = () => import('../client-me.post.mjs');
const _lazy_QmwHSD = () => import('../login.post.mjs');
const _lazy_MQy8TW = () => import('../logout.post.mjs');
const _lazy_iytqbm = () => import('../me.post.mjs');
const _lazy_hio6tc = () => import('../passwordChange.post.mjs');
const _lazy_ySjY8O = () => import('../register.post.mjs');
const _lazy_JEitP1 = () => import('../registerMailer.post.mjs');
const _lazy_y2qRs7 = () => import('../verify-token.mjs');
const _lazy_kJvOrk = () => import('../civil.mjs');
const _lazy_YWLpHT = () => import('../individual.mjs');
const _lazy_TjZye2 = () => import('../test.mjs');
const _lazy_KBHfMW = () => import('../upload.mjs');
const _lazy_RcnCjp = () => import('../_image_.get.mjs');
const _lazy_yycQa6 = () => import('../all_approvers.mjs');
const _lazy_Q28xii = () => import('../all_originators.mjs');
const _lazy_3I2doC = () => import('../all.mjs');
const _lazy_6lQ1Mq = () => import('../buyers.mjs');
const _lazy_tWvBBn = () => import('../single.mjs');
const _lazy_1QXJSt = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/auth/client-login', handler: _lazy_TNWD0I, lazy: true, middleware: false, method: "post" },
  { route: '/auth/client-logout', handler: _lazy_9lbBmm, lazy: true, middleware: false, method: "post" },
  { route: '/auth/client-me', handler: _lazy_khSBfe, lazy: true, middleware: false, method: "post" },
  { route: '/auth/login', handler: _lazy_QmwHSD, lazy: true, middleware: false, method: "post" },
  { route: '/auth/logout', handler: _lazy_MQy8TW, lazy: true, middleware: false, method: "post" },
  { route: '/auth/me', handler: _lazy_iytqbm, lazy: true, middleware: false, method: "post" },
  { route: '/auth/passwordChange', handler: _lazy_hio6tc, lazy: true, middleware: false, method: "post" },
  { route: '/auth/register', handler: _lazy_ySjY8O, lazy: true, middleware: false, method: "post" },
  { route: '/auth/registerMailer', handler: _lazy_JEitP1, lazy: true, middleware: false, method: "post" },
  { route: '/auth/verify-token', handler: _lazy_y2qRs7, lazy: true, middleware: false, method: undefined },
  { route: '/emerald/civil', handler: _lazy_kJvOrk, lazy: true, middleware: false, method: undefined },
  { route: '/emerald/individual', handler: _lazy_YWLpHT, lazy: true, middleware: false, method: undefined },
  { route: '/emerald/test', handler: _lazy_TjZye2, lazy: true, middleware: false, method: undefined },
  { route: '/emerald/upload', handler: _lazy_KBHfMW, lazy: true, middleware: false, method: undefined },
  { route: '/images/:image', handler: _lazy_RcnCjp, lazy: true, middleware: false, method: "get" },
  { route: '/users/all_approvers', handler: _lazy_yycQa6, lazy: true, middleware: false, method: undefined },
  { route: '/users/all_originators', handler: _lazy_Q28xii, lazy: true, middleware: false, method: undefined },
  { route: '/users/all', handler: _lazy_3I2doC, lazy: true, middleware: false, method: undefined },
  { route: '/users/buyers', handler: _lazy_6lQ1Mq, lazy: true, middleware: false, method: undefined },
  { route: '/users/single', handler: _lazy_tWvBBn, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_1QXJSt, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_1QXJSt, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, parse as A, getRequestHeader as B, destr as C, isEqual as D, deleteCookie as E, parseQuery as F, withTrailingSlash as G, withoutTrailingSlash as H, nodeServer as I, setResponseStatus as a, getQuery as b, getRouterParams as c, defineEventHandler as d, eventHandler as e, setResponseHeader as f, getCookie as g, send as h, getResponseStatus as i, useNitroApp as j, setResponseHeaders as k, joinURL as l, createError$1 as m, getRouteRules as n, getResponseStatusText as o, hasProtocol as p, parseURL as q, readBody as r, setCookie as s, isScriptProtocol as t, useRuntimeConfig as u, defu as v, withQuery as w, sanitizeStatusCode as x, createHooks as y, klona as z };
//# sourceMappingURL=node-server.mjs.map

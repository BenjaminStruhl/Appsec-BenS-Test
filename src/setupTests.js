(function (PendoConfig) {
    var pendoModule = function (window, document, undefined) {
        function isStagingEnvironment(e) {
            return "staging" === e.environmentName
        }

        function isStagingServer(e, t) {
            if (e || (e = PendoConfig), isStagingEnvironment(e)) return !0;
            if (t || (t = window.location), hasHashedStagingServers(e))
                for (var n = getHash(t.host), i = 0, r = e[STAGING_SERVER_HASHES].length; r > i; ++i) {
                    var o = e[STAGING_SERVER_HASHES][i];
                    if (o === n) return !0
                }
            if (hasStagingServerConfig(e))
                for (var a = 0, s = e.stagingServers.length; s > a; ++a) {
                    var d = e.stagingServers[a];
                    if ("string" == typeof d && (d = new RegExp("^" + d + "$")), d instanceof RegExp && d.test(t.host)) return !0
                }
            return !1
        }

        function getHash(e) {
            return b64.uint8ToBase64(sha1.create().update(e).digest())
        }

        function hasHashedStagingServers(e) {
            return e && e.stagingAgentUrl && e[STAGING_SERVER_HASHES]
        }

        function hasStagingServerConfig(e) {
            return e && e.stagingAgentUrl && e.stagingServers
        }

        function enqueueCall(e, t) {
            var n = windowOrMountPoint.pendo = windowOrMountPoint.pendo || {},
                i = n._q = n._q || [],
                r = "initialize" === e ? "unshift" : "push";
            i[r]([].concat.apply([e], t))
        }

        function captureCall(e, t) {
            t[e] = t[e] || function () {
                enqueueCall(e, arguments)
            }
        }

        function loadStagingAgent(e) {
            if (isStagingEnvironment(e)) return !1;
            if (isStagingServer(e)) {
                var t = windowOrMountPoint.pendo = windowOrMountPoint.pendo || {};
                if (!t._q) {
                    var n, i, r = METHODS_TO_CAPTURE;
                    for (n = 0, i = r.length; i > n; ++n) captureCall(r[n], t)
                }
                return includeScript(e.stagingAgentUrl), !0
            }
            return !1
        }

        function includeScript(e) {
            var t = "script",
                n = document.createElement(t);
            n.async = !0, n.src = e;
            var i = document.getElementsByTagName(t)[0];
            i && i.parentNode ? i.parentNode.insertBefore(n, i) : (document.head || document.body).appendChild(n)
        }

        function getPendoConfigValue(e) {
            return "undefined" != typeof PendoConfig ? PendoConfig[e] : void 0
        }
        var sha1 = function (module) {
                return function () {
                    "use strict";

                    function Sha1(e) {
                        e ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, this.h4 = 3285377520, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0
                    }
                    var root = "object" == typeof window ? window : {},
                        NODE_JS = !root.JS_SHA1_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
                    NODE_JS && (root = global);
                    var COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && "object" == typeof module && module.exports,
                        AMD = "function" == typeof define && define.amd,
                        HEX_CHARS = "0123456789abcdef".split(""),
                        EXTRA = [-2147483648, 8388608, 32768, 128],
                        SHIFT = [24, 16, 8, 0],
                        OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
                        blocks = [],
                        createOutputMethod = function (e) {
                            return function (t) {
                                return new Sha1(!0).update(t)[e]()
                            }
                        },
                        createMethod = function () {
                            var e = createOutputMethod("hex");
                            NODE_JS && (e = nodeWrap(e)), e.create = function () {
                                return new Sha1
                            }, e.update = function (t) {
                                return e.create().update(t)
                            };
                            for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
                                var n = OUTPUT_TYPES[t];
                                e[n] = createOutputMethod(n)
                            }
                            return e
                        },
                        nodeWrap = function (method) {
                            var crypto = eval("require('crypto')"),
                                Buffer = eval("require('buffer').Buffer"),
                                nodeMethod = function (e) {
                                    if ("string" == typeof e) return crypto.createHash("sha1").update(e, "utf8").digest("hex");
                                    if (e.constructor === ArrayBuffer) e = new Uint8Array(e);
                                    else if (e.length === undefined) return method(e);
                                    return crypto.createHash("sha1").update(new Buffer(e)).digest("hex")
                                };
                            return nodeMethod
                        };
                    Sha1.prototype.update = function (e) {
                        if (!this.finalized) {
                            var t = "string" != typeof e;
                            t && e.constructor === root.ArrayBuffer && (e = new Uint8Array(e));
                            for (var n, i, r = 0, o = e.length || 0, a = this.blocks; o > r;) {
                                if (this.hashed && (this.hashed = !1, a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0), t)
                                    for (i = this.start; o > r && 64 > i; ++r) a[i >> 2] |= e[r] << SHIFT[3 & i++];
                                else
                                    for (i = this.start; o > r && 64 > i; ++r) n = e.charCodeAt(r), 128 > n ? a[i >> 2] |= n << SHIFT[3 & i++] : 2048 > n ? (a[i >> 2] |= (192 | n >> 6) << SHIFT[3 & i++], a[i >> 2] |= (128 | 63 & n) << SHIFT[3 & i++]) : 55296 > n || n >= 57344 ? (a[i >> 2] |= (224 | n >> 12) << SHIFT[3 & i++], a[i >> 2] |= (128 | n >> 6 & 63) << SHIFT[3 & i++], a[i >> 2] |= (128 | 63 & n) << SHIFT[3 & i++]) : (n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(++r)), a[i >> 2] |= (240 | n >> 18) << SHIFT[3 & i++], a[i >> 2] |= (128 | n >> 12 & 63) << SHIFT[3 & i++], a[i >> 2] |= (128 | n >> 6 & 63) << SHIFT[3 & i++], a[i >> 2] |= (128 | 63 & n) << SHIFT[3 & i++]);
                                this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.block = a[16], this.start = i - 64, this.hash(), this.hashed = !0) : this.start = i
                            }
                            return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
                        }
                    }, Sha1.prototype.finalize = function () {
                        if (!this.finalized) {
                            this.finalized = !0;
                            var e = this.blocks,
                                t = this.lastByteIndex;
                            e[16] = this.block, e[t >> 2] |= EXTRA[3 & t], this.block = e[16], t >= 56 && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash()
                        }
                    }, Sha1.prototype.hash = function () {
                        var e, t, n, i = this.h0,
                            r = this.h1,
                            o = this.h2,
                            a = this.h3,
                            s = this.h4,
                            d = this.blocks;
                        for (t = 16; 80 > t; ++t) n = d[t - 3] ^ d[t - 8] ^ d[t - 14] ^ d[t - 16], d[t] = n << 1 | n >>> 31;
                        for (t = 0; 20 > t; t += 5) e = r & o | ~r & a, n = i << 5 | i >>> 27, s = n + e + s + 1518500249 + d[t] << 0, r = r << 30 | r >>> 2, e = i & r | ~i & o, n = s << 5 | s >>> 27, a = n + e + a + 1518500249 + d[t + 1] << 0, i = i << 30 | i >>> 2, e = s & i | ~s & r, n = a << 5 | a >>> 27, o = n + e + o + 1518500249 + d[t + 2] << 0, s = s << 30 | s >>> 2, e = a & s | ~a & i, n = o << 5 | o >>> 27, r = n + e + r + 1518500249 + d[t + 3] << 0, a = a << 30 | a >>> 2, e = o & a | ~o & s, n = r << 5 | r >>> 27, i = n + e + i + 1518500249 + d[t + 4] << 0, o = o << 30 | o >>> 2;
                        for (; 40 > t; t += 5) e = r ^ o ^ a, n = i << 5 | i >>> 27, s = n + e + s + 1859775393 + d[t] << 0, r = r << 30 | r >>> 2, e = i ^ r ^ o, n = s << 5 | s >>> 27, a = n + e + a + 1859775393 + d[t + 1] << 0, i = i << 30 | i >>> 2, e = s ^ i ^ r, n = a << 5 | a >>> 27, o = n + e + o + 1859775393 + d[t + 2] << 0, s = s << 30 | s >>> 2, e = a ^ s ^ i, n = o << 5 | o >>> 27, r = n + e + r + 1859775393 + d[t + 3] << 0, a = a << 30 | a >>> 2, e = o ^ a ^ s, n = r << 5 | r >>> 27, i = n + e + i + 1859775393 + d[t + 4] << 0, o = o << 30 | o >>> 2;
                        for (; 60 > t; t += 5) e = r & o | r & a | o & a, n = i << 5 | i >>> 27, s = n + e + s - 1894007588 + d[t] << 0, r = r << 30 | r >>> 2, e = i & r | i & o | r & o, n = s << 5 | s >>> 27, a = n + e + a - 1894007588 + d[t + 1] << 0, i = i << 30 | i >>> 2, e = s & i | s & r | i & r, n = a << 5 | a >>> 27, o = n + e + o - 1894007588 + d[t + 2] << 0, s = s << 30 | s >>> 2, e = a & s | a & i | s & i, n = o << 5 | o >>> 27, r = n + e + r - 1894007588 + d[t + 3] << 0, a = a << 30 | a >>> 2, e = o & a | o & s | a & s, n = r << 5 | r >>> 27, i = n + e + i - 1894007588 + d[t + 4] << 0, o = o << 30 | o >>> 2;
                        for (; 80 > t; t += 5) e = r ^ o ^ a, n = i << 5 | i >>> 27, s = n + e + s - 899497514 + d[t] << 0, r = r << 30 | r >>> 2, e = i ^ r ^ o, n = s << 5 | s >>> 27, a = n + e + a - 899497514 + d[t + 1] << 0, i = i << 30 | i >>> 2, e = s ^ i ^ r, n = a << 5 | a >>> 27, o = n + e + o - 899497514 + d[t + 2] << 0, s = s << 30 | s >>> 2, e = a ^ s ^ i, n = o << 5 | o >>> 27, r = n + e + r - 899497514 + d[t + 3] << 0, a = a << 30 | a >>> 2, e = o ^ a ^ s, n = r << 5 | r >>> 27, i = n + e + i - 899497514 + d[t + 4] << 0, o = o << 30 | o >>> 2;
                        this.h0 = this.h0 + i << 0, this.h1 = this.h1 + r << 0, this.h2 = this.h2 + o << 0, this.h3 = this.h3 + a << 0, this.h4 = this.h4 + s << 0
                    }, Sha1.prototype.hex = function () {
                        this.finalize();
                        var e = this.h0,
                            t = this.h1,
                            n = this.h2,
                            i = this.h3,
                            r = this.h4;
                        return HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r]
                    }, Sha1.prototype.toString = Sha1.prototype.hex, Sha1.prototype.digest = function () {
                        this.finalize();
                        var e = this.h0,
                            t = this.h1,
                            n = this.h2,
                            i = this.h3,
                            r = this.h4;
                        return [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r]
                    }, Sha1.prototype.array = Sha1.prototype.digest, Sha1.prototype.arrayBuffer = function () {
                        this.finalize();
                        var e = new ArrayBuffer(20),
                            t = new DataView(e);
                        return t.setUint32(0, this.h0), t.setUint32(4, this.h1), t.setUint32(8, this.h2), t.setUint32(12, this.h3), t.setUint32(16, this.h4), e
                    };
                    var exports = createMethod();
                    COMMON_JS ? module.exports = exports : (root.sha1 = exports, AMD && define(function () {
                        return exports
                    }))
                }(), module.exports
            }({
                exports: {}
            }),
            b64 = function () {
                "use strict";

                function e(e) {
                    function n(e) {
                        return t[e >> 18 & 63] + t[e >> 12 & 63] + t[e >> 6 & 63] + t[63 & e]
                    }
                    var i, r, o, a = e.length % 3,
                        s = "";
                    for (i = 0, o = e.length - a; o > i; i += 3) r = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], s += n(r);
                    switch (a) {
                    case 1:
                        r = e[e.length - 1], s += t[r >> 2], s += t[r << 4 & 63];
                        break;
                    case 2:
                        r = (e[e.length - 2] << 8) + e[e.length - 1], s += t[r >> 10], s += t[r >> 4 & 63], s += t[r << 2 & 63]
                    }
                    return s
                }
                var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
                return {
                    uint8ToBase64: e
                }
            }(),
            STAGING_SERVER_HASHES = "stagingServerHashes",
            windowOrMountPoint = getPendoConfigValue("loadAsModule") ? {} : window,
            METHODS_TO_CAPTURE = ["initialize", "identify", "updateOptions", "pageLoad", "track", "clearSession"];
        return "undefined" != typeof PendoConfig && loadStagingAgent(PendoConfig) ? void 0 : (function () {
            "use strict";

            function isBetaAgent(e, t) {
                return !/prod/.test(e) || isStagingServer(t)
            }

            function isURL(e) {
                return e instanceof URL || e instanceof HTMLAnchorElement
            }

            function qAllObject(e) {
                var t = q.defer(),
                    n = _.isArray(e) ? [] : {},
                    i = _.size(e);
                if (!i) return q.resolve(e);
                var r = !1;
                return _.each(e, function (e, o) {
                    q.resolve(e).then(function (e) {
                        n[o] = e, 0 !== --i || r || t.resolve(n)
                    }, function (e) {
                        r || (r = !0, t.reject(e))
                    })
                }), t.promise
            }

            function Eventable() {
                var e = this._handlers = {};
                return this.on = function (t, n) {
                    if (_.isString(t) || _.isFunction(n)) {
                        var i = e[t];
                        i || (i = e[t] = []), _.indexOf(i, n) < 0 && i.push(n)
                    }
                    return this
                }, this.one = function (e, t) {
                    var n = this,
                        i = function () {
                            n.off(e, i), t.apply(this, arguments)
                        };
                    return this.on(e, i)
                }, this.off = function (t, n) {
                    var i = e[t];
                    if (_.isFunction(n)) {
                        var r = _.indexOf(i, n);
                        i && r >= 0 && i.splice(r, 1)
                    } else i && n === undefined && (i.length = 0);
                    return this
                }, this.trigger = function (t) {
                    var n = e[t],
                        i = _.toArray(arguments).slice(1);
                    return _.map(n, function (e) {
                        return e.apply(pendo, i)
                    })
                }, this.triggerAsync = function () {
                    var e = _.map(this.trigger.apply(this, arguments), function (e) {
                        return e === !1 ? q.reject() : e
                    });
                    return q.all(e)
                }, this
            }

            function backupObjectState(e, t) {
                var n = {};
                return t || (t = _.keys(e)), _.each(t, function (t) {
                        var i = e[t];
                        _.isArray(i) ? n[t] = i.slice() : _.isFunction(i) || (n[t] = i)
                    }),
                    function () {
                        _.each(n, function (t, n) {
                            e[n] = t
                        })
                    }
            }

            function getNow() {
                return (new Date).getTime()
            }

            function isSfdcLightning() {
                return "undefined" != typeof $A && _.isFunction($A.get) && _.isString($A.get("$Browser.formFactor"))
            }

            function createStatefulIterator(e) {
                function t(t, n) {
                    if (!n) return t;
                    for (var i = 0, o = t.length; o > i; ++i)
                        if (e(t[i], i) === n) {
                            var a = t.slice(i + 1);
                            return r.circular ? a.concat(t.slice(0, i + 1)) : a
                        } return r.circular ? t : []
                }

                function n(n, i) {
                    if (n && n.length) {
                        n = t(n, this.lastKey);
                        for (var o = 0; o < n.length; ++o)
                            if (i(n[o], o)) return this.lastKey = e(n[o], o), r.circular
                    }
                    return this.lastKey = null, !0
                }

                function i() {
                    this.lastKey = null
                }
                _.isFunction(e) || (e = function (e, t) {
                    return t
                });
                var r = {
                    circular: !0,
                    lastKey: null,
                    eachUntil: n,
                    reset: i
                };
                return r
            }

            function throttleIterator(e, t) {
                return t.eachUntil = _.wrap(t.eachUntil, function (t, n, i) {
                    var r = getNow();
                    return t.call(this, n, function () {
                        return i.apply(this, arguments) || Math.abs(getNow() - r) >= e
                    })
                }), t
            }

            function getHashFromContentUrl(e) {
                var t = parseContentUrl(e);
                return t ? t.filename : void 0
            }

            function parseContentUrl(e) {
                if (_.isString(e)) {
                    var t = parseQueryString(e).substring(1),
                        n = t && t.length ? queryStringToObject(t) : {},
                        i = _.last(_.first(e.split("?")).split("/")),
                        r = i.split(".");
                    return {
                        filename: _.first(r),
                        extension: r.slice(1).join("."),
                        query: n
                    }
                }
            }

            function get(e, t, n) {
                if (_.isString(t)) {
                    if (doesExist(e) && doesExist(e[t])) return e[t];
                    for (var i = t.split("."), r = 0, o = i.length; o > r; ++r) {
                        if (!doesExist(e)) return n;
                        e = e[i[r]]
                    }
                    return doesExist(e) ? e : n
                }
                return n
            }

            function getZoneSafeMethod(e) {
                var t = "__symbol__";
                if ("undefined" != typeof Zone && _.isFunction(Zone[t])) {
                    var n = window[Zone[t](e)];
                    if (_.isFunction(n)) return n
                }
                return window[e]
            }

            function getIsFiniteImpl(e) {
                return _.isFunction(e.isFinite) ? e.isFinite : e.Number && _.isFunction(e.Number.isFinite) ? e.Number.isFinite : function (e) {
                    return e != 1 / 0 && e != -(1 / 0) && !isNaN(e)
                }
            }

            function isInteger(e) {
                return "number" == typeof e && isFinite(e) && Math.floor(e) === e
            }

            function poll(e, t, n, i) {
                t = t || {}, t.maxRetries = isInteger(t.maxRetries) ? t.maxRetries : 10, t.delay = isInteger(t.delay) ? t.delay : 50, t.exponentialBackoff = t.exponentialBackoff || !1;
                var r = function (e) {
                        return e && "[object Function]" === {}.toString.call(e)
                    },
                    o = r(n) ? n : function () {},
                    a = r(i) ? i : function () {},
                    s = e();
                s ? o(s) : t.maxRetries > 0 ? setTimeout(function () {
                    t.maxRetries = --t.maxRetries, t.delay = t.exponentialBackoff ? 2 * t.delay : t.delay, poll(e, t, o, a)
                }, t.delay) : (a || function () {})()
            }

            function findIndex(e, t) {
                var n = -1;
                return _.find(e, function (e, i) {
                    return t(e, i) ? (n = i, !0) : void 0
                }), n
            }

            function getInstallType() {
                var e = getPendoConfigValue("installType");
                return e || NATIVE_INSTALL_TYPE
            }

            function createEventTracer(e) {
                function t(e, t) {
                    t.clear(e)
                }

                function n(e, t) {
                    try {
                        var n = _.isFunction(t) ? t() : t,
                            r = n.getItem(e);
                        return r || (r = i(16), n.setItem(e, r)), r
                    } catch (o) {
                        log("Unable to access storage: " + o)
                    }
                }
                var i = pendo.randomString,
                    r = _.partial,
                    o = _.compose,
                    a = _.extend,
                    s = _.omit,
                    d = "pendo_sessionId",
                    u = "pendo_frameId",
                    l = "pendo_tabId",
                    c = {
                        data: {},
                        getItem: function (e) {
                            return c.data[e]
                        },
                        setItem: function (e, t) {
                            c.data[e] = t
                        },
                        clear: function (e) {
                            c.data[e] = null, delete c.data[e]
                        }
                    },
                    p = r(n, l, function () {
                        return e.sessionStorage
                    }),
                    f = r(n, u, c),
                    g = r(n, d, c);
                return Events.on("guideListChanged", o(g, r(t, d, c))), {
                    addTracerIds: function (e) {
                        return s(a(e, {
                            tabId: p(),
                            frameId: f(),
                            sessionId: c.getItem(d)
                        }), function (e) {
                            return e === undefined
                        })
                    },
                    getTabId: p
                }
            }

            function dom(e, t) {
                var n, i, r = this;
                if (e && e instanceof dom) return e;
                if (!(r instanceof dom)) return new dom(e, t);
                if (e)
                    if (e.nodeType) n = [e];
                    else if (i = /^<(\w+)\/?>$/.exec(e)) n = [document.createElement(i[1])];
                else if (/^<[\w\W]+>$/.test(e)) {
                    var o = document.createElement("div");
                    o.innerHTML = e, n = _.toArray(o.childNodes)
                } else _.isString(e) ? (t instanceof dom && (t = t.length > 0 ? t[0] : null), n = Sizzle(e, t)) : n = [e];
                else n = [];
                return _.each(n, function (e, t) {
                    r[t] = e
                }), r.context = t, r.length = n.length, r
            }

            function documentScrollTop() {
                var e = document.documentElement;
                return (window.pageYOffset || e.scrollTop || getBody().scrollTop) - (e.clientTop || 0)
            }

            function documentScrollLeft() {
                var e = document.documentElement;
                return (window.pageXOffset || e.scrollLeft || getBody().scrollLeft) - (e.clientLeft || 0)
            }

            function bodyOffset() {
                var e = getBody();
                if (e) {
                    var t = getComputedStyle_safe(e);
                    if (t && ("relative" === t.position || "absolute" === t.position || hasCssTransform(t))) {
                        var n = e.getBoundingClientRect();
                        return {
                            top: n.top + documentScrollTop(),
                            left: n.left + documentScrollLeft()
                        }
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            }

            function positionFixedActsLikePositionAbsolute() {
                return hasCssTransform(getComputedStyle_safe(getBody())) && isNaN(msie)
            }

            function hasCssTransform(e) {
                if (e && _.isFunction(e.getPropertyValue)) {
                    var t = [e.getPropertyValue("transform")];
                    return "undefined" != typeof vendorPrefix && _.isString(vendorPrefix) && t.push(e.getPropertyValue("-" + vendorPrefix.toLowerCase() + "-transform")), _.any(t, function (e) {
                        return e && "none" !== e
                    })
                }
                return !1
            }

            function applyBodyOffset(e) {
                var t = bodyOffset();
                return e.left -= t.left, e.top -= t.top, _.isNumber(e.right) && (e.right -= t.left), _.isNumber(e.bottom) && (e.bottom -= t.top), e
            }

            function roundOffsetPosition(e) {
                return _.each(["left", "top", "width", "height"], function (t) {
                    e[t] = Math.round(e[t])
                }), e
            }

            function getOffsetPosition(e) {
                var t, n, i;
                if (!e) return {
                    width: 0,
                    height: 0
                };
                if (t = {
                        width: _.isNumber(e.offsetWidth) ? e.offsetWidth : 0,
                        height: _.isNumber(e.offsetHeight) ? e.offsetHeight : 0
                    }, n = 0, i = 0, e.getBoundingClientRect) {
                    var r;
                    try {
                        r = e.getBoundingClientRect()
                    } catch (o) {
                        return {
                            width: 0,
                            height: 0
                        }
                    }
                    return t.top = r.top, t.left = r.left, t.width = Math.max(t.width, _.isNumber(r.width) ? r.width : 0), t.height = Math.max(t.height, _.isNumber(r.height) ? r.height : 0), isPositionFixed(e) ? t.fixed = !0 : (t.top += documentScrollTop(), t.left += documentScrollLeft(), t = applyBodyOffset(t)), roundOffsetPosition(t)
                }
                for (; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) n += e.offsetLeft, i += e.offsetTop, e = e.offsetParent;
                return t.top = i, t.left = n, roundOffsetPosition(t)
            }

            function isInDocument(e) {
                return Sizzle.contains(document, e)
            }

            function hasParentWithCssTransform(e) {
                for (var t, n = e && e.parentNode; n;) {
                    if (t = getComputedStyle_safe(n), hasCssTransform(t)) return !0;
                    n = n.parentNode
                }
                return !1
            }

            function isPositionFixed(e) {
                for (var t, n = e; n;) {
                    if (t = getComputedStyle_safe(n), !t) return !1;
                    if ("fixed" === t.position) return isNaN(msie) ? !hasParentWithCssTransform(n) : !0;
                    n = n.parentNode
                }
                return !1
            }

            function getOverflowDirection(e, t) {
                var n = getComputedStyle_safe(e);
                return t = t || /(auto|scroll|hidden)/, n ? t.test(n.overflowY) && t.test(n.overflowX) ? OverflowDirection.BOTH : t.test(n.overflowY) ? OverflowDirection.Y : t.test(n.overflowX) ? OverflowDirection.X : t.test(n.overflow) ? OverflowDirection.BOTH : OverflowDirection.NONE : OverflowDirection.NONE
            }

            function isVisibleInScrollParent(e, t, n) {
                var i = getClientRect(t),
                    r = getOverflowDirection(t, n);
                if (r === OverflowDirection.BOTH && !intersectRect(e, i)) return !1;
                if (r === OverflowDirection.Y) {
                    if (e.top >= i.bottom) return !1;
                    if (e.bottom <= i.top) return !1
                }
                if (r === OverflowDirection.X) {
                    if (e.left >= i.right) return !1;
                    if (e.right <= i.left) return !1
                }
                return !0
            }

            function isBodyElement(e) {
                return e && e.nodeName && "body" === e.nodeName.toLowerCase() && Sizzle.contains(document, e)
            }

            function isElementVisibleInBody(e) {
                if (!e) return !1;
                if (isBodyElement(e)) return !0;
                var t = getClientRect(e);
                if (0 === t.width || 0 === t.height) return !1;
                var n = getComputedStyle_safe(e);
                if (n && "hidden" === n.visibility) return !1;
                for (var i = e; i && n;) {
                    if ("none" === n.display) return !1;
                    if (parseFloat(n.opacity) <= 0) return !1;
                    i = i.parentNode, n = getComputedStyle_safe(i)
                }
                return !0
            }

            function isElementVisible(e, t) {
                if (!isElementVisibleInBody(e)) return !1;
                if (isBodyElement(e)) return !0;
                var n = getClientRect(e);
                t = t || /hidden/;
                for (var i = getScrollParent(e, t), r = null; i && i !== document && i !== r;) {
                    if (!isVisibleInScrollParent(n, i, t)) return !1;
                    r = i, i = getScrollParent(i, t)
                }
                if (e.getBoundingClientRect) {
                    var o = e.getBoundingClientRect(),
                        a = o.right,
                        s = o.bottom;
                    if (n.fixed || (a += documentScrollLeft(), s += documentScrollTop()), 0 >= a || 0 >= s) return !1
                }
                return !0
            }

            function scrollIntoView(e) {
                var t, n, i, r, o, a, s = /(auto|scroll)/,
                    d = getBody();
                for (n = getScrollParent(e, s); n && n !== d;) t = getClientRect(e), i = getClientRect(n), r = 0, o = 0, t.bottom > i.bottom && (r += t.bottom - i.bottom, t.top -= r, t.bottom -= r), t.top < i.top && (a = i.top - t.top, r -= a, t.top += a, t.bottom += a), t.right > i.right && (o += t.right - i.right, t.left -= o, t.right -= o), t.left < i.left && (a = i.left - t.left, o -= a, t.left += a, t.right += a), n.scrollTop += r, n.scrollLeft += o, n = getScrollParent(n, s)
            }

            function evalScript(e) {
                var t = document.createElement("script"),
                    n = document.head || document.getElementsByTagName("head")[0] || document.body;
                t.type = "text/javascript", e.src ? t.src = e.src : t.text = e.text || e.textContent || e.innerHTML || "", n.appendChild(t), n.removeChild(t)
            }

            function isElemInViewport(e) {
                var t = e.getBoundingClientRect();
                return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
            }

            function isElemIsFocusable(e) {
                var t = ["A", "INPUT", "LABEL", "SELECT", "TEXTAREA", "BUTTON", "FIELDSET", "LEGEND", "DATALIST", "OUTPUT", "OPTION", "OPTGROUP"],
                    n = _.contains(t, e.nodeName),
                    i = !!e.tabIndex,
                    r = n || i,
                    o = !e.hidden,
                    a = !e.disabled;
                return r && o && a
            }

            function DomData() {
                this.ownerKey = "_pendo_" + pendo.randomString(8)
            }

            function isCapturingPhase(e) {
                return _.isNumber(e.eventPhase) && e.eventPhase === CAPTURING_PHASE
            }

            function isAtTargetPhase(e) {
                return _.isNumber(e.eventPhase) && e.eventPhase === AT_TARGET
            }

            function attachEventInternal(e, t, n, i) {
                e && t && n && (e !== window || "error" !== t) && (i || (i = !1), e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent("on" + t, n))
            }

            function detachEventInternal(e, t, n, i) {
                e && t && n && (i || (i = !1), e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent("on" + t, n))
            }

            function isStringWhiteSpace(e) {
                return e && "string" == typeof e && 0 === trim.call(e).length
            }

            function clearSession() {
                removeIdentificationCookies(["visitorId", "accountId", OPTIONS_HASH_KEY_NAME, LAST_STEP_ADVANCED_COOKIE]), delete pendo.visitorId, delete pendo.accountId, pendo.get_visitor_id(), getMetadata = _.noop
            }

            function setCookieDomain(e, t) {
                if (!e) return void(cookieDomain = e);
                if (_.isString(e)) {
                    t = t.replace(/:\d+$/, ""), e = e.replace(/^\./, "");
                    var n = new RegExp("\\." + e.replace(/\./g, "\\.") + "$"),
                        i = new RegExp("^" + e.replace(/\./g, "\\.") + "$");
                    (n.test(t) || i.test(t)) && (cookieDomain = "." + e)
                }
            }

            function hasCookieDomain() {
                return !!cookieDomain
            }

            function clearCookie(e) {
                return hasCookieDomain() ? void setCookie(e, "") : void(document.cookie = e + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT")
            }

            function getPendoCore() {
                var e = getPendoConfigValue("pendoCore");
                return "undefined" == typeof e ? !0 : e
            }

            function shouldInitializeFeedback(e) {
                return isFeedbackOn && !isDisableFeedbackAutoInitOn && !isAnonymousVisitor(e) && !getOption("disableFeedback", !1)
            }

            function doesExist(e) {
                return !("undefined" == typeof e || null === e)
            }

            function shouldReloadGuides(e, t, n, i) {
                return e && pendo.apiKey ? areGuidesDisabled() && "true" !== pendoLocalStorage.getItem("pendo-designer-mode") ? !1 : e !== reloadGuides.lastUrl || t !== reloadGuides.lastVisitorId || n !== reloadGuides.lastAccountId || i !== reloadGuides.lastMetadataHash : !1
            }

            function reloadGuides(e) {
                var t = pendo.get_visitor_id(),
                    n = pendo.get_account_id();
                e = e || pendo.url.get(), shouldReloadGuides(e, t, n, metadataHash) && (reloadGuides.lastUrl = e, reloadGuides.lastVisitorId = t, reloadGuides.lastAccountId = n, reloadGuides.lastMetadataHash = metadataHash, pendo.loadGuides(pendo.apiKey, t, e)["catch"](_.noop))
            }

            function forceGuideReload() {
                reloadGuides.lastUrl = null, queueGuideReload()
            }

            function getApiKey(e) {
                var t = getPendoConfigValue("apiKey");
                return t ? t : e.apiKey ? e.apiKey : void 0
            }

            function getAdditionalApiKeys(e) {
                var t, n = getPendoConfigValue("additionalApiKeys");
                return t = n ? n : e.additionalApiKeys ? e.additionalApiKeys : [], t && !_.isArray(t) && (t = [t]), t
            }

            function registerEventHandlers(e) {
                _.each(e.events, function (e, t) {
                    pendo.events[t] && pendo.events[t](e)
                })
            }

            function launchDesignerOrPreview(e) {
                _.find([_.partial(pendo.designerv2.launchOnToken, window.location), _.partial(startPreviewMode, window)], function (e) {
                    return e()
                }), (e.enableDesignerKeyboardShortcut || !getPendoConfigValue("disableDesignerKeyboardShortcut")) && pendo.P2AutoLaunch.listen()
            }

            function localStorageNavigation(e) {
                if (!e.ignoreLocalStorageNavigation) {
                    var t = pendoLocalStorage.getItem("pendo-navigation-state"),
                        n = isInDesignerPreviewMode();
                    if (t && !n && store.getters["frames/isLeader"]()) try {
                        var i = JSON.parse(t),
                            r = {
                                lookaside: i.baseUrl,
                                preloader: !0,
                                host: i.host,
                                gcsBucket: i.isDADesigner ? "da-designer" : undefined,
                                DADesigner: i.isDADesigner
                            };
                        pendo.designerv2.launchInAppDesigner(r)
                    } catch (o) {}
                }
            }

            function announceFrameToDesignerPlugin() {
                window.parent && window.parent.postMessage && "function" == typeof window.parent.postMessage && window.parent.postMessage({
                    type: "announce-frame-initialized",
                    destination: "pendo-designer-agent",
                    source: "pendo-designer-agent",
                    localStorageRouter: !0
                }, "*")
            }

            function flushCallQueue() {
                if (_.isArray(pendo._q) && !_.isEmpty(pendo._q)) {
                    var e = pendo._q.splice(0, pendo._q.length),
                        t = _.reduce(e, function (e, t) {
                            if (!_.isArray(t)) return e;
                            var n = pendo[t.shift()];
                            return _.isFunction(n) ? e.then(function () {
                                return n.apply(pendo, t)
                            }) : e
                        }, q.resolve());
                    return t.then(flushCallQueue)
                }
            }

            function getDataHost() {
                var e = getPendoConfigValue("dataHost");
                return e ? "https://" + e : getOption("dataHost", SERVER)
            }

            function getAllApiKeys() {
                return _.compact([pendo.apiKey].concat(pendo.additionalApiKeys))
            }

            function writeErrorPOST(e) {
                try {
                    var t, n = HOST + "/data/errorlog?apiKey=" + pendo.apiKey,
                        i = {
                            error: e,
                            version: "v" + VERSION,
                            visitorId: pendo.get_visitor_id()
                        };
                    return t = fetchKeepalive.supported() ? fetch(n, {
                        method: "POST",
                        keepalive: !0,
                        body: JSON.stringify(i),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }) : pendo.ajax.postJSON(n, i), t.then(function () {
                        pendo.log("successfully wrote error")
                    }, function (e) {
                        pendo.log("error writing error:" + e)
                    })
                } catch (r) {
                    return log("Failed to write error to server using POST endpoint: " + r), writeMessage("Failed to write error to server using POST endpoint: " + r)
                }
            }

            function writeImgTag(e) {
                if (!isUnlocked()) return q.resolve();
                if (isInPreviewMode()) return q.resolve();
                var t = q.defer(),
                    n = new Image;
                return n.onload = function () {
                    t.resolve()
                }, n.onerror = function () {
                    t.reject()
                }, n.src = e, t.promise
            }

            function fetchKeepalive(e) {
                fetch(e, {
                    method: "GET",
                    keepalive: !0
                })
            }

            function sendBeacon(e, t) {
                navigator.sendBeacon(e, new Blob([JSON.stringify(t)], {
                    type: "text/plain"
                }))
            }

            function callLater(e, t) {
                if (t = parseInt(t, 10) || 0, e[t]) return e[t];
                var n = window.setTimeout(function () {
                    e(), e[t]()
                }, t);
                return e[t] = function () {
                    window.clearTimeout(n), delete e[t]
                }
            }

            function flushNow(e, t) {
                try {
                    eventQueue.flush(t), trackEventQueue.flush(t)
                } catch (n) {
                    writeException(n, "unhandled error while flushing event cache")
                }
            }

            function flushLater(e) {
                return callLater(_.partial(flushNow, !0), e)
            }

            function flushEvery(e) {
                if (e = parseInt(e, 10) || 0, _.isObject(flushEvery.intervals) || (flushEvery.intervals = {}), !flushEvery.intervals[e]) {
                    var t = window.setInterval(flushNow, e);
                    return flushEvery.intervals[e] = function () {
                        clearInterval(t), delete flushEvery.intervals[e]
                    }
                }
            }

            function flushStop() {
                var e = _.values(flushEvery.intervals).concat([flushNow]);
                _.map(e, function (e) {
                    pendo._.isFunction(e) && e()
                })
            }

            function buffersClearAll() {
                eventQueue.clear(), trackEventQueue.clear(), xhrEventQueue.clear(), flushStop()
            }

            function eventCreate(e, t, n, i, r) {
                var o = {
                    type: e,
                    browser_time: getNow(),
                    visitor_id: pendo.get_visitor_id(),
                    account_id: pendo.get_account_id(),
                    url: pendo.url.externalizeURL(n),
                    props: t
                };
                return o = EventTracer.addTracerIds(o), "track" === e ? o.track_event_name = i || defaultTrackName : "click" === e && r && (o.eventProperties = r), o
            }

            function collectEvent(e, t, n, i, r) {
                if (pendoCore) {
                    var o = eventCreate(e, t, n, i, r);
                    if (isURLValid(o.url) && eventIsWhitelisted(o)) return "track" === e ? void trackEventQueue.push(o) : void eventQueue.push(o)
                }
            }

            function eventIsWhitelisted(e) {
                return getPendoConfigValue("freeNPSData") ? pendo._.contains(WHITELIST_FREE_NPS, e.type) : !0
            }

            function pipeline() {
                var e = _.toArray(arguments);
                return function (t, n) {
                    var i = e.concat([n]);
                    ! function r(e, t) {
                        e < i.length && i[e](t, function (t) {
                            r(e + 1, t)
                        })
                    }(0, t)
                }
            }

            function reducer(e, t) {
                var n = t;
                return function (t, i) {
                    n = e(n, t), i(n)
                }
            }

            function siloReducer(e) {
                return reducer(function (e, t) {
                    return e.push(t), e
                }, e)
            }

            function eventAddBytes(e) {
                return null == e.bytes && (e.bytes = JSON.stringify(e).length), e
            }

            function filterAccountIdsForSendQueue(e, t) {
                var n = getPendoConfigValue("trainingPartner");
                return n ? splitSiloOnFieldChange("account_id")(e, t) : t(e)
            }

            function splitSiloOnFieldChange(e) {
                return function (t, n) {
                    if (!t.length) return n(t);
                    var i, r = get(t[0], e),
                        o = !0;
                    for (i = 1; i < t.length; i++)
                        if (r !== get(t[i], e)) {
                            o = !1;
                            break
                        } if (o) return n(t);
                    var a = t.slice(0, i),
                        s = t.slice(i);
                    n(a), n(s)
                }
            }

            function filterSiloCapacity(e, t) {
                for (var n, i = 0, r = 0; r < e.length; ++r) {
                    var o = eventAddBytes(e[r]).bytes;
                    i + o > SILO_MAX_BYTES && (n = r), i += o
                }
                if (0 === n && 1 === e.length && (n = 1), n) {
                    var a = e.slice(0, n),
                        s = e.slice(n);
                    e.length = 0, e.push.apply(e, s), t(a)
                }
            }

            function filterSiloLength(e, t) {
                if (e.length > MAX_NUM_EVENTS) {
                    var n = e.slice();
                    e.length = 0, t(n)
                }
            }

            function shortenFields(e) {
                return e = _.defaults(e || {}, {
                        fields: ["url"],
                        fieldMaxLength: URL_MAX_LENGTH,
                        siloMaxLength: ENCODED_EVENT_MAX_POST_LENGTH
                    }),
                    function (t, n) {
                        if (1 === t.length && t.JZB.length > e.siloMaxLength) {
                            var i = t[0];
                            debug("Max length exceeded for an event"), _.each(e.fields, function (n) {
                                var r = i[n];
                                r && r.length > e.fieldMaxLength && (debug("shortening " + n + " and retrying"), i[n] = limitURLSize(e.fieldMaxLength, r), delete t.JZB)
                            })
                        }
                        n(t)
                    }
            }

            function compressSilo(e, t) {
                if (0 !== e.length) {
                    if (e.JZB) return t(e);
                    if (e.JZB = pendo.squeezeAndCompress(e.slice()), e.JZB.length <= ENCODED_EVENT_MAX_LENGTH) return t(e);
                    if (1 === e.length) return t(e);
                    var n = e.length / 2;
                    compressSilo(e.slice(0, n), t), compressSilo(e.slice(n), t)
                }
            }

            function filterAnalyticsDisabled(e, t) {
                isUnlocked() && (isInPreviewMode() || t(e))
            }

            function errorLogger(e, t) {
                1 === e.length && e.JZB.length > ENCODED_EVENT_MAX_LENGTH ? (debug("Couldn't write event"), writeMessage("Single item is: " + e.JZB.length + ". Dropping."), writeErrorPOST(e.JZB)) : writeErrorPOST("Failed to write silo: " + e.JZB)
            }

            function getApiKeysFromOptions(e) {
                return _.isFunction(e.apiKey) ? [].concat(e.apiKey()) : [].concat(e.apiKey)
            }

            function buildGetRequestUrls(e, t) {
                return _.map(getApiKeysFromOptions(e), function (n) {
                    return buildBaseDataUrl(e.beacon + ".gif", n, _.extend({
                        v: VERSION,
                        ct: getNow(),
                        jzb: t
                    }, e.params))
                })
            }

            function buildPostRequestUrls(e, t) {
                return _.map(getApiKeysFromOptions(e), function (n) {
                    return buildBaseDataUrl(e.beacon + ".gif", n, _.extend({
                        v: VERSION,
                        ct: getNow(),
                        s: t.length
                    }, e.params))
                })
            }

            function addAccountIdParamIfAdoptPartner(e, t) {
                var n = getPendoConfigValue("trainingPartner"),
                    i = _.first(t),
                    r = get(i, "account_id");
                return n && r && (e = _.extend({}, e, {
                    acc: base64EncodeString(r)
                })), e
            }

            function defaultSendEvent(e) {
                return function (t, n) {
                    var i = t.JZB;
                    if (!i) return n(t);
                    var r = getJwtInfoCopy(),
                        o = i.length;
                    return _.isEmpty(r) || (o += r.jwt.length + r.signingKeyName.length), o > ENCODED_EVENT_MAX_POST_LENGTH ? n(t) : (e.params = addAccountIdParamIfAdoptPartner(e.params, t), ENCODED_EVENT_MAX_LENGTH >= o ? void(_.isEmpty(r) ? _.each(buildGetRequestUrls(e, i), function (e) {
                        writeImgTag(e)["catch"](_.noop)
                    }) : (e.params = _.extend({}, e.params, r), _.each(buildGetRequestUrls(e, i), function (e) {
                        pendo.ajax({
                            method: "GET",
                            url: e
                        })["catch"](_.noop)
                    }))) : e.allowPost ? void(sendBeacon.supported() ? _.each(buildPostRequestUrls(e, i), function (e) {
                        var t = _.extend({
                            events: i
                        }, r);
                        sendBeacon(e, t)
                    }) : _.each(buildPostRequestUrls(e, i), function (e) {
                        var t = _.extend({
                                events: i
                            }, r),
                            n = {
                                "Content-Type": "application/json"
                            };
                        pendo.ajax({
                            method: "POST",
                            url: e,
                            data: JSON.stringify(t),
                            headers: n
                        })["catch"](_.noop)
                    })) : void n(t))
                }
            }

            function reliableSendEventForUnload(e) {
                return function (t, n) {
                    var i = t.JZB;
                    if (!i) return n(t);
                    var r = getJwtInfoCopy(),
                        o = i.length;
                    if (_.isEmpty(r) || (o += r.jwt.length + r.signingKeyName.length), i.length > ENCODED_EVENT_MAX_POST_LENGTH) return n(t);
                    if (e.params = addAccountIdParamIfAdoptPartner(e.params, t), ENCODED_EVENT_MAX_LENGTH >= o) {
                        if (_.isEmpty(r) && fetchKeepalive.supported()) return void _.each(buildGetRequestUrls(e, i), fetchKeepalive);
                        if (pendo.sniffer.msie <= 11) return e.params = _.extend({}, e.params, r), void _.each(buildGetRequestUrls(e, i), function (e) {
                            pendo.ajax({
                                method: "GET",
                                url: e,
                                sync: !0
                            })["catch"](_.noop)
                        })
                    }
                    return e.allowPost ? void(fetchKeepalive.supported() ? _.each(buildPostRequestUrls(e, i), function (e) {
                        var t = _.extend({
                            events: i
                        }, r);
                        fetch(e, {
                            method: "POST",
                            keepalive: !0,
                            body: JSON.stringify(t),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                    }) : sendBeacon.supported() ? _.each(buildPostRequestUrls(e, i), function (e) {
                        var t = _.extend({
                            events: i
                        }, r);
                        sendBeacon(e, t)
                    }) : pendo.sniffer.msie <= 11 && _.each(buildPostRequestUrls(e, i), function (e) {
                        var t = _.extend({
                                events: i
                            }, r),
                            n = {
                                "Content-Type": "application/json"
                            };
                        pendo.ajax({
                            method: "POST",
                            url: e,
                            data: JSON.stringify(t),
                            sync: !0,
                            headers: n
                        })["catch"](_.noop)
                    })) : void n(t)
                }
            }

            function createSendQueue(e, t) {
                return pipeline(filterAnalyticsDisabled, filterAccountIdsForSendQueue, compressSilo, shortenFields(e.shorten), compressSilo, t(e), errorLogger)
            }

            function createEventQueue(e) {
                var t = e.cache,
                    n = e.silos,
                    i = createSendQueue(e, defaultSendEvent),
                    r = createSendQueue(e, reliableSendEventForUnload),
                    o = pipeline(siloReducer(t), filterSiloCapacity, function (e) {
                        n.push(e)
                    });
                return {
                    push: function (e) {
                        o(e, _.noop)
                    },
                    clear: function () {
                        t.length = 0, n.length = 0
                    },
                    flush: function (e) {
                        if (0 !== t.length || 0 !== n.length) {
                            n.push(t.slice()), t.length = 0;
                            var o = n.slice();
                            n.length = 0;
                            var a = (e || {}).guaranteed ? r : i;
                            _.each(o, function (e) {
                                a(e, _.noop)
                            })
                        }
                    }
                }
            }

            function getAttributeValue(e, t) {
                return e.getAttribute ? e.getAttribute(t) : e[t]
            }

            function getHtmlAttributeTester(e) {
                if (_.isRegExp(e) && _.isFunction(e.test)) return function (t) {
                    return e.test(t)
                };
                if (_.isArray(e)) {
                    var t = _.map(_.filter(e, _.isObject), function (e) {
                        if (e.regexp) {
                            var t = /\/([a-z]*)$/.exec(e.value),
                                n = t && t[1] || "";
                            return new RegExp(e.value.replace(/^\//, "").replace(/\/[a-z]*$/, ""), n)
                        }
                        return new RegExp("^" + e.value + "$", "i")
                    });
                    return function (e) {
                        return _.any(t, function (t) {
                            return t.test(e)
                        })
                    }
                }
                if (_.isObject(e) && e.regexp) {
                    var n = /\/([a-z]*)$/.exec(e.value),
                        i = n && n[1] || "",
                        r = new RegExp(e.value.replace(/^\//, "").replace(/\/[a-z]*$/, ""), i);
                    return function (e) {
                        return r.test(e)
                    }
                }
                return _.constant(!1)
            }

            function filterAttributeList(e, t, n, i) {
                var r = _.indexBy(t),
                    o = _.filter(_.filter(e, function (e) {
                        return n(e.nodeName) || r[e.nodeName]
                    }), function (e) {
                        return !i(e.nodeName)
                    });
                if (o.length <= MAX_ATTRIBUTES) return _.pluck(o, "nodeName");
                var a = _.groupBy(e, function (e) {
                    return r[e.nodeName] ? "defaults" : _.isString(e.value) && e.value.length > MAX_ATTRIBUTE_LENGTH ? "large" : "small"
                });
                return _.pluck([].concat(_.sortBy(a.defaults, "nodeName")).concat(_.sortBy(a.small, "nodeName")).concat(_.sortBy(a.large, "nodeName")).slice(0, MAX_ATTRIBUTES), "nodeName");
            }

            function collectEventPropertiesForTarget(e) {
                if (pendo.eventProperties && pendo.eventProperties.length && e) {
                    for (var t = getNow(), n = 50, i = {}, r = undefined, o = 0; o < pendo.eventProperties.length && getNow() - t < n; o++) {
                        r = pendo.eventProperties[o];
                        var a = _.any(r.featureRules, function (t) {
                            try {
                                return pendo.Sizzle.matchesSelector(e, t)
                            } catch (n) {
                                return !1
                            }
                        });
                        if (a)
                            for (var s = 0; s < r.eventPropertyRules.length && getNow() - t < n; s++) {
                                var d = r.eventPropertyRules[s];
                                if (!d.name) return;
                                i[d.name] = collectEventProperty(d, e)
                            }
                    }
                    var u = getNow() - t;
                    if (u > n) {
                        pendo.log("event property collection disabled; collection took greater than " + n + " milliseconds.");
                        var l = "ERROR event property collection exceeded time limit.";
                        r && (l += "\n For feature with id: " + r.featureId), writeException({}, l), pendo.eventProperties = []
                    }
                    return i
                }
            }

            function collectEventProperty(e, t) {
                if (e.path) {
                    var n = getEventPropertyTarget(e, t);
                    return get(n, e.path, undefined)
                }
            }

            function getEventPropertyTarget(e, t) {
                var n = e.source || e.selector;
                return n ? nearestTargeter(n, t) : window
            }

            function nearestTargeter(e, t) {
                for (var n, i = t; !n && i;) {
                    try {
                        if (n = pendo.Sizzle(e, i)[0], n && ("password" === n.type || "hidden" === n.type)) return
                    } catch (r) {
                        return
                    }
                    i = shadowAPI.getParent(i)
                }
                return n
            }

            function wireSyntheticClicks(e, t) {
                var n, i, r = {
                    cloneEvent: function (e) {
                        var t = dom.event.clone(e);
                        return t.type = "click", t.from = "mousedown", t.bubbles = !0, t
                    },
                    mousedown: function (e) {
                        i = !1, e && (n = r.cloneEvent(e))
                    },
                    mouseup: function (t) {
                        i = !1, t && n && (getTarget(n) !== getTarget(t) && (i = !0, e(n)), n = null)
                    },
                    click: function (e) {
                        i && dom.data.set(e, "ignore", !0), i = !1
                    }
                };
                return t && (attachEventInternal(document, "mousedown", r.mousedown, !0), attachEventInternal(document, "mouseup", r.mouseup, !0), attachEventInternal(document, "click", r.click, !0)), r
            }

            function interceptStopPropagation(e, t) {
                try {
                    if (!e || !e.prototype) return;
                    var n = _.indexBy(t);
                    _.each(["stopPropagation", "stopImmediatePropagation"], function (t) {
                        var i = e.prototype[t];
                        i && (e.prototype[t] = _.wrap(i, function (e) {
                            var t = e.apply(this, arguments);
                            return n[this.type] && (dom.data.set(this, "stopped", !0), dom.event.trigger(this)), t
                        }), e.prototype[t]._pendoUnwrap = function () {
                            e.prototype[t] = i
                        })
                    })
                } catch (i) {
                    writeException(i, "ERROR in interceptStopPropagation")
                }
            }

            function attachEvent(e, t, n, i) {
                e && t && n && (e !== window || "error" !== t) && (i && !pendo.sniffer.addEventListener && (i = !1), dom.event.add(e, {
                    type: t,
                    handler: n,
                    capture: i
                }))
            }

            function detachEvent(e, t, n, i) {
                e && t && n && (i && !pendo.sniffer.addEventListener && (i = !1), dom.event.remove(e, t, n, i))
            }

            function logError() {
                canWeLog("error") && console.error.apply(console, arguments)
            }

            function pint(e) {
                return parseInt(e, 10)
            }

            function isString(e) {
                return "string" == typeof e
            }

            function isUndefined(e) {
                return "undefined" == typeof e
            }

            function isNativeCode(e) {
                return /native/.test(e)
            }

            function startPoller(e, t) {
                ! function n() {
                    pendo._.map(pollFns, function (e) {
                        e()
                    }), pollTimeout = t(n, e)
                }()
            }

            function fireUrlChange() {
                var e = url();
                lastBrowserUrl != e && (lastBrowserUrl = e, pendo._.map(urlChangeListeners, function (e) {
                    e(url())
                }))
            }

            function sanitizeUrl(e) {
                var t = ConfigReader.get("sanitizeUrl");
                return _.isFunction(t) ? t(e) : e
            }

            function annotateUrl(e) {
                e = e || getWindowLocation().href;
                var t = ConfigReader.get("annotateUrl");
                if (t) {
                    if (_.isFunction(t)) {
                        var n = t();
                        if (!n || !_.isObject(n) && !_.isArray(n)) return e;
                        var i = n.exclude,
                            r = n.include,
                            o = n.fragment;
                        return delete n.fragment, (i && _.isArray(i) || r && (_.isArray(r) || _.isObject(r))) && (i && (e = adjustUrl(e, null, i, !0)), n = r || {}), pendo.ajax.urlFor(e, n, o)
                    }
                    log("customer-provided `annotateUrl` must be of type: function")
                }
                return e
            }

            function parseQueryString(e) {
                if (!e) return "";
                var t = e.indexOf("?");
                if (0 > t) return "";
                var n = e.indexOf("#");
                return 0 > n ? e.substring(t) : t > n ? "" : e.substring(t, n)
            }

            function adjustUrl(e, t, n, i) {
                e = e || url(), t = t || parseQueryString(e).substring(1);
                var r, o;
                r = e.indexOf(t), o = r + t.length;
                var a = e.substring(0, r),
                    s = e.substring(o);
                return _.isArray(n) && (t = adjustQueryStringParams(t, n, i)), t.length || "?" !== a.charAt(a.length - 1) || (a = a.substr(0, a.length - 1)), a + t + s
            }

            function getTrustedOriginPattern(e, t) {
                return new RegExp("^(" + _.chain(e).unique().map(function (e) {
                    return e = e.replace(/\./g, "\\."), t || (e = e.replace(/^https?:/, "https?:")), e
                }).value().join("|") + ")$")
            }

            function isTrustedOrigin2(e) {
                if (!e) return !0;
                if (e === window.location.origin) return !0;
                var t = [/^https:\/\/(app|via|adopt)(\.eu|\.us)?\.pendo\.io$/, /^https:\/\/(us1\.)?(app|via)\.pendo\.io$/, /^https:\/\/([0-9]{8}t[0-9]{4}-dot-)pendo-(io|eu|us1)\.appspot\.com$/, /^https:\/\/hotfix-(ops|app)-([0-9]+-dot-)pendo-(io|eu|us1)\.appspot\.com$/];
                _.contains(["prod", "prod-eu", "prod-us1"], ENV) || (t = t.concat([/^https:\/\/([a-zA-Z0-9-]+\.)*pendo-dev\.com$/, /^https:\/\/([a-zA-Z0-9-]+-dot-)?pendo-(dev|test|io|batman|magic|atlas|wildlings|ionchef|mobile-guides|mobile-hummus|mobile-plat|eu|eu-dev|apollo|security|perfserf|freeze|armada|voc|calypso|dap|scrum-ops|ml)\.appspot\.com$/, /^https:\/\/via\.pendo\.local:\d{4}$/, /^https:\/\/adopt\.pendo\.local:\d{4}$/, /^https:\/\/local\.pendo\.io:\d{4}$/]));
                var n = getPendoConfigValue("adoptHost");
                if (n) {
                    var i = "https://" + n;
                    if (e === i) return !0
                }
                return _.any(t, function (t) {
                    return t.test(e)
                })
            }

            function messageOriginTester2(e) {
                return function (t) {
                    return t && isTrustedOrigin2(t.origin) ? e.apply(this, arguments) : void 0
                }
            }

            function validateModuleURL(e) {
                var t = {
                    "/js/lib/ckeditor/ckeditor.js": 1
                };
                _.each(["depres.js", "tether.js", "sortable.js", "selection.js", "selection.css", "html2canvas.js"], function (e) {
                    t["/modules/pendo.designer/plugins/" + e] = 1
                }), e = e.replace(/^https:\/\//, "");
                var n = e.substring(0, e.indexOf("/")),
                    i = e.substring(e.indexOf("/"));
                return trustedOrigin.test("https://" + n) && !!t[i]
            }

            function ensureHttps(e) {
                return e.replace(/^[a-zA-Z-:]*\/\//, "https://")
            }

            function Wrappable() {
                var e = {},
                    t = function (e, t, n) {
                        return function () {
                            var i, r, o = _.toArray(arguments);
                            for (i = 0, r = t.length; r > i; ++i)
                                if (t[i].apply(this, o) === !1) return;
                            var a = e.apply(this, o);
                            for (i = 0, r = n.length; r > i && n[i].apply(this, o) !== !1; ++i);
                            return a
                        }
                    };
                return _.each(["after", "before"], function (n) {
                    this[n] = function (i, r) {
                        if (this[i]) {
                            var o = e[i];
                            o || (o = e[i] = {
                                before: [],
                                after: []
                            }, this[i] = t(this[i], o.before, o.after)), o[n].push(r)
                        }
                    }
                }, this), this
            }

            function filterPendoAgentXhrRequests(e, t) {
                var n = HOST.replace(/\./g, "\\.").replace(/\//g, "\\/"),
                    i = new RegExp("^" + n + "\\/data\\/"),
                    r = get(e, "request_url", "");
                i.test(r) || t(e)
            }

            function createXhrEventQueue(e) {
                var t = e.cache,
                    n = createSendQueue(e, defaultSendEvent),
                    i = createSendQueue(e, reliableSendEventForUnload),
                    r = pipeline(filterPendoAgentXhrRequests, siloReducer(t), filterSiloLength, n);
                return {
                    push: function (e) {
                        r(e, _.noop)
                    },
                    clear: function () {
                        t.length = 0
                    },
                    flush: function (e) {
                        if (0 !== t.length) {
                            var r = t.slice();
                            t.length = 0;
                            var o = (e || {}).guaranteed ? i : n;
                            o(r, _.noop)
                        }
                    }
                }
            }

            function RemoteFrameGuide() {
                return _.isFunction(this.isAnnouncement) && this.isAnnouncement() ? this : (this.shouldBeAddedToLauncher = _.wrap(this.shouldBeAddedToLauncher, function (e) {
                    return store.getters["frames/hasFrames"]() ? store.getters["frames/isGuideInThisFrame"]()(this) && e.apply(this, arguments) ? !0 : store.getters["frames/isGuideInDifferentFrame"]()(this) ? store.getters["frames/shouldBeAddedToLauncher"]()(this) : !1 : e.apply(this, arguments)
                }), this.shouldBeAddedToResourceCenter = _.wrap(this.shouldBeAddedToResourceCenter, function (e) {
                    return store.getters["frames/hasFrames"]() ? store.getters["frames/isGuideInThisFrame"]()(this) && e.apply(this, arguments) ? !0 : store.getters["frames/isGuideInDifferentFrame"]()(this) ? store.getters["frames/shouldBeAddedToResourceCenter"]()(this) : !1 : e.apply(this, arguments)
                }), this)
            }

            function RemoteFrameStep(e) {
                var t = this;
                return "whatsnew" === t.type ? t : _.isFunction(e.isAnnouncement) && e.isAnnouncement() ? t : (t.isShown = _.wrap(t.isShown, function (e) {
                    return e.apply(this, arguments) || store.getters["frames/isShownInAnotherFrame"]()(t)
                }), t)
            }

            function replaceWithContentHost(e) {
                var t = ConfigReader.getLocalConfig("contentHost");
                return t && e ? e.replace(/(https:)?\/\/pendo-static-\d+\.storage\.googleapis\.com/g, t).replace(/(https:)?\/\/pendo-\w+-static\.storage\.googleapis\.com/g, t).replace(/(https:)?\/\/cdn\.pendo\.io/g, t) : e
            }

            function replaceObjectWithContentHost(e) {
                var t = ConfigReader.getLocalConfig("contentHost");
                return t ? JSON.parse(replaceWithContentHost(JSON.stringify(e))) : e
            }

            function getContentHostRegex() {
                var e = escapeRegExp(ConfigReader.getHostedConfig("contentHost"));
                return e ? e + "*" : void 0
            }

            function escapeRegExp(e) {
                return e ? e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : void 0
            }

            function Tooltip(e) {
                if ("tooltip" === this.type) {
                    var t = this;
                    t.attributes.height = t.attributes.height || pendo.TOOLTIP_DEFAULT_HEIGHT, t.attributes.width = t.attributes.width || pendo.TOOLTIP_DEFAULT_WIDTH, t.attributes.layoutDir = t.attributes.layoutDir || "DEFAULT", this.getTriggers = function (e) {
                        var t = this,
                            n = t.getGuide(),
                            i = t.element || getElementForGuideStep(t);
                        if (!i && e) return [];
                        var r = t.advanceMethod || "",
                            o = r.split(",");
                        if (this.triggers = _.map(o, function (e) {
                                return new AdvanceTrigger(i, e, t)
                            }), !e && n && n.isMultiStep && currentMode == OBM) {
                            var a = n.findSectionForStep(t),
                                s = n.getSubSection(a, t);
                            this.triggers = this.triggers.concat(_.flatten(_.map(s, function (e) {
                                return e.getTriggers ? e.getTriggers(!0) : []
                            })))
                        }
                        return this.triggers
                    }, this.removeTrigger = function (e) {
                        this.triggers = _.without(this.triggers, e), 0 === this.triggers.length && (this.triggers = null)
                    }, this.canShow = function () {
                        return isDismissedUntilReload(t) ? !1 : e.canShowOnDevice() ? !t.isShown() && t.canShowOnPage(pendo.getCurrentUrl()) && canStepBeRendered(t) : !1
                    }, this.after("render", function () {
                        var e = this;
                        if (showTooltipGuide(e, e.elements)) {
                            var t = e.element;
                            _.each(e.getTriggers(), function (e) {
                                e.add()
                            });
                            for (var n = /(auto|scroll)/, i = getScrollParent(t, n), r = getBody(); i && i !== r;) e.attachEvent(i, "scroll", _.throttle(_.bind(e.onscroll, e, i, n), 10)), i = getScrollParent(i, n)
                        }
                    }), this.reposition = function () {
                        var e = this,
                            t = e.attributes.width,
                            n = e.attributes.height,
                            i = e.attributes.layoutDir,
                            r = e.guideElement,
                            o = dom("._pendo-guide-container_", r),
                            a = getOffsetPosition(e.element),
                            s = getTooltipDimensions(a, n, t, i);
                        o.removeClass("top right bottom left").removeClass("_pendo-guide-container-top_ _pendo-guide-container-right_ _pendo-guide-container-bottom_ _pendo-guide-container-left_").addClass(s.arrowPosition).addClass("_pendo-guide-container-" + s.arrowPosition + "_"), dom("._pendo-guide-arrow_,._pendo-guide-arrow-border_", r).remove(), buildAndAppendArrow(r, s), r.css({
                            top: s.top,
                            left: s.left,
                            height: s.height,
                            width: s.width,
                            position: a.fixed ? "fixed" : ""
                        }), e.dim = s
                    }, this.onscroll = function (e, t) {
                        var n = this,
                            i = getClientRect(n.element),
                            r = n.dim;
                        isVisibleInScrollParent(i, e, t) ? (r = getTooltipDimensions(i, n.attributes.height, n.attributes.width, r.arrowPosition), setStyle(n.elements[0], "display:block;top:" + r.top + "px;left:" + r.left + "px"), n.dim = r) : setStyle(n.elements[0], "display:none")
                    }, this.teardownElementEvent = function () {
                        _.each(this.triggers, function (e) {
                            e.remove()
                        })
                    }, this.after("hide", function () {
                        dom("._pendo-guide-tt-region-block_").remove(), lastBlockBox = null, lastBodySize = null, lastScreenCoords = null
                    })
                }
                return this
            }

            function Lightbox() {
                var e = this;
                return /lightbox/i.test(e.type) && (e.attributes.height = e.attributes.height || pendo.LB_DEFAULT_HEIGHT, e.attributes.width = e.attributes.width || pendo.LB_DEFAULT_WIDTH, e.after("render", function () {
                    isMobileUserAgent() ? showMobileLightboxGuide(e, e.elements) : showLightboxGuide(e, e.elements)
                }), e.reposition = function () {
                    isMobileUserAgent() || e.guideElement.css({
                        "margin-left": -Math.floor(e.attributes.width / 2),
                        "margin-top": -Math.floor(e.attributes.height / 2)
                    })
                }), e
            }

            function Banner() {
                var e = this;
                return "banner" === e.type && (e.attributes.height = e.attributes.height || BANNER_DEFAULT_HEIGHT, e.attributes.position = e.attributes.position || "top", e.after("render", function () {
                    var t = e.guideElement,
                        n = pendo.TOOLTIP_ARROW_SIZE;
                    t.css({
                        width: ""
                    }).addClass(BANNER_CSS_NAME).addClass("_pendo-guide-banner-" + e.attributes.position + "_"), isPreviewing() || t.addClass("_pendo-in_"), dom("._pendo-guide-container_", t).css({
                        bottom: n,
                        right: n
                    }), e.element = getElementForGuideStep(e), e.elements.push(t[0]), t.appendTo(getGuideAttachPoint())
                })), e
            }

            function WhatsNew(e) {
                function t() {
                    return !!s.guideElement
                }

                function n() {
                    var t = s.guideElement;
                    t && !isInDocument(t[0]) && (dom("._pendo-launcher_ #launcher-" + s.guideId).html("").append(t), _.isFunction(s.script) && s.script(s, e))
                }

                function i() {
                    var e = s.guideElement,
                        t = s.attributes.height;
                    e && e.html() || (e = dom("<div>").attr("id", getStepDivId(s)).addClass("_pendo-guide-whatsnew_").html(s.getContent()), _.isNumber(t) && !s.attributes.autoHeight && e.height(t), s.seenState === l && e.addClass(u), s.guideElement = e)
                }

                function r() {
                    isPreviewing() || t() && s.seenState !== l && o(s.guideElement[0]) && (seenGuide(s.guideId, s.id, pendo.get_visitor_id(), d, e.language, {
                        last_updated_at: s.lastUpdatedAt
                    }), s.seenState = l, _.delay(function () {
                        s.guideElement.addClass(u + " out")
                    }, _.isNumber(s.attributes.seenDelay) ? s.attributes.seenDelay : c))
                }

                function o(e) {
                    if (isElementVisible(e, /(auto|scroll|hidden)/)) {
                        var t = getScrollParent(e),
                            n = getClientRect(t),
                            i = getClientRect(e),
                            r = n.top + Math.floor(n.height / 3);
                        return i.bottom <= n.bottom || i.top <= r
                    }
                }

                function a() {}
                var s = this,
                    d = "whatsnew",
                    u = "_pendo-guide-whatsnew-seen_",
                    l = "active",
                    c = 1e3;
                return s.type === d && (_.extend(s, {
                    isShown: _.constant(!1),
                    launch: a,
                    onShown: a,
                    render: i,
                    seen: r
                }), _.extend(e, {
                    addToLauncher: n,
                    isReady: t
                }), s.after("show", r)), s
            }

            function Poll(e) {
                var t = this;
                if (t.pollIds && t.pollIds.length) {
                    var n, i = "_pendo-poll-selected_",
                        r = _.indexBy(e.polls, "id"),
                        o = _.map(t.pollIds, function (e) {
                            return r[e]
                        }),
                        a = function (e, t) {
                            return e && t !== undefined ? e.numericResponses ? parseInt(t, 10) : t : void 0
                        },
                        s = function () {
                            var n = e.id,
                                i = t.id;
                            advancedGuide(n, i, pendo.get_visitor_id(), t.seenReason, e.language), _updateGuideStepStatus(n, i, "advanced"), writeLastStepSeenCache({
                                guideId: n,
                                guideStepId: i,
                                time: (new Date).getTime(),
                                state: "advanced"
                            })
                        },
                        d = function () {
                            var e = dom("._pendo-poll_"),
                                n = dom("._pendo-poll-message_");
                            n.length ? (e.addClass("_pendo-poll-submitted_"), n.css("margin-top:-" + n.height() / 2 + "px"), s()) : t.advance()
                        },
                        u = function (e, t) {
                            return t && t.polls && t.polls.length ? _.find(t.polls, function (t) {
                                return t.id === e
                            }) : void 0
                        };
                    t.after("render", function () {
                        var e = Sizzle("._pendo-poll_")[0],
                            n = Sizzle("._pendo-poll-submit_", e)[0];
                        n ? t.attachEvent(n, "click", function (n) {
                            var i = Sizzle("._pendo-poll-question_", e),
                                r = _.map(i, function (e, t) {
                                    var n = Sizzle("textarea,input:text,select,input:radio:checked", e);
                                    if (n && n.length && n[0].value) {
                                        var i = o[t];
                                        return {
                                            pollId: i.id,
                                            value: a(i, n[0].value)
                                        }
                                    }
                                });
                            t.response(_.compact(r)), d()
                        }) : t.attachEvent(e, "click", function (e) {
                            var n = dom(getTarget(e)).closest("._pendo-poll-question_ :button,._pendo-poll-question_ :radio");
                            if (n.length) {
                                var i = o[0],
                                    r = a(i, n.attr("data-pendo-poll-value") || n.attr("value"));
                                t.response([{
                                    pollId: i.id,
                                    value: r
                                }]), d()
                            }
                        })
                    }), t.after("render", function () {
                        var e = Sizzle("._pendo-poll_ ._pendo-poll-npsrating_")[0],
                            n = dom("._pendo-poll_ ._pendo-poll-submit_"),
                            r = "_pendo-poll-npsrating-selected_";
                        e && (n.css({
                            display: "none"
                        }), t.attachEvent(e, "click", function (o) {
                            var a = Sizzle(":radio:checked", e)[0],
                                s = dom("._pendo-poll_");
                            dom("label", e).removeClass(i), s.removeClass(r), a && (dom('label[for="' + a.id + '"]').addClass(i), s.addClass(r), n.css({
                                display: ""
                            })), _.isFunction(t.resize) && t.resize()
                        }))
                    }), t.after("show", function () {
                        n = (new Date).getTime()
                    }), t.response = function (i, r) {
                        i && i.length && (_.each(i, function (i, r) {
                            var o = u(i.pollId, e),
                                a = createGuideEvent("pollResponse", t.guideId, t.id, pendo.get_visitor_id(), undefined, e.language);
                            _.extend(a.props, {
                                poll_id: i.pollId,
                                poll_response: i.value,
                                duration: (new Date).getTime() - n
                            }), o && o.attributes && o.attributes.type && _.extend(a.props, {
                                poll_type: o.attributes.type
                            }), pollEventQueue.push(a)
                        }), pollEventQueue.flush())
                    }
                }
                return t
            }

            function GuideStep(e) {
                var t = !1,
                    n = !1;
                return this.guide = e, this.elements = [], this.handlers = [], this.attributes = this.attributes || {}, this.getGuide = function () {
                    return this.guide
                }, this.getContent = function () {
                    var e = this,
                        t = this.getGuide(),
                        n = t && t.steps || [],
                        i = _.indexOf(n, e),
                        r = getMetadata();
                    _.isObject(r) || (r = prepareOptions());
                    try {
                        var o = e.attributes.variables || {},
                            a = {
                                step: {
                                    id: e.id,
                                    isFirst: 0 === i,
                                    isLast: i === n.length - 1,
                                    index: i,
                                    number: i + 1
                                },
                                guide: {
                                    id: t.id,
                                    name: t.name,
                                    publishedAt: t.publishedAt,
                                    showsAfter: t.showsAfter,
                                    percentComplete: n.length ? Math.round((i + 1) / n.length * 100) : 0,
                                    stepCount: n.length
                                },
                                metadata: escapeStringsInObject(r),
                                template: o
                            };
                        return e.template || (e.template = _.template(e.content || "")), replaceWithContentHost(e.template(a).replace(/#_pendo_g_undefined/g, "#_pendo_g_" + e.id).replace(/pendo-src="([^"]+)"/g, function (e, t) {
                            return /<%=[^>]+>/.test(t) ? e : 'src="' + t + '"'
                        }))
                    } catch (s) {
                        return e.content
                    }
                }, this.isLocked = function () {
                    return t
                }, this.lock = function () {
                    t = !0
                }, this.unlock = function () {
                    t = !1
                }, this.isTimedOut = function () {
                    return n
                }, this.timeout = function () {
                    n = !0
                }, this.isRendered = function () {
                    return this.elements && this.elements.length > 0
                }, this.isShown = function () {
                    return this.isRendered() || this.isLocked()
                }, this.canShow = function () {
                    var t = this;
                    return get(t, "guide.attributes.isAnnouncement") ? !1 : e.canShowOnDevice() ? t.isShown() ? !1 : t.canShowOnPage(pendo.getCurrentUrl()) && canStepBeRendered(t) : !1
                }, this.canShowOnPage = function (e) {
                    return pendo.testUrlForStep(this.regexUrlRule, e)
                }, this.shouldAutoDisplay = function () {
                    return !this.hasBeenControlled() && !this.isSnoozed() && !_.contains(["dismissed", "advanced"], this.seenState)
                }, this.autoDisplay = function () {
                    var e = this;
                    e.shouldAutoDisplay() && e.show("auto")
                }, this._preRenderHealthCheck = function () {
                    var t = this;
                    if (pendo.designer || isPreviewing() || isInPreviewMode()) return !0;
                    var n = pendo.getCurrentUrl(),
                        i = {
                            guideId: t.guideId,
                            stepId: t.id
                        };
                    return t.regexUrlRule && !pendo.testUrlForStep(t.regexUrlRule, n) ? (Tombstone.addGuide(e), writeException(new Error('attempted display on page "' + n + '"'), "pendo.io page rule exception", i), !1) : store.getters["healthCheck/isMissingPageRule"]()(t) ? (Tombstone.addGuide(e), writeException(new Error('missing regexUrlRule"'), "pendo.io page rule exception", i), !1) : t.pageId && !t.regexUrlRule ? (Tombstone.addGuide(e), writeException(new Error("missing regexUrlRule for page " + t.pageId + '"'), "pendo.io page rule exception", i), !1) : !0
                }, this.render = function () {
                    var t = this;
                    if (this._preRenderHealthCheck()) {
                        if (t.domJson) {
                            if (t.eventRouter = new EventRouter, e.skipResourceCenterHomeView && e.moduleIdToReplaceHomeViewWith && e.hasEligibleNativeIntegrationModule) {
                                var n = _.find(pendo.guides, function (t) {
                                        return t.id === e.moduleIdToReplaceHomeViewWith
                                    }),
                                    i = get(n, "attributes.resourceCenter.integrationProvider");
                                return BuildingBlockResourceCenter.renderNativeIntegration(i, n)
                            }
                            return e.continueToNativeModule ? BuildingBlockResourceCenter.handleNativeIntegrationContinuation(e) : (get(e, "attributes.resourceCenter") && resourceCenterShowingProc(BuildingBlockResourceCenter.getResourceCenter(), resourceCenterBadgeProc), e.isModule ? BuildingBlockGuides.renderResourceCenterModule(e) : BuildingBlockGuides.renderGuideFromJSON(t.domJson, t))
                        }
                        var r = t.attributes.width,
                            o = t.attributes.height,
                            a = pendo.TOOLTIP_ARROW_SIZE,
                            s = "_pendo-group-id-" + e.id + "_",
                            d = dom("<div>").attr("id", getStepDivId(t)).addClass(GUIDE_CSS_NAME + " " + s),
                            u = dom("<div/>").addClass("_pendo-guide-content_").html(t.getContent()),
                            l = dom("<div/>").addClass("_pendo-guide-container_"),
                            c = dom("<div/>").addClass("_pendo-backdrop_");
                        d.width(r), d.height(o), l.css({
                            left: a,
                            top: a
                        }), t.isEditable && u.attr("contenteditable", "true"), u.appendTo(l), l.appendTo(d), e && _.isFunction(e.isOnboarding) && e.isOnboarding() && d.addClass("_pendo-onboarding_"), t.overlayDiv = c, t.guideElement = d
                    }
                }, this.teardown = function () {
                    log("guide step teardown", "guide", "render"), _.each(this.handlers, function (e) {
                        detachEvent(e.element, e.type, e.fn, !0)
                    }), this.hasBeenScrolledTo = !1, clearInterval(this.timeoutTimer), delete this.timeoutTimer, this.handlers.length = 0, this.attributes.imgCount = 0
                }, this.show = function (t) {
                    var n = this;
                    if (_.contains(["auto", "continue"], t) && store.getters["healthCheck/isRedisplay"]()(this)) return void store.dispatch("healthCheck/fixSeenStateAndLogError", {
                        step: this,
                        reason: t
                    });
                    if (!isPreviewing() && e.control) return void(n.hasBeenControlled() || n.onControlGuide("control"));
                    var i = GuideDisplay.show(n, t);
                    i && i["catch"] && i["catch"](_.noop)
                }, this._show = function (t) {
                    var n = this;
                    if (!n.canShow()) {
                        var i = ["dom", "launcher", "badge", "api"],
                            r = _.indexOf(i, t) > -1;
                        if (!getPendoConfigValue("enableGuideTimeout") && !getOption("enableGuideTimeout")) return;
                        if ("active" === n.seenState) return;
                        if (this.isTimedOut()) return;
                        var o = e && e.steps;
                        if (!o) return;
                        var a = _.indexOf(o, n);
                        if (0 === a && !r) return;
                        return void(n.shouldStartTimer() && n.beginTimeoutTimer())
                    }
                    n.render(), n.isShown() && n.onShown(t)
                }, this.shouldStartTimer = function () {
                    return e.canShowOnDevice() && !e.attributes.isAnnouncement && !isDismissedUntilReload(this)
                }, this.getStepPollTypes = function (e, t) {
                    if (t.pollIds && t.pollIds.length) {
                        var n = [];
                        return _.forEach(t.pollIds, function (t) {
                            var i = _.find(e.polls, function (e) {
                                return e.id === t
                            });
                            i && i.attributes && i.attributes.type && n.push(i.attributes.type)
                        }), n
                    }
                }, this.onControlGuide = function (t) {
                    var n = this;
                    if (!isPreviewing()) {
                        n.seenReason = t, seenTime = (new Date).getTime();
                        var i = this.getStepPollTypes(e, n);
                        n.hasBeenControlled() || (controlledGuide(n.guideId, n.id, pendo.get_visitor_id(), t, e.language, i), _.each(e.steps, function (e) {
                            e.seenState = "notSeen"
                        }))
                    }
                }, this.onShown = function (t) {
                    var n = this;
                    if (n.overrideElement && (dom.addClass(n.overrideElement, "triggered"), n.overrideElement.checkAriaExpanded && n.overrideElement.checkAriaExpanded()), !isPreviewing()) {
                        n.seenReason = t, n.seenState = "active", seenTime = (new Date).getTime();
                        var i = {
                                last_updated_at: n.lastUpdatedAt
                            },
                            r = this.getStepPollTypes(e, n);
                        r && (i.step_poll_types = r), seenGuide(n.guideId, n.id, pendo.get_visitor_id(), t, e.language, i), store.dispatch("guideState/updateLastGuideStepSeen", {
                            guideId: e.id,
                            guideStepId: n.id,
                            time: seenTime,
                            state: n.seenState,
                            seenReason: t,
                            visitorId: pendo.get_visitor_id()
                        }), _.each(e.steps, function (n) {
                            "snoozed" === n.seenState && (n.snoozeEndTime = 0, snoozeCanceledGuide(e.id, n.id, pendo.get_visitor_id(), t, e.language))
                        }), _.isFunction(n.script) && n.script(n, e)
                    }
                    store.dispatch("frames/guideStepShownInFrame", {
                        guideId: e.id,
                        stepId: n.id,
                        isShown: n.isShown()
                    })
                }, this.hide = function (t) {
                    var n = this;
                    n.unlock(), n.teardown(), _.each(n.elements, function (e) {
                        removeNode(e)
                    }), n.attributes && t && t.stayHidden && (n.attributes.stayHidden = t.stayHidden), n.elements.length = 0, n.element = null, n.guideElement = null, n.overrideElement && (dom.removeClass(n.overrideElement, "triggered"), n.overrideElement.checkAriaExpanded && n.overrideElement.checkAriaExpanded()), store.dispatch("frames/guideStepHiddenInFrame", {
                        guideId: e.id,
                        stepId: n.id
                    })
                }, this.advance = function () {
                    ("advanced" !== this.seenState || this.isRendered()) && pendo.onGuideAdvanced(this)
                }, this.dismiss = function () {
                    ("dismissed" !== this.seenState || this.isRendered()) && pendo.onGuideDismissed(this)
                }, this.isPoweredByEnabled = function () {
                    return this.hideCredits !== !0
                }, this.isSnoozed = function () {
                    var e = "snoozed" === this.seenState,
                        t = this.snoozeEndTime ? (new Date).getTime() > this.snoozeEndTime : !0;
                    return e && !t
                }, this.hasBeenControlled = function () {
                    return e.isControlGroup() && "notSeen" === this.seenState
                }, this.attachEvent = function (e, t, n) {
                    var i = {
                        element: e,
                        type: t,
                        fn: n
                    };
                    attachEvent(e, t, n, !0), this.handlers.push(i)
                }, this.searchFor = function (e) {
                    return e.length < 3 ? !1 : strContains(this.content, e, !0)
                }, this.hasBeenSeen = function () {
                    return "advanced" == this.seenState || "dismissed" == this.seenState
                }, this.reposition = function () {}, this.beginTimeoutTimer = function () {
                    var e = getGuideSeenTimeoutLength(),
                        t = _.bind(function () {
                            var t, n = this.getGuide();
                            t = this.canShowOnPage(pendo.getCurrentUrl()) ? canStepBeRendered(this) ? "other" : "element" : "page", timeoutGuide(n.id, this.id, pendo.get_visitor_id(), t, n.language, e), pendo.log("Guide Timed Out"), this.timeout(), delete this.timeoutTimer
                        }, this);
                    this.timeoutTimer || (this.timeoutTimer = setTimeout(function () {
                        t()
                    }, e))
                }, this
            }

            function AutoHeight() {
                var e = this;
                if (e.attributes && e.attributes.autoHeight) {
                    var t = function () {
                        return "tooltip" == e.type || isBrowserInQuirksmode() && "lightbox" == e.type
                    };
                    e.after("render", function () {
                        e.resize(), e.attachEvent(e.guideElement[0], "load", function () {
                            e.resize()
                        })
                    }), e.resize = function () {
                        var n = pendo.TOOLTIP_ARROW_SIZE,
                            i = e.guideElement,
                            r = dom("._pendo-guide-container_", i);
                        t() ? r.css({
                            width: e.attributes.width - 2 * n,
                            height: ""
                        }) : r.css({
                            right: n,
                            bottom: ""
                        }), e.attributes.height = r.height() + 2 * n, i.height(e.attributes.height), e.reposition()
                    }
                }
                return e
            }

            function CloseButton(e) {
                var t = this;
                return t.domJson || t.domJsonpUrl ? t : (t.after("render", function () {
                    addCloseButton(t.guideElement[0], function () {
                        (!e.isOnboarding() || confirm("Are you sure you want to stop this tutorial?")) && pendo.onGuideDismissed(t)
                    })
                }), t)
            }

            function Credits() {
                var e = this;
                return e.hideCredits || e.domJson || e.domJsonpUrl || e.after("render", function () {
                    pendo._addCredits(e.guideElement[0])
                }), e
            }

            function PreviewMode() {
                var e = this;
                return e.after("render", function () {
                    adjustPreviewBarPosition(document)
                }), e
            }

            function WalkthroughGuide() {
                var e = !1;
                if (this.isMultiStep || this.isModule || this.isTopLevel) {
                    _.each(this.steps, function (e) {
                        e.after("render", function () {
                            _.each(e.elements, function (e) {
                                dom(e).addClass("_pendo-guide-walkthrough_")
                            })
                        })
                    });
                    var t = function (e, t) {
                            if (!e) return !0;
                            var n = _.last(e);
                            return n.attributes.isRequired != t.attributes.isRequired && n.attributes.isRequired ? !0 : !1
                        },
                        n = null;
                    this.sections = _.reduce(this.steps, function (e, i) {
                        return t(n, i) ? (e.push(n), n = [i]) : n.push(i), e
                    }, []), this.sections = _.compact(this.sections.concat([n])), this.findSectionForStep = function (e) {
                        return _.find(this.sections, function (t) {
                            return _.contains(t, e)
                        })
                    }, this.getSubSection = function (e, t) {
                        var n = _.indexOf(e, t);
                        return e.slice(n + 1)
                    }, this.isContinuation = function (e) {
                        var t = this.isTopLevel || this.isModule,
                            n = this.hasResourceCenterContent;
                        return t ? n && !!this.nextStep(e) : !!this.nextStep(e)
                    };
                    var i = 432e5;
                    this.nextStep = function (t) {
                        var n = null,
                            r = this;
                        if (r.isGuideSnoozed()) return null;
                        t = t || {};
                        for (var o = 0; o < r.steps.length; o++)
                            if (r.steps[o].id === t.guideStepId) {
                                if ("dismissed" === t.state) break;
                                if ("active" === t.state || "snoozed" === t.state) {
                                    n = r.steps[o];
                                    break
                                }
                                if ("advanced" === t.state && t.destinationStepId) {
                                    n = _.find(r.steps, function (e) {
                                        return e.id === t.destinationStepId
                                    });
                                    break
                                }
                                if (o + 1 < r.steps.length) {
                                    n = r.steps[o + 1];
                                    break
                                }
                            } if (n) {
                            var a = (new Date).getTime(),
                                s = t.time;
                            return s && a - s > i && !isOB(r) ? (e || (log("Multi-step continuation has expired", "guides", "info"), e = !0), null) : n
                        }
                        return null
                    }, this.shouldAutoDisplay = function () {
                        var e = this;
                        return e.hasLaunchMethod("auto") && (e.shouldShowSnoozedGuide() || _.all(e.steps, function (e) {
                            return e.shouldAutoDisplay()
                        }))
                    }, this.autoDisplay = function () {
                        var e = this;
                        if (e.shouldAutoDisplay()) {
                            var t = _.first(e.steps),
                                n = e.nextStep(getLastGuideStepSeen()) || t,
                                i = e.shouldShowSnoozedGuide();
                            i ? n.show("auto") : t.autoDisplay()
                        }
                    }, this.launch = function (e) {
                        var t = _.first(this.steps);
                        t.show(e)
                    }, this.show = function (e) {
                        var t = this,
                            n = getLastGuideStepSeen(),
                            i = _.first(t.steps),
                            r = t.nextStep(n) || i;
                        r.show(r === i && "auto" === get(n, "seenReason") ? "auto" : e)
                    }, this.isComplete = function () {
                        var e = ["advanced", "dismissed"],
                            t = _.last(this.steps);
                        return t ? _.contains(e, t.seenState) : !1
                    }, this.activeStep = function () {
                        var e = [].concat(this.steps).reverse();
                        return _.findWhere(e, {
                            seenState: "active"
                        })
                    }
                }
                return this
            }

            function GroupGuide() {
                var e = this;
                return e.attributes && "group" == e.attributes.type && (e.checkForHiddenGroupSteps = function () {
                    _.each(e.steps, function (e) {
                        e.isShown() || e.autoDisplay()
                    })
                }), e
            }

            function GuideErrorThrottle() {
                function e(e) {
                    var n = [];
                    return function (i) {
                        try {
                            return i.apply(t, _.toArray(arguments).slice(1))
                        } catch (r) {
                            var o = 5,
                                a = "ERROR in guide " + e + ' (ID="' + t.id + '")';
                            if (n.push(getNow()), n.length >= o) {
                                var s = _.last(n) - _.first(n),
                                    d = s > 0 ? (n.length - 1) / (s / 6e4) : 1 / 0;
                                d >= GuideErrorThrottle.MAX_ERRORS_PER_MINUTE && (a = "Exceeded error rate limit, dropping guide.\n" + a, Tombstone.addGuide(t), Events.trigger("renderFail", t)), n.shift()
                            }
                            throw writeException(r, a), r
                        }
                    }
                }
                var t = this;
                return _.each(["canShow", "placeBadge", "show"], function (n) {
                    t[n] = _.wrap(t[n], e(n))
                }), t
            }

            function Guide() {
                if (this.elements = [], this.attributes = this.attributes || {}, this.attributes.device && this.attributes.device.type)
                    if ("all" == this.attributes.device.type) this.attributes.device = {
                        desktop: !0,
                        mobile: !0
                    };
                    else {
                        var e = this.attributes.device.type;
                        this.attributes.device = {
                            mobile: !1,
                            desktop: !1
                        }, this.attributes.device[e] = !0
                    }
                else this.attributes.device = this.attributes.device || {};
                _.each(this.steps, function (e) {
                    "mobile-lightbox" === e.type && (this.attributes.device.desktop = !1, this.attributes.device.mobile = !0), GuideStep.create(e, this)
                }, this), this.isActivatedByEvent = function (e) {
                    var t = this;
                    return !!(t.hasLaunchMethod("dom") && t.attributes && t.attributes.activation && _.contains(t.attributes.activation.event, e) && this.canEventActivatedGuideBeShown())
                }, this.isContinuation = function (e) {
                    return !1
                }, this.isGuideWidget = function () {
                    var e = this;
                    return e.attributes && "launcher" === e.attributes.type
                }, this.isOnboarding = function () {
                    var e = this;
                    return e.attributes && !!e.attributes.isOnboarding
                }, this.isWhatsNew = function () {
                    var e = _.first(this.steps);
                    return e && "whatsnew" === e.type
                }, this.isAnnouncement = function () {
                    return get(this, "attributes.isAnnouncement")
                }, this.isHelpGuide = function () {
                    return !this.isOnboarding() && !this.isWhatsNew() && !this.isGuideWidget()
                }, this.nextStep = function (e) {
                    return null
                }, this.hasLaunchMethod = function (e) {
                    return this.launchMethod && this.launchMethod.indexOf(e) >= 0
                }, this.shouldAutoDisplay = function () {
                    var e = this;
                    return e.hasLaunchMethod("auto") && _.any(e.steps, function (e) {
                        return e.shouldAutoDisplay()
                    })
                }, this.autoDisplay = function () {
                    var e = this;
                    e.shouldAutoDisplay() && _.each(e.steps, function (e) {
                        e.autoDisplay()
                    })
                }, this.isShown = function () {
                    return _.any(this.steps, function (e) {
                        return e.isShown()
                    })
                }, this.canShowOnDevice = function () {
                    var e = this;
                    if (!isPreviewing()) {
                        var t = isMobileUserAgent(),
                            n = !t,
                            i = e.attributes && e.attributes.device || {};
                        if (n && i.desktop === !1) return !1;
                        if (t && i.mobile !== !0) return !1
                    }
                    return !0
                }, this.canShow = function () {
                    var e = this;
                    return e.canShowOnDevice() && _.any(e.steps, function (e) {
                        return e.canShow()
                    })
                }, this.launch = function (e) {
                    var t = this;
                    return t.hasGuideBeenControlled() || t.show(e), t.isShown() ? void _.each(t.steps, function (e) {
                        e.seenState = "active"
                    }) : !t.isShown() && t.isControlGroup() ? void _.each(t.steps, function (e) {
                        e.seenState = "notSeen"
                    }) : void 0
                }, this.show = function (e) {
                    var t = this;
                    _.each(t.steps, function (t) {
                        t.show(e)
                    })
                }, this.checkForHiddenGroupSteps = function () {}, this.hide = function (e) {
                    var t = this;
                    _.each(t.steps, function (t) {
                        t.hide(e)
                    })
                }, this.hasBeenSeen = function () {
                    var e = this;
                    return _.all(e.steps, function (e) {
                        return e.hasBeenSeen()
                    })
                }, this.canBadgeBeShown = function () {
                    var e = this.attributes.badge;
                    return e && e.isOnlyShowOnce && this.hasBeenSeen() ? !1 : !0
                }, this.placeBadge = function () {
                    if (this.canShowOnDevice() && this.hasLaunchMethod("badge") && this.canBadgeBeShown()) {
                        var e = get(this, "attributes.resourceCenter");
                        if (this.isControlGroup() && !e) return void(this.hasGuideBeenControlled() || this.steps[0].onControlGuide("control"));
                        var t = _.first(this.steps);
                        t && _.isFunction(t.canShowOnPage) && t.canShowOnPage(pendo.getCurrentUrl()) && placeBadge(this)
                    } else removeBadgeForGuide(this)
                }, this.findStepById = function (e) {
                    return _.find(this.steps, function (t) {
                        return t.id === e
                    })
                }, this.isPoweredByEnabled = function () {
                    return !!_.find(this.steps, function (e) {
                        return e.isPoweredByEnabled()
                    })
                }, this.searchFor = function (e) {
                    var t = this,
                        n = null;
                    if (strContains(this.name, e, !0)) n = "name";
                    else {
                        var i = [],
                            r = !1;
                        if (this.attributes && this.attributes.launcher && this.attributes.launcher.keywords && (i = this.attributes.launcher.keywords), i.length > 0 && (r = _.find(i, function (t) {
                                return strContains(t.text, e, !0)
                            })), r) n = "tag";
                        else {
                            var o = _.map(this.steps, function (t) {
                                    return t.searchFor(e)
                                }),
                                a = _.compact(o).length > 0;
                            a && (n = "content")
                        }
                    }
                    return n ? {
                        guide: t,
                        field: n
                    } : !1
                }, this.shouldBeAddedToResourceCenter = function () {
                    var e = this;
                    if (!e.steps || !e.steps.length) return !1;
                    if (e.control) return !1;
                    if (e.eligibleInFrame) return !0;
                    if (!e.steps[0].content && !_.isFunction(e.steps[0].fetchContent)) return !1;
                    var t = e.steps[0];
                    return (e.hasLaunchMethod("launcher") || e.isWhatsNew()) && t.canShowOnPage(pendo.getCurrentUrl()) && e.canShowOnDevice() && canStepBeRendered(t) ? !0 : !1
                }, this.shouldBeAddedToLauncher = function () {
                    var e = this;
                    if (!e.steps || !e.steps.length) return !1;
                    var t = e.steps[0];
                    return (e.hasLaunchMethod("launcher") || e.isWhatsNew()) && t.canShowOnPage(pendo.getCurrentUrl()) && e.canShowOnDevice() && canStepBeRendered(t) ? !0 : !1
                };
                var t = "PENDO_HELPER_STEP";
                return this.getPositionOfStep = function (e) {
                    var n = this,
                        i = _.reject(n.steps, function (e) {
                            return strContains(e.content, t)
                        });
                    return _.indexOf(i, e) + 1
                }, this.getTotalSteps = function () {
                    var e = this,
                        n = _.reject(e.steps, function (e) {
                            return strContains(e.content, t)
                        });
                    return n.length
                }, this.getSeenSteps = function () {
                    return _.size(_.filter(this.steps, function (e) {
                        return e.hasBeenSeen()
                    }))
                }, this.isComplete = function () {
                    var e = ["advanced", "dismissed"];
                    return _.all(this.steps, function (t) {
                        return _.contains(e, t.seenState)
                    })
                }, this.isInProgress = function () {
                    var e = ["active", "advanced", "dismissed"];
                    return !this.isComplete() && _.any(this.steps, function (t) {
                        return _.contains(e, t.seenState)
                    })
                }, this.isNotStarted = function () {
                    return !this.isInProgress() && !this.isComplete()
                }, this.fetchContent = function () {
                    return q.all(_.map(this.steps, function (e) {
                        return _.isFunction(e.fetchContent) ? e.fetchContent() : void 0
                    }))
                }, this.canEventActivatedGuideBeShown = function () {
                    var e = this;
                    return e.attributes.dom && e.attributes.dom.isOnlyShowOnce && e.steps[0].hasBeenSeen() ? !1 : !0
                }, this.isGuideSnoozed = function () {
                    var e = this;
                    return _.any(e.steps, function (e) {
                        return e.isSnoozed()
                    })
                }, this.hasGuideBeenControlled = function () {
                    var e = this;
                    return _.any(e.steps, function (e) {
                        return e.hasBeenControlled()
                    })
                }, this.isControlGroup = function () {
                    var e = this;
                    return e.control
                }, this.shouldShowSnoozedGuide = function () {
                    var e = this,
                        t = !1;
                    return _.any(e.steps, function (e) {
                        return "dismissed" === e.seenState && (t = !0), !t && "snoozed" === e.seenState && e.snoozeEndTime && (new Date).getTime() > e.snoozeEndTime
                    })
                }, this
            }

            function GuideFactory(e) {
                return Guide.create(e)
            }

            function AdvanceTrigger(e, t, n) {
                this.element = e, "element" == t ? this.method = "click" : "hover" == t ? this.method = "mouseover" : this.method = t, this.step = n, this.guide = n.getGuide()
            }

            function loadGlobalScript(e) {
                var t = q.defer();
                return pendo.loadResource(e, function () {
                    t.resolve()
                }), t.promise
            }

            function validateGlobalScript(e, t) {
                return _.size(pendo.events._handlers.validateGlobalScript) > 0 ? pendo.ajax.get(t).then(function (e) {
                    return pendo.events.validateGlobalScript(e.data)
                }).then(function () {
                    return e(t)
                }) : e(t)
            }

            function ignoreEmptyGlobalScript(e, t) {
                return t ? e(t) : q.resolve()
            }

            function getAssetHost() {
                var e = ConfigReader.getHostedConfig("contentHost"),
                    t = getProtocol() + "//";
                return e ? t + e : ConfigReader.getLocalConfig("contentHost", t + ASSET_HOST)
            }

            function getDefaultCssUrl() {
                var e = getAssetHost(),
                    t = getPendoConfigValue("guideCssAssetPath");
                return t ? t : /local\.pendo\.io/.test(e) ? e + "/dist/guide.css" : e + "/agent/releases/" + PACKAGE_VERSION + "/guide.css"
            }

            function getActiveGuides() {
                return activeGuides
            }

            function setActiveGuides(e) {
                return _.isArray(e) ? (activeGuides = e, void Events.guideListChanged.trigger({
                    guideIds: _.pluck(e, "id")
                })) : void log("bad guide array iput to `setActiveGuides`")
            }

            function getGuideSeenTimeoutLength() {
                return getPendoConfigValue("guideSeenTimeoutLength") || DEFAULT_GUIDE_SEEN_TIMEOUT_LENGTH
            }

            function hideGuides(e) {
                _.each(getActiveGuides(), function (t) {
                    _.isFunction(t.isShown) && t.isShown() && t.hide(e)
                })
            }

            function checkLockedStep(e) {
                return e.isLocked() ? e.elements && e.elements.length ? (writeErrorPOST('guide "' + e.guideId + '", step "' + e.id + '" locked and rendered', "pendo.io locked step exception"), !1) : !0 : !1
            }

            function isDismissedUntilReload(e) {
                return e && e.attributes && e.attributes.stayHidden
            }

            function pullContentsFromTargetElement(e) {
                var t = pendo.dom(e),
                    n = t.text() || "",
                    i = n.trim().toLowerCase(),
                    r = e.value,
                    o = i || r;
                return o
            }

            function doesElementMatchContainsRules(e, t) {
                for (var n = pullContentsFromTargetElement(e), i = 0; i < t.length; i++) {
                    var r = t[i],
                        o = doesElementContentMatchRule(n, r);
                    if (!o) return !1
                }
                return !0
            }

            function doesElementContentMatchRule(e, t) {
                var n = t.matchType,
                    i = t.matchValue,
                    r = t.dataType,
                    o = e || "";
                if ("number" === r) {
                    var a = pendo.getNumberFromText(o);
                    if (null == a) return !1;
                    o = parseFloat(a), i = parseFloat(i);
                    var s = isNaN(o) || isNaN(i);
                    if (s) return !1
                } else "string" === r && (o = o.toLowerCase(), i = i.toLowerCase());
                return "equal" === n ? o === i : "notEqual" === n ? o !== i : "contains" === n ? String(o).indexOf(i) > -1 : "notContains" === n ? -1 === String(o).indexOf(i) : "greaterThan" === n ? o > i : "lessThan" === n ? i > o : !1
            }

            function getDefaultSeenReason(e) {
                var t = "auto";
                if (!e) return t;
                var n = (e.launchMethod || t).split("-");
                return _.contains(n, t) ? t : n.length ? _.first(n) : t
            }

            function dismissedGuide(e, t, n, i, r) {
                var o = createGuideEvent({
                    type: "guideDismissed",
                    guideId: e,
                    stepId: t,
                    visitorId: n,
                    seen_reason: i,
                    language: r
                });
                stageGuideEvent(o), Events.guideDismissed.trigger(o)
            }

            function snoozedGuide(e, t, n, i, r, o) {
                var a = createGuideEvent({
                    type: "guideSnoozed",
                    guideId: e,
                    stepId: t,
                    visitorId: n,
                    seen_reason: i,
                    language: r,
                    snooze_duration: o
                });
                stageGuideEvent(a), Events.guideSnoozed.trigger(a)
            }

            function advancedGuide(e, t, n, i, r, o, a) {
                var s = {
                    type: "guideAdvanced",
                    guideId: e,
                    stepId: t,
                    visitorId: n,
                    seen_reason: i,
                    language: r
                };
                a && (s.destinationStepId = a);
                var d = createGuideEvent(s);
                stageGuideEvent(d, null, o), Events.guideAdvanced.trigger(d)
            }

            function timeoutGuide(e, t, n, i, r, o) {
                var a = createGuideEvent({
                    type: "guideTimeout",
                    guideId: e,
                    stepId: t,
                    visitorId: n,
                    seen_reason: i,
                    language: r,
                    guideSeenTimeoutLength: o
                });
                stageGuideEvent(a), Events.guideTimeout.trigger(a)
            }

            function snoozeCanceledGuide(e, t, n, i, r) {
                var o = createGuideEvent({
                    type: "guideSnoozeCanceled",
                    guideId: e,
                    stepId: t,
                    visitorId: n,
                    seen_reason: i,
                    language: r
                });
                stageGuideEvent(o, null, !0), Events.guideSnoozeCancelled.trigger(o)
            }

            function writeThrottlingStateCache(e, t) {
                _writeThrottlingStateCache(e, t);
                var n = {};
                n[t] = e, store.dispatch("frames/changeThrottlingState", n)
            }

            function _writeThrottlingStateCache(e, t) {
                _.contains(_.values(THROTTLING_STATE), t) && (_.isFunction(e.getTime) && (e = e.getTime()), pendo[t] = e, agentStorage.write(t, e, GUIDE_STATE_TTL))
            }

            function createGuideEvent(e, t, n, i, r, o) {
                var a = e;
                "object" != typeof a && (a = {
                    type: e,
                    guideId: t,
                    stepId: n,
                    visitorId: i,
                    language: o
                }), r && (a.reason = r), _.isString(a.language) || delete a.language;
                var s = _.extend({
                    guide_id: a.guideId,
                    guide_step_id: a.stepId
                }, _.omit(a, "type", "guideId", "stepId", "visitorId"));
                return EventTracer.addTracerIds({
                    type: a.type,
                    visitor_id: a.visitorId,
                    account_id: pendo.get_account_id(),
                    browser_time: (new Date).getTime(),
                    url: pendo.url.externalizeURL(),
                    props: s
                })
            }

            function applyTimerCache(e, t) {
                return t = parseInt(t, 10), isNaN(t) || !_.isNumber(t) ? e : _.isNumber(e) && t > e ? t : _.isNumber(e) ? e : t
            }

            function postLoadGuideJs(e, t, n) {
                return pendo.ajax.postJSON(e, t).then(function (e) {
                    var t = findStoredPreviewConfig(localStorage);
                    return _.extend(pendo, e.data), t ? previewGuideRequest(t).then(n)["catch"](function () {
                        log("Fail to request guide preview"), n()
                    }) : n()
                })
            }

            function sortGuidesByPriority(e) {
                return _.each(e, function (e, t) {
                    e.attributes || (e.attributes = {}), (isNaN(e.attributes.priority) || !_.isNumber(e.attributes.priority)) && (e.attributes.priority = t)
                }), e.sort(function (e, t) {
                    return t.attributes.priority - e.attributes.priority
                }), e
            }

            function saveGuideShownState(e) {
                var t = _.find(e, function (e) {
                    return _.isFunction(e.isShown) && e.isShown() && !e.isTopLevel
                });
                if (!t) return function () {};
                var n = _.chain(t.steps).filter(function (e) {
                    return e.isShown()
                }).indexBy("id").value();
                return function (e) {
                    var i = _.findWhere(e, {
                        id: t.id
                    });
                    i && (get(i, "attributes.doNotResume") || _.each(i.steps, function (e) {
                        var t = n[e.id];
                        t && (e.seenState && "active" !== e.seenState || e.show(t.seenReason))
                    }))
                }
            }

            function loadExternalCss(e, t) {
                var n = document.getElementById(e);
                if (n && n.href && n.href.indexOf(t) >= 0) return q.resolve();
                var i = q.defer();
                dom(n).remove();
                var r = pendo.loadResource(t, function () {
                    i.resolve()
                });
                return r.id = e, i.promise
            }

            function waitForGlobalCssToLoad(e, t, n) {
                function i(n) {
                    setTimeout(function () {
                        r(o[0]) ? (o.remove(), s.resolve()) : t() - a > e ? (o.remove(), s.reject()) : i(100)
                    }, n)
                }

                function r(e) {
                    var t = getComputedStyle_safe(e);
                    if (t) return "none" === t.display
                }
                if (!shouldLoadGlobalCSS() || !hasLegacyGuides(activeGuides)) return q.resolve();
                t = t || getNow, n = n || "_pendo-hidden_";
                var o = dom("<div>").addClass(n).css({
                        position: "absolute",
                        bottom: "0px",
                        right: "0px",
                        width: "0px",
                        height: "0px",
                        visibility: "hidden"
                    }).appendTo(getGuideAttachPoint()),
                    a = t(),
                    s = q.defer();
                return i(0), s.promise
            }

            function hasLegacyGuides(e, t) {
                return t && t.designer ? !0 : _.any(e, function (e) {
                    return _.any(e.steps, function (e) {
                        return !(e.domUrl || e.domJsonpUrl)
                    })
                })
            }

            function loadGuideCss() {
                var e = [];
                if (!shouldLoadGlobalCSS()) return q.resolve();
                hasLegacyGuides(activeGuides, pendo) && e.push(loadExternalCss("_pendo-default-css_", getDefaultCssUrl()));
                var t = pendo.guideWidget || {},
                    n = t.data || {},
                    i = n.guideCssUrl,
                    r = "_pendo-css_";
                return i ? e.push(loadExternalCss(r, replaceWithContentHost(i))) : dom("#" + r).remove(), q.all(e)
            }

            function createGuideEventQueue(e) {
                function t(e, t) {
                    return pipeline(filterAnalyticsDisabled, splitSiloOnFieldChange("visitor_id"), splitSiloOnFieldChange("props.guide_id"), compressSilo, t(e), errorLogger)
                }
                var n = e.cache,
                    i = t(e, defaultSendEvent),
                    r = t(e, reliableSendEventForUnload),
                    o = siloReducer(n);
                return {
                    push: function (e) {
                        o(e, _.noop)
                    },
                    clear: function () {
                        n.length = 0
                    },
                    flush: function (e) {
                        if (0 !== n.length) {
                            var t = n.slice();
                            n.length = 0;
                            var o = (e || {}).guaranteed ? r : i;
                            o(t, _.noop)
                        }
                    }
                }
            }

            function getGuideAttachPoint() {
                var e = getGuideAttachPoint.attachPoint;
                if (null == e) {
                    var t = ConfigReader.get("guides.attachPoint");
                    if (t) {
                        try {
                            e = Sizzle(t)[0]
                        } catch (n) {
                            log('Error finding guide attach point "' + t + '"')
                        }
                        e || (e = document.createElement("div"))
                    } else e = !1;
                    getGuideAttachPoint.attachPoint = e
                }
                return e || getBody()
            }

            function startPreviewMode(e) {
                if (!detectMaster()) {
                    var t = findUrlPreviewConfig(e.location.search) || findStoredPreviewConfig(pendoLocalStorage);
                    if (t) {
                        var n = document.getElementById(pendoPreview);
                        return n ? !0 : (pendoLocalStorage && _.isFunction(pendoLocalStorage.setItem) && pendoLocalStorage.setItem(pendoPreview, JSON.stringify(_.extend(t, {
                            apiKey: pendo.apiKey
                        }))), _.isFunction(e.addEventListener) && e.addEventListener("message", previewMessageHandler), agentStorage.clear(LAST_STEP_ADVANCED_COOKIE), getBody().appendChild(createPreviewBar()), Events.startPreview.trigger(), !0)
                    }
                }
            }

            function launchPreviewListener(e) {
                e && e.data && e.data.type === pendoPreview + "::launch" && (pendoLocalStorage.removeItem("current-guide-preview"), pendoLocalStorage.setItem(pendoPreview, JSON.stringify(_.extend({
                    apiKey: pendo.apiKey,
                    origin: e.origin
                }, e.data.config))), startPreviewMode(window) && (e.source.postMessage({
                    type: pendoPreview + "::ready",
                    apiKey: pendo.apiKey,
                    accountId: pendo.accountId
                }, "*"), forceGuideReload(), store.dispatch("frames/startPreview")))
            }

            function restartPreview(e, t, n) {
                hideGuides(), store.commit("healthCheck/resetStepStatus", null, {
                    root: !0
                }), AsyncContent.reset(), forceGuideReload();
                var i = t[0];
                i && _.each(i.steps, function (e) {
                    e.seenState = null
                }), agentStorage.clear(LAST_STEP_ADVANCED_COOKIE), setPreviewState(null, e);
                var r = findStoredPreviewConfig(e),
                    o = r && e && _.isFunction(e.setItem);
                if (o) {
                    var a = _.findWhere(t, {
                        id: r.guideId
                    });
                    a && e.setItem(pendoPreview, JSON.stringify(_.extend(r, {
                        stepId: a.steps[0].id
                    })))
                }
                var s = preparePreviewLastGuideStepSeen(e, t, n);
                return s
            }

            function resizePreview(e) {
                var t = document.getElementById(pendoPreview);
                t && (t.style.height = e)
            }

            function previewMessageHandler(e) {
                var t = e.data.type;
                if (t === pendoPreview + "::exit") exitPreviewMode(), store.dispatch("frames/stopPreview");
                else if (t === pendoPreview + "::restart") {
                    var n = restartPreview(pendoLocalStorage, activeGuides, getLastGuideStepSeen());
                    store.dispatch("guideState/forceExpire"), store.dispatch("guideState/updateLastGuideStepSeen", n), store.dispatch("frames/restartPreview")
                } else if (t === pendoPreview + "::resize") resizePreview(e.data.height);
                else if (t === pendoPreview + "::request-preview-mode-type") {
                    var i = document.getElementById(pendoPreview),
                        r = findStoredDesignerPreviewConfig(pendoLocalStorage);
                    if (!i || !r) return;
                    i.contentWindow.postMessage({
                        mutation: "preview/setPreviewModeType",
                        payload: {
                            previewModeType: r.previewModeType || "NEW_TAB"
                        }
                    }, "*")
                }
            }

            function isInPreviewMode() {
                try {
                    return !!findStoredPreviewConfig(pendoLocalStorage)
                } catch (e) {
                    return !1
                }
            }

            function prepareDesignerPreviewGuide() {
                var e = findStoredDesignerPreviewConfig(pendoLocalStorage);
                e && isInDesignerPreviewMode() && (pendo.guides = [e.guide])
            }

            function isInDesignerPreviewMode() {
                var e = findStoredDesignerPreviewConfig(pendoLocalStorage);
                return isInPreviewMode() && !!e
            }

            function setPreviewState(e, t) {
                var n = findStoredPreviewConfig(t);
                n && (n.state = e, t && _.isFunction(t.setItem) && t.setItem(pendoPreview, JSON.stringify(n)))
            }

            function getPreviewState(e) {
                var t = findStoredPreviewConfig(e);
                if (t) return t.state
            }

            function createPreviewBar() {
                var e = document.createElement("iframe");
                e.id = pendoPreview, e.src = "about:blank";
                var t = "70px";
                return setStyles(e, {
                    border: "none",
                    display: "block !important",
                    height: t,
                    left: 0,
                    position: "fixed",
                    right: 0,
                    top: 0,
                    visibility: "visible !important",
                    width: "100%",
                    "z-index": 4e5
                }), e.onload = function () {
                    var t = document.createElement("script"),
                        n = getPendoConfigValue("previewModeAssetPath"),
                        i = getAssetHost() + "/agent/releases/" + PACKAGE_VERSION + "/pendo.preview.min.js";
                    t.src = n || i, e.contentDocument.body.appendChild(t)
                }, e
            }

            function preparePreviewGuides(e) {
                var t = findStoredPreviewConfig(pendoLocalStorage);
                return t ? t.isResourceCenter ? formatResourceCenterGuidesForPreview(e, t) : formatNormalGuidesForPreview(e, t) : e
            }

            function formatResourceCenterGuidesForPreview(e, t) {
                var n = BuildingBlockResourceCenter.findResourceCenterHomeView(e),
                    i = _.filter(e, function (e) {
                        return e.id !== n.id
                    });
                formatGuideSeenStateForPreviewGuide(n, t.stepId);
                var r = _.map(i, function (e) {
                        return e.launchMethod = "launcher", e
                    }),
                    o = [n].concat(r);
                return o
            }

            function formatNormalGuidesForPreview(e, t) {
                var n = _.find(e, function (e) {
                    return e.id === t.guideId
                });
                return "launcher" === n.launchMethod && (n.launchMethod = "auto-launcher"), "api" === n.launchMethod && (n.launchMethod = "auto"), formatGuideSeenStateForPreviewGuide(n, t.stepId), [n]
            }

            function formatGuideSeenStateForPreviewGuide(e, t) {
                for (var n = _.find(e.steps, function (e) {
                        return e.id === t
                    }), i = n ? e.steps.indexOf(n) : 0, r = 0; r < e.steps.length; r++) i > r ? (e.steps[r].seenState = "advanced", e.steps[r].seenReason = "continue") : (e.steps[r].seenState = null, e.steps[r].seenReason = null);
                return e
            }

            function preparePreviewLastGuideStepSeen(e, t, n) {
                var i = findStoredPreviewConfig(e);
                if (!i) return n;
                var r = _.findWhere(t, {
                    id: i.guideId
                });
                if (!r) return n;
                var o = r.launchMethod.indexOf("auto") > -1,
                    a = i.stepId === r.steps[0].id;
                return a && !o ? {} : {
                    guideId: i.guideId,
                    guideStepId: i.stepId,
                    state: "active"
                }
            }

            function sendPreviewModeFailureMessage(e, t) {
                var n = e.getElementById(pendoPreview);
                n && n.contentWindow.postMessage({
                    mutation: "preview/setGuideLoadError",
                    payload: {
                        guideLoadError: t
                    }
                }, "*")
            }

            function updatePreview(e, t, n) {
                if (isInPreviewMode()) {
                    var i = findStoredPreviewConfig(pendoLocalStorage);
                    if (i) {
                        var r = e.getElementById(pendoPreview);
                        if (r && r.contentWindow) {
                            if (!t || !t.length) return void sendPreviewModeFailureMessage(e, {
                                status: 404,
                                data: "Guide not found"
                            });
                            r.contentWindow.postMessage({
                                mutation: "preview/setGuideLoaded",
                                payload: {
                                    guideLoaded: !0
                                }
                            }, "*");
                            var o = _.find(t, function (e) {
                                    return e.id === i.guideId
                                }),
                                a = 0,
                                s = o.steps.length,
                                d = n || {};
                            _.find(o.steps, function (e, t) {
                                return d.guideStepId !== e.id ? !1 : ("dismissed" === d.state || "active" === d.state ? a = t : "advanced" === d.state && d.destinationStepId ? a = _.indexOf(o.steps, _.find(o.steps, function (e) {
                                    return e.id === d.destinationStepId
                                })) : "advanced" === d.state && t === s - 1 && (a = s), !0)
                            });
                            var u = "dismissed" === d.state,
                                l = a >= s - 1,
                                c = u || l,
                                p = l ? s - 1 : a,
                                f = o.steps[p];
                            r.contentWindow.postMessage({
                                mutation: "preview/setHostname",
                                payload: {
                                    hostname: SERVER
                                }
                            }, "*"), r.contentWindow.postMessage({
                                mutation: "preview/setGuidePages",
                                payload: {
                                    guidePages: o.previewPages
                                }
                            }, "*"), r.contentWindow.postMessage({
                                mutation: "preview/setGuideProgress",
                                payload: {
                                    guideName: o.name,
                                    guideAttributes: JSON.stringify(o.attributes),
                                    guideLaunchMethod: o.launchMethod,
                                    guideActivationSelector: DOMActivation.getActivationSelector(o),
                                    isAdoptGuide: o.isTraining,
                                    isResourceCenter: i.isResourceCenter,
                                    stepId: f && f.id,
                                    currentStepIndex: p,
                                    stepCount: s,
                                    elementPathRule: f.elementPathRule,
                                    elementContainsRulesList: f.elementContainsRulesList,
                                    pageId: f.pageId,
                                    completed: c
                                }
                            }, "*"), checkForGuidePreviewError(f, p, r)
                        }
                    }
                }
            }

            function adjustPreviewBarPosition(e) {
                var t = e.getElementById(pendoPreview);
                if (t) {
                    var n = _.first(Sizzle('#pendo-resource-center-container, [id^="pendo-g-"]'));
                    if (n) {
                        var i = getComputedStyle_safe(n);
                        if (i) {
                            var r = {
                                mutation: "preview/setIsPreviewBarTop",
                                payload: {
                                    isPreviewBarTop: !1
                                }
                            };
                            "0px" === i.top ? (t.style.top = "auto", t.style.bottom = "0px", t.contentWindow.postMessage(r, "*")) : "0px" !== i.bottom && t.style.top || (t.style.top = "0px", t.style.bottom = "auto", r.payload.isPreviewBarTop = !0, t.contentWindow.postMessage(r, "*"))
                        }
                    }
                }
            }

            function checkForGuidePreviewError(e, t, n) {
                if (e) {
                    var i = [];
                    if (0 === t) {
                        var r = DOMActivation.getActivationSelector(e.getGuide());
                        if (r) {
                            var o = _.first(pendo.Sizzle(r));
                            o ? isElementVisible(o) || i.push("ACTIVATION:elementNotVisible") : i.push("ACTIVATION:elementNotFound")
                        }
                    }
                    if (_.isFunction(e.canShowOnPage) && !e.canShowOnPage(pendo.getCurrentUrl()) && i.push("PAGE:pageMismatch"), e.elementPathRule) {
                        var a = _.first(pendo.Sizzle(e.elementPathRule));
                        a ? isElementVisible(a) ? e.elementContainsRulesList && !doesElementMatchContainsRules(a, e.elementContainsRulesList) && i.push("ELEMENT:elementContainsRulesDoNotMatch") : i.push("ELEMENT:elementNotVisible") : i.push("ELEMENT:elementNotFound")
                    }
                    n.contentWindow.postMessage({
                        mutation: "preview/setErrors",
                        payload: {
                            errors: i
                        }
                    }, "*")
                }
            }

            function exitPreviewMode() {
                var e = findStoredDesignerPreviewConfig(pendoLocalStorage),
                    t = !1;
                e && (t = "SAME_TAB" === e.previewModeType);
                var n = pendoLocalStorage.getItem("pendo-navigation-state");
                if (pendoLocalStorage && _.isFunction(pendoLocalStorage.removeItem) && pendoLocalStorage.removeItem(pendoPreview), buffersClearAll(), dom("#" + pendoPreview).remove(), forceGuideReload(), t && n) {
                    pendoLocalStorage.setItem(designerPreview, JSON.stringify(_.extend(e, {
                        isExitBackToDesigner: !0
                    })));
                    try {
                        var i = JSON.parse(n),
                            r = {
                                lookaside: i.baseUrl,
                                preloader: !0,
                                host: i.host
                            };
                        pendo.designerv2.launchInAppDesigner(r)
                    } catch (o) {
                        pendoLocalStorage.removeItem(designerPreview)
                    }
                } else window.close()
            }

            function parsePreviewToken(e) {
                try {
                    return JSON.parse(atob(decodeURIComponent(e)))
                } catch (t) {}
            }

            function findUrlPreviewConfig(e) {
                var t = _.map(e.replace(/^\?/, "").split("&"), function (e) {
                        return e.split("=")
                    }),
                    n = _.find(t, function (e) {
                        return e[0] === pendoPreview
                    });
                return n ? parsePreviewToken(n[1]) : void 0
            }

            function findStoredPreviewConfig(e) {
                try {
                    var t = JSON.parse(e.getItem(pendoPreview));
                    if (t.apiKey === pendo.apiKey) return t
                } catch (n) {}
            }

            function findStoredDesignerPreviewConfig(e) {
                var t = e.getItem(designerPreview);
                return t ? JSON.parse(t) : void 0
            }

            function previewGuideRequest(e) {
                var t = {
                    url: e.origin + e.guideUrl + "?url=" + encodeURIComponent(pendo.url.get()),
                    withCredentials: !0
                };
                return e.headers && (t.headers = e.headers), pendo.ajax(t).then(function (t) {
                    var n = t.data;
                    return e.isResourceCenter ? pendo.guides = n.guide : (n.guide.previewPages = n.pages, pendo.guides = [n.guide]), pendo.guideWidget = {
                        enabled: !1,
                        data: {
                            guideCssUrl: n.guideCssUrl
                        }
                    }, pendo.guideCssUrl = n.guideCssUrl, pendo.normalizedUrl = n.normalizedUrl, t
                })
            }

            function previewGuideLoaderWrapper(e, t) {
                return {
                    buildUrl: e.buildUrl,
                    load: function (n, i) {
                        var r = findStoredPreviewConfig(t);
                        return r && r.guideUrl ? previewGuideRequest(r).then(i) : e.load(n, i)
                    }
                }
            }

            function launchDesignerListener(e) {
                if (e && e.data && e.data.token && e.data.type === pendoDesignerLaunchKey + "::launch") {
                    var t = e.data.token,
                        n = {
                            lookaside: t.baseUrl,
                            host: t.host,
                            target: t.target || "latest",
                            DADesigner: !!t.DADesigner,
                            gcsBucket: t.DADesigner ? "da-designer" : "in-app-designer"
                        };
                    pendo.designerv2.launchInAppDesigner(n)
                }
            }

            function clearMode() {
                setMode(store.getters["frames/isFollower"]() ? PASSIVE_MODE : currentMode === PAUSED_MODE ? PAUSED_MODE : "default")
            }

            function continueOrCompleteUpdate() {
                store.getters["guideUpdate/isUpdating"]() ? waitThenLoop(50) : (!store.state.guideUpdate.useObserver || store.state.guideUpdate.needsUpdate) && waitThenLoop()
            }

            function runGuidePhase(e, t) {
                var n = function () {
                    store.commit("guideUpdate/completePhase", {
                        phase: e,
                        time: getNow()
                    })
                };
                if (!store.getters["guideUpdate/isPhaseComplete"]()(e) && (store.dispatch("guideUpdate/startPhase", e), !store.getters["guideUpdate/exceededIterationTime"]())) return t(n)
            }

            function guideShowingProc() {
                var e = getActiveGuide();
                e && (_.each(e.steps, function (t) {
                    stepShowingProc(e.guide, t)
                }), e.guide.checkForHiddenGroupSteps())
            }

            function stepShowingProc(e, t) {
                if (!t.isLocked() && !store.getters["frames/isShownInAnotherFrame"]()(t)) {
                    var n = t.element,
                        i = t.targetElement,
                        r = dom("." + GUIDE_CSS_NAME),
                        o = isElementVisible(n),
                        a = !0;
                    if (i && o && t.elementContainsRulesList && (a = doesElementMatchContainsRules(i, t.elementContainsRulesList), o = a), n && (o || r.hasClass("mouseover"))) {
                        if ("tooltip" == t.type && placeTooltip(t), t.domJson) {
                            if ("tooltip" === t.attributes.calculatedType) {
                                var s = BuildingBlockGuides.findGuideContainerJSON(t.domJson),
                                    d = dom("#" + s.props.id);
                                pendo.BuildingBlocks.BuildingBlockTooltips.placeBBTooltip(t, d[0])
                            }
                            t.attributes.blockOutUI && t.attributes.blockOutUI.enabled && pendo.BuildingBlocks.BuildingBlockGuides.updateBackdrop(t)
                        }
                    } else {
                        var u = "tooltip" === t.type || "tooltip" === t.attributes.calculatedType;
                        u && wouldBeVisibleAfterAutoScroll(n) && a || t.hide()
                    }
                }
            }

            function resourceCenterShowingProc(e, t) {
                if (!BuildingBlockResourceCenter.isFullyCustom(e)) {
                    var n = !1,
                        i = [],
                        r = _.filter(e.modules, function (t) {
                            if (!t) return !1;
                            if (BuildingBlockResourceCenter.isSandboxModule(t)) return !0;
                            if (BuildingBlockResourceCenter.isIntegrationModule(t)) return BuildingBlockResourceCenter.integrationModuleHasContent(t) ? !0 : (t.hasResourceCenterContent = !1, !1);
                            var r = _.filter(t.guidesInModule, function (e) {
                                    return e.shouldBeAddedToResourceCenter() ? (e.ineligibleForRC = !1, !0) : (e.ineligibleForRC = !0, e.control && i.push(e), !1)
                                }),
                                o = r.length;
                            if (t.hasResourceCenterContent = !!o, e.activeModule && t.id === e.activeModule.id) {
                                var a = crc32(_.map(r, function (e) {
                                    var t = e.isAnnouncement() || e.isWhatsNew(),
                                        n = t ? null : _.pluck(e.steps, "seenState");
                                    return {
                                        id: e.id,
                                        seenState: n
                                    }
                                }));
                                t.eligibleGuidesInModuleHash && a !== t.eligibleGuidesInModuleHash && (n = !0), t.eligibleGuidesInModuleHash = a
                            }
                            return o
                        }),
                        o = !1;
                    if (!e.activeModule) {
                        var a = crc32(_.map(r, function (e) {
                            return {
                                id: e.id
                            }
                        }));
                        e.eligibleModulesHash && e.eligibleModulesHash !== a && (o = !0, BuildingBlockResourceCenter.replaceResourceCenterContent(e.id, undefined, !0)), e.eligibleModulesHash = a
                    }
                    if (t(e, r, i), 1 === r.length) {
                        e.skipResourceCenterHomeView = !0, e.moduleIdToReplaceHomeViewWith = r[0].id;
                        var s = !e.activeModule && o,
                            d = e.activeModule && e.activeModule.id !== r[0].id;
                        (s || d || n) && BuildingBlockResourceCenter.replaceResourceCenterContent(e.moduleIdToReplaceHomeViewWith, undefined, !0)
                    }
                    if (r) {
                        var u = _.find(r, function (e) {
                                return e.isContinuation(getLastGuideStepSeen())
                            }),
                            l = get(u, "attributes.doNotResume"),
                            c = get(u, "attributes.resourceCenter.integrationProvider"),
                            p = BuildingBlockResourceCenter.isSupportedNativeIntegration(c);
                        p && !l && e && (e.continueToNativeModule = !0, u.continueToNativeModule = !0)
                    }
                    var f;
                    e.activeModule && (f = _.find(r, function (t) {
                        return t.id === e.activeModule.id
                    }), f && n && BuildingBlockResourceCenter.replaceResourceCenterContent(e.activeModule.id, undefined, !0), f || BuildingBlockResourceCenter.replaceResourceCenterContent(e.id)), BuildingBlockResourceCenter.repositionResourceCenter()
                }
            }

            function resourceCenterNotShowingProc(e, t) {
                if (!BuildingBlockResourceCenter.isFullyCustom(e)) {
                    var n = [],
                        i = [],
                        r = _.find(e.modules, function (e) {
                            return BuildingBlockResourceCenter.isSandboxModule(e) ? !0 : BuildingBlockResourceCenter.isIntegrationModule(e) ? BuildingBlockResourceCenter.integrationModuleHasContent(e) ? !0 : (e.hasResourceCenterContent = !1, !1) : !1
                        });
                    r && n.push(r);
                    var o = _.flatten(_.pluck(e.modules, "guidesInModule"));
                    if (i = _.filter(_.compact(o), function (e) {
                            return e.control
                        }), !n.length) {
                        var a = _.reduce(e.modules, function (e, t) {
                                return _.each(t.guidesInModule, function (n) {
                                    e[n.id] = t
                                }), e
                            }, {}),
                            s = _.filter(o, function (e) {
                                return e && e.steps && e.steps.length
                            }),
                            d = _.sortBy(s, function (e) {
                                return e.steps[0].elementPathRule ? 1 : 0
                            }),
                            u = _.find(d, function (e) {
                                return e.shouldBeAddedToResourceCenter()
                            }),
                            l = a[u && u.id];
                        l && n.push(l)
                    }
                    t(e, n, i)
                }
            }

            function resourceCenterBadgeProc(e, t, n) {
                var i = pendo.badgesShown[e.id];
                if (!t || !t.length) {
                    var r = -1 !== e.launchMethod.indexOf("badge"),
                        o = -1 !== e.launchMethod.indexOf("dom"),
                        a = -1 !== e.launchMethod.indexOf("extensionIcon");
                    e.hasResourceCenterContent = !1, r ? (e.isShown() && e.hide(), i && i.hide(), _.each(n, function (e) {
                        e.hasGuideBeenControlled() || e.steps[0].onControlGuide("control")
                    }), e.badgeHidden = !0, delete e.activeModule) : (o || a) && (e.showEmptyState = !0, e.controlGuidesInAllModules = n)
                }
                e.badgeHidden && e.hasResourceCenterContent && !e.isNativeModuleActive && (i || (_.isFunction(e.placeBadge) && e.placeBadge(), i = pendo.badgesShown[e.id]), i && i.show(), e.badgeHidden = !1)
            }

            function resourceCenterProc(e) {
                if (e) {
                    e.skipResourceCenterHomeView = !1, e.hasResourceCenterContent = !0, delete e.moduleIdToReplaceHomeViewWith;
                    var t = e.activeModule,
                        n = get(t, "attributes.resourceCenter.integrationProvider");
                    if (e.isNativeModuleActive = t && BuildingBlockResourceCenter.isSupportedNativeIntegration(n), BuildingBlockResourceCenter.isFullyCustom(e)) return e.hasResourceCenterContent = !0, !0;
                    if (e.isShown() || !store.getters["frames/isLeader"]() ? resourceCenterShowingProc(e, resourceCenterBadgeProc) : resourceCenterNotShowingProc(e, resourceCenterBadgeProc), e.isNativeModuleActive) {
                        e.isShown() && e.hide();
                        var i = pendo.badgesShown[e.id];
                        i && i.hide()
                    }
                    "dom" === e.launchMethod && BuildingBlockResourceCenter.updateNotificationBubbles()
                }
            }

            function createSingletonMessageHandler(e, t) {
                function n(e) {
                    (!r || t(e.origin)) && _.each(i, function (t) {
                        _.isFunction(t) && t(e)
                    })
                }
                var i = [],
                    r = !1;
                return {
                    secure: function (e) {
                        r = e
                    },
                    addEventListener: function (t) {
                        0 === i.length && e.addEventListener("message", n), i.push(t)
                    },
                    removeEventListener: function (t) {
                        var r = i.indexOf(t);
                        r >= 0 && i.splice(r, 1), 0 === i.length && e.removeEventListener("message", n)
                    }
                }
            }

            function tryParseJson(e) {
                if (!_.isString(e)) return e;
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return e
                }
            }

            function TopFrameRelay(e, t, n) {
                this.init(e, t, n)
            }

            function createCrossFrameChannel(e) {
                if (!pendo.sniffer.addEventListener) return {
                    addEventListener: _.noop,
                    postMessage: _.noop,
                    close: _.noop
                };
                var t = !!window.__pendoExtensions,
                    n = ConfigReader.get("preferBroadcastChannel") && !t;
                return n && _.isFunction(window.BroadcastChannel) ? (e.commit("frames/setChannelType", "BroadcastChannel"), new BroadcastChannel("pendo")) : (e.commit("frames/setChannelType", "TopFrameRelay"), new TopFrameRelay(e, window, SingletonMessageHandler))
            }

            function flux(e) {
                function t(e, t) {
                    var n = f[e];
                    if (!n) throw new Error("mutation " + e + " not found");
                    n(t), _.each(c, function (t) {
                        t(e, l)
                    })
                }

                function n(e, t) {
                    var n = g[e];
                    if (!n) throw new Error("action " + e + " not found");
                    return n(t)
                }

                function i(e) {
                    return _.isFunction(e) ? (c.push(e), r(e)) : _.noop
                }

                function r(e) {
                    return function () {
                        var t = c.indexOf(e);
                        t >= 0 && c.splice(t, 1)
                    }
                }

                function o(e) {
                    return _.isFunction(e) || _.isRegExp(e) ? e : _.isArray(e) ? _.map(e, o) : _.isObject(e) ? _.reduce(e, function (e, t, n) {
                        return e[n] = o(t), e
                    }, {}) : e
                }

                function a(e) {
                    var t = e.state || {};
                    return _.each(e.modules, function (e, n) {
                        t[n] = a(e)
                    }), t
                }

                function s(e, t) {
                    var n = {};
                    return _.each(e.mutations, function (i, r) {
                        n[t + r] = _.partial(i, e.state)
                    }), _.each(e.modules, function (e, i) {
                        _.extend(n, s(e, t + i + "/"))
                    }), n
                }

                function d(e, t, n) {
                    function i(e, i, r) {
                        var o = r && r.root ? e : n + e;
                        t.commit(o, i)
                    }

                    function r(e, i, r) {
                        var o = r && r.root ? e : n + e;
                        return t.dispatch(o, i)
                    }

                    function o(e) {
                        return _.reduce(e, function (e, t, i) {
                            return 0 !== i.indexOf(n) ? e : (e[i.replace(n, "")] = t, e)
                        }, {})
                    }
                    var a = {},
                        s = {
                            state: e.state,
                            rootState: t.state,
                            commit: i,
                            dispatch: r,
                            getters: o(t.getters),
                            rootGetters: t.getters
                        };
                    return _.each(e.actions, function (e, t) {
                        a[n + t] = _.partial(e, s)
                    }), _.each(e.modules, function (e, i) {
                        _.extend(a, d(e, t, n + i + "/"))
                    }), a
                }

                function u(e, t, n, i) {
                    var r = {},
                        o = {};
                    return _.each(e.getters, function (e, a) {
                        o[a] = r[i + a] = function () {
                            return e(n, o, t.state, t.getters)
                        }
                    }), _.each(e.modules, function (e, o) {
                        _.extend(r, u(e, t, n[o], i + o + "/"))
                    }), r
                }
                e = o(e);
                var l = a(e),
                    c = [],
                    p = {
                        state: l,
                        commit: t,
                        dispatch: n,
                        subscribe: i
                    };
                p.getters = u(e, p, p.state, "");
                var f = s(e, ""),
                    g = d(e, p, "");
                return p
            }

            function updateMasterGuideList(e) {
                var t = _.indexBy(_.filter(getActiveGuides(), function (e) {
                        return !e.isFrameProxy
                    }), "id"),
                    n = _.chain(e.frames).filter(function (t) {
                        return t.id !== e.frameId
                    }).map(function (e) {
                        return _.toArray(e.guides)
                    }).flatten(!0).unique("id").filter(function (e) {
                        return !t[e.id]
                    }).map(function (e) {
                        return _.extend(JSON.parse(JSON.stringify(e)), {
                            isFrameProxy: !0
                        })
                    }).map(GuideFactory).value(),
                    i = _.toArray(t).concat(n);
                sortGuidesByPriority(i), initializeResourceCenter(i), setActiveGuides(i), e.guidesLoaded && 0 === _.size(e.frames[e.frameId].guides) && startGuides()
            }

            function guidePassiveRenderer(e) {
                if (e = e.filter(function (e) {
                        return !e.isFrameProxy
                    }), e.length) {
                    placeBadgesProc(e), DOMActivation.update(e), isGuideShown() && guideShowingProc(), hideLauncher();
                    var t = getLauncherGuideList(e),
                        n = computeLauncherHash(t);
                    n !== lastLauncherHash && store.dispatch("frames/changeGuideList", e), lastLauncherHash = n, store.dispatch("frames/updateFrameVisibility"), prefetchBadgeActivatedGuideContent(activeGuides, pendo.badgesShown)
                }
            }

            function writeLastStepSeenCache(e) {
                store.dispatch("guideState/updateLastGuideStepSeen", e), store.dispatch("guideState/write"), store.dispatch("frames/changeLastGuideStepSeen", e)
            }

            function listenForGuideStateChange() {
                store.dispatch("guideState/init"), pendo.sniffer.addEventListener && window.addEventListener("storage", function (e) {
                    store.dispatch("guideState/storageChanged", e)
                })
            }

            function regainFocus() {
                store.commit("guideState/setReceivedStateChange", null), window.removeEventListener("focus", regainFocus), stopGuides(), startGuides()
            }

            function getLastGuideStepSeen() {
                return store.state.guideState.lastGuideStepSeen
            }

            function connectChannelToStore(e, t) {
                function n(e) {
                    try {
                        if (!e.action) return;
                        if (i) return;
                        var n = e.agentInstallType === EXTENSION_INSTALL_TYPE,
                            r = t.getters["frames/inExtensionLeadershipMode"](),
                            o = n || r,
                            a = e.apiKey === pendo.apiKey;
                        if (!a && !o) return;
                        t.dispatch(e.action, e)
                    } catch (s) {
                        writeException(s, "ERROR in cross frame channel")
                    }
                }
                var i = !1;
                return e.addEventListener("message", function (e) {
                    n(e.data), t.state.guideUpdate.useObserver && t.dispatch("guideUpdate/documentChanged")
                }), {
                    postMessage: function (t) {
                        if (!i) {
                            var r = _.extend({
                                apiKey: pendo.apiKey,
                                agentInstallType: getInstallType()
                            }, t);
                            e.postMessage(r), setTimeout(function () {
                                n(r)
                            }, 0)
                        }
                    },
                    close: function () {
                        i = !0, _.isFunction(e.close) && e.close()
                    }
                }
            }

            function createStore() {
                return flux({
                    modules: {
                        errorLog: ErrorLogModule,
                        frames: FramesModule,
                        guideUpdate: GuideUpdateModule,
                        guideState: GuideStateModule,
                        healthCheck: HealthCheckModule,
                        location: LocationModule
                    }
                })
            }

            function prefetchBadgeActivatedGuideContent(e, t) {
                if (!ConfigReader.get("disablePrefetch")) {
                    var n = _.keys(t);
                    if (n.length) {
                        var i = _.indexBy(e, "id");
                        _.each(n, function (e) {
                            var t = i[e];
                            if (t) {
                                var n = _.first(t.steps);
                                n && _.isFunction(n.fetchContent) && n.fetchContent()
                            }
                        })
                    }
                }
            }

            function setDefaultCursorStyle(e) {
                if (e) {
                    var t = e.props = e.props || {},
                        n = t.style = t.style || {};
                    n.cursor = n.cursor || "pointer"
                }
                return e
            }

            function Badge(e, t) {
                var n, i = getElementForBadge(t);
                if ("building-block" === e.attributes.type) {
                    var r = pendo.buildNodeFromJSON(replaceObjectWithContentHost(setDefaultCursorStyle(this.domJson)))[0];
                    n = r.parentNode.removeChild(r), -1 === n.className.indexOf("_pendo-badge_") && (n.className += " _pendo-badge_"), this.isP2Badge = !0
                } else {
                    n = document.createElement("img"), n.src = replaceWithContentHost(this.imageUrl), n.className = "_pendo-badge " + BADGE_CSS_NAME;
                    var o = this.width || 13,
                        a = this.height || 13,
                        s = "width:" + o + "px;height:" + a + "px;";
                    setStyle(n, s)
                }
                n.id = "_pendo-badge_" + t.id, this.activate = function () {
                    var e = _.isFunction(t.getGuide) && t.getGuide(),
                        n = e && e.attributes && e.attributes.resourceCenter;
                    if (!e.isShown() || store.getters["frames/isShownInAnotherFrame"]()(t)) showGuide(t, "badge");
                    else if (n) t.eventRouter.eventable.trigger("pendoEvent", {
                        step: t,
                        action: "dismissGuide"
                    });
                    else {
                        var i = _.find(e.steps, function (e) {
                            return e.isShown()
                        });
                        pendo.onGuideDismissed(i)
                    }
                }, this.show = function () {}, this.hide = function () {
                    n && n.parentNode && n.parentNode.removeChild(n)
                };
                var d = get(e, "attributes.resourceCenter");
                return d && (this.toggleAriaExpanded = function () {
                    var e = !!pendo.Sizzle("#pendo-resource-center-container")[0],
                        t = pendo.dom('._pendo-resource-center-badge-container [id^="pendo-image-badge-"]');
                    t && t[0] && t[0].setAttribute("aria-expanded", e)
                }, n.checkAriaExpanded = this.toggleAriaExpanded), this.step = _.constant(t), this.target = _.constant(i), this.element = _.constant(n), this
            }

            function InlinePosition() {
                return ("inline" === this.position || "inline-right" === this.position || "inline-left" === this.position) && this.before("show", function () {
                    var e = this.target(),
                        t = this.element();
                    if (this.isP2Badge && setStyle(t, "display:inline-block;vertical-align:text-bottom;"), this.css && setStyle(t, this.css), e && e.tagName) {
                        var n = e.tagName.toLowerCase();
                        if (/br|input|img|select|textarea/.test(n)) {
                            if (t.parentNode === e.parentNode) return;
                            e.parentNode.insertBefore(t, e.nextSibling)
                        } else t.parentNode !== e && ("inline" === this.position || "inline-right" === this.position ? e.appendChild(t) : "inline-left" === this.position && e.prepend(t))
                    }
                }), this
            }

            function AbsolutePosition() {
                return this.position && "top-right" !== this.position && "top-left" !== this.position || this.before("show", function () {
                    var e = this.element(),
                        t = getOffsetPosition(this.target()),
                        n = 0,
                        i = 0,
                        r = 0;
                    this.offsets && (n = this.offsets.top || 0, i = this.offsets.right || 0, r = this.offsets.left || 0);
                    var o = "position:" + (t.fixed ? "fixed" : "absolute") + ";top:" + (t.top + n) + "px;";
                    switch (this.position) {
                    case "top-right":
                        o += "left:" + (t.left + t.width - i) + "px";
                        break;
                    case "top-left":
                        o += "left:" + (t.left + r) + "px"
                    }
                    setStyle(e, o), e.parentNode || getGuideAttachPoint().appendChild(e)
                }), this
            }

            function ClickActivation() {
                var e = this,
                    t = e.element(),
                    n = !1,
                    i = function (t) {
                        e.activate(), e.toggleAriaExpanded && e.toggleAriaExpanded(), stopEvent(t)
                    };
                return e.after("show", function () {
                    n || (attachEvent(t, "click", i), n = !0)
                }), e.after("hide", function () {
                    detachEvent(t, "click", i), n = !1
                }), e
            }

            function HoverActivation() {
                var e = this,
                    t = e.element(),
                    n = e.step(),
                    i = !1;
                if ("yes" === e.useHover || e.showGuideOnBadgeHover) {
                    var r = function (e) {
                            for (; e;) {
                                if (/_pendo-guide_|_pendo-guide-tt_|_pendo-backdrop_|_pendo-badge_/.test(e.className)) return !0;
                                if (/pendo-guide-container/.test(e.id)) return !0;
                                e = e.parentNode
                            }
                            return !1
                        },
                        o = _.throttle(function (e) {
                            getTarget(e) === t || r(getTarget(e)) || s()
                        }, 50, {
                            trailing: !1
                        }),
                        a = function (e) {
                            n.isShown() || showGuide(n, "badge"), attachEvent(document, "mousemove", o), stopEvent(e)
                        },
                        s = function (e) {
                            detachEvent(document, "mousemove", o), isPreviewing() || pendo.onGuideDismissed(n)
                        };
                    e.after("show", function () {
                        i || (attachEvent(t, "mouseover", a), i = !0)
                    }), e.after("hide", function () {
                        detachEvent(t, "mouseover", a), detachEvent(document, "mousemove", o), i = !1
                    })
                }
                return e
            }

            function ShowOnHover() {
                var e = this,
                    t = e.element(),
                    n = e.target(),
                    i = !1,
                    r = e.showBadgeOnlyOnElementHover || /hover/.test(e.showOnEvent);
                if (r && !isPreviewing()) {
                    var o = "inline" === e.position ? "visibility:visible;" : "display:inline;",
                        a = "inline" === e.position ? "visibility:hidden;" : "display:none;",
                        s = function (e, i) {
                            var r = getClientRect(n),
                                o = getClientRect(t),
                                a = {
                                    left: Math.min(r.left, o.left),
                                    top: Math.min(r.top, o.top),
                                    right: Math.max(r.right, o.right),
                                    bottom: Math.max(r.bottom, o.bottom)
                                },
                                s = i + document.documentElement.scrollTop;
                            return e >= a.left && e <= a.right && s >= a.top && s <= a.bottom
                        },
                        d = _.throttle(function (e) {
                            getTarget(e) === n || getTarget(e) === t || _hasClass(t, "triggered") || s(e.clientX, e.clientY) || l()
                        }, 50, {
                            trailing: !1
                        }),
                        u = function () {
                            setStyle(t, o), attachEvent(document, "mousemove", d)
                        },
                        l = function () {
                            detachEvent(document, "mousemove", d), setStyle(t, a)
                        };
                    e.after("show", function () {
                        i || (attachEvent(n, "mouseover", u), i = !0, l())
                    }), e.after("hide", function () {
                        i && (detachEvent(n, "mouseover", u), i = !1), l()
                    })
                }
                return e
            }

            function scrollToTooltip(e, t, n) {
                var i = getOffsetPosition(e),
                    r = getOffsetPosition(t),
                    o = function (e, t) {
                        var n = Math.min(e.top, t.top),
                            i = Math.min(e.left, t.left),
                            r = Math.max(e.top + e.height, t.top + t.height),
                            o = Math.max(e.left + e.width, t.left + t.width);
                        return {
                            height: Math.abs(r - n),
                            width: Math.abs(o - i),
                            top: n,
                            left: i
                        }
                    }(i, r);
                if (_isInViewport(o) === !1 && !r.fixed) {
                    var a = getScreenDimensions(),
                        s = getOverflowDirection(getBody(), /hidden/),
                        d = calculateScrollAmount(o, a, n, s);
                    window.scrollTo(d.x, d.y)
                }
            }

            function calculateScrollAmount(e, t, n, i) {
                var r = {
                    x: e.left + e.width - t.width,
                    y: 0
                };
                return "top" === n ? r.y = e.top : r.y = e.top + e.height - t.height, r.y = Math.max(r.y, 0), r.x = Math.max(r.x, 0), _.contains([OverflowDirection.X, OverflowDirection.BOTH], i) && (r.x = 0), _.contains([OverflowDirection.Y, OverflowDirection.BOTH], i) && (r.y = 0), r
            }

            function computeBlockOutOverlayPositions(e, t, n) {
                var i = {},
                    r = t.top - e.top,
                    o = t.left - e.left;
                i.top = r - n, i.left = o - n, i.height = t.height + 2 * n, i.width = t.width + 2 * n;
                var a = {
                    left: 0,
                    top: 0
                };
                return positionFixedActsLikePositionAbsolute() && (a = bodyOffset(), i.left += documentScrollLeft(), i.top += documentScrollTop()), i.bottom = i.top + i.height, i.right = i.left + i.width, {
                    north: {
                        height: Math.max(i.top, 0),
                        left: -a.left,
                        top: -a.top,
                        right: 0
                    },
                    east: {
                        top: i.top - a.top,
                        bottom: 0,
                        right: 0,
                        left: i.right - a.left
                    },
                    south: {
                        top: i.bottom - a.top,
                        width: Math.max(i.right, 0),
                        bottom: 0,
                        left: -a.left
                    },
                    west: {
                        top: i.top - a.top,
                        height: Math.max(i.height, 0),
                        left: -a.left,
                        width: Math.max(i.left, 0)
                    }
                }
            }

            function computeBlockOutBoundingBox(e) {
                var t = _.reduce(e, function (e, t) {
                    if (!isElementVisible(t)) return e;
                    var n = getClientRect(t);
                    return e.fixed = e.fixed && n.fixed, _.each([
                        ["top", isLessThan],
                        ["right", isGreaterThan],
                        ["bottom", isGreaterThan],
                        ["left", isLessThan]
                    ], function (t) {
                        var i = t[0],
                            r = t[1];
                        (!e[i] || r(n[i], e[i])) && (e[i] = n[i])
                    }), e
                }, {
                    fixed: !0
                });
                t.height = t.bottom - t.top, t.width = t.right - t.left;
                var n = bodyOffset();
                return t.fixed || (t.left += n.left, t.right += n.left, t.top += n.top, t.bottom += n.top), t.fixed = !!t.fixed, t
            }

            function wouldBeVisibleAfterAutoScroll(e) {
                var t, n, i, r, o, a = /(auto|scroll)/,
                    s = /(auto|scroll|hidden)/,
                    d = getClientRect(e),
                    u = getScrollParent(e, s);
                if (!isElementVisibleInBody(e)) return !1;
                for (; u;) {
                    if (t = getClientRect(u), o = getOverflowDirection(u, a), o !== OverflowDirection.NONE && (n = 0, i = 0, (o === OverflowDirection.Y || o === OverflowDirection.BOTH) && (d.bottom > t.bottom && (n += d.bottom - t.bottom, d.top -= n, d.bottom -= n), d.top < t.top && (r = t.top - d.top, n -= r, d.top += r, d.bottom += r)), (o === OverflowDirection.X || o === OverflowDirection.BOTH) && (d.right > t.right && (i += d.right - t.right, d.left -= i, d.right -= i), d.left < t.left && (r = t.left - d.left, i -= r, d.left += r, d.right += r))), !isVisibleInScrollParent(d, u, s)) return !1;
                    u = getScrollParent(u, s)
                }
                return !0
            }

            function LauncherSearch() {
                function e(e) {
                    return i.text ? (e || "").replace(new RegExp(i.text, "gi"), "<strong>$&</strong>") : e
                }

                function t() {
                    dom(SEARCHBOX_CSS_SELECTOR).each(function () {
                        this.value = ""
                    })
                }
                var n = this,
                    i = {
                        text: "",
                        highlight: e,
                        clear: t
                    };
                return n.data && n.data.enableSearch && n.data.enableSearch && (n.data.search = i, pendo.disableGuideCenterContentSearch || n.before("update", prefetchGuideContentForSearch), n.before("update", function () {
                    i.text = getLauncherSearchText().join(" ");
                    var e = dom("._pendo-launcher_");
                    i.text ? e.addClass(LAUNCHER_SEARCHING_CLASS) : e.removeClass(LAUNCHER_SEARCHING_CLASS)
                })), n
            }

            function isSearchEnabled() {
                if (!pendo.guideWidget) return !1;
                var e = pendo.guideWidget.data;
                return !!e && !!e.enableSearch
            }

            function launcherHasActiveSearch() {
                return getLauncherSearchText().length > 0
            }

            function getLauncherSearchText() {
                if (!isSearchEnabled()) return [];
                var e = dom(SEARCHBOX_CSS_SELECTOR)[0];
                if (!e) return [];
                var t = e.value;
                return t.length > 0 ? (t = trim.call(t), [].concat(_.compact(t.split(" ")))) : []
            }

            function prefetchGuideContentForSearch(e) {
                return ConfigReader.get("disablePrefetch") ? void 0 : q.all(_.map(e, function (e) {
                    return e.fetchContent()
                }))
            }

            function applySearch(e) {
                var t = getLauncherSearchText();
                if (0 === t.length) return e;
                var n = _.map(t, _.partial(doSearch, e));
                return n = _.union.apply(_, n)
            }

            function doSearch(e, t) {
                function n(e) {
                    return e.searchFor(t)
                }

                function i(e) {
                    var t = ["tag", "name", "content"];
                    return _.indexOf(t, e.field)
                }
                return log("doing search on " + t, "launcher", "search", "guides"), e = e || getActiveGuides(), t && 0 !== t.length ? _.chain(e).filter(isLauncher).map(n).compact().sortBy(i).pluck("guide").value() : e
            }

            function getLauncherGuideList(e) {
                var t = _.filter(e || getActiveGuides(), isLauncher);
                return applySearch(t)
            }

            function computeLauncherHash(e) {
                return crc32(_.map(e, function (e) {
                    var t = e.isWhatsNew() ? [] : _.pluck(e.steps, "seenState");
                    return {
                        id: e.id,
                        seenState: t
                    }
                }))
            }

            function LauncherBadge(e) {
                function t(e) {
                    var t = e.position || "bottom-right",
                        n = document.createElement("img");
                    s.element = n, dom(n).addClass("_pendo-launcher-badge_").addClass("_pendo-launcher-badge-" + t + "_"), e.launcherBadgeUrl && (n.src = replaceWithContentHost(e.launcherBadgeUrl)), n.onerror = function (t) {
                        pendo.log("[Agent] Error! Unable to load guide center image " + e.launcherBadgeUrl), writeException({
                            imgSrc: e.launcherBadgeUrl
                        }, "ERROR in when attempting to render guide center badge image")
                    }, isBrowserInQuirksmode() && (attachEvent(n, "mouseover", function (e) {
                        dom(n).addClass("_pendo-launcher-badge-active_")
                    }), attachEvent(n, "mouseout", function (e) {
                        dom(n).removeClass("_pendo-launcher-badge-active_")
                    }), dom(n).css({
                        position: "absolute"
                    })), getGuideAttachPoint().appendChild(n)
                }

                function n() {
                    "badge" === d && dom(s.element).css("display: ;")
                }

                function i() {
                    dom(s.element).css("display: none;")
                }

                function r() {
                    var e = s.element;
                    if (e && /^img$/i.test(e.nodeName)) {
                        var t = dom("<div>").addClass(e.className).append(e).appendTo(getGuideAttachPoint());
                        e.className = "", s.element = t[0]
                    }
                }

                function o() {
                    dom.removeNode(s.element)
                }

                function a(e) {
                    e ? dom(s.element).addClass(launcherActiveClass) : dom(s.element).removeClass(launcherActiveClass)
                }
                var s = this,
                    d = e.launchType ? e.launchType : "badge";
                _.extend(s, {
                    show: n,
                    hide: i,
                    wrap: r,
                    dispose: o,
                    setActive: a
                }), t(e)
            }

            function LauncherElement(e) {
                function t() {
                    return dom(n())[0]
                }

                function n() {
                    return "element" === e.launchType && e.launchElement ? e.launchElement : "._pendo-launcher-badge_"
                }

                function i(e) {
                    attachEvent(document, "click", r)
                }

                function r(e) {
                    var t = getTarget(e),
                        i = n(),
                        r = dom(t).closest(i);
                    r.length && (isLauncherVisible() ? agentStorage.write("launcher-closed", "yes", 864e6) : pendo.guideWidget.position(t), toggleLauncher())
                }

                function o() {
                    detachEvent(document, "click", r), e && e.whatsnew && e.whatsnew.enabled && removeCountBadge()
                }
                var a = this;
                pendo.guideWidget.removeCountBadge = function () {
                    dom("._pendo-launcher-whatsnew-count_").remove()
                }, e && e.elementMatch && (e.launchElement = e.elementMatch.selection), _.extend(a, {
                    getLauncherTarget: t,
                    dispose: o
                }), i(e)
            }

            function Launcher() {
                var e, t = "bottom-right",
                    n = "bottom-left",
                    i = "top-left",
                    r = "top-right";
                return this.update = function (t, n) {
                    var i;
                    i = n ? t : getLauncherGuideList(t);
                    var r = computeLauncherHash(i) + crc32(getLauncherSearchText());
                    return r !== e && (e = r, this.updateLauncherContent(i)), showHideLauncher(), i.length > 0
                }, this.updateLauncherContent = updateLauncherContent, this.guideStatus = function (e) {
                    return e.isComplete() ? "complete" : e.isInProgress() ? "in-progress" : "not-started"
                }, this.render = function () {
                    var e = this.data || {};
                    launcherBadge = new LauncherBadge(e);
                    var t = e.height || LAUNCHER_DEFAULT_HEIGHT;
                    e.enableSearch && (t += isBrowserInQuirksmode() ? 50 : 39), this && !this.hidePoweredBy && (t += 40), e.addHeight && (t += e.addHeight), this.height = t;
                    var n = e.width || LAUNCHER_DEFAULT_WIDTH;
                    e.addWidth && (n += e.addWidth), this.width = n;
                    var i = dom("<div>").addClass("_pendo-launcher_");
                    launcherTooltipDiv = i[0];
                    var r = getOffsetPosition(launcherBadge.element),
                        o = getTooltipDimensions(r, t, n);
                    i.css({
                        width: n,
                        height: t
                    });
                    var a = pendo.TOOLTIP_ARROW_SIZE,
                        s = dom("<div/>").addClass("_pendo-guide-container_ " + o.arrowPosition).addClass("_pendo-guide-container-" + o.arrowPosition + "_").css({
                            top: a,
                            left: a,
                            width: n - 2 * a,
                            height: t - 2 * a
                        }).appendTo(i),
                        d = getLauncherContext(),
                        u = replaceWithContentHost(replaceInlineStyles(this.template(d))),
                        l = dom("<div/>").addClass("_pendo-guide-content_").html(u).appendTo(s);
                    if (e.addUISection && e.addUISection(i[0]), pendo._addCloseButton(i[0], function () {
                            toggleLauncher(), agentStorage.write("launcher-closed", "yes", 288e5)
                        }), l.on("click", function (e) {
                            var t = dom(getTarget(e)).closest("._pendo-launcher-item_");
                            if (t && t.length) {
                                var n = /^launcher-(.+)$/.exec(trim.call(t.attr("id"))),
                                    i = n && n[1],
                                    r = findGuideById(i);
                                r && !r.isWhatsNew() && (showGuide(r.steps[0], "launcher"), toggleLauncher(), stopEvent(e))
                            }
                        }), isBrowserInQuirksmode() && (dom("._pendo-launcher-header_", i).css({
                            padding: "10px",
                            "margin-right": "10px",
                            "margin-left": "10px"
                        }), dom("._pendo-launcher-footer_", i).css({
                            "border-top": "1px solid #bbb"
                        }), i.css({
                            position: "absolute"
                        })), i.find("[pendo-style]").each(function () {
                            var e = this.getAttribute("pendo-style");
                            dom(this).css(e)
                        }), i.appendTo(getGuideAttachPoint()), _.isFunction(this.script) && this.script(this), e.autoHeight && e.autoHeight.enabled && !isOldIE(9, 6)) {
                        var c = e.autoHeight.offset || 100;
                        i.css({
                            height: "calc(100% - " + c + "px)",
                            maxHeight: e.height,
                            minHeight: e.height / 2
                        }), dom("._pendo-guide-container_." + o.arrowPosition).css({
                            maxHeight: e.height - 30,
                            minHeight: e.height / 2 - 30,
                            height: "calc(100% - 30px)"
                        })
                    }
                }, this.position = function (e) {
                    if (e) {
                        var o = this.data,
                            a = getOffsetPosition(e),
                            s = getTooltipDimensions(a, this.height, this.width),
                            d = dom(launcherTooltipDiv),
                            u = o.launchType ? o.launchType : "badge";
                        if ("badge" === u) {
                            var l = o.position,
                                c = [t, n, i, r];
                            _.indexOf(c, o.position) < 0 && (l = t), _.each(c, function (e) {
                                d.removeClass("_pendo-launcher-" + e + "_")
                            }), d.addClass("_pendo-launcher-" + l + "_"), s.arrow = s.arrow || {}, s.arrowPosition = _.contains([t, n], l) ? "bottom" : "top", s.arrow.hbias = _.contains([n, i], l) ? "left" : "right", s.arrow.floating = !1
                        } else "element" === u && d.css({
                            top: s.top,
                            left: s.left,
                            height: s.height,
                            width: s.width,
                            position: a.fixed ? "fixed" : "absolute"
                        });
                        dom("._pendo-guide-arrow_,._pendo-guide-arrow-border_", d).remove(), buildArrowDimensions(s, a, {
                            width: 1 / 0,
                            height: 1 / 0
                        }), buildAndAppendArrow(d[0], s), d.find("._pendo-guide-container_").removeClass("top left bottom right").addClass(s.arrowPosition)
                    }
                }, this.toggle = toggleLauncher, this
            }

            function Onboarding() {
                var e = this;
                if (e.data && e.data.onboarding) {
                    var t = e.onboarding = e.onboarding || {};
                    e.before("update", function (n) {
                        var i = _.filter(n, isOB),
                            r = _.filter(i, function (t) {
                                return "complete" == e.guideStatus(t)
                            }),
                            o = t.total = i.length;
                        t.percentComplete = o > 0 ? Math.round(r.length / o * 100) : 0;
                        var a = dom("._pendo-launcher_,._pendo-launcher-badge_");
                        o ? (a.addClass("onboarding"), a.addClass("_pendo-launcher-onboarding_")) : (a.removeClass("onboarding"), a.removeClass("_pendo-launcher-onboarding_"))
                    }), e.getOnboardingState = function (e) {
                        return e.isComplete() ? "complete" : e.isInProgress() ? "in-progress" : e.isNotStarted() ? "not-started" : null
                    }
                }
                return e
            }

            function WhatsNewList() {
                function e(e, i) {
                    var r = t(e, i);
                    return 0 === r ? n(e, i) : r
                }

                function t(e, t) {
                    var n = e.showsAfter || e.publishedAt || 0,
                        i = t.showsAfter || t.publishedAt || 0;
                    return i - n
                }

                function n(e, t) {
                    var n = e.name.toLowerCase(),
                        i = t.name.toLowerCase();
                    return n > i ? 1 : i > n ? -1 : 0
                }
                var i = this,
                    r = dom("<div>").addClass("_pendo-launcher-whatsnew-count_");
                return i.data && i.data.whatsnew && i.data.whatsnew.enabled && (i.before("updateLauncherContent", function (t) {
                    var n = _.filter(t, function (e) {
                        return e.isWhatsNew()
                    });
                    n.sort(e), i.data.whatsnew.total = n.length, i.data.whatsnew.guides = n
                }), i.after("update", function (e) {
                    var t = i.data.whatsnew.guides;
                    _.each(t, function (e) {
                        e.show()
                    }), _.find(t, function (e) {
                        return e.isReady() ? void e.addToLauncher() : !0
                    });
                    var n = _.filter(t, function (e) {
                        return "active" !== e.steps[0].seenState
                    }).length;
                    n !== i.data.whatsnew.unseenCount && (r.html(n).css({
                        display: n ? "" : "none"
                    }), i.data.whatsnew.unseenCount = n, dom("span._pendo-launcher-whatsnew-count_").text(i.data.whatsnew.unseenCount))
                }), i.after("render", function () {
                    isLauncherOnElement() ? r.appendTo(this.data.launchElement) : (launcherBadge.wrap(), r.appendTo(launcherBadge.element))
                })), i
            }

            function replaceInlineStyles(e) {
                return _.isString(e) && (e = e.replace(/\s+(style)=/gi, " pendo-style=")), e
            }

            function upgradeLauncher(e, t) {
                var n = e && e.data,
                    i = _.filter(t, function (e) {
                        var t = _.first(e.steps);
                        return t && "launcher" === t.type
                    }),
                    r = _.first(_.sortBy(i, function (e) {
                        return -e.lastUpdatedAt
                    }));
                if (r && n) {
                    var o = _.first(r.steps);
                    _.extend(n, _.pick(o, "contentUrl", "contentUrlCss", "contentUrlJs"), o.attributes), _.defaults(n, {
                        whatsnew: {},
                        knowledgebase: {}
                    }), n.id = o.guideId + o.id
                }
                return e
            }

            function loadLauncherContent(e) {
                var t = e && e.data || {};
                return getPendoConfigValue("preventCodeInjection") === !0 ? q.resolve() : t.contentUrlJs || t.contentUrl ? ContentVerifier.verify(t).then(function () {
                    return ContentLoader.load(t)
                }).then(function (n) {
                    return t.template = n.content, _.extend(e, n)
                }) : q.resolve()
            }

            function fixContentHostUrl(e, t) {
                var n = getOption("contentHost");
                return n ? (e = e.replace(/^pendo-static-\d+\.storage\.googleapis\.com$/, n).replace(/^pendo-\w+-static\.storage\.googleapis\.com$/, n).replace(/^cdn\.pendo\.io$/, n), e = e.replace(/^https?:/, "").replace(/^\/\//, ""), /\./.test(e) || /^localhost/.test(e) ? e : /^\//.test(e) ? t.host + e : e) : e
            }

            function createLauncher(e, t) {
                if (!isPreventLauncher) {
                    e.contentHostUrl && (e.contentHostUrl = fixContentHostUrl(e.contentHostUrl, location)), launcherElement = new LauncherElement(e);
                    var n = Launcher.create(pendo.guideWidget);
                    return _.isFunction(n.template) || (n.template = e.template ? _.template(e.template) : defaultLauncherTemplate), n.render(), n.position(launcherElement.getLauncherTarget()), t && n.toggle(), n
                }
            }

            function updateLauncherContent(e) {
                var t = pendo.guideWidget,
                    n = t.template || defaultLauncherTemplate,
                    i = getLauncherContext(e),
                    r = dom("<div>").html(replaceInlineStyles(n(i))),
                    o = r.find("._pendo-launcher-guide-listing_"),
                    a = r.find("._pendo-launcher-footer_").html(),
                    s = r.find("._pendo-launcher-search-results_").html();
                dom("._pendo-launcher_ ._pendo-launcher-guide-listing_").each(function (e, t) {
                    dom(e).html(o.eq(t).html())
                }), dom("._pendo-launcher_ ._pendo-launcher-footer_").html(a), dom("._pendo-launcher_ ._pendo-launcher-search-results_").html(s)
            }

            function removeCountBadge() {
                dom("._pendo-launcher-whatsnew-count_").remove()
            }

            function base32Encode(e) {
                for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", n = e.length, i = 0, r = 0, o = "", a = 0; n > a; a++)
                    for (r = r << 8 | e[a], i += 8; i >= 5;) o += t[r >>> i - 5 & 31], i -= 5;
                return i > 0 && (o += t[r << 5 - i & 31]), o
            }

            function deprecateFn(e, t, n) {
                return function () {
                    return memoizedWarnDep(t, n), (e || _.noop).apply(null, arguments)
                }
            }

            function isDebuggingEnabled(e) {
                e = e || !1;
                var t = "true" === agentStorage.read("debug-enabled", !0);
                return e ? t : t ? "Yes" : "No"
            }

            function startDebuggingModuleIfEnabled() {
                isDebuggingEnabled(!0) && (addDebuggingFunctions(), detectMaster() || pendo.loadResource(getAssetHost() + "/debugger/pendo-client-debugger.js", function () {
                    log("Debug module loaded")
                }))
            }

            function addDebuggingFunctions() {
                pendo.debugging = debugging
            }

            function enableDebugging(e) {
                return isDebuggingEnabled(!0) ? e ? debugging : "debugging already enabled" : (agentStorage.write("debug-enabled", "true", null, !0), startDebuggingModuleIfEnabled(), e ? debugging : "debugging enabled")
            }

            function disableDebugging() {
                return isDebuggingEnabled(!0) ? (agentStorage.write("debug-enabled", "false", null, !0), pendo.debugging = null, delete pendo.debugging, "debugging disabled") : "debugging already disabled"
            }

            function debug(e) {
                log(e, "debug")
            }

            function patchJSONstringify() {
                var e = JSON.stringify;
                JSON.stringify = function (t, n, i) {
                    var r = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                    var o = e(t, n, i);
                    return Array.prototype.toJSON = r, o
                }
            }

            function isPrototypeOlderThan(e) {
                return "undefined" != typeof Prototype && parseFloat(Prototype.Version.substr(0, 3)) < e && "undefined" != typeof Array.prototype.toJSON
            }

            function track(e, t) {
                var n = pendo.url.get();
                collectEvent("track", t, n, e)
            }

            function disableUnusedMethodsPendoCoreOff(e) {
                _.each(e, function (e) {
                    pendo[e] && (pendo[e] = function () {
                        console.warn("This functionality is not supported by your subscription.")
                    })
                })
            }

            function autoInitialize() {
                return isReady() ? void pendo.log("already running") : (window.pendo_options && initialize(window.pendo_options), flushCallQueue(), void flushEvery(SEND_INTERVAL))
            }
            if (!windowOrMountPoint.pendo || !windowOrMountPoint.pendo.VERSION) {
                var UNDERSCORE_EXT = {};
                (function () {
                    var e = UNDERSCORE_EXT,
                        t = e._,
                        n = Array.prototype,
                        i = Object.prototype,
                        r = Function.prototype,
                        o = n.push,
                        a = n.slice,
                        s = n.concat,
                        d = i.toString,
                        u = i.hasOwnProperty,
                        l = Array.isArray,
                        c = Object.keys,
                        p = r.bind,
                        f = function (e) {
                            return e instanceof f ? e : this instanceof f ? void(this._wrapped = e) : new f(e)
                        };
                    e._ = f, f.VERSION = "1.7.0-pendo";
                    var g = function (e, t, n) {
                        if (void 0 === t) return e;
                        switch (null == n ? 3 : n) {
                        case 1:
                            return function (n) {
                                return e.call(t, n)
                            };
                        case 2:
                            return function (n, i) {
                                return e.call(t, n, i)
                            };
                        case 3:
                            return function (n, i, r) {
                                return e.call(t, n, i, r)
                            };
                        case 4:
                            return function (n, i, r, o) {
                                return e.call(t, n, i, r, o)
                            }
                        }
                        return function () {
                            return e.apply(t, arguments)
                        }
                    };
                    f.iteratee = function (e, t, n) {
                        return null == e ? f.identity : f.isFunction(e) ? g(e, t, n) : f.isObject(e) ? f.matches(e) : f.property(e)
                    }, f.each = f.forEach = function (e, t, n) {
                        if (null == e) return e;
                        t = g(t, n);
                        var i, r = e.length;
                        if (r === +r)
                            for (i = 0; r > i; i++) t(e[i], i, e);
                        else {
                            var o = f.keys(e);
                            for (i = 0, r = o.length; r > i; i++) t(e[o[i]], o[i], e)
                        }
                        return e
                    }, f.map = f.collect = function (e, t, n) {
                        if (null == e) return [];
                        t = f.iteratee(t, n);
                        for (var i, r = e.length !== +e.length && f.keys(e), o = (r || e).length, a = Array(o), s = 0; o > s; s++) i = r ? r[s] : s, a[s] = t(e[i], i, e);
                        return a
                    };
                    var h = "Reduce of empty array with no initial value";
                    f.reduce = f.foldl = f.inject = function (e, t, n, i) {
                        null == e && (e = []), t = g(t, i, 4);
                        var r, o = e.length !== +e.length && f.keys(e),
                            a = (o || e).length,
                            s = 0;
                        if (arguments.length < 3) {
                            if (!a) throw new TypeError(h);
                            n = e[o ? o[s++] : s++]
                        }
                        for (; a > s; s++) r = o ? o[s] : s, n = t(n, e[r], r, e);
                        return n
                    }, f.reduceRight = f.foldr = function (e, t, n, i) {
                        null == e && (e = []), t = g(t, i, 4);
                        var r, o = e.length !== +e.length && f.keys(e),
                            a = (o || e).length;
                        if (arguments.length < 3) {
                            if (!a) throw new TypeError(h);
                            n = e[o ? o[--a] : --a]
                        }
                        for (; a--;) r = o ? o[a] : a, n = t(n, e[r], r, e);
                        return n
                    }, f.find = f.detect = function (e, t, n) {
                        var i;
                        return t = f.iteratee(t, n), f.some(e, function (e, n, r) {
                            return t(e, n, r) ? (i = e, !0) : void 0
                        }), i
                    }, f.filter = f.select = function (e, t, n) {
                        var i = [];
                        return null == e ? i : (t = f.iteratee(t, n), f.each(e, function (e, n, r) {
                            t(e, n, r) && i.push(e)
                        }), i)
                    }, f.reject = function (e, t, n) {
                        return f.filter(e, f.negate(f.iteratee(t)), n)
                    }, f.every = f.all = function (e, t, n) {
                        if (null == e) return !0;
                        t = f.iteratee(t, n);
                        var i, r, o = e.length !== +e.length && f.keys(e),
                            a = (o || e).length;
                        for (i = 0; a > i; i++)
                            if (r = o ? o[i] : i, !t(e[r], r, e)) return !1;
                        return !0
                    }, f.some = f.any = function (e, t, n) {
                        if (null == e) return !1;
                        t = f.iteratee(t, n);
                        var i, r, o = e.length !== +e.length && f.keys(e),
                            a = (o || e).length;
                        for (i = 0; a > i; i++)
                            if (r = o ? o[i] : i, t(e[r], r, e)) return !0;
                        return !1
                    }, f.contains = f.include = function (e, t) {
                        return null == e ? !1 : (e.length !== +e.length && (e = f.values(e)), f.indexOf(e, t) >= 0)
                    }, f.invoke = function (e, t) {
                        var n = a.call(arguments, 2),
                            i = f.isFunction(t);
                        return f.map(e, function (e) {
                            return (i ? t : e[t]).apply(e, n)
                        })
                    }, f.pluck = function (e, t) {
                        return f.map(e, f.property(t))
                    }, f.where = function (e, t) {
                        return f.filter(e, f.matches(t))
                    }, f.findWhere = function (e, t) {
                        return f.find(e, f.matches(t))
                    }, f.max = function (e, t, n) {
                        var i, r, o = -(1 / 0),
                            a = -(1 / 0);
                        if (null == t && null != e) {
                            e = e.length === +e.length ? e : f.values(e);
                            for (var s = 0, d = e.length; d > s; s++) i = e[s], i > o && (o = i)
                        } else t = f.iteratee(t, n), f.each(e, function (e, n, i) {
                            r = t(e, n, i), (r > a || r === -(1 / 0) && o === -(1 / 0)) && (o = e, a = r)
                        });
                        return o
                    }, f.min = function (e, t, n) {
                        var i, r, o = 1 / 0,
                            a = 1 / 0;
                        if (null == t && null != e) {
                            e = e.length === +e.length ? e : f.values(e);
                            for (var s = 0, d = e.length; d > s; s++) i = e[s], o > i && (o = i)
                        } else t = f.iteratee(t, n), f.each(e, function (e, n, i) {
                            r = t(e, n, i), (a > r || r === 1 / 0 && o === 1 / 0) && (o = e, a = r)
                        });
                        return o
                    }, f.shuffle = function (e) {
                        for (var t, n = e && e.length === +e.length ? e : f.values(e), i = n.length, r = Array(i), o = 0; i > o; o++) t = f.random(0, o), t !== o && (r[o] = r[t]), r[t] = n[o];
                        return r
                    }, f.sample = function (e, t, n) {
                        return null == t || n ? (e.length !== +e.length && (e = f.values(e)), e[f.random(e.length - 1)]) : f.shuffle(e).slice(0, Math.max(0, t))
                    }, f.sortBy = function (e, t, n) {
                        return t = f.iteratee(t, n), f.pluck(f.map(e, function (e, n, i) {
                            return {
                                value: e,
                                index: n,
                                criteria: t(e, n, i)
                            }
                        }).sort(function (e, t) {
                            var n = e.criteria,
                                i = t.criteria;
                            if (n !== i) {
                                if (n > i || void 0 === n) return 1;
                                if (i > n || void 0 === i) return -1
                            }
                            return e.index - t.index
                        }), "value")
                    };
                    var m = function (e) {
                        return function (t, n, i) {
                            var r = {};
                            return n = f.iteratee(n, i), f.each(t, function (i, o) {
                                var a = n(i, o, t);
                                e(r, i, a)
                            }), r
                        }
                    };
                    f.groupBy = m(function (e, t, n) {
                        f.has(e, n) ? e[n].push(t) : e[n] = [t]
                    }), f.indexBy = m(function (e, t, n) {
                        e[n] = t
                    }), f.countBy = m(function (e, t, n) {
                        f.has(e, n) ? e[n]++ : e[n] = 1
                    }), f.sortedIndex = function (e, t, n, i) {
                        n = f.iteratee(n, i, 1);
                        for (var r = n(t), o = 0, a = e.length; a > o;) {
                            var s = o + a >>> 1;
                            n(e[s]) < r ? o = s + 1 : a = s
                        }
                        return o
                    }, f.toArray = function (e) {
                        return e ? f.isArray(e) ? a.call(e) : e.length === +e.length ? f.map(e, f.identity) : f.values(e) : []
                    }, f.size = function (e) {
                        return null == e ? 0 : e.length === +e.length ? e.length : f.keys(e).length
                    }, f.partition = function (e, t, n) {
                        t = f.iteratee(t, n);
                        var i = [],
                            r = [];
                        return f.each(e, function (e, n, o) {
                            (t(e, n, o) ? i : r).push(e)
                        }), [i, r]
                    }, f.first = f.head = f.take = function (e, t, n) {
                        return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : a.call(e, 0, t)
                    }, f.initial = function (e, t, n) {
                        return a.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
                    }, f.last = function (e, t, n) {
                        return null == e ? void 0 : null == t || n ? e[e.length - 1] : a.call(e, Math.max(e.length - t, 0))
                    }, f.rest = f.tail = f.drop = function (e, t, n) {
                        return a.call(e, null == t || n ? 1 : t)
                    }, f.compact = function (e) {
                        return f.filter(e, f.identity)
                    };
                    var v = function (e, t, n, i) {
                        if (t && f.every(e, f.isArray)) return s.apply(i, e);
                        for (var r = 0, a = e.length; a > r; r++) {
                            var d = e[r];
                            f.isArray(d) || f.isArguments(d) ? t ? o.apply(i, d) : v(d, t, n, i) : n || i.push(d)
                        }
                        return i
                    };
                    f.flatten = function (e, t) {
                        return v(e, t, !1, [])
                    }, f.without = function (e) {
                        return f.difference(e, a.call(arguments, 1))
                    }, f.uniq = f.unique = function (e, t, n, i) {
                        if (null == e) return [];
                        f.isBoolean(t) || (i = n, n = t, t = !1), null != n && (n = f.iteratee(n, i));
                        for (var r = [], o = [], a = 0, s = e.length; s > a; a++) {
                            var d = e[a];
                            if (t) a && o === d || r.push(d), o = d;
                            else if (n) {
                                var u = n(d, a, e);
                                f.indexOf(o, u) < 0 && (o.push(u), r.push(d))
                            } else f.indexOf(r, d) < 0 && r.push(d)
                        }
                        return r
                    }, f.union = function () {
                        return f.uniq(v(arguments, !0, !0, []))
                    }, f.intersection = function (e) {
                        if (null == e) return [];
                        for (var t = [], n = arguments.length, i = 0, r = e.length; r > i; i++) {
                            var o = e[i];
                            if (!f.contains(t, o)) {
                                for (var a = 1; n > a && f.contains(arguments[a], o); a++);
                                a === n && t.push(o)
                            }
                        }
                        return t
                    }, f.difference = function (e) {
                        var t = v(a.call(arguments, 1), !0, !0, []);
                        return f.filter(e, function (e) {
                            return !f.contains(t, e)
                        })
                    }, f.zip = function (e) {
                        if (null == e) return [];
                        for (var t = f.max(arguments, "length").length, n = Array(t), i = 0; t > i; i++) n[i] = f.pluck(arguments, i);
                        return n
                    }, f.object = function (e, t) {
                        if (null == e) return {};
                        for (var n = {}, i = 0, r = e.length; r > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
                        return n
                    }, f.indexOf = function (e, t, n) {
                        if (null == e) return -1;
                        var i = 0,
                            r = e.length;
                        if (n) {
                            if ("number" != typeof n) return i = f.sortedIndex(e, t), e[i] === t ? i : -1;
                            i = 0 > n ? Math.max(0, r + n) : n
                        }
                        for (; r > i; i++)
                            if (e[i] === t) return i;
                        return -1
                    }, f.lastIndexOf = function (e, t, n) {
                        if (null == e) return -1;
                        var i = e.length;
                        for ("number" == typeof n && (i = 0 > n ? i + n + 1 : Math.min(i, n + 1)); --i >= 0;)
                            if (e[i] === t) return i;
                        return -1
                    }, f.range = function (e, t, n) {
                        arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
                        for (var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), o = 0; i > o; o++, e += n) r[o] = e;
                        return r
                    };
                    var _ = function () {};
                    f.bind = function (e, t) {
                        var n, i;
                        if (p && e.bind === p) return p.apply(e, a.call(arguments, 1));
                        if (!f.isFunction(e)) throw new TypeError("Bind must be called on a function");
                        return n = a.call(arguments, 2), i = function () {
                            if (!(this instanceof i)) return e.apply(t, n.concat(a.call(arguments)));
                            _.prototype = e.prototype;
                            var r = new _;
                            _.prototype = null;
                            var o = e.apply(r, n.concat(a.call(arguments)));
                            return f.isObject(o) ? o : r
                        }
                    }, f.partial = function (e) {
                        var t = a.call(arguments, 1);
                        return function () {
                            for (var n = 0, i = t.slice(), r = 0, o = i.length; o > r; r++) i[r] === f && (i[r] = arguments[n++]);
                            for (; n < arguments.length;) i.push(arguments[n++]);
                            return e.apply(this, i)
                        }
                    }, f.bindAll = function (e) {
                        var t, n, i = arguments.length;
                        if (1 >= i) throw new Error("bindAll must be passed function names");
                        for (t = 1; i > t; t++) n = arguments[t], e[n] = f.bind(e[n], e);
                        return e
                    }, f.memoize = function (e, t) {
                        var n = function (i) {
                            var r = n.cache,
                                o = t ? t.apply(this, arguments) : i;
                            return f.has(r, o) || (r[o] = e.apply(this, arguments)), r[o]
                        };
                        return n.cache = {}, n
                    }, f.delay = function (e, t) {
                        var n = a.call(arguments, 2);
                        return setTimeout(function () {
                            return e.apply(null, n)
                        }, t)
                    }, f.defer = function (e) {
                        return f.delay.apply(f, [e, 1].concat(a.call(arguments, 1)))
                    }, f.throttle = function (e, t, n) {
                        var i, r, o, a = null,
                            s = 0;
                        n || (n = {});
                        var d = function () {
                            s = n.leading === !1 ? 0 : f.now(), a = null, o = e.apply(i, r), a || (i = r = null)
                        };
                        return function () {
                            var u = f.now();
                            s || n.leading !== !1 || (s = u);
                            var l = t - (u - s);
                            return i = this, r = arguments, 0 >= l || l > t ? (clearTimeout(a), a = null, s = u, o = e.apply(i, r), a || (i = r = null)) : a || n.trailing === !1 || (a = setTimeout(d, l)), o
                        }
                    }, f.debounce = function (e, t, n) {
                        var i, r, o, a, s, d = function () {
                            var u = f.now() - a;
                            t > u && u > 0 ? i = setTimeout(d, t - u) : (i = null, n || (s = e.apply(o, r), i || (o = r = null)))
                        };
                        return function () {
                            o = this, r = arguments, a = f.now();
                            var u = n && !i;
                            return i || (i = setTimeout(d, t)), u && (s = e.apply(o, r), o = r = null), s
                        }
                    }, f.wrap = function (e, t) {
                        return f.partial(t, e)
                    }, f.negate = function (e) {
                        return function () {
                            return !e.apply(this, arguments)
                        }
                    }, f.compose = function () {
                        var e = arguments,
                            t = e.length - 1;
                        return function () {
                            for (var n = t, i = e[t].apply(this, arguments); n--;) i = e[n].call(this, i);
                            return i
                        }
                    }, f.after = function (e, t) {
                        return function () {
                            return --e < 1 ? t.apply(this, arguments) : void 0
                        }
                    }, f.before = function (e, t) {
                        var n;
                        return function () {
                            return --e > 0 ? n = t.apply(this, arguments) : t = null, n
                        }
                    }, f.once = f.partial(f.before, 2), f.keys = function (e) {
                        if (!f.isObject(e)) return [];
                        if (c) return c(e);
                        var t = [];
                        for (var n in e) f.has(e, n) && t.push(n);
                        return t
                    }, f.values = function (e) {
                        for (var t = f.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++) i[r] = e[t[r]];
                        return i
                    }, f.pairs = function (e) {
                        for (var t = f.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++) i[r] = [t[r], e[t[r]]];
                        return i
                    }, f.invert = function (e) {
                        for (var t = {}, n = f.keys(e), i = 0, r = n.length; r > i; i++) t[e[n[i]]] = n[i];
                        return t
                    }, f.functions = f.methods = function (e) {
                        var t = [];
                        for (var n in e) f.isFunction(e[n]) && t.push(n);
                        return t.sort()
                    }, f.extend = function (e) {
                        if (!f.isObject(e)) return e;
                        for (var t, n, i = 1, r = arguments.length; r > i; i++) {
                            t = arguments[i];
                            for (n in t) u.call(t, n) && (e[n] = t[n])
                        }
                        return e
                    }, f.pick = function (e, t, n) {
                        var i, r = {};
                        if (null == e) return r;
                        if (f.isFunction(t)) {
                            t = g(t, n);
                            for (i in e) {
                                var o = e[i];
                                t(o, i, e) && (r[i] = o)
                            }
                        } else {
                            var d = s.apply([], a.call(arguments, 1));
                            e = new Object(e);
                            for (var u = 0, l = d.length; l > u; u++) i = d[u], i in e && (r[i] = e[i])
                        }
                        return r
                    }, f.omit = function (e, t, n) {
                        if (f.isFunction(t)) t = f.negate(t);
                        else {
                            var i = f.map(s.apply([], a.call(arguments, 1)), String);
                            t = function (e, t) {
                                return !f.contains(i, t)
                            }
                        }
                        return f.pick(e, t, n)
                    }, f.defaults = function (e) {
                        if (!f.isObject(e)) return e;
                        for (var t = 1, n = arguments.length; n > t; t++) {
                            var i = arguments[t];
                            for (var r in i) void 0 === e[r] && (e[r] = i[r])
                        }
                        return e
                    }, f.clone = function (e) {
                        return f.isObject(e) ? f.isArray(e) ? e.slice() : f.extend({}, e) : e
                    }, f.tap = function (e, t) {
                        return t(e), e
                    };
                    var b = function (e, t, n, i) {
                        if (e === t) return 0 !== e || 1 / e === 1 / t;
                        if (null == e || null == t) return e === t;
                        e instanceof f && (e = e._wrapped), t instanceof f && (t = t._wrapped);
                        var r = d.call(e);
                        if (r !== d.call(t)) return !1;
                        switch (r) {
                        case "[object RegExp]":
                        case "[object String]":
                            return "" + e == "" + t;
                        case "[object Number]":
                            return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                        case "[object Date]":
                        case "[object Boolean]":
                            return +e === +t
                        }
                        if ("object" != typeof e || "object" != typeof t) return !1;
                        for (var o = n.length; o--;)
                            if (n[o] === e) return i[o] === t;
                        var a = e.constructor,
                            s = t.constructor;
                        if (a !== s && "constructor" in e && "constructor" in t && !(f.isFunction(a) && a instanceof a && f.isFunction(s) && s instanceof s)) return !1;
                        n.push(e), i.push(t);
                        var u, l;
                        if ("[object Array]" === r) {
                            if (u = e.length, l = u === t.length)
                                for (; u-- && (l = b(e[u], t[u], n, i)););
                        } else {
                            var c, p = f.keys(e);
                            if (u = p.length, l = f.keys(t).length === u)
                                for (; u-- && (c = p[u], l = f.has(t, c) && b(e[c], t[c], n, i)););
                        }
                        return n.pop(), i.pop(), l
                    };
                    f.isEqual = function (e, t) {
                        return b(e, t, [], [])
                    }, f.isEmpty = function (e) {
                        if (null == e) return !0;
                        if (f.isArray(e) || f.isString(e) || f.isArguments(e)) return 0 === e.length;
                        for (var t in e)
                            if (f.has(e, t)) return !1;
                        return !0
                    }, f.isElement = function (e) {
                        return !(!e || 1 !== e.nodeType)
                    }, f.isArray = l || function (e) {
                        return "[object Array]" === d.call(e)
                    }, f.isObject = function (e) {
                        var t = typeof e;
                        return "function" === t || "object" === t && !!e
                    }, f.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
                        f["is" + e] = function (t) {
                            return d.call(t) === "[object " + e + "]"
                        }
                    }), f.isArguments(arguments) || (f.isArguments = function (e) {
                        return f.has(e, "callee")
                    }), "function" != typeof /./ && (f.isFunction = function (e) {
                        return "function" == typeof e || !1
                    }), f.isFinite = function (e) {
                        return isFinite(e) && !isNaN(parseFloat(e))
                    }, f.isNaN = function (e) {
                        return f.isNumber(e) && e !== +e
                    }, f.isBoolean = function (e) {
                        return e === !0 || e === !1 || "[object Boolean]" === d.call(e)
                    }, f.isNull = function (e) {
                        return null === e
                    }, f.isUndefined = function (e) {
                        return void 0 === e
                    }, f.has = function (e, t) {
                        return null != e && u.call(e, t)
                    }, f.noConflict = function () {
                        return e._ = t, this
                    }, f.identity = function (e) {
                        return e
                    }, f.constant = function (e) {
                        return function () {
                            return e
                        }
                    }, f.noop = function () {}, f.property = function (e) {
                        return function (t) {
                            return t[e]
                        }
                    }, f.matches = function (e) {
                        var t = f.pairs(e),
                            n = t.length;
                        return function (e) {
                            if (null == e) return !n;
                            e = new Object(e);
                            for (var i = 0; n > i; i++) {
                                var r = t[i],
                                    o = r[0];
                                if (r[1] !== e[o] || !(o in e)) return !1
                            }
                            return !0
                        }
                    }, f.times = function (e, t, n) {
                        var i = Array(Math.max(0, e));
                        t = g(t, n, 1);
                        for (var r = 0; e > r; r++) i[r] = t(r);
                        return i
                    }, f.random = function (e, t) {
                        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
                    }, f.now = Date.now || function () {
                        return (new Date).getTime()
                    };
                    var y = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#x27;",
                            "`": "&#x60;"
                        },
                        w = f.invert(y),
                        S = function (e) {
                            var t = function (t) {
                                    return e[t]
                                },
                                n = "(?:" + f.keys(e).join("|") + ")",
                                i = RegExp(n),
                                r = RegExp(n, "g");
                            return function (e) {
                                return e = null == e ? "" : "" + e, i.test(e) ? e.replace(r, t) : e
                            }
                        };
                    f.escape = S(y), f.unescape = S(w), f.result = function (e, t) {
                        if (null == e) return void 0;
                        var n = e[t];
                        return f.isFunction(n) ? e[t]() : n
                    };
                    var E = 0;
                    f.uniqueId = function (e) {
                        var t = ++E + "";
                        return e ? e + t : t
                    }, f.templateSettings = {
                        evaluate: /<%([\s\S]+?)%>/g,
                        interpolate: /<%=([\s\S]+?)%>/g,
                        escape: /<%-([\s\S]+?)%>/g
                    };
                    var C = /(.)^/,
                        I = {
                            "'": "'",
                            "\\": "\\",
                            "\r": "r",
                            "\n": "n",
                            "
": "u2028",
                            "
": "u2029"
                        },
                        T = /\\|'|\r|\n|\u2028|\u2029/g,
                        A = function (e) {
                            return "\\" + I[e]
                        };
                    f.template = function (e, t, n) {
                        !t && n && (t = n), t = f.defaults({}, t, f.templateSettings);
                        var i = RegExp([(t.escape || C).source, (t.interpolate || C).source, (t.evaluate || C).source].join("|") + "|$", "g"),
                            r = 0,
                            o = "__p+='";
                        e.replace(i, function (t, n, i, a, s) {
                            return o += e.slice(r, s).replace(T, A), r = s + t.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : a && (o += "';\n" + a + "\n__p+='"), t
                        }), o += "';\n", t.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
                        try {
                            var a = new Function(t.variable || "obj", "_", o)
                        } catch (s) {
                            throw s.source = o, s
                        }
                        var d = function (e) {
                                return a.call(this, e, f)
                            },
                            u = t.variable || "obj";
                        return d.source = "function(" + u + "){\n" + o + "}", d
                    }, f.chain = function (e) {
                        var t = f(e);
                        return t._chain = !0, t
                    };
                    var x = function (e) {
                        return this._chain ? f(e).chain() : e
                    };
                    f.mixin = function (e) {
                        f.each(f.functions(e), function (t) {
                            var n = f[t] = e[t];
                            f.prototype[t] = function () {
                                var e = [this._wrapped];
                                return o.apply(e, arguments), x.call(this, n.apply(f, e))
                            }
                        })
                    }, f.mixin(f), f.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
                        var t = n[e];
                        f.prototype[e] = function () {
                            var n = this._wrapped;
                            return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], x.call(this, n)
                        }
                    }), f.each(["concat", "join", "slice"], function (e) {
                        var t = n[e];
                        f.prototype[e] = function () {
                            return x.call(this, t.apply(this._wrapped, arguments))
                        }
                    }), f.prototype.value = function () {
                        return this._wrapped
                    }
                }).call({});
                var SIZZLE_EXT = {};
                ! function (e) {
                    function t(e, t, n, i) {
                        var r, o, a, s, d, u, l, p = t && t.ownerDocument,
                            g = t ? t.nodeType : 9;
                        if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g) return n;
                        if (!i && (k(t), t = t || R, N)) {
                            if (11 !== g && (d = be.exec(e)))
                                if (r = d[1]) {
                                    if (9 === g) {
                                        if (!(a = t.getElementById(r))) return n;
                                        if (a.id === r) return n.push(a), n
                                    } else if (p && (a = p.getElementById(r)) && F(t, a) && a.id === r) return n.push(a), n
                                } else {
                                    if (d[2]) return $.apply(n, t.getElementsByTagName(e)), n;
                                    if ((r = d[3]) && S.getElementsByClassName && t.getElementsByClassName) return $.apply(n, t.getElementsByClassName(r)), n
                                } if (S.qsa && !q[e + " "] && (!P || !P.test(e)) && (1 !== g || "object" !== t.nodeName.toLowerCase())) {
                                if (l = e, p = t, 1 === g && (ce.test(e) || le.test(e))) {
                                    for (p = ye.test(e) && c(t.parentNode) || t, p === t && S.scope || ((s = t.getAttribute("id")) ? s = s.replace(Ee, Ce) : t.setAttribute("id", s = U)), u = T(e), o = u.length; o--;) u[o] = (s ? "#" + s : ":scope") + " " + f(u[o]);
                                    l = u.join(",")
                                }
                                try {
                                    return $.apply(n, p.querySelectorAll(l)), n
                                } catch (h) {
                                    q(e, !0)
                                } finally {
                                    s === U && t.removeAttribute("id")
                                }
                            }
                        }
                        return x(e.replace(de, "$1"), t, n, i)
                    }

                    function n() {
                        function e(n, i) {
                            return t.push(n + " ") > E.cacheLength && delete e[t.shift()], e[n + " "] = i
                        }
                        var t = [];
                        return e
                    }

                    function i(e) {
                        return e[U] = !0, e
                    }

                    function r(e) {
                        var t = R.createElement("fieldset");
                        try {
                            return !!e(t)
                        } catch (n) {
                            return !1
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), t = null
                        }
                    }

                    function o(e, t) {
                        for (var n = e.split("|"), i = n.length; i--;) E.attrHandle[n[i]] = t
                    }

                    function a(e, t) {
                        var n = t && e,
                            i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                        if (i) return i;
                        if (n)
                            for (; n = n.nextSibling;)
                                if (n === t) return -1;
                        return e ? 1 : -1
                    }

                    function s(e) {
                        return function (t) {
                            var n = t.nodeName.toLowerCase();
                            return "input" === n && t.type === e
                        }
                    }

                    function d(e) {
                        return function (t) {
                            var n = t.nodeName.toLowerCase();
                            return ("input" === n || "button" === n) && t.type === e
                        }
                    }

                    function u(e) {
                        return function (t) {
                            return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Te(t) === e : t.disabled === e : "label" in t ? t.disabled === e : !1
                        }
                    }

                    function l(e) {
                        return i(function (t) {
                            return t = +t, i(function (n, i) {
                                for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                            })
                        })
                    }

                    function c(e) {
                        return e && "undefined" != typeof e.getElementsByTagName && e
                    }

                    function p() {}

                    function f(e) {
                        for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                        return i
                    }

                    function g(e, t, n) {
                        var i = t.dir,
                            r = t.next,
                            o = r || i,
                            a = n && "parentNode" === o,
                            s = V++;
                        return t.first ? function (t, n, r) {
                            for (; t = t[i];)
                                if (1 === t.nodeType || a) return e(t, n, r);
                            return !1
                        } : function (t, n, d) {
                            var u, l, c, p = [z, s];
                            if (d) {
                                for (; t = t[i];)
                                    if ((1 === t.nodeType || a) && e(t, n, d)) return !0
                            } else
                                for (; t = t[i];)
                                    if (1 === t.nodeType || a)
                                        if (c = t[U] || (t[U] = {}), l = c[t.uniqueID] || (c[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase()) t = t[i] || t;
                                        else {
                                            if ((u = l[o]) && u[0] === z && u[1] === s) return p[2] = u[2];
                                            if (l[o] = p, p[2] = e(t, n, d)) return !0
                                        } return !1
                        }
                    }

                    function h(e) {
                        return e.length > 1 ? function (t, n, i) {
                            for (var r = e.length; r--;)
                                if (!e[r](t, n, i)) return !1;
                            return !0
                        } : e[0]
                    }

                    function m(e, n, i) {
                        for (var r = 0, o = n.length; o > r; r++) t(e, n[r], i);
                        return i
                    }

                    function v(e, t, n, i, r) {
                        for (var o, a = [], s = 0, d = e.length, u = null != t; d > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), u && t.push(s));
                        return a
                    }

                    function _(e, t, n, r, o, a) {
                        return r && !r[U] && (r = _(r)), o && !o[U] && (o = _(o, a)), i(function (i, a, s, d) {
                            var u, l, c, p = [],
                                f = [],
                                g = a.length,
                                h = i || m(t || "*", s.nodeType ? [s] : s, []),
                                _ = !e || !i && t ? h : v(h, p, e, s, d),
                                b = n ? o || (i ? e : g || r) ? [] : a : _;
                            if (n && n(_, b, s, d), r)
                                for (u = v(b, f), r(u, [], s, d), l = u.length; l--;)(c = u[l]) && (b[f[l]] = !(_[f[l]] = c));
                            if (i) {
                                if (o || e) {
                                    if (o) {
                                        for (u = [], l = b.length; l--;)(c = b[l]) && u.push(_[l] = c);
                                        o(null, b = [], u, d)
                                    }
                                    for (l = b.length; l--;)(c = b[l]) && (u = o ? te(i, c) : p[l]) > -1 && (i[u] = !(a[u] = c))
                                }
                            } else b = v(b === a ? b.splice(g, b.length) : b), o ? o(null, a, b, d) : $.apply(a, b)
                        })
                    }

                    function b(e) {
                        for (var t, n, i, r = e.length, o = E.relative[e[0].type], a = o || E.relative[" "], s = o ? 1 : 0, d = g(function (e) {
                                return e === t
                            }, a, !0), u = g(function (e) {
                                return te(t, e) > -1
                            }, a, !0), l = [function (e, n, i) {
                                var r = !o && (i || n !== G) || ((t = n).nodeType ? d(e, n, i) : u(e, n, i));
                                return t = null, r
                            }]; r > s; s++)
                            if (n = E.relative[e[s].type]) l = [g(h(l), n)];
                            else {
                                if (n = E.filter[e[s].type].apply(null, e[s].matches), n[U]) {
                                    for (i = ++s; r > i && !E.relative[e[i].type]; i++);
                                    return _(s > 1 && h(l), s > 1 && f(e.slice(0, s - 1).concat({
                                        value: " " === e[s - 2].type ? "*" : ""
                                    })).replace(de, "$1"), n, i > s && b(e.slice(s, i)), r > i && b(e = e.slice(i)), r > i && f(e))
                                }
                                l.push(n)
                            } return h(l)
                    }

                    function y(e, n) {
                        var r = n.length > 0,
                            o = e.length > 0,
                            a = function (i, a, s, d, u) {
                                var l, c, p, f = 0,
                                    g = "0",
                                    h = i && [],
                                    m = [],
                                    _ = G,
                                    b = i || o && E.find.TAG("*", u),
                                    y = z += null == _ ? 1 : Math.random() || .1,
                                    w = b.length;
                                for (u && (G = a == R || a || u); g !== w && null != (l = b[g]); g++) {
                                    if (o && l) {
                                        for (c = 0, a || l.ownerDocument == R || (k(l), s = !N); p = e[c++];)
                                            if (p(l, a || R, s)) {
                                                d.push(l);
                                                break
                                            } u && (z = y)
                                    }
                                    r && ((l = !p && l) && f--, i && h.push(l))
                                }
                                if (f += g, r && g !== f) {
                                    for (c = 0; p = n[c++];) p(h, m, a, s);
                                    if (i) {
                                        if (f > 0)
                                            for (; g--;) h[g] || m[g] || (m[g] = Z.call(d));
                                        m = v(m)
                                    }
                                    $.apply(d, m), u && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(d)
                                }
                                return u && (z = y, G = _), h
                            };
                        return r ? i(a) : a
                    }
                    var w, S, E, C, I, T, A, x, G, L, O, k, R, B, N, P, M, D, F, U = "sizzle" + 1 * new Date,
                        H = e.document,
                        z = 0,
                        V = 0,
                        W = n(),
                        j = n(),
                        J = n(),
                        q = n(),
                        K = function (e, t) {
                            return e === t && (O = !0), 0
                        },
                        X = {}.hasOwnProperty,
                        Y = [],
                        Z = Y.pop,
                        Q = Y.push,
                        $ = Y.push,
                        ee = Y.slice,
                        te = function (e, t) {
                            for (var n = 0, i = e.length; i > n; n++)
                                if (e[n] === t) return n;
                            return -1
                        },
                        ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        ie = "[\\x20\\t\\r\\n\\f]",
                        re = "(?:\\\\[\\da-fA-F]{1,6}" + ie + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+",
                        oe = "\\[" + ie + "*(" + re + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ie + "*\\]",
                        ae = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                        se = new RegExp(ie + "+", "g"),
                        de = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"),
                        ue = new RegExp("^" + ie + "*," + ie + "*"),
                        le = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
                        ce = new RegExp(ie + "|>"),
                        pe = new RegExp(ae),
                        fe = new RegExp("^" + re + "$"),
                        ge = {
                            ID: new RegExp("^#(" + re + ")"),
                            CLASS: new RegExp("^\\.(" + re + ")"),
                            TAG: new RegExp("^(" + re + "|[*])"),
                            ATTR: new RegExp("^" + oe),
                            PSEUDO: new RegExp("^" + ae),
                            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
                            bool: new RegExp("^(?:" + ne + ")$", "i"),
                            needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
                        },
                        he = /HTML$/i,
                        me = /^(?:input|select|textarea|button)$/i,
                        ve = /^h\d$/i,
                        _e = {
                            test: function (t) {
                                return /native code/.test(e.ShadowRoot) || "function" != typeof t ? /^[^{]+\{\s*\[native \w/.test(t) : !0
                            }
                        },
                        be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        ye = /[+~]/,
                        we = new RegExp("\\\\[\\da-fA-F]{1,6}" + ie + "?|\\\\([^\\r\\n\\f])", "g"),
                        Se = function (e, t) {
                            var n = "0x" + e.slice(1) - 65536;
                            return t ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                        },
                        Ee = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                        Ce = function (e, t) {
                            return t ? "\x00" === e ? "Ã¯Â¿Â½" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                        },
                        Ie = function () {
                            k()
                        },
                        Te = g(function (e) {
                            return e.disabled === !0 && "fieldset" === e.nodeName.toLowerCase()
                        }, {
                            dir: "parentNode",
                            next: "legend"
                        });
                    try {
                        $.apply(Y = ee.call(H.childNodes), H.childNodes), Y[H.childNodes.length].nodeType
                    } catch (Ae) {
                        $ = {
                            apply: Y.length ? function (e, t) {
                                Q.apply(e, ee.call(t))
                            } : function (e, t) {
                                for (var n = e.length, i = 0; e[n++] = t[i++];);
                                e.length = n - 1
                            }
                        }
                    }
                    S = t.support = {}, I = t.isXML = function (e) {
                        var t = e.namespaceURI,
                            n = (e.ownerDocument || e).documentElement;
                        return !he.test(t || n && n.nodeName || "HTML")
                    }, k = t.setDocument = function (e) {
                        var t, n, i = e ? e.ownerDocument || e : H;
                        return i != R && 9 === i.nodeType && i.documentElement ? (R = i, B = R.documentElement, N = !I(R), H != R && (n = R.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ie, !1) : n.attachEvent && n.attachEvent("onunload", Ie)), S.scope = r(function (e) {
                            return B.appendChild(e).appendChild(R.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                        }), S.attributes = r(function (e) {
                            return e.className = "i", !e.getAttribute("className")
                        }), S.getElementsByTagName = r(function (e) {
                            return e.appendChild(R.createComment("")), !e.getElementsByTagName("*").length
                        }), S.getElementsByClassName = _e.test(R.getElementsByClassName), S.getById = r(function (e) {
                            return B.appendChild(e).id = U, !R.getElementsByName || !R.getElementsByName(U).length
                        }), S.getById ? (E.filter.ID = function (e) {
                            var t = e.replace(we, Se);
                            return function (e) {
                                return e.getAttribute("id") === t
                            }
                        }, E.find.ID = function (e, t) {
                            if ("undefined" != typeof t.getElementById && N) {
                                var n = t.getElementById(e);
                                return n ? [n] : []
                            }
                        }) : (E.filter.ID = function (e) {
                            var t = e.replace(we, Se);
                            return function (e) {
                                var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }, E.find.ID = function (e, t) {
                            if ("undefined" != typeof t.getElementById && N) {
                                var n, i, r, o = t.getElementById(e);
                                if (o) {
                                    if (n = o.getAttributeNode("id"), n && n.value === e) return [o];
                                    for (r = t.getElementsByName(e), i = 0; o = r[i++];)
                                        if (n = o.getAttributeNode("id"), n && n.value === e) return [o]
                                }
                                return []
                            }
                        }), E.find.TAG = S.getElementsByTagName ? function (e, t) {
                            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : S.qsa ? t.querySelectorAll(e) : void 0
                        } : function (e, t) {
                            var n, i = [],
                                r = 0,
                                o = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                                return i
                            }
                            return o
                        }, E.find.CLASS = S.getElementsByClassName && function (e, t) {
                            return "undefined" != typeof t.getElementsByClassName && N ? t.getElementsByClassName(e) : void 0
                        }, M = [], P = [], (S.qsa = _e.test(R.querySelectorAll)) && (r(function (e) {
                            var t;
                            B.appendChild(e).innerHTML = "<a id='" + U + "'></a><select id='" + U + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + ie + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || P.push("\\[" + ie + "*(?:value|" + ne + ")"), e.querySelectorAll("[id~=" + U + "-]").length || P.push("~="), t = R.createElement("input"), t.setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || P.push("\\[" + ie + "*name" + ie + "*=" + ie + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || P.push(":checked"), e.querySelectorAll("a#" + U + "+*").length || P.push(".#.+[+~]"), e.querySelectorAll("\\\f"), P.push("[\\r\\n\\f]")
                        }), r(function (e) {
                            e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var t = R.createElement("input");
                            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && P.push("name" + ie + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && P.push(":enabled", ":disabled"), B.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
                        })), (S.matchesSelector = _e.test(D = B.matches || B.webkitMatchesSelector || B.mozMatchesSelector || B.oMatchesSelector || B.msMatchesSelector)) && r(function (e) {
                            S.disconnectedMatch = D.call(e, "*"), D.call(e, "[s!='']:x"), M.push("!=", ae)
                        }), P = P.length && new RegExp(P.join("|")), M = M.length && new RegExp(M.join("|")), t = _e.test(B.compareDocumentPosition), F = t || _e.test(B.contains) ? function (e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e,
                                i = t && t.parentNode;
                            return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                        } : function (e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1
                        }, K = t ? function (e, t) {
                            if (e === t) return O = !0, 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n ? n : (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !S.sortDetached && t.compareDocumentPosition(e) === n ? e == R || e.ownerDocument == H && F(H, e) ? -1 : t == R || t.ownerDocument == H && F(H, t) ? 1 : L ? te(L, e) - te(L, t) : 0 : 4 & n ? -1 : 1)
                        } : function (e, t) {
                            if (e === t) return O = !0, 0;
                            var n, i = 0,
                                r = e.parentNode,
                                o = t.parentNode,
                                s = [e],
                                d = [t];
                            if (!r || !o) return e == R ? -1 : t == R ? 1 : r ? -1 : o ? 1 : L ? te(L, e) - te(L, t) : 0;
                            if (r === o) return a(e, t);
                            for (n = e; n = n.parentNode;) s.unshift(n);
                            for (n = t; n = n.parentNode;) d.unshift(n);
                            for (; s[i] === d[i];) i++;
                            return i ? a(s[i], d[i]) : s[i] == H ? -1 : d[i] == H ? 1 : 0
                        }, R) : R
                    }, t.matches = function (e, n) {
                        return t(e, null, null, n)
                    }, t.matchesSelector = function (e, n) {
                        if (k(e), S.matchesSelector && N && !q[n + " "] && (!M || !M.test(n)) && (!P || !P.test(n))) try {
                            var i = D.call(e, n);
                            if (i || S.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                        } catch (r) {
                            q(n, !0)
                        }
                        return t(n, R, null, [e]).length > 0
                    }, t.contains = function (e, t) {
                        return (e.ownerDocument || e) != R && k(e), F(e, t)
                    }, t.attr = function (e, t) {
                        (e.ownerDocument || e) != R && k(e);
                        var n = E.attrHandle[t.toLowerCase()],
                            i = n && X.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !N) : undefined;
                        return i !== undefined ? i : S.attributes || !N ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                    }, t.escape = function (e) {
                        return (e + "").replace(Ee, Ce)
                    }, t.error = function (e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    }, t.uniqueSort = function (e) {
                        var t, n = [],
                            i = 0,
                            r = 0;
                        if (O = !S.detectDuplicates, L = !S.sortStable && e.slice(0), e.sort(K), O) {
                            for (; t = e[r++];) t === e[r] && (i = n.push(r));
                            for (; i--;) e.splice(n[i], 1)
                        }
                        return L = null, e
                    }, C = t.getText = function (e) {
                        var t, n = "",
                            i = 0,
                            r = e.nodeType;
                        if (r) {
                            if (1 === r || 9 === r || 11 === r) {
                                if ("string" == typeof e.textContent) return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                            } else if (3 === r || 4 === r) return e.nodeValue
                        } else
                            for (; t = e[i++];) n += C(t);
                        return n
                    }, E = t.selectors = {
                        cacheLength: 50,
                        createPseudo: i,
                        match: ge,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function (e) {
                                return e[1] = e[1].replace(we, Se), e[3] = (e[3] || e[4] || e[5] || "").replace(we, Se), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                            },
                            CHILD: function (e) {
                                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                            },
                            PSEUDO: function (e) {
                                var t, n = !e[6] && e[2];
                                return ge.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function (e) {
                                var t = e.replace(we, Se).toLowerCase();
                                return "*" === e ? function () {
                                    return !0
                                } : function (e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                }
                            },
                            CLASS: function (e) {
                                var t = W[e + " "];
                                return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && W(e, function (e) {
                                    return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                                })
                            },
                            ATTR: function (e, n, i) {
                                return function (r) {
                                    var o = t.attr(r, e);
                                    return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                                }
                            },
                            CHILD: function (e, t, n, i, r) {
                                var o = "nth" !== e.slice(0, 3),
                                    a = "last" !== e.slice(-4),
                                    s = "of-type" === t;
                                return 1 === i && 0 === r ? function (e) {
                                    return !!e.parentNode
                                } : function (t, n, d) {
                                    var u, l, c, p, f, g, h = o !== a ? "nextSibling" : "previousSibling",
                                        m = t.parentNode,
                                        v = s && t.nodeName.toLowerCase(),
                                        _ = !d && !s,
                                        b = !1;
                                    if (m) {
                                        if (o) {
                                            for (; h;) {
                                                for (p = t; p = p[h];)
                                                    if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                                g = h = "only" === e && !g && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (g = [a ? m.firstChild : m.lastChild], a && _) {
                                            for (p = m, c = p[U] || (p[U] = {}), l = c[p.uniqueID] || (c[p.uniqueID] = {}), u = l[e] || [], f = u[0] === z && u[1], b = f && u[2], p = f && m.childNodes[f]; p = ++f && p && p[h] || (b = f = 0) || g.pop();)
                                                if (1 === p.nodeType && ++b && p === t) {
                                                    l[e] = [z, f, b];
                                                    break
                                                }
                                        } else if (_ && (p = t, c = p[U] || (p[U] = {}), l = c[p.uniqueID] || (c[p.uniqueID] = {}), u = l[e] || [], f = u[0] === z && u[1], b = f), b === !1)
                                            for (;
                                                (p = ++f && p && p[h] || (b = f = 0) || g.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (_ && (c = p[U] || (p[U] = {}), l = c[p.uniqueID] || (c[p.uniqueID] = {}), l[e] = [z, b]), p !== t)););
                                        return b -= r, b === i || b % i === 0 && b / i >= 0
                                    }
                                }
                            },
                            PSEUDO: function (e, n) {
                                var r, o = E.pseudos[e] || E.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                                return o[U] ? o(n) : o.length > 1 ? (r = [e, e, "", n], E.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                                    for (var i, r = o(e, n), a = r.length; a--;) i = te(e, r[a]), e[i] = !(t[i] = r[a])
                                }) : function (e) {
                                    return o(e, 0, r)
                                }) : o
                            }
                        },
                        pseudos: {
                            not: i(function (e) {
                                var t = [],
                                    n = [],
                                    r = A(e.replace(de, "$1"));
                                return r[U] ? i(function (e, t, n, i) {
                                    for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                                }) : function (e, i, o) {
                                    return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                                }
                            }),
                            has: i(function (e) {
                                return function (n) {
                                    return t(e, n).length > 0
                                }
                            }),
                            contains: i(function (e) {
                                return e = e.replace(we, Se),
                                    function (t) {
                                        return (t.textContent || C(t)).indexOf(e) > -1
                                    }
                            }),
                            lang: i(function (e) {
                                return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, Se).toLowerCase(),
                                    function (t) {
                                        var n;
                                        do
                                            if (n = N ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1
                                    }
                            }),
                            target: function (t) {
                                var n = e.location && e.location.hash;
                                return n && n.slice(1) === t.id
                            },
                            root: function (e) {
                                return e === B
                            },
                            focus: function (e) {
                                return e === R.activeElement && (!R.hasFocus || R.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                            },
                            enabled: u(!1),
                            disabled: u(!0),
                            checked: function (e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && !!e.checked || "option" === t && !!e.selected
                            },
                            selected: function (e) {
                                return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                            },
                            empty: function (e) {
                                for (e = e.firstChild; e; e = e.nextSibling)
                                    if (e.nodeType < 6) return !1;
                                return !0
                            },
                            parent: function (e) {
                                return !E.pseudos.empty(e)
                            },
                            header: function (e) {
                                return ve.test(e.nodeName)
                            },
                            input: function (e) {
                                return me.test(e.nodeName)
                            },
                            button: function (e) {
                                var t = e.nodeName.toLowerCase();
                                return "input" === t && "button" === e.type || "button" === t
                            },
                            text: function (e) {
                                var t;
                                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                            },
                            first: l(function () {
                                return [0]
                            }),
                            last: l(function (e, t) {
                                return [t - 1]
                            }),
                            eq: l(function (e, t, n) {
                                return [0 > n ? n + t : n]
                            }),
                            even: l(function (e, t) {
                                for (var n = 0; t > n; n += 2) e.push(n);
                                return e
                            }),
                            odd: l(function (e, t) {
                                for (var n = 1; t > n; n += 2) e.push(n);
                                return e
                            }),
                            lt: l(function (e, t, n) {
                                for (var i = 0 > n ? n + t : n > t ? t : n; --i >= 0;) e.push(i);
                                return e
                            }),
                            gt: l(function (e, t, n) {
                                for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                                return e
                            })
                        }
                    }, E.pseudos.nth = E.pseudos.eq;
                    for (w in {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) E.pseudos[w] = s(w);
                    for (w in {
                            submit: !0,
                            reset: !0
                        }) E.pseudos[w] = d(w);
                    p.prototype = E.filters = E.pseudos, E.setFilters = new p, T = t.tokenize = function (e, n) {
                        var i, r, o, a, s, d, u, l = j[e + " "];
                        if (l) return n ? 0 : l.slice(0);
                        for (s = e, d = [], u = E.preFilter; s;) {
                            (!i || (r = ue.exec(s))) && (r && (s = s.slice(r[0].length) || s), d.push(o = [])), i = !1, (r = le.exec(s)) && (i = r.shift(), o.push({
                                value: i,
                                type: r[0].replace(de, " ")
                            }), s = s.slice(i.length));
                            for (a in E.filter) !(r = ge[a].exec(s)) || u[a] && !(r = u[a](r)) || (i = r.shift(), o.push({
                                value: i,
                                type: a,
                                matches: r
                            }), s = s.slice(i.length));
                            if (!i) break
                        }
                        return n ? s.length : s ? t.error(e) : j(e, d).slice(0)
                    }, A = t.compile = function (e, t) {
                        var n, i = [],
                            r = [],
                            o = J[e + " "];
                        if (!o) {
                            for (t || (t = T(e)), n = t.length; n--;) o = b(t[n]), o[U] ? i.push(o) : r.push(o);
                            o = J(e, y(r, i)), o.selector = e
                        }
                        return o
                    }, x = t.select = function (e, t, n, i) {
                        var r, o, a, s, d, u = "function" == typeof e && e,
                            l = !i && T(e = u.selector || e);
                        if (n = n || [], 1 === l.length) {
                            if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && N && E.relative[o[1].type]) {
                                if (t = (E.find.ID(a.matches[0].replace(we, Se), t) || [])[0], !t) return n;
                                u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                            }
                            for (r = ge.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !E.relative[s = a.type]);)
                                if ((d = E.find[s]) && (i = d(a.matches[0].replace(we, Se), ye.test(o[0].type) && c(t.parentNode) || t))) {
                                    if (o.splice(r, 1), e = i.length && f(o), !e) return $.apply(n, i), n;
                                    break
                                }
                        }
                        return (u || A(e, l))(i, t, !N, n, !t || ye.test(e) && c(t.parentNode) || t), n
                    }, S.sortStable = U.split("").sort(K).join("") === U, S.detectDuplicates = !!O, k(), S.sortDetached = r(function (e) {
                        return 1 & e.compareDocumentPosition(R.createElement("fieldset"))
                    }), r(function (e) {
                        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
                    }) || o("type|href|height|width", function (e, t, n) {
                        return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                    }), S.attributes && r(function (e) {
                        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                    }) || o("value", function (e, t, n) {
                        return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                    }), r(function (e) {
                        return null == e.getAttribute("disabled")
                    }) || o(ne, function (e, t, n) {
                        var i;
                        return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                    }), SIZZLE_EXT.Sizzle = t
                }(window);
                var _slice = Array.prototype.slice;
                try {
                    _slice.call(document.documentElement)
                } catch (e) {
                    Array.prototype.slice = function (e, t) {
                        if (t = "undefined" != typeof t ? t : this.length, "[object Array]" === Object.prototype.toString.call(this)) return _slice.call(this, e, t);
                        var n, i, r = [],
                            o = this.length,
                            a = e || 0;
                        a = a >= 0 ? a : o + a;
                        var s = t ? t : o;
                        if (0 > t && (s = o + t), i = s - a, i > 0)
                            if (r = new Array(i), this.charAt)
                                for (n = 0; i > n; n++) r[n] = this.charAt(a + n);
                            else
                                for (n = 0; i > n; n++) r[n] = this[a + n];
                        return r
                    }
                }
                String.prototype.trim || (String.prototype.trim = function () {
                    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                });
                var shadowAPI = function () {
                        function e(e) {
                            return e ? e.indexOf(shadowAPI.PSEUDO_ELEMENT) > -1 : !1
                        }

                        function t(e) {
                            var t = e.split(shadowAPI.PSEUDO_ELEMENT),
                                n = t.splice(0, 1)[0],
                                i = t.join(shadowAPI.PSEUDO_ELEMENT);
                            return {
                                baseCss: n,
                                shadowCss: i
                            }
                        }

                        function n(e) {
                            return e && _.isFunction(e.composedPath)
                        }
                        return {
                            PSEUDO_ELEMENT: "::shadow",
                            getComposedPath: function (e) {
                                return n(e) ? e.composedPath() : null
                            },
                            getShadowRoot: function (e) {
                                return e.shadowRoot
                            },
                            isElementShadowRoot: function (e) {
                                return "undefined" != typeof ShadowRoot && e instanceof ShadowRoot && e.host
                            },
                            isShadowSelector: e,
                            getParent: function (e) {
                                return shadowAPI.isElementShadowRoot(e) ? e.host : e.parentNode
                            },
                            wrapSizzle: function (n) {
                                var i = _.extend(function r(i, o, a, s) {
                                    if (e(i) && !_.isFunction(document.documentElement.attachShadow)) return n(i.replace(new RegExp(shadowAPI.PSEUDO_ELEMENT, "g"), ""), o, a, s);
                                    if (e(i)) {
                                        var d = t(i),
                                            u = r(d.baseCss, o);
                                        return _.reduce(u, function (e, t) {
                                            return shadowAPI.getShadowRoot(t) ? e.concat(r(d.shadowCss, shadowAPI.getShadowRoot(t), a, s)) : e
                                        }, [])
                                    }
                                    return n(i, o, a, s)
                                }, n);
                                return i.matchesSelector = _.wrap(i.matchesSelector, function (t, n, r) {
                                    return shadowAPI.isElementShadowRoot(n) ? !1 : e(r) ? i(r, document, null, [n]).length > 0 : t(n, r)
                                }), i
                            }
                        }
                    }(),
                    pendo = windowOrMountPoint.pendo = windowOrMountPoint.pendo || {},
                    _ = pendo._ = UNDERSCORE_EXT._,
                    Sizzle = pendo.Sizzle = shadowAPI.wrapSizzle(SIZZLE_EXT.Sizzle),
                    Zlib = pendo.Zlib = {},
                    ENV = "prod",
                    SERVER = "https://app.pendo.io",
                    ASSET_HOST = "cdn.pendo.io",
                    DESIGNER_ENV = "prod",
                    VERSION = pendo.VERSION = "2.108.1_prod",
                    PACKAGE_VERSION = "2.108.1",
                    getUA = function () {
                        return navigator.userAgent
                    },
                    getVersion = function () {
                        return isBrowserInQuirksmode() ? VERSION + "+quirksmode" : VERSION
                    },
                    ConfigReader = function () {
                        function e(e) {
                            return h(E, {
                                name: e
                            }) || {
                                name: e
                            }
                        }

                        function t(e) {
                            return get(e, "supportedSources", [b, y, w])
                        }

                        function n(e) {
                            return get(e, "key") || get(e, "name")
                        }

                        function i(e, t) {
                            if (t) {
                                var i = t(),
                                    r = get(i.lookup, n(e));
                                return doesExist(r) ? r : undefined
                            }
                        }

                        function r(e, t) {
                            var n = i(e, C[t]);
                            return new d(e.name, n, t)
                        }

                        function o(e, n) {
                            return n = n || t(e), p(m(n, _.partial(r, e)), function (e) {
                                return doesExist(e.value)
                            })
                        }

                        function a(t, n, i) {
                            var r = e(t);
                            n = n || get(r, "defaultValue", null);
                            var a = new d(t, n, S),
                                s = o(r, i);
                            return r.useAnySource && doesExist(n) ? g(s, function (e) {
                                return e.value !== n
                            }) || a : f(s) || a
                        }

                        function s(t) {
                            var n = e(t),
                                i = p(o(n), function (e) {
                                    return e.source !== S
                                });
                            return i.length < 2 ? [] : l(v(i, "value"), function (e) {
                                return e === i[0].value
                            }) ? [] : i
                        }

                        function d(e, t, n) {
                            this.name = e, this.value = t, this.source = n
                        }

                        function u() {
                            var e = [];
                            return c(E, function (t) {
                                e.push({
                                    name: t.name,
                                    active: a(t.name),
                                    conflicts: s(t.name)
                                })
                            }), e
                        }
                        var l = _.all,
                            c = _.each,
                            p = _.filter,
                            f = _.first,
                            g = _.find,
                            h = _.findWhere,
                            m = _.map,
                            v = _.pluck,
                            b = "snippet",
                            y = "pendoconfig",
                            w = "global",
                            S = "default",
                            E = [{
                                name: "preventCodeInjection",
                                defaultValue: !1,
                                supportedSources: [b, y, w]
                            }, {
                                name: "pendoCore",
                                defaultValue: !0,
                                supportedSources: [y]
                            }, {
                                name: "apiKey",
                                supportedSources: [b, y]
                            }, {
                                name: "additionalApiKeys",
                                supportedSources: [b, y]
                            }, {
                                name: "adoptPrioritizeAdoptGuides",
                                defaultValue: !1,
                                supportedSources: [y]
                            }, {
                                name: "enableDesignerKeyboardShortcut",
                                supportedSources: [b]
                            }, {
                                name: "disableDesignerKeyboardShortcut",
                                defaultValue: !1,
                                supportedSources: [y]
                            }, {
                                name: "pendoFeedback",
                                defaultValue: !1,
                                supportedSources: [y]
                            }, {
                                name: "disableFeedbackAutoInit",
                                supportedSources: [y]
                            }, {
                                name: "cookieDomain",
                                supportedSources: [b, y]
                            }, {
                                name: "feedbackSettings",
                                supportedSources: [y]
                            }, {
                                name: "htmlAttributes",
                                supportedSources: [y]
                            }, {
                                name: "htmlAttributeBlacklist",
                                supportedSources: [y]
                            }, {
                                name: "xhrTimings",
                                supportedSources: [y]
                            }, {
                                name: "localStorageOnly",
                                supportedSources: [b, y]
                            }, {
                                name: "disableCookies",
                                supportedSources: [b, y]
                            }, {
                                name: "freeNPSData",
                                supportedSources: [y]
                            }, {
                                name: "feedbackSettings",
                                supportedSources: [y],
                                defaultValue: {}
                            }, {
                                name: "contentHost",
                                supportedSources: [b, y]
                            }, {
                                name: "guideSeenTimeoutLength",
                                supportedSources: [y],
                                defaultValue: 1e4
                            }, {
                                name: "disableGlobalCSS",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "disablePersistence",
                                supportedSources: [y, b]
                            }, {
                                name: "enableSignedMetadata",
                                supportedSources: [y],
                                defaultValue: !1
                            }, {
                                name: "requireSignedMetadata",
                                supportedSources: [y],
                                defaultValue: !1
                            }, {
                                name: "guideValidation",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "enableGuideTimeout",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "blockAgentMetadata",
                                supportedSources: [y],
                                defaultValue: !1
                            }, {
                                name: "adoptHost",
                                supportedSources: [y]
                            }, {
                                name: "allowedText",
                                supportedSources: [b, y],
                                defaultValue: []
                            }, {
                                name: "excludeAllText",
                                supportedSources: [y, b],
                                defaultValue: !1,
                                useAnySource: !0
                            }, {
                                name: "dataHost",
                                supportedSources: [b]
                            }, {
                                name: "ignoreHashRouting",
                                supportedSources: [y, b]
                            }, {
                                name: "xhrWhitelist",
                                supportedSources: [y]
                            }, {
                                name: "preferBroadcastChannel",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "preferMutationObserver",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "preventUnloadListener",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "guideValidation",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "disableGuidePseudoStyles",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }, {
                                name: "annotateUrl",
                                supportedSources: [b]
                            }, {
                                name: "sanitizeUrl",
                                supportedSources: [b]
                            }, {
                                name: "queryStringWhitelist",
                                supportedSources: [b]
                            }, {
                                name: "delayGuides",
                                supportedSources: [b]
                            }, {
                                name: "guides.delay",
                                supportedSources: [b]
                            }, {
                                name: "guideTimeout",
                                supportedSources: [b]
                            }, {
                                name: "guides.timeout",
                                supportedSources: [b]
                            }, {
                                name: "disableGuides",
                                supportedSources: [b]
                            }, {
                                name: "guides.disabled",
                                supportedSources: [b]
                            }, {
                                name: "guides.tooltip.arrowSize",
                                supportedSources: [b]
                            }, {
                                name: "guides.attachPoint",
                                supportedSources: [b]
                            }, {
                                name: "disablePrefetch",
                                supportedSources: [b, y]
                            }, {
                                name: "initializeImmediately",
                                supportedSources: [b, y],
                                defaultValue: !1
                            }],
                            C = {};
                        return C[b] = function () {
                            return {
                                lookup: originalOptions || window.pendo_options,
                                name: b
                            }
                        }, C[y] = function () {
                            var e = "undefined" != typeof PendoConfig ? PendoConfig : {};
                            return {
                                lookup: e,
                                name: y
                            }
                        }, C[w] = function () {
                            return {
                                lookup: pendo,
                                name: w
                            }
                        }, d.prototype.toString = function () {
                            return "Config option `" + this.name + "` with value `" + this.value + "` from source `" + this.source + "`"
                        }, {
                            audit: u,
                            get: function (e, t) {
                                var n = a(e, t);
                                return n.value
                            },
                            getLocalConfig: function (e, t) {
                                return a(e, t, [b]).value
                            },
                            getHostedConfig: function (e, t) {
                                return a(e, t, [y]).value
                            },
                            options: v(E, "name"),
                            validate: function (e) {
                                e.groupCollapsed("Validate Config options"), c(u(), function (t) {
                                    e.log(String(t.active)), t.conflicts.length > 0 && (e.warn("Multiple sources found with values for " + t.name), c(t.conflicts, function (t) {
                                        e.warn(String(t))
                                    }))
                                }), e.groupEnd()
                            }
                        }
                    }(),
                    pendoLocalStorage = function () {
                        var e = _.noop,
                            t = {
                                getItem: e,
                                setItem: e,
                                removeItem: e
                            };
                        try {
                            var n = window.localStorage;
                            return n ? n : t
                        } catch (i) {
                            return t
                        }
                    }(),
                    Promise = window.Promise;
                Promise = function (e, t) {
                    var n = e.Promise;
                    return "function" == typeof n && /native/.test(n) ? n : t()
                }(window, function () {
                    function e(e) {
                        var t = this.constructor;
                        return this.then(function (n) {
                            return t.resolve(e()).then(function () {
                                return n
                            })
                        }, function (n) {
                            return t.resolve(e()).then(function () {
                                return t.reject(n)
                            })
                        })
                    }

                    function t(e) {
                        var t = this;
                        return new t(function (t, n) {
                            function i(e, n) {
                                if (n && ("object" == typeof n || "function" == typeof n)) {
                                    var a = n.then;
                                    if ("function" == typeof a) return void a.call(n, function (t) {
                                        i(e, t)
                                    }, function (n) {
                                        r[e] = {
                                            status: "rejected",
                                            reason: n
                                        }, 0 === --o && t(r)
                                    })
                                }
                                r[e] = {
                                    status: "fulfilled",
                                    value: n
                                }, 0 === --o && t(r)
                            }
                            if (!e || "undefined" == typeof e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
                            var r = Array.prototype.slice.call(e);
                            if (0 === r.length) return t([]);
                            for (var o = r.length, a = 0; a < r.length; a++) i(a, r[a])
                        })
                    }

                    function n(e) {
                        return Boolean(e && "undefined" != typeof e.length)
                    }

                    function i() {}

                    function r(e, t) {
                        return function () {
                            e.apply(t, arguments)
                        }
                    }

                    function o(e) {
                        if (!(this instanceof o)) throw new TypeError("Promises must be constructed via new");
                        if ("function" != typeof e) throw new TypeError("not a function");
                        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], c(e, this)
                    }

                    function a(e, t) {
                        for (; 3 === e._state;) e = e._value;
                        return 0 === e._state ? void e._deferreds.push(t) : (e._handled = !0, void o._immediateFn(function () {
                            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                            if (null === n) return void(1 === e._state ? s : d)(t.promise, e._value);
                            var i;
                            try {
                                i = n(e._value)
                            } catch (r) {
                                return void d(t.promise, r)
                            }
                            s(t.promise, i)
                        }))
                    }

                    function s(e, t) {
                        try {
                            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                            if (t && ("object" == typeof t || "function" == typeof t)) {
                                var n = t.then;
                                if (t instanceof o) return e._state = 3, e._value = t, void u(e);
                                if ("function" == typeof n) return void c(r(n, t), e)
                            }
                            e._state = 1, e._value = t, u(e)
                        } catch (i) {
                            d(e, i)
                        }
                    }

                    function d(e, t) {
                        e._state = 2, e._value = t, u(e)
                    }

                    function u(e) {
                        2 === e._state && 0 === e._deferreds.length && o._immediateFn(function () {
                            e._handled || o._unhandledRejectionFn(e._value)
                        });
                        for (var t = 0, n = e._deferreds.length; n > t; t++) a(e, e._deferreds[t]);
                        e._deferreds = null
                    }

                    function l(e, t, n) {
                        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
                    }

                    function c(e, t) {
                        var n = !1;
                        try {
                            e(function (e) {
                                n || (n = !0, s(t, e))
                            }, function (e) {
                                n || (n = !0, d(t, e))
                            })
                        } catch (i) {
                            if (n) return;
                            n = !0, d(t, i)
                        }
                    }
                    var p = setTimeout;
                    return o.prototype["catch"] = function (e) {
                        return this.then(null, e)
                    }, o.prototype.then = function (e, t) {
                        var n = new this.constructor(i);
                        return a(this, new l(e, t, n)), n
                    }, o.prototype["finally"] = e, o.all = function (e) {
                        return new o(function (t, i) {
                            function r(e, n) {
                                try {
                                    if (n && ("object" == typeof n || "function" == typeof n)) {
                                        var s = n.then;
                                        if ("function" == typeof s) return void s.call(n, function (t) {
                                            r(e, t)
                                        }, i)
                                    }
                                    o[e] = n, 0 === --a && t(o)
                                } catch (d) {
                                    i(d)
                                }
                            }
                            if (!n(e)) return i(new TypeError("Promise.all accepts an array"));
                            var o = Array.prototype.slice.call(e);
                            if (0 === o.length) return t([]);
                            for (var a = o.length, s = 0; s < o.length; s++) r(s, o[s])
                        })
                    }, o.allSettled = t, o.resolve = function (e) {
                        return e && "object" == typeof e && e.constructor === o ? e : new o(function (t) {
                            t(e)
                        })
                    }, o.reject = function (e) {
                        return new o(function (t, n) {
                            n(e)
                        })
                    }, o.race = function (e) {
                        return new o(function (t, i) {
                            if (!n(e)) return i(new TypeError("Promise.race accepts an array"));
                            for (var r = 0, a = e.length; a > r; r++) o.resolve(e[r]).then(t, i)
                        })
                    }, o._immediateFn = "function" == typeof setImmediate && function (e) {
                        setImmediate(e)
                    } || function (e) {
                        p(e, 0)
                    }, o._unhandledRejectionFn = function (e) {
                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                    }, o
                });
                var URL = window.URL;
                URL = function (e, t) {
                    var n = e.URL;
                    return "function" == typeof n && /native/.test(n) ? n : t(document)
                }(window, function (e) {
                    return function (t) {
                        var n = e.createElement("a");
                        if (n.href = t, ":" === n.protocol) throw new Error("Uncaught TypeError: Failed to construct 'URL': Invalid URL");
                        if (n.href !== t && n.href !== encodeURI(t)) throw new Error("Uncaught TypeError: Failed to construct 'URL': Invalid URL");
                        return n.toString || (n.toString = function () {
                            return n.href
                        }), n
                    }
                });
                var ayepromise = function () {
                        var e = {},
                            t = function () {
                                var e = !1;
                                return function (t) {
                                    return function () {
                                        e || (e = !0, t.apply(null, arguments))
                                    }
                                }
                            },
                            n = function (e) {
                                var t = e && e.then;
                                return "object" == typeof e && "function" == typeof t ? function () {
                                    return t.apply(e, arguments)
                                } : void 0
                            },
                            i = function (t, n) {
                                var i = e.defer(),
                                    r = function (e, t) {
                                        setTimeout(function () {
                                            var n;
                                            try {
                                                n = e(t)
                                            } catch (r) {
                                                return void i.reject(r)
                                            }
                                            n === i.promise ? i.reject(new TypeError("Cannot resolve promise with itself")) : i.resolve(n)
                                        }, 1)
                                    },
                                    a = function (e) {
                                        t && t.call ? r(t, e) : i.resolve(e)
                                    },
                                    s = function (e) {
                                        n && n.call ? r(n, e) : i.reject(e)
                                    };
                                return {
                                    promise: i.promise,
                                    handle: function (e, t) {
                                        e === o ? a(t) : s(t)
                                    }
                                }
                            },
                            r = 0,
                            o = 1,
                            a = 2;
                        return e.defer = function () {
                            var e, s = r,
                                d = [],
                                u = function (t, n) {
                                    s = t, e = n, _.each(d, function (t) {
                                        t.handle(s, e)
                                    }), d = null
                                },
                                l = function (e) {
                                    u(o, e)
                                },
                                c = function (e) {
                                    u(a, e)
                                },
                                p = function (t, n) {
                                    var o = i(t, n);
                                    return s === r ? d.push(o) : o.handle(s, e), o.promise
                                },
                                f = function (e) {
                                    var n = t();
                                    try {
                                        e(n(g), n(c))
                                    } catch (i) {
                                        n(c)(i)
                                    }
                                },
                                g = function (e) {
                                    var t;
                                    try {
                                        t = n(e)
                                    } catch (i) {
                                        return void c(i)
                                    }
                                    t ? f(t) : l(e)
                                },
                                h = t();
                            return {
                                resolve: h(g),
                                reject: h(c),
                                promise: {
                                    then: p,
                                    "catch": function (e) {
                                        return p(null, e)
                                    }
                                }
                            }
                        }, e
                    }(),
                    q;
                isBetaAgent(ENV, "undefined" == typeof PendoConfig ? {} : PendoConfig) ? (q = {}, q.all = function (e) {
                    return _.isArray(e) ? Promise.all.apply(Promise, arguments) : qAllObject(e)
                }, q.reject = function () {
                    return Promise.reject.apply(Promise, arguments)
                }, q.resolve = function () {
                    return Promise.resolve.apply(Promise, arguments)
                }, q.defer = function () {
                    var e = {};
                    return e.promise = new Promise(function (t, n) {
                        e.resolve = t, e.reject = n
                    }), e
                }) : (q = ayepromise, q.all = qAllObject, q.reject = function (e) {
                    var t = q.defer();
                    return t.reject(e), t.promise
                }, q.resolve = function (e) {
                    var t = q.defer();
                    return t.resolve(e), t.promise
                });
                var makeSafe = function (e, t) {
                    return t = !!t,
                        function () {
                            try {
                                return e.apply(this, arguments)
                            } catch (n) {
                                t || writeException(n)
                            }
                        }
                };
                pendo.events = function () {
                    var e = Eventable.call({}),
                        t = {
                            validateGuide: 1,
                            validateLauncher: 1,
                            validateGlobalScript: 1
                        };
                    return _.each(["ready", "deliverablesLoaded", "guidesFailed", "guidesLoaded", "validateGuide", "validateLauncher", "validateGlobalScript"], function (n) {
                        e[n] = function (i) {
                            if (_.isFunction(i)) return e.on(n, i);
                            var r = t[n] ? "triggerAsync" : "trigger";
                            return e[r].apply(e, [n].concat(_.toArray(arguments)))
                        }
                    }), e
                }();
                var Events = function () {
                        function e(e, t) {
                            this.name = e, this.groups = t || []
                        }

                        function t(e, t) {
                            var n = {
                                type: e,
                                ts: getNow()
                            };
                            return doesExist(t) && _.isObject(t) && (n.data = t), n
                        }

                        function n(e) {
                            s[e] = {
                                on: _.partial(s.on, e),
                                one: _.partial(s.one, e),
                                off: _.partial(s.off, e)
                            }
                        }

                        function i(e) {
                            var n = _.findWhere(a, {
                                    name: e
                                }),
                                i = _.toArray(arguments).slice(1);
                            _.each(n.groups, function (t) {
                                var n = d[t](e, i);
                                u.apply(s, [t].concat(n))
                            });
                            var r = t(e, i);
                            return u.apply(s, [e].concat(r))
                        }

                        function r(e) {
                            var t = e.name;
                            s[t] = {
                                on: _.partial(s.on, t),
                                one: _.partial(s.one, t),
                                off: _.partial(s.off, t),
                                trigger: _.partial(i, t)
                            }
                        }
                        var o = {
                                DEBUG: "debug",
                                LIFECYCLE: "lifecycle"
                            },
                            a = [new e("guideListChanged", [o.DEBUG, o.LIFECYCLE]), new e("guideSeen", [o.DEBUG, o.LIFECYCLE]), new e("guideAdvanced", [o.DEBUG, o.LIFECYCLE]), new e("guideDismissed", [o.DEBUG, o.LIFECYCLE]), new e("guideSnoozed", [o.DEBUG, o.LIFECYCLE]), new e("guideSnoozeCancelled", [o.DEBUG, o.LIFECYCLE]), new e("guideTimeout", [o.DEBUG, o.LIFECYCLE]), new e("guideLoopStarted", [o.DEBUG, o.LIFECYCLE]), new e("identify", [o.DEBUG, o.LIFECYCLE]), new e("metadata", [o.DEBUG, o.LIFECYCLE]), new e("appUnloaded", [o.DEBUG, o.LIFECYCLE]), new e("startPreview", [o.DEBUG]), new e("resourceFetchFail", [o.DEBUG]), new e("contentVerificationFail", [o.DEBUG]), new e("contentValidationFail", [o.DEBUG]), new e("renderFail", [o.DEBUG]), new e("appUsage", [o.LIFECYCLE])],
                            s = Eventable.call({}),
                            d = {
                                debug: function () {
                                    return EventTracer.addTracerIds(t.apply(null, arguments))
                                },
                                lifecycle: t
                            },
                            u = s.trigger;
                        return s.trigger = i, _.each(_.values(o), n), _.each(a, r), s
                    }(),
                    rtrim = /^\s+|\s+$/g,
                    trim = String.prototype.trim;
                trim || (trim = function () {
                    return this.replace(rtrim, "")
                });
                var whenLoadedCall = function (e, t) {
                        t = t || window;
                        var n = t.document;
                        "complete" === n.readyState || ConfigReader.get("initializeImmediately") ? e() : attachEventInternal(t, "load", e)
                    },
                    setFocusToActivationElement = function (e) {
                        if (!pendo.designer && e && "building-block" === get(e, "attributes.type", "")) {
                            var t = e.steps[0],
                                n = get(e, "launchMethod", "").split("-"),
                                i = _.contains(n, "dom"),
                                r = _.contains(n, "badge");
                            if ("badge" === t.seenReason && r) {
                                var o = dom("#_pendo-badge_" + t.id),
                                    a = o.find("input");
                                if (a.length < 1) return;
                                a[0].focus()
                            }
                            if ("dom" === t.seenReason && i) {
                                var s = get(e, "attributes.activation.selector", ""),
                                    d = dom(s);
                                if (d.length < 1) return;
                                d[0].focus()
                            }
                        }
                    },
                    escapeStringsInObject = function (e, t) {
                        if (t || (t = 0), t >= 200) return e;
                        if (_.isArray(e)) return _.map(e, function (e) {
                            return escapeStringsInObject(e, t + 1)
                        });
                        if (!_.isObject(e) || _.isDate(e) || _.isRegExp(e) || _.isElement(e)) return _.isString(e) ? _.escape(e) : e;
                        var n = {};
                        return _.each(e, function (e, i) {
                            n[i] = escapeStringsInObject(e, t + 1)
                        }), n
                    };
                pendo.compress = function (e) {
                    var t = pendo.toUTF8Array(JSON.stringify(e)),
                        n = new Zlib.Deflate(t),
                        i = n.compress(),
                        r = pendo.fromByteArray(i);
                    return r
                };
                var base64EncodeString = function (e) {
                        var t = pendo.toUTF8Array(e);
                        return pendo.fromByteArray(t)
                    },
                    crc32 = function (e) {
                        if ("undefined" != typeof e) {
                            _.isString(e) || (e = JSON.stringify(e));
                            var t = pendo.toUTF8Array(e);
                            return Zlib.CRC32.calc(t, 0, t.length)
                        }
                    };
                pendo.squeezeAndCompress = function (e) {
                    var t = pendo.compress(e);
                    return t
                }, pendo.letters = "abcdefghijklmnopqrstuvwxyz", pendo.charset = pendo.letters + pendo.letters.toUpperCase() + "1234567890", pendo.randomElement = function (e) {
                    return e[Math.floor(Math.random() * e.length)]
                }, pendo.randomString = function (e) {
                    for (var t = "", n = pendo.charset.split(""), i = 0; e > i; i++) t += pendo.randomElement(n);
                    return t
                }, pendo.toUTF8Array = function (e) {
                    for (var t = [], n = 0; n < e.length; n++) {
                        var i = e.charCodeAt(n);
                        128 > i ? t.push(i) : 2048 > i ? t.push(192 | i >> 6, 128 | 63 & i) : 55296 > i || i >= 57344 ? t.push(224 | i >> 12, 128 | i >> 6 & 63, 128 | 63 & i) : (n++, i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(n)), t.push(240 | i >> 18, 128 | i >> 12 & 63, 128 | i >> 6 & 63, 128 | 63 & i))
                    }
                    return t
                };
                var strContains = function (e, t, n) {
                        return pendo.doesExist(e) && pendo.doesExist(t) ? (n && (e = e.toLowerCase(), t = t.toLowerCase()), e.indexOf(t) > -1) : !1
                    },
                    isFinite = getIsFiniteImpl(window);
                pendo.getNumberFromText = function (e) {
                    var t = /-?[\d,]+\.?([\d,]+)*/,
                        n = e.match(t);
                    return n ? parseFloat(n[0].replace(/,/g, "")) : null
                };
                var EXTENSION_INSTALL_TYPE = "extension",
                    NATIVE_INSTALL_TYPE = "native",
                    EventTracer = createEventTracer(window),
                    _hasClass = function (e, t) {
                        try {
                            var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                            return n.test(_getClass(e))
                        } catch (i) {
                            return !1
                        }
                    },
                    _addClass = function (e, t) {
                        try {
                            if (!_hasClass(e, t)) {
                                var n = trim.call(_getClass(e)) + " " + t;
                                _setClass(e, n)
                            }
                        } catch (i) {}
                    },
                    _removeClass = function (e, t) {
                        try {
                            if (_hasClass(e, t)) {
                                var n = new RegExp("(\\s|^)" + t + "(\\s|$)"),
                                    i = _getClass(e).replace(n, " ");
                                _setClass(e, i)
                            }
                        } catch (r) {}
                    },
                    _setClass = function (e, t) {
                        _.isString(e.className) ? e.className = t : e.setAttribute("class", t)
                    },
                    _getClass = function (e) {
                        try {
                            var t = e.className;
                            return t = _.isString(t) || !pendo.doesExist(t) ? t : e.getAttribute("class"), t || ""
                        } catch (n) {
                            return ""
                        }
                    },
                    _getCss3Prop = function (e) {
                        function t(e) {
                            return e.replace(/-([a-z])/gi, function (e, t) {
                                return t.toUpperCase()
                            })
                        }
                        var n = t(e),
                            i = n.substr(0, 1);
                        return n = i.toLowerCase() + n.substr(1)
                    },
                    cssNumber = {
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    setStyle = function (e, t) {
                        var n = styleToObject(t);
                        setStyles(e, n)
                    },
                    styleToObject = function (e) {
                        if (_.isString(e)) {
                            var t, n, i, r, o = e.split(";");
                            for (e = {}, i = 0; i < o.length; i++) t = o[i], r = t.indexOf(":"), n = t.substring(0, r), e[n] = t.substring(r + 1)
                        }
                        return e
                    },
                    setStyles = function (e, t) {
                        _.each(t, function (t, n) {
                            if (n = trim.call(n), "" !== n) {
                                var i = _getCss3Prop(n);
                                !_.isNumber(t) || isNaN(t) || cssNumber[i] ? _.isString(t) || (t = "" + t) : t = "" + t + "px";
                                var r = t.indexOf("!important");
                                if (-1 !== r) try {
                                    var o = trim.call(o.substring(0, r));
                                    return void e.style.setProperty(n, o, "important")
                                } catch (a) {
                                    return void(e.style.cssText += ";" + n + ":" + t)
                                } else try {
                                    e.style[i] = trim.call(t)
                                } catch (a) {
                                    log("failed to set style: " + n + " with value " + t)
                                }
                            }
                        })
                    },
                    getScreenDimensions = function () {
                        if (isBrowserInQuirksmode()) return {
                            width: document.documentElement.offsetWidth || 0,
                            height: document.documentElement.offsetHeight || 0
                        };
                        var e = window.innerWidth || document.documentElement.clientWidth,
                            t = window.innerHeight || document.documentElement.clientHeight;
                        return {
                            width: e,
                            height: t
                        }
                    },
                    _isInViewport = function (e) {
                        var t = getScreenDimensions(),
                            n = documentScrollTop(),
                            i = documentScrollLeft();
                        return e.top >= n && e.left >= i && e.top + e.height <= n + t.height && e.left + e.width <= i + t.width
                    },
                    removeClass = function (e, t) {
                        if ("string" == typeof e) {
                            var n = dom(e);
                            _.map(n, function (e) {
                                _removeClass(e, t)
                            })
                        } else _removeClass(e, t)
                    },
                    addClass = function (e, t) {
                        if ("string" == typeof e) {
                            var n = dom(e);
                            _.map(n, function (e) {
                                _addClass(e, t)
                            })
                        } else _addClass(e, t)
                    },
                    removeNode = function (e) {
                        e && e.parentNode && e.parentNode.removeChild(e)
                    },
                    getElements = _.compose(function (e) {
                        return Array.prototype.slice.call(e)
                    }, function (e) {
                        try {
                            return Sizzle(e)
                        } catch (t) {
                            return writeMessage("error using sizzle: " + t), document.getElementsByTagName(e)
                        }
                    }),
                    pickBestBODY = function (e, t) {
                        try {
                            var n = t.children.length + t.offsetHeight + t.offsetWidth,
                                i = e.children.length + e.offsetHeight + e.offsetWidth;
                            return n - i
                        } catch (r) {
                            return log("error interrogating body elements: " + r), writeMessage("error picking best body:" + r), 0
                        }
                    },
                    getBody = function () {
                        try {
                            var e = getElements("body");
                            return e && e.length > 1 ? (e.sort(pickBestBODY), e[0] || document.body) : document.body && document.body.tagName && "body" !== document.body.tagName.toLowerCase() ? document.documentElement : document.body
                        } catch (t) {
                            return writeMessage("Error getting body element: " + t), document.body
                        }
                    },
                    checkIfElementNode = function (e) {
                        var t = "undefined" != typeof Node && "undefined" != typeof Node.ELEMENT_NODE,
                            n = t ? Node.ELEMENT_NODE : 1;
                        return e && e.nodeType === n
                    },
                    getComputedStyle_safe = makeSafe(function (e) {
                        return checkIfElementNode(e) ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle ? e.currentStyle : void 0 : void 0
                    }, !0),
                    getClientRect = function (e) {
                        var t = getBody();
                        if (null !== e) {
                            if (e === t || e === document || e === window) {
                                var n = {
                                    left: window.pageXOffset || t.scrollLeft,
                                    top: window.pageYOffset || t.scrollTop,
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                };
                                return n.right = n.left + n.width, n.bottom = n.top + n.height, n
                            }
                            var i = getOffsetPosition(e);
                            return i.right = i.left + i.width, i.bottom = i.top + i.height, i
                        }
                    },
                    intersectRect = function (e, t) {
                        return e.top >= t.bottom ? !1 : e.bottom <= t.top ? !1 : e.left >= t.right ? !1 : e.right <= t.left ? !1 : !0
                    },
                    getScrollParent = function (e, t) {
                        t = t || /(auto|scroll|hidden)/;
                        var n, i, r, o = getBody();
                        if (e === o || !isInDocument(e)) return null;
                        for (i = e; i && i != o;) {
                            if (n = getComputedStyle_safe(i), !n) return null;
                            if (r = n.position, i !== e && t.test(n.overflow + n.overflowY + n.overflowX)) return i;
                            if ("absolute" === r || "fixed" === r && hasParentWithCssTransform(i)) i = i.offsetParent;
                            else {
                                if ("fixed" === r) return null;
                                i = i.parentNode
                            }
                        }
                        return o
                    },
                    OverflowDirection = {
                        X: "x",
                        Y: "y",
                        BOTH: "both",
                        NONE: "none"
                    };
                _.extend(DomData.prototype, {
                    cache: function (e) {
                        if (!_.isObject(e)) return {};
                        var t = e[this.ownerKey];
                        return t || (t = {}, e[this.ownerKey] = t), t
                    },
                    set: function (e, t, n) {
                        var i = this.cache(e);
                        return i[t] = n, i
                    },
                    get: function (e, t) {
                        return t === undefined ? this.cache(e) : e[this.ownerKey] && e[this.ownerKey][t]
                    },
                    remove: function (e, t) {
                        var n = this.cache(e);
                        delete n[t], (t === undefined || _.isEmpty(n)) && (e[this.ownerKey] = undefined)
                    }
                }), _.extend(dom, {
                    data: new DomData
                }), _.extend(dom.prototype, {
                    findOrCreate: function (e) {
                        return this.length > 0 ? this : dom(e)
                    },
                    find: function (e) {
                        var t = dom();
                        return t.context = this.context, this.each(function () {
                            dom(e, this).each(function () {
                                t[t.length++] = this
                            })
                        }), t
                    },
                    each: function (e) {
                        for (var t = this, n = 0, i = t.length; i > n; ++n) e.call(t[n], t[n], n);
                        return t
                    },
                    html: function (e) {
                        return e === undefined ? this.length ? this[0].innerHTML : this : this.each(function () {
                            this.innerHTML = e
                        })
                    },
                    text: function (e) {
                        var t = "innerText" in document.body;
                        return e === undefined ? t ? this.length ? this[0].innerText : this : this.length ? this[0].textContent : this : this.each(function () {
                            return setStyle(this, {
                                "white-space": "pre-wrap"
                            }), t ? void(this.innerText = e) : void(this.textContent = e)
                        })
                    },
                    addClass: function (e) {
                        return e = e.split(/\s+/), this.each(function (t) {
                            _.each(e, function (e) {
                                _addClass(t, e)
                            })
                        })
                    },
                    removeClass: function (e) {
                        return e = e.split(/\s+/), this.each(function (t) {
                            _.each(e, function (e) {
                                _removeClass(t, e)
                            })
                        })
                    },
                    hasClass: function (e) {
                        e = e.split(/\s+/);
                        var t = !0;
                        return 0 === this.length ? !1 : (this.each(function (n) {
                            _.each(e, function (e) {
                                t = t && _hasClass(n, e)
                            })
                        }), t)
                    },
                    toggleClass: function (e) {
                        return e = e.split(/\s+/), this.each(function (t) {
                            _.each(e, function (e) {
                                _hasClass(t, e) ? _removeClass(t, e) : _addClass(t, e)
                            })
                        })
                    },
                    css: function (e) {
                        return this.each(function () {
                            setStyle(this, e)
                        }), this
                    },
                    appendTo: function (e) {
                        return dom(e).append(this), this
                    },
                    append: function (e) {
                        var t = this;
                        return dom(e).each(function () {
                            t.length && t[0].appendChild(this), isInDocument(this) && _.each(Sizzle("script", this), evalScript)
                        }), t
                    },
                    prependTo: function (e) {
                        return dom(e).prepend(this), this
                    },
                    prepend: function (e) {
                        var t = this;
                        if (t.length) {
                            var n = t[0],
                                i = n.childNodes[0];
                            dom(e).each(function () {
                                i ? dom(this).insertBefore(i) : dom(this).appendTo(n)
                            })
                        }
                        return t
                    },
                    getParent: function () {
                        var e = dom(this)[0];
                        return e && e.parentNode ? dom(e.parentNode) : void 0
                    },
                    insertBefore: function (e) {
                        var t = dom(e)[0];
                        t && t.parentNode && (t.parentNode.insertBefore(this[0], t), isInDocument(document, this) && _.each(Sizzle("script", this), evalScript))
                    },
                    remove: function () {
                        return this.each(function () {
                            this.parentNode && this.parentNode.removeChild(this)
                        }), this
                    },
                    attr: function (e, t) {
                        return _.isObject(e) ? (this.each(function () {
                            _.each(e, function (e, t) {
                                this.setAttribute(t, e)
                            }, this)
                        }), this) : t !== undefined ? (this.each(function () {
                            this.setAttribute(e, t)
                        }), this) : this.length > 0 ? this[0].getAttribute(e) : void 0
                    },
                    closest: function (e, t) {
                        for (var n = this[0]; n && !Sizzle.matchesSelector(n, e);)
                            if (n = n.parentNode, n === document || t && Sizzle.matchesSelector(n, t)) return dom();
                        return dom(n)
                    },
                    eq: function (e) {
                        return dom(this[e])
                    },
                    height: function (e) {
                        return this.length ? e === undefined ? this[0].offsetHeight : (this[0].style.height = e + "px", this) : void 0
                    },
                    width: function (e) {
                        return this.length ? e === undefined ? this[0].offsetWidth : (this[0].style.width = e + "px", this) : void 0
                    },
                    focus: function () {
                        return this.each(function () {
                            _.isFunction(this.focus) && this.focus()
                        })
                    }
                }), _.extend(dom, {
                    removeNode: removeNode,
                    getClass: _getClass,
                    hasClass: _hasClass,
                    addClass: addClass,
                    removeClass: removeClass,
                    getBody: getBody,
                    getComputedStyle: getComputedStyle_safe,
                    getClientRect: getClientRect,
                    intersectRect: intersectRect,
                    getScrollParent: getScrollParent,
                    isElementVisible: isElementVisible,
                    scrollIntoView: scrollIntoView
                });
                var CAPTURING_PHASE = 1,
                    AT_TARGET = 2,
                    BUBBLING_PHASE = 3;
                dom.event = {
                    add: function (e, t) {
                        var n = dom.data.get(e);
                        n.handle || (n.handle = function (t) {
                            dom.event.dispatch(e, t)
                        }), t.id = _.uniqueId();
                        var i = t.capture ? "captureEvents" : "bubbleEvents",
                            r = n[i] = n[i] || {},
                            o = r[t.type] = r[t.type] || [];
                        o.length || attachEventInternal(e, t.type, n.handle, t.capture), o.push(t)
                    },
                    dispatch: function (e, t) {
                        if (e) {
                            var n = dom.data.get(e);
                            if (n) {
                                var i = (n.captureEvents || {})[t.type] || [],
                                    r = (n.bubbleEvents || {})[t.type] || [],
                                    o = i.concat(r);
                                if (o.length) {
                                    var a = dom.data.get(t);
                                    a.ignore || (a.handled = a.handled || {}, _.each(o.slice(), function (n) {
                                        var i = !!n.capture === isCapturingPhase(t),
                                            r = isAtTargetPhase(t),
                                            o = !i && !r;
                                        if (!(getTarget(t) !== e && o || a.handled[n.id])) {
                                            a.handled[n.id] = !0;
                                            try {
                                                pendo.doesExist(n.selector) ? pendo.dom(getTarget(t)).closest(n.selector).length > 0 && n.handler.call(e, t) : n.handler.call(e, t)
                                            } catch (s) {
                                                logError(s)
                                            }
                                        }
                                    }))
                                }
                            }
                        }
                    },
                    remove: function (e, t, n, i) {
                        var r = dom.data.get(e);
                        if (r) {
                            if (_.isFunction(n)) {
                                var o = i ? r.captureEvents : r.bubbleEvents;
                                if (!o) return;
                                var a = o[t];
                                if (!a) return;
                                var s = findIndex(a, function (e) {
                                    return e.handler === n
                                });
                                s >= 0 && a.splice(s, 1), a.length || (delete o[t], detachEventInternal(e, t, r.handle, i))
                            } else n === undefined && (r.captureEvents && r.captureEvents[t] && (delete r.captureEvents[t], detachEventInternal(e, t, r.handle, !0)), r.bubbleEvents && r.bubbleEvents[t] && (delete r.bubbleEvents[t], detachEventInternal(e, t, r.handle)));
                            _.isEmpty(r.captureEvents) && _.isEmpty(r.bubbleEvents) && (dom.data.remove(e, "captureEvents"), dom.data.remove(e, "bubbleEvents"), dom.data.remove(e, "handle"))
                        }
                    },
                    trigger: function (e) {
                        var t = dom.data.get(e);
                        if (!t.pendoStopped) {
                            if (!e.bubbles) return void dom.event.dispatch(getTarget(e), e);
                            var n = getTarget(e);
                            if (n) {
                                for (var i = n, r = []; i;) r.unshift(i), i = i.parentNode || i.host;
                                r.unshift(window);
                                var o;
                                if (isCapturingPhase(e)) {
                                    for (o = 0; o < r.length - 1 && !t.pendoStopped; ++o) dom.event.dispatch(r[o], e);
                                    e = dom.event.clone(e), e.eventPhase = AT_TARGET
                                }
                                for (e.eventPhase !== AT_TARGET || t.pendoStopped || (dom.event.dispatch(n, e), e = dom.event.clone(e), e.eventPhase = BUBBLING_PHASE), o = r.length - (null == e.eventPhase ? 1 : 2); o >= 0 && !t.pendoStopped; --o) dom.event.dispatch(r[o], e)
                            }
                        }
                    },
                    clone: function (e) {
                        var t = _.pick(e, ["type", "target", "path", "srcElement", "altKey", "ctrlKey", "shiftKey", "metaKey", "button", "which", "eventPhase", "bubbles", dom.data.ownerKey]),
                            n = shadowAPI.getComposedPath(e);
                        return n && (t.composedPath = _.constant(n)), t
                    }
                }, _.extend(dom.prototype, {
                    on: function (e, t, n, i) {
                        return _.isFunction(t) && (i = n, n = t, t = null), e = e.split(" "), this.each(function (r) {
                            _.each(e, function (e) {
                                dom.event.add(r, {
                                    type: e,
                                    selector: t,
                                    handler: n,
                                    capture: i
                                })
                            })
                        })
                    }
                });
                var isValidId = function (e) {
                        return doesExist(e) && "" !== e && e !== SUBACCOUNT_DELIMITER && "boolean" != typeof e && "object" != typeof e && !isStringWhiteSpace(e)
                    },
                    isAnonymousVisitor = function (e) {
                        return e && "number" != typeof e ? e.substring(0, pendo.TEMP_PREFIX.length) === pendo.TEMP_PREFIX : !1
                    },
                    shouldPersist = function () {
                        var e = originalOptions || window.pendo_options || {};
                        return !(getPendoConfigValue("disablePersistence") || e.disablePersistence)
                    },
                    removeIdentificationCookies = function (e) {
                        e = e || ["visitorId", "accountId"], _.each(e, function (e) {
                            clearCookie(getPendoCookieKey(e)), agentStorage.clear(e)
                        })
                    },
                    DEFAULT_VISITOR_ID = "VISITOR-UNIQUE-ID",
                    isDefaultVisitor = function (e) {
                        return DEFAULT_VISITOR_ID === e
                    },
                    SUBACCOUNT_DELIMITER = "::",
                    isSubaccount = function (e) {
                        return new RegExp(SUBACCOUNT_DELIMITER).test(e)
                    },
                    shouldVisitorIdentityChange = function (e, t) {
                        return isAnonymousVisitor(e) ? isValidId(t) ? isAnonymousVisitor(t) ? (pendo.log("visitor is anonymous: " + t), !1) : isDefaultVisitor(t) ? (pendo.log("visitor id is the default: " + t), !1) : (pendo.log("Re-mapping visitor identity from " + e + " to " + t), !0) : (pendo.log("Not valid visitor id: " + t), !1) : (pendo.log("Not change an old, non-anonymous visitor id: " + e), !1)
                    },
                    shouldAccountIdentityChange = function (e, t) {
                        return isValidId(t) ? (pendo.log("Re-mapping account identity from " + e + " to " + t), e != t) : (pendo.log("Not valid account id: " + t), !1)
                    };
                pendo.identify = makeSafe(function (e, t) {
                    var n = "object" == typeof e,
                        i = null,
                        r = {};
                    if (r.old_visitor_id = pendo.get_visitor_id(), r.old_account_id = pendo.get_account_id(), n && (i = e, i.visitor = i.visitor || {}, i.account = i.account || {}, i.parentAccount = i.parentAccount || {}, e = i.visitor.id, t = i.account.id, t && !isSubaccount(t) && i.parentAccount.id && (t = "" + i.parentAccount.id + SUBACCOUNT_DELIMITER + t), updateOptions(i)), !isValidId(e)) return void pendo.log("Invalid visitor id " + e);
                    pendo.set_visitor_id(e), isValidId(t) ? pendo.set_account_id(t) : (t = pendo.get_account_id(), isValidId(t) || (agentStorage.clear("accountId"), t = null));
                    var o = shouldVisitorIdentityChange(r.old_visitor_id, e),
                        a = shouldAccountIdentityChange(r.old_account_id, t);
                    if (o || a) {
                        if (shouldInitializeFeedback(e) && !_.isEmpty(i)) {
                            var s = getPendoConfigValue("feedbackSettings"),
                                d = JSON.parse(JSON.stringify(i));
                            pendo.feedback.init(d, s)
                        }
                        r.visitor_id = e, r.account_id = t, collectEvent("identify", r), flushLater(), Events.identify.trigger(r)
                    }
                    r.old_visitor_id !== e && queueGuideReload()
                }), pendo.get_visitor_id = function () {
                    var e, t = pendo.visitorId;
                    return isValidId(t) || (shouldPersist() ? (e = agentStorage.read("visitorId"), isValidId(e) || (e = pendo.generate_unique_id(pendo.TEMP_PREFIX), agentStorage.write("visitorId", e))) : e = pendo.generate_unique_id(pendo.TEMP_PREFIX), pendo.visitorId = e), pendo.visitorId
                }, pendo.set_visitor_id = function (e) {
                    pendo.visitorId = "" + e, shouldPersist() && agentStorage.write("visitorId", pendo.visitorId, pendo.DEFAULT_EXPIRE_LEN, !1, !0)
                }, pendo.get_account_id = function () {
                    if (!isValidId(pendo.accountId) && shouldPersist()) {
                        var e = agentStorage.read("accountId");
                        pendo.accountId = e
                    }
                    return pendo.accountId
                }, pendo.set_account_id = function (e) {
                    pendo.accountId = "" + e, isValidId(e) && shouldPersist() && agentStorage.write("accountId", pendo.accountId, null, !1, !0)
                };
                var inMemoryCookies = {},
                    cookieDomain, allowLocalStorageOnly = function () {
                        return ConfigReader.get("localStorageOnly")
                    },
                    storageIsDisabled = function () {
                        var e = getJwtInfoCopy();
                        return ConfigReader.get("disableCookies") || !!e.jwt && !!e.signingKeyName
                    },
                    getCookie = function (e) {
                        var t;
                        t = storageIsDisabled() || allowLocalStorageOnly() ? inMemoryCookies[e] : document.cookie;
                        var n;
                        return (n = new RegExp("(^|; )" + e + "=([^;]*)").exec(t)) ? decodeURIComponent(n[2]) : null
                    },
                    setCookie = function (e, t, n, i) {
                        if (!isInPreviewMode()) {
                            var r = new Date;
                            r.setTime(r.getTime() + n);
                            var o = e + "=" + encodeURIComponent(t) + (n ? ";expires=" + r.toUTCString() : "") + "; path=/" + ("https:" === document.location.protocol || i ? ";secure" : "") + "; SameSite=Strict";
                            cookieDomain && (o += ";domain=" + cookieDomain), storageIsDisabled() || allowLocalStorageOnly() ? inMemoryCookies[e] = o : document.cookie = o
                        }
                    },
                    getPendoCookieKey = function (e) {
                        return "_pendo_" + e + "." + pendo.apiKey
                    };
                pendo.get_pendo_cookie = function (e) {
                    return getCookie(getPendoCookieKey(e))
                }, pendo.DEFAULT_EXPIRE_LEN = 864e7, pendo.set_pendo_cookie = function (e, t, n, i) {
                    n = n || pendo.DEFAULT_EXPIRE_LEN, setCookie(getPendoCookieKey(e), t, n, i)
                };
                var agentStorage = function () {
                    function e() {
                        return storageIsDisabled() ? !1 : hasCookieDomain() ? !1 : s("localStorage")
                    }

                    function t(e) {
                        e.cache && (e.cache = {})
                    }

                    function n(t, n) {
                        if (e()) {
                            var r = n ? t : getPendoCookieKey(t),
                                o = i(localStorage.getItem(r));
                            return null === o && a(t), o
                        }
                        return n ? getCookie(t) : pendo.get_pendo_cookie(t)
                    }

                    function i(e) {
                        if (null === e) return null;
                        try {
                            var t = JSON.parse(e);
                            return t.ttl && t.ttl < (new Date).getTime() ? null : String(t.value || t)
                        } catch (n) {
                            return e
                        }
                    }

                    function r(n, i, r, a, d) {
                        if (t(s), e()) try {
                            var u = a ? n : getPendoCookieKey(n);
                            return localStorage.setItem(u, o(i, r)), void t(s)
                        } catch (l) {
                            log("Error trying to write to Localstorage: " + l)
                        }
                        return a ? void setCookie(n, i, r, d) : pendo.set_pendo_cookie(n, i, r, d)
                    }

                    function o(e, t) {
                        if (!t) return e;
                        var n = (new Date).getTime() + t;
                        return JSON.stringify({
                            ttl: n,
                            value: e
                        })
                    }

                    function a(t, n) {
                        var i = n ? t : getPendoCookieKey(t);
                        return e() ? localStorage.removeItem(i) : void clearCookie(i)
                    }
                    var s = _.memoize(function (e) {
                        var t;
                        try {
                            t = window[e];
                            var n = "__storage_test__";
                            return t.setItem(n, n), t.removeItem(n), !0
                        } catch (i) {
                            return i instanceof DOMException && (22 === i.code || 1014 === i.code || "QuotaExceededError" === i.name || "NS_ERROR_DOM_QUOTA_REACHED" === i.name) && t && 0 !== t.length
                        }
                    });
                    return {
                        read: n,
                        write: r,
                        clear: a
                    }
                }();
                ! function (e, t) {
                    e.ajax = t()
                }(pendo, function () {
                    function e(e) {
                        var t = {
                            status: e.status
                        };
                        try {
                            t.data = JSON.parse(e.responseText)
                        } catch (n) {
                            t.data = e.responseText
                        }
                        return t
                    }

                    function t(t) {
                        var i = q.defer(),
                            r = window.XMLHttpRequest || ActiveXObject,
                            o = new r("MSXML2.XMLHTTP.3.0");
                        return o.open(t.method || "GET", t.url, !t.sync), _.each(t.headers, function (e, t) {
                            o.setRequestHeader(t.toLowerCase(), e)
                        }), o.onreadystatechange = function () {
                            if (4 === o.readyState) {
                                var t = e(o);
                                o.status >= 200 && o.status < 300 ? i.resolve(t) : i.reject(t)
                            }
                        }, t.withCredentials && (o.withCredentials = !0), t.data ? o.send(t.data) : o.send(), n(i.promise)
                    }

                    function n(e) {
                        var t = e.then,
                            i = e["catch"];
                        return e.then = function () {
                            return n(t.apply(this, arguments))
                        }, e["catch"] = function () {
                            return n(i.apply(this, arguments))
                        }, e.fail = e["catch"], e
                    }

                    function i(e, n) {
                        return t({
                            method: "GET",
                            url: e,
                            headers: n
                        })
                    }

                    function r(e, n, i) {
                        return t({
                            method: "POST",
                            url: e,
                            data: n,
                            headers: i
                        })
                    }

                    function o(e, t, n) {
                        return n || (n = {}), n["content-type"] = "application/json", t = JSON.stringify(t), r(e, t, n)
                    }

                    function a(e, t, n) {
                        var i;
                        if (_.isArray(t)) i = t;
                        else {
                            if (!_.isObject(t)) return e ? e : "";
                            i = _.keys(t)
                        }
                        var r = _.map(i, function (e) {
                                return _.isArray(t) ? encodeURIComponent(e) : encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
                            }).join("&"),
                            o = e.split("#", 2),
                            a = o[0];
                        return n = "undefined" != typeof n ? n : o[1], [encodeURI(a), r ? (_.contains(e, "?") ? "&" : "?") + r : "", n ? "#" + n : ""].join("")
                    }
                    return _.extend(t, {
                        get: i,
                        post: r,
                        postJSON: o,
                        urlFor: a
                    })
                }), pendo.SIZE_UNIQUE_ID = 11;
                var pendoCore = getPendoCore();
                pendo.generate_unique_id = function (e) {
                    return e + pendo.randomString(pendo.SIZE_UNIQUE_ID)
                }, pendo.TEMP_PREFIX = "_PENDO_T_", pendo.doesExist = doesExist;
                var pageLoad = makeSafe(function (e) {
                        if (e = e || pendo.url.get(), e && e !== pageLoad.lastUrl) {
                            pageLoad.lastUrl = e;
                            var t = -1;
                            announceAgentLoaded(), debug("sending load event for url " + e), "undefined" != typeof performance && "undefined" != typeof performance.timing && (t = performance.timing.loadEventStart - performance.timing.fetchStart);
                            var n = {
                                load_time: t
                            };
                            detectMaster() && (n.is_frame = !0), collectEvent("load", n, e), queueGuideReload(e), flushLater()
                        }
                    }),
                    queueGuideReload = function (e) {
                        pendoCore && (queueGuideReload.pending && clearTimeout(queueGuideReload.pending), queueGuideReload.pending = setTimeout(function () {
                            delete queueGuideReload.pending, reloadGuides(e)
                        }, 0))
                    },
                    initializeCounter = 0,
                    originalOptions = null,
                    isFeedbackOn = getPendoConfigValue("pendoFeedback"),
                    isDisableFeedbackAutoInitOn = getPendoConfigValue("disableFeedbackAutoInit"),
                    stopListenToMaster, initialize = makeSafe(function (e) {
                        if ("complete" !== document.readyState) return void enqueueCall("initialize", arguments);
                        if (log("pendo.initialize called with " + JSON.stringify(e)), pendo.apiKey) return void(1 === initializeCounter++ && log(["pendo.initialize only needs to be called once", isSfdcLightning() ? " per namespace" : "", ". Use pendo.updateOptions to update metadata after the agent has initialized."].join("")));
                        if (e || (e = {}), _.isEmpty(getJwtInfoCopy())) {
                            var t = JWT.getJwtOptions(e, "initialize");
                            t && (setJwtInfo(_.pick(e, "jwt", "signingKeyName")), _.extend(e, t))
                        }
                        if (_.isString(e)) return pendo.ajax.get(e).then(function (e) {
                            return initialize(PendoConfig = e.data)
                        });
                        EventErrorLogger.run(), store.dispatch("location/init", e.location || {}), originalOptions = e, setUpdatedOptions(e), pendo.HOST = HOST = getDataHost();
                        var n = getOption("cookieDomain") || getPendoConfigValue("cookieDomain");
                        if (n && setCookieDomain(n, location.host), pendo.apiKey = getApiKey(e), pendo.additionalApiKeys = getAdditionalApiKeys(e), !pendo.apiKey && pendo.additionalApiKeys && pendo.additionalApiKeys.length && (pendo.apiKey = pendo.additionalApiKeys[0]), !pendo.apiKey) return void debug("API key is not set, Pendo will not initialize.");
                        pendo.apiKey = "" + pendo.apiKey;
                        for (var i = 0; i < pendo.additionalApiKeys.length; i++) pendo.additionalApiKeys[i] = "" + pendo.additionalApiKeys[i];
                        if (TextCapture.initialize(), e.logStackTraces && (pendo.logStackTraces = e.logStackTraces), pendoCore && (pendo.disableGuideCenterContentSearch = e.disableGuideCenterContentSearch, registerEventHandlers(e), stopListenToMaster = listenToMaster(ConfigReader.get("restrictP1Access")), initGuides(), wirePage(), startDebuggingModuleIfEnabled(), launchDesignerOrPreview(e)), ConfigReader.get("preferBroadcastChannel") && SingletonMessageHandler.secure(), shouldPersist() || removeIdentificationCookies(), e.usePendoAgentAPI !== !0 && pendo.updateOptions(e), e.visitorId && e.visitorId != DEFAULT_VISITOR_ID) pendo.identify(e.visitorId);
                        else if (e.visitor && e.visitor.id && e.visitor.id != DEFAULT_VISITOR_ID) {
                            var r = null;
                            e.account && e.account.id && (r = e.account.id), pendo.identify(e.visitor.id, r)
                        }
                        pendo.url.watch(pendo.pageLoad), pageLoad(pendo.url.get()), localStorageNavigation(e), pendoCore && pendo.events.ready();
                        var o = pendo.get_visitor_id();
                        if (shouldInitializeFeedback(o)) {
                            var a = getPendoConfigValue("feedbackSettings");
                            pendo.feedback.init(getOptionsCopy(), a)["catch"](_.noop)
                        }
                        initializeCounter++, announceFrameToDesignerPlugin()
                    }),
                    isReady = function () {
                        return pendo.doesExist(pendo.apiKey)
                    },
                    getOption = function (e, t) {
                        return get(originalOptions, e, t)
                    },
                    updatedOptions = null,
                    setUpdatedOptions = function (e) {
                        updatedOptions = JSON.parse(JSON.stringify(e || {}))
                    },
                    getOptionsCopy = function () {
                        return JSON.parse(JSON.stringify(updatedOptions || originalOptions || {}))
                    },
                    jwtInfo = null,
                    setJwtInfo = function (e) {
                        jwtInfo = JSON.parse(JSON.stringify(e || {}))
                    },
                    getJwtInfoCopy = function () {
                        return null !== jwtInfo ? jwtInfo : {}
                    };
                pendo.getFeedbackSettings = function () {
                    return JSON.parse(JSON.stringify(ConfigReader.get("feedbackSettings", {})))
                };
                var HOST = getDataHost(),
                    buildBaseDataUrl = function (e, t, n) {
                        var i = HOST + "/data/" + e + "/" + t,
                            r = _.map(n, function (e, t) {
                                return t + "=" + e
                            });
                        return r.length > 0 && (i += "?" + r.join("&")), i
                    },
                    writeMessage = function (e) {
                        e += "v" + VERSION;
                        var t = buildBaseDataUrl("log.gif", pendo.apiKey, {
                            msg: e,
                            version: VERSION
                        });
                        return writeImgTag(t)
                    },
                    writeException = function (e, t, n) {
                        if (e && (!e || !e.logged)) {
                            var i = store.getters["errorLog/hasLogged"]()(e);
                            if (store.dispatch("errorLog/write", e), !i) {
                                t || (t = "pendo.io unhandled exception");
                                var r = "";
                                n && (r = " " + _.map(n, function (e, t) {
                                    return t + "=" + e
                                }).join(", "));
                                try {
                                    e.logged = !0
                                } catch (o) {}
                                var a = "[" + t + ": " + e.message + r + "]";
                                log(a);
                                var s = window.pendo_options || {};
                                e.stack && pendo.logStackTraces !== !1 && s.logStackTraces !== !1 ? writeErrorPOST(a + "\n" + e.stack) : writeMessage(a)
                            }
                        }
                    };
                fetchKeepalive.supported = function () {
                    return _.isFunction(window.fetch) && "undefined" != typeof Request && "keepalive" in new Request("")
                }, sendBeacon.supported = function () {
                    return "undefined" != typeof Blob && _.isFunction(navigator.sendBeacon)
                };
                var locked = !1,
                    lockEvents = function () {
                        return locked = !0, "Pendo Agent locked.  No more events will be written."
                    },
                    unlockEvents = function () {
                        return buffersClearAll(), locked = !1, "Pendo Agent unlocked.  Events will be written."
                    },
                    isUnlocked = function () {
                        return !locked && pendoCore
                    },
                    eventCache = [],
                    trackEventCache = [],
                    SEND_INTERVAL = 12e4,
                    MAX_NUM_EVENTS = 16,
                    URL_MAX_LENGTH = 2e3,
                    ENCODED_EVENT_MAX_LENGTH = 1900,
                    ENCODED_EVENT_MAX_POST_LENGTH = 65536,
                    limitURLSize = function (e, t) {
                        return t = t || getURL(), t.substring(0, e)
                    },
                    isURLValid = function (e) {
                        return !(!e || "" === e)
                    },
                    getURL = function () {
                        return pendo.url.get()
                    };
                pendo.buffers = {
                    flush: _.noop,
                    flushBy: _.noop,
                    flushEvents: flushNow,
                    flushTrackEvents: flushNow,
                    flushSilos: flushNow,
                    flushTrackEventSilos: flushNow,
                    flushBeacons: flushNow,
                    flushNow: flushNow,
                    flushLater: flushLater,
                    flushEvery: flushEvery,
                    flushStop: flushStop,
                    beacons: [],
                    silos: [],
                    trackEventSilos: []
                };
                var defaultTrackName = "_PENDO_UNNAMED_",
                    SILO_AVG_COMPRESSION_RATIO = 5,
                    SILO_MAX_BYTES = ENCODED_EVENT_MAX_LENGTH * SILO_AVG_COMPRESSION_RATIO,
                    events = pendo.buffers.events = eventCache,
                    trackEvents = pendo.buffers.trackEvents = trackEventCache,
                    eventQueue = createEventQueue({
                        cache: events,
                        silos: pendo.buffers.silos,
                        apiKey: getAllApiKeys,
                        beacon: "ptm",
                        allowPost: !0
                    }),
                    trackEventQueue = createEventQueue({
                        cache: trackEvents,
                        silos: pendo.buffers.trackEventSilos,
                        apiKey: getAllApiKeys,
                        beacon: "ptm",
                        allowPost: !0,
                        params: {
                            type: "track"
                        }
                    }),
                    WHITELIST_FREE_NPS = ["load", "meta", "identify"],
                    GuideActivity = function () {
                        function e(e) {
                            return e && "click" === e.type
                        }

                        function t(e) {
                            return "pendo-base" == e.id ? !0 : g(e.parentElem) ? t(e.parentElem) : !1
                        }

                        function n(e) {
                            return h(e.tag) && "button" == e.tag.toLowerCase() && (/^pendo-button/.test(e.id) || /^pendo-close-guide/.test(e.id))
                        }

                        function i(e) {
                            return !!r(e)
                        }

                        function r(e) {
                            return "A" === e.tag ? {
                                type: e.tag,
                                id: e.id
                            } : "pendo-guide-container" !== e.id && g(e.parentElem) ? r(e.parentElem) : null
                        }

                        function o(r, o) {
                            return g(r) && t(r) && e(o) && (n(r) || i(r))
                        }

                        function a(e) {
                            var t = e.guide.activeModule;
                            return t && t.attributes && t.attributes.resourceCenter && "AnnouncementsModule" === t.attributes.resourceCenter.moduleId
                        }

                        function s(e) {
                            var t = pendo.dom("#" + e).closest("[data-pendo-announcement-guide-id]"),
                                n = t.attr("data-pendo-announcement-guide-id"),
                                i = _.find(pendo.guides, function (e) {
                                    return e.id === n
                                });
                            return i ? {
                                guide: i,
                                step: i.steps[0]
                            } : undefined
                        }

                        function d(e, t) {
                            if (t.props && t.props.id && t.props.id === e) return t;
                            if (t.children !== undefined)
                                for (var n = 0; n < t.children.length; n++) {
                                    var i = d(e, t.children[n]);
                                    if (i !== undefined) return i
                                }
                            return undefined
                        }

                        function u(e) {
                            if (e !== undefined) {
                                if ("a" === e.type) return [{
                                    action: "openLink",
                                    url: sanitizeUrl(e.props.href),
                                    target: e.props.target
                                }];
                                if (e.actions !== undefined) return _.map(e.actions, function (e) {
                                    switch (e.action) {
                                    case "openLink":
                                        var t = m(e.parameters, {
                                                name: "url"
                                            }),
                                            n = m(e.parameters, {
                                                name: "target"
                                            });
                                        return {
                                            action: e.action, url: sanitizeUrl(t.value), target: n.value
                                        };
                                    case "submitPollAndGoToStep":
                                    case "goToStep":
                                        var i = m(e.parameters, {
                                            name: "goToStepId"
                                        });
                                        return {
                                            action: e.action, guideStepId: i.value
                                        };
                                    case "guideSnoozed":
                                        var r = m(e.parameters, {
                                                name: "snooze_duration"
                                            }),
                                            o = m(e.parameters, {
                                                name: "time_unit"
                                            });
                                        return {
                                            action: e.action, duration: r.value, timeUnit: o.value
                                        };
                                    case "showGuide":
                                    case "launchGuide":
                                        var a = e.parameters[0];
                                        return {
                                            action: e.action, guideId: a.value
                                        };
                                    case "advanceGuide":
                                    case "previousStep":
                                    case "submitPoll":
                                    case "dismissGuide":
                                        return {
                                            action: e.action
                                        };
                                    default:
                                        return {}
                                    }
                                })
                            }
                            return []
                        }

                        function l(e) {
                            var t = getActiveGuide();
                            if (t && (!a(t) || (t = s(e.id)))) {
                                var n = d(e.id, t.step.domJson);
                                if (n) {
                                    var i = TextCapture.isEnabled() ? {
                                            ui_element_text: n && n.content
                                        } : {},
                                        o = u(n),
                                        l = r(e) || {
                                            type: e.tag,
                                            id: e.id
                                        };
                                    return createGuideEvent(f(i, {
                                        type: c,
                                        visitorId: v(),
                                        ui_element_id: l.id,
                                        ui_element_type: l.type,
                                        ui_element_actions: o,
                                        guideId: t.guide.id,
                                        stepId: t.step.id,
                                        duration: p(),
                                        language: t.guide.language
                                    }))
                                }
                            }
                        }
                        var c = "guideActivity",
                            p = function () {
                                return (new Date).getTime() - seenTime
                            },
                            f = _.extend,
                            g = _.isObject,
                            h = _.isString,
                            m = _.findWhere,
                            v = pendo.get_visitor_id;
                        return {
                            type: c,
                            handler: function (e) {
                                var t = e.data[0],
                                    n = e.data[1];
                                if (o(t, n)) {
                                    var i = l(t);
                                    i && stageGuideEvent(i)
                                }
                            }
                        }
                    }();
                Events.appUsage.on(GuideActivity.handler);
                var MAX_ATTRIBUTE_LENGTH = 256,
                    MAX_ATTRIBUTES = 64,
                    evt_map = {
                        a: {
                            events: ["click"],
                            attr: ["href"]
                        },
                        button: {
                            events: ["click"],
                            attr: ["value", "name"]
                        },
                        img: {
                            events: ["click"],
                            attr: ["src", "alt"]
                        },
                        select: {
                            events: ["mouseup"],
                            attr: ["name", "type", "selectedIndex"]
                        },
                        textarea: {
                            events: ["mouseup"],
                            attr: ["name"]
                        },
                        'input[type="submit"]': {
                            events: ["click"],
                            attr: ["name", "type", "value"]
                        },
                        'input[type="button"]': {
                            events: ["click"],
                            attr: ["name", "type", "value"]
                        },
                        'input[type="radio"]': {
                            events: ["click"],
                            attr: ["name", "type"]
                        },
                        'input[type="checkbox"]': {
                            events: ["click"],
                            attr: ["name", "type"]
                        },
                        'input[type="password"]': {
                            events: ["click"],
                            attr: ["name", "type"]
                        },
                        'input[type="text"]': {
                            events: ["click"],
                            attr: ["name", "type"]
                        }
                    },
                    handleEmbeddedData = function (e) {
                        return e && 0 === e.indexOf("data:") ? (debug("Embedded data provided in URI."), e.substring(0, e.indexOf(","))) : e + ""
                    },
                    extractAttribute = function (e, t, n) {
                        if (!e || !e.nodeName) return null;
                        var i = e.nodeName.toLowerCase();
                        if ("img" == i && "src" == t || "a" == i && "href" == t) {
                            var r = e.getAttribute(t);
                            return sanitizeUrl(handleEmbeddedData(r))
                        }
                        var o = getAttributeValue(e, t);
                        return n && typeof o !== n ? null : o ? _.isString(o) ? trim.call(o).substring(0, MAX_ATTRIBUTE_LENGTH) : o : null
                    },
                    asString = function (e) {
                        return pendo.doesExist(e) ? "" + e : ""
                    },
                    nodeTypeEnum = {
                        TEXT_ELEMENT: 3,
                        ELEMENT_NODE: 1,
                        DOCUMENT_NODE: 9,
                        DOCUMENT_FRAGMENT_NODE: 11,
                        CDATA_SECTION_NODE: 4
                    },
                    extractElementContext = function (e) {
                        var t = {};
                        if (!e) return t;
                        var n = getHtmlAttributeTester(ConfigReader.get("htmlAttributes")),
                            i = getHtmlAttributeTester(ConfigReader.get("htmlAttributeBlacklist"));
                        t.tag = shadowAPI.isElementShadowRoot(e) ? "#shadow-root" : e.nodeName || "", t.id = asString(e.id), t.cls = asString(dom.getClass(e)), i("title") || (t.title = extractAttribute(e, "title", "string"));
                        var r = (t.tag || "").toLowerCase();
                        "input" === r && (r += '[type="' + e.type + '"]'), t.attrs = {};
                        var o = filterAttributeList(e.attributes, evt_map[r] && evt_map[r].attr, n, i);
                        if (_.each(o, function (n) {
                                t.attrs[n.toLowerCase()] = extractAttribute(e, n)
                            }), e.parentNode && e.parentNode.childNodes) {
                            var a = _.chain(e.parentNode.childNodes);
                            t.myIndex = a.indexOf(e).value(), t.childIndex = a.filter(function (e) {
                                return e.nodeType == nodeTypeEnum.ELEMENT_NODE
                            }).indexOf(e).value()
                        }
                        return t
                    },
                    isNodeTheRoot = function (e) {
                        return "BODY" === e.nodeName || null === e.parentNode && !shadowAPI.isElementShadowRoot(e)
                    },
                    PENDO_IGNORE_CLASS = "pendo-ignore",
                    extractElementTreeContext = function (e) {
                        var t, n = {},
                            i = n,
                            r = e,
                            o = !1;
                        if (!e) return n;
                        do {
                            t = r;
                            var a = extractElementContext(t);
                            !o && strContains(a.cls, PENDO_IGNORE_CLASS) && (o = !0), i.parentElem = a, i = a, r = shadowAPI.getParent(t)
                        } while (r && !isNodeTheRoot(t));
                        if (TextCapture.isEnabled() || !TextCapture.isEnabled() && TextCapture.hasWhitelist()) {
                            var s = TextCapture.getText(e, 128);
                            TextCapture.isTextCapturable(s) && (n.parentElem.txt = TextCapture.hasWhitelist() ? trim.call(s) : s)
                        }
                        return !TextCapture.isEnabled() && n.parentElem.value && (n.parentElem.value = null), o && (n.parentElem.ignore = !0), n.parentElem
                    },
                    buttonNumMap = ["", "left", "right", "middle"],
                    buttonLookup = function (e, t) {
                        return buttonNumMap[t]
                    },
                    retTrue = function () {
                        return !0
                    },
                    getButtonType = function (e) {
                        return e.which || e.button
                    },
                    identity = function (e) {
                        return e
                    },
                    propGet = function (e, t) {
                        return e[t]
                    },
                    COMMON_CLICK_ATTRS = [
                        ["button", getButtonType, retTrue, buttonLookup],
                        ["altKey", propGet, identity, identity],
                        ["ctrlKey", propGet, identity, identity],
                        ["metaKey", propGet, identity, identity],
                        ["shiftKey", propGet, identity, identity]
                    ],
                    determineClickFlags = function (e, t) {
                        for (var n = [], i = 0; i < COMMON_CLICK_ATTRS.length; i++) {
                            var r = COMMON_CLICK_ATTRS[i],
                                o = r[0],
                                a = r[1],
                                s = r[2],
                                d = r[3],
                                u = a(e, o);
                            s(u) && n.push(d(o, u))
                        }
                        return t.flags = n, t
                    },
                    evtHandlerExtFn = {
                        click: determineClickFlags
                    },
                    getTarget = function (e) {
                        var t = shadowAPI.getComposedPath(e);
                        return t && t.length > 0 ? t[0] : e.target || e.srcElement
                    },
                    getValidTarget = function (e) {
                        return e.nodeType === nodeTypeEnum.TEXT_ELEMENT ? e.parentNode : e.nodeType === nodeTypeEnum.CDATA_SECTION_NODE ? null : e.correspondingUseElement ? e.correspondingUseElement : e
                    },
                    handle_event = function (e) {
                        try {
                            if (dom.data.get(e, "counted")) return;
                            dom.data.set(e, "counted", !0);
                            var t = getTarget(e),
                                n = e.type,
                                i = {},
                                r = evtHandlerExtFn[n];
                            if (r && (i = r(e, i)), dom.data.get(e, "stopped") && (i.stopped = !0), e.from && (i.from = e.from), t = getValidTarget(t), !t) return void log("Invalid HTML target", "event", "dom", "processing");
                            var o = extractElementTreeContext(t);
                            if (_.extend(o, i), pageLoad(), o.ignore) return;
                            if ("click" === n) {
                                var a = collectEventProperties(t);
                                collectEvent(n, {
                                    target: o
                                }, undefined, undefined, a)
                            } else collectEvent(n, {
                                target: o
                            });
                            Events.trigger("appUsage", o, e)
                        } catch (s) {
                            writeException(s, "pendo.io while handling event")
                        }
                    },
                    collectEventProperties = makeSafe(collectEventPropertiesForTarget),
                    listenForEvents = function (e) {
                        _.each(e, function (e) {
                            attachEvent(document, e, handle_event, !0)
                        })
                    },
                    DEBOUNCE_INTERVAL_CHANGE = 5e3,
                    handle_change_event = _.debounce(handle_event, DEBOUNCE_INTERVAL_CHANGE, !0),
                    wirePage = function (e) {
                        e = e || ["click", "focus", "submit", "change"], _.contains(e, "change") && (e = _.without(e, "change"), attachEventInternal(document, "change", handle_change_event, !0)), wireSyntheticClicks(dom.event.trigger, pendo.sniffer.addEventListener), listenForEvents(e), getPendoConfigValue("xhrTimings") && openXhrIntercept(), ConfigReader.get("preventUnloadListener") !== !0 && attachEventInternal(window, "unload", function () {
                            flushNow(!0, {
                                guaranteed: !0
                            }), Events.appUnloaded.trigger(), EventErrorLogger.flush()
                        }), wireTurbolinks(), interceptStopPropagation(window.Event, e)
                    },
                    wireTurbolinks = function () {
                        if ("undefined" != typeof Turbolinks) {
                            var e = Turbolinks && Turbolinks.EVENTS && Turbolinks.EVENTS.LOAD;
                            e && attachEventInternal(document, e, function () {
                                pendo.url.get() === reloadGuides.lastUrl && (delete reloadGuides.lastUrl, queueGuideReload())
                            })
                        }
                    },
                    stopEvent = function (e) {
                        dom.data.set(e, "pendoStopped", !0), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1
                    },
                    getDefaultLogOverride = function (e) {
                        var t = agentStorage.read("log-enabled", !0);
                        return null !== t ? "true" == t : !_.contains(["prod", "prod-eu", "prod-us1", "rc"], e)
                    },
                    getDefaultActiveContexts = function () {
                        var e = agentStorage.read("active-contexts", !0);
                        return e ? e.split(",") : []
                    },
                    enableLogging = function () {
                        return canWeLog() ? logOverride ? "logging already enabled" : (agentStorage.write("log-enabled", "true", null, !0), logOverride = !0, "logging enabled") : "logging unavailable"
                    },
                    disableLogging = function () {
                        return logOverride ? (agentStorage.write("log-enabled", "false", null, !0), logOverride = !1, "logging disabled") : "logging already disabled"
                    },
                    activeContexts = getDefaultActiveContexts(),
                    logOverride = getDefaultLogOverride(ENV),
                    createContexts = function (e, t) {
                        return _.compact([].concat(e, t))
                    },
                    canWeLog = function (e) {
                        return e = e || "log", "undefined" != typeof console && _.isFunction(console[e])
                    },
                    shouldWeLog = function (e) {
                        return e = createContexts(e), activeContexts.length > 0 ? _.intersection(activeContexts, e).length > 0 : !!logOverride || !!isDebuggingEnabled(!0)
                    },
                    log = function (e, t) {
                        t = createContexts(t, _.tail(arguments, 2)), canWeLog() && (shouldWeLog(t) && doConsoleLog(e), addToLogHistory(e, t))
                    },
                    MAX_HISTORY = 100,
                    logHistory = [],
                    addToLogHistory = function (e, t) {
                        _.contains(t, "debug") || (logHistory.length == MAX_HISTORY && logHistory.shift(), logHistory.push([e, t]))
                    },
                    showLogHistory = function (e) {
                        e = createContexts(e), _.each(_.map(_.filter(logHistory, function (t) {
                            return 0 === e.length || _.intersection(e, t[1]).length > 0
                        }), function (e) {
                            return e[0]
                        }), function (e) {
                            doConsoleLog(e, "[Pendo-History] ")
                        })
                    },
                    getLoggedContexts = function () {
                        return _.union.apply(_, _.map(logHistory, function (e) {
                            return e[1]
                        }))
                    },
                    getActiveContexts = function () {
                        return activeContexts
                    },
                    setActiveContexts = function (e) {
                        activeContexts = createContexts(e), agentStorage.write("active-contexts", activeContexts.join(","), null, !0)
                    },
                    doConsoleLog = function (e, t) {
                        if (canWeLog())
                            if (t = t || "[Agent] ", e && e.length) {
                                var n = e.length > 1e3 ? e.length - 1e3 : 0;
                                n && (t += "..."), console.log(t + e.substring(n))
                            } else console.log(t + e)
                    };
                log.enableLogging = enableLogging, log.disableLogging = disableLogging, log.getActiveContexts = getActiveContexts, log.setActiveContexts = setActiveContexts, log.showLogHistory = showLogHistory, log.getLoggedContexts = getLoggedContexts;
                var isOldIE = function (e, t) {
                        return e = e || 10, t = isNaN(trident) ? !1 : t ? t > trident : !0, t && e > msie
                    },
                    msie, trident, lowercase = function (e) {
                        return isString(e) ? e.toLowerCase() : e
                    },
                    determineMSIE = function (e) {
                        var t = pint((/msie (\d+)/.exec(lowercase(e)) || [])[1]);
                        return isNaN(t) && (t = pint((/trident\/.*; rv:(\d+)/.exec(lowercase(e)) || [])[1])), t
                    };
                msie = determineMSIE(navigator.userAgent);
                var determineTrident = function (e, t) {
                    var n = pint((/trident\/(\d+)/.exec(lowercase(e)) || [])[1]);
                    return isNaN(n) && 7 == t && (n = 3), n
                };
                trident = determineTrident(navigator.userAgent, msie);
                var eventSupport = {},
                    android = pint((/android (\d+)/.exec(lowercase((window.navigator || {}).userAgent)) || [])[1]),
                    boxee = /Boxee/i.test((window.navigator || {}).userAgent),
                    pdocument = window.document || {},
                    documentMode = pdocument.documentMode,
                    vendorPrefix, vendorRegex = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                    bodyStyle = pdocument.body && pdocument.body.style,
                    transitions = !1,
                    animations = !1,
                    match;
                if (bodyStyle) {
                    for (var prop in bodyStyle)
                        if (match = vendorRegex.exec(prop)) {
                            vendorPrefix = match[0], vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
                            break
                        } vendorPrefix || (vendorPrefix = "WebkitOpacity" in bodyStyle && "webkit"), transitions = !!("transition" in bodyStyle || vendorPrefix + "Transition" in bodyStyle), animations = !!("animation" in bodyStyle || vendorPrefix + "Animation" in bodyStyle), !android || transitions && animations || (transitions = isString(pdocument.body.style.webkitTransition), animations = isString(pdocument.body.style.webkitAnimation))
                }
                pendo._.extend(pendo, {
                    sniffer: {
                        history: !(!(window.history && isNativeCode(window.history.pushState) && isNativeCode(window.history.replaceState)) || 4 > android || boxee),
                        hashchange: "onhashchange" in window && (!documentMode || documentMode > 7),
                        hasEvent: function (e) {
                            if ("input" == e && 9 == msie) return !1;
                            if (isUndefined(eventSupport[e])) {
                                var t = pdocument.createElement("div");
                                eventSupport[e] = "on" + e in t
                            }
                            return eventSupport[e]
                        },
                        vendorPrefix: vendorPrefix,
                        transitions: transitions,
                        animations: animations,
                        android: android,
                        msie: msie,
                        msieDocumentMode: documentMode,
                        sri: "integrity" in document.createElement("script"),
                        addEventListener: _.isFunction(window.addEventListener),
                        MutationObserver: isNativeCode(window.MutationObserver)
                    }
                });
                var pSetTimeout = window.setTimeout,
                    decodeURIComponent = _.isFunction(window.decodeURIComponent) ? window.decodeURIComponent : _.identity,
                    encodeURIComponent = _.isFunction(window.encodeURIComponent) ? window.encodeURIComponent : _.identity,
                    isElectron = function () {
                        return window && window.process && window.process.versions && window.process.versions.electron
                    },
                    electronResourcesPath = function () {
                        return window.process.resourcesPath || ""
                    },
                    electronUserDirectory = function () {
                        return window.process.env.PWD || ""
                    },
                    electronUserHomeDirectory = function () {
                        return window.process.env.HOME || ""
                    },
                    electronAppName = function () {
                        return window.process.env.npm_package_name || ""
                    },
                    useLegacyGetHref = function () {
                        return ConfigReader.get("annotateUrl") || shouldIgnoreHashRouting() || ConfigReader.get("sanitizeUrl") || ConfigReader.get(URL_WHITELIST_KEY) || ConfigReader.get("xhrWhitelist") || isElectron()
                    },
                    getWindowLocation = function () {
                        return shouldIgnoreHashRouting() ? {
                            href: getHrefWithoutHash(location.href),
                            origin: location.origin
                        } : store.getters["location/url"]()
                    },
                    getHref = function () {
                        if (useLegacyGetHref()) {
                            var e = pendo.url.getWindowLocation();
                            if (isElectron()) {
                                var t = pendo.url.electronResourcesPath(),
                                    n = pendo.url.electronUserDirectory(),
                                    i = pendo.url.electronAppName(),
                                    r = "https://" + e.href.replace(t, i);
                                return r = r.replace(e.origin + n, i), r = r.replace(pendo.url.electronUserHomeDirectory(), ""), r = r.replace("file:///", "")
                            }
                            return annotateUrl(e.href)
                        }
                        return store.getters["location/href"]()
                    },
                    getHrefWithoutHash = function (e) {
                        return e.match(/(.+?)(?:#|$)/)[1]
                    },
                    shouldIgnoreHashRouting = function () {
                        return ConfigReader.get("ignoreHashRouting") === !0
                    },
                    pollFns = [],
                    pollTimeout, addPollFn = function (e) {
                        return isUndefined(pollTimeout) && startPoller(100, pSetTimeout), pollFns.push(e), e
                    },
                    url = function (e) {
                        var t;
                        try {
                            t = getHref()
                        } catch (n) {}
                        return t
                    },
                    urlChangeListeners = [],
                    urlChangeInit = !1,
                    lastBrowserUrl = null,
                    onUrlChange = function (e) {
                        if (log("Initializing Pendo URL Watcher"), !urlChangeInit) {
                            var t = pendo.sniffer;
                            if (t.history) {
                                var n = window.history;
                                _.each(["pushState", "replaceState"], function (e) {
                                    n[e] = _.wrap(n[e], function (e) {
                                        var t = e.apply(n, _.toArray(arguments).slice(1));
                                        return getZoneSafeMethod("setTimeout")(fireUrlChange, 0), t
                                    })
                                }), attachEventInternal(window, "popstate", fireUrlChange)
                            }
                            t.hashchange && attachEventInternal(window, "hashchange", fireUrlChange), t.history && t.hashchange || addPollFn(fireUrlChange), urlChangeInit = !0
                        }
                        return urlChangeListeners.push(e), e
                    },
                    clearList = function () {
                        urlChangeListeners = []
                    },
                    getProtocol = function () {
                        return "https:"
                    },
                    URL_WHITELIST_KEY = "queryStringWhitelist",
                    externalizeURL = function (e, t, n) {
                        var i = n || ConfigReader.get(URL_WHITELIST_KEY);
                        _.isFunction(i) && (i = i());
                        var r = adjustUrl(e, t, i, !1);
                        return r = sanitizeUrl(r)
                    },
                    adjustQueryStringParams = function (e, t, n) {
                        if (n && _.contains(t, "*")) return "";
                        var i = queryStringToObject(e);
                        return i = n ? _.omit(i, t) : _.pick(i, t), objectToQueryString(i)
                    },
                    queryStringToObject = function (e) {
                        var t = e.split("&");
                        return _.reduce(t, function (e, t) {
                            return t = t.split("="), e[t[0]] = t[1], e
                        }, {})
                    },
                    objectToQueryString = function (e) {
                        return _.reduce(e, function (e, t, n) {
                            var i = n;
                            return t && (i += "=" + t), e && (e += "&"), e + i
                        }, "")
                    };
                pendo._.extend(pendo, {
                    url: {
                        watch: onUrlChange,
                        get: url,
                        externalizeURL: externalizeURL,
                        getWindowLocation: getWindowLocation,
                        clear: clearList,
                        isElectron: isElectron,
                        electronUserDirectory: electronUserDirectory,
                        electronAppName: electronAppName,
                        electronUserHomeDirectory: electronUserHomeDirectory,
                        electronResourcesPath: electronResourcesPath
                    }
                });
                var lastSavedOptions = null,
                    metadataHash, getLocale = function () {
                        var e = window.navigator;
                        return ((pendo._.isArray(e.languages) ? e.languages[0] : e.language || e.browserLanguage || e.systemLanguage || e.userLanguage) || "").split("-").join("_")
                    },
                    OPTIONS_HASH_KEY_NAME = "meta",
                    haveOptionsChanged = function (e) {
                        "object" == typeof e && (e = crc32(e)), "undefined" != typeof e && e.toString && (e = e.toString());
                        var t = _.isNumber(metadataHash) ? metadataHash : agentStorage.read(OPTIONS_HASH_KEY_NAME);
                        return "" + t !== e ? !0 : !1
                    },
                    isScalar = function (e) {
                        return _.any(["Number", "Boolean", "Date", "String", "Null", "NaN", "Undefined"], function (t) {
                            return _["is" + t](e)
                        })
                    },
                    cleanupMetadata = function (e) {
                        var t = {};
                        return _.each(e, function (e, n) {
                            isScalar(e) ? t[n] = e : _.isArray(e) && (t[n] = _.filter(e, isScalar))
                        }), t
                    },
                    prepareOptions = function (e) {
                        return _.isObject(e) || (e = {}), _.isObject(e.visitor) || (e.visitor = {}), _.isObject(e.account) || (e.account = {}), _.isObject(e.parentAccount) || (e.parentAccount = {}), e.visitor.id === DEFAULT_VISITOR_ID && (pendo.log("Missing visitor id."), delete e.visitor.id), isValidId(e.account.id) && isValidId(e.parentAccount.id) && (isSubaccount(e.account.id) ? e.parentAccount.id = e.account.id.split(SUBACCOUNT_DELIMITER)[0] : e.account.id = "" + e.parentAccount.id + SUBACCOUNT_DELIMITER + e.account.id), isValidId(e.account.id) && (pendo.set_account_id(e.account.id), e.account.id = pendo.get_account_id()), isValidId(e.visitor.id) && pendo.identify(e.visitor.id, e.account.id), e.visitor.id = pendo.get_visitor_id(), e.visitor.language = getLocale(), {
                            visitor: e.visitor,
                            account: cleanupMetadata(e.account),
                            parentAccount: e.parentAccount,
                            date: getDateForOptions(),
                            version: pendo.VERSION
                        }
                    },
                    getDateForOptions = function () {
                        var e = new Date,
                            t = e.getDate(),
                            n = e.getMonth() + 1,
                            i = e.getFullYear();
                        return 10 > t && (t = "0" + t), 10 > n && (n = "0" + n), e = t + "/" + n + "/" + i
                    },
                    validateOptions = function (e) {
                        return e && pendo._.keys(e).length > 0
                    },
                    updateOptions = makeSafe(function (e) {
                        if (validateOptions(e)) {
                            if (e.jwt && e.signingKeyName) {
                                var t = JWT.getJwtOptions(e, "updateOptions");
                                t && (setJwtInfo(_.pick(e, "jwt", "signingKeyName")), e = t)
                            }
                            e = prepareOptions(e), setUpdatedOptions(e), getMetadata = function () {
                                return e
                            }, pendo.getSerializedMetadata = function () {
                                return JSON.parse(JSON.stringify(e))
                            };
                            var n = crc32(e),
                                i = isMetadataBlocked();
                            haveOptionsChanged(n) && !i && (agentStorage.write(OPTIONS_HASH_KEY_NAME, n), lastSavedOptions = e, metadataHash = n, collectEvent("meta", e), flushLater(), queueGuideReload(), Events.metadata.trigger())
                        }
                    }),
                    isMetadataBlocked = function () {
                        var e = getPendoConfigValue("blockAgentMetadata");
                        return e !== undefined ? e : !1
                    },
                    getMetadata = _.noop;
                pendo.loadResource = function (e, t) {
                    try {
                        var n, i = "text/css",
                            r = "text/javascript";
                        _.isString(e) && (e = {
                            url: e
                        }), e.type = e.type || /\.css/.test(e.url) ? i : r;
                        var o = null,
                            a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0];
                        if (e.type === i) {
                            var s = document.createElement("link");
                            s.type = i, s.rel = "stylesheet", s.href = e.url, ContentVerifier.addIntegrityAttribute(s, e.url), o = s
                        } else {
                            if (isSfdcLightning()) return n = document.createElement("script"), n.addEventListener("load", function () {
                                t(), removeNode(n)
                            }), n.type = r, n.src = e.url, ContentVerifier.addIntegrityAttribute(n, e.url), document.body.appendChild(n), {};
                            n = document.createElement("script"), n.type = r, n.async = !0, n.src = e.url, ContentVerifier.addIntegrityAttribute(n, e.url), o = n, t = _.wrap(t, function (e) {
                                dom.removeNode(n), e.apply(this, _.toArray(arguments).slice(1))
                            })
                        }
                        return a.appendChild(o), pendo.loadWatcher(o, e.url, t), o
                    } catch (d) {
                        return {}
                    }
                }, pendo.loadWatcher = function (e, t, n) {
                    var i = !1;
                    if (pendo.doesExist(n) && (e.onload = function () {
                            i !== !0 && (i = !0, n(null, t))
                        }, e.onerror = function () {
                            pendo.tellMaster({
                                status: "error",
                                msg: "Failed to load script",
                                scriptURL: t
                            })
                        }, e.onreadystatechange = function () {
                            i || e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (i = !0, n(null, t))
                        }, "link" === e.tagName.toLowerCase())) {
                        var r = 500;
                        setTimeout(function () {
                            if (!i) {
                                var e = new Image;
                                e.onload = e.onerror = function () {
                                    i !== !0 && (i = !0, n(null, t))
                                }, e.src = t
                            }
                        }, r), setTimeout(function () {
                            i || writeMessage("Failed to load " + t + " within 10 seconds")
                        }, 1e4)
                    }
                }, pendo.messageLogger = function (e) {
                    var t = JSON.parse(e.data),
                        n = e.origin;
                    debug(pendo.app_name + ": Message: " + JSON.stringify(t) + " from " + n), pendo.tellMaster(e.source, {
                        status: "success",
                        msg: "ack",
                        originator: "messageLogger"
                    }, n)
                }, pendo.messageReceiver = function (e) {
                    try {
                        pendo.messageDispatcher(pendo.messageOriginTester(pendo.messageValidator(e)))
                    } catch (t) {}
                }, pendo.messageValidator = function (e) {
                    var t = "string" == typeof e.data ? e.data : JSON.stringify(e.data),
                        n = e.origin,
                        i = e.source;
                    if (t = JSON.parse(t), t.action) throw new Error("ignore");
                    if (!t.type || "string" != typeof t.type) throw new Error("Invalid Message: Missing 'type' in data format");
                    return {
                        data: t,
                        origin: n,
                        source: i
                    }
                };
                var trustedOrigin = getTrustedOriginPattern([HOST, "https://demo.pendo-dev.com", SERVER, "https://([a-zA-Z0-9-]+-dot-)?pendo-(dev|test|io|" + ENV + ").appspot.com"], ConfigReader.get("requireHTTPS"));
                pendo.messageOriginTester = function (e) {
                    if (trustedOrigin.test(e.origin)) return e;
                    throw new Error("Received message from untrusted origin " + e.origin)
                };
                var designerWindow;
                pendo.onConnectMessage = function (e, t) {
                    isUnlocked() && (stopGuides(), lockEvents(), pendo.designerv2.hostConfig || store.dispatch("frames/leave"), designerWindow = t.source, ConfigReader.get("preventUnloadListener") !== !0 && (window.onbeforeunload = function () {
                        unlockEvents(), removeDesignerFunctionality(), pendo.tellMaster(t.source, {
                            type: "unload"
                        }, "*")
                    }), _.isFunction(detachGuideEventHandlers) && detachGuideEventHandlers(), addDesignerFunctionality(), pendo.tellMaster(t.source, {
                        status: "success",
                        type: "connect"
                    }, "*"), pendo.findModuleByName("selection.js") && (pendo.log("Designer Modules already loaded."), pendo.tellMaster({
                        type: "ready"
                    })))
                };
                var onModuleMessage = function (e) {
                        pendo.moduleLoader(e.moduleURL)
                    },
                    onEnableDebug = function (e) {
                        addSafeWindowMessageListener(pendo.messageLogger)
                    };
                pendo.MESSAGE_TYPES = {
                    connect: pendo.onConnectMessage,
                    disconnect: function (e) {},
                    module: onModuleMessage,
                    debug: onEnableDebug
                };
                var registerMessageHandler = function (e, t) {
                    pendo.tellMaster({
                        type: "msg-type-available",
                        "msg-type": e
                    }), pendo.MESSAGE_TYPES[e] = t
                };
                pendo.messageDispatcher = function (e) {
                    var t = e.data;
                    pendo.doesExist(pendo.MESSAGE_TYPES[t.type]) && pendo.MESSAGE_TYPES[t.type](t, e)
                }, pendo.moduleRegistry = {}, pendo.addModule = function (e) {
                    if (pendo.moduleRegistry[e] = {}, "undefined" != typeof CKEDITOR) try {
                        CKEDITOR.config.customConfig = ""
                    } catch (t) {}
                }, pendo.hasModule = function (e) {
                    return pendo.doesExist(pendo.moduleRegistry[e])
                }, pendo.findModuleByName = function (e) {
                    if (!pendo.moduleRegistry) return null;
                    var t = function (e, t) {
                        return e.indexOf(t) >= 0
                    };
                    for (var n in pendo.moduleRegistry)
                        if (t(n, e)) return n;
                    return null
                }, pendo.modulesWaiting = [], pendo.loadModules = function () {
                    if (!(pendo.modulesWaiting.length < 1)) {
                        var e = pendo.modulesWaiting.shift();
                        pendo.hasModule(e) || pendo.loadResource(e, function () {
                            pendo.addModule(e), pendo.loadModules()
                        })
                    }
                }, pendo.moduleLoader = function (e) {
                    e = ensureHttps(e), validateModuleURL(e) && (pendo.modulesWaiting.push(e), pendo.modulesWaiting.length > 1 || pendo.loadModules())
                };
                var tellMaster = function (e, t, n) {
                        var i = _.uniqueId("pendo-");
                        try {
                            if ("undefined" == typeof t && "undefined" == typeof n && (t = e, e = designerWindow || getDesignerWindow(), n = "*"), t.guid = i, e && _.isFunction(e.postMessage)) {
                                var r = JSON.stringify(t);
                                e.postMessage(r, n)
                            }
                        } catch (o) {
                            var a = o && o.message || "";
                            log("Failed to postMessage: " + a)
                        }
                        return i
                    },
                    detectMaster = function () {
                        return window != window.top
                    },
                    getDesignerWindow = function () {
                        var e = new RegExp("^" + HOST.replace(/^https?:/, "https?:"));
                        return e.test(location.href) ? window.parent : window.top
                    },
                    announceAgentLoaded = function () {
                        if (detectMaster()) {
                            var e = getDesignerWindow();
                            pendo.tellMaster(e, {
                                type: "load",
                                url: location.toString()
                            }, "*")
                        }
                    },
                    listenToMaster = function (e) {
                        pendo.app_name = document.title, detectMaster() && (pendo.log(pendo.app_name + ": listening to messages"), !e && pendo.doesExist(window.addEventListener) && window.addEventListener("message", pendo.messageReceiver, !1));
                        var t, n;
                        return window.opener && pendo.doesExist(window.addEventListener) && _.isFunction(window.opener.postMessage) && (t = addSafeWindowMessageListener(launchPreviewListener), n = addSafeWindowMessageListener(launchDesignerListener), window.opener.postMessage({
                                type: "pendo::ready"
                            }, "*")),
                            function () {
                                pendo.doesExist(window.removeEventListener) && window.removeEventListener("message", pendo.messageReceiver, !1), _.isFunction(t) && t(), _.isFunction(n) && n()
                            }
                    },
                    addSafeWindowMessageListener = function (e) {
                        var t;
                        return pendo.doesExist(window.addEventListener) && _.isFunction(window.addEventListener) && (t = messageOriginTester2(e), window.addEventListener("message", t, !1)),
                            function () {
                                pendo.doesExist(window.removeEventListener) && _.isFunction(window.removeEventListener) && t && window.removeEventListener("message", t, !1)
                            }
                    },
                    isBrowserInQuirksmode = function () {
                        return isNaN(msie) ? !1 : 11 == msie ? !1 : "CSS1Compat" !== document.compatMode
                    },
                    buildArrowDimensionsQM = function (e, t) {
                        var n = e.height,
                            i = e.width;
                        if ("top" == e.arrowPosition || "bottom" == e.arrowPosition) {
                            var r = 10,
                                o = 0;
                            return "top" == e.arrowPosition ? (e.top = t.top + t.height, o = -1, e.arrow.top = 3, 9 >= msie && (e.arrow.top = 6)) : "bottom" == e.arrowPosition && (e.top = t.top - (n + pendo.TOOLTIP_ARROW_SIZE), e.arrow.top = n - pendo.TOOLTIP_ARROW_SIZE, 10 == msie ? e.arrow.top-- : 9 >= msie && (e.arrow.top += 4), o = 1), "left" == e.arrow.hbias ? (e.left = t.left + t.width / 2 - (r + 2 * pendo.TOOLTIP_ARROW_SIZE), e.arrow.left = r + pendo.TOOLTIP_ARROW_SIZE) : "right" == e.arrow.hbias ? (e.left = t.left - i + t.width / 2 + (r + 2 * pendo.TOOLTIP_ARROW_SIZE), e.arrow.left = i - 3 * pendo.TOOLTIP_ARROW_SIZE - r) : (e.left = t.left + t.width / 2 - i / 2, e.arrow.left = i / 2 - pendo.TOOLTIP_ARROW_SIZE), e.arrow.border.top = e.arrow.top + o, e.arrow.border.left = e.arrow.left, e
                        }
                        return "left" == e.arrow.hbias ? (e.left = t.left + t.width, e.arrow.left = 1, e.arrow.left += 5, e.arrow.border.left = e.arrow.left - 1) : "right" == e.arrow.hbias && (e.left = Math.max(0, t.left - i - pendo.TOOLTIP_ARROW_SIZE), e.arrow.left = i - pendo.TOOLTIP_ARROW_SIZE - 1, e.arrow.left += 5, e.arrow.border.left = e.arrow.left + 1), e.top = t.top + t.height / 2 - n / 2, e.arrow.top = n / 2 - pendo.TOOLTIP_ARROW_SIZE, e.arrow.border.top = e.arrow.top, e
                    },
                    xhrEventCache = [],
                    xhrEventQueue = createXhrEventQueue({
                        cache: xhrEventCache,
                        apiKey: function () {
                            return pendo.apiKey
                        },
                        beacon: "xhr",
                        shorten: {
                            fields: ["request_url", "browser_url"],
                            siloMaxLength: ENCODED_EVENT_MAX_LENGTH
                        }
                    }),
                    openXhrIntercept = function () {
                        attachEventInternal(window, "unload", function () {
                                flushXhrNow({
                                    guaranteed: !0
                                })
                            }),
                            function (e) {
                                XMLHttpRequest.prototype.open = function (t, n, i, r, o) {
                                    var a = {};
                                    this.addEventListener("readystatechange", function () {
                                        var e = arguments[0].target || arguments[0].srcElement || arguments[0].currentTarget;
                                        modifyXhrData(a, this.readyState, n, t, e)
                                    }, !1), e.apply(this, arguments)
                                }
                            }(XMLHttpRequest.prototype.open)
                    },
                    modifyXhrData = function (e, t, n, i, r) {
                        if (1 === t) {
                            var o = pendo.get_visitor_id();
                            e.visitor_id = o;
                            var a = pendo.get_account_id();
                            e.account_id = a, e.browser_url = getScrubbedXhrUrl(pendo.url.getWindowLocation().href), e.browser_time = (new Date).getTime(), e.request_method = i, e.type = "xhr"
                        } else 4 === t && (e.request_url = getScrubbedXhrUrl(r.responseURL), e.response_status = r.status, e.duration = (new Date).getTime() - e.browser_time, xhrEventQueue.push(e))
                    },
                    getScrubbedXhrUrl = function (e) {
                        var t = e ? e.indexOf("?") : -1,
                            n = -1 === t ? "" : e.slice(t + 1, e.length);
                        return externalizeURL(e, n, getPendoConfigValue("xhrWhitelist"))
                    },
                    flushXhrNow = function (e) {
                        try {
                            xhrEventQueue.flush(e)
                        } catch (t) {
                            writeException(t, "error while flushing xhr cache")
                        }
                    },
                    TextCapture = function () {
                        function e() {
                            pendo.excludeAllText = ConfigReader.get(l);
                            var e = ConfigReader.get(u);
                            c = g(e, function (e, t) {
                                return f(t) ? (e[t] = !0, e) : e
                            }, {})
                        }

                        function t() {
                            return !pendo.excludeAllText
                        }

                        function n(e) {
                            var n = trim.call(e);
                            return t() || p(c, n) || p(c, e)
                        }

                        function i() {
                            return h(c) > 0
                        }

                        function r(e, t) {
                            var n, i = "",
                                a = e.nodeType;
                            if (t = t || 128, a === nodeTypeEnum.TEXT_ELEMENT || a === nodeTypeEnum.CDATA_SECTION_NODE) return e.nodeValue;
                            if (!o(e) && (a === nodeTypeEnum.ELEMENT_NODE || a === nodeTypeEnum.DOCUMENT_NODE || a === nodeTypeEnum.DOCUMENT_FRAGMENT_NODE))
                                for (e = e.firstChild; e; e = e.nextSibling) {
                                    if (n = r(e, t - i.length), (i + n).length >= t) return i + d(n.substring(0, t - i.length));
                                    i += n
                                }
                            return i
                        }

                        function o(e) {
                            return !e.tagName || "textarea" == e.tagName.toLowerCase()
                        }

                        function a(e) {
                            return e >= 55296 && 56319 >= e
                        }

                        function s(e) {
                            return e >= 56320 && 57343 >= e
                        }

                        function d(e) {
                            if (e.length < 1) return e;
                            var t = e.slice(-1).charCodeAt(0);
                            if (!a(t) && !s(t)) return e;
                            if (1 === e.length) return e.slice(0, -1);
                            if (a(t)) return e.slice(0, -1);
                            if (s(t)) {
                                var n = e.slice(-2).charCodeAt(0);
                                if (!a(n)) return e.slice(0, -1)
                            }
                            return e
                        }
                        var u = "allowedText",
                            l = "excludeAllText",
                            c = {},
                            p = _.has,
                            f = _.isString,
                            g = _.reduce,
                            h = _.size;
                        return {
                            initialize: e,
                            isEnabled: t,
                            isTextCapturable: n,
                            hasWhitelist: i,
                            getText: r
                        }
                    }(),
                    EventErrorLogger = function () {
                        function e(e) {
                            (getOption("enableDebugEvents") || getPendoConfigValue("enableDebugEvents")) && t(Events.debug, e)
                        }

                        function t(e, t) {
                            s = [], e.on(function (e) {
                                o(e)
                            }), d = setInterval(r, t || 5e3)
                        }

                        function n() {
                            clearInterval(d)
                        }

                        function i() {
                            detachEventInternal(window, "unload", r)
                        }

                        function r() {
                            if (s && 0 !== s.length) {
                                var e = s;
                                s = [], writeErrorPOST("[" + e.join(",") + "]")
                            }
                        }

                        function o(e) {
                            var t = JSON.stringify(e);
                            s.push(t)
                        }

                        function a() {
                            n(), i()
                        }
                        var s, d;
                        return {
                            flush: r,
                            run: e,
                            stop: a
                        }
                    }();
                pendo.validateInstall = function (e) {
                    function t(t, i, r, o) {
                        e ? n.push({
                            type: r,
                            message: i,
                            value: o
                        }) : doesExist(o) ? console[t](i, o) : console[t](i)
                    }
                    var n = [];
                    if ("undefined" == typeof console || !console.group) return "Please run this test in the latest version of Chrome, Firefox, Safari, or Internet Explorer";
                    e || console.group("Pendo Install Validation"), pendo.apiKey || t("error", "No Pendo API key configured.", "apiKey");
                    var i = pendo.get_visitor_id();
                    isAnonymousVisitor(i) && t("warn", 'The current visitor is not identified and will be treated as "anonymous". Is this expected? (You might have used "VISITOR-UNIQUE-ID" as the visitor ID)', "isAnonymousVisitor"), isDefaultVisitor(i) && t("error", "The current visitor ID matches the example visitor ID from the Pendo installation instructions.", "isDefaultVisitor");
                    var r = pendo.get_account_id();
                    r || t("warn", "The current visitor is not associated with an account. Is this expected?", "noVisitorInAccount"), "ACCOUNT-UNIQUE-ID" === r && t("error", "The current account ID matches the example account ID from the Pendo installation instructions.", "exampleAccountId"), isFeedbackOn && Feedback.isUnsupportedIE() && t("warn", "The current version of IE is not supported by Pendo Feedback", "ieFeedbackSupport");
                    var o = getMetadata();
                    return _.each(["visitor", "account", "parentAccount"], function (n) {
                        var i = o && o[n],
                            r = _.chain(i).keys().value();
                        r.length > 0 ? (e || console.group(n + " metadata (does this look right?):"), _.each(i, function (e, i) {
                            _.isObject(e) && !_.isArray(e) ? t("warn", i + " is an object and will be ignored.", n + "Metadata", e) : _.isArray(e) && _.any(e, _.isObject) ? t("warn", i + " contains object values. The objects will be ignored.", n + "Metadata", e) : t("log", i + ":", n + "Metadata", e)
                        }), e || console.groupEnd()) : "parentAccount" !== n && t("warn", "No " + n + " metadata found. Learn more about metadata here: http://help.pendo.io/resources/support-library/installation/metadata.html", n + "MetaData")
                    }), e ? n : void console.groupEnd()
                }, pendo.validateNativeMethods = function (e) {
                    var t = [{
                            nativeType: Object.prototype,
                            displayName: "Object  "
                        }, {
                            nativeType: Number.prototype,
                            displayName: "Number  "
                        }, {
                            nativeType: String.prototype,
                            displayName: "String  "
                        }, {
                            nativeType: Function.prototype,
                            displayName: "Function"
                        }, {
                            nativeType: Boolean.prototype,
                            displayName: "Boolean "
                        }, {
                            nativeType: Array.prototype,
                            displayName: "Array   "
                        }, {
                            nativeType: Date.prototype,
                            displayName: "Date    "
                        }, {
                            nativeType: RegExp.prototype,
                            displayName: "RegExp  "
                        }, {
                            nativeType: JSON,
                            displayName: "JSON    ",
                            propsToCheck: ["parse", "stringify"]
                        }, {
                            nativeType: Math,
                            displayName: "Math    "
                        }, {
                            nativeType: Promise.prototype,
                            displayName: "Promise "
                        }, {
                            nativeType: window,
                            displayName: "Window ",
                            propsToCheck: ["alert", "asap", "atob", "btoa", "cancelAnimationFrame", "clearImmediate", "clearInterval", "clearTimeout", "close", "confirm", "getComputedStyle", "getSelection", "open", "postMessage", "prompt", "requestAnimationFrame", "scroll", "scrollBy", "scrollTo", "setImmediate", "setInterval", "setTimeout", "stop", "XMLHttpRequest", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent"]
                        }],
                        n = !1;
                    _.each(t, function (e) {
                        var t = e.nativeType,
                            i = [],
                            r = e.propsToCheck || Object.getOwnPropertyNames(t);
                        _.each(r, function (e) {
                            try {
                                if (e && t[e] && "function" == typeof t[e]) {
                                    var n = t[e].toString().includes("[native code]");
                                    n || i.push(e)
                                }
                            } catch (r) {}
                        }), i.length && (e.nonNativeImplementations = i, n = !0)
                    });
                    var i = {
                        hasNonNativeMethods: n,
                        implementations: []
                    };
                    return e || console.group("Native javascript method check:"), n ? (e || console.warn("Pendo has detected that your application may be changing native javascript functionality. We suggest consulting an engineer or your CSM to better understand if these changes will negatively impact Pendo's ability to function properly"), _.each(t, function (t) {
                        if (t.nonNativeImplementations) {
                            var n = t.displayName.trim();
                            return e ? void i.implementations.push({
                                nativeType: n,
                                nonNativeImplementations: t.nonNativeImplementations
                            }) : void console.warn(n + " | Contains the following non-native implementations:", t.nonNativeImplementations.sort().join(", "))
                        }
                    }), e ? i : void console.groupEnd()) : e ? i : (console.log("Environment uses native javascript implementations"), console.groupEnd())
                }, pendo.validateBuiltInGlobals = function (e) {
                    var t = [];
                    if (_.isNumber(window.frames.length) && _.isFinite(window.frames.length) && pendo.Sizzle("iframe").length + pendo.Sizzle("frame").length === window.frames.length || t.push("Pendo has detected that window.frames.length has been modified"), window.Event && window.Event.prototype || t.push("Pendo has detected that window.Event has been modified"), t.length) {
                        if (e) return t;
                        console.group("Global variables:"), pendo._.each(t, function (e) {
                            console.warn(e)
                        }), console.groupEnd()
                    }
                }, pendo.validateEnvironment = function () {
                    pendo.validateInstall(), pendo.validateNativeMethods(), pendo.validateBuiltInGlobals(), ConfigReader.validate(console);
                    try {
                        var e = pendo.url.externalizeURL();
                        console.log("URL used for data collection", e)
                    } catch (t) {
                        console.log("Error getting Externalized URL", t)
                    }
                    try {
                        var n = getHref();
                        console.log("URL used for determining guides:", n)
                    } catch (t) {
                        console.log("Error getting href", t)
                    }
                };
                var AutoDisplay = function () {
                        function e() {
                            h.reset(), m.reset(), v.reset()
                        }

                        function t(e) {
                            return e && /auto/.test(e.launchMethod)
                        }

                        function n(e) {
                            return e.attributes && e.attributes.overrideAutoThrottling
                        }

                        function i(e) {
                            return _.defaults(_.groupBy(e, function (e) {
                                return n(e) || _.isFunction(e.shouldShowSnoozedGuide) && e.shouldShowSnoozedGuide() ? "override" : "auto";
                            }), {
                                override: [],
                                auto: []
                            })
                        }

                        function r(e, t) {
                            function n(e, t) {
                                return i[t] ? (e.push(i[t]), delete i[t], e) : e
                            }
                            if (!_.isArray(t) || !t.length) return e;
                            var i = _.indexBy(e, "id"),
                                r = _.reduce(t, n, []);
                            return _.chain(e).pluck("id").reduce(n, r).value()
                        }

                        function o(e, n) {
                            var o = r(_.filter(e, t), n),
                                s = i(o),
                                d = _.find(e, function (e) {
                                    return e.isTraining
                                });
                            if (!d) return s;
                            var u = ConfigReader.get("adoptPrioritizeAdoptGuides");
                            return a(s, u)
                        }

                        function a(e, t) {
                            return e.override = _.sortBy(e.override, function (e) {
                                return t ? e.isTraining ? 0 : 1 : e.isTraining ? 1 : 0
                            }), e.auto = _.sortBy(e.auto, function (e) {
                                return t ? e.isTraining ? 0 : 1 : e.isTraining ? 1 : 0
                            }), e
                        }

                        function s(e) {
                            return Math.max(e.latestDismissedAutoAt || -(1 / 0), e.finalAdvancedAutoAt || -(1 / 0), e.latestSnoozedAutoAt || -(1 / 0))
                        }

                        function d(e, t) {
                            var n = new Date(Math.max(e, 0));
                            return n.setHours(0, 0, 0, 0), n.setDate(n.getDate() + t), n.getTime()
                        }

                        function u(e, t) {
                            var n = t.interval,
                                i = (t.unit || "").toLowerCase();
                            if (_.isNumber(n) && isFinite(e)) {
                                if ("minute" === i) return 6e4 * n + e + 1;
                                if ("hour" === i) return 36e5 * n + e + 1;
                                if ("day" === i) return d(e, n)
                            } else if (_.isNumber(n)) return (new Date).getTime()
                        }

                        function l(e, t, n) {
                            if (n && n.enabled) {
                                var i = u(t, n);
                                if (_.isNumber(i) && !isNaN(i)) return e >= i
                            }
                            return !0
                        }

                        function c(e, t, n) {
                            var i, r = e.eachUntil(t, function (e) {
                                return e.shouldAutoDisplay() && e.autoDisplay(), e.isShown() ? (i = e, !0) : void 0
                            });
                            return (r || i) && n(), i
                        }

                        function p(e, t, n) {
                            var i = AutoDisplay.lastDismissedTime(t),
                                r = AutoDisplay.sortAndFilter(e, t.autoOrdering),
                                o = AutoDisplay.display(h, r.override, _.noop);
                            return !o && AutoDisplay.canDisplay(getNow(), i, t.throttling) && (o = AutoDisplay.display(h, r.auto, _.noop)), n(), o
                        }

                        function f(e, t, n) {
                            var i = AutoDisplay.sortAndFilter(e, t.autoOrdering);
                            return AutoDisplay.display(m, i.override, n)
                        }

                        function g(e, t, n) {
                            var i = AutoDisplay.lastDismissedTime(t),
                                r = AutoDisplay.sortAndFilter(e, t.autoOrdering);
                            return AutoDisplay.canDisplay(getNow(), i, t.throttling) ? AutoDisplay.display(v, r.auto, n) : void n()
                        }
                        var h = throttleIterator(50, createStatefulIterator(function (e) {
                                return e.id
                            })),
                            m = throttleIterator(50, createStatefulIterator()),
                            v = throttleIterator(50, createStatefulIterator());
                        return m.circular = !1, v.circular = !1, {
                            reset: e,
                            canDisplay: l,
                            display: c,
                            lastDismissedTime: s,
                            sortAndFilter: o,
                            tryDisplay: p,
                            tryDisplayAuto: g,
                            tryDisplayOverride: f,
                            getNextAutoDisplayTime: u,
                            overrideIterator: m,
                            autoIterator: v,
                            iterator: h
                        }
                    }(),
                    Permalink = function () {
                        function e(e) {
                            var t = e.url.get(),
                                n = parseQueryString(t).substring(1),
                                i = queryStringToObject(n),
                                r = t.indexOf("#");
                            if (!i.pendo && r >= 0) {
                                var o = parseQueryString(t.substring(r + 1)).substring(1);
                                _.extend(i, queryStringToObject(o))
                            }
                            var a = i.pendo || i.c__pendo;
                            return a ? e.findGuideById(a) : null
                        }

                        function t(e, t) {
                            t.showGuideById(e.id, "permalink"), e.shownFromPermalink = !0
                        }

                        function n(e) {
                            return !e.shownFromPermalink
                        }

                        function i(e) {
                            var t = Permalink.getGuideFromUrl(e);
                            return t && Permalink.shouldShowPermalinkGuide(t) ? (Permalink.showPermalinkGuide(t, e), !0) : !1
                        }
                        return {
                            tryDisplay: i,
                            getGuideFromUrl: e,
                            showPermalinkGuide: t,
                            shouldShowPermalinkGuide: n
                        }
                    }(),
                    GuideDisplay = function () {
                        function e(e) {
                            return {
                                then: function (t) {
                                    return t(e)
                                }
                            }
                        }

                        function t(t) {
                            if (!t.getGuide().isModule) return e();
                            var i = BuildingBlockResourceCenter.getResourceCenter();
                            return i ? n(i.steps[0], "badge") : e()
                        }

                        function n(t, n) {
                            if (AsyncContent.hasContent(t) && ContentValidation.valid(t)) return t._show(n), e(t.isShown());
                            if (AsyncContent.hasContent(t) && ContentValidation.invalid(t)) return e(!1);
                            var i = t.getGuide();
                            return i.canShowOnDevice() && t.canShowOnPage(pendo.getCurrentUrl()) ? (t.lock(), AsyncContent.fetchContent(t).then(function () {
                                return "whatsnew" === t.type || t.isShown() ? ContentValidation.validate(t.getGuide()) : !1
                            }).then(function () {
                                return "whatsnew" === t.type || t.isShown() ? (t.unlock(), t._show(n), t.isShown()) : !1
                            })) : e(!1)
                        }

                        function i(i, o) {
                            if (isPreviewing() && _.isFunction(i._show)) return i._show(o), e(i.isShown());
                            var a = i.getGuide();
                            return "whatsnew" === i.type ? n(i, o) : !store.getters["frames/hasFrames"]() || store.getters["frames/isGuideInThisFrame"]()(a) ? t(i).then(function () {
                                return n(i, o)
                            }).then(function (e) {
                                return e ? !0 : r(i, o)
                            }) : r(i, o)
                        }

                        function r(t, n) {
                            var i = t.getGuide();
                            return store.getters["frames/hasFrames"]() && store.getters["frames/isGuideInDifferentFrame"]()(i) ? (t.lock(), store.dispatch("frames/showGuideStep", {
                                guideId: t.guideId,
                                stepId: t.id,
                                reason: n
                            }).then(function (e) {
                                return t.unlock(), e.isShown
                            }, function () {
                                return t.unlock(), !1
                            })) : e(!1)
                        }
                        return {
                            show: i,
                            showLocal: n
                        }
                    }(),
                    ContentLoader = function (e) {
                        function t(t) {
                            if (!isInDesignerPreviewMode()) try {
                                var n = d[t.id];
                                if (n && n.language !== t.language && delete d[t.id], !d[t.id]) {
                                    var i = [],
                                        r = {
                                            deferred: {},
                                            language: t.language
                                        },
                                        o = !1;
                                    if (d[t.id] = r, GuideLoader.usesXhr() && t.domUrl) r.deferred.domJson = q.defer(), e.ajax.get(u(t.domUrl)).then(function (e) {
                                        r.domJson = replaceObjectWithContentHost(e.data), r.deferred.domJson.resolve()
                                    }), i.push(r.deferred.domJson.promise), o = !0;
                                    else if (t.domJsonpUrl) {
                                        r.deferred.domJson = q.defer();
                                        var l = e.loadResource(u(t.domJsonpUrl), function () {
                                            dom.removeNode(l)
                                        });
                                        i.push(r.deferred.domJson.promise), o = !0
                                    }
                                    if (t.contentUrlJs && !getPendoConfigValue("preventCodeInjection")) {
                                        r.deferred.content = q.defer();
                                        var c = e.loadResource(u(a(t.contentUrlJs)), function () {
                                            dom.removeNode(c)
                                        });
                                        i.push(r.deferred.content.promise), t.contentUrlCss && (r.deferred.css = q.defer(), e.loadResource({
                                            url: u(t.contentUrlCss),
                                            type: "text/css"
                                        }, function () {
                                            r.deferred.css.resolve()
                                        }), i.push(r.deferred.css.promise))
                                    } else if (t.contentUrl && !getPendoConfigValue("preventCodeInjection")) {
                                        r.deferred.content = q.defer();
                                        var p = e.loadResource(s(u(t.contentUrl), ".js"), function () {
                                            dom.removeNode(p)
                                        });
                                        i.push(r.deferred.content.promise)
                                    } else if (!o) return q.reject();
                                    r.deferred.promise = q.all(i).then(function () {
                                        return _.omit(r, "deferred")
                                    })
                                }
                                return d[t.id].deferred.promise
                            } catch (f) {
                                throw Events.resourceFetchFail.trigger(t, f), f
                            }
                        }

                        function n() {
                            d = {}
                        }

                        function i(e, t, n, i, o) {
                            if (_.isString(n)) {
                                _.isFunction(i) || (i = r(n) ? _.template(n) : _.constant(n));
                                var a = d[e + t];
                                a && a.deferred.content && (a.content = n, a.template = i, a.script = o, a.deferred.content.resolve())
                            }
                        }

                        function r(e) {
                            return /<%/.test(e) && /%>/.test(e)
                        }

                        function o(e, t, n) {
                            var i = d[e + t];
                            i && i.deferred.domJson && (i.domJson = replaceObjectWithContentHost(n), i.deferred.domJson.resolve())
                        }

                        function a(t) {
                            if (isSfdcLightning()) {
                                var n = t.replace(/^https?:\/\/[^/]+\/guide-content\//, "").split("/"),
                                    i = n[0],
                                    r = $A.get("$Resource.pendoGuide" + base32Encode(e.toUTF8Array(i)));
                                if (_.isString(r)) return r + "/" + n.join("/")
                            }
                            return t
                        }

                        function s(e, t) {
                            if (!_.isString(e)) return e;
                            var n = _.indexOf(e, "?");
                            return 0 > n ? e + t : e.substring(0, n) + t + e.substring(n)
                        }
                        e.guideContent = i, e.receiveDomStructureJson = o;
                        var d = {},
                            u = _.compose(function (e) {
                                var t = getContentHostRegex();
                                if (t) {
                                    var n = new RegExp(t);
                                    n.test(e) || writeException(new Error("Failed to verify URL: " + e + " vs " + t), "cname contentHost verification")
                                }
                                return e
                            }, replaceWithContentHost);
                        return {
                            load: t,
                            reset: n
                        }
                    }(pendo),
                    ContentVerifier = function () {
                        function e(e) {
                            return _.isString ? e.replace(/-/g, "+").replace(/_/g, "/") : e
                        }

                        function t(t, i) {
                            if (n() && pendo.sniffer.sri) {
                                var r = parseContentUrl(i),
                                    o = _.find(["sha512", "sha384", "sha256"], function (e) {
                                        return !!r.query[e]
                                    });
                                o && (t.integrity = o + "-" + e(r.query[o]), t.setAttribute("crossorigin", "anonymous"))
                            }
                        }

                        function n() {
                            return ConfigReader.get("guideValidation")
                        }

                        function i(e) {
                            try {
                                var t = [];
                                return !GuideLoader.usesXhr() && e.domJsonpUrl ? t.push(d(e, "domJsonpUrl")) : GuideLoader.usesXhr() && e.domUrl && t.push(s(e, "domUrl")), e.contentUrlJs ? t.push(d(e, "contentUrlJs")) : e.contentUrl && t.push(d(e, "contentUrl")), q.all(t)
                            } catch (n) {
                                throw Events.contentVerificatonFail.trigger(e, n), n
                            }
                        }

                        function r(e) {
                            return function (t) {
                                return n() ? e(t) : q.resolve()
                            }
                        }

                        function o(e, t) {
                            return function (n) {
                                return e.failed[n.id] ? q.reject() : e.verified[n.id] ? q.resolve() : t(n).then(function () {
                                    e.verified[n.id] = !0
                                }, function (t) {
                                    return e.failed[n.id] = !0, q.reject(t)
                                })
                            }
                        }

                        function a(e, t) {
                            return function (n) {
                                return t(n).then(_.noop, function (t) {
                                    return /verify/.test(t) && e(t), q.reject(t)
                                })
                            }
                        }

                        function s(e, t) {
                            var n = e[t];
                            if (!_.isString(n)) return q.reject('unable to parse "' + n + '"');
                            var i = u(e, t);
                            return pendo.ajax.get(n).then(function (e) {
                                return l(e.data) !== i ? q.reject('Unable to verify content at "' + n + '"') : void 0
                            })
                        }

                        function d(e, t) {
                            var n = e[t];
                            return pendo.sniffer.sri && /[?&]sha(256|384|512)=/.test(n) ? q.resolve() : s(e, t)
                        }

                        function u(e, t) {
                            var n = {
                                    domUrl: "domHash",
                                    domJsonpUrl: "domJsonpHash"
                                },
                                i = n[t];
                            return e[i] || getHashFromContentUrl(e[t])
                        }

                        function l(e) {
                            "object" == typeof e && (e = JSON.stringify(e));
                            var t = sha1.create();
                            return t.update(e), pendo.fromByteArray(t.digest())
                        }

                        function c() {
                            p.failed = {}, p.verified = {}
                        }
                        var p = {
                                failed: {},
                                verified: {}
                            },
                            f = r(o(p, a(writeErrorPOST, i)));
                        return {
                            addIntegrityAttribute: t,
                            verify: f,
                            reset: c
                        }
                    }(),
                    BANNER_DEFAULT_HEIGHT = 500,
                    BANNER_CSS_NAME = "_pendo-guide-banner_",
                    ContentValidation = function () {
                        function e(e) {
                            if (!p()) return !0;
                            var t = c[e.guideId];
                            return t ? t.status === d : !1
                        }

                        function t(e) {
                            if (!p()) return !1;
                            var t = c[e.guideId];
                            return t ? t.status === u : !1
                        }

                        function n(e) {
                            return get(e, "attributes.resourceCenter.isTopLevel", !1)
                        }

                        function i(e) {
                            var t = BuildingBlockResourceCenter.findResourceCenterModules(e, activeGuides),
                                n = [e].concat(t);
                            return q.all(_.map(n, r))
                        }

                        function r(e) {
                            var t = c[e.id];
                            return t || (t = {}, c[e.id] = t), t.contentPromise || (t.contentPromise = e.fetchContent()), t.contentPromise.then(function () {
                                var n = JSON.stringify(e.signature()),
                                    i = e.id + "-" + crc32(n);
                                t[i] || (t[i] = {
                                    status: l
                                }, t.status = l);
                                var r = t[i].promise;
                                return r ? r : (r = pendo.events.validateGuide(n, e).then(function () {
                                    t[i].status = d, t.status = d
                                }, function (e) {
                                    return t[i].status = u, t.status = u, q.reject(e)
                                }), t[i].promise = r, r)
                            })
                        }

                        function o(e) {
                            function t(e, t) {
                                var n = get(e, "guide.translationStates." + e.language + ".stepTranslations." + e.id);
                                return {
                                    contentUrl: e.contentUrl,
                                    contentUrlCss: e.contentUrlCss,
                                    contentUrlJs: e.contentUrlJs,
                                    domUrl: e.domUrl,
                                    domJsonpUrl: e.domJsonpUrl,
                                    domHash: n && n.domHash,
                                    domJsonpHash: n && n.domJsonpHash
                                }
                            }

                            function n(e) {
                                return _.filter([
                                    ["content", getHashFromContentUrl(e.contentUrl)],
                                    ["contentCss", getHashFromContentUrl(e.contentUrlCss)],
                                    ["contentJs", getHashFromContentUrl(e.contentUrlJs)],
                                    ["dom", get(e, "domHash", getHashFromContentUrl(e.domUrl))],
                                    ["domJsonp", get(e, "domJsonpHash", getHashFromContentUrl(e.domJsonpUrl))]
                                ], function (e) {
                                    return e[1]
                                })
                            }
                            var i = this;
                            return this.signature = function () {
                                if (this.domUrl) {
                                    if (this.guide.authoredLanguage === this.language) return n(this);
                                    var e = t(i);
                                    return n(e)
                                }
                                var r = [
                                        ["content", this.content]
                                    ],
                                    o = this.attributes && this.attributes.variables;
                                if (o) {
                                    var a = g(o);
                                    a.length && (a = _.sortBy(a, function (e) {
                                        return e[0]
                                    }), r.push(["variables", a]))
                                }
                                return r
                            }, i
                        }

                        function a() {
                            return this.signature = function () {
                                return _.map(this.steps, function (e) {
                                    return e.signature()
                                })
                            }, this
                        }

                        function s() {
                            var e = this,
                                t = !1,
                                n = function () {
                                    return _.size(pendo.events._handlers.validateLauncher) > 0 && e.data.template
                                },
                                i = function () {
                                    var t = JSON.stringify(e.signature()),
                                        n = "launcher-" + crc32(t);
                                    return pendo.events.validateLauncher(t).then(function () {
                                        c[n] = d
                                    }, function () {
                                        c[n] = u
                                    })
                                },
                                r = function () {
                                    var t = "launcher-" + crc32(e.signature());
                                    return c[t]
                                };
                            return e.before("update", function () {
                                return n() && t ? !1 : void 0
                            }), e.before("render", function () {
                                if (n()) {
                                    if (t) return !1;
                                    var o = r();
                                    if (o === u) return !1;
                                    if (o !== d) return t = !0, i().then(function () {
                                        t = !1, e.render(), e.update(getActiveGuides())
                                    }, function () {
                                        t = !1
                                    }), !1
                                }
                            }), e.signature = function () {
                                var e = [],
                                    t = g(this.data);
                                return t.length && (t = _.chain(t).filter(function (e) {
                                    return !/^contentUrl/.test(e[0])
                                }).sortBy(function (e) {
                                    return e[0]
                                }).value(), e.push(["variables", t])), e
                            }, e
                        }
                        var d = "allow",
                            u = "deny",
                            l = "pending",
                            c = {},
                            p = function () {
                                return _.size(pendo.events._handlers.validateGuide) > 0
                            },
                            f = function (e) {
                                if (!p()) return q.resolve();
                                try {
                                    return n(e) ? i(e) : r(e)
                                } catch (t) {
                                    throw Events.contentValidationFail.trigger(e, t), t
                                }
                            },
                            g = function (e, t) {
                                var n = [];
                                return _.each(e, function (e, i) {
                                    var r = i;
                                    t && (r = t + "." + r), _.isObject(e) ? _.each(g(e, r), function (e) {
                                        n.push(e)
                                    }) : n.push([r, e])
                                }), n
                            };
                        return {
                            state: c,
                            Step: o,
                            Guide: a,
                            Launcher: s,
                            validate: f,
                            valid: e,
                            invalid: t,
                            reset: function () {
                                c = {}
                            }
                        }
                    }(),
                    AsyncContent = function () {
                        function e(t) {
                            function n(e) {
                                r(a)
                            }

                            function i() {
                                return e.fetchContent(o)
                            }

                            function r(e) {
                                var n = _.indexOf(t.steps, o);
                                _.chain(t.steps).rest(n + 1).first(e).each(function (e) {
                                    e.fetchContent()
                                }).value()
                            }
                            var o = this,
                                a = 1;
                            return (o.contentUrl || o.domJsonpUrl) && (_.extend(o, {
                                fetchContent: i
                            }), o.after("render", n)), o
                        }

                        function t(e) {
                            var t = e.getGuide(),
                                n = t && t.language ? t.language : "default";
                            return e.id + "." + n
                        }
                        return e.state = {}, e.reset = function () {
                            ContentLoader.reset(), e.state = {}
                        }, e.fetchContent = function (n) {
                            var i = t(n),
                                r = e.state[i];
                            if (!r) {
                                r = {};
                                var o = n.getGuide();
                                if (o.control) return;
                                var a, s, d;
                                o && o.language && (a = o.language, a !== o.authoredLanguage && (s = get(o, "translationStates." + a + ".stepTranslations." + n.id + ".domHash"), d = get(o, "translationStates." + a + ".stepTranslations." + n.id + ".domJsonpHash")));
                                var u = n.guideId + n.id,
                                    l = _.extend({
                                        id: u,
                                        language: a,
                                        domHash: s,
                                        domJsonpHash: d
                                    }, _.pick(n, "contentUrl", "contentUrlCss", "contentUrlJs", "domJsonpUrl", "domUrl"));
                                r.promise = ContentVerifier.verify(l).then(function () {
                                    return r.verified = !0, ContentLoader.load(l)
                                }).then(function (e) {
                                    return r.loaded = !0, e
                                }), e.state[i] = r
                            }
                            return r.promise.then(function (e) {
                                _.extend(n, e)
                            })
                        }, e.hasContent = function (e) {
                            return pendo.doesExist(e.content) || pendo.doesExist(e.domJson)
                        }, e.reset(), e
                    }();
                GuideStep.create = function (e, t) {
                    return _.reduce(GuideStep.behaviors, function (e, n) {
                        return n.call(e, t)
                    }, e)
                }, GuideStep.isGuideStep = function (e) {
                    return !!e && _.isFunction(e.render)
                }, GuideStep.behaviors = [Wrappable, GuideStep, RemoteFrameStep, AsyncContent, ContentValidation.Step, CloseButton, Credits, Tooltip, Lightbox, Banner, WhatsNew, Poll, AutoHeight, PreviewMode], GuideErrorThrottle.MAX_ERRORS_PER_MINUTE = 30, Guide.create = function (e) {
                    return _.reduce(Guide.behaviors, function (e, t) {
                        return t.call(e)
                    }, e)
                }, Guide.behaviors = [Wrappable, Guide, ContentValidation.Guide, GroupGuide, WalkthroughGuide, GuideErrorThrottle, RemoteFrameGuide], AdvanceTrigger.prototype.add = function () {
                    (0 !== _.indexOf(this.guide.steps, this.step) || AdvanceTrigger.shouldAttachHandler(this.guide, this.method)) && (!isBadge(this.guide) || isWalkthrough(this.guide)) && this.setupElementEvent(this.element, this.method)
                }, AdvanceTrigger.prototype.remove = function () {
                    this.teardownElementEvent(this.element, this.method)
                }, AdvanceTrigger.prototype.setupElementEvent = function (e, t) {
                    this.advanceFn || (this.advanceFn = _.compose(_.bind(this.teardownElementEvent, this, e, t), _.bind(this.step.advance, this.step))), AdvanceTrigger.attach(this.step, e, t, this.advanceFn)
                }, AdvanceTrigger.prototype.teardownElementEvent = function (e, t) {
                    log("detach onGuideAdvanced", "guide"), detachEvent(e, t, this.advanceFn, !0), this.step.removeTrigger(this)
                }, AdvanceTrigger.shouldAttachHandler = function (e, t) {
                    return !e.isActivatedByEvent(t) || DOMActivation.activates(e) || e.attributes.activation.selector !== e.steps[0].elementPathRule && !!e.attributes.activation.selector
                }, AdvanceTrigger.attach = function (e, t, n, i) {
                    if (e) {
                        for (var r = AdvanceTrigger.handlers = AdvanceTrigger.handlers || {}, o = r[e.id] = r[e.id] || [], a = 0; a < o.length; ++a) {
                            var s = o[a];
                            t === s[0] && n === s[1] && (detachEvent(t, n, s[2], !0), o.splice(_.indexOf(o, s), 1), a--)
                        }
                        o.push([t, n, i]), detachEvent(t, n, i, !0), attachEvent(t, n, i, !0)
                    }
                };
                var loadGlobalScriptOnce = _.wrap(_.once(_.wrap(loadGlobalScript, validateGlobalScript)), ignoreEmptyGlobalScript),
                    EventRouter = function () {
                        function e(e) {
                            var n;
                            if (!e.ignore) switch (e.action) {
                            case u.advanceGuide:
                                pendo.onGuideAdvanced(e, e.step);
                                break;
                            case u.previousStep:
                                pendo.onGuidePrevious(e, e.step);
                                break;
                            case u.goToStep:
                                pendo.goToStep(e);
                                break;
                            case u.submitPoll:
                                this.submitPoll(e);
                                break;
                            case u.guideSnoozed:
                                var i = e && e.params && e.params[0] && e.params[0].value;
                                pendo.onGuideSnoozed(e, e.step, i);
                                break;
                            case u.dismissGuide:
                                BuildingBlockResourceCenter.attemptToPreserveIntegrationIframes(e), t(e);
                                break;
                            case u.showElements:
                                this.setElementDisplay(e, "block"), n = BuildingBlockGuides.findGuideContainerJSON(e.step.domJson), BuildingBlockGuides.recalculateGuideHeight(n.props.id), BuildingBlockGuides.flexAllThings(n.props.id);
                                break;
                            case u.hideElements:
                                this.setElementDisplay(e, "none"), n = BuildingBlockGuides.findGuideContainerJSON(e.step.domJson), BuildingBlockGuides.recalculateGuideHeight(n.props.id), BuildingBlockGuides.flexAllThings(n.props.id);
                                break;
                            case u.slideElement:
                                this.setElementAnimation(e);
                                break;
                            case u.showGuide:
                                var r = _.find(e.params, function (e) {
                                    return "reason" === e.name
                                });
                                pendo.showGuideById(e.params[0].value, r && r.value);
                                break;
                            case u.launchGuide:
                                if (!pendo.designer) {
                                    pendo.onGuideDismissed(e, e.step);
                                    var o = e && e.params && e.params[0] && e.params[0].value;
                                    o && pendo.showGuideById(e.params[0].value)
                                }
                                break;
                            case u.renderResourceCenterModule:
                                BuildingBlockResourceCenter.replaceResourceCenterContent(e.params[0].value);
                                break;
                            case u.returnToResourceCenterHome:
                                var a = BuildingBlockResourceCenter.findResourceCenterHomeView(pendo.guides);
                                if (!a) return;
                                BuildingBlockResourceCenter.attemptToPreserveIntegrationIframes(e), BuildingBlockResourceCenter.replaceResourceCenterContent(a.id, e.params);
                                break;
                            case u.openFeedback:
                                Feedback.openFeedback(e);
                                break;
                            case u.openLink:
                                !pendo.designer && this.openLink(e);
                                break;
                            case u.searchGuides:
                                this.searchGuides(e);
                                break;
                            case u.submitPollAndGoToStep:
                                this.submitPoll(e), pendo.goToStep(e)
                            }
                        }

                        function t(e) {
                            if (!e || !e.step) return pendo.onGuideDismissed();
                            var t = e.step.getGuide();
                            return t && t.attributes && t.attributes.resourceCenter ? BuildingBlockResourceCenter.dismissResourceCenter(t) : void pendo.onGuideDismissed(e, e.step)
                        }

                        function n(e) {
                            var t = e && e.action,
                                n = e.step,
                                i = [];
                            if (e.srcElement && e.srcElement.getAttribute("data-pendo-poll-type") && "yesNo" === e.srcElement.getAttribute("data-pendo-poll-type")) {
                                var r = e.srcElement.getAttribute("data-pendo-poll-id"),
                                    o = e.srcElement.value;
                                i.push({
                                    pollId: r,
                                    value: parseInt(o, 10)
                                })
                            }
                            var a = Sizzle("[data-pendo-poll-id]", n.guideElement[0]);
                            i = i.concat(_.map(a, function (e) {
                                var t = Sizzle("textarea,input:text,select,input:radio:checked", e);
                                if (t && t.length && t[0].value) {
                                    var i = e.getAttribute("data-pendo-poll-id"),
                                        r = _.find(n.guide.polls, function (e) {
                                            return e.id === i
                                        }),
                                        o = t[0].value;
                                    return r && r.numericResponses && (o = parseInt(o, 10)), {
                                        pollId: i,
                                        value: o
                                    }
                                }
                            })), n.response && i ? n.response(_.compact(i)) : pendo.log("[Agent] Error! Trying to submit a poll response but step does not have response function!"), t !== u.submitPollAndGoToStep && n.advance()
                        }

                        function i(e, t) {
                            var n = e.step,
                                i = _.find(e.params, function (e) {
                                    return "selectors" === e.name
                                }).value,
                                r = dom(i, n.guideElement[0]);
                            _.each(r, function (e) {
                                e.style.display = t
                            })
                        }

                        function r(e) {
                            var t = _.find(e.params, function (e) {
                                    return "selector" === e.name
                                }).value,
                                n = dom(t, e.step.guideElement[0])[0],
                                i = _.find(e.params, function (e) {
                                    return "transition" === e.name
                                }).value,
                                r = _.find(e.params, function (e) {
                                    return "left" === e.name
                                }).value;
                            n.style.transition = i, n.style.left = r
                        }

                        function o(e) {
                            var t = _.find(e.params, function (e) {
                                    return "url" === e.name
                                }).value,
                                n = _.find(e.params, function (e) {
                                    return "target" === e.name
                                }).value;
                            "_self" === n && detectMaster() && (n = "_top"), window.open(t, n)
                        }

                        function a(e, t, n) {
                            return t ? t.some(function (t) {
                                return _.contains(e, t) && t === n
                            }) : !1
                        }

                        function s(e) {
                            var t = "",
                                n = e.srcElement.value,
                                i = pendo.Sizzle("#pendo-resource-center-container")[0],
                                r = pendo.dom(i).find('[id^="pendo-list-item-"]'),
                                o = pendo.dom(i).find('[id^="pendo-no-matches-container"]'),
                                a = [],
                                s = _.find(e.params, function (e) {
                                    return "searchTextInfo" === e.name
                                });
                            pendo.dom(o[0].childNodes[0]).text(s.value);
                            var d = !0;
                            if (r)
                                for (var u in r)
                                    if (u && r[u]) {
                                        pendo.dom(r[u]).text() && (-1 !== pendo.dom(r[u]).text().toLowerCase().indexOf(n.toLowerCase()) ? (pendo.dom(r[u]).css({
                                            display: "list-item"
                                        }), d = !1) : pendo.dom(r[u]).css({
                                            display: "none"
                                        })), _.isFunction(r[u].getAttribute) && (t = r[u].getAttribute("data-_pendo-text-list-item-1").split(","), _.forEach(t, function (e) {
                                            _.contains(a, e) || a.push(e)
                                        }));
                                        var l = this.searchAllTerms(a, t, n);
                                        l && r[u] && (pendo.dom(r[u]).css({
                                            display: "list-item"
                                        }), d = !1), t = ""
                                    } d ? pendo.dom(o[0]).css({
                                display: "block"
                            }) : pendo.dom(o[0]).css({
                                display: "none"
                            })
                        }
                        var d = this;
                        this.eventable = Eventable.call({}), this.eventable.on("pendoEvent", function (e) {
                            try {
                                d.eventHandler(e)
                            } catch (t) {
                                var n = e && e.action || "NO ACTION DEFINED";
                                writeException(t, "Error in Action " + n)
                            }
                        }), this.eventHandler = e, this.submitPoll = n, this.setElementDisplay = i, this.setElementAnimation = r, this.openLink = o, this.goToStep = goToStep, this.searchGuides = s, this.searchAllTerms = a;
                        var u = {
                            advanceGuide: "advanceGuide",
                            previousStep: "previousStep",
                            goToStep: "goToStep",
                            submitPoll: "submitPoll",
                            guideSnoozed: "guideSnoozed",
                            dismissGuide: "dismissGuide",
                            showElements: "showElements",
                            hideElements: "hideElements",
                            slideElement: "slideElement",
                            showGuide: "showGuide",
                            launchGuide: "launchGuide",
                            renderResourceCenterModule: "renderResourceCenterModule",
                            returnToResourceCenterHome: "returnToResourceCenterHome",
                            openFeedback: "openFeedback",
                            openLink: "openLink",
                            searchGuides: "searchGuides",
                            submitPollAndGoToStep: "submitPollAndGoToStep"
                        };
                        return this
                    },
                    DOMActivation = function () {
                        function e(e, t, i) {
                            var r = e[p],
                                o = r ? i[r] : null;
                            o || (r = r || "target" + _.uniqueId(), o = {
                                target: e,
                                events: {}
                            }, i[r] = o, e[p] = r);
                            var a = i[t.id] || [];
                            a.push(r), i[t.id] = a, _.each(t.events, function (i) {
                                var r = o.events[i];
                                r || (r = {
                                    guideIds: {}
                                }, r.fn = _.partial(n, _, r.guideIds), attachEvent(e, i, r.fn), o.events[i] = r), r.guideIds[t.id] = 1
                            })
                        }

                        function t(e, t) {
                            _.each(t[e.id], function (n) {
                                var i = n ? t[n] : null;
                                i && (_.each(i.events, function (t, n) {
                                    t && t.guideIds && (delete t.guideIds[e.id], _.size(t.guideIds) <= 0 && (detachEvent(i.target, n, t.fn), delete i.events[n]))
                                }), _.size(i.events) <= 0 && (delete i.target[p], i.target = null, delete t[n]))
                            }), delete t[e.id]
                        }

                        function n(e, t) {
                            if (!e.pendoActivatedGuide) {
                                var n = ConfigReader.get("adoptPrioritizeAdoptGuides"),
                                    i = _.compact(_.map(_.keys(t), function (e) {
                                        return pendo.findGuideById(e)
                                    }));
                                i = _.filter(i, function (e) {
                                    return e.steps && e.steps.length ? get(e, "attributes.dom.isOnlyShowOnce") ? !e.steps[0].hasBeenSeen() : !0 : !1
                                }), i = _(i).chain().sortBy(function (e) {
                                    return "staged" === e.state ? 0 : 1
                                }).sortBy(function (e) {
                                    var t = e.isTraining;
                                    return n ? t ? 0 : 1 : t ? 1 : 0
                                }).value();
                                var r = _.find(i, function (e) {
                                    var t = _.first(e.steps),
                                        n = get(e, "attributes.resourceCenter", !1);
                                    return n && e.isShown() ? BuildingBlockResourceCenter.dismissResourceCenter() : t.canShow() ? t.isShown() ? !0 : showGuide(t, "dom") : !1
                                });
                                r && (e.pendoActivatedGuide = r.id)
                            }
                        }

                        function i() {
                            _.each(g, function (e) {
                                t(e, h), e.targets = []
                            }), g.length = 0, c = null
                        }

                        function r() {
                            c && c.reset()
                        }

                        function o(e) {
                            if (e.id && e.steps && e.steps.length && e.hasLaunchMethod("dom")) {
                                var t = get(e, "attributes.activation.event", []);
                                if (t && t.length) {
                                    var n = a(e);
                                    if (n) return {
                                        id: e.id,
                                        events: t,
                                        selector: n,
                                        targets: []
                                    }
                                }
                            }
                        }

                        function a(e) {
                            var t = get(e, "attributes.activation.selector");
                            return t ? t : e.steps[0].elementPathRule
                        }

                        function s(e) {
                            c || (_.each(e, function (e) {
                                var t = o(e);
                                t && g.push(t)
                            }), c = throttleIterator(50, createStatefulIterator()), c.circular = DOMActivation.circular)
                        }

                        function d(e, t) {
                            return e.length != t.length ? !1 : _.all(e, function (e, n) {
                                return e === t[n]
                            })
                        }

                        function u(n) {
                            return s(n), c.eachUntil(g, function (n) {
                                var i = Sizzle(n.selector);
                                i.length > f && (i.length = f), d(i, n.targets) || (n.targets = i, t(n, h), _.each(i, function (t) {
                                    e(t, n, h)
                                }))
                            })
                        }

                        function l(e) {
                            ConfigReader.get("disablePrefetch") || _.each(e, function (e) {
                                _.isFunction(e.hasLaunchMethod) && e.hasLaunchMethod("dom") && e.steps && e.steps.length && _.isFunction(e.steps[0].fetchContent) && e.steps[0].fetchContent()
                            })
                        }
                        var c, p = "pendoTargetId",
                            f = 50,
                            g = [],
                            h = {};
                        return {
                            circular: !0,
                            key: p,
                            guides: g,
                            getActivationSelector: a,
                            targets: h,
                            reset: i,
                            resetIterator: r,
                            init: s,
                            update: u,
                            attach: e,
                            detach: t,
                            handler: n,
                            activates: o,
                            prefetch: l
                        }
                    }(),
                    ScriptGuideLoader = {
                        load: function (e, t) {
                            return q.resolve(pendo.loadResource(e, t))
                        },
                        buildUrl: function (e, t) {
                            return buildBaseDataUrl("guide.js", e, t)
                        },
                        usesXhr: function () {
                            return !1
                        }
                    },
                    GuideLoader = ScriptGuideLoader,
                    guideEvtCache = [],
                    activeElements = [],
                    detachGuideEventHandlers, activeGuides = [],
                    controlGuideLogMessage = "Guide was not shown because this visitor is in a control group of an active experiment for the guide",
                    Tombstone = function () {
                        var e = [];
                        return {
                            addGuide: function (t) {
                                return e.push(t), setActiveGuides(_.difference(getActiveGuides(), e)), e
                            }
                        }
                    }(),
                    DEFAULT_GUIDE_SEEN_TIMEOUT_LENGTH = 1e4,
                    GUIDE_CSS_NAME = "_pendo-guide_",
                    GUIDE_ID_PREFIX = "_pendo_g_",
                    seenTime = 0,
                    isGuideShown = function () {
                        return _.any(getActiveGuides(), function (e) {
                            return e.isShown()
                        })
                    },
                    addCloseButton = function (e, t) {
                        var n = dom("._pendo-close-guide_", e);
                        if (n.length) return n[0];
                        n = dom("<button>").attr("id", "_pendo-close-guide_").attr("aria-label", "close").addClass("_pendo-close-guide_").html("&times;"), isBrowserInQuirksmode() ? msie > 9 && n.css({
                            top: 3
                        }) : 8 === msie ? n.css({
                            top: 9,
                            right: 2
                        }) : 9 === msie ? n.css({
                            right: 2,
                            top: 3
                        }) : msie > 9 && n.css({
                            top: 3
                        });
                        var i = dom("._pendo-guide-container_", e)[0] || e;
                        return n.appendTo(i), n[0].onclick = function () {
                            t()
                        }, n[0]
                    },
                    findGuideBy = function (e, t) {
                        for (var n = getActiveGuides(), i = 0; i < n.length; i++)
                            if (n[i][e] === t) return n[i];
                        return null
                    },
                    findGuideById = function (e) {
                        return pendo.findGuideBy("id", e)
                    },
                    findGuideByName = function (e) {
                        return pendo.findGuideBy("name", e)
                    },
                    findStepInGuide = function (e, t) {
                        return e && e.id ? (e = findGuideById(e.id), e.findStepById(t)) : null
                    },
                    _updateGuideStepStatus = function (e, t, n) {
                        var i = pendo.findStepInGuide(findGuideById(e), t);
                        i && (i.seenState = n)
                    },
                    getStepIdFromElement = function (e) {
                        for (var t = new RegExp("^" + GUIDE_ID_PREFIX); e;) {
                            if (_.isString(e.id) && t.test(e.id)) return e.id.replace(t, "");
                            e = e.parentNode
                        }
                        return null
                    },
                    isStepType = function (e) {
                        return e && e.guideId
                    },
                    findStepForGuideEvent = function (e, t) {
                        if (isStepType(e) && (t = e, e = null), GuideStep.isGuideStep(t)) return t;
                        if (t) {
                            var n = findGuideById(t.guideId);
                            return n && n.findStepById(t.id)
                        }
                        var i = _.find(getActiveGuides(), function (e) {
                            return e.isShown()
                        });
                        if (i) {
                            var r;
                            return e && (r = getStepIdFromElement(e.target || e.srcElement || e)), r ? (t = i.findStepById(r), t || writeMessage("findStepForGuideEvent: step with id " + r)) : (t = _.find(i.steps, function (e) {
                                return e.isShown()
                            }), t || writeMessage("findStepForGuideEvent: no step shown")), t
                        }
                    },
                    removeGuideEventListeners = function (e) {
                        var t = "element" === e.advanceMethod ? "click" : "mouseover",
                            n = pendo.getElementForGuideStep(e);
                        "tooltip" === e.type && _.isFunction(e.teardownElementEvent) ? e.teardownElementEvent(n, t) : detachEvent(n, t, onGuideAdvanced, !0)
                    },
                    onGuideDismissed = function (e, t) {
                        var n = null;
                        if (e && e instanceof Object && e.until && (n = e.until), t = findStepForGuideEvent(e, t), !t || !t.id) return void stopGuides();
                        if (!checkLockedStep(t)) {
                            if (n) return void t.hide({
                                stayHidden: !0
                            });
                            removeGuideEventListeners(t);
                            var i = t.id,
                                r = t.guideId,
                                o = findGuideById(r),
                                a = _.first(o && o.steps),
                                s = a && a.seenReason,
                                d = o && o.language;
                            dismissedGuide(r, i, pendo.get_visitor_id(), s, d);
                            var u = getNow();
                            _updateGuideStepStatus(r, i, "dismissed");
                            var l = _.isFunction(t.getGuide) && t.getGuide(),
                                c = l && l.attributes && l.attributes.doNotResume;
                            c || writeLastStepSeenCache({
                                guideId: r,
                                guideStepId: i,
                                time: u,
                                state: "dismissed",
                                seenReason: s,
                                visitorId: pendo.get_visitor_id()
                            }), "auto" === s && writeThrottlingStateCache(u, THROTTLING_STATE.DISMISSED), t.hide(), setFocusToActivationElement(l), isGuideShown() || (stopGuides(), startGuides())
                        }
                    },
                    onGuideSnoozed = function (e, t, n) {
                        if (log("onGuideSnoozed called", "guides"), t = findStepForGuideEvent(e, t), !t) return log("missing step.  can't snooze", ["guides", "error"]), stopGuides(), void writeMessage("onGuideSnoozed: missing step");
                        if (n || (n = 864e5, log("no snooze duration provided, defaulting to 1 day")), !checkLockedStep(t)) {
                            removeGuideEventListeners(t);
                            var i = t.id,
                                r = t.guideId,
                                o = pendo.get_visitor_id(),
                                a = findGuideById(r),
                                s = a && a.language,
                                d = _.first(a && a.steps),
                                u = d && d.seenReason,
                                l = getNow();
                            log("snoozing guide for " + n + " ms");
                            var c = l + n;
                            t.snoozeEndTime = c, snoozedGuide(r, i, o, u, s, n), _updateGuideStepStatus(r, i, "snoozed");
                            var p = a && a.attributes && a.attributes.doNotResume;
                            p || writeLastStepSeenCache({
                                guideId: r,
                                guideStepId: i,
                                time: l,
                                state: "snoozed",
                                seenReason: u,
                                visitorId: pendo.get_visitor_id(),
                                snoozeEndTime: c
                            }), "auto" === u && writeThrottlingStateCache(l, THROTTLING_STATE.SNOOZED), t.hide(), setFocusToActivationElement(a), isGuideShown() || (stopGuides(), startGuides())
                        }
                    },
                    cleanupActiveGuide = function () {
                        var e = getActiveGuide();
                        e && _.each(e.steps, function (e) {
                            var t = "element" == e.advanceMethod ? "click" : "mouseover",
                                n = pendo.getElementForGuideStep(e);
                            "tooltip" === e.type && _.isFunction(e.teardownElementEvent) ? e.teardownElementEvent(n, t) : detachEvent(n, t, onGuideAdvanced, !0)
                        })
                    },
                    goToStep = function (e) {
                        var t = e && e.step;
                        if (t || (t = findStepForGuideEvent(e)), !t) return void log("[goToStep] missing current step", ["guides", "error"]);
                        var n = e && e.params,
                            i = _.find(n, function (e) {
                                return "goToStepId" === e.name
                            }),
                            r = i && i.value;
                        if (e && e.destinationStepId && (r = e.destinationStepId), !r) return void log("[goToStep] missing step id to go to", ["guides", "error"]);
                        if (r === t.id) return void log("[goToStep] step id matches the current step", ["guides", "error"]);
                        var o = pendo.findGuideById(t.guideId),
                            a = _.find(o.steps, function (e) {
                                return e.id === r
                            });
                        if (!a) return void log("[goToStep] guide has no step matching the step id", ["guides", "error"]);
                        var s = _.indexOf(o.steps, a),
                            d = _.indexOf(o.steps, t);
                        e.steps = Math.abs(s - d), e.action = e.action || "goToStep", e.destinationStepId = r, s > d ? onGuideAdvanced(e, t, !1) : onGuidePrevious(e, t)
                    },
                    onGuideAdvanced = function (e, t, n) {
                        if (cleanupActiveGuide(), 1 === arguments.length && isStepType(e)) {
                            var i = findGuideBy(e.guideId),
                                r = findStepForGuideEvent();
                            i && r && _.first(i.steps).id === r.id && _.last(i.steps).id === e.id && (log("Cannot skip to last step from first step"), e = null)
                        }
                        if (log("onGuideAdvanced called", "guides"), t = findStepForGuideEvent(e, t), !t) return log("missing step.  can't advance", ["guides", "error"]), stopGuides(), void writeMessage("onGuideAdvanced: missing step");
                        if (!checkLockedStep(t)) {
                            var o = e && e.action && "goToStep" === e.action || !1,
                                a = findGuideById(t.guideId),
                                s = a && a.language,
                                d = a && a.steps && _.indexOf(a.steps, t);
                            if (e && _.isNumber(e.steps) && e.steps > 1 && !o) {
                                var u = e.steps - 1,
                                    l = d + u;
                                l >= a.steps.length && (l = a.steps.length - 1);
                                var c = l;
                                e.skip === !0 && (c = d + 1);
                                for (var p = d; c > p; ++p) t = a.steps[p], advancedGuide(a.id, t.id, pendo.get_visitor_id(), t.seenReason, s, p !== d), writeLastStepSeenCache({
                                    guideId: t.guideId,
                                    guideStepId: t.id,
                                    time: getNow(),
                                    state: "advanced",
                                    seenReason: t.seenReason,
                                    visitorId: pendo.get_visitor_id()
                                }), _updateGuideStepStatus(a.id, t.id, "advanced");
                                return onGuideAdvanced(a.steps[l], t, !0)
                            }
                            var f = t.id,
                                g = t.guideId,
                                h = _.first(a && a.steps),
                                m = h && h.seenReason,
                                v = e && e.destinationStepId;
                            if (!v) {
                                var b = e && _.isNumber(e.steps) && e.steps > 1 ? e.steps : 1,
                                    y = _.isNumber(d) && a && a.steps && a.steps[d + b];
                                v = y && y.id || null
                            }
                            v || log("missing destination step id"), log("advancing guide"), advancedGuide(g, f, pendo.get_visitor_id(), m, s, n, v), log("update guide status"), _updateGuideStepStatus(g, f, "advanced");
                            var w = (new Date).getTime(),
                                S = _.isFunction(t.getGuide) && t.getGuide(),
                                E = S && S.attributes && S.attributes.doNotResume;
                            E || writeLastStepSeenCache({
                                guideId: g,
                                guideStepId: f,
                                time: w,
                                state: "advanced",
                                seenReason: m,
                                visitorId: pendo.get_visitor_id(),
                                destinationStepId: v
                            }), h && "auto" === h.seenReason && writeThrottlingStateCache(w, THROTTLING_STATE.ADVANCED), log("stop guide"), stopGuides(), log("start guides"), startGuides()
                        }
                    },
                    onGuidePrevious = function (e, t) {
                        if (t = findStepForGuideEvent(e, t), !t) return stopGuides(), void writeMessage("onGuidePrevious: missing step");
                        var n = t.guideId,
                            i = findGuideById(n),
                            r = e && e.action && "goToStep" === e.action || !1,
                            o = _.indexOf(i.steps, t);
                        if (0 !== o) {
                            var a = "element" == t.advanceMethod ? "click" : "mouseover",
                                s = pendo.getElementForGuideStep(t);
                            "tooltip" === t.type && _.isFunction(t.teardownElementEvent) ? t.teardownElementEvent(s, a) : detachEvent(s, a, onGuideAdvanced, !0);
                            var d = e && _.isNumber(e.steps) ? e.steps : 1,
                                u = _.first(i && i.steps),
                                l = o - d,
                                c = l >= 0 ? i.steps[l] : u,
                                p = u && u.seenReason,
                                f = i && i.language,
                                g = c.id;
                            r && e && e.destinationStepId && (g = e.destinationStepId), g || log("missing destination step id"), log("advancing guide"), advancedGuide(n, t.id, pendo.get_visitor_id(), p, f, !1, g), log("update guide status"), _updateGuideStepStatus(t.guideId, t.id, "advanced");
                            var h = (new Date).getTime(),
                                m = _.isFunction(t.getGuide) && t.getGuide(),
                                v = m && m.attributes && m.attributes.doNotResume;
                            v || writeLastStepSeenCache({
                                guideId: t.guideId,
                                guideStepId: t.id,
                                time: h,
                                state: "advanced",
                                seenReason: p,
                                visitorId: pendo.get_visitor_id(),
                                destinationStepId: g
                            }), stopGuides(), startGuides()
                        }
                    };
                pendo._addCredits = function (e) {
                    if (!dom("._pendo-credits_", e).length) {
                        var t = dom("<div>").addClass("_pendo-credits_").html('<img src="' + getAssetHost() + '/img/tiny-logo.png" />').css({
                            bottom: 0,
                            right: pendo.TOOLTIP_ARROW_SIZE
                        });
                        activeElements.push(t[0]), t.appendTo(e)
                    }
                };
                var getElementForGuideStep = function (e) {
                        if (!e) return log("Can't get element for null step"), null;
                        var t = e.getGuide(),
                            n = "building-block" === get(t, "attributes.type"),
                            i = n || !isWalkthrough(t);
                        return !e.overrideElement && i && (e.overrideElement = findBadgeForStep(e)), e.targetElement = getElementForTargeting(e), e.overrideElement ? e.overrideElement : e.targetElement
                    },
                    getElementForTargeting = function (e) {
                        try {
                            var t, n = e.elementPathRule || null;
                            return t = n ? Sizzle(n) : [getBody()], 0 === t.length ? null : _.first(t);
                        } catch (i) {
                            log("Invalid selector expression")
                        }
                    },
                    canStepBeRendered = function (e) {
                        if (isDismissedUntilReload(e)) return !1;
                        if (!e.elementPathRule && ("lightbox" === e.type || "whatsnew" === e.type)) return !0;
                        var t = getElementForGuideStep(e),
                            n = e.targetElement;
                        if (n && e.elementContainsRulesList && !doesElementMatchContainsRules(n, e.elementContainsRulesList)) return !1;
                        var i = "tooltip" === e.type || BuildingBlockGuides.isBuildingBlockGuideRelativeToElement(e),
                            r = isElementVisible(t);
                        return i ? e.hasBeenScrolledTo ? r : r || wouldBeVisibleAfterAutoScroll(t) : r
                    },
                    getStepDivId = function (e) {
                        return GUIDE_ID_PREFIX + e.id
                    },
                    setupWatchOnElement = function (e) {
                        var t = e.element,
                            n = _.first(Sizzle("#" + getStepDivId(e)));
                        if (t && n) {
                            var i = isElementVisible(t);
                            if (i || dom.hasClass(n, "mouseover")) return void setTimeout(function () {
                                setupWatchOnElement(e)
                            }, DEFAULT_TIMER_LENGTH);
                            e.hide ? (e.hide(), isGuideShown() || (stopGuides(), startGuides())) : (stopGuides(), startGuides())
                        } else !t && n && (e.hide ? (e.hide(), isGuideShown() || (stopGuides(), startGuides())) : (stopGuides(), startGuides()))
                    },
                    showPreview = function () {
                        return !1
                    },
                    findBadgeForStep = function (e) {
                        var t = pendo.badgesShown[e.guideId];
                        if (t) {
                            var n = t.element();
                            if (isInDocument(n) && n.id === "_pendo-badge_" + e.id) return n
                        }
                    },
                    showGuide = function (e, t) {
                        if (!e || !e.guideId) return !1;
                        var n = findGuideById(e.guideId);
                        if (!n) return !1;
                        if (isGuideShown()) {
                            var i = findStepForGuideEvent();
                            removeGuideEventListeners(i);
                            var r = n && n.attributes && n.attributes.resourceCenter;
                            r || (hideGuides(), store.dispatch("frames/hideGuides"))
                        }
                        return n.launch(t), n.isShown()
                    },
                    controlledGuide = function (e, t, n, i, r, o) {
                        var a = createGuideEvent({
                            type: "guideNotSeen",
                            guideId: e,
                            stepId: t,
                            visitorId: n,
                            reason: i,
                            language: r
                        });
                        o && _.extend(a.props, {
                            step_poll_types: o
                        }), stageGuideEvent(a)
                    },
                    seenGuide = function (e, t, n, i, r, o) {
                        i || (writeException(new Error("seenGuide called without seen reason"), "pendo.io guideSeen exception", {
                            guideId: e,
                            stepId: t
                        }), i = getDefaultSeenReason(findGuideById(e)));
                        var a = createGuideEvent({
                            type: "guideSeen",
                            guideId: e,
                            stepId: t,
                            visitorId: n,
                            reason: i,
                            language: r
                        });
                        _.extend(a.props, o), stageGuideEvent(a), writeLastStepSeenCache({
                            guideId: e,
                            guideStepId: t,
                            time: getNow(),
                            state: "active",
                            seenReason: i,
                            visitorId: pendo.get_visitor_id()
                        }), Events.guideSeen.trigger(a)
                    },
                    THROTTLING_STATE = {
                        DISMISSED: "latestDismissedAutoAt",
                        SNOOZED: "latestSnoozedAutoAt",
                        ADVANCED: "finalAdvancedAutoAt"
                    },
                    stagedEventsTimer = null,
                    startStagedTimer = function (e) {
                        window.clearTimeout(stagedEventsTimer), stagedEventsTimer = window.setTimeout(processGuideEventCache, e)
                    },
                    stageGuideEvent = function (e, t, n) {
                        t = t || 500, e.props.duration = n ? 0 : (new Date).getTime() - seenTime, guideEventQueue.push(e), startStagedTimer(t)
                    },
                    getNextStepInMultistep = function (e, t) {
                        if ("dismissed" === e.state) return null;
                        var n = findGuideById(e.guideId);
                        return n.nextStep(e, t || pendo.getCurrentUrl())
                    },
                    shouldAutoDisplayGuide = function (e, t) {
                        var n = findGuideById(e && e.id);
                        return n ? n.shouldAutoDisplay(t) : !1
                    };
                pendo.getCurrentUrl = function () {
                    return pendo.normalizedUrl || pendo.url.get()
                };
                var isBadge = function (e) {
                        return e && e.launchMethod && e.launchMethod.indexOf("badge") >= 0
                    },
                    isWalkthrough = function (e) {
                        return e && e.isMultiStep && !(e.attributes && "group" === e.attributes.type)
                    };
                pendo.testUrlForStep = function (e, t) {
                    if (!pendo.doesExist(e)) return !0;
                    var n = new RegExp(e),
                        i = null,
                        r = t.indexOf("?");
                    if (-1 == r) i = t;
                    else {
                        var o = t.substr(0, r),
                            a = t.substr(r + 1),
                            s = a.split("&");
                        i = o + "?" + s.sort().join("&")
                    }
                    return n.test(i)
                }, pendo.showGuideByName = function (e, t) {
                    var n = pendo.findGuideByName(e);
                    if (n) {
                        var i = showGuide(_.first(n.steps), t || "api");
                        return !i && n.control && log(controlGuideLogMessage), i
                    }
                    return !1
                }, pendo.showGuideById = function (e, t) {
                    var n = pendo.findGuideById(e);
                    if (n) {
                        var i = showGuide(_.first(n.steps), t || "api");
                        return !i && n.control && log(controlGuideLogMessage), i
                    }
                    return !1
                };
                var isMobileUserAgent = function () {
                        return isPreviewing() && getScreenDimensions().width <= 320 ? !0 : /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(getUA())
                    },
                    isPreviewing = function () {
                        return "undefined" != typeof selmo && !!selmo.isPreviewing
                    },
                    resetPendoUI = function () {
                        stopGuides(), clearLoopTimer(), BuildingBlockResourceCenter.removeNotificationBubble(), removeAllBadges(), DOMActivation.reset(), hideLauncher(), flushLater()
                    },
                    resetPendoContent = function () {
                        pendo.guides && (activeGuides.length = 0, pendo.guides.length = 0, all_ob_guides.length = 0), clearMode()
                    },
                    loadGuideJs = function () {
                        var e, t;
                        return function (n, i, r) {
                            var o = getPendoConfigValue("trainingPartner"),
                                a = _.uniqueId();
                            if (e = a, !isMetadataBlocked()) {
                                var s = getMetadata();
                                s ? (log("sending metadata: " + JSON.stringify(s), ["guides", "metadata"]), i.metadata = s) : log("no metadata to send", ["guides", "metadata"])
                            }
                            var d = pendo.compress(i),
                                u = {
                                    jzb: d,
                                    v: VERSION,
                                    ct: (new Date).getTime()
                                };
                            if (o && i.accountId && "ACCOUNT-UNIQUE-ID" !== i.accountId && (u.acc = base64EncodeString(i.accountId)), isDebuggingEnabled(!0) && (u.debug = !0), isInDesignerPreviewMode()) return void r.apply(this, arguments);
                            var l = previewGuideLoaderWrapper(GuideLoader, pendoLocalStorage),
                                c = l.buildUrl(n, u),
                                p = 1e3;
                            c.length > p && (debug("Max length exceeded for a guide.js request"), i.url = limitURLSize(p, i.url), u.jzb = pendo.compress(i), c = l.buildUrl(n, u));
                            var f, g = function () {
                                    a === e ? (r.apply(this, arguments), t = backupObjectState(pendo, ["guides", "normalizedUrl", "lastGuideStepSeen", "guideWidget", "throttling", "autoOrdering", "olark", "globalJsUrl", "segmentFlags", "latestDismissedAutoAt", "finalAdvancedAutoAt"])) : _.isFunction(t) && t()
                                },
                                h = getJwtInfoCopy();
                            if (c.length > URL_MAX_LENGTH || !_.isEmpty(h)) {
                                delete u.jzb, c = buildBaseDataUrl("guide.json", n, u);
                                var m = _.extend({
                                    events: d
                                }, h);
                                f = postLoadGuideJs(c, m, g)
                            } else f = l.load(c, g);
                            return f["catch"](function (e) {
                                return 451 === e.status && (pendo.stopGuides(), pendo.stopSendingEvents(), log("not tracking visitor due to 451 response")), sendPreviewModeFailureMessage(document, e), q.reject(e)
                            })
                        }
                    }(),
                    shouldLoadGlobalCSS = function () {
                        var e = getOption("disableGlobalCSS");
                        return _.isBoolean(e) ? !e : !getPendoConfigValue("disableGlobalCSS", !1)
                    },
                    loadGuides = function (e, t, n, i) {
                        var r, o = q.defer(),
                            a = !1;
                        log("loading guides for " + n + "...", "guides"), e = e || pendo.apiKey, t = t || pendo.get_visitor_id(), n = pendo.url.externalizeURL(n);
                        var s = loadGuides.lastVisitorId === t ? saveGuideShownState(activeGuides) : _.noop;
                        if (loadGuides.lastVisitorId = t, resetPendoUI(), resetPendoContent(), !isURLValid(getURL())) return log("bad url:  probably local file system", "guides", "error"), _.isFunction(i) && i("error: invalid url"), o.reject(), o.promise;
                        var d = {
                            visitorId: t,
                            accountId: pendo.get_account_id(),
                            url: n
                        };
                        loadGuideJs(e, d, function () {
                            if (!a && isUnlocked()) {
                                pendo.events.deliverablesLoaded(), log("successfully loaded guides for " + n, "guides"), pendo.designerEnabled && "true" !== pendoLocalStorage.getItem("pendo-designer-mode") && pendo.P2AutoLaunch.loadPluginJs(), resetPendoUI(), store.dispatch("guideState/receiveLastGuideStepSeen", pendo.lastGuideStepSeen), prepareDesignerPreviewGuide();
                                var e = preparePreviewLastGuideStepSeen(pendoLocalStorage, pendo.guides, pendo.lastGuideStepSeen);
                                e.visitorId = t, store.dispatch("guideState/updateLastGuideStepSeen", e), activeGuides = _.map(pendo.guides, GuideFactory), activeGuides = preparePreviewGuides(activeGuides), activeGuides = sortGuidesByPriority(activeGuides), setActiveGuides(activeGuides), store.dispatch("guideState/load", agentStorage.read(LAST_STEP_ADVANCED_COOKIE) || JSON.stringify(getPreviewState(pendoLocalStorage))), store.dispatch("guideState/apply"), pendo.latestDismissedAutoAt = applyTimerCache(pendo.latestDismissedAutoAt, agentStorage.read("latestDismissedAutoAt")), pendo.finalAdvancedAutoAt = applyTimerCache(pendo.finalAdvancedAutoAt, agentStorage.read("finalAdvancedAutoAt")), pendo.latestSnoozedAutoAt = applyTimerCache(pendo.latestSnoozedAutoAt, agentStorage.read("latestSnoozedAutoAt")), store.dispatch("healthCheck/init", activeGuides), store.dispatch("frames/changeGuideList", activeGuides), pendo.eventProperties = createEventPropertiesFromFeatures(pendo.features), activeGuides.length ? q.all([loadGuideCss(), loadGlobalScriptOnce(replaceWithContentHost(pendo.globalJsUrl)), loadLauncherContent(upgradeLauncher(pendo.guideWidget, activeGuides)), initializeResourceCenter(pendo.guides), BuildingBlockWatermark.initializeWatermark(pendo.guides), waitForGlobalCssToLoad(5e3)]).then(function () {
                                    initLauncher(), store.getters["frames/isLeader"]() && s(activeGuides), pendo.events.guidesLoaded(), Events.guideLoopStarted.trigger(), startGuides(), DOMActivation.prefetch(activeGuides), BuildingBlockResourceCenter.fetchAnnouncementGuidesContent(activeGuides, store), clearTimeout(r), _.isFunction(i) && i(), o.resolve()
                                }, function () {
                                    pendo.events.guidesFailed(), o.reject()
                                }) : (pendo.events.guidesLoaded(), o.resolve())
                            }
                        });
                        var u = ConfigReader.get("guideTimeout") || ConfigReader.get("guides.timeout");
                        return _.isNumber(u) && (r = setTimeout(function () {
                            a = !0, o.reject()
                        }, u)), o.promise
                    },
                    processGuideEventCache = function (e) {
                        guideEventQueue.flush(e)
                    },
                    getGuideEventCache = function () {
                        return guideEvtCache
                    },
                    guideEventQueue = createGuideEventQueue({
                        cache: guideEvtCache,
                        apiKey: function () {
                            return pendo.apiKey
                        },
                        beacon: "guide",
                        allowPost: !0
                    }),
                    pollEventQueue = createGuideEventQueue({
                        cache: [],
                        apiKey: function () {
                            return pendo.apiKey
                        },
                        beacon: "poll",
                        allowPost: !0
                    }),
                    initializeResourceCenter = function (e) {
                        return pendo.BuildingBlocks.BuildingBlockResourceCenter.initializeResourceCenter(e)
                    },
                    crossFrameChannel = {
                        postMessage: _.noop,
                        close: _.noop
                    },
                    initGuides = function () {
                        guideEventQueue.clear(), ConfigReader.get("preventUnloadListener") !== !0 && (attachEventInternal(window, "unload", function () {
                            processGuideEventCache({
                                guaranteed: !0
                            })
                        }), attachEventInternal(window, "unload", function () {
                            _.isFunction(stopListenToMaster) && stopListenToMaster(), store.dispatch("frames/leave")
                        }));
                        var e = ConfigReader.get("guides.tooltip.arrowSize");
                        if (_.isNumber(e) && (pendo.TOOLTIP_ARROW_SIZE = e), crossFrameChannel = connectChannelToStore(createCrossFrameChannel(store), store), store.dispatch("frames/join"), listenForGuideStateChange(), ConfigReader.get("preferMutationObserver") && pendo.sniffer.MutationObserver) {
                            var t = function () {
                                store.dispatch("guideUpdate/documentChanged")
                            };
                            attachEvent(window, "animationend", t), attachEvent(window, "transitionend", t), badgeIterator.circular = !1, DOMActivation.circular = !1, store.commit("guideUpdate/setUseObserver"), store.commit("guideUpdate/setIterationTimeLimit", 50)
                        }
                    },
                    areGuidesDisabled = function () {
                        return ConfigReader.get("guides.disabled", !1) || ConfigReader.get("disableGuides", !1) || !pendoCore
                    },
                    areGuidesDelayed = function () {
                        return ConfigReader.get("guides.delay", !1) || ConfigReader.get("delayGuides", !1)
                    },
                    setGuidesDisabled = function (e) {
                        originalOptions.disableGuides = e
                    },
                    createEventPropertiesFromFeatures = makeSafe(function (e) {
                        if (e && e.length) {
                            for (var t = [], n = 0; n < e.length; n++) {
                                var i = e[n].featureRule,
                                    r = _.map(e[n].eventProperties, function (e) {
                                        return e.selector ? e : JSON && JSON.parse && e.rule ? JSON.parse(e.rule) : void 0
                                    });
                                t.push({
                                    featureRules: i,
                                    eventPropertyRules: r,
                                    featureId: e[n].featureId
                                })
                            }
                            return t
                        }
                    }),
                    pendoPreview = "pendo-preview",
                    designerPreview = "current-guide-preview",
                    pendoDesignerLaunchKey = "pendo-designer-launch";
                pendo.guidesProcessingThreadHandle = null;
                var DEFAULT_TIMER_LENGTH = 500,
                    waitThenLoop = function (e) {
                        e = e || DEFAULT_TIMER_LENGTH, pendo.guidesProcessingThreadHandle = _.delay(function () {
                            pendo.guidesProcessingThreadHandle = null, startGuides()
                        }, e)
                    },
                    clearLoopTimer = function () {
                        pendo.guidesProcessingThreadHandle && (clearTimeout(pendo.guidesProcessingThreadHandle), pendo.guidesProcessingThreadHandle = null), store.dispatch("guideUpdate/stopScheduledUpdate")
                    },
                    stopGuides = function () {
                        AutoDisplay.reset(), badgeIterator.reset(), DOMActivation.resetIterator(), hideGuides(), store.commit("guideUpdate/completeUpdate", getNow());
                        for (var e = 0; e < activeElements.length; e++) {
                            var t = activeElements[e];
                            t.parentNode.removeChild(t)
                        }
                        activeElements.length = 0, store.dispatch("guideUpdate/stopObserver")
                    },
                    currentMode = "default",
                    modeProcMap = {},
                    registerMode = function (e, t) {
                        modeProcMap[e] = t
                    },
                    setMode = function (e) {
                        return e && "default" != e ? modeProcMap[e] ? void(currentMode = e) : void alert("Bad Mode: " + e) : void(currentMode = "default")
                    },
                    getMode = function () {
                        return currentMode
                    };
                pendo.getMode = getMode;
                var startGuides = function () {
                        if (clearLoopTimer(), areGuidesDisabled()) return void log("guides are disabled.", "guides", "disabled");
                        if (areGuidesDelayed()) return void log("guides are delayed.", "guides", "delayed");
                        if (!store.getters["guideState/tabLostFocus"]()) try {
                            var e = getActiveGuides();
                            if (!e || 0 === e.length) return;
                            store.dispatch("guideUpdate/startObserverIfNeeded"), store.dispatch("guideUpdate/startIteration", getNow()), getLoopProc()(e)
                        } catch (t) {
                            store.commit("guideUpdate/completeUpdate", getNow()), writeException(t, "ERROR in guide-loop")
                        } finally {
                            store.dispatch("guideUpdate/completeIteration", getNow()), continueOrCompleteUpdate()
                        }
                    },
                    manuallyStartGuides = function () {
                        getOption("delayGuides") && delete originalOptions.delayGuides, getOption("guides.delay") && delete originalOptions.guides.delay, startGuides()
                    },
                    getLoopProc = function () {
                        return modeProcMap[currentMode] ? modeProcMap[currentMode] : defaultLoopProc
                    },
                    defaultLoopProc = function (e) {
                        runGuidePhase("badge", function (t) {
                            placeBadgesProc(e) && t()
                        }), runGuidePhase("dom", function (t) {
                            DOMActivation.update(e) && t()
                        }), runGuidePhase("guideCenter", function (t) {
                            launcherProc(e), t()
                        }), runGuidePhase("guideCenter", function (e) {
                            resourceCenterProc(BuildingBlockResourceCenter.getResourceCenter()), e()
                        }), runGuidePhase("frameVisibility", function (e) {
                            store.dispatch("frames/updateFrameVisibility"), e()
                        }), isGuideShown() ? runGuidePhase("guideShowing", function (e) {
                            guideShowingProc(), e()
                        }) : noGuideShowingProc(e), runGuidePhase("preview", function (t) {
                            updatePreview(document, e, getLastGuideStepSeen()), t()
                        }), prefetchBadgeActivatedGuideContent(activeGuides, pendo.badgesShown)
                    },
                    badgeIterator = throttleIterator(50, createStatefulIterator(function (e) {
                        return e.id
                    })),
                    placeBadgesProc = function (e) {
                        var t = _.filter(e, isBadge);
                        return badgeIterator.eachUntil(t, function (e) {
                            e.placeBadge()
                        })
                    },
                    launcherProc = function (e) {
                        if (pendo.guideWidget && pendo.guideWidget.enabled) {
                            var t = getLauncherGuideList(e);
                            updateLauncher(t, !0)
                        }
                    },
                    noGuideShowingProc = function (e) {
                        var t = e.filter(function (e) {
                                return e.isTraining
                            }),
                            n = e.filter(function (e) {
                                return !e.isTraining
                            }),
                            i = ConfigReader.get("adoptPrioritizeAdoptGuides"),
                            r = n,
                            o = t,
                            a = "nonAdopt",
                            s = "adopt";
                        i && (r = t, o = n, a = "adopt", s = "nonAdopt");
                        var d = [function () {
                                return runGuidePhase("overrideAutoDisplay" + a, function (e) {
                                    return AutoDisplay.tryDisplayOverride(r, pendo, e)
                                })
                            }, function () {
                                return runGuidePhase("autoDisplay" + a, function (e) {
                                    return AutoDisplay.tryDisplayAuto(r, pendo, e)
                                })
                            }, function () {
                                return runGuidePhase("overrideAutoDisplay" + s, function (e) {
                                    return AutoDisplay.tryDisplayOverride(o, pendo, e)
                                })
                            }, function () {
                                return runGuidePhase("autoDisplay" + s, function (e) {
                                    return AutoDisplay.tryDisplayAuto(o, pendo, e)
                                })
                            }],
                            u = [function () {
                                return runGuidePhase("autoDisplay" + a, function (e) {
                                    return AutoDisplay.tryDisplay(r, pendo, e)
                                })
                            }, function () {
                                return runGuidePhase("autoDisplay" + s, function (e) {
                                    return AutoDisplay.tryDisplay(o, pendo, e)
                                })
                            }],
                            l = store.state.guideUpdate.useObserver ? d : u;
                        _.find([function () {
                            return runGuidePhase("permalink", function (e) {
                                var t = Permalink.tryDisplay(pendo);
                                return e(), t
                            })
                        }, function () {
                            return runGuidePhase("walkthrough", function (t) {
                                var n = _.find(e, function (e) {
                                        return e.isContinuation(getLastGuideStepSeen())
                                    }),
                                    i = n && n.attributes && n.attributes.doNotResume;
                                return n && !i ? (n.show("continue"), t(), !0) : void t()
                            })
                        }].concat(l), function (e) {
                            return !!e()
                        })
                    },
                    SingletonMessageHandler = createSingletonMessageHandler(window, isTrustedOrigin2),
                    REMOVE_FRAME_ACTION = "frames/removeFrame";
                _.extend(TopFrameRelay.prototype, {
                    init: function (e, t, n) {
                        this._store = e, this._window = t, this._singletonMessageHandler = n, this._ports = {}, this._isTop = this._window == this._window.top, this._listeners = [], this._singletonMessageHandler.addEventListener(_.bind(this._controlMessageHandler, this));
                        var i = getInstallType() === NATIVE_INSTALL_TYPE,
                            r = !!t.__pendoExtensions,
                            o = i && r;
                        this._connectedToExtension = o, (!this._isTop || this._connectedToExtension) && this._connectToTop(250, 21)
                    },
                    _controlMessageHandler: function (e) {
                        var t = tryParseJson(e.data);
                        if (t) {
                            if ("pendo::connect" === t.action) {
                                var n = this._createMessagePort({
                                    ports: e.ports,
                                    destination: e.source,
                                    destinationId: t.frameId
                                });
                                this._ports[t.frameId] = n, n.addEventListener("message", _.bind(this._topMessageHandler, this, n)), n.start(), n.postMessage({
                                    action: "pendo::connectSuccess"
                                })
                            }
                            t.action === REMOVE_FRAME_ACTION && this._topMessageHandler(null, e)
                        }
                    },
                    _topMessageHandler: function (e, t) {
                        t.data && (/^pendo::/.test(t.data.action) || this._closed || (t.data.action === REMOVE_FRAME_ACTION && delete this._ports[t.data.frameId], _.each(this._ports, function (n) {
                            e !== n && n.postMessage(t.data)
                        }), e !== this && _.each(this._listeners, function (e) {
                            e(t)
                        })))
                    },
                    _openChannel: function () {
                        this._channel = this._createMessageChannel({
                            destination: this._window.top,
                            sourceId: this._store.state.frames.frameId
                        }), this._port = this._channel.port1, this._boundFrameConnectHandler = _.bind(this._frameConnectHandler, this), this._port.addEventListener("message", this._boundFrameConnectHandler), this._port.start()
                    },
                    _closeChannel: function () {
                        this._port && _.isFunction(this._port.close) && (this._port.close(), this._port = null, this._channel = null)
                    },
                    _connectToTop: function (e, t) {
                        this._closeChannel(), this._openChannel();
                        var n = [];
                        this._channel.port2 && n.push(this._channel.port2), this._window.top.postMessage(JSON.stringify({
                            action: "pendo::connect",
                            frameId: this._store.state.frames.frameId
                        }), "*", n), setTimeout(_.bind(function () {
                            this._connected || (this._closeChannel(), 0 === t ? this._store.commit("frames/setConnectFailed") : t > 0 && this._connectToTop(Math.min(2 * e, 1e4), t - 1))
                        }, this), e)
                    },
                    _frameConnectHandler: function (e) {
                        e.data && "pendo::connectSuccess" === e.data.action && (this._connected = !0, this._port.removeEventListener("message", this._boundFrameConnectHandler), _.each(this._listeners, function (e) {
                            this._port.addEventListener("message", e)
                        }, this), this._listeners.length = 0, this._store.dispatch("frames/join"))
                    },
                    _createMessageChannel: function (e) {
                        if (_.isFunction(this._window.MessageChannel)) return new this._window.MessageChannel;
                        var t = this._createMessagePort(e);
                        return {
                            port1: t
                        }
                    },
                    _createMessagePort: function (e) {
                        function t(e, t) {
                            return e ? function (n) {
                                get(n, "data._sourceFrameId") == e && t.apply(this, arguments)
                            } : t
                        }

                        function n(e) {
                            return function (t) {
                                if (_.isString(t.data)) {
                                    var n = _.pick(t, "type", "origin", "source", "ports", "lastEventId");
                                    n.data = tryParseJson(t.data), e.call(this, n)
                                } else e.apply(this, arguments)
                            }
                        }
                        if (e.ports && e.ports.length) return e.ports[0];
                        var i = e.destination,
                            r = e.destinationId,
                            o = e.sourceId,
                            a = this._singletonMessageHandler,
                            s = [],
                            d = [];
                        return {
                            start: _.noop,
                            close: function () {
                                this._closed = !0, _.each(s, function (e) {
                                    this.removeEventListener("message", e)
                                }, this), s.length = 0, d.length = 0
                            },
                            addEventListener: function (e, i) {
                                if ("message" === e) {
                                    var o = n(t(r, i));
                                    s.push(i), d.push(o), a.addEventListener(o)
                                }
                            },
                            removeEventListener: function (e, t) {
                                var n = s.indexOf(t);
                                0 > n || (a.removeEventListener(d[n]), d.splice(n, 1), s.splice(n, 1))
                            },
                            postMessage: function (e) {
                                if (!this._closed) {
                                    var t = JSON.stringify(_.extend({
                                        _sourceFrameId: o
                                    }, e));
                                    i.postMessage(t, "*")
                                }
                            }
                        }
                    },
                    addEventListener: function (e, t) {
                        "message" === e && (this._isTop && !this._connectedToExtension ? this._listeners.push(t) : this._connected ? this._port.addEventListener(e, t) : this._listeners.push(t))
                    },
                    postMessage: function (e) {
                        this._closed || (this._isTop && !this._connectedToExtension ? this._topMessageHandler(this, {
                            data: e
                        }) : this._port && this._port.postMessage(e), e.action === REMOVE_FRAME_ACTION && this._window.top.postMessage(e, "*"))
                    },
                    close: function () {
                        this._closed = !0, this._listeners.length = 0, _.each(this._ports, function (e) {
                            e.close()
                        }), this._ports = {}, this._port && _.isFunction(this._port.close) && this._port.close()
                    }
                });
                var ErrorLogModule = function () {
                        var e = {
                                errorCount: 0,
                                errors: {}
                            },
                            t = {
                                write: function (e, t) {
                                    t && t.message && (e.getters.hasLogged()(t) || e.commit("addError", t), e.commit("incrementError", t))
                                }
                            },
                            n = {
                                addError: function (e, t) {
                                    e.errors[t.message] = {
                                        count: 0,
                                        stack: t.stack
                                    }
                                },
                                incrementError: function (e, t) {
                                    e.errors[t.message].count++, e.errorCount++
                                }
                            },
                            i = {
                                hasLogged: function (e) {
                                    return function (t) {
                                        return !!e.errors[t.message]
                                    }
                                }
                            };
                        return {
                            state: e,
                            actions: t,
                            mutations: n,
                            getters: i
                        }
                    }(),
                    PASSIVE_MODE = "passive",
                    PAUSED_MODE = "paused",
                    FramesModule = function () {
                        function e(e) {
                            var t = _.pick(e, "id", "name", "launchMethod", "isMultiStep", "steps", "control");
                            return t.attributes = _.pick(e.attributes, "overrideAutoThrottling", "priority", "isAnnouncement"), t._shouldBeAddedToLauncher = _.isFunction(e.shouldBeAddedToLauncher) ? e.shouldBeAddedToLauncher() : !1, t._shouldBeAddedToResourceCenter = _.isFunction(e.shouldBeAddedToResourceCenter) ? e.shouldBeAddedToResourceCenter() : !1, t.steps = _.map(e.steps, function (e) {
                                return _.pick(e, "id", "guideId", "type", "seenReason", "seenState", "snoozeEndTime", "regexUrlRule", "elementPathRule")
                            }), t
                        }

                        function t(t) {
                            return _.map(t, e)
                        }
                        var n = {},
                            i = EventTracer.addTracerIds({}),
                            r = {
                                frameId: i.frameId,
                                leaderId: null,
                                tabId: i.tabId,
                                agentInstallType: getInstallType(),
                                leadershipMode: getInstallType(),
                                topId: null,
                                frames: {},
                                guidesLoaded: !1
                            },
                            o = {
                                changeGuideList: function (e, n) {
                                    var i = e.state,
                                        r = t(n);
                                    crossFrameChannel.postMessage({
                                        action: "frames/receiveGuideList",
                                        frameId: i.frameId,
                                        tabId: i.tabId,
                                        guides: r
                                    })
                                },
                                receiveGuideList: function (e, t) {
                                    e.getters.isCurrentTab()(t.tabId) && (e.commit("setGuideList", t), t.frameId === e.state.frameId && e.commit("setGuidesLoaded"), updateMasterGuideList(e.state))
                                },
                                join: function (e) {
                                    if (!e.state.disabled) {
                                        stopGuides(), registerMode(PASSIVE_MODE, guidePassiveRenderer), registerMode(PAUSED_MODE, _.noop), setMode(PAUSED_MODE);
                                        var n = e.state,
                                            i = window.top == window,
                                            r = n.frames[n.frameId];
                                        e.commit("removeFrame", n.frameId), e.commit("setGuideList", {
                                            frameId: n.frameId,
                                            guides: t(getActiveGuides())
                                        }), e.dispatch("receiveFrame", {
                                            tabId: n.tabId,
                                            frame: _.extend({
                                                agentInstallType: n.agentInstallType,
                                                id: n.frameId,
                                                joinedAt: getNow(),
                                                isTop: i,
                                                visibility: i ? "visible" : "unknown"
                                            }, r)
                                        })
                                    }
                                },
                                receiveFrame: function (e, t) {
                                    if (e.getters.isCurrentTab()(t.tabId)) {
                                        var n = e.state;
                                        if (!n.frames[t.frame.id] || !n.frames[t.frame.id].id) {
                                            e.commit("addFrame", t.frame);
                                            var i = e.getters.inExtensionLeadershipMode(),
                                                r = t.frame.agentInstallType === EXTENSION_INSTALL_TYPE,
                                                o = i && r && t.frame.isTop,
                                                a = !i && t.frame.isTop;
                                            (o || a) && e.commit("setTopId", t.frame.id), e.commit("setLeadershipMode", t.frame.agentInstallType), crossFrameChannel.postMessage({
                                                action: "frames/receiveFrame",
                                                tabId: n.tabId,
                                                frame: n.frames[n.frameId]
                                            }), e.dispatch("waitThenElectLeader")
                                        }
                                    }
                                },
                                leave: function (e) {
                                    var t = e.state;
                                    crossFrameChannel.postMessage({
                                        action: "frames/removeFrame",
                                        frameId: t.frameId,
                                        tabId: t.tabId
                                    }), _.each(t.frames, function (t) {
                                        e.commit("removeFrame", t.id)
                                    }), crossFrameChannel.close(), clearMode()
                                },
                                removeFrame: function (e, t) {
                                    e.getters.isCurrentTab()(t.tabId) && e.getters.hasFrame()(t.frameId) && (e.commit("removeFrame", t.frameId), _.each(n, function (e, i) {
                                        0 === i.indexOf(t.frameId + "/") && (e.reject(), delete n[i])
                                    }), e.dispatch("electLeader"))
                                },
                                waitThenElectLeader: _.debounce(function (e) {
                                    e.dispatch("electLeader")
                                }, 50),
                                electLeader: function (e) {
                                    var t = e.state;
                                    if (t.topId) e.dispatch("followLeader", {
                                        tabId: t.tabId,
                                        leaderId: t.topId
                                    });
                                    else {
                                        var n = _.min(t.frames, "joinedAt");
                                        e.dispatch("followLeader", {
                                            tabId: t.tabId,
                                            leaderId: n.id
                                        })
                                    }
                                    updateMasterGuideList(e.state)
                                },
                                followLeader: function (e, t) {
                                    if (e.getters.isCurrentTab()(t.tabId)) {
                                        e.commit("setLeaderId", t.leaderId), e.dispatch("setRenderMode");
                                        var n = {
                                            ignoreLocalStorageNavigation: /pendo-/.test(window.name)
                                        };
                                        localStorageNavigation(n)
                                    }
                                },
                                setRenderMode: function (e) {
                                    setMode(e.getters.isLeader() ? "default" : PASSIVE_MODE)
                                },
                                showGuideStep: function (e, t) {
                                    function n() {
                                        var r = i.shift();
                                        return r ? e.dispatch("requestShowGuideStepInFrame", _.extend({
                                            frameId: r.id
                                        }, t)).then(function (e) {
                                            return e.error ? q.reject(e.error) : e.isShown ? e : n()
                                        }) : q.resolve({
                                            isShown: !1
                                        })
                                    }
                                    var i = _.filter(e.state.frames, function (n) {
                                        return n.id !== e.state.frameId && "hidden" !== n.visibility && n.guides && n.guides[t.guideId]
                                    });
                                    return n()
                                },
                                requestShowGuideStepInFrame: function (e, t) {
                                    var i = t.frameId + "/" + pendo.randomString(32),
                                        r = q.defer();
                                    return n[i] = r, crossFrameChannel.postMessage(_.extend({
                                        action: "frames/showGuideStepInFrame",
                                        tabId: e.state.tabId,
                                        requestId: i
                                    }, t)), r.promise
                                },
                                showGuideStepInFrame: function (e, t) {
                                    if (e.getters.isCurrentTab()(t.tabId) && e.state.frameId === t.frameId) {
                                        var n = findGuideById(t.guideId),
                                            i = n && n.findStepById(t.stepId);
                                        if (i) {
                                            var r = GuideDisplay.showLocal(i, t.reason).then(function (n) {
                                                e.dispatch("guideStepShownInFrame", {
                                                    action: "frames/receiveGuideStepShownInFrame",
                                                    requestId: t.requestId,
                                                    guideId: t.guideId,
                                                    stepId: t.stepId,
                                                    isShown: n
                                                })
                                            });
                                            r && r["catch"] && r["catch"](_.noop)
                                        } else e.dispatch("guideStepShownInFrame", {
                                            action: "frames/receiveGuideStepShownInFrame",
                                            requestId: t.requestId,
                                            guideId: t.guideId,
                                            stepId: t.stepId,
                                            isShown: !1
                                        })
                                    }
                                },
                                guideStepShownInFrame: function (e, t) {
                                    e.commit("setStepShown", {
                                        frameId: e.state.frameId,
                                        stepId: t.stepId,
                                        shown: t.isShown
                                    }), crossFrameChannel.postMessage(_.extend({
                                        action: "frames/receiveGuideStepShownInFrame",
                                        tabId: e.state.tabId,
                                        frameId: e.state.frameId
                                    }, t))
                                },
                                receiveGuideStepShownInFrame: function (e, t) {
                                    if (e.getters.isCurrentTab()(t.tabId)) {
                                        var i = n[t.requestId];
                                        i && (i.resolve(t), delete n[t.requestId]), e.getters.isShownInFrame()(t.frameId, {
                                            id: t.stepId
                                        }) !== t.isShown && e.commit("setStepShown", {
                                            frameId: t.frameId,
                                            stepId: t.stepId,
                                            shown: t.isShown
                                        })
                                    }
                                },
                                hideGuides: function (e) {
                                    crossFrameChannel.postMessage({
                                        action: "frames/receiveHideGuides",
                                        tabId: e.state.tabId,
                                        frameId: e.state.frameId
                                    }), e.commit("hideGuides")
                                },
                                receiveHideGuides: function (e, t) {
                                    e.getters.isCurrentTab()(t.tabId) && e.state.frameId !== t.frameId && (hideGuides(), e.commit("hideGuides"))
                                },
                                guideStepHiddenInFrame: function (e, t) {
                                    var n = e.getters.isShownInFrame()(e.state.frameId, {
                                        id: t.stepId
                                    });
                                    e.commit("setStepShown", {
                                        frameId: e.state.frameId,
                                        stepId: t.stepId,
                                        shown: !1
                                    }), crossFrameChannel.postMessage(_.extend({
                                        action: "frames/receiveGuideStepHiddenInFrame",
                                        tabId: e.state.tabId,
                                        frameId: e.state.frameId
                                    }, t)), n && e.dispatch("fixDoubleDisplay", t)
                                },
                                receiveGuideStepHiddenInFrame: function (e, t) {
                                    e.getters.isCurrentTab()(t.tabId) && e.state.frameId !== t.frameId && e.getters.isShownInFrame()(t.frameId, {
                                        id: t.stepId
                                    }) && e.commit("setStepShown", {
                                        frameId: t.frameId,
                                        stepId: t.stepId,
                                        shown: !1
                                    })
                                },
                                fixDoubleDisplay: function (e, t) {
                                    _.each(e.state.frames, function (n, i) {
                                        i !== e.state.frameId && e.getters.isShownInFrame()(i, {
                                            id: t.stepId
                                        }) && crossFrameChannel.postMessage(_.extend({
                                            action: "frames/receiveHideGuideInFrame",
                                            tabId: e.state.tabId,
                                            frameId: i,
                                            guideId: t.guideId,
                                            stepId: t.stepId
                                        }, t))
                                    })
                                },
                                receiveHideGuideInFrame: function (e, t) {
                                    if (e.getters.isCurrentTab()(t.tabId) && e.state.frameId === t.frameId) {
                                        var n = pendo.findGuideById(t.guideId),
                                            i = n && n.findStepById(t.stepId);
                                        i && i.hide()
                                    }
                                },
                                changeLastGuideStepSeen: function (e, t) {
                                    crossFrameChannel.postMessage({
                                        action: "frames/receiveLastGuideStepSeen",
                                        tabId: e.state.tabId,
                                        frameId: e.state.frameId,
                                        lastGuideStepSeen: t
                                    }), e.commit("updateLastGuideStepSeen", t), e.commit("healthCheck/updateStepState", {
                                        id: t.guideStepId,
                                        seenState: t.state
                                    }, {
                                        root: !0
                                    })
                                },
                                receiveLastGuideStepSeen: function (e, t) {
                                    if (e.getters.isCurrentTab()(t.tabId) && t.frameId !== e.state.frameId) {
                                        e.dispatch("guideState/updateLastGuideStepSeen", t.lastGuideStepSeen, {
                                            root: !0
                                        }), e.dispatch("guideState/write", null, {
                                            root: !0
                                        });
                                        var n = e.rootState.guideState.lastGuideStepSeen,
                                            i = pendo.findGuideById(n.guideId),
                                            r = i && i.findStepById(n.guideStepId);
                                        r && (r.seenState = n.state, r.seenReason = n.seenReason, n.snoozeEndTime && (r.snoozeEndTime = n.snoozeEndTime), e.commit("updateLastGuideStepSeen", n), e.commit("healthCheck/updateStepState", r, {
                                            root: !0
                                        }))
                                    }
                                },
                                changeThrottlingState: function (e, t) {
                                    crossFrameChannel.postMessage(_.extend({
                                        action: "frames/receiveThrottlingState",
                                        tabId: e.state.tabId,
                                        frameId: e.state.frameId
                                    }, t))
                                },
                                receiveThrottlingState: function (e, t) {
                                    e.getters.isCurrentTab()(t.tabId) && t.frameId !== e.state.frameId && _.each(THROTTLING_STATE, function (e) {
                                        t[e] && _writeThrottlingStateCache(t[e], e)
                                    })
                                },
                                startPreview: function () {
                                    crossFrameChannel.postMessage({
                                        action: "frames/receiveStartPreview",
                                        "pendo-preview": pendoLocalStorage.getItem(pendoPreview)
                                    })
                                },
                                restartPreview: function () {
                                    crossFrameChannel.postMessage({
                                        action: "frames/receiveRestartPreview",
                                        "pendo-preview": pendoLocalStorage.getItem(pendoPreview)
                                    })
                                },
                                stopPreview: function () {
                                    crossFrameChannel.postMessage({
                                        action: "frames/receiveStopPreview"
                                    })
                                },
                                receiveStartPreview: function (e, t) {
                                    pendoLocalStorage.setItem(pendoPreview, t[pendoPreview]), forceGuideReload()
                                },
                                receiveRestartPreview: function (e, t) {
                                    pendoLocalStorage.setItem(pendoPreview, t[pendoPreview]);
                                    var n = restartPreview(pendoLocalStorage, activeGuides, getLastGuideStepSeen());
                                    store.dispatch("guideState/updateLastGuideStepSeen", n, {
                                        root: !0
                                    })
                                },
                                receiveStopPreview: function () {
                                    exitPreviewMode()
                                },
                                updateFrameVisibility: function (e, t) {
                                    if (!e.getters.isTop() && !e.state.disableFrameVisibilityCheck) try {
                                        var n = "unknown";
                                        null == t && (t = window.frameElement), t && (n = isElementVisible(t) ? "visible" : "hidden"), e.getters.frameVisibility() !== n && (e.commit("setFrameVisibility", {
                                            frameId: e.state.frameId,
                                            visibility: n
                                        }), crossFrameChannel.postMessage({
                                            action: "frames/receiveFrameVisibility",
                                            frameId: e.state.frameId,
                                            visibility: n
                                        }))
                                    } catch (i) {
                                        e.commit("disableFrameVisibilityCheck")
                                    }
                                },
                                receiveFrameVisibility: function (e, t) {
                                    e.commit("setFrameVisibility", t)
                                },
                                addSelectionModeToFrames: function (e, t) {
                                    var n = t.options;
                                    pendo.designerv2.launchInAppDesigner(n)
                                }
                            },
                            a = {
                                addFrame: function (e, t) {
                                    var n = t.id;
                                    e.frames[n] = _.extend({}, e.frames[n], t)
                                },
                                removeFrame: function (e, t) {
                                    delete e.frames[t]
                                },
                                setGuideList: function (e, t) {
                                    var n = t.frameId;
                                    e.frames[n] = _.extend({}, e.frames[n], {
                                        guides: _.indexBy(t.guides, "id")
                                    })
                                },
                                setStepShown: function (e, t) {
                                    var n = t.frameId,
                                        i = e.frames[n] = _.extend({}, e.frames[n]);
                                    i.shown = _.extend({}, i.shown), i.shown[t.stepId] = t.shown
                                },
                                setLeaderId: function (e, t) {
                                    e.leaderId = t
                                },
                                setTabId: function (e, t) {
                                    e.tabId = t
                                },
                                setTopId: function (e, t) {
                                    e.topId = t
                                },
                                setLeadershipMode: function (e, t) {
                                    e.leadershipMode !== EXTENSION_INSTALL_TYPE && (e.leadershipMode = t)
                                },
                                setFrameVisibility: function (e, t) {
                                    var n = t.frameId;
                                    e.frames[n] = _.extend({}, e.frames[n], {
                                        visibility: t.visibility
                                    })
                                },
                                disableFrameVisibilityCheck: function (e) {
                                    e.disableFrameVisibilityCheck = !0
                                },
                                hideGuides: function (e) {
                                    _.each(e.frames, function (e) {
                                        _.each(e.shown, function (t, n) {
                                            e.shown[n] = !1
                                        })
                                    })
                                },
                                setChannelType: function (e, t) {
                                    e.channelType = t
                                },
                                setGuidesLoaded: function (e) {
                                    e.guidesLoaded = !0
                                },
                                setConnectFailed: function (e) {
                                    e.connectFailed = !0
                                },
                                updateLastGuideStepSeen: function (e, t) {
                                    t && _.each(e.frames, function (e) {
                                        if (e.guides) {
                                            var n = e.guides[t.guideId];
                                            if (n) {
                                                var i = _.findWhere(n.steps, {
                                                    id: t.guideStepId
                                                });
                                                i && (i.seenState = t.state, i.seenReason = t.seenReason, t.snoozeEndTime && (i.snoozeEndTime = t.snoozeEndTime))
                                            }
                                        }
                                    })
                                }
                            },
                            s = {
                                isLeader: function (e) {
                                    return e.leaderId === e.frameId
                                },
                                isFollower: function (e) {
                                    return !!e.leaderId && e.leaderId !== e.frameId
                                },
                                inExtensionLeadershipMode: function (e) {
                                    return e.leadershipMode === EXTENSION_INSTALL_TYPE
                                },
                                isCurrentTab: function (e) {
                                    return function (t) {
                                        return "TopFrameRelay" === e.channelType ? !0 : e.tabId === t
                                    }
                                },
                                isTop: function (e) {
                                    return e.topId === e.frameId || window == window.top
                                },
                                frameVisibility: function (e) {
                                    var t = e.frames ? e.frames[e.frameId] : {};
                                    return t.visibility || "unknown"
                                },
                                isGuideInThisFrame: function (e) {
                                    return function (t) {
                                        var n = e.frames && e.frames[e.frameId],
                                            i = n && n.guides || {};
                                        return !!i[t.id]
                                    }
                                },
                                isGuideInDifferentFrame: function (e) {
                                    return function (t) {
                                        return _.any(e.frames, function (n, i) {
                                            return i === e.frameId ? !1 : n.guides && n.guides[t.id]
                                        })
                                    }
                                },
                                isShownInAnotherFrame: function (e) {
                                    return function (t) {
                                        return _.any(e.frames, function (n, i) {
                                            return i === e.frameId ? !1 : n.shown && n.shown[t.id]
                                        })
                                    }
                                },
                                isShownInFrame: function (e) {
                                    return function (t, n) {
                                        var i = e.frames && e.frames[t],
                                            r = i && i.shown || {};
                                        return !(!r || !r[n.id])
                                    }
                                },
                                hasFrame: function (e) {
                                    return function (t) {
                                        return e.frames && e.frames[t]
                                    }
                                },
                                hasFrames: function (e) {
                                    return _.size(e.frames) > 1
                                },
                                shouldBeAddedToLauncher: function (e, t) {
                                    return function (n) {
                                        return t.isLeader() && _.any(e.frames, function (e) {
                                            var t = e.guides && e.guides[n.id];
                                            return t && t._shouldBeAddedToLauncher
                                        })
                                    }
                                },
                                shouldBeAddedToResourceCenter: function (e, t) {
                                    return function (n) {
                                        return t.isLeader() && _.any(e.frames, function (e) {
                                            var t = e.guides && e.guides[n.id];
                                            return t && t._shouldBeAddedToResourceCenter
                                        })
                                    }
                                }
                            };
                        return {
                            actions: o,
                            mutations: a,
                            getters: s,
                            state: r,
                            requests: n
                        }
                    }(),
                    lastLauncherHash, GuideUpdateModule = function () {
                        function e() {
                            store.dispatch("guideUpdate/documentChanged")
                        }

                        function t() {
                            store.dispatch("guideUpdate/handleScheduledUpdate")
                        }
                        var n, i = {
                                useObserver: !1,
                                observing: !1,
                                needsUpdate: !1,
                                scheduledUpdate: null,
                                updateId: null,
                                updateStartTime: null,
                                updateTotalTime: 0,
                                updateCompleteTime: 0,
                                iterationCount: 0,
                                iterationStartTime: null,
                                iterationTimeLimit: 1 / 0,
                                phases: {}
                            },
                            r = {
                                documentChanged: function (e) {
                                    if (e.getters.isUpdating()) return void e.commit("setNeedsUpdate");
                                    if (!e.state.scheduledUpdate) {
                                        var n = e.getters.now() - e.state.updateCompleteTime,
                                            i = Math.min(Math.max(0, DEFAULT_TIMER_LENGTH - n), DEFAULT_TIMER_LENGTH),
                                            r = setTimeout(t, i);
                                        e.commit("setScheduledUpdate", r)
                                    }
                                },
                                handleScheduledUpdate: function (e) {
                                    e.dispatch("stopScheduledUpdate"), startGuides()
                                },
                                stopScheduledUpdate: function (e) {
                                    e.state.scheduledUpdate && (clearTimeout(e.state.scheduledUpdate), e.commit("setScheduledUpdate", null))
                                },
                                startObserverIfNeeded: function (t, i) {
                                    if (t.state.useObserver) {
                                        var r = t.getters.observer();
                                        r || (r = new(i || MutationObserver)(e), n = r), t.state.observing || (r.observe(document.documentElement, {
                                            subtree: !0,
                                            attributes: !0,
                                            childList: !0,
                                            characterData: !0
                                        }), t.commit("setObserving", !0))
                                    }
                                },
                                stopObserver: function (e) {
                                    var t = e.getters.observer();
                                    t && _.isFunction(t.disconnect) && t.disconnect(), e.commit("setObserving", !1), e.dispatch("stopScheduledUpdate")
                                },
                                startIteration: function (e, t) {
                                    e.getters.isUpdating() || e.commit("startUpdate", t), e.commit("startIteration", t)
                                },
                                completeIteration: function (e, t) {
                                    e.commit("completeIteration", t), e.getters.isUpdateComplete() && e.commit("completeUpdate", t)
                                },
                                startPhase: function (e, t) {
                                    e.getters.isPhaseInProgress()(t) || e.commit("startPhase", t)
                                }
                            },
                            o = {
                                setUseObserver: function (e) {
                                    e.useObserver = !0
                                },
                                setObserving: function (e, t) {
                                    e.observing = t
                                },
                                setIterationTimeLimit: function (e, t) {
                                    e.iterationTimeLimit = t
                                },
                                setNeedsUpdate: function (e) {
                                    e.needsUpdate = !0
                                },
                                setScheduledUpdate: function (e, t) {
                                    e.scheduledUpdate = t
                                },
                                startUpdate: function (e, t) {
                                    e.needsUpdate = !1, e.updateId = pendo.randomString(16), e.updateStartTime = t
                                },
                                completeUpdate: function (e, t) {
                                    e.updateId = null, e.updateStartTime = null, e.updateTotalTime = 0, e.iterationCount = 0, e.phases = {}, e.updateCompleteTime = t
                                },
                                startIteration: function (e, t) {
                                    e.iterationStartTime = t, e.iterationCount++
                                },
                                completeIteration: function (e, t) {
                                    e.updateTotalTime += t - e.iterationStartTime, e.iterationStartTime = null
                                },
                                startPhase: function (e, t) {
                                    var n = {};
                                    n[t] = {
                                        updateId: e.updateId
                                    }, _.extend(e.phases, n)
                                },
                                completePhase: function (e, t) {
                                    var n = e.phases[t.phase];
                                    n && (n.completedTime = t.time)
                                }
                            },
                            a = {
                                exceededIterationTime: function (e, t) {
                                    return t.iterationTimeElapsed() > e.iterationTimeLimit
                                },
                                iterationTimeElapsed: function (e, t) {
                                    return e.iterationStartTime ? t.now() - e.iterationStartTime : null
                                },
                                isUpdateComplete: function (e, t) {
                                    return _.all(_.keys(e.phases), t.isPhaseComplete())
                                },
                                isUpdating: function (e) {
                                    return !!e.updateId
                                },
                                isPhaseInProgress: function (e, t) {
                                    return function (e) {
                                        return !t.isPhaseComplete()(e)
                                    }
                                },
                                isPhaseComplete: function (e) {
                                    return function (t) {
                                        var n = e.phases[t];
                                        return !(!n || !n.completedTime)
                                    }
                                },
                                now: function () {
                                    return getNow()
                                },
                                observer: function () {
                                    return n
                                }
                            };
                        return {
                            actions: r,
                            mutations: o,
                            getters: a,
                            state: i
                        }
                    }(),
                    GUIDE_STATE_TTL = 1e4,
                    LAST_STEP_ADVANCED_COOKIE = "lastStepAdvanced",
                    GuideStateModule = function () {
                        var e = {
                                steps: {},
                                expired: {},
                                ttl: GUIDE_STATE_TTL,
                                storageKey: LAST_STEP_ADVANCED_COOKIE,
                                scopedStorageKey: null,
                                receivedStateChangeAt: null,
                                receivedLastGuideStepSeen: null,
                                lastGuideStepSeen: null
                            },
                            t = {
                                init: function (e) {
                                    e.commit("setScopedStorageKey", getPendoCookieKey(e.state.storageKey))
                                },
                                load: function (e, t) {
                                    if (t) {
                                        var n;
                                        try {
                                            n = JSON.parse(t)
                                        } catch (i) {}
                                        n && _.each([].concat(n), function (t) {
                                            e.commit("setStepState", t)
                                        })
                                    }
                                },
                                forceExpire: function (e) {
                                    _.each(e.state.steps, function (t, n) {
                                        e.commit("expireStepState", n)
                                    })
                                },
                                expire: function (e) {
                                    var t = e.getters.now();
                                    _.each(e.state.steps, function (n, i) {
                                        t - n.time > e.state.ttl && e.commit("expireStepState", i)
                                    })
                                },
                                apply: function (e) {
                                    var t, n = _.indexBy(e.getters.guideList(), "id");
                                    e.dispatch("expire"), _.each(e.state.steps, function (i) {
                                        var r = i.guideId,
                                            o = i.guideStepId;
                                        if (!i.visitorId || i.visitorId === e.getters.visitorId()) {
                                            (!t || i.time > t.time) && (t = i);
                                            var a = n[r];
                                            if (a) {
                                                var s = _.first(a.steps);
                                                s && i.seenReason && (s.seenReason = i.seenReason);
                                                var d = _.findWhere(a.steps, {
                                                    id: o
                                                });
                                                if (d) {
                                                    var u = e.state.storageKey;
                                                    d.seenState != i.state && (log("making sure that seenState = '" + i.state + "' for " + u + ": " + o), d.seenState = i.state), d.snoozeEndTime != i.snoozeEndTime && (log("making sure that snoozeEndTime = '" + i.snoozeEndTime + "' for " + u + ": " + o), d.snoozeEndTime = i.snoozeEndTime);
                                                    var l = _.indexOf(a.steps, d);
                                                    _.each(a.steps.slice(0, l), function (e) {
                                                        _.contains(["advanced", "dismissed"], e.seenState) || (e.seenState = "advanced")
                                                    })
                                                }
                                            }
                                        }
                                    }), t && e.dispatch("updateLastGuideStepSeen", _.extend({}, e.state.lastGuideStepSeen, t))
                                },
                                receiveLastGuideStepSeen: function (e, t) {
                                    e.commit("setReceivedLastGuideStepSeen", t), e.commit("setLastGuideStepSeen", t)
                                },
                                updateLastGuideStepSeen: function (e, t) {
                                    t.visitorId && t.visitorId !== e.getters.visitorId() || (t.guideStepId && e.commit("setStepState", t), e.commit("setLastGuideStepSeen", t), pendo.lastGuideStepSeen = t)
                                },
                                write: function (e) {
                                    e.dispatch("expire");
                                    var t = e.rootState.frames.tabId,
                                        n = e.state.storageKey,
                                        i = e.state.ttl,
                                        r = e.getters.storage(),
                                        o = JSON.stringify(_.map(e.state.steps, function (e) {
                                            return _.extend({
                                                tabId: t
                                            }, e)
                                        }));
                                    log("writing " + o + " to a cookie named " + n + " for " + i), r.write(n, o, i), setPreviewState(e.state.lastGuideStepSeen, pendoLocalStorage)
                                },
                                storageChanged: function (e, t) {
                                    if (t.key === e.state.scopedStorageKey) {
                                        var n, i;
                                        try {
                                            var r = e.getters.storage();
                                            n = r.read(e.state.storageKey), i = [].concat(JSON.parse(n))
                                        } catch (o) {}
                                        e.getters.storageChangedInOtherTab()(i) && (clearLoopTimer(), e.dispatch("load", n), e.dispatch("apply"), e.state.receivedStateChangeAt || (e.commit("setReceivedStateChange", e.getters.now()), window.addEventListener("focus", regainFocus)))
                                    }
                                }
                            },
                            n = {
                                expireStepState: function (e, t) {
                                    e.expired[t] = e.steps[t], delete e.steps[t]
                                },
                                setStepState: function (e, t) {
                                    e.steps[t.guideStepId] = t
                                },
                                setScopedStorageKey: function (e, t) {
                                    e.scopedStorageKey = t
                                },
                                setLastGuideStepSeen: function (e, t) {
                                    e.lastGuideStepSeen = t
                                },
                                setReceivedLastGuideStepSeen: function (e, t) {
                                    e.receivedLastGuideStepSeen = t
                                },
                                setReceivedStateChange: function (e, t) {
                                    e.receivedStateChangeAt = t
                                }
                            },
                            i = {
                                now: function () {
                                    return getNow()
                                },
                                storage: function () {
                                    return agentStorage
                                },
                                guideList: function () {
                                    return activeGuides
                                },
                                tabLostFocus: function (e) {
                                    return !!e.receivedStateChangeAt
                                },
                                storageChangedInOtherTab: function (e, t, n) {
                                    return function (t) {
                                        var i = get(n, "frames.tabId");
                                        if (!t) return !1;
                                        var r = _.max(_.compact(t), "time");
                                        return r && r.tabId && i && r.tabId !== i && (!e.lastGuideStepSeen || !e.lastGuideStepSeen.time || r.time > e.lastGuideStepSeen.time) ? !0 : !1
                                    }
                                },
                                visitorId: function () {
                                    return pendo.get_visitor_id()
                                }
                            };
                        return {
                            actions: t,
                            mutations: n,
                            state: e,
                            getters: i
                        }
                    }(),
                    HealthCheckModule = function () {
                        var e = ["advanced", "dismissed", "snoozed"],
                            t = {
                                steps: {},
                                exceptions: {}
                            },
                            n = {
                                init: function (e, t) {
                                    _.each(t, function (t) {
                                        _.each(t.steps, function (t) {
                                            e.commit("updateStepState", t)
                                        })
                                    })
                                },
                                fixSeenStateAndLogError: function (e, t) {
                                    var n = t.step,
                                        i = t.reason;
                                    if (!e.state.exceptions[n.id]) {
                                        var r = n.seenState,
                                            o = e.state.steps[n.id];
                                        o && o.seenState && (n.seenState = o.seenState), e.state.exceptions[n.id] = !0, e.dispatch("logRedisplayError", {
                                            id: n.id,
                                            guideId: n.guideId,
                                            reason: i,
                                            seenState: o.seenState,
                                            previousSeenState: r
                                        })
                                    }
                                },
                                logRedisplayError: function (e, t) {
                                    writeErrorPOST(['Attempted redisplay of guide="', t.guideId, '" step="', t.id, '" reason="', t.reason, '" seenState="', t.seenState, '" previousSeenState="', t.previousSeenState, '"'].join())
                                }
                            },
                            i = {
                                updateStepState: function (e, t) {
                                    var n = getNow();
                                    e.steps[t.id] = _.extend({}, e.steps[t.id], {
                                        pageId: t.pageId,
                                        regexUrlRule: t.regexUrlRule,
                                        seenState: t.seenState,
                                        updatedAt: n,
                                        allowedAt: n + 6e4
                                    })
                                },
                                resetStepStatus: function (e) {
                                    e.steps = {}
                                }
                            },
                            r = {
                                isRedisplay: function (t) {
                                    return function (n) {
                                        var i = t.steps[n.id];
                                        return i ? n.resetAt > i.updatedAt ? !1 : getNow() >= i.allowedAt ? !1 : _.contains(e, i.seenState) && !_.contains(e, n.seenState) : !1
                                    }
                                },
                                isMissingPageRule: function (e) {
                                    return function (t) {
                                        var n = e.steps[t.id];
                                        return n && n.regexUrlRule && !t.regexUrlRule ? !0 : !1
                                    }
                                }
                            };
                        return {
                            actions: n,
                            mutations: i,
                            getters: r,
                            state: t
                        }
                    }(),
                    LocationModule = function (e) {
                        function t(e, t, n) {
                            var r = {
                                search: ["AllowOnlyKeys", "ExcludeKeys", "AddTo", "Replace", "Clear"],
                                hash: ["Replace", "Clear"],
                                pathname: ["Replace"],
                                hostname: ["Replace"],
                                href: ["Replace"]
                            };
                            if (i.isObject(e) && (t = e.action, n = e.data, e = e.attr), !r[e]) throw new Error("Invalid URL attribute type: " + e);
                            if (!i.contains(r[e], t)) throw new Error("Invalid transform (" + t + ") for attribute (" + e + ")");
                            this.attr = e, this.action = t, this.data = n
                        }

                        function n(e) {
                            if ("function" == typeof n[e]) {
                                var t = i.toArray(arguments).slice(1);
                                return n[e].apply(n, t)
                            }
                        }
                        var i = pendo._,
                            r = pendo.ajax.urlFor;
                        t.prototype.applyToURL = function (e) {
                            var t = {
                                AllowOnlyKeys: function (e, t, n) {
                                    i.isFunction(n) && (n = n(e[t], e));
                                    var r = e.href;
                                    return new URL(adjustUrl(r, null, n, !1))
                                },
                                ExcludeKeys: function (e, t, n) {
                                    i.isFunction(n) && (n = n(e[t], e));
                                    var r = e.href;
                                    return new URL(adjustUrl(r, null, n, !0))
                                },
                                AddTo: function (e, t, n) {
                                    i.isFunction(n) && (n = n(e[t], e));
                                    var o = e.href;
                                    return new URL(r(o, n))
                                },
                                Clear: function (e, t) {
                                    return e[t] = "", e
                                },
                                Replace: function (e, t, n) {
                                    return i.isFunction(n) && (n = n(e[t], e)), "href" === t ? new URL(n) : (e[t] = n, e)
                                }
                            };
                            return t[this.action](e, this.attr, this.data)
                        }, t.prototype.toString = function () {
                            return this.attr + " - " + this.action + " - " + JSON.stringify(this.data)
                        }, t.fromJSON = function (e) {
                            return new t(e.attr, e.action, e.data)
                        };
                        var o = function () {
                                return new URL(e.location.href)
                            },
                            a = {
                                transforms: [],
                                currentSrcFn: o
                            },
                            s = {
                                init: function (e, t) {
                                    e.commit("clearTransforms"), e.commit("changeUrlSource"), t.transforms && e.dispatch("addTransforms", t.transforms), t.setUrl && e.commit("changeUrlSource", t.setUrl)
                                },
                                addTransforms: function (e, n) {
                                    i.each(n, function (n) {
                                        e.commit("addTransform", t.fromJSON(n))
                                    })
                                }
                            },
                            d = {
                                addTransform: function (e, t) {
                                    e.transforms.push(t)
                                },
                                clearTransforms: function (e) {
                                    e.transforms = []
                                },
                                changeUrlSource: function (e, t) {
                                    if (!t) return void(e.currentSrcFn = o);
                                    var n;
                                    if ("string" == typeof t) {
                                        var r = new URL(t);
                                        n = i.partial(i.identity, r)
                                    } else if (isURL(t)) n = i.partial(i.identity, t);
                                    else {
                                        if ("function" != typeof t) throw new Error("URL Source must be either a Function that returns a URL or String that is a valid URL. Or, it may be a static URL or String.");
                                        n = t
                                    }
                                    e.currentSrcFn = n
                                }
                            },
                            u = function (e) {
                                if ("string" == typeof e) return new URL(e);
                                if (!isURL(e)) throw new Error("Invalid type from custom URL source. Must be either an URL or a String of a valid url.");
                                return e
                            },
                            l = function (e) {
                                return e ? e : window.location
                            },
                            c = function (e) {
                                var t;
                                try {
                                    var n = i.compose(function () {
                                        return t
                                    }, function (e) {
                                        t = e
                                    });
                                    t = i.reduce([e.currentSrcFn, u, n, i.partial(i.reduce, e.transforms, function (e, t) {
                                        return t.applyToURL(e)
                                    }), u], function (e, t) {
                                        return t(e)
                                    }, null)
                                } catch (r) {
                                    writeException(r), t = l(t)
                                }
                                return t
                            },
                            p = {
                                url: c,
                                href: function (e) {
                                    return c(e).href
                                }
                            };
                        return i.extend(pendo, {
                            location: n
                        }), i.extend(n, {
                            getHref: function () {
                                return store.getters["location/href"]()
                            },
                            clearTransforms: function () {
                                store.commit("location/clearTransforms")
                            },
                            addTransforms: function (e) {
                                store.dispatch("location/addTransforms", e)
                            },
                            setUrl: function (e) {
                                store.commit("location/changeUrlSource", e), pageLoad()
                            },
                            useBrowserUrl: function () {
                                store.commit("location/changeUrlSource"), pageLoad()
                            }
                        }), {
                            state: a,
                            actions: s,
                            mutations: d,
                            getters: p
                        }
                    }(window),
                    store = createStore();
                store.subscribe(function (e, t) {});
                var OBM = "onboarding",
                    all_ob_guides = [],
                    completedGuidesSet = [],
                    addCompletedGuides = function (e) {
                        e = [].concat(e), completedGuidesSet = _.union(completedGuidesSet, e)
                    },
                    wasGuideAlreadyCompleted = function (e) {
                        return _.contains(completedGuidesSet, e)
                    },
                    shouldSwitchToOBM = function (e) {
                        return !1
                    },
                    startOBM = function () {
                        resetPendoUI(), removeLauncher();
                        var e = pendo.guideWidget;
                        e && (e.hidePoweredBy = !0, e.data && (e.data.enableSearch = !1));
                        var t = _.extend({
                            addHeight: 70,
                            addWidth: -10,
                            addUISection: buildOBProgressUI
                        }, pendo.guideWidget.data);
                        createLauncher(t, !1), dom(launcherBadge.element).addClass("onboarding"), dom(launcherTooltipDiv).addClass("onboarding setup"), autoShowLauncherList(getGuideStats()), setMode(OBM)
                    },
                    autoShowLauncherList = function (e) {
                        e.percentComplete > 0 || "yes" == agentStorage.read("launcher-closed")
                    },
                    buildOBProgressUI = function (e) {
                        var t = ["<div class='_pendo-launcher-onboarding-progress_'>", "<div class='_pendo-progress-area-inner_'>", "<label class='percentComplete'></label><label>% Complete</label>", "<div class='_pendo-progress-bar-outer_'>", "<div class='_pendo-progress-bar-inner_'></div>", "</div>", "</div>", "</div>"].join("");
                        dom("._pendo-launcher-footer_", e).append(dom(t))
                    },
                    updateProgressUI = function (e) {
                        dom("._pendo-progress-area-inner_ label.percentComplete").html(e.percentComplete), dom("._pendo-progress-bar-inner_").css("width: " + e.percentComplete + "%")
                    },
                    isOB = function (e) {
                        return e && e.attributes && !!e.attributes.isOnboarding
                    },
                    isOBAndCanShow = function (e) {
                        return isOB(e) && isLauncher(e)
                    },
                    isComplete = function (e) {
                        if (wasGuideAlreadyCompleted(e)) return !0;
                        var t = _.last(e.steps);
                        return e.steps.length > 1 && "lightbox" == t.type && (t = _.last(e.steps, 2)[0]), "advanced" == t.seenState || "dismissed" == t.seenState
                    },
                    isSkipped = function (e) {
                        return !1
                    },
                    isInProgress = function (e) {
                        var t = _.pluck(e.steps, "seenState"),
                            n = _.any(t, function (e) {
                                return "active" == e
                            });
                        return n ? !0 : 2 == _.size(_.uniq(t))
                    },
                    isNotStarted = function (e) {
                        return _.any(_.initial(_.pluck(e.steps, "seenState")), function (e) {
                            return "dismissed" == e
                        }) ? !0 : _.all(_.pluck(e.steps, "seenState"), function (e) {
                            return "undefined" == typeof e
                        })
                    },
                    getGuideStats = function (e) {
                        e = e || all_ob_guides;
                        var t = _.filter(e, isComplete),
                            n = _.filter(_.without.apply(_, [e].concat(t)), isSkipped),
                            i = _.filter(_.without.apply(_, [e].concat(t, n)), isInProgress),
                            r = _.filter(_.without.apply(_, [e].concat(t, n, i)), isNotStarted),
                            o = {
                                total: e.length,
                                isCompleted: e.length == t.length + n.length,
                                percentComplete: Math.round((t.length + n.length) / e.length * 100),
                                completed: t,
                                skipped: n,
                                inProgress: i,
                                notStarted: r
                            };
                        return o
                    },
                    updateOnboardingState = function () {
                        var e = getGuideStats(),
                            t = dom(launcherTooltipDiv);
                        t.removeClass("setup"), e.isCompleted ? t.addClass("complete") : t.removeClass("complete")
                    },
                    isOnboardingCompleted = function () {
                        var e = dom(launcherTooltipDiv);
                        return e.hasClass("complete")
                    },
                    ob_proc = function (e) {
                        var t = _.filter(e, isOBAndCanShow),
                            n = getGuideStats();
                        addCompletedGuides(n.completed), updateProgressUI(n), updateLauncherOnboardingContent(t), updateLauncher = function () {
                            return !0
                        }, defaultLoopProc(e), dom(launcherTooltipDiv).hasClass("setup") || isOnboardingCompleted() || !n.isCompleted || (updateOnboardingState(), onboardingHasCompleted())
                    };
                registerMode(OBM, ob_proc);
                var updateLauncherOnboardingContent = function (e) {
                        var t = Sizzle("._pendo-launcher_ ._pendo-launcher-guide-listing_");
                        return t.length ? (t = t[0], _.map(e, function (e) {
                            addLauncherItem(t, e)
                        }), e.length) : (log("missing luancher body", "launcher", "guides"), !1)
                    },
                    pickStatusToUse = function (e, t) {
                        return "complete" == e ? "complete" : t
                    },
                    handleGuideStatusChanges = function (e, t, n) {
                        n != t && "complete" == n && guideHasCompleted(e), n != t && "skipped" == n && guideWasSkipped(e)
                    },
                    guideWasSkipped = function (e) {
                        guideDone(e)
                    },
                    guideHasCompleted = function (e) {
                        guideDone(e)
                    },
                    guideDone = function (e) {
                        expandLauncherList()
                    },
                    addLauncherItem = function (e, t) {
                        var n, i = getOnboardingState(t),
                            r = Sizzle("#launcher-" + t.id);
                        if (r.length) {
                            n = r[0];
                            var o = getOnboardingClass(n),
                                a = pickStatusToUse(o, i);
                            if (o != a) {
                                var s = dom(n);
                                s.removeClass(makeOBClass("bad")), s.removeClass(makeOBClass(o)), s.addClass(makeOBClass(a))
                            }
                            handleGuideStatusChanges(t, o, i)
                        } else n = buildLauncherItem(t), dom(n).addClass(makeOBClass(i)), e.appendChild(n);
                        return addItemState(t, i, n), n
                    },
                    addItemState = function (e, t, n) {
                        var i, r = Sizzle("._pendo-launcher-item-status_", n);
                        r.length ? i = r[0] : (i = dom("<div class='_pendo-launcher-item-status_'></div>")[0], n.appendChild(i));
                        var o;
                        o = "skipped" == t ? "Task Skipped" : "in-progress" == t ? "Task in Progress (" + renderStepPosition(null, e) + ")" : "", dom(i).html(o)
                    },
                    makeOBClass = function (e) {
                        return "_pendo-onboarding-status-" + e + "_"
                    },
                    getOnboardingState = function (e) {
                        return isComplete(e) ? "complete" : isSkipped(e) ? "skipped" : isInProgress(e) ? "in-progress" : isNotStarted(e) ? "not-started" : "bad"
                    },
                    getOnboardingClass = function (e) {
                        var t = ["complete", "skipped", "in-progress", "not-started"];
                        return e ? _.find(t, function (t) {
                            return dom(e).hasClass(makeOBClass(t))
                        }) : null
                    },
                    getActiveGuide = function () {
                        var e, t, n, i = _.find(getActiveGuides(), function (e) {
                            return e.isShown()
                        });
                        return i ? (get(i, "attributes.resourceCenter.isModule") && (i = BuildingBlockResourceCenter.getResourceCenter()), e = _.find(i.steps, function (e, t) {
                            return n = t, e.isShown()
                        }), t = _.filter(i.steps, function (e, t) {
                            return e.isShown()
                        }), {
                            guide: i,
                            steps: t,
                            step: e,
                            stepIndex: n
                        }) : null
                    },
                    smartNextStep = function (e) {
                        var t = getActiveGuide();
                        if (t) {
                            var n = t.guide.steps[t.stepIndex + 1],
                                i = function () {
                                    var e = Sizzle(n.elementPathRule);
                                    0 !== e.length && pendo._.some(e, isElementVisible) ? pendo.onGuideAdvanced(t.step) : pendo.onGuideAdvanced(n)
                                };
                            e = e || 0, setTimeout(i, e)
                        }
                    },
                    advanceOn = function (e, t) {
                        var n = getActiveGuide();
                        t = t || n.step.elementPathRule;
                        var i = Sizzle(t)[0],
                            r = function () {
                                pendo.onGuideAdvanced(), detachEvent(i, e, r, !0)
                            };
                        attachEvent(i, e, r, !0)
                    },
                    smartFirstStep = function () {
                        dom("._pendo-guide_").css("display:none;");
                        var e = pendo.getCurrentUrl(),
                            t = getActiveGuide(),
                            n = t.guide.steps,
                            i = _.filter(_.rest(n), function (e) {
                                return !!e.pageId
                            }),
                            r = _.indexOf(n, _.find(i, function (t) {
                                return pendo.testUrlForStep(t.regexUrlRule, e)
                            }));
                        if (log("startingPoint is " + r), -1 == r) return void dom("._pendo-guide_").css("display:block;");
                        var o = n[Math.max(0, r - 1)];
                        pendo.log("found starting step to be " + o.id), pendo.onGuideAdvanced(o)
                    },
                    renderStepPosition = function (e, t, n) {
                        if (t) {
                            if (!n) {
                                var i = [].concat(t.steps).reverse();
                                n = _.findWhere(i, {
                                    seenState: "active"
                                })
                            }
                        } else {
                            var r = getActiveGuide();
                            if (!r) return;
                            t = r.guide, n = r.step
                        }
                        e = e || "Step <%= currPos %> of <%= total %>", e = _.template(e);
                        var o = {
                            currPos: t.getPositionOfStep(n),
                            total: t.getTotalSteps()
                        };
                        return e(o)
                    };
                pendo.guideDev = {
                    getActiveGuide: getActiveGuide,
                    smartNextStep: smartNextStep,
                    smartFirstStep: smartFirstStep,
                    advanceOn: advanceOn,
                    renderStepPosition: renderStepPosition
                }, pendo.badgesShown = {};
                var BADGE_CSS_NAME = "_pendo-badge_",
                    getElementForBadge = getElementForTargeting;
                Badge.create = function (e) {
                    var t = Badge.findStep(e);
                    return t ? _.reduce(Badge.behaviors, function (n, i) {
                        return i.call(n, e, t)
                    }, e.attributes.badge) : void 0
                }, Badge.findStep = function (e) {
                    var t = _.find(e.steps, function (e) {
                        return !!e.elementPathRule
                    });
                    return t && e.attributes && e.attributes.badge ? t : void 0
                }, Badge.behaviors = [Wrappable, Badge, InlinePosition, AbsolutePosition, ClickActivation, HoverActivation, ShowOnHover];
                var placeBadge = function (e, t) {
                        t = t || pendo.badgesShown;
                        var n = t[e.id],
                            i = n ? n.step() : Badge.findStep(e);
                        if (i) {
                            var r = n ? n.target() : getElementForBadge(i),
                                o = get(e, "attributes.resourceCenter");
                            if (o && !store.getters["frames/isLeader"]()) return void(n && _.isFunction(n.hide) && (i.overrideElement = undefined, t[e.id] = undefined, n.hide()));
                            if (!o || e.hasResourceCenterContent) {
                                BuildingBlockResourceCenter.updateNotificationBubbles();
                                var a = !0;
                                i.elementContainsRulesList && (a = r && doesElementMatchContainsRules(r, i.elementContainsRulesList)), i.elementPathRule && pendo.isElementVisible(r) && pendo.Sizzle.matchesSelector(r, i.elementPathRule) && a ? (n || (n = Badge.create(e)), n.show(), t[e.id] = n) : n && (i.isShown() || (i.overrideElement = undefined, t[e.id] = undefined, n.hide()))
                            }
                        }
                    },
                    removeAllBadges = function () {
                        _.map(pendo.badgesShown, removeBadge), pendo.badgesShown = {}
                    },
                    removeBadge = function (e) {
                        e && _.isFunction(e.hide) && e.hide()
                    },
                    removeBadgeForGuide = function (e) {
                        var t = pendo.badgesShown[e.id];
                        t && removeBadge(t)
                    },
                    adjustBadgesForResize = function (e) {
                        debug("adjustBadgesForResize firing"), _.map(pendo.badgesShown, function (e) {
                            e && e.show()
                        })
                    };
                attachEventInternal(window, "resize", _.debounce(adjustBadgesForResize, 50)), pendo.TOOLTIP_DEFAULT_WIDTH = 430, pendo.TOOLTIP_DEFAULT_HEIGHT = 200, pendo.TOOLTIP_ARROW_SIZE = 15;
                var TOOLTIP_CSS_NAME = "_pendo-guide-tt_",
                    MOBILE_TOOLTIP_CSS_NAME = "_pendo-guide-mobile-tt_",
                    lastElementPos = null,
                    buildTooltipCSSName = function () {
                        return isMobileUserAgent() ? MOBILE_TOOLTIP_CSS_NAME : TOOLTIP_CSS_NAME
                    },
                    buildTooltipCSSSelector = function (e) {
                        return "#_pendo_g_" + e.id
                    },
                    createTooltipGuide = function (e, t) {
                        lastElementPos = null;
                        var n = getOffsetPosition(e);
                        if (0 === n.height && 0 === n.width) return null;
                        var i = t.guideElement,
                            r = t.attributes.height,
                            o = t.attributes.width,
                            a = t.attributes.layoutDir;
                        i.addClass(buildTooltipCSSName());
                        var s = getTooltipDimensions(n, r, o, a);
                        return t && (t.dim = s), i.css({
                            width: s.width,
                            height: s.height,
                            left: s.left,
                            top: s.top
                        }), n.fixed && i.css({
                            position: "fixed"
                        }), dom("._pendo-guide-container_", i).addClass(s.arrowPosition).css({
                            top: s.content.top,
                            left: s.content.left,
                            width: s.content.width,
                            height: s.content.height
                        }), buildAndAppendArrow(i[0], s), i[0]
                    },
                    buildAndAppendArrow = function (e, t) {
                        var n = ["top", "right", "bottom", "left"],
                            i = "_pendo-guide-arrow-",
                            r = i + "border-",
                            o = t.arrowPosition,
                            a = _.chain(n).filter(function (e) {
                                return e !== o
                            }).map(function (e) {
                                return "border-" + e + "-width:" + pendo.TOOLTIP_ARROW_SIZE + "px;"
                            }).value().join(""),
                            s = dom("div._pendo-guide-arrow_", e).remove().findOrCreate("<div class='_pendo-guide-arrow_'></div>"),
                            d = dom("div._pendo-guide-arrow-border_ ", e).remove().findOrCreate("<div class='_pendo-guide-arrow-border_'></div>");
                        _.each(n, function (e) {
                            s.removeClass(i + e + "_").removeClass(e), d.removeClass(r + e + "_").removeClass(e)
                        }), s.addClass(i + o + "_").addClass(o).css(a + "top:" + t.arrow.top + "px;left:" + t.arrow.left + "px;"), d.addClass(r + o + "_").addClass(o).css(a + "top:" + t.arrow.border.top + "px;left:" + t.arrow.border.left + "px;"), dom(e).append(s).append(d)
                    },
                    showTooltipGuide = function (e, t) {
                        if (!canStepBeRendered(e)) return null;
                        t === undefined && (t = activeElements), e.element = getElementForGuideStep(e);
                        var n = e.element;
                        if (!n) return log("No element found for step: " + e.id), null;
                        scrollIntoView(n);
                        var i = createTooltipGuide(n, e);
                        return null === i ? null : (i.id = pendo.getTooltipDivId(e), addCloseButton(i, function () {
                            var t = e.getGuide();
                            (!t.isOnboarding() || confirm("Are you sure you want to stop this tutorial?")) && pendo.onGuideDismissed(e)
                        }), e.hideCredits || pendo._addCredits(i), dom(i).appendTo(getGuideAttachPoint()), t.push(i), attachEvent(i, "mouseover", pendo._.partial(dom.addClass, i, "mouseover")), attachEvent(i, "mouseout", pendo._.partial(dom.removeClass, i, "mouseover")), scrollToTooltip(n, i), addBlockOutUI(e), n)
                    },
                    isLessThan = function (e, t) {
                        return t > e
                    },
                    isGreaterThan = _.negate(isLessThan),
                    lastBlockBox = null,
                    hasBlockBoxChanged = function (e) {
                        var t = !_.isEqual(e, lastBlockBox);
                        return lastBlockBox = e, t
                    },
                    lastBodySize = null,
                    hasBodyDimensionsChanged = function (e) {
                        var t = !_.isEqual(e, lastBodySize);
                        return lastBodySize = e, t
                    },
                    lastScreenCoords = null,
                    haveScreenCoordsChanged = function (e) {
                        var t = !_.isEqual(e, lastScreenCoords);
                        return lastScreenCoords = e, t
                    },
                    addBlockOutUI = function (e) {
                        try {
                            if (!e.attributes || !e.attributes.blockOutUI || !e.attributes.blockOutUI.enabled) return;
                            var t = e.attributes.blockOutUI,
                                n = [];
                            n.push(e.element), n = n.concat(_.compact(_.flatten(_.map([].concat(t.additionalElements), function (e) {
                                return Sizzle(e)
                            }))));
                            var i = computeBlockOutBoundingBox(n),
                                r = t.padding || 0,
                                o = getClientRect(getBody());
                            i.fixed && (o.top = 0, o.bottom = o.height, o.left = 0, o.right = o.width);
                            var a = computeBlockOutOverlayPositions(o, i, r);
                            if (!hasBlockBoxChanged(i) && !hasBodyDimensionsChanged(o) && !haveScreenCoordsChanged(a)) return;
                            var s = {
                                "z-index": t.zindex || 1e4,
                                position: "fixed"
                            };
                            t.bgColor && (s["background-color"] = t.bgColor), t.opacity && (s.opacity = t.opacity);
                            var d = dom("body");
                            _.each(a, function (e, t) {
                                d.append(buildBackdropDiv(t, _.extend({}, e, s)))
                            })
                        } catch (u) {
                            log("Failed to add BlockOut ui", "error")
                        }
                    },
                    buildBackdropDiv = function (e, t) {
                        var n = dom("div._pendo-guide-tt-region-block_._pendo-region-" + e + "_");
                        return n = n.length > 0 ? n[0] : dom('<div class="_pendo-guide-tt-region-block_ _pendo-region-' + e + '_"></div>'), dom(n).css(t), n
                    },
                    checkPlacementChanged = function (e) {
                        var t = _.isEqual(e, lastElementPos);
                        return lastElementPos = e, !t
                    },
                    placeTooltip = function (e) {
                        var t = e.element || getElementForGuideStep(e),
                            n = getOffsetPosition(t);
                        if (addBlockOutUI(e), checkPlacementChanged(n)) {
                            var i = e.attributes.height,
                                r = e.attributes.width,
                                o = e.attributes.layoutDir,
                                a = getTooltipDimensions(n, i, r, o),
                                s = dom(buildTooltipCSSSelector(e));
                            s.css({
                                top: a.top,
                                left: a.left,
                                position: n.fixed ? "fixed" : ""
                            }), buildAndAppendArrow(s, a)
                        }
                    },
                    getTooltipDimensions = function (e, t, n, i) {
                        var r = pendo.TOOLTIP_ARROW_SIZE,
                            o = {
                                arrow: {
                                    border: {}
                                },
                                content: {
                                    top: r,
                                    left: r
                                }
                            },
                            a = pendo._get_screen_dim();
                        return o.width = Math.min(n, a.width), o.height = t, o.content.width = o.width - 2 * r, o.content.height = o.height - 2 * r, i || (i = "auto"), o = determineHorizontalBias(o, e, a, i), o = determineArrowPosition(o, e, a, i), o = buildArrowDimensions(o, e, a)
                    },
                    determineHorizontalBias = function (e, t, n, i) {
                        if ("right" == i || "left" == i) return pendo.log("Setting layout position to " + i), e.arrow.hbias = i, e;
                        var r = n.width / 3,
                            o = [r, 2 * r];
                        return o[0] < t.left && t.left < o[1] ? e.arrow.hbias = "center" : t.left < n.width / 2 ? e.arrow.hbias = "left" : e.arrow.hbias = "right", e
                    },
                    determineArrowPosition = function (e, t, n, i) {
                        if (i && "DEFAULT" != i && "auto" != i && (e.arrowPosition = i), !e.arrowPosition) {
                            var r = t.top - documentScrollTop(),
                                o = t.left - documentScrollLeft(),
                                a = o + t.width;
                            r < n.height / 3 ? e.arrowPosition = "top" : r > 2 * n.height / 3 || "center" == e.arrow.hbias ? e.arrowPosition = "bottom" : o < e.width && n.width - a < e.width ? e.arrowPosition = "top" : e.arrowPosition = e.arrow.hbias
                        }
                        return e
                    },
                    buildArrowDimensions = function (e, t, n) {
                        var i = e.height,
                            r = e.width;
                        if (isBrowserInQuirksmode()) return buildArrowDimensionsQM(e, t, n);
                        if ("top" == e.arrowPosition || "bottom" == e.arrowPosition) {
                            var o = 10,
                                a = 0;
                            "top" == e.arrowPosition ? (e.top = t.top + t.height, e.arrow.top = isOldIE(9, 6) ? 6 : 2, a = -1) : "bottom" == e.arrowPosition && (e.top = t.top - i, e.arrow.top = i - pendo.TOOLTIP_ARROW_SIZE - 1, e.arrow.top += isOldIE(9, 6) ? 6 : 0, e.arrow.top += 8 == msie ? -1 : 0, a = 1);
                            var s = o + pendo.TOOLTIP_ARROW_SIZE,
                                d = r - 3 * pendo.TOOLTIP_ARROW_SIZE - o;
                            if ("left" == e.arrow.hbias ? (e.left = t.left + t.width / 2 - (o + 2 * pendo.TOOLTIP_ARROW_SIZE), e.arrow.left = s) : "right" == e.arrow.hbias ? (e.left = t.left - r + t.width / 2 + (o + 2 * pendo.TOOLTIP_ARROW_SIZE), e.arrow.left = d) : (e.left = t.left + t.width / 2 - r / 2, e.arrow.left = r / 2 - pendo.TOOLTIP_ARROW_SIZE), e.arrow.floating !== !1) {
                                var u = e.left + r - n.width;
                                u -= Math.max(0, e.arrow.left + u - d), u > 0 && (e.left -= u, e.arrow.left += u);
                                var l = -e.left;
                                l -= Math.max(0, s - (e.arrow.left - l)), l > 0 && (e.left += l, e.arrow.left -= l)
                            }
                            return e.arrow.border.top = e.arrow.top + a, e.arrow.border.left = e.arrow.left, e
                        }
                        return "left" == e.arrow.hbias ? (e.left = t.left + t.width, e.arrow.left = 1, e.arrow.left += isOldIE(10, 6) ? 5 : 0, e.arrow.border.left = e.arrow.left - 1) : "right" == e.arrow.hbias && (e.left = Math.max(0, t.left - r), e.arrow.left = r - pendo.TOOLTIP_ARROW_SIZE - 1, e.arrow.left += isOldIE(10, 6) ? 5 : 0, e.arrow.left += 7 == msie && trident >= 6 ? 1 : 0, e.arrow.border.left = e.arrow.left + 1), e.top = t.top - i / 2 + t.height / 2, e.arrow.top = i / 2 - pendo.TOOLTIP_ARROW_SIZE, e.arrow.border.top = e.arrow.top, e
                    };
                pendo.LB_DEFAULT_WIDTH = 500, pendo.LB_DEFAULT_HEIGHT = 500;
                var LIGHTBOX_CSS_NAME = "_pendo-guide-lb_",
                    canLightboxStepBeShown = function (e) {
                        return canStepBeRendered(e)
                    },
                    addOverlay = function (e, t) {
                        var n = !!pendo.dom("._pendo-backdrop_")[0];
                        return get(t, "overlayDiv[0]") || (t.overlayDiv = dom("<div/>").addClass("_pendo-backdrop_")), n === !1 && (t.elements.push(t.overlayDiv[0]), t.overlayDiv.appendTo(getGuideAttachPoint())), isBrowserInQuirksmode() && t.overlayDiv.css({
                            height: "100%",
                            width: "100%",
                            position: "absolute"
                        }), e && dom(t.overlayDiv).addClass("_pendo-onboarding_"), t.overlayDiv
                    },
                    renderLightboxGuide = function (e) {
                        var t = e.guideElement,
                            n = pendo.TOOLTIP_ARROW_SIZE,
                            i = e.attributes.height,
                            r = e.attributes.width,
                            o = Math.floor(r / 2),
                            a = Math.floor(i / 2);
                        t.addClass(LIGHTBOX_CSS_NAME).css({
                            top: "50%",
                            left: "50%",
                            "margin-top": -a,
                            "margin-left": -o
                        }), dom("._pendo-guide-container_", t).css({
                            bottom: n,
                            right: n
                        }), isBrowserInQuirksmode() && t.css({
                            position: "absolute"
                        })
                    },
                    showLightboxGuide = function (e, t) {
                        if (!canLightboxStepBeShown(e)) return null;
                        t === undefined && (t = activeElements), e.element = getElementForGuideStep(e), renderLightboxGuide(e);
                        var n = e.getGuide() ? e.getGuide().isOnboarding() : !1;
                        addOverlay(n, e);
                        var i = e.guideElement;
                        t.push(i[0]), i.appendTo(getGuideAttachPoint())
                    },
                    MOBILE_LIGHTBOX_CSS_NAME = "_pendo-guide-mobile-lb_",
                    renderMobileLightboxGuide = function (e) {
                        var t = e.guideElement;
                        t.addClass(MOBILE_LIGHTBOX_CSS_NAME)
                    },
                    showMobileLightboxGuide = function (e, t) {
                        function n(e) {
                            e.preventDefault()
                        }
                        if (!canLightboxStepBeShown(e)) return null;
                        t === undefined && (t = activeElements), e.element = getElementForGuideStep(e), renderMobileLightboxGuide(e);
                        var i = e.getGuide() ? e.getGuide().isOnboarding() : !1,
                            r = addOverlay(i, e),
                            o = e.guideElement,
                            a = pendo.TOOLTIP_ARROW_SIZE;
                        o.css({
                            width: "",
                            height: ""
                        });
                        var s = dom("._pendo-guide-container_", o).css({
                            bottom: a,
                            right: a
                        });
                        dom("._pendo-close-guide_", o).remove().prependTo(s), o.appendTo(getGuideAttachPoint()), t.push(o[0]), attachEvent(r[0], "touchmove", n), attachEvent(o[0], "touchmove", n)
                    },
                    LAUNCHER_SEARCHING_CLASS = "_pendo-launcher-searching_",
                    SEARCHBOX_CSS_NAME = "_pendo-launcher-search-box_",
                    SEARCHBOX_CSS_SELECTOR = "." + SEARCHBOX_CSS_NAME + " input",
                    LAUNCHER_DEFAULT_WIDTH = 330,
                    LAUNCHER_DEFAULT_HEIGHT = 310,
                    launcherBadge = null,
                    launcherTooltipDiv = null,
                    isPreventLauncher = !1,
                    launcherHash = null,
                    launcherActiveClass = "_pendo-launcher-active_",
                    launcherElement = null,
                    defaultLauncherTemplate = function () {
                        return ""
                    };
                pendo.defaultLauncher = function (e, t) {
                    defaultLauncherTemplate = t
                }, Launcher.create = function (e) {
                    return _.reduce(Launcher.behaviors, function (e, t) {
                        return t.call(e)
                    }, e)
                }, Launcher.behaviors = [Wrappable, Launcher, ContentValidation.Launcher, LauncherSearch, Onboarding, WhatsNewList];
                var removeLauncher = function () {
                        launcherTooltipDiv && (dom.removeNode(launcherTooltipDiv), launcherTooltipDiv = null), launcherElement && (launcherElement.dispose(), launcherElement = null), launcherBadge && (launcherBadge.dispose(), launcherBadge = null)
                    },
                    showHideLauncher = function () {
                        isLauncherOnElement() || !doesLauncherHaveGuides() && !launcherHasActiveSearch() ? hideLauncher() : showLauncher()
                    },
                    showLauncher = function () {
                        launcherBadge && launcherBadge.show()
                    },
                    hideLauncher = function () {
                        isLauncherOnElement() || collapseLauncherList(), launcherBadge && launcherBadge.hide()
                    },
                    isLauncher = function (e) {
                        return e && _.isFunction(e.shouldBeAddedToLauncher) ? e.shouldBeAddedToLauncher() : e && e.launchMethod && e.launchMethod.indexOf("launcher") >= 0
                    },
                    isLauncherOnElement = function () {
                        return pendo.guideWidget && pendo.guideWidget.data && "element" === pendo.guideWidget.data.launchType ? !0 : !1
                    },
                    updateLauncher = function (e, t) {
                        return pendo.guideWidget && _.isFunction(pendo.guideWidget.update) ? pendo.guideWidget.update(e, t) : void 0
                    },
                    getLauncherContext = function (e) {
                        var t = getMetadata();
                        _.isObject(t) || (t = prepareOptions());
                        var n = _.extend({
                            hidePoweredBy: !1,
                            guides: [],
                            guide: {},
                            step: {},
                            metadata: escapeStringsInObject(t)
                        }, pendo.guideWidget);
                        return n.data = _.extend({}, n.data), e && (n.guides = e), n
                    },
                    buildLauncherItem = function (e) {
                        var t = document.createElement("div");
                        dom(t).addClass("_pendo-launcher-item_"), dom(t).attr("id", "launcher-" + e.id);
                        var n = document.createElement("a");
                        return n.href = "#", n.innerHTML = e.name, t.appendChild(n), t
                    },
                    addGuideToLauncher = _.compose(showHideLauncher, function (e, t) {
                        if (isLauncher(e)) {
                            var n = Sizzle("._pendo-launcher_ ._pendo-launcher-guide-listing_")[0];
                            if (n) {
                                var i, r = Sizzle("#launcher-" + e.id);
                                if (i = r.length ? r[0] : buildLauncherItem(e), r = r.length > 0, _.isNumber(t)) {
                                    var o = Sizzle("._pendo-launcher-item_");
                                    o[t] ? i.id != o[t].id && n.insertBefore(i, o[t]) : n.appendChild(i)
                                } else n.appendChild(i)
                            }
                        }
                    }),
                    isLauncherAvailable = function () {
                        return !!launcherTooltipDiv && !isPreventLauncher
                    },
                    isLauncherVisible = function () {
                        var e = dom(launcherTooltipDiv);
                        return e.hasClass(launcherActiveClass)
                    },
                    doesLauncherHaveGuides = function () {
                        return Sizzle("._pendo-launcher-item_").length > 0
                    },
                    collapseLauncherList = function () {
                        var e = dom(launcherTooltipDiv);
                        e.hasClass(launcherActiveClass) && (e.removeClass(launcherActiveClass), launcherBadge && launcherBadge.setActive(!1))
                    },
                    expandLauncherList = function () {
                        var e = dom(launcherTooltipDiv);
                        e.hasClass(launcherActiveClass) || (e.addClass(launcherActiveClass), launcherBadge && launcherBadge.setActive(!0))
                    },
                    toggleLauncher = function () {
                        isLauncherAvailable() && (isLauncherVisible() ? collapseLauncherList() : expandLauncherList())
                    },
                    initLauncher = function () {
                        try {
                            var e = pendo.guideWidget || {},
                                t = e.data || {},
                                n = t.device || {
                                    desktop: !0,
                                    mobile: !1,
                                    iframe: !1
                                };
                            if (removeLauncher(), !isMobileUserAgent() && !n.desktop) return;
                            if (isMobileUserAgent() && !n.mobile) return;
                            if (detectMaster() && !n.iframe) return;
                            e.enabled && (createLauncher(t), hideLauncher(), shouldSwitchToOBM() && startOBM())
                        } catch (i) {
                            writeException(i, "ERROR while initializing launcher")
                        }
                    },
                    JWT = function () {
                        function e(e) {
                            try {
                                return JSON.parse(atob(e.split(".")[1]))
                            } catch (t) {
                                return null
                            }
                        }

                        function t(e) {
                            return _.isString(e) ? /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/.test(e) : !1
                        }

                        function n(e, n) {
                            return n = n ? n + ": " : "", e.jwt || e.signingKeyName ? e.jwt && !e.signingKeyName ? (debug(n + "The jwt is supplied but missing signingKeyName."), !1) : e.signingKeyName && !e.jwt ? (debug(n + "The signingKeyName is supplied but missing jwt."), !1) : t(e.jwt) ? !0 : (debug(n + "The jwt is invalid."), !1) : (debug(n + "Missing jwt and signingKeyName."), !1)
                        }

                        function i(t, i) {
                            if (i = i || "", !getPendoConfigValue("enableSignedMetadata")) return !1;
                            var r = n(t, i);
                            return getPendoConfigValue("requireSignedMetadata") && !r ? (debug("Pendo will not " + i + "."), !1) : r ? e(t.jwt) : void debug("JWT is enabled but not being used, falling back to unsigned metadata.")
                        }
                        return {
                            getJwtOptions: i
                        }
                    }();
                (function () {
                    function e(e, t) {
                        var n = e.split("."),
                            i = g;
                        !(n[0] in i) && i.execScript && i.execScript("var " + n[0]);
                        for (var r; n.length && (r = n.shift());) n.length || t === p ? i = i[r] ? i[r] : i[r] = {} : i[r] = t;
                    }

                    function t(e, t) {
                        if (this.index = "number" == typeof t ? t : 0, this.e = 0, this.buffer = e instanceof(h ? Uint8Array : Array) ? e : new(h ? Uint8Array : Array)(32768), 2 * this.buffer.length <= this.index) throw Error("invalid index");
                        this.buffer.length <= this.index && n(this)
                    }

                    function n(e) {
                        var t, n = e.buffer,
                            i = n.length,
                            r = new(h ? Uint8Array : Array)(i << 1);
                        if (h) r.set(n);
                        else
                            for (t = 0; i > t; ++t) r[t] = n[t];
                        return e.buffer = r
                    }

                    function i(e) {
                        this.buffer = new(h ? Uint16Array : Array)(2 * e), this.length = 0
                    }

                    function r(e, t) {
                        this.d = E, this.i = 0, this.input = h && e instanceof Array ? new Uint8Array(e) : e, this.c = 0, t && (t.lazy && (this.i = t.lazy), "number" == typeof t.compressionType && (this.d = t.compressionType), t.outputBuffer && (this.a = h && t.outputBuffer instanceof Array ? new Uint8Array(t.outputBuffer) : t.outputBuffer), "number" == typeof t.outputIndex && (this.c = t.outputIndex)), this.a || (this.a = new(h ? Uint8Array : Array)(32768))
                    }

                    function o(e, t) {
                        this.length = e, this.k = t
                    }

                    function a(e, t) {
                        function n(e, t) {
                            var n, i = e.k,
                                r = [],
                                o = 0;
                            n = A[e.length], r[o++] = 65535 & n, r[o++] = n >> 16 & 255, r[o++] = n >> 24;
                            var a;
                            switch (f) {
                            case 1 === i:
                                a = [0, i - 1, 0];
                                break;
                            case 2 === i:
                                a = [1, i - 2, 0];
                                break;
                            case 3 === i:
                                a = [2, i - 3, 0];
                                break;
                            case 4 === i:
                                a = [3, i - 4, 0];
                                break;
                            case 6 >= i:
                                a = [4, i - 5, 1];
                                break;
                            case 8 >= i:
                                a = [5, i - 7, 1];
                                break;
                            case 12 >= i:
                                a = [6, i - 9, 2];
                                break;
                            case 16 >= i:
                                a = [7, i - 13, 2];
                                break;
                            case 24 >= i:
                                a = [8, i - 17, 3];
                                break;
                            case 32 >= i:
                                a = [9, i - 25, 3];
                                break;
                            case 48 >= i:
                                a = [10, i - 33, 4];
                                break;
                            case 64 >= i:
                                a = [11, i - 49, 4];
                                break;
                            case 96 >= i:
                                a = [12, i - 65, 5];
                                break;
                            case 128 >= i:
                                a = [13, i - 97, 5];
                                break;
                            case 192 >= i:
                                a = [14, i - 129, 6];
                                break;
                            case 256 >= i:
                                a = [15, i - 193, 6];
                                break;
                            case 384 >= i:
                                a = [16, i - 257, 7];
                                break;
                            case 512 >= i:
                                a = [17, i - 385, 7];
                                break;
                            case 768 >= i:
                                a = [18, i - 513, 8];
                                break;
                            case 1024 >= i:
                                a = [19, i - 769, 8];
                                break;
                            case 1536 >= i:
                                a = [20, i - 1025, 9];
                                break;
                            case 2048 >= i:
                                a = [21, i - 1537, 9];
                                break;
                            case 3072 >= i:
                                a = [22, i - 2049, 10];
                                break;
                            case 4096 >= i:
                                a = [23, i - 3073, 10];
                                break;
                            case 6144 >= i:
                                a = [24, i - 4097, 11];
                                break;
                            case 8192 >= i:
                                a = [25, i - 6145, 11];
                                break;
                            case 12288 >= i:
                                a = [26, i - 8193, 12];
                                break;
                            case 16384 >= i:
                                a = [27, i - 12289, 12];
                                break;
                            case 24576 >= i:
                                a = [28, i - 16385, 13];
                                break;
                            case 32768 >= i:
                                a = [29, i - 24577, 13];
                                break;
                            default:
                                throw "invalid distance"
                            }
                            n = a, r[o++] = n[0], r[o++] = n[1], r[o++] = n[2];
                            var s, d;
                            for (s = 0, d = r.length; d > s; ++s) v[_++] = r[s];
                            y[r[0]]++, w[r[3]]++, b = e.length + t - 1, c = null
                        }
                        var i, r, o, a, d, u, l, c, g, m = {},
                            v = h ? new Uint16Array(2 * t.length) : [],
                            _ = 0,
                            b = 0,
                            y = new(h ? Uint32Array : Array)(286),
                            w = new(h ? Uint32Array : Array)(30),
                            S = e.i;
                        if (!h) {
                            for (o = 0; 285 >= o;) y[o++] = 0;
                            for (o = 0; 29 >= o;) w[o++] = 0
                        }
                        for (y[256] = 1, i = 0, r = t.length; r > i; ++i) {
                            for (o = d = 0, a = 3; a > o && i + o !== r; ++o) d = d << 8 | t[i + o];
                            if (m[d] === p && (m[d] = []), u = m[d], !(0 < b--)) {
                                for (; 0 < u.length && 32768 < i - u[0];) u.shift();
                                if (i + 3 >= r) {
                                    for (c && n(c, -1), o = 0, a = r - i; a > o; ++o) g = t[i + o], v[_++] = g, ++y[g];
                                    break
                                }
                                0 < u.length ? (l = s(t, i, u), c ? c.length < l.length ? (g = t[i - 1], v[_++] = g, ++y[g], n(l, 0)) : n(c, -1) : l.length < S ? c = l : n(l, 0)) : c ? n(c, -1) : (g = t[i], v[_++] = g, ++y[g])
                            }
                            u.push(i)
                        }
                        return v[_++] = 256, y[256]++, e.m = y, e.l = w, h ? v.subarray(0, _) : v
                    }

                    function s(e, t, n) {
                        var i, r, a, s, d, u, l = 0,
                            c = e.length;
                        s = 0, u = n.length;
                        e: for (; u > s; s++) {
                            if (i = n[u - s - 1], a = 3, l > 3) {
                                for (d = l; d > 3; d--)
                                    if (e[i + d - 1] !== e[t + d - 1]) continue e;
                                a = l
                            }
                            for (; 258 > a && c > t + a && e[i + a] === e[t + a];) ++a;
                            if (a > l && (r = i, l = a), 258 === a) break
                        }
                        return new o(l, t - r)
                    }

                    function d(e, t) {
                        var n, r, o, a, s, d = e.length,
                            l = new i(572),
                            c = new(h ? Uint8Array : Array)(d);
                        if (!h)
                            for (a = 0; d > a; a++) c[a] = 0;
                        for (a = 0; d > a; ++a) 0 < e[a] && l.push(a, e[a]);
                        if (n = Array(l.length / 2), r = new(h ? Uint32Array : Array)(l.length / 2), 1 === n.length) return c[l.pop().index] = 1, c;
                        for (a = 0, s = l.length / 2; s > a; ++a) n[a] = l.pop(), r[a] = n[a].value;
                        for (o = u(r, r.length, t), a = 0, s = n.length; s > a; ++a) c[n[a].index] = o[a];
                        return c
                    }

                    function u(e, t, n) {
                        function i(e) {
                            var n = f[e][g[e]];
                            n === t ? (i(e + 1), i(e + 1)) : --c[n], ++g[e]
                        }
                        var r, o, a, s, d, u = new(h ? Uint16Array : Array)(n),
                            l = new(h ? Uint8Array : Array)(n),
                            c = new(h ? Uint8Array : Array)(t),
                            p = Array(n),
                            f = Array(n),
                            g = Array(n),
                            m = (1 << n) - t,
                            v = 1 << n - 1;
                        for (u[n - 1] = t, o = 0; n > o; ++o) v > m ? l[o] = 0 : (l[o] = 1, m -= v), m <<= 1, u[n - 2 - o] = (u[n - 1 - o] / 2 | 0) + t;
                        for (u[0] = l[0], p[0] = Array(u[0]), f[0] = Array(u[0]), o = 1; n > o; ++o) u[o] > 2 * u[o - 1] + l[o] && (u[o] = 2 * u[o - 1] + l[o]), p[o] = Array(u[o]), f[o] = Array(u[o]);
                        for (r = 0; t > r; ++r) c[r] = n;
                        for (a = 0; a < u[n - 1]; ++a) p[n - 1][a] = e[a], f[n - 1][a] = a;
                        for (r = 0; n > r; ++r) g[r] = 0;
                        for (1 === l[n - 1] && (--c[0], ++g[n - 1]), o = n - 2; o >= 0; --o) {
                            for (s = r = 0, d = g[o + 1], a = 0; a < u[o]; a++) s = p[o + 1][d] + p[o + 1][d + 1], s > e[r] ? (p[o][a] = s, f[o][a] = t, d += 2) : (p[o][a] = e[r], f[o][a] = r, ++r);
                            g[o] = 0, 1 === l[o] && i(o)
                        }
                        return c
                    }

                    function l(e) {
                        var t, n, i, r, o = new(h ? Uint16Array : Array)(e.length),
                            a = [],
                            s = [],
                            d = 0;
                        for (t = 0, n = e.length; n > t; t++) a[e[t]] = (0 | a[e[t]]) + 1;
                        for (t = 1, n = 16; n >= t; t++) s[t] = d, d += 0 | a[t], d <<= 1;
                        for (t = 0, n = e.length; n > t; t++)
                            for (d = s[e[t]], s[e[t]] += 1, i = o[t] = 0, r = e[t]; r > i; i++) o[t] = o[t] << 1 | 1 & d, d >>>= 1;
                        return o
                    }

                    function c(e, t) {
                        this.input = e, this.a = new(h ? Uint8Array : Array)(32768), this.d = x.g;
                        var n, i = {};
                        !t && (t = {}) || "number" != typeof t.compressionType || (this.d = t.compressionType);
                        for (n in t) i[n] = t[n];
                        i.outputBuffer = this.a, this.j = new r(this.input, i)
                    }
                    var p = void 0,
                        f = !0,
                        g = this,
                        h = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array;
                    t.prototype.b = function (e, t, i) {
                        var r, o = this.buffer,
                            a = this.index,
                            s = this.e,
                            d = o[a];
                        if (i && t > 1 && (e = t > 8 ? (w[255 & e] << 24 | w[e >>> 8 & 255] << 16 | w[e >>> 16 & 255] << 8 | w[e >>> 24 & 255]) >> 32 - t : w[e] >> 8 - t), 8 > t + s) d = d << t | e, s += t;
                        else
                            for (r = 0; t > r; ++r) d = d << 1 | e >> t - r - 1 & 1, 8 === ++s && (s = 0, o[a++] = w[d], d = 0, a === o.length && (o = n(this)));
                        o[a] = d, this.buffer = o, this.e = s, this.index = a
                    }, t.prototype.finish = function () {
                        var e, t = this.buffer,
                            n = this.index;
                        return 0 < this.e && (t[n] <<= 8 - this.e, t[n] = w[t[n]], n++), h ? e = t.subarray(0, n) : (t.length = n, e = t), e
                    };
                    var m, v = new(h ? Uint8Array : Array)(256);
                    for (m = 0; 256 > m; ++m) {
                        for (var _ = m, b = _, y = 7, _ = _ >>> 1; _; _ >>>= 1) b <<= 1, b |= 1 & _, --y;
                        v[m] = (b << y & 255) >>> 0
                    }
                    var w = v;
                    i.prototype.getParent = function (e) {
                        return 2 * ((e - 2) / 4 | 0)
                    }, i.prototype.push = function (e, t) {
                        var n, i, r, o = this.buffer;
                        for (n = this.length, o[this.length++] = t, o[this.length++] = e; n > 0 && (i = this.getParent(n), o[n] > o[i]);) r = o[n], o[n] = o[i], o[i] = r, r = o[n + 1], o[n + 1] = o[i + 1], o[i + 1] = r, n = i;
                        return this.length
                    }, i.prototype.pop = function () {
                        var e, t, n, i, r, o = this.buffer;
                        for (t = o[0], e = o[1], this.length -= 2, o[0] = o[this.length], o[1] = o[this.length + 1], r = 0;
                            (i = 2 * r + 2, !(i >= this.length)) && (i + 2 < this.length && o[i + 2] > o[i] && (i += 2), o[i] > o[r]);) n = o[r], o[r] = o[i], o[i] = n, n = o[r + 1], o[r + 1] = o[i + 1], o[i + 1] = n, r = i;
                        return {
                            index: e,
                            value: t,
                            length: this.length
                        }
                    };
                    var S, E = 2,
                        C = {
                            NONE: 0,
                            h: 1,
                            g: E,
                            n: 3
                        },
                        I = [];
                    for (S = 0; 288 > S; S++) switch (f) {
                    case 143 >= S:
                        I.push([S + 48, 8]);
                        break;
                    case 255 >= S:
                        I.push([S - 144 + 400, 9]);
                        break;
                    case 279 >= S:
                        I.push([S - 256 + 0, 7]);
                        break;
                    case 287 >= S:
                        I.push([S - 280 + 192, 8]);
                        break;
                    default:
                        throw "invalid literal: " + S
                    }
                    r.prototype.f = function () {
                        var e, n, i, r, o = this.input;
                        switch (this.d) {
                        case 0:
                            for (i = 0, r = o.length; r > i;) {
                                n = h ? o.subarray(i, i + 65535) : o.slice(i, i + 65535), i += n.length;
                                var s = n,
                                    u = i === r,
                                    c = p,
                                    g = p,
                                    m = p,
                                    v = p,
                                    _ = p,
                                    b = this.a,
                                    y = this.c;
                                if (h) {
                                    for (b = new Uint8Array(this.a.buffer); b.length <= y + s.length + 5;) b = new Uint8Array(b.length << 1);
                                    b.set(this.a)
                                }
                                if (c = u ? 1 : 0, b[y++] = 0 | c, g = s.length, m = ~g + 65536 & 65535, b[y++] = 255 & g, b[y++] = g >>> 8 & 255, b[y++] = 255 & m, b[y++] = m >>> 8 & 255, h) b.set(s, y), y += s.length, b = b.subarray(0, y);
                                else {
                                    for (v = 0, _ = s.length; _ > v; ++v) b[y++] = s[v];
                                    b.length = y
                                }
                                this.c = y, this.a = b
                            }
                            break;
                        case 1:
                            var w = new t(h ? new Uint8Array(this.a.buffer) : this.a, this.c);
                            w.b(1, 1, f), w.b(1, 2, f);
                            var S, C, T, A = a(this, o);
                            for (S = 0, C = A.length; C > S; S++)
                                if (T = A[S], t.prototype.b.apply(w, I[T]), T > 256) w.b(A[++S], A[++S], f), w.b(A[++S], 5), w.b(A[++S], A[++S], f);
                                else if (256 === T) break;
                            this.a = w.finish(), this.c = this.a.length;
                            break;
                        case E:
                            var x, G, L, O, k, R, B, N, P, M, D, F, U, H, z, V = new t(h ? new Uint8Array(this.a.buffer) : this.a, this.c),
                                W = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                                j = Array(19);
                            for (x = E, V.b(1, 1, f), V.b(x, 2, f), G = a(this, o), R = d(this.m, 15), B = l(R), N = d(this.l, 7), P = l(N), L = 286; L > 257 && 0 === R[L - 1]; L--);
                            for (O = 30; O > 1 && 0 === N[O - 1]; O--);
                            var J, q, K, X, Y, Z, Q = L,
                                $ = O,
                                ee = new(h ? Uint32Array : Array)(Q + $),
                                te = new(h ? Uint32Array : Array)(316),
                                ne = new(h ? Uint8Array : Array)(19);
                            for (J = q = 0; Q > J; J++) ee[q++] = R[J];
                            for (J = 0; $ > J; J++) ee[q++] = N[J];
                            if (!h)
                                for (J = 0, X = ne.length; X > J; ++J) ne[J] = 0;
                            for (J = Y = 0, X = ee.length; X > J; J += q) {
                                for (q = 1; X > J + q && ee[J + q] === ee[J]; ++q);
                                if (K = q, 0 === ee[J])
                                    if (3 > K)
                                        for (; 0 < K--;) te[Y++] = 0, ne[0]++;
                                    else
                                        for (; K > 0;) Z = 138 > K ? K : 138, Z > K - 3 && K > Z && (Z = K - 3), 10 >= Z ? (te[Y++] = 17, te[Y++] = Z - 3, ne[17]++) : (te[Y++] = 18, te[Y++] = Z - 11, ne[18]++), K -= Z;
                                else if (te[Y++] = ee[J], ne[ee[J]]++, K--, 3 > K)
                                    for (; 0 < K--;) te[Y++] = ee[J], ne[ee[J]]++;
                                else
                                    for (; K > 0;) Z = 6 > K ? K : 6, Z > K - 3 && K > Z && (Z = K - 3), te[Y++] = 16, te[Y++] = Z - 3, ne[16]++, K -= Z
                            }
                            for (e = h ? te.subarray(0, Y) : te.slice(0, Y), M = d(ne, 7), H = 0; 19 > H; H++) j[H] = M[W[H]];
                            for (k = 19; k > 4 && 0 === j[k - 1]; k--);
                            for (D = l(M), V.b(L - 257, 5, f), V.b(O - 1, 5, f), V.b(k - 4, 4, f), H = 0; k > H; H++) V.b(j[H], 3, f);
                            for (H = 0, z = e.length; z > H; H++)
                                if (F = e[H], V.b(D[F], M[F], f), F >= 16) {
                                    switch (H++, F) {
                                    case 16:
                                        U = 2;
                                        break;
                                    case 17:
                                        U = 3;
                                        break;
                                    case 18:
                                        U = 7;
                                        break;
                                    default:
                                        throw "invalid code: " + F
                                    }
                                    V.b(e[H], U, f)
                                } var ie, re, oe, ae, se, de, ue, le, ce = [B, R],
                                pe = [P, N];
                            for (se = ce[0], de = ce[1], ue = pe[0], le = pe[1], ie = 0, re = G.length; re > ie; ++ie)
                                if (oe = G[ie], V.b(se[oe], de[oe], f), oe > 256) V.b(G[++ie], G[++ie], f), ae = G[++ie], V.b(ue[ae], le[ae], f), V.b(G[++ie], G[++ie], f);
                                else if (256 === oe) break;
                            this.a = V.finish(), this.c = this.a.length;
                            break;
                        default:
                            throw "invalid compression type"
                        }
                        return this.a
                    };
                    var T = function () {
                            function e(e) {
                                switch (f) {
                                case 3 === e:
                                    return [257, e - 3, 0];
                                case 4 === e:
                                    return [258, e - 4, 0];
                                case 5 === e:
                                    return [259, e - 5, 0];
                                case 6 === e:
                                    return [260, e - 6, 0];
                                case 7 === e:
                                    return [261, e - 7, 0];
                                case 8 === e:
                                    return [262, e - 8, 0];
                                case 9 === e:
                                    return [263, e - 9, 0];
                                case 10 === e:
                                    return [264, e - 10, 0];
                                case 12 >= e:
                                    return [265, e - 11, 1];
                                case 14 >= e:
                                    return [266, e - 13, 1];
                                case 16 >= e:
                                    return [267, e - 15, 1];
                                case 18 >= e:
                                    return [268, e - 17, 1];
                                case 22 >= e:
                                    return [269, e - 19, 2];
                                case 26 >= e:
                                    return [270, e - 23, 2];
                                case 30 >= e:
                                    return [271, e - 27, 2];
                                case 34 >= e:
                                    return [272, e - 31, 2];
                                case 42 >= e:
                                    return [273, e - 35, 3];
                                case 50 >= e:
                                    return [274, e - 43, 3];
                                case 58 >= e:
                                    return [275, e - 51, 3];
                                case 66 >= e:
                                    return [276, e - 59, 3];
                                case 82 >= e:
                                    return [277, e - 67, 4];
                                case 98 >= e:
                                    return [278, e - 83, 4];
                                case 114 >= e:
                                    return [279, e - 99, 4];
                                case 130 >= e:
                                    return [280, e - 115, 4];
                                case 162 >= e:
                                    return [281, e - 131, 5];
                                case 194 >= e:
                                    return [282, e - 163, 5];
                                case 226 >= e:
                                    return [283, e - 195, 5];
                                case 257 >= e:
                                    return [284, e - 227, 5];
                                case 258 === e:
                                    return [285, e - 258, 0];
                                default:
                                    throw "invalid length: " + e
                                }
                            }
                            var t, n, i = [];
                            for (t = 3; 258 >= t; t++) n = e(t), i[t] = n[2] << 24 | n[1] << 16 | n[0];
                            return i
                        }(),
                        A = h ? new Uint32Array(T) : T,
                        x = C;
                    c.prototype.f = function () {
                        var e, t, n, i, r, o, a = 0;
                        switch (o = this.a, e = Math.LOG2E * Math.log(32768) - 8, t = e << 4 | 8, o[a++] = t, this.d) {
                        case x.NONE:
                            i = 0;
                            break;
                        case x.h:
                            i = 1;
                            break;
                        case x.g:
                            i = 2;
                            break;
                        default:
                            throw Error("unsupported compression type")
                        }
                        n = i << 6 | 0, o[a++] = n | 31 - (256 * t + n) % 31;
                        var s = this.input;
                        if ("string" == typeof s) {
                            var d, u, l = s.split("");
                            for (d = 0, u = l.length; u > d; d++) l[d] = (255 & l[d].charCodeAt(0)) >>> 0;
                            s = l
                        }
                        for (var c, p = 1, f = 0, g = s.length, m = 0; g > 0;) {
                            c = g > 1024 ? 1024 : g, g -= c;
                            do p += s[m++], f += p; while (--c);
                            p %= 65521, f %= 65521
                        }
                        return r = (f << 16 | p) >>> 0, this.j.c = a, o = this.j.f(), a = o.length, h && (o = new Uint8Array(o.buffer), o.length <= a + 4 && (this.a = new Uint8Array(o.length + 4), this.a.set(o), o = this.a), o = o.subarray(0, a + 4)), o[a++] = r >> 24 & 255, o[a++] = r >> 16 & 255, o[a++] = r >> 8 & 255, o[a++] = 255 & r, o
                    }, e("Zlib.Deflate", c), e("Zlib.Deflate.compress", function (e, t) {
                        return new c(e, t).f()
                    }), e("Zlib.Deflate.prototype.compress", c.prototype.f);
                    var G, L, O, k, R = {
                        NONE: x.NONE,
                        FIXED: x.h,
                        DYNAMIC: x.g
                    };
                    if (Object.keys) G = Object.keys(R);
                    else
                        for (L in G = [], O = 0, R) G[O++] = L;
                    for (O = 0, k = G.length; k > O; ++O) L = G[O], e("Zlib.Deflate.CompressionType." + L, R[L])
                }).call(pendo),
                    function () {
                        function e(e, n) {
                            var i = e.split("."),
                                r = t;
                            !(i[0] in r) && r.execScript && r.execScript("var " + i[0]);
                            for (var o; i.length && (o = i.shift());) i.length || void 0 === n ? r = r[o] ? r[o] : r[o] = {} : r[o] = n
                        }
                        var t = this,
                            n = {
                                c: function (e, t, i) {
                                    return n.update(e, 0, t, i)
                                },
                                update: function (e, t, i, r) {
                                    var o = n.a,
                                        a = "number" == typeof i ? i : i = 0,
                                        s = "number" == typeof r ? r : e.length;
                                    for (t ^= 4294967295, a = 7 & s; a--; ++i) t = t >>> 8 ^ o[255 & (t ^ e[i])];
                                    for (a = s >> 3; a--; i += 8) t = t >>> 8 ^ o[255 & (t ^ e[i])], t = t >>> 8 ^ o[255 & (t ^ e[i + 1])], t = t >>> 8 ^ o[255 & (t ^ e[i + 2])], t = t >>> 8 ^ o[255 & (t ^ e[i + 3])], t = t >>> 8 ^ o[255 & (t ^ e[i + 4])], t = t >>> 8 ^ o[255 & (t ^ e[i + 5])], t = t >>> 8 ^ o[255 & (t ^ e[i + 6])], t = t >>> 8 ^ o[255 & (t ^ e[i + 7])];
                                    return (4294967295 ^ t) >>> 0
                                },
                                d: function (e, t) {
                                    return (n.a[255 & (e ^ t)] ^ e >>> 8) >>> 0
                                },
                                b: [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]
                            };
                        n.a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array ? new Uint32Array(n.b) : n.b, e("Zlib.CRC32", n), e("Zlib.CRC32.calc", n.c), e("Zlib.CRC32.update", n.update)
                    }.call(pendo);
                var JSON = window.JSON;
                JSON && "function" == typeof JSON.stringify && '{"props":{}}' === JSON.stringify({
                        props: {}
                    }) || (JSON = {}),
                    function () {
                        function f(e) {
                            return 10 > e ? "0" + e : e
                        }

                        function quote(e) {
                            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                                var t = meta[e];
                                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                            }) + '"' : '"' + e + '"'
                        }

                        function str(e, t) {
                            var n, i, r, o, a, s = gap,
                                d = t[e];
                            switch (d && "object" == typeof d && "function" == typeof d.toJSON && (d = d.toJSON(e)), "function" == typeof rep && (d = rep.call(t, e, d)), typeof d) {
                            case "string":
                                return quote(d);
                            case "number":
                                return isFinite(d) ? String(d) : "null";
                            case "boolean":
                            case "null":
                                return String(d);
                            case "object":
                                if (!d) return "null";
                                if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(d)) {
                                    for (o = d.length, n = 0; o > n; n += 1) a[n] = str(n, d) || "null";
                                    return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]" : "[" + a.join(",") + "]", gap = s, r
                                }
                                if (rep && "object" == typeof rep)
                                    for (o = rep.length, n = 0; o > n; n += 1) "string" == typeof rep[n] && (i = rep[n], r = str(i, d), r && a.push(quote(i) + (gap ? ": " : ":") + r));
                                else
                                    for (i in d) Object.prototype.hasOwnProperty.call(d, i) && (r = str(i, d), r && a.push(quote(i) + (gap ? ": " : ":") + r));
                                return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}" : "{" + a.join(",") + "}", gap = s, r
                            }
                        }
                        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (e) {
                            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
                            return this.valueOf()
                        });
                        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                            gap, indent, meta = {
                                "\b": "\\b",
                                "	": "\\t",
                                "\n": "\\n",
                                "\f": "\\f",
                                "\r": "\\r",
                                '"': '\\"',
                                "\\": "\\\\"
                            },
                            rep;
                        "function" != typeof JSON.stringify && (JSON.stringify = function (e, t, n) {
                            var i;
                            if (gap = "", indent = "", "number" == typeof n)
                                for (i = 0; n > i; i += 1) indent += " ";
                            else "string" == typeof n && (indent = n);
                            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                            return str("", {
                                "": e
                            })
                        }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
                            function walk(e, t) {
                                var n, i, r = e[t];
                                if (r && "object" == typeof r)
                                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (i = walk(r, n), i !== undefined ? r[n] = i : delete r[n]);
                                return reviver.call(e, t, r)
                            }
                            var j;
                            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                                "": j
                            }, "") : j;
                            throw new SyntaxError("JSON.parse")
                        })
                    }();
                var memoizedWarnDep = _.memoize(function (e, t) {
                    e = e || "Function", t = t ? " and " + t : "";
                    var n = e + " deprecated" + t;
                    return pendo.log(n), n
                });
                pendo.SHADOW_STYLE = "", _.extend(pendo, {
                    _showElementGuide: deprecateFn(showTooltipGuide, "_showElementGuide", "is going away"),
                    flushNow: deprecateFn(flushNow, "pendo.flushNow", "is going away"),
                    flushEventCache: deprecateFn(null, "pendo.flushEventCache", "is gone"),
                    HOST: HOST,
                    MAX_LENGTH: ENCODED_EVENT_MAX_LENGTH,
                    MAX_NUM_EVENTS: MAX_NUM_EVENTS,
                    _createToolTip: deprecateFn(createTooltipGuide, "pendo._createToolTip", "is going away"),
                    _get_tooltip_dimensions: deprecateFn(getTooltipDimensions, "pendo._get_tooltip_dimensions", "is going away"),
                    _isOldIE: deprecateFn(isOldIE, "pendo._isOldIE", "is going away"),
                    _logMessage: deprecateFn(writeMessage, "pendo._logMessage", "is going away"),
                    _sendEvent: deprecateFn(null, "pendo._sendEvent", "is gone"),
                    _sendGuideEvent: deprecateFn(null, "pendo._sendGuideEvent", "is gone"),
                    _stopEvents: locked,
                    _storeInCache: deprecateFn(null, "pendo._storeInCache", "is gone"),
                    _writeEventImgTag: deprecateFn(null, "pendo._writeEventImgTag", "is gone"),
                    _writeImgTag: deprecateFn(writeImgTag, "pendo._writeImgTag", "is going away"),
                    attachEvent: deprecateFn(attachEvent, "pendo.attachEvent", "is going away"),
                    detachEvent: deprecateFn(detachEvent, "pendo.detachEvent", "is going away"),
                    getText: deprecateFn(TextCapture.getText, "pendo.getText", "is going away"),
                    getUA: deprecateFn(getUA, "pendo.getUA", "is going away"),
                    ifDebugThen: deprecateFn(null, "pendo.ifDebugThen", "is gone"),
                    send_event: deprecateFn(collectEvent, "pendo.send_event", "has changed to pendo.cache.createEvent"),
                    wire_page: deprecateFn(wirePage, "pendo.wire_page", "is going away"),
                    findGuideBy: findGuideBy,
                    findGuideById: findGuideById,
                    findStepInGuide: findStepInGuide,
                    _updateGuideStepStatus: _updateGuideStepStatus,
                    _addCloseButton: addCloseButton,
                    initialize: initialize,
                    getEventCache: getGuideEventCache,
                    processEventCache: processGuideEventCache,
                    isGuideShown: isGuideShown,
                    _getNextStepInMultistep: getNextStepInMultistep,
                    badgeDiv: launcherBadge && launcherBadge.element,
                    launcherToolTipDiv: launcherTooltipDiv,
                    updateOptions: updateOptions,
                    createLauncher: createLauncher,
                    initLauncher: initLauncher,
                    _addGuideToLauncher: addGuideToLauncher,
                    isAnonymousVisitor: isAnonymousVisitor,
                    DEFAULT_VISITOR_ID: DEFAULT_VISITOR_ID,
                    shouldIdentityChange: _.constant(!1),
                    read: agentStorage.read,
                    write: agentStorage.write,
                    _delete_cookie: agentStorage.clear,
                    _set_cookie: setCookie,
                    _get_cookie: getCookie,
                    get_cookie_key: getPendoCookieKey,
                    ENV: ENV,
                    eventCache: eventCache,
                    _getOpacityStyles: deprecateFn(function () {}, "pendo._getOpacityStyles", "is going away"),
                    setStyle: setStyle,
                    _createGuideEvent: createGuideEvent,
                    seenGuide: seenGuide,
                    dismissedGuide: dismissedGuide,
                    advancedGuide: advancedGuide,
                    seenTime: seenTime,
                    placeBadge: placeBadge,
                    isBadge: isBadge,
                    showPreview: deprecateFn(showPreview, "pendo.showPreview", "is going away"),
                    removeAllBadges: removeAllBadges,
                    tellMaster: tellMaster,
                    DEFAULT_TIMER_LENGTH: DEFAULT_TIMER_LENGTH,
                    registerMessageHandler: registerMessageHandler,
                    _get_offset: getOffsetPosition,
                    _shouldAutoDisplayGuide: shouldAutoDisplayGuide,
                    removeBadge: removeBadge,
                    _showLightboxGuide: showLightboxGuide,
                    _showGuide: showGuide,
                    getElementForGuideStep: getElementForGuideStep,
                    isElementVisible: isElementVisible,
                    getTooltipDivId: getStepDivId,
                    setupWatchOnTooltip: setupWatchOnElement,
                    detectMaster: detectMaster,
                    listenToMaster: listenToMaster,
                    start: whenLoadedCall,
                    SEND_INTERVAL: SEND_INTERVAL,
                    stageGuideEvent: stageGuideEvent,
                    startStagedTimer: startStagedTimer,
                    isURLValid: isURLValid,
                    getURL: getURL,
                    _get_screen_dim: getScreenDimensions,
                    _isInViewport: _isInViewport,
                    _getCss3Prop: _getCss3Prop,
                    waitThenStartGuides: waitThenLoop
                });
                var debugging = {
                    store: store,
                    getEventCache: function () {
                        return [].concat(eventCache)
                    },
                    getAllGuides: function () {
                        return [].concat(getActiveGuides())
                    },
                    getAutoGuides: function () {
                        return AutoDisplay.sortAndFilter(getActiveGuides(), pendo.autoOrdering)
                    },
                    getBadgeGuides: function () {
                        return _.filter(getActiveGuides(), isBadge)
                    },
                    getLauncherGuides: function () {
                        return _.filter(getActiveGuides(), isLauncher)
                    },
                    getEventHistory: function () {
                        return []
                    },
                    getOriginalOptions: function () {
                        return originalOptions
                    },
                    setActiveGuides: setActiveGuides,
                    getBody: dom.getBody,
                    isMobileUserAgent: isMobileUserAgent,
                    areGuidesDelayed: areGuidesDelayed,
                    doesElementMatchContainsRules: doesElementMatchContainsRules,
                    getMetadata: function () {
                        return getMetadata()
                    },
                    isStagingServer: isStagingServer,
                    AutoDisplay: AutoDisplay
                };
                _.extend(debug, debugging);
                var ExtensionService = {};
                ! function (e) {
                    function t(e) {
                        if (!e.length) return e;
                        var n = _.filter(e, o);
                        return n.length ? t(_.difference(e, n)) : e
                    }

                    function n(e) {
                        var t = ["name", "version", "use", "type", "uri"];
                        if (!_.every(t, _.partial(_.has, e))) return !1;
                        var n = r(e.use);
                        return _.every(_.map(n, function (t) {
                            return t(e)
                        }))
                    }

                    function i(e) {
                        return d[e] ? d[e].handler || _.identity : null
                    }

                    function r(e) {
                        return d[e] ? d[e].validators : []
                    }

                    function o(t) {
                        if ("behavior" === t.use) {
                            var n = t.uri(e, ExtensionAPI);
                            return n ? (s.push(t), !0) : !1
                        }
                        var r = i(t.use);
                        if (!r) return !1;
                        var o = r(t);
                        return o && s.push(o), !!o
                    }
                    var a = [],
                        s = [],
                        d = {};
                    pendo.addExtension = function (e) {
                        e = [].concat(e);
                        var i = _.filter(e, n);
                        i.length && (a = t(a.concat(i)))
                    }, e.tagExtension = function (t, n) {
                        var i = e.findExtensionByName(t);
                        i.tags = [].concat(i.tags || [], n)
                    }, e.findExtensionByTag = function (e) {
                        return _.find(s, function (t) {
                            return _.contains(t.tags, e)
                        })
                    }, e.findExtensionByName = function (e) {
                        return _.findWhere(s, {
                            name: e
                        })
                    }, e.filterExtensionsByUse = function (e) {
                        return _.filter(s, function (t) {
                            return t.use === e
                        })
                    }, e.findExtensionByNameAndProvider = function (e, t) {
                        return _.find(s, function (n) {
                            var i = n.data;
                            return i ? i.name === e && i.provider && i.provider.name === t : !1
                        })
                    }, e.registerExtensionsByUse = function (e, t, n) {
                        n = n ? [].concat(n) : [], d[e] = {
                            handler: t,
                            validators: n
                        }
                    }
                }(ExtensionService);
                var ExtensionAPI = {
                        Launcher: {
                            addBehavior: function (e) {
                                Launcher.behaviors.push(e)
                            }
                        },
                        Metadata: {
                            getMetadata: function () {
                                return getMetadata()
                            }
                        },
                        Util: {
                            documentScrollTop: documentScrollTop,
                            documentScrollLeft: documentScrollLeft,
                            getOffsetPosition: getOffsetPosition
                        },
                        Events: Events
                    },
                    FlexboxPolyfill = function () {
                        function e(e, t) {
                            var n = e.cloneNode(),
                                r = t ? i(e) : FlexboxPolyfill.getPendoVisualElements(e.children),
                                o = FlexboxPolyfill.getPendoInlineUIElements(e.children),
                                a = !!d(e.children).length;
                            if (a && !t) return e;
                            if (1 === r.length && 0 === r[0].id.indexOf("pendo-text")) return e;
                            n.innerHTML = "";
                            for (var s = 0; s < r.length; s++) pendo.BuildingBlocks.BuildingBlockGuides.isElementHiddenInGuide(r[s]) ? n.appendChild(r[s]) : n.appendChild(FlexboxPolyfill.wrapElementInMockFlexboxContainer(r[s]));
                            for (var u = 0; u < o.length; u++) n.appendChild(o[u]);
                            return e.parentNode.replaceChild(n, e), n
                        }

                        function t(e, t, n) {
                            if (!(e.length < 1)) switch (n) {
                            case "space-between":
                                FlexboxPolyfill.spaceBetween(e, t);
                                break;
                            case "space-around":
                                FlexboxPolyfill.spaceAround(e, t);
                                break;
                            case "space-evenly":
                                FlexboxPolyfill.spaceEvenly(e, t);
                                break;
                            case "center":
                                FlexboxPolyfill.center(e, t);
                                break;
                            case "flex-start":
                                FlexboxPolyfill.flexStart(e);
                                break;
                            case "flex-end":
                                FlexboxPolyfill.flexEnd(e, t)
                            }
                        }

                        function n(e, t, n) {
                            switch (n) {
                            case "top":
                                FlexboxPolyfill.topAlignment(e);
                                break;
                            case "center":
                                FlexboxPolyfill.centerAlignment(e, t);
                                break;
                            case "bottom":
                                FlexboxPolyfill.bottomAlignment(e)
                            }
                        }

                        function i(e) {
                            return Sizzle(["._pendo-button", ".pendo-block-wrapper", "._pendo-multi-choice-poll-select-border", "div._pendo-text-subTitle", "div._pendo-text-paragraph", "div._pendo-text-title", "div._pendo-text-custom"].join(","), e)
                        }

                        function r(e) {
                            var t = e.getAttribute("class");
                            return !!(t && t.indexOf("pendo-inline-ui") > -1)
                        }

                        function o(e) {
                            return _.filter(e, function (e) {
                                return !r(e)
                            })
                        }

                        function a(e) {
                            return _.filter(e, function (e) {
                                return r(e)
                            })
                        }

                        function s(e) {
                            return _.filter(e, function (e) {
                                var t = e.getAttribute("class") || "";
                                return t && t.indexOf("pendo-mock-flexbox-element") > -1
                            })
                        }

                        function d(e) {
                            return _.filter(e, function (e) {
                                var t = e.getAttribute("class") || "";
                                return t && t.indexOf("pendo-mock-flexbox-row") > -1
                            })
                        }

                        function u(e) {
                            var t = document.createElement("div");
                            return t.style.display = "inline-block", e || (t.style.position = "absolute"), t.style["vertical-align"] = "top", t.setAttribute("class", "pendo-mock-flexbox-element"), t
                        }

                        function l() {
                            var e = document.createElement("div");
                            return e.setAttribute("class", "pendo-mock-flexbox-row"), e.style.display = "block", e.style.position = "relative", e.style.width = "100%", e
                        }

                        function c(e) {
                            var t = e.getAttribute("class") || "",
                                n = -1 !== t.indexOf("pendo-block-wrapper"),
                                i = e.style && "absolute" === e.style.position,
                                r = get(e.style, "width", ""),
                                o = getComputedStyle_safe(e).width;
                            if (n) {
                                var a = r ? o : null,
                                    s = t && t.indexOf("_pendo-open-text-poll-wrapper") >= 0;
                                r = a ? a : C(e.children[0]) + "px", s && (e.style.width = a)
                            }
                            if (t && t.indexOf("_pendo-resource-center-onboarding-module-guide-complete-circle-container") >= 0)
                                for (var d = e.parentNode, u = parseInt(C(d), 10), l = parseInt(C(e), 10) + parseInt(e.style.marginRight || 0, 10) + parseInt(e.style.marginLeft || 0, 10), c = 0; c < d.children.length; c++) {
                                    var p = d.children[c];
                                    if (p != e) {
                                        var f = u - l;
                                        "border-box" !== get(p, "style.boxSizing") && (f = f - parseInt(p.style.paddingLeft || 0, 10) - parseInt(p.style.paddingRight || 0, 10)), p.style.width = f.toString() + "px"
                                    }
                                }
                            if (!t || t.indexOf("pendo-mock-flexbox-element") < 0) {
                                var g = FlexboxPolyfill.createFlexContainer(i);
                                g.appendChild(e);
                                var h = get(e, "children"),
                                    m = h[0];
                                if (n && m) {
                                    var v = m.getAttribute("class") || "",
                                        _ = -1 !== v.indexOf("image-preview-placeholder");
                                    _ && (g.children[0].style.width = r)
                                }
                                return n && !e.style.width && (g.children[0].children[0].style.width = r), g
                            }
                            return e
                        }

                        function p(e, t) {
                            for (var n = [], i = 0; i < e.length; i++) {
                                if (t) {
                                    var r = e[i].children[0].children[0].getAttribute("class") || "",
                                        o = -1 !== r.indexOf("pendo-block-wrapper");
                                    if (o) {
                                        var a = e[i].children[0].offsetHeight + "px";
                                        e[i].style.height = a
                                    }
                                }
                                n.push(e[i].offsetHeight)
                            }
                            return _.reduce(n, function (e, t) {
                                return Math.max(e, t)
                            }, 20)
                        }

                        function f(e, t) {
                            e = Array.prototype.slice.call(e);
                            for (var n = e.slice(0, t), i = 0, r = 0; r < n.length; r++) {
                                var o = n[r].offsetWidth;
                                i += o
                            }
                            return i
                        }

                        function g(e) {
                            for (var t = 0; t < e.length; t++) e[t].style.top = "0px"
                        }

                        function h(e, t) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n],
                                    r = i.offsetHeight,
                                    o = t / 2,
                                    a = Math.round(o - r / 2);
                                i.style.top = a + "px"
                            }
                        }

                        function m(e) {
                            for (var t = 0; t < e.length; t++) e[t].style.bottom = "0px"
                        }

                        function v(e, t) {
                            for (var n = t / Math.max(e.length - 1, 1), i = e[0], r = e[e.length - 1], o = 1; o < e.length - 1; o++) {
                                var a = f(e, o);
                                e[o].style.left = o * n + a + "px"
                            }
                            i.style.left = "0px", r.style.right = "0px"
                        }

                        function b(e, t) {
                            for (var n = t / (2 * e.length), i = e[0], r = e[e.length - 1], o = 1; o < e.length - 1; o++) {
                                var a = f(e, o);
                                e[o].style.left = 2 * n + a + "px"
                            }
                            i.style.left = n + "px", r.style.right = n + "px"
                        }

                        function y(e, t) {
                            for (var n = t / (e.length + 1), i = e[0], r = e[e.length - 1], o = 1; o < e.length - 1; o++) {
                                var a = f(e, o);
                                e[o].style.left = n + a + "px"
                            }
                            i.style.left = n + "px", r.style.right = n + "px"
                        }

                        function w(e, t) {
                            for (var n = t / 2, i = e[0], r = e[e.length - 1], o = 1; o < e.length - 1; o++) {
                                var a = f(e, o);
                                e[o].style.left = n + a + "px"
                            }
                            e.length > 1 && (r.style.right = n + "px"), i.style.left = n + "px"
                        }

                        function S(e) {
                            var t = e[0];
                            t.style.left = "0px";
                            for (var n = 1; n < e.length; n++) {
                                var i = f(e, n);
                                e[n].style.left = i + "px"
                            }
                        }

                        function E(e, t) {
                            for (var n = t, i = e[0], r = e[e.length - 1], o = 1; o < e.length - 1; o++) {
                                var a = f(e, o);
                                e[o].style.left = n + a + "px"
                            }
                            e.length > 1 && (i.style.left = n + "px"), r.style.right = "0px"
                        }

                        function C(e) {
                            var t = e.getBoundingClientRect();
                            return t.width ? t.width : (t = e.getBoundingClientRect(), t.right - t.left)
                        }

                        function I(e) {
                            return parseInt(C(e), 10) - parseInt(e.style.paddingLeft, 10) - parseInt(e.style.paddingRight, 10)
                        }

                        function T(e, t, n) {
                            var i = s(e.children);
                            if (0 !== i.length) {
                                var r = FlexboxPolyfill.wrapFlexElementsInFlexRows(i, e);
                                FlexboxPolyfill.formatFlexRows(r, e, t, n)
                            }
                        }

                        function A(e, t) {
                            for (var n = I(t), i = FlexboxPolyfill.createFlexRow(), r = {
                                    row: i,
                                    rowWidthUsed: 0
                                }, o = [r], a = 0; a < e.length; a++) {
                                var s = e[a],
                                    d = parseInt(C(s), 10);
                                r.rowWidthUsed += d, r.rowWidthUsed > n && 0 !== _.indexOf(e, s) && (r.rowWidthUsed -= d, i = FlexboxPolyfill.createFlexRow(), i.appendChild(s), r = {
                                    row: i,
                                    rowWidthUsed: d
                                }, o.push(r)), r.row.appendChild(s)
                            }
                            return o
                        }

                        function x(e, t, n, i) {
                            for (var r = I(t), o = 0; o < e.length; o++) {
                                var a = e[o];
                                t.appendChild(a.row);
                                var s = !1,
                                    d = FlexboxPolyfill.findMaxChildHeight(a.row.children, s);
                                a.row.style["min-height"] = d + "px";
                                var u = r - parseInt(a.rowWidthUsed, 10);
                                FlexboxPolyfill.setElementHorizontalAlignment(a.row.children, u, n), FlexboxPolyfill.setElementVerticalAlignment(a.row.children, d, i)
                            }
                        }
                        return {
                            calculateTotalOffsetWidth: f,
                            center: w,
                            createFlexContainer: u,
                            createFlexRow: l,
                            findMaxChildHeight: p,
                            flexEnd: E,
                            flexStart: S,
                            getPendoInlineUIElements: a,
                            getPendoVisualElements: o,
                            initializeFlexElements: e,
                            isPendoInlineUIElement: r,
                            setElementHorizontalAlignment: t,
                            setElementVerticalAlignment: n,
                            spaceAround: b,
                            spaceBetween: v,
                            spaceEvenly: y,
                            topAlignment: g,
                            centerAlignment: h,
                            bottomAlignment: m,
                            wrapElementInMockFlexboxContainer: c,
                            getVisualElementsWrappedInFlexElements: i,
                            initializeFlexRows: T,
                            wrapFlexElementsInFlexRows: A,
                            formatFlexRows: x
                        }
                    }(),
                    BuildingBlockTemplates = function () {
                        function e(e, t) {
                            var n = e.attributes.resourceCenter.children;
                            return _.reduce(n, function (e, n, i) {
                                var r = o(t, n);
                                return r ? (e.push(r), e) : e
                            }, [])
                        }

                        function t(e, t, n, i) {
                            var o = i || getActiveGuides();
                            switch (e) {
                            case "pendo_resource_center_module_list_item":
                                return r(t, n, o);
                            case "pendo_resource_center_guide_list_item":
                                return a(t, n, o);
                            case "pendo_resource_center_onboarding_item":
                                return s(t, n, o);
                            case "pendo_resource_center_onboarding_progress_bar":
                                return d(t, n, o);
                            case "pendo_resource_center_announcement_item":
                                return u(t, n, o);
                            case "pendo_guide_data_text_block":
                                return f(t, n, o);
                            default:
                                return []
                            }
                        }

                        function n(e, t) {
                            var n = /<%=\s*([A-Za-z_0-9$]+)\s*%>/gi;
                            return e.replace(n, function (e, n) {
                                return _.isNull(t[n]) || _.isUndefined(t[n]) ? e : t[n]
                            })
                        }

                        function i(e, t, r) {
                            if (e.content && (e.content = n(e.content, t)), e.props && e.props.id && e.props.id.indexOf("pendo-right-caret") >= 0 && (e.props["aria-labelledby"] = r), e.children)
                                for (var o = 0; o < e.children.length; o++) i(e.children[o], t, r);
                            return e
                        }

                        function r(e, t, n) {
                            var r = e.templateChildren;
                            return _.reduce(r, function (r, o, a) {
                                var s = BuildingBlockResourceCenter.findResourceCenterHomeView(n),
                                    d = _.find(n, function (e) {
                                        return e.id === o.id
                                    });
                                if (pendo.designer) d = o, s = _.find(n, function (e) {
                                    return get(e, "attributes.resourceCenter.isTopLevel")
                                });
                                else {
                                    if (!d) return r;
                                    if (!d.hasResourceCenterContent) return _.each(d.children, function (e) {
                                        var t = pendo.findGuideById(e);
                                        t && t.control && t.steps[0].onControlGuide("control")
                                    }), r
                                }
                                var u = JSON.parse(JSON.stringify(e));
                                delete u.templateChildren, u.props.id = u.props.id + "-" + a, u.props["data-pendo-module-guide-id"] = d.id, u.actions || (u.actions = []);
                                var l = {
                                    action: "renderResourceCenterModule",
                                    source: u.props.id,
                                    destination: "EventRouter",
                                    parameters: [{
                                        name: "guideId",
                                        type: "string",
                                        value: d.id
                                    }],
                                    uiMetadata: {},
                                    eventType: "click"
                                };
                                pendo.designer || u.actions.push(l);
                                var c = get(s, "attributes.notificationBubble"),
                                    p = get(s, "attributes.notifications");
                                if (c && p) {
                                    var f;
                                    "AnnouncementsModule" === get(d, "attributes.resourceCenter.moduleId") && (f = d.id), "chat" === get(d, "attributes.resourceCenter.integrationName") && (f = "chat"), f && (u.props["data-pendo-notification-id"] = f, g(u, s, c, f, s.attributes.notifications.individualCounts[f]))
                                }
                                return u = i(u, o, u.props.id), r.concat(BuildingBlockGuides.buildNodeFromJSON(u, t, n))
                            }, [])
                        }

                        function o(e, t) {
                            var n = _.find(e, function (e) {
                                return e.id === (t.id ? t.id : t)
                            });
                            if (pendo.designer) return t;
                            if (n) return n.ineligibleForRC ? void(n.control && n.steps[0].onControlGuide("control")) : n
                        }

                        function a(e, t, n) {
                            var r = e.templateChildren;
                            return _.reduce(r, function (r, a, s) {
                                var d = o(n, a);
                                if (!d) return r;
                                var u = JSON.parse(JSON.stringify(e));
                                a.keywords && (u.props["data-_pendo-text-list-item-1"] = a.keywords), delete u.templateChildren, u.props.id = u.props.id + "-" + s, u.actions || (u.actions = []);
                                var l = {
                                    action: "showGuide",
                                    source: u.props.id,
                                    destination: "EventRouter",
                                    parameters: [{
                                        name: "guideId",
                                        type: "string",
                                        value: d.id
                                    }, {
                                        name: "reason",
                                        type: "string",
                                        value: "launcher"
                                    }],
                                    uiMetadata: {},
                                    eventType: "click"
                                };
                                return pendo.designer || u.actions.push(l), u = i(u, a), r.concat(BuildingBlockGuides.buildNodeFromJSON(u, t, n))
                            }, [])
                        }

                        function s(e, t, r) {
                            var a = e.templateChildren;
                            return _.reduce(a, function (a, s, d) {
                                var u = o(r, s);
                                if (!u) return a;
                                var l = JSON.parse(JSON.stringify(e));
                                delete l.templateChildren, l.props.id = l.props.id + "-" + d, l.actions || (l.actions = []);
                                var c = {
                                    action: "showGuide",
                                    source: l.props.id,
                                    destination: "EventRouter",
                                    parameters: [{
                                        name: "guideId",
                                        type: "string",
                                        value: u.id
                                    }, {
                                        name: "reason",
                                        type: "string",
                                        value: "launcher"
                                    }],
                                    uiMetadata: {},
                                    eventType: "click"
                                };
                                pendo.designer || l.actions.push(c);
                                var p = u.getTotalSteps(),
                                    f = u.getSeenSteps();
                                u.isComplete() && (f = p);
                                var g = parseInt(f / p * 100, 10),
                                    h = BuildingBlockGuides.findDomBlockInDomJson(l, function (e) {
                                        return e.svgWidgetId
                                    });
                                if (h.svgAttributes.fillCircle.percentComplete = g, s.hasOwnProperty("subtitle")) s.stepProgress = n(s.subtitle, {
                                    currentStep: f,
                                    totalSteps: p
                                });
                                else {
                                    var m = "Step " + f + " of " + p;
                                    s.stepProgress = m
                                }
                                return l = i(l, s), a.concat(BuildingBlockGuides.buildNodeFromJSON(l, t, r))
                            }, [])
                        }

                        function d(e, t, n) {
                            var r = t.getGuide().attributes.resourceCenter.children,
                                a = 0,
                                s = 0;
                            _.forEach(r, function (e) {
                                var t = o(n, e);
                                t && (t.isComplete() ? (a += t.getTotalSteps(), s += t.getTotalSteps()) : (a += t.getTotalSteps(), s += t.getSeenSteps()))
                            });
                            var d = parseInt(s / a * 100, 10);
                            isNaN(d) && (d = 0);
                            var u = {
                                    totalPercentComplete: d + "%"
                                },
                                l = JSON.parse(JSON.stringify(e));
                            l = i(l, u);
                            var c = BuildingBlockGuides.findDomBlockInDomJson(l, function (e) {
                                return e.props && e.props.id && -1 !== e.props.id.indexOf("pendo-progress-bar-fill")
                            });
                            return c.props.style.width = u.totalPercentComplete, [BuildingBlockGuides.buildNodeFromJSON(l, t, n)]
                        }

                        function u(e, t, n) {
                            var i = t.getGuide().attributes.resourceCenter.children,
                                r = _.reduce(i, function (e, t) {
                                    var i = o(n, t);
                                    return i && i.steps && i.steps.length ? e.concat(i) : e
                                }, []),
                                a = _.every(r, function (e) {
                                    var t = e.steps[0];
                                    return AsyncContent.hasContent(t) ? !0 : !1
                                });
                            if (!a) return [];
                            var s = BuildingBlockResourceCenter.getResourceCenter(),
                                d = get(s, "attributes.notificationBubble");
                            return _.map(r, function (n, i) {
                                var r = "whatsnew" === get(n, "attributes.type"),
                                    o = JSON.parse(JSON.stringify(e)),
                                    a = n.steps[0];
                                return a.eventRouter = new EventRouter, o.props.id = o.props.id + "-" + i, o.props["data-pendo-announcement-guide-id"] = n.id, r ? c(n, o, d) : l(n, o, d, t)
                            })
                        }

                        function l(e, t, n, i) {
                            var r, o = pendo.GuideFactory(e),
                                a = e.steps[0];
                            _.isFunction(a.script) && a.script(a, o);
                            var s = a.domJson;
                            if (t.children = [s], n) {
                                r = p(n);
                                var d = function (e) {
                                        return "pendo-guide-container" === e.props.id
                                    },
                                    u = BuildingBlockGuides.findDomBlockInDomJson(t, d),
                                    l = parseInt(t.props.style["padding-top"], 10),
                                    c = parseInt(u.props.style["padding-top"], 10);
                                r.props.style.top = c + l + 5 + "px"
                            }!BuildingBlockResourceCenter.hasAnnouncementBeenSeen(e) && r && (t.props["class"] += " pendo-unseen-announcement", t.children.unshift(r)), delete t.templateName;
                            var f = BuildingBlockGuides.buildNodeFromJSON(t, a);
                            return f
                        }

                        function c(e, t, n) {
                            var i, r = pendo.GuideFactory(e),
                                o = r.steps[0];
                            o.render(), _.isFunction(o.script) && o.script(o, r);
                            var a = o.guideElement,
                                s = a[0].id,
                                d = "#" + s + " h1::after { display:none; }",
                                u = a[0].appendChild(document.createElement("style"));
                            u.innerHTML = d, n && (i = p(n), i.props.style.top = "20px"), !BuildingBlockResourceCenter.hasAnnouncementBeenSeen(e) && i && (t.props["class"] += " pendo-unseen-announcement", t.children = [i]);
                            var l = BuildingBlockGuides.buildNodeFromJSON(t, o);
                            return a.appendTo(l), l
                        }

                        function p(e) {
                            return {
                                type: "div",
                                children: [],
                                props: {
                                    "class": "pendo-unread-announcement-mini-bubble",
                                    style: {
                                        position: "absolute",
                                        "border-radius": "5px",
                                        height: "10px",
                                        width: "10px",
                                        "line-height": "0px",
                                        left: "0px",
                                        top: "30px",
                                        "box-sizing": "content-box",
                                        "background-color": e["background-color"],
                                        "z-index": "10"
                                    }
                                }
                            }
                        }

                        function f(e, t, n) {
                            var r, o = t.getGuide ? t.getGuide() : _.find(n, function (e) {
                                    return e.id === t.guideId
                                }),
                                a = get(o, "attributes.dates." + o.language, !1);
                            if (a) r = {
                                showsAfter: a
                            };
                            else {
                                var s = get(o, "showsAfter") || get(o, "publishedAt");
                                s = s ? new Date(s) : new Date;
                                var d = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                    u = d[s.getMonth()] + " " + s.getDate() + ", " + s.getFullYear();
                                r = {
                                    showsAfter: u
                                }
                            }
                            var l = JSON.parse(JSON.stringify(e));
                            return l = i(l, r), [BuildingBlockGuides.buildNodeFromJSON(l, t, n)]
                        }

                        function g(e, t, n, i, r) {
                            var o = BuildingBlockGuides.findDomBlockInDomJson(e, function (e) {
                                return e && e.props && e.props.id && -1 !== e.props.id.indexOf("pendo-row")
                            });
                            if (o) {
                                var a = _.find(o.children, function (e) {
                                    return e && e.props && e.props.id && -1 !== e.props.id.indexOf("pendo-text")
                                });
                                if (a && a.props && a.props.style) {
                                    var s = parseInt(a.props.style.width, 10);
                                    if (s && !isNaN(s)) {
                                        var d = o.children.indexOf(a),
                                            u = s - 40 + "px";
                                        "100%" !== a.props.style.width && (a.props.style.width = u), a.props.style["padding-right"] = "40px", a.props.style["box-sizing"] = "content-box";
                                        var l = {
                                            type: "div",
                                            children: [{
                                                type: "div",
                                                content: String(t.attributes.notifications.individualCounts[i]),
                                                props: {
                                                    style: {
                                                        display: "inline-block",
                                                        "vertical-align": "middle",
                                                        "line-height": "26px",
                                                        "font-weight": n["font-weight"],
                                                        "font-family": n["font-family"],
                                                        color: n.color
                                                    }
                                                }
                                            }],
                                            props: {
                                                "class": "_pendo-home-view-bubble",
                                                style: {
                                                    position: "absolute",
                                                    "border-radius": "20px",
                                                    height: "26px",
                                                    "line-height": "0px",
                                                    padding: "0px 10px",
                                                    right: "20px",
                                                    top: "50%",
                                                    "margin-top": "-14px",
                                                    "box-sizing": "content-box",
                                                    "background-color": n["background-color"],
                                                    display: r ? "block" : "none"
                                                }
                                            }
                                        };
                                        o.children.splice(d + 1, 0, l)
                                    }
                                }
                            }
                        }
                        return {
                            buildNodesFromTemplate: t,
                            generateUnreadAnnouncementMiniBubble: p,
                            getGuidesInResourceCenterModule: e
                        }
                    }(),
                    BuildingBlockTooltips = function () {
                        function e(e, t, r, o) {
                            if (r.guideElement) {
                                var a = r.guideElement;
                                a.addClass(buildTooltipCSSName());
                                var s = getOffsetPosition(t);
                                if (0 === s.height && 0 === s.width) return null;
                                var d = function (e) {
                                        return "pendo-guide-container" === e.props.id
                                    },
                                    l = BuildingBlockGuides.findDomBlockInDomJson(e, d);
                                if (l) {
                                    var c = r.attributes.layoutDir,
                                        p = {
                                            height: o.offsetHeight,
                                            width: o.offsetWidth
                                        },
                                        f = {
                                            height: parseInt(l.props["data-caret-height"], 10) || 0,
                                            width: parseInt(l.props["data-caret-width"], 10) || 0,
                                            backgroundColor: l.props.style["background-color"],
                                            offset: 10
                                        };
                                    if (n(r), l.props.style.border) {
                                        var g = l.props.style.border.split(" ");
                                        f.borderColor = g[2], f.borderWidth = parseInt(g[0], 10)
                                    }
                                    var h = i(s, p, f, c);
                                    r && (r.dim = h);
                                    var m;
                                    r && _.isFunction(r.getGuide) && (m = r.getGuide());
                                    var v = get(m, "attributes.resourceCenter");
                                    s.fixed ? (a.css({
                                        position: "fixed"
                                    }), o.style.position = "absolute") : r && v || (o.style.position = "absolute"), f.height && f.width && u(a, h, f);
                                    var y = "300000";
                                    o && o.style && o.style["z-index"] && (y = o.style["z-index"]), a.css({
                                        "z-index": y
                                    }), v || a.css({
                                        height: "auto",
                                        width: "auto",
                                        overflow: "visible"
                                    }), r.elementPathRule && a.css({
                                        left: h.left,
                                        top: h.top,
                                        position: s.fixed ? "fixed" : "absolute"
                                    }), "top" === h.layoutDir && "left" === h.hbias && a.find("#pendo-watermark").css({
                                        top: "auto",
                                        bottom: "100%"
                                    });
                                    for (var w = /(auto|scroll)/, S = getScrollParent(t, w), E = getBody(); S && S !== E;) r.attachEvent(S, "scroll", _.throttle(_.bind(b, this, r, S, w), 10)), S = getScrollParent(S, w);
                                    return a[0]
                                }
                            }
                        }

                        function t(e, t) {
                            var n = Sizzle(t.elementPathRule)[0],
                                i = function () {
                                    pendo.onGuideAdvanced(e, t)
                                };
                            t.attachEvent(n, e, i)
                        }

                        function n(e) {
                            e.attributes && e.attributes.advanceActions && e.elementPathRule && (e.attributes.advanceActions.elementHover ? t("mouseover", e) : e.attributes.advanceActions.elementClick && t("click", e))
                        }

                        function i(e, t, n, i) {
                            var s = pendo._get_screen_dim(),
                                d = i || "auto",
                                u = {
                                    width: Math.min(t.width, s.width),
                                    height: t.height
                                };
                            u.layoutDir = d, u.hbias = r(e, s, d), u.layoutDir = o(u, s, e, d);
                            var l = a(u, e, s);
                            return u.top = l.top, u.left = l.left, "top" === u.layoutDir ? u.top -= n.height : "bottom" === u.layoutDir ? u.top += n.height : "right" === u.layoutDir ? u.left += n.height : "left" === u.layoutDir && (u.left -= n.height), u
                        }

                        function r(e, t, n) {
                            if ("right" === n || "left" === n) return pendo.log("Setting layout position to " + n), n;
                            var i = t.width / 3,
                                r = i,
                                o = 2 * i;
                            return r < e.left && e.left < o ? "center" : e.left < t.width / 2 ? "right" : "left"
                        }

                        function o(e, t, n, i) {
                            if (i && "auto" !== i) return i;
                            var r = n.fixed,
                                o = n.top - documentScrollTop(),
                                a = n.left - documentScrollLeft(),
                                s = a + n.width,
                                d = getClientRect(getBody()),
                                u = n.top - e.height < 0,
                                l = n.top + n.height + e.height > (r ? d.height : d.bottom),
                                c = n.left - e.width < 0,
                                p = n.left + n.width + e.width > (r ? d.width : d.right),
                                f = l && u && c && p;
                            if (f) return "bottom";
                            var g;
                            o < t.height / 3 && (g = "bottom");
                            var h = o > 2 * t.height / 3;
                            if ((h || "center" === e.hbias) && (g = "top"), a < e.width && t.width - s < e.width && (g = "bottom"), "bottom" === g) {
                                var m = getOffsetPosition(document.body);
                                n.top + e.height > m.height && (g = "top")
                            }
                            return "top" === g && n.top - e.height < 0 && (g = "bottom"), l && u && ("center" !== e.hbias && (g = e.hbias), c && p || (p || (g = "right"), c || (g = "left"))), g && "bottom" !== g || !l || u || (g = "top"), g ? g : e.hbias ? e.hbias : "bottom"
                        }

                        function a(e, t, n) {
                            return "top" === e.layoutDir || "bottom" === e.layoutDir ? s(e, n, t, e.layoutDir, e.hbias) : d(e, t, e.hbias)
                        }

                        function s(e, t, n, i, r) {
                            var o = e.height,
                                a = e.width,
                                s = {
                                    top: null,
                                    left: null
                                };
                            if ("bottom" === i ? s.top = n.top + n.height : "top" === i && (s.top = n.top - o), "right" === r) {
                                var d = n.left + n.width / 2;
                                d + e.width > t.width && (d -= d + e.width - t.width), s.left = d
                            } else "left" === r ? s.left = n.left - a + n.width / 2 : s.left = n.left + n.width / 2 - a / 2;
                            return s
                        }

                        function d(e, t, n) {
                            var i = e.height,
                                r = e.width,
                                o = {
                                    top: null,
                                    left: null
                                };
                            return o.top = t.top - i / 2 + t.height / 2, "right" === e.layoutDir ? o.left = t.left + t.width : "left" === e.layoutDir && (o.left = Math.max(0, t.left - r)), o
                        }

                        function u(e, t, n) {
                            var i = document.createElement("div");
                            i.setAttribute("class", "pendo-tooltip-caret"), i.style.position = "absolute", i.style.zIndex = 11, l(i, t, n);
                            var r = e.find("#pendo-guide-container")[0].parentNode;
                            if (r.appendChild(i), n.borderWidth) {
                                var o = f(i, n, t.layoutDir);
                                r.appendChild(o)
                            }
                        }

                        function l(e, t, n) {
                            v(e), ("top" === t.layoutDir || "bottom" === t.layoutDir) && c(e, t, n), ("left" === t.layoutDir || "right" === t.layoutDir) && p(e, t, n)
                        }

                        function c(e, t, n) {
                            var i = pendo._get_screen_dim();
                            if (e.style["border-left"] = n.width + "px solid transparent", e.style["border-right"] = n.width + "px solid transparent", "left" === t.hbias) {
                                var r = t.width - 2 * n.width - n.offset - n.borderWidth;
                                e.style.left = r + "px", t.left += n.offset + n.width + n.borderWidth
                            } else "right" === t.hbias ? (e.style.left = n.offset + n.borderWidth + "px", t.left -= n.offset + n.width + n.borderWidth, t.left + t.width > i.width && (t.left = t.left - (t.left + t.width - i.width)), t.left = Math.max(0, t.left)) : e.style.left = t.width / 2 - n.width + "px";
                            if ("bottom" === t.layoutDir) {
                                e.style["border-bottom"] = n.height + "px solid " + n.backgroundColor;
                                var o = -1 * n.height;
                                n.borderWidth && (o += n.borderWidth), e.style.top = o + "px"
                            }
                            if ("top" === t.layoutDir) {
                                e.style["border-top"] = n.height + "px solid " + n.backgroundColor;
                                var a = -1 * n.height;
                                n.borderWidth && (a += n.borderWidth), e.style.bottom = a + "px"
                            }
                            return e
                        }

                        function p(e, t, n) {
                            if (e.style["border-top"] = n.width + "px solid transparent", e.style["border-bottom"] = n.width + "px solid transparent", e.style.top = t.height / 2 - n.width + "px", "left" === t.layoutDir) {
                                e.style["border-left"] = n.height + "px solid " + n.backgroundColor;
                                var i = -1 * n.height;
                                n.borderWidth && (i += n.borderWidth), e.style.right = i + "px"
                            }
                            if ("right" === t.layoutDir) {
                                e.style["border-right"] = n.height + "px solid " + n.backgroundColor;
                                var r = -1 * n.height;
                                n.borderWidth && (r += n.borderWidth), e.style.left = r + "px"
                            }
                            return e
                        }

                        function f(e, t, n) {
                            var i = e.cloneNode();
                            return i.setAttribute("class", "pendo-tooltip-caret-border"), i.style.zIndex = 10, g(i, t, n, e), i
                        }

                        function g(e, t, n, i) {
                            v(e);
                            for (var r = ["Top", "Right", "Bottom", "Left"], o = 0; o < r.length; o++) {
                                var a = "border" + r[o] + "Width",
                                    s = "border" + r[o] + "Color",
                                    d = "border" + r[o] + "Style";
                                i.style[a] && (e.style[a] = parseInt(i.style[a], 10) + t.borderWidth + "px", e.style[s] = h(i.style[s], t.borderColor), e.style[d] = "solid")
                            }
                            "top" === n && (e.style.left = parseInt(i.style.left, 10) - t.borderWidth + "px", e.style.bottom = parseInt(i.style.bottom, 10) - t.borderWidth + "px"), "bottom" === n && (e.style.left = parseInt(i.style.left, 10) - t.borderWidth + "px", e.style.top = parseInt(i.style.top, 10) - t.borderWidth + "px"), "right" === n && (e.style.top = parseInt(i.style.top, 10) - t.borderWidth + "px", e.style.left = parseInt(i.style.left, 10) - t.borderWidth + "px"), "left" === n && (e.style.top = parseInt(i.style.top, 10) - t.borderWidth + "px", e.style.right = parseInt(i.style.right, 10) - t.borderWidth + "px")
                        }

                        function h(e, t) {
                            return "transparent" === e ? e : t
                        }

                        function m(e, t) {
                            if (t) {
                                var n = e.element || getElementForGuideStep(e),
                                    i = getOffsetPosition(n);
                                if ("none" !== getComputedStyle_safe(e.elements[0]).display) {
                                    var r = e.attributes.layoutDir,
                                        o = e.guideElement,
                                        a = dom(t).find("#pendo-guide-container"),
                                        s = a[0].style,
                                        d = {
                                            height: t.offsetHeight,
                                            width: t.offsetWidth
                                        },
                                        u = {
                                            height: parseInt(a[0].getAttribute("data-caret-height"), 10) || 0,
                                            width: parseInt(a[0].getAttribute("data-caret-width"), 10) || 0,
                                            backgroundColor: a[0].style["background-color"],
                                            offset: 10,
                                            borderColor: s.borderColor,
                                            borderWidth: parseInt(s.borderWidth, 10)
                                        },
                                        c = this.getBBTooltipDimensions(i, d, u, r);
                                    if (u.height && u.width) {
                                        var p = o.find(".pendo-tooltip-caret")[0],
                                            f = o.find(".pendo-tooltip-caret-border")[0];
                                        p && l(p, c, u), f && g(f, u, c.layoutDir, p)
                                    }
                                    o.css({
                                        top: c.top,
                                        left: c.left,
                                        position: i.fixed ? "fixed" : o[0].style.position
                                    })
                                }
                            }
                        }

                        function v(e) {
                            var t = ["top", "right", "bottom", "left"];
                            _.each(t, function (t) {
                                e.style[t] = "", e.style["border-" + t] = ""
                            })
                        }

                        function b(e, t, n) {
                            var i = getClientRect(e.element);
                            if (isVisibleInScrollParent(i, t, n)) {
                                if (e.guideElement) {
                                    var r = BuildingBlockGuides.findGuideContainerJSON(e.domJson),
                                        o = e.guideElement.find("#" + r.props.id);
                                    pendo.BuildingBlocks.BuildingBlockTooltips.placeBBTooltip(e, o[0])
                                }
                                dom(e.elements[0]).css({
                                    display: "block"
                                })
                            } else dom(e.elements[0]).css({
                                display: "none"
                            })
                        }
                        return {
                            createBBTooltip: e,
                            getBBTooltipDimensions: i,
                            determineBBHorizontalBias: r,
                            determineTooltipPosition: o,
                            positionBBTooltipWithBias: a,
                            calculateToolTipPositionForTopBottom: s,
                            calculateToolTipPositionForLeftRight: d,
                            buildTooltipCaret: u,
                            styleTopOrBottomCaret: c,
                            styleLeftOrRightCaret: p,
                            buildBorderCaret: f,
                            determineBorderCaretColor: h,
                            placeBBTooltip: m,
                            attachBBAdvanceActions: n
                        }
                    }(),
                    BuildingBlockGuides = function () {
                        function e(t) {
                            return t.props && t.props.id && 0 === t.props.id.indexOf("pendo-g-") ? t : t.children ? _.find(t.children, function (t) {
                                return e(t)
                            }) : void 0
                        }

                        function t(e, t) {
                            for (var n = e.parentNode.children, i = 0, r = 0; r < n.length; r++) n[r] !== e && (i += n[r].offsetHeight);
                            var o = t.offsetHeight,
                                a = Math.max(o - i, 0);
                            e.style.height = a + "px"
                        }

                        function n(e, n, i, r) {
                            r = r || {};
                            var o = r.isResizeDisabled || !1,
                                a = n.getGuide(),
                                s = BuildingBlockGuides.findGuideContainerJSON(e),
                                d = get(a, "attributes.resourceCenter"),
                                u = d && BuildingBlockResourceCenter.isFullyCustom(a);
                            n.hasEscapeListener = !1, n.containerId = s && s.props && s.props.id, n.element = getElementForGuideStep(n);
                            var l = BuildingBlockGuides.buildNodeFromJSON(e, n, i);
                            n.guideElement = l;
                            var c = l.find("#" + n.containerId),
                                f = "data-vertical-alignment",
                                g = "Relative to Element" === c.attr(f);
                            g && !d && pendo.dom(n.guideElement).css({
                                overflow: "hidden",
                                height: "0",
                                width: "0"
                            }), c.css({
                                visibility: "hidden"
                            });
                            var h = BuildingBlockWatermark.buildWatermark({
                                appId: a.appId,
                                targetAccount: a.targetAccount,
                                isTraining: a.isTraining,
                                isBottomAligned: "Bottom Aligned" === c.attr(f)
                            }, BuildingBlockGuides.buildNodeFromJSON);
                            h && c.append(h);
                            var m = n && n.attributes && n.attributes.imgCount;
                            l.appendTo(getGuideAttachPoint());
                            var v = c.find('[data-pendo-grow-height="true"]')[0];
                            if (v && t(v, l[0]), m || d || BuildingBlockGuides.flexAllThings(n.containerId), o || S(n.containerId), u || BuildingBlockGuides.recalculateGuideHeight(n.containerId), g ? n.attributes.calculatedType = "tooltip" : BuildingBlockTooltips.attachBBAdvanceActions(n), g && !m && p(n, e, c[0]), d) {
                                BuildingBlockResourceCenter.showHomeViewOrEmptyState(a);
                                var b = [];
                                "AnnouncementsModule" === get(a, "attributes.resourceCenter.moduleId") ? b = [a.attributes.resourceCenter] : BuildingBlockGuides.flexAllThings(n.containerId), b.length && _.forEach(b, function (e) {
                                    var t = get(e, "children", []);
                                    _.forEach(t, function (e) {
                                        if (e) {
                                            var t = e.steps[0];
                                            if (_.isUndefined(t.attributes.imgCount)) {
                                                var i = get(t, "id", n.id),
                                                    r = get(e, "id", a.id),
                                                    o = Sizzle("#pendo-g-" + i).length ? i : r;
                                                BuildingBlockGuides.flexAllThings("pendo-g-" + o)
                                            }
                                        }
                                    })
                                })
                            }
                            return m || c.css({
                                visibility: "visible"
                            }), n.elements.push(n.guideElement[0]), BuildingBlockGuides.autofocusStep(n, c), BuildingBlockGuides.trapFocusStep(n, c), l
                        }

                        function i(e, t) {
                            if (!pendo.designer && get(e, "attributes.isAutoFocus")) {
                                var n = "autofocus for guide id: " + e.getGuide().id + " step id: " + e.id + " ",
                                    i = function () {
                                        var e = dom(t).find("#pendo-guide-container");
                                        return e = e[0] || e, e && isElementVisible(e) && isElemInViewport(e) && isElemIsFocusable(e) ? e : null
                                    },
                                    r = function (e) {
                                        return e && e.focus(), e === document.activeElement
                                    },
                                    o = {
                                        maxRetries: 100,
                                        delay: 50,
                                        exponentialBackoff: !1
                                    };
                                poll(i, o, function (e) {
                                    poll(function () {
                                        return r(e)
                                    }, o, function () {}, function () {
                                        writeErrorPOST(n + "#pendo-guide-container is available on page but could not capture focus")
                                    })
                                }, function () {
                                    writeErrorPOST(n + "#pendo-guide-container did not render or become visible in time to focus")
                                })
                            }
                        }

                        function r(e, t) {
                            if (!pendo.designer && get(e, "attributes.isAutoFocus")) {
                                var n = t.find("#pendo-guide-container");
                                o(n)
                            }
                        }

                        function o(e) {
                            var t = e[0];
                            if (t) {
                                var n = ["a[href]:not([disabled])", "button:not([disabled])", "textarea:not([disabled])", 'input[type="text"]:not([disabled])', 'input[type="radio"]:not([disabled])', 'input[type="checkbox"]:not([disabled])', "select:not([disabled])", "[tabindex]", "iframe"].join(", "),
                                    i = e.find(n);
                                if (i.length) {
                                    var r = i[0],
                                        o = i[i.length - 1],
                                        s = a(e),
                                        d = s[0],
                                        u = s[1],
                                        l = function (e) {
                                            var n = 9,
                                                i = "Tab" === e.key || e.keyCode === n,
                                                a = e.shiftKey;
                                            i && (a ? document.activeElement === d && (o.focus(), e.preventDefault()) : (document.activeElement === t && (r.focus(), e.preventDefault()), document.activeElement === u && (r.focus(), e.preventDefault())))
                                        };
                                    attachEvent(t, "keyup", l), attachEvent(t, "keydown", l)
                                }
                            }
                        }

                        function a(e) {
                            var t = {
                                    margin: 0,
                                    padding: 0,
                                    outline: "none",
                                    border: "none",
                                    "box-shadow": "none",
                                    shadow: "none"
                                },
                                n = {
                                    type: "style",
                                    props: {
                                        type: "text/css",
                                        scoped: "scoped",
                                        id: "pendo-focus-bumper-styles" + Date.now()
                                    },
                                    css: [{
                                        selector: ".pendo-start-focus-bumper",
                                        styles: _.extend({}, t, {
                                            tabIndex: 0
                                        })
                                    }, {
                                        selector: ".pendo-start-focus-bumper:hover",
                                        styles: t
                                    }, {
                                        selector: ".pendo-start-focus-bumper:focus",
                                        styles: t
                                    }, {
                                        selector: ".pendo-end-focus-bumper",
                                        styles: _.extend({}, t, {
                                            tabIndex: 0
                                        })
                                    }, {
                                        selector: ".pendo-end-focus-bumper:hover",
                                        styles: t
                                    }, {
                                        selector: ".pendo-end-focus-bumper:focus",
                                        styles: t
                                    }]
                                },
                                i = BuildingBlockGuides.buildNodeFromJSON(n);
                            e.prepend(i);
                            var r = document.createElement("div");
                            r.setAttribute("id", "pendo-start-focus-bumper-" + Date.now()), r.setAttribute("class", "pendo-start-focus-bumper"), r.setAttribute("tabIndex", 0), e.prepend(r);
                            var o = document.createElement("div");
                            return o.setAttribute("id", "pendo-end-focus-bumper-" + Date.now()), o.setAttribute("class", "pendo-end-focus-bumper"), o.setAttribute("tabIndex", 0), e.append(o), [r, o]
                        }

                        function s(e) {
                            BuildingBlockResourceCenter.replaceResourceCenterContent(e.id, undefined, !0)
                        }

                        function d(e, t, n) {
                            if (e && e.templateName) return BuildingBlockTemplates.buildNodesFromTemplate(e.templateName, e, t, n);
                            var i = !pendo.designer && "style" === e.type && ConfigReader.get("disableGuidePseudoStyles");
                            return i ? [] : [c(e, t, n)]
                        }

                        function u(e, t, n, i) {
                            var r = 'illegal building block key "' + e + '" found on guide "' + t + '" step "' + n + '"';
                            throw i && (r += ' for node type "' + i + '"'), pendo.log(r), new Error(r)
                        }

                        function l(e, t, n, i) {
                            var r = {
                                    allow: !0,
                                    allowfullscreen: !0,
                                    alt: !0,
                                    "alt-text": !0,
                                    autofocus: !0,
                                    "class": !0,
                                    cols: !0,
                                    contenteditable: !0,
                                    "for": !0,
                                    frameborder: !0,
                                    href: !0,
                                    id: !0,
                                    name: !0,
                                    placeholder: !0,
                                    placement: !0,
                                    rows: !0,
                                    role: !0,
                                    scoped: !0,
                                    src: !0,
                                    start: !0,
                                    style: !0,
                                    tabindex: !0,
                                    target: !0,
                                    title: !0,
                                    type: !0,
                                    value: !0
                                },
                                o = {
                                    embed: {
                                        src: !0
                                    }
                                },
                                a = /^data-/,
                                s = /^aria-/,
                                d = pendo._.keys(e);
                            return pendo._.reduce(d, function (d, l) {
                                var c = o[i] && o[i][l];
                                return c && u(l, n, t, i), r[l] || a.test(l) || s.test(l) || u(l, n, t), d[l] = e[l], d
                            }, {})
                        }

                        function c(e, t, n) {
                            t = t || {
                                id: "unknown",
                                guideId: "unknown"
                            }, e.props = l(e.props, t.id, t.guideId, e.type);
                            var i = pendo.dom("<" + e.type + "></" + e.type + ">"),
                                r = e.props && e.props.id;
                            if ("pendo-backdrop" === r) {
                                if (t.attributes && t.attributes.blockOutUI && t.attributes.blockOutUI.enabled) {
                                    var o = _.throttle(_.partial(N, t), 25);
                                    t.attachEvent(window, "scroll", o, !0)
                                }
                                return x(t)
                            }
                            if (_.each(e.props, function (n, r) {
                                    "style" === r ? i.css(e.props.style) : "data-pendo-code-block" !== r || n !== !0 || getPendoConfigValue("preventCodeInjection") ? i.attr(r, n) : i.addClass("pendo-code-block").html(t.getContent())
                                }), e.content && i.text(e.content), "style" === e.type && (pendo.designer || (e.css = m(e.css)), i.styleSheet ? i.styleSheet.cssText = BuildingBlockGuides.buildStyleTagContent(e.css) : i.text(BuildingBlockGuides.buildStyleTagContent(e.css))), e.svgWidgetId) {
                                var a = BuildingBlockSvgs.buildSvgNode(e.svgWidgetId, e);
                                a.appendTo(i)
                            }
                            var s = e.props.id && -1 !== e.props.id.indexOf("badge"),
                                d = !!e.props.src,
                                u = e.props["class"] && e.props["class"].indexOf("bb-control") >= 0;
                            if (("img" === e.type && d && !s && !u || "iframe" === e.type && t) && (t.attributes && !t.attributes.imgCount ? t.attributes.imgCount = 1 : t.attributes && t.attributes.imgCount && t.attributes.imgCount++, BuildingBlockGuides.recalculateGuideHeightOnImgLoad(i, t)), e.actions && e.actions.length)
                                for (var c = 0; c < e.actions.length; c++)
                                    if (BuildingBlockGuides.bindActionToNode(i, e.actions[c], t), "renderGuidesListItem" === e.actions[c].action) {
                                        var p = pendo.findGuideById(e.actions[c].parameters[0]);
                                        p ? i.text(p.name) : i.attr("style", "display: none;")
                                    } var f = _.find(e.actions, function (e) {
                                return "dismissGuide" === e.action
                            });
                            if (f && !t.hasEscapeListener && (t.hasEscapeListener = !0, t.attachEvent(window, "keyup", function (e) {
                                    27 === e.keyCode && t.eventRouter.eventable.trigger("pendoEvent", {
                                        step: t,
                                        action: "dismissGuide"
                                    })
                                }, !0)), e.children)
                                for (var g = 0; g < e.children.length; g++) {
                                    var h = BuildingBlockGuides.buildNodesFromJSON(e.children[g], t, n);
                                    _.each(h, function (e) {
                                        e && e.appendTo(i)
                                    })
                                }
                            return i
                        }

                        function p(e, t, n) {
                            BuildingBlockTooltips.createBBTooltip(t, e.element, e, n), e.hasBeenScrolledTo || (scrollIntoView(e.element), scrollToTooltip(e.element, n, e.attributes.layoutDir), e.hasBeenScrolledTo = !0)
                        }

                        function f(t, n) {
                            t.on("load", function () {
                                var t = {};
                                !n.containerId && n.domJson && (t = e(n.domJson));
                                var i = n.containerId || t.props && t.props.id || "",
                                    r = i ? document.getElementById(i) : i;
                                if (n && n.attributes && n.attributes.imgCount && (n.attributes.imgCount--, r && n.attributes.imgCount <= 0)) {
                                    BuildingBlockGuides.flexAllThings(i);
                                    var o = n.getGuide();
                                    get(o, "attributes.isAnnouncement") || "AnnouncementsModule" === get(o, "attributes.resourceCenter.moduleId") || BuildingBlockGuides.recalculateGuideHeight(i), r.style.visibility = "visible", "tooltip" === n.attributes.calculatedType && BuildingBlockGuides.positionStepForTooltip(n, n.domJson, r)
                                }
                            }), t.on("error", function () {
                                var e = document.getElementById(n.containerId);
                                return e ? void(e.style.visibility = "visible") : void pendo.log("Failed to find guideContainer for id: " + n.containerId)
                            })
                        }

                        function g(e, t, n) {
                            e.on(t.eventType, function (i) {
                                if (t.designerAction) pendo.designerv2.designerActions[t.action](e, t.parameters);
                                else {
                                    var r = {
                                        action: t.action,
                                        params: t.parameters,
                                        step: n,
                                        ignore: !!t.ignore,
                                        srcElement: i.srcElement
                                    };
                                    "showElements" === t.action || "hideElements" === t.action ? i.srcElement && i.srcElement.getAttribute("id") === t.source ? n.eventRouter.eventable.trigger("pendoEvent", r) : i.target && i.target.getAttribute("id") === t.source && n.eventRouter.eventable.trigger("pendoEvent", r) : n.eventRouter.eventable.trigger("pendoEvent", r)
                                }
                            })
                        }

                        function h(e) {
                            var t = "";
                            return _.each(e, function (e, n) {
                                t = t + n + ":" + e + ";"
                            }), t
                        }

                        function m(e) {
                            for (var t = ["button:focus"], n = [], i = 0; i < e.length; i++) _.contains(t, e[i].selector) || n.push(e[i]);
                            return n
                        }

                        function v(e) {
                            for (var t = "", n = 0; n < e.length; n++) t += e[n].selector + "{", _.each(e[n].styles, function (e, n) {
                                t += n + ":" + e, t += "!important;"
                            }), t += "}";
                            return t
                        }

                        function b(e) {
                            for (var t = ["pendo-base", "pendo-resource-center-container"], n = 0; 20 > n; n++) {
                                var i = _.find(t, function (t) {
                                    return e.id === t
                                });
                                if (i) return e;
                                if (e === document.body) return document.body;
                                e.parentNode && (e = e.parentNode)
                            }
                            return document.body
                        }

                        function y(e, t) {
                            var n = Sizzle("[data-pendo-display-flex]", e);
                            _.each(n, function (e) {
                                var n = FlexboxPolyfill.initializeFlexElements(e, t),
                                    i = e.getAttribute("data-pendo-justify-content"),
                                    r = e.getAttribute("data-row-vertical-alignment");
                                FlexboxPolyfill.initializeFlexRows(n, i, r)
                            })
                        }

                        function w(e, t) {
                            var n = document.getElementById(e);
                            n && (E(n), BuildingBlockGuides.flexElement(n, t))
                        }

                        function S(e) {
                            var t = document.getElementById(e),
                                n = t && "0px" === t.style.left && "0px" === t.style.right;
                            if (t && n) {
                                var i = window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                                attachEvent(window, "resize", _.debounce(function (t) {
                                    i !== t.target.outerWidth && (i = t.target.outerWidth || document.documentElement.clientWidth || document.body.clientWidth, w(e, n))
                                }, 50))
                            }
                        }

                        function E(e) {
                            var t = "data-aspect-ratio",
                                n = Sizzle("[" + t + "]", e);
                            _.each(n, function (e) {
                                var n, i = e.getAttribute(t).split(":");
                                n = i.length > 1 ? parseInt(i[0], 10) / parseInt(i[1], 10) : parseFloat(i[0]), isNaN(n) || (e.style.height = e.offsetWidth / n + "px")
                            })
                        }

                        function C(e) {
                            I(e);
                            var t = getClientRect(e);
                            if (0 === t.width || 0 === t.height) return !0;
                            if (e.style && "visible" === e.style.visibility) return !1;
                            for (var n = e, i = e.id || "", r = 0; 0 !== i.indexOf("pendo-g-") && (I(n), n = n.parentNode, i = n.id || "", r++, !(r > 10)););
                            return !1
                        }

                        function I(e) {
                            return e.style && "none" === e.style.display ? !0 : e.style && "0" === e.style.opacity ? !0 : e.style && "hidden" === e.style.visibility ? !0 : !1
                        }

                        function T(e) {
                            var t = document.getElementById(e);
                            if (t) {
                                var n = parseInt(t.style.height, 10),
                                    i = t.style.height;
                                pendo.dom(t).css({
                                    height: "auto"
                                });
                                var r = parseInt(getComputedStyle_safe(t).height, 10),
                                    o = t.getAttribute("data-pendo-static-height");
                                if (r > window.innerHeight) {
                                    var a = dom(t).find("#pendo-guide-container")[0];
                                    pendo.dom(a).css({
                                        "max-height": "100vh",
                                        overflow: "auto"
                                    })
                                }
                                if (r !== n) {
                                    var s = r;
                                    o && n && (s = n), pendo.dom(t).css({
                                        height: "" + s + "px"
                                    });
                                    var d = t.getAttribute("data-vertical-alignment");
                                    if ("Centered" === d || "Left Aligned" === d || "Right Aligned" === d) {
                                        var u = r > window.innerHeight ? window.innerHeight : s;
                                        pendo.dom(t).css({
                                            "margin-top": "-" + u / 2 + "px"
                                        })
                                    }
                                } else pendo.dom(t).css({
                                    height: i
                                })
                            }
                        }

                        function A(e, t) {
                            if (t(e)) return e;
                            if (!e.children) return !1;
                            for (var n = 0; n < e.children.length; n++) {
                                var i = A(e.children[n], t);
                                if (i) return i
                            }
                            return !1
                        }

                        function x(e) {
                            try {
                                var t = e.attributes.blockOutUI || {};
                                t.additionalElements = t.additionalElements || "";
                                var n = [];
                                if (t.enabled && e.element !== getBody()) {
                                    n.push(e.element);
                                    for (var i = t.additionalElements.replace(/\s/g, "").split(","), r = 0; r < t.additionalElements.length; r++) try {
                                        var o = Sizzle(i[r]);
                                        o && _.each(o, function (e) {
                                            n.push(e)
                                        })
                                    } catch (a) {
                                        log("Additional element for blockOutUI is invalid selector", "error")
                                    }
                                }
                                var s = G(n),
                                    d = t.padding || {
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                    },
                                    u = getClientRect(getBody());
                                s || (s = {
                                    top: 0,
                                    left: 0,
                                    right: u.width,
                                    bottom: u.height,
                                    width: 0,
                                    height: 0
                                }), s.fixed && (u.top = 0, u.bottom = u.height, u.left = 0, u.right = u.width);
                                var l = k(u, s, d);
                                if (!hasBlockBoxChanged(s) && !hasBodyDimensionsChanged(u) && !haveScreenCoordsChanged(l) && O()) return;
                                var c = {
                                        "z-index": 1e4,
                                        position: "fixed"
                                    },
                                    p = [];
                                return _.each(l, function (e, t) {
                                    var n = L(t, _.extend({}, e, c));
                                    p.push(n)
                                }), R(p, e)
                            } catch (a) {
                                log("Failed to add BlockOut ui", "error")
                            }
                        }

                        function G(e) {
                            if (e && e.length) {
                                var t = _.reduce(e, function (e, t) {
                                    if (!isElementVisible(t)) return e;
                                    var n = getClientRect(t);
                                    if (n) return e.fixed = e.fixed && n.fixed, _.each([
                                        ["top", isLessThan],
                                        ["right", isGreaterThan],
                                        ["bottom", isGreaterThan],
                                        ["left", isLessThan]
                                    ], function (t) {
                                        var i = t[0],
                                            r = t[1];
                                        (!e[i] || r(n[i], e[i])) && (e[i] = n[i])
                                    }), e
                                }, {
                                    fixed: !0
                                });
                                t.height = t.bottom - t.top, t.width = t.right - t.left;
                                var n = bodyOffset();
                                return t.fixed || (t.left += n.left, t.right += n.left, t.top += n.top, t.bottom += n.top), t.fixed = !!t.fixed, t
                            }
                        }

                        function L(e, t) {
                            var n = dom("div._pendo-guide-backdrop-region-block_._pendo-region-" + e + "_");
                            return n.length || (n = dom('<div class="_pendo-guide-backdrop-region-block_ _pendo-region-' + e + '_"></div>')), dom(n).css(t), n
                        }

                        function O() {
                            var e = dom("._pendo-guide-backdrop_");
                            return e.length > 0
                        }

                        function k(e, t, n) {
                            var i = {},
                                r = t.top - e.top,
                                o = t.left - e.left;
                            i.top = r - n.top, i.left = o - n.left, i.height = t.height + n.top + n.bottom, i.width = t.width + n.left + n.right;
                            var a = {
                                left: 0,
                                top: 0
                            };
                            return positionFixedActsLikePositionAbsolute() && (a = bodyOffset(), i.left += documentScrollLeft(), i.top += documentScrollTop()), i.bottom = i.top + i.height, i.right = i.left + i.width, {
                                top: {
                                    top: 0,
                                    height: Math.max(i.top - a.top, 0),
                                    left: i.left,
                                    width: i.width
                                },
                                right: {
                                    top: -a.top,
                                    bottom: 0,
                                    left: i.right - a.left,
                                    right: 0
                                },
                                bottom: {
                                    top: i.bottom - a.top,
                                    bottom: 0,
                                    left: i.left - a.left,
                                    width: i.width
                                },
                                left: {
                                    top: -a.top,
                                    bottom: 0,
                                    left: -a.left,
                                    width: i.left
                                }
                            }
                        }

                        function R(e, t) {
                            var n = B("pendo-backdrop", t.domJson);
                            delete n.props.style.left, delete n.props.style.right, delete n.props.style.width, delete n.props.style.height, delete n.props.style.bottom, delete n.props.style.top;
                            var i = pendo.dom('<div class="_pendo-guide-backdrop_">');
                            return i.attr("class", "_pendo-guide-backdrop_"), _.each(n.props, function (t, r) {
                                _.each(e, function (e) {
                                    "style" === r ? e.css(n.props.style) : e.attr(r, t), i.append(e)
                                })
                            }), i
                        }

                        function B(e, t) {
                            if (t.props && t.props.id === e) return t;
                            if (t.children)
                                for (var n = 0; n < t.children.length; n++) {
                                    var i = B(e, t.children[n]);
                                    if (i) return i
                                }
                        }

                        function N(e) {
                            var t = x(e);
                            t && (dom("._pendo-guide-backdrop_").remove(), e.guideElement.append(t))
                        }

                        function P(t) {
                            if (!t.domJson || !_.isObject(t.domJson)) return !1;
                            var n = e(t.domJson);
                            return n ? "Relative to Element" === n.props["data-vertical-alignment"] : !1
                        }
                        return {
                            renderGuideFromJSON: n,
                            autofocusStep: i,
                            trapFocusStep: r,
                            renderResourceCenterModule: s,
                            buildNodeFromJSON: c,
                            recalculateGuideHeightOnImgLoad: f,
                            buildStyleString: h,
                            buildStyleTagContent: v,
                            bindActionToNode: g,
                            recalculateGuideHeight: T,
                            findDomBlockInDomJson: A,
                            isElementHiddenInGuide: C,
                            positionStepForTooltip: p,
                            flexAllThings: w,
                            flexElement: y,
                            findTopLevelContainer: b,
                            updateBackdrop: N,
                            buildNodesFromJSON: d,
                            findGuideContainerJSON: e,
                            maintainAspectRatios: E,
                            sizeElement: t,
                            getAllowedAttributes: l,
                            repositionFlexElementsInFullWidthGuides: S,
                            isBuildingBlockGuideRelativeToElement: P
                        }
                    }(),
                    BuildingBlockResourceCenter = function () {
                        function e(e) {
                            return e.steps && e.steps.length && _.isFunction(e.steps[0].fetchContent)
                        }

                        function t(t) {
                            if (te = n(t), !te) return q.resolve();
                            if (store.getters["frames/isShownInAnotherFrame"]()(te.steps[0])) return q.resolve();
                            var r = BuildingBlockResourceCenter.isFullyCustom(te);
                            if (r) return te.hasResourceCenterContent = !0, q.resolve();
                            var o = i(te, t),
                                a = _.reduce(o, function (t, n) {
                                    return e(n) ? t.concat(n.steps[0].fetchContent()) : t
                                }, []);
                            return a.push(ContentValidation.validate(te).then(_.noop, function () {
                                te.launchMethod = "api"
                            })), te.attributes.notifications = {
                                totalUnseenCount: 0,
                                individualCounts: {
                                    chat: 0
                                }
                            }, m(), _.forEach(o, function (e) {
                                var n = e.attributes.resourceCenter,
                                    i = n.children,
                                    r = n.moduleId;
                                "SandboxModule" === r && (e.hasResourceCenterContent = !0), "IntegrationModule" === r && (e.integrationConfig = l(n.integrationName, n.integrationProvider), e.hasResourceCenterContent = !!e.integrationConfig, e.integrationConfig && "chat" === e.integrationConfig.name && p(n.integrationName, n.integrationProvider));
                                var o = _.reduce(i, function (e, n) {
                                    var i = _.find(t, function (e) {
                                        return e.id === n
                                    });
                                    return i ? e.concat(i) : e
                                }, []);
                                "AnnouncementsModule" === r && (te.attributes.notifications.individualCounts[e.id] = 0, _.forEach(o, function (t) {
                                    z(t) || t.isControlGroup() || te.attributes.notifications.individualCounts[e.id]++
                                }));
                                var a = ["GuideListModule", "OnboardingModule", "AnnouncementsModule"];
                                if (_.indexOf(a, r) > -1) {
                                    var s = _.filter(o, function (e) {
                                        return e.shouldBeAddedToResourceCenter() ? (e.ineligibleForRC = !1, !0) : (e.ineligibleForRC = !0, !1)
                                    });
                                    s.length && (e.hasResourceCenterContent = !0)
                                }
                                e.guidesInModule = o
                            }), te.modules = o, te.badgeHidden = !0, q.all(a)
                        }

                        function n(e) {
                            var t = _.filter(e, function (e) {
                                    return get(e, "attributes.resourceCenter.isTopLevel")
                                }),
                                n = _.find(t, function (e) {
                                    return "staged" === e.state
                                });
                            return n ? n : t[0]
                        }

                        function i(e, t) {
                            return _.filter(t, function (t) {
                                return t && get(t, "attributes.resourceCenter.isModule", !1) && t.state === e.state
                            })
                        }

                        function r(e, t, n) {
                            if (!ie) {
                                var i = "left 200ms",
                                    r = "left";
                                t && (i = t[0].value, r = t[1].value);
                                var a = pendo.Sizzle("#pendo-resource-center-container")[0];
                                if (a) {
                                    var d = pendo.dom(a).find('[id^="pendo-g-"]')[0];
                                    if (d) {
                                        var u, l = d.getAttribute("data-pendo-guide-id"),
                                            c = _.find(pendo.guides, function (t) {
                                                return t.id === e
                                            });
                                        e !== te.id ? te.activeModule = c : (u = te.activeModule, delete te.activeModule);
                                        var p = get(c, "attributes.resourceCenter.integrationProvider");
                                        g(p) && E(p);
                                        var f = c.steps[0];
                                        f.eventRouter = new EventRouter;
                                        var h = f.domJson;
                                        h.props["data-pendo-guide-id"] = c.id;
                                        var m = BuildingBlockGuides.buildNodeFromJSON(h, f);
                                        f.guideElement = m, f.elements.push(f.guideElement[0]);
                                        var v = m[0]; - 1 === v.id.indexOf("pendo-g-") && (v = m.find('[id^="pendo-g-"]')[0]), n || (v.style.transition = i, d.style.transition = i, "left" === r ? v.style.left = a.offsetWidth + "px" : "right" === r && (v.style.left = -1 * a.offsetWidth + "px")), n && (pendo.dom(d).remove(), u && u.steps && u.steps.length && (u.steps[0].elements.length = 0)), pendo.dom(v).appendTo(a), "AnnouncementsModule" === K(c) && f.guide.guidesInModule ? _.forEach(f.guide.guidesInModule, function (e) {
                                            if (_.isUndefined(e.steps[0].attributes.imgCount)) {
                                                var t = e.steps[0].id,
                                                    n = pendo.dom(v).find("#pendo-g-" + t)[0] ? t : e.id;
                                                BuildingBlockGuides.flexAllThings("pendo-g-" + n)
                                            }
                                        }) : BuildingBlockGuides.flexAllThings("pendo-resource-center-container");
                                        var b = pendo.dom(v).find('[data-pendo-grow-height="true"]')[0];
                                        if (b && BuildingBlockGuides.sizeElement(b, a), v.style.left = "0px", !n) {
                                            ie = !0;
                                            try {
                                                "left" === r ? d.style.left = -1 * a.offsetWidth + "px" : "right" === r && (d.style.left = a.offsetWidth + "px"), window.setTimeout(function () {
                                                    pendo.dom(d).remove(), u && u.steps && u.steps.length && (u.steps[0].elements.length = 0), ie = !1
                                                }, 200)
                                            } catch (y) {
                                                throw ie = !1, y
                                            }
                                        }
                                        var w = "AnnouncementsModule" === K(c);
                                        if (w) {
                                            s();
                                            var S = BuildingBlockTemplates.getGuidesInResourceCenterModule(c, pendo.guides),
                                                C = _.reduce(S, function (e, t) {
                                                    return t.steps && t.steps.length && AsyncContent.hasContent(t.steps[0]) || e.push(t.fetchContent()), e
                                                }, []);
                                            if (C.length) {
                                                var I = o();
                                                I && m.find("ol").append(I), q.all(C).then(function () {
                                                    var e = q.defer();
                                                    return setTimeout(e.resolve, 500), e.promise
                                                }).then(function () {
                                                    te.activeModule === c && BuildingBlockGuides.renderResourceCenterModule(c)
                                                })
                                            }
                                        }
                                        return BuildingBlockResourceCenter.setFocusForResoureCenterModule(m, l), f.onShown("launcher"), m
                                    }
                                }
                            }
                        }

                        function o() {
                            if (_.isFunction(document.createElementNS)) {
                                var e = "http://www.w3.org/2000/svg",
                                    t = function (t, n) {
                                        var i = dom(document.createElementNS(e, "circle")).attr({
                                            cx: t,
                                            cy: n,
                                            fill: "#9a9ca5",
                                            r: 5
                                        });
                                        return _.each(_.toArray(arguments).slice(2), function (e) {
                                            i.append(e)
                                        }), i
                                    },
                                    n = function (t) {
                                        return dom(document.createElementNS(e, "animate")).attr({
                                            attributeName: "fill-opacity",
                                            values: "0;1;0;0",
                                            keyTimes: "0;0.4;0.8;1",
                                            dur: "1.4s",
                                            repeatCount: "indefinite",
                                            calcMode: "spline",
                                            keySplines: "0 0 0.58 1; 0 0 0.58 1; 0 0 0.58 1",
                                            begin: t
                                        })
                                    },
                                    i = dom(document.createElementNS(e, "svg")).attr({
                                        viewBox: "0 0 70 20",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "70",
                                        height: "20"
                                    }).append(t(21, 10, n("-0.32s"))).append(t(35, 10, n("-0.16s"))).append(t(49, 10, n("0s")));
                                return dom("<li>").css({
                                    padding: "5px 20px",
                                    "list-style-type": "none",
                                    "list-style-position": "inside",
                                    position: "relative",
                                    "margin-left": "0em",
                                    "border-width": "0px",
                                    "border-style": "solid",
                                    "border-color": "rgb(255, 255, 255)",
                                    "float": "none",
                                    "vertical-align": "baseline",
                                    "text-align": "center"
                                }).append(i)
                            }
                        }

                        function a() {
                            window.clearInterval(ne), ne = null
                        }

                        function s() {
                            ne || (ne = window.setInterval(function () {
                                var e = Sizzle("#pendo-resource-center-container");
                                if (!e.length) return a();
                                var t = pendo.dom(e[0]).find('[data-layout="AnnouncementsModule"]');
                                if (!t.length) return a();
                                var n = pendo.dom(t).find('ol[id^="pendo-list"]');
                                if (!n.length) return a();
                                var i = getClientRect(n[0]),
                                    r = pendo.dom(n).find("li.pendo-unseen-announcement");
                                if (!r.length) return a();
                                for (var o = t.attr("data-pendo-guide-id"), s = T().attributes.notifications.individualCounts[o], d = i.height / 3, u = getClientRect(r[r.length - 1]), l = u.bottom - 30 < i.top + i.height, c = 0; c < r.length; c++) {
                                    var p = r[c],
                                        f = getClientRect(p),
                                        g = f.top - i.top > i.height - d;
                                    if (g && !l) break;
                                    pendo.dom(p).removeClass("pendo-unseen-announcement");
                                    var h = pendo.dom(p).find(".pendo-unread-announcement-mini-bubble");
                                    isOldIE(10) ? pendo.dom(p).find(".pendo-unread-announcement-mini-bubble").remove() : (h[0].style.visibility = "hidden", h[0].style.opacity = "0", h[0].style.transition = "visibility 0s 2s, opacity 2s linear");
                                    var m = pendo.dom(p).attr("data-pendo-announcement-guide-id"),
                                        v = _.find(pendo.guides, function (e) {
                                            return e.id === m
                                        });
                                    if (!v) break;
                                    z(v) || s--, v.steps[0].seenState = "advanced", seenGuide(v.id, v.steps[0].id, pendo.get_visitor_id(), "whatsnew", v.language, {
                                        last_updated_at: v.steps[0].lastUpdatedAt
                                    }), advancedGuide(v.id, v.steps[0].id, pendo.get_visitor_id(), "advanced", v.language)
                                }
                                H(s, o)
                            }, 500))
                        }

                        function d(e) {
                            e.hasResourceCenterContent && e.skipResourceCenterHomeView ? BuildingBlockResourceCenter.replaceResourceCenterContent(e.moduleIdToReplaceHomeViewWith, [{
                                value: "none"
                            }, {
                                value: "left"
                            }]) : e.showEmptyState && (BuildingBlockResourceCenter.showResourceCenterEmptyState(), _.each(e.controlGuidesInAllModules, function (e) {
                                e.hasGuideBeenControlled() || e.steps[0].onControlGuide("control")
                            }))
                        }

                        function u() {
                            var e = pendo.Sizzle("#pendo-resource-center-container");
                            if (e && e.length) {
                                var t = pendo.Sizzle("#pendo-resource-center-empty-state-container");
                                t && t.length && pendo.dom(t[0]).css({
                                    display: "block"
                                })
                            }
                        }

                        function l(e, t) {
                            return ExtensionService.findExtensionByNameAndProvider(e, t)
                        }

                        function c(e, t, n) {
                            var i = ExtensionService.findExtensionByNameAndProvider(e, t);
                            if (!i) return log(t + " integration has not been loaded into the agent");
                            var r = pendo.dom(n);
                            if (!r) return log("could not find target element for " + t + " integration");
                            var o = i.getFrame();
                            o.appendTo(r), o.css({
                                display: "block"
                            })
                        }

                        function p(e, t) {
                            var n = ExtensionService.findExtensionByNameAndProvider(e, t);
                            if (!n) return log(t + " integration has not been loaded into the agent");
                            if (g(t) && h(t)) return void(te.hasEligibleNativeIntegrationModule = !0);
                            var i = n.getFrame();
                            isInDocument(i[0]) || i.appendTo(getGuideAttachPoint()), i.css({
                                display: "none"
                            })
                        }

                        function f() {
                            return ["zendesk-chat", "intercom-chat"]
                        }

                        function g(e) {
                            return e ? f().indexOf(e) >= 0 : !1
                        }

                        function h(e) {
                            if (!e) return !1;
                            switch (e) {
                            case "zendesk-chat":
                                return _.isFunction(window.zE);
                            case "intercom-chat":
                                return _.isFunction(window.Intercom);
                            default:
                                return !1
                            }
                        }

                        function m() {
                            _.forEach(f(), function (e) {
                                var t = ExtensionService.findExtensionByNameAndProvider("chat", e);
                                t && h(e) && v(e, t)
                            })
                        }

                        function v(e, t) {
                            if (e && h(e)) switch (e) {
                            case "zendesk-chat":
                                b(t);
                                break;
                            case "intercom-chat":
                                y(t)
                            }
                        }

                        function b(e) {
                            var t = w(e);
                            window.zE("webWidget", "hide"), window.zE("webWidget", "updateSettings", {
                                webWidget: {
                                    helpCenter: {
                                        suppress: !0
                                    },
                                    navigation: {
                                        popoutButton: {
                                            enabled: !1
                                        }
                                    },
                                    position: {
                                        vertical: t ? t[0] : "bottom",
                                        horizontal: t ? t[1] : "right"
                                    }
                                }
                            }), window.zE("webWidget:on", "close", function () {
                                window.zE("webWidget", "hide"), S()
                            }), window.zE("webWidget:on", "chat:unreadMessages", function (e) {
                                H(e, "chat")
                            })
                        }

                        function y(e) {
                            var t = w(e);
                            window.Intercom("update", {
                                hide_default_launcher: !0,
                                alignment: t ? t[1] : "right"
                            }), window.Intercom("onHide", function () {
                                S()
                            })
                        }

                        function w(e) {
                            var t = get(e, "data.options.labels.position");
                            return t && (t = t.split("-")), t
                        }

                        function S() {
                            W(te.activeModule), delete te.activeModule, te.continueToNativeModule = !1
                        }

                        function E(e, t) {
                            if (e) {
                                var n = getMetadata();
                                te.isShown() && te.hide();
                                var i = pendo.badgesShown[te.id];
                                switch (i && i.hide(), e) {
                                case "zendesk-chat":
                                    window.$zopim.livechat.window.show(), n && n.visitor && n.visitor.email && window.zE("webWidget", "prefill", {
                                        email: {
                                            value: n.visitor.email
                                        }
                                    });
                                    break;
                                case "intercom-chat":
                                    window.Intercom("show"), n && n.visitor && n.visitor.email && window.Intercom("update", {
                                        email: n.visitor.email
                                    })
                                }
                                H(0, "chat"), !te.activeModule && t && (te.activeModule = t, t.steps[0].onShown("launcher"))
                            }
                        }

                        function C(e) {
                            if (e && !e.isTopLevel) {
                                var t = get(e, "attributes.resourceCenter.integrationProvider");
                                E(t), te.activeModule || (te.activeModule = e), e.steps[0].onShown("continue"), e.attributes.doNotResume = !0
                            }
                        }

                        function I(e) {
                            if (e.step) {
                                var t = e.step.getGuide();
                                if (t.attributes && t.attributes.resourceCenter) {
                                    var n = pendo.dom("#pendo-resource-center-container");
                                    if (n && n.length) {
                                        var i = n.find('iframe[id^="_pendo-launcher-ext-frame-chat"]');
                                        i && i.length && i.each(function (e) {
                                            var t = pendo.dom(e);
                                            t.css({
                                                display: "none"
                                            }), t.appendTo(getGuideAttachPoint())
                                        })
                                    }
                                }
                            }
                        }

                        function T() {
                            return te
                        }

                        function A(e) {
                            var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                            return t ? {
                                r: parseInt(t[1], 16),
                                g: parseInt(t[2], 16),
                                b: parseInt(t[3], 16)
                            } : null
                        }

                        function x(e) {
                            return e ? _.all(e, function (e) {
                                return Sizzle.contains(document, e)
                            }) : !1
                        }

                        function G() {
                            var e = T(),
                                t = get(e, "attributes.notifications");
                            if (t) {
                                var n = O(t.individualCounts);
                                if (0 >= n) return n !== t.totalUnseenCount && U(), void(t.totalUnseenCount = n);
                                k();
                                var i = n !== t.totalUnseenCount;
                                if (i || !x(re)) {
                                    if ("badge" === e.launchMethod) {
                                        var r = pendo.dom("._pendo-resource-center-badge-container");
                                        if (!r.length) return;
                                        B(r[0], e.attributes.notificationBubble, n)
                                    }
                                    if ("dom" === e.launchMethod && e.attributes && e.attributes.activation && e.attributes.activation.selector) {
                                        var o = pendo.Sizzle(e.attributes.activation.selector);
                                        if (!o.length) return;
                                        N(o[0], e.attributes.notificationBubble, n), attachEventInternal(window, "resize", _.debounce(L, 50))
                                    }
                                    t.totalUnseenCount = n
                                }
                            }
                        }

                        function L() {
                            var e = BuildingBlockResourceCenter.getResourceCenter(),
                                t = get(e, "attributes.notifications");
                            if (t) {
                                var n = BuildingBlockResourceCenter.calculateTotalNotificationCount(t.individualCounts);
                                if ("dom" === e.launchMethod && get(e, "attributes.activation.selector")) {
                                    var i = pendo.Sizzle(e.attributes.activation.selector);
                                    if (!i.length) return;
                                    BuildingBlockResourceCenter.addNotificationBubbleToTargetElement(i[0], e.attributes.notificationBubble, n)
                                }
                            }
                        }

                        function O(e) {
                            return _.reduce(e, function (e, t) {
                                return e + t
                            }, 0)
                        }

                        function k() {
                            var e = T();
                            if (e) {
                                var t = get(e, "attributes.notifications");
                                if (t) {
                                    var n = Sizzle('[data-layout="HomeViewModule"]');
                                    if (n.length) {
                                        var i = pendo.dom(n[0]).find("._pendo-resource-center-home-list");
                                        i.length && _.each(t.individualCounts, function (e, t) {
                                            R(e, t)
                                        })
                                    }
                                }
                            }
                        }

                        function R(e, t) {
                            var n = Sizzle("#pendo-resource-center-container");
                            if (n.length) {
                                var i = pendo.dom(n[0]).find('[data-pendo-notification-id="' + t + '"]');
                                if (i.length) {
                                    var r = pendo.dom(i[0]).find("._pendo-home-view-bubble"),
                                        o = pendo.dom(r[0].children[0]),
                                        a = e !== parseInt(o.text(), 10);
                                    a && (e > 0 ? (o.text(e), pendo.dom(r[0]).css({
                                        display: "block",
                                        "margin-right": "0"
                                    })) : pendo.dom(r[0]).css({
                                        display: "none"
                                    }))
                                }
                            }
                        }

                        function B(e, t, n) {
                            var i = get(t, "position", "top-left"),
                                r = getComputedStyle_safe(e),
                                o = parseInt(r.width, 10) || 56,
                                a = o / 2,
                                s = a / Math.sqrt(2),
                                d = Math.round(a - s) - 10,
                                u = d - 10,
                                l = Math.round(2 * s),
                                c = {
                                    "top-left": {
                                        top: d + "px",
                                        left: u + "px",
                                        padding: "0px 10px",
                                        "margin-left": "0px",
                                        "margin-top": "0px"
                                    },
                                    "top-right": {
                                        top: d + "px",
                                        left: u + l + 10 + "px",
                                        padding: "0px 10px",
                                        "margin-left": "0px",
                                        "margin-top": "0px"
                                    },
                                    "bottom-left": {
                                        top: d + l,
                                        left: u + "px",
                                        padding: "0px 10px",
                                        "margin-left": "0px",
                                        "margin-top": "0px"
                                    },
                                    "bottom-right": {
                                        top: d + l,
                                        left: u + l + 10 + "px",
                                        padding: "0px 10px",
                                        "margin-left": "0px",
                                        "margin-top": "0px"
                                    }
                                },
                                p = c[i];
                            P(e, t, n, p)
                        }

                        function N(e, t, n) {
                            var i = 0,
                                r = 0,
                                o = get(e, "offsetParent"),
                                a = getOffsetPosition(e),
                                s = getComputedStyle_safe(e),
                                d = "fixed" === s.position,
                                u = getComputedStyle_safe(o);
                            if (o && "relative" === u.position) {
                                var l = getOffsetPosition(o),
                                    c = parseInt(s.top, 10),
                                    p = parseInt(s.left, 10);
                                c = isNaN(c) ? 0 : c, p = isNaN(p) ? 0 : p, i = a.top - l.top - c, r = a.left - l.left - p
                            } else(!s.position || "static" === s.position || d) && (i = a.top, r = a.left);
                            var f = {
                                    width: "28px",
                                    top: a.top > 14 ? i - 14 + "px" : 0,
                                    left: a.left > 14 ? r - 14 + "px" : 0,
                                    position: d ? "fixed" : "absolute"
                                },
                                g = {
                                    width: "28px",
                                    "font-size": "16px",
                                    "text-align": "center",
                                    position: "absolute",
                                    right: "0px"
                                };
                            P(e, t, n, f, g)
                        }

                        function P(e, t, n, i, r) {
                            if (x(re)) {
                                var o = M(t),
                                    a = o.defaultBubbleCss,
                                    s = o.defaultUnseenCountCss,
                                    d = _.extend(a, i),
                                    u = _.extend(s, r);
                                return re.bubbleEle.css(d), re.unseenCountEle.css(u), void re.unseenCountEle.text(n)
                            }
                            var l = document.getElementsByClassName("pendo-resource-center-badge-notification-bubble");
                            if (l.length) {
                                var c = l[0].getElementsByClassName("pendo-notification-bubble-unread-count");
                                c[0].textContent = n
                            } else re = D(t, n, i, r), F(re, e)
                        }

                        function M(e) {
                            return {
                                defaultBubbleCss: {
                                    position: "absolute",
                                    "border-radius": "20px",
                                    "line-height": "0px",
                                    height: "26px",
                                    "box-sizing": "content-box",
                                    "background-color": e["background-color"]
                                },
                                defaultUnseenCountCss: {
                                    "font-weight": e["font-weight"],
                                    "font-family": e["font-family"],
                                    height: "100%",
                                    display: "inline-block",
                                    "line-height": "26px",
                                    "vertical-align": "middle",
                                    color: e.color
                                }
                            }
                        }

                        function D(e, t, n, i) {
                            var r = M(e),
                                o = r.defaultBubbleCss,
                                a = r.defaultUnseenCountCss;
                            t = t || 0;
                            var s = dom('<div class="pendo-resource-center-badge-notification-bubble"></div>'),
                                d = dom('<div class="pendo-notification-bubble-unread-count"></div>'),
                                u = _.extend(o, n),
                                l = _.extend(a, i);
                            s.css(u), d.css(l);
                            var c = dom('<style id="pendo-resource-center-bubble-animation"></style>');
                            if (!isOldIE(10)) {
                                var p = A(e["background-color"]),
                                    f = "rgb(" + p.r + ", " + p.g + ", " + p.b + ")",
                                    g = "@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.6) } }",
                                    h = '.pendo-resource-center-badge-notification-bubble::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: ' + f + "; border-radius: 100%; z-index: -1; animation: pulse 2s infinite; will-change: transform; }",
                                    m = g + " " + h;
                                c.styleSheet ? c.styleSheet.cssText = m : c[0].innerHTML = m
                            }
                            return d.text(t), {
                                bubbleEle: s,
                                unseenCountEle: d,
                                styleEle: c
                            }
                        }

                        function F(e, t) {
                            e.styleEle.appendTo(t), e.unseenCountEle.appendTo(e.bubbleEle), e.bubbleEle.appendTo(t)
                        }

                        function U() {
                            var e = re ? re.bubbleEle : Sizzle(".pendo-resource-center-badge-notification-bubble"),
                                t = re ? re.styleEle : Sizzle("#pendo-resource-center-bubble-animation");
                            e && _.each(e, function (t, n) {
                                if (e[n]) {
                                    var i = e[n];
                                    i && i.parentNode && i.parentNode.removeChild(i)
                                }
                            }), t && _.each(t, function (e, n) {
                                if (t[n]) {
                                    var i = t[n];
                                    i && i.parentNode && i.parentNode.removeChild(i)
                                }
                            }), re = null
                        }

                        function H(e, t) {
                            var n = T();
                            if (n) {
                                var i = get(n, "attributes.notifications");
                                i && i.individualCounts[t] !== e && (i.individualCounts[t] = e, BuildingBlockResourceCenter.updateNotificationBubbles())
                            }
                        }

                        function z(e) {
                            return _.isFunction(e.hasBeenSeen) && e.hasBeenSeen() ? !0 : "active" === e.steps[0].seenState ? !0 : !1
                        }

                        function V() {
                            var e = pendo.Sizzle("#pendo-resource-center-container")[0];
                            if (e) {
                                var t = pendo.dom(e).find('[id^="pendo-g-"]');
                                if (t) {
                                    var n = t.attr("data-pendo-guide-id"),
                                        i = _.find(pendo.guides, function (e) {
                                            return e.id === n
                                        }),
                                        r = get(i, "attributes.resourceCenter.isModule", !1);
                                    if (r) return i
                                }
                            }
                        }

                        function W(e) {
                            var t = get(e, "attributes.resourceCenter.isModule", !1) ? e : BuildingBlockResourceCenter.findShownResourceCenterModule();
                            if (t) {
                                var n = _.first(t.steps);
                                pendo.onGuideDismissed(n)
                            }
                            var i = get(e, "attributes.resourceCenter.isTopLevel", !1) ? e : BuildingBlockResourceCenter.findResourceCenterHomeView(pendo.guides),
                                r = i.steps[0];
                            return pendo.onGuideDismissed(r)
                        }

                        function j() {
                            var e = pendo.Sizzle("#pendo-resource-center-container")[0];
                            if (e) {
                                var t = pendo.Sizzle("._pendo-resource-center-badge-container")[0];
                                if (t) {
                                    var n = "auto" !== t.style.bottom,
                                        i = J(e.style.left, e.style.right);
                                    if (n) {
                                        e.style.top = "auto";
                                        var r = e.getBoundingClientRect(),
                                            o = r.top < parseInt(i, 10);
                                        o && (e.style.top = i)
                                    }
                                }
                            }
                        }

                        function J(e, t) {
                            return "auto" !== e ? e : "auto" !== t ? t : "10px"
                        }

                        function K(e) {
                            return get(e, "attributes.resourceCenter.moduleId")
                        }

                        function X(e) {
                            return "SandboxModule" === K(e) && e.hasResourceCenterContent
                        }

                        function Y(e) {
                            return "IntegrationModule" === K(e) && e.hasResourceCenterContent
                        }

                        function Z(e) {
                            return "FullyCustomModule" === K(e)
                        }

                        function Q(e) {
                            var t = e.attributes.resourceCenter;
                            return !BuildingBlockResourceCenter.isSupportedNativeIntegration(t.integrationProvider) || BuildingBlockResourceCenter.isProviderInstalled(t.integrationProvider)
                        }

                        function $(t, r) {
                            if (te = n(t), !te) return q.resolve();
                            if (r.getters["frames/isShownInAnotherFrame"]()(te.steps[0])) return q.resolve();
                            var o = BuildingBlockResourceCenter.isFullyCustom(te);
                            if (o) return q.resolve();
                            var a = i(te, t),
                                s = [],
                                d = _.indexBy(t, "id");
                            return _.each(a, function (t) {
                                var n = t.attributes.resourceCenter,
                                    i = n.moduleId;
                                if ("AnnouncementsModule" === i) {
                                    var r = n.children,
                                        o = _.reduce(r, function (e, t) {
                                            var n = d[t];
                                            return n ? e.concat(n) : e
                                        }, []);
                                    _.each(o, function (t) {
                                        e(t) && s.push(t.steps[0].fetchContent())
                                    })
                                }
                            }), q.all(s)
                        }

                        function ee(e, t) {
                            var n;
                            if ("HomeViewModule" === e[0].getAttribute("data-layout")) {
                                if (t) {
                                    var i = pendo.dom('[data-pendo-module-guide-id="' + t + '"]');
                                    n = i.find('button[id^="pendo-right-caret-"]')[0]
                                }
                            } else {
                                var r = pendo.dom('[id="pendo-resource-center-module-title-container"]');
                                n = r.find('button[id^="pendo-left-caret-"')[0]
                            }
                            n && n.focus()
                        }
                        return {
                            initializeResourceCenter: t,
                            findResourceCenterHomeView: n,
                            findResourceCenterModules: i,
                            replaceResourceCenterContent: r,
                            showHomeViewOrEmptyState: d,
                            showResourceCenterEmptyState: u,
                            launchIntegrationByNameAndProvider: c,
                            appendIntegrationToBodyByNameAndProvider: p,
                            attemptToPreserveIntegrationIframes: I,
                            getResourceCenter: T,
                            addNotificationBubbleToResourceCenterBadge: B,
                            addNotificationBubbleToTargetElement: N,
                            updateNotificationBubbles: G,
                            removeNotificationBubble: U,
                            updateNotificationBubbleCount: H,
                            updateNotificationBubbleOnHomeView: R,
                            updateOrCreateNotificationBubble: P,
                            hexToRgb: A,
                            doesIntegrationExist: l,
                            calculateTotalNotificationCount: O,
                            updateNotificationBubblesOnHomeView: k,
                            createNotification: D,
                            appendNotificationBubble: F,
                            hasAnnouncementBeenSeen: z,
                            clearAnnouncementUnseenInterval: a,
                            createAnnouncementUnseenInterval: s,
                            findShownResourceCenterModule: V,
                            dismissResourceCenter: W,
                            repositionResourceCenter: j,
                            setNativeIntegrationDefaults: v,
                            renderNativeIntegration: E,
                            isSupportedNativeIntegration: g,
                            handleNativeIntegrationContinuation: C,
                            isProviderInstalled: h,
                            adjustNotificationBubbleForResize: L,
                            getNotificationBubbleDefaultCss: M,
                            getModuleId: K,
                            isSandboxModule: X,
                            isIntegrationModule: Y,
                            isFullyCustom: Z,
                            integrationModuleHasContent: Q,
                            fetchAnnouncementGuidesContent: $,
                            setFocusForResoureCenterModule: ee
                        };
                        var te, ne, ie, re
                    }(),
                    BuildingBlockSvgs = function () {
                        function e(e, n) {
                            switch (e) {
                            case "onboardingProgressCircle":
                                return t(n)
                            }
                        }

                        function t(e) {
                            if (isOldIE(9)) return r(e);
                            var t = e.svgAttributes,
                                o = t.fillCircle.percentComplete || 0,
                                a = o >= 100;
                            return a ? n(t) : i(t)
                        }

                        function n(e) {
                            var t = e.fillCircle.stroke,
                                n = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="pendo-progress-circle-fill" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
                                i = pendo.dom(n);
                            return i[0].setAttributeNS(null, "stroke", t), i
                        }

                        function i(e) {
                            var t = e.fillCircle.stroke,
                                n = e.backgroundCircle.stroke,
                                i = e.fillCircle.percentComplete || 0,
                                r = 100 / (2 * Math.PI),
                                o = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid"><circle class="pendo-progress-circle-background" cx="20" cy="20" r="' + r + '" stroke-width="6px" stroke-linecap="round" fill="none"></circle><circle class="pendo-progress-circle-fill" cx="20" cy="20" r="' + r + '" stroke-width="6px" stroke-linecap="round" transform="rotate(-90 20 20)" fill="none"></circle></svg>',
                                a = pendo.dom(o),
                                s = a.find(".pendo-progress-circle-fill")[0],
                                d = a.find(".pendo-progress-circle-background")[0];
                            return d.setAttributeNS(null, "stroke", n), 0 >= i ? s.setAttributeNS(null, "stroke-width", "0px") : (s.setAttributeNS(null, "stroke", t), s.setAttributeNS(null, "stroke-dasharray", i + ", 100")), a
                        }

                        function r(e) {
                            var t = e.svgAttributes,
                                n = t.fillCircle.stroke,
                                i = t.backgroundCircle.stroke,
                                r = t.fillCircle.percentComplete || 0,
                                o = r >= 100,
                                a = '<div aria-hidden="true" focusable="false" class="pendo-progress-circle-ie"><div class="pendo-progress-circle-fill"></div></div>',
                                s = pendo.dom(a),
                                d = s.find(".pendo-progress-circle-fill");
                            return o ? d.css({
                                border: "3px solid " + n,
                                height: "10px",
                                width: "10px"
                            }) : d.css({
                                border: "3px solid " + i,
                                height: "10px",
                                width: "10px"
                            }), s
                        }
                        return {
                            buildSvgNode: e,
                            createProgressCircleSvg: t
                        }
                    }(),
                    BuildingBlockWatermark = function () {
                        function e(e) {
                            var t = _.filter(e, function (e) {
                                return e && e.attributes && e.attributes.isWatermark
                            });
                            BuildingBlockWatermark.watermarkGuides = t;
                            var n = _.map(t, function (e) {
                                return e.fetchContent()
                            });
                            return q.all(n)
                        }

                        function t(e) {
                            return _.find(BuildingBlockWatermark.watermarkGuides, function (t) {
                                return e === t.appId
                            })
                        }

                        function n(e) {
                            return _.find(BuildingBlockWatermark.watermarkGuides, function (t) {
                                return e === t.targetAccount
                            })
                        }

                        function i(e, i) {
                            if (e = e || {}, e.isTraining) {
                                var r = e.targetAccount ? n(e.targetAccount) : t(e.appId);
                                if (r && r.steps) {
                                    var o = r.steps[0];
                                    if (o && o.domJson) {
                                        var a = o.domJson,
                                            s = i(a, o);
                                        return s.css({
                                            position: "absolute",
                                            left: "auto",
                                            top: e.isBottomAligned ? "auto" : "100%",
                                            bottom: e.isBottomAligned ? "100%" : "auto",
                                            right: "0"
                                        }), s
                                    }
                                }
                            }
                        }
                        return {
                            initializeWatermark: e,
                            buildWatermark: i
                        }
                    }(),
                    P2AutoLaunch = function () {
                        function e() {
                            _.isFunction(document.addEventListener) && document.addEventListener("keyup", function (e) {
                                e.shiftKey && e.altKey && "Digit7" === e.code && c("", !0), e.shiftKey && e.altKey && "Digit8" === e.code && c("", !1, !0)
                            }, !1)
                        }

                        function t(e, t) {
                            var o = {
                                    "background-color": b.WHITE,
                                    height: u(y.MODAL_HEIGHT),
                                    "min-height": u(y.MODAL_HEIGHT),
                                    width: u(y.MODAL_WIDTH),
                                    position: "fixed",
                                    top: u(y.MODAL_TOP_OFFSET),
                                    left: "50%",
                                    "margin-left": u(-y.MODAL_WIDTH / 2),
                                    "border-radius": u(4),
                                    "box-shadow": "0px 13px 28px rgba(0, 0, 0, 0.17)",
                                    overflow: "hidden",
                                    "z-index": "300000",
                                    "box-sizing": "border-box"
                                },
                                a = d("div", v.container, o);
                            a.appendChild(s()), a.appendChild(n(t)), a.appendChild(i()), a.appendChild(r(e)), document.body.appendChild(a)
                        }

                        function n(e) {
                            var t = d("div", v.header, {
                                    "background-color": b.GRAY_PRIMARY,
                                    height: u(y.HEADER_HEIGHT),
                                    "min-height": u(y.HEADER_HEIGHT),
                                    width: "100%",
                                    padding: u(10) + " " + u(20),
                                    display: "flex",
                                    "align-items": "center",
                                    "box-sizing": "border-box"
                                }),
                                n = d("div", v.logoContainer, {
                                    height: u(38),
                                    width: u(44),
                                    "background-color": b.PENDO_PINK,
                                    padding: u(8),
                                    "border-radius": u(3),
                                    "box-sizing": "border-box"
                                });
                            n.innerHTML = w, t.appendChild(n);
                            var i = d("div", v.title, {
                                width: "100%",
                                display: "flex",
                                "align-items": "center",
                                "font-family": E.PRIMARY_FONT,
                                "font-size": u(18),
                                color: b.WHITE,
                                "margin-left": u(10),
                                "box-sizing": "border-box"
                            });
                            return i.innerText = e ? "VIA Designer" : "Pendo Designer", t.appendChild(i), t
                        }

                        function i() {
                            var e = d("div", v.body, {
                                height: y.BODY_HEIGHT,
                                "min-height": y.BODY_HEIGHT,
                                width: "100%",
                                display: "flex",
                                padding: u(32) + " " + u(20),
                                "font-family": E.PRIMARY_FONT,
                                "font-size": u(14),
                                "box-sizing": "border-box"
                            });
                            return e.innerText = "Thanks for letting us know you're here. We're ready to try this again. Launch Designer below to begin.", e
                        }

                        function r(e) {
                            var t = d("div", v.footer, {
                                    "align-items": "center",
                                    "border-top": "1px solid" + b.GRAY_LIGHTER_6,
                                    display: "flex",
                                    height: u(y.FOOTER_HEIGHT),
                                    "justify-content": "flex-end",
                                    "min-height": u(y.FOOTER_HEIGHT),
                                    padding: u(10),
                                    width: "100%",
                                    "box-sizing": "border-box"
                                }),
                                n = d("button", v.closeButton, {
                                    "border-radius": u(3),
                                    border: "none",
                                    height: u(y.BUTTON_HEIGHT),
                                    "padding-right": u(10),
                                    "padding-left": u(10),
                                    "font-family": E.PRIMARY_FONT,
                                    "font-size": u(14),
                                    display: "flex",
                                    "line-height": "120%",
                                    "margin-right": u(10),
                                    "min-width": "90px",
                                    "justify-content": "center",
                                    "box-sizing": "border-box"
                                });
                            n.innerHTML = "Close", n.onclick = function () {
                                f(v.container), f(v.commIframeId)
                            };
                            var i = d("button", v.launchButton, {
                                "background-color": b.TEAL_PRIMARY,
                                "border-radius": u(3),
                                color: b.WHITE,
                                border: "none",
                                height: u(y.BUTTON_HEIGHT),
                                "padding-right": u(10),
                                "padding-left": u(10),
                                "font-family": E.PRIMARY_FONT,
                                "font-size": u(14),
                                display: "flex",
                                "line-height": "120%",
                                "min-width": "90px",
                                "justify-content": "center",
                                "box-sizing": "border-box"
                            });
                            return i.innerHTML = "Launch Designer", i.onclick = function () {
                                m(e)
                            }, t.appendChild(n), t.appendChild(i), t
                        }

                        function o(e) {
                            return _.reduce(_.pairs(e), function (e, t) {
                                var n = t[0],
                                    i = t[1];
                                return e + n + ":" + i + ";"
                            }, "")
                        }

                        function a(e) {
                            return _.reduce(_.pairs(e), function (e, t) {
                                var n = t[0],
                                    i = t[1];
                                return e + n + "{" + o(i) + "} "
                            }, "")
                        }

                        function s() {
                            var e = document.createElement("style");
                            e.setAttribute("id", v.style), e.type = "text/css";
                            var t = document.createTextNode(a(S));
                            return e.appendChild(t), e
                        }

                        function d(e, t, n) {
                            var i = document.createElement(e);
                            return i.setAttribute("id", t), _.extend(i.style, n), i
                        }

                        function u(e) {
                            return e + "px"
                        }

                        function l(e) {
                            return "#" + e
                        }

                        function c(e, n, i) {
                            if (!pendo.designerLaunched) {
                                var r, o, a = pendo._.once(function (e) {
                                    n || !i ? m(e) : t(e, n), g()
                                });
                                addSafeWindowMessageListener(function (e) {
                                    if ("pendo-designer-launch-modal" === e.data.destination) {
                                        if (clearInterval(r), e.data.viaconfirmed) return void clearInterval(o);
                                        if (!e.data.token) return void g();
                                        a(e.data.token);
                                        var t = JSON.parse(e.data.token);
                                        pendo._.contains(t.host, "via") && !t.visitorId && (o || (o = setInterval(function () {
                                            document.getElementById(v.commIframeId) && h()
                                        }, 100)))
                                    }
                                }), pendo.designerv2.addCommunicationIframe({
                                    lookasideDir: e,
                                    defaultBucket: "in-app-designer"
                                }), h(), r = window.setInterval(h, 50)
                            }
                        }

                        function p() {
                            if (!pendo.designerLaunched) {
                                var e = pendo._.once(function (e) {
                                    m(e, !0)
                                });
                                addSafeWindowMessageListener(function (t) {
                                    "pendo-designer-launch-modal" === t.data.destination && t.data.token && e(t.data.token)
                                })
                            }
                        }

                        function f(e) {
                            document.getElementById(e) && document.getElementById(e).remove()
                        }

                        function g() {
                            var e = document.querySelector("#" + v.commIframeId + '[src*="pendo"]');
                            e && e.remove()
                        }

                        function h() {
                            document.getElementById(v.commIframeId).contentWindow.postMessage({
                                destination: "pendo-designer-ls",
                                source: "pendo-designer-launch-modal",
                                visitorId: pendo.visitorId
                            }, "*")
                        }

                        function m(e, t) {
                            var n = {},
                                i = JSON.parse(e);
                            n.target = i.target || "latest", i.host && (n.host = i.host), i.lookaside && (n.lookaside = i.lookaside), t && (n.selectionOnly = t), f(v.container), pendo.designerv2.launchInAppDesigner(n)
                        }
                        var v = {
                                body: "pendo-launch-modal-body",
                                closeButton: "pendo-launch-modal-close-button",
                                container: "pendo-launch-modal",
                                footer: "pendo-launch-modal-footer",
                                header: "pendo-launch-modal-header",
                                launchButton: "pendo-launch-modal-launch-button",
                                title: "pendo-launch-modal-title",
                                logoContainer: "pendo-launch-modal-logo-container",
                                style: "pendo-launch-modal-style",
                                commIframeId: "pendo-designer-communication-iframe"
                            },
                            b = {
                                GRAY_LIGHTER_6: "#EAECF1",
                                GRAY_PRIMARY: "#2A2C35",
                                PENDO_PINK: "#FF4876",
                                TEAL_DARKER: "#036463",
                                TEAL_PRIMARY: "#008180",
                                WHITE: "#FFFFFF"
                            },
                            y = {
                                BUTTON_HEIGHT: 35,
                                HEADER_HEIGHT: 60,
                                MODAL_HEIGHT: 235,
                                MODAL_TOP_OFFSET: 150,
                                MODAL_WIDTH: 370
                            };
                        y.FOOTER_HEIGHT = 1.25 * y.HEADER_HEIGHT, y.BODY_HEIGHT = "calc(100% - " + u(y.HEADER_HEIGHT) + " - " + u(y.FOOTER_HEIGHT) + ")";
                        var w = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164.12 164.12"><defs><style>.cls-1{fill:#fff;}</style></defs><title>chevron</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="82.06 0 0 82.06 82.06 82.06 82.06 164.13 164.13 82.06 164.13 0 82.06 0"/></g></g></svg>',
                            S = {};
                        S[l(v.closeButton) + ":hover"] = {
                            "background-color": b.GRAY_LIGHTER_6
                        }, S[l(v.launchButton) + ":hover"] = {
                            "background-color": b.TEAL_DARKER + " !important"
                        };
                        var E = {
                            PRIMARY_FONT: "Helvetica Neue"
                        };
                        return {
                            listen: e,
                            launchOnLocalStorageToken: m,
                            ids: v,
                            removeElement: f,
                            attemptToLaunch: c,
                            loadPluginJs: p
                        }
                    }(),
                    DesignerV2 = function () {
                        function e(e) {
                            return e ? isTrustedOrigin2(e) : !1
                        }

                        function t(t) {
                            if (!h()) {
                                var r = /pendo-designer=([A-Za-z0-9-]+)/,
                                    o = /lookaside=[A-Za-z0-9-]+/;
                                if (r.test(t)) {
                                    var a = r.exec(t);
                                    if (a) {
                                        var s = a[0],
                                            d = o.exec(t),
                                            u = d ? d[0] : "",
                                            l = n(a[1]),
                                            c = queryStringToObject(s + "&" + u),
                                            p = e(l.host) ? l.host : null;
                                        return c.hasOwnProperty("pendo-designer") ? (window.localStorage.removeItem("pendo-navigation-state"), window.localStorage.removeItem("pendo-designer-mode"), i({
                                            target: l.target || "latest",
                                            lookaside: c.lookaside,
                                            host: p,
                                            preloader: !1
                                        }), !0) : void 0
                                    }
                                }
                            }
                        }

                        function n(e) {
                            try {
                                return JSON.parse(atob(decodeURIComponent(e))) || {}
                            } catch (t) {
                                return {}
                            }
                        }

                        function i(t) {
                            if (!h() && !pendo.designerLaunched) {
                                var n = !1;
                                try {
                                    n = !!window.top.pendo
                                } catch (i) {}
                                if (pendo.designerv2.crossFrameChannel === undefined && (pendo.designerv2.crossFrameChannel = crossFrameChannel, pendo.designerv2.useCrossFrameChannel = !0), detectMaster() && n && !t.allowChildFrame && !t.selectionOnly) return void pendo.log("skipping designer launch from a child frame. pass `allowChildFrame: true` to override");
                                pendo.designerLaunchTime = (new Date).getTime(), t || (t = {}), t.lookaside || (t.lookaside = pendoLocalStorage.getItem("pendo-designer-lookaside") || "");
                                var r = t.host || b,
                                    o = e(r),
                                    a = o ? r : SERVER;
                                o || log("Invalid host, falling back to " + SERVER);
                                var s = encodeURIComponent(t.gcsBucket || "in-app-designer"),
                                    d = encodeURIComponent(t.lookaside || t.target || "latest"),
                                    u = t.preloader ? "preloader.js" : "plugin.js",
                                    l = t.preloader ? "preloader-shims" : "designer-shims",
                                    c = a + "/" + s + "/" + d + "/" + u;
                                pendo.designerv2.hostConfig = {
                                    gcsBucket: s,
                                    baseFolder: d,
                                    lookaside: t.lookaside,
                                    uniqueWindowId: t.uniqueWindowId,
                                    host: a,
                                    adoptv2: t.adoptv2,
                                    DADesigner: t.DADesigner
                                };
                                var f = {};
                                t.selectionOnly && (f["selection-only"] = !0);
                                var g = getPendoConfigValue("designerAgentPluginsLoader");
                                _.isFunction(g) ? g(l, c, f) : p(l, c, f), pendo.designerLaunched = !0
                            }
                        }

                        function r() {
                            var e = "@keyframes pendoExtensionSlideIn{from{transform:translate3d(-300px,0,0)}to{transform:translate3d(0,0,0);}}",
                                t = "#pendo-draggable-handle{z-index:11;line-height: 15px;text-align:center;font-size:20px;letter-spacing:1.5px;position:absolute;width:100%;height:65px;font-size:16px;background-color:transparent;color:#ABE7DB;user-select:none;cursor: move;cursor: grab;cursor: -moz-grab;cursor: -webkit-grab;}#pendo-draggable-handle:active{cursor: grabbing;cursor: -moz-grabbing;cursor: -webkit-grabbing !important;}#pendo-draggable-handle.hidden{display:none;}#pendo-draggable-handle:hover{color:#2EA2A0;}",
                                n = "#pendo-mousemove-cover{position:absolute;height:100%;width:100%;top:0;left:0;z-index:9999999999;display:none;}",
                                i = "#pendo-designer-container{animation-duration:375ms;animation-name:pendoExtensionSlideIn;animation-timing-function:cubic-bezier(0.4,0.0,0.2,1); box-shadow: 0px 2px 10px rgba(0,0,0,0.15);height:100vh;width:400px;position:fixed;top:0;left:0;overflow:hidden;border-radius:3px;z-index:1000000;}",
                                r = "#pendo-designer-container.fullscreen{width:100%;opacity:0.98;}",
                                o = "#pendo-designer-container.closed{left:-400px;}",
                                a = "#pendo-designer-iframe{background:#3a3c45;border:0px;height:100%;left:0;z-index:10;top:0;width:100%;}";
                            return e + t + i + n + r + o + a
                        }

                        function o(e) {
                            e || (e = {});
                            var t = encodeURIComponent(e.lookaside || "latest"),
                                n = encodeURIComponent(e.gcsBucket || "designer");
                            c("designer-styles", r(t));
                            var i = b + "/" + n + "/" + t + "/plugin.js";
                            if (p("designer-shims", i), pendo.DESIGNER_VERSION) return void s(t, e);
                            var o = window.setInterval(function () {
                                pendo.DESIGNER_VERSION && (s(t, e), clearInterval(o))
                            }, 100)
                        }

                        function a(e) {
                            e || (e = {});
                            var t = encodeURIComponent(e.lookaside || e.lookasideDir || "latest"),
                                n = encodeURIComponent(e.gcsBucket || e.defaultBucket || "designer"),
                                i = (new Date).getTime();
                            pendo.designerv2.windowCommunicationId = i;
                            var r = "pendo-designer-communication-iframe";
                            if (!document.getElementById(r)) {
                                var o = "pendo-designer-communication-embedded",
                                    a = "communication.html";
                                o += "__" + i, e && e.lookaside && (o += "__" + e.lookaside, a = "lookaside-" + a);
                                var s = b + "/" + n + "/" + t + "/" + a,
                                    d = u(r, s, "border-width:0;height:0;width:0;");
                                return d.setAttribute("name", o), document.body.appendChild(d), d
                            }
                            return document.getElementById(r)
                        }

                        function s(e, t) {
                            f(), d(e, t)
                        }

                        function d(e, t) {
                            if (!document.getElementById("pendo-designer-container")) {
                                var n = "pendo-designer-embedded",
                                    i = "designer.html",
                                    r = "designer";
                                n += "__" + pendo.designerv2.windowCommunicationId, t && t.lookaside && (n += "__" + t.lookaside, i = "lookaside.html"), t && t.gcsBucket && (r = t.gcsBucket);
                                var o = b + "/" + r + "/" + e + "/" + i,
                                    a = u("pendo-designer-iframe", o);
                                a.setAttribute("name", n);
                                var s = l(a);
                                document.body.appendChild(s)
                            }
                        }

                        function u(e, t, n) {
                            var i = document.createElement("iframe");
                            return i.setAttribute("id", e), n && setStyle(i, n), i.setAttribute("sandbox", "allow-scripts allow-same-origin allow-top-navigation allow-forms allow-pointer-lock allow-popups"), i.src = t, i
                        }

                        function l(e) {
                            var t = document.createElement("div");
                            return t.setAttribute("id", "pendo-designer-container"), t.appendChild(e), t
                        }

                        function c(e, t) {
                            if (!document.getElementById(e)) {
                                var n = document.createElement("style");
                                n.setAttribute("id", e), n.type = "text/css";
                                var i = document.createTextNode(t);
                                n.appendChild(i), document.getElementsByTagName("head")[0].appendChild(n)
                            }
                        }

                        function p(e, t, n) {
                            if (!document.getElementById(e)) {
                                var i = document.createElement("script");
                                i.setAttribute("charset", "utf-8"), i.setAttribute("id", e), i.src = t, n && _.forEach(n, function (e, t) {
                                    i.setAttribute(t, e)
                                }), document.body.appendChild(i)
                            }
                        }

                        function f() {
                            window.postMessage({
                                type: "connect",
                                source: "pendo-designer-content-script",
                                destination: "pendo-designer-agent"
                            }, "*")
                        }

                        function g(e) {
                            var t = document.getElementById("pendo-designer-communication-iframe");
                            t && t.contentWindow.postMessage(e.data, "*")
                        }

                        function h() {
                            return /pendo/.test(window.name)
                        }

                        function m() {
                            _.isFunction(window.addEventListener) && detectMaster() && window.addEventListener("message", v)
                        }

                        function v(e) {
                            if (e && e.data) {
                                var t = e.data.destination;
                                if (t && "pendo-designer-agent" === t) {
                                    var n = e.data.type;
                                    if (n && "addSelectionCode" === n) {
                                        var r = e.data.options;
                                        r && (r.selectionOnly = !0, i(r), window.removeEventListener("message", v))
                                    }
                                }
                            }
                        }
                        var b = SERVER;
                        return "local" === DESIGNER_ENV && (b = "https://local.pendo.io:8080"), m(), {
                            launchDesigner: o,
                            launchInAppDesigner: i,
                            launchOnToken: t,
                            sendMessageToLocalStorage: g,
                            isValidDesignerHost: e,
                            launchSelectionModeFromMessage: v,
                            addCommunicationIframe: a,
                            addStylesToPage: c
                        }
                    }();
                pendo.designerv2 = DesignerV2, pendo.P2AutoLaunch = P2AutoLaunch, pendo.BuildingBlocks = {
                    BuildingBlockGuides: BuildingBlockGuides,
                    BuildingBlockResourceCenter: BuildingBlockResourceCenter,
                    BuildingBlockTemplates: BuildingBlockTemplates,
                    BuildingBlockTooltips: BuildingBlockTooltips,
                    BuildingBlockSvgs: BuildingBlockSvgs
                }, pendo.getVersion = getVersion, pendo.isReady = isReady, pendo.pageLoad = pageLoad, pendo.getVisitorId = pendo.get_visitor_id, pendo.getAccountId = pendo.get_account_id, pendo.clearSession = clearSession, pendo.flushNow = function () {
                    return flushNow(!0)
                }, pendo.initGuides = initGuides, pendo.loadGuides = loadGuides, pendo.findGuideByName = findGuideByName, pendo.hideGuides = hideGuides, pendo.onGuideDismissed = onGuideDismissed, pendo.goToStep = goToStep, pendo.onGuideAdvanced = onGuideAdvanced, pendo.onGuidePrevious = onGuidePrevious, pendo.onGuideSnoozed = onGuideSnoozed, pendo.startGuides = manuallyStartGuides, pendo.stopGuides = stopGuides, pendo.toggleLauncher = toggleLauncher, pendo.showLauncher = expandLauncherList, pendo.hideLauncher = collapseLauncherList, pendo.removeLauncher = removeLauncher, pendo.defaultCssUrl = getDefaultCssUrl(), pendo.getActiveGuides = getActiveGuides, pendo.getActiveGuide = getActiveGuide, pendo.guideSeenTimeoutLength = getGuideSeenTimeoutLength(), pendo.areGuidesDisabled = areGuidesDisabled, pendo.setGuidesDisabled = setGuidesDisabled, pendo.buildNodeFromJSON = BuildingBlockGuides.buildNodeFromJSON, pendo.flexElement = BuildingBlockGuides.flexElement, pendo.GuideFactory = GuideFactory, pendo.dom = dom, pendo.getEventPropertyTarget = getEventPropertyTarget, pendo.previewEventProperty = collectEventProperty, pendo.log = log, pendo.enableLogging = enableLogging, pendo.disableLogging = disableLogging, pendo.setActiveContexts = setActiveContexts, pendo.showLogHistory = showLogHistory, pendo.getLoggedContexts = getLoggedContexts, pendo.isDebuggingEnabled = isDebuggingEnabled, pendo.enableDebugging = enableDebugging, pendo.disableDebugging = disableDebugging, pendo.addDebuggingFunctions = addDebuggingFunctions, pendo.stopSendingEvents = lockEvents, pendo.startSendingEvents = unlockEvents, pendo.isSendingEvents = isUnlocked, pendo.fromByteArray = b64.uint8ToBase64;
                var designer = {
                        dom: dom,
                        placeBadge: placeBadge,
                        showPreview: showPreview,
                        stopGuides: stopGuides,
                        removeAllBadges: removeAllBadges,
                        _: _,
                        sizzle: Sizzle,
                        tellMaster: tellMaster,
                        tell: tellMaster,
                        log: log,
                        attachEvent: attachEvent,
                        createLauncher: createLauncher,
                        removeLauncher: removeLauncher,
                        addGuideToLauncher: addGuideToLauncher,
                        updateLauncherContent: updateLauncherContent,
                        DEFAULT_TIMER_LENGTH: DEFAULT_TIMER_LENGTH,
                        getOffsetPosition: getOffsetPosition,
                        getScreenDimensions: getScreenDimensions,
                        registerMessageHandler: registerMessageHandler,
                        whenLoadedCall: whenLoadedCall,
                        loadResource: pendo.loadResource,
                        loadGuideCss: loadGuideCss,
                        GuideFactory: GuideFactory,
                        GuideStep: GuideStep,
                        extractElementTreeContext: extractElementTreeContext,
                        previewGuideFromJSON: BuildingBlockGuides.previewGuideFromJSON,
                        hidePreviewedGuide: BuildingBlockGuides.hidePreviewedGuide,
                        shadowAPI: shadowAPI,
                        getTarget: getTarget,
                        pullContentsFromTargetElement: pullContentsFromTargetElement,
                        doesElementMatchContainsRules: doesElementMatchContainsRules,
                        doesElementContentMatchRule: doesElementContentMatchRule
                    },
                    addDesignerFunctionality = function () {
                        designer.areGuidesEnabled = !areGuidesDisabled(), pendo.designer || (pendo.designer = designer)
                    },
                    removeDesignerFunctionality = function () {
                        pendo.designer && (pendo.designer = null, delete pendo.designer)
                    };
                isPrototypeOlderThan(1.7) && patchJSONstringify(), pendo.track = track;
                var Feedback = function () {
                    function e() {
                        re = "", oe = "", ae = "", se = "", de = !1, ue = "", le = !1
                    }

                    function t() {
                        return ae + "/html/widget/notLoaded.html"
                    }

                    function n(e) {
                        var t, n;
                        return "left" === e ? (t = he, n = be) : (t = ge, n = _e), ce + pe + fe + t + me + ve + n + ye
                    }

                    function i() {
                        agentStorage.write(ne, !0, ie)
                    }

                    function r() {
                        return agentStorage.read(ne)
                    }

                    function o(e) {
                        return re + e
                    }

                    function a(e) {
                        if (!r()) {
                            var t = s(e);
                            if (t.data && "{}" !== t.data && "null" !== t.data) return pendo.ajax.postJSON(o("/widget/pendo_ping"), t).then(c)
                        }
                        return q.resolve()
                    }

                    function s(e) {
                        return e || (e = Q(getOptionsCopy())), {
                            data: JSON.stringify(e)
                        }
                    }

                    function d() {
                        var e = agentStorage.read(te) || 0;
                        return parseInt(e, 10)
                    }

                    function u(e) {
                        agentStorage.write(te, e)
                    }

                    function l() {
                        var e = pendo.Sizzle("#feedback-trigger-notification");
                        if (0 !== e.length) {
                            var t = d();
                            t > 0 ? _.forEach(e, function (e) {
                                pendo.dom(e).css({
                                    visibility: "visible"
                                })
                            }) : _.forEach(e, function (e) {
                                pendo.dom(e).css({
                                    visibility: "hidden"
                                })
                            })
                        }
                    }

                    function c(e) {
                        i(), u(e.data.notifications), l()
                    }

                    function p() {
                        return le ? q.resolve() : X(getOptionsCopy(), getPendoConfigValue("feedbackSettings"))
                    }

                    function f(e, t) {
                        return p().then(function () {
                            return _.isUndefined(e) && (e = {}), "A" === get(e, "anchor.nodeName", "").toUpperCase() ? (g(), !1) : void v().then(function (e) {
                                window.location.href = e
                            })
                        }, function () {})
                    }

                    function g() {
                        var e = window.open(t(), Math.random().toString(36).substring(7));
                        v().then(function (t) {
                            e.location = t
                        })
                    }

                    function h(e) {
                        var t = document.createElement("a");
                        return t.href = e, t.host
                    }

                    function m(e) {
                        se = h(e)
                    }

                    function v() {
                        var e = s();
                        return e.data && "{}" !== e.data && "null" !== e.data ? pendo.ajax.postJSON(o("/widget/token"), e).then(function (e) {
                            return m(e.data.login_url), e.data.login_url
                        }) : void 0
                    }

                    function b() {
                        return document.getElementById(we.feedbackWidget)
                    }

                    function y() {
                        return document.getElementById(we.feedbackIframe)
                    }

                    function w() {
                        var e = y();
                        return e || (j(), e = y()), e
                    }

                    function S() {
                        var e = navigator.userAgent.toLowerCase();
                        return -1 != e.indexOf("msie") && parseInt(e.split("msie")[1], 10) < 10
                    }

                    function E(e) {
                        if (K()) {
                            e && e.preventDefault && e.preventDefault();
                            var n = w();
                            n.src && n.src !== t() || v().then(function (e) {
                                n.src = e + "&inWidget=true"
                            }), T(), dom.addClass(b(), "visible"), I("user.widget.opened")
                        }
                    }

                    function C() {
                        A(), dom.removeClass(b(), "visible"), I("user.widget.closed")
                    }

                    function I(e) {
                        var t = s();
                        return t.event = e, pendo.ajax.postJSON(o("/analytics"), t)
                    }

                    function T() {
                        var e = document.getElementById(we.feedbackWidget);
                        if (e) {
                            var t = {
                                    position: "fixed",
                                    top: "0",
                                    right: "0",
                                    bottom: "0",
                                    left: "0",
                                    background: "rgba(0, 0, 0, 0.4)",
                                    "z-index": "9000",
                                    opacity: "0",
                                    animation: "pendoFeedbackFadeIn 0.5s 0s 1 alternate both",
                                    "-webkit-animation": "pendoFeedbackFadeIn 0.5s 0s 1 alternate both"
                                },
                                n = N("feedback-overlay", t, "div"),
                                i = BuildingBlockGuides.buildNodeFromJSON(n),
                                r = e.parentNode;
                            i.appendTo(r)
                        }
                    }

                    function A() {
                        var e = document.getElementById(we.feedbackWidget),
                            t = document.getElementById(we.feedbackOverlay);
                        if (e && t) {
                            var n = document.getElementById(we.feedbackOverlay);
                            n.parentNode.removeChild(n)
                        }
                    }

                    function x(e) {
                        return se ? h(e) === se : h(e) === h(ae)
                    }

                    function G() {
                        window.addEventListener("message", function (e) {
                            var t = e.origin || e.originalEvent.origin;
                            x(t) && L(e.data.message, e.data.data)
                        }, !1)
                    }

                    function L(e, n) {
                        switch (e) {
                        case "close-receptive-widget":
                            C();
                            break;
                        case "open-receptive":
                            f();
                            break;
                        case "update-receptive-notification-count":
                            agentStorage.write("receptiveNotificationCount", n.count), l();
                            break;
                        case "handle-logout":
                            w().src = t(), C();
                            break;
                        case "loaded-receptive-widget":
                            de = !0
                        }
                    }

                    function O(e, t) {
                        if (e.visitor.id) {
                            var i = _.extend(t, {
                                triggerColor: "#" + t.triggerColor,
                                triggerPosition: t.triggerPosition.toLowerCase()
                            });
                            H();
                            var r = k(i);
                            pendo.designerv2.addStylesToPage("pendo-feedback-styles", n(r.horizontalPosition)), t.customTrigger || U(i, r), j(r.horizontalPosition)
                        }
                    }

                    function k(e) {
                        var t = e.triggerPosition.split("_");
                        return {
                            horizontalPosition: t[1],
                            verticalPosition: t[0]
                        }
                    }

                    function R(e) {
                        return "left" === e.horizontalPosition ? {
                            "transform-origin": "center left",
                            left: "23px",
                            animation: "pendoFeedbackSlideIn-left 0.2s 0s 1 alternate forwards",
                            "-webkit-animation": "pendoFeedbackSlideIn-left 0.2s 0s 1 alternate forwards"
                        } : {
                            right: "0px",
                            animation: "pendoFeedbackSlideIn 0.2s 0s 1 alternate forwards",
                            "-webkit-animation": "pendoFeedbackSlideIn 0.2s 0s 1 alternate forwards"
                        }
                    }

                    function B(e) {
                        switch (e.verticalPosition) {
                        case "top":
                            return {
                                top: " 10%"
                            };
                        case "middle":
                            return {
                                top: " 45%"
                            };
                        case "bottom":
                            return {
                                bottom: " 20%"
                            }
                        }
                    }

                    function N(e, t, n) {
                        return {
                            props: {
                                id: e,
                                style: t
                            },
                            type: n
                        }
                    }

                    function P() {
                        return {
                            "data-turbolinks-permanent": ""
                        }
                    }

                    function M(e) {
                        var t = R(e),
                            n = B(e),
                            i = {
                                position: "fixed",
                                height: "43px",
                                opacity: "1 !important",
                                "z-index": "9001"
                            },
                            r = N(we.feedbackTrigger, i, "div");
                        return _.extend(r.props, P()), _.extend(r.props.style, t), _.extend(r.props.style, n), r
                    }

                    function D() {
                        var e = {
                                "background-color": "#D85039",
                                color: "#fff",
                                "border-radius": "50%",
                                height: "17px",
                                width: "17px",
                                position: "absolute",
                                right: "-6px",
                                top: "-8px",
                                visibility: "hidden",
                                "z-index": "1",
                                animation: "pendoFeedbackPulse",
                                "animation-fill-mode": "both",
                                "animation-duration": "1s",
                                "animation-delay": "1s",
                                "animation-iteration-count": "1"
                            },
                            t = N("feedback-trigger-notification", e, "span");
                        return t
                    }

                    function F(e, t) {
                        var n;
                        n = "left" === t.horizontalPosition ? "0 0 5px 5px" : "3px 3px 0 0";
                        var i = {
                                border: "none",
                                padding: "11px 18px 14px 18px",
                                "background-color": e.triggerColor,
                                "border-radius": n,
                                "font-size": "15px",
                                color: "#fff",
                                "box-shadow": "0 -5px 9px rgba(0,0,0,.16)",
                                cursor: "pointer",
                                "text-align": "left"
                            },
                            r = {
                                actions: [{
                                    action: "openFeedback",
                                    destination: "Global",
                                    eventType: "click",
                                    parameters: [],
                                    source: we.feedbackTriggerButton,
                                    uiMetadata: {}
                                }]
                            },
                            o = N(we.feedbackTriggerButton, i, "button");
                        return _.extend(o, r), _.extend(o, {
                            content: e.triggerText
                        })
                    }

                    function U(e, t) {
                        var n = M(t),
                            i = D(),
                            r = F(e, t),
                            o = {
                                type: "style",
                                props: {
                                    type: "text/css",
                                    scoped: "scoped"
                                },
                                css: [{
                                    selector: "#feedback-trigger button:hover",
                                    styles: {
                                        "box-shadow": "0 -5px 20px rgba(0,0,0,.19)",
                                        outline: "none",
                                        background: "#3e566f"
                                    }
                                }, {
                                    selector: "#feedback-trigger button:focus",
                                    styles: {
                                        "box-shadow": "0 -5px 20px rgba(0,0,0,.19)",
                                        outline: "none",
                                        background: "#3e566f"
                                    }
                                }]
                            };
                        _.extend(n, {
                            children: [i, r, o]
                        });
                        var a = {};
                        a.eventRouter = new EventRouter;
                        var s = BuildingBlockGuides.buildNodeFromJSON(n, a);
                        s.appendTo(getBody())
                    }

                    function H() {
                        "undefined" != typeof Turbolinks && document.addEventListener("turbolinks:before-visit", function (e) {
                            var n = document.getElementById(we.feedbackIframe);
                            n && (n.src = t())
                        })
                    }

                    function z(e) {
                        var t = N(we.feedbackWidget, J(), "div");
                        return _.extend(t, {
                            "data-turbolinks-permanent": "true"
                        }), _.extend(t.props, {
                            "class": "buttonIs-" + e
                        }), t
                    }

                    function V() {
                        var e = {
                                width: "100%",
                                height: "99.6%",
                                border: "0 none"
                            },
                            n = N(we.feedbackIframe, e, "iframe");
                        return _.extend(n.props, {
                            src: t()
                        }), n
                    }

                    function W(e) {
                        var t;
                        return t = "left" === e ? {
                            selector: ".buttonIs-left.visible",
                            styles: {
                                left: "0px",
                                width: "470px",
                                "animation-direction": "alternate-reverse",
                                animation: "pendoFeedbackSlideFromLeft 0.5s 0s 1 alternate both",
                                "-webkit-animation": "pendoFeedbackSlideFromLeft 0.5s 0s 1 alternate both",
                                "z-index": "9002"
                            }
                        } : {
                            selector: ".buttonIs-right.visible",
                            styles: {
                                right: "0",
                                width: "470px",
                                "animation-direction": "alternate-reverse",
                                animation: "pendoFeedbackSlideFromRight 0.5s 0s 1 alternate both",
                                "-webkit-animation": "pendoFeedbackSlideFromRight 0.5s 0s 1 alternate both",
                                "z-index": "9002"
                            }
                        }, {
                            type: "style",
                            props: {
                                type: "text/css",
                                scoped: "scoped"
                            },
                            css: [t]
                        }
                    }

                    function j(e) {
                        var t = W(e),
                            n = z(e);
                        _.extend(n, {
                            children: [V(), t]
                        });
                        var i = BuildingBlockGuides.buildNodeFromJSON(n);
                        i.appendTo(getBody()), G()
                    }

                    function J() {
                        return {
                            height: "100%",
                            position: "fixed",
                            right: "0",
                            top: "0",
                            width: "0",
                            "background-color": "#f7f7f7",
                            transition: "animation 0.4s ease-in-out",
                            "box-shadow": "0 5px 40px rgba(0,0,0,.46)",
                            display: "block !important",
                            "-webkit-overflow-scrolling": "touch",
                            "overflow-y": "hidden"
                        }
                    }

                    function K(e) {
                        var t = e || getOptionsCopy();
                        if (!S() && oe && re && ae && ue) {
                            if (!_.has(t.visitor, "id")) return void pendo.log("Not valid visitor id");
                            if (!isAnonymousVisitor(t.visitor.id)) return _.has(t.account, "id") ? !0 : void pendo.log("The current visitor is not associated with an account.")
                        }
                    }

                    function X(e, t) {
                        if (oe = t.vendorId, re = t.apiUrl, ae = t.siteUrl, ue = t.productId, !K(e)) return q.reject();
                        var n = Q(e);
                        try {
                            return "WIDGET" === t.type && O(e, t), l(), le = !0, a(n)
                        } catch (i) {
                            return le = !1, pendo.log(i, "unhandled error while initializing feedback"), q.reject(i)
                        }
                    }

                    function Y(e) {
                        return _.isUndefined(e.user) || _.isUndefined(e.user.id) ? "noemail+" + pendo.randomString(32) + "@pendo.io" : "noemail+" + e.user.id + "@pendo.io"
                    }

                    function Z(e) {
                        if (!_.isUndefined(e.user.firstName) || !_.isUndefined(e.user.lastName)) {
                            var t = [];
                            return _.isUndefined(e.user.firstName) || t.push(e.user.firstName), _.isUndefined(e.user.lastName) || t.push(e.user.lastName), t.join(" ")
                        }
                        return _.isUndefined(e.user) || _.isUndefined(e.user.id) ? "No Name Provided" + pendo.randomString(32) : "No Name Provided" + e.user.id
                    }

                    function Q(e) {
                        var t = getJwtInfoCopy();
                        if (_.isEmpty(t)) {
                            var n = JSON.parse(JSON.stringify(e)),
                                i = n.visitor;
                            return delete n.visitor, n.user = i, _.extend(n, {
                                vendor: {
                                    id: oe
                                }
                            }), _.extend(n.user, {
                                allowed_products: [{
                                    id: ue
                                }]
                            }), _.isUndefined(n.account.is_paying) && (n.account.is_paying = !0), _.isUndefined(n.user.email) && (n.user.email = Y(n)), _.isUndefined(n.user.full_name) && (n.user.full_name = Z(n)), n
                        }
                        var r = JSON.parse(JSON.stringify(t));
                        return _.extend(r, {
                            vendor: {
                                id: oe
                            }
                        }), _.extend(r, {
                            allowed_products: [{
                                id: ue
                            }]
                        }), r
                    }

                    function $() {
                        return le
                    }

                    function ee() {
                        pendo.P2AutoLaunch.removeElement("feedback-trigger"), pendo.P2AutoLaunch.removeElement("feedback-widget"), pendo.P2AutoLaunch.removeElement("pendo-feedback-styles"), pendo.P2AutoLaunch.removeElement("feedback-overlay"), pendo.P2AutoLaunch.removeElement("feedback-widget_iframe"), e()
                    }
                    var te = "feedback_notification_count",
                        ne = "feedback_ping_sent",
                        ie = 36e5,
                        re = "",
                        oe = "",
                        ae = "",
                        se = "",
                        de = !1,
                        ue = "",
                        le = !1,
                        ce = "@media only screen and (max-device-width:1112px){#feedback-widget{overflow-y:scroll}}",
                        pe = "@-webkit-keyframes pendoFeedbackSlideIn{from{opacity:0;transform:translate(145px,0) rotate(270deg) translateY(-50%)}to{opacity:1;transform:translate(50%,0) rotate(270deg) translateY(-50%)}}@keyframes pendoFeedbackSlideIn{from{opacity:0;transform:translate(145px,0) rotate(270deg) translateY(-50%)}to{opacity:1;transform:translate(50%,0) rotate(270deg) translateY(-50%)}}",
                        fe = "@-webkit-keyframes pendoFeedbackSlideIn-left{from{opacity:0;transform:rotate(270deg) translateX(-55%) translateY(-55%)}to{opacity:1;transform:rotate(270deg) translateX(-55%) translateY(0)}}@keyframes pendoFeedbackSlideIn-left{from{opacity:0;transform:rotate(270deg) translateX(-55%) translateY(-55%)}to{opacity:1;transform:rotate(270deg) translateX(-55%) translateY(0)}}",
                        ge = "@-webkit-keyframes pendoFeedbackSlideFromRight{from{transform:translate(-460px,0)}to{transform:translate(0,0)}}@keyframes pendoFeedbackSlideFromRight{from{opacity:0;transform:translate(460px,0)}to{opacity:1;transform:translate(0,0)}}",
                        he = "@-webkit-keyframes pendoFeedbackSlideFromLeft{from{opacity:0;transform:translate(-460px,0)}to{opacity:1;transform:translate(0,0)}}@keyframes pendoFeedbackSlideFromLeft{from{opacity:0;transform:translate(-460px,0)}to{opacity:1;transform:translate(0,0)}}",
                        me = "@-webkit-keyframes pendoFeedbackPulse{from{-webkit-transform:scale(1,1);transform:scale(1,1)}50%{-webkit-transform:scale(1.15,1.15);transform:scale(1.15,1.15)}to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@keyframes pendoFeedbackPulse{from{-webkit-transform:scale(1,1);transform:scale(1,1)}50%{-webkit-transform:scale(1.15,1.15);transform:scale(1.15,1.15)}to{-webkit-transform:scale(1,1);transform:scale(1,1)}}",
                        ve = "@-webkit-keyframes pendoFeedbackFadeIn{from{opacity:0}to{opacity:1}}@keyframes pendoFeedbackFadeIn{from{opacity:0}to{opacity:1}}",
                        _e = "@media only screen and (max-width:470px){#feedback-widget.buttonIs-right.visible{width:100%;right:2%}}",
                        be = "@media only screen and (max-width:470px){#feedback-widget.buttonIs-left.visible{width:100%}}",
                        ye = "#feedback-trigger button:focus,#feedback-trigger button:hover{box-shadow:0 -5px 20px rgba(0,0,0,.19);outline:0;background:#3e566f}",
                        we = {
                            feedbackIframe: "feedback-widget_iframe",
                            feedbackTrigger: "feedback-trigger",
                            feedbackWidget: "feedback-widget",
                            feedbackOverlay: "feedback-overlay",
                            feedbackTriggerButton: "feedback-trigger-button"
                        },
                        Se = function () {
                            return de
                        };
                    return {
                        ping: a,
                        init: X,
                        initialized: $,
                        loginAndRedirect: f,
                        openFeedback: E,
                        initializeFeedbackOnce: p,
                        isFeedbackLoaded: Se,
                        convertPendoToFeedbackOptions: Q,
                        isUnsupportedIE: S,
                        removeFeedbackWidget: ee
                    }
                }();
                if (pendo.feedback = Feedback, !pendoCore) {
                    var guidesCoreOff = ["initGuides", "loadGuides", "findGuideByName", "hideGuides", "onGuideDismissed", "onGuideAdvanced", "onGuidePrevious", "startGuides", "stopGuides", "toggleLauncher", "showLauncher", "hideLauncher", "removeLauncher", "defaultCssUrl", "areGuidesDisabled", "setGuidesDisabled", "flexElement", "GuideFactory", "P2AutoLaunch", "BuildingBlocks", "designer", "advancedGuide", "dismissedGuide", "findGuideBy", "findGuideById", "findStepInGuide", "getElementForGuideStep", "guideContent", "guideDev", "isGuideShown", "seenGuide", "showGuideById", "showGuideByName", "showGuideByName", "showPreview", "stageGuideEvent", "waitThenStartGuides", "_addCloseButton", "_addGuideToLauncher", "_shouldAutoDisplayGuide", "_showElementGuide", "_showGuide", "_showLightboxGuide", "_updateGuideStepStatus", "badgeDiv", "badgesShown", "isBadge", "placeBadge", "removeAllBadges", "_addCredits", "_createGuideEvent", "_createToolTip", "_getNextStepInMultistep", "_getOpacityStyles", "_get_offset", "_get_screen_dim", "_get_tooltip_dimensions", "_isInViewport", "_isOldIE", "_sendGuideEvent", "findModuleByName", "guidesProcessingThreadHandle", "initLauncher", "getTooltipDivId", "receiveDomStructureJson", "setupWatchOnTooltip", "testUrlForStep", "hasModule"],
                        eventsCoreOff = ["flushEventCache", "flushNow", "getEventCache", "isSendingEvents", "processEventCache", "send_event", "startSendingEvents", "stopSendingEvents", "track", "_sendEvent", "_stopEvents", "_storeInCache", "_writeEventImgTag", "_writeImgTag", "events", "eventCache", "attachEvent", "detachEvent", "getText"],
                        functionsCoreOff = guidesCoreOff.concat(eventsCoreOff);
                    disableUnusedMethodsPendoCoreOff(functionsCoreOff)
                }
                _.each(["identify", "updateOptions", "pageLoad"], function (e) {
                    var t = pendo[e];
                    pendo[e] = function () {
                        try {
                            isReady() ? t.apply(this, arguments) : enqueueCall(e, arguments)
                        } catch (n) {
                            writeException(n)
                        }
                    }
                });
                var disableAutoInitialize = getPendoConfigValue("disableAutoInitialize");
                disableAutoInitialize || whenLoadedCall(autoInitialize)
            }
        }(), pendo.defaultLauncher('<div class="_pendo-launcher-content_" style="border-color:<%= data.color %>">\n    <div class="_pendo-launcher-header_">\n        <img src="<%= data.launcherBadgeUrl %>"/>\n        <div class="_pendo-launcher-title_"><%= data.title %></div>\n        <% if (data.enableSearch) { %>\n        <div class="_pendo-launcher-search-box_">\n        <input type="text" placeholder="Type here to start looking..." />\n        </div>\n        <% } %>\n    </div>\n    <div class="_pendo-launcher-guide-listing_">\n    <% pendo._.each(guides, function(guide) { %>\n        <div class="_pendo-launcher-item_" id="launcher-<%= guide.id %>">\n            <a href="javascript:void(0);"><%= guide.name %></a>\n        </div>\n    <% }) %>\n    </div>\n    <% if (hidePoweredBy) { %>\n    <div class="_pendo-launcher-footer_"></div>\n    <% } else { %>\n    <div class="_pendo-launcher-footer_ _pendo-launcher-footer-credits_">\n        <span>powered by pendo</span>\n    </div>\n    <% } %>\n</div>\n', function (obj) {
            obj || (obj = {});
            var __t, __p = "";
            Array.prototype.join;
            with(obj) __p += '<div class="_pendo-launcher-content_" style="border-color:' + (null == (__t = data.color) ? "" : __t) + '">\n    <div class="_pendo-launcher-header_">\n        <img src="' + (null == (__t = data.launcherBadgeUrl) ? "" : __t) + '"/>\n        <div class="_pendo-launcher-title_">' + (null == (__t = data.title) ? "" : __t) + "</div>\n        ", data.enableSearch && (__p += '\n        <div class="_pendo-launcher-search-box_">\n        <input type="text" placeholder="Type here to start looking..." />\n        </div>\n        '), __p += '\n    </div>\n    <div class="_pendo-launcher-guide-listing_">\n    ', pendo._.each(guides, function (e) {
                __p += '\n        <div class="_pendo-launcher-item_" id="launcher-' + (null == (__t = e.id) ? "" : __t) + '">\n            <a href="javascript:void(0);">' + (null == (__t = e.name) ? "" : __t) + "</a>\n        </div>\n    "
            }), __p += "\n    </div>\n    ", __p += hidePoweredBy ? '\n    <div class="_pendo-launcher-footer_"></div>\n    ' : '\n    <div class="_pendo-launcher-footer_ _pendo-launcher-footer-credits_">\n        <span>powered by pendo</span>\n    </div>\n    ', __p += "\n</div>\n";
            return __p
        }), windowOrMountPoint.pendo)
    }(window, document);
})({
    environmentName: "production",
    blockAgentMetadata: false,



    dataHost: "data.pendo.io",


    stagingServers: ["lens.devtempus.com", "lens.stagingtempus.com", "localtempus.com:3400"],
    stagingAgentUrl: "https://pendo-io-static.storage.googleapis.com/agent/static/09eba526-e986-4a33-7d35-52eae21832bd/pendo-staging.js",

    allowedOriginServers: [],


    adoptPrioritizeAdoptGuides: false,
    allowCrossOriginFrames: false,
    disableCookies: false,
    disableDesignerKeyboardShortcut: false,
    disableFeedbackAutoInit: false,
    disableGlobalCSS: false,
    disableGuidePseudoStyles: false,
    disablePersistence: false,
    enableDebugEvents: false,
    enableGuideTimeout: true,
    enableSignedMetadata: false,
    excludeAllText: false,
    frameIdentitySync: false,
    freeNPSData: false,
    guideValidation: false,
    localStorageOnly: false,
    pendoCore: true,
    pendoFeedback: false,
    preferBroadcastChannel: false,
    preferMutationObserver: false,
    preventCodeInjection: false,
    requireHTTPS: true,
    requireSignedMetadata: false,
    restrictP1Access: true,
    siblingSelectors: false,
    trainingPartner: false,
    guideSeenTimeoutLength: 0,
    xhrTimings: false,
    xhrWhitelist: null,
    htmlAttributeBlacklist: null,
    htmlAttributes: /^(tabindex|data-.*|data-element)$/i,
    apiKey: "09eba526-e986-4a33-7d35-52eae21832bd"
});
(function () {
    "undefined" != typeof pendo.addExtension && (function () {
        function e(e, n) {
            function t(e) {
                return d.push(e.uri()), e
            }

            function o(e) {
                if (!r.has(e, "uri")) return !1;
                var n = e.uri().cmds;
                return !!n.length
            }

            function i(e, n) {
                var t = null;
                return r.some(e, function (e) {
                    return r.some(e.cmds, function (e) {
                        if (e.cmd === n) return t = e, e
                    })
                }), t
            }

            function a(e, n, t, o) {
                var i = {
                    id: e,
                    response: o,
                    type: t
                };
                return n.postMessage(JSON.stringify(i), "*")
            }

            function s(t) {
                try {
                    var o = JSON.parse(t.data),
                        s = o.id,
                        c = isNaN(o.type) ? o.type : o.key,
                        u = t.source,
                        l = i(d, c);
                    if (l) return l.handler(e, n, o, u, r.partial(a, s, u, c))
                } catch (p) {}
            }
            var r = pendo._,
                d = [];
            e.registerExtensionsByUse("cmd", t, o), r.isFunction(window.addEventListener) ? window.addEventListener("message", s, !1) : window.attachEvent("message", s)
        }
        pendo.addExtension({
            name: "command",
            version: "1.0.1",
            type: "agent",
            use: "behavior",
            description: "adds command functionality to the agent",
            minAgentVersion: "2.13.0",
            uri: e
        })
    }(), function () {
        function e(e, n) {
            function t(e) {
                return s.create(e)
            }

            function o() {
                var n = e.filterExtensionsByUse("launcher");
                d.map(n, function (e) {
                    e.addExtension()
                })
            }

            function i(e, n, t, o) {
                r("#_pendo-launcher-ext-frame-" + e + "_").length || n.appendTo('[data-id="' + e + '"] ._pendo-launcher-extension-listing_')
            }

            function a(e, n, t, o) {
                var i = t.section + '[data-id="' + e + '"]';
                if (!r("." + i).length) {
                    var a = d.template('<div class="<%= classes.sectionHeader %>">   <div class="<%= classes.sectionTitle %>">       <%= labels.title %>   </div>   <button class="<%= classes.sectionBackButton %>" aria-label="back"></button></div><div class="<%= classes.sectionBody %>"></div>');
                    r("<div/>").addClass(t.section).attr("data-id", e).html(a({
                        classes: t,
                        labels: o
                    })).appendTo("." + t.body), n.appendTo("." + i + " ." + t.sectionBody)
                }
            }

            function s(e) {
                function n() {
                    return "" + (new Date).getTime()
                }

                function t(e, n) {
                    var t = r('[data-id="' + e + '"]');
                    return t.length ? t : null
                }

                function o(e, n, t) {
                    var o, i, a;
                    "accordion" === pendo.guideWidget.data.templateName ? (i = "_pendo-launcher-accordion_ _pendo-launcher-" + e + "_", a = "._pendo-launcher-body_", o = d.template("<button style=\"background-image: url('https://" + pendo.guideWidget.data.contentHostUrl + '/img/caret-collapsed.png\'); background-repeat: no-repeat; background-position: right 10px center;">   <%= labels.title %></button><div class="_pendo-launcher-extension-listing_"></div>')) : (i = n.menuItem, a = "." + n.menu, o = d.template('<button class="<%= classes.button %>">   <div class="<%= classes.buttonTitle %>">       <%= labels.title %>   </div>   <% if (labels.description) { %>       <div class="<%= classes.buttonDescription %>">           <%= labels.description %>       </div>   <% } %></button><div class="_pendo-launcher-item_" style="display:none"></div>'));
                    var s = r("<div/>").addClass(i).attr("data-id", e).html(o({
                        classes: n,
                        labels: t
                    })).appendTo(a);
                    return r("button", s)
                }
                this.data = e, this.use = "launcher", this.name = this.data.name, this.getName = function () {
                    return this.name
                }, this.getClasses = function () {
                    return {
                        menu: e.options.classes.menu || "_pendo-launcher-menu_",
                        menuItem: e.options.classes.menuItem || "_pendo-launcher-menu-item_",
                        button: e.options.classes.button || "_pendo-launcher-menu-item-button_",
                        buttonTitle: e.options.classes.buttonTitle || "_pendo-launcher-menu-item-title_",
                        buttonDescription: e.options.classes.buttonDescription || "_pendo-launcher-menu-item-description_",
                        body: e.options.classes.body || "_pendo-launcher-body_",
                        section: e.options.classes.section || "_pendo-launcher-section-content_",
                        sectionHeader: e.options.classes.sectionHeader || "_pendo-launcher-section-header_",
                        sectionTitle: e.options.classes.sectionTitle || "_pendo-launcher-section-title_",
                        sectionBody: e.options.classes.sectionDescription || "_pendo-launcher-section-body_",
                        sectionBackButton: e.options.classes.sectionBackButton || "_pendo-launcher-section-back-button_"
                    }
                }, this.getLabels = function () {
                    return {
                        title: this.data.options.labels.title || this.name,
                        description: this.data.options.labels.description
                    }
                }, this.getConfig = function () {
                    return this.data
                }, this.getFrame = function () {
                    if (!this.frame) {
                        var e = ["allow-forms", "allow-modals", "allow-pointer-lock", "allow-popups", "allow-popups-to-escape-sandbox", "allow-scripts", "allow-same-origin", "allow-top-navigation"];
                        this.frame = r("<iframe/>").css({
                            border: "none"
                        }).attr("id", "_pendo-launcher-ext-frame-" + this.getName() + "_" + n()).attr("src", this.data.uri).attr("width", "100%").attr("height", "100%").attr("sandbox", e.join(" "))
                    }
                    return this.frame
                }, this.addExtension = function () {
                    var e = this.getName(),
                        n = this.getClasses(),
                        i = this.getLabels();
                    if (this.trigger = t(e, n) || o(e, n, i), !this.trigger.attr("data-rendered")) {
                        if ("chat" === e) return this.trigger.attr("data-rendered", "true"), this.launchExtension();
                        this.trigger.on("click", d.bind(this.launchExtension, this)), this.trigger.attr("data-rendered", "true")
                    }
                }, this.launchExtension = function () {
                    var e = this.getFrame(),
                        n = this.getName(),
                        t = this.getClasses(),
                        o = this.getLabels();
                    return "accordion" === pendo.guideWidget.data.templateName ? i(n, e, t, o) : a(n, e, t, o)
                }
            }
            var r = pendo.dom,
                d = pendo._;
            e.registerExtensionsByUse("launcher", t), n.Launcher.addBehavior(function () {
                return this.after("updateLauncherContent", o), this
            }), s.create = function (e) {
                return new s(e)
            }
        }
        pendo.addExtension({
            name: "launcher",
            version: "1.0.0",
            type: "agent",
            use: "behavior",
            description: "adds launcher behavior functionality to agent",
            minAgentVersion: "2.13.0",
            uri: e
        })
    }(), function () {
        function e(e, i, a, s, r) {
            r({
                browser: {
                    cookies: n(e, i, a, s),
                    env: t(e, i, a, s),
                    url: o(e, i, a, s)
                }
            })
        }

        function n(e, n, t, o, i) {
            i({
                cookies: document.cookie
            })
        }

        function t(e, n, t, o, i) {
            i({
                env: pendo.ENV
            })
        }

        function o(e, n, t, o, i) {
            var a = pendo.url.externalizeURL();
            "listen" === t.type && pendo.url.watch(function () {
                i({
                    url: a
                })
            }), i({
                url: a
            })
        }
        pendo.addExtension({
            name: "browser",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "browser",
                        handler: e
                    }, {
                        cmd: "browser.cookies",
                        handler: n
                    }, {
                        cmd: "browser.env",
                        handler: t
                    }, {
                        cmd: "browser.url",
                        handler: o
                    }]
                }
            }
        })
    }(), function () {
        function e(e, n, t, o, i) {
            function a(e, n) {
                if (!document.getElementById(e)) {
                    var t = document.createElement("div");
                    t.innerHTML = '<p>pendo</p><style id="' + e + '" type="text/css">' + n + "</style>", document.getElementsByTagName("head")[0].appendChild(t.childNodes[1])
                }
            }

            function s(e, n) {
                v(e).css({
                    webkitTransform: n,
                    mozTransform: n,
                    msTransform: n,
                    oTransform: n,
                    transform: n,
                    cursor: "zoom-out"
                }), "" === n && v(e).css({
                    "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                    filter: "alpha(opacity=0)",
                    opacity: 0,
                    cursor: "default"
                })
            }

            function r() {
                pendo.attachEvent(window, "scroll", f), pendo.attachEvent(window, "resize", f), pendo.attachEvent(document, "click", c)
            }

            function d() {
                pendo.detachEvent(document, "click", c), pendo.detachEvent(window, "scroll", f), pendo.detachEvent(window, "resize", f)
            }

            function c(e) {
                return e.metaKey || e.ctrlKey ? void window.open(e.target.src, "_blank") : (e.preventDefault(), void f())
            }

            function u() {
                a("_pendo-ext-zoom-styles_", x);
                var e = document.createElement(k.type.toLowerCase());
                v(e).addClass("_pendo-ext-zoom-content_").css({
                    cursor: "progress",
                    width: k.width + "px",
                    transition: "all " + C + "ms"
                }).on("load", h).attr("src", k.src), B = e, r(), p()
            }

            function l() {
                var e = n.Util.getOffsetPosition(v("#_pendo-launcher-ext-frame-helpcenter_")[0]),
                    t = e.top + k.top,
                    o = e.left + k.left;
                return {
                    top: t + n.Util.documentScrollTop(),
                    left: o + n.Util.documentScrollLeft()
                }
            }

            function p() {
                N = v("<div/>").addClass("_pendo-ext-zoom-container_").css({
                    cursor: "progress",
                    top: l().top + "px",
                    left: l().left + "px",
                    transition: "all " + C + "ms"
                }).append(B).appendTo(v.getBody()), z = v("<div/>").addClass("_pendo-ext-zoom-overlay_").css({
                    transition: "all " + C + "ms"
                }).appendTo(v.getBody())
            }

            function m() {
                var e = null,
                    n = B.naturalWidth,
                    t = B.naturalHeight,
                    o = n / k.width,
                    i = window.innerHeight - E,
                    a = window.innerWidth - E,
                    s = n / t,
                    r = a / i;
                return e = n < a && t < i ? o : s < r ? i / t * o : a / n * o
            }

            function h() {
                var e = n.Util.getOffsetPosition(B),
                    t = window.innerWidth / 2,
                    o = window.pageYOffset + window.innerHeight / 2,
                    i = e.left + B.width / 2,
                    a = e.top + B.height / 2,
                    r = Math.round(t - i),
                    d = Math.round(o - a),
                    c = "scale(" + m() + ")",
                    u = "translate(" + r + "px, " + d + "px) translateZ(0)";
                s(B, c), s(N, u), z.addClass("_pendo-ext-zoom-overlay-active_")
            }

            function f() {
                d(), s(B, ""), s(N, ""), z.removeClass("_pendo-ext-zoom-overlay-active_").css({
                    cursor: "default"
                }), setTimeout(function () {
                    g()
                }, C)
            }

            function g() {
                B && (v(B).css({
                    width: null
                }), pendo._.each([B, N, z], function (e) {
                    v(e).remove()
                }), B = null)
            }
            var v = pendo.dom,
                _ = ["IMG", "PICTURE"];
            if (pendo._.indexOf(_, t.data.type) !== -1) {
                var y = "._pendo-ext-zoom-container_{position:absolute;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);filter:alpha(opacity=100);opacity:1;z-index:300002}",
                    b = "._pendo-ext-zoom-content_{position:relative;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=1);filter:alpha(opacity=100);opacity:1;max-height:none;max-width:none;height:auto;}",
                    w = "._pendo-ext-zoom-overlay_{background-color:#fff;position:fixed;top:0;bottom:0;left:0;right:0;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);filter:alpha(opacity=0);opacity:0;z-index:300001;cursor:progress;}._pendo-ext-zoom-overlay_._pendo-ext-zoom-overlay-active_{-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=85);filter:alpha(opacity=85);opacity:0.85;cursor:zoom-out;}",
                    x = y + b + w,
                    k = t.data,
                    T = k.options || {},
                    C = T.transitionDuration || 300,
                    E = T.margin || 80,
                    B = null,
                    N = null,
                    z = null;
                return u()
            }
        }
        pendo.addExtension({
            name: "content",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "content.zoom",
                        handler: e
                    }]
                }
            }
        })
    }(), function () {
        function e(e, n, t, o, i) {
            pendo.dom('._pendo-launcher_ ._pendo-launcher-menu-item_[data-id="' + t.data + '"]').on("click", function () {
                return i()
            })
        }

        function n(e, n, t, o, i) {
            pendo.dom("._pendo-launcher-badge_").on("click", i)
        }
        pendo.addExtension({
            name: "events",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "events.onMenuItemClick",
                        handler: e
                    }, {
                        cmd: "events.onToggleClick",
                        handler: n
                    }]
                }
            }
        })
    }(), function () {
        function e(e, o, i, a, s) {
            s({
                extension: {
                    config: n(e, o, i, a, s),
                    stylesheet: t(e, o, i, a, s)
                }
            })
        }

        function n(e, n, t, o, i) {
            var a = e.findExtensionByTag(t.tag),
                s = a.getConfig();
            i({
                config: s
            })
        }

        function t(e, n, t, o, i) {
            var a = e.findExtensionByTag(t.tag),
                s = a.getConfig(),
                r = s.options.stylesheet;
            i({
                stylesheet: r
            })
        }
        pendo.addExtension({
            name: "extension",
            version: "1.1.1",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "extension",
                        handler: e
                    }, {
                        cmd: "extension.config",
                        handler: n
                    }, {
                        cmd: "extension.stylesheet",
                        handler: t
                    }]
                }
            }
        })
    }(), function () {
        function e(e, t, o, i, a) {
            a({
                feedback: {
                    settings: n(e, t, o, i, a)
                }
            })
        }

        function n(e, n, t, o, i) {
            var a = pendo.getFeedbackSettings();
            i({
                settings: a
            })
        }
        pendo.addExtension({
            name: "feedback",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.71.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "feedback",
                        handler: e
                    }, {
                        cmd: "feedback.settings",
                        handler: n
                    }]
                }
            }
        })
    }(), function () {
        function e(e, n, t, o, i) {
            e.tagExtension(t.data, t.tag)
        }
        pendo.addExtension({
            name: "init",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "init",
                        handler: e
                    }]
                }
            }
        })
    }(), function () {
        function e(e, n, t, o, i) {
            var a = n.Metadata.getMetadata();
            i({
                metadata: a
            })
        }
        pendo.addExtension({
            name: "metadata",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "metadata",
                        handler: e
                    }]
                }
            }
        })
    }(), function () {
        function e(e, t, o, i, a) {
            var s = {},
                r = {};
            if (pendo.guides) {
                r = n();
                for (var d in r) r.hasOwnProperty(d) && (s[d] = r[d]);
                return a({
                    pendoContext: s
                })
            }
            return pendo.events.guidesLoaded(function () {
                r = n();
                for (var e in r) r.hasOwnProperty(e) && (s[e] = r[e]);
                a({
                    pendoContext: s
                })
            })
        }

        function n() {
            var e = window.pendo.BuildingBlocks && window.pendo.BuildingBlocks.BuildingBlockResourceCenter && window.pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter && window.pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter();
            return {
                isResourceCenter: !!e,
                isResourceCenterVisible: e && e.isShown()
            }
        }
        pendo.addExtension({
            name: "pendoContext",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.17.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "pendoContext",
                        handler: e
                    }]
                }
            }
        })
    }(), function () {
        function e(e, t, o, i, a) {
            a({
                subscription: {
                    key: n(e, t, o, i, a)
                }
            })
        }

        function n(e, n, t, o, i) {
            var a = pendo.apiKey;
            i({
                key: a
            })
        }
        pendo.addExtension({
            name: "subscription",
            version: "1.0.0",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "subscription",
                        handler: e
                    }, {
                        cmd: "subscription.key",
                        handler: n
                    }]
                }
            }
        })
    }(), function () {
        function e(e, n, t, o, i) {
            return pendo.toggleLauncher()
        }

        function n(e, n, t, o, i) {
            return document.querySelector('[data-id="' + t.data + '"] ._pendo-launcher-section-back-button_').click()
        }

        function t(e, n, t, o, i) {
            var a = pendo.dom,
                s = t.data.height,
                r = a('[data-id="' + t.data.clientType + '"] ._pendo-launcher-section-header_');
            0 === s ? r.css({
                display: "none"
            }) : r.css({
                height: s
            }), a("._pendo-launcher_ ._pendo-close-guide_").css({
                display: "none"
            }), a('[data-id="' + t.data.clientType + '"] ._pendo-launcher-section-body_').css({
                top: s
            })
        }

        function o(e, n, t, o, i) {
            function a(e) {
                var n = u.whatsnew.unseenCount,
                    t = e + n;
                return 0 === t ? c("._pendo-launcher-whatsnew-count_").html("").css({
                    display: "none"
                }) : (p = c("._pendo-launcher-badge_ > ._pendo-launcher-whatsnew-count_"), p.css({
                    display: "inline-block"
                }).html(t), h.html(e), void pendo.guideWidget.after("update", function () {
                    n !== u.whatsnew.unseenCount && (n = u.whatsnew.unseenCount, t = e + n, p.html(t > 0 ? t : "").css({
                        display: t ? "inline-block" : "none"
                    }))
                }))
            }

            function s(e) {
                if (p = c("<div/>").addClass("_pendo-launcher-whatsnew-count_"), "element" === u.launchType) p.appendTo(u.launchElement);
                else {
                    var n = c("._pendo-launcher-badge_");
                    n.length > 0 && n[0] && /^img$/i.test(n[0].nodeName) && (c("<div>").addClass(n[0].className).append(n[0]).appendTo(c.getBody()), n[0].className = "", p.appendTo(c("._pendo-launcher-badge_")))
                }
                return c("._pendo-launcher-whatsnew-count_").html(m > 0 ? m : "").css({
                    display: m ? "inline-block" : "none"
                })
            }
            var r, d = pendo._,
                c = pendo.dom,
                u = pendo.guideWidget.data,
                l = pendo.BuildingBlocks;
            l && (r = l.BuildingBlockResourceCenter);
            var p, m = Number(d.escape(t.data.count));
            d.isNaN(m) && (m = 0);
            var h = c('[data-id="' + t.data.clientType + '"] ._pendo-launcher-whatsnew-count_');
            return r && r.getResourceCenter && r.getResourceCenter() ? void(d.isFunction(r.updateNotificationBubbleCount) && r.updateNotificationBubbleCount(m, t.data.clientType)) : (h.length || (h = c("<span/>").addClass("_pendo-launcher-whatsnew-count_").html(m).appendTo(c('[data-id="' + t.data.clientType + '"] ._pendo-launcher-menu-item-button_'))), h.css({
                display: m ? "inline-block" : "none",
                top: 0,
                bottom: 0,
                right: "50px",
                margin: "auto"
            }), u.whatsnew.enabled ? a(m) : s(m))
        }

        function i(e, n, t, o, i) {
            var c = pendo.dom,
                u = t.data.sender || "",
                l = t.data.preview || "New notification",
                p = c("._pendo-launcher-badge_"),
                m = 1e4,
                h = a(u).appendTo(p);
            s(u, l).appendTo(h);
            var f = r(h, m);
            d(h, p, function () {
                f()
            }, m)
        }

        function a(e) {
            var n = pendo.dom,
                t = "launcher-notification-preview",
                o = n("#" + t);
            return o.length > 0 ? o.css({
                opacity: "1"
            }).html("") : n('<div id="' + t + '">').addClass(["_pendo-launcher-notification-preview_", e].join(" ").trim()).css({
                position: "absolute",
                top: "-82px",
                left: "-325px",
                height: "100px",
                width: "300px",
                padding: "10px",
                verticalAlign: "bottom",
                boxShadow: "0px 2px 3px #888",
                borderRadius: "8px",
                borderTop: "1px solid #ccc",
                backgroundColor: "#fff"
            })
        }

        function s(e, n) {
            var t = pendo.dom,
                o = n + "" + (e ? " from " + e : "");
            return t("<div>").text(o)
        }

        function r(e, n) {
            var t = pendo.dom;
            if (n) {
                var o = setTimeout(function () {
                    r(e)
                }, n);
                return function () {
                    clearTimeout(o)
                }
            }
            t(e).remove()
        }

        function d(e, n, t, o) {
            c(n, "click", function () {
                r(e), t && t()
            }, o)
        }

        function c(e, n, t, o) {
            var i = pendo.dom,
                a = pendo.attachEvent,
                s = pendo.detachEvent;
            if (0 !== i(e).length) {
                var r = function () {
                        s(e[0], "click", d)
                    },
                    d = function () {
                        t(), r(), setTimeout(r, o)
                    };
                a(e[0], "click", d)
            }
        }
        pendo.addExtension({
            name: "triggers",
            version: "1.1.1",
            type: "agent",
            use: "cmd",
            minAgentVersion: "2.13.0",
            uri: function () {
                return {
                    cmds: [{
                        cmd: "triggers.toggleLauncher",
                        handler: e
                    }, {
                        cmd: "triggers.returnToMenu",
                        handler: n
                    }, {
                        cmd: "triggers.resizeHeader",
                        handler: t
                    }, {
                        cmd: "triggers.updateNotificationBadge",
                        handler: o
                    }, {
                        cmd: "triggers.notification",
                        handler: i
                    }]
                }
            }
        })
    }())
})();
(function () {
    "undefined" != typeof pendo.addExtension && (function () {
        pendo.addExtension({
            "environment": "production",
            "minAgentVersion": "2.13.0",
            "name": "helpcenter",
            "options": {
                "resultCount": 5,
                "labels": {
                    "title": "Help Center",
                    "description": "Search for articles..."
                },
                "suggestions": {
                    "enabled": true,
                    "path": 1,
                    "combineSuggestionPaths": false
                },
                "classes": {
                    "menu": "_pendo-launcher-menu_",
                    "body": "_pendo-launcher-body_",
                    "menuItem": "_pendo-launcher-menu-item_",
                    "button": "_pendo-launcher-menu-item-button_",
                    "buttonTitle": "_pendo-launcher-menu-item-title_",
                    "buttonDescription": "_pendo-launcher-menu-item-description_",
                    "section": "_pendo-launcher-section-content_",
                    "sectionHeader": "_pendo-launcher-section-header_",
                    "sectionTitle": "_pendo-launcher-section-title_",
                    "sectionBody": "_pendo-launcher-section-body_",
                    "sectionBackButton": "_pendo-launcher-section-back-button_"
                },
                "stylesheet": ""
            },
            "provider": {
                "name": "zendesk",
                "options": {
                    "subdomain": "helpdesk.tempus.com",
                    "token": "E4JJlwgGuSBmDbP7FRI5N60FmF0cd0aGby7tlShr/token"
                }
            },
            "type": "agent",
            "use": "launcher",
            "uri": "https://pendo-io-extensions.storage.googleapis.com/extensions/helpcenter/latest/index.html",
            "version": "1.4.7"
        })
    }());
}());

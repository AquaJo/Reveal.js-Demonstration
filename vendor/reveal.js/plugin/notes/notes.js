!(function (e, n) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = n())
        : 'function' == typeof define && define.amd
          ? define(n)
          : ((e =
                'undefined' != typeof globalThis
                    ? globalThis
                    : e || self).RevealNotes = n())
})(this, function () {
    'use strict'
    function e() {
        return {
            async: !1,
            baseUrl: null,
            breaks: !1,
            extensions: null,
            gfm: !0,
            headerIds: !0,
            headerPrefix: '',
            highlight: null,
            hooks: null,
            langPrefix: 'language-',
            mangle: !0,
            pedantic: !1,
            renderer: null,
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartypants: !1,
            tokenizer: null,
            walkTokens: null,
            xhtml: !1,
        }
    }
    let n = {
        async: !1,
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: '',
        highlight: null,
        hooks: null,
        langPrefix: 'language-',
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1,
    }
    const t = /[&<>"']/,
        r = new RegExp(t.source, 'g'),
        i = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        s = new RegExp(i.source, 'g'),
        a = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        },
        o = (e) => a[e]
    function l(e, n) {
        if (n) {
            if (t.test(e)) return e.replace(r, o)
        } else if (i.test(e)) return e.replace(s, o)
        return e
    }
    const c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
    function p(e) {
        return e.replace(c, (e, n) =>
            'colon' === (n = n.toLowerCase())
                ? ':'
                : '#' === n.charAt(0)
                  ? 'x' === n.charAt(1)
                      ? String.fromCharCode(parseInt(n.substring(2), 16))
                      : String.fromCharCode(+n.substring(1))
                  : ''
        )
    }
    const u = /(^|[^\[])\^/g
    function d(e, n) {
        ;(e = 'string' == typeof e ? e : e.source), (n = n || '')
        const t = {
            replace: (n, r) => (
                (r = (r = r.source || r).replace(u, '$1')),
                (e = e.replace(n, r)),
                t
            ),
            getRegex: () => new RegExp(e, n),
        }
        return t
    }
    const h = /[^\w:]/g,
        g = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
    function m(e, n, t) {
        if (e) {
            let e
            try {
                e = decodeURIComponent(p(t)).replace(h, '').toLowerCase()
            } catch (e) {
                return null
            }
            if (
                0 === e.indexOf('javascript:') ||
                0 === e.indexOf('vbscript:') ||
                0 === e.indexOf('data:')
            )
                return null
        }
        n &&
            !g.test(t) &&
            (t = (function (e, n) {
                f[' ' + e] ||
                    (k.test(e)
                        ? (f[' ' + e] = e + '/')
                        : (f[' ' + e] = v(e, '/', !0)))
                e = f[' ' + e]
                const t = -1 === e.indexOf(':')
                return '//' === n.substring(0, 2)
                    ? t
                        ? n
                        : e.replace(w, '$1') + n
                    : '/' === n.charAt(0)
                      ? t
                          ? n
                          : e.replace(b, '$1') + n
                      : e + n
            })(n, t))
        try {
            t = encodeURI(t).replace(/%25/g, '%')
        } catch (e) {
            return null
        }
        return t
    }
    const f = {},
        k = /^[^:]+:\/*[^/]*$/,
        w = /^([^:]+:)[\s\S]*$/,
        b = /^([^:]+:\/*[^/]*)[\s\S]*$/
    const x = { exec: function () {} }
    function y(e, n) {
        const t = e
            .replace(/\|/g, (e, n, t) => {
                let r = !1,
                    i = n
                for (; --i >= 0 && '\\' === t[i]; ) r = !r
                return r ? '|' : ' |'
            })
            .split(/ \|/)
        let r = 0
        if (
            (t[0].trim() || t.shift(),
            t.length > 0 && !t[t.length - 1].trim() && t.pop(),
            t.length > n)
        )
            t.splice(n)
        else for (; t.length < n; ) t.push('')
        for (; r < t.length; r++) t[r] = t[r].trim().replace(/\\\|/g, '|')
        return t
    }
    function v(e, n, t) {
        const r = e.length
        if (0 === r) return ''
        let i = 0
        for (; i < r; ) {
            const s = e.charAt(r - i - 1)
            if (s !== n || t) {
                if (s === n || !t) break
                i++
            } else i++
        }
        return e.slice(0, r - i)
    }
    function S(e, n) {
        if (n < 1) return ''
        let t = ''
        for (; n > 1; ) 1 & n && (t += e), (n >>= 1), (e += e)
        return t + e
    }
    function T(e, n, t, r) {
        const i = n.href,
            s = n.title ? l(n.title) : null,
            a = e[1].replace(/\\([\[\]])/g, '$1')
        if ('!' !== e[0].charAt(0)) {
            r.state.inLink = !0
            const e = {
                type: 'link',
                raw: t,
                href: i,
                title: s,
                text: a,
                tokens: r.inlineTokens(a),
            }
            return (r.state.inLink = !1), e
        }
        return { type: 'image', raw: t, href: i, title: s, text: l(a) }
    }
    class _ {
        constructor(e) {
            this.options = e || n
        }
        space(e) {
            const n = this.rules.block.newline.exec(e)
            if (n && n[0].length > 0) return { type: 'space', raw: n[0] }
        }
        code(e) {
            const n = this.rules.block.code.exec(e)
            if (n) {
                const e = n[0].replace(/^ {1,4}/gm, '')
                return {
                    type: 'code',
                    raw: n[0],
                    codeBlockStyle: 'indented',
                    text: this.options.pedantic ? e : v(e, '\n'),
                }
            }
        }
        fences(e) {
            const n = this.rules.block.fences.exec(e)
            if (n) {
                const e = n[0],
                    t = (function (e, n) {
                        const t = e.match(/^(\s+)(?:```)/)
                        if (null === t) return n
                        const r = t[1]
                        return n
                            .split('\n')
                            .map((e) => {
                                const n = e.match(/^\s+/)
                                if (null === n) return e
                                const [t] = n
                                return t.length >= r.length
                                    ? e.slice(r.length)
                                    : e
                            })
                            .join('\n')
                    })(e, n[3] || '')
                return {
                    type: 'code',
                    raw: e,
                    lang: n[2]
                        ? n[2].trim().replace(this.rules.inline._escapes, '$1')
                        : n[2],
                    text: t,
                }
            }
        }
        heading(e) {
            const n = this.rules.block.heading.exec(e)
            if (n) {
                let e = n[2].trim()
                if (/#$/.test(e)) {
                    const n = v(e, '#')
                    this.options.pedantic
                        ? (e = n.trim())
                        : (n && !/ $/.test(n)) || (e = n.trim())
                }
                return {
                    type: 'heading',
                    raw: n[0],
                    depth: n[1].length,
                    text: e,
                    tokens: this.lexer.inline(e),
                }
            }
        }
        hr(e) {
            const n = this.rules.block.hr.exec(e)
            if (n) return { type: 'hr', raw: n[0] }
        }
        blockquote(e) {
            const n = this.rules.block.blockquote.exec(e)
            if (n) {
                const e = n[0].replace(/^ *>[ \t]?/gm, ''),
                    t = this.lexer.state.top
                this.lexer.state.top = !0
                const r = this.lexer.blockTokens(e)
                return (
                    (this.lexer.state.top = t),
                    { type: 'blockquote', raw: n[0], tokens: r, text: e }
                )
            }
        }
        list(e) {
            let n = this.rules.block.list.exec(e)
            if (n) {
                let t,
                    r,
                    i,
                    s,
                    a,
                    o,
                    l,
                    c,
                    p,
                    u,
                    d,
                    h,
                    g = n[1].trim()
                const m = g.length > 1,
                    f = {
                        type: 'list',
                        raw: '',
                        ordered: m,
                        start: m ? +g.slice(0, -1) : '',
                        loose: !1,
                        items: [],
                    }
                ;(g = m ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`),
                    this.options.pedantic && (g = m ? g : '[*+-]')
                const k = new RegExp(
                    `^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`
                )
                for (
                    ;
                    e &&
                    ((h = !1), (n = k.exec(e))) &&
                    !this.rules.block.hr.test(e);

                ) {
                    if (
                        ((t = n[0]),
                        (e = e.substring(t.length)),
                        (c = n[2]
                            .split('\n', 1)[0]
                            .replace(/^\t+/, (e) => ' '.repeat(3 * e.length))),
                        (p = e.split('\n', 1)[0]),
                        this.options.pedantic
                            ? ((s = 2), (d = c.trimLeft()))
                            : ((s = n[2].search(/[^ ]/)),
                              (s = s > 4 ? 1 : s),
                              (d = c.slice(s)),
                              (s += n[1].length)),
                        (o = !1),
                        !c &&
                            /^ *$/.test(p) &&
                            ((t += p + '\n'),
                            (e = e.substring(p.length + 1)),
                            (h = !0)),
                        !h)
                    ) {
                        const n = new RegExp(
                                `^ {0,${Math.min(3, s - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`
                            ),
                            r = new RegExp(
                                `^ {0,${Math.min(3, s - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
                            ),
                            i = new RegExp(
                                `^ {0,${Math.min(3, s - 1)}}(?:\`\`\`|~~~)`
                            ),
                            a = new RegExp(`^ {0,${Math.min(3, s - 1)}}#`)
                        for (
                            ;
                            e &&
                            ((u = e.split('\n', 1)[0]),
                            (p = u),
                            this.options.pedantic &&
                                (p = p.replace(
                                    /^ {1,4}(?=( {4})*[^ ])/g,
                                    '  '
                                )),
                            !i.test(p)) &&
                            !a.test(p) &&
                            !n.test(p) &&
                            !r.test(e);

                        ) {
                            if (p.search(/[^ ]/) >= s || !p.trim())
                                d += '\n' + p.slice(s)
                            else {
                                if (o) break
                                if (c.search(/[^ ]/) >= 4) break
                                if (i.test(c)) break
                                if (a.test(c)) break
                                if (r.test(c)) break
                                d += '\n' + p
                            }
                            o || p.trim() || (o = !0),
                                (t += u + '\n'),
                                (e = e.substring(u.length + 1)),
                                (c = p.slice(s))
                        }
                    }
                    f.loose ||
                        (l ? (f.loose = !0) : /\n *\n *$/.test(t) && (l = !0)),
                        this.options.gfm &&
                            ((r = /^\[[ xX]\] /.exec(d)),
                            r &&
                                ((i = '[ ] ' !== r[0]),
                                (d = d.replace(/^\[[ xX]\] +/, '')))),
                        f.items.push({
                            type: 'list_item',
                            raw: t,
                            task: !!r,
                            checked: i,
                            loose: !1,
                            text: d,
                        }),
                        (f.raw += t)
                }
                ;(f.items[f.items.length - 1].raw = t.trimRight()),
                    (f.items[f.items.length - 1].text = d.trimRight()),
                    (f.raw = f.raw.trimRight())
                const w = f.items.length
                for (a = 0; a < w; a++)
                    if (
                        ((this.lexer.state.top = !1),
                        (f.items[a].tokens = this.lexer.blockTokens(
                            f.items[a].text,
                            []
                        )),
                        !f.loose)
                    ) {
                        const e = f.items[a].tokens.filter(
                                (e) => 'space' === e.type
                            ),
                            n =
                                e.length > 0 &&
                                e.some((e) => /\n.*\n/.test(e.raw))
                        f.loose = n
                    }
                if (f.loose) for (a = 0; a < w; a++) f.items[a].loose = !0
                return f
            }
        }
        html(e) {
            const n = this.rules.block.html.exec(e)
            if (n) {
                const e = {
                    type: 'html',
                    raw: n[0],
                    pre:
                        !this.options.sanitizer &&
                        ('pre' === n[1] ||
                            'script' === n[1] ||
                            'style' === n[1]),
                    text: n[0],
                }
                if (this.options.sanitize) {
                    const t = this.options.sanitizer
                        ? this.options.sanitizer(n[0])
                        : l(n[0])
                    ;(e.type = 'paragraph'),
                        (e.text = t),
                        (e.tokens = this.lexer.inline(t))
                }
                return e
            }
        }
        def(e) {
            const n = this.rules.block.def.exec(e)
            if (n) {
                const e = n[1].toLowerCase().replace(/\s+/g, ' '),
                    t = n[2]
                        ? n[2]
                              .replace(/^<(.*)>$/, '$1')
                              .replace(this.rules.inline._escapes, '$1')
                        : '',
                    r = n[3]
                        ? n[3]
                              .substring(1, n[3].length - 1)
                              .replace(this.rules.inline._escapes, '$1')
                        : n[3]
                return { type: 'def', tag: e, raw: n[0], href: t, title: r }
            }
        }
        table(e) {
            const n = this.rules.block.table.exec(e)
            if (n) {
                const e = {
                    type: 'table',
                    header: y(n[1]).map((e) => ({ text: e })),
                    align: n[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    rows:
                        n[3] && n[3].trim()
                            ? n[3].replace(/\n[ \t]*$/, '').split('\n')
                            : [],
                }
                if (e.header.length === e.align.length) {
                    e.raw = n[0]
                    let t,
                        r,
                        i,
                        s,
                        a = e.align.length
                    for (t = 0; t < a; t++)
                        /^ *-+: *$/.test(e.align[t])
                            ? (e.align[t] = 'right')
                            : /^ *:-+: *$/.test(e.align[t])
                              ? (e.align[t] = 'center')
                              : /^ *:-+ *$/.test(e.align[t])
                                ? (e.align[t] = 'left')
                                : (e.align[t] = null)
                    for (a = e.rows.length, t = 0; t < a; t++)
                        e.rows[t] = y(e.rows[t], e.header.length).map((e) => ({
                            text: e,
                        }))
                    for (a = e.header.length, r = 0; r < a; r++)
                        e.header[r].tokens = this.lexer.inline(e.header[r].text)
                    for (a = e.rows.length, r = 0; r < a; r++)
                        for (s = e.rows[r], i = 0; i < s.length; i++)
                            s[i].tokens = this.lexer.inline(s[i].text)
                    return e
                }
            }
        }
        lheading(e) {
            const n = this.rules.block.lheading.exec(e)
            if (n)
                return {
                    type: 'heading',
                    raw: n[0],
                    depth: '=' === n[2].charAt(0) ? 1 : 2,
                    text: n[1],
                    tokens: this.lexer.inline(n[1]),
                }
        }
        paragraph(e) {
            const n = this.rules.block.paragraph.exec(e)
            if (n) {
                const e =
                    '\n' === n[1].charAt(n[1].length - 1)
                        ? n[1].slice(0, -1)
                        : n[1]
                return {
                    type: 'paragraph',
                    raw: n[0],
                    text: e,
                    tokens: this.lexer.inline(e),
                }
            }
        }
        text(e) {
            const n = this.rules.block.text.exec(e)
            if (n)
                return {
                    type: 'text',
                    raw: n[0],
                    text: n[0],
                    tokens: this.lexer.inline(n[0]),
                }
        }
        escape(e) {
            const n = this.rules.inline.escape.exec(e)
            if (n) return { type: 'escape', raw: n[0], text: l(n[1]) }
        }
        tag(e) {
            const n = this.rules.inline.tag.exec(e)
            if (n)
                return (
                    !this.lexer.state.inLink && /^<a /i.test(n[0])
                        ? (this.lexer.state.inLink = !0)
                        : this.lexer.state.inLink &&
                          /^<\/a>/i.test(n[0]) &&
                          (this.lexer.state.inLink = !1),
                    !this.lexer.state.inRawBlock &&
                    /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
                        ? (this.lexer.state.inRawBlock = !0)
                        : this.lexer.state.inRawBlock &&
                          /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
                          (this.lexer.state.inRawBlock = !1),
                    {
                        type: this.options.sanitize ? 'text' : 'html',
                        raw: n[0],
                        inLink: this.lexer.state.inLink,
                        inRawBlock: this.lexer.state.inRawBlock,
                        text: this.options.sanitize
                            ? this.options.sanitizer
                                ? this.options.sanitizer(n[0])
                                : l(n[0])
                            : n[0],
                    }
                )
        }
        link(e) {
            const n = this.rules.inline.link.exec(e)
            if (n) {
                const e = n[2].trim()
                if (!this.options.pedantic && /^</.test(e)) {
                    if (!/>$/.test(e)) return
                    const n = v(e.slice(0, -1), '\\')
                    if ((e.length - n.length) % 2 == 0) return
                } else {
                    const e = (function (e, n) {
                        if (-1 === e.indexOf(n[1])) return -1
                        const t = e.length
                        let r = 0,
                            i = 0
                        for (; i < t; i++)
                            if ('\\' === e[i]) i++
                            else if (e[i] === n[0]) r++
                            else if (e[i] === n[1] && (r--, r < 0)) return i
                        return -1
                    })(n[2], '()')
                    if (e > -1) {
                        const t =
                            (0 === n[0].indexOf('!') ? 5 : 4) + n[1].length + e
                        ;(n[2] = n[2].substring(0, e)),
                            (n[0] = n[0].substring(0, t).trim()),
                            (n[3] = '')
                    }
                }
                let t = n[2],
                    r = ''
                if (this.options.pedantic) {
                    const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(t)
                    e && ((t = e[1]), (r = e[3]))
                } else r = n[3] ? n[3].slice(1, -1) : ''
                return (
                    (t = t.trim()),
                    /^</.test(t) &&
                        (t =
                            this.options.pedantic && !/>$/.test(e)
                                ? t.slice(1)
                                : t.slice(1, -1)),
                    T(
                        n,
                        {
                            href: t
                                ? t.replace(this.rules.inline._escapes, '$1')
                                : t,
                            title: r
                                ? r.replace(this.rules.inline._escapes, '$1')
                                : r,
                        },
                        n[0],
                        this.lexer
                    )
                )
            }
        }
        reflink(e, n) {
            let t
            if (
                (t = this.rules.inline.reflink.exec(e)) ||
                (t = this.rules.inline.nolink.exec(e))
            ) {
                let e = (t[2] || t[1]).replace(/\s+/g, ' ')
                if (((e = n[e.toLowerCase()]), !e)) {
                    const e = t[0].charAt(0)
                    return { type: 'text', raw: e, text: e }
                }
                return T(t, e, t[0], this.lexer)
            }
        }
        emStrong(e, n, t = '') {
            let r = this.rules.inline.emStrong.lDelim.exec(e)
            if (!r) return
            if (r[3] && t.match(/[\p{L}\p{N}]/u)) return
            const i = r[1] || r[2] || ''
            if (
                !i ||
                (i && ('' === t || this.rules.inline.punctuation.exec(t)))
            ) {
                const t = r[0].length - 1
                let i,
                    s,
                    a = t,
                    o = 0
                const l =
                    '*' === r[0][0]
                        ? this.rules.inline.emStrong.rDelimAst
                        : this.rules.inline.emStrong.rDelimUnd
                for (
                    l.lastIndex = 0, n = n.slice(-1 * e.length + t);
                    null != (r = l.exec(n));

                ) {
                    if (
                        ((i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]), !i)
                    )
                        continue
                    if (((s = i.length), r[3] || r[4])) {
                        a += s
                        continue
                    }
                    if ((r[5] || r[6]) && t % 3 && !((t + s) % 3)) {
                        o += s
                        continue
                    }
                    if (((a -= s), a > 0)) continue
                    s = Math.min(s, s + a + o)
                    const n = e.slice(
                        0,
                        t + r.index + (r[0].length - i.length) + s
                    )
                    if (Math.min(t, s) % 2) {
                        const e = n.slice(1, -1)
                        return {
                            type: 'em',
                            raw: n,
                            text: e,
                            tokens: this.lexer.inlineTokens(e),
                        }
                    }
                    const l = n.slice(2, -2)
                    return {
                        type: 'strong',
                        raw: n,
                        text: l,
                        tokens: this.lexer.inlineTokens(l),
                    }
                }
            }
        }
        codespan(e) {
            const n = this.rules.inline.code.exec(e)
            if (n) {
                let e = n[2].replace(/\n/g, ' ')
                const t = /[^ ]/.test(e),
                    r = /^ /.test(e) && / $/.test(e)
                return (
                    t && r && (e = e.substring(1, e.length - 1)),
                    (e = l(e, !0)),
                    { type: 'codespan', raw: n[0], text: e }
                )
            }
        }
        br(e) {
            const n = this.rules.inline.br.exec(e)
            if (n) return { type: 'br', raw: n[0] }
        }
        del(e) {
            const n = this.rules.inline.del.exec(e)
            if (n)
                return {
                    type: 'del',
                    raw: n[0],
                    text: n[2],
                    tokens: this.lexer.inlineTokens(n[2]),
                }
        }
        autolink(e, n) {
            const t = this.rules.inline.autolink.exec(e)
            if (t) {
                let e, r
                return (
                    '@' === t[2]
                        ? ((e = l(this.options.mangle ? n(t[1]) : t[1])),
                          (r = 'mailto:' + e))
                        : ((e = l(t[1])), (r = e)),
                    {
                        type: 'link',
                        raw: t[0],
                        text: e,
                        href: r,
                        tokens: [{ type: 'text', raw: e, text: e }],
                    }
                )
            }
        }
        url(e, n) {
            let t
            if ((t = this.rules.inline.url.exec(e))) {
                let e, r
                if ('@' === t[2])
                    (e = l(this.options.mangle ? n(t[0]) : t[0])),
                        (r = 'mailto:' + e)
                else {
                    let n
                    do {
                        ;(n = t[0]),
                            (t[0] = this.rules.inline._backpedal.exec(t[0])[0])
                    } while (n !== t[0])
                    ;(e = l(t[0])),
                        (r = 'www.' === t[1] ? 'http://' + t[0] : t[0])
                }
                return {
                    type: 'link',
                    raw: t[0],
                    text: e,
                    href: r,
                    tokens: [{ type: 'text', raw: e, text: e }],
                }
            }
        }
        inlineText(e, n) {
            const t = this.rules.inline.text.exec(e)
            if (t) {
                let e
                return (
                    (e = this.lexer.state.inRawBlock
                        ? this.options.sanitize
                            ? this.options.sanitizer
                                ? this.options.sanitizer(t[0])
                                : l(t[0])
                            : t[0]
                        : l(this.options.smartypants ? n(t[0]) : t[0])),
                    { type: 'text', raw: t[0], text: e }
                )
            }
        }
    }
    const z = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
        def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: x,
        lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph:
            /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
        _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
    }
    ;(z.def = d(z.def)
        .replace('label', z._label)
        .replace('title', z._title)
        .getRegex()),
        (z.bullet = /(?:[*+-]|\d{1,9}[.)])/),
        (z.listItemStart = d(/^( *)(bull) */)
            .replace('bull', z.bullet)
            .getRegex()),
        (z.list = d(z.list)
            .replace(/bull/g, z.bullet)
            .replace(
                'hr',
                '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
            )
            .replace('def', '\\n+(?=' + z.def.source + ')')
            .getRegex()),
        (z._tag =
            'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
        (z._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
        (z.html = d(z.html, 'i')
            .replace('comment', z._comment)
            .replace('tag', z._tag)
            .replace(
                'attribute',
                / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
            )
            .getRegex()),
        (z.paragraph = d(z._paragraph)
            .replace('hr', z.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('|table', '')
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
                'html',
                '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
            )
            .replace('tag', z._tag)
            .getRegex()),
        (z.blockquote = d(z.blockquote)
            .replace('paragraph', z.paragraph)
            .getRegex()),
        (z.normal = { ...z }),
        (z.gfm = {
            ...z.normal,
            table: '^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
        }),
        (z.gfm.table = d(z.gfm.table)
            .replace('hr', z.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
                'html',
                '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
            )
            .replace('tag', z._tag)
            .getRegex()),
        (z.gfm.paragraph = d(z._paragraph)
            .replace('hr', z.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('table', z.gfm.table)
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
                'html',
                '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
            )
            .replace('tag', z._tag)
            .getRegex()),
        (z.pedantic = {
            ...z.normal,
            html: d(
                '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
            )
                .replace('comment', z._comment)
                .replace(
                    /tag/g,
                    '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
                )
                .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: x,
            lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            paragraph: d(z.normal._paragraph)
                .replace('hr', z.hr)
                .replace('heading', ' *#{1,6} *[^\n]')
                .replace('lheading', z.lheading)
                .replace('blockquote', ' {0,3}>')
                .replace('|fences', '')
                .replace('|list', '')
                .replace('|html', '')
                .getRegex(),
        })
    const $ = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: x,
        tag: '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: 'reflink|nolink(?!\\()',
        emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst:
                /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
            rDelimUnd:
                /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: x,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\spunctuation])/,
    }
    function A(e) {
        return e
            .replace(/---/g, '—')
            .replace(/--/g, '–')
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
            .replace(/'/g, '’')
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
            .replace(/"/g, '”')
            .replace(/\.{3}/g, '…')
    }
    function E(e) {
        let n,
            t,
            r = ''
        const i = e.length
        for (n = 0; n < i; n++)
            (t = e.charCodeAt(n)),
                Math.random() > 0.5 && (t = 'x' + t.toString(16)),
                (r += '&#' + t + ';')
        return r
    }
    ;($._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~'),
        ($.punctuation = d($.punctuation)
            .replace(/punctuation/g, $._punctuation)
            .getRegex()),
        ($.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
        ($.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g),
        ($._comment = d(z._comment)
            .replace('(?:--\x3e|$)', '--\x3e')
            .getRegex()),
        ($.emStrong.lDelim = d($.emStrong.lDelim)
            .replace(/punct/g, $._punctuation)
            .getRegex()),
        ($.emStrong.rDelimAst = d($.emStrong.rDelimAst, 'g')
            .replace(/punct/g, $._punctuation)
            .getRegex()),
        ($.emStrong.rDelimUnd = d($.emStrong.rDelimUnd, 'g')
            .replace(/punct/g, $._punctuation)
            .getRegex()),
        ($._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
        ($._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
        ($._email =
            /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
        ($.autolink = d($.autolink)
            .replace('scheme', $._scheme)
            .replace('email', $._email)
            .getRegex()),
        ($._attribute =
            /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
        ($.tag = d($.tag)
            .replace('comment', $._comment)
            .replace('attribute', $._attribute)
            .getRegex()),
        ($._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
        ($._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
        ($._title =
            /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
        ($.link = d($.link)
            .replace('label', $._label)
            .replace('href', $._href)
            .replace('title', $._title)
            .getRegex()),
        ($.reflink = d($.reflink)
            .replace('label', $._label)
            .replace('ref', z._label)
            .getRegex()),
        ($.nolink = d($.nolink).replace('ref', z._label).getRegex()),
        ($.reflinkSearch = d($.reflinkSearch, 'g')
            .replace('reflink', $.reflink)
            .replace('nolink', $.nolink)
            .getRegex()),
        ($.normal = { ...$ }),
        ($.pedantic = {
            ...$.normal,
            strong: {
                start: /^__|\*\*/,
                middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                endAst: /\*\*(?!\*)/g,
                endUnd: /__(?!_)/g,
            },
            em: {
                start: /^_|\*/,
                middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
                endAst: /\*(?!\*)/g,
                endUnd: /_(?!_)/g,
            },
            link: d(/^!?\[(label)\]\((.*?)\)/)
                .replace('label', $._label)
                .getRegex(),
            reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                .replace('label', $._label)
                .getRegex(),
        }),
        ($.gfm = {
            ...$.normal,
            escape: d($.escape).replace('])', '~|])').getRegex(),
            _extended_email:
                /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal:
                /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
        }),
        ($.gfm.url = d($.gfm.url, 'i')
            .replace('email', $.gfm._extended_email)
            .getRegex()),
        ($.breaks = {
            ...$.gfm,
            br: d($.br).replace('{2,}', '*').getRegex(),
            text: d($.gfm.text)
                .replace('\\b_', '\\b_| {2,}\\n')
                .replace(/\{2,\}/g, '*')
                .getRegex(),
        })
    class R {
        constructor(e) {
            ;(this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = e || n),
                (this.options.tokenizer = this.options.tokenizer || new _()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options),
                (this.tokenizer.lexer = this),
                (this.inlineQueue = []),
                (this.state = { inLink: !1, inRawBlock: !1, top: !0 })
            const t = { block: z.normal, inline: $.normal }
            this.options.pedantic
                ? ((t.block = z.pedantic), (t.inline = $.pedantic))
                : this.options.gfm &&
                  ((t.block = z.gfm),
                  this.options.breaks
                      ? (t.inline = $.breaks)
                      : (t.inline = $.gfm)),
                (this.tokenizer.rules = t)
        }
        static get rules() {
            return { block: z, inline: $ }
        }
        static lex(e, n) {
            return new R(n).lex(e)
        }
        static lexInline(e, n) {
            return new R(n).inlineTokens(e)
        }
        lex(e) {
            let n
            for (
                e = e.replace(/\r\n|\r/g, '\n'),
                    this.blockTokens(e, this.tokens);
                (n = this.inlineQueue.shift());

            )
                this.inlineTokens(n.src, n.tokens)
            return this.tokens
        }
        blockTokens(e, n = []) {
            let t, r, i, s
            for (
                e = this.options.pedantic
                    ? e.replace(/\t/g, '    ').replace(/^ +$/gm, '')
                    : e.replace(
                          /^( *)(\t+)/gm,
                          (e, n, t) => n + '    '.repeat(t.length)
                      );
                e;

            )
                if (
                    !(
                        this.options.extensions &&
                        this.options.extensions.block &&
                        this.options.extensions.block.some(
                            (r) =>
                                !!(t = r.call({ lexer: this }, e, n)) &&
                                ((e = e.substring(t.raw.length)), n.push(t), !0)
                        )
                    )
                )
                    if ((t = this.tokenizer.space(e)))
                        (e = e.substring(t.raw.length)),
                            1 === t.raw.length && n.length > 0
                                ? (n[n.length - 1].raw += '\n')
                                : n.push(t)
                    else if ((t = this.tokenizer.code(e)))
                        (e = e.substring(t.raw.length)),
                            (r = n[n.length - 1]),
                            !r || ('paragraph' !== r.type && 'text' !== r.type)
                                ? n.push(t)
                                : ((r.raw += '\n' + t.raw),
                                  (r.text += '\n' + t.text),
                                  (this.inlineQueue[
                                      this.inlineQueue.length - 1
                                  ].src = r.text))
                    else if ((t = this.tokenizer.fences(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.heading(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.hr(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.blockquote(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.list(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.html(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.def(e)))
                        (e = e.substring(t.raw.length)),
                            (r = n[n.length - 1]),
                            !r || ('paragraph' !== r.type && 'text' !== r.type)
                                ? this.tokens.links[t.tag] ||
                                  (this.tokens.links[t.tag] = {
                                      href: t.href,
                                      title: t.title,
                                  })
                                : ((r.raw += '\n' + t.raw),
                                  (r.text += '\n' + t.raw),
                                  (this.inlineQueue[
                                      this.inlineQueue.length - 1
                                  ].src = r.text))
                    else if ((t = this.tokenizer.table(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.lheading(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else {
                        if (
                            ((i = e),
                            this.options.extensions &&
                                this.options.extensions.startBlock)
                        ) {
                            let n = 1 / 0
                            const t = e.slice(1)
                            let r
                            this.options.extensions.startBlock.forEach(
                                function (e) {
                                    ;(r = e.call({ lexer: this }, t)),
                                        'number' == typeof r &&
                                            r >= 0 &&
                                            (n = Math.min(n, r))
                                }
                            ),
                                n < 1 / 0 &&
                                    n >= 0 &&
                                    (i = e.substring(0, n + 1))
                        }
                        if (this.state.top && (t = this.tokenizer.paragraph(i)))
                            (r = n[n.length - 1]),
                                s && 'paragraph' === r.type
                                    ? ((r.raw += '\n' + t.raw),
                                      (r.text += '\n' + t.text),
                                      this.inlineQueue.pop(),
                                      (this.inlineQueue[
                                          this.inlineQueue.length - 1
                                      ].src = r.text))
                                    : n.push(t),
                                (s = i.length !== e.length),
                                (e = e.substring(t.raw.length))
                        else if ((t = this.tokenizer.text(e)))
                            (e = e.substring(t.raw.length)),
                                (r = n[n.length - 1]),
                                r && 'text' === r.type
                                    ? ((r.raw += '\n' + t.raw),
                                      (r.text += '\n' + t.text),
                                      this.inlineQueue.pop(),
                                      (this.inlineQueue[
                                          this.inlineQueue.length - 1
                                      ].src = r.text))
                                    : n.push(t)
                        else if (e) {
                            const n =
                                'Infinite loop on byte: ' + e.charCodeAt(0)
                            if (this.options.silent) {
                                console.error(n)
                                break
                            }
                            throw new Error(n)
                        }
                    }
            return (this.state.top = !0), n
        }
        inline(e, n = []) {
            return this.inlineQueue.push({ src: e, tokens: n }), n
        }
        inlineTokens(e, n = []) {
            let t,
                r,
                i,
                s,
                a,
                o,
                l = e
            if (this.tokens.links) {
                const e = Object.keys(this.tokens.links)
                if (e.length > 0)
                    for (
                        ;
                        null !=
                        (s = this.tokenizer.rules.inline.reflinkSearch.exec(l));

                    )
                        e.includes(s[0].slice(s[0].lastIndexOf('[') + 1, -1)) &&
                            (l =
                                l.slice(0, s.index) +
                                '[' +
                                S('a', s[0].length - 2) +
                                ']' +
                                l.slice(
                                    this.tokenizer.rules.inline.reflinkSearch
                                        .lastIndex
                                ))
            }
            for (
                ;
                null != (s = this.tokenizer.rules.inline.blockSkip.exec(l));

            )
                l =
                    l.slice(0, s.index) +
                    '[' +
                    S('a', s[0].length - 2) +
                    ']' +
                    l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)
            for (
                ;
                null != (s = this.tokenizer.rules.inline.escapedEmSt.exec(l));

            )
                (l =
                    l.slice(0, s.index + s[0].length - 2) +
                    '++' +
                    l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex)),
                    this.tokenizer.rules.inline.escapedEmSt.lastIndex--
            for (; e; )
                if (
                    (a || (o = ''),
                    (a = !1),
                    !(
                        this.options.extensions &&
                        this.options.extensions.inline &&
                        this.options.extensions.inline.some(
                            (r) =>
                                !!(t = r.call({ lexer: this }, e, n)) &&
                                ((e = e.substring(t.raw.length)), n.push(t), !0)
                        )
                    ))
                )
                    if ((t = this.tokenizer.escape(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.tag(e)))
                        (e = e.substring(t.raw.length)),
                            (r = n[n.length - 1]),
                            r && 'text' === t.type && 'text' === r.type
                                ? ((r.raw += t.raw), (r.text += t.text))
                                : n.push(t)
                    else if ((t = this.tokenizer.link(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.reflink(e, this.tokens.links)))
                        (e = e.substring(t.raw.length)),
                            (r = n[n.length - 1]),
                            r && 'text' === t.type && 'text' === r.type
                                ? ((r.raw += t.raw), (r.text += t.text))
                                : n.push(t)
                    else if ((t = this.tokenizer.emStrong(e, l, o)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.codespan(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.br(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.del(e)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if ((t = this.tokenizer.autolink(e, E)))
                        (e = e.substring(t.raw.length)), n.push(t)
                    else if (
                        this.state.inLink ||
                        !(t = this.tokenizer.url(e, E))
                    ) {
                        if (
                            ((i = e),
                            this.options.extensions &&
                                this.options.extensions.startInline)
                        ) {
                            let n = 1 / 0
                            const t = e.slice(1)
                            let r
                            this.options.extensions.startInline.forEach(
                                function (e) {
                                    ;(r = e.call({ lexer: this }, t)),
                                        'number' == typeof r &&
                                            r >= 0 &&
                                            (n = Math.min(n, r))
                                }
                            ),
                                n < 1 / 0 &&
                                    n >= 0 &&
                                    (i = e.substring(0, n + 1))
                        }
                        if ((t = this.tokenizer.inlineText(i, A)))
                            (e = e.substring(t.raw.length)),
                                '_' !== t.raw.slice(-1) &&
                                    (o = t.raw.slice(-1)),
                                (a = !0),
                                (r = n[n.length - 1]),
                                r && 'text' === r.type
                                    ? ((r.raw += t.raw), (r.text += t.text))
                                    : n.push(t)
                        else if (e) {
                            const n =
                                'Infinite loop on byte: ' + e.charCodeAt(0)
                            if (this.options.silent) {
                                console.error(n)
                                break
                            }
                            throw new Error(n)
                        }
                    } else (e = e.substring(t.raw.length)), n.push(t)
            return n
        }
    }
    class L {
        constructor(e) {
            this.options = e || n
        }
        code(e, n, t) {
            const r = (n || '').match(/\S*/)[0]
            if (this.options.highlight) {
                const n = this.options.highlight(e, r)
                null != n && n !== e && ((t = !0), (e = n))
            }
            return (
                (e = e.replace(/\n$/, '') + '\n'),
                r
                    ? '<pre><code class="' +
                      this.options.langPrefix +
                      l(r) +
                      '">' +
                      (t ? e : l(e, !0)) +
                      '</code></pre>\n'
                    : '<pre><code>' + (t ? e : l(e, !0)) + '</code></pre>\n'
            )
        }
        blockquote(e) {
            return `<blockquote>\n${e}</blockquote>\n`
        }
        html(e) {
            return e
        }
        heading(e, n, t, r) {
            if (this.options.headerIds) {
                return `<h${n} id="${this.options.headerPrefix + r.slug(t)}">${e}</h${n}>\n`
            }
            return `<h${n}>${e}</h${n}>\n`
        }
        hr() {
            return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
        }
        list(e, n, t) {
            const r = n ? 'ol' : 'ul'
            return (
                '<' +
                r +
                (n && 1 !== t ? ' start="' + t + '"' : '') +
                '>\n' +
                e +
                '</' +
                r +
                '>\n'
            )
        }
        listitem(e) {
            return `<li>${e}</li>\n`
        }
        checkbox(e) {
            return (
                '<input ' +
                (e ? 'checked="" ' : '') +
                'disabled="" type="checkbox"' +
                (this.options.xhtml ? ' /' : '') +
                '> '
            )
        }
        paragraph(e) {
            return `<p>${e}</p>\n`
        }
        table(e, n) {
            return (
                n && (n = `<tbody>${n}</tbody>`),
                '<table>\n<thead>\n' + e + '</thead>\n' + n + '</table>\n'
            )
        }
        tablerow(e) {
            return `<tr>\n${e}</tr>\n`
        }
        tablecell(e, n) {
            const t = n.header ? 'th' : 'td'
            return (
                (n.align ? `<${t} align="${n.align}">` : `<${t}>`) +
                e +
                `</${t}>\n`
            )
        }
        strong(e) {
            return `<strong>${e}</strong>`
        }
        em(e) {
            return `<em>${e}</em>`
        }
        codespan(e) {
            return `<code>${e}</code>`
        }
        br() {
            return this.options.xhtml ? '<br/>' : '<br>'
        }
        del(e) {
            return `<del>${e}</del>`
        }
        link(e, n, t) {
            if (
                null === (e = m(this.options.sanitize, this.options.baseUrl, e))
            )
                return t
            let r = '<a href="' + e + '"'
            return n && (r += ' title="' + n + '"'), (r += '>' + t + '</a>'), r
        }
        image(e, n, t) {
            if (
                null === (e = m(this.options.sanitize, this.options.baseUrl, e))
            )
                return t
            let r = `<img src="${e}" alt="${t}"`
            return (
                n && (r += ` title="${n}"`),
                (r += this.options.xhtml ? '/>' : '>'),
                r
            )
        }
        text(e) {
            return e
        }
    }
    class I {
        strong(e) {
            return e
        }
        em(e) {
            return e
        }
        codespan(e) {
            return e
        }
        del(e) {
            return e
        }
        html(e) {
            return e
        }
        text(e) {
            return e
        }
        link(e, n, t) {
            return '' + t
        }
        image(e, n, t) {
            return '' + t
        }
        br() {
            return ''
        }
    }
    class M {
        constructor() {
            this.seen = {}
        }
        serialize(e) {
            return e
                .toLowerCase()
                .trim()
                .replace(/<[!\/a-z].*?>/gi, '')
                .replace(
                    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
                    ''
                )
                .replace(/\s/g, '-')
        }
        getNextSafeSlug(e, n) {
            let t = e,
                r = 0
            if (this.seen.hasOwnProperty(t)) {
                r = this.seen[e]
                do {
                    r++, (t = e + '-' + r)
                } while (this.seen.hasOwnProperty(t))
            }
            return n || ((this.seen[e] = r), (this.seen[t] = 0)), t
        }
        slug(e, n = {}) {
            const t = this.serialize(e)
            return this.getNextSafeSlug(t, n.dryrun)
        }
    }
    class C {
        constructor(e) {
            ;(this.options = e || n),
                (this.options.renderer = this.options.renderer || new L()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.textRenderer = new I()),
                (this.slugger = new M())
        }
        static parse(e, n) {
            return new C(n).parse(e)
        }
        static parseInline(e, n) {
            return new C(n).parseInline(e)
        }
        parse(e, n = !0) {
            let t,
                r,
                i,
                s,
                a,
                o,
                l,
                c,
                u,
                d,
                h,
                g,
                m,
                f,
                k,
                w,
                b,
                x,
                y,
                v = ''
            const S = e.length
            for (t = 0; t < S; t++)
                if (
                    ((d = e[t]),
                    this.options.extensions &&
                        this.options.extensions.renderers &&
                        this.options.extensions.renderers[d.type] &&
                        ((y = this.options.extensions.renderers[d.type].call(
                            { parser: this },
                            d
                        )),
                        !1 !== y ||
                            ![
                                'space',
                                'hr',
                                'heading',
                                'code',
                                'table',
                                'blockquote',
                                'list',
                                'html',
                                'paragraph',
                                'text',
                            ].includes(d.type)))
                )
                    v += y || ''
                else
                    switch (d.type) {
                        case 'space':
                            continue
                        case 'hr':
                            v += this.renderer.hr()
                            continue
                        case 'heading':
                            v += this.renderer.heading(
                                this.parseInline(d.tokens),
                                d.depth,
                                p(
                                    this.parseInline(
                                        d.tokens,
                                        this.textRenderer
                                    )
                                ),
                                this.slugger
                            )
                            continue
                        case 'code':
                            v += this.renderer.code(d.text, d.lang, d.escaped)
                            continue
                        case 'table':
                            for (
                                c = '', l = '', s = d.header.length, r = 0;
                                r < s;
                                r++
                            )
                                l += this.renderer.tablecell(
                                    this.parseInline(d.header[r].tokens),
                                    { header: !0, align: d.align[r] }
                                )
                            for (
                                c += this.renderer.tablerow(l),
                                    u = '',
                                    s = d.rows.length,
                                    r = 0;
                                r < s;
                                r++
                            ) {
                                for (
                                    o = d.rows[r], l = '', a = o.length, i = 0;
                                    i < a;
                                    i++
                                )
                                    l += this.renderer.tablecell(
                                        this.parseInline(o[i].tokens),
                                        { header: !1, align: d.align[i] }
                                    )
                                u += this.renderer.tablerow(l)
                            }
                            v += this.renderer.table(c, u)
                            continue
                        case 'blockquote':
                            ;(u = this.parse(d.tokens)),
                                (v += this.renderer.blockquote(u))
                            continue
                        case 'list':
                            for (
                                h = d.ordered,
                                    g = d.start,
                                    m = d.loose,
                                    s = d.items.length,
                                    u = '',
                                    r = 0;
                                r < s;
                                r++
                            )
                                (k = d.items[r]),
                                    (w = k.checked),
                                    (b = k.task),
                                    (f = ''),
                                    k.task &&
                                        ((x = this.renderer.checkbox(w)),
                                        m
                                            ? k.tokens.length > 0 &&
                                              'paragraph' === k.tokens[0].type
                                                ? ((k.tokens[0].text =
                                                      x +
                                                      ' ' +
                                                      k.tokens[0].text),
                                                  k.tokens[0].tokens &&
                                                      k.tokens[0].tokens
                                                          .length > 0 &&
                                                      'text' ===
                                                          k.tokens[0].tokens[0]
                                                              .type &&
                                                      (k.tokens[0].tokens[0].text =
                                                          x +
                                                          ' ' +
                                                          k.tokens[0].tokens[0]
                                                              .text))
                                                : k.tokens.unshift({
                                                      type: 'text',
                                                      text: x,
                                                  })
                                            : (f += x)),
                                    (f += this.parse(k.tokens, m)),
                                    (u += this.renderer.listitem(f, b, w))
                            v += this.renderer.list(u, h, g)
                            continue
                        case 'html':
                            v += this.renderer.html(d.text)
                            continue
                        case 'paragraph':
                            v += this.renderer.paragraph(
                                this.parseInline(d.tokens)
                            )
                            continue
                        case 'text':
                            for (
                                u = d.tokens
                                    ? this.parseInline(d.tokens)
                                    : d.text;
                                t + 1 < S && 'text' === e[t + 1].type;

                            )
                                (d = e[++t]),
                                    (u +=
                                        '\n' +
                                        (d.tokens
                                            ? this.parseInline(d.tokens)
                                            : d.text))
                            v += n ? this.renderer.paragraph(u) : u
                            continue
                        default: {
                            const e =
                                'Token with "' +
                                d.type +
                                '" type was not found.'
                            if (this.options.silent)
                                return void console.error(e)
                            throw new Error(e)
                        }
                    }
            return v
        }
        parseInline(e, n) {
            n = n || this.renderer
            let t,
                r,
                i,
                s = ''
            const a = e.length
            for (t = 0; t < a; t++)
                if (
                    ((r = e[t]),
                    this.options.extensions &&
                        this.options.extensions.renderers &&
                        this.options.extensions.renderers[r.type] &&
                        ((i = this.options.extensions.renderers[r.type].call(
                            { parser: this },
                            r
                        )),
                        !1 !== i ||
                            ![
                                'escape',
                                'html',
                                'link',
                                'image',
                                'strong',
                                'em',
                                'codespan',
                                'br',
                                'del',
                                'text',
                            ].includes(r.type)))
                )
                    s += i || ''
                else
                    switch (r.type) {
                        case 'escape':
                        case 'text':
                            s += n.text(r.text)
                            break
                        case 'html':
                            s += n.html(r.text)
                            break
                        case 'link':
                            s += n.link(
                                r.href,
                                r.title,
                                this.parseInline(r.tokens, n)
                            )
                            break
                        case 'image':
                            s += n.image(r.href, r.title, r.text)
                            break
                        case 'strong':
                            s += n.strong(this.parseInline(r.tokens, n))
                            break
                        case 'em':
                            s += n.em(this.parseInline(r.tokens, n))
                            break
                        case 'codespan':
                            s += n.codespan(r.text)
                            break
                        case 'br':
                            s += n.br()
                            break
                        case 'del':
                            s += n.del(this.parseInline(r.tokens, n))
                            break
                        default: {
                            const e =
                                'Token with "' +
                                r.type +
                                '" type was not found.'
                            if (this.options.silent)
                                return void console.error(e)
                            throw new Error(e)
                        }
                    }
            return s
        }
    }
    class q {
        constructor(e) {
            this.options = e || n
        }
        static passThroughHooks = new Set(['preprocess', 'postprocess'])
        preprocess(e) {
            return e
        }
        postprocess(e) {
            return e
        }
    }
    function P(e, n) {
        return (t, r, i) => {
            'function' == typeof r && ((i = r), (r = null))
            const s = { ...r },
                a = (function (e, n, t) {
                    return (r) => {
                        if (
                            ((r.message +=
                                '\nPlease report this to https://github.com/markedjs/marked.'),
                            e)
                        ) {
                            const e =
                                '<p>An error occurred:</p><pre>' +
                                l(r.message + '', !0) +
                                '</pre>'
                            return n
                                ? Promise.resolve(e)
                                : t
                                  ? void t(null, e)
                                  : e
                        }
                        if (n) return Promise.reject(r)
                        if (!t) throw r
                        t(r)
                    }
                })((r = { ...O.defaults, ...s }).silent, r.async, i)
            if (null == t)
                return a(
                    new Error('marked(): input parameter is undefined or null')
                )
            if ('string' != typeof t)
                return a(
                    new Error(
                        'marked(): input parameter is of type ' +
                            Object.prototype.toString.call(t) +
                            ', string expected'
                    )
                )
            if (
                ((function (e) {
                    e &&
                        e.sanitize &&
                        !e.silent &&
                        console.warn(
                            'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options'
                        )
                })(r),
                r.hooks && (r.hooks.options = r),
                i)
            ) {
                const s = r.highlight
                let o
                try {
                    r.hooks && (t = r.hooks.preprocess(t)), (o = e(t, r))
                } catch (e) {
                    return a(e)
                }
                const l = function (e) {
                    let t
                    if (!e)
                        try {
                            r.walkTokens && O.walkTokens(o, r.walkTokens),
                                (t = n(o, r)),
                                r.hooks && (t = r.hooks.postprocess(t))
                        } catch (n) {
                            e = n
                        }
                    return (r.highlight = s), e ? a(e) : i(null, t)
                }
                if (!s || s.length < 3) return l()
                if ((delete r.highlight, !o.length)) return l()
                let c = 0
                return (
                    O.walkTokens(o, function (e) {
                        'code' === e.type &&
                            (c++,
                            setTimeout(() => {
                                s(e.text, e.lang, function (n, t) {
                                    if (n) return l(n)
                                    null != t &&
                                        t !== e.text &&
                                        ((e.text = t), (e.escaped = !0)),
                                        c--,
                                        0 === c && l()
                                })
                            }, 0))
                    }),
                    void (0 === c && l())
                )
            }
            if (r.async)
                return Promise.resolve(r.hooks ? r.hooks.preprocess(t) : t)
                    .then((n) => e(n, r))
                    .then((e) =>
                        r.walkTokens
                            ? Promise.all(O.walkTokens(e, r.walkTokens)).then(
                                  () => e
                              )
                            : e
                    )
                    .then((e) => n(e, r))
                    .then((e) => (r.hooks ? r.hooks.postprocess(e) : e))
                    .catch(a)
            try {
                r.hooks && (t = r.hooks.preprocess(t))
                const i = e(t, r)
                r.walkTokens && O.walkTokens(i, r.walkTokens)
                let s = n(i, r)
                return r.hooks && (s = r.hooks.postprocess(s)), s
            } catch (e) {
                return a(e)
            }
        }
    }
    function O(e, n, t) {
        return P(R.lex, C.parse)(e, n, t)
    }
    ;(O.options = O.setOptions =
        function (e) {
            var t
            return (
                (O.defaults = { ...O.defaults, ...e }),
                (t = O.defaults),
                (n = t),
                O
            )
        }),
        (O.getDefaults = e),
        (O.defaults = n),
        (O.use = function (...e) {
            const n = O.defaults.extensions || {
                renderers: {},
                childTokens: {},
            }
            e.forEach((e) => {
                const t = { ...e }
                if (
                    ((t.async = O.defaults.async || t.async || !1),
                    e.extensions &&
                        (e.extensions.forEach((e) => {
                            if (!e.name)
                                throw new Error('extension name required')
                            if (e.renderer) {
                                const t = n.renderers[e.name]
                                n.renderers[e.name] = t
                                    ? function (...n) {
                                          let r = e.renderer.apply(this, n)
                                          return (
                                              !1 === r &&
                                                  (r = t.apply(this, n)),
                                              r
                                          )
                                      }
                                    : e.renderer
                            }
                            if (e.tokenizer) {
                                if (
                                    !e.level ||
                                    ('block' !== e.level &&
                                        'inline' !== e.level)
                                )
                                    throw new Error(
                                        "extension level must be 'block' or 'inline'"
                                    )
                                n[e.level]
                                    ? n[e.level].unshift(e.tokenizer)
                                    : (n[e.level] = [e.tokenizer]),
                                    e.start &&
                                        ('block' === e.level
                                            ? n.startBlock
                                                ? n.startBlock.push(e.start)
                                                : (n.startBlock = [e.start])
                                            : 'inline' === e.level &&
                                              (n.startInline
                                                  ? n.startInline.push(e.start)
                                                  : (n.startInline = [
                                                        e.start,
                                                    ])))
                            }
                            e.childTokens &&
                                (n.childTokens[e.name] = e.childTokens)
                        }),
                        (t.extensions = n)),
                    e.renderer)
                ) {
                    const n = O.defaults.renderer || new L()
                    for (const t in e.renderer) {
                        const r = n[t]
                        n[t] = (...i) => {
                            let s = e.renderer[t].apply(n, i)
                            return !1 === s && (s = r.apply(n, i)), s
                        }
                    }
                    t.renderer = n
                }
                if (e.tokenizer) {
                    const n = O.defaults.tokenizer || new _()
                    for (const t in e.tokenizer) {
                        const r = n[t]
                        n[t] = (...i) => {
                            let s = e.tokenizer[t].apply(n, i)
                            return !1 === s && (s = r.apply(n, i)), s
                        }
                    }
                    t.tokenizer = n
                }
                if (e.hooks) {
                    const n = O.defaults.hooks || new q()
                    for (const t in e.hooks) {
                        const r = n[t]
                        q.passThroughHooks.has(t)
                            ? (n[t] = (i) => {
                                  if (O.defaults.async)
                                      return Promise.resolve(
                                          e.hooks[t].call(n, i)
                                      ).then((e) => r.call(n, e))
                                  const s = e.hooks[t].call(n, i)
                                  return r.call(n, s)
                              })
                            : (n[t] = (...i) => {
                                  let s = e.hooks[t].apply(n, i)
                                  return !1 === s && (s = r.apply(n, i)), s
                              })
                    }
                    t.hooks = n
                }
                if (e.walkTokens) {
                    const n = O.defaults.walkTokens
                    t.walkTokens = function (t) {
                        let r = []
                        return (
                            r.push(e.walkTokens.call(this, t)),
                            n && (r = r.concat(n.call(this, t))),
                            r
                        )
                    }
                }
                O.setOptions(t)
            })
        }),
        (O.walkTokens = function (e, n) {
            let t = []
            for (const r of e)
                switch (((t = t.concat(n.call(O, r))), r.type)) {
                    case 'table':
                        for (const e of r.header)
                            t = t.concat(O.walkTokens(e.tokens, n))
                        for (const e of r.rows)
                            for (const r of e)
                                t = t.concat(O.walkTokens(r.tokens, n))
                        break
                    case 'list':
                        t = t.concat(O.walkTokens(r.items, n))
                        break
                    default:
                        O.defaults.extensions &&
                        O.defaults.extensions.childTokens &&
                        O.defaults.extensions.childTokens[r.type]
                            ? O.defaults.extensions.childTokens[r.type].forEach(
                                  function (e) {
                                      t = t.concat(O.walkTokens(r[e], n))
                                  }
                              )
                            : r.tokens &&
                              (t = t.concat(O.walkTokens(r.tokens, n)))
                }
            return t
        }),
        (O.parseInline = P(R.lexInline, C.parseInline)),
        (O.Parser = C),
        (O.parser = C.parse),
        (O.Renderer = L),
        (O.TextRenderer = I),
        (O.Lexer = R),
        (O.lexer = R.lex),
        (O.Tokenizer = _),
        (O.Slugger = M),
        (O.Hooks = q),
        (O.parse = O),
        O.options,
        O.setOptions,
        O.use,
        O.walkTokens,
        O.parseInline,
        C.parse,
        R.lex
    return () => {
        let e,
            n,
            t = null
        function r() {
            if (t && !t.closed) t.focus()
            else {
                if (
                    ((t = window.open(
                        'about:blank',
                        'reveal.js - Notes',
                        'width=1100,height=700'
                    )),
                    (t.marked = O),
                    t.document.write(
                        '\x3c!--\r\n\tNOTE: You need to build the notes plugin after making changes to this file.\r\n--\x3e\r\n<html lang="en">\r\n  <head>\r\n    <meta charset="utf-8" />\r\n\r\n    <title>reveal.js - Speaker View - MODIFIED by AquaJo</title>\r\n\r\n    <style>\r\n      body {\r\n        font-family: Helvetica;\r\n        font-size: 18px;\r\n      }\r\n\r\n      #current-slide,\r\n      #upcoming-slide,\r\n      #speaker-controls {\r\n        padding: 6px;\r\n        box-sizing: border-box;\r\n        -moz-box-sizing: border-box;\r\n      }\r\n\r\n      #current-slide iframe,\r\n      #upcoming-slide iframe {\r\n        width: 100%;\r\n        height: 100%;\r\n        border: 1px solid #ddd;\r\n      }\r\n\r\n      #current-slide .label,\r\n      #upcoming-slide .label {\r\n        position: absolute;\r\n        top: 10px;\r\n        left: 10px;\r\n        z-index: 2;\r\n      }\r\n\r\n      #connection-status {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        z-index: 20;\r\n        padding: 30% 20% 20% 20%;\r\n        font-size: 18px;\r\n        color: #222;\r\n        background: #fff;\r\n        text-align: center;\r\n        box-sizing: border-box;\r\n        line-height: 1.4;\r\n      }\r\n\r\n      .overlay-element {\r\n        height: 34px;\r\n        line-height: 34px;\r\n        padding: 0 10px;\r\n        text-shadow: none;\r\n        background: rgba(220, 220, 220, 0.8);\r\n        color: #222;\r\n        font-size: 14px;\r\n      }\r\n\r\n      .overlay-element.interactive:hover {\r\n        background: rgba(220, 220, 220, 1);\r\n      }\r\n\r\n      #current-slide {\r\n        position: absolute;\r\n        width: 60%;\r\n        height: 100%;\r\n        top: 0;\r\n        left: 0;\r\n        padding-right: 0;\r\n      }\r\n\r\n      #upcoming-slide {\r\n        position: absolute;\r\n        width: 40%;\r\n        height: 40%;\r\n        right: 0;\r\n        top: 0;\r\n      }\r\n\r\n      /* Speaker controls */\r\n      #speaker-controls {\r\n        position: absolute;\r\n        top: 40%;\r\n        right: 0;\r\n        width: 40%;\r\n        height: 60%;\r\n        overflow: auto;\r\n        font-size: 18px;\r\n      }\r\n\r\n      .speaker-controls-time.hidden,\r\n      .speaker-controls-notes.hidden {\r\n        display: none;\r\n      }\r\n\r\n      .speaker-controls-time .label,\r\n      .speaker-controls-pace .label,\r\n      .speaker-controls-notes .label {\r\n        text-transform: uppercase;\r\n        font-weight: normal;\r\n        font-size: 0.66em;\r\n        color: #666;\r\n        margin: 0;\r\n      }\r\n\r\n      .speaker-controls-time,\r\n      .speaker-controls-pace {\r\n        border-bottom: 1px solid rgba(200, 200, 200, 0.5);\r\n        margin-bottom: 10px;\r\n        padding: 10px 16px;\r\n        padding-bottom: 20px;\r\n        cursor: pointer;\r\n      }\r\n\r\n      .speaker-controls-time .reset-button {\r\n        opacity: 0;\r\n        float: right;\r\n        color: #666;\r\n        text-decoration: none;\r\n      }\r\n      .speaker-controls-time:hover .reset-button {\r\n        opacity: 1;\r\n      }\r\n\r\n      .speaker-controls-time .timer,\r\n      .speaker-controls-time .clock {\r\n        width: 50%;\r\n      }\r\n\r\n      .speaker-controls-time .timer,\r\n      .speaker-controls-time .clock,\r\n      .speaker-controls-time .pacing .hours-value,\r\n      .speaker-controls-time .pacing .minutes-value,\r\n      .speaker-controls-time .pacing .seconds-value {\r\n        font-size: 1.9em;\r\n      }\r\n\r\n      .speaker-controls-time .timer {\r\n        float: left;\r\n      }\r\n\r\n      .speaker-controls-time .clock {\r\n        float: right;\r\n        text-align: right;\r\n      }\r\n\r\n      .speaker-controls-time span.mute {\r\n        opacity: 0.3;\r\n      }\r\n\r\n      .speaker-controls-time .pacing-title {\r\n        margin-top: 5px;\r\n      }\r\n\r\n      .speaker-controls-time .pacing.ahead {\r\n        color: blue;\r\n      }\r\n\r\n      .speaker-controls-time .pacing.on-track {\r\n        color: green;\r\n      }\r\n\r\n      .speaker-controls-time .pacing.behind {\r\n        color: red;\r\n      }\r\n\r\n      .speaker-controls-notes {\r\n        padding: 10px 16px;\r\n      }\r\n\r\n      .speaker-controls-notes .value {\r\n        margin-top: 5px;\r\n        line-height: 1.4;\r\n        font-size: 1.2em;\r\n      }\r\n\r\n      /* Layout selector */\r\n      #speaker-layout {\r\n        position: absolute;\r\n        top: 10px;\r\n        right: 10px;\r\n        color: #222;\r\n        z-index: 10;\r\n      }\r\n      #speaker-layout select {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        top: 0;\r\n        left: 0;\r\n        border: 0;\r\n        box-shadow: 0;\r\n        cursor: pointer;\r\n        opacity: 0;\r\n\r\n        font-size: 1em;\r\n        background-color: transparent;\r\n\r\n        -moz-appearance: none;\r\n        -webkit-appearance: none;\r\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n      }\r\n\r\n      #speaker-layout select:focus {\r\n        outline: none;\r\n        box-shadow: none;\r\n      }\r\n\r\n      .clear {\r\n        clear: both;\r\n      }\r\n\r\n      /* Speaker layout: Wide */\r\n      body[data-speaker-layout="wide"] #current-slide,\r\n      body[data-speaker-layout="wide"] #upcoming-slide {\r\n        width: 50%;\r\n        height: 45%;\r\n        padding: 6px;\r\n      }\r\n\r\n      body[data-speaker-layout="wide"] #current-slide {\r\n        top: 0;\r\n        left: 0;\r\n      }\r\n\r\n      body[data-speaker-layout="wide"] #upcoming-slide {\r\n        top: 0;\r\n        left: 50%;\r\n      }\r\n\r\n      body[data-speaker-layout="wide"] #speaker-controls {\r\n        top: 45%;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 50%;\r\n        font-size: 1.25em;\r\n      }\r\n\r\n      /* Speaker layout: Tall */\r\n      body[data-speaker-layout="tall"] #current-slide,\r\n      body[data-speaker-layout="tall"] #upcoming-slide {\r\n        width: 45%;\r\n        height: 50%;\r\n        padding: 6px;\r\n      }\r\n\r\n      body[data-speaker-layout="tall"] #current-slide {\r\n        top: 0;\r\n        left: 0;\r\n      }\r\n\r\n      body[data-speaker-layout="tall"] #upcoming-slide {\r\n        top: 50%;\r\n        left: 0;\r\n      }\r\n\r\n      body[data-speaker-layout="tall"] #speaker-controls {\r\n        padding-top: 40px;\r\n        top: 0;\r\n        left: 45%;\r\n        width: 55%;\r\n        height: 100%;\r\n        font-size: 1.25em;\r\n      }\r\n\r\n      /* Speaker layout: Notes only */\r\n      body[data-speaker-layout="notes-only"] #current-slide,\r\n      body[data-speaker-layout="notes-only"] #upcoming-slide {\r\n        display: none;\r\n      }\r\n\r\n      body[data-speaker-layout="notes-only"] #speaker-controls {\r\n        padding-top: 40px;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        font-size: 1.25em;\r\n      }\r\n\r\n      @media screen and (max-width: 1080px) {\r\n        body[data-speaker-layout="default"] #speaker-controls {\r\n          font-size: 16px;\r\n        }\r\n      }\r\n\r\n      @media screen and (max-width: 900px) {\r\n        body[data-speaker-layout="default"] #speaker-controls {\r\n          font-size: 14px;\r\n        }\r\n      }\r\n\r\n      @media screen and (max-width: 800px) {\r\n        body[data-speaker-layout="default"] #speaker-controls {\r\n          font-size: 12px;\r\n        }\r\n      }\r\n    </style>\r\n  </head>\r\n\r\n  <body>\r\n    <div id="connection-status">Loading speaker view...</div>\r\n\r\n    <div id="current-slide"></div>\r\n    <div id="upcoming-slide">\r\n      <span class="overlay-element label">Upcoming</span>\r\n    </div>\r\n    <div id="speaker-controls">\r\n      <div class="speaker-controls-time">\r\n        <h4 class="label">\r\n          Time <span class="reset-button">Click to Reset</span>\r\n        </h4>\r\n        <div class="clock">\r\n          <span class="clock-value">0:00 AM</span>\r\n        </div>\r\n        <div class="timer">\r\n          <span class="hours-value">00</span\r\n          ><span class="minutes-value">:00</span\r\n          ><span class="seconds-value">:00</span>\r\n        </div>\r\n        <div class="clear"></div>\r\n\r\n        <h4 class="label pacing-title" style="display: none">\r\n          Pacing – Time to finish current slide\r\n        </h4>\r\n        <div class="pacing" style="display: none">\r\n          <span class="hours-value">00</span\r\n          ><span class="minutes-value">:00</span\r\n          ><span class="seconds-value">:00</span>\r\n        </div>\r\n      </div>\r\n\r\n      <div class="speaker-controls-notes hidden">\r\n        <h4 class="label">Notes</h4>\r\n        <div class="value"></div>\r\n      </div>\r\n    </div>\r\n    <div id="speaker-layout" class="overlay-element interactive">\r\n      <span class="speaker-layout-label"></span>\r\n      <select class="speaker-layout-dropdown"></select>\r\n    </div>\r\n\r\n    <script>\r\n      (function () {\r\n        var notes,\r\n          notesValue,\r\n          currentState,\r\n          currentSlide,\r\n          upcomingSlide,\r\n          layoutLabel,\r\n          layoutDropdown,\r\n          pendingCalls = {},\r\n          lastRevealApiCallId = 0,\r\n          connected = false;\r\n\r\n        var connectionStatus = document.querySelector("#connection-status");\r\n\r\n        var SPEAKER_LAYOUTS = {\r\n          default: "Default",\r\n          wide: "Wide",\r\n          tall: "Tall",\r\n          "notes-only": "Notes only",\r\n        };\r\n\r\n        setupLayout();\r\n\r\n        let openerOrigin;\r\n\r\n        try {\r\n          openerOrigin = window.opener.location.origin;\r\n        } catch (error) {\r\n          console.warn(error);\r\n        }\r\n\r\n        // In order to prevent XSS, the speaker view will only run if its\r\n        // opener has the same origin as itself\r\n        if (window.location.origin !== openerOrigin) {\r\n          connectionStatus.innerHTML =\r\n            "Cross origin error.<br>The speaker window can only be opened from the same origin.";\r\n          return;\r\n        }\r\n\r\n        var connectionTimeout = setTimeout(function () {\r\n          connectionStatus.innerHTML =\r\n            "Error connecting to main window.<br>Please try closing and reopening the speaker view.";\r\n        }, 5000);\r\n\r\n        window.addEventListener("message", function (event) {\r\n          // Validate the origin of all messages to avoid parsing messages\r\n          // that aren\'t meant for us. Ignore when running off file:// so\r\n          // that the speaker view continues to work without a web server.\r\n          if (\r\n            window.location.origin !== event.origin &&\r\n            window.location.origin !== "file://"\r\n          ) {\r\n            return;\r\n          }\r\n\r\n          clearTimeout(connectionTimeout);\r\n          connectionStatus.style.display = "none";\r\n\r\n          var data = JSON.parse(event.data);\r\n\r\n          // The overview mode is only useful to the reveal.js instance\r\n          // where navigation occurs so we don\'t sync it\r\n          if (data.state) delete data.state.overview;\r\n\r\n          // Messages sent by the notes plugin inside of the main window\r\n          if (data && data.namespace === "reveal-notes") {\r\n            if (data.type === "connect") {\r\n              handleConnectMessage(data);\r\n            } else if (data.type === "state") {\r\n              handleStateMessage(data);\r\n            } else if (data.type === "return") {\r\n              pendingCalls[data.callId](data.result);\r\n              delete pendingCalls[data.callId];\r\n            }\r\n          }\r\n          // Messages sent by the reveal.js inside of the current slide preview\r\n          else if (data && data.namespace === "reveal") {\r\n            if (/ready/.test(data.eventName)) {\r\n              // Send a message back to notify that the handshake is complete\r\n              window.opener.postMessage(\r\n                JSON.stringify({\r\n                  namespace: "reveal-notes",\r\n                  type: "connected",\r\n                }),\r\n                "*"\r\n              );\r\n            } else if (\r\n              /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test(\r\n                data.eventName\r\n              ) &&\r\n              currentState !== JSON.stringify(data.state)\r\n            ) {\r\n              dispatchStateToMainWindow(data.state);\r\n            }\r\n          }\r\n        });\r\n\r\n        /**\r\n         * Updates the presentation in the main window to match the state\r\n         * of the presentation in the notes window.\r\n         */\r\n        const dispatchStateToMainWindow = debounce((state) => {\r\n          window.opener.postMessage(\r\n            JSON.stringify({ method: "setState", args: [state] }),\r\n            "*"\r\n          );\r\n        }, 500);\r\n\r\n        /**\r\n         * Asynchronously calls the Reveal.js API of the main frame.\r\n         */\r\n        function callRevealApi(methodName, methodArguments, callback) {\r\n          var callId = ++lastRevealApiCallId;\r\n          pendingCalls[callId] = callback;\r\n          window.opener.postMessage(\r\n            JSON.stringify({\r\n              namespace: "reveal-notes",\r\n              type: "call",\r\n              callId: callId,\r\n              methodName: methodName,\r\n              arguments: methodArguments,\r\n            }),\r\n            "*"\r\n          );\r\n        }\r\n\r\n        /**\r\n         * Called when the main window is trying to establish a\r\n         * connection.\r\n         */\r\n        function handleConnectMessage(data) {\r\n          if (connected === false) {\r\n            connected = true;\r\n\r\n            setupIframes(data);\r\n            setupKeyboard();\r\n            setupNotes();\r\n            setupTimer();\r\n            setupHeartbeat();\r\n          }\r\n        }\r\n\r\n        /**\r\n         * Called when the main window sends an updated state.\r\n         */\r\n        function handleStateMessage(data) {\r\n          // Store the most recently set state to avoid circular loops\r\n          // applying the same state\r\n          currentState = JSON.stringify(data.state);\r\n\r\n          // No need for updating the notes in case of fragment changes\r\n          if (data.notes) {\r\n            notes.classList.remove("hidden");\r\n            notesValue.style.whiteSpace = data.whitespace;\r\n            if (data.markdown) {\r\n              notesValue.innerHTML = marked(data.notes);\r\n            } else {\r\n              notesValue.innerHTML = data.notes;\r\n            }\r\n          } else {\r\n            notes.classList.add("hidden");\r\n          }\r\n\r\n          // Update the note slides\r\n          currentSlide.contentWindow.postMessage(\r\n            JSON.stringify({ method: "setState", args: [data.state] }),\r\n            "*"\r\n          );\r\n          upcomingSlide.contentWindow.postMessage(\r\n            JSON.stringify({ method: "setState", args: [data.state] }),\r\n            "*"\r\n          );\r\n          upcomingSlide.contentWindow.postMessage(\r\n            JSON.stringify({ method: "next" }),\r\n            "*"\r\n          );\r\n        }\r\n\r\n        // Limit to max one state update per X ms\r\n        handleStateMessage = debounce(handleStateMessage, 200);\r\n\r\n        /**\r\n         * Forward keyboard events to the current slide window.\r\n         * This enables keyboard events to work even if focus\r\n         * isn\'t set on the current slide iframe.\r\n         *\r\n         * Block F5 default handling, it reloads and disconnects\r\n         * the speaker notes window.\r\n         */\r\n        function setupKeyboard() {\r\n          document.addEventListener("keydown", function (event) {\r\n            if (\r\n              event.keyCode === 116 ||\r\n              (event.metaKey && event.keyCode === 82)\r\n            ) {\r\n              event.preventDefault();\r\n              return false;\r\n            }\r\n            currentSlide.contentWindow.postMessage(\r\n              JSON.stringify({ method: "triggerKey", args: [event.keyCode] }),\r\n              "*"\r\n            );\r\n          });\r\n        }\r\n\r\n        /**\r\n         * Creates the preview iframes.\r\n         */\r\n        function setupIframes(data) {\r\n          var params = [\r\n            "receiver",\r\n            "progress=false",\r\n            "history=false",\r\n            "transition=none",\r\n            "autoSlide=0",\r\n            "backgroundTransition=none",\r\n          ].join("&");\r\n\r\n          var urlSeparator = /\\?/.test(data.url) ? "&" : "?";\r\n          var hash = "#/" + data.state.indexh + "/" + data.state.indexv;\r\n\r\n          var currentURL =\r\n            data.url +\r\n            urlSeparator +\r\n            params +\r\n            "&scrollActivationWidth=false&postMessageEvents=true&speakerView=true" +\r\n            hash;\r\n          var upcomingURL =\r\n            data.url +\r\n            urlSeparator +\r\n            params +\r\n            "&scrollActivationWidth=false&controls=false&speakerView=true" +\r\n            hash;\r\n\r\n          currentSlide = document.createElement("iframe");\r\n          currentSlide.setAttribute("width", 1280);\r\n          currentSlide.setAttribute("height", 1024);\r\n          currentSlide.setAttribute("src", currentURL);\r\n          currentSlide.setAttribute("speaker-view", "true"); //\r\n          document.querySelector("#current-slide").appendChild(currentSlide);\r\n\r\n          upcomingSlide = document.createElement("iframe");\r\n          upcomingSlide.setAttribute("width", 640);\r\n          upcomingSlide.setAttribute("height", 512);\r\n          upcomingSlide.setAttribute("src", upcomingURL);\r\n          upcomingSlide.setAttribute("speaker-view", "true"); //\r\n          document.querySelector("#upcoming-slide").appendChild(upcomingSlide);\r\n        }\r\n\r\n        /**\r\n         * Setup the notes UI.\r\n         */\r\n        function setupNotes() {\r\n          notes = document.querySelector(".speaker-controls-notes");\r\n          notesValue = document.querySelector(".speaker-controls-notes .value");\r\n        }\r\n\r\n        /**\r\n         * We send out a heartbeat at all times to ensure we can\r\n         * reconnect with the main presentation window after reloads.\r\n         */\r\n        function setupHeartbeat() {\r\n          setInterval(() => {\r\n            window.opener.postMessage(\r\n              JSON.stringify({ namespace: "reveal-notes", type: "heartbeat" }),\r\n              "*"\r\n            );\r\n          }, 1000);\r\n        }\r\n\r\n        function getTimings(callback) {\r\n          callRevealApi("getSlidesAttributes", [], function (slideAttributes) {\r\n            callRevealApi("getConfig", [], function (config) {\r\n              var totalTime = config.totalTime;\r\n              var minTimePerSlide = config.minimumTimePerSlide || 0;\r\n              var defaultTiming = config.defaultTiming;\r\n              if (defaultTiming == null && totalTime == null) {\r\n                callback(null);\r\n                return;\r\n              }\r\n              // Setting totalTime overrides defaultTiming\r\n              if (totalTime) {\r\n                defaultTiming = 0;\r\n              }\r\n              var timings = [];\r\n              for (var i in slideAttributes) {\r\n                var slide = slideAttributes[i];\r\n                var timing = defaultTiming;\r\n                if (slide.hasOwnProperty("data-timing")) {\r\n                  var t = slide["data-timing"];\r\n                  timing = parseInt(t);\r\n                  if (isNaN(timing)) {\r\n                    console.warn(\r\n                      "Could not parse timing \'" +\r\n                        t +\r\n                        "\' of slide " +\r\n                        i +\r\n                        "; using default of " +\r\n                        defaultTiming\r\n                    );\r\n                    timing = defaultTiming;\r\n                  }\r\n                }\r\n                timings.push(timing);\r\n              }\r\n              if (totalTime) {\r\n                // After we\'ve allocated time to individual slides, we summarize it and\r\n                // subtract it from the total time\r\n                var remainingTime =\r\n                  totalTime -\r\n                  timings.reduce(function (a, b) {\r\n                    return a + b;\r\n                  }, 0);\r\n                // The remaining time is divided by the number of slides that have 0 seconds\r\n                // allocated at the moment, giving the average time-per-slide on the remaining slides\r\n                var remainingSlides = timings.filter(function (x) {\r\n                  return x == 0;\r\n                }).length;\r\n                var timePerSlide = Math.round(\r\n                  remainingTime / remainingSlides,\r\n                  0\r\n                );\r\n                // And now we replace every zero-value timing with that average\r\n                timings = timings.map(function (x) {\r\n                  return x == 0 ? timePerSlide : x;\r\n                });\r\n              }\r\n              var slidesUnderMinimum = timings.filter(function (x) {\r\n                return x < minTimePerSlide;\r\n              }).length;\r\n              if (slidesUnderMinimum) {\r\n                message =\r\n                  "The pacing time for " +\r\n                  slidesUnderMinimum +\r\n                  " slide(s) is under the configured minimum of " +\r\n                  minTimePerSlide +\r\n                  " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";\r\n                alert(message);\r\n              }\r\n              callback(timings);\r\n            });\r\n          });\r\n        }\r\n\r\n        /**\r\n         * Return the number of seconds allocated for presenting\r\n         * all slides up to and including this one.\r\n         */\r\n        function getTimeAllocated(timings, callback) {\r\n          callRevealApi("getSlidePastCount", [], function (currentSlide) {\r\n            var allocated = 0;\r\n            for (var i in timings.slice(0, currentSlide + 1)) {\r\n              allocated += timings[i];\r\n            }\r\n            callback(allocated);\r\n          });\r\n        }\r\n\r\n        /**\r\n         * Create the timer and clock and start updating them\r\n         * at an interval.\r\n         */\r\n        function setupTimer() {\r\n          var start = new Date(),\r\n            timeEl = document.querySelector(".speaker-controls-time"),\r\n            clockEl = timeEl.querySelector(".clock-value"),\r\n            hoursEl = timeEl.querySelector(".hours-value"),\r\n            minutesEl = timeEl.querySelector(".minutes-value"),\r\n            secondsEl = timeEl.querySelector(".seconds-value"),\r\n            pacingTitleEl = timeEl.querySelector(".pacing-title"),\r\n            pacingEl = timeEl.querySelector(".pacing"),\r\n            pacingHoursEl = pacingEl.querySelector(".hours-value"),\r\n            pacingMinutesEl = pacingEl.querySelector(".minutes-value"),\r\n            pacingSecondsEl = pacingEl.querySelector(".seconds-value");\r\n\r\n          var timings = null;\r\n          getTimings(function (_timings) {\r\n            timings = _timings;\r\n            if (_timings !== null) {\r\n              pacingTitleEl.style.removeProperty("display");\r\n              pacingEl.style.removeProperty("display");\r\n            }\r\n\r\n            // Update once directly\r\n            _updateTimer();\r\n\r\n            // Then update every second\r\n            setInterval(_updateTimer, 1000);\r\n          });\r\n\r\n          function _resetTimer() {\r\n            if (timings == null) {\r\n              start = new Date();\r\n              _updateTimer();\r\n            } else {\r\n              // Reset timer to beginning of current slide\r\n              getTimeAllocated(timings, function (slideEndTimingSeconds) {\r\n                var slideEndTiming = slideEndTimingSeconds * 1000;\r\n                callRevealApi("getSlidePastCount", [], function (currentSlide) {\r\n                  var currentSlideTiming = timings[currentSlide] * 1000;\r\n                  var previousSlidesTiming =\r\n                    slideEndTiming - currentSlideTiming;\r\n                  var now = new Date();\r\n                  start = new Date(now.getTime() - previousSlidesTiming);\r\n                  _updateTimer();\r\n                });\r\n              });\r\n            }\r\n          }\r\n\r\n          timeEl.addEventListener("click", function () {\r\n            _resetTimer();\r\n            return false;\r\n          });\r\n\r\n          function _displayTime(hrEl, minEl, secEl, time) {\r\n            var sign = Math.sign(time) == -1 ? "-" : "";\r\n            time = Math.abs(Math.round(time / 1000));\r\n            var seconds = time % 60;\r\n            var minutes = Math.floor(time / 60) % 60;\r\n            var hours = Math.floor(time / (60 * 60));\r\n            hrEl.innerHTML = sign + zeroPadInteger(hours);\r\n            if (hours == 0) {\r\n              hrEl.classList.add("mute");\r\n            } else {\r\n              hrEl.classList.remove("mute");\r\n            }\r\n            minEl.innerHTML = ":" + zeroPadInteger(minutes);\r\n            if (hours == 0 && minutes == 0) {\r\n              minEl.classList.add("mute");\r\n            } else {\r\n              minEl.classList.remove("mute");\r\n            }\r\n            secEl.innerHTML = ":" + zeroPadInteger(seconds);\r\n          }\r\n\r\n          function _updateTimer() {\r\n            var diff,\r\n              hours,\r\n              minutes,\r\n              seconds,\r\n              now = new Date();\r\n\r\n            diff = now.getTime() - start.getTime();\r\n\r\n            clockEl.innerHTML = now.toLocaleTimeString("en-US", {\r\n              hour12: true,\r\n              hour: "2-digit",\r\n              minute: "2-digit",\r\n            });\r\n            _displayTime(hoursEl, minutesEl, secondsEl, diff);\r\n            if (timings !== null) {\r\n              _updatePacing(diff);\r\n            }\r\n          }\r\n\r\n          function _updatePacing(diff) {\r\n            getTimeAllocated(timings, function (slideEndTimingSeconds) {\r\n              var slideEndTiming = slideEndTimingSeconds * 1000;\r\n\r\n              callRevealApi("getSlidePastCount", [], function (currentSlide) {\r\n                var currentSlideTiming = timings[currentSlide] * 1000;\r\n                var timeLeftCurrentSlide = slideEndTiming - diff;\r\n                if (timeLeftCurrentSlide < 0) {\r\n                  pacingEl.className = "pacing behind";\r\n                } else if (timeLeftCurrentSlide < currentSlideTiming) {\r\n                  pacingEl.className = "pacing on-track";\r\n                } else {\r\n                  pacingEl.className = "pacing ahead";\r\n                }\r\n                _displayTime(\r\n                  pacingHoursEl,\r\n                  pacingMinutesEl,\r\n                  pacingSecondsEl,\r\n                  timeLeftCurrentSlide\r\n                );\r\n              });\r\n            });\r\n          }\r\n        }\r\n\r\n        /**\r\n         * Sets up the speaker view layout and layout selector.\r\n         */\r\n        function setupLayout() {\r\n          layoutDropdown = document.querySelector(".speaker-layout-dropdown");\r\n          layoutLabel = document.querySelector(".speaker-layout-label");\r\n\r\n          // Render the list of available layouts\r\n          for (var id in SPEAKER_LAYOUTS) {\r\n            var option = document.createElement("option");\r\n            option.setAttribute("value", id);\r\n            option.textContent = SPEAKER_LAYOUTS[id];\r\n            layoutDropdown.appendChild(option);\r\n          }\r\n\r\n          // Monitor the dropdown for changes\r\n          layoutDropdown.addEventListener(\r\n            "change",\r\n            function (event) {\r\n              setLayout(layoutDropdown.value);\r\n            },\r\n            false\r\n          );\r\n\r\n          // Restore any currently persisted layout\r\n          setLayout(getLayout());\r\n        }\r\n\r\n        /**\r\n         * Sets a new speaker view layout. The layout is persisted\r\n         * in local storage.\r\n         */\r\n        function setLayout(value) {\r\n          var title = SPEAKER_LAYOUTS[value];\r\n\r\n          layoutLabel.innerHTML = "Layout" + (title ? ": " + title : "");\r\n          layoutDropdown.value = value;\r\n\r\n          document.body.setAttribute("data-speaker-layout", value);\r\n\r\n          // Persist locally\r\n          if (supportsLocalStorage()) {\r\n            window.localStorage.setItem("reveal-speaker-layout", value);\r\n          }\r\n        }\r\n\r\n        /**\r\n         * Returns the ID of the most recently set speaker layout\r\n         * or our default layout if none has been set.\r\n         */\r\n        function getLayout() {\r\n          if (supportsLocalStorage()) {\r\n            var layout = window.localStorage.getItem("reveal-speaker-layout");\r\n            if (layout) {\r\n              return layout;\r\n            }\r\n          }\r\n\r\n          // Default to the first record in the layouts hash\r\n          for (var id in SPEAKER_LAYOUTS) {\r\n            return id;\r\n          }\r\n        }\r\n\r\n        function supportsLocalStorage() {\r\n          try {\r\n            localStorage.setItem("test", "test");\r\n            localStorage.removeItem("test");\r\n            return true;\r\n          } catch (e) {\r\n            return false;\r\n          }\r\n        }\r\n\r\n        function zeroPadInteger(num) {\r\n          var str = "00" + parseInt(num);\r\n          return str.substring(str.length - 2);\r\n        }\r\n\r\n        /**\r\n         * Limits the frequency at which a function can be called.\r\n         */\r\n        function debounce(fn, ms) {\r\n          var lastTime = 0,\r\n            timeout;\r\n\r\n          return function () {\r\n            var args = arguments;\r\n            var context = this;\r\n\r\n            clearTimeout(timeout);\r\n\r\n            var timeSinceLastCall = Date.now() - lastTime;\r\n            if (timeSinceLastCall > ms) {\r\n              fn.apply(context, args);\r\n              lastTime = Date.now();\r\n            } else {\r\n              timeout = setTimeout(function () {\r\n                fn.apply(context, args);\r\n                lastTime = Date.now();\r\n              }, ms - timeSinceLastCall);\r\n            }\r\n          };\r\n        }\r\n      })();\r\n    </script>\r\n  </body>\r\n</html>\r\n'
                    ),
                    !t)
                )
                    return void alert(
                        'Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.'
                    )
                !(function () {
                    const r = n.getConfig().url,
                        i =
                            'string' == typeof r
                                ? r
                                : window.location.protocol +
                                  '//' +
                                  window.location.host +
                                  window.location.pathname +
                                  window.location.search
                    ;(e = setInterval(function () {
                        t.postMessage(
                            JSON.stringify({
                                namespace: 'reveal-notes',
                                type: 'connect',
                                state: n.getState(),
                                url: i,
                            }),
                            '*'
                        )
                    }, 500)),
                        window.addEventListener('message', s)
                })()
            }
        }
        function i(e) {
            let r = n.getCurrentSlide(),
                i = r.querySelectorAll('aside.notes'),
                s = r.querySelector('.current-fragment'),
                a = {
                    namespace: 'reveal-notes',
                    type: 'state',
                    notes: '',
                    markdown: !1,
                    whitespace: 'normal',
                    state: n.getState(),
                }
            if (
                (r.hasAttribute('data-notes') &&
                    ((a.notes = r.getAttribute('data-notes')),
                    (a.whitespace = 'pre-wrap')),
                s)
            ) {
                let e = s.querySelector('aside.notes')
                e
                    ? ((a.notes = e.innerHTML),
                      (a.markdown =
                          'string' == typeof e.getAttribute('data-markdown')),
                      (i = null))
                    : s.hasAttribute('data-notes') &&
                      ((a.notes = s.getAttribute('data-notes')),
                      (a.whitespace = 'pre-wrap'),
                      (i = null))
            }
            i &&
                i.length &&
                ((i = Array.from(i).filter(
                    (e) => null === e.closest('.fragment')
                )),
                (a.notes = i.map((e) => e.innerHTML).join('\n')),
                (a.markdown =
                    i[0] &&
                    'string' == typeof i[0].getAttribute('data-markdown'))),
                t.postMessage(JSON.stringify(a), '*')
        }
        function s(r) {
            if (
                (function (e) {
                    try {
                        return (
                            window.location.origin === e.source.location.origin
                        )
                    } catch (e) {
                        return !1
                    }
                })(r)
            ) {
                let i = JSON.parse(r.data)
                i && 'reveal-notes' === i.namespace && 'connected' === i.type
                    ? (clearInterval(e), a())
                    : i &&
                      'reveal-notes' === i.namespace &&
                      'call' === i.type &&
                      (function (e, r, i) {
                          let s = n[e].apply(n, r)
                          t.postMessage(
                              JSON.stringify({
                                  namespace: 'reveal-notes',
                                  type: 'return',
                                  result: s,
                                  callId: i,
                              }),
                              '*'
                          )
                      })(i.methodName, i.arguments, i.callId)
            }
        }
        function a() {
            n.on('slidechanged', i),
                n.on('fragmentshown', i),
                n.on('fragmenthidden', i),
                n.on('overviewhidden', i),
                n.on('overviewshown', i),
                n.on('paused', i),
                n.on('resumed', i),
                i()
        }
        return {
            id: 'notes',
            init: function (e) {
                ;(n = e),
                    /receiver/i.test(window.location.search) ||
                        (null !== window.location.search.match(/(\?|\&)notes/gi)
                            ? r()
                            : window.addEventListener('message', (e) => {
                                  if (!t && 'string' == typeof e.data) {
                                      let r
                                      try {
                                          r = JSON.parse(e.data)
                                      } catch (e) {}
                                      r &&
                                          'reveal-notes' === r.namespace &&
                                          'heartbeat' === r.type &&
                                          ((n = e.source),
                                          t && !t.closed
                                              ? t.focus()
                                              : ((t = n),
                                                window.addEventListener(
                                                    'message',
                                                    s
                                                ),
                                                a()))
                                  }
                                  var n
                              }),
                        n.addKeyBinding(
                            {
                                keyCode: 83,
                                key: 'S',
                                description: 'Speaker notes view',
                            },
                            function () {
                                r()
                            }
                        ))
            },
            open: r,
        }
    }
})

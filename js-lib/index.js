'use strict'

const
    js0 = require('js0')
;

class abText_Class
{

    constructor()
    {
        this._texts = {};
        this._langAlias = null;
    }

    $(text)
    {
        js0.args(arguments, 'string');

        if (this._langAlias === null) {
            console.warn('Lang alias not set.');
            return this.get(this._langAlias, text);
        }

        return this.get(this._langAlias, text);
    }

    add(langAlias, texts)
    {
        if (!(langAlias in this._texts))
            this._texts[langAlias] = {};

        for (let text in texts)
            this._texts[langAlias][text] = texts[text];

        return this;
    }

    get(langAlias, text)
    {
        if (!(langAlias in this._texts))
            return `#${text}#`;

        if (!(text in this._texts[langAlias]))
            return `###${text}###`;

        return this._texts[langAlias][text];
    }

    setLang(langAlias)
    {
        this._langAlias = langAlias;
    }

}
module.exports = new abText_Class();
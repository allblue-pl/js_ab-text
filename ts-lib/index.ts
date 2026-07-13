class abText_Class {
    #langAlias: string|null;
    #texts: {[langAlias: string]: {[textAlias:string]: string}};


    constructor() {
        this.#langAlias = null;
        this.#texts = {};
    }

    $(text: string, args: TextArgs = null): string {
        if (this.#langAlias === null) {
            console.warn('Lang alias not set.', new Error());
            return this.get("en", text, args);
        }

        return this.get(this.#langAlias, text, args);
    }

    add(langPrefix: string, texts: Texts): abText_Class {
        let langPrefix_Arr = langPrefix.split('.');
        let langAlias = langPrefix_Arr[0];
        let textPrefix_Arr = langPrefix_Arr.slice(1);
        let textPrefix = textPrefix_Arr.join('.');
        if (textPrefix !== '')
            textPrefix += '.';

        if (!(langAlias in this.#texts))
            this.#texts[langAlias] = {};

        for (let text in texts)
            this.#texts[langAlias][textPrefix + text] = texts[text];

        return this;
    }

    get(langAlias: string, text: string, args: TextArgs = null): string {
        let translation = null;

        if (langAlias in this.#texts) {
            if (text in this.#texts[langAlias])
                translation = this.#texts[langAlias][text];
        }

        if (translation === null) {
            if (args === null) {
                return `#${text}#`;
            } else if (Object.keys(args).length === 0) {
                return `#${text}#`;
            } else {
                let args_Arr = [];
                for (let argName in args) {
                    args_Arr.push(`${argName} => ${args[argName]}`);
                }
                return '#' + text + '(' + args_Arr.join(', ') + ')';
            }
        }

        for (let argName in args) {
            translation = translation.replace(new RegExp(`{${argName}}`, 'gm'), 
                    args[argName]);
        }

        return translation;
    }

    setLang(langAlias: string): void {
        this.#langAlias = langAlias;
    }

}
const abText = new abText_Class();
export default abText;

type TextArgs = {[argName: string]: string}|null;
type Texts = {[textAlias: string]: string};
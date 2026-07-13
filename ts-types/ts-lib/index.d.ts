declare class abText_Class {
    #private;
    constructor();
    $(text: string, args?: TextArgs): string;
    add(langPrefix: string, texts: Texts): abText_Class;
    get(langAlias: string, text: string, args?: TextArgs): string;
    setLang(langAlias: string): void;
}
declare const abText: abText_Class;
export default abText;
type TextArgs = {
    [argName: string]: string;
} | null;
type Texts = {
    [textAlias: string]: string;
};

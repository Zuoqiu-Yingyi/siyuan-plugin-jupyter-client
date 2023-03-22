import { ShallowReactive } from "vue";

export interface IAttr {
    key: string;
    value: string;
}

export interface IForm {
    created: string;
    updated: string;
    title: string;
    name: string;
    alias: string[];
    tags: string[];
    bookmark: string;
    memo: string;

    customs: IAttr[];

    icon: string;
    scroll: string;
    "title-img": string;
}

import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";
export declare type BuffTextTypes = "time" | "timearg" | "arg";
export declare class Buff {
    isdebuff: boolean;
    buffer: ImageData;
    bufferx: number;
    buffery: number;
    constructor(buffer: ImageData, x: number, y: number, isdebuff: boolean);
    readArg(type: BuffTextTypes): {
        time: number;
        arg: string;
    };
    readTime(): number;
    compareBuffer(img: ImageData): boolean;
    countMatch(img: ImageData, aggressive?: boolean): {
        tested: number;
        failed: number;
        skipped: number;
        passed: number;
    };
}
export default class BuffReader {
    pos: {
        x: number;
        y: number;
        maxhor: number;
        maxver: number;
    } | null;
    debuffs: boolean;
    static buffsize: number;
    static gridsize: number;
    find(img?: ImgRef): true | null;
    getCaptRect(): a1lib.Rect | null;
    read(buffer?: ImageData): Buff[] | null;
    static compareBuffer(buffer: ImageData, ox: number, oy: number, buffimg: ImageData): boolean;
    static countMatch(buffer: ImageData, ox: number, oy: number, buffimg: ImageData, agressive?: boolean): {
        tested: number;
        failed: number;
        skipped: number;
        passed: number;
    };
    static isolateBuffer(buffer: ImageData, ox: number, oy: number, buffimg: ImageData): void;
    static readArg(buffer: ImageData, ox: number, oy: number, type: BuffTextTypes): {
        time: number;
        arg: string;
    };
    static readTime(buffer: ImageData, ox: number, oy: number): number;
    static matchBuff(state: Buff[], buffimg: ImageData): Buff | null;
    static matchBuffMulti(state: Buff[], buffinfo: BuffInfo): Buff | null;
}
export declare class BuffInfo {
    imgdata: ImageData;
    isdebuff: boolean;
    buffid: string;
    final: boolean;
    canimprove: boolean;
    constructor(imgdata: ImageData, debuff: boolean, id: string, canimprove: boolean);
}
//# sourceMappingURL=index.d.ts.map
import { RectLike } from "@alt1/base";
export declare type TextFragment = {
    text: string;
    color: ColortTriplet;
    index: number;
    xstart: number;
    xend: number;
};
export declare type Charinfo = {
    width: number;
    chr: string;
    bonus: number;
    secondary: boolean;
    pixels: number[];
};
export declare type FontDefinition = {
    chars: Charinfo[];
    width: number;
    spacewidth: number;
    shadow: boolean;
    height: number;
    basey: number;
    minrating?: number;
    maxspaces?: number;
};
export declare type ColortTriplet = [number, number, number];
export declare var debug: {
    printcharscores: boolean;
    trackread: boolean;
};
declare type Chardebug = {
    chr: string;
    rawscore: number;
    score: number;
    img: ImageData;
};
export declare var debugout: {
    [id: string]: Chardebug[];
};
/**
 * draws the font definition to a buffer and displays it in the dom for debugging purposes
 * @param font
 */
export declare function debugFont(font: FontDefinition): void;
export declare function unblendBlackBackground(img: ImageData, r: number, g: number, b: number): ImageData;
/**
 * unblends a imagebuffer into match strength with given color
 * the bgimg argument should contain a second image with pixel occluded by the font visible.
 * @param img
 * @param shadow detect black as second color
 * @param bgimg optional second image to
 */
export declare function unblendKnownBg(img: ImageData, bgimg: ImageData, shadow: boolean, r: number, g: number, b: number): ImageData;
/**
 * Unblends a font image that is already conpletely isolated to the raw image used ingame. This is the easiest mode for pixel fonts where alpha is 0 or 255, or for extracted font files.
 * @param img
 * @param r
 * @param g
 * @param b
 * @param shadow whether the font has a black shadow
 */
export declare function unblendTrans(img: ImageData, shadow: boolean, r: number, g: number, b: number): ImageData;
/**
 * Determised wether color [rgb]m can be a result of a blend with color [rgb]1 that is p (0-1) of the mix
 * It returns the number that the second color has to lie outside of the possible color ranges
 * @param rm resulting color
 * @param r1 first color of the mix (the other color is unknown)
 * @param p the portion of the [rgb]1 in the mix (0-1)
 */
export declare function canblend(rm: number, gm: number, bm: number, r1: number, g1: number, b1: number, p: number): number;
/**
 * decomposes a color in 2 given component colors and returns the amount of each color present
 * also return a third (noise) component which is the the amount leftover orthagonal from the 2 given colors
 */
export declare function decompose2col(rp: number, gp: number, bp: number, r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number[];
/**
 * decomposes a pixel in a given color component and black and returns what proportion of the second color it contains
 * this is not as formal as decompose 2/3 and only give a "good enough" number
 */
export declare function decomposeblack(rp: number, gp: number, bp: number, r1: number, g1: number, b1: number): number[];
/**
 * decomposes a color in 3 given component colors and returns the amount of each color present
 */
export declare function decompose3col(rp: number, gp: number, bp: number, r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, r3: number, g3: number, b3: number): number[];
/**
 * brute force to the exact position of the text
 */
export declare function findChar(buffer: ImageData, font: FontDefinition, col: ColortTriplet, x: number, y: number, w: number, h: number): ReadCharInfo | null;
/**
 * reads text with unknown exact coord or color. The given coord should be inside the text
 * color selection not implemented yet
 */
export declare function findReadLine(buffer: ImageData, font: FontDefinition, cols: ColortTriplet[], x: number, y: number, w?: number, h?: number): {
    debugArea: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    text: string;
    fragments: TextFragment[];
};
export declare function GetChatColorMono(buf: ImageData, rect: RectLike, colors: ColortTriplet[]): {
    col: ColortTriplet;
    score: number;
}[];
export declare function getChatColor(buf: ImageData, rect: RectLike, colors: ColortTriplet[]): ColortTriplet | null;
/**
 * reads a line of text with exactly known position and color. y should be the y coord of the text base line, x should be the first pixel of a new character
 */
export declare function readLine(buffer: ImageData, font: FontDefinition, colors: ColortTriplet | ColortTriplet[], x: number, y: number, forward: boolean, backward?: boolean): {
    debugArea: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    text: string;
    fragments: TextFragment[];
};
/**
 * Reads a line of text that uses a smallcaps font, these fonts can have duplicate chars that only have a different amount of
 * empty space after the char before the next char starts.
 * The coordinates should be near the end of the string, or a rectangle with high 1 containing all points where the string can end.
 */
export declare function readSmallCapsBackwards(buffer: ImageData, font: FontDefinition, cols: ColortTriplet[], x: number, y: number, w?: number, h?: number): {
    debugArea: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    text: string;
    fragments: TextFragment[];
} | {
    text: string;
    debugArea: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
};
/**
 * Reads a single character at the exact given location
 * @param x exact x location of the start of the character domain (includes part of the spacing between characters)
 * @param y exact y location of the baseline pixel of the character
 * @param backwards read in backwards direction, the x location should be the first pixel after the character domain in that case
 */
export declare function readChar(buffer: ImageData, font: FontDefinition, col: ColortTriplet, x: number, y: number, backwards: boolean, allowSecondary?: boolean): ReadCharInfo | null;
export declare type ReadCharInfo = {
    chr: string;
    basechar: Charinfo;
    x: number;
    y: number;
    score: number;
    sizescore: number;
};
/**
 * Generates a font json description to use in reader functions
 * @param unblended A source image with all characters lined up. The image should be unblended into components using the unblend functions
 * The lowest pixel line of this image is used to mark the location and size of the charecters if the red component is 255 it means there is a character on that pixel column
 * @param chars A string containing all the characters of the image in the same order
 * @param seconds A string with characters that are considered unlikely and should only be detected if no other character is possible.
 * For example the period (.) character matches positive inside many other characters and should be marked as secondary
 * @param bonusses An object that contains bonus scores for certain difficult characters to make the more likely to be red.
 * @param basey The y position of the baseline pixel of the font
 * @param spacewidth the number of pixels a space takes
 * @param treshold minimal color match proportion (0-1) before a pixel is used for the font
 * @param shadow whether this font also uses the black shadow some fonts have. The "unblended" image should be unblended correspondingly
 * @returns a javascript object describing the font which is used as input for the different read functions
 */
export declare function generatefont(unblended: ImageData, chars: string, seconds: string, bonusses: {
    [char: string]: number;
}, basey: number, spacewidth: number, treshold: number, shadow: boolean): FontDefinition;
export {};
//# sourceMappingURL=index.d.ts.map
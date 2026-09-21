/**
 * @file NnidResolver.mjs
 * Obtained from: https://gist.github.com/ariankordi/0348465eaa2d4c5b95fddd0c00b36795
 * Simple class for retrieving information about Nintendo
 * Network IDs/Pretendo Network IDs and their Mii data.
 * Uses fetch() API in Node, Bun, and web.
 *
 * In the browser, you will need to use a CORS proxy
 * or create your own reverse proxy to the actual API.
 * The following is an example of how to set up a basic proxy
 * using mitmdump, but you can redo this in nginx, Express.js, etc.
 * @example
 *
 * // Install mitmproxy and run:
 * `mitmdump --no-http2 --mode reverse:https://account.pretendo.cc --listen-port 8282 --modify-headers "/Access-Control-Allow-Origin/*" --modify-headers "/Access-Control-Allow-Headers/X-Nintendo-Client-ID,X-Nintendo-Client-Secret" --set "block_list=/~m OPTIONS/200"`
 * NnidResolver.baseUrl = 'https://localhost:8282/v1/api';
 * console.debug(await NnidResolver.miiFromPid('1742653218'));
 * @author Arian Kordi <https://github.com/ariankordi>
 */
/**
 * Response from the /v1/api/miis endpoint.
 * @typedef {Object} MiiResponse
 * @property {string} pid Principal ID.
 * @property {string} name Name of the user's Mii character.
 * @property {string} miiData Mii data encoded as Base64. (96 bytes, 3DS/Wii U format)
 * @property {string} userId Nintendo Network ID username.
 */
/**
 * Resolves user data ({@link MiiResponse}) from NNAS, aka
 * Nintendo Network Account Server/Service/System (Wii U/3DS).
 *
 * Only supports unofficial services, defaulting to {@link https://pretendo.network}.
 * @example
 *
 * console.debug(await NnidUserResolver.miiFromPid(await NnidUserResolver.pidFromUserId('PN_Jon')));
 */
export default class NnidResolver {
    /**
     * API base for Pretendo Network.
     * Note that this blocks HTTP/2 clients, and a workaround for Bun is applied.
     */
    static baseUrl: string;
    /** @private */ private static _get;
    /**
     * Ad-hoc/amateur method of extracting XML tag value.
     * Does NOT un-escape any characters, or handle multi-line XML.
     * @private
     */
    private static _extractXmlTag;
    /** @private */ private static _nameFromMiiDataBase64;
    /**
     * Obtains PID (principal ID) as a string from the user ID.
     * @throws {Error} Throws if the user does not exist.
     * @throws {Response} Throws for all other HTTP errors.
     */
    static pidFromUserId(userId: string, base?: string): Promise<string>;
    /**
     * Obtains {@link MiiResponse} from the PID.
     * Throws an exception if user doesn't exist.
     * @throws {Response} Throws if the PID does not exist,
     * or for any other HTTP error.
     * @throws {Error} Throws if the Mii data is empty.
     */
    static miiFromPid(pid: string, base?: string): Promise<MiiResponse>;
}
/**
 * Response from the /v1/api/miis endpoint.
 */
export type MiiResponse = {
    /**
     * Principal ID.
     */
    pid: string;
    /**
     * Name of the user's Mii character.
     */
    name: string;
    /**
     * Mii data encoded as Base64. (96 bytes, 3DS/Wii U format)
     */
    miiData: string;
    /**
     * Nintendo Network ID username.
     */
    userId: string;
};
// https://tools.ietf.org/html/rfc6902
// http://jsonpatch.com/

export type IJsonPatch = {
    op: "replace" | "add" | "remove"
    path: string
    value?: any
    oldValue?: any // This goes beyond JSON-patch, but makes sure each patch can be inverse applied
}

export function invertPatch(patch: IJsonPatch): IJsonPatch {
    if (!("oldValue" in patch)) fail(`Patches without \`oldValue\` field cannot be inversed`)
    switch (patch.op) {
        case "add":
            return {
                op: "remove",
                path: patch.path
            }
        case "remove":
            return {
                op: "add",
                path: patch.path,
                value: patch.oldValue
            }
        case "replace":
            return {
                op: "replace",
                path: patch.path,
                value: patch.oldValue,
                oldValue: patch.value
            }
    }
}

export function stripPatch(patch: IJsonPatch) {
    // strips `oldvalue` information from the patch, so that it becomes a patch conform the json-patch spec
    // this removes the ability to undo the patch
    const clone = { ...patch }
    delete clone.oldValue
    return clone
}

/**
 * escape slashes and backslashes
 * http://tools.ietf.org/html/rfc6901
 */
export function escapeJsonPath(str: string) {
    return str.replace(/~/g, "~1").replace(/\//g, "~0")
}

/**
 * unescape slashes and backslashes
 */
export function unescapeJsonPath(str: string) {
    return str.replace(/~0/g, "\\").replace(/~1/g, "~")
}

export function joinJsonPath(path: string[]): string {
    // `/` refers to property with an empty name, while `` refers to root itself!
    if (path.length === 0) return ""
    return "/" + path.map(escapeJsonPath).join("/")
}

export function splitJsonPath(path: string): string[] {
    // `/` refers to property with an empty name, while `` refers to root itself!
    const parts = path.split("/").map(unescapeJsonPath)

    // path '/a/b/c' -> a b c
    // path '../../b/c -> .. .. b c
    return parts[0] === "" ? parts.slice(1) : parts
}

import { fail } from "../utils"

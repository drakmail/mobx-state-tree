import * as mst from "../src"
import { test } from "ava"

test("correct api exposed", t => {
    t.deepEqual(
        Object.keys(mst).sort(),
        [
            "addDisposer",
            "addMiddleware",
            "applyAction",
            "applyPatch",
            "applySnapshot",
            "asReduxStore",
            "clone",
            "connectReduxDevtools",
            "destroy",
            "detach",
            "escapeJsonPath",
            "getChildType",
            "getEnv",
            "getParent",
            "getPath",
            "getPathParts",
            "getRelativePath",
            "getRoot",
            "getSnapshot",
            "getType",
            "hasParent",
            "isAlive",
            "isProtected",
            "isRoot",
            "isStateTreeNode",
            "onAction",
            "onPatch",
            "onSnapshot",
            "protect",
            "recordActions",
            "recordPatches",
            "resolveIdentifier",
            "resolvePath",
            "tryResolve",
            "types",
            "unescapeJsonPath",
            "unprotect",
            "walk"
        ].sort()
    )
})

test("correct types exposed", t => {
    t.deepEqual(
        Object.keys(mst.types).sort(),
        [
            "Date",
            "array",
            "boolean",
            "compose",
            "frozen",
            "identifier",
            "late",
            "literal",
            "map",
            "maybe",
            "model",
            "number",
            "optional",
            "reference",
            "refinement",
            "string",
            "union"
        ].sort()
    )
})

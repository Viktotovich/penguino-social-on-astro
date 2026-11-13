import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const pkgPath = resolve("package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
pkg.version = "0.3.2";
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("Updated version to", pkg.version);

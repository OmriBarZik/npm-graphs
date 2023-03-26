import { dirname, resolve } from "node:path";
import Arborist from "@npmcli/arborist";
import { fileURLToPath } from "url";
import { writeFile } from "node:fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

console.log(__dirname);

const tree = await new Arborist({
  path: __dirname,
}).buildIdealTree({ add: ["lodash"] });

const packages = [...tree.children]
  .filter(([name, meta]) => !!meta.edgesOut.size)
  .flatMap(([name, meta]) => [...meta.edgesOut])
  .filter(([name, meta]) => meta.to?.name)
  .map(([name, meta]) => [meta.from.name, meta.to.name]);

writeFile("lodash.json", JSON.stringify(packages));
// console.log(packages);

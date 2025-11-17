#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";

//Docs: https://www.npmjs.com/package/commander

/*
Penguino CLI is heavily inspired by Adonis Ace CLI.

It is no where near as capable, cool, or efficient (yet), but it is a great way
to save a lot of time scaffolding pages. 

If controllers were centralized, I would want to make something like 
npm run penguino:controller test |>> app/controllers/testController with a 
controller scaffold. However, we're not in an MVC structure. We could however
do something similar with API routes or maybe middleware.

I defer further work till there is enough repition to warrant further work on it.
However, a middleware command option is something that is possibly going to be added
in the next dozen commits if it comes down to it.

Something like: npm run penguino:api test which writeFileSync a new function with $
{name} normalized(? < maybe too much work)

Works good enough for now, but we might want to separate <name> and <dir>:
Potential issue: npm run penguino scaffold:full test/test is way too overloaded -
It's all in one: a directory, the file name, and worst of all, a component name as 
well*/

const program = new Command();

program.name("penguino").description("Custom CLI for project scaffolding");

program
  .command("scaffold:page <name>")
  .description("Scaffold a minimal AstroJS page")
  .action((name) => createPage(name, baseTemplate(name)));

/* Disabled till CMS is ready
program
  .command("scaffold:cms <name>")
  .description("Scaffold a CMS-connected page importing the Sanity client")
  .action((name) => createPage(name, cmsTemplate(name)));
*/

program
  .command("scaffold:component <name>")
  .description("Scaffold a React component in src/components")
  .action((name) => createComponent(name));

program
  .command("scaffold:action <name>")
  .description(
    "Scaffold an Astro action and have it added to src/action/index.ts"
  )
  .action((name) => createAction(name));

program.parse(process.argv);

// helpers

function createPage(name: string, content: string) {
  //get page name if nested with /
  const pageFile = path.join(process.cwd(), "src/pages", `${name}.astro`);

  if (fs.existsSync(pageFile)) {
    console.error(`${capitalizeName(name)} page already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(pageFile), { recursive: true });
  fs.writeFileSync(pageFile, content);
  console.log(`Created page at src/pages/${name}.astro`);
}

function createComponent(name: string) {
  const compDir = path.join(process.cwd(), "src/components");
  const file = path.join(compDir, `${name}.tsx`);
  if (fs.existsSync(file)) {
    console.error(`Component ${name} already exists.`);
    process.exit(1);
  }
  fs.mkdirSync(compDir, { recursive: true });
  fs.writeFileSync(file, componentTemplate(name));
  console.log(`Created component at src/components/${name}.tsx`);
}

function createAction(name: string) {
  const actDir = path.join(process.cwd(), "src/actions");
  const fileName = `${name}.ts`;
  const filePath = path.join(actDir, fileName);

  if (fs.existsSync(filePath)) {
    console.error(`Action ${name} already exists.`);
    process.exit(1);
  }

  //Create the action
  fs.writeFileSync(filePath, actionTemplate(name));
  console.log(`STEP 1 COMPLETE: Created the action at src/actions/${fileName}`);

  //Register it on the server export
  const indexPath = path.join(actDir, "index.ts");
  registerAction(name, indexPath);
}

function registerAction(name: string, indexPath: string) {
  //read the content
  let indexContent = fs.readFileSync(indexPath, "utf-8");

  //Create the import name
  const importName = toComponentName(name);

  // Check if import already exists
  if (!indexContent.includes(`import { ${importName} }`)) {
    indexContent =
      `import { ${importName} } from "./${name}";\n` + indexContent;
  }

  //I'll admit, I used GPT here. Regex is like Chinese written in Arabic
  const serverMatch = indexContent.match(
    /export const server\s*=\s*{([\s\S]*?)}/
  );

  if (serverMatch) {
    let serverBody = serverMatch[1].trim();

    if (!serverBody.includes(importName)) {
      //prettify the space. If you don't have a comma use prettier
      serverBody += `\n${importName}`;
      indexContent = indexContent.replace(
        /export const server\s*=\s*{([\s\S]*?)}/,
        `export const server = {\n  ${serverBody}\n}`
      );
    }
  } else {
    console.log("Malformed server object, can't register on server object.");
  }

  fs.writeFileSync(indexPath, indexContent);
  console.log(
    `STEP 2 COMPLETE: Updated src/actions/index.ts with ${importName}`
  );
}

// templates

function baseTemplate(name: string) {
  return `---
  //Layout
  import PublicLayout from "@/layouts/PublicLayout.astro";
---
    <PublicLayout>
      <main>
        <div>${name} page</div>;
      </main>
    </PublicLayout>
`;
}

/* Disabled until CMS is ready
function cmsTemplate(name: string) {
  const comp = toComponentName(name);
  return `
    import { type SanityDocument } from "next-sanity";
    import { client } from "~/lib/sanity/client";

    export default async function ${comp}Page() {
    const data = await client.fetch(\`*[_type == "page" && slug.current == "${name}"][0]\`);
    return (
        <div>
        <h1>{data?.title || "${comp}"}</h1>
        <div>{data?.content}</div>
        </div>
    );
    }
    `;
}
*/

function componentTemplate(name: string) {
  const comp = toComponentName(name);
  return `
    export default function ${comp}() {
        return <div>${comp} component</div>;
    }
`;
}

function actionTemplate(name: string) {
  const actionName = toComponentName(name);
  return `
    //Initiate Astro Action
    import { defineAction, ActionError } from "astro:actions";
    
    //Validation
    import { z } from "astro:schema";
    
    //Use Auth Service wrapper
    import AuthService from "@/lib/auth/auth-service";
    
    const auth = new AuthService();
    
    export const ${actionName} = defineAction({
      input: z.object({
        //Define schema here
      }),
      handler: async () => {
        //Define action here
        },
    });`;
}

//utils
function toComponentName(name: string) {
  return name
    .split(/[-_\/]/)
    .map((p) => capitalizeName(p))
    .join("");
}

function capitalizeName(name: string) {
  return name[0].toUpperCase() + name.slice(1);
}

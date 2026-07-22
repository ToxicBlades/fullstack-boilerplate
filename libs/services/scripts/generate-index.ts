import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKIP_DIRS = new Set(["node_modules", ".git", "dist"]);
const BACKSLASH_REGEX = /\\/g;
const TS_EXTENSION_REGEX = /\.(ts|tsx)$/;

async function collectExports(
  dir: string,
  rootDir: string,
  excludePatterns: Set<string> = new Set()
): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const exports: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Check if this directory should be excluded based on its relative path
      const relDirPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");
      const shouldExclude = excludePatterns.has(relDirPath);

      if (!(SKIP_DIRS.has(entry.name) || shouldExclude)) {
        const subExports = await collectExports(
          fullPath,
          rootDir,
          excludePatterns
        );
        exports.push(...subExports);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      const name = path.basename(entry.name, ext);

      if ((ext === ".ts" || ext === ".tsx") && name !== "index") {
        const relPath =
          "./" +
          path
            .relative(rootDir, fullPath)
            .replace(BACKSLASH_REGEX, "/")
            .replace(TS_EXTENSION_REGEX, "");
        exports.push(`export * from '${relPath}';`);
      }
    }
  }

  return exports;
}

/**
 * Generate a file (index.ts, server.ts, client.ts) that exports from specific subfolders.
 */
interface TargetConfig {
  excludeDirs?: string[];
  extraExports?: string[];
  includeDirs: string[];
  targetFile: string;
}

async function generateCustomIndex(
  rootDir: string,
  { targetFile, includeDirs, extraExports = [], excludeDirs = [] }: TargetConfig
): Promise<void> {
  const allExports: string[] = [];
  // Convert excludeDirs to relative paths from rootDir
  const excludePatternsSet = new Set(
    excludeDirs.map((pattern) => pattern.replace(/\\/g, "/"))
  );

  for (const dir of includeDirs) {
    const folderPath = path.join(rootDir, dir);
    try {
      const exportsArr = await collectExports(
        folderPath,
        rootDir,
        excludePatternsSet
      );
      allExports.push(...exportsArr);
      // biome-ignore lint/suspicious/noExplicitAny: <its an error>
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.warn(`Skipped missing folder: ${dir}`);
      } else {
        throw err;
      }
    }
  }

  const contentLines = [...allExports, ...extraExports];

  if (contentLines.length === 0) {
    console.log(`No exports found for ${targetFile}`);
    return;
  }

  const biomeIgnoreComment =
    "/** biome-ignore-all lint/performance/noBarrelFile: auto-generated barrel file */\n";
  const content = `${biomeIgnoreComment}${contentLines.join("\n")}\n`;
  await fs.writeFile(path.join(rootDir, targetFile), content);
  console.log(`Generated ${targetFile}`);
}

async function main(): Promise<void> {
  const rootDir = path.resolve(__dirname, "../");

  const targets: TargetConfig[] = [
    {
      targetFile: "index.ts",
      includeDirs: [
        "src/types",
        "src/static",
        "src/api-routes",
        "src/zod-validators",
      ],
    },
    // # use client.ts when somecode which is client only appears
    // {
    //   targetFile: "client.ts",
    //   includeDirs: ["src/static"],
    // },
    {
      targetFile: "server.ts",
      includeDirs: ["src/services"],
      excludeDirs: ["src/services/common"],
    },
  ];

  for (const target of targets) {
    await generateCustomIndex(rootDir, target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

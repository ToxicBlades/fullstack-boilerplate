# Graph Report - fullstack-boilerplate  (2026-08-28)

## Corpus Check
- 163 files · ~35,570 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1276 nodes · 1650 edges · 147 communities (86 shown, 61 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5c9195b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- field.tsx
- drawer.tsx
- sidebar.tsx
- navigation-menu.tsx
- breadcrumb.tsx
- tabs.tsx
- auth-session-cache.ts
- provider.tsx
- utils.ts
- devDependencies
- framer-motion
- dependencies
- @radix-ui/react-collapsible
- carousel.tsx
- @radix-ui/react-dialog
- item.tsx
- logger/src/index.ts
- scripts
- @radix-ui/react-menubar
- @radix-ui/react-popover
- dependencies
- @radix-ui/react-toggle-group
- server-only
- tw-animate-css
- devDependencies
- scripts
- devDependencies
- logger/package.json
- compilerOptions
- compilerOptions
- scripts
- command.tsx
- dependencies
- components.json
- dependencies
- menubar.tsx
- design-system/tsconfig.json
- email/tsconfig.json
- logger/tsconfig.json
- services/tsconfig.json
- compilerOptions
- compilerOptions
- context-menu.tsx
- dropdown-menu.tsx
- Translate your site
- devDependencies
- @project/email
- Markdown Features
- include
- compilerOptions
- form.tsx
- chart.tsx
- input-group.tsx
- devDependencies
- scripts
- select.tsx
- seo/tsconfig.json
- development
- layout.tsx
- usefull-apps.md
- popover.tsx
- generate-index.ts
- toggle-group.tsx
- Tutorial Intro
- docs/package.json
- Website
- init.sh
- HomepageFeatures/index.tsx
- items-model.ts
- alert.tsx
- Create a Document
- Deploy your site
- landing/README.md
- json-ld.tsx
- typescript-config/package.json
- Create a Blog Post
- express.d.ts
- design-system/postcss.config.mjs
- contact.tsx
- docusaurus.config.ts
- sidebars.ts
- markdown-page.mdx
- coverage.md
- next.config.ts
- landing/postcss.config.mjs
- project-back/README.md
- cmdk
- date-fns
- embla-carousel-react
- geist
- @hookform/resolvers
- clsx
- lucide-react
- next-themes
- radix-ui
- @radix-ui/react-accordion
- @radix-ui/react-aspect-ratio
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-context-menu
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-icons
- @radix-ui/react-label
- @radix-ui/react-navigation-menu
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slider
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-toggle
- @radix-ui/react-tooltip
- react
- react-hook-form
- react-moveable
- react-resizable-panels
- recharts
- shadcn
- sonner
- tailwind-merge
- vaul
- back-api-routes.ts
- clear-modules.sh
- local-init-rustfs.sh

## God Nodes (most connected - your core abstractions)
1. `cn()` - 282 edges
2. `compilerOptions` - 16 edges
3. `compilerOptions` - 16 edges
4. `scripts` - 13 edges
5. `Button()` - 12 edges
6. `scripts` - 12 edges
7. `scripts` - 11 edges
8. `env` - 9 edges
9. `@project/email` - 9 edges
10. `compilerOptions` - 8 edges

## Surprising Connections (you probably didn't know these)
- `ReturnButton()` --calls--> `cn()`  [EXTRACTED]
  libs/design-system/components/return-button.tsx → libs/design-system/lib/utils.ts
- `ThemeSwitcher()` --calls--> `cn()`  [EXTRACTED]
  libs/design-system/components/theme-switcher.tsx → libs/design-system/lib/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  libs/design-system/components/ui/alert-dialog.tsx → libs/design-system/lib/utils.ts
- `AlertDialogContent()` --calls--> `cn()`  [EXTRACTED]
  libs/design-system/components/ui/alert-dialog.tsx → libs/design-system/lib/utils.ts
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  libs/design-system/components/ui/alert-dialog.tsx → libs/design-system/lib/utils.ts

## Import Cycles
- None detected.

## Communities (147 total, 61 thin omitted)

### Community 0 - "cn"
Cohesion: 0.08
Nodes (38): AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+30 more)

### Community 1 - "field.tsx"
Cohesion: 0.16
Nodes (12): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSeparator() (+4 more)

### Community 2 - "drawer.tsx"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 3 - "sidebar.tsx"
Cohesion: 0.06
Nodes (39): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), Sidebar() (+31 more)

### Community 4 - "navigation-menu.tsx"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 5 - "breadcrumb.tsx"
Cohesion: 0.25
Nodes (6): BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 6 - "tabs.tsx"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 7 - "auth-session-cache.ts"
Cohesion: 0.11
Nodes (22): config, itemsRouter, auth, authPool, auth, authPool, CachedAuthUser, getCachedAuthUser() (+14 more)

### Community 8 - "provider.tsx"
Cohesion: 0.40
Nodes (3): TooltipProvider(), DesignSystemProviderProperties, ThemeProvider()

### Community 9 - "utils.ts"
Cohesion: 0.06
Nodes (15): ThemeSwitcher(), Badge(), badgeVariants, Checkbox(), HoverCardContent(), InputOTP(), InputOTPGroup(), InputOTPSlot() (+7 more)

### Community 10 - "devDependencies"
Cohesion: 0.06
Nodes (35): dependencies, next, @project/design-system, @project/seo, @project/services, react, react-dom, devDependencies (+27 more)

### Community 12 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, envalid, nodemailer, @project/logger, react, react-dom, react-email, resend (+27 more)

### Community 14 - "carousel.tsx"
Cohesion: 0.06
Nodes (35): ReturnButton(), ReturnButtonProps, AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+27 more)

### Community 16 - "item.tsx"
Cohesion: 0.13
Nodes (17): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Item(), ItemActions(), ItemContent(), ItemDescription() (+9 more)

### Community 17 - "logger/src/index.ts"
Cohesion: 0.10
Nodes (18): envEmail, processEnv, getTransporter(), sendTransactionalEmail(), EmailAttachment, SendEmailInput, createConsoleDestination(), createLogger() (+10 more)

### Community 18 - "scripts"
Cohesion: 0.07
Nodes (29): @biomejs/biome, dependencies, typescript, devDependencies, @biomejs/biome, react-doctor, ultracite, libs/* (+21 more)

### Community 21 - "dependencies"
Cohesion: 0.07
Nodes (29): http-status-codes, dependencies, dotenv, envalid, http-status-codes, qs, tslib, tsx (+21 more)

### Community 25 - "devDependencies"
Cohesion: 0.08
Nodes (23): dependencies, lodash.merge, react, schema-dts, devDependencies, next, @project/typescript-config, @types/lodash.merge (+15 more)

### Community 26 - "scripts"
Cohesion: 0.05
Nodes (40): dependencies, better-auth, cors, dotenv, envalid, express, helmet, knex (+32 more)

### Community 27 - "devDependencies"
Cohesion: 0.08
Nodes (25): devDependencies, jest, @project/typescript-config, supertest, ts-jest, tsup, tsx, @types/cors (+17 more)

### Community 28 - "logger/package.json"
Cohesion: 0.09
Nodes (21): dependencies, envalid, pino, pino-pretty, devDependencies, @project/typescript-config, @types/node, typescript (+13 more)

### Community 29 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, lib (+13 more)

### Community 30 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, lib (+13 more)

### Community 31 - "scripts"
Cohesion: 0.10
Nodes (20): devDependencies, @playwright/test, @project/typescript-config, @types/node, typescript, @project/typescript-config, @types/node, typescript (+12 more)

### Community 33 - "command.tsx"
Cohesion: 0.12
Nodes (15): Command(), CommandDialog(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 36 - "dependencies"
Cohesion: 0.15
Nodes (13): class-variance-authority, input-otp, dependencies, class-variance-authority, input-otp, @radix-ui/react-alert-dialog, @radix-ui/react-progress, react-day-picker (+5 more)

### Community 41 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 42 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, clsx, @docusaurus/core, @docusaurus/faster, @docusaurus/preset-classic, @mdx-js/react, prism-react-renderer, react (+9 more)

### Community 47 - "menubar.tsx"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 48 - "design-system/tsconfig.json"
Cohesion: 0.12
Nodes (16): compilerOptions, paths, plugins, strictNullChecks, types, exclude, extends, include (+8 more)

### Community 49 - "email/tsconfig.json"
Cohesion: 0.12
Nodes (16): compilerOptions, paths, plugins, strictNullChecks, types, exclude, extends, include (+8 more)

### Community 50 - "logger/tsconfig.json"
Cohesion: 0.12
Nodes (16): compilerOptions, paths, plugins, strictNullChecks, types, exclude, extends, include (+8 more)

### Community 51 - "services/tsconfig.json"
Cohesion: 0.12
Nodes (16): compilerOptions, paths, plugins, strictNullChecks, types, exclude, extends, include (+8 more)

### Community 52 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowJs, jsx, module, moduleResolution, noEmit, paths, plugins (+8 more)

### Community 53 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, lib, module, moduleResolution, noEmit, rootDir, types, extends (+7 more)

### Community 58 - "context-menu.tsx"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 59 - "dropdown-menu.tsx"
Cohesion: 0.12
Nodes (9): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 60 - "Translate your site"
Cohesion: 0.13
Nodes (12): Congratulations!, What's next?, Add a Version Dropdown, Create a docs version, Manage Docs Versions, Update an existing version, Add a Locale Dropdown, Build your localized site (+4 more)

### Community 68 - "devDependencies"
Cohesion: 0.13
Nodes (14): devDependencies, @project/typescript-config, @types/node, @types/react, typescript, vitest, @project/typescript-config, @types/node (+6 more)

### Community 69 - "@project/email"
Cohesion: 0.13
Nodes (14): Adding New Templates, Available Templates, Basic Setup, ContactTemplate, Dependencies, Development, Environment Variables, Features (+6 more)

### Community 70 - "Markdown Features"
Cohesion: 0.14
Nodes (12): Create a Page, Create your first Markdown Page, Create your first React Page, Admonitions, Code Blocks, Front Matter, Heading Ids {/* #my-custom-id */}, Headings {/* #my-heading-id */} (+4 more)

### Community 71 - "include"
Cohesion: 0.14
Nodes (13): compilerOptions, paths, strictNullChecks, extends, include, ../../libs/*, @project/typescript-config/nextjs.json, **/*.ts (+5 more)

### Community 72 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, outDir, paths, rootDir, types, extends, include, node (+5 more)

### Community 77 - "form.tsx"
Cohesion: 0.23
Nodes (10): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext, FormItemContextValue, FormLabel() (+2 more)

### Community 82 - "chart.tsx"
Cohesion: 0.21
Nodes (11): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION (+3 more)

### Community 83 - "input-group.tsx"
Cohesion: 0.21
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 91 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, @docusaurus/module-type-aliases, @docusaurus/tsconfig, @docusaurus/types, @types/react, typescript, @types/react, typescript (+3 more)

### Community 92 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, clear, deploy, docusaurus, serve, start, swizzle (+3 more)

### Community 99 - "select.tsx"
Cohesion: 0.18
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 103 - "seo/tsconfig.json"
Cohesion: 0.20
Nodes (9): compilerOptions, strictNullChecks, exclude, extends, include, node_modules, @project/typescript-config/nextjs.json, **/*.ts (+1 more)

### Community 104 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.5%, last 3 chrome version, last 3 firefox version, last 5 safari version, not dead (+1 more)

### Community 105 - "layout.tsx"
Cohesion: 0.25
Nodes (6): geist, geistMono, metadata, author, createMetadata(), MetadataGenerator

### Community 106 - "usefull-apps.md"
Cohesion: 0.22
Nodes (8): App store and google market screenshot generator, Automation, Mobile, N8N, NocoDB, Strapi - headless cms, This file contains open soure solutions which are easy to selfhost that might be usefull for product, Web

### Community 118 - "popover.tsx"
Cohesion: 0.25
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 119 - "generate-index.ts"
Cohesion: 0.32
Nodes (7): collectExports(), __dirname, __filename, generateCustomIndex(), main(), SKIP_DIRS, TargetConfig

### Community 122 - "toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 123 - "Tutorial Intro"
Cohesion: 0.33
Nodes (5): Generate a new site, Getting Started, Start your site, Tutorial Intro, What you'll need

### Community 124 - "docs/package.json"
Cohesion: 0.33
Nodes (5): engines, node, name, private, version

### Community 125 - "Website"
Cohesion: 0.33
Nodes (5): Build, Deployment, Installation, Local Development, Website

### Community 129 - "init.sh"
Cohesion: 0.60
Nodes (5): ensure_app_credentials(), ensure_buckets(), init.sh script, wait_for_rustfs(), write_credentials()

### Community 132 - "items-model.ts"
Cohesion: 0.40
Nodes (4): CreateItemBodySchema, NoteIdParamsSchema, NoteVisibilitySchema, PatchItemBodySchema

### Community 134 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert(), AlertDescription(), AlertTitle(), alertVariants

### Community 135 - "Create a Document"
Cohesion: 0.50
Nodes (3): Configure the Sidebar, Create a Document, Create your first Doc

### Community 136 - "Deploy your site"
Cohesion: 0.50
Nodes (3): Build your site, Deploy your site, Deploy your site

### Community 137 - "landing/README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 141 - "json-ld.tsx"
Cohesion: 0.67
Nodes (3): escapeJsonForHtml(), JsonLd(), JsonLdProps

### Community 142 - "typescript-config/package.json"
Cohesion: 0.50
Nodes (3): name, private, version

## Knowledge Gaps
- **495 isolated node(s):** `config`, `name`, `version`, `private`, `docusaurus` (+490 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `field.tsx`, `drawer.tsx`, `sidebar.tsx`, `navigation-menu.tsx`, `breadcrumb.tsx`, `alert.tsx`, `tabs.tsx`, `utils.ts`, `carousel.tsx`, `item.tsx`, `command.tsx`, `menubar.tsx`, `context-menu.tsx`, `dropdown-menu.tsx`, `form.tsx`, `chart.tsx`, `input-group.tsx`, `select.tsx`, `popover.tsx`, `toggle-group.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `framer-motion`, `@radix-ui/react-collapsible`, `@radix-ui/react-dialog`, `@radix-ui/react-menubar`, `@radix-ui/react-popover`, `@radix-ui/react-toggle-group`, `server-only`, `tw-animate-css`, `cmdk`, `date-fns`, `embla-carousel-react`, `geist`, `@hookform/resolvers`, `clsx`, `lucide-react`, `next-themes`, `radix-ui`, `@radix-ui/react-accordion`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-context-menu`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-icons`, `@radix-ui/react-label`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-tooltip`, `react`, `react-hook-form`, `react-moveable`, `devDependencies`, `react-resizable-panels`, `recharts`, `shadcn`, `sonner`, `tailwind-merge`, `vaul`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `config`, `name`, `version` to the rest of the system?**
  _495 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.07678075855689177 - nodes in this community are weakly interconnected._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05735430157261795 - nodes in this community are weakly interconnected._
- **Should `auth-session-cache.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11095305832147938 - nodes in this community are weakly interconnected._
- **Should `utils.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
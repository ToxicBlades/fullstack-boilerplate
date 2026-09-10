FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@11.22.0 --activate

WORKDIR /workspace

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/project/package.json apps/project/package.json
COPY libs/design-system/package.json libs/design-system/package.json
COPY libs/services/package.json libs/services/package.json
COPY libs/typescript-config/package.json libs/typescript-config/package.json

RUN pnpm install --frozen-lockfile --filter @project...

FROM deps AS builder

COPY tsconfig.json ./tsconfig.json
COPY apps/project apps/project
COPY libs/design-system libs/design-system
COPY libs/services libs/services
COPY libs/typescript-config libs/typescript-config

RUN pnpm --filter @project build

FROM node:24-alpine AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY --from=builder --chown=node:node /workspace/apps/project/.next/standalone ./
COPY --from=builder --chown=node:node /workspace/apps/project/.next/static ./apps/project/.next/static
COPY --from=builder --chown=node:node /workspace/apps/project/public ./apps/project/public

USER node

EXPOSE 3000

CMD ["node", "apps/project/server.js"]

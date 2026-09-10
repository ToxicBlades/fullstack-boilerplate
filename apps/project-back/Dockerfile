FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@11.22.0 --activate

WORKDIR /workspace

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/project-back/package.json apps/project-back/package.json
COPY libs/analytics/package.json libs/analytics/package.json
COPY libs/logger/package.json libs/logger/package.json
COPY libs/typescript-config/package.json libs/typescript-config/package.json

RUN pnpm install --frozen-lockfile --filter @project/back...

FROM deps AS builder

COPY tsconfig.json ./tsconfig.json
COPY apps/project-back apps/project-back
COPY libs/analytics libs/analytics
COPY libs/logger libs/logger
COPY libs/typescript-config libs/typescript-config

RUN pnpm --filter @project/back build
RUN pnpm deploy --legacy --filter @project/back --prod /prod/project-back
RUN mkdir -p /prod/project-back/dist \
  && cp -R apps/project-back/dist/. /prod/project-back/dist/

# This target retains the TypeScript tooling required by the repository's
# existing db:setup command (Knex migrations plus Better Auth migrations).
FROM builder AS migrator

ENV NODE_ENV=production

CMD ["pnpm", "--filter", "@project/back", "db:setup"]

FROM node:24-alpine AS runner

ENV NODE_ENV=production
ENV BACK_HOST=0.0.0.0
ENV BACK_PORT=3010

WORKDIR /app

COPY --from=builder --chown=node:node /prod/project-back ./

USER node

EXPOSE 3010

CMD ["node", "dist/index.js"]

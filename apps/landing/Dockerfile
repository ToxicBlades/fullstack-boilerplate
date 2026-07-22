FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /workspace

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/landing/package.json apps/landing/package.json
COPY apps/project/package.json apps/project/package.json
COPY libs/*/package.json libs/

RUN pnpm install --frozen-lockfile

FROM deps AS builder

COPY . .
RUN pnpm --filter ./apps/landing build

FROM node:22-slim AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=builder /workspace/apps/landing/.next/standalone ./
COPY --from=builder /workspace/apps/landing/.next/static ./apps/landing/.next/static
COPY --from=builder /workspace/apps/landing/public ./apps/landing/public

EXPOSE 3000

CMD ["node", "apps/landing/server.js"]

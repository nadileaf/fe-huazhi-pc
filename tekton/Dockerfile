FROM cr.mesoor.com/dev-dependencies/node@sha256:e96618520c7db4c3e082648678ab72a49b73367b9a1e7884cf75ac30a198e454 AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./ 
# COPY patches patches
RUN npm install -g pnpm --registry=https://registry.npmmirror.com && pnpm install --registry=https://registry.npmmirror.com

FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BUILD_ENV=production
ENV BUILD_ENV=${BUILD_ENV}


COPY .env.${BUILD_ENV} .env.production

RUN npm run fix
RUN npm run build

FROM base as runner

WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080
ENV PORT 8080

CMD ["node", "server.js"]

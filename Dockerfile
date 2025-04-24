# Base image
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Build the app
FROM deps AS builder
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/apps/web/.next /app/apps/web/.next
COPY --from=builder /app/apps/web/public /app/apps/web/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages /app/packages

# Copy package.json files
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/apps/api/package.json /app/apps/api/
COPY --from=builder /app/apps/web/package.json /app/apps/web/

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"]

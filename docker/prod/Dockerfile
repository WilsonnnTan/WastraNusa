# ============================================
# Base Stage
# ============================================
ARG NODE_VERSION=24-alpine
FROM node:${NODE_VERSION} AS base

RUN npm install -g pnpm

WORKDIR /app

# ============================================
# Dependencies Stage
# ============================================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

# Install ALL deps (including dev) for building
RUN pnpm install --frozen-lockfile

# ============================================
# Builder Stage
# ============================================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm run build

# ============================================
# Stage 3: Create Production Image
# ============================================

# Use the same Node.js version for the final production container
FROM node:${NODE_VERSION} AS runner

ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Set the working directory inside the container
WORKDIR /app

# Copy files BEFORE switching user, with correct ownership
COPY --chown=node:node --from=builder /app/.next/standalone ./      
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public              

# Switch to non-root user AFTER copying files
USER node

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]
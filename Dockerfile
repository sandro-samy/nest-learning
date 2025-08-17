# Use the official Node.js image as base
FROM node:18-alpine AS base

# Enable corepack to use pnpm
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

#############################################
# Dependencies stage
#############################################
FROM base AS dependencies

# Install dependencies
RUN pnpm install --frozen-lockfile

#############################################
# Build stage
#############################################
FROM base AS build

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Prune dev dependencies for production
RUN pnpm prune --prod

#############################################
# Production stage
#############################################
FROM node:18-alpine AS production

# Enable corepack for pnpm
RUN corepack enable

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Copy production dependencies from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy built application
COPY --from=build /app/dist ./dist
# If you have public assets, copy them too
# COPY --from=build /app/public ./public

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["pnpm", "start"]
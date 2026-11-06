FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and client package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci
RUN cd client && npm ci

# Copy source
COPY . .

# Build frontend
RUN npm run build

# Remove development dependencies to keep container light
RUN npm prune --production

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app /app

EXPOSE 5000

CMD ["node", "server/index.js"]

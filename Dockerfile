# Stage 1: Build the Next.js app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the Next.js app
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app/next.config.mjs /app/package.json /app/public /app/.next /app/node_modules ./

# Expose the port that Next.js runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]

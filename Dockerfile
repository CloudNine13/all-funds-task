FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"
COPY packages/frontend/package.json packages/frontend/bun.lock ./
RUN bun install
COPY packages/frontend ./
RUN bun run build

FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"
COPY packages/backend/package.json packages/backend/bun.lock ./
RUN bun install
COPY packages/backend ./

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"
COPY --from=backend-builder /app/backend ./packages/backend
COPY --from=frontend-builder /app/frontend/dist ./packages/backend/public
RUN cd packages/backend && bun install --production

EXPOSE 3000
WORKDIR /app/packages/backend
CMD ["bun", "start"]
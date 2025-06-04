# Estágio de construção
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências (incluindo devDependencies)
RUN yarn install --frozen-lockfile

# Copia o resto do código
COPY . .

# Build da aplicação
RUN yarn build

# Estágio final
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]
# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código
COPY . .

# Compila a aplicação
RUN yarn build

# Etapa final
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário do estágio "builder"
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]

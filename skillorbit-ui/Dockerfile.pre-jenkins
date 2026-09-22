# ==============================
# ✅ STAGE 1 — BUILD REACT APP
# ==============================

# ✅ lighter than node:18 full image
FROM node:20-alpine AS builder   

# ✅ STEP 1 — Set working directory
WORKDIR /app

# ✅ STEP 2 — Copy only package files (better caching)
COPY package*.json ./

# ✅ STEP 3 — Install dependencies

RUN npm ci --silent

# ✅ STEP 4 — Copy source code
COPY . .

#ARGS for build-time environment variables
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# ✅ STEP 5 — Build production bundle
RUN npm run build

# ==============================
# ✅ STAGE 2 — SERVE WITH NGINX
# ==============================

# ✅ lightweight production server (~5MB)
FROM nginx:alpine   

# ✅ STEP 6 — Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# ✅ STEP 7 — Copy built React app from builder
COPY --from=builder /app/build /usr/share/nginx/html

# ✅ STEP 8 — Apply custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ✅ STEP 9 — Expose port
EXPOSE 80

# ✅ STEP 10 — Start nginx
CMD ["nginx", "-g", "daemon off;"]
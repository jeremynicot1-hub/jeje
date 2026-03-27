#!/bin/bash
# Script de déploiement automatique pour Portfolio

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Début du déploiement ===${NC}"

# 1. Mise à jour du code
echo -e "${GREEN}[1/3] Récupération du code (git pull)...${NC}"
git pull origin main

# 2. Installation des dépendances
echo -e "${GREEN}[2/3] Installation des dépendances (npm install)...${NC}"
npm install

# 3. Build du projet
echo -e "${GREEN}[3/3] Construction du projet (npm run build)...${NC}"
npm run build

echo -e "${BLUE}=== Déploiement terminé ! Le site est à jour. ===${NC}"

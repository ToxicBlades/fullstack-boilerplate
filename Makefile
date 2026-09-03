SHELL := /bin/sh

COMPOSE := docker compose -f docker-compose.yaml
BACKEND := pnpm --filter @project/back

.PHONY: help setup dev-setup infra-up rustfs-init db-migrate down logs

help:
	@echo "Available targets:"
	@echo "  make setup       Alias for make dev-setup"
	@echo "  make dev-setup   Start local services, initialize RustFS, and run DB migrations"
	@echo "  make infra-up    Start PostgreSQL, Redis, RustFS, and Mailpit"
	@echo "  make rustfs-init Initialize RustFS buckets and app credentials"
	@echo "  make db-migrate  Run application and Better Auth migrations"
	@echo "  make down        Stop local services"
	@echo "  make logs        Follow local service logs"

setup: dev-setup

dev-setup: infra-up rustfs-init db-migrate
	@echo "Development environment is ready."

infra-up:
	$(COMPOSE) up -d --wait db redis rustfs mailpit

rustfs-init:
	sh scripts/local-init-rustfs.sh

db-migrate:
	$(BACKEND) db:setup

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f db redis rustfs mailpit

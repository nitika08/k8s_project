FROM postgres:15-alpine

# Add init scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Environment variables set through Kubernetes config
ENV POSTGRES_DB=notesdb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

EXPOSE 5432

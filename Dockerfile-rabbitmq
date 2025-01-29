# Use the official RabbitMQ image with the management plugin
FROM rabbitmq:management

# Expose RabbitMQ default communication and management ports
EXPOSE 5672 15672

# Optional: Set environment variables (e.g., default user and password)
ENV RABBITMQ_DEFAULT_USER=guest
ENV RABBITMQ_DEFAULT_PASS=guest

# Optional: Define a volume for persistent storage
VOLUME /var/lib/rabbitmq

# Start RabbitMQ service
CMD ["rabbitmq-server"]

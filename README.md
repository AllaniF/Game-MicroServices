# Dungeon Game - Microservices Architecture

## Project Overview
This project is a **Dungeon Game** built using a **microservices architecture**. Each microservice is responsible for different game functionalities such as managing entities, fights, maps, and more. The services communicate with each other to create a seamless gameplay experience.

## Documentation
- **OpenAPI Documentation**: Available in the `documentations` folder.
- **Architecture Diagram**: The overall structure of the microservices can be found in the `documentations` folder.

## Running the Application
To run the entire system, use **Docker Compose**:

```sh
docker compose up --build
```
This command will start all necessary microservices and dependencies in detached mode.

## Notes

- Ensure Docker and Docker Compose are installed on your system.
- The application services are configured in the docker-compose.yml file.
- Logs can be retrieved using Log Service API.


Enjoy the game! 🎮
# Usa la imagen oficial de OpenJDK 17
FROM eclipse-temurin:21-jdk-jammy

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo jar (cambia el nombre si no es así)
COPY /demo-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto que usará la app (tomará el puerto de la variable PORT o 8080 por defecto)
ENV PORT=8080
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]

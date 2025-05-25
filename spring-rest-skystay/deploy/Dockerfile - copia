FROM openjdk:21-jdk-slim
COPY demo-0.0.1-SNAPSHOT.jar /app/mi-api.jar 
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "mi-api.jar"]

# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar deploy.jar

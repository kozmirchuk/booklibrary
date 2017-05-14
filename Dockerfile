FROM java:8-jre-alpine
EXPOSE 8080
ADD ./target/booklibrary-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/booklibrary-1.0-SNAPSHOT.jar"]


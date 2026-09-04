FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY .mvn .mvn
COPY mvnw pom.xml ./

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

COPY src src

CMD ["sh", "-c", "java -jar target/demo-0.0.1-SNAPSHOT.jar"]

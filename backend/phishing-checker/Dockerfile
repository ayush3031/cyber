
#Official jdk for java
FROM eclipse-temurin:24-jdk AS build

#setting working dir in container
WORKDIR /app

#copy maven wrapper and project files
COPY pom.xml mvnw ./

COPY .mvn .mvn

RUN chmod +x ./mvnw

#download mvn dependencies as batch mode
RUN ./mvnw dependency:go-offline -B

#copy source code
COPY src ./src

#build actual application
RUN ./mvnw clean package -DskipTests

#Run light-weight java runtime environment
FROM eclipse-temurin:24-jre

#give working directory
WORKDIR /app

#Copy built jar from build stage
COPY --from=build /app/target/*.jar app.jar

#expose app port
EXPOSE 8080

#Run jar
ENTRYPOINT ["java","-jar","app.jar"]

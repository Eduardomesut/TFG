# 🐳 Instrucciones para el Build en Docker de la API

## 1. Generar el archivo JAR de la API

Ejecuta el siguiente comando desde la raíz del proyecto (donde está el `pom.xml`):

```bash
./mvnw clean package
```

Esto compilará la aplicación y generará un archivo `.jar` en la carpeta `target/`.

---

## 2. Construir y lanzar los contenedores con Docker Compose

```bash
docker-compose build
docker-compose up
```

Esto construye las imágenes (si es necesario) y lanza los contenedores definidos en tu `docker-compose.yml`.

---

## 3. Entrar en la base de datos de docker
```bash
docker exec -it contenedor-mariadb bash
```

## 4. Detener los servicios y borrar volúmenes

> Recomendado al hacer actualizaciones importantes o para limpiar el entorno completamente.

```bash
docker-compose down -v
```

Este comando detiene los contenedores y elimina los volúmenes persistentes (como los datos de la base de datos).

## 📌 API Endpoints Documentation

### 1. Users (`/user`)
* **Register a new user (Patient or Doctor)**
  * **Method:** `POST`
  * **Endpoint:** `/user`
  * **Body (JSON):**
    ```json
    {
      "fullName": "Ahmad Patient",
      "email": "ahmad@example.com",
      "password": "password123",
      "role": "patient"
    }
    ```
    *(Note: `role` can be `"patient"` or `"doctor"`)*

* **Get all users**
  * **Method:** `GET`
  * **Endpoint:** `/user`

---

### 2. Authentication (`/auth`)
* **Login (Get JWT Access Token)**
  * **Method:** `POST`
  * **Endpoint:** `/auth/login`
  * **Body (JSON):**
    ```json
    {
      "email": "ahmad@example.com",
      "password": "password123"
    }
    ```

---

### 3. Doctors (`/doctor`)
* **Create a doctor profile (Linked to a user with role `doctor`)**
  * **Method:** `POST`
  * **Endpoint:** `/doctor`
  * **Body (JSON):**
    ```json
    {
      "userId": 2,
      "specialization": "Cardiology",
      "consultationFee": "100$"
    }
    ```

* **Get all doctor**
  * **Method:** `GET`
  * **Endpoint:** `/doctor`

---

### 4. Bookings (`/booking`)
* **Create a new appointment booking**
  *(Includes strict business validations: no past dates, maximum 30 days in advance, working hours 09:00 - 17:00, and prevention of double-booking).*
  * **Method:** `POST`
  * **Endpoint:** `/booking`
  * **Body (JSON):**
    ```json
    {
      "doctorId": 1,
      "patientId": 1,
      "appointmentDate": "2026-09-15T11:00:00.000Z"
    }
    ```

* **Get all bookings**
  * **Method:** `GET`
  * **Endpoint:** `/booking`

---



## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy



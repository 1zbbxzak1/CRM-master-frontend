# MasterskaYa (Frontend)
MasterskaYa is a web application where master craftsmen can upload their products, accept applications for them and maintain a customer base.

[Link to the Backend project](https://github.com/AnTaif/CRM-master-backend.git)

Developed for the UrFU Project Practice 2024 (4th semester)

## Contents

1. <a href = "#stack">Tech Stack</a>
2. <a href = "#start">Getting Started</a>

<a name = stack></a>  
## Tech Stack
**Frameworks & Libraries:**
- HTML
- CSS
- TypeScript
- Angular
- Taiga UI
- VK API (for auth with vk)

**Deployments:** Docker


<a name = start></a>
## Getting Started
  1. Clone the repository:
  ```bash 
  git clone https://github.com/1zbbxzak1/CRM-master-frontend.git
  ```
  2. Navigate to the project directory:
    ```bash
    cd CRM-master-frontend
    ```

Next, two launch scenarios:

**First:**
  3. Build Docker Image:
  ```bash
  docker build -t crm-master-frontend .
  ```
  4. Running Docker Container:
  ```bash
  docker run --name crm-master-frontend --rm -p 4200:4200 crm-master-frontend
  ```
  5. Go to:
  ```bash
  http://localhost:4200
  ```
  6. To stop the application and remove the container, run:
  ```bash
  docker stop crm-master-frontend
  ```

**Second:**
  3. Install Angular: 
  ```bash
  npm install -g @angular/cli`
  ```
  4. Install packages:
  ```bash
  npm install
  ```
  5. After that, start the project: 
  ```bash
  npm start
  ```
  4. Go to:
  ```bash
  http://localhost:4200
  ```
  5. To stop the application and remove the container, press in the terminal:
  ```bash
  Ctrl + C
  ```
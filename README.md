# Ritesh Boje - Personal Portfolio Website

A full-stack portfolio website with a modern landing page, projects, skills, about section, contact form, Node.js/Express backend, and MongoDB database.

## How to run

1. Install Node.js and MongoDB.
2. Open this folder in VS Code.
3. Open terminal and run:

```bash
npm install
copy .env.example .env
npm start
```

4. Open browser:

```text
http://localhost:5000
```

## MongoDB

By default it uses local MongoDB:

```text
mongodb://127.0.0.1:27017/ritesh_portfolio
```

For MongoDB Atlas, paste your Atlas connection string in `.env` as `MONGO_URI`.

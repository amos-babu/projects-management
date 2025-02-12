# Personal Portfolio

Welcome to my personal portfolio! This project showcases my skills, experience, and the projects I have worked on as a developer. The portfolio is built using **React**, designed to be fully responsive, and offers an engaging user experience.

---

## Features

- **Introduction:** A brief introduction about who I am and what I do.
- **Projects Showcase:** A detailed display of projects I have worked on, with links to their GitHub repositories.
- **Contact Form:** Allows visitors to reach out to me directly.
- **Responsive Design:** Looks great on all devices, from desktops to smartphones.
- **Technologies Used Section:** Highlights my tech stack and expertise.

---

## Technologies Used

- **React**: Frontend framework for building a dynamic UI.
- **Tailwind CSS**: For styling the application with modern, utility-first classes.
- **React Router**: For navigation between pages.
-  **Typescript**: For handling the type setting nature of javascript.
- **EmailJS**: For handling the contact form submissions.

---

## Installation

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/amos-babu/personal-portfolio.git
   ```

2. Navigate to the project folder:
   ```bash
   cd personal-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## Folder Structure

```
portfolio/
├── public/
│   ├── favicon.ico       # Favicon
│   ├── index.html        # HTML template
│   └── assets/           # Static assets like images
├── src/
│   ├── components/       # Reusable components (e.g., Navbar, Footer, ProjectCard)
│   ├── pages/            # Main pages (e.g., Home, Projects, About, Contact)
│   ├── App.js            # Main React component
│   ├── index.js          # Entry point
│   └── styles/           # Custom styles if any
├── .gitignore
├── package.json
└── README.md
```

---

## Deployment

This portfolio can be deployed to platforms like **Netlify**, **Vercel**, or **GitHub Pages**. For example:

### Deploying to GitHub Pages:
1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add the following scripts to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-portfolio",
   "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
   }
   ```

3. Deploy the app:
   ```bash
   npm run deploy
   ```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

Feel free to reach out to me:

- Email: amos.babu@yahoo.com
- LinkedIn: [Amos Babu](https://www.linkedin.com/in/amos-babu-275597202/)
- My Portfolio: [Amos Babu](https://amos-babu.netlify.app)

---

Thank you for visiting my portfolio!


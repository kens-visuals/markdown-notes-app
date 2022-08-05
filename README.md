# In-browser Markdown Editor App

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author's Links](#authors-links)

## Overview

### The challenge

Users should be able to:

- Create, Read, Update, and Delete markdown documents
- Name and save documents to be accessed as needed
- Edit the markdown of a document and see the formatted preview of the content
- View a full-page preview of the formatted content
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- **Bonus**: Build this project as a full-stack application

### Screenshot

![screenshot](./screenshot.png)

### Links

- Live Site URL: [https://markdown-notes-app-delta.vercel.app/](https://markdown-notes-app-delta.vercel.app/)
- Solution URL: [TO_BE_UPDATED](TO_BE_UPDATED)

## My process

### Built with

![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

### What I learned

This is my very first full-stack application, and I'm really happy how it came out. With this project, I learned not only Firebase and user authentication. But also improved my React skills, and got more comfortable working with NextJS. So, let's start from the beginning. When I saw this project, I liked the whole concept, because I had so many challenges in one application. However, I knew that if I'm going to build it, then it has to be full-stack. Otherwise, it loses the whole point and there won't be much challenge left other than making the layout as close to the design as possible. Therefore, I went researching on how to build full-stack apps without back-end knowledge, because I knew that learning back-end would take a pretty long time. I already knew a bit about `Firebase` and what it does, but I never had a chance to get my hand dirty with it. So this was a perfect opportunity to learn `Firebase` and achieve the main goal of the project. It took me a couple of days to get to know `Firebase`, after reading their docs. And watching a bunch of old and new YouTube tutorials, crash courses, etc. I slowly started writing my code and with every new piece of information and knowledge, improved my `Firebase` skills and code's quality. After getting all the functionality done, I started working on the layout and thanks to `TailwindCSS` I made it quicker and easier. `TailwindCSS`'s typography was a life changer, and without that I might've spent a week only trying to get the markdown's styles correctly. And I'm not even talking about how easy it makes to add dark mode in your website. Of course, building this project literally from scratch, meaning creating a whole "library" to deal with markdown would've made this 10X harder, and thanks to open-source project that make our lives 10X easier. In this case, thanks to [react-markdown](https://github.com/remarkjs/react-markdown#plugins) for making this cool project that lets you add markdown editor in your project and customize it so easily. I'd never think that one day I'll need a library that will help you synchronously scroll two `div`s at the same time. But here we are my perfectionism made me search for a solution for that particular problem, and it's called [react-scroll-sync](https://github.com/okonet/react-scroll-sync). It's possible to create a such thing on your own, but why struggle when such a cool thing already exists. For the modals, alerts and switch buttons, that would've taken a pretty long time to build on my own, let alone make them accessible, I went for [Flowbite](https://flowbite.com/). Easy to use, customizable, and more importantly accessible. I also added some transition to make things smoother, with [Headless UI](https://headlessui.com/) transitions. Lastly, although it took me more than expected to build this project, I'm really happy and proud of the way it came out, and the things it taught me along the way that I could never learn otherwise!

### Useful resources

- [react-markdown](https://github.com/remarkjs/react-markdown#plugins) - This is the open-source library that help you to add markdown editor in just a matter of minutes.
- [How to setup react-markdown](https://blog.logrocket.com/how-to-safely-render-markdown-using-react-markdown/) - The article helped me a lot to set up react-markdown, and its plugins.
- [Article: The JavaScript + Firestore Tutorial for 2020: Learn by Example](https://www.freecodecamp.org/news/the-firestore-tutorial-for-2020-learn-by-example/) - It may be a bit outdated, but has tons of examples and can be a full guide for your next `Firebase` project.
- [Flowbite](https://flowbite.com/) - Flowbite is an ecosystem built on top of Tailwind CSS including a component library, block sections, a Figma design system and other resources.
- [react-scroll-sync](https://github.com/okonet/react-scroll-sync) - Synced scroll position across multiple scrollable elements.
- [TailwindCSS Typography](https://tailwindcss.com/docs/typography-plugin) - This made styling the preview of markdown 10X easier and faster.
- [favicon.io](https://favicon.io/) - Fast and easy way to generate a favicon, for your next project.
- [Mugshotbot](https://mugshotbot.com/) - Make your website more professional by adding a preview in second with mugshotbot.

## Author's Links

- Medium - [@kens_visuals](https://medium.com/@kens_visuals)
- CodePen - [@kens-visuals](https://codepen.io/kens-visuals)
- Codewars - [@kens_visuals](https://www.codewars.com/users/kens_visuals)
- Frontend Mentor - [@kens-visuals](https://www.frontendmentor.io/profile/kens-visuals)

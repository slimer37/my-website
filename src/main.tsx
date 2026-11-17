import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Root from './Root.tsx'
import NotFound from './NotFound.tsx'

import Home from './routes/Home.tsx'
import Games from './routes/Games.tsx';
import Projects from './routes/Projects.tsx';
import Gallery from './routes/Gallery.tsx';
import BlogPost from './routes/BlogPost.tsx';
import Blog from './routes/Blog.tsx';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "games",
        element: <Games />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "art",
        element: <Gallery />
      },
      // Old URLs from before the portfolio was split up
      {
        path: "portfolio",
        element: <Navigate to="/games" replace />
      },
      {
        path: "gallery",
        element: <Navigate to="/art" replace />
      },
      {
        path: "blog",
        element: <Blog />
      }
    ]
  },
  {
    path: "/post/:year/:month/:day/:name",
    element: <BlogPost />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

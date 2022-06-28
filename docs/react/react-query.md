# [React Query](https://react-query.tanstack.com/)

## Overview

Kent C. Dodds explains react query's purpose best in his article [Application State Management With React](https://kentcdodds.com/blog/application-state-management-with-react#server-cache-vs-ui-state)

> There are various categories of state, but every type of state can fall into one of two buckets:
> - Server Cache - State that's actually stored on the server and we store in the client for quick-access (like user data).
> - UI State - State that's only useful in the UI for controlling the interactive parts of our app (like modal isOpen state).
>
> We make a mistake when we combine the two. Server cache has inherently different problems from UI state and therefore needs to be managed differently. If you embrace the fact that what you have is not actually state at all but is instead a cache of state, then you can start thinking about it correctly and therefore managing it correctly.
>
> You can definitely manage this yourself with your own useState or useReducer with the right useContext here and there. But allow me to help you cut to the chase and say that caching is a really hard problem (some say that it's one of the hardest in computer science) and it would be wise to stand on the shoulders of giants on this one.
>
> This is why I use and recommend [react query](https://react-query.tanstack.com/) for this kind of state. I know I know, I told you that you don't need a state management library, but I don't really consider react query to be a state management library. I consider it to be a cache. And it's a darn good one. Give it a look! That Tanner Linsley is one smart cookie.

## Helpful resources
- [React Query Overview](https://react-query.tanstack.com/overview)
- [Quickstart](https://react-query.tanstack.com/quick-start) Get the basics of queries vs mutations (getting data vs mutating a.k.a. posting/deleting/putting)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query) Highly recommended reading. This is the first post of a great series of posts about RQ by tkdodo that go thru the basics and more advanced topics (Transforming Data, Typescript and React Query, etc.)

## Similar libraries
- [SWR](https://swr.vercel.app/) By the NextJS team
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) Part of Redux Toolkit

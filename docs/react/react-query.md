---
tags: ["react", "web-platform", "react-query", "server-state", "data-caching"]
title: "React Query"
layout: layout.njk
---

# [React Query](https://react-query.tanstack.com/)

## Why would I use this?

Kent C. Dodds explains React Query's purpose best in his article ["Application State Management With React"](https://kentcdodds.com/blog/application-state-management-with-react#server-cache-vs-ui-state)

> There are various categories of state, but every type of state can fall into one of two buckets:
> - Server Cache - State that's actually stored on the server and we store in the client for quick-access (like user data).
> - UI State - State that's only useful in the UI for controlling the interactive parts of our app (like modal isOpen state).
>
> We make a mistake when we combine the two. Server cache has inherently different problems from UI state and therefore needs to be managed differently. If you embrace the fact that what you have is not actually state at all but is instead a cache of state, then you can start thinking about it correctly and therefore managing it correctly.
>
> You can definitely manage this yourself with your own useState or useReducer with the right useContext here and there. But allow me to help you cut to the chase and say that caching is a really hard problem (some say that it's one of the hardest in computer science) and it would be wise to stand on the shoulders of giants on this one.
>
> This is why I use and recommend [react query](https://react-query.tanstack.com/) for this kind of state. I know I know, I told you that you don't need a state management library, but I don't really consider react query to be a state management library. I consider it to be a cache. And it's a darn good one. Give it a look! That Tanner Linsley is one smart cookie.

### Is this you?
Are you fetching data async in your components/screens and storing it with useState or redux or something of the likes? Are you then using local component state (useState etc) to create transitional state for your UI (useState to keep "loading", "error", etc)? Are you keying off these state keys to trigger side effects? Is it adding a lot of bulk to your code? If yes you may want to check out React Query.

React Query provides a caching "query client" context provider and various utility hooks (useQuery, useMutation, etc) to help you fetch, cache and mutate server/async state. It also gives you helpful information about the status/state of your queries and mutations that can be used in your UI/Components.

## Tips and Lessons Learned

### Think in Queries and Mutations
The two big hooks React Query provides are `useQuery` and `useMutation`. `useQuery` is for getting data (GET) and the `useMutation` hook is for "mutating" server state (think POST, PUT, PATCH).

### Understand the query function
One of the arguments for `useQuery` is the [query function](https://react-query.tanstack.com/guides/query-functions). A query function is literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error. This determines the "status" your query return value (or mutation) will be in as well.

Maybe you're using something like Firebase Remote Config in your app and it returns promises that resolve the remote config data. You could use `useQuery` to wrangle this data in your app.

### Understand the default options
React Query's `useQuery` hooks out of box has certain [default options set](https://react-query.tanstack.com/guides/important-defaults). It is really important to understand these and the other options.

### Understand Stale Time
`staleTime` is a really important option. By default query data in the cache is marked stale, so if you're using a `useQuery` hook in multiple components you may get more requests made depending on when the component using the hook is rendered. In this case you may want to set a longer stale time to avoid more query refetches because your data remains marked as "fresh" (refetching also has options you can configure).

`staleTime` example - Say you are fetching some data that you know will NOT update a lot like say maybe user data that is only gonna really need to update as result of a form submission or something you can set an `Infinity` stale time. This query will always be considered "fresh" and not refetched until it is manually "invalidated" i.e. manually marked "stale". One rendered component will trigger the query data to be fetched and then the rest will now use the cached value (because its staleTime is forever/Infinity)

``` javascript
function useUserProfileQuery() {
  return useQuery('user-profile', fetchUserProfile, {
    staleTime: Infinity,
  });
}
```

### Understand the "query client" and query "invalidation"
To use React Query features you need to wrap your application with `QueryClientProvider` context provider. With this in place the `useQueryClient` hook can then be used to get access to your apps [query client](https://react-query.tanstack.com/reference/QueryClient) instance. With this you can do all kinds of things. The most common are usually prefetching queries and "invalidating" queries.

When you need to mark a query as "stale" so it will be refetched you'll use [query invalidation](https://react-query.tanstack.com/guides/query-invalidation). Most of the time this will be a result of a successful mutation (like in the `useMutation` `onSuccess` callback option).

Assuming our user profile query hook fetched data and somewhere in our UI we have a form to "mutate" that data.

``` javascript
function useUpdateUserProfileMutation() {
  const queryClient = useQueryClient(); // Get access to query client
  
  return useMutation(updateUserProfile, {
    onSuccess: (data) => queryClient.invalidateQueries('user-profile'), // Invalidate our user-profile query by its query key
  });
}
```

### Create custom query and mutation hooks

Its a recommended pattern to create individual custom hooks for your various queries and mutations. Avoid bundling too many queries and mutations in one hook for organization purposes as this may cause render cycle issues. [React Query docs example](https://react-query.tanstack.com/examples/custom-hooks). Once you have these hooks all your various components can then use them.

``` javascript
// Your query functions could be in another file

function usePostsQuery() {
  return useQuery('posts', fetchPosts);
}

function usePostQuery(postId) {
  return useQuery(['posts', postId], fetchPost, { // Global config options });
}

function useUpdatePostMutation(postId) {
  return useMutation(updatePost, { // Global config options });
}
```

### Prefer using the hook callbacks instead of useEffect for side effects

Do you need to pop up an alert or toast after a query or mutation errors? You can stay away from `useEffect` and instead use the callbacks provided by react query in the options object. [Consider setting up a global handler for this with the query client.](https://tkdodo.eu/blog/react-query-error-handling#the-global-callbacks)

You can define these globally in your custom hooks:

``` javascript
function useSomeMutation() {
  return useMutation(updateSomething, {
    // These are globally set, useQuery can do this too
    onSuccess: (data) => { // Do success things.. },
    onError: (error) => { // Do error things.. },
    onSettled: () => { // Do this no matter what }
  });
}
```

Or you can trigger side effects more contextually when using the mutation `mutate` method in a component:

``` javascript
// in some component some where you're probably gonna trigger a mutation...

function handleSubmit() {  
  updateSomethingMutation.mutate({ // params }, {
    // Contextual handlers
    onSuccess: (data) => { // Do success things.. },
    onError: (error) => { // Do error things.. },
    onSettled: () => { // Do this no matter what }
  })
}
```

### Avoid double caching/storing data in local state
Just use the data object returned from your query or mutation.

### Use the `select` option/function for transforming data on the client side
Is the data structure from the api not what you want? Using the `select` option/fn with `useQuery` gives you a safe place to transform your data client side but keep the original in the cache. This is an ideal way to subscribe to data changes on a smaller part of your data. [Learn more about react-query's select option](https://tkdodo.eu/blog/react-query-data-transformations#3-using-the-select-option)

### Things to think about when making new custom queries
- Can this go stale?
- How frequently should data be considered stale?
- What causes explicit invalidations? (Side effects in components like screen refocus, form submission via mutation etc.)
- Do we want to consider optimistic updates here?
- Is this a dependent query?

## Helpful Resources
- [React Query Overview](https://react-query.tanstack.com/overview)
- [Quickstart](https://react-query.tanstack.com/quick-start) Get the basics of queries vs mutations (getting data vs mutating a.k.a. posting/deleting/putting)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query) **Highly recommended reading if you really want a deaper understanding of the concepts**. This is the first post of a great series of posts about RQ by tkdodo that go thru the basics and more advanced topics (Transforming Data, Typescript and React Query, etc.)

## Similar libraries
- [SWR](https://swr.vercel.app/) By the NextJS team
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) Part of Redux Toolkit

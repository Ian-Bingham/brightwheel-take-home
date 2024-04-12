# fe-interview-backend

## Design Decisions

This was a really fun take home assignment to work on. Throughout the process I made a few descisions which I've detailed below to, hopefully, provide clarification and context:

1. Utilizing [TanStack Query](https://tanstack.com/query/latest) For Data Fetching
   a. In order to interact with the API I decided to utilize TanStack Query as it provides many benefits, such as caching, auto-refetching, and request state information, e.g. loading and error states. Additionally, the library comes with Developer Tools which I've added to the application and can be accessed via the "tropical" icon at the bottom right corner of the application.
2. Utilizing [Material UI](https://mui.com/material-ui/) For Styling
   a. Since there were no specifications on how to design the application I decided to leverage Material UI as it is a widely adopted component library that I have worked with in the past, and allows swift development for producing an application with modern styling.
3. Utilizing [Cypress](https://www.cypress.io/) For Testing
   a. In order to test the application I decided to leverage Cypress as I have worked with it in the past. It's a great tool to test and debug the application in real time. It also gives you the option to write End-To-End tests and/or Component tests. However, during my research, it seems that Cypress currently does not support Vite v5.
4. Filtering Based Off All Company Fields (Utilizing The "q" Query Parameter)
   a. Given that the requirements were a bit ambiguous regarding how the search functinality should work I decided to perform the search filter based off of all Company fields. However, this may result in unexpected behavior related to the results shown in the UI because the "q" filter also works on the Company image url which is an extremely long string that is not shown in the UI. Hence, the results list may show results where the _visible_ text does not align with the search term.

## Future Improvements

Given that this is a take home assignment there are a few things that I want to mention that I would love to implement if I had more time to build upon this application:

1. Implement Pagination
   a. Currently, the application only shows the first 10 results for a given search filter, even if there are more than 10 companies that meet the criteria. Ideally, we would implement pagination to allow the user to view all results, across multiple pages, for a given search filter. This may also entail additional work from the backend, such as including the total count of relevant results in addition to the paginated Companies.
2. Display All Starred Companies
   a. I like the suggestion of displaying all starred Companies when the Star badge next to the search input is clicked. This would allow the user to easily view the companies that have been starred.
3. Creating A Separate Endpoint To Get Total Star Count
   a. Currently, to get the total number of starred companies, we are fetching all companies that are starred and obtaining the length of that result to display in the Star badge. We may want to consider creating a separate endpoint to return the total star count as we do not need the Company information to support the Star badge.
4. Filtering Companies Based Off Relevant Information
   a. Currently, the "q" filter for the API filters off of all fields including the Company image url. We may want to consider updating the filter to remove irrelevant search properties, such as the image url, as I don't believe a user would attempt to search for a result based off the contents of a url.

## Project Description

This repository contains a local mock backend server for the brightwheel frontend coding challenge as well as an empty vite react typescript template, which you may use as a starting point. Feel free to use a different frontend framework (Angular/Vue/Svelte/etc..) or vanilla JS if you prefer.

## Project Requirements

Here's a link to the [requirements for the project](https://github.com/brightwheel/fe-interview-backend/blob/main/REQUIREMENTS.md).

## Getting started

Install project dependencies

```
yarn install
```

Start the frontend and the mock backend together

```
yarn start:mock
```

Or start the backend by itself

```
yarn start:api
```

This will create a locally hosted backend that you can access at `http://localhost:3001`

### Data models

This database will create a random collection of fake Companies for you to connect your app to. The data is re-generated each time you start the server.

```typescript
interface Address {
	address1: string;
	address2?: string;
	city: string;
	state: string;
	postalCode: string;
}

interface Company {
	id: string;
	starred: boolean;
	name: string;
	description: string;
	address: Address;
	image?: string;
}
```

### Supported routes

```
GET    /search
GET    /search/:id
POST   /search
PUT    /search/:id
PATCH  /search/:id
DELETE /search/:id
```

When doing requests, it's good to know that:

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).
- Changes will persist so long as the server is running and will be overwritten next time the server is started
- Your request body JSON should be object enclosed, just like the GET output. (for example `{"name": "Foobar"}`)
- Id values are not mutable. Any `id` value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will return a 2XX status code, but no changes will be made to the data.

### Search

Add `q` to search ALL the fields for a string

```
GET /search?q=fish
```

Search individual fields by field name. Use `.` to access deep properties

```
GET /search?id=company.5
GET /search?name=snake
GET /search?taxonomy.family=dog
```

Add `_like` to filter (RegExp supported)

```
GET /search?name_like=cat
```

### Full-text search

### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```
GET /search?_page=7
GET /search?_page=7&_limit=20
```

By default ALL matching results are returned

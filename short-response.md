# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**Your Answer:**
This fetch has `undefined` in the second `then()`, because the fetch is not being returned. In the first `.then()`, `readingPromise` is defined, however there is no `return readingPromise`, meaning that the next then is not able to read the resolved value, thus returned `undefined`.

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:**
When someone opens their `index.html` file directly in the browser, `<script type="module">` tag and `fetch()` call both fail, because ES modules requires HTTP/HTTPS, and using the `file://` protocol results in the browser blocking `<script type="module">`, due to security reasons. With the `fetch()` call, CORS restricts `fetch()` on a `file://` protocol. To fix these, you would simple run your html file utilizing vite, which utilizes a local dev server via `http://localhost:5173`, and supports ES modules and `fetch()` as a result.

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**Your Answer:**
When using `fetch()` we check `response.ok` before reading the response body, because `fetch()` only rejects promises based on network failures, such as internet. Utilizing `response.ok` ensure that we catch bad HTTP status code errors, such as 404 or 500. Without it, you would get a thrown error, and that error would be unexpected or wrong data, which would make debugging difficult.

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart")
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

**Your Answer:**

```js
const getJoke = async () => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart",
    );
    if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
```

## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener("submit", (event) => {
  const name = form.elements.name.value;
  document.querySelector("#output").textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

**Your Answer:**
With this form handler, the form will reload the page, deleting any data that tries to be displayed. This behavior, known as **default browser behavior**, and be fixed by using `event.preventDefault()`, which stops this default behavior, and allows the JavaScript to handle the submission.

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**Your Answer:**

- J. Create the HTML form with a name input and output elements for displaying results
- E. Add a `'submit'` event listener to the form
- B. Call `event.preventDefault()` to stop the page from reloading
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- C. Check `response.ok` and throw an error if the response failed
- A. Parse the response body with `await response.json()`
- D. Update the DOM with the Pokemon's data
- F. Handle errors in the `catch` block (display an error message)
- I. Reset the form with `form.reset()`

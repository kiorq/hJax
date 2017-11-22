# hJax :)
A light-weight plugin to dynamically update the web document based on ajax request status using html.

![Example](http://g.recordit.co/9CbEP6C2vU.gif)

### Basics:
#### 1. hJax Status Wrapper.
First we need to make a wrapper and set some data attributes. This will hold all the statuses we need.

```html
<div data-hjax="example_status" data-hjax-status-initial="default">
    ...
</div>
```

What's going on here:
1. `data-hjax="example_status"`: The name of the status (required)
2. ` data-hjax-status-initial="default"`: The initial status (not requird, default: `default`)


#### 2. Statuses.
Inside this wrapper, we can set different status, and hJax will display the appropriate content based on the status is currently set.

```html
<div data-hjax="example_status" data-hjax-status-initial="default">
    <!-- Default Status -->
    <div data-hjax-status="default">
        <b>This is the default status</b>
    </div>
    
    <!-- Submitted Status -->
    <div data-hjax-status="submitted">
        <b style="color: gray">Okay, we are shooting a request...</b>
    </div>
    
    <!-- Done Status -->
    <div data-hjax-status="done">
        <b style="color: green">We successfully made the request!</b>
    </div>
    
    <!-- Failure Status -->
    <div data-hjax-status="failure">
        <b style="color: red">Yikes, something went wrong</b>
    </div>
</div>
```

#### 3. Initial Status

Since we have `data-hjax-initial-status` set the `default`, when the document loads, hJax will only display the default status `data-hjax-status="default"` and hide the other statuses.

```html
<div data-hjax-status="default">
    <b>This is the default status</b>
</div>
```

#### 4. hJax link
A hJax link triggers an ajax requests then updates the targeted hJax status wrapper based on the status of the request. a hJax link can be anywhere on the document. Inside the hJax status wrapper out outside.

```html
<a data-hjax-target="example_status" href="http://example.com/test">Update status</a>
```

Psuedocode goes like this:
```
1. hJax link clicked
2. A GET ajax request is made to http://example.com/test
3. hJax status wrapper named `example_status` status is updated to `submitted`
4. If ajax requests returns a successful response, then hJax status wrapper `example_status` status is updated to `done` 
5. If ajax requests returns a failed response, then hJax status wrapper `example_status` status is updated to `failure` 
```

#### 5. Tips
In cases where you need to update multiple places in the document for the same request, you can set multiple hJax status wrappers with same name and setting the `data-hjax-of-many="true"` attribute.

```html
<!-- status 1 -->
<div data-hjax="example_status" data-hjax-status-initial="default" data-hjax-of-many="true">
    ...
</div>

<!-- status 2 -->
<div data-hjax="example_status" data-hjax-status-initial="default" data-hjax-of-many="true">
    ...
</div>

<!-- will update both status 1 and status 2 -->
<a data-hjax-target="example_status" href="http://example.com/test">Update status</a>
```


#### 6. CDNS
1. https://rawgit.com/kiorq/hJax/master/hJax.min.js
2. https://rawgit.com/kiorq/hJax/master/hJax.js


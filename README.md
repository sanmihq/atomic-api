# Atomic API Documentation

Welcome to the Atomic API.

This API provides information about chemical elements, allowing you to query and retrieve details about specific elements or get a list of all element names. Below is the documentation to help you get started.

## Base URL

The base URL for the Elements API is: `https://your-elements-api-url.com`

## Endpoints

1. ### Check API Status

   - **Endpoint**: **"/"**
   - **Method**: **GET**
   - **Description**: Check the status of the API.
   - **Example**:
     ```bash
     curl -X GET https://your-elements-api-url.com
     ```

2. ### Get Filtered Elements

   - **Endpoint**: **"/elements"**
   - **Method**: **GET**
   - **Description**: Retrieve a list of elements based on specified filters.
   - **Parameters**: Valid Query Parameters: **'id', 'name', 'symbol', 'standard_state', 'valence_electron', 'period', 'group', 'block', 'category'**
   - **Example**:
     ```bash
     curl -X GET https://your-elements-api-url.com/elements?category=Nonmetal&period=2
     ```

3. ### Get All Element Names

   - **Endpoint**: **"/elements/name/all"**
   - **Method**: **GET**
   - **Description**: Retrieve a list of all element names.
   - **Parameters**: Valid Query Parameters: **'id', 'name', 'symbol', 'standard_state', 'valence_electron', 'period', 'group', 'block', 'category'**
   - **Example**:
     ```
     curl -X GET https://your-elements-api-url.com/elements/name/all
     ```

4. ### Get Element by ID or Category

   - **Endpoint**: **"/elements/name"**
   - **Method**: **GET**
   - **Description**: Retrieve element details by providing either the id or category parameter.
   - **Parameters**: Required: Either **'id'** or **'category'**
   - **Example**:

   ```
   curl -X GET https://your-elements-api-url.com/elements/name?id=1
   ```

## CORS Configuration

The API is configured to allow cross-origin resource sharing (CORS) for GET requests.  
The Access-Control-Allow-Origin header is set to \*, allowing requests from any origin. Ensure that your requests use the GET method.

### Example

Below is an example Node.js code snippet that sets up the API using Express and CORS:

```javascript
const express = require("express");
const cors = require("cors");
const app = express();
const elements = require("./elements");

// Enable CORS for all origins for GET requests
app.use(
  cors({
    origin: "*",
    methods: "GET",
  })
);

// ... (API endpoint definitions)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

Feel free to use the provided examples to integrate the Atomic API into your applications.  
If you have any questions or encounter issues, refer to this documentation or contact our support team. Happy coding!

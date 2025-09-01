// // netlify/functions/render.js
// import { render } from "../../dist/server/entry-server.js";

// export async function handler(event) {
//   const url = event.rawUrl || event.path || "/";
//   const appHtml = await render(url);

//   return {
//     statusCode: 200,
//     headers: {
//       "Content-Type": "text/html",
//     },
//     body: `
//       <!DOCTYPE html>
//       <html lang="en">
//         <head>
//           <meta charset="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <title>SSR App</title>
//         </head>
//         <body>
//           <div id="app">${appHtml}</div>
//           <script type="module" src="/assets/index.js"></script>
//         </body>
//       </html>
//     `,
//   };
// }

// functions-compiled/render.js (after Babel or directly if you hand-write it)
const { render } = require('../../dist/server/entry-server');

exports.handler = async (event) => {
  const url = event.rawUrl || event.path || '/';
  const appHtml = await render(url);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>SSR App</title>
        </head>
        <body>
          <div id="app">${appHtml}</div>
          <script type="module" src="/assets/index.js"></script>      
        </body>
      </html>
    `
  };
};

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  let date = new Date();
  let html = `<!DOCTYPE html>
  <html>
    <head>
      <title>  Hello World </title>
    </head>
    <body>
      <h1>Serverless with Pulumi</h1>
      <p>The current time is: <span id="date">${date}</span>.</p>
    </body>
  </html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
   });
}
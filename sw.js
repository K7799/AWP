//Libreria de Workbox version 6.4.1
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);


//Cache- que va a guardar
workbox.precaching.precacheAndRoute([
  'index.html',
  'autores.html',
  'offline.html', // Se van a mostrar cuando se indique
  'icons/offline.jpg' // Se muestra cuando se indique
]);

//Si no encuentra una imagen
workbox.routing.registerRoute(
  ({request}) => request.destination === "image",
  new workbox.strategies.NetworkOnly()
);

//No encuentra una pagina
workbox.routing.registerRoute(
  ({request}) => request.destination === "document",
  new workbox.strategies.NetworkFirst()
);


//Si hay una respuesta que genere error

workbox.routing.setCatchHandler(async context=>{
  console.log("context");
  console.log("context.request");
  if(context.request.destination === 'image'){
    return workbox.precaching.matchPrecache('icon/offline.jpg');}
  else if(context.request.destination === 'document'){
    return workbox.precaching.matchPrecache('offline.html');
  }
  return Response.error();
});
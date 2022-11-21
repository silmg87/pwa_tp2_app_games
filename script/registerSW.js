// Verificación Service Worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../pwa_tp2_app_games/sw.js').then(function(message) {
        console.log('Service Worker está activado');
    });
} else {
    console.log('Ha ocurrido un error, posiblemente tu navegador no soporte Service Worker');
}

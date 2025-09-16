document.addEventListener('DOMContentLoaded', function() {
    // Wait for Ionic to be ready
    customElements.whenDefined('ion-app').then(() => {
        document.body.classList.add('ready');
        document.body.classList.remove('loading');
    });
}); 
// Este código configura y carga las fuentes de Google Fonts para ser utilizadas en una página web podiendo asi importar cualquier tipo de fuente que se encuentre en https://fonts.google.com/ 

WebFontConfig = {
    google: { families: ["Fresca","Flamenco","Patrick Hand", "Matt McInerey"] } // Nombre de las font-family de Google fonts: https://fonts.google.com/  las cuales se quieren importar
    };
    (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    })();
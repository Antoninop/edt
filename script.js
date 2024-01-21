document.addEventListener("DOMContentLoaded", function () {
    const filePath = 'one.pdf';
    var JourSemaine = new Date().getDay();

    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => displayPDF(arrayBuffer));

    function displayPDF(arrayBuffer) {
        pdfjsLib.getDocument({ data: arrayBuffer }).promise.then(function(pdf) {
            var currentPage = PageduJour();

            pdf.getPage(currentPage).then(function(page) {
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });

                var canvas = document.getElementById("pdfCanvas");
                var context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext);
            });
        });
    }

    function PageduJour() {
        var pageMap = {
            1: 2, // Lundi
            2: 3, // Mardi
            3: 4, // Mercredi
            4: 5, // Jeudi
            5: 6, // vendredi
        };

        return pageMap[JourSemaine] || 1; // page 1 par défaut
    }

    // écouteur d'événement sur le bouton page suivante
    var boutonPageSuivante = document.getElementById("boutonPageSuivante");
    var boutonPagePrecedente = document.getElementById("boutonPagePrecedente");

    if (boutonPageSuivante) {
        boutonPageSuivante.addEventListener("click", afficherPageSuivante);
    }

    if (boutonPagePrecedente) {
        boutonPagePrecedente.addEventListener("click", afficherPagePrecedente);
    }

    function afficherPageSuivante() {
        JourSemaine = JourSemaine + 1;
        if (JourSemaine > 5) {
            JourSemaine = 1;
        }
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => displayPDF(arrayBuffer));
    }

    function afficherPagePrecedente() {
        JourSemaine = JourSemaine - 1;
        if (JourSemaine < 1) {
            JourSemaine = 5;
        }
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => displayPDF(arrayBuffer));
    }
});

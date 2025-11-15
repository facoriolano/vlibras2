/**
 * Este script é uma simulação do vlibras-plugin.js, mas com o carregamento
 * do motor VLibrasLuz apontando para o arquivo local.
 *
 * Ele garante que a inicialização do widget ocorra após o carregamento do DOM.
 *
 * O arquivo "vlibras-luz.min.js" deve estar na mesma pasta que este.
 */

// 1. Carrega o motor VLibrasLuz (que será injetado no DOM)
function loadVlibrasLuzScript() {
    var script = document.createElement('script');
    script.src = 'vlibras-luz.min.js';
    script.onload = initializeVlibrasWidget;
    document.head.appendChild(script);
}

// 2. Inicializa o widget quando o motor estiver pronto
function initializeVlibrasWidget() {
    if (typeof VlibrasLuz !== 'undefined') {
        var container = document.querySelector('div[vw]');
        if (container) {
            
            // O VlibrasLuz precisa saber onde está o motor do avatar.
            // Continuamos apontando para a API oficial do avatar (que faz a tradução).
            var widget = new VlibrasLuz(container, {
                api: 'https://vlibras.gov.br/app/luz',
                background: '#111827', // Cor de fundo
                onLoad: function() {
                    // Simula o evento que seu index.html espera
                    window.dispatchEvent(new Event('vw_plugin_loaded'));
                }
            });

            // Cria a interface global que seu index.html espera
            window.vw = {
                vw_setSource: widget.setSource.bind(widget),
                vw_setBackground: widget.setBackground.bind(widget)
            };
            
            console.log("VLibras SDK inicializado com VlibrasLuz.");
        }
    } else {
        console.error("Erro ao carregar VlibrasLuz.min.js");
    }
}

// 3. Garante que tudo carregue após o DOM
document.addEventListener('DOMContentLoaded', loadVlibrasLuzScript);

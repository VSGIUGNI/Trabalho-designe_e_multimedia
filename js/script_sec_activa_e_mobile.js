   

    const navList = document.getElementById('nav-list');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const spans = document.querySelectorAll('#hamburger span');
    const container = document.getElementById('horizontal-container');

    // TRANSFORMAR SCROLL VERTICAL EM HORIZONTAL
    // Forçar o scroll horizontal com a roda do rato
    window.addEventListener('wheel', (evt) => {
        // Só transforma em horizontal se a largura do ecrã for maior que 768px
        // Se estiver no desktop, pára o scroll vertical da página
        // e empurra o container para o lado
        if (window.innerWidth > 768 && container){            
                 
            // Se deltaX for diferente de zero, significa que o utilizador 
            // já está a usar um trackpad para scroll horizontal nativo.
            // Se for zero, é um rato comum e é necessário PARAR o scroll vertical padrão do browser
            if (Math.abs(evt.deltaX) === 0) {
                evt.preventDefault(); // Impede o scroll vertical padrão
                // EXECUTAR o movimento horizontal manualmente
                // deltaY é a força da roda do rato. Adiciona-se o movimento vertical ao horizontal (scrollLeft)
                container.scrollLeft += evt.deltaY;
            }
            // Se deltaX existir, não faz nada e deixa o browser agir nativamente
    
            console.log("ScrollLeft atual:", container.scrollLeft);
            
        }
    }, { passive: false });// O "passive: false" é necessário para o preventDefault funcionar

    
    // --- Deteção da SEÇÃO ATIVA  ---
    const changeActiveSec = () => {

        if (!container) return;

        let currentSectionId = "";
        const isDesktop = window.innerWidth > 768;

        // Posição atual do scroll (Horizontal no Desktop, Vertical no Mobile)
        // No desktop medimos o scroll do container (X), no mobile da janela (Y)
        const scrollPos = isDesktop ? container.scrollLeft : window.scrollY;

        sections.forEach((section) => {

            // Posição da seção (Esquerda no Desktop, Topo no Mobile)
            const sectionPos = isDesktop ? section.offsetLeft : section.offsetTop;

            // No desktop, verificamos se o scroll está próximo do início da seção
            // Usamos um threshold de 100px para evitar erros de arredondamento
            if (scrollPos >= (sectionPos - 100)) {
                currentSectionId = section.getAttribute("id");
            }
        });
        // Atualizar classes nos links
        navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    };
    // Forçar a deteção assim que a página carrega
    window.addEventListener('load', changeActiveSec);

    // Listeners de scroll
    // No Desktop, o scroll acontece DENTRO do container
    container.addEventListener('scroll', changeActiveSec); 
    // No Mobile, o scroll acontece na WINDOW 
    window.addEventListener('scroll', changeActiveSec); 

  
    // --- Funções para o MENU MOBILE ---
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleMenu);
    function toggleMenu() {
        const isOpen = navList.classList.toggle('active');
        spans.forEach(span => span.classList.toggle('open'));
        hamburger.setAttribute("aria-expanded", isOpen);//atualizar quando o menu abre
    }

    function closeMenu() {
        navList.classList.remove('active');
        spans.forEach(span => span.classList.remove('open'));
    }

    navItems.forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });  
    

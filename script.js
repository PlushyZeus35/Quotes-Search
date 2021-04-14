let http = new XMLHttpRequest();
http.responseType = 'json'; 
let numberOfQuotes = 6;
const urlRandomQuote = 'https://quote-garden.herokuapp.com/api/v3/quotes/random?count=' + numberOfQuotes;
const urlAuthorQuote = 'https://quote-garden.herokuapp.com/api/v3/quotes/random?count=' + numberOfQuotes + '&author=';
let url = '';


//ASIGNAR EVENTOS
document.getElementById("searchButton").addEventListener("click", searchButtonClick);
document.getElementById("randomButton").addEventListener("click", randomButtonClick);

//EVENTO PULSAR BOTON SEARCH
function searchButtonClick(){
    let inputText = document.getElementById("searchInput").value;
    if(inputText!=""){
        clearDivs();
        url = urlAuthorQuote + inputText;
        searchAuthorQuotes();
    }
}

function searchAuthorQuotes(){
    http.open("GET",url);
    http.send();
    http.onload = function(){
        //SI HEMOS ENCONTRADO CITAS
        if(http.response.data.length>0){
            //creamos el autor de las citas
            let authorQuotes = document.createElement("h2");
            authorQuotes.className += "authorQuote";
            authorQuotes.innerHTML = http.response['data'][0]['quoteAuthor'];
            //introducimos el elemento al contenedor para el autor
            let authorDiv = document.getElementById("authorDiv");
            authorDiv.appendChild(authorQuotes);
            for(i=0;i<http.response.data.length; i++){
                //creamos cita
                let quote = document.createElement("div");
                quote.className += "quote";
                //creamos titulo de genero
                let quoteGenre = document.createElement("h3");
                quoteGenre.className += "quoteGenre";
                quoteGenre.innerHTML = http.response['data'][i]['quoteGenre'];
                //añadimos el genero a la cita
                quote.appendChild(quoteGenre);
                //creamos parrafo del texto de la cita
                let quoteText = document.createElement("p");
                quoteText.className += "quoteText";
                quoteText.innerHTML = http.response['data'][i]['quoteText'];
                //añadimos el texto a la cita
                quote.appendChild(quoteText);
                //seleccionamos contenedor de citas
                let quotesDiv = document.getElementById("quotesDiv");
                //añadimos la cita
                quotesDiv.appendChild(quote);
            }

        }else{
            //manejador por si no ha encontrado ninguna cita
            alert("No se han encontrado coincidencias");
        }
    }
}

//EVENTO PULSAR BOTON RANDOM
function randomButtonClick(){
    //Borramos todo lo que haya
    clearDivs();

    //creamos 6 citas aleatorias
    setRandomQuote();
    
}

//FUNCION PARA ELEMINAR TODOS LOS ELEMENTOS DE LAS CITAS CREADAS
function clearDivs(){
    //borramos el contenedor de citas
    while (quotesDiv.firstChild){
        quotesDiv.removeChild(quotesDiv.firstChild);
    }
    //borramos el contenedor del autor de las citas
    while (authorDiv.firstChild){
        authorDiv.removeChild(authorDiv.firstChild);
    }
}

//FUNCION PARA AÑADIR CITAS ALEATORIAS AL CONTENEDOR
function setRandomQuote(){
    
    http.open("GET",urlRandomQuote);
    http.send();
    http.onload = function(){
        for(i = 0; i<http.response.data.length; i++){
        //creamos cita
        let quote = document.createElement("div");
        quote.className += "quote";
        //creamos titulo de genero
        let quoteGenre = document.createElement("h3");
        quoteGenre.className += "quoteGenre";
        quoteGenre.innerHTML = http.response['data'][i]['quoteGenre'];
        //añadimos el genero a la cita
        quote.appendChild(quoteGenre);
        //creamos parrafo del texto de la cita
        let quoteText = document.createElement("p");
        quoteText.className += "quoteText";
        quoteText.innerHTML = http.response['data'][i]['quoteText'];
        //añadimos el texto a la cita
        quote.appendChild(quoteText);
        //creamos el autor de la cita
        let quoteAuthor = document.createElement("h3");
        quoteAuthor.className += "quoteAuthor";
        quoteAuthor.innerHTML = http.response['data'][i]['quoteAuthor'];
        //añadimos el autor a la cita
        quote.appendChild(quoteAuthor);
        //seleccionamos contenedor de citas
        let quotesDiv = document.getElementById("quotesDiv");
        //añadimos la cita
        quotesDiv.appendChild(quote);
        }

    }
}


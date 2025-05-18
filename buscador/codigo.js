function consultaDB(){
    const RANGO = 24;
    const q = document.getElementById("q").value;
    if(!q){
        alert("introducir termino de busqueda !!");
        return;
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "consultaDB.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify( { "q" : document.querySelector("#q").value, "bTags" : document.getElementById("opciontags").checked } ));

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4 && xhr.status === 200){
            const json = JSON.parse(xhr.response);
            console.log(json);
            [...document.getElementsByTagName("span")].forEach(e=>e.remove());
            [...document.getElementsByTagName("a")].forEach(e=>e.remove());
            [...document.getElementsByTagName("br")].forEach(e=>e.remove());
            json.forEach( (vctor,i) => {
                let enlace = document.createElement("a");
                enlace.href = vctor[0];
                enlace.innerText = i;
                document.body.appendChild(enlace);

                let espacio = document.createElement("span");
                espacio.innerText = "...";
                document.body.appendChild(espacio);

                let texto = document.createElement("span");
                texto.innerHTML = vctor[1];
                document.body.appendChild(texto);
                let posic1 = texto.innerText.search(q);
                let posic2 = posic1 + q.length;
                let posicINI = posic1 >= RANGO ? posic1 - RANGO : 0;
                let posicFIN = posic2 >= texto.innerText.length ? posic2: posic2 + RANGO;
                texto.innerHTML = texto.innerText.slice(posicINI,posicFIN);
                texto.innerHTML = texto.innerHTML.replace(q, `<strong>${q}</strong>`);
                
                document.body.appendChild(document.createElement("br"));
            });
        }
    };
}
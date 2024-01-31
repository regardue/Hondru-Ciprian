function add(){
    let checkUl = document.querySelector("ul")
    if(!checkUl){
    let ul = document.createElement("ul")
    let li = document.createElement("li")
    li.innerText = "Cristian"
    li.style.display = "inline-block"
    let li1 = document.createElement("li")
    li1.innerHTML = "Ioana"
    let li2 = document.createElement("li")
    li2.innerText = "Margareta"
    ul.appendChild(li);
    ul.appendChild(li1);
    ul.appendChild(li2);



    ul.addEventListener("mouseover",mouse);

    document.body.appendChild(ul)
    ul.style.color = "red"
    }
}

function mouse(e){
    let ele = e.target;
    // ele.style.color = "green"
    if(e.target.tagName=="LI"){
        ele.style.color = "green"
    }
}

function remove(){
    let lista = document.querySelector("ul")
    if(lista){
        let li = lista.querySelector("li")
        if(li){
            lista.removeChild(li)
        }
        else{
            document.body.removeChild(lista)
        }
    }
    
}           

function addColor(){
    let ul = document.querySelector("ul");
    if(ul){
        // ul.style.color = "blue"
    let li = ul.querySelectorAll("li")
    for(let ele of li){
        ele.style.color = "blue"
    }
    }

}

function removeColor(){
    let ul = document.querySelector("ul")
    if (ul){
        let li = ul.querySelectorAll("li")
        let li2 = [...li];
        li = li2;
        li.reverse()
        for(let ele of li){
            if(ele.style.color == "blue" || ele.style.color == "green"){
                ele.style.color = "black"
                break
            }
        }
    }
}


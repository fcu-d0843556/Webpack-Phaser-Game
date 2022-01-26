const uploadList = {

}

window.addEventListener("load",function(){
    const chooseCard1 = document.getElementById("chooseCard1");
    const chooseCard2 = document.getElementById("chooseCard2");
    const chooseCard3 = document.getElementById("chooseCard3");
    const detailCard = document.getElementById("detailCard");


    const defaultPic1 = document.getElementById("defaultPic1");


    const defaultCard1 = document.getElementById("defaultCard1");

    const foodCan = document.getElementById("foodCan");
    const rawFood = document.getElementById("rawFood");
    const background = document.getElementById("background");

    chooseCard1.addEventListener('click',function(){
        highlightCard(chooseCard1);
        chooseCard2.style.border = "";
        chooseCard3.style.border = "";
    })


    chooseCard2.addEventListener('click',function(){
        highlightCard(chooseCard2);
        chooseCard1.style.border = "";
        chooseCard3.style.border = "";
    })

    chooseCard3.addEventListener('click',function(){
        highlightCard(chooseCard3);
        chooseCard1.style.border = "";
        chooseCard2.style.border = "";
    })

    defaultCard1.addEventListener('click',function(){
        if(defaultCard1.style.border == ""){
            defaultCard1.style.border = "5px #0d6efd solid";
            showPicDefault("/src/static/img/view1.png", "foodCan")
        }else{
            defaultCard1.style.border = "";
            showPicDefault("", "foodCan")
        }
    })

    if(foodCan){
        foodCan.addEventListener("change",function(event){
            console.log(event)
            showPicFile(event,"foodCan")
        })
    }

    if(rawFood){
        rawFood.addEventListener("change",function(event){
            showPicFile(event,"rawFood")
        })
    }

    if(background){
        background.addEventListener("change",function(event){
            showPicFile(event,"background")
        })
    }
})


const showPicFile = function(event, keyword){
    console.log("showPic type " + keyword)
    const file = event.target.files;

    const pic = document.getElementById( keyword + "_image");

    pic.src = URL.createObjectURL(file[0])
    uploadList[keyword] = pic.src
}

const showPicDefault = function(src , keyword){
    console.log("showPic type " + keyword)
    const defaultText = document.getElementById( keyword + "_default" )
    defaultText.value = src;
    const pic = document.getElementById( keyword + "_image")

    pic.src = src

    if(uploadList[keyword]&&src == ""){
        pic.src = uploadList[keyword]
    }


}

const highlightCard = function(item){
    if(item.style.border == ""){
        defaultCard1.style.border = "5px #0d6efd solid";
        item.style.border = "5px #0d6efd solid";
        detailCard.style.visibility = "visible";
        detailCard.style.backgroundColor = "red";
    }else{
        item.style.border = "";
        detailCard.style.visibility = "hidden";
        detailCard.style.backgroundColor = "";
    }

    defaultCard1.style.border = "";
    if(item == chooseCard1){
        defaultPic1.src = "/src/static/img/view1.png"
    }else if(item == chooseCard2){
        defaultPic1.src = "/src/static/img/view2.png"
    }else if(item == chooseCard3){
        defaultPic1.src = "/src/static/img/view3.png"
    }

}

const saveFormData = function(){
    console.log("hello!")
}


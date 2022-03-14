const uploadList = {

}
let cardSpot = 0
let boxSpot = 0
let chooseCardBoxs = []

window.addEventListener("load",function(){
    const chooseCard1 = document.getElementById("chooseCard1");
    const chooseCard2 = document.getElementById("chooseCard2");
    const chooseCard3 = document.getElementById("chooseCard3");

    for(let v=1;v<10;v++){
        let chooseCardBox = document.getElementById("chooseCardBox" + v);
        chooseCardBoxs.push(chooseCardBox)
    }



    const defaultCard1 = document.getElementById("defaultCard1");

    const foodCan = document.getElementById("foodCan");
    const rawFood = document.getElementById("rawFood");
    const background = document.getElementById("background");
    const boxObject_balloons = document.getElementById("boxObject_balloons");
    const boxObject_heartRed = document.getElementById("boxObject_heartRed");
    const boxObject_heartAqua = document.getElementById("boxObject_heartAqua");


    // chooseCard1.addEventListener('click',function(){
    //     highlightCard(chooseCard1);
    //     chooseCard2.style.border = "";
    //     chooseCard3.style.border = "";
    // })


    // chooseCard2.addEventListener('click',function(){
    //     highlightCard(chooseCard2);
    //     chooseCard1.style.border = "";
    //     chooseCard3.style.border = "";
    // })

    // chooseCard3.addEventListener('click',function(){
    //     highlightCard(chooseCard3);
    //     chooseCard1.style.border = "";
    //     chooseCard2.style.border = "";
    // })
    defaultCard1.addEventListener('click',function(){
        if(defaultCard1.style.border == ""){
            defaultCard1.style.border = "5px #0d6efd solid";
            switch(cardSpot){
                case 1:
                    showPicDefault("/src/static/img/view1.png", "foodCan")
                    break
                case 2:
                    showPicDefault("/src/static/img/view2.png", "background")
                    break
                case 3:
                    showPicDefault("/src/static/img/view3.png", "rawFood")
                    break
                default:
                    console.log("default")
                    break
            }

        }else{
            defaultCard1.style.border = "";
            switch(cardSpot){
                case 1:
                    showPicDefault("", "foodCan")
                    break
                case 2:
                    showPicDefault("", "background")
                    break
                case 3:
                    showPicDefault("", "rawFood")
                    break
                default:
                    console.log("default")
                    break
            }
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

    console.log(boxObject_balloons)
    console.log(boxObject_heartRed)

    console.log(boxObject_heartAqua)

    if(background){
        background.addEventListener("change",function(event){
            showPicFile(event,"background")
        })
    }

    if(boxObject_balloons){
        boxObject_balloons.addEventListener("change",function(event){
            showPicFile(event,"boxObject_balloons")
        })
    }

    if(boxObject_heartRed){
        boxObject_heartRed.addEventListener("change",function(event){
            showPicFile(event,"boxObject_heartRed")
        })
    }

    if(boxObject_heartAqua){
        boxObject_heartAqua.addEventListener("change",function(event){
            showPicFile(event,"boxObject_heartAqua")
        })
    }
})

const switchNextBox = function(type){
    
    if(type == 'next' && boxSpot<8){
        chooseCardBoxs[boxSpot].style.display = 'none'
        chooseCardBoxs[boxSpot+1].style.display = 'block'
        boxSpot++
    }else if(type == 'pre' && boxSpot>0){
        chooseCardBoxs[boxSpot].style.display = 'none'
        chooseCardBoxs[boxSpot-1].style.display = 'block'
        boxSpot--
    }

}

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
        cardSpot = 1
        defaultPic1.src = "/src/static/img/view1.png"
    }else if(item == chooseCard2){
        cardSpot = 2
        defaultPic1.src = "/src/static/img/view2.png"
    }else if(item == chooseCard3){
        cardSpot = 3
        defaultPic1.src = "/src/static/img/view3.png"
    }

}

const saveFormData = function(){
    console.log("hello!")
}

const test = function(){
    console.log("test: ")
    console.log(uploadList)
}


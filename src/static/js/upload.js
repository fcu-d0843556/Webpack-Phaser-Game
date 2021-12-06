const showPic = function(event, keyword){
    const file = event.target.files;
    const pic = document.getElementById( keyword + "Image");
    pic.src = URL.createObjectURL(file[0])
}

window.onload = function(){

    const foodCan = document.getElementById("foodCan");
    const rawFood = document.getElementById("rawFood");
    const background = document.getElementById("background");


    if(foodCan){
        foodCan.addEventListener("change",function(event){
            showPic(event,"foodCan")
        })
    }

    if(rawFood){
        rawFood.addEventListener("change",function(event){
            showPic(event,"rawFood")
        })
    }

    if(background){
        background.addEventListener("change",function(event){
            showPic(event,"background")
        })
    }
}

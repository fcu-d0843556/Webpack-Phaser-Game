
window.addEventListener("load",function(){

    const foodCan = document.getElementById("foodCan");
    const rawFood = document.getElementById("rawFood");
    const background = document.getElementById("background");
    const foodCanImage = document.getElementById("foodCanImage");

    if(foodCan){
        foodCan.addEventListener("change",function(event){
            foodCanImage.src = "/src/static/img/view1.png"
            console.log(foodCanImage)
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

    // const HelloVueApp = {
    //     data() {
    //         return {
    //         message: 'Hello Vue!!'
    //         }
    //     }
    // }
    // Vue.createApp(HelloVueApp).mount('#hello-vue')
})


const showPic = function(event, keyword){
    const file = event.target.files;
    const pic = document.getElementById( keyword + "Image");
    pic.src = URL.createObjectURL(file[0])
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


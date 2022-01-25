
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
        defaultCard1.style.border = "5px #0d6efd solid";
        const pic = document.getElementById( "foodCan" + "Image");
        pic.src = "/src/static/img/view1.png";

    })

    if(foodCan){
        foodCan.addEventListener("change",function(event){
            console.log(event)
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


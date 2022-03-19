const uploadList = {

}
let cardSpot = 0
let boxSpot = 0
let allGroup = {}
let allCard = {}
let highlightItem
window.addEventListener("load",function(){

    for(let v=1;;v++){
        let chooseCard = document.getElementById("chooseCard" + v);
        if(!chooseCard){
            break
        }
        allCard[chooseCard.id] = chooseCard
    }
    
    let saveId 
    let groupNum = 1
    let cardGroup = []
    for(let v=1;;v++){
        let chooseCardGroup = document.getElementById("chooseCardGroup" + v);
        if(!chooseCardGroup){
            let s = {
                items: cardGroup,
                count: 0
            }
            allGroup["cardGroup" + groupNum] = s
            break
        }
        console.log(chooseCardGroup)

        if(saveId == chooseCardGroup.id){
            let s = {
                items: cardGroup,
                count: 0
            }
            allGroup["cardGroup" + groupNum] = s
            groupNum++
            cardGroup = []
        }else{
            saveId = chooseCardGroup.id
            cardGroup.push(chooseCardGroup)
        }
    }   

    const background = document.getElementById("background");

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

    if(background){
        background.addEventListener("change",function(event){
            showPicFile(event,"background")
        })
    }

})
//highlightCard
const highlightCard = function(item){
    if(item.style.border == ""){
        if(highlightItem){
            highlightItem.style.border = "";
        }        
        item.style.border = "5px #0d6efd solid";
        detailCard.style.visibility = "visible";
        detailCard.style.backgroundColor = "red";
    }else{
        highlightItem.style.border = "5px #0d6efd solid";
        item.style.border = "";
        detailCard.style.visibility = "hidden";
        detailCard.style.backgroundColor = "";
    }
    highlightItem = item
}

const defaultPicShowCard = function(key){
    highlightCard(allCard[key]);
}

const defaultPicShowGroup = function(key){
    let spot = allGroup['cardGroup' + key].count
    highlightCard(allGroup['cardGroup' + key].items[spot]);
}
//highlightCard end

const switchNextBox = function(type,num){
    let spot = allGroup['cardGroup' + num].count
    if(type == 'next' && spot<allGroup['cardGroup' + num].items.length-1){
        allGroup['cardGroup' + num].items[spot].style.display = 'none'
        allGroup['cardGroup' + num].items[spot+1].style.display = 'block'
        allGroup['cardGroup' + num].count++
    }else if(type == 'pre' && spot>0){
        allGroup['cardGroup' + num].items[spot].style.display = 'none'
        allGroup['cardGroup' + num].items[spot-1].style.display = 'block'
        allGroup['cardGroup' + num].count--
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



const saveFormData = function(){
    console.log("hello!")
}

const test = function(){
    console.log("test: ")
    console.log(uploadList)
}


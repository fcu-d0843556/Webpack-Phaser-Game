
const uploadList = {

}
let cardSpot = 0
let boxSpot = 0
let allGroup = {}
let allCard = {}
let highlightItem
let highlightItemNum = 0
let highlightDefaultItem
let saveDefaultHighlight
window.addEventListener("load",function(){
    
    //single
    for(let v=1;;v++){
        let chooseCard = document.getElementById("chooseCard" + v);
        if(!chooseCard){
            break
        }
        allCard[chooseCard.id] = chooseCard

        let fileButton = document.getElementById(chooseCard.getAttribute("name"));
        if(fileButton !== null){
            fileButton.addEventListener('change',function(){
                showPicFile(this,chooseCard.getAttribute("name"))
            })
        }
        
    }
    
    let saveId 
    let groupNum = 1
    let cardGroup = []
    //Group
    for(let v=1;;v++){
        let chooseCardGroup = document.getElementById("chooseCardGroup" + v);
        if(!chooseCardGroup){
            let s = {
                items: cardGroup,
                count: 0
            }
            allGroup["cardGroup" + groupNum] = s

            let fileButton = document.getElementById(saveId);
            if(fileButton){
                fileButton.addEventListener('change',function(){
                    showPicFile(this,chooseCard.getAttribute("name"))
                })
            }
            
            break
        }

        if(saveId == chooseCardGroup.id){
            let s = {
                items: cardGroup,
                count: 0
            }
            allGroup["cardGroup" + groupNum] = s
            groupNum++
            cardGroup = []
        }else{
            // find file button.
            let fileButton = document.getElementById(saveId);

            if(fileButton){
                fileButton.addEventListener('change',function(){
                    showPicFile(this,chooseCard.getAttribute("name"))
                })
            }
            saveId = chooseCardGroup.id
            cardGroup.push(chooseCardGroup)
        }
    }   

    //default
    for(let v=1;;v++){
        let defaultCard = document.getElementById("defaultCard" + v);
        if(!defaultCard){
            break    
        }
        defaultCard.addEventListener('click',function(){
            highlightDefaultCard(this)
        })
    }

})

//highlightDefaultCard
const highlightDefaultCard = function(item){
    let getName = highlightItem.getAttribute('name')
    if(highlightItem.getAttribute('type') == 'group'){
        let find = document.getElementsByName( getName + "_default" )
        let findImg = item.querySelector("img")
        find[highlightItemNum].value = findImg.getAttribute('text')
        showPicDefault(find[highlightItemNum].value,getName)

    }else if(highlightItem.getAttribute('type') == 'single'){
        let find = document.getElementById( getName + "_default" )
        let findImg = item.querySelector("img")
        find.value = findImg.getAttribute('text')
        showPicDefault(find.value,getName)

    }
    
    if(item.style.border == ""){
        if(highlightDefaultItem){
            highlightDefaultItem.style.border = "";
        }
        item.style.border = "5px #0d6efd solid";
    }else{
        highlightDefaultItem.style.border = "5px #0d6efd solid";
        item.style.border = "";
    }
    highlightDefaultItem = item
}
//highlightDefaultCard end

//highlightCard
const highlightCard = function(item){
    if(item.style.border == ""){
        if(highlightItem){
            highlightItem.style.border = "";
        }        
        item.style.border = "5px #0d6efd solid";
        // console.log(item.getAttribute('name'))
        let find = document.getElementById(item.getAttribute('name') + '_default_image')
        // console.log(find)
        if(saveDefaultHighlight){
            saveDefaultHighlight.style.display = "none"
        }
        find.style.display = "flex"
        saveDefaultHighlight = find

        detailCard.style.visibility = "visible";
    }else{
        highlightItem.style.border = "5px #0d6efd solid";
        item.style.border = "";
        
        detailCard.style.visibility = "hidden";
    }
    highlightItem = item
}

const defaultPicShowCard = function(key){
    // console.log(allCard)
    highlightItemNum = 0
    highlightCard(allCard[key]);
}

const defaultPicShowGroup = function(key){
    let spot = allGroup['cardGroup' + key].count
    highlightItemNum = spot
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
    // console.log("showPic type " + keyword)
    const file = event.files[0];
    // console.log(file);
    const pic = document.getElementById( keyword + "_image");

    pic.src = URL.createObjectURL(file)
    uploadList[keyword] = pic.src
}

const showPicDefault = function(src , keyword){
    // console.log("showPic type " + keyword)
    const pic = document.getElementsByName( keyword + "_image")
    // console.log(highlightItemNum);
    pic[highlightItemNum].src = src

    if(uploadList[keyword]&&src == ""){
        pic.src = uploadList[keyword]
    }
}

const closeDetailCard = function(){
    detailCard.style.visibility = "hidden";
    detailCard.style.backgroundColor = "";
    highlightItem.style.border = "";
}

const saveFormData = function(){
    console.log("hello!")
}

const clearAllData = function(){
    location.href = "clear"
}

const createGame = function(){
    location.href = "createDone"
}
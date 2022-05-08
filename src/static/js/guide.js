window.onload = function(){
   

    let guideMark = document.getElementById("guideMark")
    guideMark.addEventListener("click",function(){
        // console.log("nihao");
        getGuide.value = "true"
        showGuide(getGuide)
    })
    
    let getGuide = document.getElementById("guide")
    if(getGuide.value == "true"){
        showGuide(getGuide)
    }

}

let showGuide = function(getGuide){
    let getMask = document.getElementById("mask")
    let allTip = document.getElementById("searchTip")
    let arrDivTips = allTip.getElementsByTagName("div")
    let arrATips = allTip.getElementsByTagName("a")
    let arrCloseTips = allTip.getElementsByTagName("span")

    let preFind

    if(getGuide.value == "true"){
        
        for(let i=0;i<arrATips.length;i++){
            arrDivTips[i].style.display = "none"
        }

        getMask.style.display = allTip.style.display = arrDivTips[0].style.display = "block"
        let defaultButton = document.getElementById("chooseCard1")
        defaultButton = defaultButton.getElementsByTagName("button")

        defaultButton[0].addEventListener("click", function() {
            if(getGuide.value == "true"){
                arrDivTips[2].style.display = "none"
                arrDivTips[3].style.display = "block"
                preFind = highlightSpot(2,preFind)
            }
        })

        for(let i=0;i<arrATips.length;i++){
            arrATips[i].index = i
            arrATips[i].addEventListener("click", function() {
                arrDivTips[i].style.display = "none"
                if(this.index < arrATips.length-1){
                    arrDivTips[i + 1].style.display = "block"
                    preFind = highlightSpot(i,preFind)
                }else if(this.index == arrATips.length-1){
                    getMask.style.display = "none"
                    getGuide.value = "false"
                    resetStyle()
                    
                }
            })
        }
    
        for(let i=0;i<arrCloseTips.length;i++){
            arrCloseTips[i].onclick = function(){
                getMask.style.display = allTip.style.display = "none"
                getGuide.value = "false"
                resetStyle()
            }
        }
    }
}

let highlightSpot = function(i,preFind){
    let find 
    switch( i + 1 ){
        case 1:
            find = document.getElementsByClassName("phone-style")
            find = find[0]
            find.style.zIndex = 1000
            break
        case 2:
            preFind.style.zIndex = null
            find = document.getElementById("chooseCard1")
            find.style.zIndex = 1000
            break
        case 3:
            find = document.getElementById("detailCard")
            if(find.style.visibility == 'hidden'){
                find.style.visibility = 'visible'
            }
            find.style.zIndex = 1000
            break
        case 4:
            preFind.style.zIndex = null
            find = document.getElementById("allCards")
            find.style.zIndex = 1000
            break
    }
    return find
}

let resetStyle = () => {
    const allArrTips = [
        "phone-style", "chooseCard1", "detailCard", "allCards"
    ]
    for(let i=0;i<allArrTips.length;i++){
        let find
        if(i==0){
            find = document.getElementsByClassName(allArrTips[i])
            find = find[0]
        }else{
            find = document.getElementById(allArrTips[i])
        }
        find.style.zIndex = null
    }
}
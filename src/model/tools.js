const multer = require('multer')
const path = require('path') //獲取文件名用
const sd = require('silly-datetime')
const mkdirp = require('mkdirp')
const fs = require('fs')

let userID

let tools = {

    multer() {
        //這裡的程式直接在官方找即可
        fileFilter = (req, file, cb) => {

            // The function should call `cb` with a boolean
            // to indicate if the file should be accepted
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                cb(new Error('Please upload an image'))
                cb(null, false)
            }

            cb(null, true)
        }

        const storage = multer.diskStorage({

            //配置上傳的目錄
            destination: async (req, file, cb) => {

                //1.獲取當前日期 20211016
                let day = sd.format(new Date(), 'YYYYMMDD')

                //2.按照日期生成圖片存儲目錄，mkdirp是一個異步的方法
                let dir = path.join("src/static/upload", req.session.username, req.session.gameID)
                await mkdirp(dir)

                cb(null, dir) //上傳之前目錄必須存在
            },
            //修改上傳後的文件名
            filename: function (req, file, cb) {
                //1.獲取後綴名
                // file.fieldname 獲取html sumbit後的name
                // file.originalname 獲取原本上傳檔案的名字

                // console.debug("filename")
                // console.debug(req)


                let extname = path.extname(file.originalname)

                //2.根據時間戳生成文件名

                cb(null, file.fieldname + extname)
            },
        })

        const upload = multer({
            fileFilter: fileFilter,
            storage: storage,
        })
        return upload

    },
    setUserId: function (Id) {
        userID = Id
        console.log("userID : " + userID)
    },

    getUserId: function () {
        console.log(userID)
        return userID
    },

    writeJSONFile: function (userID, gameID, uploadFiles, inputData) {

        console.log(inputData)
        fs.mkdirSync(`./src/static/upload/${userID}/${gameID}`, {
            recursive: true
        }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });

        let allItem = [

        ]




        let userData = fs.readFileSync(`./src/static/defaultData/${gameID}/defaultModifyData.json`)
        let defaultData = JSON.parse(userData.toString())
        //先寫入默認的檔案
        const user = {
            userName: userID,
            items: defaultData
        }
        // console.debug(defaultData);


        //可用預設圖片的覆蓋
        for (let num = 0; num < defaultData.length; num++) {

            //Group
            if(defaultData[num].items){

                
                console.log("inputData[defaultData[num].name + _default]");

                console.log(inputData[defaultData[num].name + "_default"]);
                //使用預設的圖片
                if (inputData[defaultData[num].name + "_default"] && inputData[defaultData[num].name + "_default"] != "") {
                    for(let i=0;i<inputData[defaultData[num].name + "_default"].length;i++){
                        user.items[num].items[i].src = inputData[defaultData[num].name + "_default"][i]
                    }
                }

               
                for(let numG=0 ;numG < defaultData[num].items.length;numG++){

                    //修改文字
                    if (inputData[defaultData[num].name + '_' + defaultData[num].items[numG].name + "_text"]) {
                        user.items[num].items[numG].text = inputData[defaultData[num].name + '_' + defaultData[num].items[numG].name + "_text"]
                    }

                    //修改大小
                    if (inputData[defaultData[num].name + '_' + defaultData[num].items[numG].name + "_size"]) {
                        user.items[num].items[numG].size = inputData[defaultData[num].name + '_' + defaultData[num].items[numG].name + "_size"]
                    }

                    //修改x
                    if (inputData[defaultData[num].items[numG].name + "_position_x"]) {
                        user.items[num].items[numG].position.x = parseInt(inputData[defaultData[num].items[numG].name + "_position_x"],10)
                    }

                    //修改y
                    if (inputData[defaultData[num].items[numG].name + "_position_y"]) {
                        user.items[num].items[numG].position.y = parseInt(inputData[defaultData[num].items[numG].name + "_position_y"],10)
                    }
                }

            //Single
            }else{ 
                //修改xy軸位置
                if (inputData[defaultData[num].name + "_position_x"]) {
                    console.log("x");
                    user.items[num].position.x = parseInt(inputData[defaultData[num].name + "_position_x"], 10)
                }
                if (inputData[defaultData[num].name + "_position_y"]) {
                    console.log("y");
                    user.items[num].position.y = parseInt(inputData[defaultData[num].name + "_position_y"], 10)
                }
                console.log(inputData[defaultData[num].name + "_size"]);
                console.log(defaultData[num].name);
                if (inputData[defaultData[num].name + "_size"]) {
                    console.log("_size");
                    user.items[num].size = parseInt(inputData[defaultData[num].name + "_size"], 10)
                }

                //使用預設的圖片
                if (inputData[defaultData[num].name + "_default"] && inputData[defaultData[num].name + "_default"] != "") {
                    user.items[num].src = inputData[defaultData[num].name + "_default"]
                }

                //修改文字
                if(inputData[defaultData[num].name + '_text']){
                    user.items[num].text.content = inputData[defaultData[num].name + "_text"]
                }
            }
        }

        //上傳檔案的覆蓋
        for (const [key, value] of Object.entries(uploadFiles)) {
            let group = value.fieldname.split('_')
            for (let num = 0; num < defaultData.length; num++) {

                if (value.fieldname == defaultData[num].name) {
                    let getSpiltName = value.filename.split('.')
                    user.items[num].type = getSpiltName[1]
                    user.items[num].src = `src/static/upload/${userID}/${gameID}/${value.filename}`
                    break
                } else if (group[0] == defaultData[num].name) {
                    let getSpiltName = value.filename.split('.')
                    for (let numG = 0; numG < user.items[num].items.length; numG++) {

                        if (user.items[num].items[numG].name == group[1]) {
                            user.items[num].items[numG].type = getSpiltName[1]
                            user.items[num].items[numG].src = `src/static/upload/${userID}/${gameID}/${value.filename}`
                        }
                    }

                }
            }
        }




        let JSONObject = JSON.stringify(user)

        // console.debug(JSONObject)

        fs.writeFileSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`, JSONObject, function (err) {
            if (err) {
                console.error(err)
            }
            console.log("OKOK")
        })
    },

    readUserJsonFiles: function (userID, gameID) {
        console.log("load readUser userID : " + userID + " gameID :" + gameID)
        let userData
        userData = fs.readFileSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`)
        let userDataTurn = userData.toString()
        let jsonData = JSON.parse(userDataTurn)

        return jsonData
    },

    readDefaultImageJsonFiles: function (gameID) {
        // console.log("load readImage gameID : " + gameID)
        let imageData
        imageData = fs.readFileSync(`./src/static/defaultData/defaultImageData.json`)
        let userDataTurn = imageData.toString()
        let jsonData = JSON.parse(userDataTurn)

        return jsonData
    },

    createDefaultJsonFile: function (userID, gameID) {
        console.log("createDefaultJsonFile")
        try {
            fs.readFileSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`)
            console.log("found save json!")

            return false
        } catch {
            console.log("not found save json")
            fs.mkdirSync(`./src/static/upload/${userID}/${gameID}`, {
                recursive: true
            }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('createDefaultJsonFile successfully!');
            });

            let read = fs.readFileSync(`./src/static/defaultData/${gameID}/defaultModifyData.json`)
            let defaultData = JSON.parse(read)

            const user = {
                userName: userID,
                items: defaultData
            }

            let JSONObject = JSON.stringify(user)

            fs.writeFileSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`, JSONObject, function (err) {
                if (err) {
                    console.error(err)
                }
                console.log("OKOK")
            })

            console.log('createDefaultJsonFile end!');
            return true
        }


    },

    deleteJsonData : function (userID, gameID) {
        fs.unlinkSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`,function(err){
            if (err) throw err;
        })
        console.log("ok!")
    }
}


module.exports = tools
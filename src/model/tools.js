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
                let dir = path.join("src/static/upload", req.session.username,req.session.gameID)
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
            fileFilter:fileFilter,
            storage: storage,
        })
        return upload

    },
    setUserId : function(Id){
        userID = Id
        console.log("userID : " + userID)
    },

    getUserId : function(){
        console.log(userID)
        return userID
    },

    writeJSONFile : function(userID,gameID,uploadFiles,inputData){

        console.log(inputData)
        fs.mkdir(`./src/static/upload/${userID}/${gameID}`, { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });

        let allItem = [

        ]



        fs.readFile(`./src/static/defaultData/${gameID}/defaultModifyData.json`,function(err,files){
            let defaultData = JSON.parse(files)
            //先寫入默認的檔案
            const user = {
                userName: userID,
                items: defaultData
            }
            // console.debug(defaultData);


            //可用預設圖片的覆蓋
            for(let num = 0; num<defaultData.length; num++){
                // console.debug(defaultData[num].name);
                if(inputData[ defaultData[num].name + "_default" ] && inputData[ defaultData[num].name + "_default" ] != ""){
                    // console.debug("find " + defaultData[num].name + "_default");
                    user.items[num].src = inputData[defaultData[num].name+"_default"]
                }
            }

            //上傳檔案的覆蓋
            for (const [key, value] of Object.entries(uploadFiles)) {
                // console.debug(key);
                // console.debug(value);
                console.debug("find" + key );
                for(let num = 0; num<defaultData.length; num++){
                    if(key == defaultData[num].name){
                        let getSpiltName = value[0].filename.split('.')
                        user.items[num].type = getSpiltName[1]
                        user.items[num].src = `src/static/upload/${userID}/${gameID}/${value[0].filename}`
                        break
                    }
                }
            }




            let JSONObject = JSON.stringify(user)

            // console.debug(JSONObject)

            fs.writeFile(`./src/static/upload/${userID}/${gameID}/userModifyData.json`,JSONObject, function(err){
                if(err){
                    console.error(err)
                }
                console.log("OKOK")
            })

        })
    },

    readUserJsonFiles : function(userID,gameID){
        console.log("load readUser userID : " + userID + " gameID :" + gameID)
        let userData
        userData = fs.readFileSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`)

        userData = JSON.parse(userData)
        return userData
    },

    createDefaultJsonFile : function(userID,gameID){
        console.log("createDefaultJsonFile")
        try{
            fs.readFileSync(`./src/static/upload/${userID}/${gameID}/userModifyData.json`)
            console.log("found save json!")
        }catch{
            console.log("not found save json")
            fs.mkdirSync(`./src/static/upload/${userID}/${gameID}`, { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('createDefaultJsonFile successfully!');
            });

            fs.readFile(`./src/static/defaultData/${gameID}/defaultModifyData.json`,function(err,files){
                let defaultData = JSON.parse(files)

                const user = {
                    userName: userID,
                    items: defaultData
                }

                let JSONObject = JSON.stringify(user)

                fs.writeFile(`./src/static/upload/${userID}/${gameID}/userModifyData.json`,JSONObject, function(err){
                    if(err){
                        console.error(err)
                    }
                    console.log("OKOK")
                })

            })
            console.log('createDefaultJsonFile end!');

        }


    }
}

module.exports = tools


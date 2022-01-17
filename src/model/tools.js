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
            console.debug("fileFilter")
            console.debug(req.data)
            console.debug(file)



            cb(null, true)
        }

        const storage = multer.diskStorage({

            //配置上傳的目錄
            destination: async (req, file, cb) => {

                //1.獲取當前日期 20211016
                let day = sd.format(new Date(), 'YYYYMMDD')
                // console.debug("destination")
                // console.debug(req)

                //2.按照日期生成圖片存儲目錄，mkdirp是一個異步的方法
                let dir = path.join("src/static/upload", req.session.username)
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

    writeJSONFile : function(userID){

        fs.mkdir(`./src/static/upload/${userID}/`, { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });

        let allItem = [

        ]

        let getFiles
        fs.readdir(`./src/static/upload/${userID}/`,function(err,files){
            if (err) {
                console.error(err);
                return
            }
            getFiles = files
            console.log("getFiles :  ")
            console.log(getFiles)

            for(let num=1;num<=getFiles.length;num++){
                if(getFiles[num-1]!="userModifyData.json"){
                    const item = {
                        name: getFiles[num-1],
                        src: `src/static/upload/${userID}/${getFiles[num-1]}`
                    }
                    allItem.push(item)
                }
            }

            console.debug(allItem)

            const user = {
                userName: userID,
                items: allItem
            }

            let JSONObject = JSON.stringify(user)

            console.debug(JSONObject)

            fs.writeFile(`./src/static/upload/${userID}/userModifyData.json`,JSONObject, function(err){
                if(err){
                    console.error(err)
                }
                console.log("OKOK")
            })
        })

    }
}

module.exports = tools


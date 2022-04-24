const webpack = require("webpack");
const path = require("path");
const fs = require('fs')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {  CleanWebpackPlugin } = require("clean-webpack-plugin");
const session = require('express-session')
const Models = require('../src/mongo.js')
const mongoose = require('mongoose')
// const bootstrap = require('bootstrap')

mongoose.connect('mongodb://127.0.0.1:27017/PhaserGame', function (err) {
  if (err) {
    console.debug(err)
    return
  }
  console.debug('數據庫連接成功')
})


const tools = require('../src/model/tools')
const ejs = require('ejs')
const express = require('express');
let userID = ""

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  node:{
    fs: "empty"
  },
  entry: {
    index: './src/index.js'
    // game: './src/index.js'
    // change: './src/static/js/change.js',
    // click: './src/static/js/clicked.js',
    // tools: './src/model/tools.js',
    // preloadImage: './src/static/js/preloadImage.js'
  },
  //devServer既可做到app.js的功能，其他的require也是寫在這裡
  devServer: {
    inline: true,

    port: 3000,

    publicPath: '/',

    setup(app) {
      app.set('views', './src/views')
      app.engine("html", ejs.__express)
      app.set("view engine", "ejs")

      app.use(express.urlencoded({
        extended: false
      }))
      app.use(express.json())
      app.use('/src',express.static(path.join(__dirname,'/src')));

      // app.use("/static", express.static('./static/'));
      // app.use(express.static(path.join(__dirname, '/node_modules')));

      app.use(session({
        secret: 'this is session', //服務器端生成 session 的簽名
        name: "Phaser",            //修改session對應的cookie的名稱
        resave: false,             //強制保存 session 即使它並沒有變化
        saveUninitialized: true,   //強制將未初始化的 session 存儲
        cookie:{
            maxAge: 30*60*1000,    //release: 10*60*1000  test: 30*60*1000
            secure: false          //true表只有https協議才能訪問cookie
        },
        rolling:true               //在每次請求時強行設置 cookie, 這將重置 cookie 過期時間（默認：false）
      }))

      //首頁
      app.get("/", function (req, res) {
        if(req.session.username){
          console.debug("user is : " + req.session.username)
        }else{
          //console.debug("not")
        }

        res.render("home",{
          username: req.session.username
        })
      })
      
      app.get("/logout",function(req,res){
        req.session.username = ""
        res.redirect("/")
      })
      //點擊註冊按鈕
      app.get("/register", function (req, res) {
        res.render("register",{
          username: req.session.username
        })
      })

      //使用註冊時
      app.post("/doRegister", async function (req, res) {

        Models.userModel.findOne().
          where('username').equals(req.body.username).
          exec(function (error,userInstance) {
            console.debug(userInstance)
            if(error){
              return handleError(error)
            }
            if (!userInstance) {
              Models.userModel.create({
                'username': req.body.username,
                'password': req.body.password
              }, function (err,userInstance) {
                if (err) {
                  return handleError(err)
                }
                console.debug("註冊成功")
              })

              userID = req.body.username
              req.session.username = userID
              res.redirect("/")
            }else{

            }
          })
      })

      //點擊登入功能
      app.get("/login", function (req, res) {
        res.render("login")
      })

      //點擊chooseGame按鈕
      app.get("/chooseGame",function(req,res){
        res.render("chooseGame",{
          username: req.session.username
        })
      })

      //點擊chooseGame中的任意遊戲
      app.post("/chooseGame",function(req,res){
        console.log("chooseGame!")
        console.log(req.body)
        req.session.gameID = req.body.getGameID
        tools.createDefaultJsonFile(userID,req.session.gameID)
        console.log("lookme")
        res.redirect('/index')
      })

      //手機版編輯遊戲
      app.get("/uploadFile", function (req, res) {
        res.render("uploadFile",{
          username: req.session.username,
          gameID: req.session.gameID,
          password: false,
          userJsonData: tools.readUserJsonFiles(req.session.username,req.session.gameID),
          userImageData: tools.readDefaultImageJsonFiles(req.session.gameID)
        })
      })
      
      //電腦版編輯遊戲+遊玩，手機版遊玩
      app.get("/index",function(req,res){
        res.render("index",{
          username: req.session.username,
          gameID: req.session.gameID,
          password: false,
          userJsonData: tools.readUserJsonFiles(req.session.username,req.session.gameID),
          userImageData: tools.readDefaultImageJsonFiles(req.session.gameID)
        })
      })


      //點擊回到默認
      app.get("/clear",function(req,res){
        tools.deleteJsonData(userID,req.session.gameID)
        tools.createDefaultJsonFile(userID,req.session.gameID)
        res.redirect('/index')
      })

      //點擊登入
      app.post("/doLogin",function(req,res){
        // console.debug(req.body)

        Models.userModel.findOne({
          username: req.body.username,
          password: req.body.password
        },function(err,userInstance){
          console.debug(userInstance)

          if(userInstance){
            userID = req.body.username
            req.session.username = userID
            res.redirect('/')
          }else{

          }
        })
      })
      

      //點擊上傳按鈕後
      app.post('/doUpload',tools.multer().any() ,function (req, res) {
        tools.writeJSONFile(req.session.username,req.session.gameID,req.files,req.body);
        res.redirect('/index');
      })


      app.get('/game/:name/:gameID' , function(req,res){
        let name = req.params.name
        let gameID = req.params.gameID
        
        res.render("game",{
          username: name,
          gameID: gameID,
          password: true,
          userJsonData: tools.readUserJsonFiles(name,gameID),
          userImageData: tools.readDefaultImageJsonFiles(name.gameID)
        })
      })

      app.get('/createDone',tools.multer().any() ,function (req, res) {
        res.render('createDone',{
          username: req.session.username,
          gameID: req.session.gameID
        });
      })
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'uploadFile',
    //   template: "./src/views/uploadFile.html",
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'index',
    //   template: "./src/views/index.html",
    //   chunks: ['index', 'change','tools'],
    //   username: "123"
    // }),
  ]
};

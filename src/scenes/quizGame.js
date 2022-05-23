import Phaser from "phaser"
import Score from "../firstGameSystem/objects/Score"
import ImgControl from "../firstGameSystem/quiz/imgControl"

export default class QuizGame extends Phaser.Scene{
    constructor(userID,appSpot){
        super("quiz")
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot
        
    }


    preload(){
       this.load.image('sky','src/assets/background.png')
       this.load.image('correct','src/assets/correct.png')
       this.load.image('wrong','src/assets/wrong.png')
       
    }

    create(){
        
        // this.add.image(100,320,'sky')
        this.correct = new ImgControl(this,'correct') 
        this.wrong = new ImgControl(this,'wrong')
        
        let scoreStyle = {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: 'black',
            backgroundColor: 'white',
            fixedWidth: 360,
            fixedHeight: 45
        }
        const scoreTextLabel = this.add.text(0,0, '得分', scoreStyle)
        this.scoreText = new Score(this,scoreTextLabel,'得分',0)
        this.scoreText.showScoreText()

        this.data1 = [{text: '問題 1 :\n\n我最喜歡吃的水果是 ?'},
            {text: '蘋果',answer: 'X'},{text: '香蕉',answer: 'O'},
            {text: '葡萄',answer: 'X'},{text: '芭樂',answer: 'X'}
        ]
        this.data2 = [{text: '問題 2 :\n\n我最喜歡電影類型是 ?'},
            {text: '浪漫愛情',answer: 'X'},{text: '搞笑喜劇',answer: 'O'},
            {text: '恐怖',answer: 'X'},{text: '動作',answer: 'X'}
        ]
        this.data3 = [{text: '問題 3 :\n\n我最喜歡的顏色是 ?'},
            {text: '紅色',answer: 'X'},{text: '黃色',answer: 'O'},
            {text: '粉紅色',answer: 'X'},{text: '綠色',answer: 'X'}
        ]
        this.data4 =  [{text: '問題 4 :\n\n我最喜歡的動物是 ?'},
            {text: '貓',answer: 'X'},{text: '狗',answer: 'O'},
            {text: '鸚鵡',answer: 'X'},{text: '蜥蜴',answer: 'X'}
        ]
        this.data5 =  [{text: '問題 5 :\n\n說一句我想聽到的話 ！'},
            {text: '我愛你！',answer: 'O'},{text: '早點休息！',answer: 'X'},
            {text: '去吃大餐！',answer: 'X'},{text: '晚安！',answer: 'X'}
        ]
        this.data6 =  [{text: '問題 6 :\n\n我最想結婚的年齡是 ?'},
            {text: '25 - 30',answer: 'O'},{text: '30 - 35',answer: 'X'},
            {text: '35 - 40',answer: 'X'},{text: '20 - 25',answer: 'X'}
        ]
        this.data7 =  [{text: '問題 7 :\n\n我最喜歡你身上的哪一點 ?'},
            {text: '性格',answer: 'O'},{text: '外表',answer: 'X'},
            {text: '事業',answer: 'X'},{text: '都喜歡！',answer: 'X'}
        ]
        this.data8 =  [{text: '問題 8 :\n\n我最喜歡怎麼樣的約會活動 ?'},
            {text: '看電影',answer: 'O'},{text: '吃大餐',answer: 'X'},
            {text: '在家裡度過一天',answer: 'X'},{text: '遊樂園',answer: 'X'}
        ]
        this.data9 =  [{text: '問題 9 :\n\n未來我想和你去哪個國家旅行 ?'},
            {text: '法國',answer: 'X'},{text: '義大利',answer: 'O'},
            {text: '日本',answer: 'X'},{text: '希臘',answer: 'X'}
        ]
        this.data10 =  [{text: '問題 10 :\n\n我們第一次約會的地點是 ?'},
            {text: '電影院',answer: 'X'},{text: '我的家中',answer: 'X'},
            {text: '咖啡店',answer: 'O'},{text: '你的家中',answer: 'X'}
        ]
        this.data11 =  [{text: '問題 11 :\n\n我喜歡怎麼樣的自然環境 ?'},
            {text: '海灘',answer: 'X'},{text: '山中',answer: 'X'},
            {text: '森林',answer: 'O'},{text: '海洋',answer: 'X'}
        ]
        this.data12 =  [{text: '問題 12 :\n\n我的生日是哪一天 ?'},
            {text: '3/12',answer: 'X'},{text: '7/20',answer: 'O'},
            {text: '10/5',answer: 'X'},{text: '5/5',answer: 'X'}
        ]
        this.data13 =  [{text: '問題 13 :\n\n我最喜歡你性格上的哪一點 ?'},
            {text: '溫柔體貼',answer: 'O'},{text: '誠實',answer: 'X'},
            {text: '努力充實自己',answer: 'X'},{text: '幽默',answer: 'X'}
        ]
        this.data14 =  [{text: '問題 14 :\n\n我們彼此相似的地方 ?'},
            {text: '喜歡玩遊戲',answer: 'O'},{text: '喜歡看小說',answer: 'X'},
            {text: '喜歡運動',answer: 'X'},{text: '喜歡聽音樂',answer: 'X'}
        ]
        this.data15 =  [{text: '問題 15 :\n\n我的幸運數字是 ?'},
            {text: '7',answer: 'O'},{text: '3',answer: 'X'},
            {text: '6',answer: 'X'},{text: '9',answer: 'X'}
        ]
        this.data16 =  [{text: '問題 16 :\n\n我的星座是 ?'},
            {text: '天秤座',answer: 'O'},{text: '巨蟹座',answer: 'O'},
            {text: '雙魚座',answer: 'X'},{text: '金牛座',answer: 'X'}
        ]


        this.questionNumber = 0
        this.questionGroup = [
            this.data1,
            this.data2,
            this.data3,
            this.data4,
            this.data5,
            this.data6,
            this.data7,
            this.data8,
            this.data9,
            this.data10,
            this.data11,
            this.data12,
            this.data13,
            this.data14,
            this.data15,
            this.data16
        ]
        this.createQuestion()
        this.changeQuestion(this.questionGroup[this.questionNumber])
        
    }
    createQuestion(){
        this.textGroup = []

        let questionStyle = {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: 'white',
            backgroundColor: '#000000',
            fixedWidth: 360,
            fixedHeight: 250
        }

        this.questionText = this.add.text(0,45,'',questionStyle)

        let answerStyle = [
            {
                x: 0,
                y: 295,
                backgroundColor: '#43B522',
            },{
                x: 185,
                y: 295,
                backgroundColor: '#4DC9DB',
            },{
                x: 0,
                y: 470,
                backgroundColor: '#F2C052',
            },{
                x: 185,
                y: 470,
                backgroundColor: '#9e66ff',
            }
        ]

        for(let i=0;i<4;i++){
            let text = this.add.text(answerStyle[i].x,answerStyle[i].y,'' ,{
                fontSize: '32px',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: answerStyle[i].backgroundColor,
                fixedWidth: 180,
                fixedHeight: 170,
                align: 'center',
            })

            text.setInteractive().on('pointerdown',function(){

                if(text.getData('answer')=='O'){
                    this.correct.setImgVisible(true)
                    this.wrong.setImgVisible(false)
                    this.scoreText.addScore(10)
                    
                }else if(text.getData('answer')=='X'){
                    this.wrong.setImgVisible(true)
                    this.correct.setImgVisible(false)
                    this.scoreText.addScore(-10)
                }
                this.questionNumber++
                this.changeQuestion(this.questionGroup[this.questionNumber])
                
            },this)
            this.textGroup.push(text)
        }
    }

    changeQuestion(data){
        this.questionText.setText(data[0].text)
    
        let repeat = [0,0,0,0]
        let type = ['A','B','C','D']
        let times = 0
        while(times < 4){
            let random = Math.floor(Math.random() * 4)
            if(!repeat[random]){
                this.textGroup[times].setData('answer',data[random + 1].answer)
                this.textGroup[times].setText(type[times] + '\n' + data[random + 1].text)
                repeat[random] = 1
                times++
            }
        }
    }

    update(){
    }

}
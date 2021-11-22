import Phaser from 'phaser'


export default {
	type: Phaser.AUTO,
	parent: 'phaser-app',
	width: 360, //800
	height: 640, //600
	backgroundColor: '#000111',
	dom: {
	  createContainer: true,
	},
	scale:{
		autoCenter: Phaser.Scale.CENTER_BOTH,
		mode:Phaser.Scale.ScaleModes.FIT
	},
	physics: {
	  default: 'arcade',
	  arcade: {
		gravity: { x: 0, y: 0 },
	  },
	},
	// scene: {
	// 	pack: {
	// 		files: [
	// 			{ type: 'image', key: 'foodCan', url: `src/static/upload/${userPath}/btn_login_hover.png` },
	// 		]
	// 	}
	// }

  };


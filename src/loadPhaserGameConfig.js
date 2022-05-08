import Phaser from 'phaser'


export default {
	type: Phaser.CANVAS,
	parent: 'phaser-app',
	width:  window.innerWidth * window.devicePixelRatio, //800
	height: window.innerHeight * window.devicePixelRatio, //600
	backgroundColor: '#000111',
	dom: {
	  createContainer: true,
	},
	scale:{
		//autoCenter: Phaser.Scale.CENTER_BOTH,
		// mode:Phaser.Scale.RESIZE,
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


const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 1000,
    physics: {
        default: 'arcade',
        
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
        
    }
};

const game = new Phaser.Game(config);

let player;
let coins;
let keys;
let bots;
let cursors;
let score = 0;
let keyScore=0;
let scoreText;
let keyText;
let players = [];
let directions = [];
let decisions = [];
let moveDurations = [];
let timers = [];
let speeds = 140; 
let startTime;


function preload() {
    this.load.image('player', 'https://cdn-icons-png.flaticon.com/128/742/742751.png');
    this.load.image('bot', 'https://cdn-icons-png.flaticon.com/512/595/595582.png'); // Replace with your player image
    this.load.image('key', 'https://cdn-icons-png.flaticon.com/512/807/807241.png');
    this.load.image('coin', 'https://static.vecteezy.com/system/resources/thumbnails/023/588/193/small/coin-with-dollar-sign-golden-dollar-symbol-gold-coin-3d-stack-of-gold-coins-icon-isolated-symbol-png.png'); // Replace with your coin image
}
//bot = this.physics.add.sprite(50, 500, 'bot').setOrigin(10, 10).setScale(0.15);
//bot.setCollideWorldBounds(true);

function create() {
    this.cameras.main.setBackgroundColor('#190321');     
    this.cameras.main.setZoom(0.5); // Zoom out to show more of the game world
    
    // Initialize player, coins, bots, etc.
    player = this.physics.add.sprite(50, 50, 'player').setScale(0.15);
    player.setCollideWorldBounds(true);
    

    maze2 = [ ' ',' ',
        '  WW    WWWWWCCCCWWTWW     WWCCCCCCWWW',
        '  WWWWCCCCCCCCCCC       TWCCCCCW WCCCC',
        '  WWWCCCCW CCCCCCCCWW     WCCCCCCCCCCC',
        '  WCCCCWW     CCCCCC CCCC      WWWTWWK',
        '  WCCCCCC CCCCWWWWW      CCCCCCTCCBCCC',
        '  WWWCCCCC     WWBCCCCTCCCCC      WWWW',
        '  WWCCCC CCCTCCWWW     CCCCCCCCCCCCWWW',
        '  KWCCCCCCW     WWWWTWWCCCWWWBWCCCCWWW',
        '  WWWW WW WWWCCCCCWWWW    WWWWWW   WWW',
        '  WCCCCCWWWWW     WWWCCCCCWWWBWW    WW',
        '  CCCCCCC   CCCCCCTCCCCCCBCC     CCCCK',
        '  CCCCWCCCCCCCCC     CCCCCBCCCTCWWWWWW',
        '  WW     CCCCWWWWCCCCCTCCCBCC     CCCC',
        '  WWCCCWWWWCCCCCC     TWWBCCCCC     WW',
        '  WWCC     CCCCCCCCTCCCCCCCCCCCCBCCCCW',
        
    ];
    maze = [' ',' ',
        ' WWWW  WWWWWWWWWWWWWWW  WWWWWWWWWWWWWW',
        ' WWWWWWWWW  WWWWWWW  WWWWWWWWWW  WWWWW',
        ' WWWWW  WWWWWWWWWWWWWWWWW  WWWWWWWWWWW',
        ' WWWWWWWWWWWWWWW  WWWWWWWWWWWWWWW  WWW',
        ' WWWWWWWW  WWWWWWWWWWWWWW  WWWWWWWWWWW',
        ' WWWWWWWWWWWWWWWW  WWWWWWWWWWWWWW  WWW',
        ' WWWWWW  WWWWWWWWWWWWWWWW  WWWWWWWWWWW',
        ' WWWWWWWWWWW  WWWWWW  WWWWWWWWWWWWWWWW',
        ' WWWWW  WWWWWWWWWWWWWWWWWWWWWW  WWWWWW',
        ' WWWWWWWWWWWWWWW  WWWWWW  WWWWWWWWWWWW',
        ' WWWWWW  WWWWWWWWWW  WWWWWWWWWWW  WWWW',
        ' WWWWWWWWWWWW  WWWWWWWWWW  WWWWWWWWWWW',
        ' W  WWWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWW',
        ' WWWWWwWW  WWWWWWWWWWWWWWWWW  WWWWWWWW',
        ' WWWWWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWWW',
        
    ];
    maze3 = [' ',' ',' ',' ',
        'IWWWW  WWWWWWWWWWWWWWW  WWWWWWWWWWWWW I',
        'IWWWWWWWWW  WWWWWWW  WWWWWWWWWW  WWWW I',
        'IWWWWW  WWWWWWWWWWWWWWWWW  WWWWWWWWWW I',
        'IWWWWWWWWWWWWWWW  WWWWWWWWWWWWWWW  WW I',
        'IWWWWWWWW  WWWWWWWWWWWWWW  WWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWW  WWWWWWWWWWWWWW  WW I',
        'IWWWWWW  WWWWWWWWWWWWWWWW  WWWWWWWWWW I',
        'IWWWWWWWWWWW  WWWWWW  WWWWWWWWWWWWWWW I',
        'IWWWWW  WWWWWWWWWWWWWWWWWWWWWW  WWWWW I',
        'IWWWWWWWWWWWWWWW  WWWWWW  WWWWWWWWWWW I',
        'IWWWWWW  WWWWWWWWWW  WWWWWWWWWWW  WWW I',
        'IWWWWWWWWWWWW  WWWWWWWWWW  WWWWWWWWWW I',
        'IWW  WWWWWWWWWWWWWW  WWWWWWWWWWWWWWWW I',
        'IWWWWWWWW  WWWWWWWWWWWWWWWWW  WWWWWWW I',
        'IWWWWWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWW I',
        'IWWWW  WWWWWWWWWWWWWWW  WWWWWWWWWWWWW I',
        'IWWWWWWWWW  WWWWWWW  WWWWWWWWW  WWWWW I',
        'IWWWWW  WWWWWWWWWWWWWWWWW  WWWWWWWWWW I',
        'IWWWWWWWWWWWWWWW  WWWWWWWWWWWWWW  WWW I',
        'IWWWWWWWW  WWWWWWWWWWWWW  WWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWW  WWWWWWWWWWWWW  WWW I',
        'IWWWWWW  WWWWWWWWWWWWWWW  WWWWWWWWWWW I',
        'IWWWWWWWWWWW  WWWWWW  WWWWWWWWWWWWWWW I',
        'IWWWWW  WWWWWWWWWWWWWWWWWWWWW  WWWWWW I',
        'IWWWWWWWWWWWWWWW  WWWWW  WWWWWWWWWWWW I',
        'IWWWWWW  WWWWWWWWW  WWWWWWWWWWW  WWWW I',
        'IWWWWWWWWWWWW  WWWWWWWWW  WWWWWWWWWWW I',
        'IWW  WWWWWWWWWWWWW  WWWWWWWWWWWWWWWWW I',
        'IWWWWWWWW  WWWWWWWWWWWWWWWW  WWWWW  W I',
        'IWWWWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWWWI',
        
    ];
    this.cameras.main.setBackgroundColor('#190321');
    var coinPositions = [];
    var keysPositions = [];
    let walls = [];
    let beams = [];
    var array=[];
    var arrayT=[];
    var arrayK=[];
    let boxes = [];
    
    
    for (let i = 0; i < maze3.length; i++) {
        for (let j = 0; j < maze3[i].length; j++) {
            if (maze3[i][j] === 'I') {
                const boundary1 = this.add.text(j * 20, i * 25, '│', {
                fontSize: '45px',
                fill: '#05f5f5',
                fontFamily: 'Arial'
        }).setOrigin(0, 0).setScale(0.50);
        
            this.physics.add.existing(boundary1, true);
            walls.push(beams);
        

    }}}
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            
        
            if (maze[i][j] === 'W') {
                const boundary = this.add.text(j * 20, i * 50, '—', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0, 0).setScale(0.5);
                
                // Set the wall as a static body for collision
                this.physics.add.existing(boundary, true);
                walls.push(boundary);
            }
            if(maze2[i][j]=='C'){
                const x = j*20;
                const y = i*50-12;
                array.push({x,y});
                console.log(x,y);    
            }
            if(maze2[i][j]=='T'){
                const x = j*20;
                const y = i*50-12;
                arrayT.push({x,y});
                console.log(x,y);
            }
            if(maze2[i][j]=='K'){
                const x = j*20;
                const y = i*50-12;
                arrayK.push({x,y});
                console.log(x,y);
            }
            if (maze2[i][j] === 'B') {
                const box = this.add.text(j * 20, i * 50-12, '', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0,0).setScale(0.5);
                
                this.physics.add.existing(box, true);
                boxes.push(box);}
        }}
        coinPositions=array;
        botPositions=arrayT;
        keysPositions=arrayK;

        coins = this.physics.add.group();
        bots = this.physics.add.group();
        keys = this.physics.add.group();

        botPositions.forEach(p => {
            const bot = bots.create(p.x, p.y, 'bot');
            bot.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            bot.setScale(0.06);
            decisions.push(Math.round(Math.random()))
            //directions.push(1); 
            //moveDurations.push(Phaser.Math.Between(1000, 3000)); 
            //timers.push(this.time.now);
    });
        coinPositions.forEach(pos => {
            const coin = coins.create(pos.x, pos.y, 'coin');
            coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            coin.setScale(0.05);
    });
        keysPositions.forEach(pos => {
            const key = keys.create(pos.x, pos.y, 'key');
            key.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            key.setScale(0.05);
});

    
    

    this.physics.add.collider(player, walls);
    this.physics.add.collider(bots, walls);

    this.physics.add.collider(player, beams)

    this.physics.add.collider(player, bots, this.hitBomb, null, this);




    bots.getChildren().forEach(bot => {
        //this.physics.add.collider(player, bot, this.hitBomb, null, this)
        this.physics.add.collider(bot,beams)   
    });
    //bots.getChildren().forEach(bot => {this.physics.add.collider(bot, boxes)});
    //startTime = this.time.now;

    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.overlap(player, keys, collectKeys, null, this);

    keyText = this.add.text(450, 16, 'Keys Collected: 0', { fontSize: '32px', fill: '#fff' });
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    cursors = this.input.keyboard.createCursorKeys();
    
}

function update() {

    bots.getChildren().forEach((bot,index)=>{
        //Bot should move from 40 to 740
        if (decisions[index] == 0)
            if(bot.x < 736)
                bot.x = bot.x + 2
            else{
                decisions[index] = 1
                bot.x = bot.x - 2
            }
        else{
            if(bot.x > 44)
                bot.x = bot.x-2
            else{
                decisions[index] = 0
                bot.x = bot.x + 2
            }
            
        }
		if (this.gameOver)
            {
                return
            }        
    /*const elapsedTime = this.time.now - timers[index];
    if (elapsedTime < moveDurations[index]) {
        bot.x += directions[index] * (speeds * this.game.loop.delta / 1000); // Convert delta time to seconds
    }  else {
        directions[index] *= -1;
        timers[index] = this.time.now;
        moveDurations[index] = Phaser.Math.Between(1000, 3000); 
    }})*/
})

    //Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}


function collectCoin(player, coin) { 
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

}
function collectKeys(player, key) { 
    key.disableBody(true, true);
    keyScore += 1;
    keyText.setText('Keys Collected: ' + keyScore);

}
/*
hitBomb(player, bots)
	{
		this.physics.pause()
		player.setTint(0xff0000)
		player.anims.play('turn')
		this.gameOver = true
	}*/

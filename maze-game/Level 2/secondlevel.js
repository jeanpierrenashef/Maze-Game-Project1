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
let cursors;
let score = 0;
let scoreText;
let players = [];
let directions = [];
let decisions = [];
let moveDurations = [];
let timers = [];
let speeds = 140; 
let startTime;
let winStatus=false;


function preload() {
    this.load.image('player', 'https://cdn-icons-png.flaticon.com/128/742/742751.png');
    this.load.image('bot', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHzqyMhVvW_nyQoFPUheldQ0ZOnZiwGOBqw&s'); // Replace with your player image
    this.load.image('diamond', 'https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png'); // Replace with your player image
     // Replace with your player image
    this.load.image('coin', 'https://static.vecteezy.com/system/resources/thumbnails/023/588/193/small/coin-with-dollar-sign-golden-dollar-symbol-gold-coin-3d-stack-of-gold-coins-icon-isolated-symbol-png.png'); // Replace with your coin image
}
//bot = this.physics.add.sprite(50, 500, 'bot').setOrigin(10, 10).setScale(0.15);
//bot.setCollideWorldBounds(true);

function create(){
    this.cameras.main.setBackgroundColor('#091538');     
    this.cameras.main.setZoom(0.8); // Zoom out to show more of the game world
    
    // Initialize player, coins, bots, etc.
    player = this.physics.add.sprite(50, 50, 'player').setScale(0.15);
    player.setCollideWorldBounds(true);
    

    maze2 = [ ' ',' ',
        '  WW    WWWWWCCCCWWTWW     WWCCCCCCWWW',
        '  WWWWCCCCCCCCCCC       TWCCCCCW WCCCC',
        '  WWWCCCCW CCCCCCCCWW     WCCCCCCCCCCC',
        '  WCCCCWW     CCCCCC CCCC      WWWTWWW',
        '  WCCCCCC CCCCWWWWW      CCCCCCTCCBCCC',
        '  WWWCCCCC     WWBCCCCTCCCCC      WWWW',
        '  WWCCCC CCCTCCWWW     CCCCCCCCCCCCWWW',
        '  WWCCCCCCW     WWWWTWWCCCWWWBWCCCCWWW',
        '  WWWW WW WWWCCCCCWWWW    WWWWWW   WWW',
        '  WCCCCCWWWWW     WWWCCCCCWWWBWW    WW',
        '  CCCCCCC   CCCCCCTCCCCCCBCC     CCCCC',
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
        ' WWWWWWWWWWWWWWWWW N  WWWWWWWWWWWWWWWW',
        
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
        'IWWWWWWWWWWWWWWWWNNNWWWWWWWWWWWWWWWWWWI',
        
    ];
    var coinPositions = [];
    let walls = [];
    let beams = [];
    var array=[];
    var arrayT=[];
   

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
            
        /*if(maze[i][j]==='N'){
            
            const x = j*20;
                const y = i*50;
                arrayG.push({x,y});
                console.log(x,y); 

        }*/
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
        

        coins = this.physics.add.group();
        bots = this.physics.add.group();
        

        
            const gate = this.physics.add.sprite(400, 820, 'diamond');
            gate.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            gate.setScale(0.06);

    
        botPositions.forEach(p => {
            const bot = bots.create(p.x, p.y, 'bot');
            bot.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            bot.setScale(0.15);
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

    
    

    this.physics.add.collider(player, walls);
    this.physics.add.collider(bots, walls);
    this.physics.add.overlap(player, gate,()=>{
        const winningtext = this.add.text( 1000,  300, 'Congratulations, you WIN', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        winningtext.setVisible(true);
        const winningtext2 = this.add.text( 1000,  400, 'You can return to the main menu', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        winningtext2.setVisible(true);
        const returnbtn = this.add.text( 1000,  500, 'Main Menu', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        returnbtn.setVisible(true);
        const reloadbtn = this.add.text( 1200,  500, 'Replay', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        reloadbtn.setVisible(true);
        this.scene.pause();
        
    },null,this);


    this.physics.add.collider(player, beams)

    this.physics.add.collider(player, bots, ()=>{
        const loosingtext = this.add.text( 1000,  300, 'Game Over, you LOST', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        loosingtext.setVisible(true);
        const loosingtext2 = this.add.text( 1000,  400, 'You can return to the main menu', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        loosingtext2.setVisible(true);
        const returnbtn2 = this.add.text( 1000,  500, 'Main Menu', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        returnbtn2.setVisible(true);
        const reloadbtn2 = this.add.text( 1200,  500, 'Replay', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        reloadbtn2.setVisible(true);
        this.scene.pause();
    }, null, this);
    




    bots.getChildren().forEach(bot => {
        //this.physics.add.collider(player, bot, this.hitBomb, null, this)
        this.physics.add.collider(bot,beams)   
    });
    //bots.getChildren().forEach(bot => {this.physics.add.collider(bot, boxes)});
    //startTime = this.time.now;

    this.physics.add.overlap(player, coins, collectCoin, null, this);

    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    cursors = this.input.keyboard.createCursorKeys();

}

function loose(){
    console.log('loose');
}
function win(scene){
    return true;
    
    winStatus=true;
    console.log(winStatus);
    //scene.winningtext.setVisible(true);

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
hitBomb(player, bots)
	{
		this.physics.pause()
		player.setTint(0xff0000)
		player.anims.play('turn')
		this.gameOver = true
	}

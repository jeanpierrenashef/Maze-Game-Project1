const config = {
    type: Phaser.AUTO,
    width: 1500,
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
let speeds = 100; 
let startTime;
const xMin = 20;
const yMin = 20;
const xMax =1300;
const yMax = 620;

function preload() {
    this.load.image('player', 'https://cdn-icons-png.flaticon.com/128/742/742751.png');
    this.load.image('bot', 'https://cdn-icons-png.flaticon.com/512/761/761229.png'); // Replace with your player image
    this.load.image('key', 'https://cdn-icons-png.flaticon.com/512/807/807241.png');
    this.load.image('coin', 'https://static.vecteezy.com/system/resources/thumbnails/023/588/193/small/coin-with-dollar-sign-golden-dollar-symbol-gold-coin-3d-stack-of-gold-coins-icon-isolated-symbol-png.png'); // Replace with your coin image
    this.load.image('diamond', 'https://cdn-icons-png.flaticon.com/512/408/408472.png'); }

function create() {
     
    this.cameras.main.setZoom(0.8);

    player = this.physics.add.sprite(50, 50, 'player').setScale(0.15);
    player.setCollideWorldBounds(true);

    mazee2 = [' ',  
        'WWWWWWW    WWWWWWWWWWWW     WWWWWWWWWWWWWWW     WWWWWWWW ',
        'WCWWCWWCT   CC       CCCCCCCWBWCCCCCCCCCCCCTCCCCCCCCCCCCC',
        'WCWWCWWCCWWWCCWWW    CCCCCCC  CCCCCCCCCCCCCCCCKCCCCCC',
        'WC  CCTC     CC  CC   CCCCCTC  CCCCCCCCCCCCCCCTCCCCCCCCC',
        'W     CCC   CCCCCCC  CCC          CCC  CCCCCCC    CCC    ',
        'W     CCC   CCCCCCC  CCC          CCC  CC  CCCC   CCC     ',
        'WCCCCTCKCCCCCCCCCCCC CCC      T   CCC  CCCCCCCC   CCTCCCC',
        'W     CCC   TC    CC CCT          CCC  CC  CCCC   TCCC',
        'WC  C CCT    CCCCCC  CCCT         CCC  CCCCCTCC   CCKC',
        'WC  C  CC    CCCCCC  CCC          CCC  CCCCCCCC   CCCC',
        'W     CTCCCCCCCCCCCCCCCC          CCC  CC  CCCT   CCCC',
        'WC  C  CC   CC    C  CCC          CC   C    CCC   C  C  C',
        'WC  C  CC   CC    C  CCC          CC   C    CCC   C  K  C',
        'WC  K  CC   CC    C  CCC     K    CCC  C    CCC   C  C  C',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',                                                
    ];
    maze2 = [ ' ',' ',
        '  WW    WWWWWCCCCWWTWW     WWCCCCCCWWW',
        '  WWWWCCCCCCCCCCC        WCCCCCWBWCCCC',
        '  WTWCCCCWWCCCCCCCCWW     WCCCCCCCCCCC',
        '  WCCCCWW     CCCCCCBCCCC      WWWTKWW',
        '  WCCCCCCBCCCCWWTWW      CCCCCCCCCBCCC',
        '  WWTCCCCC     WWBCCCCTCCCCC      WWWW',
        '  WWKCCCBCCCTCCWWW     CCCCCCCCCCCCWWW',
        '  WWCCCCCCW     WWWWTWWCCCWWWBWCCCCWWW',
        '  WWWWTWWBWWWCCCCCWWWW    WWTWWBWWWWWW',
        '  WCCCCCWWWWW     WWWCCCCCWWKBWW    WW',
        '  CCCCCCC   CCCCCCTCCCCCCCCC     CCCCC',
        '  CCCCBCCTCCCCCC     CCCCCBCCCTCWWWWKW',
        '  WWK    CTCCWBWWCCCCCTCCCCCC     CCCC',
        '  WWCCCWWWBCCCCCC     TWWBCCCCC     W',
        '  WBCC     CCCCCCCTCCCCCCCCCCCCBCCCCW',
        
    ];
    maze = [' ',
        '    WWWWW    WWWWWWWWWWWWWWWWWWW      WWWWWWWWWWWWWWWWWWW ',
        '         WW   WWW   WWWWWWWWWWWWWWWWWWW    WWW   WW       ',
        '  V  V   WW   WWW   WWWWWWW V WWWWWWWWWW   WWW   WW  V  V ',
        '  V                                                     V ',
        ' WWWW    WW             WWW V WWW              WW    WKWW ',
        ' WWWW    WW    V   V    WWW   WWW    V   V     WW    WWWW ',
        '                                                        ',
        ' WWWWK    WW    V   V    WWW   WWW    V   V     WW    WWWW',
        ' WWWW    WW             WWW V WWW              WW    WWWW ',
        '              WWW   WWWWWWWWWWWWWWWW                    ',
        ' WWWW    WW   WWW   WWWWWWW V WWWWWWW          WW    WWWW ',
        ' WWWW    WW             KWW   WWW              WW    WWWW ',
        '  V           WWW  V    WWW V WWW    V  WWW           V  ',
        '  V  VK   WW   WWW  V    WWW   WWW    V  WWW    WW  V  V ',
        '  V  V   WW   WWW  V    WWW V WKW    V  WWW    WW  V  V  ',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',                                                
    ];
    maze3 = [' ',' ',' ',' ',
        '      WWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKWWWWWWWWWWWWWWWWWWWWKWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WKWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWKWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWIWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWIWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWKWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    ];

    maze4 = [
        ' ',
        'I     WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        
    ];
    this.cameras.main.setBackgroundColor('#03050F'); 
    var coinPositions = [];
    let walls = [];
    var array=[];
    var arrayT=[];
    let boxes = [];
    let lines = [];
    let squares = [];
    let haffes = [];
    var coinPositions = [];
    var keysPositions = [];
    let beams = [];
    var array=[];
    var arrayT=[];
    var arrayK=[];


    for (let i = 0; i < maze4.length; i++) {
        for (let j = 0; j < maze4[i].length; j++) {
    if (maze4[i][j] === 'I') {
        const haffe = this.add.text(j * 20, i * 28, '│', {
            fontSize: '40px',
            fill: '#05f5f5',
            //fontFamily: 'Arial'
        }).setOrigin(0, 0).setScale(0.6);
        
        this.physics.add.existing(haffe, true);
        haffes.push(haffe);        

    }}}
    
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            
        
            if (maze[i][j] === 'W') {
                const boundary = this.add.text(j * 20, i * 45, '—', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    //fontFamily: 'Arial'
                }).setOrigin(0, 0).setScale(0.5);
                
                // Set the wall as a static body for collision
                this.physics.add.existing(boundary, true);
                walls.push(boundary);

            }
            
            
            if (maze[i][j] === 'V') {
                const square = this.add.text(j * 20, i * 45, '▢', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0, 0).setScale(0.5);
                this.physics.add.existing(square, true);
                squares.push(square);}
            
            if(mazee2[i][j] === 'C'){
            var x = j*20;
            var y = i*50-20;
            array.push({x,y});
            console.log(x,y);

                
            }
            if(maze2[i][j]=='K'){
                const x = j*20;
                const y = i*50-12;
                arrayK.push({x,y});
                console.log(x,y);
            }
            if(mazee2[i][j]==='T'){
                const x = j*20;
            const y = i*50-12;
            arrayT.push({x,y});
            console.log(x,y);
            }
           
        }}
        i=0;
        coinPositions=array;
        botPositions=arrayT;
        keysPositions=arrayK;



    coins = this.physics.add.group();
    bots = this.physics.add.group();
    square = this.physics.add.group();
    line = this.physics.add.group();
    haffe = this.physics.add.group();
    keys = this.physics.add.group();

    const gate = this.physics.add.sprite(490, 620, 'diamond');
    gate.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    gate.setScale(0.09);

    botPositions.forEach(p => {
        const bot = bots.create(p.x, p.y, 'bot');
        bot.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        bot.setScale(0.05);
       // directions.push(1); 
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
    totalKeys = keysPositions.length;
    
    //this.physics.add.collider(player, barriers);

    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, boxes);
    this.physics.add.collider(player, bots);
    this.physics.add.collider(player, squares);
    this.physics.add.collider(player, lines);
    this.physics.add.collider(player, haffes);


    this.physics.add.overlap(player, gate, () => {
        if (keyScore === totalKeys) { // Check if player has collected all keys
            const winningtext = this.add.text(1200, 300, 'Congratulations, you WIN', {
                fontSize: '64px',
                fill: '#05f5f5',
                fontFamily: 'Arial'
            }).setScale(0.5).setInteractive();
            
            winningtext.setVisible(true);
            
            const winningtext2 = this.add.text(1200, 400, 'You can return to the main menu', {
                fontSize: '48px',
                fill: '#05f5f5',
                fontFamily: 'Arial'
            }).setScale(0.5).setInteractive();
            
            winningtext2.setVisible(true);
    
            const returnbtn = this.add.text(1200, 500, 'Main Menu', {
                fontSize: '40px',
                fill: '#05f5f5',
                fontFamily: 'Arial'
            }).setScale(0.5).setInteractive();
            
            returnbtn.setVisible(true);
    
            const reloadbtn = this.add.text(1400, 500, 'Replay', {
                fontSize: '40px',
                fill: '#05f5f5',
                fontFamily: 'Arial'
            }).setScale(0.5).setInteractive();
            
            reloadbtn.setVisible(true);
            
            this.scene.pause();  // Pause the game if the player wins
        } else {
            // Optional: Show a message if the player hasn’t collected all keys
            const needKeysText = this.add.text(1200, 300, 'Collect all keys before exiting!', {
                fontSize: '64px',
                fill: '#ff0000',
                fontFamily: 'Arial'
            }).setScale(0.5);
            
            this.time.delayedCall(2000, () => needKeysText.destroy()); // Remove the message after 2 seconds
        }
    }, null, this);

    this.physics.add.collider(player, bots, ()=>{
        const loosingtext = this.add.text( 1200,  300, 'Game Over, you LOST', {
            fontSize: '64px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        loosingtext.setVisible(true);
        const loosingtext2 = this.add.text( 1200,  400, 'You can return to the main menu', {
            fontSize: '48px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        loosingtext2.setVisible(true);
        const returnbtn2 = this.add.text( 1200,  500, 'Main Menu', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        returnbtn2.setVisible(true);
        const reloadbtn2 = this.add.text( 1400,  500, 'Replay', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setScale(0.5).setInteractive();
        reloadbtn2.setVisible(true);
        this.scene.pause();
    }, null, this);


    bots.getChildren().forEach(bot => {
        //this.physics.add.collider(player, bot, this.hitBomb, null, this)
        this.physics.add.collider(bot,walls)   
    });

    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.overlap(player, keys, collectKeys, null, this);

    keyText = this.add.text(800, 10, 'Keys Collected: 0/5', { fontSize: '32px', fill: '#fff' });
    scoreText = this.add.text(16, 10, 'Score: 0', { fontSize: '32px', fill: '#fff' });
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
        if (decisions[index] == 0)
            if(bot.x < 1100)
                bot.x = bot.x + 5
            else{
                decisions[index] = 1
                bot.x = bot.x - 5
            }
        else{
            if(bot.x > 44)
                bot.x = bot.x-5
            else{
                decisions[index] = 0
                bot.x = bot.x + 5
            }
            
        }
		if (this.gameOver)
            {
                return
            }        
   
})

    //Player movement
    if (cursors.left.isDown && player.x > xMin) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown && player.x < xMax) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.y > yMin) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown && player.y < yMax) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }

    // Check boundaries in case the player somehow moves outside them
    if (player.x < xMin) player.x = xMin;
    if (player.x > xMax) player.x = xMax;
    if (player.y < yMin) player.y = yMin;
    if (player.y > yMax) player.y = yMax;
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

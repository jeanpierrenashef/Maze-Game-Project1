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
let cursors;
let score = 0;
let scoreText;
let players = [];
let directions = [];
let moveDurations = [];
let timers = [];
let speeds = 100; 
let startTime;

function preload() {
    this.load.image('player', 'https://cdn-icons-png.flaticon.com/128/742/742751.png');
    this.load.image('bot', 'https://cdn-icons-png.flaticon.com/128/742/742751.png'); // Replace with your player image
     // Replace with your player image
    this.load.image('coin', 'https://static.vecteezy.com/system/resources/thumbnails/023/588/193/small/coin-with-dollar-sign-golden-dollar-symbol-gold-coin-3d-stack-of-gold-coins-icon-isolated-symbol-png.png'); // Replace with your coin image
}

function create() {
    
    player = this.physics.add.sprite(50, 50, 'player').setScale(0.15);
    player.setCollideWorldBounds(true);
    bot=this.physics.add.sprite(50,500,'bot').setOrigin(10,10).setScale(0.15);
    bot.setCollideWorldBounds(true);
    mazee2 = [' ',  
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW ',
        'WCWWCWWCT   CC       CCCCCCCWBWCCCCCCCCCCCCTCCCCCCCCCCCCC',
        'WCWWCWWCCWWWCCWWW    CCCCCCC  CCCCCCCCCCCCCCCCCCCCCCC',
        'WC  CCTC     CC  CC   CCCCCTC  CCCCCCCCCCCCCCCTCCCCCCCCC',
        'W     CCC   CCCCCCC  CCC          CCC  CCCCCCC    CCC    ',
        'W     CCC   CCCCCCC  CCC          CCC  CC  CCCC   CCC     ',
        'WCCCCTCCCCCCCCCCCCCC CCC      T   CCC  CCCCCCCC   CCTCCCC',
        'W     CCC   TC    CC CCT          CCC  CC  CCCC   TCCC',
        'WC  C CCT    CCCCCC  CCCT         CCC  CCCCCTCC   CCCC',
        'WC  C  CC    CCCCCC  CCC          CCC  CCCCCCCC   CCCC',
        'W     CTCCCCCCCCCCCCCCCC          CCC  CC  CCCT   CCCC',
        'WC  C  CC   CC    C  CCC          CC   C    CCC   C  C  C',
        'WC  C  CC   CC    C  CCC          CC   C    CCC   C  C  C',
        'WC  C  CC   CC    C  CCC          CCC  C    CCC   C  C  C',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',                                                
    ];
    maze2 = [ ' ',' ',
        '  WW    WWWWWCCCCWWTWW     WWCCCCCCWWW',
        '  WWWWCCCCCCCCCCC        WCCCCCWBWCCCC',
        '  WTWCCCCWWCCCCCCCCWW     WCCCCCCCCCCC',
        '  WCCCCWW     CCCCCCBCCCC      WWWTWWW',
        '  WCCCCCCBCCCCWWTWW      CCCCCCCCCBCCC',
        '  WWTCCCCC     WWBCCCCTCCCCC      WWWW',
        '  WWCCCCBCCCTCCWWW     CCCCCCCCCCCCWWW',
        '  WWCCCCCCW     WWWWTWWCCCWWWBWCCCCWWW',
        '  WWWWTWWBWWWCCCCCWWWW    WWTWWBWWWWWW',
        '  WCCCCCWWWWW     WWWCCCCCWWWBWW    WW',
        '  CCCCCCC   CCCCCCTCCCCCCCCC     CCCCC',
        '  CCCCBCCTCCCCCC     CCCCCBCCCTCWWWWWW',
        '  WW     CTCCWBWWCCCCCTCCCCCC     CCCC',
        '  WWCCCWWWBCCCCCC     TWWBCCCCC     WW',
        '  WBCC     CCCCCCCCTCCCCCCCCCCCCBCCCCW',
        
    ];
    maze = [' ',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW ',
        '         WW   WWW   WWWWWWWWWWWWWWWWWWW    WWW   WW       ',
        '  V  V   WW   WWW   WWWWWWW V WWWWWWWWWW   WWW   WW  V  V ',
        '  V                                                     V ',
        ' WWWW    WW             WWW V WWW              WW    WWWW ',
        ' WWWW    WW    V   V    WWW   WWW    V   V     WW    WWWW ',
        '                                                        ',
        ' WWWW    WW    V   V    WWW   WWW    V   V     WW    WWWW ',
        ' WWWW    WW             WWW V WWW              WW    WWWW ',
        '              WWW   WWWWWWWWWWWWWWWW                    ',
        ' WWWW    WW   WWW   WWWWWWW V WWWWWWW          WW    WWWW ',
        ' WWWW    WW             WWW   WWW              WW    WWWW ',
        '  V           WWW  V    WWW V WWW    V  WWW           V  ',
        '  V  V   WW   WWW  V    WWW   WWW    V  WWW    WW  V  V  ',
        '  V  V   WW   WWW  V    WWW V WWW    V  WWW    WW  V  V  ',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',                                                
    ];
    maze3 = [' ',' ',' ',' ',
        'WWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWIWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWWWWWIWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWIWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWIWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWIWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWIWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    ];

    maze4 = [
        ' ',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        'IWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW I',
        
    ];
    this.cameras.main.setBackgroundColor('#0f1e4d');
    var coinPositions = [];
    let walls = [];
    var array=[];
    var arrayT=[];
    let boxes = [];
    let lines = [];
    let squares = [];
    let haffes = [];

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
                const boundary = this.add.text(j * 20, i * 45, '⎯', {
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


      
    coins = this.physics.add.group();
    bots = this.physics.add.group();
    square = this.physics.add.group();
    line = this.physics.add.group();
    haffe = this.physics.add.group();



    botPositions.forEach(p => {
        const bot = bots.create(p.x, p.y, 'bot');
        bot.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        bot.setScale(0.15);
        directions.push(1); 
        moveDurations.push(Phaser.Math.Between(1000, 3000)); 
        timers.push(this.time.now);
    });

    coinPositions.forEach(pos => {
        const coin = coins.create(pos.x, pos.y, 'coin');
        coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        coin.setScale(0.05);
    });

    
    //this.physics.add.collider(player, barriers);

    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, boxes);
    this.physics.add.collider(player, bots);
    this.physics.add.collider(player, squares);
    this.physics.add.collider(player, lines);
    this.physics.add.collider(player, haffes);






    bots.getChildren().forEach(bot => {this.physics.add.collider(bot, walls)});
    bots.getChildren().forEach(bot => {this.physics.add.collider(bot, boxes)});
    startTime = this.time.now;

    this.physics.add.overlap(player, coins, collectCoin, null, this);

    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    cursors = this.input.keyboard.createCursorKeys();
    
}

function update() {
    bots.getChildren().forEach((bot,index)=>{
   const elapsedTime = this.time.now - timers[index];
    if (elapsedTime < moveDurations[index]) {
        bot.x += directions[index] * (speeds * this.game.loop.delta / 1000); // Convert delta time to seconds
    }  else {
        directions[index] *= -1;
        timers[index] = this.time.now;
        moveDurations[index] = Phaser.Math.Between(1000, 3000); 
    }})
/*});*/
    // Player movement
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

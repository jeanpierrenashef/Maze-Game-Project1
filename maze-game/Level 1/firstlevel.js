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
let moveDurations = [];
let timers = [];
let speeds = 140; 
let startTime;

function preload() {
    this.load.image('player', 'https://cdn-icons-png.flaticon.com/128/742/742751.png');
    
    this.load.image('coin', 'https://static.vecteezy.com/system/resources/thumbnails/023/588/193/small/coin-with-dollar-sign-golden-dollar-symbol-gold-coin-3d-stack-of-gold-coins-icon-isolated-symbol-png.png'); 
}

function create() {
    
    player = this.physics.add.sprite(50, 50, 'player').setScale(0.14);
    player.setCollideWorldBounds(true);
   

    maze2 = [ ' ',' ',
        '  WW    WWWWWCCCCWWTWW     WWCCCCCCWWW',
        '  WTWWCCCCCCBCCCC        WCCCCCWBWCCCC',
        '  WWWCCCCWCCCCBCCCCWW     WCCCCCCCBCCC',
        '  WCCBCWW     CCCCCCBCCCC      WWWTWWW',
        '  WCCCCCCBCCCCWWTWW      CCCCCCCCCCCCC',
        '  WWTCCCCC     WWBCCCCTCCCCC      WWWW',
        '  WWCCCCBCCCTCCBWW   B CCCCCCCCCCCCWWW',
        '  WWCCCCCCW     WWWWTBWCCCWWWBWCCCCWWW',
        '  WWWWTWWBWWWCCCCCWWWW    WWTWWBWWWWWW',
        '  WCCBCCWWWWW   B WBWCCCCCWCWWWW    WW',
        '  CCCCCCC   CCCCCCTCCCCCBCCC     CCBCC',
        '  CCCCBCCTCCBCCC     CCCCCBCCCTBWWWWWW',
        '  WW     CTCCWWWWCCCCCBCCCCCC     CCCC',
        '  WWCCCWWWBCCCCCC B   TWWBCCCBC     WW',
        '  WBCC     CCCCCCCCTCCCCCCCCCCCCCCCCW',
        
    ];
    maze = [' ',' ',
        ' WWWWW  WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
        ' W  WWWWW  WWWWWW  WWWWWWWWW  WWW  WWW',
        ' WWWWWWWWW  WWWWWWWWWW  WWWWWWWWWWW  W',
        ' W  WWWWWWWWWWWW  WWWWWWWWW  WWWWWWWWW',
        ' WWWWWWW  WWWWWWWWWW  WWWWWWWWWWW  WWW',
        ' W  WWWWWWWWW  WWWWWWWWW  WWWWWWW  WWW',
        ' WWWW  WWWWWWWWWW  WWWWWWW  WWWWWWWWWW',
        ' W  WWWWWWWW  WWWWWWW  WWWWW  WWWWWWW',
        ' WWWWWW  WWWWWWW  WWWW  WWWWWWWWWW  WW',
        ' W  WWWWWWWWWW  WWWWWWWWWWWW  WWWWWWWW',
        ' W  WWWWWW  WWWWWWWWW  WWWWWWW  WWWWWW',
        ' WWWWWWW  WWWWWW  WWWWW  WWWWWWW  WWWW',
        ' WWW  WWWWWWW  WWWWWWWWWWW  WWWWWWWWWW',
        ' WW  WWWWW  WWWWWWWW  WWWWWWWWWW  WWWW',
        ' WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW  WWWWW',
        
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
        'IWWWWWWWW  WWWWWWWWWWWWWWWW  WWWWWWWW I',
        'IWWWWWWWWWWWWWWWW  WWWWWWWWWWWWWWWWWW I',
        
    ];
    this.cameras.main.setBackgroundColor('#091538');
    var coinPositions = [];
    let walls = [];
    var array=[];
    var arrayT=[];
    let boxes = [];
    let coins=[];

    for (let i = 0; i < maze3.length; i++) {
        for (let j = 0; j < maze3[i].length; j++) {
    if (maze3[i][j] === 'I') {
        const haffe = this.add.text(j * 20, i * 20, '︱', {
            fontSize: '40px',
            fill: '#05f5f5',
            fontFamily: 'Arial'
        }).setOrigin(0, 0).setScale(0.5);
        
        // Set the wall as a static body for collision
        

    }}}
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            
        
            if (maze[i][j] === 'W') {
                const boundary = this.add.text(j * 20, i * 40, '⎯', {
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
            const y = i*40;
            array.push({x,y});
            console.log(x,y);

                
            }
            /*if(maze2[i][j]=='C'){
                const coin = this.add.text(j * 20, i * 40-10, '💎', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0, 0).setScale(0.3 );
                
                // Set the wall as a static body for collision
                this.physics.add.existing(coin, true);
                coins.push(coin);

                
            }*/
            
            if (maze2[i][j] === 'B') {
                //box=this.physics.add.staticImage(j*20, i*36, 'box').setOrigin(0).setScale(0.2);
                //boxes.push(box);
                const box = this.add.text(j * 20, i * 40-25, '|', {
                    fontSize: '40px',
                    fill: '#05f5f5',
                    fontFamily: 'Arial'
                }).setOrigin(0,0).setScale(0.5);
                
                this.physics.add.existing(box, true);
                boxes.push(box);}
        }}
        i=0;
        coinPositions=array;
        

        
         
            

      
    coins = this.physics.add.group();
    /*co=this.add.text( 20, 40-25, '💎', {
        fontSize: '40px',
        fill: '#05f5f5',
        fontFamily: 'Arial'
    }).setOrigin(0,0).setScale(0.5);*/

    

    coinPositions.forEach(pos => {
        const coin = coins.create(pos.x, pos.y, 'coin');
        coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        coin.setScale(0.05);
    });

    
    //this.physics.add.collider(player, barriers);

    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, boxes);
   
    startTime = this.time.now;

    this.physics.add.overlap(player, coins, collectCoin, null, this);

    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    cursors = this.input.keyboard.createCursorKeys();
    
}

function update() {
    
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

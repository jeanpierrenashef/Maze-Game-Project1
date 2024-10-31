const config = {
    type: Phaser.AUTO,
    width: 1500,
<<<<<<< HEAD
    height: 600,
=======
    height: 800,
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
    align:'center',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
<<<<<<< HEAD
    this.load.image('myImage1', 'https://i.imgur.com/PbpuTD6.jpeg');
    this.load.image('myImage2', 'https://upload.wikimedia.org/wikipedia/en/5/59/Pac-man.png');
    this.load.image('myImage3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-Ho0k7hsF-r0eYwYOidmd38A_4qihO_917dExTERtHfZv_EoIkrVXXMWCutL75Gj9YQ&usqp=CAU');
=======
    this.load.image('myImage1', 'https://i.imgur.com/U4oq92o.png');
    this.load.image('myImage2', 'https://i.imgur.com/akywtvQ.png');
    this.load.image('myImage3', 'https://i.imgur.com/Xmoac4K.png');
    this.load.image('myImage4', 'https://i.imgur.com/5XwiYY6.png');

>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
    this.load.image('characterImage1', 'https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_grande.png?v=1571606093');
    this.load.image('characterImage2', 'https://m.media-amazon.com/images/I/6143dNX-g9L.png');
    this.load.image('characterImage3', 'https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e9ea16121c4a0759ffbb_53.png');

}

let congratulationsText;
let congratulationsTextt;
let fragmentImage;
let levelVisible = false;
let chosenlevel='';


function create() {

    this.cameras.main.setBackgroundColor('#0b1945');


<<<<<<< HEAD
    const levelbtn = this.add.text(1300, 300, 'Levels', {
=======
    const levelbtn = this.add.text(200, 100, 'Choose a Level', {
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fontSize: '32px',
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        padding: { x: 20, y: 10 }, // Padding around the text
        align: 'center'
    }).setOrigin(0.5).setInteractive();

    levelbtn.on('pointerdown', () => {
        showLevel(this);
        levelVisible = true; 
    });
    
<<<<<<< HEAD
     this.level1text=this.add.text(100, 130, 'Find a way', {
        fontSize: '32px',
=======
     this.level1text=this.add.text(150, 130, 'Find a way', {
        fontSize: '25px',
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setVisible(false);
    this.level1text.setInteractive();
    this.level1text.on('pointerdown',()=>{
        this.chosen=this.add.text(100, 100, 'chosen: 1', {
            fontSize: '32px',
            fill: '#d7d8db',
            //backgroundColor: '#007bff', // Background color for the button
            padding: { x: 20, y: 10 }, // Padding around the text
            align: 'center'
        }).setOrigin(0.5).setInteractive();
        
    })
    
   this.level1image = this.add.image(100, 200, 'myImage1').setOrigin(0).setScale(0.15).setVisible(false);

  this.level1easy=this.add.text(100, 450, 'Level: Easy', {
        fontSize: '32px',
=======
    }).setVisible(true);
    this.level1text.setInteractive();
    this.level1text.on('pointerdown',()=>{
        this.scene.start('firstlevel.js');
    });
    
   this.level1image = this.add.image(100, 200, 'myImage1').setOrigin(0).setScale(0.2).setVisible(true);

  this.level1easy=this.add.text(100, 450, 'Level: Easy', {
        fontSize: '25px',
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fill: '#d7d8db',
        //: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setVisible(false);

    ////////
    this.level2text=this.add.text(400, 130, 'Survive the Hell', {
        fontSize: '32px',
=======
    }).setVisible(true);

    ////////
    this.level2text=this.add.text(400, 130, 'Survive the Hell', {
        fontSize: '25px',
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setInteractive().setVisible(false);
    this.level2text.on('pointerdown',()=>{
        this.chosenn=this.add.text(100, 100, 'chosen: 2', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#007bff', // Background color for the button
            padding: { x: 20, y: 10 }, // Padding around the text
            align: 'center'
        }).setOrigin(0.5).setInteractive();
       
        
    })
     this.level2image = this.add.image(520, 300, 'myImage2').setVisible(false);
   
    this.level2easy=this.add.text(400, 450, 'Level: Meduim', {
        fontSize: '32px',
=======
    }).setInteractive().setVisible(true);
    
     this.level2image = this.add.image(520, 300, 'myImage2').setVisible(true).setScale(0.2);
   
    this.level2easy=this.add.text(400, 450, 'Level: Meduim', {
        fontSize: '25px',
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setVisible(false);
    ////////

     this.level3text=this.add.text(800, 130, 'Age of DOOM', {
        fontSize: '32px',
=======
    }).setVisible(true);
    ////////

     this.level3text=this.add.text(750, 130, 'Age of DOOM', {
        fontSize: '25px',
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setInteractive().setVisible(false);
    this.level3text.on('pointerdown',()=>{
        this.chosenn=this.add.text(100, 100, 'chosen: 3', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#007bff', // Background color for the button
            padding: { x: 20, y: 10 }, // Padding around the text
            align: 'center'
        }).setOrigin(0.5).setInteractive();
        
        
    })
   this.level3image = this.add.image(920, 300, 'myImage3').setVisible(false);
    

   this.level3easy=this.add.text(800, 450, 'Level: Hard', {
        fontSize: '32px',
=======
    }).setInteractive().setVisible(true);
    
   this.level3image = this.add.image(830, 300, 'myImage3').setVisible(true).setScale(0.2);
    

   this.level3easy=this.add.text(750, 450, 'Level: Hard', {
        fontSize: '25px',
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setVisible(false);
    ////////

    ///////

     const characterbtn = this.add.text(1300, 400, 'Characters', {
=======
    }).setVisible(true);
    ////////
    this.level4text=this.add.text(1150, 130, 'PACMAN', {
        fontSize: '25px',
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

    }).setInteractive().setVisible(true);
    
   this.level4image = this.add.image(1200, 300, 'myImage4').setVisible(true).setScale(0.2);
    

   this.level4easy=this.add.text(1100, 450, 'Level: Extreme', {
        fontSize: '25px',
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

    }).setVisible(true);

    ///////

     const characterbtn = this.add.text(150, 600, 'Characters', {
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fontSize: '32px',
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        padding: { x: 20, y: 10 }, // Padding around the text
        align: 'center'
    }).setOrigin(0.5).setInteractive();

    characterbtn.on('pointerdown', () => {
        showcharacter(this);
        
    });

    // Optional: Change the button color on hover
    

    /////
    
    
<<<<<<< HEAD
   this.character1image = this.add.image(100, 200, 'characterImage1').setOrigin(0).setScale(0.3).setVisible(false);

  this.character1name=this.add.text(100, 450, 'Mr. Glasses', {
=======
   this.character1image = this.add.image(500, 500, 'characterImage1').setOrigin(0).setScale(0.3).setVisible(true);

  this.character1name=this.add.text(500, 700, 'Mr. Glasses', {
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
        fontSize: '32px',
        fill: '#d7d8db',
        //backgroundColor: '#007bff', // Background color for the button
        //padding: { x: 20, y: 10 }, // Padding around the text

<<<<<<< HEAD
    }).setVisible(false);

    this.character2image = this.add.image(400, 200, 'characterImage2').setOrigin(0).setScale(0.3).setVisible(false);
=======
    }).setVisible(true);

    /*this.character2image = this.add.image(400, 200, 'characterImage2').setOrigin(0).setScale(0.3).setVisible(false);
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
    this.character2name=this.add.text(400, 450, 'Mr. Crazy', {
          fontSize: '32px',
          fill: '#d7d8db',
          //backgroundColor: '#007bff', // Background color for the button
          //padding: { x: 20, y: 10 }, // Padding around the text
  
      }).setVisible(false);

      this.character3image = this.add.image(700, 200, 'characterImage3').setOrigin(0).setScale(0.3).setVisible(false);

      this.character3name=this.add.text(700, 450, 'Miss. Cutie', {
            fontSize: '32px',
            fill: '#d7d8db',
            //backgroundColor: '#007bff', // Background color for the button
            //padding: { x: 20, y: 10 }, // Padding around the text
    
<<<<<<< HEAD
        }).setVisible(false);
=======
        }).setVisible(false);*/
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409

        /////
        this.input.on('pointerdown', () => {
            if (levelVisible) {
                hideImages(this);
                levelVisible = false; // Reset the flag when hiding
            } else {
                hideImages(this); // Optional: Hide any other images when clicked
            }
        });

}
function showcharacter(scene){
    
<<<<<<< HEAD
    scene.character1image.setVisible(!scene.character1image.visible);
=======
    /*scene.character1image.setVisible(!scene.character1image.visible);
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
    scene.character1name.setVisible(!scene.character1name.visible);
    scene.character2image.setVisible(!scene.character2image.visible);
    scene.character2name.setVisible(!scene.character2name.visible);
    scene.character3image.setVisible(!scene.character3image.visible);
<<<<<<< HEAD
    scene.character3name.setVisible(!scene.character3name.visible);
}
function showLevel(scene) {

    scene.level1text.setVisible(!scene.level1text.visible);
=======
    scene.character3name.setVisible(!scene.character3name.visible);*/
}
function showLevel(scene) {

    /*scene.level1text.setVisible(!scene.level1text.visible);
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409
    scene.level1image.setVisible(!scene.level1image.visible);
    scene.level1easy.setVisible(!scene.level1easy.visible);
    /////
    scene.level2text.setVisible(!scene.level2text.visible);
    scene.level2image.setVisible(!scene.level2image.visible);
    scene.level2easy.setVisible(!scene.level2easy.visible);
    //////
    scene.level3text.setVisible(!scene.level3text.visible);
    scene.level3image.setVisible(!scene.level3image.visible);
    scene.level3easy.setVisible(!scene.level3easy.visible);
<<<<<<< HEAD
=======
    //////
    scene.level4text.setVisible(!scene.level4text.visible);
    scene.level4image.setVisible(!scene.level4image.visible);
    scene.level4easy.setVisible(!scene.level4easy.visible);*/
>>>>>>> 4f8a34567560988d5b4d41ddb021994cdfc15409




}

function update() {
    // Any update logic can go here
}
/*function hideImages(scene) {
    // Hide all level elements
    scene.level1text.setVisible(!scene.level1text.visible);
    scene.level1image.setVisible(false);
    scene.level1easy.setVisible(false);
    scene.level2text.setVisible(false);
    scene.level2image.setVisible(false);
    scene.level2easy.setVisible(false);
    scene.level3text.setVisible(false);
    scene.level3image.setVisible(false);
    scene.level3easy.setVisible(false);
}*/
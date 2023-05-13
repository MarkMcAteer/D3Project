class DeepSea extends AdventureScene {
    constructor() {
        super("DeepSea", "Deep Sea");
    }

    onEnter() {
        
        this.imageObject = this.add.image(
            400,//x
            400,//y
            'cave',//imagename
        )
        this.imageObject.setScale(3) //resize

        this.imageObject = this.add.image(
            1200,//x
            750,//y
            'kelp1',//imagename
        )
        this.imageObject.setScale(1) //resize

        this.imageObject = this.add.image(
            880,//x
            730,//y
            'kelp1',//imagename
        )
        this.imageObject.setScale(1) //resize

        this.imageObject = this.add.image(
            1000,//x
            800,//y
            'kelp2',//imagename
        )
        this.imageObject.setScale(1) //resize


        let fish = this.add.text(this.w * 0.5, this.w * 0.1, " 🐟    🐟  \n   🐟  ")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Swim, swim!"))
            .on('pointerdown', () => {
                this.showMessage("Bubbles.");
                this.tweens.add({
                    targets: fish,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let disguise = this.add.text(this.w * 0.475, this.w * 0.35, "Kelp Forest")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Kelp! It could be useful.")
            })
            .on('pointerdown', () => {
                this.showMessage("Diguise attained.");
                this.gainItem('disguise');
                this.tweens.add({
                    targets: disguise,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => disguise.destroy()
                });
            })

        let cave = this.add.text(this.w * 0.2, this.w * 0.075, "Cave")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Creepy cave.");
            })
            .on('pointerdown', () => {
                    this.gotoScene('Cave');
            })

    }
}

class Cave extends AdventureScene {
    constructor() {
        super("Cave", "What's that in the cave?");
    }
    onEnter() {
        this.imageObject = this.add.image(
            790,//x
            500,//y
            'sharkeye',//imagename
        )
        this.imageObject.setScale(3) //resize
        this.add.text(this.w * 0.05, this.w * 0.05, "return")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('DeepSea');
            });
        let enter = this.add.text(this.w * 0.4, this.w * 0.4, "enter")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.hasItem("disguise")) {
                    this.gotoScene('Jewel');
                } else {
                    this.gotoScene('Shark');
                }
            });
    }
}


/*
class KelpForest extends AdventureScene {
    constructor() {
        super("KelpForest", "A forest of kelp, maybe it could be useful.");
    }
    onEnter() {
        this.imageObject = this.add.image(
            415,//x
            100,//y
            'sand',//imagename
        )
        this.imageObject.setScale(8) //resize
        this.imageObject = this.add.image(
            700,//x
            500,//y
            'KelpForest',//imagename
        )
        this.imageObject.setScale(3) //resize
        let disguise = this.add.text(this.w * 0.4, this.w * 0.35, "kelp")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Could be useful.")
            })
            .on('pointerdown', () => {
                this.showMessage("Disguise attained.");
                this.gainItem('disguise');
                this.tweens.add({
                    targets: disguise,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => diguise.destroy()
                });
            })
            this.add.text(this.w * 0.6, this.w * 0.05, "return")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('DeepSea');
            });
            
    }
}
*/

class Shark extends AdventureScene {
    constructor() {
        super("Shark", "Uh oh! You got ate.");
    }
    onEnter() {
        this.imageObject = this.add.image(
            790,//x
            500,//y
            'bite',//imagename
        )
        this.imageObject.setScale(2) //resize
        this.add.text(this.w * 0.65, this.w * 0.025, "restart")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('intro');
        });
    }
}

class Jewel extends AdventureScene {
    constructor() {
        super("Jewel", "Bling Bling, you did it!");
    }
    onEnter() {
        this.imageObject = this.add.image(
            790,//x
            500,//y
            'diamond',//imagename
        )
        this.imageObject.setScale(2) //resize
        this.add.text(this.w * 0.36, this.w * 0.5, "restart")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('intro');
        });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Aquatic Adventure!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin your underwater expidition.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('DeepSea'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    backgroundColor: "0x14b9fa",
    scene: [Intro, DeepSea, Cave, Outro, Shark, Jewel],
    title: "Adventure Game",
});


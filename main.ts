namespace SpriteKind {
    export const powerup = SpriteKind.create()
    export const mode = SpriteKind.create()
    export const text = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ..........bbbbbb....
        .......22bbb11bbb...
        ....44444bbbb111bb..
        22222224bbbbbbb1bb..
        .4444444bbbbbbb1bb..
        ...222224bbbbbb1bb..
        ......4442bbbbbbbb..
        ......2222.bbbbbb...
        ............bbb.....
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `, mySprite, 200, 0)
    projectile.y += -5
    if (upgrade && upgrade.lifespan > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ..........bbbbbb....
            .......22bbb11bbb...
            ....44444bbbb111bb..
            22222224bbbbbbb1bb..
            .4444444bbbbbbb1bb..
            ...222224bbbbbb1bb..
            ......4442bbbbbbbb..
            ......2222.bbbbbb...
            ............bbb.....
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `, mySprite, 200, 0)
        projectile.y += 5
    }
})
info.onCountdownEnd(function () {
    game.splash("Great Job, Captain, hope you enjoyed the ride")
    game.over(true, effects.confetti)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy(effects.blizzard, 500)
    status.spriteAttachedTo().setImage(img`
        ....42.........4422.
        ....422.....444442..
        ...444224444444442..
        444444444444424422..
        22444444444442442...
        .22444444442244422..
        ..24444442224444422.
        ..244444222222444422
        .2244442222222444442
        2244444222222444444.
        2444444422222444422.
        444424422222224442..
        .44422222222444422..
        ..444444422444442...
        ..444444444444422...
        ...4444444444422....
        ..4442244444442.....
        ..4422...4444422....
        .4442......444422...
        44422..........92...
        `)
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(15)) {
        powerup2 = sprites.create(img`
            .....................
            ........fffff........
            ......fffeeefff......
            ....fff44eeeeefff....
            ...f4444eeeeeeeeef...
            ..f44eeeeeeeeeeeebf..
            .f44eeeeeeeeeeeeebbf.
            .ff44eeeeeeeeeeeebbf.
            ..ff444eeeeeeeeffff..
            .f4ffffff555ffffeebf.
            .f4eeeeee555eeeeeebf.
            .f4eeeeeeeeeeeeeeebf.
            .f4eeeeeeeeeeeeeeebf.
            .f4eeeeeeeeeeeeeeebf.
            .f4eeeeeeeeeeeeeeebf.
            .f4eeeeeeeeeeeeeebbf.
            .f44eeeeeeeeeeeeebbf.
            .ff44444eeeeeeebbbff.
            ..fffffffffffffffff..
            .....................
            .....................
            `, SpriteKind.powerup)
        powerup2.x = enemy.x
        powerup2.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    upgrade = sprites.create(img`
        ....................
        ...........bbbbbb...
        ........22bbb11bbb..
        .....44444bbbb111bb.
        .22222224bbbbbbb1bb.
        ..4444444bbbbbbb1bb.
        ....222224bbbbbb1bb.
        .......4442bbbbbbbb.
        .......2222.bbbbbb..
        .............bbb....
        ....................
        ...........bbbbbb...
        ........22bbb11bbb..
        .....44444bbbb111bb.
        .22222224bbbbbbb1bb.
        ..4444444bbbbbbb1bb.
        ....222224bbbbbb1bb.
        .......4442bbbbbbbb.
        .......2222.bbbbbb..
        .............bbb....
        `, SpriteKind.mode)
    upgrade.setPosition(45, 12)
    upgrade.lifespan = 10000
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    music.pewPew.play()
    info.changeScoreBy(1)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemyDeath(otherSprite)
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    mySprite.say("Well, That Hurts", 200)
    otherSprite.setImage(img`
        ....................1.c.................
        ....455555555555....11c........eeeeeee..
        ...4544544454454....11c........5555555e.
        ..45554444444444eeee11cee......5e5454555
        .455444444444444555111c55......44444445e
        ................454111c4e......4444444ee
        ................4..............44444444e
        .............4444.................44444e
        .............4444.................44444e
        c............4444............4......444.
        .4545444444444444...44111c44.4......444.
        .4444444444444444...44411c4..4..........
        .cc44444444444444...4444bb4..4..........
        .4444444444444444...4444bb4..444444444e.
        .5544444444445555...4444bb4..444444454e.
        .4554444444445445...44114c4..4445555555.
        ..45554444444......144114c4..555544544..
        ...5455555555.......41114c4..44454454...
        ....454454445.......51115c5.............
        ....................44111c4.............
        `)
    scene.cameraShake(4, 500)
    music.bigCrash.play()
})
let statusbar: StatusBarSprite = null
let Enemy_Ship: Sprite = null
let powerup2: Sprite = null
let upgrade: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
let mySprite3 = sprites.create(image.create(160, 100), SpriteKind.text)
images.printText(mySprite3.image, "All Aboard", 0)
mySprite3.vy += -10
mySprite3.y += 200
mySprite3.lifespan += 7000
game.splash("Hello New Captain, Today We sail the Seas Seeking Treasure", "Our goal is to destroy the enemy ships and to last as long as possible")
let Choice = game.askForString("Choose Level: (1),(2),(3)", 1)
tiles.setTilemap(tilemap`level1`)
mySprite = sprites.create(img`
    ............................................................
    ..........c11...............................................
    ..........c111..............................................
    ..........c111.............44...............................
    ..........c1111.........4444444444..........................
    ....444444c1111e444444444444ee444444444444..................
    ..444b44eec11111eeeee44444eeeee4444444444444................
    ..4bbeeeeec11111eeeeeeeeeeeeeeeeeeeeeeeeeeeee...............
    .44beeeeeec1111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............
    .4beeeeeeec11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffff........
    .4beeeeeeec11111eccccccccccccceeeeeeeeeeeeeeddffffff........
    .bbeeeeeeec1111eeceeeeeeeeeeeceeeeeeeeeeeeeeddfff...........
    .beeeeeeeec1111eeceeeeeeeeeeeceeeeebbeeeeeeeeeee............
    .beeeeeeeecbbbececeeeeeeeeeeeceeeebbbeeeeeeeeebb............
    .beeeeeeeebbbbececeeeeeeeeeeeceeebbbbbeeeeeeeebbbbbbbbbbbbbb
    .beeeeeeeebbbbececeeeeeeeeeeeceeeebbbeeeeeeeeebbbbbbbbbbbbbb
    .beeeeeeeebbbbeeeceeeeeeeeee4ceeeeebbeeeeeeeeebb............
    .beeeeeeeebbbbecec4eeeeeeee44ceeeeeeeeeeeeffffffff..........
    .bbeeeeeeec111ecec44444444444ceeeeeeeeeeeeddffffff..........
    .ebeeeeeeec111ececcccccccccccceeeeeeeeeeeeddfffe............
    .bebeeeeeec1111eeeeeeeeeeeeeeeeeeeeeeeeeebbbebe.............
    .bebeeeeeece1111eeeeeeeeeeeeeeeeeeeeeeebbbebebe.............
    .bebeeeeeece1111eeeeeeeeeeeeeeeeeebbbbbbebebeb..............
    .beebeeeeece11111eeeeeeeeeeeeeebbbbeeebeebebe...............
    ..eebbbbeece11111eeeeeebbbbbbbbbeebeeebeebeb................
    ..eebeeebbcc11111bbbbbbbebeeeeebeebeeebeeb..................
    ....beeebeec111111eebeeeebeeeeebeeb.........................
    ...........c11111...........................................
    ...........c11111...........................................
    ...........c11111...........................................
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(5)
music.playMelody("C D F D F A E C5 ", 120)
let enemySpawntime = 2000
let EnemySpeed = 20
scene.cameraFollowSprite(mySprite)
info.startCountdown(15)
game.onUpdate(function () {
	
})
forever(function () {
    pause(enemySpawntime)
    Enemy_Ship = sprites.create(img`
        ....................1.c.................
        ....................11c.................
        ....................11c.................
        ....455555555555eeee11ceeeeeeeee........
        ...4544544454454555111c555555555e.......
        ..45554444444444454111c4e5e5454555......
        .455444444444444444111c4444444445e......
        .454544444444444444411c444444444ee......
        .44444444444444444444bb4444444444e......
        ccc444444444444444444bb4444444444e......
        .44444444444444444444bb4444444444e......
        .554444444444444444114c4444444444e......
        .455444444444444444114c4444444454e......
        ..45554444444444441114c44445555555......
        ...5455555555555551115c5555544544.......
        ....454454445544544111c444454454........
        ...................111c.................
        ....................11c.................
        ......................c.................
        ........................................
        `, SpriteKind.Enemy)
    Enemy_Ship.x = scene.screenWidth()
    Enemy_Ship.vx = 0 - EnemySpeed
    Enemy_Ship.y = randint(0, scene.screenWidth() - -10)
    statusbar = statusbars.create(12, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(Enemy_Ship)
    statusbar.setColor(9, 7)
    statusbar.max = 100
})
game.onUpdateInterval(10000, function () {
    EnemySpeed += 5
    EnemySpeed = Math.min(EnemySpeed, 50)
    enemySpawntime += -500
    enemySpawntime = Math.max(EnemySpeed, 500)
})

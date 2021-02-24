namespace SpriteKind {
    export const powerup = SpriteKind.create()
    export const mode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ..........999999....
        .......8899911999...
        ....99999999911199..
        888888899999999199..
        .99999999999999199..
        ...888889999999199..
        ......999888999999..
        ......8888....999...
        ....................
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
            ..........999999....
            .......8899911999...
            ....99999999911199..
            888888899999999199..
            .99999999999999199..
            ...888889999999199..
            ......999888999999..
            ......8888....999...
            ....................
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
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy(effects.blizzard, 500)
    status.spriteAttachedTo().setImage(img`
        ....91.........9911.
        ....911.....999991..
        ...999119999999991..
        999999999999919911..
        11999999999991991...
        .11999999991199911..
        ..19999991119999911.
        ..199999111111999911
        .1199991111111999991
        1199999111111999999.
        1999999911111999911.
        999919911111119991..
        .99911111111999911..
        ..999999911999991...
        ..999999999999911...
        ...9999999999911....
        ..9991199999991.....
        ..9911...9999911....
        .9991......999911...
        99911..........91...
        `)
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(25)) {
        powerup = sprites.create(img`
            .....................
            ......fffffffff......
            ....ff555bbb555ff....
            ...f5544444444455f...
            ..f555444444444555f..
            ..f555777777f77555f..
            .f555577777fff75555f.
            .f5555777777f775555f.
            .f55557777777775555f.
            .f55557777777775555f.
            .f55557777f77775555f.
            .f55557777777775555f.
            .f55557777777775555f.
            .f555577777ff775555f.
            .f55557777777775555f.
            ..f555fffffffff555f..
            ..f555fffffffff555f..
            ...f55fffffffff55f...
            ....ff555555555ff....
            ......fffffffff......
            .....................
            `, SpriteKind.powerup)
        powerup.x = enemy.x
        powerup.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    upgrade = sprites.create(img`
        ..........999999....
        .......8899911999...
        ....99999999911199..
        888888899999999199..
        .99999999999999199..
        ...888889999999199..
        ......999888999999..
        ......8888....999...
        ....................
        ....................
        ..........999999....
        .......8899911999...
        ....99999999911199..
        888888899999999199..
        .99999999999999199..
        ...888889999999199..
        ......999888999999..
        ......8888....999...
        ....................
        ....................
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
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        .........................4........................
        ........................44........................
        ..................44...4444.......................
        .................444...4244.......................
        .................42....2244bbbbbb.................
        .................222..44bbbaaaaaaa................
        ................cdcc.cccaaaaaaaaaaa...............
        ................cdcc......4...44..................
        ...............cdccc.aa...42.aaaaa................
        ...............cc....a4..442.aaaaab...............
        ...............cc....a4..aaa......................
        ...............cc...ca4..a4bb.....................
        ....................ca4..a4bb.....................
        ................cc..ca4..a4bb.....................
        ................cc44ca4....44.....................
        ................cc44.......42.....................
        ...............cc424..aaa.422.....................
        ...............cc2244.aaaa4224ab..................
        ...............cc2caa.aa..422aa...................
        .................ccaa.aa.aaaaaaaaa................
        ..................ca.....ccaaaaaaaa...............
        ...................c......ccccc...................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        ..................................................
        `)
    scene.cameraShake(4, 500)
    music.bigCrash.play()
})
let statusbar: StatusBarSprite = null
let Enemy_Ship: Sprite = null
let powerup: Sprite = null
let upgrade: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    ..............................
    ..............................
    ..............................
    ....6..bbb....................
    ....6666......................
    ....6666666...................
    .....6666666..................
    .....666666666................
    .......66666666...............
    ........69966666bbb.99..9.....
    ....4...699966666.............
    .4444bbbb699996666............
    ...44bbbb69999999999999.......
    .........b776333333333333.....
    .......244b76666aaaaaaaaaaaa..
    .......442b76666aaaaaaaaaaaa..
    .........b779333333333333.....
    ...44bbbb99999999999999.......
    .4444bbb699996666.............
    ....4.6669996666..............
    .....6666996666bbb.99.9.......
    ....6666696666................
    ...666666666..................
    ..66666666....................
    ..6666........................
    .....bbb......................
    ..............................
    ..............................
    ..............................
    ..............................
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(5)
music.playMelody("C C5 C A C F C E ", 120)
game.onUpdateInterval(2000, function () {
    Enemy_Ship = sprites.create(img`
        . . . . . . . b b b b b b b . . 
        . . . . . b b b a a a a a a a . 
        . . c c c a a a a a a a a a a a 
        . c d c c a a a a a a a . . . . 
        . c d c c a 4 a a a a a b 9 9 9 
        c d c c c a 4 a a a . . . . . . 
        c c c c c a 4 a 4 b b . 9 9 9 9 
        c c c c c a 4 a 4 b b 9 9 9 9 9 
        c c c c c a 4 a 4 b b . 9 9 9 9 
        . c c c c a 4 a a a . . . . . . 
        . c c c c a a a a a a . . . . . 
        . c c c c a a a a a a a b 9 9 9 
        . . . c c a a a a a a a . . . . 
        . . . . c a a a a a a a a a a . 
        . . . . . c c c a a a a a a a a 
        . . . . . . . c c c c c . . . . 
        `, SpriteKind.Enemy)
    Enemy_Ship.x = scene.screenWidth()
    Enemy_Ship.vx = -20
    Enemy_Ship.y = randint(0, scene.screenWidth() - -10)
    statusbar = statusbars.create(12, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(Enemy_Ship)
    statusbar.setColor(9, 7)
    statusbar.max = 100
})
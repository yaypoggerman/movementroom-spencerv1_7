input.onButtonPressed(Button.A, function () {
    LatestButtonPush = 0
    if (Player.get(LedSpriteProperty.X) == 0) {
        Room += -1
        Player.set(LedSpriteProperty.X, 4)
    } else {
        Player.change(LedSpriteProperty.X, -1)
    }
})
function KeyDoor (x: number) {
    if (Room4Door == 1) {
        led.plotBrightness(x, 3, 190)
        WallHitBox.set(LedSpriteProperty.X, x)
        WallHitBox.set(LedSpriteProperty.Y, 3)
    } else if (Room4Door == 0) {
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.X, 0)
    }
}
function DrawFloor (RoomNum: number) {
    if (RoomNum == 0) {
        led.plotBrightness(3, 4, 190)
        led.plotBrightness(4, 4, 190)
        led.plotBrightness(2, 4, 190)
        led.plotBrightness(1, 4, 190)
        led.plotBrightness(0, 4, 190)
    } else if (RoomNum == 1) {
        led.plotBrightness(0, 4, 190)
        led.plotBrightness(1, 4, 190)
    } else if (RoomNum == 2) {
        led.plotBrightness(3, 4, 190)
        led.plotBrightness(4, 4, 190)
    }
}
input.onButtonPressed(Button.B, function () {
    LatestButtonPush = 1
    if (Player.get(LedSpriteProperty.X) == 4) {
        Room += 1
        Player.set(LedSpriteProperty.X, 0)
    } else {
        Player.change(LedSpriteProperty.X, 1)
    }
})
function FillWall (x: number) {
    led.plotBrightness(x, 0, 190)
    led.plotBrightness(x, 1, 190)
    led.plotBrightness(x, 2, 190)
    led.plotBrightness(x, 3, 190)
    led.plotBrightness(x, 4, 190)
}
let FloorEdge1RoomVar = 0
let FloorEdge2RoomVar = 0
let LatestButtonPush = 0
let WallHitBox: game.LedSprite = null
let Player: game.LedSprite = null
let Room4Door = 0
Room4Door = 1
let Key = game.createSprite(0, 0)
let HasKey = 0
let WallRX = -5
let WallLX = -5
let Room = 1
Player = game.createSprite(1, 3)
Room = 1
WallHitBox = game.createSprite(0, 0)
WallHitBox.set(LedSpriteProperty.Brightness, 0)
Key.set(LedSpriteProperty.Brightness, 0)
Key.set(LedSpriteProperty.X, 3)
Key.set(LedSpriteProperty.Y, 3)
Key.set(LedSpriteProperty.Brightness, 255)
basic.forever(function () {
    if (Player.get(LedSpriteProperty.X) > FloorEdge2RoomVar) {
        Player.set(LedSpriteProperty.Y, 4)
    } else if (Player.get(LedSpriteProperty.X) < FloorEdge1RoomVar) {
        Player.set(LedSpriteProperty.Y, 4)
    } else {
        Player.set(LedSpriteProperty.Y, 3)
    }
})
basic.forever(function () {
    if (Player.get(LedSpriteProperty.X) == WallLX) {
        Player.change(LedSpriteProperty.X, Player.get(LedSpriteProperty.X) + 1)
    } else if (Player.get(LedSpriteProperty.X) == WallRX) {
        Player.change(LedSpriteProperty.X, Player.get(LedSpriteProperty.X) - 1)
    }
})
basic.forever(function () {
    if (Player.isTouching(WallHitBox)) {
        if (LatestButtonPush == 0) {
            Player.change(LedSpriteProperty.X, 1)
        } else if (LatestButtonPush == 1) {
            Player.change(LedSpriteProperty.X, -1)
        }
    }
})
basic.forever(function () {
    if (Player.isTouching(Key)) {
        HasKey = 1
        Key.set(LedSpriteProperty.X, 4)
        Key.set(LedSpriteProperty.Y, 0)
    }
})
basic.forever(function () {
    if (Room == 1) {
        FloorEdge1RoomVar = 0
        FloorEdge2RoomVar = 4
        WallLX = 0
        WallRX = -5
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.Y, 0)
    } else if (Room == 2) {
        WallLX = -5
        WallRX = -5
        FloorEdge1RoomVar = 0
        FloorEdge2RoomVar = 1
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.Y, 0)
    } else if (Room == 0) {
        Room = 1
    } else if (Room == 3) {
        FloorEdge1RoomVar = 3
        FloorEdge2RoomVar = 4
        WallLX = -5
        WallRX = -5
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.Y, 0)
    } else if (Room == 4) {
        FloorEdge1RoomVar = 0
        FloorEdge2RoomVar = 4
        WallLX = -5
        WallRX = 4
        WallHitBox.set(LedSpriteProperty.X, 4)
        WallHitBox.set(LedSpriteProperty.Y, 3)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        if (Player.get(LedSpriteProperty.X) == 3) {
            if (LatestButtonPush == 1) {
                Room4Door = 0
            }
        }
    }
})
basic.forever(function () {
    if (Room == 1) {
        FillWall(0)
        DrawFloor(0)
    } else if (Room == 2) {
        DrawFloor(1)
    } else if (Room == 3) {
        DrawFloor(2)
    } else if (Room == 4) {
        KeyDoor(4)
        DrawFloor(0)
    }
})
basic.forever(function () {
    if (WallHitBox.isTouching(Player)) {
        control.waitMicros(100000)
        HasKey = 0
    }
})

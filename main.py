def on_button_pressed_a():
    global Room
    if Player.get(LedSpriteProperty.X) == 0:
        Room += -1
        Player.set(LedSpriteProperty.X, 4)
    else:
        Player.change(LedSpriteProperty.X, -1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global Room
    if Player.get(LedSpriteProperty.X) == 4:
        Room += 1
        Player.set(LedSpriteProperty.X, 0)
    else:
        Player.change(LedSpriteProperty.X, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def FillWall(x: number):
    led.plot_brightness(x, 0, 128)
    led.plot_brightness(x, 1, 128)
    led.plot_brightness(x, 2, 128)
    led.plot_brightness(x, 3, 128)
    led.plot_brightness(x, 4, 128)
# Key
# 
# WallVars:
# -5 = nowall
# anything else is the walls x
# 
FloorEdge2RoomVar = 0
FloorEdge1RoomVar = 0
Player: game.LedSprite = None
WallRX = -5
WallLX = -5
Room = 1
Player = game.create_sprite(1, 3)
Room = 1
WallHitBox = game.create_sprite(0, 0)
WallHitBox.set(LedSpriteProperty.BRIGHTNESS, 0)

def on_forever():
    global FloorEdge1RoomVar, FloorEdge2RoomVar, WallLX, WallRX, Room
    if Room == 1:
        FloorEdge1RoomVar = 0
        FloorEdge2RoomVar = 4
        WallLX = 0
        WallRX = -5
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.Y, 0)
        FillWall(0)
        led.plot_brightness(3, 4, 128)
        led.plot_brightness(4, 4, 128)
        led.plot_brightness(2, 4, 128)
        led.plot_brightness(1, 4, 128)
        led.plot_brightness(0, 4, 128)
    elif Room == 2:
        WallLX = -5
        WallRX = -5
        FloorEdge1RoomVar = 0
        FloorEdge2RoomVar = 1
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.Y, 0)
        led.plot_brightness(0, 4, 128)
        led.plot_brightness(1, 4, 128)
    elif Room == 0:
        Room = 1
    elif Room == 3:
        FloorEdge1RoomVar = 3
        FloorEdge2RoomVar = 4
        WallLX = -5
        WallRX = -5
        WallHitBox.set(LedSpriteProperty.X, 0)
        WallHitBox.set(LedSpriteProperty.Y, 0)
        led.plot_brightness(3, 4, 128)
        led.plot_brightness(4, 4, 128)
    elif Room == 4:
        FloorEdge1RoomVar = 0
        FloorEdge2RoomVar = 4
        WallLX = -5
        WallRX = 4
        WallHitBox.set(LedSpriteProperty.X, 4)
        WallHitBox.set(LedSpriteProperty.Y, 3)
        FillWall(4)
        led.plot_brightness(3, 4, 128)
        led.plot_brightness(4, 4, 128)
        led.plot_brightness(2, 4, 128)
        led.plot_brightness(1, 4, 128)
        led.plot_brightness(0, 4, 128)
basic.forever(on_forever)

def on_forever2():
    if Player.is_touching(WallHitBox):
        Player.change(LedSpriteProperty.X, -1)
basic.forever(on_forever2)

def on_forever3():
    if Player.get(LedSpriteProperty.X) > FloorEdge2RoomVar:
        Player.set(LedSpriteProperty.Y, 4)
    elif Player.get(LedSpriteProperty.X) < FloorEdge1RoomVar:
        Player.set(LedSpriteProperty.Y, 4)
    else:
        Player.set(LedSpriteProperty.Y, 3)
basic.forever(on_forever3)

def on_forever4():
    if Player.get(LedSpriteProperty.X) == WallLX:
        Player.change(LedSpriteProperty.X, Player.get(LedSpriteProperty.X) + 1)
    elif Player.get(LedSpriteProperty.X) == WallRX:
        Player.change(LedSpriteProperty.X, Player.get(LedSpriteProperty.X) - 1)
basic.forever(on_forever4)

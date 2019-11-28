import turtle
import yaml

PF = {}
with open('苹方极细.txt') as f:
    for line in f:
        char, path = line.strip('\r\n').split('\t')
        path = [[x[0]] + [int(y) for y in x[1:].strip().split(' ')] for x in path.split(';')]
        PF[char] = path

ZX = {}
with open('准星.txt') as f:
    for line in f:
        char, path = line.strip('\r\n').split('\t')
        path = [[x[0]] + [int(y) for y in x[1:].strip().split(' ')] for x in path.split(';')]
        ZX[char] = path

WEN = yaml.load(open('文.yaml'), Loader=yaml.BaseLoader)

n = 5
ts = [1/n * i for i in range(1, n+1)]

turtle.setup(width=1000, height=1000)
turtle.setworldcoordinates(0, 1000, 1000, 0)
turtle.color('blue')
turtle.speed(0)

class Point:
    """
    定义一个简单的二维向量类
    """
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.c = (x, y)

    def __add__(self, other):
        x = self.x + other.x
        y = self.y + other.y
        return Point(x, y)

    def __rmul__(self, scalar):
        x = scalar * self.x
        y = scalar * self.y
        return Point(x, y)

def cubic(t, P1, P2, P3, P4):
    """
    输入：三次 Bezier 曲线上的四个控制点，参数 t
    输出：参数取为 t 时的坐标
    """
    return (1-t)**3*P1 + 3*(1-t)**2*t*P2 + 3*(1-t)*t**2*P3 + t**3*P4

def pos():
    """
    输出：获取当前坐标，转化成 Point 对象
    """
    x, y = turtle.pos()
    return Point(x, y)

def write(dr):
    """
    输入：相对位移
    输出：用 turtle 描绘这段相对位移
    """
    r = pos()
    r = r + dr
    turtle.goto(r.c)

def m(argList):
    """
    输入：m 即移动，接受一个数组 (x, y) 的输入，在 svg 中表示移动至该点
    输出：在 turtle 中移动至该点
    """
    turtle.pu()
    turtle.goto(argList)
    turtle.pd()

def h(argList):
    """
    输入：h 即横线，接受一个数 (x) 的输入，在 svg 中表示横向描绘一条长为 x 的线
    输出：在 turtle 中横向描绘一条长为 x 的线
    """
    write(Point(argList[0], 0))

def v(argList):
    """
    输入：v 即竖线，接受一个数 (y) 的输入，在 svg 中表示纵向描绘一条长为 y 的线
    输出：在 turtle 中横向描绘一条长为 y 的线
    """
    write(Point(0, argList[0]))

def l(argList):
    """
    输入：l 即斜线，接受一个数组 (x, y) 的输入，在 svg 中表示在 (x, y) 方向描绘一条线
    输出：在 (x, y) 方向描绘一条线
    """
    write(Point(argList[0], argList[1]))

def c(argList):
    """
    输入：c 即曲线，接受一个数组 (x1, y1, x2, y2, x3, y3) 的输入
    输出：绘制由四个点组成的三次 Bezier 曲线
    """
    x1, y1, x2, y2, x3, y3 = argList
    this = pos()
    first = this + Point(x1, y1)
    second = this + Point(x2, y2)
    end = this + Point(x3, y3)
    for t in ts:
        r = cubic(t, this, first, second, end)
        turtle.goto(r.c)

zi = '夫'

# 绘制苹方
pf = PF[zi]
for stroke in pf:
    func = stroke[0]
    argList = stroke[1:]
    eval(func)(argList)

# 绘制准星
zx = ZX[zi]
for stroke in zx:
    func = stroke[0]
    argList = stroke[1:]
    eval(func)(argList)

turtle.color('red')
turtle.pu()

# 绘制数据库
zi = WEN[zi]
for stroke in zi:
    points = stroke[1:]
    turtle.goto([int(x) for x in points[0]])
    turtle.pd()
    for point in points[1:]:
        turtle.goto([int(x) for x in point])
    turtle.pu()

turtle.exitonclick()
turtle.done()

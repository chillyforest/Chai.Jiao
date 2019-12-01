tol = 10**-15

function censor(t) {
  // 过滤不属于 [0, 1] 之间的解
  if (t >= 0 && t <= 1) {
    return t
  }
  else {
    return undefined
  }
}

function quadratic(a, b, c) {
  // 寻找一个二次方程在 [0, 1] 内的解
  if (Math.abs(a) < tol) {
    t = -c/b
    return censor(t)
  }
  else {
    delta = b*b - 4*a*c
    if (delta > 0) {
      t1 = (-b + Math.sqrt(delta))/2/a
      t2 = (-b - Math.sqrt(delta))/2/a
      if (censor(t1)) {
        return t1
      }
      else if (censor(t2)) {
        return t2
      }
      else {
        return undefined
      }
    }
    else if (delta == 0) {
      t = -b/2/a
      return censor(t)
    }
    else {
      return undefined
    }
  }
}

class Vector {
  constructor(...components) {
    this.components = components
  }

  add({ components }) {
    return new Vector(
      ...components.map((component, index) => this.components[index] + component)
    )
  }
  subtract({ components }) {
    return new Vector(
      ...components.map((component, index) => this.components[index] - component)
    )
  }
  dotProduct({ components }) {
    return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
  }
  scaleBy(number) {
    return new Vector(
      ...this.components.map(component => component * number)
    )
  }
  length() {
    return Math.hypot(...this.components)
  }
}

function projectOnLine(P, line) {
  P0 = line.start
  P1 = line.end
  P0_P = P.subtract(P0)
  P0_P1 = P1.subtract(P0)
  t = P0_P.dotProduct(P0_P1) / P0_P1.dotProduct(P0_P1)
  if (t >= 0 && t <= 1) {
    Q = P0.scaleBy(1-t).add(P1.scaleBy(t))
    d = P.subtract(Q).length()
    return {'投影': Q, '距离': d}
  }
  else {
    return undefined
  }
}

function projectOnCurve(P, curve) {
  P0 = curve.start
  P1 = curve.mid
  P2 = curve.end
  P0_P2 = P2.subtract(P0)
  P0_P1 = P1.subtract(P0)
  P0_P = P.subtract(P0)
  a = P0_P2.dotProduct(P0_P2.subtract(P0_P1.scaleBy(2)))
  b = 2 * P0_P2.dotProduct(P0_P1)
  c = -1 * P0_P.dotProduct(P0_P2)
  t = quadratic(a, b, c)
  if (t) {
    Q = P0.scaleBy((1-t)**2).add(P1.scaleBy(2*t*(1-t))).add(P2.scaleBy(t**2))
    d = P.subtract(Q).length()
    return {'投影': Q, '距离': d}
  }
  else {
    return undefined
  }
}

P = new Vector(0, 0)
line = {'start': new Vector(-1, 1), 'end': new Vector(1, 1)}
curve = {'start': new Vector(-1, 2), 'mid': new Vector(0, 1), 'end': new Vector(1, 2)}
console.log(projectOnLine(P, line))
console.log(projectOnCurve(P, curve))
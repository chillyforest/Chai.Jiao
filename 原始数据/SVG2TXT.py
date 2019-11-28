from xml.etree.ElementTree import parse
import re

pattern = re.compile(r'[Mhvlcs][-\d\.e ]+')

CJK = {}
with open('原始数据/CJK.txt', 'r') as f:
    for line in f:
        char, code = line.strip('\r\n').split('\t')
        CJK[chr(eval('0x' + code))] = char

with open('原始数据/GB.txt', 'r') as f:
    charDict = {line.strip('\r\n'): None for line in f}

def process(string):
    result = []
    # string = "M77 721h847v-21h-404v-703c0 -54 -27 -81 -80 -81h-155l-4 21c53 -1 104 -2 152 -2c43 0 65 23 65 68v697h-421v21z"
    cache = []
    for n, step in enumerate(pattern.findall(string)):
        a = [float(i) for i in step[1:].strip().split(' ')]
        if step[0] == 'M':
            z = 'm'
            l = [a[0], 850 - a[1]]
        elif step[0] == 'c':
            z = 'c'
            l = [a[0], -a[1], a[2], -a[3], a[4], -a[5]]
            cache = [a[4] - a[2], a[3] - a[5]]
        elif step[0] == 's':
            z = 'c'
            l = cache + [a[0], -a[1], a[2], -a[3]]
        elif step[0] == 'l':
            z = 'l'
            l = [a[0], -a[1]]
        elif step[0] == 'h':
            z = 'h'
            l = [a[0]]
        elif step[0] == 'v':
            z = 'v'
            l = [-a[0]]
        s = z + ' '.join([str(int(i)) for i in l])
        result.append(s)
    return result

name = '准星'
TTF = parse('原始数据/%s.svg' % name)
for item in TTF.iterfind('glyph'):
    char = item.get('unicode')
    if char in charDict:
        if not charDict[char]:
            path = item.get('d')
            charDict[char] = process(path)
    elif char in CJK:
        if not charDict[CJK[char]]:
            path = item.get('d')
            charDict[CJK[char]] = process(path)

print('GB 内缺字：', list(x for x in charDict if not charDict[x]))

outputList = sorted([[key, value] for key, value in charDict.items() if value], key=lambda x: ord(x[0]))

with open('%s.txt' % name, 'w') as f:
    for key, value in outputList:
        f.write('%s\t' % key)
        f.write(';'.join(step for step in value))
        f.write('\n')
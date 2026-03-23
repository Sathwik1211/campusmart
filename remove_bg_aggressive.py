from PIL import Image
import os

files = ['public/logo.png', 'src/assets/logo.png']

# High tolerance setup to clip anti-aliased white halo shadows over fine edges.
for path in files:
    if not os.path.exists(path):
        continue
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        # If ANY channel is above 160 (light grey/white), treat it as background/halo.
        # Dark blue logo has R,G,B way below 100.
        if r > 150 and g > 150 and b > 150:
            newData.append((255, 255, 255, 0)) # fully transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(path, "PNG")

print("Aggressive halo-stripping transparent conversion complete!")

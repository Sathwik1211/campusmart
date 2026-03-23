from PIL import Image
import os

files = ['public/logo.png', 'src/assets/logo.png']

for path in files:
    if not os.path.exists(path):
        continue
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check for white/greyish background pixels
        # If R,G,B are all absolute light (e.g., > 220) it is isolated background.
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(path, "PNG")

print("Logo backgrounds stripped into transparency successfully!")

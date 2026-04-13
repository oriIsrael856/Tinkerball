import os
from PIL import Image

# Use relative path from the script's location
assets_dir = os.path.join('public', 'assets')
images = [f for f in os.listdir(assets_dir) if f.endswith('.png') and f != 'grass.png']

for img_name in images:
    img_path = os.path.join(assets_dir, img_name)
    print(f"Processing {img_name}...")
    
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # If the pixel is very light (near white), make it transparent
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(img_path, "PNG")
    print(f"Saved {img_name}")

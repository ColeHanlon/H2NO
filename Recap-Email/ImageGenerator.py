from PIL import Image
from PIL import ImageFilter

def GenerateProgress(percent):
    img1 = Image.open(r"./water_drop.png").convert("RGBA")
    img2 = Image.open(r"./gradient.jpeg").convert("RGBA")
    
    w, h = img2.size

    white = Image.new("RGB", (w, h), (255, 255, 255)).convert("RGBA")

    crop_height = (percent / 100) * h

    white = white.crop((0, crop_height, w, 715))

    img2.paste(white, (0,0), mask = white)
    img2.paste(img1, (0,0), mask = img1)
    
    img2 = img2.convert("RGB")
    img2.save("generated_droplet.jpg")
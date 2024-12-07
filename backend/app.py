from dotenv import load_dotenv
import google.generativeai as genai
import os,re
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.environ['GEMINI_API'])
model = genai.GenerativeModel("gemini-1.5-pro-latest")


@app.route("/")
def main():
    return "<p>Hello</p>"

@app.route("/generate_palette", methods=['POST'])
def generate_palette():

    f_prompt = request.form.get('prompt')
    image = request.files.get('image')

    # Debug prints
    # print(f"Received Prompt: {f_prompt}")
    if image and f_prompt:

        print(f"Received Image: {image.filename}")
        image_pil = Image.open(image)
        prompt = f"""create a color palette based on {f_prompt} and color from provided image in JSON format and without any description of the color.
        Use this JSON schema:

        ColorPalette = {{
        "paletteName": "",
        "colors": {{
            "primary": "",
            "secondary": "",
            "accent": "",
            "neutralLight": "",
            "neutralDark": "",
            "highlight": ""
        }}
        }}
        """
        result = model.generate_content([prompt, image_pil])
        palette = re.search(r'(\{.*\})', result.text, re.DOTALL).group(1)
    elif not image and f_prompt:
        prompt = f"""create a color palette based on {f_prompt} in JSON format and without any description of the color.
        Use this exact JSON schema not more than this:

        ColorPalette = {{
        "paletteName": "",
        "colors": {{
            "primary": "",
            "secondary": "",
            "accent": "",
            "neutralLight": "",
            "neutralDark": "",
            "highlight": ""
        }}
        }}
        """
        
        result = model.generate_content(prompt)
        # palette = result.text.split('{', 1)[1].rsplit('}', 1)[0]
        palette = re.search(r'(\{.*\})', result.text, re.DOTALL).group(1)
    elif not f_prompt and image:
        image_pil = Image.open(image)
        prompt = f"""create a color palette based on the colors from provided image in JSON format and without any description of the color.
        Use this JSON schema:

        ColorPalette = {{
        "paletteName": "",
        "colors": {{
            "primary": "",
            "secondary": "",
            "accent": "",
            "neutralLight": "",
            "neutralDark": "",
            "highlight": ""
        }}
        }}
        """
        result = model.generate_content([prompt, image_pil])
        palette = re.search(r'(\{.*\})', result.text, re.DOTALL).group(1)
    else:
        palette = ""
    
    # print("start")
    # print(palette)
    # print("end")
    return jsonify(palette)

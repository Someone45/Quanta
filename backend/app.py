from flask import Flask, make_response, redirect, request, jsonify
import flask
from flask_cors import CORS
import requests
import json
from io import BytesIO
import base64
from dotenv import load_dotenv
import os
from PIL import Image
import json
from pathlib import Path

load_dotenv()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# Max 5 megabytes for file uploads
app.config['MAX_CONTENT_LENGTH'] = 5 * 1000 * 1000

LABS_TOKEN = os.getenv('LABS_TOKEN')
JSON_PATH = Path("eleven_labs_models.json") # Maps from Discord id to Eleven labs model name

def get_models() -> dict[str, str]:
    return json.loads(JSON_PATH.read_text())

def get_user_voice_model(discord_id: str) -> str | None:
    return get_models().get(discord_id)

def set_user_voice_model(discord_id: str, eleven_labs_model: str):
    JSON_PATH.write_text(json.dumps(get_models().update({discord_id: eleven_labs_model})))

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/get_user_servers', methods=['POST'])
def get_user_servers():
    try:
        data = request.get_json()
#         print(f"Data: {data}")
        token = data.get('token')
#         print(f"Token: {token}")
        if not token:
            return jsonify({"error": "Token is required"}), 400

        guilds = requests.get('https://discordapp.com/api/users/@me/guilds',
                              headers={"Authorization": f"{token}"}).json()
#         print(f"Guilds: {guilds}")
        guilds_dict = {guild['id']: [guild['name'], guild['icon']] for guild in guilds}
#         print(guilds_dict)
        return jsonify(guilds_dict)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/get_server_channels', methods=['POST'])
def get_server_channels():
    try:
        data = request.get_json()
        guild_id = data.get('guildID')
        token = data.get('token')

#         print(f"Data: {data}")
#         print(f"Guild ID: {guild_id}")
#         print(f"Token: {token}")


        if not guild_id or not token:
            return jsonify({"error": "Guild ID and Token are required"}), 400

        channels = requests.get(f'https://discord.com/api/v9/guilds/{guild_id}/channels',
                                headers={'Authorization': token}).json()
        channel_dict = {channel['id']: channel['name'] for channel in channels if channel['type'] == 0}

        return jsonify(channel_dict)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/scrape_for_new_messages', methods=['POST'])
def scrape_for_new_messages():
    try:
        data = request.get_json()
        token = data.get('token')
        channel_id = data.get('channel_id')
        friend_ids = data.get('friend_ids')
        cached_messages = data.get('cached_messages', {})

        if not token or not channel_id or not friend_ids:
            return jsonify({"error": "Token, Channel ID, and Friend IDs are required"}), 400

        with requests.Session() as session:
            response = session.get(f'https://discord.com/api/v9/channels/{channel_id}/messages?limit=50',
                                   headers={'Authorization': token})
            messages = response.json()

        new_cache = {}
        all_audios = []
        new_messages = []

        for message in messages:
            if message['author']['id'] in friend_ids:
                msg_id = message['id']
                new_cache[msg_id] = message['content']

                # Generate audio only if it's not the first run
                if cached_messages and msg_id not in cached_messages:
                    print(f"Processing new message for audio: {message['content']}")
                    new_messages.append(message['content'])
                    base64_audio = generate_voice_audio("R9asNVmLdxUDvLwyCH4Q", message['content'])
                    all_audios.append(base64_audio)

        return jsonify({"audios": all_audios, "cache": new_cache, "messages": new_messages}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'wav', 'mp3', 'aac', 'ogg'}
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/add-voice', methods=['POST'])
def add_voice():
    """
    Send binary to this endpoint since that's what the API expects
    """
    files = flask.request.files.getlist("file[]")

    if not files:
        return jsonify({'error': 'No audio files'}), 400

    speaker_discord_id = request.form.get('speaker_id', None) # TODO: Check if speaker is a real person
    if not speaker_discord_id:
        return jsonify({'error': 'No speaker id'}), 400

    headers = {
        "xi-api-key": LABS_TOKEN,
    }

    # Delete old model if it exists
    if old_model := get_user_voice_model(speaker_discord_id):
        requests.delete(f"https://api.elevenlabs.io/v1/voices/{old_model}", headers=headers)

    files = [("files", (file.filename, file.read(), file.content_type)) for file in files]
    data =  {'name': speaker_discord_id }
    response = requests.post("https://api.elevenlabs.io/v1/voices/add", headers=headers, files=files, data=data)

    new_model = response.json()["voice_id"]
    set_user_voice_model(speaker_discord_id, new_model)

    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': response.text}), response.status_code

@app.route('/delete-voice', methods=['POST'])
def delete_voice():
    voice_id = request.form.get('voice_id')
    if not voice_id:
        return jsonify({'error': 'Voice ID is required'}), 400

    url = f"https://api.elevenlabs.io/v1/voices/{voice_id}"

    headers = {"xi-api-key": LABS_TOKEN}

    response = requests.request("DELETE", url, headers=headers)

    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({'error': response.text}), response.status_code

def generate_voice_audio(voice_id, text):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

#     print("Triggered generate_voice_audio")

    CHUNK_SIZE = 1024

    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": LABS_TOKEN,
    }

    data = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.4,
            "similarity_boost": 0.5
        }
    }

    response = requests.post(url, json=data, headers=headers)

#     print("EVELEN LABS RESPONSE: ", response.text)

    if response.status_code == 200:
        audio_buffer = BytesIO()
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                audio_buffer.write(chunk)

        audio_buffer.seek(0)
        base64_audio = base64.b64encode(audio_buffer.read()).decode('utf-8')

        return base64_audio
    else:
        return ""

@app.route('/login',  methods=['POST'])
def login():
    try:
        data = request.get_json()
        token = data['token']
        vef_token = verify_token(token, "@me")
        print(vef_token)
        if (vef_token.ok):

            res = make_response(redirect("http://127.0.0.1:5173/home"))
            res.set_cookie("token", token)
            return res
            return redirect("http://127.0.0.1:5173/home")
        else:
            return jsonify({'error': 'Non-Existent Token'}), 400

    except Exception as e:
        print(e)
        return "Error", 500

def verify_token(token: str, user: str):
    return  requests.get(f'https://discordapp.com/api/users/{user}', headers={"Authorization": f"{token}"})

@app.route('/get-my-info', methods=['POST'])
def get_my_info():
    try:
        data = request.get_json()
        token = data['token']
        vef_token = verify_token(token, "@me")
        username = vef_token.json()['username']
        id = vef_token.json()['id']
        avatar = vef_token.json()['avatar']
        image_url = f'https://cdn.discordapp.com/avatars/{id}/{avatar}.webp?size=96'
        if (vef_token.ok):
            return jsonify({'username': username, 'avatar': image_url}), 200
        else:
            return jsonify({'error': 'Non-Existent Token'}), 400
    except Exception as e:
        print(e)
        return "Error", 500

@app.route('/get-server-icons,', methods = ['POST'])
def get_server_icon(size=256):
    try:
        data = request.get_json()
        guild_id = data.get('guild_id')
        icon_id = data.get('icon_id')

        if not guild_id:
            return jsonify({"error": "Guild_ID is required"}), 400

        else:
            image = requests.get(f' \
                                https://cdn.discordapp.com/icons/{guild_id}/{icon_id}.webp?size={size}')
            image_data = image.content
            image_stream = BytesIO(image_data)
            image = Image.open(image_stream)
            return image

    except Exception as e:
        print(e)


if __name__ == '__main__':
    app.run(debug=True)

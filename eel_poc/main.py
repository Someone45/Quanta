import eel

import base64
from pathlib import Path

Path("web/eel.js").unlink(missing_ok=True)

# Set web files folder
eel.init("web")

@eel.expose  # Expose this function to Javascript
def say_hello_py(x):
    print("Hello from %s" % x)


say_hello_py("Python World!")
eel.my_javascript_function("Python text")(print)

generated_andrew_wav = Path("test_audio/generated-andrew.wav").read_bytes()
generated_andrew_base64 = base64.b64encode(generated_andrew_wav).decode("utf-8")
eel.play_audio(generated_andrew_base64)

eel.start("index.html", size=(300, 200), mode="default")  # Start

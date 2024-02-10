import eel
from pathlib import Path

Path("web/eel.js").unlink(missing_ok=True)

# Set web files folder
eel.init('web')

@eel.expose                         # Expose this function to Javascript
def say_hello_py(x):
    print('Hello from %s' % x)

say_hello_py('Python World!')

eel.start('index.html', size=(300, 200), mode="default")  # Start
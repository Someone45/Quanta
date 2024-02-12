## Inspiration

Text to Speech is very bland and lifeless, they feel as no more  than a computer regurgitating back text. People with disabilities that harm their ability to read messages comfortably, read them for extended periods of time, view their screens without glasses, etc. They are all left with the horrible choice between not using conventional messaging or relying on TTS. We hope to releive the burden from this decision.

## What it does

Quanta is a web app that integrates itself with Discord using simply your token. Once connected, you are able to browse your servers and the channels inside of them. Select the channel where you would like the messages to be read live, here you can then select an user. You have two options once an user is selected, either upload an audio file from your system or record the voice of your friend(s). Directly after the upload, that person will have an assigned voice model to them, and any messages they send will be read live using their voice. You can continue adding audio clips for all of your friends or have someone add them. From here on, as the user, you can choose to have TTS enabled for everyone, if an user does not have a custom model, we assign them a naturally sounding voice, or just for the people who you created a custom model for. 

## How we built it

We built the frontend using Vite and React with MUI components. The backend was based on Python, so we created a Flask server to host all of the functions that would directly interact with Discord to streamline the data processing. Additionally, we hosted [TortoiseTTS](https://github.com/neonbjb/tortoise-tts) as a model for both voice cloning and TTS. The quality produced from it was extremely high, but the processing time stacked up very quickly. We optimized it by saving the conditioning latents during the voice cloning process so we could then load the checkpoint and reduce inference time - in addition to having the models it uses cached to prevent coldboot. Additionally, we opened up an API connection to Eleven Labs with their SOTA voice cloning model and short inference time as a result of their computing power. We were then able to perform the voice cloning through the Flask server and create a straightforward pipeline for audio transmission to the frontend. Additionally, due to the nature of the project, the user does not need to have Discord open nor installed on their device. We chose to create a webapp for the users ease of use across different platforms (OS, Browser, Device, ..etc).

## Challenges we ran into

Our experience in frontend design and creation was very limited, most of us had worked with backend modules and projects. Dealing with CORS issues while making requests to the Flask server and outside of the Flask server was a huge pain point when connecting the frontend to the backend. Additionally, we lacked computing power for more ambitious implementations we wished for.

## Accomplishments that we're proud of

This is our first time working together, and we went from strangers to spending the last two days working as a concrete team. While we were not comfortable with certain technologies, we pushed through and gave it our best (and all of our sleep, nothing motivated us more than another redbull)

## What's next for Quanta

We want to add the ability for users to also perform Speech-To-Text in order to increase accessibility and the realm of usage for our app. Additionally, we look forward to expanding our idea to other platforms such as WhatsApp, iMessage, Facebook Messenger, etc.

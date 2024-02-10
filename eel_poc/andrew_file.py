import requests
import json
import time

cached_messages = {}

def get_user_servers(token):
    try:
        guilds = requests.get('https://discordapp.com/api/users/@me/guilds',
                                  headers={"Authorization": f"{token}"}).json()
        return {guild['id']: [guild['name'],guild['icon']] for guild in guilds}
    except Exception as e:
        print(e)

def get_server_channels(guild_id, token):
    try:
        channels = requests.get(f'https://discord.com/api/v9/guilds/{guild_id}/channels',
                                headers = {'Authorization': token}).json()
        return {channel['id'] : channel['name'] for channel in channels}

    except Exception as e:
        print(e)

#Friend_ID will be converted to a list of multiple ID's
#So that we can keep track of multiple friends
def scrape_for_new_messages(token, channel_id, friend_id):
    global cached_messages
    try:
        with (requests.Session() as session):
            r = session.get(f'https://discord.com/api/v9/channels/{channel_id}/messages?limit=50',
                        headers= {'Authorization' : token})
            jsonn = json.loads(r.text)

            # if empty, fill up cache
            if not cached_messages:
                for value in jsonn:
                    if value['author']['id'] == friend_id:
                        cached_messages[value['id']] = [value['content'],friend_id]
            # else make a new cache
            else:
                new_cache = {}
                for value in jsonn:
                    if value['author']['id'] == friend_id:
                        new_cache[value['id']] = [value['content'],friend_id]

                if new_cache != cached_messages:
                    for key, value in new_cache.items():
                        if key not in cached_messages:
                            #push the new value to be read by TTS
                            print(value)
                    cached_messages = new_cache



    except Exception as e:
        print(e)

if __name__ == "__main__":
    token = ''
    with open('token.txt', 'r') as file:
        token = file.readline()
    guild_id = 1107862201265553428
    channel_id = 932030536732532739
    #print(get_user_servers(token))
    #scrape_for_new_messages(token, channel_id, '258729598643077122')

    while True:
        scrape_for_new_messages(token, channel_id, '258729598643077122')
        time.sleep(1/50)
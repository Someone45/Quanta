import requests
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


if __name__ == "__main__":
    token = ''
    with open('token.txt', 'r') as file:
        token = file.readline()

    print(get_server_channels('1107862201265553428', token))
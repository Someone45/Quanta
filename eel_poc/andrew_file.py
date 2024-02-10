import requests
def get_user_servers(token):
    try:
        guilds = requests.get('https://discordapp.com/api/users/@me/guilds',
                                  headers={"Authorization": f"{token}"}).json()
        return {guild['id']: [guild['name'],guild['icon']] for guild in guilds}
    except Exception as e:
        print(e)

def get_server_channels(guild_id):
    pass

if __name__ == "__main__":
    with open("token.txt", 'r') as file:
        token = file.readline()
        print(get_user_servers(token))
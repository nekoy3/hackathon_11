import subprocess
import configparser
import os
import discord
from discord import app_commands

class MyClient(discord.Client):
    def __init__(self, intents: discord.Intents):
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self) #全てのコマンドを管理するCommandTree型オブジェクトを生成

    def set_guildid(self, guildid):
        self.guildid = guildid

    #ログイン時に呼び出す
    async def setup_hook(self):
        guild=discord.Object(id=self.guildid)
        self.tree.copy_global_to(guild=guild)
        await self.tree.sync(guild=guild)


class ReadConfig():
    def __init__(self):
        self.cfg = configparser.ConfigParser()
    
    def create_config(self):
        self.cfg.read('config.ini', encoding="utf-8_sig")
        self.cfg['SERVER'] = {'token': '', 'guild_id': 0, 'pull_sh': ''}
        with open('config.ini', 'w') as configfile:
            self.cfg.write(configfile)
    
    def read_and_get_config(self):
        try:
            self.cfg.read('config.ini', encoding="utf-8_sig")
            cfg_dict = {}
            cfg_dict['token'] = str(self.cfg['SERVER']['token'])
            cfg_dict['guild_id'] = str(self.cfg['SERVER']['guild_id'])
            cfg_dict['pull_sh'] = str(self.cfg['SERVER']['pull_sh'])

        except Exception as e:
            print("config.iniが存在しないか、設定が間違っています。\n" + str(e))
            #ファイルの存在確認(カレントディレクトリにconfig.iniがあるか)
            if not os.path.isfile('config.ini'):
                self.create_config()
            exit()

        else:
            return cfg_dict

def main():
    client = MyClient(discord.Intents.all())
    r_cfg = ReadConfig()
    cfg_dict = r_cfg.read_and_get_config()

    client.set_guildid(cfg_dict['guild_id'])

    @client.event
    async def on_ready():
        print('Logged in as\n' + client.user.name + "\n" + str(client.user.id) + "\n------")
    
    @client.tree.command()
    @app_commands.choices(type=[
        app_commands.Choice(name="サーバーにpull", value="server_pull"),
        app_commands.Choice(name="coming", value="error")
    ]) 
    async def operate(interaction: discord.Interaction, type: app_commands.Choice[str]):
        if type.value == "server_pull":
            #指定ファイルパスのスクリプトを実行
            result = subprocess.run(cfg_dict['pull_sh'], stdout=subprocess.PIPE, text=True)
            await interaction.response.send_message(content=result, ephemeral=True)
        else:
            await interaction.response.send_message(content="end", ephemeral=True)
    
    client.run(cfg_dict['token'])

if __name__ == '__main__':
    main()
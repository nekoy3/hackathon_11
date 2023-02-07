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

#https://stackoverflow.com/questions/25986533/how-to-get-subprocess-stdout-while-running-git-command
# This will print stdout/stderr as it comes in
def run_shell_command_with_realtime_output(shell_command_string, working_dir='.'):
    # print the command to be executed, just for fun
    print("run_shell_command >", shell_command_string)

    # run it, this will NOT block
    sub_process = subprocess.Popen(shell_command_string,
                                   shell=True,
                                   cwd=working_dir, universal_newlines=True,
                                   stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    output_str = ''
    # print the stdout/stderr as it comes in
    while True:
        # The readline() will block until...
        # it reads and returns a string that ends in a '\n',
        # or until the process has ended which will result in '' string
        output = sub_process.stdout.readline()
        if output:
            output_str += output
        elif sub_process.poll() is not None:
            break

    return output_str

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
            result = run_shell_command_with_realtime_output(cfg_dict['pull_sh'])
            if result == '':
                await interaction.response.send_message(content="更新無し", ephemeral=True)
            else:
                await interaction.response.send_message(content=result, ephemeral=True)
        else:
            await interaction.response.send_message(content="end", ephemeral=True)
    
    client.run(cfg_dict['token'])

if __name__ == '__main__':
    main()
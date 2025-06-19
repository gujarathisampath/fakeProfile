# Vencord DEV Build
## Windows
### Installer
- Join to our [Discord server](https://discord.gg/ffmkewQ4R7) and then go to `#install-and-info` for get installer.

### 1. Requirements

- The version that you'll use is **Vencord DEV Build**. If you don't know how to install then you can [click here](https://docs.vencord.dev/installing/) to read the installation instructions, but consider use `https://github.com/gujarathisampath/VeeeCord.git` instead of `https://github.com/Vendicated/Vencord.git` when you're cloning, because VeeeCord have modified version with CSP for fakeProfile.

### 2. Install Plugin

- You don't need to do that, modified client VeeeCord already have this plugin.

### 3. How to update fakeProfile plugin?

- Go to `VeeeCord/` in adress bar type **cmd**, enter and type in Command Shell this:

```shell
git pull
```

```shell
pnpm i # Devs of Vencord may have changed some dependencies, so do it to not get broken VeeeCord. :)
```

- Then type:

```shell
pnpm build
```

- If you're not using Vesktop then use this command to inject vencord:
```shell
pnpm inject
```
- Restart your Discord client(If you're not using Vesktop) and enjoy.

- That all.

## Linux

### By command
- You can install fakeProfile and Vencord DEV Build in one command below:
```shell
curl -o- 'https://raw.githubusercontent.com/ExtbhiteEAS/fakeProfile/refs/heads/main/assets/fpInstaller.sh' | bash
```

### Manually
> [!CAUTION]
> You need install libraries such as `git nodejs npm` for it.

- You can install fakeProfile and Vencord DEV Build by these command manually:
```shell
git clone https://github.com/gujarathisampath/VeeeCord.git
cd VeeeCord/ && sudo npm i -g pnpm && pnpm i
cd src/ && mkdir userplugins
cd userplugins/ && git clone https://github.com/gujarathisampath/fakeProfile.git && pnpm build
sudo pnpm inject # If you use default Discord client, in custom you need set path to dist/
```
- And after commands you have successfully installed Vencord DEV Build with fakeProfile, but you need to start it manually by `pnpm start`.

### Updating
- Same as for Windows, just do this in terminal by path `VeeeCord/`:
```shell
git pull
```

```shell
pnpm i # Devs of Vencord may have changed some dependencies, so do it to not get broken VeeeCord. :)
```

- Then type:

```shell
pnpm build
```

- If you're not using Vesktop then use this command to inject vencord:
```shell
sudo pnpm inject
```
- Restart your Discord client(If you're not using Vesktop) and enjoy.

- That all.

## Extension
- Join to our [Discord server](https://discord.gg/ffmkewQ4R7) and then go to `#install-and-info` for get extension for your browser.

## Bunny (Pyoncord)

> [!NOTE]
> Since of 04/29/2025, Bunny stopped being supported and not working. There was a url for Bunny but it's broken now. Now installation of Android version can be only looked for in Discord server which you can get actual information about it how to install. **Use fork of any Vendetta client.**

## Emnity

> [!NOTE]
> We don't know about this. If you do, please consider to make issue about this.
> Or use clients like Revange or Vetta that have support for iOS.
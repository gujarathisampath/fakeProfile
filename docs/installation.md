# Vencord DEV Build
## Windows
### Installer
- Join to our [Discord server](https://discord.gg/ffmkewQ4R7) and then go to `#install-and-info` for get installer.

### 1. Requirements

- The version that you'll use is **Vencord DEV Build**. If you don't know how to install then you can [click here](https://docs.vencord.dev/installing/) to read the installation instructions, but consider use `https://github.com/gujarathisampath/VeeeCord.git` instead of `https://github.com/Vendicated/Vencord.git` when you're cloning, because VeeeCord have modified version with CSP for fakeProfile.
- **❗❗ After installation Vencord DEV Build you can go to step 2 to continue of installing.**

### 2. Install Plugin

Open **Windows Explorer** and select the path where you installed **Vencord** and click on the `src` folder. In the folder you just clicked, create a new folder named `userplugins` _(in case you already have that folder, you can skip creating the `userplugins` folder)_.

- In the `userplugins` folder click on the address bar and type **cmd** and press **enter**.

- In **Command Prompt** use this command:

```shell
git clone https://github.com/gujarathisampath/fakeProfile.git
```

- After typing this command, wait until the repository is cloned and then type:

```shell
pnpm build
```

- Also if you using default Discord client, use this command below:
```shell
pnpm inject
```

- And that's all. Now you can restart Discord and check **fakeProfile** in `Settings -> Plugins`.

### 3. How to update fakeProfile plugin?

- Go to `Vencord\src\userplugins\fakeProfile` in adress bar type **cmd** and click to **Command Prompt** type:

```shell
git pull
```

- Then type:

```shell
pnpm build
```

- If you're not using vesktop then use this command to inject vencord:

```shell
pnpm inject
```

That all. Restart your Discord client and enjoy.

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

## Extension
- Join to our [Discord server](https://discord.gg/ffmkewQ4R7) and then go to `#install-and-info` for get extension for your browser.

## Bunny (Pyoncord)

> [!NOTE]
> Since of 04/29/2025, Bunny stopped being supported and not working. There was a url for Bunny but it's broken now. Now installation of Android version can be only looked for in Discord server which you can get actual information about it how to install. **Use fork of any Vendetta client.**

## Emnity

> [!NOTE]
> We don't know about this. If you do, please consider to make issue about this.
> Or use clients like Revange or Vetta that have support for iOS.
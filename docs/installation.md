# Vencord DEV Build
## Windows
### Installer
- Join to our [Discord server](https://discord.gg/ffmkewQ4R7) and then go to `#install-and-info` for get installer.

### 1. Requirements

- The version that you'll use is **Vencord DEV Build**. If you don't know how to install then you can [click here](https://docs.vencord.dev/installing/) to read the installation instructions.
- **❗❗ After installation Vencord DEV Build you can go to step 2 to continue of installing.**
<details closed>
<summary>Video tutorial install Vencord DEV</summary>
<br>

- Youtube video install Vencord DEV Build by [@daveyy1](https://discordappuser.com/users/549244932213309442): _Click image below to watch tutorial_

[![Tutorial Install Third Party Plugin](https://camo.githubusercontent.com/e30590c30a822b3a19fcba0e92cddb3b62aa1b09ac1a10e1958415e26d397090/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f387765786a536f38664e772f6d617872657364656661756c742e6a7067)](https://www.youtube.com/watch?v=8wexjSo8fNw)

</details>

### 2. Install Plugin

Open **Windows Explorer** and select the path where you installed **Vencord** and click on the `src` folder. In the folder you just clicked, create a new folder named `userplugins` _(in case you already have that folder, you can skip creating the `userplugins` folder)_.

- In the `userplugins` folder click on the address bar and type **cmd** and press **enter**.

In **Command Prompt** use this command:

```shell
git clone https://github.com/gujarathisampath/fakeProfile.git
```

After typing this command, wait until the repository is cloned and then type:

```shell
pnpm build
```

And that's all. Now you can restart Discord and check **fakeProfile** in `Settings -> Plugins`.

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
git clone https://github.com/Vendicated/Vencord.git
cd Vencord/ && sudo npm i -g pnpm && pnpm i
cd src/ && mkdir userplugins
cd userplugins/ && git clone https://github.com/gujarathisampath/fakeProfile.git && pnpm build
```
- And after commands you have successfully installed Vencord DEV Build with fakeProfile, but you need to start it manually by `pnpm start`.

## Extension
- Join to our [Discord server](https://discord.gg/ffmkewQ4R7) and then go to `#install-and-info` for get extension for your browser.

## Bunny (Pyoncord)

> [!NOTE]
> Since of 29.04.2025, Bunny stopped being supported and not working. There was a url for Bunny but it's broken now. Now installation of Android version can be only looked for in Discord server which you can get actual information about it how to install. **Use fork of any Vendetta client.**

## Emnity

> [!NOTE]
> We don't know about this. If you do, please consider to make issue about this.
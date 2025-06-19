# Vencord DEV Build
## Windows
### 1. Требование

- Версию, которую вы будете использовать - это **Vencord DEV Build**. Если вы не знаете как установить, то [нажмите сюда](https://docs.vencord.dev/installing/), чтобы прочитать инструкцию по установке.
- **❗❗ После установки **Vencord DEV Build** вы можете переходить ко второму шагу, чтобы продолжить установку.**
<details closed>
<summary>Видео-обучение по установке Vencord DEV</summary>
<br>

- Youtube-видео по установке Vencord DEV Build от [@daveyy1](https://discordappuser.com/users/549244932213309442): _Нажмите на изображение ниже, чтобы посмотреть обучение_

[![Tutorial Install Third Party Plugin](https://camo.githubusercontent.com/e30590c30a822b3a19fcba0e92cddb3b62aa1b09ac1a10e1958415e26d397090/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f387765786a536f38664e772f6d617872657364656661756c742e6a7067)](https://www.youtube.com/watch?v=8wexjSo8fNw)

</details>

### 2. Установка плагина

Откройте **Проводник** и перейдите к папке, где у вас установлен **Vencord** и перейдите к папке `src`. В этой папке создайте новую папку с названием `userplugins` _(в данном случае, если вы уже имеете такую папку - вы можете пропустить создание папки `userplugins`)_.

- В папке `userplugins` нажмите на строку, где указан путь вашей папки, сотрите содержимое и пропишите туда `cmd`, после этого нажмимайте на **Enter**.

В **Командной строке** используйте эту команду:

```shell
git clone https://github.com/gujarathisampath/fakeProfile.git
```

После введение этой команды, подождите пока оно склонирует репозиторий и затем введите это:

```shell
pnpm build
```

И на этом всё. Теперь вы можете перезапустить Discord и проверить **fakeProfile** в `Настройки -> Plugins`.

### 3. Как обновить fakeProfile?

- Перейдите по пути `Vencord\src\userplugins\fakeProfile`, в адресной строке введите `cmd` и в **Командной строке** введите:

```shell
git pull
```

- Затем введите:

```shell
pnpm build
```

- Если вы не используйте Vesktop, тогда используйте эту команду:

```shell
pnpm inject
```

На этом всё. Перезапустите ваш Discord-клиент и наслаждайтесь.

## Linux

### Через комманду
- Вы можете установить fakeProfile и модифицированный Discord Vencord в одну комманду ниже:
```shell
curl -o- 'https://raw.githubusercontent.com/ExtbhiteEAS/fakeProfile/refs/heads/main/assets/fpInstaller.sh' | bash
```

### Вручную
> [!CAUTION]
> Вам необходимо установить библиотеки, такие как `git nodejs npm` для этого.

- Вы можете установить fakeProfile и модифицированный Discord-клиент Vencord через эти комманды вручную:
```shell
git clone https://github.com/Vendicated/Vencord.git
cd Vencord/ && sudo npm i -g pnpm && pnpm i
cd src/ && mkdir userplugins
cd userplugins/ && git clone https://github.com/gujarathisampath/fakeProfile.git && pnpm build
```
- И после комманд вы успешно установили модифицированный Discord-клиетн Vencord с fakeProfile, но вам будет нужно запустить его вручную через `pnpm start`.

## Расширение
- Вступайте в наш [Discord-сервер](https://discord.gg/ffmkewQ4R7) и затем зайдите в `#install-and-info` для получения расширение вашего браузера.

## Bunny (Pyoncord)

> [!NOTE]
> С 29.04.2025, Bunny перестало поддерживаться и работать. Здесь была ссылка для Bunny, но оно теперь сломано. Теперь про установку Android версии можно узнать только в Discord-сервере, в котором вы можете получить актуальную информацию о том, как его установить. **Используйте любой форк клиента Vendetta.**

## Emnity

> [!NOTE]
> Мы не знаем насчёт этого. Если вы знаете, то пожалуйста, сделайте задачу насчёт этого.
# Vencord DEV Build
## Windows
### Установщик
- Вступайте в наш [Discord-сервер](https://discord.gg/ffmkewQ4R7) и затем идите в `#install-and-info`, чтобы получить установщик.

### 1. Требование

- Версию, которую вы будете использовать - это **Vencord DEV Build**. Если вы не знаете как установить, то [нажмите сюда](https://docs.vencord.dev/installing/), чтобы прочитать инструкцию по установке, но советуется использовать `https://github.com/gujarathisampath/VeeeCord.git` заместо `https://github.com/Vendicated/Vencord.git` во время клонирование, потому что в новой версии Vencord имеет белый лист на домены, кроме тех которых нет, потому могут и не загрузиться данные fakeProfile как изображение и CSS.

### 2. Установка плагина

Откройте **Проводник** и перейдите к папке, где у вас установлен **Vencord**, затем к папке `src`. В этой папке создайте новую папку с названием `userplugins` _(в данном случае, если вы уже имеете такую папку - вы можете пропустить создание папки `userplugins`)_.

- В папке `userplugins` нажмите на строку, где указан путь вашей папки, сотрите содержимое и пропишите туда `cmd`, после этого нажимайте на **Enter**.

- В **Командной строке** используйте эту команду:

```shell
git clone https://github.com/gujarathisampath/fakeProfile.git
```

- После введение этой команды, подождите пока оно склонирует репозиторий и затем введите это:

```shell
pnpm build
```

- Если вы будете использовать обычный Discord-клиент, то советуется ввести данную комманду ниже:
```shell
pnpm inject
```

- И на этом всё. Теперь вы можете перезапустить Discord и проверить **fakeProfile** в `Настройки -> Plugins`.

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
- Вы можете установить fakeProfile и модифицированный Discord-клиент Vencord в одну комманду ниже:
```shell
curl -o- 'https://raw.githubusercontent.com/ExtbhiteEAS/fakeProfile/refs/heads/main/assets/fpInstaller.sh' | bash
```

### Вручную
> [!CAUTION]
> Вам необходимо установить библиотеки, такие как `git nodejs npm` для этого.

- Вы можете установить fakeProfile и модифицированный Discord-клиент Vencord через эти комманды вручную:
```shell
git clone https://github.com/gujarathisampath/VeeeCord.git
cd VeeeCord/ && sudo npm i -g pnpm && pnpm i
cd src/ && mkdir userplugins
cd userplugins/ && git clone https://github.com/gujarathisampath/fakeProfile.git && pnpm build
sudo pnpm inject # Если вы используйте обычный Discord-клиент, но для модифицированных вам нужно указать там путь до папки dist/
```
- И после комманд вы успешно установили модифицированный Discord-клиент Vencord с fakeProfile, но вам будет нужно запустить его вручную через `pnpm start`.

## Расширение
- Вступайте в наш [Discord-сервер](https://discord.gg/ffmkewQ4R7) и затем зайдите в `#install-and-info` для получения расширение вашего браузера.

## Bunny (Pyoncord)

> [!NOTE]
> С 29.04.2025, Bunny перестало поддерживаться и работать. Здесь была ссылка для Bunny, но оно теперь не рабочая. Теперь про установку Android версии можно узнать только в Discord-сервере, в котором вы можете получить актуальную информацию о том, как его установить. **Используйте любой форк клиента Vendetta.**

## Emnity

> [!NOTE]
> Мы не знаем насчёт этого. Если вы знаете, то пожалуйста, сделайте задачу насчёт этого.
> Или используйте клиенты как Revange или Vetta, которые имеют поддержку для iOS.
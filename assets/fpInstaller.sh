#!/bin/sh

LIBRARIES='git nodejs npm'
VENCORD_DIRECTORY='Vencord/'
VENCORD_URL='https://github.com/Vendicated/Vencord.git'
FAKEPROFILE_URL='https://github.com/gujarathisampath/fakeProfile.git'
DISTRIB="$(python3 -c "import platform;print(platform.uname().node)")" #echo "Distribution: $DISTRIB" | And $DISTRIB is only working for linux :)

customClientsPrint() {
    echo "To apply your Vencord/Equicord with fakeProfile you need to do these things:"
    echo "Go to Settings -> Vesktop/Equibop Settings -> Scroll down to Vesktop/Equibop Location -> Choose dist/ folder from your Vencord Dev folder -> Restart client and done."
    echo "You don't need to inject if you using Vesktop or Equibop. Good luck."
}

customClients() {
    while true; do
        read -p "Do you have Vesktop client? [Y/N]: " yn
        case $yn in
            [Yy]* ) customClientsPrint; break;;
            [Nn]* ) echo "Starting inject command then. Choose Install Vencord/Equicord -> Path of installed Discord" && sudo pnpm inject; break;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

vencordInstall() {
    git clone $VENCORD_URL
    cd $VENCORD_DIRECTORY && sudo npm i -g pnpm && pnpm i
    cd src/ && mkdir userplugins
    cd userplugins/ && git clone $FAKEPROFILE_URL && pnpm build
    customClients
    break
}

EXIST_DIR=""
for dir in \
    "$VENCORD_DIRECTORY"
do
    if ! [ -d "$dir" ]; then
        EXIST_DIR="null"
    else
        EXIST_DIR="$dir"
        break
    fi
done

if [ -d "$EXIST_DIR" ]; then
    echo "You have already installed Vencord/Equicord, checking for updating..."
    cd $EXIST_DIR && git pull
    cd src/userplugins/fakeProfile && git pull
    pnpm build; break
else
    # Checks of distributions
    # (It means it will work only for Arch Linux, but this will required for non-arch user to install these libraries)
    if [[ $DISTRIB == 'archlinux' ]]; then
        sudo pacman -S $LIBRARIES
    else
        echo "Looks like you're using not Arch Linux. Please install these libraries such as: $LIBRARIES. You need install it by commands that you have in your own distribution."
        echo "P.S: In the next proccess you need type password from sudo command, which mean this script only for Linux users not Windows..."
        read -n 1 -p "Press [Enter] if you did install of these libraries " mainmenuinput
    fi

    vencordInstall
fi
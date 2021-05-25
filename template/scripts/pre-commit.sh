#!/bin/sh

RED='\033[0;31m'
NC='\033[0m' # No Color

# Read user input, assign stdin to keyboard
exec < /dev/tty

while read -p "
You have reviewed and are familiar with Auro's Definition of Done? (Y/n) " yn; do
    case $yn in
        [Yy] ) break;;
        [Nn] ) echo "
${RED}Please review https://auro.alaskaair.com/definition-of-done
before submitting your pull request to ensure that you are compliant.${NC}\n"; break;;
        * ) break;;
    esac
done

exec <&-

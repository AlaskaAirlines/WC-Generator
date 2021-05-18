#!/bin/sh

RED='\033[0;31m'
NC='\033[0m' # No Color
echo "Definition of done checklist.\n"

# Read user input, assign stdin to keyboard
exec < /dev/tty

while read -p "1. With this commit, is the code complete? (Y/n) " yn; do
    case $yn in
        [Yy] ) break;;
        [Nn] ) echo "${RED}Be sure to address all reamining work priot to submittion.${NC}\n"; break;;
        * ) break;;
    esac
done

while read -p "2. Has a design review been completed? (Y/n) " yn; do
    case $yn in
        [Yy] ) break;;
        [Nn] ) echo "${RED}Be sure to review demo with your designer.${NC}\n"; break;;
        * ) break;;
    esac
done

while read -p "3. Have you reviewed your updates in all necessary browsers and devices? (Y/n) " yn; do
    case $yn in
        [Yy] ) break;;
        [Nn] ) echo "${RED}Be sure to revew https://auro.alaskaair.com/support/browsersSupport.${NC}\n"; break;;
        * ) break;;
    esac
done

while read -p "4. Has this feature been reviewed for responsivness and mobile UX? (Y/n) " yn; do
    case $yn in
        [Yy] ) break;;
        [Nn] ) echo "${RED}Please consult with an Auro developer for support.${NC}\n"; break;;
        * ) break;;
    esac
done

while read -p "5. Has this feature been reviewed for accessibility? (Y/n) " yn; do
    case $yn in
        [Yy] ) break;;
        [Nn] ) echo "${RED}Please consult with an Auro develoepr for suport.${NC}\n"; break;;
        * ) break;;
    esac
done

exec <&-

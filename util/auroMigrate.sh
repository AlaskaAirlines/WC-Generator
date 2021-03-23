
## Generate a new baseline install of an auro component
# Argument expected: name of new repo
function generaterepo {
  command wc-generate --test --name "$1"
}

## Migrade files from legacy repo to new build
# Arguments expected: name of old repo, name of new repo
function auromigrate {
  GREEN='\033[0;32m'
  RED='\033[0;31m'
  NC='\033[0m' # No Color

  command clear
  echo -e "The following steps have been address to migrade necessary code from '$1' to '$2'.\n"
  echo -e "Please be sure to review a diff within the new repo as this migration does not account\nfor legacy repositoy customizations such as additional dependencies or multiple CDN packaged bundles."
  # command cp -r "$1"/.git/ "$2"/.git
  echo -e "\n${GREEN}./.git directory copied from '$1' to '$2'\n"

  # command cp -r "$1"/src/ "$2"/src
  echo -e "${GREEN}./src directory copied from '$1' to '$2'\n"

  # command cp -r "$1"/test/ "$2"/test
  echo -e "${GREEN}./test directory copied from '$1' to '$2'\n"

  if [[ $3 = "no-demo" ]]; then
    echo -e "${RED}./demo directory was NOT copied${NC}\n"
  else
    # command cp -r "$1"/demo/ "$2"/demo
    echo -e "${GREEN}./demo directory copied from '$1' to '$2'\n${NC}"
  fi
}

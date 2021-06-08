
## Generate a new baseline install of an auro component
# Argument expected: name of new repo
function generateRepo {
  command wc-generate --test --name "$1" --npm "$2"
}

## Migrade files from legacy repo to new build
# Arguments expected: name of old repo, name of new repo
function auroMigrate {
  GREEN='\033[0;32m'
  RED='\033[0;31m'
  YELLOW='\033[0;33m'
  NC='\033[0m' # No Color

  command clear
  echo -e "The following steps have been addressed to migrade code from ${YELLOW}'$1'${NC} to ${YELLOW}'$2'${NC}.\n"
  echo -e "Please be sure to review the commit to the ${GREEN}repoUpgrde${NC} branch,\nthis migration ${YELLOW}does not${NC} account for legacy repositoy customizations\nsuch as additional dependencies or multiple CDN packaged bundles."

  # migrate git dir
  command cp -r "$1"/.git/ "$2"/.git
  echo -e "\n${GREEN}1.${NC} ./.git directory copied from ${YELLOW}'$1'${NC} to ${YELLOW}'$2'${NC}"
  sleep 2

  # migrate src dir
  command cp -r "$1"/src/ "$2"/src
  echo -e "${GREEN}2.${NC} ./src directory copied from ${YELLOW}'$1'${NC} to ${YELLOW}'$2'${NC}"
  sleep 1

  # migrate tests
  command cp -r "$1"/test/ "$2"/test
  echo -e "${GREEN}3.${NC} ./test directory copied from ${YELLOW}'$1'${NC} to ${YELLOW}'$2'${NC}"
  sleep 1

  # migrate changelog file
  command cp  "$1"/CHANGELOG.md "$2"/CHANGELOG.md
  echo -e "${GREEN}4.${NC} ./CHANGELOG.md copied from ${YELLOW}'$1'${NC} to ${YELLOW}'$2'${NC}"
  sleep 1

  # check for --no-demo
  if [[ $3 = "--no-demo" ]]; then
    echo -e "${RED}5.${NC} ./demo directory was ${RED}NOT${NC} copied\n"
    sleep 3
  else
    command cp -r "$1"/demo/ "$2"/demo
    echo -e "${GREEN}5.${NC} ./demo directory copied from ${YELLOW}'$1'${NC} to ${YELLOW}'$2'${NC}\n"
    sleep 3
  fi

  # change directory into new repo
  command cd "$2"
  echo -e "Switching into ${GREEN}'$2'${NC} directory\n"
  sleep 2

  # check for legacy master branch
  local BRANCH=master
  local existed_in_local=$(git branch --list ${BRANCH})

  # if master branch, change to main branch
  if [[ ${existed_in_local} ]]; then
    command git branch -m main
    sleep 1
    echo -e "Update from ${RED}'master'${NC} to ${RED}'main'${NC} branch"
    sleep 2
  fi

  # Initalize Husky
  command npx husky-init
  command chmod ug+x .husky/*
  command chmod ug+x .git/hooks/*
  command cat .husky/pre-commit.temp > .husky/pre-commit
  command rm .husky/pre-commit.temp
  echo -e "Husky successfully configured! \n"
  sleep 2

  # create and switch to new repoUpgrade branch
  command git checkout -b repoUpgrade
  echo -e "New ${GREEN}'repoUpgrade'${NC} branch created \n"
  sleep 3

  # add updates
  command git add --all
  sleep 1

  # check for --breaking-change
  if [[ $4 = "--breaking-change" ]]; then
    # commit new updates, bypass husky (npm not installed yet)
    command git commit --no-verify -m "refactor(generator migration): migrate repo to latest generator build

BREAKING CHANGE: This refactor contains breaking changes due to migration"
    sleep 1
  else
    # commit new updates, bypass husky (npm not installed yet)
    command git commit --no-verify -m "refactor(generator migration): migrate repo to latest generator build"
    sleep 1
  fi



  # close out message
  echo -e "\n\nCommitted all changes to ${YELLOW}repoUpgrde${NC} Git branch\n"
  echo -e "For any subsequent changes to the ${YELLOW}repoUpgrde${NC}, please\nbe sure to amend to the previous commit.\n"
  echo -e "Use ${YELLOW}$ git commit --amend --no-edit${NC} after staging the updates.\n\n"
}

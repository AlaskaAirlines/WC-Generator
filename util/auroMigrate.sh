
## Generate a new baseline install of an auro component
# Argument expected: name of new repo
function generateRepo {
  command npx @aurodesignsystem/wc-generator --test --name "$1" --npm "${2//\/}"
}

## Migrade files from legacy repo to new build
# Arguments expected: name of old repo, name of new repo
function auroMigrate {
  GREEN='\033[0;32m'
  RED='\033[0;31m'
  YELLOW='\033[0;33m'
  NC='\033[0m' # No Color

  command clear
  echo -e "\nThe following steps have been addressed to migrate code from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}'${NC}.\n"
  echo -e "Please be sure to review the full commit to the ${GREEN}repoUpgrade${NC} branch,\nthis migration ${YELLOW}does not${NC} account for legacy repositoy customizations\nsuch as additional dependencies or multiple CDN packaged bundles."

  # migrate git dir
  command cp -r "${1//\/}"/.git/ "${2//\/}"/.git
  echo -e "\n${GREEN}1.${NC} ${YELLOW}./.git${NC} directory copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}'${NC}"
  sleep 2

  # migrate src dir
  command cp -r "${1//\/}"/src/ "${2//\/}"/src
  echo -e "${GREEN}2.${NC} ${YELLOW}./src${NC} directory copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}'${NC}"
  sleep 1

  # migrate tests
  command cp -r "${1//\/}"/test/ "${2//\/}"/test
  echo -e "${GREEN}3.${NC} ${YELLOW}./test${NC} directory copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}'${NC}"
  sleep 1

  # migrate changelog file
  command cp  "${1//\/}"/CHANGELOG.md "${2//\/}"/CHANGELOG.md
  echo -e "${GREEN}4.${NC} ${YELLOW}./CHANGELOG.md${NC} copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}'${NC}"
  sleep 1

  # move README
  command mkdir "${2//\/}"/_legacy
  command cp "${1//\/}"/README.md "${2//\/}"/_legacy/README.md
  echo -e "${GREEN}5.${NC} ${YELLOW}./README${NC} copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}./_legacy/README.md'${NC}."
  sleep 1

  # move package.json
  command cp "${1//\/}"/package.json "${2//\/}"/_legacy/package.json
  echo -e "${GREEN}6.${NC} ${YELLOW}./package.json${NC} copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}./_legacy/package.json${NC}'."
  sleep 1

  # check for --no-demo
  if [[ $3 = "--no-demo" ]]; then
    command mkdir "${2//\/}"/demo/_legacy
    # command pwd
    command cp "${1//\/}"/demo/index.html "${2//\/}"/demo/_legacy/index.html
    echo -e "${GREEN}7.${NC} ${YELLOW}./demo/index.html${NC} copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}/demo/_legacy/index.html${NC}'.\n"
    sleep 3
  else
    command cp "${1//\/}"/demo/demo.md "${2//\/}"/demo/demo.md
    command cp "${1//\/}"/demo/index.html "${2//\/}"/demo/index.html
    echo -e "${GREEN}7.${NC} ${YELLOW}./demo${NC} directory copied from ${YELLOW}'${1//\/}'${NC} to ${YELLOW}'${2//\/}'${NC}\n"
    sleep 3
  fi

  # change directory into new repo
  command cd "${2//\/}"
  echo -e "Switching into ${GREEN}'${2//\/}'${NC} directory\n"
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

  # commit new updates, bypass husky (npm not installed yet)
  command git commit --no-verify -m "refactor(generator migration): migrate repo to latest generator build"
  sleep 1

  # close out message
  echo -e "\n\nNote: The legacy ${YELLOW}README${NC} and ${YELLOW}package.json${NC} files were maintained.\nBe sure to review these files, manually update with information\nthat needs to be retained and then remove them from the project.\n"
  echo -e "To see diffs, consider using ${YELLOW}$ vimdiff _legacy/package.json package.json${NC}"
  echo -e "\n\nCommitted all changes to ${YELLOW}repoUpgrde${NC} Git branch\n"
  echo -e "For any subsequent changes to the ${YELLOW}repoUpgrde${NC}, please\nbe sure to amend to the previous commit.\n"
  echo -e "Use ${YELLOW}$ git commit --amend --no-edit${NC} after staging the updates.\n\n"
}

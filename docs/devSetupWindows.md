# Windows

Auro's development environment uses Node.js tools. If you are contributing to Auro on Windows, [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) is highly recommended. Otherwise, you will encounter issues with the repo's tooling. Here are the steps for setting up your development environment to work on Auro and WSL.

## Installing WSL

Install WSL using [Microsoft's guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Note the [version requirements](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-2---check-requirements-for-running-wsl-2) before starting. You may have to update Windows first. If you run into issues, check their [troubleshooting docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10#troubleshooting-installation). If you don't know which Linux distro to pick, choose Ubuntu.

After WSL is installed, you can open the WSL terminal by running the `wsl` command or opening Ubuntu from the start menu. WSL does not have a GUI you can interact with -- everything is done from the command line. Check out this [cheat sheet](https://www.git-tower.com/blog/command-line-cheat-sheet/) if you are unfamiliar with Bash.

## Installing dependencies

You will need to install several dependencies on WSL in order to develop with Auro. Even if you have these installed on your main Windows machine, you will still need to install them in WSL.

Install Node 14.x and npm by running the following commands in your WSL terminal ([ref](https://github.com/nodesource/distributions/blob/master/README.md#debinstall))

```sh
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Run the following commands in WSL to install Chrome. This will let you run the Auro tests.

```sh
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
```

Make sure you have [Visual Studio Code](https://code.visualstudio.com/) installed on Windows (not WSL). Install the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) so that you can [open VS Code from WSL](https://code.visualstudio.com/docs/remote/wsl).

We can now use VS Code to edit our `.bashrc` file to set an environment variable. Run the following commands in WSL:

```sh
cd ~
code .
```

This will open VSCode in the folder you're currently in. Add the following line to the bottom of the `.bashrc` file. This will instruct our test runner where to find Chrome.

```
export CHROME_PATH=/usr/bin/google-chrome
```

## Clone a repo

Let's clone an Auro repo to test out the new setup. I like to put all my repos in a `/git` directory, but it's up to you how to organize your code. The following commands will create a Git directory, clone the `auro-button` repo into it, and open it in VS Code.

```sh
cd ~
mkdir git
cd git
git clone https://github.com/AlaskaAirlines/auro-button.git
cd auro-button
code .
```

With VS Code, open the integrated terminal with `` CTRL+SHIFT+` ``. Run `npm i` to install dependencies and build the component.

To run your local environment, be sure to reference the **Start development environment** section of the repo's README doc.

Finally, run the component tests with `npm run test` and make sure everything passes.

## Set up git

You need to configure your Git name and email in WSL. Run the following in the terminal:

```sh
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

## Wrapping up

That's it! You should be all set to develop Auro on Windows. If you run into any setup issues, the Auro team may be able to help.

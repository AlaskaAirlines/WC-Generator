# macOS

Auro's development environment uses Node.js tools. If you are contributing to Auro on macOS, [Xcode](https://www.freecodecamp.org/news/how-to-download-and-install-xcode/), [Homebrew](https://brew.sh/) and [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) are highly recommended. Otherwise, you will encounter issues with the repo's tooling.

## Install Xcode

macOS by itself does not have a way to process binary code. Even though we're not building a macOS or iOS app, [Xcode](https://www.freecodecamp.org/news/how-to-download-and-install-xcode/) is needed to compile C in the Terminal.

> The powerful open-source LLVM compiler for C, C++, and Objective-C is built into Xcode and available from Terminal. With it, your code compiles quickly, and is optimized by Apple to produce blazing-fast apps specifically tuned for the CPUs in iPhone, iPad, and Mac.

## Install Homebrew

While Homebrew comes with a vast array of [additional tooling](https://formulae.brew.sh/formula/) you can install, the main reason for [installing Homebrew](https://brew.sh/) is to unlock your user account from things that macOS typically locks down. Once you have Homebrew installed, developers are granted additional access for installing tooling.

## Install Node Version Manager (NVM)

Not every project is on the same version of Node. [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) makes it easy to run different versions of Node on demand.

## Clone a repo

The following command will clone the `auro-button` repo and open it in VS Code (if [configured](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)).

```sh
$ git clone https://github.com/AlaskaAirlines/auro-button.git
$ cd auro-button
$ code .
```

From a terminal run the following commands to install dependencies and build the component.

```sh
$ npm i
$ npm run dev
```

In a separate terminal/shell, run `npm run serve` to serve the component's demo page.

Finally, run the component tests with `npm run test` and make sure everything passes.

## Set up git

You need to configure your Git name and email. Run the following in the terminal:

```sh
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
```

## Wrapping up

That's it! You should be all set to develop Auro on macOS. If you run into any setup issues, the Auro team may be able to help.

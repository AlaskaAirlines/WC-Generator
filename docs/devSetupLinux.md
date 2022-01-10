# Linux

For Linux developers, the setup is similar to macOS. While these are very different OSs, macOS has history with Unix and share many commonalities with Linux.

While you can [install homebrew](https://docs.brew.sh/Homebrew-on-Linux) on Linux, it doesn't serve the same purpose as it does with macOS. Of course Xcode is not needed. It is recommended to install [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating).

## Clone a repo

The following command will clone the `auro-button` repo and open it in VS Code (if configured).

```sh
$ git clone https://github.com/AlaskaAirlines/auro-button.git
$ cd auro-button
$ npm i
$ code .
```

To run your local environment, be sure to reference the **Start development environment** section of the repo's README doc.

Finally, run the component tests with `npm run test` and make sure everything passes.

## Set up git

You need to configure your Git name and email. Run the following in the terminal:

```sh
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
```

## Wrapping up

That's it! You should be all set to develop Auro on Linux. If you run into any setup issues, the Auro team may be able to help.


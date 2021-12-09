To maintain repository history health, it is best practice to [rebase branches off of an updated main versus merging down](https://www.atlassian.com/git/tutorials/merging-vs-rebasing).

If you have push access to the repo

```
$ git checkout main
$ git pull
$ git checkout [feature branch]
$ git rebase main
$ git push origin [feature branch] --force
```

If you are working off a forked branch, please see [Maintaining your fork's upstream relationship](https://auro.alaskaair.com/contributing/upstream) to sync your main branch and then follow the outlined steps.

### Custom namespace support

When generating a new custom element using the Auro WC-Generator, you are not restricted to using the Auro namespace for your new element. The following example will crate the project, `@aurodesignsystem/auro-ticker`

```shell
$ wc-generate --name Auro-Ticker
```

### Custom npm namespace support

By default, the WC-Generator will output a project that the custom element is for the `@aurodesignsystem` npm namespace. The following example illustrates how you can customize this to `@mynamespace/auro-ticker` for example.

```shell
$ wc-generate --name Auro-Ticker --npm @mynamespace
```

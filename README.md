# Training TypeScript

http://devtesting.jp/tddbc/?TDDBC%E5%A4%A7%E9%98%AA2.0%2F%E8%AA%B2%E9%A1%8C

## 操作方法

### 全体テストの実行

```
$ npm run test
```

### 対象を選んでテストの実行

```
$ npm run test {ファイル名}
```
 
## オススメの拡張機能（VSCode）

- Prettier
- Jest
- Jest Runner


## Windows(WSL)セットアップ方法

### Node.jsのインストール（Voltaの利用）

```
$ curl https://get.volta.sh | bash
$ export VOLTA_HOME="$HOME/.volta"
$ export PATH="$VOLTA_HOME/bin:$PATH"
$ source ~/.bashrc
$ volta -v
$ volta install node@18
$ volta list
```



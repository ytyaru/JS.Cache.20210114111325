# キャッシュに登録するファイル一覧を自動生成したい

* https://stackoverflow.com/questions/46830493/is-there-any-way-to-cache-all-files-of-defined-folder-path-in-service-worker

　ServiceWorkerでキャッシュ登録するとき、全ファイルパスをいちいち手動で指定するのが面倒すぎる。そこで、自動的に全ファイルを登録する方法を見つけた。


# index.htmlのfetchが出ない

　Chromeのデベロッパツールの`Console`タグにある`Preserve log`にチェックを入れる。これで出る。

* https://stackoverflow.com/questions/55295265/service-worker-fetch-event-not-listing-root-index-html

　search keyword.

```
serviceworker fetch '/' root index.html
```


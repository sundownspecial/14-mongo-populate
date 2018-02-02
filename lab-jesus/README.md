##Documentation
Express

Author: Jesus

Getting started:
1.Clone repo into working directory
2.Run npm init
3.Install httpie
4.Start nodemon
5.Use httpie to run the following commands from the cli

Example:requests


fetch all:
```js
http get localhost:3000/api/v1/note
```

fetch one:
```js 
http get localhost:3000/api/v1/note/6b0fd94a-7372-4d1e-a153-08baafb5bc79
```

post:
```js
http post localhost:3000/api/v1/note make=chevy model=spark
```

delete:
```js
http delete localhost:3000/api/v1/note/6b0fd94a-7372-4d1e-a153-08baafb5bc79
```

update:
```js
http delete localhost:3000/api/v1/note/6b0fd94a-7372-4d1e-a153-08baafb5bc79 make=chevy model=impala
```

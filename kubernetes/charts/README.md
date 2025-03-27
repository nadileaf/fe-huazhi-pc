## 生成 helm 包部署文件 fe-huazhi-pc.yaml

```bash
 cd kubernetes/charts/
 helm template -n tip fe-huazhi-pc . >./fe-huazhi-pc.yaml
```

## 打包

```bash
 cd kubernetes/charts/
 helm package .
 helm cm-push fe-huazhi-pc-1.x.tgz production
```

## 测试 / 安装

打开`lens > terminal`

```bash
helm install -n tip fe-huazhi-pc /Users/xxx/fe-huazhi-pc/kubernetes/charts
# fe-ciickd-pc本地的绝对路径
```

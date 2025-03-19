## 生成 helm 包部署文件 fe-ciickd-pc.yaml

```bash
 cd kubernetes/charts/
 helm template -n tip fe-ciickd-pc . >./fe-ciickd-pc.yaml
```

## 打包

```bash
 cd kubernetes/charts/
 helm package .
 helm cm-push fe-ciickd-pc-1.x.tgz production
```

## 测试 / 安装

打开`lens > terminal`

```bash
helm install -n tip fe-ciickd-pc /Users/xxx/fe-ciickd-pc/kubernetes/charts
# fe-ciickd-pc本地的绝对路径
```

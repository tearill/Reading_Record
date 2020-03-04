# Go email  

- 使用 Go 发送邮件  
  node -> node_mailer | Go 内置 mail 模块  
  安装 mailer `go get github.com/jordan-wright/email`  
  初始化：e := email.NewEmail()  
  e.From --- 发送者  
  e.To --- 接收者  
  e.Subject --- 标题  
  e.Text --- 内容  
  e.AttachFile --- 附件  
  e.HTML --- html 格式  
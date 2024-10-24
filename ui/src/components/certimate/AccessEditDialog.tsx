import { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AccessAliyunForm from "./AccessAliyunForm";
import AccessTencentForm from "./AccessTencentForm";
import AccessHuaweiCloudForm from "./AccessHuaweicloudForm";
import AccessQiniuForm from "./AccessQiniuForm";
import AccessAwsForm from "./AccessAwsForm";
import AccessCloudflareForm from "./AccessCloudflareForm";
import AccessNamesiloForm from "./AccessNamesiloForm";
import AccessGodaddyForm from "./AccessGodaddyForm";
import AccessPdnsForm from "./AccessPdnsForm";
import AccessHttpreqForm from "./AccessHttpreqForm";
import AccessLocalForm from "./AccessLocalForm";
import AccessIISForm from "./AccessIISForm";
import AccessSSHForm from "./AccessSSHForm";
import AccessWebhookForm from "./AccessWebhookForm";
import AccessKubernetesForm from "./AccessKubernetesForm";
import { Access, accessProvidersMap } from "@/domain/access";

type AccessEditProps = {
  op: "add" | "edit" | "copy";
  className?: string;
  trigger: React.ReactNode;
  data?: Access;
};

const AccessEditDialog = ({ trigger, op, data, className }: AccessEditProps) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [configType, setConfigType] = useState(data?.configType || "");

  let childComponent = <> </>;
  switch (configType) {
    case "aliyun":
      childComponent = (
        <AccessAliyunForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "tencent":
      childComponent = (
        <AccessTencentForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "huaweicloud":
      childComponent = (
        <AccessHuaweiCloudForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "qiniu":
      childComponent = (
        <AccessQiniuForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "aws":
      childComponent = (
        <AccessAwsForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "cloudflare":
      childComponent = (
        <AccessCloudflareForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "namesilo":
      childComponent = (
        <AccessNamesiloForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "godaddy":
      childComponent = (
        <AccessGodaddyForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "pdns":
      childComponent = (
        <AccessPdnsForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "httpreq":
      childComponent = (
        <AccessHttpreqForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "local":
      childComponent = (
        <AccessLocalForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
      case "iis":
        childComponent = (
          <AccessIISForm
            data={data}
            op={op}
            onAfterReq={() => {
              setOpen(false);
            }}
          />
        );
        break;
    case "ssh":
      childComponent = (
        <AccessSSHForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "webhook":
      childComponent = (
        <AccessWebhookForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
    case "k8s":
      childComponent = (
        <AccessKubernetesForm
          data={data}
          op={op}
          onAfterReq={() => {
            setOpen(false);
          }}
        />
      );
      break;
  }

  const getOptionCls = (val: string) => {
    return val == configType ? "border-primary" : "";
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild className={cn(className)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-full dark:text-stone-200">
        <DialogHeader>
          <DialogTitle>
            {
              {
                ["add"]: t("access.authorization.add"),
                ["edit"]: t("access.authorization.edit"),
                ["copy"]: t("access.authorization.copy"),
              }[op]
            }
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="container py-3">
            <div>
              <Label>{t("access.authorization.form.type.label")}</Label>
              <Select
                onValueChange={(val) => {
                  setConfigType(val);
                }}
                defaultValue={configType}
              >
                <SelectTrigger className="mt-3">
                  <SelectValue placeholder={t("access.authorization.form.type.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("access.authorization.form.type.list")}</SelectLabel>
                    {Array.from(accessProvidersMap.entries()).map(([key, provider]) => (
                      <SelectItem value={key} key={key}>
                        <div className={cn("flex items-center space-x-2 rounded cursor-pointer", getOptionCls(key))}>
                          <img src={provider.icon} className="h-6 w-6" />
                          <div>{t(provider.name)}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-8">{childComponent}</div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AccessEditDialog;

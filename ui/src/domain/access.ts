import { z } from "zod";

type AccessUsages = "apply" | "deploy" | "all";

type AccessProvider = {
  type: string;
  name: string;
  icon: string;
  usage: AccessUsages;
  searchContent: string;
};

export const accessProvidersMap: Map<AccessProvider["type"], AccessProvider> = new Map(
  [
    ["aliyun", "common.provider.aliyun", "/imgs/providers/aliyun.svg", "all", "阿里云:alibaba cloud"],
    ["tencent", "common.provider.tencent", "/imgs/providers/tencent.svg", "all", "腾讯云:tencent cloud"],
    ["huaweicloud", "common.provider.huaweicloud", "/imgs/providers/huaweicloud.svg", "all", "华为云:huawei cloud"],
    ["qiniu", "common.provider.qiniu", "/imgs/providers/qiniu.svg", "deploy", "七牛:qiniu"],
    ["aws", "common.provider.aws", "/imgs/providers/aws.svg", "apply", "亚马逊:amazon:aws"],
    ["cloudflare", "common.provider.cloudflare", "/imgs/providers/cloudflare.svg", "apply", "cloudflare:cf:cloud flare"],
    ["namesilo", "common.provider.namesilo", "/imgs/providers/namesilo.svg", "apply", "namesilo"],
    ["godaddy", "common.provider.godaddy", "/imgs/providers/godaddy.svg", "apply", "godaddy"],
    ["pdns", "common.provider.pdns", "/imgs/providers/pdns.svg", "apply", "powerdns:pdns"],
    ["httpreq", "common.provider.httpreq", "/imgs/providers/httpreq.svg", "apply", "httpreq"],
    ["local", "common.provider.local", "/imgs/providers/local.svg", "deploy", "local:bendi:本地"],
    ["ssh", "common.provider.ssh", "/imgs/providers/ssh.svg", "deploy", "ssh"],
    ["webhook", "common.provider.webhook", "/imgs/providers/webhook.svg", "deploy", "webhook"],
    ["k8s", "common.provider.kubernetes", "/imgs/providers/k8s.svg", "deploy", "k8s:kubernetes"],
  ].map(([type, name, icon, usage, searchContent]) => [type, { type, name, icon, usage: usage as AccessUsages, searchContent: searchContent }])
);

export const accessTypeFormSchema = z.union(
  [
    z.literal("aliyun"),
    z.literal("tencent"),
    z.literal("huaweicloud"),
    z.literal("qiniu"),
    z.literal("aws"),
    z.literal("cloudflare"),
    z.literal("namesilo"),
    z.literal("godaddy"),
    z.literal("pdns"),
    z.literal("httpreq"),
    z.literal("local"),
    z.literal("ssh"),
    z.literal("webhook"),
    z.literal("k8s"),
  ],
  { message: "access.authorization.form.type.placeholder" }
);

export type Access = {
  id: string;
  name: string;
  configType: string;
  usage: AccessUsages;
  group?: string;
  config:
    | AliyunConfig
    | TencentConfig
    | HuaweiCloudConfig
    | QiniuConfig
    | AwsConfig
    | CloudflareConfig
    | NamesiloConfig
    | GodaddyConfig
    | PdnsConfig
    | HttpreqConfig
    | LocalConfig
    | SSHConfig
    | WebhookConfig
    | KubernetesConfig;
  deleted?: string;
  created?: string;
  updated?: string;
};

export type AliyunConfig = {
  accessKeyId: string;
  accessKeySecret: string;
};

export type TencentConfig = {
  secretId: string;
  secretKey: string;
};

export type HuaweiCloudConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export type QiniuConfig = {
  accessKey: string;
  secretKey: string;
};

export type AwsConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  hostedZoneId?: string;
};

export type CloudflareConfig = {
  dnsApiToken: string;
};

export type NamesiloConfig = {
  apiKey: string;
};

export type GodaddyConfig = {
  apiKey: string;
  apiSecret: string;
};

export type PdnsConfig = {
  apiUrl: string;
  apiKey: string;
};

export type HttpreqConfig = {
  endpoint: string;
  mode: string;
  username: string;
  password: string;
};

export type LocalConfig = Record<string, string>;

export type SSHConfig = {
  host: string;
  port: string;
  username: string;
  password?: string;
  key?: string;
  keyFile?: string;
  keyPassphrase?: string;
};

export type WebhookConfig = {
  url: string;
};

export type KubernetesConfig = {
  kubeConfig: string;
};

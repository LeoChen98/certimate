﻿package aliyunvod

import (
	"context"
	"fmt"
	"time"

	aliyunOpen "github.com/alibabacloud-go/darabonba-openapi/v2/client"
	"github.com/alibabacloud-go/tea/tea"
	aliyunVod "github.com/alibabacloud-go/vod-20170321/v4/client"
	xerrors "github.com/pkg/errors"

	"github.com/usual2970/certimate/internal/pkg/core/deployer"
	"github.com/usual2970/certimate/internal/pkg/core/logger"
)

type DeployerConfig struct {
	// 阿里云 AccessKeyId。
	AccessKeyId string `json:"accessKeyId"`
	// 阿里云 AccessKeySecret。
	AccessKeySecret string `json:"accessKeySecret"`
	// 阿里云地域。
	Region string `json:"region"`
	// 点播加速域名（不支持泛域名）。
	Domain string `json:"domain"`
}

type DeployerProvider struct {
	config    *DeployerConfig
	logger    logger.Logger
	sdkClient *aliyunVod.Client
}

var _ deployer.Deployer = (*DeployerProvider)(nil)

func NewDeployer(config *DeployerConfig) (*DeployerProvider, error) {
	if config == nil {
		panic("config is nil")
	}

	client, err := createSdkClient(config.AccessKeyId, config.AccessKeySecret, config.Region)
	if err != nil {
		return nil, xerrors.Wrap(err, "failed to create sdk client")
	}

	return &DeployerProvider{
		config:    config,
		logger:    logger.NewNilLogger(),
		sdkClient: client,
	}, nil
}

func (d *DeployerProvider) WithLogger(logger logger.Logger) *DeployerProvider {
	d.logger = logger
	return d
}

func (d *DeployerProvider) Deploy(ctx context.Context, certPem string, privkeyPem string) (*deployer.DeployResult, error) {
	// 设置域名证书
	// REF: https://help.aliyun.com/zh/vod/developer-reference/api-vod-2017-03-21-setvoddomainsslcertificate
	setVodDomainSSLCertificateReq := &aliyunVod.SetVodDomainSSLCertificateRequest{
		DomainName:  tea.String(d.config.Domain),
		CertName:    tea.String(fmt.Sprintf("certimate-%d", time.Now().UnixMilli())),
		CertType:    tea.String("upload"),
		SSLProtocol: tea.String("on"),
		SSLPub:      tea.String(certPem),
		SSLPri:      tea.String(privkeyPem),
	}
	setVodDomainSSLCertificateResp, err := d.sdkClient.SetVodDomainSSLCertificate(setVodDomainSSLCertificateReq)
	if err != nil {
		return nil, xerrors.Wrap(err, "failed to execute sdk request 'live.SetVodDomainSSLCertificate'")
	} else {
		d.logger.Logt("已设置域名证书", setVodDomainSSLCertificateResp)
	}

	return &deployer.DeployResult{}, nil
}

func createSdkClient(accessKeyId, accessKeySecret, region string) (*aliyunVod.Client, error) {
	// 接入点一览 https://api.aliyun.com/product/vod
	endpoint := fmt.Sprintf("vod.%s.aliyuncs.com", region)

	config := &aliyunOpen.Config{
		AccessKeyId:     tea.String(accessKeyId),
		AccessKeySecret: tea.String(accessKeySecret),
		Endpoint:        tea.String(endpoint),
	}

	client, err := aliyunVod.NewClient(config)
	if err != nil {
		return nil, err
	}

	return client, nil
}

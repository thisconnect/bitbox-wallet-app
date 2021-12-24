# Copyright 2018 Shift Devices AG
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

SHELL    := /bin/bash
WEBROOT  := frontends/web
GOPATH   ?= $(HOME)/go
PATH     := $(PATH):$(GOPATH)/bin

catch:
	@echo "Choose a make target."
envinit:
	# Keep golangci-lint version in sync with what's in .github/workflows/ci.yml.
	curl -sfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh| sh -s -- -b $(GOPATH)/bin v1.27.0
	GO111MODULE=off go get -u github.com/stretchr/testify # needed for mockery
	GO111MODULE=on go get -u github.com/vektra/mockery/...
	GO111MODULE=off go get -u github.com/matryer/moq
	GO111MODULE=off go get golang.org/x/tools/cmd/goimports
	GO111MODULE=off go get -u golang.org/x/mobile/cmd/gomobile
	GO111MODULE=off gomobile init
# Initializiation on MacOS
#  - run make from $GOPATH/src/github.com/digitalbitbox/bitbox-wallet-app
#  - additional dependencies: Qt 5.15 & Xcode command line tools
#  - add to $PATH: /usr/local/opt/go@1.16/bin
osx-init:
	/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
	brew install go@1.16
	$(MAKE) envinit
servewallet:
	go run -mod=vendor ./cmd/servewallet
servewallet-mainnet:
	go run -mod=vendor ./cmd/servewallet -mainnet
servewallet-regtest:
	go run -mod=vendor ./cmd/servewallet -regtest
servewallet-prodservers:
	go run -mod=vendor ./cmd/servewallet -devservers=false
buildweb:
	node --version
	npm --version
	rm -rf ${WEBROOT}/build
	cd ${WEBROOT} && npm install
	cd ${WEBROOT} && npm run build
webdev:
	cd ${WEBROOT} && $(MAKE) dev
weblint:
	cd ${WEBROOT} && $(MAKE) lint
webfix:
	cd ${WEBROOT} && $(MAKE) fix
webtest:
	cd ${WEBROOT} && $(MAKE) jstest
webtestwatch:
	cd ${WEBROOT} && $(MAKE) jstest-watch
qt-linux: # run inside dockerdev
	$(MAKE) buildweb
	cd frontends/qt && $(MAKE) linux
qt-osx: # run on OSX.
	$(MAKE) buildweb
	cd frontends/qt && $(MAKE) osx
	$(MAKE) osx-sec-check
qt-windows:
	$(MAKE) buildweb
	cd frontends/qt && $(MAKE) windows
android:
	$(MAKE) buildweb
	cd frontends/android && ${MAKE} apk-debug
osx-sec-check:
	@echo "Checking build output"
	./scripts/osx-build-check.sh
ci:
	./scripts/ci.sh
clean:
	rm -rf ${WEBROOT}/build
	cd frontends/qt && $(MAKE) clean
	cd frontends/android && $(MAKE) clean
dockerinit:
	docker build --pull --force-rm -t shiftcrypto/bitbox-wallet-app .
dockerdev:
	./scripts/dockerdev.sh
locize-push:
	cd ${WEBROOT}/src/locales && npx locize-cli sync
locize-pull:
	cd ${WEBROOT}/src/locales && npx locize-cli download
locize-fix:
	npx locize-cli format ${WEBROOT}/src/locales --format json
go-vendor:
	go mod vendor

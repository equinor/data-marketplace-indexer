# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.203.0/containers/alpine/.devcontainer/base.Dockerfile

ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

ENV TZ Europe/Oslo

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends silversearcher-ag curl

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
RUN su node -c "npm install -g gitmoji-cli && gitmoji -i"

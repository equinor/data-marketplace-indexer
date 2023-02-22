# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.203.0/containers/alpine/.devcontainer/base.Dockerfile

# [Choice] Alpine version: 3.14, 3.13, 3.12, 3.11
ARG VARIANT="3.17"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-alpine-${VARIANT}

ENV TZ Europe/Oslo
# ** [Optional] Uncomment this section to install additional packages. **
# RUN apk update \
#     && apk add --no-cache <your-package-list-here>
#RUN su node -c "npm install -g gitmoji-cli"
# [Option] Install zsh. False as it is already installed I believe. But needed for script.
ARG INSTALL_ZSH="false"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="false"
ARG ENABLE_NONROOT_DOCKER="true"
# [Option] Use the OSS Moby Engine instead of the licensed Docker Engine
ARG USE_MOBY="true"
# [Option] Engine/CLI Version
ARG DOCKER_VERSION="latest"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.
ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# [Optional] Uncomment this section to install additional OS packages.
RUN apk add --update the_silver_searcher curl npm

RUN npm install -g gitmoji-cli

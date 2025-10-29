FROM alpine:latest

USER root

# Install tools
RUN apk update && apk add --no-cache \
    bash \
    curl \
    sudo \
    unzip \
    git \
    nodejs \
    npm

# Install act CLI
RUN curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash && \
    mv ./bin/act /usr/local/bin/act && \
    chmod +x /usr/local/bin/act

# Install n8n globally
RUN npm install -g n8n

WORKDIR /testing-delights
CMD ["/bin/sh"]

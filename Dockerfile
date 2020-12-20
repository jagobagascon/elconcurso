FROM node:14.15.3-buster-slim

WORKDIR /workspace
COPY . /workspace

CMD /bin/bash

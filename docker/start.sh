#! /bin/bash

env | grep -e NEXT_PUBLIC_ >> .env.production

node server.js

#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path-to-iso>"
    exit 1
fi

HTTP_DIR=./iso_web/

rm -rf $HTTP_DIR
mkdir $HTTP_DIR

bsdtar -xf "$1" -C $HTTP_DIR

./tftp-serve.sh

cd $HTTP_DIR && python3 -m http.server 8080
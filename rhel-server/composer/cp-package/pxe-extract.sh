#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path-to-archive.tar.xz>"
    exit 1
fi

ARCHIVE_FILE="$1"

if ! [[ -f "$ARCHIVE_FILE" && "$ARCHIVE_FILE" == *.tar.xz ]]; then
    echo "Error: The provided path is not a valid .tar.xz file: '$ARCHIVE_FILE'"
    exit 1
fi

mkdir -p pxe/
tar -xf "$ARCHIVE_FILE" -C pxe/ --wildcards '*vmlinuz*' '*x86_64.img'

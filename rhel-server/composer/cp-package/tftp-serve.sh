#!/bin/bash

set -e

firewall-cmd --add-service=tftp

ISO_DIR=isoweb/
IMG_FILE=liveimg.tar.gz
TFTP_DIR=/var/lib/tftpboot/

tar -xf "$IMG_FILE" -C "$TFTP_DIR" --wildcards '*/shim*.efi' '*/grubx64.efi'

WORKER_DIR=$TFTP_DIR/images/RHEL-WORKER/

mkdir -p $WORKER_DIR

cp $ISO_DIR/images/pxeboot/{vmlinuz,initrd.img} $WORKER_DIR

systemctl start dhcpd
systemctl enable dhcpd

systemctl start xinetd
systemctl enable xinetd
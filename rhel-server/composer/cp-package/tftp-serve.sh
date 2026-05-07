#!/bin/bash

set -e

firewall-cmd --add-service=tftp

ISO_DIR=iso_web
IMG_FILE=$ISO_DIR/liveimg.tar.gz
TFTP_DIR=/var/lib/tftpboot/

cp grub.cfg $TFTP_DIR/grub.cfg

tar -xf "$IMG_FILE" -C "$TFTP_DIR" --wildcards '*/shim*.efi' '*/grubx64.efi'

WORKER_DIR=$TFTP_DIR/images/RHEL-WORKER/

mkdir -p $WORKER_DIR

cp $ISO_DIR/images/pxeboot/{vmlinuz,initrd.img} $WORKER_DIR

cp dhcpd.conf /etc/dhcp/dhcpd.conf

systemctl start dhcpd
systemctl enable dhcpd

systemctl start xinetd
systemctl enable xinetd
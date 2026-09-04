"use client";

import { Modal } from "@/shared";

import { SessionQRCode } from "./SessionQRCode";
import { SessionQRCodeModalProps } from "./types";

export function SessionQRCodeModal({ open, onClose, id }: SessionQRCodeModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Attendance QR Code" size="sm">
      <div className="flex flex-col items-center">
        <div className="mb-5">
          <SessionQRCode sessionId={id} />
        </div>

        <p className="text-center text-sm text-gray-500">Students can scan this QR code to record their attendance.</p>
      </div>
    </Modal>
  );
}

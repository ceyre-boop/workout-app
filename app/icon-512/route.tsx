import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/icon-mark";

export function GET() {
  return new ImageResponse(<IconMark size={512} />, {
    width: 512,
    height: 512,
  });
}

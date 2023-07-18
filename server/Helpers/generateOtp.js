import { randomBytes } from "crypto";

export async function generateOtp (min, max){
    const range = max - min + 1;
    const randomBytesBuffer = randomBytes(4)
    const randomInt = Math.floor(
        randomBytesBuffer.readUInt32BE(0) / 0xffffffff * range + min
    );
    return randomInt;
};
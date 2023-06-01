function fileToBase64(file: File | undefined | null): Promise<string | null> {
    return new Promise((resolve, reject) => {
        if (!file) resolve(null);

        const reader = new FileReader();

        reader.readAsDataURL(file!);

        reader.onload = () => resolve(reader.result?.toString()!);
        reader.onerror = error => reject(error);
    })
};

function isFileAnImage(file: File): boolean {
    const imageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    return imageTypes.includes(file.type);
}

function base64StringToBuffer(fileString: string) {
    const buffer = Buffer.from(fileString, 'base64')

    return buffer;
}

export {
    fileToBase64,
    isFileAnImage,
    base64StringToBuffer
}
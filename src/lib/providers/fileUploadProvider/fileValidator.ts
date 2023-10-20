import fileTypeChecker from 'file-type-checker';

class FileValidator {
  public validateFile = async (file: File): Promise<boolean> => {
    // .pdf,.docx,.png,.jpeg,.jpg
    const acceptedTypes = ['jpeg', 'png', 'pdf'];

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContents = reader.result as ArrayBuffer;

        const docxMimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        if (file.type === docxMimeType) {
          // The library can't validate the signatures of .docx files
          // so we have to manually validate it
          // https://www.garykessler.net/library/file_sigs.html
          resolve(this.validateDocxSignature(fileContents));
        } else {
          resolve(
            fileTypeChecker.validateFileType(fileContents, acceptedTypes)
          );
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  private validateDocxSignature = (fileContents: ArrayBuffer): boolean => {
    const docxSignature = [0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00];
    const uint8Array = new Uint8Array(fileContents);

    return docxSignature.every((byte, index) => byte === uint8Array[index]);
  };
}

export default FileValidator;

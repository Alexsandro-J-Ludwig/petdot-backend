class AnimalUploadDTO {
    constructor(
        public readonly filename: string,
        public readonly contentType: string,
    ){}

    static fromResponse(data: any): AnimalUploadDTO {
        return new AnimalUploadDTO(data.filename, data.contentType);
    }
}

export { AnimalUploadDTO }
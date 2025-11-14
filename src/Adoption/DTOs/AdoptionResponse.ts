class AdoptionResponseDTO {
    constructor(
        public readonly data?: any,
        public readonly message?: string,
    ){}

    static fronResponse(response: any, message: string): AdoptionResponseDTO {
        return new AdoptionResponseDTO(response || "", message || "");
    }
}

export { AdoptionResponseDTO };
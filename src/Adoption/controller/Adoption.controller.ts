import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.ts";
import { AdoptionService } from "../service/Adoption.service.ts";
import { AdoptionDTO } from "../DTOs/Adoption.dto.ts";

class AdoptionController{
    static create = asyncHandler(async (req: Request, res: Response) => {
        const dto = AdoptionDTO.fromRequest(req.body);
        const response =  await AdoptionService.createAdoption(dto);
        res.status(201).json(response);
    }) 

    static getByUuid = asyncHandler(async (req: Request, res: Response) => {
        const response = await AdoptionService.getAdoptionByUuid(req.params.uuid!);
        res.status(200).json(response);
    })

    static getAll = asyncHandler(async (req: Request, res: Response) => {
        const responses = await AdoptionService.getAllAdoptions();
        res.status(200).json(responses);
    })

    static getByUserUuid = asyncHandler(async (req: Request, res: Response) => {
        const responses = await AdoptionService.getAdoptionsByUserUuid(req.params.uuid_user!);
        res.status(200).json(responses);
    })

    static getByAnimalUuid = asyncHandler(async (req: Request, res: Response) => {
        const response = await AdoptionService.getAdoptionByAnimalUuid(req.params.uuid_animal!);
        res.status(200).json(response);
    })

    static deleteByUuid = asyncHandler(async (req: Request, res: Response) => {
        const response = await AdoptionService.deleteAdoptionByUuid(req.params.uuid!);
        res.status(200).json(response);
    })
}

export { AdoptionController };
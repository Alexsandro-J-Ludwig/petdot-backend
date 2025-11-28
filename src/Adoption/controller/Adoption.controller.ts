import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { AdoptionService } from "../service/Adoption.service.js";
import { AdoptionDTO } from "../DTOs/Adoption.dto.js";

class AdoptionController{
    static create = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        
        const dto = AdoptionDTO.fromRequest((req as any).user.uuid, req.body);
        const response =  await AdoptionService.createAdoption(dto);
        res.status(201).json(response);
    }) 

    static getByUuid = asyncHandler(async (req: Request, res: Response) => {
        const response = await AdoptionService.getAdoptionByUuid(req.params.uuid!);
        res.status(200).json(response);
    })

    static getAll = asyncHandler(async (_: Request, res: Response) => {
        const responses = await AdoptionService.getAllAdoptions();
        res.status(200).json(responses);
    })

    static getByUserUuid = asyncHandler(async (req: Request, res: Response) => {
        const responses = await AdoptionService.getAdoptionsByUserUuid((req as any).user.uuid);
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
import type { Request, Response } from "express";
import { AnimalDTO } from "../DTOs/Animal.dto.ts";
import { AnimalService } from "../service/Animal.service.ts";
import { asyncHandler } from "../../utils/AsyncHandler.ts";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.ts";

class AnimalController {
    static create = asyncHandler(async(req: Request, res: Response) => {
        const dto = AnimalDTO.fronRequest(req.body);
        const response = await AnimalService.create(dto);
        res.status(201).json(response);
    })

    static getById = asyncHandler(async(req: Request, res: Response) => {
        const { uuid } = req.params;
        const response = await AnimalService.getById(uuid!);
        res.status(200).json(response);
    })

    static getAll = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.getAll();
        res.status(200).json(response);
    })

    static getByShelter = asyncHandler(async(req: Request, res: Response) => {
        const { uuid_shelter } = req.params;
        const response = await AnimalService.getByShelter(uuid_shelter!);
        res.status(200).json(response);
    })

    static update = asyncHandler(async(req: Request, res: Response) => {
        const dto = AnimalUpdateDTO.fromRequest(req.body);
        const response = await AnimalService.update(req.params.uuid!, dto);
        res.status(200).json(response);
    })

    static delete = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.delete(req.params.uuid!);
        res.status(200).json(response);
    })
}

export { AnimalController }

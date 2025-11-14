import type { Request, Response } from "express";
import { AnimalDTO } from "../DTOs/Animal.dto.ts";
import { AnimalService } from "../service/Animal.service.ts";
import { asyncHandler } from "../../utils/AsyncHandler.ts";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.ts";
import { AnimalUploadDTO } from "../DTOs/AnimalUpload.dto.ts";

class AnimalController {
    static create = asyncHandler(async(req: Request, res: Response) => {
        const dto = AnimalDTO.fronRequest(req.body);
        const response = await AnimalService.create(dto);
        res.status(201).json(response);
    })

    static getURL = asyncHandler(async(req: Request, res: Response) => {
        const dto = AnimalUploadDTO.fromRequest(req.body, req.headers);
        const response = await AnimalService.getURL(dto);
        res.status(200).json(response);
    })

    static getById = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.getById(req.params.id!);
        res.status(200).json(response);
    })

    static getAll = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.getAll();
        res.status(200).json(response);
    })

    static getByShelter = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.getByShelter(req.params.id!);
        res.status(200).json(response);
    })

    static update = asyncHandler(async(req: Request, res: Response) => {
        const dto = AnimalUpdateDTO.fromRequest(req.params.id, req.body);
        const response = await AnimalService.update(dto);
        res.status(200).json(response);
    })

    static delete = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.delete(req.params.id!);
        res.status(200).json(response);
    })
}

export { AnimalController }

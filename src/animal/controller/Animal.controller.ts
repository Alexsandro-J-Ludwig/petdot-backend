import type { Request, Response } from "express";
import { AnimalDTO } from "../DTOs/Animal.dto.js";
import { AnimalService } from "../service/Animal.service.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { AnimalUpdateDTO } from "../DTOs/AnimalUpdate.dto.js";
import { AnimalUploadDTO } from "../DTOs/AnimalUpload.dto.js";

class AnimalController {
    static create = asyncHandler(async(req: Request, res: Response) => {
        console.log(req.body);
        
        const dto = AnimalDTO.fronRequest(req.body);   
        const response = await AnimalService.create(dto);
        
        res.status(201).json(response);
    })

    static getURL = asyncHandler(async(req: Request, res: Response) => {    
        const { filename } = req.params

        const dto = AnimalUploadDTO.fromRequest({ filename }, req);
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
        console.log("controller: ", req.body);
        
        const dto = AnimalUpdateDTO.fromRequest(req, req.body);
        const response = await AnimalService.update(dto);
        res.status(200).json(response);
    })

    static delete = asyncHandler(async(req: Request, res: Response) => {
        const response = await AnimalService.delete(req.params.id!);
        res.status(200).json(response);
    })
}

export { AnimalController }

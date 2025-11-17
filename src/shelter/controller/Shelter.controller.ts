import { ShelterService } from "../service/Shelter.service";

import { ShelterDTO } from "../DTOs/Shelter.dto";
import { ShelterResponseDTO } from "../DTOs/ShelterResponse.dto";
import { ShelterUpdateDTO } from "../DTOs/ShelterUpdate.dto";
import { asyncHandler } from "../../utils/AsyncHandler";
import type { Request, Response } from "express";

class ShelterController {
  static createShelter = asyncHandler(async (req: Request, res: Response) => {
    const dto = ShelterDTO.fromRequest((req as any).user.uuid, req.body);
    const response: ShelterResponseDTO = await ShelterService.createShelter(
      dto
    );

    res.status(201).json(response);
  });

  static getShelterById = asyncHandler(async (req: Request, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.getShelterById(
      req.params.id!
    );

    res.status(200).json(response);
  });

  static getAllShelter = asyncHandler(async (_, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.getAllShelter();

    res.status(200).json(response);
  });

  static getByUser = asyncHandler(async (req: Request, res: Response) => {
    console.log((req as any).user.uuid)
    const response: ShelterResponseDTO = await ShelterService.getByUser(
      (req as any).user.uuid
    );

    res.status(200).json(response);
  });

  static updateShelter = asyncHandler(async (req: Request, res: Response) => {
    const dto: ShelterUpdateDTO = ShelterUpdateDTO.fromRequest(req.params, req.body);
    const response: ShelterResponseDTO = await ShelterService.updateShelter(
      dto
    );

    res.status(200).json(response);
  });

  static deleteShelter = asyncHandler(async (req: Request, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.deleteShelter(
      req.params.id!
    );

    res.status(200).json(response);
  });
}

export { ShelterController };
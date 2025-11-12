import { ShelterService } from "../service/Shelter.service.ts";

import { ShelterDTO } from "../DTOs/Shelter.dto.ts";
import { ShelterResponseDTO } from "../DTOs/ShelterResponse.dto.ts";
import { ShelterUpdateDTO } from "../DTOs/ShelterUpdate.dto.ts";
import { asyncHandler } from "../../utils/AsyncHandler.ts";
import type { Request, Response } from "express";

class ShelterController {
  static createShelter = asyncHandler(async (req: Request, res: Response) => {
    const dto = ShelterDTO.fromRequest(req.body);
    const response: ShelterResponseDTO = await ShelterService.createShelter(
      dto
    );

    res.status(201).json(response);
  });

  static getShelterById = asyncHandler(async (req: Request, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.getShelterById(
      (req as any).users.uuid
    );

    res.status(200).json(response);
  });

  static getAllShelter = asyncHandler(async (_, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.getAllShelter();

    res.status(200).json(response);
  });

  static getByUser = asyncHandler(async (req: Request, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.getByUser(
      (req as any).users.uuid
    );

    res.status(200).json(response);
  });

  static updateShelter = asyncHandler(async (req: Request, res: Response) => {
    const dto: ShelterUpdateDTO = ShelterUpdateDTO.fromRequest(req.params.uuid, req.body);
    const response: ShelterResponseDTO = await ShelterService.updateShelter(
      dto
    );

    res.status(200).json(response);
  });

  static deleteShelter = asyncHandler(async (req: Request, res: Response) => {
    const response: ShelterResponseDTO = await ShelterService.deleteShelter(
      (req as any).users.uuid
    );

    res.status(200).json(response);
  });
}

export { ShelterController };
import type { Request, Response } from "express";
import { AddressService } from "../service/Address.service";
import { AddressDTO } from "../DTOs/Address.dto";
import { asyncHandler } from "../../utils/AsyncHandler";
import type { AddressResponseDTO } from "../DTOs/AddressResponse.dto";
import { AddressUpdateDTO } from "../DTOs/AddressUpdate.dto";

class AddressController {
  static createAddress = asyncHandler(async (req: Request, res: Response) => {
    const dto = AddressDTO.fromRequest((req as any).user.uuid, req.body);

    const response: AddressResponseDTO = await AddressService.createAddress(
      dto
    );
    res.status(201).json(response);
  });

  static getAddress = asyncHandler(async (req: Request, res: Response) => {
    const response: AddressResponseDTO = await AddressService.getAddress(
      (req as any).user.uuid
    );

    res.status(200).json(response);
  });

  static updateAddress = asyncHandler(async (req: Request, res: Response) => {
    const dto = AddressUpdateDTO.fromRequest((req as any).user.uuid, req.body);

    const response: AddressResponseDTO = await AddressService.updateAddress(
      dto
    );

    res.status(200).json(response);
  });

  static deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const response: AddressResponseDTO = await AddressService.deleteAddress(
      (req as any).user.uuid
    );

    res.status(200).json(response);
  });
}

export { AddressController };

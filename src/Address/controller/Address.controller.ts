import type { Request, Response } from "express";
import { AddressService } from "../service/Address.service.ts";
import { AddressDTO } from "../DTOs/Address.dto.ts";
import { asyncHandler } from "../../utils/AsyncHandler.ts";

class AddressController {
  static createAddress = asyncHandler(async (req: Request, res: Response) => {
    const dto = AddressDTO.fromRequest({
      ...req.body,
      uuid_user: (req as any).user.uuid_user,
    });

    const response = await AddressService.createAddress(dto);
    res.status(201).json(response);
  });
  static getAddress = asyncHandler(async (req: Request, res: Response) => {
    const response = await AddressService.getAddress(
      (req as any).user.uuid_user
    );

    res.status(200).json(response);
  });
  static updateAddress = asyncHandler(async (req: Request, res: Response) => {
    const dto = AddressDTO.fromRequest({
      ...req.body,
      uuid_user: (req as any).user.uuid_user,
    });

    const response = await AddressService.updateAddress(dto);
    res.status(200).json(response);
  });
  static deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const response = await AddressService.deleteAddress(
      (req as any).user.uuid_user
    );

    res.status(200).json(response);
  });
}

export { AddressController };

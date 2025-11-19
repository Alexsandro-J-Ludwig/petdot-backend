import type { Request, Response } from "express";
import { UserDTO } from "../DTOs/User.dto.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { UserService } from "../services/User.service.js";
import { UserLoginDTO } from "../DTOs/UserLogin.dto.js";
import { UserUpdateDTO } from "../DTOs/UserUpdate.dto.js";
import { UserUploadDTO } from "../DTOs/UserUpload.dto.js";

class UserController {
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const dto = UserDTO.fromRequest(req.body);
    const response = await UserService.createUser(dto);

    res
      .cookie("Access_token", response.token, {
        httpOnly: true,
        secure: true,
        maxAge: 96000000,
        sameSite: "strict",
      })
      .status(201)
      .send("Usuario criado");
  });

  static getURL = asyncHandler(async (req: Request, res: Response) => {
    const dto = UserUploadDTO.fromRequest(
      (req as any).user.uuid,
      req.body,
      req.headers
    );
    const response = await UserService.getURL(dto);

    res
      .cookie("Access_token", response.token, {
        httpOnly: true,
        secure: true,
        maxAge: 96000000,
        sameSite: "strict",
      })
      .status(200);
  });

  static getUser = asyncHandler(async (req: Request, res: Response) => {
    const dto = UserLoginDTO.fromRequest(req.body);
    const response = await UserService.getUser(dto);
    res.status(200).json({ sucess: true, data: response });
  });

  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    const dto = UserUpdateDTO.fromRequest({
      users: (req as any).user,
      body: req.body,
    });
    const response = UserService.updateUser(dto);
    res.status(200).json({ sucess: true, data: response });
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const response = UserService.deleteUser((req as any).user.uuid);
    res.status(200).json({ sucess: true, data: response });
  });
}

export { UserController };
